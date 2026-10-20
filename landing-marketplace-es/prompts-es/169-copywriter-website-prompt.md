# Copywriter Website Prompt
# websiteprompts.ai

Cree un sitio web de cartera de redactores publicitarios personales para **Mara Cole**, una redactora publicitaria independiente que se especializa en voz de marca, páginas de destino y secuencias de correo electrónico. Cálido, editorial, confiado. Tono: "palabras que venden, no gritan". Base blanquecina cálida, acento naranja quemado, tipografía de tinta oscura.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

## Diseño Sistema
```css
:root {
  --background: 36 20% 97%;        /* #faf8f5 warm off-white */
  --surface: 36 16% 93%;           /* #f0ece4 warm grey */
  --border: 36 12% 84%;            /* #ddd7ca border */
  --ink: 30 20% 10%;               /* #1c1610 near-black */
  --muted: 30 10% 50%;             /* #8c7f70 warm grey */
  --primary: 26 88% 48%;           /* #e8700a burnt orange */
  --primary-dark: 26 90% 38%;      /* #b85508 hover */
  --primary-light: 26 60% 94%;     /* #fdf0e6 orange tint */
  --foreground: 30 20% 10%;
}
```

## Tipografía
Importación: `https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400&display=swap`
- Pantalla / H1–H2: Libre Baskerville 700, acentos en cursiva en naranja
- Cuerpo/UI: Plus Jakarta Sans 300–600
- Etiquetas/etiquetas: JetBrains Mono 400

## Efectos visuales

**Animación de dibujo subrayado**: subrayado naranja debajo de las palabras clave del título:
```css
.underline-draw { position: relative; }
.underline-draw::after {
  content: ''; position: absolute; bottom: -4px; left: 0;
  width: 100%; height: 3px; background: hsl(var(--primary));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}
.underline-draw.in-view::after { transform: scaleX(1); }
```

**Desvanecimiento escalonado** — todas las secciones: `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}`, `duración: 0.5, facilidad: 'easeOut'`, activado por `useInView`.

**Ticker de marquesina** — franja de servicios de desplazamiento entre héroe y trabajo:
```css
.marquee { display: flex; gap: 48px; animation: scroll 18s linear infinite; }
@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
```

## Secciones

**1. Barra de navegación**: fija, `background: hsl(var(--background)/0.97)`, desenfoque de 12 píxeles. Izquierda: marca denominativa "Mara Cole" en cursiva Libre Baskerville. Centro de navegación: Trabajo · Servicios · Acerca de · Proceso. Derecha: "Hablemos": botón relleno de color naranja, radio de borde de 4 píxeles, entre 13 píxeles.

**2. Hero**: centrado, relleno 140 px 64 px 100 px. Píldora de insignia: tinte naranja bg, "Disponible para proyectos · 2026" en JetBrains Mono 10px. H1 en Libre Baskerville 700, clamp(56px, 7vw, 96px), altura de línea 0,95, ancho máximo 900 px: 
```
Transforming ideas into
compelling copy.
```
 "copia". en Libre Baskerville en cursiva, color primario, con animación subrayada y dibujada.
Sub: Plus Jakarta Sans 16px silenciado, ancho máximo 480px, centrado: "Voz de marca, páginas de destino, secuencias de correo electrónico, escritas para convertir sin parecer un argumento de venta".
Dos CTA: "Ver mi trabajo" (relleno de naranja) + "Descargar hoja de tarifas" (borde fantasma). Abajo: fila de 5 marcadores de posición del logotipo del cliente en gris apagado.

**3. Ticker de servicios**: franja de superficie cálida de ancho completo, 48 píxeles de alto, desbordamiento oculto. Marquesina repetida: "Voz de marca · Páginas de destino · Secuencias de correo electrónico· Estudios de casos · Texto de sitio web · Texto de anuncio · Voz de marca · Páginas de destino ···" — JetBrains Mono 11px, separados por puntos naranjas.

