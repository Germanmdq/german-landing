# Sitio web de fotógrafo de bodas Prompt
# websiteprompts.ai

Cree un sitio web editorial romántico para un portafolio de fotógrafos de bodas llamado "Clara Bloom Photography" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 40 33% 97%;        /* warm cream #fdf8f0 */
  --foreground: 20 15% 15%;
  --primary: 5 40% 61%;            /* blush rose #c97a6d */
  --primary-foreground: 0 0% 100%;
  --surface: 38 30% 93%;
  --muted-foreground: 20 10% 50%;
  --border: 30 20% 85%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap`
- Titulares: Cormorant Garamond 600–700 — cursiva rosa acentos
- Cuerpo: Plus Jakarta Sans 300–400
- Etiquetas: Plus Jakarta Sans 500 mayúsculas 10px espaciado entre letras 0.1em

## Secciones

### 1. Navbar
- Fondo crema pegajoso con `backdrop-filter: blur(12px)`, borde inferior de rosa delgada en el pergamino
- Izquierda: marca denominativa en cursiva Cormorant "Clara Bloom" en rosa primario
- Derecha: Portafolio · Acerca de · Inversión · Contacto + botón rosa "Reservar una consulta →"

### 2. Hero
- Crema de vista completa fondo, diseño centrado
- Cormorant Garamond 700 `clamp(56px, 9vw, 120px)`: "Documentando\nLove\nStories" - cursiva rosa en "Love"
- Más subtítulo Jakarta Sans 300: "Fotografía de bodas y fugas en el Reino Unido y Europa"
- Dos CTA: "Ver portafolio →" (relleno de rosas) + "Ver paquetes" (fantasma)
- CTA debajo: fila de 5 miniaturas cuadradas de 80 px cada una, tamaño redondeado, desvanecimiento escalonado
- Miniaturas debajo: "Más de 200 parejas · Destacado en la revista Brides · Reservado con 12 meses de anticipación" Inter 10px muted

{/* Imagen breve: retrato de pareja romántica, suave luz dorada, jardín exterior, estilo de película editorial */}
{/* Imagen breve: novia ajustando el velo a la luz de la ventana, bokeh suave, tonos cálidos, íntimo */}
{/* Imagen breve: pareja caminando por un campo de flores silvestres, sol a contraluz, neblina de ensueño */}
{/* Resumen de imagen: ceremonia al aire libre bajo un arco floral, gran angular, luz natural */}
{/* Resumen de imagen: recepción sincera, luces de colores, invitados riendo, estilo documental */}

### 3. Portfolio Grid
- "Trabajo seleccionado" en Cormorant cursiva 700, rosa escala de regla de subrayadoX 0→1 en desplazamiento
- Cuadrícula asimétrica de 3 columnas, 6 imágenes, relaciones de aspecto alternas (4/5, 3/4,1/1)
- Colocar el cursor sobre: opacidad de superposición color crema 0→1 con nombre de pareja + ubicación en cursiva Cormorant centrada
- Desvanecimiento escalonado: y: 20→0, opacidad: 0→1, 0,4 s, índice * retraso de 0,08 s

{/* Imagen breve: ceremonia de boda al aire libre, toma amplia, floral decoración, luz cálida de la tarde, campo */}
{/* Imagen breve: retrato de los novios contra un muro de piedra, editorial, luz suave */}
{/* Imagen breve: escapada costera íntima, acantilados, luz brumosa, pareja abrazándose */}
{/* Imagen breve: detalle de la mesa de recepción, velas, flores, bokeh cálido */}
{/* Resumen de imagen: novia riéndose cándidamente con las damas de honor, luz natural */}
{/* Resumen de imagen: silueta del primer baile, luz de fondo cálida, desenfoque romántico */}

### 4. Stats Strip
: franja de superficie cálida de ancho completo de 80 px tall
- 4 estadísticas en cursiva Cormorant: "Más de 200 parejas" · "8 años de experiencia" · "Reino Unido y Europa" · "Reservado para 2026"
- Divisores de rosas delgadas entre estadísticas, desvanecimiento escalonado en el desplazamiento

### 5. Acerca de
- Dos columnas: foto de retrato a la izquierda, texto a la derecha
- Cormorant 700: "Hola, soy Clara"
- Más biografía de Jakarta Sans 300: 2 párrafos breves: luz natural, narración sincera sobre poses
- Tres chips de rosas: "Luz natural · Momentos sinceros · Inspirado en la película"

{/* Resumen de imagen: retrato de una fotógrafa, luz interior cálida, pose editorial, fondo crema */}

### 6. Paquetes
- "Inversión" en Cormorant 700 con regla de rosa
- 3 tarjetas: Fuga (medio día, 200 imágenes, de £1200) · Día de la boda (día completo, más de 400 imágenes, sesión de compromiso, desde £2400) · Destino (2 días, más de 600 imágenes, viaje incluido, desde £4200)
- Tarjeta central "Día de la boda": borde de rosa + insignia "Más popular"
- Colocar el cursor sobre: suave brillo de rosa `box-shadow: 0 0 24px hsl(5 40% 61% / 0.15)`
- Funciones enumeradas con iconos Lucide Check en rosa

### 7. Testimonios
- 3 tarjetas de superficie color crema: fila de 5 estrellas en rosa, cita en cursiva Cormorant 400, nombre de pareja + fecha en Plus Jakarta Sans 10px silenciado
- Desvanecimiento escalonado en el desplazamiento

### 8. CTA Banner
- Rosa ruborizada de ancho completo `#c97a6d`fondo
- Cormorant 700 cursiva blanca: "Contemos tu historia"
- Sub: "Fechas limitadas disponibles para 2026: consulta con anticipación"
- Botones: "Reservar una consulta" (fondo blanco, texto oscuro) + "Ver portafolio completo" (blanco fantasma)
- "Generalmente responde dentro de 24 horas" en Plus Jakarta Sans 10px blanco 70% debajo

### 9. Pie de página
- Fondo casi negro, marca denominativa Cormorant en cursiva en rosa
- Centro de enlaces de navegación, íconos de Instagram + Pinterest a la derecha
- "© 2026 Clara Bloom Fotografía · Londres, Reino Unido · Disponible en todo el mundo"
- Borde superior de rosa delgada

## Animaciones
- Héroe: desvanecimiento escalonado en la montura (y: 30→0, 0.7s)
- Cuadrícula de portafolio: IntersecciónObservador escalonado
- Reglas de la rosa: escalaX 0→1, 0.5s
- Todo el desplazamiento: 0.2s facilidad

## Responsive
- Móvil: cuadrícula de una sola columna, tipo de héroe clamp(40px, 8vw, 80px), navegación de hamburguesa

## Copia completa
- Marca denominativa: "Clara Bloom Photography"
- Héroe: "Documentar historias de amor" / "Fotografía de bodas y fugas en el Reino Unido y Europa"
- Nav: Portafolio · Acerca de · Inversión · Contacto
- Paquetes: Fuga desde £1,200 · Día de la boda desde £2,400 · Destino desde £4,200
- Testimonio: "Clara capturó momentos que ni siquiera sabíamos que estaban sucediendo; las fotos van más allá de todo lo que imaginamos". — Sophie & James, junio de 2025
- CTA: "Contemos tu historia" / "Fechas limitadas disponibles para 2026: consulta con antelación"
- Pie de página: "© 2026 Clara Bloom Photography · Londres, Reino Unido · Disponible en todo el mundo"