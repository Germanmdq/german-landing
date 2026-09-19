'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { UserRound, Clock3, Settings2, TrendingUp, MessageCircle, SlidersHorizontal, Flower2, Route, Bookmark, Sun, Moon, X, Headphones, Sparkles, Bell, BookOpen, ChevronRight, ChevronLeft, ChevronDown, MoreHorizontal, Heart, LogOut, Pause, Play, Search, Trash2, Check, ArrowRight, ArrowUp, Download, House, Menu, Lock, Mic, Square, Folder } from 'lucide-react';
import { supabase } from './lib/supabase';
import { subscribeToPush, ensurePushSubscription, reconcilePushSubscription, disablePushSubscription, disableCurrentBrowserPushSubscription, getPushSubscriptionActive, getCurrentBrowserPushSubscriptionActive, type WorkshopSchedule } from './lib/push';
import { detectInstallPlatform, hasNativeInstallPrompt, isRunningStandalone, listenForPwaInstallation, promptNativeInstallation } from './lib/pwa';
import { InstallOnboarding, NotificationOnboarding } from './components/experience-onboarding';
import { MagicCard, ShimmerButton } from './components/magic-ui';
import './magic-ui.css';
import './modern-ui.css';
import './components/experience-onboarding.css';
import './components/day-one-carousel.css';
import { DayOneCarousel } from './components/day-one-carousel';
import { TimePicker } from './components/time-picker';
import { TimezonePicker } from './components/timezone-picker';
import FluidTabs from './components/sona/fluid-tabs';
import { AnimatedDialog, AnimatedDialogContent, AnimatedDialogTitle, AnimatedDialogDescription, AnimatedDialogClose } from './components/sona/animated-dialog';
import AnimatedSwitch from './components/sona/animated-switch';
import './components/sona/sona.css';
import './premium-mobile.css';
import { hasActiveAccess, type Entitlement } from './lib/payments';
import { LoginGate } from './components/login-gate';
import { deliveryTypeLabels, extractDeliveryParagraphs, formatDeliveredAt, type TallerDeliveryType } from './lib/taller-delivery';

type Tab = 'talleres' | 'propia' | 'meditaciones' | 'biblioteca' | 'audiolibros' | 'consultas' | 'espacio';
type ReaderContent = { title: string; eyebrow: string; detail: string; paragraphs: string[]; audioUrl?: string; duration?: string; audios?: { label: string; url: string }[]; highlightQuery?: string };
type ProgramPanelConfig = { slug: string; title: string; subtitle: string };
type DeckItem = { icon: string; title: string; detail: string; tone: string; image?: string; imageSize?: 'compact'; disabled?: boolean; children?: DeckItem[]; reader?: ReaderContent; notificationPanel?: boolean; accountPanel?: boolean; workshopPanel?: boolean; programPanel?: ProgramPanelConfig; action?: 'logout' };
type LibraryEntry = { id: string; title: string; excerpt: string; body: string; type: string; tags: string[]; audioUrl?: string; duration?: string; year?: number };
type AudiobookChapter = { title: string; anchor: string; order: number; page?: number };
type AudiobookEntry = { id: string; slug: string; title: string; author: string; excerpt: string; body: string; chapters: AudiobookChapter[]; audioUrl?: string; pdfUrl?: string; durationSeconds?: number };
type FavoriteRecord = { id: string; title: string; detail: string; icon: string; tone: string; reader?: ReaderContent };
type Screen = { eyebrow: string; title: string; subtitle: string; items: DeckItem[] };
type TallerDelivery = { id: string; dayNumber: number; deliveryType: TallerDeliveryType; deliveredAt: string; seenAt: string | null; title: string; paragraphs: string[]; audioUrl?: string };

