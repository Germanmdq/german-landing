'use client';

import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function LoginGate({ redirectPath = '/' }: { redirectPath?: string }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const safeRedirectPath = redirectPath.startsWith('/') && !redirectPath.startsWith('//') ? redirectPath : '/';

  const googleLogin = async () => {
    setBusy(true);
    setMessage('');
    const redirectTo = typeof window !== 'undefined' ? new URL(safeRedirectPath, window.location.origin).href : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo, queryParams: { prompt: 'select_account' } },
    });
    if (error) {
      console.error('[auth] error en signInWithOAuth:', error);
      setBusy(false);
      setMessage(error.message);
    }
  };

  const emailLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return setMessage('Escribí tu correo electrónico.');
    if (!password) return setMessage('Escribí tu contraseña.');
    setBusy(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
    if (error) {
      setBusy(false);
      setMessage('El correo o la contraseña no son correctos.');
      return;
    }
    window.location.replace(safeRedirectPath);
  };

  return <main className="app-shell login-screen">
    <div className="login-card">
      <div className="login-brand-mark">G</div>
      <h1 className="login-title">Bienvenido</h1>
      <p className="login-subtitle">Ingresá o creá tu cuenta para continuar con Germán Asistente.</p>
      <form className="login-email-form" onSubmit={emailLogin}>
        <div className="login-email-field"><Mail size={19} aria-hidden="true" /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Correo electrónico" autoComplete="email" inputMode="email" /></div>
        <div className="login-email-field"><LockKeyhole size={19} aria-hidden="true" /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Contraseña" autoComplete="current-password" /><button type="submit" disabled={busy || !email.trim() || !password} aria-label="Ingresar"><ArrowRight size={18} /></button></div>
      </form>
      <div className="login-divider"><span>o</span></div>
      <button type="button" className="login-google-button" onClick={googleLogin} disabled={busy}>
        <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
        <span>{busy ? 'Un momento…' : 'Continuar con Google'}</span><ArrowRight size={18} strokeWidth={2.4}/>
      </button>
      {message && <p className="login-error">{message}</p>}
      <p className="login-account-copy">Ingresá con tu correo y contraseña, o continuá con Google.</p>
    </div>
    <p className="login-terms">Al continuar, aceptás los términos de uso y la política de privacidad.</p>
  </main>;
}
