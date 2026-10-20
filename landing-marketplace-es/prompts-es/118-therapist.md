# Mensaje del sitio web del terapeuta: Clarity Therapy
# websiteprompts.ai

Cree un sitio web completo para terapeutas y psicólogos listo para producción llamado **Clarity Therapy** usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react. El sitio debe sentirse tranquilo, cálido y editorialmente hermoso: la antítesis de los sitios clínicos de atención médica de caja blanca. Piense en una práctica independiente dirigida por un ser humano atento y afectuoso.

---

## 1. Declaración de objetivos

Crear un sitio web para terapeutas centrado en la conversión que haga que los visitantes se sientan inmediatamente seguros, comprendidos y obligados a reservar una sesión introductoria gratuita. session.

---

## 2. Tech Stack

- **Framework:** React + Vite + TypeScript
- **Estilo:** Tailwind CSS (modo JIT, tema extendido con propiedades personalizadas de CSS)
- **Animación:** Framer Motion (importar como `motion` desde `motion/react`)
- **Componentes:** shadcn/ui (botón, entrada, insignia, tarjeta)
- **Iconos:** lucide-react
- **Fuentes:** Google Fonts (DM Serif Display + Plus Jakarta Sans)

---

## 3. Sistema de diseño

```css
:root {
  /* Backgrounds */
  --background: 60 20% 98%;          /* warm white #fafaf7 */
  --surface: 60 15% 95%;             /* off-white surface #f4f4ef */
  --surface-tinted: 42 30% 93%;      /* warm sand surface #ede8df */

  /* Foregrounds */
  --foreground: 30 12% 18%;          /* warm near-black #302b24 */
  --foreground-muted: 30 8% 48%;     /* warm mid-grey #7e7870 */

  /* Primary — sage teal */
  --primary: 173 33% 35%;            /* #3d7a72 */
  --primary-light: 173 28% 48%;      /* #5a9990 */
  --primary-foreground: 0 0% 100%;

  /* Secondary — warm sand */
  --sand: 36 34% 69%;                /* #c8b89a */
  --sand-light: 36 28% 85%;          /* #e2d9cc */
  --sand-foreground: 30 20% 20%;

  /* Accent — warm sage */
  --sage-soft: 152 18% 82%;          /* #c5d4cc */

  /* Borders */
  --border: 42 18% 85%;              /* #ddd8ce */
  --border-muted: 42 12% 91%;        /* #eceae4 */

  /* Typography scale */
  --radius: 0px;
}
```

Aplicar al `cuerpo`: `background-color: hsl(var(--background)); color: hsl(var(--foreground)); font-family: 'Plus Jakarta Sans', sans-serif;`

---

## 4. Tipografía

### Importación de fuentes de Google
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```

### Uso
| Elemento | Fuente | Peso | Estilo | Tamaño | Altura de línea |
|---|---|---|---|---|---|
| Pantalla H1 | Pantalla DM Serif | 400 | cursiva | clamp(36px, 5vw, 88px) | 1.08 |
| Sección H2 | Pantalla DM Serif | 400 | cursiva | clamp(28px, 3.5vw, 56px) | 1.15 |
| Tarjetas H3 | Pantalla DM Serif | 400 | normales | clamp(20px, 2vw, 26px) | 1.3 |
| Subtítulo | Plus Yakarta Sans | 300 | normales | clamp(16px, 1.4vw, 20px) | 1.65 |
| Texto del cuerpo | Plus Yakarta Sans | 400 | normales | 16px | 1.75 |
| Etiqueta/Distintivo | Plus Yakarta Sans | 700 | normales | 11px, espacio entre letras 0,12em | 1 |
| Elementos de navegación | Plus Yakarta Sans | 500 | normales | 14 píxeles | 1 |
| Botón | Plus Yakarta Sans | 600 | normales | 14px, espacio entre letras 0,04em | 1 |

---

## 5. Efectos visuales

### Efecto 1: Degradado del panel Hero
El panel de contenido izquierdo utiliza un degradado direccional que se extiende hacia la derecha en el panel de fotografía:
```css
background: linear-gradient(
  to right,
  hsl(60, 20%, 98%) 0%,
  hsl(60, 20%, 98%) 60%,
  hsla(60, 20%, 98%, 0.92) 78%,
  hsla(60, 20%, 98%, 0.60) 90%,
  transparent 100%
);
```
Esto se encuentra en su propio div `z-10` superpuesto al panel de fotografía, lo que garantiza la legibilidad del texto independientemente de la composición de la foto o de dónde esté colocado el sujeto.

### Efecto 2: Superposición de textura de arena
Las secciones de héroes y citas obtienen una sutil superposición de textura de ruido SVG con una opacidad del 3%:
```jsx
<div
  className="absolute inset-0 pointer-events-none z-0"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    backgroundSize: '128px 128px',
  }}
