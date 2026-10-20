# Beacon Towing — Aviso del sitio web de la compañía de remolque

## 1. Declaración de objetivos
Cree un sitio web rápido y tranquilizador para **Beacon Towing**, un servicio de recuperación en carretera las 24 horas: casi negro con una luz de advertencia ámbar de color naranja, una baliza que gira lentamente detrás del héroe, bordes de peligro en forma de galón y un número de teléfono que es imposible pasar por alto a las tres en punto. Morning.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin mapas, sin formulario de reserva. Cada acción es un `tel:` link.

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(220, 16%, 8%);       /* asphalt black */
  --foreground: hsl(30, 20%, 95%);
  --primary: hsl(28, 96%, 54%);          /* beacon amber */
  --primary-foreground: hsl(220, 20%, 8%);
  --muted-foreground: hsl(220, 8%, 60%);
  --border: hsl(220, 12%, 18%);
  --card: hsl(220, 14%, 12%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet" />
```
- **H1 y número de teléfono:** Barlow Condensed 700, mayúsculas, clamp(58px, 10vw, 170px), altura de línea 0.88
- **H2:** Barlow Condensed 600, mayúsculas, clamp(36px, 5vw, 70px)
- **Cuerpo:** Barlow 400, 17px, altura de línea 1.6
- **Etiquetas y tiempos:** Barlow 600, 12 px, mayúsculas, espacio entre letras 0,14 em, ámbar

## 5. Efectos visuales

**Efecto 1: barrido de baliza.** Detrás del título del héroe, un amplio resplandor radial de color ámbar gira lentamente como la barra de luces de un camión de recuperación: una elipse borrosa de 900 px en 18% de opacidad, rotando 360 grados cada 9 segundos alrededor de un punto debajo de la ventana gráfica, por lo que la luz baña el texto en lugar de girar visiblemente. 

```jsx
<motion.div
  aria-hidden
  className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(28,96%,54%)] opacity-[0.18] blur-[150px]"
  animate={{ rotate: 360 }}
  style={{ transformOrigin: "50% 80%" }}
  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
