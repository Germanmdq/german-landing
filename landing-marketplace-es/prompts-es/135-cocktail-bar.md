# Sitio web de Cocktail Bar Prompt
# websiteprompts.ai

Cree un sitio web cinemático de bar de cócteles oscuro y bebidas espirituosas artesanales llamado "Dusk Bar" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 0 0% 2%;              /* pure near-black #050505 */
  --foreground: 38 16% 88%;           /* warm cream */
  --primary: 38 16% 88%;
  --primary-foreground: 0 0% 2%;
  --accent: 28 55% 50%;               /* deep amber #c97a2a */
  --surface: 0 0% 6%;
  --surface-raised: 0 0% 10%;
  --muted-foreground: 38 8% 52%;
  --border: 0 0% 16%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@1,400;1,600&family=Inter:wght@300;400;500&display=swap`
- Pantalla: Bebas Neue — cinematográfico, escala máxima
- Acento: Cormorant Garamond cursiva: se utiliza para subetiquetas y comillas 
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas, 10 px, espacio entre letras 0,16 em

## Secciones

### 1. Navbar
- Negro puro pegajoso, `backdrop-filter: blur(14px)`
- Izquierda: Bebas Neue espacio entre letras 0,15em "DUSK" en crema cálida
- Derecha: Menú · Reservas · Eventos · Acerca de + "Reservar una mesa →" botón con contorno ámbar

### 2. Hero
- Altura de la ventana gráfica completa, fondo negro
- Fotografía de cóctel cinematográfica con sangrado completo `posición: inserción absoluta-0 w-h completo-objeto-cubierta completa centro-objeto`
- Superposición mínima, suficiente para texto: `background: linear-gradient(to right, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.45) 55%, rgba(5,5,5,0.15) 100%)`
- Texto de visualización de fondo grande: "DUSK" en Bebas Neue `font-size: clamp(300px, 42vw, 600px)` en `opacidad: 0.025`, `position: absolute; right: -3%; top: 50%; transform: translateY(-50%); z-index: 1; letter-spacing: -0.02em`
- Contenido `z-index: 10`, alineado a la izquierda `padding-left: 7vw`, centrado verticalmente:
 - Inter 500 etiqueta ámbar de 10px en mayúsculas: "Craft Cocktail Bar · Soho, London"
 - Bebas Neue `clamp(78px, 11vw, 165px)` crema cálida, altura de línea 0.84:
 "ELABORADO\nA MANO.\nSERVIDO CON\nINTENT."
 - Acento en ámbar en "INTENT".
 - Inter 300 sub crema apagado: "Un menú rotativo de 24 cócteles artesanales, una obsesiva selección de bebidas espirituosas y una habitación diseñada para que te quedes más tarde de lo planeado"
 - CTA: "Reserva una mesa →" (relleno de color ámbar, texto oscuro) + "Ver el menú" (crema fantasma)
 - 3 chips flotantes: "24 cócteles · 200+ bebidas espirituosas · martes a domingo desde 17:00"

{/* Resumen de la imagen: primer plano cinematográfico de un cóctel artesanal que se sirve: líquido de color ámbar oscuro, retroiluminación espectacular, humo o vapor de hielo, fondo negro, fotografía con calidad de película */}

: desvanecimiento escalonado en la montura: etiqueta (0s),título (0,1 s), sub (0,28 s), CTA (0,44 s), chips (0,6 s) 

### 3. El menú
- "Lo que hacemos" - Bebas Neue `clamp(52px, 7vw, 90px)` crema tibia
- 4 filas de categorías de cócteles, hover-raise:
 - Cócteles exclusivos (nuestros originales rotativos, cada uno con el nombre de un momento de la noche, desde £ 14) 
 - Clásicos reelaborados (el canon, a nuestra manera, desde £ 12) 
 - Low ABV & Zero (la misma obsesión, menos espíritu, desde £ 10) 
 - Licores y Highballs (poco comunes, highballs de temporada; pregúntele a su barman)
- Cada uno: Bebas Neue 32px nombre de categoría a la izquierda + Inter 300 silenciado descripción a la derecha + ámbar "→"
- `border-bottom: 1px solid hsl(var(--border))`
- Colocar el cursor sobre: superficie elevada, el nombre gira ámbar

### 4. Bebidas exclusivas
- "Current Signatures" — Bebas Neue grande
- 3 tarjetas de cóctel, superficie oscura, sin radio de borde:
 - The Last Light (mezcal, aperol, naranja sanguina, carbón activado — £15)
 - Midnight Sour (bourbon, sésamo negro, limón, miel: £14)
 - Fog of Dusk (ginebra, flor de saúco, pepino, servicio de hielo seco: £14)
- Cada uno: imagen de cóctel grande 4/3, nombre del cóctel Bebas Neue, descripción en cursiva Cormorant, etiqueta de precio en ámbar
- Colocar el cursor sobre: borde en ámbar, escala de imagen 1.02

{/* Resumen de imagen: cóctel oscuro y temperamental: mezcal sour con borde ahumado, fondo negro, presentación teatral, fotografía cinematográfica */}
{/* Resumen de imagen: cóctel de bourbon, líquido ámbar, una sola esfera de hielo grande, fondo de barra oscuro, editorial */}
{/* Resumen de imagen: bebida de ginebra con efecto de humo de hielo seco, dramático, oscuro superficie, servicio artístico */}

### 5. The Bar
- "The Room" — Bebas Neue grande
- Dividido: texto izquierdo, imagen derecha
- Cormorant Garamond cita en cursiva: "Construimos Dusk para personas que piensan que una buena bebida merece una buena hora."
- Inter 300 silenciado: 2 párrafos: sin televisores, sin DJ después de las 10 p. m., sin prisas. 40 cubiertas. Se recomienda reservar. Las visitas sin cita previa siempre son bienvenidas si hay espacio.
- Chips de color ámbar: "40 cubiertas · No hay televisores · Se admiten visitas sin cita previa · Soho"

{/* Resumen de imagen: interior íntimo de un bar de cócteles, madera oscura y latón, estantes cálidos para licores retroiluminados.velas de mal humor, atmósfera cinematográfica */}

### 6. Eventos
- "Private Hire & Events" — Bebas Neue grande
- Sección de superficie oscura centrada
- Inter 300 silenciado: "Bar completo disponible de domingo a lunes. Clases magistrales de cócteles para grupos de 8-20 Noches de club de cena de temporada anunciadas mensualmente."
- "Preguntar sobre eventos →" botón ámbar + fantasma "Unirse a la lista de correo"

### 7. Testimonios
- 3 tarjetas: Bebas Neue 18px nombre del cóctel ámbar como encabezado, cita en cursiva crema Inter 300, nombre del invitado en Inter 10px. silenciado
- Desvanecimiento escalonado en el desplazamiento

### 8. Reserva CTA
- Fondo de ancho completo de color ámbar profundo `#c97a2a`
- Bebas Neue `clamp(52px, 7vw, 90px)` oscuro: "TU MESA ES ESPERANDO"
- Inter 300 dark: "Reserve en línea o visite sin cita previa; siempre intentaremos encontrarle un asiento"
- "Reservar una mesa →" botón oscuro casi negro
- "Martes a domingo a partir de las 5 p. m. · Último asiento a las 10:30 p. m. · Soho, Londres" Inter 10px dark 70%

