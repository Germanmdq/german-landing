import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import './animation.css';
export const metadata: Metadata = {
  title: 'Bienvenido · Germán Asistente',
  description: 'Tu imaginación, puesta en práctica.',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
  themeColor: '#0b0b0d',
};
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning style={{ background: '#0b0b0d' }}>
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <Script id="telegram-boot-shell" strategy="beforeInteractive">{`
          (function () {
            var attempts = 0;
            function configureTelegramShell() {
              var webApp = window.Telegram && window.Telegram.WebApp;
              if (!webApp) {
                if (attempts++ < 100) setTimeout(configureTelegramShell, 20);
                return;
              }
              try {
                if (webApp.setBackgroundColor) webApp.setBackgroundColor('#0b0b0d');
                if (webApp.setHeaderColor) webApp.setHeaderColor('#0b0b0d');
                if (webApp.expand) webApp.expand();
                if (webApp.onEvent && !window.__germanCloseOnTelegramDeactivate) {
                  window.__germanCloseOnTelegramDeactivate = true;
                  webApp.onEvent('deactivated', function () {
                    try { if (webApp.close) webApp.close(); } catch (_) {}
                  });
                  var closeWhenHidden = function () {
                    if (document.visibilityState !== 'hidden') return;
                    try { if (webApp.close) webApp.close(); } catch (_) {}
                  };
                  document.addEventListener('visibilitychange', closeWhenHidden);
                  window.addEventListener('pagehide', function () {
                    try { if (webApp.close) webApp.close(); } catch (_) {}
                  });
                }
                var revealAttempts = 0;
                var revealWhenPaintable = function () {
                  var loader = document.querySelector('.ag-ripple-loader');
                  if (document.body && (loader || document.body.childNodes.length > 0)) {
                    requestAnimationFrame(function () {
                      try { if (webApp.ready) webApp.ready(); } catch (_) {}
                    });
                    return;
                  }
                  if (revealAttempts++ < 200) setTimeout(revealWhenPaintable, 10);
                };
                revealWhenPaintable();
              } catch (_) {}
            }
            configureTelegramShell();
          })();
        `}</Script>
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
      <body suppressHydrationWarning style={{ background: '#0b0b0d', minHeight: '100dvh' }}>
        {children}
      </body>
    </html>
  );
}
