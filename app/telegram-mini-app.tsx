'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Settings2, MessageCircle, SlidersHorizontal, Route, Sun, Moon, X, Sparkles, BookOpen, ChevronRight, ChevronLeft, ChevronDown, Heart, LogOut, Pause, Play, Search, Trash2, Check, ArrowRight, ArrowUp, House, Lock, Mic, Square } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Home01Icon,
  MessageCircleIcon,
  Route01Icon,
  Settings02Icon,
  SlidersHorizontalIcon as HugeSlidersHorizontalIcon,
} from '@hugeicons/core-free-icons';
import { supabase } from './lib/supabase';
import { MagicCard, ShimmerButton } from './components/magic-ui';
import './magic-ui.css';
import './modern-ui.css';
import './components/day-one-carousel.css';
import { DayOneCarousel } from './components/day-one-carousel';
import { TimePicker } from './components/time-picker';
import { TimezonePicker } from './components/timezone-picker';
import FluidTabs from './components/sona/fluid-tabs';
import { AnimatedDialog, AnimatedDialogContent, AnimatedDialogTitle, AnimatedDialogDescription, AnimatedDialogClose } from './components/sona/animated-dialog';
import AnimatedSwitch from './components/sona/animated-switch';
import FolderFloat from './components/FolderFloat/FolderFloat';
import BranchedMenu from './components/BranchedMenu';
import './components/sona/sona.css';
import './premium-mobile.css';
import { LoginGate } from './components/login-gate';
import { AccessPaywall } from './components/access-paywall';
import { resolveScreen } from './lib/screen';
import { isLaunchPending, LaunchDateCard, TrialEndedScreen, type LaunchArea } from './components/launch-widgets';
import { AudioWaveLoader } from './components/audio-wave-loader';
import { AnimatedInterfaceIcon, type AnimatedInterfaceIconName } from './components/animated-interface-icon';
import { deliveryTypeLabels, extractDeliveryParagraphs, formatDeliveredAt, INTERMEDIATE_MESSAGE_TITLE, userFacingDeliveryTitle, type TallerDeliveryType } from './lib/taller-delivery';

type Tab = 'talleres' | 'propia' | 'meditaciones' | 'biblioteca' | 'audiolibros' | 'consultas' | 'espacio';
type ReaderContent = { title: string; eyebrow: string; detail: string; paragraphs: string[]; audioUrl?: string; duration?: string; audios?: { label: string; url: string }[]; highlightQuery?: string };
type ProgramPanelConfig = { slug: string; title: string; subtitle: string };
type DeckItem = { icon: string; title: string; detail: string; renewal?: string; tone: string; image?: string; imageSize?: 'compact'; disabled?: boolean; availability?: boolean; audioCue?: boolean; children?: DeckItem[]; reader?: ReaderContent; launchArea?: LaunchArea; notificationPanel?: boolean; accountPanel?: boolean; workshopPanel?: boolean; programPanel?: ProgramPanelConfig; action?: 'logout' };
type LibraryEntry = { id: string; title: string; excerpt: string; body: string; type: string; tags: string[]; audioUrl?: string; duration?: string; year?: number };
type AudiobookChapter = { title: string; anchor: string; order: number; page?: number };
type AudiobookEntry = { id: string; slug: string; title: string; author: string; excerpt: string; body: string; chapters: AudiobookChapter[]; audioUrl?: string; pdfUrl?: string; durationSeconds?: number; sourcePath?: string };
type FavoriteRecord = { id: string; title: string; detail: string; icon: string; tone: string; reader?: ReaderContent };
type Screen = { eyebrow: string; title: string; subtitle: string; items: DeckItem[] };
type TallerDelivery = { id: string; dayNumber: number; deliveryType: TallerDeliveryType; deliveredAt: string; seenAt: string | null; title: string; paragraphs: string[]; audioUrl?: string };
type WorkshopSchedule = { morning: string; noon: string; afternoon: string; night: string };
type SectionPermissionKey = 'books' | 'course365' | 'consultations';
type AccessPermissions = Partial<Record<'all' | SectionPermissionKey, boolean>>;

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
const touchContentProgress = (userId: string, contentKey: string, contentType: string, progress: Record<string, unknown> = {}) => { void supabase.from('user_content_progress').upsert({ user_id: userId, content_key: contentKey, content_type: contentType, progress, last_opened_at: new Date().toISOString(), updated_at: new Date().toISOString() }, { onConflict: 'user_id,content_key' }).then(({ error }) => { if (error) console.error('[progress] sync error:', error); }); };

const MEDITATION_IMAGE_VERSION = '20260924-1';

const momentIcons = ['🎯', '🌬️', '🌙', '💬', '📰', '🧭', '🤍', '🌧️', '🎤', '🫶', '☀️', '🌆', '🛡️', '🙏', '✨'] as const;

