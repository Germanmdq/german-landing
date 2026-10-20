# FORGE & GRAIN BREWING CO. — Aviso del sitio web de Craft Brewery

**Pila tecnológica:** React + Vite + TypeScript + Tailwind CSS + Framer Motion (`motion/react`) + shadcn/ui + lucide-react 
**Nicho:** Cervecería artesanal con Taproom — Sheffield

---

## Sistema de diseño

### Colores (HSL en: propiedades personalizadas de CSS raíz)

```css
:root {
  --background: 30 7% 7%;           /* dark charcoal #141210 */
  --foreground: 40 70% 87%;         /* wheat cream #F0E6C8 */
  --primary: 32 62% 47%;            /* amber #C47D2E */
  --primary-foreground: 30 7% 7%;
  --secondary: 30 68% 31%;          /* deep copper #8A5A1A */
  --card: 30 7% 11%;                /* dark card #1D1B18 */
  --card-foreground: 40 70% 87%;
  --muted-foreground: 40 20% 55%;
  --border: 30 10% 18%;
  --muted: 30 7% 9%;
}
```

### Fundamento del diseño

El sistema de color es intencionalmente más bien cálido que neutro-oscuro. El fondo de "30 7% 7%" es casi negro con un tono marrón tenue, el tipo de color que se asocia con el cobre viejo, el roble chamuscado o una sartén de hierro fundido bien curada. No es el negro estéril de un producto tecnológico. Al final del día, es la oscuridad de una fragua reformada. El ámbar primario en "32 62% 47%" se extrae directamente del color de una cerveza pálida bien servida y sostenida sobre una bombilla de tungsteno. El primer plano color crema trigo `40 70% 87%` fue elegido para leerse limpiamente contra el fondo oscuro y al mismo tiempo sentirse cálido, nunca el blanco azulado de un blanquecino estándar. 

El color del borde `30 10% 18%` es sutil: lo suficiente para separar las tarjetas de su fondo sin competir visualmente. El primer plano silenciado `40 20% 55%` se utiliza para texto secundario, etiquetas y metadatos; se ubica cómodamente entre el primer plano completo y el invisible, lo que permite una jerarquía tipográfica clara de tres niveles en cada sección.

### Tipografía

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400&display=swap');

