'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AudioWaveLoader } from './audio-wave-loader';

const TELEGRAM_READY_TIMEOUT_MS = 4_000;
const TELEGRAM_AUTH_TIMEOUT_MS = 12_000;

type TelegramWebApp = {
  initData?: string;
  ready?: () => void;
  expand?: () => void;
};

function waitForTelegramWebApp() {
  return new Promise<TelegramWebApp>((resolve, reject) => {
    const startedAt = Date.now();
    const findWebApp = () => {
      const telegram = (window as typeof window & { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;
      if (telegram?.initData) return resolve(telegram);
      if (Date.now() - startedAt >= TELEGRAM_READY_TIMEOUT_MS) return reject(new Error('Abrí este enlace desde Telegram para continuar.'));
      window.setTimeout(findWebApp, 100);
    };
    findWebApp();
  });
}

function withTimeout<T>(promise: PromiseLike<T>, timeoutMs: number) {
  return new Promise<T>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error('Telegram tardó demasiado en iniciar la sesión.')), timeoutMs);
    void Promise.resolve(promise).then(resolve, reject).finally(() => window.clearTimeout(timeout));
  });
}

export function LoginGate({ redirectPath = '/telegram' }: { redirectPath?: string }) {
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState('Abriendo tu espacio…');
  const safeRedirectPath = redirectPath.startsWith('/') && !redirectPath.startsWith('//') ? redirectPath : '/telegram';

  useEffect(() => {
    let cancelled = false;
    let redirectFallback: number | undefined;

    void (async () => {
      const telegram = await waitForTelegramWebApp();
      telegram.ready?.();
      telegram.expand?.();

      const { data: payload, error: invokeError } = await withTimeout(
        supabase.functions.invoke('telegram-session', { body: { initData: telegram.initData } }),
        TELEGRAM_AUTH_TIMEOUT_MS,
      );
      if (invokeError || !payload?.tokenHash) throw new Error(payload?.error || invokeError?.message || 'No pudimos iniciar la sesión.');

      const { data: verified, error: verifyError } = await withTimeout(
        supabase.auth.verifyOtp({ token_hash: payload.tokenHash, type: 'magiclink' }),
        TELEGRAM_AUTH_TIMEOUT_MS,
      );
      if (verifyError || !verified.session) throw verifyError || new Error('Telegram no pudo guardar la sesión.');
      if (cancelled) return;

      const currentPath = `${window.location.pathname}${window.location.search}`;
      if (currentPath !== safeRedirectPath) {
        window.location.replace(safeRedirectPath);
        return;
      }

      // DeliveryScreen y TelegramMiniApp comparten este cliente de Supabase y
      // reciben SIGNED_IN. No recargamos la misma ruta: en algunos WebViews de
      // Telegram eso volvía a iniciar LoginGate y generaba un bucle.
      redirectFallback = window.setTimeout(() => {
        if (cancelled) return;
        setBusy(false);
        setMessage('La sesión se inició, pero la pantalla no se actualizó. Tocá Reintentar.');
      }, 1_500);
    })().catch((error: unknown) => {
      if (cancelled) return;
      console.error('[telegram-auth] error:', error);
      setBusy(false);
      setMessage(error instanceof Error ? error.message : 'No pudimos abrir tu cuenta desde Telegram.');
    });

    return () => {
      cancelled = true;
      if (redirectFallback !== undefined) window.clearTimeout(redirectFallback);
    };
  }, [safeRedirectPath]);

  if (busy) return <AudioWaveLoader label="Abriendo tu espacio" />;

  return (
    <main className="app-shell login-screen">
      <div className="login-card">
        <div className="login-brand-mark">G</div>
        <h1 className="login-title">Asistente Germán</h1>
        <p className="login-subtitle">{message}</p>
        <button type="button" className="login-google-button" onClick={() => window.location.reload()}><span>Reintentar</span><ArrowRight size={18} /></button>
      </div>
    </main>
  );
}
