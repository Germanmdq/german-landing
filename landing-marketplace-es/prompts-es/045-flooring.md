# Grainhouse Flooring — Aviso del sitio web de Flooring Company

## 1. Declaración de objetivos
Crear un sitio web de pisos cálido y basado en materiales para **Grainhouse**, definido por blanco avena, nogal profundo y una serifa editorial tranquila, construido alrededor de un visualizador de habitaciones que intercambia acabados de piso y una tabla de precio por metro cuadrado que incluye accesorios, porque ocultar el costo de accesorios es la razón por la que los sitios web de esta categoría fail.

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(36, 28%, 96%);       /* #f8f4ee oat */
  --foreground: hsl(26, 20%, 16%);       /* #302722 walnut ink */
  --primary: hsl(26, 36%, 32%);          /* #6f4f37 walnut */
  --primary-foreground: hsl(36, 28%, 97%);
  --muted-foreground: hsl(26, 8%, 46%);
  --border: hsl(34, 16%, 87%);
  --card: hsl(36, 30%, 92%);
  --accent-sage: hsl(120, 14%, 46%);     /* sustainability marker */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
- **H1:** Lector de noticias 400, clamp(38px, 4.8vw, 66px), altura de línea 1.1
- **H2:** Lector de noticias 400, 30–44px
- **H3 / producto nombres:** Inter 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.76
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.2em, 11px, nogal
- **Precios por metro cuadrado:** Lector de noticias 500, tabular-nums

## 5. Efectos visuales

**Efecto 1: visualizador de habitaciones.** Una fotografía de una habitación con una fila de muestras debajo. La selección de un acabado de piso difumina el área del piso de la imagen, de modo que los clientes puedan ver roble contra nogal contra espina de pescado en la misma habitación en lugar de imaginarlo a partir de una muestra de 40 mm.

```tsx
const finishes = [
  { id: 'oak-natural',  name: 'Natural Oak',      price: 62,  fit: 24 },
  { id: 'oak-smoked',   name: 'Smoked Oak',       price: 74,  fit: 24 },
  { id: 'walnut',       name: 'American Walnut',  price: 96,  fit: 24 },
  { id: 'herringbone',  name: 'Oak Herringbone',  price: 88,  fit: 38 },
  { id: 'lvt-stone',    name: 'LVT Stone Effect', price: 38,  fit: 22 },
];
const [sel, setSel] = useState('oak-natural');
const f = finishes.find(x => x.id === sel);

<AnimatePresence mode="wait">
  <motion.img
    key={sel}
    src=""
    alt="Living room with the selected floor finish"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.45 }}
    className="absolute inset-0 h-full w-full object-cover object-center"
  />
</AnimatePresence>
<p className="mt-4 tabular-nums">
  £{f.price}/m² supply · £{f.fit}/m² fitting · <strong>£{f.price + f.fit}/m² all in</strong>
</p>
```
Resumen para los medios por acabado: un interior luminoso de sala de estar fotografiado desde un ángulo bajo con el piso prominente, luz natural, muebles neutros, interiores editoriales tranquilos style.

**Efecto 2: Tira de desplazamiento de vetas.** Una banda horizontal de cinco fotografías de vetas de madera muy cortas que se trasladan lentamente en el desplazamiento a ritmos ligeramente diferentes, creando un paralaje poco profundo que enfatiza la textura. El movimiento reducido los mantiene estáticos.

## 6. Desglose de componentes

1. **Barra de navegación**: 74 px, fijo, avena, borde inferior de 1 px. Marca denominativa a la izquierda, centro de enlaces, teléfono y botón nuez "Reservar una encuesta gratuita" a la derecha.
2. **Héroe**: división, texto a la izquierda, imagen de la habitación a la derecha. Ceja, serif H1, sublínea, dos CTA, cuatro puntos de confianza. *Imagen: un piso ancho de tablones de roble en una habitación luminosa, un ángulo de cámara bajo que enfatiza la veta y la longitud, luz natural cálida.*
3. **Visualizador de habitación**: la interacción principal (Efecto1), colocado inmediatamente debajo de hero.
4. **Tipos de pisos**: tarjetas de 2x3: madera maciza, madera de ingeniería, LVT, laminado, parquet y espiga, alfombra, cada una con una descripción sencilla de cuándo es la elección correcta y cuándo no.
5. **Lista de precios completa**: suministro y ajuste por metro cuadrado para cada producto, con los costos de preparación del subsuelo y del subsuelo listados por separado en lugar de ocultos.
6. **Tira de veta**: la sección de textura (Efecto 2) con un breve párrafo sobre el origen de la madera.
7. **Honestidad del contrapiso**: la sección que nadie más escribe: qué sucede cuando el contrapiso es desigual, cuánto cuesta la nivelación y por qué la cotización puede cambiar después de que se levanta el piso.
8. **Proceso de ajuste**: cinco pasos desde el reconocimiento hasta la limpieza final, con el tiempo de aclimatación indicado, que es el paso que se omite con más frecuencia en el comercio.
9. **Cuidados y garantías**: qué cubre la garantía de desgaste de veinticinco años, cómo limpiar cada tipo y qué la anula.
10. **Proyectos recientes**: tres trabajos con la sala, el producto, el área en metros cuadrados y los días en obra.
11. **Encuesta gratuita**: formulario con recuento de habitaciones, área aproximada y una nota de que la encuesta incluye lecturas de humedad.
12. **Pie de página**: nogal, cuatro columnas, certificación FSC, dirección de la sala de exposición, contacto.

