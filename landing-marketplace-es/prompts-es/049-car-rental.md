# Roadline Rentals: mensaje del sitio web de alquiler de automóviles

## 1. Declaración de objetivos
Cree un sitio web de alquiler de automóviles rápido y sensato para **Roadline Rentals**, definido por un blanco limpio, un cobalto seguro y un sans geométrico ajustado, construido alrededor de una barra de búsqueda y una cuadrícula de flota, con la política de exceso y combustible indicada en la página en lugar de en un PDF. opens.

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(210, 22%, 98%);      /* #f9fbfc */
  --foreground: hsl(220, 30%, 14%);      /* #19202e */
  --primary: hsl(222, 84%, 48%);         /* #1450e0 cobalt */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(220, 8%, 46%);
  --border: hsl(212, 18%, 89%);
  --card: hsl(210, 26%, 95%);
  --accent-go: hsl(150, 58%, 40%);       /* available */
  --accent-warn: hsl(32, 90%, 52%);      /* last one */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Plus Jakarta Sans 800, clamp(36px, 4.6vw, 64px), espacio entre letras -0.03em
- **H2:** Plus Jakarta Sans 700, 30–42px
- **H3 / nombres de modelo:** Plus Jakarta Sans 700, 18–21px
- **Cuerpo:** Inter 300–400, 16px, altura de línea 1.7
- **Cejas:** Inter 600, mayúscula, espaciado entre letras 0.16em, 11px, cobalto
- **Precios/asientos/puertas:** Plus Jakarta Sans 800, tabular-nums

## 5. Efectos visuales

**Efecto 1: barra de búsqueda con tarifa diaria en vivo.** Un lugar de recogida, fechas y barra de edad del conductor que calcula el número de días y muestra un total estimado debajo a medida que cambian las fechas, antes de que alguien llegue a la flota.

```tsx
const [from, setFrom] = useState(null);
const [to, setTo] = useState(null);
const days = from && to ? Math.max(1, Math.round((to - from) / 86400000)) : 0;
const cheapest = 29;

{days > 0 && (
  <motion.p
    key={days}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className="mt-4 text-sm text-[var(--muted-foreground)]"
  >
    {days} days · from <span className="font-bold text-[var(--foreground)] tabular-nums">£{days * cheapest}</span> total, all inclusive
  </motion.p>
)}
```

**Efecto 2: Tarjeta de flota con revelación de especificaciones.** Las tarjetas de vehículos, al pasar el cursor, levantan la tarjeta, escalan ligeramente la imagen y se desvanecen en una fila de especificaciones de cuatro elementos de asientos, puertas, equipaje y transmisión debajo del precio.

## 6. Desglose de componentes

1. **Barra de navegación**: 70 px, adhesivo, blanco, borde inferior de 1 px. Marca denominativa a la izquierda, centro de enlaces, teléfono y botón cobalto "Reservar ahora" a la derecha.
2. **Héroe** — 78vh, dividido. Barra de texto y búsqueda a la izquierda, imagen del vehículo a la derecha. Ceja, H1, sublínea, barra de búsqueda, cuatro puntos de confianza. *Imagen: una vista de tres cuartos del hatchback moderno y limpio sobre un fondo neutro brillante, luz natural nítida, fotografía del producto.*
3. **Trust strip**: cancelación gratuita, sin cargo por tarjeta, kilometraje ilimitado, política de combustible expresada en cuatro palabras.
4. **Flota** — la sección principal. El filtro de categorías se cruza, luego una cuadrícula de ocho tarjetas de vehículos (Efecto 2), cada una con clase, tarifa diaria, fila de especificaciones y distintivo de disponibilidad.
5. **Qué está incluido** —seis elementos que realmente están incluidos, cada uno con una marca, y tres que no lo están, cada uno con una cruz. Este bloque de honestidad es el diferenciador en una categoría basada en tarifas ocultas.
6. **Franquicia y seguro**: una tabla sencilla de los tres niveles de cobertura con el monto de la franquicia, el costo diario y lo que cubre cada uno.
7. **Política de combustible y kilometraje**: dos párrafos breves que establecen la política de combustible comparable y las excepciones de kilometraje ilimitado.
8. **Cómo funciona**: cuatro pasos desde la reserva hasta la devolución, incluidos los documentos que debes llevar.
9. **Ubicaciones**: tres sucursales con direcciones, horarios y una nota de devolución fuera de horario.
10. **Alquiler a largo plazo**: tarifas mensuales de uno a seis meses, dirigidas a contratistas y personas entre automóviles.
11. **Preguntas frecuentes**: acordeón, seis preguntas sobre conductores jóvenes, conductores adicionales, alquiler de ida, depósitos, daños y viajes transfronterizos.
12. **Pie de página**: azul marino profundo, cuatro columnas, registro de la empresa, asegurador de seguros, enlace de términos.

