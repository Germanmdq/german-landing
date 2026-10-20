# Aviso del sitio web de peluquería canina
# sitio webprompts.ai

Cree un sitio web de peluquería canina cálido y amigable llamado "Pawfect Groom" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 40 30% 97%; /* warm white #faf8f3 */
  --foreground: 190 20% 15%; /* near-black */
  --primary: 185 45% 40%; /* warm teal #38929a */
  --primary-foreground: 40 30% 97%;
  --accent: 38 65% 55%; /* warm amber #c9833a */
  --surface: 40 25% 92%; /* warm oat surface */
  --muted-foreground: 190 10% 50%;
  --border: 40 20% 82%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap`
- Todo el texto: Plus Jakarta Sans 700–800 (pantalla) / 400–500 (cuerpo)

## Secciones

### 1. Barra de navegación
: blanco cálido pegajoso, `backdrop-filter: blur(8px)`, línea inferior verde azulado en el desplazamiento
- Izquierda: además de la marca denominativa Jakarta 800 "Pawfect" verde azulado + "Groom" casi negro + icono de tijeras pequeñas Lucide en verde azulado
- Derecha: Servicios · Acerca de · Galería · Preguntas frecuentes + botón verde azulado "Reservar ahora →"

### 2. Hero
- Dividido: contenido izquierdo 52%, imagen vertical derecha 48%
- Imagen vertical flotante: `border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%`, sin radio de borde en los bordes
- El retrato flota suavemente en un bucle de 7 segundos: `translateY(0→-12px→0)`, entrada y salida fácil
- Contenido izquierdo:
 - Además, Jakarta 800 en mayúsculas silenciadas: "El perro sin jaula de Richmond Groomer"
 - Plus Jakarta 800 `clamp(40px, 6vw, 88px)`: "Tu perro merece\nEl mejor novio".
 - Acento en ámbar verde azulado en "Best Groom".
 - Plus Jakarta 400: "Aseo profesional sin estrés y sin tiempo en jaula. Todas las razas. bienvenido".
 - CTA: "Reservar un novio →" (verde azulado) + "Ver precios" (fantasma)
 - Fichas de confianza: "Sin secado en jaula · Todas las razas · Se admiten perros"

{/* Imagen breve: golden retriever feliz mirando a la cámara, fondo cálido y suave, pelaje limpio y esponjoso, retrato amigable */}

### 3. Servicios
- "Lo que ofrecemos" — Además de Jakarta 800 con regla subrayada en ámbar
- 6 tarjetas en cuadrícula de 3×2, fondo de superficie cálida, barra decorativa superior verde azulado:
 1. The Bath & Dry — desde £35 · champú, acondicionador, secado con secador
 2. Cuidado completo: desde £ 55 · baño, secado, corte estilo raza
 3. Primer cuidado del cachorro: desde £ 30 · experiencia de introducción suave
 4. Tratamiento anticaída: desde £ 45 · cepillado intensivo
 5. Corte de uñas: desde £ 12 · recorte ypresentación
 6. Cepillado de dientes: desde £ 10 · pasta de dientes apta para mascotas
- Tarjeta flotante: borde verde azulado + elevadores de chips de precio ámbar

### 4. Por qué Pawfect
- "Por qué elegir Pawfect" — Además de Yakarta 800
- División 50/50: fondo verde azulado izquierdo con 4 puntos de control, imagen editorial derecha
- 4 puntos de control con íconos de verificación ámbar:
 1. Sin secado en jaula: secado al aire con espacio para moverse
 2. Un perro a la vez: su perro tiene toda nuestra atención
 3. Totalmente asegurado: ciudad y Guilds calificados
 4. Todas las razas son bienvenidas: especialista en perros ansiosos y de pelaje largo

{/* Resumen de imagen: peluquero canino profesional recortando cuidadosamente a un perro, ambiente profesional tranquilo, iluminación cálida */}

### 5. Gallery Strip
- 5 imágenes, 280 px de altura, franja horizontal, escala 1.03 en vuelo estacionario
: variedad de razas en las imágenes

{/* Resumen de imagen: perro blanco esponjoso recién arreglado en la mesa de aseo, resultado profesional, pelaje limpio */}
{/* Resumen de imagen: garabato dorado antes y después del cepillado, editorial lado a lado */}
{/* Resumen de imagen: primer plano de un perro siendo cuidadoso corte de tijera alrededor de la cara, manos expertas de peluquero */}
{/* Imagen breve: spaniel feliz con moño, recién arreglado, ambiente de salón */}
{/* Imagen breve: peluquero lavando a un perro en una estación de lavado para perros, agua tibia, cuidado suave */}

### 6. Guía de raza
- "Nosotros Work With All Breeds" — Además de Jakarta 800
- Fichas de 3 categorías con ejemplos de razas:
 - De pelo corto: Labs, Beagles, Boxers
 - De pelo largo: Cockers, Spaniels, Setters
 - Doodles: Goldendoodles, Labradoodles, Cockapoos

### 7. Conozca a los Groomers
- "El equipo" — Plus Jakarta 800
- 3 tarjetas: retrato circular, más nombre de Jakarta 700, Inter 400 años + chip especial + biografía de 1 línea
 - Sarah — 8 años · Especialista: ansiosa dogs
 - Jake — 5 años · Especialista: razas de pelaje largo
 - Priya — 3 años · Especialista: doodles

{/* Imagen breve: amigable peluquera canina sonriendo, delantal profesional, fondo de salón */}
{/* Imagen breve: perro machopeluquero trabajando con un perro, ambiente profesional tranquilo */}
{/* Imagen breve: joven peluquera canina con un cachorro, sonrisa cálida y amigable */}

### 8. Testimonios
- Sección blanca cálida, 3 tarjetas
- Plus cotización Jakarta 700, nombre + nombre del perro + raza en silencio 10px, fila de 5 estrellas ámbar
- desvanecimiento escalonado en el desplazamiento

### 9. Preguntas frecuentes Accordion
- "Preguntas" - Además de Yakarta 800
- 4 artículos de acordeón, el ícono verde azulado gira al abrir:
 1. Cómo ¿Cuánto tarda un novio? — 2 a 3 horas dependiendo de la raza y el estado del pelaje. 
 2. ¿Utiliza jaulas para secarse? - Nunca. Nos secamos al aire con toallas y secadora a baja temperatura, siempre con espacio para moverse.
 3. Mi perro está ansioso, ¿aún puedes ayudarme? - Sí. Sarah se especializa en perros nerviosos. Vamos al ritmo de tu perro.
 4. ¿Con qué frecuencia debo reservar? — Cada 6 a 8 semanas para la mayoría de las capas. Garabatos cada 6 semanas para evitar que se enreden.

### 10. Reserva CTA
- Fondo verde azulado de ancho completo (#38929a)
- Plus Jakarta 800 blanco cálido: "¿Listo para reservar?"
- Plus Jakarta 400: "Lunes a sábado de 8 a. m. a 6 p. m. · 020 8123 4567 · hello@pawfectgroom.co.uk"
- Botón "Reservar en línea →" con relleno blanco cálido + fantasma "Llámanos"

### 11. Pie de página
- Fondo verde azulado, además de Yakarta 800 wordmark
- "© 2026 Pawfect Groom · 14 Hill Rise, Richmond, TW10 · Totalmente asegurado · Ciudad y gremios calificados"

## Animaciones
- Héroe: aparición gradual dividida en la montura (izquierda y: 30→0, escala derecha 0,95→1), 0,7s stagger
- Flotante vertical: bucle de fotograma clave 7 s fácil de entrar y salir
- Tarjetas de servicio: whileInView stagger 0.08s
- Acordeón de preguntas frecuentes: AnimatePresence altura expandir/contraer

## Responsive
- Móvil: servicios de una sola columna cuadrícula, héroe apilado, imagen vertical de ancho completo

## Copia completa
- Marca denominativa: "Pawfect Groom"
- Héroe: "Tu perro merece el mejor novio". / "Aseo profesional y sin estrés sin tiempo en jaula. Todas las razas son bienvenidas". 
- Ubicación: 14 Hill Rise, Richmond, TW10
- Horario: lunes a sábado de 8 a.m. a 6 p.m.
- Testimonio: "Sarah es absolutamente increíble con nuestro ansioso rescate.¡En realidad mueve la cola cuando llegamos ahora!" — @goldenrescuemum, Google Review