## 7. Animaciones
- Hero: el texto se desvanece 0,7 s; la imagen se revela con un aumento y desvanecimiento, 0.9s
- Visualizador: la imagen del piso se desvanece 0.45s en la selección de muestra; la línea de precios se vuelve a montar y se desvanece, 0.25s
- Muestras: escala 1.1 y gana un anillo de nuez al pasar el mouse, 0.2s
- Tira de grano: el paralaje se traduce a tres velocidades diferentes en el desplazamiento, movimiento reducido seguro
- Filas de la tabla de precios: se desvanecen escalonadas 0.03s
- Pasos del proceso: línea de conexión de nuez escala desde la izquierda, 0.8s

## 8. Responsive
- **Móvil (<768px):** hamburguesa; la imagen del visualizador se encuentra encima de la fila de muestras y la línea de precios, en todo su ancho; H1 se fija a 38 px; tarjetas tipo piso 1 columna; la tabla de precios se apila en filas con oferta, ajuste y total en tres líneas; `Reserve una encuesta gratuita` fijada como una barra inferior adhesiva.
- **Tableta:**el visualizador mantiene el diseño lateral, tipos de piso 2-col.
- **Escritorio:** ancho máximo 1180px, `px-16`, `py-22`.

## 9. Copia completa

**Marca:** GRAINHOUSE FLOORING · Suministro y montaje · Nottingham

**Navbar:** Visualizador · Tipos de pisos · Precios · Proceso · Proyectos · `0115 555 0163` · [Botón] Reserve una encuesta gratuita

**Hero**
- Ceja: `NOTTINGHAM & EAST MIDLANDS · SUMINISTRO Y AJUSTE · CERTIFICADO FSC · DESDE 2007`
- H1: `Véalo en una habitación antes de comprometerse con cuarenta metros cuadrados.`
- Sublínea: `Madera, ingeniería, LVT y alfombras, suministradas e instaladas en East Midlands. Los precios incluyen el ajuste, el estudio es gratuito y tomamos lecturas de humedad antes de cotizar y no después.`
- CTA: `Reserve un estudio gratuito` · `Pruebe el visualizador`
- Puntos de confianza: `Los precios incluyen el ajuste` · `Encuesta gratuita con prueba de humedad` · `Madera certificada FSC` · `Garantía de desgaste de 25 años`

**Visualizador** — Ceja `MÉRALO PRIMERO` — H2 `Misma habitación, diferentes pisos`
1. **Roble natural** — suministro de £62/m² · instalación de £24/m² · **£86/m² todo incluido**
2. **Roble ahumado**: suministro de £74/m² · instalación de £24/m² · **£98/m² todo incluido**
3. **Nogal americano**: suministro de £96/m² · instalación de £24/m² · **£120/m² todo incluido**
4. **Roble en espiga**: suministro de £88/m² · montaje de £38/m² · **£126/m² todo incluido**
5. **Efecto piedra LVT** — suministro de £38/m² · instalación de £22/m² · **60 £/m² todo incluido**

**Tipos de suelo**
1. **Madera maciza**: una pieza de madera en todas partes. Se puede lijar y repintar muchas veces, por lo que sobrevive a todo lo demás. No apto sobre suelo radiante ni en baños, ya que se moverá con la humedad.
2. **Madera de ingeniería**: una capa superior de madera real sobre un núcleo de madera contrachapada. Estable sobre calefacción por suelo radiante, lijable dos o tres veces según la capa de uso. La respuesta correcta para la mayoría de los hogares modernos.
3. **LVT** — Baldosas de vinilo de lujo. Impermeable, cálido bajo los pies y realmente convincente ahora como no lo era hace diez años. Cocinas, baños y solanas.
4. **Laminado**: la opción económica, y no hay que avergonzarse de alquilarla o de una habitación libre. No impermeablelo que diga el embalaje, y no se puede reparar, solo reemplazar.
5. **Parquet y Herringbone**: bloques colocados siguiendo un patrón. El doble de trabajo de instalación que un suelo de tablones, por lo que el precio de instalación es mayor. Merece la pena en una habitación que mirarás durante veinte años.
6. **Alfombra** — Lana y mezcla de lana, 80/20 y 50/50. Sigue siendo la elección correcta para dormitorios y escaleras, y lo diremos aunque sea lo más barato que vendemos.

