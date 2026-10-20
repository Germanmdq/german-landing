# Prompt del sitio web de la agencia de viajes
# websiteprompts.ai

Cree un sitio web de agencia de viajes de lujo, cinematográfico y atrevido llamado "Meridian Travel" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 218 22% 10%;          /* deep slate #151c2c */
  --foreground: 42 18% 90%;           /* warm pearl */
  --primary: 218 22% 10%;
  --primary-foreground: 42 18% 90%;
  --accent: 185 52% 40%;              /* deep teal #1fa8b4 */
  --accent-warm: 42 48% 60%;          /* warm sand #c9b47a */
  --surface: 218 18% 14%;
  --surface-raised: 218 16% 18%;
  --muted-foreground: 42 8% 56%;
  --border: 218 14% 22%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500&display=swap`
- Titulares: Bebas Neue — editorial máxima condensada
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas 10px espaciado entre letras 0.14em

## Secciones

### 1. Navbar
- Pizarra profunda y pegajosa, `backdrop-filter: blur(12px)`
- Izquierda: Inter 600 espaciado entre letras mayúsculas 0.2em "MERIDIAN" en arena cálida
- Derecha: Destinos · Experiencias · Acerca de · Contacto + "Planifica tu viaje →" botón con contorno verde azulado

### 2. Hero
- Vista completa altura
- Fotografía de paisaje con sangrado completo `posición: inserción absoluta-0 w-completo h-objeto completo-cubierta objeto-centro`
- Degradado independiente de la composición: `linear-gradient(to right, rgba(21,28,44,0.96) 0%, rgba(21,28,44,0.65) 55%, rgba(21,28,44,0.2) 100%)`
- Texto de fondo grande: "MUNDO" en Bebas Neue `font-size: clamp(280px, 40vw, 560px)` en `opacidad: 0.04`, `position: absolute; right: -2%; bottom: -5%; z-index: 1`
- Contenido `índice z: 10`, alineado a la izquierda `padding-left: 7vw; padding-top: 0`, centrado verticalmente:
 - Inter 500 mayúscula 10px etiqueta verde azulado: "Viajes de lujo · Desde 2008"
 - Bebas Neue `clamp(70px, 10vw, 145px)` perla, altura de línea 0,88: "DESCUBRE EL\nMUNDO EN TUS\nTÉRMINOS".
 - Acento verde azulado en "TUS\nTÉRMINOS".
 - Subtítulo perla silenciado de Inter 300: "Itinerarios personalizados, guías privados y estadías cuidadosamente seleccionadas para viajeros que rechazan el ordinario"
 - CTA: "Empezar a planificar →" (texto oscuro, verde azulado) + "Ver destinos" (perla fantasma)
 - Fichas de destino flotantes debajo de los CTA, fila horizontal: "Marruecos · Japón · Patagonia · Maldivas · Islandia" — cada Inter 500 10px en mayúsculas, verde azulado, separados por finos divisores de arena, desvanecimiento escalonado 0,6 s delay

{/* Resumen de imagen: espectacular paisaje montañoso en la hora dorada: gran escala, silueta de viajero solitario contra el cielo, gran angular cinematográfico, fotografía de aventuras */}

: desvanecimiento escalonado en la montura: etiqueta (0 s), título (0,12 s), sub (0,26 s), CTA (0,4 s), chips(0.6s)

### 3. Destinos
- "Adónde te llevaremos" — Bebas Neue `clamp(52px, 7vw, 90px)` perla
- Cuadrícula de 3×2 de 6 destinos, tarjetas de imágenes con sangrado completo (sin radio de borde), escala flotante 1.03:
 - Marruecos · Japón · Patagonia · Maldivas · Islandia · Tanzania
- Cada tarjeta: `altura: 320px`, Bebas Neue 28px nombre de destino blanco en la parte inferior izquierda sobre degradado oscuro, Inter 300 10px sub silenciado (mejor temporada), verde azulado "Explorar →"
- Desvanecimiento escalonado en el desplazamiento

{/* Imagen breve: medina marroquí al anochecer, cálida luz ámbar, faroles, callejones estrechos */}
{/* Imagen breve: templo japonés de montaña en otoño, arces rojos, niebla, sereno */}
{/* Imagen breve: glaciar patagónico, picos espectaculares, agua turquesa */}
{/* Imagen breve: Villa sobre el agua en las Maldivas al amanecer, agua cristalina, lujo */}
{/* Imagen breve: aurora boreal de Islandia sobre un paisaje de arena negra */}
{/* Imagen breve: sabana de Tanzania en la hora dorada, siluetas de vida salvaje */}

### 4. Qué ofrecemos
- "La diferencia de los meridianos" — Bebas Neue grande
- 3 filas de elevación flotante:
 - Itinerarios personalizados (cada viaje hecho a medida, cero paquetes disponibles)
 - Privado y para grupos pequeños (no más de 8 personas, siempre su propio guía)
 - Estancias cuidadosamente seleccionadas (cada propiedad examinada personalmente por nuestro equipo)
- Cada una: Bebas Neue nombre grande izquierda + Inter 300 silenciado descripción derecha + verde azulado "→"
- `border-bottom: 1px solid hsl(var(--border))`
- Desplazamiento: superficie elevada, el texto se vuelve verde azulado

### 5. Stats Strip
- Verde azulado de ancho completo Fondo `#1fa8b4`, 72px
- 4 estadísticas oscuras de Inter 700: "18 años" · "60+ destinos" · "4.9★ Trustpilot" · "100% a medida"
- Conteo de movimiento del framer en desplazamiento, divisores oscuros

