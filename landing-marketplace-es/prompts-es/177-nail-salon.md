# Sitio web de salón de uñas: mensaje de IA

## Objetivo
Cree un sitio web de estudio de uñas de lujo completo llamado **LUNE**: un espacio de belleza editorial tranquilo. Fondo blanco suave, titulares DM Serif Display, acento en rosa polvoriento y una estética artesanal de precisión. Piense: una editorial de belleza de alta gama se encuentra con una galería mínima. Femenino sin ser ruidoso. Lujo sin ruido.

---

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

---

## Sistema de diseño - Colores

```css
:root {
  --white:       #fdfcfb;
  --white-2:     #f7f4f0;
  --stone:       #ede8e0;
  --border:      #e0d9cf;
  --ink:         #1c1917;
  --ink-soft:    #78716c;
  --rose:        #c2697a;   /* dusty rose accent */
  --rose-light:  #f0d4d9;
  --rose-deep:   #9e4a5a;
}
```

Fondo: `--white`. Texto: `--ink`. Acento: `--rose`: se utiliza en botones de CTA, resaltados de precios, estados de desplazamiento, indicador de navegación activa y palabras con acento en cursiva. Bordes: `--border` (1 px, sin radio excepto donde se indique). Tarjetas: `--white-2` o `--stone`. Sin sombras paralelas: solo bordes limpios.

---

## Tipografía

```
Google Fonts:
https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap
```

- **Pantalla/encabezados**: `DM Serif Display`, peso 400. Cursiva para palabras con acento. Espaciado entre letras -0.02em.
- **Cuerpo/UI**: `DM Sans`, peso 300–500, altura de línea 1.6
- **Etiquetas/precios/nav/etiquetas**: `JetBrains Mono`, 11px, espaciado entre letras 0.1em, mayúsculas, `--ink-soft`

Sistema de etiquetas de sección: `§ 01 / Servicios`, `§ 02 / Galería`, etc. JetBrains Mono 11px `--ink-soft`, alineado a la izquierda. Etiqueta secundaria alineada a la derecha del mismo estilo. 1px `--border` regla a continuación.

Hero título escala: `clamp(56px, 9vw, 140px)`.

```css
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.eyebrow::before {
  content: '';
  width: 20px; height: 1px;
  background: var(--rose);
}
```

---

## Efectos visuales

### 1. Revelación de clip para imágenes
```css
.clip-reveal {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}
.clip-reveal.in-view { clip-path: inset(0% 0 0 0); }
```

### 2. Desvanecimiento para bloques de contenido
```js
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
```

### 3. Desplazamiento sobre la galería: suave superposición
```css
.nail-item::after {
  content: '';
  position: absolute; inset: 0;
  background: rgba(194, 105, 122, 0.15);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.nail-item:hover::after { opacity: 1; }
.nail-item:hover img { transform: scale(1.04); transition: transform 0.5s ease; }
```

### 4. Servicio de fila flotante
On el cursor, el fondo de la fila cambia a `--white-2` y un borde izquierdo `--rose` de 2px aparece:
```css
.service-row {
  border-left: 2px solid transparent;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.service-row:hover {
  background: var(--white-2);
  border-left-color: var(--rose);
}
```

### 5. Marco horizontal
Entre héroe y servicios - una franja continua:
```
GEL MANICURE · NAIL ART · ACRYLICS · PEDICURE · NAIL EXTENSIONS · CHROME · SOAK-OFF ·
```
DM Serif Display cursiva, 36px, Color `--border`. Separadores de rosa `✦`. Bucle infinito, 30s.

### 6. Revelación de línea escalonada(titulares)
```css
.line span {
  display: block;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.line.in-view span { clip-path: inset(0 0 0% 0); }
```
Varias líneas se escalonan en 0,08 s cada una.

---

## Desglose de componentes

### 1. Barra de navegación (fija, z-100)
Fondo blanco `--white` + `--border` fondo. `backdrop-filter: blur(12px)` cuando se desplaza.

Diseño: marca izquierda · centro de navegación · CTA derecha.
- Marca: `LUNE` en DM Serif Display 22px + `®` en JetBrains Mono Superíndice de 9px, tinta suave
- Navegación: Servicios · Galería · Precios · Artistas · Preguntas frecuentes — JetBrains Mono 11px `--ink-soft`, `--rose` subrayado en activo/sobre el cursor
- CTA: `Reservar ahora →` — Fondo `--rose`, texto blanco, sin radio de borde, DM Sans 500 14px
- Móvil: hamburguesa → superposición blanca en pantalla completa, enlaces centrados + grande

