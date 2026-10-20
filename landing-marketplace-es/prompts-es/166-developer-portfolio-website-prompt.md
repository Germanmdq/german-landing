# Sitio web de cartera de desarrolladores Prompt
# websiteprompts.ai

Cree un sitio web de cartera personal para **Alex Chen**, un desarrollador completo que crea aplicaciones web rápidas y modernas. Base casi negra, acento verde código, fuerte presencia de JetBrains Mono. Oscuro, técnico, preciso: ambiente similar al portafolio del diseñador pero con una estética de código base: energía terminal, etiquetas monoespaciadas, momentos de resaltado de sintaxis.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

## Diseño Sistema
```css
:root {
  --background: 0 0% 4%;            /* #0a0a0a near-black */
  --surface: 0 0% 7%;               /* #121212 surface */
  --surface-raised: 0 0% 10%;       /* #1a1a1a raised */
  --border: 0 0% 13%;               /* #212121 border */
  --foreground: 0 0% 95%;           /* #f2f2f2 off-white */
  --muted: 0 0% 42%;                /* #6b6b6b muted */
  --primary: 142 72% 50%;           /* #22d472 code green */
  --primary-dark: 142 76% 38%;      /* #18a355 hover */
  --primary-glow: 142 72% 50% / 0.12;
  --mono: 'JetBrains Mono', monospace;
}
```

## Tipografía
Importación: `https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap`
- Pantalla / H1–H2: Sora 700–800, espacio entre letras -0,04em
- Cuerpo / UI: Sora 300–500
- Código/Etiquetas/Todo lo técnico: JetBrains Mono 400–500

## Efectos visuales

**Acento de héroe del bloque de código de terminal**: tarjeta oscura flotante detrás/al lado de H1, diseñada como un código fragmento:
```
background: hsl(var(--surface)); border: 1px solid hsl(var(--border));
border-radius: 8px; padding: 20px 24px; font-family: var(--mono); font-size: 13px;
```
Contenido (sintaxis resaltada con intervalos):
```jsx
<span style={{color:'#6b6b6b'}}>// building the future</span>
<br/><span style={{color:'#22d472'}}>const</span> <span style={{color:'#f2f2f2'}}>alex</span> = {'{'}
<br/>  role: <span style={{color:'#22d472'}}>"Full-Stack Dev"</span>,
<br/>  stack: [<span style={{color:'#22d472'}}>"React"</span>, <span style={{color:'#22d472'}}>"Node"</span>, <span style={{color:'#22d472'}}>"TS"</span>],
<br/>  open: <span style={{color:'#22d472'}}>true</span>
<br/>{'}'}
```
Animate: float `y: [0, -8, 0]`, duración 4s, infinito easy-in-out.

**Desplazamiento de tarjeta luminosa** — todas las tarjetas: `transición: color de borde 0,18 s, sombra de cuadro 0,18 s`. Colocar el cursor sobre: `border-color: hsl(var(--primary))`, `box-shadow: 0 0 32px hsl(142 72% 50% / 0.12)`.

**Cursor de escritura** — después del héroe H1, un cursor verde parpadeante: `<span>|</span>` con CSS `animation: blink 1s step-end infinite; @keyframes blink { 50% { opacity: 0; } }`.

**Desaparición escalonada** — `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`, 0,5 s, IntersectionObserver por sección.

## Secciones

**1. Barra de navegación**: fija, `background: hsl(var(--background) / 0.92)`, desenfoque de 12 píxeles, borde inferior. Izquierda: "Alex Chen" Sora 700 16px blanco + etiqueta verde JetBrains Mono 10px "Full-Stack Dev". Centro: Proyectos · Stack · Acerca de · Contacto. Derecha: botón verde "Contrátame →", radio de borde de 6 píxeles, Sora 600 de 12 píxeles.

**2. Hero**: ventana gráfica completa, dos columnas, "alinear elementos: centro", relleno 100 px 64 px. Izquierda: Insignia verde JetBrains Mono de 11 px "DISPONIBLE PARA ALQUILER · 2026" con cursor parpadeante. H1 Sora 800, clamp(52px, 6.5vw, 88px), altura de línea 0,92, blanco:
```
Building apps
people actually use.
```
Sub: Sora 300 16px silenciado, ancho máximo 400px: "Desarrollador full-stack especializado en React, Node.js y TypeScript. Rápido, accesible y construido aescala."
CTA: "Ver proyectos →" (relleno de verde) + "Descargar CV" (borde fantasma). Debajo de los CTA: píldoras de etiquetas tecnológicas en JetBrains Mono 10px — React · Node.js · TypeScript · PostgreSQL · AWS — superficie oscura bg, texto verde.
Derecha: bloque de código de terminal flotante (Efectos visuales arriba) con un sutil brillo verde `filter: drop-shadow(0 0 40px hsl(142 72% 50% / 0.15))`.

