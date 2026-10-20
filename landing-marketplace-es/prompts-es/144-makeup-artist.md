# Sitio web de maquillador Prompt
# websiteprompts.ai

Cree un sitio web de portafolio de belleza y maquillador editorial oscuro llamado "Ariel Beaumont" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 0 0% 4%;              /* near-black #0a0a0a */
  --foreground: 38 14% 90%;           /* warm pearl */
  --primary: 38 14% 90%;
  --primary-foreground: 0 0% 4%;
  --accent: 38 42% 58%;               /* warm gold #c9a55a */
  --surface: 0 0% 8%;
  --surface-raised: 0 0% 12%;
  --muted-foreground: 38 8% 52%;
  --border: 0 0% 16%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500&display=swap`
- Titulares: Bodoni Moda 700 cursiva — editorial, fashion-forward
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas 10px espaciado entre letras 0.16em

## Secciones

### 1. Navbar
- Fondo pegajoso casi negro, `backdrop-filter: blur(12px)`
- Izquierda: marca denominativa en cursiva de Bodoni Moda "Ariel Beaumont" en dorado cálido
- Derecha: Trabajo · Servicios · Acerca de · Contacto + botón con contorno dorado "Consultar →"

### 2. Hero
- Altura de la ventana de visualización completa, casi negro fondo
- Lado derecho: retrato de belleza editorial a sangrado completo, ocupa el 55% del ancho de la ventana gráfica, `position: absolute; right: 0; top: 0; height: 100%; width: 55%; object-fit: cover; object-position: center top`
- Superposición del lado izquierdo para texto: `position: absolute; left: 0; top: 0; height: 100%; width: 52%`
 `background: linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.9) 70%, transparent 100%)`
- Contenido `índice z: 10`, izquierda `padding: 0 5vw`, centrado verticalmente:
 - Inter 500 mayúscula etiqueta dorada de 10px: "Makeup Artist · London & International"
 - Bodoni Moda 700 cursiva `clamp(58px, 8vw, 115px)` perla, altura de línea 0,88: "Art\non Skin."
 - Inter 300 silenciado: "Editorial, nupcial, comercial y cinematográfico: maquillaje diseñado para ser visto, fotografiado y recordado"
 - CTA: "Ver mi trabajo →" (texto oscuro y relleno de oro) + "Reservar una sesión" (fantasma)
 - Pequeño chip de portafolio flotante: un recorte de 120×160px, `position: absolute; bottom: 10%; right: 5%; z-index: 20`, sin radio de borde, escala Framer Motion desde 0,8 en la montura

{/* Resumen de imagen: retrato de belleza editorial en primer plano, mujer con maquillaje dramático de vanguardia: labios color burdeos intenso, ojo arquitectónico, piel impecable, fondo oscuro de estudio, fotografía de moda de alto contraste */}

: desvanecimiento escalonado en la montura: etiqueta, titular, sub, CTA (0,12 s de retraso por)

### 3. Trabajo seleccionado
- "Trabajo seleccionado" — Bodoni Moda 700 cursiva perla, centrado
- Rejilla de mampostería, 6 imágenes: 3 altas (3/4) + 3 anchas (4/3), sin radio de borde, 3pxgap
- Colocar el cursor sobre: superposición oscura `0→0.6` + etiqueta blanca en mayúsculas Inter 500 (Editorial / Nupcial / Comercial / Película)
- Desvanecimiento escalonado en el desplazamiento

{/* Resumen de imagen: primer plano de maquillaje de novia, piel suave y romántica, luz natural brillante, tonos cálidos */}
{/* Resumen de imagen: maquillaje editorial de vanguardia, modelo de perfil, estudio dramático oscuro */}
{/* Resumen de imagen: belleza comercial: primer plano de lápiz labial, rojo vibrante, estilo de revista de moda */}
{/* Resumen de imagen: maquillaje de set de filmación: retoque a la actriz entre tomas, BTS sincero */}
{/* Resumen de imagen: mirada editorial audaz, primer plano, fondo oscuro, alto contraste */}
{/* Resumen de imagen: grupo de fiesta nupcial natural, hora dorada al aire libre, looks suaves y elegantes */}

### 4. Servicios
- "Lo que ofrezco" — Bodoni Moda 700 cursiva
- 4 filas de servicio, elevación flotante:
 - Editorial & Moda (sesiones fotográficas, campañas, lookbooks: desde £350/día)
 - Novias (prueba + día de la boda, fiesta nupcial disponible: desde £280)
 - Comercial y cine (TV, publicidad, productos: tarifa diaria disponible)
 - Ocasiones especiales (eventos, galas, noches de prensa: desde £150)
- Cada uno: Bodoni cursiva nombre grande izquierda + descripción Inter 300 derecha + oro "→" + precio
- `border-bottom: 1px solid hsl(var(--border))`
- Pasar el cursor: el fondo aumenta, el nombre se vuelve dorado

### 5. Acerca de
- "El Artista" — Bodoni 700 cursiva
- Dividido: texto a la izquierda, imagen vertical a la derecha
- Cita extraíble de Bodoni en cursiva: "El maquillaje es la única forma de arte que desaparece al final del día, lo que significa que cada aplicación es original". 
- Inter 300 muted bio: 2 párrafos - formado en el London College of Fashion. 12 años trabajando en editorial, cine y novias. Entre sus clientes se incluyen Vogue, BBC y novias independientes que quieren algo realmente considerado.
- Fichas de oro: "LCF Training · 12 Years · Film & Bridal Specialist"

{/* Resumen de imagen: maquillador en acción, rostro del artista enfocado, pinceles en mano, escenario de estudio editorial */}

### 6. Testimonios
- Sección de superficie
- 3 cartas: fila dorada de 5 estrellas, perla cursiva Bodonicotización, nombre del cliente + tipo de proyecto Inter 10px silenciado
- Desvanecimiento escalonado en el desplazamiento

### 7. Preguntas frecuentes
- 4 elementos a través de shadcn/ui:
 - "¿Viaja para hacer reservas?"
 - "¿Con cuánta anticipación debo reservar para mi boda?"
 - "¿Qué se incluye en una prueba nupcial?"
 - "¿Trabajas internacionalmente?"
- Borde izquierdo dorado en el artículo abierto

### 8. Consulta CTA
- Oro cálido de ancho completo `#c9a55a` fondo
- Bodoni 700 cursiva oscura: "Hagamos algo hermoso"
- Inter 300 oscuro: "Cada proyecto comienza con una conversación; dime qué estás creando y te diré cómo puedo ayudarte"
- "Enviar una consulta →" botón oscuro casi negro
- "Basado en Londres · Disponible a nivel nacional e internacional" Inter 10px dark 70%