### 2. Hero (§ 01)
Sección de altura completa. División asimétrica: izquierda 40%, derecha 60%.

**Columna izquierda** (altura completa, sensación pegajosa):
- Arriba: ceja `Nail Studio · Est. 2018`
- Titulares:
 ```
  Nails,
  done with
  *intention.*
  ```
 DM Serif Display, `clamp(52px, 8vw, 110px)`. Tercera línea en cursiva `--rose`.
- Cuerpo: "Un estudio de uñas tranquilo y considerado en el corazón de la ciudad. Sin citas apresuradas. Sin atajos. Solo trabajo preciso y duradero y un espacio para respirar". 
- Dos CTA: `Reservar una cita →` (relleno de rosa) + `Ver servicios →` (esquema) `--border`)
- Abajo: Fila de estadísticas de JetBrains Mono: `4,9 ★ · Más de 1200 clientes · Est. 2018`

**Columna derecha** (borde a borde, sin relleno):
Composición de imagen apilada alta: dos imágenes con un espacio, ligero desplazamiento:
```
{/* Image 1 (tall, fills top 65%): close-up of perfectly shaped nude gel nails resting on white marble surface, soft diffused natural light, extremely clean and precise */}
{/* Image 2 (shorter, bottom 30%): nail artist's hands at work applying gel polish, focused and precise, warm studio lighting, blurred background */}
```
Columna derecha: `desbordamiento: oculto`, `posición: relativo`.

### 3. Franja de marquesina (separador)
`--white-2` fondo, 64 px de alto, `--border` arriba y abajo. Desplazamiento horizontal continuo como se describe arriba.

### 4. Servicios (§ 02)
Etiqueta de sección + encabezado: `"Nuestros *servicios.*"` palabra con acento en cursiva.

Introducción breve: "Cada servicio lo lleva a cabo un técnico de uñas capacitado. Usamos fórmulas no tóxicas y de larga duración. Las citas se realizan a tiempo". — DM Sans 16px `--ink-soft`, ancho máximo 560px.

Filas de servicio apiladas. Cada fila: 
- Número (`01` etc.) enJetBrains Mono 11px `--border` extremo izquierdo
- Nombre del servicio en DM Serif Display 20px
- Breve descripción en DM Sans 14px `--ink-soft`
- Duración + desde-precio alineado a la derecha: `60 min · desde £45` en JetBrains Mono 11px
- La flecha `→` aparece al pasar el mouse en el extremo derecho
- Efecto de desplazamiento del borde rosa izquierdo como se describe

Echo servicios:
1. **Manicura en gel**: esmalte en gel clásico, moldeado y limado según tus preferencias. Duradero y resistente a astillas. *60 min · desde £38*
2. ***Nail Art***: diseños personalizados pintados a mano, desde uñas decorativas hasta juegos completos. Precio basado en complejidad. *75 min · desde 55£*
3. **BIAB / Builder Gel** — Builder In A Bottle — resistencia y longitud sin acrílicos. Natural, flexible y reparable. *75 min · desde 52£*
4. **Extensiones acrílicas** — Conjunto completo o rellenos. Esculpido o superpuesto en punta. Con forma de cualquier longitud. *90 min · desde £65*
5. **Gel Polish Soak-Off**: eliminación cuidadosa del gel o acrílico existente sin dañarlo. Incluye mini tratamiento. *30 minutos · £20*
6. **Pedicura de spa**: remojo, exfoliación, cuidado de cutículas, masajes y esmalte en gel. *75 min · desde £50*
7. **Cromo y lámina**: polvo de cromo espejo, arte de uñas holográfico o laminado: complemento a cualquier servicio. *+15 min · desde £12*
8. **Tratamiento de uñas**: tratamientos base fortalecedores para uñas dañadas o delgadas. OPI, CND, ORLY. *45 min · desde £28*

Lista a continuación: `Reserve cualquier servicio →` CTA centrado, relleno de rosa.

### 5. Galería (§ 03)
Etiqueta de sección + encabezado: `"El *trabajo.*"` 

Sub: "Una selección de conjuntos recientes del estudio". JetBrains Mono 11px `--ink-soft`.

