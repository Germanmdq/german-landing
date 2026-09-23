'use client';

import './audio-wave-loader.css';

export function AudioWaveLoader({ label = 'Cargando', dark = false }: { label?: string; dark?: boolean }) {
  return <div className={`audio-wave-loader${dark ? ' is-dark' : ''}`} role="status" aria-label={label}>
    <div className="ag-ripple-loader" aria-hidden="true">
      <span className="ag-ripple-ring ag-ripple-ring-1"><span className="ag-ripple-logo">AG</span></span>
      <span className="ag-ripple-ring ag-ripple-ring-2" />
      <span className="ag-ripple-ring ag-ripple-ring-3" />
      <span className="ag-ripple-ring ag-ripple-ring-4" />
      <span className="ag-ripple-ring ag-ripple-ring-5" />
    </div>
    <span className="audio-wave-loader-sr">{label}</span>
  </div>;
}