/* Display headings: Playfair Display 700/900 */
/* Body: Source Sans 3 300/400 */
```

Aplicar globalmente:
```css
body {
  font-family: 'Source Sans 3', sans-serif;
  font-weight: 300;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 {
  font-family: 'Playfair Display', serif;
}
```

### Justificación de la tipografía

Playfair Display es una serifa de alto contraste diseñada para uso editorial en tamaños grandes: tiene el peso y el carácter de los medios impresos tradicionales, haciendo referencia a antiguas etiquetas de cervecerías, cabeceras de periódicos del siglo XIX y la estética general de algo hecho con artesanía en lugar de software. En "peso de fuente: 900" en el héroe, se lee como autoritario e intransigente. Con "peso de fuente: 700" en los títulos de las secciones, es elegante y claro. Source Sans 3 en `300` (claro) es todo lo contrario: aireado, moderno y neutral. El contraste entre los dos tipos de letra es la tensión visual principal del diseño: herencia y moderación, uno al lado del otro. Fuente Sans 3 `300` llevatodo el texto del cuerpo descriptivo, notas de cata y descripciones de secciones. Source Sans 3 `400` está reservado para etiquetas interactivas (precios, texto de CTA, campos de formulario), cualquier cosa sobre la que se espera que actúe el usuario.

### Convenciones de diseño y espaciado

- Relleno de sección: `py-24` en todo (96px arriba y abajo). Nunca reduzca esto: el generoso espacio en blanco es lo que le da a las secciones espacio para respirar y permite que cada rumbo aterrice con peso. 
- Contenedor: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` en todas las secciones. Márgenes horizontales consistentes en cada punto de interrupción.
: los bordes de las tarjetas usan `redondeado-xl` (radio de 12 px) en contenedores de imágenes, envoltorios de tarjetas y bloques de información. La única excepción son los botones CTA: estos utilizan "ninguno redondeado" (radio cero) como una señal deliberada de diseño industrial. 
: el fondo de la sección alterna entre `bg-[hsl(var(--background))]` y `bg-[hsl(var(--card))]`. El fondo de la tarjeta en `30 7% 11%` es solo 4 puntos de luminosidad más claro que el fondo base; apenas perceptible como diferencia de color, pero suficiente para registrar un límite de sección cuando el ojo escanea la página.

---

## Tailwind Configuración

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

## Animaciones exclusivas

### Animación 1: Voltear tarjeta de cerveza (3D Hover)

Eda tarjeta de cerveza en la sección "On Tap Today" gira 180° al pasar el mouse para revelar la degustación notas en la parte de atrás. Esta es una animación CSS pura (no se requiere Framer Motion) que utiliza las propiedades de transformación CSS 3D `perspective`, `transform-style: preserve-3d`, `backface-visibility: oculto` y `rotateY(180deg)`.

. El valor de perspectiva de `1000px` crea una profundidad 3D suave y realista. Los valores más bajos (por ejemplo, `400px`) producen un giro más exagerado, estilo carnaval, que chocaría con la estética sobria de la cervecería. Los valores más altos (por ejemplo, `2000px`) hacen que la inversión sea demasiado plana para registrarse con claridad. `1000px` es el punto ideal calibrado para este tamaño de tarjeta. 

```tsx
// CSS required in index.css:
.flip-card { perspective: 1000px; }
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.flip-card-back {
  transform: rotateY(180deg);
}

// USAGE in JSX:
<div className="flip-card h-64 cursor-pointer">
  <div className="flip-card-inner rounded-xl overflow-hidden">
    <div className="flip-card-front bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-xl p-6 flex flex-col justify-between h-full">
      {/* Beer name, style, ABV */}
    </div>
    <div className="flip-card-back bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.3)] rounded-xl p-6 flex flex-col justify-between h-full">
      {/* Tasting notes, IBU, availability */}
    </div>
  </div>
</div>
```

 La cara posterior utiliza un fondo ámbar de muy baja opacidad `hsl(var(--primary)/0.12)`, lo suficientemente sutil como para evitar sobrecargar el texto, pero lo suficientemente presente como para indicar que estás mirando el "otro lado" de la tarjeta. La frontera se desplaza dedesde el color estándar `--border` en el frente hasta un `hsl(var(--primary)/0.3)` teñido de ámbar en la parte posterior; se ha producido un pequeño detalle que refuerza el giro.

### Animación 2: Barra de vertido ámbar

Al cargar la página, una barra ámbar horizontal se anima desde `ancho: 0%` hasta `ancho: 100%` durante 2 segundos en la parte inferior de la sección de héroe. La barra tiene 3 píxeles de alto, utiliza un degradado de izquierda a derecha desde cobre profundo hasta ámbar y ámbar transparente, y está precedida por un breve desvanecimiento de gradiente encima que facilita la transición visual entre el contenido del héroe oscuro y la barra misma.

```tsx
// Component: AmberPourBar
// Position: at the bottom of the hero content area, within the left column

<div className="mt-12 overflow-hidden">
  {/* Gradient fade above the bar */}
  <div className="h-12 bg-gradient-to-t from-[hsl(var(--primary)/0.06)] to-transparent mb-0" />
  
  {/* The animated bar */}
  <motion.div
    className="h-[3px] bg-gradient-to-r from-[hsl(var(--secondary))] via-[hsl(var(--primary))] to-[hsl(var(--primary)/0.4)]"
    initial={{ width: '0%' }}
    animate={{ width: '100%' }}
    transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
  />
</div>

// This simulates an amber liquid "pouring" from left to right beneath the hero content.
```

El retraso de 0,5 s permite que el texto del héroe se atenúe antes de que comience el vertido. La curva de relajación "easeInOut" le da a la barra una calidad natural de líquido vertido: comienza lentamente (la cerveza sale del grifo), acelera en el medio (el vertido a pleno flujo) y desacelera suavemente al final (el llenado del vaso). Esta es una de esas pequeñas animaciones que la mayoría de los visitantes no notarán conscientemente, pero que hace que la página en general se sienta diseñada en lugar de ensamblada. 

### Animación 3: desvanecimiento activado por desplazamiento (reutilizado en todas las secciones)

Varias secciones utilizan el mismo patrón de animación de desplazamiento base a través de ` whileInView` de Framer Motion. Aplique esto a los pasos del proceso de elaboración de cerveza, filas de eventos y encabezados de sección:

```tsx
// Base pattern (add viewport={{ once: true }} to trigger only on first view):
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
>
  {/* content */}
</motion.div>

// For right-side image reveals (Taproom section):
<motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
  {/* image */}
</motion.div>
```

---

## Sección 1: Barra de navegación

```tsx
// Fixed top: fixed top-0 left-0 right-0 z-50
// bg-[hsl(var(--background)/0.96)]
// border-b border-[hsl(var(--border))]
// backdrop-blur-sm (subtle blur — reinforces the dark glass-panel feel)
// Height: h-20 (80px — slightly taller for logo breathing room)

// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
// Layout: flex items-center justify-between h-full

// Logo: flex flex-col items-start
//   Row 1: flex items-center gap-2
//     [Inline SVG hop icon: circle outline with small leaf details, ~20px, text-[hsl(var(--primary))]]
//     "FORGE & GRAIN" — Playfair Display 700 text-xl text-[hsl(var(--foreground))] tracking-wide
//   Row 2: "BREWING CO." — Source Sans 3 300 text-xs tracking-widest text-[hsl(var(--muted-foreground))] pl-8

// Desktop nav (hidden on mobile, lg:flex gap-8):
// "On Tap" | "Taproom" | "Our Story" | "Events" | "Visit"
// Source Sans 3 400 text-sm text-[hsl(var(--muted-foreground))]
// Hover: text-[hsl(var(--foreground))] transition-colors duration-150

// "Visit Us" CTA button (ml-8):
// bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
// Source Sans 3 400 text-sm px-6 py-2
// rounded-none (square edges — industrial)
// hover:opacity-85 transition-opacity

// Mobile hamburger (lg:hidden):
// Menu icon from lucide-react, w-5 h-5 text-[hsl(var(--foreground))]
// onClick toggles isOpen state
// Mobile nav panel (when isOpen):
//   absolute top-20 left-0 right-0 bg-[hsl(var(--background))]
//   border-b border-[hsl(var(--border))] px-6 py-6
//   flex flex-col gap-4
//   Same links as desktop, text-base
//   "Visit Us" button full-width at bottom of mobile panel
```

---

## Sección 2: Hero

```tsx
// Height: 100dvh
// Background: bg-[hsl(var(--background))]
// Layout: flex items-center

// Subtle texture overlay:
// absolute inset-0 pointer-events-none z-0 opacity-[0.03]
{/* Background texture: subtle dark concrete or stone grain texture, adds industrial depth to solid dark background */}

// Grid: grid lg:grid-cols-[60%_40%] items-stretch min-h-screen

// LEFT COLUMN (z-10 relative):
// px-8 lg:px-16 py-32 flex flex-col justify-center

// Label: "EST. 2018 · SHEFFIELD"
// Source Sans 3 300 text-xs tracking-[0.4em] text-[hsl(var(--muted-foreground))] uppercase mb-6
// Motion: initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}

// Headline: "Brewed with purpose. Poured with pride."
// Playfair Display 900
// text-[80px] leading-[1.05] (desktop) → text-5xl leading-tight (mobile)
// text-[hsl(var(--foreground))]
// Framer Motion: initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}

// Subtext paragraph:
// "Independent craft brewery making real beer for real people. We brew in small batches, use locally sourced malt wherever possible, and we never compromise on flavour. We're based in Sheffield and proud of it."
// Source Sans 3 300 text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mt-6 max-w-lg
// Motion: same pattern, delay 0.25s

// CTAs (flex gap-4 mt-10 flex-wrap):
// Primary button: "See What's On Tap"
//   bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
//   px-8 py-3 rounded-none Source Sans 3 400 text-sm
//   hover:opacity-85 transition-opacity
//   cursor-pointer
// Ghost button: "Plan Your Visit"
//   border border-[hsl(var(--foreground)/0.3)] text-[hsl(var(--foreground))]
//   px-8 py-3 rounded-none Source Sans 3 400 text-sm
//   hover:border-[hsl(var(--foreground))] transition-colors
//   cursor-pointer

// AmberPourBar component placed below CTAs (see Animation 2)

// RIGHT COLUMN:
// relative overflow-hidden lg:h-full h-80 mt-16 lg:mt-0
{/* Image: craft brewery interior with large copper brew kettles gleaming under industrial pendant lights, exposed red brick walls, authentic Sheffield brewery atmosphere, warm amber and copper tones, dramatic lighting with steam wisps rising from the mash tun */}
<img src="" alt="Forge & Grain brewery copper kettles" className="absolute inset-0 w-full h-full object-cover" />
// Left gradient overlay: absolute inset-y-0 left-0 w-32 z-10
//   bg-gradient-to-r from-[hsl(var(--background))] to-transparent
//   (blends the image into the dark left column on desktop)
// Bottom gradient overlay (mobile only): absolute bottom-0 inset-x-0 h-24 lg:hidden
//   bg-gradient-to-t from-[hsl(var(--background))] to-transparent
```

---

## Sección 3: On Tap Today (Tarjetas invertidas 3D)

```tsx
// Background: bg-[hsl(var(--card))]
// Padding: py-24
// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

// Section header (flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12):
// Left:
//   Label: "ON TAP TODAY" — Source Sans 3 300 text-xs tracking-[0.4em] uppercase text-[hsl(var(--primary))] mb-3
//   Heading: "What's On Tap."
//   Playfair Display 700 text-[64px] leading-none text-[hsl(var(--foreground))]
// Right:
//   Sub: "Brewed fresh in Sheffield. Rotating seasonal selection."
//   Source Sans 3 300 text-sm text-[hsl(var(--muted-foreground))] max-w-xs text-right (sm)

// Grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4

// Each card height: h-64 (256px). The fixed height ensures the card grid stays uniform even when beer names vary in length.

// FRONT FACE structure:
// bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-xl p-6
// flex flex-col justify-between h-full
//
// Top block:
//   Beer name: Playfair Display 700 text-2xl text-[hsl(var(--foreground))] mb-1 leading-tight
//   Style tag: Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider
//
// Middle block:
//   ABV value: Source Sans 3 700 text-4xl text-[hsl(var(--primary))] leading-none
//   "ABV" label: Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-1
//
// Bottom:
//   "Flip for tasting notes →"
//   Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground))] italic

// BACK FACE structure:
// bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.3)] rounded-xl p-6
// flex flex-col justify-between h-full
//
// Top:
//   "TASTING NOTES" — Source Sans 3 300 text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-3
//
// Middle:
//   Description: Source Sans 3 300 text-sm text-[hsl(var(--foreground)/0.85)] italic leading-relaxed
//
// Bottom:
//   Stats row: flex gap-6 mb-3
//     IBU stat: flex flex-col
//       Value: Source Sans 3 700 text-lg text-[hsl(var(--primary))] leading-none
//       Label: Source Sans 3 300 text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]
//     ABV stat: same pattern
//   "Available at the bar ✓" Source Sans 3 300 text-xs text-[hsl(var(--primary))]

// BEER DATA ARRAY (map over this to render cards):
const beers = [
  {
    name: 'Ironside Pale Ale',
    style: 'American Pale',
    abv: '4.8%',
    ibu: 35,
    notes: 'Tropical citrus and pine resin on the nose, refreshingly bitter finish with soft stone fruit undertones. Our best-selling pale since day one.',
  },
  {
    name: 'Coal Face Porter',
    style: 'English Porter',
    abv: '5.6%',
    ibu: 28,
    notes: 'Rich roasted malt, dark chocolate bitterness, subtle vanilla on the finish. Sheffield\'s favourite winter warmer — dark enough to make you feel warm before you\'ve even taken a sip.',
  },
  {
    name: 'Golden Anvil Lager',
    style: 'Czech Pilsner Style',
    abv: '4.2%',
    ibu: 22,
    notes: 'Clean, crisp, and refreshing. Light floral hops with a smooth malt backbone — the session lager that converted half our porter drinkers. Perfect from the first sip to the last.',
  },
  {
    name: 'Ember Wheat',
    style: 'Hefeweizen',
    abv: '4.5%',
    ibu: 15,
    notes: 'Classic banana and clove esters from our Bavarian yeast strain. Hazy golden pour, smooth and naturally cloudy. Brewed in the traditional Hefeweizen style — no shortcuts, no filtration.',
  },
  {
    name: 'Copper Run IPA',
    style: 'West Coast IPA',
    abv: '6.2%',
    ibu: 65,
    notes: 'Punch of grapefruit, mango, and resinous pine. Big hops, dry and assertive, with a clean bitter finish. Our most divisive beer — you either love it completely or you don\'t order a second. No fence-sitters.',
  },
  {
    name: 'Session Saison',
    style: 'Belgian Saison',
    abv: '3.8%',
    ibu: 20,
    notes: 'Spicy farmhouse character, light and effervescent, with notes of white pepper, lemon zest, and fresh hay. Our lowest ABV beer and arguably our most complex. Proof that restraint and flavour are not opposites.',
  },
]
```

---

## Sección 4: Taproom

```tsx
// Background: bg-[hsl(var(--background))]
// Padding: py-24
// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

// Grid: grid grid-cols-1 lg:grid-cols-2 gap-16 items-center

// LEFT — Text column:
// Label: "THE TAPROOM"
// Source Sans 3 300 text-xs tracking-[0.4em] uppercase text-[hsl(var(--primary))] mb-4

// Heading: "The Taproom."
// Playfair Display 700 text-6xl text-[hsl(var(--foreground))] leading-tight mb-6

// Body paragraph 1:
// "Set in a converted Victorian forge in the heart of Sheffield, our taproom is everything a great local should be — honest, welcoming, and smelling faintly of something excellent in the tank. Pull up a stool at the long bar, grab a flight of four to explore the range, or settle into one of the alcoves with a pint and some good company."
// Source Sans 3 300 text-base text-[hsl(var(--muted-foreground))] leading-relaxed mb-4

// Body paragraph 2:
// "We've got no Wi-Fi password, no background music playlist managed by an algorithm, and no menu that changes every three months to chase trends. We've got six taps, six great beers, and all the time in the world to talk about them."
// Source Sans 3 300 text-base text-[hsl(var(--muted-foreground))] leading-relaxed mb-8

// Opening hours card:
// bg-[hsl(var(--card))] rounded-xl p-6 border border-[hsl(var(--border))] mb-8
// "OPENING HOURS" — Source Sans 3 300 text-xs tracking-wider uppercase text-[hsl(var(--muted-foreground))] mb-4
// Hours table (divide-y divide-[hsl(var(--border))]):
// Each row: flex justify-between items-center py-2.5
//   Day range: Source Sans 3 300 text-sm text-[hsl(var(--muted-foreground))]
//   Time: Source Sans 3 400 text-sm text-[hsl(var(--foreground))]
const hours = [
  { days: 'Tuesday – Thursday', time: '4:00pm – 10:00pm' },
  { days: 'Friday', time: '3:00pm – 11:00pm' },
  { days: 'Saturday', time: '12:00pm – 11:00pm' },
  { days: 'Sunday', time: '12:00pm – 8:00pm' },
  { days: 'Monday', time: 'Closed' },
]
// Monday's "Closed" time: text-[hsl(var(--muted-foreground))] italic

// CTA: "Get Directions →"
// bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
// px-8 py-3 rounded-none Source Sans 3 400 text-sm
// inline-block hover:opacity-85 transition-opacity

// RIGHT — Image column:
// h-[520px] rounded-xl overflow-hidden
// Framer Motion: whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 40 }}
//   viewport={{ once: true }} transition={{ duration: 0.7 }}
{/* Image: warm taproom interior with exposed brick walls, long wooden bar with brass beer taps, low amber pendant lighting, industrial wooden bar stools, groups of people enjoying drinks in the background, authentic Sheffield local pub atmosphere, evening golden hour scene */}
<img src="" alt="Forge & Grain taproom interior" className="w-full h-full object-cover" />
```

---

## Sección 5: Nuestra historia

```tsx
// Background: bg-[hsl(var(--card))]
// Padding: py-24
// Container: max-w-5xl mx-auto px-4 sm:px-6 lg:px-8

// Label: "OUR STORY"
// Source Sans 3 300 text-xs tracking-[0.4em] uppercase text-[hsl(var(--primary))] mb-4

// Heading: "Sheffield steel meets Sheffield beer."
// Playfair Display 700 text-5xl text-[hsl(var(--foreground))] leading-tight mb-12

// Pull quote block:
// bg-[hsl(var(--background)/0.6)] rounded-xl p-8 border-l-4 border-[hsl(var(--primary))] my-12
// '"We wanted to make the kind of beer we actually wanted to drink."'
// Playfair Display 700 italic text-3xl text-[hsl(var(--foreground))] leading-snug
// Attribution below: "— Tom & Dan, co-founders"
//   Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground))] mt-4 uppercase tracking-wider

// Story paragraph 1:
// "Forge & Grain was started in 2018 by two friends — a former steelworker and a homebrewer — who shared a belief that Sheffield deserved great local beer. The city had always made things with its hands. We thought beer should be on that list."
// Source Sans 3 300 text-base text-[hsl(var(--muted-foreground))] leading-relaxed mb-4

// Story paragraph 2:
// "Armed with a 5-barrel system, a converted forge unit in S3, and an obsessive attention to process, they brewed their first batch of Ironside Pale Ale on a freezing January morning. Two hundred batches later, the commitment to small-batch quality remains unchanged. The 5-barrel system is still the same one."
// Source Sans 3 300 text-base text-[hsl(var(--muted-foreground))] leading-relaxed mb-4

// Story paragraph 3:
// "We don't brew to maximise volume. We brew to maximise flavour. Every recipe is developed in-house, every ingredient is chosen with reason, and every beer that leaves this building has been tasted by the team and declared ready. We're slow by design."
// Source Sans 3 300 text-base text-[hsl(var(--muted-foreground))] leading-relaxed mb-12

// Founders image:
// rounded-xl overflow-hidden h-72 w-full
{/* Image: two brewery founders standing together inspecting a pint glass held up to light, warm smiles in authentic brewery environment, documentary-style portrait, warm natural backlighting, genuine and approachable */}
<img src="" alt="Forge & Grain brewery founders" className="w-full h-full object-cover" />
```

---

## Sección 6: Proceso de preparación

```tsx
// Background: bg-[hsl(var(--background))]
// Padding: py-24
// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

// Section label: "THE PROCESS"
// Source Sans 3 300 text-xs tracking-[0.4em] uppercase text-[hsl(var(--primary))] mb-4

// Heading: "How we brew."
// Playfair Display 700 text-5xl text-[hsl(var(--foreground))] mb-16

// Steps wrapper: relative grid grid-cols-1 md:grid-cols-3 gap-8

// Connector line (desktop only):
// hidden md:block absolute top-8 left-[calc(1/6*100%)] right-[calc(1/6*100%)] h-px
// bg-[hsl(var(--border))] z-0
// (This horizontal line sits behind the step circles, connecting them visually)

// STEP COMPONENT (relative z-10 text-center):

// Step circle: w-16 h-16 rounded-full border-2 border-[hsl(var(--border))]
//   bg-[hsl(var(--card))] flex items-center justify-center mx-auto mb-6

// Step label: Source Sans 3 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--primary))] mb-2

// Step heading: Playfair Display 700 italic text-2xl text-[hsl(var(--foreground))] mb-4

// Step body: Source Sans 3 300 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-xs mx-auto

// Motion: whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
//   viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.6 }}

const steps = [
  {
    icon: 'Wheat',         // lucide-react Wheat icon
    label: 'STEP ONE',
    heading: 'Malt',
    body: 'We source our malt from Yorkshire maltsters. Locally grown barley, kilned to the profile each recipe demands. The foundation of every great pint starts here — long before the kettle is hot.',
  },
  {
    icon: 'FlaskConical',  // lucide-react FlaskConical icon
    label: 'STEP TWO',
    heading: 'Brew',
    body: 'Our 5-barrel copper kettle has brewed every single batch since January 2018. Same equipment, same care, same approach. We hit our gravity numbers or we don\'t package the beer. No exceptions.',
  },
  {
    icon: 'Droplets',      // lucide-react Droplets icon
    label: 'STEP THREE',
    heading: 'Ferment',
    body: 'Patient fermentation at precise temperatures in our temperature-controlled fermentation vessels. We never rush the process. Every beer conditions for exactly as long as it needs — no shortcuts, no forced carbonation in tank.',
  },
]
// Icons: text-[hsl(var(--primary))] w-6 h-6 inside the step circle
```

---

## Sección 7: Eventos

```tsx
// Background: bg-[hsl(var(--card))]
// Padding: py-24
// Container: max-w-5xl mx-auto px-4 sm:px-6 lg:px-8

// Label: "COMING UP"
// Source Sans 3 300 text-xs tracking-[0.4em] uppercase text-[hsl(var(--primary))] mb-4

// Heading: "Coming Up."
// Playfair Display 700 text-5xl text-[hsl(var(--foreground))] mb-12

// Events list: space-y-0 divide-y divide-[hsl(var(--border))]

// EVENT COMPONENT:
// py-8 flex flex-col sm:flex-row gap-6 sm:items-center
// Framer Motion: whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }}
//   viewport={{ once: true }} transition={{ delay: index * 0.1 }}

// Date column (flex-shrink-0 sm:w-24):
//   Day number: Playfair Display 700 text-3xl text-[hsl(var(--primary))] leading-none
//   Month/Year: Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-1

// Details column (flex-1):
//   Event name: Playfair Display 700 text-xl text-[hsl(var(--foreground))] mb-2
//   Description: Source Sans 3 300 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-3
//   Meta row (flex gap-3 flex-wrap items-center):
//     Price badge: bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]
//       text-xs px-3 py-1 Source Sans 3 400
//     Spaces badge (if applicable): same style but bg-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]

// CTA (sm:ml-auto flex-shrink-0):
//   border border-[hsl(var(--primary))] text-[hsl(var(--primary))]
//   px-5 py-2 rounded-none Source Sans 3 400 text-sm
//   hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors

const events = [
  {
    day: '15',
    month: 'FEB 2025',
    name: 'Brewery Tour + Guided Tasting',
    description: '45-minute guided tour of the full brewery floor — fermentation vessels, copper kettle, conditioning tanks — followed by a guided tasting of all six beers currently on tap. Hosted by our head brewer. Limited to 12 people per session for a genuinely personal experience.',
    price: '£18 / person',
    spaces: '8 spaces left',
    cta: 'Book Now →',
  },
  {
    day: '7',
    month: 'MAR 2025',
    name: 'Beer & Cheese Pairing Evening',
    description: 'Six Forge & Grain beers matched with six artisan Yorkshire cheeses sourced from Courtyard Dairy. Hosted by our head brewer and a cheesemonger, with tasting notes and pairing logic explained for each match. One of our most popular recurring events — sells out fast.',
    price: '£28 / person',
    spaces: '4 spaces left',
    cta: 'Book Now →',
  },
  {
    day: '12',
    month: 'APR 2025',
    name: 'Northern Collective Tap Takeover',
    description: 'We hand over four of our six taps to other independent Northern craft breweries for a single Saturday evening. Free to enter, no booking required. A chance to try something new, discover breweries you might not know, and join a room full of people who take beer as seriously as we do.',
    price: 'Free Entry',
    spaces: null,
    cta: 'Add to Calendar →',
  },
]
```

---

## Sección 8: Merch

```tsx
// Background: bg-[hsl(var(--background))]
// Padding: py-24
// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

// Label: "THE SHOP"
// Source Sans 3 300 text-xs tracking-[0.4em] uppercase text-[hsl(var(--primary))] mb-4

// Heading: "Take it home."
// Playfair Display 700 text-5xl text-[hsl(var(--foreground))] mb-12

// Grid: grid grid-cols-1 md:grid-cols-3 gap-6

// MERCH CARD COMPONENT:
// bg-[hsl(var(--card))] rounded-xl overflow-hidden
// border border-[hsl(var(--border))]
// hover:border-[hsl(var(--primary)/0.4)] transition-colors
// group cursor-pointer

// Image container: h-56 overflow-hidden
//   img: w-full h-full object-cover
//   group-hover:scale-105 transition-transform duration-500 ease-out

// Card body: p-6
//   Product name: Playfair Display 700 text-xl text-[hsl(var(--foreground))] mb-1
//   Price: Source Sans 3 400 text-[hsl(var(--primary))] text-sm mb-3
//   Description: Source Sans 3 300 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed

// "Add to Bag →" link:
// Source Sans 3 400 text-sm text-[hsl(var(--primary))]
// hover:underline mt-4 inline-flex items-center gap-1

const merch = [
  {
    name: 'Mixed Case — 12 Cans',
    price: '£32',
    description: 'Two cans of each of our six core beers — the ideal introduction to the full Forge & Grain range. Arrives in a branded gift-ready box. Delivery included on orders over £30.',
    imageAlt: 'Forge & Grain 12-can mixed case',
    // Image: 12-can craft beer mixed case box with amber label design displaying Forge & Grain brewery branding, arranged on dark weathered wooden surface, warm product photography with natural side lighting
  },
  {
    name: 'Forge & Grain Pint Glasses — Set of 2',
    price: '£14',
    description: 'Our core pint glass with the Forge & Grain logo etched near the base. Dishwasher safe, nucleated for a better head. Available in classic pint and conical shapes.',
    imageAlt: 'Forge & Grain branded pint glasses',
    // Image: pair of branded craft beer pint glasses with Forge & Grain logo etched near the base, one filled with amber ale showing perfect foam head, dark moody background, lifestyle product photography
  },
  {
    name: 'Forge & Grain Hoodie',
    price: '£45',
    description: 'Heavyweight charcoal hoodie with amber embroidered logo on the chest. 350gsm cotton blend. Sizes S–3XL. The hoodie we wear ourselves.',
    imageAlt: 'Forge & Grain branded hoodie',
    // Image: dark charcoal heavyweight hoodie with small Forge & Grain amber embroidery on the left chest, folded neatly on dark surface, minimal flat-lay product photography, one corner of the embroidery detail visible
  },
]
```

---

## Sección 9: Visita + Dirección

```tsx
// Background: bg-[hsl(var(--card))]
// Padding: py-24
// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

// Label: "FIND US"
// Source Sans 3 300 text-xs tracking-[0.4em] uppercase text-[hsl(var(--primary))] mb-4

// Heading: "Find Us."
// Playfair Display 700 text-5xl text-[hsl(var(--foreground))] mb-12

// Grid: grid grid-cols-1 lg:grid-cols-2 gap-12

// LEFT — Visit Info:

// Address block (mb-8):
//   "ADDRESS" — Source Sans 3 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--primary))] mb-3
//   "12 Forge Street" — Source Sans 3 300 text-base text-[hsl(var(--foreground)/0.8)]
//   "Sheffield S3 8LR" — same style

// Getting Here block (mb-8):
//   "GETTING HERE" — Source Sans 3 300 text-xs tracking-[0.3em] uppercase text-[hsl(var(--primary))] mb-3
//   ul space-y-2:
//   "🚊 Tram: Cathedral stop, 8 min walk"
//   "🚌 Bus: Routes 7, 8, 52 — Moorfoot stop"
//   "🅿️ Moorfoot multi-storey, 5 min walk"
//   Source Sans 3 300 text-sm text-[hsl(var(--muted-foreground))]

// Amenity pills (flex flex-wrap gap-3 mb-8):
// Each pill: bg-[hsl(var(--background))] border border-[hsl(var(--border))]
//   Source Sans 3 300 text-xs px-3 py-1.5 text-[hsl(var(--muted-foreground))] rounded-full
// "Dog friendly ✓" | "Wheelchair accessible ✓" | "Card payments only ✓" | "Outdoor seating ✓"

// Note (Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground))] italic):
// "Please note: we are a cashless venue. Card or contactless only at the bar."

// RIGHT — Map placeholder:
// h-80 lg:h-full min-h-[320px] rounded-xl overflow-hidden
// bg-[hsl(var(--background))] border border-[hsl(var(--border))]
// flex flex-col items-center justify-center gap-4
//
// MapPin icon: w-10 h-10 text-[hsl(var(--primary))]
// Address: Playfair Display 700 text-lg text-[hsl(var(--foreground))] text-center
//   "12 Forge Street" / "Sheffield S3 8LR"
// "Get directions on Google Maps →"
//   Source Sans 3 300 text-sm text-[hsl(var(--primary))] hover:underline cursor-pointer
// Comment in JSX: {/* Replace with <iframe> Google Maps embed for production */}
```

---

## Sección 10: Pie de página

```tsx
// Background: bg-[hsl(var(--background))]
// Border top: border-t border-[hsl(var(--border))]
// Padding: py-16

// Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
// Grid: grid grid-cols-1 md:grid-cols-3 gap-12

// Column 1 — Logo + mission statement:
// Logo (same structure as navbar: hop SVG + FORGE & GRAIN + BREWING CO.)
// "Brewed with purpose. Poured with pride."
//   Source Sans 3 300 text-sm text-[hsl(var(--muted-foreground))] mt-4
// "Small batch. Sheffield made. Since 2018."
//   Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground)/0.5)] mt-2

// Column 2 — Navigation:
// "NAVIGATE" — label style (text-xs tracking-[0.3em] uppercase text-[hsl(var(--primary))] mb-4)
// Links (nav space-y-2 flex flex-col):
// On Tap | Taproom | Our Story | Events | Merch | Visit Us
// Source Sans 3 300 text-sm text-[hsl(var(--muted-foreground))]
// hover:text-[hsl(var(--foreground))] transition-colors

// Column 3 — Contact + socials:
// "FIND US" — label
// "12 Forge Street, Sheffield S3 8LR"
//   Source Sans 3 300 text-sm text-[hsl(var(--muted-foreground))]
// Hours summary (mt-2 Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground))] leading-relaxed):
// "Tue–Thu 4–10pm  ·  Fri 3–11pm  ·  Sat 12–11pm  ·  Sun 12–8pm  ·  Mon Closed"
//
// Socials row (flex gap-4 mt-4):
// Instagram, ExternalLink (Untappd placeholder), Facebook
// All: text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors
// Icons: w-5 h-5

// Footer bottom bar:
// mt-12 pt-8 border-t border-[hsl(var(--border))]
// flex flex-col sm:flex-row sm:justify-between gap-2
// "© 2025 Forge & Grain Brewing Co. All rights reserved."
//   Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground))]
// "Independently owned. Never compromised."
//   Source Sans 3 300 text-xs text-[hsl(var(--muted-foreground)/0.5)] italic
```

---

## AplicaciónEstructura

```
src/
├── App.tsx
├── main.tsx
├── index.css                # CSS variables, flip card styles, font import
├── components/
│   ├── Navbar.tsx           # Fixed header with mobile menu
│   ├── HeroSection.tsx      # Split layout, amber pour bar animation
│   ├── OnTapSection.tsx     # 6 × 3D flip beer cards
│   ├── TaproomSection.tsx   # Split layout with opening hours table
│   ├── OurStorySection.tsx  # Pull quote, story copy, founders image
│   ├── BrewingProcess.tsx   # 3-step horizontal with connector line
│   ├── EventsSection.tsx    # 3 event rows with date column + CTA
│   ├── MerchSection.tsx     # 3 product cards with hover zoom
│   ├── VisitSection.tsx     # Address, transport, amenity pills, map
│   └── Footer.tsx           # 3-column grid + bottom bar
└── components/ui/           # shadcn/ui components (if used)
```

---

## Índice completo.css

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Sans+3:wght@300;400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 30 7% 7%;
    --foreground: 40 70% 87%;
    --primary: 32 62% 47%;
    --primary-foreground: 30 7% 7%;
    --secondary: 30 68% 31%;
    --card: 30 7% 11%;
    --card-foreground: 40 70% 87%;
    --muted-foreground: 40 20% 55%;
    --border: 30 10% 18%;
    --muted: 30 7% 9%;
  }

  * {
    border-color: hsl(var(--border));
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans 3', sans-serif;
    font-weight: 300;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    font-family: 'Playfair Display', serif;
  }
}

