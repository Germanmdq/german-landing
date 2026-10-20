# Cog & Chain — Mensaje del sitio web de la tienda de bicicletas

## 1. Declaración de objetivos
Crear un sitio web de tienda de bicicletas que sea el primer taller para **Cog & Chain**, definido por grafito, chartreuse de alta visibilidad y sin mecánica condensada, liderando con una reserva de servicio y una respuesta de taller en vivo en lugar de un catálogo de productos en el que nadie compra.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(220, 12%, 11%);      /* #191b1f graphite */
  --foreground: hsl(210, 14%, 94%);      /* #edeff2 */
  --primary: hsl(74, 92%, 54%);          /* #cbf01c hi-vis chartreuse */
  --primary-foreground: hsl(220, 14%, 9%);
  --muted-foreground: hsl(214, 8%, 56%);
  --border: hsl(220, 10%, 21%);
  --card: hsl(220, 11%, 14%);
  --card-elevated: hsl(220, 10%, 18%);
  --steel: hsl(200, 12%, 62%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Saira Condensado 800, mayúsculas, clamp(44px, 6.4vw, 96px), espacio entre letras 0,005em, altura de línea 0,94
- **H2:** Saira Condensado 700, mayúsculas, 32–52px
- **H3:** Saira Condensado 600, 19–22px
- **Cuerpo:** Inter 300–400, 16px, altura de línea 1.7
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0,2em, 11px, chartreuse
- **Precios / plazos / equipo ratios:** Saira Condensed 800, tabular-nums

## 5. Efectos visuales

**Efecto 1: selector de nivel de servicio con respuesta en vivo.** Cuatro niveles de servicio donde al seleccionar uno se muestra lo que se incluye, el precio y una línea de respuesta en vivo calculada a partir de la cola de taller actual. El número de cola es una variable en la parte superior del archivo para que la tienda pueda actualizarlo diariamente.

```tsx
const QUEUE_DAYS = 4; // shop updates this daily
const tiers = [
  { id: 'safety',  name: 'Safety check',   price: 25,  hours: 0.5, items: ['Brakes', 'Gears', 'Tyres', 'Bolt torque check'] },
  { id: 'minor',   name: 'Minor service',  price: 65,  hours: 1.5, items: ['Everything in safety check', 'Gear and brake adjust', 'Drivetrain clean', 'Wheel true'] },
  { id: 'major',   name: 'Major service',  price: 130, hours: 3,   items: ['Everything in minor', 'Full strip and rebuild', 'New cables and housing', 'Bearing service'] },
  { id: 'custom',  name: 'Custom build',   price: 260, hours: 6,   items: ['Frame prep and facing', 'Full build from parts', 'Bearing prep and torque log', 'Two free follow-ups'] },
];
const [sel, setSel] = useState('minor');
const t = tiers.find(x => x.id === sel);

<p className="mt-4 font-display text-2xl">
  £{t.price} · ready in about <span className="text-[var(--primary)]">{QUEUE_DAYS + Math.ceil(t.hours / 6)} days</span>
</p>
```

**Efecto 2: Divisor de eslabones de cadena Chartreuse.** Un patrón SVG repetido de eslabones de cadena simplificados que se ejecutan horizontalmente entre las secciones principales, animando su "posición de fondo" lentamente para sugerir una cadena en movimiento, con un respaldo de movimiento reducido que la mantiene. static.

## 6. Desglose de componentes

1. **Barra de navegación**: 72 píxeles, fijo, grafito con desenfoque, borde inferior chartreuse de 2 píxeles después del desplazamiento. Marca denominativa a la izquierda, centro de enlaces, botón cuadrado chartreuse "Reservar un servicio" a la derecha.
2. **Héroe**: fotografía del taller de 88 vh, sin bordes y con degradado hacia la izquierda. Ceja, H1 mayúscula condensada, sublínea, dos CTA, cuatro datos de la tienda. *Imagen: taller de bicicletas con una bicicleta en un puesto de reparación, herramientas en una pared con tablero perforado, luz baja enfocada con una potente lámpara de trabajo, mecánica y detallada.*
3. **Tira de estado del taller**: entrega actual en días, si las reparaciones el mismo día están disponibles hoy, yel número en la cola.
4. **Niveles de servicio**: la interacción principal (efecto 1) con una reserva CTA.
5. **Reparaciones individuales**: una lista de precios de trabajos comunes: pinchazo, purga de frenos, cable de cambio, ajuste de rueda, pedalier, juego de dirección, configuración sin cámara, manguera hidráulica.
6. **Bicicletas que vendemos**: tres categorías con rangos de precios en lugar de una tabla de productos: de cercanías, de grava y reacondicionadas de segunda mano.
7. **Programa de segunda mano**: el diferenciador: lo que el taller le hace a cada bicicleta usada antes de venderla, con una declaración de garantía.
8. **Montaje de bicicletas** — dos niveles, duración y precio, con lo que se mide.
9. **Filosofía del taller**: una breve sección obstinada sobre lo que el taller hará y no hará, incluido el rechazo de reparaciones inseguras.
10. **Paseos en clubes**: compre los detalles de los viajes del sábado, los grupos de ritmo y el tablero de ruta.
11. **Encuéntranos**: dirección, horario, si puedes venir sin reserva y estacionamiento para bicicletas.
12. **Pie de página** — casi negro, regla superior chartreuse, tres columnas, acreditación Cytech.

## 7. Animaciones
- Héroe: H1 se revela con un clipPath limpieza de línea, 0,75 s, escalonado 0,08 s
- Divisor de cadena: `fondo-posición` cambia continuamente, 20 s lineal, seguridad de movimiento reducido
- Niveles de servicio: el nivel seleccionado obtiene un borde chartreuse de 2px y levanta `-3px`; intercambios de lista incluidos con AnimatePresence, 0.25s
- Cifra de respuesta: se vuelve a montar y se desvanece con el cambio, 0.2s
- Filas de precios de reparación: se desvanecen en 0.03s escalonados; pasar el cursor desplaza el precio 4 px hacia la izquierda
- Todo es rápido y mecánico: no hay disminución por encima de 0,4 s excepto el héroe

## 8. Responsive
- **Móvil (<768px):** hamburguesa; H1 se fija a 44px; la franja de estado se convierte en dos líneas apiladas; los niveles de servicio se convierten en una fila de tarjetas desplazables horizontalmente con el detalle debajo; la lista de reparaciones mantiene dos columnas de trabajo y precio; `Reservar un servicio` fijado como una barra inferior adhesiva.
- **Tableta:** niveles 2x2, reparaciones 2 columnas, bicicletas 3 columnas.
- **Escritorio:** ancho máximo 1200 px, `px-16`, `py-20`.

## 9. Completo Copy

**Marca:** COG & CHAIN · Tienda y taller de bicicletas ·Manchester

**Navbar:** Taller · Reparaciones · Bicicletas · Segunda mano · Montaje · Encuéntranos · [Botón] Reservar un Servicio

**Hero**
- Ceja: `MANCHESTER · TALLER PRIMERO · ACREDITADO CYTECH · DESDE 2011`
- H1: `NOSOTROS REPARAR BICICLETAS. TAMBIÉN LOS VENDEMOS.`
- Sublínea: `Un taller con tienda anexa y no al revés. Tres mecánicos de Cytech, tiempos de respuesta honestos y le diremos cuando una reparación no vale la pena.`
- CTA: `Reserve un servicio` · `Ver precios de reparación`
- Datos: `3 mecánicos de Cytech` · `Pinchazos el mismo día` · `Garantía de segunda mano` · `Primero gratis check-up`

**Estado del taller:** `Plazo actual: 4 días · Pinchazos y reparación de frenos el mismo día hasta las 4:00 p.m. · 11 bicicletas en la cola`

**Niveles de servicio**
- **Control de seguridad — £25** — Control de frenos, cambios, neumáticos y torque de pernos. Treinta minutos, normalmente mientras espera.
- **Servicio menor: £65**: todo lo incluido en la revisión de seguridad, además de ajuste de engranajes y frenos, limpieza de la transmisión y alineación de las ruedas.
- **Servicio mayor: £130**: todo en el menor, además de un desmontaje y reconstrucción completos, cables y carcasas nuevos, y servicio de rodamientos completo.
- **Construcción personalizada: desde £ 260** — Preparación y revestimiento del cuadro, construcción completa a partir de sus piezas, preparación de rodamientos con un registro de torsión y dos ajustes de seguimiento gratuitos. 

**Reparaciones individuales**
`Reparación de pinchazos £12` · `Reemplazo de tubo £15` · `Reemplazo de pastillas de freno, por rueda £18` · `Purga de freno hidráulico, por freno £30` · `Cable de cambio y carcasa £22` · `Cable de freno y carcasa £20` · `Rueda verdadera £20` · `Reemplazo de radios £8 cada uno` · `Reemplazo del pedalier £35 más pieza` · `Servicio de auriculares £40` · `Configuración sin cámara, por rueda £25` · `Acortamiento de manguera hidráulica £28` · `Cadena y casete £30 más piezas` · `Embalaje de caja de bicicleta £45`

**Bicicletas que vendemos**
1. **Viajero: £480 a £1400**: engranajes de buje, guardabarros, iluminación de dinamo y portaequipajes. Diseñado para cuatro temporadas de trabajo en lugar de para una hoja de especificaciones.
2. **Gravilla y aventura: entre £1200 y £4200**: marcos de acero y aluminio, espacio libre para 45 mm, soportes para todo. Construido a tu medidaencaja antes de que se vaya.
3. **Reacondicionado de segunda mano: entre £220 y £900**: con servicio completo, garantía y descripción honesta. Por lo general, el mejor valor en la tienda.

**Programa de segunda mano** — H2 `TODAS LAS BICICLETAS USADAS RECIBEN EL MISMO TRATAMIENTO`
`Desmontadas hasta el cuadro, rodamientos reemplazados o reempaquetados, cables y carcasa nuevos, cadena nueva, cinta de manillar o puños nuevos y un control de seguridad firmado por un mecánico de Cytech. Enumeramos la edad del cuadro, las piezas que reemplazamos y las que no. Cada bicicleta de segunda mano tiene una garantía de seis meses sobre el trabajo y un servicio gratuito a las seis semanas.`

**Montaje de bicicletas**
- **Ajuste básico: £60, 60 minutos** — Altura y retroceso del sillín, altura y alcance de la barra, posición de las calas. Lo mejor para quienes viajan diariamente y para cualquiera que tenga una bicicleta nueva.
- **Ajuste completo: £150, 2,5 horas** — Todo lo básico, además de flexibilidad y evaluación pélvica, análisis de video en tres planos y un informe escrito con los números para que puedas replicarlo en otra bicicleta.

**Filosofía del taller** — H2 `COSAS QUE HAREMOS Y NO HARAMOS DO`
1. `Te avisaremos cuando una reparación cueste más de lo que vale la moto.` Ocurre semanalmente y preferiríamos perder el trabajo.
2. `No entregaremos una bicicleta que consideremos insegura.` Si un cuadro está roto, le mostraremos dónde y nos negaremos a reconstruirlo.
3. `Hacemos mantenimiento a bicicletas que no vendimos, al mismo precio.` Una tienda que cobra más por las bicicletas de otras personas te está diciendo algo.
4. `Le mostramos la pieza antigua.` Cada componente reemplazado va en una bandeja con su nombre para que pueda ver lo que pagó.

**Viajes al club** — `Viaje a la tienda los sábados, sale a las 8:30 a. m. desde fuera de la tienda. Tres grupos de ritmo: 15 mph social, 17 mph constante y un grupo rápido del que no asumimos ninguna responsabilidad. Panel de ruta en la ventanilla todos los jueves, parada en un café siempre incluida y nadie se queda atrás en los dos primeros grupos.`

**Encuéntrenos** — `44 Chapel Street, Salford, Manchester M3 5DF` · Martes a viernes de 9:00 a 18:00 · Sábados de 9:00 a 17:00 · Dom y lunes cerrado
`Acérquese sin reserva para pinchazos, frenos ajustes y cualquier cosa menos de quince minutos. Todo lo demás, reserva.Te ahorra un viaje perdido. Estacionamiento cubierto para bicicletas en el patio trasero.`

**Pie de página** — COG & CHAIN ​​· `Reparamos bicicletas. También los vendemos.` · `0161 555 0173` · Taller acreditado Cytech Nivel 3 · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
