# Marlow Hill: Aviso del sitio web de la granja

## 1. Objetivo
Cree un sitio web editorial, tranquilo y premium para **Marlow Hill**, una granja mixta de 140 acres en Herefordshire con una tienda agrícola y una caja de verduras semanal. Debería sentirse como una buena revista de comida: fondo verde suave, cálido acento de latón, grandes titulares serif, fotografías reales de campos y productos en una habitación determinada, y pequeños datos precisos en mono.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes. `lucide-react` solo para glifos de flecha. Sin cuadrículas de íconos, sin íconos decorativos, sin pago.

## 3. Sistema de diseño
```css
:root {
  --paper: #E9E6D8;              /* light ground */
  --ink: #1E3A2E;                /* deep green, text and dark ground */
  --accent: #B8893F;             /* brass */
  --on-accent: #FFFFFF;
  --surface: #E1DECF;            /* tinted ground */
  --muted: #5A6B60;              /* secondary text */
  --line: rgba(30,58,46,0.15);   /* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro. Líneas finas y tintes en lugar de cuadros y sombras.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=Manrope:wght@300;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Lector de noticias 300, espacio entre letras -0,02 em, altura de línea 1,0. Hero de 88 a 140 px, títulos de sección de 44 a 72 px.
- **Cuerpo:** Manrope 300, 16 px, altura de línea 1,55.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Solo para superficie, meses, pesos, precios, etiquetas de índice.
- Una palabra en cursiva como máximo por título, en latón.

## 5. Elemento distintivo
**Una rueda de temporada.** Un círculo dibujado con un solo trazo de latón de 1,5 px, dividido en doce segmentos por rayos finos, cada segmento etiquetado con un mes en mono alrededor del exterior. Dentro del círculo, el nombre de lo que se selecciona en el mes actual se establece en Newsreader en 40px. La rueda tiene un fino arco de latón que recorre desde enero hasta el mes actual cuando la sección entra a la vista, dibujada con `pathLength`, en 1,2 segundos.

El mes actual proviene del propio reloj del visitante, por lo que la página siempre es correcta. Al pasar el cursor sobre cualquier segmento de mes se cambia el nombre del producto interior y, al alejarlo, se regresa al día de hoy. Sin relleno, sin brillo.

## 6. Secciones, cada una con un esqueleto diferente

1. **Barra de navegación**: 78 px, papel, una línea fina debajo. Marca denominativa a la izquierda, cinco eslabones en el centro, un botón de pastilla de latón con un círculo de flecha redondo a la derecha.
2. **Héroe, palabra distintiva**: fotografía de paisaje a sangre completa con el nombre de la granja en todo el anchoel borde inferior en Newsreader, las letras casi tocan los márgenes. Coloque y sazone en mono arriba a la derecha. Altura mínima `clamp(540px, 78vh, 820px)`. *Fotografía: campos ondulados de Herefordshire al final del verano, setos, largas sombras, un solo roble.*
3. **Carta de la finca**: luz. Una columna estrecha y centrada, tres párrafos cortos firmados con un nombre en cursiva y un pequeño retrato cuadrado encima. *Fotografía: campesino cincuentón apoyado en un portón, ropa de trabajo, luz natural.*
4. **La rueda de las estaciones**: superficie. El elemento de la firma (sección 5) centrado, con un título mono debajo.
5. **La caja de verduras, hileras finas**: fondo verde oscuro. Cuatro filas de ancho completo separadas por líneas finas: tamaño de la caja, qué suele contener, con qué frecuencia, precio. Precio alineado a la derecha en mono. Una línea de latón debajo sobre los días de recolección.
6. **La tienda de la granja, passepartout**: luz. Una única fotografía enmarcada en una amplia alfombra tintada como una impresión en una pared, con un pequeño título centrado arriba y una leyenda de etiqueta de museo debajo. *Fotografía: mostrador de una tienda agrícola con cajas de verduras, bolsas de papel marrón y una pizarra, luz del día desde una puerta.*
7. **Lo que cultivamos, índice**: luz. Tres columnas regladas sobre líneas finas: verduras, huerto, carne. Hileras lisas, mono durante meses en temporada. Denso a propósito.
8. **Cuadrícula suelta del año**: superficie. Seis fotografías de diferentes tamaños y desplazamientos verticales, cada una con un título monocromático que nombra el mes y el campo. *Fotografías: tierra desnuda arada, flor, un seto lleno, cosecha, una puerta helada, corderos.*
9. **Una cita**: luz. Una cita única centrada en Newsreader a 38 px, línea de firma en mono debajo.
10. **Visita, panel decorativo**: suelo de latón, recuadro de 16 píxeles, `--panel-radius`. Línea serif grande, horario de apertura con el día de hoy resaltado, dirección y dos acciones.
11. **Pie de página**: verde oscuro. Marca denominativa gigante recortada "MARLOW HILL", dirección, teléfono, una línea mono sobre el autobús, cuatro enlaces pequeños.

## 7. Movimiento
: la marca denominativa Hero se desvanece 16 píxeles en 0,9 s.
: las fotografías se establecen desde `scale 1.03` hasta "1" 1.1s.
- El arco de la rueda de temporada se dibuja una vez, como se describe.
- Filas de cajas de verdurasse desvanece con un escalonamiento de 0,05 s.
- Pasar el cursor: las fotografías se amplían a 1,03, los enlaces se subrayan desde la izquierda, los círculos de flecha se deslizan 4px.
- Facilidad `cubic-bezier(.22,1,.36,1)`. Respete `prefers-reduced-motion` mostrando los estados finales.

## 8. Responsive
- **Móvil bajo 768px:** la marca denominativa del héroe cae a 56px en dos líneas, altura mínima `clamp(420px, 66vh, 600px)`. La rueda de temporada escala a 280 px y las etiquetas de mes se reducen a 9 px. El índice se convierte en una columna. La cuadrícula suelta se convierte en una sola columna sin desplazamientos. Nav mantiene la marca denominativa y el botón, los enlaces detrás de un interruptor de "Menú". Sin desplazamiento de página horizontal.
- **Tableta:** índice de dos columnas, cuadrícula suelta de dos columnas.
- **Escritorio:** ancho de contenido de 1200 px, canales de 40 px, relleno de sección de 120 px.

## 9. Copia completa

**Marca denominativa:** MARLOW HILL. Meta: `HEREFORDSHIRE. 140 ACRES. AGRICULTURA DESDE 1946.`

**Nav:** Cajas de verduras, Tienda agrícola, Qué cultivamos, El año, Visita. Botón: `Solicitar una caja`

**Hero**
- Marca denominativa en la parte inferior: `MARLOW HILL`
- Mono, arriba a la derecha: `EARDISLAND, HEREFORDSHIRE. FINALES DE VERANO.`

**Carta de la finca**
`Mi abuelo tomó esta tierra en 1946 con dos caballos y una deuda. Ahora tenemos 140 acres, aproximadamente un tercio de ellos son setos, huertos y terreno accidentado en el que no crece nada y de todos modos importa.`
`Vendemos casi todo en un radio de veinte millas de la puerta. Una caja un jueves, la tienda los fines de semana y lo que nos quite la cocina del Green Man en el medio. No hay supermercados, lo que significa que cultivamos por sabor y conservación en lugar de por una hoja de especificaciones.`
`Si quieres saber cómo se cultivó algo, pregunta. Se lo diremos honestamente, incluido el año en que las zanahorias fueron un desastre.`
Firma: *Tom Marlow*

**Nombre de la rueda de temporada:** `Recogido este mes, del campo más cercano a la casa.`
Producción por mes: enero `Puerros`, febrero `Purple broting`, marzo `Forced ruibarbo`, abril `Espárragos`, mayo `Habas`, junio `Fresas`, julio `Patatas nuevas`, agosto `Maíz dulce`, septiembre `Ciruelas`, octubre `Calabazas`, noviembre `Cavolo nero`, diciembre `Chirivías`

**Caja de verduras** (etiqueta `003/ Cajas`)
- `Pequeñas,alimenta dos` ... `Seis o siete tipos, siempre una raíz, una hoja y una hierba` ... `Semanal o quincenal` ... `14 GBP`
- `Grande, alimenta a cuatro` ... `Nueve o diez tipos, con fruta de temporada` ... `Semanal o quincenal` ... `22 GBP`
- `Sólo fruta` ... `Fruta de huerta de agosto a Enero` ... `Semanal` ... `9 GBP`
- `Caja de carne, trimestral` ... `Carne de cordero, cerdo y cerdo, sacrificados por encargo` ... `Cuatro veces al año` ... `65 GBP`
Línea de latón: `Recogida en tienda el jueves o entrega en un radio de doce millas el viernes mañanas.`

**Leyenda de la tienda de la granja:** `La tienda, en la antigua sala de ordeño. Abierto de viernes a domingo.`

**Lo que cultivamos** (etiqueta `004/ Molido`)
- Hortalizas: `Patatas, mayo a octubre`, `Puerros, octubre a marzo`, `Calabaza, septiembre a diciembre`, `Habas, mayo a julio`, `Kale, noviembre a marzo`, `Espárragos, abril a Junio`
- Huerto: `Manzanas para sidra, septiembre`, `Comer manzanas, octubre`, `Ciruelas, agosto`, `Damsons, septiembre`, `Peras, octubre`
- Carne: `Ryeland hogget, otoño`, `Cerdo de Tamworth, todo el año`, `Cordero, invierno`

**The año** (etiqueta `005/ El año`)
Subtítulos: `Febrero, Campo Largo`, `Abril, el huerto`, `Junio, el seto superior`, `Agosto, Nueve Acres`, `Noviembre, la puerta`, `Marzo, el cobertizo`

**Cita:** `Las ciruelas saben como las que recuerdo, que recuerdo había asumido que era simplemente que yo estaba envejeciendo.`
Firma: `Ceri Hughes, Leominster`

**Panel de visita**
- Línea: `La tienda está abierta, la tetera normalmente también lo está.`
- Horario: `Viernes de 10:00 a 17:00. Sábado 9:00 a 17:00. Domingo 10:00 a 14:00. Cerrado de lunes a jueves excepto para recogida de cajas.`
- Dirección: `Marlow Hill Farm, Eardisland, Herefordshire HR6 9BT`
- Acciones: `Solicitar una caja`, `Direcciones`

**Pie de página**
`MARLOW HILL`, `Eardisland, Herefordshire HR6 9BT`, `01544 555 0117`, `shop@marlowhill.farm`
Línea mono: `El autobús 461 para al final del carril, cuatro veces al día.`
Enlaces: `Veg boxes`, `Farm shop`, `What we grow`, `Instagram`

## 10. Never
Glassmorfismo, degradados, brillo, tarjetas sombreadas, iconocuadrículas, emoji, sopa de estadísticas, datos precisos falsos, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, franjas idénticas de ancho completo.

## 11. Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
