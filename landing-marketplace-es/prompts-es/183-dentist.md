Cree un sitio web completo de una sola página para una clínica dental para **DENTORA**: moderno, confiable y centrado en la conversión. Héroe fotográfico oscuro con acento verde azulado, además de Jakarta Sans en todas partes, botones en forma de píldora, una barra de progreso de 4 pasos, contadores de estadísticas animados y una cuadrícula de tarjetas de servicio. Se siente premium y tranquila: una clínica que hace que los pacientes se sientan cómodos incluso antes de cruzar la puerta.

---

## Regla de diseño global: centrado

El contenido de cada sección debe estar centrado contenedor:
```jsx



  {/* section content */}



```
Nunca permita que el contenido se extienda en todo su ancho ni quede al ras hacia la izquierda. `max-w-[1200px]` y `mx-auto` deben estar en el contenedor interno de cada sección. Los bloques de texto estrechos (preguntas frecuentes, copia centrada) utilizan `max-w-3xl mx-auto`. En dispositivos móviles, reduzca a `px-6`.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## Sistema de diseño: Colores

```css
:root {
  --background: 210 42% 5%;          /* deep dark navy #060C14 */
  --foreground: 0 0% 98%;            /* white */
  --surface-dark: 210 38% 8%;        /* slightly lighter dark #0A1520 */
  --surface-light: 213 25% 96%;      /* cool off-white #EEF2F7 */
  --primary: 180 91% 39%;            /* teal #0BB8B8 */
  --primary-light: 180 70% 95%;      /* pale teal tint #EBF9F9 */
  --primary-foreground: 0 0% 100%;
  --muted-foreground: 213 15% 55%;   /* cool grey #7A8BA0 */
  --border: 213 20% 90%;             /* light border #DDE4EE */
  --success: 142 71% 38%;            /* green checkmarks */
  --warning: 38 92% 50%;             /* star rating gold */
}
```

**Ritmo de sección:**
- Hero → oscuro (`--background`)
- Barra de progreso → blanco con borde
- Acerca de/Estadísticas → blanco
- Servicios → `--surface-light`
- Por qué elegirnos → blanco
- Equipo → `--surface-light`
- Proceso → `--surface-dark`
- Testimonios → blanco
- Foto CTA → sangrado completo photo
- Preguntas frecuentes → `--surface-light`
- CTA final → `--primary` (verde azulado)
- Pie de página → `--surface-dark`

---

## Tipografía

**Importar:**
```html
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap
```

| Rol | Fuente | Estilo |
|------|------|-------|
| H1 / héroe | Plus Yakarta Sans | 800, espacio entre letras -0,03em |
| H2 | Plus Yakarta Sans | 700–800, espacio entre letras -0,02 em |
| H3 / títulos de tarjetas | Plus Yakarta Sans | 700 |
| Subetiquetas/sobrelíneas | Plus Yakarta Sans | 600, 0,62 rem, seguimiento-[0,2 em] mayúsculas |
| Cuerpo | Plus Yakarta Sans | 300–400, líder relajado |
| Botones | Plus Yakarta Sans | 600–700, 0,82rem |
| Estadísticas | Plus Yakarta Sans | 800, espacio entre letras -0,035em |
| Navegación | Plus Yakarta Sans | 400–600, 0,72rem |

---

## Sistema de botones

Todos los botones:`inline-flex items-center justificar-center gap-2 encoger-0 espacios en blanco-nowrap` con `border-radius: 100px`:

```jsx
// Primary — teal pill

  Book Appointment 

// Secondary — dark pill (on light sections)

  About Us


// Ghost — on dark/photo backgrounds

  Learn More


// Tag pill — service label (non-interactive)

  Dental Checkup

```

---

## Efectos visuales

### 1. Degradado de foto de héroe overlay
```css
/* Directional fade — text always legible from left */
background: linear-gradient(
  to right,
  rgba(6,12,20,0.95) 0%,
  rgba(6,12,20,0.80) 38%,
  rgba(6,12,20,0.45) 65%,
  rgba(6,12,20,0.15) 100%
);
/* Bottom fade into next section */
+ linear-gradient(to top, hsl(var(--background)) 0%, transparent 20%)
```

### 2. Animaciones de entrada escalonadas (Framer Motion)
```jsx
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.1 }
  })
}
// Usage: custom={index} variants={fadeUp} initial="hidden" animate/whileInView="visible" viewport={{ once: true }}
```

### 3. Estadísticas animadas contadores
```
requestAnimationFrame — count 0 → target over 1,400ms
easing: cubic-bezier(0.25, 0.1, 0.25, 1)
IntersectionObserver: fires once when stats row enters viewport (threshold: 0.3)
```