/* ─── Flip card CSS ─── */
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Mobile: tap to flip via JS toggle — add .is-flipped class */
.flip-card.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}
```

---

## Configuración Comandos

```bash
npm create vite@latest forge-and-grain -- --template react-ts
cd forge-and-grain
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn-ui@latest init
npm install motion
npm install lucide-react
```

---

## Notas clave de implementación

1. **Flip Cards en dispositivos móviles**: Los estados CSS `hover:` no se activan en dispositivos táctiles. Para dispositivos móviles, agregue un estado de alternancia `onClick` en React que agregue la clase `.is-flipped` (definida en el CSS anterior), o agregue una pequeña etiqueta de instrucción "Toque para revelar" en la cara frontal. El enfoque de clase `.is-flipped` ya está definido en el CSS; solo necesita conectarlo con `useState` y `onClick` en el componente. Se recomienda marcar `window.matchMedia('(hover: none)')` para habilitar condicionalmente el comportamiento de giro táctil.

2. **Barra de vertido ámbar**: la animación Framer Motion `initial={{ width: '0%' }} animate={{ width: '100%' }}` requiere que el contenedor principal tenga un ancho definido (no "automático"). Asegúrese de que el div principal tenga "w-full" aplicado explícitamente. El contenedor "oculto por desbordamiento" que se encuentra arriba es esencial; sin él, la barra parecerá comenzar desde el borde izquierdo de la ventana gráfica en lugar del límite del componente. La barra debe ser visualmente sutil: es una animación ambiental, no un indicador de progreso.

3. **Fondos oscuros**: El `--background` en HSL `30 7% 7%` es muy oscuro pero no negro puro; tiene un ligero matiz marrón cálido que hace referencia a la estética de la cervecería. Nunca reemplace con `#000000` o `hsl(0 0% 0%)`. La calidez es portadora de la identidad. De manera similar, el fondo de la tarjeta en "30 7% 11%" está intencionalmente cerca del fondo base: la alternancia de secciones es un susurro, no un grito.

