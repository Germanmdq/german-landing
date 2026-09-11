import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export type WorkshopSchedule = { morning: string; noon: string; afternoon: string; night: string };

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function subscribeToPush(user: User, schedule: WorkshopSchedule, tallerId: string): Promise<{ error?: string }> {
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

  const { error } = await supabase.from('push_subscriptions').upsert({
    user_id: user.id,
    endpoint: json.endpoint,
    p256dh,
    auth_key: authKey,
    morning: schedule.morning,
    noon: schedule.noon,
    afternoon: schedule.afternoon,
    night: schedule.night,
    active_taller_id: tallerId,
    current_day: 1,
    is_active: true,
  }, { onConflict: 'user_id,endpoint' });

  if (error) return { error: error.message };
  return {};
}