**Lista de precios completa**
| Producto | Oferta /m² | Montaje /m² | Todo en /m² |
|---|---|---|---|
| Laminado, 8 mm | £ 16 | £ 18 | 34€ |
| LVT, haga clic en | £38 | £ 22 | 60€ |
| LVT, pegar | £ 42 | £ 28 | 70€ |
| Roble reconstituido, 14 mm | £ 52 | £ 24 | £76 |
| Roble natural macizo | £62 | £ 24 | £86 |
| Roble ahumado, contrachapado | £ 74 | £ 24 | 98€ |
| Espiga de roble | £ 88 | £38 | 126€ |
| nogal americano | £96 | £ 24 | 120€ |
| Alfombra de lana, 80/20 | £34 | £ 14 | £48 |

Extras: `Base de £6 a £14/m² según el tipo · Compuesto autonivelante £18/m² donde sea necesario · Levantamiento y eliminación del suelo existente £8/m² · Listones y umbrales desde £12 por metro · Transporte de muebles, gratis`

**Franja de grano** — `Nuestro roble proviene de bosques europeos certificados FSC, principalmente Francia y Croacia, y es secado en horno al ocho por ciento antes de que llegue a nosotros. Mantenemos existencias en lugar de realizar pedidos por trabajo, por lo que generalmente podemos entregarlas en dos semanas.`

**Honestidad del contrapiso** — H2 `Por qué una cotización puede cambiar una vez que aparece el piso viejo`
`Nadie sabe qué hay debajo de su piso actual, incluidos nosotros. La mayoría de las veces está bien. De vez en cuando hay una regla que se ha agrietado, tablas que se han podrido en los bordes o una diferencia de nivel de veinte milímetros en una habitación que estaba oculta debajo de una alfombra.`
`Tomamos lecturas de humedad y comprobamos los niveles en el sondeo, que detecta la mayor parte. Si algo aparece una vez que levantamos el piso viejo, nos detenemos, te lo mostramos y cotizamos el trabajo adicional antes de continuar. Nunca continuamos ni le facturamos al final, y el compuesto nivelador cuesta £ 18 por cuadrado.El medidor es la sorpresa más común.`

**Proceso de montaje**
1. **Encuesta gratuita**: medimos, tomamos lecturas de humedad en tres lugares, comprobamos el nivel del subsuelo y analizamos qué producto se adapta realmente a la habitación. Unos cuarenta minutos.
2. **Cotización**: desglosado en dos días hábiles: suministro, ajuste, base, preparación, rebordeado y eliminación como líneas separadas.
3. **Aclimatación** — La madera se entrega y se deja en la habitación durante siete días antes de instalarla. Saltarse esto es la razón por la que los pisos se ahuecan y se separan, y cualquier instalador que se ofrezca a omitirlo le está diciendo algo.
4. **Ajuste**: de uno a tres días para la mayoría de los hogares. Trabajamos habitación por habitación para que conserves el uso de la casa.
5. **Acabado y limpieza** — Rebordes, umbrales, una limpieza completa y un paquete de cuidado con el limpiador adecuado para su tipo de piso.

**Cuidados y garantías** — `Garantía de desgaste de veinticinco años en madera maciza y de ingeniería, veinte en LVT, diez en laminado. Cubre la capa de desgaste que falla durante el uso doméstico normal. No cubre daños por agua, garras de mascotas, arrastrar muebles ni trapeadores a vapor, y los trapeadores a vapor son los que matan más pisos de madera que todo lo demás combinado.`

**Proyectos recientes**
1. **Terraza victoriana, toda la planta baja** — Nottingham — 52 m² en forma de espina de roble, cinco días en el sitio, incluida la nivelación.
2. **Cocina y servicios públicos de nueva construcción** — West Bridgford — LVT pegado de 31 m² sobre calefacción por suelo radiante, dos días.
3. **Semi, escaleras y rellano de los años 30** — Beeston — Alfombra de lana de 22 m² con madera de roble en el rellano, un día y medio. 

**Encuesta gratuita** — Formulario: Nombre / Código postal / Teléfono / Cuántas habitaciones / Área aproximada en m² si se conoce / Qué está caído en este momento → [Botón] `Reservar una encuesta gratuita`
Nota: `La encuesta es realmente gratuita y no hay obligación. Le diremos si un producto más barato es el adecuado para la habitación, y preferimos hacerlo antes que venderle nogal para alquilarlo.`

**Pie de página** — GRAINHOUSE FLOORING · `Los precios incluyen los accesorios. La encuesta es gratuita.` · `Sala de exposición: 210 Alfreton Road, Nottingham NG7 3NR` · `0115 555 0163` · Proveedor certificado FSC C142880 · Lunes a viernes de 8:30 a 17:30, sábados de 9:00 a 16:00 ·© 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
