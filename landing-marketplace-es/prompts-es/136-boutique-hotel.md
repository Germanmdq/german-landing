# Sitio web de hotel boutique Prompt
# websiteprompts.ai

Cree un hotel boutique editorial oscuro y un sitio web de B&B de lujo llamado "The Aldwick" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 215 16% 9%;           /* deep slate #13181f */
  --foreground: 38 20% 88%;           /* warm pearl */
  --primary: 38 20% 88%;
  --primary-foreground: 215 16% 9%;
  --accent: 38 46% 56%;               /* warm gold #c9a55a */
  --surface: 215 14% 13%;
  --surface-raised: 215 12% 17%;
  --muted-foreground: 38 8% 56%;
  --border: 215 10% 22%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500&display=swap`
- Titulares: Cormorant Garamond 700 cursiva — editorial lujo
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas 10px espaciado entre letras 0.14em

## Secciones

### 1. Navbar
- Pizarra profunda y pegajosa, `backdrop-filter: blur(14px)`
- Izquierda: Cormorán en cursiva "The Aldwick" en dorado cálido
- Derecha: Habitaciones · Restaurantes · Experiencias · Ubicación + botón con contorno dorado "Reservar una estancia →"

### 2. Hero
- Altura de la ventana de visualización completa
- Fotografía de hotel con sangrado completo `posición: recuadro absoluto-0 w-h completo-objeto completo-cubierta objeto-centro`
- Degradado dual cinematográfico: `linear-gradient(to bottom, rgba(19,24,31,0.7) 0%, rgba(19,24,31,0.1) 35%, rgba(19,24,31,0.1) 60%, rgba(19,24,31,0.92) 100%)`
- Contenido `índice z: 10`, centrado en la parte inferior: `display: flex; flex-direction: column; align-items: center; padding-bottom: 8vh`
 - Inter 500 mayúscula etiqueta dorada de 10px centrado: "Boutique Hotel · Cotswolds"
 - Cormorant Garamond 700 cursiva `clamp(62px, 9vw, 135px)` centrado en perla, altura de línea 0,88: "Un lugar\ndiferente a cualquier otro".
 - Acento dorado en "Diferente a cualquier otro".
 - Inter 300 centrado en perla apagada `max-width: 520px`: "12 habitaciones diseñadas individualmente, un restaurante que sirve productos de temporada de Cotswolds y terrenos que cambian con cada temporada"
 - CTA centrados: "Reserve una estadía →" (texto oscuro y relleno de oro) + "Ver las habitaciones" (perla fantasma)
- Tira de CTA debajo del héroe (dentro del héroe, abajo `índice z: 10`, fila horizontal centrada):
 - 5 pequeñas fichas doradas: "12 habitaciones · Se admiten perros · Restaurante · Estacionamiento gratuito · Cotswolds"
 - Deslizamiento desde la izquierda, escalonamiento 0,08 s en la montaña

{/* Imagen breve: exterior de un hotel boutique al anochecer, ventanas cálidas brillando, edificio de piedra, jardín bien cuidado, crepúsculo atmosférico, fotografía de un hotel rural de lujo */}

: desvanecimiento escalonado en el montaje: etiqueta (0 s), título (0,15 s), sub (0,3 s), CTA (0,45 s), chips (0,6 s) 

### 3. ElHabitaciones
- "The Rooms" — Cormorán 700 perla cursiva con regla subrayada dorada
- 3 filas de ancho completo con elevación flotante:
 - Habitaciones clásicas (6 habitaciones, elementos originales, vista al jardín, desde £ 180/noche)
 - Habitaciones Deluxe (4 habitaciones, baño independiente, vista al campo, desde £ 240/noche)
 - The Suite (suite principal, terraza privada, desde £ 380/noche)
- Cada una: Cormorant 600 cursiva tipo de habitación grande izquierda + descripción Inter 300 derecha + dorado "→" + precio
- `border-bottom: 1px solid hsl(var(--border))`
- Colocar el cursor sobre: superficie elevada, el texto se vuelve dorado

### 4. Galería
- "The Aldwick in Detail" — Cormorant 700 italic
- Cuadrícula de mampostería de 2 columnas, 6 imágenes, alternando 3/4 y 4/3, sin radio de borde, espacio de 3px
- Colocar el cursor sobre: superposición oscura `0→0.7` + etiqueta de habitación/espacio en cursiva Cormorant

{/* Resumen de imagen: dormitorio de hotel boutique, cama con dosel, paredes de piedra, luz cálida de lámpara, ropa de cama lujosa */}
{/* Resumen de imagen: baño de hotel con bañera con patas, ventana con vista al campo, luz dorada */}
{/* Resumen de imagen: restaurante de hotel, velas, mesa de comedor íntima, chimenea de piedra resplandeciente */}
{/* Imagen breve: salón del hotel, sillones profundos, estanterías, cálida luz de chimenea */}
{/* Imagen breve: terrenos del hotel al amanecer, niebla, campos ondulados, paredes de piedra */}
{/* Imagen breve: terraza del hotel, café matinal, vistas al campo, tranquilidad */}

### 5. Restaurante
- "El restaurante" — Cormorant 700 cursiva
- Dividido: texto izquierdo, imagen derecha
- Cormorant 300 cursiva cita extraída: "Todo lo que hay en el menú se cultivó aquí, se crió localmente o se obtuvo de los alrededores campo."
- Inter 300 silenciado: 2 párrafos - Jefe de cocina James Cole. El menú degustación de temporada cambia semanalmente. Desayuno disponible para todos los huéspedes. Restaurante abierto para no residentes de jueves a domingo.
- Chips de oro: "Menú de temporada · Productos locales · Abierto a no residentes de jueves a domingo"

{/* Imagen breve: plato servido en el restaurante del hotel, comida de temporada bellamente presentada, mesa a la luz de las velas, cálida fotografía editorial de comida */}

### 6. Experiencias
- "Qué hacer" — Cormorant 700cursiva
- 3 fichas horizontales: Caminar y andar en bicicleta (proporcionamos mapas y bicicletas) · Cena privada (alquiler exclusivo disponible) · Tratamientos de spa (reservas de terapeutas en la habitación)

### 7. Testimonios
- 3 tarjetas: cotización de Cormorant cursiva perla, nombre del huésped + tipo de habitación en Inter 10px silenciado, 5 estrellas gold row
- Desvanecimiento escalonado en el desplazamiento

### 8. Ubicación
- "Cómo llegar" - Cormorant 700 cursiva
- Inter 300 silenciado: "A dos horas de Londres, a cinco minutos de Bourton-on-the-Water, el corazón de los Cotswolds, sin el multitudes de turistas"
- Dos columnas: en automóvil / en tren, Inter 300 direcciones apagadas

### 9. Libro CTA
- Fondo dorado cálido de ancho completo `#c9a55a`
- Cormorant 700 cursiva pizarra oscura: "Es tu cita ¿Disponible?"
- Inter 300 dark: "Aceptamos un número limitado de reservas cada mes: verifique la disponibilidad y reserve su habitación directamente para obtener nuestra mejor tarifa"
- "Consultar disponibilidad →" botón de pizarra oscura
- "Mejor tarifa directa · Se admiten perros · Estacionamiento gratuito" Inter 10px dark 70%

