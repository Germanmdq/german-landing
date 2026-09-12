'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { UserRound, Clock3, Settings2, TrendingUp, MessageCircle, SlidersHorizontal, Flower2, Route, Bookmark, Sun, Moon, X, Headphones, Sparkles, Bell, BookOpen, ChevronRight, Heart, LogOut, Pause, Play, Search, Trash2, Check } from 'lucide-react';
import content from './content.generated.json';
import { supabase } from './lib/supabase';
import { subscribeToPush, ensurePushSubscription, disablePushSubscription, getPushSubscriptionActive, type WorkshopSchedule } from './lib/push';
import { MagicCard, ShimmerButton } from './components/magic-ui';
import './magic-ui.css';
import './modern-ui.css';
import './components/day-one-carousel.css';
import { DayOneCarousel } from './components/day-one-carousel';
import { TimePicker } from './components/time-picker';
import { TimezonePicker } from './components/timezone-picker';

type Tab = 'talleres' | 'propia' | 'meditaciones' | 'biblioteca' | 'consultas' | 'espacio';
type ReaderContent = { title: string; eyebrow: string; detail: string; paragraphs: string[]; audioUrl?: string; duration?: string; audios?: { label: string; url: string }[] };
type DeckItem = { icon: string; title: string; detail: string; tone: string; image?: string; imageSize?: 'compact'; children?: DeckItem[]; reader?: ReaderContent; notificationPanel?: boolean; accountPanel?: boolean; workshopPanel?: boolean; action?: 'logout' };
type LibraryEntry = { id: string; title: string; excerpt: string; body: string; type: string; tags: string[]; audioUrl?: string; duration?: string };
type FavoriteRecord = { id: string; title: string; detail: string; icon: string; tone: string; reader?: ReaderContent };
type Screen = { eyebrow: string; title: string; subtitle: string; items: DeckItem[] };
type TallerDeliveryType = 'meditation_morning' | 'meditation_noon' | 'meditation_afternoon' | 'meditation_night' | 'intermediate_message';
type TallerDelivery = { id: string; dayNumber: number; deliveryType: TallerDeliveryType; deliveredAt: string; seenAt: string | null; title: string; paragraphs: string[]; audioUrl?: string };
const deliveryMomentPatterns: Partial<Record<TallerDeliveryType, RegExp>> = {
  meditation_morning: /ma(ñ|n)ana/i,
  meditation_noon: /mediod(í|i)a/i,
  meditation_afternoon: /tarde/i,
  meditation_night: /noche/i,
};
const extractMeditationSection = (body: string, deliveryType: TallerDeliveryType): string[] | null => {
  const momentPattern = deliveryMomentPatterns[deliveryType];
  if (!momentPattern) return null;
  const lines = body.split('\n');
  let capturing = false;
  const captured: string[] = [];
  for (const line of lines) {
    const isHeader = /^#{1,6}\s+/.test(line);
    if (isHeader) {
      if (capturing) break;
      if (/medita/i.test(line) && momentPattern.test(line)) capturing = true;
      continue;
    }
    if (capturing) captured.push(line);
  }
  const text = captured.join('\n').trim();
  return text ? cleanParagraphs(text) : null;
};
const findNumberedMessage = (body: string, index: number): string[] | null => {
  const blocks = body.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  const pattern = new RegExp(`^0*${index}\\.\\s*`);
  const block = blocks.find((candidate) => pattern.test(candidate));
  if (!block) return null;
  const text = block.replace(pattern, '').trim();
  return text ? [text] : null;
};

const palette = ['#D92D35', '#E5484D', '#F2555A', '#FF6B6F'];
const icons = ['●', '◆', '✦', '○'];
const cleanParagraphs = (text: string) => text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
const deliveryTypeLabels: Record<TallerDeliveryType, string> = { meditation_morning: 'Meditación de la mañana', meditation_noon: 'Meditación del mediodía', meditation_afternoon: 'Meditación de la tarde', meditation_night: 'Meditación de la noche', intermediate_message: 'Mensaje' };
const formatDeliveredAt = (iso: string) => new Date(iso).toLocaleString('es-AR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const leaf = (title: string, index: number, detail = ''): DeckItem => ({ icon: icons[index % icons.length], title, detail, tone: palette[index % palette.length] });
const toTags = (value: unknown): string[] => Array.isArray(value) ? value.filter((tag): tag is string => typeof tag === 'string') : typeof value === 'string' ? value.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
const firstText = (record: Record<string, unknown>, keys: string[]) => keys.map((key) => record[key]).find((value): value is string => typeof value === 'string' && value.length > 0);
const deckFavorite = (item: DeckItem): FavoriteRecord => ({ id: `deck:${item.title}`, title: item.title, detail: item.detail, icon: item.icon, tone: item.tone, reader: item.reader });
const libraryFavorite = (entry: LibraryEntry): FavoriteRecord => ({ id: `library:${entry.id}`, title: entry.title, detail: entry.excerpt || 'Biblioteca', icon: entry.audioUrl ? '🎙️' : '📖', tone: palette[0], reader: { title: entry.title, eyebrow: entry.type.toUpperCase(), detail: entry.excerpt || 'Biblioteca', paragraphs: cleanParagraphs(entry.body || entry.excerpt || ''), audioUrl: entry.audioUrl, duration: entry.duration } });

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
  image: index === 0 ? '/images/antes-reunion-entrevista-examen.png' : index === 1 ? '/images/cuando-te-agarro-la-ansiedad.png' : index === 2 ? '/images/cuando-no-podes-parar-la-cabeza-para-dormir.png' : index === 3 ? '/images/cuando-te-peleaste-con-alguien.png' : index === 4 ? '/images/cuando-te-llego-una-mala-noticia.png' : index === 5 ? '/images/antes-de-tomar-una-decision-dificil.png' : index === 6 ? '/images/cuando-te-sentis-solo.png' : index === 7 ? '/images/cuando-estas-bajoneado-sin-saber-por-que.png' : index === 8 ? '/images/antes-de-hablar-en-publico.png' : index === 9 ? '/images/cuando-te-ataca-la-culpa.png' : index === 10 ? '/images/para-arrancar-el-dia-con-fuerza.png' : index === 11 ? '/images/para-cerrar-el-dia-en-paz.png' : index === 12 ? '/images/cuando-tenes-miedo-de-algo.png' : index === 13 ? '/images/cuando-queres-sentirte-mejor-rapido.png' : '/images/cuando-necesitas-un-envion-de-seguridad.png',
  reader: { title: moment.title, eyebrow: 'MEDITACIÓN PARA AHORA', detail: 'Leé la práctica a tu ritmo.', paragraphs: cleanParagraphs(moment.text) },
}));

