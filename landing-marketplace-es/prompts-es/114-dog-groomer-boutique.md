# Mensaje del sitio web de peluquería canina — Pawhouse Studio
# websiteprompts.ai

Cree un sitio web completo y listo para producción de un estudio boutique de peluquería canina llamado **Pawhouse Studio** utilizando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react. El ambiente es cálido, alegre y artesanal: este es un querido estudio de peluquería del vecindario, no una cadena. Piense en una panadería ilustrada a mano y un cuidado premium para mascotas.

---

## 1. Declaración de objetivos

Crear un sitio web boutique de peluquería canina que comunique profesionalismo, calidez y cuidado genuino, convirtiendo a los dueños de perros en reservas a través de señales de confianza, paquetes transparentes y alegría. fotografía.

---

## 2. Tech Stack

- **Framework:** React + Vite + TypeScript
- **Estilo:** Tailwind CSS (JIT, tema extendido con propiedades personalizadas de CSS)
- **Animación:** Framer Motion (importar como `motion` desde `motion/react`)
- **Componentes:** shadcn/ui (Botón, Entrada, Insignia, Tarjeta)
- **Iconos:** lucide-react
- **Fuentes:** Google Fonts (Fraunces + Plus Jakarta Sans)

---

## 3. Sistema de diseño

```css
:root {
  /* Backgrounds */
  --background: 40 38% 98%;          /* warm cream #fdfaf5 */
  --surface: 38 28% 95%;             /* warm off-white #f5f0e8 */
  --surface-warm: 35 40% 92%;        /* warm biscuit #ede4d4 */

  /* Foregrounds */
  --foreground: 28 22% 16%;          /* rich warm brown #302519 */
  --foreground-muted: 28 14% 48%;    /* mid warm brown #7e6e5c */

  /* Primary — deep teal */
  --primary: 164 59% 26%;            /* #1a6b5a */
  --primary-light: 164 42% 38%;      /* #358a74 */
  --primary-foreground: 0 0% 100%;

  /* Secondary — warm terracotta */
  --terracotta: 17 52% 53%;          /* #c4704a */
  --terracotta-light: 17 48% 68%;    /* #d9997a */
  --terracotta-foreground: 0 0% 100%;

  /* Accents */
  --cream: 40 38% 98%;               /* matches background */
  --warm-white: 42 25% 96%;

  /* Borders */
  --border: 36 22% 82%;              /* #d9cfbf */
  --border-muted: 36 15% 90%;        /* #ece8e0 */

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
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400;1,9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```

### Uso
| Elemento | Fuente | Peso | Estilo | Tamaño | Altura de línea |
|---|---|---|---|---|---|
| Pantalla H1 | Frases | 700 | cursiva | clamp(40px, 5.8vw, 100px) | 1.05 |
| Sección H2 | Frases | 700 | cursiva | clamp(30px, 4vw, 60px) | 1.12 |
| Tarjetas/Nombres H3 | Frases | 700 | cursiva | clamp(20px, 2.2vw, 28px) | 1.25 |
| Nombres de paquetes | Frases | 700 | cursiva | 22px | 1.2 |
| Texto de cita | Frases | 400 | cursiva | 17 píxeles | 1.8 |
| Texto del cuerpo | Plus Yakarta Sans | 400 | normales | 16px | 1.75 |
| Cuerpo pequeño | Plus Yakarta Sans | 400 | normales | 14px | 1.7 |
| Etiqueta | Plus Yakarta Sans | 700 | normales | 11px, espacio entre letras 0,14em | 1 |
| Elementos de navegación | Plus Yakarta Sans | 500 | normales | 14 píxeles | 1|
| Botón | Plus Yakarta Sans | 600 | normales | 14px, espacio entre letras 0,04em | 1 |
| Ficha de precio | Plus Yakarta Sans | 700 | normales | 15px | 1 |

---

## 5. Efectos visuales

### Efecto 1: Superposición de degradado del héroe
A La superposición de degradado anclada a la izquierda se ubica "z-10" sobre el panel de fotografía del héroe, manteniendo siempre la columna de contenido legible:
```css
background: linear-gradient(
  to right,
  hsl(40, 38%, 98%) 0%,
  hsl(40, 38%, 98%) 38%,
  hsla(40, 38%, 98%, 0.95) 52%,
  hsla(40, 38%, 98%, 0.70) 65%,
  hsla(40, 38%, 98%, 0.20) 80%,
  transparent 100%
);
```
El gradiente es una `posición: inserción absoluta-0` div dentro del contenedor relativo del héroe, no en la imagen en sí.

### Efecto 2 — Marca de agua de fondo "PAW"
A La gran marca de agua tipográfica se encuentra en la mitad derecha del héroe, detrás del photo:
```jsx
<div
  aria-hidden="true"
  className="absolute right-0 bottom-0 pointer-events-none select-none z-0"
  style={{
    fontFamily: '"Fraunces", serif',
    fontWeight: 700,
    fontStyle: 'italic',
    fontSize: 'clamp(220px, 32vw, 480px)',
    lineHeight: 0.85,
    color: 'hsl(var(--primary))',
    opacity: 0.025,
    letterSpacing: '-0.04em',
    transform: 'translateY(20%)',
    userSelect: 'none',
  }}
>
  PAW
</div>
```

