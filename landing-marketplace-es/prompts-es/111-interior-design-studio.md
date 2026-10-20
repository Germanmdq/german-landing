# Studio Noma — Mensaje del sitio web de Interior Design Studio

## 1. Declaración de objetivos
Cree un sitio web editorial de estudio de diseño de interiores con un portafolio avanzado para **Studio Noma**, definido por una cálida paleta de lino y carbón con detalles en terracota, espacios en blanco generosos y una cuadrícula de mampostería que hace que cada proyecto se sienta como una galería. piece.

---

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño - Colores

```css
:root {
  --background: hsl(36, 30%, 95%);          /* #f4efe8 warm linen */
  --foreground: hsl(30, 8%, 16%);            /* #2a2825 deep charcoal */
  --primary: hsl(16, 51%, 49%);              /* #c4673c terracotta */
  --primary-foreground: hsl(36, 30%, 95%);   /* linen — text on terracotta */
  --muted-foreground: hsl(30, 8%, 50%);      /* medium grey-brown */
  --border: hsl(30, 12%, 85%);               /* soft warm grey border */
  --card: hsl(36, 25%, 98%);                 /* near-white card bg */
  --accent: hsl(16, 51%, 49%);               /* terracotta accent */
  --overlay: rgba(42, 40, 37, 0.85);         /* charcoal overlay for hover */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
```

- **H1 / hero display:** `font-family: 'Playfair Display', serif;` peso 700–900, variante en cursiva para énfasis, espacio entre letras: -0.02em
- **H2 / títulos de sección:** `font-family: 'Playfair Display', serif;` peso 700, espacio entre letras: -0.01em
- **H3 / títulos de tarjetas:** `font-family: 'Playfair Display', serif;` cursiva 700, tamaño 20–24px
- **Cuerpo/párrafos:** `font-family: 'DM Sans', sans-serif;` peso 300, altura de línea: 1,8, espacio entre letras: 0,01em
- **Etiquetas de interfaz de usuario/nav/sección cejas:** DM Sans 400–500, mayúsculas, espacio entre letras: 0,15em, tamaño: 11–12px
- **Acentos de terracota:** color terracota en fechas, años, números de acento

---

## 5. Efectos visuales

### Efecto 1: Cuadrícula de cartera de mampostería con desplazamiento Reveal
```tsx
// CSS columns masonry approach
<div
  className="w-full"
  style={{
    columnCount: 3,
    columnGap: '12px',
  }}
>
  {portfolioItems.map((item, i) => (
    <motion.div
      key={item.id}
      className="relative overflow-hidden break-inside-avoid mb-3 group cursor-pointer"
      initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src="" alt={item.name} className="w-full block transition-transform duration-700 group-hover:scale-105" style={{ display: 'block' }} />
      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'var(--overlay)' }}>
        <p className="text-[var(--primary)] text-xs uppercase tracking-widest font-sans mb-1">{item.year}</p>
        <h3 className="text-white font-serif italic text-xl leading-tight">{item.name}</h3>
        <p className="text-white/70 text-sm font-sans font-light mt-1">{item.type}</p>
      </div>
    </motion.div>
  ))}
</div>
```

### Efecto 2: héroe editorial con desvanecimiento de espaciado entre letras amplio
```tsx
// Hero headline fades in word by word
const words = ['Space', 'Shaped', 'with', 'Intention'];

function HeroHeadline() {
  return (
    <h1 className="text-[clamp(52px,10vw,140px)] font-serif font-black leading-none tracking-tight" style={{ letterSpacing: '-0.02em' }}>
      {words.map((word, i) => (
        <motion.span
          key={word}
          className="inline-block mr-[0.2em]"
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {i === 2 ? <em className="not-italic" style={{ color: 'var(--primary)' }}>{word}</em> : word}
        </motion.span>
      ))}
    </h1>
  );
}
```

### Efecto 3: proceso de desplazamiento horizontal Sección
```tsx
<section className="py-24">
  <div className="px-6 md:px-16 mb-12">
    <h2>Our Process</h2>
  </div>
  <div
    className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 px-6 md:px-16 scrollbar-hide"
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
  >
    {processSteps.map((step, i) => (
      <div
        key={step.num}
        className="flex-shrink-0 w-[80vw] md:w-[420px] snap-start"
      >
        <div className="border-t-2 border-[var(--primary)] pt-6">
          <span className="text-[80px] font-serif font-black text-[var(--foreground)] opacity-[0.06] leading-none block">{step.num}</span>
          <h3 className="font-serif italic text-2xl mt-2 text-[var(--foreground)]">{step.title}</h3>
          <p className="font-sans font-light text-[var(--muted-foreground)] mt-4 leading-relaxed">{step.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>
```

