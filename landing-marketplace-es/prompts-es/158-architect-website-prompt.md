# Sitio web de arquitecto/empresa de arquitectura Prompt
# websiteprompts.ai

Cree un sitio web de cartera de empresa de arquitectura ultra minimalista llamado "Forma Studio" utilizando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 0 0% 98%;           /* near-white #fafafa */
  --foreground: 0 0% 8%;            /* near-black #141414 */
  --primary: 0 0% 8%;               /* black — no color accent */
  --primary-foreground: 0 0% 98%;
  --surface: 0 0% 94%;
  --muted-foreground: 0 0% 52%;
  --border: 0 0% 88%;
}
```

Sin acento de color. Blanco y negro puro. Toda la profundidad proviene de la escala y el espaciado de la tipografía.

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap`
- Todo el texto: Space Grotesk
- Titulares: Space Grotesk 700 — muy grande
- Cuerpo: Space Grotesk 300–400
- Etiquetas: Espacio Grotesk 500 mayúsculas 10px espaciado entre letras 0,15em

## Secciones

### 1. Barra de navegación
- Barra de navegación blanca mínimamente adhesiva, sin color de fondo (transparente al cargar, blanco encendido scroll)
- Izquierda: "FORMA" en Space Grotesk 700 mayúsculas espaciado 0.2em
- Derecha: Trabajo · Estudio · Servicios · Contacto (Space Grotesk 400 mayúsculas 11px) + enlace de texto fino "→ Ponte en contacto"

### 2. Hero
: altura de la ventana gráfica completa, fondo blanco
: la imagen grande del proyecto con sangrado completo cubre el 70% de la altura de la ventana gráfica, ancho completo, sin radio de borde, cobertura de objeto
: superposición de degradado solo en la parte inferior: `linear-gradient(to top, rgba(250,250,250,1) 0%, transparent 40%)`
: imagen inferior: contenido alineado a la izquierda en una página normal flow
 - Space Grotesk 300 etiqueta apagada de 10 píxeles en mayúsculas: "Arquitectura y diseño de interiores: Londres"
 - Space Grotesk 700 `clamp(56px, 8vw, 128px)` título en negrita: "Space.\nLight.\nPurpose".
 - Una CTA: "Ver nuestro trabajo →" (relleno de negro, Space Grotesk 500) + enlace de texto "Acerca del estudio"

{/* Resumen de imagen: exterior de edificio minimalista moderno, líneas limpias, gran fachada de vidrio, luz natural nublada, fotografía arquitectónica */}

### 3. Project Grid
- "Obra seleccionada" — Space Grotesk 700 grande + "( 12 proyectos )" en Space Grotesk 300 silenciado alineado a la derecha
- Cuadrícula de mampostería: 2 columnas, 6 imágenes de proyecto, alturas variables (relación de aspecto 4/3 y 3/4 alternadas)
- Cada imagen: al pasar el mouse, opacidad de superposición negra 0→0,85 con el nombre del proyecto (Space Grotesk 700 blanco grande) + categoría (SpaceGrotesk 300 mayúsculas 10px silenciadas) + año
- `transición: 0,3 s de facilidad`
- Sin radio de borde en las imágenes
- Fundido escalonado: opacidad 0→1, 0,4 s, índice * 0,1 s

{/* Resumen de imagen: residencial minimalista interior, paredes de hormigón, grandes ventanales, luz natural, estética escandinava */}
{/* Imagen breve: exterior de un edificio de oficinas moderno, fachada geométrica, vidrio y acero, durante el día */}
{/* Imagen breve: interior de un apartamento de lujo, planta abierta, ventanales del suelo al techo, vista a la ciudad */}
{/* Imagen breve: arquitectura de edificio cultural, hormigón limpio, sombras espectaculares, exterior de gran angular */}
{/* Resumen de imagen: interior de cocina minimalista, gabinetes blancos, isla de mármol, luz natural */}
{/* Resumen de imagen: detalle arquitectónico, escalera de hormigón, luces y sombras espectaculares */}