### 9. Pie de página
- Casi negro, cursiva Bodoni "Ariel Beaumont" en dorado
- Instagram · Pinterest · LinkedIn
- "© 2026 Ariel Beaumont · Maquillador · Londres"

## Animaciones
- Héroe: desvanecimiento escalonado en la montura, escala de chip de cartera flotante 0.8→1
- Galería: desvanecimiento escalonado en el desplazamiento
- Filas de servicio: aumento de desplazamiento 0.2s
- Reglas de oro: escalaX 0→1, 0.5s

## Responsive
- Móvil: retrato del héroe en la parte superior de ancho completo, texto debajo con degradado, cuadrícula de una sola columna, navegación en forma de hamburguesa

## Copia completa
- Marca denominativa: "Ariel Beaumont"
- Héroe: "Art on Skin". / "Editorial, nupcial, comercial y cinematográfico: maquillaje diseñado para ser visto, fotografiado y recordado"
- Servicios: Editorial desde £350/día · Novia desde £280 · Tarifa comercial por día · Ocasiones desde £150
- Testimonio: "Ariel me maquilló para nuestra boda y luego para un editorial de Vogue el mes siguiente. El trabajo en ambos fue extraordinario". — Sophie M., Londres
- CTA: "Hagamos algo hermoso" / "Cada proyecto comienza con una conversación"