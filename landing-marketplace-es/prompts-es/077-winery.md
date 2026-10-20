# Cellar & Stone — Mensaje del sitio web de bodega/viñedo

## 1. Declaración de objetivos
Crear un sitio web de bodega editorial y pausado para **Cellar & Stone**, definido por espacios en blanco hueso, acentos en color burdeos profundo y una serifa Didone de alto contraste que se lee como una etiqueta de vino en lugar de una página de restaurante, creado para vender reservas de degustación y un club de vinos. membresías.

---

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño: Colores

```css
:root {
  --background: hsl(38, 24%, 96%);       /* #f8f5f0 bone */
  --foreground: hsl(20, 14%, 14%);       /* #29221f near-black brown */
  --primary: hsl(345, 52%, 26%);         /* #652034 burgundy */
  --primary-foreground: hsl(38, 24%, 97%);
  --muted-foreground: hsl(20, 8%, 46%);
  --border: hsl(35, 16%, 84%);
  --card: hsl(38, 26%, 93%);
  --accent-vine: hsl(96, 14%, 38%);      /* muted vine green */
  --gold-leaf: hsl(40, 42%, 58%);
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
```

- **H1/pantalla hero:** `'Playfair Display', serif;` peso 400, espacio entre letras: -0,015 em, altura de línea: 1,02
- **H2:** Playfair Display 400, 40–56px
- **H3 / nombres de vinos:** Playfair Display cursiva 400, 22–26px
- **Cuerpo:** `'Jost', sans-serif;` peso 300, alto de línea: 1,85, espacio entre letras: 0,01em
- **Cejas/etiquetas:** Jost 500, mayúsculas, espacio entre letras: 0,22em, 11px
- **Años antiguos/precios:** Playfair Display 400, tabular

---

## 5. Efectos visuales

### Efecto 1: Slow Ken Burns Hero
```jsx
<motion.img
  src=""
  alt="Vineyard rows at golden hour"
  className="absolute inset-0 w-full h-full object-cover object-center"
  initial={{ scale: 1.12 }}
  animate={{ scale: 1 }}
  transition={{ duration: 14, ease: 'linear' }}
/>
{/* Image: vineyard rows receding into low hills, golden hour backlight, dust and warm haze, soft film grain, muted earthy palette */}
<div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(41,34,31,0.35) 0%, rgba(41,34,31,0.12) 45%, rgba(41,34,31,0.62) 100%)' }} />
```

### Efecto 2: Tarjeta de botella de vino con etiqueta Lift
```tsx
<div className="group relative text-center">
  <div className="relative overflow-hidden bg-[var(--card)] aspect-[3/4]">
    {/* Image: single wine bottle standing on pale stone, soft directional daylight, long gentle shadow, minimal styling */}
    <img src="" alt="Estate wine bottle" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]" />
  </div>
  <div className="pt-5">
    <div className="font-serif italic text-2xl">Stonecrop Cabernet</div>
    <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">2021 · Estate Reserve</div>
    <div className="mt-3 font-serif text-lg text-[var(--primary)]">$48</div>
  </div>
  {/* Burgundy underline sweeps in on hover */}
  <div className="mx-auto mt-4 h-px w-0 bg-[var(--primary)] transition-all duration-500 group-hover:w-16" />
</div>
```

### Efecto 3 — Notas de Cata Acordeón
```tsx
// shadcn/ui Accordion, single-open, with burgundy chevron rotation
// Trigger: wine name (Playfair italic) + vintage; Content: aroma / palate / pairing in 3 short lines
<AccordionItem value={wine.slug} className="border-b border-[var(--border)]">
  <AccordionTrigger className="py-6 font-serif italic text-xl hover:no-underline">
    {wine.name} <span className="ml-3 font-sans text-xs tracking-[0.22em] uppercase text-[var(--muted-foreground)]">{wine.vintage}</span>
  </AccordionTrigger>
  <AccordionContent className="pb-6 font-sans font-light leading-relaxed">…</AccordionContent>
</AccordionItem>
```

### Efecto 4 — Editorial Fade-Up
```
initial={{ opacity: 0, y: 28 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.85, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
```

---

## 6. Desglose de componentes

### Sección 1: barra de navegación
- escritorio de 84 px / móvil de 64 px, `top fijo-0 z-40`, transparente sobre héroe → fondo óseo con borde inferior de 1 px después de `scrollY > 80`
- **Marca denominativa centrada:** "CELLAR & STONE" (Playfair 400, seguimiento de 0,18 em); Los enlaces de navegación se dividen a izquierda y derecha
- Enlaces izquierdos: Nuestros vinos · Visita · La finca — Enlaces derechos: Wine Club · Diario · [Botón] Reservar una degustación (contorno burdeos)
- Móvil: marca denominativa centrada, hamburguesa a la derecha, menú superpuesto de huesos en pantalla completa

