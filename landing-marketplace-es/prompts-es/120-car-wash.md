# Gleam Auto Spa — Aviso del sitio web de lavado de autos
### websiteprompts.ai — Listo para producción para Lovable, Bolt, v0, Claude, Cursor

---

## 1. DECLARACIÓN DE OBJETIVO

Construir un lavado de autos y auto premium con todas las funciones sitio web de detalles para **Gleam Auto Spa**: un sitio de una sola página limpio, preciso y de alta conversión en azul marino intenso y cian eléctrico que comunica calidad profesional, impulsa reservas en línea y vende paquetes de servicios adicionales.

---

## 2. TECH STACK

- **React 18 + Vite 5 + TypeScript**
- **Tailwind CSS v3** (modo JIT)
- **Framer Motion** — importar exclusivamente desde `motion/react`
- **shadcn/ui** — Componentes de tarjeta, insignia y botón
- **lucide-react** — íconos (Check, ChevronRight, MapPin, Reloj, Estrella, Teléfono, Gotitas, Coche, Zap, Escudo)
- **Google Fonts** — Space Grotesk + Inter

---

## 3. SISTEMA DE DISEÑO

Agregue esto a su CSS global (`index.css` o `globals.css`):

```css
:root {
  /* Core palette */
  --color-navy:          8 24 40;       /* #081828 — deep background */
  --color-navy-mid:      12 34 56;      /* #0c2238 — card backgrounds */
  --color-navy-lift:     16 44 72;      /* #102c48 — elevated surfaces */
  --color-navy-light:    20 56 90;      /* #14385a — borders/dividers */
  --color-cyan:          0 180 204;     /* #00b4cc — primary accent */
  --color-cyan-bright:   0 210 240;     /* #00d2f0 — hover states */
  --color-cyan-pale:     0 180 204;     /* same, used at low opacity */
  --color-white:         240 248 255;   /* #f0f8ff — primary text */
  --color-white-muted:   180 210 230;   /* #b4d2e6 — secondary text */
  --color-white-faint:   100 140 170;   /* #648caa — muted text */

  /* Semantic tokens */
  --bg-page:             rgb(var(--color-navy));
  --bg-card:             rgb(var(--color-navy-mid));
  --bg-card-hover:       rgb(var(--color-navy-lift));
  --text-primary:        rgb(var(--color-white));
  --text-secondary:      rgb(var(--color-white-muted));
  --text-muted:          rgb(var(--color-white-faint));
  --accent:              rgb(var(--color-cyan));
  --accent-hover:        rgb(var(--color-cyan-bright));
  --border-subtle:       rgba(var(--color-cyan) / 0.12);
  --border-cyan:         rgba(var(--color-cyan) / 0.5);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
```

---

## 4. TYPOGRAPHY

**Importación de fuentes de Google**: colóquelo en `<head>` o mediante `@import` en la parte superior de CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```

**Reglas de uso:**

| Elemento | Fuente | Peso | Tamaño |
|---|---|---|---|
| Todos `<h1>` | Espacio Grotesco | 800 | clamp(52px, 8vw, 140px) |
| Todos `<h2>` | Espacio Grotesco | 800 | clamp(36px, 4.5vw, 72px) |
| Subtítulos de la sección `<h3>` | Espacio Grotesco | 700 | clamp(24px, 2.5vw, 40px) |
| Copia del cuerpo | Inter | 300 | 17px / 1,7 altura de línea |
| Etiquetas, etiquetas, navegación | Inter | 500 | Seguimiento de 12 a 13 píxeles: [0,08 em] mayúsculas |
| Precios | Espacio Grotesco | 800 | heredar tamaño |
| Números de estadísticas | Espacio Grotesco | 800 | clamp(56px, 8vw, 100px) |
| Números de paso (bg) | Inter | 800 | 80px |
| Marca de agua | Espacio Grotesco | 800 | clamp(200px, 30vw, 460px) |

---

## 5. EFECTOS VISUALES

### Efecto 1: Gota de agua CSS animada (elemento característico del héroe)

A Una sola gota de agua animada cae de arriba a abajo del área de contenido del héroe y luego se divide en tres gotas más pequeñas que se abrenhacia afuera y se desvanecen. CSS puro `@keyframes`, sin JS. Se ejecuta en un bucle de intervalo de 4 segundos.

```css
/* Add to global CSS */

@keyframes droplet-fall {
  0%   { transform: translateY(0) scale(1);   opacity: 0; }
  5%   { opacity: 0.8; }
  80%  { transform: translateY(280px) scale(1); opacity: 0.8; }
  100% { transform: translateY(300px) scale(1); opacity: 0; }
}

@keyframes droplet-split-left {
  0%   { transform: translate(0, 0) scale(1);        opacity: 0; }
  10%  { opacity: 0.6; }
  100% { transform: translate(-28px, 30px) scale(0.5); opacity: 0; }
}

@keyframes droplet-split-center {
  0%   { transform: translate(0, 0) scale(1);       opacity: 0; }
  10%  { opacity: 0.6; }
  100% { transform: translate(0, 42px) scale(0.4);  opacity: 0; }
}

