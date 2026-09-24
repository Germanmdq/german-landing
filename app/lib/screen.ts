// Pantalla visible a partir de las pantallas base, la pestaña y el recorrido.
// Se calcula en cada render: `screens` cambia cuando llegan datos asincrónicos
// (por ejemplo, las meditaciones) y un useMemo sin esa dependencia dejaba la
// pantalla vieja, con la lista vacía.
type ScreenLike<I> = { eyebrow: string; title: string; subtitle: string; items: I[] };
type TrailItem<I> = { title: string; detail: string; children?: I[] };

export function resolveScreen<Tab extends string, I, S extends ScreenLike<I>>(screens: Record<Tab, S>, tab: Tab, trail: TrailItem<I>[]): ScreenLike<I> {
  const current = trail.at(-1);
  if (current) return { eyebrow: trail.length === 1 ? screens[tab].title.toUpperCase() : trail.at(-2)?.title.toUpperCase() || screens[tab].eyebrow, title: current.title, subtitle: current.detail, items: current.children || [] };
  return screens[tab];
}
