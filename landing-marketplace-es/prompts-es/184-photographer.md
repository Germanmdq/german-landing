## Goal

Cree un sitio web completo de fotografía de retratos de varias páginas para **LUNA VOSS**: estética editorial oscura, héroe de collage dividido con retratos superpuestos, tonos cálidos casi negros, serif Cormorant Garamond y un cuerpo ligero con cuadrículas fotográficas asimétricas. Parece una revista editorial de alta gama, no una plantilla de fotografía genérica.

---

## Regla de diseño global: centrado

El contenido de cada sección debe estar envuelto en un contenedor centrado:
```jsx



  {/* section content */}



```
Nunca dejes contenido estírese en todo su ancho o siéntese al ras hacia la izquierda. `max-w-[1120px]` y `mx-auto` deben estar en el contenedor interno de cada sección. En dispositivos móviles, reduzca a `px-6`.

---

## Tech Stack

React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

---

## Sistema de diseño: colores

```css
:root {
  --background: 25 8% 5%;           /* warm near-black #0D0B09 */
  --foreground: 0 0% 98%;           /* white */
  --surface: 25 6% 9%;              /* slightly lighter warm dark #171310 */
  --surface-light: 35 14% 97%;      /* warm white for body sections #FAF8F5 */
  --primary: 35 18% 82%;            /* warm cream #DDD4C6 — accent on dark */
  --primary-foreground: 25 8% 5%;   /* dark bg color */
  --muted-foreground: 35 8% 55%;    /* warm muted text rgba approx */
  --border-dark: 35 8% 18%;         /* subtle warm border on dark bg */
  --border-light: 35 12% 88%;       /* subtle warm border on light bg */
}
```

**Uso:**
- `bg-[hsl(var(--background))]`: héroe, barra de navegación, oscuro secciones
- `bg-[hsl(var(--surface-light))]` — acerca de, testimonios, contacto
- `text-[hsl(var(--primary))]` — acento crema sobre oscuro
- `border-[hsl(var(--border-dark))]` — divisores de enlaces de navegación, bordes de sección oscuros
- `border-[hsl(var(--border-light))]` — tarjeta contornos, bordes de fotos enmarcados en luz bg

---

## Tipografía

**Importar:**
```html
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap
```

**Uso:**
- **Etiquetas de sección / Texto de la interfaz de usuario:** `fuente-['Inter'] fuente-[300] texto-[0.62rem] seguimiento-[0.22em] mayúsculas` — color cálido y apagado
- **Párrafos del cuerpo:** `fuente-['Inter'] fuente-[300] texto-[0.85rem] inicial-[1.9]`
- **Enlaces de navegación:** `fuente-['Inter'] fuente-[300] texto-[0.68rem] seguimiento-[0.12em]`
- **Encabezados — vertical:** `fuente-['Cormorant_Garamond'] fuente-[300] interlineado-[0.92]` — p.e. "FOTO"
- **Encabezados — cursiva:** `fuente-['Cormorant_Garamond'] fuente-[300] cursiva inicial-[0.92]` — p.e. "Acerca de ti"
- **Estadísticas/números grandes:** `fuente-['Cormorant_Garamond'] fuente-[300] texto-[2.4rem]`
- **Texto de marca de agua fantasma:** `fuente-['Cormorant_Garamond'] fuente-[200] texto-[10rem] opacidad-[0.03] select-none pointer-events-none`

**Tipo de escala:**
- Hero H1: `text-[clamp(3.8rem,6vw,6.5rem)]` — Cormorant Garamond300
- Sección H2: `text-[clamp(2.2rem,3.5vw,3.4rem)]` — Cormorant Garamond 300 cursiva
- Etiqueta superpuesta: `texto-[0.6rem] seguimiento-[0.24em]` — Inter 500 mayúscula
- Cuerpo: `texto-[0.83rem] líder-[1.9]` — Inter 300

---

## Efectos visuales

