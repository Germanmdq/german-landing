# Clearpane: Aviso del sitio web de Auto Glass

## 1. Objetivo
Cree un sitio web tranquilo y preciso para **Clearpane**, un servicio móvil de reparación y reemplazo de parabrisas. Fondo pálido y frío, tinta pizarra profunda, un solo acento verde azulado, una pantalla grotesca y un dibujo característico: un chip que se expande en una grieta y luego se repara a sí mismo. Tranquilizador en lugar de grito, porque el visitante acaba de encontrar una grieta en su parabrisas.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin motor de reservas, sin búsqueda de registros. Las acciones son un enlace telefónico y un enlace de correo electrónico.

## 3. Sistema de diseño
```css
:root {
  --paper: #EEF2F3;              /* cool pale ground */
  --ink: #17242B;                /* deep slate, text and dark ground */
  --accent: #0F6E86;             /* teal */
  --on-accent: #FFFFFF;
  --surface: #E3E9EB;            /* tinted ground */
  --muted: #5B6B72;              /* secondary text */
  --line: rgba(23,36,43,0.15);   /* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro. Líneas finas y tintes, sin cuadros, sin sombras.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Schibsted Grotesk 700, espacio entre letras -0,035em, altura de línea 0,96. Hero de 76 a 124 px, títulos de sección de 40 a 62 px.
- **Cuerpo:** Inter 300, 16 px, altura de línea 1,55.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Horarios, precios, tamaños de chips, etiquetas de índice.
- Sin cursiva. Énfasis por una línea establecida en verde azulado.

## 5. Elemento característico
**Una grieta que se repara sola.** Un dibujo SVG de un chip de parabrisas: una pequeña estrella central con cuatro líneas ramificadas que se extienden hacia afuera, todo en un trazo de 1,5 px. Cuando entra a la vista, la grieta se aleja desde el centro durante 1,4 segundos usando `pathLength`. Se mantiene durante un segundo, luego retrocede en más de 0,8 segundos mientras el trazo cambia de pizarra a verde azulado, dejando solo la pequeña estrella. Ese es el servicio completo, mostrado una vez, sin una palabra.

Sin brillo, sin relleno, sin repetición. Bajo `prefers-reduced-motion` se muestra el estado reparado.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 72 px, pálida, una línea de cabello debajo. Marca denominativa a la izquierda, cuatro enlaces a la derecha, botón de pastilla verde azulado con un círculo de flecha redondo y una línea monocromática que indica la disponibilidad actual.
2. **Héroe, retrato dividido**: un título grotesco de tres líneas a la izquierda sobre una línea fina, con una fotografía alta sangrando en el borde derecho. Debajo del titular, unosentencia y dos acciones. Altura mínima `clamp(520px, 76vh, 780px)`. *Fotografía: un técnico con uniforme limpio trabajando en el parabrisas de un automóvil en un camino de entrada, luz del día nublado, sin marca.*
3. **Chip o grieta, declaración**: ligero. Un párrafo largo de 26 píxeles en la pantalla que comienza en un tercio, con la etiqueta "001/ ¿Cuál es?" en la columna de la izquierda. Explica claramente cuándo se puede llenar un chip y cuándo se debe tirar el vaso.
4. **La reparación, panel de firma**: pizarra oscura, recuadro 16px, `--panel-radius`. Grieta autorreparable (sección 5), centrada, con monotítulo.
5. **Lo que cuesta, tabla rayada**: superficie. Cuatro filas en líneas finas: servicio, cuánto tiempo lleva, cuánto cuesta, si el seguro suele cubrirlo. Precios en mono, alineados a la derecha.
6. **Cómo funciona la visita, filas numeradas**: claro. Cuatro filas en líneas finas con marcadores de tiempo mono: llamada, ventana de llegada, el trabajo en sí, el tiempo de curación antes de conducir.
7. **En qué trabajamos, índice**: ligero. Dos columnas rayadas: tipos de vidrio a la izquierda, extras a la derecha, cada una de ellas una fila fina y sencilla. Incluye los modernos que preocupan a la gente, como pantallas térmicas y recalibración de cámaras.
8. **Donde llegamos a ti, listado de áreas**: superficie. Las ciudades se configuran como filas de texto sin formato en líneas finas con un tiempo de viaje mono al lado de cada una. Sin mapa.
9. **Una cita**: luz. Una cita única centrada en Schibsted Grotesk a 30 px con una línea de firma en mono.
10. **Llamada, panel decorativo**: fondo verde azulado, panel empotrado. Una línea corta, el número de teléfono configurado en grande y una línea mono con franjas horarias para el mismo día.
11. **Pie de página**: pizarra oscura. Marca denominativa gigante recortada `CLEARPANE`, registro de empresa, aprobaciones de seguros, cuatro enlaces pequeños.

## 7. Movimiento
: las líneas de los titulares aumentan 20 píxeles con un escalonamiento de 0,08 s, una vez.
: la fotografía se sitúa desde `scale 1.03` hasta `1` 1.1s.
: la grieta se dibuja y repara una vez, como se describe.
: las filas de la tabla se desvanecen con un escalonamiento de 0,04 s.
: pasa el cursor: los círculos de flecha se deslizan 4 px, las filas aclaran la línea del cabello.
: facilita `cubic-bezier(.22,1,.36,1)`. Respete `prefers-reduced-motion`.

## 8. Responsive
- **Móvil de menos de 768px:** se corrigió una barra de llamada verde azuladohasta la parte inferior de la pantalla, con un relleno que agrega `env(safe-area-inset-bottom)`. La fotografía principal se mueve sobre el título a 40vh, el título a 42px. La tabla de costos se apila en filas con el precio en la misma línea que el servicio. Sin desplazamiento de página horizontal.
- **Tableta:** el héroe permanece dividido, índice de dos columnas.
- **Escritorio:** Ancho de contenido de 1200 px, márgenes de 40 px, relleno de sección de 110 a 130 px.

## 9. Copia completa

**Marca denominativa:** PANEL CLARO. Meta: `REPARACIÓN DE PARABRISAS MÓVIL. NOTTINGHAMSHIRE Y DERBYSHIRE.`

**Nav:** Reparaciones, Precios, Zonas, Seguros. Botón: `Llamar al 0800 118 4411`. Mono: `QUEDAN TRES SLOTS HOY.`

**Hero**
- Titular: `UN CHIP HOY / ES UN PARABRISAS / EN FEBRERO.`
- Oración: `Vamos a tu camino o al aparcamiento de tu oficina, llenamos el chip en unos cuarenta minutos y te marchas a la misma hora. La mayoría de las aseguradoras lo cubren sin franquicia.`
- Acciones: `Llamar al 0800 118 4411`, `Enviar una foto del daño`

**Chip o crack** (etiqueta `001/ Cuál es`)
`Si el daño es menor que una moneda de dos libras y no está directamente frente al conductor, casi puede Siempre se llenará de resina y se dejará sola durante años. Una vez que un chip tiene patas de más de tres centímetros de largo o se encuentra en la línea de visión del conductor, se debe reemplazar el vidrio. La respuesta honesta es que el clima frío decide por ti. Un chip que sobrevivió a noviembre normalmente no sobrevive a la primera helada.`

**Leyenda de la firma:** `Resina, vacío, curado. Cuarenta minutos conduciendo.`

**Lo que cuesta** (etiqueta `002/ Precios`)
- `Reparación de chip, un chip` ... `40 MIN` ... `65 GBP` ... `Generalmente cubierto, sin exceso`
- `Cada chip adicional` ... `15 MIN` ... `20 GBP` ... `Generalmente cubierto`
- `Reemplazo de parabrisas` ... `2 A 3 HRS` ... `Desde 280 GBP` ... `Cubierto, se aplica franquicia`
- `Recalibración de cámara` ... `1 HR` ... `95 GBP` ... `Cubierto con reemplazo`
Nota mono: `Los precios incluyen el IVA y el call out. Te contamos el total por teléfono antes de partir.`

**Cómo funciona la visita** (etiqueta `003/ La visita`)
- `00:00` **Llamas o envías unfotografía.** `Una fotografía con una moneda al lado del daño nos dice todo lo que necesitamos.`
- `MISMO DÍA` **Una ventana de llegada de dos horas.** `Enviamos mensajes de texto cuando partimos, y generalmente llegamos más temprano que tarde.`
- `00:40` **El trabajo.** `Hecho en el camino, en un estacionamiento o afuera de la oficina. No es necesario que esté allí una vez que comencemos.`
- `+60 MIN` **Tiempo de curado.** `Una hora antes de conducir después de un reemplazo. Reparaciones de las que puede salir inmediatamente.`

**En qué trabajamos** (etiqueta `004/ Vidrio`)
- Vidrio: `Parabrisas laminados`, `Parabrisas calefactables`, `Vidrio acústico y solar`, `Cristales laterales y de puertas`, `Parabrisas traseros`, `Cristal de techo panorámico`
- Extras: `Lluvia y sensores de luz`, `Recalibración de la cámara orientada hacia adelante`, `Pantallas de visualización frontal`, `Escobillas de limpiaparabrisas reemplazadas`, `Revestimientos y sellos`, `Eliminación y reciclaje de vidrio`

**Dónde acudimos a usted** (etiqueta `005/ Áreas`)
`Nottingham` ... `20 MIN` · `West Bridgford` ... `25 MIN` · `Beeston` ... `25 MIN` · `Derby` ... `35 MIN` · `Mansfield` ... `35 MIN` · `Newark` ... `40 MIN` · `Long Eaton` ... `30 MIN` · `Ilkeston` ... `30 MIN` · `Ripley` ... `40 MIN` · `Hucknall` ... `25 MIN`

**Cita:** `Él llenó dos fichas en el aparcamiento de la oficina mientras yo estaba en una reunión y envió la factura directamente a la aseguradora.`
Firma: `Priya, Beeston`

**Panel de llamada**
- Línea: `Mándanos una fotografía y te diremos cuál es.`
- Aparato telefónico grande: `0800 118 4411`
- Mono: `ABIERTO DE 7AM A 8PM, SIETE DÍAS. LUGARES PARA EL MISMO DÍA LA MAYORÍA DE LOS DÍAS.`

**Pie de página**
`CLEARPANE`, `Clearpane Auto Glass Ltd, registrado en Inglaterra 09918224`, `Aprobado por las principales aseguradoras, trabajo garantizado mientras sea propietario del vehículo`, `hello@clearpane.co.uk`
Enlaces: `Reparaciones`, `Precios`, `Áreas`, `Reclamaciones de seguros`

## 10. Nunca
Glassmorfismo, degradados, brillo, tarjetas con sombra, cuadrículas de íconos, emoji, temporizadores de cuenta regresiva, sopa de estadísticas como "50,000 parabrisas arreglados", lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, rayas idénticas.

## 11.Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