### Efecto 3: Tarjeta de disponibilidad flotante "Reserva un novio"
A pequeña tarjeta debajo de las CTA principales que simula la disponibilidad en vivo. Entrada de resorte y luego flotación suave permanente:
```jsx
// Entry animation
initial={{ opacity: 0, scale: 0.90, y: 12 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.5 }}

// Permanent float (wrap in second motion.div)
animate={{ y: [0, -6, 0] }}
transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
```

### Efecto 4: Escala de imagen de galería al pasar el cursor
Eda escala de imagen de la galería aumenta suavemente al pasar el mouse usando transformaciones CSS:
```css
.gallery-img { transition: transform 0.32s cubic-bezier(0.22,1,0.36,1); }
.gallery-img:hover { transform: scale(1.042); }
```
Las imágenes están dentro de un `overflow: contenedor oculto para que la escala se recorte limpiamente.

### Efecto 5: Tarjeta de paquete con borde izquierdo verde azulado al pasar el mouse
Las tarjetas de paquete cambian su borde izquierdo de transparente a verde azulado al pasar el mouse con un sombra:
```css
border-left: 3px solid transparent;
transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
```
Hover:
```css
border-left-color: hsl(164, 59%, 26%);
box-shadow: 0 6px 32px hsla(164, 59%, 26%, 0.12);
transform: translateY(-2px);
```

---

## 6. Desglose de componentes

### Sección 1 — Navbar

```
Layout: fixed top-0, w-full, z-50, h-16
Background: hsl(var(--background)) at 95% opacity, backdrop-blur-sm
Bottom border: 1px solid hsl(var(--border-muted))
Padding: px-6 md:px-12 lg:px-20
```

**Izquierda:** Logotipo: ícono de huella (lucide `PawPrint`, 18px, verde azulado) seguido de "Pawhouse" en Fraunces 700 cursiva 20px, primer plano, luego "Studio" en Plus Jakarta Sans 400 20px, primer plano silenciado. Espacio: 6 píxeles entre el icono y el texto.

**Centro (escritorio):** `Servicios` / `Acerca de` / `Galería` / `Preguntas frecuentes` — Además de Jakarta Sans 500, 14 px, color hsl(var(--foreground-muted)), desplazamiento: hsl(var(--foreground)), espacio: 36px.

**Derecha:** Botón `Reservar ahora` — `background: hsl(var(--primary))`, blanco, Plus Jakarta Sans 600, 13 px, espacio entre letras 0,04 em, relleno `10 px 22 px`, radio de borde: 0, desplazamiento: `background: hsl(var(--primary-light))`, transición 0,2 s.

**Móvil:** Hamburguesa (lucide `Menú`), deslizar hacia abajo en todo su anchocajón.

---

### Sección 2: Hero

```
Layout: relative, min-h-screen, overflow-hidden
Background photo: position absolute inset-0 w-full h-full object-cover object-center z-0
```

```jsx
{/* Image: Freshly groomed golden retriever or cream-coloured poodle looking directly into camera. Professional studio photography — warm, slightly elevated lighting, neutral warm cream background, the dog is clearly happy and impeccably groomed. Fluffy, clean coat. Shot at eye level, shallow depth of field, 85mm equivalent. Fills the right two-thirds of the frame. */}
<img
  src=""
  alt="Freshly groomed fluffy dog at Pawhouse Studio — happy, clean, looking at camera"
  className="w-full h-full object-cover object-center absolute inset-0"
  style={{ zIndex: 0 }}
