# Wild Bloom Co. — Aviso del sitio web de floristería

## 1. Declaración de objetivos
Crear un sitio web romántico y exuberante adyacente al comercio electrónico para Wild Bloom Co., una marca de estudio floral de lujo con una estética editorial botánica: blancos ruborizados, verdes intensos y tonos rosas polvorientos que se sienten como un jardín de lujo mezclado con una revista.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: 14 75% 97%;          /* blush white #fdf0ec */
  --foreground: 145 30% 15%;         /* deep forest #1f3a28 */
  --primary: 145 32% 26%;            /* forest green #2d5a3d */
  --primary-foreground: 0 0% 100%;
  --secondary: 14 47% 65%;           /* dusty rose #d4907a */
  --secondary-foreground: 0 0% 100%;
  --muted-foreground: 20 15% 48%;    /* warm mid-tone */
  --border: 14 35% 88%;              /* blush border */
  --card: 15 60% 99%;                /* near-white blush card */
  --accent: 145 32% 26%;             /* forest green */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **Mostrar encabezados (H1, H2):** Cormorant Garamond, 400–600, variante en cursiva para el texto principal
- **Cuerpo/navegación/botones/etiquetas/precios:** Jost, 300–500
- **Precio/énfasis numérico:** Cormorant Garamond 500, 1,5–2rem
- **Cejas/etiquetas mayúsculas:** Jost 500, 0,7rem, espacio entre letras 0,2em, mayúsculas
- **Copia del cuerpo:** Jost 300–400, 1rem, altura de línea 1,85, color: var(--muted-foreground)
- **Nombres de productos:** Cormorant Garamond 500, 1.2rem

## 5. Efectos visuales

### Efecto 1: ramo de primer plano del héroe con partículas de pétalos Animación
```tsx
// FloatingPetals.tsx
import { motion } from 'motion/react'

// SVG petal shape (simple organic oval/teardrop)
const PetalSVG = () => (
  <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2 C16 6 18 12 14 20 C12 24 8 26 6 24 C2 20 2 14 4 8 C6 4 8 0 10 2Z" fill="rgba(212,144,122,0.5)" />
  </svg>
)

interface Petal {
  id: number
  left: string
  delay: number
  duration: number
  size: number
  opacity: number
}

const petals: Petal[] = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 90 + 5}%`,
  delay: Math.random() * 4,
  duration: 6 + Math.random() * 4,
  size: 0.6 + Math.random() * 0.8,
  opacity: 0.3 + Math.random() * 0.5,
}))

export function FloatingPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: petal.left, top: '-40px', opacity: petal.opacity, scale: petal.size }}
          animate={{
            y: ['0px', '110vh'],
            rotate: [0, 180 + Math.random() * 180],
            x: [0, (Math.random() - 0.5) * 80],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <PetalSVG />
        </motion.div>
      ))}
    </div>
  )
}

// Hero section:
<section className="relative w-full min-h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
  {/* Image: extremely lush and full close-up bouquet — peony, ranunculus, eucalyptus sprigs, garden roses, soft blush and cream petals, morning light filtering through petals creating translucent glow, arranged on pale blush surface, romantic botanical editorial style */}
  <img src="" alt="Wild Bloom Co. signature bouquet" className="w-full h-full object-cover object-center absolute inset-0" />
  {/* Overlay */}
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(31,58,40,0.85) 0%, rgba(31,58,40,0.5) 45%, transparent 100%)' }} />
  {/* Petal particles */}
  <FloatingPetals />
  {/* Content */}
  <div className="relative z-20 px-8 md:px-16 flex flex-col justify-center min-h-screen max-w-2xl">
    ...hero text...
  </div>
</section>
```

### Efecto 2: Cuadro flotante de tarjeta de producto-Floración de sombra
```tsx
import { motion } from 'motion/react'

<motion.div
  className="group bg-card rounded-sm overflow-hidden cursor-pointer"
  whileHover={{
    boxShadow: '0 8px 40px rgba(212,144,122,0.35)',
    y: -4,
  }}
  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
>
  <div className="overflow-hidden aspect-[3/4]">
    <motion.img
      className="w-full h-full object-cover object-center"
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
  <div className="p-5">
    {/* product info */}
  </div>
</motion.div>
```

### Efecto 3: Entrada de tarjeta de colección escalonada en Scroll
```tsx
import { motion } from 'motion/react'

