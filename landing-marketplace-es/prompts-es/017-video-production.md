# Northline: Aviso del sitio web de producción de video

## 1. Objetivo
Cree un sitio web arquitectónico tranquilo para **Northline**, una empresa de producción de videos de cuatro personas en Manchester. Suelo de piedra, tinta cálida de carbón, un acento oliva, titulares grotescos en mayúsculas, una cuadrícula de columnas visible y marcos de su propia sala de trabajo. Debería verse como un portafolio bien hecho, no como un sitio de showreel.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin biblioteca de reproductores de video, sin showreel de reproducción automática. El trabajo se muestra como imágenes fijas y un enlace de reproducción abre la película en otro lugar.

## 3. Sistema de diseño
```css
:root {
  --paper: #E6E2DA;              /* stone ground */
  --ink: #2A2624;                /* warm charcoal */
  --accent: #6B6A33;             /* olive */
  --on-accent: #E6E2DA;
  --surface: #DCD8CF;            /* tinted ground */
  --muted: #6E6862;              /* secondary text */
  --line: rgba(42,38,36,0.15);   /* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, superficie, claro, oscuro, claro, acento, pie de página oscuro. Líneas finas y una tenue cuadrícula de columnas hacen la estructura.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700&family=DM+Sans:wght@300;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Archivo 700, mayúsculas, espacio entre letras -0,04em, altura de línea 0,92. Hero de 78 a 130 px, títulos de sección de 40 a 64 px.
- **Cuerpo:** DM Sans 300, 16 px, altura de línea 1,55.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Cliente, año, formato, tiempo de ejecución, etiquetas de índice como `002/Work`.
: sin cursiva. Énfasis mediante una línea establecida en oliva.

## 5. Elemento característico
**Una tira de película de cuatro fotografías.** Una tira horizontal con orificios de rueda dentada dibujados como pequeños rectángulos redondeados a lo largo de los bordes superior e inferior en el color de la tinta, que contiene cuatro fotogramas de una toma. Se asienta sobre una línea de base fina y, cuando entra a la vista, la tira se desliza 40 píxeles hacia la izquierda y se asienta, como si la hubieran atravesado a través de una puerta. Los fotogramas son fotografías fijas, nada suena. 

U Se usa una vez, en un panel insertado en el suelo oscuro, con un título mono que nombra la sesión. En un teléfono, se desplaza dentro de sí mismo.

## 6. Secciones, cada una con un esqueleto diferente

1. **Barra de navegación**: 72 px, piedra, una línea de cabello debajo. Marca denominativa a la izquierda, cuatro enlaces a la derecha en mono, un botón de pastilla verde oliva con un círculo de flecha redondo.
2. **Héroe, hoja suiza**: líneas de cuadrícula verticales tenues visibles en toda la sección, índice mono `000/Northline` en la columna de la izquierda, un título de tres líneas en mayúsculas que comienza en el primer tercio y un solofrase debajo. Ninguna fotografía de héroe. Altura mínima `clamp(520px, 74vh, 760px)`.
3. **Un marco, foto led**: superficie. Una imagen a sangrado completo, sin texto encima, con un título mono debajo que nombra al cliente y el año. *Imagen fija: fotograma de un director de fotografía de una fábrica, rayos de luz natural, un trabajador pequeño en una toma amplia.*
4. **Lo que hacemos, lista suiza**: ligero. Columna de etiqueta `001/ Qué hacemos`, cuatro nombres de servicios apilados de un tercio del ancho, cada uno con un rango de tiempo de ejecución y una banda de precios en mono a la derecha, y una línea de descripción.
5. **Obra, cuadrícula editorial suelta**: ligera. Seis proyectos en diferentes tamaños y desplazamientos verticales, cada uno con el cliente, el año y el tiempo de ejecución en mono debajo. Al pasar el cursor aparece una pequeña etiqueta verde oliva con el mensaje "Reloj". *Fotografías: una cervecería con poca luz, el pasillo de un hospital, una carretera de montaña desde un automóvil, un chef plateando, una turbina eólica desde abajo, un ensayo de baile.*
6. **Panel de tira de película**: carbón oscuro, recuadro de 16 píxeles, `--panel-radius`. El elemento de firma (sección 5) con un título mono.
7. **Cómo se hace una película, filas numeradas**: claro. Cinco filas en las líneas del cabello: un marcador de semana mono, un título en Archivo a 28 px, una oración. Sincero acerca de cuánto tiempo tardan las cosas.
8. **Nosotros cuatro, lista de créditos**: superficie. Cuatro nombres en grandes filas en mayúsculas con pequeños roles a la derecha. Al pasar el cursor sobre una fila, se crea un pequeño retrato que sigue al cursor. *Retratos: cuatro miembros de la tripulación fotografiados claramente contra una pared.*
9. **Una cita**: luz. Una cita única centrada en Archivo a 30px con una línea de firma en mono.
10. **Presupuestos, panel decorativo**: fondo de olivo, panel empotrado. Tres franjas de precios honestas con una línea cada una y dos acciones.
11. **Pie de página**: carbón oscuro. Marca denominativa gigante recortada `NORTHLINE`, dirección del estudio, teléfono, cuatro enlaces pequeños.

## 7. Movimiento
: las líneas de los titulares aumentan 22 píxeles con un desplazamiento de 0,08 s, una vez.
: las líneas de cuadrícula se desvanecen durante 0,8 s durante la carga y luego permanecen quietas.
- Las imágenes fijas se estabilizan desde `scale 1.03` a `1` en 1,1 s.
- La tira de película se desliza y se asienta una vez.
- Los retratos de créditos siguen el cursor con un resorte suave y se desvanecen en más de 0,2 s.
- Facilidad`cubic-bezier(.22,1,.36,1)`. Respete `prefers-reduced-motion`.

## 8. Responsive
- **Móvil bajo 768px:** líneas de cuadrícula ocultas, título a 44px desde el margen izquierdo. Trabaje la cuadrícula en una columna sin desplazamientos. La lista de créditos pierde el retrato del cursor y muestra una pequeña miniatura a la izquierda. La tira de película se desplaza dentro de sí misma. Sin desplazamiento de página horizontal.
- **Tableta:** cuadrícula de trabajo de dos columnas, líneas de cuadrícula visibles.
- **Escritorio:** ancho de contenido de 1200 px, márgenes de 40 px, relleno de sección de 110 a 130 px.

## 9. Copia completa

**Marca denominativa:** LÍNEA NORTE. Meta: `MANCHESTER. CUATRO PERSONAS. PELÍCULAS PARA GENTE QUE HACE COSAS.`

**Nav:** Trabajo, Qué hacemos, El equipo, Presupuestos. Botón: `Iniciar un proyecto`

**Hero** (index `000/ Northline`)
- Titular: `FILMAMOS / LA PARTE / NADIE VE.`
- Frase: `Fábricas, cocinas, laboratorios y las personas que hay en ellos. Cuatro de nosotros, una cámara la mayoría de los días y preferencia por la toma tranquila sobre la del dron.`

**Título del primer fotograma:** `Bolton, para Hartley Engineering. 2026.`

**Qué hacemos** (etiqueta `001/ Qué hacemos`)
- **Películas de marca.** `Una película que explica quién eres, hecha para durar tres años en lugar de tres semanas.` `2 A 4 MIN. 8 A 18K GBP`
- **Cortos documentales.** `Una persona, un lugar y una historia real. Por lo general, la gente del trabajo mira hasta el final.` `5 A 12 MIN. DE 12 A 30K GBP`
- **Películas de producto.** `Cerca, lenta y bien iluminada. Creado para un sitio web en lugar de un feed. `` 30 A 90 SEG. 4 A 9K GBP`
- **Cobertura de eventos.** `Una conferencia o un lanzamiento, cortado en tres días en lugar de tres semanas.` `2 A 5 MIN. 3 A 6K GBP`

**Trabajo** (etiqueta `002/ Trabajo`)
- **Hartley Engineering** `2026. 4 min.`
- **Pennine NHS Trust** `2026. 9 min.`
- **Ordnance Survey** `2025. 3 min.`
- **Primer Restaurante** `2025. 90 seg.`
- **Parque Eólico Scout Moor** `2025. 6 min.`
- **Compañía Camaleón** `2024. 5 min.`

**Título de la tira cinematográfica:** `Cuatro fotogramas del rodaje de Pennine. El tercero hizo el corte.`

**Cómo se hace una película** (etiqueta `003/ Proceso`)
- `SEMANA 1` **Venimos ymira.** `Un día en el lugar sin cámara, hablando con las personas que estarán en él.`
- `SEMANA 2` **Un tratamiento, por escrito.** `Dos páginas: qué es la película, quién habla y cuánto costará. Sin paneles de estado de ánimo.`
- `SEMANA 3` **Disparo.** `Por lo general, dos días. Trabajamos en torno a sus turnos y no al revés.`
- `SEMANA 5` **Primer corte.** `Una ronda de notas incluida, una segunda si la primera cambia la forma.`
- `SEMANA 7` **Entregado.** `Master, versión subtitulada, cultivos sociales y archivos sin formato si los desea.`

**Nosotros cuatro** (etiqueta `004/ Equipo`)
- `ROSA ELLIOTT` ... `Director`
- `SAM OKOYE` ... `Cinematógrafo`
- `HANNAH BRUCE` ... `Productor`
- `DAN FIELD` ... `Editor y color`

**Cita:** `Pasaron el primer día sin filmar, lo cual pensé que era una pérdida de dinero hasta que vi con qué regresaron.`
Firma: `Paul Hartley, Hartley Engineering`

**Panel de presupuestos** (etiqueta `005/ Presupuestos`)
- `Bajo 5.000 GBP`... `Un día de rodaje, una entrega, un montaje perfecto.`
- `5.000 a 15.000 GBP`... `La mayoría de películas de marca. Dos días, una calificación adecuada y una mezcla de sonido.`
- `Más de 15 000 GBP` ... `Trabajo documental, múltiples ubicaciones, música original.`
- Acciones: `Iniciar un proyecto`, `Ver una hoja de tarifas completa`

**Pie de página**
`NORTHLINE`, `Unit 4, Hope Mill, Pollard Street, Manchester M4 7JA`, `hello@northline.film`, `0161 555 0144`
Enlaces: `Trabajo`, `Presupuestos`, `Hoja de tarifas`, `Vimeo`

## 10. Never
Glassmorfismo, degradados, brillo, tarjetas con sombra, cuadrículas de íconos, emoji, videos de fondo con reproducción automática, sopa de estadísticas como "más de 200 películas entregadas", lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, rayas idénticas.

## 11. Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
