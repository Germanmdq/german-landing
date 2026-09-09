import fs from 'node:fs';
import path from 'node:path';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Falta la ruta del documento fuente.');

const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r/g, '');
const cleanBlock = (value) => value
  .split('\n')
  .filter((line) => !/^#{0,1}\s*=+\s*$/.test(line.trim()))
  .join('\n')
  .trim();

function sliceBetween(start, end) {
  const from = source.indexOf(start);
  const to = end ? source.indexOf(end, from + start.length) : source.length;
  if (from < 0) throw new Error(`No se encontró: ${start}`);
  return source.slice(from, to < 0 ? source.length : to);
}

function parsePlan(id, title, start, end) {
  const section = sliceBetween(start, end);
  const markers = [...section.matchAll(/^DIA\s+(\d+)\s+—\s+(.+)$/gm)];
  const days = markers.map((match, index) => {
    const chunk = section.slice(match.index, markers[index + 1]?.index ?? section.length);
    const textAt = chunk.search(/^--- TEXTOS DIA \d+ ---$/m);
    const meditationPart = textAt >= 0 ? chunk.slice(0, textAt) : chunk;
    const quotePart = textAt >= 0 ? chunk.slice(textAt) : '';
    const meditations = {};
    const meditationMarkers = [...meditationPart.matchAll(/^## Meditacion (manana|mediodia|tarde|noche)\s*$/gm)];
    meditationMarkers.forEach((meditation, meditationIndex) => {
      const body = meditationPart.slice(
        meditation.index + meditation[0].length,
        meditationMarkers[meditationIndex + 1]?.index ?? meditationPart.length,
      );
      meditations[meditation[1]] = cleanBlock(body);
    });
    const quotes = [...quotePart.matchAll(/^\d+\.\s+(.+)$/gm)].map((quote) => quote[1].trim());
    return { day: Number(match[1]), title: match[2].trim(), meditations, quotes };
  });
  return { id, title, days };
}

const plans = [
  parsePlan('amor', 'Amor y relaciones', '# PLAN 7 DÍAS — AMOR', 'PARTE 3 — CONTENIDO: PLAN DINERO 7 DIAS'),
  parsePlan('dinero', 'Dinero y trabajo', '# PLAN 7 DÍAS — DINERO / PROSPERIDAD', 'PARTE 4 — CONTENIDO: PLAN SALUD 7 DIAS'),
  parsePlan('salud', 'Salud y bienestar', '# PLAN 7 DÍAS — SALUD', 'PARTE 5 — CONTENIDO: 15 MEDITACIONES POR MOMENTO'),
];

const momentsSection = sliceBetween('## [antes-de-algo-importante]', null);
const momentMarkers = [...momentsSection.matchAll(/^## \[([^\]]+)\]\s+—\s+(.+)$/gm)];
const moments = momentMarkers.map((match, index) => {
  const body = momentsSection.slice(match.index + match[0].length, momentMarkers[index + 1]?.index ?? momentsSection.length);
  return { id: match[1], title: match[2].trim(), text: cleanBlock(body) };
});

const output = { plans, moments };
const target = path.resolve('app/content.generated.json');
fs.writeFileSync(target, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ target, plans: plans.map((plan) => ({ id: plan.id, days: plan.days.length, meditations: plan.days.reduce((sum, day) => sum + Object.keys(day.meditations).length, 0), quotes: plan.days.reduce((sum, day) => sum + day.quotes.length, 0) })), moments: moments.length }, null, 2));
