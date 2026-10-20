# Offset Club — Mensaje del sitio web de la imprenta

## 1. Declaración de objetivos
Crear un sitio web llamativo y táctil para **Offset Club**, un estudio independiente de risografía y serigrafía: tinta rosa fluorescente y azul brillante sobre un fondo de papel color crema, titulares impresos con un registro incorrecto deliberado, textura de semitonos visible y la energía artesanal de una revista en lugar de una impresión corporativa. service.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin carga de archivos, sin calculadora de precios. Enlace de botones de cotización al correo electrónico.

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(44, 45%, 92%);       /* recycled cream paper */
  --foreground: hsl(230, 30%, 14%);      /* dark ink */
  --pink: hsl(330, 100%, 60%);           /* riso fluorescent pink */
  --blue: hsl(212, 100%, 45%);           /* riso medium blue */
  --yellow: hsl(52, 100%, 55%);          /* riso yellow, accents only */
  --primary: var(--pink);
  --primary-foreground: hsl(44, 45%, 96%);
  --muted-foreground: hsl(230, 12%, 38%);
  --border: hsl(230, 30%, 14%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
```
- **H1:** Archivo Negro, mayúscula, clamp(64px, 13vw, 210px), alto de línea 0.84, espacio entre letras -0.03em
- **H2:** Archivo Black, mayúsculas, clamp(40px, 6vw, 90px), alto de línea 0.88
- **Cuerpo:** Space Mono 400, 15px, alto de línea 1.7
- **Etiquetas y precios:** Space Mono 700, 12px, mayúsculas

## 5. Efectos visuales

**Efecto 1: Titulares mal registrados.** Cada H1 y H2 se renderiza dos veces, apilados: una capa rosa y una capa azul encima con `mix-blend-mode: multiplicar", desplazado entre 3 y 5 píxeles en ambos ejes, de modo que las áreas superpuestas impriman un color violeta intenso como un riso de dos colores real. Al pasar el cursor sobre el título, el desplazamiento se anima brevemente a 0 y viceversa.

```jsx
<h1 className="relative">
  <span className="block text-[var(--pink)]">PRINT LOUD</span>
  <span aria-hidden className="absolute inset-0 translate-x-[4px] translate-y-[3px] text-[var(--blue)] mix-blend-multiply">PRINT LOUD</span>
</h1>
```

**Efecto 2: medios tonos y granulado.** Una superposición fija de puntos de gradiente radial (`radial-gradient(hsla(230,30%,14%,0.08) 1px, transparent 1.2px)` con un tamaño de 5 píxeles) más un filtro de ruido SVG con un 6 % de opacidad, por lo que toda la página tiene un efecto impreso. textura.

**Efecto 3: imágenes duotono.** Todas las fotografías se convierten a un duotono rosa y azul con CSS: imagen configurada en `grayscale(1) contrast(1.2)` dentro de un envoltorio con un fondo azul y una superposición rosa usando `mix-blend-mode: lighten`. Al pasar el cursor, se elimina el efecto y se muestra la foto original.

## 6. Desglose de componentes

1. **Marquesina**: banda amarilla de 44 píxeles, texto en tinta oscura en negrita mono espacial, ofertas de desplazamiento.
2. **Barra de navegación**: 80 px, crema, marca denominativa a la izquierda en Archivo Black con un pequeño círculo rosa, enlaces en Space Mono, botón rosa "Obtener una cotización" con un borde de tinta de 2 px a la derecha.
3. **Héroe** — H1 gigante mal registrado (Efecto 1) en treslíneas que ocupan la mayor parte de la ventana gráfica, un breve párrafo mono en la parte inferior izquierda y una foto bitono ligeramente girada (Efecto 3) en la parte inferior derecha con una tira de cinta amarilla en el borde superior. *Imagen: impresora risográfica a mitad de impresión con carteles coloridos apilados al lado, entorno de estudio, vívido.*
4. **Lo que imprimimos**: una cuadrícula de 3 columnas de seis productos, cada una de las cuales es una tarjeta con bordes con una imagen bitono, el nombre del producto en Archivo Black, una línea de especificaciones mono y un precio "desde".
5. **Colores de tinta**: una fila de ocho muestras de tinta circulares con nombres debajo en mono (rosa, azul, amarillo, verde, naranja, morado, negro, dorado). Cada círculo escala 1,1 al pasar el mouse.
6. **Proceso**: cuatro pasos en un diseño en zigzag, cada uno con un gran número mal registrado y una copia breve.
7. **Trabajo reciente**: cuadrícula estilo mampostería de ocho imágenes impresas a diferentes alturas, cada una ligeramente rotada entre -2 y 2 grados, con el nombre del cliente en monocromo al pasar el mouse. *Resúmenes de imágenes: carteles risográficos coloridos, revistas, impresiones artísticas y carteles de conciertos colocados sobre una mesa, diseño gráfico atrevido, textura visible.*
8. **Talleres**: sección rosa con texto color crema, dos listados de talleres con fecha, duración, precio y un botón.
9. **Estudio**: diseño dividido: foto bitono a la izquierda, dirección, horario y un breve párrafo a la derecha.
10. **Pie de página**: fondo azul, texto color crema, una marca denominativa gigante mal registrada "OFFSET CLUB" que llena el ancho, enlaces debajo.

## 7. Animaciones
- Hero H1: las dos capas de tinta comienzan con una separación de 30 píxeles y se deslizan en su desplazamiento de 4 píxeles, 1,2 s, suaviza "[0,22, 1, 0,36, 1]", para que se vea como el registro de impresión
- Tarjetas y muestras: desvanecerse 20px, escalonar 0.06s, con una rotación aleatoria estableciéndose en 0
- Trabajo reciente: las imágenes aparecen con `y: -20 → 0` y se estabilizan en su rotación, escalonar 0.05s
- Colocar el cursor sobre duotono: transición de filtro 0.4s
- Marquesina: 35s lineal infinito

## 8. Responsive
- **Móvil (<768px):** H1 a 64px con desplazamiento reducido a 2px; la foto principal se mueve debajo del párrafo y no se gira; productos 1 columna; las muestras de tinta se convierten en una fila de desplazamiento horizontal; el proceso se convierte en una sola columna; obra reciente 2 columnas; el desplazamiento duotono se convierte en untoque alternar; la barra de navegación muestra una marca denominativa y un botón de menú rosa que abre una superposición color crema en pantalla completa con enlaces enormes.
- **Tableta:** productos 2 columnas; trabajo reciente 3 columnas.
- **Escritorio:** ancho máximo 1400px, `px-8`, espacio entre secciones `py-24`.

## 9. Copia completa

**Marquesina:** `Impresiones Riso a partir de 50 copias · Camisetas serigrafiadas a partir de 20 · Entrega gratuita en Glasgow · Papel reciclado de serie ·`

**Navbar:** Imprimir · Colores · Trabajo · Talleres · Estudio — Obtener una cotización

**Hero**
- H1: `IMPRESIÓN / RUIDOSO. / PRINT SMALL.`
- Apartado: `Offset Club es un estudio de risografía y serigrafía en Glasgow. Imprimimos revistas, carteles, impresiones artísticas y productos para artistas, bandas y marcas pequeñas, en tiradas de cincuenta a cinco mil.`

**Lo que imprimimos** — H2 `LO QUE IMPRIMIMOS`
1. **Zines**: `A5 o A6, grapados, hasta 48 páginas`: desde £2,10 cada uno
2. **Pósteres**: `A3 o A2, hasta cuatro colores`: desde £1,40 cada uno
3. **Impresiones de arte** — `Stock pesado de 300 g/m², ediciones numeradas` — desde £3,50 cada una
4. **Folletos** — `A6, doble cara, dos colores` — desde £0,22 cada uno
5. **Camisetas**: "Algodón orgánico serigrafiado, de uno a tres colores", desde £11 cada una
6. **Bolsas de mano** — `Lona pesada, uno o dos colores` — desde £6 cada una

**Colores de tinta** — H2 `OCHO TINTAS` · `Mezcla dos, tres o cuatro.` Muestras: Rosa flúor · Azul medio · Amarillo · Verde · Naranja · Púrpura · Negro · Oro metálico

**Proceso** — H2 `CÓMO OBRAS`
1. **Envíe sus archivos** — `PDF con cada color en su propia capa. ¿No estás seguro de cómo? Te ayudaremos.`
2. **Elija papel y tintas**: `Publicamos muestras gratuitas de papel y tinta si desea sentirlas primero.`
3. **Imprimimos una prueba**: `Una fotografía de la primera hoja que sale del tambor antes de ejecutar el lote.`
4. **Recogida o entrega** — `Generalmente cinco días hábiles desde la aprobación.`

**Trabajo reciente** — H2 `FRESH OFF THE DRUM` — pies de foto del cliente: `Cartel de la gira de Mogwai` · `Glasgow Zine Fest` · `Menús de Wild Oat Bakery` · `Impresión artística de Siobhan Reid` · `Tote de Barras Market` · `The Hug & Pint gig series` · `Leith Walk Cycling Club camisetas` · `Escupir yRevista Sawdust #7`

**Talleres** — H2 `APRENDE A RISO`
- **Introducción a Risograph** — `Sábado 10 de octubre · 10 a.m. – 4 p.m. · £85` — `Diseña e imprime tu propio póster A3 de dos colores. Todos los materiales incluidos.` — `Book`
- **Make a Zine in a Day** — `Domingo 25 de octubre · 11am – 5pm · £70` — `Escribe, diseña, imprime y encuaderna un zine de 16 páginas para llevar a casa.` — `Book`

**Studio** — H2 `VEN Y VER LAS MÁQUINAS` `Estamos en un arco ferroviario en el East End. Visítenos para hablar sobre un proyecto o para recoger muestras de papel.` · `Arch 14, 70 Bain Street, Glasgow G40 2LA` · `Martes – sábados de 10 a. m. a 6 p. m.` · `hello@offsetclub.co.uk`

**Pie de página** — OFFSET CLUB · Imprimir · Colores · Trabajo · Talleres · Estudio · Guía de archivos · Instagram · `Impreso en papel reciclado con base de soja tintas.` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