/>
```

### Efecto 3: Tarjeta flotante "Primera sesión gratuita"
A pequeña tarjeta flotante anclada en la parte inferior izquierda del grupo de CTA en el héroe. Escala desde `escala: 0,92, opacidad: 0` a `escala: 1, opacidad: 1` en `retraso: 0,5 s` con `tipo: "resorte", rigidez: 220, amortiguación: 24`. Flotador sutil permanente: `y: [0, -4, 0]` en `repetición: Infinity, duración: 3.5, facilidad: "easeInOut"` (Framer Motion `animate`).

### Efecto 4: Desvanecimiento de sección activado por desplazamiento
Todos los encabezados de sección usan:
```jsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
```

### Efecto 5: Desplazamiento de tarjeta con borde de arena
Las tarjetas de área de soporte obtienen "transición: color de borde con facilidad de 0,25 s, sombra de cuadro con facilidad de 0,25 s" al pasar el mouse: el color del borde izquierdo cambia de `hsl(var(--sand))` a `hsl(var(--primary))`, y una sombra suave `0 4px 24px hsla(173,33%,35%,0.10)` aparece.

---

## 6. Desglose de componentes

### Sección 1: barra de navegación

```
Layout: fixed top-0, w-full, z-50, h-16
Background: hsl(var(--background)) at 96% opacity with backdrop-blur-sm
Bottom border: 1px solid hsl(var(--border-muted))
Padding: px-6 md:px-12 lg:px-20
```

**Izquierda:** Logotipo: "Claridad" en DM Serif Display 400 cursiva a 22 px, verde azulado, seguido de "Terapia" en Plus Jakarta Sans 300 a 22 px, primer plano silenciado.

**Centro (escritorio):** Enlaces de navegación: `Cómo trabajo` / `Áreas de soporte` / `Acerca de`/`Tarifas`/`Contacto`: además de Jakarta Sans 500 a 14 px, primer plano silenciado, desplazamiento: primer plano. Espacio de 32 píxeles entre enlaces.

**Derecha:** `Reservar sesión gratuita`: botón con `background: hsl(var(--primary))`, texto blanco, Plus Jakarta Sans 600, 14 píxeles, espacio entre letras 0,04 em, relleno: `10px 20px`, radio de borde: 0, desplazamiento: `background: hsl(var(--primary-light))`, transición 0s```
Layout: min-h-screen flex, pt-16 (navbar offset)
```

**Panel izquierdo: 48 % de ancho:**
```
position: relative
z-index: 10
padding: pl-6 md:pl-12 lg:pl-20, pr-8, py-20 md:py-28
display: flex flex-col justify-center
background: linear-gradient(to right, hsl(60,20%,98%) 0%, hsl(60,20%,98%) 60%, hsla(60,20%,98%,0.88) 82%, transparent 100%)
```

Contenido dentro del panel izquierdo (de arriba a abajo):

1. **Etiqueta de cejas:** "TERAPIA INDIVIDUAL · LONDRES" — Plus Jakarta Sans 700, 11 px, espacio entre letras 0,14 em, `color: hsl(var(--primary))`, margen inferior 20 px. Movimiento: `initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}`

2. **H1:** "No tienes que resolver esto solo". — DM Serif Display 400 cursiva, `clamp(36px,5vw,88px)`, altura de línea 1,08, `color: hsl(var(--foreground))`, ancho máximo 560 px. Movimiento: `transition={{ duration:0.65, delay:0.2, ease:[0.22,1,0.36,1] }}`

3. **Subtítulo:** "Terapia individual para la ansiedad, el agotamiento, las relaciones y las transiciones de la vida". — Además de Jakarta Sans 300, `clamp(16px,1.4vw,20px)`, altura de línea 1,65, `color: hsl(var(--foreground-muted))`, ancho máximo 440 px, margen superior 20 px. Movimiento: `transition={{ duration:0.55, delay:0.35 }}`

4. **Clúster de CTA** (margen superior 36 px, espacio flexible-4): 
 - Botón principal: "Reservar sesión gratuita" — `background: hsl(var(--primary))`, blanco, Plus Jakarta Sans 600, 15 px, relleno: `14 px 28 px`, radio de borde: 0, escala de desplazamiento 1.01 transición 0.2 s
 - Fantasma botón: "Aprenda cómo trabajo →" — sin fondo, `color: hsl(var(--primary))`, Plus Jakarta Sans 500, 15px, `1px solid hsl(var(--primary))` con borde inferior, sin radio de borde
 Movimiento: `transition={{ duration:0.5, delay:0.45 }}`

5. **Tarjeta flotante "Primera sesión gratuita"** (margen superior 40px):
```
   background: hsl(var(--primary))
   padding: 20px 24px
   max-width: 340px
   border-radius: 0
   ```
 - "PRIMERA SESIÓN GRATIS" — Además de Jakarta Sans 800, 12 px, espacio entre letras 0,12 em, mayúsculas, `color: hsl(36,34%,85%)` (luz de arena) 
 - "Pruebe una sesión introductoria de 50 minutos sin costo, sin compromiso". — Plus Jakarta Sans 300, 14 px, altura de línea 1.6, blanco, margen superior 8 px
 - "Reserve su sesión gratuita →" — Plus Jakarta Sans 600, 14 px, `color: hsl(60,20%,98%)`, margen superior 14 px, borde inferior `1px solid hsla(255,255%,255%,0.4)`, opacidad al pasar el cursor 0.8
 
 Movimiento (Movimiento del marco):
```jsx
   initial={{ opacity: 0, scale: 0.92, y: 10 }}
   animate={{ opacity: 1, scale: 1, y: 0 }}
   transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.55 }}
   ```
 Luego, en la tarjeta, agregue un flotador permanente:
```jsx
   // Wrap in a second motion.div
   animate={{ y: [0, -5, 0] }}
   transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
   ```

**Panel derecho: 52 % de ancho:**
```
position: relative
overflow: hidden
min-height: 100vh (on desktop)
height: 480px (on mobile)
```
```jsx
{/* Image: Moss-covered stones beside a clear, shallow stream — dappled golden light filters through overhanging leaves. Calm, grounding, abstract nature. No people, no clinical setting. Warm green and earthy tones. Shot from slightly above, soft focus background, f/2.8 bokeh. */}
<img
  src=""
  alt="Calm nature photography — moss-covered stones near a stream with dappled light"
  className="w-full h-full object-cover object-center"