/>
```

**Efecto 2: bordes de chevrón.** Las secciones están separadas por una banda de 16 píxeles de chevrones de color ámbar y negro, dibujadas con `repeating-linear-gradient(115deg, ...)`, exactamente como la parte trasera de un camión de recuperación.

**Efecto 3: Reloj de llegada.** La cifra del tiempo de respuesta se encuentra dentro de un delgado anillo ámbar que se dibuja de 0 a 100 % en 1,2 segundos cuando se desplaza a la vista, usando un círculo SVG con `pathLength`.

## 6. Componente Avería

1. **Banda Chevron** — Efecto 2, en la parte superior.
2. **Barra de navegación**: 76 píxeles, negra, marca denominativa a la izquierda con un pequeño ícono de baliza, enlaces en el centro, botón ámbar "Llamar al 0800 555 0199" a la derecha. Pegajoso.
3. **Héroe**: ventana gráfica completa. Etiqueta ámbar, H1 en dos líneas, el barrido de baliza (Efecto 1), una línea de sublínea, luego el número de teléfono configurado enorme como un enlace de toque para llamar. Abajo: tres hechos seguidos. Detrás hay una fotografía de una noche oscura con un 22% de opacidad. *Imagen: remolquecamión con luces ámbar en una autopista mojada por la noche, faros y reflejos, cinematográfico y oscuro.*
4. **Banda de respuesta**: banda ámbar, texto negro, cuatro cifras: llegada promedio, horas, radio de cobertura, años de actividad, con la cifra de llegada en el anillo (Efecto 3).
5. **Servicios**: una cuadrícula de 2×3 de tarjetas oscuras con íconos de color ámbar: recuperación de averías, recuperación de accidentes, arranque rápido, llantas pinchadas, llaves guardadas, drenaje de combustible o recarga.
6. **Lo que cuesta**: un tablero de precios simple: cinco líneas con líderes de puntos y cifras de color ámbar.
7. **Banda Chevron** divisor.
8. **Qué hacer mientras espera**: cuatro breves pasos de seguridad seguidos con grandes números delineados y escritos con calma.
9. **Cobertura**: autopistas y ciudades como pastillas con borde ámbar, más una línea alrededor del radio.
10. **Flota**: tres tarjetas con una foto, el tipo de vehículo y para qué sirve. *Resúmenes de imágenes: camión de recuperación de plataforma, camioneta de remolque comercial liviana, camión de auxilio para trabajo pesado, todo limpio y fotografiado al anochecer.*
11. **Reseñas**: tres reseñas con cinco estrellas ámbar, cotización, nombre y tipo de trabajo.
12. **Llamada final**: sección ámbar de ancho completo, texto negro: "¿DESGLOSE?" y el número de teléfono.
13. **Pie de página**: negro, letra pequeña, detalles de licencia y seguro.

## 7. Animaciones
- Hero H1: se eleva desde `y: 60`, resorte (rigidez 420, amortiguación 28), las líneas se tambalean 0.1s
- Número de teléfono: se desvanece en 0.5 desvanecimientos y, al pasar el cursor, el ámbar se ilumina
- Baliza: Efecto 1, siempre en ejecución
- Anillo de respuesta: Efecto 3
- Tarjetas de servicio: se desvanecen 18px, se tambalean 0,06s; el borde se vuelve ámbar al pasar el mouse
- Los números en la sección de seguridad usan `-webkit-text-stroke: 2px var(--primary)` con relleno transparente

## 8. Responsive
- **Móvil (<768px):** barra de llamadas de color ámbar fijada en la parte inferior de la pantalla en todo momento; H1 a 58 px; número de teléfono del héroe a 46 px; la tira de respuesta se vuelve 2×2; servicios 1 columna; la flota se convierte en una fila horizontal de desplazamiento rápido; la barra de navegación muestra una marca denominativa y un botón con ícono de teléfono de color ámbar.
- **Tableta:** servicios 2 columnas; la tira de respuesta permanece 4 de ancho.
- **Escritorio:** ancho máximo 1300px, `px-8`,espaciado de sección `py-24`.

## 9. Copia completa

**Marca:** BEACON TOWING · Recuperación 24 horas · Bristol y M4/M5

**Navbar:** Servicios · Precios · Cobertura · Reseñas — Llame al 0800 555 0199

**Hero**
- Etiqueta: `RECUPERACIÓN EN 24 HORAS · BRISTOL, M4 y M5`
- H1: `¿DESGLOSE? / YA NOS MUDAMOS.`
- Sublínea: `Contesta una persona real, te dice lo que te costará y te da un tiempo. Luego vamos a buscarte, sea cual sea la hora.`
- Teléfono: `0800 555 0199`
- Datos: `PROMEDIO 34 MINUTOS` · `PRECIO FIJO POR TELÉFONO` · `RECUPERACIÓN TOTALMENTE ASEGURADA`

**Tira de respuesta:** `34 MIN` promedio de llegada · `24/7` todos los días del año · `40 MILLAS` radio de cobertura · `19 AÑOS` recuperación de vehículos

**Servicios** — H2 `PARA LO QUE SALIMOS`
- **Recuperación de averías** — `Domicilio, carretera o autopista. Llevado a su garaje o al camino de entrada, usted elige.`
- **Recuperación de accidentes** — `Vehículos dañados y no manejables, incluido el trabajo de seguro.`
- **Arranques rápidos** — `Batería descargada en el supermercado o mientras conduce. A menudo se repara sin remolque.`
- **Llantas pinchadas** — `Repuesto instalado al borde de la carretera, o recuperado si no hay uno.`
- **Llaves guardadas** — `Entrada no destructiva donde podemos, cerrajero llamado donde no podemos.`
- **Combustible incorrecto o vacío** — `Combustible drenado y vaciado en el sitio, o diez litros traídos a usted.`

**Lo que cuesta** — H2 `PRECIOS, DICHOS EN VOZ ALTA.`
- Remolque local, hasta 10 millas ........ `£85`
- Cada milla adicional ........ `£2.40`
- Arranque rápido ........ `£55`
- Cambio de neumáticos en carretera ........ `£65`
- Drenaje de combustible incorrecto ........ `desde £185`
Nota: `Los precios incluyen el IVA y se cotizan en su totalidad por teléfono antes de partir. La recuperación de la autopista tiene un precio por trabajo; pregunte cuando llame.`

**Qué hacer mientras espera** — H2 `MIENTRAS ESTAMOS EN NUESTRO CAMINO`
- **01 — Salga de la calzada** — `Tírese lo más a la izquierda que pueda y gire las ruedas lejos de la carretera.`
- **02 — Todos afuera, detrás de la barrera** — "Salga por las puertas del pasajero y párese en el banco, no al lado de lacoche.`
- **03 — Peligros encendidos, faros encendidos** — `En la oscuridad o bajo la lluvia, deje las luces de posición encendidas también para que lo detectemos antes.`
- **04 — Indíquenos el poste marcador** — `El pequeño poste azul al costado de la carretera tiene un número. Nos lleva a usted más rápido que cualquier código postal.`

**Cobertura:** Bristol · Bath · M4 J15–J22 · M5 J14–J22 · Portishead · Clevedon · Keynsham · Thornbury · Chippenham · Weston-super-Mare · Yate · Nailsea
Línea: `Cualquier cosa más, llame de todos modos. Realizamos recuperación de larga distancia en el suroeste la mayoría de los días.`

**Flota** — H2 `TRES CAMIONES, SIEMPRE UNO GRATIS`
- **Recuperación de plataforma** — `Para automóviles modernos, vehículos eléctricos y cualquier cosa que no deba remolcarse sobre sus ruedas.`
- **Remolque comercial ligero** — `Trabajos rápidos, arranques rápidos y arreglos en la carretera.`
- **Auxilio de servicio pesado** — `Furgonetas, autocaravanas y recuperaciones en terreno blando.`

**Reseñas**
- `"Se reventó un neumático en la M5 a las 11 p.m. con dos niños en el auto. Estuvo allí en veinticinco minutos y permaneció tranquilo todo el tiempo".` — *Sarah, Portishead* — `MOTORWAY RECOVERY`
- `"Cotizó £85 por teléfono y ese fue el precio, aunque le llevó más tiempo de lo que pensaba." — *Michael, Bath* — `LOCAL TOW`
- `"Puse diésel en un automóvil de gasolina. Lo vacié en mi camino de entrada y lo conduje a la mañana siguiente."` — *Tomas, Bristol* — `MAL FUEL`

**Llamada final** — `¿AVERÍA?` · `0800 555 0199` · `Respondida por un conductor de recuperación, de día o de noche.`

**Pie de página** — BEACON TOWING · Servicios · Precios · Cobertura · Reseñas · Contacto · `Operador de recuperación autorizado · Seguro de mercancías en tránsito de £ 2 millones · Beacon Recovery Ltd, empresa núm. 07742115` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
