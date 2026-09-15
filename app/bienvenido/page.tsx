'use client';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { LoginGate } from '../components/login-gate';
import { supabase } from '../lib/supabase';
import '../magic-ui.css';
import '../modern-ui.css';

const WHATSAPP='5492236151152';

export default function Bienvenido(){
 const [session,setSession]=useState<Session|null>(null); const [checked,setChecked]=useState(false); const [busy,setBusy]=useState(false);
 useEffect(()=>{supabase.auth.getSession().then(({data})=>{setSession(data.session);setChecked(true)});const {data}=supabase.auth.onAuthStateChange((_e,s)=>{setSession(s);setChecked(true)});return()=>data.subscription.unsubscribe()},[]);
 useEffect(()=>{if(!session?.user)return;void supabase.from('profiles').update({workshop_link_opened_at:new Date().toISOString(),last_seen_at:new Date().toISOString()}).eq('id',session.user.id)},[session?.user]);
 if(!checked)return null;
 if(!session)return <LoginGate redirectPath="/bienvenido"/>;
 const activate=async()=>{setBusy(true);const now=new Date().toISOString();await supabase.from('profiles').update({activation_requested_at:now,last_seen_at:now}).eq('id',session.user.id);const email=session.user.email||'sin email';const text=`Hola Germán, quiero activar mi acceso con este mail: ${email}`;window.location.href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`};
 return <main className="app-shell login-screen"><section className="login-card"><div className="login-brand-mark">G</div><h1 className="login-title">Bienvenido</h1><p className="login-subtitle">Tu cuenta ya está registrada. Avisame para activar tu acceso.</p><button type="button" className="login-google-button" onClick={activate} disabled={busy}><MessageCircle size={20}/><span>{busy?'Abriendo WhatsApp…':'Activar mi acceso'}</span><ArrowRight size={18}/></button><p className="login-account-copy">{session.user.email}</p></section></main>;
}
