# Ivory & Thread: Aviso del sitio web de la tienda de novias

## 1. Objetivo
Cree un sitio web adulto y sin prisas para **Ivory & Thread**, una boutique de novias en Bath que cuenta con once diseñadores y se adapta a todo lo que hay en casa. Papel casi blanco, tinta negra suave, un acento de rosa de arcilla, una fina serifa y una firma: un vestido dibujado en una sola línea continua, con una cinta métrica que se desenrolla debajo. Silencioso y caro, no brillante.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin motor de reservas, sin caja de luz, sin calculadora de tamaño. Las citas van a un enlace de correo electrónico. `lucide-react` solo para el glifo de flecha.

## 3. Sistema de diseño
```css
:root {
  --paper: #FAF7F4;
  --ink: #241F1C;
  --accent: #9B6B5C;           /* clay rose */
  --on-accent: #FFFFFF;
  --surface: #EFE8E2;
  --muted: #635B55;
  --line: rgba(36,31,28,0.15);
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro. Líneas finas en lugar de cuadros, sin sombras en ninguna parte.

**El contraste es un requisito, no una preferencia.** Cada color de texto, incluido `--muted` y los subtítulos pequeños, debe alcanzar al menos 4,5 a 1 con respecto a la superficie sobre la que se asienta. No hay texto inferior a 14 px en ninguna parte de la página.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;1,300&family=Jost:wght@300;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Cormorant Garamond 300, clamp(46px, 6.6vw, 104px), altura de línea 1.0, espacio entre letras -0.015em
- **Cuerpo:** Jost 300, 16px, altura de línea 1.65
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas, espacio entre letras 0.06em. Precios, plazos de entrega, tallas, etiquetas de índice.
- Como máximo una palabra en cursiva por título, en rosa arcilla.

## 5. Elemento distintivo
**Un vestido, en una línea.** La silueta de un vestido dibujada como un solo trazo ininterrumpido de 1,5 px, sin relleno: hombro, corpiño, cintura, caída de una falda. Se dibuja a sí mismo durante 2 segundos al desplazarse con `pathLength`. Cuando termina, una fina cinta métrica se desenrolla horizontalmente debajo de ella con tres marcas en mono: busto, cintura, cadera.

Se dibuja una vez y se detiene. Sin brillo, sin brillo, sin simulación de tela.

## 6. Secciones, cada una con un esqueleto diferente

1. **Barra de navegación**: 72 px, papel, una línea fina debajo. Marca denominativa a la izquierda, cuatro enlaces a la derecha, pastilla de arcilla con un círculo de flecha redondo.
2. **Héroe, passepartout**: una fotografía enmarcada en un tapete de papel ancho como un cuadro en la pared, con el título encima,una frase y una acción a continuación. Altura mínima `clamp(540px, 76vh, 820px)`. *Fotografía: un vestido de color marfil colgado de una percha de madera contra una pared lisa enyesada, luz natural desde un lado, sin modelo.*
3. **Declaración**: luz. Un párrafo largo de Cormorant que comienza en un tercio, etiqueta "001/Eleven diseñadores" en la columna de la izquierda.
4. **El vestido**: superficie. El elemento de firma (sección 5) con un título mono sobre montaje.
5. **Los diseñadores, lista suiza**: ligero. Etiqueta `002/ What we stock`, cinco nombres de diseñadores apilados de un tercio, cada uno con una línea sobre la casa y una banda de precios mono.
6. **Su cita, filas numeradas**: fondo de tinta oscura, recuadro de 16 px, `--panel-radius`. Cuatro filas en color papel con rotuladores mono: la primera visita, elección, accesorios, colección.
7. **Tamaños y modificaciones, índice**: claro. Dos columnas regladas. Izquierda: los tamaños que realmente tenemos en tienda, escritos claramente. Derecha: cuánto cuestan las modificaciones y cuánto tiempo tardan.
8. **Recientemente, rejilla suelta**: ligera. Seis fotografías de distintos tamaños con leyendas monocromáticas que nombran al diseñador y el mes. *Fotografías: vestidos de novia discretos colgados en perchas y formas de vestidos, dobladillo corto, espalda con botones, manga.*
9. **Una cita**: superficie. Una cita única centrada en Cormorant a 32 px con una línea de firma en mono.
10. **Reserve un panel decorativo adecuado**: suelo arcilloso, panel empotrado. Una línea, dos acciones, una nota mono sobre cuánto tiempo permitir.
11. **Pie de página**: tinta oscura. Marca denominativa gigante recortada "IVORY & THREAD", dirección, horario de apertura, tres enlaces pequeños.

## 7. Movimiento
: el título se desvanece 18 píxeles una vez, la fotografía enmarcada se asienta en `scale 1.03`.
: el vestido se dibuja una vez, la cinta se desenrolla después, como descrito.
- Las imágenes de cuadrícula se asientan desde `scale 1.03` con un tambaleo de 0,07 s, se elevan 4 píxeles al pasar el mouse.
- Facilita `cubic-bezier(.22,1,.36,1)`, respeta `prefers-reduced-motion` mostrando el vestido dibujado y la cinta desenrollada.

## 8. Responsive
- **Móvil de menos de 768px:** el tapete passepartout se reduce a 16px, el título a 42px. El vestido dibujado escala a 240 px y la cinta se coloca debajo de él. La lista de diseñadores se acumula con la banda de precios en su propia línea. Cuadrícula unocolumna con compensaciones eliminadas. Sin desplazamiento de página horizontal.
- **Tableta:** cuadrícula de dos columnas.
- **Escritorio:** ancho máximo de contenido 1160 px, canales 40 px, relleno de sección 120 px.

## 9. Copia completa

**Marca denominativa:** IVORY & THREAD. Meta: `BOUTIQUE DE NOVIAS. ONCE DISEÑADORES. BATH.`

**Nav:** Diseñadores, Citas, Reformas, Visita. Botón: `Reserva una prueba`

**Hero**
- Titular: `Pruébate once vestidos. Compre *una*.`
- Frase: `Una tienda tranquila en una calle georgiana con dos probadores, sin comisión y una costurera arriba.`
- Acción: `Reserve una prueba`

**Declaración** (etiqueta `001/ Eleven diseñadores`)
`Tenemos en stock once casas y nada más, porque once es el número que nuestros dos probadores pueden hacer correctamente en dos horas. Cada vestido es modificado aquí por Teresa, quien lo ha estado haciendo durante treinta y un años y nunca ha sugerido que pierdas peso para la prueba.`

**Subtítulo del vestido:** `Cada vestido se corta según la tabla de tallas del diseñador, no la tuya. Para eso están los tres accesorios.`

**Los diseñadores** (etiqueta `002/ Lo que tenemos en existencia`)
- **Charlotte Simpson.** `Británica, líneas limpias, casi sin cuentas.` `1,400 A 2,600 GBP`
- **Savin London.** `Separados y de dos piezas una oficina de registro.` `900 A 1.900 GBP`
- **Medio penique Londres.** `Suave, en capas, bueno para un granero o un jardín.` `1.800 A 3.400 GBP`
- **Andrea Hawkes.** `corpiños estructurados, bolsillos profundos, tirantes sensibles.` `1.600 A 2.900 GBP`
- **Rime Arodaky.** `Francés, más elegante, para una novia que no quiere un vestido de princesa.` `2.100 A 3.800 GBP`

**Tu cita** (etiqueta `003/ Cómo funciona`)
- `DOS HORAS` **La primera visita.** `Tú, dos personas como máximo, y un vaso de algo. Sacamos cinco o seis y te los pruebas. Sin presión para comprar ese día y sin descuento por hacerlo.`
- `Mismo día o más tarde` **Elegir.** `Si quieres dormir, duerme. No ocultamos nada y no le llamaremos.`
- `TRES PRUEBAS` **Las modificaciones.** `La primera a las doce semanas, la segunda a las seis, la última a las dos. Trae los zapatos y elropa interior que realmente usarás.`
- `DOS SEMANAS ANTES` **Colección.** `Prensada, empaquetada y mostrada en la percha antes de su salida.`

**Tallas y modificaciones** (etiqueta `004/ Plainly`)
- En tienda tenemos: `UK 8 a UK 20 en la muestra Rails`, `Un 22 y un 24 en cuatro estilos`, `Largos pequeños en tres casas`, `Si no tenemos tu talla, te lo diremos por teléfono antes de viajar`
- Modificaciones: `Bajo y polisón, 180 GBP` · `Corpiño recogido o sacado, 140 GBP` · `Tirantes o mangas añadidos, desde 210 GBP` · `Completo reestructuración, citado en la primera prueba` · `Estime doce semanas o díganos si tiene menos`

**Recientemente** (etiqueta `005/ Recientemente`)
Charlotte Simpson, junio · Halfpenny, agosto · Savin, marzo · Andrea Hawkes, septiembre · Un dobladillo, primer plano · Un botón atrás, terminado

**Cita:** `I Había estado en dos tiendas donde me cortaban cosas tres tallas más pequeñas. Aquí me llamaron con anticipación y me dijeron exactamente lo que tenían en un 20.`
Firma: `Rachel, casada en Prior Park`

**Reserve un panel apropiado**
- Línea: `Dos horas, dos invitados, once diseñadores. Nada queda para más tarde.`
- Acciones: `Reserva una prueba`, `Pregunta por tu talla`
- Mono: `MARTES A SÁBADO. ESPERE DOS HORAS. TRAE ZAPATOS SI LOS TIENES.`

**Footer**
`IVORY & THREAD`, `9 Margaret's Buildings, Bath BA1 2LP`, `hello@ivoryandthread.co.uk`
Mono: `Martes a sábado, 10:00 a 17:00. Solo con cita previa.`
Enlaces: `Diseñadores`, `Alteraciones`, `Visita`

## 10. Never
Glassmorfismo, degradados, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, efectos de brillo, confeti, temporizadores de cuenta regresiva, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, rayas idénticas.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
