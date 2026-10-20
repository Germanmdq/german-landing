# Sitio web de barbería Prompt
# websiteprompts.ai

---

Cree un sitio web de barbería completo para **Kingston's**: una barbería clásica y tradicional. El diseño se inspira directamente en la icónica barra de barbero: azul marino intenso, rojo intenso y blanco nítido. Base azul marino oscuro, rojo como acento principal, blanco para contraste y tipo. El ambiente es el de una artesanía atemporal: seria, orgullosa y precisa. Piense en la señalización de barbería del viejo mundo y el diseño web editorial moderno.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 222 42% 8%;         /* #0c1220 deep navy dark */
  --surface: 222 38% 11%;           /* #111a2e surface layer */
  --surface-raised: 222 34% 14%;    /* #172138 card bg */
  --border: 222 28% 20%;            /* #243050 border */
  --border-soft: 222 24% 26%;       /* #2e3e62 secondary border */
  --foreground: 210 40% 96%;        /* #f0f4fc off-white */
  --muted-foreground: 220 15% 55%;  /* #7e8aa8 muted blue-grey */
  --subtle: 220 12% 38%;            /* #546080 very muted */
  --primary: 4 80% 50%;             /* #e8220a barber red */
  --primary-foreground: 0 0% 100%;
  --primary-dark: 4 84% 40%;        /* #c11a07 dark red hover */
  --primary-light: 4 60% 14%;       /* #291007 red tint bg */
  --blue: 222 72% 38%;              /* #1a3a9c medium blue */
  --blue-light: 222 60% 24%;        /* #162462 blue surface */
  --white: 0 0% 100%;               /* #ffffff pure white */
  --stripe-red: 4 80% 50%;
  --stripe-blue: 222 72% 38%;
}
```

---

## Tipografía

Importar: `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap`

- **Pantalla / H1–H2**: Playfair Display 700–900, espaciado entre letras -0,01em, altura de línea 0,92
- **Acentos en cursiva**: Playfair Display cursiva 400–700, color `hsl(var(--primary))`
- **UI / Cuerpo / Navegación**: Inter 300–600
- **Etiquetas / Insignias / Precios**: JetBrains Mono 400

---

## Efectos visuales

### 1. Franja de poste de barbero animada: elemento de acento del héroe

A Franja de poste de barbero animada vertical en el borde derecho del héroe, 48 px ancho:
```css
.barber-pole {
  position: absolute;
  top: 0;
  right: 80px;
  bottom: 0;
  width: 48px;
  overflow: hidden;
  border-radius: 0;
  opacity: 0.25;
}
.barber-pole::before {
  content: '';
  position: absolute;
  inset: -100%;
  background: repeating-linear-gradient(
    -45deg,
    hsl(var(--primary)) 0px,
    hsl(var(--primary)) 16px,
    hsl(var(--white)) 16px,
    hsl(var(--white)) 32px,
    hsl(var(--blue)) 32px,
    hsl(var(--blue)) 48px,
    hsl(var(--white)) 48px,
    hsl(var(--white)) 64px
  );
  animation: pole-spin 4s linear infinite;
}
@keyframes pole-spin {
  from { transform: translateY(0); }
  to { transform: translateY(64px); }
}
```

### 2. Animaciones de entrada escalonadas

Cada sección se desvanece en el desplazamiento:
```
Each element: initial={{ opacity: 0, y: 28 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.09 }}
Trigger: useInView with once: true, margin: '-60px'
```

### 3. Revelación del clip del título del héroe

H1 las líneas se animan con ruta de clip en el montaje:
```
Each line wrapper: overflow: hidden
Each text: initial={{ clipPath: 'inset(0 100% 0 0)' }}
animate={{ clipPath: 'inset(0 0% 0 0)' }}
transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: index * 0.12 }}
```

### 4. Elemento decorativo de línea roja

A La regla horizontal roja de 48 px de ancho y 2 px de alto se anima antes de cada título de sección:
```
initial={{ scaleX: 0, transformOrigin: 'left center' }}
animate={{ scaleX: 1 }}
transition={{ duration: 0.5, ease: 'easeOut' }}
```

### 5. Tarjeta brillante al pasar el mouse 

 Tarjetas de servicio y barbero al pasar el mouse: 
```css
transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
&:hover {
  transform: translateY(-3px);
  border-color: hsl(var(--primary) / 0.4);
  box-shadow: 0 12px 40px rgba(232, 34, 10, 0.12);
}
```

---

## Desglose de la sección

### Sección 1: barra de navegación (pegajoso)

Top fijo, `background: hsl(var(--background) / 0.95)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid hsl(var(--border))`. Relleno 20px 64px.

**Izquierda**: Marca denominativa "Kingston's" en Playfair Display 700 20px, espacio entre letras 0,06em, transformación de texto en mayúsculas, color `hsl(var(--primary))`.

**Enlaces centrales**: Servicios · Galería · Nuestros barberos · Encuéntrenos — Inter 12px, espacio entre letras 0,10 em, mayúsculas, color de primer plano apagado. Al pasar el mouse:foreground.

**Derecha**: CTA único "Reservar ahora" — `border: 1px solid hsl(var(--primary))`, color primario, fondo ninguno, radio de borde 2px, relleno 9px 22px, tamaño de fuente 11px, mayúsculas, espacio entre letras 0,10em. Al pasar el mouse: `background: hsl(var(--primary))`, color blanco.

Móvil: hamburguesa (3 líneas blancas) → superposición de pantalla completa, fondo azul marino oscuro, todos los enlaces centrados, botón grande "Reservar ahora" en la parte inferior.

---

### Sección 2 — Hero

Vista completa altura, `display: flex`, `flex-direction: column`, `justify-content: flex-end`, relleno 0 64px 80px. Posición relativa, desbordamiento oculto.

**Capas de fondo** (de atrás hacia adelante):

Capa 1 - foto:
```
{/* Image: classic barbershop interior, leather barber chairs in a row, vintage mirrors with ornate frames, Edison bulb pendant lights, dark wood paneling, warm moody atmosphere, dark navy and burgundy tones */}
<img
  src=""
  alt="Classic barbershop interior with leather chairs and vintage mirrors"
  className="absolute inset-0 w-full h-full object-cover object-center z-0"
