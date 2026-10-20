# Still Frame Studio — Mensaje del sitio web de fotografía de retratos

## 1. Declaración de objetivos
Crear un sitio web de portafolio para Still Frame Studio, una marca de fotografía editorial y de retratos, con una estética editorial pura en blanco y negro donde las fotografías sirven como único acento y lenguaje visual.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --primary: 0 0% 100%;
  --primary-foreground: 0 0% 0%;
  --muted-foreground: 0 0% 55%;
  --border: 0 0% 15%;
  --card: 0 0% 5%;
  --accent: 0 0% 90%;
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **Mostrar encabezados (H1):** Libre Baskerville cursiva, 7–10vw, espacio entre letras -0,02em, altura de línea 0,95
- **Encabezados de sección (H2):** Libre Baskerville Regular, 2,5–4rem, espacio entre letras -0,01em
- **Cuerpo/navegación/UI:** Inter 300–400, 0,875–1rem, espacio entre letras 0,08em, mayúsculas para nav
- **Extraiga comillas:** Libre Baskerville Italic, 1,5–2rem, color: var(--muted-foreground)

## 5. Visual Efectos

### Efecto 1: Retrato de héroe a sangre completa
```jsx
<section className="relative w-full h-screen overflow-hidden bg-black">
  {/* Image: editorial portrait — subject facing slightly away from camera, shallow depth of field, dramatic natural window light streaming from left, high contrast black-and-white, film grain, studio/loft setting, model in dark clothing */}
  <img src="" alt="Editorial portrait with dramatic window light" className="w-full h-full object-cover object-center" />
  {/* Gradient fade bottom */}
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)' }} />
  {/* Gradient fade top for nav */}
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%)' }} />
</section>
```

### Efecto 2: Cursor personalizado (modo de mezcla: diferencia)
```tsx
// CustomCursor.tsx
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white pointer-events-none z-[9999] transition-transform duration-75"
      style={{ mixBlendMode: 'difference', backgroundColor: 'white' }}
    />
  )
}
```

### Efecto 3: Entrada de cartera de mampostería escalonada
```tsx
import { motion } from 'motion/react'

const portfolioImages = [/* 12 image objects */]

{portfolioImages.map((img, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
    className="overflow-hidden cursor-pointer"
  >
    {/* Image inserted per slot below */}
  </motion.div>
))}
```

### Efecto 4: Superposición de transición de página suave
```tsx
import { motion, AnimatePresence } from 'motion/react'

// Wrap route outlet:
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Efecto 5: Textura de grano fijo Superposición
```tsx
// GrainOverlay.tsx — place at root App level
export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
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
// Sticky, top-0, z-40
// Background: transparent on hero, transitions to rgba(0,0,0,0.95) backdrop-blur-md on scroll (add class after 80px)
// Layout: px-8 md:px-16, h-16, flex justify-between items-center
// Left: wordmark "STILL FRAME" — Inter 300, letter-spacing 0.25em, uppercase, 0.875rem
// Right: nav links ["Work", "About", "Book"] — Inter 400, uppercase, 0.75rem, letter-spacing 0.12em
//        gap-8, text-white/70 default, text-white hover, transition 0.2s
// Mobile: hamburger (3 lines, 24px), full-screen menu overlay slides in from right
```

### 6.2 Hero Sección
```tsx
// Full viewport height (h-screen), relative, overflow-hidden
// Background: full-bleed portrait photograph (see image description above)
// Gradient overlays: top (for nav) + bottom (for text readability)
// Content positioned: absolute bottom-12 left-8 md:left-16
// H1: "Photography\nThat Says\nSomething." — Libre Baskerville Italic, 8vw md:10vw
//     line-height 0.92, max-w-[700px]
// Subtext: "Still Frame Studio" — Inter 300, 0.875rem, letter-spacing 0.3em, uppercase, mb-3
// Scroll indicator: small arrow down, absolute bottom-6 right-8, animates up-down 1.5s ease infinite
```

### 6.3 Cuadrícula de cartera (albañilería)
```tsx
// Section: py-24 px-8 md:px-16, bg-black
// Section label: "SELECTED WORK" — Inter 300, 0.75rem, letter-spacing 0.3em, uppercase, mb-12, text-white/50
// Grid: columns-1 sm:columns-2 lg:columns-3, gap-3
// 12 images total — mix portrait and landscape orientations for organic masonry flow
// Each image: break-inside-avoid, mb-3, overflow-hidden, cursor-pointer
// Hover: motion.div whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }} transition 0.4s
// All images: grayscale or naturally B&W editorial portraits, fashion, brand shoots

