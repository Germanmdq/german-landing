'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bell, Check, Download, Smartphone, X } from 'lucide-react';
import type { InstallPlatform, InstallPromptOutcome } from '../lib/pwa';

const iphoneSteps = [
  '/images/install/iphone/01.png',
  '/images/install/iphone/02.png',
  '/images/install/iphone/03.png',
  '/images/install/iphone/04.png',
  '/images/install/iphone/05.png',
];

type InstallOnboardingProps = {
  suggestedPlatform: InstallPlatform;
  nativePromptAvailable: boolean;
  onClose: () => void;
  onInstallAndroid: () => Promise<InstallPromptOutcome>;
  onRecheckInstallation: () => boolean;
};

export function InstallOnboarding({ suggestedPlatform, nativePromptAvailable, onClose, onInstallAndroid, onRecheckInstallation }: InstallOnboardingProps) {
  const [view, setView] = useState<'chooser' | 'ios' | 'android'>('chooser');
  const [step, setStep] = useState(0);
  const [installing, setInstalling] = useState(false);
  const [androidMessage, setAndroidMessage] = useState('');
  const touchStart = useRef<number | null>(null);

  const closeTemporarily = () => {
    onRecheckInstallation();
    onClose();
  };
  const selectPlatform = (platform: 'ios' | 'android') => {
    try { localStorage.setItem('german-install-last-platform', platform); } catch { /* Preferencia no esencial. */ }
    setView(platform);
  };
  const installAndroid = async () => {
    setInstalling(true);
    setAndroidMessage('');
    const outcome = await onInstallAndroid();
    setInstalling(false);
    if (outcome === 'dismissed') setAndroidMessage('Podés volver a intentarlo cuando quieras desde esta pantalla.');
    if (outcome === 'unavailable') setAndroidMessage('Usá la opción Instalar del menú de Chrome, como muestra la imagen.');
  };
  const moveStep = (direction: -1 | 1) => setStep((current) => Math.max(0, Math.min(iphoneSteps.length - 1, current + direction)));

  return <div className="experience-overlay" role="dialog" aria-modal="true" aria-labelledby="install-title">
    <section className={`experience-modal${view === 'chooser' ? '' : ' experience-modal--tutorial'}`}>
      <button type="button" className="experience-close" onClick={closeTemporarily} aria-label="Cerrar por ahora"><X size={20} /></button>

      {view === 'chooser' && <>
        <div className="experience-mark"><Download size={26} strokeWidth={1.9} /></div>
        <h1 id="install-title">Instalá el Asistente Germán</h1>
        <p>Instalalo en tu teléfono para recibir tus prácticas y mensajes durante el día.</p>
        <div className="device-options" aria-label="Elegí tu teléfono">
          <button type="button" className={suggestedPlatform === 'ios' ? 'is-suggested' : ''} onClick={() => selectPlatform('ios')}>
            <span className="apple-symbol" aria-hidden="true"></span>
            <strong>iPhone</strong>
            {suggestedPlatform === 'ios' && <small>Este dispositivo</small>}
            <ArrowRight size={19} />
          </button>
          <button type="button" className={suggestedPlatform === 'android' ? 'is-suggested' : ''} onClick={() => selectPlatform('android')}>
            <Smartphone size={27} strokeWidth={1.8} aria-hidden="true" />
            <strong>Android</strong>
            {suggestedPlatform === 'android' && <small>Este dispositivo</small>}
            <ArrowRight size={19} />
          </button>
        </div>
        <button type="button" className="experience-later" onClick={closeTemporarily}>Ahora no</button>
      </>}

      {view === 'ios' && <>
        <header className="tutorial-header">
          <button type="button" onClick={() => setView('chooser')}><ArrowLeft size={18} /> Volver</button>
          <span>{step + 1} / {iphoneSteps.length}</span>
        </header>
        <h1 id="install-title">Instalalo en tu iPhone</h1>
        <div className="tutorial-image-frame" onTouchStart={(event) => { touchStart.current = event.changedTouches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
          if (Math.abs(distance) > 45) moveStep(distance < 0 ? 1 : -1);
          touchStart.current = null;
        }}>
          <img src={iphoneSteps[step]} alt={`Instalación en iPhone, paso ${step + 1} de ${iphoneSteps.length}`} draggable="false" />
        </div>
        <div className="tutorial-progress" aria-hidden="true">{iphoneSteps.map((_, index) => <i key={index} className={index === step ? 'is-current' : ''} />)}</div>
        <div className="tutorial-actions">
          {step > 0 && <button type="button" className="tutorial-back" onClick={() => moveStep(-1)}><ArrowLeft size={18} /> Anterior</button>}
          <button type="button" className="tutorial-primary" onClick={() => step === iphoneSteps.length - 1 ? closeTemporarily() : moveStep(1)}>
            {step === iphoneSteps.length - 1 ? <><Check size={18} /> Ya la instalé</> : <>Siguiente <ArrowRight size={18} /></>}
          </button>
        </div>
      </>}

      {view === 'android' && <>
        <header className="tutorial-header">
          <button type="button" onClick={() => setView('chooser')}><ArrowLeft size={18} /> Volver</button>
          <span>Android</span>
        </header>
        <h1 id="install-title">Instalalo en Android</h1>
        <p className="android-instruction">Después de iniciar sesión,<br />tocá “Instalar”</p>
        <div className="tutorial-image-frame tutorial-image-frame--android">
          <img src="/images/install/android/install.png" alt="Cómo instalar Asistente Germán en Android" draggable="false" />
        </div>
        {androidMessage && <p className="install-feedback" role="status">{androidMessage}</p>}
        {nativePromptAvailable
          ? <button type="button" className="tutorial-primary tutorial-primary--wide" onClick={() => void installAndroid()} disabled={installing}><Download size={18} />{installing ? 'Abriendo…' : 'Instalar'}</button>
          : <button type="button" className="tutorial-primary tutorial-primary--wide" onClick={closeTemporarily}>Entendido</button>}
      </>}
    </section>
  </div>;
}

export function NotificationOnboarding({ busy, error, onActivate, onLater }: { busy: boolean; error: string; onActivate: () => void; onLater: () => void }) {
  return <div className="experience-overlay" role="dialog" aria-modal="true" aria-labelledby="notifications-title">
    <section className="experience-modal notification-onboarding">
      <div className="experience-mark experience-mark--bell"><Bell size={27} strokeWidth={1.9} /></div>
      <h1 id="notifications-title">Activá las notificaciones <span aria-hidden="true">🔔</span></h1>
      <p>Son una parte fundamental del Asistente Germán.</p>
      <p className="notification-detail">Vas a recibir tus prácticas y mensajes en los momentos indicados, aunque no tengas la app abierta.</p>
      {error && <p className="install-feedback install-feedback--error" role="alert">{error}</p>}
      <button type="button" className="tutorial-primary tutorial-primary--wide" onClick={onActivate} disabled={busy}>{busy ? 'Activando…' : 'Activar notificaciones'}</button>
      <button type="button" className="experience-later" onClick={onLater} disabled={busy}>Ahora no</button>
    </section>
  </div>;
}