/>
```
Atribución abajo derecha: "Foto para ilustración" en Plus Jakarta Sans 300, 10px, blanco con 50% de opacidad, posicionado `absoluto abajo-4 derecha-4 z-10`.

---

### Sección 3: Áreas de Soporte

```
Section: py-24 md:py-32, background: hsl(var(--background))
Container: max-w-5xl mx-auto px-6 md:px-12
```

**Bloque de encabezado de sección** (margen inferior 56 px):
- Etiqueta: "ÁREAS DE APOYO" — Plus Jakarta Sans 700, 11 px, espacio entre letras 0,14 em, `color: hsl(var(--primary))`, margen inferior 12 px
- H2: "En qué podemos trabajar Juntos" — DM Serif Display 400 cursiva, `clamp(28px,3.5vw,52px)`, ancho máximo 480px

**Cuadrícula de 4 tarjetas:** `grid grid-cols-1 md:grid-cols-2 gap-6`

Ecada tarjeta:
```
background: hsl(var(--surface))
border-left: 3px solid hsl(var(--sand))
padding: 28px 28px 28px 32px
transition: border-color 0.25s ease, box-shadow 0.25s ease
hover: border-left-color hsl(var(--primary)), box-shadow 0 4px 28px hsla(173,33%,35%,0.10)
```

Contenido por tarjeta:
```
Icon (lucide, stroke-width 1.5, color hsl(var(--primary)), size 28px) — margin-bottom 16px
H3: DM Serif Display 400 normal, 22px
Description: Plus Jakarta Sans 400, 15px, line-height 1.7, color hsl(var(--foreground-muted)), margin-top 8px
```

Tarjetas:

**Tarjeta 1: Ansiedad y estrés**
Icono: `Cerebro` (lucidez)
Título: "Ansiedad y estrés"
Texto: "Preocupación persistente, pánico, agobio: estos no son defectos de carácter. Juntos encontraremos qué impulsa tu ansiedad y construye estrategias duraderas para recuperar tu calma". 

**Tarjeta 2: Dificultades en las relaciones**
Icono: `Corazón` (lucidez)
Encabezado: "Dificultades en las relaciones"
Texto: "Ya sean fallas en la comunicación, problemas de confianza o patrones que se siguen repitiendo, la terapia puede ayudarle a comprender lo que aporta a sus relaciones y a cambiarlo". 

**Tarjeta 3: Burnout y transiciones de la vida**
Icono: `Flame` (lucide)
Título: "Burnout & Life Transitions"
Texto: "Cambio de carrera, pérdida de identidad, agotamiento que el sueño no puede aliviar solución: trabajo con personas que navegan por espacios intermedios donde los mapas antiguos ya no se aplican". 

**Tarjeta 4: Duelo y pérdida**
Icono: `Nube` (lucide)
Encabezado: "Duelo y pérdida"
Texto: "El duelo no se ejecuta en una línea de tiempo y No se trata solo de la muerte, ya sea que estés de luto por una persona, una relación o una versión de ti mismo, este es un espacio para sentirlo plenamente". 

**Animación escalonada (Framer Motion):**
.```jsx
// Wrap grid in motion.div with staggerChildren
<motion.div
  variants={{ visible: { transition: { staggerChildren: 0.10 } } }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-60px" }}
>
  {cards.map(card => (
    <motion.div
      key={card.title}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } }
      }}
    >
