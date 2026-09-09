'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import content from './content.generated.json';
import { supabase } from './lib/supabase';
import './brain.css';
import './modern-ui.css';
import './interaction-fixes.css';
import './mobile-fixes.css';
import './category-deck.css';
import './german-entry.css';
import './onboarding.css';

type Tab = 'talleres' | 'propia' | 'meditaciones' | 'biblioteca' | 'consultas' | 'notificaciones' | 'espacio';
type ReaderContent = { title: string; eyebrow: string; detail: string; paragraphs: string[] };
type DeckItem = { icon: string; title: string; detail: string; tone: string; children?: DeckItem[]; reader?: ReaderContent; notificationPanel?: boolean; action?: 'logout' };
type Screen = { eyebrow: string; title: string; subtitle: string; items: DeckItem[] };
type FlowStage = 'entry' | 'install' | 'login' | 'onboarding' | 'app';
type DeviceKind = 'ios' | 'android' | 'desktop';
type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> };

const palette = ['#965266', '#B16C7F', '#CD8798', '#E7A9B5'];
const icons = ['●', '◆', '✦', '○'];
const cleanParagraphs = (text: string) => text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
const leaf = (title: string, index: number, detail = ''): DeckItem => ({ icon: icons[index % icons.length], title, detail, tone: palette[index % palette.length] });

const planNodes: DeckItem[] = content.plans.map((plan, planIndex) => ({
  icon: ['💞', '💫', '🌿'][planIndex],
  title: plan.title,
  detail: 'Recorrido completo de 7 días.',
  tone: palette[planIndex],
  children: plan.days.map((day) => ({
    icon: String(day.day),
    title: `Día ${day.day}`,
    detail: day.title.charAt(0) + day.title.slice(1).toLowerCase(),
    tone: palette[(day.day - 1) % palette.length],
    children: [
      ...Object.entries(day.meditations).map(([moment, text], index) => ({
        icon: ['☀️', '◐', '🌤️', '🌙'][index],
        title: `Práctica de la ${moment}`,
        detail: 'Texto completo de la práctica.',
        tone: palette[index],
        reader: { title: `Día ${day.day} · ${moment}`, eyebrow: plan.title.toUpperCase(), detail: day.title, paragraphs: cleanParagraphs(text) },
      })),
      {
        icon: '📖',
        title: 'Frases del día',
        detail: 'Lecturas breves para acompañar la práctica.',
        tone: palette[0],
        reader: { title: `Frases del día ${day.day}`, eyebrow: plan.title.toUpperCase(), detail: day.title, paragraphs: day.quotes },
      },
    ],
  })),
}));

const momentNodes: DeckItem[] = content.moments.map((moment, index) => ({
  icon: ['🎯', '🌬️', '🌙', '💬', '📰', '🧭', '🤍', '🌧️', '🎤', '🫶', '☀️', '🌆', '🛡️', '🙏', '✨'][index],
  title: moment.title,
  detail: 'Meditación para este momento.',
  tone: palette[index % palette.length],
  reader: { title: moment.title, eyebrow: 'MEDITACIÓN PARA AHORA', detail: 'Leé la práctica a tu ritmo.', paragraphs: cleanParagraphs(moment.text) },
}));

