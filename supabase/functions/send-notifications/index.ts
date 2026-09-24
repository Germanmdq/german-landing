// Edge Function: send-notifications
//
// Corre cada minuto vía pg_cron y procesa exclusivamente program_enrollments
// activas. Telegram es el único transporte: cada entrega se reserva en
// taller_deliveries y luego se despacha al chat_id vinculado en telegram_accounts.
// El progreso y los horarios viven únicamente en program_enrollments.

import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')!;
const PUSH_CRON_TOKEN = Deno.env.get('PUSH_CRON_TOKEN')!;
const TELEGRAM_APP_ORIGIN = 'https://german.elclubdelaimaginacion.com';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Telegram es el único transporte de avisos. Nunca generamos una entrega antes
// del minuto configurado. Los intermedios sólo se crean en su minuto exacto;
// si ese slot se perdió, no se acumula ni se manda más tarde.
const TELEGRAM_RETRY_WINDOW_MINUTES = 5;
const TELEGRAM_RETRY_MIN_INTERVAL_SECONDS = 90;
const TELEGRAM_RETRY_MAX_ATTEMPTS = 6;
// Las 4 meditaciones diarias tienen un único horario fijo por día, separado
// por horas entre sí, así que este margen no puede pisar el turno siguiente.
// Cubre una corrida de cron que falló, un timeout, o una carrera de inserción
// (ver validate_active_program_delivery) sin dejar la meditación perdida para
// siempre por haberse perdido el minuto exacto. deliveryExists()/el índice
// único de taller_deliveries garantizan que esto nunca duplique un envío.
// Usa aritmética modular (mod 1440) a propósito: así sigue funcionando bien
// para un horario cercano a la medianoche local, sin necesitar conocer la
// fecha calendario. Ampliarlo más allá de ~30-40 min empieza a acercarse al
// intervalo mínimo real entre mensajes intermedios (30 min hoy en producción)
// y podría confundir "todavía no llegó la hora" con "se está recuperando".
const MEDITATION_CATCHUP_MINUTES = 30;
// Ventana corta, inmediatamente después de agotar el margen de recuperación,
// para loguear (una vez, no todo el día) que una meditación programada quedó
// vencida sin generar entrega — para enterarnos nosotros, no el usuario.
const OVERDUE_ALERT_WINDOW_MINUTES = 5;
const TELEGRAM_SEND_TIMEOUT_MS = 10_000;

type MeditationMoment = 'morning' | 'noon' | 'afternoon' | 'night';
type DeliveryType = 'meditation_morning' | 'meditation_noon' | 'meditation_afternoon' | 'meditation_night' | 'intermediate_message';

const momentToDeliveryType: Record<MeditationMoment, DeliveryType> = {
  morning: 'meditation_morning',
  noon: 'meditation_noon',
  afternoon: 'meditation_afternoon',
  night: 'meditation_night',
};
const momentSortOrder: Record<MeditationMoment, number> = { morning: 1, noon: 2, afternoon: 3, night: 4 };
const meditationTitles: Record<MeditationMoment, string> = {
  morning: 'Meditación de la mañana',
  noon: 'Meditación del mediodía',
  afternoon: 'Meditación de la tarde',
  night: 'Meditación de la noche',
};

type TelegramAccountRow = {
  telegram_user_id: number;
  user_id: string;
  chat_id: number | null;
  access_tier: 'trial' | 'limited' | 'active' | 'founder' | 'blocked';
};

type ProgramEnrollmentRow = {
  id: string;
  user_id: string;
  collection_id: string;
  status: 'active' | 'abandoned' | 'completed';
  started_at: string;
  morning: string | null;
  noon: string | null;
  afternoon: string | null;
  night: string | null;
  timezone: string | null;
  message_interval_minutes: number | null;
  current_day: number;
};

type DeliveryTelegramRow = {
  id: string;
  user_id: string;
  day_number: number;
  delivery_type: DeliveryType;
  message_index: number | null;
};

// --- Helpers de tiempo -----------------------------------------------------

function minutesOfDay(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
}

function localMinutesNow(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, hour12: false, hour: '2-digit', minute: '2-digit' }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0') % 24;
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  return hour * 60 + minute;
}