{collections.map((collection, index) => (
  <motion.div
    key={collection.id}
    initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{
      duration: 0.7,
      delay: index * 0.12,
      ease: [0.22, 1, 0.36, 1]
    }}
  >
```

### Efecto 4: Foto de boda a sangre completa con superposición de bosque
```tsx
<section className="relative w-full min-h-[60vh] flex items-center overflow-hidden">
  {/* Image: breathtaking floral arch installation at a wedding ceremony — lush white and blush florals, greenery cascading down, golden hour light, romantic venue, couple in soft focus background */}
  <img src="" alt="Wild Bloom Co. wedding floral arch" className="w-full h-full object-cover object-center absolute inset-0" />
  <div
    className="absolute inset-0"
    style={{ background: 'linear-gradient(to right, rgba(45,90,61,0.88) 0%, rgba(45,90,61,0.6) 50%, transparent 100%)' }}
  />
  <div className="relative z-10 px-8 md:px-16 max-w-xl">
    {/* Wedding inquiry content */}
  </div>
</section>
```

### Efecto 5: Textura sutil fija Superposición
```tsx
export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay',
        opacity: 0.03,
      }}
    />
  )
}
```

## 6. Desglose de componentes

### 6.1 Barra de navegación
```tsx
// Fixed, top-0, z-40, w-full
// Height: h-18 (72px)
// Background: transparent → var(--background)/95 backdrop-blur-sm after 60px scroll
// Layout: px-8 md:px-16, flex items-center justify-between
// Left: leaf icon + "WILD BLOOM CO." — Jost 500, letter-spacing 0.2em, uppercase, 0.875rem, text-primary
// Center (desktop): nav links ["Shop", "Collections", "Weddings", "About", "Contact"]
//   Jost 400, 0.85rem, gap-8, text-foreground/60, hover text-primary, transition 0.2s
// Right: "Shop Now" button — bg-primary, text-white, px-5 py-2.5, Jost 500, 0.8rem, rounded-none (sharp, editorial)
// Mobile: hide links, show hamburger icon (Leaf + wordmark stays)
```

### 6.2 Hero Sección
```tsx
// min-h-screen, relative, overflow-hidden
// Full-bleed lush bouquet photo
// Forest green gradient overlay on left
// Floating petal animation (above image, below content)
// Content: left side, z-20, flex flex-col justify-center, max-w-xl
//   - Eyebrow: "LUXURY FLORAL STUDIO" — Jost 500, 0.7rem, letter-spacing 0.3em, uppercase, text-white/60, mb-5
//   - H1: Cormorant Garamond Italic, clamp(3rem, 6vw, 5.5rem), text-white, line-height 1.02, mb-6
//   - Subtext: Jost 300, 1.1rem, text-white/75, line-height 1.8, mb-8, max-w-md
//   - CTA buttons: flex gap-4
//     Primary: "Shop the Collection" — bg-secondary (dusty rose), text-white, px-8 py-4, Jost 500, 0.875rem
//     Secondary: "Book Wedding Florals" — border border-white/60, text-white, px-8 py-4, Jost 400
```

### 6.3 Colecciones Sección
```tsx
// py-24 px-8 md:px-16
// Centered header:
//   - Eyebrow: "EXPLORE" — Jost 500, 0.7rem, letter-spacing 0.3em, text-secondary
//   - H2: Cormorant Garamond, 3rem, text-foreground, mb-4
//   - Subtext: Jost 300, 1rem, text-muted-foreground, mb-16
// Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4, gap-6
// Each collection card (stagger entrance):
//   - Image: full-width, aspect-[4/5], object-cover, overflow-hidden
//   - Image overlay on hover: forest green tint 0→0.4, transition 0.4s
//   - Below image: collection name, Cormorant Garamond 500, 1.3rem + desc line + "Shop Now →" link
// Collection image descriptions:
// {/* Image: stunning bridal bouquet — white garden roses, lily of the valley, trailing greenery, white ribbon, bridal hands holding */}
// {/* Image: everyday mixed bouquet — colorful seasonal flowers, cheerful arrangement, kraft paper wrap, bright studio light */}
// {/* Image: seasonal autumn arrangement — dahlias, dried grasses, deep rust and burgundy tones, moody editorial lighting */}
// {/* Image: custom luxury flower arrangement in ceramic vase — bespoke, architectural, award-winning florist style */}
```

### 6.4 Más vendidos / Producto Grid
```tsx
// py-24 px-8 md:px-16, bg-card (very light blush-white)
// Header: flex justify-between items-end, mb-12
//   H2: Cormorant Garamond, 2.5rem + "View All →" dusty rose link
// Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-6, gap-6
// Wait — 6 products but 6 columns on lg is too tight. Use: grid-cols-2 md:grid-cols-3 lg:grid-cols-3, gap-8 (6 products = 2 rows)
// Each product card (see Effect 2 — box shadow bloom):
//   - Image: aspect-[3/4], object-cover, object-center
//   - Product name: Cormorant Garamond 500, 1.1rem, mt-4, mb-1
//   - Desc: Jost 300, 0.85rem, text-muted-foreground, mb-3
//   - Price: Cormorant Garamond 400, 1.3rem, text-foreground
//   - "Add to Cart" button: border border-primary text-primary hover:bg-primary hover:text-white, px-4 py-2, Jost 500, 0.75rem, mt-3, transition 0.2s

