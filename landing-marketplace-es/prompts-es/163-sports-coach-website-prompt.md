# Sitio web de entrenador deportivo Prompt
# websiteprompts.ai

Cree un sitio web de entrenador deportivo y entrenador personal para **Jake Perform**, un entrenador de ciclismo y deportes de resistencia de élite. Héroe fotográfico de acción oscura a sangre completa, superficie oscura, tipografía blanca llamativa, acento verde fresco. Alta energía pero preciso: este es un rendimiento serio, no una marca de gimnasio.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

## Design Sistema
```css
:root {
  --background: 220 18% 8%;         /* #0f1118 near-black blue-grey */
  --surface: 220 14% 11%;           /* #161b24 surface */
  --surface-raised: 220 12% 14%;    /* #1e2530 raised */
  --border: 220 10% 20%;            /* #2a3040 border */
  --foreground: 210 20% 95%;        /* #f0f3f8 off-white */
  --muted: 220 10% 50%;             /* #707a90 muted blue-grey */
  --primary: 142 68% 48%;           /* #20c758 performance green */
  --primary-dark: 142 72% 36%;      /* #189840 hover */
  --primary-glow: 142 68% 48% / 0.15;
  --mono: 'JetBrains Mono', monospace;
}
```

## Tipografía
Importación: `https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400&display=swap`
- Pantalla / H1–H2: Sora 700–800, espacio entre letras -0,03em
- Cuerpo / UI: Sora 300–500
- Estadísticas/Etiquetas/Datos: JetBrains Mono 400

## Efectos visuales

**Foto de héroe sin borde**: composición independiente con gradiente:
```
{/* Image: elite cyclist in full racing kit riding at speed on an empty road, motion blur background, dramatic low angle, overcast moody sky, high intensity athletic action */}
```
Gradient superposición (independiente de la posición del sujeto):
```css
background: linear-gradient(
  to bottom,
  rgba(15,17,24,0.3) 0%,
  rgba(15,17,24,0.5) 40%,
  rgba(15,17,24,0.92) 80%,
  rgba(15,17,24,1) 100%
);
```

**Estadística de brillo verde**: números de estadísticas de rendimiento con sombra de texto verde:
```css
.stat-num { color: hsl(var(--primary)); text-shadow: 0 0 30px hsl(142 68% 48% / 0.4); }
```

**Estadísticas de conteo**: useSpring + useInView, activado el scroll.

**Desvanecimiento escalonado**: 0,5 s por sección, IntersectionObserver.

## Secciones

**1. Barra de navegación**: fija, `background: hsl(var(--background)/0.94)`, desenfoque de 12 píxeles, borde inferior. Izquierda: "Perform" Sora 800 18px blanco + JetBrains Mono 10px etiqueta verde "Entrenador deportivo". Centro: Formación · Resultados · Acerca de · Contacto. Derecha: "Comenzar": relleno de color verde, radio de borde de 6 píxeles. Fila de estrellas visible "★★★★★" en JetBrains Mono 10px + "Más de 350 atletas entrenados" junto a CTA.

**2. Hero**: ventana gráfica completa, posición relativa, desbordamiento oculto. Fondo: fotografía de acción a sangre completa + superposición de degradado (efectos visuales). Contenido z-10, ubicado en la parte inferior de la ventana gráfica, relleno 0 64px 80px: JetBrains Mono 10px verde mayúscula "ENTRENAMIENTO DE RENDIMIENTO DE ÉLITE". H1 Sora 800, clamp(56px, 8vw, 100px), altura de línea 0,92, blanco:
```
Level Up Your
Performance.
```
"Rendimiento". en verde. Sub Sora 300 15px silenciado, ancho máximo 420px: "Programas de entrenamiento estructurados para ciclistas, corredores y atletas de resistencia. Basados ​​en datos. Resultados probados". Dos CTA: "Comenzar a entrenar →" (relleno de verde) + "Ver resultados" (fantasma blanco). Debajo de las CTA:fila de prueba del cliente: 5 marcadores de posición de imagen de avatar + "Unido por más de 350 atletas" JetBrains Mono 11px silenciado.

**3. Tira de estadísticas**: superficie de ancho completo, borde superior + inferior, relleno 24 px 64 px. 4 estadísticas con recuento: más de 350 atletas entrenados · 12 años entrenando · Calificación promedio de 4.9★ · 87% alcanzó PB en 12 semanas. Cada uno: JetBrains Mono número brillo verde + etiqueta Sora 12px silenciada. Divisores entre artículos.

