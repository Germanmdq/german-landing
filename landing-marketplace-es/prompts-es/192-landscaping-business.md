# Sitio web de paisajismo: VERDANT

Cree un sitio web editorial moderno de diseño de jardines y paisajismo llamado "VERDANT": fondo blanco cálido, acento verde bosque profundo (#2D6A4F), espacios en blanco generosos y tipografía de visualización serif grande. Limpio, mínimo, premium. Piense en un estudio de jardinería de alta gama, no en una empresa de corte de césped.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 60 20% 97%;          /* warm off-white #FAFAF8 */
  --foreground: 128 18% 13%;         /* deep forest #1B2A1D */
  --primary: 150 41% 30%;            /* forest green #2D6A4F */
  --primary-foreground: 60 20% 97%;
  --muted: 120 12% 93%;              /* pale sage #EBF0EB */
  --muted-foreground: 128 10% 48%;
  --border: 120 10% 87%;
  --card: 60 20% 99%;
}
```

---

## Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

- **Mostrar títulos**: Cormorant Garamond 600 cursiva — línea grande, editorial y generosa altura
- **Encabezados de sección**: Cormorant Garamond 600, sin cursiva
- **Cuerpo/UI**: Inter 400–500, texto-sm a base de texto
- **Etiquetas/mayúsculas**: Inter 500, mayúsculas, seguimiento-[0.18em], texto-xs, text-primary

---

## Efectos visuales

### 1. Revelación de imagen de ruta de clip en el desplazamiento
```tsx
// Images reveal left-to-right as they enter viewport
initial={{ clipPath: "inset(0 100% 0 0)" }}
whileInView={{ clipPath: "inset(0 0% 0 0)" }}
transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
viewport={{ once: true, margin: "-60px" }}
```

### 2. Marco horizontal ticker
```tsx
// Green band between hero and services
// Scrolls continuously: "GARDEN DESIGN · LAWN CARE · PLANTING · LANDSCAPE · MAINTENANCE · "
// Implemented as two identical spans side by side, animating x: 0 → -50% on infinite loop
<div className="overflow-hidden bg-[hsl(var(--primary))] py-4">
  <motion.div
    className="flex whitespace-nowrap"
    animate={{ x: ["0%", "-50%"] }}
    transition={{ duration: 22, ease: "linear", repeat: Infinity }}
  >
    {[0, 1].map(i => (
      <span key={i} className="text-white font-['Inter'] text-xs font-500 uppercase tracking-[0.22em] pr-12">
        GARDEN DESIGN &nbsp;·&nbsp; LAWN CARE &nbsp;·&nbsp; PLANTING &nbsp;·&nbsp; LANDSCAPE ARCHITECTURE &nbsp;·&nbsp; SEASONAL MAINTENANCE &nbsp;·&nbsp; OUTDOOR LIVING &nbsp;·&nbsp;
      </span>
    ))}
  </motion.div>
</div>
```

### 3. Desvanecimiento escalonado (Framer Motion)
```tsx
initial={{ opacity: 0, y: 28 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.1 }}
viewport={{ once: true, margin: "-60px" }}
```

### 4. Imagen flotante zoom
```tsx
// On service/project cards — inner image scales on card hover
<div className="overflow-hidden rounded-2xl">
  <motion.img
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-full h-full object-cover object-center"
  />
</div>
```

### 5. Decoración de línea SVG botánica
```tsx
// Thin hand-drawn style botanical branch SVG — decorative only, aria-hidden
// Used as section divider and corner ornament in hero
// Draw as a simple SVG path: thin curved branch with 3–4 small leaves
// stroke: hsl(var(--primary)), strokeWidth: 1, fill: none, opacity: 0.3
// Example (inline, simplified):
<svg viewBox="0 0 200 80" className="w-48 opacity-30 text-primary" fill="none" stroke="currentColor" strokeWidth="1">
  <path d="M10 60 C50 40 80 20 150 10" />          {/* main branch */}
  <path d="M60 35 C65 20 78 15 90 22" />            {/* leaf 1 */}
  <path d="M100 22 C108 8 120 6 128 14" />          {/* leaf 2 */}
  <path d="M40 45 C42 30 52 26 62 32" />            {/* leaf 3 */}
