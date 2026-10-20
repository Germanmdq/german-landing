# Ember & Ground — Aviso del sitio web de la cafetería
### websiteprompts.ai — Listo para producción para Lovable, Bolt, v0, Claude, Cursor

---

## 1. DECLARACIÓN DEL OBJETIVO

Construir una cafetería de especialidades cambiante y con todas las funciones sitio web de **Ember & Ground**: una experiencia editorial de una sola página con calidad de revista que evoca calidez, artesanía y el ritual del café excepcional, generando pedidos en línea y visitas a las tiendas.

---

## 2. TECH STACK

- **React 18 + Vite 5 + TypeScript**
- **Tailwind CSS v3** (modo JIT)
- **Framer Motion** — importar exclusivamente desde `motion/react`
- **shadcn/ui** — Pestañas, tarjetas, componentes de insignia
- **lucide-react** — íconos (Estrella, MapPin, Reloj, Café, ChevronRight, Instagram)
- **Google Fonts** — Playfair Display + Plus Jakarta Sans

---

## 3. SISTEMA DE DISEÑO

Agregue esto a su CSS global (`index.css` o `globals.css`):

```css
:root {
  /* Core palette */
  --color-espresso:      12 9 7;        /* #0d0b09 — near-black background */
  --color-espresso-mid:  22 17 13;      /* #16110d — card backgrounds */
  --color-espresso-lift: 32 25 18;      /* #201912 — elevated surfaces */
  --color-amber:         212 137 42;    /* #d4892a — primary accent */
  --color-amber-light:   230 165 80;    /* #e6a550 — hover states */
  --color-amber-pale:    245 220 170;   /* #f5dcaa — muted amber */
  --color-cream:         245 237 224;   /* #f5ede0 — primary text on dark */
  --color-cream-muted:   200 185 165;   /* #c8b9a5 — secondary text */
  --color-cream-faint:   140 125 108;   /* #8c7d6c — placeholder text */

  /* Semantic tokens */
  --bg-page:             rgb(var(--color-espresso));
  --bg-card:             rgb(var(--color-espresso-mid));
  --bg-card-hover:       rgb(var(--color-espresso-lift));
  --text-primary:        rgb(var(--color-cream));
  --text-secondary:      rgb(var(--color-cream-muted));
  --text-muted:          rgb(var(--color-cream-faint));
  --accent:              rgb(var(--color-amber));
  --accent-hover:        rgb(var(--color-amber-light));
  --border-subtle:       rgba(var(--color-amber) / 0.15);
  --border-amber:        rgba(var(--color-amber) / 0.6);
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
  font-family: 'Plus Jakarta Sans', sans-serif;
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
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700;1,800&family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
```

**Reglas de uso:**

| Elemento | Fuente | Peso | Estilo | Tamaño |
|---|---|---|---|---|
| Todos `<h1>` | Exhibición de Playfair | 700 | cursiva | clamp(48px, 7vw, 120px) |
| Todos `<h2>` | Exhibición de Playfair | 700 | cursiva | clamp(32px, 4vw, 64px) |
| `<h3>` subtítulos | Exhibición de Playfair | 700 | cursiva | clamp(22px, 2.5vw, 36px) |
| Copia del cuerpo | Plus Yakarta Sans | 300 | normales | 17px / 1,75 de altura de línea |
| Etiquetas, etiquetas, navegación | Plus Yakarta Sans | 600 | normales | Seguimiento de 12 a 13 píxeles: [0,1 em] mayúsculas |
| Precios | Plus Yakarta Sans | 700 | normales | heredar tamaño |
| Números de estadísticas | Exhibición de Playfair | 700 | cursiva | clamp(56px, 7vw, 96px) |
| Marca de agua | Exhibición de Playfair | 700 | cursiva | clamp(220px, 32vw, 480px) |

---

## 5. EFECTOS VISUALES

### Efecto 1: Steam SVG animado (elemento Signature Hero)

Tres rutas SVG verticales onduladas se elevan por encima del título en ámbar al 15% opacidad. Cada ruta utiliza solo "trazo" (sin relleno), `strokeWidth="2"`, la amplitud varía ligeramente por ruta. Se animan hacia arriba con tiempos escalonados usando escalaY + traducirY.

```tsx
// components/SteamAnimation.tsx
import { motion } from "motion/react";

const steamPaths = [
  "M0 60 Q8 45 0 30 Q-8 15 0 0",
  "M0 60 Q-6 45 0 30 Q6 15 0 0",
  "M0 60 Q10 45 0 30 Q-10 15 0 0",
];

export function SteamAnimation() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 flex gap-5 pointer-events-none">
      {steamPaths.map((d, i) => (
        <motion.svg
          key={i}
          width="20"
          height="64"
          viewBox="-12 -4 24 68"
          fill="none"
          initial={{ scaleY: 0.3, y: 20, opacity: 0 }}
          animate={{ scaleY: 1, y: -10, opacity: [0, 0.7, 0] }}
          transition={{
            duration: 2.4,
            delay: i * 0.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
          style={{ originY: "bottom" }}
        >
          <path
            d={d}
            stroke="rgb(212 137 42)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}
```

