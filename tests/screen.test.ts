import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { resolveScreen } from '../app/lib/screen.ts';

type Item = { title: string; detail: string; image?: string; children?: Item[] };
type Tab = 'meditaciones' | 'biblioteca';
// Réplica mínima de buildScreens: cada vez que cambian momentNodes se
// construye un objeto de pantallas nuevo, como hace el useMemo de `screens`.
const buildScreens = (momentNodes: Item[]) => ({
  meditaciones: { eyebrow: 'MEDITACIONES', title: '¿Qué necesitás ahora?', subtitle: 'Elegí el momento.', items: momentNodes },
  biblioteca: { eyebrow: 'PARA ESCUCHAR Y LEER', title: 'Tu biblioteca', subtitle: 'Contenido.', items: [{ title: 'Meditaciones', detail: 'Prácticas.', children: momentNodes }] },
}) satisfies Record<Tab, { eyebrow: string; title: string; subtitle: string; items: Item[] }>;

const moments = Array.from({ length: 15 }, (_, i) => ({
  title: `Momento ${i + 1}`,
  detail: 'Meditación para este momento.',
  image: `/images/meditacion-${String(i + 1).padStart(2, '0')}.webp?v=20260924-1`,
}));

test('al actualizar momentNodes, las cards de Meditaciones se actualizan', () => {
  const trail: Item[] = [];
  const before = resolveScreen(buildScreens([]), 'meditaciones', trail);
  assert.equal(before.items.length, 0);
  // Llegan las meditaciones: mismo tab y mismo trail, pantallas base nuevas.
  const after = resolveScreen(buildScreens(moments), 'meditaciones', trail);
  assert.equal(after.items.length, 15);
  assert.deepEqual(after.items.map((item) => item.image), moments.map((moment) => moment.image));
  assert.equal(after.title, '¿Qué necesitás ahora?');
});

test('con un recorrido abierto se mantiene la misma lógica de encabezado', () => {
  const screens = buildScreens(moments);
  const child = screens.biblioteca.items[0];
  const resolved = resolveScreen(screens, 'biblioteca', [child]);
  assert.equal(resolved.eyebrow, 'TU BIBLIOTECA');
  assert.equal(resolved.title, 'Meditaciones');
  assert.equal(resolved.items.length, 15);
});

test('la Mini App calcula screen en cada render a partir de screens (sin useMemo)', () => {
  const source = readFileSync(new URL('../app/telegram-mini-app.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /const screen = useMemo/);
  assert.match(source, /const screen: Screen = resolveScreen\(screens, tab, trail\);/);
  assert.match(source, /const screens = useMemo\(\(\) => buildScreens\(momentNodes\), \[momentNodes\]\);/);
});
