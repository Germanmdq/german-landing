# Street Burgers — Aviso del sitio web de camiones de comida

## Objetivo
Cree un sitio web de camiones de comida callejera atrevido y lleno de energía con pantalla tipo Bebas Neue, cálidos detalles en azafrán sobre casi negro, una tarjeta de vista previa del menú flotante, rastreador de ubicación y tira de estadísticas de conteo.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

## Sistema de diseño

### Colores
```css
:root {
  --background: 0 0% 6%;
  --foreground: 0 0% 96%;
  --primary: 38 85% 56%;
  --primary-foreground: 0 0% 4%;
  --muted-foreground: 0 0% 58%;
  --border: 0 0% 20%;
  /* Raw hex reference */
  /* warm-saffron: #f0a82a */
  /* near-black: #0f0f0f */
  /* warm-white: #fafafa */
  /* deep-orange: #c47a1a */
}
```

### Tipografía
Importación de fuentes de Google: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400&display=swap`
- Pantalla: Bebas Neue 400 (todos los titulares, precios, etiquetas, secciones)
- Cuerpo: Plus Jakarta Sans 400
- Leyendas/precios: Plus Jakarta Sans 300

## Visual Efectos

1. **Texto de fondo "CALLE"** — Bebas Neue en clamp(240px,34vw,500px), color: #f0a82a, opacidad: 0,04, posición: absoluta, derecha: -2%, arriba: 50%, transformación: traducirY(-50%), índice z: 0, eventos de puntero: ninguno
2. **Tarjeta de vista previa del menú flotante**: posición absoluta debajo de las CTA destacadas, fondo casi negro #1a1a1a, borde azafrán de 1 px, radio del borde: 4 px, escala de movimiento del marco 0,9 → 1 con un retraso de 0,4 s
3. **Tira de estadísticas de conteo**: color azafrán, texto casi negro, 4 estadísticas en Bebas Neue 72px, requestAnimationFrame de más de 1,6 s
4. **Pasar sobre la tarjeta de elemento de firma**: escala de imagen 1,04 (0,25 s), aparece un borde azafrán de 1 px (0,2 s), traducirY -4px

## Desglose de componentes

### 1. Barra de navegación
```tsx
// Sticky, bg: #0f0f0f, border-bottom: 1px solid #1f1f1f, height: 60px
// Left: "Street Burgers" — Bebas Neue, 22px, letter-spacing: 0.06em, color: #fafafa
// Center: Menu / Locations / About / Instagram — Plus Jakarta Sans 400, 14px, #c0c0c0
// Right: "Find Us" — bg: #f0a82a, color: #0f0f0f, Plus Jakarta 400, 14px, px-5 py-2.5, border-radius: 3px
// Framer Motion: y -60→0, 0.45s ease-out
```

### 2. Hero
```tsx
// Full-viewport, min-height: 100vh, position: relative, overflow: hidden, bg: #0f0f0f

{/* Image: Street food truck photography — bold branded yellow-and-black Street Burgers food truck at street level, steam rising from the grill visible through the serving window, queue of happy customers waiting, city street setting at golden hour or at night with warm street light glow, vibrant and high-energy urban food scene */}
<img src="" alt="Street Burgers food truck on city street with customers queuing" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />

// Gradient overlay — composition independent:
// linear-gradient(to right, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.65) 55%, transparent 100%)
// position: absolute; inset: 0; z-index: 1

// Background text "STREET":
// Bebas Neue, clamp(240px,34vw,500px), color: #f0a82a, opacity: 0.04
// position: absolute, right: -2%, top: 50%, transform: translateY(-50%), z-index: 0

// Content panel: position absolute, left 0, top 0, height 100%, width 55%, z-index 10
// padding-left: clamp(24px,6vw,96px), display flex flex-col justify-center

// Kicker: Plus Jakarta 300, 12px, letter-spacing 0.16em, uppercase, color: #f0a82a, margin-bottom 12px
// "SMASH BURGERS · LONDON"

// Main headline: "THE BEST BURGER YOU'LL EAT ALL WEEK."
// Bebas Neue, clamp(58px,8.5vw,145px), line-height: 0.92, color: #fafafa
// Framer Motion: opacity 0→1, x -40→0, 0.7s ease-out, delay: 0.1s

// Sub: Plus Jakarta Sans 300, 17px, color: #8c8c8c, margin-top 20px, max-width 440px, line-height 1.65
// "Premium smash burgers. Maximum flavour. Zero pretension. Five locations across London this week."
// Framer Motion: opacity 0→1, y 20→0, 0.6s, delay 0.3s