/>
```

**Marca de agua PAW** (ver Efecto 2: se encuentra detrás de la foto, índice z: 0, visible a través de los bordes de la foto)

**Superposición de degradado** (Efecto 1: posición: inserción absoluta-0, índice z: 2):
El degradado de izquierda a derecha garantiza que la columna de contenido sea siempre legible.

**Columna de contenido** (posición: relativa, índice z: 10, izquierda lado):
```
width: 50% on desktop (min-width: 520px, max-width: 620px)
padding: pl-6 md:pl-12 lg:pl-20, pt-28 pb-20
display: flex flex-col justify-center min-h-screen
```

Contenido (de arriba a abajo):

1. **Ceja:** "BOUTIQUE DOG GROOMING · BRISTOL" — Plus Jakarta Sans 700, 11 px, espacio entre letras 0,14 em, `color: hsl(var(--terracotta))`, margen inferior 20 px. Movimiento: `initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.45,delay:0.1}}`

2. **H1:** "Tu perro merece sentirse lo mejor posible". — Fraunces 700 cursiva, `clamp(40px,5.8vw,100px)`, altura de línea 1,05, `color: hsl(var(--foreground))`, ancho máximo 540 px. Movimiento: `transition={{duration:0.65,delay:0.2,ease:[0.22,1,0.36,1]}}`

3. **Subtítulo:** "Peluquería profesional para perros de todas las razas, en un estudio tranquilo donde se atiende a un perro a la vez, donde la comodidad de su mascota siempre es lo primero". — Además de Jakarta Sans 300, `clamp(16px,1.3vw,19px)`, altura de línea 1,7, `color: hsl(var(--foreground-muted))`, ancho máximo 440 px, margen superior 20 px. Movimiento: `transition={{duration:0.55,delay:0.35}}`

4. **fila de CTA** (margen superior 32 px, espacio flexible-4, envoltura flexible):
 - Principal: "Reserva un novio" - `background: hsl(var(--primary))`, blanco, Plus Jakarta Sans 600, 15 px, relleno `14 px 28 px`, radio de borde: 0, desplazamiento sobre `background: hsl(var(--primary-light))`
 - Secundario: "Ver nuestros paquetes →": sin fondo, borde inferior `1px solid hsl(var(--terracotta))`, `color: hsl(var(--terracotta))`, Plus Jakarta Sans 500, 15px
 Motion: `transition={{duration:0.5,delay:0.45}}`

5. **Tarjeta de disponibilidad** (margen superior 40 px, efecto 3): 
 ```
   background: hsl(var(--background))
   border: 1px solid hsl(var(--border))
   border-left: 4px solid hsl(var(--primary))
   padding: 18px 22px
   max-width: 340px
   border-radius: 0
   ```
 - Fila superior: `RESERVAR UN NOVIO` — Además de Jakarta Sans 700, 10 px, espacio entre letras 0,16 em, `color: hsl(var(--primary))`, margen inferior 10px
 - Línea de tragamonedas: "Próximo disponible: jueves 14 de noviembre · 10:00 a. m." — Plus Jakarta Sans 600, 14px, `color: hsl(var(--foreground))`, flex items-center gap-2 con ícono de Lucide `Calendario` 14px verde azulado
 - Línea de urgencia: "Quedan 2 lugares esta semana" — Plus Jakarta Sans 500, 13px, `color: hsl(var(--terracotta))`, margen superior 6px
 - Enlace CTA: "Reservar en línea →" — Plus Jakarta Sans 600, 14px, `color: hsl(var(--primary))`, borde inferior `1px solid hsl(var(--primary))`, margen superior 14px, opacidad al pasar el cursor 0.75

---

### Sección 3— Paquetes de aseo

```
Section: py-24 md:py-32, background: hsl(var(--background))
Container: max-w-5xl mx-auto px-6 md:px-12
```

**Bloque de encabezado** (margen inferior 56px):
- Etiqueta: "NUESTROS SERVICIOS" — Plus Jakarta Sans 700, 11px, espacio entre letras 0,14em, `color: hsl(var(--terracotta))`, margen inferior 12px
- H2: "Encuentre el novio adecuado para su perro" - Fraunces 700 cursiva, `clamp(30px,4vw,56px)`
- Subtexto: "Cada sesión es individual. Sin jaulas, sin prisas, solo preocúpese". — Plus Jakarta Sans 300, 17px, `color: hsl(var(--foreground-muted))`, margin-top 12px

**4-card grid:** `grid grid-cols-1 sm:grid-cols-2 gap-6`

Each tarjeta:
```
background: hsl(var(--surface))
border-left: 3px solid transparent
padding: 28px 28px 24px
transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease
hover: border-left-color hsl(var(--primary)), box-shadow 0 6px 32px hsla(164,59%,26%,0.12), translateY(-2px)
```

Estructura de la tarjeta:
```
Top row: Price chip (right-aligned) + Package name (left)
Price chip: background hsl(var(--terracotta)), white, Plus Jakarta Sans 700, 14px, padding 4px 12px, border-radius 0
Package name: Fraunces 700 italic, 22px, color hsl(var(--foreground))

Duration/category: Plus Jakarta Sans 600, 11px, letter-spacing 0.10em, color hsl(var(--primary)), margin-top 6px

Divider: border-top 1px solid hsl(var(--border-muted)), margin: 18px 0

Includes list: checkmark (✓) items in Plus Jakarta Sans 400, 14px, color hsl(var(--foreground-muted)), line-height 2
```

**Paquetes:**

**Paquete 1 — The Tidy**
Precio: £35
Duración: 1 hora · Razas pequeñas
Incluye: ✓ Baño y secador · ✓ Cepillado · ✓ Recorte de uñas · ✓ Limpieza de oídos · ✓ Spritz y acabado

**Paquete 2 — El novio completo**
Precio: £55
Duración: 1,5 horas · Todas las razas
Incluye: ✓ Corte completo con tijera · ✓ Baño y secador · ✓ Cepillado · ✓ Corte y lima de uñas · ✓ Limpieza de oídos · ✓ Spritz y bandana
Chip de nota: `MÁS POPULAR` — Además de Jakarta Sans 800, 9px, espacio entre letras 0,16em, `background: hsl(var(--primary))`, blanco, relleno 3px 10px, ubicado en la parte superior derecha del encabezado de la tarjeta

**Paquete 3 — The Mimos**
Precio: £75
Duración: 2 horas · Todas las razas
Incluye: ✓ Aseo completo · ✓ Cepillado de dientes · ✓ Facial de arándanos · ✓ Mascarilla acondicionadora profunda · ✓ Corte, lima y pulido de uñas · ✓ Bálsamo para patas · ✓ Bandana o lazo

**Paquete 4 — The Puppy First**
Precio: £30
Duración: 45 min · Cachorros menores de 12 meses
Incluye: ✓ Baño introductorio · ✓ Cepillo suave · ✓ Recorte de uñas · ✓ Recompensa positiva por el cuidado · ✓ Certificado de finalización
Chip de nota: `PUPPY SPECIAL` — fondo terracota

**Animación escalonada (Framer Movimiento):**
```jsx
<motion.div
  variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-60px" }}