4. **Source Sans 3 frente a Source Sans Pro**: Google Fonts ha cambiado el nombre de la familia de fuentes. Utilice `Source+Sans+3` en la URL de importación y ``Source Sans 3'' en CSS `font-family`. Se importan los pesos "300" y "400". Utilice "300" (ligero) para el cuerpo del texto, descripciones y notas de cata. Utilice `400` (normal) para precios, etiquetas de CTA, texto de insignia y cualquier cosa con la que se espera que interactúe el usuario.

5. **Playfair Display 900**: el título destacado utiliza "peso de fuente: 900" (Playfair Display Black). Este es el peso más pesado disponible y crea el máximo contraste entre el títuloy el cuerpo del texto. La variante en cursiva se utiliza en la cita extraída (Nuestra historia) y en los encabezados de los pasos (Proceso de preparación); asegúrese de que la importación de Google Fonts incluya `ital,wght@0,700;0,900;1,700` para acceder al corte en cursiva.

6. **Diseño de la sección de eventos**: en pantallas muy pequeñas, la columna de fecha y la columna de detalles se apilan verticalmente. La fecha debería aparecer primero (arriba del título) en el móvil. Utilice `flex-col sm:flex-row` para controlar esto. En dispositivos móviles, el botón CTA debe ocupar todo el ancho debajo de la descripción del evento: agregue `w-full sm:w-auto` a la clase del botón y `sm:ml-auto` solo en `sm:` breakpoint.

