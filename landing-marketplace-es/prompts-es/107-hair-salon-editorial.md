# Atelier Blanche — Aviso del sitio web de peluquería

## 1. Declaración de objetivos
Crear un sitio web de estudio de belleza premium para Atelier Blanche, una marca de peluquería de alta gama con una estética editorial cálida que se siente como una revista de moda de lujo: fondos color crema, detalles en oro rosa y rica tipografía serif.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: 40 33% 97%;        /* warm cream #faf6f0 */
  --foreground: 25 14% 10%;        /* near-black #1a1612 */
  --primary: 15 35% 62%;           /* rose gold #c4907a */
  --primary-foreground: 0 0% 100%;
  --muted-foreground: 25 10% 55%;  /* warm mid-tone */
  --border: 30 20% 88%;            /* warm light border */
  --card: 38 30% 94%;              /* warm card bg */
  --accent: 15 35% 62%;            /* rose gold */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
- **Mostrar encabezados (H1, H2):** Libre Baskerville, 400–700, variante en cursiva para comillas
- **Cuerpo/navegación/etiquetas/botones:** Raleway, 300–600, espacio entre letras 0,05–0,15em
- **Precio/números de énfasis:** Libre Baskerville, 400
- **Etiquetas/etiquetas en mayúsculas:** Raleway 500, espacio entre letras 0,2 em, mayúsculas, 0,7 rem
- **Cuerpo del texto:** Raleway 300–400, 1 rem, altura de línea 1,8, color: var(--muted-foreground)

## 5. Efectos visuales

### Efecto 1: Video/foto editorial de cabello completamente sangrado del héroe
```jsx
<section className="relative w-full h-screen overflow-hidden">
  {/* Image: professional hair model in upscale salon environment, warm editorial lighting from overhead and side, tight crop emphasizing movement in freshly styled hair, deep amber/warm tones, luxury feel, close-medium shot */}
  <img src="" alt="Atelier Blanche hair styling editorial" className="w-full h-full object-cover object-center" />
  {/* Dark gradient overlay left side — text legibility */}
  <div
    className="absolute inset-0"
    style={{ background: 'linear-gradient(to right, rgba(26,22,18,0.92) 0%, rgba(26,22,18,0.75) 45%, transparent 100%)' }}
  />
  {/* Subtle bottom gradient */}
  <div
    className="absolute inset-0"
    style={{ background: 'linear-gradient(to top, rgba(26,22,18,0.4) 0%, transparent 30%)' }}
  />
</section>
```

### Efecto 2: Tarjetas de servicio deslizables escalonadas Scroll
```tsx
import { motion } from 'motion/react'

{serviceCards.map((service, index) => (
  <motion.div
    key={service.id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{
      duration: 0.65,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1]
    }}
    className="bg-card border border-border rounded-sm p-8 hover:shadow-lg transition-shadow duration-300"
  >
```

### Efecto 3: marquesina horizontal infinita (etiquetas de servicio)
```tsx
// InfiniteMarquee.tsx
import { motion } from 'motion/react'

const tags = ['CUT', 'COLOR', 'BALAYAGE', 'EXTENSIONS', 'BLOWOUT', 'TREATMENTS', 'BRIDAL', 'GLOSS', 'KERATIN']

export function InfiniteMarquee() {
  const doubled = [...tags, ...tags]
  return (
    <div className="overflow-hidden py-5 border-y" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{ width: 'max-content' }}
      >
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-[0.25em] uppercase"
            style={{ color: 'var(--muted-foreground)', fontFamily: 'Raleway, sans-serif' }}
          >
            {tag}
            <span className="mx-6" style={{ color: 'var(--primary)' }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
```

