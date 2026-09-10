'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { UserRound, Clock3, Settings2, TrendingUp, MessageCircle, SlidersHorizontal, Flower2, Route, Bookmark, Sun, Moon, ChevronLeft, Headphones, Sparkles, Bell, BookOpen, ChevronRight, Heart, LogOut, Pause, Play, Search, Trash2 } from 'lucide-react';
import content from './content.generated.json';
import { supabase } from './lib/supabase';
import { MagicCard, ShimmerButton } from './components/magic-ui';
import './magic-ui.css';
import './modern-ui.css';
import './components/day-one-carousel.css';
import { DayOneCarousel } from './components/day-one-carousel';
import { SearchPopup } from './components/search-popup';
import { TimePicker } from './components/time-picker';

type Tab = 'talleres' | 'propia' | 'meditaciones' | 'biblioteca' | 'consultas' | 'notificaciones' | 'espacio';
type ReaderContent = { title: string; eyebrow: string; detail: string; paragraphs: string[]; audioUrl?: string; duration?: string };
type DeckItem = { icon: string; title: string; detail: string; tone: string; image?: string; imageSize?: 'compact'; children?: DeckItem[]; reader?: ReaderContent; notificationPanel?: boolean; accountPanel?: boolean; action?: 'logout' };
type LibraryEntry = { id: string; title: string; excerpt: string; body: string; type: string; tags: string[]; audioUrl?: string; duration?: string };
type FavoriteRecord = { id: string; title: string; detail: string; icon: string; tone: string; reader?: ReaderContent };
type Screen = { eyebrow: string; title: string; subtitle: string; items: DeckItem[] };

const palette = ['#D92D35', '#E5484D', '#F2555A', '#FF6B6F'];
const icons = ['●', '◆', '✦', '○'];
const cleanParagraphs = (text: string) => text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
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
  image: index === 0 ? '/images/antes-reunion-entrevista-examen.png' : index === 1 ? '/images/cuando-te-agarro-la-ansiedad.png' : index === 2 ? '/images/cuando-no-podes-parar-la-cabeza-para-dormir.png' : index === 4 ? '/images/cuando-te-llego-una-mala-noticia.png' : index === 5 ? '/images/antes-de-tomar-una-decision-dificil.png' : undefined,
  imageSize: (index === 0 || index === 1 || index === 2 || index === 4 || index === 5) ? ('compact' as const) : undefined,
  reader: { title: moment.title, eyebrow: 'MEDITACIÓN PARA AHORA', detail: 'Leé la práctica a tu ritmo.', paragraphs: cleanParagraphs(moment.text) },
}));

