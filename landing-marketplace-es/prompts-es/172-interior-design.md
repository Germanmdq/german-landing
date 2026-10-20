# Sitio web de Interior Design Studio Prompt
# websiteprompts.ai

---

Cree un sitio web completo de estudio de diseño de interiores para **Lumine Studio**, una práctica de diseño residencial y comercial de alto nivel. Base casi negra, tipografía en crema cálida, acento arena. El diseño es temperamental, editorial y profundamente lujoso: espacios que susurran en lugar de gritar. Piense en que Axel Vervoordt se encuentra con un estudio de branding moderno. Cada detalle considerado, nada superfluo.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 30 10% 8%;           /* #100f0d near-black warm */
  --surface: 30 8% 10%;              /* #171613 surface */
  --surface-raised: 30 7% 12%;       /* #1f1d1a card bg */
  --surface-hover: 30 6% 16%;        /* #2a2825 hover state */
  --border: 30 6% 22%;               /* #38352f warm border */
  --border-soft: 30 5% 28%;          /* #484440 secondary */
  --foreground: 36 28% 92%;          /* #f2ede4 warm off-white */
  --foreground-muted: 36 12% 52%;    /* #8a8478 muted warm */
  --foreground-subtle: 36 8% 36%;    /* #5e5a54 subtle */
  --sand: 32 40% 64%;                /* #c4a882 warm sand accent */
  --sand-light: 32 28% 16%;          /* #2e261c sand tint bg */
  --sand-muted: 32 20% 40%;          /* #6e5e48 sand muted */
  --cream: 36 30% 94%;               /* #f0ebe2 near-white cream */
}
```

---

## Tipografía

Importar: `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400;1,9..144,500&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap`

- **Display / H1–H2**: Fraunces 300–400, tamaño óptico 72–144, espacio entre letras -0,01 em, altura de línea 0,95. Variante en cursiva para palabras de énfasis.
- **Subtítulos / H3**: Fraunces 300 cursiva, tamaño óptico 9–36, tamaño más pequeño
- **UI / Body / Nav**: DM Sans 300–500, limpio y neutral
- **Etiquetas / Etiquetas / Precios**: JetBrains Mono 400, mayúsculas, espacio entre letras 0,12–0,18 em

---

## Efectos visuales

### 1. Paralaje de imagen destacada

La foto del panel derecho se desplaza a una velocidad de desplazamiento de 0,6× (paralaje):
```jsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 800], [0, -120]);
// Apply to <motion.div> wrapping the hero photo
```

### 2. Entrada escalonada: contenido del héroe Las líneas 

H1 se revelan con una ruta de clip en la montura:
```
Each line: overflow hidden wrapper
Inner span: initial={{ y: '110%' }}
animate={{ y: '0%' }}
transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: index * 0.14 }
```

Sub y CTA:
```
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: 'easeOut', delay: 0.55 }}
```

### 3. La sección activada por desplazamiento revela

El contenido de cada sección se desvanece en el desplazamiento:
```
initial={{ opacity: 0, y: 32 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
Trigger: useInView, once: true, margin: '-80px'
Stagger children: delay: index * 0.10
```

### 4. Cursor de tarjeta de proyecto seguidor

On el desplazamiento sobre la cuadrícula del proyecto: una pequeña etiqueta circular (`ancho: 80 px, alto: 80 px`) sigue al cursor dentro del contenedor de la tarjeta y muestra "Ver →" en JetBrains Mono 9 px en mayúsculas. Framer Motion `useMotionValue` para x/y, `useSpring` para un retraso suave: 
```
const springConfig = { stiffness: 350, damping: 30 }
const cursorX = useSpring(useMotionValue(0), springConfig)
const cursorY = useSpring(useMotionValue(0), springConfig)
// Cursor circle: white, border-radius 50%, mix-blend-mode: difference (or sand bg)
```

### 5. Revelado decorativo de línea de arena

A La línea horizontal de color arena de 1 px se anima antes de cada sección encabezado:
```
initial={{ scaleX: 0, transformOrigin: 'left center' }}
animate={{ scaleX: 1 }}
transition={{ duration: 0.6, ease: 'easeOut' }}
Width: 40px, background: hsl(var(--sand)), margin-bottom 16px
```

### 6. Escala flotante de fotos

Atodas las fotos del proyecto:
```css
img { transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.card:hover img { transform: scale(1.04); }
overflow: hidden on parent
```

---

## Sección Desglose

###Sección 1: barra de navegación (fija) 

Parte superior fija. `background: hsl(var(--background) / 0.92)`, `backdrop-filter: blur(16px)`, `border-bottom: 1px solid hsl(var(--border))`. Relleno 22px 64px.

**Izquierda**: "Lumine Studio" — Fraunces cursiva 300, tamaño de fuente 19px, espacio entre letras 0,04em, color de primer plano.

**Enlaces centrales**: Proyectos · Servicios · Estudio · Revista · Contacto — DM Sans 12px, peso 400, espaciado entre letras 0,04 em, color `hsl(var(--foreground-muted))`. Al pasar el mouse: primer plano. Subrayado activo: subrayado de color arena de 1 px.

**Derecha**: "Consultar" — `border: 1px solid hsl(var(--border))`, color de primer plano apagado, fondo ninguno, relleno 9px 22px, radio de borde 2px, DM Sans 12px. Al pasar el mouse: borde de color arena, color arena, transición 0,2 s.

Móvil: hamburguesa (2 líneas blancas finas) → superposición oscura en pantalla completa, `background: hsl(var(--background))`, enlaces apilados con títulos grandes en cursiva Fraunces, "Consultar" en ancho completo en bottom.

---

### Sección 2 — Héroe (panel dividido)

`display: grid`, `grid-template-columns: 1fr 1fr`, `min-height: 100vh`, `padding-top: 68px` (nav altura).

**Panel izquierdo: contenido** (`background: hsl(var(--background))`, relleno 80px 64px, `display: flex`, `flex-direction: column`, `justify-content: space-between`, `border-right: 1px solid hsl(var(--border))`):

Bloque superior:
- Etiqueta de ubicación: JetBrains Mono 9 píxeles en mayúsculas, espacio entre letras de 0,18 em, color de primer plano apagado, margen inferior de 32 píxeles. Texto: "Interior Design Studio · Londres y Milán"
- H1 con animación de revelación de línea: Fraunces 300, clamp(56px, 6.5vw, 96px), altura de línea 0,95, espacio entre letras -0,01em. Tres líneas:
 - "Interiores" — primer plano en color
 - "que sostienen" - primer plano en color
 - "*poder silencioso.*" — Fraunces cursiva 300, color `hsl(var(--sand))`

Bloque inferior:
- Sub: "Creamos espacios residenciales y comerciales refinados sin ser fríos y habitables sin concesiones". — DM Sans 14px, color de primer plano apagado, altura de línea 1,85, ancho máximo 380px, margen inferior 40px.
- Dos botones, `display: flex`, espacio 10px:
 - Principal: "Nuestros proyectos" — `background: hsl(var(--foreground))`, color `hsl(var(--background))`, DM Sans 12px peso 500, espacio entre letras 0,04em, relleno 13px 28px, radio de borde 1px. Al pasar el mouse: `background: hsl(var(--cream))`.
 - Fantasma: "Póngase en contacto" — `border: 1px solid hsl(var(--border))`, color de primer plano apagado, fondoNinguno, mismo tamaño. Al pasar el mouse: primer plano con color de borde, primer plano con color apagado.

**Panel derecho: foto** (posición relativa, desbordamiento oculto):

Foto con desplazamiento de paralaje (ver Efectos visuales):
```
{/* Image: dramatic dark-toned luxury living room, moody low pendant lighting, charcoal grey velvet sofa, marble side table, single warm circle of lamplight against dark walls, deep shadows, architectural interior photography, cinematic quality */}
<motion.div style={{ y }} className="absolute inset-0 scale-110">
  <img src="" alt="Luxury living room with moody lighting and marble surfaces" className="w-full h-full object-cover object-center" />
</motion.div>
```

Superposición de degradado (independiente de la composición):
```css
background: linear-gradient(
  to bottom,
  rgba(16,15,13,0.2) 0%,
  rgba(16,15,13,0.35) 60%,
  rgba(16,15,13,0.85) 100%
);
```

Barra de superposición inferior (absoluta, relleno 32px):
- `display: flex`, justify-between, align-items flex-end
- Izquierda: etiqueta de proyecto en JetBrains Mono 9px en mayúsculas silenciado + nombre del proyecto "The Chelsea House, 2025" en Fraunces cursiva 300 18px primer plano
- Derecha: "Ver mayúsculas →" — DM Sans 11px espaciado entre letras mayúsculas 0,08em silenciado, `border-bottom: 1px solid hsl(var(--border))`, puntero del cursor. Al pasar el mouse: color arena, borde color arena.

---

### Sección 3: Tira de credenciales

Ancho completo, `background: hsl(var(--surface))`, `border-top: 1px solid hsl(var(--border))`, `border-bottom: 1px solid hsl(var(--border))`, relleno 32px 64px.

Cinco elementos en una `display: flex`, espacio de 64px, alineación de elementos en el centro. Elementos separados por divisores verticales de 1 px × 40 px (`background: hsl(var(--border))`): 

1. **"140+"** / "Proyectos completados"
2. **"12"** / "Años de práctica"
3. **"9"** / "Países"
4. **"4.9★"** / "Satisfacción del cliente"
5. **"Londres · Milán · París"** / "Ubicaciones de estudio"

Eada: número en Fraunces 300 28 px en primer plano, etiqueta en JetBrains Mono 9 px entre letras mayúsculas y 0,12 em en primer plano silenciado, espacio de 5 px, dirección flexible column.

---

### Sección 4: Filosofía

`background: hsl(var(--surface))`, `border-bottom: 1px solid hsl(var(--border))`, relleno 100px 64px. `display: grid`, `grid-template-columns: 1fr 1fr`, gap 96px, align-items start.

**Izquierda — título:**

Revelación de línea de arena (ver Efectos visuales).
H2: "El diseño es el arte de saber qué omitir". — Fraunces cursiva 300, clamp(42px, 4.5vw, 62px), altura de línea 1,05, color de primer plano.

Abajo h2 (margen superior 32px): "Trabajamos con clientes que creen que los mejores espacios son aquellos que no es necesario explicar". — DM Sans 14px, altura de línea silenciada en primer plano 1,85, ancho máximo 360 px.

**Derecha, lista numerada:**

DM Sans 15px color, altura de línea silenciada en primer plano 1,9, margen inferior 24px:
"Lumine Studio funciona con privado propietarios de viviendas,desarrolladores y marcas hoteleras. Nuestros proyectos van desde transformaciones de una sola habitación hasta colaboraciones arquitectónicas de varios años."

Lista numerada de 3 elementos, `display: flex`, columna de dirección flexible, espacio 0, margen superior 32 px. Cada elemento: fila flexible, espacio 20 px, relleno 22 px 0, `border-bottom: 1px solid hsl(var(--border))`, align-items flex-start.

Estructura por artículo:
- Índice: JetBrains Mono 9px primer plano-sutil, flex-shrink 0, padding-top 3px
- Bloque de contenido: título en DM Sans 14px peso 500 primer plano, margen inferior desc en DM Sans 12px; altura de línea silenciada en primer plano 1.6

Tres elementos:
1. **Diseño de servicio completo**: "Desde el concepto inicial hasta el estilo final y la entrega. Nos encargamos de la arquitectura, los interiores, los muebles y el arte". 
2. **Arquitectura y estructura** — "Trabajamos desde el exterior hacia adentro: permisos de planificación, cambios estructurales, materiales, acabados y carpintería integrada". 
3. **Mobiliario y abastecimiento personalizados** — "Piezas hechas a medida según nuestro diseño y obras seleccionadas de los creadores y galerías con los que hemos dedicado años a establecer relaciones con."

---

### Sección 5: Proyectos seleccionados

`background: hsl(var(--background))`, relleno 100px 64px.

**Encabezado**: `display: flex`, justificar entre, alinear elementos de línea base, margen inferior 56px.
- H2: Fraunces 300, clamp(38px, 4vw, 52px), altura de línea 1. Dos líneas: "Seleccionado" / "*proyectos.*" (cursiva arena)
- "Todos los proyectos →" — DM Sans 11px espaciado entre letras mayúsculas 0,10 em primer plano silenciado, fondo ninguno, borde ninguno, puntero del cursor al pasar el mouse: color arena.

**Cuadrícula del proyecto**: `display: grid`, `grid-template-columns: repeat(3, 1fr)`, espacio de 1 px, `background: hsl(var(--border))` Agregar seguidor de cursor al pasar el mouse sobre el contenedor de la cuadrícula (ver Efectos visuales).

Seis tarjetas de proyecto cada una: `background: hsl(var(--background))`, desbordamiento oculto, puntero del cursor. Fundido escalonado en el desplazamiento.

Estructura de la tarjeta:
- Foto (relación de aspecto 3/4, desbordamiento oculto): `<img>` con cubierta de objeto, centro de objeto, animación de desplazamiento de escala
- Bloque de información (relleno de 20px): etiqueta de ubicación en JetBrains Mono 9px en mayúsculas silenciadas + nombre del proyecto en cursiva Fraunces 300 18px en primer plano, espacio de 8px entre

Fotografíaescritos:
```
[1] {/* Image: minimalist apartment living room, cream walls, custom oak joinery, large pivot door, afternoon light, empty and editorial, high-end residential interior photography */}
[2] {/* Image: dark moody dining room, round marble table, curved bouclé chairs, low pendant light, shadows and candlelight atmosphere, luxury residential */}
[3] {/* Image: master bedroom with floor-to-ceiling linen curtains, pale oak headboard wall, bedside marble lamp, serene and spa-like */}
[4] {/* Image: open-plan kitchen with dark stone island, brass fittings, warm task lighting, bespoke cabinetry, architectural detail */}
[5] {/* Image: luxury hotel lobby, dark stone floors, statement reception desk, tall tropical plant, dramatic ceiling height */}
[6] {/* Image: home office study with dark paneled walls, antique desk, library shelving, warm leather chair, lived-in intellectual atmosphere */}
```

Seis proyectos:
1. **The Chelsea House** — "Londres · Residencial"
2. **Palazzo Bianco** — "Milán · Residencial"
3. **Rue du Temple** — "París · Residencial"
4. **La cocina Carlow** — "Dublín · Residencial"
5. **Hotel Solaire** — "Lisboa · Hospitalidad"
6. **The Dover Gallery** — "Londres · Comercial"

---

### Sección 6 — Proceso

`background: hsl(var(--surface-raised))`, `border-top: 1px solid hsl(var(--border))`, padding 100px 64px.

**Encabezado** (centro, ancho máximo 640 px, margen 0 automático, centro de alineación de texto, margen inferior 72 px): 
 Línea de arena (centrada, `transformOrigin: centro`). 
H2: Fraunces 300 cursiva, clamp(40px, 4vw, 56px): "Cómo se une un proyecto *Lumine*".
Sub: DM Sans 14px foreground-muted line-height 1.85 margin-top 16px: "Cada proyecto es diferente. El proceso siguiente es nuestra constante". 

**Cuatro pasos**: `display: grid`, `grid-template-columns: repeat(4, 1fr)`, espacio 0, `border: 1px solid hsl(var(--border))`. Desvanecimiento escalonado.

Cada paso (relleno 36px 28px, `border-right: 1px solid hsl(var(--border))`, último hijo sin borde derecho):
- Número de paso: Fraunces cursiva 300, 52px, altura de línea 1, color `hsl(var(--sand) / 0.3)`, margen inferior 20px
- Nombre del paso: DM Sans 500 15px primer plano, margen inferior 10px
- Descripción: DM Sans 300 13px primer plano-silenciado altura de línea 1.7

Cuatro pasos:
1. **Descubrimiento**: "Nos reunimos en persona o de forma remota para entender cómo usas tu espacio, qué te gusta y qué no funciona. Sin informes, solo conversación".
2. **Concepto** — "Desarrollamos dos o tres conceptos espaciales: paneles de inspiración, paletas de materiales y planos de planta preliminares. Tú eliges una dirección y nosotros lo refinamos".
3. **Diseño**: "Dibujos detallados, especificaciones de materiales, selecciones de muebles y instrucciones de carpintería a medida. Todo documentado antes de realizar el pedido".
4. **Entrega** — "Gestionamos las adquisiciones, los contratistas y la instalación. Usted entrega la llave y la recoge cuando esté terminada".

---

### Sección 7: Testimonios

`background: hsl(var(--background))`, `border-top: 1px solid hsl(var(--border))`, padding 100px 64px.

**Encabezado** (margen inferior 64px):
Línea de arenarevelar.
H2: Fraunces cursiva 300, clamp(38px, 4vw, 54px): "*Lo que dicen los clientes*".

Tres tarjetas de testimonios en `grid-template-columns: repeat(3, 1fr)`, espacio de 20px. Desvanecimiento escalonado en el desplazamiento.

Cada tarjeta (`background: hsl(var(--surface-raised))`, `border: 1px solid hsl(var(--border))`, radio de borde 2px, relleno 36px):
- Comillas de apertura: Fraunces cursiva 300 64px, color `hsl(var(--sand) / 0.25)`, altura de línea 1, margen inferior -8px
- Cita: Fraunces cursiva 300 16px, color de primer plano, altura de línea 1.75, margen inferior 28px
- Divisor: línea de color arena de 1px, ancho 32px, margen inferior 20px
- Cliente: DM Sans 500 13px primer plano + ubicación/proyecto en JetBrains Mono 9px mayúsculas, primer plano silenciado, margen superior 6px

Tres testimonios:
1. **Helena M., Londres** — "Le entregamos a Lumine un apartamento en apariencia y nos devolvieron una casa en la que no sabíamos que éramos capaces de vivir. Cada decisión que tomaron fue correcta".
2. **Francesco & Giulia T., Milán** — "Tres estudios nos propusieron. Lumine fue el único que escuchó antes de hablar. El resultado es algo que ni nosotros mismos podríamos haber imaginado".
3. **James K., Dublín** — "He renovado dos veces antes, ambas con otros diseñadores. Este fue el primer proyecto que terminó a tiempo, dentro del presupuesto y exactamente según lo especificado. Me quedé realmente sorprendido".

---

### Sección 8 — Estudio (Acerca de)

`background: hsl(var(--surface))`, `border-top: 1px solid hsl(var(--border))`, relleno 100px 64px. `display: grid`, `grid-template-columns: 1fr 1fr`, espacio 80px, align-items center.

**Izquierda — contenido:**

Revelado de línea de arena.
H2: Fraunces cursiva 300, clamp(38px, 4vw, 52px): "Un pequeño estudio. *Un estándar de gran tamaño*."

Dos párrafos (DM Sans 300 14px primer plano-silenciado altura de línea 1.9, espacio 20px):
- "Lumine Studio fue fundado en 2013 por la directora creativa Isabelle Fontaine. Lo que comenzó como una práctica de una sola persona en el este de Londres se ha convertido en un equipo de siete, todavía lo suficientemente pequeño como para que Isabelle trabaje en cada uno. proyecto."
- "Creemos en la moderación, en materiales que envejecen maravillosamente y en espacios que se sienten generosos incluso cuando son compactos. Cada proyecto que asumimos recibe toda nuestra atención, razón por la cual asumimos menos que la mayoría".

Equipo.vista previa (margen superior 40 px): cuatro fichas de miembros del equipo en envoltura flexible, espacio de 10 px. Cada uno: `background: hsl(var(--surface-raised))`, `border: 1px solid hsl(var(--border))`, radio de borde 2px, relleno 10px 14px. Nombre en DM Sans 12px peso 500 primer plano, rol en JetBrains Mono 9px mayúsculas silenciadas, margen superior 3px.

Equipo:
- Isabelle Fontaine · Directora creativa
- Marco Riva · Diseñador senior
- Clara Hennessy · Proyecto Gerente
- Yuki Tanaka · Abastecimiento y materiales

"Conozca al equipo completo →" enlace de texto debajo de los chips, DM Sans 12px en primer plano silenciado, borde inferior de 1px.

**Derecha - foto:**

`border-radius: 2px`, desbordamiento oculto, relación de aspecto 4/5, foto con animación de desplazamiento a escala.
```
{/* Image: interior design studio workspace, drawing table with architectural sketches, material samples fanned out, warm desk lighting, creative professional environment, editorial photography */}
<img src="" alt="Lumine Studio design workspace with material samples and sketches" className="w-full h-full object-cover object-center" />
```

---

### Sección 9: Prensa y reconocimiento

Ancho completo, `background: hsl(var(--surface-raised))`, `border-top: 1px solid hsl(var(--border))`, relleno 40px 64px.

Etiqueta izquierda: "Como se ve en" - JetBrains Mono 9px espaciado entre letras mayúsculas 0,14em primer plano silenciado, contracción flexible 0.

Derecha: fila flexible, espacio de 48px, alineación de elementos en el centro, `color: hsl(var(--foreground-muted))`, opacidad 0,4. Publicaciones en DM Sans 700 16px espacio entre letras -0,02em. Al pasar el mouse: opacidad 1, transición 0.2s.

Publicaciones: Architectural Digest · Wallpaper* · Dezeen · Elle Decor · The World of Interiors · Frame

---

### Sección 10 — Contacto / Consulta

`background: hsl(var(--background))`, `border-top: 1px solid hsl(var(--border))`, relleno 100px 64px. `display: grid`, `grid-template-columns: 1fr 1fr`, espacio 80px.

**Izquierda: encabezado e información:**

Revelado de línea y arena.
H2: Fraunces cursiva 300, clamp(44px, 5vw, 68px), altura de línea 0,95: "Inicio a *conversation.*"

Sub (DM Sans 14px primer plano-silenciado altura de línea 1.85, margen: 24px 0 40px): "Asumimos una cantidad limitada de proyectos cada año. Si está considerando una renovación, remodelación o construcción nueva, nos encantaría saberlo, incluso si es temprano". detalles (columna flexible, espacio de 16 px): 
- ✉ hello@luminestudio.co.uk
- 📞 +44 20 7946 0201
- 📍 8 Boundary Street, Shoreditch, Londres E2 7JE
- 📍 Via Tortona 14, Milán, 20144

Eda línea: DM Sans 13px en primer plano. Etiqueta en JetBrains Mono 9px mayúsculas silenciadas, margen inferior 2px.

**Derecha— formulario de consulta:**

Campos de formulario (DM Sans 13px), apilados, espacio de 14px:
- Nombre (ancho completo)
- Correo electrónico (ancho completo)
- Tipo de proyecto: seleccione el menú desplegable con opciones — Residencial / Comercial / Hospitalidad / Aún no estoy seguro
- Presupuesto aproximado: seleccione: Menos de £50 000 / £50-150 k / £150-500 k / £500 k+
- Cuéntenos sobre su proyecto: área de texto, 5 filas

Atodas las entradas: `background: hsl(var(--surface-raised))`, `border: 1px solid hsl(var(--border))`, relleno 12px 16px, radio de borde 2px, color de primer plano, familia de fuentes DM Sans. Enfocado: `border-color: hsl(var(--sand))`, contorno ninguno.

Botón de envío: ancho completo, `background: hsl(var(--foreground))`, color `hsl(var(--background))`, DM Sans 12px, peso 500, espacio entre letras mayúsculas de 0,06 em, relleno de 14px, radio de borde de 1px. Al pasar el mouse: `background: hsl(var(--cream))`.

---

### Sección 11 — Pie de página

`background: hsl(0 0% 4%)` (negro más intenso). Relleno 56px 64px 32px.

**Cuadrícula superior**: `grid-template-columns: 2fr 1fr 1fr 1fr`, espacio 48px.

Columna 1 (Marca):
- "Lumine Studio" — Fraunces cursiva 300, 19px, color `hsl(var(--foreground))`
- "Diseño de interiores y arquitectura. Londres · Milán · París." — DM Sans 300 12px `hsl(var(--foreground-muted))`, margen superior 10px, ancho máximo 200px, altura de línea 1.7
- "© 2026 Lumine Studio Ltd. Todos los derechos reservados". — JetBrains Mono 9px `hsl(var(--foreground-subtle))`, margen superior 20px

Columna 2 (Trabajo):
- Encabezado: "Trabajo" — JetBrains Mono 9px Espacio entre letras mayúsculas 0,12em `hsl(var(--foreground-subtle))`
- Enlaces (DM Sans 12px `hsl(var(--foreground-muted))`, espacio de 10 px, cursor: primer plano): Proyectos · Residencial · Comercial · Hospitalidad · Archivo

Columna 3 (Estudio):
- Encabezado: "Estudio"
- Enlaces: Acerca de · Equipo · Proceso · Revista · Prensa

Columna 4 (Conectar):
- Encabezado: "Conectar"
- Enlaces: Instagram · Pinterest · LinkedIn · hello@luminestudio.co.uk

**Barra inferior** (margen superior 40px, relleno superior 20px, `border-top: 1px solid rgba(242,237,228,0.06)`):
- Izquierda: "Política de privacidad · Términos"
- Derecha: "Diseñado por Lumine Studio"
Ambos: JetBrains Mono 9px `hsl(var(--foreground-subtle))`.

---

## Resumen de animaciones

| Elemento | Animación | Gatillo |
|---|---|---|
| Líneas héroe H1 | Deslizarse hacia arriba desdey: 110% (revelación del clip) | En la montura, escalone 0,14 s |
| Sub héroe + CTA | Desvanecimiento y:20, opacidad 0→1 | En montaje, retraso de 0,55 s |
| Foto de héroe | Paralaje y:0→-120px | Desplazamiento |
| Divisores de línea de arena | escalaX 0→1 desde la izquierda | IntersecciónObservador |
| Tira de credenciales | Desvanecimiento escalonado | Desplácese hacia Ver |
| Elementos de la lista de filosofía | Desvanecimiento escalonado | Desplácese hacia Ver |
| Tarjetas de proyecto | Desvanecimiento escalonado + desplazamiento de escala sobre la foto | Desplazarse + pasar el cursor |
| Seguidor del cursor del proyecto | Seguimiento suave del resorte | Movimiento del ratón |
| Pasos del proceso | Desvanecimiento escalonado | Desplácese hacia Ver |
| Tarjetas de testimonios | Desvanecimiento escalonado | Desplácese hacia Ver |
| Campos del formulario de consulta | Desvanecimiento escalonado | Desplazarse enVer |

---

## Responsive

**Móvil (< 768px):**
- Navegación: hamburguesa → superposición de pantalla completa `hsl(var(--background))`, enlaces en cursiva Fraunces apilados en tamaño grande, "Consultar" botón con borde de arena de ancho completo en la parte inferior
- Héroe: columna única, foto primero (relación de aspecto 4/3), contenido a continuación con relleno reducido
- Credenciales: cuadrícula de 2×3 (2 columnas, 3 filas)
- Filosofía: columna única
- Cuadrícula de proyecto: columna única, relación de aspecto 4/3 por foto
- Proceso: pasos verticales de una sola columna
- Testimonios: desplazamiento horizontal, una tarjeta visible
- Acerca de: una sola columna, foto sobre el contenido
- Contacto: una sola columna, formulario debajo del encabezado

**Tableta (768px–1024px):**
- Héroe: mantener dividido, reducir el relleno a 40px
- Cuadrícula del proyecto: 2 columnas
- Proceso: cuadrícula 2×2
- Testimonios: 2 columnas, tercera stacked

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.400.x",
  "@radix-ui/react-select": "^2.x"
}
```

---

## Notas rápidas

- El nombre de la marca es **Lumine Studio** - cambiar a cualquier estudio nombre. Toda la copia (nombres de equipos, direcciones, testimonios) está lista para reemplazar con información real. 
: el seguidor del cursor del proyecto (Sección 5) es una mejora opcional; es seguro eliminarlo si la herramienta de inteligencia artificial no lo implementa limpiamente. La cuadrícula funciona sin ella.
- Las 6 fotos del proyecto y 2 fotos editoriales sondescritos como resúmenes fotográficos: fotografía residencial de lujo, oscura y de mal humor. Cualquier fotografía de interior de alta gama con ese estado de ánimo funcionará.