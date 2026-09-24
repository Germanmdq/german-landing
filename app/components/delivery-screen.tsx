'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AlertCircle, ArrowLeft, Heart, MessageCircleMore, Moon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LoginGate } from './login-gate';
import { AccessPaywall } from './access-paywall';
import { TrialEndedScreen } from './launch-widgets';
import { AudioWaveLoader } from './audio-wave-loader';
import { AnimatedInterfaceIcon } from './animated-interface-icon';
import { deliveryTypeLabels, extractDeliveryParagraphs, INTERMEDIATE_MESSAGE_TITLE, type TallerDeliveryType } from '../lib/taller-delivery';

type DeliveryView = {
  dayNumber: number;
  deliveryType: TallerDeliveryType;
  messageIndex: number | null;
  title: string;
  deliveredAt: string;
  paragraphs: string[];
  audioUrl?: string;
};

function renderSimpleBold(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((part, index) => part.startsWith('**') && part.endsWith('**')
    ? <strong key={index}>{part.slice(2, -2)}</strong>
    : <span key={index}>{part}</span>)}</>;
}

export function DeliveryScreen({ deliveryId }: { deliveryId: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [trialExpired, setTrialExpired] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryView | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setSessionChecked(true);
    }).catch(() => { if (active) setSessionChecked(true); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setSessionChecked(true);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!session?.access_token) { setAccessChecked(false); setHasAccess(false); return; }
    let active = true;
    void fetch('/api/access', { headers: { Authorization: `Bearer ${session.access_token}` }, cache: 'no-store' }).then(async (response) => {
      const data = await response.json().catch(() => ({})) as { active?: boolean; blocked?: boolean; trialExpired?: boolean };
      if (!active) return;
      setHasAccess(response.ok && data.active === true);
      setBlocked(Boolean(data.blocked));
      setTrialExpired(Boolean(data.trialExpired));
      setAccessChecked(true);
    }).catch(() => { if (active) setAccessChecked(true); });
    return () => { active = false; };
  }, [session?.access_token]);

  useEffect(() => {
    if (!session?.user || !accessChecked || !hasAccess) return;
    let active = true;
    setError('');
    void (async () => {
      const { data: row, error: queryError } = await supabase
        .from('taller_deliveries')
        .select('id,user_id,day_number,delivery_type,message_index,content_id,asset_id,delivered_at,seen_at,content_items(title,body),content_assets(source_url,storage_path)')
        .eq('id', deliveryId)
        .eq('user_id', session.user.id)
        .maybeSingle();
      if (!active) return;
      if (queryError || !row) {
        setError(queryError ? `No pudimos consultar la entrega: ${queryError.message}` : 'La entrega no existe o no está disponible para esta cuenta.');
        return;
      }
      const item = row.content_items as unknown as { title: string; body: string } | null;
      const asset = row.content_assets as unknown as { source_url: string; storage_path?: string } | null;
      const audioUrl = asset?.source_url && !asset.source_url.startsWith('storage://')
        ? asset.source_url
        : asset?.storage_path
          ? `https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/${asset.storage_path}`
          : undefined;
      const deliveryType = row.delivery_type as TallerDeliveryType;
      const paragraphs = item?.body
        ? extractDeliveryParagraphs(item.body, deliveryType, row.message_index) || []
        : [];
      if (deliveryType === 'intermediate_message' && !paragraphs.length && !audioUrl) {
        setError('No encontramos el contenido para este mensaje.');
        return;
      }
      if (deliveryType !== 'intermediate_message' && !audioUrl) {
        setError('No encontramos el audio para esta entrega.');
        return;
      }
      setDelivery({
        dayNumber: row.day_number,
        deliveryType,
        messageIndex: row.message_index,
        title: item?.title || deliveryTypeLabels[deliveryType],
        deliveredAt: row.delivered_at,
        paragraphs,
        audioUrl,
      });
      if (!row.seen_at) {
        const { error: seenError } = await supabase.rpc('mark_taller_delivery_seen', { p_delivery_id: row.id });
        if (seenError) console.error('[delivery] no se pudo marcar seen_at:', seenError);
      }
    })().catch((reason: unknown) => {
      if (active) setError(reason instanceof Error ? reason.message : 'Ocurrió un error inesperado al abrir la entrega.');
    });
    return () => { active = false; };
  }, [deliveryId, session?.user, accessChecked, hasAccess]);

  useEffect(() => {
    if (!delivery || !session?.user) return;
    let active = true;
    void supabase
      .from('user_favorites')
      .select('favorite_id')
      .eq('user_id', session.user.id)
      .eq('favorite_id', `delivery:${deliveryId}`)
      .maybeSingle()
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) console.error('[delivery favorite] no se pudo consultar el estado:', queryError);
        setFavorite(Boolean(data));
      });
    return () => { active = false; };
  }, [delivery, deliveryId, session?.user]);

  const toggleFavorite = async () => {
    if (!delivery || !session?.user) return;
    const id = `delivery:${deliveryId}`;
    const isIntermediate = delivery.deliveryType === 'intermediate_message';
    const isTextMessage = isIntermediate && delivery.paragraphs.length > 0;
    const favoriteTitle = isIntermediate
      ? INTERMEDIATE_MESSAGE_TITLE
      : deliveryTypeLabels[delivery.deliveryType];
    const payload = {
      id,
      title: favoriteTitle,
      detail: `Día ${delivery.dayNumber} · ${deliveryTypeLabels[delivery.deliveryType]}`,
      icon: isTextMessage ? '💬' : '🎧',
      tone: '#D92D35',
      reader: {
        title: favoriteTitle,
        eyebrow: isTextMessage ? 'TEXTO' : 'AUDIO',
        detail: `Día ${delivery.dayNumber} · ${deliveryTypeLabels[delivery.deliveryType]}`,
        paragraphs: delivery.paragraphs,
        audioUrl: delivery.audioUrl,
      },
    };
    const next = !favorite;
    const result = next
      ? await supabase
          .from('user_favorites')
          .upsert({ user_id: session.user.id, favorite_id: id, payload, updated_at: new Date().toISOString() }, { onConflict: 'user_id,favorite_id' })
          .select('favorite_id')
          .single()
      : await supabase.from('user_favorites').delete().eq('user_id', session.user.id).eq('favorite_id', id);
    if (result.error) {
      console.error('[delivery favorite]', result.error);
      return;
    }
    if (next && (!('data' in result) || result.data?.favorite_id !== id)) {
      console.error('[delivery favorite] el favorito no quedó persistido');
      return;
    }
    setFavorite(next);
  };
  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play().catch(() => undefined);
    else audio.pause();
  };
  if (!sessionChecked) return <AudioWaveLoader label="Abriendo tu entrega" dark />;
  if (!session) return <LoginGate redirectPath={`/delivery/${encodeURIComponent(deliveryId)}`} />;
  if (!accessChecked) return <AudioWaveLoader label="Comprobando tu acceso" dark />;
  if (blocked) return <AccessPaywall />;
  if (trialExpired) return <TrialEndedScreen />;
  if (!hasAccess) { if (typeof window !== 'undefined') window.location.assign('/access'); return <AudioWaveLoader label="Abriendo tu espacio" dark />; }
  if (error) return <main className="delivery-screen"><section className="delivery-state" role="alert"><AlertCircle size={30}/><h1>No pudimos abrir esta entrega</h1><p>{error}</p><small>Referencia: {deliveryId}</small><a href="/telegram">Volver al Asistente</a></section></main>;
  if (!delivery) return <AudioWaveLoader label="Buscando el contenido" dark />;

  return <main className="delivery-screen"><article className="delivery-article">
    <a className="delivery-back" href="/telegram" aria-label="Volver al Asistente"><ArrowLeft size={20}/></a>
    <button type="button" className={`delivery-favorite${favorite ? ' is-favorite' : ''}`} onClick={toggleFavorite} aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}><Heart size={21} fill={favorite ? 'currentColor' : 'none'} /></button>
    {delivery.audioUrl && !(delivery.deliveryType === 'intermediate_message' && delivery.paragraphs.length > 0) && <section className="delivery-audio-modern">
      {delivery.deliveryType !== 'intermediate_message' && <div className="delivery-audio-label"><Moon size={14} strokeWidth={1.8} /><span>{deliveryTypeLabels[delivery.deliveryType]}</span></div>}
      <audio
        ref={audioRef}
        src={delivery.audioUrl}
        preload="metadata"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button type="button" className={`delivery-audio-ear${playing ? ' is-playing' : ''}`} onClick={() => { void toggleAudio(); }} aria-label={playing ? 'Pausar audio' : 'Escuchar audio'} aria-pressed={playing}>
        <AnimatedInterfaceIcon name="ear" size={28} />
      </button>
    </section>}
    {delivery.deliveryType === 'intermediate_message' && delivery.paragraphs.length > 0 && <section className="delivery-text-modern">
      <div className="delivery-text-card">
        <div className="delivery-text-icon" aria-hidden="true"><span className="motion-icon motion-icon--message"><MessageCircleMore size={30} strokeWidth={1.8} /></span></div>
        <p className="delivery-text-eyebrow">MENSAJE DE GERMÁN · DÍA {delivery.dayNumber}</p>
        <h1>{INTERMEDIATE_MESSAGE_TITLE}</h1>
        <div className="delivery-text-body">
          {delivery.paragraphs.map((paragraph, index) => <p key={index}>{renderSimpleBold(paragraph)}</p>)}
        </div>
      </div>
    </section>}
  </article></main>;
}
