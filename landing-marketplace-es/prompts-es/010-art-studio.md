# Ninth Street: Aviso del sitio web de Art Studio

## 1. Objetivo
Cree un sitio web para **Ninth Street**, un estudio de pintura en Manchester que ofrece clases nocturnas y alquila caballetes. Papel de lienzo en bruto, tinta carbón, un acento bermellón, Instrument Serif.

**La idea aquí es la pared, no un dispositivo.** Toda la página se comporta como la pared de un estudio con trabajos clavados: las cosas no están centradas, no están espaciadas uniformemente y no todas son del mismo tamaño. No hay una pieza central animada ni nada que se dibuje solo. El interés proviene de que el diseño está ligeramente fuera de lugar, a propósito, y de que se permite que el trabajo tenga una calidad desigual. 

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
El movimiento se usa solo para establecer imágenes. Sin bibliotecas de componentes, sin motor de reservas, sin caja de luz.

## 3. Sistema de diseño
```css
:root {
  --paper: #EDE7DA;
  --ink: #1C1A16;
  --accent: #B5431E;
  --on-accent: #FFFFFF;
  --surface: #E2DBCB;
  --muted: #635F56;
  --line: rgba(28,26,22,0.18);
  --radius: 0px;
  --panel-radius: 0px;
}
```
R El radio es cero en todas partes. Nada en la pared de un estudio tiene esquinas redondeadas.

Ritmo de sección: papel, papel, superficie, papel, papel, superficie, papel. **Sin sección oscura en ninguna parte** y sin panel de color destacado. El bermellón aparece solo como una pequeña marca: un punto fijado, un precio, una palabra. 

**El contraste es un requisito, no una preferencia.** Cada color de texto, incluido `--muted` y los subtítulos pequeños, debe alcanzar al menos 4,5 a 1 respecto a la superficie sobre la que se asienta. No hay texto por debajo de 14 px.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Instrument Serif 400, clamp(52px, 8vw, 128px), altura de línea 0,92, espacio entre letras -0,02em. Grande y un poco demasiado grande para su caja, deliberadamente.
- **Cuerpo:** Inter 300, 16px, altura de línea 1.65
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas. Noches, precios, tamaños de clases, fechas.

## 5. La regla de diseño, que reemplaza un elemento de firma
Cada bloque en esta página está desplazado del que está arriba. Nada comparte un borde izquierdo con su vecino. Utilice una cuadrícula de doce columnas y comience las secciones en la columna 1, luego 3, luego 2, luego 5, luego 1 nuevamente, con anchos que no coincidan. Dos de las fotografías cuelgan 20 píxeles más abajo que sus vecinas, como si estuvieran clavadas torcidas.

Este es el concepto completo. Resista la tentación de ordenarlo en una cuadrícula ordenada y resista laurge agregar un caballete dibujado, un trazo de pintura, una paleta o un pincel.

## 6. Secciones

Nueve secciones.

1. **Barra de navegación**: 64 px, papel, sin línea fina debajo. Marca denominativa a la izquierda. Tres enlaces a la derecha. **El llamado a la acción es una palabra simple subrayada**, `Clases`, en bermellón, del mismo tamaño que los enlaces. Sin pastilla, sin caja, sin flecha.
2. **Héroe, fotografía a sangre completa con el título encima**: el estudio desde atrás, el titular en la parte inferior izquierda sobre la imagen en color papel, sin malla, colocado donde la imagen es lo suficientemente oscura para leer. Altura mínima `clamp(560px, 80vh, 880px)`.
3. **Declaración**: comenzando en la columna 3, un único párrafo Instrument Serif de 30 px, medida estrecha, con una etiqueta mono encima.
4. **Clases**: cuatro clases, cada una como un bloque que comienza en una columna diferente, con la noche, la duración, el tamaño de la clase y el precio en mono. Ni una mesa ni cuatro cartas iguales.
5. **En qué trabajas**: comenzando en la columna 2. Una lista simple de dos columnas de lo que se proporciona y lo que debes traer, configurada en el texto del cuerpo.
6. **Trabaja desde la habitación**: superficie teñida, sangrado completo de borde a borde. Seis pinturas de seis tamaños diferentes, dos de ellas colgadas ligeramente más bajas que el resto, con subtítulos en monocromático únicamente con el nombre del estudiante. Los subtítulos dicen claramente que algunos de estos son primeros intentos.
7. **Los tutores**: dos personas, retratos en línea a 120 px, una oración cada uno. Comenzando en la columna 5, este bloque se encuentra notablemente más a la derecha que cualquier otra cosa.
8. **Fechas de plazo**: superficie teñida, tres términos como líneas mono que muestran cómo se ocupa un lugar. Un punto bermellón marca el término que está casi lleno.
9. **Pie de página**: tres líneas cortas de 14 px, alineadas a la izquierda en la columna 1 y nada más. Sin marca denominativa, sin bloque, sin panel.