### 1. Superposición de textura de grano sutil
```jsx
{/* Fixed full-screen grain overlay — makes everything feel more crafted */}



```
Si `/noise.png` no está disponible, genere con un patrón repetitivo de gradiente radial CSS. Sensación de grano de película sutil.

### 2. Animaciones de entrada desenfocadas y escalonadas (Framer Motion)
```jsx
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: 'easeOut', delay: i * 0.1 }
  })
}
// Each element uses: custom={index} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
```
Aplicar a: líneas de titulares de héroes (cada palabra tiene su propio retraso), sobre texto, tarjetas de portafolio, citas testimoniales.

### 3. Marca de agua fantasma texto detrás de las secciones
On cada sección oscura: texto de Cormorant Garamond de gran tamaño en posición absoluta en `opacidad-[0.03]`, `fuente-[200]`, `seguimiento-[-0.03em]`. P.ej. "FOTOGRAFÍA" detrás del héroe, "PORTAFOLIO" detrás de la sección de galería. Agrega profundidad.

### 4. Degradado fino de la parte inferior del héroe a la sección
```jsx



```

### 5. Pase el cursor sobre el paralaje en el portafolio fotos
```jsx

```

---

## Desglose de componentes

### 01 — Navbar

**Diseño:** `position: absolute; top: 0; left: 0; right: 0; z-index: 30;` — transparente sobre héroe. `padding: 30px 56px;` `display: flex; justify-content: space-between; align-items: center;`

**Izquierda:** Nombre de la marca `LUNA VOSS` — Cormorant Garamond 400, `tracking-[0.2em]`, blanco, `text-[1rem]`

**Derecha:** Enlaces de navegación — Inter 300, `text-[0.68rem] seguimiento-[0.12em]` — `PORTAFOLIO · ACERCA · PRECIOS · CONTACTOS`

**Sin fondo, sin desenfoque** — puramente transparente. Se coloca naturalmente encima de la imagen del héroe oscuro.

**Móvil:** Menú de hamburguesas (3 líneas, arriba a la derecha). Menú superpuesto en pantalla completa con enlaces apilados, Cormorant Garamond serif, blanco sobre fondo oscuro.

---

### 02 — Hero (Dark Editorial Split)

**Diseño:** `min-height: 100vh; display: grid; grid-template-columns: 55% 45%; overflow: hidden;` Sin ancho máximo: héroe con sangrado completo intencionalmente.

**Panel de fotos izquierdo (55%):**
- `position: relative; overflow: hidden;`
- La foto vertical principal llena todo el panel izquierdo: `absolute inset-0 w-full h-full object-cover object-center`
- Superposición: `absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.15)] to-[rgba(0,0,0,0.55)]` — garantiza legibilidad del título superpuesto
- **Segundo más pequeñoretrato:** posicionado `absoluta arriba-[80px] derecha-[24px] w-[175px] h-[240px] desbordamiento-oculto` — una foto de retrato separada en capas en la parte superior, sin borde-radius
- **Marca de agua fantasma:** `absoluta abajo-12 izquierda-12 fuente-['Cormorant_Garamond'] texto-[8rem] fuente-[200] texto-blanco/[0.05] interlineado-[0.85] seleccionar-ninguno` — texto: "RETRATO\nFOTOGRAFÍA"
- **Indicador social:** `izquierda absoluta-5 arriba-1/2 -traducir-y-1/2` — línea vertical (1px × 48px, blanco/20) + texto `@LUNAVOSS` en `writing-mode: vertical-rl; transform: rotate(180deg)` + otra línea debajo
- **Desvanecimiento inferior:** `absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(var(--background))] to-transparent`
- **El título principal se superpone a la división:** `inferior absoluto-[80px] izquierda-[56px] z-20` —
 ```
  PHOTO          ← Cormorant Garamond 300, normal, text-[clamp(4rem,6.5vw,6.5rem)]
  About You      ← Cormorant Garamond 300, italic, same size
  ```
 Texto blanco, `leading-[0.92]`