```

---

### Sección 4: Cómo funcionan las sesiones

```
Section: py-24 md:py-32, background: hsl(var(--surface))
Container: max-w-5xl mx-auto px-6 md:px-12
```

**Bloque de encabezado de sección** (margen inferior 64px, centrado):
- Etiqueta: "EL PROCESO" — Plus Jakarta Sans 700, 11px, espacio entre letras 0,14em, `color: hsl(var(--primary))`, centrado
- H2: "Simple, estructurado y en Your Pace" — DM Serif Display cursiva, centrado, ancho máximo 480 px, margen: 0 auto

**Fila horizontal de 3 pasos:** `grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12`

Cada paso:
```
position: relative
padding: 12px 0 0 0
```

Detrás de cada título, un número de paso grande y descolorido:
```
position: absolute
top: -12px
left: -8px
font-family: DM Serif Display
font-size: clamp(80px, 10vw, 120px)
font-weight: 400
color: hsl(var(--primary))
opacity: 0.07
line-height: 1
z-index: 0
pointer-events: none
user-select: none
```

Contenido (índice z: 1, posición: relativa):
```
Step number chip: "Step 01" — Plus Jakarta Sans 700, 10px, letter-spacing 0.14em, color hsl(var(--primary)), margin-bottom 14px
H3: DM Serif Display 400 normal, 24px, margin-bottom 10px
Text: Plus Jakarta Sans 400, 15px, line-height 1.75, color hsl(var(--foreground-muted))
```

Pasos:

**Paso 1:**
Etiqueta: "Paso 01"
Encabezado: "Reserve una llamada gratuita de 20 minutos"
Texto: "Comenzamos con una llamada telefónica relajada y sin compromiso. Usted comparte lo que lo trajo aquí; Te explico cómo trabajo. Sin formularios, sin presiones, solo una conversación". 

**Paso 2:**
Etiqueta: "Paso 02"
Encabezado: "Nos reunimos semanalmente"
Texto: "Las sesiones duran 50 minutos y se llevan a cabo semanalmente, en persona en el centro de Londres o mediante video seguro. construyendo un espacio consistente que sea completamente tuyo."

**Paso 3:**
Etiqueta: "Paso 03"
Encabezado: "Usted construye herramientas que duran"
Texto: "La terapia no es para siempre. más resistente de lo que llegaste."

Línea de conexión entre pasos en el escritorio:
```css
/* pseudo-element on each step except last */
.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 24px;
  right: -24px;
  width: 48px;
  height: 1px;
  background: hsl(var(--sand));
}
```

---

### Sección 5: Acerca de la Dra. Sarah

```
Section: py-24 md:py-32, background: hsl(var(--background))
Container: max-w-5xl mx-auto px-6 md:px-12
Layout: grid grid-cols-1 md:grid-cols-2 gap-16 items-center
```

**Izquierda: fotografía de retrato:**
```
aspect-ratio: 4/5
overflow: hidden
max-width: 440px
```
```jsx
{/* Image: Professional female therapist portrait — warm natural light, soft smile, approachable expression. She sits at ease near a window with a large leafy plant visible behind her. Linen blouse. Shot on 85mm, shallow depth of field, warm skin tones, light plaster wall background. Feels like a calm, welcoming workspace. */}
<img
  src=""
  alt="Dr. Sarah Holloway — Clarity Therapy"
  className="w-full h-full object-cover object-center"
