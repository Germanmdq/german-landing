# Lugar de bodas de Ashford Manor: sitio web completo Prompt
# websiteprompts.ai

---

## 1. DECLARACIÓN DE OBJETIVO

Cree un sitio web completo y listo para producción para **Ashford Manor**, un lugar exclusivo para celebrar bodas en una finca rural, que comunique un romance atemporal. lujo natural y exclusividad a través de un cálido sistema de diseño en marfil, verde salvia y oro envejecido con pantalla tipo Cormorant Garamond y refinada animación Framer Motion.

---

## 2. TECH STACK

- **Framework:** React 18 + Vite + TypeScript
- **Estilo:** Tailwind CSS v3 (con variables CSS personalizadas)
- **Animación:** Framer Motion (`motion/react`): importe exclusivamente desde `motion/react`, nunca desde `framer-motion`
- **Componentes de UI:** shadcn/ui
- **Iconos:** lucide-react
- **Fuentes:** Google Fonts (Cormorant Garamond + Plus Jakarta Sans a través de `<link>` en index.html)

---

## 3. DISEÑO SISTEMA

Coloque estas propiedades personalizadas de CSS en `src/index.css` dentro de `:root {}`:

```css
:root {
  /* Core Palette */
  --color-bg:           hsl(40, 33%, 97%);      /* #faf7f2 — warm ivory */
  --color-bg-warm:      hsl(38, 28%, 94%);      /* #f3efe8 — slightly deeper ivory */
  --color-surface:      hsl(0, 0%, 100%);       /* pure white for cards */
  --color-border:       hsl(40, 20%, 88%);      /* #e4ddd2 — warm border */
  --color-border-gold:  hsl(40, 52%, 56%);      /* #c4a35a — aged gold border */
  --color-sage:         hsl(104, 14%, 38%);     /* #5a7052 — sage green */
  --color-sage-light:   hsl(104, 14%, 94%);     /* #edf2ec — sage tint */
  --color-sage-mid:     hsl(104, 14%, 55%);     /* #7d9875 — medium sage */
  --color-gold:         hsl(40, 52%, 56%);      /* #c4a35a — aged gold */
  --color-gold-light:   hsl(40, 52%, 92%);      /* #f5edd9 — gold tint */
  --color-charcoal:     hsl(210, 10%, 20%);     /* #2d3238 — deep charcoal text */
  --color-text-mid:     hsl(210, 8%, 42%);      /* #636b74 — mid text */
  --color-text-light:   hsl(40, 12%, 60%);      /* #a09880 — light warm text */
  --color-white:        hsl(0, 0%, 100%);

  /* Typography Scale */
  --text-hero:    clamp(52px, 8vw, 140px);
  --text-h2:      clamp(34px, 4.5vw, 72px);
  --text-h3:      clamp(22px, 2.4vw, 32px);
  --text-body:    16px;
  --text-small:   14px;
  --text-label:   12px;

  /* Spacing */
  --section-px:   clamp(24px, 5vw, 96px);
  --section-py:   clamp(72px, 9vw, 140px);

  /* Radius */
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    16px;

  /* Transitions */
  --ease-out:     cubic-bezier(0.22, 1, 0.36, 1);
  --ease-gentle:  cubic-bezier(0.4, 0, 0.2, 1);
}
```

Establezca `body { background-color: var(--color-bg); color: var(--color-charcoal); }` globalmente.

---

## 4. TIPOGRAFÍAY

Agregar a `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

**Uso reglas:**
- `font-family: 'Cormorant Garamond', serif; font-weight: 600; font-style: italic;`: TODOS muestran titulares (héroe, encabezados de sección, nombres de lugares, nombres de parejas en testimonios)
- `font-family: 'Cormorant Garamond', serif; font-weight: 400; font-style: italic;`: citas, subtexto decorativo
- `font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 300;`: texto del cuerpo, descripciones de tarjetas, soporte text
- `font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 400;` — Entradas de formulario, enlaces de navegación, cuerpo general
- `font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 500;` — Etiquetas, metadatos, chips de fecha
- `font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600;` — Botones de CTA, CTA de navegación, envío de formulario
- Espaciado entre letras: visualización los titulares utilizan "espaciado entre letras: -0,02 em"; las etiquetas en mayúsculas utilizan `letter-spacing: 0.12em; text-transform: uppercase`
- Alto de línea: texto para mostrar `1.0`; texto del cuerpo `1.75`

---

## 5. EFECTOS VISUALES

### Efecto 1: héroe radial + viñeta lineal
```css
background:
  radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%),
  linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.50) 100%);
```
Aplicado como `absoluto insert-0 z-10` sobre la imagen del héroe. Crea una viñeta cinematográfica natural que oscurece los bordes y la parte inferior, asegurando la legibilidad del texto independientemente de la foto.composición.

### Efecto 2: subrayado dorado animado
```tsx
{/* Decorative gold line, placed immediately beneath the hero headline */}
<motion.div
  initial={{ scaleX: 0 }}
  animate={{ scaleX: 1 }}
  transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
  style={{
    height: "2px",
    width: "160px",
    backgroundColor: "var(--color-gold)",
    transformOrigin: "left center",
    margin: "28px auto 32px",
  }}
