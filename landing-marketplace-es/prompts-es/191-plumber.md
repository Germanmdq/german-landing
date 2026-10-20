# Sitio web de fontanero: SWIFT Plumbing

Cree un sitio web moderno y confiable para una empresa de plomería llamado "SWIFT Plumbing": fondo color carbón oscuro, acento en azul eléctrico (#0EA5E9), tipografía limpia sans-serif. Número de teléfono y disponibilidad de emergencia al frente y al centro. No se parece en nada a un sitio típico de fontanero.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 220 25% 7%;
  --foreground: 210 20% 96%;
  --primary: 199 89% 48%;          /* #0EA5E9 electric blue */
  --primary-foreground: 0 0% 100%;
  --muted: 220 20% 12%;
  --muted-foreground: 215 15% 55%;
  --border: 220 18% 18%;
  --card: 220 22% 10%;
}
```

---

## Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

- **Mostrar encabezados**: Plus Jakarta Sans 800, apretado seguimiento
- **Encabezados de sección**: 700
- **Cuerpo/UI**: 400–500
- **Etiquetas**: 600, mayúsculas, seguimiento-[0,14em], text-xs

---

## Sistema de botones: se aplica a todos los botones, sin excepciones

```tsx
// Small — navbar, secondary links
className="h-10 px-5 rounded-lg inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-sm font-semibold transition-all duration-200"

// Default CTA — section buttons
className="h-12 px-7 rounded-xl inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-sm font-bold transition-all duration-200"

// Large CTA — hero, emergency sections
className="h-14 px-10 rounded-xl inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-base font-bold transition-all duration-200"
```

**Reglas no negociables:**
- `h-{n}` altura explícita en cada botón: nunca confíe solo en el relleno
- `inline-flex items-center justify-center` — nunca `flex`, nunca bloquee
- `shrink-0` — el botón nunca se comprime dentro de flex parent
- `whitespace-nowrap` — el texto nunca se ajusta dentro del botón
- Iconos dentro de los botones: siempre `w-4 h-4 Shrink-0`

---

## Efectos visuales

### 1. Resplandor azul: botones CTA + teléfono

```css
.glow-blue {
  box-shadow: 0 0 24px rgba(14,165,233,0.35), 0 0 48px rgba(14,165,233,0.12);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.glow-blue:hover {
  box-shadow: 0 0 36px rgba(14,165,233,0.55), 0 0 72px rgba(14,165,233,0.2);
  transform: translateY(-2px);
}
```

### 2. Estadísticas animadas contadores

```tsx
function useCounter(target: number, duration = 1800, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])
  return count
}
// Trigger via useInView({ once: true })
```

### 3. Morfismo de vidrio - barra de navegación + tarjetas

```css
/* Navbar */
background: rgba(14, 20, 32, 0.82);
backdrop-filter: blur(14px);
border-bottom: 1px solid rgba(255,255,255,0.06);

/* Cards */
background: rgba(255,255,255,0.03);
backdrop-filter: blur(6px);
border: 1px solid rgba(255,255,255,0.07);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
```

### 4. Entrada escalonada (Framer Movimiento)

```tsx
initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.09 }}
viewport={{ once: true, margin: "-60px" }}
```

### 5. Superposición de textura de grano

```tsx
<div
  className="fixed inset-0 z-50 pointer-events-none opacity-[0.25]"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    mixBlendMode: "overlay",
  }}
