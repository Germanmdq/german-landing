import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { resolveAccess } from '../app/lib/access.ts';

const now = new Date('2026-09-25T12:00:00Z');
const past = '2026-09-25T11:59:00Z';
const future = '2026-09-26T12:00:00Z';

test('prueba de 48 horas vencida → widget de fin de prueba, sin bloquear la cuenta', () => {
  const access = resolveAccess({ access_tier: 'trial', trial_expires_at: past, permissions: {} }, now);
  assert.deepEqual({ active: access.active, trialExpired: access.trialExpired, blocked: access.blocked }, { active: false, trialExpired: true, blocked: false });
});

test('prueba todavía vigente → acceso normal', () => {
  const access = resolveAccess({ access_tier: 'trial', trial_expires_at: future }, now);
  assert.equal(access.active, true);
  assert.equal(access.trialExpired, false);
});

test('fundadores, activos, limitados y cuentas sin Telegram nunca ven el fin de prueba', () => {
  for (const tier of ['founder', 'active', 'limited']) {
    const access = resolveAccess({ access_tier: tier, trial_expires_at: past }, now);
    assert.equal(access.active, true, tier);
    assert.equal(access.trialExpired, false, tier);
  }
  assert.equal(resolveAccess(null, now).active, true);
  assert.equal(resolveAccess(null, now).accessTier, 'active');
});

test('bloqueado tiene prioridad sobre la prueba vencida', () => {
  const blocked = resolveAccess({ access_tier: 'blocked', trial_expires_at: past }, now);
  assert.deepEqual({ active: blocked.active, blocked: blocked.blocked, trialExpired: blocked.trialExpired }, { active: false, blocked: true, trialExpired: false });
  const allOff = resolveAccess({ access_tier: 'trial', trial_expires_at: past, permissions: { all: false } }, now);
  assert.equal(allOff.blocked, true);
  assert.equal(allOff.trialExpired, false);
});

test('los permisos por sección se conservan', () => {
  assert.deepEqual(resolveAccess({ access_tier: 'active', permissions: { books: false } }, now).permissions, { books: false });
});

test('el vencimiento sólo decide la pantalla: la API de acceso no escribe nada', () => {
  const source = readFileSync(new URL('../app/api/access/route.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /\.(update|delete|insert|upsert)\(/);
});