</svg>
```

---

## Desglose de componentes

### 1 — Navbar

- Parte superior fija, h-[64px], z-50, bg-[hsl(var(--background))]/90, fondo-desenfocado-md
- Borde inferior: 1px sólido hsl(var(--border))
- max-w-[1120px] mx-auto px-6, flex justify-between items-center
- Izquierda: marca denominativa `font-['Cormorant_Garamond'] text-xl font-semibold italic text-[hsl(var(--foreground))] tracking-wide` — "Verdant"
- Centro (escritorio): enlaces de navegación — "Servicios" · "Proyectos" · "Acerca de" · "Contacto"
 - `text-sm text-muted-foreground hover:text-foreground transición-colores`
- Derecha: `h-10 px-6 rounded-full bg-[hsl(var(--primary))] text-white text-sm font-medium hover:opacity-90 transition-opacity` — "Obtener una cotización"
- Móvil: hamburguesa (menú lucide, `text-foreground`), navegación central oculto

---

### 2 — Hero

- `min-h-screen grid grid-cols-1 md:grid-cols-2` — diseño dividido
- Mitad izquierda: `flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32`
- Mitad derecha: imagen de altura completa

**Contenido izquierdo:**

Etiqueta:`text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-8` — "Garden Design Studio"

Decoración botánica SVG sobre el título (ver efecto #5 arriba), `mb-4`

H1:
```tsx
<h1 className="font-['Cormorant_Garamond'] italic font-semibold text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[1.05] text-[hsl(var(--foreground))]">
  Spaces that<br />
  <span className="text-[hsl(var(--primary))]">breathe.</span>
</h1>
```

Sub: `text-sm text-[hsl(var(--muted-foreground))] mt-8 max-w-[340px] leading-relaxed` — "Diseñamos y construimos espacios al aire libre que se sienten como intencionales como las casas que rodean, diseño de jardines, plantación y arquitectura paisajística para clientes exigentes."

CTAs: `flex gap-3 mt-10`
- Primario: `h-11 px-7 rounded-full bg-[hsl(var(--primary))] text-white text-sm font-medium hover:opacity-90 transition-opacity` — "Ver nuestro trabajo"
- Secundario: `h-11 px-7 rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm font-medium hover:border-[hsl(var(--primary))] transition-colors` — "Obtenga un. Cita"

Fila de estadísticas: `flex gap-8 mt-14 pt-8 border-t border-[hsl(var(--border))]`
```
120+         14 yrs         98%
Projects     Experience     Satisfaction
```
Número: `font-['Cormorant_Garamond'] font-semibold text-3xl text-[hsl(var(--foreground))]`
Etiqueta: `text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-widest mt-0.5`

**Lado derecho - héroe imagen:**
```tsx
<div className="relative h-full min-h-[60vh] md:min-h-screen overflow-hidden">
  {/* clip-path reveal animation wraps the image div */}
  {/* Image: lush formal garden with manicured hedges, stone pathway, soft morning light, rich deep greens, minimal and elegant, top-down or eye-level perspective, editorial photography */}
  <img
    src=""
    alt="Formal garden with manicured hedges and stone pathway"
    className="w-full h-full object-cover object-center"
  />
  {/* subtle green overlay at bottom edge to blend into page */}
  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
</div>
```

---

### 3 — Marquee Ticker

Banda verde de ancho completo; consulte el efecto visual n.° 2 arriba. Sin restricción de ancho máximo.

---

### 4 — Servicios

- `py-24 md:py-32 bg-[hsl(var(--background))]`
- max-w-[1120px] mx-auto px-6
- Etiqueta: `text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-5` — "Qué hacemos"
- H2: `font-['Cormorant_Garamond'] font-semibold text-4xl md:text-5xl text-[hsl(var(--foreground))]` — "Cada espacio exterior cuenta una historia".
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6 mt-16`

**Tarjeta:** `rounded-2xl overflow-hidden bg-[hsl(var(--card))] border border-[hsl(var(--border))] group`

