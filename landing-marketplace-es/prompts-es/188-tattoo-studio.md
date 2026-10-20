Cree un sitio web completo de estudio de tatuajes de una sola página llamado **OMEN INK**: oscuro, editorial y sin formato. La estética general es negro de alto contraste con tipografía crema, un acento verde salvia apagado, exhibiciones de obras de arte estilo polaroid, tipografía de exhibición condensada mezclada con cursiva serif y una galería de mampostería. El sitio debe parecer un estudio subterráneo de primera calidad, ni corporativo ni esforzado.

---

## Regla de diseño global: centrado

**Cada sección debe estar centrada horizontalmente en la página.** Esta es una regla estricta: ninguna sección, formulario o bloque debe estar al ras o alineado a la izquierda de la ventana gráfica. edge.

Aplique este contenedor a cada sección sin excepción:

```jsx
<section className="w-full px-8 md:px-16">
  <div className="max-w-7xl mx-auto">
    {/* section content here */}
  </div>
</section>
```

El contenido más limitado (bloques de texto, formularios, preguntas frecuentes) utiliza un contenedor interno más ajustado:

```jsx
<div className="max-w-3xl mx-auto">
  {/* form, FAQ, text content */}
</div>
```

**Reglas:**
- `mx-auto` es obligatorio en cada contenedor de contenido; nunca lo omitas
- `max-w-*` siempre debe emparejarse con `mx-auto`; un ancho máximo sin `mx-auto` se alineará a la izquierda
- Los formularios, bloques de contacto y secciones de CTA son especialmente propensos a la deriva izquierda: ajuste siempre en `max-w-3xl mx-auto` o `max-w-2xl mx-auto`
- NO use `ml-0` o `mr-auto`: eso alinea el bloque a la izquierda
- Alineación de texto dentro de las secciones: use `text-center` para encabezados/etiquetas donde el diseño está centrado, `text-left` para cuerpo/formulario campos

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```

---

## Sistema de diseño

```css
:root {
  --background: 0 0% 4%;          /* near-black #0A0A0A */
  --foreground: 40 20% 92%;       /* warm cream #EDE8DE */
  --primary: 130 14% 43%;         /* muted sage green #5B7B5E */
  --primary-foreground: 0 0% 4%;
  --muted: 0 0% 10%;              /* dark card bg */
  --muted-foreground: 40 8% 58%;  /* warm mid-grey */
  --border: 0 0% 16%;
  --accent: 40 20% 92%;           /* cream — used for accent labels */
}
```

Superposición de textura: fija, pantalla completa, `z-50 pointer-events-none`, grano de película PNG en `opacidad-[0.035]` con `mix-blend-mode: overlay`.

---

## Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

| Rol | Fuente | Estilo |
|------|------|-------|
| Pantalla / héroe H1 | Bebas Neue | mayúsculas, seguimiento más amplio, 10vw–15vw |
| Encabezados de sección | Cormorán Garamond | cursiva 600, 3,5rem–5rem |
| Subetiquetas/etiquetas | Inter | 500, 0,65 rem, seguimiento-[0,25 em] mayúsculas |
| Cuerpo / Preguntas frecuentes | Inter | 300–400, 1 rem |
| Estadísticas | Bebas Neue | 5rem |
| Pie de página tipo gigante | Bebas Neue | 18vw |

---

## Sistema de botones

Tres tamaños de botones explícitos: siempre `inline-flex items-center justify-center gap-2 encogimiento-0 espacios en blanco-nowrap`:

```jsx
// Primary — sage green fill
<button className="h-12 px-8 inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-inter text-sm font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-80">
  Book a Session
</button>

// Ghost — cream outline
<button className="h-10 px-6 inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap border border-[hsl(var(--foreground))] text-[hsl(var(--foreground))] font-inter text-xs font-medium tracking-[0.2em] uppercase transition-colors hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]">
  View Artists
</button>

// Text link
<button className="h-10 px-0 inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-[hsl(var(--muted-foreground))] font-inter text-sm tracking-[0.1em] uppercase hover:text-[hsl(var(--foreground))] transition-colors">
  Learn More <ArrowRight className="w-4 h-4 shrink-0" />
