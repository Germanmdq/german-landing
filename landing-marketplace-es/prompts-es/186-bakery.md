Cree un sitio web completo de panadería artesanal de una sola página llamado **MOURNE**: editorial, minimalista y cálido. Barra de navegación de color chocolate oscuro, fotografía a sangre completa, titulares grandes con serifa en cursiva Playfair Display, botones estilo corchete y un fondo cálido blanquecino en todas partes. La estética es una confianza tranquila: una panadería que deja que el pan hable. Inspirado en las panaderías artesanales europeas de alta gama: sin ruido, sin decoración, solo artesanía.

---

## Regla de diseño global: centrado

Cada sección debe estar centrada horizontalmente. Ningún bloque debe estar alineado a la izquierda con respecto al borde de la ventana gráfica.

```jsx



    {/* content */}
  


```

El contenido de texto más estrecho utiliza `max-w-3xl mx-auto`. Empareje siempre `max-w-*` con `mx-auto`.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```

---

## Sistema de diseño

```css
:root {
  --background: 36 25% 95%;        /* warm off-white #F5F2ED */
  --foreground: 24 45% 10%;        /* deep chocolate #2A1C10 */
  --primary: 24 45% 10%;           /* same — dark brown for buttons */
  --primary-foreground: 36 25% 95%;
  --accent: 28 38% 55%;            /* warm caramel #9B7550 — labels, accents */
  --muted: 36 20% 93%;             /* slightly darker off-white #EDE9E2 */
  --border: 30 18% 82%;            /* warm grey border */
  --navbar: 24 55% 12%;            /* very dark brown #2A1608 */
}
```

Sin sombras, sin brillo, sin morfismo de vidrio. Todo es plano, cálido y texturizado. La fotografía hace el trabajo visual. La tipografía y los espacios en blanco hacen el resto.

---

## Typography

```html
@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

| Rol | Fuente | Estilo |
|------|------|-------|
| H1 / héroe | Exhibición de Playfair | cursiva 400, 4rem–6rem |
| Sección H2 | Exhibición de Playfair | cursiva 400, 2,5rem–4rem |
| Subetiquetas | Inter | 500, 0,65 rem, seguimiento-[0,28 em] mayúsculas |
| Cuerpo | Inter | 300–400, 1rem, adelantado-[1,75] |
| Botones | Inter | 400, 0,75 rem, seguimiento-[0,08 em] |
| Marca de pie de página | Exhibición de Playfair | 400, 1,4 rem, espacio entre letras 0,22 em |

---

## Sistema de botones

Solo dos estilos. Siempre `inline-flex items-center justificar-center encoger-0 espacios en blanco-nowrap`:

```jsx
// Bracket button — light (on dark/photo backgrounds)
<button className="inline-flex items-center justify-center shrink-0 whitespace-nowrap h-10 px-6 border border-white/65 text-white font-inter text-[0.75rem] tracking-[0.08em] bg-transparent hover:bg-white/12 transition-colors">
  [ View Menu ]
</button>

// Bracket button — dark (on light backgrounds)
<button className="inline-flex items-center justify-center shrink-0 whitespace-nowrap h-10 px-6 border border-[hsl(var(--foreground))]/40 text-[hsl(var(--foreground))] font-inter text-[0.75rem] tracking-[0.08em] bg-transparent hover:bg-[hsl(var(--foreground))]/6 transition-colors">
  [ See Full Menu ]
</button>
```

Sin esquinas redondeadas. Sin sombras. Sin botones de relleno: solo corchetes en todo el sitio. Los bordes cuadrados son intencionales.

---

## Efectos visuales

**Superposición de degradado de foto principal:**
```css
linear-gradient(to bottom,
  rgba(40, 28, 16, 0.12) 0%,
  rgba(40, 28, 16, 0.55) 100%)
```
El texto siempre se encuentra en la parte inferior izquierda del héroe, cabalgando sobre el desvanecimiento oscuro.