### 4. Tarjeta de servicio flotante
```
translateY(-5px) + box-shadow: 0 20px 56px rgba(0,0,0,0.09)
transition: all 220ms ease-out
Inner photo: scale(1.05) on hover, overflow:hidden
```

### 5. Elevación sutil de la tarjeta de médico
```
hover: translateY(-3px) + shadow-md
transition: 200ms ease-out
```

### 6. Indicador de paso de progreso
```
Active step: border-bottom: 2px solid hsl(var(--primary)) + text-[hsl(var(--foreground))]
Inactive: text-[hsl(var(--muted-foreground))]
Smooth left-to-right slide transition on step change: translate-x animation
```

---

## Desglose de componentes

### 01 — Navbar

**Diseño:** `position: absolute; top: 0; left: 0; right: 0; z-index: 30;` — transparente sobre héroe. `padding: 22px 60px; display: flex; justify-content: space-between; align-items: center;`

**Izquierda — Logotipo:**
- Icono de diente pequeño en cuadro redondeado: `w-7 h-7 bg-white/15 border border-white/25 rounded-[7px]` + icono de diente SVG blanco
- Marca: `DENTORA` — Plus Jakarta Sans 700, `text-[0.95rem] seguimiento-[-0.01em]` white

**Centro (escritorio):** `Servicios · Acerca de nosotros · Testimonios · Contacto`
- Plus Jakarta Sans 400, `text-[0.72rem]` white/70, `hover:text-white`, `gap-8`

**Derecha:**
- Teléfono: `(800) 559-2648` — Plus Jakarta Sans 500, `text-[0.72rem]` white/60
- `Book a Call` — botón principal de pastilla verde azulado, `h-9 px-5 text-[0.72rem]`

**Móvil:** Hamburguesa → menú superpuesto oscuro en pantalla completa

---

### 02 — Hero

**Layout:** `min-height: 90vh; position: relative; overflow: hidden; display: flex; align-items: flex-end;` — sin ancho máximo, completo sangrado

**Foto de fondo:** `recuadro absoluto-0 w-completo h-objeto completo-cubrimiento-centro de objeto z-0`
```jsx
{/* Image: dental patient close-up — woman smiling in dental chair, dentist's gloved hands with dental tools, bright clinic light, teal-tinted professional setting, high contrast, photorealistic */}

```

**Superposición de degradado (2 capas):**
```jsx
{/* Left-to-right fade for text legibility */}



{/* Bottom fade into section below */}



```

**Contenido:** `relative z-10 max-w-[1200px] mx-auto px-[60px] w-full pb-14 pt-28`

- Pastilla de insignia: `inline-flex items-center gap-2 bg-[hsl(var(--primary))]/15 border border-[hsl(var(--primary))]/30 rounded-full px-4 py-1.5 mb-7`
 - Punto: `w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]`
 - Texto: Plus Jakarta Sans 600, `text-[0.62rem] tracking-[0.12em] text-[hsl(var(--primary))]`
 - Copia: `BEST DENTAL CARE · PORTLAND, OR`

- H1: Plus Jakarta Sans 800, `text-[clamp(3rem,5.5vw,5.5rem)] leading-[1.0] letter-spacing-[-0.03em] text-white max-w-[580px] mb-6`
 ```
  Experience
  Comfortable
  Dental Care.   ← last word or line in text-[hsl(var(--primary))]
  ```
 Animación escalonada palabra por palabra (personalizado={index} en cada intervalo de palabras)

- Sublínea: Plus Jakarta Sans 300, `text-[0.92rem] text-white/55 interlineal-[1.75]max-w-[380px] mb-10`
 "La salud dental de su familia, tratada con cuidado. Tecnología moderna, manos suaves y precios transparentes, siempre". 

- CTA fila: `flex gap-4 items-center mb-12`
 - `Reservar cita →` pastilla verde azulado primaria `h-12 px-8`
 - `O llame al: (800) 559-2648` — Además de Jakarta Sans 400 `text-[0.82rem] text-white/50`

- Fila de píldoras de etiquetas de servicio: `flex flex-wrap gap-2.5`
 ```
  Dental Checkup · Teeth Cleaning · Tooth Whitening · Gum Treatment · Implants · Root Canal
  ```
 Cada uno: `bg-white/8 border border-white/15 rounded-full px-4 py-2 text-[0.72rem] font-[500] text-white/65`

**Mobile:** H1 `text-[2.8rem]`, sublínea `max-w-full`, ajuste de etiquetas de servicio, CTA se acumula verticalmente.

---

### 03 - Barra de pasos de progreso

**Diseño:** `bg-white border-b border-[hsl(var(--border))] px-[60px]`

**Interior:** `max-w-[1200px] mx-auto grid grid-cols-4`

Ecada paso: `py-5 px-6 border-r border-[hsl(var(--border))] last:border-r-0 cursor-pointer transition-colors`

