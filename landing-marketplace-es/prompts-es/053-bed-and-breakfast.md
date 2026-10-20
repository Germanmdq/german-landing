# The Wrenhouse — Aviso del sitio web de Bed & Breakfast

## 1. Declaración de objetivos
Crear un sitio web de Bed and Breakfast cálido, silencioso y seguro para **The Wrenhouse**, definido por yeso suave, verde profundo y una excelente serif de transición: un sitio de B&B de cinco habitaciones construido alrededor de un selector de habitaciones y detalles honestos sobre la casa en lugar de un lenguaje de hospitalidad estándar.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(38, 26%, 95%);       /* #f6f1e9 plaster */
  --foreground: hsl(156, 22%, 15%);      /* #1e2f28 heritage ink */
  --primary: hsl(156, 30%, 26%);         /* #2f5647 heritage green */
  --primary-foreground: hsl(38, 26%, 97%);
  --muted-foreground: hsl(156, 6%, 45%);
  --border: hsl(36, 16%, 86%);
  --card: hsl(38, 28%, 91%);
  --accent-brass: hsl(38, 44%, 56%);     /* brass fittings */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Fraunces 400, clamp(38px, 4.8vw, 66px), altura de línea 1.1
- **H2:** Fraunces 400, 30–44px
- **H3 / nombres de habitaciones:** Fraunces 600, 20–24px
- **Cuerpo:** Inter 300, 17px, altura de línea 1.8
- **Cejas:** Inter 500, mayúsculas, espacio entre letras 0.22em, 11px, latón
- **Precios/tamaños de habitación:** Fraunces 600, números tabulares

## 5. Visual Efectos

**Efecto 1: Selector de habitación con imágenes de desvanecimiento cruzado.** Cinco nombres de habitaciones en una lista serif. Al pasar el cursor sobre uno o tocar uno, se atenúan los demás y se difumina una fotografía de altura completa de la habitación al lado, con la tarifa, el tipo de cama, la disposición del baño y el intercambio de vistas debajo.

```tsx
const rooms = [
  { id: 'wren',    name: 'The Wren',    rate: 145, bed: 'King',       bath: 'Ensuite shower',  view: 'Over the orchard' },
  { id: 'swift',   name: 'The Swift',   rate: 165, bed: 'Super king', bath: 'Ensuite bath',    view: 'South, over the valley' },
  { id: 'martin',  name: 'The Martin',  rate: 135, bed: 'Double',     bath: 'Private, across the hall', view: 'The kitchen garden' },
  { id: 'linnet',  name: 'The Linnet',  rate: 125, bed: 'Twin',       bath: 'Ensuite shower',  view: 'The courtyard' },
  { id: 'kestrel', name: 'The Kestrel', rate: 195, bed: 'King, sofa', bath: 'Ensuite bath and shower', view: 'Two aspects, west' },
];
const [sel, setSel] = useState('wren');
const r = rooms.find(x => x.id === sel);

<AnimatePresence mode="wait">
  <motion.img
    key={sel}
    src=""
    alt="Guest room at the bed and breakfast"
    initial={{ opacity: 0, scale: 1.03 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="absolute inset-0 h-full w-full object-cover object-center"
  />
</AnimatePresence>
```
Resumen para los medios de comunicación para la imagen de cada habitación: cálido dormitorio de invitados campestre con luz natural, ropa de cama de lino, muebles de madera, espacio ordenado y invitando.

**Efecto 2: Revelación de regla de latón.** Una regla de latón fina debajo de cada título de sección, escalando desde la izquierda durante 0,8 segundos al entrar en desplazamiento.

## 6. Desglose de componentes