</button>
```

---

## Efectos visuales

**Animación de palabras escalonadas en héroe:**
```
Each word: initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 }}
```

**Inclinación de tarjeta Polaroid:**
```
Alternating slight rotations: rotate-[-2deg], rotate-[1.5deg], rotate-[-1deg], rotate-[2.5deg]
White border: border-[8px] border-white with shadow-[0_8px_32px_rgba(0,0,0,0.6)]
Card top: artwork image square-crop
Card bottom: handwritten-style caption, font-cormorant italic
```

**Galería de mampostería flotante:**
```
Each item: scale-[1.03] on hover, transition-transform duration-500 ease-out
Overlay: opacity-0 → opacity-100 on hover, bg-black/50 with sage-green label bottom-left
```

**Animación del contador de estadísticas:**
```
useEffect with requestAnimationFrame, counting from 0 to target on IntersectionObserver trigger
Duration: 1800ms, easing: ease-out cubic
```

**Preguntas frecuentes sobre acordeón:**
```
AnimatePresence + motion.div with height: 0 → auto, opacity: 0 → 1
Toggle icon: + rotates to × (rotate-45 on open)
```

---

## Desglose de componentes

### 1. Barra de navegación
```
Position: fixed top-0 w-full z-40
Background: black/80 backdrop-blur-md border-b border-white/5
Padding: px-8 py-5
Layout: flex justify-between items-center

Left: Logo — "OMEN INK" in Bebas Neue text-xl tracking-[0.3em], cream
Center (desktop): nav links — Work | Artists | Process | FAQ — Inter 300 text-xs tracking-[0.2em] uppercase, muted-foreground, hover cream
Right: "Book Now" ghost button h-9 px-5

Mobile: hamburger icon → full-screen overlay menu, nav links stacked, large Cormorant italic style
```

### 2. Héroe
```
Height: min-h-screen, relative overflow-hidden
Background: absolute inset-0 — full-bleed tattoo photography

[Media brief: image | dark studio environment — tattooist's hands working on a forearm, close-up, dim workshop lighting, black and grey palette, moody | any composition works — layout uses gradient overlay for legibility]

Gradient overlay: linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.75) 100%)

Hero content: absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-16 z-10

Top-left badge (absolute top-8 left-8):
  Inter 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--primary))] — "EST. 2009 — BROOKLYN, NY"

H1: Bebas Neue, split into words array, staggered blur-fade-up animation
  Line 1: text-[12vw] leading-none cream — "WHEN INK"
  Line 2: text-[12vw] leading-none cream — "BECOMES ART"

Subline: Cormorant Garamond italic 400, text-xl md:text-2xl muted-foreground, max-w-md, animate in after H1 with 0.5s delay
  "Custom tattoo studio. No flash. No shortcuts. Every piece is a collaboration."

CTA row: flex gap-4 mt-8 — "Book a Session" (primary button) + "View Our Work" (ghost button)

Scroll indicator: absolute bottom-8 right-8 — vertical line 60px + "SCROLL" rotated 90°, muted-foreground, Inter 300 text-[0.6rem] tracking-[0.3em]
```

### 3. Barra de estadísticas
```
Section: bg-[hsl(var(--muted))] border-y border-[hsl(var(--border))] py-10 px-8
Layout: grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center

4 stats — counter animation triggers on scroll via IntersectionObserver:
  "1,250+" — "Tattoos completed"
  "15 Yrs" — "In the industry"
  "750+" — "Returning clients"
  "8" — "Artists on roster"

Each stat:
  Number: Bebas Neue text-5xl md:text-6xl cream
  Label: Inter 300 text-xs tracking-[0.2em] uppercase muted-foreground, mt-1

Thin vertical dividers between items on desktop: border-r border-[hsl(var(--border))] last:border-0
```

### 4. Pasos del proceso: estilo Polaroid
```
Section: py-24 px-8 md:px-16 max-w-7xl mx-auto

Section label: Inter 500 text-xs tracking-[0.25em] uppercase text-[hsl(var(--primary))] mb-4 — "HOW IT WORKS"
Section heading: Cormorant Garamond italic 600 text-4xl md:text-5xl cream — "The Process"

Cards grid: grid grid-cols-1 md:grid-cols-4 gap-6 mt-16

4 polaroid cards — alternating slight CSS rotations:
  Card 1 — rotate-[-2deg]:
    Image (square, object-cover): tattoo design sketches on paper, pencil drafts, dark surface
    White padding-bottom caption area: "01 — Share Your Idea"
    Body: Inter 300 text-sm text-gray-500 mt-1 — "Tell us what you want. Reference images, vibes, placement."

  Card 2 — rotate-[1.5deg]:
    Image: tattooist sketching on paper, detail close-up, ink pens, dark workspace
    Caption: "02 — Design Review"
    Body: "We draft your custom piece and refine until it's exactly right."

  Card 3 — rotate-[-1deg]:
    Image: tattooing in progress, needle on skin, black and grey work visible, studio setting
    Caption: "03 — Tattoo Session"
    Body: "Come in, relax. Our artists work with precision and care."

  Card 4 — rotate-[2deg]:
    Image: healed tattoo detail, sharp lines, close-up on arm or forearm
    Caption: "04 — Aftercare"
    Body: "We send you home with everything you need to protect your piece."