**Entrada escalonada (Framer Motion):**
```
Each element: initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.12 }}
Triggered by IntersectionObserver on scroll
```

**Foto del producto flotante:**
```
Inner image only: scale(1.04) on hover
transition-transform duration-700 ease-out
Outer container: overflow-hidden — image scales inside, card stays still
```

**Ticker de marquesina:**
```
Horizontal auto-scroll, looping: "SOURDOUGH · CROISSANTS · PASTRIES · CAKES · RYE ·"
speed: 30s linear infinite
font: Inter 300, 0.7rem, tracking-[0.3em], text-[hsl(var(--accent))]
```

---

## Desglose de componentes

### 1. Barra de navegación
```
Position: sticky top-0 z-40
Background: hsl(var(--navbar)) — very dark brown #2A1608
Padding: px-10 py-5
Layout: flex justify-between items-center (3 zones)

Left: 3 nav links
  Inter 400 text-[0.7rem] tracking-[0.18em] text-white/55 uppercase hover:text-white transition-colors
  "MENU" · "ABOUT" · "PRODUCTS"

Center: Brand name
  Playfair Display italic 400, text-xl tracking-[0.22em] text-white
  "MOURNE"

Right: 2 items
  "FIND US" — same style as left links
  "ORDER" — same style, slight text-white/80

No CTA button. No hamburger icon on desktop. Pure typographic navbar.
Mobile: brand center stays, left/right collapse to hamburger → dark overlay menu
```

### 2. Héroe
```
Height: min-h-[85vh] relative overflow-hidden flex items-end

Background image — absolute inset-0:
  [Media brief: image | artisan bakers working at a wooden table covered in flour, hands shaping dough, bread loaves and racks in background, warm natural window light, bakery aprons, candid and real atmosphere | any composition — gradient overlay handles legibility]
  object-cover object-center w-full h-full

Gradient overlay: absolute inset-0
  linear-gradient(to bottom, rgba(40,28,16,0.10) 0%, rgba(40,28,16,0.58) 100%)

Content: relative z-10 max-w-6xl mx-auto px-10 w-full pb-16

  Opening label: Inter 400 text-[0.68rem] tracking-[0.28em] text-white/55 uppercase mb-4
    "OPEN DAILY 7AM – 6PM"

  H1: Playfair Display italic 400, text-[clamp(2.8rem,5.5vw,5.2rem)] text-white leading-[1.05]
    "Fresh Bread."
    "Every Morning."
    — split across two lines, staggered word-by-word entrance animation

  Subline: Inter 300 text-[0.9rem] text-white/70 mt-4 leading-relaxed
    "Baked by hand. Served with care."

  CTA row: flex gap-4 mt-8
    [ View Menu ] (bracket light) + [ Order Online ] (bracket light)
```

### 3. Recién horneado: sección dividida
```
Section: bg-[hsl(var(--background))] py-24
Content: max-w-6xl mx-auto px-10

Layout: grid grid-cols-2 gap-0 items-center

LEFT column (pr-16):
  Label: Inter 500 text-[0.65rem] tracking-[0.28em] text-[hsl(var(--accent))] uppercase mb-5
    "OUR CRAFT"
  H2: Playfair Display italic 400, text-[clamp(2.2rem,3.5vw,3.5rem)] text-[hsl(var(--foreground))] leading-[1.1]
    "Freshly"
    "Baked"
  Body: Inter 300 text-[0.95rem] text-[hsl(var(--accent))] leading-[1.75] mt-5 max-w-xs
    "Made daily from simple ingredients — flour, water, time."
  CTA row: flex gap-4 mt-9
    [ See Full Menu ] + [ Order Now ] (bracket dark)

RIGHT column (margin-right: -64px bleeds past container):
  Single large image — no border-radius, square crop, tall aspect:
  aspect-[4/5] overflow-hidden
  [Media brief: image | close-up of a freshly baked artisan sourdough loaf and buttery croissants on a wooden board, warm natural side-lighting, flour dusting visible, dark rustic surface, editorial food photography style]

  No caption, no badge. Just the photo bleeding to the right edge.

Mobile: single column, image full-width, text above
```

