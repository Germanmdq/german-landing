# Quiet Skin: Aviso del sitio web del esteticista

## 1. Objetivo
Cree un sitio web editorial suave para **Quiet Skin**, un estudio facial de una habitación en Bath dirigido por un solo esteticista. Fondo ruborizado, texto profundo color sangre, una serifa que se lee como una buena revista de belleza y fotografías de manos, ropa y luz con mucho espacio. Tranquilo, sin prisas, claramente no es una cadena.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin motor de reservas. Los botones enlazan a una página de reserva o a un número de teléfono.

## 3. Sistema de diseño
```css
:root {
  --paper: #F1D8D0;              /* blush ground */
  --ink: #3A1D1F;                /* deep oxblood, text and dark ground */
  --accent: #5B1B1F;             /* darker claret, the one accent */
  --on-accent: #F1D8D0;
  --surface: #EACBC2;            /* tinted ground */
  --muted: #7A5A58;              /* secondary text */
  --line: rgba(58,29,31,0.15);   /* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro. Líneas finas y tintes, sin cuadros, sin sombras.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Cormorant Garamond 300, espacio entre letras -0,02 em, altura de línea 1,0. Hero de 96 a 150 px, títulos de sección de 44 a 72 px.
- **Cuerpo:** Jost 300, 16 px, altura de línea 1.6.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Solo para duraciones, precios, etiquetas de índice como `002/ Tratamientos`.
- Una palabra en cursiva como máximo por título, en el color de acento.

## 5. Elemento de firma
**Un rostro dibujado en una línea.** Un único trazo continuo de 1,5 px en el color de acento que describe un rostro de perfil: frente, nariz, labios, barbilla, garganta. Se dibuja a sí mismo una vez en 1,6 segundos cuando entra a la vista, usando `pathLength` de 0 a 1, luego permanece quieto. Nada se llena, nada brilla, nada se repite. 

Aparece una vez, en un panel insertado en la superficie del suelo, con un breve título debajo. En un teléfono se dibuja a 220 px de ancho.

## 6. Secciones, cada una de ellas un esqueleto diferente

1. **Barra de navegación**: 78 px, rubor, una línea de cabello debajo. Marca denominativa a la izquierda en Cormorant, cuatro enlaces a la derecha, una pastilla decorativa con un círculo de flecha redondo.
2. **Héroe, ventana de arco**: una fotografía en un marco rematado por un arco en el centro de la sección, con las dos palabras principales a cada lado, una a la izquierda y otra a la derecha, alineadas con el centro del arco. Altura mínima `clamp(560px, 80vh, 840px)`. *Fotografía: una sala de tratamientos faciales con una cama cubierta de lino, una pequeña lámpara de latón y un jarrón de secado.flores, luz de la mañana a través de una ventana de guillotina.*
3. **Declaración**: luz. Un párrafo serif largo que comienza en un tercio del ancho, etiqueta "001/El estudio" en la columna de la izquierda.
4. **Tratamientos, lista suiza**: superficie. Columna de etiqueta que dice "002/Tratamientos", cuatro nombres de tratamientos grandes apilados de un tercio del ancho, cada uno con una duración y precio en mono a la derecha, y una línea de descripción. Al pasar el cursor sobre una fila, se muestra una pequeña fotografía al lado.
5. **Panel de firma**: suelo sangre de buey oscuro, recuadro de 16 px, `--panel-radius`. La cara de una sola línea (sección 5) dibujada en rubor sobre el fondo oscuro, con una leyenda mono.
6. **Qué pasa en una hora, filas numeradas**: luz. Cinco filas en las líneas del cabello: un marcador de tiempo mono, un título en Cormorant a 30 px, una oración. Se lee como un cronograma, no como una lista de funciones.
7. **Los productos, índice**: ligero. Dos columnas rayadas: lo que se utiliza y lo que deliberadamente no se utiliza. Filas lisas en líneas finas, honestas y cortas.
8. **Rejilla suelta, foto led**: superficie. Cinco fotografías de diferentes tamaños y desplazamientos verticales, cada una con un pequeño título monocromático. *Fotografías: manos apoyadas sobre una toalla de lino, una botella de vidrio reflejando luz, una franela doblada, vapor sobre un cuenco, la camilla de tratamiento desde la puerta.*
9. **Una cita**: luz. Una cita única centrada en Cormorant a 38 px, línea de firma en mono.
10. **Reserva, panel decorativo**: suelo burdeos, panel empotrado. Una línea serif grande, dos acciones y una línea mono sobre cómo se realizan las citas.
11. **Pie de página**: sangre de buey oscura. Marca denominativa gigante recortada "QUIET SKIN", dirección, horas con el día de hoy resaltado, cuatro enlaces pequeños.

## 7. Movimiento
: las palabras destacadas se desvanecen 18 píxeles, con una separación de 0,1 s.
: las fotografías se ubican desde `scale 1.03` hasta "1" 1,1 s.
- La cara de la línea se dibuja una vez, como se describe.
- Las fotografías de la fila de tratamiento se funden en 0,25 s al pasar el mouse.
- Facilidad `cubic-bezier(.22,1,.36,1)`. Respete `prefers-reduced-motion` mostrando el estado final.

## 8. Responsive
- **Móvil bajo 768px:** la fotografía del arco se mueve sobre el título, que se acumula en dos líneas a 54px. La altura mínima cae a `clamp(440px, 68vh, 620px)`. TratamientoLas filas pierden la fotografía al pasar el cursor y muestran una miniatura a la izquierda. La cuadrícula suelta se convierte en una columna sin desplazamientos. Nav mantiene la marca denominativa y la píldora, otros enlaces detrás de un interruptor de "Menú". Sin desplazamiento de página horizontal.
- **Tableta:** cuadrícula suelta de dos columnas, los tratamientos mantienen la fotografía flotante.
- **Escritorio:** ancho de contenido de 1200 px, márgenes de 40 px, relleno de sección de 120 a 140 px.

## 9. Copia completa

**Marca denominativa:** PIEL TRANQUILA. Meta: `BAÑO. UNA HABITACIÓN. UN PAR DE MANOS.`

**Nav:** Tratamientos, La Hora, Productos, Visita. Botón: `Reservar un primer tratamiento facial`

**Héroe**
- Palabras a ambos lados del arco: `Quiet` y `Skin`
- Mono debajo del arco: `FACIALES EN BAÑO, SOLO CON CITA.`

**Declaración** (etiqueta `001/ The studio`)
`Una habitación encima de una librería en Walcot Street, un tratamiento a la vez y sin música a menos que la desees. Me formé en Bristol, pasé seis años en una clínica que realizaba turnos de quince minutos y me fui para hacer lo contrario. Aquí no te venden nada en la cama. Si tu piel está bien, te diré que está bien.`

**Tratamientos** (etiqueta `002/ Tratamientos`)
- **El primer facial.** `Noventa minutos, la mayoría los pasé mirando y preguntando. Te vas con un plan y sin productos que no pediste.` `90 MIN. 95 GBP`
- **La hora tranquila.** `Una limpieza profunda, una exfoliación suave y un masaje prolongado. Por el que la mayoría de la gente regresa. ``60 MIN. 75 GBP`
- **Resurfacing.** `Una exfoliación ácida medida para textura y pigmentación, en un ciclo de tres o seis.` `45 MIN. 85 GBP`
- **Tratamiento de Espalda.** `El mismo cuidado, por la parte que nadie llega.` `60 MIN. 80 GBP`

**Leyenda de la firma:** `Cada cara se lee antes de tocarla.`

**Qué pasa en una hora** (etiqueta `003/ La hora`)
- `00:00` **Hablamos primero.** `Diez minutos sobre sueño, agua, estrés y lo que ha cambiado recientemente, porque la piel suele responder esos.`
- `00:10` **Limpiar, dos veces.** `Una vez para tomarse el día libre, otra para limpiar realmente.`
- `00:20` **Lo que tu piel necesite hoy.** `Vapor, extracción, un ácido o nada de eso. Decidido en la habitación, no enavance.`
- `00:35` **El masaje largo.** `Rostro, cuello, hombros y cuero cabelludo. Esta es la parte que recordarás.`
- `00:55` **Protector solar y fuera.** `Sin argumentos de venta. Una nota escrita si hay algo que valga la pena probar.`

**Productos** (etiqueta `004/ Qué uso`)
- Usado: `Cremas reparadoras de barrera`, `Ácidos mandélicos y lácticos`, `Vitamina C en dosis bajas y tolerables`, `Protector solar mineral`, `Franelas calientes simples`
- No utilizados: `Fragancia`, `Aceites esenciales en piel comprometida`, `Extracción por defecto`, `Todo lo que se vende en la cama`, `Fotografías de antes y después`

**Subtítulos de cuadrícula sueltos:** `Manos, después`, `La botella en el alféizar`, `Franelas, hervidas todas las noches`, `Vapor, dos minutos`, `La habitación de la door`

**Cita:** `Ella me dijo que mi rutina era demasiado complicada y eliminó cuatro cosas. Mi piel ha estado tranquila desde entonces.`
Firma: `Alice R, Larkhall`

**Panel de reservas**
- Línea: `Empiece con el minuto noventa.`
- Acciones: `Reserve un primer tratamiento facial`, `Haga una pregunta primero`
- Mono: `CITAS CELEBRADAS DURANTE DIEZ MINUTOS. TARDE ESTÁ BIEN, SOLO TEXTO.`

**Pie de página**
`QUIET SKIN`, `Primer piso, 42 Walcot Street, Bath BA1 5BD`, `hello@quietskin.co.uk`, `07700 900 118`
Horario: `Martes a viernes 9:30 a 18:00. Sábado 9:30 a 14:00. Cerrado los domingos y lunes.` Hoy está resaltado.
Enlaces: `Tratamientos`, `Productos`, `Vales de regalo`, `Instagram`

## 10. Nunca
Morfismo de vidrio, degradados, brillo, tarjetas con sombra, cuadrículas de íconos, emoji, controles deslizantes de antes y después, sopa de estadísticas como "2000+ clientes felices", lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, franjas idénticas de ancho completo.

## 11. Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