/>
```
Crece de izquierda a derecha después de que el título se desvanece, animando "scaleX: 0 a 1" sobre "1,2s" con "retraso: 0,8s". `transformOrigin: "left center"` hace que se dibuje de izquierda a derecha. Puramente decorativo.

### Efecto 3: Marca de agua de fondo "MANOR"
```jsx
<span
  className="absolute select-none pointer-events-none"
  style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontStyle: "italic",
    fontSize: "clamp(200px, 30vw, 460px)",
    color: "rgba(90, 112, 82, 0.025)",
    right: "-1%",
    top: "50%",
    transform: "translateY(-50%)",
    lineHeight: 1,
    letterSpacing: "-0.03em",
    zIndex: 5,
    userSelect: "none",
  }}
>
  MANOR
</span>
```
Se encuentra entre la capa de la foto (z-1) y la superposición de degradado (z-10). Se renderiza en color salvia con una opacidad del 2,5 %: refuerza subliminalmente el nombre de la marca sin competir con la fotografía. 

### Efecto 4: escala de paralaje de tarjeta de lugar al pasar el mouse
El contenedor de tarjeta exterior es un `motion.div` con `whileHover={{ scale: 1.02 }}` y `transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}`. En su interior, un `motion.div` anidado que envuelve solo el `<img>` tiene el `whileHover={{ scale: 1.06 }}` con la misma transición. Los dos valores de escala diferentes crean un efecto de paralaje de zoom dentro del zoom que se siente natural y cinematográfico. La tarjeta exterior debe tener `overflow: oculto` y `border-radius` configurados para contener la escala interna.

### Efecto 5: Líneas separadoras de oro
Entre las secciones Héroe y Espacios del lugar, y entre las CTA de Testimonios y Disponibilidad secciones:
```jsx
<div style={{
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "0 var(--section-px)",
}}>
  <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
  <span style={{ color: "var(--color-gold)", fontSize: "20px" }}>✦</span>
  <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
</div>
```

### Efecto 6: Anillo de enfoque de entrada de formulario
En `index.css`:
```css
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.30);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
```
Anillo dorado brillante en el formulario de consulta de fondo salvia inputs.

---

## 6. DESGLOSE DE COMPONENTES

---

### SECCIÓN 1 — NAVBAR

**Diseño:** `position: sticky; top: 0; z-index: 90`
- Fondo: `rgba(250, 247, 242, 0.92)` + `backdrop-filter: blur(12px) saturate(1.5)`
- Borde inferior: `1px solid var(--color-border)`
- Relleno: `18px var(--section-px)`
- Estructura: fila flexible de 3 partes — `[nav. izquierda] [logotipo central] [CTA derecha]`

**Enlaces de navegación izquierdos (solo escritorio, `<768px` oculto):** `Servicios · Galería · Paquetes · Testimonios · Blog`
Plus Jakarta Sans 400, `14px`, `espaciado entre letras: 0.02em`, `color: var(--color-text-mid)`. Al pasar el mouse: `color: var(--color-sage)`, transición `0,15 s de facilidad`.

**Logotipo central:**
```jsx
<div style={{ textAlign: "center", flexShrink: 0 }}>
  <div style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontStyle: "italic",
    fontSize: "clamp(18px, 2vw, 24px)",
    color: "var(--color-charcoal)",
    letterSpacing: "0.04em",
    lineHeight: 1.1,
  }}>
    Ashford Manor
  </div>
  <div style={{
    width: "32px",
    height: "1px",
    backgroundColor: "var(--color-gold)",
    margin: "5px auto 0",
  }} />
</div>
```

**Derecha:** Enlace simple `Contacto` + salvia completa `Enquire` button.
```jsx
<a href="#enquire" style={{
  backgroundColor: "var(--color-sage)",
  color: "white",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  padding: "9px 20px",
  borderRadius: "var(--radius-sm)",
  textDecoration: "none",
  letterSpacing: "0.02em",
  transition: "background-color 0.15s ease",
}}>
  Enquire
</a>
```

**Móvil (<768px):** Logotipo centrado únicamente + ícono `Menú` (lucide) alineado a la derecha. Toque se abreuna superposición de color marfil en pantalla completa con todos los enlaces apilados verticalmente (Plus Jakarta Sans 400, 22px, `var(--color-charcoal)`).

---

### SECCIÓN 2 — HERO

**Contenedor:** `position: relative; height: 100vh; min-height: 680px; overflow: hidden`

**Capa 1: Foto (índice z: 1):**
```jsx
{/* Image: Outdoor wedding ceremony setup at a grand English country estate on a summer afternoon. White wooden chairs arranged in symmetrical rows facing a floral arch covered in white roses, peonies, and trailing eucalyptus. Golden hour sunlight filters through the canopy of mature oak trees at the frame's edges, casting long warm rays across a lush manicured lawn. A stone manor house is softly visible out of focus in the background. Warm, romantic, aspirational. Shot on 85mm, shallow depth of field, wide crop. */}
<img
  src=""
  alt="Outdoor wedding ceremony on the lawns of Ashford Manor"
  className="absolute inset-0 w-full h-full object-cover object-center"
  style={{ zIndex: 1 }}