- **Paso activo** (primero por defecto): `border-b-2 border-[hsl(var(--primary))]`
 - Texto: Plus Jakarta Sans 600, `text-[0.7rem] text-[hsl(var(--foreground))] tracking-[0.06em]`
- **Pasos inactivos:** Plus Jakarta Sans 400, `text-[0.7rem] text-[hsl(var(--muted-foreground))]`

**Copia de pasos:**
1. `Evaluación de la Sonrisa`
2. `Planificación de la atención`
3. `Proceso de tratamiento`
4. `Mantenimiento dental`

**Comportamiento de clic:** al hacer clic en un paso se activa (cambio de estado). Animar `border-b` deslizándose. No se necesita cambio de contenido real: elemento interactivo decorativo.

---

### 04 — Acerca de / Estadísticas

**Fondo:** blanco

**Relleno:** `py-20 px-[60px]`

**Etiqueta de sección:** `ACERCA DE NOSOTROS` — Plus Jakarta Sans 600, `text-[0.62rem] tracking-[0.2em] text-[hsl(var(--primary))] uppercase mb-12`

**Declaración editorial grande:** `max-w-[760px] mb-14`
- Plus Jakarta Sans 700, `text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.3] letter-spacing-[-0.02em] text-[hsl(var(--surface-dark))]`
- Frase clave en verde azulado: envuelva `tratamientos dentales personalizados` en `text-[hsl(var(--primary))]`
- Copia: `"Ofrecemos tratamientos dentales personalizados con tecnología moderna y un cuidado amable que garantiza sonrisas saludables y seguras para cada paciente".`

**Fila de estadísticas:** `flex items-center gap-10 py-8 border-t border-b border-[hsl(var(--border))] mb-10`

- Etiqueta izquierda: Plus Jakarta Sans 300, `text-[0.68rem] text-[hsl(var(--muted-foreground))] max-w-[130px] leading-[1.6]` — "Miles de personas confían en nosotros sonrisas!"
- Estadísticas (flex gap-12):
 ```
  98%   — Satisfaction Rate
  2k+   — Smiles Transformed
  4.9★  — Customer Rating  (★ in teal)
  ```
 Número: Plus Jakarta Sans 800, `text-[2.8rem]espaciado entre letras-[-0.03em] líder-[1]`
 Etiqueta: Plus Jakarta Sans 400, `text-[0.7rem] text-[hsl(var(--muted-foreground))] mt-1`
 Animado con contador de estadísticas en desplazamiento

- Derecha (margen izquierdo: automático): foto de clínica pequeña `w-[210px] h-[160px] redondeado-2xl desbordamiento-cubierta-objeto oculto`
```jsx
{/* Image: modern dental clinic interior — clean white exam room, dental chair, professional equipment, bright and welcoming */}

```

**Tarjeta de perfil médico:** `flex items-center gap-4 mt-2`
```jsx
{/* Image: professional dentist portrait — male doctor in white coat, friendly smile, stethoscope, clinic background */}

```
- Nombre: Plus Jakarta Sans 700, `text-[0.9rem] text-[hsl(var(--surface-dark))]` — `Dra. Daniel Carter`
- Función: Plus Jakarta Sans 400, `text-[0.72rem] text-[hsl(var(--muted-foreground))] mt-1` — `Especialista dental principal · ★ 4.9 (más de 40 reseñas)`

---

### 05 — Services Grid

**Antecedentes:** `bg-[hsl(var(--surface-light))]`

**Relleno:** `py-24 px-[60px]`

**Fila de encabezado:** `flex justify-between items-end mb-14`
- Izquierda:
 - Etiqueta: `TRATAMIENTO DE FUNCIONES` — Plus Jakarta Sans 600, `text-[0.62rem] tracking-[0.2em] text-[hsl(var(--primary))] uppercase mb-3`
 - H2: Plus Jakarta Sans 800, `text-[clamp(1.8rem,3vw,2.8rem)] letter-spacing-[-0.025em] leading-[1.2]`
 - `"Cuidado dental avanzado\npara una sonrisa más saludable"`
- Derecha: `Ver todos los servicios →` botón de píldora secundaria `h-10`

**Grid:** `grid grid-cols-3 gap-5`

6 tarjetas de servicio — `bg-white rounded-2xl overflow-hidden border border-[hsl(var(--border))] cursor-pointer`
- Colocar el cursor sobre: `translateY(-5px) shadow-[0_20px_56px_rgba(0,0,0,0.09)]` + escala de fotografía interna (1.05)
- Foto: `h-[148px] overflow-hidden`
- Contenido: `p-5`
 - Chip de precio: `inline-flex bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-[0.65rem] font-semibold tracking-[0.08em] px-3 py-1 rounded-full mb-3`
 - Título: Plus Jakarta Sans 700, `text-[0.95rem] text-[hsl(var(--surface-dark))] mb-2`
 - Carrocería: Plus Jakarta Sans 300, `text-[0.78rem] text-[hsl(var(--muted-foreground))] leading-[1.65]`
 - Enlace: `Más información →` — Plus Jakarta Sans 600, `text-[0.78rem] text-[hsl(var(--primary))] mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all`

