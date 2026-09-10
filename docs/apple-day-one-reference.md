# Día 1 — inspección de Apple

Fuente inspeccionada: https://www.apple.com/mac-mini/ — “Get the highlights”, #media-card-gallery. 10 septiembre 2026.
CSS: /v/mac-mini/ab/built/styles/overview.built.css. JavaScript: /v/mac-mini/ab/built/scripts/overview/main.built.js.

## Valores antes de implementar

- Viewport solicitado 390 × 844; clientWidth 375 por scrollbar de 15 px en el navegador de inspección.
- Card medida: 306.25 × 480 px. Fórmula móvil: max(87.5vw − scrollbar, 280px) − 20px. Gutter: 6.25vw = 24.375px. Gap 20px. Siguiente card visible: 24.375px. Sin scrollbar, a 390px: ancho 321.25px (82.37%), siguiente visible 24.375px (6.25%).
- Radio 28px, fondo #f5f5f7, borde 0, sombra none, overflow hidden. Fondo de sección blanco.
- Caption top 32px; left min(32px, 8.33333vw − gutter/12), medido 30.46px. En esta sección Apple sobreescribe caption-width a 100%; flex-shrink deja ambos márgenes.
- SF Pro Text, 17px, 600, line-height 1.23536 (21.0012px), tracking −.022em, negro rgba(0,0,0,.88). Desktop SF Pro Display 28/32, .007em; <=1068 24/28 .009em; <=734 21/25 .011em; <=480 17/21 −.022em.
- Alturas: >1440 740px; 1069–1440 680px; 735–1068 628px; 481–734 560px; <=480 480px. Ancho máximo 1680px. Snap start móvil, center desktop, x mandatory.
- Scroll container: overflow-x scroll, overflow-y hidden; grid auto-flow column; 20px gap; scrollbar invisible; padding-bottom 30px con margin-bottom −30px.
- Controles: Play 56×56; separación 14px; píldora 56px alta, radio 32px, rgba(232,232,237,.7), blur 7px, inset 0 0 1px rgba(0,0,0,.11). No sombra exterior.
- Dot 8×8px con margen horizontal 8px; activo 32×8 móvil (48 desktop); padding de píldora 16px. Color rgba(29,29,31,.6); progreso #29292a.
- JS real: transición scrollLeft de 1 segundo con easeInOutQuad; persistencia 6.15s; interacción manual pausa autoplay; final muestra Replay; salir de viewport pausa; reduced-motion no inicia autoplay. Caption parallax usa 120px × 2.6 × diferencia de progreso y opacidad 1 − abs(diferencia) × 3.2.
- Indicadores: cambio de color 250ms linear; entrada 400ms cubic-bezier(.3,2,.5,1), stagger 110ms.

## Alcance y adaptación

Solo el nodo titulado Día 1 usa el nuevo componente. Los demás días, pantallas, buscador y controles globales conservan su implementación. Se mantiene la acción existente de abrir cada práctica y el guardado de favoritos. Las tarjetas usan contenido textual propio: no se copian fotos de productos Apple ni se inventan ilustraciones. La tipografía SF se resuelve con la fuente del sistema en dispositivos Apple; otros sistemas usan fallback.

## Verificación local

- CSS computado local: height 480px; border-radius 28px; background rgb(245,245,247); box-shadow none.
- Comparación visual en navegador de Apple y Día 1: caption superior, franja visible de siguiente card, gap y controles inferiores.
- Selección del segundo indicador pausa autoplay y desplaza al segundo contenido.
- Play alcanza el último contenido y cambia a Repetir carrusel, con progreso completo.
- Abrir la primera práctica muestra el lector original; Volver regresa a Día 1.
- TypeScript --noEmit correcto.
- Límites: en la sesión Apple sirvió fallback multimedia sin imágenes y no activó la experiencia enhanced completa. La transición/parallax enhanced se reconstruyó desde su JS/CSS, no se verificó visualmente esa variante. No se probó en un iPhone físico. La PWA conserva su ancho móvil máximo de 480px; los breakpoints de escritorio de Apple se documentan pero no se aplican al resto de la app.