// Image slots (12 total):
// Slot 1: {/* Image: close-up female portrait, dramatic side lighting, dark bg, B&W, film grain */}
// Slot 2: {/* Image: full-body editorial fashion shot, white studio, model in structured coat, B&W */}
// Slot 3: {/* Image: couple portrait, natural window light, intimate moment, B&W, shallow DOF */}
// Slot 4: {/* Image: brand portrait, male subject, minimal workspace background, B&W, confident gaze */}
// Slot 5: {/* Image: editorial portrait, model against textured wall, dramatic shadow play, B&W */}
// Slot 6: {/* Image: maternity portrait, soft window light, minimal white bg, B&W, serene expression */}
// Slot 7: {/* Image: editorial close-up, hands and face, jewelry detail, B&W, high contrast */}
// Slot 8: {/* Image: outdoor portrait, urban architecture background, overcast sky, B&W, candid feel */}
// Slot 9: {/* Image: environmental portrait, subject in their workspace/studio, natural light, B&W */}
// Slot 10: {/* Image: headshot portrait, direct gaze into camera, neutral bg, studio light, B&W */}
// Slot 11: {/* Image: fashion editorial, movement blur on fabric, dark studio, B&W, artistic */}
// Slot 12: {/* Image: portrait with strong geometric shadow pattern from window blinds, B&W, dramatic */}
```

### 6.4 Especialidades
```tsx
// Section: py-24 px-8 md:px-16, border-t border-white/10
// Layout: grid grid-cols-1 md:grid-cols-3, gap-12
// Each card: no border, no background — pure whitespace with icon + title + desc
// Icon: lucide-react (Camera, Aperture, Briefcase) — 20px, text-white/40
// Title: Libre Baskerville, 1.5rem, mb-3
// Desc: Inter 300, 0.9rem, text-white/60, line-height 1.7, max-w-[280px]
// Stagger entrance: delay index * 0.15s
```

### 6.5 Acerca de
```tsx
// Section: py-24 px-8 md:px-16, bg-black
// Layout: grid grid-cols-1 lg:grid-cols-2, gap-16, items-start
// Left: photographer portrait — square, full-width
// Right: text content
//   - Label: "ABOUT" — 0.75rem, letter-spacing 0.3em, text-white/40, mb-6
//   - Name: Libre Baskerville, 2rem, mb-6
//   - Bio: 3 paragraphs, Inter 300, 1rem, line-height 1.85, text-white/75
//   - Pull quote (italic, Libre Baskerville, 1.25rem, border-l-2 border-white/20, pl-4, my-8)

