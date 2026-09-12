import type { Metadata, Viewport } from 'next';
import './globals.css';
import './animation.css';
export const metadata: Metadata = {
  title: 'Bienvenido · Germán Asistente',
  description: 'Tu imaginación, puesta en práctica.',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/images/german-welcome.png', apple: '/images/german-welcome.png' },
  appleWebApp: { capable: true, title: 'Germán Asistente', statusBarStyle: 'default' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#D92D35' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preload de las imágenes del carrusel principal (primera pantalla
            tras el login) — las demás imágenes de public/images/ se cargan
            bajo demanda, precargarlas todas sería contraproducente. */}
        <link rel="preload" as="image" href="/images/german-perfil.png" />
        <link rel="preload" as="image" href="/images/german-biblioteca.png" />
        <link rel="preload" as="image" href="/images/practicas-guiadas-hombre.png" />
        <link rel="preload" as="image" href="/images/tu-propia-practica-mujer.png" />
        <link rel="preload" as="image" href="/images/meditaciones-hombre.png" />
        <link rel="preload" as="image" href="/images/hablemos.png" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

