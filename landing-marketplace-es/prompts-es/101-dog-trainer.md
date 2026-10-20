# GOOD BOY ACADEMY — Aviso del sitio web del entrenador de perros

**Pila tecnológica:** React + Vite + TypeScript + Tailwind CSS + Framer Motion (`motion/react`) + shadcn/ui + lucide-react 
**Nicho:** Entrenamiento profesional de perros Studio

---

## Sistema de diseño

### Colores (HSL en: propiedades personalizadas de CSS raíz)

```css
:root {
  --background: 36 44% 89%;        /* warm sand #F2E8D5 */
  --foreground: 60 3% 10%;         /* near-black #1A1A18 */
  --primary: 155 37% 26%;          /* forest green #2A5C45 */
  --primary-foreground: 36 44% 95%;
  --accent: 18 52% 55%;            /* terracotta #C8714A */
  --muted: 36 30% 83%;
  --muted-foreground: 60 3% 40%;
  --border: 36 20% 75%;
  --card: 36 44% 95%;
  --card-foreground: 60 3% 10%;
}
```

### Tipografía

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@1&family=DM+Sans:wght@300;400;500&display=swap');

/* Headings: DM Serif Display 400 italic */
/* Body: DM Sans 300/400/500 */
```

Aplicar globalmente:
```css
body {
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 {
  font-family: 'DM Serif Display', serif;
  font-style: italic;
}
```

### Configuración de viento de cola

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### Tokens de diseño: uso Guía

El sistema de color se limita intencionalmente a cuatro roles:

- **`--background` (arena cálida)**: La superficie dominante. Se utiliza para la página base, el héroe, el fondo de la sección de método y la sección de entrenador. Crea un tono cálido, terroso y adyacente al exterior. 
- **`--card` (arena clara)**: Ligeramente más claro que el fondo, utilizado para la sección de programas, la sección de testimonios y los componentes de la tarjeta. Crea un contraste sutil sin cambiar de estado de ánimo. 
- **`--muted` (arena media)**: Se utiliza para la sección de métodos y el fondo de preguntas frecuentes. También se usa para fondos de píldoras de señales de confianza en el héroe. 
- **`--primary` (verde bosque)**: se usa solo para CTA principales, estados de enlaces, bordes de imágenes de perfil, íconos de listas de verificación, activadores de acordeón y estados activos de la línea de tiempo del viaje. No lo use en exceso: su moderación es lo que le da autoridad. 
- **`--accent` (terracota)**: se usa exclusivamente para etiquetas pequeñas, calificaciones de estrellas, fichas con nombres de perros en testimonios y el SVG del perro deslizante en la línea de tiempo del viaje. Nunca se usa para elementos interactivos ni botones de CTA.
- **`--foreground` (casi negro)**: se usa para el fondo oscuro del pie de página (invertido) y todo el texto del cuerpo.

---

## Animación de firma: línea de tiempo del viaje de capacitación

El "Tu viaje con Nosotros" (Sección 6) presenta una línea de tiempo horizontal animada con una silueta de perro deslizándose. Este es el componente más complejo de la compilación y se le debe prestar especial atención.

```tsx
// TrainingJourney component
// 4 stages arranged horizontally on desktop, vertically on mobile
// A small dog-silhouette SVG slides along a dotted track line as user scrolls

// Dog SVG (inline, 32px × 20px, used as the sliding indicator):
const DogSilhouette = () => (
  <svg viewBox="0 0 32 20" fill="currentColor" className="w-8 h-5 text-[hsl(var(--accent))]">
    {/* Simple running dog side silhouette */}
    <path d="M28 8c0-2-1-3-2-3h-2l-2-3h-4l-1 1-3-1H8c-2 0-4 2-4 4v2l-2 2v4h4v-2h2v2h12v-2l3 1 3-1v-1l2-1V8z"/>
  </svg>
)

// Track: a dotted line connecting all 4 stages
// On desktop: horizontal dotted line, position: absolute, top: 50% of the icons row
// Dog SVG position: absolute on the track, translateX controlled by scrollProgress state

// Full component implementation:
import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'

const STAGES = [
  {
    icon: '🐾',
    step: 'Step 01',
    title: 'Free Assessment',
    description: 'A 30-minute call to understand your dog, your goals, and which programme is right for you. No obligation, no pressure.',
  },
  {
    icon: '📋',
    step: 'Step 02',
    title: 'Training Plan',
    description: 'We design a personalised training programme built around your specific dog — not a cookie-cutter approach.',
  },
  {
    icon: '🎾',
    step: 'Step 03',
    title: 'Training Sessions',
    description: 'Regular sessions with Sarah, homework exercises, and WhatsApp support between every visit.',
  },
  {
    icon: '🏆',
    step: 'Step 04',
    title: 'Graduate',
    description: 'Your dog completes the programme. You receive a certificate — and the skills to keep it going for life.',
  },
]

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [dogX, setDogX] = useState(0)
  const [activeStage, setActiveStage] = useState(-1)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowH = window.innerHeight
      // Progress: 0 when section enters viewport, 1 when section is fully scrolled through
      const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH + rect.height)))
      const trackWidth = trackRef.current.offsetWidth
      const dogWidth = 32
      setDogX(progress * (trackWidth - dogWidth))
      setActiveStage(Math.floor(progress * STAGES.length))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-[hsl(var(--primary)/0.04)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl text-center mb-16 text-[hsl(var(--foreground))]">
          Your journey with us.
        </h2>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          {/* Track line */}
          <div
            ref={trackRef}
            className="absolute top-7 left-0 right-0 border-t-2 border-dashed border-[hsl(var(--border))] z-0"
          />
          {/* Sliding dog */}
          <motion.div
            className="absolute top-[calc(1.75rem-10px)] z-20"
            animate={{ x: dogX }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          >
            <DogSilhouette />
          </motion.div>

          {/* Stages */}
          <div className="flex justify-between relative z-10">
            {STAGES.map((stage, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 border-2 transition-all duration-500
                    ${activeStage > i
                      ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)]'
                      : 'border-[hsl(var(--border))] bg-[hsl(var(--card))]'
                    }`}
                >
                  {stage.icon}
                </div>
                <p className="text-xs text-[hsl(var(--foreground)/0.4)] uppercase tracking-wider mb-1 font-sans font-light">
                  {stage.step}
                </p>
                <h3 className="text-xl text-[hsl(var(--foreground))] mb-3 text-center">
                  {stage.title}
                </h3>
                <p className="text-sm text-[hsl(var(--foreground)/0.65)] leading-relaxed max-w-[180px] text-center font-sans font-light">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical layout */}
        <div className="lg:hidden relative pl-8 border-l-2 border-dashed border-[hsl(var(--border))]">
          {STAGES.map((stage, i) => (
            <motion.div
              key={i}
              className="mb-10 relative"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -16 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="absolute -left-[calc(2rem+7px)] top-0 w-3.5 h-3.5 rounded-full bg-[hsl(var(--primary))] border-2 border-[hsl(var(--background))]" />
              <p className="text-xs text-[hsl(var(--foreground)/0.4)] uppercase tracking-wider mb-1 font-sans font-light">
                {stage.step}
              </p>
              <h3 className="text-2xl text-[hsl(var(--foreground))] mb-2">{stage.title}</h3>
              <p className="text-sm text-[hsl(var(--foreground)/0.65)] leading-relaxed font-sans font-light">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CSS for the track:
// .journey-track: position absolute, top 50%, border-top: 2px dashed hsl(var(--border))
// width: calc(100% - 2rem), left: 1rem

// Stage marker circles: w-12 h-12 rounded-full bg-[hsl(var(--card))] border-2 border-[hsl(var(--border))]
// Active (when dog passes): border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] transition-all
```

---

## Sección 1: Barra de navegación

```tsx
// Sticky top: position sticky top-0 z-50
// bg-[hsl(var(--background)/0.97)] border-b border-[hsl(var(--border))]
// backdrop-blur-sm for subtle glass effect behind scroll content
// Height: h-16

// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
// Layout: flex items-center justify-between

// Logo: flex items-center gap-2
//   PawPrint icon from lucide-react: w-6 h-6 text-[hsl(var(--primary))]
//   "GOOD BOY ACADEMY" — font-family DM Serif Display italic text-xl text-[hsl(var(--primary))]

// Desktop nav (hidden below lg, lg:flex gap-8):
// "Programs" | "Our Method" | "About" | "Testimonials" | "Book Assessment"
// Font: DM Sans 300 text-sm text-[hsl(var(--foreground)/0.65)]
// Hover: text-[hsl(var(--foreground))] transition-colors duration-150

// "Book Assessment" CTA:
// bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
// DM Sans 500 text-sm
// rounded-full px-5 py-2
// hover:opacity-90 transition-opacity

// Mobile hamburger: Menu icon from lucide-react, shown lg:hidden
// Use useState for isOpen, toggle on click
// X icon from lucide-react replaces Menu icon when open

// Mobile menu: slides down from under navbar
// Framer Motion: AnimatePresence wrapping the menu div
// initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}
// transition={{ duration: 0.2 }}
// bg-[hsl(var(--background))] border-b border-[hsl(var(--border))] shadow-sm
// Links: py-3 px-6 border-b border-[hsl(var(--muted))] DM Sans 400 text-base
// Last item: "Book Assessment" as a full-width button
//   bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg mx-6 my-3 py-2.5 text-center DM Sans 500

// Scroll behaviour: add shadow-sm when scrolled past 10px
// useEffect with scroll listener, toggle 'scrolled' state
// Conditional: className={scrolled ? 'shadow-sm' : ''}

// Full component:
import { useState, useEffect } from 'react'
import { PawPrint, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const NAV_LINKS = ['Programs', 'Our Method', 'About', 'Testimonials']

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-[hsl(var(--background)/0.97)] border-b border-[hsl(var(--border))] backdrop-blur-sm transition-shadow ${scrolled ? 'shadow-sm' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <PawPrint className="w-6 h-6 text-[hsl(var(--primary))]" />
          <span className="font-serif italic text-xl text-[hsl(var(--primary))]">GOOD BOY ACADEMY</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-sans font-light text-[hsl(var(--foreground)/0.65)] hover:text-[hsl(var(--foreground))] transition-colors">
              {link}
            </a>
          ))}
          <a href="#book"
            className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-sans font-medium rounded-full px-5 py-2 hover:opacity-90 transition-opacity">
            Book Assessment
          </a>
        </nav>

        <button className="lg:hidden" onClick={() => setIsOpen(v => !v)} aria-label="Toggle menu">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.2 }}
            className="lg:hidden bg-[hsl(var(--background))] border-b border-[hsl(var(--border))] shadow-sm"
          >
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="block py-3 px-6 border-b border-[hsl(var(--muted))] font-sans font-light text-base"
                onClick={() => setIsOpen(false)}>
                {link}
              </a>
            ))}
            <div className="px-6 py-3">
              <a href="#book"
                className="block bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-center rounded-lg py-2.5 font-sans font-medium">
                Book Assessment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

---

## Sección 2:Hero

```tsx
// min-h-screen bg-[hsl(var(--background))]
// Grid: grid lg:grid-cols-2 items-center
// On mobile: single column, image below text

// LEFT COLUMN (px-6 sm:px-12 py-16 lg:py-24):

// Pre-label: "SURREY · FEAR-FREE CERTIFIED"
// DM Sans 300 text-xs tracking-[0.3em] text-[hsl(var(--accent))] uppercase mb-4

// Headline: "Every dog. Every breed. Every stage."
// Font: DM Serif Display italic
// Size: text-6xl lg:text-7xl (desktop) → text-4xl sm:text-5xl (mobile)
// Color: text-[hsl(var(--foreground))]
// Leading: leading-tight mb-6

// Subtext:
// "Professional dog training that works with your dog's nature, not against it. From boisterous puppies to dogs with complex behaviour challenges — we meet them where they are."
// DM Sans 300 text-lg text-[hsl(var(--foreground)/0.7)] leading-relaxed mb-8 max-w-lg

// CTA Row (flex flex-wrap gap-4):
// Primary: "Book Free Assessment"
//   bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
//   px-8 py-3 rounded-lg DM Sans 500 hover:opacity-90 transition-opacity
// Ghost: "Our Programs ↓"
//   border border-[hsl(var(--primary))] text-[hsl(var(--primary))]
//   px-8 py-3 rounded-lg DM Sans 400 hover:bg-[hsl(var(--primary)/0.05)] transition-colors

// Trust signals (flex flex-wrap gap-2 mt-6):
// Pill-style tags: bg-[hsl(var(--muted))] border border-[hsl(var(--border))]
//   text-[hsl(var(--foreground)/0.6)] text-xs px-3 py-1.5 rounded-full DM Sans 300
// Text: "COAPE Certified" · "Fear Free" · "12+ Years Experience" · "Fully Insured"

// Entrance animation:
// Wrap entire left column in motion.div
// initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}

// RIGHT COLUMN:
// h-[55vh] lg:h-screen relative overflow-hidden
// On mobile: order-first (image above text on smallest screens) or order-last depending on design preference
// On desktop: right side, full height, no rounding (full-bleed to edge)
// On mobile: rounded-2xl mx-4 mb-6

{/* Image: friendly professional dog trainer working one-on-one with a golden retriever outdoors, Surrey countryside setting, warm afternoon golden hour light, trainer crouching at dog's level showing treats, warm professional and approachable atmosphere */}
<img
  src=""
  alt="Professional dog trainer with golden retriever in Surrey"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>

// Optional: very subtle dark gradient overlay at bottom of image to allow text overlap if needed
// bg-gradient-to-t from-black/20 to-transparent absolute inset-0

// Right col entrance:
// initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}

// Stat row (optional, below hero on mobile or floating bottom-left on desktop):
// 3 quick stats: "500+ Dogs Trained" · "12 Years Experience" · "100% Fear Free"
// Each: DM Serif Display italic text-2xl value, DM Sans 300 text-xs label below
// Separated by thin dividers: border-r border-[hsl(var(--border))]
```

---

## Sección 3: Programas de capacitación

```tsx
// Background: bg-[hsl(var(--card))]
// Padding: py-24
// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

// Label: "WHAT WE OFFER"
// DM Sans 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--accent))] mb-4

// Heading: "Programs designed for where you are."
// DM Serif Display italic text-5xl text-[hsl(var(--foreground))] leading-tight mb-4

// Subheading: "Whether you have a brand-new puppy or a dog with a complex history, there's a programme built around your dog's actual situation."
// DM Sans 300 text-base text-[hsl(var(--foreground)/0.6)] mb-12 max-w-2xl

// Grid: grid grid-cols-1 lg:grid-cols-3 gap-8

// PROGRAM CARD COMPONENT (ProgramCard):
// bg-[hsl(var(--background))] rounded-3xl overflow-hidden border border-[hsl(var(--border))]
// hover:shadow-md transition-shadow duration-300
// Framer Motion: whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }}
//   viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }}
// flex flex-col (so CTA button stays at bottom)

// Image (top, h-52 w-full):

// Content: p-8 lg:p-10 flex-1 flex flex-col

// Price badge: inline-flex items-center DM Sans 500 text-sm bg-[hsl(var(--primary)/0.1)]
//   text-[hsl(var(--primary))] px-3 py-1 rounded-full mb-3 self-start

// Program name: DM Serif Display italic text-3xl text-[hsl(var(--foreground))] mb-3

// Description: DM Sans 300 text-base leading-relaxed text-[hsl(var(--foreground)/0.7)] mb-6 flex-1

// Divider: border-t border-[hsl(var(--border))] mb-6

// "What's included" label:
// DM Sans 500 text-xs text-[hsl(var(--foreground)/0.45)] uppercase tracking-[0.15em] mb-3

// Includes list (space-y-2 mb-6):
// Each item: flex items-start gap-2
// CheckCircle2 icon from lucide-react: size=14 className="text-[hsl(var(--primary))] mt-0.5 flex-shrink-0"
// Text: DM Sans 300 text-sm text-[hsl(var(--foreground)/0.7)]

// CTA button (mt-auto):
// "Find Out More →"
// border border-[hsl(var(--primary))] text-[hsl(var(--primary))] rounded-lg px-6 py-2.5 w-full
// DM Sans 500 text-sm text-center
// hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200

// PROGRAM 1: Puppy Foundation — £45/session
{/* Image: adorable puppy learning to sit with patient trainer, outdoor training environment on grass, sunny afternoon, happy energetic small puppy looking up attentively at trainer, warm lifestyle photography */}
<img src="" alt="Puppy foundation training at Good Boy Academy" className="w-full h-full object-cover" />
// Badge: "£45/session"
// Name: "Puppy Foundation"
// Description: "For puppies 8 weeks – 6 months. We start from scratch: socialisation, bite inhibition, sit, stay, come, lead walking, and house manners. Sessions are fun, reward-based, and structured so your puppy actually enjoys learning. This is the most important investment you can make in your dog's future."
// Includes:
//   "6-week course (12 sessions)"
//   "Puppy workbook to track progress"
//   "WhatsApp support between sessions"
//   "Certificate of completion"
//   "Discount on follow-up Adult programme"

// PROGRAM 2: Adult Obedience — £55/session
{/* Image: well-trained border collie sitting attentively on a woodland path, owner standing nearby smiling with pride, beautiful dappled green park light, lifestyle dog photography with natural warm tones */}
<img src="" alt="Adult dog obedience training in woodland park" className="w-full h-full object-cover" />
// Badge: "£55/session"
// Name: "Adult Obedience"
// Description: "For dogs 6 months+. Whether your dog ignores recall, pulls on lead, barks at other dogs, or just needs a brush-up on the basics, we'll build reliable, real-world obedience through positive reinforcement — not correction. Training that works both inside the home and out on busy streets."
// Includes:
//   "Tailored 8-session programme"
//   "Written progress report"
//   "Training guide PDF (yours to keep)"
//   "1 complimentary follow-up session"
//   "Lifetime email support after graduation"

// PROGRAM 3: Behaviour & Rehabilitation — £75/session
{/* Image: calm patient dog trainer working with a reactive-looking dog in an open field, using gentle body language and space, professional outdoor behaviour consultation, serene but focused atmosphere, golden afternoon light */}
<img src="" alt="Dog behaviour rehabilitation session in open field" className="w-full h-full object-cover" />
// Badge: "£75/session"
// Name: "Behaviour & Rehabilitation"
// Description: "For dogs with anxiety, reactivity, aggression, or complex behaviour challenges. These bespoke programmes are designed after a thorough initial assessment — because every difficult behaviour has a root cause we need to understand before we can help. No shortcuts, no punishment, no timeline pressure."
// Includes:
//   "2-hour initial assessment (included)"
//   "Fully bespoke written training plan"
//   "Video progress review sessions"
//   "Direct trainer contact between sessions"
//   "No fixed session limit — we work until it works"
//   "Vet liaison where appropriate"
```

---

## Sección 4: Nuestro método

```tsx
// Background: bg-[hsl(var(--muted))]
// Padding: py-24
// Container: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8

// Grid: grid grid-cols-1 lg:grid-cols-2 gap-16 items-center

// LEFT: Text content
// py-8
// Label: "HOW WE WORK"
// DM Sans 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--accent))] mb-4

// Heading: "We train with dogs, not against them."
// DM Serif Display italic text-5xl text-[hsl(var(--foreground))] leading-tight mb-8

// Paragraph 1:
// "Good Boy Academy is built on one principle: dogs learn best when they want to learn. That means we never use punishment, correction collars, choke chains, or anything that creates fear or pain. Every technique we use is rooted in modern behavioural science and positive reinforcement — the same methods used by the world's leading animal behaviourists."
// DM Sans 300 text-base leading-relaxed text-[hsl(var(--foreground)/0.75)] mb-4

// Paragraph 2:
// "We take time to understand your dog as an individual — their history, their triggers, their temperament, and their needs. Only then do we design a training path that's realistic for your life and genuinely effective for your dog. Some dogs respond in three sessions. Some take twelve. We adjust as we go."
// Same style, mb-4

// Paragraph 3:
// "Our approach is certified by COAPE (Centre of Applied Pet Ethology) and aligned with Fear Free principles. We work in partnership with local vets and animal behaviourists when complex needs arise. If we can't help, we'll tell you — and we'll refer you to someone who can."
// Same style, mb-8

// Credentials row (flex flex-wrap gap-2):
// Pills: bg-[hsl(var(--card))] border border-[hsl(var(--border))]
//   text-[hsl(var(--foreground)/0.65)] text-xs px-3 py-1.5 rounded-full DM Sans 400
// "COAPE Certified" | "Fear Free Practitioner" | "APDT Member" | "Fully Insured"

// Entrance:
// whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -40 }}
// viewport={{ once: true }} transition={{ duration: 0.6 }}

// RIGHT: Image
// rounded-3xl overflow-hidden h-[500px]
// Framer Motion: whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 40 }}
//   viewport={{ once: true }} transition={{ duration: 0.7 }}
{/* Image: extreme close-up of a trainer's hand gently offering a small treat to a dog at ground level, warm natural afternoon light, soft blurred green background, dog's nose and paw partially visible, reward-based training moment, shallow depth of field */}
<img src="" alt="Reward-based dog training — trainer offering treat" className="w-full h-full object-cover" />

// Method pillars (optional 3-column row below the main 2-col layout):
// 3 small icon + heading + text cards
// "Science-Based" / "Reward-Focused" / "Individually Tailored"
// Icon: Framer icon-style in --primary/0.1 bg, --primary icon colour
// From lucide-react: FlaskConical / Star / UserCheck
// Each: flex items-start gap-3, heading DM Serif Display italic text-lg, body DM Sans 300 text-sm
```

---

## Sección 5: Conozca al formador

```tsx
// Background: bg-[hsl(var(--background))]
// Padding: py-24
// Container: max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center

// Entrance: whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }}
// viewport={{ once: true }} transition={{ duration: 0.6 }}

// Profile image:
// mx-auto mb-8
// w-40 h-40 rounded-full overflow-hidden
// border-4 border-[hsl(var(--primary))] shadow-md shadow-[hsl(var(--primary)/0.2)]
{/* Image: Sarah Mitchell, professional dog trainer, warm friendly headshot, outdoors in a park with soft bokeh tree background, confident warm personality, casual professional clothing such as a light khaki jacket, natural smile, approachable expression */}
<img src="" alt="Sarah Mitchell, Founder of Good Boy Academy" className="w-full h-full object-cover object-top" />

// Name: "Sarah Mitchell"
// DM Serif Display italic text-5xl text-[hsl(var(--foreground))] mb-2

// Subtitle: "Founder & Lead Trainer · COAPE Certified · 12 Years Experience"
// DM Sans 300 text-base text-[hsl(var(--foreground)/0.55)] mb-8

// Bio paragraph 1:
// "I started Good Boy Academy after years of watching brilliant dogs written off as 'bad' — when really, they were just misunderstood. Every dog I've worked with has taught me something. A nervous rescue collie showed me patience I didn't know I had. A destructive adolescent Labrador reminded me that boredom is a behaviour problem, not a character flaw."
// DM Sans 300 text-base leading-relaxed text-[hsl(var(--foreground)/0.75)] mb-4 text-left sm:text-center

// Bio paragraph 2:
// "I started this work because I believe that the bond between a dog and their owner is one of life's genuine joys — and I want to help every family I work with feel that. Not just a dog that sits on command, but a dog you understand and who understands you."
// Same style, mb-8

// Quote pull:
// max-w-xl mx-auto mt-4
// border-l-4 border-[hsl(var(--primary))] pl-6 py-2
// text-left
// DM Serif Display italic text-2xl text-[hsl(var(--foreground)/0.8)]
// "Training is the most loving thing you can do for your dog."

// Optional: small icon row of press mentions or association logos
// "As recognised by" label, then grayscale logos/text of COAPE, APDT, Fear Free
// opacity-40 on container, DM Sans 300 text-xs uppercase tracking-wider mb-2
```

---

## Sección 6: El viaje de capacitación (cronograma de la firma)

Consulte la implementación completa del componente en la parte superior de este documento en "Animación de la firma: cronograma del viaje de capacitación". La sección utiliza el componente `JourneySection` con la lógica de seguimiento de desplazamiento en línea y el control deslizante SVG de perro.

Resumen de estilo de clave:

```tsx
// Section wrapper:
// Background: bg-[hsl(var(--primary)/0.04)] — very subtle green tint
// Padding: py-24
// Container: max-w-5xl mx-auto px-4 sm:px-6 lg:px-8

// Section heading:
// "Your journey with us."
// DM Serif Display italic text-5xl text-[hsl(var(--foreground))] text-center mb-16

// DESKTOP (lg):
// All 4 stages in a horizontal flex row
// Dotted track line: absolute, positioned vertically at top-7 (center of the 56px icon circles)
// Dog SVG: w-8 h-5 text-[hsl(var(--accent))] animated with Framer Motion spring

// MOBILE (below lg):
// Vertical stack with left border dotted line
// pl-8 border-l-2 border-dashed border-[hsl(var(--border))]
// Small filled dot at left for each stage: -left-[calc(2rem+7px)] w-3.5 h-3.5 rounded-full bg-[hsl(var(--primary))]
// Dog icon hidden on mobile

// Stage label: step number in DM Sans 300 text-xs text-[hsl(var(--foreground)/0.4)] uppercase tracking-wider
// Stage title: DM Serif Display italic text-xl (desktop) or text-2xl (mobile)
// Stage description: DM Sans 300 text-sm text-[hsl(var(--foreground)/0.65)] leading-relaxed
// Desktop max-w: max-w-[180px] text-center | Mobile: normal width

// Active state for circles (when dog has passed that stage):
// border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)]
// transition-all duration-500
```

---

## Sección 7: Testimonios

```tsx
// Background: bg-[hsl(var(--card))]
// Padding: py-24
// Container: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8

// Label: "REAL RESULTS"
// DM Sans 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--accent))] text-center mb-4

// Heading: "Real dogs. Real results."
// DM Serif Display italic text-5xl text-[hsl(var(--foreground))] text-center mb-12

// Grid: grid grid-cols-1 md:grid-cols-3 gap-6

// TESTIMONIAL CARD:
// bg-[hsl(var(--background))] rounded-3xl p-8 border border-[hsl(var(--border))]
// flex flex-col
// Framer Motion: whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
//   viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.5 }}

// Stars row:
// flex gap-0.5 mb-3
// 5x Star icons from lucide-react: size=14 fill="hsl(var(--accent))" className="text-[hsl(var(--accent))]"
// Or render "★★★★★" as a text node in text-[hsl(var(--accent))] text-base

// Dog name chip: inline-block DM Sans 500 text-xs bg-[hsl(var(--primary)/0.1)]
//   text-[hsl(var(--primary))] px-3 py-1 rounded-full mb-4

// Quote: DM Sans 300 italic text-base leading-relaxed text-[hsl(var(--foreground)/0.8)] mb-6 flex-1
// Wrap in <blockquote> for semantic HTML

// Divider: border-t border-[hsl(var(--border))] mb-4

// Attribution:
// Owner name: DM Sans 500 text-sm text-[hsl(var(--foreground))]
// Dog info: DM Sans 300 text-xs text-[hsl(var(--foreground)/0.45)] mt-1

// TESTIMONIAL 1: Archie the Cocker Spaniel
// Dog chip: "Archie"
// Quote: "Archie was reactive to other dogs — barking, lunging, the full works. We'd tried stopping other training approaches with no luck. After 8 sessions with Sarah, we can walk past other dogs on the pavement without a single reaction. The change in him — and honestly, in us — has been incredible."
// Owner: "Emma B." | Dog: "Archie · Cocker Spaniel"

// TESTIMONIAL 2: Biscuit the Labrador
// Dog chip: "Biscuit"
// Quote: "We got Biscuit as a puppy during lockdown and had absolutely no idea what we were doing. Sarah structured everything perfectly from week one. We went from genuine chaos — chewing, jumping, no recall — to having a dog we're actually proud to show off. The puppy programme was worth every penny."
// Owner: "Tom & Sophie R." | Dog: "Biscuit · Labrador"

// TESTIMONIAL 3: Maya the Border Collie Mix
// Dog chip: "Maya"
// Quote: "Maya has separation anxiety and we'd tried two other trainers before Sarah with no real success. Sarah took the time to understand Maya's specific triggers and designed a very specific, gradual programme. Within 12 weeks, Maya can be left alone for three hours without distress. I genuinely didn't think that was possible."
// Owner: "Rachel H." | Dog: "Maya · Border Collie Mix"

// Below testimonials: trust-bar row
// "Rated 5 stars across 80+ reviews" — centered, DM Sans 300 text-sm text-[hsl(var(--foreground)/0.5)] mt-10
// flex items-center justify-center gap-2
// 5 small filled star icons + count text
```

---

## Sección 8: Precios

```tsx
// Background: bg-[hsl(var(--background))]
// Padding: py-24
// Container: max-w-5xl mx-auto px-4 sm:px-6 lg:px-8

// Label: "TRANSPARENT PRICING"
// DM Sans 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--accent))] text-center mb-4

// Heading: "Straightforward pricing."
// DM Serif Display italic text-5xl text-[hsl(var(--foreground))] text-center mb-4

// Subheading: "No hidden fees. No pressure to book a block. Pay per session or save with a package — the choice is yours."
// DM Sans 300 text-base text-[hsl(var(--foreground)/0.6)] text-center mb-12

// Grid: grid grid-cols-1 md:grid-cols-3 gap-6

// PRICING CARD:
// bg-[hsl(var(--card))] rounded-3xl p-8 border border-[hsl(var(--border))]
// text-center hover:shadow-md transition-shadow duration-300
// flex flex-col
// Framer Motion: whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
//   viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.45 }}

// Program name: DM Serif Display italic text-3xl text-[hsl(var(--foreground))] mb-2

// Per-session price: DM Sans 500 text-3xl text-[hsl(var(--primary))] mb-1

// "per session" label: DM Sans 300 text-xs text-[hsl(var(--foreground)/0.4)] mb-2

// Block deal pill: inline-block bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))]
//   DM Sans 400 text-xs px-3 py-1 rounded-full mb-6

// Divider: border-t border-[hsl(var(--border))] my-6

// Details text: DM Sans 300 text-sm text-[hsl(var(--foreground)/0.65)] leading-relaxed mb-6 flex-1 text-left

// CTA (mt-auto): "Book a Session →"
// border border-[hsl(var(--primary))] text-[hsl(var(--primary))] rounded-lg px-6 py-2.5 w-full
// DM Sans 500 text-sm hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors

// CARD 1: Puppy Foundation
// Name: "Puppy Foundation"
// Price: "£45"
// Block: "Block of 12 — £490 (save £50)"
// Details: "6-week structured programme for puppies 8 weeks–6 months. Includes workbook and ongoing WhatsApp support throughout the course."

// CARD 2: Adult Obedience
// Name: "Adult Obedience"
// Price: "£55"
// Block: "8-session package — £399 (save £41)"
// Details: "Personalised 8-session programme for dogs 6 months+. Includes written progress report and 1 complimentary follow-up session at 8 weeks post-programme."

// CARD 3: Behaviour & Rehab
// Name: "Behaviour & Rehab"
// Price: "£75"
// Block: "2-hour assessment — £150 (credited to programme)"
// Details: "Fully bespoke programme for complex behaviour challenges including reactivity, anxiety, and aggression. No session cap — we work until the outcome is achieved."

// Note below cards:
// "All sessions held at your home or a local outdoor environment relevant to your dog's training needs. Travel within 25 miles of Guildford included. Further travel available at £0.45/mile."
// DM Sans 300 text-sm text-[hsl(var(--foreground)/0.45)] text-center mt-8 max-w-xl mx-auto
```

---

## Sección 9: Preguntas frecuentes

```tsx
// Background: bg-[hsl(var(--muted))]
// Padding: py-24
// Container: max-w-2xl mx-auto px-4 sm:px-6 lg:px-8

// Label: "GOT QUESTIONS?"
// DM Sans 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--accent))] text-center mb-4

// Heading: "Common questions."
// DM Serif Display italic text-5xl text-[hsl(var(--foreground))] text-center mb-12

// shadcn/ui Accordion:
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
// <Accordion type="single" collapsible className="space-y-3">

// AccordionItem: border border-[hsl(var(--border))] rounded-2xl px-6 bg-[hsl(var(--card))]
// Remove the default border-b on AccordionItem: add [&>*]:border-b-0 or override styles

// AccordionTrigger:
// DM Sans 500 text-base text-[hsl(var(--foreground))] py-5
// hover:no-underline (override shadcn default)
// [&>svg]:text-[hsl(var(--primary))] to style the chevron icon

// AccordionContent:
// DM Sans 300 text-sm leading-relaxed text-[hsl(var(--foreground)/0.7)] pb-5

// Q1: "Where do sessions take place?"
// A1: "All training takes place at your home or a local outdoor space that's relevant to your dog's challenges — a park they find stressful, a road they react on, a café they need to learn to sit outside. We train in the real-world environments your dog actually lives in. There is no need to travel to a training facility."

// Q2: "How quickly will I see results?"
// A2: "Most clients notice meaningful changes within the first 2–3 sessions — improvements in focus, attention, and willingness to engage. Full programme outcomes typically emerge over 6–12 weeks depending on the dog and the challenge. Behaviour change is a process, not an event. We set realistic expectations from day one."

// Q3: "My dog has already been to another trainer. Can you still help?"
// A3: "Yes — and this is more common than you might think. Many of our clients come to us after other approaches haven't delivered lasting results. We start completely fresh: new assessment, new plan, no assumptions. Previous training — positive or otherwise — is part of the picture we consider, not a complication."

// Q4: "Do you work with all breeds?"
// A4: "Yes, without exception. We work with every breed, mix, size, and age. We have extensive experience with gentle family dogs, high-drive working breeds, terriers, livestock guardian breeds, and everything in between. Breed tendencies inform our approach, but every dog is assessed and trained as an individual."

// Q5 (optional fifth): "Is your training safe for rescue dogs?"
// A5: "Absolutely. Many of our most rewarding cases involve rescue dogs with unknown or difficult histories. Fear-free, force-free training is particularly well-suited to dogs who may have trauma or anxiety from past experiences. We always proceed at your dog's pace — never pushing further than they're comfortable with. An initial assessment helps us understand your rescue's specific background before we begin."

// Below FAQ: CTA nudge
// "Still have questions? Just reach out."
// DM Sans 300 text-sm text-[hsl(var(--foreground)/0.5)] text-center mt-10
// "hello@goodboyacademy.co.uk" as a mailto link, text-[hsl(var(--primary))] underline
```

---

## Sección 10: Pie de página

```tsx
// Background: bg-[hsl(var(--foreground))]  — near-black inverted footer
// Color: all text is light on dark
// Padding: py-16

// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
// Grid: grid grid-cols-1 md:grid-cols-3 gap-12

// Column 1 — Logo + Tagline:
// flex items-center gap-2 mb-4
// PawPrint icon (lucide-react): text-[hsl(var(--background)/0.6)] w-5 h-5
// "GOOD BOY ACADEMY" — DM Serif Display italic text-xl text-[hsl(var(--background))]
// Tagline: "Every dog. Every breed. Every stage."
//   DM Sans 300 text-sm text-[hsl(var(--background)/0.55)] mt-2
// Location: "Based in Surrey · Serving Surrey, Hampshire & West London"
//   DM Sans 300 text-xs text-[hsl(var(--background)/0.4)] mt-4 leading-relaxed

// Column 2 — Quick Links:
// "Quick Links" label — DM Sans 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--background)/0.4)] mb-4
// Links: Programs | Our Method | About Sarah | Testimonials | Book Assessment
// Each: block DM Sans 300 text-sm text-[hsl(var(--background)/0.6)] py-1
//   hover:text-[hsl(var(--background))] transition-colors duration-150

// Column 3 — Get In Touch:
// "Get In Touch" — same uppercase label style
// "hello@goodboyacademy.co.uk" — DM Sans 400 text-sm text-[hsl(var(--background)/0.65)] mb-1
// "07700 900 456" — same style mb-4
// "Mon–Fri 8am–6pm · Sat 8am–1pm" — DM Sans 300 text-xs text-[hsl(var(--background)/0.4)] mb-6

// Social icons row (flex gap-3):
// Instagram + Facebook icons from lucide-react
// Wrap in <a> with href and aria-label
// text-[hsl(var(--background)/0.5)] hover:text-[hsl(var(--background))] transition-colors w-6 h-6

// Bottom bar:
// mt-12 pt-8 border-t border-[hsl(var(--background)/0.1)]
// flex flex-col sm:flex-row justify-between items-center gap-3
// "© 2025 Good Boy Academy. All rights reserved."
//   DM Sans 300 text-xs text-[hsl(var(--background)/0.35)]
// "Fear-free · science-based · human(e)."
//   DM Sans 300 text-xs text-[hsl(var(--background)/0.25)] italic
```

---

## Aplicación Estructura

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ProgramsSection.tsx
│   ├── MethodSection.tsx
│   ├── TrainerSection.tsx
│   ├── JourneySection.tsx         # Animated timeline with dog SVG
│   ├── TestimonialsSection.tsx
│   ├── PricingSection.tsx
│   ├── FAQSection.tsx
│   └── Footer.tsx
└── components/ui/                 # shadcn/ui components
    ├── accordion.tsx
    ├── button.tsx
    └── ...
```

### App.tsx Estructura

```tsx
// App.tsx
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProgramsSection from './components/ProgramsSection'
import MethodSection from './components/MethodSection'
import TrainerSection from './components/TrainerSection'
import JourneySection from './components/JourneySection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ProgramsSection />
        <MethodSection />
        <TrainerSection />
        <JourneySection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
```

### index.css

```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@1&family=DM+Sans:wght@300;400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 36 44% 89%;
    --foreground: 60 3% 10%;
    --primary: 155 37% 26%;
    --primary-foreground: 36 44% 95%;
    --accent: 18 52% 55%;
    --muted: 36 30% 83%;
    --muted-foreground: 60 3% 40%;
    --border: 36 20% 75%;
    --card: 36 44% 95%;
    --card-foreground: 60 3% 10%;
    --radius: 0.75rem;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    font-family: 'DM Serif Display', serif;
    font-style: italic;
    font-weight: 400;
  }

  /* Smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
  }

  /* Remove tap highlight on mobile */
  * {
    -webkit-tap-highlight-color: transparent;
  }
}

@layer utilities {
  /* Custom tracking utility for the label style */
  .tracking-label {
    letter-spacing: 0.3em;
  }
}
```

---

## Notas clave de implementación

1. **Perro en la línea de tiempo del viaje**: el SVG del perro debe tener 32 px × 20 px y estar colocado absolutamente en la línea de puntos horizontal. Calcule `dogX` en un `useEffect` siguiendo el progreso de desplazamiento de la sección a través de `window.scrollY` en relación con el `getBoundingClientRect().top` de la sección. Sujete a 0–1. Multiplique por `(trackContainerWidth - 40)` para obtener el valor final de TranslateX. Utilice Framer Motion `animate={{ x: dogX }}` con una transición de resorte para un movimiento suave. Los 4 círculos del escenario pasan a un estado visual activo (borde verde, fondo verde claro) cuando el perro los pasa, controlado por `Math.floor(scrollProgress * 4)`.

2. **Pantalla DM Serif: solo cursiva**: esta fuente de Google solo incluye el peso en cursiva. Cada título debe tener aplicado "estilo de fuente: cursiva". La regla CSS `h1, h2, h3, h4 { font-style: italic }` maneja esto globalmente, pero garantiza que cualquier encabezado representado dentro de `<p>` o `<span>` fuera de las etiquetas de encabezado también obtenga la clase de fuente "font-serif cursiva" manualmente. Si no se aplica esto, el título volverá a un serif predeterminado enforma no cursiva.

3. **Marca sin miedo**: Las señales de confianza en el héroe ("Sin miedo", "Certificado COAPE") siempre deben aparecer juntas. Estas son certificaciones reales: la copia del sitio web refleja credenciales profesionales genuinas. Mantenlos visibles y destacados. COAPE es el Centro de Etología Aplicada de Mascotas (organismo profesional con sede en el Reino Unido). APDT es la Asociación de Adiestradores de Perros. Ambas son organizaciones reales y sus nombres no deben modificarse.

4. **Viaje móvil**: en dispositivos móviles (debajo de `lg`), la línea de tiempo cambia a un diseño vertical. La línea de puntos corre por el lado izquierdo del contenedor como un estilo "borde-l-2 borde-discontinuo". El icono del perro no se muestra en el móvil (demasiado pequeño y poco práctico en un diseño de desplazamiento vertical). Cada etapa tiene un pequeño punto relleno (`w-3.5 h-3.5 rounded-full bg-[hsl(var(--primary))]`) en el borde izquierdo como marcador visual. Los escenarios se animan con la entrada escalonada " whileInView " en el móvil.

5. **Uso de acento terracota**: El color `--accent` (terracota `#C8714A`) se utiliza para las etiquetas ("QUÉ OFRECEMOS", "CÓMO TRABAJAMOS", etc.), la preetiqueta del héroe ("SURREY · FEAR-FREE CERTIFIED"), las calificaciones de estrellas en los testimonios, las fichas con el nombre del perro en los testimonios y el SVG del perro deslizante en la línea de tiempo del viaje. NO debe usarse para CTA principales: ese es el verde bosque `--primary`. Los dos colores son complementarios, no intercambiables. Mantener esta distinción es lo que le da poder al color de acento.

6. **Textos alternativos de imágenes**: Todos los textos alternativos de imágenes hacen referencia al programa o entrenador específico que se muestra. Esto es importante para la accesibilidad y el SEO: el contenido del sitio web de adiestramiento canino es muy visual y los textos alternativos bien optimizados mejoran el descubrimiento de búsqueda de imágenes de Google. Las imágenes descritas en los comentarios JSX encima de cada etiqueta `<img>` incluyen detalles específicos: calidad de iluminación, raza de perro, lenguaje corporal del entrenador y entorno. Pase estas descripciones a una herramienta de generación de imágenes de IA (Midjourney, DALL-E, Flux) para generar imágenes de marcador de posición durante el desarrollo.

7. **ID de sección para navegación de anclaje**: los enlaces de la barra de navegación utilizan navegación hash. Cada sección debe tener un atributo `id` correspondiente: 
 - `<section id="programs">` — Sección del programa
 -`<section id="our-method">` — Sección de métodos
 - `<section id="about">` — Sección de capacitadores
 - `<section id="testimonials">` — Sección de testimonios
 - `<section id="book">` — Sección de precios (funciona como ancla de reserva)
 El desplazamiento suave es manejado por `html { scroll-behavior: smooth }` en `index.css`, por lo que no se necesita ningún controlador de desplazamiento de JavaScript para los enlaces de anclaje.

8. **Notas de rendimiento**: Todas las animaciones " whileInView " utilizan `viewport={{ once: true }}` para garantizar que solo se activen una vez, lo que evita que se vuelvan a animar cuando el usuario se desplaza hacia arriba. Esto es esencial para una sensación profesional. Las animaciones del héroe ("animar" en el montaje) se activan inmediatamente y no utilizan " whileInView ". La línea de tiempo del recorrido utiliza un detector de desplazamiento pasivo (`{ passive: true }`) para un rendimiento de desplazamiento óptimo. Ninguna imagen tiene `loading="eager"` de forma predeterminada; agréguelo solo a la imagen principal que se encuentra en la mitad superior de la página.

9. **Personalización de acordeón de shadcn/ui**: el componente predeterminado de acordeón de shadcn agrega un subrayado al disparador al pasar el mouse a través de una utilidad Tailwind. Anule esto con `hover:no-underline` en `AccordionTrigger`. También elimine el borde inferior predeterminado en "AccordionItem" anulándolo con "border-b-0": el borde proviene del contenedor de la tarjeta, no del elemento en sí. El ícono de galón dentro de "AccordionTrigger" hereda el color del texto; Coloréalo de verde bosque apuntando a `[&_svg]:text-[hsl(var(--primary))]` en el gatillo.

10. **Puntos de interrupción de Grid responsivos**: Tarjetas de programa: `grid-cols-1` en dispositivos móviles, `grid-cols-3` de `lg` (1024 px). Tarjetas de precios: `grid-cols-1` en dispositivos móviles, `grid-cols-3` de `md` (768 px). Tarjetas de testimonios: `grid-cols-1` en dispositivos móviles, `grid-cols-3` de `md`. La cuadrícula principal es `grid-cols-1` en dispositivos móviles (apilada), `grid-cols-2` de `lg`. La cuadrícula del pie de página es "grid-cols-1" en dispositivos móviles, "grid-cols-3" de "md". Estos puntos de interrupción garantizan que el contenido sea legible y que los diseños no se compriman de manera incómoda en el tamaño de una tableta.
