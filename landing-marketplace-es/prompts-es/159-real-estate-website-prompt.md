# Solicitud del sitio web del agente de bienes raíces
# websiteprompts.ai

Cree un sitio web personal de agente de bienes raíces premium llamado "James Harlow Properties" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 0 0% 100%;
  --foreground: 224 20% 12%;        /* deep charcoal #1a1c2e */
  --primary: 38 50% 56%;            /* warm gold #c9a060 */
  --primary-foreground: 0 0% 100%;
  --surface: 220 14% 96%;
  --surface-dark: 224 20% 12%;      /* charcoal for dark sections */
  --muted-foreground: 224 10% 52%;
  --border: 220 14% 88%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap`
- Titulares: Cormorant Garamond 600–700
- Cuerpo/UI: Inter 300–600
- Datos/precios de propiedad: Inter 600, oro para precios

## Secciones

### 1. Barra de navegación
- Fondo blanco pegajoso con una sombra sutil en el desplazamiento
- Izquierda: marca denominativa Cormorant "James Harlow" + "Propiedades" en Inter 300 silenciado
- Derecha: Listados · Acerca de · Proceso · Contacto + botón dorado "Obtener una valoración gratuita →"

### 2. Hero
- Diseño dividido: contenido izquierdo (55%), imagen de propiedad grande derecha con 2xl redondeado (45%)
- Contenido izquierdo:
 - Inter 500 etiqueta silenciada de 10 píxeles en mayúsculas: "Prime London Property Specialist"
 - Cormorant 700 `clamp(48px, 6vw, 88px)`: "Encontrar su\ncasa\nperfecta"
 - Acento en cursiva dorada "Perfecto"
 - Inter 300 sub: "Especialista en propiedades residenciales de primera calidad en Londres: Mayfair, Kensington, Chelsea"
 - Dos CTA: "Buscar listados →" (relleno de oro) + "Valoración gratuita" (oro fantasma)
 - Tres fichas de confianza: "Más de £200 millones vendidos · 15 años de experiencia · 4.9★ Google"

{/* Resumen de imagen: exterior de una lujosa casa adosada en Londres, fachada de estuco blanco, barandillas de hierro negro, día luminoso, calle residencial de primera calidad */}

### 3. Tira de estadísticas
: fondo de color carbón de ancho completo `#1a1c2e`, 90 px tall
- 4 estadísticas blancas en cursiva Cormorant: "£200 millones+ vendidos" · "320+ casas" · "15 años" · "4.9★ Calificación promedio"
- Divisores dorados entre estadísticas
- Uso de Framer MotionConteo de primavera en desplazamiento (números solamente)

### 4. Listados destacados
- "Propiedades destacadas" en Cormorant 700 con regla de subrayado dorado (escalaX 0→1)
- 3 tarjetas de propiedad seguidas:
 - Cada una: imagen de ancho completo (relación de aspecto 4/3), nombre de propiedad + área chip (Inter 500), dormitorios/baños/fila de pies cuadrados coníconos Lucide, etiqueta de precio dorada (Inter 600)
 - Coloca el cursor sobre: borde dorado + elevadores de tarjeta `translateY(-4px)`, `box-shadow: 0 8px 32px rgba(0,0,0,0.12)`
 - "Ver detalles →" enlace dorado en la parte inferior
- "Ver todos los listados →" botón dorado delineado a continuación

{/* Imagen breve: lujo Interior de un apartamento en Londres, grandes ventanales, decoración elegante y minimalista, luz natural */}
{/* Imagen breve: sala de estar de una casa adosada georgiana, techos altos, elementos de época, iluminación cálida */}
{/* Imagen breve: ático moderno con vistas al horizonte de la ciudad, planta abierta, acabados de primera */}

### 5. Acerca de
- Dividido: retrato a la derecha imagen, texto izquierdo
- Inter 500 etiqueta dorada de 10px en mayúsculas: "Acerca de James"
- Cormorant 700: "15 años colocando personas en hogares excepcionales"
- Biografía de Inter 300: 2 párrafos: enfoque personal, profundo conocimiento del mercado, confianza de familias e inversores alike
- Cuatro fichas de oro: "Mayfair · Kensington · Chelsea · Notting Hill"
- "Reserve una llamada de descubrimiento →" enlace de oro

{/* Resumen de imagen: retrato de un agente inmobiliario masculino profesional, traje, sonrisa cálida y segura, fondo de oficina brillante */}

### 6. Proceso Pasos
- "Cómo funciona" en Cormorant 700
- Fila horizontal de 4 pasos: Llamada de descubrimiento → Evaluación de mercado → Lista seleccionada → Llaves en mano
- Gran número de Cormorant dorado descolorido (opacidad 0,10) detrás de cada título de paso
- Descripción de Inter 300 por paso

### 7. Testimonios
- Sección de superficie blanca
- 3 tarjetas: fila dorada de 5 estrellas, cita en cursiva Cormorant, nombre del cliente + área de propiedad en Inter 10px silenciado
- Desvanecimiento escalonado en el desplazamiento

### 8. Valoración CTA
- Fondo carbón `#1a1c2e` de ancho completo
- Cormorant 700 cursiva blanco: "¿Cuál es el valor de su propiedad?"
- Inter 300 sub blanco: "Obtenga una tasación de mercado gratuita y sin compromiso de James"
- Grande gold Botón "Reserve una valoración gratuita →"
- Inter 10px muted white: "Sin compromiso · Información honesta del mercado · Generalmente dentro de las 48 horas"

### 9. Pie de página
- Fondo gris oscuro, 3 columnas: Marca + eslogan · Enlaces · Contacto (teléfono, correo electrónico,dirección)
- Inter 10px silenciado: "James Harlow es miembro del Defensor del Pueblo de la Propiedad. Registrado en Inglaterra y Gales. loop
- Estadísticas: usoCuenta ascendente de primavera en el desplazamiento
- Tarjetas de listado: desvanecimiento escalonado en el desplazamiento
- Reglas de oro: escalaX 0→1, 0.5s
- Desplazamiento total: 0.2s de facilidad

## Responsive
- Móvil: héroe apilado, listados de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "James Harlow Properties"
- Lema: "Especialista en propiedades residenciales Prime London"
- Héroe: "Encontrar su hogar perfecto" / "Especialista en propiedades residenciales de primera calidad en Londres: Mayfair, Kensington, Chelsea"
- Estadísticas: £200 millones+ vendidas · Más de 320 casas · 15 años · Calificación 4,9★
- Listados: The Kensington Residence · 4 habitaciones · £3,200,000 | Casa Chelsea Mews · 3 habitaciones · £ 2,850,000 | Ático Mayfair · 2 habitaciones · £4,500,000
- Proceso: Llamada de descubrimiento → Evaluación de mercado → Lista seleccionada → Llaves en mano
- Testimonio: "James no solo nos encontró una casa, sino que también nos encontró un hogar. Su conocimiento de Kensington es incomparable". — La familia Harrison, 2025
- CTA: "¿Cuánto vale su propiedad?" / "Tasación de mercado gratuita y sin compromiso"