### 4. Tira de teletipo
```
Section: bg-[hsl(var(--muted))] border-y border-[hsl(var(--border))] py-3 overflow-hidden

Looping marquee — two identical strings side by side, translate-x animation:
"SOURDOUGH · CROISSANTS · PASTRIES · RYE BREAD · CAKES · DANISHES · BAGUETTES · ÉCLAIRS · "

Inter 300 text-[0.7rem] tracking-[0.3em] text-[hsl(var(--accent))] uppercase whitespace-nowrap
```

### 5. Nuestra selección: cuadrícula de productos
```
Section: bg-[hsl(var(--background))] py-24
Content: max-w-6xl mx-auto px-10

Header row: flex justify-between items-end mb-14
  Left: H2 Playfair Display italic 400 text-[clamp(2rem,3.5vw,3.2rem)] text-[hsl(var(--foreground))]
    "Our Selection"
  Right: [ View All ] bracket dark button

Grid: grid grid-cols-3 gap-8

3 product cards (no card border, no shadow — just image + text):
  Image: overflow-hidden mb-5
    aspect-square w-full
    Inner img: object-cover object-center w-full h-full transition-transform duration-700 hover:scale-[1.04]

  Category label: Inter 500 text-[0.6rem] tracking-[0.25em] text-[hsl(var(--accent))] uppercase mb-2
  Product name: Playfair Display italic 400 text-xl text-[hsl(var(--foreground))]
  Variants: Inter 300 text-[0.78rem] text-[hsl(var(--accent))] mt-1

  Card 1:
    [Media brief: image | artisan sourdough loaf on a wooden cutting board, scored top, dark crust, flour dusted, warm side lighting, minimal styling, editorial food photography]
    "ARTISAN BREADS" · "Sourdough" · Classic · Seeded · Rye

  Card 2:
    [Media brief: image | two golden croissants on a white ceramic plate, flaky layered pastry visible, butter glistening, soft warm light from behind, minimal background]
    "VIENNOISERIE" · "Croissants" · Butter · Almond · Chocolate

  Card 3:
    [Media brief: image | assorted pastries and tarts on a plate — raspberry tart, éclair, danish — styled on pale linen, elegant and restrained food photography]
    "PÂTISSERIE" · "Pastries" · Tarts · Danishes · Éclairs
```

### 6. Nuestro proceso: dividir con foto grande a la izquierda
```
Section: bg-[hsl(var(--muted))] py-24
Content: max-w-6xl mx-auto px-10

Layout: grid grid-cols-2 gap-16 items-center

LEFT — large photo (bleeds slightly left, margin-left: -32px):
  aspect-[3/4] overflow-hidden w-full
  [Media brief: image | baker's hands dusting flour on shaped dough, dark baking surface, motion and craft visible, warm dramatic side lighting, close perspective, candid]

RIGHT — text:
  Label: "OUR PROCESS" — accent uppercase tracking
  H2: Playfair Display italic 400 text-[clamp(2rem,3vw,3rem)] text-[hsl(var(--foreground))] leading-tight mt-3
    "We work slowly —"
    "allowing time to shape"
    "everything."
  Body: Inter 300 text-[0.95rem] text-[hsl(var(--accent))] leading-[1.8] mt-6 max-w-sm
    "No shortcuts, no additives. Our sourdough ferments for 24 hours. Our croissants are laminated over two days. This is how good bread is made."

  3 process steps (mt-10 flex flex-col gap-7):
    Each: flex items-start gap-5
    Number: Playfair Display italic text-4xl text-[hsl(var(--border))] font-400 leading-none w-10 shrink-0 — "01" / "02" / "03"
    Content: Inter 300 text-sm text-[hsl(var(--foreground))]
      Title: Inter 500 text-sm — slight dark
      Sub: Inter 300 text-[hsl(var(--accent))] text-sm mt-1

    Step 1: "The Starter" — "Our sourdough culture has been alive for over ten years."
    Step 2: "The Shaping" — "Every loaf is formed by hand, never by machine."
    Step 3: "The Bake" — "Stone deck ovens, extreme heat, steam injection."

  [ Learn More ] bracket dark button mt-10
```

