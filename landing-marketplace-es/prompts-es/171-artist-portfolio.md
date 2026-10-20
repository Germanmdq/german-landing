# Sitio web de portafolio de artistas Prompt
# websiteprompts.ai

---

Cree un sitio web completo de portafolio de artistas para **Yuki Nakamura**, un pintor contemporáneo. Las pinturas son el punto central. Cada decisión de diseño existe para mostrar el trabajo en su máximo tamaño e impacto, no para decorarlo. Base blanca cálida, lomo negro vertical fijo con el nombre del artista, titulares DM Serif Display en cursiva, acento rojo. La interfaz de usuario es un marco silencioso alrededor de obras de arte ruidosas. Piense en cómo una galería cuelga cuadros: espacio generoso, sin competencia, atención total.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 40 18% 98%;          /* #fdfcfa warm near-white */
  --surface: 40 14% 95%;             /* #f5f3ef warm surface */
  --border: 36 16% 87%;              /* #e4e0d8 warm border */
  --border-soft: 36 12% 92%;         /* #edeae4 subtle border */
  --foreground: 42 14% 7%;           /* #111008 warm near-black */
  --muted-foreground: 38 10% 52%;    /* #888070 warm grey */
  --subtle: 36 8% 70%;               /* #bbb8b0 very muted */
  --spine: 42 14% 7%;                /* #111008 spine background */
  --primary: 10 74% 47%;             /* #d4341a terracotta red */
  --primary-foreground: 0 0% 100%;
  --spine-width: 56px;
  --mono: 'JetBrains Mono', monospace;
}
```

---

## Tipografía

Importar: `https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap`

- **Display / H1–H3**: DM Serif Display cursiva 400, espaciado entre letras -0,02 em, altura de línea 0,92–1,05
- **UI/Cuerpo/Nav**: DM Sans 300–500, neutro e invisible
- **Etiquetas/Etiquetas/Año/Medio**: JetBrains Mono 400, mayúsculas, espaciado entre letras 0,12–0,20em, color silenciado
- **Títulos de pintura en la vista de trabajo**: DM Serif Mostrar cursiva, grande

---

## Efectos visuales

### 1. Lomo vertical fijo

A columna izquierda permanente, `width: var(--spine-width)`, `posición: fija`, `arriba: 0`, `abajo: 0`, `izquierda: 0`, `índice z: 200`, `background: hsl(var(--spine))`. Contiene el nombre del artista escrito verticalmente: 

```css
.spine-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: 'DM Serif Display', serif;
  font-style: italic;
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(253, 252, 250, 0.28);
  user-select: none;
}
```

Todo el contenido de la página está desplazado por `margin-left: var(--spine-width)`.

### 2. Pintar caja de luz en pantalla completa

Al hacer clic en cualquier pintura, se abre una caja de luz en pantalla completa (fija, índice z). 500):
- `background: hsl(var(--foreground))` — profundo casi negro
- Pintura centrada, `altura máxima: 90vh`, `ancho máximo: 90vw`, `ajuste de objeto: contener`
- La pintura ingresa: `initial={{ opacity: 0, scale: 0.94 }}` → `animate={{ opacity: 1, scale: 1 }}`, duración 0,45 s, facilidad `[0,16, 1, 0,3, 1]`
- Botón de cerrar (arriba a la derecha): "✕" en JetBrains Mono, `color: rgba(253,252,250,0.5)`, al pasar el mouse en primer plano
- Título de la pintura + medio + año debajo de la pintura: DM Serif Mostrar cursiva 18px cálida white
- Al hacer clic en el fondo se cierra la caja de luz
- Las flechas izquierda/derecha del teclado navegan entre las pinturas

### 3. Colocar el cursor sobre la pinturarevelar - título + año

On cada tarjeta de pintura al pasar el cursor:
```
Overlay: position absolute, inset 0
Background: linear-gradient(to top, rgba(17,16,8,0.72) 0%, transparent 50%)
Title: DM Serif Display italic 17px — slides up from y:10 to y:0, opacity 0→1, duration 0.3s
Year + medium: JetBrains Mono 9px — same stagger
```

### 4. Entrada de sección activada por desplazamiento

Todas las secciones:
```
initial={{ opacity: 0, y: 28 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
Trigger: useInView, once: true, margin: '-60px'
Stagger children: delay: index * 0.08
```

### 5. Entrada de la pintura del héroe

La pintura del héroe aumenta con la carga:
```
initial={{ opacity: 0, scale: 1.03 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
```

### 6. Línea de acento roja

A 1px `hsl(var(--primary))` La línea horizontal se anima en la sección anterior encabezados:
```
initial={{ scaleX: 0, transformOrigin: 'left' }}
animate={{ scaleX: 1 }}
transition={{ duration: 0.5, ease: 'easeOut' }}
Width: 36px
```

---

## Desglose de la sección

### Sección 1: Lomo + barra de navegación

**Lomo**: columna izquierda fija, 56 píxeles de ancho, oscura. "Yuki Nakamura" escrito verticalmente (ver Efectos visuales).

**Navbar**: Parte superior fija, `left: var(--spine-width)`, `derecha: 0`, `background: hsl(var(--background) / 0.96)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid hsl(var(--border))`. Alto 60px. Relleno 0 56px. `display: flex`, justify-between, align-items center.

- Izquierda: "Yuki Nakamura" — DM Serif Mostrar cursiva 16px, espacio entre letras -0.01em, color de primer plano
- Enlaces centrales: Trabajo · Serie · Exposiciones · Acerca de — DM Sans 12px peso 400, color primer plano silenciado, espacio entre letras 0,02 em. Al pasar el mouse: color de primer plano.
- Derecha: "Contacto →" — DM Sans 12px, color de primer plano, fondo ninguno, borde ninguno, `border-bottom: 1px solid hsl(var(--foreground))`, puntero del cursor. Al pasar el mouse: color primario, color de borde primario.

---

### Sección 2: Héroe (pintura única destacada, tamaño máximo)

Altura de la ventana gráfica completa, `padding-top: 60px` (altura de navegación). Antecedentes: `hsl(var(--surface))`. La pintura es el héroe completo, sin texto que compita.

**Diseño**: `display: grid`, `grid-template-rows: 1fr auto`, `height: calc(100vh - 60px)`.

**Bloque superior: pintura (ocupa ~80% de la altura de la ventana gráfica)**:

A una sola pintura grande destacada llena el espacio. `relleno: 40px 56px 0`. La pintura en sí: `alto: 100%`, `ancho: 100%`, `objeto-ajuste: contener`, `objeto-posición: centro`.

```
{/* Image: large-scale contemporary oil painting, expressive gestural marks, rich earthy pigments — ochre, burnt sienna, raw umber, pale grey — on linen canvas, professional gallery documentation photography, neutral grey gallery wall background */}
<motion.img
  src=""
  alt="Dissolution I — oil on linen, 200×160cm, 2025"
  className="h-full w-full object-contain object-center"
  style={{ entering animation: scale 1.03→1 }}
/>
```

**Barra de título inferior**: `relleno: 20px 56px`, `border-top: 1px solid hsl(var(--border))`, `display: flex`, justificar entre, alinear elementos en el centro.

- Izquierda: Título de la pintura en DM Serif Mostrar cursiva 20px en primer plano + medio + dimensiones en JetBrains Mono 10px silenciado debajo, espacio de 4px
- Centro: Puntos de navegación: 6 puntos, punto activo lleno `hsl(var(--foreground))`,inactivo `hsl(var(--border))`, ancho 6px alto 6px radio de borde 50%. Al hacer clic se navega a esa pintura. Gap 8px.
- Derecha: "1/6" en JetBrains Mono 10px silenciado + `<` `>` botones de flecha, 28px × 28px, `border: 1px solid hsl(var(--border))`, color silenciado, desplazamiento: primer plano con color de borde. Espacio de 8 píxeles entre flechas.

Hero recorre 6 pinturas destacadas. Avance automático cada 6 segundos (pausa al pasar el mouse).

---

### Sección 3: Obras seleccionadas (primera cuadrícula de pintura)

`background: hsl(var(--background))`, relleno 80px 56px. Esta es la sección principal de la galería.

**Fila de encabezado**: `display: flex`, justify-between, align-items flex-end, margin-bottom 48px.
- H2: DM Serif Display cursiva, clamp(38px, 4vw, 54px), "*pinturas seleccionadas.*"
- Derecha: chips de filtro: todo · Óleo · Acrílico · Técnica mixta: DM Sans 12px, `border: 1px solid hsl(var(--border))`, relleno 6px 14px, radio de borde 100px. Activo: `background: hsl(var(--foreground))`, color blanco, color de borde transparente. Inactivo: coloque el cursor sobre el color del borde en primer plano.

**Cuadrícula de galería**: `display: grid`, `grid-template-columns: repeat(3, 1fr)`, espacio de 12px. Activa el desvanecimiento escalonado en el desplazamiento. 

12 pinturas en total, mostradas 3 por fila. Cada tarjeta: desbordamiento oculto, puntero del cursor, `border: 1px solid hsl(var(--border-soft))`. Al hacer clic: abrir lightbox.

**Estructura de tarjeta de pintura:**
- Imagen de pintura: `aspect-ratio: var(--painting-ratio)` (use 4/5 como predeterminado, anule por pintura con estilo en línea), `object-fit: cover`, `object-position: center`, `width: 100%`. Animación al pasar el mouse a escala.
: superposición al pasar el mouse (ver Efectos visuales)
: franja de información debajo de la pintura (relleno 12px 0 20px, `border-bottom: 1px solid hsl(var(--border))`):
: Título: DM Serif Mostrar cursiva 15px en primer plano
: Medio + año: JetBrains Mono 9px mayúsculas silenciadas, margen superior 4px

Contenido de pintura (resúmenes de fotografía + metadatos):

```
[1] {/* Image: large oil painting on linen, warm earthy palette, loose gestural marks suggesting landscape or figure, rich impasto texture, gallery installation shot on white wall */}
Title: "Dissolution I" · Oil on linen, 200×160cm · 2025

[2] {/* Image: contemporary abstract painting, cool blue-grey tones with warm ochre interruptions, smooth blended passages alternating with heavy palette-knife marks */}
Title: "Meridian Blue" · Oil and wax on canvas, 180×140cm · 2024

[3] {/* Image: figurative painting, loosely rendered solitary figure in interior space, muted tonality, soft edges dissolving into ground, contemplative mood */}
Title: "The Threshold" · Oil on linen, 160×120cm · 2024

[4] {/* Image: large vertical painting, deep burgundy and charcoal ground with pale luminous shapes emerging, heavily worked surface, traces of previous layers visible */}
Title: "Night Archive" · Oil on canvas, 240×180cm · 2024

[5] {/* Image: horizontal landscape-format painting, pale silvery light, horizon implied not stated, minimal marks on large expanse of toned ground */}
Title: "Hakodate (Winter)" · Oil on linen, 200×140cm · 2023

[6] {/* Image: intimate small-scale painting, warm amber and sienna tones, circular or oval form floating on neutral ground, meditative quality */}
Title: "Evidence I" · Oil on panel, 60×50cm · 2023

[7] {/* Image: gestural abstract painting in vivid unexpected color — electric teal against warm red-orange ground, expressive urgent marks */}
Title: "Interruption" · Acrylic on canvas, 160×120cm · 2023

[8] {/* Image: diptych painting, two related panels with similar marks in different keys, cool left panel warm right panel, shown as pair */}
Title: "Correspondence (I & II)" · Oil on linen, 2 × 100×80cm · 2022

[9] {/* Image: large abstract painting with dense layered surface, map-like quality, subtle shifts in tone suggesting depth and time, quiet and complex */}
Title: "Stratum" · Oil and cold wax, 180×180cm · 2022

[10] {/* Image: painting with strong geometric armature softened by gestural painting, grid or window-like structure emerging from heavily worked ground */}
Title: "Interior Grid" · Mixed media on canvas, 140×110cm · 2022

[11] {/* Image: figurative painting fragment, close-cropped hands or face, tender observation, warm skin tones against cool grey */}
Title: "Study (Hands)" · Oil on panel, 40×30cm · 2021

[12] {/* Image: large dark painting, almost monochrome, subtle texture and tone variations across the surface, a sense of compressed space and pressure */}
Title: "Weight" · Oil on linen, 220×170cm · 2021
```

**Botón "Cargar más"** debajo de la cuadrícula (margen superior 40px, centrado): DM Sans 12px, `border: 1px solid hsl(var(--border))`, relleno 11px 28px, color de primer plano apagado, desplazamiento: color de borde, color de primer plano, primer plano.

---

### Sección 4: Serie destacada

`background: hsl(var(--surface))`, `border-top: 1px solid hsl(var(--border))`, relleno 80px 56px.

**Encabezado**: línea de acento roja revelada. H2: DM Serif Mostrar cursiva, clamp(36px, 3.5vw, 50px): "*Serie* enfocus."

**Tres series, cada una en una fila**:

`display: flex`, columna de dirección flexible, espacio 0. Cada fila de serie: `display: grid`, `grid-template-columns: 1fr 2fr`, espacio 0, `border-top: 1px solid hsl(var(--border))`, relleno 40px 0.

Estructura de filas:
- Izquierda: columna de información de la serie (relleno-derecha 48px, `border-right: 1px solid hsl(var(--border))`)
 - Título de la serie en DM Serif Mostrar cursiva 28px en primer plano
 - Rango de años en JetBrains Mono 10px silenciado, margen superior 6px
 - Descripción en DM Sans 300 14px altura de línea silenciada 1.85, margen superior 16px, ancho máximo 320px
 - Enlace de texto "Ver serie →", DM Sans 12px en primer plano, borde inferior 1px, margen superior 24px
- Derecha: fila desplazable horizontal de miniaturas de pintura, `padding-left: 40px`, `display: flex`, espacio 10px, `overflow-x: auto`, `scrollbar-width: none` Cada pulgar: `height: 200px`, `width: auto`, `flex-shrink: 0`, `border: 1px solid hsl(var(--border-soft))`, cubierta de ajuste de objeto.

Three. serie:

**1. Disolución** (2024–2025) — 8 pinturas
"Una investigación continua sobre el punto en el que una forma deja de ser reconocible. ¿Dónde termina la figura y comienza el campo?"

Resúmenes fotográficos para 4 pulgares visibles:
```
[T1] {/* oil painting warm earthy tones, gestural marks on linen */}
[T2] {/* related painting same series, cooler palette, similar gesture */}
[T3] {/* vertical format, pale ground with dark dissolved form */}
[T4] {/* heavily worked surface, multiple layers visible at edges */}
```

**2. Archivo Nocturno** (2023–2024) — 6 pinturas
"Obras realizadas después de medianoche. El estudio de noche tiene una calidad de silencio diferente. Estas pinturas saben algo que las diurnas no saben."

```
[T1] {/* dark ground painting, luminous shape emerging from darkness */}
[T2] {/* deep burgundy and charcoal, oil on canvas, large format */}
[T3] {/* near-black painting with warm undertones glowing through */}
[T4] {/* small study, candlelit quality, intimate scale */}
```

**3. Evidencia** (2021–2023) — 9 pinturas
"Obras de pequeño formato realizadas a modo de toma de notas. Cada pintura registra algo visto, visto a medias o recordado de manera diferente cada vez."

```
[T1] {/* small panel, warm amber tone, single soft form */}
[T2] {/* intimate study, muted grey with single warm note */}
[T3] {/* oil on panel, pale ground, delicate mark-making */}
[T4] {/* small square format, earthy ground, spare marks */}
```

---

### Sección 5: Característica de trabajo único (extraíble editorial)

Ancho completo, `background: hsl(var(--foreground))`, relleno 0. Inversión oscura: la pintura se ubica en un campo casi negro como lo haría en una galería oscura.

`display: grid`, `grid-template-columns: 1fr 380px`, `min-height: 80vh`.

**Izquierda: pintura** (relleno 60px, visualización flexible, alineación de elementos en el centro, justificar-centro de contenido):
```
{/* Image: commanding large-scale oil painting, rich pigment, compelling presence, centered on dark background as if lit in a gallery, atmospheric lighting */}
<img src="" alt="Dissolution IV — oil on linen, 240×180cm" className="max-h-[80vh] max-w-full object-contain" />
```

**Derecha: detalles** (relleno 60px 48px, `border-left: 1px solid rgba(253,252,250,0.1)`, visualización flexible, columna de dirección flexible, justificar-centro de contenido,espacio 28px):

- "En foco" — JetBrains Mono 9px espaciado entre letras mayúsculas 0,18em, `color: hsl(var(--primary))`, margen inferior 8px
- Título: DM Serif Mostrar cursiva 32px `color: hsl(var(--background))`
- Lista de metadatos (espacio 14px):
 - Año: JetBrains Mono 9px etiqueta silenciada + valor en DM Sans 300 14px blanco cálido
 - Medio: mismo patrón
 - Dimensiones: mismo
 - Serie: mismo
 - Disponible: "Colección privada" — DM Sans 13px `rgba(253,252,250,0.5)`
- Regla horizontal: 1px `rgba(253,252,250,0.1)`, margen 8px 0
- Declaración (2 párrafos cortos): DM Sans 300 14px `rgba(253,252,250,0.55)` line-height 1.9
- "Ver pintura completa →" — DM Sans 12px `hsl(var(--background))`, `background: hsl(var(--primary))`, relleno 11px 20px, radio de borde 1px, margen superior 8px, bloque en línea de visualización, contenido de ajuste de ancho

Contenido:
- **Título**: "Disolución IV"
- **Año**: 2025
- **Medio**: Óleo sobre lino
- **Dimensiones**: 240 × 180 cm
- **Serie**: Disolución (2024–2025)
- **Disponible**: Colección particular
- **Declaración**: "Hecho durante cuatro meses y reelaborado por completo dos veces. Lo que queda es el tercer intento de encontrar lo que la pintura intentaba ser. El suelo todavía es visible en algunos lugares; así lo quería". / "Dissolution IV se ha mostrado en Sprüth Magers (Berlín, 2025) y Sadie Coles HQ (Londres, 2024)."

---

### Sección 6 — Exposiciones

`background: hsl(var(--background))`, `border-top: 1px solid hsl(var(--border))`, padding 80px 56px.

**Encabezado**: revelación de línea roja. H2: DM Serif Display cursiva, clamp(36px, 3.5vw, 50px): "*Historial de exposiciones*". 

Pestañas: "Solo" / "Grupo" / "Todos" — DM Sans 12px, mismo estilo de chip de filtro que la sección de trabajo.

Elista de exposiciones, columna flexible, espacio 0. Cada fila:
`display: grid`, `grid-template-columns: 72px 1fr 200px 80px 60px`, gap 24px, padding 18px 0, `border-bottom: 1px solid hsl(var(--border))`, align-items baseline.

Columnas: Año · Título de la exposición · Lugar · Ciudad · Tipo insignia

Yaño: JetBrains Mono 10px silenciado.
Título: DM Serif Mostrar cursiva 15px en primer plano, desplazamiento: color primario.
Lugar: DM Sans 300 13px silenciado.
Ciudad: JetBrains Mono 9px en mayúsculas muted.
Insignia de tipo: "Solo" en`color: hsl(var(--primary))` / "Grupo" en mayúsculas JetBrains Mono 9px silenciadas. 

12 exposiciones: 
1. 2025 · “Disolución” · Sprüth Magers · Berlín · Solo
2. 2025 · “The Body Electric” (grupo) · Tate Modern · Londres · Grupo
3. 2024 · “El Borde de los Documentos” · Museo de la Espuma · Amsterdam · Solo
4. 2024 · “Nueva Pintura Ahora” · ICA · Londres · Grupo
5. 2024 · "Night Archive" · Sadie Coles HQ · Londres · Solo
6. 2023 · "Exposición del Premio Deutsche Börse" · The Photographers' Gallery · Londres · Group
7. 2023 · "Evidencia" · ESTÁNDAR (OSLO) · Oslo · Solo
8. 2022 · "Stratum" · Galerie Chantal Crousel · París · Solo
9. 2022 · "Young Artists Now" · Serpentine · Londres · Grupo
10. 2021 · "Peso" · Fondazione Prada · Milán · Grupo
11. 2020 · "Peso" · Oslo Kunsthall · Oslo · Solo
12. 2019 · "Early Works" · Studio Voltaire · Londres · Grupo

---

### Sección 7 - Acerca de

`background: hsl(var(--surface))`, `border-top: 1px solid hsl(var(--border))`, padding 80px 56px. `display: grid`, `grid-template-columns: 1fr 1fr`, espacio 80px, inicio de alineación de elementos.

**Izquierda - retrato:**

`border: 1px solid hsl(var(--border))`, desbordamiento oculto, radio de borde 1px.
```
{/* Image: artist portrait, painter in studio, surrounded by large canvases, natural light from north-facing windows, paint on hands or apron, candid and genuine, not posed */}
<img src="" alt="Yuki Nakamura in studio" className="w-full aspect-[3/4] object-cover object-center" />
```

Título debajo del retrato: "Estudio, Tokio - 2025" en JetBrains Mono 9px en mayúsculas silenciadas, margen superior 10px.

**Derecha: biografía (columna flexible, espacio de 28px):**

Línea roja revelar.
H2: DM Serif Display cursiva, clamp(32px, 3.2vw, 44px): "Acerca de *el trabajo.*"

Tres párrafos biográficos (DM Sans 300 14px silenciado altura de línea 1.9):
1. "Yuki Nakamura (n. 1986, Tokio) es una pintora que trabaja entre Tokio y Berlín. Su obra explora la resistencia del material (la forma en que la pintura al óleo retiene, rechaza y sorprende) y lo que sucede cuando la representación se lleva al punto de su propia disolución."
2. "Tiene una maestría en Bellas Artes de la Städelschule, Frankfurt (2014) y ha expuesto internacionalmente desde 2016. Su trabajo se encuentra en colecciones que incluyen la Tate Modern, Londres; el Museo Ludwig, Colonia; y el Museo Nacional de Arte, Osaka."
3. "Está representada por Sprüth Magers (Berlín/Londres) y STANDARD(OSLO)."

CV + fila de enlaces (margen superior 8px):
- "Descargar CV (PDF)" — DM Sans 12px, `border: 1px solid hsl(var(--border))`, relleno 10px 20px, color apagado. Al pasar el cursor: color de primer plano del borde, color de primer plano.
- "Presione y publicaciones →" - mismo estilo

Menciones de prensa (margen superior 32px, relleno superior 24px, `border-top: 1px solid hsl(var(--border))`):

Etiqueta: "Prensa" — JetBrains Mono 9px mayúsculas silenciadas, margen inferior 14px.
Lista de 4 citas (DM Sans 300 13px primer plano silenciado altura de línea 1.7, espacio 16px):
- "Uno de los pintores más atractivos que trabajan hoy en día." - Frieze
- "Las superficies de Nakamura mantienen una rara cualidad de atención". Guardian
- "Ganador del Premio de la Fundación de Fotografía Deutsche Börse 2023." — Deutsche Börse

---

### Sección 8 — Contacto/Representación

`background: hsl(var(--background))`, `border-top: 1px solid hsl(var(--border))`, padding 80px 56px. `display: grid`, `grid-template-columns: 1fr 1fr`, espacio 80px.

**Izquierda:**

RRevelado de línea roja.
H2: DM Serif Display cursiva, clamp(36px, 3.5vw, 50px): "Entrar *touch.*"

DM Sans 300 14px muted line-height 1.85, margin 20px 0 32px: "Para visitas al estudio, consultas de adquisiciones, propuestas de exhibición, solicitudes de prensa y todo lo demás, comuníquese directamente o a través de los representantes de su galería a continuación". 

**Bloque de representación** (dos entradas de la galería, espacio 24px):
Each: `background: hsl(var(--surface))`, `border: 1px solid hsl(var(--border))`, relleno 20px 24px, radio de borde 1px.
- Nombre de la galería: DM Serif Mostrar cursiva 17px en primer plano
- Ubicación: JetBrains Mono 9px mayúsculas silenciadas, margen superior 4px
- Contacto: DM Sans 12px silenciado, margen superior 8px, borde inferior 1px borde al pasar el mouse

Galerías:
- **Sprüth Magers** · Berlín y Londres · info@spruethmagers.com
- **ESTÁNDAR (OSLO)** · Oslo · mail@standardoslo.no

Contacto directo:
- studio@yukinakamura.com — DM Sans 13px en primer plano, `border-bottom: 1px solid hsl(var(--border))`

**Derecha — formulario de contacto:**

DM Serif Mostrar cursiva 20px en primer plano "Enviar un *mensaje.*", margen inferior 24px.

Campos de formulario (DM Sans 13px, espacio 12px, columna flexible):
- Nombre (ancho completo)
-Correo electrónico (ancho completo)
- Tipo de consulta seleccione: Visita al estudio · Adquisición · Propuesta de exposición · Prensa · Otro
- Área de texto del mensaje, 5 filas

Atodas las entradas: `background: hsl(var(--surface))`, `border: 1px solid hsl(var(--border))`, relleno 12px 16px, radio de borde 1px, color primer plano. Enfoque: `border-color: hsl(var(--primary))`, contorno ninguno.

Enviar: `background: hsl(var(--foreground))`, color `hsl(var(--background))`, DM Sans 12px peso 500 espacio entre letras mayúsculas 0,06em, relleno 13px, ancho completo, radio de borde 1px. Colocar el cursor sobre: ​​`background: hsl(var(--primary))`.

---

### Sección 9 — Pie de página

`background: hsl(var(--foreground))` (casi negro). Relleno 40px 56px.

`display: flex`, justify-between, align-items center.

- Izquierda: "Yuki Nakamura" — DM Serif Mostrar cursiva 15px, `color: rgba(253,252,250,0.4)`
- Centro: Enlaces de navegación (Trabajo · Serie · Exposiciones · Acerca de) — JetBrains Mono 9px mayúsculas `rgba(253,252,250,0.25)`, espacio 24px
- Derecha: "© 2026" + ícono de Instagram — JetBrains Mono 9px `rgba(253,252,250,0.25)`

---

## Resumen de animaciones

| Elemento | Animación | Gatillo |
|---|---|---|
| Pintura de héroe | escala 1.03→1, opacidad 0→1 | En montaje, retraso de 0,2 s |
| Barra de títulos de héroe | desvanecimiento y:16 | En montaje, retraso de 0,6 s |
| Avance automático del héroe | Fundido cruzado, intervalo de 6 s | Temporizador, pausa al pasar el mouse |
| Cuadros de rejilla de trabajo | Desvanecimiento escalonado | Desplácese hacia Ver |
| Superposición de pintura | Título/año deslizable y:10 | Colocar el cursor sobre |
| Abrir/cerrar caja de luz | Escala + desvanecimiento | Haga clic en |
| Miniaturas de series | Desvanecimiento escalonado | Desplácese hacia Ver |
| Divisores de línea roja | escalaX 0→1 | Desplácese hacia Ver |
| Filas de exposición | Desvanecimiento escalonado | Desplácese hacia Ver |
| Todas las secciones | Desvanecimiento y:28 | Desplácese hacia Ver |

---

## Responsive

**Móvil (< 768px):**
- Lomo: oculto en el móvil (demasiado estrecho). Nombre del artista movido a nav.
- Navegación: hamburguesa → superposición oscura en pantalla completa con todos los enlaces
- Héroe: pintura de ancho completo, `relación de aspecto: 3/4`, título debajo
- Cuadrícula de trabajo: una sola columna, pinturas de ancho completo
- Sección de serie: una sola columna, miniaturas de desplazamiento horizontal
- Sección de funciones oscuras:columna única, pintura arriba info
- Exposiciones: ocultar columnas de lugar/ciudad, mostrar solo año + título + tipo
- Acerca de: columna única
- Contacto: columna única
- Pie de página: apilado, centrado

**Tableta (768px–1024px):**
- Lomo: 40px de ancho
- Cuadrícula de trabajo: 2 columnas
- Filas de serie: mantenga 2 columnas pero reduzca el espacio

---

## Clave Dependencias

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.400.x",
  "@radix-ui/react-select": "^2.x",
  "@radix-ui/react-tabs": "^1.x"
}
```

---

## Notas rápidas

- Las 12 imágenes de trabajo + 4 miniaturas de series + 1 retrato se describen como resúmenes fotográficos: cualquier fotografía de pintura al óleo contemporánea en el estado de ánimo descrito funcionará. Cuanto más liviana sea la herramienta de IA, más simple será la generación de imágenes: las descripciones están escritas para ser flexibles.
- La caja de luz es el elemento técnicamente más complejo; si la herramienta de IA lo representa parcialmente, todavía funciona como una cuadrícula de revelación al pasar el cursor.
- El nombre del artista "Yuki Nakamura" y todos los detalles de la galería/exposición son marcadores de posición: reemplácelos con información real antes de publicar.