Polaroid styling:
  bg-white, border-[10px] border-white (top/sides/bottom more for caption)
  shadow-[0_12px_40px_rgba(0,0,0,0.7)]
  Image: aspect-square w-full object-cover object-center
  Caption area: bg-white p-3 pt-2
  Number + title: font-cormorant italic text-gray-800 text-base
  Body: font-inter text-xs text-gray-400
```

### 5. Perfiles de artistas
```
Section: py-24 px-8 md:px-16 bg-[hsl(var(--muted))]

Section label + heading:
  "OUR ARTISTS" / "The Roster"

Grid: grid grid-cols-2 md:grid-cols-4 gap-px (gap-px with bg-[hsl(var(--border))] for grid lines)

4 artist cards — hover reveals social + booking link:
  Card: relative overflow-hidden aspect-[3/4] bg-[hsl(var(--muted))]

  Image (fill): portrait of tattoo artist in studio
    Card 1 — [Media brief: image | tattoo artist portrait, dark studio, arms visible with tattoos, serious expression, dim overhead light, black and grey palette]
    Card 2 — [Media brief: image | female tattoo artist at her station, tattoo machine in hand, dark background, confident posture]
    Card 3 — [Media brief: image | male tattoo artist with sleeve tattoos, dark clothing, studio mirror reflection visible]
    Card 4 — [Media brief: image | tattoo artist close-up, focused expression, tools visible, moody low-key lighting]

  Bottom info bar (always visible):
    bg-gradient-to-t from-black/90 to-transparent absolute bottom-0 inset-x-0 p-4
    Artist name: Bebas Neue text-2xl cream tracking-[0.1em]
    Specialty: Inter 300 text-xs tracking-[0.2em] uppercase text-[hsl(var(--primary))]

  Hover overlay (opacity-0 → opacity-100 via group-hover):
    bg-black/60 absolute inset-0 flex items-center justify-center
    "View Portfolio" ghost button

Artists:
  "MARCUS COLE" — "Japanese & Neo-Traditional"
  "ELENA VOSS" — "Fine Line & Botanical"
  "DAYO OKAFOR" — "Black & Grey Realism"
  "IZZY PARK" — "Geometric & Blackwork"
```

### 6. Galería de obras de arte — Albañilería
```
Section: py-24 px-8 md:px-16 max-w-7xl mx-auto

Section label + heading:
  "RECENT WORK" / "The Portfolio"

Tab row: 5 filter tabs — All | Black & Grey | Fine Line | Japanese | Geometric
  Inter 500 text-xs tracking-[0.2em] uppercase
  Active: cream + border-b-2 border-[hsl(var(--primary))]
  Inactive: muted-foreground

Masonry grid: columns-2 md:columns-3 lg:columns-4 gap-2 mt-10

12 artwork images with break-inside-avoid mb-2:
  Mix of tall and wide aspect ratios to create masonry variation
  All: group relative overflow-hidden

  Image briefs (mood only — no composition requirements):
  [Media brief: image | black and grey sleeve tattoo detail, flowers and skull motif, high contrast, skin close-up]
  [Media brief: image | fine line botanical tattoo on forearm, delicate linework, light skin background]
  [Media brief: image | japanese dragon tattoo on upper arm, bold lines, traditional palette]
  [Media brief: image | geometric mandala tattoo on shoulder, precise black lines, overhead lighting]
  [Media brief: image | blackwork abstract tattoo on ribcage, ornamental patterns]
  [Media brief: image | realism portrait tattoo, face detail, black and grey shading, photographic quality]
  [Media brief: image | minimalist single-needle tattoo, thin lines, small placement on wrist]
  [Media brief: image | neo-traditional rose tattoo, bold outline, limited color palette]
  [Media brief: image | dotwork geometric tattoo closeup, stippling texture, black ink]
  [Media brief: image | large back piece in progress, full coverage, dark studio, tattooist hands visible]
  [Media brief: image | healed fine line tattoo, snake motif, clean linework on forearm]
  [Media brief: image | ornamental chest piece tattoo, symmetrical design, dark moody photography]

  Hover state: scale-[1.04] + sage-green label bottom-left
    "Fine Line" / "Black & Grey" etc — Inter 500 text-[0.6rem] tracking-[0.2em] uppercase, bg-[hsl(var(--primary))] px-2 py-1