### 9. Pie de página
- Negro puro, Bebas Neue "DUSK" en crema cálida
- Instagram · Google Maps
- "© 2026 Dusk Bar · 12 Beak Street, Soho, Londres W1F · Martes–domingo 5pm–1am"

## Animaciones
- Héroe: desvanecimiento de escalonamiento agresivo en la montura, desvanecimiento del texto de fondo "DUSK" en un retraso de 1.2s
- Filas de menú: elevación del cursor + transición ámbar 0.15s
- Tarjetas de cóctel: desvanecimiento de escalonamiento + escala 0.96→1 encendido scroll
- Desplazamiento total: 0,15 s de facilidad

## Responsive
- Móvil: héroe apilado, tarjetas de cóctel de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "DUSK"
- Héroe: "HECHO A MANO. SERVIDO CON INTENCIÓN". / "Un menú rotativo de 24 cócteles artesanales, una selección de licores obsesiva"
- Menú: Signatures desde £14 · Clásicos desde £12 · Low ABV desde £10 · Bebidas espirituosas pregunta al bartender
- Cócteles: The Last Light £15 · Midnight Sour £14 · Fog of Dusk £14
- Horario: Martes a domingo a partir de las 5:00 p. m., último asiento a las 10:30 p. m. 
- Testimonio: "Cada cóctel en Dusk es genuinamente considerado. Tomaron un mezcal sour y lo convirtieron en la mejor bebida que he probado este año". — Marcus T., Soho
- CTA: "TU MESA ESESPERANDO" / "Reserve en línea o visite"