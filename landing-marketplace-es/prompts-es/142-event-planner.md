# Event Planner Website Prompt
# websiteprompts.ai

Cree un sitio web cinematográfico y editorial de planificación de eventos de lujo llamado "Canvas Events" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 220 12% 10%;          /* deep charcoal #161820 */
  --foreground: 42 22% 90%;           /* warm ivory */
  --primary: 42 22% 90%;
  --primary-foreground: 220 12% 10%;
  --accent: 42 55% 65%;               /* champagne gold #d4b87a */
  --surface: 220 10% 14%;
  --surface-raised: 220 9% 18%;
  --muted-foreground: 42 8% 58%;
  --border: 220 8% 22%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500&display=swap`
- Titulares: Cormorant Garamond 700 cursiva — cinemática escala
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas 10px espacio entre letras 0.14em

## Secciones

### 1. Navbar
- Fondo de carbón pegajoso, `backdrop-filter: blur(14px)`
- Izquierda: marca denominativa en cursiva Cormorant "Canvas Events" en dorado champán
- Derecha: Servicios · Eventos · Acerca de · Contacto + botón con contorno dorado "Comenzar a planificar →"

### 2. Hero
- Vista completa altura
- Fotografía de eventos con sangrado completo `posición: inserción absoluta-0 w-completo h-objeto completo-cubierta objeto-centro`
- Superposición de gradiente cinematográfico: `linear-gradient(to bottom, rgba(22,24,32,0.55) 0%, rgba(22,24,32,0.15) 40%, rgba(22,24,32,0.88) 100%)`
- Contenido `índice z: 10`, centrado, `display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 7vh`:
 - Inter 500 mayúscula, etiqueta dorada de 10 píxeles centrada: "Planificación de eventos de lujo · Londres y destino"
 - Cormorant Garamond 700 cursiva `clamp(58px, 9vw, 130px)` marfil centrado, altura de línea 0,88:
 "No planificamos eventos.\nConstruimos recuerdos".
 - Acento dorado en "Build Memories". 
 - Inter 300 marfil apagado centrado `max-width: 560px`: "Galas, cenas corporativas, lanzamientos de marcas y bodas, cada uno diseñado desde el primer informe hasta el brindis final"
 - Dos CTA centrados: "Ver nuestros eventos →" (texto oscuro y relleno de oro) + "Hable con nosotros" (marfil fantasma)

{/* Resumen de imagen: evento de salón de gala de lujo, mesas redondas con centros de mesa florales altos, velas suaves e iluminación colgante, invitados formales de gala, fotografía editorial del evento */}

: desvanecimiento escalonado en el soporte: etiqueta (0), título (0,15 s), sub (0,3 s), CTA (0.45s)

### 3. Franja de servicios
- Superficie de ancho completo con borde superior dorado
- 4 fichas deslizables desde la izquierda en el desplazamiento, escalonadas 0.1s:
 - Eventos corporativos (lanzamientos de marca, revelaciones de productos,galas)
 - Celebraciones privadas (cumpleaños importantes, aniversarios)
 - Bodas (destino de servicio completo y Londres)
 - Experiencias de marca (activaciones inmersivas)
- Cada uno: Cormorant cursiva etiqueta dorada + Inter 300 silenciado descripción

### 4. Eventos exclusivos
- "Lo que hemos construido" — Cormorant 700 cursiva marfil
- 3 filas de ancho completo con elevación flotante:
 - Corporativo y marca (galas, lanzamientos de productos, veladas de premiación para FTSE 100 clientes)
 - Celebraciones privadas (eventos importantes de hasta 400 invitados)
 - Bodas y fugas (abastecimiento completo del lugar, estilo y coordinación del día)
- Cada uno: Cormorant 600 cursiva tipo de evento grande a la izquierda + descripción Inter 300 a la derecha + oro "→"
- `border-bottom: 1px solid hsl(var(--border))`
- Al pasar el cursor: el fondo se eleva, el texto se vuelve dorado

### 5. Galería
- "The Events" — Cormorant 700 italic
- Cuadrícula de mampostería de 2 columnas, 6 imágenes, aspecto alternado de 3/4 y 4/3 proporciones, sin radio de borde, espacio de 3 píxeles
- Colocar el cursor sobre: superposición oscura `opacity 0→0.75` + nombre del evento en cursiva Cormorant + año

{/* Resumen de imagen: evento de cóctel en la azotea al anochecer, horizonte de Londres, luces de colores, invitados con champán */}
{/* Resumen de imagen: mesa de cena formal íntima, corredor largo, velas altas, flores, luz cálida y cambiante */}
{/* Resumen de imagen: espacio de activación de marca: espectacular pantalla retroiluminada, atmósfera inmersiva */}
{/* Resumen de imagen: carpa exterior de boda a la hora dorada, luces de colores */}
{/* Resumen de imagen: escenario de ceremonia de premiación, iluminación espectacular, podio vacío, atmósfera previa al evento */}
{/* Resumen de imagen: primer plano de los detalles del evento: tarjeta de lugar, cubiertos de oro, flor, editorial */}

### 6. Proceso
- "Cómo trabajamos" - Cormorán 700 cursiva
- 4 pasos horizontales: Llamada de descubrimiento → Resumen creativo → Coordinación completa → Día del evento
- Cormorán dorado descolorido grande número en cursiva (opacidad 0,06) detrás de cada uno
- Descripción silenciada de Inter 300 por paso

### 7. Acerca de
- Dividido: imagen derecha, texto izquierdo
- Cormorant 700 cursiva: "Construido sobre la base de 12 años de ofrecer el extraordinario"
-Inter 300 silenciado 2 párrafos, fundado por dos ex directores de eventos de hoteles de lujo. Servicio completo: lugar, catering, producción, audiovisual, floral, entretenimiento.
- Fichas de oro: "12 años · Más de 400 eventos · Londres e internacional"

{/* Resumen de imagen: planificador de eventos en el trabajo, configuración detrás de escena, fondo elegante del lugar */}

### 8. Testimonios
- 3 tarjetas: cita en cursiva de cormorán, nombre del cliente + tipo de evento en Inter 10px silenciado, fila de 5 estrellas en dorado
- Desvanecimiento escalonado en el desplazamiento

### 9. Contacto CTA
- Fondo dorado champán de ancho completo `#d4b87a`
- Cormorant 700 cursiva carbón oscuro: "Su próximo evento comienza aquí"
- Inter 300 oscuro: "Cada evento comienza con una llamada de descubrimiento de 30 minutos; sin compromiso, solo una conversación sobre lo que está imaginando"
- "Reserve una llamada de descubrimiento →" botón carbón oscuro
- "Disponible para eventos en todo el Reino Unido y internacionalmente" Inter 10px oscuro 70%

