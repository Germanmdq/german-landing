# Maison Solenne — Aviso del sitio web de la marca de perfumes

## 1. Declaración de objetivos
Crear un sitio web sensual y lujoso para **Maison Solenne**, una casa de perfumes parisina especializada: carbón intenso y champán cálido, revelaciones cinematográficas lentas y desenfocadas, una serifa fina y delicada, notas de fragancia dispuestas como una pirámide tipográfica y fotografías sin bordes de vidrio y luz que hacen sentir el aroma. visible.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes ni lógica de carrito. Los botones enlazan a las páginas de productos.

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(30, 6%, 8%);         /* warm charcoal */
  --foreground: hsl(38, 30%, 90%);       /* champagne cream */
  --primary: hsl(38, 42%, 66%);          /* champagne gold */
  --primary-foreground: hsl(30, 6%, 8%);
  --muted-foreground: hsl(34, 10%, 58%);
  --border: hsl(36, 12%, 20%);
  --light: hsl(38, 32%, 94%);            /* ivory, used for one light section */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Italiana&family=Cormorant:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400&display=swap" rel="stylesheet" />
```
- **H1:** Italiana 400, clamp(56px, 10vw, 170px), altura de línea 0,9, espacio entre letras 0,02 em, mayúsculas
- **H2:** Cormorant 300, clamp(38px, 5vw, 76px), altura de línea 1
- **Acento en cursiva:** Cormorant 300 cursiva, champagne
- **Cuerpo:** Jost 300, 16px, altura de línea 1.8, espacio entre letras 0.01em
- **Etiquetas:** Jost 400, 11px, mayúsculas, espacio entre letras 0.3em

## 5. Visual Efectos

**Efecto 1: Revelación desenfocada.** Todos los titulares e imágenes ingresan desde `filter: blur(20px)`, `opacity 0`, `scale 1.04` hasta nítidos y completos, en 1,6 s con facilidad `[0,16, 1, 0,3, 1]`. Lo suficientemente lento como para sentir que llega el aroma.

**Efecto 2: Pirámide de notas.** Las notas de cada fragancia se establecen como una pirámide tipográfica, centrada: notas altas en una línea corta en versalitas, notas de corazón en una línea más ancha, notas de fondo en la línea más ancha en cursiva más grande. Delgadas líneas horizontales de color champán entre los niveles, cada una de las cuales se dibuja hacia afuera desde el centro (`scaleX 0 → 1`) cuando entra a la vista. 

**Efecto 3: Fuga de luz.** Un brillo radial cálido, muy suave y que se desplaza lentamente (`hsla(38, 60%, 60%, 0.08)`, 900 px) se mueve a través del héroe en un bucle de 20 segundos entre dos posiciones, como la luz que se mueve a través de un cristal. botella.

## 6. Desglose de componentes

1. **Barra de navegación**: 88 píxeles, transparente sobre el héroe, marca denominativa centrada en italiano con espacio entre letras amplio, enlaces divididos a izquierda y derecha. Carbón con desenfoque después de desplazarse.
2. **Héroe**: ventana gráfica completa, imagen sin bordes con un degradado oscuro en la parte inferior y fuga de luz (Efecto 3). H1 centrado en el tercio inferior, una línea corta en cursiva debajo y unbotón de texto con un subrayado fino. *Imagen: elegante frasco de perfume facetado con líquido ámbar, espectacular luz lateral a través del vidrio que proyecta cáusticos dorados sobre una superficie de piedra oscura, cinematográfico.*
3. **Manifiesto**: espacio en blanco centrado, muy generoso, un párrafo breve en Cormorant 32px.
4. **La colección**: cuatro fragancias en una fila horizontal de mosaicos altos con imágenes de 2:3, cada uno con nombre, etiqueta de familia olfativa y precio. Al pasar el cursor, la imagen se amplía lentamente y aparece una fina línea color champán debajo del nombre.
5. **Fragancia destacada**: diseño dividido: imagen de altura completa a la izquierda, lado derecho con nombre, párrafo de la historia, pirámide de notas (Efecto 2), opciones de tamaño como texto sin formato y un botón. *Imagen: primer plano de hojas de higuera y madera oscura con rocío de la mañana, verde intenso y marrón, fotografía macro de mal humor.*
6. **Ingredientes**: banda de imagen con sangrado completo de 80 vh con tres nombres de ingredientes colocados a lo largo como palabras grandes en cursiva sobre un degradado oscuro. *Imagen: campos de jazmines de Grasse al amanecer, suave neblina, cálida luz dorada.*
7. **El perfumista** — sección de luz de marfil (la única sección de luz), retrato a la izquierda, cita y breve biografía a la derecha, texto al carboncillo.
8. **Conjunto de descubrimiento**: panel centrado con imagen, nombre, descripción, precio y botón.
9. **Boutique**: dirección en París, horario y línea para citas.
10. **Pie de página**: carboncillo, minimalista, marca denominativa centrada, enlaces en una sola fila, línea de boletín.

## 7. Animaciones
- Efecto 1 en cada encabezado e imagen cuando entra a la vista (una vez)
- Hero H1: las letras se revelan con desenfoque y un escalonamiento de 0.04s
- Mosaicos de colección: tambalearse 0,15 s; coloque el cursor sobre la escala de la imagen 1 → 1,06 en 1,4 s
- Niveles de pirámide de notas: Efecto 2, nivel por nivel con un escalonamiento de 0,3 s
- Palabras de ingredientes: cada una se desvanece y se desplaza `x: -20 → 0` con un escalonamiento de 0,25 s
- Fuga de luz: Efecto 3, infinito

## 8. Responsive
- **Móvil (<768px):** H1 a 56px; la barra de navegación se convierte en una marca denominativa centrada con el ícono de menú a la izquierda y el ícono de bolsa a la derecha; la colección se convierte en una fila horizontal de desplazamiento rápido con mosaicos al 70% del ancho; imagen de pilas de fragancias destacadas primero a 70vh; pila de palabras de ingredientesverticalmente; la sección de perfumista apila el retrato primero.
- **Tableta:** colección cuadrícula 2×2; destacados permanecen divididos 50/50.
- **Escritorio:** imágenes a sangrado completo, ancho máximo de texto 1280px, `px-10`, espacio entre secciones `py-36`.

## 9. Copia completa

**Marca:** MAISON SOLENNE · Paris

**Navbar:** Fragancias · Descubrimiento · — SOLENNE — · La Casa · Boutique

**Hero**
- H1: `SOLENNE`
- Línea: `*Perfumes compuestos lentamente, en pequeñas ediciones, en París.*`
- Botón: `Descubrir la colección`

**Manifiesto:** `Hacemos cuatro perfumes. Cada uno de ellos tardó más de dos años en terminarse, utiliza materiales naturales siempre que sean mejores y se embotella a mano en ediciones de ochocientas unidades. Haremos un quinto cuando esté listo, y no antes.`

**La colección** — Etiqueta `LA COLECCIÓN`
1. **Figue Noire** — `AMADERADO · VERDE` — 50ml — 185€
2. **Lumière d'Ambre** — `ÁMBAR · RESINOSO` — 50ml — 195€
3. **Jasmin de Nuit** — `WHITE FLORAL` — 50ml — 185€
4. **Pluie Minérale** — `FRESH · MINERAL` — 50ml — 175 €

**Fragancia destacada** — Etiqueta `DESTACADA`
- H2: `Figue *Noire*`
- Historia: `Una tarde en un jardín amurallado en Provenza, después de que se haya ido el calor del día. Hojas de higuera trituradas, la savia lechosa de frutos inmaduros y la madera oscura de un viejo banco aún caliente por el sol.`
- Pirámide de notas:
 - Salida: `BERGAMOT · HOJA DE HIGUERA · PIMIENTA NEGRA`
 - Corazón: `leche de higo · iris · hoja de violeta`
 - Fondo: *cedro · tonka · vetiver ahumado*
- Tamaños: `50ml 185 € · 100 ml 260 €`
- Botón: `Descubre Figue Noire`

**Ingredientes** — Etiqueta `OBTENIDO A MANO` · Palabras: *Jazmín de Grasse* · *Iris de Florencia* · *Vetiver de Haití*

**El perfumista** — Etiqueta `THE NOSE` · Cita: `"Un perfume debe sentirse como un recuerdo que no sabías que tenías."` · `Camille Arnaud se formó en Grasse y pasó doce años componiendo para las grandes casas antes de fundar Maison Solenne en 2019. Trabaja sola, en un pequeño estudio encima de la boutique.`

**Set de descubrimiento** — H2 `Begin *con los cuatro*.` `Cuatro viales de 2 ml en unestuche encuadernado en lino. El precio total se reembolsa al comprar un frasco de 50 ml en un plazo de tres meses.` — 32 € — Button `Encargar el set de descubrimiento`

**Boutique** — H2 `Visita la *boutique*.` `14 rue de Poitou, 75003 París` · `Martes – sábado, 11 h – 19 h` · `Consultas privadas con cita previa, con Camille cuando esté en el studio.`

**Pie de página** — SOLENNE · Fragancias · Set de descubrimiento · La Casa · Boutique · Entrega · Contacto · `Cartas del estudio, cuatro veces al año.` Ingrese `Su correo electrónico` · © 2026 Maison Solenne

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
