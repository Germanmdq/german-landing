export type PaymentPlan = '30_days' | 'annual' | 'lifetime';
export type PaymentProvider = 'mercadopago' | 'paypal' | 'stripe';

export const PAYMENT_PLANS: Record<PaymentPlan, { name: string; amount: string; currency: 'USD'; days: number | null }> = {
  '30_days': { name: '30 días', amount: '35.00', currency: 'USD', days: 30 },
  annual: { name: '1 año', amount: '300.00', currency: 'USD', days: 365 },
  lifetime: { name: 'De por vida', amount: '350.00', currency: 'USD', days: null },
};

export type Entitlement = {
  access_until: string | null;
  lifetime: boolean;
} | null;

export function isPaymentPlan(value: unknown): value is PaymentPlan {
  return value === '30_days' || value === 'annual' || value === 'lifetime';
}

export function hasActiveAccess(entitlement: Entitlement, now = new Date()): boolean {
  if (!entitlement) return false;
  if (entitlement.lifetime) return true;
  if (!entitlement.access_until) return false;
  return new Date(entitlement.access_until).getTime() > now.getTime();
}

/** Server-authoritative access rule for the initial account window. */
export function hasAccess(entitlement: Entitlement, userCreatedAt: string | null | undefined, now = new Date()): boolean {
  if (hasActiveAccess(entitlement, now)) return true;
  if (!userCreatedAt) return false;
  const created = new Date(userCreatedAt).getTime();
  return Number.isFinite(created) && now.getTime() < created + 48 * 60 * 60 * 1000;
}

export function extendEntitlement(entitlement: Entitlement, plan: PaymentPlan, now = new Date()): Entitlement {
  if (entitlement?.lifetime || plan === 'lifetime') return { access_until: entitlement?.access_until ?? null, lifetime: true };
  const base = Math.max(now.getTime(), entitlement?.access_until ? new Date(entitlement.access_until).getTime() : 0);
  const days = PAYMENT_PLANS[plan].days;
  return { access_until: new Date(base + (days || 0) * 86_400_000).toISOString(), lifetime: false };
}

export type VerifiedPaymentInput = {
  plan: unknown;
  amount: unknown;
  currency: unknown;
  status: unknown;
  userExists: boolean;
  referenceMatches: boolean;
};

export function validateVerifiedPayment(input: VerifiedPaymentInput, expectedAmount: string, expectedCurrency: string): { ok: true } | { ok: false; reason: string } {
  if (!isPaymentPlan(input.plan)) return { ok: false, reason: 'invalid_plan' };
  if (!input.userExists) return { ok: false, reason: 'unknown_user' };
  if (!input.referenceMatches) return { ok: false, reason: 'reference_mismatch' };
  if (String(input.status).toLowerCase() !== 'approved' && String(input.status).toUpperCase() !== 'COMPLETED') return { ok: false, reason: 'not_approved' };
  if (String(input.currency).toUpperCase() !== expectedCurrency.toUpperCase()) return { ok: false, reason: 'currency_mismatch' };
  const actualCents = Math.round(Number(input.amount) * 100);
  const expectedCents = Math.round(Number(expectedAmount) * 100);
  if (!Number.isFinite(actualCents) || actualCents !== expectedCents) return { ok: false, reason: 'amount_mismatch' };
  return { ok: true };
}