7. **Zoom de imagen de mercadería**: el efecto `group-hover:scale-105` en la imagen del producto requiere `group` en el envoltorio de la tarjeta principal y `overflow-hidden` en el contenedor de la imagen; sin `overflow-hidden`, la imagen escalada se desangrará fuera de sus límites. La `transición-transformación duración-500 facilidad de salida` proporciona un zoom suave y pausado que se lee como premium en lugar de ágil.

8. **Importación de Framer Motion**: este mensaje utiliza Framer Motion a través del paquete `motion/react` (versión 11+). Importar como `import { motion } from 'motion/react'`, no como `import { motion } from 'framer-motion'`. Ambos funcionan, pero `motion/react` es la importación correcta para el nombre del paquete actual después del cambio de marca de Motion.

9. **Uso de shadcn/ui**: este diseño se personaliza principalmente utilizando las clases de utilidad Tailwind. El init shadcn/ui se incluye en la configuración del andamio de variables CSS que proporciona. Opcionalmente se pueden agregar componentes shadcn individuales (botón, tarjeta, etc.), pero no son necesarios para este diseño; las clases personalizadas cubren todo lo necesario.

10. **Destinos de desplazamiento de sección**: agregue atributos `id` a cada contenedor de sección para permitir un desplazamiento fluido desde los enlaces de la barra de navegación. ID recomendados: `#on-tap`, `#taproom`, `#our-story`, `#events`, `#visit`. Aplique `scroll-behavior: smooth` a `html` en `index.css` o use `scrollIntoView({ behavior: 'smooth' })` en los controladores de clic de navegación.

