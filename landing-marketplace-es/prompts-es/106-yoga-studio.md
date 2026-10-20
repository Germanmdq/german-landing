# Root & Rise — Mensaje del sitio web de Yoga & Mindfulness Studio

## 1. Declaración de objetivos
Crear un sitio web básico y centrado en la comunidad para Root & Rise, una marca de estudio de yoga y mindfulness con una estética cálida en tonos tierra, formas orgánicas y animaciones visuales respirables que hacen que los visitantes se sientan tranquilos y bienvenidos.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: 33 67% 92%;         /* warm sand #f5ede0 */
  --foreground: 20 20% 15%;         /* deep warm dark #2a2218 */
  --primary: 118 12% 54%;           /* sage green #7d9b76 */
  --primary-foreground: 0 0% 100%;
  --secondary: 22 47% 54%;          /* terracotta #c97b4c */
  --secondary-foreground: 0 0% 100%;
  --muted-foreground: 25 15% 45%;   /* warm mid-tone brown */
  --border: 33 35% 82%;             /* warm sand border */
  --card: 36 50% 96%;               /* near-white warm */
  --accent: 118 12% 54%;            /* sage */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **Mostrar encabezados (H1, H2):** DM Serif Display, normal, espaciado entre letras -0,01em, altura de línea 1.1
- **Acento en cursiva/comillas:** DM Serif Display Italic
- **Cuerpo/navegación/botones/etiquetas:** DM Sans, 300–500, espaciado entre letras 0,02em
- **Sección cejas:** DM Sans 500, 0,7rem, espacio entre letras 0,2em, mayúsculas, color: var(--primary)
- **Copia del cuerpo:** DM Sans 300–400, 1rem, altura de línea 1,85, color: var(--muted-foreground)
- **Precios/números:** DM Serif Display, 2,5–3rem, color: var(--foreground)

## 5. Efectos visuales

### Efecto 1: Animación del círculo de respiración del héroe + fondo Foto
```tsx
// BreathingCircle.tsx
import { motion } from 'motion/react'

export function BreathingCircle() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Outermost ring */}
      <motion.div
        className="absolute rounded-full border opacity-15"
        style={{ width: 700, height: 700, borderColor: 'var(--primary)' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full border opacity-20"
        style={{ width: 500, height: 500, borderColor: 'var(--primary)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      {/* Inner ring */}
      <motion.div
        className="absolute rounded-full opacity-10"
        style={{ width: 300, height: 300, background: 'var(--primary)' }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
    </div>
  )
}

// Hero section structure:
<section className="relative w-full min-h-screen overflow-hidden flex items-center" style={{ background: 'var(--background)' }}>
  {/* Background yoga photo behind circles */}
  <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full">
    {/* Image: woman in warrior pose at sunrise, warm morning golden light filtering through studio windows, soft bokeh background, calm and powerful, terracotta and sage tones in clothing, barefoot on wooden floor */}
    <img src="" alt="Yoga practice — warrior pose in morning light" className="w-full h-full object-cover object-center" />
    {/* Gradient fade to left */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--background) 0%, rgba(245,237,224,0.85) 40%, transparent 100%)' }} />
  </div>
  {/* Breathing circles behind content */}
  <BreathingCircle />
  {/* Content left side */}
  <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl">
    ...hero text content...
  </div>
</section>
```

### Efecto 2: Divisores de manchas SVG orgánicas entre secciones
```tsx
// BlobDivider.tsx
// Sand-to-white organic wave transition between sections
export function BlobDivider({ from = '#f5ede0', to = '#ffffff' }: { from?: string; to?: string }) {
  return (
    <div className="relative w-full overflow-hidden leading-none" style={{ marginTop: '-2px' }}>
      <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[80px] md:h-[120px]">
        <path
          d="M0,40 C180,100 360,0 540,60 C720,120 900,20 1080,70 C1260,120 1380,30 1440,60 L1440,120 L0,120 Z"
          fill={to}
        />
        <rect width="1440" height="40" fill={from} />
      </svg>
    </div>
  )
}
```

### Efecto 3: Entrada de tarjeta de clase escalonada en Scroll
```tsx
import { motion } from 'motion/react'

{classTypes.map((cls, index) => (
  <motion.div
    key={cls.id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{
      duration: 0.65,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1]
    }}
    className="group relative rounded-2xl border-2 p-8 cursor-pointer transition-colors duration-300"
    style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
    whileHover={{ borderColor: 'var(--primary)' }}
  >
```