function localDateKey(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const year = parts.find((p) => p.type === 'year')?.value ?? '';
  const month = parts.find((p) => p.type === 'month')?.value ?? '';
  const day = parts.find((p) => p.type === 'day')?.value ?? '';
  return `${year}-${month}-${day}`;
}

function isExactMinute(nowMinutes: number, targetMinutes: number): boolean {
  return nowMinutes === ((targetMinutes % 1440) + 1440) % 1440;
}

// Réplica en Deno de la lógica de extracción de mensajes numerados usada en el
// cliente (app/page.tsx: findNumberedMessage). El numerado real no es
// consistente entre días ("01." en el día 1, "1." en el día 11), por eso el
// patrón acepta cualquier cantidad de ceros a la izquierda.
function findNumberedMessageText(body: string, index: number): string | null {
  const blocks = body.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  const pattern = new RegExp(`^0*${index}\\.\\s*`);
  const block = blocks.find((candidate) => pattern.test(candidate));
  if (block) {
    const text = block.replace(pattern, '').trim();
    return text || null;
  }

  // Algunos días históricos (por ejemplo Taller 40 · Día 7) guardan los
  // mensajes como una lista de líneas después del separador `---`, sin
  // numeración. En esos casos preservamos el orden y usamos la posición como
  // message_index, en lugar de dejar de enviar todas las notificaciones.
  const separator = body.lastIndexOf('\n---\n');
  if (separator === -1) return null;
  const unnumbered = body
    .slice(separator + 5)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !/^0*\d+\.\s+/.test(line));
  return unnumbered[index - 1] || null;
}

function numberedMessageCount(body: string): number {
  const matches = [...body.matchAll(/(?:^|\n)\s*0*(\d+)\.\s+/g)];
  const numbered = matches.reduce((max, match) => Math.max(max, Number(match[1]) || 0), 0);
  if (numbered > 0) return numbered;
  const separator = body.lastIndexOf('\n---\n');
  if (separator === -1) return 0;
  return body.slice(separator + 5).split('\n').map((line) => line.trim()).filter(Boolean).length;
}

// Calcula, para el momento actual, qué message_index (1-based) de mensajes
// intermedios corresponde, dado el horario mañana/noche y el intervalo
// elegido por el usuario. Devuelve null si "ahora" no cae cerca de ningún slot.
function matchIntermediateSlot(nowMinutes: number, morning: string, night: string, intervalMinutes: number): number | null {
  // El primer intermedio va un intervalo DESPUÉS de la hora de levantarse.
  // Ej.: levantarse 07:00 con intervalo 30 => audio 1 a las 07:30.
  const start = minutesOfDay(morning) + intervalMinutes;
  let end = minutesOfDay(night);
  if (end <= start) end += 1440;
  let slot = start;
  let index = 1;
  // Incluimos el último slot. Ej.: 07:30..22:00 cada 30 min => slot base 30.
  while (slot <= end) {
    if (isExactMinute(nowMinutes, slot % 1440)) return index;
    slot += intervalMinutes;
    index += 1;
  }
  return null;
}

function countMeditationSlotsBeforeOrAt(enrollment: ProgramEnrollmentRow, baseSlot: number) {
  if (!enrollment.morning || !enrollment.message_interval_minutes || baseSlot < 1) return 0;
  const interval = enrollment.message_interval_minutes;
  const firstIntermediate = minutesOfDay(enrollment.morning) + interval;
  const currentIntermediate = firstIntermediate + (baseSlot - 1) * interval;
  const meditationTimes = [enrollment.noon, enrollment.afternoon, enrollment.night].filter(Boolean) as string[];

  return meditationTimes.reduce((count, value) => {
    let target = minutesOfDay(value);
    while (target < firstIntermediate) target += 1440;
    if (target > currentIntermediate) return count;
    // Solo resta una meditación si realmente ocupó uno de los slots del ritmo
    // intermedio. La meditación de la mañana queda fuera porque ocurre antes del
    // primer intermedio (ej.: 07:00 meditación, 07:30 audio 1).
    return (target - firstIntermediate) % interval === 0 ? count + 1 : count;
  }, 0);
}

// --- Acceso a datos ---------------------------------------------------------

