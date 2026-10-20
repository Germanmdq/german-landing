## Goal
Cree un sitio web de catering de lujo completo llamado **Maison Larder**: una casa de catering tranquila, editorial y basada en ingredientes. Tonos cálidos de papel crema, titulares Instrument Serif, etiquetas utilitarias monoespaciadas y detalles en terracota. La estética es lujo sin ruido: piense en la revista Kinfolk y en la cocina de preparación con estrella Michelin.

---

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

---

## Sistema de diseño - Colores

```css
:root {
  --paper:      #f4efe6;
  --paper-2:    #ebe4d6;
  --ink:        #1a1613;
  --ink-2:      #2a241f;
  --ink-soft:   #5c534a;
  --rule:       #d8cfbe;
  --accent:     #b84a28; /* terracotta */
  --accent-ink: #ffffff;
}
```

Antecedentes: `--paper`. Todo el texto: `--ink`. Uso de acento: titulares en cursiva, botones de CTA, estados de desplazamiento, números de estadísticas. Bordes/divisores: `--rule` (1px sólido, sin sombra). Radio del borde: 2 píxeles en todas partes, casi cuadrado.

---

## Tipografía

```
Google Fonts:
https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap
```

- **Encabezados/visualización**: `Instrument Serif`, peso 400, espacio entre letras -0,01em. La cursiva se extiende para palabras con acento.
- **Cuerpo/UI**: `Inter Tight`, peso 300–500
- **Etiquetas/insignias/nav/precios/títulos**: `JetBrains Mono`, 11px, espacio entre letras 0,12em, mayúsculas. Se utiliza como sistema visual, no para código.

```css
.mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.eyebrow::before {
  content: '';
  width: 24px;
  height: 1px;
  background: currentColor;
}
```

Los números de sección siguen un sistema consistente: `§ 01 / Acerca de`, `§ 02 / Servicios`, etc., representados en `.mono` con una etiqueta secundaria en el right.

---

## Efectos visuales

### 1. Cursor personalizado
Reemplace el cursor del sistema por completo con un cursor personalizado de dos capas:
```css
.cursor-dot {
  position: fixed; top: 0; left: 0;
  width: 8px; height: 8px;
  background: var(--ink);
  border-radius: 999px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition: width .2s, height .2s;
}
.cursor-ring {
  width: 36px; height: 36px;
  background: transparent;
  border: 1px solid var(--ink);
  transition: width .25s ease, height .25s ease, transform .08s linear;
}
.cursor-ring.hover { width: 64px; height: 64px; border-color: var(--accent); }
.cursor-dot.hover { opacity: 0; }
```
Track `mousemove` para punto (inmediato), requestAnimationFrame lerp para anillo (factor de retraso 0,12). Establezca `cursor: ninguno` en el cuerpo. Ocultar en dispositivos táctiles (`@media (hover: none)`).

### 2. Animación de titulares con revelación de líneas
Los titulares se animan al desenmascarar el texto hacia arriba:
```css
.line-reveal span {
  display: block;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.75s cubic-bezier(0.16, 1, 0.3, 1);
}
.line-reveal.in-view span {
  clip-path: inset(0 0 0% 0);
}
```
Escalonar varias líneas con un retraso de 0,1 s cada una. Activado por IntersectionObserver (umbral 0,1).

### 3. Revelación de clip para imágenes
Las imágenes se desenmascaran de abajo hacia arriba en el desplazamiento:
```css
.clip-reveal {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.clip-reveal.in-view {
  clip-path: inset(0% 0 0 0);
}
```

### 4. Desvanecimiento general secciones
```js
// initial
{ opacity: 0, y: 30 }
// animate
{ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
```

### 5. Navegación fija conmix-blend-mode switch
Nav comienza con `mix-blend-mode: difference; color: white` por lo que se invierte sobre cualquier fondo. Al desplazarse más allá de 60 px, cambie a: `mix-blend-mode: normal; color: var(--ink); background: color-mix(in oklab, var(--paper) 80%, transparent); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule)`.

