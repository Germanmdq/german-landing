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

function shiftDateKey(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

export function previousDateKey(dateKey: string): string {
  return shiftDateKey(dateKey, -1);
}

export function nextDateKey(dateKey: string): string {
  return shiftDateKey(dateKey, 1);
}

// --- Fecha lógica ------------------------------------------------------------
//
// Una "fecha lógica" va de las 04:00 a las 04:00 locales: la madrugada
// pertenece a la noche anterior. Así "la misma noche" en que terminó un día
// incluye el cruce de medianoche, y una noche configurada después de las
// 00:00 (por ejemplo 00:30) sigue perteneciendo a su día.
//
// Regla: el día lógico actual sólo puede generar entregas (meditaciones,
// textos, recuperaciones) cuya fecha lógica sea >= a su primera fecha válida:
//   - Día 1: la fecha lógica de la inscripción (puede empezar ese mismo día);
//   - Día N > 1: la fecha lógica SIGUIENTE a la de la noche que cerró el día
//     anterior (current_day_started_at).
// Ninguna entrega del Día N+1 puede salir durante la noche en que terminó el
// Día N, aunque después se cambien los horarios o se aplique pending_schedule.
// La misma regla está replicada en SQL (program_day_first_logical_date).
export const DAY_ROLLOVER_MINUTES = 4 * 60;

export function logicalDateOf(stamp: LocalStamp): string {
  return stamp.minutes < DAY_ROLLOVER_MINUTES ? previousDateKey(stamp.date) : stamp.date;
}

export function currentDayFirstLogicalDate(dayStart: LocalStamp | null, currentDay: number): string | null {
  if (!dayStart) return null;
  const startLogical = logicalDateOf(dayStart);
  return currentDay > 1 ? nextDateKey(startLogical) : startLogical;
}

// Una ocurrencia pertenece al día lógico actual si es estrictamente posterior
// a su inicio y cae en su ventana de fechas lógicas.
export function belongsToCurrentDay(occurrence: LocalStamp, dayStart: LocalStamp | null, firstLogicalDate: string | null): boolean {
  if (dayStart && compareLocal(occurrence, dayStart) <= 0) return false;
  if (firstLogicalDate && logicalDateOf(occurrence) < firstLogicalDate) return false;
  return true;
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
// actual: la inscripción para el Día 1, o la entrega de la noche anterior para
// los demás. `firstLogicalDate` sale de currentDayFirstLogicalDate. Una
// ocurrencia sólo cuenta si pertenece al día actual (belongsToCurrentDay).
// Eso impide:
//   - recuperar horarios previos a la inscripción;
//   - volver a tomar la noche recién entregada (23:52 → 00:00);
//   - mandar cualquier entrega del día siguiente la misma noche en que se
//     avanzó, aunque los horarios cambien después.
export function decideMeditationSlot(
  now: LocalStamp,
  targetMinutes: number,
  dayStart: LocalStamp | null,
  firstLogicalDate: string | null,
  catchUpMinutes: number,
  alertWindowMinutes: number,
): MeditationSlotDecision {
  const occurrence = latestOccurrence(now, targetMinutes);
  if (!belongsToCurrentDay(occurrence, dayStart, firstLogicalDate)) return { kind: 'none' };
  if (occurrence.elapsed === 0) return { kind: 'due-now', occurrence };
  if (occurrence.elapsed <= catchUpMinutes) return { kind: 'catch-up', occurrence };
  if (occurrence.elapsed <= catchUpMinutes + alertWindowMinutes) return { kind: 'overdue-alert', occurrence };
  return { kind: 'none' };
}
