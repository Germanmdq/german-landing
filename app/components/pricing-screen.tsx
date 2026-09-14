'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PAYMENT_PLANS, type PaymentPlan, type PaymentProvider } from '../lib/payments';
import './payments.css';

type ProviderConfig = { providers: Record<PaymentProvider, boolean>; mercadoPagoPrices: Partial<Record<PaymentPlan, { amount: string; currency: string }>> };

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
    <header className="payment-hero"><img src="/images/german-welcome.png" alt="Germán Asistente" /><p className="payment-eyebrow">ELEGÍ TU ACCESO</p><h1>Seguí imaginando con Germán</h1><p>Un solo pago, sin renovaciones automáticas. Elegí el tiempo que mejor te acompañe.</p></header>
    <section className="payment-plans" aria-label="Opciones de acceso">{(Object.keys(PAYMENT_PLANS) as PaymentPlan[]).map((key) => { const item = PAYMENT_PLANS[key]; return <button key={key} type="button" className={`payment-plan${plan === key ? ' is-selected' : ''}${key === 'lifetime' ? ' is-featured' : ''}`} onClick={() => setPlan(key)}>{key === 'lifetime' && <span className="payment-plan-badge">MEJOR ELECCIÓN</span>}<b>{item.name}</b><small>{key === '30_days' ? 'Acceso durante 30 días' : key === 'annual' ? 'Acceso durante 365 días' : 'Acceso para siempre'}</small><strong>USD {Number(item.amount)}</strong></button>; })}</section>
    <section className="payment-providers"><h2>¿Cómo querés pagar?</h2>
      <button className="payment-provider" disabled={!config?.providers.mercadopago || busy !== null} onClick={() => void pay('mercadopago')}>{busy === 'mercadopago' ? 'Abriendo Mercado Pago…' : 'Continuar con Mercado Pago'}</button>{config && !config.providers.mercadopago && <p className="payment-provider-note">Mercado Pago · Próximamente disponible</p>}
      <button className="payment-provider" disabled={!config?.providers.paypal || busy !== null} onClick={() => void pay('paypal')}>{busy === 'paypal' ? 'Abriendo PayPal…' : 'Continuar con PayPal'}</button>{config && !config.providers.paypal && <p className="payment-provider-note">PayPal · Próximamente disponible</p>}
      {message && <p className="payment-feedback" role="alert">{message}</p>}<p className="payment-fineprint">Tu acceso se activa solamente después de que el proveedor confirma el pago.</p>
    </section><a className="payment-back" href="/">Volver al Asistente</a>
  </div></main>;
}