Cuadrícula CSS de 12 imágenes: tamaños desiguales, sensación de mampostería editorial:
```css
.nail-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 160px;
  gap: 6px;
}
.n1 { grid-column: span 2; grid-row: span 2; }
.n2 { grid-column: span 1; grid-row: span 1; }
.n3 { grid-column: span 3; grid-row: span 2; }
.n4 { grid-column: span 1; grid-row: span 2; }
.n5 { grid-column: span 2; grid-row: span 1; }
.n6 { grid-column: span 2; grid-row: span 2; }
.n7 { grid-column: span 1; grid-row: span 1; }
.n8 { grid-column: span 3; grid-row: span 1; }
.n9 { grid-column: span 2; grid-row: span 2; }
.n10 { grid-column: span 1; grid-row: span 1; }
.n11 { grid-column: span 2; grid-row: span 1; }
.n12 { grid-column: span 1; grid-row: span 2; }
```
Eda imagen: `object-fit: cover; width: 100%; height: 100%`. Colocar el cursor sobre: superposición de rosa suave + escala 1.04.

Resúmenes de imágenes (todas las fotografías de uñas en primer plano):
```
{/* n1: perfectly oval nude BIAB nails, white marble background, soft natural light, ultra clean */}
{/* n2: single rose chrome accent nail, close-up macro, blurred background */}
{/* n3: abstract swirl nail art in muted beige and terracotta tones, two hands */}
{/* n4: dark plum gel square nails, moody studio light */}
{/* n5: minimal french tip with thin gold line, bright clean background */}
{/* n6: botanical press-on nail art, pastel green with tiny floral details */}
{/* n7: glossy deep red stiletto nails, dramatic crop */}
{/* n8: two hands showing cloud and ombre blue nail art, flat lay on cream surface */}
{/* n9: close-up of nail technician's tools — brushes, foils, gel pots — organized neatly */}
{/* n10: sheer milky nails with single holographic star, minimal and clean */}
{/* n11: warm tortoiseshell gel nail art, autumn tones, white background */}
{/* n12: textured 3D floral nail art, white petals on nude base, extreme close-up */}
```

A continuación: `Seguir @lunenailstudio →` Enlace JetBrains Mono 11px con flecha.

### 6. Proceso (§ 04)
Etiqueta de sección + encabezado: `"Qué *esperar.*"` 

Línea de tiempo horizontal de 4 pasos en computadoras de escritorio, vertical en dispositivos móviles. Cada paso conectado por una delgada`--border` line.

Cada paso:
- Número de paso en JetBrains Mono 11px `--rose`
- Nombre en DM Serif Display 22px
- Descripción DM Sans 14px `--ink-soft`

Pasos:
1. **Reserva** — Elige tu servicio y artista en línea. Elija un horario que funcione. Lo confirmaremos dentro de una hora y le enviaremos un recordatorio el día anterior.
2. **Consulta**: tu cita comienza con una charla rápida: forma, longitud, acabado, inspiración. Nos fijamos en tus uñas y hacemos un plan.
3. **Crear**: tu artista trabaja con precisión y sin prisas. Nunca hacemos doble reserva. Tu tiempo es tuyo.
4. **Último** — Terminamos con una capa superior y consejos de cuidado posterior. Los geles duran de 3 a 4 semanas. Garantizamos nuestro trabajo durante 7 días.

### 7. Precios (§ 05)
Etiqueta de sección + encabezado: `"*Precios simples.*"` + nota: "Todos los precios incluyen la eliminación del gel/esmalte anterior cuando sea necesario".

Tres niveles de precios seguidos. Se incluye la tarjeta del medio: fondo `--stone`, insignia `--rose`.

**Essential** (nivel técnico):
- Manicura en gel: £38
- Juego BIAB: £52
- Pedicura: £50
- Soak-Off — £20
- CTA: `Book Essential →` esquema

**Firma** (técnico superior) — destacado, más popular:
- Manicura en gel — £48
- Juego BIAB — £62
- Nail Art (por uña) — desde £5
- Pedicura — £60
- Juego completo de acrílico — £75
- CTA: `Firma del libro →` relleno de rosa

**Artista** (artista principal):
- Personalizado Nail Art (juego completo) — desde £85
- Conjuntos editoriales/de prensa — POA
- Uñas para eventos (bodas, etc.) — POA
- CTA: `Consulta →` esquema

A continuación: "¿No estás seguro? Envíanos un mensaje privado a Instagram y te indicaremos la dirección correcta". JetBrains Mono 11px `--ink-soft`.

### 8. Artistas (§ 06)
Etiqueta de sección + encabezado: `"Tus *artistas.*"`