/>
```

**Capa 2: Marca de agua "MANOR" (índice z: 5):** Consulte el efecto 3 arriba.

**Capa 3: Superposición de viñeta (índice z: 10):** Consulte el efecto 1 arriba.

**Capa 4: contenido centrado (índice z: 20):**
```jsx
<div style={{
  position: "absolute",
  inset: 0,
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "0 var(--section-px)",
}}>
  {/* Eyebrow */}
  <motion.p
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 500,
      fontSize: "12px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--color-gold)",
      marginBottom: "20px",
    }}
  >
    Ashford, Hertfordshire · Est. 1847
  </motion.p>

  {/* Main Headline */}
  <motion.h1
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      fontStyle: "italic",
      fontSize: "var(--text-hero)",
      color: "white",
      lineHeight: 1.0,
      letterSpacing: "-0.02em",
      maxWidth: "960px",
      marginBottom: 0,
    }}
  >
    Where Your Story Begins.
  </motion.h1>

  {/* Animated Gold Underline */}
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
    style={{
      height: "2px",
      width: "160px",
      backgroundColor: "var(--color-gold)",
      transformOrigin: "left center",
      margin: "28px auto 32px",
    }}
  />

  {/* Subline */}
  <motion.p
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 300,
      fontSize: "clamp(15px, 1.6vw, 20px)",
      color: "rgba(255,255,255,0.85)",
      maxWidth: "600px",
      lineHeight: 1.7,
      marginBottom: "12px",
    }}
  >
    An exclusive country manor for intimate weddings and grand celebrations alike.
  </motion.p>

  {/* Capacity note */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 300,
      fontSize: "15px",
      color: "rgba(255,255,255,0.60)",
      letterSpacing: "0.04em",
      marginBottom: "44px",
    }}
  >
    Capacity 20–180 guests · Licensed for civil ceremonies
  </motion.p>

  {/* CTA Pair */}
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
    style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
  >
    <a href="#enquire" style={{
      backgroundColor: "var(--color-sage)",
      color: "white",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      fontSize: "15px",
      padding: "14px 32px",
      borderRadius: "var(--radius-sm)",
      textDecoration: "none",
      letterSpacing: "0.02em",
    }}>
      Check Availability
    </a>
    <a href="#gallery" style={{
      border: "1px solid rgba(255,255,255,0.55)",
      color: "white",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 400,
      fontSize: "15px",
      padding: "14px 32px",
      borderRadius: "var(--radius-sm)",
      textDecoration: "none",
      letterSpacing: "0.02em",
      backgroundColor: "rgba(255,255,255,0.08)",
    }}>
      View Our Gallery
    </a>
  </motion.div>
</div>
```

**Indicador de desplazamiento (z-20, inferior centro):**
```jsx
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 20 }}
>
  <ChevronDown size={24} color="rgba(255,255,255,0.45)" />
</motion.div>
```

---

### SECCIÓN 3 — ESPACIOS DEL LUGAR

**Contenedor:** `padding: var(--section-py) var(--section-px); background: var(--color-bg)`

**Encabezado de sección (centrado):**
```jsx
<div style={{ textAlign: "center", marginBottom: "60px" }}>
  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "14px" }}>
    Our Spaces
  </p>
  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: "italic", fontSize: "var(--text-h2)", color: "var(--color-charcoal)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
    Three Breathtaking Settings
  </h2>
</div>
```

**Cuadrícula:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px` en escritorio.

**3 tarjetas Venue Space: cada una con aspecto 16:9 sin bordes ratio:**
```jsx
<motion.div
  key={space.name}
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
  style={{
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    position: "relative",
    aspectRatio: "16/9",
    cursor: "pointer",
  }}
>
  {/* Parallax image — nested motion.div for independent scale */}
  <motion.div
    style={{ position: "absolute", inset: 0 }}
    whileHover={{ scale: 1.06 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Image: [see venue space image descriptions in data block below] */}
    <img src="" alt={space.name + " at Ashford Manor"} className="w-full h-full object-cover object-center" />
  </motion.div>

  {/* Gradient overlay — darkens slightly more on hover via CSS transition */}
  <div style={{
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.20) 50%, rgba(0,0,0,0) 100%)",
    zIndex: 2,
    transition: "background 0.4s ease",
  }} />

  {/* Text overlay — bottom */}
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px", zIndex: 3 }}>
    <span style={{
      display: "block",
      width: "fit-content",
      backgroundColor: "rgba(196, 163, 90, 0.25)",
      border: "1px solid rgba(196, 163, 90, 0.5)",
      color: "var(--color-gold)",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 500,
      fontSize: "12px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "4px 12px",
      borderRadius: "2px",
      marginBottom: "10px",
    }}>
      Up to {space.capacity} guests
    </span>
    <h3 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      fontStyle: "italic",
      fontSize: "clamp(22px, 2.4vw, 32px)",
      color: "white",
      letterSpacing: "-0.01em",
      lineHeight: 1.1,
      marginBottom: "6px",
    }}>
      {space.name}
    </h3>
    <p style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 300,
      fontSize: "14px",
      color: "rgba(255,255,255,0.72)",
      lineHeight: 1.5,
    }}>
      {space.tagline}
    </p>
  </div>
</motion.div>
```

