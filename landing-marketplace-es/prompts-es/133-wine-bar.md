# Vigne Wine Bar — Aviso del sitio web del bar de vinos

## Objetivo
Cree un sitio web de bar de vinos natural y cinematográfico oscuro para "Vigne Wine Bar": fondo color burdeos intenso, detalles en champán envejecido, reflejos cálidos en terracota, tipografía editorial en cursiva Cormorant Garamond, ambiente íntimo y evocador.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

## Design System

### Colors
```css
:root {
  --background: 330 40% 8%;
  --foreground: 37 68% 86%;
  --primary: 37 48% 67%;
  --primary-foreground: 330 40% 8%;
  --muted-foreground: 37 20% 58%;
  --border: 37 18% 20%;
  --accent: 12 44% 55%;
}
```

Hex referencia:
- Fondo: #1a0d1a (burdeos-negro intenso)
- Primer plano (crema cálida): #f5ede0
- Primario (champán envejecido): #d4b882
- Acento (terracota): #c47a55
- Silenciado: #9e8e78
- Borde: #3d3020

### Tipografía
Fuentes de Google import:
`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,700&family=Inter:wght@300,400&display=swap`

- Pantalla/Titulares: Cormorant Garamond 700 cursiva
- Cuerpo/Descripciones: Cormorant Garamond 300
- UI/Etiquetas/Nav: Inter 300

## Efectos visuales

### Efecto 1: Texto de marca de desbordamiento de fondo
```css
.bg-brand-text {
  position: absolute;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 700;
  font-size: clamp(180px, 25vw, 380px);
  opacity: 0.03;
  color: hsl(var(--foreground));
  right: -4%;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
  letter-spacing: -0.02em;
}
```
Texto: "VIGNE"

### Efecto 2: Tira de chips animada (Hero)
5 fichas de color champán se animan desde la izquierda con tambaleo. Cada chip: fondo: rgba(212,184,130,0.12), borde: 0.5px sólido hsl(var(--primary)), color: hsl(var(--primary)), radio del borde: 100px, relleno: 6px 16px, Inter 300, 12px, espaciado entre letras: 0.1em.
Framer Motion: inicial={{ opacidad: 0, x: -24 }}, animate={{ opacidad: 1, x: 0 }}, transición={{ retraso: 0.6 + índice * 0.1, duración: 0.5, facilidad: 'easeOut' }}

### Efecto 3: Superposición de héroe degradado de zona dual
```css
background: linear-gradient(
  to bottom,
  rgba(26,13,26,0.78) 0%,
  transparent 40%,
  transparent 60%,
  rgba(26,13,26,0.88) 100%
);
```
Crea una zona superior legible (área de navegación) y una zona inferior legible (área de contenido) mientras la fotografía atmosférica respira a través del medio.

### Efecto 4: Filas flotantes de la región vinícola
Eda fila se eleva al pasar el mouse: transformar: traducirY (-3px), sombra de cuadro: 0 4px 20px rgba (212,184,130,0.15). El borde izquierdo de champán aparece al pasar el mouse: border-left: 2px solid hsl(var(--primary)). Transición: 0,22 s de facilidad.

## Desglose de componentes

