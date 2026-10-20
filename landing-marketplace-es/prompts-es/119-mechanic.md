# Axle & Co Auto Repair — Sitio web completo Prompt
# websiteprompts.ai

---

## 1. DECLARACIÓN DE OBJETIVO

Cree un sitio web completo y listo para producción para **Axle & Co Auto Repair**, un mecánico independiente y un taller de pruebas MOT, que se comunique experiencia industrial, precios honestos y servicio confiable a través de un sistema de diseño de carbón oscuro, naranja señal y gris claro con pantalla tipo Space Grotesk y animación Framer Motion completa.

---

## 2. TECH STACK

- **Framework:** React 18 + Vite + TypeScript
- **Estilo:** Tailwind CSS v3 (con variables CSS personalizadas)
- **Animación:** Framer Motion (`motion/react`): importe exclusivamente desde `motion/react`, nunca desde `framer-motion`
- **Componentes de UI:** shadcn/ui
- **Iconos:** lucide-react
- **Fuentes:** Google Fonts (Space Grotesk + Plus Jakarta Sans a través de `<link>` en index.html)

---

## 3. DISEÑO SISTEMA

Coloque estas propiedades personalizadas de CSS en `src/index.css` dentro de `:root {}`:

```css
:root {
  /* Core Palette */
  --color-bg:           hsl(216, 14%, 10%);     /* #111418 — deep charcoal */
  --color-surface:      hsl(216, 12%, 14%);     /* #1c2028 — card background */
  --color-surface-mid:  hsl(216, 10%, 18%);     /* #272d35 — elevated surface */
  --color-border:       hsl(216, 10%, 22%);     /* #313840 — subtle border */
  --color-orange:       hsl(22, 97%, 47%);      /* #e85d04 — signal orange */
  --color-orange-hover: hsl(22, 97%, 42%);      /* #d15203 — orange hover */
  --color-orange-glow:  hsla(22, 97%, 47%, 0.18); /* orange ambient glow */
  --color-grey-light:   hsl(0, 0%, 91%);        /* #e8e8e8 — light grey */
  --color-grey-mid:     hsl(0, 0%, 62%);        /* #9e9e9e — mid grey */
  --color-grey-dark:    hsl(0, 0%, 38%);        /* #616161 — dark grey */
  --color-white:        hsl(0, 0%, 100%);

  /* Typography Scale */
  --text-hero:    clamp(50px, 7.5vw, 130px);
  --text-h2:      clamp(32px, 4vw, 60px);
  --text-h3:      clamp(20px, 2.2vw, 28px);
  --text-body:    16px;
  --text-small:   14px;
  --text-label:   12px;

  /* Spacing */
  --section-px:   clamp(24px, 5vw, 96px);
  --section-py:   clamp(64px, 8vw, 120px);

  /* Radius */
  --radius-sm:    6px;
  --radius-md:    12px;
  --radius-lg:    20px;

  /* Transitions */
  --ease-out:     cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);
}
```

Establezca `body { background-color: var(--color-bg); color: var(--color-grey-light); }` globalmente.

---

## 4. TIPOGRAFÍAY

Agregar a `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

**Uso reglas:**
- `font-family: 'Space Grotesk', sans-serif; font-weight: 800;`: TODOS los titulares de visualización (héroe, encabezados de sección, CTA de emergencia, marquesina)
- `font-family: 'Space Grotesk', sans-serif; font-weight: 700;`: logotipo de la barra de navegación, encabezados de tablas de precios, texto de marquesina de confianza
- `font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 400;`: cuerpo del texto, descripciones de tarjetas, pie de página contenido
- `font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600;`: nombres de tarjetas de servicio, enlaces de navegación, chips de precios, etiquetas de CTA
- `font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 300;`: subtítulos, subtítulos y texto de respaldo en la sección de emergencia
- Espaciado entre letras: los titulares utilizan "espaciado entre letras: -0,02em"; las etiquetas usan `letter-spacing: 0.08em; text-transform: uppercase`

---

## 5. EFECTOS VISUALES

### Efecto 1: Degradado horizontal del héroe
```css
background: linear-gradient(
  to right,
  rgba(17, 20, 24, 0.96) 0%,
  rgba(17, 20, 24, 0.80) 40%,
  rgba(17, 20, 24, 0.40) 65%,
  rgba(17, 20, 24, 0.00) 100%
);
```
Aplicado como `absoluto insert-0 z-10` sobre la imagen del héroe. Garantiza que el texto sea legible en todas las composiciones fotográficas sin depender de la ubicación de la imagen.

### Efecto 2: marca de agua de fondo "AXLE"
```jsx
<span
  className="absolute select-none pointer-events-none"
  style={{
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(240px, 34vw, 520px)",
    color: "rgba(232, 232, 232, 0.03)",
    right: "-2%",
    top: "50%",
    transform: "translateY(-50%)",
    lineHeight: 1,
    letterSpacing: "-0.04em",
    zIndex: 5,
    userSelect: "none",
  }}