### Efecto 4: Sección CTA de degradado verde salvia
```tsx
// Full-width community join section with sage-to-sand gradient
<section
  className="py-24 px-8 md:px-16 text-white relative overflow-hidden"
  style={{
    background: 'linear-gradient(135deg, #5d7a57 0%, #7d9b76 50%, #9ab594 100%)',
  }}
>
  {/* Organic blob shape bg decoration */}
  <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.3)' }} />
  <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.3)' }} />
```

### Efecto 5: Superposición de textura fija (lino/papel) Feel)
```tsx
// GrainOverlay.tsx
export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay',
        opacity: 0.04,
      }}
    />
  )
}
```

## 6. Desglose de componentes

### 6.1 Barra de navegación
```tsx
// Fixed, top-0, z-40, w-full
// Height: h-18 (72px)
// Background: transparent → var(--background)/95 backdrop-blur-sm after 80px scroll
// Layout: px-8 md:px-16, flex items-center justify-between
// Left: logo — leaf icon (lucide) + "ROOT & RISE" — DM Sans 500, letter-spacing 0.15em, uppercase, 0.9rem
// Center (desktop): nav links ["Classes", "Schedule", "Instructors", "Pricing", "Community"]
//   DM Sans 400, 0.85rem, gap-8, color var(--foreground)/70, hover var(--primary)
//   transition 0.2s
// Right: "Try a Class Free" — sage green bg, white text, px-5 py-2.5, rounded-full, DM Sans 500, 0.8rem
// Mobile: hamburger, full-screen overlay menu, sage bg, white links
```

### 6.2 Hero Sección
```tsx
// min-h-screen, relative, sand bg
// Left content column (lg:w-1/2): z-10
//   - Eyebrow: "Yoga & Mindfulness Studio" — DM Sans 500, 0.7rem, tracking-widest, uppercase, text-primary, mb-5
//   - H1: DM Serif Display, clamp(3rem, 6vw, 5rem), 3–4 lines, line-height 1.05, mb-6
//   - Subtext: DM Sans 300, 1.1rem, text-muted-foreground, line-height 1.8, mb-8, max-w-md
//   - CTA buttons: flex flex-col sm:flex-row gap-4
//     Primary: "Try a Class Free" — bg-primary text-white, px-8 py-4, rounded-full, DM Sans 500
//     Secondary: "View Schedule" — border-2 border-primary text-primary, px-8 py-4, rounded-full, DM Sans 500
//   - Breathing cue: small text + pulsing dot: "Inhale. Exhale. Begin." — DM Sans 300 italic, text-muted-foreground, mt-8
// Right side: yoga photo + breathing circles
// Blob divider below hero into next section
```

### 6.3 Sección de tipos de clase
```tsx
// py-24 px-8 md:px-16, bg-white (after blob divider from sand hero)
// Header: centered
//   - Eyebrow: "WHAT WE OFFER"
//   - H2: DM Serif Display, 3rem, mb-4
//   - Subtext: DM Sans 300, 1rem, text-muted-foreground, max-w-lg, mx-auto, mb-16
// Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 (or flex wrap)
// Actually: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5, gap-5
// Each class card:
//   - Rounded-2xl, border-2 border-border, p-8, bg-card, hover:border-primary
//   - Icon (lucide): 32px, color var(--primary), mb-4
//   - Name: DM Serif Display, 1.3rem, mb-2
//   - Level: "All Levels" badge — DM Sans 400, 0.7rem, bg-primary/10, text-primary, px-2 py-0.5, rounded-full, mb-3
//   - Desc: DM Sans 300, 0.9rem, text-muted-foreground, line-height 1.7
//   - Duration: DM Sans 500, 0.85rem, text-foreground, mt-4
// Stagger: delay index * 0.1s
// Blob divider below → terracotta/sand
```

### 6.4 Sección de horario
```tsx
// py-24 px-8 md:px-16, bg-[var(--background)]
// Centered header:
//   - Eyebrow: "WEEKLY SCHEDULE"
//   - H2: DM Serif Display, 3rem, mb-12
// 7-day table: bg-white, rounded-2xl, shadow-sm, overflow-hidden
// Table header row: bg-primary/10, 7 columns (Mon–Sun), DM Sans 500, 0.75rem, uppercase, text-center, py-3
// Data rows: alternating bg-white / bg-card
// Each cell: text-center, py-4, px-3
//   - Class name: DM Serif Display, 1rem
//   - Time: DM Sans 400, 0.8rem, text-muted-foreground
//   - Instructor initial: DM Sans 300, 0.75rem, text-primary
//   Empty cells: "—" in text-border
// CTA below table: "View Full Schedule →" sage link, centered
```

