# Fenn Mallory: Aviso del sitio web del locutor

## 1. Objetivo
Cree un sitio de una página tranquilo y seguro para **Fenn Mallory**, un locutor que graba desde una cabina tratada en casa. Carbón cálido, texto óseo, un acento ocre, una serifa grande y una firma: una forma de onda que se dibuja a sí misma una vez a lo largo de la página. La página debería parecer como escuchar, no como un showreel.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin biblioteca de reproductores de audio. Si se incluye audio, utilice un elemento `<audio>` simple con controles nativos, uno por muestra. `lucide-react` solo para el glifo de flecha.

## 3. Sistema de diseño
```css
:root {
  --paper: #EDE8DF;            /* bone, used as text on dark */
  --ink: #1F1D1A;              /* warm charcoal, the default ground */
  --accent: #C08A2E;           /* ochre */
  --on-accent: #1F1D1A;
  --surface: #2A2723;
  --muted: #98918A;
  --line: rgba(237,232,223,0.15);
  --radius: 8px;
  --panel-radius: 24px;
}
```
LED oscuro: `--ink` es el suelo y `--paper` el texto. Ritmo: oscuro, oscuro, superficial, claro, oscuro, acento, pie de página oscuro. Una sección luminosa para las tarifas.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,500;1,6..72,300&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Lector de noticias 300, clamp(46px, 6.5vw, 104px), altura de línea 1.0, espacio entre letras -0.02em
- **Cuerpo:** Inter 300, 16 px, altura de línea 1,65
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Duraciones, tasas, cambios, etiquetas de índice.
- Como máximo una palabra en cursiva por título, en ocre.

## 5. Elemento de firma
**Una forma de onda, dibujada una vez.** Un solo trazo ocre en todo su ancho, con forma de oración hablada: densos grupos de picos altos con espacios reales entre ellos donde están las respiraciones. Es una ruta SVG, 2px, sin relleno. Al desplazarse a la vista, se dibuja de izquierda a derecha durante 1,8 segundos con `pathLength` y luego se detiene. Debajo, un título mono nombra la línea que se pronunció. 

Nunca se anima con audio y nunca se repite. Es la imagen de una voz, no de un visualizador.

## 6. Secciones, cada una de ellas un esqueleto diferente

1. **Barra de navegación**: 70 píxeles, transparente, marca denominativa a la izquierda, tres enlaces a la derecha, pastilla ocre con un círculo de flecha redondo.
2. **Héroe, declaración**: oscuro. Una frase serif larga de un tercio del ancho, etiqueta mono "000/ Fenn Mallory" en la columna de la izquierda, un párrafo corto y dos acciones. Ninguna fotografía. Altura mínima `clamp(500px, 74vh, 760px)`.
3. **La forma de onda**: el elemento característico(sección 5) con su leyenda.
4. **Cómo sueno, intercambio de índice**: oscuro. Cinco categorías enumeradas en grande a la izquierda. Al pasar el cursor sobre uno, se intercambia una breve descripción y una nota mono a la derecha, que dice para qué sirve la lectura y qué tan rápida suele ser.
5. **Muestras, lista rayada**: superficie. Seis filas en líneas finas: cliente, qué era, longitud en mono y un control de reproducción simple. Nada se reproduce automáticamente.
6. **La cabina, foto led**: superficie. Una fotografía amplia con un título mono nombrando el micrófono y el tratamiento. *Fotografía: pequeña cabina de grabación tratada con micrófono de gran diafragma, espuma y mantas, lámpara caliente, ninguna persona.*
7. **Tarifas, filas finas**: fondo de hueso claro, recuadro de 16 píxeles, `--panel-radius`, texto oscuro. Cinco filas: tipo de trabajo, qué cubre, tarifa. Figuras alineadas a la derecha en mono.
8. **Cómo se ejecuta una sesión, filas numeradas**: oscuro. Cuatro filas: el guión, el disco, las recogidas, la entrega. Sincero acerca de cuánto tiempo tarda cada uno.
9. **Una cita**: oscuro. Una cita única centrada en Newsreader a 30px con una línea de firma en mono.
10. **Enviar un guión, panel de acento**: fondo ocre, texto oscuro, panel insertado. Una línea, dos acciones, una nota mono sobre la prueba gratuita read.
11. **Pie de página**: oscuro. Marca denominativa gigante recortada `FENN MALLORY`, correo electrónico, estado de unión, tres enlaces pequeños.

## 7. Movimiento
- La frase heroica se desvanece 16px una vez.
- La forma de onda se dibuja una vez, como se describe.
- El intercambio de índices fusiona el texto 0.2s.
- Las filas de muestra se desvanecen con un escalonamiento de 0.05s.
- Facilita `cubic-bezier(.22,1,.36,1)`, respeta `prefers-reduced-motion` mostrando la forma de onda ya dibujada.

