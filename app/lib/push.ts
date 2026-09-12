import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export type WorkshopSchedule = { morning: string; noon: string; afternoon: string; night: string };
export type WorkshopSettings = WorkshopSchedule & { timezone: string; messageIntervalMinutes: number };

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

async function getOrCreateBrowserSubscription(): Promise<{ endpoint: string; p256dh: string; authKey: string } | { error: string }> {
  if (typeof window === 'undefined' || !('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return { error: 'Este navegador no soporta notificaciones push.' };
  }
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidPublicKey) return { error: 'Falta configurar la clave pública de notificaciones.' };

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return { error: 'No diste permiso para recibir notificaciones.' };

  const registration = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
    });
  }

  const json = subscription.toJSON();
  const p256dh = json.keys?.p256dh;
  const authKey = json.keys?.auth;
  if (!json.endpoint || !p256dh || !authKey) return { error: 'No se pudo leer la suscripción de notificaciones.' };
  return { endpoint: json.endpoint, p256dh, authKey };
}

export async function subscribeToPush(user: User, settings: WorkshopSettings, tallerId: string): Promise<{ error?: string }> {
  const subscription = await getOrCreateBrowserSubscription();
  if ('error' in subscription) return { error: subscription.error };

  const { error } = await supabase.from('push_subscriptions').upsert({
    user_id: user.id,
    endpoint: subscription.endpoint,
    p256dh: subscription.p256dh,
    auth_key: subscription.authKey,
    morning: settings.morning,
    noon: settings.noon,
    afternoon: settings.afternoon,
    night: settings.night,
    timezone: settings.timezone,
    message_interval_minutes: settings.messageIntervalMinutes,
    active_taller_id: tallerId,
    current_day: 1,
    is_active: true,
  }, { onConflict: 'user_id,endpoint' });

  if (error) return { error: error.message };
  return {};
}

// Activa notificaciones en general (sin depender de un taller puntual): pide
// permiso, se suscribe si hace falta, y prende is_active — sin tocar horarios
// ni active_taller_id si ya existían de una inscripción previa a un taller.
export async function ensurePushSubscription(user: User): Promise<{ error?: string }> {
  const subscription = await getOrCreateBrowserSubscription();
  if ('error' in subscription) return { error: subscription.error };

  const { error } = await supabase.from('push_subscriptions').upsert({
    user_id: user.id,
    endpoint: subscription.endpoint,
    p256dh: subscription.p256dh,
    auth_key: subscription.authKey,
    is_active: true,
  }, { onConflict: 'user_id,endpoint' });

  if (error) return { error: error.message };
  return {};
}

// Apaga todas las suscripciones del usuario (no las borra, solo is_active: false).
export async function disablePushSubscription(userId: string): Promise<{ error?: string }> {
  const { error } = await supabase.from('push_subscriptions').update({ is_active: false }).eq('user_id', userId);
  if (error) return { error: error.message };
  return {};
}

export async function getPushSubscriptionActive(userId: string): Promise<boolean> {
  const { data } = await supabase.from('push_subscriptions').select('id').eq('user_id', userId).eq('is_active', true).limit(1).maybeSingle();
  return Boolean(data);
}
