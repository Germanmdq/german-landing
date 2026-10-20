# Good Boy Supply — Aviso del sitio web de la tienda de mascotas

## 1. Declaración de objetivos
Crear un sitio web brillante y alegre para **Good Boy Supply Co.**, una tienda de mascotas independiente del vecindario: amarillo soleado y azul cobalto, tipografía redondeada y gruesa, insignias rotadas estilo pegatina, fotografías recortadas de mascotas y una energía lúdica que hace sonreír a las personas antes de haber leído un word.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes ni carrito. Los botones de productos son enlaces a la tienda.

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(48, 100%, 96%);      /* warm cream */
  --foreground: hsl(228, 40%, 14%);      /* ink navy */
  --primary: hsl(46, 100%, 58%);         /* sunny yellow */
  --primary-foreground: hsl(228, 40%, 14%);
  --blue: hsl(226, 80%, 52%);            /* cobalt */
  --pink: hsl(346, 88%, 72%);            /* bubblegum, sticker accents only */
  --muted-foreground: hsl(228, 12%, 40%);
  --border: hsl(228, 40%, 14%);          /* thick ink outlines */
}
```
Atodas las tarjetas y botones utilizan un **borde de tinta de 2px** y una sombra desplazada dura `4px 4px 0 var(--border)`. No hay sombras suaves en ninguna parte.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=Nunito:wght@400;600;800&display=swap" rel="stylesheet" />
```
- **H1:** Bricolage Grotesque 800, clamp(56px, 10vw, 150px), altura de línea 0.9, espacio entre letras -0.04em
- **H2:** Bricolage Grotesque 800, clamp(40px, 5vw, 72px), altura de línea 0.95
- **Cuerpo:** Nunito 400, 17px, altura de línea 1.6
- **Botones y etiquetas:** Nunito 800, 15px

## 5. Efectos visuales

**Efecto 1: Insignias adhesivas.** Insignias redondas y en forma de estrella giradas entre -12 y 12 grados, relleno rosa o azul con borde de tinta, colocadas superpuestas a los bordes de las imágenes y los encabezados. Se tambalean al pasar el mouse: `rotar: [r, r - 6, r + 6, r]` durante 0,5 s.

**Efecto 2: botones que se pueden presionar.** Cada botón tiene una sombra desplazada. Al pasar el mouse, mueve `translate(-2px, -2px)` y la sombra crece a `6px 6px 0`; al presionar se mueve `translate(4px, 4px)` y la sombra desaparece. Transiciones CSS puras, 120 ms.

**Efecto 3: bordes de sección ondulados.** Las secciones coloreadas comienzan y terminan con un borde ondulado SVG (una única ruta cúbica, ancho completo, 60 píxeles de alto) en lugar de una línea recta.

## 6. Desglose de componentes

1. **Barra de teletipo**: 40 px, fondo cobalto, texto color crema, un marco de ofertas en bucle.
2. **Barra de navegación**: 84 px, color crema, marca denominativa a la izquierda en Bricolage 800 con un ícono de hueso pequeño, enlaces en el centro, botón amarillo que se puede presionar "Visitar la tienda" hacia la derecha.
3. **Héroe**: fondo amarillo con borde inferior ondulado (Efecto 3). Izquierda: H1 en tres líneas, sublínea, dos botones. Derecha: una fotografía grande de una mascota en un marco redondeado de 32 píxeles con borde en tinta.con dos insignias adhesivas (Efecto 1) superpuestas en sus esquinas. *Imagen: feliz golden retriever inclinando la cabeza, fondo de estudio brillante, expresión alegre, colorido y nítido.*
4. **Compre por mascota**: cuatro tarjetas gruesas seguidas (perros, gatos, mascotas pequeñas, pájaros), cada una con un color diferente y relleno con una foto de mascota, nombre y número de artículos. Las tarjetas se levantan al pasar el mouse.
5. **Selecciones del personal**: una cuadrícula de productos de 4 columnas en color crema, cada tarjeta con borde en tinta, imagen del producto en un mosaico de color pálido, nombre, descripción breve, precio y una pequeña pegatina en una de ellas que dice "Favorito del personal".
6. **El autolavado**: sección de cobalto con bordes ondulados, diseño dividido: texto y precios a la izquierda, foto a la derecha con una pegatina "¡Sin ensuciar en casa!". *Imagen: pequeño perro desaliñado en una bañera para perros de acero inoxidable cubierto de burbujas, feliz y divertido, luz brillante.*
7. **Por qué local**: tres coloridos paneles redondeados, cada uno con un gran ícono sin emoji de Lucide, un título y dos líneas.
8. **Mascota del mes**: una divertida foto estilo polaroid girada -3 grados con una leyenda escrita a mano, junto a una historia corta.
9. **Reseñas**: tres tarjetas con forma de globo de diálogo con cola, que alternan rellenos amarillo, rosa y azul.
10. **Visítenos**: dirección, horario en una lista simple de dos columnas y una nota sobre los perros que son bienvenidos en el interior.
11. **Pie de página**: fondo azul marino en tinta, texto color crema, marca denominativa gigante "GOOD BOY" en amarillo en 18vw, enlaces debajo.

