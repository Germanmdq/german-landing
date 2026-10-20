# Clay & Form — Aviso del sitio web de Ceramics Studio

## Objetivo
Cree un sitio web cálido e íntimo de un estudio de cerámica con titulares en cursiva de Cormorant Garamond, un diseño de héroe dividido, acento en el borde izquierdo de color arcilla, tarjetas de reserva de talleres y una sección de comisión de tierra oscura.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

## Sistema de diseño

### Colores
```css
:root {
  --background: 37 40% 97%;
  --foreground: 22 62% 9%;
  --primary: 18 46% 49%;
  --primary-foreground: 37 40% 97%;
  --muted-foreground: 37 18% 44%;
  --border: 37 28% 80%;
  /* Raw hex reference */
  /* warm-white: #faf7f0 */
  /* deep-earth: #221408 */
  /* warm-clay: #b5694a */
  /* warm-sand: #e8d8c0 */
}
```

### Tipografía
Importación de fuentes de Google: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,700&family=Plus+Jakarta+Sans:wght@300;400&display=swap`
- Titulares: Cormorant Garamond 700 cursiva
- Texto del cuerpo: Cormorant Garamond 300 cursiva
- Etiquetas de interfaz de usuario: Plus Jakarta Sans 400
- Títulos/precios: Plus Jakarta Sans 300

## Efectos visuales

1. **Acento del título del borde izquierdo de arcilla**: borde izquierdo: 4 píxeles sólidos #b5694a en el elemento principal h1, relleno izquierdo: 16 píxeles, brinda un acento vertical hecho a mano al título principal, no se necesita animación: pura confianza de CSS
2. **Desplazamiento escalonado de tarjeta de taller** — Movimiento del encuadrador mientras está en vista: escala 0,95→1, opacidad 0→1, escalonamiento 0,12 s entre las 3 tarjetas de taller, facilidad: [0,25,0,46,0,45,0,94]
3. **Fila de colección con desplazamiento cálido** — mientras pasa el mouse sobre y: -3px (0,2 s), borde izquierdo: 3 px sólido #b5694a (transición de 0,15 s), sombra cálida: 0 4 px 20 px rgba(181,105,74,0.18)
4. **Sección de la Comisión de la Tierra Oscura** — bg: #221408, una sección oscura aislada contra el blanco cálido — Texto blanco en cursiva Cormorant, botón de arcilla — crea un contraste profundo en una página que de otro modo sería de luz cálida

## Desglose de componentes

### 1. Navbar
```tsx
// Sticky, bg: #faf7f0, border-bottom: 1px solid #e8d8c0, height: 64px
// Left: "Clay & Form" — Cormorant Garamond 400 italic, 20px, letter-spacing: 0.04em, color: #221408
// Center: Shop / Workshops / About / Commission — Plus Jakarta Sans 400, 13px, color: #7a6a58, letter-spacing: 0.04em
// Right: "Book a Workshop" — bg: #b5694a, color: #faf7f0, Plus Jakarta 400, 13px, px-5 py-2.5, border-radius: 0
// Hover: bg: #9a5038, 0.2s
// Framer Motion: y -64→0, opacity 0→1, 0.5s ease-out
```

### 2. Héroe: diseño dividido
```tsx
// Full-viewport, min-height: 100vh, display: flex, flex-direction: row (on desktop)
// No full-bleed photo behind content — instead a TRUE SPLIT LAYOUT

// LEFT PANEL — 45% width, bg: #faf7f0, display flex flex-col justify-center
// padding: clamp(48px,6vw,96px)
// z-index: 10

// Small kicker: Plus Jakarta 400, 11px, letter-spacing: 0.18em, text-transform: uppercase, color: #b5694a, margin-bottom 24px
// "Handmade Ceramics & Pottery Workshops · Margate"

// Headline — WITH clay left border accent:
// border-left: 4px solid #b5694a, padding-left: 16px
// Cormorant Garamond 700 italic, clamp(40px,5.5vw,96px), color: #221408, line-height: 1.1
// "Every Piece Begins as Possibility."
// Framer Motion: opacity 0→1, x -30→0, 0.7s ease-out, delay: 0.1s

// Sub: Cormorant Garamond 300 italic, 19px, color: #7a6a58, margin-top: 20px, line-height: 1.75, max-width: 400px
// "Handmade ceramics and pottery workshops in Margate. Every piece thrown, hand-built, and glazed in the studio."
// Framer Motion: opacity 0→1, y 20→0, 0.6s, delay: 0.3s

