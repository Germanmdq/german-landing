# Sitio web de corredor hipotecario Prompt
# websiteprompts.ai

Cree un sitio web de asesor financiero y corredor hipotecario limpio y confiable llamado "Clearpath Mortgages" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 0 0% 100%;
  --foreground: 215 30% 12%;        /* deep navy near-black */
  --primary: 215 52% 28%;           /* deep navy #1e3a5f */
  --primary-foreground: 0 0% 100%;
  --accent: 42 60% 55%;             /* warm gold #c9a55a */
  --surface: 215 15% 96%;           /* light blue-grey */
  --surface-navy: 215 30% 92%;      /* navy tint */
  --muted-foreground: 215 12% 52%;
  --border: 215 16% 88%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap`
- Todo el texto: Plus Jakarta Sans
- Titulares: Plus Jakarta Sans 700–800
- Cuerpo: Plus Jakarta Sans 300–400
- Etiquetas: Plus Jakarta Sans 600 mayúsculas, 10 px, espacio entre letras 0,12 em

## Secciones

### 1. Navbar
- Fondo blanco pegajoso, borde inferior azul marino delgado en el desplazamiento
- Izquierda: más marca denominativa Jakarta Sans 700 "Clearpath" + pequeño ícono de inicio de Lucide en azul marino
- Derecha: Servicios · Cómo funciona · Acerca de · Contacto + botón azul marino "Obtener una cotización →"

### 2. Hero
- Diseño dividido: contenido izquierdo (55%), imagen grande derecha (45%, redondeado-2xl)
- Izquierda:
 - Plus Jakarta Sans 600 etiqueta azul marino de 10px en mayúsculas: "Agente hipotecario independiente"
 - Plus Jakarta Sans 800 `clamp(38px, 5vw, 70px)`: "Su hipoteca,\nsimple".
 - Plus Jakarta Sans 300 sub: "Acceso a más de 90 prestamistas, asesoramiento de todo el mercado y un servicio gratuito: encontrará la oferta adecuada en días, no semanas"
 - CTA: "Obtenga una cotización gratuita →" (relleno azul marino) + "Cómo works" (ghost navy)
 - Fichas de confianza: "CeMAP Qualified · FCA Regulated · Whole of Market"

{/* Resumen de imagen: pareja en casa revisando documentos en la mesa de la cocina, luz cálida, relajado y feliz, momento clave de la propiedad de la vivienda */}

### 3. Trust Bar
- Azul marino de ancho completo Fondo `#1e3a5f`, 72px
- 4 estadísticas blancas en Plus Jakarta Sans 700: "Más de 90 prestamistas" · "£800 millones+ arreglados" · "4.9★ Google" · "Servicio gratuito"
- Uso de Framer MotionConteo de primavera en desplazamiento, blanco dividers

### 4. Servicios
- "Cómo podemos ayudar" - Además Jakarta Sans 800 con regla de subrayado azul marino
- Cuadrícula 3×2 de 6 servicios:
 - Comprador por primera vez (nos encargamos de todo, desde AIP hasta su finalización)
 - InicioMudanza (transición perfecta, la mejor tasa para su situación)
 - Rehipotecas (ahorre dinero cuando finalice su tasa fija)
 - Compra para alquiler (hipotecas de propietarios para cartera y propietarios primerizos)
 - Trabajadores por cuenta propia (¿ingresos complejos? Encontramos prestamistas que lo entienden)
 - Protección (seguro de vida, enfermedades críticas, protección de ingresos) 
- Cada tarjeta: icono de lucide azul marino, nombre del servicio Plus Jakarta Sans 700, descripción Plus de Jakarta Sans 300, "Más información →" enlace azul marino
- Colocar el cursor sobre: borde azul marino + brillo azul marino `0 0 20px hsl(215 52% 28% / 0.10)`

### 5. Cómo Works
- "The Clearpath Process" — Plus Jakarta Sans 800
- 4 pasos: consulta gratuita → Búsqueda de todo el mercado → Solicitud de hipoteca → Finalización
- Gran número azul marino descolorido (opacidad 0,07) detrás de cada paso
- Plus Jakarta Sans 300 silenciado descripción por paso, desvanecimiento escalonado en el desplazamiento

