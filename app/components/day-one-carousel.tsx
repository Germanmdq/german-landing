'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Heart, Video } from 'lucide-react';

type Item = { title: string; detail: string; image?: string; imageSize?: 'compact'; placeholder?: boolean };
export function DayOneCarousel<T extends Item>({
  items,
  onSelect,
  isFavorite,
  onFavorite,
  label = 'Prácticas del Día 1',
  initialIndex = 0,
  onIndexChange,
}: {
  label?: string;
  items: T[];
  onSelect: (item: T, index: number) => void;
  isFavorite?: (item: T) => boolean | undefined;
  onFavorite?: (item: T) => void;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [active, setActive] = useState(initialIndex);
  const activeRef = useRef(initialIndex);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const reduced = useRef(false);

  const move = useCallback((index: number, manual = true) => {
    const el = scroller.current;
    if (!el) return;
    if (manual) setPlaying(false);
    setEnded(false);
    elapsed.current = 0;
    setProgress(0);
    const cards = el.querySelectorAll<HTMLElement>('.day-one-card');
    if (!cards[index] || !cards[0]) return;
    const target = cards[index].offsetLeft - cards[0].offsetLeft;
    el.scrollTo({ left: target, behavior: 'smooth' });
    activeRef.current = index;
    setActive(index);
    onIndexChange?.(index);
  }, [onIndexChange]);

  // Solo al montar: restaurar posición si initialIndex > 0
  useEffect(() => {
    if (initialIndex <= 0) return;
    const el = scroller.current;
    if (!el) return;
    const scrollToInitial = () => {
      const cards = el.querySelectorAll<HTMLElement>('.day-one-card');
      if (cards.length > initialIndex && cards[0]) {
        const target = cards[initialIndex].offsetLeft - cards[0].offsetLeft;
        const prev = el.style.scrollBehavior;
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = target;
        requestAnimationFrame(() => {
          if (el) el.style.scrollBehavior = prev;
        });
      }
    };
    scrollToInitial();
    const frameId = requestAnimationFrame(scrollToInitial);
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reduced.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPlaying(!reduced.current && initialIndex === 0);
    const measure = () => {
      const el = root.current;
      if (!el) return;
      const frameWidth = el.closest('main')!.getBoundingClientRect().width;
      const scrollbar = frameWidth - el.clientWidth;
      el.style.setProperty('--day-gutter', `${frameWidth * .0625}px`);
      el.style.setProperty('--day-card-width', `${Math.max(frameWidth * .875 - scrollbar, 280) - 20}px`);
      el.style.setProperty('--day-caption-left', `${Math.min(32, frameWidth * (1 / 12 - .0625 / 12))}px`);
    };
    measure();
    const resize = new ResizeObserver(measure);
    if (root.current) resize.observe(root.current);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .5 });
    if (root.current) observer.observe(root.current);
    return () => { resize.disconnect(); observer.disconnect(); };
  }, [initialIndex]);

  useEffect(() => {
    if (!playing || !inView) return;
    let animation = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (!document.hidden) elapsed.current += now - last;
      last = now;
      setProgress(Math.min(1, elapsed.current / 3000));
      if (elapsed.current >= 3000) {
        if (activeRef.current === items.length - 1) {
          setPlaying(false);
          setEnded(true);
          return;
        }
        move(activeRef.current + 1, false);
      }
      animation = requestAnimationFrame(tick);
    };
    animation = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animation);
  }, [playing, inView, items.length, move]);

  // Animación de entrada por card: contenedor, luego texto (desde la
  // izquierda), luego imagen (desde la derecha), disparado por card cuando
  // entra al viewport del propio carrusel horizontal.
  useEffect(() => {
    const scrollerEl = scroller.current;
    if (!scrollerEl) return;
    const cards = Array.from(scrollerEl.querySelectorAll<HTMLElement>('.day-one-card'));
    if (!cards.length) return;
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = cards.indexOf(entry.target as HTMLElement);
        if (index === -1) return;
        setVisibleCards((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
        cardObserver.unobserve(entry.target);
      });
    }, { root: scrollerEl, threshold: 0.3 });
    cards.forEach((card) => cardObserver.observe(card));
    return () => cardObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const interrupt = () => {
    setPlaying(false);
  };

  const handleScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('.day-one-card');
    if (cards.length < 2) return;
    const stride = cards[1].offsetLeft - cards[0].offsetLeft;
    if (stride <= 0) return;
    const next = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / stride)));
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
      elapsed.current = 0;
      setProgress(0);
      setEnded(false);
      onIndexChange?.(next);
    }
  };

  return <div className="day-one-carousel" ref={root}>
    <div
      className="day-one-scroll"
      ref={scroller}
      role="region"
      aria-label={label}
      tabIndex={0}
      onPointerDown={interrupt}
      onTouchStart={interrupt}
      onWheel={interrupt}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          move(Math.max(0, Math.min(items.length - 1, activeRef.current + (event.key === 'ArrowRight' ? 1 : -1))));
        }
      }}
      onScroll={handleScroll}
    >
      <div className="day-one-track">{items.map((item, index) => <article key={item.title} className={`day-one-card${visibleCards.has(index) ? ' is-visible' : ''}`} id={`day-one-slide-${index}`} aria-label={`${index + 1} de ${items.length}: ${item.title}`}>
        <button className="day-one-open" onClick={() => { interrupt(); onSelect(item, index); }} tabIndex={active === index ? 0 : -1}>
          <span className="day-one-caption">
            <strong className="day-one-title">{item.title}</strong>
            {item.detail && <span className="day-one-subtitle">{item.detail}</span>}
          </span>
          {item.image && <span className="day-one-visual"><img className={`day-one-illustration${item.imageSize === 'compact' ? ' day-one-illustration--compact' : ''}`} src={item.image} alt="" draggable={false} /></span>}
          {!item.image && item.placeholder && <span className="day-one-visual"><span className="day-one-placeholder" aria-hidden="true"><Video size={40} /></span></span>}
        </button>
        {onFavorite && isFavorite?.(item) !== undefined && <button className="day-one-save" aria-label={`${isFavorite?.(item) ? 'Quitar' : 'Guardar'} ${item.title} ${isFavorite?.(item) ? 'de' : 'en'} favoritos`} onClick={() => { interrupt(); onFavorite(item); }} tabIndex={active === index ? 0 : -1}><Heart size={20} fill={isFavorite?.(item) ? 'currentColor' : 'none'} /></button>}
      </article>)}</div>
    </div>
    <div className="day-one-controls">
      <button className="day-one-play" aria-label={ended ? 'Repetir carrusel' : playing ? 'Pausar carrusel' : 'Reproducir carrusel'} onClick={() => { if (ended) move(0, false); setPlaying(!playing); }}>
        <svg viewBox="0 0 56 56" aria-hidden="true">{ended ? <path d="M36 27a8 8 0 1 1-8-7v-4l7 6-7 6v-4a4 4 0 1 0 4 4z" /> : playing ? <path d="M22 19h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V20a1 1 0 0 1 1-1zm10 0h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V20a1 1 0 0 1 1-1z" /> : <path d="M23.7555 36.6237c.4478 0 .8598-.1343 1.4241-.4568l10.9178-6.3322c.8598-.5016 1.3614-1.021 1.3614-1.8361 0-.8061-.5016-1.3255-1.3614-1.8271l-10.9178-6.3322c-.5643-.3314-.9762-.4657-1.4241-.4657-.9315 0-1.7555.7165-1.7555 1.9435v13.3629c0 1.227.824 1.9435 1.7555 1.9435z" />}</svg>
      </button>
      <div className="day-one-dots" role="group" aria-label="Elegir práctica">{items.map((item, index) => <button key={item.title} className={`day-one-dot${index === active ? ' current' : ''}`} aria-label={item.title} aria-current={index === active ? 'true' : undefined} aria-controls={`day-one-slide-${index}`} onClick={() => move(index)}><span>{index === active && <i style={{ transform: `scaleX(${progress})` }} />}</span></button>)}</div>
    </div>
  </div>;
}