### 6.5 Sección de Instructores
```tsx
// py-24 px-8 md:px-16, bg-white
// Header: centered, "Our Teachers" — DM Serif Display, 3rem, mb-4
// Subtext: DM Sans 300, centered, mb-16
// Grid: grid-cols-1 md:grid-cols-3, gap-10
// Each instructor:
//   - Photo: circular (w-48 h-48 mx-auto mb-6), object-cover, object-top, border-4 border-[var(--primary)]/20
//   - Name: DM Serif Display, 1.5rem, text-center, mb-1
//   - Specialty: DM Sans 400, 0.85rem, text-primary, text-center, mb-4
//   - Bio: DM Sans 300, 0.9rem, text-center, text-muted-foreground, line-height 1.7, max-w-[260px] mx-auto
//   - Certifications: small pills — DM Sans 400, 0.7rem, bg-primary/10, text-primary, px-2 py-0.5, rounded-full

// Instructor photos:
// {/* Image: female yoga instructor in meditation pose, seated cross-legged, warm studio, peaceful expression, earth-toned clothing */}
// {/* Image: female instructor in tree pose, confident and grounded, natural light studio, sage green accents */}
// {/* Image: male instructor in downward dog or forward fold, casual smile, wood floor yoga studio */}
```

### 6.6 Sección de Filosofía
```tsx
// py-24 px-8 md:px-16
// Background: sage green (#7d9b76), text white
// Centered layout, max-w-4xl, mx-auto
// Eyebrow: "OUR PHILOSOPHY" — DM Sans 500, 0.7rem, letter-spacing 0.3em, text-white/60
// H2: DM Serif Display Italic, 3rem, text-white, mb-16
// 3 core values: grid-cols-1 md:grid-cols-3, gap-12
// Each value:
//   - Icon: 32px, white, mb-4
//   - Title: DM Serif Display, 1.5rem, text-white, mb-3
//   - Desc: DM Sans 300, 0.95rem, text-white/75, line-height 1.8
// Blob dividers: white-to-sage above, sage-to-sand below
```

### 6.7 Precios Sección
```tsx
// py-24 px-8 md:px-16, bg-[var(--background)]
// Centered header
// Grid: grid-cols-1 md:grid-cols-3, gap-8
// Each card: bg-card, rounded-2xl, border-2 border-border, p-10, text-center
//   Middle card: border-primary, slight scale 1.02, tag "Most Popular" — terracotta bg, white text, rounded-full, above card
//   - Tier name: DM Sans 500, 0.75rem, letter-spacing 0.2em, uppercase, text-primary, mb-2
//   - Price: DM Serif Display, 3.5rem, text-foreground, mb-1
//   - Per: DM Sans 300, 0.9rem, text-muted-foreground, mb-8
//   - Features list: DM Sans 300, 0.9rem, text-foreground, line-height 2.2, check icon (primary) + text
//   - CTA: full-width button, primary bg for middle, outlined for others, rounded-full, mt-8
```

### 6.8 Testimonios Sección
```tsx
// py-24 px-8 md:px-16, bg-[var(--background)]
// Centered header: DM Serif Display Italic, 3rem
// Grid: grid-cols-1 md:grid-cols-3, gap-8
// Each card: bg-white, rounded-2xl, p-8, no border
//   - Large quote mark: DM Serif Display, 5rem, text-primary/20, leading-none, mb-2
//   - Quote: DM Serif Display Italic, 1.05rem, line-height 1.8, text-foreground/80, mb-6
//   - Author: flex items-center gap-3
//     - Avatar: circular, w-10 h-10
//     - Name: DM Sans 500, 0.9rem + desc: DM Sans 300, 0.8rem, text-muted-foreground
```

