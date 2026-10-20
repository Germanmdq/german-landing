# Threshold: Aviso del sitio web del instalador de hogares inteligentes

## 1. Objetivo
Cree un sitio web arquitectónico tranquilo para **Threshold**, un instalador de iluminación y hogares inteligentes que trabaja con arquitectos y constructores. Cálido fondo de marfil, tinta casi negra, un acento de terracota, una pantalla grotesca y una firma: un plano de planta dibujado con líneas donde las habitaciones se completan en secuencia a medida que transcurre la escena nocturna. Silencioso y preciso, más parecido a una práctica que a una tienda de gadgets.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin configuradores, sin integraciones de hogares inteligentes. Enlace de botones de consulta a correo electrónico o teléfono.

## 3. Sistema de diseño
```css
:root {
  --paper: #F4EFE6;              /* warm ivory */
  --ink: #1B1916;                /* warm near black */
  --accent: #A4532E;             /* terracotta */
  --on-accent: #FFFFFF;
  --surface: #EBE5DA;            /* tinted ground */
  --muted: #6B6459;              /* secondary text */
  --line: rgba(27,25,22,0.15);   /* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700&family=DM+Sans:wght@300;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Hanken Grotesk 700, espacio entre letras -0,035em, altura de línea 0,98. Hero de 78 a 128 px, títulos de sección de 40 a 62 px.
- **Cuerpo:** DM Sans 300, 16 px, altura de línea 1,55.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Número de habitaciones, plazos de entrega, precios, etiquetas de índice. 
: sin cursiva. Énfasis por una línea en terracota.

## 5. Elemento distintivo
**Un plano de planta que recorre la escena nocturna.** Un plano de una sola planta dibujado con líneas finas de tinta de 1,5 px: seis habitaciones, un pasillo, aberturas de puertas dejadas como espacios, sin muebles. Cuando la sección aparece a la vista, las habitaciones se llenan una tras otra con un tinte terracota plano con un 12 por ciento de opacidad, con 500 ms de diferencia, en el orden en que realmente se desarrolla la escena nocturna: vestíbulo, cocina, comedor, sala, rellano y baño. El nombre de cada habitación aparece en monocromático al lado a medida que se llena, luego se mantiene todo el plano.

Solo tinte plano. Sin brillo, sin degradado, sin íconos de bombilla. En `prefers-reduced-motion` todas las habitaciones se muestran ya llenas.

## 6. Secciones, cada una con un esqueleto diferente

1. **Barra de navegación**: 74 px, marfil, una línea de cabello debajo. Marca denominativa a la izquierda, cuatro enlaces a la derecha, pastilla de terracota con un círculo de flecha redondo.
2. **Héroe, esquinas**: una fotografía a sangre completa de un interior terminado sin ningún bloque de título. La marca denominativa se encuentra en la parte superior izquierda, la navegación en la parte superior derecha, el lugar y el año en la parte inferior izquierda.mono y una pequeña CTA en la parte inferior derecha. Altura mínima `clamp(560px, 80vh, 860px)`. *Fotografía: una sala de estar moderna y tranquila al anochecer, cálidos focos de luz de lámpara, paredes de yeso, un gran ventanal.*
3. **Declaración**: luz. Un párrafo largo de 26 píxeles en la pantalla que comienza en un tercio, con la etiqueta "001/La idea" en la columna de la izquierda.
4. **El plano, panel de firma**: fondo de tinta oscura, recuadro de 16 px, `--panel-radius`. El plano de planta (sección 5) dibujado con líneas finas de marfil sobre el suelo oscuro, con el relleno en terracota y una leyenda monocromática.
5. **Qué instalamos, lista suiza**: superficie. Columna de etiqueta `002/ Qué instalamos`, cuatro nombres apilados de un tercio del ancho, cada uno con una banda de precios en mono a la derecha y una línea de descripción.
6. **Proyectos, grilla editorial suelta**: ligero. Cinco proyectos de diferentes tamaños y desplazamientos verticales, cada uno con una fotografía y un mono meta que indica el lugar, el número de habitaciones y el año. *Fotografías: el pasillo de una casa georgiana, una cocina de nueva construcción, un granero reconvertido, una sala de jardín por la noche, un cine en el sótano.*
7. **Cómo trabajamos con su arquitecto, filas numeradas**: luz. Cinco filas en líneas finas con marcadores de etapa mono, estilo RIBA, cada una con un título y una oración.
8. **Lo que no hacemos, índice**: ligero. Una breve lista honesta de detalles: no hay aplicaciones propietarias que no podamos entregar, ni suscripciones, ni asistentes de voz a menos que se nos solicite.
9. **Una cita**: superficie. Una cita única centrada en Hanken Grotesk a 30 px con una línea de firma en mono.
10. **Consulta, panel decorativo**: suelo de terracota, panel empotrado. Una línea, dos acciones y una línea mono sobre plazos de entrega.
11. **Pie de página**: tinta oscura. Marca denominativa gigante recortada "THRESHOLD", dirección del estudio, acreditaciones, cuatro enlaces pequeños.

## 7. Movimiento
: la fotografía principal se establece desde `scale 1.03` hasta "1" en 1,2 segundos. El texto de la esquina se desvanece en 0,4 s.
- El plano de planta se llena habitación por habitación, una vez.
- Las imágenes del proyecto se asientan desde `scale 1.03` en 1,1 s, con un escalonamiento de 0,08 s.
- Pasar el cursor: las imágenes se amplían a 1,03, los círculos de flecha se deslizan 4px.
- Facilidad `cubic-bezier(.22,1,.36,1)`. Respetar `prefers-reduced-motion`.

## 8.Responsive
- **Móvil de menos de 768px:** altura mínima del héroe `clamp(420px, 66vh, 600px)`, los elementos de la esquina inferior se apilan en una columna. El plano de planta escala a 300 píxeles de ancho y los nombres de las habitaciones se mueven a una lista debajo del plano en lugar de al lado de él. Los proyectos se convierten en una columna sin compensaciones. Nav mantiene la marca denominativa y la píldora, los enlaces detrás de un interruptor de "Menú". Sin desplazamiento de página horizontal.
- **Tableta:** proyecta dos columnas, plano a 480 px.
- **Escritorio:** ancho de contenido de 1200 px, márgenes de 40 px, relleno de sección de 120 a 140 px.

## 9. Completo copy

**Marca denominativa:** UMBRAL. Meta: `ILUMINACIÓN Y CONTROL. LONDRES Y LOS CONDADOS DE ORIGEN.`

**Nav:** Qué instalamos, Proyectos, Trabajando con nosotros, Contacto. Botón: `Iniciar un proyecto`

**Hero**
- Mono abajo a la izquierda: `CASA PRIVADA, HIGHBURY. 2026.`
- CTA pequeña abajo a la derecha: `Iniciar un proyecto`

**Declaración** (etiqueta `001/ La idea`)
`Una buena casa inteligente es aquella en la que nadie en la casa se da cuenta. Las luces se encienden al nivel adecuado cuando entras, la calefacción sabe la diferencia entre un martes y un domingo y nada requiere un teléfono. Diseñamos la capa de control junto con su arquitecto y electricista, antes de que se cierren las paredes, que es el único momento en el que resulta barato hacerlo correctamente.`

**Leyenda del plano:** `La escena nocturna en una casa en Highbury. Seis habitaciones, una pulsación, 22 segundos desde el pasillo hasta el rellano.`

**Qué instalamos** (etiqueta `002/ Qué instalamos`)
- **Control de iluminación.** `Atenuación, escenas y botoneras que sustituyen la pared de interruptores. La parte que cambia la sensación de una casa.` `6 A 25.000 GBP`
- **Calefacción y sombreado.** `Calefacción por zonas, persianas y cortinas, configurados para que se comporten sin que se lo pida.` `4 A 15.000 GBP`
- **Audio.** `Altavoces de techo donde pertenecen, y en ningún lugar que no.` `3 A 20.000 GBP`
- **Redes y seguridad.** `Cableado siempre que sea posible, cámaras y porteros que siguen funcionando cuando Internet no funciona.` `3 A 12K GBP`

**Proyectos** (etiqueta `003/ Proyectos`)
- **Casa adosada en Highbury** `LONDON N5. 9 HABITACIONES. 2026.`
- **Nueva construcción, Chilterns** `BUCKINGHAMSHIRE. 14 HABITACIONES.2026.`
- **Conversión de granero** `SUFFOLK. 7 HABITACIONES. 2025.`
- **Habitación de jardín y casa de piscina** `SURREY. 3 HABITACIONES. 2025.`
- **Cine en el sótano** `LONDRES W11. 1 HABITACIÓN. 2024.`

**Trabajando con nosotros** (etiqueta `004/ Etapas`)
- `ETAPA 2` **Concepto.** `Nos unimos a la primera reunión de diseño y marcamos los dibujos antes de fijar el precio.`
- `ETAPA 4` **Diseño técnico.** `Rutas de cables, posiciones de teclados y programar su electricista realmente se puede construir desde.`
- `ETAPA 5` **Primera solución.** `Supervisamos el cableado en el sitio. Esta es la etapa que decide si el resto va bien.`
- `ETAPA 5` **Segundo arreglo y programación.** `Teclados encendidos, escenas configuradas, luego una semana de convivencia antes de ajustarnos.`
- `HANDOVER` **Handover.** `Un plan impreso, cada contraseña y un recorrido de dos horas con quien ejecuta el house.`

**Lo que no hacemos** (etiqueta `005/ Honesto`)
- `No hay aplicaciones propietarias que no puedas entregar al próximo propietario.`
- `No hay suscripciones mensuales para tus propias luces.`
- `No hay asistentes de voz a menos que los solicites.`
- `No hay promesas de modernización que no podamos cumplir una vez que hayamos visto los pisos.`
- `No hay trabajo sin un contratista principal o un electricista en el sitio.`

**Cita:** `Movieron tres teclados en la primera reparación debido a dónde estábamos realmente en la habitación. Nadie más se habría dado cuenta.`
Firma: `Ellen Vaughan, arquitecta, proyecto Highbury`

**Panel de consulta**
- Línea: `El mejor momento para llamarnos es antes del yeso.`
- Acciones: `Iniciar un proyecto`, `Enviar dibujos`
- Mono: `PLAZO DE ENTREGA ACTUAL PARA EL TRABAJO DE DISEÑO: CUATRO SEMANAS.`

**Pie de página**
`THRESHOLD`, `Studio 6, Bow Wharf, London E3 5SN`, `hello@threshold.build`, `020 7946 0388`
Mono: `SOCIO KNX. CONTRATISTA APROBADO POR NICEIC. TOTALMENTE ASEGURADO.`
Enlaces: `Qué instalamos`, `Proyectos`, `Trabajando con nosotros`, `Contacto`

## 10. Never
Glassmorfismo, degradados, brillo, neón, tarjetas con sombra, cuadrículas de iconos, emoji, paneles animados en el héroe, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes másla metacapa mono, héroes `100vh`, franjas idénticas.

## 11. Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
