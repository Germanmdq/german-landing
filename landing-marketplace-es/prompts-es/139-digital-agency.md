# Aviso del sitio web de la agencia digital
# websiteprompts.ai

Cree un sitio web de agencia digital y creativo, oscuro y audaz, llamado "Vortex Studio" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 250 14% 6%;           /* near-black deep #0a0a0f */
  --foreground: 0 0% 96%;             /* white */
  --primary: 256 72% 58%;             /* electric violet #6b3ce8 */
  --primary-foreground: 0 0% 96%;
  --accent: 256 72% 58%;
  --surface: 250 12% 10%;
  --surface-raised: 250 10% 14%;
  --muted-foreground: 250 8% 54%;
  --border: 250 8% 20%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@300;400;500&display=swap`
- Titulares: Space Grotesk 700 — geométrico, negrita
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas 10px espaciado entre letras 0.14em

## Secciones

### 1. Navbar
- Adhesivo, casi negro, `backdrop-filter: blur(14px)`
- Izquierda: Space Grotesk 700 "VORTEX" en violeta
- Derecha: Trabajo · Servicios · Acerca de · Contacto + botón violeta "Iniciar un proyecto →"

### 2. Hero
- Altura de la ventana gráfica completa, casi negro background
- Fondo: `position: absolute; right: 0; top: 0; width: 50%; height: 100%;`
 Degradado radial: `background: radial-gradient(ellipse at 70% 50%, rgba(107,60,232,0.25) 0%, rgba(107,60,232,0.06) 50%, transparent 70%)`
 Adicional: superposición de patrón de cuadrícula sutil `background-image: linear-gradient(rgba(107,60,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(107,60,232,0.04) 1px, transparent 1px); background-size: 60px 60px`
- Contenido `z-index: 10`, alineado a la izquierda `padding-left: 7vw`, centrado verticalmente, `max-width: 55%`:
 - Inter 500 mayúscula 10px etiqueta violeta: "Digital · Branding · Web · Motion"
 - Space Grotesk 700 `clamp(52px, 7.5vw, 115px)` blanco, altura de línea 0.88: "CONSTRUIMOS\nMACAS ESO\nDOMINAR."
 - Acento violeta en "DOMINAR". 
 - Subtítulo silenciado de Inter 300: "Identidad de marca, diseño web y experiencias digitales para empresas que se niegan a ser ignoradas, desde la semilla hasta la Serie B"
 - CTA: "Iniciar un proyecto →" (relleno violeta) + "Ver nuestro trabajo". (fantasma)
: 3 tarjetas flotantes de vista previa del proyecto apiladas en la parte inferior derecha (`position: absolute; right: 7vw; bottom: 8vh; z-index: 20`), cada una de 220×130 px, superficie oscura con borde violeta, escaladas y ligeramente giradas: tarjeta1 `rotate(-2deg)`, tarjeta2 `rotate(1deg) translateY(-20px)`, tarjeta3 `rotate(-1deg) translateY(-40px)`. Cada uno muestra una miniatura de maqueta + nombre del proyecto Space Grotesk de 12 píxeles 
: las tarjetas se animan desde la derecha y se escalonan 0,15 s

{/* Resumen de la imagen: tarjetas de proyecto flotantes que muestran: (1) maqueta de identidad de marca: logotipo en fondo oscuro; (2) maqueta de la interfaz de usuario web: panel oscuro y limpio; (3) imagen fija con diseño de movimiento: visual abstracto */}

: desvanecimiento escalonado en el soporte: etiqueta, título, sub, CTA (retardo de 0,1 s)cada uno)

### 3. Trabajo seleccionado
- "Trabajo seleccionado" — Space Grotesk 700 blanco, `clamp(42px, 5vw, 72px)`
- 4 filas de proyecto de ancho completo, elevación al pasar el cursor:
 - Aura Finance — Identidad de marca + Diseño web (Fintech · 2025)
 - Construct — Sitio web de arquitectura (Propiedad · 2025)
 - Zeno Health — UI del producto + movimiento (Health Tech · 2024)
 - Meridian — Marca de comercio electrónico (minorista · 2024)
- Cada fila: número de proyecto grande (opacidad) 0,06) izquierda, nombre del proyecto Space Grotesk 700 en el centro izquierda, tipo silenciado Inter 300 + año a la derecha, violeta "→" extremo derecho
- `border-bottom: 1px solid hsl(var(--border))`
- Pasar el cursor: superficie elevada, el nombre del proyecto se vuelve violeta, la fila se expande ligeramente

### 4. Servicios
- "What We Do" — Space Grotesk 700 white
- Cuadrícula 3×2, tarjetas de superficie oscura:
 - Identidad de marca (estrategia, naming, identidad visual, pautas de marca)
 - Diseño y desarrollo web (Webflow, Framer, personalizado — dirigido por conversión)
 - Movimiento y animación (movimiento de marca, animación UI, video)
 - Diseño UI/UX (diseño de producto, creación de prototipos, pruebas de usuario)
 - Contenido y copia (voz de marca, copia web, contenido de campaña)
 - Estrategia digital (posicionamiento de marca, audiencia, hoja de ruta digital)
- Cada uno: icono de lucide violeta, nombre de Space Grotesk 700, descripción de Inter 300 
- Desplazamiento: borde violeta + `box-shadow: 0 0 20px hsl(256 72% 58% / 0.14)`

### 5. Proceso
- "Cómo trabajamos" - Space Grotesk 700 blanco
- 4 pasos: Descubrimiento → Estrategia → Diseño y construcción → Launch
: gran número violeta descolorido (opacidad 0,05) detrás de cada paso. blanco: "Somos un estudio de 8 personas. Pequeño a propósito". 
- Inter 300 silenciado: 2 párrafos - fundado en 2018. Sin equipos junior, sin subcontratación. Cada proyecto es manejado por el mismo equipo senior desde el inicio hasta el lanzamiento. El 92% de los clientes regresan.
- Chips violetas: "Est. 2018 · 8 personas · Londres · 92% clientes habituales"

{/* Resumen de imagen: pequeño equipo de agencia creativa en el trabajo, estudio abierto, monitores oscuros, energía colaborativa,espacio de trabajo contemporáneo */}

### 7. Testimonios
- Sección en relieve
- 3 tarjetas: fila violeta de 5 estrellas, cita blanca en cursiva Inter 300, empresa + tipo de proyecto Inter 10px silenciado
- Desvanecimiento escalonado scroll

### 8. Iniciar un proyecto CTA
- Ancho completo, `background: hsl(256 72% 58%)` violeta
- Space Grotesk 700 blanco `clamp(42px, 5vw, 72px)`: "¿Listo para construir algo grandioso?"
- Inter 300 blanco: "Díganos qué es edificio: le diremos en qué podría convertirse"
- "Iniciar un proyecto →" botón blanco (texto oscuro)
- "Marca · Web · Motion · London & Remote" Inter 10px blanco 70%

### 9. Pie de página
- Casi negro, Space Grotesk 700 "VORTEX" en violeta
- Instagram · Behance · LinkedIn
- "© 2026 Vortex Studio · Brand & Digital Agency · Londres · Disponible a nivel mundial"

## Animaciones
- Héroe: desvanecimiento escalonado en la montura, escala de tarjetas de proyecto desde 0,9 + traducción desde la derecha, escalonamiento 0.15s
- Filas de trabajo: elevación del cursor + transición violeta 0.2s
- Cuadrícula de servicio: desvanecimiento escalonado en el desplazamiento
- Reglas violetas: escalaX 0→1, 0.5s

## Responsive
- Móvil: cartas de héroe ocultas en el móvil (contenido principal en ancho completo), servicios de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "VORTEX"
- Héroe: "CONSTRUIMOS MARCAS QUE DOMINAN". / "Identidad de marca, diseño web y experiencias digitales para empresas que se niegan a ser ignoradas"
- Servicios: Identidad de marca · Diseño y desarrollo web · Motion · UI/UX · Contenido · Estrategia
- Trabajo: Aura Finance · Construct · Zeno Health · Meridian
- Estadísticas: Est. 2018 · 8 personas · 92% clientes habituales
- Testimonio: "Vortex rediseñó toda nuestra marca y sitio web en 8 semanas. Nuestra tasa de conversión se duplicó. Hemos estado trabajando con ellos durante 3 años". — Alex R., fundador de Aura Finance
- CTA: "¿Listo para construir algo grandioso?" / "Cuéntanos qué estás construyendo"