**Tarjetas:**

Card 1 — foto azul claro bg:
```jsx
{/* Image: dental checkup — dentist examining patient's teeth with mirror and explorer tool, professional lighting, clean clinic */}
```
`"DESDE $80"` / `"Revisión dental"` / `"Examen completo de sus dientes, encías y mandíbula. Incluye radiografías digitales y un plan de tratamiento completo."`

 Tarjeta 2 — foto verde azulado suave bg:
```jsx
{/* Image: teeth cleaning procedure — ultrasonic scaler, close-up of clean teeth, professional hygiene appointment */}
```
`"DESDE $120"` / `"Limpieza de dientes"` / `"Raspado y pulido profesional para eliminar placa, sarro y manchas superficiales para una sonrisa más saludable."`

Card 3 — foto cálida bg:
```jsx
{/* Image: tooth whitening treatment — custom trays on teeth, before/after visible, bright clean result */}
```
`"DESDE $299"` / `"Blanqueamiento dental"` / `"Blanqueamiento profesional en el consultorio o en casa para iluminar su sonrisa hasta en 8 tonos."`

 Tarjeta 4 — foto coral/rosa bg:
```jsx
{/* Image: dental implant model — titanium implant with crown, illustrated cross-section or dental table close-up */}
```
`"DESDE$1,800"` / `"Implantes dentales"` / `"Reemplazos permanentes y de apariencia natural para dientes perdidos, colocados quirúrgicamente y construidos para durar toda la vida."`

Tarjeta 5 — foto gris claro bg:
```jsx
{/* Image: dental veneer application — ceramic veneer being placed on front tooth, close-up, transformation visible */}
```
`"DESDE $650"` / `"Carillas y Coronas"` / `"Coronas y coronas de porcelana hechas a medida para restaurar la forma, el color y la fuerza de los dientes dañados."`

Card 6 — foto urgente oscura bg:
```jsx
{/* Image: emergency dental care — dentist treating patient urgently, focused close-up, caring and professional atmosphere */}
```
`"SAME DAY"` / `"Emergency Care"` / `"Citas de emergencia el mismo día para dolores de muelas, dientes rotos, empastes perdidos y dolor dental. Llame en cualquier momento."`

---

### 06 — Por qué elegirnos

**Fondo:** blanco

**Relleno:** `py-24 px-[60px]`

**Diseño:** `grid grid-cols-2 gap-20 items-center`

**Izquierda — texto:**
- Etiqueta: `POR QUÉ ELEGIRNOS` — seguimiento en mayúsculas verde azulado `mb-4`
- H2: Plus Jakarta Sans 800, `text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.2] letter-spacing-[-0.02em] mb-4`
 `"¿Estás buscando ¿Un dentista que le brinde esa sonrisa especial?"`
- Cuerpo: Plus Jakarta Sans 300, `text-[0.85rem] text-[hsl(var(--muted-foreground))] leading-[1.8] max-w-md mb-10`
 "Dentora Clinic brinda atención dental de la más alta calidad en Los Ángeles con un grupo de dentistas y especialistas experimentados."
- Lista de verificación: `grid grid-cols-2 gap-x-6 gap-y-3 mb-10`
 Cada uno: `flex items-center gap-2`
 - CheckCircle `w-4 h-4 text-[hsl(var(--primary))]` + Plus Jakarta Sans 400 `text-[0.82rem] text-[hsl(var(--surface-dark))]`
 ```
  ✓ Dental check-ups          ✓ Root canal treatment
  ✓ Hygiene treatments        ✓ Dental implant restoration
  ✓ Crowns, veneers & bridges ✓ Professional tooth whitening
  ```
- `Conozca a nuestro equipo →` botón de pastilla secundaria `h-11`

**Derecha — foto:**
```jsx
{/* Image: dental team — two or three dentists and assistants in matching scrubs, standing together, smiling confidently, modern clinic background */}

```

---

### 07 — Proceso (cómo funciona)

**Fondo:** `bg-[hsl(var(--surface-dark))]` — oscuro azul marino

**Relleno:** `py-24 px-[60px]`

**Encabezado:** centrado, `max-w-[560px] mx-auto text-center mb-16`
- Etiqueta: `CÓMO FUNCIONA` — seguimiento de mayúsculas verde azulado
- H2: Plus Jakarta Sans 800, `text-[clamp(1.8rem,3vw,2.8rem)] letter-spacing-[-0.025em] text-white mt-3`
 `"Tu viaje hacia una sonrisa más saludable."`