// Product image descriptions:
// {/* Image: classic round peony bouquet — blush pink, cream, soft green filler, white paper wrap, overhead flat-lay perspective */}
// {/* Image: garden-gathered wildflower bunch — sweet peas, cosmos, clematis vine, loose and romantic, tied with twine */}
// {/* Image: elegant lily and eucalyptus arrangement in forest green vase, minimal and architectural, white studio bg */}
// {/* Image: subscription mystery box of seasonal blooms — wrapped in tissue, ribbon, with handwritten note card */}
// {/* Image: single long-stem garden rose — deep blush/dusty pink, dew drops on petals, black background, editorial close-up */}
// {/* Image: dried flower crown — pampas grass, everlasting, strawflower, lavender, laid flat on linen */}
```

### 6.5 Cómo funciona
```tsx
// py-24 px-8 md:px-16
// Centered heading: "How It Works" — Cormorant Garamond, 2.5rem, mb-16
// 3 steps: grid-cols-1 md:grid-cols-3, gap-12, items-start
// Each step:
//   - Step number: "01" "02" "03" — Cormorant Garamond Italic, 4rem, text-secondary/30, mb-2
//   - Icon: lucide, 28px, text-primary, mb-4
//   - Title: Cormorant Garamond 600, 1.4rem, text-foreground, mb-3
//   - Desc: Jost 300, 0.95rem, text-muted-foreground, line-height 1.8
// Dividers between steps (desktop): vertical hairlines, border-secondary/20
```

### 6.6 Acerca de la sección
```tsx
// py-24 px-8 md:px-16
// Layout: grid grid-cols-1 lg:grid-cols-2, gap-20, items-center
// Left (text):
//   - Eyebrow: "OUR STORY"
//   - H2: Cormorant Garamond Italic, 3rem, mb-6
//   - Body: 2 paragraphs, Jost 300, 1rem, line-height 1.85, text-muted-foreground
//   - Pull quote: Cormorant Garamond Italic, 1.3rem, border-l-4 border-secondary, pl-5, my-8
//   - Stats: 3 stats — Jost 500, large number + label
// Right (photo):
//   {/* Image: florist founder at workbench arranging flowers — close-up of hands working with stems and blooms, morning light streaming through window, warm and artisanal atmosphere, soft editorial style */}
//   <img src="" alt="Wild Bloom Co. founder arranging flowers" className="w-full h-[580px] object-cover object-center rounded-sm" />
```

### 6.7 Sección Bodas
```tsx
// Full-bleed wedding photo section (see Effect 4)
// min-h-[65vh], relative, overflow-hidden
// Forest green gradient left overlay
// Left content (max-w-lg):
//   - Eyebrow: "WEDDING FLORALS" — Jost 500, 0.7rem, letter-spacing 0.3em, text-white/60, mb-4
//   - H2: Cormorant Garamond Italic, clamp(2.5rem, 5vw, 4rem), text-white, mb-5
//   - Body: Jost 300, 1rem, text-white/75, mb-8
//   - CTA: "Start Your Wedding Inquiry" — bg-secondary text-white, px-8 py-4, Jost 500, 0.875rem
//   - Secondary: "See Wedding Portfolio →" link, text-white/70
```

### 6.8 Testimonios
```tsx
// py-24 px-8 md:px-16, bg-card
// Centered heading: Cormorant Garamond Italic, 2.5rem, mb-16
// Grid: grid-cols-1 md:grid-cols-3, gap-8
// Each card: bg-white, p-8, rounded-sm
//   - Quotation mark: Cormorant Garamond, 5rem, text-secondary/25, leading-none, mb-2
//   - Quote: Cormorant Garamond Italic, 1.05rem, line-height 1.85, text-foreground/80, mb-6
//   - Stars: 5 × ★, text-secondary, mb-4, font-size 0.9rem
//   - Author: Jost 500, 0.9rem + event/occasion: Jost 300, 0.8rem, text-muted-foreground
```

### 6.9 Entrega local Sección
```tsx
// py-24 px-8 md:px-16
// Layout: grid grid-cols-1 lg:grid-cols-2, gap-16, items-center
// Left (card):
//   - bg-primary (forest green), text-white, p-10, rounded-sm
//   - Icon: MapPin, 32px, white/70, mb-4
//   - H3: Cormorant Garamond, 2rem, text-white, mb-4
//   - Coverage list: Jost 300, 0.9rem, text-white/75, line-height 2.2 — list of neighbourhoods
//   - CTA: bg-white text-primary, mt-6, px-6 py-3, Jost 500
// Right (info):
//   - H3: "Order Deadlines" — Cormorant Garamond, 2rem, mb-6
//   - Info rows: icon + info line, Jost 300, 0.95rem, text-foreground, line-height 2.5
//   - Note: Jost 300, 0.85rem, text-muted-foreground, italic, mt-4
```

### 6.10 Pie de página
```tsx
// py-16 px-8 md:px-16, bg-foreground (#1f3a28 — deep forest), text-white
// Top: grid grid-cols-2 md:grid-cols-4, gap-10, pb-12, border-b border-white/10
//   Col 1: Logo leaf + wordmark + "Flowers Rooted in Intention" tagline + social icons
//   Col 2: Shop — All Flowers, Bouquets, Arrangements, Subscriptions, Gifts, Dried Flowers
//   Col 3: Services — Weddings, Events, Same-Day Delivery, Custom Orders, Corporate
//   Col 4: Info — About, Delivery Coverage, Order Deadlines, Care Guide, Contact
// Bottom: pt-8, flex justify-between
//   Copyright: Jost 300, 0.75rem, text-white/30
//   Links: Privacy · Terms · Instagram
```

## 7. Animaciones

### Pétalo partículas
```tsx
// y: '0px' → '110vh', rotate 0 → 180-360°, x: slight sway
// duration: 6–10s per petal (random)
// delay: 0–4s (random stagger)
// repeat: Infinity, ease: 'linear'
// 14 petals total
```

### Texto héroeentrada
```tsx
// Eyebrow: delay 0.2s, opacity 0→1, y 10→0
// H1: delay 0.4s, opacity 0→1, y 40→0, filter blur(10px)→blur(0)
// Subtext: delay 0.65s, opacity 0→1
// CTAs: delay 0.85s, opacity 0→1, y 15→0
// All: duration 0.8s, ease [0.22, 1, 0.36, 1]
```

### Desplazamiento de tarjetas de colección entrada
```tsx
// stagger index * 0.12s
// initial: opacity 0, y 50, filter blur(8px)
// whileInView: opacity 1, y 0, filter blur(0)
// viewport: once true, margin -60px
```

### Tarjeta de producto flotante
```tsx
// boxShadow: 0 8px 40px rgba(212,144,122,0.35)
// y: 0 → -4
// Image inside: scale 1 → 1.06
// transition: 0.35s ease [0.22, 1, 0.36, 1]
```

### Paso cómo funciona números
```tsx
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: index * 0.2 }}
```

### Tarjetas de testimonios
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: index * 0.15 }}
```

