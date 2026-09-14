import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { extendEntitlement, hasActiveAccess, validateVerifiedPayment } from '../app/lib/payments.ts';

const now = new Date('2026-09-14T12:00:00.000Z');

test('los planes temporales otorgan exactamente 30 y 365 días', () => {
  assert.equal(extendEntitlement(null, '30_days', now)?.access_until, '2026-10-14T12:00:00.000Z');
  assert.equal(extendEntitlement(null, 'annual', now)?.access_until, '2027-09-14T12:00:00.000Z');
});

test('el acceso temporal se acumula desde el vencimiento vigente', () => {
  const current = { access_until: '2026-10-14T12:00:00.000Z', lifetime: false };
  assert.equal(extendEntitlement(current, '30_days', now)?.access_until, '2026-11-13T12:00:00.000Z');
});

test('el acceso de por vida gana y nunca se degrada', () => {
  assert.deepEqual(extendEntitlement(null, 'lifetime', now), { access_until: null, lifetime: true });
  assert.equal(extendEntitlement({ access_until: null, lifetime: true }, '30_days', now)?.lifetime, true);
});

test('el control central reconoce acceso vigente, vencido y de por vida', () => {
  assert.equal(hasActiveAccess({ access_until: '2026-09-15T12:00:00.000Z', lifetime: false }, now), true);
  assert.equal(hasActiveAccess({ access_until: '2026-09-13T12:00:00.000Z', lifetime: false }, now), false);
  assert.equal(hasActiveAccess({ access_until: null, lifetime: true }, now), true);
  assert.equal(hasActiveAccess(null, now), false);
});

test('una vuelta exitosa no concede acceso sin verificación del proveedor', () => {
  assert.equal(hasActiveAccess(null, now), false);
  assert.deepEqual(validateVerifiedPayment({ plan: '30_days', amount: '35.00', currency: 'USD', status: 'pending', userExists: true, referenceMatches: true }, '35.00', 'USD'), { ok: false, reason: 'not_approved' });
});

test('rechaza importe, moneda, plan, usuario y referencia incorrectos', () => {
  const base = { plan: '30_days', amount: '35.00', currency: 'USD', status: 'approved', userExists: true, referenceMatches: true };
  assert.equal(validateVerifiedPayment({ ...base, amount: '34.99' }, '35.00', 'USD').ok, false);
  assert.equal(validateVerifiedPayment({ ...base, currency: 'ARS' }, '35.00', 'USD').ok, false);
  assert.equal(validateVerifiedPayment({ ...base, plan: 'otro' }, '35.00', 'USD').ok, false);
  assert.equal(validateVerifiedPayment({ ...base, userExists: false }, '35.00', 'USD').ok, false);
  assert.equal(validateVerifiedPayment({ ...base, referenceMatches: false }, '35.00', 'USD').ok, false);
});

test('la migración impide procesar dos veces el mismo pago', () => {
  const sql = readFileSync(new URL('../supabase/migrations/20260914183032_add_one_time_payments_and_entitlements.sql', import.meta.url), 'utf8');
  assert.match(sql, /unique index payments_provider_payment_unique/i);
  assert.match(sql, /old\.processed_at is not null/i);
  assert.match(sql, /payments_apply_entitlement/i);
});

test('los precios vigentes son US$35, US$250 y US$350', async () => {
  const { PAYMENT_PLANS } = await import('../app/lib/payments.ts');
  assert.equal(PAYMENT_PLANS['30_days'].amount, '35.00');
  assert.equal(PAYMENT_PLANS.annual.amount, '250.00');
  assert.equal(PAYMENT_PLANS.lifetime.amount, '350.00');
});
