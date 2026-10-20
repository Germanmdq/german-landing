# Sitio web de entrenador personal: FORGE

Cree un sitio web cinematográfico de una sola página para entrenador personal llamado "FORGE": fondo negro oscuro, acento naranja (#FF4D00), tipografía mayúscula condensada en negrita y fotografías de gimnasios en todas partes. Estética de fitness premium, agresiva, motivadora.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 0 0% 3%;
  --foreground: 0 0% 97%;
  --primary: 18 100% 50%;          /* #FF4D00 orange */
  --primary-foreground: 0 0% 0%;
  --muted: 0 0% 8%;
  --muted-foreground: 0 0% 55%;
  --border: 0 0% 14%;
  --card: 0 0% 6%;
}
```

---

## Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

- **Encabezados**: Barlow Condensed 900, mayúsculas, seguimiento-tight
- **Subtítulos/etiquetas**: Barlow Condensed 700, mayúsculas, seguimiento-[0.15em]
- **Cuerpo/UI**: Inter 400–500
- **Estadísticas/números**: Barlow Condensed 800, text-primary

---

## Efectos visuales

### 1. Superposición de textura de grano (fija, pantalla completa)
```tsx



```

### 2. Morfismo de vidrio navbar
```css
background: rgba(5, 5, 5, 0.75);
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(255, 255, 255, 0.06);
```

### 3. Resplandor naranja CTA
```css
.cta-primary {
  background: #FF4D00;
  box-shadow: 0 0 32px rgba(255, 77, 0, 0.4), 0 0 64px rgba(255, 77, 0, 0.15);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.cta-primary:hover {
  box-shadow: 0 0 48px rgba(255, 77, 0, 0.6), 0 0 96px rgba(255, 77, 0, 0.25);
  transform: translateY(-2px);
}
```

### 4. Animaciones de entrada escalonadas (Framer Movimiento)
```tsx
initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
// Triggered by useInView with once: true, margin: "-80px"
```

### 5. Control deslizante Antes/Después de la transformación
```tsx
// Horizontal clip reveal — drag handle controls clip-path of "after" image
// after image: clipPath: `inset(0 0 0 ${100 - sliderPos}%)`
// drag handle: absolute, left: `${sliderPos}%`, cursor grab
```

---

## Desglose de componentes

### 1 — Barra de navegación

- Parte superior fija, h-[68px], z-50, ancho completo
- Fondo de vidrio (ver arriba)
- max-w-[1120px] mx-auto px-6, justificación flexible entre elementos-centro
- Izquierda: marca del logotipo (cuadrado naranja 20×20 + "FORGE" en Barlow Condensed 800 con seguimiento más amplio)
- Centro (solo escritorio): enlaces de navegación — "Servicios" · "Resultados" · "Acerca de" · "Contacto"
 - `text-sm font-medium text-muted-foreground hover:text-white colores de transición`
- Derecha: `h-10 px-6 rounded-lg bg-texto primario-texto negro-sm font-semibold hover:opacity-90` — "Reservar una sesión"
- Móvil: icono de hamburguesa (Menú Lucide), ocultar centro nav

---

### 2 — Hero

- `min-h-screen relativa flex items-end overflow-hidden`
- Imagen de fondo de pantalla completa, superposición de degradado para texto legibilidad

```tsx
{/* Image: male personal trainer in black compression shirt, powerful physique, dramatic gym lighting, dark cinematic background with bokeh orange light streaks, high contrast, professional athletic photography */}

```

- Superposición de degradado: `absolute inset-0 bg-gradient-to-t from-black via-black/60to-black/20 z-[1]`
- Brillo lateral naranja: `absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(255,77,0,0.12)] z-[2]`
- Contenido: `relative z-10 max-w-[1120px] mx-auto px-6 pb-16 md:pb-24 w-full`

**Etiqueta:** `text-xs fuente-semibold seguimiento de mayúsculas-[0.25em] texto-primario mb-4` — "Entrenamiento y entrenamiento personal"

**H1:**
```tsx



  YOUR TRUSTED
PERSONAL

  TRAINER



