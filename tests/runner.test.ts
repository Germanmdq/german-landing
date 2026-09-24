import assert from 'node:assert/strict';
import test from 'node:test';
import { runEnrollmentMinute, type MeditationMoment, type MeditationOutcome, type RunnerEnrollment } from '../supabase/functions/send-notifications/runner.ts';
import { currentDayFirstLogicalDate, logicalDateOf, toLocalStamp } from '../supabase/functions/send-notifications/schedule.ts';

// Simulación minuto a minuto del scheduler contra un "mundo" falso que replica
// las reglas de la base: deliver_program_night (fecha, inicio del día, ventana
// lógica, avance, pending_schedule), el trigger de ventana para el resto de las
// entregas y los índices únicos. Zona UTC para leer los horarios directamente.

type Schedule = { morning: string; noon: string; afternoon: string; night: string; message_interval_minutes: number };
type Delivery = { day: number; type: string; index: number | null; at: Date };
type Incident = { day: number; type: string; kind: string };
type DayContent = { audios: MeditationMoment[]; texts: number } | null;

const typeOf = (moment: MeditationMoment) => `meditation_${moment}`;
const iso = (s: string) => new Date(`${s}:00Z`);
const hhmm = (d: Date) => d.toISOString().slice(11, 16);

class World {
  enrollment: RunnerEnrollment & { last_night_local_date: string | null; pending_schedule: Schedule | null };
  deliveries: Delivery[] = [];
  incidents: Incident[] = [];
  now = new Date(0);
  totalDays: number;
  content: (day: number) => DayContent;
  // Con dbGuard = false se apaga la réplica de los controles de la base
  // (ventana lógica en el trigger y en deliver_program_night), para probar que
  // la Edge Function sola ya respeta la regla.
  dbGuard = true;
  constructor(schedule: Schedule, currentDay: number, dayStartedAt: string, lastNight: string | null, totalDays: number, content: (day: number) => DayContent) {
    this.totalDays = totalDays;
    this.content = content;
    this.enrollment = {
      status: 'active', timezone: 'UTC', current_day: currentDay,
      started_at: '2026-09-01T10:00:00Z', current_day_started_at: new Date(`${dayStartedAt}:00Z`).toISOString(),
      ...schedule, last_night_local_date: lastNight, pending_schedule: null,
    };
  }
  exists(day: number, type: string, index: number | null) {
    return this.deliveries.some((d) => d.day === day && d.type === type && d.index === index);
  }
  firstLogicalDate() {
    return currentDayFirstLogicalDate(toLocalStamp(new Date(this.enrollment.current_day_started_at!), 'UTC'), this.enrollment.current_day)!;
  }
  // Réplica del trigger validate_active_program_delivery (ventana del día).
  insideWindow() {
    if (!this.dbGuard) return true;
    return logicalDateOf(toLocalStamp(this.now, 'UTC')) >= this.firstLogicalDate();
  }
  incident(day: number, type: string, kind: string) {
    if (!this.incidents.some((i) => i.day === day && i.type === type && i.kind === kind)) this.incidents.push({ day, type, kind });
  }
  // Réplica de update_program_schedule.
  changeSchedule(schedule: Partial<Schedule>) {
    const next = { ...this.currentSchedule(), ...schedule };
    if (this.deliveries.some((d) => d.day === this.enrollment.current_day)) this.enrollment.pending_schedule = next;
    else Object.assign(this.enrollment, next, { pending_schedule: null });
  }
  currentSchedule(): Schedule {
    const { morning, noon, afternoon, night, message_interval_minutes } = this.enrollment;
    return { morning: morning!, noon: noon!, afternoon: afternoon!, night: night!, message_interval_minutes: message_interval_minutes! };
  }
  // Réplica de deliver_program_night.
  night(snapshotDay: number, occurrenceDate: string): MeditationOutcome {
    const e = this.enrollment;
    if (e.status !== 'active' || e.current_day !== snapshotDay) return 'exists';
    if (e.last_night_local_date && e.last_night_local_date >= occurrenceDate) return 'exists';
    const occurrence = new Date(`${occurrenceDate}T${e.night}:00Z`);
    if (occurrence <= new Date(e.current_day_started_at!)) return 'skipped';
    if (this.dbGuard && logicalDateOf(toLocalStamp(occurrence, 'UTC')) < this.firstLogicalDate()) return 'skipped';
    if (occurrence > this.now) return 'skipped';
    let inserted = false;
    if (!this.exists(e.current_day, 'meditation_night', null)) {
      const content = this.content(e.current_day);
      if (!content) { this.incident(e.current_day, 'meditation_night', 'missing_day_content'); return 'skipped'; }
      if (!content.audios.includes('night')) { this.incident(e.current_day, 'meditation_night', 'missing_meditation_audio'); return 'skipped'; }
      this.deliveries.push({ day: e.current_day, type: 'meditation_night', index: null, at: this.now });
      inserted = true;
    }
    if (e.current_day >= this.totalDays) {
      e.status = 'completed';
    } else {
      e.current_day += 1;
      e.current_day_started_at = this.now.toISOString();
      e.last_night_local_date = occurrenceDate;
      if (e.pending_schedule) Object.assign(e, e.pending_schedule, { pending_schedule: null });
    }
    return inserted ? 'created' : 'exists';
  }
  async minute(at: Date, runs = 1) {
    this.now = at;
    for (let r = 0; r < runs; r += 1) {
      const snapshot = { ...this.enrollment };
      await runEnrollmentMinute(snapshot, at, {
        meditationExists: async (moment) => this.exists(snapshot.current_day, typeOf(moment), null),
        processMeditation: async (moment, occurrenceDate) => {
          if (moment === 'night') return this.night(snapshot.current_day, occurrenceDate);
          const day = snapshot.current_day;
          if (this.exists(day, typeOf(moment), null)) return 'exists';
          const content = this.content(day);
          if (!content) { this.incident(day, typeOf(moment), 'missing_day_content'); return 'skipped'; }
          if (!content.audios.includes(moment)) { this.incident(day, typeOf(moment), 'missing_meditation_audio'); return 'skipped'; }
          if (this.enrollment.current_day !== day || !this.insideWindow()) return 'skipped';
          this.deliveries.push({ day, type: typeOf(moment), index: null, at });
          return 'created';
        },
        processIntermediateMessage: async (index) => {
          const day = snapshot.current_day;
          if (this.exists(day, 'intermediate_message', index)) return;
          const content = this.content(day);
          if (!content || index > content.texts) return;
          if (this.enrollment.current_day !== day || !this.insideWindow()) return;
          this.deliveries.push({ day, type: 'intermediate_message', index, at });
        },
        recordOverdue: async (moment) => this.incident(snapshot.current_day, typeOf(moment), 'meditation_overdue_uncaught'),
      }, { catchUpMinutes: 30, overdueAlertWindowMinutes: 5 });
    }
  }
  async run(from: string, to: string, hooks: Record<string, () => void> = {}, options: { skip?: [string, string]; runs?: number } = {}) {
    const end = iso(to).getTime();
    const skipFrom = options.skip ? iso(options.skip[0]).getTime() : null;
    const skipTo = options.skip ? iso(options.skip[1]).getTime() : null;
    for (let t = iso(from).getTime(); t <= end; t += 60_000) {
      const at = new Date(t);
      hooks[at.toISOString().slice(0, 16)]?.();
      if (skipFrom != null && skipTo != null && t >= skipFrom && t < skipTo) continue;
      await this.minute(at, options.runs);
    }
  }
  of(day: number) { return this.deliveries.filter((d) => d.day === day); }
  between(from: string, to: string) { return this.deliveries.filter((d) => d.at >= iso(from) && d.at < iso(to)); }
}

