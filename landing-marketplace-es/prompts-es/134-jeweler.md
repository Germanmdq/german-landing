# Break Surf Co. — Aviso del sitio web de la escuela de surf

## Objetivo
Cree un sitio web de escuela de surf audaz y enérgico para "Break Surf Co." — fondo azul océano profundo, detalles en cobalto eléctrico, tipografía de arena cálida, tipografía Bebas Neue, fotografía aérea del océano con sangrado completo y una cuadrícula de horarios de clases. 

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

## Design Sistema

### Colores
```css
:root {
  --background: 212 65% 17%;
  --foreground: 0 0% 100%;
  --primary: 210 74% 47%;
  --accent: 37 38% 63%;
  --muted-foreground: 212 20% 72%;
  --border: 212 30% 26%;
}
```

Referencia ex:
- Fondo: #0d2b4a (azul marino de océano profundo)
- Primer plano: #ffffff (blanco)
- Primario (cobalto eléctrico): #1a6fd4
- Acento (arena cálida): #c9b47a
- Silenciado: #9eb4cc
- Borde: #1e3d5c

### Tipografía
Importación de fuentes de Google:
`https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300,400&display=swap`

- Todas las visualizaciones/titulares: Bebas Neue 400, espacio entre letras: 0,02 em
- Cuerpo/descripciones: Inter 400
- Subtítulos/etiquetas: Inter 300

## Efectos visuales

### Efecto 1: Texto de desbordamiento de fondo
```css
.bg-surf-text {
  position: absolute;
  font-family: 'Bebas Neue', cursive;
  font-size: clamp(250px, 36vw, 520px);
  opacity: 0.04;
  color: #ffffff;
  right: -6%;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
  letter-spacing: 0.04em;
}
```
Texto: "SURF"

### Efecto 2: Héroe de zona dual Degradado
```css
background: linear-gradient(
  to bottom,
  rgba(13,43,74,0.78) 0%,
  transparent 40%,
  transparent 58%,
  rgba(13,43,74,0.90) 100%
);
```
Mantiene el área de navegación y el área de contenido legibles mientras la fotografía aérea del océano respira a través del centro.

### Efecto 3: Chips de insignias animados (héroe)
3 Insignias de color arena se animan desde la izquierda con escalonamiento después CTA:
"Principiante" · "Intermedio" · "Avanzado"
Each: fondo: rgba(201,180,122,0.15), borde: 0.5px sólido #c9b47a, color: #c9b47a, radio del borde: 100px, relleno: 6px 18px, Inter 300, 12px, espacio entre letras: 0,1em.
Framer Motion: inicial={{ opacidad: 0, x: -20 }}, animate={{ opacidad: 1, x: 0 }}, transición={{ retraso: 0,6 + índice * 0,12, duración: 0,45, facilidad: 'easeOut' }}

