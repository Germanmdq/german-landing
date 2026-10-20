# Sitio web de nutricionista y asesor de salud
# websiteprompts.ai

---

Cree un sitio web completo de nutricionista y asesor de salud para **Clara Bloom**, una nutricionista certificada y asesora de bienestar. Base blanca limpia, acento verde fresco, diseño de héroe dividido. Profesional y cálido: esta es una práctica personal, no una clínica. El diseño debe parecerse al de la propia nutricionista: seguro, accesible y basado en la ciencia. Piense en una marca de salud moderna cruzada con el sitio de un entrenador personal: ni un hospital, ni un influencer de bienestar.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 0 0% 100%;              /* #ffffff white */
  --surface: 120 20% 97%;               /* #f6faf5 green-tint surface */
  --surface-raised: 120 16% 94%;        /* #edf5ec slightly deeper */
  --border: 120 14% 86%;                /* #dce8dc green-tinted border */
  --foreground: 123 20% 7%;             /* #0c170c deep green-black */
  --muted-foreground: 122 7% 45%;       /* #6b7d6b muted green-grey */
  --subtle: 120 6% 68%;                 /* #a8b4a8 subtle */
  --primary: 140 55% 38%;               /* #2d9a4e fresh green */
  --primary-dark: 140 61% 29%;          /* #1e7a3c dark green hover */
  --primary-light: 140 50% 93%;         /* #edf7ed green tint bg */
  --primary-muted: 140 36% 78%;         /* #a8d4b4 green border */
  --dark-green: 124 32% 9%;             /* #0c1f0e hero dark bg */
  --dark-surface: 124 28% 12%;          /* #122018 dark card */
  --dark-border: 124 22% 19%;           /* #243028 dark border */
  --white: 0 0% 100%;
}
```

---

## Tipografía

Importar: `https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap`

- **Pantalla / H1–H2**: Sora 800, espaciado entre letras -0,04 em, altura de línea 1,06–1,10
- **Subtítulos/H3**: Sora 700, espaciado entre letras -0.02em
- **Cuerpo/UI**: Sora 300–500
- **Etiquetas/etiquetas/precios**: JetBrains Mono 400, mayúsculas, espacio entre letras 0,10–0,18 em, color apagado

---

## Efectos visuales

### 1. Entrada de tarjetas flotantes

Dos tarjetas flotantes en el panel derecho del héroe se animan después de la foto cargas:
```
Card 1 (bottom-left):
initial={{ opacity: 0, x: -24, y: 16 }}
animate={{ opacity: 1, x: 0, y: 0 }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}

