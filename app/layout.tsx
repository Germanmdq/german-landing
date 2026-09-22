import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import './animation.css';
export const metadata: Metadata = {
  title: 'Bienvenido · Germán Asistente',
  description: 'Tu imaginación, puesta en práctica.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: { capable: true, title: 'Germán Asistente', statusBarStyle: 'default' },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090a' },
  ],
};
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preload de las primeras 3 cards del carrusel principal (las que
            se ven sin scrollear, en orden: Mi perfil / Biblioteca /
            Prácticas guiadas) — las demás imágenes de public/images/ se
            cargan bajo demanda (lazy), precargarlas todas sería
            contraproducente. Nota: se habían quedado apuntando a nombres de
            archivo viejos que ya no se usan en ningún lado — corregido acá
            de paso a los nombres y extensión .webp actuales. */}
        <link rel="preload" as="image" href="/images/german-perfil.webp" />
        <link rel="preload" as="image" href="/images/german-biblioteca.webp" />
        <link rel="preload" as="image" href="/images/german-practicas.webp" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