**4-step grid:** `grid grid-cols-4 gap-5`

Cada tarjeta de paso — `bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 relativo`
- Número de paso: Plus Jakarta Sans 800, `texto-[3rem] espacio entre letras-[-0.04em] texto-blanco/[0.07] interlineado-[1] mb-5`
- Foto del paso: `h-[130px]rounded-xl overflow-hidden mb-5`
- Insignia + fila de título: `flex items-center gap-2.5 mb-3`
 - Pastilla numérica: `w-7 h-7 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white text-[0.65rem] font-bold shrink-0`
 - Título: Plus Jakarta Sans 700, `text-[0.88rem] texto-blanco`
- Carrocería: Plus Jakarta Sans 300, `text-[0.78rem] texto-blanco/50 líder-relajado`

```jsx
{/* Step 1 image: person booking appointment on smartphone or laptop at home, casual and relaxed */}
{/* Step 2 image: dental hygienist welcoming patient at clinic reception, warm and professional */}
{/* Step 3 image: dentist showing X-ray or tablet results to patient, explaining clearly */}
{/* Step 4 image: happy patient leaving dental clinic, bright smile, thumbs up or waving goodbye */}
```

Pasos:
1. `"01"` · **Reserve en línea** · "Complete nuestro formulario rápido o llámenos; confirmaremos su cita dentro de una hora".
2. `"02"` · **Visita de bienvenida** · "Llegue a la hora programada, conozca a su dentista y repasaremos su historial dental."
3. `"03"` · **Evaluación de la sonrisa** · "Radiografías digitales, examen completo y un plan de atención transparente con precios antes de comenzar".
4. `"04"` · **Tratamiento y atención** · "Tratamiento completado, resultados revisados, cuidados posteriores explicados. Hacemos un seguimiento para asegurarnos de que esté satisfecho."

---

### 08 — Testimonios

**Fondo:** blanco

**Relleno:** `py-24 px-[60px]`

**Encabezado:** centrado `text-center mb-14`
- Etiqueta: `REVISIONES DE PACIENTES`
- H2: Plus Jakarta Sans 800, `text-[clamp(1.8rem,3vw,2.8rem)] letter-spacing-[-0.025em] mt-3`
 `"No confíe en nuestra palabra "`
- Sublínea: Plus Jakarta Sans 400, `text-[0.85rem] text-[hsl(var(--muted-foreground))] mt-2`
 `★★★★★ 4,9 promedio de más de 1200 reseñas verificadas`

**Grid:** `grid grid-cols-3 tarjetas gap-6`

3 — `bg-[hsl(var(--surface-light))] rounded-2xl p-7 border border-[hsl(var(--border))]`
- Estrellas: `★★★★★` — Plus Jakarta Sans, `text-[hsl(var(--warning))] text-sm tracking-[2px] mb-4`
- Cita: Plus Jakarta Sans 400, `text-[0.92rem] leading-[1.75] text-[hsl(var(--surface-dark))]`
- Atribución: `flex items-center gap-3 mt-6`
 - Foto de avatar `w-11 h-11 rounded-full object-cover`
 - Nombre: Plus Jakarta Sans 600, `text-[0.82rem]`
 - Fuente: Plus Jakarta Sans 300, `text-[0.68rem] text-[hsl(var(--muted-foreground))]` — `"Revisión verificada de Google"`

```jsx
{/* Images: 3 patient portrait photos — diverse, friendly, smiling, casual photos, natural light */}
```

**Reseñas:**
1. `"He estado yendo a Dentora durante dos años y no iré a ningún otro lugar. Me explicaron cada paso de mi tratamiento claramente y nunca me sentí presionada. La mejor experiencia dental que he tenido".` — Emily K. · Patient
2. `"Como alguien que solía temer al dentista, Dentora cambió completamente mi experiencia. Sin dolor, rápido y los resultados fueron increíbles. Mi sonrisa nunca había sidoSe veía mejor."` — Marcus T. · Paciente
3. `"Traje a toda mi familia aquí después de una recomendación. El equipo es paciente y amable con mis hijos, lo que lo significa todo. Somos pacientes de Dentora de por vida."` — Sarah L. · Patient

---

### 09 — Banner CTA con fotografía de ancho completo

**Diseño:** Sangrado completo, `relativa h-[300px] flexión oculta de desbordamiento centro de artículos`

**Foto de fondo:** `inserto absoluto-0 w-completo h-objeto completo-cubierta objeto-centro z-0`
```jsx
{/* Image: happy dental patient with bright smile in dental chair, giving thumbs up, warm professional lighting, real and candid atmosphere */}

```

**Superposición:** `absolute inset-0 bg-gradient-to-r from-[rgba(6,12,20,0.90)] via-[rgba(6,12,20,0.65)] to-[rgba(6,12,20,0.15)] z-[1]`