### 6. Marquee ticker
Desplazamiento horizontal continuo de categorías de servicios. Dos tramos idénticos dentro de un contenedor flexible, animación CSS `translateX(-50%)` lineal infinita. Velocidad: ~35 s por ciclo.

### 7. Botones magnéticos
En elementos `[data-magnetic]`, desplace el elemento hacia el cursor en `mousemove` hasta 12px usando `transform: translate()`. Restablecer en `mouseleave` con transición de resorte.

---

## Desglose de componentes

### 1. Barra de navegación (fija, z-100)
- Cuadrícula: `1fr auto 1fr` - marca izquierda, centro de enlaces de navegación, CTA right
- Marca: `Maison Larder®` en Instrument Serif 22px. `®` en superíndice JetBrains Mono 9px
- Enlaces de navegación: Acerca de · Servicios · Menú · Galería · Precios · Preguntas frecuentes: mono 11px mayúscula
- CTA derecha: `Est. 2014` en mono opacidad 0.7 + botón relleno "Solicitar una cotización →" en el fondo `--ink`
- Móvil: hamburguesa, menú superpuesto de pantalla completa

### 2. Hero (Sección § 01)
**Variante A — División editorial (predeterminado):**
- Barra superior: `N°.01 — Bespoke Catering House` izquierda, `Londres · Copenhague · Nueva York` derecha. Ambos mono. 1px `--rule` borde inferior.
- Cuadrícula de dos columnas debajo (división 55/45):
 - Izquierda: título grande "Lujo tranquilo", salto de línea, "*plateado.*" (cursiva). Abajo: dos bloques `.meta-item` con etiqueta mono `— Craft` y `— Notes` y texto del cuerpo. Abajo: dos botones "Solicitar una cotización →" (relleno) + "Ver menús →" (esquema).
 - Derecha: imagen alta (aspecto ~3/4), barra de título debajo: `Fig. 01 / Menú Primavera '26` izquierda, `↗ 02:34 película` derecha, ambos mono.
- Altura sección completa: 100svh. Fondo de papel.

```
{/* Image: elegant plated dish, smoked lamb with charred leek, terracotta ceramic, white tablecloth, soft natural light from the side, editorial food photography */}
```

### 3. Marco (entre el héroe y acerca de)
Desplazamiento continuo, fondo crema, regla de 1px superior e inferior:
```
Weddings ✦ Private Dining • Corporate ✦ Film & Press • Chef's Table ✦ Supper Clubs •
```
Fuente: Instrument Serif cursiva 20 píxeles. Estrella `✦` en color `--accent`.

### 4. Acerca de (§ 02)
Fila de etiqueta de sección: `§ 02 / Acerca de` izquierda + `Una casa de catering, tranquilamente` derecha. Ambos mono. regla de 1pxabajo.

Cuadrícula de dos columnas (50/50):
- Izquierda: imagen alta con animación de revelación de clip
- Derecha: ceja "Nuestra filosofía" + texto inicial en Instrument Serif 24px + párrafo del cuerpo + fila de estadísticas

Estadísticas (3 elementos en línea):
- `12y` (color de acento) / Años cocinando
- `842` / Eventos y bodas 
- `30+` (color de acento) / Miembros del equipo

Números de estadísticas: Instrumento Serif, ~64px, color de tinta. Etiquetas: mono 11px, tinta suave.

```
{/* Image: professional kitchen prep — hands carefully plating a dish, clean stainless surface, warm ambient kitchen light, documentary feel */}
```

### 5. Servicios (§ 03)
Etiqueta de sección + encabezado grande: `"Qué hacemos cuando *necesitas alimentar una habitación.*"` (~120px abrazadera, acento en cursiva span).

Abajo: filas de lista apiladas. Cada fila:
- `01` / `02` / etc. en mono, dim
- Nombre del servicio en Instrument Serif 28px (algunos en cursiva)
- Texto de descripción en Inter Tight 15px ink-soft
- Etiquetas en mono (por ejemplo, `Servicio completo · Varios días`)
- `→` cuadro de flecha alineado a la derecha, aparece al pasar el mouse
- Divisor `--rule` de ancho completo de 1 px entre filas
- Atributo `[data-magnetic]` para efecto de desplazamiento magnético

