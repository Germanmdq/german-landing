'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type MagicCardProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  children: ReactNode;
  delay?: number;
};

export function MagicCard({ children, className = '', delay = 0, style, ...props }: MagicCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  // IntersectionObserver: cuando la card entra al viewport le agregamos la
  // clase "card-visible", que dispara en CSS la animación de .card-title/
  // .card-subtitle (entran desde la izquierda) y .card-image (desde la
  // derecha) — ver .magic-card.card-visible en magic-ui.css.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.button
      {...props}
      ref={cardRef}
      className={`magic-card${visible ? ' card-visible' : ''} ${className}`}
      style={style}
      initial={className.includes('category-card') ? false : { opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
      whileTap={className.includes('category-card') ? undefined : { scale: 0.985 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
        props.onPointerMove?.(event);
      }}
    >
      {children}
    </motion.button>
  );
}

export function ShimmerButton({ children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`shimmer-button ${className}`}>
      <span className="shimmer-button__light" aria-hidden="true" />
      <span className="shimmer-button__content">{children}</span>
    </button>
  );
}

export function BorderBeam({ duration = 7 }: { duration?: number }) {
  return <span className="border-beam" style={{ '--beam-duration': `${duration}s` } as CSSProperties} aria-hidden="true" />;
}
