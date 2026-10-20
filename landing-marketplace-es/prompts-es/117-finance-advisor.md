# Vance Advisory — Aviso del sitio web del asesor de finanzas personales
## Para Lovable, Bolt, v0, Claude, Cursor

---

## 1. DECLARACIÓN DEL OBJETIVO

Cree un sitio web completo y listo para producción de una sola página para **Vance Advisory**, una empresa de finanzas personales independiente firma de asesoría: estética premium de color azul marino profundo y oro cálido, verdadero héroe dividido, nueve secciones completamente especificadas, todas las copias escritas, todas las animaciones exactas, React + Vite + TypeScript + Tailwind CSS + Framer Motion + shadcn/ui.

---

## 2. TECH STACK

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** (JIT, configuración personalizada que extiende los tokens de diseño a continuación)
- **Framer Motion** importado como `motion/react`: use `motion.div`, `AnimatePresence`, `useInView`, `useMotionValue`, `useTransform`
- **shadcn/ui** solo para entradas de formulario y primitivas de botones
- **lucide-react** para todos los iconos
- Google Fonts cargado a través de `<link>` en `index.html`

---

## 3. SISTEMA DE DISEÑO: PROPIEDADES PERSONALIZADAS DE CSS

Coloque todos los tokens en `src/index.css` dentro de `:root`:

```css
:root {
  /* Brand colours */
  --color-navy:        hsl(210, 52%, 10%);   /* #0d1b2a — deep background */
  --color-navy-mid:    hsl(210, 50%, 14%);   /* #112236 — section variant */
  --color-navy-card:   hsl(210, 48%, 12%);   /* #0f1e30 — card bg */
  --color-gold:        hsl(38, 49%, 57%);    /* #c9a85a — primary accent */
  --color-gold-muted:  hsl(38, 40%, 52%);    /* hover variant */
  --color-white-warm:  hsl(40, 27%, 96%);    /* #f8f6f2 — body text on dark */
  --color-white-soft:  hsl(40, 20%, 88%);    /* secondary text */

  /* Opacity utilities */
  --text-mid:   rgba(248, 246, 242, 0.7);
  --text-low:   rgba(248, 246, 242, 0.5);
  --text-dim:   rgba(248, 246, 242, 0.3);
  --text-hint:  rgba(248, 246, 242, 0.4);

  /* Spacing scale */
  --space-section: clamp(64px, 8vw, 128px);

  /* Borders */
  --border-gold:       1px solid rgba(201, 168, 90, 0.35);
  --border-gold-heavy: 1px solid rgba(201, 168, 90, 0.7);
  --border-radius: 0px;  /* Entire site uses 0px border-radius */

  /* Shadows */
  --shadow-card:  0 4px 24px rgba(201, 168, 90, 0.12);
  --shadow-hover: 0 4px 24px rgba(201, 168, 90, 0.22);
  --shadow-glow:  0 0 40px rgba(201, 168, 90, 0.08);
}
```

Extend `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      navy:       'hsl(210 52% 10%)',
      'navy-mid': 'hsl(210 50% 14%)',
      'navy-card':'hsl(210 48% 12%)',
      gold:       'hsl(38 49% 57%)',
      'gold-muted':'hsl(38 40% 52%)',
      warm:       'hsl(40 27% 96%)',
    },
    fontFamily: {
      serif:  ['"DM Serif Display"', 'Georgia', 'serif'],
      sans:   ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
    },
  },
}
```

---

## 4. TYPOGRAPHY

Agregue este `<link>` a `index.html` `<head>`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap"
  rel="stylesheet"
