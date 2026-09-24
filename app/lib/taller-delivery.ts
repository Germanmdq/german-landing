export type TallerDeliveryType = 'meditation_morning' | 'meditation_noon' | 'meditation_afternoon' | 'meditation_night' | 'intermediate_message';

export const deliveryTypeLabels: Record<TallerDeliveryType, string> = {
  meditation_morning: 'Meditación de la mañana',
  meditation_noon: 'Meditación del mediodía',
  meditation_afternoon: 'Meditación de la tarde',
  meditation_night: 'Meditación de la noche',
  intermediate_message: 'Mensaje de Germán',
};

const deliveryMomentPatterns: Partial<Record<TallerDeliveryType, RegExp>> = {
  meditation_morning: /ma(ñ|n)ana/i,
  meditation_noon: /mediod(í|i)a/i,
  meditation_afternoon: /tarde/i,
  meditation_night: /noche/i,
};

const cleanParagraphs = (text: string) => text
  .replace(/<br\s*\/?>/gi, '\n')
  .split(/\n\s*\n/)
  .map((part) => part.trim())
  .filter(Boolean);

export function extractMeditationSection(body: string, deliveryType: TallerDeliveryType): string[] | null {
  const momentPattern = deliveryMomentPatterns[deliveryType];
  if (!momentPattern) return null;
  const lines = body.replace(/<br\s*\/?>/gi, '\n').replace(/\r\n?/g, '\n').split('\n');
  let capturing = false;
  const captured: string[] = [];
  for (const line of lines) {
    const isHeader = /^#{1,6}\s+/.test(line);
    if (isHeader) {
      if (capturing) break;
      if (/medita/i.test(line) && momentPattern.test(line)) capturing = true;
      continue;
    }
    if (capturing) captured.push(line);
  }
  const paragraphs = cleanParagraphs(captured.join('\n').trim());
  return paragraphs.length ? paragraphs : null;
}

export function findNumberedMessage(body: string, index: number): string[] | null {
  const normalizedBody = body.replace(/<br\s*\/?>/gi, '\n').replace(/\r\n?/g, '\n');
  const marker = new RegExp(`(?:^|\\n)\\s*(?:\\*\\*)?0*${index}\\.(?:\\*\\*)?\\s*`, 'm');
  const match = marker.exec(normalizedBody);
  if (match) {
    const afterMarker = normalizedBody.slice(match.index + match[0].length);
    const nextMarkerIndex = afterMarker.search(/\n\s*(?:\*\*)?0*\d+\.(?:\*\*)?\s*/m);
    const paragraphs = cleanParagraphs((nextMarkerIndex >= 0 ? afterMarker.slice(0, nextMarkerIndex) : afterMarker).trim());
    return paragraphs.length ? paragraphs : null;
  }

  // Algunos recorridos conservan la numeración maestra de grabación (p. ej.
  // 6337–6368) en vez de 01–32. En ese caso message_index sigue siendo
  // ordinal (1–32): seleccionamos el bloque por posición, sin perder el ID
  // editorial visible.
  const matches = [...normalizedBody.matchAll(/(?:^|\n)\s*(?:\*\*)?(\d+)\.(?:\*\*)?\s*/gm)];
  const current = matches[index - 1];
  if (!current || current.index == null) return null;
  const next = matches[index];
  const start = current.index + current[0].length;
  const end = next?.index ?? normalizedBody.length;
  const paragraphs = cleanParagraphs(normalizedBody.slice(start, end).trim());
  return paragraphs.length ? paragraphs : null;
}

export function intermediateDisplayNumber(body: string, index: number | null): number | null {
  if (index == null) return null;
  const normalizedBody = body.replace(/<br\s*\/?>/gi, '\n').replace(/\r\n?/g, '\n');
  const matches = [...normalizedBody.matchAll(/(?:^|\n)\s*(?:\*\*)?(\d+)\.(?:\*\*)?\s*/gm)];
  const numbered = matches[index - 1]?.[1];
  return numbered ? Number(numbered) : index;
}

export function extractDeliveryParagraphs(body: string, deliveryType: TallerDeliveryType, messageIndex: number | null): string[] | null {
  return deliveryType === 'intermediate_message'
    ? (messageIndex == null ? null : findNumberedMessage(body, messageIndex))
    : extractMeditationSection(body, deliveryType);
}

export const formatDeliveredAt = (iso: string) => new Date(iso).toLocaleString('es-AR', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});