### Efecto 4: Tira de estadísticas de conteo
4 las estadísticas se animan desde 0 al desplazarse hacia la vista:
2,400+ estudiantes · 12 años · Calificación 4.8★ · Todo el equipo incluido
Bebas Neue, 52px, blanco para números. Inter 300, 13px, arena (#c9b47a) para etiquetas.
Use un gancho de contador simple: startValue: 0, endValue: número,duración: 1,5 s en whileInView.

### Efecto 5: Programar el desplazamiento de la cuadrícula
 Cada espacio disponible: el desplazamiento se rellena con fondo de cobalto (#1a6fd4), texto blanco, transición: 0,15 s de facilidad. Ranuras "completas": silenciadas permanentemente con estilo tachado.

## Desglose de componentes

### 1. Barra de navegación
- Parte superior fija, fondo: rgba(13,43,74,0.92), filtro de fondo: desenfoque(14px)
- Alto: 64px
- Izquierda: "BREAK" en Bebas Neue, 22px, blanco + "SURF CO." en Bebas Neue, 22px, arena (#c9b47a)
- Centro: Inter 300, 12px, espacio entre letras: 0,14em, mayúsculas, blanco 80% — Lecciones / Horario / Equipo / Acerca de / Libro
- Derecha: "Reservar una lección" — cobalt bg (#1a6fd4), texto blanco, Inter 400, 12 px, radio de borde: 6 px, relleno: 9 px 20 px
- Borde inferior: 0,5 px sólido hsl(var(--border))
- Navegación flotante: cobalto (#1a6fd4). Transición: 0,18 s.

### 2. Hero
Vista completa, posición: relativa, desbordamiento: oculto.

**Imagen de fondo:**
{/* Imagen: espectacular fotografía aérea con drones del océano directamente desde arriba, disparando hacia aguas de color turquesa oscuro y azul verdoso profundo. Las olas rompen y forman patrones de espuma de aguas blancas que crean patrones orgánicos contra el agua más oscura. Un surfista solitario es visible en el encuadre como una pequeña figura sobre una tabla de surf, dando escala a la inmensidad del océano. El agua tiene textura y movimiento. No se ve ninguna playa: océano puro desde arriba. Tomada a plena luz del día con colores saturados. Estado de ánimo: aventura, escala, libertad, poder elemental. */}
<img src="" alt="Vista aérea de las olas del océano con un surfista solitario desde arriba" style={{ objectFit: 'cover', objectPosition: 'center', ancho: '100%', alto: '100%', posición: 'absoluta', recuadro: 0 }} />

**Gradiente Superposición:**
```css
background: linear-gradient(
  to bottom,
  rgba(13,43,74,0.78) 0%,
  transparent 40%,
  transparent 58%,
  rgba(13,43,74,0.90) 100%
);
```
Posición: absoluta, recuadro: 0, índice z: 1.

**Texto de fondo (índice z: 0):**
"SURF" — Bebas Neue, clamp(250px,36vw,520px), opacidad: 0.04, blanco, derecha: -6%, arriba: 50%, traducirY(-50%), selección de usuario: ninguna.

**Contenido (índice z: 10):**
Posición: absoluta, abajo: 10vh, izquierda: 6%, ancho máximo: 700px.

- Titular: "ATRAPA TU PRIMEROWAVE." — Bebas Neue, clamp(62px,9vw,148px), espacio entre letras: 0,04 em, blanco, altura de línea: 1,0, margen inferior: 16px
- Framer Motion: inicial={{ opacidad: 0, y: 30 }}, animate={{ opacidad: 1, y: 0 }}, transición={{ duración: 0.8, facilidad: [0.16,1,0.3,1] }}

- Sub: "Clases de surf profesionales en Newquay para principiantes y surfistas experimentados. Todo el equipo incluido." — Inter 300, 18px, blanco 80%, ancho máximo: 500px, margen inferior: 32px
- Movimiento del marco: retraso: 0.15s

- CTA (flexible, espacio: 14px, margen inferior: 28px):
 - "Reserve un Lección" — cobalt bg (#1a6fd4), texto blanco, Inter 400, 13px, radio de borde: 8px, relleno: 14px 32px
 - "Ver tipos de lecciones" — transparente, borde: 1.5px solid rgba(255,255,255,0.6), texto blanco, misma fuente, misma padding
 - Movimiento del encuadrador: retardo: 0,25 s

- 3 chips de insignia de arena (flexible, espacio: 10 px): 
 "Principiante" · "Intermedio" · "Avanzado" 
 Escalonado: retardo: 0,6 s + índice × 0,12 s, x: -20→0, opacidad: 0→1

### 3. Sección de niveles de lección
Fondo: hsl(var(--background)). 11px, arena (#c9b47a), espacio entre letras: 0,18em, mayúsculas, margen inferior: 12px: "NUESTRAS LECCIONES"
- Bebas Neue, clamp(36px,5.5vw,80px), blanco, espacio entre letras: 0,02em, margen inferior: 56px: "ENCUENTRA TU NIVEL."

**3 tarjetas de nivel: cuadrícula de 3 columnas, espacio: 20 px:**
Ecada: posición: relativa, desbordamiento: oculto, sin radio de borde, relación de aspecto: 3/4.
Hover: escala: 1,02, sombra de cuadro: 0 8px 32px rgba(26,111,212,0.35) Transición: 0.3s de facilidad.

Diseño de tarjeta:
- 60% superior: fotografía de surf con sangrado completo
- 40% inferior: Ocean Navy bg (#0d2b4a), relleno: 28px. 24px
 - Inter 300, 11px, arena, espacio entre letras: 0,16em: etiqueta de nivel
 - Bebas Neue, 36px, blanco, espacio entre letras: 0,02em: nombre del nivel
 - Inter 300, 14px, blanco 70%, altura de línea: 1.6: descripción
 - Fila: Inter 300, 12px, arena: duración + tamaño del grupo
 - Inter 400, 14px, blanco, margen superior: 12px: precio
 - Botón "Reservar este nivel": cobalto bg, texto blanco, Inter 400, 12px, radio de borde: 6 píxeles,relleno: 10px 20px, margen superior: 16px, pantalla: inline-block

**Los 3 niveles:**

1. Principiante
{/* Imagen: fotografía de acción de un surfista principiante (un adulto joven o un adolescente) montando una pequeña ola de aguas bravas en la orilla de la costa sobre una tabla larga ancha. El agua es poco profunda y de un blanco espumoso. El surfista tiene los brazos extendidos para mantener el equilibrio y mira hacia la tabla. Luz del día brillante, cielo azul. Estado de ánimo: accesible, alcanzable, alegría por primera vez. */}
<img src="" alt="Surfista principiante montando olas de aguas bravas en longboard" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />
"Principiante" / "Aprenda lo básico: cómo remar, elevarse y montar olas de aguas bravas. No se requiere experiencia." / Duración: 2 horas · Grupo: máx 6 / Desde £55/sesión

2. Intermedio
{/* Imagen: Fotografía de surf de nivel medio de un surfista en una tabla de surf de longitud media cabalgando sobre la cara de una ola verde continua. La ola mide entre 3 y 4 pies de altura y se curva suavemente. El surfista está en una postura sólida, con los brazos extendidos, cruzando la cara de la ola. Océano al fondo. Luz costera brillante. Estado de ánimo: progresión, confianza, fluidez. */}
<img src="" alt="Surfista intermedio cabalgando la cara de una ola verde del océano" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />
"Intermedio" / "Trabaja en tu técnica de remo, lectura de olas y cómo llegar a la cara verde. Grupo pequeño entrenamiento." / Duración: 2 horas · Grupo: máx 4 / Desde £65/sesión

3. Advanced
{/* Imagen: Fotografía profesional de acción de surf de un surfista experimentado dentro o en el borde de una ola más grande de 5 a 6 pies, ejecutando un giro carving con espuma volando desde la cola. El surfista se encuentra en una postura baja y dinámica. Ola azul cristalina con spray blanco. Iluminación dramática. Estado de ánimo: dominio, potencia, máximo rendimiento. */}
<img src="" alt="Surfer carving avanzado activa una ola grande con spray" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />
"Avanzado" / "Montar en tubo, maniobras y llevar tu surf al siguiente nivel. Máximo dos por entrenador." / Duración: 2 horas · Grupo: máx 2 /Desde £ 75/sesión

Framer Motion: escalonado 0,12 s, opacidad 0→1, y 24→0, viewport={{ once: true }}

### 4. Cuadrícula de programación semanal
Fondo: #091f37 (océano más oscuro). Relleno: 100px 6%.

**Encabezado:**
- Inter 300, 11px, arena, espacio entre letras: 0,18em, mayúsculas: "HORARIO SEMANAL"
- Bebas Neue, 64px, blanco: "ESTA SEMANA" CLASES."
- Margen inferior: 48px

**Diseño de cuadrícula:**
7 columnas (lunes a domingo) × 4 filas (encabezado + 3 intervalos de tiempo).
CSS Cuadrícula: columnas de plantilla de cuadrícula: repetir(7, 1fr), espacio: 2px.

Row 0 - encabezados del día: Bebas Neue, 18px, arena. Días: "LUN" / "MAR" / "MIÉ" / "JUE" / "VIE" / "SAT" / "DOM"
 Filas 1 a 3 — franjas horarias: 
- Etiqueta de tiempo: Bebas Neue, 14 px, blanco 60 %, relleno: 4 px 0
- Ranura disponible: fondo: rgba(26,111,212,0.15), borde: 0.5px cobalto sólido, color: blanco, relleno: 14px 10px, alineación de texto: centro, Inter 300, 12px, cursor: puntero.
 Desplazamiento: fondo: #1a6fd4, color: blanco. Transición: 0,15 s de facilidad.
- Ranura completa: fondo: rgba(255,255,255,0.04), borde: 0.5px rgba sólido(255,255,255,0.08), Inter 300, 12px, blanco 35%, texto: "Completo"

**3 veces filas:**
- Fila 1: "7 a.m. MAÑANA"
- Fila 2: "12 p.m. MEDIODÍA"
- Fila 3: "5 p.m. PUESTA DEL SOL"

Patrón de lunes a viernes: la mayoría de los espacios disponibles, un par lleno.
Sáb-domingo: horarios de compensación: 8 a.m. / 12 p.m. / 5:30 p.m.

Abajo de la cuadrícula: fila flexible, espacio: 16px, margen superior: 24px — chips de leyenda:
"● Disponible" (chip de cobalto) y "● Completo" (chip gris)

### 5. Galería de acciones
Antecedentes: #0d2b4a. Relleno: 0 (al ras). Cuadrícula de 2×2, espacio: 2px.

**4 imágenes: cada relación de aspecto: 1/1:**
Hover: escala: 1,03. Transición: 0,3 s de facilidad. No border-radius.

{/* Imagen: Toma aérea con dron de un surfista fotografiado directamente desde arriba, montando una ola. La cámara está colocada en lo alto y muestra al surfista como una pequeña figura en la cara de la ola, mientras el océano lo rodea en varios tonos de azul y turquesa. Dramática perspectiva a vista de pájaro. */}
<img src="" alt="Vista aérea de un surfista montando una ola desde arriba" style={{ objectFit: 'cover',objectPosition: 'center', width: '100%', height: '100%' }} />

{/* Imagen: Fotografía en primer plano de una ola en el momento de romper: el agua transparente de color azul verdoso de la cara de la ola con la luz del sol refractándose a través de ella, creando una textura vítrea. El labio ondulado apenas comienza a curvarse. No se ve ningún surfista. Textura de onda pura. Estado de ánimo: elemental, poder, belleza. */}
<img src="" alt="Primer plano de la cara de las olas del océano con la luz del sol refractándose a través del agua" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />

{/* Imagen: Fotografía en la playa de una lección grupal de surf en la arena antes de entrar al agua. El entrenador está demostrando la técnica del 'pop-up' mientras 5 o 6 estudiantes en trajes de neopreno yacen sobre sus tablas en la arena, observando e imitando. Día costero brillante. Estado de ánimo: comunidad, aprendizaje, diversión. */}
<img src="" alt="Lección de surf grupal en la playa con un entrenador demostrando la técnica del pop-up" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />

{/* Imagen: fotografía detallada en primer plano de las manos de un instructor de surf ajustando el calce en los hombros de un traje de neopreno a un estudiante, ambos de pie en la playa con el océano en un suave foco detrás. Una mano del instructor visible, luz natural cálida. Estado de ánimo: cuidado, atención personalizada, preparación. */}
<img src="" alt="Instructor de surf ajustando el traje de neopreno a un estudiante en la playa" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />

### 6. Sección de equipo incluido
Antecedentes: #0d2b4a. Relleno: 80px 6%. Diseño: flexible, justificar contenido: espacio entre, alinear elementos: centro, espacio: 48 px.

**Izquierda (60%):**
- Inter 300, 11 px, arena, espacio entre letras: 0,18 em, mayúsculas, margen inferior: 12 px: "GEAR INCLUIDO"
- Bebas Neue, clamp(36px,5vw,72px), blanco, margen inferior: 24px: "TODO LO QUE NECESITAS NADA QUE TRAER."
- Inter 300, 16px, blanco 70%, altura de línea: 1.65, margen inferior: 32px: "Cada lección incluye un completo Traje de neopreno de invierno de 5/4 mm, una tabla de surf adaptada a tu nivel, una correa y cera. Solo preséntate."
- Lista de chips de cobalto (flex, flex-wrap: wrap,brecha: 10px):
 Cada chip: fondo: rgba(26,111,212,0.2), borde: 0.5px cobalto sólido, color: blanco, radio del borde: 100px, relleno: 7px 16px, Inter 300, 13px.
 "Traje de neopreno (todos los tamaños)" · "Tabla de surf" · "Correa" · "Cera" · "Almacenamiento de toallas"

**Derecha (40%):**
{/* Imagen: Fotografía de producto desde arriba y en plano sobre una superficie de arena de playa: un traje de neopreno (parcialmente doblado), una tabla de surf de espuma en posición vertical apoyada contra rocas o una pared, y un rollo de correa de tabla de surf visible. Todo el equipo en break surf co. Tonos azules o neutros. Limpio y organizado. Estado de ánimo: equipo de calidad, bien mantenido, profesional. */}
<img src="" alt="Equipo de surf plano que incluye traje de neopreno, tabla de surf y correa" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', borderRadius: '0' }} />
(contenedor: width 100%, relación de aspecto: 4/3, sin radio de borde)

### 7. Tira de estadísticas de conteo
Fondo: #091f37. Relleno: 56px 6%. Borde superior e inferior: 1px sólido hsl(var(--border)).

**Diseño de 4 columnas (4 estadísticas):**
Each: text-align: center.
- Bebas Neue, 64px, blanco: número (cuenta hacia arriba en el desplazamiento)
- Inter 300, 13px, arena (#c9b47a), espacio entre letras: 0,12 em: etiqueta

Las 4 estadísticas:
1. "2400+" / "ESTUDIANTES ENTRENADOS"
2. "12" / "AÑOS EN NEWQUAY"
3. "4.8★" / "CALIFICACIÓN DE GOOGLE"
4. "100%" / "EQUIPO PROPORCIONADO"

Enganche de conteo: en whileInView, cuente desde 0 hasta el valor objetivo en 1,5 segundos con facilidad.

### 8. Testimonios
Antecedentes: #0d2b4a. Relleno: 80px 6%. Ancho máximo: 720 px, margen: automático.

**2 testimonios:**
Eada: borde izquierdo: 2 px sólido #1a6fd4 (cobalto), relleno izquierdo: 24 px, margen inferior: 40 px.
- Inter 400, 17 px, blanco 85%, altura de línea: 1,65: cita
- Inter 300, 12px, arena (#c9b47a), espacio entre letras: 0,12em, margen superior: 12px: atribución

Cita 1: "Siempre le había tenido miedo al agua. Las vacaciones cambiaron eso por completo. Mi primer día que estuve arriba el tablero en 20 minutos. El mejor dinero que he gastado. — Sophie L., Bristol"
Cita 2: "Vinimos como un grupo de 6 yTuve el mejor fin de semana del año. Los entrenadores son brillantes y las vibraciones son increíbles. — Tom H., Manchester"

### 9. Libro CTA
Fondo: #1a6fd4 (cobalto). Relleno: 120px 6%. Alineación de texto: centro.

- Bebas Neue, clamp(40px,6.5vw,110px), blanco, espacio entre letras: 0,04em, margin-bottom: 24px: "TU PRIMERA OLA ESTÁ ESPERANDO."
- Inter 300, 17px, blanco 80%, margin-bottom: 40px: "Lecciones disponibles los 7 días de la semana. Todo el equipo proporcionado. No se necesita experiencia."
- Botón "Reservar ahora": fondo blanco, texto cobalto (#1a6fd4), Inter 400, 15px, peso de fuente: 600, radio de borde: 8px, relleno: 16px 48px
- Abajo: Inter 300, 12px, blanco 60%, margin-top: 16px: "Confirmación instantánea · Reprogramación gratuita hasta 24 horas"

Framer Motion: y 24→0, opacidad 0→1 en whileInView.

### 10. Pie de página
Fondo: #091f37 Borde superior: 1px sólido. hsl(var(--border)). Relleno: 56px 6%.
3-column grid:

Columna 1: "BREAK SURF CO." Bebas Neue, 18px, blanco Abajo: Inter 300, 13px, silenciado: "Surf School · Newquay, Cornwall". Iconos de Instagram/Facebook sobre: arena.

Columna 2: "Lecciones" - Inter 300, 11px, arena, encabezado con espacio entre letras, Inter 300, 13px, enlaces silenciados: Principiante / Intermedio / Avanzado / Reservas grupales / Vales de regalo

Columna 3: "Encuéntrenos" - mismo "Aparcamiento de Fistral Beach, Newquay, TR7 1HY" / "+44 (0)1637 000 111" / "hello@breaksurfco.com" / "Abierto todos los días: marzo a octubre, de 7 a.m. a 7 p.m."

Abajo: Inter 300, 11px, blanco 35%: "© 2025 Break Surf Co. Ltd. Todos los derechos reservados. Las clases de surf están sujetas a nuestra política de seguridad y climatología."

## Animaciones

| Elemento | Animación | Duración | Retraso | Facilitación |
|---|---|---|---|---|
| Opacidad del héroe 0→1, y 30→0s | [0.16,1,0.3,1] |
| Hero sub | opacity 0→1, y 24→0 | 0.8s | 0.15s | [0.16,1,0.3,1] |
| Hero CTAs | opacity 0→1, y 20→0 | 0.8s | 0.25s | [0.16,1,0.3,1] |
| chips de insignia (3) | opacidad 0→1, x -20→0 | 0.45s + i×0.12s |
| [0.16,1,0.3,1] |
| Galeríaimágenes | opacidad 0→1, escala 0,97→1 | 0,5 s | i×0,06s | facilidad |
| Conteo de estadísticas | 0→valor objetivo | 1,5 s | 0 a la vista | facilidadOut |
| Bloque de CTA | opacidad 0→1, y 24→0 | 0,7s | 0s | facilidad |
| Desplazamiento de la tarjeta | escala 1→1.02 | 0,3 s | — | facilidad |
| Colocar el cursor sobre la galería | escala 1→1.03 | 0,3 s | — | facilidad |
| Programar el desplazamiento del espacio | relleno de color bg | 0,15s | — | facilidad |

All whileInView: viewport={{ once: true }}

## Responsive

**Escritorio (≥1024px):**
- Hero: vista completa, contenido en la parte inferior izquierda
- Niveles: 3 columnas grid
- Horario: Cuadrícula de 7 columnas × 4 filas
- Galería: Cuadrícula 2×2
- Equipo: división 60/40
- Estadísticas: fila de 4 columnas
- Pie de página: 3 columnas

**Tableta (768–1023px):**
- Niveles: pila vertical 1×3
- Programación: desplazamiento horizontal (desbordamiento-x: automático, ancho mínimo: 700px)
- Galería: 2×2 (igual)
- Equipo: vertical apilado
- Estadísticas: cuadrícula 2×2
- Pie de página: 2 columnas

**Móvil (<768px):**
- Barra de navegación: hamburguesa, océano oscuro superposición
- Insignias de héroe: 3 chips en línea, texto más pequeño
- Niveles: una sola columna
- Horario: contenedor de desplazamiento horizontal
- Galería: 2×2 (4 cuadrados, cada uno de 50 vw)
- Equipo: una sola columna
- Estadísticas: cuadrícula 2×2
- Texto "SURF" de fondo: no mostrar ninguno

## Copia completa

**Navegación:** Break Surf Co. · Lecciones · Programación · Equipo · Acerca de · Libro

**Héroe:**
- Titular: "CATCH YOUR PRIMERO WAVE."
- Sub: "Clases de surf profesionales en Newquay para principiantes y surfistas experimentados. Se proporciona todo el equipo".
- CTA 1: "Reservar una lección"
- CTA 2: "Ver tipos de lecciones"
- Insignias: "Principiante" · "Intermedio" · "Avanzado"

**Etiqueta de la lección:** "NUESTRAS LECCIONES"
**Título de la lección:** "ENCUENTRA TU NIVEL".
- Principiante: "Aprende lo básico: cómo remar, saltar y montar olas de aguas bravas. No se requiere experiencia". | Duración: 2 horas · Grupo: máx 6 | Desde £55/sesión
- Intermedio: "Trabaja tu técnica de remo, lectura de olas y llegar a lacara verde. Entrenamiento en grupos pequeños." | Duración: 2 horas · Grupo: máximo 4 | Desde £65/sesión
- Avanzado: "Montar en tubo, maniobras y llevar tu surf al siguiente nivel. Máximo dos por autocar." | Duración: 2 horas · Grupo: máximo 2 | Desde £75/sesión

**Etiqueta del horario:** "HORARIO SEMANAL"
**Título del horario:** "CLASES DE ESTA SEMANA."
- Días: LUN / MAR / MIÉ / JUE / VIE / SÁB / SUN
- Filas horarias: 7 a. m. de la mañana / 12 p. m. del mediodía / 5 p. m. del atardecer (5:30 p. m. de sábado a domingo) 
- Leyenda: "● Disponible" · "● Completo" 

**Etiqueta de la sección de equipo:** "EQUIPO INCLUIDO"
**Título del equipo:** "TODO USTED NECESIDAD. NADA QUE TRAER."
**Cuerpo del equipo:** "Cada lección incluye un traje de neopreno completo de invierno de 5/4 mm, una tabla de surf adaptada a tu nivel, una correa y cera. Simplemente preséntate."
**Chips de equipo:** "Traje de neopreno (todos los tamaños)" · "Tabla de surf" · "Correa" · "Cera" · "Almacenamiento de toallas"

**Estadísticas:** "2,400+" ESTUDIANTES ENTRENADOS · "12" AÑOS EN NEWQUAY · "4.8★" CALIFICACIÓN DE GOOGLE · EQUIPO "100%" PROPORCIONADO

**Testimonios:**
- "Siempre le había tenido miedo al agua. El descanso cambió eso por completo. Mi primer día estuve en el tablero en 20 minutos. El mejor dinero que he gastado. — Sophie L., Bristol"
- "Vinimos un grupo de 6 personas y pasamos el mejor fin de semana del año. Los entrenadores son brillantes y las vibraciones son increíbles. — Tom H., Manchester"

**CTA:**
- Titular: "TU PRIMERA OLA ESTÁ ESPERANDO". 
- Sub: "Lecciones disponibles los 7 días de la semana. Todo el equipo proporcionado. No se necesita experiencia."
- Botón: "Reservar ahora"
- Letra pequeña: "Confirmación instantánea · Reprogramación gratuita hasta 24 horas"

**Pie de página:**
- Lema: "Escuela de surf · Newquay, Cornwall"
- Dirección: "Fistral Beach Aparcamiento, Newquay, TR7 1HY"
- Teléfono: "+44 (0)1637 000 111"
- Correo electrónico: "hello@breaksurfco.com"
- Horario: "Abierto todos los días: de marzo a octubre, de 7 a.m. a 7 p.m."
- Legal: "© 2025 Break Surf Co. Ltd. Todos los derechos reservados. Las clases de surf están sujetas a nuestra política de seguridad y climatología."

## Dependencias clave
```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx",
  "tailwindcss": "^3.x"
}
```