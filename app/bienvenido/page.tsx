'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { LoginGate } from '../components/login-gate';
import { InstallOnboarding } from '../components/experience-onboarding';
import '../components/experience-onboarding.css';
import '../magic-ui.css';
import '../modern-ui.css';
import { supabase } from '../lib/supabase';
import { detectInstallPlatform, hasNativeInstallPrompt, isRunningStandalone, listenForPwaInstallation, promptNativeInstallation } from '../lib/pwa';

const WHATSAPP='5492236151152';
type Step='video'|'login'|'install'|'activate';

function Intro({onFinish}:{onFinish:()=>void}){
 const [show,setShow]=useState(false); const ref=useRef<HTMLVideoElement>(null);
 useEffect(()=>{const t=setTimeout(()=>setShow(true),2000);return()=>clearTimeout(t)},[]);
 return <div className="video-intro"><video ref={ref} className="video-intro-video" src="/videos/video-german-white.mp4?v=3" autoPlay muted playsInline preload="auto" onPlaying={()=>setShow(true)} onEnded={()=>setShow(true)}/>{show&&<button className="video-intro-enter" onClick={onFinish}><span>Activar mi acceso</span><ArrowRight size={18}/></button>}</div>
}

export default function Bienvenido(){
 const [step,setStep]=useState<Step>('video'); const [session,setSession]=useState<Session|null>(null); const [checked,setChecked]=useState(false);
 const [standalone,setStandalone]=useState(false); const [platform,setPlatform]=useState<ReturnType<typeof detectInstallPlatform>>('other'); const [prompt,setPrompt]=useState(false); const [requested,setRequested]=useState(false);
 useEffect(()=>{supabase.auth.getSession().then(({data})=>{setSession(data.session);setChecked(true)});const {data}=supabase.auth.onAuthStateChange((_e,s)=>{setSession(s);setChecked(true);if(s&&step==='login')setStep('install')});return()=>data.subscription.unsubscribe()},[step]);
 useEffect(()=>{setPlatform(detectInstallPlatform());setStandalone(isRunningStandalone());setPrompt(hasNativeInstallPrompt());return listenForPwaInstallation(({installed,promptAvailable,standalone})=>{setPrompt(promptAvailable);setStandalone(standalone||installed)})},[]);
 useEffect(()=>{if(!session?.user)return;const patch:Record<string,string>={workshop_link_opened_at:new Date().toISOString(),last_seen_at:new Date().toISOString()};if(standalone||isRunningStandalone())patch.installed_at=new Date().toISOString();void supabase.from('profiles').update(patch).eq('id',session.user.id)},[session?.user,standalone]);
 if(step==='video')return <Intro onFinish={()=>setStep('login')}/>;
 if(!checked)return null;
 if(step==='login'&&!session)return <LoginGate redirectPath="/bienvenido?paso=instalar"/>;
 if(step==='login'&&session){queueMicrotask(()=>setStep('install'));return null}
 if(!session)return <LoginGate redirectPath="/bienvenido?paso=instalar"/>;
 if(step==='install')return <InstallOnboarding suggestedPlatform={platform} nativePromptAvailable={prompt} onClose={()=>setStep('activate')} onInstallAndroid={promptNativeInstallation} onRecheckInstallation={()=>{const v=isRunningStandalone();setStandalone(v);return v}}/>;
 const activate=async()=>{const now=new Date().toISOString();await supabase.from('profiles').update({activation_requested_at:now,last_seen_at:now}).eq('id',session.user.id);setRequested(true);const text=`Hola Germán, ya instalé y me registré en el Asistente Germán. Quiero activar mi acceso. Mi email es: ${session.user.email||'sin email'}`;window.location.href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`};
 return <main className="activation-final"><section className="activation-final-card"><div className="activation-final-mark">G</div><p>ASISTENTE GERMÁN</p><h1>Todo listo.</h1><span>Ya instalaste la aplicación y estás registrado.<br/>Avisame para activar tu acceso.</span><button onClick={activate}><MessageCircle size={21}/>{requested?'Abriendo WhatsApp…':'Activar mi acceso'}<ArrowRight size={18}/></button><small>{session.user.email}</small></section></main>
}