### Desplazamiento de la barra de navegación
```tsx
// 60px threshold: bg-transparent → bg-[#fdf0ec]/95 backdrop-blur-sm
// transition: all 300ms ease
```

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: hoja + marca denominativa (pequeña), hamburguesa; superposición verde bosque en pantalla completa
- Hero: H1 clamp(2.8rem, 8vw, 3.5rem), una sola columna; los pétalos aún flotan (reduzca el recuento a 8) 
- CTA: apilados, ancho completo en dispositivos móviles
- Colecciones: 1 columna (2 en sm), apiladas
- Bestsellers: 2 columnas en dispositivos móviles, 3 en md
- Cómo funciona: una sola columna, números de paso alineado a la izquierda
- Acerca de: foto superior (ancho completo), texto debajo
- Bodas: texto centrado sobre superposición oscura, CTA de ancho completo
- Testimonios: 1 columna, apiladas
- Entrega local: apiladas, tarjeta primero
- Pie de página: 2 columnas arriba, una sola parte inferior

### Escritorio (>= 1024px)
- Barra de navegación: navegación horizontal completa + CTA
- Héroe: 2 zonas implícitas (texto a la izquierda, foto a la derecha; sangrado completo único con superposición)
- Colecciones: 4 columnas
- Más vendidos: 3 columnas × 2 filas
- Cómo funciona: 3 columnas horizontales
- Acerca de: 2 columnas iguales
- Bodas: sangrado completo con contenido de texto a la izquierda
- Testimonios: 3 columnas
- Entrega local: 2 columnas
- Pie de página: 4 columnas