### Efecto 4: línea de acento de terracota en Acerca de la sección
```tsx
// Animated terracotta vertical line on About
<motion.div
  initial={{ scaleY: 0 }}
  animate={inView ? { scaleY: 1 } : {}}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  style={{
    originY: 0,
    width: '3px',
    backgroundColor: 'var(--primary)',
    height: '80px',
    marginBottom: '32px',
  }}
/>
```

### Efecto 5: presione la fila del logotipo con sutil Hover
```tsx
// Grayscale logos, terracotta on hover
<div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
  {pressLogos.map(logo => (
    <img
      key={logo}
      src=""
      alt={logo}
      className="h-6 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-400 cursor-default"
      style={{ filter: 'grayscale(1)', transition: 'filter 0.4s ease, opacity 0.4s ease' }}
      onMouseEnter={e => { (e.target as HTMLImageElement).style.filter = 'none'; }}
      onMouseLeave={e => { (e.target as HTMLImageElement).style.filter = 'grayscale(1)'; }}
    />
  ))}
</div>
```

---

## 6. Desglose de componentes

### Sección 1: barra de navegación (solo marca denominativa, mínima)
- **Altura:** 72px
- **Posición:** `fijo arriba-0 izquierda-0 derecha-0 z-40`
- **Fondo:** `rgba(244,239,232,0.92)` con `backdrop-filter: blur(16px)` siempre (lino semitransparente)
- **Borde inferior:** 1px `--border`
- **Izquierda:** "STUDIO NOMA" en DM Sans 500, mayúsculas, espacio entre letras: 0,25 em, tamaño: 13px, carbón
- **Derecha:** Portafolio · Servicios · Proceso · Acerca de · Contacto — DM Sans 400, 12px mayúsculas,tracking-wider
- **Extremo derecho:** "Get in Touch" — pequeño enlace de texto de terracota con flecha `→`
- **Móvil:** marca denominativa solamente + hamburguesa, cajón deslizable del lado derecho

### Sección 2 — Hero
- **Fondo:** ropa de abrigo `--background`
- **Diseño:** dos subáreas apiladas:
 - Área de texto superior (ancho completo, relleno: 140px superior 48px inferior izquierdo 64px)
 - Imagen principal inferior (ancho completo, `h-[60vh] md:h-[75vh]`, sin relleno)
- **Contenido del área de texto:**
 - Etiqueta pequeña (DM Sans, terracota): `INTERIOR DESIGN STUDIO — AMSTERDAM`
 - H1: (ver Efecto 2) — `Espacio formado con intención`
 - Lema a continuación: `Diseñamos espacios que parecen inevitables.`
 - Dos CTA en línea: "Ver nuestro trabajo" (botón de terracota) + "Contactar con Studio" (enlace de texto con flecha)
- **Imagen principal:**
 ```jsx
  {/* Image: beautifully designed Scandinavian-influenced living room, warm linen upholstery sofa, terracotta ceramic vases, oak shelving with books and objects, warm natural light from tall windows, interior design editorial photography, Kinfolk magazine aesthetic */}
  <img src="" alt="Studio Noma signature living space with linen and terracotta tones" className="w-full h-full object-cover object-center" />
  ```

### Sección 3: Portafolio de mampostería Grid
- **Relleno:** `py-24 px-4 md:px-8`
- **Área de encabezado:** alineado a la izquierda, contador "Trabajo seleccionado" + "01 — 12" (silenciado, terracota), pestañas de filtro arriba (Todos / Residencial / Comercial / Puesta en escena)
- **Cuadrícula:** 3 columnas escritorio, tableta de 2 columnas, móvil de 1 columna
- **12 imágenes de portafolio** con revelación escalonada
- **Cuadrícula inferior:** "Ver todos los proyectos →" enlace de terracota centrado

### Sección 4 — Servicios
- **Fondo:** lino ligeramente más claro `--card`
- **Diseño:** 3 tarjetas seguidas (`grid grid-cols-1 md:grid-cols-3 gap-0` con divisores entre ellas)
- **Cada tarjeta:** línea delgada superior de terracota (2px), número grande (descolorido, serif), nombre del servicio (Playfair cursiva), breve descripción, "Más información →"

### Sección 5 — Proceso (desplazamiento horizontal)
- **Fondo:** lino cálido `--background`
- **Encabezado:** encabezado "Cómo trabajamos" acolchado a la izquierda
- **5 pasos de desplazamiento horizontal** (ver Efecto 3)
- **Sugerencia de arrastre:** la etiqueta pequeña "→ desplazarse para explorar" se desvanece después del primer desplazamiento