### Efecto 2: Texto de marca de agua de fondo

Renderizar "EMBER" en Playfair Display en cursiva en `clamp(220px, 32vw, 480px)`, ámbar con 3% de opacidad, anclado en la parte inferior derecha de la sección de héroe, sangrando fuera de la pantalla hacia la derecha.

```tsx
<span
  aria-hidden="true"
  className="absolute bottom-0 right-0 select-none pointer-events-none font-playfair italic font-bold leading-none"
  style={{
    fontSize: "clamp(220px, 32vw, 480px)",
    color: "rgba(212, 137, 42, 0.03)",
    lineHeight: 0.85,
    transform: "translateX(15%)",
  }}
>
  EMBER
</span>
```

### Efecto 3: Desenfoque de entrada escalonado

Atodas las animaciones de entrada de sección utilizan un patrón de desenfoque y desvanecimiento. Aplicar a envoltorios de sección a través de `useInView` desde `motion/react` + `motion.div`:

```tsx
const sectionVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
```

### Efecto 4: Tarjeta especial flotante (héroe abajo a la izquierda)

A Tarjeta de morfismo de vidrio que escala de 0,85 → 1 con un retraso de 0,5 s, ubicada en la parte inferior izquierda del héroe:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.85, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
  className="absolute bottom-8 left-6 md:left-10 z-20"
>
  {/* Card content below */}
</motion.div>
```

### Efecto 5: Marco continuo

La tira de información se desplaza hacia la izquierda a una velocidad constante. Utilice un bloque de contenido duplicado para un bucle continuo:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 40s linear infinite;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  width: max-content;
}
.marquee-track:hover {
  animation-play-state: paused;
}
```

### Efecto 6: estadísticas de conteo en desplazamiento

Active una vez mediante `useInView`. Anima con un gancho personalizado `useCountUp` usando `requestAnimationFrame` y `easeOutCubic`:

```tsx
function useCountUp(target: number, duration = 1600, delay = 0): number {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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

**Diseño:** Parte superior fija, `backdrop-blur-md`, fondo `rgba(13, 11, 9, 0.85)`, borde inferior `rgba(212, 137, 42, 0.12)`. Alto: 72px escritorio / 64px móvil. z-50.

**Estructura de escritorio (izquierda → derecha):**
```
[Logo]   [spacer flex-1]   [Nav links × 4]   [gap-8]   [CTA Button]
```

**Logotipo:** "EMBER & GROUND" en Playfair Display cursiva, 22 px, ámbar (`rgb(212,137,42)`). Seguimiento a 0.06em.

**Enlaces de navegación** (Además de Jakarta Sans 600, 13px, seguimiento-[0.08em], mayúsculas, `var(--text-secondary)`, desplazamiento → ámbar, transición de 200 ms):
- Nuestra historia
- Menú
- Bebidas
- Encuéntranos

**Botón CTA:** "Pedido en línea": fondo ámbar, texto espresso (#0d0b09), Plus Jakarta Sans 700, seguimiento de mayúsculas de 13px-[0.08em], px-5 py-2.5, radio de borde 0 (nítido) esquinas), coloque el cursor sobre: fondo `rgb(230,165,80)`, transición 200 ms.

**Móvil:** Mostrar icono de hamburguesa (lucida `Menú`, 22px, crema). El cajón se desliza hacia adentro desde la derecha, 100 % de la altura de la ventana gráfica, fondo `rgb(12,9,7)`, enlaces apilados verticalmente a 18 px cada uno, py-5, borde-b borde-ámbar/10. Ícono de cierre (lucide `X`) arriba a la derecha.

---

### SECCIÓN 2 — HERO

**Contenedor:** `relativo min-h-screen overflow-hidden flex flex-col justify-end pb-20 px-6 md:px-20`

**Imagen de fondo:**
```jsx
{/* Image: Moody specialty café interior — a barista's hands pouring latte art into a dark matte ceramic cup, steam rising visibly in warm golden morning light, dark atmospheric background, shallow depth of field, cinematic grain, amber and espresso tones, editorial photography */}
<img
  src=""
  alt="Barista pouring latte art at Ember & Ground café"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>