// {/* Image: photographer self-portrait in studio, 35mm candid style, natural light from side, B&W, medium shot showing workspace in background */}
<img src="" alt="Still Frame Studio photographer" className="w-full h-full object-cover object-center" />
```

### 6.6 Precios
```tsx
// Section: py-24 px-8 md:px-16, border-t border-white/10
// Heading: "Investment" — Libre Baskerville Italic, 3rem, mb-16
// Layout: grid grid-cols-1 md:grid-cols-3, gap-px, bg-white/10 (creates hairline dividers)
// Each tier: bg-black, px-8 py-10
// Tier name: Inter 400, 0.75rem, letter-spacing 0.25em, uppercase, text-white/50, mb-2
// Price: Libre Baskerville, 3rem, text-white, mb-1
// Duration: Inter 300, 0.875rem, text-white/40, mb-8
// Includes list: Inter 300, 0.875rem, text-white/60, line-height 2, list-disc pl-4
// CTA link: "Book This" — inline link, underline on hover, mt-8
// Middle tier ("Signature"): border border-white/20, slightly elevated visual priority
```

### 6.7 Testimonios
```tsx
// Section: py-24 px-8 md:px-16
// Heading: "Kind Words" — Libre Baskerville Italic, 2.5rem, mb-16
// Layout: grid grid-cols-1 md:grid-cols-3, gap-12
// Each testimonial: no card, no border, no stars
// Quote mark: " — Libre Baskerville, 4rem, text-white/15, leading-none, mb-4
// Quote text: Libre Baskerville Italic, 1.1rem, line-height 1.8, text-white/80, mb-6
// Attribution: Inter 300, 0.75rem, letter-spacing 0.15em, uppercase, text-white/40
```

### 6.8 Reserva CTA
```tsx
// Section: py-32 px-8 md:px-16, bg-white, text-black (full inversion)
// Layout: flex flex-col items-center text-center
// Eyebrow: "READY WHEN YOU ARE" — Inter 300, 0.75rem, letter-spacing 0.3em, uppercase, mb-6, text-black/50
// Heading: Libre Baskerville Italic, 4–6vw, text-black, mb-8
// CTA Button: bg-black text-white, px-10 py-4, Inter 400, 0.875rem, letter-spacing 0.15em, uppercase
//             hover: bg-black/90, transition 0.2s
```

### 6.9 Pie de página
```tsx
// py-12 px-8 md:px-16, border-t border-white/10
// Layout: flex justify-between items-center, flex-col md:flex-row, gap-4
// Left: "STILL FRAME STUDIO" wordmark — Inter 300, letter-spacing 0.25em, 0.75rem
// Center: "© 2025 — All rights reserved" — Inter 300, 0.75rem, text-white/30
// Right: social links [Instagram, LinkedIn] — lucide icons, 18px, gap-4, text-white/50 hover:text-white
```

## 7. Animaciones

### Comportamiento de desplazamiento de la barra de navegación
```tsx
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 80)
  window.addEventListener('scroll', handler)
  return () => window.removeEventListener('scroll', handler)
}, [])
// className: transition-all duration-300
// scrolled: 'bg-black/95 backdrop-blur-md' : 'bg-transparent'
```

### Titular de héroe entrada
```tsx
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
>
```

### Imagen de cartera flotante
```tsx
transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
```

### Tarjetas especiales escalonadas
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
```

### Nivel de precios entrada
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: index * 0.1 }}
```

### Testimonio tambaleante
```tsx
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.8, delay: index * 0.2 }}
```

###Indicador de desplazamiento (hero)
```tsx
<motion.div
  animate={{ y: [0, 8, 0] }}
  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
>
  <ChevronDown size={20} className="text-white/50" />