### Sección 2 — Hero
- `h-screen`, contenido centrado, max-w-3xl
- Ceja: `CONDADO DE SONOMA · FINCA CRECIDA DESDE 1978`
- H1: `Vino elaborado lentamente,\ndesde una ladera.` (abrazadera 44px–92px,blanco)
- Sublínea: `Cuarenta acres de cabernet y chardonnay de cultivo de secano sobre el río Russian. Degustaciones con reserva, los siete días de la semana.`
- Fila CTA: `Reserve una degustación` (lleno de color burdeos) + `Explore the Wines` (fantasma blanco)
- Indicación de desplazamiento: línea vertical delgada con pulso lento

### Sección 3 — Declaración de introducción
- Fondo óseo, `py-28`, columna única centrada max-w-2xl
- Ceja `NUESTRA FILOSOFÍA` + una declaración de 3 oraciones en Playfair 28px, interlineado generoso
- Abajo: línea de estilo característico — `— Elena Marchetti, Enóloga`

### Sección 4 — Los Vinos
- Fondo `--background`, `py-24`
- Ceja `THE COLLECTION` + H2 `Six Wines, One Hillside`
- **cuadrícula de 3 columnas** escritorio / tableta de 2 columnas / móvil de 1 columna, tarjetas de botella (Efecto 2)
- Cada uno: imagen de botella, nombre, cosecha + designación, precio, cursor subrayado
- Debajo de la cuadrícula: enlace de texto `Ver notas de cata completas ↓` desplazándose a la Sección 5

### Sección 5 — Notas de cata
- Fondo `--card`, división de 2 columnas: encabezado adhesivo izquierdo, acordeón derecho (Efecto 3)
- Seis artículos de acordeón con líneas de aroma / paladar / maridaje

### Sección 6 — Visita / Sala de degustación
- Dividido 50/50, altura completa
```jsx
{/* Image: warm tasting room interior, long oak table, glasses catching afternoon light, stone wall, unhurried and uncrowded */}
```
- Panel derecho sobre hueso: ceja `VISÍTANOS`, H2 `La sala de degustación`, tres experiencias bloques:
 - **Vuelo clásico: $35/persona, 45 min**: cinco tragos de lanzamiento actual en el bar.
 - **Degustación sentado en finca: $65/persona, 90 min**: seis vinos con queso, en una mesa reservada en la terraza.
 - **Caminata por viñedos y degustación de barriles: $ 95 por persona, 2 horas **: recorra las cuadras con un enólogo y pruebe en barrica. Solo los sábados.
- Bloque de horas + botón `Reservar una degustación` + nota sobre grupos superiores a 8

### Sección 7 — Wine Club
- Fondo burdeos sin borde, texto óseo, `py-28`
- Ceja `WINE CLUB` + H2 `The Stone Circle`
- 3 niveles de membresía en tarjetas con borde (borde de hueso de 1 px en color burdeos)
- Cada uno: nombre del nivel (Playfair en cursiva), cadencia de envío, recuento de botellas, precio por envío, 4 líneas de beneficios, "Unirse"botón (relleno de hueso, texto color burdeos)
- Abajo: `Los miembros reciben degustaciones de cortesía para dos, todo el año.`

### Sección 8 — La finca/historia
- Fondo de hueso, alternando filas de 2 columnas (imagen/texto, luego texto/imagen)
- Tres filas: La tierra · La agricultura · The Cellar: cada uno con un párrafo breve y una imagen
```jsx
{/* Image: hands holding freshly picked wine grapes, dirt under fingernails, natural daylight, documentary style */}
{/* Image: old concrete fermentation tanks in a dim cellar, single shaft of light, quiet and still */}
```

### Sección 9: Vista previa de la revista
- 3 publicaciones más recientes en una fila de tarjetas claras: ceja con fecha, título de Playfair, extracto de 1 línea, `Leer →`

### Sección 10: Reserva CTA
: centrado en `--card`, H2 `Come Taste With Us`, línea corta, CTA burdeos + teléfono

### Sección 11 — Pie de página
: hueso con borde superior de 1 px; 4 columnas: marca + dirección / Vinos / Visita + Club / Suscripción al boletín
- Boletín: entrada única + botón de flecha burdeos, etiqueta `Notas vintage, dos veces al año. Nada más.`
- Tira inferior: línea © + `Por favor, disfruta responsablemente.` + íconos sociales

---

## 7. Animaciones

