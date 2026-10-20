# Hush — Mensaje del sitio web de la página de inicio de la aplicación móvil

## 1. Declaración de objetivos
Cree una página de inicio tranquila y cinematográfica para **Hush**, una aplicación para dormir y relajarse: azul medianoche profundo, un lento gradiente de aurora que se desplaza detrás del contenido, una suave luz lavanda y una maqueta de teléfono flotante que se inclina suavemente a medida que se desplaza la página.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin vídeo, sin API de tienda de aplicaciones. Las insignias de la tienda son enlaces simples.

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(232, 44%, 7%);       /* midnight */
  --foreground: hsl(232, 30%, 94%);
  --primary: hsl(258, 78%, 70%);         /* lavender */
  --primary-foreground: hsl(232, 44%, 8%);
  --accent: hsl(178, 62%, 60%);          /* soft teal, used in the aurora only */
  --muted-foreground: hsl(232, 14%, 62%);
  --border: hsl(232, 26%, 18%);
  --card: hsl(232, 38%, 11%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;500;700&display=swap" rel="stylesheet" />
```
- **H1:** Plus Jakarta Sans 700, clamp(46px, 6.5vw, 96px), altura de línea 1.02, espacio entre letras -0.04em
- **H2:** Plus Jakarta Sans 700, clamp(32px, 4vw, 56px), espacio entre letras -0.03em
- **Cuerpo:** Plus Jakarta Sans 300, 18px, altura de línea 1.7
- **Etiquetas:** Plus Jakarta Sans 500, 12px, mayúsculas, espacio entre letras 0,16em, lavanda

## 5. Efectos visuales

**Efecto 1: Aurora.** Dos grandes manchas radiales borrosas, una lavanda y otra verde azulado, sentadas detrás del héroe en `filter: blur(120px)`, `opacidad: 0,35`. Cada uno se desplaza lentamente entre dos posiciones en un bucle de 22 segundos, en direcciones opuestas.

```jsx
<motion.div
  aria-hidden
  className="pointer-events-none absolute -top-40 left-1/4 h-[560px] w-[560px] rounded-full bg-[hsl(258,78%,60%)] blur-[120px] opacity-35"
  animate={{ x: [0, 160, 0], y: [0, 60, 0] }}
  transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
/>
```

**Efecto 2: Teléfono flotante.** La maqueta del teléfono se encuentra en el centro a la derecha del héroe, girado `rotateY(-14deg) rotateZ(3deg)` en una perspectiva de 1500px, flotando hacia arriba y hacia abajo 12px en un bucle de 6 segundos. Al desplazarse, gira suavemente hasta quedar plano.

**Efecto 3: Campo de estrellas.** Aproximadamente 40 pequeños puntos de 1 a 2 px en `--foreground` con una opacidad del 10 al 30 % se encuentran dispersos por todo el héroe, algunos de ellos aparecen y desaparecen en bucles escalonados de 3 a 5 segundos. Divs puros, sin lienzo.

## 6. Desglose de componentes

1. **Barra de navegación**: 76 píxeles, transparente, marca denominativa con un pequeño ícono de media luna a la izquierda, tres enlaces en el centro, pastilla lavanda "Descargar" a la derecha. Cambia a `--background` al 85% con desenfoque después de desplazarse.
2. **Héroe** — 100vh. Izquierda: etiqueta, H1 en tres líneas, sublínea, dos insignias de tienda y una línea de calificación. Derecha: teléfono flotante (Efecto 2). Detrás de todo la aurora (Efecto 1) y el campo de estrellas (Efecto 3). *Imagen: interfaz de usuario de la pantalla de suspensión de la aplicación móvil, interfaz oscura con un suave degradado color lavanda, un ícono de luna y un temporizador de suspensión, limpio ycalma.*
3. **Tira de prueba social**: una línea: calificación, número de descargas y cita de prensa, separados por puntos.
4. **Tres pilares**: tres tarjetas en `--card` con un ícono de Lucide en color lavanda, un título y dos líneas.
5. **Exhibición de funciones**: tres filas alternas, cada una con una imagen de la pantalla del teléfono y una copia. La pantalla de cada teléfono flota ligeramente en su propio bucle.
6. **Biblioteca de sonidos**: una cuadrícula de ocho mosaicos de sonido con un pequeño ícono, nombre y duración. Al pasar el cursor, se eleva el mosaico y se ilumina su borde. No se reproduce nada.
7. **Rutina nocturna**: una línea de tiempo vertical de cuatro momentos de 21:00 a 23:00, cada uno con una hora en cifras tabulares y una línea de copia, conectados por una línea de degradado color lavanda que se dibuja cuando entra a la vista.
8. **Reseñas**: tres reseñas al estilo de la tienda de aplicaciones con cinco estrellas, título, cuerpo y nombre.
9. **Precios**: dos tarjetas: gratuita y premium, la premium resaltada en lavanda.
10. **CTA final**: H2 centrado, insignias de tiendas y una línea sobre la prueba gratuita, con la aurora reapareciendo detrás.
11. **Pie de página**: tres columnas, enlaces pequeños, marca denominativa y copyright.

## 7. Animaciones
- Hero H1: las líneas se elevan desde `y: 40` con desenfoque `8px → 0`, 0.9s, escalonamiento 0.1s
- Teléfono: ingresa `scale 0.9 → 1`, `opacity 0 → 1`, 1.2s, luego inicia el bucle flotante
- Aurora y estrellas: efectos 1 y 3, siempre en ejecución
- Tarjetas y filas: desvanecerse 24px, escalonar 0.1s
- Línea de tiempo: `scaleY 0 → 1` desde arriba, 1.4s
: coloque el cursor sobre los mosaicos de sonido: `y: -4`, el borde se ilumina, 0.25s

## 8. Responsive
- **Móvil (<768px):** el héroe se acumula con el teléfono encima del texto a 52vh y sin rotación 3D; H1 a 46 px; las manchas de aurora se reducen a 320 px; la biblioteca de sonidos se convierte en 2 columnas; pila de filas de características; la barra de navegación muestra una marca denominativa y un botón lavanda "Obtener" únicamente.
- **Tableta:** el héroe permanece dividido 55/45; suena 3 columnas.
- **Escritorio:** ancho máximo 1280px, `px-8`, espacio entre secciones `py-32`.

## 9. Copia completa

**Marca:** HUSH · Suspender, sin desplazamiento

**Navbar:** Características · Sonidos · Precios -Descargar

**Hero**
- Etiqueta: `SLEEP & WIND-DOWN`
- H1: `Deja el teléfono/abajo. Nosotros / lo tomaremos desde aquí.`
- Sublínea: `Hush convierte tu teléfono en lo único en el dormitorio que te ayuda a dormir: una pantalla oscura, una voz lenta y sonidos que se desvanecen por sí solos.`
- Botones: `Descargar en App Store` · `Consíguelo en Google Play`
- Línea de calificación: `4,8 estrellas · 62.000 valoraciones`

**Prueba social:** `4,8 en App Store` · `1,2 millones de descargas` · `"La primera aplicación para dormir que no quiere tu atención". — The Verge`

**Tres pilares**
- **Nada para desplazarse** — `Una pantalla, un botón. Sin feeds, sin rayas, sin notificaciones a las 9 p.m. que le indiquen que se relaje.`
- **Se desvanece por sí solo** — `Cada sesión finaliza con un temporizador que reduce el volumen, por lo que nada lo despierta a las 3 a.m.`
- **Funciona sin conexión** — `Descarga lo que usas. El modo avión es el punto.`

**Exposición de funciones**
1. **Cuentos para dormir, leídos despacio** — `Cuarenta cuentos grabados a un ritmo deliberado por personas con voz pausada. La mayoría de los oyentes nunca escuchan el final.`
2. **Respiración que se adapta a tu noche** — `Elige cuatro minutos o doce. El círculo en la pantalla se oscurece a medida que avanzas, por lo que nunca se vuelve brillante en una habitación oscura.`
3. **Una relajación que aprende tu hora de acostarte** — `Hush nota cuándo sueles empezar y se prepara en silencio, sin pedirte que establezcas un horario.`
*Resúmenes de imágenes: pantallas oscuras de aplicaciones móviles: un reproductor de historias con una forma de onda, una animación de círculo de respiración, un temporizador de apagado, todo en azul profundo con detalles en lavanda.*

**Biblioteca de sonidos** — H2 `Ocho sonidos. Eso es todo lo que necesitamos.`
Lluvia en una tienda de campaña · 45 min · Océano lento · 60 min · Bosque nocturno · 45 min · Trueno lejano · 30 min · Fuego de cabaña · 60 min · Nevada · 45 min · Viejo ventilador · 90 min · Tren de noche · 60 min

**Rutina nocturna** — H2 `Tus últimas dos horas, hechas más fácil.`
- `21:00` — **Atenúa todo** — `Hush cambia a una pantalla desplazada al rojo y baja el brillo de la interfaz.`
- `21:45` — **Relájate** — `Una sesión de respiración de cuatro minutos o un estiramiento que puedes hacer en la cama.`
-`22:30` — **Historia o sonido** — `Elige uno y establece un desvanecimiento. La mayoría de las personas eligen treinta minutos.`
- `23:00` — **Nada** — `La pantalla se vuelve negra y permanece así hasta la mañana.`

**Reviews**
- `"Finalmente, una aplicación que se cierra"` — `He probado seis de estas. Este es el único que no intenta mantenerme al teléfono.` — *Maya*
- `"Mi hijo pide el de lluvia"` — `Ahora lo usamos todas las noches antes de dormir. El desvanecimiento es el truco.` — *Dan*
- `"Vale la pena sólo por el sonido del ventilador"` — `Viajo constantemente y las habitaciones de hotel son demasiado silenciosas. Resuelto.` — *Priya*

**Precios** — H2 `Coberturas gratuitas la mayoría de las noches.`
- **Gratis** — `$0` — `Cuatro sonidos · cinco historias · temporizadores de hasta 30 minutos`
- **Premium** — `$4.99/mes o $29/año` — `Todos los sonidos e historias · descargas sin conexión · ilimitadas temporizadores · nueva historia cada semana · siete días gratis`

**CTA final** — H2 `Esta noche, déjalo a las 22:30.` `Siete días gratis, luego $4,99 al mes. Cancelar con dos toques.` Botones: `App Store` · `Google Play`

**Pie de página** — HUSH · Funciones · Sonidos · Precios · Soporte · Privacidad · Términos · Prensa · © 2026 Hush Labs

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
