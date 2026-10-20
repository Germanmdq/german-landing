# Star Lanes — Mensaje del sitio web de Bowling Alley

## 1. Declaración de objetivos
Crear un sitio web de bolera estilo retro americano para **Star Lanes**, definido por verde azulado de medianoche, coral intenso y un logotipo con efecto cromado: una bolera de 1958 representada con movimiento moderno, construida para vender reservas de carriles y cumpleaños. Parties.

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(196, 42%, 11%);      /* #0f2229 midnight teal */
  --foreground: hsl(42, 44%, 94%);       /* #f6efe1 cream */
  --primary: hsl(4, 84%, 62%);           /* #f45549 hot coral */
  --primary-foreground: hsl(196, 44%, 9%);
  --muted-foreground: hsl(196, 12%, 62%);
  --border: hsl(196, 28%, 20%);
  --card: hsl(196, 38%, 15%);
  --accent-mustard: hsl(42, 88%, 58%);   /* neon mustard */
  --accent-mint: hsl(168, 56%, 56%);     /* mint neon */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
```
- **H1:** Alfa Slab One 400, mayúsculas, clamp(44px, 6.5vw, 100px), espacio entre letras -0,01em, altura de línea 0,94
- **H2:** Alfa Slab One 400, mayúsculas, 32–52px
- **H3:** Space Grotesk 700, 18–22px
- **Cuerpo:** Space Grotesk 400, 16px, altura de línea 1.7
- **Cejas:** Space Grotesk 500, mayúsculas, espacio entre letras 0.22em, 11px, mostaza
- **Puntuaciones/precios/números de carril:** Alfa Slab One, tabular-nums

## 5. Efectos visuales

**Efecto 1: el letrero de neón parpadea en la marca denominativa.** El logotipo de Star Lanes tiene un brillo de sombra de texto coral que parpadea brevemente durante la carga y luego se asienta: el clásico efecto de neón moribundo, hecho una vez para encantar en lugar de molestar.

```css
@keyframes neon-settle {
  0%, 6%, 10%, 16% { opacity: 0.35; text-shadow: none; }
  8%, 13%, 100%    { opacity: 1; text-shadow: 0 0 8px var(--primary), 0 0 22px rgba(244,85,73,0.55); }
}
.neon { animation: neon-settle 1.6s ease-out 1 both; }
@media (prefers-reduced-motion: reduce) { .neon { animation: none; opacity: 1; } }
```

**Efecto 2: cuadrícula de disponibilidad de carriles en vivo.** Doce mosaicos de carriles para el intervalo de tiempo seleccionado, cada uno de color menta gratis, coral si lo tomas. Al seleccionar una hora, la cuadrícula vuelve a fluir con un escalonamiento y al seleccionar carriles libres se agregan a un resumen de reserva.

## 6. Desglose de componentes

1. **Barra de navegación**: 76 píxeles, adhesivo, verde azulado medianoche con desenfoque, borde inferior mostaza de 2 píxeles. Marca denominativa de neón a la izquierda, enlaces en el centro, pastilla de coral "Book a Lane" a la derecha.
2. **Héroe**: fotografía de callejón sin bordes en 92 vh, con un intenso duotono verde azulado y un degradado inferior. Ceja, enorme losa H1, sublínea, dos CTA, una franja abierta hasta tarde. *Imagen: interior retro de una bolera por la noche, carriles que se alejan, letreros de neón, cálido y cambiante con colores fuertes, cinematográfico.*
3. **Reserva de carriles**: el bloque de conversión principal (Efecto 2): selector de fecha, chips de franja horaria, cuadrícula de carriles, resumen de precios, "Reservar estos carriles" CTA.
4. **Precios** — tres tarjetas: por carril por hora valle, hora punta y alquiler de calzado,con una nota sobre grupos.
5. **Ligas y eventos** — 2x2: liga de lunes, dobles de jueves, club infantil y noches corporativas, cada una con día, horario y precio.
6. **Fiestas de cumpleaños** — banda dividida: tres paquetes de fiestas con número de personas, duración, comida y precio por niño.
7. **The bar & diner**: sección más ligera invertida en `--card`: hamburguesas, alitas, batidos, lista de borradores, con una línea honesta sobre que la comida es mejor de lo necesario.
8. **Arcade**: una fila compacta de seis nombres de gabinetes arcade con una línea de precios simbólicos.
9. **Galería**: fila horizontal de cuatro imágenes de las calles, el bar y la sala de fiestas.
10. **Encuéntrenos**: dirección, horario del día, estacionamiento y una nota de accesibilidad sobre carriles con rampas y pelotas livianas.
11. **Pie de página**: verde azulado más oscuro, regla superior mostaza, tres columnas, `Est. Línea 1958`, redes sociales.

## 7. Animaciones
- Marca denominativa: el neón parpadea al cargar, una vez (Efecto 1)
- Héroe: las líneas H1 caen con `y: -30 → 0` y un ligero resorte de exceso, escalonado 0.1s
- Carril mosaicos: escalonar `i * 0.03` al cambiar de hora; escalas de mosaico seleccionadas 1.06 con un anillo de coral
- Tarjetas de precios: inclinación 3D de hasta 4 grados siguiendo el cursor en el escritorio
- Paquetes de fiesta: sin confeti mostaza: un simple levantamiento y un borde de coral al pasar el mouse
- Galería: `scroll-snap-type: x obligatorio` con una ligera escala en el centro item
- Todas las facilidades de entrada utilizan un resorte ligero en lugar de un bézier cúbico plano, que coincide con la era

## 8. Responsive
- **Móvil (<768px):** hamburguesa con una superposición verde azulado de pantalla completa; H1 se fija a 44px; la cuadrícula de carriles se convierte en 3 columnas de 4 con mosaicos más pequeños; chips de tiempo desplazables horizontalmente; pines de resumen de reservas como una barra inferior adhesiva que muestra el recuento de carriles y el total; precios 1 col; la galería mantiene el desplazamiento rápido.
- **Tableta:** cuadrícula de carriles 6x2, precios 3 columnas, fiestas 3 columnas.
- **Escritorio:** ancho máximo 1200 px, `px-16`, `py-20`.

## 9. Copia completa

**Marca:** CARRILES ESTRELLA · Est. 1958 · Akron, Ohio

**Barra de navegación:** Reserve un carril · Precios · Ligas · Fiestas · Bar y restaurante · Encuéntrenos · [Botón] Reserve unLane

**Hero**
- Ceja: `AKRON, OHIO · DOCE CARRILES · ABIERTO DESDE 1958`
- H1: `DOCE CARRILES. ACTITUD CERO.`
- Sublínea: `Carriles de madera auténtica, un restaurante que todavía hace sus propias hamburguesas y el mismo letrero de neón que colgamos en 1958. Reserva online, preséntate, juega a los bolos con tus amigos.`
- CTA: `Reserva un carril` · `Ver precios`
- Strip: `Abierto hasta medianoche los viernes y sábados · Cocina hasta las 23:00`

**Reserva de carril** — Ceja `BOOK` — H2 `ELIGE UNA HORA, ELIGE TUS CARRILES`
Horarios: `4:00 PM` · `5:00 PM` · `6:00 PM` · `7:00 PM` · `8:00 PM` · `9:00 PM` · `10:00 PM`
Nota: `Cada carril tiene capacidad para seis personas. Los zapatos cuestan tres dólares y sí, tienes que usarlos.`

**Precios**
- **Fuera de horas pico: $24 por carril/hora** — Lunes a jueves antes de las 5:00 p. m. — Hasta seis jugadores · Protectores de carril gratuitos para niños · Sin tarifa de reserva
- **Pico: $38 por carril/hora** — Viernes a domingo y después 5:00 p. m.: hasta seis jugadores de bolos · Solicitudes de carriles prioritarios · Sin cargo de reserva
- **Alquiler de zapatos: $3 por persona** — Todos los tamaños, desde niños de 10 a 16 años para hombres — Desinfectados entre cada uso · Traiga los suyos si los tiene

Nota del grupo: `Seis carriles o más, llámenos; le haremos una tarifa y le retendremos la mitad trasera del juego room.`

**Ligas y eventos**
- **Liga de lunes por la noche** — Lunes 7:30 p. m. · $18 por semana · Temporada de dieciséis semanas, puntaje de handicap, todas las habilidades. Hay un trofeo y la gente se lo toma en serio.
- **Jueves Dobles**: jueves a las 8:00 p. m. · $22 por pareja · Sin cita previa, sin compromiso de temporada, bebida incluida.
- **Star Cadets Kids Club**: sábados a las 10:00 a. m. · $12 por niño · Edades de 6 a 14 años, entrenamiento, parachoques arriba, noventa minutos.
- **Noches Corporativas** — Con cita previa · Desde $32 por cabeza · Dos horas, zapatos, un carril para ocho personas y un plato de comida.

**Fiestas de cumpleaños**
- **La Huelga — $18 por niño** — Diez niños mínimo · 90 minutos · Un carril para seis niños, zapatos, refresco ilimitado y una rebanada cada uno.
- **El Pavo — $26 por niño** — Diez niños mínimo · 2 horas · Todo lo anterior más comida caliente, fichas de juegos electrónicos y una mesa privada.
- **El perfectoJuego — $34 por niño** — Doce niños mínimo · 3 horas · Todo lo anterior más la sala de fiestas para ustedes solos, un anfitrión, servicio de pastel y una impresión fotográfica para cada niño.

**Bar y restaurante** — H2 `LA COMIDA ES MEJOR DE LO QUE TIENE QUE SER`
`Star Lanes Burger $12 · Double Chili Cheeseburger $15 · Buffalo Wings, 10 piezas $13 · Tiras de pollo y papas fritas $11 · Papas fritas cargadas $9 · Queso asado $8 · Batido malteado $7 · Root Beer Float $6`
`Seis grifos, cuatro de ellos locales. Cerveza embotellada, una lista corta de cócteles y una casa antigua que la gente pide dos veces.`

**Arcade** — `Skee-Ball` · `Air Hockey` · `Galaga` · `Pinball (tres mesas)` · `Basketball Hoops` · `Claw Machine` — `Fichas 4 por $1, o $20 por cien.`

**Encuéntranos** — `1402 Kenmore Boulevard, Akron, OH 44314`
De lunes a jueves de 3:00 p. m. a 11:00 p. m. · Viernes de 3:00 p. m. a 12:00 a. m. · Sábado de 11:00 a. m. a 12:00 a. m. · Domingo de 11:00 a. m. a 10:00 p. m. 
`Lote gratuito con sesenta espacios. Dos carriles tienen rampas y guardamos pelotas de seis libras detrás del mostrador; solo pregunte.`

**Pie de página** — STAR LANES · `Est. 1958` · `Doce carriles. Actitud cero.` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-popover": "^1.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