```jsx
{/* Image 1: portrait photography — woman, dramatic moody lighting, close-up face and shoulders, high contrast, dark warm tones, editorial fashion style, black and white */}


{/* Image 2 (small overlay): portrait photography — hands detail, or side profile, dark background, editorial black and white */}

```

**Panel de texto derecho (45%):**
- `background: hsl(var(--background))` — oscuro sólido, sin fotografía
- `display: flex; flex-direction: column; justify-content: flex-end; padding: 120px 56px 80px 48px`
- Monograma fantasma: `derecha absoluta-4 arriba-1/2 -translate-y-1/2 fuente-['Cormorant_Garamond'] texto-[16rem] fuente-[200] texto-blanco/[0.02] seleccionar-ninguno` — texto: "LV"
- Contenido (todos z-10):
 - Overline: `FOTÓGRAFO DE RETRATOS · LONDRES, Reino Unido` — Inter 300, `text-[0.6rem] tracking-[0.2em]` white/35, `mb-4`
 - Cuerpo: "Fotografía atemporal que captura quién eres realmente. Sesiones de retratos sinceras, elegantes y profundamente personales". — Inter 300, `text-[0.82rem] líder-[1.9]` white/45, `max-w-[280px] mb-10`
 - CTAs:
 ```jsx
     PORTFOLIO →    {/* border-bottom: 1px solid white/30, text-[0.68rem] tracking-[0.14em] white */}
     GET IN TOUCH →  {/* same style, white/40 */}
    ```
 - `gap-6 flex`
- Ubicación: `absolute bottom-6 right-6` — Pin de mapa SVG + `LONDRES, Reino Unido` — Inter 300, `text-[0.58rem] seguimiento-[0.1em]` blanco/30
- Indicador de punto/deslizador: `absolute bottom-8 left-12` — fila de 3 líneas: `w-5 h-[1px] bg-white`, `w-2 h-[1px] bg-white/25`, `w-2 h-[1px] bg-white/25`

**Móvil:** Apilar verticalmente: foto primero (altura de 60 vw), panel de texto debajo en fondo oscuro.

---

### 03 — Acerca de mí (Claro)

**Fondo:** `bg-[hsl(var(--surface-light))]` — blanco cálido `#FAF8F5`

**Relleno:** `py-24 px-14`

**Diseño:** Cuadrícula de 2 columnas `grid-cols-[1fr_1.05fr] gap-20 items-start`

**Izquierda — texto:**
- Overline: `ABOUT ME` — Inter 500, `text-[0.58rem] seguimiento-[0.22em]` cálido silenciado`text-[#C0B0A0]`, `mb-4`
- H2: Cormorant Garamond 300 cursiva, `text-[clamp(2.2rem,3.5vw,3.2rem)] leading-[1.15]` — oscuro cálido `#1A1210`:
 ```
  My goal is to capture you,
  your character, your story,
  your special essence.
  ```
- Cuerpo párrafo 1 (mb-6): "Hola, soy Luna Voss. Desde que tengo memoria, la fotografía siempre ha estado en mi vida. Probé muchos tipos de fotografía y entendí que la fotografía de retrato era mi pasión, porque es la más honesta y franca". — Inter 300, `text-[0.82rem] líder-[1.9]` cálido oscuro apagado `#6A5A50`, `max-w-[380px]`
- Párrafo 2 del cuerpo: "Mis fotografías son sinceras pero elegantes y sofisticadas. Quiero tomar fotografías tuyas realmente elegantes, naturales y atemporales. Espero trabajar contigo". — mismo estilo, ligeramente más claro
- Firma: Cormorant Garamond cursiva, `text-[1.1rem]` `#6A5A50` — "Foto, Luna →"
- `mt-10`