**Datos de espacios del lugar:**
```ts
const venueSpaces = [
  {
    name: "The Grand Hall",
    capacity: 200,
    tagline: "Vaulted stone ceilings, crystal chandeliers, and original oak floors.",
    imageDesc: "Elegant wedding banquet in a grand stone hall with high vaulted ceilings, multiple crystal chandeliers casting warm candlelight, white floral centrepieces on round tables with ivory linens, 200 guests seated, wide-angle cinematic shot",
  },
  {
    name: "The Orangery",
    capacity: 80,
    tagline: "Floor-to-ceiling glass, tropical botanicals, and dappled garden light.",
    imageDesc: "Intimate wedding reception inside a Victorian orangery with floor-to-ceiling arched glass windows, lush tropical hanging ferns and potted plants, white dining tables, warm golden afternoon light streaming through glass, wide shot",
  },
  {
    name: "The Garden Terrace",
    capacity: 60,
    tagline: "Open-air celebrations beneath a canopy of fairy lights and stars.",
    imageDesc: "Outdoor evening wedding reception on a manicured stone terrace, thousands of warm fairy lights strung between mature trees, white-draped round tables, stone balustrade, rose bushes in bloom, warm dusk light, romantic and magical",
  },
];
```

---

### SECCIÓN 4 — QUÉ ES INCLUIDO

**Contenedor:** `padding: var(--section-py) var(--section-px); background: var(--color-bg-warm)`

**Diseño:** `display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center`

**Columna izquierda — título + prosa:**
```jsx
<div>
  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "14px" }}>
    Every Package Includes
  </p>
  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: "italic", fontSize: "var(--text-h2)", color: "var(--color-charcoal)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "28px" }}>
    What's Included
  </h2>
  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300, fontSize: "17px", color: "var(--color-text-mid)", lineHeight: 1.75 }}>
    Every Ashford Manor wedding package includes exclusive use of the estate and all its facilities. We believe your wedding day should feel entirely yours — no shared spaces, no conflicting events, no compromises.
  </p>
</div>
```

**Columna derecha — Lista de verificación de 14 elementos en subcuadrícula de 2 columnas:**
```jsx
<ul style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px 32px", listStyle: "none", padding: 0, margin: 0 }}>
  {inclusions.map((item, i) => (
    <motion.li
      key={i}
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
    >
      <Check size={16} color="var(--color-sage)" strokeWidth={2.5} style={{ marginTop: "3px", flexShrink: 0 }} />
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "15px", color: "var(--color-charcoal)", lineHeight: 1.5 }}>
        {item}
      </span>
    </motion.li>
  ))}
</ul>
```

**14 Inclusiones:**
```ts
const inclusions = [
  "Exclusive use of the entire estate",
  "Bridal suite for getting-ready prep",
  "5 acres of private landscaped gardens",
  "250-space private car park",
  "Licensed for civil ceremonies",
  "Dedicated wedding coordinator",
  "Ceremony and reception chairs",
  "Tables, linens, and crockery",
  "In-house catering available",
  "Bar facilities and full licence",
  "Accommodation for up to 22 guests",
  "Grand piano in The Grand Hall",
  "Award-winning floral designer referrals",
  "Complimentary menu tasting for two",
];
```

---

### SECCIÓN 5 — GALERÍA DE BODASY

**Contenedor:** `padding: var(--section-py) var(--section-px); background: var(--color-bg)`

**Encabezado de sección (centrado, `margen inferior: 56px`):**
```
A Glimpse of Your Day
```
Cormorant Garamond 600 cursiva, `var(--text-h2)`, `var(--color-charcoal)`, espacio entre letras -0,02em.

