# Ember & Wick — Aviso del sitio web de la tienda de velas

## 1. Declaración de objetivos
Cree un sitio web oscuro y brillante para **Ember & Wick**, un fabricante de velas de lotes pequeños: un fondo cálido casi negro, una suave luz ámbar que sigue el cursor como una vela llevada a través de una habitación oscura, un elegante tipo serif y fotografías de productos que se sienten iluminados por una llama. solo.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes ni lógica de carrito. Los botones de producto son enlaces.

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(25, 20%, 6%);        /* warm near-black */
  --foreground: hsl(36, 38%, 88%);       /* candlelit cream */
  --primary: hsl(34, 88%, 58%);          /* flame amber */
  --primary-foreground: hsl(25, 20%, 6%);
  --muted-foreground: hsl(30, 12%, 58%);
  --border: hsl(28, 14%, 18%);
  --card: hsl(25, 18%, 10%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300&family=Manrope:wght@300;400;600&display=swap" rel="stylesheet" />
```
- **H1:** Fraunces 300, opsz 144, clamp(52px, 8vw, 120px), altura de línea 0,95, espacio entre letras -0,02em
- **H2:** Fraunces 300, clamp(36px, 4.5vw, 64px)
- **Acento en cursiva:** Fraunces 300 cursiva en `--primary`
- **Cuerpo:** Manrope 300, 16px, altura de línea 1.75
- **Etiquetas y precios:** Manrope 600, 11px, mayúsculas, espacio entre letras 0.18em

## 5. Efectos visuales

**Efecto 1: Cursor de luz de vela.** A Capa fija, eventos de puntero, ninguno que cubre la ventana gráfica con un degradado radial centrado en el cursor. El brillo se retrasa ligeramente respecto al puntero mediante un resorte. En los dispositivos táctiles, el brillo permanece fijo cerca de la parte superior central del héroe y parpadea lentamente.

```jsx
const x = useSpring(0, { stiffness: 60, damping: 20 });
const y = useSpring(0, { stiffness: 60, damping: 20 });
// on mousemove: x.set(e.clientX); y.set(e.clientY);
const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, hsla(34, 88%, 58%, 0.14), transparent 70%)`;
<motion.div style={{ background: bg }} className="pointer-events-none fixed inset-0 z-30" />
```

**Efecto 2: parpadeo.** El pequeño ícono de llama al lado de la marca denominativa y el brillo del héroe en dispositivos móviles usan un parpadeo sutil: fotogramas clave de opacidad `[1, 0.85, 0.95, 0.8, 1]` sobre 3 s, repitiendo, con un ligero retraso aleatorio.

**Efecto 3: Viñeta cálida en las imágenes.** Cada imagen de producto tiene una superposición de viñeta interior `radial-gradient(ellipse at center, transparent 40%, hsla(25, 20%, 6%, 0.7) 100%)` para que todas las fotografías se mezclen con la página oscura.

## 6. Desglose de componentes

1. **Barra de navegación**: 80 píxeles, transparente sobre el héroe, marca denominativa a la izquierda con un pequeño ícono de llama parpadeante (Efecto 2), enlaces en el centro, `Bolsa (0)` a la derecha. Se convierte en `--background` al 90% con desenfoque después de un desplazamiento de 80 píxeles.
2. **Héroe**: ventana gráfica completa. Centrado H1, sublínea, botón. Detrás del texto, una fotografía de una vela oscura con un fuerte degradado en la parte inferior. *Imagen: una sola vela de vidrio ámbar encendida sobre madera oscura, la llama es la única fuente de luz, sombras profundas, brillo cálido, temperamental.*
3. **Aromafamilias**: cuatro columnas separadas por bordes verticales finos: apellido en cursiva Fraunces, tres palabras y un recuento de velas.
4. **Bestsellers**: una cuadrícula de velas de 3 columnas en `--card` con viñeta (Efecto 3): imagen 4:5, nombre, línea de notas aromáticas, tiempo de combustión y precio.
5. **Hecho a mano** — sección dividida: imagen alta a la izquierda, texto a la derecha con tres pasos cortos numerados. *Imagen: manos vertiendo cera derretida de una jarra de acero en frascos de vidrio de color ámbar, luz tenue del taller, vapor visible.*
6. **Cita de aroma**: una enorme línea de Fraunces en cursiva centrada en la página con mucho espacio a su alrededor.
7. **Juegos de regalo**: dos tarjetas anchas horizontales una al lado de la otra, cada una con imagen, nombre del juego, contenido y precio.
8. **Cuidado de las velas**: una lista sencilla de 4 filas con un número, un título y una frase. Separados por fronteras.
9. **Taller**: un panel que describe la velada mensual de fabricación de velas, con fecha, precio y un enlace "Reserve un lugar".
10. **Pie de página**: tres columnas, línea de boletín con una entrada de correo electrónico y una cursiva gigante "Ember & Wick" en la parte inferior a 14vw en crema con una opacidad del 6%.

