# Tape Room: Sitio web del estudio de grabación Prompt

## 1. Objetivo
Cree un sitio web editorial, tranquilo y premium para **Tape Room**, un estudio de grabación analógico de dos salas en Glasgow. Debería leerse como la portada de un disco bien ambientada: casi fondo negro, cálido acento dorado, enormes titulares serif contra un texto pequeño y tranquilo, fotografías reales de la sala en vivo con espacio. Restricción de los efectos. Una idea sólida por sección.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes. `lucide-react` solo para los dos glifos de flecha en los botones. Sin cuadrículas de íconos, ni conjuntos de íconos decorativos.

## 3. Sistema de diseño

Tokens, y nada fuera de ellos:
```css
:root {
  --paper: #EEE8DD;              /* light ground */
  --ink: #151412;                /* dark ground and text */
  --accent: #C9A26B;             /* gold, the only accent */
  --on-accent: #151412;
  --surface: #1D1B18;            /* tinted dark ground */
  --muted: #9A928477;            /* secondary text, 62% mix */
  --line: rgba(238,232,221,0.15);/* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Este sitio tiene luz LED oscura: `--ink` es el terreno predeterminado y `--paper` es el texto. Las secciones se alternan en este ritmo: oscuro, oscuro, superficie, papel, oscuro, acento, pie de página oscuro.

Estructura con líneas finas y tintes de 1px. Sin sombras, sin tarjetas encuadradas, sin degradados.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Gloock&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Gloock 400, espacio entre letras -0,02 em, altura de línea 0,98. Hero de 96 a 150 px, títulos de sección de 48 a 76 px.
- **Cuerpo:** Inter 300, 16 px, altura de línea 1,55, color apagado para el texto secundario.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Se usa solo para hechos reales: tamaños de habitaciones, tarifas por día, años, etiquetas de índice como `002/ Rooms`.
- Una palabra con acento en cursiva como máximo por título, escrita en dorado y solo en aproximadamente la mitad de los titulares.

## 5. Elemento de firma
**Dos carretes de cinta, dibujados en SVG, girando lentamente.** Un dibujo de un solo trazo en dorado sobre el fondo oscuro: dos círculos con una cruz de huso en cada uno, unidos por una cinta delgada que se sumerge entre ellos. Ambos carretes giran a 6 segundos por vuelta, el de la izquierda en el sentido de las agujas del reloj y el de la derecha en el sentido contrario a las agujas del reloj. Al pasar el mouse, la rotación se acelera hasta 3 segundos y la trayectoria de la cinta se aprieta muy ligeramente. Aparece una vez, en un panel insertado, y nada más en la página compite con él.

Ancho de trazo 1,5 px, sin relleno, sin brillo, sin sombra. Respeta `prefers-reduced-motion` mostrándolo fijo.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 76px,transparente sobre el héroe. Marca denominativa a la izquierda, cuatro enlaces a la derecha en mono, un botón de pastilla dorado con un círculo de flecha redondo separado. Se convierte en tinta sólida después de 80 píxeles de desplazamiento.
2. **Héroe, título de la película**: fotografía a sangre completa de la sala en vivo con una tela oscura en el tercio inferior. El título se encuentra en la parte inferior izquierda, como el título de una película. Una frase y la CTA de la píldora en la parte inferior derecha. Altura mínima `clamp(560px, 82vh, 860px)`, nunca `100vh`. *Fotografía: una gran sala en vivo con paneles de madera, un piano de cola y micrófonos de cinta antiguos, una cálida luz de lámpara, sin gente.*
3. **Declaración**: papel molido. Un párrafo largo con serifa que comienza en un tercio del ancho, con la etiqueta mono "001/ The room" en la columna de la izquierda. Sin imagen.
4. **Habitaciones, lista suiza**: oscuras. La columna de la etiqueta a la izquierda dice "002/Habitaciones", luego dos enormes nombres de habitaciones apiladas de un tercio del ancho, cada una con una pequeña descripción y una tarifa diaria a la derecha. Al pasar el cursor sobre una fila, se muestra una pequeña fotografía junto al nombre.
5. **Panel de firma**: superficie rectificada, inserto a 16 píxeles de los bordes de la página, `--panel-radius`. Las bobinas de cinta (sección 5) están centradas, con un título estilo museo debajo en mono.
6. **El escritorio, foto dirigida**: fotografía a sangre completa, sin bloque de titular. Pequeño título abajo a la izquierda en mono. *Fotografía: una consola de mezclas analógica antigua con atenuadores y medidores VU, poca profundidad de campo, luz cálida de tungsteno.*
7. **Engranaje, índice**: oscuro. Un índice rayado en tres columnas: micrófonos, fueraborda, instrumentos. Filas de texto sin formato en líneas finas, mono para números de modelo. Denso a propósito.
8. **Sesiones, cuadrícula suelta**: superficie. Cuatro discos realizados aquí en diferentes desplazamientos verticales, cada uno con portada, artista, año y formato en mono. Uno tiene una pequeña insignia con un punto dorado que dice "Nuevo".
9. **Una cita**: fondo de papel, una cita única centrada en Gloock a 40 px, línea de firma debajo en mono. Sin fotografía, sin carrusel.
10. **Tasas, filas finas**: oscuro. Cuatro filas de ancho completo separadas por líneas finas: tasa diurna, nocturna, mezcla, masterización. Precio alineado a la derecha en mono.
11. **CTA de reserva, panel insertado**: fondo de acento, panel insertado, línea serif grande, dos acciones y una línea mono sobre la siguientesemana gratis.
12. **Pie de página**: tinta. Una marca denominativa gigante recortada "TAPE ROOM" en todo el ancho, dirección, horario de apertura con el día de hoy resaltado y cuatro enlaces pequeños.

## 7. Movimiento
Un movimiento decidido por sección, nada más. Duraciones de 0,6 a 1,2 s, facilidad `cubic-bezier(.22,1,.36,1)`.
: el título destacado se desvanece 20 px una vez.
: las fotografías se sitúan desde `scale 1.03` a "1" en 1,1 s cuando entran en la vista.
: filas de habitaciones: la fotografía flotante se desvanece. 0,25 s.
- Los carretes de cinta giran continuamente como se describe.
- Los estados de desplazamiento son rápidos y silenciosos: el círculo de flecha se desliza 4px, los enlaces se subrayan desde la izquierda.
- Sin marquesinas, sin paralaje, sin desplazamiento, sin rebote.

## 8. Responsive
- **Móvil de menos de 768px:** la altura mínima del héroe cae a `clamp(460px, 70vh, 620px)` y la oración se mueve debajo del título. Las filas de habitaciones pierden la fotografía flotante y en su lugar muestran una pequeña miniatura a la izquierda. El índice de marcha se convierte en una columna. La cuadrícula suelta se acumula sin las compensaciones. Nav mantiene la marca denominativa y la CTA, otros enlaces se mueven detrás de un botón de texto "Menú". No hay desplazamiento de página horizontal en ninguna parte. La fila de sesiones puede desplazarse dentro de sí misma.
- **Tableta:** cuadrícula de sesiones de dos columnas, índice de engranaje de dos columnas.
- **Escritorio:** ancho de contenido de 1200 px, márgenes laterales de 40 px, relleno de sección de 120 a 140 px.

## 9. Completo copy

**Marca denominativa:** SALA DE CINTAS. Metalínea: `GLASGOW. DOS HABITACIONES. ANALÓGICO Y OTRO.`

**Nav:** Habitaciones, Equipo, Sesiones, Tarifas. Botón: `Verificar una fecha`

**Héroe**
- Titular: `La cinta todavía se oye *de manera diferente*.`
- Frase: `Un estudio de dos habitaciones en el extremo este de Glasgow, construido alrededor de un escritorio de 1974 y una sala de estar con un techo adecuado.`
- CTA: `Verificar una date`

**Declaración** (etiqueta `001/ The room`)
`La sala de conciertos antes que nada era una sala de embotellado, por lo que el techo mide nueve metros y una trampa suena como aquí. Mantuvimos el ladrillo, agregamos un piso flotante y dejamos el resto en paz. La mayor parte de lo que llega se sigue en vivo, cuatro o cinco de ustedes en el mismo espacio, mirándose unos a otros. Es una forma más lenta de hacer un disco.y tiende a sonar como personas más que como archivos.`

**Rooms** (etiqueta `002/ Rooms`)
- **The Hall.** `Techo de nueve metros, piso de roble flotado, asientos para nueve personas. Lo mejor para baterías, cuerdas y cualquier cosa que necesite aire.` `450 GBP por día`
- **The Booth.** `Pequeño, muerto y cómodo. Voces, sobregrabaciones, trabajo de voz y podcasts.` `180 GBP por día`

** Pie de foto:** `Studer A80, media pulgada, treinta pulgadas por segundo. Todavía en funcionamiento.`

**Título del escritorio:** `El escritorio de 1974, recapitulado dos veces, nunca reemplazado.`

**Gear** (etiqueta `003/ Gear`)
- Micrófonos: `Neumann U87 (2)`, `Coles 4038 (2)`, `AKG C414 (4)`, `Shure SM7B`, `Beyerdynamic M160`
- Fueraborda: `Urei 1176 (2)`, `Teletronix LA-2A`, `EMT 140 plate`, `Roland RE-201`, `Pultec EQP-1A`
- Instrumentos: `1963 Steinway B`, `Ludwig Classic Maple`, `Hammond A100 con Leslie 122`, `Fender Deluxe Reverb`, `Wurlitzer 200A`

**Sessions** (etiqueta `004/ Made here`)
- **Aoife Shand, Long Water.** `2026. Vinilo y digital.` Chapa `Nueva`
- **The Quiet Orders, Second House.** `2025. Vinilo.`
- **Baltic Street Choir, Evensong.** `2025. Digital.`
- **Rab Ferrier, Notas sobre una inundación.** `2024. Cassette y digital.`
*Arte de portada: diseños de portada de disco abstractos y sobrios, colores apagados, sin texto.*

**Cita:** `Vinimos por dos días y nos quedamos cinco. Nadie miró una vez una pantalla mientras jugábamos.`
Firma: `Aoife Shand, Long Water`

**Rates** (etiqueta `005/ Rates`)
- `The Hall, diez horas con el ingeniero`... `450 GBP`
- `The Booth, diez horas con el ingeniero`... `180 GBP`
- `Mezcla, por canción`... `320 GBP`
- `Masterización asistida, por canción`... `140 GBP`
Nota en mono: `Los precios incluyen el ingeniero, la grabadora y el té. El stock de cinta se cobra al costo.`

**Panel de reservas**
- Línea: `Trae cuatro personas y un martes.`
- Acciones: `Consultar una fecha`, `Preguntar sobre una reserva en bloque`
- Línea mono: `Próxima semana gratis: 12 Octubre.`

**Pie de página**
`TAPE ROOM`, `14 Bain Street, Glasgow G40 2JZ`,`book@taperoom.studio`, `0141 555 0148`
Horario: `Lunes a Sábado, 10:00 hasta tarde. Domingo por acuerdo.` Hoy está resaltado.
Enlaces: `Habitaciones`, `Tarifas`, `Sesiones`, `Instagram`

## 10. Nunca
Glassmorfismo, degradados, brillo, neón en la oscuridad, tarjetas con sombra, cuadrículas de íconos, emoji, sopa de estadísticas como "más de 500 artistas felices", lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, cada sección tiene la misma franja de ancho completo.

## 11. Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
