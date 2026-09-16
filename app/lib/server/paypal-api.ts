import 'server-only';

import { PAYMENT_PLANS, validateVerifiedPayment, type PaymentPlan } from '../payments';
import { appUrl, findPaymentByOrder, getPayPalAccessToken, paypalBaseUrl, updatePayment, userExists } from './payment-server';

async function paypalFetch(path: string, options: RequestInit = {}) {
  const token = await getPayPalAccessToken();
  return fetch(`${paypalBaseUrl()}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(options.headers || {}) },
    cache: 'no-store',
  });
}

export async function createPayPalOrder(input: { paymentId: string; plan: PaymentPlan }) {
  const plan = PAYMENT_PLANS[input.plan];
  const response = await paypalFetch('/v2/checkout/orders', {
    method: 'POST',
    headers: { 'PayPal-Request-Id': input.paymentId },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: input.paymentId,
        custom_id: input.paymentId,
        invoice_id: input.paymentId,
        description: `Germán Asistente · ${plan.name}`,
        amount: { currency_code: plan.currency, value: plan.amount, breakdown: { item_total: { currency_code: plan.currency, value: plan.amount } } },
        items: [{ name: `Germán Asistente · ${plan.name}`, unit_amount: { currency_code: plan.currency, value: plan.amount }, quantity: '1', category: 'DIGITAL_GOODS', sku: input.plan }],
      }],
      payment_source: { paypal: { experience_context: {
        user_action: 'PAY_NOW',
        shipping_preference: 'NO_SHIPPING',
        // Prefer the installed PayPal consumer app on eligible mobile devices.
        // PayPal falls back to its normal web checkout when App Switch is unavailable.
        app_switch_preference: { launch_paypal_app: true },
        return_url: `${appUrl()}/payment/success?provider=paypal&payment=${input.paymentId}`,
        cancel_url: `${appUrl()}/payment/cancelled?provider=paypal&payment=${input.paymentId}`,
      } } },
    }),
  });
  const data = await response.json() as { id?: string; links?: { rel: string; href: string }[]; message?: string };
  const checkoutUrl = data.links?.find((link) => link.rel === 'payer-action' || link.rel === 'approve')?.href;
  if (!response.ok || !data.id || !checkoutUrl) throw new Error(data.message || 'No pudimos iniciar el pago con PayPal.');
  return { orderId: data.id, checkoutUrl };
}

export async function capturePayPalOrder(orderId: string, requestId: string) {
  const response = await paypalFetch(`/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, { method: 'POST', headers: { 'PayPal-Request-Id': requestId.slice(0, 38) }, body: '{}' });
  if (!response.ok && response.status !== 422) throw new Error('No pudimos confirmar el pago con PayPal.');
  return verifyAndProcessPayPalOrder(orderId);
}

export async function verifyAndProcessPayPalOrder(orderId: string) {
  const response = await paypalFetch(`/v2/checkout/orders/${encodeURIComponent(orderId)}`);
  if (!response.ok) throw new Error('No pudimos verificar la orden de PayPal.');
  const order = await response.json() as Record<string, any>;
  const payment = await findPaymentByOrder('paypal', orderId);
  if (!payment) throw new Error('La orden de PayPal no es válida.');
  const purchase = order.purchase_units?.[0];
  const capture = purchase?.payments?.captures?.[0];
  const exists = await userExists(payment.user_id);
  const validation = validateVerifiedPayment({
    plan: purchase?.items?.[0]?.sku,
    amount: purchase?.amount?.value,
    currency: purchase?.amount?.currency_code,
    status: capture?.status || order.status,
    userExists: exists,
    referenceMatches: purchase?.custom_id === payment.id && purchase?.items?.[0]?.sku === payment.plan,
  }, String(payment.amount), payment.currency);
  const metadata = { provider_status: order.status, capture_status: capture?.status, verification_error: validation.ok ? null : validation.reason };
  if (!validation.ok) {
    await updatePayment(payment.id, { provider_payment_id: capture?.id || null, status: order.status === 'APPROVED' ? 'pending' : 'failed', raw_metadata: metadata });
    return { approved: false, reason: validation.reason };
  }
  await updatePayment(payment.id, { provider_payment_id: capture.id, status: 'approved', approved_at: capture.update_time || new Date().toISOString(), raw_metadata: metadata });
  return { approved: true };
}

export async function verifyPayPalWebhook(headers: Headers, event: unknown) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) return false;
  const response = await paypalFetch('/v1/notifications/verify-webhook-signature', {
    method: 'POST',
    body: JSON.stringify({
      auth_algo: headers.get('paypal-auth-algo'),
      cert_url: headers.get('paypal-cert-url'),
      transmission_id: headers.get('paypal-transmission-id'),
      transmission_sig: headers.get('paypal-transmission-sig'),
      transmission_time: headers.get('paypal-transmission-time'),
      webhook_id: webhookId,
      webhook_event: event,
    }),
  });
  if (!response.ok) return false;
  const result = await response.json() as { verification_status?: string };
  return result.verification_status === 'SUCCESS';
}