**Derecha — foto asimétrica collage:**
```
Position: relative
Top photo: margin-left: 64px, aspect-ratio 3/4
Bottom two: display grid, grid-template-columns: 1fr 1fr, gap-3, margin-right: 64px, margin-top: -16px
  Left small: aspect-ratio 1/1
  Right small: aspect-ratio 1/1, margin-top: 24px
```
```jsx
{/* Image 3: portrait photography — woman, elegant pose, soft natural lighting, dark warm background, editorial */}


{/* Image 4: portrait close-up — hands or jewelry detail, warm moody studio light, dark tones */}


{/* Image 5: portrait photography — profile or three-quarter view, clean dark background, editorial black and white */}

```

**Móvil:** Una sola columna: texto primero, fotos debajo en una cuadrícula de 2 columnas.

---

### 04 — Portafolio Galería

**Fondo:** `bg-[hsl(var(--background))]` — oscuro otra vez

**Relleno:** `py-24 px-14`

**Marca de agua fantasma:** `derecha absoluta-0 top-0 texto-[10rem] fuente-[200] texto-blanco/[0.03]` — "PORTFOLIO"

**Encabezado:**
- Sobrelínea: `OBRA SELECCIONADA`
- H2: Cormorant Garamond 300, blanco: "Portfolio"
- Derecha: `MÁS FOTOS →` — `text-[0.68rem] seguimiento-[0.14em]` crema/70, `borde-b borde-blanco/30`
- `flex justificación-entre elementos-fin mb-14`

**Pestañas de categoría:**
```jsx
['All', 'Portrait', 'Editorial', 'Fashion', 'Couples']
// Active tab: white text + border-b border-white
// Inactive: white/40 text, no border
// Inter 300, text-[0.62rem] tracking-[0.14em] uppercase, flex gap-8 mb-12
```

**Mampostería grid:**
- `display: grid; grid-template-columns: 1.15fr 0.85fr 1fr; gap: 16px; align-items: start;`
- Columna 1: una foto alta, `relación de aspecto 3/4` + etiqueta de categoría debajo en `texto-[0.58rem] seguimiento-[0.18em] texto en mayúsculas-blanco/40 mt-3`
- Columna 2: foto comenzando `padding-top: 40px`, `aspect-ratio 3/4`
- Columna 3: foto que comienza con `padding-top: 80px`, `aspect-ratio 4/5`
- Todas las fotos: efecto de escala de desplazamiento (consulte la sección de efectos visuales)

```jsx
{/* Images 6–8: portrait photography — editorial B&W, moody lighting, different poses and crops — mix of tight face crops, full body, and three-quarter views */}

```

**Móvil:** 2 columnas, igual ancho, sin desplazamiento vertical.

---

### 05 — Servicios / Precios

**Antecedentes:**`bg-[hsl(var(--surface-light))]`

**Relleno:** `py-24 px-14`

**Encabezado:**
- Overline: `SESIONES Y PRECIOS`
- H2: Cormorant Garamond 300 cursiva, oscura: "Cada sesión,\nadaptada para usted."
- `flex justify-between items-end mb-16`

**Tarjetas de precios de 3 columnas:**
```
grid-cols-3 gap-6
```

**Tarjeta estructura:**
```jsx



    

MINI SESSION


    

$150


    

1 hour · outdoor or studio


    

15 edited photos delivered


    

Online private gallery


    

1 location

BOOK THIS SESSION →  {/* border-b, Inter 300 */}



```

**Tres niveles:**
- **MINI** — $150 — 1 hora · 15 fotos editadas · 1 ubicación · galería privada en línea
- **FIRMA** — $350 — 2–3 horas · 40 fotos editadas · 2 ubicaciones · galería privada · cambio de vestimenta
- **EDITORIAL** — $600 — 5 horas · 80 fotos editadas · 3 ubicaciones · coordinación de cabello y maquillaje · lookbook impreso

Tarjeta intermedia (Firma): sombra ligera `shadow-lg` + borde más oscuro para indicar recomendado.

**Móvil:** Columna única stack.