**Contenido:** `relativo z-10 max-w-[1200px] mx-auto px-[60px] w-full flex justify-between items-center flex-wrap gap-8`
- Izquierda:
 - H2: Plus Jakarta Sans 800, `text-[clamp(1.8rem,3.5vw,3rem)] letter-spacing-[-0.025em] text-white`
 `"Listo para tu mejor rendimiento smile?"`
 - Carrocería: Plus Jakarta Sans 300, `text-[0.88rem] text-white/60 mt-2`
 `"Citas disponibles para el mismo día. No hay listas de espera."`
- Derecha: `flex gap-3 flex-wrap`
 - `Reservar cita` píldora primaria verde azulado `h-12 px-9`
 - `(800) 559-2648` píldora fantasma `h-12 px-8` con teléfono icon

---

### 10 — Preguntas frecuentes

**Fondo:** `bg-[hsl(var(--surface-light))]`

**Relleno:** `py-24 px-[60px]`

**Contenido:** `max-w-3xl mx-auto`

**Encabezado:** centrado `text-center mb-12`
- Etiqueta: `FAQ`
- H2: Plus Jakarta Sans 800, `text-[clamp(1.8rem,3vw,2.8rem)] letter-spacing-[-0.025em] mt-3`
 `"Preguntas comunes, claras respuestas."`

**7 elementos de acordeón - Animación de altura de AnimatePresence:**
- `border-b border-[hsl(var(--border))] py-5`
- Fila de preguntas: `flexionar justificación-entre elementos-centro cursor-puntero espacio-4`
 - Pregunta: Además de Jakarta Sans 600, `text-[0.92rem] text-[hsl(var(--surface-dark))]`
 - ChevronDown: `w-5 h-5 text-[hsl(var(--primary))] transition-transform duration-200` — `rotate-180` cuando está abierto
- Respuesta: Plus Jakarta Sans 300, `text-[0.82rem] text-[hsl(var(--muted-foreground))] leading-relaxed mt-3 pb-2`

**Preguntas y respuestas:**

Q1: `"¿Aceptas? ¿Nuevos pacientes?"`
A1: `"Sí, siempre damos la bienvenida a nuevos pacientes y a sus familias. Puede reservar en línea, llamarnos o simplemente visitarnos durante el horario de apertura. A menudo hay citas disponibles para el mismo día."`

Q2: `"¿El tratamiento dental es doloroso?``
A2: `"Priorizamos su comodidad en cada paso. Todos los tratamientos se realizancon anestesia local para que no sienta dolor durante el procedimiento. También ofrecemos opciones de sedación para pacientes ansiosos."`

Q3: `"¿Con qué frecuencia debo acudir a un chequeo?"`
A3: `"Recomendamos un chequeo dental y una limpieza profesional cada 6 meses. Algunos pacientes pueden beneficiarse de visitas más frecuentes; su dentista le aconsejará según sus necesidades individuales."`

Q4: `"¿Ofrecen planes de pago?"`
A4: `"Sí. Ofrecemos planes de pago mensuales flexibles a través de nuestros socios financieros. Pregunte a nuestro equipo sobre las opciones de 0% de interés en tratamientos calificados de más de $300."`

Q5: `"¿Qué debo hacer en una emergencia dental?"`
A5: `"Llame a nuestra línea de emergencia de inmediato: (800) 559-2648. Ofrecemos espacios de emergencia el mismo día para dolores de muelas, dientes rotos, coronas perdidas y traumatismos dentales. No espere si tiene dolor."`

Q6: `"¿Los niños pueden ser pacientes en Dentora?``
A6: `"Absolutamente. Tratamos a pacientes de todas las edades, incluidos niños desde el primer diente en adelante. Nuestro equipo tiene experiencia en hacer que los pacientes jóvenes se sientan cómodos y seguros con respecto al cuidado dental."`