/>
```

---

## Desglose de componentes

### 1 — Navbar

- Parte superior fija, h-[68px], z-50, fondo de vidrio
- max-w-[1120px] mx-auto px-6, justificación flexible entre elementos-centro
- Izquierda: `<span className="text-lg font-extrabold tracking-tight">SWIFT <span className="text-primary">Plumbing</span></span>`
- Centro (solo escritorio): enlaces de navegación `text-sm font-medium text-muted-foreground hover:text-white Transition-colors` — "Servicios · Acerca de · Áreas · Contacto"
- Derecha: botón CTA del teléfono
 ```tsx
  <a href="tel:5550123456"
    className="h-10 px-5 rounded-lg inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap bg-primary text-white text-sm font-bold glow-blue">
    <Phone className="w-4 h-4 shrink-0" />
    (555) 012-3456
  </a>
  ```
- Móvil: logotipo a la izquierda + mismo botón de teléfono a la derecha, navegación centraloculto

---

### 2 — Hero

- `min-h-pantalla relativa flex elementos-centro desbordamiento-oculto`

```tsx
{/* Image: plumber in professional uniform working under kitchen sink, tools in hand, warm home interior, soft natural light, documentary photography style */}
<img src="" alt="Professional plumber at work" className="absolute inset-0 w-full h-full object-cover object-center" />
<div className="absolute inset-0 bg-gradient-to-r from-[rgba(14,20,32,0.97)] via-[rgba(14,20,32,0.80)] to-[rgba(14,20,32,0.25)]" />
<div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[rgba(14,165,233,0.05)] to-transparent" />
```

- Contenido: `relativo z-10 max-w-[1120px] mx-auto px-6 w-full`
- Contenido interno: `max-w-[580px]`

**Etiqueta:** `text-xs font-semibold mayúsculas seguimiento-[0.2em] text-primary mb-5 flex items-center gap-2`
- `<span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />` + "Disponible 24 horas al día, 7 días a la semana · Servicio de emergencia"

**H1:** `text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[1.06] tracking-tight text-white mt-0`
```
Fast, Reliable
Plumbing You
Can Count On.
```

**Sub:** `text-base text-muted-forground mt-6leading-relaxed` — "Con licencia y asegurado plomeros que prestan servicios en el área metropolitana llegamos a tiempo, lo arreglamos correctamente y dejamos su casa más limpia de lo que la encontramos". 

**CTA:** `flex flex-wrap gap-3 mt-9`
```tsx
{/* Primary */}
<a href="tel:5550123456"
  className="h-12 px-8 rounded-xl inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap bg-primary text-white text-sm font-bold glow-blue">
  <Phone className="w-4 h-4 shrink-0" />
  Call Now — (555) 012-3456
</a>

{/* Secondary */}
<button
  className="h-12 px-8 rounded-xl inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap border border-border text-white text-sm font-medium hover:border-primary/50 transition-colors">
  <ClipboardList className="w-4 h-4 shrink-0" />
  Get a Free Quote
</button>
```

**Insignias de confianza:** `flex flex-wrap gap-x-6 gap-y-3. mt-10 pt-8 borde-t borde-borde`
Each: `flex items-center gap-2 text-sm text-silenciado-primer plano encogimiento-0`
- `<ShieldCheck className="w-4 h-4 text-primary shrink-0" />` + "Con licencia y asegurado"
- `<Clock className="w-4 h-4 text-primary shrink-0" />` + "60-Min Respuesta"
- `<Star className="w-4 h-4 text-primary shrink-0" />` + "Calificación 5 estrellas"
- `<Wrench className="w-4 h-4 text-primary shrink-0" />` + "15 años de experiencia"

---

### 3 — Servicios

- `py-24 md:py-32 bg-[hsl(var(--background))]`
- max-w-[1120px] mx-auto px-6
- Etiqueta: `text-xs font-semibold mayúsculas seguimiento-[0.2em] text-primary mb-4` — "Lo que arreglamos"
- H2: `text-4xl md:text-5xl font-extrabold track-tight text-white` — "Cada problema de plomería. Una llamada". 
- Sub: `text-sm text-muted-foreground mt-4 max-w-[480px]` — "Desde grifos que gotean hasta reemplazos completos de tuberías, residenciales y comerciales, en toda el área metropolitana". 
- Grid: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-14`