async function getDayContent(collectionId: string, dayNumber: number) {
  const { data, error } = await supabase
    .from('collection_items')
    .select('content_items(id,title,body)')
    .eq('collection_id', collectionId)
    .eq('sort_order', dayNumber)
    .maybeSingle();
  if (error || !data) return null;
  return data.content_items as unknown as { id: string; title: string; body: string } | null;
}

async function getProgramLastDay(collectionId: string) {
  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('slug')
    .eq('id', collectionId)
    .maybeSingle();
  if (collectionError || !collection) return null;

  const slug = String(collection.slug || '');
  if (slug === 'taller-40-dias') return 40;

  const durationMatch = slug.match(/(?:^|-)(7|15|30|40)-dias(?:-|$)/);
  if (durationMatch) return Number(durationMatch[1]);

  // Fallback para programas históricos sin duración codificada en el slug.
  const { data, error } = await supabase
    .from('collection_items')
    .select('sort_order')
    .eq('collection_id', collectionId)
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return data.sort_order as number;
}

async function getMomentAsset(contentId: string, moment: MeditationMoment) {
  const { data, error } = await supabase
    .from('content_assets')
    .select('id')
    .eq('content_id', contentId)
    .eq('asset_type', 'audio')
    .eq('sort_order', momentSortOrder[moment])
    .maybeSingle();
  if (error || !data) return null;
  return data.id as string;
}

async function getIntermediateAsset(contentId: string, messageIndex: number) {
  const { data, error } = await supabase
    .from('content_assets')
    .select('id')
    .eq('content_id', contentId)
    .eq('asset_type', 'audio/intermediate')
    .eq('sort_order', messageIndex)
    .maybeSingle();
  if (error || !data) return null;
  return data.id as string;
}

function getIntermediateText(body: string, messageIndex: number) {
  const normalizedBody = body.replace(/<br\s*\/?>/gi, '\n').replace(/\r\n?/g, '\n');
  const marker = new RegExp(`(?:^|\\n)\\s*(?:\\*\\*)?0*${messageIndex}\\.(?:\\*\\*)?\\s*`, 'm');
  const match = marker.exec(normalizedBody);
  if (match) {
    const afterMarker = normalizedBody.slice(match.index + match[0].length);
    const nextMarkerIndex = afterMarker.search(/\n\s*(?:\*\*)?0*\d+\.(?:\*\*)?\s*/m);
    const text = (nextMarkerIndex >= 0 ? afterMarker.slice(0, nextMarkerIndex) : afterMarker).trim();
    return text || null;
  }

  const matches = [...normalizedBody.matchAll(/(?:^|\n)\s*(?:\*\*)?(\d+)\.(?:\*\*)?\s*/gm)];
  const current = matches[messageIndex - 1];
  if (!current || current.index == null) return null;
  const next = matches[messageIndex];
  const start = current.index + current[0].length;
  const end = next?.index ?? normalizedBody.length;
  const text = normalizedBody.slice(start, end).trim();
  return text || null;
}

async function deliveryExists(enrollmentId: string, dayNumber: number, deliveryType: DeliveryType, messageIndex: number | null) {
  const base = supabase
    .from('taller_deliveries')
    .select('id')
    .eq('enrollment_id', enrollmentId)
    .eq('day_number', dayNumber)
    .eq('delivery_type', deliveryType);
  const { data } = messageIndex == null
    ? await base.is('message_index', null).maybeSingle()
    : await base.eq('message_index', messageIndex).maybeSingle();
  return Boolean(data);
}

// Reserva atómica de una entrega. deliveryExists() por sí solo no alcanza:
// dos invocaciones del cron pueden comprobar a la vez que no existe y luego
// insertar ambas. La base debe tener los índices únicos de la migración
// 20260912_taller_deliveries_dedup.sql; si otra invocación ganó la carrera,
    // Postgres devuelve 23505 y simplemente no enviamos un segundo aviso.
async function reserveDelivery(values: {
  enrollment_id: string;
  user_id: string;
  content_id: string;
  asset_id: string | null;
  day_number: number;
  delivery_type: DeliveryType;
  message_index?: number | null;
}) {
  const { data, error } = await supabase
    .from('taller_deliveries')
    .insert(values)
    .select('id')
    .single();
  if (error?.code === '23505') return null;
  if (error || !data) {
    console.error('reserve taller_deliveries failed:', error);
    return null;
  }
  return data as { id: string };
}