### Sección 6 — Acerca de
- **Diseño:** 2 columnas, 50/50, `gap-0`
- **Izquierda col:**
 - Línea vertical animada de terracota (Efecto4)
 - Ceja: "FUNDADOR — SARA ERIKSSON"
 - H2: "Diseño que comienza\nCon escuchar"
 - 3 párrafos
 - "Lea nuestra historia →" enlace terracota
- **Derecha col:**
 ```jsx
  {/* Image: female interior designer in her studio, surrounded by material samples and design boards, natural light from skylight, warm minimalist workspace with plants and objects, candid editorial portrait */}
  <img src="" alt="Studio founder Sara Eriksson in her Amsterdam design studio" className="w-full h-full object-cover object-center" />
  ```

### Sección 7 — Testimonios
- **Diseño de 2 columnas** en escritorio, 1 columna móvil
- **Comillas grandes** en terracota (Playfair Display, 120 px) como elemento decorativo elemento
- **Texto de cita:** Playfair cursiva, 24px, carbón
- **Atribución:** DM Sans 400, pequeño, silenciado

### Sección 8 — Prensa / Como se ve en
- **Fondo:** carbón `--foreground`
- **Etiqueta:** "COMO SE VE EN" en DM Sans mayúscula, crema/apagado
- **Fila del logotipo:** logotipos de publicaciones en escala de grises con efecto de desplazamiento

### Sección 9 — Contacto
- **Fondo:** cálido Linen
- **Diseño:** centrado, ancho máximo 640px
- **Encabezado:** "Creemos\nalgo juntos"
- **Forma mínima:** Nombre, correo electrónico, tipo de proyecto (desplegable), mensaje
- **CTA:** "Enviar mensaje" — ancho completo botón de terracota
- **Abajo:** "O envíenos un correo electrónico directamente: hello@studionoma.com"

### Sección 10 — Pie de página
- **Fondo:** carbón profundo `--foreground`
- **Texto:** crema primer plano
- **Diseño:** 3 columnas (escritorio), apiladas (móvil)
- **Línea de borde superior de terracota 2px**
- Col 1: STUDIO NOMA + lema
- Col 2: Enlaces de navegación
- Col 3: Dirección + Social (Instagram, Pinterest)

---

## 7. Animaciones

### Texto de héroe fundido (palabra por palabra)
- Escalonado: retraso inicial de 0,3 s, 0,1 s entre palabras
- Cada palabra: `opacity: 0, y: 40, filter: blur(8px)` → `opacity: 1, y: 0, filter: blur(0)`
- Duración: 0,8 s, facilidad: `[0,22, 1, 0,36, 1]`

### Revelación de imagen de héroe
- `initial={{ clipPath: 'inset(0 100% 0 0)' }}` → `animate={{ clipPath: 'inset(0 0% 0 0)' }}`
- Duración: 1,2 s, facilidad: `[0,77, 0, 0,18, 1]`, retraso: 0,6 s

### Portfolio Grid Stagger
- 12 elementos, cada uno: `delay: i * 0.07`
- `opacity: 0, y: 30, filter: blur(10px)` → invertido
- Activado por `useInView({ once: true, margin: '-60px' })`

### Superposición de desplazamiento de mampostería
- Superposición `opacidad: 0 → 1`, duración: 0.35s facilidad
- Imagen `escala: 1→ 1.05`, duración: 0.7s facilidad

### Proceso de desplazamiento horizontal
- Arrastre táctil/ratón habilitado de forma nativa a través de overflow-x
- Puntos de ajuste: `scroll-snap-type: x obligatorio`, cada elemento `scroll-snap-align: start`

### Línea de terracota (Acerca de)
- `escalaY: 0 → 1`, origen superior, duración: 0,7 s, facilidad: `[0,22, 1, 0,36, 1]`

### Sección revela (todas las secciones que no son de héroes)
- `opacidad: 0, y: 24` → `opacidad: 1, y: 0`
- Duración: 0,65 s, facilidad: `[0.22, 1, 0.36, 1]`
- Activado una vez por sección en la entrada de desplazamiento

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca denominativa + hamburguesa; cajón derecho deslizable con todos los enlaces, entrada escalonada
- Hero: área de texto con relleno de 24px 20px, H1 fijado a 52px, imagen debajo de ancho completo h-[50vw]
- Portafolio: 1 columna, los 12 elementos listados
- Servicios: tarjetas apiladas de 1 columna con borde superior de terracota
- Proceso: desplazamiento horizontal mantenido, tarjetas de 88 vw de ancho
- Acerca de: imagen de ancho completo en la parte superior, texto debajo
- Testimonios: 1 columna

