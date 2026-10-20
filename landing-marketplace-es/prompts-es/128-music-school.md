# Harmonic Academy: mensaje del sitio web de la escuela de música

## Objetivo
Cree un sitio web cálido y atractivo para la escuela de música para "Harmonic Academy": fondo blanco cálido, estructura de caoba profunda, acentos cálidos en ámbar, titulares editoriales DM Serif Display, fotografías íntimas de la hora dorada y un enfoque de conversión de prueba gratuito.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

## Design System

### Colors
```css
:root {
  --background: 40 33% 97%;
  --foreground: 22 75% 10%;
  --primary: 33 65% 52%;
  --primary-foreground: 40 33% 97%;
  --muted-foreground: 40 18% 50%;
  --border: 40 28% 82%;
  --accent: 35 45% 88%;
}
```

Hex referencia:
- Fondo: #faf8f2 (blanco roto cálido)
- Primer plano (caoba profundo): #2a1505
- Primario (ámbar cálido): #d4903a
- Crema claro (fondos de tarjetas): #f0e8d8
- Texto silenciado: #9e8a70
- Borde: #d8c8a8

### Tipografía
Fuentes de Google importación:
`https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@300,400,600&display=swap`

- Pantalla/Títulos: DM Serif Display 400 (editorial cálido, no se necesita negrita; la fuente es inherentemente llamativa en tamaños grandes)
- Subtítulos: Plus Jakarta Sans 600
- Cuerpo: Plus Jakarta Sans 400
- Títulos/etiquetas: Plus Jakarta Sans 300

## Efectos visuales