const palette = ['#D92D35', '#E5484D', '#F2555A', '#FF6B6F'];
const cleanParagraphs = (text: string) => text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
const toTags = (value: unknown): string[] => Array.isArray(value) ? value.filter((tag): tag is string => typeof tag === 'string') : typeof value === 'string' ? value.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
const firstText = (record: Record<string, unknown>, keys: string[]) => keys.map((key) => record[key]).find((value): value is string => typeof value === 'string' && value.length > 0);
const formatMediaTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const rounded = Math.floor(seconds);
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const remainingSeconds = rounded % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    : `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};
const deckFavorite = (item: DeckItem): FavoriteRecord => ({ id: `deck:${item.title}`, title: item.title, detail: item.detail, icon: item.icon, tone: item.tone, reader: item.reader });
const libraryFavorite = (entry: LibraryEntry): FavoriteRecord => ({ id: `library:${entry.id}`, title: entry.title, detail: entry.excerpt || 'Biblioteca', icon: entry.audioUrl ? '🎙️' : '📖', tone: palette[0], reader: { title: entry.title, eyebrow: entry.type.toUpperCase(), detail: entry.excerpt || 'Biblioteca', paragraphs: cleanParagraphs(entry.body || entry.excerpt || ''), audioUrl: entry.audioUrl, duration: entry.duration } });

const planNodes: DeckItem[] = [
  { icon: '💞', title: 'Amor y relaciones', detail: 'Recorrido completo de 7 días.', tone: palette[0], programPanel: { slug: 'practica-7-dias-amor', title: 'Amor y relaciones', subtitle: '7 días con meditaciones y mensajes intermedios.' } },
  { icon: '💫', title: 'Dinero y trabajo', detail: 'Recorrido completo de 7 días.', tone: palette[1], programPanel: { slug: 'practica-7-dias-dinero', title: 'Dinero y trabajo', subtitle: '7 días con meditaciones y mensajes intermedios.' } },
  { icon: '🌿', title: 'Salud y bienestar', detail: 'Recorrido completo de 7 días.', tone: palette[2], programPanel: { slug: 'practica-7-dias-salud', title: 'Salud y bienestar', subtitle: '7 días con meditaciones y mensajes intermedios.' } },
];

const momentIcons = ['🎯', '🌬️', '🌙', '💬', '📰', '🧭', '🤍', '🌧️', '🎤', '🫶', '☀️', '🌆', '🛡️', '🙏', '✨'] as const;

const buildScreens = (momentNodes: DeckItem[]): Record<Tab, Screen> => ({
  talleres: { eyebrow: 'PRÁCTICAS GUIADAS', title: 'Elegí una práctica', subtitle: 'Recorridos preparados para acompañarte paso a paso.', items: [
    { icon: '🌱', title: 'Prácticas de 7 días', detail: 'Amor, salud y dinero.', tone: palette[0], children: planNodes },
    { icon: '🌿', title: 'Prácticas de 15 días', detail: 'Próximamente.', tone: palette[1], disabled: true },
    { icon: '🌳', title: 'Prácticas de 40 días', detail: 'Autoconcepto y control de la imaginación.', tone: palette[2], programPanel: { slug: 'taller-40-dias', title: 'Taller de 40 días', subtitle: 'Autoconcepto y control de la imaginación.' } },
  ] },
  // "Tu propia práctica" ya no es un deck navegable: es un formulario único
  // (PropiaPracticaPanel) que intercepta la pestaña 'propia' directamente.
  propia: { eyebrow: 'TU PROPIA PRÁCTICA', title: 'Creá tu recorrido', subtitle: 'Elegí qué querés trabajar y cómo querés hacerlo.', items: [] },
  meditaciones: { eyebrow: 'MEDITACIONES', title: '¿Qué necesitás ahora?', subtitle: 'Elegí el momento y abrí directamente la práctica.', items: momentNodes },
  biblioteca: { eyebrow: 'PARA ESCUCHAR Y LEER', title: 'Tu biblioteca', subtitle: 'Contenido organizado por formato.', items: [
    { icon: '🎧', title: 'Meditaciones', detail: 'Prácticas disponibles para escuchar y leer.', tone: palette[0], children: momentNodes },
    { icon: '📖', title: 'Lecturas', detail: 'Frases organizadas dentro de cada recorrido.', tone: palette[1], children: planNodes },
    { icon: '🎙️', title: 'Conferencias', detail: 'Contenido pendiente de conectar.', tone: palette[2] },
  ] },
  audiolibros: { eyebrow: 'AUDIOLIBROS DE GERMÁN', title: 'Libros para escuchar', subtitle: 'Audiolibros narrados por Germán.', items: [] },
  consultas: { eyebrow: 'CONSULTAS', title: 'Hablemos de lo que te pasa', subtitle: 'Consultas para leer, escuchar y guardar.', items: [
    { icon: '💬', title: 'Preguntar', detail: 'Contame qué te está pasando.', tone: palette[0] },
    { icon: '🔊', title: 'Escuchar', detail: 'Próximamente.', tone: palette[1], disabled: true },
    { icon: '🔖', title: 'Guardadas', detail: 'Próximamente.', tone: palette[2], disabled: true },
  ] },
  espacio: { eyebrow: 'MI PERFIL', title: 'Tu espacio', subtitle: 'Tu cuenta y tus elecciones.', items: [
    { icon: '👤', title: 'Mi cuenta', detail: 'Nombre, mail, suscripción y acceso.', tone: palette[0], accountPanel: true },
    { icon: '⭐', title: 'Favoritos', detail: 'Prácticas, audios y lecturas guardadas.', tone: palette[1] },
    { icon: '📈', title: 'Mi avance', detail: 'Próximamente.', tone: palette[2], disabled: true },
    { icon: '⚙️', title: 'Configuración', detail: 'Notificaciones y horarios locales.', tone: palette[3] },
  ] },
});

const mainCategories: Array<[Tab, string, string, string, string]> = [
  ['espacio', '👋', 'Mi perfil', 'Tu cuenta, favoritos y configuración.', palette[0]],
  ['biblioteca', '📚', 'Biblioteca', 'Audios, lecturas y conferencias.', palette[1]],
  ['audiolibros', '🎧', 'Audiolibros de Germán', 'Libros completos narrados por Germán.', palette[2]],
  ['talleres', '✨', 'Prácticas guiadas', 'Recorridos de 7, 15 y 40 días.', palette[2]],
  ['propia', '🧩', 'Tu propia práctica', 'Armá un camino para lo que hoy necesitás.', palette[3]],
  ['meditaciones', '🧘‍♂️', 'Meditaciones para ahora', 'Elegí una práctica según tu momento.', palette[0]],
  ['consultas', '💭', 'Consultas', 'Preguntá lo que te está pasando.', palette[1]],
];

function CategoryIcon({ item }: { item: DeckItem }) {
  const title = item.title.toLowerCase();
  const Icon = /perfil|cuenta/.test(title) ? UserRound
    : /horario/.test(title) ? Clock3
    : /configura|preferencia/.test(title) ? Settings2
    : /notifica/.test(title) ? Bell
    : /favorito|guardad/.test(title) ? Bookmark
    : /avance|progreso/.test(title) ? TrendingUp
    : /biblioteca|lectura|leer/.test(title) ? BookOpen
    : /consulta|pregunt|respuesta/.test(title) ? MessageCircle
    : /propia/.test(title) ? SlidersHorizontal
    : /medita/.test(title) ? Flower2
    : /audio|escuchar/.test(title) ? Headphones
    : /noche/.test(title) ? Moon
    : /mañana/.test(title) ? Sun
    : /día|recorrido|práctica/.test(title) ? Route
    : item.reader ? BookOpen : Sparkles;
  return <Icon size={30} strokeWidth={1.6} aria-hidden="true" />;
}

function DeckCard({ item, index, last, onClick, favorite, onFavorite }: { item: DeckItem; index: number; last: boolean; onClick?: () => void; favorite?: boolean; onFavorite?: () => void }) {
  return <div className={`category-row${last ? ' is-last' : ''}`}>
    <MagicCard className="category-card" delay={Math.min(index * .045, .24)} style={{ '--category-index': index, '--category-tone': item.tone } as React.CSSProperties} onClick={onClick}>
      <span className="category-icon card-image"><CategoryIcon item={item} /></span>
      <p><small className="card-subtitle">{item.children || item.reader || item.notificationPanel || item.accountPanel || item.workshopPanel || item.programPanel || item.action ? 'ABRIR' : 'OPCIÓN'}</small><b className="card-title">{item.title}</b>{item.detail && <em className="card-subtitle">{item.detail}</em>}</p>
      <span className="category-actions">
        {onFavorite && <span role="button" tabIndex={0} className={`favorite-button${favorite ? ' is-favorite' : ''}`} onClick={(event) => { event.stopPropagation(); onFavorite(); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); onFavorite(); } }} aria-label={favorite ? `Quitar ${item.title} de favoritos` : `Guardar ${item.title} en favoritos`}><Heart size={19} fill={favorite ? 'currentColor' : 'none'} /></span>}
        <i className="category-arrow"><ChevronRight size={21} strokeWidth={2.2} /></i>
      </span>
    </MagicCard>
  </div>;
}

function Deck({ items, onSelect, favorites, onToggleFavorite }: { items: DeckItem[]; onSelect: (item: DeckItem) => void; favorites: FavoriteRecord[]; onToggleFavorite: (favorite: FavoriteRecord) => void }) {
  return <div className="feature-list">{items.map((entry, index) => <DeckCard key={entry.title} item={entry} index={index} last={index === items.length - 1} onClick={() => onSelect(entry)} favorite={entry.reader ? favorites.some((favorite) => favorite.id === deckFavorite(entry).id) : undefined} onFavorite={entry.reader ? () => onToggleFavorite(deckFavorite(entry)) : undefined} />)}<div className="deck-end-space" aria-hidden="true" /></div>;
}

function PreguntamePanel({ onBack, onNavigate }: { onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const [prompt, setPrompt] = useState('');
  const [listening, setListening] = useState(false);
  const [working, setWorking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [notice, setNotice] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const promptRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const element = promptRef.current;
    if (!element) return;
    element.style.height = '0px';
    element.style.height = `${Math.min(Math.max(element.scrollHeight, 42), 144)}px`;
  }, [prompt]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); recognitionRef.current?.stop(); recorderRef.current?.stop(); streamRef.current?.getTracks().forEach((track) => track.stop()); }, []);

  const toggleVoice = async () => {
    setNotice('');
    if (listening) { recorderRef.current?.stop(); setListening(false); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; chunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : '';
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size) chunksRef.current.push(event.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop()); streamRef.current = null; recorderRef.current = null; setListening(false);
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' }); chunksRef.current = [];
        if (!blob.size) { setNotice('No pude registrar el audio. Probá de nuevo.'); return; }
        setNotice('Transcribiendo…');
        try {
          const form = new FormData(); const extension = blob.type.includes('mp4') ? 'm4a' : 'webm'; form.append('audio', blob, `pregunta.${extension}`);
          const response = await fetch('/api/transcribe', { method: 'POST', body: form }); const data = await response.json();
          if (!response.ok) throw new Error(data?.error || 'No pude transcribir el audio.');
          const text = String(data?.text || '').trim(); if (!text) throw new Error('No pude entender lo que dijiste.');
          setPrompt((value) => value ? `${value} ${text}` : text); setNotice('');
        } catch (error) { setNotice(error instanceof Error ? error.message : 'No pude transcribir el audio.'); }
      };
      recorder.start(); setListening(true);
    } catch { setNotice('No pude acceder al micrófono. Permití el micrófono para esta app en el iPhone y probá de nuevo.'); }
  };

  const submit = () => {
    if (!prompt.trim() || working) return;
    setWorking(true); setElapsed(0); setNotice('');
    timerRef.current = setInterval(() => setElapsed((value) => value + 1), 1000);
    window.setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null; setWorking(false);
      setNotice('La caja de Preguntame ya está funcionando. Ahora conectamos tus respuestas para que Germán responda desde tu contenido.');
    }, 1500);
  };

  return <section className="preguntame-panel">
    <FixedHeader eyebrow="PREGUNTAME" title="¿Qué te está pasando?" subtitle="Escribilo o decímelo con tu voz." onBack={onBack} onNavigate={onNavigate} />
    <div className="preguntame-stage">
      <div className="preguntame-copy"><span>GERMÁN</span><h2>Contame.</h2><p>No hace falta que armes bien la pregunta. Decime qué te pasa como te salga.</p></div>
      {listening && <button type="button" className="voice-pill is-listening" onClick={toggleVoice}><span className="voice-dot" /><span className="voice-bars" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} />)}</span><b>Escuchando</b><Square size={14} fill="currentColor" /></button>}
      {working && <div className="lattice-loader" role="status" aria-live="polite"><span className="lattice-grid">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</span><p>Buscando la mejor respuesta… <small>{elapsed}s</small></p></div>}
      <div className={`prompt-bar${listening ? ' is-listening' : ''}`}>
        <textarea ref={promptRef} value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit(); } }} rows={1} placeholder="Preguntame lo que quieras…" aria-label="Tu pregunta" />
        <div className="prompt-actions"><button type="button" className="prompt-mic" onClick={toggleVoice} aria-label={listening ? 'Detener dictado' : 'Dictar pregunta'}>{listening ? <Square size={16} fill="currentColor" /> : <Mic size={20} />}</button><button type="button" className="prompt-send" disabled={!prompt.trim() || working} onClick={submit} aria-label="Enviar pregunta"><ArrowUp size={20} strokeWidth={2.5} /></button></div>
      </div>
      {notice && <p className="preguntame-notice">{notice}</p>}
      <div className="preguntame-suggestions"><button onClick={() => setPrompt('No puedo dejar de pensar en algo que pasó')}>No puedo dejar de pensar</button><button onClick={() => setPrompt('Tengo miedo de que algo salga mal')}>Tengo miedo</button><button onClick={() => setPrompt('¿Cómo vuelvo a sentirme seguro?')}>Quiero sentirme seguro</button></div>
    </div>
  </section>;
}

type NavTarget = 'home' | 'favorites' | 'biblioteca' | 'audiolibros' | 'meditaciones' | 'talleres' | 'propia' | 'consultas' | 'curso' | 'espacio' | 'configuracion' | 'notificaciones';
const navMenuItems: { target: NavTarget; icon: ReactNode; label: string }[] = [
  { target: 'home', icon: <House size={21} />, label: 'Inicio' },
  { target: 'talleres', icon: <Route size={21} />, label: 'Prácticas guiadas' },
  { target: 'propia', icon: <SlidersHorizontal size={21} />, label: 'Tu propia práctica' },
  { target: 'meditaciones', icon: <Flower2 size={21} />, label: 'Meditaciones' },
  { target: 'biblioteca', icon: <BookOpen size={21} />, label: 'Biblioteca' },
  { target: 'audiolibros', icon: <Headphones size={21} />, label: 'Audiolibros de Germán' },
  { target: 'consultas', icon: <MessageCircle size={21} />, label: 'Consultas' },
  { target: 'curso', icon: <BookOpen size={21} />, label: 'Taller de 365 días' },
  { target: 'espacio', icon: <UserRound size={21} />, label: 'Mi perfil' },
  { target: 'favorites', icon: <Heart size={21} />, label: 'Favoritos' },
  { target: 'configuracion', icon: <Settings2 size={21} />, label: 'Configuración' },
  { target: 'notificaciones', icon: <Bell size={21} />, label: 'Notificaciones' },
];

function NavMenuSheet({ onSelect, onCancel }: { onSelect: (target: NavTarget) => void; onCancel: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    element?.showModal();
    return () => { element?.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="nav-menu-sheet" aria-label="Navegación" onCancel={(event) => { event.preventDefault(); onCancel(); }} onClick={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
    <div className="nav-menu-content">
      <div className="time-sheet-handle" aria-hidden="true" />
      <div className="nav-menu-list">
        {navMenuItems.map((item) => <button key={item.target} type="button" className="nav-menu-row" onClick={() => onSelect(item.target)}><span className="nav-menu-icon">{item.icon}</span><span>{item.label}</span></button>)}
      </div>
      <button type="button" className="nav-menu-cancel" onClick={onCancel}>Cancelar</button>
    </div>
  </dialog>;
}

function MainNavigationDock({ current, onSelect }: { current: NavTarget; onSelect: (target: NavTarget) => void }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const dockItems: { target: NavTarget; icon: ReactNode; label: string }[] = [
    { target: 'home', icon: <House size={21} />, label: 'Inicio' },
    { target: 'talleres', icon: <Route size={21} />, label: 'Prácticas' },
    { target: 'meditaciones', icon: <Flower2 size={21} />, label: 'Meditar' },
    { target: 'biblioteca', icon: <BookOpen size={21} />, label: 'Biblioteca' },
    { target: 'espacio', icon: <UserRound size={21} />, label: 'Perfil' },
  ];
  return <>
    <nav className="main-navigation-dock" aria-label="Navegación principal">
      {dockItems.map((item) => <button key={item.target} type="button" aria-current={current === item.target ? 'page' : undefined} className={current === item.target ? 'is-current' : ''} onClick={() => onSelect(item.target)}>{item.icon}<span>{item.label}</span></button>)}
      <button type="button" aria-label="Todas las secciones" aria-haspopup="dialog" onClick={() => setMoreOpen(true)}><Menu size={21} /><span>Más</span></button>
    </nav>
    {moreOpen && <NavMenuSheet onSelect={(target) => { setMoreOpen(false); onSelect(target); }} onCancel={() => setMoreOpen(false)} />}
  </>;
}

function FixedHeader({ eyebrow, title, subtitle, onBack, onNavigate }: { eyebrow: string; title: string; subtitle: string; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="feature-header">
    <div className="header-top-row">
      <button type="button" className="header-back" onClick={onBack}><ChevronLeft size={22} strokeWidth={2.4} />Volver</button>
    </div>
    <button type="button" className="header-menu" onClick={() => setMenuOpen(true)} aria-label="Más opciones" aria-haspopup="dialog"><MoreHorizontal size={18} /></button>
    <p>{eyebrow}</p><h1>{title}</h1><small>{subtitle}</small>
    {menuOpen && <NavMenuSheet onSelect={(target) => { setMenuOpen(false); onNavigate(target); }} onCancel={() => setMenuOpen(false)} />}
  </header>;
}

function ToggleSwitch({ checked, onChange, disabled, label }: { checked: boolean; onChange: () => void; disabled?: boolean; label: string }) {
  return <AnimatedSwitch checked={checked} onCheckedChange={onChange} disabled={disabled} aria-label={label} enableDrag={false} />;
}

function useNotificationsToggle(user: User) {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPushSubscriptionActive(user.id).then((value) => {
      if (cancelled) return;
      setActive(value);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [user.id]);

  const toggle = async () => {
    console.log('[notifications] toggle tocado, estado actual activo =', active);
    setBusy(true);
    setError('');
    try {
      const result = active ? await disablePushSubscription(user.id) : await ensurePushSubscription(user);
      if (result.error) {
        console.error('[notifications] toggle falló:', result.error);
        setError(result.error);
        return;
      }
      console.log('[notifications] toggle OK, nuevo estado activo =', !active);
      setActive((current) => !current);
    } catch (err) {
      console.error('[notifications] excepción inesperada en el toggle:', err);
      setError(err instanceof Error ? err.message : 'No se pudo actualizar las notificaciones.');
    } finally {
      setBusy(false);
    }
  };

  return { active, loading, busy, error, toggle };
}

const lawCourseChapters = [
  { number: 1, title: 'El Principio de Conciencia y el Poder del “Yo Soy”', start: 1, end: 30 },
  { number: 2, title: 'El Secreto del Sentimiento y el Subconsciente', start: 31, end: 60 },
  { number: 3, title: 'La Transformación Radical del Autoconcepto', start: 61, end: 90 },
  { number: 4, title: 'El Estado Similar al Sueño (SATS) y la Imaginería Sensorial', start: 91, end: 120 },
  { number: 5, title: 'Pensar DESDE el Final y la Dieta Mental Inflexible', start: 121, end: 150 },
  { number: 6, title: 'Persistencia, Inmunidad a los Sentidos y el Sábado Mental', start: 151, end: 180 },
  { number: 7, title: 'La Tijera de Podar de la Revisión', start: 181, end: 210 },
  { number: 8, title: 'Demostración en las Grandes Áreas Humanas', start: 211, end: 240 },
  { number: 9, title: 'El Puente de Incidentes y el Desapego del “Cómo”', start: 241, end: 270 },
  { number: 10, title: 'La Decodificación Psicológica de la Escritura', start: 271, end: 300 },
  { number: 11, title: 'El Hombre-Dios y la Imaginación Infinita', start: 301, end: 330 },
  { number: 12, title: 'La Promesa, la Resurrección y la Libertad Eterna', start: 331, end: 365 },
] as const;

const formatCourseDaySlug = (day: number) => String(day).padStart(3, '0');
const formatCourseDayLabel = (day: number) => String(day);
type LawCourseDay = { title?: string; foundation?: string; psychology?: string; exercise?: string };
function LawCoursePanel({ user, onBack, onNavigate }: { user: User; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const [openChapter, setOpenChapter] = useState<number | null>(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | undefined>();
  const [dayContent, setDayContent] = useState<LawCourseDay>({});
  const [unlockedDay, setUnlockedDay] = useState(1);
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: existing, error: readError } = await supabase.from('law_course_progress').select('started_at').eq('user_id', user.id).maybeSingle();
      if (cancelled) return;
      if (readError) { console.error('[365] error leyendo progreso:', readError); setProgressLoading(false); return; }
      let startedAt = existing?.started_at as string | undefined;
      if (!startedAt) {
        const { data: created, error: insertError } = await supabase.from('law_course_progress').insert({ user_id: user.id }).select('started_at').single();
        if (cancelled) return;
        if (insertError) { console.error('[365] error iniciando progreso:', insertError); setProgressLoading(false); return; }
        startedAt = created.started_at;
      }
      if (!startedAt) { setProgressLoading(false); return; }
      const started = new Date(startedAt);
      const now = new Date();
      const startDay = new Date(started.getFullYear(), started.getMonth(), started.getDate()).getTime();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const day = Math.min(365, Math.max(1, Math.floor((today - startDay) / 86400000) + 1));
      setUnlockedDay(day);
      setProgressLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user.id]);

  useEffect(() => {
    if (selectedDay === null) { setAudioUrl(undefined); setDayContent({}); return; }
    let cancelled = false;
    supabase
      .from('content_items')
      .select('metadata,content_assets(asset_type,source_url,storage_path,sort_order)')
      .eq('slug', `taller-365-dia-${formatCourseDaySlug(selectedDay)}`)
      .eq('is_published', true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) { console.error('[365] error cargando día:', error); setAudioUrl(undefined); setDayContent({}); return; }
        const metadata = data?.metadata && typeof data.metadata === 'object' && !Array.isArray(data.metadata) ? data.metadata as Record<string, unknown> : {};
        setDayContent({
          title: typeof metadata.title === 'string' ? metadata.title : undefined,
          foundation: typeof metadata.foundation === 'string' ? metadata.foundation : undefined,
          psychology: typeof metadata.psychology === 'string' ? metadata.psychology : undefined,
          exercise: typeof metadata.exercise === 'string' ? metadata.exercise : undefined,
        });
        const assets = Array.isArray(data?.content_assets) ? data.content_assets as Array<{ asset_type?: string; source_url?: string; storage_path?: string; sort_order?: number }> : [];
        const asset = assets.filter((item) => item.asset_type === 'audio').sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))[0];
        setAudioUrl(asset?.source_url || (asset?.storage_path ? `https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/${asset.storage_path}` : undefined));
      });
    return () => { cancelled = true; };
  }, [selectedDay]);

  if (selectedDay !== null) {
    const explanation = [dayContent.foundation, dayContent.psychology].filter(Boolean).join('\n\n');
    return <section className="reader-section law-course-section">
      <FixedHeader eyebrow="TALLER DE 365 DÍAS" title={`Día ${formatCourseDayLabel(selectedDay)}`} subtitle={dayContent.title || 'Ley de Asunción'} onBack={() => setSelectedDay(null)} onNavigate={onNavigate} />
      <article className="reader-body law-course-day">
        {audioUrl ? <AudioPlayer title={`Día ${formatCourseDayLabel(selectedDay)}${dayContent.title ? ` · ${dayContent.title}` : ''}`} audioUrl={audioUrl} /> : <div className="law-course-audio-missing"><Headphones size={22} /><span>Audio pendiente para este día.</span></div>}
        {explanation && <section className="law-course-support-card"><small>FUNDAMENTO Y EXPLICACIÓN</small>{cleanParagraphs(explanation).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>}
        {dayContent.exercise && <section className="law-course-support-card law-course-practice-card"><small>PRÁCTICA DE HOY</small>{cleanParagraphs(dayContent.exercise).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>}
      </article>
    </section>;
  }

  return <section className="reader-section law-course-section">
    <FixedHeader eyebrow="LEY DE ASUNCIÓN" title="Taller de 365 días" subtitle="365 días para entenderla, practicarla y vivirla." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body law-course-browser">
      <div className="law-course-progress-card"><div><span>TU RECORRIDO</span><b>{progressLoading ? 'Cargando…' : `Día ${unlockedDay} de 365`}</b></div><BookOpen size={22} /></div>
      <div className="law-course-chapters">
        {lawCourseChapters.map((chapter) => {
          const expanded = openChapter === chapter.number;
          return <section key={chapter.number} className={`law-course-chapter${expanded ? ' is-open' : ''}`}>
            <button type="button" className="law-course-chapter-toggle" aria-expanded={expanded} onClick={() => setOpenChapter(expanded ? null : chapter.number)}>
              <div><small>CAPÍTULO {chapter.number}</small><b>{chapter.title}</b><span>Días {formatCourseDayLabel(chapter.start)}–{formatCourseDayLabel(chapter.end)}</span></div>
              <ChevronDown size={20} aria-hidden="true" />
            </button>
            {expanded && <div className="law-course-days">{Array.from({ length: chapter.end - chapter.start + 1 }, (_, i) => chapter.start + i).map((day) => {
              const locked = progressLoading || day > unlockedDay;
              return <button key={day} type="button" className={`law-course-day-row${locked ? ' is-locked' : ''}`} disabled={locked} onClick={() => { if (!locked) setSelectedDay(day); }}><span>Día {formatCourseDayLabel(day)}</span>{locked ? <span className="law-course-lock"><Lock size={15} aria-hidden="true" />Bloqueado</span> : <ChevronRight size={18} aria-hidden="true" />}</button>;
            })}</div>}
          </section>;
        })}
      </div>
    </div>
  </section>;
}

function InteractiveBookIntro({ onBack, onNavigate }: { onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  return <section className="reader-section interactive-book-section">
    <FixedHeader eyebrow="LIBRO INTERACTIVO" title="Prólogo" subtitle="La vida se ensaya por dentro" onBack={onBack} onNavigate={onNavigate} />
    <article className="reader-body interactive-book-prologue">
      <header className="interactive-book-prologue-header">
        <small>PRÓLOGO</small>
        <h1>La vida se ensaya por dentro</h1>
      </header>

      <p>Este libro nace de una obsesión que tengo hace años: encontrar la manera más clara, más directa y más práctica de explicar algo que descubrí y que me cambió la vida.</p>
      <p className="interactive-book-lead">Que todo lo que vivimos afuera lo ensayamos primero adentro.</p>
      <p>Suena simple. Y lo es. Pero llevarlo a la práctica es otra cosa. Porque nadie te enseña a usar tu propia imaginación. Te enseñan a estudiar, a trabajar, a pagar impuestos, a resolver problemas. Pero nadie se sienta con vos a decirte: mirá, ese diálogo que estás teniendo con vos mismo desde que te levantaste, esas imágenes que se repiten en tu cabeza, eso que sentís en el cuerpo cuando anticipás algo que todavía no pasó — todo eso está construyendo tu vida. Y podés elegir qué construir.</p>
      <p>Eso es lo que hace este libro.</p>

      <h2>LA FUENTE</h2>
      <p>Detrás de estas páginas hay más de tres millones y medio de palabras. Más de setecientas cincuenta conferencias y quince libros de un hombre que dedicó su vida entera a investigar, practicar y enseñar un solo principio: que la imaginación es el poder creativo de la experiencia humana. Más de once mil páginas de enseñanza original que estudié, practiqué y compartí durante años.</p>
      <p className="interactive-book-lead">Y la conclusión de todo ese material — de todas esas conferencias, de todos esos libros, de décadas de investigación y experiencia — cabe en una sola frase: la vida se ensaya por dentro.</p>
      <p>Por eso el libro se llama así. Porque ese es el resumen. Ese es el punto al que todo vuelve, una y otra vez, sin importar si la conferencia habla de dinero, de relaciones, de salud, de propósito o de libertad interior. El mecanismo es siempre el mismo: lo que asumís internamente como verdadero se convierte en tu experiencia. Lo que ensayás adentro se manifiesta afuera.</p>
      <p>Todo eso está destilado acá en treinta capítulos y doscientas veinte páginas. Once mil páginas convertidas en doscientas veinte. Escrito desde mi visión personal, que es una visión práctica: la imaginación no es un concepto filosófico ni un tema espiritual reservado para iluminados. Es una herramienta que usás todos los días, que ya estás usando ahora mismo, y que podés aprender a usar a tu favor.</p>
      <p>No escribí este libro para impresionar a nadie ni para sonar profundo. Lo escribí como hablo. En un lenguaje simple y directo. Sin vocabulario religioso. Sin referencias que necesites estudiar antes. Sin capas de interpretación que te alejen de lo que importa. Porque creo que si algo no se puede explicar de manera clara, probablemente no se entendió bien. Y yo quiero que lo entiendas. Quiero que lo apliques. Quiero que funcione.</p>

      <h2>LA GUÍA</h2>
      <p>Este no es un libro para leer una vez y guardar. Es una guía. Una guía para toda tu vida.</p>
      <p>Podés abrirlo hoy, trabajar un capítulo, dejarlo, retomarlo la semana que viene, volver al principio o ir directo al capítulo que necesitás en este momento de tu vida. Y podés volver a abrirlo dentro de un año, cuando tu vida sea otra y necesites trabajar algo nuevo. Y dentro de cinco. Y dentro de diez.</p>
      <p>Hay treinta capítulos organizados en cinco bloques.</p>
      <p>En el primero vamos a entender dónde ocurre todo. Tu vida ya se está ensayando. El lugar donde todo comienza. Lo que creés que es real. Las tres voces que te acompañan. El estado: la ropa invisible que usás todo el día. Y un primer alto para observar qué estás ensayando hoy.</p>
      <p>En el segundo vamos a construir el ensayo. Definir qué querés de verdad. La escena breve. Sentirla como real. La conversación interna. Revisión: reescribir lo que ya pasó. Y tu primer ensayo completo de un día entero.</p>
      <p>En el tercero vamos a trabajar con todo lo que aparece en el camino. Cuando no sentís nada. Cuando la realidad dice lo contrario. La diferencia entre persistir y forzar. El problema de “cuándo”. Volver a caer y volver a empezar. Y un segundo alto para ver dónde estás.</p>
      <p>En el cuarto vamos a aplicar. Dinero: dejar de ensayar la escasez. Relaciones: dejar de ensayar la pelea. Trabajo y propósito: dejar de ensayar la insatisfacción. Salud y cuerpo: dejar de ensayar el diagnóstico. Situaciones puntuales. Y qué hacer cuando tu deseo involucra a otro.</p>
      <p>Y en el quinto vamos a soltar la técnica y empezar a vivir desde adentro. La identidad nueva. Cuando se cumple. Cuando querés algo nuevo. La vida como práctica continua. Y el último capítulo: tu ensayo empieza ahora.</p>
      <p>Cada capítulo tiene una estructura clara: qué hacer al despertar, qué observar durante el día, cómo corregir cuando te descubrís volviendo al estado anterior, y cómo cerrar la noche sintiéndote en el lugar correcto.</p>
      <p>No vas a encontrar teoría por un lado y práctica por otro. Acá todo es práctica. Cada idea tiene un ejercicio, un ejemplo concreto, una forma de aplicarla hoy. Porque si hay algo que aprendí es que la gente no necesita más información. Información sobra. Lo que falta es saber qué hacer con lo que ya sabés. Y más importante todavía: saber qué hacer cuando lo que sabés no te alcanza para sostenerte.</p>
      <p>Cuando visualizaste durante tres días y no pasó nada. Cuando repetiste una afirmación hasta el cansancio y seguís sintiendo lo mismo. Cuando leíste todo, escuchaste todo, entendiste todo — y sin embargo tu vida sigue igual.</p>
      <p>Ahí es donde este libro quiere encontrarte. No para darte una frase más. Para mostrarte un camino que realmente puedas recorrer.</p>

      <h2>LA EXPERIENCIA</h2>
      <p>Y ahora necesito contarte algo, porque cambia todo.</p>
      <p className="interactive-book-lead">Este libro no es solo un libro. Es una experiencia.</p>
      <p>Voy a ser directo: la versión que estás leyendo — o escuchando — funciona completa por sí sola. No le falta nada. Cada palabra, cada ejercicio, cada ejemplo está acá. Si querés leerlo de forma tradicional, podés hacerlo y vas a tener todo lo que necesitás.</p>
      <p>Pero además de esta versión, creé algo que nunca se hizo con este tipo de enseñanza. Una versión interactiva del libro dentro de una plataforma privada, construida con una tecnología que transforma el contenido en una experiencia inmersiva. No es un PDF con links. No es un audiolibro con música de fondo. No es un curso online con módulos y certificados. Es el mismo libro — los mismos treinta capítulos, las mismas ideas, la misma progresión — convertido en algo que no se lee solamente. Se vive.</p>
      <p>Y quiero que entiendas concretamente qué significa eso.</p>
      <p>Entrás a la plataforma desde tu celular o tu computadora. Ves tus treinta capítulos. Abrís el que estás trabajando.</p>
      <p>Podés leerlo, como siempre. Pero también podés escucharlo narrado completo, sección por sección, con mi voz. Mientras caminás. Mientras manejás. Mientras cerrás los ojos antes de dormir. No un audio genérico — cada sección narrada con el tono y las pausas que corresponden al contenido.</p>
      <p>Cuando llegás a la práctica del día, la experiencia cambia. No es un texto que te dice qué hacer y te deja solo. Es una práctica guiada. Hay una voz que te acompaña paso a paso. Hay indicaciones claras. Hay pausas reales donde cerrás los ojos y hacés el ejercicio en el momento. No leés sobre la práctica — la hacés. Ahí. En ese instante.</p>
      <p>Al terminar ciertas secciones, aparecen preguntas de reflexión. No preguntas de examen — preguntas que te hacen detenerte y pensar de verdad. ¿Qué estuviste ensayando esta semana? ¿Cuál es la conversación interna que más se repite? ¿Qué sentís cuando imaginás tu escena? Tus respuestas quedan guardadas en tu espacio privado. Son tu diario de práctica, un registro de tu propio recorrido que podés releer cuando quieras y que te muestra cómo fuiste cambiando.</p>
      <p>Hay visualizaciones y mapas que conectan los conceptos de una manera que el texto solo no puede. Diagramas que te muestran cómo se relaciona lo que aprendiste en el capítulo tres con lo que estás trabajando en el capítulo diecinueve. No decoración — herramientas reales de comprensión.</p>
      <p>Si te trabás en algún punto — no entendés algo, no sabés cómo aplicarlo, querés profundizar una idea — podés hacerle preguntas a un asistente inteligente que conoce el libro completo. No una inteligencia artificial genérica que responde cualquier cosa. Un asistente entrenado específicamente con esta obra, con las setecientas cincuenta conferencias originales, con los quince libros de la fuente. Un asistente que responde desde el contenido real, como si estuvieras hablando conmigo.</p>
      <p>Tu avance queda registrado capítulo por capítulo. Podés ver cuáles trabajaste, a cuáles volviste, cuáles completaste, cuántas veces pasaste por cada uno. No para competir ni para apurarte — para que tengas un mapa claro de tu recorrido. Para que sepas dónde estás y puedas decidir hacia dónde ir.</p>
      <p>Todo funciona en cualquier dispositivo. Sin descargar archivos. Sin depender de que alguien te mande nada. Entrás, y tu libro está ahí, esperándote donde lo dejaste.</p>
      <p>Hay algo que quiero que quede absolutamente claro: esto no es un producto separado. No es “el libro y además un curso”. Es la misma obra en dos formatos. La fuente es una. El contenido es uno. Lo que cambia es cómo lo recorrés.</p>
      <p className="interactive-book-lead">Leer el libro es trabajar con el material. Vivir la experiencia interactiva es que el material trabaje con vos.</p>
      <p>Porque yo creo que un libro sobre práctica merece una forma de ser practicado. Y creo que setecientas cincuenta conferencias y quince libros — más de once mil páginas de enseñanza — merecen llegar a tus manos de la manera más clara, más directa y más útil posible. No como un texto sagrado que hay que descifrar. Como una guía que podés usar hoy, mañana y dentro de diez años. Cada vez que tu vida te pida volver a elegir qué ensayar.</p>
      <p>Porque la vida se ensaya por dentro. Siempre fue así. La única diferencia es que ahora podés elegir conscientemente qué obra vas a representar.</p>
      <p>Este libro es esa elección puesta en tus manos.</p>

      <footer className="interactive-book-signature">Germán González</footer>
    </article>
  </section>;
}

function NotificationsPanel({ user, onBack, onNavigate }: { user: User; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [permissionMessage, setPermissionMessage] = useState('');
  const [permissionBusy, setPermissionBusy] = useState(false);
  const [editingTime, setEditingTime] = useState<'morning' | 'noon' | 'afternoon' | 'night' | null>(null);
  const timeLabels = { morning: 'Mañana', noon: 'Mediodía', afternoon: 'Tarde', night: 'Noche' };
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
    setPermissionBusy(true);
    setPermissionMessage('');
    const result = await ensurePushSubscription(user);
    setPermission(Notification.permission);
    setPermissionBusy(false);
    if (result.error) setPermissionMessage(result.error);
  };
  return <section className="reader-section">
    <FixedHeader eyebrow="NOTIFICACIONES" title="Horarios locales" subtitle="Esta preferencia se guarda en este dispositivo." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body notification-settings">
      {permission !== 'unsupported' && <ShimmerButton className="notification-permission" onClick={requestPermission} disabled={permissionBusy || permission === 'denied'}><Bell size={18} />{permissionBusy ? 'Activando…' : permission === 'granted' ? 'Notificaciones activadas' : permission === 'denied' ? 'Permiso bloqueado en el navegador' : 'Activar notificaciones'}</ShimmerButton>}
      {permission === 'denied' && <p className="notification-help">Para activarlas, habilitá las notificaciones de Germán desde los Ajustes de tu teléfono y volvé a abrir la app.</p>}
      {permissionMessage && <p className="account-message" role="alert">{permissionMessage}</p>}
      {(Object.keys(timeLabels) as (keyof typeof times)[]).map((key) => <button key={key} className="notification-time-row" onClick={() => setEditingTime(key)} aria-label={`Cambiar horario de ${timeLabels[key]}: ${times[key]}`} aria-haspopup="dialog"><span>{timeLabels[key]}</span><span className="notification-time-value">{times[key]}<ChevronRight size={17} /></span></button>)}
      {editingTime && <TimePicker label={timeLabels[editingTime]} value={times[editingTime]} onCancel={() => setEditingTime(null)} onSave={(value) => { updateTime(editingTime, value); setEditingTime(null); }} />}
    </div>
  </section>;
}

function ProfileScreen({ user, items, showInstall, onInstall, onSelect, onBack, onNavigate }: { user: User; items: DeckItem[]; showInstall: boolean; onInstall: () => void; onSelect: (item: DeckItem) => void; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const notifications = useNotificationsToggle(user);
  return <section className="reader-section">
    <FixedHeader eyebrow="MI PERFIL" title="Tu espacio" subtitle="Tu cuenta y tus elecciones." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      <div className="ios-card">
        {items.map((item) => <button key={item.title} className="ios-row" onClick={() => onSelect(item)} disabled={item.title === 'Mi avance'}>
          <span className="ios-row-label">{item.title}</span>
          <span className="ios-row-value ios-row-value--muted">{item.title === 'Mi avance' ? 'Próximamente' : <ChevronRight size={17} />}</span>
        </button>)}
        {showInstall && <button type="button" className="ios-row" onClick={onInstall}>
          <span className="ios-row-label install-profile-label"><Download size={18} />Instalar Asistente Germán</span>
          <span className="ios-row-value ios-row-value--muted"><ChevronRight size={17} /></span>
        </button>}
        <div className="ios-row">
          <span className="ios-row-label">Notificaciones</span>
          {notifications.loading ? <span className="ios-toggle-placeholder" aria-hidden="true" /> : <ToggleSwitch checked={notifications.active} onChange={notifications.toggle} disabled={notifications.busy} label="Notificaciones" />}
        </div>
      </div>
      {notifications.error && <p className="account-message">{notifications.error}</p>}
    </div>
  </section>;
}

function ConfigurationPanel({ user, onBack, onNavigate, onOpenNotifications }: { user: User; onBack: () => void; onNavigate: (target: NavTarget) => void; onOpenNotifications: () => void }) {
  const notifications = useNotificationsToggle(user);
  return <section className="reader-section">
    <FixedHeader eyebrow="MI PERFIL" title="Configuración" subtitle="Avisos y horarios en tu dispositivo." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body configuration-settings">
      <p className="settings-group-label">AVISOS</p>
      <div className="ios-card">
        <div className="ios-row"><span className="ios-row-label">Notificaciones push</span>{notifications.loading ? <span className="ios-toggle-placeholder" aria-hidden="true" /> : <ToggleSwitch checked={notifications.active} onChange={notifications.toggle} disabled={notifications.busy} label="Notificaciones push" />}</div>
        <button type="button" className="ios-row" onClick={onOpenNotifications}><span className="ios-row-label">Horarios locales</span><span className="ios-row-value ios-row-value--muted"><ChevronRight size={17} /></span></button>
      </div>
      {notifications.error && <p className="account-message" role="alert">{notifications.error}</p>}
      <p className="settings-explanation">Esta preferencia se guarda en este dispositivo. Las entregas de un programa siguen los horarios que elegiste al comenzarlo.</p>
    </div>
  </section>;
}

function Reader({ content: reader, onBack, onNavigate, favorite, onFavorite }: { content: ReaderContent; onBack: () => void; onNavigate: (target: NavTarget) => void; favorite: boolean; onFavorite: () => void }) {
  return <section className="reader-section"><FixedHeader eyebrow={reader.eyebrow} title={reader.title} subtitle={reader.detail} onBack={onBack} onNavigate={onNavigate} /><article className="reader-body"><button className={`reader-favorite${favorite ? ' is-favorite' : ''}`} onClick={onFavorite}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} />{favorite ? 'Guardado en favoritos' : 'Guardar en favoritos'}</button>{reader.audioUrl && <AudioPlayer title={reader.title} audioUrl={reader.audioUrl} durationLabel={reader.duration} />}{reader.audios?.map((audio) => <AudioPlayer key={audio.label} title={audio.label} audioUrl={audio.url} />)}{reader.paragraphs.map((paragraph, index) => <p key={index}>{reader.highlightQuery ? highlightText(paragraph, reader.highlightQuery) : paragraph}</p>)}</article></section>;
}

function AccountPanel({ user, fullName, onBack, onNavigate, onNameSaved, onLogout }: { user: User; fullName: string | null; onBack: () => void; onNavigate: (target: NavTarget) => void; onNameSaved: (name: string) => void; onLogout: () => void }) {
  const [name, setName] = useState(fullName || user.user_metadata?.full_name || '');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [entitlement, setEntitlement] = useState<Entitlement>(null);
  const [accessLoaded, setAccessLoaded] = useState(false);
  const [accessUnavailable, setAccessUnavailable] = useState(false);
  useEffect(() => {
    let cancelled = false;
    void supabase.from('user_entitlements').select('access_until,lifetime').eq('user_id', user.id).maybeSingle().then(({ data, error }) => {
      if (!cancelled) { setEntitlement(data); setAccessUnavailable(Boolean(error)); setAccessLoaded(true); }
    });
    return () => { cancelled = true; };
  }, [user.id]);
  const save = async () => {
    const cleanName = name.trim();
    if (!cleanName) return setMessage('Escribí tu nombre para guardarlo.');
    setSaving(true);
    setMessage('');
    const provider = user.app_metadata?.provider || 'email';
    const [authResult, profileResult] = await Promise.all([
      supabase.auth.updateUser({ data: { full_name: cleanName } }),
      supabase.from('profiles').upsert({ id: user.id, email: user.email, full_name: cleanName, auth_provider: provider }),
    ]);
    setSaving(false);
    const error = authResult.error || profileResult.error;
    if (error) return setMessage(error.message);
    onNameSaved(cleanName);
    setMessage('Cambios guardados.');
  };
  return <section className="reader-section account-section">
    <FixedHeader eyebrow="MI PERFIL" title="Mi cuenta" subtitle="Tus datos y tu acceso a la aplicación." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body account-settings">
      <label>Correo electrónico<input value={user.email || ''} readOnly aria-readonly="true" /></label>
      <label>Nombre<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></label>
      <ShimmerButton className="account-save" onClick={save} disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</ShimmerButton>
      {message && <p className="account-message">{message}</p>}
      <section className="subscription-card"><p>TU ACCESO</p><b>{!accessLoaded ? 'Consultando…' : accessUnavailable ? 'Acceso actual' : entitlement?.lifetime ? 'Acceso de por vida' : hasActiveAccess(entitlement) ? 'Acceso activo' : 'Sin acceso activo'}</b><span>{accessUnavailable ? 'Tu acceso actual no cambia.' : entitlement?.lifetime ? 'Podés usar el Asistente para siempre.' : hasActiveAccess(entitlement) && entitlement?.access_until ? `Disponible hasta el ${new Date(entitlement.access_until).toLocaleDateString('es-AR')}.` : 'Elegí una opción para activar tu acceso cuando quieras.'}</span><button type="button" className="access-action" onClick={() => window.location.assign('/access')}>Ver opciones de acceso</button></section>
      <button className="account-logout" onClick={onLogout}><LogOut size={17} /> Cerrar sesión</button>
    </div>
  </section>;
}

function AudioPlayer({ title, audioUrl, durationLabel }: { title: string; audioUrl: string; durationLabel?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play().catch(() => undefined);
    else audio.pause();
  };
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({ title, artist: 'Germán Asistente', album: 'Biblioteca' });
    }
  }, [title]);
  return <section className="audio-player-card">
    <audio ref={audioRef} src={audioUrl} preload="metadata" playsInline onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setProgress(0); }} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)} onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)} />
    <button className="audio-play" onClick={toggle} aria-label={playing ? 'Pausar audio' : 'Escuchar audio'}>{playing ? <Pause size={21} fill="currentColor" /> : <Play size={21} fill="currentColor" />}</button>
    <div className="audio-player-copy"><p>ESCUCHÁ AHORA</p><b>{title}</b><span>{durationLabel || 'Audio disponible'}</span></div>
    <input className="audio-progress" type="range" min="0" max={duration || 1} step="0.1" value={progress} onChange={(event) => { const next = Number(event.target.value); if (audioRef.current) audioRef.current.currentTime = next; setProgress(next); }} aria-label="Progreso del audio" />
  </section>;
}

function AudiobookPlayer({ title, author, audioUrl, durationSeconds }: { title: string; author: string; audioUrl: string; durationSeconds?: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationSeconds || 0);
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play().catch(() => undefined);
    else audio.pause();
  };
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({ title, artist: author, album: 'Audiolibros de Germán' });
  }, [author, title]);
  return <section className="audiobook-player" aria-label={`Reproductor de ${title}`}>
    <audio
      ref={audioRef}
      src={audioUrl}
      preload="metadata"
      playsInline
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)}
      onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : durationSeconds || 0)}
      onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
    />
    <div className="audiobook-player-heading">
      <button type="button" className="audiobook-play" onClick={toggle} aria-label={playing ? 'Pausar audiolibro' : 'Reproducir audiolibro'}>
        {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
      </button>
      <div><small>AUDIOLIBRO COMPLETO</small><b>{playing ? 'Escuchando' : 'Listo para escuchar'}</b></div>
    </div>
    <input
      className="audiobook-progress"
      type="range"
      min="0"
      max={duration || 1}
      step="0.1"
      value={Math.min(currentTime, duration || 1)}
      onChange={(event) => {
        const next = Number(event.target.value);
        if (audioRef.current) audioRef.current.currentTime = next;
        setCurrentTime(next);
      }}
      aria-label="Progreso del audiolibro"
    />
    <div className="audiobook-time"><span>{formatMediaTime(currentTime)}</span><span>{formatMediaTime(duration)}</span></div>
  </section>;
}

function splitAudiobookSections(body: string, chapters: AudiobookChapter[]) {
  let cursor = 0;
  const located = chapters.map((chapter) => {
    const paragraphMarker = `\n\n${chapter.title}\n\n`;
    const markerStart = body.indexOf(paragraphMarker, cursor);
    const start = markerStart >= 0 ? markerStart + 2 : body.indexOf(chapter.title, cursor);
    if (start >= 0) cursor = start + chapter.title.length;
    return { ...chapter, start };
  });
  return located.map((chapter, index) => {
    const contentStart = chapter.start < 0 ? -1 : chapter.start + chapter.title.length;
    const nextStart = located[index + 1]?.start;
    const end = typeof nextStart === 'number' && nextStart >= 0 ? nextStart : body.length;
    return { ...chapter, paragraphs: contentStart < 0 ? [] : cleanParagraphs(body.slice(contentStart, end)) };
  });
}

function AudiobookLibraryPanel({ entries, loading, error, onBack, onNavigate, onOpen }: { entries: AudiobookEntry[]; loading: boolean; error: string; onBack: () => void; onNavigate: (target: NavTarget) => void; onOpen: (entry: AudiobookEntry) => void }) {
  return <section className="reader-section audiobook-library-section">
    <FixedHeader eyebrow="AUDIOLIBROS DE GERMÁN" title="Libros para escuchar" subtitle="Libros completos narrados por Germán." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body audiobook-library">
      {loading && <p className="library-empty">Cargando audiolibros…</p>}
      {!loading && error && <p className="library-empty">No pudimos cargar los audiolibros. {error}</p>}
      {!loading && !error && entries.map((entry, index) => <MagicCard key={entry.id} delay={Math.min(index * .04, .2)} className="audiobook-card" onClick={() => onOpen(entry)}>
        <div className="audiobook-card-icon"><Headphones size={25} aria-hidden="true" /></div>
        <div><small>AUDIOLIBRO</small><b>{entry.title}</b><span>{entry.author}</span><p>{entry.excerpt || 'Libro completo para escuchar y leer.'}</p></div>
        <ChevronRight size={20} aria-hidden="true" />
      </MagicCard>)}
      {!loading && !error && !entries.length && <p className="library-empty">Todavía no hay audiolibros disponibles.</p>}
    </div>
  </section>;
}

function AudiobookReader({ book, onBack, onNavigate }: { book: AudiobookEntry; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const sections = useMemo(() => splitAudiobookSections(book.body, book.chapters), [book.body, book.chapters]);
  const goToChapter = (anchor: string) => document.getElementById(`chapter-${anchor}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return <section className="reader-section audiobook-reader-section">
    <FixedHeader eyebrow="AUDIOLIBRO" title={book.title} subtitle={book.author} onBack={onBack} onNavigate={onNavigate} />
    <article className="reader-body audiobook-reader">
      {book.audioUrl ? <AudiobookPlayer title={book.title} author={book.author} audioUrl={book.audioUrl} durationSeconds={book.durationSeconds} /> : null}
      <section className="audiobook-index" aria-labelledby="audiobook-chapters-title">
        <div className="audiobook-section-title"><small>ÍNDICE</small><h2 id="audiobook-chapters-title">Capítulos</h2><span>{book.chapters.length} secciones</span></div>
        <nav aria-label="Capítulos de Sinfonía de susurros">
          {book.chapters.map((chapter) => <button type="button" key={chapter.anchor} onClick={() => goToChapter(chapter.anchor)}><span>{String(chapter.order).padStart(2, '0')}</span><b>{chapter.title}</b><ChevronDown size={17} aria-hidden="true" /></button>)}
        </nav>
      </section>
      <section className="audiobook-text" aria-label={`Texto completo de ${book.title}`}>
        {sections.map((section) => <section key={section.anchor} id={`chapter-${section.anchor}`} className="audiobook-chapter">
          <small>SECCIÓN {String(section.order).padStart(2, '0')}</small>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </section>)}
      </section>
      {book.pdfUrl && <a className="audiobook-pdf-link" href={book.pdfUrl} target="_blank" rel="noreferrer"><Download size={18} />Abrir PDF completo</a>}
    </article>
  </section>;
}