const screens: Record<Tab, Screen> = {
  talleres: { eyebrow: 'PRÁCTICAS GUIADAS', title: 'Elegí una práctica', subtitle: 'Recorridos preparados para acompañarte paso a paso.', items: [
    { icon: '🌱', title: 'Prácticas de 7 días', detail: 'Amor, salud y dinero.', tone: palette[0], children: planNodes },
    { icon: '🌿', title: 'Prácticas de 15 días', detail: 'Contenido pendiente de producir.', tone: palette[1] },
    { icon: '🌳', title: 'Prácticas de 40 días', detail: 'Autoconcepto y control de la imaginación.', tone: palette[2] },
  ] },
  propia: { eyebrow: 'TU PROPIA PRÁCTICA', title: 'Creá tu recorrido', subtitle: 'Elegí qué querés trabajar y cómo querés hacerlo.', items: [
    { icon: '🎯', title: 'Objetivo', detail: 'Amor, salud, dinero o imaginación.', tone: palette[0], children: ['Amor', 'Salud', 'Dinero', 'Imaginación'].map((title, index) => leaf(title, index)) },
    { icon: '🗓️', title: 'Duración', detail: 'Una práctica, 7, 15 o 40 días.', tone: palette[1], children: ['Una práctica', '7 días', '15 días', '40 días'].map((title, index) => leaf(title, index)) },
    { icon: '🔔', title: 'Momento', detail: 'Mañana, mediodía, tarde, noche o ahora.', tone: palette[2], children: ['Mañana', 'Mediodía', 'Tarde', 'Noche', 'Ahora'].map((title, index) => leaf(title, index)) },
  ] },
  meditaciones: { eyebrow: 'MEDITACIONES', title: '¿Qué necesitás ahora?', subtitle: 'Elegí el momento y abrí directamente la práctica.', items: momentNodes },
  biblioteca: { eyebrow: 'PARA ESCUCHAR Y LEER', title: 'Tu biblioteca', subtitle: 'Contenido organizado por formato.', items: [
    { icon: '🎧', title: 'Meditaciones', detail: 'Prácticas disponibles para escuchar y leer.', tone: palette[0], children: momentNodes },
    { icon: '📖', title: 'Lecturas', detail: 'Frases organizadas dentro de cada recorrido.', tone: palette[1], children: planNodes },
    { icon: '🎙️', title: 'Conferencias', detail: 'Contenido pendiente de conectar.', tone: palette[2] },
  ] },
  consultas: { eyebrow: 'CONSULTAS', title: 'Hablemos de lo que te pasa', subtitle: 'Consultas para leer, escuchar y guardar.', items: [
    { icon: '💬', title: 'Preguntar', detail: 'Escribí una pregunta con tus palabras.', tone: palette[0] },
    { icon: '🔊', title: 'Escuchar', detail: 'Escuchá las respuestas disponibles.', tone: palette[1] },
    { icon: '🔖', title: 'Guardadas', detail: 'Volvé a las consultas que elegiste guardar.', tone: palette[2] },
  ] },
  notificaciones: { eyebrow: 'NOTIFICACIONES', title: 'Tus avisos', subtitle: 'Elegí qué querés recibir y cuándo.', items: [
    { icon: '🔔', title: 'Activar notificaciones', detail: 'Permití que la aplicación te envíe avisos.', tone: palette[0], notificationPanel: true },
    { icon: '⏰', title: 'Horarios de práctica', detail: 'Configurá mañana, mediodía, tarde y noche.', tone: palette[1], notificationPanel: true },
    { icon: '⚙️', title: 'Preferencias', detail: 'Elegí los tipos de avisos que querés recibir.', tone: palette[2], notificationPanel: true },
  ] },
  espacio: { eyebrow: 'MI PERFIL', title: 'Tu espacio', subtitle: 'Tu cuenta y tus elecciones.', items: [
    { icon: '👤', title: 'Mi cuenta', detail: 'Datos personales y acceso.', tone: palette[0] },
    { icon: '⭐', title: 'Favoritos', detail: 'Prácticas, audios y lecturas guardadas.', tone: palette[1] },
    { icon: '📈', title: 'Mi avance', detail: 'Progreso real de tus prácticas.', tone: palette[2] },
    { icon: '⚙️', title: 'Configuración', detail: 'Horarios, zona y apariencia.', tone: palette[3] },
    { icon: '↪️', title: 'Cerrar sesión', detail: 'Salir de esta cuenta.', tone: palette[0], action: 'logout' },
  ] },
};

