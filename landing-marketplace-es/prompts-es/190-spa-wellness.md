# Sitio web de spa y bienestar: SEREN

Cree un sitio web de spa y centro de bienestar de lujo llamado "SEREN": fondo crema cálido, acento de terracota (#B5694A), tipografía de visualización en cursiva serif Cormorant Garamond mezclada con Inter. Aireado, femenino, premium. Imágenes de servicio recortadas de forma ovalada, secciones de diseño dividido y una sección de reservas/precios con pestañas. Inspirado en las clínicas de bienestar rusas de alta gama y los spas de día europeos.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 36 40% 97%;         /* warm cream #FAF8F5 */
  --foreground: 20 35% 11%;         /* deep warm brown #231710 */
  --primary: 18 43% 50%;            /* terracotta #B5694A */
  --primary-foreground: 36 40% 97%;
  --muted: 32 30% 91%;              /* warm sand #F0EBE3 */
  --muted-foreground: 20 12% 49%;   /* warm taupe #8A7A72 */
  --border: 25 20% 87%;             /* soft warm border #E5DDD5 */
  --card: 36 35% 95%;
}
```

---

## Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

- **Mostrar encabezados**: Cormorant Garamond: mezcle regular + cursiva dentro del mismo encabezado para editorial contraste
- **Encabezados de sección**: Cormorant Garamond 600, sin cursiva
- **Cuerpo/UI/etiquetas**: Inter 400–500
- **Etiquetas de acento**: Inter 500, mayúsculas, seguimiento-[0.18em], texto-xs, text-primary

**Patrón de mezcla de títulos** (firma visual clave de este diseño):
```tsx
// Regular word + italic word in same line — creates editorial luxury feel
<h2 className="font-['Cormorant_Garamond'] text-5xl leading-tight">
  Philosophy of{" "}
  <em className="italic font-light">perfection</em>
</h2>
```

---

## Sistema de botones: se aplica a todos los botones, no excepciones

```tsx
// Small — navbar, links
className="h-10 px-6 rounded-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-sm font-medium transition-all duration-200"

// Default CTA — section buttons
className="h-12 px-8 rounded-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-sm font-medium transition-all duration-200"

// Large CTA — hero, booking
className="h-13 px-10 rounded-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-base font-medium transition-all duration-200"
```

Nota: use "redondeado-completo" en todas partes: los botones tipo pastilla se adaptan a la estética del spa. Nunca `redondeado-xl` o `redondeado-lg` en este diseño.
- Altura `h-{n}` siempre explícita; nunca confíe solo en el relleno
- Siempre `inline-flex items-center justify-center`
- Siempre `shrink-0 whitespace-nowrap`
- Iconos: `w-4 h-4 encogimiento-0`

---

## Efectos visuales

### 1. Tratamiento de imagen ovalada - firma de la sección de servicios

```tsx
// Portrait oval: aspect-ratio 3/4, fully rounded
<div className="w-[200px] aspect-[3/4] rounded-[50%] overflow-hidden shrink-0">
  <img src="" alt="..." className="w-full h-full object-cover object-center" />
</div>

// Landscape oval: aspect-ratio 4/3, fully rounded
<div className="w-[260px] aspect-[4/3] rounded-[50%] overflow-hidden shrink-0">
  <img src="" alt="..." className="w-full h-full object-cover object-center" />
</div>
```

### 2. Desvanecimiento escalonado (Framer Movimiento)

```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
viewport={{ once: true, margin: "-60px" }}
```

### 3. Desplazamiento de servicios horizontal (escritorio + móvil)

```tsx
// Scrollable row of oval-cropped service images
// Desktop: overflow-x-auto, snap-x snap-mandatory, scrollbar hidden
// Mobile: same behavior, touch-pan-x
<div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
  {services.map(s => (
    <div key={s} className="flex flex-col items-center gap-4 shrink-0 snap-start">
      {/* oval image */}
      {/* service name label below */}
    </div>
  ))}
