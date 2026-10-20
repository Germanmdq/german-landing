# Ellipse Dance Studio — Solicitud del sitio web de Dance Studio

## Goal
Cree un sitio web de estudio de danza dramático y oscuro para "Ellipse Dance Studio": fondo casi negro, detalles en rosa cobre, tipografía de color marfil cálido, cursiva Cormorant Garamond 700 a escala masiva, fotografía de bailarines de mal humor iluminados por el escenario, cuadrícula de horarios y escaparate. sección.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

## Sistema de diseño

### Colores
```css
:root {
  --background: 3 8% 4%;
  --foreground: 30 45% 93%;
  --primary: 8 38% 60%;
  --primary-foreground: 3 8% 4%;
  --muted-foreground: 3 5% 64%;
  --border: 3 5% 18%;
  --accent: 3 12% 14%;
}
```

HReferencia ex:
- Fondo: #0a0808 (casi negro con matiz cálido)
- Primer plano (marfil cálido): #f5f0e8
- Primario (cobre rosa): #c47a6a
- Rosa oscuro (secciones interiores): #3a1510
- Silenciado: #a09898
- Borde: #2e2626

### Tipografía
Google Fonts import:
`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,700&family=Inter:wght@300,400&display=swap`

- TODOS Titulares: Cormorant Garamond 700 cursiva
- Texto del cuerpo: Cormorant Garamond 300 cursiva
- Etiquetas/UI/títulos: Inter 300 (sin cursiva)

## Efectos visuales

### Efecto 1: Texto de marca de fondo (tinte de cobre rosa)
```css
.bg-brand-text {
  position: absolute;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 700;
  font-size: clamp(200px, 28vw, 440px);
  opacity: 0.03;
  color: #c47a6a;
  right: -4%;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
  letter-spacing: -0.01em;
}
```
Texto: "ELLIPSE"

### Efecto 2: Héroe en capas Degradado
Dos degradados superpuestos para crear una viñeta de mal humor que enmarca al bailarín mientras mantiene el contenido legible:
```css
/* Gradient 1 — radial center vignette */
background: radial-gradient(
  ellipse at 50% 45%,
  rgba(10,8,8,0) 0%,
  rgba(10,8,8,0.2) 45%,
  rgba(10,8,8,0.7) 100%
);

/* Gradient 2 — top and bottom fade */
background: linear-gradient(
  to bottom,
  rgba(10,8,8,0.6) 0%,
  transparent 35%,
  rgba(10,8,8,0.8) 100%
);
```
Apila ambos como pseudoelementos o como dos divs absolutos encima de la imagen principal (índice z: 1 y 2), contenido en el índice z: 10.

### Efecto 3: Líneas divisorias de cobre rosa y bordes flotantes
En filas de estilo de baile: al pasar el cursor se revela un borde izquierdo #c47a6a sólido de 3px. Más y: -4px elevación, box-shadow: 0 4px 20px rgba(196,122,106,0.2). Transición: 0,25 s de facilidad.
También se utiliza como: líneas finas de acento horizontales de 1 px debajo de las llamadas a la acción, entre secciones y como resaltado del espacio actual del horario.

### Efecto 4: Resaltado al pasar el cursor sobre el horario
Los espacios del horario se desplazan: fondo: rgba(196,122,106,0.15), color del borde: #c47a6a (0.5px). Transición: 0,15 s de facilidad.

## Desglose de componentes