/>
```

**Derecha: contenido de la biografía:**
- Etiqueta: "ACERCA DE SU TERAPEUTA" - Además de Jakarta Sans 700, 11px, espacio entre letras 0,14em, color hsl(var(--primary)), margen inferior 16px
- H2: "Dr. Sarah Holloway" — DM Serif Display 400 italic, clamp(28px,3.5vw,48px), margin-bottom 24px
- Bio párrafo 1 (Plus Jakarta Sans 400, 16px, line-height 1.8, color hsl(var(--foreground-muted))):
 "He sido terapeuta durante Durante diez años, y en ese tiempo me he enfrentado a muchos tipos diferentes de dolor: ansiedad que no se calma, relaciones que han perdido su hilo, vidas que de alguna manera se sienten fuera de curso. Lo que he aprendido es que lo más importante no es la técnica o la teoría, es sentirse genuinamente escuchado". CBT y, cuando corresponda, EMDR para el trauma. Pero, sobre todo, creo en la relación que construimos juntos. Soy cálido, directo y no hago falso optimismo. Si estás listo para hacer el trabajo, estaré ahí contigo". Insignia `<span>`:
```
  display: inline-flex
  align-items: center
  padding: 6px 14px
  background: hsl(var(--surface-tinted))
  border: 1px solid hsl(var(--sand))
  font-family: Plus Jakarta Sans
  font-weight: 600
  font-size: 12px
  letter-spacing: 0.04em
  color: hsl(var(--primary))
  border-radius: 0
  ```
 Insignias: `Acreditado por BACP` / `Consejería de inmersión PG` / `Más de 10 años de práctica` / `Capacitado en EMDR` / `Practicante de CBT`

---

### Sección 6: Tarifas y seguro

```
Section: py-24 md:py-32, background: hsl(var(--surface-tinted))
Container: max-w-3xl mx-auto px-6 md:px-12 text-center
```

- Etiqueta: "FEES" — Plus Jakarta Sans 700, 11px, espacio entre letras 0,14em, color hsl(var(--primary)), margen inferior 12px
- H2: "Precios transparentes, sin sorpresas" — DM Serif Display en cursiva, clamp(28px,3vw,48px)
- Subtexto: "Todas las sesiones se llevan a cabo de forma confidencial. No trabajo directamente con paneles de seguros, pero puedo proporcionar recibos de reembolso". — Plus Jakarta Sans 300, 16 px, color hsl(var(--foreground-muted)), margen superior 12 px, margen inferior 48 px

**Tabla de tarifas:**
```
width: 100%
border: 1px solid hsl(var(--border))
```

Fila de encabezado de tabla: `background: hsl(var(--primary))`, texto blanco, Plus Jakarta Sans 700, 13px, espacio entre letras 0,06em

| Tipo de sesión | Duración | Tarifa |
|---|---|---|
| Llamada introductoria gratuita | 20 minutos | GRATIS |
| Sesión Individual | 50 minutos | 80€ |
| Sesión de Parejas/Relaciones | 50 minutos | 100€ |
| Escala móvil (bajos ingresos) | 50 minutos | Desde £55 |

Ecada fila: `border-bottom: 1px solid hsl(var(--border-muted))`, `relleno: 16px 20px`, fondo alterno `hsl(var(--surface))` / `hsl(var(--background))`.
Columna de tarifa: DM Serif Display 400 normal, 20px, color hsl(var(--primary)), text-right.

**Nota debajo de la tabla** (margen superior 24px):
```
background: hsl(var(--sand-light))
border-left: 3px solid hsl(var(--sand))
padding: 16px 20px
text-align: left
```
"Los espacios de escala móvil son limitados, pero creo que el costo no debería ser una barrera para obtener soporte. Comuníquese con nosotros y encontraremos algo que funcione para su situación". — Plus Jakarta Sans 400, 14px, color hsl(var(--foreground-muted))

---

### Sección 7 — Testimonios

```
Section: py-24 md:py-32, background: hsl(var(--background))
Container: max-w-5xl mx-auto px-6 md:px-12
```

- Etiqueta: "LO QUE DICEN LOS CLIENTES": centrado, Plus Jakarta Sans 700, 11 px, espacio entre letras 0,14 em, color hsl(var(--primary)), margen inferior 16 px
- H2: "Palabras de las personas con las que trabajo": DM Serif en cursiva, centrado, clamp(28px,3.5vw,48px), margen inferior 56px

**Cuadrícula de 3 tarjetas:** `grid grid-cols-1 md:grid-cols-3 gap-6`

Eda tarjeta:
```
background: hsl(var(--surface-tinted))
border-left: 3px solid hsl(var(--sand))
padding: 32px
```

Estructura de la tarjeta:
- Comillas de apertura: DM Serif Display 400 cursiva, 60px, `color: hsl(var(--sand))`, altura de línea 0, margen inferior 20px
- Texto de cita: Plus Jakarta Sans 300, 15px, altura de línea 1,85, `color: hsl(var(--foreground))`, estilo de fuente: cursiva
- Atribución: Plus Jakarta Sans 600, 12 px, espacio entre letras 0,06 em, color hsl(var(--foreground-muted)), margen superior 24px

**Testimonios:**

Cita 1:
"Había probado la terapia dos veces antes y nunca la mantuve. Con Sarah, algo hizo clic desde la segunda sesión. Ella tiene esta forma de reflejar las cosas que te hace verte a ti mismo sin juzgarte. Seis meses después, mi relación con la ansiedad es realmente diferente".
— Anónimo, 34

Cita 2:
"Después de mi agotamiento, sinceramente, no pensé que volvería a trabajar. La terapia de claridad no sólo me ayudó a recuperarme, sino que me ayudó a descubrir por qué había terminado allí en primer lugar. Esa es la parte que lo cambió todo".
— Anónimo, 41

Cita 3:
"El dolor después de que mi matrimonio terminó no se parecía a nada que esperaba. No quería consejos ni ejercicios; necesitaba que alguien simplemente se sentara conmigo. Sarah lo hizo y finalmente me ayudó a encontrar la salida. Estoy realmente agradecido".
— Anónimo, 29

---

### Sección 8 — Reserva CTA

```
Section: py-28 md:py-40
Background: hsl(var(--primary)) — sage teal #3d7a72
Position: relative, overflow: hidden
```

Textura sutil: forma de letra "C" grande rotada de DM Serif Display, `posición: absoluta, derecha: -60px, abajo: -40px, tamaño de fuente: 480px, opacidad: 0.05, color: blanco, eventos de puntero: ninguno, selección de usuario: ninguno, altura de línea: 1`

Contenedor: `max-w-3xl mx-auto px-6 text-center`

- Etiqueta: "TOMA EL PRIMER PASO" — Además de Jakarta Sans 700, 11 px, espacio entre letras 0,14 em, `color: hsla(0,0%,100%,0.6)`, margen inferior 16 px
- H2: "¿Listo para comenzar?" — DM Serif Display 400 cursiva, `clamp(36px,5vw,80px)`, blanco, altura de línea 1.1
- Subtexto: "Su primera sesión es completamente gratuita. Sin compromiso, sin papeleo, sin presión, solo una conversación". — Plus Jakarta Sans 300, `clamp(16px,1.4vw,20px)`, `color: hsla(0,0%,100%,0.75)`, margen superior 16 px, margen inferior 40 px, ancho máximo 520 px, mx-auto

**Fila de captura de correo electrónico** (`flex gap-0 max-w-md mx-auto`):
```jsx
<input
  type="email"
  placeholder="Your email address"
  className="flex-1 px-5 py-4 text-sm font-medium bg-white text-foreground border-0 outline-none rounded-none"
  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
