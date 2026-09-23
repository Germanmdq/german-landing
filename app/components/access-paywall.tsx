'use client';

import { ArrowLeft, LockKeyhole, MessageCircle } from 'lucide-react';

const WHATSAPP = '5492236151152';

export function AccessPaywall({ section, onBack }: { section?: string; onBack?: () => void }) {
  const subject = section || 'el Asistente Germán';
  const text = `Hola Germán, quiero consultar por mi acceso a ${subject}.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

  return <main className="app-shell login-screen">
    <section className="login-card">
      {onBack && <button type="button" className="header-back" onClick={onBack}><ArrowLeft size={18} />Volver</button>}
      <div className="login-brand-mark"><LockKeyhole size={24} /></div>
      <h1 className="login-title">Contenido no habilitado</h1>
      <p className="login-subtitle">Tu cuenta no tiene acceso a {subject} en este momento.</p>
      <a className="login-google-button" href={whatsappUrl} target="_blank" rel="noreferrer">
        <MessageCircle size={20} /><span>Escribirle a Germán</span>
      </a>
    </section>
  </main>;
}