</motion.div>
```

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca de palabra solo visible, menú de hamburguesa activa una superposición de navegación en pantalla completa
- Hero H1: tamaño de fuente clamp(3rem, 10vw, 8rem)
- Portafolio: columna única (columnas-1), espacio-2
- Especialidades: columna única, apiladas
- Acerca de: foto de ancho completo primero, texto debajo
- Precios: tarjetas apiladas, ancho completo each
- Testimonios: columna única, ancho completo each
- CTA de reserva: H2 4rem, botón de ancho completo

### Escritorio (>= 1024px)
- Barra de navegación: conjunto de enlaces completo, horizontal, no hamburguesa
- Hero H1: 8–10vw, fondo absoluto-16 izquierda-16
- Portafolio: mampostería de 3 columnas
- Especialidades: cuadrícula de 3 columnas
- Acerca de: cuadrícula de 2 columnas (foto izquierda, texto derecha)
- Precio: 3 columnas una al lado de la otra
- Testimonios: 3 columnas
- CTA de reserva: centrado, max-w-3xl

## 9. Copia completa

### Marca
Still Frame Studio

### Navbar
- Marca denominativa: STILL FRAME
- Enlaces: Trabajo · Acerca de · Libro

### Hero
- Ceja: STILL FRAME STUDIO
- H1: Fotografía que dice Algo.
- Mensaje de desplazamiento: Desplácese para explorar

### Sección de portafolio
- Etiqueta de sección: TRABAJO SELECCIONADO
- CTA al pasar el mouse (en imágenes individuales): Ver proyecto →

### Sección de especialidades
- Etiqueta de sección: QUÉ DO
- **Tarjeta 1 — Retrato**
 - Icono: Cámara
 - Título: Retrato
 - Desc: Sesiones cinematográficas íntimas que revelan a la persona detrás de la imagen. Para individuos, familias y creativos que buscan profundidad por encima de la decoración.
- **Tarjeta 2 — Editorial**
 - Icono: Aperture
 - Título: Editorial
 - Desc: Conceptos sólidos. Ejecución más fuerte. Trabajos de moda y publicaciones construidos sobre una base de luz, forma e intención.
- **Tarjeta 3 — Marca**
 - Icono: Maletín
 - Título: Marca
 - Desc: Fotografía de identidad visual para fundadores, estudios y empresas que entienden el poder de unaimagen convincente.

### Acerca de la sección
- Etiqueta: ABOUT
- Nombre: Anna Whitfield
- Párrafo 1 de la biografía: He estado fotografiando personas durante más de una década. No la versión pulida y demasiado dirigida de las personas: las reales. Los que se ríen mal y aguantan la respiración antes de que la cámara haga clic. Esas son las fotografías que perduran.
- Párrafo 2 de la biografía: Still Frame Studio comenzó como una operación unipersonal en un loft alquilado en el este de Londres. Sigue siendo eso, en esencia: un solo fotógrafo, un ojo deliberado y la creencia de que un gran retrato es un acto de colaboración. 
- Párrafo 3 de la biografía: Trabajo principalmente con luz natural. No dirijo demasiado. No edito demasiado. Lo que ves es lo que había allí.
- Cita extraída: "La versión tuya que ya existe: eso es lo que estamos aquí para fotografiar".

### Sección de precios
- Encabezado de sección: Inversión
- **Nivel 1: Esencial**
 - Precio: £395
 - Duración: Sesión de 1 hora
 - Incluye:
 - Llamada de consulta de 30 minutos
 - Sesión de estudio o ubicación de 1 hora
 - 25 archivos digitales de alta resolución
 - Galería privada en línea (30 días acceso)
 - Licencia de uso personal
 - CTA: Reserve esto
- **Nivel 2 — Firma** (resaltado)
 - Precio: £750
 - Duración: Sesión de medio día
 - Incluye:
 - Reunión conceptual previa a la filmación
 - Hasta 3 horas en locación o en estudio
 - 60 archivos digitales de alta resolución
 - Galería privada en línea (acceso de 90 días)
 - Licencia comercial completa
 - Retoque básico incluido
 - CTA: Reserve esto
- **Nivel 3: día completo**
 - Precio: £1,400
 - Duración: Día completo
 - Incluye:
 - Sesión de dirección creativa completa
 - Hasta 8 horas (múltiples ubicaciones o looks)
 - Más de 120 archivos digitales de alta resolución
 - Galería privada en línea (acceso de 1 año)
 - Licencia comercial completa, uso ilimitado
 - Retoque avanzado en 20selects
 - Archivos listos para imprimir incluidos
 - CTA: Reserve esto

### Sección de testimonios
- Encabezado: Palabras amables
- **Cita 1**
 - Texto: "Anna tiene una manera de verte así No sabías que era posible. Los retratos que hizo de mí son los primeros que realmente me encantan. Se sienten honestos". 
 - Atribución: — Sarah M., fundadora de la marca
- **Cita 2**
 - Texto: "Contratamos Still Frame para nuestra campaña editorial y los resultados superaron por completo nuestra visión. no sucede a menudo."
 - Atribución: — James R., director creativo
- **Cita 3**
 - Texto: "No me siento cómodo por naturaleza frente a una cámara. Anna cambió eso por completo. La sesión fue tranquila, colaborativa y las imágenes son realmente impresionantes". 
 - Atribución: — Priya D., autora y. Orador

### Sección de CTA de reserva
- Ceja: LISTO CUANDO ESTÉSE
- Encabezado: Vamos a crear algo.
- Texto de respaldo: Sesiones disponibles en Londres y en todo el Reino Unido. Las consultas generalmente se responden dentro de las 48 horas.
- Botón: reservar una sesión
- Enlace secundario: o envíenos un correo electrónico directamente →

### Pie de página
- Marca denominativa: STILL FRAME STUDIO
- Copyright: © 2025 Still Frame Studio. Todos los derechos reservados.
- Social: Instagram · LinkedIn

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.462.0",
  "@radix-ui/react-dialog": "^1.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.3.0"
}
```