>
  AXLE
</span>
```
Se ubica entre la capa de la fotografía y lasuperposición de degradado (z-5). Crea identidad de marca sin distraer la atención del contenido.

### Efecto 3: Resplandor naranja en las tarjetas (estado de desplazamiento)
```css
box-shadow: 0 0 0 0 transparent;
transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
```
Al pasar el mouse: `box-shadow: 0 8px 32px var(--color-orange-glow), 0 2px 8px rgba(0,0,0,0.4);`: crea un sutil halo ambiental naranja alrededor de las tarjetas suspendidas.

### Efecto 4: Desplazamiento infinito Marquee
```css
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 35s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
```
Duplica el contenido del texto de confianza una vez para que la animación se repita sin problemas.

### Efecto 5: barra CTA naranja fija (solo para héroes)
A Barra `position: fixed; bottom: 0; left: 0; right: 0; z-index: 100` que se representa solo cuando el usuario está dentro de la ventana gráfica del héroe. Controlado a través de `useEffect` + `IntersectionObserver` en un héroe centinela `<div>`. Se desvanece (`opacity: 0; pointer-events: none`) cuando el héroe sale de la vista.

---

## 6. DESGLOSE DE COMPONENTES

---

### SECCIÓN 1 — NAVBAR

**Diseño:** `position: sticky; top: 0; z-index: 90`
- Fondo: `var(--color-bg)` con `border-bottom: 1px solid var(--color-border)`
- Relleno: `16px var(--section-px)`
- Flex: `justify-between; align-items: center`

**Izquierda: Logotipo:**
```jsx
<div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "22px", color: "var(--color-white)", letterSpacing: "-0.02em" }}>
  AXLE <span style={{ color: "var(--color-orange)" }}>&</span> CO
</div>
```

**Centro: Enlaces de navegación (solo escritorio, ocultos en dispositivos móviles):**
`Servicios · Acerca de · Precios · Reseñas`: representado como `<nav>` con Etiquetas `<a>`, `color: var(--color-grey-mid)`, `familia de fuentes: Plus Jakarta Sans 600`, `tamaño de fuente: 15px`, `espaciado entre letras: 0,01 em`. Al pasar el mouse: `color: var(--color-grey-light)`, transición `0.15s facilidad`.

**Derecha - CTA:**
```jsx
<a href="#booking"
  style={{
    backgroundColor: "var(--color-orange)",
    color: "var(--color-white)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: "15px",
    padding: "10px 20px",
    borderRadius: "var(--radius-sm)",
    textDecoration: "none",
    transition: "background-color 0.15s ease",
  }}
  onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--color-orange-hover)"}
  onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--color-orange)"}
>
  Book Online
</a>
```

**Móvil:** Icono de hamburguesa (Menú de lucide-react), se desliza hacia abajo en un cajón de ancho completo con enlaces apilados verticalmente, mismo oscuro background.

---

### SECCIÓN 2 — HERO

**Contenedor:** `position: relative; height: 100vh; min-height: 640px; overflow: hidden`

**Capa 1 — Foto:**
```jsx
{/* Image: Professional mechanic in a clean navy uniform lying beneath a lifted car on a hydraulic ramp, dramatic underlighting from LED inspection lights casting warm orange/white on engine components. Background shows a tidy garage with tools organized on an orange pegboard. Cinematic wide-angle composition, slight grain, warm industrial atmosphere. */}
<img
  src=""
  alt="Mechanic working beneath a lifted car at Axle & Co garage"
  className="absolute inset-0 w-full h-full object-cover object-center"
  style={{ zIndex: 1 }}
/>
```

**Capa 2: marca de agua "EJE"** (índice z: 5, consulte el efecto 2 arriba)

**Capa 3: superposición de degradado horizontal** (índice z: 10, consulte el efecto 1 arriba)

**Capa 4: Contenido (índice z: 20):**
```jsx
<div
  className="absolute inset-0 flex flex-col justify-center"
  style={{
    zIndex: 20,
    paddingLeft: "var(--section-px)",
    paddingRight: "var(--section-px)",
    maxWidth: "820px",
  }}