>
  {packages.map(pkg => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } }
      }}
    />
  ))}
</motion.div>
```

---

### Sección 4: Por qué Pawhouse

```
Section: py-20 md:py-28, background: hsl(var(--primary))
Container: max-w-5xl mx-auto px-6 md:px-12
```

**Encabezado** (centrado, blanco, margen inferior 48px):
- Etiqueta: "POR QUÉ ELEGIRNOS" — Plus Jakarta Sans 700, 11px, espacio entre letras 0,14 em, `color: hsla(0,0%,100%,0.55)`, margen inferior 12px
- H2: "Grooming Done Differently" — Fraunces 700 cursiva, `clamp(28px,3.5vw,52px)`,blanco

**4 puntos de confianza:** `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8`

Cada punto de confianza:
```
text-align: center
padding: 8px 16px
```
- Icono: lucide, 32px, `color: hsl(var(--terracotta-light))`, ancho de trazo 1,5, margen inferior 16 px, centrado
- Encabezado: Plus Jakarta Sans 700, 16 px, blanco, margen inferior 8 px
- Texto: Plus Jakarta Sans 300, 14 px, altura de línea 1,7, `color: hsla(0,0%,100%,0.65)`

**Puntos de confianza:**

1. Icono: `Shield` - "Certificado sin miedo": todos los peluqueros de Pawhouse tienen una certificación sin miedo. Leemos el lenguaje corporal, vamos al ritmo de tu perro y nos detenemos si es necesario.

2. Icono: `Usuario` - "Un perro a la vez": nunca compartimos nuestro estudio con varios perros simultáneamente. Tu perro tiene toda nuestra atención, en un espacio tranquilo y sin estrés.

3. Icono: `Leaf` - "Natural y no tóxico": todos los champús, acondicionadores y productos que utilizamos no contienen parabenos ni sulfatos y son seguros para la piel sensible.

4. Ícono: `Premio` — "Más de 20 razas cuidadas": desde perros pastores malteses hasta perros pastores ingleses antiguos, tenemos experiencia con más de 20 razas y en crecimiento, incluidos garabatos y capas dobles.

**WhileInView stagger:** `staggerChildren: 0.10`, `y: 24→0`, `opacity: 0→1`, `duration: 0.55`

---

### Sección 5: Los peluqueros

```
Section: py-24 md:py-32, background: hsl(var(--background))
Container: max-w-5xl mx-auto px-6 md:px-12
```

**Bloque de encabezado** (margen inferior 56px):
- Etiqueta: "CONOCE AL EQUIPO" - Más Jakarta Sans 700, 11 px, espacio entre letras 0,14 em, `color: hsl(var(--terracotta))`, margen inferior 12 px
- H2: "Personas que aman genuinamente a los perros" — Fraunces 700 cursiva, `clamp(28px,3.5vw,52px)`

**3-card grid:** `grid grid-cols-1 md:grid-cols-3 gap-8`

Cada tarjeta de peluquero:
```
background: hsl(var(--surface))
overflow: hidden
```

Área de fotografía:
```
aspect-ratio: 3/4
overflow: hidden
```
```jsx
{/* Groomer 1 image: Female dog groomer in her mid-30s, smiling warmly, holding a fluffy poodle-mix. Light apron over a casual cotton top. Warm studio photography, shallow depth of field, soft cream/neutral background. Hair pulled back, approachable and professional expression. */}
<img src="" alt="Emma — Pawhouse Studio dog groomer" className="w-full h-full object-cover object-center" />
```

Card contenido (relleno: 22px):
- Nombre: Fraunces 700 cursiva, 20px, margen inferior 6px
- Años: Plus Jakarta Sans 400, 13px, `color: hsl(var(--foreground-muted))`
- Chip especial: `background: hsl(var(--surface-warm))`, `color: hsl(var(--primary))`, Plus Jakarta Sans 700, 10 px, espacio entre letras 0,10 em, relleno 4 px 12 px, margen superior 14 px, radio del borde 0
- Breve biografía: Plus Jakarta Sans 400, 14 px, altura de línea 1,7, `color: hsl(var(--foreground-muted))`, margen superior 12px

**Peluqueros:**

**EmmaClarke**
8 años de experiencia
Chip de especialidad: `DOODLES & POODLES`
Bio: Emma se formó en la Asociación Británica de Peluqueros Caninos y tiene un amor especial por los pelajes rizados y ondulados. Ella es la razón por la que la mitad de nuestros clientes de doodle no irán a ningún otro lugar.

**Jack Santos**
5 años de experiencia
Chip de especialidad: `TERRIERS & SPANIELS`
Bio: Jack llegó a la peluquería después de una carrera trabajando con perros de rescate. Su paciencia y presencia tranquila lo hacen brillante con perros nerviosos o reactivos.

**Priya Mehta**
3 años de experiencia
Chip de especialidad: `PELAJE DOBLE Y RAZAS GRANDES`
Bio: Priya trata a nuestros clientes grandes y peludos (samoyedos, berneses, perros esquimales) con gentileza. eso le ha valido seguidores devotos de familias de razas numerosas.

---

### Sección 6 — Galería

```
Section: py-24 md:py-32, background: hsl(var(--surface))
Container: max-w-5xl mx-auto px-6 md:px-12
```

**Bloque de encabezado** (margen inferior 48px):
- Etiqueta: "THE WORK" — Plus Jakarta Sans 700, 11 px, espacio entre letras 0,14 em, `color: hsl(var(--terracotta))`, margen inferior 12 px
- H2: "Los resultados hablan por sí solos" — Fraunces 700 cursiva, `clamp(28px,3.5vw,52px)`, ancho máximo 440px

**Cuadrícula de 6 imágenes:** `grid grid-cols-2 md:grid-cols-3 gap-3`

Ecada celda:
```
aspect-ratio: 1/1
overflow: hidden
background: hsl(var(--surface-warm))
```

Each imagen:
```
transition: transform 0.32s cubic-bezier(0.22,1,0.36,1)
hover: scale(1.042)
```

```jsx
{/* Gallery image 1: Fluffy cream Bichon Frise freshly groomed — round head shape, white fluffy coat, bright eyes, sitting perfectly, warm studio photography */}
<img src="" alt="Bichon Frise after professional grooming at Pawhouse Studio" className="w-full h-full object-cover object-center" />