**4. Programas de formación**: relleno 96px 64px. H2 "Elige tu programa". Cuadrícula de tarjetas de 3 columnas. La superficie de cada tarjeta es bg, borde, radio de borde de 10 px, relleno de 32 px. Etiqueta verde JetBrains Mono 10px + nombre de Sora 700 20px + descripción 2 líneas silenciadas + lista de funciones incluidas (3 elementos, íconos verdes Lucide `Check`) + precio JetBrains Mono 14px verde + enlace verde "Consultar →". Tarjeta del medio: destacada, borde verde, insignia "Más popular". Programas: Fundamentos 8 semanas · Performance 16 semanas · Elite 6 meses.

**5. Resultados**: fondo de superficie, relleno 96 px 64 px. H2 "Resultados reales". Cuadrícula de 3 columnas. Cada tarjeta: foto del atleta (cuadrada, redondeada-lg) + nombre Sora 700 + deporte JetBrains Mono 10px silenciado + resultado clave en verde + cita corta en cursiva Sora 300 14px. Ejemplos de resultados: “Terminado primer Ironman” · “-8 min maratón PB” · “Clasificado para nacionales”.
```
{/* Athlete photo: athlete portrait outdoors, post-race or training environment, determined expression, sports kit */}
```

**6. Acerca de**: dos columnas, relleno 96 px 64 px. Izquierda: H2 "El entrenador detrás del plan". Sora 800. 3 párrafos: antecedentes, filosofía del coaching, certificaciones. Chips de credenciales JetBrains Mono 10px: UCI Nivel 3 · Ciclismo británico · 12 años de experiencia · Enfoque basado en datos. Derecha: foto del retrato del entrenador:
```
{/* Image: athletic male sports coach outdoors, professional confident pose, cycling or running context, natural light, high contrast */}
```

**7. Cómo funciona**: centrado, relleno 96 px 64 px. H2 "Del día uno al nuevo PB". 4 pasos horizontales: 01 Llamada estratégica gratuita → 02 Plan de entrenamiento personalizado → 03 Controles de entrenamiento semanales → 04 Alcanza tu objetivo. Cada uno: JetBrains Mono número grande descolorido (opacidad 0,1 verde) + nombre del paso Sora 700 + descripción de 1 línea.

**8. Banner de CTA**: fondo verde `hsl(var(--primary))`, relleno 72 px 64 px, centrado. Superposición de textura diagonal oscura (5% de opacidad en negro). H2 Sora 800 dark: "¿Listo para entrenar de forma más inteligente?" Suboscuro 70%. CTA: "Reservar una llamada gratuita" (fondo negro, texto blanco) + "Ver todos los programas" (borde oscuro fantasma). JetBrains Mono 11px oscuro50%: "Llamada estratégica gratuita de 30 minutos · Sin compromiso".

**9. Pie de página**: `hsl(220 18% 5%)`, relleno 48px 64px 28px. 3 columnas: Marca (logotipo + eslogan + redes sociales) / Enlaces de programas / Enlaces de empresa. Abajo: copyright + "Entrenador deportivo certificado · Regulado por British Cycling" JetBrains Mono 10px muted.

## Responsive
Mobile: nav hamburger · hero H1 clamp(44px, 12vw, 72px) · tira de estadísticas 2×2 · pila de programas en una sola columna · resultados de 2 columnas · acerca de una sola columna · pasos 2×2.

## Resumen de animaciones
| Elemento | Animación | Gatillo |
|---|---|---|
| Contenido de héroe | Desvanecimiento escalonado | En el soporte |
| Estadísticas | Uso de conteo Primavera | Desplazamiento |
| Tarjetas de programa | Desvanecimiento escalonado | Desplazamiento |
| Tarjetas de resultados | Desvanecimiento escalonado | Desplazamiento |
| Pasos | Desvanecimiento escalonado | Desplazamiento |
| Llamada a la acción | Desvanecimiento | Desplazarse |

## Dependencias clave
```json
{ "motion": "^12.x", "lucide-react": "^0.400.x" }
```

> **Notas rápidas:** El nombre de la marca "Jake Perform" es un marcador de posición; intercámbielo. La foto del héroe debe ser una fotografía de acción de alta calidad para lograr un efecto completo. Las menciones de certificación deben reflejar credenciales reales. El precio es sólo indicativo.