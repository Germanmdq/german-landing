// Orquestación de un minuto del scheduler para UNA inscripción, sin acceso
// directo a la base: todo efecto va por `deps`. Así se puede testear con
// `pnpm test` y la Edge Function sólo le pasa las implementaciones reales.

import {
  belongsToCurrentDay,
  currentDayFirstLogicalDate,
  decideMeditationSlot,
  minutesOfDay,
  toLocalStamp,
  type Occurrence,
} from './schedule.ts';

export type MeditationMoment = 'morning' | 'noon' | 'afternoon' | 'night';

// Resultado explícito de intentar una meditación:
//   created → se reservó/generó la entrega en este intento;
//   exists  → ya estaba registrada (por ejemplo, otra ejecución del cron);
//   skipped → no se generó nada (falta contenido/audio, horario no válido…).
export type MeditationOutcome = 'created' | 'exists' | 'skipped';

export type RunnerEnrollment = {
  status: 'active' | 'abandoned' | 'completed';
  timezone: string | null;
  current_day: number;
  started_at: string | null;
  current_day_started_at: string | null;
  morning: string | null;
  noon: string | null;
  afternoon: string | null;
  night: string | null;
  message_interval_minutes: number | null;
};

export type RunnerDeps = {
  meditationExists(moment: MeditationMoment): Promise<boolean>;
  processMeditation(moment: MeditationMoment, occurrenceDate: string): Promise<MeditationOutcome>;
  processIntermediateMessage(messageIndex: number): Promise<void>;
  recordOverdue(moment: MeditationMoment, occurrence: Occurrence): Promise<void>;
  logCatchUp?(moment: MeditationMoment, occurrence: Occurrence): void;
};

export type RunnerOptions = { catchUpMinutes: number; overdueAlertWindowMinutes: number };

function isExactMinute(nowMinutes: number, targetMinutes: number): boolean {
  return nowMinutes === ((targetMinutes % 1440) + 1440) % 1440;
}

// Calcula, para el momento actual, qué message_index (1-based) de mensajes
// intermedios corresponde, dado el horario mañana/noche y el intervalo
// elegido por el usuario. Devuelve null si "ahora" no cae cerca de ningún slot.
export function matchIntermediateSlot(nowMinutes: number, morning: string, night: string, intervalMinutes: number): number | null {
  // El primer intermedio va un intervalo DESPUÉS de la hora de levantarse.
  // Ej.: levantarse 07:00 con intervalo 30 => audio 1 a las 07:30.
  const start = minutesOfDay(morning) + intervalMinutes;
  let end = minutesOfDay(night);
  if (end <= start) end += 1440;
  let slot = start;
  let index = 1;
  // Incluimos el último slot. Ej.: 07:30..22:00 cada 30 min => slot base 30.
  while (slot <= end) {
    if (isExactMinute(nowMinutes, slot % 1440)) return index;
    slot += intervalMinutes;
    index += 1;
  }
  return null;
}

export function countMeditationSlotsBeforeOrAt(enrollment: Pick<RunnerEnrollment, 'morning' | 'noon' | 'afternoon' | 'night' | 'message_interval_minutes'>, baseSlot: number) {
  if (!enrollment.morning || !enrollment.message_interval_minutes || baseSlot < 1) return 0;
  const interval = enrollment.message_interval_minutes;
  const firstIntermediate = minutesOfDay(enrollment.morning) + interval;
  const currentIntermediate = firstIntermediate + (baseSlot - 1) * interval;
  const meditationTimes = [enrollment.noon, enrollment.afternoon, enrollment.night].filter(Boolean) as string[];

  return meditationTimes.reduce((count, value) => {
    let target = minutesOfDay(value);
    while (target < firstIntermediate) target += 1440;
    if (target > currentIntermediate) return count;
    // Solo resta una meditación si realmente ocupó uno de los slots del ritmo
    // intermedio. La meditación de la mañana queda fuera porque ocurre antes del
    // primer intermedio (ej.: 07:00 meditación, 07:30 audio 1).
    return (target - firstIntermediate) % interval === 0 ? count + 1 : count;
  }, 0);
}

export async function runEnrollmentMinute(enrollment: RunnerEnrollment, now: Date, deps: RunnerDeps, options: RunnerOptions) {
  if (enrollment.status !== 'active' || !enrollment.timezone) return;
  const nowLocal = toLocalStamp(now, enrollment.timezone);
  // Inicio del día lógico actual: la inscripción (Día 1) o la entrega de la
  // noche anterior. Junto con la primera fecha lógica válida define la única
  // ventana en la que este día puede generar entregas.
  const dayStartSource = enrollment.current_day_started_at || enrollment.started_at;
  const dayStartDate = dayStartSource ? new Date(dayStartSource) : null;
  const dayStart = dayStartDate && !Number.isNaN(dayStartDate.getTime())
    ? toLocalStamp(dayStartDate, enrollment.timezone)
    : null;
  const firstLogicalDate = currentDayFirstLogicalDate(dayStart, enrollment.current_day);

  const moments: MeditationMoment[] = ['morning', 'noon', 'afternoon', 'night'];
  // El turno queda ocupado sólo si una meditación efectivamente se generó (o
  // ya estaba registrada para este horario). Si falta audio o contenido, el
  // incidente se registra y los textos del día siguen saliendo.
  let slotTaken = false;
  for (const moment of moments) {
    const target = enrollment[moment];
    if (!target) continue;
    const decision = decideMeditationSlot(nowLocal, minutesOfDay(target), dayStart, firstLogicalDate, options.catchUpMinutes, options.overdueAlertWindowMinutes);
    if (decision.kind === 'due-now') {
      const outcome = await deps.processMeditation(moment, decision.occurrence.date);
      if (outcome !== 'skipped') slotTaken = true;
      continue;
    }
    if (decision.kind === 'catch-up') {
      // El catch-up sólo actúa si la meditación realmente falta. Si ya fue
      // enviada en su horario, no bloquea un intermedio posterior (por
      // ejemplo: meditación 12:00 + mensaje intermedio 12:30).
      const alreadyDelivered = await deps.meditationExists(moment);
      if (!alreadyDelivered) {
        deps.logCatchUp?.(moment, decision.occurrence);
        const outcome = await deps.processMeditation(moment, decision.occurrence.date);
        if (outcome === 'created') slotTaken = true;
      } else if (moment === 'night') {
        // Noche ya registrada pero día sin avanzar: completa el avance.
        await deps.processMeditation(moment, decision.occurrence.date);
      }
      continue;
    }
    if (decision.kind === 'overdue-alert') {
      if (!(await deps.meditationExists(moment))) await deps.recordOverdue(moment, decision.occurrence);
    }
  }

  // Una meditación ocupa ese turno. No enviamos además un intermedio en el
  // mismo slot y, por lo tanto, tampoco hacemos avanzar su numeración.
  if (slotTaken) return;

  // Los textos intermedios respetan la misma ventana del día lógico: nunca
  // empiezan la misma noche en que avanzó el día.
  if (!belongsToCurrentDay(nowLocal, dayStart, firstLogicalDate)) return;

  if (enrollment.morning && enrollment.night && enrollment.message_interval_minutes) {
    const baseSlot = matchIntermediateSlot(nowLocal.minutes, enrollment.morning, enrollment.night, enrollment.message_interval_minutes);
    if (baseSlot != null) {
      const meditationCount = countMeditationSlotsBeforeOrAt(enrollment, baseSlot);
      const messageIndex = baseSlot - meditationCount;
      if (messageIndex > 0) await deps.processIntermediateMessage(messageIndex);
    }
  }
}