**3. Proyectos destacados**: relleno 100px 64px: "Proyectos". 3 tarjetas de proyecto grandes apiladas (cada tarjeta de ancho completo `background: hsl(var(--surface))`, borde, radio de borde 12px, relleno 32px, fila flexible (información a la izquierda + maqueta/captura de pantalla a la derecha). Izquierda: etiqueta verde JetBrains Mono 10px (por ejemplo, "REACT · NODE · POSTGRES") + nombre del proyecto Sora 700 22px + descripción de 2 líneas + fila del chip técnico + enlace verde "Ver proyecto →" Derecha: captura de pantalla del proyecto:
```
{/* Image: clean web app UI on dark background, modern dashboard design, green accent colors, minimal and precise */}
```
Glow on hover 3 proyectos: Panel de análisis SaaS · Plataforma de comercio electrónico. Herramienta de colaboración en tiempo real.

**4. Tech Stack**: superficie bg, relleno 96px 64px. H2 "La pila". Etiquetas verdes JetBrains Mono de 10px para cada categoría: Frontend (React · Next.js · TypeScript · Tailwind · Framer Motion) / Backend (Node.js · PostgreSQL · Redis · Prisma · AWS). + nombre en JetBrains Mono 11px. Encabezados de categoría en JetBrains Mono 9px silenciados en mayúsculas.

**5. Acerca de**: dos columnas, relleno 96px 64px Izquierda: H2 "Acerca de mí". Compatible con control remoto.
Derecha: foto de retrato:
```
{/* Image: young male developer at dark minimal desk setup, terminal on screen, green code on monitor, focused professional portrait, ambient dark lighting */}
```

**6. Código abierto/GitHub**: franja centrada, relleno 60 px 64 px, superficie bg H2 "Fila de estadísticas de GitHub (3 tarjetas de superficie): Estrellas obtenidas · Repositorios públicos · Contribuciones este año: números en Sora". 800 verde, etiquetas en JetBrains Mono 10px silenciadas A continuación: 3 tarjetas de repositorio con nombre, punto de idioma, recuento de estrellas, descripción breve.

**7. Testimonios**: relleno 96px 64px "De clientes y equipos 3 tarjetas cada una: borde superior verde 2px + cita Sora 300 14px cursiva + nombre Sora 600 + rol. 10px silenciado. Entrada escalonada.

**8 CTA de contacto**: fondo oscuro, relleno 80px 64px.centrado. Brillo verde radial detrás del texto (opacidad 0,06). H2 Sora 900 blanco: "Construyamos algo". JetBrains Mono 11px verde: "Actualmente disponible · 2 o 3 espacios para proyectos abiertos". Dos CTA: "Iniciar una conversación →" (relleno en verde) + "O enviarme un correo electrónico" (enlace de texto). Nota de tiempo de respuesta silenciada.

**9. Pie de página**: `hsl(0 0% 3%)`, relleno 40px 64px 24px. Izquierda: "Alex Chen" + rol JetBrains Mono 10px silenciado. Derecha: GitHub · LinkedIn · Twitter: enlaces de iconos silenciados → cursor verde. Abajo: copyright JetBrains Mono 10px silenciado.

## Responsive
Mobile: superposición de hamburguesa de navegación · columna única de héroe, bloque de código debajo con un ancho del 85% · proyectos apilados completamente · cuadrícula de pila de 3 columnas · aproximadamente una sola columna.

## Resumen de animaciones
| Elemento | Animación | Gatillo |
|---|---|---|
| Héroe H1 | Desvanecimiento | En el soporte |
| Cursor de escritura | Bucle de parpadeo | Siempre |
| Bloque de código | Flotar y 0→-8→0, 4s | Siempre |
| Tarjetas de proyecto | Desvanecimiento escalonado | Desplazamiento |
| Apilar artículos | Desvanecimiento escalonado | Desplazamiento |
| Llamada a la acción | Desvanecimiento + brillo | Desplazarse |

## Dependencias clave
```json
{ "motion": "^12.x", "lucide-react": "^0.400.x" }
```

> **Notas rápidas:** El acento verde se intercambia a través de `--primary`. La sección de estadísticas de GitHub es una interfaz de usuario estática: se conecta a la API de GitHub después de la generación. "Alex Chen" y todos los nombres de los proyectos son marcadores de posición. La sección de pila de tecnología debe reflejar habilidades reales.