**Tarjeta:** `redondeado-2xl p-6 grupo de bordes hover:border-primary/30 transición-toda la duración-300` + vidrio CSS
- Icono: `w-9 h-9 text-primary mb-5 group-hover:scale-110 transición-transformación encogimiento-0`
- Título: `text-base font-bold text-white mb-2`
- Cuerpo: `text-sm text-silenciado-primer plano líder-relajado`
- Barra inferior: `h-px w-0 bg-primary group-hover:w-transición completa-toda la duración-500 mt-5`

| Icono | Título | Descripción|
|---|---|---|
| `Gotitas` | Reparaciones de emergencia | Tuberías rotas, fugas importantes, falta de agua: disponible las 24 horas, los 7 días de la semana, normalmente en el sitio en una hora. |
| `Termómetro` | Calentador de agua | Instalación, reparación y reemplazo de calentadores de agua con y sin tanque. El agua caliente se restableció rápidamente. |
| `Olas` | Limpieza de desagües | Lavabos, duchas o inodoros bloqueados limpiados con equipo de calidad profesional. No queda ningún desorden. |
| `Baño` | Accesorios de baño | Instalaciones completas de plomería para baños: bañeras, duchas, lavabos e inodoros equipados con los más altos estándares. |
| `GitBranch` | Reparación de tuberías | Tuberías con fugas, corroídas o agrietadas reparadas o revestidas sin excavación innecesaria. |
| `Edificio2` | Comercial | Oficinas, restaurantes y edificios de unidades múltiples. Mantenimiento programado y llamadas reactivas. |

---

### 4 — Estadísticas

- `py-20 bg-[hsl(var(--muted))]`
- max-w-[1120px] mx-auto px-6
- `grid grid-cols-2 md: grid-cols-4 gap-8 text-center`

| Objetivo | Sufijo | Etiqueta |
|---|---|---|
| 2400 | + | Trabajos completados |
| 15 | años | En el negocio |
| 60 | mín. | Promedio Respuesta |
| 98 | % | Clientes satisfechos |

Ecada bloque:
- Número+sufijo: `text-5xl font-extrabold text-primary tabular-nums` — contador animado
- Etiqueta: `text-xs font-semibold mayúsculas seguimiento-[0.16em] texto-silenciado-primer plano mt-2`
- Escritorio: borde derecho `border-r border-border` en los primeros 3, eliminado en el móvil

---

### 5 — Cómo funciona

- `py-24 md:py-32 bg-[hsl(var(--background))]`
- max-w-[1120px] mx-auto px-6
- Etiqueta: "Nuestro proceso" · H2: `text-4xl md:text-5xl font-extrabold track-tight text-white` — "Solucionado en tres sencillos pasos".
- Cuadrícula: `grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 relativo`
- Conexión de línea discontinua (solo escritorio): `absolute top-7 izquierda-[20%] derecha-[20%] h-px borde-t borde-punto discontinuo-borde oculto md:bloque`

**Paso:**
- Cuadro numérico: `w-14 h-14 redondeado-2xl bg-primario/10 borde borde-primario/20 en línea-flexelementos-centro justificar-centro texto-xl fuente-extrabold texto-primario mb-6 encoger-0`
- Título: `text-lg fuente-negrita texto-blanco mb-3`
- Cuerpo: `text-sm texto-silenciado-primer plano líder-relajado`

| # | Título | Cuerpo |
|---|---|---|
| 01 | Llame o reserve en línea | Llámanos directamente o rellena el formulario rápido. Díganos qué sucede; le daremos una estimación honesta por teléfono. |
| 02 | Llegamos rápido | Un plomero autorizado llega a su puerta a tiempo con todo lo necesario para diagnosticar y solucionar el problema. |
| 03 | Problema resuelto | Lo arreglamos bien la primera vez, limpiamos lo que ensuciamos y hacemos un seguimiento para asegurarnos de que todo funcione perfectamente. |

---

### 6 — Testimonios

- `py-24 md:py-32 bg-[hsl(var(--muted))]`
- max-w-[1120px] mx-auto px-6
- H2: `text-4xl font-extrabold tracking-tight text-white mb-14` — "No confíe en nuestra palabra". 
- Cuadrícula: `grid grid-cols-1 md:grid-cols-3 gap-5`

