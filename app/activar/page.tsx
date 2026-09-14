'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Smartphone } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { LoginGate } from '../components/login-gate';
import { supabase } from '../lib/supabase';
import { isRunningStandalone } from '../lib/pwa';

const WHATSAPP = '5492236151152';

function ActivationIntro({ onContinue }: { onContinue: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return <main className="activation-entry">
    <video ref={videoRef} className="activation-video" src="/videos/video-german-white.mp4?v=3" autoPlay muted playsInline preload="auto" aria-label="Presentación de Germán Asistente" />
    <div className="activation-entry-copy">
      <p>EL CLUB DE LA IMAGINACIÓN</p>
      <h1>Germán <strong>Asistente</strong></h1>
      <span>Instalá la aplicación, registrate y solicitá la activación de tu acceso.</span>
      <button type="button" onClick={onContinue}>Ingresar al Asistente <ArrowRight size={18}/></button>
    </div>
  </main>;
}

export default function ActivationPage() {
  const [introDone, setIntroDone] = useState(false);
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
    if (isRunningStandalone()) patch.installed_at = new Date().toISOString();
    void supabase.from('profiles').update(patch).eq('id', user.id);
  }, [session?.user]);

  if (!introDone) return <ActivationIntro onContinue={() => setIntroDone(true)} />;
  if (!checked) return null;
  if (!session) return <LoginGate redirectPath="/activar" />;

  const requestActivation = async () => {
    const now = new Date().toISOString();
    await supabase.from('profiles').update({ activation_requested_at: now, last_seen_at: now }).eq('id', session.user.id);
    setRequested(true);
    const email = session.user.email || 'sin email';
    const text = `Hola Germán, ya me registré en la aplicación y quiero solicitar la activación de mi acceso. Mi email es: ${email}`;
    window.location.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  return <main className="app-shell login-screen"><section className="login-card" style={{textAlign:'center'}}>
    <div className="login-brand-mark">G</div><p className="card-subtitle">ASISTENTE GERMÁN</p><h1 className="login-title">Ya estás registrado</h1>
    <p className="login-subtitle">Ahora avisame para solicitar la activación de tu acceso.</p>
    <p className="login-account-copy"><Smartphone size={18} style={{verticalAlign:'middle',marginRight:6}}/>Cuenta: <b>{session.user.email}</b></p>
    <button type="button" className="login-google-button" onClick={requestActivation}><MessageCircle size={20}/><span>{requested ? 'Abriendo WhatsApp…' : 'Solicitar activación'}</span><ArrowRight size={18}/></button>
    <p className="login-terms">La solicitud queda registrada antes de abrir WhatsApp. La activación del acceso la confirma Germán.</p>
  </section></main>;
}