Cuatro servicios:
1. **Bodas**: servicio completo de catering para 40–400 personas. Degustaciones, diseño de menú, bar, personal de servicio y estilismo, todo ello gestionado de principio a fin. `Servicio completo · Varios días`
2. ***Comidas* privadas**: mesas del chef, cumpleaños y aniversarios. Cenas íntimas en tu casa, desde ocho invitados hasta sesenta. `Chef en casa`
3. **Corporativo**: juntas directivas, oficinas externas, lanzamientos de productos y almuerzos de mesa larga. Cocinamos para marcas que se preocupan por los detalles. `Offsites · Lanza`
4. ***Cine* y prensa**: estilismo de comida, catering en el set y platos editoriales para rodajes, campañas y artículos de revistas. `Styling · On-set`

### 6. Menú (§ 04)
Etiqueta de sección + interfaz con pestañas.

**Barra de pestañas** (5 pestañas): Canapés · Primeros platos · Principales · Postres · Maridaje de vinos
Pestaña activa: `--ink` fondo, texto en papel. Inactivo: transparente. La barra de pestañas tiene una regla inferior de 1 px.

**Panel de menú** (se muestra por pestaña activa):
- Fila de encabezado: nombre del curso en Instrument Serif 28px + etiqueta mono a la derecha (`— 6 bits/invitado`)
- Filas de elementos(regla de 1 px entre cada uno):
 - Nombre en Inter Tight 500 16px
 - Descripción en Inter Tight 300 14px ink-soft 
 - Insignias de dieta: pastilla pequeña `V` (vegetariana), `GF` (sin gluten) — mono 10px
 - Precio alineado a la derecha en mono

**Contenido del panel de la pestaña:**

*Canapés — 6 bocados/invitado:*
- Vieira de Hokkaido, yuzu kosho, centeno · Vieira bañada a mano, curada en kombu, colocada sobre centeno al carbón y terminada con chile fermentado. [GF] · £14/ud
- Champiñones batidos, masa madre, trufa · Champiñones Dorset, batidos con mantequilla marrón y crema ahumada con heno. [V] · £9/pc
- Cangrejo de Cornualles, manzana verde, aceite de eneldo · Cangrejo blanco escogido en crema fresca sobre una galleta malteada. · £12/pc
- Tomate confitado, burrata, albahaca · Tomate de la Isla de Wight asado a fuego lento, burrata de Puglia, aceite de tres albahaca. [V][GF] · £8/pc

*Primeros platos - Emplatado:*
- Trucha ahumada, suero de leche, hierbas marinas · Curado sobre brasas de enebro, pepino encurtido, grosella espinosa salada.
- Tagliolini enrollados a mano, caviar Exmoor · Pasta con yema de huevo, beurre blanc, cebollino flower.
- Puerro carbonizado, avellana, vadouvan · Puerros cocidos a la brasa, praliné de avellanas con mantequilla marrón, hoja de curry. [V]

*Platos principales: elija uno:*
- Cordero de marisma, cebolla quemada, ajo silvestre · Cuarto de cordero Herdwick y paleta estofada a fuego lento, alliums de tres formas.
- Rodaballo pescado con anzuelo, gambas marrones, col rizada · Filete de rodaballo, mantequilla de nueces, col hispi, algas mantequilla.
- Apio nabo glaseado, Tunworth, avena tostada · Apio nabo entero asado, Tunworth añejado en barril, avena con mantequilla dorada. [V]

*Postres — Acabado:*
- Tarta de mantequilla marrón, almendra siciliana · Masa caramelizada, caramelo salado, helado de almendras amargas.
- Ruibarbo asado, vainilla, galletas de mantequilla · Ruibarbo forzado de Yorkshire, crema de vainilla, galletas de mantequilla con mantequilla miga.
- Comté añejo, membrillo, nuez · Comté 24 meses, membrillo casero de membrillo, nuez confitada. [V]

