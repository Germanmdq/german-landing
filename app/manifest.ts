import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Asistente Germán',
    short_name: 'Germán',
    description: 'Prácticas, meditaciones, lecturas y consultas para dirigir tu atención.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#965266',
    lang: 'es',
  };
}
