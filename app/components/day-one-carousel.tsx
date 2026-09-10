'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

type Item = { title: string; detail: string; image?: string; imageSize?: 'compact' };
export function DayOneCarousel<T extends Item>({ items, onSelect, isFavorite, onFavorite, label = 'Prácticas del Día 1' }: { label?: string; items: T[]; onSelect: (item: T) => void; isFavorite?: (item: T) => boolean | undefined; onFavorite?: (item: T) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const transitioning = useRef(false);
  const elapsed = useRef(0);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(true);
  const reduced = useRef(false);
  const move = useCallback((index: number, manual = true) => {
    const el = scroller.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    if (manual) setPlaying(false);
    setEnded(false);
    elapsed.current = 0;
    setProgress(0);
    const cards = el.querySelectorAll<HTMLElement>('.day-one-card');
    const target = cards[index].offsetLeft - cards[0].offsetLeft;
    const start = el.scrollLeft;
    const startTime = performance.now();
    transitioning.current = true;
    el.style.scrollSnapType = 'none';
    const tick = (now: number) => {
      const t = reduced.current ? 1 : Math.min(1, (now - startTime) / 500);
      const eased = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      el.scrollLeft = start + (target - start) * eased;
      if (!reduced.current && cards.length > 1) {
        const position = el.scrollLeft / (cards[1].offsetLeft - cards[0].offsetLeft);
        cards.forEach((card, cardIndex) => {
          const caption = card.querySelector<HTMLElement>('.day-one-caption');
          if (!caption) return;
          const offset = cardIndex - position;
          caption.style.transform = `translateX(${offset * 312}px)`;
          caption.style.opacity = String(Math.max(0, 1 - Math.abs(offset) * 3.2));
        });
      }
      if (t >= .5) setActive(index);
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else { transitioning.current = false; el.style.scrollSnapType = ''; setActive(index); el.querySelectorAll<HTMLElement>('.day-one-caption').forEach(caption => { caption.style.transform = ''; caption.style.opacity = ''; }); }
    };
    frame.current = requestAnimationFrame(tick);
  }, []);
  useEffect(() => {
    reduced.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPlaying(!reduced.current);
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
    return () => { resize.disconnect(); observer.disconnect(); cancelAnimationFrame(frame.current); };
  }, []);
  useEffect(() => {
    if (!playing || !inView) return;
    let animation = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (!transitioning.current && !document.hidden) elapsed.current += now - last;
      last = now;
      setProgress(Math.min(1, elapsed.current / 3000));
      if (elapsed.current >= 3000) {
        if (active === items.length - 1) { setPlaying(false); setEnded(true); return; }
        move(active + 1, false);
      }
      animation = requestAnimationFrame(tick);
    };
    animation = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animation);
  }, [playing, active, inView, items.length, move]);
  const interrupt = () => {
    setPlaying(false);
    cancelAnimationFrame(frame.current);
    transitioning.current = false;
    if (scroller.current) { scroller.current.style.scrollSnapType = ''; scroller.current.querySelectorAll<HTMLElement>('.day-one-caption').forEach(caption => { caption.style.transform = ''; caption.style.opacity = ''; }); }
  };
  return <div className="day-one-carousel" ref={root}>
    <div className="day-one-scroll" ref={scroller} role="region" aria-label={label} tabIndex={0} onPointerDown={interrupt} onWheel={interrupt} onKeyDown={(event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(Math.max(0, Math.min(items.length - 1, active + (event.key === 'ArrowRight' ? 1 : -1)))); }
    }} onScroll={() => {
      if (transitioning.current || !scroller.current) return;
      const el = scroller.current;
      const cards = el.querySelectorAll<HTMLElement>('.day-one-card');
      if (cards.length < 2) return;
      const next = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / (cards[1].offsetLeft - cards[0].offsetLeft))));
      if (next !== active) { setActive(next); elapsed.current = 0; setProgress(0); setEnded(false); }
    }}>
      <div className="day-one-track">{items.map((item, index) => <article key={item.title} className="day-one-card" id={`day-one-slide-${index}`} aria-label={`${index + 1} de ${items.length}: ${item.title}`}>
        <button className="day-one-open" onClick={() => { interrupt(); onSelect(item); }} tabIndex={active === index ? 0 : -1}>
          <span className="day-one-caption">{item.title}<br />{item.detail}</span>
          {item.image && <span className="day-one-visual"><img className={`day-one-illustration${item.imageSize === 'compact' ? ' day-one-illustration--compact' : ''}`} src={item.image} alt="" draggable={false} /></span>}
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