Q7: `"¿Cuánto duran los tratamientos?"`
A7: `"Depende del tratamiento. Un chequeo estándar dura entre 45 y 60 minutos. La limpieza es de 45 minutos. Los procedimientos más complejos, como implantes o coronas, implican múltiples visitas; su dentista le brindará un cronograma completo en su consulta." `py-20 px-[60px]`

**Contenido:** `max-w-2xl mx-auto text-center`
- H2: Plus Jakarta Sans 800, `text-[clamp(2rem,4vw,3.5rem)] letter-spacing-[-0.03em] text-white leading-tight`
 `"Tu sonrisa más saludable comienza hoy."`
- Cuerpo: Plus Jakarta Sans 300, `text-[0.92rem] text-white/70 mt-5 líder-relajado`
 `"Solicite una consulta gratuita en menos de 2 minutos. Citas disponibles el mismo día. Precios transparentes, sin sorpresas."`
- CTA fila: `flex gap-4 justify-center flex-wrap mt-10`
 - `Reserve una consulta gratuita` — `bg-white text-[hsl(var(--primary))] rounded-full h-12 px-10 font-semibold hover:bg-white/90 transition-colors`
 - `(800) 559-2648` — `border borde-blanco/35 texto-blanco fuente redondeada completa h-12 px-8-[400] hover:bg-white/10colores de transición` con ícono de teléfono
- Línea de confianza: `flex justify-center gap-8 flex-wrap mt-8`
 Plus Jakarta Sans 300 `text-[0.8rem] text-white/55`
 `" ✓ Sin lista de espera " · " ✓ Precios transparentes " · " ✓ Todas las edades bienvenido"`

---

### 12 — Pie de página

**Fondo:** `bg-[hsl(var(--surface-dark))]` — azul marino oscuro

**Relleno:** `py-16 px-[60px]`

**Cuadrícula:** `grid grid-cols-4 gap-12 mb-14`

Col 1 — Marca:
- Logo + `DENTORA` — Plus Jakarta Sans 800 `text-[1.1rem] text-white track-[-0.01em]`
- `"La clínica dental de tu familia"` — Plus Jakarta Sans 300 `text-[0.7rem] text-white/40 tracking-[0.1em] mt-1`
- Teléfono: Plus Jakarta Sans 600, `text-sm text-white mt-5` — `(800) 559-2648`
- Correo electrónico: `hello@dentoraclinic.com` — Plus Jakarta Sans 300, `text-sm text-white/50`

Col 2 — `SERVICES`:
- Etiqueta: Plus Jakarta Sans 600 `text-[0.6rem] seguimiento-[0.2em] texto mayúscula-blanco/30 mb-5`
- Enlaces: Chequeo dental · Limpieza dental · Blanqueamiento · Implantes · Carillas · Atención de emergencia
- Plus Jakarta Sans 400 `text-sm text-white/55 hover:text-white block mb-3`

Col 3 — `CLINIC`:
- Acerca de nosotros · Conozca al equipo · Reseñas de pacientes · Blog · Carreras
- Mismo estilo de enlace

Col 4 — `HORARIOS`:
- Etiqueta: `HORARIO DE APERTURA`
- `Lunes – Viernes: 8:00 am – 7:00 pm`
- `Sábado: 9:00 am – 5:00pm`
- `Domingo: Solo emergencia`
- `Emergencia 24/7: (800) 559-2648` — `text-white/70 mt-2`
- Fila social: `flex gap-5 mt-5` — Facebook · Instagram · Google · Iconos de Yelp `text-white/30 hover:text-white`

**Barra inferior:** `pt-8 border-t border-white/10 flex justify-between items-center flex-wrap gap-4`
- `© 2026 Dentora Dental Clinic. Todos los derechos reservados.` — Plus Jakarta Sans 300 `text-xs text-white/30`
- `Política de privacidad · Términos de servicio` — mismo estilo `hover:text-white/60`

---

## Animaciones

```
Navbar: no entrance animation — static absolute
Hero badge: fade-up, delay 0s, duration 0.4s
Hero H1 (word-by-word): custom={wordIndex} stagger 0.08s, blur-up
Hero subline: delay 0.5s, fade-up
Hero CTAs: delay 0.65s, fade-up
Hero service tags: delay 0.8s, fade-up as group

Progress bar: static — click to animate active step indicator

Stats counters: IntersectionObserver (once, threshold 0.3)
  Count 0→target, 1400ms cubic-bezier(0.25,0.1,0.25,1)

Service cards: IntersectionObserver stagger 0.08s each
  Hover: translateY(-5px) + shadow + inner photo scale(1.05)

Why Choose Us: left text fade-up, right photo fade-up, delay 0.15s each

Process steps: stagger 0.1s, fade-up from y:20

Testimonials: stagger 0.1s, fade-up

FAQ accordion: AnimatePresence height expand
  Question click → open: height 0 → auto, opacity 0 → 1, 220ms easeOut
  ChevronDown: rotate(0) → rotate(-180deg) on open

Final CTA: fade-up on scroll entry, H2 then subtext then buttons
```

---

## Responsive

```
Desktop (lg+): all as specified
Tablet (md–lg):
  Hero: same layout, smaller type
  About/Stats: stats row wraps
  Services: grid-cols-2 (3×2)
  Why Choose Us: grid-cols-2, smaller gap
  Process: grid-cols-2
  Footer: grid-cols-2

Mobile (< md):
  Navbar: logo left, hamburger right → dark overlay menu
  Hero: min-h-[80vh], type smaller (clamp bottom value)
    service tags: 3 visible, +N more indicator
  Progress bar: horizontal scroll, 2 visible at once
  About: stats wrap to 2-column grid
  Services: grid-cols-1
  Why Choose Us: single column, photo below
  Process: grid-cols-1
  Testimonials: single column
  Photo CTA: stacked, text then button
  FAQ: full width
  Footer: grid-cols-1 stacked
  Padding everywhere: px-6