*Maridaje de vinos — Vuelo de cuatro copas:*
- Copa I · Kabinett Riesling, Mosel '22 · Bajo contenido de alcohol, salino, poco seco. Maridado con canapés. +£48
- Copa II · Chenin Blanc, Loira '23 ·Natural, textural. Maridado con primeros platos. +£48
- Copa III · Gamay, Beaujolais '22 · Ligero, brillante, sírvase fresco. Combinado con platos principales. +£48
- Copa IV · Moscato d'Asti '24 · Suavemente chispeante. Maridado con postres. +£48

### 7. Galería (§ 05)
Etiqueta de sección + encabezado: `"Habitaciones que hemos *alimentado.*"` acento en cursiva.

CSS Mampostería de cuadrícula: 12 columnas, 7 imágenes con diferentes valores de extensión que crean un editorial asimétrico diseño:
```css
.gallery {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 120px;
  gap: 8px;
}
.g1 { grid-column: span 7; grid-row: span 3; }
.g2 { grid-column: span 5; grid-row: span 2; }
.g3 { grid-column: span 5; grid-row: span 2; }
.g4 { grid-column: span 4; grid-row: span 3; }
.g5 { grid-column: span 8; grid-row: span 3; }
.g6 { grid-column: span 6; grid-row: span 2; }
.g7 { grid-column: span 6; grid-row: span 2; }
```
Eda figura: `desbordamiento: oculto`. Al pasar el mouse, `img` escala a 1.04, el subtítulo se desvanece en la parte inferior a través de una superposición absoluta, mono 11px.

Subtítulos: Boda en Somerset Barn · 180 invitados / Cena privada · Mayfair · 14 / Sesión fotográfica para Vogue Italia / Lanzamiento de Esopo en Tokio / Cena de la cosecha en Cotswolds / Gala Tate Modern · 240 / Almuerzo en estudio · LNC Arquitectos

```
{/* Image 1: long candlelit wedding banquet table, flower arrangements, champagne, warm evening light, 180 guests, barn setting */}
{/* Image 2: intimate private chef's table, dark wood, single candle, 14 guests, Mayfair apartment */}
{/* Image 3: editorial food styling, heritage tomato plate, Vogue aesthetic, top-down, white marble */}
{/* Image 4: corporate brand launch, clean minimal table, branding elements, modern venue */}
{/* Image 5: outdoor harvest supper, long table in field, golden hour, wildflowers, autumn */}
{/* Image 6: gala dining, plated courses being served, dramatic ceiling light, 240-person event */}
{/* Image 7: studio lunch, simple beautiful bowls, architectural studio space, daylight */}
```

### 8. Testimonios (§ 06)
Etiqueta de sección + testimonio único grande mostrado a la vez con flechas anterior/siguiente y navegación por puntos.

Diseño: imagen de avatar (círculo de 60 px, regla de borde de 1 px) + cita en bloque en Instrument Serif 24px cursiva + cita en mono.

Avance automático cada 6 segundos. Transición de fundido cruzado en caso de cambio.

Cuatro testimonios:
1. *"Necesitábamos un equipo que pudiera cocinar como un restaurante pero moverse como un organizador de bodas. Maison Larder son los únicos que pueden hacer ambas cosas: la sala tarareaba desde el primer bocado hasta el último servicio".* — Eloise y Theo Harrington · Somerset, 180 invitados
2. *"La comida fue el elemento del que más se habló en todo el lanzamiento de nuestra marca. Tres meses después, los clientes todavía mencionan el cordero".* — Kaito Suzuki · Director creativo, Aesop Tokyo
3. *"Cada detalle (el pan, la mantequilla, la forma en que llegaron los platos) se consideró considerado. Es raro el servicio de catering que te hace olvidar que estás en un evento corporativo".* — Caroline Mbeki · Directora de personal, Index Ventures
4. *"Séverine y su equipo prepararon nuestro banquete de bodas para 140 invitados en un campo con una cocina temporal y de alguna manera lo hicieron sentir como nuestro restaurante favorito".* — Phoebe & Dom Leclair · Cotswolds

### 9. Proceso (§ 07)
Encabezado: `"Cómo *funciona.*"` 