const mainCategories: Array<[Tab, string, string, string, string]> = [
  ['espacio', '👋', 'Mi perfil', 'Tu cuenta, favoritos y configuración.', palette[0]],
  ['notificaciones', '🔔', 'Notificaciones', 'Recordatorios y novedades importantes.', palette[3]],
  ['biblioteca', '📚', 'Biblioteca', 'Audios, lecturas y conferencias.', palette[1]],
  ['talleres', '✨', 'Prácticas guiadas', 'Recorridos de 7, 15 y 40 días.', palette[2]],
  ['propia', '🧩', 'Tu propia práctica', 'Armá un camino para lo que hoy necesitás.', palette[3]],
  ['meditaciones', '🧘‍♂️', 'Meditaciones para ahora', 'Elegí una práctica según tu momento.', palette[0]],
  ['consultas', '💭', 'Consultas', 'Preguntá lo que te está pasando.', palette[1]],
];

function DeckCard({ item, index, last, onClick }: { item: DeckItem; index: number; last: boolean; onClick?: () => void }) {
  return <div className={`category-row${last ? ' is-last' : ''}`}>
    <button className="category-card" style={{ '--category-index': index, '--category-tone': item.tone } as React.CSSProperties} onClick={onClick}>
      <span className="category-icon">{item.icon}</span>
      <p><small>{item.children || item.reader || item.notificationPanel || item.action ? 'ABRIR' : 'OPCIÓN'}</small><b>{item.title}</b>{item.detail && <em>{item.detail}</em>}</p>
      <i className="category-arrow">{item.children || item.reader || item.notificationPanel || item.action ? '›' : '↑'}</i>
    </button>
  </div>;
}

function Deck({ items, onSelect }: { items: DeckItem[]; onSelect: (item: DeckItem) => void }) {
  return <div className="feature-list">{items.map((entry, index) => <DeckCard key={entry.title} item={entry} index={index} last={index === items.length - 1} onClick={() => onSelect(entry)} />)}<div className="deck-end-space" aria-hidden="true" /></div>;
}

function FixedHeader({ eyebrow, title, subtitle, onBack }: { eyebrow: string; title: string; subtitle: string; onBack: () => void }) {
  return <header className="feature-header"><button className="visible-back" onClick={onBack}>← Volver</button><p>{eyebrow}</p><h1>{title}</h1><small>{subtitle}</small></header>;
}