>
  {/* Eyebrow label */}
  <motion.p
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      fontSize: "13px",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--color-orange)",
      marginBottom: "20px",
    }}
  >
    Trusted Independent Garage · Est. 2008
  </motion.p>

  {/* Main Headline */}
  <motion.h1
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 800,
      fontSize: "var(--text-hero)",
      color: "var(--color-white)",
      lineHeight: 0.92,
      letterSpacing: "-0.03em",
      marginBottom: "28px",
    }}
  >
    WE FIX WHAT<br />
    <span style={{ color: "var(--color-orange)" }}>OTHERS</span> MISS.
  </motion.h1>

  {/* Subheadline */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 300,
      fontSize: "clamp(16px, 1.8vw, 22px)",
      color: "var(--color-grey-light)",
      maxWidth: "480px",
      lineHeight: 1.6,
      marginBottom: "40px",
    }}
  >
    Honest diagnostics. Fair pricing. Guaranteed work.
  </motion.p>

  {/* CTA Buttons */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
    style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
  >
    <a href="#booking" style={{
      backgroundColor: "var(--color-orange)",
      color: "var(--color-white)",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      fontSize: "16px",
      padding: "14px 28px",
      borderRadius: "var(--radius-sm)",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    }}>
      Book a Service
    </a>
    <a href="tel:02079460823" style={{
      border: "1px solid var(--color-border)",
      color: "var(--color-grey-light)",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      fontSize: "16px",
      padding: "14px 28px",
      borderRadius: "var(--radius-sm)",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "rgba(255,255,255,0.04)",
    }}>
      020 7946 0823
    </a>
  </motion.div>
</div>
```

**Capa 5: indicador de desplazamiento (centro inferior, z-20):**
```jsx
<motion.div
  animate={{ y: [0, 8, 0] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  style={{ position: "absolute", bottom: "80px", left: "50%", transform: "translateX(-50%)", zIndex: 20 }}
>
  <ChevronDown size={28} color="rgba(232,232,232,0.4)" />
</motion.div>
```

**Barra de llamadas fija (Capa 6: nodo DOM independiente en la raíz) nivel):**
```jsx
<motion.div
  initial={{ y: 80, opacity: 0 }}
  animate={heroVisible ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "var(--color-orange)",
    padding: "14px var(--section-px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    pointerEvents: heroVisible ? "auto" : "none",
  }}
>
  <PhoneCall size={22} color="white" />
  <span style={{
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(18px, 2.2vw, 28px)",
    color: "var(--color-white)",
    letterSpacing: "-0.01em",
  }}>
    CALL NOW: 020 7946 0823
  </span>
  <span style={{
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    color: "rgba(255,255,255,0.75)",
    marginLeft: "8px",
  }}>
    Mon–Sat 8am–6pm · Emergency callout available
  </span>
</motion.div>
```

Uuse `useEffect` + `IntersectionObserver` en una `ref` en la parte inferior de la sección de héroe. Establecer el estado `heroVisible: booleano`. CuandoEl héroe sale de la ventana gráfica, la barra se desliza hacia abajo y deja de ser interactiva.

---

### SECCIÓN 3 — SERVICIOS GRID

**Contenedor:** `padding: var(--section-py) var(--section-px); background: var(--color-bg)`

**Sección encabezado:**
```jsx
<div style={{ marginBottom: "56px" }}>
  <p style={{ /* orange eyebrow */ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-orange)", marginBottom: "12px" }}>
    What We Do
  </p>
  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "var(--text-h2)", color: "var(--color-white)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
    Full-Spectrum<br />
    <span style={{ color: "var(--color-grey-mid)" }}>Auto Services</span>
  </h2>
</div>
```

**Cuadrícula:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;` en el escritorio. Cada tarjeta comparte una superficie continua: el espacio `2px` crea divisores delgados y oscuros. En dispositivos móviles: `repeat(1, 1fr)`, apiladas.

**6 Tarjetas de servicio: estructura idéntica, revelación escalonada (retraso: índice × 0,08 s):**

Cada tarjeta:
```jsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
  whileHover={{ y: -3 }}
  style={{
    backgroundColor: "var(--color-surface)",
    padding: "36px 32px",
    borderLeft: "3px solid transparent",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
  }}
  onHoverStart={e => {
    e.currentTarget.style.borderLeftColor = "var(--color-orange)";
    e.currentTarget.style.boxShadow = "0 8px 32px var(--color-orange-glow)";
  }}
  onHoverEnd={e => {
    e.currentTarget.style.borderLeftColor = "transparent";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  {/* Icon */}
  <div style={{ marginBottom: "20px" }}>
    <Icon size={32} color="var(--color-orange)" strokeWidth={1.5} />
  </div>
  {/* Service name */}
  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "var(--text-h3)", color: "var(--color-white)", marginBottom: "10px", letterSpacing: "-0.01em" }}>
    {service.name}
  </h3>
  {/* Description */}
  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "15px", color: "var(--color-grey-mid)", lineHeight: 1.65, marginBottom: "24px" }}>
    {service.description}
  </p>
  {/* Price chip */}
  <span style={{
    display: "inline-block",
    backgroundColor: "rgba(232, 93, 4, 0.12)",
    color: "var(--color-orange)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: "13px",
    letterSpacing: "0.04em",
    padding: "6px 14px",
    borderRadius: "100px",
    border: "1px solid rgba(232, 93, 4, 0.25)",
  }}>
    {service.price}
  </span>
</motion.div>
```

**6 Servicios Datos:**
```ts
const services = [
  {
    name: "MOT Testing",
    icon: ClipboardCheck,  // lucide-react
    description: "Class 4 and Class 7 MOT tests on-site. Fast turnaround, same-day results, retest included free within 10 working days.",
    price: "From £29.99",
  },
  {
    name: "Engine Repair",
    icon: Gauge,
    description: "Full engine diagnostics and repair. From sensor faults to full rebuilds — we get to the root cause, not just the symptom.",
    price: "From £95",
  },
  {
    name: "Brake Service",
    icon: CircleDot,
    description: "Pad and disc replacement, brake fluid flush, handbrake adjustment. All brake work comes with a 12-month parts guarantee.",
    price: "From £79 per axle",
  },
  {
    name: "Tyres",
    icon: Circle,
    description: "Supply and fit for all tyre sizes. Budget, mid-range, and premium brands. Free wheel balancing included with every tyre fit.",
    price: "From £49 fitted",
  },
  {
    name: "Air Con Regas",
    icon: Wind,
    description: "Full air conditioning recharge using R134a or R1234yf refrigerant. Includes system leak check and performance test.",
    price: "From £49",
  },
  {
    name: "Diagnostics",
    icon: ScanLine,
    description: "OBD2 full-system scan covering engine, ABS, airbag, gearbox, and emissions. We read the codes and explain what they actually mean.",
    price: "From £35",
  },
];
```

---

### SECCIÓN 4: POR QUÉ ELEGIR US

**Contenedor:** `padding: var(--section-py) var(--section-px); background: var(--color-surface)`

**Diseño:** Una sola fila en el escritorio (`display: flex; gap: 40px; flex-wrap: wrap`), apilado en el móvil.

**Encabezado de sección (alineado a la izquierda, ancho completo encima de la fila):**
```
Why Axle & Co?
```
Espacio Grotesk 800, `var(--text-h2)`, blanco, espacio entre letras `-0,02em`, `margin-bottom: 48px`.

**4 puntos de confianza, cada uno:**
```jsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
  style={{ flex: "1 1 220px", display: "flex", alignItems: "flex-start", gap: "16px" }}
>
  {/* Orange circle checkmark */}
  <div style={{
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "var(--color-orange)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "2px",
  }}>
    <Check size={20} color="white" strokeWidth={2.5} />
  </div>
  <div>
    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--color-white)", marginBottom: "6px" }}>
      {point.title}
    </p>
    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "15px", color: "var(--color-grey-mid)", lineHeight: 1.6 }}>
      {point.detail}
    </p>
  </div>
</motion.div>
```

**4 puntos de confianza Datos:**
```ts
const trustPoints = [
  {
    title: "No Hidden Charges",
    detail: "We quote before we touch. If we discover additional work needed, we call you first. Always.",
  },
  {
    title: "12-Month Parts Guarantee",
    detail: "Every part we fit is guaranteed for 12 months or 12,000 miles — whichever comes first.",
  },
  {
    title: "Same-Day Service Available",
    detail: "Most repairs completed while you wait. Drop off in the morning, collect by afternoon.",
  },
  {
    title: "Free Collection & Delivery",
    detail: "Can't get to us? We'll collect your vehicle and return it to your door. Free within 5 miles.",
  },
];
```

---

### SECCIÓN 5 — EL EQUIPO

**Contenedor:** `padding: var(--section-py) var(--section-px); background: var(--color-bg)`

**Sección encabezado:**
```
Meet the Mechanics
```
Space Grotesk 800, blanco, `var(--text-h2)`, `margen inferior: 56px`.

**Cuadrícula:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px` en el escritorio. `repeat(1, 1fr)` en dispositivos móviles.

**3 tarjetas de equipo:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
  style={{
    backgroundColor: "var(--color-surface)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    borderTop: "4px solid transparent",
    transition: "border-color 0.15s ease",
  }}
  onHoverStart={e => e.currentTarget.style.borderTopColor = "var(--color-orange)"}
  onHoverEnd={e => e.currentTarget.style.borderTopColor = "transparent"}
>
  {/* Photo — 4:3 ratio */}
  <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
    {/* Image: [mechanic portrait — see copy below] */}
    <img src="" alt="{member.name} — mechanic at Axle & Co" className="w-full h-full object-cover object-center" />
  </div>

  <div style={{ padding: "24px 28px 28px" }}>
    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "22px", color: "var(--color-white)", marginBottom: "4px" }}>
      {member.name}
    </h3>
    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "14px", color: "var(--color-grey-mid)", marginBottom: "16px" }}>
      {member.experience} years experience
    </p>
    {/* Speciality chip */}
    <span style={{
      display: "inline-block",
      backgroundColor: "var(--color-orange)",
      color: "white",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      fontSize: "12px",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "5px 12px",
      borderRadius: "4px",
    }}>
      {member.speciality}
    </span>
  </div>
</motion.div>
```

**3 miembros del equipo Datos:**
```ts
const team = [
  {
    name: "Danny Rowe",
    experience: 18,
    speciality: "Engine & Transmission",
    imageDesc: "Mid-30s male mechanic in clean navy uniform, confident expression, arms crossed, workshop background with orange-lit pegboard tools, portrait orientation, warm professional lighting",
  },
  {
    name: "Priya Mehta",
    experience: 11,
    speciality: "Diagnostics & Electronics",
    imageDesc: "Early 30s female mechanic holding a diagnostic tablet, professional navy uniform, slight smile, clean workshop background, warm studio lighting, portrait orientation",
  },
  {
    name: "Carl Hutchins",
    experience: 24,
    speciality: "Brakes & Suspension",
    imageDesc: "Late 40s male senior mechanic, weathered hands, confident expression, navy uniform with Axle & Co logo, garage background with lifted vehicle partially visible, portrait orientation, cinematic lighting",
  },
];
```

---

### SECCIÓN 6 — CONFIANZA MARQUEE

**Contenedor:**
```jsx
<div style={{
  backgroundColor: "var(--color-surface)",
  borderTop: "1px solid var(--color-border)",
  borderBottom: "1px solid var(--color-border)",
  padding: "20px 0",
  overflow: "hidden",
}}>
  <div className="marquee-track" style={{ display: "flex", alignItems: "center", gap: "0" }}>
    {/* Render items twice for seamless loop */}
    {[...items, ...items].map((item, i) => (
      <React.Fragment key={i}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(14px, 1.4vw, 17px)",
          color: "var(--color-grey-light)",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          padding: "0 40px",
        }}>
          {item}
        </span>
        <span style={{ color: "var(--color-orange)", fontSize: "22px", lineHeight: 1, flexShrink: 0 }}>·</span>
      </React.Fragment>
    ))}
  </div>
</div>
```

**Marquesina Elementos:**
```ts
const items = [
  "AA Approved Garage",
  "ASE Certified Technicians",
  "500+ Five-Star Reviews",
  "Est. 2008",
  "IMI Registered",
  "RAC Approved Garage",
  "Free MOT Retest",
  "12-Month Parts Guarantee",
];
```

Animación: `35s lineal infinito`, se detiene al pasar el mouse. CSS definido en `index.css` como se muestra en Efecto 4.

---

### SECCIÓN 7 — PRECIOS TRANSPARENTES

**Contenedor:** `padding: var(--section-py) var(--section-px); background: var(--color-bg)`

**Sección encabezado:**
```
No Surprises. Just Prices.
```
Space Grotesk 800, blanco, `var(--text-h2)`, `margin-bottom: 12px`.

**Subtítulo:** "Cada precio mostrado es la tarifa inicial; siempre confirmaremos su cotización exacta antes de comenzar a trabajar". — Más Jakarta Sans 300, `var(--color-grey-mid)`, 17px, `margen inferior:48px`.

**Tabla:**
```jsx
<div style={{
  borderRadius: "var(--radius-md)",
  overflow: "hidden",
  border: "1px solid var(--color-border)",
}}>
  {/* Header row */}
  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 160px 140px",
    backgroundColor: "var(--color-orange)",
    padding: "16px 28px",
  }}>
    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px", color: "white", letterSpacing: "0.08em", textTransform: "uppercase" }}>Service</span>
    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px", color: "white", letterSpacing: "0.08em", textTransform: "uppercase" }}>From Price</span>
    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px", color: "white", letterSpacing: "0.08em", textTransform: "uppercase" }}>Avg. Time</span>
  </div>

  {/* Data rows — alternate between --color-surface and --color-surface-mid */}
  {pricingRows.map((row, i) => (
    <div key={i} style={{
      display: "grid",
      gridTemplateColumns: "1fr 160px 140px",
      padding: "18px 28px",
      backgroundColor: i % 2 === 0 ? "var(--color-surface)" : "var(--color-surface-mid)",
      borderBottom: "1px solid var(--color-border)",
    }}>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "16px", color: "var(--color-grey-light)" }}>{row.service}</span>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "var(--color-orange)" }}>{row.price}</span>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "15px", color: "var(--color-grey-mid)" }}>{row.time}</span>
    </div>
  ))}
</div>
```

**8 Filas de precios:**
```ts
const pricingRows = [
  { service: "MOT Test (Class 4)",        price: "From £29.99",      time: "45–60 min" },
  { service: "Full Service",               price: "From £149",        time: "2–3 hrs" },
  { service: "Interim Service",            price: "From £89",         time: "1–2 hrs" },
  { service: "Brake Pads (per axle)",      price: "From £79",         time: "1 hr" },
  { service: "Brake Discs + Pads",         price: "From £149 axle",   time: "1.5 hrs" },
  { service: "Air Con Regas",              price: "From £49",         time: "30–45 min" },
  { service: "Diagnostic Scan",            price: "From £35",         time: "30 min" },
  { service: "Tyre Supply & Fit (each)",   price: "From £49 fitted",  time: "20 min each" },
];
```

**Nota debajo de la tabla:** "Todos los precios excluyen el IVA. Los precios son tarifas iniciales indicativas y pueden variar según el vehículo. Confirme todos los costos antes de que comience el trabajo." — Plus Jakarta Sans 300, 13px, `var(--color-grey-dark)`, `margin-top: 16px`.

---

### SECCIÓN 8 — EMERGENCIA SECCIÓN

**Contenedor:**
```jsx
<section style={{
  backgroundColor: "var(--color-orange)",
  padding: "var(--section-py) var(--section-px)",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
}}>
  {/* Background watermark "24/7" for depth */}
  <span style={{
    position: "absolute",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(180px, 28vw, 400px)",
    color: "rgba(0,0,0,0.06)",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
  }}>
    24/7
  </span>

  <div style={{ position: "relative", zIndex: 1 }}>
    <motion.h2
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(36px, 5vw, 80px)",
        color: "white",
        letterSpacing: "-0.03em",
        lineHeight: 0.95,
        marginBottom: "28px",
      }}
    >
      BROKEN DOWN?<br />
      WE COME TO YOU.
    </motion.h2>

    <motion.a
      href="tel:02079460823"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "block",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(44px, 6vw, 90px)",
        color: "white",
        letterSpacing: "-0.03em",
        lineHeight: 1,
        textDecoration: "none",
        marginBottom: "20px",
      }}
    >
      020 7946 0823
    </motion.a>

    <p style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 300,
      fontSize: "clamp(15px, 1.6vw, 19px)",
      color: "rgba(255,255,255,0.82)",
      letterSpacing: "0.02em",
    }}>
      Available 7 days · Usually within 2 hours · No call-out charge within 10 miles
    </p>
  </div>
</section>
```

---

### SECCIÓN 9 — PIE DE PIE

**Contenedor:** `background: var(--color-surface); border-top: 1px solid var(--color-border); padding: 64px var(--section-px) 32px`

**Cuadrícula de 3 columnas (`display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 48px`):**

**Columna 1 — Marca:**
```
AXLE & CO
Est. 2008 — trusted independent garage serving South London and the surrounding area. MOT, servicing, repairs, and tyres.

Unit 4, Grange Road Industrial Estate
London, SE1 3BT

Open Mon–Fri: 8:00am – 6:00pm
Saturday: 8:00am – 4:00pm
Sunday: Emergency callout only
```
Logotipo en Space Grotesk 800, blanco. Dirección y horario en Plus Jakarta Sans 400, `var(--color-grey-mid)`, 14px. Enlace del mapa: "Obtener indicaciones →" en naranja, 14 px.

**Columna 2: tabla de horarios de apertura:**
```
Monday      8:00am – 6:00pm
Tuesday     8:00am – 6:00pm
Wednesday   8:00am – 6:00pm
Thursday    8:00am – 6:00pm
Friday      8:00am – 6:00pm
Saturday    8:00am – 4:00pm
Sunday      Emergency only
```
Representado como `<table>` con `border-collapse: colapso`. Cada `<tr>` tiene "relleno: 6px 0". Nombres de días en Plus Jakarta Sans 600, blanco; veces en Plus Jakarta Sans 400, `var(--color-grey-mid)`.

**Columna 3: Certificaciones y enlaces:**
```
Certifications
AA Approved Garage
RAC Approved Garage
IMI Registered (No. 123456)
ASE Certified Technicians

Quick Links
Book Online
View Pricing
Get a Quote
Contact Us
```
Certificaciones con un pequeño icono de ShieldCheck (lucide, 14px, naranja) al lado de cada una. Enlaces en Plus Jakarta Sans 400, `var(--color-grey-mid)`, desplazamiento naranja.

**Barra inferior (borde superior: var sólida de 1 px (--color-border); relleno superior: 24 px; margen superior: 40px):**
```
© 2024 Axle & Co Auto Repair Ltd. All rights reserved. · Privacy Policy · Terms of Service
```
Alineado al centro, Plus Jakarta Sans 400, 13px, `var(--color-grey-dark)`.

---

## 7. ANIMACIONES

| Elemento | Tipo | Duración | Retraso | Flexibilización |
|---|---|---|---|---|
| Barra de navegación (en carga) | Aparición gradual desde y:-8 | 0,4 s | 0s | salida fácil |
| Ceja de héroe | Aparece gradualmente desde y:16 | 0,5 s | 0,1 s | [0.22,1,0.36,1] |
| Titular de héroe | Aparece gradualmente desde y:24 | 0,7s | 0,2 s | [0.22,1,0.36,1] |
| Subtítulo de héroe | Aparece gradualmente desde y:20 | 0,6 s | 0,4 s | [0.22,1,0.36,1] |
| CTA de héroe | Aparece gradualmente desde y:20 | 0,6 s | 0,55s | [0.22,1,0.36,1] |
| Desplazamiento galón | Flotar y:0→8→0 | 2s | — | entrada y salida fácil, repetición: Infinito |
| Barra de llamadas fija | Diapositiva desde y:80 | 0,35s | — | [0.22,1,0.36,1]|
| Tarjetas de servicio | Desvanecerse desde y:32, tambalearse | 0,55s | índice × 0,08 s | [0.22,1,0.36,1] |
| Tarjeta de servicio (desplazar el cursor) | y:-3 | 0,2 s | — | facilidad |
| Puntos de confianza | Desvanecerse desde x: -20, tambalearse | 0,5 s | índice × 0,1 s | [0.22,1,0.36,1] |
| Tarjetas de equipo | Desvanecerse desde y:24, tambalearse | 0,55s | índice × 0,1 s | [0.22,1,0.36,1] |
| Carpa de confianza | Desplazamiento continuo | 35 años | — | lineal, infinito |
| Filas de la tabla de precios | Desvanecerse desde x: -16, tambalearse | 0,4 s | índice × 0,06 s | [0.22,1,0.36,1] |
| Sección de emergencia h2 | Desvanecerse desde y:32 | 0,65s | 0s | [0.22,1,0.36,1] |
| Número de teléfono de emergencia | Fundido + escala desde 0,95 | 0,5 s | 0,2 s | [0.22,1,0.36,1] |

Todas las animaciones ` whileInView` usan `viewport={{ once: true }}` por lo que se activan una vez al desplazarse.

---

## 8. ESPECIFICACIONES RESPONSIVAS

### Escritorio (≥1024px)
- Cuadrícula de servicios: `grid-template-columns: repeat(3, 1fr)` - 2 filas de 3 tarjetas
- Puntos de confianza: una sola fila horizontal, `flex-wrap: wrap`
- Tarjetas de equipo: `repeat(3, 1fr)`
- Tabla de precios: 3 columnas visible
- Pie de página: cuadrícula de 3 columnas
- Texto de marquesina: 17px
- Texto destacado: escala `clamp()` completa

### Tableta (640px–1023px)
- Cuadrícula de servicios: `repeat(2, 1fr)` - 3 filas de 2 tarjetas
- Tarjetas de equipo: `repeat(2, 1fr)`
- Pie de página: `repeat(2, 1fr)`, la tercera columna se ajusta al ancho completo
- Barra de navegación: ocultar enlaces de navegación central, mostrar hamburguesa
- Llamada fija barra: reduce el tamaño de fuente a 18 px, oculta el texto de soporte

### Móvil (<640px)
- Cuadrícula de servicios: `repeat(1, 1fr)` - apiladas
- Tarjetas de equipo: `repeat(1, 1fr)` - apiladas
- Pie de página: una sola columna, stacked
- Hero: `min-height: 100svh`, titular en `clamp(44px, 12vw, 70px)`
- Tabla de precios: ocultar la columna "Tiempo promedio", mostrar "Servicio" + "Desde precio" solamente
- Barra de llamadas fija: ancho completo, `tamaño de fuente: 18px`, solo número de teléfono + icon
- Puntos de confianza: apilados verticalmente con `gap: 24px`

---

## 9. COPIA COMPLETAY

### Navbar
- Logotipo: `AXLE & CO`
- Nav: `Servicios` · `Acerca de` · `Precios` · `Reseñas`
- CTA: `Reservar en línea`

###Hero
- Ceja: `Garaje independiente de confianza · Est. 2008`
- Línea de título 1: `ARREGLAMOS QUÉ`
- Línea de título 2: `OTROS SE FALTAN.`
- Subtítulo: `Diagnóstico honesto. Precios justos. Trabajo garantizado.`
- CTA 1: `Reserve un Servicio`
- CTA 2: `020 7946 0823`
- Barra fija: `LLAME AHORA: 020 7946 0823` + `Lun–Sáb 8am–6pm · Llamada de emergencia disponible`

### Sección de servicios
- Ceja: `Qué hacemos`
- Titular: `Servicios de automóvil de espectro completo`
- Servicios: (consulte los datos de servicios arriba)

### Por qué elegirnos
- Titular: `Por qué Axle & Co?`
- Puntos: (ver datos de puntos de confianza arriba)

### Sección del equipo
- Titular: `Conozca a los mecánicos`
- Miembros: Danny Rowe / Priya Mehta / Carl Hutchins (ver datos arriba)

### Precios Sección
- Titular: `Sin sorpresas. Precios justos.`
- Subtítulo: `Cada precio mostrado es la tarifa inicial; siempre confirmaremos su cotización exacta antes de comenzar a trabajar.`
- Nota al pie: `Todos los precios excluyen el IVA. Los precios son tarifas iniciales indicativas y pueden variar según el vehículo. Confirmamos todos los costos antes de que comience el trabajo.`

### Sección de Emergencia
- Línea de título 1: `¿DESGLOSE?`
- Línea de título 2: `VAMOS A USTED.`
- Teléfono: `020 7946 0823`
- Subtexto: `Disponible 7 días · Generalmente dentro de 2 horas · Sin cargo por llamada dentro de 10 millas`

### Pie de página
- Lema: `Est. 2008: taller independiente de confianza que presta servicios en el sur de Londres y sus alrededores. ITV, servicio, reparaciones y neumáticos.`
- Dirección: `Unit 4, Grange Road Industrial Estate, Londres, SE1 3BT`
- Enlace al mapa: `Cómo llegar →`
- Horario (ver columna 2 arriba)
- Copyright: `© 2024 Axle & Co Auto Repair Ltd. Todos los derechos reservados. · Política de privacidad · Términos de servicio`

---

## 10. DEPENDENCIAS CLAVE

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^11.11.0",
    "lucide-react": "^0.441.0",
    "tailwindcss": "^3.4.13",
    "@shadcn/ui": "latest"
  },
  "devDependencies": {
    "typescript": "^5.5.3",
    "vite": "^5.4.8",
    "@vitejs/plugin-react": "^4.3.2"
  }
}
```

**iconos de Lucide-React utilizados:**
- `PhoneCall` — barra de llamadas fija + emergencia
- `ClipboardCheck` — Tarjeta MOT
- `Gauge` — Tarjeta de motor
- `CircleDot` — Tarjeta de frenos
- `Circle` — Neumáticoscard
- `Wind` — Tarjeta de aire acondicionado
- `ScanLine` — Tarjeta de diagnóstico
- `Check` — puntos de confianza
- `ChevronDown` — indicador de desplazamiento del héroe
- `ShieldCheck` — pie de página certificaciones
- `Menú`, `X` — navegación móvil

**Notas importantes de implementación:**
1. Importe todos los componentes de Framer Motion desde `motion/react`, no `framer-motion`
2. Todos los elementos ` whileHover` dentro de` whileInView` requieren el `motion.div` principal; no se dividen en divs
3 separados. El `IntersectionObserver` para la barra de llamadas fija debe observar un div `ref` colocado en el borde inferior del héroe `<section>`, que se activa cuando sale de la parte superior de la ventana gráfica (umbral: 0)
4. La animación CSS de marquesina debe definirse en `index.css`, no en estilos en línea, para compatibilidad con el navegador
5. Tabla de precios en dispositivos móviles: ajuste en un div desplazable horizontalmente con `-webkit-overflow-scrolling: touch`
