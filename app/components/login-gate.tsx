'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function LoginGate({ redirectPath = '/' }: { redirectPath?: string }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const safeRedirectPath = redirectPath.startsWith('/') && !redirectPath.startsWith('//') ? redirectPath : '/';

  useEffect(() => {
    let cancelled = false;
    const telegram = (window as typeof window & {
      Telegram?: { WebApp?: { initData?: string; ready?: () => void; expand?: () => void } };
    }).Telegram?.WebApp;
    const initData = telegram?.initData || '';
    if (!initData) return;

    telegram.ready?.();
    telegram.expand?.();
    setBusy(true);
    setMessage('Abriendo tu espacio…');

    void supabase.functions.invoke('telegram-session', { body: { initData } }).then(async ({ data: payload, error: invokeError }) => {
      if (invokeError || !payload?.tokenHash) throw new Error(payload?.error || invokeError?.message || 'No pudimos iniciar la sesión.');
      const { error } = await supabase.auth.verifyOtp({ token_hash: payload.tokenHash, type: 'magiclink' });
      if (error) throw error;
      if (!cancelled) window.location.replace(safeRedirectPath);
    }).catch((error: unknown) => {
      if (cancelled) return;
      console.error('[telegram-auth] error:', error);
      setBusy(false);
      setMessage('No pudimos abrir tu cuenta desde Telegram.');
    });

    return () => { cancelled = true; };
  }, [safeRedirectPath]);

  const isTelegram = typeof window !== 'undefined' && Boolean((window as typeof window & { Telegram?: { WebApp?: { initData?: string } } }).Telegram?.WebApp?.initData);

  if (isTelegram) return (
    <main className="app-shell login-screen">
      <div className="login-card">
        <div className="login-brand-mark">G</div>
        <h1 className="login-title">Asistente Germán</h1>
        <p className="login-subtitle">{busy ? 'Abriendo tu espacio…' : message}</p>
        {!busy && <button type="button" className="login-google-button" onClick={() => window.location.reload()}><span>Reintentar</span><ArrowRight size={18} /></button>}
      </div>
    </main>
  );

  return (
    <main className="app-shell login-screen">
      <div className="login-card">
        <div className="login-brand-mark">G</div>
        <h1 className="login-title">Asistente Germán</h1>
        <p className="login-subtitle">Próximamente.</p>
      </div>
    </main>
  );
}