// CTAs (flex row, gap 12px, margin-top 28px):
// "See Full Menu" — bg: #f0a82a, color: #0f0f0f, Plus Jakarta 400, 15px, px-7 py-3.5, border-radius: 3px
// "Find Us This Week" — bg: transparent, border: 1px solid rgba(240,168,42,0.5), color: #fafafa, Plus Jakarta 400, 15px, px-7 py-3.5, border-radius: 3px
// Framer Motion: opacity 0→1, y 20→0, 0.6s, delay 0.5s

// Floating Menu Card — position relative z-20, margin-top 32px, display inline-block:
// bg: #1a1a1a, border: 1px solid #f0a82a, border-radius: 4px, padding: 16px 20px, min-width: 220px
// Framer Motion: initial scale 0.9, animate scale 1, delay 0.4s, duration 0.5s, ease [0.34,1.56,0.64,1]

// Card header: Bebas Neue, 16px, letter-spacing 0.08em, color: #f0a82a: "TODAY'S TOP PICKS"
// Divider: 1px solid #2a2a2a, margin 8px 0

// 3 menu items (each: flex justify-between align-center, padding: 6px 0):
// Left: Plus Jakarta 300, 14px, #fafafa — item name
// Right: Plus Jakarta 300, 13px, #f0a82a — price

// Item 1: "The Classic" / "£11"
// Item 2: "The Smash BBQ" / "£13"
// Item 3: "The Vegan" / "£11"

// Card footer: saffron "See Full Menu →" Plus Jakarta 300, 12px, #f0a82a, margin-top 10px
```

### 3. Filas de categorías de menú
```tsx
// Section bg: #0f0f0f, padding: 80px clamp(24px,6vw,96px)
// Section label: Plus Jakarta 300, 12px, letter-spacing 0.16em, uppercase, color: #f0a82a, margin-bottom 8px: "THE MENU"
// Headline: Bebas Neue, clamp(36px,5vw,80px), #fafafa, margin-bottom 48px: "WHAT WE SERVE"

// 4 category rows, each: border-top 1px solid rgba(255,255,255,0.12), padding 28px 0
// flex justify-between align-center, cursor pointer
// Hover (Framer Motion whileHover): y -3px (0.2s), border-left: 4px solid #f0a82a, padding-left 16px, box-shadow: 0 4px 20px rgba(240,168,42,0.25)

// Left: Bebas Neue, 28px, #fafafa — category name
//       Plus Jakarta 400, 14px, #8c8c8c, margin-top 4px — description
// Right: Plus Jakarta 300, 14px, #7a7a7a — "from £9"
//        Saffron "→" Bebas Neue, 24px, #f0a82a, margin-left 12px

// Row 1: "Signature Burgers" / "Our smash burger line-up. Every one made fresh to order." / "from £11"
// Row 2: "Loaded Fries" / "Skin-on fries, four ways. A meal on their own." / "from £5"
// Row 3: "Drinks" / "Fanta floats, Mexican Coke, fresh lemonade, iced tea." / "from £2.50"
// Row 4: "Weekly Specials" / "A different special every week. Always worth it." / "from £12"
```

### 4. Firma Artículos
```tsx
// Section bg: #0f0f0f, padding: 80px clamp(24px,6vw,96px)
// Headline: Bebas Neue, clamp(32px,4.5vw,72px), #fafafa, margin-bottom 48px: "THE SIGNATURES"

// 3-column flex, gap 24px

// Each card: bg: #111, border: 1px solid #1f1f1f, border-radius: 4px, overflow hidden
// Hover: Framer Motion (image scale 1.04, border-color #f0a82a, 0.25s ease-out)

// Card 1 — The Classic:
{/* Image: Close-up overhead photography of a double smash burger — two thin crispy-edged smash patties, melted American cheese, pickles, mustard, ketchup, glossy brioche bun, served on parchment in a dark metal tray, dramatic side lighting showing texture and juiciness, steam visible */}
<img src="" alt="The Classic double smash burger with American cheese and pickles" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />
// Card body, padding 20px
// Bebas Neue, 28px, #fafafa: "THE CLASSIC"
// Plus Jakarta 300, 13px, #8c8c8c, margin-top 6px: "Double smash patty · American cheese · Pickles · Mustard · Ketchup · Brioche"
// Saffron price, Bebas Neue 24px, #f0a82a, margin-top 12px: "£11"