## 8. Responsive
- **Móvil bajo 768px:** héroe a 40px desde el margen izquierdo. La forma de onda mantiene su ancho completo pero pierde detalles finos. El intercambio de índice se convierte en una lista apilada con la descripción siempre visible. La tabla de tarifas se convierte en filas apiladas con la tarifa en la misma línea. Sin desplazamiento de página horizontal.
- **Tableta:** el intercambio de índice se mantiene suspendido.
- **Escritorio:** ancho máximo de contenido 1160 px, canales 40 px, relleno de sección 110 px.

## 9. Copia completa

**Marca denominativa:** FENN MALLORY. Meta: `VOZ EN OFF. BRITÁNICO, CALIENTE,GAMA MEDIA. STAND EN CASA.`

**Nav:** Muestras, Tarifas, Stand. Botón: `Enviar un guión`

**Héroe** (etiqueta `000/ Fenn Mallory`)
- Frase: `Una voz que suena como si alguien *te dijera*, no como alguien que te vende.`
- Párrafo: `Británico, cálido, de rango medio y cómodo estando en silencio. Quince años de trabajo documental, corporativo y audiolibro, grabados desde una cabina tratada con un Neumann y entregados el mismo día.`
- Acciones: `Enviar un guión`, `Escuchar muestras`

**Waveform caption:** `"Se necesitan dos días, porque es necesario". Doce segundos, una toma, sin compresión.`

**Cómo sueno** (etiqueta `001/ Reads`)
- **Documental.** `Sin prisas, bajo, mucho espacio entre oraciones.` `Generalmente 110 A 130 PALABRAS POR MINUTO`
- **Corporativo.** `Claro y amigable sin la sonrisa que puedes escuchar.` `USUALMENTE 140 PALABRAS POR MINUTO`
- **Audiolibro.** `Formulario largo, consistente en todas las sesiones, trabajo de personajes cuando sea necesario.` `APROXIMADAMENTE 9,500 PALABRAS AL DÍA`
- **Explicador.** `Más brillante, más rápido, aún sin entusiasmo forzado.` `USUALMENTE 160 PALABRAS A MINUTO`
- **Teléfono e IVR.** `Neutral, paciente, grabado según las especificaciones.` `INDICACIONES A 24 BITS, 48 KHZ`

**Muestras** (etiqueta `002/ Muestras`)
- **National Trust**: `Película de visitante, Fountains Abbey` `2:40`
- **Wellcome Collection**: `Audioguía de la exposición` `18:00`
- **Faber**: `Audiolibro, ficción literaria` `9 HRS`
- **Siemens**: `Serie de formación interna` `4:10`
- **Canal 4**: `Narración documental, dos episodios` `48:00`
- **NHS Somerset**: `Sistema telefónico, 140 indicaciones` `N/A`

** Pie de foto del stand:** `Neumann TLM 103, Cloudlifter, stand tratado en una habitación libre. Silencio después de las 22:00 debido a los trenes.`

**Tarifas** (etiqueta `003/ Tarifas`)
- `Corporativo o explicativo, hasta 2 minutos` ... `Guión, grabación, una ronda de recogidas` ... `220 GBP`
- `Narración documental, por minuto terminado` ... `Graba y pastillas, sin sincronización` ... `65 GBP`
- `Audiolibro, por hora terminada` ... `Grabar, pinchar y rodar, correcciones de prueba` ... `280 GBP`
- `Avisos telefónicos,hasta 50` ... `Grabado según sus especificaciones y con nombre` ... `180 GBP`
- `Dirección de la sesión en vivo` ... `Source Connect o Zoom, por hora` ... `90 GBP`
Mono: `El uso para transmisión y medios pagos se cotiza por separado. Te diré cuándo se aplica en lugar de ocultarlo en un pie de página.`

**Cómo se ejecuta una sesión** (etiqueta `004/ Proceso`)
- `DÍA UNO` **Llega el guión.** `Lo leo en voz alta una vez y devuelvo todo lo que me llama la atención.`
- `MISMO DÍA` **El registro.** `Dos tomas de todo, más suplentes en las líneas que importan.`
- `DENTRO DE 24 HORAS` **Recogidas.** `Una ronda incluida. Envía códigos de tiempo y haré coincidir el nivel y la habitación.`
- `ENTREGA` **Archivos como quieras.** `WAV a 48 kHz por defecto, mezclado o sin procesar, nombrado según tu convención.`

**Cita:** `Volvió a grabar cuatro líneas a las once de la noche porque la edición cambió. No lo mencioné y no cobré por ello.`
Firma: `Ruth Ellery, productora`

**Envía un panel de guión**
- Línea: `Envía el guión y grabaré treinta segundos gratis.`
- Acciones: `Envía un guión`, `Reserva un directo session`
- Mono: `PRUEBA LECTURAS DENTRO DE UN DÍA LABORAL, GENERALMENTE ANTES.`

**Pie de página**
`FENN MALLORY`, `fenn@fennmallory.voice`, `Miembro de capital. Source Connect y Cleanfeed.`
Enlaces: `Samples`, `Rates`, `Booth`

## 10. Never
Glassmorfismo, degradados, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, audio de reproducción automática, visualizadores animados que reaccionan al sonido, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, franjas idénticas.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
