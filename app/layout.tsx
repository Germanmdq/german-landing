import type { Metadata, Viewport } from 'next';
import './globals.css';
import './animation.css';
export const metadata: Metadata = {
  title: 'Bienvenido · Asistente Germán',
  description: 'Tu imaginación, puesta en práctica.',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/german-welcome.png', apple: '/german-welcome.png' },
  appleWebApp: { capable: true, title: 'Asistente Germán', statusBarStyle: 'default' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#D92D35' };
export default function Layout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body>{children}</body></html>}
