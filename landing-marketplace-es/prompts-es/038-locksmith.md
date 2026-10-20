# Keyline Locksmiths - Aviso del sitio web de cerrajería

## 1. Declaración de objetivos
Cree un sitio web audaz y de alto contraste para **Keyline Locksmiths**, un cerrajero de emergencia las 24 horas: negro azabache con amarillo de seguridad, un número de teléfono enorme que es imposible pasar por alto, tipografía condensada pesada y una sensación industrial de ingeniería que dice rápido, capaz y honesto en menos de dos segundos.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin formularios con validación, sin calculadoras de cotizaciones. Cada llamado a la acción es un enlace `tel:`.

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(0, 0%, 5%);          /* jet black */
  --foreground: hsl(0, 0%, 96%);
  --primary: hsl(50, 100%, 52%);         /* safety yellow */
  --primary-foreground: hsl(0, 0%, 5%);
  --muted-foreground: hsl(0, 0%, 58%);
  --border: hsl(0, 0%, 18%);
  --card: hsl(0, 0%, 9%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
```
- **H1 y número de teléfono:** Big Shoulders Display 900, mayúsculas, clamp(64px, 12vw, 190px), altura de línea 0.85
- **H2:** Big Shoulders Display 700, mayúsculas, clamp(40px, 5.5vw, 80px), altura de línea 0.9
- **Cuerpo:** Inter Tight 400, 17px, altura de línea 1.6
- **Etiquetas, precios, horarios:** JetBrains Mono 500, 12–14px, mayúsculas, espacio entre letras 0.06em

## 5. Efectos visuales

**Efecto 1: Franja de peligro.** Una banda de 14px de franjas diagonales amarillas y negras separa las secciones y tramos clave en la parte superior de la página: `repeating-linear-gradient(-45deg, var(--primary) 0 14px, var(--background) 14px 28px)`. El de arriba se desplaza lentamente hacia los lados (animación de `posición de fondo`, infinito lineal de 20 s). 

**Efecto 2: línea de corte de tecla.** Un único trazado SVG dibujado como el perfil de una hoja de llave (una larga línea horizontal con una serie de picos y valles agudos) atraviesa al héroe bajo el H1 en amarillo, trazo de 3px. Se dibuja a sí mismo en carga con `pathLength 0 → 1` durante 1,6 s.

**Efecto 3: Punto activo.** Un pequeño punto verde parpadeante junto a "Disponible ahora" en la barra de navegación y el héroe, usando un anillo que escala 1 → 2,4 y se desvanece cada 1,8 s.

## 6. Componente Desglose

1. **Raya de peligro**: Efecto 1, ancho completo, parte superior de la página.
2. **Barra de navegación**: 76 píxeles, negra, marca denominativa a la izquierda en Big Shoulders con un ícono de llave, punto activo "Disponible ahora" (Efecto 3) en el centro del escritorio, botón amarillo "Llamar al 0800 046 7788" a la derecha. Pegajoso.
3. **Héroe**: ventana gráfica completa. Etiqueta mono, H1 gigante a través de dos líneas, línea de corte de clave (Efecto 2), sublínea y luego el número de teléfono enorme en amarillo como un`tel:` enlace. A continuación, tres mono hechos seguidos. Fotografía de fondo al 25% de opacidad con un degradado negro. *Imagen: primer plano de las manos de un cerrajero trabajando en la cerradura de una puerta con herramientas, iluminación lateral espectacular, ambiente industrial oscuro.*
4. **Banda de tiempo de respuesta**: banda amarilla, texto negro: cuatro números grandes con etiquetas mono (`20 MIN`, `24/7`, `£0 CALL-OUT`, `15 YRS`).
5. **Servicios**: una cuadrícula de 2 × 3 de tarjetas negras con bordes delgados, cada una con un ícono grande de Lucide en amarillo, el nombre del servicio en hombros grandes y dos líneas. Al pasar el cursor, el borde de la tarjeta se vuelve amarillo y el ícono se desplaza 4 píxeles hacia la derecha.
6. **Precios fijos**: una lista en negrita con precios monoalineados a la derecha y líderes punteados entre el nombre y el precio, como un tablero de precios. Cinco filas.
7. **Raya de peligro** divisor.
8. **Cómo trabajamos**: tres columnas con números grandes delineados (`01`, `02`, `03`) usando `-webkit-text-stroke: 2px var(--primary)` y relleno transparente.
9. **Áreas cubiertas**: una lista envuelta de nombres de áreas en forma de píldoras con borde amarillo. Sin mapa.
10. **Reseñas**: tres reseñas sobre `--card`, cinco estrellas amarillas, cotización, nombre y área, y el tipo de trabajo en mono.
11. **Llamada final**: sección amarilla de ancho completo, texto gigante negro "¿BLOQUEADO?" y el número de teléfono nuevamente, enorme.
12. **Pie de página** — negro, pequeño, con detalles de registro y seguro en mono.

## 7. Animaciones
- Hero H1: se cierra de golpe, `y: 80 → 0`, `opacity 0 → 1`, resorte (rigidez 500, amortiguación 30), líneas escalonadas 0.1s
- Línea de corte de clave: Efecto 2
- Número de teléfono: `scale 0.95 → 1`, retraso 0,6 s; al pasar el cursor, las letras se desplazan 2 px hacia arriba en secuencia con un escalonamiento de 0,02 s 
- Números de respuesta: se desvanecen con un escalonamiento de 0,08 s (sin contar animación) 
- Tarjetas de servicio: se desvanecen 20 px, se escalonan 0,06 s
- Desplazamiento de franjas de peligro: Efecto 1

## 8. Responsive
- **Móvil (<768px):** una barra amarilla adhesiva está fijada en la parte inferior de la pantalla con "Llamar ahora - 0800 046 7788"; H1 a 64 px; número de teléfono en el héroe a 44 px; la tira de respuesta se vuelve 2×2; servicios 1 columna; los líderes de precios acortan; la barra de navegación muestra solo una marca denominativa y un botón con el ícono de un teléfono amarillo.
- **Tableta:** servicios 2 columnas;la tira de respuesta permanece 4 de ancho.
- **Escritorio:** ancho máximo 1320px, `px-8`, espaciado de sección `py-24`.

## 9. Copia completa

**Marca:** KEYLINE LOCKSMITHS · Leeds

**Navbar:** Servicios · Precios · Áreas · Reseñas — `● Disponible ahora` — Llame al 0800 046 7788

**Hero**
- Etiqueta: `CERRAJERO DE EMERGENCIA LAS 24 HORAS · LEEDS Y WEST YORKSHIRE`
- H1: `¿BLOQUEADO? / ESTAMOS EN CAMINO.`
- Sublínea: `Cerrajeros locales controlados por el DBS que abren puertas sin taladrar en nueve de cada diez trabajos. Precios fijos que le informamos por teléfono, antes de partir.`
- Teléfono: `0800 046 7788`
- Datos: `SIN TARIFA DE LLAMADA` · `ENTRADA NO DESTRUCTIVA` · `CERRADURAS APROBADAS POR SEGUROS`

**Tira de respuesta:** `20 Llegada promedio MIN` · `24/7`, incluidos días festivos · Tarifa de llamada `£0` · `15 YRS` en West Yorkshire

**Servicios** — H2 `QUÉ HACEMOS`
- **Bloqueos de emergencia** — `Casa, oficina o automóvil. Abierto sin daños siempre que sea posible.`
- **Cambios de cerradura** — `Nuevos inquilinos, llaves perdidas o ruptura. El mismo día.`
- **Reparaciones por robo** — `Puertas y marcos asegurados esta noche, reparados adecuadamente mañana.`
- **Reparaciones de puertas de uPVC** — `Mecanismos defectuosos y puertas caídas reparadas en el acto.`
- **Mejoras de seguridad** — `Cerraduras estándar británicas que satisfacen sus aseguradora.`
- **Cajas fuertes** — `Abiertas, reparadas e instaladas, domésticas y comerciales.`

**Precios fijos** — H2 `PRECIOS. ARRIBA DELANTERO.`
- Bloqueo diurno (8 am–6 pm) ........ `£79`
- Bloqueo vespertino y nocturno ........ `£119`
- Cambio de cerradura de cilindro europeo ........ `desde £89`
- Reemplazo del mecanismo de uPVC ........ `desde £165`
- Bloqueo estándar británico instalado ........ `desde £140`
Nota: `Todos los precios incluyen mano de obra e IVA. Las piezas se cotizan antes del montaje.`

**Cómo trabajamos** — H2 `SIN SORPRESAS`
- **01** — **Tú llamas, nosotros cotizamos.** `Un verdadero cerrajero responde y te da un precio fijo.`
- **02** — **Llegamos rápido.** `La llegada promedio es de veinte minutos Leeds.`
- **03** — **Pagas después.** `Tarjeta o efectivo, solo una vez finalizado el trabajohecho.`

**Áreas cubiertas:** Centro de la ciudad de Leeds · Headingley · Chapel Allerton · Roundhay · Horsforth · Kirkstall · Armley · Morley · Pudsey · Wetherby · Garforth · Otley · Bradford · Wakefield

**Reseñas**
- `"Se cerró a las 2 de la mañana con un niño pequeño durmiendo adentro. Estuve aquí en quince minutos y la puerta se abrió en dos."` — *Emma, Headingley* — `EMERGENCY LOCKOUT`
- `"Cotizó £89 por teléfono, cobró £89."` — *Marcus, Roundhay* — `LOCK CHANGE`
- `"Salió después de nuestro robo, aseguró todo y se ocupó de nuestra aseguradora. trámites."` — *Jan, Horsforth* — `REPARACIÓN DE ROBO`

**Llamada final** — `¿BLOQUEADO?` · `0800 046 7788` · `Atendido por un cerrajero, las 24 horas del día.`

**Pie de página** — KEYLINE LOCKSMITHS · Servicios · Precios · Áreas · Reseñas · Privacidad · `Aprobado por la Asociación de Cerrajeros Maestros · Comprobado por DBS · Seguro de responsabilidad pública de £ 5 millones` · `Keyline Locksmiths Ltd, empresa no. 08765432` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
