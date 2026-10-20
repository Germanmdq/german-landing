# Thread & Chalk — Aviso del sitio web de sastrería a medida

## 1. Declaración de objetivos
Crear un sitio web de sastrería a medida, tranquilo y artesanal para **Thread & Chalk**, definido por carbón, tiza blanca y una fina serifa editorial: un sitio que vende el proceso de once semanas y el probador en lugar de una cuadrícula de productos.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(30, 8%, 12%);        /* #211f1d charcoal */
  --foreground: hsl(38, 22%, 92%);       /* #eee8df chalk */
  --primary: hsl(38, 34%, 66%);          /* #c4ac82 thread gold */
  --primary-foreground: hsl(30, 10%, 10%);
  --muted-foreground: hsl(34, 8%, 58%);
  --border: hsl(30, 8%, 22%);
  --card: hsl(30, 8%, 16%);
  --chalk-line: hsl(200, 32%, 70%);      /* tailor chalk blue */
  --light: hsl(38, 24%, 94%);            /* inverted sections */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** EB Garamond 400, clamp(38px, 5vw, 72px), altura de línea 1.08
- **H2:** EB Garamond 400, 30–46px
- **H3:** Inter 500, 17–19px
- **Cuerpo:** Inter 300, 16px, altura de línea 1.82
- **Cejas:** Inter 500, mayúsculas, espacio entre letras 0.24em, 10px, hilo dorado
- **Precios/medidas:** EB Garamond 500, tabular-nums

## 5. Visual Efectos

**Efecto 1: Anotaciones de medición de líneas de tiza.** En las secciones de proceso y tela, finas líneas discontinuas de color azul tiza con pequeñas etiquetas de medición se animan sobre las imágenes, dibujadas con SVG `stroke-dasharray` y `pathLength`, imitando las marcas de tiza de un sastre en tela.

```tsx
<svg className="pointer-events-none absolute inset-0" viewBox="0 0 400 500">
  <motion.line x1="60" y1="120" x2="340" y2="120"
    stroke="var(--chalk-line)" strokeWidth="1" strokeDasharray="6 5"
    initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.8 }}
    viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
  <motion.text x="348" y="124" fill="var(--chalk-line)" fontSize="10" letterSpacing="1.5"
    initial={{ opacity: 0 }} whileInView={{ opacity: 0.85 }} viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 1.2 }}>CHEST 102</motion.text>
</svg>
```

**Efecto 2: muestra de tela al pasar por encima.** Una cuadrícula de muestras de tela donde al pasar el cursor escala ligeramente la muestra y revela el nombre de la fábrica, el peso en gramos y la composición debajo, con una línea de cabello de hilo dorado que se expande debajo de la etiqueta.

## 6. Componente Desglose

1. **Barra de navegación**: 74 píxeles, fijo, carbón con desenfoque, línea fina de hilo dorado en el desplazamiento. Marca denominativa Serif a la izquierda, enlaces en el centro, botón de contorno dorado "Reservar una adaptación" a la derecha.
2. **Héroe**: fotografía de taller de 90 vh, con sangrado completo y un fuerte degradado hacia la izquierda. Ceja, serif H1, sublínea, dos CTA. *Imagen: mesa de trabajo de sastre con tiza, tijeras y tela a medio terminar, luz cálida y tenue del taller, manos visibles, fotografía documental artesanal.*
3. **Lo que significa a medida**: una declaración breve y honesta que distingue lo hecho a medida de lo hecho a medida, en una banda de luz invertida.
4. **El proceso**: once semanas en cinco etapas con anotaciones con líneas de tiza (Efecto 1): consulta, corte de patrones, primera adaptación, adaptación avanzada,acabado.
5. **Tela** — cuadrícula de muestras (Efecto 2) con seis molinos, composición, peso y estacionalidad.
6. **Qué hacemos** — 2x3: traje de dos piezas, tres piezas, esmoquin, abrigo, chaqueta deportiva, camisas.
7. **Precios**: una tabla sencilla con precios iniciales por prenda y nivel de tela, además de una nota honesta sobre el costo de las unidades.
8. **El probador**: imagen dividida y texto que describe lo que implica una primera cita y cuánto tiempo se debe permitir.
9. **Alteraciones y restauración** — un servicio para prendas no confeccionadas aquí, incluida la remodelación de trajes heredados.
10. **El taller**: un breve párrafo sobre quién realmente corta y cose, con una nota de que nada se subcontrata en el extranjero.
11. **Visita**: dirección, nota de solo cita, fechas apropiadas para viajar en otras ciudades.
12. **Pie de página**: línea de cabello casi negra, hilo dorado, tres columnas, año establecido, línea de cita.

