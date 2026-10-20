# Sitio web de peluquería Prompt
# websiteprompts.ai

Cree un sitio web editorial y oscuro de peluquería para mujeres llamado "Studio Nora" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 20 8% 7%;             /* near-black warm #130e0c */
  --foreground: 38 18% 90%;           /* warm pearl */
  --primary: 20 8% 7%;
  --primary-foreground: 38 18% 90%;
  --accent: 18 42% 55%;               /* terracotta #c17a54 */
  --surface: 20 6% 11%;
  --surface-raised: 20 5% 15%;
  --muted-foreground: 38 8% 55%;
  --border: 20 5% 18%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500&display=swap`
- Titulares: Bebas Neue — completo condensado, escala máxima
- Cuerpo: Inter 300–500
- Etiquetas: Inter 500 mayúsculas, 10 px, espacio entre letras 0,16 em

## Secciones

### 1. Navbar
- Fondo pegajoso casi negro, `backdrop-filter: blur(12px)`
- Izquierda: Inter 500 mayúsculas, espacio entre letras 0,2em, marca denominativa "STUDIO NORA" en terracota
- Derecha: Servicios · Portafolio · Acerca de · Reservar + botón "Reservar ahora →" terracota

### 2. Hero
- Altura de la vista completa, fondo casi negro
- Fotografía de retrato editorial con sangrado completo `posición: recuadro absoluto-0`, `object-fit: cover; object-position: center`
- Superposición independiente de la composición: `linear-gradient(to right, rgba(19,14,12,0.96) 0%, rgba(19,14,12,0.75) 48%, rgba(19,14,12,0.20) 100%)`
- Texto de fondo grande: "NORA" en Bebas Neue `font-size: clamp(240px, 35vw, 500px)` en `opacidad: 0.03`, `posición: absoluta`, centrado verticalmente, `índice z: 1`
- Contenido `índice z: 10` alineado a la izquierda `ancho máximo: 560px relleno-izquierda: 6vw`:
 - Etiqueta de terracota Inter 500 mayúsculas de 10px: "Hair Studio · Notting Hill, London"
 - Bebas Neue `clamp(72px, 10vw, 140px)` línea perla-altura 0,88: "TU PELO.\nTU HISTORIA.\nNUESTRA ARTESANÍA."
 - Acento de terracota en "NUESTRA ARTESANÍA".
 - Inter 300 sub perla apagada: "Cortes, color y estilo expertos para mujeres que saben exactamente lo que quieren y aquellos que aún lo están descubriendo"
 - CTA: "Reserve una cita →" (texto oscuro, relleno de terracota) + "Vea nuestro trabajo" (fantasma)
 - Fichas de confianza: "Más de 10 años · Notting Hill · Lunes de bienvenida sin cita previa"

{/* Resumen de imagen: retrato editorial de una mujer con un espectacular peinado, fondo de estudio oscuro y cambiante, moda estética de la fotografía, iluminación nítida, blanco y negro de alto contraste o tonos cálidos */}

- Hero: desvanecimiento escalonado agresivo (y: 40→0, 0.6s, 0.08s de retraso por elemento)

### 3. Servicios
- "Qué hacemos"— Bebas Neue `clamp(52px, 7vw, 90px)` perla
- Cuadrícula 3×2 de 6 servicios, tarjetas de superficie oscura:
 - Cut & Style (desde £65 — consulta incluida)
 - Color & Balayage (desde £95 — mezcla a medida)
 - Mechas (desde £85 — láminas y mano alzada)
 - Secado con secador (desde £40 - acabado en el salón)
 - Tratamiento de queratina (desde £150 - alisado de 12 semanas)
 - Extensiones (desde £200 - cinta, bonds o clip)
- Cada tarjeta: nombre del servicio Inter 500, Inter 300 descripción apagada, etiqueta de precio de terracota, icono de Lucide
- Colocar el cursor sobre: borde de terracota + `box-shadow: 0 0 18px hsl(18 42% 55% / 0.12)`

### 4. Portafolio
- "Nuestro trabajo" — Bebas Neue perla grande
- Franja horizontal de 5 imágenes, `altura: 340px`, `min-width: 260px` por imagen, `overflow-x: auto` en dispositivos móviles
- Escala al pasar el mouse 1.02, sin radio de borde, espacio de 2px
- Fundido escalonado al desplazarse

{/* Resumen de imagen: primer plano del color balayage perfecto, tonos rubios cálidos, fotografía editorial de belleza */}
{/* Resumen de imagen: acabado elegante con secador en cabello castaño, iluminación de estudio, calidad editorial de moda */}
{/* Resumen de imagen: transformación del cabello rizado, luz cálida y vibrante, natural */}
{/* Resumen de imagen: corte corto de precisión, editorial dramático, iluminación intensa */}
{/* Resumen de imagen: primer plano del color del cabello — tonos rojos intensos, acabado de alto brillo */}

### 5. Por qué Studio Nora
- Dividido: texto a la izquierda, imagen a la derecha
- Bebas Neue perla grande: "NO HACEMOS PELO CON CINTAS TRANSPORTADORAS"
- Inter 300 silenciado: 2 párrafos: cada cita comienza con una consulta, sin reservas apresuradas, sin clientes duplicados. Consultas de color siempre por el mismo estilista.
- 4 puntos de control de terracota (lucide Check): "Estilista dedicado en cada visita · Sin precios ocultos · Consultas de color siempre gratis · Cancelación hasta 24 horas"

{/* Resumen de imagen: estilista y cliente en consulta, ambiente de salón íntimo, luz cálida, conexión genuina */}

### 6. Team
- "Tus estilistas" — Bebas Neue perla grande
- 3 tarjetas de estilista: retrato (cuadrado, sin radio de borde), nombre de Bebas Neue, chip especial de terracota, Inter 300bio
: desplazamiento: borde de terracota + brillo

{/* Imagen breve: estilista, foto editorial, fondo de estudio oscuro, profesional y segura */}
{/* Imagen breve: estilista con tijeras, fondo de salón borroso, cálido y accesible */}
{/* Imagen breve: estilista en el trabajo, céntrese en manos y técnica, fotografía artística */}

### 7. Testimonios
- Sección en relieve
- 3 cartas: fila de 5 estrellas en terracota, cita perla cursiva Inter 300, nombre del cliente + servicio en Inter 10px silenciado
- Desvanecimiento escalonado encendido scroll

### 8. Reserva CTA
- Ancho completo, `background: hsl(18 42% 55%)` terracota
- Bebas Neue `clamp(52px, 7vw, 90px)` oscuro: "¿LISTO PARA TU MEJOR PELO?"
- Inter 300 oscuro: "Reserva online en 60 segundos — elija su servicio, estilista y horario"
- "Reserve ahora →" botón oscuro
- "Nuevos clientes bienvenidos · Consultas siempre gratuitas · Sin cita previa los lunes" Inter 10px oscuro 70%

### 9. Pie de página
- Fondo casi negro, Inter 500 mayúscula "ESTUDIO NORA" en terracota
- Instagram · TikTok · Google
- "© 2026 Studio Nora · 14 Pembridge Road, Notting Hill, Londres W11 · Lunes a sábado de 9 a.m. a 7 p.m."

## Animaciones
- Texto del héroe: desvanecimiento escalonado agresivo en la montura (y: 40→0)
- Texto "NORA" de fondo: aparece lentamente con un retraso de 1,5 s
- Cuadrícula de servicio: desvanecimiento escalonado en el desplazamiento
- Tira de galería: desvanecimiento escalonado

## Responsive
- Móvil: héroe apilado (foto visible detrás de la superposición, texto ancho completo), servicios de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "STUDIO NORA"
- Héroe: "TU PELO. TU HISTORIA. NUESTRA ARTESANÍA". / "Cortes, color y estilismo expertos para mujeres que saben exactamente lo que quieren"
- Servicios: Corte desde £65 · Color desde £95 · Mechas desde £85 · Secado con secador desde £40 · Queratina desde £150 · Extensiones desde £200
- Testimonio: "Llevo 3 años viniendo a Studio Nora. El trabajo de color es realmente excepcional — Recibo elogios cada vez que me voy." — Rachel S., Notting Hill
- CTA: "¿LISTO PARA TU MEJOR CABELLO?" / "Reserva online en 60artículos de segunda clase"