# Abbey Square Market: Aviso del sitio web de Farmers Market

## 1. Objetivo
Cree un sitio web cálido y útil para **Abbey Square Market**, un mercado de agricultores de los sábados con veinticuatro comerciantes. Fondo verde pálido, tinta de bosque profundo, un acento óxido, una cara serif y una firma: un plano dibujado de la plaza donde flotando un puesto te dice quién está en él esta semana. Editorial en lugar de municipal.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin biblioteca de mapas, sin inicio de sesión de comerciante. El plano de puesto es un SVG en línea con estado flotante.

## 3. Sistema de diseño
```css
:root {
  --paper: #DCE5C8;              /* pale green ground */
  --ink: #1F2A1A;                /* deep forest, text and dark ground */
  --accent: #B85A34;             /* rust */
  --on-accent: #FFFFFF;
  --surface: #D2DCBC;            /* tinted ground */
  --muted: #566049;              /* secondary text */
  --line: rgba(31,42,26,0.15);   /* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Manrope:wght@300;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** EB Garamond 500, espacio entre letras -0,02em, altura de línea 1,0. Hero de 88 a 140 px, títulos de sección de 44 a 70 px.
- **Cuerpo:** Manrope 300, 16 px, altura de línea 1,55.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Números de puestos, horarios, recuentos, etiquetas de índice.
- Una palabra en cursiva como máximo por título, en color óxido.

## 5. Elemento de firma
**Un plano de la plaza.** La plaza del mercado dibujada con líneas finas de tinta de 1,5 px: la pared de la abadía en la parte superior, la fuente en el medio y veinticuatro rectángulos de puestos numerados a su alrededor. Cada puesto lleva su número en mono. Pasar el cursor sobre un puesto lo llena con un tinte óxido plano al 15 por ciento y muestra el nombre del comerciante y lo que vende en una pequeña etiqueta al lado del plano. Al tocar se hace lo mismo en un teléfono.

Un tinte plano, sin brillo, sin sombras, sin alfileres. Es lo más útil de la página, por eso es la firma.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 74 px, verde pálido, una línea de cabello debajo. Marca denominativa a la izquierda, cuatro enlaces a la derecha, pastilla oxidada con un círculo de flecha redonda y una línea mono que indica la próxima fecha de mercado.
2. **Héroe, passepartout**: una fotografía enmarcada en un tapete tintado ancho como una impresión en una pared, con un pequeño título centrado encima y una leyenda de etiqueta de museo debajo. Altura mínima `clamp(540px, 78vh, 820px)`. *Fotografía: una concurrida plaza de mercado al aire libre en un sábado luminosomañana, toldos a rayas, cajas de verduras, un muro de abadía detrás.*
3. **Este sábado, fila fina**: ligero. Una fila de ancho completo: la fecha en la pantalla a la izquierda, las horas en monocromático en el medio y una línea sobre estacionamiento a la derecha. Reglas arriba y abajo, nada más.
4. **El plano, panel de firma**: superficie, recuadro 16px, `--panel-radius`. El plano cuadrado (sección 5) con un título mono y el área de la etiqueta del comerciante al lado.
5. **Comerciantes, índice regido**: suelo de bosque oscuro. Veinticuatro filas en líneas finas en tres columnas: número de puesto en mono, nombre del comerciante en EB Garamond a 22 px, lo que venden en el texto del cuerpo. Denso a propósito.
6. **Lo bueno de esta semana, declaración**: luz. Un párrafo largo con serifa que comienza en un tercio, escrito por el gerente del mercado, con la etiqueta `002/ Esta semana` en la columna de la izquierda.
7. **Rejilla suelta, foto led**: luz. Seis fotografías de diferentes tamaños y desplazamientos verticales, cada una con un título monocromático que nombra al comerciante. *Fotografías: un mostrador de quesos, pan en cajas, zanahorias embarradas, flores cortadas en cubos, una cama de hielo en una pescadería, manzanas en una bandeja de madera.*
8. **Convertirse en comerciante, filas numeradas**: superficie. Cuatro filas en líneas finas: cuánto cuesta, qué necesita, cómo solicitarlo, cuándo recibirá una respuesta.
9. **Una cita**: luz. Una cita única centrada en EB Garamond a 36px con una línea de firma en mono.
10. **Cómo llegar, panel decorativo**: suelo oxidado, panel empotrado. Dirección, los dos aparcamientos con horarios de paseo, las rutas de autobús y una línea sobre perros.
11. **Pie de página**: bosque oscuro. Marca denominativa gigante recortada "ABBEY SQUARE", el número de organización benéfica del mercado, contacto, cuatro enlaces pequeños.

## 7. Motion
- La fotografía del héroe se establece desde `scale 1.03` hasta "1" en 1,1 s dentro de su tapete. 
- El plano dibuja sus líneas una vez en 1,2 s usando `pathLength`, luego se queda quieto.
- Las filas de comerciantes se desvanecen con un escalonamiento de 0,03 s.
- Las imágenes de cuadrícula sueltas se asientan desde `scale 1.03`, con una separación de 0,08 s.
- Pasando el cursor: el tinte de pérdida se desvanece en más de 0,15 s, las imágenes se amplían a 1,03, flecha círculos diapositiva 4px.
- Facilidad `cubic-bezier(.22,1,.36,1)`. Respetar `prefers-reduced-motion`.

## 8.Responsive
- **Móvil por debajo de 768px:** el tapete alrededor de la fotografía principal se reduce a 16px. El plano se escala para ajustarse al ancho y la etiqueta del comerciante aparece debajo en lugar de al lado. El índice de comerciantes se convierte en una columna. La cuadrícula suelta se acumula sin las compensaciones. Nav mantiene la marca denominativa y la próxima fecha de mercado. Sin desplazamiento de página horizontal.
- **Tableta:** índice de comerciante de dos columnas, cuadrícula suelta de dos columnas.
- **Escritorio:** ancho de contenido de 1200 px, canales de 40 px, relleno de sección de 120 px.

## 9. Copia completa

**Marca denominativa:** ABBEY MERCADO CUADRADO. Meta: `TODOS LOS SÁBADOS. VEINTICUATRO COMERCIANTES. DESDE 1998.`

**Nav:** El plan, Comerciantes, Esta semana, Cómo llegar. Botón: "Conviértete en comerciante". Mono: `PRÓXIMO MERCADO: SÁBADO 3 DE OCTUBRE.`

**Hero**
- Título encima del tapete: `Abbey Square Market`
- Título debajo: `La plaza a las nueve y media, antes de que se acabe el pan.`

**Este sábado**
- Fecha: `Sábado 3 de Octubre`
- Mono: `08:00 A 14:00. LLUVIA O DE OTRA MANERA.`
- Línea: `Aparcamiento gratuito en Priory Street después de las 08:00, cuatro minutos a pie.`

**Subtítulo del plano:** `Veinticuatro puestos. Pase el cursor sobre uno para ver quién participa esta semana.`

**Traders** (etiqueta `001/ Traders`)
- `01` **Hollow Lane Dairy** `Queso de leche cruda, mantequilla, crema`
- `02` **Cross Oak Bakery** `Masa madre, centeno, pasteles hasta que go`
- `03` **Marlow Hill** `Verduras, fruta del huerto, cerdo`
- `04` **The Fish Van** `Pesca en barco de un día desde Brixham, desembarcó el viernes`
- `05` **Bell and Bramble** `Conservas, chutney, miel`
- `06` **Nettlebed Growers** `Ensalada, hierbas, tomates de temporada`
- `07` **Coombe Farm Eggs** `Huevos, huevos de pato, ocasionalmente gansos`
- `08` **Weavers Butchers** `Carne de res, cerdo, salchichas hechas en Jueves`
- `09` **The Flower Cart** `Flores cortadas, de temporada, cultivadas en Gran Bretaña`
- `10` **Sidra de fresno** `Sidra, perada, jugo de manzana`
- `11` **Ground Coffee Co** `Café para beber y frijoles para tomar`
- `12` **Pickle Street** `Kimchi, kraut, salsa picante`
- `13` **Old Mill Flour** `Harina molida en piedra, avena,legumbres`
- `14` **Two Fields Lamb** `Cordero, cordero, pieles de oveja en invierno`
- `15` **The Cake Table** `Pasteles enteros, horneados en bandeja, sin gluten a pedido`
- `16` **Severn Smokery** `Salmón ahumado, trucha, caballa`
- `17` **Levadura silvestre** `Bagels y focaccia, se agotan por once`
- `18` **Green Man Kitchen** `Comida caliente, sopa de octubre`
- `19` **Hedgerow Herbals** `Tés, tinturas, secos hierbas`
- `20` **Blackdown Charcuterie** `Salami, coppa, panceta`
- `21` **The Olive Stall** `Aceitunas, aceites, limones en conserva`
- `22` **Setas Cotswold** `Ostra, shiitake, de temporada wild`
- `23` **Chocolate de madera amarga** `Bean to bar, hecho a doce millas de distancia`
- `24` **Cuchillo y acero** `Afilado de cuchillos mientras compras`

**Esta semana** (etiqueta `002/ Esta semana`)
`Las ciruelas están terminadas y las primeras apropiadas La calabaza llegó al puesto de Marlow Hill esta mañana, lo que significa otoño, independientemente del tiempo que haga. Cross Oak ha duplicado la cantidad de centeno porque se agotó por diez durante tres semanas seguidas. El Fish Van no está aquí el día 10, están en el barco. Knife and Steel tarda unos quince minutos por hoja, así que entréguela temprano y compre mientras espera.`
Firmado: *Marta Reeve, gerente de mercado*

**Subtítulos de cuadrícula sueltos:** `Hollow Lane Dairy`, `Cross Oak Bakery`, `Marlow Hill`, `The Flower Cart`, `The Fish Van`, `Ash Tree Sidra`

**Convertirse en comerciante** (etiqueta `003/ Se buscan comerciantes`)
- **Lo que cuesta.** `32 GBP por puesto para un campo de 3 metros, 48 GBP para 6 metros. Pagado en el día.`
- **Lo que necesitas.** `Seguro de responsabilidad civil, registro de alimentos en tu propio ayuntamiento, y tu propia glorieta y pesas.`
- **Cómo solicitarlo.** `Envía un correo electrónico con lo que haces, dónde lo haces y dos fotografías de tu puesto.`
- **Cuando tendrás respuesta.** `En dos semanas. Tenemos una lista de espera para queso, pan y verduras porque están llenos.`

**Cita:** `Le he comprado el mismo pan al mismo hombre durante once años y nunca hemos hablado de nada más que del tiempo.`
Firma: `Bridget Lawler,comprador del mercado desde 1999`

**Panel Cómo llegar**
- Dirección: `Abbey Square, Pershore, Worcestershire WR10 1AB`
- Aparcamiento: `Priory Street, gratuito a partir de las 08:00, a cuatro minutos a pie. Aparcamiento de Bridge Street, 1 GBP, siete minutos.`
- Autobuses: `El 553 y el 382 paran en High Street, a dos minutos.`
- Línea: `Los perros son bienvenidos en todas partes excepto en el puesto de comida caliente.`

**Pie de página**
`ABBEY SQUARE`, `Abbey Square Market está dirigido por una empresa de interés comunitario, número 11428805`, `hello@abbeysquaremarket.co.uk`
Enlaces: `Traders`, `Conviértete en trader`, `Esta semana`, `Instagram`

## 10. Never
Glassmorfismo, degradados, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, mapas incrustados, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, franjas idénticas.

## 11. Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