function NotificationsPanel({ onBack }: { onBack: () => void }) {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [times, setTimes] = useState({ morning: '07:50', noon: '12:30', afternoon: '17:00', night: '22:45' });
  useEffect(() => {
    if (!('Notification' in window)) setPermission('unsupported');
    else setPermission(Notification.permission);
    const stored = localStorage.getItem('german-notification-times');
    if (stored) setTimes(JSON.parse(stored));
  }, []);
  const updateTime = (key: keyof typeof times, value: string) => {
    const next = { ...times, [key]: value };
    setTimes(next);
    localStorage.setItem('german-notification-times', JSON.stringify(next));
  };
  const requestPermission = async () => {
    if (!('Notification' in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted' && 'serviceWorker' in navigator) await navigator.serviceWorker.register('/sw.js');
  };
  return <section className="reader-section">
    <FixedHeader eyebrow="NOTIFICACIONES" title="Tus horarios" subtitle="Los horarios quedan guardados en este dispositivo." onBack={onBack} />
    <div className="reader-body notification-settings">
      {permission !== 'unsupported' && <button className="notification-permission" onClick={requestPermission}>{permission === 'granted' ? '✓ Notificaciones activadas' : permission === 'denied' ? 'Permiso bloqueado en el navegador' : 'Activar notificaciones'}</button>}
      <label>Mañana<input type="time" value={times.morning} onChange={(event) => updateTime('morning', event.target.value)} /></label>
      <label>Mediodía<input type="time" value={times.noon} onChange={(event) => updateTime('noon', event.target.value)} /></label>
      <label>Tarde<input type="time" value={times.afternoon} onChange={(event) => updateTime('afternoon', event.target.value)} /></label>
      <label>Noche<input type="time" value={times.night} onChange={(event) => updateTime('night', event.target.value)} /></label>
    </div>
  </section>;
}

function Reader({ content: reader, onBack }: { content: ReaderContent; onBack: () => void }) {
  return <section className="reader-section"><FixedHeader eyebrow={reader.eyebrow} title={reader.title} subtitle={reader.detail} onBack={onBack} /><article className="reader-body">{reader.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article></section>;
}

function BrainFolder({ open, onOpen, onGo, userName = 'Martín' }: { open: boolean; onOpen: () => void; onGo: (tab: Tab) => void; userName?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoStart = 0.22;
  const items = mainCategories.map(([target, icon, title, detail, tone]) => ({ target, item: { icon, title, detail, tone } as DeckItem }));
  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !soundOn;
    video.muted = !next;
    setSoundOn(next);
    if (next) await video.play().catch(() => setSoundOn(false));
  };
  const prepareVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(videoStart, Math.max(0, video.duration - 0.1));
    await video.play().catch(() => undefined);
  };
  const replayVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    setVideoReady(false);
    video.currentTime = videoStart;
    await video.play().catch(() => undefined);
  };
  return <section className={open ? 'brain-folder brain-folder-open category-deck' : 'brain-folder'}><div className="brain-orbit" aria-hidden="true"><i /><i /><i /></div>{!open ? <div className={`brain-launch german-launch german-video-launch${videoReady ? ' is-video-ready' : ''}`}><video ref={videoRef} src="/german-real-intro.mp4" autoPlay muted playsInline preload="auto" onLoadedMetadata={prepareVideo} onPlaying={() => requestAnimationFrame(() => requestAnimationFrame(() => setVideoReady(true)))} onEnded={replayVideo} aria-label="Germán animado saludando" /><button className="german-enter" onClick={onOpen} aria-label="Entrar a Asistente Germán"><b>Entrar</b><small>Tocá a Germán</small></button><button className="german-sound" onClick={toggleSound} aria-label={soundOn ? 'Silenciar video' : 'Activar sonido del video'} aria-pressed={soundOn}>{soundOn ? '🔊' : '🔇'}</button></div> : <section className="categories-section"><header className="assistant-welcome"><p>Hola, ¿cómo estás, {userName}?</p><h1>Bienvenido al<strong>Asistente de Germán</strong></h1></header><div className="category-list">{items.map(({ target, item }, index) => <DeckCard key={item.title} item={item} index={index} last={index === items.length - 1} onClick={() => onGo(target)} />)}<div className="deck-end-space" aria-hidden="true" /></div></section>}</section>;
}

const installSteps: Record<DeviceKind, Array<[string, string]>> = {
  ios: [
    ['↥', 'Abrí esta página en Safari y tocá Compartir.'],
    ['＋', 'Bajá en el menú y tocá “Agregar a inicio”.'],
    ['✓', 'Confirmá tocando “Agregar”.'],
  ],
  android: [
    ['•••', 'Tocá el menú de tres puntos de Chrome.'],
    ['＋', 'Elegí “Instalar app” o “Agregar a la pantalla principal”.'],
    ['✓', 'Confirmá la instalación.'],
  ],
  desktop: [
    ['⬇', 'Buscá el icono Instalar en la barra de direcciones.'],
    ['•••', 'Si no aparece, abrí el menú de Chrome o Edge.'],
    ['✓', 'Elegí “Instalar Asistente Germán” y confirmá.'],
  ],
};

function detectDevice(): DeviceKind {
  const agent = navigator.userAgent.toLowerCase();
  const ios = /iphone|ipad|ipod/.test(agent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (ios) return 'ios';
  if (/android/.test(agent)) return 'android';
  return 'desktop';
}

function GermanBadge() {
  return <div className="gate-german"><img src="/german-welcome.png" alt="Germán saludando" /></div>;
}

function InstallGate({ onContinue }: { onContinue: () => void }) {
  const [device, setDevice] = useState<DeviceKind>('desktop');
  const [modalOpen, setModalOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    setDevice(detectDevice());
    const capturePrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', capturePrompt);
    return () => window.removeEventListener('beforeinstallprompt', capturePrompt);
  }, []);

  const installDirectly = async () => {
    if (!installPrompt) return setModalOpen(true);
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      localStorage.setItem('german-pwa-added', 'yes');
      onContinue();
    }
    setInstallPrompt(null);
  };

  const continueFlow = () => {
    localStorage.setItem('german-pwa-added', 'yes');
    onContinue();
  };

  return <main className="app-shell gate-screen install-gate">
    <GermanBadge />
    <p className="gate-kicker">ASISTENTE GERMÁN</p>
    <h1>Estás ante la primera aplicación sobre <em>manifestación consciente</em> en español.</h1>
    <p className="gate-copy">Agregala a tu pantalla de inicio para que funcione correctamente y puedas recibir tus prácticas en el momento justo.</p>
    <div className="gate-actions">
      {installPrompt && device !== 'ios'
        ? <button className="gate-primary" onClick={installDirectly}>Instalar <span>↓</span></button>
        : <button className="gate-primary" onClick={() => setModalOpen(true)}>Cómo agregarla <span>→</span></button>}
      <button className="gate-secondary" onClick={continueFlow}>Ya la agregué, continuar</button>
    </div>

    {modalOpen && <div className="install-modal-backdrop" role="presentation" onClick={() => setModalOpen(false)}>
      <section className="install-modal" role="dialog" aria-modal="true" aria-labelledby="install-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Cerrar">×</button>
        <p className="gate-kicker">{device === 'ios' ? 'IPHONE · IPAD' : device === 'android' ? 'ANDROID · CHROME' : 'COMPUTADORA'}</p>
        <h2 id="install-title">Cómo agregarla</h2>
        {device === 'ios' && <p className="safari-warning">En iPhone y iPad abrila con Safari. Chrome no muestra esta opción.</p>}
        <div className="install-demo" aria-label="Demostración visual de instalación"><div className="demo-browser"><i /><i /><i /><b>{device === 'ios' ? '↥' : '•••'}</b></div><div className="demo-hand">☝️</div></div>
        <ol className="install-steps">{installSteps[device].map(([icon, step], index) => <li key={step}><span>{icon}</span><p><b>{index + 1}</b>{step}</p></li>)}</ol>
        <button className="gate-primary" onClick={() => setModalOpen(false)}>Entendido</button>
      </section>
    </div>}
  </main>;
}