Cuatro pasoscuadrícula horizontal (4 columnas en el escritorio, apiladas en el móvil): 
- **Paso 01 · Hola — Breve**: un formulario breve, luego una llamada. Aprendemos la forma de su evento, los invitados, la sala, la temporada, el sentimiento que está persiguiendo. 
- **Paso 02 · Diseño — Menú**: Escribimos un menú según sus instrucciones y presupuesto. Se incluyen dos rondas de revisión. Vino, bar y estilismo elaborados al lado.
- **Paso 03 · Degustación — Cata**: Una cata privada en el estudio para bodas y grandes eventos. Refinamos, intercambiamos y ajustamos hasta que cada plato se sienta bien.
- **Paso 04 · Cocinar — El día**: Llegamos horas antes del servicio. Nuestro equipo se encarga de la cocina, la recepción, el bar y el embalaje. Saludas a tus invitados.

Eda tarjeta: etiqueta de paso en parte superior mono, título h4 en negrita, texto del cuerpo. Borde izquierdo de regla de 1px. Animación gradual escalonada en 0,1 s.

### 10. Precios (§ 08)
Encabezado: `"Paquetes, desde *íntimos hasta grandiosos.*"` + subnota alineada a la derecha: "Los precios son por huésped, sin IVA ni servicio. Menús personalizados siempre disponibles".

Tres tarjetas una al lado de la otra lado. La tarjeta del medio se "presenta" con fondo en tinta, texto en papel y botón CTA destacado. 

**Reunión** (pequeño):
- £95 por invitado · a partir de 8 invitados
- Menú de temporada de tres platos / Servicio de chef a domicilio / Recepción de canapés / Lista de recomendaciones de vinos / Paquete completo de cocina
- CTA: "Solicitar un Cotización →" (esquema)

**Celebrar** (Más reservado) — tarjeta destacada:
- £185 por invitado · de 40 invitados
- Degustación de cinco platos + canapés / Equipo de servicio completo (chef + FOH) / Degustación privada en el estudio / Programa de bar y sumiller / Consulta de estilo / Evento dedicado manager
- CTA: "Solicitar una cotización →" (relleno con acento)

**Grand** (Grande):
- POA · Bodas · Más de 120 invitados
- Programa de bodas de día completo / Canapés, banquete y menú nocturno / Bar completo y maridaje de vinos / Construcción de cocina y logística / Personal de 12–30 / Producción de eventos de principio a fin
- CTA: "Consultar →" (esquema)

### 11. Equipo (§ 09)
Encabezado: `"La cocina, *brevemente.*"`

Tres tarjetas de equipo seguidas. Cada uno:
- Imagen vertical: rectángulo alto,Animación `clip-reveal` en desplazamiento, ligera superposición de sombra interior
- Nombre en Instrument Serif 20px
- Papel en mono 11px ink-soft
- Breve biografía en Inter Tight 14px

Miembros:
1. **Séverine Arnaud** · Fundador / Jefe de cocina — Formado en Le Gavroche y Noma. Inaugurada Maison Larder en 2014, encima de un mercado de flores en Columbia Road.
2. **Josh Okafor** · Segundo chef: ex-Lyle's y The Clove Club. Lidera la brigada de cocina para bodas y grandes eventos.
3. **Mira Lindqvist** · Sommelier principal: especialista en productos naturales y de baja intervención. Crea los emparejamientos, los programas de barra y la bodega.

```
{/* Portrait 1: female chef in clean apron, professional kitchen, confident expression, warm light, editorial style */}
{/* Portrait 2: male sous chef plating a dish, focused, dark kitchen with warm accent lighting */}
{/* Portrait 3: female sommelier pouring wine, clean white background, elegant and precise */}
```

### 12. Prensa (§ 10)
Seis logotipos de prensa como nombres tipográficos grandes en una cuadrícula horizontal (3+3 en dispositivos móviles), color suave como la tinta, transiciones a tinta hover:
`Monocle` · `Cereal` (cursiva) · `Kinfolk` · `The Gentlewoman` · `Vogue` (cursiva) · `Condé Nast`