### Efecto 4: Comparación antes/después Control deslizante
```tsx
// BeforeAfterSlider.tsx
import { useState, useRef, useCallback } from 'react'
import { motion } from 'motion/react'

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(Math.max(x, 5), 95))
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] overflow-hidden cursor-col-resize select-none rounded-sm"
      onMouseMove={handleMouseMove}
    >
      {/* BEFORE image */}
      {/* Image: natural hair color, no treatment, hair appears dull and lacking dimension, neutral salon lighting */}
      <img src="" alt="Before hair color treatment" className="w-full h-full object-cover object-center absolute inset-0" />

      {/* AFTER image — clipped */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        {/* Image: same model after balayage color service, hair glowing with warm honey/caramel tones, movement, richly lit, professional salon, stunning transformation */}
        <img src="" alt="After balayage color transformation" className="absolute inset-0 w-full h-full object-cover object-left" style={{ width: `${100 / (position / 100)}%` }} />
      </div>

      {/* Drag handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 bg-white"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <span style={{ color: 'var(--primary)', fontSize: '18px' }}>⇔</span>
        </div>
      </motion.div>

      {/* Labels */}
      <span className="absolute top-4 left-4 text-xs font-medium tracking-widest uppercase bg-black/50 text-white px-3 py-1">Before</span>
      <span className="absolute top-4 right-4 text-xs font-medium tracking-widest uppercase bg-black/50 text-white px-3 py-1">After</span>
    </div>
  )
}
```

### Efecto 5: Franja de desplazamiento automático horizontal de la galería de cartera
```tsx
// HorizontalGallery.tsx
import { motion } from 'motion/react'

const galleryImages = Array(8).fill(null) // 8 portfolio photos

export function HorizontalGallery() {
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex gap-3"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        whileHover={{ animationPlayState: 'paused' }}
        style={{ width: 'max-content' }}
      >
        {[...galleryImages, ...galleryImages].map((_, i) => (
          <div key={i} className="w-64 h-80 flex-shrink-0 overflow-hidden rounded-sm">
            {/* Image descriptions for 8 slots: */}
            {/* 0: dramatic balayage transformation, warm honey tones, movement blur */}
            {/* 1: sleek blowout, model looking over shoulder, studio light */}
            {/* 2: textured curls treatment, voluminous and defined, natural light */}
            {/* 3: bridal updo with loose waves, elegant, soft window light */}
            {/* 4: platinum blonde color with face-framing highlights, editorial */}
            {/* 5: rich brunette gloss, smooth and reflective, professional styling */}
            {/* 6: before/after color correction, vibrant rich auburn, side-by-side crop */}
            {/* 7: lived-in highlights, casual luxe styling, natural outdoor light */}
            <img src="" alt={`Hair portfolio ${i % 8 + 1}`} className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
```

## 6. Desglose de componentes

### 6.1 Barra de navegación
```tsx
// Fixed top-0, z-40, w-full
// Height: h-18 (72px)
// Background: transparent on hero scroll, transitions to bg-[#faf6f0]/95 backdrop-blur-sm
// Layout: px-8 md:px-16, flex items-center justify-between
// Left: nav links desktop ["Services", "Portfolio", "Team", "About"] — Raleway 400, 0.8rem, letter-spacing 0.12em, uppercase, gap-8
//       active link: rose-gold underline (2px, offset 4px)
// Center: wordmark "ATELIER BLANCHE" — Libre Baskerville 400, 1.1rem, letter-spacing 0.2em, centered, absolute
// Right: "Book Now" button — rose gold bg, white text, px-6 py-2.5, Raleway 500, 0.75rem, letter-spacing 0.15em, uppercase
// Mobile: hide nav links, show hamburger, center wordmark
```

### 6.2 Sección héroe
```tsx
// h-screen, relative, overflow-hidden
// Full-bleed editorial hair photo with dark left gradient
// Content: absolute left-8 md:left-16 bottom-16 max-w-xl
// Eyebrow: "Premium Hair Studio" — Raleway 400, 0.75rem, letter-spacing 0.3em, uppercase, text-white/60, mb-4
// H1: "Your Most\nConfident\nVersion\nStarts Here." — Libre Baskerville 700, clamp(2.5rem, 6vw, 5rem), text-white, line-height 1.05, mb-6
// Subtext: "Expert colour. Effortless style. Every time." — Raleway 300, 1.1rem, text-white/75, mb-8
// CTA buttons: flex gap-4
//   Primary: "Book Your Appointment" — bg-[#c4907a] text-white, px-8 py-4, Raleway 500, 0.875rem
//   Secondary: "View Our Work" — border border-white/50 text-white, px-8 py-4, same type
```