**4. Trabajo seleccionado** — relleno 96px 64px. Encabezado: H2 "Trabajo que habla." (cursiva "habla". en naranja). Diseño de lista vertical de 3 tarjetas (no cuadrícula): cada tarjeta en ancho completo, `border-top: 1px solid hsl(var(--border))`, relleno 32px 0, fila flexible: izquierda (número de proyecto + cliente + etiquetas) + centro (nombre del proyecto + descripción de 1 línea) + derecha (leer estudio de caso → enlace en naranja). startup.

**5. Acerca de**: dos columnas, 1fr 1fr, relleno 96px 64px, superficie de fondo Izquierda: foto de retrato:
```
{/* Image: confident young woman freelancer at a tidy desk with warm natural light, laptop open, plants and books in background, candid professional portrait, warm tones */}
```
Derecha: H2 "Las palabras son mi herramienta de diseño". JetBrains Mono: 5 años independiente · Más de 80 clientes · Reino Unido y remoto · Destacado en Copyhackers.

**6. Proceso**: centrado, relleno 96 px 64 px. H2 "Cómo trabajaremos juntos". Fila horizontal de 4 pasos en el escritorio, apilada en el móvil: número grande en Libre Baskerville 700 80 px naranja descolorido (opacidad 0,15) detrás del paso. nombre Pasos: 01 Llamada de descubrimiento → 02 Resumen y propuesta → 03 Primer borrador → 04 Revisiones y entrega.

**7. Testimonios** — superficie de fondo, relleno 96px H2 "De clientes cuadrícula de 3 columnas cada una: fila de estrellas (★★★★★ naranja) + cita en Libre Baskerville cursiva 15px. + nombre del cliente + empresa. Entrada escalonada. 

**8. CTA Banner**: fondo naranja de ancho completo `hsl(var(--primary))`, relleno 80 px 64 px, centrado en Libre Baskerville 900 cursiva blanca: "Escribamos algo genial". Sub en blanco, 70 % de opacidad. "Envíeme un correo electrónico directamente" (borde blanco fantasma). Abajo: "Generalmente responde dentro de las 24 horas": JetBrains Mono 11px blanco 50%.

**9. Pie de página**: fondo de tinta oscura `hsl(var(--ink))`, relleno 48px 64px 28px Izquierda: marca denominativa "Mara Cole" blanca + "Redactor publicitario independiente · Londres y Centro remoto: enlaces de navegación en silencio". blanco Derecha: enlaces sociales (LinkedIn, Twitter/X, Substack).copyright + "Built with Framer" en JetBrains Mono 10px silenciado.

## Responsive
Mobile: navegación → superposición de hamburguesa · héroe H1 clamp(42px, 11vw, 64px) · tarjetas de trabajo apiladas verticalmente · sobre una sola columna · proceso cuadrícula 2×2 · testimonios complemento de desplazamiento horizontal.

## Animaciones Resumen
| Elemento | Animación | Gatillo |
|---|---|---|
| Héroe H1 | Desvanecimiento + dibujo subrayado | En el soporte |
| Ticker de marquesina | Desplazamiento continuo | Siempre |
| Tarjetas de trabajo | Desvanecimiento escalonado | Desplazamiento |
| Números de paso | Conteo desvanecimiento | Desplazamiento |
| Testimonios | Desvanecimiento escalonado | Desplazamiento |
| Banner de llamada a la acción | Desvanecimiento | Desplazamiento |

## Dependencias clave
```json
{ "motion": "^12.x", "lucide-react": "^0.400.x" }
```

> **Notas rápidas:** "Mara Cole" y todas las copias son marcadores de posición: intercambie nombre, ubicación y ejemplos de proyectos. El enlace de descarga de la hoja de tarifas necesita un PDF real. La tira de logotipo en Hero debe usar logotipos de clientes reales o eliminarse si no hay ninguno disponible.