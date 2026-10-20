# Ninefold: Aviso del sitio web de Game Studio

## 1. Objetivo
Cree un sitio web seguro y sobrio para **Ninefold**, un estudio de juegos independiente de once personas. Casi negro, texto óseo, un acento en verde señal, un grotesco pesado y una firma: un pequeño carácter de píxel que camina a lo largo de una línea fina a lo largo de la página. Studio, no storefront.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin reproductor de video, sin incrustaciones de juegos. Los botones de la tienda son enlaces. `lucide-react` solo para el glifo de flecha.

## 3. Sistema de diseño
```css
:root {
  --paper: #ECE8E1;            /* bone, used as text on dark */
  --ink: #131417;              /* the default ground */
  --accent: #79C043;           /* signal green */
  --on-accent: #131417;
  --surface: #1C1E22;
  --muted: #8D9099;
  --line: rgba(236,232,225,0.15);
  --radius: 8px;
  --panel-radius: 24px;
}
```
Este sitio tiene luz oscura: `--ink` es el terreno y `--paper` es el texto. Ritmo: oscuro, oscuro, superficial, claro, oscuro, acento, pie de página oscuro. Una sección luminosa, deliberadamente, para el equipo.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
```
- **Display:** Archivo 900, mayúsculas, clamp(52px, 8vw, 132px), altura de línea 0,9, interlineado -0.04em
- **Cuerpo:** Inter 300, 16px, altura de línea 1.6
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas, espacio entre letras 0.06em. Fechas de lanzamiento, plataformas, recuentos de jugadores, etiquetas de índice.
: sin cursiva. Énfasis por una línea completa en verde señal.

## 5. Elemento característico
**Un caminante de píxeles.** Un personaje de 16 por 16 píxeles, dibujado como una cuadrícula de pequeños divs en hueso y verde, camina a lo largo de la línea del cabello que separa al héroe de la siguiente sección. Se mueve en pasos en lugar de suavemente, usando una animación CSS `steps()` tanto para el ciclo de caminata como para el viaje, por lo que se lee como un sprite y no como una interpolación. Cruza la pantalla una vez cada 40 segundos, de izquierda a derecha, y luego comienza de nuevo.

Sin lienzo, sin hoja de sprites, sin sonido. Un carácter, una línea, nada más.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 70 px, transparente sobre el héroe, marca denominativa a la izquierda, cuatro enlaces a la derecha en mono, pastilla verde con un círculo de flecha redondo. Sólido después de 80 píxeles de desplazamiento.
2. **Héroe, palabra distintiva**: el nombre del estudio colocado en todo el ancho a lo largo del borde inferior en Archivo 900, con una imagen artística clave a sangrado completo encima y una línea corta en la parte superior izquierda. Altura mínima `clamp(560px, 80vh, 860px)`. *Imagen: arte clave de mal humor de una figura solitaria en unpuente de cuerda sobre la niebla, pictórico, sin texto.*
3. **La línea de píxeles**: el caminante (sección 5) en la línea del cabello directamente debajo del héroe.
4. **Juegos, intercambio de índice**: oscuro. Tres títulos de juegos aparecen en tamaño grande a la izquierda. Al pasar el cursor sobre uno, se intercambia el arte clave a la derecha y una línea mono de plataformas y fecha de lanzamiento. *Imágenes: tres artes clave distintas, un puente de cuerda, una estación submarina, un pueblo nevado.*
5. **Actualmente haciendo declaración**: superficie. Un párrafo de 24 píxeles comenzando en un tercio, etiqueta "001/En desarrollo" en la columna de la izquierda y una línea mono con el año objetivo.
6. **El estudio, lista de créditos**: suelo de hueso claro, recuadro de 16 píxeles, `--panel-radius`. Once nombres en filas con roles a la derecha en texto monocromático oscuro sobre hueso. Al pasar el cursor sobre una fila se muestra un pequeño retrato cerca del cursor.
7. **Cómo trabajamos, filas numeradas**: oscuro. Cuatro filas en líneas finas: equipo pequeño, un juego a la vez, sin crisis, publicado por nosotros mismos.
8. **Prensa y premios, lista gobernada**: oscuro. Seis filas: publicación o festival, cita o premio, año en mono.
9. **Una cita**: oscuro. Una cita única centrada en Archivo 500 a 26px con una línea de firma en mono.
10. **Trabaja con nosotros, panel de acento**: fondo verde, texto oscuro, panel insertado. Una línea sobre los dos roles abiertos, dos acciones y una nota mono sobre dónde está el estudio.
11. **Pie de página**: oscuro. Marca denominativa gigante recortada "NINEFOLD", dirección, tres enlaces pequeños y el andador descansando al final de su línea.

## 7. Movimiento
: la marca denominativa Hero se eleva 24 px una vez, 1 s.
: el arte clave se asienta desde `scale 1.04` sobre 1.3s.
- Pixel walker se ejecuta continuamente en pasos, como se describe.
- El intercambio de índices fusiona el arte clave en 0.2s.
- El retrato de créditos sigue el cursor con un resorte suave.
- Facilita `cubic-bezier(.22,1,.36,1)`, respeta `prefers-reduced-motion` estacionando el andador en el extremo izquierdo.

## 8. Responsive
- **Móvil de menos de 768px:** la marca denominativa se reduce a dos líneas a 52px. El intercambio de índice pierde el arte de desplazamiento y muestra una pequeña miniatura por fila. La lista de créditos pierde el retrato del cursor. El caminante sigue caminando pero a media velocidad. Sin desplazamiento de página horizontal.
-**Tableta:** el intercambio de índice mantiene el arte en un tamaño reducido.
- **Escritorio:** contenido con ancho máximo de 1280 px, márgenes de 40 px, relleno de sección de 120 px.

## 9. Copia completa

**Marca denominativa:** NINEFOLD. Meta: `ONCE PERSONAS. BRISTOL. UN JUEGO A LA VEZ.`

**Nav:** Juegos, Estudio, Prensa, Trabajos. Botón: `Press kit`

**Hero**
- Línea superior izquierda: `Hacemos pequeños juegos sobre lugares difíciles.`
- Marca denominativa en la parte inferior: `NINEFOLD`

**Juegos** (etiqueta `000/ Juegos`)
- **CUERDA**: `Un juego de escalada sin combate y con un puente muy largo.` `PC, SWITCH, PS5. MARZO 2025.`
- **TIDEHOLD**: `Mantener una estación submarina mientras se inunda lentamente.` `PC, XBOX. NOVIEMBRE 2023.`
- **ÚLTIMO AUTOBÚS A VELKA**: `Un pueblo nevado, una noche, once conversaciones.` `PC. JUNIO DE 2022.`

**En desarrollo** (etiqueta `001/ En desarrollo`)
`Llevamos dos años en un juego sobre un farero que también es cartógrafo, y no vamos a decir mucho más que eso hasta que sea jugable. Tampoco tiene combate. Nuestro editor somos nosotros, por lo que la única fecha límite es aquella en la que se acaba el dinero, que actualmente es el otoño siguiente.`
Mono: `TARGET: 2028. PC FIRST.`

**El estudio** (etiqueta `002/ Eleven people`)
- `MAUD FERRIS` ... `Creative director`
- `TOBY ANAND` ... `Líder de estudio`
- `SOFIA KLEIN` ... `Ingeniero principal`
- `JONAH PRICE` ... `Motor y herramientas`
- `AMARA OBI` ... `Ingeniero de juego`
- `RUAIRI DOYLE` ... `Director de arte`
- `ELSA BERG` ... `Arte ambiental`
- `KIT NAKAMURA` ... `Arte de personajes`
- `PAVEL RUZICKA` ... `Animación`
- `NORA HALL` ... `Audio y música`
- `DANIEL OKE` ... `Producción`

**Cómo trabajamos** (etiqueta `003/ Principios`)
- **01 Once personas, y ese es el techo.** `Cada persona que agregamos hace que el juego sea más lento antes de mejorarlo.`
- **02 Un juego a la vez.** `Sin proyectos paralelos, sin trabajo por contrato, sin puertos manejados internamente.`
- **03 Sin crisis, y nos referimos a la versión aburrida.** `Semanas de treinta y cinco horas, con seguimiento. Dosla gente es a tiempo parcial y siempre lo será.`
- **04 Nos publicamos.** `Más lento, más pequeño y nadie nos pide que añadamos un pase de batalla.`

**Prensa y premios** (etiqueta `004/ Press`)
- **Eurogamer**: `Un juego que confía en que te aburras durante diez minutos.` `2025`
- **Edge**: `8 de 10.` `2025`
- **Juegos BAFTA**: `Propiedad original nominada.` `2024`
- **IGF**: `Mención de honor, excelencia en narrativa.` `2023`
- **Rock Paper Shotgun**: `Lo mejor que jugamos en todo noviembre.` `2023`
- **Desarrollador:Brighton**: `Estudio independiente del año, preseleccionado.` `2023`

**Cita:** `Enviaron un juego de escalada sin estado de falla y de alguna manera es lo más tenso del mercado. plataforma.`
Firma: `Edge, número 402`

**Trabaja con nosotros panel**
- Línea: `Dos roles abiertos: un ingeniero de juego y un artista ambiental.`
- Acciones: `Ver ambos roles`, `Haz una pregunta primero`
- Mono: `BRISTOL, TRES DÍAS EN EL ESTUDIO. NO TOTALMENTE REMOTO, LO SIENTO.`

**Pie de página**
`NINEFOLD`, `Unit 2, Jamaica Street, Bristol BS2 8JP`, `hello@ninefold.games`
Enlaces: `Juegos`, `Press kit`, `Jobs`

## 10. Never
Glassmorfismo, degradados, brillo, neón, tarjetas sombreadas, cuadrículas de iconos, emoji, avances de reproducción automática, sopa de estadísticas como "2 millones de jugadores", lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, idénticos stripes.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