```tsx
{/* image top */}
<div className="h-[240px] overflow-hidden">
  <motion.img
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    src=""
    alt="..."
    className="w-full h-full object-cover object-center"
  />
</div>
{/* text bottom */}
<div className="p-6">
  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-3">01</p>
  <h3 className="font-['Cormorant_Garamond'] font-semibold text-2xl text-[hsl(var(--foreground))] mb-3">Garden Design</h3>
  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">Full-service design from concept to completion. We create gardens that work with your home's architecture and the natural landscape.</p>
  {/* animated underline CTA */}
  <button className="mt-5 text-sm font-medium text-[hsl(var(--primary))] flex items-center gap-1.5 group">
    Learn more
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </button>
</div>
```

Datos de servicio (3 tarjetas):

| No. | Título | Descripción | Imagen |
|---|---|---|---|
| 01 | Diseño de jardines | Diseño de servicio completo desde el concepto hasta la finalización. Creamos jardines que funcionan con la arquitectura de su hogar y el paisaje natural. | borde de jardín bien cuidado con plantas perennes, exuberantes capas verdes, bordes de piedra natural, luz natural suave, fotografía editorial |
| 02 | Arquitectura del paisaje | Ambientes exteriores a gran escala: terrazas, fuentes de agua, iluminación y plantación estructural para clientes residenciales y comerciales. | terraza paisajística moderna con maceteros geométricos, líneas limpias, plantación arquitectónica, luz de hora dorada |
| 03 | Mantenimiento estacional | Cuidado durante todo el año que mantiene su jardín funcionando al máximo. Poda, replantación, salud del suelo y todo lo demás. | jardinero cuidando setos bien cuidados con herramientas de poda, jardín verde como telón de fondo, fotografía documental natural |

---

### 5 — DestacadoProyecto (división de ancho completo)

- `py-24 md:py-32 bg-[hsl(var(--muted))]`
- max-w-[1120px] mx-auto px-6
- `grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center`

**Izquierda — texto:**
- Etiqueta: `text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-5` — "Proyecto destacado"
- H2: `font-['Cormorant_Garamond'] italic font-semibold text-4xl md:text-5xl leading-tight text-[hsl(var(--foreground))]` — "The Whitmore Garden, Surrey"
- Carrocería: `text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mt-6` — "Un jardín trasero completo transformación en 1,2 acres Trabajando con los árboles maduros existentes, introdujimos un césped formal, bordes perennes mixtos, un área para sentarse hundida y un huerto rodeado por manzanos en espaldera. Acres" · "Proyecto de 18 meses" · "Diseño y construcción completos" · "Surrey, Reino Unido"
- CTA: `mt-8 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--primary))] hover:gap-3 transition-all` — "Ver estudio de caso completo →"

**Derecha — imagen (ruta de clip) revelar):**
```tsx
<div className="relative rounded-2xl overflow-hidden h-[480px]">
  {/* Image: English country garden, wide lawn surrounded by lush mixed borders, mature trees framing the view, formal yet natural, warm afternoon light, editorial landscape photography */}
  <img src="" alt="The Whitmore Garden Surrey" className="w-full h-full object-cover object-center" />
  {/* floating badge */}
  <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-[hsl(var(--border))]">
    <p className="font-['Cormorant_Garamond'] font-semibold text-lg text-[hsl(var(--foreground))]">2024</p>
    <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-widest">Project of the Year</p>
  </div>
</div>
```

---

### 6 — Proceso

- `py-24 md:py-32 bg-[hsl(var(--background))]`
- max-w-[1120px] mx-auto px-6
- Etiqueta + H2 centrado: `text-center`
 - Etiqueta: "Cómo trabajamos"
 - H2: `font-['Cormorant_Garamond'] font-semibold text-4xl md:text-5xl` — "Desde la primera reunión hasta la plantación final".
- Pasos: `grid grid-cols-1 md:grid-cols-4 gap-8 mt-16`