**Tarjeta:** `redondeado-2xl p-6` + vidrio CSS
- Estrellas: `flex gap-0.5 mb-4` — 5× `<Star className="w-4 h-4 text-primary fill-primary" />`
- Cita: `text-sm texto-primer plano líder-relajado`
- Fila de autor: `flex items-center gap-3 mt-5`
 - Avatar: `w-9 h-9 rounded-full bg-primary/20 inline-flex items-center justificar-centro texto-texto primario-xs fuente-negrita reducir-0` — iniciales
 - `<div><p className="text-sm font-semibold text-white">Name</p><p className="text-xs text-muted-foreground">Service</p></div>`

| Cita | Autor | Servicio |
|---|---|---|
| "Llegué en 45 minutos un domingo por la mañana. Reparamos una tubería reventada debajo del fregadero de la cocina de forma rápida y limpia. Siempre usaré SWIFT". | Marcos T. | Reparación de emergencia |
| "Muy profesional y honesto. Me dio una cotización clara por adelantado, la cumplí y terminé antes de lo previsto. Altamente recomendado". | Lisa R. | Grifería de baño |
| "Tenía un desagüe bloqueado que otros dos plomeros no pudieron arreglar. SWIFT lo solucionó en menos de una hora. Servicio excelente, precio justo". | James K. | Limpieza de desagües |

---

### 7 — Emergencia CTA

- `relativo py-24 md:py-32 overflow-hidden`

```tsx
{/* Image: close-up of dripping water pipe, dramatic dark background, high contrast, urgent mood */}
<img src="" alt="Emergency plumbing" className="absolute inset-0 w-full h-full object-cover object-center" />
<div className="absolute inset-0 bg-[rgba(14,20,32,0.92)]" />
<div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-transparent" />
```

- Contenido: `relativo z-10 max-w-[720px] mx-autopx-6 text-center`
- Etiqueta: `text-xs font-semibold mayúsculas seguimiento-[0.2em] text-primary mb-4 inline-flex items-center justify-center gap-2`
 - `<span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />` + "Línea de emergencia 24/7"
- H2: `text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold tracking-tight leading-tight text-white` — "¿Emergencia de plomería? Estaremos allí".
- Sub: `text-sm text-muted-foreground mt-5` — "Sin cargos por llamadas fuera del horario de atención. Plomeros con licencia disponibles las 24 horas para reparaciones urgentes".

```tsx
<a href="tel:5550123456"
  className="mt-10 h-14 px-12 rounded-xl inline-flex items-center justify-center gap-3 shrink-0 whitespace-nowrap bg-primary text-white text-base font-bold glow-blue">
  <Phone className="w-4 h-4 shrink-0" />
  Call (555) 012-3456 Now
</a>
```

- Letra pequeña: `text-xs text-muted-foreground/50 mt-5` — "Llegada promedio al sitio: 60 minutos o menos"

---

### 8 — Pie de página

- `py-14 border-t border-[hsl(var(--border))]`
- max-w-[1120px] mx-auto px-6
- `grid grid-cols-1 md:grid-cols-3 gap-10 items-start`
- Col 1: Logotipo + eslogan `text-sm text-muted-foreground mt-3 líder-relajado` — "Plomeros con licencia y asegurados que prestan servicios en el área metropolitana desde 2010". + `text-xs text-muted-foreground mt-4` — "© 2025 SWIFT Plumbing"
- Col 2: encabezado "Servicios" + lista de enlaces `text-sm text-muted-foreground hover:text-white Transition-colors` — Emergencia · Calentador de agua · Limpieza de desagües · Baño · Reparación de tuberías · Comercial
- Col 3: encabezado "Contacto" + Filas `flex items-center gap-2 text-sm text-silenciado-primer plano`:
 - `<Phone className="w-4 h-4 shrink-0 text-primary" />` + "(555) 012-3456"
 - `<Mail className="w-4 h-4 shrink-0 text-primary" />` + "hello@swiftplumbing.com"
 - `<MapPin className="w-4 h-4 shrink-0 text-primary" />` + "Al servicio del área metropolitana"