**Cuadrícula asimétrica de 5 imágenes que utiliza una cuadrícula CSS de 12 columnas:**
```jsx
<div style={{
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateRows: "auto auto",
}}>
  {/* Image 1 — Large landscape, columns 1-7, row 1 */}
  <div style={{ gridColumn: "1 / 8", gridRow: "1", aspectRatio: "4/3", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
    {/* Image: Bride and groom exchanging vows under a floral arch on a sunlit lawn, golden hour warm light, candid emotional moment, soft focus background, romantic wide shot */}
    <img src="" alt="Wedding ceremony vows under the floral arch at Ashford Manor" className="w-full h-full object-cover object-center" />
  </div>

  {/* Image 2 — Portrait, columns 8-12, row 1 */}
  <div style={{ gridColumn: "8 / 13", gridRow: "1", aspectRatio: "3/4", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
    {/* Image: Bridal bouquet close-up, white roses and peonies with trailing eucalyptus greenery, held in both hands with lace wedding dress visible, warm natural daylight, soft macro detail */}
    <img src="" alt="Bridal bouquet detail — white roses and peonies" className="w-full h-full object-cover object-center" />
  </div>

  {/* Image 3 — Portrait, columns 1-4, row 2 */}
  <div style={{ gridColumn: "1 / 5", gridRow: "2", aspectRatio: "3/4", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
    {/* Image: Couple's first dance in The Grand Hall, crystal chandeliers above, dress hem in motion blur, close romantic crop, warm candlelight tones */}
    <img src="" alt="First dance in The Grand Hall at Ashford Manor" className="w-full h-full object-cover object-center" />
  </div>

  {/* Image 4 — Portrait, columns 5-8, row 2 */}
  <div style={{ gridColumn: "5 / 9", gridRow: "2", aspectRatio: "3/4", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
    {/* Image: Elegant wedding table setting — ivory linen, gold cutlery, crystal glasses, white floral centrepiece with candles, detail shot, warm shallow depth of field */}
    <img src="" alt="Elegant reception table setting at Ashford Manor" className="w-full h-full object-cover object-center" />
  </div>

  {/* Image 5 — Square, columns 9-12, row 2 */}
  <div style={{ gridColumn: "9 / 13", gridRow: "2", aspectRatio: "1/1", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
    {/* Image: The Orangery interior during an evening wedding reception, warm fairy lights through glass walls, tropical plants, guests in formal attire mingling, candid atmosphere */}
    <img src="" alt="Evening reception in The Orangery at Ashford Manor" className="w-full h-full object-cover object-center" />
  </div>
</div>
```

**Debajo de la cuadrícula: centrado enlace:**
```jsx
<div style={{ textAlign: "center", marginTop: "40px" }}>
  <a href="#gallery" style={{
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    color: "var(--color-sage)",
    textDecoration: "none",
    letterSpacing: "0.04em",
    borderBottom: "1px solid var(--color-sage)",
    paddingBottom: "2px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  }}>
    View Full Gallery <ArrowRight size={16} />
  </a>
</div>
```

---

### SECCIÓN 6 — TESTIMONIOS

**Contenedor:** `padding: var(--section-py) var(--section-px); background: var(--color-bg-warm)`

**Encabezado de sección (centrado, `margen inferior: 56px`):**
```
Words From Our Couples
```
Cormorant Garamond 600 cursiva, `var(--text-h2)`, `var(--color-charcoal)`.

**Cuadrícula:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px`

**3 Tarjetas de testimonios:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
  style={{
    backgroundColor: "var(--color-surface)",
    borderRadius: "var(--radius-md)",
    borderLeft: "3px solid var(--color-gold)",
    padding: "36px 32px",
    boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
  }}
>
  {/* 5 stars */}
  <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
    {[...Array(5)].map((_, s) => (
      <Star key={s} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
    ))}
  </div>

  {/* Quote */}
  <p style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: "clamp(18px, 1.8vw, 22px)",
    color: "var(--color-charcoal)",
    lineHeight: 1.65,
    marginBottom: "28px",
  }}>
    "{testimonial.quote}"
  </p>

  {/* Couple name + date chip */}
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
    <div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: "italic", fontSize: "20px", color: "var(--color-charcoal)", marginBottom: "2px" }}>
        {testimonial.couple}
      </p>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "13px", color: "var(--color-text-light)" }}>
        {testimonial.venue}
      </p>
    </div>
    <span style={{
      backgroundColor: "var(--color-sage-light)",
      color: "var(--color-sage)",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 500,
      fontSize: "12px",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "5px 12px",
      borderRadius: "2px",
    }}>
      {testimonial.date}
    </span>
  </div>
</motion.div>
```

**3 Testimonios Datos:**
```ts
const testimonials = [
  {
    quote: "Ashford Manor exceeded every expectation. From the first enquiry call to the final dance, every detail was handled with such grace and care. Our guests still talk about it.",
    couple: "Charlotte & James Whitmore",
    venue: "The Grand Hall · 180 guests",
    date: "June 2024",
  },
  {
    quote: "We had always dreamed of an outdoor ceremony, and The Garden Terrace was exactly what we'd imagined — but more beautiful. The fairy lights at dusk were simply magical.",
    couple: "Amara & Daniel Okafor",
    venue: "The Garden Terrace · 55 guests",
    date: "September 2024",
  },
  {
    quote: "The Orangery was the perfect intimate setting for our small, meaningful wedding. The botanical atmosphere, the light, the staff — everything was flawless. Truly perfect.",
    couple: "Sophie & Miriam Leclair",
    venue: "The Orangery · 42 guests",
    date: "April 2024",
  },
];
```

---

### SECCIÓN 7 — DISPONIBILIDADCTA