const ALL: MeditationMoment[] = ['morning', 'noon', 'afternoon', 'night'];
const full: (day: number) => DayContent = () => ({ audios: ALL, texts: 32 });
const base: Schedule = { morning: '07:00', noon: '12:00', afternoon: '21:40', night: '22:00', message_interval_minutes: 30 };
const D = '2026-10-01';
const D1 = '2026-10-02';

// Día 3 de 7: empezó con la noche del 30/09 a las 22:00.
const newWorld = (schedule: Schedule = base, content = full, dbGuard = true) => {
  const world = new World(schedule, 3, '2026-09-30T22:00', '2026-09-30', 7, content);
  world.dbGuard = dbGuard;
  return world;
};
// Los casos de R1 se prueban con cada capa por separado: sólo la Edge
// Function (sin controles de base) y sólo la base (la réplica de SQL).
const layers = [{ label: 'Edge Function', dbGuard: false }, { label: 'con controles SQL', dbGuard: true }];

function assertNoDuplicates(world: World) {
  const keys = world.deliveries.map((d) => `${d.day}|${d.type}|${d.index}`);
  assert.equal(new Set(keys).size, keys.length, 'hay entregas duplicadas');
}

for (const layer of layers) test(`[${layer.label}] R1.1 tarde 21:40 / noche 22:00: después de la noche no sale nada del Día N+1 esa misma fecha`, async () => {
  const world = newWorld(base, full, layer.dbGuard);
  await world.run(`${D}T06:00`, `${D1}T23:00`);
  const night3 = world.of(3).find((d) => d.type === 'meditation_night')!;
  assert.equal(hhmm(night3.at), '22:00');
  assert.deepEqual(world.between(`${D}T22:00`, `${D1}T07:00`).map((d) => `${d.day}:${d.type}`), ['3:meditation_night']);
  assert.equal(world.of(4).filter((d) => d.at < iso(`${D1}T07:00`)).length, 0);
  assert.equal(world.enrollment.current_day, 5);
  assertNoDuplicates(world);
});