### 6.9 Comunidad / Newsletter Sección
```tsx
// py-24 px-8 md:px-16, terracotta (#c97b4c) background, text white
// Centered, max-w-xl
// Eyebrow: "JOIN OUR COMMUNITY"
// H2: DM Serif Display, 2.5rem, text-white, mb-4
// Body: DM Sans 300, 1rem, text-white/75, mb-8
// Email form: flex gap-3, max-w-md, mx-auto
//   Input: bg-white/15 backdrop-blur-sm, border border-white/30, text-white, placeholder-white/50, rounded-full, px-6 py-4, flex-1
//   Button: bg-white, text-[#c97b4c], px-6 py-4, rounded-full, DM Sans 500, 0.875rem
// Privacy note: DM Sans 300, 0.75rem, text-white/50, mt-4
// Decorative blob circles: absolute top/bottom corners, white/10 opacity
```

### 6.10 Pie de página
```tsx
// py-16 px-8 md:px-16, bg-[var(--foreground)], text-white
// Top: grid grid-cols-2 md:grid-cols-4, gap-10, pb-12, border-b border-white/10
//   Col 1: Logo + tagline + social icons (Instagram, YouTube)
//   Col 2: Classes — Vinyasa, Yin, Meditation, Prenatal, Beginners
//   Col 3: Studio — About, Instructors, Schedule, Pricing, Blog
//   Col 4: Visit — address + hours + phone
// Bottom: flex justify-between, pt-8
//   Copyright: DM Sans 300, 0.75rem, text-white/30
//   Links: Privacy Policy · Terms
```

## 7. Animaciones

### Respiracióncírculos
```tsx
// Outermost: scale 1→1.08→1, 4s ease-in-out infinite
// Middle: scale 1→1.1→1, 4s ease-in-out infinite, delay 0.2s
// Inner: scale 1→1.12→1, 4s ease-in-out infinite, delay 0.4s
```

### Entrada de texto de héroe
```tsx
// Eyebrow: initial={{ opacity: 0, y: 10 }}, delay 0.2s
// H1: initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}, delay 0.4s, duration 0.9s
// Subtext: initial={{ opacity: 0, y: 20 }}, delay 0.6s
// CTAs: initial={{ opacity: 0, y: 20 }}, delay 0.8s
// Breathing cue: initial={{ opacity: 0 }}, delay 1.1s, duration 1s
```

### Divisores de blobs
```tsx
// No animation — static SVG path fills for organic section breaks
// Consistent wave style for brand cohesion
```

### Clase tarjetas
```tsx
// Stagger: index * 0.1s delay
// whileInView: opacity 0→1, y 40→0
// whileHover: borderColor transition to --primary, y -4
// transition duration 0.65s ease [0.22, 1, 0.36, 1]
```

### Iconos de valor de filosofía
```tsx
initial={{ opacity: 0, scale: 0.8 }}
whileInView={{ opacity: 1, scale: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: index * 0.15 }}
```

### Tarjeta de precios flotante
```tsx
whileHover={{ y: -6 }}
transition={{ duration: 0.3, ease: 'easeOut' }}
// Middle card: always slightly elevated (y: -4 default)
```