1. **Barra de navegación**: 80 px, adhesivo, yeso con borde inferior de 1 px en el desplazamiento. Marca denominativa serif centrada con la navegación dividida hacia la izquierda y hacia la derecha, botón de contorno de latón "Verificar disponibilidad" en el extremo derecho.
2. **Héroe** — 88vh, exterior de la casa sin bordes y con un gradiente de yeso en la parte inferior. Ceja, serif H1, sublínea, dos CTA. *Imagen: exterior de una casa de campo de piedra a la luz del atardecer, rosas trepadoras, camino de grava, cálido y habitado.*
3. **Declaración de bienvenida**: un único párrafo centrado en Fraunces a 26 px, firmado por los propietarios.
4. **Habitaciones**: la interacción principal (efecto 1) con un CTA de libro por habitación.
5.**Desayuno**: la sección en la que un B&B vive o muere: qué se sirve realmente, de dónde provienen los huevos, horarios de servicio y manejo dietético.
6. **La casa** — tres bloques cortos en la sala de estar, el jardín y el bar de autoservicio, cada uno con una imagen.
7. **Qué hay cerca**: cuatro paseos y cuatro lugares para comer con distancias y opiniones honestas de una sola línea.
8. **Información práctica**: ventana de check-in, estacionamiento, perros, niños, intensidad de wifi y acceso a escaleras, todo indicado claramente.
9. **Tarifas y estadías mínimas**: una tabla por habitación y temporada con la regla de fin de semana de dos noches indicada abiertamente.
10. **Reseñas**: tres citas que nombran la habitación en la que nos hospedamos.
11. **Reserva**: selector de fecha, selector de habitación y una nota de que reservar directamente es más barato que las plataformas.
12. **Pie de página**: verde heredado, tres columnas, dirección, what3words y los nombres de los propietarios.

## 7. Animaciones
- Hero: la imagen escala de 1,05 a 1 en 14 s; H1 se desvanece 0,85 s
- Reglas de latón: escalaX 0 a 1, 0,8s, origenX izquierda
- Lista de habitaciones: transiciones de color de nombre 0,3s; fundidos cruzados de imagen con una escala de 1.03, 0.6s
- Líneas de detalle debajo del intercambio de lista de habitaciones con AnimatePresence, 0.28s
- Bloques de casas: las imágenes se deslizan desde lados alternos, 0.85s
- Filas cercanas: desvanecimiento escalonado 0.06s
- El movimiento es lento y pausado en todo momento

## 8. Responsive
- **Móvil (<768px):** hamburguesa; se conserva la marca denominativa centrada; H1 se fija a 38 px; el selector de habitación se convierte en tarjetas apiladas con la imagen encima de cada conjunto de detalles, ya que el desplazamiento no existe al tacto; la tabla de tarifas se convierte en filas apiladas; `Verificar disponibilidad` fijado como una barra inferior adhesiva. 
- **Tableta:** el selector de habitación mantiene el diseño dividido a una altura de imagen reducida; bloques de casas 2-col.
- **Escritorio:** ancho máximo 1160px, `px-16`, `py-24`.

## 9. Copia completa

**Marca:** THE WRENHOUSE · Bed and breakfast · Cerca de Hay-on-Wye, Herefordshire

**Navbar:** Habitaciones · Desayuno · La Casa · Cerca · Tarifas · [Botón] Consultar Disponibilidad

**Hero**
- Ceja: `HEREFORDSHIRE · CINCO HABITACIONES · ADULTOS YMAYORES DE 12 AÑOS · NO SÁBADOS DE UNA SOLA NOCHE`
- H1: `Cinco habitaciones, un desayuno muy bueno.`
- Sublínea: `Un pequeño bed and breakfast en una casa de piedra del siglo XVII a cuatro millas de Hay-on-Wye. Cinco habitaciones, una chimenea adecuada en la sala de estar y huevos de las once gallinas al final del jardín.`
- CTA: `Ver disponibilidad` · `Ver las habitaciones`

**Bienvenido** — `Compramos la casa en 2011 sin intención de administrar un bed and breakfast, y luego pasamos cuatro años restaurándola y nos dimos cuenta de que era demasiado grande para dos personas. Catorce años después, todavía cocinamos todos los desayunos nosotros mismos.`
Firmado: `— Ruth y Alec Warrender`

**Habitaciones** — Ceja `THE ROOMS` — H2 `Cinco, todas diferentes`
1. **The Wren** — £145 por noche — Cama King · Ducha en suite · Sobre el huerto — La más pequeña de las dobles y la que tiene la mejor luz de la mañana. Luz de cruce en la puerta, que mencionamos porque los invitados altos aprecian la advertencia.
2. **The Swift** — £165 por noche — Super king · Baño privado con bañera con patas · Sur, sobre el valle — La habitación que la mayoría de la gente reserva dos veces. Techo inclinado, asiento profundo junto a la ventana y el baño está debajo de la ventana.
3. **The Martin** — £135 por noche — Doble · Baño privado al otro lado del pasillo · La huerta — El baño no es privado, por lo que es la habitación más barata. También es completamente tuyo y nadie más pasa por la puerta.
4. **The Linnet** — £125 por noche — Doble · Ducha en suite · El patio — Dos camas individuales adecuadas en lugar de una con cremallera y enlace. Popular entre amigos que viajan juntos y entre caminantes que roncan.
5. **The Kestrel** — £195 por noche — Cama King con sofá · Baño privado y ducha separada — La habitación más grande, en esquina con dos aspectos. Espacio suficiente para una tercera persona en el sofá cama por £30.

