# Inkwell Studio — Aviso del sitio web de Tattoo Studio

## 1. Declaración de objetivos
Cree un sitio web original, audaz y con un portafolio de artistas para Inkwell Studio, una marca de estudio de tatuajes premium con una estética puramente negra y roja eléctrica: una revista subterránea se combina con una galería de arte editorial, impulsada por efectos de falla, textura de ruido y marquesina infinita.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: 0 0% 2%;             /* near-pure black #050505 */
  --foreground: 30 10% 94%;          /* off-white #f0ede8 */
  --primary: 0 73% 45%;              /* electric red #cc2222 */
  --primary-foreground: 0 0% 100%;
  --muted-foreground: 30 8% 58%;     /* warm gray */
  --border: 0 0% 12%;                /* dark border */
  --card: 0 0% 6%;                   /* near-black card */
  --accent: 0 73% 45%;               /* electric red */
  --red-glow: rgba(204, 34, 34, 0.3);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```
- **Mostrar encabezados / marca denominativa (H1, texto principal grande):** Bebas Neue, espacio entre letras 0,05 em, altura de línea 0,95
- **Cuerpo/navegación/UI/etiquetas:** Space Mono 400–700, espacio entre letras 0,05em, sensación monoespacial
- **Sección cejas/etiquetas:** Space Mono 700, 0,7rem, espaciado entre letras 0,2em, mayúsculas, color: var(--primary)
- **Párrafos del cuerpo del texto:** Space Mono 400, 0,9rem, altura de línea 1,9, color: var(--muted-foreground)
- **Precio/números de acento:** Bebas Neue, 3–4rem, text-primary
- **Enlaces de navegación:** Space Mono 400, 0,8rem, espaciado entre letras 0,12em, mayúsculas, texto en primer plano/70 hover:text-foreground

## 5. Efectos visuales

### Efecto 1: Animación de error de héroe activado Marca denominativa "INKWELL"
```tsx
// GlitchText.tsx
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

export function GlitchText({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    // Trigger glitch every 3 seconds
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative inline-block">
      {/* Main text */}
      <span
        className="relative z-10 font-display text-foreground"
        style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
      >
        {text}
      </span>
      {/* Red glitch layer */}
      <span
        className="absolute inset-0 font-display text-primary"
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          letterSpacing: '0.05em',
          clipPath: glitching ? 'inset(15% 0 50% 0)' : 'inset(50% 0 50% 0)',
          transform: glitching ? 'translateX(-4px)' : 'translateX(0)',
          opacity: glitching ? 0.9 : 0,
          transition: 'clip-path 0.08s steps(2), transform 0.08s steps(2), opacity 0.05s',
        }}
      >
        {text}
      </span>
      {/* White glitch layer */}
      <span
        className="absolute inset-0 font-display text-foreground"
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          letterSpacing: '0.05em',
          clipPath: glitching ? 'inset(55% 0 25% 0)' : 'inset(50% 0 50% 0)',
          transform: glitching ? 'translateX(5px)' : 'translateX(0)',
          opacity: glitching ? 0.7 : 0,
          transition: 'clip-path 0.1s steps(2), transform 0.1s steps(2), opacity 0.05s',
          transitionDelay: '0.04s',
        }}
      >
        {text}
      </span>
    </div>
  )
}
```

### Efecto 2: Ticker de cartera de dos filas (marco infinito, direcciones opuestas)
```tsx
// PortfolioTicker.tsx
import { motion } from 'motion/react'

// 8 tattoo photos per row = 16 total (both rows)
const row1Images = Array(8).fill(null)
const row2Images = Array(8).fill(null)