**Contenedor:**
```jsx
<section id="enquire" style={{
  backgroundColor: "var(--color-sage)",
  padding: "var(--section-py) var(--section-px)",
  position: "relative",
  overflow: "hidden",
}}>
  {/* Decorative watermark "2025" */}
  <span style={{
    position: "absolute",
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontStyle: "italic",
    fontSize: "clamp(200px, 30vw, 500px)",
    color: "rgba(255,255,255,0.04)",
    right: "-5%",
    bottom: "-10%",
    pointerEvents: "none",
    userSelect: "none",
    lineHeight: 1,
  }}>
    2025
  </span>

  <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>
      Limited Dates Remaining
    </p>

    <motion.h2
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 600,
        fontStyle: "italic",
        fontSize: "clamp(40px, 6vw, 100px)",
        color: "white",
        letterSpacing: "-0.02em",
        lineHeight: 1.0,
        marginBottom: "20px",
      }}
    >
      Your Perfect Day Awaits.
    </motion.h2>

    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300, fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: "48px" }}>
      We have limited availability for 2025 and 2026. Fill in your details and our wedding coordinator will be in touch within 24 hours.
    </p>

    {/* Enquiry Form — 2-column grid */}
    <form style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", textAlign: "left" }}>

      {/* Field: Your Name */}
      <div>
        <label style={{ display: "block", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
          Your Name
        </label>
        <input type="text" placeholder="Charlotte & James" style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "var(--radius-sm)", padding: "13px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "15px", color: "white", outline: "none", boxSizing: "border-box" }} />
      </div>

      {/* Field: Email Address */}
      <div>
        <label style={{ display: "block", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
          Email Address
        </label>
        <input type="email" placeholder="hello@example.com" style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "var(--radius-sm)", padding: "13px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "15px", color: "white", outline: "none", boxSizing: "border-box" }} />
      </div>

      {/* Field: Preferred Date */}
      <div>
        <label style={{ display: "block", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
          Preferred Date
        </label>
        <input type="date" style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "var(--radius-sm)", padding: "13px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.7)", outline: "none", boxSizing: "border-box" }} />
      </div>

      {/* Field: Estimated Guests */}
      <div>
        <label style={{ display: "block", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
          Estimated Guests
        </label>
        <select style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "var(--radius-sm)", padding: "13px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.85)", outline: "none", boxSizing: "border-box", appearance: "none" }}>
          <option value="" style={{ color: "var(--color-charcoal)" }}>Select a range</option>
          <option value="20-40" style={{ color: "var(--color-charcoal)" }}>20–40 guests</option>
          <option value="40-80" style={{ color: "var(--color-charcoal)" }}>40–80 guests</option>
          <option value="80-120" style={{ color: "var(--color-charcoal)" }}>80–120 guests</option>
          <option value="120-180" style={{ color: "var(--color-charcoal)" }}>120–180 guests</option>
        </select>
      </div>

      {/* Submit — full width */}
      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit" style={{
          width: "100%",
          backgroundColor: "white",
          color: "var(--color-sage)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: "16px",
          padding: "16px",
          borderRadius: "var(--radius-sm)",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.02em",
          transition: "background-color 0.2s ease, color 0.2s ease",
        }}>
          Check My Date →
        </button>
      </div>
    </form>

    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300, fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "16px" }}>
      No commitment required. We'll reply within one business day.
    </p>
  </div>
</section>
```

On enviar, alternar un React `useState` que reemplaza el formulario con:
```jsx
<div style={{ textAlign: "center", padding: "48px 0" }}>
  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(28px, 3.5vw, 48px)", color: "white", marginBottom: "16px" }}>
    Thank you — we'll be in touch shortly.
  </p>
  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300, fontSize: "16px", color: "rgba(255,255,255,0.75)" }}>
    Our wedding coordinator will reply to you within one business day.
  </p>
</div>
```

---

### SECCIÓN 8 — PIE DE PIE

**Contenedor:** `background: var(--color-bg); border-top: 1px solid var(--color-border); padding: 72px var(--section-px) 32px`

**Cuadrícula de 3 columnas:** `display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 60px`

**Columna 1 — Marca + Dirección:**
- Logotipo: Cormorant Garamond 600 cursiva, 28px, `var(--color-charcoal)`
- Línea dorada: 40px de ancho, 1px de alto, `var(--color-gold)`, `margen: 16px 0 20px`
- Lema: Plus Jakarta Sans 300, 15px, `var(--color-text-mid)`, `margin-bottom: 28px`
- Dirección, correo electrónico, teléfono: Plus Jakarta Sans 400, 14px, `var(--color-text-mid)`, altura de línea 2.0
- Enlace al mapa: Plus Jakarta Sans 500, 14px, `var(--color-sage)`, subrayado al pasar el mouse

Text:
```
Ashford Manor

A 19th-century country estate offering exclusive wedding packages for 20–180 guests in the heart of Hertfordshire. Licensed for civil ceremonies, civil partnerships, and blessing ceremonies.

Ashford Manor Estate
Church Lane, Ashford
Hertfordshire, AL5 2PQ

enquiries@ashfordmanor.co.uk
01234 567 890

Get Directions →
```