@keyframes droplet-split-right {
  0%   { transform: translate(0, 0) scale(1);        opacity: 0; }
  10%  { opacity: 0.6; }
  100% { transform: translate(28px, 30px) scale(0.5); opacity: 0; }
}

.droplet-container {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  pointer-events: none;
  animation: droplet-fall 4s ease-in infinite;
}

.droplet-main {
  width: 14px;
  height: 18px;
  background: rgb(0, 180, 204);
  border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
  margin: 0 auto;
  opacity: 0.7;
}

.droplet-split-group {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: none;
}

/* Trigger split group at 80% of 4s = 3.2s */
.droplet-container:nth-child(1) .droplet-split-group {
  animation: droplet-split-center 0.8s ease-out 3.2s infinite;
}
```

Implementación completa en TSX:

```tsx
// components/WaterDroplet.tsx
export function WaterDroplet() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="droplet-container">
        <div className="droplet-main" />
      </div>
      {/* Split droplets — absolutely positioned at impact point */}
      <div className="absolute pointer-events-none"
           style={{ top: "calc(60px + 300px)", left: "50%", transform: "translateX(-50%)" }}>
        <div style={{
          position: "absolute",
          width: "8px", height: "10px",
          background: "rgb(0,180,204)",
          borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
          animation: "droplet-split-left 0.7s ease-out 3.18s infinite",
          opacity: 0,
        }} />
        <div style={{
          position: "absolute",
          width: "8px", height: "10px",
          background: "rgb(0,180,204)",
          borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
          animation: "droplet-split-center 0.7s ease-out 3.18s infinite",
          opacity: 0,
        }} />
        <div style={{
          position: "absolute",
          width: "8px", height: "10px",
          background: "rgb(0,180,204)",
          borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
          animation: "droplet-split-right 0.7s ease-out 3.18s infinite",
          opacity: 0,
        }} />
      </div>
    </div>
  );
}
```

### Efecto 2: texto de marca de agua de fondo

Renderizar "GLEAM" en Space Grotesk 800 en `clamp(200px, 30vw, 460px)`, cian con 2,5% de opacidad, lado derecho del héroe, parcialmente fuera de la pantalla.

```tsx
<span
  aria-hidden="true"
  className="absolute top-1/2 right-0 -translate-y-1/2 select-none pointer-events-none font-space font-extrabold leading-none"
  style={{
    fontSize: "clamp(200px, 30vw, 460px)",
    color: "rgba(0, 180, 204, 0.025)",
    transform: "translateY(-50%) translateX(18%)",
    lineHeight: 0.9,
  }}
>
  GLEAM
</span>
```

### Efecto 3: números de pasos descoloridos detrás de cómo funciona

Números grandes de Inter 800 ("01", "02", "03") en 80px, cian con 6% de opacidad, renderizado absolutamente detrás de cada tarjeta de paso:

```tsx
<div className="relative">
  <span
    aria-hidden="true"
    className="absolute -top-6 -left-4 font-inter font-extrabold leading-none select-none pointer-events-none"
    style={{ fontSize: "80px", color: "rgba(0,180,204,0.06)", zIndex: 0 }}
  >
    {String(index + 1).padStart(2, "0")}
  </span>
  <div className="relative z-10">{/* step content */}</div>
</div>
```

### Efecto 4: Punto cian pulsante (tarjeta de tiempo de espera)

A Punto cian pulsante continuo que indica el estado en vivo, usando Framer Movimiento:

```tsx
<motion.span
  className="inline-block rounded-full"
  style={{ width: "8px", height: "8px", background: "rgb(0,180,204)" }}
  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
/>
```

### Efecto 5: entrada de escala escalonada para tarjetas de servicio

Las tarjetas de paquetes de servicio se animan desde escala 0,95 + opacidad 0 → escala 1 + opacidad 1 usando Framer Motion stagger:

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};
const cardVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};
```

### Efecto 6: estadísticas de conteo en desplazamiento (fondo cian)

El mismo gancho `useCountUp` como estándar: se activa una vez a través de `useInView`, easyOutCubic en más de 1600 ms, escalonado 150 ms por estadística. Aplicado a la tira Trust Stats con fondo cian.

```tsx
function useCountUp(target: number, duration = 1600, delay = 0): number {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return count;
}
```

---

## 6. DESGLOSE DE COMPONENTES

---

### SECCIÓN 1 — NAVBAR

**Diseño:** Parte superior fija, `backdrop-blur-md`, fondo `rgba(8,24,40,0.88)`, borde inferior `rgba(0,180,204,0.12)`. Alto: 72px escritorio / 64px móvil. z-50.

**Estructura del escritorio (izquierda → derecha):**
```
[Logo]   [flex-1]   [Nav links × 4]   [gap-8]   [CTA Button]
```

**Logotipo:** "GLEAM" en Space Grotesk 800, 24px, cian. Seguido de "AUTO SPA" en Inter 300, 14px, `var(--text-secondary)`, ml-1.5 alineado con la línea de base. O renderice como una unidad: `GLEAM AUTO SPA` con "GLEAM" en cian y el resto en blanco silenciado.

**Enlaces de navegación** (Inter 500, 13px, seguimiento-[0.07em], mayúsculas, blanco silenciado, desplazamiento → cian, transición 200 ms):
- Servicios
- Cómo Works
- Antes y después
- Membresía

