'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { LoginGate } from '../components/login-gate';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

const WHATSAPP = '5492236151152';

export default function TallerActivationPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setChecked(true); });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => { setSession(next); setChecked(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const user = session?.user;
    if (!user) return;
    const patch: Record<string,string> = { workshop_link_opened_at: new Date().toISOString(), last_seen_at: new Date().toISOString() };
    void supabase.from('profiles').update(patch).eq('id', user.id);
  }, [session?.user]);

  if (!checked) return null;
  if (!session) return <LoginGate redirectPath="/taller" />;

  const requestActivation = async () => {
    const now = new Date().toISOString();
    await supabase.from('profiles').update({ activation_requested_at: now, last_seen_at: now }).eq('id', session.user.id);
    setRequested(true);
    const email = session.user.email || 'sin email';
    const text = `Hola Germán, ya me registré en la aplicación y quiero solicitar la activación de mi acceso. Mi email es: ${email}`;
    window.location.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  return <main className="app-shell login-screen">
    <section className="login-card" style={{textAlign:'center'}}>
      <div className="login-brand-mark">G</div>
      <p className="card-subtitle">ASISTENTE GERMÁN</p>
      <h1 className="login-title">Ya estás registrado</h1>
      <p className="login-subtitle">Tu cuenta está vinculada con Telegram. Avisame para solicitar la activación de tu acceso.</p>
      <p className="login-account-copy">Cuenta: <b>{session.user.email}</b></p>
      <button type="button" className="login-google-button" onClick={requestActivation}>
        <MessageCircle size={20}/><span>{requested ? 'Abriendo WhatsApp…' : 'Solicitar activación'}</span><ArrowRight size={18}/>
      </button>
      <p className="login-terms">La solicitud queda registrada antes de abrir WhatsApp. La activación del acceso la confirma Germán.</p>
      <a className="login-account-copy" href="/telegram">Abrir el Asistente</a>
    </section>
  </main>;
}