</div>
```

### 4. Héroe de gradiente cálido overlay

```tsx
// On hero image — warm cream fades in from bottom, not black
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--background))]" />
<div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))/80] to-transparent" />
```

### 5. Sección de precios con pestañas

```tsx
// Three tabs: Silver | Diamond | Gold
// Active tab: bottom border-b-2 border-primary, text-foreground
// Inactive: text-muted-foreground, hover:text-foreground
// Tab content animates: opacity 0 → 1, y 8 → 0 on tab switch, duration 0.3s
const [activeTab, setActiveTab] = useState("Diamond")
```

---

## Desglose de componentes

### 1 — Navbar

- Parte superior fija, h-[64px], z-50, bg-[hsl(var(--background))]/90 fondo-desenfoque-md
- Borde inferior: 1px sólido hsl(var(--border))
- max-w-[1120px]mx-auto px-6, flex justify-between items-center
- Izquierda: `<span className="font-['Cormorant_Garamond'] text-xl font-semibold italic tracking-wide text-[hsl(var(--foreground))]">Seren.</span>`
- Centro (escritorio): enlaces de navegación `text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors` — "Inicio · Servicios · Especialistas · Blog · Bienestar · Contacto"
- Derecha:
 ```tsx
  <button className="h-10 px-6 rounded-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap bg-[hsl(var(--primary))] text-white text-sm font-medium hover:opacity-90 transition-opacity">
    Book Now
  </button>
  ```
- Móvil: logotipo a la izquierda + botón Reservar ahora a la derecha, navegación central oculta

---

### 2 — Hero

- `min-h-[90vh] centro de elementos flexibles relativos overflow-hidden`

```tsx
{/* Image: woman receiving luxury facial treatment in elegant spa, warm golden light, cream and beige tones, soft focus background, serene expression, professional wellness photography */}
<img
  src=""
  alt="Luxury spa facial treatment"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>
{/* Warm overlay — cream from bottom, soft left panel */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(36,40%,97%,0.1)] to-[hsl(var(--background))]" />
<div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))/85] via-[hsl(var(--background))/40] to-transparent" />
```

- Contenido: `relativo z-10 max-w-[1120px] mx-auto px-6 w-full`
- Interior: `max-w-[560px]`

**Etiqueta:** `text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-6` — "Centro y clínica de bienestar"

**H1:**
```tsx
<h1 className="font-['Cormorant_Garamond'] font-medium leading-[1.08] text-[hsl(var(--foreground))]"
    style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
  Center of complete<br />
  beauty, recovery<br />
  and <em className="italic font-light text-[hsl(var(--primary))]">rejuvenation.</em>
</h1>
```

**Sub:** `text-sm text-[hsl(var(--muted-foreground))] mt-6 leading-relaxed max-w-[380px]` — "Te ayudamos a crear una cultura de cuidado y un nuevo enfoque para el equilibrio y el amor genuino por ti mismo".

**CTA:** `flex gap-3 mt-9 flex-wrap`
```tsx
<button className="h-12 px-8 rounded-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap bg-[hsl(var(--primary))] text-white text-sm font-medium hover:opacity-90 transition-opacity">
  Book a Session
</button>
<button className="h-12 px-8 rounded-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm font-medium hover:border-[hsl(var(--primary))] transition-colors">
  Our Services
</button>
```

**Cuadrícula de imágenes pequeñas** — flotante en la parte inferior derecha del escritorio (móvil oculto):
```tsx
<div className="absolute bottom-8 right-8 grid grid-cols-2 gap-2 hidden md:grid">
  {/* 4 small oval images: massage hands, facial close-up, spa interior, skincare products */}
  {/* Each: w-24 h-28 rounded-[50%] overflow-hidden */}
  {[
    "close-up of therapist hands performing back massage, warm spa lighting, soft focus",
    "woman relaxing during facial treatment, cucumber on eyes, white towel, serene spa",
    "luxury spa interior with candles, stone basins, warm amber lighting, zen atmosphere",
    "premium skincare products arranged on marble surface, cream and gold packaging"
  ].map((desc, i) => (
    <div key={i} className="w-24 h-28 rounded-[50%] overflow-hidden border-2 border-[hsl(var(--background))]">
      {/* Image: {desc} */}
      <img src="" alt="Spa detail" className="w-full h-full object-cover object-center" />
    </div>
  ))}
</div>
```

---

### 3 — Acerca de / Filosofía

- `py-24 md:py-32 bg-[hsl(var(--background))]`
- max-w-[1120px] mx-auto px-6
- `grid grid-cols-1 md:grid-cols-2 gap-16 items-center`

**Izquierda — texto:**
- Etiqueta: `text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-5` — "Acerca de nosotros"
- H2:
 ```tsx
  <h2 className="font-['Cormorant_Garamond'] font-medium leading-tight text-[hsl(var(--foreground))]"
      style={{ fontSize: "clamp(2.4rem,4vw,3.8rem)" }}>
    Philosophy of perfection<br />
    and a new approach to the{" "}
    <em className="italic font-light">balance of life</em>
  </h2>
  ```
- Cuerpo: `text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mt-6` — "Ayudamos a crear una cultura de cuidado y un nuevo enfoque hacia el equilibrio, y un amor genuino por uno mismo. Cada visita es un paso hacia la mejor versión de ti."
- CTA:
 ```tsx
  <button className="mt-8 h-12 px-8 rounded-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap border border-[hsl(var(--primary))] text-[hsl(var(--primary))] text-sm font-medium hover:bg-[hsl(var(--primary))] hover:text-white transition-all">
    Book a Session
  </button>
  ```

**Derecha: 4 filas de características:**
```tsx
<div className="flex flex-col gap-5">
  {features.map((f, i) => (
    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
      {/* small oval image */}
      <div className="w-14 h-16 rounded-[50%] overflow-hidden shrink-0">
        <img src="" alt={f.title} className="w-full h-full object-cover object-center" />
      </div>
      <div>
        <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1">{f.title}</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{f.body}</p>
      </div>
    </div>
  ))}