### 1.Navbar
- Parte superior fija, fondo: rgba(26,13,26,0.90), filtro de fondo: desenfoque(16px)
- Alto: 60px
- Izquierda: "Vigne" en Cormorant Garamond 700 cursiva, 22px, color champán (#d4b882), espacio entre letras: 0,06 em
- Centro: enlaces de navegación en Inter 300, 11 px, espacio entre letras: 0,15 em, mayúsculas, color crema — La lista/Quesos y tablas/Vuelos de vino/Cena privada/Reservar
- Derecha: "Reservar una mesa" — botón fantasma, champán de 0,5 px borde, Cormorant 300, 13px, color champán, relleno: 8px 20px, sin radio de borde
- Borde inferior: 0,5px sólido hsl(var(--border))
- Pase el cursor sobre los enlaces de navegación: color champán, transición 0,2s

### 2. Hero
Vista completa, posición: relativa, desbordamiento: oculto.

**Imagen de fondo:**
{/* Imagen: Fotografía cinematográfica de gran angular del interior de una bodega: paredes de piedra, hileras de barriles de madera oscura envejecidos que se pierden en la oscuridad, una única lámpara colgante de color ámbar cálido visible en el marco central. La luz dorada del atardecer se filtra a través de una estrecha ventana de piedra a la derecha. La atmósfera es antigua, íntima y profundamente atmosférica. Tomada con una lente fija gran angular con grano visible. Estado de ánimo: atemporal, sensorial, invitación a quedarse. */}
<img src="" alt="Bodega con paredes de piedra y barricas añejadas en luz dorada" style={{ objectFit: 'cover', objectPosition: 'center', ancho: '100%', alto: '100%', posición: 'absolute', recuadro: 0 }} />

**Superposición de degradado (índice z: 1, posición: absoluta, recuadro: 0):**
```css
background: linear-gradient(
  to bottom,
  rgba(26,13,26,0.78) 0%,
  transparent 40%,
  transparent 60%,
  rgba(26,13,26,0.88) 100%
);
```

**Texto de fondo (índice z: 0):**
"VIGNE" — Cormorant 700 cursiva, clamp(180px,25vw,380px), opacidad: 0,03, crema, derecha: -4%, arriba: 50%, traducirY(-50%), selección de usuario: ninguna.

**Bloque de contenido (índice z: 10):**
Posición: absoluta, abajo: 10vh, izquierda: 50%, transformar: traducirX(-50%), ancho: 90%, ancho máximo: 800px, alineación de texto: center.

- Titular: "Bebe bien. Bebe despacio". — Cormorant 700 cursiva, clamp(56px,7.5vw,132px), espacio entre letras: -0,02 em, crema (#f5ede0), margen inferior: 20px
- Framer Motion: inicial={{ opacidad: 0, y: 30 }}, animate={{ opacidad: 1, y: 0 }}, transición={{ duración: 0.9, facilidad:[0.16,1,0.3,1] }}

- Sub: "Una lista seleccionada de vinos naturales y artesanales de pequeños productores. Sin prisas. Sin ruido. Simplemente un gran vino". — Cormorán 300, 19 px, crema 80 % de opacidad, ancho máximo: 520 px, margen: 0 automático 32 px
- Movimiento del encuadre: retraso: 0,15 s

- CTA (flexionar, justificar: centro, espacio: 16 px, margen inferior: 36px):
 - "Explorar la lista" — champán bg (#d4b882), texto oscuro (#1a0d1a), Cormorant 300, 15 px, espacio entre letras: 0,08 em, relleno: 13 px 36 px, sin radio de borde
 - "Reservar una mesa" — transparente bg, borde: 0.5px hsl sólido(var(--primary)), texto crema, misma tipografía
 - Movimiento del marco: retraso: 0.25s

- Fila de chips (flexionar, justificar: centro, espacio: 10px, flex-wrap: wrap):
 "Más de 50 vinos naturales" · "Selección orgánica" · "Tabla de quesos" · "Live Jazz de jueves a sábado" · "Abierto hasta tarde"
 Cada chip: champán 12% de fondo, borde de champán de 0,5 px, texto de champán, radio de borde: 100 px, relleno: 6 px 16 px, Inter 300, 11 px
 Framer Motion escalonado: retardo: 0,6 + índice × 0,1 s

### 3. Lista de vinos por región
Antecedentes: hsl(var(--background)). Relleno: 120px 6%.

**Encabezado:**
- Inter 300, 11px, champagne, espacio entre letras: 0.18em, mayúsculas: "LA LISTA POR REGIÓN"
- Abajo: Cormorant 700 cursiva, 42px, crema: "Pequeños productores. Grandes convicción."
- Margen inferior: 72px

**4 filas de región:**
Each: flex, justificar contenido: espacio entre, alinear elementos: centro. Relleno: 36px 0. Borde superior: 1px sólido hsl(var(--border)). Cursor: puntero.
Hover: traducirY(-3px), sombra de cuadro: 0 4px 20px rgba(212,184,130,0.15). Transición: 0,22 s de facilidad.

Columna izquierda:
- Cormorant 700 cursiva, 32 px, crema: nombre de región
- Cormorant 300, 15 px, silenciado (#9e8e78): descripción de tipos de productor

Columna derecha (flex, brecha: 24px, align-items: center):
- Cormorant 300, 14px, champagne: rango de precios
- Cormorant 700 cursiva, 24px, champagne: "→"

**Las 4 regiones:**
1. Francia / "Domaines y négociants de Borgoña, Loira y Ródano. Los clásicos y los desconocidos." / desde 9€ / vidrio
2.Italia / "Contacto con la piel del Friuli. Tintos volcánicos del Etna. Blancos costeros de Liguria". / desde 9€ / vidrio
3. España / “Rioja natural, Albariño gallego, Garnacha aragonesa de cepa vieja”. / desde 8€ / vidrio
4. Nuevo Mundo / "Australia, Sudáfrica, Georgia. Los productores que la mayoría de las vinotecas aún no han encontrado". / desde £ 10 / vidrio

Última fila: borde inferior: 1px sólido hsl(var(--border)).

Framer Motion: cada fila whileInView={{ opacidad: 1, y: 0 }}, inicial={{ opacidad: 0, y: 20 }}, transición={{ duración: 0,55, retraso: índice * 0,1 }}, ventana gráfica={{ once: true }}

### 4. Sección dividida de quesos y embutidos
Fondo: hsl(var(--background)). Sin parte superior acolchada: fluye directamente desde las regiones.

**Diseño:** 2 columnas, 50 %/50 %, altura mínima: 560 px.

**Izquierda 50 % — Fotografía:**
{/* Imagen: fotografía aérea plana de una tabla de quesos de madera con tres variedades de queso (brie, añejo) queso cheddar, azul), prosciutto doblado, aceitunas, nueces, uvas y una copa de vino blanco al lado de la tabla. La cálida luz de las velas ilumina la escena desde la izquierda. Filmada sobre una superficie de madera oscura. Rico, táctil, abundante. Ambiente: cena agradable, generosa e íntima. */}
<img src="" alt="Tabla de quesos y embutidos artesanales con copa de vino y luz de velas" style={{ objectFit: 'cover', objectPosition: 'center', ancho: '100%', alto: '100%' }} />

**Derecha 50% — Contenido:**
Fondo: rgba(26,13,26,0.95). Relleno: 80px 6%.
- Inter 300, 11px, champán, espacio entre letras: 0,18em, mayúsculas, margen inferior: 24px: "QUESO Y TABLAS"
- Cormorán 700 cursiva, clamp(32px,4vw,56px), crema, margen inferior: 24px: Cita extraída: "Elegimos a los productores que visitaríamos, no solo los aprobaríamos". 
- Cormorant 300, 17 px, silenciado (#9e8e78), altura de línea: 1,7, margen inferior: 32 px: "Nuestra selección de quesos cambia con la temporada. Trabajamos directamente con dos afines en Francia y uno en Somerset. Cada tablero está ensamblado para orden."
- Chip de champán: fondo: rgba(212,184,130,0.1), borde: 0.5px champán sólido, color: champán, Inter 300, 12px, espacio entre letras: 0.1em, radio del borde: 100px, relleno: 8px 20px,display: inline-block: "Tablero desde £18"
- Chip inferior, margen superior: 24px: Cormorant 300, 15px, silenciado: "Agregue un vuelo por £12 más"

### 5. Wine Flights
Fondo: hsl(var(--background)). Relleno: 120px 6%.

**Encabezado:**
- Inter 300, 11px, champán, espacio entre letras: 0,18em: "WINE FLIGHTS"
- Cormorant 700 cursiva, 42px, crema: "Tres copas. Una historia."
- Margen inferior: 64px

**3 tarjetas de vuelo: cuadrícula de 3 columnas, espacio: 24px:**
Each: borde: 0.5px solid hsl(var(--border)), fondo: rgba(255,255,255,0.02), relleno: 40px 32px, sin radio de borde.
Hover: escala: 1.02, color de borde: champán (#d4b882). Transición: 0,3 s de facilidad.

Estructura de la tarjeta:
- Cormorant 300, 12 px, champán, espacio entre letras: 0,15 em, mayúsculas, margen inferior: 12 px: nivel de vuelo
- Cormorant 700 cursiva, 30 px, crema, margen inferior: 16px: nombre del vuelo
- Cormorant 300, 16px, silenciado, altura de línea: 1,65, margen inferior: 28px: descripción
- divisor champán: 1px, ancho completo, margen inferior: 20px
- Cormorant 700 cursiva, 26px, crema: precio

**Los 3 vuelos:**
1. "Descubrimiento" — "Un viaje temático a través de tres copas. Diseñado para presentar una región, uva o estilo que quizás no hayas probado. Elegido todas las noches por nuestro sommelier". — £28
2. "Clásico" - "Tres regiones célebres, tres productores célebres. Borgoña, Rioja y Barosa en secuencia. Una clase magistral en estructura y lugar". — £38
3. "Prestige": "Tres botellas excepcionales servidas por copa; vinos que abrimos solo cuando la mesa está lista. Pregúntele al equipo qué está abierto esta noche". — £58

Movimiento del marco: escalonado 0,12 s, misma animación de entrada que otras tarjetas.

### 6. Sección de comedor privado
Fondo: rgba(26,13,26,0.97). Relleno: 100px 6%. Ancho máximo: 760 px, margen: automático, alineación de texto: centro.
Borde superior e inferior: 1 px sólido hsl(var(--border)).

- Inter 300, 11 px, champán, espacio entre letras: 0,18 em, mayúsculas, margen inferior: 20 px: "COMEDOR PRIVADO"
- Cormorant 700 cursiva, clamp(36px,5vw,72px), crema, margen inferior: 20px: "La lista es privada.La habitación también puede serlo."
- Cormorant 300, 18px, silenciado, altura de línea: 1,7, margen inferior: 36px: "Nuestro sótano tiene capacidad para doce. La lista viaja con la comida. Para reservas corporativas, celebraciones privadas y cenas con vino, nuestro equipo creará un menú a su medida."
- Dos patatas fritas una al lado de la otra: "Desde £45 por cabeza" + "Min. 8 invitados"
- Inter 300, 13px, champán, margen superior: 32px, subrayado, puntero del cursor: "Pregunte sobre cenas privadas →"

### 7. Testimonio
Fondo: hsl(var(--background)). Relleno: 80px 6%. Ancho máximo: 680 px, margen: automático.

Testimonio destacado único:
- Cormorant 700 cursiva, 28 px, crema, altura de línea: 1.4: "La carta de vinos más reflexiva del vecindario. No hay un solo vino que no pediría."
- Inter 300, 12px, champán, espacio entre letras: 0,12 em, margen superior: 20px: "— James T., invitado verificado"
- Borde izquierdo: 1px champán sólido (#d4b882), padding-left: 28px.

### 8. Reserva CTA
Fondo de ancho completo: hsl(var(--background)). Borde superior: 1px sólido hsl(var(--border)). center.

- Cormorant 700 cursiva, clamp(36px,5.5vw,96px), crema: "Ven como eres. Quédate todo el tiempo que quieras."
- Margen-abajo: 20px
- Cormorant 300, 18px, silenciado: "Abierto de lunes a miércoles de 16:00 a medianoche · De jueves a sábado de 15:00 a 1:00 · Domingo de 14:00 a 22:00"
- Margen-abajo: 48px
- CTA: "Reserve una mesa" — champagne bg (#d4b882), texto oscuro (#1a0d1a), Cormorant 300, 15px, espacio entre letras: 0,08em, relleno: 16px 44px, sin radio de borde
- Abajo: Cormorant 300, 13px, silenciado 60%: "No se requiere depósito para grupos menores de 6 años"

### 9. Pie de página
Fondo: rgba(10,5,10,1 Borde superior: 1px sólido hsl(var(--border)). 6%.
Cuadrícula de 3 columnas:

Columna 1: "Vigne" Cormorant 700 cursiva, 20 px, champán Abajo: Cormorant 300, 13 px, silenciado: "Vinos naturales y platos pequeños. Abierto hasta tarde". Iconos sociales (lucide: Instagram) flotante: champagne.

Columna 2: "Encuéntranos" — Inter 300, 11 px, champagne, espacio entre letras: 0,15 em. Enlaces: Cormorant 300, 14 px, silenciado: "42 Lexington Street,Soho, Londres W1F 0LP" / "Lunes a miércoles de 4 p. m. a medianoche" / "Jueves a sábado de 3 p. m. a 1 a. m." / "Domingos de 2 p. m. a 10 p. m."

Columna 3: "Póngase en contacto" - igual. Cormorant 300, 14px, silenciado: "reservations@vignewinebar.com" / "+44 (0)20 7456 8910" / "Se recomienda reservar para viernes y sábado"

Abajo: Inter 300, 11px, silenciado 50%: "© 2025 Vigne Wine Bar. Todos los derechos reservados."

## Animaciones

| Elemento | Animación | Duración | Retraso | Facilitación |
|---|---|---|---|---|
| Opacidad del héroe 0→1, y 30→0 | [0.16,1,0.3,1] |
| Hero sub | opacity 0→1, y 30→0 | 0.9s | 0.15s | [0.16,1,0.3,1] |
| Hero CTAs | opacity 0→1, y 30→0 | 0.9s | 0.25s | [0.16,1,0.3,1] |
| Chips (5) | opacidad 0→1, x -24→0 | 0.6s + i×0.1s |
| |
| Flight cards | opacity 0→1, y 24→0 | 0.6s | i×0.12s | [0.16,1,0.3,1] |
| Testimonial | opacity 0→1, x -20→0 | 0.7s | 0s | ease |
| CTA block | scale 0.96→1, opacity 0→1 | 0.65s | 0s | ease |
| Row hover | y 0→-3 | 0.22s | — | ease |
| Card hover | scale 1→1.02 | 0.3s | — | ease |

All whileInView: viewport={{ once: true }}

## Responsive

**Escritorio (≥1024px):**
- Contenido principal centrado, ancho máximo 800px
- Filas de región: horizontal de ancho completo
- Sección de queso: División 50/50
- Vuelos: cuadrícula de 3 columnas
- Pie de página: cuadrícula de 3 columnas

**Tableta (768–1023px):**
- Sección de queso: se apila verticalmente (foto en la parte superior, contenido a continuación)
- Vuelos: Pila vertical de 1×3
- Pie de página: cuadrícula de 2 columnas

**Móvil (<768px):**
- Barra de navegación: Cormorant cursiva "Vigne" a la izquierda, hamburguesa a la derecha
- Héroe: chips ajustados a 2 filas, texto alineado a la izquierda
- Filas de región: pila con tipo más pequeño
- Sección de queso: vertical de ancho completo
- Vuelos: tarjetas de una sola columna
- Pie de página: una sola columna
- Texto "VIGNE" de fondo: no mostrar ninguno en el móvil

## Completo Copy

**Navegación:** Vigne · La Lista · Quesos y Tablas · Vuelos de Vino ·Cena privada · Reserva

**Héroe:**
- Titular: "Bebe bien. Bebe despacio".
- Sub: "Una lista seleccionada de vinos naturales y artesanales de pequeños productores. Sin prisas. Sin ruido. Simplemente un gran vino".
- CTA 1: "Explora el Lista"
- CTA 2: "Reservar Mesa"
- Chips: "50+ Vinos Naturales" · "Selección Orgánica" · "Tabla de Quesos" · "Live Jazz Ju-Sáb" · "Abierto hasta tarde"

**Sección Carta de Vinos:**
- Etiqueta: "LA LISTA POR REGIÓN"
- Lema: "Pequeños productores. Gran convicción."
- Francia: "Domaines y négociants de Borgoña, Loira y el Ródano. Los clásicos y los desconocidos. | desde £ 9 / vaso
- Italia: "Contacto con la piel del Friuli. Tintos volcánicos del Etna. Blancos costeros de Liguria". | desde £9 / copa
- España: "Rioja natural, Albariño gallego, Garnacha de Aragón de cepa vieja". | desde £ 8 / copa
- Nuevo Mundo: "Australia, Sudáfrica, Georgia. Los productores que la mayoría de las vinotecas aún no han encontrado". | desde £ 10 / vaso

**Quesos y tablas:**
- Etiqueta: "QUESO Y TABLAS"
- Cita extraída: "Elegimos productores que visitaríamos, no solo aprobaríamos". 
- Cuerpo: "Nuestra selección de quesos cambia con la temporada. Trabajamos directamente con dos affineurs en Francia y uno en Somerset. Cada tablero se ensambla bajo pedido."
- Ficha de precio: "Tablero desde £ 18"
- Sub: "Agregue un tramo por £ 12 más"

**Vuelos de vino:**
- Etiqueta: "VUELOS DE VINO"
- Lema: "Tres copas una. story."
- Descubrimiento: "Un viaje temático a través de tres copas Diseñado para presentar una región, uva o estilo que quizás no hayas probado cada noche por nuestro sommelier. | £28
- Clásico: "Tres regiones célebres, tres productores célebres. Borgoña, Rioja y Barossa en secuencia. Una clase magistral en estructura y lugar". | £38
- Prestigio: "Tres botellas excepcionales servidas por copa: vinos que abrimos solo cuando la mesa está lista. Pregúntele al equipo qué está abierto esta noche". | £58

**Cena privada:**
- Etiqueta: "CENA PRIVADA"
- Titular: "La lista es privada. La habitación también puede serlo".
- Cuerpo: "Nuestro sótano tiene capacidad para doce personas.La lista viaja con la comida. Para reservas corporativas, celebraciones privadas y cenas con vino, nuestro equipo creará un menú a su medida."
- Chips: "Desde £45 por cabeza" / "Min. 8 invitados"
- Enlace: "Pregunte sobre cenas privadas →"

**Testimonio:** "La carta de vinos más detallada del vecindario. No hay ni un solo vino que no pediría. — James T., huésped verificado"

**CTA de reserva:**
- Titular: "Ven como eres. Quédese todo el tiempo que desee."
- Horario: "Abierto de lunes a miércoles de 4 p. m. a medianoche · Jueves a sábado de 3 p. m. a 1 a. m. · Domingo de 2 p. m. a 10 p. m."
- Botón: "Reservar una mesa"
- Sub: "No se requiere depósito para fiestas menores 6"

**Pie de página:**
- Lema: "Vinos naturales y platos pequeños. Abierto hasta tarde."
- Dirección: "42 Lexington Street, Soho, London W1F 0LP"
- Correo electrónico: "reservations@vignewinebar.com"
- Teléfono: "+44 (0)20 7456 8910"
- Nota: "Se recomienda reservar para Viernes y sábado"
- Legal: "© 2025 Vigne Wine Bar. Todos los derechos reservados."

## Dependencias clave
```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx",
  "tailwindcss": "^3.x"
}
```