```

**Sub:** `text-base text-muted-foreground mt-6 max-w-[420px] líder-relajado` — "Entrenamiento personal profesional y coaching online. Programas reales. Resultados reales."

**CTAs:** `flex gap-3 mt-8 flex-wrap`
- Primario: `cta-primary h-12 px-8 rounded-lg text-black font-semibold text-sm` — "Reservar una sesión →"
- Secundario: `h-12 px-8 borde redondeado-lg borde-borde texto-texto blanco-sm fuente-medio hover:border-primary/40 colores de transición` — "Ver resultados"

**Fila de estadísticas:** `flex gap-8 mt-12 pt-8 border-t border-border`
```
200+          10 yrs          5×
Clients       Experience      Champion
```
Eda estadística: número en `font-['Barlow_Condensed'] text-4xl font-black text-primary`, etiqueta en `text-xs text-silenciado-primer plano seguimiento en mayúsculas más amplio mt-1`

---

### 3 — Servicios

- `py-24 md:py-32 bg-[hsl(var(--background))]`
- max-w-[1120px] mx-auto px-6
- Etiqueta: `text-xs fuente-semibold seguimiento de mayúsculas-[0.25em] texto-primario mb-4` — "Lo que ofrezco"
- H2: `font-['Barlow_Condensed'] fuente-negro texto en mayúsculas-5xl md:text-6xl texto-blanco` — "PROGRAMAS CREADOS PARA RESULTADOS"
- Cuadrícula: `grid grid-cols-1 md:grid-cols-3 gap-5 mt-16`

**Patrón de tarjeta:** `rounded-2xl p-7 bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-primary/30 transition-all duration-300 group`

| Icono (lucidez) | Título | Descripción |
|---|---|---|
| `Mancuerna` | ENTRENAMIENTO 1 A 1 | Programas totalmente personalizados diseñados en función de sus objetivos, horario y nivel de condición física actual. Sesiones presenciales en Praga u online. |
| `Laptop` | ENTRENAMIENTO EN LÍNEA | Entrenamiento personalizado + plan de nutrición, controles semanales y acceso directo a mí a través de la aplicación. Entrena desde cualquier parte del mundo. |
| `manzana` | PLANES DE NUTRICIÓN | Planes de alimentación respaldados por la ciencia y adaptados a su cuerpo, sus objetivos y su estilo de vida. Sin modas pasajeras ni restricciones, solo resultados. |

Partes internas de la tarjeta:
- Icono: `w-10 h-10 text-primary mb-5group-hover:scale-110 transición-transformación`
- Título: `font-['Barlow_Condensed'] fuente-bold texto en mayúsculas-xl texto-blanco seguimiento-ancho mb-3`
- Cuerpo: `text-sm texto-silenciado-primer plano líder-relajado`
- Abajo: borde inferior naranja `h-0.5 w-0 bg-grupo primario-hover:w-transición completa-toda la duración-500 mt-6`

---

### 4 — Resultados del cliente (Transformaciones)

- `py-24 md:py-32 bg-[hsl(var(--muted))]`
- max-w-[1120px] mx-auto px-6
- Etiqueta: `text-xs font-semibold mayúsculas seguimiento-[0.25em] text-primary mb-4` — "Los resultados hablan por sí mismos"
- H2: `font-['Barlow_Condensed'] fuente-negro texto mayúscula-5xl md:text-6xl text-white` — "TRANSFORMACIONES DE CLIENTES"
- Sub: `text-sm text-muted-foreground mt-4 max-w-[480px]` — "Cada transformación comenzó con una sesión. Estos son clientes reales con resultados reales: sin Photoshop, sin atajos".
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6 mt-16`

**Tarjeta de transformación (3 tarjetas):**
```tsx



  {/* Before/after image pair */}
  


    {/* Image: male fitness transformation — before photo left half, after photo right half, split panel format, gym environment, dramatic lighting */}
    
    {/* BEFORE / AFTER labels */}
    Before
    After


    

PHILIP'S HARD WORK PAID OFF


    

12-Month Transformation


    

Philip aimed to lose fat and build muscle. With determination and a solid plan, he succeeded remarkably.


```

Datos de transformación (3 tarjetas):

| Nombre/Título | Duración | Lema |
|---|---|---|
| EL DURO TRABAJO DE PHILIP DIO SUS RESULTADOS | Transformación de 12 meses | Philip tenía como objetivo perder grasa y desarrollar músculo. Con determinación y un plan sólido, lo logró notablemente. |
| ANNA ENCONTRÓ SU CONFIANZA | Transformación de 6 meses | Anna quería volver a sentirse fuerte. Llegó insegura y se fue imparable. |
| MARCUS HIZO TODO | Transformación de 8 meses | Marcus había probado todos los programas. Éste era el último que necesitaba. |

---

### 5 — Testimonios

