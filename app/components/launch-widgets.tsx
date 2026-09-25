'use client';

import './launch-widgets.css';
import { ArrowLeft } from 'lucide-react';

// Contenido que todavía no se habilita en el lanzamiento inicial. La previa
// (listados, índices, títulos, estructura) se ve siempre; el contenido real
// (texto o audio) se reemplaza por LaunchDateCard mientras el área esté en
// true. Para habilitar un área alcanza con pasar su valor a false.
export const LAUNCH_PENDING = {
  meditaciones: true,
  curso365: true,
  libros: true,
  // Consultas: la sección se ve completa; se bloquea recién al enviar.
  consultas: true,
} as const;

export type LaunchArea = keyof typeof LAUNCH_PENDING;

// Único punto de decisión del bloqueo de lanzamiento.
export function isLaunchPending(area: LaunchArea): boolean {
  return LAUNCH_PENDING[area];
}

const WHATSAPP_NUMBER = '5492236151152';
export const TRIAL_ENDED_WHATSAPP_TEXT = 'Hola Germán, quiero seguir usando el Asistente Germán.';
export const trialEndedWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(TRIAL_ENDED_WHATSAPP_TEXT)}`;

type TelegramWebAppLinks = { openLink?: (url: string) => void };

// Dentro de la Mini App de Telegram un enlace externo tiene que salir por
// Telegram.WebApp.openLink para abrir WhatsApp de verdad; en el navegador,
// una pestaña nueva (o la misma, si el navegador la bloquea).
function openExternal(url: string) {
  const webApp = (window as typeof window & { Telegram?: { WebApp?: TelegramWebAppLinks } }).Telegram?.WebApp;
  if (webApp?.openLink) {
    webApp.openLink(url);
    return;
  }
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;
}

export function LaunchDateCard() {
  return <section className="launch-card" aria-labelledby="launch-card-title">
    <div className="launch-card-date" aria-hidden="true">
      <svg className="launch-card-ring" viewBox="0 0 88 88"><circle cx="44" cy="44" r="41" /></svg>
      <small>DOM</small>
      <b>27</b>
      <small>SEP</small>
    </div>
    <div className="launch-card-copy">
      <h2 id="launch-card-title">Disponible el domingo <span>27 de septiembre</span></h2>
      <p>Estamos terminando de preparar esta experiencia para vos.</p>
    </div>
  </section>;
}

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
  </svg>;
}

// Fin de la prueba de 72 horas. El progreso no se toca: al habilitar el acceso
// la persona sigue exactamente donde estaba.
export function TrialEndedScreen({ onBack }: { onBack?: () => void }) {
  return <main className="app-shell trial-ended-screen">
    <section className="trial-ended-card" aria-labelledby="trial-ended-title">
      {onBack && <button type="button" className="header-back" onClick={onBack}><ArrowLeft size={18} />Volver</button>}
      <div className="trial-ended-mark" aria-hidden="true"><span>G</span></div>
      <h1 id="trial-ended-title">¿Querés seguir experimentando esta aplicación?</h1>
      <p>Durante estas horas ya pudiste escuchar, leer y probar cómo funciona el Asistente Germán.</p>
      <p>Si querés seguir usándolo, escribime por WhatsApp.</p>
      <a
        className="trial-ended-whatsapp"
        href={trialEndedWhatsAppUrl}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => { event.preventDefault(); openExternal(trialEndedWhatsAppUrl); }}
      >
        <WhatsAppIcon />
        <span>Seguir con el Asistente</span>
      </a>
    </section>
  </main>;
}