```

**Superposiciones de degradado: dos divs separados, ambos con inserción absoluta-0:**
```tsx
{/* Layer 1: amber tint at top fading to transparent */}
<div className="absolute inset-0 z-[1]" style={{background: "linear-gradient(to bottom, rgba(120,70,10,0.35) 0%, transparent 45%)"}} />
{/* Layer 2: dark left-to-right + bottom overlay for text */}
<div className="absolute inset-0 z-[1]" style={{background: "linear-gradient(to bottom, transparent 30%, rgba(13,11,9,0.75) 65%, rgba(13,11,9,0.96) 100%)"}} />
```

**Bloque de contenido (relativo a z-10, max-w-3xl):**
```
[SteamAnimation — positioned relative, inline above headline]
<h1 style={{ fontSize: "clamp(48px,7vw,120px)", fontFamily: "Playfair Display", fontStyle: "italic", fontWeight: 700, color: "rgb(245,237,224)", lineHeight: 1.05 }}>
  Coffee Worth Waking Up For.
</h1>
<p style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 300, fontSize: "18px", lineHeight: "1.75", color: "rgb(200,185,165)", marginTop: "24px", maxWidth: "480px" }}>
  Specialty coffee, direct-trade beans, and craft drinks — served daily in the heart of Marlow.
</p>
[Button row, mt-10, gap-4, flex-wrap]:
  Button 1: "Explore Our Menu" — amber bg, espresso text, px-7 py-3.5, rounded-none, font-jakarta font-700 text-sm uppercase tracking-[0.08em]
  Button 2: "Visit Us" — transparent bg, border border-cream/40, cream text, same sizing, hover border-cream/80
```

**Tarjeta flotante "ESPECIALES DE HOY" (abajo absoluto-8 izquierda-6 md:izquierda-10, z-20):**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.85, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
  className="absolute bottom-8 left-6 md:left-10 z-20"
  style={{
    background: "rgba(13,11,9,0.72)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(212,137,42,0.3)",
    padding: "20px 24px",
    minWidth: "220px",
  }}
>
  <p style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600, fontSize: "11px", letterSpacing: "0.12em", color: "rgb(212,137,42)", textTransform: "uppercase", marginBottom: "14px" }}>
    Today's Specials
  </p>
  {[
    { name: "Honey Lavender Latte", price: "£4.80" },
    { name: "Cold Brew Tonic",      price: "£4.20" },
    { name: "The Morning Cortado",  price: "£3.60" },
  ].map((item) => (
    <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
      <span style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 400, fontSize: "13px", color: "rgb(245,237,224)" }}>
        {item.name}
      </span>
      <span style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: "13px", color: "rgb(212,137,42)", marginLeft: "16px" }}>
        {item.price}
      </span>
    </div>
  ))}
</motion.div>
```

**Marca de agua:** "EMBER" — `absolute bottom-0 right-0 pointer-events-none select-none`, z-[1], Playfair Display cursiva 700, `clamp(220px,32vw,480px)`, color `rgba(212,137,42,0.03)`, `translateX(15%)`, lineHeight 0.85.

---

### SECCIÓN 3: NUESTRA HISTORIA

**Diseño:** Cuadrícula CSS de dos columnas `grid-cols-1 md:grid-cols-2`, sin espacio, altura mínima 600px.

**Columna izquierda (texto):** Fondo `rgb(22,17,13)`, relleno `p-12 md:p-20`, flex flex-col justify-center.

```
Label: "SINCE 2019" — Plus Jakarta Sans 600, 11px, amber, uppercase, tracking-[0.12em], mb-4
H2: "Coffee Is Our Craft, Not Our Product." — Playfair Display 700 italic, clamp(32px,4vw,56px), cream
Divider line: width 40px, height 1px, background amber, mt-6 mb-8
P1 (font-jakarta font-300 text-[17px] leading-[1.75] text-cream-muted):
  "We started Ember & Ground with one conviction: great coffee requires obsessive attention at every step. From farm selection to final pour, nothing is left to chance."
P2 (same styles, mt-5):
  "Our beans travel from single-origin farms in Ethiopia, Colombia, and Guatemala — sourced through direct relationships with growers we've visited personally. Every roast is calibrated weekly. Every extraction is dialled in by hand."
CTA link (mt-8): "Read Our Full Story →" — font-jakarta font-600 text-sm text-amber hover:underline transition-all
```

Enimación de entrada: x desde -40 → 0, opacidad 0→1, duración 800 ms, retraso 100 ms, salida fácil (activada por desplazamiento en View).

**Columna derecha (imagen):** `desbordamiento relativo oculto`: la imagen llena la columna completa.

```jsx
{/* Image: Aerial view of terraced coffee plantation — lush rows of deep green coffee plants curving across a steep hillside, morning mist rising from the valleys, warm golden sunlight catching the leaf tips, rich red-brown earth paths between rows, editorial travel photography, lush and cinematic */}
<img
  src=""
  alt="Single-origin coffee farm sourced by Ember & Ground"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>
<div className="absolute inset-0" style={{ background: "rgba(120,60,0,0.15)" }} />
```