---

### 06 - Proceso (cómo funciona)

**Fondo:** `bg-[hsl(var(--background))]` - oscuro

**Relleno:** `py-24 px-14`

**Encabezado:**
- Overline: `EL PROCESO`
- H2: Cormorant Garamond 300, blanco: "Qué esperar".

**Fila de 4 pasos:** `grid-cols-4 gap-8 mt-16`

Eda paso:
```jsx


01

BOOK


    Fill in the booking form. I'll get back within 24 hours to confirm your date and discuss your vision.
  


```

Pasos:
1. **RESERVAR** — "Rellena el formulario de reserva. Confirmaré tu fecha dentro de las 24 horas y discutiremos tu visión".
2. **PLAN** — "Hablaremos sobre ubicaciones, atuendos y el estado de ánimo que deseas. Te guiaré en cada detalle".
3. **DISPARO** — "La sesión en sí: relajada, sincera y dirigida. La mayoría de las personas se sorprenden de lo natural que se siente".
4. **RECIBIR** — "Tu galería llega en 2 semanas. Totalmente editada, con gradación de colores y lista para descargar o imprimir". 

**Líneas divisorias entre pasos:** `1px blanco sólido/10` vertical, `h-full` — solo en escritorio.

**Móvil:** 2 × 2 grid.

---

### 07 — Banner CTA de foto de ancho completo

**Diseño:** Sangrado completo (sin contenedor de ancho máximo), `min-height: 520px; position: relative; overflow: hidden;`

**Foto de fondo:** `absolute inset-0 w-full h-cubierta de objeto completa centro de objeto z-0`
```jsx
{/* Image 9: portrait photography — behind-the-scenes of a photoshoot, camera and subject, dark warm studio atmosphere, cinematic */}

```

**Superposición:** `inserción absoluta-0bg-gradient-to-b from-black/70 via-black/50 to-black/75 z-[1]`

**Contenido:** `relative z-10 flex flex-col items-center justificar-center text-center h-full py-24 px-14`
- H2: Cormorant Garamond 300 cursiva, blanco, `text-[clamp(2.5rem,4.5vw,4.5rem)]`:
 "¿Listo para ser fotografiado?"
- Cuerpo: "Reserva tu sesión de retratos en Londres. Disponible entre semana y fines de semana". — Inter 300, blanco/60, `text-[0.85rem] mb-10`
- Botón CTA: delineado — `border borde-blanco/40 texto-texto blanco-[0.7rem] seguimiento-[0.16em] px-10 py-4 hover:bg-white hover:text-black colores de transición duración-300`
 Texto: `RESERVA TU SESIÓN`

---

### 08 — Testimonios

**Antecedentes:** `bg-[hsl(var(--surface-light))]`

**Relleno:** `py-24 px-14`

**Diseño:** columna única centrada, `max-w-[780px] mx-auto text-center`

**Overline:** `LO QUE DICEN LOS CLIENTES`

**Comillas de apertura grandes:** Cormorant Garamond cursiva, `text-[7rem] text-[#C8B8A8]/50 líder-[0] mb-4`

**Quote:** Cormorant Garamond 300 italic, `text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.45] text-[#1A1210] mb-8`:
"Luna me hizo sentir completamente a gusto. Normalmente no me encantan las fotos mías, pero estas son las más hermosas que he tomado. Tiene una rara capacidad de capturar quién eres en realidad."

**Atribución:** `— Sarah M., Londres` — Inter 300, `text-[0.75rem] seguimiento-[0.14em] texto-[#9A8A78]`

**Abajo: 3 fichas de revisión seguidas (centradas, `flex gap-6 justify-center mt-16`):**
```jsx


★★★★★

Google Reviews

4.9 · 84 reviews


```
Tres tarjetas: Reseñas de Google · Instagram · Testimonios

---

### 09 — Instagram Strip

**Fondo:** `bg-[hsl(var(--background))]` — dark

