'use client';

import { useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AlertCircle, ArrowLeft, Heart, Moon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LoginGate } from './login-gate';
import VoicePill from './VoicePill';
import { deliveryTypeLabels, extractDeliveryParagraphs, type TallerDeliveryType } from '../lib/taller-delivery';

type DeliveryView = {
  dayNumber: number;
  deliveryType: TallerDeliveryType;
  title: string;
  deliveredAt: string;
  paragraphs: string[];
  audioUrl?: string;
};

export function DeliveryScreen({ deliveryId }: { deliveryId: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
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
      const data = await response.json().catch(() => ({})) as { active?: boolean };
      if (!active) return;
      setHasAccess(response.ok && data.active === true);
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
      const paragraphs = extractDeliveryParagraphs(item?.body || '', deliveryType, row.message_index);
      if (!paragraphs?.length && !audioUrl) {
        const reason = deliveryType === 'intermediate_message'
          ? `No encontramos el mensaje numerado ${row.message_index ?? 'sin índice'} dentro del contenido asociado.`
          : 'No encontramos texto ni audio para esta entrega.';
        setError(reason);
        return;
      }
      setDelivery({
        dayNumber: row.day_number,
        deliveryType,
        title: item?.title || deliveryTypeLabels[deliveryType],
        deliveredAt: row.delivered_at,
        paragraphs: paragraphs || [],
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
      .then(({ data }) => { if (active) setFavorite(Boolean(data)); });
    return () => { active = false; };
  }, [delivery, deliveryId, session?.user]);

  const toggleFavorite = async () => {
    if (!delivery || !session?.user) return;
    const id = `delivery:${deliveryId}`;
    const payload = {
      id,
      title: delivery.title,
      detail: `Día ${delivery.dayNumber} · ${deliveryTypeLabels[delivery.deliveryType]}`,
      icon: '🎧',
      tone: '#D92D35',
      reader: {
        title: delivery.title,
        eyebrow: 'AUDIO',
        detail: `Día ${delivery.dayNumber}`,
        paragraphs: [],
        audioUrl: delivery.audioUrl,
      },
    };
    const next = !favorite;
    const result = await (next
      ? supabase.from('user_favorites').upsert({ user_id: session.user.id, favorite_id: id, payload, updated_at: new Date().toISOString() }, { onConflict: 'user_id,favorite_id' })
      : supabase.from('user_favorites').delete().eq('user_id', session.user.id).eq('favorite_id', id)
    );
    if (result.error) {
      console.error('[delivery favorite]', result.error);
      return;
    }
    setFavorite(next);
  };
  if (!sessionChecked) return <main className="delivery-screen"><p className="delivery-loading">Abriendo tu entrega…</p></main>;
  if (!session) return <LoginGate redirectPath={`/delivery/${encodeURIComponent(deliveryId)}`} />;
  if (!accessChecked) return <main className="delivery-screen"><p className="delivery-loading">Comprobando tu acceso…</p></main>;
  if (!hasAccess) { if (typeof window !== 'undefined') window.location.assign('/access'); return <main className="delivery-screen"><p className="delivery-loading">Abriendo tu espacio…</p></main>; }
  if (error) return <main className="delivery-screen"><section className="delivery-state" role="alert"><AlertCircle size={30}/><h1>No pudimos abrir esta entrega</h1><p>{error}</p><small>Referencia: {deliveryId}</small><a href="/">Volver al Asistente</a></section></main>;
  if (!delivery) return <main className="delivery-screen"><p className="delivery-loading">Buscando el contenido…</p></main>;

  return <main className="delivery-screen"><article className="delivery-article">
    <a className="delivery-back" href="/" aria-label="Volver al Asistente"><ArrowLeft size={20}/></a>
    <button type="button" className={`delivery-favorite${favorite ? ' is-favorite' : ''}`} onClick={toggleFavorite} aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}><Heart size={21} fill={favorite ? 'currentColor' : 'none'} /></button>
    {delivery.audioUrl && <section className="delivery-audio-modern">
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
      <VoicePill
        className="delivery-audio-pill"
        size={40}
        mode="toggle"
        reactive="simulated"
        showTime
        waveform
        slideToCancel={false}
        active={playing}
        onStart={() => { void audioRef.current?.play(); }}
        onStop={() => { audioRef.current?.pause(); }}
        ariaLabel={playing ? 'Pausar audio' : 'Escuchar audio'}
      />
    </section>}
  </article></main>;
}