### 1. Barra de navegación
- Parte superior fija, fondo:rgba(10,8,8,0.92), filtro de fondo: desenfoque(14px)
- Altura: 60px
- Izquierda: "Elipse" en Cormorant Garamond 700 cursiva, 22px, rosa cobre (#c47a6a), espaciado entre letras: 0.04em
- Centro: Inter 300, 11px, espacio entre letras: 0.14em, mayúsculas, marfil (80% de opacidad) — Clases / Horarios / Instructores / Exhibición / Contacto
- Derecha: "Primera clase gratis" — botón fantasma, borde de cobre rosa de 0.5px, Cormorant 300 cursiva, 14px, texto rosa cobre, relleno: 8px 20px, sin radio de borde
- Borde inferior: 0,5px sólido hsl(var(--border))
- Enlace de navegación flotante: rosa cobre (#c47a6a). Transición: 0,2 s.

### 2. Hero
Vista completa, posición: relativa, desbordamiento: oculto.

**Imagen de fondo:**
{/* Imagen: espectacular fotografía escénica de una bailarina contemporánea captada en medio de un profundo arabesco o un salto dinámico. La bailarina lleva un sencillo leotardo oscuro. El desenfoque de movimiento es visible en las extremidades extendidas, lo que sugiere velocidad y potencia. La iluminación del escenario viene desde arriba y ligeramente hacia la derecha, creando un único foco cálido que separa al bailarín del fondo casi negro. El fondo es pura oscuridad teatral. Tomada con un objetivo largo y con poca profundidad de campo. El rostro de la bailarina está sereno y concentrado. Estado de ánimo: maestría, drama, poder controlado, belleza en movimiento. */}
<img src="" alt="Bailarina contemporánea de medio arabesco en espectacular escenario" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', position: 'absolute', inset: 0 }} />

**Gradient Layer 1 (índice z: 1, absoluto, recuadro: 0):**
```css
background: radial-gradient(ellipse at 50% 45%, rgba(10,8,8,0) 0%, rgba(10,8,8,0.2) 45%, rgba(10,8,8,0.7) 100%);
```

**Capa de gradiente 2 (índice z: 2, absoluto, recuadro: 0):**
```css
background: linear-gradient(to bottom, rgba(10,8,8,0.6) 0%, transparent 35%, rgba(10,8,8,0.8) 100%);
```

**Texto de fondo (índice z: 0, detrás de la imagen):**
"ELLIPSE" — Cormorant 700 cursiva, clamp(200px,28vw,440px), opacidad: 0,03, cobre rosa (#c47a6a), derecha: -4%, arriba: 50%, traducirY(-50%).

**Contenido (índice z: 10):**
Posición: absoluta, abajo: 8vh, izquierda: 6%, ancho máximo: 600px.

- Ceja: Inter 300, 10px, rosa cobre, espacio entre letras: 0,2em, mayúsculas, margen inferior: 16px: "DANCE STUDIO · zanja"

-Titular: "Muévete en serio". — Cormorant 700 cursiva, clamp(52px,7.5vw,128px), espacio entre letras: -0,01 em, marfil (#f5f0e8), altura de línea: 1,0, margen inferior: 20px
- Framer Motion: inicial={{ opacidad: 0, y: 36 }}, animate={{ opacidad: 1, y: 0 }}, transición={{ duración: 0.95, facilidad: [0.16,1,0.3,1] }}

- Sub: "Clases coreografiadas profesionalmente para adultos y niños de ballet, contemporáneo, latín y hip-hop. Estudios en Shoreditch". — Cormorán 300 cursiva, 18 px, marfil 75 %, ancho máximo: 460 px, margen inferior: 32 px
- Movimiento del marco: retraso: 0,18 s

- CTA (flexibles, espacio: 14 px, margen inferior: 24 px):
 - "Encuentra tu clase": rosa cobre bg (#c47a6a), texto oscuro (#0a0808), Cormorant 300 cursiva, 16 px, espacio entre letras: 0,06 em, relleno: 13 px 36 px, sin radio de borde
 - "Primera clase gratis": transparente, borde: 0,5 px marfil sólido (#f5f0e8), texto en marfil, misma fuente, mismo relleno
 - Movimiento del marco: retraso: 0,28 s

- Línea divisoria delgada de cobre rosa de 1 px (ancho: 60 px) debajo de las CTA.

### 3. Estilos de baile Sección
Fondo: hsl(var(--background)). Relleno: 120px 6%.

**Encabezado:**
- Inter 300, 10px, cobre rosa, espacio entre letras: 0,2 em, mayúsculas, margen inferior: 12px: "NUESTRAS CLASES"
- Cormorant 700 cursiva, clamp(38px,5vw,78px), marfil, margen inferior: 72px: "Algo para todos".

**4 filas de estilo:**
Each: posición: relativa, relleno: 36px 0. Borde superior: 1px sólido hsl(var(--border)). Mostrar: flex, justificar contenido: espacio entre, alinear elementos: centro. Cursor: puntero.

Indicador de borde izquierdo: posición: absoluta, izquierda: 0, arriba: 0, abajo: 0, ancho: 3px, fondo: #c47a6a, opacidad: 0, transición: opacidad 0.25s.
Al pasar el cursor: opacidad del borde izquierdo → 1, fila: traducirY(-4px), sombra de cuadro: 0 4px 20px rgba(196,122,106,0.2). Transición: 0,25 s de facilidad.

Columna izquierda:
- Cormorant 700 cursiva, clamp(28px,3.5vw,52px), marfil: nombre de estilo
- Cormorant 300 cursiva, 15 px, silenciado (#a09898), ancho máximo: 400 px, altura de línea: 1,65, margen superior: 6 px: descripción

Columna derecha (flex-shrink: 0, flex, align-items: center, gap: 24px):
-Cormorant 300, 14px, cobre rosa: precio por clase
- Cormorant 700 cursiva, 24px, cobre rosa: "→"

**Los 4 estilos:**
1. "Ballet" / "Desde principiantes absolutos hasta preprofesionales. Programa de estudios RAD graduado junto con clases abiertas para adultos. Todas las edades son bienvenidas". / £14/clase
2. "Contemporáneo" / "Influenciado por Forsythe, Cunningham y la técnica de liberación. Espere trabajar. Espere sentir algo". / £14/clase
3. "Latín" / "Salsa, Bachata, Cha-Cha y entrenamiento a nivel de competición. Todos los niveles, desde el social hasta el competitivo". / £14/clase
4. "Hip-Hop" / "Fundamentos de la vieja escuela con energía de la nueva escuela. Breaking, lock, popping y freestyle. Todos los niveles". / £14/clase

Última fila: borde inferior: 1px sólido hsl(var(--border)).

Movimiento del marco: whileInView, escalonamiento 0,1 s, opacidad 0→1, y 18→0, ventana gráfica={{ once: true }}

### 4. Horario semanal
Fondo: #0d0a0a (ligeramente más claro, casi negro). Relleno: 100px 6%.

**Encabezado:**
- Inter 300, 10px, rosa cobre, espacio entre letras: 0,2 em, mayúsculas: "HORARIO"
- Cormorant 700 cursiva, 64px, marfil: "Esta semana clases."
- Margen inferior: 48px

**Cuadrícula:**
7 columnas (lunes a domingo) × 4 filas (encabezado + 3 intervalos de tiempo).
CSS Cuadrícula: columnas de plantilla de cuadrícula: repetir(7, 1fr), espacio: 2px.

Fila de encabezado del día: Cormorant 700 cursiva, 14px, marfil, alineación de texto: centro, relleno: 12px 0.
Ranuras horarias:
- Disponible: fondo: rgba(196,122,106,0.08), borde: 0.5px sólido rgba(196,122,106,0.2), relleno: 14px 8px, alineación de texto: center.
 Cormorant 300 cursiva, 14px, marfil 80%: nombre de clase. Inter 300, 11px, silenciado: time.
 Colocar el cursor sobre: ​​fondo: rgba(196,122,106,0.15), color del borde: #c47a6a. Transición: 0,15 s.
- Reservado completo: fondo: rgba(255,255,255,0.02), Inter 300, 11px, silenciado 40%, decoración de texto: línea completa: "Completo"

**3 filas de tiempo:** 9 a. m. Mañana / 6 p. m. Tarde / 10 a. m. Fin de semana

**Muestra de horario:**
- Lunes por la mañana: "Ballet Beg". (9 a.m.) | Lunes por la noche: "Contemporáneo" (18:00 horas) | Lun fin de semana: —
- Martes por la mañana: "Hip-Hop" (9 a.m.) | Martes por la noche: "BalletAdv." (6:00 p. m.) | martes fin de semana: —
- miércoles por la mañana: "Latin" (9 a. m.) | miércoles por la noche: "Contemporary" (6:00 p. m.) | miércoles fin de semana: —
- jueves por la mañana: completo | jueves por la noche: "Ballet Int." (6:00 p. m.) | jueves fin de semana: —
- viernes por la mañana: "Hip-Hop" (9 a. m.) | Viernes por la noche: completo | Viernes Fin de semana: —
- Sábado: Horarios de fin de semana: "Ballet Beg." (10 a. m.) / "Latin" (12 p. m.) / "Hip-Hop" (2 p. m.) (2:00 p.m.)

Cuadrícula inferior: Cormorant 300 cursiva, 14 px, silenciado, margen superior: 20 px: "Horario sujeto a cambios. Reserva con antelación para asegurar tu lugar."
Enlace de cobre rosa: "Ver horario completo →"

### 5. Sección de Instructores
Antecedentes: hsl(var(--background)). Relleno: 100px 6%.

**Encabezado:**
- Inter 300, 10px, cobre rosa, espacio entre letras: 0,2 em, mayúsculas: "NUESTROS INSTRUCTORES"
- Cormorant 700 cursiva, 64px, marfil, margen inferior: 56px: "Capacitado para enseñar. Nacido para moverse."

**3 tarjetas de instructor: cuadrícula de 3 columnas, espacio: 20 px:**
Ecada: posición: relativa, desbordamiento: oculto, sin radio de borde.
Fondo: #141010.

Card diseño:
- Fotografía de retrato cuadrado con sangrado completo (relación de aspecto 1:1)
- Superposición en la parte inferior (degradado dentro del área de la imagen): gradiente lineal (hacia arriba, rgba(10,8,8,0.85) 0%, transparente 50%)
- Encima de la superposición (índice z: 10, posición: absoluta, abajo: 0, izquierda: 0, relleno: 20px):
 - Chip de cobre rosa: fondo: rgba(196,122,106,0.2), borde: 0.5px sólido #c47a6a, Inter 300, 10px, espacio entre letras: 0.12em, cobre rosa, radio del borde: 100px, relleno: 4px 12px: especialidad
 - Cormorant 700 cursiva, 24px, marfil, margen superior: 8px: nombre
 - Cormorant 300 cursiva, 13px, silenciado: credenciales

Hover: escala: 1.02 en la imagen (la tarjeta en sí no se escala, solo la imagen que contiene). Transición: 0,4 s de facilidad.

**Los 3 instructores:**

1. Elena Vasquez
{/* Imagen: retrato profesional de una bailarina de ballet de unos 30 años, de apariencia hispana, vestida con un sencillo leotardo negro y el cabello recogido en un moño apretado.media vuelta con un brazo extendido hacia arriba. Tomada contra un fondo oscuro de carbón con una iluminación suave y dramática desde arriba a la izquierda, creando un elegante juego de sombras. Estado de ánimo: clásico, elegante, autoritario. */}
<img src="" alt="Elena Vasquez — Instructora de ballet" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%',spectRatio: '1/1' }} />
Chip: "Ballet · 12 años del Royal Ballet Escuela"
Nombre: "Elena Vasquez"
Credenciales: "R.A.D. Associate · Graduada de Royal Ballet School"
"Libro con Elena →"

2. James Okafor
{/* Imagen: retrato profesional de un bailarín contemporáneo de veintitantos años, británico negro, vestido con ropa de ensayo oscura y ajustada. Está atrapado en medio de un movimiento contemporáneo, tal vez un estiramiento lateral profundo o una pose en el suelo, filmado en un estudio de paredes negras con una única iluminación dramática desde arriba. Estado de ánimo: crudo, artístico, poderoso, intelectual. */}
<img src="" alt="James Okafor — Instructor de danza contemporánea" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', aspectoRatio: '1/1' }} />
Chip: "Contemporáneo · Anteriormente Rambert Danza”
Nombre: “James Okafor”
Credenciales: “B.A. Danza Teatro · 8 años etapa profesional”
”Libro con James →”

3. Sofia Reyes
{/* Imagen: Retrato profesional de una instructora de baile latino de unos 40 años, apariencia brasileña, con un vestido latino vibrante en tonos joya. Ella posa en una postura latina segura (peso desplazado, brazos en una posición de marco clásica) contra un fondo oscuro mate. La cálida iluminación del estudio le da a su piel un brillo cálido. Estado de ánimo: confianza, pasión, experiencia, alegría. */}
<img src="" alt="Sofia Reyes — Instructora de baile latino" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%',spectRatio: '1/1' }} />
Chip: "Latin · 2× Campeón Mundial Latino"
Nombre: "Sofia Reyes"
Credenciales: "Licenciatura ISTD · 2× Campeona Mundial de Baile Latino"
"Libro con Sofia →"

Framer Motion: stagger 0.12s, opacity 0→1, y 24→0, viewport={{ once: true }}

### 6. Sección de exhibición
Antecedentes: #0d0a0a. Relleno:100px 6%. Alineación de texto: centro.

- Inter 300, 10px, cobre rosa, espacio entre letras: 0,2 em, mayúsculas, margen inferior: 16px: "PRÓXIMAS ACTUACIONES"

- "ELLIPSE PRESENTA" en Cormorant 700 cursiva, clamp(60px,9vw,160px), marfil, espaciado entre letras: -0,01 em, alto de línea: 1,0, margen inferior: 56 px. [Esta es una declaración tipográfica, no hay fotografía.]

**2 Eventos de rendimiento:**
Each: display: inline-flex, align-items: center, gap: 24px, background: rgba(196,122,106,0.06), border: 0.5px solid hsl(var(--border)), relleno: 28px 36px, sin radio de borde, ancho: 100%, ancho máximo: 600px, margen: 12px automático, cursor: puntero, desplazamiento: color de borde: #c47a6a, transición: 0.2s.

- Chip de fecha de cobre rosa (Inter 300, 11 px, espacio entre letras: 0,12 em, cobre rosa bg 20 %, redondeado: 100 px): fecha
- Cormorant 700 cursiva, 24 px, marfil: título de la actuación
- Cormorant 300 cursiva, 14 px, silenciado: lugar
- Cobre rosa Enlace "Comprar Entradas →" (Inter 300, 12px, cobre rosa, alineado a la derecha, flex: auto)

**Las 2 funciones:**
1. Chip de fecha: "SAT 14 DIC" / "Winter Showcase" / "Hackney Empire, Londres" / "Comprar entradas →"
2. Chip de fecha: "SAT 22 MAR" / "Spring Showcase" / "Barbican Centre, Londres" / "Comprar entradas →"

Framer Motion: escala de tarjetas 0,96→1, opacidad 0→1 en whileInView.

### 7. Prueba gratuita CTA
Sección de ancho completo. Fondo: #3a1510 (rosa oscuro). Borde: sombra interior o borde exterior de cobre rosa de 0,5 px en la parte superior. Relleno: 120px 6%. Alineación de texto: centro.

- Cormorant 700 cursiva, clamp(44px,6vw,102px), marfil, margen inferior: 16px: "Tu primera clase es gratis".
- Cormorant 300 cursiva, 19px, marfil 70%, margen inferior: 40px: "Sin compromiso. Sin registro. Solo ven y moverse."
- "Reserve su clase gratuita" — marfil bg (#f5f0e8), texto oscuro (#0a0808), Cormorant 300 cursiva, 16px, espacio entre letras: 0,06em, relleno: 15px 44px, sin radio de borde

Framer Motion: escala 0,96 → 1, opacidad 0 → 1, ventana gráfica = {{ una vez: verdadero }}, duración: 0,7 s.

### 8. Pie de página
Fondo: #0a0808. Borde superior: hsl sólido de 0,5 px (var (--border)). Relleno: 64px 6%.
3-columnagrid:

Columna 1: "Ellipse" Cormorant 700 cursiva, 20px, cobre rosa. Abajo: Cormorant 300 cursiva, 14 px, silenciado: "Dance Studio · Shoreditch, Londres". Íconos sociales flotan: cobre rosa.

Columna 2: "Clases" - Inter 300, 10 px, cobre rosa, encabezado con espacio entre letras. Enlaces: Cormorant 300, 14px, silenciado: Ballet / Contemporáneo / Latino / Hip-Hop / Clase de prueba

Columna 3: "Visita" - mismo encabezado. Cormorant 300, 14 px, silenciado: "12 Rivington Street, Shoreditch, Londres EC2A 3DU" / "Lunes a viernes: 8 a. m. a 9 p. m. / Sábados y domingos: 9 a. m. a 6 p. m." / "hello@ellipsedance.co.uk" / "+44 (0)20 7123 9876"

Abajo: Inter 300, 11px, silenciado 45%: "© 2025 Ellipse Dance Studio Ltd. Todos los derechos reservados."

## Animaciones

| Elemento | Animación | Duración | Retraso | Flexibilización |
|---|---|---|---|---|
| Titular de héroe | opacidad 0→1, y 36→0 | 0,95s | 0s | [0.16,1,0.3,1] |
| Sub héroe | opacidad 0→1, y 28→0 | 0,95s | 0,18s | [0.16,1,0.3,1] |
| CTA de héroe | opacidad 0→1, y 22→0 | 0,95s | 0,28 s | [0.16,1,0.3,1] |
| Filas de estilo | opacidad 0→1, y 18→0 | 0,5 s | i×0,1s | facilidad |
| Tarjetas de instructor | opacidad 0→1, y 24→0 | 0,65s | i×0,12s | facilidad |
| Eventos de exhibición | escala 0,96→1, opacidad 0→1 | 0,5 s | i×0,1s | facilidad |
| Bloque de CTA | escala 0,96→1, opacidad 0→1 | 0,7s | 0s | facilidad |
| Colocar el cursor sobre la fila de estilo | y 0→-4, aparece el borde rojo | 0,25 s | — | facilidad |
| Colocar el cursor sobre la imagen del instructor | escala 1→1.02 | 0,4 s | — | facilidad |
| Desplazamiento del horario | color bg | 0,15s | — | facilidad |
| Pasar el cursor sobre la tarjeta de presentación | color del borde | 0,2 s | — | facilidad |

All whileInView: viewport={{ once: true }}

## Responsive

**Escritorio (≥1024px):**
- Hero: ventana gráfica completa, contenido en la parte inferior izquierda
- Estilos: ancho completo filas
- Horario: cuadrícula de 7 columnas
- Instructores: cuadrícula de 3 columnas
- Escaparate: centrado, tarjetas de 600 px de ancho máximo
- Pie de página: 3 columnas

**Tableta (768–1023px):**
- Estilos: filas (mismo texto más estrecho)
- Horario: desplazamiento horizontal (desbordamiento-x: automático)
- Instructores: 3 columnas (más ajustado)
-Pie de página: 2 columnas

**Móvil (<768px):**
- Barra de navegación: hamburguesa, enlaces en cursiva Cormorant en superposición oscura
- Héroe: ancho completo, tarjeta flotante oculta, alineación de texto: izquierda
- Texto de fondo "ELLIPSE": opacidad 0.02, abrazadera a 120px max
- Estilos: filas, tipo ligeramente más pequeño
- Horario: desplazamiento horizontal, ancho mínimo: 600px
- Instructores: pila de una sola columna
- Escaparate: una sola columna
- Pie de página: simple columna

## Copia completa

**Navegación:** Elipse · Clases · Horario · Instructores · Escaparate · Contacto

**Héroe:**
- Ceja: "DANCE STUDIO · SHOREDITCH"
- Titular: "Muévete como quieres decir It."
- Sub: "Clases coreografiadas profesionalmente para adultos y niños en estudios de ballet, música contemporánea, música latina y hip-hop en Shoreditch".
- CTA 1: "Encuentra tu clase"
- CTA 2: "Primera clase gratis"

**Etiqueta de clases:** "NUESTRO. CLASES"
**Título de las clases:** "Algo para todos". 
- Ballet: "Desde principiantes absolutos hasta preprofesionales Programa de estudios RAD graduado junto con clases abiertas para adultos. | £14/clase
- Contemporáneo: "Influenciado por Forsythe, Cunningham y la técnica de liberación. Espere trabajar. Espere sentir algo". | £14/clase
- Latín: "Salsa, Bachata, Cha-Cha y entrenamiento a nivel de competición. Todos los niveles, desde social hasta competitivo". | £14/clase
- Hip-Hop: "Fundamentos de la vieja escuela con energía de la nueva escuela. Rompimiento, bloqueo, estallido y estilo libre. Todos los niveles". | £14/clase

**Etiqueta del horario:** "HORARIO"
**Título del horario:** "Clases de esta semana".
**Nota del horario:** "Horario sujeto a cambios. Reserva con anticipación para asegurar tu lugar".

**Etiqueta del instructor:** "NUESTRO INSTRUCTORES"
**Título de los instructores:** "Formados para enseñar. Nacidos para moverse."
- Elena Vasquez / "Ballet · 12 años Royal Ballet School" / "R.A.D. Associate · Graduado de Royal Ballet School" / "Libro con Elena →"
- James Okafor / "Contemporary · Formerly Rambert Dance" / "B.A. Danza Teatro · 8 años etapa profesional" / "Libro con James →"
-Sofia Reyes / "Latin · 2× Campeona Mundial Latina" / "Licenciatura ISTD · 2× Campeona Mundial de Danza Latina" / "Reserva con Sofia →"

**Showcase:**
- Etiqueta: "PRÓXIMAS ACTUACIONES"
- "ELLIPSE PRESENTA"
- "Winter Showcase" / "SÁB 14 DIC" / "Hackney Empire, Londres" / "Comprar entradas →"
- "Spring Showcase" / "SÁB 22 MAR" / "Barbican Centre, Londres" / "Comprar entradas →"

**CTA de prueba:**
- Titular: "Tu primera clase es Gratis."
- Sub: "Sin compromiso. Sin registro. Solo ven y muévete". 
- Botón: "Reserva tu clase gratuita"

**Pie de página:**
- Lema: "Dance Studio · Shoreditch, Londres"
- Dirección: "12 Rivington Street, Shoreditch, Londres. EC2A 3DU"
- Horario: "Lunes a viernes: 8 a.m. a 9 p.m. / Sábados y domingos: 9 a.m. a 6 p.m."
- Correo electrónico: "hello@ellipsedance.co.uk"
- Teléfono: "+44 (0)20 7123 9876"
- Legal: "© 2025 Ellipse Dance Studio Ltd. Todos los derechos reservados."

## Dependencias clave
```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx",
  "tailwindcss": "^3.x"
}
```