11. **Accesibilidad**: Todas las tarjetas interactivas deben incluir `role="button"` y `tabIndex={0}` con manejo `onKeyDown` para que Intro/Espacio active el giro a través del teclado. La barra de vertido de color ámbar es puramente decorativa: agregue `aria-hidden="true"` para que los lectores de pantalla se la salten. Todas las imágenes deben tener texto "alt" significativo.(proporcionado en línea en cada sección anterior). El horario de apertura debe utilizar un elemento `<table>` con `<caption>` para mayor corrección semántica si la accesibilidad es una prioridad.

12. **Rendimiento**: La importación de Google Fonts carga dos familias, cada una con dos pesos. Para producción, considere alojar fuentes localmente con `@font-face` usando el formato WOFF2 para eliminar la solicitud de terceros y mejorar las puntuaciones CLS. La animación CSS de la tarjeta invertida se acelera mediante GPU mediante "transformación" y "visibilidad de la cara posterior": no provocará cambios en el diseño incluso a 60 fps en dispositivos de bajo consumo. ` whileInView` de Framer Motion utiliza `IntersectionObserver` internamente, que es eficiente y no realiza encuestas. 

---

## Niche Fit Notes

Este diseño está calibrado específicamente para cervecerías artesanales independientes de lotes pequeños con una taberna física. El tono de la copia es directo y del norte de Inglaterra: confiado sin ser jactancioso, informado sin ser esnob. La línea "sin contraseña de Wi-Fi" en la sección de taberna y la línea "no indecisos" en la nota de cata de Copper Run IPA son ejemplos de esta voz: señalan a una cervecería que sabe exactamente quién es y no necesita demostrar credibilidad artesanal porque tiene el oficio real. Si adapta este mensaje para una cervecería diferente, mantenga la franqueza del texto y evite suavizar las líneas que tienen un punto de vista; esa especificidad es lo que hace que el sitio parezca un lugar real en lugar de una plantilla.