## 7. Animaciones
: aparecen palabras Hero H1: `scale 0.6 → 1`, `opacity 0 → 1`, resorte (rigidez 300, amortiguación 18), escalonamiento 0.08s
- Imagen principal: `rotar: -6 → 0`, `scale 0.9 → 1`, resorte
- Calcomanías: colocar en `y: -30 → 0`, `rotate` hasta su ángulo final, resorte, retraso 0.6s
- Tarjetas de tienda y tarjetas de productos: desvanecerse 24px con tambaleo de 0,07 s; hover `y: -6`
- Marco de teletipo: 30 s lineal infinito
- Botones: Efecto 2

## 8. Responsive
- **Móvil (<768px):** el héroe se acumula con texto primero y luego con imagen; H1 a 56 px; comprar por mascota se convierte en una cuadrícula de 2×2; las selecciones del personal se convierten en 2 columnas; pilas de autolavado; las pegatinas escalan al 75%; La barra de navegación muestra una marca denominativa y un botón de menú amarillo que abre una pantalla amarilla de pantalla completa.superposición con enlaces enormes.
- **Tableta:** el personal elige 3 columnas; comprar por mascota permanece 4 de ancho en un tamaño más pequeño.
- **Escritorio:** ancho máximo 1280px, `px-8`, espacio entre secciones `py-24`.

## 9. Copia completa

**Ticker:** `Entrega local gratuita a partir de £30 · Autolavado abierto los 7 días · Tarjeta de fidelidad: Décima bolsa de comida gratis · Perros bienvenidos en el interior ·`

**Navbar:** Perros · Gatos · Mascotas pequeñas · Autolavado · Acerca de — Visita la tienda

**Hero**
- H1: `Todo / para *bueno* / niños y niñas.`
- Sublínea: `Una tienda de mascotas independiente en Bristol con productos reales comida, juguetes resistentes y personas que realmente saben el nombre de tu perro.`
- Botones: `Compra online` · `Encuentra la tienda`
- Adhesivos: `Desde 2014` · `¡Golosinas en la caja!`

**Compra por mascota**
- **Perros** — 420 productos
- **Gatos** — 310 productos
- **Mascotas pequeñas** — 140 productos
- **Pájaros** — 85 productos

**Selecciones del personal** — H2 `Lo que compraríamos (y haríamos).`
1. **Tough Tug Rope** — "Algodón reciclado, sobrevive a los terriers". — £9
2. **Croquetas de salmón sin cereales** — `Hecho en Somerset, bolsa de 2 kg.` — £18
3. **Adelanto de Feather Wand** — "El que los gatos realmente persiguen". — £6
4. **Plomo de lona encerado** — `Clip de latón, dura años.` — £24

**El autolavado** — H2 `¿Perro fangoso? *Tenemos un baño para eso.*` `Tinas elevadas, agua tibia, champú para perros, toallas y secador de pelo. Tú lavas, nosotros limpiamos.` Precios: `Perro pequeño £10` · `Perro mediano £13` · `Perro grande £16` — Botón `Ver horarios de apertura`

**Por qué local**
- **Conocemos la comida** — `Nuestro equipo ha revisado todos los alimentos en nuestros estantes y te ayudaremos a cambiar lentamente.`
- **Entrega gratuita cerca** — `Bolsas pesadas entregadas gratis dentro de tres millas de la tienda.`
- **Lealtad que suma** — `Tu décima bolsa de comida corre por nuestra cuenta. Sin aplicación, solo una tarjeta con un sello.`

**Mascota del mes** — Pie de foto `Biscuit, 4, ladrón de calcetines profesional` — `Biscuit viene todos los sábados para masticarlo y armar un escándalo. Este mes nos ayudó a probar once juguetes nuevos y destruyó nueve de ellos. Los dos supervivientes ya están en las estanterías.`

**Reseñas**
-`"Recordaron la alergia de mi gato después de una visita. Servicio adecuado."` — *Sophie, Bedminster*
- `"El autolavado ha salvado mi baño y mi matrimonio."` — *Tom, Southville*
- `"Mi perro de aguas me arrastra hasta aquí. Probablemente las golosinas gratis."` — *Leah, Totterdown*

**Visítanos** — H2 `Ven a saludar. Trae al perro.` `Good Boy Supply Co., 88 North Street, Bristol BS3 1HJ` · `Lunes a sábado de 9 a. m. a 6 p. m.` · `Domingo de 10 a. m. a 4 p. m.` · `Los perros con correa siempre son bienvenidos adentro.`

**Pie de página** — GOOD BOY · Tienda · Autolavado · Entrega · Tarjeta de fidelidad · Acerca de · Contacto · Instagram · © 2026 Good Boy Supply Co.

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