**Relleno:** `py-16 px-14`

**Encabezado:** `flex justify-between items-center mb-8`
- Izquierda: `@LUNAVOSS` — Cormorant Garamond 300 cursiva, blanco, `text-[1.4rem]`
- Derecha: `SEGUIR EN INSTAGRAM →` — Inter 300, `text-[0.65rem] seguimiento-[0.16em]` blanco/40

**Tira fotográfica:** `grid grid-cols-6 gap-2`
- 6 fotos cuadradas, `aspect-ratio 1/1`, sin radio de borde, coloque el cursor sobre: `opacity-80 Transition-opacity`
```jsx
{/* Images 10–15: portrait photography Instagram feed — mix of face close-ups, hands, editorial poses, outdoor and studio, dark and light tones, editorial B&W and warm film style */}
<img src="" alt="Instagram portrait photography feed" className="w-full h-full object-cover object-center" />
```

**Móvil:** `grid-cols-3 gap-1` — 6 fotos en 2rows.

---

### 10 - Reserva / Contacto

**Fondo:** `bg-[hsl(var(--surface-light))]`

**Relleno:** `py-24 px-14`

**Diseño:** `grid grid-cols-[1fr_1.1fr] gap-20 items-start`

**Izquierda — texto:**
- Overline: `RESERVAR UNA SESIÓN`
- H2: Cormorant Garamond 300 cursiva, oscuro: "Creemos algo hermoso juntos".
- Cuerpo: "Actualmente estoy reservando sesiones de retratos, editoriales y de parejas en Londres y estoy disponible para viajar por todo el mundo. Complete el formulario y me comunicaré con usted dentro de las 24 horas". — Inter 300, `text-[0.82rem] líder-[1.9]` cálido silenciado, `max-w-[340px] mb-10`
- Detalles de contacto (pequeño, `flex flex-col gap-3`):
 - `hello@lunavoss.com`
 - `+44 (0) 7700 900 461`
 - `Londres, Reino Unido: viajes disponibles en todo el mundo`
 - Cada uno: Inter 300, `text-[0.78rem]` cálido silenciado

**Derecha — formulario:**
```jsx



    Session type
    Mini Session · $150
    Signature Session · $350
    Editorial Session · $600
    Custom / other  <button type="submit">SEND REQUEST →</button>
</form>
```
**Estilo de entrada:** `border-b border-[hsl(var(--border-light))] bg-transparent py-3 text-[0.82rem] font-[300] placeholder:text-[#B0A098] focus:outline-none focus:border-[#6A5A50] w-full`: sin radio de borde, sin cuadro. Entradas de solo subrayado.

**Botón Enviar:** `borde de borde-[#1A1210] texto-[#1A1210] texto-[0.68rem] seguimiento-[0.16em] py-4 px-10 hover:bg-[#1A1210] hover:text-white transición-colores duración-300 mt-2`

**Móvil:** Columna única, formulario debajo del texto.

---

### 11 — Pie de página

**Fondo:** `bg-[hsl(var(--background))]` — oscuro

**Relleno:** `py-16 px-14`

**Fila superior:** `flex justify-between items-start pb-12 border-b border-white/10`
- Izquierda: `LUNA VOSS` — Cormorant Garamond 300, `text-[1.2rem] seguimiento-[0.2em]` blanco + lema debajo: `Fotografía de retrato · Londres` — Inter 300, `text-[0.65rem] tracking-[0.14em]` white/35 `mt-2`
- Derecha: enlaces de navegación en 2 columnas, el mismo estilo que los enlaces de la barra de navegación, white/45

**Fila inferior:** `flex justify-between items-center pt-8`
- `© 2025 Luna Voss. Todos los derechos reservados.` — Inter 300, `text-[0.62rem]` white/30
- Derecha: enlaces sociales — `INSTAGRAM · BEHANCE · PINTEREST` — Inter 300, `text-[0.62rem] seguimiento-[0.12em]` blanco/35