### 6.3 Marquesina infinita Tira
```tsx
// Position: immediately below hero
// bg-card, border-y border-border
// py-5
// See Effect 3 — InfiniteMarquee component
// Tags loop continuously, rose gold dot separator
// On hover: animation pauses
```

### 6.4 Sección Servicios
```tsx
// py-24 px-8 md:px-16
// Header: flex justify-between items-end, mb-16
//   Left: label "OUR SERVICES" + H2 "Expert Services,\nHair as Art"
//   Right: "View all services →" link (Raleway 400, rose gold)
// Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4, gap-6
// Each card:
//   - bg-card, border border-border, rounded-sm, p-8, overflow-hidden
//   - Top: service icon placeholder (32px square, rose gold tint)
//   - Title: Libre Baskerville, 1.3rem, mb-2, text-foreground
//   - Description: Raleway 300, 0.9rem, text-muted-foreground, line-height 1.7, mb-4
//   - Price from: "From £45" — Raleway 500, 0.875rem, text-primary, mb-6
//   - Bottom: "Book Now →" link
//   - Rose gold top-border accent (3px) on hover, transition 0.3s
//   - Stagger entrance: delay index * 0.15s

// Service card photos:
// Card 1: {/* Image: model receiving professional haircut from stylist, scissors detail, salon bg */}
// Card 2: {/* Image: color application close-up, foils, balayage brush, rich color tones */}
// Card 3: {/* Image: deep conditioning treatment application, luxe salon environment, towel wrap */}
// Card 4: {/* Image: bridal hair trial updo, bride-to-be, flower accents, warm dressing-room light */}
```

### 6.5 Sección Color Antes/Después
```tsx
// py-24 px-8 md:px-16, bg-card
// Heading: "The Transformation" — centered, Libre Baskerville Italic, 3rem, mb-4
// Subtext: centered, Raleway 300, 1rem, text-muted-foreground, mb-12
// BeforeAfterSlider component (see Effect 4) — max-w-4xl, mx-auto
// Below slider: caption text + "Book a Colour Consultation →" CTA link
```

### 6.6 Franja de la galería del portafolio
```tsx
// py-16, overflow-hidden (no px padding — full bleed strip)
// Label above: "PORTFOLIO" — centered, Raleway 500, 0.75rem, letter-spacing 0.3em, mb-6, text-muted-foreground
// HorizontalGallery component (see Effect 5)
// Caption below: centered, Raleway 300, 0.875rem, text-muted-foreground
```

### 6.7 Sección Acerca de
```tsx
// py-24 px-8 md:px-16
// Layout: grid grid-cols-1 lg:grid-cols-2, gap-20, items-center
// Left column (text):
//   - Label "OUR STORY" — Raleway 500, 0.7rem, letter-spacing 0.3em, uppercase, mb-4, text-primary
//   - H2: Libre Baskerville, 2.5rem, mb-6
//   - Body: 2 paragraphs, Raleway 300, 1rem, line-height 1.85, text-muted-foreground
//   - Italic pull quote: Libre Baskerville Italic, 1.2rem, border-l-4 border-primary, pl-5, my-8, text-foreground
//   - Stats: flex gap-12, 3 stats (Years, Clients, Awards)
// Right column (photo):
//   {/* Image: warm bright salon interior — exposed brick or white wall, floor-to-ceiling mirror, luxury styling chairs, ambient warm light, elevated and aspirational feel */}
//   <img src="" alt="Atelier Blanche salon interior" className="w-full h-[600px] object-cover object-center rounded-sm" />
```

