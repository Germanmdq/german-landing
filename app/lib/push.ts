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
    console.warn('[push] navegador sin soporte de Notification/serviceWorker/PushManager');
    return { error: 'Este navegador no soporta notificaciones push.' };
  }
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidPublicKey) {
    console.error('[push] falta NEXT_PUBLIC_VAPID_PUBLIC_KEY en el build');
    return { error: 'Falta configurar la clave pública de notificaciones.' };
  }

  try {
    console.log('[push] pidiendo permiso de notificaciones…');
    const permission = await Notification.requestPermission();
    console.log('[push] permiso:', permission);
    if (permission !== 'granted') return { error: 'No diste permiso para recibir notificaciones.' };

    console.log('[push] registrando service worker…');
    const registration = await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
    await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();
    console.log('[push] suscripción existente en el navegador:', Boolean(subscription));
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
      });
      console.log('[push] nueva suscripción creada:', subscription.endpoint);
    }

    const json = subscription.toJSON();
    const p256dh = json.keys?.p256dh;
    const authKey = json.keys?.auth;
    if (!json.endpoint || !p256dh || !authKey) {
      console.error('[push] la suscripción del navegador no trajo endpoint/keys', json);
      return { error: 'No se pudo leer la suscripción de notificaciones.' };
    }
    return { endpoint: json.endpoint, p256dh, authKey };
  } catch (err) {
    console.error('[push] excepción pidiendo permiso o suscribiendo:', err);
    return { error: err instanceof Error ? err.message : 'No se pudo activar las notificaciones.' };
  }
}

export async function subscribeToPush(user: User, settings: WorkshopSettings, tallerId: string): Promise<{ error?: string }> {
  const subscription = await getOrCreateBrowserSubscription();
  if ('error' in subscription) return { error: subscription.error };

  try {
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

    if (error) { console.error('[push] error guardando push_subscriptions (taller):', error); return { error: error.message }; }
    console.log('[push] suscripción de taller guardada en Supabase.');
    return {};
  } catch (err) {
    console.error('[push] excepción guardando push_subscriptions (taller):', err);
    return { error: err instanceof Error ? err.message : 'No se pudo guardar la suscripción.' };
  }
}

// Activa notificaciones en general (sin depender de un taller puntual): pide
// permiso, se suscribe si hace falta, y prende is_active — sin tocar horarios
// ni active_taller_id si ya existían de una inscripción previa a un taller.
export async function ensurePushSubscription(user: User): Promise<{ error?: string }> {
  const subscription = await getOrCreateBrowserSubscription();
  if ('error' in subscription) return { error: subscription.error };

  try {
    const { error } = await supabase.from('push_subscriptions').upsert({
      user_id: user.id,
      endpoint: subscription.endpoint,
      p256dh: subscription.p256dh,
      auth_key: subscription.authKey,
      is_active: true,
    }, { onConflict: 'user_id,endpoint' });

    if (error) { console.error('[push] error activando push_subscriptions:', error); return { error: error.message }; }
    console.log('[push] notificaciones activadas en Supabase.');
    return {};
  } catch (err) {
    console.error('[push] excepción activando push_subscriptions:', err);
    return { error: err instanceof Error ? err.message : 'No se pudo activar las notificaciones.' };
  }
}

// Apaga todas las suscripciones del usuario (no las borra, solo is_active: false).
export async function disablePushSubscription(userId: string): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.from('push_subscriptions').update({ is_active: false }).eq('user_id', userId);
    if (error) { console.error('[push] error desactivando push_subscriptions:', error); return { error: error.message }; }
    console.log('[push] notificaciones desactivadas en Supabase.');
    return {};
  } catch (err) {
    console.error('[push] excepción desactivando push_subscriptions:', err);
    return { error: err instanceof Error ? err.message : 'No se pudo desactivar las notificaciones.' };
  }
}

export async function getPushSubscriptionActive(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('push_subscriptions').select('id').eq('user_id', userId).eq('is_active', true).limit(1).maybeSingle();
    if (error) { console.error('[push] error leyendo estado de push_subscriptions:', error); return false; }
    return Boolean(data);
  } catch (err) {
    console.error('[push] excepción leyendo estado de push_subscriptions:', err);
    return false;
  }
}