```

---

## Todo Copia

**Marca:** DENTORA — Your Family'sClínica Dental

**Nav:** `Servicios · Acerca de nosotros · Testimonios · Contacto`
**Teléfono:** `(800) 559-2648` · **Email:** `hello@dentoraclinic.com`

**Hero:**
- Insignia: `BEST DENTAL CUIDADO · PORTLAND, OR`
- H1: `Experimente un cuidado dental cómodo.`
- Sublínea: `La salud dental de su familia, manejada con cuidado. Tecnología moderna, manos suaves y precios transparentes, siempre.`
- CTA: `Reservar cita →` · `O llame al: (800) 559-2648`
- Etiquetas de servicio: `Chequeo dental · Limpieza de dientes · Blanqueamiento dental · Tratamiento de encías · Implantes · Endodoncia`

**Barra de progreso:** `Sonrisa Evaluación · Planificación de la atención · Proceso de tratamiento · Mantenimiento dental`

**Acerca de:**
- Etiqueta: `ACERCA DE NOSOTROS`
- Declaración: `"Ofrecemos tratamientos dentales personalizados con tecnología moderna y cuidado amable que garantiza sonrisas saludables y seguras para cada paciente".`
- Estadísticas: `98% Tasa de satisfacción · Más de 2.000 sonrisas transformadas · 4.9★ Calificación del cliente`
- Médico: `Dr. Daniel Carter — Especialista dental principal · ★ 4.9 (más de 40 reseñas)`

**Servicios:**
- Etiqueta: `TRATAMIENTO FUNCIONAL`
- H2: `Cuidado dental avanzado para una sonrisa más saludable`
- Tarjetas: Chequeo dental ($80+) · Limpieza de dientes ($120+) · Blanqueamiento dental ($299+) · Implantes dentales ($1,800+) · Carillas y coronas ($650+) · Atención de emergencia (el mismo día)

**Por qué elegirnos:**
- Etiqueta: `POR QUÉ ELEGIRNOS`
- H2: `¿Está buscando un dentista que le brinde esa atención especial? smile?`
- Checklist: Chequeos dentales · Tratamientos de higiene · Coronas, carillas y puentes · Tratamiento de conducto · Restauración de implantes dentales · Blanqueamiento dental profesional
- CTA: `Conozca a nuestro equipo →`

**Proceso:** `Su viaje hacia una sonrisa más saludable.`
- Reserva online · Visita de bienvenida · Smile Evaluación · Tratamiento y atención

**Testimonios:** `No confíe en nuestra palabra. · ★★★★★ 4,9 de más de 1200 reseñas verificadas`

**Foto CTA:** `¿Listo para tu mejor sonrisa?` / `Citas disponibles para el mismo día. Sin listas de espera.`

**Preguntas frecuentes:** `Preguntas comunes, respuestas claras.` — 7 preguntas y respuestas (ver desglose de componentes)

**CTA final:**`Tu sonrisa más saludable comienza hoy.` / línea de confianza: `Sin lista de espera · Precios transparentes · Todas las edades son bienvenidas`

**Pie de página:**
- `DENTORA · La clínica dental de tu familia`
- `© 2026 Clínica Dental Dentora. Todos los derechos reservados.`
- Horario: lunes a viernes de 8 a. m. a 7 p. m. · sábados de 9 a. m. a 5 p. m. · Emergencia 24 horas al día, 7 días a la semana

---

## Key Dependencias

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.469.0",
  "@radix-ui/react-collapsible": "latest"
}
```

---

## Notas rápidas

- **Barra de pasos de progreso** (sección 03) es un elemento interactivo decorativo: al hacer clic, se cambia el paso activo visualmente, pero no es necesario cargar contenido separado. Señala un recorrido estructurado del paciente, lo que genera confianza. 
- **Los contadores de estadísticas** necesitan IntersectionObserver: solo se activan una vez cuando la fila de estadísticas ingresa a la ventana gráfica, no en cada paso de desplazamiento.
- **Las tarjetas de servicio** usan `overflow-hidden` en el contenedor de fotos + `scale` separado en el `<img>` interno para el desplazamiento de paralaje. no escale la tarjeta en sí.
- **Color verde azulado** `hsl(180 91% 39%)` = `#0BB8B8`: se usa de manera consistente para todas las acciones principales, etiquetas y acentos. No hay azul en ninguna parte.
- **Banner de foto CTA** (sección 09) utiliza un degradado de izquierda a derecha para que el texto siga siendo legible independientemente del aspecto de la foto; no confíe en el "espacio vacío" de la imagen.