### 4. Servicios
- "What We Do" — Space Grotesk 700 + slim `border-top: 1px solid hsl(var(--border))`
- 4 filas de servicios como elementos de lista horizontal, ancho completo, `border-bottom: 1px solid hsl(var(--border))`
- Cada uno: nombre de servicio grande de Space Grotesk 700 a la izquierda + descripción de Space Grotesk 300 a la derecha + ícono "→" en el extremo derecho
- Al pasar el mouse: el fondo pasa a casi negro, todo el texto se invierte a blanco, `transición: 0.2s`
- Servicios: Arquitectura · Diseño de interiores · Renovación y ampliación · Consultoría de planificación

### 5. Acerca de / Studio
- Cita de extracción en cursiva de Cormorant grande: espere, use Space Grotesk 300 en cursiva: "Creemos que los mejores espacios se sienten antes de que sean entendido. 300 biografías + fichas de premios: Premio RIBA 2023 · Lista corta de Dezeen · Registrado por ARB

{/* Resumen de imagen: retrato de un arquitecto masculino, oficina minimalista, dibujos arquitectónicos, luz natural, profesional serio */}

### 6. Stats Strip
: fondo `#141414` de ancho completo casi negro, 80px de alto
- 4 estadísticas blancas en Space Grotesk 700: "48 Proyectos" · "12 Países" · "RIBA Award 2023" · "Est. 2014"
- Space Grotesk 300Etiquetas de 10 píxeles en mayúsculas debajo de cada estadística
- Uso de Framer MotionConteo de primavera en el desplazamiento (números)

### 7. Proceso
- "Cómo trabajamos" — Space Grotesk 700
- 4 fases como pasos horizontales numerados: `01 Resumen y visión → 02 Diseño conceptual → 03 Planificación y construcción → 04 Entrega`
- Número grande de Space Grotesk 700 en negro descolorido (opacidad 0,06) detrás de cada paso
- Descripción de Space Grotesk 300 por fase

### 8. Contacto CTA
- Casi negro de ancho completo fondo
- Space Grotesk 700 blanco `clamp(48px, 6vw, 96px)`: "Construyamos\nalgo\nExtraordinario"
- Space Grotesk 300 blanco sub silenciado: "Asumimos un número selecto de proyectos cada año"
- "Iniciar una conversación →" texto blanco bg negro botón
- "hello@formastudio.co.uk" Space Grotesk 300 blanco apagado abajo

### 9. Pie de página
- Fondo blanco, minimalista
- Izquierda: "FORMA" mayúscula Space Grotesk 700
- Centro: Trabajo · Estudio · Servicios · Contacto
- Derecha: Instagram · LinkedIn
- Abajo: "© 2026 Forma Studio · Londres, Reino Unido · Registrado por ARB · Miembro de RIBA"

## Animaciones
- Imagen principal: montaje instantáneo, sin animación: deja que la imagen respire
- Cuadrícula del proyecto: desvanecimiento escalonado en desplazamiento (solo opacidad, sin movimiento y) 
- Filas de servicio: inversión de desplazamiento - 0,2 s de facilidad
- Estadísticas: recuento en desplazamiento
- Titular de CTA: revelación de ruta de clip por palabra, `clipPath: 'inset(0 100% 0 0)'→'inset(0 0 0 0)'`, 0,6 s, escalonamiento 0,15 s

## Responsive
- Móvil: cuadrícula de proyecto de una sola columna, héroe apilado, filas de servicio de ancho completo

## Copia completa
- Marca denominativa: "FORMA"
- Lema: "Arquitectura y diseño de interiores — Londres"
- Héroe: "Espacio. Luz. Propósito". 
- Servicios: Arquitectura · Diseño de interiores · Renovación y ampliación · Consultoría de planificación
- Acerca de: "Creemos que los mejores espacios se sienten antes de entenderse. life."
- Estadísticas: 48 Proyectos · 12 Países · Premio RIBA 2023 · Est. 2014
- Proceso: Resumen y Visión → Diseño Conceptual→ Planificación y construcción → Entrega
- CTA: "Construyamos algo extraordinario" / "Asumimos un número selecto de proyectos cada año"
- Contacto: "hello@formastudio.co.uk · +44 20 7234 5678"