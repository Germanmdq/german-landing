import 'server-only';

import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';
import { PAYMENT_PLANS, type PaymentPlan, type PaymentProvider } from '../payments';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) throw new Error('El almacenamiento seguro de pagos no está configurado.');
  return createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function authenticateRequest(request: Request): Promise<User | null> {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (!token || !supabaseUrl || !publishableKey) return null;
  const client = createClient(supabaseUrl, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.auth.getUser(token);
  return error ? null : data.user;
}

export function appUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || 'https://german.elclubdelaimaginacion.com').replace(/\/$/, '');
}

export function paypalBaseUrl() {
  return process.env.PAYPAL_ENVIRONMENT === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
}

export async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !secret) throw new Error('PayPal todavía no está configurado.');
  const response = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('No pudimos conectarnos con PayPal.');
  const data = await response.json() as { access_token?: string };
  if (!data.access_token) throw new Error('PayPal no devolvió una autorización válida.');
  return data.access_token;
}

export function mercadoPagoPricing(plan: PaymentPlan): { amount: string; currency: string } | null {
  const currency = process.env.MERCADOPAGO_CURRENCY?.trim().toUpperCase();
  const amountKey: Record<PaymentPlan, string | undefined> = {
    '30_days': process.env.MERCADOPAGO_AMOUNT_30_DAYS,
    annual: process.env.MERCADOPAGO_AMOUNT_ANNUAL,
    lifetime: process.env.MERCADOPAGO_AMOUNT_LIFETIME,
  };
  const amount = amountKey[plan]?.trim();
  if (!currency || !/^[A-Z]{3}$/.test(currency) || !amount || !Number.isFinite(Number(amount)) || Number(amount) <= 0) return null;
  return { amount: Number(amount).toFixed(2), currency };
}

export function paymentProviderAvailability() {
  const mercadoPagoPricingReady = (Object.keys(PAYMENT_PLANS) as PaymentPlan[]).every((plan) => mercadoPagoPricing(plan));
  return {
    mercadopago: Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN && process.env.MERCADOPAGO_WEBHOOK_SECRET && mercadoPagoPricingReady && serviceRoleKey),
    paypal: Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET && process.env.PAYPAL_WEBHOOK_ID && serviceRoleKey),
  };
}

export async function createPaymentAttempt(input: { userId: string; provider: PaymentProvider; plan: PaymentPlan; amount: string; currency: string }) {
  const admin = getAdminClient();
  const { data, error } = await admin.from('payments').insert({
    user_id: input.userId,
    provider: input.provider,
    plan: input.plan,
    amount: input.amount,
    currency: input.currency,
    status: 'pending',
  }).select('id,user_id,provider,plan,amount,currency,status,provider_order_id').single();
  if (error) throw new Error(`No pudimos iniciar el pago: ${error.message}`);
  return data;
}

export async function findPaymentById(id: string, provider?: PaymentProvider) {
  const admin = getAdminClient();
  let query = admin.from('payments').select('*').eq('id', id);
  if (provider) query = query.eq('provider', provider);
  const { data, error } = await query.maybeSingle();
  if (error) throw new Error(`No pudimos consultar el pago: ${error.message}`);
  return data;
}

export async function findPaymentByOrder(provider: PaymentProvider, orderId: string) {
  const { data, error } = await getAdminClient().from('payments').select('*').eq('provider', provider).eq('provider_order_id', orderId).maybeSingle();
  if (error) throw new Error(`No pudimos consultar la orden: ${error.message}`);
  return data;
}

export async function updatePayment(id: string, values: Record<string, unknown>) {
  const { data, error } = await getAdminClient().from('payments').update(values).eq('id', id).select('*').single();
  if (error) throw new Error(`No pudimos actualizar el pago: ${error.message}`);
  return data;
}

export async function userExists(userId: string) {
  const { data, error } = await getAdminClient().auth.admin.getUserById(userId);
  return !error && Boolean(data.user);
}

export async function getEntitlement(userId: string) {
  const { data, error } = await getAdminClient().from('user_entitlements').select('access_until,lifetime').eq('user_id', userId).maybeSingle();
  if (error) throw new Error(`No pudimos consultar el acceso: ${error.message}`);
  return data;
}