Animación de entrada: x desde +40 → 0, opacidad 0→1, duración 800 ms, retraso 250 ms, facilidad de salida.

---

### SECCIÓN 4 — TIRA DE ESTADÍSTICAS DE CUENTA ARRIBA

**Diseño:** Ancho completo, fondo `rgb(22,17,13)`, borde-y `1px solid rgba(212,137,42,0.12)`, py-16 px-6.

**4 estadísticas en `flex flex-row justify-center flex-wrap gap-16 md:gap-24`:**

| Valor | Sufijo | Etiqueta |
|---|---|---|
| 12 | "Orígenes" | "Fuentes de origen único" |
| 3 | "Asadores" | "Tostadores asociados" |
| 4.9 | "★" | "Calificación de Google" |
| — (estático) | "Est. 2019" | "Fundado" |

**Marcado por estadística:**
```tsx
<div className="text-center">
  <p
    className="font-playfair italic font-bold leading-none"
    style={{ fontSize: "clamp(56px,7vw,96px)", color: "rgb(212,137,42)" }}
  >
    {countValue}{suffix}
  </p>
  <p className="mt-3 font-jakarta font-semibold text-xs uppercase tracking-[0.12em]"
     style={{ color: "rgb(200,185,165)" }}>
    {label}
  </p>
</div>
```

El conteo se activa una vez al desplazarse hacia la vista (use `useInView` con `once: true`). Retrasos escalonados: 0 ms, 200 ms, 400 ms, 600 ms. Duración 1600ms cada uno, easyOutCubic. "Est. 2019" se muestra estático, sin recuento.

Mobile: `grid grid-cols-2 gap-10`, py-12.

---

### SECCIÓN 5: EL MENU