### 6. Acerca de
- Dividido: texto a la izquierda, imagen a la derecha
- Bebas Neue perla grande: "HEMOS ESTADO DONDE QUIERES IR"
- Inter 300 silenciado: 2 párrafos — Meridian Travel, fundada en 2008. Cada destino fue investigado de primera mano. Nuestra red de guías locales va mucho más allá de las recomendaciones de las guías.
- Chips verde azulado: "Est. 2008 · Miembro de ABTA · Más de 60 destinos"

{/*Resumen de imágenes: especialista en viajes en el trabajo, mapas y fotografías de destinos en el escritorio, ambiente cálido y profesional */}

### 7. Testimonios
- 3 tarjetas: etiqueta de destino Bebas Neue 18px perla, cita perlada en cursiva Inter 300, nombre del cliente + viaje en Inter 10px silenciado, fila verde azulado de 5 estrellas
- Stagger desvanecimiento en desplazamiento

### 8. Planifique su viaje CTA
- Fondo de arena cálida de ancho completo `#c9b47a`
- Bebas Neue `clamp(52px, 7vw, 90px)` pizarra oscura: "¿A DÓNDE QUIERES IR?"
- Inter 300 dark: "Cuéntanos el viaje de tus sueños en 60 segundos; volveremos con un itinerario personalizado, sin compromiso"
- "Comenzar a planificar →" botón de pizarra oscura
- "Sin cargos de reserva · Protegido por ABTA · Disponible 7 días" Inter 10px dark 70%

### 9. Pie de página
- Pizarra profunda, Inter 600 "MERIDIAN" mayúscula en arena
- Instagram · Pinterest · LinkedIn
- "© 2026 Meridian Travel · Luxury Bespoke Travel · Londres · Miembro de ABTA"

## Animaciones
- Héroe: tambaleo agresivo desvanecimiento en el montaje
- Texto "MUNDO" de fondo: desvanecimiento en retardo de 1.2s
- Cuadrícula de destino: desvanecimiento escalonado + escala 0.95→1 en el desplazamiento
- Tira de estadísticas: cuenta atrás en el desplazamiento
- Desplazamiento total: 0.18s facilidad

## Responsive
- Móvil: héroe apilado, destinos de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "MERIDIAN"
- Héroe: "DESCUBRE EL MUNDO EN TUS TÉRMINOS". / "Itinerarios a medida, guías privados y estancias cuidadosamente seleccionadas para viajeros que rechazan lo común"
- Destinos: Marruecos · Japón · Patagonia · Maldivas · Islandia · Tanzania
- Estadísticas: 18 años · 60+ destinos · 4.9★ Trustpilot · 100% Bespoke
- Testimonio: "Meridian nos creó un itinerario de tres semanas por Japón que cubría cosas que nunca hubiéramos encontrado nosotros mismos. Ningún momento se sintió como turismo". — David & Clare H., Londres
- CTA: "¿A DÓNDE QUIERES IR?" / "Itinerario a medida, sin compromiso"