function LoginGate({ onAuthenticated }: { onAuthenticated: (user: User) => void }) {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const result = mode === 'signup'
      ? await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        })
      : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (result.error) return setMessage(result.error.message);
    if (result.data.user && result.data.session) return onAuthenticated(result.data.user);
    setMessage('Revisá tu correo para confirmar la cuenta y después volvé a entrar.');
  };

  const google = async () => {
    setMessage('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
    if (error) setMessage(error.message);
  };

  return <main className="app-shell gate-screen login-gate">
    <GermanBadge />
    <p className="gate-kicker">TU CUENTA</p>
    <h1>{mode === 'signup' ? 'Creá tu espacio.' : 'Qué bueno verte de nuevo.'}</h1>
    <p className="gate-copy">Guardá tus prácticas, tu avance y tus horarios en todos tus dispositivos.</p>
    <button className="google-button" onClick={google}><b>G</b> Continuar con Google</button>
    <div className="login-divider"><span>o con tu correo</span></div>
    <form className="login-form" onSubmit={submit}>
      <label>Correo<input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="vos@email.com" /></label>
      <label>Contraseña<input type="password" required minLength={6} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mínimo 6 caracteres" /></label>
      {message && <p className="form-message">{message}</p>}
      <button className="gate-primary" disabled={busy}>{busy ? 'Un momento…' : mode === 'signup' ? 'Crear cuenta' : 'Entrar'}</button>
    </form>
    <button className="gate-secondary" onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setMessage(''); }}>{mode === 'signup' ? 'Ya tengo cuenta' : 'Quiero crear una cuenta'}</button>
  </main>;
}