### 6.8 Equipo Sección
```tsx
// py-24 px-8 md:px-16, bg-card
// Centered header: "Meet the Team" — Libre Baskerville, 2.5rem, mb-16
// Grid: grid-cols-1 md:grid-cols-3, gap-10
// Each card:
//   - Circular photo (w-48 h-48 rounded-full mx-auto mb-6 object-cover)
//   - Name: Libre Baskerville, 1.25rem, text-center, mb-1
//   - Specialty: Raleway 400, 0.85rem, text-primary, text-center, mb-2
//   - Instagram handle: @handle, Raleway 300, 0.8rem, text-muted-foreground, text-center
//   - Short bio: Raleway 300, 0.875rem, text-center, text-muted-foreground, max-w-[260px], mx-auto

// Team photo descriptions:
// {/* Image: female hairstylist, professional styling apron, warm confident smile, salon background, head & shoulders portrait */}
// {/* Image: female colorist holding color brush, artistic pose, salon environment, warm studio portrait */}
// {/* Image: male stylist, modern look, arms crossed, salon backdrop, friendly expression, head & shoulders */}
```

### 6.9 Testimonios
```tsx
// py-24 px-8 md:px-16
// Centered heading: "What Our Clients Say" — Libre Baskerville, 2.5rem, mb-16
// Grid: grid-cols-1 md:grid-cols-3, gap-8
// Each card: bg-card, border border-border, rounded-sm, p-8
//   - Stars: 5 × ★ in rose gold (#c4907a), mb-4, font-size 1rem
//   - Quote: Libre Baskerville Italic, 1rem, line-height 1.8, text-foreground/80, mb-6
//   - Author: flex items-center gap-3
//     - Circular avatar photo (w-10 h-10 rounded-full object-cover)
//     - Name: Raleway 500, 0.9rem + date: Raleway 300, 0.75rem, text-muted-foreground
```

### 6.10 Reservas Sección
```tsx
// py-24 px-8 md:px-16, bg-[#1a1612], text-white (dark section)
// Layout: grid grid-cols-1 lg:grid-cols-2, gap-16, items-center
// Left:
//   - Eyebrow: "BOOK AN APPOINTMENT" — Raleway 500, 0.7rem, letter-spacing 0.3em, text-primary, mb-4
//   - H2: Libre Baskerville, 3rem, text-white, mb-4
//   - Body: Raleway 300, 1rem, text-white/60, line-height 1.8, mb-8
//   - Contact info: phone, email, address — each with lucide icon, Raleway 300, 0.9rem, text-white/60
// Right:
//   - Glassmorphism booking frame:
//     border border-white/10, bg-white/5, backdrop-blur-sm, rounded-sm, p-8
//   - Inside: Name, Email, Service (select), Date preference, Message inputs
//   - Raleway 300 placeholder text, rose gold focus ring
//   - Submit: full-width bg-primary button
```

### 6.11 Pie de página
```tsx
// py-16 px-8 md:px-16, bg-[#1a1612], border-t border-white/10
// Top: grid grid-cols-2 md:grid-cols-4, gap-12, pb-12, border-b border-white/10
//   Col 1: Wordmark + tagline + social icons
//   Col 2: Services links
//   Col 3: Studio links (About, Team, Press, Careers)
//   Col 4: Contact (address, hours, phone)
// Bottom: flex justify-between, pt-8
//   Left: copyright text — Raleway 300, 0.75rem, text-white/30
//   Right: Privacy Policy · Terms — same style
```

## 7. Animaciones

### Barra de navegación scroll
```tsx
const [scrolled, setScrolled] = useState(false)
// After 60px: 'bg-[#faf6f0]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
transition={{ duration: 0.25 }}
```

### Entrada de texto de héroe(escalonado)
```tsx
// Eyebrow: delay 0.3s
// H1: delay 0.5s, y: 40→0
// Subtext: delay 0.7s
// Buttons: delay 0.9s, opacity 0→1
// All: duration 0.8s, ease [0.22, 1, 0.36, 1]
```

### Marquesina
```tsx
// x: '0%' → '-50%', duration 22s, repeat Infinity, ease 'linear'
// whileHover: set animation to paused state
```

### Tarjeta de servicio flotante
```tsx
// border-top: 0→3px rose gold, transition 0.3s
// shadow: sm→lg, transition 0.3s
// whileHover: y: -4, transition duration 0.3s
```

