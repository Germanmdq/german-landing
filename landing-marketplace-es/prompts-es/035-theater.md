# The Lyric — Aviso del sitio web del teatro

## 1. Declaración de objetivos
Crear un sitio web dramático y oscuro para **The Lyric Theatre**, un teatro histórico con capacidad para 900 personas: terciopelo rojo y negro profundo, detalles en oro antiguo, enormes títulos de espectáculos condensados, un foco suave que se concentra en el héroe y la anticipación del momento antes del telón. rises.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin mapa de asientos, sin motor de reservas. Los botones "Reservar entradas" son enlaces simples.

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(350, 30%, 5%);       /* black with a red undertone */
  --foreground: hsl(40, 30%, 90%);       /* programme cream */
  --primary: hsl(42, 58%, 56%);          /* antique gold */
  --primary-foreground: hsl(350, 30%, 5%);
  --velvet: hsl(350, 62%, 26%);          /* deep velvet red */
  --muted-foreground: hsl(30, 10%, 60%);
  --border: hsl(42, 30%, 22%);           /* dim gold rule */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **Mostrar títulos:** Anton 400, mayúscula, clamp(64px, 13vw, 220px), altura de línea 0,85, espacio entre letras -0,01em
- **H2:** Playfair Display 400, clamp(36px, 4vw, 56px)
- **Florituras en cursiva:** Playfair Display cursiva, dorado
- **Cuerpo:** Inter 300, 16px, altura de línea 1.7
- **Etiquetas, fechas:** Inter 500, 12px, mayúsculas, espacio entre letras 0.2em, dorado

## 5. Efectos visuales

**Efecto 1 — Foco.** Sobre el héroe, un foco elíptico suave: `radial-gradient(ellipse 50% 60% at 50% 30%, hsla(42, 60%, 70%, 0.18), transparent 70%)`, que respira lentamente una opacidad entre 0,8 y 1 durante 6 segundos. Debajo, un degradado inferior pesado de terciopelo rojo a negro.

**Efecto 2: Apertura de cortina con carga.** En la primera carga, dos paneles de terciopelo rojo de altura completa cubren la pantalla, cada uno de la mitad del ancho. Después de 0,3 segundos, se separan (`x: 0 → -100%` y `x: 0 → 100%`) durante 1,4 segundos con facilidad `[0,76, 0, 0,24, 1]`, luego se desmontan. Solo una vez por sesión (almacene una bandera en sessionStorage). Agregue una sutil textura de pliegue vertical a los paneles con `repeating-linear-gradient(90deg, rgba(0,0,0,0.25) 0 2px, transparent 2px 60px)`.

**Efecto 3: Reglas dobles doradas.** Los encabezados de sección se ubican entre dos finas líneas doradas separadas por 4 píxeles, como un programa de teatro.

## 6. Desglose de componentes

1. **Barra de navegación**: 80 píxeles, transparente, marca denominativa centrada en Playfair en cursiva, enlaces a la izquierda, botón con contorno dorado "Reservar entradas" a la derecha. Negro sólido con desenfoque después de desplazarse.
2. **Héroe**: vista completa, la producción actual del titular. Muestra el título en Anton gigante en dos líneas, fechas y una etiqueta dorada arriba, dos botones abajo. Foco (Efecto 1). *Imagen: actor solo en un escenario oscuro bajo un único foco cálido.neblina teatral, bordes de cortinas de terciopelo rojo, cinematográfico.*
3. **En el escenario ahora**: una lista numerada de cuatro producciones, cada una con una fila de ancho completo: número, título del programa en Anton a 64 px, fechas, género y enlace "Libro". Al pasar el cursor, el fondo de la fila se vuelve rojo aterciopelado y una pequeña imagen del programa sigue al cursor.
4. **La temporada**: una cuadrícula de 3 columnas de producciones de la temporada con imágenes estilo póster 3:4, título y rango de meses.
5. **Tu noche** — tres columnas con reglas finas de oro: `Antes del espectáculo`, `El intervalo`, `Después`. Copia breve debajo de cada.
6. **El edificio** — dividido: imagen alta a la izquierda, piso a la derecha con dos datos clave en grandes números de Playfair. *Imagen: auditorio de teatro histórico ornamentado con asientos de terciopelo rojo, balcones dorados, lámpara de araña y luz cálida.*
7. **Membresía**: banda roja aterciopelada con H2, tres beneficios, botón.
8. **Acceso**: una sección tranquila que enumera actuaciones relajadas, subtituladas y audiodescritas.
9. **Planifique su visita**: dirección, horario de taquilla, estación más cercana, estacionamiento.
10. **Pie de página** — negro, reglas dobles doradas, cuatro columnas, gigante `THE LYRIC` en Anton a 20vw con 8% de opacidad.