### Testimonio entrada
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: index * 0.15 }}
```

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: logotipo + solo hamburguesa, navegación en pantalla completa Sage superpuesta
- Hero: una sola columna, texto arriba, foto a continuación (o superposición semitransparente), círculos de respiración más pequeños (300 px exteriores)
- H1: clamp(2.5rem, 8vw, 3.5rem)
- CTA: ancho completo, apilados verticalmente
- Tipos de clase: 2 columnas (o 1 columna en muy pequeño)
- Horario: desplazamiento horizontal en dispositivos móviles (overflow-x-auto, tabla desplazable)
- Instructores: 1 columna apilada
- Valores de filosofía: 1 columna apilada
- Precios: 1 columna, tarjetas apiladas
- Boletín: entrada + botón apilados verticalmente
- Pie de página: 2 columnas cuadrícula en dispositivos móviles, individual debajo de sm

### Escritorio (>= 1024px)
- Barra de navegación: enlaces horizontales completos + botón CTA
- Hero: división de 2 columnas (texto a la izquierda, foto a la derecha con círculos detrás)
- Tipos de clase: 5 columnas (o wrap)
- Horario: tabla completa de 7 columnas
- Instructores: 3 columnas
- Filosofía: 3 columnas en sage bg
- Precio: 3 columnas, medio elevado
- Pie de página: 4 columnas

## 9. Copia completa

### Nombre de marca
Root & Rise

### Navbar
- Texto del logotipo: ROOT & RISE
- Enlaces: Clases · Horario · Instructores · Precios · Comunidad
- CTA: Prueba una clase gratis

### Hero
- Ceja: Yoga & Mindfulness Studio
- H1: Mover. Respirar. Transform.
- Subtexto: una comunidad basada en la respiración, la intención y la presentación, para principiantes que recién comienzan y practicantes que han estado en el tapete durante años.
- CTA principal: su primera clase corre por nuestra cuenta
- CTA secundaria: vea el programa de esta semana
- Señal de respiración: Inhale. Exhalar. Begin.

### Tipos de claseSección
- Ceja: LO QUE OFRECEMOS
- H2: Encuentre su práctica
- Subtexto: Desde flujos matutinos energizantes hasta sesiones nocturnas reparadoras: tenemos una clase adaptada a su situación actual.
- **Clase 1 — Vinyasa**
 - Icono: Llama (lucide)
 - Nivel: Todos los niveles
 - Desc: Secuencias dinámicas vinculadas a la respiración que desarrollan fuerza, flexibilidad y concentración. Una práctica de cuerpo completo que se mueve a tu ritmo.
 - Duración: 60 min
- **Clase 2 — Yin**
 - Icono: Luna (lucidez)
 - Nivel: Todos los niveles
 - Desc: Posturas pasivas de larga duración que apuntan a los tejidos conectivos más profundos. Perfecto para relajarse, recuperarse y liberarse profundamente.
 - Duración: 75 min
- **Clase 3 — Meditación**
 - Icono: Círculo (lucidez)
 - Nivel: Principiantes Bienvenidos
 - Desc: Práctica sentada guiada centrada en la conciencia de la respiración, la atención plena y la construcción una quietud interior sostenible.
 - Duración: 45 min
- **Clase 4 — Prenatal**
 - Icono: Corazón (lucidez)
 - Nivel: Todos los trimestres
 - Desc: Práctica suave y enriquecedora adaptada al embarazo. Se centra en la apertura de la cadera, la respiración y el apoyo comunitario.
 - Duración: 60 min
- **Clase 5: principiantes**
 - Icono: Sprout (lucide)
 - Nivel: No se necesita experiencia
 - Desc: Una introducción acogedora y no intimidante al yoga fundamentos. El punto de partida perfecto, sin importar dónde empieces.
 - Duración: 60 min

### Sección de programación
- Ceja: HORARIO SEMANALE
- H2: Esta semana en Root & Rise
- Cuadrícula de programación:
 - Lun: 7am Vinyasa (Sara) · 12pm Meditación (Leo) · 6pm Yin (Mia)
 - Martes: 7am Principiantes (Mia) · 5:30pm Vinyasa (Sara) · 7:30pm Meditación (Leo)
 - Miércoles: 9am Prenatal (Sara) · 12pm Yin (Leo) · 6pm Vinyasa (Mia)
 - Jueves: 7am Vinyasa (Mia) · 5:30pm Principiantes (Leo) · 7pm Yin (Sara)
 - Viernes: 7am Vinyasa (Sara) · 12pm Meditación (Mia) · 6pm Yin (Leo)
 - Sábado: 8am Vinyasa (Todos) · 10am Principiantes (Sara) · 2pm TallerTBC
 - Dom: 9 am Yin y meditación (Leo) · 11 am Vinyasa (Mia) 
- CTA: Ver horario completo y reservar →

### Sección de instructores
- Encabezado: Nuestros maestros
- Subtexto: Cada instructor en Root & Rise se compromete a crear una práctica que se encuentre contigo dondequiera que estés.
- **Instructora 1: Sara Okonkwo, RYT 500**
 - Especialidad: Vinyasa y Prenatal
 - Certificaciones: RYT 500 · Certificación prenatal · Entrenadora de atención plena
 - Biografía: Sara encontró el yoga durante una etapa difícil de su vida y ha pasado los últimos diez años compartiendo su poder transformador con los demás. Sus clases son cálidas, energizantes y genuinamente inclusivas.
- **Instructor 2 — Leo Park, E-RYT 200**
 - Especialidad: Yin y Meditación
 - Certificaciones: E-RYT 200 · Certificado Yin · Sanación con sonido
 - Biografía: La experiencia de Leo en psicología informa cada clase que imparte. Sus sesiones son tranquilas, intencionales y brindan a los estudiantes herramientas reales para manejar el estrés y cultivar la presencia. 
- **Instructor 3 — Mia Torres, RYT 200**
 - Especialidad: Principiantes y Vinyasa
 - Certificaciones: RYT 200 · Trauma-Informed · Yoga para niños
 - Bio: Mia enseña con alegría y precisión. Ella cree que el yoga pertenece a todos y se especializa en hacer que la práctica sea accesible y genuinamente alegre.

### Sección de Filosofía
- Ceja: NUESTRA FILOSOFÍAY
- H2: "Una práctica no es una actuación".
- **Valor 1 — Root**
 - Icono: Anchor
 - Título: Root
 - Desc: Cada práctica comienza llegando: a tu cuerpo, a la habitación, al momento presente. La conexión a tierra no es una meta; es el comienzo.
- **Valor 2 — Respirar**
 - Icono: Viento
 - Título: Respirar
 - Desc: La respiración es tu mejor maestra. Cada clase en Root & Rise vuelve a esto: disminuir la velocidad, sintonizarse y confiar en la exhalación.
- **Valor 3 - Rise**
 - Icono: TrendingUp
 - Título: Rise
 - Desc: El crecimiento aquí no se mide en flexibilidad. Se mide en presentarse, de nuevo, conpaciencia e intención. Esa es la práctica.

### Sección de precios
- Ceja: PRICING
- H2: Precios simples y honestos
- Subtexto: Sin contratos. Sin complicaciones. Simplemente preséntate.
- **Nivel 1 — Sin cita previa**
 - Precio: £18
 - Por: por clase
 - Características: Acceso a cualquier clase individual · Reserva con hasta 7 días de antelación · Cancela hasta 2 horas antes
 - CTA: Reserva una Class
- **Nivel 2: mensual ilimitado** (el más popular)
 - Precio: £75
 - Por: por mes
 - Características: Clases ilimitadas todo el mes · Reserva prioritaria (14 días antes) · Acceso a talleres con un 20 % de descuento · Regalo de bienvenida para nuevos miembros · Aplicación comunitaria acceso
 - CTA: Inicio mensual
- **Nivel 3 — Anual**
 - Precio: £650
 - Por: por año (ahorre £250)
 - Características: Clases ilimitadas todo el año · Reserva prioritaria (21 días antes) · Todos los talleres incluidos gratis · Soporte dedicado para miembros · Descuento en retiro anual (15%)
 - CTA: Go Annual

### Sección de testimonios
- Encabezado: Lo que dice la comunidad
- **Cita 1**
 - Texto: "Empecé a venir a Root & Rise sin experiencia en yoga y con mucha experiencia Escepticismo. Seis meses después, estoy aquí cuatro veces por semana y realmente cambió la forma en que manejo el estrés. Las clases de Sara son extraordinarias." 
 - Autor: Rachel B. · Miembro durante 6 meses
- **Cita 2**
 - Texto: "Las clases de Yin de Leo son la hora más reparadora de mi semana. No sé de qué otra manera describirlo, simplemente funciona". 
 - Autor: David K. · Miembro por 1 año
- **Cita 3**
 - Texto: "Me uní a las clases prenatales a las 14 semanas y fueron lo más destacado de mi embarazo. La comunidad aquí es cálida, no competitiva y exactamente lo que necesitas cuando estás creciendo. humano."
 - Autor: Amara T. · Nueva mamá

### Sección Comunidad/Boletín informativo
- Ceja: ÚNASE A NUESTRA COMUNIDAD
- H2: Manténgase arraigado.
- Cuerpo: obtenga actualizaciones semanales de clases, consejos de atención plena y acceso temprano a talleres yeventos especiales. Enviamos un correo electrónico a la semana. Eso es todo.
- Marcador de posición de entrada: Su dirección de correo electrónico
- Botón: Únase a la comunidad
- Nota de privacidad: Nunca spam. Cancelar suscripción en cualquier momento.

### Pie de página
- Lema: Mover. Respirar. Transform.
- Clases: Vinyasa · Yin · Meditación · Prenatal · Principiantes
- Estudio: Acerca de · Instructores · Horarios · Precios · Blog · Tarjetas de regalo
- Visita: 22 Fernwood Lane, Bristol BS1 · Lunes a viernes de 6:30 a. m. a 8:30 p. m. · Sábados y domingos 7:30 am–5 pm · 0117 923 4567
- Copyright: © 2025 Root & Rise. Todos los derechos reservados.

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