// Card 2 — The Smash BBQ:
{/* Image: Side-angle close-up of The Smash BBQ burger — two smash patties with crispy bacon rasher visible, glossy BBQ sauce dripping, crispy fried onions on top, brioche bun, dramatic backlighting, dark moody food photography */}
<img src="" alt="The Smash BBQ burger with bacon and house BBQ sauce" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />
// "THE SMASH BBQ" / "Double smash patty · Smoked streaky bacon · House BBQ · Crispy fried onions · Brioche" / "£13"

// Card 3 — The Vegan:
{/* Image: Overhead shot of The Vegan burger — Beyond Beef smash patty, vegan cheese, vivid pickled red onion slices, shredded green iceberg lettuce, vegan mayo, brioche bun, shot on dark slate surface with vibrant colour contrast */}
<img src="" alt="The Vegan Beyond Beef smash burger with pickled red onion" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />
// "THE VEGAN" / "Beyond Beef smash patty · Vegan cheese · Pickled red onion · Shredded iceberg · Vegan mayo · Brioche" / "£11"
```

### 5. Rastreador de ubicación
```tsx
// Section bg: #0f0f0f, padding: 80px clamp(24px,6vw,96px)
// Inner card: bg: #111, border: 1px solid #1f1f1f, border-radius: 4px, padding: 40px 40px

// Bebas Neue, clamp(28px,4vw,56px), #fafafa: "THIS WEEK'S LOCATIONS."
// Plus Jakarta 300, 14px, #8c8c8c, margin-bottom 32px: "We move. Check Instagram for same-day updates."

// 3 location chips (flex-col, gap 16px):
// Each: bg #1a1a1a, border 1px solid #2a2a2a, border-radius 4px, padding 16px 20px
// flex align-center gap 16px

// Left icon: MapPin lucide, 18px, #f0a82a
// Center: flex flex-col
//   Bebas Neue, 18px, #fafafa — location name
//   Plus Jakarta 300, 13px, #8c8c8c — days and times
// Right: saffron chip (flex align-center, bg rgba(240,168,42,0.12), border 1px solid rgba(240,168,42,0.3), border-radius 2px, px-3 py-1)
//   Plus Jakarta 300, 12px, #f0a82a — status

// Location 1: "Shoreditch Market" / "Tue–Fri · 12pm–9pm" / "OPEN NOW"
// Location 2: "Brixton Market" / "Sat · 11am–8pm" / "SAT ONLY"
// Location 3: "Peckham Rye" / "Sun · 12pm–7pm" / "SUN ONLY"

// Instagram follow prompt below:
// flex align-center gap 8px, margin-top 24px
// Instagram icon (lucide), 18px, #f0a82a
// Plus Jakarta 300, 14px, #8c8c8c: "Follow "
// Plus Jakarta 400, 14px, #f0a82a: "@streetburgers"
// Plus Jakarta 300, 14px, #8c8c8c: " for daily location updates."

// Framer Motion: card whileInView scale 0.97→1, opacity 0→1, 0.5s ease-out
```

### 6. Estadísticas de conteo Strip
```tsx
// Full-width section, bg: #f0a82a, padding: 48px clamp(24px,6vw,96px)
// flex flex-wrap justify-around align-center gap-x-16 gap-y-8

// 4 stats, each: flex-col align-center text-align center
// Value: Bebas Neue, 72px, #0f0f0f, line-height 1
// Label: Plus Jakarta Sans 300, 14px, #3a2a00, letter-spacing 0.06em, text-transform uppercase, margin-top 4px

// Stat 1: count-up "50K+" / "Burgers Served"
// Stat 2: "Since 2019" (no count-up — static text in Bebas 56px)
// Stat 3: count-up "4.9★" / "Google Rating"
// Stat 4: count-up "5" / "Weekly Locations"

// Count-up: IntersectionObserver + requestAnimationFrame, 1600ms easeOutQuart
```

### 7. Detalle del menú completo
```tsx
// Section bg: #0f0f0f, padding: 80px clamp(24px,6vw,96px)
// Headline: Bebas Neue clamp(32px,4.5vw,68px) #fafafa "THE FULL MENU"

// 4 menu sections, each with:
// Bebas Neue, 20px, letter-spacing 0.1em, color: #f0a82a, margin-bottom 20px — section name
// list of items, each: flex justify-between, border-bottom 1px solid rgba(255,255,255,0.08), padding 12px 0

