'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Smartphone } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { LoginGate } from '../components/login-gate';
import { InstallOnboarding } from '../components/experience-onboarding';
import { supabase } from '../lib/supabase';
import { detectInstallPlatform, hasNativeInstallPrompt, isRunningStandalone, listenForPwaInstallation, promptNativeInstallation } from '../lib/pwa';

const WHATSAPP = '5492236151152';

function ActivationIntro({ onFinish }: { onFinish: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [showButton, setShowButton] = useState(false);
  useEffect(() => { const timer=setTimeout(()=>setShowButton(true),2000); return()=>clearTimeout(timer); },[]);
  return <div className="video-intro">
    <video ref={ref} className="video-intro-video" src="/videos/video-german-white.mp4?v=3" autoPlay muted playsInline preload="auto" onPlaying={()=>setShowButton(true)} onEnded={()=>setShowButton(true)} aria-label="Presentación de Germán Asistente" />
    {showButton && <button type="button" className="video-intro-enter" onClick={onFinish}><span>Activar mi acceso</span><ArrowRight size={18}/></button>}
  </div>;
}

export default function ActivationPage() {
  const [introDone,setIntroDone]=useState(false);
  const [session,setSession]=useState<Session|null>(null);
  const [checked,setChecked]=useState(false);
  const [installOpen,setInstallOpen]=useState(false);
  const [standalone,setStandalone]=useState(false);
  const [platform,setPlatform]=useState<ReturnType<typeof detectInstallPlatform>>('other');
  const [promptAvailable,setPromptAvailable]=useState(false);
  const [requested,setRequested]=useState(false);

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{setSession(data.session);setChecked(true)});
    const {data}=supabase.auth.onAuthStateChange((_e,next)=>{setSession(next);setChecked(true)});
    return()=>data.subscription.unsubscribe();
  },[]);
  useEffect(()=>{
    setPlatform(detectInstallPlatform()); setStandalone(isRunningStandalone()); setPromptAvailable(hasNativeInstallPrompt());
    return listenForPwaInstallation(({installed,promptAvailable,standalone})=>{setPromptAvailable(promptAvailable);setStandalone(standalone||installed);});
  },[]);
  useEffect(()=>{
    if(session?.user && !isRunningStandalone()) setInstallOpen(true);
  },[session?.user]);
  useEffect(()=>{
    const user=session?.user;if(!user)return;
    const patch:Record<string,string>={workshop_link_opened_at:new Date().toISOString(),last_seen_at:new Date().toISOString()};
    if(standalone||isRunningStandalone())patch.installed_at=new Date().toISOString();
    void supabase.from('profiles').update(patch).eq('id',user.id);
  },[session?.user,standalone]);

  if(!introDone)return <ActivationIntro onFinish={()=>setIntroDone(true)}/>;
  if(!checked)return null;
  if(!session)return <LoginGate redirectPath="/bienvenido?paso=instalar"/>;

  const requestActivation=async()=>{
    const now=new Date().toISOString();
    await supabase.from('profiles').update({activation_requested_at:now,last_seen_at:now}).eq('id',session.user.id);
    setRequested(true);
    const text=`Hola Germán, ya me registré e instalé la aplicación y quiero activar mi acceso. Mi email es: ${session.user.email||'sin email'}`;
    window.location.href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  return <>
    <main className="app-shell login-screen"><section className="login-card" style={{textAlign:'center'}}>
      <div className="login-brand-mark">G</div><p className="card-subtitle">ASISTENTE GERMÁN</p><h1 className="login-title">Activá tu acceso</h1>
      <p className="login-subtitle">{standalone?'La aplicación ya está instalada. Ahora avisame para activar tu acceso.':'Primero instalá la aplicación en tu teléfono. Después vas a poder solicitar la activación.'}</p>
      <p className="login-account-copy"><Smartphone size={18} style={{verticalAlign:'middle',marginRight:6}}/>Cuenta: <b>{session.user.email}</b></p>
      {!standalone && <button type="button" className="login-google-button" onClick={()=>setInstallOpen(true)}><Smartphone size={20}/><span>Cómo instalar la aplicación</span><ArrowRight size={18}/></button>}
      <button type="button" className="login-google-button" onClick={requestActivation}><MessageCircle size={20}/><span>{requested?'Abriendo WhatsApp…':'Activar mi acceso'}</span><ArrowRight size={18}/></button>
    </section></main>
    {installOpen&&!standalone&&<InstallOnboarding suggestedPlatform={platform} nativePromptAvailable={promptAvailable} onClose={()=>setInstallOpen(false)} onInstallAndroid={promptNativeInstallation} onRecheckInstallation={()=>{const value=isRunningStandalone();setStandalone(value);return value}}/>}
  </>;
}