### 7. Banner fotográfico de ancho completo
```
Section: relative h-[380px] overflow-hidden

Background image — absolute inset-0:
  [Media brief: image | wide interior shot of an artisan bakery — shelves lined with bread, warm golden light, bakers working in background, flour in the air, inviting and real | any composition — centered content uses gradient for legibility]
  object-cover object-center w-full h-full

Gradient overlay: absolute inset-0
  rgba(40,28,16,0.55) flat overlay

Content: relative z-10 max-w-3xl mx-auto px-10 h-full flex flex-col items-center justify-center text-center

  H2: Playfair Display italic 400 text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight
    "Visit us on"
    "Chapel Street."
  Body: Inter 300 text-sm text-white/65 mt-4
    "Monday – Saturday 7am to 6pm · Sunday 8am to 2pm"
  Button: [ Get Directions ] bracket light mt-8
```

### 8. Pedidos al por mayor y personalizados
```
Section: bg-[hsl(var(--background))] py-24
Content: max-w-6xl mx-auto px-10

Layout: grid grid-cols-2 gap-16

LEFT card:
  Border-top: 2px solid hsl(var(--foreground)) — thin dark line, typographic feel
  pt-8

  Label: "WHOLESALE" accent uppercase tracking
  H3: Playfair Display italic 400 text-[1.9rem] text-[hsl(var(--foreground))] mt-3 leading-tight
    "Supplying cafés,"
    "restaurants &"
    "hotels."
  Body: Inter 300 text-sm text-[hsl(var(--accent))] leading-[1.75] mt-4
    "We bake for over 40 local businesses across the city. If you're interested in a wholesale account, get in touch."
  [ Enquire ] bracket dark button mt-8

RIGHT card:
  Border-top: 2px solid hsl(var(--foreground))
  pt-8

  Label: "CUSTOM ORDERS" accent uppercase tracking
  H3: Playfair Display italic 400 text-[1.9rem] text-[hsl(var(--foreground))] mt-3 leading-tight
    "Wedding cakes,"
    "celebration"
    "& gifting."
  Body: Inter 300 text-sm text-[hsl(var(--accent))] leading-[1.75] mt-4
    "Custom cakes and bespoke orders available with 5 days notice. Contact us to discuss what you have in mind."
  [ Get in Touch ] bracket dark button mt-8
```

### 9. Testimonios
```
Section: bg-[hsl(var(--muted))] py-24 border-y border-[hsl(var(--border))]
Content: max-w-6xl mx-auto px-10

H2 (text-center): Playfair Display italic 400 text-[clamp(2rem,3vw,3rem)] text-[hsl(var(--foreground))]
  "What people say."

Grid: mt-14 grid grid-cols-3 gap-12

3 testimonials — no card, no border — pure typography:
  Stars: "★★★★★" text-[hsl(var(--accent))] text-xs tracking-[0.2em] mb-4
  Quote: Playfair Display italic 400 text-[1.05rem] text-[hsl(var(--foreground))] leading-[1.7]
  Attribution: Inter 300 text-[0.72rem] text-[hsl(var(--accent))] tracking-[0.1em] mt-4 uppercase
    — Name, location

  Quote 1: "The best sourdough I've had outside of San Francisco. They have a real starter, real patience, and it shows."
    — Sarah M., Local resident

  Quote 2: "We've been sourcing croissants from Mourne for our café for three years. Our customers ask for them by name."
    — James T., Café owner

  Quote 3: "Ordered a custom birthday cake. They took time to understand what we wanted and delivered something completely beautiful."
    — Elena R., Customer
```