const screens: Record<Tab, Screen> = {
  talleres: { eyebrow: 'PRÁCTICAS GUIADAS', title: 'Elegí una práctica', subtitle: 'Recorridos preparados para acompañarte paso a paso.', items: [
    { icon: '🌱', title: 'Prácticas de 7 días', detail: 'Amor, salud y dinero.', tone: palette[0], children: planNodes },
    { icon: '🌿', title: 'Prácticas de 15 días', detail: 'Amor, salud y dinero.', tone: palette[1] },
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
    { icon: '👤', title: 'Mi cuenta', detail: 'Nombre, mail, suscripción y acceso.', tone: palette[0], accountPanel: true },
    { icon: '⭐', title: 'Favoritos', detail: 'Prácticas, audios y lecturas guardadas.', tone: palette[1] },
    { icon: '📈', title: 'Mi avance', detail: 'Progreso real de tus prácticas.', tone: palette[2] },
    { icon: '⚙️', title: 'Configuración', detail: 'Horarios, zona y apariencia.', tone: palette[3] },
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
      <p><small>{item.children || item.reader || item.notificationPanel || item.accountPanel || item.action ? 'ABRIR' : 'OPCIÓN'}</small><b>{item.title}</b>{item.detail && <em>{item.detail}</em>}</p>
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

function BackButton({ onBack }: { onBack: () => void }) {
  return <button className="header-back" onClick={onBack} aria-label="Volver"><ChevronLeft size={22} /><span>Volver</span></button>;
}

function FixedHeader({ eyebrow, title, subtitle, onBack }: { eyebrow: string; title: string; subtitle: string; onBack: () => void }) {
  return <header className="feature-header"><BackButton onBack={onBack} /><p>{eyebrow}</p><h1>{title}</h1><small>{subtitle}</small></header>;
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
    if (result === 'granted' && 'serviceWorker' in navigator) await navigator.serviceWorker.register('/sw.js');
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

function Reader({ content: reader, onBack, favorite, onFavorite }: { content: ReaderContent; onBack: () => void; favorite: boolean; onFavorite: () => void }) {
  return <section className="reader-section"><FixedHeader eyebrow={reader.eyebrow} title={reader.title} subtitle={reader.detail} onBack={onBack} /><article className="reader-body"><button className={`reader-favorite${favorite ? ' is-favorite' : ''}`} onClick={onFavorite}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} />{favorite ? 'Guardado en favoritos' : 'Guardar en favoritos'}</button>{reader.audioUrl && <AudioPlayer title={reader.title} audioUrl={reader.audioUrl} durationLabel={reader.duration} />}{reader.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article></section>;
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

function LibraryPanel({ entries, onBack, onRead, favorites, onToggleFavorite }: { entries: LibraryEntry[]; onBack: () => void; onRead: (entry: LibraryEntry) => void; favorites: FavoriteRecord[]; onToggleFavorite: (favorite: FavoriteRecord) => void }) {
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [filter, setFilter] = useState('Todo');
  const tags = Array.from(new Set(entries.flatMap((entry) => entry.tags))).slice(0, 12);
  const filters = ['Todo', 'Conferencias', 'Audios', ...tags];
  const visible = entries.filter((entry) => {
    const haystack = `${entry.title} ${entry.excerpt} ${entry.type} ${entry.tags.join(' ')}`.toLocaleLowerCase();
    const matchesQuery = haystack.includes(query.trim().toLocaleLowerCase());
    const matchesFilter = filter === 'Todo' || (filter === 'Conferencias' && /conference|conferencia/i.test(entry.type)) || (filter === 'Audios' && Boolean(entry.audioUrl)) || entry.tags.some((tag) => tag.toLocaleLowerCase() === filter.toLocaleLowerCase());
    return matchesQuery && matchesFilter;
  });
  const featuredAudio = visible.find((entry) => entry.audioUrl) || entries.find((entry) => entry.audioUrl);
  return <section className="reader-section library-section">
    <FixedHeader eyebrow="PARA ESCUCHAR Y LEER" title="Tu biblioteca" subtitle="Buscá por conferencia, tema o etiqueta." onBack={onBack} />
    <div className="reader-body library-browser">
      <section className="library-controls">
        <div className="library-search-toolbar"><button className="search-trigger" onClick={() => setSearchOpen(true)} aria-haspopup="dialog"><span>{query || 'Buscar'}</span><Search size={20} /></button>{query && <button className="search-reset" onClick={() => setQuery('')}>Limpiar búsqueda</button>}</div>{searchOpen && <SearchPopup value={query} onClose={() => setSearchOpen(false)} onApply={(value) => { setQuery(value); setSearchOpen(false); }} />}
        <div className="library-filters">{filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
      </section>
      {featuredAudio?.audioUrl && <section className="library-featured-audio"><p>REPRODUCIR AHORA</p><AudioPlayer title={featuredAudio.title} audioUrl={featuredAudio.audioUrl} durationLabel={featuredAudio.duration} /></section>}
      <p className="library-count">{visible.length} {visible.length === 1 ? 'resultado' : 'resultados'}</p>
      <div className="library-content-list">{visible.map((entry, index) => { const saved = favorites.some((favorite) => favorite.id === libraryFavorite(entry).id); return <MagicCard key={entry.id} delay={Math.min(index * .025, .2)} className="library-content-card" onClick={() => onRead(entry)}><span>{entry.audioUrl ? '🎙️' : <BookOpen size={22} />}</span><div><p>{entry.type || 'Contenido'}</p><b>{entry.title}</b><em>{entry.excerpt || 'Abrí para leer o escuchar.'}</em><small>{entry.tags.map((tag) => `#${tag}`).join(' ')}</small></div><span className="library-card-actions"><span role="button" tabIndex={0} className={`favorite-button${saved ? ' is-favorite' : ''}`} onClick={(event) => { event.stopPropagation(); onToggleFavorite(libraryFavorite(entry)); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); onToggleFavorite(libraryFavorite(entry)); } }} aria-label={saved ? `Quitar ${entry.title} de favoritos` : `Guardar ${entry.title} en favoritos`}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></span><i><ChevronRight size={19} /></i></span></MagicCard>; })}</div>
      {!visible.length && <p className="library-empty">No encontramos contenidos con esa búsqueda.</p>}
    </div>
  </section>;
}

function FavoritesPanel({ favorites, onBack, onOpen, onRemove }: { favorites: FavoriteRecord[]; onBack: () => void; onOpen: (favorite: FavoriteRecord) => void; onRemove: (favorite: FavoriteRecord) => void }) {
  return <section className="reader-section favorites-section">
    <FixedHeader eyebrow="MI PERFIL" title="Favoritos" subtitle="Todo lo que guardaste, reunido en un solo lugar." onBack={onBack} />
    <div className="reader-body favorites-browser">
      {!favorites.length && <div className="favorites-empty"><Heart size={30} /><b>Todavía no guardaste nada</b><p>Tocá el corazón de cualquier tarjeta para encontrarla después acá.</p></div>}
      {favorites.map((favorite, index) => <MagicCard key={favorite.id} delay={index * .04} className="favorite-content-card" onClick={() => onOpen(favorite)} style={{ '--category-tone': favorite.tone } as React.CSSProperties}><span>{favorite.icon}</span><div><small>FAVORITO</small><b>{favorite.title}</b><em>{favorite.detail}</em></div><span role="button" tabIndex={0} className="remove-favorite" onClick={(event) => { event.stopPropagation(); onRemove(favorite); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); onRemove(favorite); } }} aria-label={`Quitar ${favorite.title} de favoritos`}><Trash2 size={18} /></span></MagicCard>)}
    </div>
  </section>;
}

function VideoIntro({ onFinish }: { onFinish: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

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
      onFinish();
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
  }, [onFinish]);

  return <div ref={containerRef} className="video-intro" onClick={onFinish} />;
}

function GermanBadge() {
  return <div className="gate-german"><img src="/images/german-welcome.png" alt="Germán saludando" /></div>;
}

function LoginGate() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;
    setBusy(true);
    setMessage('');
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/` : undefined;
    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
    setBusy(false);
    if (error) {
      setMessage(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <main className="app-shell gate-screen login-gate">
      <GermanBadge />
      <h1>Ingresá a tu espacio</h1>
      {sent ? (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p className="gate-copy" style={{ color: 'var(--ui-ink)', fontWeight: 500 }}>
            Te enviamos un link a tu email. Revisá tu bandeja.
          </p>
          <button
            type="button"
            className="gate-secondary"
            style={{ marginTop: '16px', cursor: 'pointer' }}
            onClick={() => setSent(false)}
          >
            Usar otro correo
          </button>
        </div>
      ) : (
        <form className="login-form" onSubmit={submit} style={{ marginTop: '24px' }}>
          <label>
            Correo electrónico
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="vos@email.com"
            />
          </label>
          {message && <p className="form-message">{message}</p>}
          <ShimmerButton className="gate-primary" disabled={busy}>
            {busy ? 'Un momento…' : 'Continuar'}
          </ShimmerButton>
        </form>
      )}
    </main>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [mainMenu, setMainMenu] = useState(true);
  const [tab, setTab] = useState<Tab>('biblioteca');
  const [trail, setTrail] = useState<DeckItem[]>([]);
  const [reader, setReader] = useState<ReaderContent | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);
  const [libraryItems, setLibraryItems] = useState<LibraryEntry[]>([]);
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
            auth_provider: 'email',
            full_name: null,
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
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    const savedFavorites = localStorage.getItem('german-favorites');
    if (savedFavorites) {
      try { setFavorites(JSON.parse(savedFavorites) as FavoriteRecord[]); } catch { localStorage.removeItem('german-favorites'); }
    }

    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        await syncProfile(data.session.user);
      }
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
      .eq('content_assets.asset_type', 'audio')
      .order('published_at', { ascending: false })
      .limit(250)
      .then(({ data }) => {
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
      });
  }, []);

  if (!introDone) return <VideoIntro onFinish={() => setIntroDone(true)} />;

  // Temporalmente omitido para verificar cambios directamente en el panel principal:
  // if (!session) return <LoginGate />;

  if (mainMenu) {
    const meetingCard = { target: 'reunion' as const, title: 'Reunión semanal', detail: 'Encontrémonos en vivo.', image: '/images/reunion-semanal.png' };
    const welcomeItems = mainCategories.map(([target, , title, detail]) => ({ target, title, detail, image: target === 'espacio' ? '/images/mi-perfil-mujer-movil-serena.png' : target === 'notificaciones' ? '/images/notificaciones.png' : target === 'biblioteca' ? '/images/biblioteca-lectora.png' : target === 'talleres' ? '/images/practicas-guiadas-hombre.png' : target === 'propia' ? '/images/tu-propia-practica-mujer.png' : target === 'meditaciones' ? '/images/meditaciones-hombre.png' : target === 'consultas' ? '/images/consultas-mujer.png' : undefined, imageSize: ['espacio', 'biblioteca', 'talleres'].includes(target) ? 'compact' as const : undefined }));
    const meditIndex = welcomeItems.findIndex((item) => item.target === 'meditaciones');
    const items = [...welcomeItems.slice(0, meditIndex + 1), meetingCard, ...welcomeItems.slice(meditIndex + 1)];
    return <main className="app-shell app-main section-app day-one-screen welcome-carousel-screen"><section className="day-one-section"><header className="assistant-welcome">{fullName ? <p>Hola, {fullName}</p> : null}<h1>Bienvenido a<strong>Germán Asistente</strong></h1></header><DayOneCarousel label="Secciones de Germán Asistente" items={items} onSelect={(item) => { if (item.target === 'reunion') { setMeetingOpen(true); setMainMenu(false); return; } setTab(item.target); setTrail([]); setReader(null); setMainMenu(false); }} /></section></main>;
  }
  if (meetingOpen) return <main className="app-shell app-main section-app"><WeeklyMeetingPanel onBack={back} /></main>;
  if (accountOpen && session?.user) return <main className="app-shell app-main section-app"><AccountPanel user={session.user} fullName={fullName} onBack={back} onNameSaved={setFullName} onLogout={logout} /></main>;
  if (reader) { const favorite = deckFavorite({ icon: '📖', title: reader.title, detail: reader.detail, tone: palette[0], reader }); return <main className="app-shell app-main section-app"><Reader content={reader} onBack={back} favorite={favorites.some((item) => item.title === reader.title)} onFavorite={() => { const exact = favorites.find((item) => item.title === reader.title); toggleFavorite(exact || favorite); }} /></main>; }
  if (favoritesOpen) return <main className="app-shell app-main section-app"><FavoritesPanel favorites={favorites} onBack={back} onOpen={(favorite) => { if (favorite.reader) setReader(favorite.reader); }} onRemove={toggleFavorite} /></main>;
  if (tab === 'biblioteca' && !trail.length) return <main className="app-shell app-main section-app"><LibraryPanel entries={libraryItems} onBack={back} favorites={favorites} onToggleFavorite={toggleFavorite} onRead={(entry) => setReader({ title: entry.title, eyebrow: entry.type.toUpperCase(), detail: entry.excerpt || 'Biblioteca', paragraphs: cleanParagraphs(entry.body || entry.excerpt || ''), audioUrl: entry.audioUrl, duration: entry.duration })} /></main>;
  if (notificationsOpen) return <main className="app-shell app-main section-app"><NotificationsPanel onBack={back} /></main>;
  if (current?.title === 'Día 1') return <main className="app-shell app-main section-app day-one-screen"><section className="day-one-section"><FixedHeader eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} onBack={back} /><DayOneCarousel items={screen.items} onSelect={select} isFavorite={(item) => item.reader ? favorites.some((favorite) => favorite.id === deckFavorite(item).id) : undefined} onFavorite={(item) => toggleFavorite(deckFavorite(item))} /></section></main>;
  return <main className="app-shell app-main section-app day-one-screen"><section className="day-one-section"><FixedHeader eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} onBack={back} /><DayOneCarousel key={`${tab}-${trail.map((item) => item.title).join('/')}`} label={screen.title} items={screen.items.map((item) => item.accountPanel ? { ...item, image: '/images/mi-cuenta-acceso.png' } : item.title === 'Favoritos' ? { ...item, image: '/images/favoritos-guardados.png' } : item.title === 'Mi avance' ? { ...item, image: '/images/mi-avance-progreso.png', imageSize: 'compact' as const } : item.title === 'Configuración' ? { ...item, image: '/images/configuracion-horarios-zona.png', imageSize: 'compact' as const } : item.title === 'Activar notificaciones' ? { ...item, image: '/images/activar-notificaciones.png', imageSize: 'compact' as const } : item.title === 'Horarios de práctica' ? { ...item, image: '/images/horarios-practica.png', imageSize: 'compact' as const } : item.title === 'Preferencias' ? { ...item, image: '/images/preferencias-avisos.png', imageSize: 'compact' as const } : item.title === 'Prácticas de 7 días' ? { ...item, image: '/images/practicas-7-dias.png', imageSize: 'compact' as const } : item.title === 'Prácticas de 15 días' ? { ...item, image: '/images/practicas-15-dias.png', imageSize: 'compact' as const } : item.title === 'Prácticas de 40 días' ? { ...item, image: '/images/practicas-40-dias.png', imageSize: 'compact' as const } : item.title === 'Antes de una reunion, entrevista o examen' ? { ...item, image: '/images/antes-reunion-entrevista-examen.png', imageSize: 'compact' as const } : item.title === 'Cuando te agarro la ansiedad' ? { ...item, image: '/images/cuando-te-agarro-la-ansiedad.png', imageSize: 'compact' as const } : item.title === 'Cuando no podes parar la cabeza para dormir' ? { ...item, image: '/images/cuando-no-podes-parar-la-cabeza-para-dormir.png', imageSize: 'compact' as const } : item.title === 'Cuando te llego una mala noticia' ? { ...item, image: '/images/cuando-te-llego-una-mala-noticia.png', imageSize: 'compact' as const } : item.title === 'Antes de tomar una decision dificil' ? { ...item, image: '/images/antes-de-tomar-una-decision-dificil.png', imageSize: 'compact' as const } : item)} onSelect={select} isFavorite={(item) => item.reader ? favorites.some((favorite) => favorite.id === deckFavorite(item).id) : undefined} onFavorite={(item) => toggleFavorite(deckFavorite(item))} /></section></main>;
}
