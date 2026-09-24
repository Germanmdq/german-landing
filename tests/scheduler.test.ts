import assert from 'node:assert/strict';
import test from 'node:test';
import { currentDayFirstLogicalDate, decideMeditationSlot, latestOccurrence, logicalDateOf, toLocalStamp, type LocalStamp } from '../supabase/functions/send-notifications/schedule.ts';

const CATCH_UP = 30;
const ALERT = 5;
const at = (date: string, hhmm: string): LocalStamp => {
  const [h, m] = hhmm.split(':').map(Number);
  return { date, minutes: h * 60 + m };
};
const minutes = (hhmm: string) => at('2026-01-01', hhmm).minutes;
// currentDay = 2 por defecto: el día empezó con la noche anterior.
const decide = (now: LocalStamp, target: string, dayStart: LocalStamp | null, currentDay = 2) =>
  decideMeditationSlot(now, minutes(target), dayStart, currentDayFirstLogicalDate(dayStart, currentDay), CATCH_UP, ALERT);
const occurrenceDate = (decision: ReturnType<typeof decide>) => (decision.kind === 'none' ? null : decision.occurrence.date);

test('la ocurrencia de un horario queda ligada a su fecha local (hoy o ayer)', () => {
  assert.deepEqual(latestOccurrence(at('2026-09-24', '22:10'), minutes('22:00')), { date: '2026-09-24', minutes: 1320, elapsed: 10 });
  assert.deepEqual(latestOccurrence(at('2026-09-25', '00:05'), minutes('23:45')), { date: '2026-09-24', minutes: 1425, elapsed: 20 });
  assert.deepEqual(latestOccurrence(at('2026-03-01', '00:05'), minutes('23:45')).date, '2026-02-28');
});

test('noche normal: se entrega en su minuto exacto', () => {
  const decision = decide(at('2026-09-24', '22:00'), '22:00', at('2026-09-23', '22:00'));
  assert.equal(decision.kind, 'due-now');
  assert.equal(occurrenceDate(decision), '2026-09-24');
});

test('noche 23:52 entregada: a las 00:00 no se vuelve a tomar (no avanza otro día)', () => {
  // Tras entregar la noche, el día lógico nuevo empieza a las 23:52.
  const dayStart = at('2026-09-24', '23:52');
  for (const now of ['23:53', '23:59']) assert.equal(decide(at('2026-09-24', now), '23:52', dayStart).kind, 'none');
  for (const now of ['00:00', '00:05', '00:22']) assert.equal(decide(at('2026-09-25', now), '23:52', dayStart).kind, 'none');
});

test('noche 23:45 perdida: a las 00:05 se recupera como noche de AYER, una sola vez', () => {
  const dayStart = at('2026-09-23', '23:45');
  const decision = decide(at('2026-09-25', '00:05'), '23:45', dayStart);
  assert.equal(decision.kind, 'catch-up');
  assert.equal(occurrenceDate(decision), '2026-09-24');
  // Una vez recuperada, el día lógico nuevo empieza a las 00:05: no se repite.
  const afterRecovery = at('2026-09-25', '00:05');
  assert.equal(decide(at('2026-09-25', '00:06'), '23:45', afterRecovery).kind, 'none');
  // Y la noche siguiente sí corresponde.
  assert.equal(decide(at('2026-09-25', '23:45'), '23:45', afterRecovery).kind, 'due-now');
});

test('tarde 21:40 + noche 22:00: a las 22:01 no llega la tarde del día siguiente', () => {
  const dayStartAfterNight = at('2026-09-24', '22:00');
  assert.equal(decide(at('2026-09-24', '22:01'), '21:40', dayStartAfterNight).kind, 'none');
  assert.equal(decide(at('2026-09-24', '22:10'), '21:40', dayStartAfterNight).kind, 'none');
  // Al día siguiente la tarde de N+1 sí llega en su horario.
  assert.equal(decide(at('2026-09-25', '21:40'), '21:40', dayStartAfterNight).kind, 'due-now');
});

test('nunca se recuperan horarios previos a la inscripción', () => {
  const enrolled = at('2026-09-24', '12:05');
  assert.equal(decide(at('2026-09-24', '12:06'), '12:00', enrolled, 1).kind, 'none');
  assert.equal(decide(at('2026-09-24', '17:00'), '17:00', enrolled, 1).kind, 'due-now');
  // Inscripción después de medianoche: la noche de ayer no le corresponde.
  assert.equal(decide(at('2026-09-25', '00:10'), '23:50', at('2026-09-25', '00:02'), 1).kind, 'none');
});

test('dentro del margen recupera; después sólo alerta; más tarde nada', () => {
  const dayStart = at('2026-09-24', '06:00');
  assert.equal(decide(at('2026-09-24', '12:30'), '12:00', dayStart, 1).kind, 'catch-up');
  assert.equal(decide(at('2026-09-24', '12:33'), '12:00', dayStart, 1).kind, 'overdue-alert');
  assert.equal(decide(at('2026-09-24', '12:40'), '12:00', dayStart, 1).kind, 'none');
});

test('el sello local respeta la zona horaria de la inscripción', () => {
  // 02:52 UTC del 25/09 = 23:52 del 24/09 en Buenos Aires.
  assert.deepEqual(toLocalStamp(new Date('2026-09-25T02:52:30Z'), 'America/Argentina/Buenos_Aires'), at('2026-09-24', '23:52'));
});

test('fecha lógica: la madrugada pertenece a la noche anterior', () => {
  assert.equal(logicalDateOf(at('2026-09-25', '00:15')), '2026-09-24');
  assert.equal(logicalDateOf(at('2026-09-25', '03:59')), '2026-09-24');
  assert.equal(logicalDateOf(at('2026-09-25', '04:00')), '2026-09-25');
  // Día 1 empieza en la fecha lógica de la inscripción; el resto, en la siguiente a la noche.
  assert.equal(currentDayFirstLogicalDate(at('2026-09-24', '12:05'), 1), '2026-09-24');
  assert.equal(currentDayFirstLogicalDate(at('2026-09-24', '22:00'), 5), '2026-09-25');
  assert.equal(currentDayFirstLogicalDate(at('2026-09-25', '00:05'), 5), '2026-09-25');
});