### Antes/después control deslizante
```tsx
// Smooth mouse tracking, no transition on position for real-time feel
// Handle: slight scale on mousedown (scale 1→1.1)
```

### Franja de galería
```tsx
// x: '0%' → '-50%', duration 35s, repeat Infinity, ease 'linear'
// Image hover: scale 1→1.05, duration 0.7s ease
```

### Encabezados de sección entrada
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca de palabras centrada, hamburguesa a la derecha, no hay enlaces de navegación visibles
- Hero: el gradiente cambia a superposición completa (texto sobre imagen más oscura), H1 3rem
- Marquesina: ligeramente más rápido (18s), igual implementación
- Servicios: una sola columna, cada tarjeta de ancho completo
- Control deslizante Antes/Después: ancho completo, eventos táctiles compatibles
- Tira de galería: igual (funciona naturalmente), imágenes ligeramente más pequeñas (w-48 h-64)
- Acerca de: foto de ancho completo superior, texto debajo
- Equipo: una sola columna, apilada
- Testimonios: una sola columna, deslizable (agregar desplazamiento táctil)
- Reservas: una sola columna, formulario debajo del texto
- Pie de página: parte superior de cuadrícula de 2 columnas, apilado debajo md

### Escritorio (>= 1024px)
- Todos los diseños de varias columnas activados
- Barra de navegación: navegación horizontal completa, marca de palabras centrada
- Hero: texto max-w-xl, colocado a la izquierda-16 abajo-16
- Servicios: 4 columnas
- Acerca de: 2 columnas iguales
- Equipo: 3 columnas
- Reserva: 2 columnas (texto a la izquierda, formulario a la derecha)
- Pie de página: 4 columnas

## 9. Copia completa

### Marca
Atelier Blanche

### Navbar
- Marca denominativa: ATELIER BLANCHE
- Enlaces: Servicios · Portafolio · Equipo · Acerca de
- CTA: Reservar ahora

### Hero
- Ceja: Cabello Premium Studio
- H1: Su versión más segura comienza aquí.
- Subtexto: Color experto. Estilo sin esfuerzo. Cada vez.
- CTA principal: reserva tu cita
- CTA secundario: mira nuestro trabajo

### Marquee Tags
CUT · COLOR · BALAYAGE · EXTENSIONES · BLOWOUT · TRATAMIENTOS · BRIDAL · BRILLO · KERATINA ·

### Sección de Servicios
- Etiqueta: NUESTROS SERVICIOS
- H2: Servicios de Expertos, Cabello como Arte
- Subtexto: Desdecortes de precisión para colores complejos: cada servicio se realiza con intención y experiencia.
- **Tarjeta 1 — Corte y estilo**
 - Desc: Corte de precisión adaptado a la forma de su rostro, estilo de vida y textura de cabello. Cada corte es una conversación, cada acabado es arte.
 - Desde: Desde £65
- **Tarjeta 2 — Color**
 - Desc: Balayage, reflejos, todo color, brillo: nuestros especialistas en color aportan profundidad, dimensión y luminosidad a cada tono.
 - Desde: Desde £120
- **Tarjeta 3 — Tratamientos**
 - Descripción: Suavizado de queratina, mascarillas acondicionadoras profundas, tratamientos para el cuero cabelludo y reparación de enlaces. Cabello más sano desde la raíz hasta las puntas.
 - Desde: Desde £55
- **Tarjeta 4 — Novia**
 - Desc: Paquetes completos de cabello de novia para tu día más importante. Incluye pruebas, estilismo matutino y coordinación completa de la fiesta nupcial.
 - Desde: Desde £200

### Sección Antes/Después
- Encabezado: La Transformación
- Subtexto: Arrastre para revelar el antes y el después de nuestra última transformación de color.
- Pie de foto: Color Balayage servicio: 3 horas con nuestro especialista senior en color.
- CTA: Reserve una consulta de color →

### Sección de portafolio
- Etiqueta: PORTFOLIO
- Leyenda: Síganos @atelierblanche para inspiración diaria

