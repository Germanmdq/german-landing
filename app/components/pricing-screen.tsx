'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Check, Mail, MessageCircle, Sparkles, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PAYMENT_PLANS, type PaymentPlan, type PaymentProvider } from '../lib/payments';
import './payments.css';

type ProviderConfig = { providers: Record<PaymentProvider, boolean>; mercadoPagoPrices: Partial<Record<PaymentPlan, { amount: string; currency: string }>> };

const benefits = [
  { icon: <Sparkles size={18} />, text: 'Asistente Germán durante todo el día' },
  { icon: <Users size={18} />, text: 'Talleres y reuniones en vivo de lunes a viernes' },
  { icon: <MessageCircle size={18} />, text: 'Club de la Imaginación completo' },
  { icon: <Mail size={18} />, text: 'Un mail nuevo cada día' },
  { icon: <BookOpen size={18} />, text: 'Libros, biblioteca, meditaciones, audios y prácticas' },
];

const ars: Record<PaymentPlan, string> = { '30_days': '$35.000', annual: '$250.000', lifetime: '$350.000' };
const duration: Record<PaymentPlan, string> = { '30_days': '1 mes', annual: '1 año', lifetime: 'De por vida' };

export function PricingScreen() {
  const [plan, setPlan] = useState<PaymentPlan>('lifetime');
  const [config, setConfig] = useState<ProviderConfig | null>(null);
  const [busy, setBusy] = useState<PaymentProvider | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => { void fetch('/api/payments/config', { cache: 'no-store' }).then((response) => response.json()).then(setConfig).catch(() => setMessage('No pudimos cargar las opciones de pago.')); }, []);

  const pay = async (provider: PaymentProvider) => {
    setBusy(provider); setMessage('');
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { window.location.assign('/'); return; }
      const response = await fetch(`/api/payments/${provider}/create`, { method: 'POST', headers: { Authorization: `Bearer ${data.session.access_token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) });
      const result = await response.json() as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || 'No pudimos iniciar el pago.');
      window.location.assign(result.checkoutUrl);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No pudimos iniciar el pago.'); setBusy(null); }
  };

  return <main className="payment-screen"><div className="payment-shell">
    <header className="payment-hero">
      <img src="/images/german-welcome.png" alt="Germán Asistente" />
      <p className="payment-eyebrow">TODO EL CLUB, CON VOS</p>
      <h1>Mucho más que una app.</h1>
      <p>Un acompañamiento para todos los días, con Germán, el Club y los talleres en vivo.</p>
    </header>

    <section className="payment-benefits" aria-label="Todo lo que incluye tu acceso">
      <p className="payment-benefits-title">TODOS LOS PLANES INCLUYEN</p>
      {benefits.map((benefit) => <div className="payment-benefit" key={benefit.text}><span>{benefit.icon}</span><p>{benefit.text}</p><Check size={17} /></div>)}
    </section>

    <section className="payment-plans" aria-label="Opciones de acceso">
      <p className="payment-section-label">ELEGÍ SOLAMENTE POR CUÁNTO TIEMPO</p>
      {(Object.keys(PAYMENT_PLANS) as PaymentPlan[]).map((key) => { const item = PAYMENT_PLANS[key]; return <button key={key} type="button" className={`payment-plan${plan === key ? ' is-selected' : ''}${key === 'lifetime' ? ' is-featured' : ''}`} onClick={() => setPlan(key)}>
        <span className="payment-plan-check"><Check size={15} /></span>
        <span className="payment-plan-copy">{key === 'lifetime' && <span className="payment-plan-badge">LA MEJOR ELECCIÓN</span>}<b>{duration[key]}</b><small>Todo incluido · un solo pago</small></span>
        <span className="payment-plan-price"><strong>{ars[key]} <i>ARS</i></strong><small>o US${Number(item.amount)}</small></span>
      </button>; })}
      <p className="payment-no-renew">Sin renovación automática. Sin diferencias de contenido entre planes.</p>
    </section>

    <section className="payment-providers"><h2>¿Cómo querés pagar?</h2><p>En Argentina pagás en pesos. Con PayPal, en dólares.</p>
      <button className="payment-provider payment-provider--mp" disabled={!config?.providers.mercadopago || busy !== null} onClick={() => void pay('mercadopago')}>{busy === 'mercadopago' ? 'Abriendo Mercado Pago…' : `Mercado Pago · ${ars[plan]} ARS`}</button>{config && !config.providers.mercadopago && <p className="payment-provider-note">Mercado Pago · Próximamente disponible</p>}
      <button className="payment-provider payment-provider--paypal" disabled={!config?.providers.paypal || busy !== null} onClick={() => void pay('paypal')}>{busy === 'paypal' ? 'Abriendo PayPal…' : `PayPal · US$${Number(PAYMENT_PLANS[plan].amount)}`}</button>{config && !config.providers.paypal && <p className="payment-provider-note">PayPal · Próximamente disponible</p>}
      {message && <p className="payment-feedback" role="alert">{message}</p>}<p className="payment-fineprint">Tu acceso se activa solamente cuando el proveedor confirma el pago.</p>
    </section><a className="payment-back" href="/">Volver al Asistente</a>
  </div></main>;
}