**Columna 2 - Enlaces sociales + Premios:**
```
Follow Our Journey

Instagram · @ashfordmanorweddings
Pinterest · @ashfordmanor
Facebook · Ashford Manor Estate

Awards & Memberships

★ Hitched Top Venue 2024
★ Guides for Brides Recommended
★ UKAWP Member
★ WeddingPlanner.co.uk — Gold Badge
★ Hitched Couples' Choice Award
```
Etiqueta de sección: Plus Jakarta Sans 600, 12 px, mayúsculas, espacio entre letras de 0,1 em, `var(--color-charcoal)`, `margen inferior: 16 px`. Enlaces sociales: Plus Jakarta Sans 400, 14px, `var(--color-text-mid)`, hover `var(--color-sage)`. Premios: el mismo estilo con el ícono "Estrella" (lucide, 14px, `var(--color-gold)`) precediendo cada elemento.

**Columna 3 — Enlaces rápidos:**
```
Explore
Our Venue · Wedding Packages · Gallery · Testimonials · Blog · FAQs

Contact
Enquiry Form · Call: 01234 567 890 · Email: enquiries@ashfordmanor.co.uk
```
Mismo estilo de etiqueta de sección. Enlaces: Plus Jakarta Sans 400, 15px, `var(--color-text-mid)`, coloque el cursor sobre `var(--color-sage)`, se muestra como una lista apilada, `line-height: 2.2`.

**Barra inferior:** `border-top: 1px solid var(--color-border); padding-top: 28px; margin-top: 48px`
```
© 2024 Ashford Manor Estate Ltd. All rights reserved. · Privacy Policy · Terms & Conditions · Accessibility
```
Alineado al centro, Plus Jakarta Sans 300, 13px, `var(--color-text-light)`.

---

## 7. ANIMACIONES

| Elemento | Tipo | Duración | Retraso | Flexibilización |
|---|---|---|---|---|
| Barra de navegación (cargar) | Desvanecerse desde y:-8 | 0,5 s | 0s | salida fácil |
| Ceja de héroe | Desvanecerse desde y:12 | 0,6 s | 0,1 s | [0.22,1,0.36,1] |
| Titular de héroe | Desvanecerse de y:28 | 0,9s | 0,25 s | [0.22,1,0.36,1] |
| Subrayado dorado | escalaX 0→1 | 1,2 s | 0,8 s | [0.22,1,0.36,1] |
| Sublínea de héroe | Desvanecerse desde y:16 | 0,7s | 0,5 s | [0.22,1,0.36,1] |
| Nota de capacidad | Fundido en | 0,6 s | 0,65s | salida fácil |
| CTA de héroe | Desvanecerse desde y:16 | 0,6 s | 0,75s | [0.22,1,0.36,1] |
| Desplazamiento galón | Flotar y:0→10→0 | 2,5s| — | facilidad de entrada y salida, Infinity |
| Tarjetas de espacio para el lugar | Desvanecerse desde y:32, tambalearse | 0,7s | índice × 0,12 s | [0.22,1,0.36,1] |
| Tarjeta de lugar exterior (desplazar el cursor) | escala 1.02 | 0,4 s | — | [0.22,1,0.36,1] |
| Imagen interior de la tarjeta del lugar (desplazar el cursor) | escala 1.06 | 0,4 s | — | [0.22,1,0.36,1] |
| Elementos de la lista de inclusión | Desvanecerse desde x:12, tambalearse | 0,4 s | índice × 0,05 s | [0.22,1,0.36,1] |
| Encabezado de la sección de la galería | Desvanecerse de y:24 | 0,65s | 0s | [0.22,1,0.36,1] |
| Tarjetas de testimonios | Desvanecerse desde y:28, tambalearse | 0,65s | índice × 0,12 s | [0.22,1,0.36,1] |
| Titular de disponibilidad | Desvanecerse de y:28 | 0,75s | 0s | [0.22,1,0.36,1] |
| Pie de página | Desvanecerse desde y:16 | 0,6 s | 0s | [0.22,1,0.36,1] |

Todos ` whileInView` usan `viewport={{ once: true, margin: "-60px" }}`.

---

## 8. ESPECIFICACIONES RESPONSIVAS

### Escritorio (≥1024px)
- Barra de navegación: diseño de 3 partes `[navegación izquierda | logotipo del centro | CTA derecha]`
- Espacios del lugar: `repeat(3, 1fr)` grid
- Qué está incluido: diseño de 2 columnas (`1fr 1.2fr`)
- Lista de verificación de inclusiones: subcuadrícula de 2 columnas dentro de la columna derecha
- Galería: completa Cuadrícula asimétrica de 12 columnas según lo especificado
- Testimonios: `repeat(3, 1fr)`
- Formulario de consulta: Cuadrícula de 2 columnas
- Pie de página: Cuadrícula de 3 columnas

### Tableta (640px–1023px)
- Barra de navegación: logotipo centrado + hamburguesa
- Espacios para el lugar: `repeat(2, 1fr)` — 2 tarjetas fila 1, 1 tarjeta fila de ancho completo 2
- Qué está incluido: una sola columna, lista de verificación debajo del encabezado en `repeat(2, 1fr)`
- Galería: `repeat(2, 1fr)` cuadrícula simple, imágenes `aspect-ratio: 4/3`
- Testimonios: `repeat(2, 1fr)` — tercera tarjeta de ancho completo debajo
- Formulario de consulta: mantenimiento de 2 columnas
- Pie de página: `repeat(2, 1fr)`: la columna 3 se ajusta al ancho completo