- **Héroe:** Ken Burns 1.12 → 1 sobre 14 s lineal; H1 se desvanece 0,9 s a 0,25 s; sublínea 0,15 s después; CTA 0,15 s después de eso
- **Barra de navegación:** fundido cruzado de fondo y borde en `scrollY > 80`, facilidad de 0,4 s
- **Encabezados de sección:** desvanecimiento 0,75 s, facilidad `[0,22, 1, 0,36, 1]`
- **Tarjetas de botella:** escalonado `i * 0,09`; al pasar el mouse, escala la imagen 1.04 en 0.7 s y barre un subrayado burdeos de 16 píxeles en más de 0.5 s 
- **Acordeón:** altura automática con una facilidad de 0.35 s; el galón gira 180° en 0,3 s
- **Filas de propiedad:** la imagen se desliza desde su propio lado (`x: ±36 → 0`) mientras que el texto se desvanece, 0,85 s
- **Tarjetas del club de vinos:** escalonamiento 0,12 s, sutil `y: 20 → 0`
- **Indicación de desplazamiento:** opacidad 0.4 ↔ 1 pulso, 2.4s infinito

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca denominativa centrada + hamburguesa, menú de huesos en pantalla completa con enlaces Playfair de 30px
- Hero: H1 se fija a 44px, CTA apilados en ancho completo, indicación de desplazamiento oculta
- Vinos: 1 columna, aspecto de imagen de botella `4/5`
- Notas de cata: encabezado de pilas encima del acordeón (no pegajoso)
- Visita: pilas de imágenes de arribael panel de texto; los bloques de experiencia se convierten en tarjetas con borde
- Club de vinos: 1 columna, niveles apilados
- Estado: todas las filas se convierten en imagen y luego texto, sin alternancia
- Pie de página: 1 columna con el boletín informativo primero

### Tableta (768–1024px)
- Wines 2-col · Las filas Estate siguen alternándose con un relleno reducido · Wine club 3-col con tarjetas más ajustadas

### Escritorio (> 1024px)
- Ancho máximo de contenido 1240px, `px-16`, relleno de sección `py-28`

---

## 9. Copia completa

### Marca
**CELLAR & STONE** — Condado de Sonoma, California

### Navbar
Nuestros Vinos · Visita · The Estate · Wine Club · Journal · [Botón] Reserve una degustación

### Hero
- Ceja: `CONDADO DE SONOMA · FINCA CRECIDA DESDE 1978`
- H1: `Vino elaborado lentamente, en una ladera.`
- Sublínea: `Cuarenta acres de cultivo de secano cabernet y chardonnay sobre el río Ruso. Catas con reserva, los siete días de la semana.`
- CTA 1: `Reserva una Cata` · CTA 2: `Explora los Vinos`

### Filosofía
Eceja: `NUESTRA FILOSOFÍA`
Declaración: `Cultivamos una ladera y nunca hemos comprado un uva. Algunos años eso significa menos vino del que nos gustaría. Cada año significa que la botella te dice exactamente de dónde viene.`
Firma: `— Elena Marchetti, enóloga`

### The Wines
Eceja: `LA COLECCIÓN` — H2: `Seis vinos, una ladera`

1. **Stonecrop Cabernet Sauvignon** · 2021 · Estate Reserve · $48
2. **North Block Chardonnay** · 2023 · Sin madera · $34
3. **Old Vine Zinfandel** · 2020 · Bloque 7 · $52
4. **Rosa de Cabernet** · 2024 · Limitada · $28
5. **Hillside Blend** · 2019 · Lanzamiento de biblioteca · $68
6. **Chardonnay de cosecha tardía** · 2022 · Postre · $38 (375ml)

### Notas de cata
Eceja: `NOTAS DE CATA` — H2: `Lo que encontrarás en la copa`

- **Stoncrop Cabernet Sauvignon, 2021** — *Aroma:* cereza negra, cedro, tomillo seco. *Palabra:* tanino firme pero redondo, grafito, final largo de frutos negros. *Maridaje:* ternera madurada en seco, quesos duros curados, ragú de champiñones.
- **North BlockChardonnay, 2023** — *Aroma:* melocotón blanco, piel de limón, hueso húmedo. *Palabra:* sin roble, ácido brillante, final salino. *Maridaje:* ostras, pollo asado, cualquier cosa a la parrilla.
- **Old Vine Zinfandel, 2020** — *Aroma:* frambuesa, pimienta negra, zarzas. *Palabra:* pleno y especiado sin calor, tanino suave. *Maridaje:* barbacoa, cordero, queso cheddar fuerte.
- **Rosa de Cabernet, 2024** — *Aroma:* fresa, naranja sanguina, pétalo de rosa. *Palabra:* seco, crujiente, ligeramente sabroso. *Maridaje:* ensaladas, embutidos, tardes calurosas.
- **Hillside Blend, 2019** — *Aroma:* cassis, hoja de tabaco, violeta. *Palabra:* estructurado y de apertura lenta, construido durante una década más. *Maridaje:* decantar una hora, luego cualquier cosa que valga la ocasión.
- **Late Harvest Chardonnay, 2022** — *Aroma:* albaricoque, panal, flor de naranjo. *Palabra:* dulce pero equilibrada por la acidez, no empalagosa. *Maridaje:* queso azul, tarta de frutas con hueso, solo.