**Botón CTA:** "Reservar ahora": fondo cian `rgb(0,180,204)`, texto azul marino `rgb(8,24,40)`, Space Grotesk 700, seguimiento de mayúsculas de 13 píxeles-[0.07em], px-6 py-2.5, radio de borde 0 (nítido), flotar:`rgb(0,210,240)`, transición 200ms. Agregue el ícono Lucide `ChevronRight` (tamaño 4) en línea después del texto.

**Móvil:** Hamburguesa (lucide `Menú`, 22 px, blanco). Cajón desde la derecha, altura completa, fondo azul marino, eslabones apilados, py-5 cada uno.

---

### SECCIÓN 2 — HERO

**Contenedor:** `relative min-h-screen overflow-hidden flex flex-col justify-center px-6 md:px-20`

**Imagen de fondo:**
```jsx
{/* Image: Aerial overhead view of a luxury car being washed — deep navy vehicle with water cascading across the roof and bonnet, white soap suds creating abstract patterns on dark paint, high-contrast, studio-quality automotive photography, blue and white tones, precision and premium feel */}
<img
  src=""
  alt="Premium car wash at Gleam Auto Spa"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>
```

**Superposición de degradado:**
```tsx
{/* Left-to-right dark overlay keeping right side more visible */}
<div
  className="absolute inset-0 z-[1]"
  style={{ background: "linear-gradient(105deg, rgba(8,24,40,0.92) 0%, rgba(8,24,40,0.7) 45%, rgba(8,24,40,0.3) 100%)" }}
/>
{/* Bottom fade for any text overflow */}
<div
  className="absolute bottom-0 left-0 right-0 h-32 z-[1]"
  style={{ background: "linear-gradient(to top, rgb(8,24,40), transparent)" }}
/>
```

**Animación de gotas de agua (z-[2]):** `<WaterDroplet />` — colocado sobre el área de contenido izquierda.

**Bloque de contenido (relativo z-10, max-w-3xl):**
```
<p style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "13px", letterSpacing: "0.08em", color: "rgb(0,180,204)", textTransform: "uppercase", marginBottom: "20px" }}>
  Premium Auto Care · Marlow, Berkshire
</p>
<h1 style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: "clamp(52px,8vw,140px)", color: "rgb(240,248,255)", lineHeight: 0.92, letterSpacing: "-0.02em" }}>
  YOUR CAR DESERVES BETTER.
</h1>
<p style={{ fontFamily: "Inter", fontWeight: 300, fontSize: "18px", lineHeight: "1.7", color: "rgb(180,210,230)", marginTop: "28px", maxWidth: "460px" }}>
  Professional car washing and detailing services with industry-leading products, zero shortcuts, and a guarantee you'll love the result.
</p>
[Button row, mt-10, flex gap-4 flex-wrap]:
  Button 1: "Book a Wash" — cyan bg, navy text, Space Grotesk 700, 14px uppercase, px-8 py-3.5, rounded-none
  Button 2: "View Packages" — transparent, border 1px solid rgba(0,180,204,0.5), cyan text, same sizing, hover border-cyan
```

**Tarjeta flotante "TIEMPO DE ESPERA ACTUAL" (absoluta abajo-8 derecha-6 md:derecha-10, z-20):**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9, y: 16 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.55, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
  style={{
    background: "rgba(8,24,40,0.80)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(0,180,204,0.25)",
    padding: "20px 24px",
    minWidth: "200px",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
    {/* Pulsing cyan dot */}
    <motion.span
      style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgb(0,180,204)", display: "inline-block" }}
      animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    />
    <span style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "11px", letterSpacing: "0.08em", color: "rgb(0,180,204)", textTransform: "uppercase" }}>
      Current Wait Time
    </span>
  </div>
  <p style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: "36px", color: "rgb(240,248,255)", lineHeight: 1, marginBottom: "12px" }}>
    ~8 <span style={{ fontSize: "16px", fontWeight: 400, fontFamily: "Inter", color: "rgb(180,210,230)" }}>minutes</span>
  </p>
  <a href="#book" style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "13px", color: "rgb(0,180,204)", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
    Book ahead → 
  </a>