**Diseño:** Ancho completo, fondo `var(--bg-page)` (#0d0b09), pt-24 pb-20, px-6 md:px-20.

**Encabezado de sección (centrado, mb-14):**
```
Label: "WHAT WE SERVE" — 11px amber uppercase tracking-[0.12em] mb-4
H2: "The Menu." — Playfair Display 700 italic clamp(32px,4vw,64px) cream
Subline: "Seasonal. Considered. Worth the detour." — Jakarta Sans 300 17px cream-muted mt-3
```

**Navegación por pestañas:** shadcn/ui `<Tabs defaultValue="espresso">`. Cuatro activadores: `Espresso · Pour Over · Cold Brew · Food`.

 Anular el estilo de pestañas shadcn con estas clases Tailwind en `<TabsList>`:
```
className="bg-transparent border-b border-amber/15 rounded-none p-0 h-auto gap-0 w-full justify-start mb-10"
```

On cada `<TabsTrigger>`:
```
className="rounded-none bg-transparent border-b-2 border-transparent pb-3 px-0 mr-10 font-jakarta font-semibold text-sm uppercase tracking-[0.1em] text-cream-muted data-[state=active]:text-amber data-[state=active]:border-amber data-[state=active]:bg-transparent shadow-none"
```

**Cuadrícula de tarjetas por pestaña:** `grid grid-cols-1 md:grid-cols-2 gap-4`

**Por tarjeta de artículo:**
```
background: rgb(22,17,13)
border: 1px solid rgba(212,137,42,0.1)
padding: p-6
border-radius: 0
Row: [name font-jakarta font-semibold text-base text-cream] [price font-jakarta font-bold text-base text-amber ml-auto]
Description: font-jakarta font-light text-sm text-cream-muted mt-2 leading-relaxed
```

Animación de entrada escalonada al cambiar de pestaña + desplazamiento en Vista: opacidad 0→1, escala 0,95→1, y 20→0, 500 ms, escalonamiento 80 ms cada tarjeta.

**ESPRESSO (4 artículos):**
- Double Espresso · £2.80 · "Tirón estilo Ristretto, Dosis de 18 g, extracción de 30 ml. Brillante y almibarado."
- Flat White · £3,60 · "20 cl, doble ristretto, microespuma con textura sedosa". 
- Cortado · £3,40 · "Partes iguales de espresso y leche al vapor. Pequeño, fuerte, preciso". £ 3,50 · "Tercera espuma, tercera leche, tercer espresso. Seco o húmedo, solo pregunte".

**VERTER (3 artículos):**
- Filtro Chemex · £4,50 · "Yirgacheffe etíope de origen único. Floral, fruta de hueso, acabado limpio. Espere 6 minutos."
- V60 Estacional · £4,20 · "Nuestra selección rotativa de origen único. Pregúntale al bar qué está sirviendo hoy". 
- Aeropress Classic · £3,80 · "Inmersión total, 2 minutos de infusión. Cuerpo rico, baja acidez, infinitamente repetible".

**COLD BREW (3 artículos):**
- 24 horas Cold Brew · £4,20 · "Empapado 24 horas en agua filtrada. Se sirve durante mucho tiempo sobre hielo. Naturalmente dulce."
- Tónico de café frío · £4,60 · "Expreso doble sobre tónico helado. (4 artículos):**
- Croissant de almendras · £4,20 · "Dos veces horneado con frangipane. Escamoso, mantecoso, realmente peligroso".
- Tostada de aguacate · £7,50 · "Masa madre de Marlow Bakehouse, aguacate triturado, limón, chile y sal marina".
- Gachas de temporada · £5,80 · "Avena cocida a fuego lento, compota de frutas de temporada, semillas tostadas, leche de avena. Vegano."
- Tostada de queso y jamón · £6,50 · "Comté y jamón glaseado con miel sobre masa madre. Prensado a pedido."

---

### SECCIÓN 6 — BEBIDAS DE FIRMA

**Diseño:** Fondo `rgb(22,17,13)`, py-24, px-6 md:px-20.

**Encabezado de sección (alineado a la izquierda, max-w-lg, mb-14):**
```
Label: "CRAFT IN A CUP" — 11px amber uppercase tracking-[0.12em] mb-4
H2: "Our Signatures." — Playfair Display 700 italic clamp(32px,4vw,56px) cream
P: "Recipes developed in-house, refined over seasons, impossible to find elsewhere." — Jakarta Sans 300 17px cream-muted mt-4
```

**3 tarjetas en `grid grid-cols-1 md:grid-cols-3 gap-6`:**

Estructura de cada tarjeta:
```
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  style={{ background: "rgb(12,9,7)", border: "1px solid rgba(212,137,42,0.1)", borderRadius: 0 }}
>
  [Image container: aspect-ratio 4/3, overflow-hidden, relative]
    [On parent hover: border transitions to rgba(212,137,42,0.6), 300ms]
  [Content: p-6]
    [Badge chip: "SIGNATURE" or "SEASONAL" — font-jakarta font-semibold text-[10px] uppercase tracking-[0.1em], color amber, bg rgba(212,137,42,0.12), px-3 py-1, rounded-none, inline-block]
    [Name: font-jakarta font-bold text-lg cream mt-3]
    [Description: font-jakarta font-light text-sm cream-muted mt-2 leading-relaxed]
    [Price: font-jakarta font-bold text-base amber mt-4]
</motion.div>
```

**Tarjeta 1: Latte con miel y lavanda:**
```jsx
{/* Image: Close-up overhead shot of a honey lavender latte in a dark matte ceramic cup — pale golden honey drizzled in a spiral pattern over velvety microfoam, dried lavender sprig resting on the rim, dark slate background, soft directional side lighting, editorial food and beverage photography, warm tones */}
<img src="" alt="Honey Lavender Latte — Ember & Ground signature drink" className="w-full h-full object-cover object-center" />
```
- Insignia: SIGNATURE
- Nombre: Honey Lavender Latte
- Descripción: "Jarabe de lavanda con infusión casera, miel de flores silvestres locales, leche de avena, ristretto doble. Floral sin ser perfumado".
- Precio: £4.80

**Tarjeta 2 — Tónico de preparación fría:**
```jsx
{/* Image: Overhead close-up of a cold brew tonic in a tall clear glass — deep amber cold brew layered below clear tonic water with visible effervescence rising, large clear ice cubes, thin lemon slice on the rim, dark textured background, studio-quality beverage photography, refreshing and editorial */}
<img src="" alt="Cold Brew Tonic — Ember & Ground seasonal drink" className="w-full h-full object-cover object-center" />
```
- Insignia: SEASONAL
- Nombre: Cold Brew Tonic
- Descripción: "Concentrado de cerveza fría de 24 horas cortado con tónica mediterránea Fever-Tree, limón fresco y hielo. Nuestro bestseller de verano".
- Precio: £4.60

**Tarjeta 3 — La Mañana Cortado:**
```jsx
{/* Image: Side-profile shot of an espresso being pulled — golden crema streaming into a white ceramic demitasse, dark moody background, motion blur on the liquid stream, warm amber studio lighting, shallow depth of field, dramatic and atmospheric coffee photography */}
<img src="" alt="The Morning Cortado — Ember & Ground espresso" className="w-full h-full object-cover object-center" />
```
- Insignia: SIGNATURE
- Nombre: The Morning Cortado
- Descripción: "Nuestro cortado de casa: ristretto de 20 ml, 20 ml de leche entera al vapor, sin espuma. Agudo. Centrado. Esencial".
- Precio: £3.60

Animación de entrada (todas) 3 tarjetas): opacidad 0→1, y 40→0, 600 ms, escalonamiento 120 ms, facilidad de salida, activado una vez al desplazarse en View.