### Efecto 1: Tarjeta de lección de prueba flotante
Debajo de los CTA de héroe, una tarjeta flotante se anima en:
Fondo: #f0e8d8 (crema clara). Borde: 0,5 px sólido #2a1505 (caoba). Radio del borde: 12px. Relleno: 16px 20px. Ancho máximo: 300px.
Box-shadow: 0 8px 28px rgba(42,21,5,0.12).
Contenido:
- Chip ámbar: fondo: rgba(212,144,58,0.15), borde: 0.5px sólido #d4903a, Plus Jakarta 600, 10px, espacio entre letras: 0,12 em, color ámbar, radio del borde: 100px, relleno: 4px 12px: "PRIMERA LECCIÓN GRATIS"
- Plus Jakarta 600, 14px, caoba (#2a1505), margin-top: 10px: "Tu primera lección corre por nuestra cuenta"
- Plus Jakarta 300, 12px, silenciado, margin-top: 4px: "30 minutos · Cualquier instrumento · Cualquier edad"
- Enlace ámbar: Plus Jakarta 400, 12px, ámbar (#d4903a), margin-top: 10px, subrayado al pasar el mouse: "Verificar disponibilidad →"
Framer Motion: inicial={{ escala: 0.9, opacidad: 0 }}, animar={{ escala: 1, opacidad: 1 }},transición={{ retardo: 0.5, duración: 0.55, facilidad: [0.16,1,0.3,1] }}

### Efecto 2: Tarjeta de instrumento Resplandor ámbar Hover
 Cada una de las 6 tarjetas de instrumento: al pasar el cursor se produce una sombra de cuadro: 0 4px 24px rgba(212,144,58,0.22). El color del icono pasa de caoba a ámbar (#d4903a). Transición: 0,22 s de facilidad.

### Efecto 3: Entrada de escala de tarjeta de grupo de edad
Tres tarjetas de grupo de edad se animan con el escalonamiento de escala de Framer Motion: inicial={{ escala: 0,95, opacidad: 0 }}, whileInView={{ escala: 1, opacidad: 1 }}, transición={{ retraso: índice * 0.12, duración: 0.6, facilidad: [0.16,1,0.3,1] }}

### Efecto 4: Degradado direccional hacia la derecha (Panel izquierdo del héroe)
El panel del héroe izquierdo utiliza un degradado que se desvanece en la fotografía del derecha:
```css
background: linear-gradient(
  to right,
  rgba(250,248,242,1) 0%,
  rgba(250,248,242,0.95) 80%,
  transparent 100%
);
```
Asegura que el panel de texto de marfil se lea claramente independientemente de la posición del sujeto de la fotografía.

### Efecto 5: Marquesina de resultados del examen
ATira de confianza con detalles en ámbar sobre fondo de caoba que se desplaza a 35 segundos lineales infinito:
"Centro de exámenes ABRSM · Grados 1 a 8 · Trinity College London · Tasa de aprobación del 94 % en 2024 · Distinción de octavo grado disponible"
Plus Jakarta 400, 13px, crema (#f0e8d8). Separadores "·" ámbar (#d4903a).

## Desglose de componentes

### 1. Navbar
- Parte superior fija, fondo: rgba(250,248,242,0.96), filtro de fondo: desenfoque (12px), borde inferior: 1px sólido hsl(var(--border))
- Alto: 64px
- Izquierda: "Harmonic" en DM Serif Display, 20px, caoba (#2a1505) + " Academy" en Plus Jakarta 300, 20px, silenciado
- Centro: Plus Jakarta 400, 13 px, enlaces de caoba — Instrumentos / Para niños / Para adultos / Nuestros tutores / Book
- Derecha: "Reserve una prueba gratuita" — ámbar bg (#d4903a), texto crema (#faf8f2), Plus Jakarta 600, 12 px, radio de borde: 8 px, relleno: 10 px 22px
: coloque el cursor sobre los enlaces: ámbar (#d4903a). Transición: 0,18 s.

### 2. Hero
Diseño dividido, altura mínima: 100vh.

**Panel izquierdo: 45% de ancho:**
Pantalla: flexible, dirección flexible: columna, justificación de contenido: centro, relleno: 0 6% 08%. Ancho máximo: 540px.

Desvanecimiento del gradiente del borde derecho afotografía:
```css
background: linear-gradient(to right, rgba(250,248,242,1) 0%, rgba(250,248,242,0.95) 80%, transparent 100%);
```

Contenido:
- Chip de cejas: fondo: rgba(212,144,58,0.12), borde: 0.5px sólido #d4903a, color: #d4903a, Plus Jakarta 600, 10 px, espacio entre letras: 0,12 em, radio del borde: 100 px, relleno: 5 px 14 px, visualización: bloque en línea, margen inferior: 20 px. Texto: "Lecciones de música · Notting Hill y en línea" 

- Titular: "Aprende música. Ámala de por vida". — DM Serif Display, clamp(42px,5.8vw,104px), caoba (#2a1505), altura de línea: 1,05, margen inferior: 20px
- Movimiento del marco: inicial={{ opacidad: 0, y: 28 }}, animate={{ opacidad: 1, y: 0 }}, transición={{ duración: 0.85, facilidad: [0.16,1,0.3,1] }}

- Sub: "Clases de expertos en piano, guitarra, voz y más, desde 5 años hasta adultos. Lecciones en Notting Hill y en línea". — Plus Jakarta 400, 16 px, silenciado (#9e8a70), altura de línea: 1,6, margen inferior: 32 px
- Movimiento del fotograma: retraso: 0,15 s

- CTA (flexible, espacio: 12 px, margen inferior: 32px):
 - "Reserve una prueba gratuita" — ámbar bg (#d4903a), texto caoba (#2a1505), Plus Jakarta 600, 14px, radio de borde: 8px, relleno: 14px 28px
 - "Explorar instrumentos" — transparente, borde: 1,5 px sólido #2a1505, texto caoba, misma fuente, mismo relleno
 - Movimiento del marco: retraso: 0,25 s

- Tarjeta de lección de prueba flotante (debajo de los CTA, sin superponerse a la fila de CTA):
 Escala 0,9→1, opacidad 0→1 en el retraso 0,5 s.

**Panel derecho: 55 % de ancho:**
Fotografía cálida con sangrado completo, posición: relativa, desbordamiento: oculto.
Sin radio de borde. Ajuste del objeto: portada, posición del objeto: centro.

{/* Imagen: Fotografía interior íntima de una mujer joven sentada frente a un piano vertical en una sala de ensayo cálida y acogedora. Está concentrada en las partituras sobre el atril del piano, con los dedos en las teclas. La habitación tiene pisos de madera, la cálida luz del sol de la tarde entra por una ventana en el lado derecho del marco, proyectando largos rayos dorados sobre el piano. Un atril es visible en un fondo de enfoque suave. La cálida luz de la hora dorada en tonos miel llena la habitación. Estado de ánimo: íntimo, aspiracional, alegría de aprender, productividad acogedora. */}
<img src="" alt="Mujer tocando el piano vertical en un cálido color doradoluz de la tarde" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />

### 3. Instrumentos Grid
Background: hsl(var(--background)). Relleno: 100px 6%.

**Encabezado:**
- Plus Jakarta 600, 11px, ámbar (#d4903a), espacio entre letras: 0,15 em, mayúsculas, margen inferior: 12px: "INSTRUMENTS"
- DM Serif Display, clamp(30px,4vw,56px), caoba, margen inferior: 56 px: "Reproduce la música que te gusta". 

**6 tarjetas de instrumentos: cuadrícula de 3×2, espacio: 16 px:**
Each: fondo: #f0e8d8 (crema claro), borde: 1 px sólido hsl(var(--border)), radio de borde: 12px, relleno: 28px 24px.
Hover: box-shadow: 0 4px 24px rgba(212,144,58,0.22), color del icono: ámbar Transición: 0.22s facilidad.

Estructura de la tarjeta (vertical, centrado):
- Icono de Lucide, 28px, caoba (→ ámbar al pasar el mouse): representación del instrumento
- Plus Jakarta 600, 16px, caoba, margen superior: 12px: nombre del instrumento
- Plus Jakarta 300, 13px, silenciado, altura de línea: 1,55, margin-top: 6px: breve descripción
- Plus Jakarta 400, 13px, ámbar (#d4903a), margin-top: 12px, hover: underline: "Más información →"

**Los 6 instrumentos:**
1 Piano (icono: Música, Teclado) / "De principiante absoluto a. Grado 8 y posteriores. Estilos clásico, jazz y contemporáneo."
2. Guitarra (icono: Música2) / "Acústica, eléctrica y clásica. Técnicas de rock, folk, blues y punteo con los dedos."
3. Voz (icono: micrófono) / "Control de la respiración, extensión del rango, técnica y confianza en la interpretación. Todos los estilos."
4. Violín (icono: Música) / "Principiante a avanzado. Repertorio clásico y folklórico. Instrumentos de tamaño completo y 3/4 disponibles."
5. Batería (icono: Radio) / "Kit de fundamentos para la lectura musical. Opciones de práctica acústica y electrónica disponibles."
6. Teoría musical (icono: BookOpen) / "Teoría ABRSM grados 1 a 8, entrenamiento auditivo, composición y armonía."

Framer Motion: escalonamiento 0,08 s, opacidad 0→1, y 18→0, whileInView, viewport={{ once: true }}

### 4. Sección de grupos de edad
Fondo: #f0e8d8 (crema claro: 100px 6%.

**Encabezado:**
- Plus).Yakarta 600, 11 píxeles, ámbar, espacio entre letras: 0,15 em, mayúsculas: "A QUIÉN ENSEÑAMOS" 
- DM Serif Display, 56 píxeles, caoba, margen inferior: 64 píxeles: "Lecciones de música para todas las edades". 

**3 tarjetas de grupos de edad: cuadrícula de 3 columnas, espacio: 24px:**
Each: fondo: #faf8f2, borde: 1px sólido hsl(var(--border)), radio del borde: 16px, relleno: 40px 32px.
Framer Motion: escala 0,95→1, opacidad 0→1, escalonamiento 0,12 s, mientras que InView.

Estructura de la tarjeta: 
- Chip ámbar: ámbar bg 15%, borde ámbar 0,5 px, Plus Jakarta 600, 10 px, espacio entre letras: 0,12 em, color ámbar, radio del borde: 100 px, relleno: 4 px 12 px: edad rango
- DM Serif Display, 26px, caoba, margen superior: 16px, margen inferior: 12px: nombre del grupo
- Plus Jakarta 400, 15px, silenciado, altura de línea: 1,65, margen inferior: 20px: descripción
- Plus Jakarta 400, 13px, ámbar, subrayado al pasar el mouse: "Ver plan de estudios →"

**Los 3 grupos:**
1. Chip: "DE 5 A 12 AÑOS" / "Jóvenes músicos" / "Estructurados, divertidos y alineados con los grados de ABRSM. Primero hacemos que la música sea divertida; los grados siguen de forma natural. Instrumentos desde violín y piano hasta batería". / "Ver currículum →"
2. Chip: "DE 13 A 17 AÑOS" / "Aprendices adolescentes" / "Técnica y creatividad a partes iguales. Bandas de rock, talleres de composición y preparación para exámenes ABRSM para quienes lo deseen". / "Ver currículum →"
3. Chip: "EDADES 18+" / "Estudiantes adultos" / "Sin presiones, sin exámenes a menos que los desees. Continúa donde lo dejaste o comienza completamente de nuevo. Puro amor por la música". / "Ver plan de estudios →"

### 5. Perfiles de tutores
Antecedentes: hsl(var(--background)). Relleno: 100px 6%.

**Encabezado:**
- Plus Jakarta 600, 11px, ámbar, espacio entre letras: 0,15 em, mayúsculas: "NUESTROS TUTORES"
- DM Serif Display, 56px, caoba, margen inferior: 56px: "Maestros excepcionales. Músicos de toda la vida". 

**3 Tarjetas de tutor: cuadrícula de 3 columnas, espacio: 24 px:**
Each: fondo: #f0e8d8, radio de borde: 12 px, desbordamiento: oculto, borde: 1 px sólido hsl(var(--border)).

Estructura de la tarjeta:
- Parte superior: retrato cuadrado (proporción 1:1), sangrado completo
- Relleno: 24px
- Plus Jakarta 600, 18px,caoba: nombre del tutor
- Chip ámbar (mismo estilo que los chips del grupo de edad): especialidad
- Plus Jakarta 400, 14px, silenciado, altura de línea: 1,6, margen superior: 12px: bio
- Plus Jakarta 400, 13px, ámbar, margen superior: 14px, cursor subrayado: "Libro con [nombre] →"

**Los 3 tutores:**

1. Emma Clarke LRAM — chip: "Piano & Music Theory"
{/* Imagen: Foto profesional de una profesora de música de unos 30 años, apariencia europea, sentada frente a un piano o frente a una estantería con partituras musicales. Lleva ropa informal elegante en tonos cálidos. Iluminación cálida de estudio, fondo ligeramente cálido. Sonrisa amable y profesional. Recorte cuadrado 1:1. Estado de ánimo: profesor experto, cálido y accesible. */}
<img src="" alt="Emma Clarke LRAM — Tutora de piano y teoría musical" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%',spectRatio: '1/1' }} />
Bio: "Emma tiene una licenciatura de la Royal Academy of Music y tiene 15 años de experiencia docente en todos los grados. Ha ayudado a más de 60 estudiantes a lograr la Distinción en sus exámenes ABRSM."
Enlace: "Reserve con Emma →"

2. Tom Bradley BMus Hons - chip: "Guitar & Songwriting"
{/* Imagen: Foto profesional de un profesor de guitarra de unos 30 años, piel marrón clara y una chaqueta vaquera holgada. Puede que esté sosteniendo una guitarra acústica o fotografiado cerca de una. Ambiente de estudio cálido y ligeramente informal. Sonrisa amplia y fácil. Recorte cuadrado 1:1. Estado de ánimo: amigable, creativo, accesible, apasionado. */}
<img src="" alt="Tom Bradley BMus Hons — Tutor de guitarra y composición" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%',spectRatio: '1/1' }} />
Bio: "Tom se graduó con un BMus Hons del Conservatorio de Leeds y se especializa en Guitarra acústica, eléctrica y clásica. Sus talleres de composición son particularmente populares entre los estudiantes adolescentes."
Enlace: "Libro con Tom →"

3. Aiko Tanaka MA - chip: "Vocals & Performance"
{/* Imagen: Foto profesional de una tutora vocal de veintitantos años, apariencia japonesa, vestida con ropa profesional elegante. La fotografían en un estudio limpio y lleno de luz osala de práctica. Sonrisa cálida y segura. Recorte cuadrado 1:1. Estado de ánimo: intérprete pulido, experto, cálido y seguro. */}
<img src="" alt="Aiko Tanaka MA — Tutor de voz e interpretación" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%',spectRatio: '1/1' }} />
Bio: "Aiko tiene una maestría en interpretación vocal del Royal College of Music y actúa profesionalmente como Mezzosoprano. Se especializa en técnica clásica, teatro musical y entrenamiento de interpretación."
Enlace: "Libro con Aiko →"

Framer Motion: stagger 0.12s, opacity 0→1, y 20→0, viewport={{ once: true }}

### 6. Resultados del examen. Tira
Fondo: #2a1505 (caoba). Relleno: 32px 6%. Desbordamiento: oculto.
Border-top: ninguno (fluye desde el contenido anterior).

Hmarquesina de desplazamiento horizontal: 35s lineal infinito.
"Centro de exámenes ABRSM · Grados 1 a 8 · Trinity College London · Tasa de aprobación del 94 % en 2024 · Distinción de octavo grado disponible · Más de 400 estudiantes examinados ·"
Plus Jakarta 400, 13px, #f0e8d8 (crema). Separador "·" en color ámbar (#d4903a). Duplicado para bucle continuo.

### 7. Testimonios
Antecedentes: hsl(var(--background)). Relleno: 80px 6%. Ancho máximo: 760 px, margen: automático.

**2 testimonios:**
Eada: borde izquierdo: 2 px sólido #d4903a, relleno izquierdo: 28 px, margen inferior: 48 px.
- Plus Jakarta 400, 16 px, caoba, altura de línea: 1,65: cita
- Plus Jakarta 600, 12 px, ámbar (#d4903a), espacio entre letras: 0,12 em, margen superior: 14 px: atribución
- 5 iconos de estrellas de color ámbar (lucide Star, relleno: #d4903a, 13 px) cita anterior

Cita 1: "Emma ha transformado la relación de mi hija con el piano. Pasó de la temida práctica a tocar durante 40 minutos sin que se lo pidieran. Distinción de tercer grado el mes pasado. - Helen R., madre"
Cita 2: "No había tocado la guitarra desde la escuela, hace unos 25 años. Tom hizo que se sintiera completamente natural volver a tocarla. Estoy ahora estoy aprendiendo Bossa Nova, algo que nunca creí posible: Michael D., estudiante adulto"

Framer Motion: opacity 0→1, x -16→0, stagger 0.18s, viewport={{ once: true }}

### 8. Ámbar CTA.Sección
Fondo: #d4903a (ámbar). Relleno: 120px 6%. Alineación de texto: centro.

- DM Serif Display, clamp(36px,5.5vw,88px), caoba (#2a1505), cursiva (DM Serif Display aparece ligeramente en cursiva en los tamaños de pantalla): "Su primera lección corre por nuestra cuenta".
- Plus Jakarta 400, 17px, caoba 80%, margen superior: 16px, margen inferior: 40px: "Sin compromiso. No se necesita experiencia. Solo un amor genuino por la música". 
- Botón "Reserve su prueba gratuita": caoba bg (#2a1505), texto crema (#faf8f2), Plus Jakarta 600, 14px, radio de borde: 8px, relleno: 16px 40px
- Abajo: Plus Jakarta 300, 12px, caoba 60%, margen superior: 14px: "Sesión gratuita de 30 minutos · Cualquier instrumento · Cualquier edad · En línea o en estudio"

Framer Motion: y 24→0, opacidad 0→1, whileInView, duración: 0,7s.

### 9. Pie de página
Fondo: #2a1505 (caoba). Relleno: 64px 6%.
Cuadrícula de 4 columnas:

Columna 1: Pantalla DM Serif "Harmonic Academy", 16px, crema (#f0e8d8). Abajo: Plus Jakarta 300, 13px, crema apagada 60%: "Clases de música para edades de 5 a adultos. Notting Hill y en línea". Íconos ámbar de Instagram/Facebook, cursor: crema.

Columna 2: "Instrumentos" - Además de encabezado Jakarta 600, 10px, ámbar, espacio entre letras. Enlaces: Plus Jakarta 300, 13px, crema 65%: Piano / Guitarra / Voz / Violín / Batería / Teoría musical

Columna 3: "Estudio" - mismo encabezado. Plus Jakarta 300, 13px, crema 65%: "4 Pembridge Road, Notting Hill, Londres W11 3HN" / "Lunes a viernes: 9 a. m. a 8 p. m. / Sábado: 9 a. m. a 5 p. m. / Domingo: 10 a. m. a 4 p. m." / "También disponible en línea a través de Zoom"

Columna 4: "Libro" — lo mismo. Plus Jakarta 300, 13px, crema 65%: "hello@harmonicacademy.co.uk" / "+44 (0)20 7654 3210" / "Prueba gratuita disponible para todos los estudiantes nuevos"

Abajo: Plus Jakarta 300, 11px, crema 35%: "© 2025 Harmonic Academy Ltd. Todos los derechos reservados. Centro de examen registrado ABRSM No. 12345."

## Animaciones

| Elemento | Animación | Duración | Retraso | Facilitación |
|---|---|---|---|---|
| Titular de héroe | opacidad 0→1, y 28→0 | 0,85s | 0s | [0.16,1,0.3,1] |
| Sub héroe + CTA | opacidad 0→1, y 22→0 | 0,85s | 0,15s | [0.16,1,0.3,1] |
| Flotantetarjeta de prueba | escala 0,9→1, opacidad 0→1 | 0,55s | 0,5 s | [0.16,1,0.3,1] |
| Tarjetas de instrumentos | opacidad 0→1, y 18→0 | 0,5 s | i×0,08s | facilidad |
| Tarjetas de grupos de edad | escala 0,95→1, opacidad 0→1 | 0,6 s | i×0,12s | [0.16,1,0.3,1] |
| Tarjetas de tutor | opacidad 0→1, y 20→0 | 0,6 s | i×0,12s | facilidad |
| Testimonios | opacidad 0→1, x -16→0 | 0,6 s | i×0,18s | facilidad |
| Bloque de CTA | opacidad 0→1, y 24→0 | 0,7s | 0s | facilidad |
| Tarjeta de instrumentos flotante | sombra de cuadro + color del icono | 0,22 s | — | facilidad |
| Marquesina | bucle traducirX | 35 años | — | lineal, infinito |

All whileInView: viewport={{ once: true }}

## Responsive

**Escritorio (≥1024px):**
- Héroe: 45% izquierda / 55% derecha dividida
- Instrumentos: 3×2 grid
- Grupos de edad: grid de 3 columnas
- Tutores: grid de 3 columnas
- Pie de página: 4 columnas

**Tableta (768–1023px):**
- Hero: pilas (imagen superior 40vh, contenido abajo)
- Instrumentos: cuadrícula 2×3
- Grupos de edad: pila vertical 1×3
- Tutores: pila vertical 1×3
- Pie de página: cuadrícula 2×2

**Móvil (<768px):**
- Barra de navegación: hamburguesa, DM Serif Mostrar enlaces en superposición cálida
- Héroe: contenido izquierdo de ancho completo, tarjeta flotante debajo de CTAs
- Instrumentos: cuadrícula de 2 × 3 (relleno más pequeño)
- Grupos de edad: 1 columna
- Tutores: 1 columna
- Marquesina: misma velocidad
- Pie de página: 1 columna

## Copia completa

**Navegación:** Harmonic Academy · Instrumentos · Para niños · Para adultos · Nuestros tutores · Libro

**Hero:**
- Chip de cejas: "Clases de música · Notting Hill y en línea"
- Titular: "Aprende música. Ámala de por vida".
- Sub: "Clases de expertos en piano, guitarra, voz y más, para edades de 5 a adultos. Lecciones en Notting Hill y en línea".
- CTA 1: "Reserve un Prueba"
- CTA 2: "Buscar instrumentos"
- Chip de tarjeta flotante: "PRIMERA LECCIÓN GRATIS"
- Tarjeta flotante: "Tu primera lección corre por nuestra cuenta"
- Subtarjeta flotante: "30 minutos · Cualquier instrumento · Cualquier edad"
- Tarjeta flotante enlace: "Consultar disponibilidad→"

**Etiqueta de instrumentos:** "INSTRUMENTOS"
**Título de instrumentos:** "Toca la música que amas".
- Piano: "Desde principiante absoluto hasta grado 8 y más. Estilos clásico, jazz y contemporáneo."
- Guitarra: "Acústica, eléctrica y clásica. Técnicas de rock, folk, blues y punteo con los dedos."
- Voz: "Control de la respiración, extensión del rango, técnica y confianza en la interpretación. Todos los estilos."
- Violín: "Principiante a avanzado. Repertorio clásico y folklórico. Instrumentos de tamaño completo y 3/4 disponibles."
- Batería: "Kit de fundamentos para la lectura musical. Opciones de práctica acústica y electrónica disponibles."
- Teoría musical: "Teoría ABRSM grados 1 a 8, entrenamiento auditivo, composición y armonía".

**Etiqueta de grupos de edad:** "A QUIÉN ENSEÑAMOS"
**Título de grupos de edad:** "Lecciones de música para todas las edades".
- Edades 5–12 / "Jóvenes músicos" / "Estructurados, divertidos y alineados con los grados de ABRSM. Primero hacemos que la música sea divertida: las calificaciones siguen de forma natural. Instrumentos desde violín y piano hasta batería."
- Edades 13-17 / "Aprendices adolescentes" / "Técnica y creatividad a partes iguales. Bandas de rock, talleres de composición y preparación para exámenes ABRSM para quienes lo deseen."
- Edades 18+ / "Estudiantes adultos" / "Sin presiones, sin exámenes a menos que los desees. Continúe donde lo dejó o comience completamente de nuevo. Puro amor por la música."

**Etiqueta de los tutores:** "NUESTROS TUTORES"
**Título de los tutores:** "Profesores excepcionales. Músicos de toda la vida."
- Emma Clarke LRAM / "Piano & Music Theory" / "Emma tiene una Licenciatura de la Royal Academy of Music y tiene 15 años de experiencia docente en todos los grados. Ha ayudado a más de 60 estudiantes a lograr la Distinción en sus exámenes ABRSM." / "Libro con Emma →"
- Tom Bradley BMus Hons / "Guitar & Songwriting" / "Tom se graduó con un BMus Hons del Conservatorio de Leeds y se especializa en guitarra acústica, eléctrica y clásica. Sus talleres de composición son particularmente populares entre los estudiantes adolescentes." / "Libro con Tom →"
- Aiko Tanaka MA / "Vocals & Performance" / "Aiko tiene una maestría en Interpretación Vocal del Royal College of Music y actúaprofesionalmente como mezzosoprano. Se especializa en técnica clásica, teatro musical y entrenamiento de interpretación". / "Reserve con Aiko →"

**Marca de resultados del examen:** "Centro de exámenes ABRSM · Grados 1 a 8 · Trinity College London · Tasa de aprobación del 94 % en 2024 · Distinción de octavo grado disponible · Más de 400 estudiantes examinados ·"

**Testimonios:**
- "Emma ha transformado la relación de mi hija con el piano. Pasó de una práctica temida a jugar durante 40 minutos sin que se lo pidieran. Distinción de 3er grado el mes pasado. — Helen R., madre" ★★★★★
- "No había tocado la guitarra desde la escuela, hace unos 25 años. Tom hizo que se sintiera completamente natural retomarlo. Ahora estoy aprendiendo Bossa Nova, algo que nunca creí posible. — Michael D., estudiante adulto" ★★★★★

**Sección CTA:**
- Titular: "Su primera lección corre por nuestra cuenta".
- Sub: "Sin compromiso. No se necesita experiencia. Simplemente un amor genuino por la música."
- Botón: "Reserve su prueba gratuita"
- Letra pequeña: "Sesión gratuita de 30 minutos · Cualquier instrumento · Cualquier edad · En línea o en el estudio"

**Pie de página:**
- Lema: "Clases de música para edades de 5 a adultos. Notting Hill y en línea."
- Dirección: "4 Pembridge Road, Notting Hill, Londres W11 3HN"
- Horario: "Lunes a viernes: 9 a. m. a 8 p. m. / Sábado: 9 a. m. a 5 p. m. / Domingo: 10 a. m. a 4 p. m."
- En línea: "También disponible en línea a través de Zoom"
- Correo electrónico: "hello@harmonicacademy.co.uk"
- Teléfono: "+44 (0)20 7654 3210"
- Nota: "Prueba gratuita disponible para todos los estudiantes nuevos"
- Legal: "© 2025 Harmonic Academy Ltd. Todos los derechos reservados. Centro de examen registrado ABRSM No. 12345."

## Dependencias clave
```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx",
  "tailwindcss": "^3.x"
}
```