function highlightText(text: string, q: string): React.ReactNode {
  if (!q || !text) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  if (parts.length === 1) return text;
  return <>{parts.map((part, index) => part.toLocaleLowerCase() === q.toLocaleLowerCase() ? <mark key={index} className="search-highlight">{part}</mark> : part)}</>;
}

function snippetAround(text: string, q: string, radius = 26): string {
  if (!q || !text) return '';
  const lower = text.toLocaleLowerCase();
  const idx = lower.indexOf(q.toLocaleLowerCase());
  if (idx === -1) return '';
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + q.length + radius);
  return (start > 0 ? '...' : '') + text.slice(start, end).trim() + (end < text.length ? '...' : '');
}

function extractConferenceYear(item: Record<string, unknown>): number | undefined {
  const metadata = item.metadata && typeof item.metadata === 'object' && !Array.isArray(item.metadata) ? item.metadata as Record<string, unknown> : {};
  const candidates = [metadata.year, metadata.conference_year, metadata.original_year, metadata.date, metadata.conference_date, metadata.original_date, item.title, item.excerpt];
  for (const value of candidates) {
    if (typeof value === 'number' && value >= 1900 && value <= 2099) return Math.trunc(value);
    if (typeof value === 'string') {
      const match = value.match(/\b(19\d{2}|20\d{2})\b/);
      if (match) return Number(match[1]);
    }
  }
  return undefined;
}