## 9. Copia completa

### Nombre de marca
Wild Bloom Co.

### Navbar
- Texto del logotipo: WILD BLOOM CO.
- Enlaces: Tienda · Colecciones · Bodas · Acerca de · Contacto
- CTA: Comprar ahora

### Hero
- Ceja: LUXURY FLORAL STUDIO
- H1: Flores arraigadas en la intención.
- Subtexto: Arreglos para momentos importantes. Cada tallo se elige con cuidado. Cada ramo está hecho para conmoverte.
- CTA principal: Compra la colección
- CTA secundario: Libro de flores para bodas

### Sección de colecciones
- Ceja: EXPLORE
- H2: Arreglos para cadaMoment
- Subtexto: desde gestos íntimos cotidianos hasta impresionantes instalaciones para bodas: encuentre el arreglo perfecto.
- **Colección 1 — Boda**
 - Desc: Ramos de novia, arcos de ceremonia y flores de recepción personalizados diseñados para el día más importante de su vida.
 - CTA: Explore Wedding →
- **Colección 2 — Todos los días**
 - Desc: Flores de temporada cuidadosamente dispuestas para iluminar cualquier espacio o convertirse en el regalo perfecto para el mismo día.
 - CTA: Comprar todos los días →
- **Colección 3 — De temporada**
 - Desc: Edición limitada arreglos creados en torno a lo que es fresco, local y en temporada alta: nunca genérico, siempre vivo.
 - CTA: Tienda de temporada →
- **Colección 4 — Personalizado**
 - Desc: Tu visión, nuestras manos. Cuéntenos la ocasión, la paleta, la sensación: crearemos algo completamente suyo.
 - CTA: Consulta personalizada →

### Sección de los más vendidos
- H2: Nuestros más vendidos
- Enlace: Ver todos →
- **Producto 1 — Blush Garden Peony Bouquet**
 - Desc: Exuberantes peonías ruborizadas con suave vegetación, envueltas en pañuelo
 - Precio: £65
- **Producto 2 — Manojo de flores silvestres recolectadas en estado silvestre**
 - Desc: Flores silvestres de temporada, sueltas y románticas, atadas con cordel natural
 - Precio: £38
- **Producto 3 — Arreglo de lirios y eucalipto**
 - Desc: Mínimo pero llamativo — en su elección de jarrón verde bosque o blanco
 - Precio: £75
- **Producto 4 — The Bloom Box**
 - Desc: Suscripción mensual o estacional — curado, de temporada, entregado en su puerta
 - Precio: Desde £ 52 / entrega
- **Producto 5: Rosa de jardín de un solo tallo**
 - Descripción: Un tallo perfecto. Ideal para una nota, un momento, una disculpa o un martes.
 - Precio: £12
- **Producto 6 — Corona de flores secas**
 - Desc: Pampa, flor de paja, lavanda — una pieza tradicional para bodas, sesiones fotográficas o decoración del hogar
 - Precio: £45

### Cómo funciona
- Título: Cómo funciona
- **Paso 1 — Orden**
 - Icono:ShoppingBag
 - Título: Elija su arreglo
 - Desc: Explore nuestras colecciones, seleccione su ocasión y elija su fecha de entrega preferida. Realizar el pedido toma menos de dos minutos.
- **Paso 2: Nosotros organizamos**
 - Icono: Tijeras
 - Título: Elaboramos a mano su ramo
 - Desc: Cada arreglo es elaborado por nuestro equipo de estudio la mañana de su entrega. No hay lotes prefabricados. Ever.