**Tarjeta de paso:** simple, sin fondo: solo número + título + texto
- Número: `font-['Cormorant_Garamond'] italic text-5xl font-semibold text-[hsl(var(--primary))] opacity-40` — "01"
- Divisor: `h-px w-full bg-[hsl(var(--border))] my-4`
- Título: `font-['Cormorant_Garamond'] font-semibold text-xl text-[hsl(var(--foreground))] mb-3` 
- Cuerpo: `text-sm text-[hsl(var(--muted-foreground))] leading-relaxed`

| Paso | Título | Cuerpo |
|---|---|---|
| 01 | Consulta | Visitamos su sitio, escuchamos sus objetivos y evaluamos el espacio. Sin obligación ni presión, sólo una conversación. |
| 02 | Diseño | Producimos un plan completo de plantación y diseño, visualizaciones 3D y cronogramas de materiales para su aprobación. |
| 03 | Construir | Nuestro equipo se encarga de todos los trabajos preliminares, la construcción y la plantación según las especificaciones exactas acordadas. |
| 04 | Cuidado | Planes de mantenimiento continuo para mantener su jardín en su mejor estado durante cada temporada. |

---

### 7 — Testimonio

- `py-24 md:py-32 bg-[hsl(var(--muted))]`
- max-w-[720px] mx-auto px-6 text-center
-Decoración botánica SVG centrada sobre la cita (ver efecto n.° 5), `mb-8 mx-auto`
- Comillas grandes: `font-['Cormorant_Garamond'] italic text-7xl text-[hsl(var(--primary))] opacity-20 leading-none` — `"`
- Cita: `font-['Cormorant_Garamond'] italic text-2xl md:text-3xl leading-relaxed text-[hsl(var(--foreground))] mt-2` — "Trabajar con Verdant fue la mejor decisión que tomamos durante nuestra renovación. Nuestro jardín ahora parece una extensión adecuada de nuestra casa, un lugar donde realmente queremos pasar el tiempo". 
- Autor: `text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--primary))] mt-8` — "Sarah & James H. — Surrey"
- Fila de estrellas: `flex justify-center gap-1 mt-4 text-[hsl(var(--primary))]` — 5× `★`

---

### 8 — CTA

- `py-24 md:py-32 bg-[hsl(var(--primary))]`
- max-w-[720px] mx-auto px-6 text-center
- Decoración SVG botánica centrada arriba, `mb-8 mx-auto`, Stroke: rgba(255,255,255,0.3)
- H2: `font-['Cormorant_Garamond'] italic font-semibold text-[clamp(2.8rem,6vw,5rem)] leading-tight text-white` — "¿Listo para transformar tu jardín?"
- Sub: `text-sm text-white/70 mt-6` — "Asumimos un número limitado de proyectos cada año. Póngase en contacto con anticipación para analizar su espacio."
- CTA: `mt-10 h-12 px-10 rounded-full bg-white text-[hsl(var(--primary))] text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2` — "Obtenga una consulta gratuita →"

---

### 9 — Pie de página

- `py-14 border-t border-[hsl(var(--border))]`
- max-w-[1120px] mx-auto px-6
- `grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start`
- Col 1: wordmark cursiva + `text-xs text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed` - "Diseño de jardines y arquitectura paisajística para clientes residenciales y comerciales". `mt-4 text-xs text-[hsl(var(--muted-foreground))]` — "© 2025 Verdant Studio"
- Col 2: `text-xs font-medium uppercase tracking-[0.18em] text-[hsl(var(--foreground))] mb-4` — "Páginas" + lista de enlaces de navegación `text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors` — Servicios · Proyectos · Acerca de · Proceso · Contacto
- Col 3: `text-xs font-medium uppercase tracking-[0.18em] text-[hsl(var(--foreground))] mb-4` — "Contacto" + `text-sm text-[hsl(var(--muted-foreground))]` — "hello@verdantstudio.co" · "+44 20 7946 0000" · "Londres y Surrey, Reino Unido"

---

## Animaciones