### 6. Por qué elegir Clearpath
- División: texto izquierdo, imagen derecha
- Plus Jakarta Sans 800: "Trabajamos para usted, no para los prestamistas"
- Plus Jakarta Sans 300: 2 párrafos - Todo el mercado significa que no hay sesgos y que nuestros ingresos provienen de los prestamistas, no de usted. Calificado CeMAP. Regulado por la FCA.
- 4 puntos de control con Lucide Check en azul marino:
 - "Todo el mercado: más de 90 prestamistas comparados"
 - "Asesoramiento completamente gratuito"
 - "Asesores calificados de CeMAP"
 - "Regulado por la FCA y totalmente asegurado"

{/* Resumen de imagen: asesor hipotecario en el escritorio con el cliente, entorno de oficina cálido y profesional, documentos visibles, confianza y experiencia transmitidas */}

### 7. Conozca al equipo
- "Sus asesores" — Además de Jakarta Sans 800
- 3 tarjetas de asesor: vertical (cuadrada, rounded-xl), nombre Plus Jakarta Sans 700, chip especial azul marino (CeMAP Qualified / FCA ARN), breve biografía
- Desplazamiento: suave brillo azul marino

{/* Imagen breve: asesor hipotecario profesional masculino, informal de negocios, cálido entorno de oficina, expresión accesible */}
{/* Imagen breve: asesora financiera femenina, foto de rostro profesional, oficina moderna, segura y amigable */}
{/* Imagen breve: retrato de un asesor masculino, entorno profesional,sonrisa cálida, confiable */}

### 8. Reseñas
- Sección de superficie azul marino claro
- 3 tarjetas: fila de 5 estrellas en oro, cotización en cursiva Plus Jakarta Sans 300, nombre del cliente + tipo de hipoteca en Plus Jakarta Sans 10px silenciado
- Desvanecimiento escalonado encendido scroll

### 9. Preguntas frecuentes Accordion
- "Preguntas comunes" - Además de Jakarta Sans 800
- 4 artículos a través de shadcn/ui:
 - "¿Cuánto tiempo lleva el proceso de hipoteca?"
 - "¿Necesito un depósito grande para obtener un ¿hipoteca?"
 - "¿Puedo obtener una hipoteca si trabajo por cuenta propia?"
 - "¿Qué documentos necesitaré?"
- Borde izquierdo azul marino en el artículo abierto

### 10. CTA Banner
- Azul marino de ancho completo `#1e3a5f` fondo
- Plus Jakarta Sans 800 blanco: "Descubra cuánto puede pedir prestado"
- Plus Jakarta Sans 300 blanco: "Consulta gratuita · Sin compromiso · Comparación de todo el mercado en 24 horas"
- "Obtenga una cotización gratuita →" botón de texto blanco bg azul marino
- "Regulado por la FCA · Sin cargo · Disponible por las noches y los fines de semana" silenciado a continuación

### 11. Pie de página
- Fondo azul marino profundo, 3 columnas
- "Clearpath Mortgages Ltd está autorizado y regulado por la Autoridad de Conducta Financiera FCA No. 123456. Su casa puede ser embargada si no mantiene los pagos de su propiedad. hipoteca." Plus Jakarta Sans 10px silenciado
- "© 2026 Clearpath Mortgages · London & Remote"

## Animaciones
- Barra de confianza: cuenta atrás en el desplazamiento
- Cuadrícula de servicios: desvanecimiento escalonado en el desplazamiento
- Pasos del proceso: escalonamiento desvanecimiento en el desplazamiento
- Reglas de la Marina: escalaX 0→1, 0.5s

## Responsive
- Móvil: pilas de héroes divididas, cuadrícula de servicios de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "Clearpath"
- Héroe: "Su hipoteca, simplificada". / "Acceso a más de 90 prestamistas, asesoramiento sobre todo el mercado y un servicio gratuito"
- Servicios: Comprador por primera vez · Mudanza de vivienda · Rehipotecas · Compra para alquiler · Autónomos · Protección
- Estadísticas: Más de 90 prestamistas · £800 millones+ contratados · 4,9★ Google · Tarifa Free
- Testimonio: "Clearpath nos encontró una tasa un 0,4% más baja que la mejor oferta de nuestro banco.El proceso fue completamente libre de estrés y ellos se encargaron de todo". — James & Priya, compradores por primera vez
- CTA: "Descubra cuánto podría pedir prestado" / "Consulta gratuita · Sin compromiso"