### Tableta (768px–1024px)
- Portafolio: mampostería de 2 columnas
- Servicios: 2 columnas (primeros 2) + 1 abajo, o 3 columnas ajustadas
- Acerca de: 2 columnas mantenidas

### Escritorio (> 1024px)
- Portafolio: 3 columnas mampostería
- Todo en todas sus especificaciones

---

## 9. Copia completa

### Marca
**STUDIO NOMA**

### Lema
"Espacio formado con intención"

### Navbar
- Portafolio
- Servicios
- Proceso
- Acerca de
- Contacto
- [Enlace de texto] Ponte en contacto →

### Sección Hero
- Etiqueta: `INTERIOR DESIGN STUDIO — AMSTERDAM`
- H1: `Espacio formado\ncon intención`
- Sublínea: `Diseñamos espacios que parecen inevitables.`
- CTA Primario: `Ver nuestro trabajo`
- CTA Secundario: `Contact Studio →`

### Sección de portafolio
- Ceja: `TRABAJO SELECCIONADO`
- Encabezado: `Lo que hemos construido`
- Contador: `01 — 12`
- Pestañas de filtro: Todos / Residencial /Comercial/Staging
- Enlace a continuación: `Ver todos los proyectos →`

**Nombres de elementos de cartera (para superposiciones):**
1. La Residencia Prinsengracht — 2024 — Residencial
2. Studio Zwart — 2023 — Comercial
3. Villa Oud-Zuid — 2024 — Residencial
4. Café Marges — 2023 — Comercial
5. The Jordaan Loft — 2024 — Residencial
6. Sala de exposiciones de Haarlemmerstraat — 2022 — Comercial
7. La Casa del Canal — 2024 — Residencial
8. Hotel Bereken — 2023 — Comercial
9. Villa Vondelpark — 2023 — Residencial
10. Studio De Pijp — 2024 — Comercial
11. Las puestas en escena — Maasdam Street — 2024 — Puesta en escena
12. The Herengracht Apartment — 2022 — Residential

**Resúmenes de imágenes del portafolio (uno por artículo):**
```jsx
{/* Image 1: bright Scandinavian living room with floor-to-ceiling bookshelves, linen sofa, warm afternoon light, oak herringbone floor, editorial interior design photography */}
{/* Image 2: minimalist commercial studio interior, concrete floors, natural wood desk, terracotta accent wall, soft diffused skylight */}
{/* Image 3: large villa living area, double-height ceilings, exposed wooden beams, white walls, natural linen curtains, stone fireplace, warm and airy feel */}
{/* Image 4: intimate café interior, warm clay plaster walls, rattan chairs, handcrafted ceramic tableware, ambient evening lighting, cozy European atmosphere */}
{/* Image 5: industrial loft conversion, exposed brick, tall windows, mid-century furniture, warm textile layering, styled bookshelf */}
{/* Image 6: high-end retail showroom, floating display shelves, warm track lighting, neutral palette with terracotta product accents */}
{/* Image 7: renovated Amsterdam canal house interior, original wooden floors, modern linen furniture, dramatic window light reflecting off canal */}
{/* Image 8: boutique hotel lobby, organic textured walls, hand-knotted rug, sculptural lighting fixtures, warm amber ambience */}
{/* Image 9: garden-facing villa kitchen, Shaker white cabinetry, integrated brass hardware, stone island, blooming garden view through large window */}
{/* Image 10: creative agency office, Scandinavian furniture, moss green accent partition, natural materials, diffused natural light */}
{/* Image 11: staged bedroom interior, crisp linen bedding, terracotta throw pillow, oak bedside, soft morning light, clean and aspirational */}
{/* Image 12: classic Amsterdam apartment, arched doorways, warm parquet floor, artwork on walls, curated styling objects, elevated minimalism */}
```

### Sección de Servicios
- Ceja: `QUÉ HACEMOS`
- Encabezado: `Nuestro Servicios`

**Tarjeta 1 — Diseño Residencial**
- Número: 01
- Descripción: Servicio completo de diseño de interiores para casas y departamentos. Desde el concepto hasta su finalización, nos encargamos de todo: planificación espacial, selección de materiales, mobiliario, iluminación y estilo. 

**Tarjeta 2: Interiores comerciales**
- Número: 02
- Descripción: Oficinas, estudios, espacios de hospitalidad y entornos minoristas diseñados para reflejar su marca y crear experiencias que sus clientes y equipos recordarán.

