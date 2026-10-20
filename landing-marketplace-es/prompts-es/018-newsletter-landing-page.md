# The Undercurrent: Aviso del sitio web de la página de destino del boletín

## 1. Objetivo
Cree una página de inicio sobria y de un color para **The Undercurrent**, una carta quincenal sobre envíos, puertos e Internet físico, escrita por una sola persona. Fondo gris frío con azul marino como texto y acento, una pantalla Caslon y una página que se lee como la primera página de una buena publicación periódica.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin backend de correo electrónico. El formulario muestra un estado confirmado localmente.

## 3. Sistema de diseño

Este es un mundo de marca monocromático: la tinta y el acento son el mismo azul marino, por lo que cada regla, letra y dibujo comparten un color en un fondo claro y frío.
```css
:root {
  --paper: #EEF0F2;              /* cool light ground */
  --ink: #1F2F5C;                /* navy, text and dark ground */
  --accent: #1F2F5C;             /* the same navy, on purpose */
  --on-accent: #EEF0F2;
  --surface: #E4E7EB;            /* tinted ground */
  --muted: #64708C;              /* secondary text */
  --line: rgba(31,47,92,0.15);   /* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, pie de página oscuro. No se necesita un color de acento cuando la marca es de un solo color.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Libre Caslon Display 400, espacio entre letras -0,02em, altura de línea 1,02. Hero 84 a 132 px, títulos de sección 40 a 64 px.
- **Cuerpo:** Inter 300, 17 px, altura de línea 1,6. El texto en ejecución se mantiene cerca de los 65 caracteres de ancho.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Números de edición, fechas, recuentos de lectores, etiquetas de índice.
- Énfasis por una línea completa en la cara de la pantalla, no por cursiva.

## 5. Elemento de firma
**Una letra que se despliega.** Un rectángulo de papel dibujado con líneas finas, doblado en tres. Al desplazarse a la vista, se abre: el tercio inferior gira hacia abajo en el eje X de 80 grados a 0 durante 0,9 segundos, luego el tercio superior sigue 150 ms después, usando "transform-origin" en las líneas de plegado y una perspectiva de 1200 px en el padre. En el interior, el párrafo inicial del último número se revela en la pantalla. 

 CSS puro se transforma, un color, sin sombra más allá de una línea de cabello debajo de cada pliegue. Sucede una vez.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 66px, papel, sin enlaces. Marca denominativa a la izquierda en Caslon, línea mono a la derecha que lee el número de edición y el recuento de lectores.
2. **Héroe, portada**: la placa de un periódico: el títulomuy grande en todo el ancho, una regla doble debajo y luego una línea de fecha en monocromático. Debajo de esas tres columnas: el título del número actual a la izquierda, una fotografía simple en el centro y el párrafo inicial a la derecha con una letra capitular. Altura mínima `clamp(560px, 80vh, 860px)`. *Fotografía: un barco portacontenedores en un muelle al anochecer, grúas pórtico encima, tonos azules apagados.*
3. **La línea de suscripción**: ligera. Una fila fina en todo el ancho: una oración a la izquierda, el campo de correo electrónico y un botón cuadrado sólido a la derecha. Sin caja, sin tarjeta, solo la regla de arriba y de abajo.
4. **Qué es, declaración**: luz. Un párrafo largo de Caslon que comienza en un tercio, con la etiqueta `001/ La letra` en la columna de la izquierda.
5. **La letra que se despliega**: superficie. El elemento de firma (sección 5), centrado, con un monotítulo que indica el número de emisión y la fecha.
6. **Ediciones recientes, índice rayado**: fondo azul marino oscuro. Seis filas en líneas finas: número de edición en mono, título en Caslon a 28 px, una línea de resumen, tiempo de lectura a la derecha. Denso a propósito.
7. **Quién lo lee, fila de marcas denominativas**: claro. Una fila de organizaciones de lectores establecidas como marcas denominativas tipográficas simples en el cuerpo, sin logotipos, separadas por divisores finos.
8. **Del archivo, extraiga comillas**: ligero. Tres comillas largas de 32 píxeles apiladas con un espacio generoso, cada una atribuida a su propio número de edición en mono.
9. **El escritor, carta del fundador**: superficie. Una columna estrecha y centrada con un pequeño retrato cuadrado arriba, tres párrafos cortos y una firma en cursiva. *Fotografía: una persona en un escritorio junto a una ventana con cartas de envío clavadas detrás, a la luz del día.*
10. **Segunda suscripción, panel insertado**: azul marino oscuro, inserto 16px, `--panel-radius`. Una línea de Caslon, el campo de correo electrónico nuevamente y una línea mono sobre frecuencia y cancelación de suscripción.
11. **Pie de página**: azul marino oscuro. Marca denominativa gigante recortada "THE UNDERCURRENT", tres enlaces pequeños, el enlace del archivo y el número de edición nuevamente.

## 7. Motion
- La placa de identificación se desvanece 16px una vez.
- La letra se despliega como se describe, una vez.
- Las filas de los números se desvanecen con 0.04s stagger.
- Las comillas se desvanecen14px, con una diferencia de 0,12 s.
: los botones se rellenan de izquierda a derecha al pasar el cursor sobre 0,2 s.
: facilita `cubic-bezier(.22,1,.36,1)`. Respete `prefers-reduced-motion` mostrando la carta ya abierta.

## 8. Responsive
- **Móvil de menos de 768px:** la placa de identificación cae a 40px, la página frontal de tres columnas se acumula en el título, la fotografía y el párrafo. La fila de suscripción se acumula con un campo de ancho completo y un botón debajo. La letra escala a 280 px de ancho y mantiene el despliegue. El índice de emisiones mantiene sus filas pero reduce el tiempo de lectura a una segunda línea. Sin desplazamiento de página horizontal.
- **Tableta:** página frontal con dos columnas, índice sin cambios.
- **Escritorio:** ancho de contenido de 1200 px, márgenes de 40 px, relleno de sección de 110 a 130 px.

## 9. Copia completa

**Marca denominativa:** THE SUBCORRIENTE. Mono, derecha: `NÚMERO 84. 9,400 LECTORES.`

**Héroe, portada**
- Placa de identificación: `The Undercurrent`
- Línea de fecha en mono: `QUINCENAL. DESDE RÓTERDAM. NÚMERO 84, 24 DE SEPTIEMBRE DE 2026.`
- Titular de columna: `El mes tranquilo en Felixstowe`
- Párrafo inicial con letra mayúscula: `Los volúmenes de cajas a través de Felixstowe cayeron un nueve por ciento en agosto, lo que nadie anunció y todos notaron. La razón no es la demanda. Es un puesto de atraque que ha estado fuera de servicio desde junio y una disputa por turnos que ninguna de las partes quiere que se anote. `

**Línea de suscripción**
- Frase: `Cada dos jueves, unas mil cien palabras sobre cómo se mueven las cosas físicas.`
- Marcador de posición de campo: `you@company.com` Botón: `Suscribirse`
- Mono: `GRATIS. SIN PUBLICIDAD. BAJARSE CON UN CLIC.`

**Qué es** (etiqueta `001/ La carta`)
`La mayor parte de la cobertura de envío es un semanario comercial escrito para personas que ya trabajan en él, o un artículo de periódico que explica qué es un contenedor. The Undercurrent se encuentra entre los dos. Asume que usted es curioso y está ocupado, nombra puertos, barcos y personas, y le dice lo que significa un número en lugar de simplemente imprimirlo.`

**Letter cap:** `Número 84, abierto. Quincenal desde marzo de 2023.`

**Ediciones recientes** (etiqueta `002/ Archivo`)
- `084` **El mes tranquilo en Felixstowe** `Nueve por ciento menos,un atraque fuera, y una rotación que nadie pondrá por escrito.` `9 MIN`
- `083` **Lo que te dice un gráfico sobre Panamá** `Restricciones de calado, niveles de lagos y la cola que ya no es una cola.` `11 MIN`
- `082` **El último barco cablero de Europa** `Reparando el internet físico, desde un barco construido en 1994.` `13 MIN`
- `081` **Rotterdam ahora funciona principalmente con viento** `La propia red del puerto, y lo que hace cuando el viento amaina.` `10 MIN`
- `080` **Quién es el propietario de las cajas** `Arrendamiento, reposicionamiento y por qué los viajes se vacían más que los llenos.` `12 MIN`
- `079` **Una semana en el turno de noche en Amberes** `Escrito desde la cabina de una grúa, con permiso y casco.` `15 MIN`

**Quién lo lee** (etiqueta `003/ Readers`)
`Maersk`, `Port of Rotterdam`, `Lloyd's List`, `DP World`, `Flexport`, `The Economist`, `Drewry`, `Royal Navy Logistics`