## 7. Animaciones
- Hero: el texto se desvanece 0,6 s; la barra de búsqueda escala de 0,98 a 1 con una sombra suave, 0,5 s
- Total estimado: se vuelve a montar y se desvanece al cambiar la fecha, 0,25 s
- Chips de filtro: transición de fondo 0,2 s; la cuadrícula vuelve a fluir con diseño de movimiento, 0.32s
- Tarjetas de flota: elevación 4px, escala de imagen 1.03, fila de especificaciones se desvanece en más de 0.25s al pasar el mouse
- Listas incluidas y excluidas: iconos de marca y cruz escala emergente 0.7 a 1, escalonado 0.05s
- Números de paso: pop escalonado 0.1s
- Todo es rápido: este es un sitio transaccional, no editorial

## 8. Responsive
- **Móvil (<768px):** hamburguesa; la imagen principal aparece debajo de la barra de búsqueda; H1 se fija a 36px; la barra de búsqueda se acumula en cuatro campos de ancho completo con un botón adhesivo "Buscar"; flota 1-col; el exceso de mesa se convierte en cartas apiladas; chips de filtro desplazables horizontalmente.
- **Tableta:** flota de 2 columnas, el héroe permanece dividido, el exceso de tabla se retiene.
- **Escritorio:** flota de 4 columnas, ancho máximo 1240px, `px-16`, `py-20`.

## 9. Completo Copy

**Marca:** ROADLINE RENTALS · Alquiler de coches · Manchester, Leeds yLiverpool

**Navbar:** Flota · Incluido · Seguro · Ubicaciones · Largo plazo · `0161 555 0192` · [Botón] Reservar Ahora

**Hero**
- Ceja: `MANCHESTER · LEEDS · LIVERPOOL · DESDE £29 AL DÍA, TODOS IN`
- H1: `El precio que ves es el precio que pagas.`
- Sublínea: `Alquiler de coches independiente en todo el noroeste. Kilometraje ilimitado, combustible comparable y un exceso que puedes ver antes de reservar y no en el mostrador.`
- Barra de búsqueda: `Lugar de recogida` · `Desde` · `Hasta` · `Edad del conductor` · [Botón] `Buscar`
- Puntos de confianza: `Cancelación gratuita hasta 24h` · `Sin cargo por tarjeta` · `Millaje ilimitado` · `Combustible lleno a lleno`

**Flota** — Ceja `LA FLOTA` — H2 `Ocho coches, sin sorpresas`
Filtros: `Todos` · `Pequeño` · `Estate` · `SUV` · `Van` · `Eléctrico`

1. **Económico — Vauxhall Corsa o similar** — £29 por día — 5 asientos · 5 puertas · 1 bolso grande · Manual — *Disponible*
2. **Compacto — Ford Focus o similar** — £34 al día — 5 asientos · 5 puertas · 2 maletas grandes · Manual — *Disponible*
3. **Compacto Automático — Toyota Corolla o similar** — £42 al día — 5 asientos · 5 puertas · 2 maletas grandes · Automático — *Disponible*
4. **Estate — Skoda Octavia Estate o similar** — £48 por día — 5 asientos · 5 puertas · 4 maletas grandes · Manual — *Quedan 2*
5. **SUV — Nissan Qashqai o similar** — £55 al día — 5 asientos · 5 puertas · 3 maletas grandes · Automático — *Disponible*
6. **7 plazas — Peugeot 5008 o similar** — £72 al día — 7 plazas · 5 puertas · 3 maletas grandes · Automático — *Queda 1*
7. **Eléctrico — MG4 o similar** — £52 por día — 5 asientos · 5 puertas · 2 maletas grandes · Automático, alcance de 280 millas — *Disponible*
8. **Furgoneta pequeña — Ford Transit Custom** — £58 por día — 3 asientos · 6,8 metros cúbicos · Manual — *Disponible*

**Qué está incluido** — H2 `Lo que realmente cubre la tarifa diaria`
Incluye: `Kilometraje ilimitado` · `Terceros, incendio y robo` · `Exención de responsabilidad por daños por colisión con franquicia estándar` · `Cobertura contra averías, En todo el Reino Unido` · `Un conductor adicional designado` · `IVA`
No incluido: `Reducción de exceso, que es opcional y tiene un precio inferior` · `Asientos para niños, £6 por día` · `Adicionalconductores posteriores al primero, £8 por día`