### 10. Tira de Instagram (visual)
```
Section: bg-[hsl(var(--background))] py-16
Content: max-w-6xl mx-auto px-10

Header: flex justify-between items-center mb-8
  Left: Inter 500 text-[0.65rem] tracking-[0.28em] text-[hsl(var(--accent))] uppercase — "@mourneartisanbakery"
  Right: [ Follow Us ] bracket dark button

Grid: grid grid-cols-5 gap-3 — 5 square photos, overflow-hidden, hover scale:

  Photo 1: [Media brief: image | close-up of sourdough loaf with flour dusting, dark surface, overhead, editorial]
  Photo 2: [Media brief: image | baker's hands scoring raw dough with a lame, dramatic side lighting]
  Photo 3: [Media brief: image | tray of freshly baked croissants, golden brown, steam rising, warm bakery light]
  Photo 4: [Media brief: image | interior bakery shelf with rows of bread, warm golden morning light]
  Photo 5: [Media brief: image | coffee and a pastry on a white ceramic plate, minimal café styling, top-down]

  Each: aspect-square overflow-hidden cursor-pointer
    img: w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.05]
```

### 11. Contacto y ubicación
```
Section: bg-[hsl(var(--muted))] py-24 border-t border-[hsl(var(--border))]
Content: max-w-6xl mx-auto px-10

Layout: grid grid-cols-2 gap-20 items-start

LEFT:
  H2: Playfair Display italic 400 text-[clamp(2rem,3vw,2.8rem)] text-[hsl(var(--foreground))] leading-tight
    "Come find us."

  Details (mt-8 flex flex-col gap-7):
    Each block: border-t border-[hsl(var(--border))] pt-5

    Block 1 — Address:
      Label: "BAKERY" accent uppercase tracking text-[0.62rem]
      Text: Inter 300 text-sm text-[hsl(var(--foreground))] leading-[1.75] mt-2
        "14 Chapel Street" / "Dublin 2" / "D02 VX68"

    Block 2 — Hours:
      Label: "OPENING HOURS"
      Text: "Mon – Sat  7:00am – 6:00pm" / "Sunday  8:00am – 2:00pm"

    Block 3 — Contact:
      Label: "GET IN TOUCH"
      Text: "hello@mournebakey.com" / "+353 1 234 5678"

  [ Order Online ] bracket dark button mt-10

RIGHT:
  Map area: aspect-[4/3] bg-[hsl(var(--muted))] border border-[hsl(var(--border))] overflow-hidden
  [Media brief: image | street-level view of a charming artisan bakery storefront, warm window display, morning light, inviting signage, European street]
```

### 12. Pie de página
```
Section: bg-[hsl(var(--navbar))] py-14 px-10

Content: max-w-6xl mx-auto

Layout: grid grid-cols-3 gap-10 items-start

Col 1 — Brand:
  "MOURNE" — Playfair Display italic 400 text-xl tracking-[0.22em] text-white
  "Artisan Bakery · Dublin" — Inter 300 text-xs text-white/40 tracking-[0.15em] mt-2
  "Est. 2011" — same style mt-1

Col 2 — Links (centered):
  Label: Inter 500 text-[0.6rem] tracking-[0.25em] text-white/30 uppercase mb-5 — "NAVIGATE"
  Links: Menu · About · Our Process · Wholesale · Custom Orders · Find Us
  Inter 300 text-sm text-white/55 hover:text-white block mb-3

Col 3 — Social + newsletter:
  Label: "STAY IN TOUCH" same style mb-4
  Email input row: flex gap-3
    Input: h-10 bg-transparent border-b border-white/25 text-white text-sm font-light placeholder:text-white/30 outline-none flex-1 focus:border-white/60 transition-colors — "Your email"
    Submit: [ → ] — bracket light h-10 px-4

  Socials: flex gap-6 mt-6
    "Instagram" / "Facebook" — Inter 300 text-xs text-white/40 hover:text-white/80 tracking-[0.15em]

Bottom bar: mt-12 pt-6 border-t border-white/10 flex justify-between items-center
  "© 2026 Mourne Artisan Bakery. All rights reserved." Inter 300 text-xs text-white/30
  "Crafted with care." Playfair Display italic text-sm text-white/25
```