async function nightAlreadySentToday(enrollmentId: string, now: Date, timeZone: string) {
  const { data } = await supabase
    .from('taller_deliveries')
    .select('delivered_at')
    .eq('enrollment_id', enrollmentId)
    .eq('delivery_type', 'meditation_night')
    .order('delivered_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data?.delivered_at) return false;
  return localDateKey(new Date(data.delivered_at), timeZone) === localDateKey(now, timeZone);
}

function telegramDeliveryText(delivery: DeliveryTelegramRow) {
  if (delivery.delivery_type === 'intermediate_message') return 'Mensaje de Germán';
  return meditationTitles[(Object.entries(momentToDeliveryType).find(([, type]) => type === delivery.delivery_type)?.[0] || 'morning') as MeditationMoment];
}

async function sendTelegram(account: TelegramAccountRow, delivery: DeliveryTelegramRow) {
  if (!account.chat_id) return { ok: false as const, error: 'La cuenta de Telegram no tiene chat_id.' };
  if (account.access_tier === 'blocked') return { ok: false as const, error: 'La cuenta está bloqueada.' };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TELEGRAM_SEND_TIMEOUT_MS);
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        chat_id: account.chat_id,
        text: telegramDeliveryText(delivery),
        reply_markup: {
          inline_keyboard: [[{
            text: delivery.delivery_type === 'intermediate_message' ? 'Abrir mensaje' : 'Abrir práctica',
            web_app: { url: `${TELEGRAM_APP_ORIGIN}/delivery/${encodeURIComponent(delivery.id)}` },
          }]],
        },
      }),
    });
    const result = await response.json().catch(() => null) as { ok?: boolean; description?: string; result?: { message_id?: number } } | null;
    if (!response.ok || !result?.ok) return { ok: false as const, error: result?.description || `Telegram respondió ${response.status}` };
    return { ok: true as const, messageId: result.result?.message_id ?? null };
  } catch (error) {
    return { ok: false as const, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

async function sendToTelegramAccount(delivery: DeliveryTelegramRow) {
  const { data: account, error } = await supabase
    .from('telegram_accounts')
    .select('telegram_user_id,user_id,chat_id,access_tier')
    .eq('user_id', delivery.user_id)
    .maybeSingle();

  if (error || !account) {
    const message = error?.message || 'No hay una cuenta de Telegram vinculada.';
    await supabase.from('taller_deliveries').update({ telegram_status: 'failed', telegram_error: message.slice(0, 500) }).eq('id', delivery.id);
    return false;
  }

  const result = await sendTelegram(account as TelegramAccountRow, delivery);
  await supabase.from('taller_deliveries').update(result.ok ? {
    telegram_status: 'sent',
    telegram_error: null,
    telegram_message_id: result.messageId,
    telegram_sent_at: new Date().toISOString(),
  } : {
    telegram_status: 'failed',
    telegram_error: result.error.slice(0, 500),
  }).eq('id', delivery.id);
  return result.ok;
}

async function attemptDeliveryTelegram(delivery: DeliveryTelegramRow) {
  const { data: claimed, error: claimError } = await supabase.rpc('claim_delivery_telegram_attempt', {
    p_delivery_id: delivery.id,
    p_min_interval_seconds: TELEGRAM_RETRY_MIN_INTERVAL_SECONDS,
    p_max_attempts: TELEGRAM_RETRY_MAX_ATTEMPTS,
  });
  if (claimError) throw claimError;
  if (!claimed) return false;
  await sendToTelegramAccount(delivery);
  return true;
}

async function retryRecentUnsentDeliveries(now: Date) {
  const cutoff = new Date(now.getTime() - TELEGRAM_RETRY_WINDOW_MINUTES * 60_000).toISOString();
  const { data, error } = await supabase
    .from('taller_deliveries')
    .select('id,user_id,day_number,delivery_type,message_index,telegram_status,telegram_attempts,telegram_last_attempt_at,delivered_at')
    .in('telegram_status', ['pending', 'failed'])
    .gte('delivered_at', cutoff)
    .order('delivered_at', { ascending: true })
    .limit(100);
  if (error) throw error;

  const results = await Promise.allSettled((data || []).map((row) => attemptDeliveryTelegram(row as DeliveryTelegramRow)));
  const attempted = results.filter((result) => result.status === 'fulfilled' && result.value === true).length;
  const failed = results.filter((result) => result.status === 'rejected').length;
  if (attempted || failed) console.info(JSON.stringify({ event: 'telegram-retry-pass', candidates: data?.length || 0, attempted, failed }));
  return { candidates: data?.length || 0, attempted, failed };
}

// --- Procesamiento de una suscripción ---------------------------------------

async function processMeditation(enrollment: ProgramEnrollmentRow, moment: MeditationMoment, now: Date) {
  const deliveryType = momentToDeliveryType[moment];
  // La noche necesita una reserva ATÓMICA en la base. El chequeo histórico por
  // delivered_at no alcanza si dos ejecuciones del cron se superponen: ambas
  // pueden leer "todavía no enviado" antes de que la otra inserte. claim_program_night
  // permite que una sola ejecución gane por fecha local y día de inscripción.
  if (moment === 'night' && enrollment.timezone) {
    const localDate = localDateKey(now, enrollment.timezone);
    const { data: claimed, error: claimError } = await supabase.rpc('claim_program_night', {
      p_enrollment_id: enrollment.id,
      p_current_day: enrollment.current_day,
      p_local_date: localDate,
    });
    if (claimError) throw claimError;
    if (!claimed) return;
  }
  if (await deliveryExists(enrollment.id, enrollment.current_day, deliveryType, null)) return;
  const lastDay = moment === 'night' ? await getProgramLastDay(enrollment.collection_id) : null;
  if (moment === 'night' && !lastDay) return;

  const dayContent = await getDayContent(enrollment.collection_id, enrollment.current_day);
  if (!dayContent) return;
  const assetId = await getMomentAsset(dayContent.id, moment);

  const inserted = await reserveDelivery({
    enrollment_id: enrollment.id,
    user_id: enrollment.user_id,
    content_id: dayContent.id,
    asset_id: assetId,
    day_number: enrollment.current_day,
    delivery_type: deliveryType,
    message_index: null,
  });
  if (!inserted) return;

  await attemptDeliveryTelegram({
    id: inserted.id,
    user_id: enrollment.user_id,
    day_number: enrollment.current_day,
    delivery_type: deliveryType,
    message_index: null,
  });

  if (moment === 'night') {
    const nextDay = enrollment.current_day + 1;
    if (nextDay > lastDay!) {
      await supabase.from('program_enrollments').update({ status: 'completed', completed_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', enrollment.id).eq('status', 'active').eq('current_day', enrollment.current_day);
    } else {
      await supabase.from('program_enrollments').update({ current_day: nextDay, updated_at: new Date().toISOString() }).eq('id', enrollment.id).eq('status', 'active').eq('current_day', enrollment.current_day);
    }
  }
}

async function processIntermediateMessage(enrollment: ProgramEnrollmentRow, messageIndex: number) {
  if (await deliveryExists(enrollment.id, enrollment.current_day, 'intermediate_message', messageIndex)) return;

  const dayContent = await getDayContent(enrollment.collection_id, enrollment.current_day);
  if (!dayContent) return;
  const messageText = getIntermediateText(dayContent.body || '', messageIndex);
  const assetId = messageText ? null : await getIntermediateAsset(dayContent.id, messageIndex);
  if (!messageText && !assetId) {
    console.warn(JSON.stringify({ event: 'missing-intermediate-content', enrollmentId: enrollment.id, day: enrollment.current_day, requestedIndex: messageIndex }));
    return;
  }

  const inserted = await reserveDelivery({
    enrollment_id: enrollment.id,
    user_id: enrollment.user_id,
    content_id: dayContent.id,
    asset_id: assetId,
    day_number: enrollment.current_day,
    delivery_type: 'intermediate_message',
    message_index: messageIndex,
  });
  if (!inserted) return;

  await attemptDeliveryTelegram({
    id: inserted.id,
    user_id: enrollment.user_id,
    day_number: enrollment.current_day,
    delivery_type: 'intermediate_message',
    message_index: messageIndex,
  });
}

// Deja rastro DURABLE (no sólo en logs efímeros de la Edge Function) de que
// una meditación programada venció sin generar entrega, incluso si el
// catch-up todavía no la recuperó. Así nos enteramos nosotros, no el usuario.
async function recordOverdueIncident(enrollment: ProgramEnrollmentRow, moment: MeditationMoment, minutesLate: number) {
  const deliveryType = momentToDeliveryType[moment];
  console.error(JSON.stringify({ event: 'meditation-overdue-uncaught', enrollmentId: enrollment.id, userId: enrollment.user_id, day: enrollment.current_day, moment, minutesLate }));
  const { error } = await supabase.from('notification_incidents').insert({
    enrollment_id: enrollment.id,
    user_id: enrollment.user_id,
    day_number: enrollment.current_day,
    delivery_type: deliveryType,
    kind: 'meditation_overdue_uncaught',
    detail: { moment, minutesLate },
  });
  if (error) console.error('[notification_incidents] no se pudo registrar el incidente:', error);
}

async function processEnrollment(enrollment: ProgramEnrollmentRow, now: Date) {
  if (enrollment.status !== 'active' || !enrollment.timezone) return;
  const nowMinutes = localMinutesNow(now, enrollment.timezone);
  const startedAt = enrollment.started_at ? new Date(enrollment.started_at) : null;
  const startedToday = enrollment.current_day === 1
    && startedAt
    && !Number.isNaN(startedAt.getTime())
    && localDateKey(startedAt, enrollment.timezone) === localDateKey(now, enrollment.timezone);
  const startedMinutes = startedToday && startedAt
    ? localMinutesNow(startedAt, enrollment.timezone)
    : null;

  const moments: MeditationMoment[] = ['morning', 'noon', 'afternoon', 'night'];
  let meditationDueNow = false;
  for (const moment of moments) {
    const target = enrollment[moment];
    if (!target) continue;
    const targetMinutes = minutesOfDay(target);
    // En el primer día nunca recuperamos una meditación cuyo horario ya había
    // pasado antes de que la persona se inscribiera. Si se anotó después del
    // último horario, su primera entrega será al día siguiente.
    if (startedMinutes != null && targetMinutes < startedMinutes) continue;
    if (isExactMinute(nowMinutes, targetMinutes)) {
      meditationDueNow = true;
      await processMeditation(enrollment, moment, now);
      continue;
    }
    // El catch-up sólo vale si ese horario ya ocurrió en la fecha local actual.
    // Sin este guard, por ejemplo 00:00 se interpreta como "8 minutos después"
    // de una noche configurada a las 23:52 y puede avanzar otro día en minutos.
    const targetOccurredToday = nowMinutes >= targetMinutes;
    const elapsed = targetOccurredToday ? nowMinutes - targetMinutes : 1440;
    if (elapsed > 0 && elapsed <= MEDITATION_CATCHUP_MINUTES) {
      // El catch-up sólo ocupa el slot actual si la meditación realmente falta.
      // Si ya fue enviada en su horario, no debe bloquear un intermedio posterior
      // (por ejemplo: meditación 12:00 + mensaje intermedio 12:30).
      const alreadyDelivered = await deliveryExists(enrollment.id, enrollment.current_day, momentToDeliveryType[moment], null);
      if (!alreadyDelivered) {
        meditationDueNow = true;
        console.warn(JSON.stringify({ event: 'meditation-catchup-send', enrollmentId: enrollment.id, day: enrollment.current_day, moment, minutesLate: elapsed }));
        await processMeditation(enrollment, moment, now);
      }
      continue;
    }
    if (elapsed > MEDITATION_CATCHUP_MINUTES && elapsed <= MEDITATION_CATCHUP_MINUTES + OVERDUE_ALERT_WINDOW_MINUTES) {
      const exists = await deliveryExists(enrollment.id, enrollment.current_day, momentToDeliveryType[moment], null);
      if (!exists) await recordOverdueIncident(enrollment, moment, elapsed);
    }
  }

  // Una meditación ocupa ese turno. No enviamos además un intermedio en el
  // mismo slot y, por lo tanto, tampoco hacemos avanzar su numeración.
  if (meditationDueNow) return;

  if (enrollment.morning && enrollment.night && enrollment.message_interval_minutes) {
    const baseSlot = matchIntermediateSlot(nowMinutes, enrollment.morning, enrollment.night, enrollment.message_interval_minutes);
    if (baseSlot != null) {
      const meditationCount = countMeditationSlotsBeforeOrAt(enrollment, baseSlot);
      const messageIndex = baseSlot - meditationCount;
      if (messageIndex > 0) await processIntermediateMessage(enrollment, messageIndex);
    }
  }
}

// --- Diagnóstico y prueba controlada -----------------------------------------

type InvocationBody = {
  mode?: 'run' | 'diagnostics' | 'retry-delivery';
  deliveryId?: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function isAuthorized(req: Request) {
  return req.headers.get('Authorization') === `Bearer ${PUSH_CRON_TOKEN}`;
}

async function retrySingleDelivery(deliveryId: string) {
  const { data: delivery, error } = await supabase
    .from('taller_deliveries')
    .select('id,user_id,day_number,delivery_type,message_index')
    .eq('id', deliveryId)
    .maybeSingle();
  if (error || !delivery) return jsonResponse({ ok: false, error: 'Delivery not found' }, 404);
  await supabase.from('taller_deliveries').update({ telegram_status: 'pending', telegram_error: null }).eq('id', delivery.id);
  const attempted = await attemptDeliveryTelegram(delivery as DeliveryTelegramRow);
  const { data: updated } = await supabase.from('taller_deliveries').select('telegram_status,telegram_error,telegram_message_id').eq('id', delivery.id).single();
  const ok = attempted && updated?.telegram_status === 'sent';
  console.info(JSON.stringify({ event: 'controlled-telegram-test', deliveryId, telegram_status: updated?.telegram_status }));
  return jsonResponse({ ok, deliveryId, ...updated }, ok ? 200 : 502);
}

// --- Entry point -------------------------------------------------------------

Deno.serve(async (req) => {
  if (!isAuthorized(req)) return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);

  let body: InvocationBody = {};
  try {
    body = await req.json();
  } catch {
    // pg_cron / pg_net puede invocar la función sin body o con body vacío.
    // Una corrida normal no necesita payload: tratamos ese caso como `run`
    // en lugar de abortar toda la ejecución con 400.
    body = {};
  }

  if (body.mode === 'diagnostics') {
    return jsonResponse({ ok: true, transport: 'telegram', appUrl: TELEGRAM_APP_ORIGIN });
  }

  if (body.mode === 'retry-delivery') {
    if (!body.deliveryId) return jsonResponse({ ok: false, error: 'deliveryId is required' }, 400);
    return retrySingleDelivery(body.deliveryId);
  }

  const now = new Date();
  const retrySummary = await retryRecentUnsentDeliveries(now).catch((reason: unknown) => {
    const message = reason instanceof Error ? reason.message : String(reason);
    console.error(JSON.stringify({ event: 'telegram-retry-pass-error', error: message.slice(0, 500) }));
    return { candidates: 0, attempted: 0, failed: 1 };
  });
  const { data: enrollments, error } = await supabase
    .from('program_enrollments')
    .select('*')
    .eq('status', 'active');

  if (error) {
    return jsonResponse({ ok: false, error: error.message }, 500);
  }

  const results = await Promise.allSettled((enrollments || []).map((enrollment) => processEnrollment(enrollment as ProgramEnrollmentRow, now)));
  const rejected = results.filter((result): result is PromiseRejectedResult => result.status === 'rejected');
  const failed = rejected.length;

  rejected.forEach((result) => {
    const message = result.reason instanceof Error ? result.reason.message : String(result.reason);
    console.error(JSON.stringify({ event: 'scheduled-telegram-error', error: message.slice(0, 500) }));
  });

  console.info(JSON.stringify({ event: 'scheduled-telegram-run', processed: enrollments?.length || 0, failed, retries: retrySummary }));
  return jsonResponse({ ok: true, processed: enrollments?.length || 0, failed, retries: retrySummary });
});