</motion.div>
```

**Marca de agua:** "GLEAM" — `absolute top-1/2 right-0`, -translateY-1/2, Space Grotesk 800, `clamp(200px,30vw,460px)`, `rgba(0,180,204,0.025)`, `translateX(18%)`, z-[1], pointer-events-none select-none.

---

### SECCIÓN 3: PAQUETES DE SERVICIOS

**Diseño:** Fondo `var(--bg-page)` (azul marino), py-24, px-6 md:px-20.

**Encabezado de sección (centrado, mb-16):**
```
Label: "CHOOSE YOUR SERVICE" — Inter 500 11px cyan uppercase tracking-[0.08em] mb-4
H2: "Three Ways to Shine." — Space Grotesk 800 clamp(36px,4.5vw,72px) white
Subline: "From a quick refresh to a full showroom finish — every wash uses professional-grade products." — Inter 300 17px white-muted mt-4 max-w-xl mx-auto text-center
```

**3 tarjetas en `grid grid-cols-1 md:grid-cols-3 gap-0`: sin espacios, las tarjetas comparten bordes:**

Apply Framer Motion `variantes` para entrada escalonada (escala 0,95→1, opacidad 0→1, y 20→0, 500ms, escalonamiento 120ms).

**Estilo de la base de la tarjeta:**
```
background: rgb(12,34,56)    [navy-mid]
border: 1px solid rgba(0,180,204,0.1)
border-radius: 0  [sharp corners]
padding: p-8 md:p-10
position: relative
overflow: hidden
on hover: border-color rgba(0,180,204,0.5), transition 300ms
```

**Tarjeta — EXPRESS:**
```
Top chip: "MOST POPULAR" — hidden on this card
Price row: "£12" in Space Grotesk 800, clamp(48px,5vw,72px), cyan + "/wash" Inter 300 16px white-muted self-end mb-1
Name: "Express Wash" — Space Grotesk 700, 22px, white, mt-0
Tagline: "Clean, fast, done." — Inter 300, 14px, white-muted, mt-2 mb-6
Divider: 1px rgba(0,180,204,0.15) horizontal line
Features list (mt-6, flex flex-col gap-3):
  ✓ Exterior hand wash
  ✓ Wheel clean & rinse
  ✓ Window wipe
  ✓ Air dry
  [Check icon: lucide Check, size-4, cyan, mr-3]
  [Feature text: Inter 300, 14px, white-muted]
CTA button (mt-8): "Book Express" — border 1px solid rgba(0,180,204,0.4), cyan text, Inter 500 13px uppercase tracking-[0.07em], px-6 py-3, rounded-none, w-full, hover: bg-cyan text-navy
```

**Tarjeta — FIRMA (destacada, en el medio):**
```
Top chip (absolute top-4 right-4): "MOST POPULAR" — cyan bg, navy text, Inter 500 10px uppercase tracking-[0.07em], px-3 py-1, rounded-none
Background: rgb(16,44,72) [navy-lift, slightly elevated]
Border: 1px solid rgba(0,180,204,0.35)
Price: "£22" same styling as above
Name: "Signature Wash" — Space Grotesk 700, 22px, white
Tagline: "Our full exterior service." — Inter 300, 14px, white-muted, mt-2 mb-6
Features list:
  ✓ Full exterior hand wash
  ✓ Wheel & tyre clean
  ✓ Glass clean inside & out
  ✓ Door sill wipe
  ✓ Tyre dressing
  ✓ Hand dry with microfibre
CTA button: "Book Signature" — solid cyan bg, navy text, hover bg-cyan-bright, w-full
```

**Tarjeta — COMPLETA DETALLE:**
```
Price: "£45" same styling
Name: "Full Detail" — Space Grotesk 700, 22px, white
Tagline: "Showroom finish, guaranteed." — Inter 300, 14px, white-muted
Features list:
  ✓ Everything in Signature
  ✓ Full interior vacuum
  ✓ Leather / fabric wipe
  ✓ Dashboard & console clean
  ✓ Air freshener
  ✓ Wax & paint sealant
  ✓ Ceramic coat option (+£35)
CTA button: "Book Detail" — border style, same as Express
```

---

### SECCIÓN 4 — CÓMO FUNCIONA

**Diseño:** Fondo `rgb(12,34,56)` (navy-mid), py-24, px-6 md:px-20.

**Encabezado de sección (centrado, mb-20):**
```
Label: "THE PROCESS" — Inter 500 11px cyan uppercase tracking-[0.08em] mb-4
H2: "Simple. Fast. Spotless." — Space Grotesk 800 clamp(36px,4.5vw,64px) white
```

**3 pasos en `grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6`:**

Cada paso — `relative`:
```
Background faded number (absolute -top-6 -left-4, z-0):
  "01" / "02" / "03" — Inter 800, 80px, rgba(0,180,204,0.06), pointer-events-none
Step content (relative z-10):
  Icon circle: 52px × 52px, border 1px solid rgba(0,180,204,0.3), rounded-none, flex items-center justify-center mb-6
    lucide icon (size-6, cyan stroke, strokeWidth 1.5)
  Step label: Inter 500, 11px, cyan, uppercase, tracking-[0.08em], mb-3
    "STEP 01" / "STEP 02" / "STEP 03"
  Heading: Space Grotesk 700, 22px, white, mb-4
  Body: Inter 300, 15px, white-muted, leading-[1.75]
