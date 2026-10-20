# Sitio web de abogados Prompt
# websiteprompts.ai

Cree un sitio web profesional de abogados/bufetes de abogados para **Olivia Clark**, una abogada especializada en derecho de familia, planificación patrimonial y formación de empresas. Limpio, confiable, premium. Base blanca con detalles en azul marino y dorado cálido. Serif editorial se combina con un diseño limpio y moderno.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

## Diseño Sistema
```css
:root {
  --background: 0 0% 100%;          /* #ffffff white */
  --surface: 220 20% 97%;           /* #f5f7fa light grey */
  --border: 220 16% 88%;            /* #d8dde8 border */
  --ink: 222 40% 12%;               /* #111e38 deep navy ink */
  --muted: 222 14% 52%;             /* #6d7fa3 muted navy */
  --primary: 222 62% 22%;           /* #0e1f40 deep navy */
  --primary-foreground: 0 0% 100%;
  --gold: 42 72% 48%;               /* #c49a18 warm gold */
  --gold-light: 42 60% 94%;         /* #fdf8e8 gold tint */
  --foreground: 222 40% 12%;
}
```

## Tipografía
Importación: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap`
- Pantalla / H1–H2: Cormorant Garamond 600–700, acentos en cursiva en dorado
- Cuerpo/UI / Nav: Inter 300–600
- Etiquetas / Etiquetas / Precios: JetBrains Mono 400

## Efectos visuales

**Regla de oro**: la línea dorada horizontal animada de 1 px se escala desde la izquierda antes de cada una H2:
```
initial={{ scaleX: 0, transformOrigin: 'left center' }}
animate={{ scaleX: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}
```
Ancho: 40 px, alto: 1,5 px, `background: hsl(var(--gold))`, bloque de visualización, margen inferior 16 px.

**Desvanecimiento escalonado** — `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`, 0,5 s, IntersectionObserver.

**Desplazamiento de tarjeta** — tarjetas de área de práctica y servicio: `transición: color de borde 0,15 s, sombra de cuadro 0,15 s`. Colocar el cursor sobre: ​​`border-color: hsl(var(--gold))`, `box-shadow: 0 8px 32px rgba(196,154,24,0.10)`.

## Secciones

**1. Barra de navegación**: adhesivo, fondo blanco, `border-bottom: 1px solid hsl(var(--border))`, relleno 18px 64px. Izquierda: "Olivia Clark" en Cormorant Garamond cursiva 600 20px, color `hsl(var(--primary))`. Centro: Especializaciones · Acerca de · Blog · Contacto. Derecha: "Obtener la plantilla": botón con relleno azul marino, entre 13 píxeles, radio de borde de 4 píxeles. Debajo de la marca: "+44 123 456 7890 · hello@oliviaclark.co.uk" en JetBrains Mono 9px silenciado, separado por punto.

**2. Hero**: división en dos columnas, altura mínima 100 vh, relleno superior 80 px. Izquierda (relleno 80px 64px): eslogan "ABOGADO PROFESIONAL" JetBrains Mono 9px mayúsculas doradas + regla dorada. H1 en Cormorant Garamond 700, clamp(52px, 5.5vw, 80px), altura de línea 0,95: 
```
Expert Legal Services
Tailored for You.
```
 "A medida para usted". en cursiva dorada. Sub: "Especializada en derecho de familia, planificación patrimonial y formación de empresas, guiada por la claridad, la compasión y décadas de experiencia". Inter 15px silenciado, ancho máximo 400px. CTA: "Contáctame hoy": relleno azul marino, radio de borde 4 px.
Derecho: profesionalfoto de retrato + tarjeta de disponibilidad flotante (abajo a la izquierda, fondo blanco, sombra, "Aceptar nuevos clientes · Primavera de 2026" con pulso de punto verde):
```
{/* Image: professional female lawyer in dark blazer, confident composed expression, neutral studio background, editorial headshot, warm neutral light */}
```

**3. Especializaciones**: superficie de ancho completo bg, relleno 96 px 64 px. Regla de oro + etiqueta "Me especializo en". Cuadrícula de 6 tarjetas (3×2), cada una `border-top: 2px solid hsl(var(--border))`, relleno 24px 0, borde dorado flotante. Cada tarjeta: nombre del área en Cormorant Garamond 700 20px + descripción de 2 líneas en Inter 13px silenciada + enlace dorado "Leer más →". Áreas: Ley de Mediación · Ley de Planificación Patrimonial · Ley de Constitución de Empresas · Ley de Contratos · Ley de Custodia de los Hijos · Ley de Divorcio.

**4. Acerca de**: dos columnas, relleno 96 px 64 px. Izquierda: H2 "Una guía confiable en tiempos complejos". + 3 párrafos (antecedentes, enfoque, valores). Regla de oro antes del segundo semestre. Enlace "Más información →". Derecha: panel de credenciales: 4 fichas en superficie azul marino (Admitido en el Colegio de Abogados · 15 años de experiencia · Más de 500 casos resueltos · Miembro de la Sociedad de Abogados) + 1 tarjeta de cotización testimonial en tono dorado bg.

**5. Proceso**: centrado, superficie bg, relleno 96px 64px. H2 "Cómo trabajamos juntos". 4 pasos horizontales: 01 Consulta gratuita → 02 Valoración del caso → 03 Estrategia jurídica → 04 Resolución. Cada paso: número Cormorant Garamond 700 en azul marino descolorido (opacidad 0,12) + nombre del paso + descripción de 1 línea.

**6. Testimonios**: fondo blanco, relleno 96 px 64 px. H2 "Experiencias del cliente". Cuadrícula de 3 columnas. Cada tarjeta: regla dorada + cita en Cormorant cursiva 15px + nombre del cliente en Inter 600 + tipo de caja en JetBrains Mono 9px dorado. Entrada escalonada.

**7. Blog/Insights**: fondo de superficie, relleno 96 px 64 px. H2 "Conocimientos legales". 3 tarjetas de artículo, cada una: etiqueta de categoría JetBrains Mono 9px gold + título del artículo Cormorant 700 20px + extracto de 1 línea + enlace "Leer artículo →". Tarjetas con borde y borde dorado flotante.

**8. CTA de contacto**: fondo azul marino `hsl(var(--primary))`, relleno 80 px 64 px centrado. H2 en Cormorant cursiva 700 blanco: "Programe su consulta gratuita". Subblanco 65%. Dos CTA: "Reservar una llamada" (bg dorado, texto azul marino) + "Enviar un mensaje" (borde blanco fantasma). Abajo: fila de detalles de contacto en JetBrains Mono 11px blanco 50%: teléfono · correo electrónico · dirección.

**9. Pie de página**: `hsl(222 40% 8%)` casi negro, relleno 48 px 64 px 28 px. Izquierda: "Olivia Clark" +"Abogado · Londres" + texto de descargo de responsabilidad en 11px silenciado. Derecha: columnas de navegación (Especializaciones / Empresa). Abajo: copyright + "Regulado por la Autoridad Reguladora de Abogados" en JetBrains Mono 10px silenciado.

## Responsive
Móvil: navegación → superposición de hamburguesa · héroe de una sola columna, foto a continuación · especializaciones 1 columna · proceso cuadrícula 2×2 · complemento de desplazamiento de testimonios.

## Animaciones Resumen
| Elemento | Animación | Gatillo |
|---|---|---|
| Contenido de héroe | Tambaleo desvanecimiento | En el soporte |
| Reglas de oro | escalaX 0→1 | Desplazamiento |
| Tarjetas de especialización | Desvanecimiento escalonado | Desplazamiento |
| Tarjetas de testimonios | Desvanecimiento escalonado | Desplazamiento |
| Tarjeta de disponibilidad flotante | Retraso de desvanecimiento 0,6 s | En el montaje |

## Dependencias clave
```json
{ "motion": "^12.x", "lucide-react": "^0.400.x" }
```

> **Notas rápidas:** "Olivia Clark" y todas las copias son marcadores de posición: intercambien nombres, especializaciones, detalles de admisión al colegio de abogados e información de contacto. Los artículos de blog necesitan contenido real o conexión CMS. La exención de responsabilidad de la SRA en el pie de página debe reflejar el organismo regulador real.