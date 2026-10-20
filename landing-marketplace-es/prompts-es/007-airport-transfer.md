# Meridian Cars: Aviso del sitio web de traslados al aeropuerto

## 1. Objetivo
Cree un sitio web tranquilo y confiable para **Meridian Cars**, una empresa de traslados al aeropuerto con precios fijos. Azul noche profundo, blanco cálido, un acento ámbar, un grotesco limpio y una firma: un tablero con solapa dividida que se voltea para mostrar la siguiente pastilla. Todo dice que el automóvil estará allí.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin motor de reservas, sin API de vuelo. Las acciones son un enlace telefónico y un enlace de correo electrónico.

## 3. Sistema de diseño
```css
:root {
  --paper: #F4F3EF;
  --ink: #101A2B;              /* night blue, used as dark ground */
  --accent: #D79A2B;           /* amber */
  --on-accent: #101A2B;
  --surface: #E7E6E1;
  --muted: #5D6675;
  --line: rgba(16,26,43,0.15);
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: oscuro, claro, claro, superficie, oscuro, acento, pie de página oscuro.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600;700&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet" />
```
- **Pantalla:** Instrument Sans 600, clamp(42px, 5.6vw, 84px), altura de línea 1.0, espacio entre letras -0.035em
- **Cuerpo:** Inter 300, 16px, altura de línea 1.6
- **Metacapa:** IBM Plex Mono 500, 11px, mayúsculas, espacio entre letras 0,06em. Horarios, precios, terminales, etiquetas índice. También se utiliza para el tablero de solapa dividida.
- Sin cursiva. Énfasis por una línea completa en ámbar.

## 5. Elemento distintivo
**Un tablero con solapa dividida.** Una fila de un tablero de salida construido con pequeños mosaicos oscuros, cada uno de los cuales muestra un personaje en monocromático. Al cargar, los mosaicos pasan por algunos caracteres y se ubican, uno tras otro, de izquierda a derecha, con 40 ms de diferencia, deletreando la siguiente recogida programada: hora, código de aeropuerto, terminal e inicial del pasajero. Cada mosaico gira sobre el eje X con una línea fina en el medio, exactamente como si fuera real.

Ona sola fila, un giro con carga. No hace bucle y no emite ningún sonido.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 72 px, azul noche, marca denominativa a la izquierda, cuatro enlaces a la derecha, pastilla de color ámbar con un círculo de flecha redondo y el número de teléfono en mono.
2. **Héroe, retrato dividido**: suelo azul noche. Titular dejado sobre la línea del cabello, una fotografía de una berlina en un aeropuerto sangrando en el borde derecho, una frase y dos acciones debajo. Altura mínima `clamp(520px, 76vh, 780px)`. *Fotografía: una berlina limpia y oscura esperando afuera de una terminal de aeropuerto al amanecer, una luz interior cálida, el conductor saliendo.*
3. **El tablero**: ligero.La fila de solapas divididas (sección 5), centrada, con una leyenda mono.
4. **Precios fijos, tabla rayada**: ligero. Ocho filas: desde, hasta, coche, precio. Todo en mono, precios alineados a la derecha. Una línea debajo sobre lo que se incluye.
5. **Lo que incluye, índice**: superficie. Dos columnas rayadas: siempre incluidas y nunca con cargo extra. Seguimiento de vuelos, tiempo de espera, meet and greet, peajes, sillas para niños.
6. **Cómo funciona, filas numeradas**: claro. Cuatro filas en líneas finas con marcadores mono: reserva, la noche anterior, llegadas, el camino.
7. **Los autos**: azul noche oscuro, recuadro 16px, `--panel-radius`. Tres filas en color papel: berlina, familiar, furgoneta. Cada uno con asientos, maletas y nota de precio en mono.
8. **Esperas y retrasos, comunicado**: ligero. Un párrafo de 22 px que comienza en un tercio sobre lo que sucede cuando un vuelo tiene tres horas de retraso, que es lo que realmente preocupa a la gente.
9. **Una cita**: superficie. Una cita única centrada en Instrument Sans a 28 px con una línea de firma en mono.
10. **Libro, panel decorativo**: fondo ámbar, texto azul noche, panel insertado. Una línea, el número de teléfono en grande y una nota monocromática sobre la reserva por mensaje de texto.
11. **Pie de página**: azul noche oscuro. Marca denominativa gigante recortada "MERIDIAN CARS", línea de licencia, cobertura, tres enlaces pequeños.

## 7. Movimiento
- El título se desvanece 16px una vez.
- La solapa dividida se voltea con la carga, como se describe.
- Las filas de la tabla se desvanecen con 0.04s stagger.
- Pase el cursor: las filas aclaran la línea del cabello, los círculos de flecha se deslizan 4px.
- Facilita `cubic-bezier(.22,1,.36,1)`, respeta `prefers-reduced-motion` mostrando el tablero ya establecido.

## 8. Responsive
- **Móvil debajo 768px:** una barra de llamadas de color ámbar está fijada en la parte inferior con un relleno que agrega `env(safe-area-inset-bottom)`. La fotografía principal se mueve sobre el titular a 40vh. La tabla de precios se apila en filas con el precio en la misma línea que la ruta. La tabla se encoge para caber y deja caer al pasajero inicial. Sin desplazamiento de página horizontal.
- **Tableta:** el héroe permanece dividido, la tabla sin cambios.
- **Escritorio:** ancho máximo de contenido 1200 px, canales 40 px, relleno de sección 110 px.

