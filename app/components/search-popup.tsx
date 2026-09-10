'use client';
import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

export function SearchPopup({ value, onApply, onClose }: { value: string; onApply: (value: string) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(value);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.showModal();
    return () => { dialog.current?.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="search-popup" aria-label="Buscar en la biblioteca" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="search-popup-content">
      <form onSubmit={(event) => { event.preventDefault(); onApply(draft.trim()); }}>
        <div className="search-input-pill"><input autoFocus aria-label="Buscar en la biblioteca" placeholder="Buscar" value={draft} onChange={(event) => setDraft(event.target.value)} enterKeyHint="search" /><button type="submit" aria-label="Buscar"><Search size={22} /></button></div>
      </form>
    </div>
  </dialog>;
}
