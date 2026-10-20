# Restaurante/sitio web de alta cocina Prompt
# websiteprompts.ai

Cree un sitio web oscuro y elegante para un restaurante de alta cocina llamado "Maison Noir" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 30 8% 6%;          /* near-black warm #0c0b0a */
  --foreground: 40 20% 92%;        /* warm off-white */
  --primary: 42 65% 58%;           /* warm gold #d4a853 */
  --primary-foreground: 30 8% 6%;
  --surface: 30 8% 10%;
  --muted-foreground: 30 8% 55%;
  --border: 30 8% 18%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500&display=swap`
- Titulares: Cormorant Garamond 600–700 — cursiva dorada acentos
- Cuerpo: Inter 300–400
- Precios/datos: Inter 500

## Secciones

### 1. Barra de navegación
- Microbarra encima de la barra de navegación: "Abierto de martes a sábado · 18:00–23:00 · +44 20 7123 4567" en Inter 10px silenciado centrado
- Fondo oscuro pegajoso con fondo borroso
- Izquierda: marca denominativa en cursiva Cormorant "Maison Noir" en dorado
- Derecha: Menú · Acerca de · Reservas · Eventos + "Reservar un table →" botón dorado

### 2. Hero
- Pantalla completa, fondo oscuro
- Imagen a sangrado completo con superposición de degradado independiente de la composición: `linear-gradient(to top, rgba(12,11,10,0.98) 0%, rgba(12,11,10,0.55) 45%, rgba(12,11,10,0.25) 100%)`
- Contenido z-10 en la parte inferior del héroe, alineado a la izquierda en un contenedor acolchado
- Dorado Píldora de insignia en cursiva de Cormorant: "Est. 2018 · Mayfair, Londres"
- Cormorant 700 `clamp(56px, 8vw, 120px)`: "Una experiencia gastronómica\nmás allá de lo ordinario"
- Inter 300 sub: "Cocina francesa contemporánea en el corazón de Mayfair"
- Dos CTA: "Reservar una mesa" (fondo dorado, texto oscuro) + "Ver menú →" (contorno dorado fantasma) 

{/* Resumen de imagen: mesa de comedor elegante, plato elegantemente servido, luz cálida de velas, interior oscuro y cambiante del restaurante, poca profundidad de campo */}

### 3. Philosophy Strip
: franja de superficie oscura de ancho completo, `border-top: 1px solid hsl(var(--border))`
- Cormorán centrado en cursiva 28px: "Cada plato es una conversación entre las estaciones y el chef". 
- Dos reglas horizontales doradas de 48px a cada lado, escala X 0→1 desde el centro en el desplazamiento

### 4. Avance del menú
- "El menú" en Cormorant 700 con regla subrayada dorada
- Dos columnas: Entrantes (3 platos) / Platos principales (3 platos)
- Cada fila de plato: Nombre de Cormorant 600 a la izquierda + Precio de oro de Inter 500 a la derecha + Descripción de Inter 300 a continuación
- Separador de borde inferiorentre filas al pasar el cursor: el fondo se eleva a la superficie
- "Descargar menú completo →" botón con contorno dorado centrado debajo
- Entrada gradual escalonada en el desplazamiento

### 5. Sección de chef
- División: retrato a la izquierda, texto a la derecha
- Insignia con chip dorado: "Ejecutivo Chef"
- Cormorant 700: "Chef Laurent Moreau"
- Biografía de Inter 300: 2 párrafos: filosofía de temporada, proveedores locales, experiencia en Michelin
- Tres fichas de oro: "Formación Michelin · Menú de temporada · Proveedores locales"

{/* Imagen breve: retrato de chef ejecutivo masculino, cocina oscura, chef blanco chaqueta, pose segura, iluminación lateral espectacular */}

### 6. Experiencias
- 3 tarjetas de superficie oscura: cena privada · Menú de degustación · Maridaje de vinos
- Cada una: icono de Lucide dorado, título de Cormorant 600, descripción de Inter 300, enlace dorado "Consultar →"
- Colocar el cursor sobre: borde dorado + `box-shadow: 0 0 24px hsl(42 65% 58% / 0.12)`

### 7. Tira de prensa
- "Como aparece en" Etiqueta silenciada en mayúsculas de Inter 500
- Marquesina continua: "The Guardian · Evening Standard · Guía Michelin · Condé Nast Traveler · Time Out" en cursiva Cormorant, 5 opacidad
- Desplazamiento CSS de 20 segundos, bucle continuo

### 8. Testimonios
- 3 tarjetas de superficie oscura: fila dorada de 5 estrellas, cita en cursiva Cormorant 400, nombre del comensal + fecha de visita en Inter 10px silenciado
- Desvanecimiento escalonado encendido scroll

### 9. Reserva CTA
- Oscuro de ancho completo con superposición de textura de ruido sutil (opacidad 0.03)
- Cormorant 700 cursiva centrada: "Reserve su mesa"
- Inter 300 sub: "Recomendamos reservar con 2 a 4 semanas de anticipación para fines de semana"
- Botón dorado grande "Hacer una reserva →"
- "O llame al: +44 20 7123 4567" Inter 300 silenciado a continuación

### 10. Pie de página
- Superficie oscura, 3 columnas: Marca (marca denominativa + eslogan) · Horas (Martes a sábados de 18:00 a 23:00) · Contacto (dirección, teléfono, correo electrónico)
- Abajo: "© 2026 Maison Noir · 14 Curzon Street, Mayfair, Londres W1J 5HP"

## Animaciones
- Texto de héroe: desvanecimiento escalonado en la montura (y: 30→0, 0,7 s), insignia primero 
- Filas del menú: desvanecimiento escalonado al desplazarse, retraso de 0,06 s por fila
- Reglas doradas: escalaX0→1 desde el centro, 0.5s
- Marque de prensa: desplazamiento CSS continuo

## Responsive
- Móvil: menú de una sola columna, héroe apilado, tipo de héroe clamp(44px, 10vw, 80px), navegación de hamburguesa

## Copia completa
- Marca denominativa: "Maison Noir"
- Lema: "Cocina francesa contemporánea · Mayfair, Londres"
- Héroe: "Una experiencia gastronómica más allá de lo ordinario" / "Cocina francesa contemporánea en el corazón de Mayfair"
- Muestra de menú: Foie Gras Torchon £18 · Tartar de ternera £16 · Pechuga de pato añeja £34 · Mar Bajo £ 32 · Fondant de chocolate £ 12
- Biografía del chef: "Laurent se formó con tres chefs con estrellas Michelin antes de abrir Maison Noir en 2018. Su menú cambia según las estaciones, construido en torno a relaciones con agricultores locales y proveedores costeros". 
- Testimonio: "El menú de degustación fue simplemente extraordinario. Cada plato contaba una historia". — Marcus T., abril de 2026
- Reserva: "Reserve su mesa" / "Recomendamos reservar con 2 a 4 semanas de anticipación"
- Horario: martes a sábado · 18:00 a 23:00