/>
<button
  className="px-6 py-4 text-sm font-semibold tracking-wide rounded-none"
  style={{
    background: 'hsl(var(--sand))',
    color: 'hsl(var(--sand-foreground))',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    letterSpacing: '0.04em'
  }}
>
  Book Free Session
</button>
```

Nota a continuación: "O envíe un correo electrónico directamente: hello@claritytherapy.co.uk" — Plus Jakarta Sans 400, 14px, `color: hsla(0,0%,100%,0.55)`, margin-top 20px

**Animación de entrada de sección:**
```jsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
```

---

### Sección 9 — Pie de página

```
Section: py-16
Background: hsl(var(--foreground)) — warm near-black
Color: hsla(0,0%,100%,0.7)
```

**Cuadrícula de 3 columnas** (espacio-12):

**Columna 1 — Marca:**
- Logotipo: "Clarity Therapy" (mismo estilo que el navegador pero en blanco)
- "Una práctica cálida y privada para personas que enfrentan la ansiedad, el agotamiento y las estaciones más difíciles de la vida". — Plus Jakarta Sans 300, 14px, altura de línea 1,75, color hsla(0,0%,100%,0,55), margen superior 12px
- Marcador de posición BACP: `[Logotipo acreditado BACP]` — insignia pequeña, blanca con 40 % de opacidad, margen superior 20px

**Columna 2 — Práctica:**
Encabezado: "PRÁCTICA" — Plus Jakarta Sans 700, 10 px, espacio entre letras 0,14 em, color hsl(var(--sand)), margen inferior 16 px
Enlaces (Plus Jakarta Sans 400, 14 px, color hsla(0,0%,100%,0.6), hover: white, block, margin-bottom 10px):
- Cómo trabajo
- Áreas de soporte
- Tarifas
- Reservar una sesión
- Privacidad y Confidencialidad

**Columna 3 — Contacto:**
Encabezado: "CONTACTO" — mismo estilo
Info:
- "Terapia de claridad"
- "24 Harley Mews, Londres W1G 9PQ"
- "hello@claritytherapy.co.uk"
- "+44 (0)20 7946 0823"
- Lun–Vie: 8am–7pm
- Sáb: 9 a.m.-1 p.m.

**Barra inferior** (borde superior: 1px hsla sólido (0,0%,100%,0.1), margen superior 48px, relleno superior 24px, flexionado entre):
- "© 2025 Clarity Therapy. Todos los derechos reservados". — 13px
- "Registrado en BACP · Miembro No. 000000" — 13px

---

## 7. Animaciones — Referencia completa

| Elemento | Inicial | Animar/Mientras está en vista | Transición |
|---|---|---|---|
| Logotipo de navegación + enlaces | `{ opacity: 0, y: -8 }` | `{ opacity: 1, y: 0 }` | `duración: 0,4, retraso: 0,1` |
| Ceja de héroe | `{ opacity: 0, y: 12 }` | `{ opacity: 1, y: 0 }` | `duración: 0,5, retraso: 0,1` |
| Héroe H1 | `{ opacity: 0, y: 20 }` | `{ opacity: 1, y: 0 }` | `duración: 0,65, retraso: 0,2, facilidad:[0.22,1,0.36,1]` |
| Subtítulo del héroe | `{ opacity: 0, y: 16 }` | `{ opacity: 1, y: 0 }` | `duración: 0,55, retraso: 0,35` |
| CTA de héroe | `{ opacity: 0, y: 12 }` | `{ opacity: 1, y: 0 }` | `duración: 0,5, retraso: 0,45` |
| Tarjeta de sesión gratuita | `{ opacity: 0, scale: 0.92, y: 10 }` | `{ opacity: 1, scale: 1, y: 0 }` | `tipo:"resorte", rigidez:220, amortiguación:24, retraso:0,55` |
| Tarjeta flotante (infinita) | — |`{ y: [0,-5,0] }` | `duración:3.8, repetición:Infinito, facilidad:"easeInOut", retraso:1.2` |
| Tarjetas de área (escalonadas) | `{ opacity: 0, y: 20 }` | `{ opacity: 1, y: 0 }` | `staggerChildren: 0.10, duración: 0.55, facilidad:[0.22,1,0.36,1]` |
| Pasos del proceso | `{ opacity: 0, y: 24 }` | `{ opacity: 1, y: 0 }` | `staggerChildren: 0.12, duración: 0.6` |
| Acerca de la sección | `{ opacity: 0, x: -20 }` (izquierda) / `{ opacity: 0, x: 20 }` (derecha) | `{ opacity: 1, x: 0 }` | `duración: 0.7, facilidad:[0.22,1,0.36,1]` |
| Tarjetas de testimonios | `{ opacity: 0, y: 20 }` | `{ opacity: 1, y: 0 }` | `staggerChildren: 0.10, duración: 0.55` |
| Sección CTA | `{ opacity: 0, y: 30 }` | `{ opacity: 1, y: 0 }` | `duración: 0.7, facilidad:[0.22,1,0.36,1]` |

---

## 8. Comportamiento receptivo

### Escritorio (≥1024px)
- Hero: verdadera división lado a lado, izquierda 48% / derecha 52%, ambas con altura de ventana gráfica completa
- Cuadrícula de áreas: 2 columnas
- Pasos del proceso: 3 columnas horizontales
- Acerca de: 2 columnas (retrato + biografía)
- Testimonios: 3 columnas

### Tableta (768px–1023px)
- Héroe: el panel izquierdo ocupa el 55% del ancho, el derecho se reduce al 45%, la altura del héroe es 80vh mínimo
- Cuadrícula de áreas: 2 columnas
- Pasos del proceso: apilados verticalmente (línea de conexión) oculto)
- Acerca de: apilado (retrato arriba, biografía abajo), retrato limitado a 360 px de altura

### Móvil (<768px)
- Barra de navegación: menú de hamburguesas, superposición deslizable
- Héroe: la foto se convierte en fondo detrás del panel izquierdo; el panel izquierdo obtiene `background: hsl(var(--background))` con 90% de opacidad + `backdrop-blur-sm` en lugar del enfoque de gradiente CSS; altura de la foto 65vh
- Todas las cuadrículas: 1 columna
- Tarjeta de sesión gratuita: ancho completo en el móvil
- Tabla: envoltura de desplazamiento horizontal
- Pie de página: 1 columna apilada

---

## 9. Copia completa

### Navegación
Logotipo: `Terapia de claridad`
Enlaces: `Cómo trabajo` · `Áreas de soporte` · `Acerca de` · `Tarifas` · `Contacto`
CTA Botón: `Reservar sesión gratuita`

### Hero
Eceja: `TERAPIA INDIVIDUAL · LONDRES`
H1: `No tienes que resolver esto solo.`
Subtítulo: `Terapia individual para la ansiedad, el agotamiento, las relaciones y las transiciones de la vida.`
CTA principal:`Reservar sesión gratuita`
CTA secundaria: `Aprenda cómo trabajo →`
Etiqueta de la tarjeta: `PRIMERA SESIÓN GRATIS`
Cuerpo de la tarjeta: `Pruebe una sesión introductoria de 50 minutos sin costo, sin compromiso.`
Enlace de la tarjeta: `Reserve su sesión gratuita →`

### Áreas de apoyo
Etiqueta de sección: `ÁREAS DE APOYO`
H2: `Lo que podemos superar juntos`

**Ansiedad y estrés:** Preocupación persistente, pánico, agobio: estos no son defectos de carácter. Juntos encontraremos lo que impulsa su ansiedad y construiremos estrategias duraderas para recuperar su calma.

**Dificultades en las relaciones:** Ya sean fallas de comunicación, problemas de confianza o patrones que se repiten, la terapia puede ayudarlo a comprender lo que aporta a sus relaciones y cambiarlo.

**Agotamiento y transiciones de vida:** Cambio de carrera, pérdida de identidad, agotamiento que el sueño no soluciona: trabajo con personas navegando por los espacios intermedios donde los mapas antiguos ya no se aplican.

**Duelo y pérdida:** El duelo no se desarrolla en una línea de tiempo y no se trata solo de la muerte. Ya sea que estés de luto por una persona, una relación o una versión de ti mismo, este es un espacio para sentirlo plenamente.

### Cómo funcionan las sesiones
Etiqueta de sección: `EL PROCESO`
H2: `Simple, estructurado y a tu ritmo`

Paso 01: `Reserve un Llamada de 20 minutos: comenzamos con una llamada telefónica relajada y sin compromiso. Compartes lo que te trajo aquí; Te explico cómo trabajo. Sin formularios, sin presiones, solo una conversación.
Paso 02: "Nos reunimos semanalmente": las sesiones duran 50 minutos y se llevan a cabo semanalmente, en persona en el centro de Londres o mediante video seguro. Avanzamos a su ritmo, construyendo un espacio consistente que sea completamente suyo.
Paso 03: "Usted construye herramientas que duran": la terapia no es para siempre. El objetivo es brindarle marcos, conocimientos y habilidades que duren más que nuestras sesiones, para que salga más resiliente de lo que llegó.