const screens: Record<Tab, Screen> = {
  talleres: { eyebrow: 'PRÁCTICAS GUIADAS', title: 'Elegí una práctica', subtitle: 'Recorridos preparados para acompañarte paso a paso.', items: [
    { icon: '🌱', title: 'Prácticas de 7 días', detail: 'Amor, salud y dinero.', tone: palette[0], children: planNodes },
    { icon: '🌿', title: 'Prácticas de 15 días', detail: 'Amor, salud y dinero.', tone: palette[1] },
    { icon: '🌳', title: 'Prácticas de 40 días', detail: 'Autoconcepto y control de la imaginación.', tone: palette[2], workshopPanel: true },
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
  espacio: { eyebrow: 'MI PERFIL', title: 'Tu espacio', subtitle: 'Tu cuenta y tus elecciones.', items: [
    { icon: '👤', title: 'Mi cuenta', detail: 'Nombre, mail, suscripción y acceso.', tone: palette[0], accountPanel: true },
    { icon: '⭐', title: 'Favoritos', detail: 'Prácticas, audios y lecturas guardadas.', tone: palette[1] },
    { icon: '📈', title: 'Mi avance', detail: 'Progreso real de tus prácticas.', tone: palette[2] },
    { icon: '⚙️', title: 'Configuración', detail: 'Horarios, zona y apariencia.', tone: palette[3] },
  ] },
};

const mainCategories: Array<[Tab, string, string, string, string]> = [
  ['espacio', '👋', 'Mi perfil', 'Tu cuenta, favoritos y configuración.', palette[0]],
  ['biblioteca', '📚', 'Biblioteca', 'Audios, lecturas y conferencias.', palette[1]],
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
      <span className="category-icon"><CategoryIcon item={item} /></span>
      <p><small>{item.children || item.reader || item.notificationPanel || item.accountPanel || item.workshopPanel || item.action ? 'ABRIR' : 'OPCIÓN'}</small><b>{item.title}</b>{item.detail && <em>{item.detail}</em>}</p>
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

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button className="header-close" onClick={onClose} aria-label="Cerrar">
      <X size={16} strokeWidth={2.4} />
    </button>
  );
}

function FixedHeader({ eyebrow, title, subtitle, onBack }: { eyebrow: string; title: string; subtitle: string; onBack: () => void }) {
  return <header className="feature-header"><CloseButton onClose={onBack} /><p>{eyebrow}</p><h1>{title}</h1><small>{subtitle}</small></header>;
}

function ToggleSwitch({ checked, onChange, disabled, label }: { checked: boolean; onChange: () => void; disabled?: boolean; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className={`ios-toggle${checked ? ' is-on' : ''}`} onClick={onChange} disabled={disabled}>
    <span className="ios-toggle-thumb" />
  </button>;
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

function WeeklyMeetingPanel({ onBack }: { onBack: () => void }) {
  return <section className="reader-section">
    <FixedHeader eyebrow="EN VIVO" title="Reunión semanal" subtitle="Nos vemos en vivo cada semana." onBack={onBack} />
    <div className="reader-body meeting-panel">
      <div className="meeting-schedule"><Clock3 size={20} /><span>Todos los jueves a las 20:00 hs (Argentina)</span></div>
      <a className="meeting-join" href="https://meet.google.com/PLACEHOLDER" target="_blank" rel="noopener noreferrer">Unirme a la reunión</a>
    </div>
  </section>;
}

function NotificationsPanel({ onBack }: { onBack: () => void }) {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
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
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted' && 'serviceWorker' in navigator) await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
  };
  return <section className="reader-section">
    <FixedHeader eyebrow="NOTIFICACIONES" title="Tus horarios" subtitle="Los horarios quedan guardados en este dispositivo." onBack={onBack} />
    <div className="reader-body notification-settings">
      {permission !== 'unsupported' && <ShimmerButton className="notification-permission" onClick={requestPermission}><Bell size={18} />{permission === 'granted' ? 'Notificaciones activadas' : permission === 'denied' ? 'Permiso bloqueado en el navegador' : 'Activar notificaciones'}</ShimmerButton>}
      {(Object.keys(timeLabels) as (keyof typeof times)[]).map((key) => <button key={key} className="notification-time-row" onClick={() => setEditingTime(key)} aria-label={`Cambiar horario de ${timeLabels[key]}: ${times[key]}`} aria-haspopup="dialog"><span>{timeLabels[key]}</span><span className="notification-time-value">{times[key]}<ChevronRight size={17} /></span></button>)}
      {editingTime && <TimePicker label={timeLabels[editingTime]} value={times[editingTime]} onCancel={() => setEditingTime(null)} onSave={(value) => { updateTime(editingTime, value); setEditingTime(null); }} />}
    </div>
  </section>;
}

function ProfileScreen({ user, items, onSelect, onBack }: { user: User; items: DeckItem[]; onSelect: (item: DeckItem) => void; onBack: () => void }) {
  const notifications = useNotificationsToggle(user);
  return <section className="reader-section">
    <FixedHeader eyebrow="MI PERFIL" title="Tu espacio" subtitle="Tu cuenta y tus elecciones." onBack={onBack} />
    <div className="reader-body">
      <div className="ios-card">
        {items.map((item) => <button key={item.title} className="ios-row" onClick={() => onSelect(item)}>
          <span className="ios-row-label">{item.title}</span>
          <span className="ios-row-value ios-row-value--muted"><ChevronRight size={17} /></span>
        </button>)}
        <div className="ios-row">
          <span className="ios-row-label">Notificaciones</span>
          {notifications.loading ? <span className="ios-toggle-placeholder" aria-hidden="true" /> : <ToggleSwitch checked={notifications.active} onChange={notifications.toggle} disabled={notifications.busy} label="Notificaciones" />}
        </div>
      </div>
      {notifications.error && <p className="account-message">{notifications.error}</p>}
    </div>
  </section>;
}

function Reader({ content: reader, onBack, favorite, onFavorite }: { content: ReaderContent; onBack: () => void; favorite: boolean; onFavorite: () => void }) {
  return <section className="reader-section"><FixedHeader eyebrow={reader.eyebrow} title={reader.title} subtitle={reader.detail} onBack={onBack} /><article className="reader-body"><button className={`reader-favorite${favorite ? ' is-favorite' : ''}`} onClick={onFavorite}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} />{favorite ? 'Guardado en favoritos' : 'Guardar en favoritos'}</button>{reader.audioUrl && <AudioPlayer title={reader.title} audioUrl={reader.audioUrl} durationLabel={reader.duration} />}{reader.audios?.map((audio) => <AudioPlayer key={audio.label} title={audio.label} audioUrl={audio.url} />)}{reader.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article></section>;
}

function AccountPanel({ user, fullName, onBack, onNameSaved, onLogout }: { user: User; fullName: string | null; onBack: () => void; onNameSaved: (name: string) => void; onLogout: () => void }) {
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
    <FixedHeader eyebrow="MI PERFIL" title="Mi cuenta" subtitle="Tus datos y tu acceso a la aplicación." onBack={onBack} />
    <div className="reader-body account-settings">
      <label>Correo electrónico<input value={user.email || ''} readOnly aria-readonly="true" /></label>
      <label>Nombre<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></label>
      <ShimmerButton className="account-save" onClick={save} disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</ShimmerButton>
      {message && <p className="account-message">{message}</p>}
      <section className="subscription-card"><p> SUSCRIPCIÓN</p><b>Plan gratuito</b><span>Tu cuenta está activa. Los próximos planes pagos aparecerán acá.</span></section>
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

function highlightText(text: string, q: string): React.ReactNode {
  if (!q || !text) return text;
  const idx = text.toLocaleLowerCase().indexOf(q.toLocaleLowerCase());
  if (idx === -1) return text;
  return <>{text.slice(0, idx)}<mark style={{ background: '#FFF3CD', padding: 0, borderRadius: 2 }}>{text.slice(idx, idx + q.length)}</mark>{text.slice(idx + q.length)}</>;
}

function snippetAround(text: string, q: string, radius = 60): string {
  if (!q || !text) return '';
  const lower = text.toLocaleLowerCase();
  const idx = lower.indexOf(q.toLocaleLowerCase());
  if (idx === -1) return '';
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + q.length + radius);
  return (start > 0 ? '...' : '') + text.slice(start, end).trim() + (end < text.length ? '...' : '');
}

function LibraryPanel({ entries, onBack, onRead, favorites, onToggleFavorite }: { entries: LibraryEntry[]; onBack: () => void; onRead: (entry: LibraryEntry) => void; favorites: FavoriteRecord[]; onToggleFavorite: (favorite: FavoriteRecord) => void }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Conferencias');
  const filters = ['Conferencias', 'Audios'];
  const visible = entries.filter((entry) => {
    const q = query.trim().toLocaleLowerCase();
    const matchesQuery = !q || (
      (entry.title && entry.title.toLocaleLowerCase().includes(q)) ||
      (entry.excerpt && entry.excerpt.toLocaleLowerCase().includes(q)) ||
      (entry.body && entry.body.toLocaleLowerCase().includes(q))
    );
    const matchesFilter = (filter === 'Conferencias' && /conference|conferencia/i.test(entry.type)) || (filter === 'Audios' && Boolean(entry.audioUrl));
    return matchesQuery && matchesFilter;
  });
  const q = query.trim();
  return <section className="reader-section library-section">
    <FixedHeader eyebrow="PARA ESCUCHAR Y LEER" title="Tu biblioteca" subtitle="Buscá por conferencia, tema o etiqueta." onBack={onBack} />
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
        <div className="library-filters">{filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
      </section>
      <p className="library-count">{visible.length} {visible.length === 1 ? 'resultado' : 'resultados'}</p>
      <div className="library-content-list">{visible.map((entry, index) => {
        const saved = favorites.some((favorite) => favorite.id === libraryFavorite(entry).id);
        let preview: React.ReactNode = entry.excerpt || 'Abrí para leer o escuchar.';
        if (q) {
          const titleHasMatch = entry.title?.toLocaleLowerCase().includes(q.toLocaleLowerCase());
          const excerptSnippet = snippetAround(entry.excerpt || '', q);
          const bodySnippet = snippetAround(entry.body || '', q);
          const contextText = excerptSnippet || bodySnippet;
          if (contextText) {
            preview = highlightText(contextText, q);
          } else if (!titleHasMatch) {
            preview = entry.excerpt || 'Abrí para leer o escuchar.';
          }
        }
        return <MagicCard key={entry.id} delay={Math.min(index * .025, .2)} className="library-content-card" onClick={() => onRead(entry)}>
          <div>
            <p>{entry.type || 'Contenido'}</p>
            <b>{q ? highlightText(entry.title, q) : entry.title}</b>
            <em>{preview}</em>
          </div>
          <span className="library-card-actions">
            <span role="button" tabIndex={0} className={`favorite-button${saved ? ' is-favorite' : ''}`} onClick={(event) => { event.stopPropagation(); onToggleFavorite(libraryFavorite(entry)); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); onToggleFavorite(libraryFavorite(entry)); } }} aria-label={saved ? `Quitar ${entry.title} de favoritos` : `Guardar ${entry.title} en favoritos`}>
              <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
            </span>
            <i><ChevronRight size={19} /></i>
          </span>
        </MagicCard>;
      })}</div>
      {!visible.length && <p className="library-empty">No se encontraron resultados</p>}
    </div>
  </section>;
}

function ConfirmDialog({ title = '¿Eliminar?', description, confirmLabel = 'Eliminar', cancelLabel = 'Cancelar', onConfirm, onCancel }: { title?: string; description: string; confirmLabel?: string; cancelLabel?: string; onConfirm: () => void; onCancel: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    element?.showModal();
    return () => { element?.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="confirm-sheet" aria-labelledby="confirm-sheet-title" onCancel={(event) => { event.preventDefault(); onCancel(); }} onClick={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
    <div className="confirm-sheet-content">
      <div className="time-sheet-handle" aria-hidden="true" />
      <h2 id="confirm-sheet-title">{title}</h2>
      <p>{description}</p>
      <button type="button" className="confirm-sheet-danger" onClick={onConfirm}>{confirmLabel}</button>
      <button type="button" className="confirm-sheet-cancel" onClick={onCancel}>{cancelLabel}</button>
    </div>
  </dialog>;
}

function FavoritesPanel({ favorites, onBack, onOpen, onRemove }: { favorites: FavoriteRecord[]; onBack: () => void; onOpen: (favorite: FavoriteRecord) => void; onRemove: (favorite: FavoriteRecord) => void }) {
  const [pendingRemoval, setPendingRemoval] = useState<FavoriteRecord | null>(null);
  return <section className="reader-section favorites-section">
    <FixedHeader eyebrow="MI PERFIL" title="Favoritos" subtitle="Todo lo que guardaste, reunido en un solo lugar." onBack={onBack} />
    <div className="reader-body favorites-browser">
      {!favorites.length && <div className="favorites-empty"><Heart size={30} /><b>Todavía no guardaste nada</b><p>Tocá el corazón de cualquier tarjeta para encontrarla después acá.</p></div>}
      {favorites.map((favorite, index) => <MagicCard key={favorite.id} delay={index * .04} className="favorite-content-card" onClick={() => onOpen(favorite)} style={{ '--category-tone': favorite.tone } as React.CSSProperties}><span>{favorite.icon}</span><div><small>FAVORITO</small><b>{favorite.title}</b><em>{favorite.detail}</em></div><span role="button" tabIndex={0} className="remove-favorite" onClick={(event) => { event.stopPropagation(); setPendingRemoval(favorite); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); setPendingRemoval(favorite); } }} aria-label={`Quitar ${favorite.title} de favoritos`}><Trash2 size={18} /></span></MagicCard>)}
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

type WorkshopStage = 'loading' | 'onboarding' | 'confirmed' | 'days' | 'error';
type WorkshopOnboardingStep = 'intro' | 'schedule' | 'frequency' | 'summary';

function WorkshopPanel({ user, onBack, onRead }: { user: User; onBack: () => void; onRead: (reader: ReaderContent) => void }) {
  const [deliveries, setDeliveries] = useState<TallerDelivery[]>([]);
  const [collectionId, setCollectionId] = useState<string | null>(null);
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
  const notifications = useNotificationsToggle(user);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        console.log('[workshop] buscando collection taller-40-dias…');
        const { data: collection, error: collectionError } = await supabase
          .from('collections')
          .select('id')
          .eq('slug', 'taller-40-dias')
          .maybeSingle();
        if (cancelled) return;
        if (collectionError) { console.error('[workshop] error buscando collection:', collectionError); setLoadError(collectionError.message); setStage('error'); return; }
        if (!collection) { console.error('[workshop] no existe la collection taller-40-dias'); setLoadError('No encontramos el taller.'); setStage('error'); return; }
        setCollectionId(collection.id);

        console.log('[workshop] buscando user_plan_progress para', user.id);
        const { data: progress, error: progressError } = await supabase
          .from('user_plan_progress')
          .select('current_day')
          .eq('user_id', user.id)
          .eq('collection_id', collection.id)
          .maybeSingle();
        if (cancelled) return;
        if (progressError) { console.error('[workshop] error buscando user_plan_progress:', progressError); setLoadError(progressError.message); setStage('error'); return; }
        if (!progress) { console.log('[workshop] sin progreso todavía -> onboarding'); setStage('onboarding'); return; }
        setCurrentDay(progress.current_day);

        console.log('[workshop] buscando taller_deliveries…');
        const { data: deliveryRows, error: deliveryError } = await supabase
          .from('taller_deliveries')
          .select('id,day_number,delivery_type,delivered_at,seen_at,message_index,content_items(title,body),content_assets(source_url)')
          .eq('user_id', user.id)
          .order('delivered_at', { ascending: false });
        if (cancelled) return;
        if (deliveryError) { console.error('[workshop] error buscando taller_deliveries:', deliveryError); setLoadError(deliveryError.message); setStage('error'); return; }
        console.log('[workshop] entregas encontradas:', deliveryRows?.length ?? 0);

        const mapped = (deliveryRows || []).map((row) => {
          const item = row.content_items as unknown as { title: string; body: string } | null;
          const asset = row.content_assets as unknown as { source_url: string } | null;
          const deliveryType = row.delivery_type as TallerDeliveryType;
          const body = item?.body || '';
          const paragraphs = deliveryType === 'intermediate_message'
            ? (row.message_index != null ? findNumberedMessage(body, row.message_index) : null)
            : extractMeditationSection(body, deliveryType);
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
  }, [user.id]);

  const startWorkshop = async () => {
    if (!collectionId) return;
    setSaving(true);
    setSaveError('');
    const subscribeResult = await subscribeToPush(user, { ...schedule, timezone, messageIntervalMinutes: messageInterval }, collectionId);
    if (subscribeResult.error) {
      setSaving(false);
      setSaveError(subscribeResult.error);
      return;
    }
    const { error: progressError } = await supabase.from('user_plan_progress').insert({ user_id: user.id, collection_id: collectionId, current_day: 1 });
    setSaving(false);
    if (progressError) { setSaveError(progressError.message); return; }
    setCurrentDay(1);
    setStage('confirmed');
  };

  const openDelivery = (delivery: TallerDelivery) => {
    onRead({ title: `Día ${delivery.dayNumber} · ${deliveryTypeLabels[delivery.deliveryType]}`, eyebrow: 'TALLER DE 40 DÍAS', detail: `Recibido ${formatDeliveredAt(delivery.deliveredAt)}.`, paragraphs: delivery.paragraphs, audioUrl: delivery.audioUrl });
    if (!delivery.seenAt) {
      const seenAt = new Date().toISOString();
      setDeliveries((current) => current.map((item) => item.id === delivery.id ? { ...item, seenAt } : item));
      void supabase.from('taller_deliveries').update({ seen_at: seenAt }).eq('id', delivery.id);
    }
  };

  if (stage === 'loading') return <section className="reader-section workshop-section"><FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Taller de 40 días" subtitle="Autoconcepto y control de la imaginación." onBack={onBack} /><div className="reader-body workshop-browser"><p className="library-empty">Cargando el taller…</p></div></section>;

  if (stage === 'error') return <section className="reader-section workshop-section"><FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Taller de 40 días" subtitle="Autoconcepto y control de la imaginación." onBack={onBack} /><div className="reader-body workshop-browser"><p className="library-empty">No pudimos cargar el taller. Probá de nuevo más tarde.{loadError ? ` (${loadError})` : ''}</p></div></section>;

  if (stage === 'onboarding' && step === 'intro') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Taller de Autoconcepto" subtitle="40 días para transformar cómo te ves y cómo ves la vida." onBack={onBack} />
    <div className="reader-body">
      <p>Este es un recorrido de 40 días diseñado para volver a tu fuente. Cada día vas a recibir 4 meditaciones guiadas — una a la mañana, al mediodía, a la tarde y a la noche — que te van a acompañar a reconstruir tu autoconcepto desde adentro.</p>
      <p>Además, durante el día vas a recibir mensajes breves con frases e ideas para mantener tu atención enfocada. Vos elegís cada cuánto te llegan.</p>
      <p>No tenés que hacer nada más que escuchar y estar presente. Todo te llega por notificación, en el momento justo.</p>
      <ShimmerButton type="button" className="account-save" onClick={() => setStep('schedule')}>Comenzar configuración →</ShimmerButton>
    </div>
  </section>;

  if (stage === 'onboarding' && step === 'schedule') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Elegí tus horarios" subtitle="¿A qué hora querés recibir cada meditación?" onBack={onBack} />
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
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Mensajes durante el día" subtitle="Cada día hay ~26 mensajes breves para mantener tu atención. ¿Cada cuánto querés recibirlos?" onBack={onBack} />
    <div className="reader-body">
      <div className="ios-card workshop-pills-card">
        <div className="workshop-pills">{workshopIntervalOptions.map((minutes) => <button key={minutes} type="button" className={`workshop-pill${messageInterval === minutes ? ' active' : ''}`} onClick={() => setMessageInterval(minutes)}>{workshopIntervalLabel(minutes)}</button>)}</div>
      </div>
      <p className="workshop-hint">Los mensajes llegarían entre las {shiftHours(schedule.morning, 1)} y las {shiftHours(schedule.night, -1)}.</p>
      <ShimmerButton type="button" className="account-save" onClick={() => setStep('summary')}>Siguiente →</ShimmerButton>
    </div>
  </section>;

  if (stage === 'onboarding') return <section className="reader-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Tu taller está listo" subtitle="Revisá la configuración antes de empezar." onBack={onBack} />
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
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="¡Listo!" subtitle="Ya está todo configurado." onBack={onBack} />
    <div className="reader-body">
      <p>¡Listo! Tu primera práctica llega mañana a las {schedule.morning}. Preparate para 40 días que te van a cambiar la mirada.</p>
      <ShimmerButton type="button" className="account-save" onClick={() => setStage('days')}>Ver el taller</ShimmerButton>
    </div>
  </section>;

  return <section className="reader-section workshop-section">
    <FixedHeader eyebrow="PRÁCTICAS GUIADAS" title="Taller de 40 días" subtitle={currentDay != null ? `Vas por el día ${currentDay} de 40.` : 'Autoconcepto y control de la imaginación.'} onBack={onBack} />
    <div className="reader-body workshop-browser">
      <div className="ios-card">
        <div className="ios-row"><span className="ios-row-label">Notificaciones</span>{notifications.loading ? <span className="ios-toggle-placeholder" aria-hidden="true" /> : <ToggleSwitch checked={notifications.active} onChange={notifications.toggle} disabled={notifications.busy} label="Notificaciones" />}</div>
      </div>
      {!notifications.loading && !notifications.active && <p className="workshop-notifications-warning">Sin notificaciones no vas a recibir las prácticas.</p>}
      {!deliveries.length && <p className="library-empty">Tu taller comienza pronto. Vas a recibir tu primera práctica en tu próximo horario configurado.</p>}
      {!!deliveries.length && <div className="library-content-list">{deliveries.map((delivery) => <MagicCard key={delivery.id} className="library-content-card" onClick={() => openDelivery(delivery)}>
        <div>
          <p>DÍA {delivery.dayNumber} · {deliveryTypeLabels[delivery.deliveryType].toUpperCase()}</p>
          <b>{deliveryTypeLabels[delivery.deliveryType]}</b>
          <em>Recibido {formatDeliveredAt(delivery.deliveredAt)}</em>
        </div>
        <span className="library-card-actions">{delivery.seenAt ? <i className="delivery-seen" aria-label="Ya visto"><Check size={16} /></i> : <i className="delivery-unseen" aria-label="Sin ver" />}<i><ChevronRight size={19} /></i></span>
      </MagicCard>)}</div>}
    </div>
  </section>;
}

function VideoIntro({ onFinish }: { onFinish: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
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
    video.src = '/videos/video-german-white.mp4?v=2';
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
      video.pause();
      if (video.parentNode === container) {
        container.removeChild(video);
      }
    };
  }, []);

  return <div ref={containerRef} className="video-intro" onClick={() => onFinishRef.current()} />;
}

function GermanBadge() {
  return <div className="gate-german"><img src="/images/german-welcome.png" alt="Germán saludando" /></div>;
}

function LoginGate() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async () => {
    setBusy(true);
    setMessage('');
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/` : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) {
      setBusy(false);
      setMessage(error.message);
    }
  };

  return (
    <main className="app-shell gate-screen login-gate">
      <GermanBadge />
      <h1>Ingresá a tu espacio</h1>
      {message && <p className="form-message">{message}</p>}
      <ShimmerButton type="button" className="gate-primary" style={{ marginTop: '24px' }} onClick={submit} disabled={busy}>
        {busy ? 'Un momento…' : 'Continuar con Google'}
      </ShimmerButton>
    </main>
  );
}

export default function App() {
  // El splash SIEMPRE se muestra al abrir la app (una vez por carga real de
  // página, como el splash nativo de una app de iPhone) — sin sessionStorage
  // ni flags que lo salteen, ni siquiera al volver de un redirect de OAuth.
  const [introDone, setIntroDone] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [pendingDeliveryId, setPendingDeliveryId] = useState(() => (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('delivery') : null));
  const [session, setSession] = useState<Session | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [mainMenu, setMainMenu] = useState(true);
  const [tab, setTab] = useState<Tab>('biblioteca');
  const [trail, setTrail] = useState<DeckItem[]>([]);
  const [reader, setReader] = useState<ReaderContent | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);
  const [libraryItems, setLibraryItems] = useState<LibraryEntry[]>([]);
  const mainCardIndexRef = useRef(0);
  const carouselIndicesRef = useRef<Record<string, number>>({});
  const current = trail.at(-1);
  const screen = useMemo<Screen>(() => {
    if (current) return { eyebrow: trail.length === 1 ? screens[tab].title.toUpperCase() : trail.at(-2)?.title.toUpperCase() || screens[tab].eyebrow, title: current.title, subtitle: current.detail, items: current.children || [] };
    return screens[tab];
  }, [current, tab, trail]);

  const back = () => {
    if (reader) return setReader(null);
    if (notificationsOpen) return setNotificationsOpen(false);
    if (accountOpen) return setAccountOpen(false);
    if (favoritesOpen) return setFavoritesOpen(false);
    if (workshopOpen) return setWorkshopOpen(false);
    if (meetingOpen) { setMeetingOpen(false); return setMainMenu(true); }
    if (trail.length) return setTrail((value) => value.slice(0, -1));
    setMainMenu(true);
  };

  const logout = () => {
    void supabase.auth.signOut().finally(() => {
      setSession(null);
      setFullName(null);
      setTrail([]);
      setAccountOpen(false);
      setNotificationsOpen(false);
      setFavoritesOpen(false);
      setWorkshopOpen(false);
      setMeetingOpen(false);
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
    if (selected.workshopPanel) return setWorkshopOpen(true);
    if (selected.title === 'Favoritos') return setFavoritesOpen(true);
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

    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        await syncProfile(data.session.user);
      }
      setSessionChecked(true);
    }).catch((err) => {
      console.error('[auth] error obteniendo la sesión:', err);
      setSessionChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        await syncProfile(nextSession.user);
      } else {
        setFullName(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

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
          };
        }));
      }, (err: unknown) => console.error('[library] excepción cargando content_items:', err));
  }, []);

  // Deep link desde una notificación push (sw.js abre /?delivery=<id>): en
  // cuanto haya sesión, buscamos esa entrega puntual y vamos directo al
  // Reader, saltando el carrusel de bienvenida.
  useEffect(() => {
    if (!session?.user || !pendingDeliveryId) return;
    let cancelled = false;
    (async () => {
      try {
        console.log('[deep-link] abriendo entrega', pendingDeliveryId);
        const { data: row, error } = await supabase
          .from('taller_deliveries')
          .select('id,day_number,delivery_type,delivered_at,seen_at,message_index,content_items(title,body),content_assets(source_url)')
          .eq('id', pendingDeliveryId)
          .maybeSingle();
        if (cancelled) return;
        if (error || !row) { console.error('[deep-link] no se pudo cargar la entrega:', error); return; }
        const item = row.content_items as unknown as { title: string; body: string } | null;
        const asset = row.content_assets as unknown as { source_url: string } | null;
        const deliveryType = row.delivery_type as TallerDeliveryType;
        const body = item?.body || '';
        const paragraphs = deliveryType === 'intermediate_message'
          ? (row.message_index != null ? findNumberedMessage(body, row.message_index) : null)
          : extractMeditationSection(body, deliveryType);
        setMainMenu(false);
        setReader({
          title: `Día ${row.day_number} · ${deliveryTypeLabels[deliveryType]}`,
          eyebrow: 'TALLER DE 40 DÍAS',
          detail: `Recibido ${formatDeliveredAt(row.delivered_at)}.`,
          paragraphs: paragraphs || [],
          audioUrl: asset?.source_url,
        });
        if (!row.seen_at) void supabase.from('taller_deliveries').update({ seen_at: new Date().toISOString() }).eq('id', row.id);
      } catch (err) {
        console.error('[deep-link] excepción abriendo la entrega:', err);
      } finally {
        if (!cancelled) {
          setPendingDeliveryId(null);
          if (typeof window !== 'undefined') window.history.replaceState({}, '', window.location.pathname);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [session?.user, pendingDeliveryId]);

  if (!introDone) return <VideoIntro onFinish={() => setIntroDone(true)} />;
  if (!sessionChecked) return null;
  if (!session) return <LoginGate />;

  if (mainMenu) {
    const meetingCard = { target: 'reunion' as const, title: 'Reunión semanal', detail: 'Encontrémonos en vivo.', image: '/images/reunion-semanal.png' };
    const welcomeItems = mainCategories.map(([target, , title, detail]) => ({ target, title, detail, image: target === 'espacio' ? '/images/mi-perfil-mujer-movil-serena.png' : target === 'biblioteca' ? '/images/biblioteca-lectora.png' : target === 'talleres' ? '/images/practicas-guiadas-hombre.png' : target === 'propia' ? '/images/tu-propia-practica-mujer.png' : target === 'meditaciones' ? '/images/meditaciones-hombre.png' : target === 'consultas' ? '/images/hablemos.png' : undefined }));
    const meditIndex = welcomeItems.findIndex((item) => item.target === 'meditaciones');
    const items = [...welcomeItems.slice(0, meditIndex + 1), meetingCard, ...welcomeItems.slice(meditIndex + 1)];
    return <main className="app-shell app-main section-app day-one-screen welcome-carousel-screen"><section className="day-one-section"><header className="assistant-welcome">{fullName ? <p>Hola, {fullName}</p> : null}<h1>Bienvenido a<strong>Germán Asistente</strong></h1></header><DayOneCarousel label="Secciones de Germán Asistente" items={items} initialIndex={mainCardIndexRef.current} onIndexChange={(index) => { mainCardIndexRef.current = index; }} onSelect={(item, index) => { mainCardIndexRef.current = index; if (item.target === 'reunion') { setMeetingOpen(true); setMainMenu(false); return; } setTab(item.target); setTrail([]); setReader(null); setMainMenu(false); }} /></section></main>;
  }
  if (meetingOpen) return <main className="app-shell app-main section-app"><WeeklyMeetingPanel onBack={back} /></main>;
  if (accountOpen && session?.user) return <main className="app-shell app-main section-app"><AccountPanel user={session.user} fullName={fullName} onBack={back} onNameSaved={setFullName} onLogout={logout} /></main>;
  if (reader) { const favorite = deckFavorite({ icon: '📖', title: reader.title, detail: reader.detail, tone: palette[0], reader }); return <main className="app-shell app-main section-app"><Reader content={reader} onBack={back} favorite={favorites.some((item) => item.title === reader.title)} onFavorite={() => { const exact = favorites.find((item) => item.title === reader.title); toggleFavorite(exact || favorite); }} /></main>; }
  if (favoritesOpen) return <main className="app-shell app-main section-app"><FavoritesPanel favorites={favorites} onBack={back} onOpen={(favorite) => { if (favorite.reader) setReader(favorite.reader); }} onRemove={toggleFavorite} /></main>;
  if (workshopOpen) return <main className="app-shell app-main section-app"><WorkshopPanel user={session.user} onBack={back} onRead={setReader} /></main>;
  if (tab === 'biblioteca' && !trail.length) return <main className="app-shell app-main section-app"><LibraryPanel entries={libraryItems} onBack={back} favorites={favorites} onToggleFavorite={toggleFavorite} onRead={(entry) => setReader({ title: entry.title, eyebrow: entry.type.toUpperCase(), detail: entry.excerpt || 'Biblioteca', paragraphs: cleanParagraphs(entry.body || entry.excerpt || ''), audioUrl: entry.audioUrl, duration: entry.duration })} /></main>;
  if (tab === 'espacio' && !trail.length) return <main className="app-shell app-main section-app"><ProfileScreen user={session.user} items={screens.espacio.items} onSelect={select} onBack={back} /></main>;
  if (notificationsOpen) return <main className="app-shell app-main section-app"><NotificationsPanel onBack={back} /></main>;
  if (current?.title === 'Día 1') {
    const carouselKey = `${tab}-${trail.map((item) => item.title).join('/')}-dia1`;
    return <main className="app-shell app-main section-app day-one-screen"><section className="day-one-section"><FixedHeader eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} onBack={back} /><DayOneCarousel key={carouselKey} items={screen.items} initialIndex={carouselIndicesRef.current[carouselKey] ?? 0} onIndexChange={(index) => { carouselIndicesRef.current[carouselKey] = index; }} onSelect={(item, index) => { carouselIndicesRef.current[carouselKey] = index; select(item); }} isFavorite={(item) => item.reader ? favorites.some((favorite) => favorite.id === deckFavorite(item).id) : undefined} onFavorite={(item) => toggleFavorite(deckFavorite(item))} /></section></main>;
  }
  const carouselKey = `${tab}-${trail.map((item) => item.title).join('/')}`;
  return <main className="app-shell app-main section-app day-one-screen"><section className="day-one-section"><FixedHeader eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} onBack={back} /><DayOneCarousel key={carouselKey} label={screen.title} items={screen.items.map((item) => item.accountPanel ? { ...item, image: '/images/mi-cuenta-acceso.png' } : item.title === 'Favoritos' ? { ...item, image: '/images/favoritos-guardados.png' } : item.title === 'Mi avance' ? { ...item, image: '/images/mi-avance-progreso.png' } : item.title === 'Configuración' ? { ...item, image: '/images/configuracion-horarios-zona.png' } : item.title === 'Activar notificaciones' ? { ...item, image: '/images/activar-notificaciones.png' } : item.title === 'Horarios de práctica' ? { ...item, image: '/images/horarios-practica.png' } : item.title === 'Preferencias' ? { ...item, image: '/images/preferencias-avisos.png' } : item.title === 'Prácticas de 7 días' ? { ...item, image: '/images/practicas-7-dias.png' } : item.title === 'Prácticas de 15 días' ? { ...item, image: '/images/practicas-15-dias.png' } : item.title === 'Prácticas de 40 días' ? { ...item, image: '/images/practicas-40-dias.png' } : item.title === 'Antes de una reunion, entrevista o examen' ? { ...item, image: '/images/antes-reunion-entrevista-examen.png' } : item.title === 'Cuando te agarro la ansiedad' ? { ...item, image: '/images/cuando-te-agarro-la-ansiedad.png' } : item.title === 'Cuando no podes parar la cabeza para dormir' ? { ...item, image: '/images/cuando-no-podes-parar-la-cabeza-para-dormir.png' } : item.title === 'Cuando te peleaste con alguien' ? { ...item, image: '/images/cuando-te-peleaste-con-alguien.png' } : item.title === 'Cuando te llego una mala noticia' ? { ...item, image: '/images/cuando-te-llego-una-mala-noticia.png' } : item.title === 'Antes de tomar una decision dificil' ? { ...item, image: '/images/antes-de-tomar-una-decision-dificil.png' } : item.title === 'Cuando te sentis solo' ? { ...item, image: '/images/cuando-te-sentis-solo.png' } : item.title === 'Cuando estas bajoneado sin saber por que' ? { ...item, image: '/images/cuando-estas-bajoneado-sin-saber-por-que.png' } : item.title === 'Antes de hablar en publico' ? { ...item, image: '/images/antes-de-hablar-en-publico.png' } : item.title === 'Cuando te ataca la culpa' ? { ...item, image: '/images/cuando-te-ataca-la-culpa.png' } : item.title === 'Para arrancar el dia con fuerza' ? { ...item, image: '/images/para-arrancar-el-dia-con-fuerza.png' } : item.title === 'Para cerrar el dia en paz' ? { ...item, image: '/images/para-cerrar-el-dia-en-paz.png' } : item.title === 'Cuando tenes miedo de algo' ? { ...item, image: '/images/cuando-tenes-miedo-de-algo.png' } : item.title === 'Cuando queres sentirte mejor rapido' ? { ...item, image: '/images/cuando-queres-sentirte-mejor-rapido.png' } : item.title === 'Cuando necesitas un envion de seguridad' ? { ...item, image: '/images/cuando-necesitas-un-envion-de-seguridad.png' } : item.title === 'Preguntar' ? { ...item, image: '/images/preguntar.png' } : item.title === 'Escuchar' ? { ...item, image: '/images/escuchar.png' } : item.title === 'Guardadas' ? { ...item, image: '/images/guardadas.png' } : item.title === 'Objetivo' ? { ...item, image: '/images/objetivo.png' } : item.title === 'Duración' ? { ...item, image: '/images/duracion.png' } : item.title === 'Momento' ? { ...item, image: '/images/momento.png' } : item)} initialIndex={carouselIndicesRef.current[carouselKey] ?? 0} onIndexChange={(index) => { carouselIndicesRef.current[carouselKey] = index; }} onSelect={(item, index) => { carouselIndicesRef.current[carouselKey] = index; select(item); }} isFavorite={(item) => item.reader ? favorites.some((favorite) => favorite.id === deckFavorite(item).id) : undefined} onFavorite={(item) => toggleFavorite(deckFavorite(item))} /></section></main>;
}
