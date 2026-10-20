# Sugar & Salt: Aviso del sitio web de pasteles de boda

## 1. Objetivo
Cree un sitio web editorial suave para **Sugar & Salt**, un panadero que hace ocho pasteles de boda al mes y nada más. Blanco tiza, tinta marrón cálida, un acento de rosa polvoriento, una fina serifa y una firma: un pastel de tres niveles que se apila sobre sí mismo, dibujado en una sola línea. Moderación, no volantes.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin sistema de reserva, sin creador de pasteles. Botones de consulta enlazan al correo electrónico. `lucide-react` solo para el glifo de flecha.

## 3. Sistema de diseño
```css
:root {
  --paper: #F6F3EF;
  --ink: #3A2F2A;
  --accent: #B98B86;           /* dusty rose */
  --on-accent: #FFFFFF;
  --surface: #EDE7E1;
  --muted: #7B6E67;
  --line: rgba(58,47,42,0.15);
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro. Líneas finas y tintes, sin tarjetas sombreadas.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,500;1,300&family=Jost:wght@300;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Cormorant 300, clamp(48px, 7vw, 112px), altura de línea 1.0, espacio entre letras -0.015em
- **Cuerpo:** Jost 300, 16px, altura de línea 1.65
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas, espacio entre letras 0.06em. Porciones, precios, fechas, etiquetas de índice.
- Como máximo una palabra en cursiva por título, en rosa polvoriento.

## 5. Elemento distintivo
**Un pastel que se apila.** Tres niveles dibujados como tres rectángulos redondeados en un solo trazo de tinta de 1,5 px, además de un pequeño tablero de pastel dibujado. Al desplazarse a la vista, el nivel inferior se dibuja primero, luego el del medio, luego el superior, a 300 ms de distancia, y algunos puntos de rosas polvorientos se posan en la parte superior como higos. Nada se tambalea ni rebota.

Dibujado con `pathLength`, sin relleno, sin sombra, solo una vez.

## 6. Secciones, cada una de ellas un esqueleto diferente

1. **Barra de navegación**: 72 px, tiza, una línea fina debajo. Marca denominativa a la izquierda, cuatro enlaces a la derecha, pastilla rosa con un círculo de flecha redondo.
2. **Héroe, píldora en línea**: un título serif de dos líneas con una pequeña fotografía redondeada de un pastel cortado entre dos de las palabras. Sentencia y acción a continuación. Altura mínima `clamp(520px, 76vh, 800px)`. *Fotografía: corte de bizcocho desnudo mostrando la miga y una fina capa de mermelada, luz natural, plato liso.*
3. **Declaración**: luz. Un párrafo serif largo de un tercio, etiqueta "001/ Ocho al mes" en la columna de la izquierda.
4. **La tarta**: superficie. ElPastel apilable (sección 5), centrado, con una leyenda mono sobre tamaños.
5. **Sabores, lista suiza**: ligero. Etiqueta `002/ Sabores`, seis nombres de sabores apilados de un tercio, cada uno con lo que hay dentro y una nota mono sobre a qué estación le conviene.
6. **Tamaños y precios, mesa rayada**: claro. Cuatro filas: niveles, porciones, precio, notas. Figuras en mono, alineadas a la derecha.
7. **Cuadro de degustación**: tinta oscura molida, recuadro 16px, `--panel-radius`. Tres breves líneas en papel color sobre lo que llega por correo, y un precio en mono.
8. **Tortas recientes, rejilla suelta**: ligeras. Seis pasteles de diferentes tamaños y desplazamientos verticales, cada uno con subtítulos en mono con el lugar y el mes. *Fotografías: pasteles de boda discretos, en su mayoría blancos y crema, algunos con frutas o follaje, fotografiados en el lugar a la luz del día.*
9. **Una cita**: superficie. Una cita única centrada en Cormorant a 32 px con una línea de firma en mono.
10. **Fechas restantes, panel decorativo**: fondo de rosas, panel insertado. Los próximos cuatro meses con cuántas ranuras quedan en mono, una línea sobre depósitos, dos acciones.
11. **Pie de página**: tinta oscura. Marca denominativa gigante recortada "SUGAR & SALT", dirección de la cocina, línea de clasificación de higiene, tres enlaces pequeños.

## 7. Motion
: el título se desvanece 18 píxeles una vez, la fotografía en línea se asienta desde `scale 1.04`.
- El pastel se apila una vez, como se describe.
- Las imágenes de cuadrícula se asientan desde `scale 1.03` con 0.07s de tambaleo, levante 4px al pasar el mouse.
- Facilite `cubic-bezier(.22,1,.36,1)`, respete `prefers-reduced-motion` mostrando el pastel completamente dibujado.

## 8. Responsive
- **Móvil bajo 768px:** la fotografía en línea cae a su propia línea encima del título, título a 44px. El pastel dibujado se escala a 240 px. La tabla de precios se convierte en filas apiladas. Cuadrícula de una columna sin desplazamientos. Sin desplazamiento de página horizontal.
- **Tableta:** cuadrícula de dos columnas.
- **Escritorio:** ancho máximo de contenido 1180 px, canales 40 px, relleno de sección 120 px.

## 9. Copia completa

**Marca denominativa:** AZÚCAR Y SAL. Meta: `TORTAS DE BODAS. OCHO AL MES. NORFOLK Y SUFFOLK.`

**Nav:** Sabores, Tamaños, Degustación, Fechas. Botón: `Pregunta por tu cita`

**Hero**
-Titular con la fotografía en línea entre `es` y `el`: `El pastel es *el* último plato.`
- Oración: `No es una pieza central, no es una oportunidad para fotografiar. Algo de lo que ocho mesas realmente quieren una segunda porción.`
- Acción: `Pregunta por tu fecha`

**Declaración** (etiqueta `001/ Ocho al mes`)
`Hago ocho pasteles de boda al mes y nada más, que es la única manera de hornear todo la semana de la boda en lugar del mes anterior. Ni fondant, ni bosques de tacos, ni flores de azúcar que nadie come. Bizcocho, crema de mantequilla, fruta y un poco de follaje de quien esté haciendo tus flores.`

**Sabores** (etiqueta `002/ Sabores`)
- **Limón y flor de saúco.** `Bizcocho de limón, sirope de flor de saúco, crema de mantequilla de mascarpone.` `PRIMAVERA Y VERANO`
- **Ruibarbo y natillas.** `Bizcocho de vainilla, ruibarbo tostado, crema pastelera.` `TARDÍA PRIMAVERA`
- **Caramelo salado.** `Bizcocho de azúcar moreno, caramelo, una buena pizca de sal.` `TODO EL AÑO, SIEMPRE EL PRIMERO EN IR`
- **Higo y miel.** `Bizcocho de almendras, mermelada de higos, crema de mantequilla con miel.` `TARDÍA VERANO Y OTOÑO`
- **Chocolate y guindas.** `Bizcocho de chocolate negro, cerezas kirsch, ganache.` `OTOÑO E INVIERNO`
- **El bizcocho de frutas adecuado.** `Alimentado para tres meses, mazapán, sin glaseado a menos que lo desees.` `INVIERNO, Y PARA MANTENER UN TIER`

**Tallas y precios** (etiqueta `003/ Tallas`)
| Niveles | Sirve | Desde | Notas |
|---|---|---|---|
| Uno, 8 pulgadas | 20 | 180 libras esterlinas | Oficinas de registro y pequeñas cenas |
| Dos | 60 | 340 libras esterlinas | El más común con diferencia |
| Tres | 110 | 520 libras esterlinas | Añade un pastel cortado si tienes más de 120 |
| Tres más pastel de corte | 160 | 620 libras esterlinas | Cortar la tarta se queda en la cocina |
Nota: `Los precios incluyen la entrega en un radio de 40 millas, el montaje en el local y la retirada del stand a la mañana siguiente.`

**Caja de degustación**: `Cinco sabores, dos porciones de cada uno, en una caja por correo.` · `Una tarjeta con lo que hay en cada uno y la temporada que le conviene.` · `El coste se descuenta de tu factura final si reservas.` · Mono: `28 GBP, PUBLICADO EN SEGUNDA CLASE EN ALUNES`

**Tortas recientes** (etiqueta `004/ Recientemente`)
Elms Barn, junio · Hales Hall, agosto · Ayuntamiento de Cley, mayo · Voewood, septiembre · Un jardín en Southwold, julio · Oficina de registro de Norwich, marzo

**Cita:** `Tres personas pidieron la receta y mi tía pidió la sobras. No quedaron sobras.`
Firma: `Hannah y Joss, casados en Hales Hall`

**Fechas en el panel izquierdo**
- Meses: `MAYO 2027, 3 IZQUIERDO` · `JUNIO 2027, 1 IZQUIERDO` · `JULIO 2027, 5 IZQUIERDO` · `2027 DE AGOSTO, 6 IZQUIERDA`
- Línea: `Se mantiene una cita durante dos semanas sin depósito. Después de eso, pasa a quien pregunte a continuación, y el depósito es un tercio.`
- Acciones: `Pregunte sobre su fecha`, `Solicite una caja de degustación`

**Pie de página**
`SUGAR & SALT`, `Unit 3, Old Dairy, Reepham, Norfolk NR10 4JW`, `hello@sugarandsalt.cake`
Mono: `Registrado en el Consejo del Distrito de Broadland. Clasificación de higiene alimentaria 5.`
Enlaces: `Sabores`, `Tamaños`, `Caja de degustación`

## 10. Never
Glassmorfismo, degradados, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más el metacapa mono, héroes `100vh`, rayas idénticas.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
