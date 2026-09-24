// Lógica pura de horarios del scheduler (sin dependencias de Supabase), para
// poder testearla con `pnpm test` además de usarla desde la Edge Function.
//
// Todo se razona en "sello local" = (fecha local, minuto del día) en la zona
// horaria de la inscripción. Así una meditación queda ligada a la FECHA LOCAL
// en la que ocurrió su horario, y no sólo a "hace X minutos".

export type LocalStamp = { date: string; minutes: number };

// Ocurrencia concreta de un horario: la fecha local a la que pertenece y
// cuántos minutos pasaron desde entonces (0 = es exactamente este minuto).
export type Occurrence = LocalStamp & { elapsed: number };

export function minutesOfDay(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
}

export function localMinutesNow(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, hour12: false, hour: '2-digit', minute: '2-digit' }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0') % 24;
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  return hour * 60 + minute;
}

export function localDateKey(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const year = parts.find((p) => p.type === 'year')?.value ?? '';
  const month = parts.find((p) => p.type === 'month')?.value ?? '';
  const day = parts.find((p) => p.type === 'day')?.value ?? '';
  return `${year}-${month}-${day}`;
}

export function toLocalStamp(date: Date, timeZone: string): LocalStamp {
  return { date: localDateKey(date, timeZone), minutes: localMinutesNow(date, timeZone) };
}

export function previousDateKey(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day - 1)).toISOString().slice(0, 10);
}

export function compareLocal(a: LocalStamp, b: LocalStamp): number {
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;
  return a.minutes - b.minutes;
}

// La ocurrencia más reciente (ya llegada) de un horario: la de hoy si ya pasó
// o es este minuto; si todavía no llegó hoy, la de ayer. Esto distingue
// "noche de ayer todavía recuperable" de "noche de hoy que todavía no llegó".
export function latestOccurrence(now: LocalStamp, targetMinutes: number): Occurrence {
  if (targetMinutes <= now.minutes) {
    return { date: now.date, minutes: targetMinutes, elapsed: now.minutes - targetMinutes };
  }
  return { date: previousDateKey(now.date), minutes: targetMinutes, elapsed: now.minutes + 1440 - targetMinutes };
}

export type MeditationSlotDecision =
  | { kind: 'due-now'; occurrence: Occurrence }
  | { kind: 'catch-up'; occurrence: Occurrence }
  | { kind: 'overdue-alert'; occurrence: Occurrence }
  | { kind: 'none' };

// Decide qué hacer con un horario de meditación en este minuto.
//
// `dayStart` es el instante (en sello local) en que empezó el día lógico
// actual de la inscripción: la inscripción para el Día 1, o la entrega de la
// noche anterior para los demás. Una ocurrencia sólo pertenece al día actual
// si es ESTRICTAMENTE posterior a ese inicio. Eso impide:
//   - recuperar horarios previos a la inscripción;
//   - volver a tomar la noche recién entregada (23:52 → 00:00);
//   - mandar la tarde del día siguiente justo después de avanzar el día
//     (tarde 21:40, noche 22:00 → a las 22:01 no llega la tarde de N+1).
export function decideMeditationSlot(
  now: LocalStamp,
  targetMinutes: number,
  dayStart: LocalStamp | null,
  catchUpMinutes: number,
  alertWindowMinutes: number,
): MeditationSlotDecision {
  const occurrence = latestOccurrence(now, targetMinutes);
  if (dayStart && compareLocal(occurrence, dayStart) <= 0) return { kind: 'none' };
  if (occurrence.elapsed === 0) return { kind: 'due-now', occurrence };
  if (occurrence.elapsed <= catchUpMinutes) return { kind: 'catch-up', occurrence };
  if (occurrence.elapsed <= catchUpMinutes + alertWindowMinutes) return { kind: 'overdue-alert', occurrence };
  return { kind: 'none' };
}
