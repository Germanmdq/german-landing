# Marginalia Books — Aviso del sitio web de una librería independiente

## 1. Declaración de objetivos
Crear un sitio web de librería independiente cálido y obstinado para **Marginalia Books**, definido por papel envejecido, tinta azul marino y una serifa tipo libro, construido en torno a recomendaciones y eventos del personal en lugar de pretender competir con un almacén en precio.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(40, 30%, 94%);      /* #f3eee3 aged paper */
  --foreground: hsl(220, 30%, 16%);     /* #1c2435 ink navy */
  --primary: hsl(352, 46%, 38%);        /* #8e3244 cloth-bound red */
  --primary-foreground: hsl(40, 30%, 96%);
  --muted-foreground: hsl(220, 8%, 44%);
  --border: hsl(38, 16%, 84%);
  --card: hsl(40, 32%, 90%);
  --accent-ink: hsl(220, 30%, 16%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
- **H1:** Libre Baskerville 400, clamp(34px, 4.2vw, 58px), altura de línea 1.18
- **H2:** Libre Baskerville 400, 28–40px
- **H3 / títulos de libros:** Libre Baskerville cursiva 400, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.8
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.2em, 11px, tela roja
- **Precios/fechas:** Inter 500, tabular-nums

## 5. Visual Efectos

**Efecto 1: el personal elige tarjetas con un hablante de estantería escrito a mano.** Cada recomendación es la portada de un libro junto a una tarjeta rotada con el estilo de un hablante de estantería de papel, con el nombre del miembro del personal y una nota de dos oraciones.

```jsx
<div className="relative flex gap-6">
  {/* Image: book cover standing upright on a wooden shelf, soft window light, shallow depth of field */}
  <img src="" alt="Staff pick book cover" className="h-56 w-36 object-cover object-center shadow-lg" />
  <div className="relative -rotate-1 self-start border border-[var(--border)] bg-white/70 p-5 shadow-sm">
    <p className="font-serif italic text-lg">Piranesi</p>
    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Picked by Rosa</p>
    <p className="mt-3 text-sm leading-relaxed">I have sold ninety copies of this and had one person come back unhappy. Those are good odds.</p>
  </div>
</div>
```

**Efecto 2: Encabezados de sección con un dibujo a mano subrayado.** Una ruta SVG en línea con un trazo ligeramente irregular se encuentra debajo de cada H2 y se dibuja usando `pathLength` de 0 a 1 en 0,9 s en la entrada de desplazamiento.

## 6. Desglose de componentes

1. **Barra de navegación**: 76 px, adhesivo, fondo de papel, borde inferior de 1 px. Marca denominativa Serif a la izquierda, centro de enlaces, icono de búsqueda y botón de contorno rojo "What's On" a la derecha.
2. **Héroe** — 78vh, dividido. Texto a la izquierda, interior de la tienda con sangrado completo a la derecha. Ceja, serif H1, sublínea, dos CTA. *Imagen: interior de librería independiente, estantes de madera del suelo al techo, luz cálida de una lámpara, una silla de lectura, acogedor y habitado.*
3. **Franja de apertura** — banda delgada con el horario de hoy, la dirección y una línea "Estamos a cinco minutos a pie de la estación".
4. **Elecciones del personal**: la sección principal. Cuatro tarjetas de recomendación (Efecto 1), cada una con un miembro del personal diferente.
5. **Buscar por sección** — Cuadrícula de 2x4 de mosaicos de categorías: ficción, no ficción, poesía, infantil,traducido, segunda mano, interés local, regalos.
6. **Eventos**: lista de cinco próximos eventos con un bloque de fecha, título, autor, precio de la entrada y un enlace de reserva.
7. **Club de lectura**: panel dividido en `--card`: título actual, fecha de la reunión, cómo unirse y los últimos seis meses de lecturas.
8. **Haz tu pedido con nosotros**: tres tarjetas: reserva y recoge, pide cualquier cosa impresa y una nota sobre por qué es importante comprar aquí, con un lenguaje de precios honesto.
9. **De segunda mano y raros**: una breve sección sobre lo que compran, con una consulta de valoración CTA.
10. **Boletín** — banda roja de tela, campo único, `Una carta breve cada segundo jueves.`
11. **Pie de página**: tinta azul marino, cuatro columnas, dirección, horario, redes sociales y una nota de accesibilidad.

## 7. Animaciones
- Hero: el texto se desvanece 0,75 s; la imagen se revela con un barrido `clipPath` desde la derecha, 1.1s
- Subrayado dibujado a mano: SVG `pathLength 0 → 1`, 0.9s, salida fácil
- Tarjetas de selección del personal: escalonar `i * 0.1`, `y: 26 → 0`; estante-hablador gira de `-3 grados → -1 grados` cuando ingresa 
- Mosaicos de categoría: el fondo se oscurece ligeramente y la etiqueta se desplaza 4 px justo al pasar el mouse, 0.25 s
- Filas de eventos: se desvanecen escalonadas 0.06 s
- Banda del boletín: el color se desvanece a medida que la sección entra a la vista, 0.7s

## 8. Responsive
- **Móvil (<768px):** hamburguesa; la imagen principal se acumula encima del texto; H1 se fija a 34px; las selecciones del personal se vuelven de 1 columna con la cubierta sobre el hablante de estantería; categorías 2-col; los eventos se apilan con el bloque de fecha en línea encima del título; pilas del club de lectura.
- **Tableta:** el personal elige 2 columnas, categorías 4 columnas, el héroe permanece dividido.
- **Escritorio:** ancho máximo 1160px, `px-16`, `py-20`.

## 9. Copia completa

**Marca:** LIBROS MARGINALIA · Est. 2011 · Sheffield

**Navbar:** Selecciones del personal · Explorar · Eventos · Club de lectura · Realizar pedidos · Visitar · [Botón] Novedades

**Hero**
- Ceja: `SHEFFIELD · INDEPENDIENTE DESDE 2011`
- H1: `Hemos leído la mayoría de estos. Pregúntenos.`
- Sublínea: `Una librería general con opiniones sólidas, en Sharrow Vale Road. Alrededor de nueve mil títulos, cuatro librerías y una política de nuncarecomendando algo que ninguno de nosotros ha terminado.`
- CTA: `Ver las selecciones de este mes` · `Qué hay en`

**Franja de apertura:** `Abierto hoy de 9:30 a 18:00 · 142 Sharrow Vale Road · A cinco minutos de la estación`

**Elecciones del personal** — Ceja `ESTE MES` — H2 `Cuatro libros que seguimos presionando a la gente`
1. **Piranesi** de Susanna Clarke - *Elegido por Rosa* - Vendí noventa copias de esto y una persona regresó infeliz. Esas son buenas probabilidades.
2. **The Overstory** de Richard Powers — *Elegido por Dev* — Seiscientas páginas sobre árboles, lo que suena como una amenaza y resulta ser la mejor novela que leí el año pasado.
3. **Pequeñas cosas como estas** de Claire Keegan — *Elegido por Marion* — Ciento dieciséis páginas. Lo leerás de una sentada y lo pensarás durante un mes.
4. **La liebre con ojos de ámbar** de Edmund de Waal — *Elegido por Rosa* — Una historia familiar contada a través de doscientas sesenta y cuatro pequeñas tallas japonesas. No debería funcionar. Absolutamente lo hace.

**Browse** — `Ficción` · `No ficción` · `Poesía` · `Infantil` · `Traducido` · `Segunda mano` · `Interés local` · `Regalos y tarjetas`

**Eventos** — Ceja `QUÉ HAY EN` — H2 `Eventos en el shop`
- `12 SEP` **Claire Keegan en conversación** — 19:00 · £8, canjeable por el libro
- `19 SEP` **Poesía micrófono abierto** — 19:30 · Gratis, regístrate en la puerta
- `26 SEP` **Hora de cuentos infantiles** — 10:30 · Gratis, edades 3–7
- `03 OCT` **Noche de ficción traducida** — 19:00 · £6, vino incluido
- `10 OCT` **Charla de historia local: las inundaciones de Sheffield** — 18:30 · £5

**Club de lectura** — H2 `Segundo martes, arriba, siete en punto`
`Somos de doce a dieciocho, no hay obligación de haberlo terminado y no se califica a nadie. Diez por ciento de descuento en el título si lo compras aquí.`
Leyendo actualmente: **Klara y el Sol** por Kazuo Ishiguro
Leído recientemente: `Confianza` · `Pequeñas cosas como estas` · `Demon Copperhead` · `The Bee Sting` · `Orbital` · `Lo suficientemente frío para la nieve`

**Ordene desde Nosotros**
1. **Reserva y recoge** — Dinos el título, lo guardaremos detrás del mostrador durante una semana. Sin pagopor adelantado.
2. **Podemos pedir cualquier cosa impresa**: generalmente aquí dentro de dos días hábiles. Mismo precio que pone en la portada.
3. **Para qué molestarse** — No somos más baratos que el almacén y no pretendemos serlo. En cambio, lo que obtienes son cuatro personas que leen, una tienda que organiza cincuenta eventos gratuitos al año y una calle principal con una librería. 

**Segunda mano y rara** — `Compramos ficción, poesía e historia local de segunda mano en buenas condiciones. Traiga una caja cualquier día laborable antes de las cuatro o envíe por correo electrónico fotografías de los lomos para colecciones más grandes.`

**Newsletter** — `Una carta breve cada segundo jueves.` — Lo que estamos leyendo, lo que llegará a la tienda y nada más.

**Pie de página** — MARGINALIA BOOKS · `142 Sharrow Vale Road, Sheffield S11 8ZH` · `0114 555 0177` · Lun–Sáb 9:30–18:00, Dom 11:00–16:00 · `Acceso sin escalones por la puerta lateral en Hickmott Road.` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