Tres tarjetas de artista seguidas. Cada uno:
- Imagen vertical, alta (aspecto 3/4), animación de revelación de clip, `--rose` borde inferior al pasar el mouse
- Nombre: DM Serif Display 20px
- Título: JetBrains Mono 11px `--rose`
- Biografía: DM Sans 14px`--ink-soft`
- Fichas especiales: etiquetas de pastillas pequeñas, `--stone` bg, texto `--ink-soft`

Tres artistas:
1. **Chloe Park** · Fundadora y artista principal: formada en Seúl y Londres. Se especializa en decoración de uñas minimalista, BIAB y construcción a presión. 8 años en el estudio. · `Nail Art` `BIAB` `Press-Ons`
2. **Margot Leclerc** · Técnico sénior: especialista en manicura francesa con experiencia en estilismo de moda. Preciso, rápido y profundamente tranquilo para sentarse. · `Francés` `Gel` `Acrílicos`
3. **Amara Osei** · Artista de uñas: conocida por sus trabajos pictóricos de arte de uñas y texturas: flores en 3D, geles esculpidos y diseños personalizados. · `Arte 3D` `Gel Esculpido` `Editorial`

```
{/* Portrait 1: female nail artist in studio, looking at camera with confidence, clean white apron, tools in background, warm natural light */}
{/* Portrait 2: female nail technician working on a client's nails, side profile, focused, bright airy studio */}
{/* Portrait 3: female nail artist holding up a painted nail tip, smiling, studio setting, natural light */}
```

### 9. Testimonios (§ 07)
Sección: `--white-2` antecedentes. Encabezado: `"*Palabras amables.*"`

Testimonio grande y único que se muestra a la vez. Flechas anterior/siguiente + puntos. Avance automático 7s. Transición de desvanecimiento.

Cita en bloque: DM Serif Display cursiva, 26 px, ancho máximo 720 px centrado.
Author: JetBrains Mono 11px `--rose`.

Cuatro testimonios:
1. *"He estado en muchos salones de manicura. Este es el único en el que nunca me siento apurada, nunca me siento como un inconveniente y siempre salgo exactamente con lo que pedí. Chloe es extraordinaria".* — Isabelle N., cliente desde 2021
2. *"Las uñas de mi boda quedaron perfectas. Amara pasó dos horas en un diseño personalizado que le mostré en Pinterest y de alguna manera lo mejoró. Las fotos se ven increíbles".* — Priya K., Novia 2024
3. *"Tengo uñas realmente malas: delgadas, peladas y no crecen. Después de tres citas con BIAB aquí, están más fuertes que nunca. El consejo sobre el tratamiento de las uñas lo cambió todo".* — Rachel O., cliente desde 2023
4. *"El estudio en sí es hermoso: tranquilo, limpio, sin olores químicos. Tomo mi descanso para almorzar aquí y vuelvo a la oficina sintiéndome como una persona completamente diferente".* — Sophie W., cliente semanal

### 10. Reservas (§ 08)
Sección `--rose` de ancho completo. Diseño centrado.

Encabezado: `"¿Listo para *reservar?*"` DM Serif Display, `clamp(52px, 8vw, 110px)`, blanco.
Sub: "Disponibilidad en tiempo real. Cancele o reprograme hasta 24horas por delante." DM Sans 16px opacidad blanca 0.8.

Dos CTA:
- `Reservar en línea →` — fondo blanco, texto `--rose`
- `Enviar un mensaje →` — contorno borde blanco, texto blanco

Abajo: `Citas disponibles Lunes a sábado, de 9 a.m. a 7 p.m. Última reserva a las 6 p.m.` JetBrains Mono 11px opacidad blanca 0.6.

Cuatro insignias de confianza seguidas (icono + texto), blanco:
- `4.9 ★ Reseñas de Google`
- `Fórmulas no tóxicas. solo`
- `Garantía de 7 días`
- `Siempre a tiempo`

