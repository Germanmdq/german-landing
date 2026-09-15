'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Check, Headphones, Mail, MessageCircle, Users, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PAYMENT_PLANS, type PaymentPlan, type PaymentProvider } from '../lib/payments';
import './payments.css';

type ProviderConfig = { providers: Record<PaymentProvider, boolean>; mercadoPagoPrices: Partial<Record<PaymentPlan, { amount: string; currency: string }>> };

const benefits = [
  { icon: Headphones, top: '500+', bottom: 'Meditaciones' },
  { icon: BookOpen, top: '800+', bottom: 'Textos y libros' },
  { icon: MessageCircle, top: 'Asistente', bottom: 'todo el día' },
  { icon: Users, top: 'Talleres', bottom: 'Lun a Vie' },
  { icon: Mail, top: 'Un mail', bottom: 'cada día' },
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
      <a className="payment-close" href="/" aria-label="Cerrar"><X size={22} /></a>
      <img className="payment-tree" src="/images/paywall-tree-eye.png" alt="El Club de la Imaginación" />
      <div className="payment-hero-copy">
        <h1>Todo el Club.<br/><em>Todos los días.</em></h1>
        <p>Tu asistente, talleres en vivo, biblioteca, meditaciones y acompañamiento diario.</p>
      </div>
    </header>

    <section className="payment-benefit-strip" aria-label="Todo lo que incluye">
      {benefits.map(({ icon: Icon, top, bottom }) => <div className="payment-benefit-tile" key={top + bottom}><Icon size={19}/><b>{top}</b><span>{bottom}</span></div>)}
    </section>

    <section className="payment-plans" aria-label="Opciones de acceso">
      {(Object.keys(PAYMENT_PLANS) as PaymentPlan[]).map((key) => { const item = PAYMENT_PLANS[key]; const selected = plan === key; return <button key={key} type="button" className={`payment-plan${selected ? ' is-selected' : ''}${key === 'lifetime' ? ' is-featured' : ''}`} onClick={() => setPlan(key)}>
        {key === 'lifetime' && <span className="payment-plan-badge">MEJOR OPCIÓN</span>}
        <span className="payment-plan-check">{selected && <Check size={15} />}</span>
        <span className="payment-plan-copy"><b>{duration[key]}</b><small>{key === '30_days' ? '30 días de acceso completo' : key === 'annual' ? '365 días de acceso completo' : 'Acceso completo para siempre'}</small></span>
        <span className="payment-plan-price"><strong>{ars[key]}</strong><small>ARS · o US${Number(item.amount)}</small></span>
      </button>; })}
    </section>



    <section className="payment-providers"><h2>Continuar con {duration[plan]}</h2><p className="payment-selected-price">{ars[plan]} ARS <span>· o US${Number(PAYMENT_PLANS[plan].amount)}</span></p>
      <button className="payment-provider payment-provider--mp" disabled={!config?.providers.mercadopago || busy !== null} onClick={() => void pay('mercadopago')}>{busy === 'mercadopago' ? 'Abriendo Mercado Pago…' : 'Pagar con Mercado Pago'}</button>{config && !config.providers.mercadopago && <p className="payment-provider-note">Mercado Pago · Próximamente disponible</p>}
      <button className="payment-provider payment-provider--stripe" disabled={!config?.providers.stripe || busy !== null} onClick={() => void pay('stripe')}>{busy === 'stripe' ? 'Abriendo pago…' : 'Pagar con tarjeta'}</button>{config && !config.providers.stripe && <p className="payment-provider-note">Pago con tarjeta · Próximamente disponible</p>}
      <button className="payment-provider payment-provider--paypal" disabled={!config?.providers.paypal || busy !== null} onClick={() => void pay('paypal')}>{busy === 'paypal' ? 'Abriendo PayPal…' : 'Pagar con PayPal'}</button>{config && !config.providers.paypal && <p className="payment-provider-note">PayPal · Próximamente disponible</p>}
      {message && <p className="payment-feedback" role="alert">{message}</p>}<p className="payment-fineprint">Un solo pago. Sin renovación automática. Tu acceso se activa cuando el proveedor confirma el pago.</p>
    </section><a className="payment-back" href="/">Ahora no</a>
  </div></main>;
}