### 10. Pie de página
- Pizarra profunda, Cormorán cursiva "The Aldwick" en dorado
- Instagram · Pinterest · TripAdvisor
- "© 2026 The Aldwick · Boutique Hotel & Restaurant · Bourton-on-the-Water, Cotswolds GL54 · +44 1451 123 456"

## Animaciones
- Héroe: desvanecimiento escalonado en la montura (ubicado en la parte inferior), fichas deslizadas desde la izquierda
- Filas de sala: elevación del cursor + transición dorada 0.2s
- Galería: desvanecimiento escalonado en el desplazamiento
- Reglas doradas: escalaX 0→1, 0.5s

## Responsive
- Móvil: héroe de ancho completo, galería de una sola columna, navegación de hamburguesa

## Copia completa
- Marca denominativa: "The Aldwick"
- Héroe: "Un lugar como ningún otro". / "12 habitaciones diseñadas individualmente, un restaurante que sirve productos de temporada de Cotswolds"
- Habitaciones: Clásica desde £180 · Deluxe desde £240 · Suite desde £380
- Restaurantes: Menú de degustación de temporada, productos locales, abierto de jueves a domingo
- Testimonio: "Nos alojamos por tres noches y realmente no queríamos irnos. La comida era excepcional y cada detalle de la habitación había sido pensado."— Charlotte y Ben W.
- CTA: "¿Está disponible su fecha?" / "Reserva directamente con nuestra mejor tarifa"