for (const layer of layers) test(`[${layer.label}] R1.2 noche 22:00; a las 22:10 cambio a tarde 22:15 / noche 23:30: no sale la tarde del Día N+1 a las 22:15`, async () => {
  const world = newWorld(base, full, layer.dbGuard);
  await world.run(`${D}T06:00`, `${D1}T23:45`, {
    [`${D}T22:10`]: () => world.changeSchedule({ afternoon: '22:15', night: '23:30' }),
  });
  // El cambio se aplicó ya (el Día 4 todavía no tenía entregas)…
  assert.equal(world.enrollment.pending_schedule, null);
  // …pero esa misma noche no sale nada del Día 4: ni tarde, ni textos, ni noche.
  assert.deepEqual(world.between(`${D}T22:01`, `${D1}T07:00`), []);
  const day4 = world.of(4);
  assert.equal(hhmm(day4.find((d) => d.type === 'meditation_afternoon')!.at), '22:15');
  assert.equal(day4.find((d) => d.type === 'meditation_afternoon')!.at.toISOString().slice(0, 10), D1);
  assert.equal(hhmm(day4.find((d) => d.type === 'meditation_night')!.at), '23:30');
  assert.equal(world.enrollment.current_day, 5);
  assertNoDuplicates(world);
});

for (const layer of layers) test(`[${layer.label}] R1.3 pending_schedule aplicado en la noche: con horas posteriores a la noche vieja, nada del nuevo día esa noche`, async () => {
  const world = newWorld(base, full, layer.dbGuard);
  await world.run(`${D}T06:00`, `${D1}T23:45`, {
    // A las 13:00 el Día 3 ya tuvo entregas → queda pendiente.
    [`${D}T13:00`]: () => world.changeSchedule({ afternoon: '22:15', night: '23:30' }),
  });
  const night3 = world.of(3).find((d) => d.type === 'meditation_night')!;
  assert.equal(hhmm(night3.at), '22:00', 'el Día 3 termina con su horario viejo');
  assert.deepEqual(world.between(`${D}T22:01`, `${D1}T07:00`), []);
  assert.equal(world.enrollment.afternoon, '22:15');
  assert.equal(hhmm(world.of(4).find((d) => d.type === 'meditation_night')!.at), '23:30');
  assertNoDuplicates(world);
});

for (const layer of layers) test(`[${layer.label}] R1.4 los textos intermedios no empiezan la misma noche después de avanzar`, async () => {
  const world = newWorld(base, full, layer.dbGuard);
  await world.run(`${D}T06:00`, `${D1}T12:00`, {
    // Nueva noche 23:30 → habría turnos de texto a las 22:30 y 23:00.
    [`${D}T22:05`]: () => world.changeSchedule({ night: '23:30' }),
  });
  const textsDay4 = world.of(4).filter((d) => d.type === 'intermediate_message');
  assert.ok(textsDay4.length > 0, 'al día siguiente los textos sí salen');
  assert.ok(textsDay4.every((d) => d.at >= iso(`${D1}T07:30`)), 'ningún texto del Día 4 antes de su mañana');
  assert.equal(textsDay4[0].index, 1, 'la numeración empieza en 1');
});

for (const layer of layers) test(`[${layer.label}] R1 cruce de medianoche: noche 23:50 y cambio posterior a tarde 00:15 → nada a las 00:15`, async () => {
  const world = newWorld({ ...base, afternoon: '21:00', night: '23:50' }, full, layer.dbGuard);
  await world.run(`${D}T06:00`, `${D1}T08:00`, {
    [`${D}T23:55`]: () => world.changeSchedule({ afternoon: '00:15' }),
  });
  assert.deepEqual(world.between(`${D}T23:51`, `${D1}T07:00`), []);
  assert.equal(world.of(4).filter((d) => d.type === 'meditation_morning').length, 1);
});