function MarqueeRow({ images, reverse = false }: { images: null[]; reverse?: boolean }) {
  const doubled = [...images, ...images]
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-3"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ width: 'max-content' }}
      >
        {doubled.map((_, i) => (
          <div key={i} className="w-56 h-72 flex-shrink-0 overflow-hidden relative group">
            {/* Row 1 image descriptions (indices 0–7): */}
            {/* 0: fine line botanical tattoo — delicate fern frond on inner arm, black ink, healed state, clean white BG close-up */}
            {/* 1: traditional rose tattoo — classic bold red rose, black outline, forearm, vibrant, medium shot */}
            {/* 2: blackwork geometric tattoo — intricate mandala/geometric on upper arm, striking pattern, skin BG close-up */}
            {/* 3: realism portrait tattoo — lifelike female face in profile, shading technique, shoulder, studio light */}
            {/* 4: fine line minimalist — tiny constellation tattoo on wrist, delicate single-needle style */}
            {/* 5: Japanese traditional — koi fish and waves, bold color and line, upper arm, vibrant */}
            {/* 6: blackwork animal — fox silhouette with geometric elements, thigh, artistic composition */}
            {/* 7: realism nature — hyper-realistic moth with luna pattern, black and grey, forearm */}
            {/* Row 2 image descriptions (same slots in row 2, different tattoos): */}
            {/* 0: traditional dagger and rose — bold lines, forearm sleeve segment, classic American traditional */}
            {/* 1: fine line script — elegant handwritten quote, ribcage placement, delicate and precise */}
            {/* 2: blackwork architecture — cityscape skyline, ankle, detailed crosshatch shading */}
            {/* 3: realism animal — black and grey wolf portrait, shoulder blade, incredible detail */}
            {/* 4: fine line portrait — minimal face with floral elements, collarbone, delicate */}
            {/* 5: neo-traditional flower — ornate peony with decorative shading, watercolor influence, upper arm */}
            {/* 6: geometric abstract — sacred geometry intersecting circles, sternum, precise linework */}
            {/* 7: traditional eagle — bold American traditional, chest piece, powerful composition */}
            <img
              src=""
              alt={`Tattoo portfolio piece ${i % 8 + 1}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Red hover overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function PortfolioTicker() {
  return (
    <section className="py-6 space-y-3 overflow-hidden">
      <MarqueeRow images={row1Images} reverse={false} />
      <MarqueeRow images={row2Images} reverse={true} />
    </section>
  )
}
```

### Efecto 3: Superposición de textura de ruido/grano (crítico para Raw) Feel)
```tsx
// GrainOverlay.tsx — MUST render at root level, z-50
export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-[999] pointer-events-none select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay',
        opacity: 0.35,
      }}
    />
  )
}
```

### Efecto 4: tarjetas de artista con borde izquierdo de color rojo intenso al pasar el cursor
```tsx
import { motion } from 'motion/react'

<motion.div
  className="relative bg-card border border-border p-8 cursor-pointer overflow-hidden group"
  whileHover={{ borderColor: 'rgba(204,34,34,0.4)' }}
  transition={{ duration: 0.25 }}
>
  {/* Red left accent border — slides in on hover */}
  <motion.div
    className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
    initial={{ scaleY: 0 }}
    whileHover={{ scaleY: 1 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    style={{ originY: 0 }}
  />
  {/* Card content */}
</motion.div>
```

### Efecto 5: brillo rojo en la CTA de reserva Sección
```tsx
<section
  className="py-24 px-8 md:px-16 relative overflow-hidden"
  style={{ background: 'var(--background)' }}
>
  {/* Red glow blob */}
  <div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    style={{ zIndex: 0 }}
  >
    <div
      className="w-[600px] h-[300px] rounded-full blur-[120px]"
      style={{ background: 'rgba(204,34,34,0.15)' }}
    />
  </div>
  <div className="relative z-10">
    {/* CTA content */}
  </div>
</section>
```

## 6. Desglose de componentes

### 6.1 Barra de navegación
```tsx
// Fixed, top-0, z-40, w-full, bg-[#050505]/90 backdrop-blur-sm, border-b border-border
// Height: h-16 (64px)
// Layout: px-6 md:px-12, flex items-center justify-between
// Left: "INKWELL" wordmark — Bebas Neue, 1.8rem, letter-spacing 0.1em, text-foreground
//       With a small red dot/underscore accent after wordmark
// Center (desktop): nav links ["Portfolio", "Artists", "Styles", "Process", "FAQ", "Book"]
//   Space Mono 400, 0.75rem, letter-spacing 0.12em, uppercase, gap-8, text-foreground/60, hover text-foreground
// Right: "Book Now" — border border-primary text-primary, px-5 py-2, Space Mono 700, 0.75rem, uppercase
//        hover: bg-primary text-white, transition 0.2s
// Mobile: hamburger (3 horizontal lines, 20px, text-foreground), full-screen black menu
//         Links in Bebas Neue, 3rem, centered, with red hover color
```

### 6.2 Hero Sección
```tsx
// min-h-screen, relative, bg-[#050505]
// Layout: flex flex-col items-center justify-center, px-6 md:px-12, text-center
// Top accent line: w-16 h-px bg-primary mx-auto mb-8
// Eyebrow: "EST. 2014 — LONDON, UK" — Space Mono 400, 0.75rem, letter-spacing 0.2em, text-primary/80, mb-6
// Main wordmark: GlitchText component
//   "INKWELL STUDIO" in Bebas Neue, clamp(5rem, 15vw, 14rem), text-foreground
//   Each word on its own line (or two lines), massive
// Red divider line: w-24 h-0.5 bg-primary mx-auto my-6
// Subtext: "Fine Line · Traditional · Blackwork · Realism" — Space Mono 400, 0.85rem, letter-spacing 0.15em, text-foreground/50
// CTA buttons: flex gap-4, mt-10
//   Primary: "Book a Consultation" — bg-primary text-white, px-8 py-4, Space Mono 700, 0.8rem, uppercase
//   Secondary: "View Portfolio" — border border-foreground/30 text-foreground/70, px-8 py-4, Space Mono 400, 0.8rem
// Bottom scroll indicator: "SCROLL" + line, absolute bottom-8, centered, Space Mono 400, 0.65rem, letter-spacing 0.3em, text-foreground/30
//   + animated ChevronDown pulsing
// Background: pure black, no image — hero IS the glitch type
```

### 6.3 Ticker de Portafolio
```tsx
// Immediately below hero
// No horizontal padding (full bleed)
// Section label: "PORTFOLIO" — Space Mono 700, 0.7rem, letter-spacing 0.3em, uppercase, text-primary, px-6 md:px-12, mb-4
// PortfolioTicker component (see Effect 2)
// Two rows, opposite scroll directions
// py-2 between rows
```

### 6.4 Sección de Artistas
```tsx
// py-24 px-6 md:px-12
// Heading: "MEET THE ARTISTS" — Bebas Neue, 5rem, text-foreground, mb-4
// Red accent line below heading: w-16 h-0.5 bg-primary, mb-16
// Grid: grid-cols-1 md:grid-cols-3, gap-6
// Each artist card (see Effect 4 — red border slide):
//   - Photo: aspect-square, object-cover, object-center, mb-6, grayscale (filter: grayscale(100%)) hover:grayscale(0) transition 0.4s
//   - Name: Bebas Neue, 2.5rem, text-foreground, mb-1
//   - Specialty: Space Mono 400, 0.8rem, text-primary, letter-spacing 0.1em, uppercase, mb-4
//   - Bio: Space Mono 400, 0.85rem, text-muted-foreground, line-height 1.9, mb-6
//   - Style tags: flex gap-2, wrap — each tag: border border-border text-muted-foreground, px-2 py-0.5, Space Mono 400, 0.7rem, uppercase
//   - "View Portfolio →" link: Space Mono 700, 0.8rem, text-primary, hover:underline, mt-auto

// Artist photo descriptions:
// {/* Image: male tattoo artist at work — close-up of tattooing a client, hands and machine in focus, dark studio lighting, artistic atmosphere, dramatic side light on concentrated artist face */}
// {/* Image: female tattoo artist — studio portrait with visible tattoo sleeves, arms crossed, confident expression, studio environment with tattoo flash art on wall behind */}
// {/* Image: tattoo artist examining stencil design on paper/skin, focused, moody dark studio light, artistic close-up, tattooed hands visible */}
```

### 6.5 Sección de Estilos
```tsx
// py-24 px-6 md:px-12, bg-card (very dark, subtle differentiation from pure black)
// Heading: "OUR STYLES" — Bebas Neue, 5rem, text-foreground, mb-16
// Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4, gap-4
// Each style card:
//   - Image: aspect-[3/4], object-cover, grayscale, hover:grayscale-0, transition 0.5s
//   - Below image: bg-[#050505], p-5
//     - Style name: Bebas Neue, 2rem, text-foreground, mb-2
//     - Red accent line: w-8 h-0.5 bg-primary, mb-3
//     - Desc: Space Mono 400, 0.8rem, text-muted-foreground, line-height 1.9
//   - Bottom border: border-b-2 border-primary/0 hover:border-primary/100 transition 0.3s

// Style image descriptions:
// {/* Image: fine line tattoo close-up — intricate botanical or geometric single-needle work, high detail, clean skin, macro photography style */}
// {/* Image: traditional American tattoo — bold classic design, strong black outline, primary colors, historic sailor tattoo aesthetic */}
// {/* Image: blackwork tattoo — solid black ink geometric or tribal large-scale piece, striking contrast, dramatic photograph */}
// {/* Image: realism tattoo — photorealistic portrait or nature scene, incredible shading detail, black and grey, side-lit to show dimension */}
```

### 6.6 Sección de Proceso
```tsx
// py-24 px-6 md:px-12
// Heading: "THE PROCESS" — Bebas Neue, 5rem, text-foreground, mb-16
// Horizontal timeline: flex flex-col md:flex-row, gap-0 (connected by lines)
// 4 steps:
//   Each step: flex-1, relative
//     - Connector line between steps: absolute, horizontal, top center of number, bg-primary/30, h-px
//     - Step number: "01"–"04" — Bebas Neue, 4rem, text-primary/20, mb-2
//     - Red dot indicator: w-3 h-3 rounded-full bg-primary, mb-4, mx-auto (on horizontal layout)
//     - Title: Bebas Neue, 2rem, text-foreground, mb-3
//     - Desc: Space Mono 400, 0.85rem, text-muted-foreground, line-height 1.9
```

### 6.7 Preguntas frecuentes Sección
```tsx
// py-24 px-6 md:px-12, border-t border-border
// Heading: "FAQ" — Bebas Neue, 5rem, text-foreground, mb-16
// Layout: max-w-3xl, mx-auto
// Accordion: each item — border-b border-border, py-5
//   Question: Space Mono 700, 0.95rem, text-foreground, cursor-pointer
//   Expand icon: + / − in text-primary, transition rotation 0.2s
//   Answer: Space Mono 400, 0.875rem, text-muted-foreground, line-height 1.95, mt-4
//   Active state: question color text-primary
//   Use Framer Motion AnimatePresence for accordion expand
```

### 6.8 CTA de reserva Sección
```tsx
// py-32 px-6 md:px-12, bg-[#050505], red glow bg effect (see Effect 5)
// Centered, max-w-2xl, mx-auto
// Eyebrow: "READY?" — Space Mono 700, 0.7rem, letter-spacing 0.4em, text-primary, mb-6
// Heading: Bebas Neue, clamp(4rem, 10vw, 8rem), text-foreground, line-height 0.95, mb-8
// Subtext: Space Mono 400, 0.9rem, text-muted-foreground, line-height 1.9, mb-10, max-w-lg, mx-auto
// CTA: large primary button
//   "Book a Consultation" — bg-primary text-white, px-12 py-5, Bebas Neue, 1.5rem, letter-spacing 0.05em
//   hover: bg-primary/90, box-shadow: 0 0 40px rgba(204,34,34,0.4), transition 0.25s
// Secondary: "Or call us: 020 7890 1234" — Space Mono 400, 0.85rem, text-muted-foreground, mt-6
// Aftercare link below: "Download Aftercare Guide →" — Space Mono 400, 0.8rem, text-foreground/40, hover:text-foreground, mt-8
```

### 6.9 Pie de página
```tsx
// py-16 px-6 md:px-12, bg-[#050505], border-t border-border
// Top: grid grid-cols-2 md:grid-cols-4, gap-10, pb-12, border-b border-border
//   Col 1: INKWELL wordmark (Bebas Neue, 2rem) + tagline + social icons (Instagram, TikTok)
//   Col 2: Studio — Artists, Portfolio, Styles, Process, FAQ
//   Col 3: Visit — address, hours, phone, email
//   Col 4: Policy — Booking Policy, Aftercare Guide, Deposit Info, Age Policy (18+)
// Bottom: flex justify-between, pt-8
//   Copyright: Space Mono 400, 0.75rem, text-foreground/25
//   "18+ ONLY · NO WALK-INS" — Space Mono 700, 0.7rem, text-primary, letter-spacing 0.15em
```

## 7.Animaciones

### Sincronización del efecto de falla
```tsx
// Trigger: every 3000ms
// Active duration: 400ms
// Red layer clip-path: inset(50%→15%) / translate(-4px)
// White layer clip-path: inset(50%→55%) / translate(+5px)
// Both: transition steps(2) for hard/digital feel
// Steps between: 2 (not smooth — jerky = authentic glitch)
```

### Entrada del héroe
```tsx
// Eyebrow: initial={{ opacity: 0 }}, animate={{ opacity: 1 }}, delay 0.3s
// Wordmark: initial={{ opacity: 0, letterSpacing: '0.5em' }}, animate={{ opacity: 1, letterSpacing: '0.05em' }}
//   delay 0.5s, duration 0.8s
// Red divider: initial={{ scaleX: 0 }}, animate={{ scaleX: 1 }}, delay 0.9s, duration 0.4s
// Subtext: initial={{ opacity: 0 }}, delay 1.1s
// CTAs: initial={{ opacity: 0, y: 20 }}, delay 1.3s
```

### Ticker filas
```tsx
// Row 1: x '0%' → '-50%', duration 30s, repeat Infinity, ease 'linear'
// Row 2: x '-50%' → '0%', duration 30s (opposite), repeat Infinity, ease 'linear'
// Image hover: scale 1→1.05, grayscale on non-hover image bg
```

### Tarjeta de artista flotante
```tsx
// Red left border: scaleY 0→1, originY: 0, duration 0.25s
// Card borderColor transition: 0.25s
// Photo: grayscale(100%)→grayscale(0), duration 0.4s
// whileHover: card y: 0→-2
```

### Tarjeta de estilo
```tsx
// Image grayscale: 100%→0%, duration 0.5s ease-out
// Bottom border: border-primary/0→border-primary/100, duration 0.3s
```

### Línea de tiempo del proceso entrada
```tsx
// Steps stagger: delay index * 0.15s
// Step number: initial={{ opacity: 0, y: 30 }}, whileInView{{ opacity: 1, y: 0 }}
// Connector lines: initial={{ scaleX: 0 }}, whileInView{{ scaleX: 1 }}, delay after step appears
```

### Preguntas frecuentes acordeón
```tsx
// AnimatePresence, height: 0 → auto
// motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
// transition: { duration: 0.3, ease: 'easeInOut' }
// + icon: rotate 0 → 45deg on open
```

### Reserva CTA
```tsx
// Button hover: boxShadow 0 0 40px rgba(204,34,34,0.4), transition 0.25s
// Red glow blob: animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.2, 0.15] }}, 4s infinite
```

### Títulos de sección entrada
```tsx
initial={{ opacity: 0, x: -30 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca denominativa + hamburguesa; superposición negra en pantalla completa, enlaces en Bebas Neue 3rem
- Héroe: marca denominativa clamp(4rem, 15vw, 8rem), subtexto más pequeño, CTA apilados en ancho completo
- Ticker: ligeramente más rápido (25 s), imágenes w-44 h-60
- Artistas: una sola columna, apilado
- Estilos: 2 columnas en dispositivos móviles (cuadrícula de 2 × 2)
- Proceso: apilados verticalmente (una sola columna), las líneas de conexión se convierten en barras horizontales sobre cada paso
- Preguntas frecuentes: ancho completo, mismo comportamiento en acordeón
- Reserva CTA: H2 4rem, botón ancho completo
- Pie de página: 2 columnas arriba, apiladas individuales debajo sm

### Escritorio (>= 1024px)
- Barra de navegación: navegación horizontal completa, todos los enlaces visibles
- Héroe: tipografía masiva centrada, max-w sin restricciones
- Ticker: visualización completa de 2 filas
- Artistas: 3 columnas
- Estilos: 4 columnas
- Proceso: línea de tiempo horizontal de 4 pasos con líneas de conexión
- Preguntas frecuentes: max-w-3xl centered
- CTA de reserva: max-w-2xl centered
- Pie de página: 4 columnas

## 9. Copia completa

### Nombre de marca
Inkwell Studio

### Navbar
- Marca denominativa: INKWELL
- Enlaces: Portafolio · Artistas · Estilos · Proceso · Preguntas frecuentes · Libro
- CTA: Reservar ahora

### Hero
- Ceja: EST. 2014 — LONDRES, Reino Unido
- H1 (GlitchText): INKWELL STUDIO
- Línea divisoria roja: solo elemento visual
- Subtexto: Línea fina · Tradicional · Blackwork · Realismo
- CTA principal: Reserve una consulta
- Secundario CTA: Ver cartera
- Indicador de desplazamiento: SCROLL

### CarteraTicker
- Etiqueta de sección: PORTFOLIO
- (Ticker se ejecuta continuamente, sin copia adicional)

### Sección de artistas
- Título: CONOCE A LOS ARTISTAS
- **Artista 1 - Marcus Kane**
 - Especialidad: Línea fina y realismo
 - Etiquetas de estilo: Línea fina · Realismo · Retratos
 - Bio: Marcus aporta la mirada de un fotógrafo a cada pieza. Su trabajo de líneas finas es arquitectónico, preciso y construido para durar. Sus retratos de realismo se encuentran entre los más logrados técnicamente en la ciudad.
 - Enlace: Ver Portafolio →
- **Artista 2 — Jade Rivers**
 - Especialidad: Tradicional y Neotradicional
 - Etiquetas de estilo: Tradicional · Neotradicional · Color
 - Bio: Jade Estudió tatuajes tradicionales americanos clásicos antes de desarrollar su propia y audaz voz neotradicional. Su trabajo de color es saturado, deliberado e inconfundiblemente suyo.
 - Enlace: Ver portafolio →
- **Artista 3 — Sol Mercer**
 - Especialidad: Blackwork y Geométrico
 - Etiquetas de estilo: Blackwork · Geométrico · Ornamental
 - Biografía: Sol crea Tatuajes que parecen arquitectura en la piel. Trabajo en negro de precisión, geometría sagrada y patrones ornamentales que cubren y conectan de maneras que parecen inevitables.
 - Enlace: Ver portafolio →

### Sección de estilos
- Título: NUESTROS ESTILOS
- **Estilo 1 — Línea fina**
 - Desc: Precisión delicada con una sola aguja trabajo. Botánicos, retratos, guiones y geometría minimalista: creados para clientes que desean algo sutil pero duradero. 
- **Estilo 2: tradicional**
 - Descripción: contornos llamativos, rellenos sólidos, temas atemporales. Tatuaje tradicional estadounidense hecho como debía: líneas seguras, colores fuertes, construidos para envejecer maravillosamente. 
- **Estilo 3 — Blackwork**
 - Desc: Piezas llamativas en tinta negra sólida. Diseños arquitectónicos, geométricos y de inspiración tribal a gran escala que llaman la atención y mantienen su poder a lo largo del tiempo. 
- **Estilo 4 — Realismo**
 - Desc: Retratos, naturaleza y objetos fotorrealistas representados en negro y gris o a todo color. el mas tecnicoestilo exigente que ofrecemos, y el más impresionante cuando se hace bien.

### Sección de proceso
- Título: EL PROCESO
- **Paso 01 — Consulta**
 - Título: Consulta
 - Desc: Cada pieza comienza aquí. Hablamos de tu idea, ubicación, tamaño y referencias. Ningún trabajo de diseño comienza hasta que ambos nos sintamos alineados con la visión.
- **Paso 02 — Diseño**
 - Título: Diseño
 - Descripción: Su artista crea un diseño personalizado basado en la consulta. Recibirá una vista previa para su revisión y revisión antes de reservar su sesión.
- **Paso 03 - Sesión**
 - Título: Sesión
 - Desc: Venga preparado, alimentado y descansado. Su artista lo guiará a través de la colocación de la plantilla antes de que la tinta toque la piel. No nos apresuramos.
- **Paso 04: Cuidados posteriores**
 - Título: Cuidados posteriores
 - Desc: Proporcionamos una guía escrita completa de cuidados posteriores y permanecemos disponibles para preguntas durante su período de curación. Un tatuaje bien curado es un buen tatuaje.

### Sección de preguntas frecuentes
- Título: Preguntas frecuentes
- **P1:** ¿Necesito reservar con anticipación?
 - A: Sí. Todas las sesiones en Inkwell son solo con cita previa. No aceptamos visitas sin cita previa. La mayoría de nuestros artistas reservan con 4 a 8 semanas de anticipación, por lo que recomendamos comunicarse con anticipación.
- **P2:** ¿Cuánto cuesta un tatuaje?
 - R: El precio varía significativamente según el tamaño, la ubicación, la complejidad y el artista. Nuestro mínimo es £150. Las piezas personalizadas de mayor tamaño se cotizan previa consulta. Estaremos encantados de darle un presupuesto una vez que comprendamos su proyecto.
- **P3:** ¿Necesita un depósito?
 - R: Sí. Se requiere un depósito no reembolsable para garantizar su reserva. Esto se destina al costo total de su tatuaje. Los depósitos se pierden si cancela dentro de las 48 horas posteriores a su cita.
- **P4:** ¿Qué debo hacer para prepararme para mi sesión?
 - R: Coma bien antes, manténgase hidratado, evite el alcohol la noche anterior y use o traiga ropa que le permita acceder fácilmente al área del tatuaje. No hay quemaduras solares ni irritación de la piel en el área.
- **P5:** ¿Te dolerá?
 - A: Sí, segúngrados dependiendo de la ubicación. La mayoría de la gente lo describe como una sensación de rascado o ardor. Nuestros artistas trabajan a un ritmo que mantiene la sesión manejable. Si necesita un descanso, solo pregunte.
- **P6:** ¿Puedo traer a alguien conmigo?
 - R: Una persona de apoyo es bienvenida. Les pedimos que permanezcan sentados y en silencio durante la sesión para ayudar a mantener la concentración y la higiene.

### Reservar sección CTA
- Ceja: ¿LISTA?
- H2: Reserve su próxima pieza.
- Subtexto: Cada pieza comienza con una conversación. Cuéntanos tu idea, tu ubicación, tu cronograma. Lo conectaremos con el artista adecuado y lo reservaremos.
- CTA: reserve una consulta
- Teléfono: o llámenos: 020 7890 1234
- Enlace de cuidados posteriores: Descargar la guía de cuidados posteriores →

### Pie de página
- Marca denominativa: INKWELL
- Lema: Art Etched for Life
- Col 2 — Estudio: Artistas · Portafolio · Estilos · Proceso · Preguntas frecuentes
- Col 3 — Visita: 19 Brick Lane, Shoreditch, Londres E1 6PU · Martes a sábado de 11 a. m. a 7 p. m., domingo de 12 p. m. a 5 p. m. · 020 7890 1234 · ink@inkwellstudio.co.uk
- Col 4 — Política: Política de reserva · Guía de cuidados posteriores · Información de depósito · Política de edad (18+) · Política de retoque
- Copyright: © 2025 Inkwell Studio. Todos los derechos reservados.
- Insignia de política: 18+ SOLAMENTE · NO SE PUEDE VISITAR SIN VISITA

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.462.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "@radix-ui/react-dialog": "^1.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.3.0"
}
```