**Franquicia y seguro**
| Nivel de cobertura | Exceso | Costo diario | Cubiertas |
|---|---|---|---|
| Estándar | £ 1.200 | Incluido | Carrocería y terceros |
| Reducido | £ 350 | £ 11 por día | Carrocería a terceros, cristales y espejos |
| Cero | £0 | £ 19 por día | Todo lo anterior más neumáticos, tren de aterrizaje y techo |

Nota: `Tomamos una preautorización del monto excedente en una tarjeta de crédito en el momento de la recogida, que se libera dentro de los cinco días hábiles posteriores a la devolución. No aceptamos depósitos en efectivo y no aceptamos tarjetas prepagas, lo cual es estándar en toda la industria y vale la pena conocerlo antes de conducir hasta la sucursal.`

**Combustible y kilometraje** — `Lleno a lleno. Lo recoges lleno, lo traes lleno y, si no lo haces, te cobramos el precio del surtidor más una tarifa de repostaje de £15 en lugar de una tarifa inventada. Hay una gasolinera a cuatrocientos metros de cada sucursal. `
`El kilometraje es ilimitado en todos los vehículos alquilados en el Reino Unido. La única excepción son los alquileres unidireccionales de más de trescientas millas, donde se aplica una tarifa de reubicación y se cotiza antes de confirmar.`

**Cómo funciona**
1. **Reservar**: en línea en aproximadamente dos minutos. Cancelación gratuita hasta veinticuatro horas antes de la recogida.
2. **Traiga**: su licencia de conducir, una tarjeta de crédito a nombre del conductor principal y un código de verificación DVLA si su licencia es emitida en el Reino Unido.
3. **Recoger**: quince minutos en el mostrador, incluida la visita guiada. Fotografiamos el coche contigo y te enviamos las imágenes por correo electrónico.
4. **Devolución**: deja las llaves en el escritorio o en la caja fuera de horario. Inspeccionamos en un plazo de veinticuatro horas y le enviamos el resultado por correo electrónico de cualquier manera.

**Ubicaciones**
- **Manchester** — `Unit 3, Ashton Old Road, Manchester M11 2DP` · Lunes a viernes de 7:30 a 19:00, sábados de 8:00 a 17:00, domingos 9:00–15:00
- **Leeds** — `440 Kirkstall Road, Leeds LS4 2HQ` · lunes a viernes 8:00–18:30, sábado 8:30–16:00, domingo cerrado
- **Liverpool** — `12 Great Howard Street, Liverpool L3 7HS` · lunes a viernes 8:00–18:00, sábado 9:00–15:00, domingo cerrado
Nota: `Devolución fuera de horario en las tres sucursales a través de la caja de llaves.El alquiler finaliza cuando se entrega la llave, no a la mañana siguiente.`

**Alquiler a largo plazo** — `Un mes £680 · Dos meses £1290 · Tres meses £1850 · Seis meses £3400, en una automática compacta. Incluye revisión, neumáticos y cobertura de averías. Popular entre los contratistas, las personas entre automóviles y cualquiera que espere once meses para obtener un espacio de entrega.`

**FAQ**
1. **¿Puedo alquilar a las 21?** — Sí, solo en las clases económica y compacta, con un recargo de £14 por día para conductores jóvenes. Menores de 21 años no podemos asegurar.
2. **¿Puedo agregar otro controlador?** — Uno está incluido. Los conductores adicionales cuestan £8 por día cada uno y deben estar presentes en el momento de la recogida con su licencia.
3. **¿Realizan contrataciones unidireccionales?** — Entre nuestras tres sucursales, sí, por una tarifa de reubicación de £45. En otros lugares, no.
4. **¿Qué depósito se requiere?** — Una preautorización equivalente a su exceso, en una tarjeta de crédito a nombre del conductor principal. Lanzado dentro de cinco días hábiles.
5. **¿Qué pasa si lo daño?** — Te mostramos las fotografías de la recogida, cotizamos la reparación y cobramos hasta tu exceso. Sin tarifa administrativa más allá de la reparación en sí.
6. **¿Puedo llevarlo al extranjero?** — A Irlanda sí, con catorce días de antelación y una tarifa de documentación de £60. Europa continental, no.

**Pie de página** — ROADLINE RENTALS · `El precio que ves es el precio que pagas.` · `0161 555 0192` · Registro de empresa 09442018 · Seguro suscrito por Northbridge Motor · Términos y condiciones · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "react-day-picker": "^9.0.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