### 10. Pie de página
- Fondo de carbón profundo, marca denominativa Cormorant en cursiva en dorado
- Instagram · Pinterest · LinkedIn
- "© 2026 Canvas Events · Luxury Event Planning · Londres · Disponible En todo el mundo"

## Animaciones
- Héroe: desvanecimiento escalonado en la montura (contenido ubicado en la parte inferior)
- Tira de servicios: deslizarse desde la izquierda, escalonamiento 0,1 s en el desplazamiento
- Galería: desvanecimiento escalonado en el desplazamiento
- Reglas de oro: escalaX 0→1, 0.5s

## Responsive
- Móvil: texto de héroe apilado de ancho completo, galería de una sola columna, navegación de hamburguesa

## Copia completa
- Marca denominativa: "Canvas Events"
- Héroe: "Nosotros No planifiquemos eventos. Nosotros construimos recuerdos". / "Galas, cenas corporativas, lanzamientos de marcas y bodas"
- Servicios: Eventos corporativos · Celebraciones privadas · Bodas · Experiencias de marca
- Proceso: Discovery Call → Creative Brief → Coordinación completa → Día del evento
- Testimonio: "Canvas Events se realizó en una velada de la que nuestros invitados todavía hablan seis meses después. Cada detalle, hasta la carta del menú "Se consideró la tipografía". — James H., director ejecutivo, Londres
- CTA: "Su próximo evento comienza aquí" / "30 minutosllamada de descubrimiento, sin compromiso"