```

**Paso 1:** Icono: `Car` (lucide). Título: "Conducir". Cuerpo: "Entra directamente en una de nuestras 12 bahías; no se necesita cita previa para los lavados Express o Signature. Simplemente preséntate". 

**Paso 2:** Icono: `Gotas`(lucidez). Título: "Nos ponemos a trabajar". Cuerpo: "Nuestro equipo capacitado comienza a usar inmediatamente champús con pH neutro, guantes de microfibra y herramientas profesionales. Sin cepillos ni rayones". 

**Paso 3:** Icono: `Zap` (lucide). Título: "Conduce limpio". Cuerpo: "Recoge las llaves y listo. Los lavados exprés tardan 12 minutos. Los detalles completos suelen estar listos en 90 minutos". 

Enimación de entrada por paso: opacidad 0→1, y 30→0, 600 ms, escalonado 150 ms, facilidad de salida, se activa una vez al desplazarse inView.

---

### SECCIÓN 5 — ANTES / DESPUÉS

**Diseño:** Fondo `var(--bg-page)` (azul marino), py-24, px-6 md:px-20.

**Encabezado de sección (centrado, mb-16):**
```
Label: "THE DIFFERENCE" — Inter 500 11px cyan uppercase tracking-[0.08em] mb-4
H2: "See It for Yourself." — Space Grotesk 800 clamp(36px,4.5vw,64px) white
```

**Bloque de comparación de dos columnas:** `grid grid-cols-2 gap-0 relativo max-w-4xl mx-auto`: los dos paneles se ubican uno al lado del otro. Una línea cian vertical (1px, altura completa de la cuadrícula, centro absoluto) los separa.

```tsx
<div className="relative max-w-4xl mx-auto grid grid-cols-2">
  {/* Vertical divider */}
  <div
    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-10"
    style={{ width: "1px", background: "rgb(0,180,204)" }}
  />

  {/* BEFORE panel */}
  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
    {/* Image: Dusty unwashed car — grey sedan with visible road grime, dust, and mud splatter across panels and windows, flat overcast lighting, realistic and unsatisfying, documentary photography */}
    <img src="" alt="Car before professional wash at Gleam Auto Spa" className="w-full h-full object-cover object-center" />
    {/* Label chip */}
    <div className="absolute top-4 left-4 z-10" style={{ background: "rgba(8,24,40,0.85)", border: "1px solid rgba(255,255,255,0.15)", padding: "6px 14px" }}>
      <span style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "11px", letterSpacing: "0.08em", color: "rgb(240,248,255)", textTransform: "uppercase" }}>BEFORE</span>
    </div>
  </div>

  {/* AFTER panel */}
  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
    {/* Image: Gleaming freshly-washed car — same grey sedan now spotless and reflective, droplets of water glistening on paint, bright clean studio lighting, high-contrast automotive photography, premium and satisfying */}
    <img src="" alt="Car after professional wash at Gleam Auto Spa" className="w-full h-full object-cover object-center" />
    {/* Cyan overlay tint to reinforce "clean" feeling */}
    <div className="absolute inset-0" style={{ background: "rgba(0,180,204,0.04)" }} />
    {/* Label chip */}
    <div className="absolute top-4 right-4 z-10" style={{ background: "rgb(0,180,204)", padding: "6px 14px" }}>
      <span style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "11px", letterSpacing: "0.08em", color: "rgb(8,24,40)", textTransform: "uppercase" }}>AFTER</span>
    </div>
  </div>
</div>
```

**Debajo de la comparación (mt-12, centro de texto):**
```
P: "Every car gets the same care whether it's a hatchback or a supercar. That's the Gleam guarantee." — Inter 300 16px white-muted max-w-lg mx-auto
CTA link: "Book Your Wash →" — Inter 500 14px cyan hover:underline
```

---

### SECCIÓN 6: ESTADÍSTICAS DE CONFIANZA (FONDO CIAN)

**Diseño:** Ancho completo, fondo `rgb(0,180,204)` (cian), py-20, px-6.

**4 estadísticas en `flex flex-row justificar-centro flex-wrap gap-16 md:gap-24`:**

| Valor | Etiqueta |
|---|---|
| 5.000 | "Autos lavados mensualmente" |
| 99 | "% Tasa de Satisfacción" |
| 2018 | "Establecido" |
| 12 | "Bahías profesionales" |

**Por estadística:**
```tsx
<div className="text-center">
  <p
    className="font-space font-extrabold leading-none"
    style={{ fontSize: "clamp(56px,8vw,100px)", color: "rgb(8,24,40)", letterSpacing: "-0.02em" }}
  >
    {count}{suffix}
  </p>
  <p className="mt-3 font-inter font-medium text-xs uppercase tracking-[0.08em]"
     style={{ color: "rgba(8,24,40,0.65)" }}>
    {label}
  </p>