// CTAs (flex row, gap: 12px, margin-top: 32px):
// "Browse the Shop" — bg: #b5694a, color: #faf7f0, Plus Jakarta 400, 14px, px-7 py-3.5, border-radius: 0
// "Book a Workshop" — bg: transparent, border: 1px solid #b5694a, color: #b5694a, Plus Jakarta 400, 14px, px-7 py-3.5, border-radius: 0
// Framer Motion: opacity 0→1, y 20→0, 0.6s, delay: 0.5s

// Small trust note: Plus Jakarta 300, 13px, #9a8a7a, margin-top 24px
// "Charlotte Reid · Studio open by appointment · Margate Old Town"

// RIGHT PANEL — 55% width, position: relative, overflow: hidden
// Directional gradient from left: linear-gradient(to right, rgba(250,247,240,1) 0%, rgba(250,247,240,0.95) 0%, transparent 100%)
// Wait — ONLY on the seam between left and right panels (8% width at left edge of photo)
// gradient: linear-gradient(to right, #faf7f0 0%, transparent 12%), applied as overlay on left edge only

{/* Image: Extreme close-up of hands shaping wet clay on a pottery wheel — fingers pressing into the clay, clay texture and finger grooves clearly visible, warm golden afternoon light from a large studio window to the left, very intimate close-up that conveys the tactile, handmade quality of the work, warm terracotta earth tones of the clay contrasting with the cool wheel surface */}
<img src="" alt="Hands shaping clay on pottery wheel in ceramic studio" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />

// Left-edge gradient overlay to blend photo into left panel:
// position: absolute, inset: 0, background: linear-gradient(to right, #faf7f0 0%, transparent 15%), z-index: 1
```

### 3. Taller Tarjetas
```tsx
// Section bg: #faf7f0, padding: 80px clamp(24px,6vw,96px)
// Section label: Plus Jakarta 400, 11px, letter-spacing 0.18em, uppercase, color: #b5694a, margin-bottom 8px: "BOOK A WORKSHOP"
// Headline: Cormorant Garamond 700 italic, clamp(32px,4.5vw,68px), #221408, margin-bottom 48px
// "Learn to Make."

// 3-column flex, gap: 24px

// Framer Motion: each card whileInView scale 0.95→1, opacity 0→1, stagger 0.12s, ease [0.25,0.46,0.45,0.94]

// Each card: bg: #ffffff, border: 1px solid #e8d8c0, overflow hidden
// Hover: y: -4px, box-shadow: 0 8px 32px rgba(181,105,74,0.12), 0.25s ease-out

// Card photo (4:3 crop):
// Card 1 — Wheel Throwing:
{/* Image: Close-up photography of pottery wheel throwing in action — clay being centred on the wheel with water spray visible, hands cupped around the opening form, warm studio light, movement blur on the spinning wheel showing speed, intimate and focused */}
<img src="" alt="Wheel throwing pottery workshop with hands on spinning clay" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />

// Card 2 — Hand Building:
{/* Image: Hands carefully coiling clay rope to build a vessel wall — clay coils stacked in organic layers, natural light from studio window, worn wooden work surface, meditative and precise, warm clay and cream tones */}
<img src="" alt="Hand building ceramics workshop with clay coil technique" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />

// Card 3 — Glazing & Firing:
{/* Image: Hands applying glaze to a bisqueware ceramic bowl with a wide soft brush — deep teal glaze colour against the pale bisqueware, glaze drip visible, studio shelf of other glazed pieces in soft background bokeh, thoughtful and creative atmosphere */}
<img src="" alt="Glazing ceramics in pottery studio with soft brush application" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />

// Card body, padding: 24px
// Price chip: bg: rgba(181,105,74,0.1), border: 1px solid rgba(181,105,74,0.25), Plus Jakarta 400, 12px, #b5694a, px-3 py-1 inline-block, margin-bottom 12px: "£75/person" / "£65/person" / "£45/person"
// Cormorant Garamond 700 italic, 24px, #221408: workshop name
// Plus Jakarta 300, 13px, #9a8a7a, margin-top 4px: duration + max group
// Cormorant Garamond 300 italic, 15px, #6a5a48, margin-top 12px, line-height 1.7: description
// "Book →" link: Plus Jakarta 400, 13px, #b5694a, margin-top 16px

// Card 1: "£75/person" / "Wheel Throwing" / "2hrs · Up to 6 people"
// "The most popular workshop. Learn to centre clay, open, and throw your first pot on the wheel. You'll make 2-3 pieces to take home after firing." / "Book →"

// Card 2: "£65/person" / "Hand Building" / "2hrs · Up to 8 people"
// "No wheel required. Pinch pots, coil building, and slab construction. Perfect for those who prefer a more meditative, tactile process." / "Book →"