Card 2 (top-right):
initial={{ opacity: 0, x: 24, y: -16 }}
animate={{ opacity: 1, x: 0, y: 0 }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
```

Después de ingresar, ambas tarjetas tienen un flotador inactivo sutil:
```css
@keyframes float-a {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}
@keyframes float-b {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-7px); }
}
.card-1 { animation: float-a 5s ease-in-out infinite; }
.card-2 { animation: float-b 6s ease-in-out infinite 0.5s; }
```

### 2. Entrada de contenido escalonada: héroe left

```
Tag line: initial={{ opacity: 0, y: 20 }} → animate, delay 0.1s
H1 each word group: initial={{ opacity: 0, y: 28 }} → animate, stagger 0.12s
Sub: delay 0.45s
CTAs: delay 0.6s
Proof stats: delay 0.75s
All: duration 0.55s, ease 'easeOut'
```

### 3. La sección de desplazamiento revela

Atodas las secciones:
```
initial={{ opacity: 0, y: 32 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
Trigger: useInView, once: true, margin: '-70px'
Stagger children: delay index * 0.10
```

### 4. Conteo de pasos del proceso

Números de sección del proceso (01–04) animar desde 0 cuando la sección ingresa a la vista:
```
useSpring from 0 to target, duration 800ms
Triggered by IntersectionObserver
```

### 5. Elevación de tarjeta flotante: servicios y testimonios

```css
transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
&:hover {
  transform: translateY(-3px);
  border-color: hsl(var(--primary));
  box-shadow: 0 12px 32px rgba(45, 154, 78, 0.10);
}
```

### 6. Línea de acento verde revelar

Antes de los títulos de las secciones:
```
A 24px × 2px green line:
initial={{ scaleX: 0, transformOrigin: 'left' }}
animate={{ scaleX: 1 }}
transition={{ duration: 0.45s, ease: 'easeOut' }}
```

---

## Desglose de la sección

### Sección 1: barra de navegación (pegajosa)

Parte superior fija. `background: rgba(255,255,255,0.97)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid hsl(var(--border))`. Relleno 16px 60px.

**Izquierda — marca**:
- Icono de hoja: 28×28px, `background: hsl(var(--primary))`, radio de borde 7px, centrado 🌿 emoji o hoja SVG (lucide `Leaf`), color blanco,tamaño de fuente 14px.
- "Clara Bloom" — Sora 700 15px, espacio entre letras -0,02em, color de primer plano. Espacio de 10 píxeles entre el icono y el texto.

**Enlaces centrales**: Servicios · Acerca de · Resultados · Blog — Sora 13px peso 400, color apagado-primer plano. Al pasar el mouse: color de primer plano.

**Derecha**: "Reservar llamada gratuita" — `background: hsl(var(--primary))`, color blanco, Sora 13px, peso 600, relleno 10px 22px, radio de borde 7px. Al pasar el mouse: `background: hsl(var(--primary-dark))`.

Móvil: Hamburguesa → superposición blanca en pantalla completa, todos los enlaces apilados, botón verde de ancho completo "Reservar llamada gratuita" en la parte inferior.

---

### Sección 2: Héroe (panel dividido)

`display: grid`, `grid-template-columns: 1fr 1fr`, `min-height: 100vh`, `padding-top: 72px`.

**Panel izquierdo** (`background: hsl(var(--background))`, padding 80px 60px, `display: flex`, `flex-direction: column`, `justify-content: center`):

- Etiqueta: Línea de acento verde (24 px × 2 px) + "Nutricionista certificado y asesor de salud" — JetBrains Mono 9 px en mayúsculas, espacio entre letras de 0,18 em, color primario. `display: flex`, espacio de 10 px, centro de alineación de elementos. Margen inferior 28px.

- H1 con entrada escalonada: Sora 800, clamp(40px, 5vw, 64px), altura de línea 1,08, espacio entre letras -0,04em, margen inferior 22px. Tres líneas: 
 - "Tu comida". 
 - "Tus *reglas.*" — "reglas". en `color: hsl(var(--primary))`
 - "Tus resultados".

- Sub: "Ayudo a personas ocupadas a construir una relación saludable con la comida, sin restricciones, sin contar calorías ni renunciar a las cosas que aman". — Sora 15px, peso 300, color de primer plano apagado, altura de línea 1,85, ancho máximo 420px, margen inferior 40px.

- Fila CTA, `display: flex`, espacio 10px, margen inferior 48px:
 - Principal: "Reserve una llamada gratuita de 30 minutos" — `background: hsl(var(--primary))`, blanco, Sora 13px peso 600, relleno 13px 26px, radio de borde 8px. Al pasar el mouse: primario-dark.
 - Fantasma: "Ver mis servicios" — `border: 1.5px solid hsl(var(--border))`, color de primer plano, fondo ninguno, mismo relleno. Al pasar el mouse: color de borde en primer plano.

- Fila de estadísticas de prueba, `display: flex`, espacio 32px:
 - "500+" / "Clientes ayudados"
 - "8 años" / "Experiencia"
 - "4.9★" / "Promedio clasificación"
 
 Cada uno: número en Sora 800 24px espacio entre letras -0,04em en primer plano,etiqueta en Sora 300 11px silenciada, espacio de 3px, columna de dirección flexible.

**Panel derecho** (`background: hsl(var(--surface))`, posición relativa, desbordamiento oculto):

Foto (recuadro absoluto, cubierta de objeto) centro de objetos):
```
{/* Image: confident smiling female nutritionist or wellness coach in a bright modern kitchen, natural window light, holding a bowl of colourful whole foods — berries, greens, avocado — warm and approachable professional portrait */}
<img
  src=""
  alt="Clara Bloom, certified nutritionist, holding a bowl of colourful whole foods"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>
```

Superposición de gradiente (independiente de la composición):
```css
background: linear-gradient(
  to bottom,
  rgba(246,250,245,0.1) 0%,
  rgba(246,250,245,0.15) 60%,
  rgba(246,250,245,0.55) 100%
);
```

**Tarjeta flotante 1** (abajo a la izquierda, consulte Efectos visuales para animación flotante):
Posición absoluta, abajo 80px, izquierda 24px. Bg blanco, radio de borde 12 px, `box-shadow: 0 12px 40px rgba(12,23,12,0.13)`, relleno 14 px 18 px, ancho mínimo 190 px.

Estructura de la tarjeta: 
- Encabezado: "El plan de esta semana" — JetBrains Mono 9px espaciado entre letras mayúsculas 0,08 em silenciado, margen inferior 8px
- Título: "Antiinflamatorio" — Sora 700 13px en primer plano
- Fila de estado: círculo de marca de verificación verde (14×14px, `background: hsl(var(--primary-light))`, `border-radius: 50%`, "✓" en verde) + "Día 4 de 7 completo" en Sora 12px silenciado. Espacio 6px.

**Tarjeta flotante 2** (arriba a la derecha):
Posición absoluta, arriba 80px, derecha 24px. Fondo blanco, radio de borde 12 px, `box-shadow: 0 12px 40px rgba(12,23,12,0.13)`, relleno 16 px 18 px.

Estructura de la tarjeta: 
- Estrellas: "★★★★★" — verde, tamaño de fuente 12 px, espacio entre letras 2 px, margen inferior 8px
- Cita: `"Perdí 8 kg en 12 semanas sin sentirme privado ni una vez".` — Sora 300 12px en primer plano, altura de línea 1,55, ancho máximo 170px
- Atribución: "— Sarah M." — JetBrains Mono 9px silenciado, margen superior 8px

---

### Sección 3 — Tira de prueba social

Ancho completo, `background: hsl(var(--surface))`, `border-top: 1px solid hsl(var(--border))`, `border-bottom: 1px solid hsl(var(--border))`, relleno 18px 60px.

`display: flex`, justify-between, align-items center.

Left: "Con la confianza de más de 500 clientes en todo el Reino Unido" — Sora 13px, peso 500 en primer plano. Punto de prefijo en verde.

Derecha: visualización de calificación de estrellas + menciones de publicaciones. `display: flex`, brecha 32px, align-items center.

- Calificación: "★★★★★ 4.9 — Reseñas de Google" — estrellas en verde, texto en JetBrains Mono 10px silenciado
- Divisor: borde vertical de 1px, altura 20px
- "Como presentado en:" + mencionar nombres (Healthline · Women's Health · The Telegraph) — JetBrains Mono 9px silenciado, opacidad 0.5

---

### Sección 4 — Cómo funciona (sección verde oscuro)

`background: hsl(var(--dark-green))`,relleno 96px 60px. Texto claro en verde oscuro.

**Encabezado** (ancho máximo 560 px, margen inferior 64 px):
- Línea de acento verde (en oscuro: use `hsl(var(--primary))`)
- Etiqueta encima de h2: "Cómo funciona" — JetBrains Mono 9px espaciado entre letras mayúsculas 0,18em color primario, margen inferior 16px
- H2: Sora 800, clamp(36px, 4vw, 52px), espacio entre letras -0,04em, altura de línea 1,08, color blanco. "Desde la primera llamada hasta *resultados duraderos.*" — "resultados duraderos". en `color: hsl(var(--primary))`

**cuadrícula de 4 pasos**: `display: grid`, `grid-template-columns: repeat(4, 1fr)`, espacio 0, `border: 1px solid hsl(var(--dark-border))`. Desvanecimiento escalonado en el desplazamiento.

Cada paso (relleno 32px 28px, `border-right: 1px solid hsl(var(--dark-border))`, último hijo sin borde derecho):
- Número de paso: Sora 800 clamp(36px,4vw,48px), `color: rgba(255,255,255,0.07)`, altura de línea 1, margen inferior 20px. Animación de conteo.
- Nombre del paso: Sora 600 15px, color blanco, margen inferior 10px
- Descripción: Sora 300 13px, `color: rgba(255,255,255,0.45)`, altura de línea 1.75

Cuatro pasos:
1. **Llamada de presentación gratuita**: "30 minutos. Hablamos sobre sus objetivos, su historial de salud y su estilo de vida, y sobre si soy la persona adecuada. Sin obligación ni presión".
2. **Evaluación completa**: "Un formulario de ingesta, revisión del diario de alimentos y análisis de sangre opcionales. Aprendo todo sobre su valor inicial actual antes de hacer una sola recomendación".
3. **Tu plan personal**: "Un plan de nutrición totalmente personalizado, ideas de comidas y estrategias prácticas diseñadas para tus objetivos específicos y la vida real. Entregado en 5 días hábiles".
4. **Soporte continuo** — "Registros semanales, ajustes del plan a medida que avanza y acceso directo a mensajes entre sesiones. Nunca tendrá que resolverlo solo". 

**Fila inferior debajo de la cuadrícula** (margen superior 32 px, `display: flex`, justify-center):
- "Empiece con una llamada gratuita →" — Sora 13 px, peso 600, `background: hsl(var(--primary))`, blanco, relleno 13px 28px, radio de borde 8px. Al pasar el mouse: main-dark.

---

### Sección 5: Servicios/Programas

`background: hsl(var(--surface))`, `border-top: 1px solid hsl(var(--border))`, relleno 96px 60px.

**Encabezado** (`display: grid`, `grid-template-columns: 1fr 1fr`, gap 80px, align-items end, margin-bottom 56px):
- Izquierda: H2 Sora 800, clamp(36px, 4vw, 52px), "Elija su *ruta.*" —"camino." en primaria.
- Derecha: "Todos los programas incluyen un plan de nutrición personalizado, controles semanales y soporte de mensajería directa entre sesiones". — Sora 300 14px silenciado, altura de línea 1.8.

**Cuadrícula de tarjetas**: `display: grid`, `grid-template-columns: repeat(3, 1fr)`, espacio 16px. La tarjeta central es la opción "Más popular" destacada: ligeramente elevada con un borde verde. 

Ecada tarjeta: `background: hsl(var(--background))`, `border: 1.5px solid hsl(var(--border))`, radio de borde de 14 px, relleno de 32 px. Animación de elevación al pasar el cursor.

Estilos adicionales de tarjetas destacadas (en el medio): `border-color: hsl(var(--primary))`, `box-shadow: 0 8px 32px rgba(45,154,78,0.12)`. Tiene una insignia "Más popular": `background: hsl(var(--primary-light))`, `color: hsl(var(--primary))`, JetBrains Mono 9px mayúsculas, relleno 4px 10px, radio de borde 4px, pantalla en bloque en línea, margen inferior 16px.

Tres programas:

**Kickstart — 4 semanas**
- Etiqueta: "Comenzando"
- Descripción: "Un programa enfocado de 4 semanas para restablecer sus hábitos, comprender las señales de su cuerpo y construir una base nutricional que realmente pueda mantener". 
- Incluye (lista de verificación, 4 elementos): Evaluación inicial completa · Plan de alimentación personalizado de 4 semanas · 2 × registros por video · WhatsApp support
- Precio: "desde £320" — JetBrains Mono 12px principal, margen superior 20px, relleno superior 16px, borde superior 1px borde
- CTA: "Book Kickstart →" — enlace de texto, Sora 12px peso 600 primario

**Transformación — 12 semanas** (destacado)
- Insignia "Más popular"
- Etiqueta: "Transformación completa"
- Descripción: "El programa completo. Evaluación integral, plan de nutrición personalizado de 12 semanas, videollamadas semanales, revisión de análisis de sangre y mensajes ilimitados en todo momento".
- Incluye (6 elementos): Evaluación completa de salud y análisis de sangre · Plan de nutrición semanal · 12 × sesiones de vídeo semanales · Banco de recetas e ideas de comidas · Guía social y de restaurantes · Soporte ilimitado de WhatsApp
- Precio: "desde £840" - mismo estilo
- CTA: "Book Transform →" - botón verde de ancho completo

**Coaching continuo - Mensual**
- Etiqueta: "Ya cliente"
- Descripción: "Para graduados de Transform que desean seguir progresando. Dos sesiones por mes, actualizaciones periódicas del plan y responsabilidad continua a medida que evoluciona su vida".Incluye: 2 × sesiones mensuales · Actualización del plan cada trimestre · Soporte de mensajería continuo · Reserva prioritaria
- Precio: "desde £180/mes"
- CTA: "Reserva en curso →"

---

### Sección 6 — Resultados / Testimonios

`background: hsl(var(--background))`, `border-top: 1px solid hsl(var(--border))`, relleno 96px 60px.

**Encabezado** (centro, ancho máximo 560px, margen 0 automático 56px):
Línea de acento verde (centrada, `transformOrigin: center`).
H2: Sora 800, clamp(36px, 4vw, 52px): "Personas reales. *Resultados reales.*"
Sub: Sora 300 15px silenciado, margen superior 14px: "No fotos de antes/después: transformaciones reales en cómo las personas comen, sienten y viven".

**Cuadrícula de testimonios**: `display: grid`, `grid-template-columns: repeat(3, 1fr)`, espacio 20px. Desvanecimiento escalonado.

Cada tarjeta de testimonio (`background: hsl(var(--surface))`, `border: 1.5px solid hsl(var(--border))`, radio de borde 14px, relleno 28px):
- Estrellas: "★★★★★" — `color: hsl(var(--primary))`, tamaño de fuente 13px, espacio entre letras 2px, margen inferior 14px
- Estadísticas de resultado: número de cita grande + etiqueta corta. P.ej. "−8 kg" en Sora 800 32px espacio entre letras -0,05em primario, "en 12 semanas" en Sora 300 13px silenciado. Margen inferior 14px.
- Cita: Sora 300 14px primer plano, altura de línea 1.8, margen inferior 20px
- Cliente: círculo de avatar (36×36px, `background: hsl(var(--surface-raised))`, radio de borde 50%, letra inicial centrada en Sora 700 14px principal) + nombre (Sora 500 13px en primer plano) + programa (JetBrains Mono 9px en mayúsculas silenciadas). Pantalla flexible, espacio de 10 píxeles, alineación de elementos en el centro.

Seis testimonios (2 filas de 3):

1. **−8 kg en 12 semanas** — "Después de años de dieta yo-yo, Clara me ayudó a entender *por qué* estaba tomando las decisiones que estaba tomando. La pérdida de peso casi ocurrió por sí sola una vez que eso hizo clic". — Sarah M. · Programa de transformación

2. **Energía restaurada** — "Estaba exhausta todo el tiempo y asumí que era solo la vida con dos niños. A las 6 semanas de seguir el plan de Clara, tenía una energía que no había sentido desde que tenía veinte años". — James T. · Kickstart

3. **El colesterol bajó un 22%** — "Mi médico de cabecera había estado preocupado por mi colesterol durante dos años. Tres meses con Clara y estaba nuevamente en el rango saludable. No necesito medicamentos". — Priya K. · Transform

4. **−5 kg + no lo recuperó durante 18 meses** —"He mantenido el peso durante un año y medio. Eso nunca había sucedido antes. El plan realmente funciona en la vida real". — Emma R. · Coaching continuo

5. **SII de 10 años superado**: "Había tenido SII durante una década y me dijeron que era algo con lo que tenía que vivir. Clara identificó tres desencadenantes específicos en mi primera semana. Ojalá hubiera hecho esto antes". — Tom F. · Transformar

6. **Primera relación saludable con la comida** — "He estado contando calorías desde que tenía 16 años. El enfoque de Clara fue lo opuesto a todo lo que creía saber, y lo primero que realmente funcionó". — Amara N. · Transform

**Debajo de la cuadrícula** (margen superior 40px, centro): "Leer las más de 200 reseñas →" — Sora 12px peso 500, `border: 1px solid hsl(var(--border))`, relleno 10px 24px, radio de borde 8px, color apagado. Al pasar el mouse: color de primer plano del borde, color de primer plano.

---

### Sección 7: Acerca de Clara

`background: hsl(var(--surface))`, `border-top: 1px solid hsl(var(--border))`, relleno 96px 60px. `display: grid`, `grid-template-columns: 1fr 1fr`, espacio 80px, alineación de elementos en el centro.

**Izquierda — foto:**

`border-radius: 14px`, desbordamiento oculto, relación de aspecto 4/5, borde `1.5px solid hsl(var(--border))`.
```
{/* Image: friendly professional portrait of female nutritionist in a bright modern setting, warm natural light, confident and approachable, clean background — clinic, kitchen, or garden setting */}
<img src="" alt="Clara Bloom, certified nutritionist" className="w-full h-full object-cover object-center" />
```

Insignia verde superpuesta (parte inferior izquierda absoluta del contenedor de fotos, margen 16px):
- Tarjeta blanca, radio de borde 8px, relleno 10px 14px, sombra de cuadro
- "🌿 Certificado por BANT y CNHC": JetBrains Mono 9px silenciado

**Derecha: biografía (columna flexible, espacio de 24px, centro de justificación de contenido):**

Línea de acento verde. Etiqueta: "Acerca de Clara" — JetBrains Mono 9px espaciado entre letras mayúsculas 0,16em principal.
H2: Sora 800, clamp(32px, 3.5vw, 44px), espaciado entre letras -0,04em: "La comida debería funcionar *para ti.* No en tu contra".

Dos párrafos biográficos (Sora 300 15px silenciados) altura de línea 1.9):
1. "Soy un nutricionista registrado con una Licenciatura en Ciencias de la Nutrición y una Maestría en Nutrición Clínica. He trabajado con clientes privados durante 8 años, ayudando a las personas a desenredar relaciones complicadas con los alimentos y construir algo que realmente dure".
2. "Mi enfoque está arraigado en la ciencia, pero expresado en un lenguaje sencillo. No creo en la perfección. Creo en el progreso y en encontrar un enfoque.eso se adapta a tu vida, no al revés."

Fila de credenciales (margen superior 8px, `display: flex`, espacio 12px, envoltura flexible):
Chips de credenciales: cada `background: hsl(var(--primary-light))`, `border: 1px solid hsl(var(--primary-muted))`, radio de borde 100px, relleno 5px 12px, JetBrains Mono 10px peso primario 600.

Chips: Licenciatura en Ciencias de la Nutrición · Maestría en Nutrición Clínica · Registrado en mBANT · Acreditado por CNHC · 8 años de práctica

"Leer mi historia completa →" enlace debajo de los chips (margen superior 12 px): Sora 13 px peso 600 primario, borde inferior 1 px primario.

---

### Sección 8: preguntas frecuentes

`background: hsl(var(--background))`, `border-top: 1px solid hsl(var(--border))`, relleno 80px 60px `display: grid`, `grid-template-columns: 1fr 1fr`, espacio. 80px.

**Izquierda - encabezado:**
Línea de acento verde.
H2: Sora 800, clamp(32px, 3.5vw, 44px), espacio entre letras -0.04em: "Preguntas, *respondidas.*"
Sub: Sora 300 14px silenciado line-height 1.85: "Si su pregunta no está aquí, la llamada de introducción gratuita es el mejor lugar para hacerla". 
 Botón "Reserve una llamada gratuita →" a continuación, Sora 13px peso 600, `background: hsl(var(--primary))`, blanco, relleno 12px 24px, radio de borde 8px, margen superior 24px.

**Derecha — acordeón** (shadcn/ui Accordion, 6 preguntas):

Each: disparador de ancho completo, relleno 18px 0, `border-bottom: 1px solid hsl(var(--border))` Sora 500 14px en primer plano, icono "+" / "-" alineado a la derecha en principal. 1.8.

1. **¿Necesito seguir una dieta específica?** — No. No prescribo dietas. Cada plan se basa en sus preferencias, intolerancias y estilo de vida. El objetivo es hacer que las opciones más saludables se sientan naturales, no forzadas. **¿Qué tan rápido veré los resultados?** — La mayoría de los clientes notan cambios en la energía y la digestión en 2 a 3 semanas. 4 a 6, dependiendo de sus objetivos y punto de partida.

3. **¿Trabaja en línea o en persona?**: veo clientes en persona en Londres y en línea mediante videollamada para clientes en cualquier lugar del Reino Unido y en el extranjero. La experiencia es la misma, solo que más conveniente.**¿Qué pasa si tengo una afección médica?**: trabajo junto con médicos de cabecera y especialistas para clientes con afecciones diagnosticadas.incluyendo SII, SOP, trastornos de la tiroides, diabetes y problemas cardiovasculares. Siempre avisaré si creo que se necesita una derivación médica.

5. **¿La llamada de introducción gratuita es realmente gratuita?** — Sí, completamente. Es una conversación de 30 minutos: sin presión de ventas ni compromiso. Solo quiero asegurarme de poder ayudarle de verdad antes de invertir.

6. **¿Puedo repartir el coste?** — Sí. Todos los programas de 8 semanas o más se pueden pagar mensualmente. Los planes de pago están disponibles sin cargo adicional.

---

### Sección 9: Banner CTA

Ancho completo, `background: hsl(var(--primary))`, relleno 80px 60px. Textura diagonal sutil:
```css
background-image: repeating-linear-gradient(
  -45deg,
  rgba(255,255,255,0.04) 0px 6px,
  transparent 6px 18px
);
```

Contenido centrado, ancho máximo 600 px:
- H2: Sora 800 cursiva clamp(38px, 4.5vw, 58px), espacio entre letras -0,04 em, blanco, altura de línea 0,98: "Listo para cambiar *¿cómo comes?*"
- Sub: Sora 300 15px `rgba(255,255,255,0.72)` margin 20px 0 36px: "Reserva una llamada de introducción gratuita de 30 minutos: sin compromiso, sin ventas difíciles. Solo una conversación honesta sobre si puedo ayudarte". 
- Dos botones, centrados, espacio de 12 px:
. - Principal: "Reserve su llamada gratuita": bg blanco, `color: hsl(var(--primary))`, Sora 700 14px, relleno 14px 32px, radio de borde 9px. Al pasar el mouse: `background: hsl(var(--primary-light))`.
 - Fantasma: "Ver precios primero →" — `border: 1.5px solid rgba(255,255,255,0.35)`, texto blanco, fondo transparente.
- Línea de confianza a continuación (margen superior 20 px): JetBrains Mono 10 px `rgba(255,255,255,0.5)`, espacio de centro de justificación flexible 16 px: "Sin compromiso" · "Gratis Llamada de 30 minutos" · "En línea y en persona" · "Cancelar en cualquier momento"

---

### Sección 10 — Pie de página

`background: hsl(var(--foreground))` (verde oscuro-negro). Relleno 48px 60px 28px.

**Cuadrícula superior**: `grid-template-columns: 2fr 1fr 1fr 1fr`, espacio 48px.

Columna 1 (Marca):
- Icono de hoja (blanco, 24px) + "Clara Bloom" Sora 700 15px blanco. Gap 8px.
- "Nutricionista registrado que ayuda a las personas a construir una relación más saludable con los alimentos". — Sora 300 12px `rgba(255,255,255,0.4)`, margen superior 10px, ancho máximo 220px, altura de línea 1.7
- Instagram · TikTok · Iconos de LinkedIn: 18px, `rgba(255,255,255,0.3)`, espacio 14px, margen superior 18px

Columna 2 (Servicios):
- Encabezado: "Servicios" — JetBrains Mono 9px mayúsculas `rgba(255,255,255,0.28)`
- Enlaces (Sora 12px`rgba(255,255,255,0.5)`, gap 9px): Programa Kickstart · Programa Transform · Coaching continuo · Llamada de introducción gratuita

Columna 3 (Info):
- Encabezado: "Info"
- Enlaces: Acerca de Clara · Cómo funciona · Resultados · Blog · Prensa

Columna 4 (Contacto):
- Encabezado: "Contacto"
- Enlaces: hello@clarabloom.co.uk · Reservar una llamada · Instagram DM · Preguntas frecuentes

**Barra inferior** (margen superior 40px, relleno superior 20px, `border-top: 1px solid rgba(255,255,255,0.08)`):
- Izquierda: "© 2026 Clara Bloom Nutrition Ltd. Todos los derechos reservados". 
- Derecha: "Política de privacidad · Términos"
Ambos: JetBrains Mono 9px `rgba(255,255,255,0.25)`.

---

## Animaciones Resumen

| Elemento | Animación | Gatillo |
|---|---|---|
| Etiqueta de héroe + líneas H1 | Desvanecimiento escalonado y:28 | En la montura, escalone 0,12 s |
| Sub héroe + CTA | Desvanecimiento y:20 | En montaje, 0,45–0,6 s |
| Estadísticas a prueba de héroes | Desvanecimiento y:16 | En montaje, 0,75 s |
| Tarjeta flotante 1 | Deslícese hacia adentro desde la izquierda + bucle flotante | En montura 0,7s |
| Tarjeta flotante 2 | Deslícese desde la derecha + bucle flotante | En montura 0,9s |
| Números de proceso | Cuenta atrás 0→01–04 | IntersecciónObservador |
| Pasos del proceso | Desvanecimiento escalonado | Desplácese hacia Ver |
| Tarjetas de servicio | Desvanecimiento escalonado | Desplácese hacia Ver |
| Tarjetas de testimonios | Desvanecimiento escalonado | Desplácese hacia Ver |
| Preguntas frecuentes sobre acordeón | Altura 0→automático | Haga clic en |
| Banner de llamada a la acción | Desvanecimiento | Desplácese hacia Ver |
| Divisores de línea verde | escalaX 0→1 | Desplácese hacia Ver |

---

## Responsive

**Móvil (< 768px):**
- Navegación: hamburguesa → superposición blanca en pantalla completa, icono de hoja + nombre en la parte superior, todos los enlaces apilados, botón verde de ancho completo "Reservar llamada gratuita" en abajo
- Héroe: una sola columna, foto debajo del contenido, relación de aspecto 3/4, tarjetas flotantes ocultas en el móvil
- Tira de prueba social: envoltura de 2 líneas
- Proceso: pasos verticales de una sola columna
- Servicios: tarjetas de una sola columna
- Testimonios: ajuste de desplazamiento horizontal, una tarjeta visible
- Acerca de: columna única, foto arriba de la biografía
- Preguntas frecuentes: ancho completo
- CTA: simplecolumna
- Pie de página: columna única, cuadrícula de enlaces de 2 columnas

**Tableta (768px–1024px):**
- Hero: mantener dividido, reducir el relleno a 40px
- Proceso: cuadrícula 2×2
- Servicios: columna única o 2-col
- Testimonios: Cuadrícula de 2 columnas

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.400.x",
  "@radix-ui/react-accordion": "^1.2.x"
}
```

---

## Rápido notas

- El nombre de la marca es **Clara Bloom**: intercambie en todas partes (nav, pie de página, meta, acerca de la copia) con un solo buscar-reemplazar.
- Las tarjetas flotantes en el héroe usan contenido de marcador de posición (nombre del plan, testimonio). Conecte a datos reales del cliente o CMS si es necesario, o déjelo como UI estática. 
: todos los precios son sugerencias: actualice antes de publicar. Se incluye una copia del plan de pago mensual en las preguntas frecuentes para reducir la fricción en la etapa de decisión.