## 7. Animaciones
- Hero H1: desvanecimiento y desenfoque, `filter: blur(12px) → blur(0)`, `opacity 0 → 1`, 1.4s, facilidad out
- Sublínea y botón: iguales, retrasos 0.4s y 0.6s
- Tarjetas de producto: desvanecimiento 20px, escalonamiento 0.1s
- Imagen del producto al pasar el cursor: escala 1.05 sobre 1s y la viñeta se aclara ligeramente
- Cita de aroma: las letras se desvanecen con 0.02s se tambalean cuando la sección ingresa a la vista
- Cursor a la luz de las velas: Efecto 1, siempre en ejecución

## 8. Responsive
- **Móvil (<768px):** el brillo del cursor reemplazado por un brillo fijo y parpadeante en la parte superior del héroe; H1 a 52 px; las familias de aromas se convierten en una cuadrícula de 2×2; los más vendidos se muestran como una fila de desplazamiento rápido horizontal con un ancho del 80 % por tarjeta; imagen de pilas hechas a mano primero; pila de juegos de regalo; la barra de navegación muestra una marca denominativa y un ícono de menú que abre una superposición oscura en pantalla completa.
- **Tableta:** los más vendidos 2 columnas; las familias de aromas permanecen en 4 columnas con letras más pequeñas.
- **Escritorio:** ancho máximo 1320px, `px-8`, espacio entre secciones `py-32`.

## 9. Copia completa

**Marca:** EMBER & WICK ·Vertido a mano en Edimburgo

**Navbar:** Velas · Juegos de regalo · Taller · Nuestra historia — Bolsa (0)

**Hero**
- Etiqueta: `VELAS DE SOJA EN LOTES PEQUEÑOS`
- H1: `Enciende algo *más lento*.`
- Sublínea: `Cera de soja vertida a mano, mechas de algodón y aromas construidos como perfumes. Cada vela arde durante al menos cincuenta horas.`
- Botón: `Comprar velas`

**Familias de aromas**
- ***Maderas*** — `Cedro, humo, vetiver` — 5 velas
- ***Florales*** — `Hoja de parra, rosa, neroli` — 4 velas
- ***Cocina*** — `Tomate, albahaca, pimienta negra` — 3 velas
- ***Estacional*** — `Pino, clavo, cáscara de naranja` — 4 velas

**Bestsellers** — H2 `Los que la gente *reordena*.`
1. **Ambos** — `Humo de turba · alquitrán de abedul · musgo de roble` — 55 horas — £34
2. **Fig Terrace** — `Hoja de parra · piedra caliente · té blanco` — 55 horas — £34
3. **Biblioteca** — `Papel viejo · madera de cedro · tonka` — 55 horas — £34
4. **Leith Harbour** — `Sal marina · madera flotante · salvia` — 55 horas — £34
5. **Invernadero** — `Tomate vid · albahaca · tierra húmeda` — 55 horas — £34
6. **Pendio invierno** — `Aguja de pino · clavo · naranja sanguina` — 55 horas — £36

**Hecho a mano** — H2 `Vertido en lotes de *cuarenta*.`
1. `Nosotros mismos mezclamos cada fragancia con aceites de perfumista, nunca con aromas de velas ya preparados.`
2. `La cera se vierte exactamente a 62 grados y se deja curar durante dos semanas completas antes de enviarse.`
3. `Cada vela de cada lote se quema durante una prueba y se etiqueta con el número de lote y la fecha.`

**Cita de aroma:** `*Una vela es una pequeña forma de decidir cómo debe sentirse una habitación.*`

**Juegos de regalo**
- **The Evening Set** — `Ambos y Biblioteca en frascos de 200 g, con un cortapechas de latón.` — £72
- **The Trio** — `Tres velas de viaje de 90 g de tu elección, en una caja forrada de lino.` — £45

**Cuidado de las velas** — Etiqueta `QUÉDALO BIEN`
1. **Primera quema** — `Deje que la cera se derrita hasta el borde, generalmente de dos a tres horas, para que nunca forme túneles.`
2. **Recorta la mecha** — `Córtala a 5 mm antes de cada combustión para obtener una llama limpia y constante.`
3. **Cuatro horascomo mucho** — `Después de eso la mecha se hincha y el vaso se calienta demasiado.`
4. **Mantenga la tapa** — `Vuelva a colocarla una vez que se enfríe para mantener el aroma fuerte.`

**Taller** — H2 `Haga el suyo propio, *a la luz de las velas*.` `Una vez al mes en nuestro taller de Leith. Mezcla un aroma, vierte dos velas y llévalas a casa. Vino y pasteles de avena incluidos.` — `Próxima fecha: jueves 8 de octubre, 19:00 h · £55 · 10 plazas` — `Reserva una plaza`

**Pie de página** — Velas · Sets de regalo · Taller · Venta al por mayor · Entrega · Guía de cuidados · Contacto · `Un correo electrónico al mes, sobre nuevos aromas.` Introduce `Tu correo electrónico` · `Ember & Wick, 22 Coburg Street, Leith, Edimburgo EH6 6ET` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