/>
```

**Uso de tipografía:**

| Elemento | Fuente | Peso | Tamaño | Color |
|--------------------------|--------------------|--------|-------------------------------|--------------------|
| Héroe H1 | Pantalla DM Serif | 700 | `clamp(38px, 5.5vw, 96px)` | `var(--color-white-warm)` |
| Títulos de sección (H2) | Pantalla DM Serif | 700 | `clamp(28px, 3.5vw, 56px)` | `var(--color-white-warm)` |
| Encabezados de tarjetas (H3) | Pantalla DM Serif | 700 | 20px | `var(--color-white-warm)` |
| Citas testimoniales | Pantalla DM Serif | cursiva | 18 píxeles | `var(--color-white-warm)` |
| Texto del cuerpo | Plus Yakarta Sans | 300 | 16px / altura de línea 1.7 | `var(--text-mid)` |
| Pequeños / subtítulos | Plus Yakarta Sans | 300 |13–14 píxeles | `var(--text-low)` |
| CTA / etiquetas | Plus Yakarta Sans | 600 | 14–15 píxeles | varía |
| Números de estadísticas | Pantalla DM Serif | 700 | 56px (franja de confianza) / 36px (héroe) | `var(--color-gold)` |
| Etiquetas de estadísticas | Plus Yakarta Sans | 300 | 12–14 píxeles | `var(--text-low)` |
| Números de paso (bg) | Pantalla DM Serif | 700 | 100px | oro al 6% de opacidad |
| Marca de agua | Pantalla DM Serif | 700 | `clamp(180px, 26vw, 420px)` | oro al 2% de opacidad |
| Enlaces de navegación | Plus Yakarta Sans | 400 | 14 píxeles | `var(--text-mid)` |
| Cuerpo del pie de página | Plus Yakarta Sans | 300 | 14px | `var(--text-low)` |
| Texto reglamentario | Plus Yakarta Sans | 300 | 11 píxeles | `var(--text-dim)` |

---

## 5. EFECTOS VISUALES

### Efecto 1: Desvanecimiento de degradado de héroe dividido
El panel izquierdo del héroe (48% de ancho) utiliza un `fondo` que es puro `var(--color-navy)`. El panel derecho (52%) contiene la foto. Entre ellos, aplique un `<div>` en posición absoluta encima de la unión, con un ancho de 200 px, usando: 
```css
background: linear-gradient(
  to right,
  rgba(13,27,42,1) 0%,
  rgba(13,27,42,0.95) 55%,
  rgba(13,27,42,0.5) 80%,
  transparent 100%
);
```
. Este sangrado se extiende desde el borde izquierdo del panel hacia la foto; el texto siempre es legible independientemente de la composición de la foto.

### Efecto 2: Fondo "VANCE" Marca de agua
En el panel derecho del héroe (detrás del degradado de la foto), renderice un `<span>` en posición absoluta que contenga el texto "VANCE" en DM Serif Display en `clamp(180px, 26vw, 420px)`, color `var(--color-gold)` en `opacidad: 0.02`, `pointer-events: none`, `user-select: none`, `z-index: 0`. Posición: centrado verticalmente, alineado horizontalmente a la derecha con "derecha: -2%". Esto crea una sutil marca de marca visible a través de la cola transparente del degradado en el escritorio.

### Efecto 3: Borde dorado que brilla en las tarjetas
Atodas las tarjetas de servicio y de blog comienzan con `border: 1px solid rgba(201,168,90,0.30)`. Al pasar el mouse, realice una transición de 0,25 s con facilidad a `border: 2px solid rgba(201,168,90,0.75)` + `box-shadow: 0 4px 24px rgba(201,168,90,0.22)`. Utilice transición CSS, no movimiento: esto mantiene el desplazamiento instantáneo ysnappy.

### Efecto 4: Revelación de borde de barra de navegación fija
Al desplazarse más allá de 60 px, la barra de navegación obtiene `border-bottom: 0.5px solid rgba(201,168,90,0.40)` a través de un detector de desplazamiento JS que alterna una clase "desplazada". Transición: `facilidad de color de borde 0,4 s`. Por encima de 60 píxeles: borde transparente.

### Efecto 5: Desenfoque de entrada de sección-Fade
Hero, el título, el subtítulo y las CTA se animan desde `filter: blur(10px); opacity: 0; transform: translateY(30px)` a valores borrados. Esto utiliza Framer Motion `inicial`/`animate` en los elementos del héroe. Tiempos exactos en la Sección 7.

---

## 6. DESGLOSE DE COMPONENTES

---

### Sección 1 — Barra de navegación (`src/components/Navbar.tsx`)

**Diseño:** Barra adhesiva de ancho completo, `position: sticky; top: 0; z-index: 50`. Antecedentes: `var(--color-navy)`. Alto: 72px escritorio / 60px móvil. Contenedor interior: `max-w-7xl mx-auto px-6 flex items-center justify-between`.

**Logotipo (izquierda):**
```jsx
<span className="font-serif text-gold text-xl tracking-tight">Vance Advisory</span>
```

**Enlaces de navegación (centro, ocultos en móvil):**
```jsx
<nav className="hidden md:flex items-center gap-8">
  {['Services', 'How It Works', 'About', 'Resources', 'Contact'].map(link => (
    <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`}
       className="font-sans font-normal text-sm text-warm/70 hover:text-gold transition-colors duration-200">
      {link}
    </a>
  ))}
</nav>
```

**Botón CTA (derecha):**
```jsx
<button className="hidden md:block bg-gold text-navy font-sans font-semibold text-sm px-5 py-2.5
                   border-radius-0 hover:bg-gold-muted transition-colors duration-200">
  Free Consultation
</button>
```

**Comportamiento de desplazamiento:** Agregue `useEffect` con `window.addEventListener('scroll', ...)`. En el desplazamiento Y > 60px, cambie la clase `border-b border-gold/40`. Por debajo de 60 px: `borde-b borde-transparente`. Transición en el color del borde: `transition: border-color 0.4s facilidad`.

**Hamburguesa móvil:** Debajo del punto de interrupción `md`, muestra un botón con el ícono `Menú` (lucide) que abre un menú móvil de pantalla completa (`fixed inset-0 bg-navy z-50`) con enlaces de navegación apilados y el botón CTA. Botón Cerrar en la parte superior derecha.

---

### Sección 2: Hero (`src/components/Hero.tsx`)

**Contenedor exterior:** `min-h-screen flex` (sin restricción de ancho máximo: sangrado completo). `background: var(--color-navy)`.

**Panel izquierdo (contenido):**
- Ancho: `w-[48%]` en escritorio, `w-full` en dispositivos móviles
- Fondo: `var(--color-navy)`
- Relleno: `pt-32 pb-20 pl-[max(24px,calc((100vw-1280px)/2+48px))] pr-12`
- `position: relative; z-index: 10`

**Panel derecho (foto):**
- Ancho: `w-[52%]` en escritorio, `w-full h-[60vw]` en dispositivos móviles (la foto aparece encima del contenido en dispositivos móviles)
- `position: relative; overflow: hidden`

Dentro del panel derecho:
```jsx
{/* Image: Two professionals reviewing financial documents at a premium dark-wood desk.
    Large floor-to-ceiling windows behind them reveal a blurred city skyline.
    Warm afternoon golden-hour light falls across the papers and their hands.
    One person (advisor, 40s, male, navy suit) points to a graph. Client (female, 40s,
    attentive, cream blouse) leans forward. Understated wealth. Shallow depth of field.
    Shot on 85mm, editorial lifestyle photography style. */}
<img src="" alt="Independent financial advisor James Vance consulting with a client over a financial plan"
     className="w-full h-full object-cover object-center" />
```

**División de superposición de degradado (en el panel derecho, absolutamente posicionado):**
```jsx
<div className="absolute inset-0 pointer-events-none"
     style={{background: 'linear-gradient(to right, rgba(13,27,42,1) 0%, rgba(13,27,42,0.92) 30%, rgba(13,27,42,0.5) 60%, transparent 100%)'}}>
</div>
```

**Marca de agua (dentro del panel derecho,detrás del gradiente):**
```jsx
<span className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-serif pointer-events-none select-none z-0"
      style={{fontSize:'clamp(180px,26vw,420px)', color:'var(--color-gold)', opacity:0.02, lineHeight:1}}>
  VANCE
</span>
```

**Contenido dentro del panel izquierdo (en orden, cada uno es `motion.div`):**

```
[Eyebrow chip]
"INDEPENDENT FINANCIAL ADVICE" — Plus Jakarta 600, 11px, letter-spacing 0.15em,
color gold, with 1px gold border, 0px radius, inline-flex, px-3 py-1

[H1]
"Your Financial Future,
Clarified."
DM Serif Display 700, clamp(38px,5.5vw,96px), warm white, line-height 1.05
Two lines via <br /> between "Future," and "Clarified."

[Subhead]
"Independent financial advice — retirement planning, investments, and protection
for individuals and families."
Plus Jakarta Sans 300, 18px, var(--text-mid), max-width 480px, line-height 1.6

[CTA row]
<div className="flex flex-wrap gap-4 mt-8">
  <button className="bg-gold text-navy font-sans font-semibold text-sm px-7 py-3.5
                     hover:bg-gold-muted transition-colors duration-200">
    Book a Free Consultation
  </button>
  <button className="border border-gold/60 text-gold font-sans font-semibold text-sm px-7 py-3.5
                     bg-transparent hover:bg-gold/10 transition-colors duration-200">
    View Our Services →
  </button>
</div>

[Stats strip — immediately below CTAs, same panel]
<div className="flex gap-8 mt-10 pt-8 border-t border-gold/20">
  {[
    {stat:'£500M+', label:'Assets Advised'},
    {stat:'200+',   label:'Clients'},
    {stat:'18 Years', label:'Experience'},
  ].map(({stat, label}, i) => (
    <div key={i} className="flex flex-col gap-1">
      <CountUp to={stat} className="font-serif text-gold" style={{fontSize:'36px'}} />
      <span className="font-sans font-light text-xs tracking-wide"
            style={{color:'var(--text-low)'}}>{label}</span>
    </div>
  ))}
</div>
```

**Especificaciones del componente CountUp:** Consulte la Sección 7 para conocer el tiempo de la animación. El componente acepta una cadena "a" que puede contener caracteres no numéricos (£, M+, Años). Analice la parte numérica, anime 0 → objetivo en 2000 ms y luego agregue el sufijo. Para "18 años", anime "0 años" → "18 años".

---

### Sección 3: Servicios (`src/components/Services.tsx`)

**Contenedor:** `id="services"`, `background: var(--color-navy)`, `padding: var(--space-section) 0`.

**Encabezado de sección:**
```
"What We Offer" — eyebrow chip (same style as hero eyebrow, centered)
"Expert Advice Across Every Area of Your Financial Life" — H2, DM Serif 700, clamp(28px,3.5vw,56px), warm white, text-center, max-w-2xl mx-auto
```

**Cuadrícula:** `grid grid-cols-2 gap-6 max-w-5xl mx-auto px-6 mt-14` → móvil: `grid-cols-1`

**4 tarjetas - datos:**

```ts
const services = [
  {
    icon: TrendingUp,
    title: 'Retirement Planning',
    description: 'Understand exactly how much you need, when you can retire, and how to make your money last. We model multiple scenarios so you retire with confidence, not guesswork.',
    link: 'Learn more →',
  },
  {
    icon: BarChart2,
    title: 'Investment Management',
    description: 'Build a diversified portfolio aligned to your goals, timeline, and attitude to risk. Independent advice means we recommend what\'s right for you — not what earns us the highest commission.',
    link: 'Learn more →',
  },
  {
    icon: Shield,
    title: 'Protection Insurance',
    description: 'Ensure your family and income are protected if the unexpected happens. We review the market to find the right level of cover at the right price.',
    link: 'Learn more →',
  },
  {
    icon: FileText,
    title: 'Estate Planning',
    description: 'Minimise inheritance tax and ensure your assets go exactly where you intend. We work alongside solicitors to make sure your wishes are legally protected.',
    link: 'Learn more →',
  },
]
```

**Marcado de tarjeta:**
```jsx
<motion.div
  className="group p-8 flex flex-col gap-5 cursor-pointer"
  style={{
    background: 'var(--color-navy-card)',
    border: '1px solid rgba(201,168,90,0.30)',
    borderRadius: '0px',
    transition: 'border 0.25s ease, box-shadow 0.25s ease',
  }}
  whileHover={{ boxShadow: '0 4px 24px rgba(201,168,90,0.22)' }}
  initial={{opacity:0, y:24}}
  whileInView={{opacity:1, y:0}}
  transition={{duration:0.5, delay: index * 0.1, ease:[0.25,0.46,0.45,0.94]}}
  viewport={{once:true, margin:'-60px'}}
>
  <div className="p-2.5 inline-flex" style={{border:'1px solid rgba(201,168,90,0.30)', width:'fit-content'}}>
    <Icon className="text-gold" size={24} />
  </div>
  <h3 className="font-serif text-warm" style={{fontSize:'20px'}}>{title}</h3>
  <p className="font-sans font-light text-sm leading-relaxed" style={{color:'var(--text-mid)'}}>{description}</p>
  <a href="#contact" className="font-sans font-semibold text-sm text-gold hover:text-gold-muted transition-colors mt-auto">
    {link}
  </a>
</motion.div>
```

CSS corrección de borde flotante: se aplica a través de una clase ya que Framer no hace bordes color:
```css
.service-card:hover {
  border: 2px solid rgba(201,168,90,0.75) !important;
}
```

---

### Sección 4: Cómo funciona (`src/components/HowItWorks.tsx`)

**Contenedor:** `id="how-it-works"`, `background: var(--color-navy-mid)`, `padding: var(--space-section) 0`.

**Encabezado:** Misma ceja + patrón H2, centrado. H2: "Un proceso simple y transparente"

**Diseño de 3 pasos:** `flex flex-row gap-0 max-w-6xl mx-auto px-6 mt-16` → mobile: `flex-col`

Cada paso es un `div` con `flex-1 relativo px-8 pt-4 pb-10`.

**Paso estructura interna:**
```jsx
{/* Background step number */}
<span className="absolute top-0 left-6 font-serif leading-none pointer-events-none select-none z-0"
      style={{fontSize:'100px', color:'var(--color-gold)', opacity:0.06}}>
  {stepNumber}  {/* "01", "02", "03" */}
</span>

{/* Gold circle marker */}
<div className="relative z-10 w-8 h-8 border-2 border-gold flex items-center justify-center mb-6">
  <div className="w-2 h-2 bg-gold rounded-full" />
</div>

{/* Connecting line between steps (not on last) */}
{/* position: absolute, top: 16px (center of circle), left: calc(100% - ...),
    right: ..., height: 1px, bg: gold at 20% opacity */}

<h3 className="font-serif text-warm mb-4" style={{fontSize:'22px'}}>{stepTitle}</h3>
<p className="font-sans font-light text-sm leading-relaxed" style={{color:'var(--text-mid)', maxWidth:'300px'}}>
  {stepBody}
</p>
```

**Datos del paso:**
```ts
const steps = [
  {
    number: '01',
    title: 'Free Initial Consultation',
    body: 'We spend 30 minutes understanding your goals, current situation, and what\'s keeping you up at night — no commitment required.',
  },
  {
    number: '02',
    title: 'Your Personalised Plan',
    body: 'We research, model, and build a financial strategy tailored precisely to your situation — not a generic off-the-shelf product.',
  },
  {
    number: '03',
    title: 'Ongoing Partnership',
    body: 'Life changes. We review your plan regularly and adapt it as your circumstances evolve.',
  },
]
```

**Línea de conexión entre los pasos:** `position: absolute; top: 19px; left: calc(32px + 1rem); right: 0; height: 1px; background: rgba(201,168,90,0.2)`: solo se representa entre los pasos 1–2 y 2–3 (no después del paso 3).

Animación: ` whileInView` tambaleo 0,15 s, `initial={{opacity:0,y:24}}`, `animate={{opacity:1,y:0}}`, `duración: 0,55 s`.

---

### Sección 5: Métricas de confianza (`src/components/TrustMetrics.tsx`)

**Contenedor:** Sangrado completo, `background: var(--color-navy-mid)`, `relleno: 64px 0`. Sección estrecha: sin encabezado.

**Diseño interno:** `max-w-6xl mx-auto px-6 grid grid-cols-4 gap-8 text-center` → móvil: `grid-cols-2 gap-y-10`.

**4 métricas:**
```ts
const metrics = [
  { value: 500, prefix: '£', suffix: 'M+', label: 'Assets Advised' },
  { value: 200, prefix: '',  suffix: '+',  label: 'Clients' },
  { value: 18,  prefix: '',  suffix: '',   label: 'Years Experience' },
  { value: null, display: 'FCA', suffix: '', label: 'Regulated' },  // static, no count-up
]
```

**Cada celda de métrica:**
```jsx
<div className="flex flex-col items-center gap-2">
  <span ref={countRef} className="font-serif text-gold" style={{fontSize:'56px', lineHeight:1}}>
    {/* Count-up renders here */}
  </span>
  <span className="font-sans font-light text-sm tracking-wide uppercase"
        style={{color:'var(--text-low)', letterSpacing:'0.1em'}}>{label}</span>
</div>
```

**Implementación de conteo:** Utilice `IntersectionObserver` en el contenedor de secciones.Cuando `isIntersecting`, inicie el ciclo `requestAnimationFrame` para cada métrica. Duración 2000ms. Flexibilización: `easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)`. "FCA Regulated" es estático, sin animación.

Divisores verticales finos de 1px de oro/20% entre celdas en el escritorio usando `divide-x divide-gold/20`.

---

### Sección 6: Acerca de James Vance (`src/components/About.tsx`)

**Contenedor:** `id="about"`, `background: var(--color-navy)`, `padding: var(--space-section) 0`.

**Diseño:** `max-w-7xl mx-auto flex flex-row` — `w-[50%]` cada panel. Móvil: `flex-col`.

**Panel izquierdo — foto vertical:**
```jsx
{/* Image: Professional portrait of a male financial advisor in his mid-40s.
    He wears a well-tailored navy-blue suit with a subtle white shirt.
    Confident, warm, approachable expression — slight smile, direct eye contact.
    Neutral premium background (warm grey/charcoal), soft natural light from the left.
    Corporate editorial photography style. Shot on 85mm, shallow depth of field.
    The subject conveys trustworthiness and calm authority, not corporate coldness. */}
<img src="" alt="James Vance, Chartered Financial Planner and founder of Vance Advisory"
     className="w-full h-full object-cover object-center" style={{minHeight:'560px'}} />
```

**Panel derecho — editorial biografía:**
`padding: 64px 56px; position: relative; border-left: 3px solid var(--color-gold)`.

```
[Eyebrow chip] "ABOUT US"

[H2] "Independent Advice.
     No Conflicts. No Compromises."
DM Serif Display 700, clamp(26px,3vw,44px), warm white, line-height 1.1

[Body — 2 paragraphs, Plus Jakarta 300, 16px, var(--text-mid), line-height 1.75]

Paragraph 1:
"James Vance has been helping families and individuals build financial security for over
18 years. After a decade at Merrill Lynch, he founded Vance Advisory in 2006 to offer
genuinely independent advice — without commission bias or corporate targets."

Paragraph 2:
"Today, James advises clients across retirement planning, investment management, and
estate planning. He holds the Chartered Financial Planner designation and is a Fellow
of the Chartered Insurance Institute."

[Credentials — flex-wrap gap-2 mt-8]
Each badge: inline-flex, px-3 py-1.5, border: 1px solid rgba(201,168,90,0.5),
font-sans 600 text-xs text-gold, 0px radius, tracking-wide.

Badges:
"FCA Authorised"
"Chartered Financial Planner"
"PFS Member"
"CII Fellow"
```

Animación: texto del panel derecho ` whileInView`, `initial={{opacity:0,x:40}}`, `animate={{opacity:1,x:0}}`, `duración: 0,65 s, facilidad:[0.25,0.46,0.45,0.94]`.

---

### Sección 7 — Testimonios (`src/components/Testimonials.tsx`)

**Contenedor:** `id="testimonials"`, `background: var(--color-navy-mid)`, `padding: var(--space-section) 0`.

**Encabezado:** Centrado, H2: "Lo que dicen nuestros clientes"

**Grid:** `grid grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mt-14` → móvil: `grid-cols-1`

**3 testimonios:**
```ts
const testimonials = [
  {
    quote: '"Working with James gave me clarity I didn\'t think was possible. I finally understand my pension and know exactly when I can retire."',
    attribution: '— David M., 52, Business Owner',
  },
  {
    quote: '"James helped us navigate a complex inheritance situation. His advice saved us a significant amount in tax and gave us real peace of mind."',
    attribution: '— Sarah & Tom K., 40s, Professional Couple',
  },
  {
    quote: '"I\'d put off sorting my finances for years. One conversation with James and I had a clear plan. Wish I\'d done it sooner."',
    attribution: '— Rachel P., 38, Freelance Consultant',
  },
]
```

**Tarjeta marcado:**
```jsx
<motion.div
  className="p-8 flex flex-col gap-6"
  style={{
    background: 'var(--color-navy-card)',
    borderLeft: '3px solid var(--color-gold)',
    borderTop: '1px solid rgba(201,168,90,0.25)',
    borderRight: '1px solid rgba(201,168,90,0.25)',
    borderBottom: '1px solid rgba(201,168,90,0.25)',
    borderRadius: '0px',
  }}
  initial={{opacity:0, y:20}}
  whileInView={{opacity:1, y:0}}
  transition={{duration:0.5, delay: index * 0.12, ease:[0.25,0.46,0.45,0.94]}}
  viewport={{once:true, margin:'-50px'}}
>
  {/* 5 gold stars */}
  <div className="flex gap-1">
    {[...Array(5)].map((_,i) => <Star key={i} size={14} className="text-gold fill-gold" />)}
  </div>

  <blockquote className="font-serif italic text-warm leading-relaxed" style={{fontSize:'18px'}}>
    {quote}
  </blockquote>

  <p className="font-sans font-light text-sm mt-auto" style={{color:'var(--text-low)'}}>
    {attribution}
  </p>
</motion.div>
```

---

### Sección 8: Recursos/Avance del blog (`src/components/Resources.tsx`)

**Contenedor:** `id="resources"`, `background: var(--color-navy)`, `padding: var(--space-section) 0`.

**Encabezado:** Ceja "RECURSOS" + H2 "Información para ayudarle a tomar mejores decisiones financieras"

**Grid:** `grid grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mt-14` → móvil: `grid-cols-1`

**3 artículos:**
```ts
const articles = [
  {
    category: 'Retirement',
    title: 'How Much Do You Really Need to Retire?',
    date: 'March 2025',
    imageDesc: 'Older couple walking on a sunlit coastal path, relaxed and happy, lifestyle photography, warm golden hour light, blurred background, shallow DOF, editorial style',
    imageAlt: 'A retired couple enjoying financial freedom on a coastal walk',
  },
  {
    category: 'Investments',
    title: 'The Case for Independent Financial Advice in 2025',
    date: 'February 2025',
    imageDesc: 'Close-up of financial charts and graphs on a modern laptop screen on a premium desk, warm ambient light, depth of field, neutral editorial photography',
    imageAlt: 'Financial charts and investment data on a laptop screen',
  },
  {
    category: 'Taxes',
    title: '5 Common Investment Mistakes (and How to Avoid Them)',
    date: 'January 2025',
    imageDesc: 'A person reviewing financial documents with a pen and coffee mug on a marble desk, calm and focused, natural window light, lifestyle editorial photography',
    imageAlt: 'Person reviewing investment documents and financial plan',
  },
]
```

**Marcado de tarjeta:**
```jsx
<motion.article
  className="group flex flex-col overflow-hidden cursor-pointer"
  style={{
    background: 'var(--color-navy-card)',
    border: '1px solid rgba(201,168,90,0.25)',
    borderRadius: '0px',
    transition: 'border-color 0.2s ease',
  }}
  initial={{opacity:0, y:20}}
  whileInView={{opacity:1, y:0}}
  transition={{duration:0.5, delay: index * 0.1, ease:[0.25,0.46,0.45,0.94]}}
  viewport={{once:true, margin:'-50px'}}
>
  {/* Photo — fixed aspect ratio container */}
  <div className="relative overflow-hidden" style={{aspectRatio:'16/9'}}>
    {/* Image: [imageDesc from data above] */}
    <img src="" alt={imageAlt}
         className="w-full h-full object-cover object-center
                    group-hover:scale-105 transition-transform duration-700 ease-out" />
    <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(13,27,42,0.5) 0%, transparent 60%)'}} />
  </div>

  <div className="p-6 flex flex-col gap-3 flex-1">
    {/* Category chip */}
    <span className="font-sans font-semibold text-xs tracking-widest text-gold uppercase">
      {category}
    </span>
    <h3 className="font-serif text-warm leading-snug" style={{fontSize:'18px'}}>{title}</h3>
    <p className="font-sans font-light text-xs mt-auto" style={{color:'var(--text-hint)'}}>{date}</p>
    <a href="#" className="font-sans font-semibold text-sm text-gold hover:text-gold-muted
                           transition-colors mt-2 self-start">
      Read →
    </a>
  </div>
</motion.article>
```

O Al pasar el cursor sobre el artículo, el borde se convierte en: `border: 1px solid rgba(201,168,90,0.70)`.

---

### Sección 9: CTA de consulta (`src/components/ConsultationCTA.tsx`)

**Contenedor:** `id="contact"`, `background: var(--color-gold)`, `padding: var(--space-section) 0`.

**Diseño interior:** `max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-6`

**Texto:**
```jsx
<h2 className="font-serif text-navy" style={{fontSize:'clamp(36px,5.5vw,88px)', lineHeight:1.0, fontWeight:700}}>
  Take Control of Your
  Financial Future
</h2>
<p className="font-sans font-light text-navy/75" style={{fontSize:'18px', maxWidth:'480px'}}>
  Book a free 30-minute consultation — no obligation, no sales pressure.
</p>
```

**Formulario:** `max-w-lg w-full text-left mt-4 flex flex-col gap-4`

Todas las entradas: `background: rgba(13,27,42,0.08); border: 1px solid rgba(13,27,42,0.25); padding: 14px 16px; font-family: Plus Jakarta Sans, 300; font-size: 15px; color: var(--color-navy); border-radius: 0px; width: 100%; outline: none;` Enfoque:`border-color: rgba(13,27,42,0.7)`.

```jsx
<input type="text"   placeholder="Your Name"          />
<input type="email"  placeholder="Email Address"       />
<input type="tel"    placeholder="Phone Number"        />
<textarea rows={4}   placeholder="What are you looking to discuss?" style={{resize:'none'}} />

<button type="submit"
  className="w-full bg-navy text-warm font-sans font-semibold text-sm py-4
             hover:bg-navy/90 transition-colors duration-200"
  style={{borderRadius:'0px', letterSpacing:'0.03em'}}>
  Book Free Consultation
</button>
```

Formulario a continuación:
```jsx
<p className="font-sans font-light text-xs text-navy/50 text-center mt-2">
  Your details are kept strictly confidential and will never be shared with third parties.
</p>
```

Animación del formulario: `whileInView initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} duration:0.65s delay:0.2s`.

---

### Sección 10: Pie de página (`src/components/Footer.tsx`)

**Contenedor:** `background: hsl(210,55%,7%)` (un poco más oscuro que el azul marino), `padding: 64px 0 32px`.

**Grid:** `max-w-7xl mx-auto px-6 grid grid-cols-4 gap-12` → móvil: `grid-cols-2 gap-8`

**Columna 1 — Marca:**
```
"Vance Advisory" — DM Serif Display, 20px, gold
"Independent financial advice for individuals and families." — Plus Jakarta 300, 14px, warm/60%

[Social icons row — 24px each, warm/40% hover gold]
LinkedIn icon / Twitter (X) icon
```

**Columna 2 — Servicios:**
```
Heading: "Services" — Plus Jakarta 600, 13px, gold, uppercase, letter-spacing 0.1em
Links (each 14px, Plus Jakarta 300, warm/60%, hover warm):
Retirement Planning
Investment Management
Protection Insurance
Estate Planning
```

**Columna 3 — Recursos:**
```
Heading: "Resources"
Links:
How It Works
About James Vance
Client Testimonials
Free Consultation
Blog
```

**Columna 4 — Contacto:**
```
Heading: "Contact"
Body (Plus Jakarta 300, 14px, warm/60%):
Vance Advisory Limited
14 King William Street
London, EC4N 7BP

hello@vanceadvisory.co.uk
+44 (0)20 7000 1234

FCA Registration: 123456
```

**Divisor + regulatorio:**
```jsx
<div className="max-w-7xl mx-auto px-6 mt-12 pt-8" style={{borderTop:'1px solid rgba(201,168,90,0.15)'}}>
  <p className="font-sans font-light leading-relaxed" style={{fontSize:'11px', color:'var(--text-dim)'}}>
    Vance Advisory is authorised and regulated by the Financial Conduct Authority.
    FCA Registration No. 123456. The value of investments can fall as well as rise.
    Past performance is not a guide to future returns. Vance Advisory Limited is
    registered in England and Wales, Company No. 05891234.
  </p>
  <p className="font-sans font-light mt-3" style={{fontSize:'11px', color:'var(--text-dim)'}}>
    © 2025 Vance Advisory Limited. All rights reserved.
  </p>
</div>
```

---

## 7. ANIMACIONES - ESPECIFICACIONES EXACTAS

### Secuencia de entrada de héroe (Framer Motion `animate` en montaje)

```ts
// Shared easing
const ease = [0.25, 0.46, 0.45, 0.94]

// 1. Eyebrow chip
initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
transition={{ duration: 0.5, delay: 0.1, ease }}

// 2. Hero H1
initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
transition={{ duration: 0.7, delay: 0.2, ease }}

// 3. Hero subhead
initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
transition={{ duration: 0.7, delay: 0.35, ease }}

// 4. CTA row
initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
transition={{ duration: 0.7, delay: 0.5, ease }}

// 5. Stats strip (the containing div)
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5, delay: 0.65 }}
// CountUp animations inside start at delay 0.7s (see below)
```

### Hero Count-Up (tira de estadísticas: £ 500 millones +, 200+, 18 años)

Uuse `setTimeout(startCountUp, 700)` después del montaje (retraso de coincidencia) 0,7s).

```ts
function countUp(
  el: HTMLElement,
  target: number,
  prefix: string,
  suffix: string,
  duration: number = 2000
) {
  const startTime = performance.now()
  function tick(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
    const value = Math.round(eased * target)
    el.textContent = `${prefix}${value}${suffix}`
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// Stagger: start each stat 300ms after the previous
// Stat 1 (£500M+): starts at delay 700ms
// Stat 2 (200+):   starts at delay 1000ms
// Stat 3 (18 Yrs): starts at delay 1300ms
```

Para "£500M+": destino=500, prefijo='£', sufijo='M+'
Para "200+": destino=200, prefijo='', sufijo='+'
Para "18 Años": target=18, prefix='', suffix=' Años'

### Conteo de métricas de confianza (Sección 5)

```ts
// IntersectionObserver triggers when section enters viewport (threshold: 0.3)
// Same easeOutQuart easing: (t) => 1 - Math.pow(1 - t, 4)
// Duration: 2000ms per counter
// Stagger: 0ms (all start simultaneously on section enter)
```

### Tarjetas de servicios (Sección 3)

```ts
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.10, ease: [0.25,0.46,0.45,0.94] }}
viewport={{ once: true, margin: '-60px' }}
```

### Cómo funciona Pasos (Sección 4)

```ts
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.55, delay: index * 0.15, ease: [0.25,0.46,0.45,0.94] }}
viewport={{ once: true, margin: '-60px' }}
```

### Acerca del panel (Sección 6)

```ts
// Left image panel
initial={{ opacity: 0, x: -40 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.65, delay: 0, ease: [0.25,0.46,0.45,0.94] }}
viewport={{ once: true, margin: '-80px' }}

// Right text content
initial={{ opacity: 0, x: 40 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.65, delay: 0.15, ease: [0.25,0.46,0.45,0.94] }}
viewport={{ once: true, margin: '-80px' }}
```

### Testimonios (Sección 7)

```ts
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25,0.46,0.45,0.94] }}
viewport={{ once: true, margin: '-50px' }}
```

### Tarjetas de blog (Sección 8)

```ts
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.10, ease: [0.25,0.46,0.45,0.94] }}
viewport={{ once: true, margin: '-50px' }}
```

### Formulario CTA (Sección 9)

```ts
initial={{ opacity: 0, y: 32 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.65, delay: 0.2, ease: [0.25,0.46,0.45,0.94] }}
viewport={{ once: true, margin: '-80px' }}
```

---

## 8. RESPONSIVO BREAKPOINTS

Todos los puntos de interrupción a través de Tailwind (`sm: 640px`, `md: 768px`, `lg: 1024px`).

### Navbar
- Escritorio (`md+`): enlaces horizontales + botón CTA visible
- Móvil (`<md`): enlaces ocultos, se muestra el icono de hamburguesa `Menú`. Toque para abrir el deslizable `<AnimatePresence>` `motion.div` desde la parte superior (`y: -100% → 0`, `duración: 0,35 s`). Superposición azul marino de pantalla completa. Enlaces apilados con objetivos táctiles de 48 píxeles. Botón de cierre `X` arriba a la derecha.

### Hero
- Escritorio: `flex-row`, contenido `w-[48%]` izquierdo, foto `w-[52%]` derecho.Altura mínima `100vh`.
- Móvil: `flex-col-reverse` — foto en la parte superior (`w-full h-[60vw]`), contenido debajo (`w-full`). El relleno se reduce a `px-5 py-12`. Marca de agua oculta en el móvil (`hidden md:block`). Los botones de CTA se apilan en `flex-col`.
- Tira de estadísticas: en dispositivos móviles, manténgala horizontal pero reduzca el tamaño de fuente. Número de estadística: 28px en dispositivos móviles. Permitir ajuste si es necesario.

### Servicios Grid
- Escritorio: `grid-cols-2`
- Móvil: `grid-cols-1`

### Cómo funciona
- Escritorio: `flex-row`, líneas de conexión horizontales visible
- Móvil: `flex-col`, líneas de conexión ocultas, diseño vertical, alineado a la izquierda

### Trust Metrics
- Escritorio: `grid-cols-4`, divisores verticales
- Móvil: `grid-cols-2`, sin divisores

### Acerca de
- Escritorio: `flex-row`, división 50/50, altura mínima `600px`
- Móvil: `flex-col`, foto superior (`w-full h-72 object-cover`), texto a continuación. `border-left` se convierte en `border-top` en dispositivos móviles.

### Testimonios
- Escritorio: `grid-cols-3`
- Móvil: `grid-cols-1`, tarjetas deslizables (agregue `overflow-x-auto flex snap-x snap-mandatory` en dispositivos móviles, cada tarjeta `snap-start min-w-[85vw]`)

### Recursos/Blog
- Escritorio: `grid-cols-3`
- Móvil: `grid-cols-1`

### Sección CTA
- Escritorio: centrado, ancho máximo form
- Móvil: formulario de ancho completo, título en clamp(28px,8vw,48px)

### Footer
- Escritorio: `grid-cols-4`
- Móvil: `grid-cols-2`
- Extrapequeño (`<sm`): `grid-cols-1`

---

## 9. COPIA COMPLETAY

### Navbar
- Logotipo: **Vance Advisory**
- Enlaces: **Servicios** · **Cómo Funciona** · **Acerca de** · **Recursos** · **Contacto**
- CTA: **Consulta gratuita**

### Hero
- Ceja: **ASESORAMIENTO FINANCIERO INDEPENDIENTE**
- H1: **Tu futuro financiero,** 
 **Aclarado.**
- Subtítulo: **Asesoramiento financiero independiente: planificación de jubilación, inversiones y protección para individuos y familias.**
- CTA 1: **Reserve una consulta gratuita**
- CTA 2: **Ver nuestros servicios→**
- Estadísticas: **£500M+** / Activos asesorados · **200+** / Clientes · **18 años** / Experiencia

### Sección de Servicios
- Ceja: **LO QUE OFRECEMOS**
- H2: **Asesoramiento de expertos en cada área de su negocio financiero Vida**
- Tarjeta 1 — **Planificación de jubilación:** "Comprenda exactamente cuánto necesita, cuándo puede jubilarse y cómo hacer que su dinero dure. Modelamos múltiples escenarios para que se jubile con confianza, sin conjeturas". 
- Tarjeta 2 — **Gestión de inversiones:** "Construya una cartera diversificada alineada con sus objetivos, cronograma y actitud ante el riesgo. El asesoramiento independiente significa que recomendamos lo correcto para usted, no lo que nos genera la comisión más alta". 
- Tarjeta 3 — **Seguro de protección:** "Asegúrese de que su familia y sus ingresos estén protegidos si ocurre algo inesperado. Revisamos el mercado para encontrar el nivel correcto de cobertura al precio correcto". 
- Tarjeta 4 — **Planificación patrimonial:** "Minimice el impuesto a la herencia y garantice que sus activos vayan exactamente a donde usted desea. protegido."
- Enlace a todas las tarjetas: **Más información →**

### Sección Cómo funciona
- Ceja: **EL PROCESO**
- H2: **Un proceso simple y transparente**
- Paso 01 — **Consulta inicial gratuita:** "Dedicamos 30 minutos a comprender sus objetivos, su situación actual y lo que lo mantiene despierto por la noche, no se requiere compromiso". 
- Paso 02: **Su plan personalizado:** "Investigamos, modelamos y creamos una estrategia financiera adaptada precisamente a su situación, no un producto genérico disponible en el mercado". 
- Paso 03: **Asociación continua:** "La vida cambia periódicamente y lo adaptamos según sus circunstancias. evolucionar."

### Sección de métricas de confianza
- **£500M+** / Activos asesorados
- **200+** / Clientes
- **18 años** / Experiencia
- **FCA** / Regulado

### Acerca de la sección
- Ceja: **ACERCA DE NOSOTROS**
- H2: **Consejo independiente.** 
 **Sin conflictos. Sin concesiones.**
- Cuerpo 1: "James Vance ha estado ayudando a familias e individuos a generar seguridad financiera durante más de 18 años.Después de una década en Merrill Lynch, fundó Vance Advisory en 2006 para ofrecer asesoramiento genuinamente independiente, sin sesgos de comisiones ni objetivos corporativos". 
- Cuerpo 2: "Hoy, James asesora a clientes en planificación de jubilación, gestión de inversiones y planificación patrimonial. Tiene la designación de Chartered Financial Planner y es miembro del Chartered Insurance Institute."
- Insignias: **Autorizado por FCA** · **Chartered Financial Planner** · **Miembro de PFS** · **Miembro de CII**

### Sección de testimonios
- Ceja: **HISTORIAS DE CLIENTES**
- H2: **Lo que dicen nuestros clientes**
- Testimonio 1: *"Trabajar con James me dio una claridad que no creía posible. Finalmente entiendo mi pensión y sé exactamente cuándo puedo jubilarme".* — David M., 52 años, propietario de negocio
- Testimonio 2: *"James nos ayudó a navegar una situación de herencia compleja. Su consejo nos ahorró una cantidad significativa en impuestos y nos dio verdadera tranquilidad."* — Sarah y Tom K., 40 años, pareja profesional
- Testimonio 3: *"Había postergado la ordenación de mis finanzas durante años. Una conversación con James y yo teníamos un plan claro. Ojalá lo hubiera hecho antes."* — Rachel P., 38, consultora independiente

### Sección de recursos
- Ceja: **RECURSOS**
- H2: **Información para ayudarle a tomar mejores decisiones financieras**
- Artículo 1: **¿Cuánto necesita realmente para jubilarse?** — Categoría: Jubilación · Fecha: marzo de 2025
- Artículo 2: **El caso del asesoramiento financiero independiente en 2025** — Categoría: Inversiones · Fecha: febrero de 2025
- Artículo 3: **5 errores comunes de inversión (y cómo evitarlos)** — Categoría: Impuestos · Fecha: enero de 2025
- Enlace a todos los artículos: **Leer →**

### Sección CTA
- H2: **Tome el control de su futuro financiero**
- Sub: **Reserve una consulta gratuita de 30 minutos, sin compromiso, sin presión de ventas.**
- Etiquetas de formulario: **Su nombre** · **Dirección de correo electrónico** · **Número de teléfono** · **¿Qué está buscando? ¿discutir?**
- Enviar CTA: **Reserve una consulta gratuita**
- Nota de privacidad: **Sus datos se mantienen estrictamente confidenciales y nunca se compartirán con terceros.Parties.**

### Pie de página
- Lema: **Asesoramiento financiero independiente para individuos y familias.**
- Encabezados de columnas: **Servicios** · **Recursos** · **Contacto**
- Detalles de contacto: Vance Advisory Limited · 14 King William Street · Londres, EC4N 7BP · hello@vanceadvisory.co.uk · +44 (0)20 7000 1234 · Registro FCA: 123456
- Texto reglamentario: **Vance Advisory está autorizado y regulado por la Autoridad de Conducta Financiera. Registro FCA No. 123456. El valor de las inversiones puede subir o bajar. El rendimiento pasado no es una guía para los rendimientos futuros. Vance Advisory Limited está registrada en Inglaterra y Gales, con el número de empresa 05891234.**
- Copyright: **© 2025 Vance Advisory Limited. Todos los derechos reservados.**

---

## 10. DEPENDENCIAS CLAVE

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.4.0",
    "vite": "^5.3.0"
  }
}
```

**Componentes shadcn/ui necesarios:** `Input`, `Textarea`, `Button` — instalado mediante `npx shadcn@latest agregar botón de área de texto de entrada`.

**iconos de lucide-react utilizados:**
- `TrendingUp` — Planificación de jubilación
- `BarChart2` — Gestión de inversiones
- `Shield` — Seguro de protección
- `FileText` — Planificación patrimonial
- `Star` — Estrellas testimoniales
- `Menú` — Hamburguesa móvil
- `X` — Menú móvil cerrar
- `Linkedin` — Pie de página social
- `Twitter` — Pie de página social

**Importación de Framer Motion:** Siempre `import { motion, AnimatePresence, useInView } from 'motion/react'` (no `framer-motion`).

**Google Fonts:** Cargado a través de `<link>` en `index.html`. No utilice `@import` en CSS (rendimiento).

---

## NOTAS DE IMPLEMENTACIÓN

1. **0px border-radius en todas partes**: esto es fundamental para la marca. No se permiten esquinas redondeadas en ningún elemento interactivo, tarjeta, botón, entrada o insignia. Establezca `border-radius: 0` globalmente y nunca anule.

2. **Imágenes:** Todas las etiquetas `<img>` tienen `src=""`. El comentario JSX inmediatamente encima de cada imagen describe qué foto usar. Las herramientas de inteligencia artificial que generan este sitio dejarán marcadores de posición o utilizarán las descripciones para obtener/generar imágenes. No invente URL `src`.

3. **Formulario:** No se requiere backend: el botón de enviar puede mostrar un cambio de estado exitoso: reemplazar el formulariocon `<div>` que contiene el texto DM Serif "Gracias. James se pondrá en contacto dentro de un día hábil". en azul marino sobre fondo dorado.

4. **ID de sección:** `#servicios`, `#cómo-funciona`, `#acerca de`, `#recursos`, `#contacto`: todos los enlaces de la barra de navegación se desplazan suavemente hasta ellos. Agregue `scroll-behavior: smooth` a `:root`.

5. **La copia del pie de página reglamentario de la FCA es texto fijo**: no la mueva, la trunque ni la haga plegable. Debe estar siempre visible.

6. **Estructura de archivo sugerida:**
```
src/
  components/
    Navbar.tsx
    Hero.tsx
    Services.tsx
    HowItWorks.tsx
    TrustMetrics.tsx
    About.tsx
    Testimonials.tsx
    Resources.tsx
    ConsultationCTA.tsx
    Footer.tsx
  index.css
  App.tsx
  main.tsx
```
