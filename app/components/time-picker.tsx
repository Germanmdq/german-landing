'use client';

import { useEffect, useRef, useState } from 'react';

function TimeWheel({ label, count, value, onChange }: { label: string; count: number; value: number; onChange: (value: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = value * 44; }, []);
  const select = (next: number) => {
    const bounded = Math.max(0, Math.min(count - 1, next));
    ref.current?.scrollTo({ top: bounded * 44, behavior: 'instant' });
    onChange(bounded);
  };
  return <div className="time-wheel" ref={ref} role="spinbutton" tabIndex={0} aria-label={label} aria-valuemin={0} aria-valuemax={count - 1} aria-valuenow={value} aria-valuetext={String(value).padStart(2, '0')} onScroll={(event) => onChange(Math.max(0, Math.min(count - 1, Math.round(event.currentTarget.scrollTop / 44))))} onKeyDown={(event) => {
    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      select(event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : value + (event.key === 'ArrowUp' ? -1 : 1));
    }
  }}>
    {Array.from({ length: count }, (_, index) => <div key={index} aria-hidden="true" className={`time-wheel-value${index === value ? ' selected' : ''}`} onClick={() => select(index)}>{String(index).padStart(2, '0')}</div>)}
  </div>;
}

export function TimePicker({ label, value, onSave, onCancel }: { label: string; value: string; onSave: (value: string) => void; onCancel: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [hour, setHour] = useState(Number(value.split(':')[0]));
  const [minute, setMinute] = useState(Number(value.split(':')[1]));
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    element?.showModal();
    return () => { element?.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="time-sheet" aria-labelledby="time-sheet-title" onCancel={(event) => { event.preventDefault(); onCancel(); }} onClick={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
    <div className="time-sheet-content">
      <div className="time-sheet-handle" aria-hidden="true" />
      <header><button onClick={onCancel}>Cancelar</button><h2 id="time-sheet-title">Editar horario</h2><button className="time-save" onClick={() => onSave(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)}>Guardar</button></header>
      <p className="time-sheet-label">{label}</p>
      <div className="time-wheels"><div className="time-selection" aria-hidden="true" /><TimeWheel label="Horas" count={24} value={hour} onChange={setHour} /><span className="time-colon" aria-hidden="true">:</span><TimeWheel label="Minutos" count={60} value={minute} onChange={setMinute} /></div>
      <p className="time-sheet-hint">Deslizá para elegir la hora</p>
    </div>
  </dialog>;
}
