'use client';

import './launch-widgets.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatedInterfaceIcon } from './animated-interface-icon';

const WHATSAPP = '5492236151152';

export function AccessPaywall({ section, onBack }: { section?: string; onBack?: () => void }) {
  const subject = section || 'el Asistente Germán';
  const text = section
    ? 'Hola Germán, quiero acceso completo al Asistente Germán, con el visualizador de escenas, los libros, audiolibros y todas las funciones Premium.'
    : `Hola Germán, quiero consultar por mi acceso a ${subject}.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

  if (section) {
    const premium = [
      { icon: 'brain' as const, title: 'Meditaciones completas' },
      { icon: 'ear' as const, title: 'Audiolibros y 5 libros nuevos por mes' },
      { icon: 'calendar' as const, title: 'Visualizador de escenas' },
      { icon: 'profile' as const, title: 'Consultas al Asistente Germán' },
      { icon: 'notification' as const, title: 'Nuevas herramientas y contenido Premium' },
    ];
    return <main className="app-shell trial-ended-screen">
      <section className="trial-ended-card limited-access-card">
        {onBack && <button type="button" className="trial-ended-back" onClick={onBack}><ArrowLeft size={18} />Volver</button>}
        <div className="limited-access-heading">
          <span className="trial-ended-pill">Acceso limitado</span>
          <h1>Esta sección es <strong>Premium</strong></h1>
          <p>Tu acceso sigue activo. Conservás tus prácticas, tu perfil y tus favoritos.</p>
        </div>
        <div className="limited-included">
          <b>Tu acceso actual incluye</b>
          <span>✓ Prácticas guiadas</span>
          <span>✓ Prácticas propias</span>
          <span>✓ Mi perfil</span>
          <span>✓ Favoritos</span>
        </div>
        <div className="trial-ended-feature-list">
          {premium.map((feature) => <div className="trial-ended-feature" key={feature.title}>
            <span className="trial-ended-feature-icon"><AnimatedInterfaceIcon name={feature.icon} size={30} /></span>
            <span className="trial-ended-feature-copy"><b>{feature.title}</b><small>Disponible con acceso Premium.</small></span>
            <ArrowRight className="trial-ended-feature-arrow" size={18} />
          </div>)}
        </div>
        <a className="trial-ended-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
          <span>Quiero acceso completo</span><ArrowRight size={20} />
        </a>
        <small className="trial-ended-footnote">Todo lo que ya hiciste sigue guardado.</small>
      </section>
    </main>;
  }

  return <main className="app-shell login-screen">
    <section className="login-card">
      {onBack && <button type="button" className="header-back" onClick={onBack}><ArrowLeft size={18} />Volver</button>}
      <h1 className="login-title">Contenido no habilitado</h1>
      <p className="login-subtitle">Tu cuenta no tiene acceso a {subject} en este momento.</p>
      <a className="login-google-button" href={whatsappUrl} target="_blank" rel="noreferrer"><span>Consultar acceso</span></a>
    </section>
  </main>;
}
