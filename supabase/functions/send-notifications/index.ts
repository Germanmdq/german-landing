// Edge Function: send-notifications
//
// Pensada para correr cada minuto via pg_cron (SQL y pasos de deploy entregados
// aparte, no en este repo). Por cada suscripción activa en push_subscriptions,
// revisa si corresponde enviar una meditación o un mensaje intermedio según el
// horario configurado por el usuario (en su propia timezone), evita duplicados
// contra taller_deliveries, inserta el registro de entrega y manda el push real
// con VAPID.
//
// Cada entrega insertada en taller_deliveries queda con push_status
// ('pending' por default, luego 'sent' o 'failed') y push_error si falló —
// requiere las columnas nuevas (ver migración en este mismo PR/commit).
// Cuando avanza current_day, se actualiza TANTO push_subscriptions como
// user_plan_progress — la app lee esta última para mostrar el día actual.
//
// NO se hace deploy desde este código — eso se hace a mano con la CLI.

import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_EMAIL = Deno.env.get('VAPID_EMAIL')!;

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

type PushSubscriptionRow = {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth_key: string;
  morning: string | null;
  noon: string | null;
  afternoon: string | null;
  night: string | null;
  timezone: string | null;
  message_interval_minutes: number | null;
  active_taller_id: string | null;
  current_day: number;
  is_active: boolean;
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

async function deliveryExists(userId: string, dayNumber: number, deliveryType: DeliveryType, messageIndex: number | null) {
  const base = supabase
    .from('taller_deliveries')
    .select('id')
    .eq('user_id', userId)
    .eq('day_number', dayNumber)
    .eq('delivery_type', deliveryType);
  const { data } = messageIndex == null
    ? await base.is('message_index', null).maybeSingle()
    : await base.eq('message_index', messageIndex).maybeSingle();
  return Boolean(data);
}

// deliveryId: la fila de taller_deliveries ya insertada para este envío —
// queda registrado ahí si el push realmente salió o no, y por qué, porque
// insertar la fila NO significa que el push haya llegado al teléfono.
async function sendPush(sub: PushSubscriptionRow, deliveryId: string, payload: Record<string, unknown>) {
  try {
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
      JSON.stringify(payload),
    );
    await supabase.from('taller_deliveries').update({ push_status: 'sent', push_error: null }).eq('id', deliveryId);
    return true;
  } catch (err) {
    const statusCode = (err as { statusCode?: number })?.statusCode;
    if (statusCode === 404 || statusCode === 410) {
      // La suscripción ya no existe del lado del navegador (desinstaló la PWA,
      // revocó el permiso, etc.) — la desactivamos para no reintentar en vano.
      await supabase.from('push_subscriptions').update({ is_active: false }).eq('id', sub.id);
    }
    const message = err instanceof Error ? err.message : String(err);
    console.error(`push failed for subscription ${sub.id} (delivery ${deliveryId}):`, err);
    await supabase.from('taller_deliveries').update({ push_status: 'failed', push_error: message.slice(0, 500) }).eq('id', deliveryId);
    return false;
  }
}

// --- Procesamiento de una suscripción ---------------------------------------

async function processMeditation(sub: PushSubscriptionRow, moment: MeditationMoment) {
  if (!sub.active_taller_id) return;
  const deliveryType = momentToDeliveryType[moment];
  if (await deliveryExists(sub.user_id, sub.current_day, deliveryType, null)) return;

  const dayContent = await getDayContent(sub.active_taller_id, sub.current_day);
  if (!dayContent) return;
  const assetId = await getMomentAsset(dayContent.id, moment);

  const { data: inserted, error: insertError } = await supabase.from('taller_deliveries').insert({
    user_id: sub.user_id,
    content_id: dayContent.id,
    asset_id: assetId,
    day_number: sub.current_day,
    delivery_type: deliveryType,
  }).select('id').single();
  if (insertError || !inserted) { console.error('insert taller_deliveries (meditation) failed:', insertError); return; }

  await sendPush(sub, inserted.id, {
    title: meditationTitles[moment],
    body: `Tu práctica del Día ${sub.current_day} está lista.`,
    url: `/?delivery=${inserted.id}`,
    data: { type: deliveryType, day: sub.current_day },
  });

  if (moment === 'night') {
    const nextDay = sub.current_day + 1;
    if (nextDay > 40) {
      await supabase.from('push_subscriptions').update({ is_active: false }).eq('id', sub.id);
      if (sub.active_taller_id) {
        await supabase.from('user_plan_progress').update({ completed_at: new Date().toISOString() }).eq('user_id', sub.user_id).eq('collection_id', sub.active_taller_id);
      }
    } else {
      await supabase.from('push_subscriptions').update({ current_day: nextDay }).eq('id', sub.id);
      // La app lee current_day de esta tabla (user_plan_progress), no de
      // push_subscriptions — sin esto, la UI se queda mostrando el día
      // viejo para siempre aunque las entregas sigan avanzando bien.
      if (sub.active_taller_id) {
        await supabase.from('user_plan_progress').update({ current_day: nextDay }).eq('user_id', sub.user_id).eq('collection_id', sub.active_taller_id);
      }
    }
  }
}

async function processIntermediateMessage(sub: PushSubscriptionRow, messageIndex: number) {
  if (!sub.active_taller_id) return;
  if (await deliveryExists(sub.user_id, sub.current_day, 'intermediate_message', messageIndex)) return;

  const dayContent = await getDayContent(sub.active_taller_id, sub.current_day);
  if (!dayContent) return;
  const messageText = findNumberedMessageText(dayContent.body || '', messageIndex);
  if (!messageText) return; // no hay un mensaje #N para este día, no hay nada que mandar

  const { data: inserted, error: insertError } = await supabase.from('taller_deliveries').insert({
    user_id: sub.user_id,
    content_id: dayContent.id,
    asset_id: null,
    day_number: sub.current_day,
    delivery_type: 'intermediate_message',
    message_index: messageIndex,
  }).select('id').single();
  if (insertError || !inserted) { console.error('insert taller_deliveries (message) failed:', insertError); return; }

  await sendPush(sub, inserted.id, {
    title: 'Un momento para vos',
    body: messageText.split('\n')[0],
    url: `/?delivery=${inserted.id}`,
    data: { type: 'intermediate_message', day: sub.current_day, index: messageIndex },
  });
}

async function processSubscription(sub: PushSubscriptionRow, now: Date) {
  if (!sub.is_active || !sub.timezone) return;
  const nowMinutes = localMinutesNow(now, sub.timezone);

  const moments: MeditationMoment[] = ['morning', 'noon', 'afternoon', 'night'];
  for (const moment of moments) {
    const target = sub[moment];
    if (target && withinWindow(nowMinutes, minutesOfDay(target))) {
      await processMeditation(sub, moment);
      return; // una sola cosa por tick para esta suscripción
    }
  }

  if (sub.morning && sub.night && sub.message_interval_minutes) {
    const slot = matchIntermediateSlot(nowMinutes, sub.morning, sub.night, sub.message_interval_minutes);
    if (slot != null) await processIntermediateMessage(sub, slot);
  }
}

// --- Entry point -------------------------------------------------------------

Deno.serve(async (_req) => {
  const now = new Date();
  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('*')
    .eq('is_active', true);

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  const results = await Promise.allSettled((subscriptions || []).map((sub) => processSubscription(sub as PushSubscriptionRow, now)));
  const failed = results.filter((r) => r.status === 'rejected').length;

  return new Response(JSON.stringify({ ok: true, processed: subscriptions?.length || 0, failed }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