{/* Gallery image 2: Golden-brown Cockapoo with freshly scissored coat, slightly wavy, ear feathering trimmed neatly — warm natural light, photographed at eye level, bright happy expression */}
<img src="" alt="Cockapoo freshly groomed — wavy coat, neat trim" className="w-full h-full object-cover object-center" />

{/* Gallery image 3: Miniature Schnauzer showing classic breed cut — salt-and-pepper coat, tidy beard, alert expression. Clean white/cream studio background. */}
<img src="" alt="Miniature Schnauzer with classic breed cut, freshly groomed" className="w-full h-full object-cover object-center" />

{/* Gallery image 4: Large Samoyed with brilliantly white fluffy coat, freshly washed and dried, coat standing full and clean, panting happily. Warm studio, soft shadow behind. */}
<img src="" alt="Samoyed with full fluffy white coat after professional grooming" className="w-full h-full object-cover object-center" />

{/* Gallery image 5: Chocolate Labradoodle with freshly scissored teddy-bear cut, wavy mid-length coat, bright eyes, head slightly tilted. Warm cream background, natural light. */}
<img src="" alt="Labradoodle teddy-bear cut at Pawhouse Studio" className="w-full h-full object-cover object-center" />

{/* Gallery image 6: Cavalier King Charles Spaniel with long silky ears, freshly groomed, coat lying sleek and shiny, gentle sweet expression looking slightly off-camera. Warm-toned photography. */}
<img src="" alt="Cavalier King Charles Spaniel freshly groomed, silky coat" className="w-full h-full object-cover object-center" />
```

**Galería tambalearse mientrasInView:**
```jsx
staggerChildren: 0.06
initial: { opacity: 0, scale: 0.97 }
visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } }
```

---

### Sección 7: Reseñas

```
Section: py-24 md:py-32, background: hsl(var(--background))
Container: max-w-5xl mx-auto px-6 md:px-12
```

**Bloque de encabezado** (centrado, margen inferior 56 px):
- Etiqueta: "RESEÑAS" — Además de Jakarta Sans 700, 11 px, espacio entre letras 0,14 em, `color: hsl(var(--terracotta))`, margen inferior 12px
- H2: "De padres de perros que saben" - Fraunces 700 cursiva, `clamp(28px,3.5vw,52px)`, centrado

**3-card grid:** `grid grid-cols-1 md:grid-cols-3 gap-6`

Each review tarjeta:
```
background: hsl(var(--surface))
border-left: 3px solid hsl(var(--terracotta))
padding: 28px 28px 24px
```

Estructura de la tarjeta:
- Estrellas: 5 × estrella rellena (lucide `Star`, 16px, relleno: `hsl(var(--terracotta))`, trazo: ninguno), espacio de fila flexible-1, margen inferior 20px
- Cita: Fraunces 400 cursiva, 16 píxeles, altura de línea 1,85, `color: hsl(var(--foreground))`, estilo de fuente cursiva
- Atribución: Plus Jakarta Sans 600, 12 píxeles, espacio entre letras 0,04 em, `color: hsl(var(--foreground-muted))`, margen superior20px

**Reseñas:**

**Reseña 1:**
Estrellas: ★★★★★
Cita: "Hemos probado con otros tres peluqueros y Bertie siempre regresaba estresado. En Pawhouse salió moviendo la cola y luciendo inmaculado. Emma sabía exactamente qué hacer con su abrigo garabateado. No iremos a ningún otro lugar". 
Atribución: — Dueño de Bertie, Clifton

**Reseña 2:**
Estrellas: ★★★★★
Cita: "Jack es increíble con nuestro rescate, que generalmente está ahí. Aterrorizado por nuevos lugares y personas, se tomó su tiempo, dejó que Biscuit marcara el ritmo y, al final, ella le dejó cepillarla sin problemas. Lloramos de camino a casa. ★★★★★
Cita: "El paquete Pamper para mi Samoyedo suena una locura, pero vale la pena. Priya maneja su pelaje como si hubiera nacido para hacerlo; el bálsamo facial de arándanos y el bálsamo para las patas son una ventaja que no esperaba que me importara. Huele increíble durante dos semanas".
Atribución: - Dueño de Mishka, Redland

---

### Sección 8 — Reserva CTA

```
Section: py-28 md:py-40
Background: hsl(var(--primary)) — deep teal #1a6b5a
Position: relative, overflow: hidden
```

Marca de agua decorativa: forma de huella de pata grande: use un ícono grande de Lucide `PawPrint` a 480 px, `posición: absoluta, derecha: -60 px, abajo: -60px, color: blanco, opacidad: 0.04, índice z: 0, eventos de puntero: ninguno`

Contenedor: `max-w-3xl mx-auto px-6 centro de texto relativo z-10`

- Etiqueta: "¿LISTO PARA RESERVAR?" — Plus Jakarta Sans 700, 11 px, espacio entre letras 0,14 em, `color: hsla(0,0%,100%,0.55)`, margen inferior 16 px
- H2: "Reserve el próximo novio de su perro" — Fraunces 700 cursiva, `clamp(36px,5vw,80px)`, blanco, altura de línea 1.08
- Subtexto: "Reservamos rápidamente: las plazas son limitadas y trabajamos con un perro a la vez. Asegure su plaza ahora". — Plus Jakarta Sans 300, `clamp(16px,1.3vw,20px)`, `color: hsla(0,0%,100%,0.72)`, margen superior 16 px, margen inferior 44 px, ancho máximo 480 px, mx-auto

**fila de botones CTA** (espacio flexible-4 justificar-centro flex-wrap):
```jsx
<button
  style={{
    background: 'hsl(var(--terracotta))',
    color: 'white',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: '15px',
    letterSpacing: '0.04em',
    padding: '16px 36px',
    borderRadius: '0',
    border: 'none',
    cursor: 'pointer',
  }}