## 7. Movimiento
- La fotografía del héroe se asienta desde `scale 1.03` una vez.
- Las pinturas se asientan desde `scale 1.02` con un tambaleo de 0,06 s y se elevan 3px al pasar el mouse.
- Nada se dibuja, nada cuenta, nada se ensambla.
- Facilita `cubic-bezier(.22,1,.36,1)`, respeta `prefers-reduced-motion`.

## 8. Responsive
- **Móvil de menos de 768px:** los desplazamientos de columna se colapsan a un solo 24pxmargen, pero mantenga dos de las pinturas colgando más abajo para que la idea de la pared sobreviva. Titular a 46px. Una columna en todas partes. Sin desplazamiento de página horizontal.
- **Tableta:** se reduce a la mitad.
- **Escritorio:** contenido con ancho máximo de 1240 px, márgenes de 32 px, el relleno de la sección varía entre 80 px y 160 px, por lo que el ritmo es desigual.

## 9. Completo copy

**Marca denominativa:** CALLE NOVENA. Meta: `ESTUDIO DE PINTURA. CLASES DE TARDE. MANCHESTER.`

**Nav:** Clases, La habitación, Condiciones. Acción subrayada: `Clases`

**Héroe**
- Titular sobre la fotografía: `Una habitación con mala luz y buena compañía.`
- *Fotografía: un estudio de pintura en funcionamiento desde el fondo de la habitación, caballetes en diferentes ángulos, pintura en el suelo, luz de ventana desde un lado, nadie adentro shot.*

**Declaración** (etiqueta `001/ Ocho a la vez`)
`Ocho caballetes, una habitación encima de un almacén de alfombras y un tutor que no te dirá que tienes buen ojo. Enseñamos óleo y acrílico a personas que nunca han cogido un pincel y a personas que pintaron en la escuela en 1974 y dejaron de hacerlo. Nadie muestra a nadie fotografías del Distrito de los Lagos con su teléfono.`

**Clases**
- **Lunes, aceite para principiantes.** `Tres horas. Seis personas. Doce semanas, empieza cualquier semana.` `LUNES 18:30. 22 GBP A SESSION`
- **Miércoles, dibujo al natural.** `Dos horas y media, un modelo, sin instrucción a menos que tú la pidas.` `MIÉRCOLES 19:00. 16 GBP A SESSION`
- **Jueves, acrílico y color.** `Tres horas. Ocho personas. Mezcla, mayoritariamente, durante el primer mes.``JUEVES 18:30. 22 GBP A SESSION`
- **Sábado, estudio abierto.** `Cuatro horas, sin tutor, trae tu propio trabajo. Caballete y lavabo.` `SÁBADOS 10:00. 9 GBP`

**En qué trabajas**
- Proporcionado: `Caballete y tablero`, `Pintura al óleo o acrílica de gama básica`, `Pinceles, incluidos los que arruinarás`, `Turpas, trapos y fregadero`, `Un lugar donde dejar un lienzo mojado durante una semana`
- Trae: `Un delantal o una camisa que hayas dejado preocupándote`, `Tu propio lienzo si quieres un tamaño que no tenemos en stock`, `Nada más`

**Trabaja desde la habitación** (etiqueta `002/ Desde la habitación`)
`Jess, primer trimestre` ·`Mo, segundo intento con la misma jarra` · `Priya, dibujo natural, veinte minutos` · `Alan, después de cuatro años` · `Dee, semana tres` · `Tom, abandonado y luego terminado`
Título debajo: `Algunos de estos son primeros intentos y no los hemos dejado de lado silenciosamente.`

**Los tutores**
- **Ruth Agyeman.** `Pinta en grande, enseña en pequeño. Doce años aquí y todavía monta su propio caballete los lunes.`
- **Stefan Barcz.** `Sólo dibujo al natural. No dice casi nada durante la primera hora y luego dice lo único que lo soluciona.`

**Fechas de plazo**
`PLAZO DE OTOÑO, A PARTIR DEL 15 DE SEPTIEMBRE, QUEDAN DOS PLAZAS` · `PLAZO DE INVIERNO, A PARTIR DEL 6 DE ENERO, ABIERTO` · `PLAZO DE PRIMAVERA, A PARTIR DEL 20 DE ABRIL, OPEN`
Línea: `Se reserva una plaza durante una semana sin pago. El alquiler de caballete por un período cuesta 45 GBP si desea trabajar aquí los sábados.`

**Pie de página**
`Ninth Street, Unit 2a, Hilton Works, Manchester M4 6AF`
`hello@ninthstreet.studio`
Enlaces: `Clases`, `Términos`, `Alquiler de caballete`

## 10. Nunca
Caballetes dibujados, trazos de pintura, paletas, pinceles como gráficos, cualquier cosa que se ensamble o se dibuje por sí solo, esquinas redondeadas, sombras, degradados, brillo, secciones oscuras, paneles de acento, marcas denominativas gigantes, cuadrículas de íconos, emoji, cuadrículas espaciadas uniformemente, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa mono, `100vh` héroes.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "clsx": "^2.1.0" }
```