### Acerca de
Etiqueta de sección: `ACERCA DE SU TERAPEUTA`
H2: `Dr. Sarah Holloway`

Para 1: He sido terapeuta durante más de diez años, y en ese tiempo me he enfrentado a muchos tipos diferentes de dolor: ansiedad que no se calma, relaciones que se han perdido.su hilo conductor, vidas que de alguna manera se sienten fuera de curso. Lo que he aprendido es que lo más importante no es la técnica ni la teoría. Es sentirse genuinamente escuchado.

Párrafo 2: Mi enfoque se basa en principios psicodinámicos, TCC y, cuando corresponda, EMDR para el trauma. Pero, sobre todo, creo en la relación que construimos juntos. Soy cálida, directa y no hago falso optimismo. Si está listo para hacer el trabajo, estaré allí con usted.

Credenciales: `BACP Accredited` · `PG Dip Counselling` · `10+ Years Practice` · `EMDR Training` · `CBT Practitioner`

### Tarifas
Etiqueta de sección: `FEES`
H2: `Precios transparentes, sin sorpresas`
Subtexto: Todas las sesiones se llevan a cabo de forma confidencial. No trabajo directamente con paneles de seguros, pero puedo proporcionar recibos de reembolso.

| Sesión | Duración | Precio |
|---|---|---|
| Llamada introductoria gratuita | 20 minutos | GRATIS |
| Sesión Individual | 50 minutos | 80€ |
| Sesión de Parejas/Relaciones | 50 minutos | 100€ |
| Escala móvil (bajos ingresos) | 50 minutos | Desde £55 |