---

## Animaciones

```
Navbar: no entrance animation — static absolute position
Hero headline lines:
  "PHOTO" → delay 0.1s, blur-up from y:30 blur:8px
  "About You" → delay 0.25s, same
Hero subtext block → delay 0.4s, opacity 0 → 1, y: 20 → 0
Hero CTAs → delay 0.55s
Small portrait overlay → delay 0.6s, opacity 0 → 1 (fade only, no y movement)
Social icons vertical → delay 0.7s, opacity 0 → 1

All scroll sections: IntersectionObserver (once: true, threshold: 0.12)
Section headers: stagger, first element delay 0, each +0.1s
Portfolio grid items: stagger 0.08s per card
Process steps: stagger 0.12s per step
Testimonial quote: single blur-up, duration 0.8s

Photo hover:
  Outer container: scale(1.0) → scale(1.03), 0.5s easeOut
  Inner img: scale(1.0) → scale(1.06), 0.5s easeOut
  Independent transforms create parallax effect
```

---

##Responsive

**Puntos de interrupción:** `sm: 640px · md: 768px · lg: 1024px · xl: 1280px`

```
Desktop (lg+):
  Hero: grid-cols-[55%_45%], min-h-screen
  About: grid-cols-2
  Portfolio: grid-cols-3 with vertical offsets
  Pricing: grid-cols-3
  Process: grid-cols-4
  Booking: grid-cols-2

Tablet (md–lg):
  Hero: grid-cols-[52%_48%]
  About: grid-cols-2, gap reduced
  Portfolio: grid-cols-2, remove vertical offsets
  Pricing: grid-cols-2 (3rd card below, full width)
  Process: grid-cols-2
  Booking: grid-cols-1

Mobile (< md):
  Hero: single column — photo 60vh height, then dark panel below with text
  All grids: single column
  Portfolio: 2-column grid, equal heights, no offsets
  Instagram: 3-column grid
  Padding: px-6 everywhere
  Headline size: clamp bottom value (e.g. 3rem)
  Vertical social icons: hidden
```

---

## Todo Copia

**Marca:** LUNA VOSS

**Nav:** `Portafolio · Acerca de · Precios · Contactos`

**Héroe:**
- Etiqueta: `FOTÓGRAFO DE RETRATOS · LONDRES, Reino Unido`
- H1 línea 1: `PHOTO`
- H1 línea 2 (cursiva): `Acerca de ti`
- Cuerpo: `Fotografía atemporal que captura quién eres realmente. Sesiones de retratos sinceras, elegantes y profundamente personales en Londres.`
- CTA 1: `PORTFOLIO →`
- CTA 2: `PONTE EN CONTACTO →`
- Social: `</body>@LUNAVOSS`
- Ubicación: `LONDRES, UK`

**Acerca de:**
- Etiqueta: `ACERCA DE MÍ`
- H2: `Mi objetivo es capturarte, tu personaje, tu historia, tu esencia especial.`
- P1: `Hola, soy Luna Voss. Desde que tengo uso de razón, la fotografía siempre ha estado en mi vida. Probé muchos tipos de fotografía y comprendí que la fotografía de retratos era mi pasión, porque es la más honesta y franca.`
- P2: `Mis fotografías son sinceras pero elegantes y sofisticadas. Quiero tomarte fotos realmente elegantes, naturales y atemporales. Esperamos trabajar con usted.`
- Firma: `Foto, Luna →`

**Portafolio:**
- Etiqueta: `OBRA SELECCIONADA`
- H2: `Portafolio`
- Enlace: `MÁS FOTOS →`
- Etiquetas de categoría (debajo de las fotos): `SERIE DE RETRATOS · EDITORIAL · MODA`
- Pestañas: `Todos · Retrato · Editorial · Moda · Parejas`

