# Sitio web de productor musical Prompt
# websiteprompts.ai

Cree un sitio web personal para **Marcus Veil**, un productor musical independiente y propietario de un estudio de grabación. Base casi negra, tipo blanco limpio, elemento visual de forma de onda animada. Tipografía de visualización en mayúsculas y negrita. Estética mínima de estudio oscuro: artesanía seria, sin ruido.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

## Design Sistema
```css
:root {
  --background: 0 0% 5%;            /* #0d0d0d near-black */
  --surface: 0 0% 8%;               /* #141414 surface */
  --surface-raised: 0 0% 11%;       /* #1c1c1c raised */
  --border: 0 0% 15%;               /* #262626 border */
  --foreground: 0 0% 97%;           /* #f7f7f7 off-white */
  --muted: 0 0% 44%;                /* #707070 muted */
  --subtle: 0 0% 25%;               /* #404040 subtle */
  --primary: 0 0% 100%;             /* white as primary */
  --accent: 38 96% 56%;             /* #f5a623 amber — used sparingly */
  --mono: 'JetBrains Mono', monospace;
}
```

## Tipografía
Importación: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap`
- Pantalla / H1–H2: Bebas Neue 400, espacio entre letras 0,04em, todo en mayúsculas, grande
- Cuerpo/UI: DM Sans 300–600
- Etiquetas/Metadatos/Tiempos: JetBrains Mono 400

## Efectos visuales

**Forma de onda animada**: parte inferior del héroe, barra de estilo SVG de ancho completo y 80 px de alto ecualizador:
```jsx
// 40 bars, heights randomised between 8px and 64px
// Each bar: background white, opacity 0.12–0.6 (alternating)
// Animate heights with Framer Motion stagger:
// Each bar: animate={{ scaleY: [1, random(0.2, 1), 1] }}
// transition={{ duration: random(0.8, 1.4), repeat: Infinity, ease: 'easeInOut', delay: index * 0.04 }}
// transform-origin: bottom
```
Envolver en `overflow: oculto`, ancho completo, `position: absolute; bottom: 0; left: 0; right: 0`.

**Vista previa de la pista al pasar el mouse**: las tarjetas de ritmo/pista revelan un ícono de botón de reproducción en hover:
```
Play button: white circle 48px, icon lucide `Play` filled, centers on card
transition: opacity 0.2s ease
default opacity: 0; hover opacity: 1
```

**Desaparición escalonada** — `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`, 0,5 s por sección.

**Marquesina de texto** — tira de desplazamiento de géneros/créditos: continuo, velocidad 20 s, intervalo 64px.

## Secciones

**1. Barra de navegación**: fija, `background: hsl(var(--background)/0.94)`, desenfoque de 16 píxeles, borde inferior. Izquierda: "MARCUS VEIL" Bebas Neue 22px blanco, espacio entre letras 0,08em. Centro: Beats · Servicios · Créditos · Estudio · Contacto. Derecha: "Trabajar conmigo": relleno blanco, texto oscuro, DM Sans 600 13 px, radio de borde 4 px.

**2. Hero**: ventana gráfica completa, columna flexible, extremo flexible de justificación de contenido, relleno 0 64 px 100 px, posición relativa, desbordamiento oculto. Capas de fondo: color de superficie oscuro + superposición de textura de ruido (`background: url('/texture.png')` corregido, superposición en modo de fusión, opacidad 0,4). Forma de onda en la parte inferior (efectos visuales). Contenido z-10: Insignia silenciada de JetBrains Mono 10px "PRODUCTOR DE MÚSICA · ESTUDIO DE GRABACIÓN". H1 Bebas Neue, clamp(80px, 12vw, 180px), altura de línea 0.88, blanco, ancho máximo 900px:
```
I TURN IDEAS
INTO RECORDS
```
Sub: DM Sans 300 15px silenciado, ancho máximo 440px, margen superior 20px: "Produciendo, mezclando y grabando desde 2014. Trabajó con más de 50 artistas de hip-hop, R&B yelectrónico". Dos CTA: "Hablemos de música" (texto oscuro y relleno de blanco) + "Escucha mi trabajo" (borde blanco fantasma, ícono de "auriculares" lucide). Abajo a la derecha: foto del productor parcialmente visible en el borde: 
```
{/* Image: music producer in dark recording studio, facing away or in profile, mixing console in foreground, moody deep blue and amber studio lighting */}
```

**3. Marco de género/créditos**: franja de ancho completo `background: hsl(var(--surface))`, borde superior + inferior, 44 píxeles de alto: "Hip-Hop · R&B · Electrónica · Trap · Soul · Lo-Fi · Afrobeats · Hip-Hop · R&B ···" — JetBrains Mono 10px blanco 35%, separados por puntos ámbar.

**4. clamp(52px, 6vw, 80px): "TRABAJO SELECCIONADO". Cuadrícula de tarjetas de 3 columnas Cada tarjeta: `background: hsl(var(--surface))`, borde, radio de borde 8px, relación de aspecto 1/1 para la imagen de la portada + botón de reproducción al pasar el cursor (Efectos visuales: nombre de la pista DM Sans 600 15px + género JetBrains Mono 10px silenciado + "BPM: 142" JetBrains Mono). 10px silenciado. 6 tiempos/proyectos en total. Resúmenes de arte de portada:
```
{/* Album/beat cover: abstract dark moody artwork, minimal graphic design, dark background with subtle color accent */}
```

**5. Servicios**: fondo de superficie, relleno de 96px, 64px, relleno de 28px. Sans. Nombre del servicio DM Sans 600 18px + descripción 2 líneas silenciadas + rango de precios JetBrains Mono 12px ámbar + enlace de texto blanco "Consultar →" Servicios: Licencia Beat desde $150 · Producción completa desde $800 · Mezcla y masterización desde $250.

** — padding 96px H2 Bebas Neue: "CRÉDITOS" Lista de tabla horizontal (no cuadrícula): cada fila: `border-top: 1px solid hsl(var(--border))`, relleno 16px 0, fila flexible: nombre del artista DM Sans 600 izquierda + función JetBrains Mono 10px silenciado centro + año JetBrains Mono 10px silenciado derecha: superficie de fondo elevada. 

**7. dos columnas, relleno 96px 64px. Izquierda: H2 Bebas Neue: "THE STUDIO". Cuerpo silenciado sin 15px: ubicación, lista de equipos, nota de reserva en JetBrains Mono 10px - SSL · Neve 1073 · Pro Tools · Ableton · Adam Audio. foto:
```
{/* Image: professional recording studio interior, mixing console foreground, isolation booth visible through glass, warm amber lighting on dark moody background */}
```

**8. CTA**: casi negro, relleno 80px 64px, centrado. H2 Bebas Neue clamp(60px, 8vw, 120px) blanco: "HAGAMOS MÚSICA". Sub DM Sans 15px silenciado. SoundCloud · YouTube). JetBrains Mono 11px silenciado:"Con sede en Londres · Trabajando en todo el mundo de forma remota."

**9. Pie de página**: `hsl(0 0% 3%)`, relleno 40px 64px 24px. Izquierda: "MARCUS VEIL" Bebas Neue 18px + rol DM Sans 12px silenciado. Derecha: enlaces rápidos + redes sociales. Abajo: copyright JetBrains Mono 10px silenciado.

## Responsive
Mobile: nav hamburger · hero H1 clamp(64px, 16vw, 100px) · forma de onda 60px de alto, 24 barras · producciones de 2 columnas · tabla de créditos trunca columna de rol · columna única de estudio.

## Animaciones Resumen
| Elemento | Animación | Gatillo |
|---|---|---|
| Barras de forma de onda | Bucle Y de escala aleatoria | Siempre |
| Tira de marquesina | Desplazamiento continuo | Siempre |
| Contenido de héroe | Desvanecimiento escalonado | En el soporte |
| Tarjetas de ritmo | Desvanecimiento escalonado | Desplazamiento |
| Botón reproducir | Opacidad 0→1 | Tarjeta flotante |
| Filas de créditos | Desvanecimiento escalonado | Desplazarse |

## Dependencias clave
```json
{ "motion": "^12.x", "lucide-react": "^0.400.x" }
```

> **Notas rápidas:** "Marcus Veil" y todos los créditos son marcadores de posición. Las tarjetas Beat necesitan una portada real o imágenes generadas. El precio es indicativo: actualización según tarifas reales. SoundCloud/Spotify embed puede reemplazar las tarjetas de ritmos estáticos si lo prefiere.