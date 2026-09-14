'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AlertCircle, ArrowLeft, Headphones } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LoginGate } from './login-gate';
import { deliveryTypeLabels, extractDeliveryParagraphs, formatDeliveredAt, type TallerDeliveryType } from '../lib/taller-delivery';

type DeliveryView = {
  dayNumber: number;
  deliveryType: TallerDeliveryType;
  title: string;
  deliveredAt: string;
  paragraphs: string[];
  audioUrl?: string;
};

export function DeliveryScreen({ deliveryId }: { deliveryId: string }) {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
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
    if (!session?.user) return;
    let active = true;
    setError('');
    void (async () => {
      const { data: row, error: queryError } = await supabase
        .from('taller_deliveries')
        .select('id,user_id,day_number,delivery_type,message_index,content_id,asset_id,delivered_at,seen_at,content_items(title,body),content_assets(source_url)')
        .eq('id', deliveryId)
        .eq('user_id', session.user.id)
        .maybeSingle();
      if (!active) return;
      if (queryError || !row) {
        setError(queryError ? `No pudimos consultar la entrega: ${queryError.message}` : 'La entrega no existe o no está disponible para esta cuenta.');
        return;
      }
      const item = row.content_items as unknown as { title: string; body: string } | null;
      const asset = row.content_assets as unknown as { source_url: string } | null;
      const deliveryType = row.delivery_type as TallerDeliveryType;
      const paragraphs = extractDeliveryParagraphs(item?.body || '', deliveryType, row.message_index);
      if (!paragraphs?.length && !asset?.source_url) {
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
        audioUrl: asset?.source_url,
      });
      if (!row.seen_at) {
        const { error: seenError } = await supabase.from('taller_deliveries').update({ seen_at: new Date().toISOString() }).eq('id', row.id).eq('user_id', session.user.id);
        if (seenError) console.error('[delivery] no se pudo marcar seen_at:', seenError);
      }
    })().catch((reason: unknown) => {
      if (active) setError(reason instanceof Error ? reason.message : 'Ocurrió un error inesperado al abrir la entrega.');
    });
    return () => { active = false; };
  }, [deliveryId, session?.user]);

  if (!sessionChecked) return <main className="delivery-screen"><p className="delivery-loading">Abriendo tu entrega…</p></main>;
  if (!session) return <LoginGate redirectPath={`/delivery/${encodeURIComponent(deliveryId)}`} />;
  if (error) return <main className="delivery-screen"><section className="delivery-state" role="alert"><AlertCircle size={30}/><h1>No pudimos abrir esta entrega</h1><p>{error}</p><small>Referencia: {deliveryId}</small><a href="/">Volver al Asistente</a></section></main>;
  if (!delivery) return <main className="delivery-screen"><p className="delivery-loading">Buscando el contenido…</p></main>;

  return <main className="delivery-screen"><article className="delivery-article">
    <a className="delivery-back" href="/" aria-label="Volver al Asistente"><ArrowLeft size={20}/></a>
    <header><p>TALLER 40 DÍAS</p><h1>Día {delivery.dayNumber}</h1><h2>{delivery.title}</h2><span>{deliveryTypeLabels[delivery.deliveryType]} · {formatDeliveredAt(delivery.deliveredAt)}</span></header>
    {delivery.audioUrl && <section className="delivery-audio"><Headphones size={24}/><div><b>Escuchá tu práctica</b><span>Audio de esta entrega</span></div><audio src={delivery.audioUrl} controls preload="metadata" playsInline /></section>}
    {delivery.paragraphs.length > 0 && <div className="delivery-copy">{delivery.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
  </article></main>;
}
