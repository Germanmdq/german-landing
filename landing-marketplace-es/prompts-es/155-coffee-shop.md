# Coffee Shop Website Prompt
# websiteprompts.ai

Cree un sitio web cálido y artesanal para una cafetería y un café llamado "Groundwork Coffee" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
 --background: 35 30% 97%; /* warm cream #faf6ef */
 --foreground: 22 40% 12%; /* espresso near-black */
 --primary: 22 55% 28%; /* espresso brown #6b3a1f */
 --primary-foreground: 35 30% 97%;
 --accent: 38 65% 55%; /* warm amber #c9833a */
 --surface: 35 25% 91%; /* warm oat */
 --muted-foreground: 22 15% 50%;
 --border: 35 20% 82%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap`
- Titulares: Playfair Display 600–700 — cursiva ámbar acentos
- Cuerpo: DM Sans 300–400
- Etiquetas: DM Sans 500 mayúsculas 10px espacio entre letras 0.12em

## Secciones

### 1. Navbar
- Crema tibia y pegajosa fondo, `backdrop-filter: blur(10px)`
- Izquierda: marca denominativa Playfair en cursiva "Groundwork" en espresso + pequeño ícono de café lucide en ámbar
- Derecha: Menú · Nuestro café · Acerca de · Encuéntrenos + botón de espresso "Pedir con anticipación →"

### 2. Hero
- Altura de la ventana de visualización completa, crema cálida fondo
- Imagen de café con sangrado completo, 68% de altura de la ventana gráfica, sin radio de borde
- Desvanecimiento inferior degradado: `linear-gradient(to top, rgba(250,246,239,1) 0%, transparent 45%)`
- Contenido z-10 debajo de la imagen en el flujo de página, centrado:
 - DM Sans 500 etiqueta silenciada en mayúsculas de 10 píxeles: "Café de especialidad · Dalston, Londres"
 - Playfair Display 700 `clamp(52px, 7vw, 110px)`: "Buen café.\nBuena gente.\nDías geniales".
: Acento ámbar en cursiva en "Días geniales".
 - DM Sans 300: "Expreso de origen único, filtro de temporada y todo lo horneado scratch"
 - CTA: "Ver nuestro menú →" (relleno de espresso) + "Encuéntranos" (fantasma)
 - Fichas de confianza: "Tostador de especialidad · Leche orgánica · Se admiten perros"

{/* Resumen de imagen: interior cálido de una cafetería independiente, mesas de madera, bombillas Edison, ladrillo visto, luz de la mañana, atmósfera acogedora y acogedora */}

### 3. Destacados del menú
- "What's On" — Playfair 700 con regla de subrayado ámbar (escalaX 0→1)
- 4 tarjetas en cuadrícula de 2×2, fondo de superficie cálida:
 - Bebidas espresso (blanco plano, cortado, café con leche de avena, desde £3,20)
 - Café filtrado (V60, Chemex, cerveza fría, desde £3,50)
 - Brunch durante todo el día (tostadas de aguacate, huevos, granola, desde £8)
 - Productos horneados (croissants, pan de plátano, pasteles de temporada, desde £3,50)£2,80)
- Cada tarjeta: imagen grande (aspecto 4/3), nombre de Playfair 600, descripción de DM Sans 300, etiqueta de precio en ámbar
- Desplazamiento: borde espresso + escala de imagen 1,02

{/* Resumen de imagen: primer plano de un blanco mate con arte latte sobre una cálida mesa de madera, luz natural de la mañana */}
{/* Resumen de imagen: V60 vertido sobre café que se está preparando, gotero de cerámica, vapor, primer plano editorial */}
{/* Resumen de imagen: plato de brunch con tostadas de aguacate, pan artesanal, huevos, mesa de café */}
{/* Resumen de imagen: croissants y pasteles recién hechos sobre una encimera de mármol, luz cálida, sensación de panadería artesanal */}

### 4. Tira de métodos de preparación
- Tira de color ámbar cálido de ancho completo con fondo de opacidad del 15%
- 4 íconos de métodos de preparación con nombres DM Sans 500: Espresso · V60 · Chemex · Cold Brew
- Playfair en cursiva debajo de cada uno: breve descripción (1 línea)
- Deslizamiento desde la izquierda en el desplazamiento, escalonamiento 0.1s

### 5. Nuestro café
- "De la granja a la taza" — Playfair 700
- Dividido: texto a la izquierda, par de imágenes apiladas a la derecha
- Cita en cursiva Playfair 300: "Cada bolsa cuenta la historia del agricultor que la cultivó". 
- DM Sans 300: 2 párrafos: abastecimiento comercial directo, enfoque en un solo origen, 3 orígenes estacionales rotativos. Tostado en el este de Londres.
- Chips de espresso: "Comercio directo · Origen único · Rotación estacional"
- "Compre nuestros granos →" botón con contorno de espresso

{/* Resumen de imagen: granos de café vertidos desde un saco de arpillera, iluminación cálida del estudio, ambiente artesanal rústico */}

### 6. Acerca de
- División: imagen derecha de café/fundador, texto izquierdo
- Playfair 700: "Inaugurado con una máquina y una gran idea"
- Biografía de DM Sans 300: 2 párrafos, fundada en 2019 por Jamie Walsh, ex contador que renunció para abrir el café que siempre quiso.
- Ámbar chips: "Est. 2019 · Specialty SCA · Community Hub"

{/* Resumen de imagen: propietario de una cafetería detrás de la barra, sonriente, delantal informal, fondo cálido de café, luz natural */}

### 7. Gallery Strip
- 5 imágenes, 280 px de altura, franja horizontal, escala al pasar el mouse, sin borde radio

{/* Resumen de imagen: arte latte vertido en una taza de cerámica,Manos expertas de barista, primer plano */}
{/* Imagen breve: rincón acogedor de una cafetería, dos amigos charlando mientras toman un café, luz cálida de la tarde */}
{/* Imagen breve: exterior de una cafetería, escaparate independiente, plantas, letrero de pizarra */}
{/* Imagen breve: barista moliendo granos de café, rutina matutina, equipamiento de cafetería */}
{/* Resumen de imagen: café filtrado de temporada servido en vaso, hielo, editorial de menú de verano */}

### 8. Eventos y espacio
- "Hire the Space" — Playfair 700
- Sección de superficie cálida centrada
- DM Sans 300: "Disponible para alquiler privado por las noches y fines de semana: catas de café, desayunos de equipo y eventos emergentes"
- Dos opciones de chips: Alquiler privado · Catas de café
- "Consulte sobre eventos →" botón de espresso

### 9. Testimonios
- Superficie cálida sección
- 3 tarjetas: cita en cursiva de Playfair, nombre del cliente + tipo de visita en DM Sans 10px silenciado, fila de 5 estrellas en ámbar
- Desvanecimiento escalonado en el desplazamiento

### 10. Encuéntrenos CTA
- Espresso de ancho completo fondo
- Playfair 700 cursiva crema: "Ven y saluda"
- DM Sans 300 crema: "Lunes–viernes 7 am–5 pm · Sábado–domingo 8 am–5 pm"
- Botón crema "Obtener direcciones →"

### 11. Pie de página
- Fondo espresso, marca denominativa Playfair en cursiva en ámbar
- "© 2026 Groundwork Coffee · 14 Kingsland Road, Dalston, Londres E8"

## Animaciones
- Héroe: desvanecimiento escalonado en la montura (y: 30→0, 0,7 s)
- Tarjetas de menú: desvanecimiento escalonado en el desplazamiento
- Reglas ámbar: escalaX 0→1, 0,5 s
- Desplazamiento total: 0,2 s de facilidad

## Responsive
- Móvil: cuadrícula de menú de una sola columna, apilada héroe, hamburguesa nav

## Copia completa
- Marca denominativa: "Groundwork Coffee"
- Héroe: "Buen café. Buena gente. Grandes días". / "Expreso de origen único, filtro de temporada y todo horneado desde cero"
- Menú: Espresso desde £3,20 · Filtro desde £3,50 · Brunch desde £8 · Horneado desde £2,80
- Horario: lunes a viernes de 7 a 17 horas · sábados y domingos de 8 a 17 horas
- Testimonio: "El mejor flat white En Dalston, no hay competencia. El pan de plátano es peligroso".— @coffeelover, revisión de Google