---

### SECCIÓN 7 — TIRA DE MARQUETA DE INFORMACIÓN

**Diseño:** Ancho completo `overflow-hidden`, fondo `rgb(212,137,42)` (ámbar), py-5. Sin relleno horizontal.

**Estilo de texto:** Plus Jakarta Sans 700, 13px, color `#0d0b09` (espresso), mayúsculas, seguimiento-[0.1em]. Separador " · " en espresso al 50% de opacidad.

**Implementación:** Renderice la cadena dos veces dentro de `.marquee-track` (inline-flex):

```tsx
const text = "Direct Trade Beans  ·  Seasonal Roasts  ·  Oat Milk Available  ·  Monday–Friday 7am–6pm  ·  Saturday 8am–5pm  ·  Sunday 9am–3pm  ·  Free WiFi  ·  Takeaway & Dine In  ·  ";

<div className="overflow-hidden py-5" style={{ background: "rgb(212,137,42)" }}>
  <div className="marquee-track">
    <span>{text}</span>
    <span aria-hidden="true">{text}</span>
  </div>
</div>
```

CSS:
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  animation: marquee 40s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
```

---

### SECCIÓN 8 — TESTIMONIOS

**Diseño:** Fondo `var(--bg-page)` (#0d0b09), py-24, px-6 md:px-20.

**Encabezado de sección (centrado, mb-16):**
```
Label: "WHAT PEOPLE SAY" — 11px amber uppercase tracking-[0.12em] mb-4
H2: "Regulars, Not Just Customers." — Playfair Display 700 italic clamp(28px,3.5vw,52px) cream
```

**3 tarjetas en `grid grid-cols-1 md:grid-cols-3 gap-6`:**

Cada tarjeta:
```
background: rgb(22,17,13)
border-left: 3px solid rgb(212,137,42)
padding: p-8
Stars row: flex gap-1, 5 × Star icon (lucide), size-3.5, fill amber stroke none, mb-5
Quote: font-jakarta font-light text-base cream italic leading-[1.75] mb-6
Author block:
  Name: font-jakarta font-semibold text-sm cream
  Detail: font-jakarta font-light text-xs cream-muted mt-1
```

Animación de entrada: opacidad 0→1, y 32→0, 600ms, escalonamiento 150ms cada uno, salida suave, desplazamiento hacia adentroVer una vez.

**Tarjeta 1:**
- Estrellas: 5
- Cita: "He probado cafeterías especializadas en todo Londres y esta es Realmente uno de los mejores Flat White que he probado. El juego de la leche de avena está en otro nivel."
- Nombre: Rachel T.
- Detalle: Regular desde 2021

**Tarjeta 2:**
- Estrellas: 5
- Cita: "The Cold Brew Tonic. es ridículo. Regresé tres días seguidos para verlo. El espacio también es hermoso: oscuro y cálido, y exactamente cómo debería sentirse una cafetería". 
- Nombre: James K.
- Detalle: Visitado en julio de 2024

**Tarjeta 3:**
- Estrellas: 5
- Cita: "En realidad saben de dónde vienen sus granos. Le pregunté al barista sobre el Yirgacheffe de Etiopía y recibí una lección de cinco minutos que no quería terminar. Eso es lo que se supone que es el café de especialidad".
- Nombre: Priya M.
- Detalle: Local regular

---

### SECCIÓN 9 — PIE DE PIE

**Diseño:** Cuadrícula de 4 columnas `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12`, fondo `rgb(12,9,7)`, borde superior `1px solid rgba(212,137,42,0.12)`, pt-16 pb-10, px-6 md:px-20.

**Columna 1 — Marca:**
```
Logo: "EMBER & GROUND" — Playfair Display italic 20px amber tracking-[0.06em]
P: "Specialty coffee, direct-trade beans, and craft drinks in Marlow, Buckinghamshire." — Jakarta Sans 300 14px cream-muted mt-4 max-w-xs leading-relaxed
Social row (mt-6, flex gap-4):
  Instagram icon (lucide, size-5, cream-muted, hover amber, transition 200ms)
  Twitter/X icon (lucide, size-5, same)
```

**Columna 2 — Visítenos:**
```
Heading: "VISIT US" — Jakarta Sans 600 11px amber uppercase tracking-[0.12em] mb-4
Address block (Jakarta Sans 300 14px cream-muted leading-loose):
  14 West Street
  Marlow, SL7 2NB
  Buckinghamshire
Map placeholder (mt-5):
  div 200×120px, background rgb(22,17,13), border 1px solid rgba(212,137,42,0.2)
  Center text: "View on Google Maps →" — 12px amber Jakarta Sans 600