```

### 7. Valores
```
Section: py-24 px-8 md:px-16 border-y border-[hsl(var(--border))]

3-column grid: grid grid-cols-1 md:grid-cols-3 divide-x divide-[hsl(var(--border))]

Each column: px-10 first:pl-0 last:pr-0

Ornamental icon: thin SVG line ornament (asterisk or cross motif), text-[hsl(var(--primary))] text-3xl mb-6

Heading: Cormorant Garamond italic 600 text-3xl cream
Body: Inter 300 text-sm leading-relaxed muted-foreground mt-4 max-w-xs

Value 1 — "Artistry"
  "Every tattoo is an original. We don't copy, trace, or compromise on craft."

Value 2 — "Devotion"
  "We give your piece the time it deserves. No rush. No assembly line."

Value 3 — "Permanence"
  "You carry this forever. We take that seriously — from the first sketch to the last line."
```

### 8. Preguntas frecuentes sobre acordeón
```
Section: py-24 px-8 md:px-16 max-w-3xl mx-auto

Section label + heading:
  "FAQ" / "Common Questions"

6 accordion items — AnimatePresence, height animation on open:

  Each item:
    border-b border-[hsl(var(--border))] py-5
    Question row: flex justify-between items-center cursor-pointer
      Question: Cormorant Garamond italic 600 text-xl cream
      Icon: "+" → "×" (rotate-45 or swap) in text-[hsl(var(--primary))]
    Answer: motion.div with overflow-hidden, Inter 300 text-sm leading-relaxed muted-foreground mt-3

  Q1: "Do you take walk-ins?"
  A1: "We occasionally have walk-in availability, but most of our artists book out 2–4 weeks in advance. Reach out via our booking form and we'll let you know current wait times."

  Q2: "How much does a custom tattoo cost?"
  A2: "Pricing depends on size, complexity, and placement. Our minimum is $150. Most custom pieces range from $300–$800+. We'll give you a proper quote after reviewing your concept."

  Q3: "Can I bring my own reference design?"
  A3: "Absolutely. Bring whatever inspires you — photos, artwork, sketches. Our artists will redesign it into something custom and unique to you."

  Q4: "How should I prepare for my session?"
  A4: "Eat a full meal beforehand, stay hydrated, wear comfortable clothing that gives easy access to the placement area. Avoid alcohol 24 hours before your appointment."

  Q5: "What styles do your artists specialize in?"
  A5: "Our roster covers black & grey realism, fine line, botanical, Japanese traditional, geometric and blackwork, and neo-traditional. Check each artist's profile to find your match."

  Q6: "Do you do cover-ups?"
  A6: "Yes, but not all pieces are coverable. Send us a photo of your existing tattoo and we'll give you an honest assessment before booking anything."
```

### 9. Reserva CTA
```
Section: py-32 px-8 md:px-16 relative overflow-hidden

Background: absolute inset-0 — tattoo studio photography with strong gradient overlay
[Media brief: image | tattoo studio interior, tools laid out on tray, dark dramatic lighting, equipment detail]
Gradient overlay: absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))]/95 via-[hsl(var(--background))]/70 to-transparent

Content: relative z-10 max-w-2xl

Eyebrow: "READY TO GET TATTOOED?" — Inter 500 text-xs tracking-[0.3em] uppercase text-[hsl(var(--primary))]
Heading: Cormorant Garamond italic 600 text-5xl md:text-6xl cream leading-tight mt-3
  "Start your collaboration."
Body: Inter 300 text-base muted-foreground mt-6 max-w-lg
  "Fill out the form below and we'll reach out within 48 hours to discuss your idea, timeline, and which artist is the best fit."

Contact form (mt-10):
  grid grid-cols-1 md:grid-cols-2 gap-4

  Inputs: bg-[hsl(var(--muted))] border border-[hsl(var(--border))] h-12 px-4 text-sm text-cream placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] outline-none transition-colors

  Name (full width), Email, Phone, Placement (text: "Where on the body?"), Style Preference (select: Black & Grey / Fine Line / Japanese / Geometric / Other), Message (textarea, h-32, col-span-2), File upload (col-span-2, dashed border, "Attach reference images — JPG or PNG, max 10MB")

  Submit: "Send Enquiry" primary button h-12 px-10 mt-2 w-full md:w-auto
```

### 10. Pie de página
```
Section: pt-24 pb-12 px-8 md:px-16 border-t border-[hsl(var(--border))]

Giant type: Bebas Neue text-[18vw] leading-none cream opacity-10 select-none overflow-hidden
  "OMEN INK"