const buildScreens = (momentNodes: DeckItem[]): Record<Tab, Screen> => ({
  talleres: { eyebrow: 'PRÁCTICAS GUIADAS', title: 'Elegí una práctica', subtitle: 'Recorridos preparados para acompañarte paso a paso.', items: [
    { icon: '🌱', title: 'Práctica de 7 días', detail: 'Intensidad directa · breve y al grano.', tone: palette[0], programPanel: { slug: 'practica-guiada-7-dias', title: 'Práctica guiada de 7 días', subtitle: 'Autoconcepto · intensidad directa.' } },
    { icon: '🌿', title: 'Práctica de 15 días', detail: 'Intensidad intermedia · soltar espera, duda y control.', tone: palette[1], programPanel: { slug: 'practica-guiada-15-dias', title: 'Práctica guiada de 15 días', subtitle: 'Autoconcepto · intensidad intermedia.' } },
    { icon: '🌳', title: 'Prácticas de 40 días', detail: 'Recorrido completo · autoconcepto y control de la imaginación.', tone: palette[3], programPanel: { slug: 'taller-40-dias', title: 'Taller de 40 días', subtitle: 'Autoconcepto · recorrido completo y profundo.' } },
  ] },
  // "Tu propia práctica" ya no es un deck navegable: es un formulario único
  // (PropiaPracticaPanel) que intercepta la pestaña 'propia' directamente.
  propia: { eyebrow: 'TU PROPIA PRÁCTICA', title: 'Creá tu recorrido', subtitle: 'Elegí qué querés trabajar y cómo querés hacerlo.', items: [] },
  meditaciones: { eyebrow: 'MEDITACIONES', title: '¿Qué necesitás ahora?', subtitle: 'Elegí el momento y abrí directamente la práctica.', items: momentNodes },
  biblioteca: { eyebrow: 'PARA ESCUCHAR Y LEER', title: 'Tu biblioteca', subtitle: 'Contenido organizado por formato.', items: [
    { icon: '🎧', title: 'Meditaciones', detail: 'Prácticas disponibles para escuchar.', tone: palette[0], children: momentNodes },
    { icon: '📖', title: 'Lecturas', detail: 'Lecturas y textos de la biblioteca.', tone: palette[1], children: [] },
    { icon: '🎙️', title: 'Conferencias', detail: 'Contenido pendiente de conectar.', tone: palette[2] },
  ] },
  audiolibros: { eyebrow: 'AUDIOLIBROS DE GERMÁN', title: 'Libros para escuchar', subtitle: 'Audiolibros narrados por Germán.', items: [] },
  consultas: { eyebrow: 'CONSULTAS', title: 'Hablemos de lo que te pasa', subtitle: 'Contame qué te está pasando.', items: [] },
  espacio: { eyebrow: 'MI PERFIL', title: 'Tu espacio', subtitle: 'Tu cuenta y tus elecciones.', items: [
    { icon: '👤', title: 'Mi cuenta', detail: 'Nombre, mail y acceso.', tone: palette[0], accountPanel: true },
    { icon: '⭐', title: 'Favoritos', detail: 'Prácticas, audios y lecturas guardadas.', tone: palette[1] },
    { icon: '📈', title: 'Estado', detail: 'Tu avance y compromiso en las prácticas guiadas.', tone: palette[2] },
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

const renewalCopyByTarget: Partial<Record<NavTarget, string>> = {
  biblioteca: 'Contenido en renovación permanente · nuevo material todos los meses.',
  audiolibros: 'Contenido en renovación permanente · 5 libros nuevos de Germán todos los meses.',
  talleres: 'Contenido en renovación permanente · nuevos planes todos los meses.',
  propia: 'Contenido en renovación permanente · nuevas prácticas todos los meses.',
  meditaciones: 'Contenido en renovación permanente · nuevas meditaciones y situaciones todos los meses.',
  curso: 'Contenido en renovación permanente · nuevos audios y material durante el recorrido.',
};

function CategoryIcon({ item }: { item: DeckItem }) {
  const title = item.title.toLowerCase();
  const animatedIcon: AnimatedInterfaceIconName | null = /perfil|cuenta/.test(title) ? 'profile'
    : /horario/.test(title) ? 'calendar'
    : /notifica/.test(title) ? 'notification'
    : /favorito|guardad/.test(title) ? 'bookmark'
    : /avance|progreso/.test(title) ? 'history'
    : /biblioteca|lectura|leer/.test(title) ? 'open-door'
    : /medita/.test(title) ? 'brain'
    : /audio|escuchar/.test(title) ? 'ear'
    : null;
  if (animatedIcon) return <AnimatedInterfaceIcon name={animatedIcon} size={30} />;
  const hugeIcon = /configura|preferencia/.test(title) ? Settings02Icon
    : /consulta|pregunt|respuesta/.test(title) ? MessageCircleIcon
    : /propia/.test(title) ? HugeSlidersHorizontalIcon
    : /día|recorrido|práctica/.test(title) ? Route01Icon
    : null;
  if (hugeIcon === Route01Icon) return <MotionIcon name="route" size={30}><HugeiconsIcon icon={hugeIcon} size={30} strokeWidth={1.6} /></MotionIcon>;
  if (hugeIcon === HugeSlidersHorizontalIcon) return <MotionIcon name="sliders" size={30}><HugeiconsIcon icon={hugeIcon} size={30} strokeWidth={1.6} /></MotionIcon>;
  if (hugeIcon === MessageCircleIcon) return <MotionIcon name="message" size={30}><HugeiconsIcon icon={hugeIcon} size={30} strokeWidth={1.6} /></MotionIcon>;
  if (hugeIcon === Settings02Icon) return <MotionIcon name="settings" size={30}><HugeiconsIcon icon={hugeIcon} size={30} strokeWidth={1.6} /></MotionIcon>;
  if (hugeIcon) return <HugeiconsIcon icon={hugeIcon} size={30} strokeWidth={1.6} aria-hidden="true" />;
  const FallbackIcon = /noche/.test(title) ? Moon : /mañana/.test(title) ? Sun : item.reader ? BookOpen : Sparkles;
  return <FallbackIcon size={30} strokeWidth={1.6} aria-hidden="true" />;
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

function PreguntamePanel({ user, onBack, onNavigate }: { user: User; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const [prompt, setPrompt] = useState('');
  const [listening, setListening] = useState(false);
  const [working, setWorking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [notice, setNotice] = useState('');
  // Antes del lanzamiento no se muestra el composer ni se graba/transcribe/guarda nada.
  const consultasLaunchPending = isLaunchPending('consultas');
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
    if (consultasLaunchPending) return;
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

  const submit = async () => {
    const question = prompt.trim();
    if (!question || working) return;
    // Defensa extra: antes del lanzamiento no hay composer y nada se guarda ni procesa.
    if (consultasLaunchPending) return;
    setWorking(true); setElapsed(0); setNotice('');
    timerRef.current = setInterval(() => setElapsed((value) => value + 1), 1000);
    const { error } = await supabase.from('user_consultations').insert({ user_id: user.id, question, source: 'text', status: 'pending' });
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null; setWorking(false);
    if (error) { setNotice(`No pudimos guardar tu consulta: ${error.message}`); return; }
    setPrompt('');
    setNotice('Consulta guardada en tu cuenta.');
  };

  return <section className="preguntame-panel">
    <FixedHeader eyebrow="PREGUNTAME" title="¿Qué te está pasando?" subtitle="Escribilo o decímelo con tu voz." onBack={onBack} onNavigate={onNavigate} />
    <div className={`preguntame-stage${consultasLaunchPending ? ' is-launch-pending' : ''}`}>
      <div className="preguntame-copy"><span>GERMÁN</span><h2>Contame.</h2><p>No hace falta que armes bien la pregunta. Decime qué te pasa como te salga.</p></div>
      {consultasLaunchPending
        ? <div className="preguntame-launch-card"><LaunchDateCard /></div>
        : <>
        {working && <div className="lattice-loader" role="status" aria-live="polite"><span className="lattice-grid">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</span><p>Buscando la mejor respuesta… <small>{elapsed}s</small></p></div>}
        <div className={`prompt-bar${listening ? ' is-listening' : ''}`}>
          <textarea ref={promptRef} value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit(); } }} rows={1} placeholder="Preguntame lo que quieras…" aria-label="Tu pregunta" />
          <div className="prompt-actions"><button type="button" className="prompt-mic" onClick={toggleVoice} aria-label={listening ? 'Detener dictado' : 'Dictar pregunta'}>{listening ? <Square size={16} fill="currentColor" /> : <Mic size={20} />}</button><button type="button" className="prompt-send" disabled={!prompt.trim() || working} onClick={submit} aria-label="Enviar pregunta"><ArrowUp size={20} strokeWidth={2.5} /></button></div>
        </div>
        {notice && <p className="preguntame-notice">{notice}</p>}
        <div className="preguntame-suggestions"><button onClick={() => setPrompt('No puedo dejar de pensar en algo que pasó')}>No puedo dejar de pensar</button><button onClick={() => setPrompt('Tengo miedo de que algo salga mal')}>Tengo miedo</button><button onClick={() => setPrompt('¿Cómo vuelvo a sentirme seguro?')}>Quiero sentirme seguro</button></div>
        </>}
    </div>
  </section>;
}

type NavTarget = 'home' | 'favorites' | 'biblioteca' | 'audiolibros' | 'meditaciones' | 'talleres' | 'propia' | 'consultas' | 'curso' | 'espacio' | 'configuracion' | 'notificaciones';

function MotionIcon({ children, name, size = 21 }: { children: ReactNode; name: 'home' | 'route' | 'sliders' | 'message' | 'settings'; size?: number }) {
  return <span className={`motion-icon motion-icon--${name}`} style={{ width: size, height: size }} aria-hidden="true">{children}</span>;
}

const navMenuItems: { target: NavTarget; icon: ReactNode; label: string }[] = [
  { target: 'home', icon: <MotionIcon name="home"><HugeiconsIcon icon={Home01Icon} size={21} strokeWidth={1.8} /></MotionIcon>, label: 'Inicio' },
  { target: 'talleres', icon: <MotionIcon name="route"><HugeiconsIcon icon={Route01Icon} size={21} strokeWidth={1.8} /></MotionIcon>, label: 'Prácticas guiadas' },
  { target: 'propia', icon: <MotionIcon name="sliders"><HugeiconsIcon icon={HugeSlidersHorizontalIcon} size={21} strokeWidth={1.8} /></MotionIcon>, label: 'Tu propia práctica' },
  { target: 'meditaciones', icon: <AnimatedInterfaceIcon name="brain" size={21} />, label: 'Meditaciones' },
  { target: 'biblioteca', icon: <AnimatedInterfaceIcon name="open-door" size={21} />, label: 'Biblioteca' },
  { target: 'audiolibros', icon: <AnimatedInterfaceIcon name="ear" size={21} />, label: 'Audiolibros de Germán' },
  { target: 'consultas', icon: <MotionIcon name="message"><HugeiconsIcon icon={MessageCircleIcon} size={21} strokeWidth={1.8} /></MotionIcon>, label: 'Consultas' },
  { target: 'curso', icon: <AnimatedInterfaceIcon name="calendar" size={21} />, label: 'Taller de 365 días' },
  { target: 'espacio', icon: <AnimatedInterfaceIcon name="profile" size={21} />, label: 'Mi perfil' },
  { target: 'favorites', icon: <AnimatedInterfaceIcon name="bookmark" size={21} />, label: 'Favoritos' },
  { target: 'notificaciones', icon: <AnimatedInterfaceIcon name="notification" size={21} />, label: 'Notificaciones' },
  { target: 'configuracion', icon: <MotionIcon name="settings"><HugeiconsIcon icon={Settings02Icon} size={21} strokeWidth={1.8} /></MotionIcon>, label: 'Configuración' },
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
    { target: 'home', icon: <MotionIcon name="home"><HugeiconsIcon icon={Home01Icon} size={21} strokeWidth={1.8} /></MotionIcon>, label: 'Inicio' },
    { target: 'talleres', icon: <MotionIcon name="route"><HugeiconsIcon icon={Route01Icon} size={21} strokeWidth={1.8} /></MotionIcon>, label: 'Prácticas' },
    { target: 'meditaciones', icon: <AnimatedInterfaceIcon name="brain" size={21} />, label: 'Meditar' },
    { target: 'biblioteca', icon: <AnimatedInterfaceIcon name="open-door" size={21} />, label: 'Biblioteca' },
    { target: 'espacio', icon: <AnimatedInterfaceIcon name="profile" size={21} />, label: 'Perfil' },
  ];
  return <>
    <nav className="main-navigation-dock" aria-label="Navegación principal">
      {dockItems.map((item) => <button key={item.target} type="button" aria-current={current === item.target ? 'page' : undefined} className={current === item.target ? 'is-current' : ''} onClick={() => onSelect(item.target)}>{item.icon}<span>{item.label}</span></button>)}
      <button type="button" aria-label="Todas las secciones" aria-haspopup="dialog" onClick={() => setMoreOpen(true)}><AnimatedInterfaceIcon name="menu" size={22} /><span>Más</span></button>
    </nav>
    {moreOpen && <NavMenuSheet onSelect={(target) => { setMoreOpen(false); onSelect(target); }} onCancel={() => setMoreOpen(false)} />}
  </>;
}

// Contenido que todavía no se habilita en el lanzamiento (ver LAUNCH_PENDING):
// se muestra su título y, en lugar del contenido real, la tarjeta del 27.
function LaunchPendingPanel({ eyebrow, title, subtitle, onBack, onNavigate }: { eyebrow: string; title: string; subtitle: string; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  return <section className="reader-section">
    <FixedHeader eyebrow={eyebrow} title={title} subtitle={subtitle} onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body"><LaunchDateCard /></div>
  </section>;
}

function FixedHeader({ eyebrow, title, subtitle, onBack, onNavigate }: { eyebrow: string; title: string; subtitle: string; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="feature-header">
    <button type="button" className="header-menu" onClick={() => setMenuOpen(true)} aria-label="Menú" aria-haspopup="dialog"><AnimatedInterfaceIcon name="menu" size={26} /></button>
    <p>{eyebrow}</p><h1>{title}</h1><small>{subtitle}</small>
    <div className="header-top-row">
      <button type="button" className="header-back" onClick={onBack}><ChevronLeft size={22} strokeWidth={2.4} />Volver</button>
    </div>
    {menuOpen && <NavMenuSheet onSelect={(target) => { setMenuOpen(false); onNavigate(target); }} onCancel={() => setMenuOpen(false)} />}
  </header>;
}

function ToggleSwitch({ checked, onChange, disabled, label }: { checked: boolean; onChange: () => void; disabled?: boolean; label: string }) {
  return <AnimatedSwitch checked={checked} onCheckedChange={onChange} disabled={disabled} aria-label={label} enableDrag={false} />;
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
  const [unlockedDay, setUnlockedDay] = useState(0);
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: existing, error: readError } = await supabase.from('law_course_progress').select('started_at').eq('user_id', user.id).maybeSingle();
      if (cancelled) return;
      if (readError) { console.error('[365] error leyendo progreso:', readError); setProgressLoading(false); return; }
      let startedAt = existing?.started_at as string | undefined;
      if (!startedAt) {
        const nowIso = new Date().toISOString();
        const { data: startedRow, error: startError } = await supabase
          .from('law_course_progress')
          .insert({ user_id: user.id, started_at: nowIso, updated_at: nowIso })
          .select('started_at')
          .single();
        if (cancelled) return;
        if (startError) { console.error('[365] error iniciando recorrido:', startError); setProgressLoading(false); return; }
        startedAt = startedRow.started_at as string;
      }
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
    return <section className="reader-section law-course-section">
      <FixedHeader eyebrow="TALLER DE 365 DÍAS" title={`Día ${formatCourseDayLabel(selectedDay)}`} subtitle={dayContent.title || 'Ley de Asunción'} onBack={() => setSelectedDay(null)} onNavigate={onNavigate} />
      <article className="reader-body law-course-day">
        {audioUrl ? <AudioPlayer title={`Día ${formatCourseDayLabel(selectedDay)}${dayContent.title ? ` · ${dayContent.title}` : ''}`} audioUrl={audioUrl} showTitle={false} /> : <div className="law-course-audio-missing"><AnimatedInterfaceIcon name="ear" size={22} /><span>Audio pendiente para este día.</span></div>}
        {dayContent.foundation && <section className="law-course-support-card">
          <small>ESQUEMA DEL DÍA</small>
          <p>{dayContent.foundation}</p>
        </section>}
        {dayContent.exercise && <section className="law-course-support-card law-course-practice-card">
          <small>TRABAJO PRÁCTICO</small>
          <p>{dayContent.exercise}</p>
        </section>}
      </article>
    </section>;
  }

  return <section className="reader-section law-course-section">
    <FixedHeader eyebrow="LEY DE ASUNCIÓN" title="Taller de 365 días" subtitle="365 días para entenderla, practicarla y vivirla." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body law-course-browser">
      <div className="law-course-support-card law-course-intro-card"><small>UN DÍA A LA VEZ</small><p>Este es un taller diario. El Día 1 se habilita cuando empezás el recorrido y, a partir de ahí, se desbloquea un nuevo día por cada día calendario. Los días futuros quedan con candado hasta que llegue su momento.</p></div>
      <div className="law-course-progress-card"><div><span>TU RECORRIDO</span><b>{progressLoading ? 'Cargando…' : unlockedDay ? `Día ${unlockedDay} de 365` : 'Todavía no iniciado'}</b></div><AnimatedInterfaceIcon name="history" size={22} /></div>
      <div className="law-course-chapters">
        {lawCourseChapters.map((chapter) => {
          const expanded = openChapter === chapter.number;
          return <section key={chapter.number} className={`law-course-chapter${expanded ? ' is-open' : ''}`}>
            <button type="button" className="law-course-chapter-toggle" aria-expanded={expanded} onClick={(event) => {
              const section = event.currentTarget.parentElement;
              setOpenChapter(expanded ? null : chapter.number);
              if (!expanded && section) requestAnimationFrame(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }));
            }}>
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

function NotificationsPanel({ onBack, onNavigate }: { onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  return <section className="reader-section profile-section">
    <FixedHeader eyebrow="MI PERFIL" title="Notificaciones" subtitle="Tus avisos llegan por Telegram." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body notification-settings">
      <div className="notification-permission"><AnimatedInterfaceIcon name="notification" size={18} /><strong>Telegram activado</strong></div>
      <p className="notification-help">Las prácticas, meditaciones y mensajes programados se envían a este chat de Telegram aunque la Mini App esté cerrada.</p>
      <p className="notification-help">No hace falta habilitar permisos de notificaciones del navegador. Los horarios se configuran dentro de cada práctica activa.</p>
    </div>
  </section>;
}

function ProfileScreen({ user, items, onSelect, onBack, onNavigate, onOpenProgress }: { user: User; items: DeckItem[]; onSelect: (item: DeckItem) => void; onBack: () => void; onNavigate: (target: NavTarget) => void; onOpenProgress: () => void }) {
  return <section className="reader-section profile-section">
    <FixedHeader eyebrow="MI PERFIL" title="Tu espacio" subtitle="Tu cuenta y tus elecciones." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body profile-folder-stage">
      <FolderFloat
        items={items.map((item) => ({ label: item.title, value: item.title }))}
        label="Perfil"
        sublabel="4 contenidos"
        trigger="click"
        closeOnSelect
        physics
        drift={0.5}
        onSelect={(value) => {
          if (value === 'Estado') { onOpenProgress(); return; }
          const item = items.find((candidate) => candidate.title === value);
          if (item) onSelect(item);
        }}
        folderColor="#3f3f46" frontColor="#52525b" paperColor="#f5f5f5" itemColor="#f5f5f5" itemTextColor="#18181b" labelColor="#f5f5f5"
        width={200} height={148} radius={14} spread={205} lift={52} tilt={8} flapAngle={34} restAngle={16} openDuration={520} stagger={45} bounce={0.3}
      />
    </div>
  </section>;
}

type ProgressDelivery = { enrollment_id: string; day_number: number; delivery_type: TallerDeliveryType; message_index: number | null; delivered_at: string; seen_at: string | null };
type ProgressEnrollment = { id: string; status: 'active' | 'abandoned' | 'completed'; current_day: number; started_at: string; abandoned_at: string | null; completed_at: string | null; custom_config: Record<string, unknown> | null; collections: { title?: string; slug?: string } | null };

function attentionFromDelivery(delivery: ProgressDelivery): 'Bueno' | 'Regular' | 'Malo' {
  if (!delivery.seen_at) return 'Malo';
  const minutes = (new Date(delivery.seen_at).getTime() - new Date(delivery.delivered_at).getTime()) / 60000;
  if (minutes <= 5) return 'Bueno';
  if (minutes <= 15) return 'Regular';
  return 'Malo';
}

function practiceDuration(enrollment: ProgressEnrollment): number {
  const customDuration = typeof enrollment.custom_config?.duracion === 'string' ? enrollment.custom_config.duracion : '';
  const customMatch = customDuration.match(/(7|15|30)/);
  if (customMatch) return Number(customMatch[1]);
  const slug = enrollment.collections?.slug || '';
  if (slug.includes('40')) return 40;
  if (slug.includes('30')) return 30;
  if (slug.includes('15')) return 15;
  if (slug.includes('7')) return 7;
  return Math.max(1, enrollment.current_day);
}

function ProgressScreen({ user, onBack, onNavigate }: { user: User; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const [history, setHistory] = useState<ProgressEnrollment[]>([]);
  const [deliveries, setDeliveries] = useState<ProgressDelivery[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void (async () => {
      const enrollmentsResult = await supabase.from('program_enrollments').select('id,status,current_day,started_at,abandoned_at,completed_at,custom_config,collections(title,slug)').eq('user_id', user.id).order('started_at', { ascending: false });
      if (cancelled) return;
      if (enrollmentsResult.error) console.error('[progress] enrollments:', enrollmentsResult.error);
      const enrollments = (enrollmentsResult.data || []) as unknown as ProgressEnrollment[];
      const active = enrollments.find((enrollment) => enrollment.status === 'active');
      // Sólo las entregas del taller activo, todas: un taller de 40 días
      // supera las 1000 filas que devuelve cada consulta, así que paginamos.
      const activeDeliveries: ProgressDelivery[] = [];
      if (active) {
        const pageSize = 1000;
        for (let from = 0; ; from += pageSize) {
          const { data, error } = await supabase
            .from('taller_deliveries')
            .select('id,enrollment_id,day_number,delivery_type,message_index,delivered_at,seen_at')
            .eq('enrollment_id', active.id)
            .order('delivered_at', { ascending: false })
            .order('id', { ascending: true })
            .range(from, from + pageSize - 1);
          if (cancelled) return;
          if (error) { console.error('[progress] deliveries:', error); break; }
          activeDeliveries.push(...((data || []) as ProgressDelivery[]));
          if (!data || data.length < pageSize) break;
        }
      }
      setHistory(enrollments);
      setDeliveries(activeDeliveries);
      setLoading(false);
    })().catch((error) => {
      if (!cancelled) { console.error('[progress] history:', error); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [user.id]);

  const primaryEnrollment = history.find((enrollment) => enrollment.status === 'active') ?? null;

  const renderPrimaryEnrollment = (enrollment: ProgressEnrollment) => {
    const ownDeliveries = deliveries.filter((delivery) => delivery.enrollment_id === enrollment.id);
    const totalDays = practiceDuration(enrollment);
    const deliveredDay = ownDeliveries.reduce((maxDay, delivery) => Math.max(maxDay, delivery.day_number), 1);
    const displayDay = Math.min(totalDays, deliveredDay);
    const progressPct = Math.min(100, (displayDay / totalDays) * 100);
    const progressLabel = Number.isInteger(progressPct) ? String(progressPct) : progressPct.toFixed(1);
    const openedDeliveries = ownDeliveries.filter((delivery) => Boolean(delivery.seen_at)).length;
    const commitmentPct = ownDeliveries.length ? Math.round((openedDeliveries / ownDeliveries.length) * 100) : 0;
    const commitmentState = commitmentPct >= 67 ? 'Bueno' : commitmentPct >= 34 ? 'Regular' : 'Malo';
    const customTopic = typeof enrollment.custom_config?.tema === 'string' ? enrollment.custom_config.tema : '';
    const customDuration = typeof enrollment.custom_config?.duracion === 'string' ? enrollment.custom_config.duracion : '';
    const title = customTopic ? `${customTopic} · ${customDuration}` : enrollment.collections?.title || 'Práctica';

    return <section className="progress-card progress-card-primary" key={enrollment.id}>
      <div className="progress-primary-heading">
        <p>{title}</p>
        <b>Día {displayDay} de {totalDays}</b>
      </div>
      <div className="progress-pies">
        <div className="progress-metric">
          <div className="progress-pie" style={{ '--progress': `${progressPct * 3.6}deg` } as React.CSSProperties} aria-label={`${progressLabel}% de avance`} />
          <div className="progress-pie-copy"><b>{progressLabel}%</b><small>Avance</small><p>Día {displayDay} de {totalDays}</p></div>
        </div>
        <div className="progress-metric">
          <div className="progress-pie progress-pie-commitment" style={{ '--progress': `${commitmentPct * 3.6}deg` } as React.CSSProperties} aria-label={`${commitmentPct}% de compromiso`} />
          <div className="progress-pie-copy"><b>{commitmentPct}%</b><small>Compromiso</small><p>{openedDeliveries} de {ownDeliveries.length} abiertas · {commitmentState}</p></div>
        </div>
      </div>
      <div className="progress-activity-summary">
        <b>Actividad</b>
        <span>{ownDeliveries.length} {ownDeliveries.length === 1 ? 'entrega recibida' : 'entregas recibidas'} · {openedDeliveries} {openedDeliveries === 1 ? 'abierta' : 'abiertas'}</span>
      </div>
      {ownDeliveries.length > 0 && <details className="progress-delivery-details">
        <summary>Ver detalle de entregas</summary>
        <div className="progress-delivery-history">
          {ownDeliveries.map((delivery, index) => {
            const attention = attentionFromDelivery(delivery);
            const sent = new Date(delivery.delivered_at).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
            const opened = delivery.seen_at ? new Date(delivery.seen_at).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) : 'No abierta';
            const deliveryLabel = delivery.delivery_type === 'intermediate_message'
              ? INTERMEDIATE_MESSAGE_TITLE
              : deliveryTypeLabels[delivery.delivery_type];
            return <div className="progress-delivery-row" key={`${delivery.delivered_at}-${index}`}>
              <div className="progress-delivery-copy">
                <strong>{deliveryLabel}</strong>
                <span>Día {delivery.day_number} · Enviada {sent} · {delivery.seen_at ? `Abierta ${opened}` : 'No abierta'}</span>
              </div>
              <b className={`progress-attention progress-attention-${attention.toLowerCase()}`}>{attention}</b>
            </div>;
          })}
        </div>
      </details>}
    </section>;
  };

  return <section className="reader-section profile-section">
    <FixedHeader eyebrow="MI PERFIL" title="Estado" subtitle="Tu avance y tu compromiso en el taller." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body progress-screen">
      {loading && <p className="library-empty">Cargando tu historial…</p>}
      {!loading && !primaryEnrollment && <p className="library-empty">No tenés un taller activo en este momento.</p>}
      {!loading && primaryEnrollment && renderPrimaryEnrollment(primaryEnrollment)}
    </div>
  </section>;
}

function ConfigurationPanel({ onBack, onNavigate }: { onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  return <section className="reader-section">
    <FixedHeader eyebrow="MI PERFIL" title="Configuración" subtitle="Preferencias de la aplicación." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body configuration-settings">
      <p className="settings-explanation">Las entregas de cada práctica siguen los horarios que elegiste al comenzarla.</p>
    </div>
  </section>;
}

function renderSimpleBold(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((part, index) => part.startsWith('**') && part.endsWith('**')
    ? <strong key={index}>{part.slice(2, -2)}</strong>
    : <span key={index}>{part}</span>)}</>;
}

function Reader({ content: reader, onBack, onNavigate, favorite, onFavorite }: { content: ReaderContent; onBack: () => void; onNavigate: (target: NavTarget) => void; favorite: boolean; onFavorite: () => void }) {
  const libraryMode = reader.eyebrow === 'AUDIO' || reader.eyebrow === 'TEXTO';
  const audioOnly = Boolean(reader.audioUrl || reader.audios?.length);
  return <section className={`reader-section${libraryMode ? ' library-reader-section' : ''}`}><FixedHeader eyebrow={reader.eyebrow} title={reader.title} subtitle={reader.detail} onBack={onBack} onNavigate={onNavigate} /><article className="reader-body"><button className={`reader-favorite${favorite ? ' is-favorite' : ''}`} onClick={onFavorite}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} /></button>{reader.audioUrl && <AudioPlayer title={reader.title} audioUrl={reader.audioUrl} />}{reader.audios?.map((audio) => <AudioPlayer key={audio.label} title={audio.label} audioUrl={audio.url} />)}{!audioOnly && reader.paragraphs.map((paragraph, index) => <p key={index}>{reader.highlightQuery ? highlightText(paragraph, reader.highlightQuery) : renderSimpleBold(paragraph)}</p>)}</article></section>;
}

function AccountPanel({ user, fullName, onBack, onNavigate, onNameSaved, onLogout }: { user: User; fullName: string | null; onBack: () => void; onNavigate: (target: NavTarget) => void; onNameSaved: (name: string) => void; onLogout: () => void }) {
  const [name, setName] = useState(fullName || user.user_metadata?.full_name || '');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
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
      <section className="subscription-card"><p>TU ACCESO</p><b>Habilitado</b><span>El acceso se administra directamente con Germán.</span></section>
      <button className="account-logout" onClick={onLogout}><LogOut size={17} /> Cerrar sesión</button>
    </div>
  </section>;
}

function AudioPlayer({ title, audioUrl, showTitle = true }: { title: string; audioUrl: string; showTitle?: boolean }) {
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
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({ title, artist: 'Germán Asistente', album: 'Biblioteca' });
    navigator.mediaSession.setActionHandler('play', () => { void audioRef.current?.play(); });
    navigator.mediaSession.setActionHandler('pause', () => { audioRef.current?.pause(); });
    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
    };
  }, [title]);
  return <section className={`audio-player-card${showTitle ? '' : ' is-titleless'}`}>
    <audio ref={audioRef} src={audioUrl} preload="metadata" playsInline onPlay={() => { setPlaying(true); (window as Window & { __germanAudioPlaying?: boolean }).__germanAudioPlaying = true; if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing'; }} onPause={() => { setPlaying(false); (window as Window & { __germanAudioPlaying?: boolean }).__germanAudioPlaying = false; if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused'; }} onEnded={() => { setPlaying(false); setProgress(0); (window as Window & { __germanAudioPlaying?: boolean }).__germanAudioPlaying = false; if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'none'; }} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)} onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)} />
    <button type="button" className={`audio-ear-button${playing ? ' is-playing' : ''}`} onClick={() => { void toggle(); }} aria-label={playing ? 'Pausar audio' : 'Escuchar audio'} aria-pressed={playing}>
      <AnimatedInterfaceIcon name="ear" size={28} />
    </button>
    {showTitle && <div className="audio-player-copy"><b>{title}</b></div>}
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
    navigator.mediaSession.setActionHandler('play', () => { void audioRef.current?.play(); });
    navigator.mediaSession.setActionHandler('pause', () => { audioRef.current?.pause(); });
    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
    };
  }, [author, title]);
  return <section className="audiobook-player" aria-label={`Reproductor de ${title}`}>
    <audio
      ref={audioRef}
      src={audioUrl}
      preload="metadata"
      playsInline
      onPlay={() => { setPlaying(true); (window as Window & { __germanAudioPlaying?: boolean }).__germanAudioPlaying = true; if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing'; }}
      onPause={() => { setPlaying(false); (window as Window & { __germanAudioPlaying?: boolean }).__germanAudioPlaying = false; if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused'; }}
      onEnded={() => { setPlaying(false); (window as Window & { __germanAudioPlaying?: boolean }).__germanAudioPlaying = false; if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'none'; }}
      onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : durationSeconds || 0)}
      onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
    />
    <div className="audiobook-player-heading">
      <button type="button" className={`audio-ear-button${playing ? ' is-playing' : ''}`} onClick={() => { void toggle(); }} aria-label={playing ? 'Pausar audiolibro' : 'Reproducir audiolibro'} aria-pressed={playing}>
        <AnimatedInterfaceIcon name="ear" size={30} />
      </button>
      <div><b>{title}</b></div>
    </div>
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

function parseGermanAudiobookMarkdown(markdown: string, chapters: AudiobookChapter[]) {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const matches = [...normalized.matchAll(/^###\s+(.+)\s*$/gm)];
  return matches.map((match, index) => {
    const sourceHeading = (match[1] || '').trim();
    const contentStart = (match.index || 0) + match[0].length;
    const contentEnd = matches[index + 1]?.index ?? normalized.length;
    const raw = normalized
      .slice(contentStart, contentEnd)
      .replace(/^\s*---\s*$/gm, '')
      .replace(/^\s*\*[^*\n]*Un audiobook de German Gonzalez[^*\n]*\*\s*$/gim, '')
      .replace(/^\s*\*Basado en la Ley de Asuncion\.\*\s*$/gim, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .trim();
    const known = chapters[index];
    const fallbackTitle = /^Practica final$/i.test(sourceHeading)
      ? 'Práctica final'
      : sourceHeading.replace(/^Capitulo\s+\d+:\s*/i, '').trim();
    return {
      ...(known ?? {
        title: fallbackTitle || `Sección ${index + 1}`,
        anchor: /^Practica final$/i.test(sourceHeading) ? 'practica-final' : `capitulo-${index}`,
        order: index,
      }),
      paragraphs: cleanParagraphs(raw),
    };
  });
}

function AudiobookNarrationCue() {
  return <div className="audiobook-narration-cue" aria-label="Audio narrado por Germán, disponible próximamente">
    <span className="audiobook-narration-ear" aria-hidden="true"><AnimatedInterfaceIcon name="ear" size={29} /></span>
    <span className="audiobook-narration-copy"><strong>Leído por Germán</strong><small>Audio disponible a partir del sábado 26</small></span>
  </div>;
}

function AudiobookLibraryPanel({ entries, loading, error, onBack, onNavigate, onOpen }: { entries: AudiobookEntry[]; loading: boolean; error: string; onBack: () => void; onNavigate: (target: NavTarget) => void; onOpen: (entry: AudiobookEntry) => void }) {
  const collectionTitles = ['Revisión — Cambiar el pasado desde el presente', 'Persistir — Hasta que se vuelva natural', 'Vivir desde el final', 'La imaginación aplicada', 'El arte de asumir'];
  const collectionSourcePaths = ['/audiolibros-german/revision.md', '/audiolibros-german/persistir.md', '/audiolibros-german/vivir-desde-el-final.md', '/audiolibros-german/la-imaginacion-aplicada.md', '/audiolibros-german/el-arte-de-asumir.md'];
  const revisionChapters: AudiobookChapter[] = [
    'Prólogo', 'Qué es la revisión', 'El perdón real', 'Cómo funciona', 'El método paso a paso', 'La revisión diaria', 'Revisión de eventos lejanos', 'Revisar por otros', 'Los muebles de tu mente', 'La carta que no querés recibir', 'Revisar las conversaciones internas', 'Errores comunes', 'Revisión y relaciones', 'La revisión y la salud', 'Revisión instantánea', 'La libertad está en el perdón'
  ].map((title, index) => ({ title, anchor: index === 0 ? 'prologo' : `capitulo-${index}`, order: index }));
  const revisionPrologue = `Prólogo\n\nHay cosas que creemos terminadas simplemente porque ya ocurrieron. Una conversación que salió mal, una decisión que todavía lamentamos, una noticia que no queríamos recibir, una relación que tomó un rumbo distinto al que deseábamos. Las llamamos pasado y suponemos que, precisamente por pertenecer al pasado, ya no podemos hacer nada con ellas.\n\nPero seguimos llevándolas con nosotros.\n\nLas recordamos, hablamos de ellas, reaccionamos emocionalmente ante ellas y, muchas veces sin advertirlo, continuamos dándoles vida en nuestra imaginación.\n\nLa revisión parte de una idea completamente diferente: lo ocurrido no tiene por qué seguir determinando lo que viene.\n\nRevisar no significa negar una experiencia ni fingir que nunca sucedió. Significa dejar de aceptar como definitiva la versión que seguimos reproduciendo interiormente. Es volver a una escena y darle, en la imaginación, el desenlace que hubiéramos querido vivir.\n\nNeville Goddard convirtió esta práctica en una de las aplicaciones más profundas de la Ley de Asunción. No como un ejercicio ocasional, sino como una manera diferente de relacionarnos con nuestra propia historia.\n\nPorque aquello que mantenemos vivo interiormente continúa teniendo consecuencias. Y aquello que somos capaces de transformar en nuestra imaginación deja de ocupar el mismo lugar dentro de nosotros.\n\nEste libro está dedicado enteramente a esa práctica.\n\nA comprender qué significa revisar, cómo hacerlo, cómo aplicarlo a acontecimientos recientes y lejanos, a nuestras relaciones, a nuestras conversaciones internas y a esas experiencias que todavía parecen acompañarnos muchos años después.\n\nNo podemos volver físicamente a ayer.\n\nPero podemos decidir qué versión de ayer llevamos con nosotros hacia mañana.\n\nY ahí comienza la revisión.\n\n${revisionChapters.slice(1).map((chapter) => chapter.title).join('\n\n')}`;
  const extraBooks = [
    {
      titles: ['Prólogo', 'La ley tiene una condición', 'El precio que se paga', 'Qué significa mantenerse en el estado', 'La historia del ejército', 'No te rindas', 'La convicción que no se tambalea', 'No le cuentes a nadie', 'La carrera que se corre', 'La persistencia que cambia a los demás', '¿Y si tarda mucho?', 'El sábado interior', 'Permanecer inmóvil', 'Persistir no es repetir', 'El puente aparece solo', 'Cuando sentís que no podés más', 'Persistir en la salud', 'Los tres enemigos de la persistencia', 'Persistir es el acto de fe más grande', 'La prueba definitiva', 'Práctica final'],
      prologue: `Hay una diferencia entre la gente que manifiesta y la gente que no. Y no es talento. No es suerte. No es que unos sepan más que otros. La diferencia es una sola: la persistencia.\n\nTodo el mundo puede imaginarse algo una vez. Todo el mundo puede sentirse en el estado deseado durante cinco minutos. El problema es que después de esos cinco minutos, vuelven a la vieja imagen. Vuelven a la vieja historia. Vuelven a creer lo que el mundo les dice que es real. Y la semilla que plantaron nunca llega a germinar.\n\nPersistir no es forzar. No es apretar los dientes y aguantar. No es repetir como loro una afirmación en la que no creés. Persistir es mantenerse en el estado. Es seguir asumiendo que sos lo que decidiste ser, a pesar de que los sentidos te digan lo contrario. A pesar de que las circunstancias no hayan cambiado todavía. A pesar de que todo a tu alrededor te invite a volver a la vieja versión de vos.\n\nEn este libro te voy a explicar qué significa persistir de verdad, por qué es tan difícil y tan necesario, y cómo convertirlo en algo natural.`
    },
    {
      titles: ['Prólogo', 'La diferencia entre desear y asumir', 'Tu conciencia crea tu realidad', 'El sentimiento es la clave', 'Cómo se siente ya tenerlo', 'No mires para atrás', 'Dormir en el estado', 'No necesitás saber el cómo', 'Vivir desde el final no es actuar', 'Negar la identidad actual', 'Vivir desde el final con el dinero', 'El Yo Soy', 'Los estados son infinitos', '¿Qué harías si ya lo tuvieras?', 'La ascensión real', 'La prueba del espejo', 'Los problemas no se terminan', 'Vivir desde el final en las relaciones', 'La naturalidad como señal', 'Práctica final'],
      prologue: `Todo el mundo quiere cosas. Todo el mundo desea algo que no tiene. Pero la mayoría de la gente comete un error fundamental: desean desde la carencia. Piden desde el lugar de no tener. Y al pedir desde ahí, refuerzan exactamente lo que no quieren.\n\nVivir desde el final es lo opuesto a desear. No es pedir. No es esperar. No es visualizar algo lejano y cruzar los dedos para que llegue. Es instalarte, ahora mismo, en el estado de tener lo que querés. Es vivir como si ya fuera un hecho. No mañana, no algún día. Ahora.\n\nY cuando digo \"como si\", no estoy hablando de autoengaño. No estoy hablando de negar tu situación actual. Estoy hablando de algo mucho más preciso: estoy hablando de ocupar un estado de conciencia diferente. Porque tu realidad no la determinan tus circunstancias. La determina tu estado. Y tu estado lo elegís vos.\n\nEn este libro te voy a enseñar qué significa vivir desde el final, cómo se hace, y por qué es la única forma de manifestar que realmente funciona.`
    },
    {
      titles: ['Prólogo', 'El estado de relajación', 'La escena que implica el final', 'Los sentidos dentro de la escena', 'La técnica de la conversación', 'La técnica de la frase corta', 'La técnica de la silla', 'Dormirse en el acto', '¿Cuánto tiempo debe durar la práctica?', 'Señales de que lo hiciste bien', 'La imaginación durante el día', 'Errores comunes en la práctica', 'El error de forzar la imagen', '¿Qué pasa después?', 'Aplicar la imaginación al cuerpo', 'Aplicar la imaginación al dinero', 'Aplicar la imaginación a las relaciones', 'Imaginar por otros', 'Tu primera prueba', 'El hábito de imaginar', 'No hay límites', 'Práctica final'],
      prologue: `Hasta acá hablamos de principios. De que la imaginación crea la realidad. De que tu estado de conciencia determina tu mundo. De que lo que asumís con sentimiento se convierte en hecho.\n\nPero hay una pregunta que todos se hacen: ¿cómo se hace? ¿Cómo paso de la teoría a la práctica? ¿Qué hago concretamente cuando me siento, cierro los ojos y quiero usar mi imaginación para cambiar algo?\n\nEste libro es la respuesta. Es el manual de uso. Acá te voy a dar las técnicas exactas, paso a paso, para que puedas aplicar la imaginación en cualquier área de tu vida. No hay misterio. No hay secretos guardados. Es una práctica que cualquiera puede aprender y que, con repetición, se convierte en una habilidad tan natural como caminar.`
    },
    {
      titles: ['Prólogo', 'Qué es asumir', 'Por qué funciona', 'Asumir no es repetir', 'El momento de la decisión', 'La naturalidad como objetivo', 'Asumir en la adversidad', 'Los pilares del arte de asumir', 'Asumir en el trabajo', 'Asumir en las finanzas', 'Asumir en el amor', 'Asumir un nuevo autoconcepto', 'Asumir por otros', 'Asumir y la dieta mental', 'Asumir y el tiempo', 'Asumir en la salud', 'Errores comunes al asumir', 'La prueba de vida', 'El arte que cambia todo', 'Resumen de los cinco libros', 'Práctica final'],
      prologue: `Si tuviera que resumir todo lo que enseño en una sola palabra, sería esta: asumir.\n\nAsumir es el acto más poderoso que podés hacer como ser humano. No es creer. No es esperar. No es desear. Es decidir que algo es verdad, sentirlo como verdad, y vivir desde ahí. Sin evidencia. Sin permiso. Sin que nada externo te lo confirme.\n\nEl mundo te dice que primero necesitás la prueba y después podés creer. Asumir invierte eso. Primero creés, y la prueba viene después. No porque seas ingenuo. Porque entendiste cómo funciona la ley: la realidad se ajusta a lo que asumís, no al revés.\n\nEn este libro te voy a explicar qué es asumir de verdad, cómo se hace, dónde falla la mayoría, y cómo convertirlo en tu herramienta principal para vivir la vida que querés.`
    }
  ].map((book) => {
    const chapters = book.titles.map((title, index) => ({ title, anchor: index === 0 ? 'prologo' : index === book.titles.length - 1 ? 'practica-final' : `capitulo-${index}`, order: index }));
    return { chapters, body: `Prólogo\n\n${book.prologue}\n\n${chapters.slice(1).map((chapter) => chapter.title).join('\n\n')}` };
  });
  const collection = collectionTitles.map((title, index) => {
    const existing = entries.find((entry) => entry.title.toLocaleLowerCase('es').trim() === title.toLocaleLowerCase('es').trim());
    const fallback = {
      id: `german-book-${index + 1}`,
      slug: title.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      author: 'Germán González',
      excerpt: 'Libro escrito y narrado por Germán.',
      body: '',
      chapters: []
    } satisfies AudiobookEntry;
    const book = { ...(existing ?? fallback), sourcePath: collectionSourcePaths[index] };
    if (index === 0) return { ...book, body: revisionPrologue, chapters: revisionChapters };
    const scaffold = extraBooks[index - 1];
    return scaffold ? { ...book, body: scaffold.body, chapters: scaffold.chapters } : book;
  });
  return <section className="reader-section audiobook-library-section">
    <FixedHeader eyebrow="LIBROS DE GERMÁN" title="Escritos y narrados por Germán" subtitle="Cinco libros para leer y escuchar." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body audiobook-library">
      {loading && <p className="library-empty">Cargando audiolibros…</p>}
      {!loading && error && <p className="library-empty">No pudimos cargar los audiolibros. {error}</p>}
      {!loading && !error && <div className="audiobook-folder-stage"><FolderFloat
        items={collection.map((entry) => ({ label: entry.title, value: entry.id }))}
        label="Libros de Germán"
        sublabel="5 libros"
        trigger="click"
        closeOnSelect
        physics
        drift={0.5}
        onSelect={(value) => { const entry = collection.find((item) => item.id === value); if (entry) onOpen(entry); }}
        folderColor="#3f3f46"
        frontColor="#52525b"
        paperColor="#f5f5f5"
        itemColor="#f5f5f5"
        itemTextColor="#18181b"
        labelColor="#f5f5f5"
        width={200} height={148} radius={14} spread={205} lift={52} tilt={8} flapAngle={34} restAngle={16} openDuration={520} stagger={45} bounce={0.3}
      /></div>}
    </div>
  </section>;
}

function AudiobookReader({ book, onBack, onNavigate }: { book: AudiobookEntry; onBack: () => void; onNavigate: (target: NavTarget) => void }) {
  const [sourceMarkdown, setSourceMarkdown] = useState<string | null>(null);
  const [sourceLoading, setSourceLoading] = useState(Boolean(book.sourcePath));
  const [sourceError, setSourceError] = useState('');
  const sections = useMemo(() => sourceMarkdown
    ? parseGermanAudiobookMarkdown(sourceMarkdown, book.chapters)
    : splitAudiobookSections(book.body, book.chapters), [book.body, book.chapters, sourceMarkdown]);
  const sourceReady = !book.sourcePath || Boolean(sourceMarkdown);
  const chapterCount = sections.filter((section) => section.anchor.startsWith('capitulo-')).length;
  const hasFinalPractice = sections.some((section) => section.anchor === 'practica-final');
  useEffect(() => {
    setSourceMarkdown(null);
    setSourceError('');
    if (!book.sourcePath) { setSourceLoading(false); return; }
    let cancelled = false;
    setSourceLoading(true);
    fetch(book.sourcePath, { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => { if (!cancelled) setSourceMarkdown(text); })
      .catch((error: unknown) => {
        console.error('[audiobooks] error cargando texto completo:', error);
        if (!cancelled) setSourceError('No pudimos cargar el texto completo. Probá de nuevo.');
      })
      .finally(() => { if (!cancelled) setSourceLoading(false); });
    return () => { cancelled = true; };
  }, [book.id, book.sourcePath]);
  return <section className="reader-section audiobook-reader-section">
    <FixedHeader eyebrow="AUDIOLIBRO" title={book.title} subtitle={book.author} onBack={onBack} onNavigate={onNavigate} />
    <article className="reader-body audiobook-reader">
      {sourceLoading && <p className="library-empty">Cargando libro…</p>}
      {sourceError && <p className="library-empty">{sourceError}</p>}
      {sourceReady && <details className="audiobook-book-accordion">
        <summary className="audiobook-book-summary">
          <span>
            <small>LIBRO</small>
            <b>{book.title}</b>
            <em>Prólogo + {chapterCount} capítulos{hasFinalPractice ? ' + práctica final' : ''}</em>
          </span>
          <ChevronDown size={20} aria-hidden="true" />
        </summary>
        <div className="audiobook-book-sections">
          {sections.map((section) => {
            const isPrologue = section.anchor === 'prologo';
            const isPractice = section.anchor === 'practica-final';
            const eyebrow = isPrologue ? 'PRÓLOGO' : isPractice ? 'PRÁCTICA FINAL' : `CAPÍTULO ${section.order}`;
            const title = isPrologue ? 'Prólogo' : isPractice ? section.title : `Capítulo ${section.order} — ${section.title}`;
            return <details className="audiobook-section-accordion" key={section.anchor}>
              <summary className="audiobook-section-summary">
                <span><small>{eyebrow}</small><b>{title}</b></span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <div className="audiobook-section-content">
                <AudiobookNarrationCue />
                {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </details>;
          })}
        </div>
      </details>}
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

function libraryExcerpt(text: string): string {
  return text.replace(/^Audio disponible\s*[·•-]?\s*/i, '').trim();
}

function extractConferenceYear(item: Record<string, unknown>): number | undefined {
  const metadata = item.metadata && typeof item.metadata === 'object' && !Array.isArray(item.metadata) ? item.metadata as Record<string, unknown> : {};
  const candidates = [metadata.year, metadata.conference_year, metadata.original_year, metadata.date, metadata.conference_date, metadata.original_date, item.published_at, item.title, item.excerpt];
  for (const value of candidates) {
    if (typeof value === 'number' && value >= 1900 && value <= 2099) return Math.trunc(value);
    if (typeof value === 'string') {
      const match = value.match(/\b(19\d{2}|20\d{2})\b/);
      if (match) return Number(match[1]);
    }
  }
  return undefined;
}

function LibraryPanel({ entries, onBack, onNavigate, onRead, favorites, onToggleFavorite, booksAllowed, onBooksBlocked }: { entries: LibraryEntry[]; onBack: () => void; onNavigate: (target: NavTarget) => void; onRead: (entry: LibraryEntry, query?: string, mode?: 'audio' | 'text') => void; favorites: FavoriteRecord[]; onToggleFavorite: (favorite: FavoriteRecord) => void; booksAllowed: boolean; onBooksBlocked: () => void }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bodyMatches, setBodyMatches] = useState<Map<string, string>>(new Map());
  const searchInputRef = useRef<HTMLInputElement>(null);
  const blurSearch = () => {
    searchInputRef.current?.blur();
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setBodyMatches(new Map());
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(() => {
      const searchingBooks = filter === 'Libros en texto';
      void (async () => {
        if (searchingBooks) {
          const { data, error } = await supabase
            .from('content_items')
            .select('id')
            .eq('is_published', true)
            .eq('content_type', 'book')
            .ilike('body', `%${q}%`)
            .limit(1000);
          if (cancelled) return;
          if (error) {
            console.error('[library] búsqueda en libros:', error);
            setBodyMatches(new Map());
            return;
          }
          setBodyMatches(new Map((data || []).map((row) => [String(row.id), ''])));
          return;
        }

        const { data, error } = await supabase
          .from('content_items')
          .select('id,body')
          .eq('is_published', true)
          .eq('content_type', 'conference')
          .ilike('body', `%${q}%`)
          .limit(1000);
        if (cancelled) return;
        if (error) {
          console.error('[library] búsqueda en conferencias:', error);
          setBodyMatches(new Map());
          return;
        }
        setBodyMatches(new Map((data || []).map((row) => [String(row.id), typeof row.body === 'string' ? row.body : ''])));
      })();
    }, 280);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, filter]);
  const visible = entries.filter((entry) => {
    const q = query.trim().toLocaleLowerCase();
    const matchesQuery = !q || (
      (entry.title && entry.title.toLocaleLowerCase().includes(q)) ||
      (entry.excerpt && entry.excerpt.toLocaleLowerCase().includes(q)) ||
      bodyMatches.has(entry.id)
    );
    const isConference = /conference|conferencia/i.test(entry.type);
    const isBook = /book|libro/i.test(entry.type);
    const matchesFilter = !filter ||
      (filter === 'Conferencias' && isConference) ||
      (filter === 'Audios' && isConference) ||
      (filter === 'Libros en texto' && isBook);
    return matchesQuery && matchesFilter;
  });
  const q = query.trim();
  const ordered = [...visible].sort((a, b) => {
    return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });
  });
  const conferenceGroups = [{ label: '', entries: ordered }];
  return <section className="reader-section library-section">
    <FixedHeader eyebrow="PARA ESCUCHAR Y LEER" title="Tu biblioteca" subtitle="Buscá por conferencia, tema o etiqueta." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body library-browser">
      <section className={`library-controls${searchOpen || query ? ' is-search-open' : ''}`}>
        <div className="library-search-toolbar">
          {!searchOpen && !query ? <button type="button" className="library-search-trigger" onClick={() => setSearchOpen(true)} aria-label="Buscar en la biblioteca"><Search size={21} /></button> : <div className="search-input-pill">
            <input
              ref={searchInputRef}
              autoFocus
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') blurSearch(); }}
              placeholder="Buscar"
              aria-label="Buscar en la biblioteca"
            />
            {query ? (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => { blurSearch(); setQuery(''); setSearchOpen(false); }}
                aria-label="Cerrar búsqueda"
              >
                <X size={16} strokeWidth={2.4} />
              </button>
            ) : (
              <span className="search-icon-badge" aria-hidden="true">
                <Search size={18} />
              </span>
            )}
          </div>}
        </div>
        {filter && <button type="button" className="library-folders-back" onClick={() => { blurSearch(); setFilter(null); setQuery(''); setSearchOpen(false); }}><ChevronLeft size={16} /> Biblioteca</button>}
      </section>
      {!filter && !query && <div className="library-folder-float-stage">
        <FolderFloat
          items={[
            { label: 'Conferencias en audio', value: 'Audios' },
            { label: 'Libros en audio', value: 'Libros en audio' },
            { label: 'Libros en texto', value: 'Libros en texto' },
            { label: 'Conferencias en texto', value: 'Conferencias' }
          ]}
          label="Biblioteca"
          sublabel="4 contenidos"
          trigger="click"
          closeOnSelect
          physics
          drift={0.5}
          onSelect={(value) => {
            if (/Libros/.test(value) && !booksAllowed) { onBooksBlocked(); return; }
            setFilter(value);
          }}
          folderColor="#3f3f46"
          frontColor="#52525b"
          paperColor="#f5f5f5"
          itemColor="#f5f5f5"
          itemTextColor="#18181b"
          labelColor="#f5f5f5"
          width={200}
          height={148}
          radius={14}
          spread={205}
          lift={52}
          tilt={8}
          flapAngle={34}
          restAngle={16}
          openDuration={520}
          stagger={45}
          bounce={0.3}
        />
      </div>}
      {filter === 'Libros en audio' && !query && isLaunchPending('libros') && <LaunchDateCard />}
      {filter === 'Libros en audio' && !query && !isLaunchPending('libros') && <div className="library-coming-soon">
        <span>PRÓXIMAMENTE</span>
        <b>Libros en audio</b>
        <p>Estamos preparando los audiolibros. Próximamente van a estar disponibles narrados por Germán.</p>
      </div>}
      {filter && !query && filter !== 'Libros en audio' && <><p className="library-count">{ordered.length} {ordered.length === 1 ? 'resultado' : 'resultados'}</p><div className="library-content-list">{conferenceGroups.map((group) => {
        return <section key={group.label || 'all'} className="library-year-group is-open">
          {group.entries.map((entry) => { const audioLocked = filter === 'Audios' && !entry.audioUrl; return <div key={entry.id} className="library-card-row"><MagicCard delay={0} className={`library-content-card library-content-card--instant${audioLocked ? ' is-coming-soon' : ''}`} disabled={audioLocked} onClick={audioLocked ? undefined : filter === 'Audios' ? () => onRead(entry, undefined, 'audio') : () => onRead(entry, undefined, 'text')}><div><p>{filter === 'Audios' ? 'Audio' : 'Texto'}</p><b className="card-title">{entry.title}</b>{filter === 'Audios' ? <em className="card-subtitle">Próximamente leída por Germán</em> : <em className="card-subtitle">{libraryExcerpt(entry.excerpt) || 'Abrir conferencia'}</em>}</div><span className="library-card-actions"><i>{filter === 'Audios' ? <AnimatedInterfaceIcon name="ear" size={19} /> : <ChevronRight size={19}/>}</i></span></MagicCard></div>; })}
        </section>;
      })}</div></>}
      {query && <><p className="library-count">{ordered.length} {ordered.length === 1 ? 'resultado' : 'resultados'}</p>
      <div id="library-results" className="library-content-list" role="tabpanel" aria-label={`Resultados: ${filter || 'Biblioteca'}`}>{conferenceGroups.map((group) => {
        return <section key={group.label || 'all'} className="library-year-group is-open">
          {group.entries.map((entry) => {
        const saved = favorites.some((favorite) => favorite.id === libraryFavorite(entry).id);
        const cleanExcerpt = libraryExcerpt(entry.excerpt);
        let preview: React.ReactNode = cleanExcerpt || 'Abrí para leer o escuchar.';
        if (q) {
          const titleHasMatch = entry.title?.toLocaleLowerCase().includes(q.toLocaleLowerCase());
          const excerptSnippet = snippetAround(cleanExcerpt, q);
          const contextText = excerptSnippet;
          if (contextText) {
            preview = highlightText(contextText, q);
          } else if (bodyMatches.has(entry.id)) {
            const bodySnippet = snippetAround(bodyMatches.get(entry.id) || '', q, 44);
            preview = bodySnippet ? highlightText(bodySnippet, q) : (/book|libro/i.test(entry.type) ? 'Coincidencia encontrada dentro del libro.' : cleanExcerpt || 'Abrí para leer o escuchar.');
          } else if (!titleHasMatch) {
            preview = cleanExcerpt || 'Abrí para leer o escuchar.';
          }
        }
        // Dentro de "Conferencias en audio": con audio abre el audio; sin audio queda bloqueada.
        const audioSearchLocked = filter === 'Audios' && !entry.audioUrl;
        return <div key={entry.id} className="library-card-row"><MagicCard delay={0} className={`library-content-card library-content-card--instant${audioSearchLocked ? ' is-coming-soon' : ''}`} disabled={audioSearchLocked} onClick={audioSearchLocked ? undefined : filter === 'Audios' ? () => { blurSearch(); onRead(entry, q, 'audio'); } : () => { blurSearch(); onRead(entry, q); }}>
          <div>
            <p>{entry.type || 'Contenido'}</p>
            <b className="card-title">{q ? highlightText(entry.title, q) : entry.title}</b>
            <em className="card-subtitle">{preview}</em>
          </div>
          <span className="library-card-actions">
            <i><ChevronRight size={19} /></i>
          </span>
        </MagicCard><button type="button" className={`favorite-button library-row-favorite${saved ? ' is-favorite' : ''}`} onClick={() => onToggleFavorite(libraryFavorite({ ...entry, audioUrl: undefined, duration: undefined }))} aria-label={saved ? `Quitar ${entry.title} de favoritos` : `Guardar ${entry.title} en favoritos`}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button></div>;
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

function FavoriteContentIcon({ favorite }: { favorite: FavoriteRecord }) {
  if (favorite.reader?.eyebrow === 'TEXTO' || /💬/.test(favorite.icon)) {
    return <span className="motion-icon motion-icon--message"><MessageCircle size={30} strokeWidth={1.8} /></span>;
  }
  if (favorite.id.startsWith('delivery:') || favorite.reader?.audioUrl || /🎧|🎙️/.test(favorite.icon)) {
    return <AnimatedInterfaceIcon name="ear" size={30} />;
  }
  if (/📖|📚/.test(favorite.icon)) {
    return <AnimatedInterfaceIcon name="open-door" size={30} />;
  }
  return <CategoryIcon item={{ icon: favorite.icon, title: favorite.title, detail: favorite.detail, tone: favorite.tone }} />;
}

function FavoritesPanel({ favorites, onBack, onNavigate, onOpen, onRemove }: { favorites: FavoriteRecord[]; onBack: () => void; onNavigate: (target: NavTarget) => void; onOpen: (favorite: FavoriteRecord) => void; onRemove: (favorite: FavoriteRecord) => void }) {
  const [pendingRemoval, setPendingRemoval] = useState<FavoriteRecord | null>(null);
  return <section className="reader-section favorites-section">
    <FixedHeader eyebrow="MI PERFIL" title="Favoritos" subtitle="Todo lo que guardaste, reunido en un solo lugar." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body favorites-browser">
      {!favorites.length && <div className="favorites-empty"><Heart size={30} /><b>Todavía no guardaste nada</b><p>Tocá el corazón de cualquier tarjeta para encontrarla después acá.</p></div>}
      {favorites.map((favorite, index) => <div key={favorite.id} className="favorite-card-row"><MagicCard delay={index * .04} className="favorite-content-card" onClick={() => onOpen(favorite)} style={{ '--category-tone': favorite.tone } as React.CSSProperties}><span className="card-image"><FavoriteContentIcon favorite={favorite} /></span><div><small className="card-subtitle">FAVORITO</small><b className="card-title">{favorite.title}</b><em className="card-subtitle">{favorite.detail}</em></div></MagicCard><button type="button" className="remove-favorite" onClick={() => setPendingRemoval(favorite)} aria-label={`Quitar ${favorite.title} de favoritos`}><Trash2 size={18} /></button></div>)}
    </div>
    {pendingRemoval && <ConfirmDialog description={`Se va a quitar "${pendingRemoval.title}" de tus favoritos.`} onCancel={() => setPendingRemoval(null)} onConfirm={() => { onRemove(pendingRemoval); setPendingRemoval(null); }} />}
  </section>;
}

const workshopMomentKeys = ['morning', 'noon', 'afternoon', 'night'] as const;
const workshopMomentPickerLabels: Record<typeof workshopMomentKeys[number], string> = { morning: 'Mañana', noon: 'Mediodía', afternoon: 'Tarde', night: 'Noche' };
const defaultWorkshopSchedule: WorkshopSchedule = { morning: '07:00', noon: '12:00', afternoon: '17:00', night: '22:00' };
const workshopIntervalOptions = [30, 40, 50, 120] as const;
const workshopIntervalLabel = (minutes: number) => minutes === 120 ? 'Cada 2 horas' : `Cada ${minutes} min`;
const guidedProgramMeta: Record<string, { days: number; introSubtitle: string; introParagraphs: string[] }> = {
  'practica-guiada-7-dias': {
    days: 7,
    introSubtitle: '7 días · intensidad directa. Un recorrido breve, concentrado y al grano.',
    introParagraphs: [
      'Este es el recorrido más directo. Durante 7 días vas a trabajar el autoconcepto con intensidad: asumir quién elegís ser, sentirlo como real y volver a ese estado cada vez que la vieja identidad intente aparecer.',
      'Cada día vas a recibir 4 meditaciones guiadas — mañana, mediodía, tarde y noche — y 32 mensajes intermedios para mantener la atención en el estado elegido.',
      'La idea no es acumular teoría. Es practicar con decisión durante una semana y mover rápido la posición interior desde la que estás viviendo.',
    ],
  },
  'practica-guiada-15-dias': {
    days: 15,
    introSubtitle: '15 días · intensidad intermedia. Más espacio para dejar la espera, la duda y el control.',
    introParagraphs: [
      'Este recorrido te da más tiempo para hacer natural el nuevo autoconcepto. Durante 15 días vamos a trabajar especialmente la espera, la duda y la necesidad de controlar cuándo o cómo tiene que aparecer el resultado.',
      'Cada día vas a recibir 4 meditaciones guiadas — mañana, mediodía, tarde y noche — y 32 mensajes intermedios para ayudarte a volver al estado sin convertir la práctica en tensión.',
      'Acá el trabajo no es una explosión de intensidad: es volver, sostener y dejar que la nueva posición se vuelva cada vez más familiar.',
    ],
  },
  'taller-40-dias': {
    days: 40,
    introSubtitle: '40 días · recorrido completo y profundo de autoconcepto y control de la imaginación.',
    introParagraphs: [
      'Este es el recorrido más completo. Durante 40 días vas a trabajar de manera sostenida el autoconcepto y el control de la imaginación hasta que la nueva identidad deje de sentirse como una práctica y empiece a sentirse natural.',
      'Cada día vas a recibir 4 meditaciones guiadas — mañana, mediodía, tarde y noche — y 32 mensajes intermedios para mantener tu atención enfocada. Vos elegís cada cuánto te llegan.',
      'No se trata de forzar durante 40 días. Se trata de volver una y otra vez a la identidad elegida hasta que sea el lugar desde el que vivís.',
    ],
  },
};
const detectTimezone = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch { return 'UTC'; } };
const shiftHours = (time: string, hours: number) => {
  const [h, m] = time.split(':').map(Number);
  const total = (((h * 60 + m + hours * 60) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

type WorkshopStage = 'loading' | 'onboarding' | 'conflict' | 'confirmed' | 'days' | 'edit-schedule' | 'error';
type WorkshopOnboardingStep = 'intro' | 'schedule' | 'frequency' | 'summary';
type ActiveProgramEnrollment = { id: string; collection_id: string; current_day: number; morning: string; noon: string; afternoon: string; night: string; timezone: string; message_interval_minutes: number; pending_schedule: PendingProgramSchedule | null; collections: { title: string } | null };
type PendingProgramSchedule = { morning: string; noon: string; afternoon: string; night: string; timezone: string; message_interval_minutes: number };

function WorkshopPanel({ user, program, onBack, onNavigate, onRead }: { user: User; program: ProgramPanelConfig; onBack: () => void; onNavigate: (target: NavTarget) => void; onRead: (reader: ReaderContent) => void }) {
  const programMeta = guidedProgramMeta[program.slug] || guidedProgramMeta['taller-40-dias'];
  const programDays = programMeta.days;
  const [deliveries, setDeliveries] = useState<TallerDelivery[]>([]);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [activeProgram, setActiveProgram] = useState<ActiveProgramEnrollment | null>(null);
  const [stage, setStage] = useState<WorkshopStage>('loading');
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [step, setStep] = useState<WorkshopOnboardingStep>('intro');
  const [schedule, setSchedule] = useState<WorkshopSchedule>(defaultWorkshopSchedule);
  const [timezone, setTimezone] = useState(detectTimezone);
  const [schedulePendingNextDay, setSchedulePendingNextDay] = useState(false);
  const [messageInterval, setMessageInterval] = useState<typeof workshopIntervalOptions[number]>(40);
  const [editingMoment, setEditingMoment] = useState<typeof workshopMomentKeys[number] | null>(null);
  const [editingTimezone, setEditingTimezone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [confirmingAbandon, setConfirmingAbandon] = useState(false);
  const [openDeliveryDays, setOpenDeliveryDays] = useState<Record<number, boolean>>({});

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
          .select('id,collection_id,current_day,morning,noon,afternoon,night,timezone,message_interval_minutes,pending_schedule,collections(title)')
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
        // Si hay un cambio de horarios pendiente para el próximo día, mostramos
        // lo que la persona eligió y avisamos desde cuándo se aplica.
        const shownSchedule = enrollment.pending_schedule ?? enrollment;
        setSchedulePendingNextDay(Boolean(enrollment.pending_schedule));
        setSchedule({ morning: shownSchedule.morning.slice(0, 5), noon: shownSchedule.noon.slice(0, 5), afternoon: shownSchedule.afternoon.slice(0, 5), night: shownSchedule.night.slice(0, 5) });
        setTimezone(shownSchedule.timezone);
        if (workshopIntervalOptions.includes(shownSchedule.message_interval_minutes as typeof workshopIntervalOptions[number])) setMessageInterval(shownSchedule.message_interval_minutes as typeof workshopIntervalOptions[number]);

        console.log('[workshop] buscando taller_deliveries…');
        const { data: deliveryRows, error: deliveryError } = await supabase
          .from('taller_deliveries')
          .select('id,day_number,delivery_type,delivered_at,seen_at,message_index,content_items(title,body),content_assets(source_url,storage_path)')
          .eq('enrollment_id', enrollment.id)
          .order('delivered_at', { ascending: false });
        if (cancelled) return;
        if (deliveryError) { console.error('[workshop] error buscando taller_deliveries:', deliveryError); setLoadError(deliveryError.message); setStage('error'); return; }
        console.log('[workshop] entregas encontradas:', deliveryRows?.length ?? 0);

        const mapped = (deliveryRows || []).map((row) => {
          const item = row.content_items as unknown as { title: string; body?: string } | null;
          const asset = row.content_assets as unknown as { source_url: string; storage_path?: string } | null;
          const audioUrl = asset?.source_url && !asset.source_url.startsWith('storage://')
            ? asset.source_url
            : asset?.storage_path
              ? `https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/${asset.storage_path}`
              : undefined;
          const deliveryType = row.delivery_type as TallerDeliveryType;
          const paragraphs = extractDeliveryParagraphs(item?.body || '', deliveryType, row.message_index) || [];
          return {
            id: row.id,
            dayNumber: row.day_number,
            deliveryType,
            deliveredAt: row.delivered_at,
            seenAt: row.seen_at,
            title: item?.title || `Día ${row.day_number}`,
            paragraphs,
            audioUrl,
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
    const { data: enrollment, error: progressError } = await supabase.rpc('start_program', enrollmentParams()).single();
    setSaving(false);
    if (progressError) { setSaveError(progressError.message); return; }
    setEnrollmentId((enrollment as { id: string }).id);
    setCurrentDay(1);
    setStage('confirmed');
  };

  const saveActiveSchedule = async () => {
    if (!enrollmentId) return;
    setSaving(true);
    setSaveError('');
    // Sólo horarios, zona y frecuencia: el progreso nunca se toca desde el
    // cliente. Si el día ya empezó, el cambio se aplica desde el próximo día.
    const { data, error } = await supabase.rpc('update_program_schedule', {
      p_enrollment_id: enrollmentId,
      p_morning: schedule.morning,
      p_noon: schedule.noon,
      p_afternoon: schedule.afternoon,
      p_night: schedule.night,
      p_timezone: timezone,
      p_message_interval_minutes: messageInterval,
    });
    setSaving(false);
    if (error) { setSaveError(error.message); return; }
    const appliedNextDay = (data as { applied?: string } | null)?.applied === 'next_day';
    const savedSchedule = { morning: schedule.morning, noon: schedule.noon, afternoon: schedule.afternoon, night: schedule.night, timezone, message_interval_minutes: messageInterval };
    setSchedulePendingNextDay(appliedNextDay);
    setActiveProgram((current) => current ? (appliedNextDay
      ? { ...current, pending_schedule: savedSchedule }
      : { ...current, ...savedSchedule, pending_schedule: null }) : current);
    setStage('days');
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

  const openDelivery = async (delivery: TallerDelivery) => {
    if (!delivery.seenAt) {
      const { data: seenAt, error } = await supabase.rpc('mark_taller_delivery_seen', { p_delivery_id: delivery.id });
      if (error) console.error('[workshop] no se pudo marcar entrega como vista:', error);
      else setDeliveries((current) => current.map((item) => item.id === delivery.id ? { ...item, seenAt: String(seenAt) } : item));
    }
    onRead({ title: `Día ${delivery.dayNumber} · ${deliveryTypeLabels[delivery.deliveryType]}`, eyebrow: 'PRÁCTICA GUIADA', detail: ``, paragraphs: delivery.paragraphs, audioUrl: delivery.audioUrl });
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
        description={`Vas a dejar de recibir sus prácticas y notificaciones. ${program.title} comenzará desde el Día 1.`}
        confirmLabel={saving ? 'Un momento…' : 'Abandonar y empezar'}
        cancelLabel="Seguir con mi programa"
        onCancel={() => { if (!saving) setConfirmingAbandon(false); }}
        onConfirm={() => { if (!saving) void abandonAndStartWorkshop(); }}
      />}
    </section>;
  }

  if (stage === 'onboarding' && step === 'intro') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title={program.title} subtitle={programMeta.introSubtitle} onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      {programMeta.introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <ShimmerButton type="button" className="account-save" onClick={() => setStep('schedule')}>Comenzar configuración →</ShimmerButton>
    </div>
  </section>;

  // Los cuatro momentos del taller son parte de la programación automática.
  // No hacemos que el alumno configure mañana/mediodía/tarde/noche uno por uno.
  if (stage === 'onboarding' && step === 'schedule') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Elegí tus horarios" subtitle="¿A qué hora querés recibir cada meditación?" onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      <div className="workshop-schedule-pills">
        <button className="workshop-schedule-pill" onClick={() => setEditingTimezone(true)} aria-haspopup="dialog"><span className="ios-row-label">Zona horaria</span><span className="ios-row-value ios-row-value--muted">{timezone.replace(/_/g, ' ')}<ChevronRight size={17} /></span></button>
        {workshopMomentKeys.map((key) => <button key={key} className="workshop-schedule-pill" onClick={() => setEditingMoment(key)} aria-label={`Cambiar horario de ${workshopMomentPickerLabels[key]}: ${schedule[key]}`} aria-haspopup="dialog"><span className="ios-row-label">{workshopMomentPickerLabels[key]}</span><span className="ios-row-value">{schedule[key]}<ChevronRight size={17} /></span></button>)}
      </div>
      {editingMoment && <TimePicker label={workshopMomentPickerLabels[editingMoment]} value={schedule[editingMoment]} onCancel={() => setEditingMoment(null)} onSave={(value) => { setSchedule((current) => ({ ...current, [editingMoment]: value })); setEditingMoment(null); }} />}
      {editingTimezone && <TimezonePicker value={timezone} onCancel={() => setEditingTimezone(false)} onSave={(zone) => { setTimezone(zone); setEditingTimezone(false); }} />}
      <ShimmerButton type="button" className="account-save" onClick={() => setStep('frequency')}>Siguiente →</ShimmerButton>
    </div>
  </section>;

  if (stage === 'onboarding' && step === 'frequency') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Mensajes durante el día" subtitle="Cada día hay 32 mensajes breves para mantener tu atención. ¿Cada cuánto querés recibirlos?" onBack={onBack} onNavigate={onNavigate} />
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
        <div className="ios-row"><span className="ios-row-label">Duración</span><span className="ios-row-value ios-row-value--muted">{programDays} días</span></div>
      </div>
      {saveError && <p className="account-message">{saveError}</p>}
      <ShimmerButton type="button" className="account-save" onClick={startWorkshop} disabled={saving}>{saving ? 'Un momento…' : 'Comenzar taller'}</ShimmerButton>
    </div>
  </section>;

  if (stage === 'edit-schedule') return <section className="reader-section workshop-section">
    <FixedHeader eyebrow={`TALLER DE ${programDays} DÍAS`} title="Cambiar horarios" subtitle="Si tu día ya empezó, los cambios se aplican desde el próximo día. Tu día y tu progreso no se modifican." onBack={() => { setSaveError(''); setStage('days'); }} onNavigate={onNavigate} />
    <div className="reader-body workshop-browser">
      <div className="workshop-schedule-pills">
        <button className="workshop-schedule-pill" onClick={() => setEditingTimezone(true)} aria-haspopup="dialog"><span className="ios-row-label">Zona horaria</span><span className="ios-row-value ios-row-value--muted">{timezone.replace(/_/g, ' ')}<ChevronRight size={17} /></span></button>
        {workshopMomentKeys.map((key) => <button key={key} className="workshop-schedule-pill" onClick={() => setEditingMoment(key)} aria-label={`Cambiar horario de ${workshopMomentPickerLabels[key]}: ${schedule[key]}`} aria-haspopup="dialog"><span className="ios-row-label">{workshopMomentPickerLabels[key]}</span><span className="ios-row-value">{schedule[key]}<ChevronRight size={17} /></span></button>)}
      </div>
      <div className="ios-card workshop-pills-card">
        <p className="workshop-hint">Mensajes durante el día</p>
        <div className="workshop-pills">{workshopIntervalOptions.map((minutes) => <button key={minutes} type="button" className={`workshop-pill${messageInterval === minutes ? ' active' : ''}`} onClick={() => setMessageInterval(minutes)}>{workshopIntervalLabel(minutes)}</button>)}</div>
      </div>
      <p className="workshop-hint">No se reinicia el taller y no se vuelven a enviar entregas ya recibidas.</p>
      {saveError && <p className="account-message" role="alert">{saveError}</p>}
      <ShimmerButton type="button" className="account-save" onClick={() => void saveActiveSchedule()} disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</ShimmerButton>
    </div>
    {editingMoment && <TimePicker label={workshopMomentPickerLabels[editingMoment]} value={schedule[editingMoment]} onCancel={() => setEditingMoment(null)} onSave={(value) => { setSchedule((current) => ({ ...current, [editingMoment]: value })); setEditingMoment(null); }} />}
    {editingTimezone && <TimezonePicker value={timezone} onCancel={() => setEditingTimezone(false)} onSave={(zone) => { setTimezone(zone); setEditingTimezone(false); }} />}
  </section>;

  if (stage === 'confirmed') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="¡Listo!" subtitle="Ya está todo configurado." onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body">
      <p>¡Listo! Tu taller empieza ahora. Vas a recibir tu primera entrega en el próximo horario disponible de tu configuración. Preparate para {programDays} días de práctica.</p>
      <ShimmerButton type="button" className="account-save" onClick={() => setStage('days')}>Ver el taller</ShimmerButton>
    </div>
  </section>;

  return <section className="reader-section workshop-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title={program.title} subtitle={currentDay != null ? `Vas por el día ${currentDay} de ${programDays}.` : program.subtitle} onBack={onBack} onNavigate={onNavigate} />
    <div className="reader-body workshop-browser">
      {currentDay != null && <section className="workshop-progress-preview" aria-label={`Día ${currentDay} de ${programDays}`}>
        <div className="workshop-progress-copy"><span>Tu recorrido</span><b>Día {currentDay} de {programDays}</b><small>{Math.max(0, programDays - currentDay)} días por delante</small></div>
        <div className="workshop-progress-track" aria-hidden="true"><span style={{ width: `${Math.min(100, Math.max(0, (currentDay / programDays) * 100))}%` }} /></div>
      </section>}
      <section className="workshop-description-card" aria-labelledby={`workshop-description-${program.slug}`}>
        <span>Sobre este taller</span>
        <h3 id={`workshop-description-${program.slug}`}>{programMeta.introSubtitle}</h3>
        <div className="workshop-description-copy">
          {programMeta.introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <div className="workshop-schedule-action">
        <button type="button" className="workshop-schedule-pill" onClick={() => { setSaveError(''); setStage('edit-schedule'); }}><span className="ios-row-label">Cambiar horarios</span><span className="ios-row-value">{schedule.morning} · {schedule.noon} · {schedule.afternoon} · {schedule.night}<ChevronRight size={17} /></span></button>
      </div>
      {schedulePendingNextDay && <p className="workshop-hint">Tus nuevos horarios se aplican desde el próximo día del taller.</p>}
      {!deliveries.length && <p className="library-empty">Tu taller empieza ahora. Vas a recibir tu primera entrega en el próximo horario disponible de tu configuración.</p>}
      {!!deliveries.length && <div className="workshop-days-list">{Array.from(new Set(deliveries.map((delivery) => delivery.dayNumber))).sort((a, b) => b - a).map((dayNumber) => {
        const dayDeliveries = deliveries.filter((delivery) => delivery.dayNumber === dayNumber);
        const isOpen = openDeliveryDays[dayNumber] ?? dayNumber === currentDay;
        return <section key={dayNumber} className={`workshop-day-group${isOpen ? ' is-open' : ''}`}>
          <button type="button" className="workshop-day-toggle" aria-expanded={isOpen} onClick={() => setOpenDeliveryDays((current) => ({ ...current, [dayNumber]: !isOpen }))}>
            <span><b>Día {dayNumber}</b><small>{dayDeliveries.length} {dayDeliveries.length === 1 ? 'entrega' : 'entregas'}</small></span>
            <ChevronDown size={20} aria-hidden="true" />
          </button>
          {isOpen && <div className="library-content-list workshop-day-deliveries">{dayDeliveries.map((delivery) => {
            const isMessage = delivery.deliveryType === 'intermediate_message';
            const deliveryTitle = isMessage
              ? INTERMEDIATE_MESSAGE_TITLE
              : deliveryTypeLabels[delivery.deliveryType];
            return <MagicCard key={delivery.id} className="library-content-card workshop-delivery-card" onClick={() => openDelivery(delivery)}>
            <div><p>{isMessage ? 'MENSAJE DE GERMÁN' : deliveryTypeLabels[delivery.deliveryType].toUpperCase()}</p><b className="card-title">{deliveryTitle}</b><em className="card-subtitle">Recibido {formatDeliveredAt(delivery.deliveredAt)}</em></div>
            <span className="library-card-actions">{delivery.seenAt ? <i className="delivery-seen" aria-label="Ya visto"><Check size={16} /></i> : <i className="delivery-unseen" aria-label="Sin ver" />}<i><ChevronRight size={19} /></i></span>
          </MagicCard>})}</div>}
        </section>;
      })}</div>}
      {saveError && <p className="account-message" role="alert">{saveError}</p>}
      <button type="button" className="workshop-abandon" onClick={() => setConfirmingAbandon(true)}>Abandonar programa</button>
    </div>
    {confirmingAbandon && <ConfirmDialog
      title={`¿Querés abandonar ${program.title}?`}
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

type PropiaTema = 'Amor y relaciones' | 'Dinero y trabajo' | 'Salud y bienestar';
const propiaTemaOptions: PropiaTema[] = ['Amor y relaciones', 'Dinero y trabajo', 'Salud y bienestar'];
type PropiaDuracion = '7 días' | '15 días' | '30 días';
const propiaDuracionOptions: PropiaDuracion[] = ['7 días', '15 días', '30 días'];
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

  const needsSchedule = Boolean(duracion);

  const submit = async () => {
    const nextErrors: { tema?: string; duracion?: string } = {};
    if (!tema) nextErrors.tema = 'Elegí un tema';
    if (!duracion) nextErrors.duracion = 'Elegí una duración';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setMessage('');


    setSubmitting(true);
    try {
      const { error: enrollmentError } = await supabase.rpc('start_custom_program', { p_morning: schedule.morning, p_noon: schedule.noon, p_afternoon: schedule.afternoon, p_night: schedule.night, p_timezone: timezone, p_message_interval_minutes: frequency, p_custom_config: { tema, duracion } });
      if (enrollmentError) { setMessage(enrollmentError.code === '23505' ? 'Ya tenés un taller de práctica activo. Para comenzar otro, primero tenés que finalizar o abandonar el actual.' : enrollmentError.message); return; }
      localStorage.removeItem('german-propia-practica');
      console.log('[propia] inscripción guardada en Supabase');
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
      <div className="propia-choice-pills">
        <button type="button" className="propia-choice-pill" onClick={() => setEditingField('tema')} aria-haspopup="dialog">
          <span>Tema</span><b>{tema || 'Elegir tema'}</b><ChevronDown size={17} />
        </button>
        <button type="button" className="propia-choice-pill" onClick={() => setEditingField('duracion')} aria-haspopup="dialog">
          <span>Duración</span><b>{duracion || 'Elegir duración'}</b><ChevronDown size={17} />
        </button>
      </div>
      <div className="propia-schedule-pills">
        {needsSchedule && <button type="button" className="propia-schedule-pill" onClick={() => setEditingField('frecuencia')} aria-haspopup="dialog">
          <span className="ios-row-label">Frecuencia</span>
          <span className="ios-row-value">{workshopIntervalLabel(frequency)}<ChevronRight size={17} /></span>
        </button>}
        {needsSchedule && workshopMomentKeys.map((key) => <button key={key} type="button" className="propia-schedule-pill" onClick={() => setEditingMoment(key)} aria-label={`Cambiar horario de ${workshopMomentPickerLabels[key]}: ${schedule[key]}`} aria-haspopup="dialog">
          <span className="ios-row-label">{workshopMomentPickerLabels[key]}</span>
          <span className="ios-row-value">{schedule[key]}<ChevronRight size={17} /></span>
        </button>)}
        {needsSchedule && <button type="button" className="propia-schedule-pill" onClick={() => setEditingTimezone(true)} aria-haspopup="dialog">
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
  const queryId = new URLSearchParams(window.location.search).get('delivery');
  if (queryId) return queryId;
  const pathMatch = window.location.pathname.match(/^\/delivery\/([^/]+)$/);
  return pathMatch ? decodeURIComponent(pathMatch[1]) : null;
}

export default function TelegramMiniApp() {
  const router = useRouter();
  const initialDeliveryId = getDeliveryIdFromUrl();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [accessState, setAccessState] = useState<'checking' | 'active' | 'inactive' | 'error'>('checking');
  const [accessPermissions, setAccessPermissions] = useState<AccessPermissions>({});
  const [fullyBlocked, setFullyBlocked] = useState(false);
  const [trialExpired, setTrialExpired] = useState(false);
  const [accessTier, setAccessTier] = useState('active');
  const [trialGateOpen, setTrialGateOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [pendingDeliveryId, setPendingDeliveryId] = useState(initialDeliveryId);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);

  // Telegram abre la Mini App con ?delivery=<id>. Si la misma instancia ya estaba
  // abierta, sincronizamos el deep-link al volver a primer plano sin depender de
  // Service Worker ni de Web Push.
  useEffect(() => {
    const syncDeliveryDeepLink = () => {
      const deliveryId = getDeliveryIdFromUrl();
      if (!deliveryId) return;
      setPendingDeliveryId(deliveryId);
    };
    syncDeliveryDeepLink();
    window.addEventListener('pageshow', syncDeliveryDeepLink);
    window.addEventListener('popstate', syncDeliveryDeepLink);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncDeliveryDeepLink();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('pageshow', syncDeliveryDeepLink);
      window.removeEventListener('popstate', syncDeliveryDeepLink);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!session?.user) { setFavorites([]); return; }
    let cancelled = false;
    void (async () => {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('favorite_id,payload')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      if (cancelled) return;
      if (error) { console.error('[favorites] load error:', error); return; }

      const rows = data || [];
      const deliveryIds = rows
        .map((row) => typeof row.favorite_id === 'string' && row.favorite_id.startsWith('delivery:') ? row.favorite_id.slice('delivery:'.length) : null)
        .filter((id): id is string => Boolean(id));

      let deliveryMap = new Map<string, { day_number: number; delivery_type: TallerDeliveryType; message_index: number | null; body: string }>();
      if (deliveryIds.length) {
        const { data: deliveryRows, error: deliveryError } = await supabase
          .from('taller_deliveries')
          .select('id,day_number,delivery_type,message_index,content_items(body)')
          .eq('user_id', session.user.id)
          .in('id', deliveryIds);
        if (deliveryError) console.error('[favorites] no se pudieron completar los números de entrega:', deliveryError);
        else deliveryMap = new Map((deliveryRows || []).map((delivery) => {
          const item = delivery.content_items as unknown as { body: string } | null;
          return [delivery.id, {
            day_number: delivery.day_number,
            delivery_type: delivery.delivery_type as TallerDeliveryType,
            message_index: delivery.message_index,
            body: item?.body || '',
          }];
        }));
      }

      if (cancelled) return;
      setFavorites(rows.map((row) => {
        const favorite = row.payload as FavoriteRecord;
        if (typeof row.favorite_id !== 'string' || !row.favorite_id.startsWith('delivery:')) return favorite;
        const deliveryId = row.favorite_id.slice('delivery:'.length);
        const delivery = deliveryMap.get(deliveryId);
        // Si la entrega ya no se puede leer, se usa lo guardado, pero sin el
        // número interno que tenían los títulos viejos.
        if (!delivery) return {
          ...favorite,
          title: userFacingDeliveryTitle(favorite.title),
          reader: favorite.reader ? { ...favorite.reader, title: userFacingDeliveryTitle(favorite.reader.title) } : favorite.reader,
        };
        const label = deliveryTypeLabels[delivery.delivery_type];
        const title = delivery.delivery_type === 'intermediate_message'
          ? INTERMEDIATE_MESSAGE_TITLE
          : label;
        const detail = `Día ${delivery.day_number} · ${label}`;
        const textParagraphs = delivery.delivery_type === 'intermediate_message' && delivery.message_index != null
          ? extractDeliveryParagraphs(delivery.body, delivery.delivery_type, delivery.message_index) || []
          : [];
        const isTextMessage = delivery.delivery_type === 'intermediate_message' && textParagraphs.length > 0;
        return {
          ...favorite,
          title,
          detail,
          icon: isTextMessage ? '💬' : favorite.icon,
          reader: favorite.reader || delivery.delivery_type === 'intermediate_message' ? {
            ...(favorite.reader || {}),
            title,
            eyebrow: isTextMessage ? 'TEXTO' : (favorite.reader?.eyebrow || 'AUDIO'),
            detail,
            paragraphs: isTextMessage ? textParagraphs : (favorite.reader?.paragraphs || []),
            ...(isTextMessage ? { audioUrl: undefined } : { audioUrl: favorite.reader?.audioUrl }),
          } : undefined,
        };
      }));
    })();
    return () => { cancelled = true; };
  }, [session?.user?.id, favoritesOpen]);

  useEffect(() => {
    if (!session?.access_token) { setAccessState('checking'); return; }
    let cancelled = false;
    setAccessState('checking');
    fetch('/api/access', { headers: { Authorization: `Bearer ${session.access_token}` }, cache: 'no-store' })
      .then(async (response) => {
        const data = await response.json().catch(() => ({})) as { active?: boolean; blocked?: boolean; trialExpired?: boolean; accessTier?: string; permissions?: AccessPermissions };
        if (cancelled) return;
        if (!response.ok) return setAccessState('error');
        setAccessPermissions(data.permissions || {});
        setFullyBlocked(Boolean(data.blocked));
        setTrialExpired(Boolean(data.trialExpired));
        setAccessTier(data.accessTier || 'active');
        if (data.active) setAccessState('active');
        else setAccessState('inactive');
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
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [programConfig, setProgramConfig] = useState<ProgramPanelConfig>({ slug: 'taller-40-dias', title: 'Taller de 40 días', subtitle: 'Autoconcepto y control de la imaginación.' });
  const [courseOpen, setCourseOpen] = useState(false);
  const [interactiveBookOpen, setInteractiveBookOpen] = useState(false);
  const [preguntameOpen, setPreguntameOpen] = useState(false);
  const [blockedSection, setBlockedSection] = useState<string | null>(null);
  const [launchLocked, setLaunchLocked] = useState<{ eyebrow: string; title: string; subtitle: string } | null>(null);
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
  // Sin useMemo: depende de `screens`, que cambia cuando llegan momentNodes.
  const screen: Screen = resolveScreen(screens, tab, trail);

  const back = () => {
    if (launchLocked) return setLaunchLocked(null);
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
    const homeSafeTargets: NavTarget[] = ['home', 'espacio', 'configuracion', 'notificaciones'];
    if (trialExpired && !homeSafeTargets.includes(target)) {
      setBlockedSection(null);
      setTrialGateOpen(true);
      setMainMenu(true);
      return;
    }
    if (accessTier === 'limited' && !['home', 'talleres', 'propia', 'espacio', 'configuracion', 'notificaciones'].includes(target)) {
      const limitedLabels: Partial<Record<NavTarget, string>> = {
        favorites: 'Favoritos',
        biblioteca: 'la Biblioteca',
        audiolibros: 'los libros y audiolibros',
        meditaciones: 'Meditaciones para ahora',
        consultas: 'Consultas',
        curso: 'el Taller de 365 días',
      };
      setTrialGateOpen(false);
      setBlockedSection(limitedLabels[target] || 'esta sección');
      setMainMenu(true);
      return;
    }
    setTrialGateOpen(false);
    const permissionForTarget: Partial<Record<NavTarget, { key: SectionPermissionKey; label: string }>> = {
      audiolibros: { key: 'books', label: 'los libros y audiolibros' },
      curso: { key: 'course365', label: 'el Taller de 365 días' },
      consultas: { key: 'consultations', label: 'Consultas' },
    };
    const rule = permissionForTarget[target];
    if (rule && accessPermissions[rule.key] === false) {
      setBlockedSection(rule.label);
      return;
    }
    setBlockedSection(null);
    setLaunchLocked(null);
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
    setShowProgress(false);
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
    if (selected.launchArea && isLaunchPending(selected.launchArea)) {
      setLaunchLocked({ eyebrow: selected.reader?.eyebrow || 'PRÓXIMAMENTE', title: selected.title, subtitle: selected.detail });
      return;
    }
    if (selected.reader) return setReader(selected.reader);
    if (selected.notificationPanel) return setNotificationsOpen(true);
    if (selected.accountPanel) return setAccountOpen(true);
    if (selected.programPanel) { setProgramConfig(selected.programPanel); setWorkshopOpen(true); return; }
    if (selected.workshopPanel) return setWorkshopOpen(true);
    if (selected.title === 'Favoritos') {
      if (trialExpired) { setTrialGateOpen(true); setMainMenu(true); return; }
      if (accessTier === 'limited') { setBlockedSection('Favoritos'); setMainMenu(true); return; }
      return setFavoritesOpen(true);
    }
    if (selected.title === 'Configuración') return setConfigurationOpen(true);
    if (selected.title === 'Preguntar') return setPreguntameOpen(true);
    if (selected.children) setTrail((value) => [...value, selected]);
  };

  const toggleFavorite = async (favorite: FavoriteRecord) => {
    if (!session?.user) return;
    const exists = favorites.some((item) => item.id === favorite.id);
    const result = exists
      ? await supabase.from('user_favorites').delete().eq('user_id', session.user.id).eq('favorite_id', favorite.id)
      : await supabase.from('user_favorites').upsert({
          user_id: session.user.id,
          favorite_id: favorite.id,
          payload: favorite,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id,favorite_id' });

    if (result.error) {
      console.error('[favorites] sync error:', result.error);
      return;
    }

    setFavorites((currentFavorites) => exists
      ? currentFavorites.filter((item) => item.id !== favorite.id)
      : currentFavorites.some((item) => item.id === favorite.id)
        ? currentFavorites
        : [favorite, ...currentFavorites]);
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
        void supabase.from('profiles').update({ last_seen_at: new Date().toISOString() }).eq('id', user.id).then(({ error: seenError }) => {
          if (seenError) console.error('Error al actualizar última actividad:', seenError);
        });
      }
    } catch (err) {
      console.error('Error en syncProfile:', err);
    }
  };

  useEffect(() => {
    localStorage.removeItem('german-propia-practica');
    localStorage.removeItem('german-favorites');

    // La sesión de Supabase se restaura desde almacenamiento local. No
    // bloqueamos la primera pintura esperando perfil/red: una conexión lenta
    // no debe dejar la mini app congelada.
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
      } else {
        setFullName(null);
      }
    });

    return () => {
      clearTimeout(sessionCheckTimeout);
      listener.subscription.unsubscribe();
    };
  }, []);

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
    // Se cargan al entrar a Meditaciones (o a la Biblioteca, que las incluye).
    if (mainMenu || momentNodes.length > 0 || (tab !== 'meditaciones' && tab !== 'biblioteca')) return;
    supabase
      .from('content_items')
      .select('id,title,body,metadata,content_assets(asset_type,source_url,storage_path,duration_seconds,sort_order)')
      .eq('is_published', true)
      .eq('content_type', 'moment')
      .then(({ data, error }) => {
        if (error) { console.error('[moments] error cargando content_items:', error); return; }
        const rows = [...(data || [])].sort((a, b) => Number((a.metadata as Record<string, unknown> | null)?.sort_order || 0) - Number((b.metadata as Record<string, unknown> | null)?.sort_order || 0));
        setMomentNodes(rows.map((row, index) => {
          const metadata = row.metadata && typeof row.metadata === 'object' && !Array.isArray(row.metadata) ? row.metadata as Record<string, unknown> : {};
          const assets = Array.isArray(row.content_assets) ? row.content_assets as Array<{ asset_type?: string; source_url?: string; storage_path?: string; duration_seconds?: number; sort_order?: number }> : [];
          const audioAssets = assets.filter((item) => item.asset_type === 'audio').sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
          const meditationTitles = Array.isArray(metadata.meditation_titles)
            ? metadata.meditation_titles.filter((value): value is string => typeof value === 'string' && value.trim().length > 0).slice(0, 5)
            : [];
          const children: DeckItem[] = meditationTitles.map((title, meditationIndex) => {
            const asset = audioAssets.find((item) => Number(item.sort_order || 0) === meditationIndex + 1);
            const audioUrl = asset?.source_url || (asset?.storage_path ? `https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/${asset.storage_path}` : undefined);
            return {
              icon: '▶️',
              title,
              detail: isLaunchPending('meditaciones') ? 'Disponible el domingo 27' : 'Meditación para ahora',
              availability: isLaunchPending('meditaciones'),
              audioCue: true,
              tone: palette[meditationIndex % palette.length],
              launchArea: 'meditaciones',
              reader: {
                title,
                eyebrow: 'MEDITACIÓN PARA AHORA',
                detail: row.title || 'Meditación para ahora',
                paragraphs: [],
                audioUrl,
                duration: asset?.duration_seconds ? `${Math.round(asset.duration_seconds / 60)} min` : undefined,
              },
            };
          });
          return {
            icon: momentIcons[index] || '✨',
            title: row.title || 'Meditación',
            detail: isLaunchPending('meditaciones') ? 'Disponible el domingo 27' : 'Elegí una meditación',
            availability: isLaunchPending('meditaciones'),
            tone: palette[index % palette.length],
            // Versionada para no depender de una copia vieja en la caché del WebView de Telegram.
            image: `/images/meditacion-${String(index + 1).padStart(2, '0')}.webp?v=${MEDITATION_IMAGE_VERSION}`,
            children,
          } as DeckItem;
        }));
      });
  }, [mainMenu, tab, momentNodes.length]);

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
      .select('id,title,excerpt,content_type,metadata,published_at,content_assets(asset_type,source_url,storage_path,duration_seconds,sort_order)')
      .eq('is_published', true)
      .in('content_type', ['conference', 'book'])
      .order('published_at', { ascending: false })
      .limit(1000)
      .then(({ data, error }) => {
        if (error) { console.error('[library] error cargando content_items:', error); return; }
        if (!data) return;
        setLibraryItems(data.map((value) => {
          const item = value as Record<string, unknown>;
          // Audio actual de la conferencia (si tiene): primer asset 'audio' por sort_order.
          const assets = Array.isArray(item.content_assets) ? item.content_assets as Array<{ asset_type?: string; source_url?: string; storage_path?: string; duration_seconds?: number; sort_order?: number }> : [];
          const audioAsset = assets.filter((asset) => asset.asset_type === 'audio').sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))[0];
          const audioUrl = audioAsset?.source_url && !audioAsset.source_url.startsWith('storage://')
            ? audioAsset.source_url
            : audioAsset?.storage_path
              ? `https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/${audioAsset.storage_path}`
              : undefined;
          return {
            id: String(item.id),
            title: firstText(item, ['title', 'name']) || 'Sin título',
            excerpt: firstText(item, ['excerpt', 'description', 'summary']) || '',
            body: '',
            type: firstText(item, ['content_type', 'type', 'category']) || 'Contenido',
            tags: toTags(item.tags || item.tag_list || item.labels || item.topics),
            year: extractConferenceYear(item),
            audioUrl,
            duration: audioAsset?.duration_seconds ? `${Math.round(audioAsset.duration_seconds / 60)} min` : undefined,
          };
        }));
      }, (err: unknown) => console.error('[library] excepción cargando content_items:', err));
  }, [mainMenu, tab, libraryItems.length]);

  const openLibraryEntry = async (entry: LibraryEntry, searchQuery?: string, mode: 'audio' | 'text' = 'text') => {
    if (mode === 'audio') {
      setReader({
        title: entry.title,
        eyebrow: 'AUDIO',
        detail: entry.excerpt || 'Biblioteca',
        paragraphs: [],
        audioUrl: entry.audioUrl,
        duration: entry.duration,
        highlightQuery: searchQuery,
      });
      return;
    }

    const { data, error } = await supabase
      .from('content_items')
      .select('body,excerpt')
      .eq('id', entry.id)
      .maybeSingle();

    if (error) {
      console.error('[library] error cargando texto:', error);
      setReader({
        title: entry.title,
        eyebrow: 'TEXTO',
        detail: entry.excerpt || 'Biblioteca',
        paragraphs: [entry.excerpt || 'No pudimos cargar este texto. Probá nuevamente.'],
        highlightQuery: searchQuery,
      });
      return;
    }

    const body = typeof data?.body === 'string' ? data.body : '';
    const excerpt = typeof data?.excerpt === 'string' ? data.excerpt : entry.excerpt;
    setReader({
      title: entry.title,
      eyebrow: 'TEXTO',
      detail: excerpt || 'Biblioteca',
      paragraphs: cleanParagraphs(body || excerpt || ''),
      highlightQuery: searchQuery,
    });
  };

  // Compatibilidad con notificaciones antiguas que todavía abren /?delivery=<id>.
  // Todas las entregas deben resolverse en la pantalla dedicada /delivery/<id>,
  // nunca dentro del Reader/taller general.
  useEffect(() => {
    if (!session?.user || accessState !== 'active' || !pendingDeliveryId) return;
    const deliveryId = pendingDeliveryId;
    setPendingDeliveryId(null);
    router.replace(`/delivery/${encodeURIComponent(deliveryId)}`);
  }, [session?.user, accessState, pendingDeliveryId, router]);

  // Esperamos a saber si hay sesión antes de decidir la siguiente pantalla.
  // Mientras tanto mostramos el loader AG; ya no hay video de presentación.
  if (!sessionChecked) return <AudioWaveLoader label="Preparando Asistente Germán" />;
  if (!session) return <LoginGate redirectPath="/telegram" />;
  if (accessState === 'checking') return <AudioWaveLoader label="Cargando tu espacio" />;
  if (accessState === 'error') return <main className="app-shell app-main section-app"><div className="access-loading"><p>No pudimos comprobar tu acceso.</p><button type="button" onClick={() => window.location.reload()}>Reintentar</button></div></main>;
  if (fullyBlocked || accessPermissions.all === false) return <AccessPaywall />;
  // La home siempre queda visible. El vencimiento del trial se aplica recién al
  // intentar entrar a una sección de contenido.
  if (accessState === 'inactive' && !trialExpired) return <AccessPaywall />;
  if (trialGateOpen) return <TrialEndedScreen onBack={() => { setTrialGateOpen(false); setMainMenu(true); }} />;
  if (blockedSection) return <AccessPaywall section={blockedSection} onBack={() => setBlockedSection(null)} />;
  if (pendingDeliveryId) return <AudioWaveLoader label="Abriendo tu práctica" />;
  const dock = <MainNavigationDock current={mainMenu ? "home" : configurationOpen ? "configuracion" : tab} onSelect={navigateTo} />;

  if (mainMenu) {
    const courseCard = { target: 'curso' as const, title: 'Taller de 365 días', detail: 'Ley de Asunción · recorrido completo.', renewal: renewalCopyByTarget.curso, image: '/images/german-reunion.webp' };
    const welcomeItems = mainCategories.map(([target, , title, detail]) => ({ target, title, detail, renewal: renewalCopyByTarget[target], image: target === 'espacio' ? '/images/german-perfil.webp' : target === 'biblioteca' ? '/images/german-biblioteca.webp' : target === 'audiolibros' ? '/images/german-audiolibros.webp' : target === 'talleres' ? '/images/german-practicas.webp' : target === 'propia' ? '/images/german-propia.webp' : target === 'meditaciones' ? '/images/german-meditaciones.webp' : target === 'consultas' ? '/images/german-consultas.webp' : undefined }));
    const meditIndex = welcomeItems.findIndex((item) => item.target === 'meditaciones');
    const items = [...welcomeItems.slice(0, meditIndex + 1), courseCard, ...welcomeItems.slice(meditIndex + 1)];
    return <main className="app-shell app-main section-app day-one-screen welcome-carousel-screen"><section className="day-one-section"><header className="assistant-welcome">{fullName ? <p>Hola, {fullName}</p> : null}<h1>¿Por dónde<strong>empezamos?</strong></h1></header><DayOneCarousel autoPlay={false} label="Secciones de Germán Asistente" items={items} initialIndex={mainCardIndexRef.current} onIndexChange={(index) => { mainCardIndexRef.current = index; }} onSelect={(item, index) => { mainCardIndexRef.current = index; navigateTo(item.target); }} /></section>{dock}</main>;
  }
  if (interactiveBookOpen) return <main className="app-shell app-main section-app"><InteractiveBookIntro onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (courseOpen) return <main className="app-shell app-main section-app"><LawCoursePanel user={session.user} onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (accountOpen && session?.user) return <main className="app-shell app-main section-app"><AccountPanel user={session.user} fullName={fullName} onBack={back} onNavigate={navigateTo} onNameSaved={setFullName} onLogout={logout} />{dock}</main>;
  if (launchLocked) return <main className="app-shell app-main section-app"><LaunchPendingPanel eyebrow={launchLocked.eyebrow} title={launchLocked.title} subtitle={launchLocked.subtitle} onBack={() => setLaunchLocked(null)} onNavigate={(target) => { setLaunchLocked(null); navigateTo(target); }} />{dock}</main>;
  if (selectedAudiobook) return <main className="app-shell app-main section-app"><AudiobookReader book={selectedAudiobook} onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (reader) { const favorite = deckFavorite({ icon: '📖', title: reader.title, detail: reader.detail, tone: palette[0], reader }); return <main className="app-shell app-main section-app"><Reader content={reader} onBack={back} onNavigate={navigateTo} favorite={favorites.some((item) => item.title === reader.title)} onFavorite={() => { const exact = favorites.find((item) => item.title === reader.title); toggleFavorite(exact || favorite); }} />{dock}</main>; }
  if (favoritesOpen) return <main className="app-shell app-main section-app"><FavoritesPanel favorites={favorites} onBack={back} onNavigate={navigateTo} onOpen={(favorite) => { if (favorite.reader) setReader(favorite.reader); }} onRemove={toggleFavorite} />{dock}</main>;
  if (workshopOpen) return <main className="app-shell app-main section-app"><WorkshopPanel user={session.user} program={programConfig} onBack={back} onNavigate={navigateTo} onRead={setReader} />{dock}</main>;
  if (notificationsOpen) return <main className="app-shell app-main section-app"><NotificationsPanel onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (configurationOpen) return <main className="app-shell app-main section-app"><ConfigurationPanel onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (preguntameOpen) return <main className="app-shell app-main section-app preguntame-shell"><PreguntamePanel user={session.user} onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (tab === 'audiolibros' && !trail.length) {
    return <main className="app-shell app-main section-app"><AudiobookLibraryPanel entries={audiobookItems} loading={audiobooksLoading} error={audiobooksError} onBack={back} onNavigate={navigateTo} onOpen={(entry) => { touchContentProgress(session.user.id, `audiobook:${entry.id}`, 'audiobook'); setSelectedAudiobook(entry); }} />{dock}</main>;
  }
  if (tab === 'biblioteca' && !trail.length) return <main className="app-shell app-main section-app"><LibraryPanel entries={libraryItems} onBack={back} onNavigate={navigateTo} favorites={favorites} onToggleFavorite={toggleFavorite} booksAllowed={accessPermissions.books !== false} onBooksBlocked={() => setBlockedSection('los libros y audiolibros')} onRead={(entry, searchQuery, mode) => { void openLibraryEntry(entry, searchQuery, mode); }} />{dock}</main>;
  if (showProgress) return <main className="app-shell app-main section-app"><ProgressScreen user={session.user} onBack={() => setShowProgress(false)} onNavigate={navigateTo} />{dock}</main>;
  if (tab === 'espacio' && !trail.length) return <main className="app-shell app-main section-app"><ProfileScreen user={session.user} items={screens.espacio.items} onSelect={select} onBack={back} onNavigate={navigateTo} onOpenProgress={() => setShowProgress(true)} />{dock}</main>;
  if (tab === 'consultas' && !trail.length) return <main className="app-shell app-main section-app preguntame-shell"><PreguntamePanel user={session.user} onBack={back} onNavigate={navigateTo} />{dock}</main>;
  if (tab === 'propia' && !trail.length) return <main className="app-shell app-main section-app"><PropiaPracticaPanel user={session.user} onBack={back} onNavigate={navigateTo} onRead={setReader} />{dock}</main>;
  if (tab === 'talleres' && !trail.length) {
    const guidedItems = screen.items.map((item) => item.title === 'Práctica de 7 días'
      ? { ...item, image: '/images/interno-7dias.webp' }
      : item.title === 'Práctica de 15 días'
        ? { ...item, image: '/images/interno-15dias.webp' }
        : item.title === 'Prácticas de 40 días'
          ? { ...item, image: '/images/interno-40dias.webp' }
          : item);
    const guidedCarouselKey = 'talleres-guiadas';
    return <main className="app-shell app-main section-app day-one-screen photo-cards-screen guided-photo-screen"><section className="day-one-section"><FixedHeader eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} onBack={back} onNavigate={navigateTo} /><DayOneCarousel key={guidedCarouselKey} label="Prácticas guiadas" items={guidedItems} initialIndex={carouselIndicesRef.current[guidedCarouselKey] ?? 0} onIndexChange={(index) => { carouselIndicesRef.current[guidedCarouselKey] = index; }} onSelect={(item, index) => { carouselIndicesRef.current[guidedCarouselKey] = index; select(item); }} /></section>{dock}</main>;
  }
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
    || (tab === 'meditaciones' && trail.length === 0);
  // "Meditaciones para ahora" ya trae su propia imagen en cada DeckItem
  // (momentNodes, asignada por posición 1..15), así que no se pisa acá.
  const meditacionesPhotoScreen = tab === 'meditaciones' && trail.length === 0;
  const meditationDetailScreen = tab === 'meditaciones' && trail.length > 0;
  return <main className={`app-shell app-main section-app day-one-screen${photoCardsScreen ? ' photo-cards-screen' : ''}${meditacionesPhotoScreen ? ' meditaciones-photo-screen' : ''}${meditationDetailScreen ? ' meditation-detail-screen' : ''}`}><section className="day-one-section"><FixedHeader eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} onBack={back} onNavigate={navigateTo} /><DayOneCarousel key={carouselKey} label={screen.title} items={screen.items.map((item) => item.accountPanel ? { ...item, image: '/images/mi-cuenta-acceso.webp' } : item.title === 'Favoritos' ? { ...item, image: '/images/favoritos-guardados.webp' } : item.title === 'Estado' ? { ...item, image: '/images/mi-avance-progreso.webp' } : item.title === 'Configuración' ? { ...item, image: '/images/configuracion-horarios-zona.webp' } : item.title === 'Activar notificaciones' ? { ...item, image: '/images/activar-notificaciones.webp' } : item.title === 'Horarios de práctica' ? { ...item, image: '/images/horarios-practica.webp' } : item.title === 'Preferencias' ? { ...item, image: '/images/preferencias-avisos.webp' } : item.title === 'Prácticas de 7 días' ? { ...item, image: '/images/interno-7dias.webp' } : item.title === 'Prácticas de 15 días' ? { ...item, image: '/images/interno-15dias.webp' } : item.title === 'Prácticas de 40 días' ? { ...item, image: '/images/interno-40dias.webp' } : item.title === 'Amor y relaciones' ? { ...item, image: '/images/interno-amor.webp' } : item.title === 'Dinero y trabajo' ? { ...item, image: '/images/interno-dinero.webp' } : item.title === 'Salud y bienestar' ? { ...item, image: '/images/interno-salud.webp' } : item.title === 'Preguntar' ? { ...item, image: '/images/interno-preguntar.webp' } : item.title === 'Escuchar' ? { ...item, image: '/images/interno-escuchar.webp' } : item.title === 'Guardadas' ? { ...item, image: '/images/interno-guardadas.webp' } : item)} initialIndex={carouselIndicesRef.current[carouselKey] ?? 0} onIndexChange={(index) => { carouselIndicesRef.current[carouselKey] = index; }} onSelect={(item, index) => { carouselIndicesRef.current[carouselKey] = index; select(item); }} isFavorite={(item) => item.reader ? favorites.some((favorite) => favorite.id === deckFavorite(item).id) : undefined} onFavorite={(item) => toggleFavorite(deckFavorite(item))} /></section>{dock}</main>;
}