Nota: Los espacios de escala móvil son limitados, pero creo que el costo no debería ser una barrera para obtener soporte. Comuníquese con nosotros y encontraremos algo que funcione para su situación.

### Testimonios
Etiqueta de sección: `LO QUE DICEN LOS CLIENTES`
H2: `Palabras de las personas con las que trabajo`

Cita 1: "Había probado la terapia dos veces antes y nunca la mantuve. Con Sarah, algo "Hice clic desde la segunda sesión. Ella tiene esta forma de reflejar las cosas que te hace verte a ti mismo sin juzgarte. Seis meses después, mi relación con la ansiedad es realmente diferente". — Anónimo, 34

Cita 2: "Después de mi agotamiento, sinceramente, no pensé que volvería a trabajar. La terapia de claridad no solo me ayudó a recuperarme, sino que me ayudó a descubrir por qué había terminado allí en primer lugar. Esa es la parte que lo cambió todo". — Anónimo, 41

Cita 3: "El dolor después de que mi matrimonio terminó no se parecía a nada que esperaba. No quería consejos ni ejercicios; necesitaba que alguien simplemente se sentara conmigo. Sarah lo hizo y finalmente me ayudó.encontrar mi salida. Estoy realmente agradecido." — Anónimo, 29

### Reserva CTA
Etiqueta de sección: `DÉ EL PRIMER PASO`
H2: `¿Listo para comenzar?`
Cuerpo: Su primera sesión es completamente gratuita. Sin compromiso, sin papeleo, sin presión, solo una conversacion.
Marcador de posición de entrada: `Su dirección de correo electrónico`
Botón: `Reservar sesión gratuita`
Nota de enlace: `O envíe un correo electrónico directamente: hello@claritytherapy.co.uk`

### Pie de página
Etiqueta: una práctica cálida y privada para personas que enfrentan la ansiedad, el agotamiento y las temporadas más difíciles de la vida.

Encabezados de columnas: `PRÁCTICA` / `CONTACTO`

Enlaces de práctica: Cómo trabajo · Áreas de apoyo · Tarifas · Reservar una sesión · Privacidad y confidencialidad

Contacto: Clarity Therapy · 24 Harley Mews, Londres W1G 9PQ · hello@claritytherapy.co.uk · +44 (0)20 7946 0823 · Lun–Vie: 8am–7pm · Sábado: 9am–1pm

Barra inferior: © 2025 Clarity Therapy · Todos los derechos reservados. 000000

---

## 10. Dependencias clave

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "@radix-ui/react-slot": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "latest",
    "postcss": "latest"
  }
}
```

**componentes shadcn/ui para instalar:**
```bash
npx shadcn@latest add button input badge card
```

**Adiciones de configuración de Tailwind:**
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      sand: 'hsl(var(--sand))',
      surface: 'hsl(var(--surface))',
    },
    fontFamily: {
      serif: ['"DM Serif Display"', 'serif'],
      sans: ['"Plus Jakarta Sans"', 'sans-serif'],
    },
  },
}
```