**Del archivo**
- `Un puerto es una promesa de que algo estará en algún lugar un martes, y casi todo lo demás se deriva de mantenerlo.` Mono: `ISSUE 71`
- `Nadie decidió que Internet funcionaría el fondo marino con un cable del ancho de una manguera de jardín. Simplemente resultó ser más barato.` Mono: `ISSUE 82`
- `El contenedor vacío es el objeto más honesto del comercio mundial. Va donde no está el dinero.` Mono: `NÚMERO 80`

**El escritor**
`Soy Joris Kamp. Pasé once años como planificador de terminales en Rotterdam y cuatro más como consultor para puertos que querían saber lo que ya sabían.`
`The Undercurrent comenzó como un correo electrónico a nueve antiguos colegas. Ahora lo leen la mayoría de ellos, además de otras nueve mil personas, lo que todavía parece poco probable. `
`Lo escribo los miércoles por la tarde y lo envío los jueves por la mañana. Si algo está mal, responda y lo corregiré en el próximo número y lo diré.`
Firma: *Joris Kamp*

**Segundo panel de suscripción**
- Línea: `El número 85 sale el 8 de octubre.`
- Marcador de posición de campo: Botón `you@company.com`: `Suscribir`
- Mono: `DOS CORREOS ELECTRÓNICOS AL MES. NADA MÁS, NUNCA.`

**Pie de página**
`THE UNDERCURRENT`, `Escrito enRotterdam de Joris Kamp`, enlaces `Archive`, `About`, `joris@undercurrent.email`, mono `ISSUE 84.`

## 10. Never
Glassmorfismo, degradados, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, ventanas emergentes, contadores de suscriptores falsos que marcan, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, rayas idénticas.

## 11. Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