Info row (overlaps the giant text visually via negative margin or relative positioning):
  mt-[-4rem] relative z-10
  grid grid-cols-1 md:grid-cols-4 gap-8

  Col 1:
    "OMEN INK" Bebas Neue text-lg tracking-[0.3em] cream
    "Custom Tattoo Studio" Inter 300 text-xs muted-foreground mt-1
    "Brooklyn, New York" text-xs muted-foreground

  Col 2 — "Studio":
    Label: Inter 500 text-xs tracking-[0.25em] uppercase text-[hsl(var(--primary))] mb-4
    Links: Work, Artists, Process, FAQ — Inter 300 text-sm muted-foreground hover:text-cream block mb-2

  Col 3 — "Contact":
    Email: studio@omenink.com
    Phone: +1 (347) 555-0182
    Hours: Mon–Sat, 11am–8pm

  Col 4 — "Follow":
    @omenink — Instagram
    @omenink — TikTok
    Omen Ink — Pinterest

  Bottom bar: mt-16 flex justify-between items-center border-t border-[hsl(var(--border))] pt-6
    "© 2026 Omen Ink. All rights reserved." Inter 300 text-xs muted-foreground
    "Brooklyn, New York" — same style
```

---

## Resumen de animaciones

| Elemento | Animación | Gatillo |
|---------|-----------|---------|
| Palabras de héroe H1 | desenfoque + desvanecimiento, escalonado 0,08 s por palabra | en carga |
| Sublínea de héroe + CTA | desvanecimiento, retraso 0,6 s | en carga |
| Contadores de estadísticas | conteo 0 → objetivo, liberación gradual de 1800 ms | IntersecciónObservador |
| Tarjetas polaroid | desvanecimiento + asentamiento con ligera inclinación, escalonado | IntersecciónObservador |
| Tarjetas de artista flotan | desvanecimiento de superposición, escala | flotar |
| Los elementos de la galería se desplazan | escala 1.04 + desvanecimiento de etiqueta | flotar |
| Preguntas frecuentes sobre acordeón | altura + opacidad ampliar | haga clic en |
| Encabezados de sección | opacidad 0 → 1, y 20 → 0 | IntersectionObserver |

---

## Responsive

**Móvil (< 768px):**
- Hero H1: texto-[18vw] → 2 líneas
- Estadísticas: 2×2 grid
- Tarjetas Polaroid: una sola columna, centrada, sin rotación
- Cuadrícula de artista: 2 columnas
- Mampostería de galería: 2 columnas
- Valores: apilados, sin divisores
- Columnas de pie de página: apilado

**Escritorio (≥ 768px):**
- Todas las cuadrículas según lo especificado
- Rotaciones Polaroid activas
- Estadísticas de 4 columnas
- Albañilería 4 columnas

---

## Todo Copia

**Marca:** OMEN INK — Custom Tattoo Studio
**Lema:** "Cuando la tinta se convierte en arte".
**Sublínea:** "Estudio de tatuaje personalizado. Sin flash. Sin atajos. Cada pieza es una colaboración."
**Insignia de ubicación:** EST. 2009 — BROOKLYN, NY

**Nav:** Trabajo · Artistas · Proceso · Preguntas frecuentes · Reservar ahora

**Estadísticas:** Más de 1250 tatuajes completados · 15 años en la industria · Más de 750 clientes recurrentes · 8 artistas en lista

**Proceso:** Comparte tu idea · Revisión de diseño · Sesión de tatuajes · Cuidado posterior

**Artistas:** Marcus Cole: japonés y neotradicional · Elena Voss: línea fina y botánico · Dayo Okafor: realismo negro y gris · Izzy Park: geométrico y negro

**Pestañas de galería:** Todo · Negro y gris · Línea fina · Japonés · Geométrico

**Valores:** Arte · Devoción · Permanence

**CTA de reserva:** "LISTO PARA OBTENER¿TATUADO?" / "Comience su colaboración."
Cuerpo: "Complete el siguiente formulario y nos comunicaremos con usted dentro de las 48 horas para analizar su idea, cronograma y qué artista es el más adecuado".

**Redes sociales de pie de página:** @omenink — Instagram · @omenink — TikTok · Omen Ink — Pinterest

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx"
}
```

---

*Notas rápidas:*
- *Las rotaciones de tarjetas Polaroid utilizan `style={{ transform: 'rotate(-2deg)' }}` en línea en lugar de valores arbitrarios de Tailwind: más confiable entre los constructores*
- *Masonry está basado en `columnas` de CSS, sin biblioteca externa necesario*
- *Pestañas de filtro de galería actualmente estáticas: agregue `useState` para alternar la visibilidad por categoría si el creador lo admite*