for (const layer of layers) test(`[${layer.label}] R1.5 al día siguiente, desde la ventana correcta, todo funciona normalmente`, async () => {
  const world = newWorld(base, full, layer.dbGuard);
  await world.run(`${D}T06:00`, `${D1}T23:00`);
  const day4 = world.of(4);
  for (const moment of ALL) assert.equal(day4.filter((d) => d.type === typeOf(moment)).length, 1, moment);
  const indexes = day4.filter((d) => d.type === 'intermediate_message').map((d) => d.index!).sort((a, b) => a - b);
  // 07:30–22:00 cada 30 = 30 turnos; mediodía y noche ocupan 2 → 28 textos, 1..28.
  assert.deepEqual(indexes, Array.from({ length: 28 }, (_, i) => i + 1));
  assert.equal(world.incidents.length, 0);
});

test('noche 23:45 perdida (cron caído 23:45–00:05): se recupera una sola vez y el día siguiente es normal', async () => {
  const world = newWorld({ ...base, afternoon: '17:00', night: '23:45' });
  await world.run(`${D}T06:00`, `${D1}T23:50`, {}, { skip: [`${D}T23:45`, `${D1}T00:05`] });
  const nights = world.deliveries.filter((d) => d.type === 'meditation_night');
  assert.deepEqual(nights.map((d) => `${d.day}@${d.at.toISOString().slice(0, 16)}`), [`3@${D1}T00:05`, `4@${D1}T23:45`]);
  assert.equal(world.of(4).filter((d) => d.type === 'meditation_morning').length, 1);
  assert.equal(world.enrollment.current_day, 5);
  assertNoDuplicates(world);
});

test('cron ejecutado dos veces por minuto: una sola entrega de cada tipo y un solo avance por noche', async () => {
  const world = newWorld();
  await world.run(`${D}T06:00`, `${D1}T23:00`, {}, { runs: 2 });
  assertNoDuplicates(world);
  assert.equal(world.deliveries.filter((d) => d.type === 'meditation_night').length, 2);
  assert.equal(world.enrollment.current_day, 5);
});

test('R2 falta el audio del mediodía: incidente, sin entrega vacía, el texto de las 12:30 sale y current_day no cambia', async () => {
  const noNoon: (day: number) => DayContent = () => ({ audios: ['morning', 'afternoon', 'night'], texts: 32 });
  const world = newWorld({ ...base, afternoon: '17:00' }, noNoon);
  await world.run(`${D}T06:00`, `${D}T13:00`);
  // Queda el incidente de audio faltante (una sola vez) y, al vencer el margen
  // de recuperación, el aviso de meditación vencida. Ninguno de otro momento.
  assert.deepEqual(world.incidents.map((i) => i.kind).sort(), ['meditation_overdue_uncaught', 'missing_meditation_audio']);
  assert.ok(world.incidents.every((i) => i.day === 3 && i.type === 'meditation_noon'));
  assert.equal(world.of(3).filter((d) => d.type === 'meditation_noon').length, 0, 'no hay entrega vacía de mediodía');
  // 12:30 es el turno 11; el mediodía (alineado) ocupa uno → texto 10.
  const at1230 = world.deliveries.find((d) => hhmm(d.at) === '12:30');
  assert.deepEqual(at1230 && { type: at1230.type, index: at1230.index }, { type: 'intermediate_message', index: 10 });
  assert.equal(world.deliveries.filter((d) => d.at > iso(`${D}T12:00`) && d.at < iso(`${D}T12:30`)).length, 0);
  assert.equal(world.enrollment.current_day, 3, 'faltar un audio no altera current_day');
  assertNoDuplicates(world);
});

test('R2 los textos del resto del día siguen y la noche avanza normalmente', async () => {
  const noNoon: (day: number) => DayContent = () => ({ audios: ['morning', 'afternoon', 'night'], texts: 32 });
  const world = newWorld({ ...base, afternoon: '17:00' }, noNoon);
  await world.run(`${D}T06:00`, `${D}T22:30`);
  const indexes = world.of(3).filter((d) => d.type === 'intermediate_message').map((d) => d.index!);
  // 30 turnos; mediodía, tarde y noche alineados ocupan 3 → 27 textos, 1..27 sin huecos.
  assert.deepEqual(indexes, Array.from({ length: 27 }, (_, i) => i + 1));
  assert.equal(world.enrollment.current_day, 4);
});

test('falta el Día N+1: no avanza ni completa, queda incidente y no hay entregas vacías', async () => {
  const onlyUpTo3: (day: number) => DayContent = (day) => (day <= 3 ? { audios: ALL, texts: 32 } : null);
  const world = newWorld(base, onlyUpTo3);
  await world.run(`${D}T06:00`, `${D1}T23:00`);
  assert.equal(world.enrollment.current_day, 4);
  assert.equal(world.enrollment.status, 'active');
  assert.equal(world.of(4).length, 0);
  assert.ok(world.incidents.some((i) => i.day === 4 && i.kind === 'missing_day_content'));
});
