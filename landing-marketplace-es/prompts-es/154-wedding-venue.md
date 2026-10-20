# Sitio web del lugar de la boda Prompt
# websiteprompts.ai

Cree un sitio web de lujo para el lugar de la boda y eventos llamado "Ashford Manor" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 220 20% 10%; /* deep slate #161b26 */
  --foreground: 45 30% 92%; /* pearl off-white */
  --primary: 220 20% 10%;
  --primary-foreground: 45 30% 92%;
  --accent: 43 50% 65%; /* warm gold #d4b87a */
  --surface: 220 20% 14%;
  --muted-foreground: 220 10% 60%;
  --border: 220 15% 20%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500&display=swap`
- Titulares: Cormorant Garamond 600–700 — cursiva dorada acentos
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas 10px espaciado entre letras 0.15em

## Secciones

### 1. Navbar
- Pizarra profunda y pegajosa, `backdrop-filter: blur(12px)`, borde dorado fino activado por desplazamiento en la parte inferior
- Izquierda: marca denominativa en cursiva Cormorant Garamond "Ashford Manor" en color perla
- Derecha: La finca · Bodas · Paquetes · Galería + botón con contorno dorado "Consultar →"

### 2. Hero
: héroe cinematográfico con vista completa
: imagen exterior de la propiedad con sangrado completo detrás de una superposición de gradiente de doble capa:
 - Capa 1: `linear-gradient(to bottom, rgba(22,27,38,0.55) 0%, rgba(22,27,38,0.2) 50%, rgba(22,27,38,0.75) 100%)`
 - Capa 2: `linear-gradient(to right, rgba(22,27,38,0.4) 0%, transparent 60%)`
- Centro absoluto de contenido, z-10:
 - Inter 500 perla mayúscula silenciada 10px: "Wedding Venue & Events Estate · Wiltshire"
 - Cormorant Garamond 700 `clamp(52px, 7.5vw, 120px)`: "Donde los momentos se convierten en recuerdos"
 - Acento en cursiva dorada: "Recuerdos"
 - Inter 300 perla silenciada: "Una propiedad de alquiler exclusiva ubicada en 40 acres de campiña privada de Wiltshire"
 - CTA: "Pregunta sobre tu cita →" (relleno de oro) + "Haz el recorrido" (fantasma de perlas)

{/* Resumen de imagen: exterior de una casa señorial de lujo en la hora dorada, cálida fachada de piedra, bien cuidada jardines, luz romántica del atardecer */}

### 3. Detalles clave Franja
- Franja de 4 chips: icono dorado + etiqueta Inter 500 + valor Inter 300
 - Alquiler exclusivo · Capacidad 250 invitados
 - 40 acres · Finca privada
 - Pernoctaciones · 18 habitaciones
 - Con licencia · Ceremonias civiles

### 4. Los espacios
- "Nuestros espacios" — Cormorant Garamond 700 con subtítulo en cursiva dorada "Donde se desarrolla tu día"
- 3 filas de elevación flotante (traducirY -4px al pasar el mouse, 0.3s):

**El GrandeSalón**
- Dividido: imagen grande izquierda (60%), contenido derecho (40%)
- Cormorant 600: "El Gran Salón"
- Inter 300: "Grandes techos abovedados, chimenea de piedra original, lámparas de araña. Ceremonia y recepción para hasta 250 invitados."
- Fichas: Ceremonia · Recepción · 250 invitados

**The Walled Garden**
- División invertida: contenido a la izquierda (40%), imagen grande a la derecha (60%)
- Cormorant 600: "The Walled Garden"
- Inter 300: "Jardín amurallado victoriano restaurado con hayas de cobre Ceremonias al aire libre para hasta 150 invitados."
- Fichas: Ceremonia al aire libre · Verano · 150 invitados

**The Orangery**
- Dividido: imagen grande izquierda (60%), contenido derecha (40%)
- Cormorán 600: "El. Orangery"
- Inter 300: "Vidrio del suelo al techo, columnas de hierro, iluminación festiva. Cenas íntimas y almuerzos del día siguiente". 
- Chips: cena íntima · Mañana después · 80 invitados

{/* Resumen de imagen: gran salón interior con lámpara de araña, elegante mesa de boda, cálida luz del atardecer. */}
{/* Imagen breve: hermoso jardín amurallado, ceremonia de boda al aire libre, arco floral, sillas de madera */}
{/* Imagen breve: interior de invernadero de cristal, luces decorativas, cena íntima, noche */}

### 5. Galería
- "The Estate" — Cormorant Garamond 700
- Cuadrícula de mampostería de 2 columnas, 6 imágenes, espacio de 12 px
- Desplazamiento: superposición de oro al 20 % + escala 1,02

{/* Imagen breve: vista aérea de la casa solariega y sus cuidados jardines, campiña inglesa */}
{/* Imagen breve: novia y novio caminando por los terrenos de la finca, romántica hora dorada */}
{/* Imagen breve: centro de mesa de recepción nupcial, flores, velas, estilo elegante */}
{/* Imagen breve: escalera de piedra con arreglos florales, montaje de ceremonia nupcial */}
{/* Imagen breve: vista del atardecer desde la terraza de la propiedad, romántico cielo dorado */}
{/* Imagen breve: boda detalle de pastel, estilo lujoso, fondo elegante */}

### 6. Bodas
- "Para el día de tu boda" — Cormorant 700
- División 50/50: fotografía editorial izquierda, contenido derecho
-Cita de cormorán en cursiva dorada: "Solo organizamos una boda a la vez. Su día es el único día que importa". 
- Inter 300: 2 párrafos: uso exclusivo, equipo dedicado, no hay otros eventos en el sitio. 
- "Descargue nuestro folleto →" botón con contorno dorado

{/* Imagen breve: momento íntimo: pareja a primera vista, fondo de la mansión, Fotografía sincera y emocional */}

### 7. Testimonios
- 3 tarjetas, fondo de superficie, borde superior izquierdo dorado
- Cita Cormorant cursiva 600, nombre Inter 300 + fecha + tipo
- 5 estrellas doradas por card
- Desvanecimiento escalonado en el desplazamiento

### 8. Paquetes
- "Inversión" — Cormorant 700 + Inter 300 subtítulo
- 3 filas de precios limpias con divisores:
 - Alquiler de propiedades entre semana · Lunes a jueves · desde £ 4,500
 - Alquiler de propiedad de fin de semana · Viernes a domingo · desde £ 7,500
 - Fin de semana completo · Entrada el viernes → Salida el domingo · desde £ 14,000
- Lista de inclusiones de Inter 300 por fila (6 artículos)
- "Solicitar presupuesto personalizado →" perla botón

### 9. Alojamiento
- "Descanse" — Cormorant 700
- Sección centrada, imagen de la finca
- Inter 300: "Dieciocho habitaciones decoradas individualmente con capacidad para 38 huéspedes en la casa solariega y la cabaña Gate. Su grupo controla la finca desde el viernes por la noche hasta el domingo realizar el pago."
- Chips: 18 dormitorios · 38 huéspedes · Gate Cottage incluido

{/* Resumen de imagen: dormitorio de una casa de campo de lujo, elementos de época, cama con dosel, estilo cálido y elegante */}

### 10. Consulta CTA
- Oro de ancho completo (#d4b87a) fondo
- Pizarra en cursiva Cormorant 700: "Comience su historia en Ashford Manor"
- Pizarra Inter 300: "Celebramos un número limitado de bodas cada año para garantizar que cada pareja reciba nuestra atención completa"
- "Consulte sobre disponibilidad →" pizarra profunda llena botón

### 11. Pie de página
- Pizarra profunda, marca denominativa en cursiva Cormorant "Ashford Manor" en dorado
- "© 2026 Ashford Manor Estate · Great Wishford, Wiltshire SP2 · hello@ashfordmanor.co.uk"

## Animaciones
- Contenido del héroe: desvanecimiento escalonado en la montura (y: 40→0, 0,8 sfacilidad)
- Espacios en filas: whileInView desvanecimiento deslizante, 0.6s escalonado 0.15s
- Galería: whileInView escalonado desvanecimiento
- Desplazamiento: 0.25s facilidad en todo

## Responsive
- Móvil: espacios de una sola columna, galería de 1 columna, héroe apilado, navegador de hamburguesas

## Copia completa
- Propiedad: "Ashford Manor · Great Wishford, Wiltshire"
- Paquetes: Entre semana desde £4500 · Fin de semana desde £7500 · Fin de semana completo desde £14,000
- Alojamiento: 18 habitaciones, 38 huéspedes, Gate Cottage
- Testimonio: "Ashford Manor nos brindó el día más perfecto que podríamos haber imaginado. El equipo pensó en todo". — Emma y James, septiembre de 2025