// Card 3: "£45/person" / "Glazing & Firing" / "1hr · Existing pieces"
// "Bring existing unfired work, or use studio bisqueware. Experiment with our glaze palette and leave the rest to us." / "Book →"
```

### 4. Filas de colección
```tsx
// Section bg: #f0ece0 (warm sand, slightly warmer than bg), padding: 80px clamp(24px,6vw,96px)
// Section label: Plus Jakarta 400, 11px, letter-spacing 0.18em, uppercase, color: #b5694a: "THE SHOP"
// Headline: Cormorant Garamond 700 italic, clamp(32px,4.5vw,68px), #221408, margin-bottom 48px: "Handmade to Last."

// 3 collection rows, each: border-top: 1px solid #d8c8b0, padding: 28px 0
// flex justify-between align-center, cursor pointer

// Hover (Framer Motion whileHover): y -3px (0.2s), border-left: 3px solid #b5694a, padding-left 16px, box-shadow: 0 4px 20px rgba(181,105,74,0.18)

// Left: Cormorant Garamond 700 italic, 24px, #221408 — collection name
//       Cormorant Garamond 300 italic, 15px, #9a8a7a, margin-top 6px — description
// Right: Plus Jakarta 300, 14px, #7a6a58 — "from £28" / "from £45" / "from £120"
//        Clay "→" Cormorant 400, 24px, #b5694a, margin-left 12px

// Row 1: "Tableware" / "Bowls, mugs, plates, and platters. Made to be used daily. Dishwasher safe." / "from £28"
// Row 2: "Decorative Vessels" / "Vases, jugs, and storage jars. Each one unique from throwing." / "from £45"
// Row 3: "Sculptural Works" / "Wall pieces, sculptural forms, and one-off works." / "from £120"
```

### 5. Declaración del artista dividida
```tsx
// Section bg: #faf7f0, padding: 0 (full-bleed split), min-height: 520px
// 2 columns, 50%/50%

// Left 50%: position relative, overflow hidden
{/* Image: Interior of a ceramics studio — shelves of finished ceramic pieces (bowls, vases, mugs) in warm earthy tones, late afternoon window light casting long warm shadows, thrown forms at different stages of drying, quiet and atmospheric, documentary photography feel */}
<img src="" alt="Clay & Form ceramics studio shelves with finished handmade pieces" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />

// Right 50%: bg: #faf7f0, padding: 64px clamp(32px,4vw,80px), display flex flex-col justify-center
// Pull quote (Cormorant Garamond 700 italic, clamp(22px,3vw,40px), #221408, line-height 1.4, border-left 3px solid #b5694a, padding-left 20px):
// "I make work that holds things — water, light, memory."

// Name chip: bg: #b5694a, color: #faf7f0, Plus Jakarta 400, 12px, letter-spacing 0.08em, px-3 py-1, inline-block, margin-top 20px
// "CHARLOTTE REID — POTTER & FOUNDER"

// Bio: Cormorant Garamond 300 italic, 17px, #7a6a58, margin-top 20px, line-height 1.75
// "Every piece is made in my Margate studio. Thrown, trimmed, dried, bisque fired, glazed by hand, and kiln fired. No shortcuts. Just clay, time, and hands."

// Second bio paragraph:
// "I'm Charlotte Reid. I've been making in Margate since 2018. Before ceramics, I worked in graphic design. I left that world to make things with my hands, and I haven't looked back."

// Location note: Plus Jakarta 300, 13px, #9a8a7a, margin-top 16px: "Studio visits by appointment · Margate Old Town · Margate, Kent"
```

### 6. Horario de clases
```tsx
// Section bg: #f5f0e8, padding: 80px clamp(24px,6vw,96px)
// Headline: Cormorant Garamond 700 italic, clamp(28px,4vw,56px), #221408, margin-bottom 48px: "Upcoming Workshops"

// 2-column table layout: date column (40%) + details column (60%)
// Header row: Plus Jakarta 400, 11px, uppercase, letter-spacing 0.14em, #9a8a7a, border-bottom 1px solid #d8c8b0, padding-bottom 12px
// "DATE" / "WORKSHOP · SPACES"

// 8 workshop rows, each: flex justify-between, border-bottom 1px solid #e8d8c0, padding 16px 0
// Left: Cormorant Garamond 400, 16px, #221408 — date / Plus Jakarta 300, 13px, #9a8a7a — day
// Center: Cormorant Garamond 400, 16px, #221408 — workshop name
// Right: Plus Jakarta 300, 13px, #b5694a — spaces available + link "Book"