- **Paso 3: Entregamos**
 - Icono: Camión
 - Título: Entregado en su puerta
 - Desc: Entrega el mismo día en nuestra área de cobertura para pedidos realizados antes de las 11 a.m. Espacios para el día siguiente disponibles los siete días de la semana.

### Acerca de la sección
- Ceja: NUESTRA HISTORIA
- H2: Nacido del amor por las flores y los momentos a los que pertenecen.
- Para 1: Wild Bloom Co. comenzó en un pequeño estudio en el borde del distrito de mercados, con una camioneta prestada, una flor al por mayor cuenta y una obsesión por hacer arreglos que realmente se sintieran como algo.
- Párrafo 2: No hacemos genéricos. Cada ramo que hacemos se construye en torno a un sentimiento: los tallos adecuados, la paleta adecuada, las proporciones adecuadas. Nos abastecemos localmente donde podemos, siempre según la temporada.
- Cita: "Cada tallo se elige con cuidado. Cada ramo está hecho para conmoverte".
- Estadísticas: 6 años · Más de 4200 ramos fabricados · 98% de tasa de entrega el mismo día

### Sección de bodas
- Ceja: BODAS FLORALS
- H2: Su día más hermoso, en flores.
- Cuerpo: desde ramos de novia y arcos de ceremonia hasta centros de mesa de recepción y paredes de flores: diseñamos flores de boda que se sienten personales, exuberantes y completamente suyas. Organizamos un número limitado de bodas por temporada para garantizar que cada novia reciba toda nuestra atención. 
- CTA principal: comience su consulta de boda
- Secundario: consulte el portafolio de bodas →

### Sección de testimonios
- Encabezado: Hecho con cuidado. Recibido con Joy.
- **Cita 1**
 - Texto: "He hecho pedidos a Wild Bloom para cada cumpleaños, aniversario y disculpa en mi relación durante los últimos tres años. Nunca lo han hechodecepcionado. Las peonías especialmente son extraordinarias."
 - Autor: Charlotte R. · Cliente habitual
- **Cita 2**
 - Texto: "Las flores de nuestra boda estaban más allá de lo que podría haber imaginado. El arco de ceremonia por sí solo dejó a nuestros invitados sin aliento. Wild Bloom entendió nuestra estética de inmediato y le dio vida a la perfección."
 - Autor: Sophie & James · Boda, junio de 2024
- **Cita 3**
 - Texto: "Pedí un ramo de condolencias de último minuto y llegó en cuestión de horas, hermosamente arreglado y con una nota escrita a mano incluida. El cuidado en este negocio es real. Puedes sentirlo."
 - Autor: Amelia W. · Londres

### Sección de entrega local
- Encabezado de tarjeta: Entregamos a su puerta
- Lista de cobertura: Marylebone · Notting Hill · Chelsea · Mayfair · Kensington · Fulham · Clapham · Battersea · Brixton · Peckham · Borough · Bermondsey · Shoreditch · Islington · Hackney
- Tarjeta CTA: verifique su código postal
- Encabezado de información: Plazos de pedido
- Filas de información:
 - Entrega el mismo día: Ordene antes de las 11:00 a.m., de lunes a sábado
 - Entrega al día siguiente: Haga su pedido antes de las 4:00 p.m. cualquier día de la semana
 - Pedidos de boda: mínimo 6 semanas de anticipación para servicio completo
 - Arreglos personalizados: se solicita aviso con 5 días de anticipación
- Nota: "¿No está en nuestra área de cobertura? Podemos organizar la entrega por mensajería por una tarifa adicional; contáctenos para discutirlo."

### Pie de página
- Lema: Flores arraigadas en la intención
- Tienda: Todas las flores · Ramos · Arreglos · Suscripciones · Regalos · Flores secas
- Servicios: Bodas · Eventos · Entrega el mismo día · Pedidos personalizados · Corporativo
- Información: Acerca de · Cobertura de entrega · Plazos de pedido · Guía de atención · Contacto
- Visita: Estudio — 7 Market Lane, Londres SE1 (solo con cita previa) · Lunes a sábado de 8 a.m. a 6 p.m. · hello@wildbloomco.com
- Copyright: © 2025 Wild Bloom Co. Todos los derechos reservado.

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.462.0",
  "@radix-ui/react-dialog": "^1.1.0",
  "@radix-ui/react-select": "^2.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.3.0"
}
```