</div>
```

Datos de filas de características (4 elementos):

| Título | Cuerpo | Resumen de imagen |
|---|---|---|
| Firma y Método Personalizado | Metodología de corrección HN Maros | terapeuta aplicando suero facial, manos expertas en primeros planos, iluminación cálida de spa |
| Amplia gama de procedimientos | Más de 60 procedimientos médicos y estéticos únicos | gama de herramientas de belleza profesionales sobre mármol blanco, organizadas, limpias |
| Equipos innovadores | Equipos de calidad médica europeos de primera calidad | moderno dispositivo de tratamiento de spa, estética clínica, tonos blancos limpios |
| Cosmetología Premium | Linda Kristel, Talasoterapia,René, JULIETTE ARMAND | productos de marcas de lujo para el cuidado de la piel, frascos elegantes, tonos crema cálidos |

---

### 4 — Servicios

- `py-24 md:py-32 bg-[hsl(var(--muted))]`
- max-w-[1120px] mx-auto px-6
- Etiqueta + H2 alineado a la izquierda:
 - Etiqueta: "Nuestros servicios"
 - H2: `font-['Cormorant_Garamond'] font-medium text-4xl md:text-5xl` — `Our top <em className="italic font-light">services</em>`
- Arriba a la derecha: `<button className="h-10 px-6 rounded-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap border border-[hsl(var(--border))] text-sm font-medium hover:border-[hsl(var(--primary))] transition-colors">All services</button>`
- Fila de desplazamiento horizontal - `mt-12 flex gap-8 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide`

Cada elemento de servicio: `flex flex-col items-center gap-3 encogimiento-0 snap-start cursor-pointer group`
- Imagen ovalada: `w-[190px] h-[240px] redondeado-[50%] desbordamiento-grupo oculto-hover:opacidad-90 transición-opacidad`
- Etiqueta: `text-sm font-medium text-[hsl(var(--foreground))] text-center`

Servicios (8 elementos):

| Nombre | Resumen de imagen |
|---|---|
| Tratamientos faciales | Mujer recibiendo masaje facial, ojos cerrados, serena, toalla de spa blanca, iluminación suave y cálida |
| Masaje Sueco | terapeuta realizando masaje de espalda, spa de hotel, velas cálidas de color ámbar |
| Exfoliantes Corporales | tratamiento exfoliación corporal manos en espalda, exfoliación, spa cálido, texturas naturales |
| Manicura | primer plano manos de manicura elegante, uñas neutras, estética de spa limpia |
| Cosmetología inyectable | Primer plano de tratamiento clínico estético, entorno de spa médico profesional |
| Yoga y Pilates | mujer en elegante pose de yoga, estudio con luz natural, tonos blancos y madera |
| Terapia intravenosa | Terapia de goteo de bienestar, entorno de spa clínico limpio, luz suave |
| Diagnóstico | consulta de bienestar, clínica spa profesional, espacio tranquilo y organizado |

---

### 5 — Equipo / Especialistas

- `py-24 md:py-32 bg-[hsl(var(--background))]`
- max-w-[1120px] mx-auto px-6
- Fila de encabezado: `flex justify-between items-end mb-12`
 - H2: `font-['Cormorant_Garamond'] font-medium text-4xl md:text-5xl` — `Team of leading <em className="italic font-light">professionals</em>`
 - Botones de flecha: `flex gap-2` — dos `<button>` cada uno `w-10 h-10 rounded-full inline-flex items-center justify-center border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors shrink-0`
 - lucide `ChevronLeft` y `ChevronRight`, `w-4 h-4`
- Desplazamiento horizontal: `flex gap-6 overflow-x-auto scrollbar-hidepb-2`

Tarjeta de especialista: `shrink-0 w-[200px]`
- Foto de retrato: `w-full h-[260px] rounded-2xl overflow-hidden mb-3`
 ```tsx
  {/* Image: professional female spa therapist, white uniform, warm neutral studio background, clean portrait photography */}
  <img src="" alt="Spa specialist" className="w-full h-full object-cover object-center" />
  ```
- Nombre: `text-sm font-semibold text-[hsl(var(--foreground))]`
- Rol: `text-xs text-[hsl(var(--muted-foreground))] mt-0.5`

Especialistas (6):

| Nombre | Función |
|---|---|
| Tatiana Merzaeva | Cosmetóloga Jefe |
| Polina Voronova | Masajista Terapeuta |
| Liliya Khusnutdinova | Entrenador de Yoga y Bienestar |
| Luisa Murzagalieva | Especialista en Inyectables |
| Oksana Timchenko | Enfermera Estética |
| Alina Saifulina | Terapeuta de belleza |

---

### 6 — Reservas / Precios

- `py-24 md:py-32 bg-[hsl(var(--muted))]`
- max-w-[1120px] mx-auto px-6 text-center
- H2: `font-['Cormorant_Garamond'] fuente-texto medio-4xl md:text-5xl mb-12` — `Book an <em className="italic font-light">appointment</em>`
- Fila de pestañas: `flex justify-center gap-8 border-b border-[hsl(var(--border))] mb-12`
 - Cada pestaña: `pb-3 texto-sm fuente-cursor medio-puntero colores de transición borde-b-2 -mb-px`
 - Activo: `border-[hsl(var(--primary))] text-[hsl(var(--foreground))]`
 - Inactivo: `border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]`
 - Pestañas: "Plata" · "Diamante" · "Oro"
- Contenido de la pestaña: `grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left`

**Izquierda — imagen:**
```tsx
<div className="rounded-[2rem] overflow-hidden h-[420px]">
  {/* Image: luxury spa interior with arched doorway, indoor pool, candles, natural stone, warm atmospheric lighting */}
  <img src="" alt="Luxury spa interior" className="w-full h-full object-cover object-center" />
