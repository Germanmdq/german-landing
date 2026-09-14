'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import './payments.css';

type StatusKind = 'success' | 'pending' | 'cancelled';

const copy: Record<StatusKind, { title: string; detail: string }> = {
  success: { title: 'Estamos confirmando tu pago', detail: 'Puede tardar unos instantes. No hace falta que vuelvas a pagar.' },
  pending: { title: 'Tu pago está pendiente', detail: 'Te avisaremos cuando el proveedor lo confirme.' },
  cancelled: { title: 'El pago no se completó', detail: 'No se realizó ningún cambio en tu acceso.' },
};

export function PaymentStatusScreen({ kind }: { kind: StatusKind }) {
  const [title, setTitle] = useState(copy[kind].title);
  const [detail, setDetail] = useState(copy[kind].detail);
  const [active, setActive] = useState(false);
  const [checking, setChecking] = useState(kind !== 'cancelled');
  const captured = useRef(false);

  const check = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    if (!payment) { setTitle('No encontramos la referencia del pago'); setDetail('Volvé a las opciones de acceso para intentarlo nuevamente.'); setChecking(false); return; }
    const { data } = await supabase.auth.getSession();
    if (!data.session) { setTitle('Necesitás iniciar sesión'); setDetail('Ingresá con la misma cuenta que usaste para pagar.'); setChecking(false); return; }
    if (kind === 'success' && params.get('provider') === 'paypal' && params.get('token') && !captured.current) {
      captured.current = true;
      await fetch('/api/payments/paypal/capture', { method: 'POST', headers: { Authorization: `Bearer ${data.session.access_token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ payment, token: params.get('token') }) });
    }
    const response = await fetch(`/api/payments/status?payment=${encodeURIComponent(payment)}`, { headers: { Authorization: `Bearer ${data.session.access_token}` }, cache: 'no-store' });
    const result = await response.json() as { active?: boolean; status?: string; error?: string };
    if (!response.ok) { setTitle('No pudimos confirmar el pago'); setDetail(result.error || 'Probá nuevamente en unos instantes.'); setChecking(false); return; }
    if (result.active) { setActive(true); setChecking(false); setTitle('Pago confirmado'); setDetail('Tu acceso ya está activo.'); return; }
    if (result.status === 'failed' || result.status === 'cancelled') { setChecking(false); setTitle('El pago no se pudo confirmar'); setDetail('Podés volver a intentarlo sin perder ningún dato.'); }
    else { setChecking(false); setTitle('Tu pago sigue pendiente'); setDetail('El proveedor todavía no lo confirmó. Volvé a comprobar en unos instantes.'); }
  }, [kind]);

  useEffect(() => { if (kind !== 'cancelled') void check(); }, [check, kind]);

  return <main className="payment-screen"><section className="payment-status-card"><img src="/images/german-welcome.png" alt="Germán Asistente" /><p className="payment-eyebrow">TU ACCESO</p><h1>{title}</h1><p>{detail}</p>{active ? <a className="payment-status-action" href="/">Entrar al Asistente</a> : <>{kind !== 'cancelled' && <button className="payment-status-action" type="button" disabled={checking} onClick={() => { setChecking(true); void check(); }}>{checking ? 'Comprobando…' : 'Volver a comprobar'}</button>}<a className="payment-status-action payment-status-secondary" href="/access">Ver opciones de acceso</a></>}</section></main>;
}
