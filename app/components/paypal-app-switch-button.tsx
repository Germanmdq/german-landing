'use client';

import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { PaymentPlan } from '../lib/payments';

type PayPalButtons = { render: (selector: string) => Promise<void>; close?: () => Promise<void>; resume?: () => Promise<void> };
type PayPalWindow = Window & typeof globalThis & { paypal?: { Buttons: (options: Record<string, unknown>) => PayPalButtons } };
let sdkPromise: Promise<void> | null = null;

function loadPayPalSdk(clientId: string) {
  const w = window as PayPalWindow;
  if (w.paypal?.Buttons) return Promise.resolve();
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&components=buttons`;
    script.async = true;
    script.dataset.sdkIntegrationSource = 'asistente-german-app-switch';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('No pudimos cargar PayPal.'));
    document.head.appendChild(script);
  });
  return sdkPromise;
}

export function PayPalAppSwitchButton({ clientId, plan, disabled, onBusy, onError }: { clientId: string; plan: PaymentPlan; disabled: boolean; onBusy: (busy: boolean) => void; onError: (message: string) => void }) {
  const paymentId = useRef<string | null>(null);
  useEffect(() => {
    if (!clientId) return;
    let disposed = false;
    let buttons: PayPalButtons | null = null;
    const setup = async () => {
      try {
        await loadPayPalSdk(clientId);
        if (disposed) return;
        const paypal = (window as PayPalWindow).paypal;
        if (!paypal?.Buttons) throw new Error('PayPal no está disponible.');
        buttons = paypal.Buttons({
          appSwitchWhenAvailable: true,
          style: { layout: 'horizontal', shape: 'rect', height: 55, label: 'paypal', tagline: false },
          createOrder: async () => {
            onBusy(true); onError('');
            const { data } = await supabase.auth.getSession();
            if (!data.session) { window.location.assign('/'); throw new Error('Necesitás iniciar sesión.'); }
            const response = await fetch('/api/payments/paypal/create', { method: 'POST', headers: { Authorization: `Bearer ${data.session.access_token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) });
            const result = await response.json() as { orderId?: string; paymentId?: string; error?: string };
            if (!response.ok || !result.orderId) throw new Error(result.error || 'No pudimos iniciar el pago con PayPal.');
            paymentId.current = result.paymentId || null;
            onBusy(false);
            return result.orderId;
          },
          onApprove: async (data: { orderID?: string }) => {
            onBusy(true);
            const { data: sessionData } = await supabase.auth.getSession();
            if (!sessionData.session || !data.orderID) throw new Error('No pudimos confirmar el pago.');
            const response = await fetch('/api/payments/paypal/capture', { method: 'POST', headers: { Authorization: `Bearer ${sessionData.session.access_token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ payment: paymentId.current, token: data.orderID }) });
            const result = await response.json() as { approved?: boolean; error?: string };
            if (!response.ok || !result.approved) throw new Error(result.error || 'PayPal todavía no confirmó el pago.');
            window.location.assign('/');
          },
          onCancel: () => onBusy(false),
          onError: (error: unknown) => { onBusy(false); onError(error instanceof Error ? error.message : 'No pudimos abrir PayPal.'); },
        });
        if (new URLSearchParams(window.location.search).has('paypal_app_switch') && buttons.resume) await buttons.resume();
        if (!disposed) await buttons.render('#paypal-app-switch-button');
      } catch (error) { onBusy(false); onError(error instanceof Error ? error.message : 'No pudimos cargar PayPal.'); }
    };
    void setup();
    return () => { disposed = true; void buttons?.close?.(); };
  }, [clientId, plan, onBusy, onError]);
  return <div id="paypal-app-switch-button" className={`paypal-app-switch-button${disabled ? ' is-disabled' : ''}`} aria-label="Pagar con PayPal" aria-disabled={disabled} />;
}