## 7. Animaciones
- Apertura del telón: Efecto 2 en la primera visita
- Título de héroe: cada línea sube `y: 60 → 0`, `opacity 0 → 1`, 1s, escalonamiento de 0,15s, comenzando después de que termina el telón
- En las filas del escenario: aparición gradual con escalonamiento de 0,08s; la imagen al pasar el mouse sigue al cursor con resorte (rigidez 150, amortiguación 20), escala 0.8 → 1, rotar -4deg
- Carteles de temporada: desvanecerse 30px, tambalearse 0.1s; la imagen se escala a 1,06 al pasar el cursor sobre 0,8 s
- Respiración de foco: efecto 1, infinito

## 8. Responsive
- **Móvil (<768px):** el efecto de cortina aún se ejecuta pero más rápido (0,9s); mostrar título a 64px; en las filas del escenario, suelte la imagen del cursor y muestre una pequeña miniatura a la izquierda de cada fila; la cuadrícula de temporada se convierte en una fila horizontal de desplazamiento rápido; el edificio apila la imagen primero; la barra de navegación se convierte en marca de palabras a la izquierda, el botón `Tickets` y el ícono de menú a la derecha.
- **Tableta:** cuadrícula de temporada 2 columnas.
- **Escritorio:** ancho máximo 1400px, `px-10`, espacio entre secciones `py-28`.

## 9. CompletoCopia

**Marca:** THE LYRIC · Est. 1897

**Navbar:** Novedades · Temporada · Tu visita · Membresía — Reservar entradas

**Hero**
- Etiqueta: `EN REPRODUCCIÓN · HASTA EL 31 DE OCTUBRE`
- Título: `EL VASO / MENAGERIE`
- Línea: `*Juego de memoria de Tennessee Williams, en una nueva producción dirigida por Aisha Coleman.*`
- Botones: `Reservar entradas` · `Ver tráiler`

**En el escenario ahora** — encabezado `EN EL ESCENARIO AHORA`
1. **THE GLASS MENAGERIE** — `Hasta el 31 de octubre` — Drama — `Libro`
2. **EMPRESA** — `6 de noviembre – 10 de enero` — Musical — `Libro`
3. **UN CUENTO DE NAVIDAD** — `1 – 30 de diciembre` — Familia — `Reserva`
4. **DIVERTIDO PECULIAR** — `Domingos de noviembre` — Comedia — `Libro`

**La temporada** — H2 `La *temporada 2026–27*.`
- **Hedda Gabler** — Febrero – Marzo
- **Los piratas de Penzance** — Abril – Mayo
- **Muerte de un viajante** — Junio – julio
*Resúmenes de imágenes de póster: arte teatral dramático con una sola figura, sombras fuertes, colores intensos, sin texto en la imagen.*

**Tu noche** — encabezado `TU NOCHE`
- **Antes del espectáculo** — `Se abre el Circle Bar noventa minutos antes de que se levante el telón. Cenas previas al teatro en la Sala del Balcón a partir de las 5:30 p.m.`
- **El intervalo** — `Pide bebidas de intervalo antes del espectáculo y te estarán esperando en tu mesa.`
- **Después** — `Las funciones seleccionadas del jueves van seguidas de una conversación gratuita con el elenco.`

**El edificio** — H2 `Se levanta el telón desde *1897*.` `Diseñado por Frank Matcham y restaurado en 2019, The Lyric es uno de los mejores teatros victorianos que se conservan en el país. Charlie Chaplin tocó aquí cuando tenía catorce años.` Datos: `912` asientos · `127` años de representaciones

**Membresía** — H2 `Sé el primero en *la cola*.` `Reserva prioritaria para cada producción` · `Sin gastos de reserva, nunca` · `Dos copas de intervalo gratis cada temporada` — Botón `Únete desde £60 al año`

**Acceso** — H2 `Cada asiento, *cada* audiencia.` `Para cada producción se realizan actuaciones relajadas, subtituladas, audiodescriptas e interpretadas por BSL. Acceso nivelado al patio de butacas, con ascensor accesible al círculo.` Enlace`Ver funciones de acceso`

**Planifique su visita** — `The Lyric Theatre, 48 Shaftesbury Row, Manchester M2 3LY` · `Taquilla: lunes a sábado de 10 a. m. hasta que se levante el telón` · `0161 480 1897` · `Cinco minutos a pie desde Manchester Piccadilly`

**Pie de página** — THE LYRIC · Qué hay en · Temporada · Acceso · Membresía · Contrata el teatro · Apóyanos · Carreras · `The Lyric Theatre Trust es una organización benéfica registrada no. 1054321` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