## 7. Animaciones
- Hero: escala de imagen `1,04 → 1` en 14 s; H1 se desvanece 0.9s
- Líneas de tiza: `pathLength 0 → 1` en 1s, las etiquetas aparecen con un retraso de 1.2s
- Inversión de banda de luz: el fondo se desvanece en 0.6s a medida que ingresa la sección
- Muestras: escala `1 → 1.05` al pasar el cursor sobre 0,5 s; la línea del cabello dorada se expande bajo la etiqueta 0.4s
- Etapas del proceso: desvanecimiento escalonado 0.12s con la etiqueta de la semana que aparece primero
- Filas de precios: desvanecimiento escalonado 0.04s
- El movimiento es lento en todo momento; nada en este sitio debería sentirse apresurado

## 8. Responsive
- **Móvil (<768px):** hamburguesa con una superposición de carbón en pantalla completa; H1 se fija a 38 px; las anotaciones con tiza se reducen a dos líneas para evitar el desorden; muestras de 2 columnas con detalles siempre visibles en lugar de estar controlados por el cursor; la tabla de precios se convierte en filas apiladas; `Reserve una adaptación` fijado como una barra inferior adhesiva.
- **Tableta:** muestras de 3 columnas, etapas de proceso de 2 columnas, gradiente de héroe cambia a ponderado inferior.
- **Escritorio:** ancho máximo 1160px, `px-16`, `py-24`.

## 9. Completo Copia

**Marca:** HILO Y TIZA · Sastres a medida · Est. 1979 · Edimburgo

**Navbar:** A medida · Proceso · Tela · Precios ·Modificaciones · Visita · [Botón] Reservar una prueba

**Hero**
- Ceja: `EDIMBURGO · SASTRE A MEDIDA DESDE 1979 · CORTE EN LAS INSTALACIONES`
- H1: `Once semanas, tres pruebas, un patrón que es solo tuyo.`
- Sublínea: `Una pequeña sastrería hecha a medida en Thistle Street. Cada patrón se corta a mano para una sola persona, cada prenda se confecciona en la habitación detrás de la tienda y nada sale de este edificio para ser terminado en otro lugar.`
- CTA: `Reserve una prueba` · `Ver el proceso`

**Qué significa a medida** — H2 `La palabra se usa de manera vaga. Esto es lo que queremos decir con esto.`
`Hecho a medida ajusta un patrón de bloque existente a sus medidas. A medida significa que un patrón se elabora a partir de la nada, para usted, en papel y se guarda en un archivo con su nombre. La primera tarda quince días y cuesta menos. El segundo toma once semanas y se adapta de manera diferente, especialmente si tus hombros están desiguales, como casi todos lo son.`

**El proceso** — Ceja `EL PROCESO` — H2 `Once semanas, de principio a fin`
1. **Semana 1 — Consulta y medida** — Noventa minutos. Tomamos unas treinta medidas, analizamos la tela y el corte y fotografiamos su postura desde cuatro ángulos. Te vas sin comprometerte a nada.
2. **Semana 2 — Corte de patrones** — Su patrón se dibuja a mano en papel y se corta en la tela. Este es el paso que no se puede apresurar y el paso por el que se paga la mayor parte del precio.
3. **Semana 5 — Primera prueba (hilvanado)** — La prenda está cosida holgadamente, sin forro y con una manga. Parecerá alarmante. Esto es normal y es donde ocurre la verdadera adaptación.
4. **Semana 8 — Ajuste hacia adelante** — Forro adentro, ambas mangas puestas, ojales marcados. Los refinamientos aquí son pequeños y precisos.
5. **Semana 11 — Acabado y recolección** — Ojales terminados a mano, planchados y prueba final. Los ajustes en el primer año son gratuitos.