</div>
```

**Derecha — información del paquete:**
- Nombre del paquete: `font-['Cormorant_Garamond'] font-semibold text-3xl text-[hsl(var(--foreground))] mb-4`
- Descripción: `text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-6`
- Lista de verificación: `flex flex-col gap-3 mb-8`
 - Cada artículo: `flex items-center gap-2 text-sm text-[hsl(var(--foreground))]`
 - lucide `CircleCheck` `w-4 h-4 text-[hsl(var(--primary))] shrink-0`
- Precio: `font-['Cormorant_Garamond'] font-semibold text-4xl text-[hsl(var(--foreground))] mb-6`
- CTA:
 ```tsx
  <button className="h-12 px-8 rounded-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap bg-[hsl(var(--primary))] text-white text-sm font-medium hover:opacity-90 transition-opacity">
    Reserve
  </button>
  ```

Paquetes:

| Pestaña | Descripción | Características | Precio |
|---|---|---|---|
| Plata | Una selección curada de nuestros tratamientos más queridos, perfecta para una primera visita o un ritual de bienestar habitual. | Relajación imprescindible · Elección de 2 tratamientos · Refresco incluido | $149.99 |
| Diamante | Nuestra experiencia exclusiva de día completo. Un completo viaje de bienestar desde la llegada hasta la salida, totalmente personalizado. | Bienestar integral · Lujo y exclusividad · Acceso a comodidades exclusivas | $325.99 |
| Oro | La mejor experiencia SEREN: cadaEl trato, cada amenidad, cada momento elaborado a tu alrededor. | Todas las características Diamond · Acceso a suite privada · Terapeuta personal por el día | $580.00 |

---

### 7 — Testimonios

- `py-24 md:py-32 bg-[hsl(var(--background))]`
- max-w-[1120px] mx-auto px-6
- H2: `font-['Cormorant_Garamond'] font-medium text-4xl md:text-5xl mb-3` — `They trust us with what <em className="italic font-light">matters most</em>`
- Desplazamiento horizontal: `flex gap-6 mt-12 overflow-x-auto scrollbar-hide pb-2`

Tarjeta de testimonio: `shrink-0 w-[360px] p-6 rounded-2xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]`
 - Fila de autor superior: `elementos flexibles-espacio central-3 mb-4`
 - Avatar: `w-10 h-10 redondeado-desbordamiento completo-encogimiento oculto-0`
 ```tsx
    {/* Image: smiling woman portrait, warm natural light, clean background, friendly spa client */}
    <img src="" alt="Client" className="w-full h-full object-cover object-center" />
    ```
 - Nombre: `text-sm font-semibold text-[hsl(var(--foreground))]` + fecha `text-xs text-[hsl(var(--muted-foreground))]`
- Cita: `text-sm text-[hsl(var(--foreground))] leading-relaxed`
- "Leer más": `text-xs font-medium text-[hsl(var(--primary))] mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all`

| Autor | Fecha | Cita |
|---|---|---|
| diana | 26.11.2021 | El resultado de 70 a 54 — del 21 de enero. Diana acudió a nosotros en Irina Maros para una corrección facial. En ese momento ya había probado muchos procedimientos. Los resultados de Diana son los resultados que demuestran: nuestro enfoque funciona. |
| Cristina | 15.03.2022 | Quiero agradecer al equipo por el cuidado y la atención. Literalmente cambiaste mi apariencia. Siempre me siento entre el personal más profesional. Recomiendo encarecidamente cada detalle: el ambiente, el servicio y la calidez. |
| María | 04.07.2023 | Cuatro visitas después puedo decir que esta es la atención profesional más honesta que he recibido. Los resultados son visibles y duraderos. SEREN no es sólo un spa, es un lugar donde te sientes genuinamente visto. |

---

## Animaciones

```
Navbar: opacity 0 → 1, duration 0.4s
Hero label: opacity 0, y 12 → 0, delay 0.1s, duration 0.5s
Hero H1 (per line): delay 0.2s + index*0.12, duration 0.65s
Hero sub: delay 0.55s, duration 0.5s
Hero CTAs: delay 0.7s, y 16 → 0, opacity 0 → 1
Hero floating grid: opacity 0 → 1, x 20 → 0, delay 0.9s, duration 0.6s
About section: left text stagger 0.1s, right feature rows stagger 0.12s, both on scroll
Services row: clip-path reveal on section enter, then individual ovals fade-in stagger 0.08s
Team cards: horizontal stagger 0.07s per card, y 20 → 0
Pricing tabs: content opacity 0 → 1, y 8 → 0, duration 0.3s on tab change
Testimonials: horizontal stagger 0.09s per card, y 20 → 0
All sections: useInView once:true, margin "-60px"
```

---

## Responsivo

```
Navbar: full links desktop → logo + Book Now button mobile
Hero: full layout desktop → stacked mobile, floating grid hidden mobile
Hero H1: clamp(3rem, 6vw, 5.5rem) auto-scales
Hero CTAs: flex-row desktop → flex-col w-full max-w-[280px] mx-auto mobile
About: 2-col desktop → 1-col mobile (text first, feature rows below)
Services scroll: same behavior desktop + mobile, touch-friendly
Team scroll: same behavior desktop + mobile
Pricing: 2-col desktop → 1-col mobile (image above content)
Testimonials scroll: same behavior, card w-[320px] mobile
```

---

## Copia completa

| Elemento | Copia |
|---|---|
| Marca | Serena. |
| Enlaces de navegación | Inicio · Servicios · Especialistas · Blog · Bienestar · Contacto |
| CTA de navegación | Reserva Ahora |
| Etiqueta de héroe | Centro de bienestar y clínica |
| Héroe H1 | Centro de completa belleza, recuperación y rejuvenecimiento. |
| Sub héroe | Te ayudamos a crear una cultura del cuidado y un nuevo enfoque hacia el equilibrio.- y amor genuino por ti mismo. |
| Héroe CTA primario | Reservar una sesión |
| Héroe CTA secundario | Nuestros Servicios |
| Acerca de la etiqueta | Sobre nosotros |
| Acerca del H2 | Filosofía de la perfección y un nuevo enfoque hacia el equilibrio de la vida |
| Sobre el cuerpo | Ayudamos a crear una cultura de cuidado y un nuevo enfoque hacia el equilibrio y el amor genuino por uno mismo. Cada visita es un paso hacia la mejor versión de ti. |
| Características | Método exclusivo y personalizado · Amplia gama de procedimientos · Equipos innovadores · Cosmetología Premium |
| Etiqueta de servicios | Nuestros Servicios |
| Servicios H2 | Nuestros mejores servicios |
| Lista de servicios | Tratamientos faciales · Masaje sueco · Exfoliantes corporales · Manicura · Cosmetología inyectable · Yoga y pilates · Terapia intravenosa · Diagnóstico |
| Equipo H2 | Equipo de profesionales líderes |
| Precios H2 | Reservar cita |
| Pestañas | Plata · Diamante · Oro |
| Testimonios H2 | Nos confían lo más importante |
| Derechos de autor de pie de página | © 2025 SEREN Wellness Center |

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx"
}
```