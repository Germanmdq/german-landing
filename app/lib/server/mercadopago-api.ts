import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { validateVerifiedPayment, type PaymentPlan } from '../payments';
import { appUrl, findPaymentById, mercadoPagoPricing, updatePayment, userExists } from './payment-server';

const apiBase = 'https://api.mercadopago.com';

function accessToken() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) throw new Error('Mercado Pago todavía no está configurado.');
  return token;
}

export function verifyMercadoPagoSignature(input: { signature: string | null; requestId: string | null; dataId: string; secret?: string }) {
  if (!input.signature || !input.requestId || !input.secret) return false;
  const parts = Object.fromEntries(input.signature.split(',').map((part) => part.trim().split('=', 2)));
  const timestamp = parts.ts;
  const received = parts.v1;
  if (!timestamp || !received || !/^[a-f0-9]{64}$/i.test(received)) return false;
  const manifest = `id:${input.dataId};request-id:${input.requestId};ts:${timestamp};`;
  const expected = createHmac('sha256', input.secret).update(manifest).digest('hex');
  return timingSafeEqual(Buffer.from(received, 'hex'), Buffer.from(expected, 'hex'));
}

export async function createMercadoPagoPreference(input: { paymentId: string; plan: PaymentPlan; email?: string }) {
  const pricing = mercadoPagoPricing(input.plan);
  if (!pricing) throw new Error('Los importes de Mercado Pago todavía no están configurados.');
  const response = await fetch(`${apiBase}/checkout/preferences`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      'Content-Type': 'application/json',
      'X-Idempotency-Key': input.paymentId,
    },
    body: JSON.stringify({
      items: [{ id: input.plan, title: `Germán Asistente · ${input.plan}`, quantity: 1, currency_id: pricing.currency, unit_price: Number(pricing.amount) }],
      payer: input.email ? { email: input.email } : undefined,
      external_reference: input.paymentId,
      metadata: { payment_id: input.paymentId, plan: input.plan },
      back_urls: {
        success: `${appUrl()}/payment/success?provider=mercadopago&payment=${input.paymentId}`,
        pending: `${appUrl()}/payment/pending?provider=mercadopago&payment=${input.paymentId}`,
        failure: `${appUrl()}/payment/cancelled?provider=mercadopago&payment=${input.paymentId}`,
      },
      auto_return: 'approved',
      notification_url: `${appUrl()}/api/payments/mercadopago/webhook`,
    }),
    cache: 'no-store',
  });
  const data = await response.json() as { id?: string; init_point?: string; message?: string };
  if (!response.ok || !data.id || !data.init_point) throw new Error(data.message || 'No pudimos iniciar el pago con Mercado Pago.');
  return { orderId: data.id, checkoutUrl: data.init_point };
}

export async function fetchMercadoPagoPayment(paymentId: string) {
  const response = await fetch(`${apiBase}/v1/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Bearer ${accessToken()}` },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('No pudimos verificar el pago con Mercado Pago.');
  return response.json() as Promise<Record<string, any>>;
}

export async function processMercadoPagoPayment(providerPaymentId: string) {
  const remote = await fetchMercadoPagoPayment(providerPaymentId);
  const paymentId = String(remote.external_reference || remote.metadata?.payment_id || '');
  const payment = paymentId ? await findPaymentById(paymentId, 'mercadopago') : null;
  if (!payment) throw new Error('La referencia del pago de Mercado Pago no es válida.');

  const exists = await userExists(payment.user_id);
  const validation = validateVerifiedPayment({
    plan: remote.metadata?.plan,
    amount: remote.transaction_amount,
    currency: remote.currency_id,
    status: remote.status,
    userExists: exists,
    referenceMatches: payment.id === paymentId && remote.metadata?.plan === payment.plan,
  }, String(payment.amount), payment.currency);
  const metadata = {
    provider_status: remote.status,
    status_detail: remote.status_detail,
    payment_method_id: remote.payment_method_id,
    verification_error: validation.ok ? null : validation.reason,
  };

  if (!validation.ok) {
    await updatePayment(payment.id, { provider_payment_id: providerPaymentId, status: remote.status === 'pending' || remote.status === 'in_process' ? 'pending' : 'failed', raw_metadata: metadata });
    return { approved: false, reason: validation.reason };
  }
  await updatePayment(payment.id, { provider_payment_id: providerPaymentId, status: 'approved', approved_at: remote.date_approved || new Date().toISOString(), raw_metadata: metadata });
  return { approved: true };
}