// Row 1: "15 Jan" / Wed / "Wheel Throwing" / "4 spaces · Book"
// Row 2: "18 Jan" / Sat / "Hand Building" / "6 spaces · Book"
// Row 3: "22 Jan" / Wed / "Wheel Throwing" / "2 spaces · Book"
// Row 4: "25 Jan" / Sat / "Glazing & Firing" / "3 spaces · Book"
// Row 5: "29 Jan" / Wed / "Wheel Throwing" / "Full"
// Row 6: "1 Feb" / Sat / "Hand Building" / "5 spaces · Book"
// Row 7: "5 Feb" / Wed / "Wheel Throwing" / "6 spaces · Book"
// Row 8: "8 Feb" / Sat / "Glazing & Firing" / "Full"

// "Full" rows: color #c0a890, cursor: not-allowed
// "Book" links: Plus Jakarta 400, 13px, #b5694a

// Note below: Cormorant Garamond 300 italic, 15px, #9a8a7a: "Gift vouchers available for all workshops."
```

### 7. Sección de comisión: Tierra oscura
```tsx
// Section bg: #221408 (deep earth), padding: 80px clamp(24px,6vw,96px)
// Split: left content, right decorative image

// Left (60% on desktop, full on mobile):
// Small label: Plus Jakarta 400, 11px, letter-spacing 0.18em, uppercase, color: #b5694a, margin-bottom 20px
// "COMMISSIONS & BESPOKE WORK"
// Headline: Cormorant Garamond 700 italic, clamp(28px,4.5vw,64px), #faf7f0, line-height 1.15
// "Have something specific in mind?"
// Body: Cormorant Garamond 300 italic, 17px, #c0a890, margin-top 20px, line-height 1.8
// "I take commissions year-round for tableware sets, bespoke gifts, and sculptural works. Each commission starts with a conversation — to understand the use, the recipient, and what you're hoping to hold."
// Second para: "Typical turnaround is 6-8 weeks from sign-off. Prices from £150 for single pieces, from £350 for tableware sets."
// Button: bg: #b5694a, color: #faf7f0, Plus Jakarta 400, 14px, px-7 py-3.5, border-radius: 0, margin-top 32px
// "Enquire About a Commission"
// Hover: bg: #9a5038, 0.2s