### Móvil (<640px)
- Titular destacado en `clamp(44px, 11vw, 72px)`, ancho de línea dorada `120px`, CTA se apilan verticalmente (`dirección flexible: columna`, cada ancho completo)
- Espacios del lugar: `repeat(1, 1fr)`, `relación de aspecto: 16/9`
- Qué está incluido: encabezado de una sola columna + lista de verificación de una sola columna
- Galería: `repeat(1, 1fr)`, todas las imágenes `relación de aspecto: 4/3`
- Testimonios: una sola columnaapilado
- Formulario de consulta: una sola columna (todos los campos de ancho completo)
- Pie de página: una sola columna apilada, `espacio: 40px`

---

## 9. COPIA COMPLETAY

### Navbar
`Servicios · Galería · Paquetes · Testimonios · Blog` | `Mansión Ashford` | `Contacto · Consulta`

### Hero
- Ceja: `Ashford, Hertfordshire · Est. 1847`
- Titular: `Donde comienza tu historia.`
- Sublínea: `Una mansión rural exclusiva para bodas íntimas y grandes celebraciones.`
- Capacidad: `Capacidad 20–180 invitados · Licencia para ceremonias civiles`
- CTA 1: `Verificar Disponibilidad`
- CTA 2: `Ver Nuestra Galería`

### Espacios del Lugar
- Ceja: `Nuestros Espacios` | Titular: `Tres escenarios impresionantes`
- Tarjetas: El Gran Salón (200 invitados) / El Invernadero (80 invitados) / La Terraza del Jardín (60 invitados)

### Qué está incluido
- Ceja: `Cada paquete incluye` | Titular: `Qué está incluido`
- Prosa: `Cada paquete de boda de Ashford Manor incluye el uso exclusivo de la finca y todas sus instalaciones. Creemos que el día de su boda debe ser completamente suyo: sin espacios compartidos, sin eventos conflictivos, sin compromisos.`

### Galería
- Titular: `Un vistazo a su día` | Enlace: `Ver galería completa →`

### Testimonios
- Titular: `Palabras de nuestras parejas`
- Pareja 1: Charlotte y James Whitmore / junio de 2024
- Pareja 2: Amara y Daniel Okafor / Septiembre 2024
- Pareja 3: Sophie y Miriam Leclair / Abril 2024

### Disponibilidad CTA
- Ceja: `Fechas limitadas restantes`
- Titular: `Tu día perfecto te espera.`
- Cuerpo: `Nosotros tienen disponibilidad limitada para 2025 y 2026. Complete sus datos y nuestro coordinador de bodas se comunicará con usted dentro de las 24 horas.`
- Enviar: `Verificar mi fecha →`
- Nota al pie: `No se requiere compromiso. Le responderemos dentro de un día hábil.`

### Pie de página
- Dirección: `Ashford Manor Estate, Church Lane, Ashford, Hertfordshire, AL5 2PQ`
- Correo electrónico: `enquiries@ashfordmanor.co.uk` | Teléfono: `01234 567 890`
- Copyright: `© 2024 AshfordManor Estate Ltd. Todos los derechos reservados. · Política de privacidad · Términos y condiciones · Accesibilidad`

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
- `ChevronDown` — hero indicador de desplazamiento
- `Check` — lista de verificación de inclusiones
- `Star` — estrellas de testimonios, premios de pie de página
- `ArrowRight` — enlace de galería
- `Menu`, `X` — navegación móvil
- `MapPin` — pie de página dirección
- `Teléfono` — teléfono de pie de página
- `Correo` — correo electrónico de pie de página

**Notas clave de implementación:**
1. Importe todos los Framer Motion de `motion/react`, nunca `framer-motion`
2. El subrayado dorado `scaleX: 0 → 1` usa `animate` (no ` whileInView`) por lo que se activa como parte de la secuencia de carga del héroe, con `transformOrigin: "left center"` para dibujar de izquierda a derecha
3. Desplazamiento de la tarjeta de lugar: `motion.div` externo (escala 1.02) envuelve un `motion.div` interno (escala 1.06) que contiene el `<img>`; ambos deben tener `transition={{ duration: 0.4 }}`; El div externo tiene "desbordamiento: oculto" y "radio de borde" 
4. Las líneas separadoras doradas (Efecto 5) aparecen entre Héroe → Espacios del lugar y entre Testimonios → Disponibilidad CTA
5. El formulario de consulta utiliza un booleano React `useState` para alternar entre el formulario y el estado de confirmación de agradecimiento en el envío
6. Cuadrícula de la galería: en pantallas de menos de 640 píxeles, contraiga a una cuadrícula `repeat(1, 1fr)` simple: los valores personalizados `gridColumn` y `gridRow` deben anularse con `gridColumn: "1 / -1"` y `gridRow: "auto"` en dispositivos móviles a través de una consulta de medios CSS en `index.css`