**Tarjeta 3 — Property Staging**
- Número: 03
- Descripción: Puesta en escena estratégica que enamora al comprador. Transformamos espacios vacíos o anticuados en casas que se fotografían bellamente y se venden más rápido, a mejores precios.

### Sección de proceso
- Ceja: `CÓMO TRABAJAMOS`
- Título: `Cinco pasos para un espacio que te encanta`

Pasos:
1. **01 — Descubrimiento** — Comenzamos con una conversación profunda. Tu estilo de vida, tus instintos estéticos, tu forma de moverte por el espacio, todo ello da forma a lo que viene después. Sin plantillas. Sin fórmulas.
2. **02 — Concepto** — Desarrollamos un concepto visual y espacial: mood boards, paletas de materiales, planos espaciales. Una dirección clara antes de comprar o comprar un solo artículo.se pinta una sola pared.
3. **03 — Desarrollo de diseño** — Dibujos técnicos completos, búsqueda de proveedores, información sobre piezas personalizadas. Todo está especificado y documentado antes de que su proyecto entre en ejecución.
4. **04 — Ejecución** — Coordinamos a cada contratista, proveedor y entrega. Nuestro gerente de proyecto está en el sitio en todo momento. No tienes que gestionar nada.
5. **05 — Revelado y estilo** — Instalación final, colocación de arte, curación de objetos. Entregamos un espacio que está completo, no solo terminado.

- Pista de desplazamiento: `→ desplácese para explorar`

### Acerca de la sección
- Ceja: `FUNDADOR — SARA ERIKSSON`
- H2: `Diseño que comienza\nCon escuchar`
- Para 1: `Studio Noma fue fundado en Ámsterdam en 2017 por Sara Eriksson, una diseñadora de origen sueco formada en el Royal College of Art de Londres. Sara inició el estudio con una única convicción: el buen diseño siempre va precedido de una buena escucha.`
- Para 2: `Trabajamos lenta e intencionadamente. Nuestro estudio asume un número limitado de proyectos cada año para que cada cliente reciba toda nuestra atención, no una versión delegada de la misma.`
- Para 3: `Nuestra estética es cálida, sobria y profundamente considerada. Nos encantan los materiales naturales, las texturas imperfectas y las habitaciones que se sienten habitadas incluso antes de dormir. Diseñamos para la vida real, no para la fotografía.`
- Enlace: `Lea la historia de nuestro estudio →`

### Sección de testimonios
- Ceja: `PALABRAS DEL CLIENTE`
- Encabezado: `Lo que dicen nuestros clientes`

**Cita 1:**
> "Sara y el equipo de Noma comprendieron nuestra casa desde la primera visita. No impusieron un estilo: sacaron lo que ya estaba allí y lo hicieron coherente. Somos más 'nosotros' que nunca".
> — *Lena & Thomas B., Jordaan Residence, Ámsterdam*

**Cita 2:**
> "Nuestra oficina pasó de ser una caja blanca al espacio creativo más hermoso en el que he estado. Nuestro equipo tiene más energía. Nuestros clientes lo notan inmediatamente".
> — *Marijn V., Studio Zwart, Ámsterdam*

### Prensa Sección
- Etiqueta: `COMO SE VE EN`
- Publicaciones: Architectural Digest · Kinfolk ·Dezeen · Elle Decoración · Papel tapiz* · Revista Frame

### Sección de contacto
- Ceja: `INICIAR UN PROYECTO`
- H2: `Vamos a crear\nalgo juntos`
- Sublínea: `Cada habitación cuenta una historia; te ayudamos a encontrar tuyo.`
- Etiquetas de formulario: Su nombre / Dirección de correo electrónico / Tipo de proyecto / Cuéntenos sobre su proyecto
- Tipos de proyecto: Residencial · Comercial · Puesta en escena · Aún no estoy seguro
- CTA: `Enviar mensaje`
- Correo electrónico alternativo: `O envíenos un correo electrónico directamente: hello@studionoma.com`

### Pie de página
- Lema: "Cada espacio merece una intención".
- Enlaces: Portafolio · Servicios · Proceso · Acerca de · Contacto · Privacidad
- Dirección: Prinsengracht 417, 1016 HP Amsterdam, The Países Bajos
- © 2024 Studio Noma. Todos los derechos reservados.

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-select": "^2.1.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

**Configuración de Tailwind adiciones:**
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        'noma-linen': '#f4efe8',
        'noma-charcoal': '#2a2825',
        'noma-terracotta': '#c4673c',
      },
    },
  },
};
```

**Utilidad CSS (ocultar barra de desplazamiento para desplazamiento de proceso horizontal):**
```css
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```