// Right (40%): Decorative stack of finished ceramic pieces image:
{/* Image: Stack of hand-thrown ceramic bowls in earthy matte glazes — stacked off-centre, warm earthy brown, sage green, and cream glazes visible, dark minimal background, product photography, studio lighting showing glaze texture and form */}
<img src="" alt="Stacked handmade ceramic bowls in earthen glazes" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center', opacity: 0.9 }} />
```

### 8. Testimonio
```tsx
// Section bg: #faf7f0, padding: 64px clamp(24px,6vw,96px), text-align center
// Cormorant Garamond 700 italic, clamp(24px,3.5vw,48px), #221408, max-width 640px, margin auto
// "My Christmas present to myself. The Wheel Throwing workshop was two of the best hours I've spent."
// Plus Jakarta 300, 15px, #b5694a, margin-top 20px: "— Emma W. · Workshop participant"
```

### 9. Pie de página
```tsx
// bg: #221408, border-top: 1px solid rgba(181,105,74,0.2), padding: 48px clamp(24px,6vw,96px) 32px
// 3 columns: Brand / Navigate / Studio
// "Clay & Form" Cormorant 400 italic, 18px, #faf7f0 + Cormorant 300 italic 14px #9a8a7a "Handmade ceramics · Margate"
// Navigate: Plus Jakarta 300, 14px, #9a8a7a — Shop / Workshops / About / Commission / Gift Vouchers
// Studio: Plus Jakarta 300, 14px, #9a8a7a — "Margate Old Town" / "By appointment" / "hello@clayandform.co.uk"
// Copyright: "© 2025 Clay & Form. Charlotte Reid." Plus Jakarta 300, 12px, #5a4030
```

## Animaciones

| Elemento | Animación | Duración | Retraso | Facilitando|
|---|---|---|---|---|
| Barra de navegación | y: -64→0, opacidad 0→1 | 0,5 s | 0s | salida fácil |
| Titular de héroe | opacidad 0→1, x -30→0 | 0,7s | 0,1 s | salida fácil |
| Sub héroe | opacidad 0→1, y 20→0 | 0,6 s | 0,3 s | salida fácil |
| CTA de héroe | opacidad 0→1, y 20→0 | 0,6 s | 0,5 s | salida fácil |
| Tarjetas de taller | escala whileInView 0,95 → 1, opacidad 0 → 1, escalonamiento 0,12 s | 0,6 s | desplazarse | [0.25,0.46,0.45,0.94] |
| Tarjeta de taller flotante | y: -4px, cuadro-sombra | 0,25 s | 0s | salida fácil |
| Filas de colección | whileHover y:-3px, borde de arcilla+brillo | 0,2 s | 0s | salida fácil |
| Sección Comisión | whileInView opacidad 0→1, y 24→0 | 0,6 s | desplazarse | salida fácil |
| Botón de acción | whileHover bg oscurecer | 0,2 s | 0s | facilidad de salida |

## Responsive

- **Móvil (<768px)**: pilas de héroe (foto arriba, contenido abajo), tarjetas de taller de 1 columna, filas de colección simplificadas, pilas divididas por artistas, cronograma simplificado a columnas clave, columna única de sección de comisiones
- **Tableta**: Tarjetas de taller 2+1, mantiene la división de artistas ratio
- **Escritorio**: héroe dividido completo (45/55), todas las secciones en ancho completo como se describe

## Copia completa

**Marca**: Clay & Form

**Navbar**: Clay & Form / Tienda / Talleres / Acerca de / Comisión

**Héroe**:
- Kicker: "Talleres de cerámica y alfarería hechos a mano · Margate"
- Titular: "Cada pieza comienza como una posibilidad".
- Sub: "Talleres de alfarería y cerámica hechos a mano en Margate. Cada pieza arrojada, construida a mano y esmaltada en el estudio."
- CTA 1: "Explorar la tienda"
- CTA 2: "Reservar un taller"
- Nota: "Charlotte Reid · Estudio abierto con cita previa · Margate Old Town"

**Talleres**:
- Lanzamiento de ruedas: £75/persona / 2 horas / Hasta 6 personas / "El taller más popular. Aprenda a centrar arcilla, abrir y lanzar su primera vasija en la rueda. Hará 2 o 3 piezas para llevarse a casa después de cocerlas". 
- Construcción manual: £65/persona / 2 horas / Hasta 8 personas / "No se requiere rueda. Ollas de pellizco, construcción con bobinas y construcción de losas. Perfecto para aquellos que prefieren una experiencia más meditativa yproceso táctil."
- Vidriado y cocción: £45/persona / 1 hora / Piezas existentes / "Traiga trabajos existentes sin cocer o utilice bisqueware de estudio. Experimenta con nuestra paleta de esmaltes y déjanos el resto a nosotros."

**Colecciones**:
- Vajilla: "Cuencos, tazas, platos y fuentes. Hecho para ser usado diariamente. Apto para lavavajillas." — desde £28
- Recipientes decorativos: "Jarrones, jarras y tarros de almacenamiento. Cada uno es único desde el lanzamiento." — desde £45
- Obras escultóricas: "Piezas de pared, formas escultóricas y obras únicas". — desde £120

**Declaración del artista**:
- Cita extraída: "Hago trabajos que contienen cosas: agua, luz, memoria". 
- Nombre: "CHARLOTTE REID — POTTER & FOUNDER"
- Bio 1: "Cada pieza está hecha en mi estudio de Margate. Lanzado, recortado, secado, bisqueado, esmaltado a mano y horneado. Sin atajos. Solo arcilla, tiempo y manos." 
- Bio 2: "Soy Charlotte Reid. Trabajo en Margate desde 2018. Antes de la cerámica, trabajé en diseño gráfico. Dejé ese mundo para hacer cosas con mis manos y no he mirado atrás". 
- Ubicación: "Visitas al estudio con cita previa · Margate Old Town · Margate, Kent"

**Programa** (8 talleres en enero/febrero; consulte la sección 6 anterior)

**Comisión**: "¿Tiene algo específico en mente?" / "Acepto comisiones durante todo el año para juegos de vajilla, regalos personalizados y obras escultóricas. Cada comisión comienza con una conversación: para comprender el uso, el destinatario y lo que espera conservar." / "El plazo de entrega típico es de 6 a 8 semanas desde la aprobación. Precios desde £150 por piezas individuales, desde £350 por juegos de vajilla." / "Pregunte sobre una comisión"

**Testimonio**: "Mi regalo de Navidad para mí. El taller de Lanzamiento de Ruedas fueron dos de las mejores horas que he pasado." — Emma W. · Participante del taller

**Contacto**: Margate Old Town / Con cita previa / hello@clayandform.co.uk

## Dependencias clave
```json
{
  "dependencies": {
    "react": "^18",
    "framer-motion": "^11",
    "lucide-react": "latest",
    "@shadcn/ui": "latest",
    "tailwindcss": "^3"
  }
}
```