function LibraryPanel({ entries, onBack, onNavigate, onRead, favorites, onToggleFavorite }: { entries: LibraryEntry[]; onBack: () => void; onNavigate: (target: NavTarget) => void; onRead: (entry: LibraryEntry, query?: string) => void; favorites: FavoriteRecord[]; onToggleFavorite: (favorite: FavoriteRecord) => void }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [libraryFolderOpen, setLibraryFolderOpen] = useState(false);
  const visible = entries.filter((entry) => {
    const q = query.trim().toLocaleLowerCase();
    const matchesQuery = !q || (
      (entry.title && entry.title.toLocaleLowerCase().includes(q)) ||
      (entry.excerpt && entry.excerpt.toLocaleLowerCase().includes(q)) ||
      (entry.body && entry.body.toLocaleLowerCase().includes(q))
    );
    const isConference = /conference|conferencia/i.test(entry.type);
    const hasAudio = Boolean(entry.audioUrl);
    const matchesFilter = !filter ||
      (filter === 'Conferencias' && isConference) ||
      (filter === 'Audios' && hasAudio);
    return matchesQuery && matchesFilter;
  });
  const q = query.trim();
  const ordered = [...visible].sort((a, b) => {
    const ay = a.year ?? 9999;
    const by = b.year ?? 9999;
    if (filter === 'Conferencias' && ay !== by) return ay - by;
    return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });
  });
  const conferenceGroups = filter === 'Conferencias'
    ? Array.from(new Set(ordered.map((entry) => entry.year ? String(entry.year) : 'Sin fecha'))).map((label) => ({ label, entries: ordered.filter((entry) => (entry.year ? String(entry.year) : 'Sin fecha') === label) }))
    : [{ label: '', entries: ordered }];
  const [openYears, setOpenYears] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (filter !== 'Conferencias') return;
    if (q) {
      setOpenYears(new Set(conferenceGroups.map((group) => group.label)));
      return;
    }
    setOpenYears(new Set());
  }, [filter, q, conferenceGroups.map((group) => group.label).join('|')]);
  const toggleYear = (label: string) => setOpenYears((current) => {
    const next = new Set(current);
    if (next.has(label)) next.delete(label); else next.add(label);
    return next;
  });
  return <section className="reader-section library-section">
    <FixedHeader eyebrow="PARA ESCUCHAR Y LEER" title="Tu biblioteca" subtitle="Buscá por conferencia, tema o etiqueta." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body library-browser">
      <section className="library-controls">
        <div className="library-search-toolbar">
          <div className="search-input-pill">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar"
              aria-label="Buscar en la biblioteca"
            />
            {query ? (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery('')}
                aria-label="Limpiar búsqueda"
              >
                <X size={16} strokeWidth={2.4} />
              </button>
            ) : (
              <span className="search-icon-badge" aria-hidden="true">
                <Search size={18} />
              </span>
            )}
          </div>
        </div>
        {filter && <button type="button" className="library-folders-back" onClick={() => { setFilter(null); setQuery(''); }}><ChevronLeft size={16} /> Biblioteca</button>}
      </section>
      {!filter && !query && <div className={`library-master-folder${libraryFolderOpen ? ' is-open' : ''}`}>
        <div className="library-master-folder-button">
          <span className="library-master-items">
            <button type="button" onClick={() => setFilter('Audios')}>Conferencias en audio</button>
            <button type="button" onClick={() => setFilter('Libros en audio')}>Libros en audio</button>
            <button type="button" onClick={() => setFilter('Libros en texto')}>Libros en texto</button>
            <button type="button" onClick={() => setFilter('Conferencias')}>Conferencias en texto</button>
          </span>
          <button type="button" className="library-master-folder-shape" onClick={() => setLibraryFolderOpen((value) => !value)} aria-expanded={libraryFolderOpen} aria-label="Abrir contenidos de la biblioteca"><i /><Folder size={112} strokeWidth={1.0} /></button>
          <strong>Biblioteca</strong><small>Tocá para ver el contenido</small>
        </div>
      </div>}
      {filter && !query && !/Libros/.test(filter) && <><p className="library-count">{ordered.length} {ordered.length === 1 ? 'resultado' : 'resultados'}</p><div className="library-content-list">{conferenceGroups.map((group) => <section key={group.label || 'all'} className="library-year-group is-open">{group.label && <div className="library-year-toggle"><span>{group.label}</span></div>}{group.entries.map((entry,index) => <div key={entry.id} className="library-card-row"><MagicCard delay={Math.min(index*.025,.2)} className="library-content-card" onClick={() => onRead(entry)}><div><p>{filter === 'Audios' ? 'Audio' : 'Texto'}</p><b className="card-title">{entry.title}</b>{filter === 'Audios' ? <em className="card-subtitle">Escuchar conferencia</em> : <em className="card-subtitle">{entry.excerpt || 'Abrir conferencia'}</em>}</div><span className="library-card-actions"><i>{filter === 'Audios' ? <Headphones size={19}/> : <ChevronRight size={19}/>}</i></span></MagicCard></div>)}</section>)}</div></>}
      {filter && /Libros/.test(filter) && !query && <p className="library-empty">Los libros se conectan después.</p>}
      {query && <><p className="library-count">{ordered.length} {ordered.length === 1 ? 'resultado' : 'resultados'}</p>
      <div id="library-results" className="library-content-list" role="tabpanel" aria-label={`Resultados: ${filter || 'Biblioteca'}`}>{conferenceGroups.map((group) => {
        const open = !group.label || openYears.has(group.label);
        return <section key={group.label || 'all'} className={`library-year-group${open ? ' is-open' : ''}`}>
          {group.label && <button type="button" className="library-year-toggle" onClick={() => toggleYear(group.label)} aria-expanded={open}><span>{group.label}</span><ChevronDown size={22} aria-hidden="true" /></button>}
          {open && group.entries.map((entry, index) => {
        const saved = favorites.some((favorite) => favorite.id === libraryFavorite(entry).id);
        let preview: React.ReactNode = entry.excerpt || 'Abrí para leer o escuchar.';
        if (q) {
          const titleHasMatch = entry.title?.toLocaleLowerCase().includes(q.toLocaleLowerCase());
          const excerptSnippet = snippetAround(entry.excerpt || '', q);
          const bodySnippet = snippetAround(entry.body || '', q);
          const contextText = excerptSnippet || bodySnippet;
          if (contextText) {
            preview = contextText;
          } else if (!titleHasMatch) {
            preview = entry.excerpt || 'Abrí para leer o escuchar.';
          }
        }
        return <div key={entry.id} className="library-card-row"><MagicCard delay={Math.min(index * .025, .2)} className="library-content-card" onClick={() => onRead(entry, q)}>
          <div>
            <p>{entry.type || 'Contenido'}</p>
            <b className="card-title">{entry.title}</b>
            <em className="card-subtitle">{preview}</em>
          </div>
          <span className="library-card-actions">
            <i><ChevronRight size={19} /></i>
          </span>
        </MagicCard><button type="button" className={`favorite-button library-row-favorite${saved ? ' is-favorite' : ''}`} onClick={() => onToggleFavorite(libraryFavorite(entry))} aria-label={saved ? `Quitar ${entry.title} de favoritos` : `Guardar ${entry.title} en favoritos`}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button></div>;
      })}
        </section>;
      })}</div>
      {!ordered.length && <p className="library-empty">No se encontraron resultados</p>}</>}
    </div>
  </section>;
}