</div>
```

Sufijos: "5000+" tiene el "+" añadido; "99" tiene "%" añadido; Números básicos "2018" y "12".

Conteo: se dispara una vez al desplazarse en Vista, facilidadOutCubic 1600ms, escalonado 0/150/300/450ms. Para "2018", animar desde 2000→2018 (no desde 0). Para "5000", anime 0→5000 y luego muéstrelo como "5000+".

Móvil: cuadrícula 2×2, espacio-10, py-14.

---

### SECCIÓN 7 — ADD-ONS

**Diseño:** Fondo `rgb(12,34,56)` (azul marino medio), py-20, px-6 md:px-20.

**Encabezado de sección (alineado a la izquierda, mb-10):**
```
Label: "EXTRA SERVICES" — Inter 500 11px cyan uppercase tracking-[0.08em] mb-4
H2: "Upgrade Your Wash." — Space Grotesk 800 clamp(28px,3vw,52px) white
P: "Add any of these to any package at checkout or on arrival." — Inter 300 16px white-muted mt-3
```

**Fila de chip de desplazamiento horizontal:** `overflow-x-auto flex gap-3 pb-3 barra de desplazamiento-ocultar mt-8`

Eachchip:
```
background: rgb(16,44,72)
border: 1px solid rgba(0,180,204,0.2)
padding: px-5 py-3
border-radius: 0
on hover: border-color rgba(0,180,204,0.6), bg-navy-lift
flex-shrink: 0
```

Dentro de cada chip:
```
[service name — Inter 500 14px white]
[price — Inter 500 14px cyan ml-3]
```

**Complementos (7 chips):**
- Aspirador interior · +£8
- Brillo de neumáticos · +£6
- Ambientador · +£3
- Revestimiento cerámico · +£35
- Cera pulidora · +£15
- Acondicionador de cuero · +£20
- Limpieza del compartimento del motor · +£25

Móvil: los chips se desplazan horizontalmente, sin envoltorio.

---

### SECCIÓN 8 — MEMBRESÍA MENSUAL CTA

**Diseño:** Ancho completo, fondo `var(--bg-page)` (azul marino), py-24, px-6 md:px-20. Max-w-4xl mx-auto.

**Bloque de contenido (centrado):**
```
Label: "UNLIMITED WASHES" — Inter 500 11px cyan uppercase tracking-[0.08em] mb-6
H2: "Wash More. Pay Less." — Space Grotesk 800 clamp(36px,5vw,80px) cyan
P: "Our monthly membership gives you unlimited Signature Washes for one fixed monthly fee. Cancel any time, no contracts." — Inter 300 17px white-muted mt-6 mb-12 max-w-2xl mx-auto text-center
```

**3 niveles de membresía en `grid grid-cols-1 md:grid-cols-3 gap-6 mt-12`:**

**BASIC — £19/mes:**
```
background: rgb(12,34,56), border 1px solid rgba(0,180,204,0.15), p-8, rounded-none
Name: "Basic" — Space Grotesk 700, 18px, white, mb-2
Price: "£19" — Space Grotesk 800, 48px, white + "/mo" Inter 300 16px white-muted
Features: Unlimited Express Washes · 10% off Add-Ons
CTA: "Start Basic" — border cyan, cyan text, w-full, px-6 py-3, rounded-none, hover bg-cyan text-navy
```

**FIRMA: £29/mes (destacado):**
```
background: rgb(0,180,204), p-8, rounded-none
Name: "Signature" — Space Grotesk 700, 18px, navy, mb-2
"MOST VALUE" chip — navy bg, cyan text, 10px uppercase, px-3 py-1, absolute top-4 right-4
Price: "£29" — Space Grotesk 800, 48px, navy + "/mo" Inter 300 16px rgba(8,24,40,0.6)
Features (navy text): Unlimited Signature Washes · 15% off Add-Ons · Priority Queue
CTA: "Start Signature" — navy bg, white text, w-full, px-6 py-3, rounded-none, hover bg-navy-lift text-white
```

**PASE DETALLE: £49/mes:**
```
background: rgb(12,34,56), border 1px solid rgba(0,180,204,0.15), p-8
Name: "Detail Pass" — Space Grotesk 700, 18px, white
Price: "£49" — same as Basic
Features: 1× Full Detail/month · Unlimited Signature Washes · 20% off Add-Ons · Priority Queue · Free Air Freshener
CTA: "Start Detail Pass" — border cyan, cyan text, same as Basic CTA
```

**Niveles inferiores (mt-10, centro de texto):**
```
"No contracts. Cancel any time. Membership begins the day you sign up." — Inter 300 14px white-muted
```

---

### SECCIÓN 9 — PIE DE PIE

**Diseño:** Cuadrícula de 3 columnas `grid-cols-1 md:grid-cols-3 gap-12`, fondo `rgb(6,18,30)` (azul marino más intenso), borde superior `1px solid rgba(0,180,204,0.1)`, pt-14 pb-10, px-6 md:px-20.

**Columna 1: Marca:**
```
Logo: "GLEAM AUTO SPA" — Space Grotesk 800, 20px. "GLEAM" in cyan, "AUTO SPA" in white-muted
Tagline: "Premium car washing and detailing in Marlow, Berkshire. Professional products, guaranteed results." — Inter 300 14px white-muted mt-4 max-w-xs leading-relaxed
Social icons (mt-6, flex gap-4): Instagram, Facebook (lucide icons, size-5, white-muted, hover → cyan, transition 200ms)
```

**Columna 2: Ubicación y horario:**
```
Heading: "FIND US" — Inter 500 11px cyan uppercase tracking-[0.08em] mb-4
Address (Inter 300 14px white-muted leading-loose):
  Gleam Auto Spa
  River Road Business Park
  Marlow, SL7 1QT

Hours:
  Mon–Fri:  8:00am – 7:00pm
  Saturday: 8:00am – 6:00pm
  Sunday:   9:00am – 5:00pm

Note: "Last car accepted 30 minutes before close"
```

**Columna 3: Rápido Enlaces:**
```
Heading: "QUICK LINKS" — Inter 500 11px cyan uppercase tracking-[0.08em] mb-4
Links (flex flex-col gap-3, Inter 300 14px white-muted hover:white transition 200ms):
  Services / How It Works / Add-Ons / Memberships / Book Now / Gift Vouchers / Contact Us