### Visita
Eyebrow: `VISÍTANOS` — H2: `The Tasting Room`
- **Classic Flight** — $35 por persona · 45 minutos · Cinco tragos de lanzamiento actual en la barra. Se admiten visitas sin cita previa antes de las 3:00 p. m. 
- **Degustación sentado en finca**: $65 por persona · 90 minutos · Seis vinos con queso local y pan, en una mesa reservada en la terraza.
- **Caminata por viñedos y degustación de barriles**: $95 por persona · 2 horas · Camine por las cuadras con un enólogo y pruebe el barril. Solo los sábados, limitado a ocho invitados.
Horario: `Abierto todos los días de 11 a. m. a 5 p. m. · Última degustación sentada a las 4 p. m.`
 Nota: `Grupos de ocho o más, llámenos directamente al (707) 555-0142.`

### Vino Club
Eyebrow: `WINE CLUB` — H2: `The Stone Circle`

- **Trimestral** — 4 envíos al año · 3 botellas cada una · $105 por envío — Selección de enólogo cada temporada · 15% de descuento en todos los pedidos · Degustaciones de cortesía para dos · Primer acceso a los lanzamientos de la biblioteca
- **Medio estuche** — 4 envíos al año · 6 botellas cada una · $195 por envío — Elija tintos, blancos o mixtos · 20 % de descuento en todos los pedidos · Degustaciones de cortesía para cuatro · Invitación al día del barril de primavera
- **Coleccionista** — 2 envíos al año · 12 botellas cada una · $520 por envío —Incluye vinos de biblioteca y de lotes pequeños · 25% de descuento en todos los pedidos · Degustación privada una vez al año · Invitación al fin de semana de cosecha para dos

Nota: `Los miembros reciben degustaciones de cortesía para dos, durante todo el año. Omita o cancele cualquier envío antes de su envío.`

### The Estate
1. **La tierra**: cuarenta acres en una ladera de esquisto descompuesto orientada al oeste, plantados entre 1978 y 1994. El suelo fino y la falta de riego producen bayas pequeñas, colores intensos y rendimientos que pondrían nervioso a un contable.
2. **The Farming**: cultivo de secano y orgánico certificado desde 2006. Cultivamos cultivos de cobertura entre hileras, atravesamos ovejas en invierno y recolectamos a mano en las horas frescas antes del amanecer.
3. **The Cellar** — Fermentación nativa en hormigón y roble neutro. Manipulación mínima, sin clarificación, filtración ligera sólo cuando el vino lo pide. El sótano está a once grados todo el año sin ayuda.

### Diario
1. `Marzo de 2026` — **Por qué dejamos de regar y cuánto nos costó** — Tres años secos nos enseñaron más sobre esta ladera que los veinte anteriores.
2. `Noviembre de 2025` — **Notas de cosecha: la cosecha de 2025** — Un agosto fresco retrasó la recolección once días. Creemos que fue lo mejor que pudo haber pasado.
3. `Agosto de 2025` - **Una breve defensa del chardonnay sin madera** - El roble es un condimento, no un grupo de alimentos.

### Final CTA
H2: `Ven a probar con nosotros`
Sublínea: `La terraza está abierta todos los días, el perro es amigable y la última degustación se realiza en cuatro.`
CTA: `Reserve una degustación` · Teléfono: `(707) 555-0142`

### Footer
- BODEGA Y PIEDRA · `Finca cultivada, condado de Sonoma, desde 1978.`
- Dirección: `4180 Westside Road, Healdsburg, CA 95448`
- Etiqueta del boletín: `Notas antiguas, dos veces al año. Nada más.`
- © 2026 Cellar & Stone. Reservados todos los derechos. · `Por favor disfrute responsablemente.`

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-accordion": "^1.2.0",
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
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      colors: {
        'stone-bone': '#f8f5f0',
        'stone-burgundy': '#652034',
        'stone-vine': '#5a6b4f',
      },
    },
  },
};
```