---

## Resumen de animaciones

| Elemento | Animación | Gatillo |
|---------|-----------|---------|
| Etiqueta de héroe + palabras H1 | desvanecimiento, escalonado 0,12 s por elemento | en carga |
| Sublínea de héroe + CTA | desvanecimiento, retraso de 0,6 s | en carga |
| Imágenes de productos | escala al pasar el mouse (solo imagen interior) | flotar |
| Encabezados de sección | opacidad 0→1, y 16→0 | IntersecciónObservador |
| Pasos del proceso | desvanecimiento, escalonado 0,15 s | IntersecciónObservador |
| Fotos de Instagram | escala al pasar el mouse | flotar |
| Ticker de marquesina | bucle continuo de traducción-x | siempre |

---

## Responsive

**Móvil (< 768px):**
- Barra de navegación: centro de marca, hamburguesa → superposición oscura
- Héroe: texto alineado a la izquierda, letra más pequeña, sangrado completo photo
- Todas las cuadrículas de 2 columnas: una sola columna
- Cuadrícula de producto: una sola columna (desplazamiento o pila)
- Proceso: imagen en la parte superior, texto debajo
- Banner fotográfico de ancho completo: altura más corta (240 px)
- Tira de Instagram: 3 columnas (ocultar los últimos 2 elementos)
- Pie de página: apilado

**Escritorio (≥ 768px):** todo según lo especificado

---

## Todo copia

**Marca:** MORNE — Artisan Bakery · Dublin · Est. 2011

**Nav:** MENÚ · ACERCA · PRODUCTOS · ENCUENTRANOS · PEDIDO

**Hero:** "Pan fresco. Todas las mañanas". / "Horneado a mano. Servido con cuidado."
**Insignia de horario:** "ABIERTO DIARIO DE 7AM A 6PM"

**Sección de artesanía:** "Recién horneado" / "Elaborado diariamente con ingredientes simples: harina, agua, tiempo".

**Ticker:** "MASA Madre · CROISSANTS · PASTELES · PAN DE CENTENO · TORTAS · DANÉS · BAGUETTES · ÉCLAIRS ·"

**Productos:** Panes Artesanos (Masa Madre — Clásico · Sin Semillas · Centeno) · Viennoiserie (Croissants — Mantequilla · Almendra · Chocolate) · Pastelería (Bollería — Tartas · Danés · Éclairs)

**Proceso:** "Trabajamos lentamente, dejando que el tiempo le dé forma a todo". / Pasos: El iniciador · El moldeado · El horneado

**Banner de ancho completo:** "Visítenos en Chapel Street". / "Lunes – Sábado 7 am a 6 pm · Domingo 8 am a 2 pm"

**Venta al por mayor:** "Suministro de cafeterías,restaurantes y hoteles."
**Personalizado:** "Pasteles de boda, celebraciones y regalos."

**Contacto:** 14 Chapel Street · Dublin 2 · hello@mournebakery.com · +353 1 234 5678

**Lema del pie de página:** "Elaborado con care."

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx"
}
```

---

*Notas rápidas:*
- *Las etiquetas de los botones de corchetes incluyen los corchetes reales como caracteres de texto: `[ Ver menú ]`: esto es intencional, parte de la estética*
- *La foto con sangrado a la derecha en la sección 3 usa un margen negativo `margen derecho: -64px`: esto solo funciona dentro de un contenedor `max-w-6xl` con `overflow-hidden` en la sección*
- *Marquesina: duplique la cadena de texto dos veces dentro de un contenedor flexible, luego anime TranslateX(-50%) infinitamente a 30 segundos lineales; no se necesita biblioteca*
- *No hay esquinas redondeadas en ninguna parte, ni en botones, ni en imágenes, ni en tarjetas. Bordes cuadrados en todas partes.*