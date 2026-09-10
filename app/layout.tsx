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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

