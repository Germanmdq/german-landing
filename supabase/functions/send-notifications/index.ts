// Edge Function: send-notifications
//
// Pensada para correr cada minuto via pg_cron (SQL y pasos de deploy entregados
// aparte, no en este repo). Procesa exclusivamente program_enrollments activas;
// push_subscriptions sólo aporta los dispositivos activos del usuario.
//
// Cada entrega insertada en taller_deliveries queda con push_status
// ('pending' por default, luego 'sent' o 'failed') y push_error si falló —
// requiere las columnas nuevas (ver migración en este mismo PR/commit).
// El progreso y los horarios viven únicamente en program_enrollments.
//
// NO se hace deploy desde este código — eso se hace a mano con la CLI.

import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_EMAIL = Deno.env.get('VAPID_EMAIL')!;
const PUSH_CRON_TOKEN = Deno.env.get('PUSH_CRON_TOKEN')!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
webpush.setVapidDetails(`mailto:${VAPID_EMAIL}`, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const MATCH_WINDOW_MINUTES = 2;

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

type PushDeviceRow = {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth_key: string;
  is_active: boolean;
};

type ProgramEnrollmentRow = {
  id: string;
  user_id: string;
  collection_id: string;
  status: 'active' | 'abandoned' | 'completed';
  morning: string | null;
  noon: string | null;
  afternoon: string | null;
  night: string | null;
  timezone: string | null;
  message_interval_minutes: number | null;
  current_day: number;
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

function withinWindow(nowMinutes: number, targetMinutes: number, windowMinutes = MATCH_WINDOW_MINUTES): boolean {
  const diff = Math.abs(nowMinutes - targetMinutes);
  return Math.min(diff, 1440 - diff) <= windowMinutes;
}

// Réplica en Deno de la lógica de extracción de mensajes numerados usada en el
// cliente (app/page.tsx: findNumberedMessage). El numerado real no es
// consistente entre días ("01." en el día 1, "1." en el día 11), por eso el
// patrón acepta cualquier cantidad de ceros a la izquierda.
function findNumberedMessageText(body: string, index: number): string | null {
  const blocks = body.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  const pattern = new RegExp(`^0*${index}\\.\\s*`);
  const block = blocks.find((candidate) => pattern.test(candidate));
  if (!block) return null;
  const text = block.replace(pattern, '').trim();
  return text || null;
}

// Calcula, para el momento actual, qué message_index (1-based) de mensajes
// intermedios corresponde, dado el horario mañana/noche y el intervalo
// elegido por el usuario. Devuelve null si "ahora" no cae cerca de ningún slot.
function matchIntermediateSlot(nowMinutes: number, morning: string, night: string, intervalMinutes: number): number | null {
  const start = minutesOfDay(morning) + 60;
  let end = minutesOfDay(night) - 60;
  if (end <= start) end += 1440;
  let slot = start;
  let index = 1;
  while (slot < end) {
    if (withinWindow(nowMinutes, slot % 1440)) return index;
    slot += intervalMinutes;
    index += 1;
  }
  return null;
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
    .eq('sort_order', momentSortOrder[moment])
    .maybeSingle();
  if (error || !data) return null;
  return data.id as string;
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
// Postgres devuelve 23505 y simplemente no enviamos un segundo push.
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

// deliveryId: la fila de taller_deliveries ya insertada para este envío —
// queda registrado ahí si el push realmente salió o no, y por qué, porque
// insertar la fila NO significa que el push haya llegado al teléfono.
async function sendPush(device: PushDeviceRow, payload: Record<string, unknown>) {
  try {
    await webpush.sendNotification(
      { endpoint: device.endpoint, keys: { p256dh: device.p256dh, auth: device.auth_key } },
      JSON.stringify(payload),
    );
    return true;
  } catch (err) {
    const statusCode = (err as { statusCode?: number })?.statusCode;
    if (statusCode === 404 || statusCode === 410) {
      // La suscripción ya no existe del lado del navegador (desinstaló la PWA,
      // revocó el permiso, etc.) — la desactivamos para no reintentar en vano.
      await supabase.from('push_subscriptions').update({ is_active: false }).eq('id', device.id);
    }
    const message = err instanceof Error ? err.message : String(err);
    console.error(`push failed for subscription ${device.id}:`, err);
    return message.slice(0, 500);
  }
}

async function sendToActiveDevices(enrollment: ProgramEnrollmentRow, deliveryId: string, payload: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('push_subscriptions')
    .select('id,user_id,endpoint,p256dh,auth_key,is_active')
    .eq('user_id', enrollment.user_id)
    .eq('is_active', true);
  if (error) {
    await supabase.from('taller_deliveries').update({ push_status: 'failed', push_error: error.message.slice(0, 500) }).eq('id', deliveryId);
    return;
  }

  const results = await Promise.all((data || []).map((device) => sendPush(device as PushDeviceRow, payload)));
  const errors = results.filter((result): result is string => typeof result === 'string');
  const sent = results.some((result) => result === true);
  await supabase.from('taller_deliveries').update({
    push_status: sent ? 'sent' : 'failed',
    push_error: errors.length ? errors.join('; ').slice(0, 500) : (sent ? null : 'No hay dispositivos push activos'),
  }).eq('id', deliveryId);
}

async function hasActiveDevice(userId: string) {
  const { data, error } = await supabase
    .from('push_subscriptions')
    .select('id')
    .eq('user_id', userId)
    .eq('is_active', true)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
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

  await sendToActiveDevices(enrollment, inserted.id, {
    title: 'Mensaje de Germán',
    body: '',
    url: `/delivery/${inserted.id}`,
    data: { type: deliveryType, day: enrollment.current_day },
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
  const messageText = findNumberedMessageText(dayContent.body || '', messageIndex);
  if (!messageText) return; // no hay un mensaje #N para este día, no hay nada que mandar

  const inserted = await reserveDelivery({
    enrollment_id: enrollment.id,
    user_id: enrollment.user_id,
    content_id: dayContent.id,
    asset_id: null,
    day_number: enrollment.current_day,
    delivery_type: 'intermediate_message',
    message_index: messageIndex,
  });
  if (!inserted) return;

  await sendToActiveDevices(enrollment, inserted.id, {
    title: 'Mensaje de Germán',
    body: '',
    url: `/delivery/${inserted.id}`,
    data: { type: 'intermediate_message', day: enrollment.current_day, index: messageIndex },
  });
}

async function processEnrollment(enrollment: ProgramEnrollmentRow, now: Date) {
  if (enrollment.status !== 'active' || !enrollment.timezone) return;
  if (!await hasActiveDevice(enrollment.user_id)) return;
  const nowMinutes = localMinutesNow(now, enrollment.timezone);

  const moments: MeditationMoment[] = ['morning', 'noon', 'afternoon', 'night'];
  for (const moment of moments) {
    const target = enrollment[moment];
    if (target && withinWindow(nowMinutes, minutesOfDay(target))) {
      await processMeditation(enrollment, moment, now);
      return; // una sola cosa por tick para esta suscripción
    }
  }

  if (enrollment.morning && enrollment.night && enrollment.message_interval_minutes) {
    const slot = matchIntermediateSlot(nowMinutes, enrollment.morning, enrollment.night, enrollment.message_interval_minutes);
    if (slot != null) await processIntermediateMessage(enrollment, slot);
  }
}

// --- Diagnóstico y prueba controlada -----------------------------------------

type InvocationBody = {
  mode?: 'run' | 'diagnostics' | 'retry-delivery';
  subscriptionId?: string;
  deliveryId?: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function isAuthorized(req: Request) {
  return req.headers.get('Authorization') === `Bearer ${PUSH_CRON_TOKEN}`;
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function retrySingleDelivery(subscriptionId: string, deliveryId: string) {
  const [{ data: device, error: deviceError }, { data: delivery, error: deliveryError }] = await Promise.all([
    supabase
      .from('push_subscriptions')
      .select('id,user_id,endpoint,p256dh,auth_key,is_active')
      .eq('id', subscriptionId)
      .eq('is_active', true)
      .maybeSingle(),
    supabase
      .from('taller_deliveries')
      .select('id,user_id,day_number,delivery_type,message_index,push_status,content_items(title,body)')
      .eq('id', deliveryId)
      .maybeSingle(),
  ]);

  if (deviceError || !device) return jsonResponse({ ok: false, error: 'Active push subscription not found' }, 404);
  if (deliveryError || !delivery) return jsonResponse({ ok: false, error: 'Delivery not found' }, 404);
  if (device.user_id !== delivery.user_id) return jsonResponse({ ok: false, error: 'Subscription and delivery belong to different users' }, 403);

  const content = delivery.content_items as unknown as { title: string; body: string } | null;
  const deliveryType = delivery.delivery_type as DeliveryType;
  const moment = (Object.entries(momentToDeliveryType).find(([, value]) => value === deliveryType)?.[0] ?? null) as MeditationMoment | null;
  const body = deliveryType === 'intermediate_message' && delivery.message_index != null
    ? findNumberedMessageText(content?.body || '', delivery.message_index) || 'Tenés una práctica pendiente.'
    : `Tu práctica del Día ${delivery.day_number} está lista.`;
  const payload = {
    title: 'Mensaje de Germán',
    body: '',
    url: `/delivery/${delivery.id}`,
    data: { type: deliveryType, day: delivery.day_number, retry: true },
  };

  await supabase.from('taller_deliveries').update({ push_status: 'pending', push_error: null }).eq('id', delivery.id);
  const result = await sendPush(device as PushDeviceRow, payload);
  const sent = result === true;
  const pushError = sent ? null : result;
  await supabase.from('taller_deliveries').update({
    push_status: sent ? 'sent' : 'failed',
    push_error: pushError,
  }).eq('id', delivery.id);

  console.info(JSON.stringify({ event: 'controlled-push-test', subscriptionId, deliveryId, push_status: sent ? 'sent' : 'failed' }));
  return jsonResponse({ ok: sent, deliveryId, push_status: sent ? 'sent' : 'failed', error: pushError }, sent ? 200 : 502);
}

// --- Entry point -------------------------------------------------------------

Deno.serve(async (req) => {
  if (!isAuthorized(req)) return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);

  let body: InvocationBody = {};
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  if (body.mode === 'diagnostics') {
    return jsonResponse({ ok: true, vapidPublicKeySha256: await sha256(VAPID_PUBLIC_KEY) });
  }

  if (body.mode === 'retry-delivery') {
    if (!body.subscriptionId || !body.deliveryId) return jsonResponse({ ok: false, error: 'subscriptionId and deliveryId are required' }, 400);
    return retrySingleDelivery(body.subscriptionId, body.deliveryId);
  }

  const now = new Date();
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
    console.error(JSON.stringify({ event: 'scheduled-push-error', error: message.slice(0, 500) }));
  });

  console.info(JSON.stringify({ event: 'scheduled-push-run', processed: enrollments?.length || 0, failed }));
  return jsonResponse({ ok: true, processed: enrollments?.length || 0, failed });
});