**Desayuno** — Ceja `DESAYUNO` — H2 `Servido entre las ocho y las nueve y media`
`Huevos de nuestras propias gallinas, salchichas y tocino del carnicero de Hay, pan horneado aquí la mañana que lo comes y tomates del invernadero entre junio y septiembre. Hay un desayuno caliente, un eglefino ahumado, una versión vegetariana que no pasa desapercibida,y gachas con lo que haya en el huerto.`
`Cuéntanos tus alergias y preferencias cuando hagas la reserva y no en la mesa y lo solucionaremos de verdad. No hacemos buffet, porque un buffet en cinco habitaciones es simplemente comida que se queda afuera y se enfría.`

**La casa**
1. **La sala de estar** — Chimenea a partir de octubre, dos sofás, muchos libros y sin televisión. Los invitados lo usan más de lo que esperábamos.
2. **El jardín**: un acre, en su mayor parte amurallado, con el huerto en la parte trasera y las gallinas más allá. Hay sillas fuera desde abril.
3. **El bar de honestidad**: sidra local, una breve carta de vinos y una ginebra decente. Escribe lo que llevas en el libro y establecete al final.

**Cerca**
Caminatas: `Offa's Dyke path, desde la puerta, 2 horas` · `Hay Bluff, 15 min en auto, 3 horas` · `El río en Glasbury, 10 min en auto, una hora fácil` · `Arthur's Stone, 20 min en auto, 40 minutos`
Ecomer: `The Bull at Craswall, 12 min, vale la pena conducir` · `Chapters in Hay, 15 min, reservar con anticipación` · `The Bridge at Michaelchurch, 9 min, buena comida de pub` · `The Old Electric Shop, Hay, 15 min, almuerzo y café`

**Información práctica**
`Check-in de 4pm a 7:00 p. m., o más tarde según acuerdo · Salida a las 10:30 a. m. · Estacionamiento gratuito para seis autos · Perros solo en The Linnet, £ 15 por estadía · Niños mayores de 12 años bienvenidos · Wifi es bueno en la casa y pobre en el jardín · Dos tramos de escaleras, sin ascensor, y le diremos honestamente si eso es un problema · No fumar en ningún lugar, incluido el jardín`

**Tarifas**
| Habitación | Temporada baja | Temporada alta | Estancia mínima |
|---|---|---|---|
| El Martín | £ 125 | £ 145 | 1 noche, 2 fines de semana |
| El pardillo | £ 125 | £ 140 | 1 noche, 2 fines de semana |
| El reyezuelo | £ 145 | £ 165 | 1 noche, 2 fines de semana |
| El veloz | £ 165 | £ 185 | 2 noches fines de semana |
| El Cernícalo | £ 195 | £ 220 | 2 noches fines de semana |

Nota: `Todas las tarifas incluyen desayuno para dos. La temporada alta es de abril a septiembre más el Hay Festival. No aceptamos reservas para una sola noche los sábados, lo cual sabemos que es molesto y que esla única forma en que funcionan cinco habitaciones.`

**Reseñas**
1. "Ruth preguntó en la reserva sobre mi cosa con el trigo y luego, sin que se lo pidieran, preparó cuatro mañanas de desayunos completamente diferentes. Me he alojado en hoteles que no podían gestionar uno.` — **Fiona T.**, The Swift
2. `Cogimos la habitación barata con el baño al otro lado del pasillo esperando un compromiso. Es una habitación mejor que la mayoría de las suites por las que he pagado el doble.` — **Dan H.**, The Martin
3. "No tener televisión en el salón es la mejor decisión que se ha tomado respecto a una casa de huéspedes. Hablamos con extraños. Fue encantador.` — **Marek y Ola**, The Kestrel

**Booking** — `La reserva directa es más barata que las plataformas, porque tardan entre un quince y un dieciocho por ciento y preferiríamos que lo tuvieras. Utilice el formulario o llámenos; alguien responde.`

**Pie de página** — THE WRENHOUSE · `Cinco habitaciones, un desayuno muy bueno.` · `Bacton, cerca de Hay-on-Wye, Herefordshire HR2 0AP` · what3words: `orchard.hens.kettle` · `01981 555 0129` · Ruth y Alec Warrender · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "react-day-picker": "^9.0.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