### Acerca de Sección
- Etiqueta: NUESTRA HISTORIA
- H2: Donde el cabello se encuentra con el arte
- Para 1: Atelier Blanche nació de una simple convicción: que tu cabello debe hacerte sentir como tú mismo, solo que más. Abrimos nuestras puertas en el corazón de la ciudad con un pequeño equipo de estilistas excepcionales y una obsesión compartida por la artesanía. 
- Para 2: Cada cita aquí es deliberada. No nos apresuramos. No reservamos en exceso. Escuchamos, creamos y nos aseguramos de que salgas luciendo exactamente como lo imaginaste, y mejor.
- Cita: "El cabello es la forma más íntima de expresión personal. Nos lo tomamos en serio".
- Estadísticas: 8+ años · 2,400+ clientes · 3 premios

### Sección de equipo
- Título: Conoce al equipo
- **Estilista 1 — Marie Laurent**
 - Especialidad: SeniorColourist
 - Instagram: @marielaurent
 - Bio: 12 años de experiencia en color en Londres y París. Conocida por su exclusivo balayage y combinación de colores a medida. 
- **Estilista 2 — Chloe Park**
 - Especialidad: Master Stylist
 - Instagram: @chloepark_hair
 - Bio: Una especialista en corte de precisión con un don para comprender cómo se mueve el cabello con (y para) cada individuo client.
- **Estilista 3 — Tom Ashby**
 - Especialidad: Texturas y extensiones
 - Instagram: @tomashbyhair
 - Bio: Desde cortes texturizados hasta extensiones sin costuras, Tom aporta precisión técnica y un ojo sin esfuerzo para las dimensiones.

### Testimonios Sección
- Título: Lo que dicen nuestros clientes
- **Testimonio 1**
 - Cita: "He ido a salones de belleza toda mi vida y nunca me sentí realmente vista hasta que encontré Atelier Blanche. Marie entendió mi cabello y me dio exactamente lo que había estado tratando de describir durante años".
 - Autor: Jessica T. — Hace 3 meses
- **Testimonio 2**
 - Cita: "El balayage al que acudí fue impresionante. Pero toda la experiencia (la consulta, la atención, el resultado) fue realmente diferente a cualquier salón en el que haya estado".
 - Autor: Priya S. — Hace 1 mes
- **Testimonio 3**
 - Cita: "Atelier Blanche me peinó para mi boda y lloré cuando lo vi. De la mejor manera. Chloe es un genio absoluto. Los contraté para cada evento de cliente desde entonces".
 - Autor: Hannah W. — Hace 2 meses

### Sección de reservas
- Ceja: BOOK AN CITA
- H2: ¿Listo para transformarse?
- Cuerpo: Reserve en línea o llámenos directamente. Hacemos todo lo posible para atender las solicitudes dentro de las 48 horas y tenemos espacios de cancelación disponibles la mayoría de las semanas. 
- Contacto: 020 7123 4567 · hello@atelierblanche.com · 14 Marylebone Lane, Londres W1U 2NE
- Etiquetas de formulario: Nombre completo · Dirección de correo electrónico · Servicio · Fecha preferida · Mensaje (opcional)
- Botón: Solicitar cita
- Nota: Confirmaremos su cita dentro de las 24 horas.

### Pie de página
- Col 1: Atelier Blanche · Cabello de lujoestudio en el corazón de Londres · [Instagram, Pinterest icon]
- Col 2: Servicios — Corte y estilo · Color · Balayage · Novias · Tratamientos · Extensiones
- Col 3: Estudio — Acerca de · Nuestro equipo · Prensa · Tarjetas regalo · Carreras
- Col 4: Visita — 14 Marylebone Lane, Londres W1U 2NE · Lun–sáb 9:00–19:00 · Dom 10:00–17:00 · 020 7123 4567
- Copyright: © 2025 Atelier Blanche. Todos los derechos reservados.

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.462.0",
  "@radix-ui/react-select": "^2.1.0",
  "@radix-ui/react-dialog": "^1.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.3.0"
}
```