Abajo: una cita de ancho completo en Instrument Serif 28px cursiva:
*"Una de las casas de catering más **silenciosamente ambiciosas** de Gran Bretaña. Cada bocado se lee como si hubiera sido escrito, no cocinado". *
`— Editor de alimentos, The Gentlewoman` en mono a continuación.

### 13. Cuadrícula de Instagram (§ 11)
Encabezado de sección: ceja "Seguir" + encabezado `@maisonlarder` + botón "Abrir en Instagram ↗". alineado a la derecha.

Cuadrícula cuadrada de 10 elementos (5 columnas de escritorio, 2 columnas móviles). Cada celda: proporción 1:1, desbordamiento oculto. Al pasar el mouse: escala (1.04) + número de título breve superpuesto en la parte inferior izquierda en mono.

```
{/* IG grid: 10 square food/event images — close-up plates, candlelit service, wine being poured, hands arranging flowers, outdoor table, fresh produce, kitchen detail, editorial styling, warm ambient dining */}
```

### 14. Preguntas frecuentes (§ 12)
Diseño de dos columnas: el lado izquierdo tiene el encabezado `"Antes de *preguntar.*"` + mensaje de contacto. Lado derecho: 6 elementos de acordeón.

Acordeón: `+` gira a `×` al abrir. El panel se desliza hacia abajo con una animación de altura máxima. Uno abierto a la vez.

Preguntas y respuestas:
1. **¿Con cuánta anticipación debemos reservar?** — Bodas y eventos grandes: de 6 a 12 meses de anticipación, especialmente para la temporada alta (mayo-septiembre). Cenas privadas y catering corporativo: normalmente de 3 a 6 semanas, aunque a menudo tenemos disponibilidad de último momento.
2. **¿Viajas?** — Sí, con frecuencia. Nuestras cocinas caseras están en Londres, Copenhague.y Nueva York, y viajamos extensamente por el Reino Unido, Europa y Estados Unidos. Las reservas de destino incluyen viaje y alojamiento.
3. **¿Pueden adaptarse a las necesidades dietéticas?** — Siempre. Vegetariano, vegano, sin gluten, estilo kosher, alergias: solo díganos durante el resumen y crearemos el menú teniendo en cuenta a sus invitados, no a los nuestros.
4. **¿Qué se incluye en la cotización?**: comida, preparación, personal de cocina, equipo de servicio, equipo no desechable, viajes dentro de la zona 1 a 3 (para Londres) y un administrador de eventos exclusivo. Enumeramos todo lo adicional (bar, estilo, alquileres) línea por línea.
5. **¿Ofrecen degustaciones?** — Para bodas y eventos de más de 40 invitados, se incluye una degustación privada en el estudio. Para cenas privadas más pequeñas, las degustaciones se pueden reservar por separado o acreditar en la factura final.
6. **¿Cómo funcionan los pagos?** — Un anticipo del 25 % confirma la fecha. Un segundo 50% deberá pagarse dentro de cuatro semanas. El saldo final se liquida dentro de los siete días posteriores al evento, según el número final de invitados confirmado. 

### 15. Formulario de reserva (§ 13) 
Sección oscura: fondo en tinta (`var(--ink)`), texto en papel. Ancho completo.

Diseño de dos columnas en el interior:
- **Izquierda**: ceja + encabezado `"Solicitar una *cotización.*"` + texto inicial + cuatro filas de información en mono: `Tiempo de respuesta ≤ 24 horas` / `Evento mínimo 8 invitados` / `Ventana de reserva ahora → 27 de diciembre` / `Consultas / semana ~ 42`
- **Derecha**: formulario

Campos de formulario (cuadrícula de 2 columnas cuando sea conveniente):
- Nombre completo + Correo electrónico (fila)
- Tipo de evento (seleccione: Boda / Cena privada / Corporativo / Cine y prensa / Algo más) + Aprox. invitados (número) (fila)
- Fecha + Ubicación / ciudad (fila)
- **Estilo** — grupo de alternancia de chip/píldora: `Plateado` · `Estilo familiar` · `Recepción de canapé` · `Fiesta` · `Solo bar`
- Cuéntenos sobre el día (área de texto, marcador de posición: "La habitación, el sentimiento, cualquier cosa que debamos saber...")
- Enviar fila: nota mono "Respondemos dentro de 24 horas" izquierda + "Enviar consulta →" botón de acento a la derecha