/>
```

Capa 2 - superposición de degradado (independiente de la composición):
```css
background: linear-gradient(
  to bottom,
  rgba(12, 18, 32, 0.4) 0%,
  rgba(12, 18, 32, 0.55) 50%,
  rgba(12, 18, 32, 0.92) 80%,
  rgba(12, 18, 32, 1) 100%
);
```

Capa 3: elemento de franja de poste de barbero (borde derecho absoluto, ver Efectos visuales).

Capa 4: contenido principal (z-10):
- Etiqueta de ubicación: línea roja (28px × 1px) + "Est. 1987 · Manchester, Reino Unido" en JetBrains Mono 10px, mayúsculas, espacio entre letras 0,16 em, color primario. Pantalla flexible, espacio de 12 píxeles, alineación de elementos en el centro. Margen inferior 24px.
- H1 con animación de revelación de clip: 3 líneas de Playfair Display 900, clamp(64px, 8vw, 120px), altura de línea 0,92, espacio entre letras -0,02em.
 - Línea 1: "El corte" - color de primer plano
 - Línea 2: "you" - color de primer plano
 - Línea 3: "*deserve.*" - Playfair cursiva, color `hsl(var(--primary))`
- Sub (atenuación, retraso de 0,5 s): "Barbería tradicional. Precisión moderna. Tres generaciones de oficios, al servicio de los mejores de Manchester desde 1987". — Inter 15px, color de primer plano apagado, altura de línea 1.8, ancho máximo 400px, margen superior 24px, margen inferior 40px.
- Fila CTA: dos botones, espacio de 16px:
 - Principal: "Reservar una silla" — `background: hsl(var(--primary))`, color blanco, relleno 14px 32 px, tamaño de fuente 12 px, mayúsculas, espacio entre letras 0,10 em, radio del borde 2 px. Al pasar el mouse: `background: hsl(var(--primary-dark))`.
 - Fantasma: "Ver servicios" — `border: 1px solid hsl(var(--border-soft))`, color de primer plano apagado, fondo ninguno, mismo relleno. Al pasar el mouse: color de primer plano del borde, primer plano de color.

---

### Sección 3: franja de horas e información

Franja de ancho completo, `background: hsl(var(--surface))`, `border-top: 1px solid hsl(var(--border))`, `border-bottom: 1px solid hsl(var(--border))`, relleno de 20 px64px.

Fila flexible, espacio de 48 px, alineación de elementos en el centro. Cuatro elementos de información separados por divisores verticales de 1 px × 32 px (`background: hsl(var(--border))`):

1. "Lunes a viernes" / "9:00 a. m. a 7:00 p. m."
2. "Sábado" / "8:00 am – 6:00 pm"
3. "Domingo" / "10:00 am – 4:00 pm"
4. "Dirección" / "14 Northern Quarter, Manchester"

Eda elemento: etiqueta en JetBrains Mono 9px mayúsculas espacio entre letras 0,10em color apagado-primer plano, valor en primer plano Inter 13px. Espacio de 4 píxeles entre la etiqueta y el valor.

---

### Sección 4: Servicios

Ancho máximo 1200 px, centrado, relleno 100 px 64 px.

**Fila de encabezado**: flexible, justificar entre, align-items flex-end, margin-bottom 64px.
- Izquierda: H2 en Playfair Display 700, clamp(40px, 4.5vw, 60px), altura de línea 1.05:
 - "Cada servicio",
 - "*hecho correctamente.*" (cursiva, color primario)
- Derecha: "Sin prisas. Sin atajos. Cada cliente recibe el mismo tiempo y atención". — Inter 13px color apagado en primer plano, ancho máximo 280px, altura de línea 1.7, texto alineado a la derecha.

**Cuadrícula de servicios**: cuadrícula 3×2 (3 columnas, espacio de 1px), contenedor `background: hsl(var(--border))`, desbordamiento oculto, radio de borde 0. Cada celda tiene Tarjetas de servicio `background: hsl(var(--background))`.

6 (ver efecto de brillo flotante):

1. **01 · Corte clásico** — "Corte con tijera o maquinilla que se adapta a tu cabeza. Terminado con una toalla caliente, peinado del producto y un escote limpio". / desde £ 28
2. **02 · Corte y barba** — "Corte de pelo completo combinado con una barba esculpida con precisión. Incluye detalles de navaja y acabado con toalla caliente". / desde £42
3. **03 · Afeitado con toalla caliente** — "Afeitado tradicional con navaja. Aceite antes del afeitado, varias pasadas con toalla caliente y un bálsamo refrescante para después del afeitado". / desde £ 32
4. **04 · Desvanecimiento** — "Piel, baja, media o alta: mezclada con precisión y limpia en forma cónica. Cualquier longitud en la parte superior". / desde £ 30
5. **05 · Forma y alineación** — "Bordes muy afilados en la línea del cabello, las sienes y detrás de las orejas. Complementario o independiente". / desde £ 18
6. **06 · The Works** — "Corte, esculpido de barba, afeitado con toalla caliente y masaje del cuero cabelludo. Nuestro ritual completo. Espere 80 minutos". / desde £72

Estructura de cada tarjeta (relleno 32px 28px, columna flexible, espacio16px):
- Número: JetBrains Mono 9px, mayúsculas, espacio entre letras 0,10em, color primario
- Nombre: Playfair Display 700 20px, color de primer plano
- Descripción: Inter 12px, color de primer plano apagado, altura de línea 1.7
- Precio: JetBrains Mono 14px, color primario, margen superior automático

---

### Sección 5 — Divisor de poste de barbero (franja decorativa con sangrado completo)

Franja de ancho completo, 56px de alto, `overflow: oculto`. Raya diagonal repetida animada usando CSS:
```css
background: repeating-linear-gradient(
  -45deg,
  hsl(var(--primary)) 0px 20px,
  hsl(var(--white) / 0.08) 20px 40px,
  hsl(var(--blue)) 40px 60px,
  hsl(var(--white) / 0.08) 60px 80px
);
animation: stripe-scroll 3s linear infinite;
@keyframes stripe-scroll {
  from { background-position: 0 0; }
  to { background-position: 80px 0; }
}
```
Arriba y abajo: borde de 1px `hsl(var(--border))`.

---

### Sección 6: Nuestro Barbers

Ancho máximo 1200 px, centrado, relleno 100 px 64 px.

**Encabezado**: línea roja + etiqueta "Nuestros barberos" (JetBrains Mono 10px rojo mayúscula). Abajo: H2 "La gente *detrás de la silla.*" — Playfair Display 700, clamp(38px, 4vw, 54px), cursiva roja en "detrás de la silla". Debajo de H2: Inter 14px silenciado "Todos los barberos de Kingston's han recibido formación durante un mínimo de cinco años. Estás en manos experimentadas". ancho máximo 480px.

**Cuadrícula de barberos**: 4 columnas, espacio de 24px. Desvanecimiento escalonado en el desplazamiento.

Cada tarjeta de barbero (`background: hsl(var(--surface-raised))`, borde, radio de borde 4px, brillo al pasar):

Foto de barbero (relación de aspecto 3/4, cubierta de objeto, centro de objeto, radio de borde) 2px):
```
[Barber 1] {/* Image: professional male barber portrait, classic barbershop setting, confident expression, holding scissors or comb, dark background, natural warm side lighting */}
[Barber 2] {/* Image: young male barber in dark apron, looking at camera, barbershop backdrop, candid professional portrait */}
[Barber 3] {/* Image: experienced male barber in shop coat, crossed arms, proud confident pose, barbershop interior */}
[Barber 4] {/* Image: bearded male barber portrait, holding straight razor, focused expression, moody studio-style lighting */}
```

Cuerpo de la tarjeta (relleno 20px 20px 24px):
- Nombre: Playfair Display 700 18px, color de primer plano
- Especialidad: JetBrains Mono 10px espaciado entre letras mayúsculas 0.10em color primario, margen superior 6px
- Biografía: Inter 12px línea silenciada altura 1.7, 2 oraciones cortas, margen superior 10px
- "Libro con [Nombre] →" enlace de texto: Inter 12px color primario, margen superior 16px, peso de fuente 600

Four barberos:
1. **James Kingston** · "Fades & Classic Cuts" · "Barbero de tercera generación. Quince años detrás de la silla y todavía ama cada corte".
2. **Marcus Webb** · "Texturas y Barbas" · "Especialista en escultura de cabello y barba con textura afro. Certificado en la técnica de la navaja."
3. **Dario Ferrara** · "Trabajo de tijera" · "Formado en Milán. Sólo tijeras. Si quieres el corte más preciso de tu vida, este es tu hombre."
4.**Tom Russell** · "Afeitados tradicionales" · "Nuestro especialista en toallas calientes. Treinta años de experiencia con navajas de afeitar. Lo guía en cada paso".

---

### Sección 7: Galería (cuadrícula de fotografías)

Ancho completo, superficie de fondo, relleno 96px 64px. Ancho máximo 1200 px centrado.

Header: H2 "La obra *habla por sí misma.*" — Playfair Display 700, clamp(38px, 4vw, 54px), centrado.

Cuadrícula estilo mampostería (columnas CSS: 3, espacio de 12 px). 9 imágenes en total. Al pasar el mouse: transición de brillo ligeramente tenue (0,85) + escala (1,01).

Resúmenes de fotografía para cada uno:
```
[1] {/* Image: close-up of a perfect high fade haircut, sharp temple line, soft gradient blend, dark background, side studio lighting */}
[2] {/* Image: barber hands applying hot towel to client's face, steaming white towel, warm amber lighting, barbershop setting */}
[3] {/* Image: finished beard sculpt result, perfectly edged jawline and cheek line, groomed and defined */}
[4] {/* Image: barber using straight razor on client's neckline, focused precise movement, dark barbershop lighting */}
[5] {/* Image: classic slick-back haircut with side part, product-styled, wet look, portrait orientation */}
[6] {/* Image: barbershop interior wide shot, row of barber chairs, mirrors, warm Edison bulbs, empty shop morning atmosphere */}
[7] {/* Image: close-up of clippers creating a skin fade, extreme precision, macro photography */}
[8] {/* Image: man in barber chair mid-haircut, draped in black cape, looking in mirror, satisfied expression */}
[9] {/* Image: barbershop shelf with vintage pomade tins, brushes, straight razors, and scissors arranged neatly */}
```

---

### Sección 8 — Testimonios

Antecedentes: `hsl(var(--surface))`, relleno 96px 64px. Ancho máximo 1200 px centrado.

Header (centro): Línea roja + etiqueta "Qué dicen los clientes". H2: "*Directamente desde* la silla". — Playfair Display 700 cursiva para "Directo desde", resto normal, clamp(38px, 4vw, 54px).

Tres tarjetas de testimonios en una cuadrícula de 3 columnas, espacio de 20 píxeles. Entrada escalonada.

Ecada tarjeta (`background: hsl(var(--surface-raised))`, borde, radio de borde 4px, relleno 32px):
- 5 estrellas rojas (★★★★★) — tamaño de fuente 14px, espacio entre letras 2px, color primario, margen inferior 16px
- Cita en Playfair Display cursiva 400 15px, color `hsl(var(--foreground) / 0.85)`, altura de línea 1.8, margen inferior 24px
- Línea de cliente: `—` + nombre en Inter 13px peso 600 primer plano + rol/nota en 12px silenciado

Tres comillas:
1. **Daniel H., habitual desde 2018** — "James me ha cortado el pelo durante seis años. Me mudé al otro lado de la ciudad y todavía hago el viaje. Eso debería decirlo todo".
2. **Kwame O., nuevo cliente** — "Entré sin saber lo que quería. Salí luciendo mejor que en años. Marcus se tomó su tiempo y lo hizo exactamente bien".
3. **Tom B., padre de tres hijos** — "Traemos a toda la familia aquí: yo, mis hijos, mi padre. Cuatro generaciones en una silla. Kingston's se ha convertido en parte de nuestra rutina".

---

### Sección 9: Reserva CTA

Ancho completo, `background: hsl(var(--primary))`, acolchado 80 píxeles 64 píxeles. Sin ancho máximo.

Detalle del fondo: sutil franja diagonal repetida con una opacidad del 3 % (blanco sobre rojo):
```css
background-image: repeating-linear-gradient(
  -45deg,
  rgba(255,255,255,0.03) 0px 8px,
  transparent 8px 20px
);
```

Centradocontenido, ancho máximo 640px:
- H2: "¿Listo para tu mejor corte hasta ahora?" — Playfair Display 900 cursiva, clamp(40px, 5vw, 64px), altura de línea 0,95, color blanco
- Subtexto: "Reserve en línea en 60 segundos. Las visitas sin cita previa siempre son bienvenidas; consulte el tiempo de espera en vivo a continuación". — Inter 15px `rgba(255,255,255,0.75)`, margen inferior 36px
- Dos botones, centrado, espacio 12px:
 - "Reservar una silla" — fondo blanco, color primario, Playfair Display 700 14px, relleno 14px 32px, radio de borde 2px. Al pasar el mouse: fondo `hsl(var(--foreground))`.
 - "Ver espera sin cita previa →" — borde 1 px `rgba(255,255,255,0.35)`, color blanco, fondo transparente, mismo relleno. 
- Indicador de espera en vivo debajo de los botones (margen superior 24 px): animación de punto verde + "Espera actual: aproximadamente 15 minutos" — JetBrains Mono 11 px `rgba(255,255,255,0.6)`. Pulso de punto verde: `@keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } } animation: pulse 2s ease-in-out infinite`.

---

### Sección 10: Encuéntrenos

Cuadrícula de dos columnas (1fr 1fr), ancho máximo 1200px, relleno 96px 64px. Fondo oscuro.

**Izquierda: marcador de posición del mapa:**

`background: hsl(var(--surface-raised))`, borde, radio de borde 4px, relación de aspecto 4/3, visualización flexible, centro de alineación de elementos, centro de justificación de contenido. Texto interno: "Mapa interactivo" en JetBrains Mono 11px silenciado. Envuelva en `<div>` con `aria-label="Map showing Kingston's Barbershop location"`.

Tarjeta de superposición (absoluta abajo a la izquierda, relleno de 20px, margen de 20px):
- Fondo blanco, radio de borde 4px, sombra de cuadro
- "📍 14 Northern Quarter, Manchester M4 1HG" — 13px de peso 600
- "0,3 millas de Piccadilly Gardens" — 11px silenciado

**Derecha: información de contacto e indicaciones (columna flexible, espacio de 28px, centro de justificación de contenido):**

Línea roja + etiqueta "Encuéntranos" (JetBrains Mono 10px en mayúsculas red).
H2: "Somos fáciles *de encontrar.*" — Playfair Display 700, 38px.

Filas de información (espacio de 20px), cada una con ícono + etiqueta + valor:
- 📍 Dirección · 14 Northern Quarter, Manchester M4 1HG
- 🚇 Transporte · 5 minutos a pie desde la parada de tranvía de Piccadilly · Autobús Northern Quarter: 97, 100, 105
- 🅿 Estacionamiento · NCP Manchester Arndale, 8 minutos a pie · Estacionamiento en la calle Thomas Street (máximo 2 horas) 
- 📞 Teléfono · +44 161 834 5200
- ✉ Correo electrónico · hello@kingstonsbarbershop.co.uk

 Botón de enlace "Obtener direcciones →" — borde 1px primario, color primario, relleno11px 24px, radio de borde 2px, tamaño de fuente 12px mayúsculas.

---

### Sección 11 - Pie de página

Fondo: `hsl(0 0% 5%)` (negro casi puro). Relleno 56px 64px 32px.

**Cuadrícula superior**: 4 columnas, espacio 48px.

Columna 1 (Marca):
- "Kingston's" en Playfair Display 700 20px, espacio entre letras 0,06 em, mayúsculas, color `hsl(var(--primary))`
- "14 Northern Quarter, Manchester M4 1HG" — 12px `rgba(240,244,252,0.4)`, margen superior 10px
- "Abierto hoy de 9 a.m. a 7 p.m." — JetBrains Mono 10px `rgba(240,244,252,0.35)`, margen superior 4px
- Fila de íconos sociales: Instagram · Facebook · Google — 18px, color `rgba(240,244,252,0.3)`, espacio de 16px, margen superior 20px

Columna 2 (Servicios):
- Encabezado: "Servicios" — JetBrains Mono 9px, espaciado entre letras mayúsculas 0,10em `rgba(240,244,252,0.3)`
- Enlaces (12px `rgba(240,244,252,0.5)`, espacio 10px): Corte clásico · Desvanecimiento · Corte y barba · Afeitado con toalla caliente · Forma y alineación · The Works

Columna 3 (Visita):
- Encabezado: "Visita"
- Enlaces: Horario de apertura · Encuéntranos · Reserva online · Tiempo de espera sin cita previa · Vales regalo

Columna 4 (Acerca de):
- Encabezado: "Acerca de"
- Enlaces: Nuestra historia · Nuestros barberos · Galería · Prensa · Contacto

**Barra inferior** (margen superior 40px, relleno superior 20px, `border-top: 1px solid rgba(240,244,252,0.08)`):
- Izquierda: "© 2026 Kingston's Barbershop Ltd."
- Derecha: "Política de privacidad · Términos"
Ambos: JetBrains Mono 10px `rgba(240,244,252,0.25)`.

---

## Resumen de animaciones

| Elemento | Animación | Gatillo |
|---|---|---|
| Líneas héroe H1 | La ruta del clip revela izquierda → derecha | En la montura, escalone 0,12 s |
| Subhéroe + CTA | Desvanecimiento y:28 | En montaje, retraso de 0,45 s |
| Raya de poste de peluquero | Desplazamiento diagonal continuo | Siempre activo (CSS) |
| Raya divisoria de sección | Desplazamiento continuo | Siempre activo (CSS) |
| Encabezados de sección | Desvanecimiento + escala de línea roja | IntersecciónObservador |
| Tarjetas de servicio | Desvanecimiento escalonado | Desplácese hacia Ver |
| Imágenes de la galería | Desvanecimiento escalonado | Desplácese hacia Ver |
| Tarjetas de barbero | Desvanecimiento escalonado y:20 | Desplácese hacia Ver |
| Tarjetas de testimonios | Desvanecimiento escalonado | Desplazarse hacia Ver|
| Titular de CTA | Revelado de ruta de clip | Desplácese hacia Ver |
| Punto de espera en vivo | Bucle de opacidad de pulso | Siempre activo (CSS) |

---

## Responsive

**Móvil (< 768px):**
- Navegación: hamburguesa → superposición oscura en pantalla completa, marca denominativa roja "Kingston" en la parte superior izquierda, todos los enlaces apilados centrados, "Reservar ahora" botón rojo de ancho completo en la parte inferior
- Héroe: contenido de pila, H1 clamp(52px, 12vw, 80px), barra de barbero oculta en el móvil
- Franja de horas: cuadrícula de 2×2
- Servicios: tarjetas de una sola columna
- Barberos: cuadrícula de 2 columnas, fotos 1:1 relación de aspecto
- Galería: 2 columnas
- Testimonios: desplazamiento horizontal instantáneo
- CTA: una sola columna
- Pie de página: cuadrícula de enlaces de 2 columnas

**Tableta (768px–1024px):**
- Servicios: cuadrícula de 2 columnas
- Barberos: cuadrícula de 2 columnas
- Galería: 2 columnas

---

## Clave Dependencias

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.400.x",
  "@radix-ui/react-accordion": "^1.2.x"
}
```

---

## Notas rápidas

- La franja del poste de barbero y el divisor de sección son CSS puro, no se requiere imagen. Se animan continuamente usando fotogramas clave de "posición de fondo" y se representarán en cualquier herramienta de inteligencia artificial. 
: el indicador de espera en vivo en el CTA es un elemento estático de la interfaz de usuario; conéctelo a un campo API o CMS real después de la generación si es necesario. 
: la marca "Kingston's" y toda la copia (direcciones, teléfono, nombres del personal) son marcadores de posición; intercámbielos por detalles reales antes del lanzamiento.