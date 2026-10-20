# Sitio web de portafolio de diseñador Prompt
# websiteprompts.ai

Cree un sitio web de portafolio personal para **Paul Smith**, un diseñador de productos y UI/UX que crea experiencias digitales limpias y modernas. Base oscura casi negra, tipo blanco, objeto de acento 3D abstracto en héroe. Mínimo, seguro, tipográficamente atrevido. Inspirado en estudios de productos digitales de alta gama.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

## Design Sistema
```css
:root {
  --background: 0 0% 4%;            /* #0a0a0a near-black */
  --surface: 0 0% 7%;               /* #121212 card surface */
  --surface-raised: 0 0% 10%;       /* #1a1a1a raised */
  --border: 0 0% 14%;               /* #242424 border */
  --foreground: 0 0% 96%;           /* #f5f5f5 off-white */
  --muted: 0 0% 45%;                /* #737373 muted */
  --primary: 270 80% 68%;           /* #a855f7 purple accent */
  --primary-dark: 270 84% 55%;      /* #8b25f0 hover */
  --primary-glow: 270 80% 68% / 0.15; /* glow tint */
  --mono: 'JetBrains Mono', monospace;
}
```

## Tipografía
Importación: `https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400&display=swap`
- Pantalla / H1–H2: Sora 700–800, espacio entre letras -0,04em
- Cuerpo / UI: Sora 300–500
- Etiquetas/etiquetas: JetBrains Mono 400

## Efectos visuales

**Objeto héroe abstracto 3D**: forma 3D brillante centrada (abstracto fluido o floral) formulario):
```
{/* 3D Object: abstract fluid sculptural shape, glossy near-black metallic surface with subtle purple iridescent highlights, floating centered on pure black background, studio lighting from above */}
<img src="" alt="Abstract 3D sculptural design object"
  className="w-full h-full object-contain" />
```
Envolver en div con `filter: drop-shadow(0 0 60px hsl(270 80% 68% / 0.3))`. Animar: `animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}`.

**Desplazamiento de tarjeta luminosa**: tarjetas de cartera y de servicio al pasar el mouse:
```css
transition: border-color 0.18s, box-shadow 0.18s;
&:hover { border-color: hsl(var(--primary)); box-shadow: 0 0 40px hsl(270 80% 68% / 0.15); }
```

**Revelación de texto de ruta de clip** — Líneas H1: `initial={{ clipPath: 'inset(0 100% 0 0)' }}` → `animate={{ clipPath: 'inset(0 0% 0 0)' }}`, duración 0,65 s, `facilidad: [0.76, 0, 0.24, 1]`, escalonamiento 0.1s por línea.

**Cursor resplandeciente** — El degradado radial violeta suave de 200 px sigue al cursor:
```css
.cursor-glow { position: fixed; width: 200px; height: 200px; border-radius: 50%;
  background: radial-gradient(circle, hsl(270 80% 68% / 0.06), transparent 70%);
  pointer-events: none; transform: translate(-50%, -50%); z-index: 0; }
```
Actualizar posición con el evento `mousemove` oyente.

## Secciones

**1. Barra de navegación**: fija, `background: hsl(var(--background) / 0.92)`, desenfoque de 12 px, borde inferior de 1 px. Izquierda: "Paul Smith" Sora 700 16px blanco. Centro: Portafolio · Acerca de · Servicios · Tecnologías · Contratame. Derecha: "Contrátame →" — botón relleno de color púrpura, radio de borde 6px, Sora 600 12px.

**2. Hero**: ventana gráfica completa, columna central flexible, centro de alineación de texto, posición relativa. Insignia: pastilla de tinte violeta "Disponible para alquiler" con un punto violeta pulsante. Revelación de ruta de clip H1, Sora 800, clamp(52px, 7vw, 96px), altura de línea 0,92, espacio entre letras -0,04em, blanco:
```
Product designer crafting
clean & modern designs.
```
Sub: Sora 300 16px silenciado, "Convertir problemas complejos en interfaces intuitivas. 5 años · Más de 40 proyectos". centrado, ancho máximo 460 px, margen superior 20 px.
CTA: "Explorar →" (relleno de color púrpura, Sora 600 13 px, radio de borde 8 px) + "Descargar CV" (borde fantasma). AbajoCTA: objeto 3D centrado, ~500×500px, con brillo. Abajo: fila de 4 marcas de logotipos tecnológicos (Figma · Framer · Webflow · Adobe) en blanco apagado 30 %.

