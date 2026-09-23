'use client';

import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export type AnimatedInterfaceIconName =
  | 'bookmark'
  | 'brain'
  | 'calendar'
  | 'ear'
  | 'history'
  | 'menu'
  | 'notification'
  | 'open-door'
  | 'profile';

const iconSources: Record<AnimatedInterfaceIconName, string> = {
  bookmark: '/animations/interface-icons/bookmark.json',
  brain: '/animations/interface-icons/brain.json',
  calendar: '/animations/interface-icons/calendar.json',
  ear: '/animations/interface-icons/ear.json',
  history: '/animations/interface-icons/history.json',
  menu: '/animations/interface-icons/menu.json',
  notification: '/animations/interface-icons/notification.json',
  'open-door': '/animations/interface-icons/open-door.json',
  profile: '/animations/interface-icons/profile.json',
};

export function AnimatedInterfaceIcon({ name, size }: { name: AnimatedInterfaceIconName; size: number }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const playerRef = useRef<DotLottie | null>(null);
  const [reduceMotion, setReduceMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const replay = useCallback(() => {
    if (reduceMotion) return;
    playerRef.current?.setFrame(0);
    playerRef.current?.play();
  }, [reduceMotion]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(query.matches);
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const trigger = rootRef.current?.closest<HTMLElement>('button, a, [role="button"]') ?? rootRef.current;
    if (!trigger) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const replayOnHover = () => { if (finePointer.matches) replay(); };
    trigger.addEventListener('pointerenter', replayOnHover);
    trigger.addEventListener('pointerdown', replay);
    trigger.addEventListener('focusin', replay);
    return () => {
      trigger.removeEventListener('pointerenter', replayOnHover);
      trigger.removeEventListener('pointerdown', replay);
      trigger.removeEventListener('focusin', replay);
    };
  }, [replay]);

  return (
    <span ref={rootRef} style={{ display: 'block', width: size, height: size, lineHeight: 0 }} aria-hidden="true">
      <DotLottieReact
        src={iconSources[name]}
        autoplay={!reduceMotion}
        loop={false}
        dotLottieRefCallback={(player) => { playerRef.current = player; }}
        style={{ width: '100%', height: '100%' }}
        renderConfig={{ autoResize: true }}
      />
    </span>
  );
}
