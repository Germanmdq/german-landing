'use client';

import { useEffect, useRef, useState } from 'react';

function listTimezones(current: string): string[] {
  try {
    if (typeof Intl.supportedValuesOf === 'function') return Intl.supportedValuesOf('timeZone');
  } catch {
    // ignore, fall through to fallback below
  }
  return [current];
}

export function TimezonePicker({ value, onSave, onCancel }: { value: string; onSave: (value: string) => void; onCancel: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [zones] = useState(() => listTimezones(value));
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    element?.showModal();
    return () => { element?.close(); previous?.focus(); };
  }, []);
  const visible = zones.filter((zone) => zone.toLowerCase().includes(query.trim().toLowerCase()));
  return <dialog ref={dialog} className="time-sheet timezone-sheet" aria-labelledby="timezone-sheet-title" onCancel={(event) => { event.preventDefault(); onCancel(); }} onClick={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
    <div className="time-sheet-content">
      <div className="time-sheet-handle" aria-hidden="true" />
      <header><button onClick={onCancel}>Cancelar</button><h2 id="timezone-sheet-title">Zona horaria</h2><button style={{ visibility: 'hidden' }}>Cancelar</button></header>
      <input className="timezone-search" type="text" inputMode="search" placeholder="Buscar zona horaria" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Buscar zona horaria" />
      <div className="timezone-list">
        {visible.map((zone) => <button key={zone} className={`timezone-option${zone === value ? ' selected' : ''}`} onClick={() => onSave(zone)}>{zone.replace(/_/g, ' ')}</button>)}
        {!visible.length && <p className="timezone-empty">No encontramos esa zona horaria.</p>}
      </div>
    </div>
  </dialog>;
}