```

**Barra de pie de página (mt-12, pt-8, borde superior rgba(0,180,204,0.06)):**
```
flex justify-between flex-wrap gap-4
Left: "© 2024 Gleam Auto Spa. All rights reserved." — 12px, color rgba(100,140,170,0.7)
Right: "Privacy Policy · Terms" — 12px, same color, hover white-muted
```

---

## 7. ANIMACIONES — ESPECIFICACIÓN COMPLETA

| Elemento | Inicial | Final | Duración | Retraso | Flexibilización | Gatillo |
|---|---|---|---|---|---|---|
| Barra de navegación | opacidad 0, y -12 | opacidad 1, y 0 | 400 ms | 0 ms | facilidad | carga de página |
| Etiqueta de héroe | opacidad 0, y 12 | opacidad 1, y 0 | 500 ms | 100 ms | facilidad | carga de página |
| Héroe h1 | opacidad 0, y 40 | opacidad 1, y 0 | 800 ms | 250 ms | [0,25,0,1,0,25,1] | carga de página |
| Sublínea de héroe | opacidad 0, y 24 | opacidad 1, y 0 | 650 ms | 500 ms | facilidad | carga de página |
| Botones de héroe | opacidad 0, y 16 | opacidad 1, y 0 | 550 ms | 700 ms | facilidad | páginacarga |
| Tarjeta de tiempo de espera | opacidad 0, escala 0,9, y 16 | opacidad 1, escala 1, y 0 | 550 ms | 400 ms | resorte [0.34,1.56,0.64,1] | carga de página |
| Punto pulsante | escala 1, opacidad 1 | escala [1,1.6,1], opacidad [1,0.4,1] | 1800 ms | 0 ms | facilidad de entrada y salida | infinito |
| Gota de agua | traducirY 0, opacidad 0 | traducirY 300px, opacidad [0,0.8,0] | 4000 ms | 0 ms | facilidad de entrada | infinito |
| Las gotitas se dividen | en la marca de 3,2 s | desplegarse + desvanecerse | 700 ms | 3,18s | facilidad | desencadenado al 80% de la caída |
| Encabezados de sección | opacidad 0, y 28 | opacidad 1, y 0 | 650 ms | 0 ms | [0,25,0,1,0,25,1] | desplazarse hacia adentroVer una vez |
| Tarjetas de servicio | opacidad 0, escala 0,95, y 20 | opacidad 1, escala 1, y 0 | 500 ms | Escalonamiento de 120 ms | [0,25,0,1,0,25,1] | desplazarse enVer |
| Tarjeta de servicio flotante | frontera rgba(0,180,204,0.1) | borde rgba(0,180,204,0.5) | 300 ms | — | facilidad | flotar |
| Cómo funciona pasos | opacidad 0, y 30 | opacidad 1, y 0 | 600 ms | Escalonamiento de 150 ms | facilidad | desplazarse enVer |
| Paneles Antes/Después | opacidad 0, x ±30 | opacidad 1, x 0 | 700 ms | 0/200 ms | facilidad | desplazarse enVer |
| Conteo de estadísticas | 0 | objetivo | 1600 ms | 0/150/300/450 ms escalonados | facilidadOutCubic | desplazarse hacia adentroVer una vez |
| Fichas complementarias | opacidad 0, x 20 | opacidad 1, x 0 | 400 ms | Escalonamiento de 50 ms | facilidad | desplazarse enVer |
| Tarjetas de membresía | opacidad 0, y 30 | opacidad 1, y 0 | 600 ms | Escalonamiento de 100 ms | facilidad | desplazarse enVer |
| Enlaces de navegación | color blanco apagado | color cian | 200 ms | — | facilidad | flotar |
| Botón de acción | — | brillo +8% | 200 ms | — | facilidad | hover |

---

## 8. DISEÑO RESPONSIVO

### Escritorio (≥1280px)
- Contenedor: max-w-7xl mx-auto px-6 md:px-12 lg:px-20
- Hero: pantalla min-h, centro de contenido alineado con max-w-3xl
- Paquetes de servicios: cuadrícula de 3 columnas, sin espacios
- Cómo funciona: cuadrícula de 3 columnas
- Antes/Después: 2 columnas una al lado de la otra, max-w-4xl centrado
- Estadísticas de confianza: fila flexible de 4 columnas
- Membresía: cuadrícula de 3 columnas
- Pie de página: cuadrícula de 3 columnas

### Tableta (768px–1279px)
- Servicio Paquetes: mantener3 columnas, reducir el relleno a p-6
- Cómo funciona: mantener 3 columnas
- Antes/Después: 2 columnas, reducir la relación de aspecto a 3/2
- Estadísticas de confianza: cuadrícula 2×2
- Membresía: mantener 3 columnas, reducir padding
- Pie de página: mantener 3 columnas, reducir el espacio

### Móvil (<768px)
- Barra de navegación: logotipo + hamburguesa, cajón desde la derecha
- Héroe: min-h-screen; la tarjeta de tiempo de espera se mueve al estilo de ancho completo en la parte inferior izquierda; animación de gotas de agua deshabilitada (ocultar a través de `hidden md:block`) 
- Paquetes de servicios: pila de 1 columna
- Cómo funciona: pila de 1 columna, números de fondo más pequeños (48px)
- Antes/Después: mantenga 2 columnas una al lado de la otra, aspecto más corto (1/1) cuadrado)
- Estadísticas de confianza: cuadrícula de 2 × 2, piso de abrazadera de número de estadística 48px, py-12
- Complementos: desplazamiento horizontal (ocultar barra de desplazamiento)
- Membresía: pila de 1 columna
- Pie de página: pila de 1 columna, gap-10

---

## 9. COPIA COMPLETAY

### Marca y núcleo
- **Nombre:** Gleam Auto Spa
- **Lema:** Su automóvil merece algo mejor.
- **Ubicación:** River Road Business Park, Marlow, SL7 1QT, Berkshire
- **Teléfono:** 01628 551 007
- **Correo electrónico:** book@gleamautospa.co.uk

### Navegación
Servicios · Cómo funciona · Antes y después · Membresía · Reserve ahora

### Hero
- **Pre-headline:** Premium Auto Care · Marlow, Berkshire
- **H1:** SU COCHE MERECE MEJOR.
- **Subline:** Servicios profesionales de lavado y detallado de automóviles con productos líderes en la industria, cero atajos y una garantía de que le encantará resultado.
- **CTA 1:** Reservar un lavado
- **CTA 2:** Ver paquetes

### Tarjeta de tiempo de espera
- Etiqueta de estado: TIEMPO DE ESPERA ACTUAL (con punto pulsante)
- Valor: ~8 minutos
- Enlace: Reserve con antelación →

### Paquetes de servicios
- **Etiqueta:** ELIJA SU SERVICIO
- **H2:** Tres maneras de brillar.
- **Sublínea:** Desde una actualización rápida hasta un acabado completo de exposición: cada lavado utiliza productos de calidad profesional productos.
- **Express:** £12 · "Limpio, rápido, listo". · Reserva Express
- **Firma:** £22 · "Nuestro completoservicio exterior." · Firma del libro · Chip MÁS POPULAR
- **Detalle completo:** £45 · "Acabado de exposición, garantizado." · Detalle del libro

### Cómo funciona
- **Etiqueta:** EL PROCESO
- **H2:** Simple. Rápido. Spotless.
- Paso 1: Entrada en auto: "Entra directamente en una de nuestras 12 bahías; no se necesita cita previa para lavados Express o Signature. Simplemente preséntate."
- Paso 2: Nos ponemos a trabajar: "Nuestro equipo capacitado comienza de inmediato con champús con pH neutro, guantes de microfibra y herramientas profesionales. Sin cepillos ni rayones." 
- Paso 3: Conducir limpio — "Recoge las llaves y listo. Los lavados exprés tardan 12 minutos. Los detalles completos suelen estar listos en 90 minutos."

### Antes/Después
- **Etiqueta:** LA DIFERENCIA
- **H2:** Véalo usted mismo.
- Cita: "Todos los automóviles reciben el mismo cuidado, ya sea un hatchback o un superdeportivo. Esa es la garantía de Gleam."
- CTA: Reserve su lavado →

### Estadísticas de confianza
- 5,000+ · Autos lavados mensualmente
- 99% · Tasa de satisfacción
- Desde 2018 · Establecido
- 12 · Bahías profesionales

### Complementos
- **Etiqueta:** SERVICIOS EXTRA
- **H2:** Actualice su Wash.
- **Sublínea:** Agregue cualquiera de estos a cualquier paquete al finalizar la compra o en llegada.
- Aspirador interior +£8 / Brillo de neumáticos +£6 / Ambientador +£3 / Capa cerámica +£35 / Cera pulidora +£15 / Acondicionador de cuero +£20 / Limpieza del compartimento del motor +£25

### Membresía
- **Etiqueta:** LAVADOS ILIMITADOS
- **H2:** Lave más. Pague menos.
- **Sublínea:** Nuestra membresía mensual le brinda lavados exclusivos ilimitados por una tarifa mensual fija. Cancele en cualquier momento, sin contratos.
- Básico £19/mes / Firma £29/mes - MAYOR VALOR/Pase detallado £49/mes
- Nota de pie de página: No se cancelan los contratos en cualquier momento. registrarse.

### Pie de página
- **Lema:** Lavado y detallado de automóviles de primera calidad en Marlow, Berkshire. Productos profesionales, resultados garantizados.
- **Copyright:** © 2024 Gleam Auto Spa.
- **Legal:** Política de privacidad.Términos

---

## 10. DEPENDENCIAS CLAVE

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^11.11.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.460.0",
    "@shadcn/ui": "latest"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47"
  }
}
```

**componentes shadcn/ui para instalar:**
```bash
npx shadcn@latest add card badge button
```

**Extensión Tailwind `fontFamily` (`tailwind.config.ts`):**
```ts
theme: {
  extend: {
    fontFamily: {
      space: ['"Space Grotesk"', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
  },
}
```

**Importación de Framer Motion: use siempre esto, nunca `framer-motion`:**
```tsx
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react";
```

**Utilidad CSS personalizada `scrollbar-hide`:**
```css
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```