En caso de éxito: reemplace el formulario con confirmación: "Gracias, recibido". + párrafo en Instrument Serif.

Validación de formulario: marcar campos no válidos con `--accent`borde + mensaje de error a continuación.

### 16. Pie de página
Tipo de visualización grande `"Maison *Lrder*."` (cursiva) en ~9vw, animación de revelación de líneas.

Cuadrícula de enlaces de cuatro columnas a continuación:
- **Estudio**: 12 Columbia Road · London E2 7RG · Reino Unido + teléfono en mono
- **Servicios**: Bodas / Cenas privadas / Corporativo / Cine y prensa
- **Estudio**: Acerca de / Equipo / Prensa / Preguntas frecuentes
- **Seguir**: Instagram / Pinterest / Journal / Newsletter

Fila inferior: `© 2026 Maison Larder Ltd. Registrada en Inglaterra.` izquierda + `Built in Framer · Plantilla de Maison Larder Studio` derecha. Ambos mono 11px.

---

## Resumen de animaciones

| Elemento | Animación | Sincronización |
|---|---|---|
| Titulares de héroe | ruta de clip: inserción 100%→0% | 0,75 s, cubic-bezier(0.16,1,0.3,1), escalonamiento 0,1 s |
| Contenido del héroe a continuación | opacidad 0→1, y 30→0 | 0,6 s facilidad de salida, retraso 0,4 s |
| Imágenes | ruta de clip: inserción 100%→0% | 0.9s cubic-bezier(0.16,1,0.3,1) |
| Contenido de la sección | opacidad 0→1, y 30→0 | 0,6 s de salida fácil |
| Pasos del proceso | desvanecimiento escalonado | Retraso de 0,1 s por tarjeta |
| Tarjetas de precios | desvanecimiento escalonado | Retraso de 0,12 s por tarjeta |
| Marquesina | traducirX(-50%) infinito | 35s lineal |
| Interruptor de combinación de navegación | transición de fondo/color | 0,35 s de facilidad |
| Anillo de cursor | lerp factor 0,12 | raF |
| Colocar el cursor sobre la galería | escala 1.04 | 0,4 s de facilidad |
| Acordeón | altura máxima 0 → automático | 0,35 s de facilidad |
| Cambio de testimonios | fundido cruzado de opacidad | 0.4s facilidad |

Atodas las animaciones activadas por desplazamiento usan `IntersectionObserver` con `threshold: 0.1`, `rootMargin: '0px 0px -60px 0px'`.

---

## Responsive

- **Escritorio (≥1024px)**: todos los diseños de varias columnas como se describe. Navegación: cuadrícula de 3 columnas. Héroe: división en 2 columnas. Galería: cuadrícula de 12 columnas. Servicios: lista de ancho completo.
- **Tableta (768–1023px)**: Hero cambia a apilado. Galería a 6 col. Precios: desplácese horizontalmente o apílelo. Equipo: 2+1.
- **Móvil (<768px)**: columna única en todas partes. La navegación se contrae en hamburguesa + superposición de pantalla completa. Héroe: escribe primero, imagen a continuación.Galería: cuadrícula simple de 2 columnas. Cursor personalizado oculto ("@media (hover: none)`).

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

## Rápido Notas
: el nombre de la marca es **Maison Larder**; no dude en cambiar el nombre de cualquier empresa de catering. Toda la copia está escrita y lista para pegar.
- El terracota `--accent` `#b84a28` se puede cambiar por cualquier acento: verde salvia `#6b7a3b`, azul marino `#1e3a5f`, dorado `#b89349` o burdeos `#6a2b3d`: es el único color que cambia.
: la sección del menú tiene platos reales de temporada: reemplácelo con su menú real o pídale a la IA que genere un menú para una cocina diferente.