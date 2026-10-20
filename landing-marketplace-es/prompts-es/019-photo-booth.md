# Four Frames: Aviso del sitio web de Photo Booth

## 1. Objetivo
Cree un sitio web cálido, divertido pero a la vez editorial para **Four Frames**, una empresa de alquiler con tres fotomatones restaurados de los años 70. Fondo amarillo mantequilla, tinta casi negra, un acento rojo tomate, grandes titulares serif seguros y tiras de fotos reales con espacio. La diversión proviene del objeto en sí, no de los efectos.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin calendario de reservas. Los botones de consulta se vinculan al correo electrónico o al teléfono.

## 3. Sistema de diseño
```css
:root {
  --paper: #F2E2A0;              /* butter ground */
  --ink: #2A2618;                /* near black, text and dark ground */
  --accent: #D8472B;             /* tomato */
  --on-accent: #F2E2A0;
  --surface: #EAD794;            /* tinted ground */
  --muted: #6B6448;              /* secondary text */
  --line: rgba(42,38,24,0.15);   /* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro. Líneas finas y tintes, nunca cuadros con sombras.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Figtree:wght@300;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Display:** Fraunces 600, tamaño óptico 144, espacio entre letras -0,02em, altura de línea 0,98. Hero de 90 a 145 px, títulos de sección de 44 a 70 px.
- **Cuerpo:** Figtree 300, 16 px, altura de línea 1,55.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Solo para fechas, precios, duraciones de alquiler, etiquetas de índice.
- Una palabra en cursiva como máximo por título, en tomate.

## 5. Elemento de firma
**Una tira que se desarrolla.** Una tira fotográfica vertical de cuatro marcos con un borde blanco y un pequeño título mono al pie, inclinado 2 grados. Cuando aparece, los cuadros aparecen uno tras otro, con 400 ms de diferencia, cada uno de los cuales se desvanece del color del papel a la fotografía, de la misma manera que aparece una impresión en una bandeja. Sucede una vez.

La tira se usa dos veces como máximo: una en el héroe y otra en el panel de cierre. Nada más se anima cerca de él.

## 6. Secciones, cada una de ellas un esqueleto diferente

1. **Barra de navegación**: 74 px, mantequilla, una línea de cabello debajo. Marca denominativa a la izquierda, cuatro enlaces a la derecha, pastilla de tomate con un círculo de flecha redondo.
2. **Héroe, píldora en línea**: un título gigante de dos líneas con una pequeña fotografía redondeada colocada entre dos de las palabras, más la tira de revelado (sección 5) fijada a la derecha con una inclinación de 2 grados. Altura mínima `clamp(540px, 78vh, 820px)`. *Fotografía en línea: dos personas riéndose dentro de un fotomatón con cortinas y una cálida luz de flash.*
3. **Declaración**: luz. Un párrafo serif largocomenzando en un tercio, etiquete `001/ Las casetas` en la columna de la izquierda. Sin imagen.
4. **Los tres stands, lista de vistazo**: superficie. Tres grandes filas serif, una por stand, cada una con un año, un tipo de película y una capacidad en mono a la derecha. Al pasar el cursor sobre una fila, se muestra una pequeña tarjeta con fotografía junto al nombre. *Fotografías: un stand de cromo y esmalte, un stand con paneles de madera, un pequeño stand blanco, todo fotografiado de frente.*
5. **Panel de firma**: fondo de tinta oscura, recuadro de 16 píxeles, `--panel-radius`. Una pared de nueve tiras de fotografías en ligeros ángulos y un pie de foto monocromático. Uno de ellos se desarrolla como se describe.
6. **Lo que obtienes, hileras finas**: ligeras. Cinco filas de ancho completo separadas por líneas finas: asistente, tiras ilimitadas, libro de visitas, caja de accesorios, copias digitales. Cada uno con una frase corta. Sin iconos.
7. **Precios, tabla rayada**: claro. Tres duraciones de alquiler con lo incluido y el precio en mono, alineado a la derecha. Denso a propósito.
8. **Donde ha estado, rejilla suelta**: superficie. Seis fotografías en diferentes tamaños y desplazamientos verticales, subtituladas en mono con el lugar y el mes. *Fotografías: una boda en el ayuntamiento, una fiesta en un almacén, una tarde en un museo, una carpa en el jardín, una fiesta navideña en la oficina, un cumpleaños en un pub.*
9. **Una cita**: luz. Una cita única centrada en Fraunces a 36 px con una línea de firma en mono.
10. **Consulta, panel decorativo**: tomate molido, panel insertado. Una gran línea serif, dos acciones y la franja de desarrollo nuevamente, más pequeña, que se eleva desde el borde inferior.
11. **Pie de página**: tinta oscura. Marca denominativa gigante recortada "CUATRO MARCOS", área de cobertura, teléfono, cuatro enlaces pequeños.

## 7. Movimiento
- El título del héroe se desvanece 20 píxeles una vez, la fotografía en línea se asienta desde `scale 1.04`.
- La tira se desarrolla cuadro por cuadro, una vez por aparición.
- Las fotografías de la lista de vistas se funden en 0,25 s.
: las imágenes de cuadrícula sueltas se asientan desde `scale 1.03` en 1,1 s.
: pasa el cursor: las imágenes se amplían a 1,03, los círculos de flecha se deslizan 4 px.
: facilita `cubic-bezier(.22,1,.36,1)`. Respete `prefers-reduced-motion`.

## 8. Responsive
- **Móvil bajo 768px:** la tira del héroe se mueve debajo del título y se sienta recta, la fotografía en líneacae a su propia línea. Titular a 46px. La lista de vistazo pierde el cursor y muestra una miniatura en cada fila. La pared de franjas se convierte en tres franjas. Cuadrícula suelta en una columna, se eliminaron las compensaciones. No hay desplazamiento de página horizontal, aunque la pared de tiras puede desplazarse dentro de sí misma.
- **Tableta:** pared de tiras de seis tiras, cuadrícula suelta de dos columnas.
- **Escritorio:** ancho de contenido de 1200 px, canales de 40 px, relleno de sección de 110 a 130 px.

## 9. Completo copy

**Marca denominativa:** CUATRO MARCOS. Meta: `TRES STANDS RESTAURADOS. PELÍCULA DE VERDAD. YORKSHIRE Y EL NORTE.`

**Nav:** Los stands, lo que obtienes, precios, consulta. Botón: `Comprueba tu fecha`

**Héroe**
- Titular con la fotografía en línea entre `cuatro` y `minutos`: `Cuatro personas, cuatro *minutos*, cuatro fotogramas.`
- Frase: `Fotomatones químicos adecuados de los años setenta, restaurados y conducidos a tu boda, fiesta o lanzamiento. Película en blanco y negro, revelada al momento.`
- CTA: `Comprueba tu fecha`

**Declaración** (etiqueta `001/ Las cabinas`)
`Una cabina digital imprime una imagen. Una cabina de productos químicos fabrica uno, en una bandeja, en la oscuridad, mientras cuatro personas se quedan afuera discutiendo sobre quién parpadeó. La espera es el punto. Nuestras tres máquinas fueron construidas entre 1972 y 1979, y todavía usan el mismo papel con base plateada y los mismos cuatro destellos, con ocho segundos de diferencia. `

**Las tres cabinas** (etiqueta `002/ Las máquinas`)
- **Marlene.** `Esmalte cromado y crema, el obturador más ruidoso de los tres.` `1972. EN BLANCO Y NEGRO. CABE CUATRO.`
- **Sid.** `Los paneles de madera, de una estación de Leeds, todavía huelen ligeramente.` `1976. EN BLANCO Y NEGRO. CABE TRES.`
- **Punto.** `Escaleras pequeñas, blancas y fáciles de subir. El de espacios reducidos.` `1979. EN BLANCO Y NEGRO. SE ADAPTA A DOS.`

**Leyenda de la firma:** `Desnudos de un sábado de junio. Nadie mira a la cámara en el cuarto fotograma, nunca lo hacen.`

**Lo que obtienes** (etiqueta `003/ Incluido`)
- **Un asistente toda la noche.** `Uno de nosotros se queda en la cabina, carga la película y soluciona los atascos.`
- **Tiras ilimitadas.** `Cada grupo recibe una. Nadie cuenta.`
- **Un libro de visitas.** `Una segunda tirava en el libro con una nota al lado. Esto es lo que guardan las parejas.`
- **Una caja de accesorios.** `Sombreros, gafas y una peluca cuestionable. Se deja en la furgoneta si lo prefiere.`
- **Copias digitales.** `Cada tira escaneada a 1200 ppp y enviada en una semana.`

**Precios** (etiqueta `004/ Alquiler`)
- `Tres horas` ... `Asistente, tiras ilimitadas, copias digitales` ... `595 GBP`
- `Cuatro horas`... `Todo lo anterior, más el libro de visitas`... `695 GBP`
- `Toda la noche, seis horas`... `Todo, más una segunda caja de accesorios y recogida tardía`... `845 GBP`
Nota mono: `Los precios incluyen el viaje dentro de cincuenta millas de Leeds. Más allá de eso, 1 GBP por milla.`

**Dónde ha estado** (etiqueta `005/ Recientemente`)
Subtítulos: `Hepworth Wakefield, junio`, `Un granero cerca de Otley, agosto`, `Belgrave Music Hall, mayo`, `Un jardín en Ilkley, julio`, `Leeds Corn Exchange, diciembre`, `The Adelphi, Marzo`

**Cita:** `La cola para el stand era más larga que la cola para el bar, que mi suegro todavía trae.`
Firma: `Nadia y Tom, se casaron en agosto`

**Panel de consulta**
- Línea: `Díganos la fecha y el room.`
- Acciones: `Compruebe su fecha`, `Llame al 0113 555 0182`
- Mono: `TOMAMOS UNA RESERVA POR NOCHE POR STAND.`

**Pie de página**
`FOUR FRAMES`, `Con sede en Leeds, viajando por Yorkshire y el norte`, `hello@fourframes.co.uk`, `0113 555 0182`
Enlaces: `Las casetas`, `Precios`, `Bodas`, `Instagram`

## 10. Nunca
Glassmorfismo, degradados, brillo, neón, tarjetas con sombra, icono cuadrículas, emoji, animaciones de confeti, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, rayas idénticas.

## 11. Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