**Cloth** — Ceja `CLOTH` — H2 `Seis molinos a los que seguimos volviendo`
1. **Fox Brothers** — Somerset, Inglaterra — Franela, 380–500 g, peso de invierno, la mejor franela fabricada en el mundo.
2. **Harrisons de Edimburgo** — Huddersfield,Inglaterra: estambre, 280–340 g, traje para todo el año, caída excepcional.
3. **Drago** — Biella, Italia — Lana Super 130s, 240–280 g, peso de verano con tacto suave.
4. **Holanda y Jerez** — Peebles, Escocia — Mezclas de estambre y mohair, 260–320 g, crujientes y resistentes.
5. **Lovat Mill** — Hawick, Escocia — Tweed, 400–560 g, chaquetas y abrigos campestres, tejidos a ocho millas de distancia.
6. **Solbiati** — Como, Italia — Lino y lino-lana, 220–300 g, solo en verano, se arruga maravillosamente.

**Qué hacemos**
- **Traje de dos piezas** — Chaqueta y pantalón, solapas acolchadas a mano y totalmente de lona.
- **Traje de tres piezas** — Con chaleco a juego o en contraste, seis o cinco botones.
- **Traje de esmoquin**: revestimientos de grosgrain o barathea, sin ventilaciones, ajustadores laterales en lugar de trabillas para cinturón.
- **Abrigo**: Chesterfield, polo o un abrigo encubierto. Confeccionado con tela de 480 g en adelante.
- **Abrigo deportivo**: medio forro o un cuarto, bolsillos de parche, hombros más suaves que una chaqueta de traje.
- **Camisas**: patrón a medida, aguja única, cuello cosido a mano. Pedido mínimo de cuatro.

**Precio** — Ceja `PRECIO` — H2 `Qué cuesta y por qué`
| Prenda | Desde | Típico |
|---|---|---|
| Traje de dos piezas | £ 3200 | £3,600 |
| Traje de tres piezas | £ 3.800 | £4,200 |
| Traje de cena | £ 3.900 | £4,400 |
| Abrigo | £ 3.400 | £3,900 |
| Abrigo deportivo | £ 2.400 | £2,700 |
| Camisa, por camisa en cuatro | £ 280 | £320 |

Nota: `El precio depende de dos cosas: la tela, que oscila entre £90 y £340 por metro, y las horas. Una chaqueta requiere entre cuarenta y cinco y sesenta horas de trabajo manual. Nada más mueve mucho el número, y cualquiera que le diga lo contrario le está vendiendo una marca.`

**El probador** — `Estime noventa minutos para una primera cita. Lleva una chaqueta que te guste y otra que no, porque la segunda es más útil. No cobramos un depósito hasta después de la consulta, y si creemos que sería mejor para usted hacer algo a medida en otro lugar, se lo informaremos.you.`

**Alteraciones y restauración** — `Alteramos prendas que no se fabrican aquí y remodelamos trajes heredados; recortar la chaqueta de un padre para adaptarla a la de un hijo es el trabajo que más disfrutamos. Tráelo y te diremos honestamente si a la tela le queda suficiente vida.`

**El taller** — `Tres cortadores y cuatro sastres trabajan en la habitación detrás de la tienda. Nada se envía al extranjero, nada se termina a máquina cuando debería terminarse a mano, y la persona que corta su patrón es la persona con la que hablará en cada prueba.`

**Visita** — `18 Thistle Street, Edinburgh EH2 1EN` · Martes–viernes 10:00–18:00 · Sábados 10:00–16:00 · Por cita
`Accesorios de viaje: Londres, primer jueves y viernes mensual · Manchester, segundo martes mensual · Dublín, trimestral.`

**Pie de página** — THREAD & CHALK · `Sastres a medida, Edimburgo, desde 1979` · `0131 555 0158` · Sólo citas · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