- `py-24 md:py-32 bg-[hsl(var(--background))]`
- max-w-[1120px] mx-auto px-6
- H2: `font-['Barlow_Condensed'] fuente-negro texto mayúscula-4xl md:text-5xl texto-blanco` — "LO QUE DICEN LOS CLIENTES"
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-5 mt-14`

**Tarjeta de testimonio:** `rounded-2xl p-6 bg-[hsl(var(--card))] border border-[hsl(var(--border))]`
- Estrellas: 5 × `★` en `text-primary text-sm`
- Cita: `text-sm text-foreground-leading-relaxed mt-4 cursiva` — texto de comillas completo
- Autor: `text-xs font-semibold text-primary mayúsculas seguimiento-más ancho mt-5`— nombre + duración

| Cita | Autor |
|---|---|
| "Peter es realmente un entrenador fantástico. Los resultados que logramos en sólo dos meses van más allá de lo que creía posible. Te hace responsable todos los días". | Mark D. — 2 meses |
| "Mi progreso ha sido asombroso. Me siento empoderada y motivada como nunca antes. El programa se adaptó exactamente a mi vida". | Sarah T. — 4 meses |
| "Este viaje ha sido increíblemente gratificante. Estoy muy agradecido por la estructura, la orientación y el cuidado genuino que Peter pone en cada sesión". | James R. — 6 meses |

---

### 6 — Acerca de

- `py-24 md:py-32 bg-[hsl(var(--muted))]`
- max-w-[1120px] mx-auto px-6
- `grid grid-cols-1 md:grid-cols-2 gap-16 items-center`

**Izquierda — imagen:**
```tsx



  {/* Image: male personal trainer, confident pose, arms crossed, gym environment with training equipment, dramatic side lighting, orange warm tones, dark moody background */}
  
  {/* Floating stat badge */}
  


    

10+


    

Years of Experience


```

**Derecha — texto:**
- Etiqueta: `text-xs font-semibold mayúsculas seguimiento-[0.25em] text-primary mb-4` — "Acerca de mí"
- H2: `font-['Barlow_Condensed'] fuente-negro texto mayúscula-5xl texto-blanco líder-ninguno` — "¡ENTRENADOR PERSONAL CERTIFICADO FAVORITO!"
- Cuerpo: `text-sm texto-silenciado-primer plano líder-relajado mt-6`
 > "La línea definitiva entre tus sueños y la realidad se llama Acción."
 > He pasado más de una década ayudando a las personas a transformar sus cuerpos y su confianza. Mis métodos combinan entrenamiento basado en la ciencia, nutrición honesta y el tipo de responsabilidad que realmente se mantiene. Ya sea que esté comenzando desde cero o superando una meseta, estoy aquí para llevarlo allí. 
- Certificados: `flex flex-wrap gap-2 mt-8`
 - Cada uno: `text-xs border border-border px-3 py-1.5 rounded-full text-muted-foreground`
 - "Certificado NASM" · "Nutrición de precisión" · "Levantamiento olímpico" · "Entrenamiento en línea"
- CTA: `mt-8 h-12 px-8 rounded-lg bg-primary text-black font-semibold text-sm inline-flex items-center gap-2 cta-primary` — "Trabaja conmigo →"

---

### 7 - Reservar una sesión (CTA de ancho completo)

- `relative py-24 md:py-32 overflow-hidden`
- Antecedentes:
```tsx
{/* Image: dramatic gym interior — squat racks, barbell plates, moody low lighting, empty floor, cinematic depth of field, dark orange atmospheric glow */}