// SIGNATURE BURGERS
// "The Classic — Two thin smash patties. American cheese. Pickles. Mustard. Ketchup. Brioche. That's it." / "£11"
// "The Smash BBQ — Two smash patties, smoked streaky bacon, house BBQ, crispy fried onions, brioche." / "£13"
// "The Vegan — Beyond Beef smash patty. Vegan cheese. Pickled red onion. Shredded iceberg. Vegan mayo. Brioche." / "£11"
// "The Double Classic — Four patties. Four slices American cheese. The same brioche (barely)." / "£15"

// LOADED FRIES
// "Classic Cheese Fries" / "£5"
// "Bacon & Cheese Fries" / "£6.50"
// "Truffle Fries" / "£6"
// "Chilli Cheese Fries" / "£6.50"

// DRINKS
// "Fanta Float" / "£3"
// "Mexican Coke" / "£3.50"
// "Lemonade" / "£2.50"
// "Iced Tea" / "£2.50"

// WEEKLY SPECIAL (saffron bg section):
// bg: rgba(240,168,42,0.08), border: 1px solid rgba(240,168,42,0.2), border-radius: 4px, padding 20px
// Bebas Neue 16px #f0a82a "THIS WEEK'S SPECIAL"
// Plus Jakarta 400 18px #fafafa "The Korean Smash"
// Plus Jakarta 300 14px #8c8c8c "Gochujang mayo, kimchi, smash patty, sesame slaw. It'll be gone by Saturday."
// Bebas Neue 24px #f0a82a "£14"
```

### 8. Acerca de Strip
```tsx
// Section bg: #111, padding: 64px clamp(24px,6vw,96px)
// 2 columns, gap 48px