```
Navbar: opacity 0 → 1, delay 0, duration 0.4s
Hero label: opacity 0, y 16 → 0, delay 0.1s, duration 0.5s
Hero SVG decoration: opacity 0 → 0.3, delay 0.15s, duration 0.6s
Hero H1 lines: stagger per line, delay 0.2s + index*0.12, duration 0.65s, ease easeOut
Hero sub: delay 0.5s, duration 0.5s
Hero CTAs: delay 0.65s, duration 0.5s
Hero stats: stagger per stat, delay 0.8s + index*0.1
Hero right image: clip-path inset(0 100% 0 0) → inset(0 0% 0 0), delay 0.3s, duration 0.9s, ease [0.76,0,0.24,1]
Marquee: infinite continuous scroll, duration 22s linear
All scroll sections: useInView once:true, margin "-60px", stagger children 0.1s
Service cards: y 32 → 0, opacity 0 → 1, stagger 0.1s
Featured project: text side y 32 → 0, image clip-path reveal, both on same scroll trigger
Process steps: y 24 → 0, opacity 0 → 1, stagger 0.12s
Testimonial: opacity 0, y 24 → 0, single block, duration 0.65s
CTA block: opacity 0, y 32 → 0, scale 0.97 → 1, duration 0.65s
```

---

## Responsive

```
Navbar: desktop → full links + CTA; mobile → logo + hamburger, links hidden
Hero: 2-col desktop → 1-col mobile (text first, image below, min-h-[50vh] for image)
Hero H1: clamp(3.2rem, 5.5vw, 5.5rem) — scales naturally
Hero CTAs: flex-row desktop → flex-col w-full max-w-[300px] mx-auto mobile
Services grid: 3-col desktop → 1-col mobile
Featured: 2-col desktop → 1-col mobile (image above text), image h-[320px] mobile
Process: 4-col desktop → 2-col mobile → 1-col small mobile
Footer: 3-col desktop → 1-col mobile stacked
CTA H2: clamp(2.8rem, 6vw, 5rem) — scales naturally
```

---

## Completo Copiar

|Copiar |
|---------|------|
|
| |
| Etiqueta Hero | Estudio de diseño de jardines |
| Espacios que respiran |
 Hero sub ||
| Héroe CTA primario | Vea nuestro trabajo |
| Héroe CTA secundario | Obtenga una cotización |
| Estadísticas | Más de 120 proyectos · 14 años de experiencia · 98% de satisfacción |
| Marquesina | DISEÑO DE JARDÍN · CUIDADO DEL CÉSPED · PLANTA · ARQUITECTURA DEL PAISAJE · MANTENIMIENTO ESTACIONAL · VIDA AL AIRE LIBRE |
| Etiqueta de servicios | Qué hacemos |
| Servicios H2 | Cada espacio al aire libre cuenta una historia. |
| Etiqueta destacada | Proyecto Destacado |
| Destacado H2 | El jardín Whitmore, Surrey |
| Cuerpo destacado | Una transformación completa del jardín trasero en 1,2 acres. Trabajando con los árboles maduros existentes, introdujimos un césped formal, bordes perennes mixtos, un área para sentarse hundida y un huerto rodeado por manzanos en espaldera. |
| Insignia destacada | 2024 / Proyecto del Año |
| Etiqueta de proceso | Cómo trabajamos |
| Proceso H2 | Desde el primer encuentro hasta la siembra definitiva. |
| Cita | Trabajar con Verdant fue la mejor decisión que tomamos durante nuestra renovación. Nuestro jardín ahora parece una extensión adecuada de nuestro hogar, un lugar donde realmente queremos pasar tiempo. |
| Autor de la cita | Sarah y James H. — Surrey |
| CTA H2 | ¿Listo para transformar tu jardín? |
| Subtítulo de CTA | Asumimos un número limitado de proyectos cada año. Póngase en contacto con anticipación para discutir su espacio. |
| Botón de acción | Obtenga una consulta gratuita → |
| Lema de pie de página | Diseño de jardines y arquitectura paisajística para clientes residenciales y comerciales. |
| Derechos de autor de pie de página | © 2025 Estudio Verdant |
| Contacto de pie de página | hello@verdantstudio.co · +44 20 7946 0000 · Londres y Surrey, Reino Unido |

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx"
}
```