```
- Contenido: `relativo z-10 max-w-[720px] mx-autopx-6 text-center`
- Etiqueta: `text-xs font-semibold mayúsculas seguimiento-[0.25em] text-primary mb-4` — "Lugares limitados disponibles"
- H2: `font-['Barlow_Condensed'] font-black uppercase text-[clamp(3rem,8vw,6rem)] leading-none text-white`
 ```
  LET'S GET YOU
  YOUR DREAM BODY!
  ```
- Sub: `text-sm text-muted-foreground mt-6` — "Reserve su primera llamada de consulta gratuita. Sin compromiso. Solo una conversación sobre sus objetivos". 
- CTA: `mt-10 h-14 px-12 rounded-lg bg-primary text-black font-bold text-base inline-flex items-center gap-2 cta-primary` — "Programemos su primera sesión →"

---

### 8 — Pie de página

- `py-12 border-t border-[hsl(var(--border))]`
- max-w-[1120px] mx-auto px-6
- `flex flex-col md:flex-row justify-between items-start md:items-center gap-6`
- Izquierda: logo + `text-xs text-muted-foreground mt-2` — "© 2025 Peter Cooper — Personal Trainer & Coach"
- Centro (escritorio): `flex gap-6 text-xs text-muted-foreground` — "Servicios" · "Resultados" · "Acerca de" · "Contacto"
- Derecha: iconos sociales (lucide Instagram, Youtube, Twitter/X) — `w-4 h-4 text-muted-foreground hover:text-white colores-de-transición`

---

## Animaciones

```
Navbar: opacity 0 → 1, delay 0, duration 0.4s
Hero label: opacity 0, y 16 → 0, blur 6px → 0, delay 0.1s
Hero H1 words: stagger per word, delay 0.2s + index*0.08, duration 0.55s
Hero sub: delay 0.55s, duration 0.5s
Hero CTAs: delay 0.7s, duration 0.5s
Hero stats: stagger per stat, delay 0.85s + index*0.1
All sections: useInView once:true, margin "-80px" → stagger children 0.1s
Service cards: y 40 → 0, opacity 0 → 1, stagger 0.08s per card
Transformation cards: y 40 → 0, opacity 0 → 1, stagger 0.1s
Testimonial cards: y 30 → 0, opacity 0 → 1, stagger 0.08s
About section: left col slideInLeft (x -40 → 0), right col fade up, simultaneous
CTA section: scale 0.95 → 1, opacity 0 → 1, duration 0.6s
```

---

## Responsive

```
Navbar: desktop → full nav links + CTA; mobile → logo + hamburger only, links hidden
Hero H1: clamp(4.5rem, 12vw, 10rem) — scales naturally
Hero CTAs: flex-row desktop → flex-col w-full max-w-[320px] mx-auto mobile
Hero stats: flex-wrap, gap reduced on mobile
Services grid: 3-col desktop → 1-col mobile
Transformations grid: 3-col desktop → 1-col mobile
Testimonials grid: 3-col desktop → 1-col mobile
About: 2-col desktop → 1-col mobile (image first, text below), image h-[400px] mobile
CTA H2: clamp(3rem, 8vw, 6rem) — scales naturally
Footer: row desktop → column mobile
```

---

## Copia completa

| Elemento | Copia |
|---------|------|
| Logotipo | FORJA |
| Enlaces de navegación | Servicios · Resultados · Acerca de · Contacto |
| CTA de navegación | Reservar una sesión |
| Etiqueta de héroe | Entrenamiento personal y coaching |
| Héroe H1 | TU ENTRENADOR PERSONAL / DE CONFIANZA |
| Sub héroe | Entrenamiento personal profesional y coaching online. Programas reales. Resultados reales. |
| Héroe CTA primario | Reservar una sesión → |
| Héroe CTA secundario | Ver resultados |
| Estadísticas | Más de 200 clientes · 10 años de experiencia · 5× Campeón |
| Etiqueta de servicios | Lo que ofrezco |
| Servicios H2 | PROGRAMAS CREADOS PARA OBTENER RESULTADOS |
| Servicio 1 | ENTRENAMIENTO 1 A 1: programas totalmente personalizados diseñados en función de sus objetivos, horario y nivel de condición física actual. Presencialmente o en línea. |
| Servicio 2 | ENTRENAMIENTO EN LÍNEA: entrenamiento personalizado + plan de nutrición, controles semanales,y acceso directo a través de la aplicación. Entrena desde cualquier lugar. |
| Servicio 3 | PLANES DE NUTRICIÓN: planes de alimentación respaldados por la ciencia y adaptados a su cuerpo y sus objetivos. Sin modas pasajeras ni restricciones, solo resultados. |
| Etiqueta de transformaciones | Los resultados hablan por sí solos |
| Transformaciones H2 | TRANSFORMACIONES DE CLIENTES |
| Transformaciones sub | Cada transformación comenzó con una sesión. Clientes reales, resultados reales: sin Photoshop ni atajos. |
| Acerca de la etiqueta | Acerca de mí |
| Acerca del H2 | ¡ENTRENADOR PERSONAL CERTIFICADO FAVORITO! |
| Acerca de la cotización | "La línea definitiva entre tus sueños y la realidad se llama Acción". |
| Sobre el cuerpo | He pasado más de una década ayudando a personas a transformar sus cuerpos y su confianza. Mis métodos combinan entrenamiento basado en la ciencia, nutrición honesta y el tipo de responsabilidad que realmente se mantiene. Ya sea que esté comenzando desde cero o superando una meseta, estoy aquí para llevarlo allí. |
| Etiqueta de CTA | Plazas limitadas disponibles |
| CTA H2 | ¡VAMOS A CONSEGUIR TU CUERPO DE SUEÑOS! |
| Subtítulo de CTA | Reserve su primera llamada de consulta gratuita. Sin compromiso. Sólo una conversación sobre tus objetivos. |
| Botón de acción | Programemos su primera sesión → |
| Pie de página | © 2025 Peter Cooper — Entrenador personal y entrenador |

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx"
}
```