```

**Columna 3 — Horas:**
```
Heading: "OPENING HOURS" — Jakarta Sans 600 11px amber uppercase tracking-[0.12em] mb-4
Mon–Fri:  7:00am – 6:00pm
Saturday: 8:00am – 5:00pm
Sunday:   9:00am – 3:00pm
Note: "Last orders 30 minutes before close" — 12px cream-faint italic mt-4
Font: Jakarta Sans 300 14px cream-muted leading-loose
```

**Columna 4 — Explorar:**
```
Heading: "EXPLORE" — Jakarta Sans 600 11px amber uppercase tracking-[0.12em] mb-4
Links (flex flex-col gap-3):
  Our Story / Full Menu / Signature Drinks / Order Online / Gift Cards / Careers
Font: Jakarta Sans 300 14px cream-muted hover:cream transition 200ms
```

**Barra de pie de página (mt-12, pt-8, borde superior rgba(212,137,42,0.08)):**
```
flex justify-between flex-wrap gap-4
Left: "© 2024 Ember & Ground. All rights reserved." — 12px cream-faint
Right: "Privacy Policy · Terms of Service" — 12px cream-faint hover:cream-muted
```

---

## 7. ANIMACIONES — ESPECIFICACIÓN COMPLETA

| Elemento | Inicial | Final | Duración | Retraso | Flexibilización | Gatillo |
|---|---|---|---|---|---|---|
| Barra de navegación | opacidad 0, y -10 | opacidad 1, y 0 | 400 ms | 0 ms | facilidad | carga de página |
| Héroe h1 | opacidad 0, y 40, desenfoque 12px | opacidad 1, y 0, desenfoque 0 | 900 ms | 200 ms | [0,25,0,1,0,25,1] | carga de página |
| Sublínea de héroe | opacidad 0, y 24 | opacidad 1, y 0 | 700 ms | 500 ms | facilidad | carga de página |
| Botones de héroe | opacidad 0, y 16 | opacidad 1, y 0 | 600 ms | 700 ms | facilidad | carga de página |
| Ruta de vapor 1 | escalaY 0,3, y 20, opacidad 0 | escalaY 1, y -10, opacidad [0→0.7→0] | 2400 ms | 0 ms | facilidad de entrada y salida | infinito |
| Ruta de vapor 2 | escalaY 0,3, y 20, opacidad 0 | escalaY 1, y -10, opacidad [0→0.7→0] | 2400 ms | 400 ms | facilidad de entrada y salida | infinito |
| Ruta de vapor 3 | escalaY 0,3, y 20, opacidad 0 | escalaY 1, y -10, opacidad [0→0.7→0] | 2400 ms | 800 ms | facilidad de entrada y salida | infinito |
| Tarjeta de ofertas | opacidad 0, escala 0,85, y 20 | opacidad 1, escala 1, y 0 | 600 ms | 500 ms | resorte [0.34,1.56,0.64,1] | carga de página |
| Encabezados de sección | opacidad 0, y 32, desenfoque 8px | opacidad 1, y 0, desenfoque 0 | 700 ms | 0 ms | [0,25,0,1,0,25,1] | desplazarse hacia adentroVer una vez |
| Historia izquierda col | opacidad 0, x -40 | opacidad 1, x 0 | 800 ms | 100 ms | facilidad | desplazarse enVer |
| Historia col derecha | opacidad 0, x +40 | opacidad 1, x 0 | 800 ms | 250 ms | facilidad | desplazarse enVer |
| Conteo de estadísticas | 0 | objetivo | 1600 ms | 0/200/400/600 ms escalonados | facilidadOutCubic | desplazarse hacia adentroVer una vez |
| Tarjetas de menú | opacidad 0, escala 0,95, y 20 | opacidad 1, escala 1, y 0 | 500 ms | Escalonamiento de 80 ms | facilidad | cambio de pestaña + inView |
| Tarjetas de firma | opacidad 0, y 40 | opacidad 1, y 0 | 600 ms | Escalonamiento de 120 ms | facilidad | desplazarse enVer |
| Desplazamiento de firma | escala 1, borde ámbar/10 | escala 1,02, borde ámbar/60 | 300 ms | — | facilidad | flotar |
| Tarjetas de testimonios | opacidad 0, y 32 | opacidad 1, y 0 | 600 ms | Escalonamiento de 150 ms | facilidad | desplazarse enVer |
| Marquesina | continuo |continuo | 40 años | 0 ms | lineal | reproducción automática, pausa al pasar el mouse |
| Enlaces de navegación | color crema apagado | color ámbar | 200 ms | — | facilidad | flotar |
| Botones | — | brillo +8%, escala 1,02 | 200 ms | — | facilidad | hover |

---

## 8. DISEÑO RESPONSIVO

### Escritorio (≥1280px)
- Contenedor: max-w-7xl mx-auto px-6 md:px-12 lg:px-20
- Hero: min-h-screen, contenido alineado en la parte inferior con pb-20
- Nuestra historia: cuadrícula de dos columnas 50/50, sin espacios, min-h-600px
- Estadísticas: fila flexible de 4 columnas, espacio-24
- Menú: cuadrícula de 2×2 tarjetas por pestaña
- Bebidas exclusivas: cuadrícula de 3 columnas
- Testimonios: cuadrícula de 3 columnas
- Pie de página: cuadrícula de 4 columnas

### Tableta (768px–1279px)
- Nuestra historia: una sola columna, la altura de la imagen de 360 px es lo primero, el texto a continuación 
- Estadísticas: cuadrícula de 2 × 2, espacio-10
- Menú: cuadrícula de 2 columnas
- Bebidas exclusivas: mantenga 3 columnas, reduzca el relleno interno a p-4
- Testimonios: 2 columnas + 1 centrada debajo
- Pie de página: cuadrícula de 2 × 2

### Móvil (<768px)
- Barra de navegación: logotipo + hamburguesa, cajón desde la derecha
- Héroe: titular sujeta piso a 48px; la tarjeta de especiales se convierte en una franja de ancho completo en la parte inferior del héroe (no es una tarjeta flotante), lista de elementos de 1 columna
- Nuestra historia: 1 columna, imagen de 280 px de altura fija
- Estadísticas: cuadrícula de 2 × 2, piso de abrazadera de número de estadísticas 48px
- Pestañas de menú: `overflow-x-auto flex gap-6 pb-2 scrollbar-hide` (desplazamiento horizontal)
- Tarjetas de menú: 1 columna
- Bebidas exclusivas: pila de 1 columna
- Testimonios: pila de 1 columna
- Pie de página: 1 columna, gap-10

---

## 9. COPIA COMPLETAY

### Marca y núcleo
- **Nombre:** Ember & Ground
- **Lema:** Café que vale la pena despertar.
- **Ubicación:** 14 West Street, Marlow, SL7 2NB, Buckinghamshire
- **Teléfono:** 01628 477 212
- **Correo electrónico:** hello@emberandground.co.uk

### Navegación
Nuestra historia · Menú · Bebidas · Encuéntranos · Pedido En línea

### Hero
- **H1:** Café por el que vale la pena despertarse.
- **Sublínea:** Café de especialidad, granos de comercio directo y artesaníabebidas: servidas todos los días en el corazón de Marlow.
- **CTA 1:** Explora nuestro menú
- **CTA 2:** Visítanos

### Tarjeta de ofertas
- Encabezado: OFERTAS DE HOY
- Honey Lavender Latte · £4.80
- Cold Brew Tonic · £4.20
- The Morning Cortado · £3.60

### Nuestra historia
- **Etiqueta:** DESDE 2019
- **H2:** El café es nuestro oficio, no nuestro Product.
- **P1:** Comenzamos Ember & Ground con una convicción: un buen café requiere atención obsesiva en cada paso. Desde la selección de la granja hasta el vertido final, nada se deja al azar.
- **P2:** Nuestros granos provienen de granjas de origen único en Etiopía, Colombia y Guatemala, obtenidos a través de relaciones directas con productores que hemos visitado personalmente. Cada tueste se calibra semanalmente. Cada extracción se realiza a mano.
- **Enlace:** Lea nuestra historia completa →

### Estadísticas
- 12 orígenes · Fuentes de origen único
- 3 tostadores · Tostadores asociados
- 4.9★ · Google Clasificación
- Est. 2019 · Fundado

### Marquee
 Frijoles de comercio directo · Asados de temporada · Leche de avena disponible · Lunes a viernes de 7 a. m. a 6 p. m. · Sábado de 8 a. m. a 5 p. m. · Domingo de 9 a. m. a 3 p. m. · WiFi gratis · Comida para llevar y cena en casa · 

### Testimonios Encabezado
- **Etiqueta:** LO QUE DICE LA GENTEY
- **H2:** Clientes habituales, no solo clientes.

### Pie de página
- **Lema:** Café de especialidad, granos de comercio directo y bebidas artesanales en Marlow, Buckinghamshire.
- **Derechos de autor:** © 2024 Ember & Ground. Todos los derechos reservados.
- **Enlaces legales:** Política de privacidad · Términos de servicio

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
npx shadcn@latest add tabs card badge
```

**Extensión Tailwind `fontFamily` (`tailwind.config.ts`):**
```ts
theme: {
  extend: {
    fontFamily: {
      playfair: ['"Playfair Display"', 'serif'],
      jakarta:  ['"Plus Jakarta Sans"', 'sans-serif'],
    },
  },
}
```

**Importación de Framer Motion: use siempre esto, nunca `framer-motion`:**
```tsx
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react";
```