**Precios:**
- Etiqueta: `SESIONES Y PRECIOS`
- H2: `Cada sesión, hecha a tu medida.`
- Mini: `MINI SESIÓN · $150 · 1 hora · 15 fotos editadas · Galería privada online · 1 ubicación`
- Firma: `SESIÓN DE FIRMA · $350 · 2–3 horas · 40 fotos editadas · 2 ubicaciones · Cambio de outfit · Galería privada`
- Editorial: `SESIÓN EDITORIAL · $600 · 5 horas · 80 fotos editadas · 3 ubicaciones · Coordinación de peinado y maquillaje · Lookbook impreso`
- Tarjeta CTAs: `RESERVA ESTA SESIÓN →`

**Proceso:**
- Etiqueta: `EL PROCESO`
- H2: `Qué esperar.`
- Paso 1:`01 · RESERVAR · Rellena el formulario de reserva. Confirmaré tu fecha dentro de 24 horas y discutiremos tu visión.`
- Paso 2: `02 · PLAN · Hablaremos sobre ubicaciones, atuendos y el estado de ánimo que deseas. Te guiaré en cada detalle.`
- Paso 3: `03 · DISPARAR · La sesión en sí: relajada, sincera y dirigida. La mayoría de la gente se sorprende de lo natural que se siente.`
- Paso 4: `04 · RECIBIR · Tu galería llega en 2 semanas. Totalmente editado, con gradación de color y listo para descargar o imprimir.`

**Foto CTA Banner:**
- H2: `¿Listo para ser fotografiado?`
- Cuerpo: `Reserve su sesión de retratos en Londres. Disponible entre semana y fines de semana.`
- CTA: `RESERVA TU SESIÓN`

**Testimonios:**
- Etiqueta: `LO QUE DICEN LOS CLIENTES`
- Cita: `"Luna me hizo sentir completamente a gusto. No me suelen gustar las fotos mías, pero estas son las más bonitas que he Ella tiene una rara habilidad para capturar quién eres en realidad." `
- Atribución: `— Sarah M., Londres`
- Fichas: `Reseñas de Google · 4,9 · 84 reseñas | Instagram · @lunavoss | Calificación de 5 estrellas`

**Instagram:**
- Identificador: `@LUNAVOSS`
- Enlace: `SEGUIR EN INSTAGRAM →`

**Reserva:**
- Etiqueta: `BOOK A SESSION`
- H2: `Vamos a crear algo hermoso juntos.`
- Cuerpo: `Actualmente estoy reservando sesiones de retratos, editoriales y de parejas en Londres y estoy disponible para viajar por todo el mundo. Complete el formulario y me comunicaré con usted dentro de las 24 horas.`
- Correo electrónico: `hello@lunavoss.com`
- Teléfono: `+44 (0) 7700 900 461`
- Ubicación: `Londres, Reino Unido — viajes a todo el mundo disponible`
- Marcadores de posición del formulario: `Su nombre · Dirección de correo electrónico · Número de teléfono (opcional) · Tipo de sesión · Fecha preferida · Cuénteme sobre su visión...`
- Enviar: `ENVIAR SOLICITUD →`

**Pie de página:**
- Marca: `LUNA VOSS`
- Lema: `Fotografía de retrato · Londres`
- Nav: `Portafolio · Acerca de · Precios · Contactos · Instagram · Behance`
- Copyright: `© 2025 Luna Voss. Todos los derechos reservados.`
- Sociales: `INSTAGRAM · BEHANCE ·PINTEREST`

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.469.0",
  "@radix-ui/react-select": "latest"
}
```

---

## Notas rápidas

- **Nombre de marca** es "LUNA VOSS": cambie al nombre real de su fotógrafo antes de publicar.
- **Moneda + precio** ($150 / $350 / $600): ajústelo para que coincida con las tarifas reales del mercado para su región.
- **Todas las imágenes** se generan a partir de descripciones; para una apariencia premium, reemplácelas con tomas reales del portafolio. El mensaje genera automáticamente retratos de estilo editorial en blanco y negro.