function OnboardingGate({ user, onComplete, onLogout }: { user: User; onComplete: (name: string) => void; onLogout: () => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(user.user_metadata?.full_name?.trim().split(/\s+/)[0] || '');
  const [message, setMessage] = useState('');

  const requestNotifications = async () => {
    if ('Notification' in window) await Notification.requestPermission();
    setStep(2);
  };

  const finish = async () => {
    const fullName = name.trim() || 'Martín';
    setMessage('Guardando…');
    const provider = user.app_metadata?.provider || 'email';
    const [profileResult, settingsResult] = await Promise.all([
      supabase.from('profiles').upsert({ id: user.id, email: user.email, full_name: fullName, auth_provider: provider }),
      supabase.from('user_settings').upsert({ user_id: user.id, installation_acknowledged: true, onboarding_completed: true, updated_at: new Date().toISOString() }),
    ]);
    const error = profileResult.error || settingsResult.error;
    if (error) setMessage(`La cuenta funciona, pero no pudimos guardar esos datos: ${error.message}`);
    localStorage.setItem('german-user-name', fullName);
    onComplete(fullName);
  };

  return <main className="app-shell gate-screen onboarding-gate">
    <div className="step-dots">{[0, 1, 2].map((item) => <i key={item} className={item <= step ? 'active' : ''} />)}</div>
    <GermanBadge />
    {step === 0 && <><p className="gate-kicker">EMPECEMOS</p><h1>¿Cómo querés que te llame?</h1><p className="gate-copy">Este nombre va a acompañarte en toda la experiencia.</p><label className="name-field">Tu nombre<input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Martín" /></label><button className="gate-primary" disabled={!name.trim()} onClick={() => setStep(1)}>Continuar <span>→</span></button></>}
    {step === 1 && <><p className="gate-kicker">EN EL MOMENTO JUSTO</p><h1>Activá tus notificaciones.</h1><p className="gate-copy">Así vas a recibir las prácticas y novedades importantes.</p><div className="notification-illustration">🔔<i>✦</i><i>✦</i></div><button className="gate-primary" onClick={requestNotifications}>Activar notificaciones</button><button className="gate-secondary" onClick={() => setStep(2)}>Ahora no</button></>}
    {step === 2 && <><p className="gate-kicker">TODO LISTO</p><h1>Este espacio ya es tuyo, <em>{name || 'Martín'}.</em></h1><p className="gate-copy">Tus prácticas, lecturas y consultas te esperan.</p><button className="gate-primary" onClick={finish}>Entrar al asistente <span>→</span></button>{message && <p className="form-message">{message}</p>}</>}
    <button className="gate-secondary" onClick={onLogout}>Cerrar sesión</button>
  </main>;
}

export default function App() {
  const [stage, setStage] = useState<FlowStage>('entry');
  const [session, setSession] = useState<Session | null>(null);
  const [userName, setUserName] = useState('Martín');
  const [mainMenu, setMainMenu] = useState(true);
  const [tab, setTab] = useState<Tab>('biblioteca');
  const [trail, setTrail] = useState<DeckItem[]>([]);
  const [reader, setReader] = useState<ReaderContent | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [libraryItems, setLibraryItems] = useState<DeckItem[]>([]);
  const current = trail.at(-1);
  const screen = useMemo<Screen>(() => {
    if (current) return { eyebrow: trail.length === 1 ? screens[tab].title.toUpperCase() : trail.at(-2)?.title.toUpperCase() || screens[tab].eyebrow, title: current.title, subtitle: current.detail, items: current.children || [] };
    if (tab === 'biblioteca' && libraryItems.length) return { ...screens.biblioteca, items: screens.biblioteca.items.map((item) => item.title === 'Conferencias' ? { ...item, detail: `${libraryItems.length} contenidos conectados.`, children: libraryItems } : item) };
    return screens[tab];
  }, [current, tab, trail, libraryItems]);
  const back = () => {
    if (reader) return setReader(null);
    if (notificationsOpen) return setNotificationsOpen(false);
    if (trail.length) return setTrail((value) => value.slice(0, -1));
    setMainMenu(true);
  };
  const logout = () => {
    void supabase.auth.signOut().finally(() => {
      setSession(null);
      setTrail([]);
      setMainMenu(true);
      setStage('login');
    });
  };
  const select = (selected: DeckItem) => {
    if (selected.action === 'logout') {
      logout();
      return;
    }
    if (selected.reader) return setReader(selected.reader);
    if (selected.notificationPanel) return setNotificationsOpen(true);
    if (selected.children) setTrail((value) => [...value, selected]);
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    const savedName = localStorage.getItem('german-user-name');
    if (savedName) setUserName(savedName);
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    supabase.from('content_items').select('id,title,excerpt,body,content_type').eq('is_published', true).order('published_at', { ascending: false }).limit(100).then(({ data }) => {
      if (!data) return;
      setLibraryItems(data.map((item, index) => ({
        icon: item.content_type === 'lecture' ? '🎙️' : '📖',
        title: item.title,
        detail: item.excerpt || 'Disponible para leer y escuchar.',
        tone: palette[index % palette.length],
        reader: { title: item.title, eyebrow: 'BIBLIOTECA', detail: item.excerpt || 'Enseñanza completa.', paragraphs: cleanParagraphs(item.body || item.excerpt || '') },
      })));
    });
  }, []);

  const authenticated = async (user: User) => {
    const { data: sessionData } = await supabase.auth.getSession();
    setSession(sessionData.session);
    const firstName = user.user_metadata?.full_name?.trim().split(/\s+/)[0];
    if (firstName) {
      setUserName(firstName);
      localStorage.setItem('german-user-name', firstName);
    }
    const { data } = await supabase.from('user_settings').select('onboarding_completed').eq('user_id', user.id).maybeSingle();
    setMainMenu(true);
    setStage(data?.onboarding_completed ? 'app' : 'onboarding');
  };
  const continueAfterInstall = () => {
    if (session?.user) return void authenticated(session.user);
    setStage('login');
  };

  if (stage === 'install') return <InstallGate onContinue={continueAfterInstall} />;
  if (stage === 'login') return <LoginGate onAuthenticated={authenticated} />;
  if (stage === 'onboarding' && session?.user) return <OnboardingGate user={session.user} onComplete={(name) => { setUserName(name); setStage('app'); }} onLogout={logout} />;
  if (stage === 'onboarding') return <LoginGate onAuthenticated={authenticated} />;

  if (stage === 'entry') return <main className="app-shell brain-intro"><p className="intro-brand">ASISTENTE GERMÁN</p><h1>Todo lo que necesitás,<br /><em>en un solo lugar.</em></h1><BrainFolder open={false} onOpen={() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const acknowledged = localStorage.getItem('german-pwa-added') === 'yes';
    if (standalone || acknowledged) {
      if (session?.user) return void authenticated(session.user);
      return setStage('login');
    }
    setStage('install');
  }} onGo={() => undefined} /><p className="intro-hint">Prácticas, audios, biblioteca y respuestas para vos.</p></main>;
  if (stage === 'app' && mainMenu) {
    return <main className="app-shell brain-intro category-open"><BrainFolder open onOpen={() => undefined} userName={userName} onGo={(target) => { setTab(target); setTrail([]); setReader(null); setMainMenu(false); }} /></main>;
  }
  if (reader) return <main className="app-shell app-main section-app"><Reader content={reader} onBack={back} /></main>;
  if (notificationsOpen) return <main className="app-shell app-main section-app"><NotificationsPanel onBack={back} /></main>;
  return <main className="app-shell app-main section-app"><section className="feature-section"><FixedHeader eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} onBack={back} /><Deck key={`${tab}-${trail.map((item) => item.title).join('/')}`} items={screen.items} onSelect={select} /></section></main>;
}