>
  Book a Groom Online
</button>
<button
  style={{
    background: 'transparent',
    color: 'white',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 500,
    fontSize: '15px',
    padding: '16px 36px',
    borderRadius: '0',
    border: '1px solid hsla(255,255%,255%,0.35)',
    cursor: 'pointer',
  }}
>
  Call Us: 0117 946 2830
</button>
```

**WhileInView entrada:**
```jsx
initial={{ opacity: 0, y: 32 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
```

---

### Sección 9 — Pie de página

```
Section: py-16
Background: hsl(var(--foreground)) — warm near-black
```

**Cuadrícula de 3 columnas** (espacio-12 en el escritorio):

**Columna 1 — Marca:**
-Ícono `PawPrint` (16px, terracota claro) + "Pawhouse Studio" en Fraunces 700 cursiva 18px, blanco. Flex items-center gap-2.
- Lema: "Estudio boutique de peluquería canina de Bristol: un perro a la vez, siempre". — Plus Jakarta Sans 300, 14 px, altura de línea 1,75, `color: hsla(0,0%,100%,0.5)`, margen superior 12 px
- Insignias de confianza (flex gap-2, margen superior 20 px): `Fear-Free Certified` / `Miembro de BDGA` — Plus Jakarta Sans 700, 9 px, espacio entre letras 0,12 em, `border: 1px solid hsla(0,0%,100%,0.2)`, blanco con 50% de opacidad, relleno 4px 10px

**Columna 2: Estudio:**
Encabezado: "ESTUDIO" — Además de Jakarta Sans 700, 10px, espacio entre letras 0,14em, `color: hsl(var(--terracotta-light))`, margen inferior 16px
Enlaces (más Jakarta Sans 400, 14px, `color: hsla(0,0%,100%,0.55)`, blanco flotante, bloque, margen inferior 10px):
- Servicios y paquetes
- Conozca a los peluqueros
- Galería
- Perro Guía de raza
- Preguntas frecuentes
- Reserve un novio

**Columna 3: Encuéntrenos:**
Encabezado: "Encuéntrenos": el mismo estilo que el encabezado de la columna 2
Info (Plus Jakarta Sans 400, 14px, `color: hsla(0,0%,100%,0.55)`, altura de línea 1,8):
- Pawhouse Studio
- 12 Chandos Road
- Bristol BS6 6PG
- hello@pawhousestudio.co.uk
- 0117 946 2830
- Lun–Sáb: 8am–6pm · Dom: Cerrado

**Barra inferior** (borde superior: `1px solid hsla(0,0%,100%,0.08)`, margen superior 48px, relleno superior 24px, flexión entre, espacio de envoltura flexible-4):
- "© 2025 Pawhouse Studio. Todos los derechos reservados." — Plus Jakarta Sans 400, 13px, `color: hsla(0,0%,100%,0.4)`
- "Fear-Free Certified · BDGA Member" — mismo estilo, texto derecho

---

## 7. Animaciones — Referencia completa

| Elemento | Inicial | Animar/Mientras está en vista | Transición |
|---|---|---|---|
| Barra de navegación | `{ opacity:0, y:-8 }` | `{ opacity:1, y:0 }` | `duración:0.4, retraso:0.05` |
| Ceja de héroe | `{ opacity:0, y:12 }` | `{ opacity:1, y:0 }` | `duración:0,45, retraso:0,1` |
| Héroe H1 | `{ opacity:0, y:22 }` | `{ opacity:1, y:0 }` | `duración:0.65, retraso:0.2, facilidad:[0.22,1,0.36,1]` |
| Subtítulo de héroe | `{ opacity:0, y:16 }` | `{ opacity:1, y:0 }` | `duración:0,55, retraso:0,35` |
| CTA de héroe | `{ opacity:0, y:12 }` | `{ opacity:1, y:0 }` | `duración:0,5, retraso:0,45` |
| Tarjeta de disponibilidad |`{ opacity:0, scale:0.90, y:12 }` | `{ opacity:1, scale:1, y:0 }` | `tipo:"resorte", rigidez:200, amortiguación:22, retraso:0,5` |
| Tarjeta flotante (infinita) | — | `{ y:[0,-6,0] }` | `duración:4.2, repetición:Infinito, facilidad:"easeInOut", retraso:1.0` |
| Tarjetas de paquete | `{ opacity:0, y:20 }` | `{ opacity:1, y:0 }` | `staggerChildren:0.12, duración:0.55, facilidad:[0.22,1,0.36,1]` |
| Puntos de confianza | `{ opacity:0, y:24 }` | `{ opacity:1, y:0 }` | `staggerChildren:0.10, duración:0.55` |
| Tarjetas de peluquero | `{ opacity:0, y:20 }` | `{ opacity:1, y:0 }` | `staggerChildren:0.12, duración:0.6` |
| Imágenes de la galería | `{ opacity:0, scale:0.97 }` | `{ opacity:1, scale:1 }` | `staggerChildren:0.06, duración:0.45, facilidad:[0.22,1,0.36,1]` |
| Tarjetas de revisión | `{ opacity:0, y:20 }` | `{ opacity:1, y:0 }` | `staggerChildren:0.10, duración:0.55` |
| Reserva CTA | `{ opacity:0, y:32 }` | `{ opacity:1, y:0 }` | `duración:0.7, facilidad:[0.22,1,0.36,1]` |

---

## 8. Comportamiento receptivo

### Escritorio (≥1024px)
- Hero: vista completa, columna de contenido a la izquierda 50%, la foto llena la ventana gráfica completa detrás del gradiente
- Paquetes: cuadrícula de 2×2
- Puntos de confianza: 4 columnas horizontales
- Groomers: 3 columnas
- Galería: cuadrícula de 3×2
- Reseñas: 3 columnas

### Tableta (768px–1023px)
- Héroe: columna de contenido 58%, foto detrás, altura mínima del héroe 90vh
- Paquetes: 2 columnas
- Puntos de confianza: cuadrícula 2×2
- Groomers: 2 columnas (tercera tarjeta de ancho completo)
- Galería: cuadrícula 2×3
- Reseñas: apiladas (1 columna)

### Móvil (<768px)
- Barra de navegación: hamburguesa, superposición deslizable
- Héroe: foto se vuelve bg a 75vh con `hsl(var(--background))` con una superposición de opacidad del 88 % + fondo desenfocado en el área de contenido; el contenido es de ancho completo, con relleno a la izquierda
- Todas las cuadrículas: 1 columna (paquetes de 2 columnas aún si hay espacio)
- Tarjeta de disponibilidad: ancho completo
- Marca de agua PAW: oculta en el móvil (distrae demasiado)
- Botones de CTA: apilados ancho completo
- Pie de página: 1 columna apilada

---

## 9. Copia completa

### Navegación
Logotipo: `Pawhouse Studio` (con icono de PawPrint)
Enlaces: `Servicios` · `Acerca de` · `Galería` · `Preguntas frecuentes`
CTA: `Reservar ahora`

###Hero
Eceja: `BOUTIQUE DOG GROOMING · BRISTOL`
H1: `Su perro merece sentirse lo mejor posible.`
Subtítulo: `Peluquería profesional para perros de todas las razas, en un estudio tranquilo en el que solo se puede trabajar un perro a la vez, donde siempre está la comodidad de su mascota primero.`
CTA principal: `Reservar un novio`
CTA secundaria: `Ver nuestros paquetes →`
Etiqueta de tarjeta: `RESERVAR UN NOVIO`
Slot: `Próximo disponible: jueves 14 de noviembre · 10:00 am`
Urgencia: `Quedan 2 lugares esta semana`
Enlace de tarjeta: `Reserve en línea →`

### Paquetes
Etiqueta de sección: `NUESTROS SERVICIOS`
H2: `Encuentre el novio adecuado para su perro`
Subtexto: Cada sesión es individual. Sin jaulas, sin prisas, solo atención.

Paquete 1 — The Tidy — £35 — 1 hora · Razas pequeñas
Incluye: Baño y secador · Cepillado · Corte de uñas · Limpieza de orejas · Spritz y acabado

Paquete 2 — The Full Groom — £55 — 1,5 horas · Todas las razas · MOST POPULAR
Incluye: Corte completo con tijera · Baño y secador · Cepillado · Corte y lima de uñas · Limpieza de oídos · Spritz y bandana

Paquete 3 — The Pamper — £75 — 2 horas · Todas las razas
Incluye: Peluquería completa · Cepillado de dientes · Facial de arándanos · Mascarilla acondicionadora profunda · Corte, lima y pulido de uñas · Bálsamo para patas · Bandana o lazo

Paquete 4 — The Puppy First — £30 — 45 min · Cachorros menores de 12 meses · PUPPY SPECIAL
Incluye: Baño introductorio · Cepillo suave · Corte de uñas · Aseo de recompensa positiva · Certificado de finalización

### Por qué Pawhouse
Sección etiqueta: `POR QUÉ ELEGIRNOS`
H2: `Grooming Done Differently`

Certificado sin miedo: Todos los peluqueros de Pawhouse tienen una certificación sin miedo. Leemos el lenguaje corporal, vamos al ritmo de su perro y nos detenemos si es necesario.
Un perro a la vez: nunca compartimos nuestro estudio con varios perros simultáneamente. Su perro tiene toda nuestra atención, en un espacio tranquilo y libre de estrés.
Natural y no tóxico: cada champú, acondicionador y producto que utilizamos no contiene parabenos ni sulfatos y es seguro para la piel sensible.
20+ Razas cuidadas: desde perros pastores malteses hasta perros pastores ingleses antiguos, tenemos experiencia con más de 20 razas, incluidas garabatos y perros dobles.coats.

### The Groomers
Etiqueta de sección: `CONOCE AL EQUIPO`
H2: `Personas que aman genuinamente a los perros`

Emma Clarke — 8 años de experiencia — DOODLES & POODLES
Emma se formó en la Asociación Británica de Peluqueros Caninos y tiene una amor especial por los abrigos rizados y ondulados. Ella es la razón por la que la mitad de nuestros clientes de garabatos no van a ningún otro lugar.

Jack Santos — 5 años de experiencia — TERRIERS & SPANIELS
Jack llegó a la peluquería después de una carrera trabajando con perros de rescate. Su paciencia y presencia tranquila lo hacen brillante con perros nerviosos o reactivos.

Priya Mehta — 3 años de experiencia — PELAJES DOBLES Y RAZAS GRANDES
Priya trata a nuestros clientes grandes y peludos — Samoyedos, Berneses, Huskies — con una gentileza que le ha valido seguidores devotos de familias de razas grandes.

### Galería
Etiqueta de sección: `EL TRABAJO`
H2: `Los resultados hablan por sí mismos`

### Reseñas
Etiqueta de sección: `RESEÑAS`
H2: `De padres de perros que saben`

Revisión 1: "Hemos probado con otros tres peluqueros y Bertie siempre regresaba estresado. En Pawhouse salió moviendo la cola y luciendo inmaculado. Emma sabía exactamente qué hacer con su abrigo. No iremos a ningún otro lado". — Propietario de Bertie, Clifton

Revisión 2: "Jack es increíble con nuestro rescate, quien generalmente está aterrorizado por los lugares y las personas nuevos. Se tomó su tiempo, dejó que Biscuit marcara el ritmo y, al final, ella le dejó cepillarla sin problemas. Lloramos en el camino a casa. De verdad". — Propietario de Biscuit, Cotham

Revisión 3: "El paquete Pamper para mi Samoyedo parece una locura, pero vale la pena. Priya maneja su pelaje como si hubiera nacido para hacerlo; el tratamiento facial de arándanos y el bálsamo para las patas son una ventaja que no esperaba que me importara. Huele increíble durante dos semanas". — Propietario de Mishka, Redland

### Reserva CTA
Etiqueta de sección: `¿LISTO PARA RESERVAR?`
H2: `Reserve el próximo novio de su perro`
Cuerpo: Reservamos rápidamente; las plazas son limitadas y trabajamos con un perro a la vez. Asegure su espacio ahora.
CTA principal: `Reserve un novio en línea`
CTA secundaria: `Llámenos: 0117 946 2830`

### Pie de página
Etiqueta:El estudio boutique de peluquería canina de Bristol: un perro a la vez, siempre.
Insignias de confianza: `Fear-Free Certified` · `BDGA Member`

Encabezado de columna: `STUDIO`
Enlaces: Servicios y paquetes · Conozca a los peluqueros · Galería · Guía de razas de perros · Preguntas frecuentes · Reserve un Novio

Encabezado de columna: `ENCUÉNTRANOS`
Info: Pawhouse Studio · 12 Chandos Road · Bristol BS6 6PG · hello@pawhousestudio.co.uk · 0117 946 2830 · Lunes a sábado: 8 a.m. a 6 p.m. · Dom: Cerrado

Barra inferior: © 2025 Estudio Pawhouse. Reservados todos los derechos. · Certificado sin miedo · Miembro de BDGA

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

**shadcn/ui componentes:**
```bash
npx shadcn@latest add button input badge card
```

**Adiciones de configuración de Tailwind:**
```js
theme: {
  extend: {
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      terracotta: 'hsl(var(--terracotta))',
      surface: 'hsl(var(--surface))',
    },
    fontFamily: {
      display: ['"Fraunces"', 'serif'],
      sans: ['"Plus Jakarta Sans"', 'sans-serif'],
    },
  },
}
```