function ConfirmDialog({ title = '¿Eliminar?', description, confirmLabel = 'Eliminar', cancelLabel = 'Cancelar', onConfirm, onCancel }: { title?: string; description: string; confirmLabel?: string; cancelLabel?: string; onConfirm: () => void; onCancel: () => void }) {
  return <AnimatedDialog open onOpenChange={(open) => { if (!open) onCancel(); }}>
    <AnimatedDialogContent from="bottom">
      <AnimatedDialogTitle>{title}</AnimatedDialogTitle>
      <AnimatedDialogDescription>{description}</AnimatedDialogDescription>
      <div className="sona-dialog-actions">
        <button type="button" className="sona-dialog-danger" onClick={onConfirm}>{confirmLabel}</button>
        <AnimatedDialogClose type="button">{cancelLabel}</AnimatedDialogClose>
      </div>
    </AnimatedDialogContent>
  </AnimatedDialog>;
}

function FavoritesPanel({ favorites, onBack, onNavigate, onOpen, onRemove }: { favorites: FavoriteRecord[]; onBack: () => void; onNavigate: (target: NavTarget) => void; onOpen: (favorite: FavoriteRecord) => void; onRemove: (favorite: FavoriteRecord) => void }) {
  const [pendingRemoval, setPendingRemoval] = useState<FavoriteRecord | null>(null);
  return <section className="reader-section favorites-section">
    <FixedHeader eyebrow="MI PERFIL" title="Favoritos" subtitle="Todo lo que guardaste, reunido en un solo lugar." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body favorites-browser">
      {!favorites.length && <div className="favorites-empty"><Heart size={30} /><b>Todavía no guardaste nada</b><p>Tocá el corazón de cualquier tarjeta para encontrarla después acá.</p></div>}
      {favorites.map((favorite, index) => <div key={favorite.id} className="favorite-card-row"><MagicCard delay={index * .04} className="favorite-content-card" onClick={() => onOpen(favorite)} style={{ '--category-tone': favorite.tone } as React.CSSProperties}><span className="card-image"><CategoryIcon item={{ icon: favorite.icon, title: favorite.title, detail: favorite.detail, tone: favorite.tone }} /></span><div><small className="card-subtitle">FAVORITO</small><b className="card-title">{favorite.title}</b><em className="card-subtitle">{favorite.detail}</em></div></MagicCard><button type="button" className="remove-favorite" onClick={() => setPendingRemoval(favorite)} aria-label={`Quitar ${favorite.title} de favoritos`}><Trash2 size={18} /></button></div>)}
    </div>
    {pendingRemoval && <ConfirmDialog description={`Se va a quitar "${pendingRemoval.title}" de tus favoritos.`} onCancel={() => setPendingRemoval(null)} onConfirm={() => { onRemove(pendingRemoval); setPendingRemoval(null); }} />}
  </section>;
}

const workshopMomentKeys = ['morning', 'noon', 'afternoon', 'night'] as const;
const workshopMomentPickerLabels: Record<typeof workshopMomentKeys[number], string> = { morning: 'Mañana', noon: 'Mediodía', afternoon: 'Tarde', night: 'Noche' };
const defaultWorkshopSchedule: WorkshopSchedule = { morning: '07:00', noon: '12:00', afternoon: '17:00', night: '22:00' };
const workshopIntervalOptions = [30, 40, 45, 60] as const;
const workshopIntervalLabel = (minutes: number) => minutes === 60 ? 'Cada 1 hora' : `Cada ${minutes} min`;
const detectTimezone = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch { return 'UTC'; } };
const shiftHours = (time: string, hours: number) => {
  const [h, m] = time.split(':').map(Number);
  const total = (((h * 60 + m + hours * 60) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

type WorkshopStage = 'loading' | 'onboarding' | 'conflict' | 'confirmed' | 'days' | 'error';
type WorkshopOnboardingStep = 'intro' | 'schedule' | 'frequency' | 'summary';
type ActiveProgramEnrollment = { id: string; collection_id: string; current_day: number; morning: string; noon: string; afternoon: string; night: string; timezone: string; message_interval_minutes: number; collections: { title: string } | null };

function WorkshopPanel({ user, program, onBack, onNavigate, onRead }: { user: User; program: ProgramPanelConfig; onBack: () => void; onNavigate: (target: NavTarget) => void; onRead: (reader: ReaderContent) => void }) {
  const [deliveries, setDeliveries] = useState<TallerDelivery[]>([]);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [activeProgram, setActiveProgram] = useState<ActiveProgramEnrollment | null>(null);
  const [stage, setStage] = useState<WorkshopStage>('loading');
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [step, setStep] = useState<WorkshopOnboardingStep>('intro');
  const [schedule, setSchedule] = useState<WorkshopSchedule>(defaultWorkshopSchedule);
  const [timezone, setTimezone] = useState(detectTimezone);
  const [messageInterval, setMessageInterval] = useState<typeof workshopIntervalOptions[number]>(40);
  const [editingMoment, setEditingMoment] = useState<typeof workshopMomentKeys[number] | null>(null);
  const [editingTimezone, setEditingTimezone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [confirmingAbandon, setConfirmingAbandon] = useState(false);
  const notifications = useNotificationsToggle(user);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        console.log('[workshop] buscando collection', program.slug);
        const { data: collection, error: collectionError } = await supabase
          .from('collections')
          .select('id')
          .eq('slug', program.slug)
          .maybeSingle();
        if (cancelled) return;
        if (collectionError) { console.error('[workshop] error buscando collection:', collectionError); setLoadError(collectionError.message); setStage('error'); return; }
        if (!collection) { console.error('[workshop] no existe la collection', program.slug); setLoadError('No encontramos el programa.'); setStage('error'); return; }
        setCollectionId(collection.id);

        console.log('[workshop] buscando programa activo para', user.id);
        const { data: enrollmentData, error: enrollmentError } = await supabase
          .from('program_enrollments')
          .select('id,collection_id,current_day,morning,noon,afternoon,night,timezone,message_interval_minutes,collections(title)')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();
        if (cancelled) return;
        if (enrollmentError) { console.error('[workshop] error buscando program_enrollments:', enrollmentError); setLoadError(enrollmentError.message); setStage('error'); return; }
        if (!enrollmentData) { console.log('[workshop] sin programa activo -> onboarding'); setStage('onboarding'); return; }
        const enrollment = enrollmentData as unknown as ActiveProgramEnrollment;
        setActiveProgram(enrollment);
        if (enrollment.collection_id !== collection.id) { setStage('conflict'); return; }
        setEnrollmentId(enrollment.id);
        setCurrentDay(enrollment.current_day);
        setSchedule({ morning: enrollment.morning.slice(0, 5), noon: enrollment.noon.slice(0, 5), afternoon: enrollment.afternoon.slice(0, 5), night: enrollment.night.slice(0, 5) });
        setTimezone(enrollment.timezone);
        if (workshopIntervalOptions.includes(enrollment.message_interval_minutes as typeof workshopIntervalOptions[number])) setMessageInterval(enrollment.message_interval_minutes as typeof workshopIntervalOptions[number]);

        console.log('[workshop] buscando taller_deliveries…');
        const { data: deliveryRows, error: deliveryError } = await supabase
          .from('taller_deliveries')
          .select('id,day_number,delivery_type,delivered_at,seen_at,message_index,content_items(title,body),content_assets(source_url)')
          .eq('enrollment_id', enrollment.id)
          .order('delivered_at', { ascending: false });
        if (cancelled) return;
        if (deliveryError) { console.error('[workshop] error buscando taller_deliveries:', deliveryError); setLoadError(deliveryError.message); setStage('error'); return; }
        console.log('[workshop] entregas encontradas:', deliveryRows?.length ?? 0);

        const mapped = (deliveryRows || []).map((row) => {
          const item = row.content_items as unknown as { title: string; body: string } | null;
          const asset = row.content_assets as unknown as { source_url: string } | null;
          const deliveryType = row.delivery_type as TallerDeliveryType;
          const body = item?.body || '';
          const paragraphs = extractDeliveryParagraphs(body, deliveryType, row.message_index);
          return {
            id: row.id,
            dayNumber: row.day_number,
            deliveryType,
            deliveredAt: row.delivered_at,
            seenAt: row.seen_at,
            title: item?.title || `Día ${row.day_number}`,
            paragraphs: paragraphs || [],
            audioUrl: asset?.source_url,
          } as TallerDelivery;
        });
        setDeliveries(mapped);
        setStage('days');
      } catch (err) {
        if (cancelled) return;
        console.error('[workshop] excepción cargando el taller:', err);
        setLoadError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
        setStage('error');
      }
    })();
    return () => { cancelled = true; };
  }, [user.id, program.slug]);

  const enrollmentParams = () => ({
    p_collection_id: collectionId,
    p_morning: schedule.morning,
    p_noon: schedule.noon,
    p_afternoon: schedule.afternoon,
    p_night: schedule.night,
    p_timezone: timezone,
    p_message_interval_minutes: messageInterval,
  });

  const startWorkshop = async () => {
    if (!collectionId) return;
    setSaving(true);
    setSaveError('');
    const subscribeResult = await subscribeToPush(user);
    if (subscribeResult.error) {
      setSaving(false);
      setSaveError(subscribeResult.error);
      return;
    }
    const { data: enrollment, error: progressError } = await supabase.rpc('start_program', enrollmentParams()).single();
    setSaving(false);
    if (progressError) { setSaveError(progressError.message); return; }
    setEnrollmentId((enrollment as { id: string }).id);
    setCurrentDay(1);
    setStage('confirmed');
  };

  const abandonProgram = async () => {
    if (!activeProgram && !enrollmentId) return;
    setSaving(true);
    setSaveError('');
    const id = activeProgram?.id || enrollmentId!;
    const { error } = await supabase.rpc('abandon_program', { p_enrollment_id: id });
    setSaving(false);
    if (error) { setSaveError(error.message); return; }
    setConfirmingAbandon(false);
    setActiveProgram(null);
    setEnrollmentId(null);
    setCurrentDay(null);
    setDeliveries([]);
    onBack();
  };

  const abandonAndStartWorkshop = async () => {
    if (!activeProgram || !collectionId) return;
    setSaving(true);
    setSaveError('');
    const subscribeResult = await subscribeToPush(user);
    if (subscribeResult.error) { setSaving(false); setSaveError(subscribeResult.error); return; }
    const { data: enrollment, error } = await supabase.rpc('switch_program', {
      p_current_enrollment_id: activeProgram.id,
      p_new_collection_id: collectionId,
      p_morning: schedule.morning,
      p_noon: schedule.noon,
      p_afternoon: schedule.afternoon,
      p_night: schedule.night,
      p_timezone: timezone,
      p_message_interval_minutes: messageInterval,
    }).single();
    setSaving(false);
    if (error) { setSaveError(error.message); return; }
    setConfirmingAbandon(false);
    setActiveProgram(null);
    setEnrollmentId((enrollment as { id: string }).id);
    setCurrentDay(1);
    setDeliveries([]);
    setStage('confirmed');
  };

  const openDelivery = (delivery: TallerDelivery) => {
    onRead({ title: `Día ${delivery.dayNumber} · ${deliveryTypeLabels[delivery.deliveryType]}`, eyebrow: 'PRÁCTICA GUIADA', detail: `Recibido ${formatDeliveredAt(delivery.deliveredAt)}.`, paragraphs: delivery.paragraphs, audioUrl: delivery.audioUrl });
    if (!delivery.seenAt) {
      const seenAt = new Date().toISOString();
      setDeliveries((current) => current.map((item) => item.id === delivery.id ? { ...item, seenAt } : item));
      void supabase.from('taller_deliveries').update({ seen_at: seenAt }).eq('id', delivery.id);
    }
  };

  if (stage === 'loading') return <section className="reader-section workshop-section"><FixedHeader eyebrow="PRÁCTICAS GUIADAS" title={program.title} subtitle={program.subtitle} onBack={onBack} onNavigate={onNavigate} /><div className="reader-body workshop-browser"><p className="library-empty">Cargando el taller…</p></div></section>;

  if (stage === 'error') return <section className="reader-section workshop-section"><FixedHeader eyebrow="PRÁCTICAS GUIADAS" title={program.title} subtitle={program.subtitle} onBack={onBack} onNavigate={onNavigate} /><div className="reader-body workshop-browser"><p className="library-empty">No pudimos cargar el taller. Probá de nuevo más tarde.{loadError ? ` (${loadError})` : ''}</p></div></section>;

  if (stage === 'conflict' && activeProgram) {
    const activeTitle = activeProgram.collections?.title || 'otro programa';
    return <section className="reader-section workshop-section">
      <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Ya tenés un programa activo" subtitle={`Estás realizando ${activeTitle}.`} onBack={onBack} onNavigate={onNavigate} />
      <div className="reader-body">
        <p>Para comenzar {program.title}, primero tenés que abandonar tu programa actual.</p>
        {saveError && <p className="account-message" role="alert">{saveError}</p>}
        <ShimmerButton type="button" className="account-save" onClick={onBack}>Continuar mi programa</ShimmerButton>
        <button type="button" className="workshop-abandon" onClick={() => setConfirmingAbandon(true)}>Abandonar y empezar el nuevo</button>
      </div>
      {confirmingAbandon && <ConfirmDialog
        title={`¿Querés abandonar ${activeTitle}?`}
        description={`Vas a dejar de recibir sus prácticas y notificaciones. Taller de 40 días comenzará desde el Día 1.`}
        confirmLabel={saving ? 'Un momento…' : 'Abandonar y empezar'}
        cancelLabel="Seguir con mi programa"
        onCancel={() => { if (!saving) setConfirmingAbandon(false); }}
        onConfirm={() => { if (!saving) void abandonAndStartWorkshop(); }}
      />}
    </section>;
  }

  if (stage === 'onboarding' && step === 'intro') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Taller de Autoconcepto" subtitle="40 días para transformar cómo te ves y cómo ves la vida." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      <p>Este es un recorrido de 40 días diseñado para volver a tu fuente. Cada día vas a recibir 4 meditaciones guiadas — una a la mañana, al mediodía, a la tarde y a la noche — que te van a acompañar a reconstruir tu autoconcepto desde adentro.</p>
      <p>Además, durante el día vas a recibir mensajes breves con frases e ideas para mantener tu atención enfocada. Vos elegís cada cuánto te llegan.</p>
      <p>No tenés que hacer nada más que escuchar y estar presente. Todo te llega por notificación, en el momento justo.</p>
      <ShimmerButton type="button" className="account-save" onClick={() => setStep('schedule')}>Comenzar configuración →</ShimmerButton>
    </div>
  </section>;

  if (stage === 'onboarding' && step === 'schedule') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Elegí tus horarios" subtitle="¿A qué hora querés recibir cada meditación?" onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      <div className="ios-card">
        <button className="ios-row" onClick={() => setEditingTimezone(true)} aria-haspopup="dialog"><span className="ios-row-label">Zona horaria</span><span className="ios-row-value ios-row-value--muted">{timezone.replace(/_/g, ' ')}<ChevronRight size={17} /></span></button>
        {workshopMomentKeys.map((key) => <button key={key} className="ios-row" onClick={() => setEditingMoment(key)} aria-label={`Cambiar horario de ${workshopMomentPickerLabels[key]}: ${schedule[key]}`} aria-haspopup="dialog"><span className="ios-row-label">{workshopMomentPickerLabels[key]}</span><span className="ios-row-value">{schedule[key]}<ChevronRight size={17} /></span></button>)}
      </div>
      {editingMoment && <TimePicker label={workshopMomentPickerLabels[editingMoment]} value={schedule[editingMoment]} onCancel={() => setEditingMoment(null)} onSave={(value) => { setSchedule((current) => ({ ...current, [editingMoment]: value })); setEditingMoment(null); }} />}
      {editingTimezone && <TimezonePicker value={timezone} onCancel={() => setEditingTimezone(false)} onSave={(zone) => { setTimezone(zone); setEditingTimezone(false); }} />}
      <ShimmerButton type="button" className="account-save" onClick={() => setStep('frequency')}>Siguiente →</ShimmerButton>
    </div>
  </section>;

  if (stage === 'onboarding' && step === 'frequency') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Mensajes durante el día" subtitle="Cada día hay ~26 mensajes breves para mantener tu atención. ¿Cada cuánto querés recibirlos?" onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      <div className="ios-card workshop-pills-card">
        <div className="workshop-pills">{workshopIntervalOptions.map((minutes) => <button key={minutes} type="button" className={`workshop-pill${messageInterval === minutes ? ' active' : ''}`} onClick={() => setMessageInterval(minutes)}>{workshopIntervalLabel(minutes)}</button>)}</div>
      </div>
      <p className="workshop-hint">Los mensajes llegarían entre las {schedule.morning} y las {schedule.night}.</p>
      <ShimmerButton type="button" className="account-save" onClick={() => setStep('summary')}>Siguiente →</ShimmerButton>
    </div>
  </section>;

  if (stage === 'onboarding') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Tu taller está listo" subtitle="Revisá la configuración antes de empezar." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      <div className="ios-card">
        <div className="ios-row"><span className="ios-row-label">Zona horaria</span><span className="ios-row-value ios-row-value--muted">{timezone.replace(/_/g, ' ')}</span></div>
        <div className="ios-row"><span className="ios-row-label">Meditación de la mañana</span><span className="ios-row-value">{schedule.morning}</span></div>
        <div className="ios-row"><span className="ios-row-label">Meditación del mediodía</span><span className="ios-row-value">{schedule.noon}</span></div>
        <div className="ios-row"><span className="ios-row-label">Meditación de la tarde</span><span className="ios-row-value">{schedule.afternoon}</span></div>
        <div className="ios-row"><span className="ios-row-label">Meditación de la noche</span><span className="ios-row-value">{schedule.night}</span></div>
        <div className="ios-row"><span className="ios-row-label">Mensajes intermedios</span><span className="ios-row-value ios-row-value--muted">{workshopIntervalLabel(messageInterval)}</span></div>
        <div className="ios-row"><span className="ios-row-label">Duración</span><span className="ios-row-value ios-row-value--muted">40 días</span></div>
      </div>
      {saveError && <p className="account-message">{saveError}</p>}
      <ShimmerButton type="button" className="account-save" onClick={startWorkshop} disabled={saving}>{saving ? 'Un momento…' : 'Comenzar taller'}</ShimmerButton>
    </div>
  </section>;

  if (stage === 'confirmed') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="¡Listo!" subtitle="Ya está todo configurado." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      <p>¡Listo! Tu primera práctica llega mañana a las {schedule.morning}. Preparate para 40 días que te van a cambiar la mirada.</p>
      <ShimmerButton type="button" className="account-save" onClick={() => setStage('days')}>Ver el taller</ShimmerButton>
    </div>
  </section>;

  return <section className="reader-section workshop-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Taller de 40 días" subtitle={currentDay != null ? `Vas por el día ${currentDay} de 40.` : 'Autoconcepto y control de la imaginación.'} onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body workshop-browser">
      <div className="ios-card">
        <div className="ios-row"><span className="ios-row-label">Notificaciones</span>{notifications.loading ? <span className="ios-toggle-placeholder" aria-hidden="true" /> : <ToggleSwitch checked={notifications.active} onChange={notifications.toggle} disabled={notifications.busy} label="Notificaciones" />}</div>
      </div>
      {!notifications.loading && !notifications.active && <p className="workshop-notifications-warning">Sin notificaciones no vas a recibir las prácticas.</p>}
      {!deliveries.length && <p className="library-empty">Tu taller comienza pronto. Vas a recibir tu primera práctica en tu próximo horario configurado.</p>}
      {!!deliveries.length && <div className="library-content-list">{deliveries.map((delivery) => <MagicCard key={delivery.id} className="library-content-card" onClick={() => openDelivery(delivery)}>
        <div>
          <p>DÍA {delivery.dayNumber} · {deliveryTypeLabels[delivery.deliveryType].toUpperCase()}</p>
          <b className="card-title">{deliveryTypeLabels[delivery.deliveryType]}</b>
          <em className="card-subtitle">Recibido {formatDeliveredAt(delivery.deliveredAt)}</em>
        </div>
        <span className="library-card-actions">{delivery.seenAt ? <i className="delivery-seen" aria-label="Ya visto"><Check size={16} /></i> : <i className="delivery-unseen" aria-label="Sin ver" />}<i><ChevronRight size={19} /></i></span>
      </MagicCard>)}</div>}
      {saveError && <p className="account-message" role="alert">{saveError}</p>}
      <button type="button" className="workshop-abandon" onClick={() => setConfirmingAbandon(true)}>Abandonar programa</button>
    </div>
    {confirmingAbandon && <ConfirmDialog
      title="¿Querés abandonar Taller de 40 días?"
      description="Vas a dejar de recibir sus prácticas y notificaciones. Podrás empezar otro programa desde el Día 1."
      confirmLabel={saving ? 'Un momento…' : 'Abandonar programa'}
      onCancel={() => { if (!saving) setConfirmingAbandon(false); }}
      onConfirm={() => { if (!saving) void abandonProgram(); }}
    />}
  </section>;
}