// Left: Bebas Neue clamp(28px,4vw,56px) #fafafa "FOUR YEARS. 50,000 BURGERS."
// Right: Plus Jakarta 400, 16px, #8c8c8c, line-height 1.7
// "Street Burgers started with one truck and one obsession: the perfect smash burger. Four years and 50,000 burgers later, it's still the same obsession. No restaurant deals. No franchises. Just us, the truck, and the queue."
// Plus Jakarta 300, 14px, #f0a82a, margin-top 16px: "Est. 2019 · London · @streetburgers"
```

### 9. Azafrán CTA
```tsx
// Section bg: #f0a82a, padding: 64px clamp(24px,6vw,96px), text-align center
// Bebas Neue, clamp(48px,7vw,110px), #0f0f0f: "HUNGRY?"
// Plus Jakarta 400, 17px, #3a2a00, margin-top 12px: "Find our schedule above or follow us on Instagram for daily updates and surprise locations."
// Button: bg #0f0f0f, color #fafafa, Plus Jakarta 400, 15px, px-8 py-4, border-radius 3px, margin-top 32px
// "Follow @streetburgers"
// Hover: bg #1a1a1a, 0.2s
```

### 10. Pie de página
```tsx
// bg: #0a0a0a, border-top: 1px solid #1f1f1f, padding: 40px clamp(24px,6vw,96px) 24px
// 3 columns: Brand / Menu / Find Us
// "STREET BURGERS" Bebas Neue 20px #f0a82a + Plus Jakarta 300 13px #555 "London Smash Burgers · Est. 2019"
// Menu: Plus Jakarta 300 14px #6a6a6a — Signature Burgers / Loaded Fries / Drinks / Weekly Special
// Find Us: Plus Jakarta 300 14px #6a6a6a — Shoreditch Market / Brixton Market / Peckham Rye / Instagram
// Copyright: "© 2025 Street Burgers. Follow us @streetburgers" Plus Jakarta 300 12px #333
```

## Animaciones

| Elemento | Animación | Duración | Retraso | Facilitación |
|---|---|---|---|---|
| Barra de navegación | y: -60→0 | 0,45s | 0s | salida fácil |
| Titular de héroe | opacidad 0→1, x-40→0 | 0,7s | 0,1 s | salida fácil |
| Sub héroe | opacidad 0→1, y 20→0 | 0,6 s | 0,3 s | salida fácil |
| CTA de héroe | opacidad 0→1, y 20→0 | 0,6 s | 0,5 s | salida fácil |
| Tarjeta de menú flotante | escala 0,9→1 | 0,5 s | 0,4 s | resorte [0.34,1.56,0.64,1] |
| Filas de categoría | whileHover y:-3px, borde azafrán+brillo | 0,2 s | 0s | salida fácil |
| Tarjetas de firma | whileHover img escala 1.04, borde ámbar | 0,25 s | 0s | salida fácil |
| Tarjeta de ubicación | escala whileInView 0,97 → 1, opacidad 0 → 1 | 0,5 s | desplazarse | salida fácil |
| Estadísticas de conteo | 0→objetivo, rAF | 1,6s | en la entrada de desplazamiento | facilidadOutQuart |
| Botón de acción | whileHover bg oscurecer | 0,2 s | 0s | facilidad de salida |

## Responsive

- **Móvil (<768px)**: columna única de héroe, texto de fondo oculto, tarjeta flotante de ancho completo debajo de las CTA, filas de categorías simplificadas, tarjetas de firma de 1 columna, chips de ubicación de ancho completo, estadísticas 2×2
- **Tableta**: tarjetas de firma 2+1, fila de estadísticas 2×2, chips de ubicación de ancho completo
- **Escritorio**: Diseño completo como se describe

## Copia completa

**Marca**: Street Burgers

**Navbar**: Calle / Menú / Ubicaciones / Acerca de / Instagram

**Hero**:
- Kicker: "SMASH BURGERS · LONDRES"
- Titular: "LA MEJOR HAMBURGUESA QUE COMERÁS TODA LA SEMANA".
- Sub: "Hamburguesas smash premium. Máximo sabor. Cero pretensiones. Cinco ubicaciones en todo Londres este semana."
- CTA 1: "Ver menú completo"
- CTA 2: "Encuéntranos esta semana"

**Tarjeta flotante**: "Las mejores opciones del día" / The Classic £11 / The Smash BBQ £13 / The Vegan £11 / "Ver menú completo →"

**Menú categorías**:
- Hamburguesas exclusivas: "Nuestra excelente línea de hamburguesas. Cada una hecha recién hecha a pedido". — desde £11
- Papas fritas cargadas: "Papas fritas con piel, cuatro formas. Una comida sola". — desde £5
- Bebidas: "Fanta floats, Coca-Cola mexicana, limonada fresca, té helado". — desde £2.50
- Especiales semanales: "Un especial diferente cada semana. Siempre vale la pena". — desde £12

**Menú completo**:
- El clásico £11: "Dos hamburguesas finas. Queso americano. Encurtidos. Mostaza. Ketchup. Brioche. Eso es todo".
- The Smash BBQ £13:"Dos hamburguesas, tocino ahumado, BBQ de la casa, cebollas fritas crujientes, brioche". 
- The Vegan £11: "Beyond Beef smash patty. Queso vegano. Cebolla morada encurtida. Iceberg rallado. Mayonesa vegana. Brioche."
- The Double Classic £15: "Cuatro hamburguesas. Cuatro rebanadas de queso americano. El mismo brioche (apenas)."
- Patatas fritas cargadas: Queso clásico £5 / Tocino y queso £6,50 / Trufa £6 / Queso con chile £6,50
- Bebidas: Fanta Float £3 / Coca-Cola mexicana £3,50 / Limonada £2,50 / Té helado £2,50
- Especial de esta semana: "The Smash coreano: mayonesa de gochujang, kimchi, hamburguesa y ensalada de repollo con sésamo. Se acabará el sábado". £14

**Ubicaciones**:
- Shoreditch Market · martes a viernes · 12:00 a 21:00 · ABIERTO AHORA
- Brixton Market · sábado · 11:00 a 20:00 · SÓLO SÁBADO
- Peckham Rye · domingo · 12:00 a 19:00 · DOM SOLAMENTE
- "Siga a @streetburgers para obtener actualizaciones diarias de ubicaciones". 

**Estadísticas**: Más de 50.000 hamburguesas servidas / Desde 2019 / 4.9★ Google / 5 ubicaciones semanales

**Acerca de**: "Street Burgers comenzó con un camión y una obsesión: la hamburguesa perfecta. Cuatro años y 50.000 hamburguesas después, sigue siendo la misma obsesión. Sin ofertas de restaurantes, sin franquicias, solo nosotros, el camión y la cola. / "Est. 2019 · Londres · @streetburgers"

**CTA**: "¿HAMBRE?" / "Encuentre nuestro horario arriba o síganos en Instagram para obtener actualizaciones diarias y ubicaciones sorpresa". / "Seguir a @streetburgers"

## Dependencias clave
```json
{
  "dependencies": {
    "react": "^18",
    "framer-motion": "^11",
    "lucide-react": "latest",
    "@shadcn/ui": "latest",
    "tailwindcss": "^3"
  }
}
```