## 9. Copia completa

**Marca denominativa:**COCHES MERIDIANOS. Meta: `TRASLADOS AL AEROPUERTO. PRECIOS FIJOS. VEINTIDÓS AÑOS.`

**Nav:** Precios, Incluidos, Los coches, Contacto. Botón: `Reservar un coche`. Mono: `01279 555 0117`

**Hero**
- Titular: `El coche ya está allí cuando aterrizas.`
- Oración: `Precios fijos acordados al reservar, seguimiento automático de vuelos y una hora de espera gratuita después de aterrizar. Sin sobretensiones, sin medidores, sin sorpresas en la acera.`
- Acciones: `Reserve un automóvil`, `Obtenga un precio`

**El título del tablero:** `Próxima recogida en el tablero. Ejecutamos alrededor de catorce de estos por día.`
Contenido del tablero: `06:20 LHR T5 A. REYNOLDS`

**Precios fijos** (etiqueta `001/ Precios`)
| Desde | A | Coche | Precio |
|---|---|---|---|
| Stortford del obispo | Londres | Salón | 32 GBP |
| Stortford del obispo | Heathrow T5 | Salón | 128 libras esterlinas |
| Cambridge | Londres | Salón | 78 EUR |
| Cambridge | Heathrow T2 | Bienes Raíces | 185 libras esterlinas |
| Londres | Londres | Salón | 74 libras esterlinas |
| Londres | Londres | Salón | 148 libras esterlinas |
| Azafrán Walden | Londres | Furgoneta | 62 libras esterlinas |
| Chelmsford | Heathrow T3 | Bienes Raíces | 195 GBP |
Nota: `Los precios incluyen peajes, estacionamiento, bienvenida y una hora de espera. No cambian por la noche ni los fines de semana.`

**Qué está incluido** (etiqueta `002/ Incluido`)
- Siempre: `Seguimiento de vuelos, nos movemos con tu vuelo`, `Una hora de espera gratis después del aterrizaje`, `Recepción y saludo en llegadas con un cartel con el nombre`, `Peajes, gastos de devolución y estacionamiento`, `Asientos para niños, cualquier edad, reservados gratis`, `Un texto cuando el conductor sale`
- Nunca cobrado: `Recargo noche`, `Recargo por festivo`, `Equipaje extra`, `Tasa pago con tarjeta`, `Cancelación hasta 12 horas antes`, `Espera por vuelo retrasado`

**Cómo funciona** (etiqueta `003/ Cómo funciona`)
- `CUANDO TÚ RESERVAR` **Acordamos el precio.** `Por teléfono, SMS o correo electrónico. Lo recibes por escrito el mismo día.`
- `LA NOCHE ANTES` **Un mensaje.** `Nombre del conductor, coche, matrícula y hora a la que saldrán.`
- `AL LLEGAR` **En el vestíbulo, no en elaparcamiento.** `Seguimos el vuelo, aparcamos y nos reunimos con usted en llegadas con un tablero.`
- `THE DRIVE` **Silencioso o hablador, su llamada.** `Agua en la puerta, cargador en la parte trasera, radio apagada a menos que lo desee.`

**Los coches**
- **Sedan.** `Tres pasajeros, dos maletas grandes.` `ESTÁNDAR PRECIO`
- **Familia.** `Cuatro pasajeros, cuatro maletas grandes.` `MÁS 15 GBP`
- **Van.** `Siete pasajeros, siete maletas.` `MÁS 35 GBP`

**Esperas y retrasos** (etiqueta `004/ Cuando las cosas van incorrecto`)
`Si su vuelo tiene tres horas de retraso a las dos de la madrugada, el conductor seguirá allí. Realizamos un seguimiento de cada vuelo desde el momento en que sale, para que el coche se mueva con él. Después de la primera hora libre cobramos 12 GBP por hora, y si el retraso fue culpa de la aerolínea y no suya, normalmente no lo cobramos en absoluto.`

**Cita:** `Nuestro vuelo aterrizó con cuatro horas de retraso. Estaba parado allí con el tablero y le había comprado un chocolate caliente a mi hija.`
Firma: `La familia Nolan, Hertford`

**Panel del libro**
- Línea: `Díganos el número de vuelo y nosotros haremos el resto.`
- Teléfono grande: `01279 555 0117`
- Mono: `RESERVA POR TEXTO O WHATSAPP. RESPUESTA ENTRE LAS 06:00 Y LAS 23:00, TODOS LOS DÍAS.`

**Footer**
`MERIDIAN CARS`, `Covering Hertfordshire, Essex and Cambridgeshire`, `bookings@meridiancars.co.uk`
Mono: `Operador de alquiler privado con licencia, Este Ayuntamiento de Herts, licencia PH0118. Totalmente asegurado, controladores verificados por DBS.`
Enlaces: `Precios`, `Incluidos`, `Contacto`

## 10. Never
Glassmorphism, gradientes, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, mapas en vivo, temporizadores de cuenta regresiva, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, rayas idénticas.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