---

## Animaciones

```
Navbar: opacity 0 → 1, duration 0.4s
Hero label + pulse: opacity 0, y 12 → 0, delay 0.1s, duration 0.45s
Hero H1 (per line): delay 0.2s + index*0.1, duration 0.6s, blur 8px → 0
Hero sub: delay 0.5s, duration 0.5s
Hero CTAs: delay 0.65s, y 16 → 0, opacity 0 → 1
Hero trust badges: stagger delay 0.8s + index*0.08
Hero image: scale 1.06 → 1.0, duration 1.4s ease easeOut on load
Services cards: whileInView, stagger 0.08s, y 32 → 0, opacity 0 → 1
Stats: whileInView once → trigger counters + y 20 → 0, stagger 0.1s
Process steps: whileInView, stagger 0.12s, y 28 → 0
Testimonials: whileInView, stagger 0.09s, y 24 → 0
Emergency CTA block: scale 0.97 → 1, opacity 0 → 1, duration 0.65s
```

---

## Responsive

```
Navbar: full links desktop → logo + phone button only mobile
Hero H1: clamp(2.8rem, 6vw, 5.2rem) auto-scales
Hero CTAs: flex-row desktop → flex-col w-full max-w-[320px] mx-auto mobile
Hero trust badges: flex-wrap, 2-per-row mobile
Services: 3-col → 2-col tablet → 1-col mobile
Stats: 4-col → 2×2 grid mobile, remove right borders mobile
Process: 3-col → 1-col mobile, dashed line hidden mobile
Testimonials: 3-col → 1-col mobile
Emergency H2: clamp(2.4rem, 6vw, 4.5rem) auto-scales
Footer: 3-col → stacked 1-col mobile
```

---

## Copia completa

| Elemento | Copiar |
|---|---|
| Marca | Plomería SWIFT |
| Enlaces de navegación | Servicios · Acerca de · Áreas · Contacto |
| CTA de navegación | (555) 012-3456 |
| Etiqueta de héroe | Disponible 24/7 · Servicio de Emergencia |
| Héroe H1 | Rápido, confiable/plomería en la que puede confiar. |
| Sub héroe | Plomeros autorizados y asegurados que prestan servicios en el área metropolitana. Llegamos a tiempo, lo arreglamos correctamente y dejamos su casa más limpia de lo que la encontramos. |
| Héroe CTA primario | Llame ahora — (555) 012-3456 |
| Héroe CTA secundario | Obtenga gratisCita |
| Insignias de confianza | Con licencia y asegurado · Respuesta de 60 minutos · Calificación de 5 estrellas · 15 años de experiencia |
| Etiqueta de servicios | Lo que arreglamos |
| Servicios H2 | Cada problema de plomería. Una llamada. |
| Estadísticas | Más de 2400 trabajos · 15 años en el negocio · Respuesta de 60 minutos · 98% de satisfacción |
| Etiqueta de proceso | Nuestro Proceso |
| Proceso H2 | Se soluciona en tres sencillos pasos. |
| Testimonios H2 | No confíe en nuestra palabra. |
| Etiqueta de emergencia | Línea de Emergencia 24/7 |
| Emergencia H2 | ¿Emergencia de fontanería? Estaremos allí. |
| Submarino de emergencia | Sin cargos por llamadas fuera del horario de atención. Plomeros autorizados disponibles las 24 horas para reparaciones urgentes. |
| CTA de emergencia | Llama al (555) 012-3456 Ahora |
| Letra pequeña de emergencia | Llegada promedio al sitio: 60 minutos o menos |
| Lema de pie de página | Plomeros autorizados y asegurados que prestan servicios en el área metropolitana desde 2010. |
| Pie de página © | © 2025 SWIFT Plumbing |

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx"
}
```