**3. Trabajo seleccionado**: relleno 100 px 64 px. H2 "Obra seleccionada". Sora 800 clamp(40px, 5vw, 64px). Abajo: cuadrícula de proyecto asimétrica de 2 columnas, espacio de 16 píxeles. Tarjeta grande (col-span 2 en la primera): captura de pantalla del proyecto/imagen de maqueta + superposición al pasar el mouse (nombre del proyecto + categoría + "Ver estudio de caso →"). Tarjetas pequeñas (2 por fila): mismo patrón. 5 proyectos en total. Cada tarjeta `background: hsl(var(--surface))`, borde, radio de borde 12px, desbordamiento oculto, relación de aspecto 16/9 para imagen, brillo flotante.
```
{/* Project image brief: clean product UI mockup on dark background, purple accent colors, modern dashboard or mobile app design */}
```

**4. Acerca de**: dos columnas, relleno 96 px 64 px. Izquierda: H2 "Productos de artesanía que a la gente le encantan". Sora 800. 3 párrafos (antecedentes, proceso, herramientas). Chips de credenciales: Sora 700 · Diseño de producto · 5 años de experiencia · Más de 40 proyectos · Compatible con control remoto.
Derecha: vertical + tarjeta de pila flotante que muestra la cuadrícula de herramientas (iconos de Figma / Framer / Adobe / Webflow en tarjetas de superficie pequeña).
```
{/* Image: young male designer at minimal dark desk setup, dual monitors, ambient purple light, calm focused atmosphere */}
```

**5. Servicios**: superficie bg, relleno 96px 64px. H2 "Lo que hago". Cuadrícula de tarjetas de 3 columnas. Cada tarjeta: etiqueta de categoría JetBrains Mono 10px + nombre del servicio Sora 700 18px + descripción de 2 líneas + precio inicial. Resplandor flotante. Servicios: Diseño UI/UX desde $2,400 · Desarrollo Framer desde $1,800 · Sistemas de diseño desde $3,200.

**6. Tecnologías**: franja centrada, relleno 60 px 64 px. H2 "Tecnologías". Cuadrícula de iconos 6 a lo ancho: Figma · Framer · Webflow · React · Adobe · Notion. Cada uno: marcador de posición de icono + nombre en JetBrains Mono 10px. Valor predeterminado silenciado, blanco al pasar el mouse.

**7. Testimonios**: relleno 96px 64px. H2 "De clientes". 3 cartas seguidas. Cada uno: borde superior morado 2px + cita Sora 300 cursiva 14px + nombre Sora 600 + rol JetBrains Mono 10px silenciado. Desvanecimiento escalonado.

**8. CTA**: ancho completo casi negro, relleno 80 px 64 px, centrado. Resplandor violeta radial detrás del texto (opacidad 0,08). H2 Sora 900: "Construyamos algo". Sub silenciado. "Iniciar un proyecto →" (en color violeta, grande) + "O enviarme un correo electrónico" (enlace de texto en color violeta). Abajo: nota de tiempo de respuesta JetBrains Mono silenciado.

**9. Pie de página**: `hsl(0 0% 3%)`, relleno 40px 64px 24px. Izquierda: "Paul Smith" + papel. Derecha: enlaces sociales (Dribbble, Behance, LinkedIn,GitHub). Abajo: copyright JetBrains Mono 10px silenciado.

## Responsive
Mobile: superposición de hamburguesa de navegación · hero H1 clamp(40px, 12vw, 64px) · Objeto 3D 280px · cuadrícula de trabajo de una sola columna · pila de servicios · aproximadamente una sola columna.

## Resumen de animaciones
| Elemento | Animación | Gatillo |
|---|---|---|
| Héroe H1 | Clip-path revela tambalear | En el soporte |
| Objeto 3D | Bucle flotante y 0→-12→0, 5s | Siempre |
| Brillo del cursor | Seguir cursor | Siempre |
| Tarjetas de trabajo | Desvanecimiento escalonado | Desplazamiento |
| Tarjetas de servicio | Desvanecimiento escalonado + desplazamiento luminoso | Desplazamiento |
| Llamada a la acción | Desvanecimiento | Desplazamiento |

## Dependencias clave
```json
{ "motion": "^12.x", "lucide-react": "^0.400.x" }
```

> **Notas rápidas:** El acento morado se cambia fácilmente a cualquier color de marca a través de `--primary`. El objeto 3D se describe mediante una imagen: Bolt/Lovable generará una forma abstracta. Los enlaces de estudios de casos necesitan URL de cartera o CMS reales. Cambie "Paul Smith" por el nombre real en todas partes.