// Sheet genérico de una sola lista (reusa el mismo look que TimezonePicker,
// sin buscador, para listas cortas de opciones: tema, duración, frecuencia).
function OptionSheet({ title, options, value, onCancel, onSave }: { title: string; options: { value: string; label: string }[]; value: string | null; onCancel: () => void; onSave: (value: string) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    element?.showModal();
    return () => { element?.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="time-sheet" aria-labelledby="option-sheet-title" onCancel={(event) => { event.preventDefault(); onCancel(); }} onClick={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
    <div className="time-sheet-content">
      <div className="time-sheet-handle" aria-hidden="true" />
      <header><button onClick={onCancel}>Cancelar</button><h2 id="option-sheet-title">{title}</h2><button style={{ visibility: 'hidden' }}>Cancelar</button></header>
      <div className="timezone-list">
        {options.map((option) => <button key={option.value} className={`timezone-option${option.value === value ? ' selected' : ''}`} onClick={() => onSave(option.value)}>{option.label}</button>)}
      </div>
    </div>
  </dialog>;
}

type PropiaTema = 'Amor y relaciones' | 'Dinero y trabajo' | 'Salud y bienestar' | 'Imaginación';
const propiaTemaOptions: PropiaTema[] = ['Amor y relaciones', 'Dinero y trabajo', 'Salud y bienestar', 'Imaginación'];
type PropiaDuracion = 'Una práctica' | '7 días' | '15 días' | '40 días';
const propiaDuracionOptions: PropiaDuracion[] = ['Una práctica', '7 días', '15 días', '40 días'];
type PropiaEditingField = 'tema' | 'duracion' | 'frecuencia' | null;

function PropiaPracticaPanel({ user, onBack, onNavigate, onRead }: { user: User; onBack: () => void; onNavigate: (target: NavTarget) => void; onRead: (reader: ReaderContent) => void }) {
  const [tema, setTema] = useState<PropiaTema | null>(null);
  const [duracion, setDuracion] = useState<PropiaDuracion | null>(null);
  const [frequency, setFrequency] = useState<typeof workshopIntervalOptions[number]>(40);
  const [schedule, setSchedule] = useState<WorkshopSchedule>(defaultWorkshopSchedule);
  const [timezone, setTimezone] = useState(detectTimezone);
  const [editingField, setEditingField] = useState<PropiaEditingField>(null);
  const [editingMoment, setEditingMoment] = useState<typeof workshopMomentKeys[number] | null>(null);
  const [editingTimezone, setEditingTimezone] = useState(false);
  const [errors, setErrors] = useState<{ tema?: string; duracion?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const needsSchedule = duracion === '7 días' || duracion === '15 días' || duracion === '40 días';

  const submit = async () => {
    const nextErrors: { tema?: string; duracion?: string } = {};
    if (!tema) nextErrors.tema = 'Elegí un tema';
    if (!duracion) nextErrors.duracion = 'Elegí una duración';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setMessage('');

    if (duracion === 'Una práctica') {
      const plan = planNodes.find((node) => node.title === tema);
      const firstDay = plan?.children?.[0];
      const firstPractice = firstDay?.children?.find((item) => item.reader);
      console.log('[propia] "Una práctica" ->', tema, '-> encontrado:', Boolean(firstPractice?.reader));
      if (!firstPractice?.reader) {
        setMessage('No encontramos contenido para este tema todavía.');
        return;
      }
      onRead(firstPractice.reader);
      return;
    }

    setSubmitting(true);
    try {
      console.log('[propia] activando notificaciones para', tema, duracion);
      const result = await ensurePushSubscription(user);
      if (result.error) {
        console.error('[propia] no se pudo activar notificaciones:', result.error);
        setMessage(result.error);
        return;
      }
      localStorage.setItem('german-propia-practica', JSON.stringify({ tema, duracion, frequency, schedule, timezone, savedAt: new Date().toISOString() }));
      console.log('[propia] guardado localmente y notificaciones activas');
      setConfirmed(true);
    } catch (err) {
      console.error('[propia] excepción al guardar la práctica:', err);
      setMessage(err instanceof Error ? err.message : 'No pudimos guardar tu práctica.');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return <section className="reader-section">
      <FixedHeader eyebrow="TU PROPIA PRÁCTICA" title="¡Listo!" subtitle="Ya está todo configurado." onBack={onBack} onNavigate={onNavigate} />
      <div className="reader-body">
        <p>Elegiste <strong>{tema}</strong> durante <strong>{duracion}</strong>. Vas a recibir tus prácticas por notificación en los horarios que configuraste.</p>
        <button type="button" className="btn-primary" onClick={onBack}>Volver al inicio</button>
      </div>
    </section>;
  }

  return <section className="reader-section">
    <FixedHeader eyebrow="TU PROPIA PRÁCTICA" title="Creá tu recorrido" subtitle="Elegí qué practicar, cuánto tiempo y cuándo." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      <div className="ios-card">
        <button type="button" className="ios-row" onClick={() => setEditingField('tema')} aria-haspopup="dialog">
          <span className="ios-row-label">Tema</span>
          <span className={`ios-row-value${tema ? '' : ' ios-row-value--muted'}`}>{tema || 'Elegir'}<ChevronRight size={17} /></span>
        </button>
        <button type="button" className="ios-row" onClick={() => setEditingField('duracion')} aria-haspopup="dialog">
          <span className="ios-row-label">Duración</span>
          <span className={`ios-row-value${duracion ? '' : ' ios-row-value--muted'}`}>{duracion || 'Elegir'}<ChevronRight size={17} /></span>
        </button>
        {needsSchedule && <button type="button" className="ios-row" onClick={() => setEditingField('frecuencia')} aria-haspopup="dialog">
          <span className="ios-row-label">Frecuencia</span>
          <span className="ios-row-value">{workshopIntervalLabel(frequency)}<ChevronRight size={17} /></span>
        </button>}
        {needsSchedule && workshopMomentKeys.map((key) => <button key={key} type="button" className="ios-row" onClick={() => setEditingMoment(key)} aria-label={`Cambiar horario de ${workshopMomentPickerLabels[key]}: ${schedule[key]}`} aria-haspopup="dialog">
          <span className="ios-row-label">{workshopMomentPickerLabels[key]}</span>
          <span className="ios-row-value">{schedule[key]}<ChevronRight size={17} /></span>
        </button>)}
        {needsSchedule && <button type="button" className="ios-row" onClick={() => setEditingTimezone(true)} aria-haspopup="dialog">
          <span className="ios-row-label">Zona horaria</span>
          <span className="ios-row-value ios-row-value--muted">{timezone.replace(/_/g, ' ')}<ChevronRight size={17} /></span>
        </button>}
      </div>
      {errors.tema && <p className="account-message">{errors.tema}</p>}
      {errors.duracion && <p className="account-message">{errors.duracion}</p>}
      {message && <p className="account-message">{message}</p>}
      <button type="button" className="btn-primary" onClick={submit} disabled={submitting}>{submitting ? 'Un momento…' : 'Comenzar práctica'}</button>
    </div>

    {editingField === 'tema' && <OptionSheet title="Tema" options={propiaTemaOptions.map((option) => ({ value: option, label: option }))} value={tema} onCancel={() => setEditingField(null)} onSave={(value) => { setTema(value as PropiaTema); setEditingField(null); }} />}
    {editingField === 'duracion' && <OptionSheet title="Duración" options={propiaDuracionOptions.map((option) => ({ value: option, label: option }))} value={duracion} onCancel={() => setEditingField(null)} onSave={(value) => { setDuracion(value as PropiaDuracion); setEditingField(null); }} />}
    {editingField === 'frecuencia' && <OptionSheet title="Frecuencia" options={workshopIntervalOptions.map((minutes) => ({ value: String(minutes), label: workshopIntervalLabel(minutes) }))} value={String(frequency)} onCancel={() => setEditingField(null)} onSave={(value) => { setFrequency(Number(value) as typeof workshopIntervalOptions[number]); setEditingField(null); }} />}
    {editingMoment && <TimePicker label={workshopMomentPickerLabels[editingMoment]} value={schedule[editingMoment]} onCancel={() => setEditingMoment(null)} onSave={(value) => { setSchedule((current) => ({ ...current, [editingMoment]: value })); setEditingMoment(null); }} />}
    {editingTimezone && <TimezonePicker value={timezone} onCancel={() => setEditingTimezone(false)} onSave={(zone) => { setTimezone(zone); setEditingTimezone(false); }} />}
  </section>;
}

// Detecta si la URL actual es un callback de OAuth (implicit flow con
// #access_token en el hash, o PKCE con ?code= en query, o un ?error=).
// Se usa para no mostrar el video splash al volver de loguearse con Google.
function hasOAuthCallbackParams() {
  if (typeof window === 'undefined') return false;
  const hash = window.location.hash || '';
  const search = window.location.search || '';
  return /(^|[#&])access_token=/.test(hash)
    || /(^|[#&])refresh_token=/.test(hash)
    || /(^|[?&])code=/.test(search)
    || /(^|[#&?])error(_description)?=/.test(hash + search);
}

function getDeliveryIdFromUrl() {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('delivery');
}

function VideoIntro({ onFinish }: { onFinish: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showEnter, setShowEnter] = useState(false);
  // Ref con la última versión de onFinish: el efecto de abajo monta el video
  // una sola vez ([] de dependencias) y no debe re-ejecutarse si App
  // re-renderiza y pasa una nueva función inline — eso era lo que hacía que
  // el video se reiniciara a mitad de reproducción (se veía como "doble video").
  const onFinishRef = useRef(onFinish);
  useEffect(() => { onFinishRef.current = onFinish; }, [onFinish]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Crear el elemento de video directamente en el DOM para evitar el bug de 'muted' en React
    const video = document.createElement('video');
    video.className = 'video-intro-video';
    video.src = '/videos/video-german-white.mp4?v=3';
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('preload', 'auto');
    video.setAttribute('aria-label', 'Presentación de Germán Asistente');
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;

    video.onended = () => {
      onFinishRef.current();
    };

    let buttonTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleEnterButton = () => {
      if (buttonTimer) return;
      buttonTimer = setTimeout(() => setShowEnter(true), 2000);
    };
    video.addEventListener('playing', scheduleEnterButton, { once: true });
    // Red de seguridad: si el autoplay queda bloqueado y 'playing' nunca
    // dispara, igual mostramos el botón para no dejar al usuario varado
    // sin ninguna forma de avanzar.
    const safetyTimer = setTimeout(scheduleEnterButton, 2500);

    container.appendChild(video);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const playOnTouch = () => {
          video.play().catch(() => undefined);
          window.removeEventListener('touchstart', playOnTouch);
        };
        window.addEventListener('touchstart', playOnTouch, { once: true, passive: true });
      });
    }

    return () => {
      video.onended = null;
      video.removeEventListener('playing', scheduleEnterButton);
      clearTimeout(safetyTimer);
      if (buttonTimer) clearTimeout(buttonTimer);
      video.pause();
      if (video.parentNode === container) {
        container.removeChild(video);
      }
    };
  }, []);

  return <div ref={containerRef} className="video-intro">
    {showEnter && <button type="button" className="video-intro-enter" onClick={() => onFinishRef.current()}><span>Ingresar</span><ArrowRight size={18} strokeWidth={2.4} /></button>}
  </div>;
}

export default function App() {
  // El splash se salta al volver de OAuth y al abrir una entrega desde push.
  // El deep-link debe llevar al contenido inmediatamente, incluso si primero
  // hace falta restaurar la sesión o iniciar sesión.
  const isOAuthCallback = hasOAuthCallbackParams();
  const initialDeliveryId = getDeliveryIdFromUrl();
  const [showVideo, setShowVideo] = useState(() => {
    if (isOAuthCallback) console.log('[auth] callback de OAuth detectado en la URL al montar, saltando el video');
    if (initialDeliveryId) console.log('[deep-link] entrega detectada en la URL al montar, saltando el video');
    return !isOAuthCallback && !initialDeliveryId;
  });
  const [sessionChecked, setSessionChecked] = useState(false);
  const [accessState, setAccessState] = useState<'checking' | 'active' | 'inactive' | 'error'>('checking');
  const [session, setSession] = useState<Session | null>(null);
  const [pendingDeliveryId, setPendingDeliveryId] = useState(initialDeliveryId);

  // iOS puede reutilizar una PWA ya abierta cuando se toca un push. En ese caso
  // el componente no se remonta: sincronizamos ?delivery= al volver a primer plano
  // y apagamos el splash antes de abrir la entrega.
  useEffect(() => {
    const syncPushDeepLink = () => {
      const deliveryId = getDeliveryIdFromUrl();
      if (!deliveryId) return;
      setShowVideo(false);
      setPendingDeliveryId(deliveryId);
    };
    syncPushDeepLink();
    window.addEventListener('pageshow', syncPushDeepLink);
    window.addEventListener('popstate', syncPushDeepLink);
    const onSwMessage = (event: MessageEvent) => {
      if (event.data?.type !== 'LAST_PUSH' || typeof event.data.url !== 'string') return;
      const pushUrl = new URL(event.data.url, window.location.origin);
      const deliveryPathMatch = pushUrl.pathname.match(/^\/delivery\/[^/]+$/);
      if (deliveryPathMatch) {
        window.location.assign(`${pushUrl.pathname}${pushUrl.search}${pushUrl.hash}`);
        return;
      }
      const deliveryId = pushUrl.searchParams.get('delivery');
      if (!deliveryId) return;
      setShowVideo(false);
      setPendingDeliveryId(deliveryId);
    };
    document.addEventListener('visibilitychange', syncPushDeepLink);
    navigator.serviceWorker?.addEventListener('message', onSwMessage);
    navigator.serviceWorker?.ready.then((registration) => registration.active?.postMessage({ type: 'GET_LAST_PUSH' })).catch(() => undefined);
    return () => {
      window.removeEventListener('pageshow', syncPushDeepLink);
      window.removeEventListener('popstate', syncPushDeepLink);
      document.removeEventListener('visibilitychange', syncPushDeepLink);
      navigator.serviceWorker?.removeEventListener('message', onSwMessage);
    };
  }, []);

  useEffect(() => {
    if (!session?.access_token) { setAccessState('checking'); return; }
    let cancelled = false;
    setAccessState('checking');
    fetch('/api/access', { headers: { Authorization: `Bearer ${session.access_token}` }, cache: 'no-store' })
      .then(async (response) => {
        const data = await response.json().catch(() => ({})) as { active?: boolean };
        if (cancelled) return;
        if (!response.ok) return setAccessState('error');
        if (data.active) setAccessState('active');
        else { setAccessState('inactive'); window.location.assign('/access'); }
      })
      .catch(() => { if (!cancelled) setAccessState('error'); });
    return () => { cancelled = true; };
  }, [session?.access_token]);
  const [fullName, setFullName] = useState<string | null>(null);
  const [mainMenu, setMainMenu] = useState(true);
  const [tab, setTab] = useState<Tab>('biblioteca');
  const [trail, setTrail] = useState<DeckItem[]>([]);
  const [reader, setReader] = useState<ReaderContent | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [programConfig, setProgramConfig] = useState<ProgramPanelConfig>({ slug: 'taller-40-dias', title: 'Taller de 40 días', subtitle: 'Autoconcepto y control de la imaginación.' });
  const [courseOpen, setCourseOpen] = useState(false);
  const [interactiveBookOpen, setInteractiveBookOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const [installDismissed, setInstallDismissed] = useState(false);
  const [installPlatform, setInstallPlatform] = useState<ReturnType<typeof detectInstallPlatform>>('other');
  const [installPromptAvailable, setInstallPromptAvailable] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);
  const [preguntameOpen, setPreguntameOpen] = useState(false);
  const [libraryItems, setLibraryItems] = useState<LibraryEntry[]>([]);
  const [audiobookItems, setAudiobookItems] = useState<AudiobookEntry[]>([]);
  const [audiobooksLoading, setAudiobooksLoading] = useState(true);
  const [audiobooksError, setAudiobooksError] = useState('');
  const [selectedAudiobook, setSelectedAudiobook] = useState<AudiobookEntry | null>(null);
  const [momentNodes, setMomentNodes] = useState<DeckItem[]>([]);
  const screens = useMemo(() => buildScreens(momentNodes), [momentNodes]);
  const mainCardIndexRef = useRef(0);
  const carouselIndicesRef = useRef<Record<string, number>>({});
  const current = trail.at(-1);
  const screen = useMemo<Screen>(() => {
    if (current) return { eyebrow: trail.length === 1 ? screens[tab].title.toUpperCase() : trail.at(-2)?.title.toUpperCase() || screens[tab].eyebrow, title: current.title, subtitle: current.detail, items: current.children || [] };
    return screens[tab];
  }, [current, tab, trail]);

  const back = () => {
    if (preguntameOpen) return setPreguntameOpen(false);
    if (selectedAudiobook) return setSelectedAudiobook(null);
    if (reader) return setReader(null);
    if (notificationsOpen) return setNotificationsOpen(false);
    if (configurationOpen) return setConfigurationOpen(false);
    if (accountOpen) return setAccountOpen(false);
    if (favoritesOpen) return setFavoritesOpen(false);
    if (workshopOpen) return setWorkshopOpen(false);
    if (interactiveBookOpen) { setInteractiveBookOpen(false); return setMainMenu(true); }
    if (courseOpen) { setCourseOpen(false); return setMainMenu(true); }
    if (trail.length) return setTrail((value) => value.slice(0, -1));
    setMainMenu(true);
  };

  const navigateTo = (target: NavTarget) => {
    setSelectedAudiobook(null);
    setReader(null);
    setNotificationsOpen(false);
    setConfigurationOpen(false);
    setAccountOpen(false);
    setFavoritesOpen(false);
    setWorkshopOpen(false);
    setPreguntameOpen(false);
    setCourseOpen(false);
    setInteractiveBookOpen(false);
    setTrail([]);
    if (target === 'home') { setMainMenu(true); return; }
    setMainMenu(false);
    if (target === 'favorites') { setFavoritesOpen(true); return; }
    if (target === 'curso') { setCourseOpen(true); return; }
    if (target === 'configuracion') { setConfigurationOpen(true); setTab('espacio'); return; }
    if (target === 'notificaciones') { setConfigurationOpen(true); setNotificationsOpen(true); setTab('espacio'); return; }
    setTab(target);
  };

  const logout = () => {
    void (async () => {
      // Este navegador/PWA puede usarse luego con otra cuenta. Antes de cerrar
      // sesión desactivamos los pushes del usuario actual para que el mismo
      // dispositivo no siga recibiendo entregas de la cuenta que salió.
      if (session?.user) {
        const { error } = await disableCurrentBrowserPushSubscription(session.user.id);
        if (error) console.error('[logout] no se pudo desactivar push:', error);
      }
      await supabase.auth.signOut();
    })().finally(() => {
      setSession(null);
      setFullName(null);
      setTrail([]);
      setAccountOpen(false);
      setNotificationsOpen(false);
      setConfigurationOpen(false);
      setFavoritesOpen(false);
      setWorkshopOpen(false);
      setCourseOpen(false);
      setInteractiveBookOpen(false);
      setSelectedAudiobook(null);
      setReader(null);
      setMainMenu(true);
    });
  };

  const select = (selected: DeckItem) => {
    if (selected.action === 'logout') {
      logout();
      return;
    }
    if (selected.reader) return setReader(selected.reader);
    if (selected.notificationPanel) return setNotificationsOpen(true);
    if (selected.accountPanel) return setAccountOpen(true);
    if (selected.programPanel) { setProgramConfig(selected.programPanel); setWorkshopOpen(true); return; }
    if (selected.workshopPanel) return setWorkshopOpen(true);
    if (selected.title === 'Favoritos') return setFavoritesOpen(true);
    if (selected.title === 'Configuración') return setConfigurationOpen(true);
    if (selected.title === 'Preguntar') return setPreguntameOpen(true);
    if (selected.children) setTrail((value) => [...value, selected]);
  };

  const toggleFavorite = (favorite: FavoriteRecord) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((item) => item.id === favorite.id);
      const next = exists ? currentFavorites.filter((item) => item.id !== favorite.id) : [favorite, ...currentFavorites];
      localStorage.setItem('german-favorites', JSON.stringify(next));
      return next;
    });
  };

  const syncProfile = async (user: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error al obtener perfil:', error);
      }

      if (!profile) {
        const { data: inserted, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            auth_provider: user.app_metadata?.provider || 'email',
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          })
          .select('full_name')
          .maybeSingle();

        if (insertError) {
          console.error('Error al insertar perfil inicial:', insertError);
        }
        setFullName(inserted?.full_name ?? null);
      } else {
        setFullName(profile.full_name ?? null);
      }
    } catch (err) {
      console.error('Error en syncProfile:', err);
    }
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then((registration) => registration.update().catch(() => undefined)).catch(() => undefined);
    const savedFavorites = localStorage.getItem('german-favorites');
    if (savedFavorites) {
      try { setFavorites(JSON.parse(savedFavorites) as FavoriteRecord[]); } catch { localStorage.removeItem('german-favorites'); }
    }

    // La sesión de Supabase se restaura desde almacenamiento local. No
    // bloqueamos la primera pintura esperando perfil/red: eso hacía que una
    // PWA con conexión lenta pareciera congelada.
    console.log('[auth] pidiendo getSession()...');
    // Red de seguridad: si getSession() nunca resuelve (colgado por red u
    // otro motivo), no dejamos la app trabada en blanco para siempre.
    const sessionCheckTimeout = setTimeout(() => {
      console.warn('[auth] getSession() no resolvió a tiempo (1.5s), mostrando la app igual');
      setSessionChecked(true);
    }, 1500);

    supabase.auth.getSession().then(({ data }) => {
      clearTimeout(sessionCheckTimeout);
      console.log('[auth] getSession() resolvió:', data.session ? `sesión de ${data.session.user.email}` : 'sin sesión');
      setSession(data.session);
      setSessionChecked(true);
      if (data.session?.user) void syncProfile(data.session.user);
      if (data.session?.user) void reconcilePushSubscription(data.session.user);
    }).catch((err) => {
      clearTimeout(sessionCheckTimeout);
      console.error('[auth] error obteniendo la sesión:', err);
      setSessionChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      console.log('[auth] onAuthStateChange:', event, nextSession ? `sesión de ${nextSession.user.email}` : 'sin sesión');
      setSession(nextSession);
      setSessionChecked(true);
      if (nextSession?.user) {
        void syncProfile(nextSession.user);
        if (event === 'SIGNED_IN') void reconcilePushSubscription(nextSession.user);
      } else {
        setFullName(null);
      }
    });

    return () => {
      clearTimeout(sessionCheckTimeout);
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setInstallPlatform(detectInstallPlatform());
    setStandalone(isRunningStandalone());
    setInstallPromptAvailable(hasNativeInstallPrompt());
    return listenForPwaInstallation(({ installed, promptAvailable, standalone: nextStandalone }) => {
      setInstallPromptAvailable(promptAvailable);
      const isInstalled = nextStandalone || installed;
      setStandalone(isInstalled);
      if (isInstalled) setInstallOpen(false);
    });
  }, []);

  useEffect(() => {
    if (!session?.user || pendingDeliveryId || standalone || installDismissed) return;
    setInstallOpen(true);
  }, [session?.user, standalone, pendingDeliveryId, installDismissed]);

  // Nota: la animación de entrada de las MagicCard ya se maneja adentro del
  // propio componente (app/components/magic-ui.tsx, un IntersectionObserver
  // por card, así funciona sin importar en qué pantalla/momento se monten).
  // Este efecto adicional barre el DOM completo por si queda alguna
  // .magic-card fuera de ese mecanismo — es un refuerzo, no la fuente real.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
            console.log('ANIMACIÓN APLICADA a card:', entry.target.querySelector('h3')?.textContent);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('.magic-card').forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    supabase
      .from('content_items')
      .select('id,title,body,metadata,content_assets(asset_type,source_url,storage_path,duration_seconds,sort_order)')
      .eq('is_published', true)
      .eq('content_type', 'moment')
      .then(({ data, error }) => {
        if (error) { console.error('[moments] error cargando content_items:', error); return; }
        const rows = [...(data || [])].sort((a, b) => Number((a.metadata as Record<string, unknown> | null)?.sort_order || 0) - Number((b.metadata as Record<string, unknown> | null)?.sort_order || 0));
        setMomentNodes(rows.map((row, index) => {
          const assets = Array.isArray(row.content_assets) ? row.content_assets as Array<{ asset_type?: string; source_url?: string; storage_path?: string; duration_seconds?: number; sort_order?: number }> : [];
          const asset = assets.filter((item) => item.asset_type === 'audio').sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))[0];
          const audioUrl = asset?.source_url || (asset?.storage_path ? `https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/${asset.storage_path}` : undefined);
          return {
            icon: momentIcons[index] || '✨',
            title: row.title || 'Meditación',
            detail: 'Meditación para este momento.',
            tone: palette[index % palette.length],
            image: `/images/meditacion-${String(index + 1).padStart(2, '0')}.webp`,
            reader: { title: row.title || 'Meditación', eyebrow: 'MEDITACIÓN PARA AHORA', detail: 'Leé la práctica a tu ritmo.', paragraphs: cleanParagraphs(row.body || ''), audioUrl, duration: asset?.duration_seconds ? `${Math.round(asset.duration_seconds / 60)} min` : undefined },
          } as DeckItem;
        }));
      });
  }, []);

  useEffect(() => {
    if (!session?.user || accessState !== 'active') return;
    let cancelled = false;
    setAudiobooksLoading(true);
    setAudiobooksError('');
    (async () => {
      const { data, error } = await supabase
        .from('content_items')
        .select('id,slug,title,excerpt,body,metadata,content_assets(asset_type,source_url,storage_path,duration_seconds,sort_order)')
        .eq('content_type', 'audiobook')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (error) throw error;
      const books = await Promise.all((data || []).map(async (row) => {
        const metadata = row.metadata && typeof row.metadata === 'object' && !Array.isArray(row.metadata) ? row.metadata as Record<string, unknown> : {};
        const chapters = Array.isArray(metadata.chapters)
          ? metadata.chapters.filter((value): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value)).map((chapter, index) => ({
            title: typeof chapter.title === 'string' ? chapter.title : `Sección ${index + 1}`,
            anchor: typeof chapter.anchor === 'string' ? chapter.anchor : `seccion-${index + 1}`,
            order: typeof chapter.order === 'number' ? chapter.order : index + 1,
            page: typeof chapter.page === 'number' ? chapter.page : undefined,
          })).sort((a, b) => a.order - b.order)
          : [];
        const assets = Array.isArray(row.content_assets) ? row.content_assets as Array<{ asset_type?: string; source_url?: string; storage_path?: string; duration_seconds?: number; sort_order?: number }> : [];
        const sortedAssets = [...assets].sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
        const audioAsset = sortedAssets.find((asset) => asset.asset_type === 'audio');
        const pdfAsset = sortedAssets.find((asset) => asset.asset_type === 'document/pdf');
        const resolveAssetUrl = async (asset?: { source_url?: string; storage_path?: string }) => {
          if (!asset) return undefined;
          if (asset.storage_path) {
            const { data: signed, error: signedError } = await supabase.storage.from('audiobooks').createSignedUrl(asset.storage_path, 60 * 60 * 6);
            if (!signedError && signed?.signedUrl) return signed.signedUrl;
          }
          return asset.source_url && !asset.source_url.startsWith('storage://') ? asset.source_url : undefined;
        };
        const [audioUrl, pdfUrl] = await Promise.all([resolveAssetUrl(audioAsset), resolveAssetUrl(pdfAsset)]);
        return {
          id: row.id,
          slug: row.slug || '',
          title: row.title || 'Sin título',
          author: typeof metadata.author === 'string' ? metadata.author : 'Germán González',
          excerpt: row.excerpt || '',
          body: row.body || '',
          chapters,
          audioUrl,
          pdfUrl,
          durationSeconds: audioAsset?.duration_seconds,
        } satisfies AudiobookEntry;
      }));
      if (!cancelled) setAudiobookItems(books);
    })().catch((error: unknown) => {
      console.error('[audiobooks] error cargando contenido:', error);
      if (!cancelled) setAudiobooksError(error instanceof Error ? error.message : 'Error inesperado.');
    }).finally(() => { if (!cancelled) setAudiobooksLoading(false); });
    return () => { cancelled = true; };
  }, [accessState, session?.user]);

  useEffect(() => {
    supabase
      .from('content_items')
      .select('*,content_assets(asset_type,source_url,storage_path,duration_seconds,sort_order)')
      .eq('is_published', true)
      .eq('content_type', 'conference')
      .eq('content_assets.asset_type', 'audio')
      .order('published_at', { ascending: false })
      .limit(250)
      .then(({ data, error }) => {
        if (error) { console.error('[library] error cargando content_items:', error); return; }
        if (!data) return;
        setLibraryItems(data.map((value) => {
          const item = value as Record<string, unknown>;
          const assets = Array.isArray(item.content_assets) ? item.content_assets as Record<string, unknown>[] : [];
          const asset = assets.sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))[0];
          const source = firstText(asset || item, ['source_url', 'audio_url', 'audioUrl', 'media_url', 'mediaUrl', 'file_url', 'fileUrl']);
          const path = firstText(asset || item, ['audio_path', 'audioPath', 'storage_path', 'storagePath']);
          const bucket = firstText(item, ['audio_bucket', 'audioBucket', 'bucket']) || 'audios';
          const audioUrl = source || (path ? `https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/${bucket}/${path}` : undefined);
          const durationSeconds = typeof asset?.duration_seconds === 'number' ? asset.duration_seconds : undefined;
          return {
            id: String(item.id),
            title: firstText(item, ['title', 'name']) || 'Sin título',
            excerpt: firstText(item, ['excerpt', 'description', 'summary']) || '',
            body: firstText(item, ['body', 'content', 'text']) || '',
            type: firstText(item, ['content_type', 'type', 'category']) || 'Contenido',
            tags: toTags(item.tags || item.tag_list || item.labels || item.topics),
            audioUrl,
            duration: durationSeconds ? `${Math.round(durationSeconds / 60)} min` : firstText(item, ['duration', 'audio_duration']),
            year: extractConferenceYear(item),
          };
        }));
      }, (err: unknown) => console.error('[library] excepción cargando content_items:', err));
  }, []);

  // Deep link desde una notificación push (sw.js abre /?delivery=<id>): en
  // cuanto haya sesión, buscamos esa entrega puntual y vamos directo al
  // Reader, saltando el carrusel de bienvenida.
  useEffect(() => {
    if (!session?.user || accessState !== 'active' || !pendingDeliveryId) return;
    let cancelled = false;
    (async () => {
      const deliveryId = pendingDeliveryId;
      let openedSuccessfully = false;
      const showDeliveryError = (reason: string) => {
        console.error('[deep-link] entrega no disponible:', { deliveryId, reason });
        setMainMenu(false);
        setReader({
          title: 'No pudimos abrir este mensaje',
          eyebrow: 'PRÁCTICA GUIADA',
          detail: 'La entrega quedó identificada para que podamos revisarla.',
          paragraphs: [reason, `Referencia de entrega: ${deliveryId}`],
        });
      };
      try {
        console.log('[deep-link] abriendo entrega', deliveryId);
        const { data: row, error } = await supabase
          .from('taller_deliveries')
          .select('id,day_number,delivery_type,delivered_at,seen_at,message_index,content_items(title,body),content_assets(source_url)')
          .eq('id', deliveryId)
          .maybeSingle();
        if (cancelled) return;
        if (error || !row) {
          showDeliveryError(error ? `No se pudo consultar la entrega: ${error.message}` : 'La entrega no existe o no está disponible para esta cuenta.');
          return;
        }
        const item = row.content_items as unknown as { title: string; body: string } | null;
        const asset = row.content_assets as unknown as { source_url: string } | null;
        const deliveryType = row.delivery_type as TallerDeliveryType;
        const body = item?.body || '';
        const paragraphs = extractDeliveryParagraphs(body, deliveryType, row.message_index);
        if (!item?.body) {
          showDeliveryError('La entrega no tiene contenido asociado.');
          return;
        }
        if (!paragraphs?.length) {
          const messageReference = deliveryType === 'intermediate_message'
            ? ` No se encontró el mensaje numerado ${row.message_index ?? 'sin índice'} en el contenido del Día ${row.day_number}.`
            : ` No se encontró la sección correspondiente a ${deliveryTypeLabels[deliveryType]}.`;
          showDeliveryError(`El contenido existe, pero no pudimos extraerlo.${messageReference}`);
          return;
        }
        setMainMenu(false);
        setReader({
          title: `Día ${row.day_number} · ${deliveryTypeLabels[deliveryType]}`,
          eyebrow: 'PRÁCTICA GUIADA',
          detail: `Recibido ${formatDeliveredAt(row.delivered_at)}.`,
          paragraphs,
          audioUrl: asset?.source_url,
        });
        openedSuccessfully = true;
        if (!row.seen_at) {
          const { error: seenError } = await supabase.from('taller_deliveries').update({ seen_at: new Date().toISOString() }).eq('id', row.id);
          if (seenError) console.error('[deep-link] no se pudo marcar seen_at:', seenError);
        }
      } catch (err) {
        if (!cancelled) showDeliveryError(err instanceof Error ? `Ocurrió un error al abrir la entrega: ${err.message}` : 'Ocurrió un error inesperado al abrir la entrega.');
      } finally {
        if (!cancelled) {
          setPendingDeliveryId(null);
          if (openedSuccessfully && typeof window !== 'undefined') window.history.replaceState({}, '', window.location.pathname);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [session?.user, accessState, pendingDeliveryId]);

  // Esperamos a saber si hay sesión antes de decidir la siguiente pantalla
  // (para no mostrar LoginGate de arranque si en realidad hay sesión) —
  // pero esto no afecta si se muestra el video: callback de OAuth y deep-link
  // de entrega lo saltean desde el estado inicial.
  if (!sessionChecked) return null;
  if (showVideo && !getDeliveryIdFromUrl() && !pendingDeliveryId) return <VideoIntro onFinish={() => setShowVideo(false)} />;
  if (!session) return <LoginGate />;
  if (accessState === 'checking') return <main className="app-shell app-main section-app"><div className="access-loading" role="status" aria-live="polite">Cargando tu espacio…</div></main>;
  if (accessState === 'error') return <main className="app-shell app-main section-app"><div className="access-loading"><p>No pudimos comprobar tu acceso.</p><button type="button" onClick={() => window.location.reload()}>Reintentar</button></div></main>;
  if (accessState === 'inactive') return null;
  const dock = <MainNavigationDock current={mainMenu ? "home" : configurationOpen ? "configuracion" : tab} onSelect={navigateTo} />;

  if (mainMenu) {
    const courseCard = { target: 'curso' as const, title: 'Taller de 365 días', detail: 'Ley de Asunción · recorrido completo.', image: '/images/german-reunion.webp' };
    const interactiveBookCard = { target: 'libro-interactivo' as const, title: 'La vida se ensaya por dentro', detail: 'Libro interactivo.', image: '/images/la-vida-se-ensaya-card.png' };
    const welcomeItems = mainCategories.map(([target, , title, detail]) => ({ target, title, detail, image: target === 'espacio' ? '/images/german-perfil.png' : target === 'biblioteca' ? '/images/german-biblioteca.png' : target === 'audiolibros' ? '/images/german-audiolibros.webp' : target === 'talleres' ? '/images/german-practicas.webp' : target === 'propia' ? '/images/german-propia.webp' : target === 'meditaciones' ? '/images/german-meditaciones.webp' : target === 'consultas' ? '/images/german-consultas.webp' : undefined }));
    const audiobooksIndex = welcomeItems.findIndex((item) => item.target === 'audiolibros');
    const withBook = [...welcomeItems.slice(0, audiobooksIndex + 1), interactiveBookCard, ...welcomeItems.slice(audiobooksIndex + 1)];
    const meditIndex = withBook.findIndex((item) => item.target === 'meditaciones');
    const items = [...withBook.slice(0, meditIndex + 1), courseCard, ...withBook.slice(meditIndex + 1)];
    return <><main className="app-shell app-main section-app day-one-screen welcome-carousel-screen"><section className="day-one-section"><header className="assistant-welcome">{fullName ? <p>Hola, {fullName}</p> : null}<h1>¿Por dónde<strong>empezamos?</strong></h1></header><DayOneCarousel autoPlay={false} label="Secciones de Germán Asistente" items={items} initialIndex={mainCardIndexRef.current} onIndexChange={(index) => { mainCardIndexRef.current = index; }} onSelect={(item, index) => { mainCardIndexRef.current = index; if (item.target === 'curso') { setCourseOpen(true); setMainMenu(false); return; } if (item.target === 'libro-interactivo') { setInteractiveBookOpen(true); setMainMenu(false); return; } setTab(item.target); setTrail([]); setReader(null); setMainMenu(false); }} /></section>{dock}</main>{installOpen && !standalone && !pendingDeliveryId && <InstallOnboarding suggestedPlatform={installPlatform} nativePromptAvailable={installPromptAvailable} onClose={() => { setInstallOpen(false); setInstallDismissed(true); }} onInstallAndroid={promptNativeInstallation} onRecheckInstallation={() => { const installed = isRunningStandalone(); setStandalone(installed); return installed; }} />}</>;
  }
  if (interactiveBookOpen) return <main className="app-shell app-main section-app"><InteractiveBookIntro onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (courseOpen) return <main className="app-shell app-main section-app"><LawCoursePanel user={session.user} onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (accountOpen && session?.user) return <main className="app-shell app-main section-app"><AccountPanel user={session.user} fullName={fullName} onBack={back} onNavigate={navigateTo} onNameSaved={setFullName} onLogout={logout} />{dock}</main>;
  if (selectedAudiobook) return <main className="app-shell app-main section-app"><AudiobookReader book={selectedAudiobook} onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (reader) { const favorite = deckFavorite({ icon: '📖', title: reader.title, detail: reader.detail, tone: palette[0], reader }); return <main className="app-shell app-main section-app"><Reader content={reader} onBack={back} onNavigate={navigateTo} favorite={favorites.some((item) => item.title === reader.title)} onFavorite={() => { const exact = favorites.find((item) => item.title === reader.title); toggleFavorite(exact || favorite); }} />{dock}</main>; }
  if (favoritesOpen) return <main className="app-shell app-main section-app"><FavoritesPanel favorites={favorites} onBack={back} onNavigate={navigateTo} onOpen={(favorite) => { if (favorite.reader) setReader(favorite.reader); }} onRemove={toggleFavorite} />{dock}</main>;
  if (workshopOpen) return <main className="app-shell app-main section-app"><WorkshopPanel user={session.user} program={programConfig} onBack={back} onNavigate={navigateTo} onRead={setReader} />{dock}</main>;
  if (notificationsOpen) return <main className="app-shell app-main section-app"><NotificationsPanel user={session.user} onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (configurationOpen) return <main className="app-shell app-main section-app"><ConfigurationPanel user={session.user} onBack={back} onNavigate={navigateTo} onOpenNotifications={() => setNotificationsOpen(true)} />{dock}</main>;
  if (preguntameOpen) return <main className="app-shell app-main section-app preguntame-shell"><PreguntamePanel onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (tab === 'audiolibros' && !trail.length) {
    return <main className="app-shell app-main section-app"><AudiobookLibraryPanel entries={audiobookItems} loading={audiobooksLoading} error={audiobooksError} onBack={back} onNavigate={navigateTo} onOpen={setSelectedAudiobook} />{dock}</main>;
  }
  if (tab === 'biblioteca' && !trail.length) return <main className="app-shell app-main section-app"><LibraryPanel entries={libraryItems} onBack={back} onNavigate={navigateTo} favorites={favorites} onToggleFavorite={toggleFavorite} onRead={(entry, searchQuery) => setReader({ title: entry.title, eyebrow: entry.type.toUpperCase(), detail: entry.excerpt || 'Biblioteca', paragraphs: cleanParagraphs(entry.body || entry.excerpt || ''), audioUrl: entry.audioUrl, duration: entry.duration, highlightQuery: searchQuery })} />{dock}</main>;
  if (tab === 'espacio' && !trail.length) return <main className="app-shell app-main section-app"><ProfileScreen user={session.user} items={screens.espacio.items} showInstall={!standalone} onInstall={() => { setInstallDismissed(false); setInstallOpen(true); }} onSelect={select} onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (tab === 'propia' && !trail.length) return <main className="app-shell app-main section-app"><PropiaPracticaPanel user={session.user} onBack={back} onNavigate={navigateTo} onRead={setReader} />{dock}</main>;
  if (current?.title === 'Día 1') {
    const carouselKey = `${tab}-${trail.map((item) => item.title).join('/')}-dia1`;
    return <main className="app-shell app-main section-app day-one-screen"><section className="day-one-section"><FixedHeader eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} onBack={back} onNavigate={navigateTo} /><DayOneCarousel key={carouselKey} items={screen.items} initialIndex={carouselIndicesRef.current[carouselKey] ?? 0} onIndexChange={(index) => { carouselIndicesRef.current[carouselKey] = index; }} onSelect={(item, index) => { carouselIndicesRef.current[carouselKey] = index; select(item); }} isFavorite={(item) => item.reader ? favorites.some((favorite) => favorite.id === deckFavorite(item).id) : undefined} onFavorite={(item) => toggleFavorite(deckFavorite(item))} /></section>{dock}</main>;
  }
  const carouselKey = `${tab}-${trail.map((item) => item.title).join('/')}`;
  // Estas pantallas tienen fotos reales de fondo (a diferencia del resto de
  // las pantallas internas, que siguen con ícono chico + texto arriba):
  // Prácticas guiadas, su sub-deck de 7 días, y Consultas.
  const photoCardsScreen = (tab === 'talleres' && trail.length === 0)
    || (tab === 'talleres' && trail.length === 1 && trail[0].title === 'Prácticas de 7 días')
    || (tab === 'consultas' && trail.length === 0)
    || (tab === 'meditaciones' && trail.length === 0);
  // "Meditaciones para ahora" ya trae su propia imagen en cada DeckItem
  // (momentNodes, asignada por posición 1..15), así que no se pisa acá.
  const meditacionesPhotoScreen = tab === 'meditaciones' && trail.length === 0;
  return <main className={`app-shell app-main section-app day-one-screen${photoCardsScreen ? ' photo-cards-screen' : ''}${meditacionesPhotoScreen ? ' meditaciones-photo-screen' : ''}`}><section className="day-one-section"><FixedHeader eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} onBack={back} onNavigate={navigateTo} /><DayOneCarousel key={carouselKey} label={screen.title} items={screen.items.map((item) => item.accountPanel ? { ...item, image: '/images/mi-cuenta-acceso.webp' } : item.title === 'Favoritos' ? { ...item, image: '/images/favoritos-guardados.webp' } : item.title === 'Mi avance' ? { ...item, image: '/images/mi-avance-progreso.webp' } : item.title === 'Configuración' ? { ...item, image: '/images/configuracion-horarios-zona.webp' } : item.title === 'Activar notificaciones' ? { ...item, image: '/images/activar-notificaciones.webp' } : item.title === 'Horarios de práctica' ? { ...item, image: '/images/horarios-practica.webp' } : item.title === 'Preferencias' ? { ...item, image: '/images/preferencias-avisos.webp' } : item.title === 'Prácticas de 7 días' ? { ...item, image: '/images/interno-7dias.webp' } : item.title === 'Prácticas de 15 días' ? { ...item, image: '/images/interno-15dias.webp' } : item.title === 'Prácticas de 40 días' ? { ...item, image: '/images/interno-40dias.webp' } : item.title === 'Amor y relaciones' ? { ...item, image: '/images/interno-amor.webp' } : item.title === 'Dinero y trabajo' ? { ...item, image: '/images/interno-dinero.webp' } : item.title === 'Salud y bienestar' ? { ...item, image: '/images/interno-salud.webp' } : item.title === 'Preguntar' ? { ...item, image: '/images/interno-preguntar.webp' } : item.title === 'Escuchar' ? { ...item, image: '/images/interno-escuchar.webp' } : item.title === 'Guardadas' ? { ...item, image: '/images/interno-guardadas.webp' } : item)} initialIndex={carouselIndicesRef.current[carouselKey] ?? 0} onIndexChange={(index) => { carouselIndicesRef.current[carouselKey] = index; }} onSelect={(item, index) => { carouselIndicesRef.current[carouselKey] = index; select(item); }} isFavorite={(item) => item.reader ? favorites.some((favorite) => favorite.id === deckFavorite(item).id) : undefined} onFavorite={(item) => toggleFavorite(deckFavorite(item))} /></section>{dock}</main>;
}