### 11. Preguntas frecuentes (§ 09)
Dos columnas: rumbo a la izquierda ("Antes de *preguntar.*"`), acordeón a la derecha.

Contacto subtexto: "¿Aún no estás seguro? Envíe un correo electrónico a hello@lunenailstudio.com" JetBrains Mono 11px `--ink-soft` con enlace `--rose`.

Seis artículos de acordeón. `+` → `×`. Diapositivas del panel:

1. **¿Cómo puedo reservar?** — En línea a través de nuestra página de reservas; elija su servicio, elija un artista, seleccione una hora. Recibirá una confirmación inmediatamente y un recordatorio el día anterior. 
2. **¿Cuánto dura el gel?** — La mayoría de las manicuras en gel duran de 3 a 4 semanas. BIAB tiende a durar un poco más. Garantizamos nuestro trabajo durante 7 días; si algo se levanta, se astilla o se rompe, regrese y lo arreglaremos gratis.
3 **¿Ofrecen eliminación?** — Sí, la eliminación del gel o acrílico anterior está incluida en todas las manicuras. citas. Si solo necesita remoción, ofrecemos un remojo de 30 minutos por £ 20. 
4. **¿Puedo traer inspiración para el arte de las uñas?** - Por favor, hazlo. Capturas de pantalla de Instagram, Pinterest, un panel de estado de ánimo; cualquier cosa ayuda. Solicitamos un aviso con 24 horas de anticipación para cancelar o. reprogramar. Las cancelaciones tardías o las no presentaciones se pueden cobrar el 50% del servicio.
6. **¿Hacen eventos y fiestas nupciales?** - Sí. Ofrecemos reservas grupales para despedidas de soltera, bodas, sesiones fotográficas editoriales y eventos corporativos.

### 12. Footer
White. fondo, `--border` arriba.

Texto en pantalla grande: `LUNE.` DM Serif Display `9vw`, tinta: animación de revelación de líneas.

Diseño de tres columnas a continuación:
- **Estudio**: 14Redchurch Street · Londres E2 7DD · hello@lunenailstudio.com · Lun–Sáb 9–7pm
- **Servicios**: Manicura en gel / BIAB / Nail Art / Acrílicos / Pedicura / Soak-Off
- **Seguir**: Instagram / Pinterest / TikTok / Google Reviews

Abajo: `© 2026 LUNE Nail Studio · Londres` izquierda + `Citas: lunes a sábado de 9 a 7 p. m.` derecha. JetBrains Mono 11px `--ink-soft`.

---

## Resumen de animaciones

| Elemento | Animación | Sincronización |
|---|---|---|
| Titulares de héroe | revelación de ruta de clip | 0,7 s, escalonamiento 0,08 s |
| Imágenes de héroes | revelación de ruta de clip | 0,9 s, retraso 0,2 s |
| Filas de servicio | desvanecimiento escalonado | 0,45 s, 0,05 s por fila |
| Artículos de la galería | revelación de clip en desplazamiento | 0,8 s, escalonamiento 0,04 s |
| Tarjetas de precios | desvanecimiento | 0,5s, 0,1s por tarjeta |
| Tarjetas de artista | desvanecimiento | 0,5s, 0,1s por tarjeta |
| Pasos del proceso | desvanecimiento | 0,5 s, 0,1 s por paso |
| Intercambio de testimonios | fundido cruzado de opacidad | 0,4 s de facilidad |
| Colocar el cursor sobre la galería | superposición de rosa + escala 1.04 | 0,3 s de facilidad |
| Colocar el cursor sobre la fila de servicios | borde + bg | 0,2 s de facilidad |
| Marquesina | traducirX(-50%) | 30s lineal infinito |
| Titular de pie de página | revelación de línea de ruta de clip | 0,9 s, retraso 0,1 s |

Todo activado por desplazamiento: `IntersectionObserver`, umbral 0,1, rootMargin `0px 0px -50px 0px`.

---

## Responsive

- **Escritorio (≥1024px)**: Hero 40/60 dividido, lista completa de servicios, cuadrícula de galería de 6 columnas, artistas de 3 columnas, precios de 3 columnas.
- **Tableta (768–1023px)**: Hero apilado (imagen a continuación), galería de 4 columnas, artistas 2+1, desplazamiento de precios horizontal.
- **Móvil (<768px)**: Todo de una sola columna. Héroe: tipo, imagen, CTA apiladas. Galería: 2 columnas simples. Precios: desplácese con un chasquido. Filas de servicio: duración/precio de la pila debajo del nombre.

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx",
  "@radix-ui/react-tabs": "^1.x",
  "@radix-ui/react-accordion": "^1.x"
}
```

---

## Notas rápidas
- Nombre de marca `LUNE` cambia por el nombre de cualquier salón. Toda la copia está escrita y lista.
- El acento `--rose` `#c2697a` es el color de una sola marca, fácil de intercambiar: salvia `#7a9e7e`, terracota`#b84a28`, malva `#9b7fa6` o desnudo `#c4a882`.
: el CTA de reserva se vincula a una plataforma de reservas externa (Fresha, Treatwell, Square, etc.); el mensaje asume un enlace, no un calendario integrado.