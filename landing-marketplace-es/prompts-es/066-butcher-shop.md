# Halloran & Son — Aviso del sitio web de la carnicería

## 1. Declaración de objetivos
Crear un sitio web de carnicería tradicional, oscuro y artesanal para **Halloran & Son**, definido por sangre de buey profunda, blanco hueso y una serifa pesada: un sitio de tienda que lidera con procedencia y envejecimiento en seco en lugar de una lista de precios.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(20, 14%, 10%);       /* #1d1815 near-black brown */
  --foreground: hsl(36, 24%, 92%);       /* #f0e9df bone */
  --primary: hsl(356, 52%, 34%);         /* #832a33 oxblood */
  --primary-foreground: hsl(36, 24%, 95%);
  --muted-foreground: hsl(30, 8%, 58%);
  --border: hsl(20, 12%, 20%);
  --card: hsl(20, 13%, 14%);
  --marble: hsl(36, 20%, 88%);           /* light inverted sections */
  --accent-brass: hsl(38, 44%, 56%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Bitter 700, clamp(40px, 5.4vw, 80px), espacio entre letras -0,02 em, altura de línea 1,02
- **H2:** Bitter 600, 32–46px
- **H3/nombres de corte:** Bitter 600, 18–21px
- **Cuerpo:** Inter 300–400, 16px, altura de línea 1.72
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.2em, 11px, latón
- **Precios/días de crianza:** Amargo 700, tabular-nums

## 5. Efectos visuales

**Efecto 1: Contador de envejecimiento en seco.** Una tarjeta para cada cámara de envejecimiento que muestra el corte, la granja y un conteo de días en vivo que aumenta desde una fecha de inicio almacenada, con un arco de progreso de latón que muestra el progreso hacia el envejecimiento objetivo. period.

```tsx
const days = Math.floor((Date.now() - new Date(batch.start).getTime()) / 86400000);
const pct = Math.min(days / batch.target, 1);

<svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
  <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border)" strokeWidth="6" />
  <motion.circle cx="50" cy="50" r="44" fill="none" stroke="var(--accent-brass)" strokeWidth="6"
    strokeLinecap="round" pathLength={1}
    initial={{ pathLength: 0 }} whileInView={{ pathLength: pct }} viewport={{ once: true }}
    transition={{ duration: 1.2, ease: 'easeOut' }} />
</svg>
<span className="font-display text-3xl tabular-nums">{days}<span className="text-sm"> / {batch.target} days</span></span>
```

**Efecto 2: inversión de mármol.** El mostrador y las secciones de recetas se invierten en un fondo de mármol claro, cortando la paleta oscura en dos e imitando el mostrador de mármol de la tienda.

## 6. Desglose de componentes

1. **Barra de navegación**: 74 px, fija, casi negra con desenfoque, borde inferior de latón de 1 px en el desplazamiento. Marca denominativa con signo comercial en latón, centro de eslabones, botón de sangre de buey "Pedido de colección" a la derecha.
2. **Héroe**: fotografía de mostrador de tienda de 88 vh, sin bordes y con un fuerte degradado en la parte inferior. Ceja, slab serif H1, sublínea, dos CTA. *Imagen: mostrador de carnicería tradicional con cortes colgantes y superficies de mármol, luz cálida y tenue, interior oscuro y atmosférico, fotografía de comida artesanal.*
3. **Franja de procedencia**: banda oscura con cuatro nombres de granjas, distancia en millas y lo que cada una suministra.
4. **El mostrador** — sección invertida de mármol (Efecto 2). Cuatro categorías con cortes y precios por kilo: vacuno, cordero, cerdo, aves y caza.
5. **Sala de envejecimiento en seco**: la sección de firma (Efecto 1). Tres lotes de crianza concontadores de días en vivo, granja, raza y período objetivo.
6. **Salchichas y embutidos**: cuadrícula de 2x3 de productos caseros con una línea corta de ingredientes cada uno.
7. **Cajas**: tres cajas de carne estilo suscripción con contenido, peso, precio y una nota sobre flexibilidad.
8. **Pregúntale al carnicero**: sección de mármol con cuatro respuestas breves a preguntas prácticas sobre cocina y almacenamiento.
9. **Recetas**: tres tarjetas con enlaces a páginas de métodos, cada una vinculada a un corte específico vendido en la tienda.
10. **Visita**: dirección, horario, una línea sincera sobre las colas de los sábados y un pedido de recogida CTA.
11. **Pie de página**: marrón más oscuro, regla superior de latón, tres columnas, tractor rojo y referencias al matadero local.

## 7. Animaciones
- Héroe: la imagen escala `1,05 → 1` sobre 11; Las líneas H1 se revelan con un clipPath borrado escalonado 0.1s
- Tira de procedencia: los nombres de las granjas se desvanecen escalonadamente 0.08s
- Filas cortadas: se desvanecen escalonadas 0.04s; el cursor tiñe la fila y desplaza el precio 3 px hacia la izquierda
- Arcos de envejecimiento: `pathLength 0 → pct`, 1.2s de salida, escalonado 0.15s
- Secciones de mármol: el color de fondo se desvanece en 0.6s a medida que la sección entra en la vista
- Tarjetas de caja: levante `-5px` con un latón Borde de 1 px al pasar el mouse

## 8. Responsive
- **Móvil (<768px):** hamburguesa; H1 se fija a 40 px; la franja de procedencia se convierte en una cuadrícula de 2x2; las categorías del contador se convierten en un acordeón, por lo que la página no tiene cuatrocientas filas; tarjetas envejecidas de 1 columna con un arco más pequeño de 64 px; pila de cajas; `Order for Collection` fijado como una barra inferior adhesiva.
- **Tableta:** contador de 2 columnas, envejecimiento de 3 columnas con tamaño de arco reducido, cajas de 3 columnas.
- **Escritorio:** ancho máximo 1160px, `px-16`, `py-20`.

## 9. Completo Copia

**Marca:** HALLORAN & SON · Carniceros desde 1961 · Corcho

**Navbar:** El Mostrador · Envejecimiento en seco · Cajas · Recetas · Visita · [Botón] Pedido de colección

**Hero**
- Ceja: `CORK CITY · FAMILY CARNICEROS DESDE 1961 · TERCERA GENERACIÓN`
- H1: `Conocemos la finca. Conocemos el campo.`
- Sublínea: `Un carnicero tradicional en Douglas Street. Canal entera, añejada en seco con hueso, cortada a pedido porpersonas que le dirán honestamente cuándo un corte más barato es la mejor opción.`
- CTA: `Orden de recogida` · `Ver lo que hay en el mostrador`

**Procedencia** — `Ballynoe Farm` 11 millas · Carne de res Hereford · `Cloonmore` 18 millas · Cordero · `Ardra Pig Co.` 24 millas · Cerdo Saddleback · `Glenview Aves` 9 millas · Pollo y pato de corral

**El mostrador** — Ceja `TODAY'S COUNTER` — H2 `Cortado al momento, nunca preenvasado`

*Ternera* — Chuletón curado en seco 38 €/kg · Solomillo con hueso 34 €/kg · Filete 62 €/kg · Espalda para estofar 14 €/kg · Costilla corta 16 €/kg · Carrillera de buey 12 €/kg
*Cordero* — Costillar, corte francés 32 €/kg · Paletilla con hueso 18 €/kg · Filete de cuello 16 €/kg · Piernas 14 €/kg
*Cerdo* — Panceta, con piel 14 €/kg · Chuletas de lomo 16 €/kg · Paletilla para desmenuzar 11 €/kg · Tocino de lomo, casero curado 19 €/kg
*Aves de corral y caza* — Pollo de corral 9 €/kg · Magret de pato 28 €/kg · Faisán de temporada 12 € cada uno · Pavo de corral, pedir antes del 10 de diciembre

**Sala de crianza en seco** — Ceja `THE ENVEJECIMIENTO` — H2 `Treinta y cinco días es lo que se consigue interesante`
`Envejecimiento en seco no es una palabra de marketing. Es una habitación de un grado con humedad controlada, mucho flujo de aire y mucha paciencia mientras se evapora aproximadamente una quinta parte del peso. Esa pérdida es la razón por la que la carne de res añeja cuesta más y tiene un sabor diferente.`
- **Chuletón Hereford** — Ballynoe Farm · Objetivo 35 días
- **Solomillo con hueso** — Ballynoe Farm · Objetivo 28 días
- **Dexter grupa** — Cloonmore · Objetivo 45 días

**Embutidos y embutidos** — H2 `Elaborado en la parte trasera, todos los martes y viernes`
- **Salchicha tradicional de corcho** — Paletilla de cerdo, pimienta blanca, bizcocho tostado, tripa natural
- **Toulouse** — Carne de cerdo tosca, ajo, vino tinto, pimienta negra
- **Merguez** — Cordero, harissa, comino, cilantro
- **Morcilla** — Avena, cebolla, pimienta de Jamaica, hecha según la receta de mi abuela y no, no lo voy a escribir
- **Tocino rayado curado en seco** — Doce días en sal y luego colgado
- **Coppa** — Cuello de cerdo, curado noventa días, en rodajas pedir

**Cajas**
- **La semana — 65 €** — Aproximadamente 3,5 kg. un asadoporro, carne picada, salchichas, chuletas y un corte para estofar. Alimenta generosamente a dos personas durante una semana. 
- **The Grill — 80 €** — Aproximadamente 3 kg. Dos filetes añejados en seco, hamburguesas, cordero marinado, pollo y salchichas.
- **The Slow — 55 €** — Aproximadamente 4 kg. Hombro, espinilla, mejilla y costilla corta. Todo lo que recompensa cuatro horas y un horno bajo.
Nota: `Las cajas son un punto de partida. Llámanos y cambia cualquier cosa por cualquier cosa; preferiríamos que consiguieras lo que realmente vas a cocinar.`

**Pregúntale al carnicero**
1. **¿Cuál es el mejor bistec?** — El que cocines adecuadamente. Si está nervioso, elija solomillo en lugar de filete: es más barato, más tolerante y sabe mejor.
2. **¿Cuánto tiempo debe reposar la carne?** — Aproximadamente mientras esté cocida, hasta unos veinte minutos para un bistec. Descansar no es opcional y es el paso que la mayoría de la gente se salta.
3. **¿Puedo congelarlo?** — Sí, y lo envasamos al vacío gratis. Congélalo el día que lo compras, no el día tres.
4. **¿Qué debo hacer con los cortes baratos?** — Mejilla, espinilla y hombro de buey. Horno bajo, mucho tiempo, mucho líquido. La carne más barata de la tienda es la mejor comida de la casa.

**Recetas** — `Carrillada de buey estofada en cerveza negra` · `Un chuletón, una sartén y nada más` · `Paleta de Saddleback lenta, ocho horas`

**Visita** — `74 Douglas Street, Cork` · Martes a viernes de 8:00 a 18:00 · Sábados 8:00–16:00 · Dom y lunes cerrado
`Los sábados por la mañana hay cola entre las diez y las doce y media. Se mueve más rápido de lo que parece y vale la pena.`

**Pie de página** — HALLORAN & SON · `Family Butchers since 1961` · `074 555 0129` · Red Tractor asegurado · Todos los animales sacrificados en Ballinlough, 14 millas · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
