# Sitio web de contador/asesor financiero Prompt
# websiteprompts.ai

Cree un sitio web limpio y centrado en la confianza para contadores y asesores financieros llamado "Harlow & Co Accountants" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 0 0% 100%;
  --foreground: 220 25% 12%;        /* deep navy-charcoal #0d1826 */
  --primary: 218 68% 22%;           /* deep navy #0d1b3e */
  --primary-foreground: 0 0% 100%;
  --accent: 34 72% 50%;             /* warm amber #d4892a */
  --surface: 216 20% 96%;
  --surface-dark: 218 68% 22%;
  --muted-foreground: 220 12% 52%;
  --border: 216 18% 88%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap`
- Todo el texto: Plus Jakarta Sans
- Titulares: Plus Jakarta Sans 700–800
- Cuerpo: Plus Jakarta Sans 300–400
- Etiquetas/insignias: Plus Jakarta Sans 600 mayúsculas, espacio entre letras de 10 px, 0,12 em

## Secciones

### 1. Navbar
- Fondo blanco pegajoso, borde inferior delgado en el desplazamiento
- Izquierda: además de la marca denominativa Jakarta Sans 700 "Harlow & Co" + "Chartered Accountants" en 300 silenciado
- Derecha: Servicios · Acerca de · Recursos · Contacto + botón azul marino "Reservar consulta gratuita →"

### 2. Hero
- Diseño dividido: contenido izquierdo (55%), ilustración/imagen derecha (45%)
- Izquierda:
 - Plus Jakarta Sans 600 etiqueta ámbar mayúscula de 10 píxeles: "Contadores públicos y asesores financieros"
 - Plus Jakarta Sans 800 `clamp(40px, 5vw, 72px)`: "Números claros.\nDecisiones inteligentes.\nTranquilidad". 
 - Además del subtítulo Jakarta Sans 300: "Asesoramiento contable, fiscal y financiero para pequeñas empresas y particulares del Reino Unido: sencillo y sin jerga". 
 - Dos CTA: "Reserve una consulta gratuita →" (relleno azul marino) + "Vea nuestros servicios" (fantasma azul marino)
 - Franja de confianza debajo de las CTA: 3 chips: "Miembro de ICAEW · Más de 200 clientes · Est. 2008"

{/* Resumen de imagen: interior limpio y moderno de una oficina de contabilidad, escritorio de madera clara, computadora portátil, luz natural, profesional pero accesible, no corporativo */}

### 3. Confianza Bar
- Fondo azul marino de ancho completo `#0d1b3e`, 72 píxeles de alto
- 4 estadísticas blancas en Plus Jakarta Sans 700: "Más de 200 clientes" · "15 años" · "4.9★ Google" · "Registrado por ICAEW"
- Divisores ámbar entre estadísticas
- Uso de Framer MotionCuenta ascendente de primavera activada por IntersectionObserver

### 4. Services Grid
- "Qué hacemos" en Plus Jakarta Sans 800 con ámbarregla de subrayado (escalaX 0→1)
- Cuadrícula de 3 × 2 de 6 servicios:
 - Contabilidad y teneduría de libros · Declaraciones de impuestos (personales y comerciales) · Declaraciones de IVA · Nómina · Puesta en marcha de negocios · Planificación financiera
- Cada tarjeta: icono de ámbar lucide, Plus nombre de servicio Jakarta Sans 700, Plus Jakarta Sans 300 descripción breve, "Más información →" enlace ámbar
- Pasar el cursor: borde ámbar + `box-shadow: 0 0 20px hsl(34 72% 50% / 0.10)`
- Desvanecimiento escalonado en el desplazamiento

### 5. Por qué elegirnos
- Dividir: texto izquierdo, imagen derecha
- Plus Jakarta Sans 800: "Contabilidad sencilla, sin jerga"
- Plus Jakarta Sans 300: 2 párrafos: servicio personal, administrador de cuentas dedicado, asesoramiento proactivo no solo presentación de fin de año
- 4 puntos de control con lucidez Iconos de verificación en ámbar:
 - "Administrador de cuentas dedicado, siempre el mismo persona"
 - "Cuotas mensuales fijas, sin facturas sorpresa"
 - "Planificación fiscal proactiva, no solo presentación"
 - "Respuesta en 24 horas, garantizada"

{/* Imagen breve: contable en el escritorio, revisando documentos, expresión profesional amigable, oficina brillante, accesible, no corporativo */}

### 6. Precios
- "Precio simple y fijo" en Plus Jakarta Sans 800 con regla ámbar
- 3 tarjetas: comerciante individual (desde £ 89/mes) · Sociedad limitada (desde £ 149/mes) · Negocio en crecimiento (desde £ 149/mes) £249/mes)
- Cada tarjeta: Plus Jakarta Sans 700 nombre de nivel, precio ámbar, lista de funciones Plus Jakarta Sans 300 con íconos de verificación Lucide
- Tarjeta intermedia de "Sociedad Limitada": borde azul marino + insignia ámbar "Más popular"
- Desplazamiento: borde azul marino + azul marino suave Glow

### 7. Proceso
- "Comenzar es fácil" en Plus Jakarta Sans 800
- Fila de 4 pasos: Consulta gratuita → Llamada de incorporación → Nos encargamos de todo → Informes mensuales
- Número grande de color ámbar descolorido Plus Jakarta Sans 800 (opacidad 0.08) detrás de cada paso
- Plus Jakarta Sans 300 descripción por paso
- Desvanecimiento escalonado en el desplazamiento

### 8. Testimonios
- Sección de superficie clara
- 3 tarjetas: fila de 5 estrellas en ámbar, Plus Jakarta Cita en cursiva Sans 300, nombre del cliente + tipo de negocio en Plus Jakarta Sans10px silenciado
- Desvanecimiento escalonado

### 9. Avance de preguntas frecuentes
- "Preguntas comunes" en Plus Jakarta Sans 800
- 4 elementos de acordeón usando shadcn/ui Acordeón: cada Q se expande para revelar A
 - "¿Necesito un contador si uso software de contabilidad?" · "¿Cuál es la diferencia entre teneduría de libros y contabilidad?" · "¿Cuándo debo registrarme para el IVA?" · "¿Qué tan rápido puedes reemplazar a mi contador actual?" 
- Plus Jakarta Sans 300 respuestas
- Borde izquierdo azul marino en elemento abierto

### 10. Banner CTA
- Azul marino de ancho completo `#0d1b3e` fondo
- Plus Jakarta Sans 800 white: "Reserve su consulta gratuita de 30 minutos"
- Plus Jakarta Sans 300 white sub: "Sin compromiso, solo asesoramiento claro de un contador calificado"
- Botón ámbar "Reservar ahora →"
- Plus Jakarta Sans 10px blanco silenciado: "Espacios limitados · Generalmente disponible dentro de 3 días hábiles"

### 11. Pie de página
- Fondo azul marino oscuro, 3 columnas: Marca + insignia ICAEW · Enlaces de servicios · Contacto (dirección, teléfono, correo electrónico)
- Plus Jakarta Sans 10px silenciado blanco: "Harlow & Co Accountants Ltd está registrado en el Instituto of Chartered Accountants in England and Wales (ICAEW Company No. 08234567."
- "© 2026 Harlow & Co Accountants"

## Animaciones
- Barra de confianza: cuenta ascendente en desplazamiento
- Cuadrícula de servicios: desvanecimiento escalonado en scroll
- Reglas ámbar: escalaX 0→1, 0.5s
- Acordeón: transición de altura suave a través de shadcn
- Desplazamiento total: 0.2s facilidad

## Responsive
- Móvil: servicios de una sola columna, héroe apilado, hamburguesa nav

## Copia completa
- Marca denominativa: "Harlow & Co Chartered Accountants"
- Lema: "Números claros. Decisiones inteligentes. Tranquilidad". 
- Subtítulo principal: "Asesoramiento contable, fiscal y financiero para pequeñas empresas y particulares del Reino Unido: sencillo, sin jerga."
- Servicios: Contabilidad y contabilidad · Declaraciones de impuestos · Declaraciones de IVA · Nómina · Puesta en marcha de una empresa · Planificación financiera
- Precios: Empresario individual desde £89/mes · Sociedad limitada desde £149/mes · Negocio en crecimiento desde £249/mes
- Confianza:"Gerente de cuentas dedicado · Tarifas mensuales fijas · Planificación fiscal proactiva · Garantía de respuesta las 24 horas"
- Testimonio: "Harlow & Co nos ahorró miles de dólares en nuestro primer año al aprovechar las desgravaciones fiscales que nuestro contador anterior había pasado por alto por completo". — Sarah T., fundadora de comercio electrónico, 2025
- CTA: "Reserve su consulta gratuita de 30 minutos" / "Sin compromiso: solo un consejo claro de un contador calificado"
- Descargo de responsabilidad: "Registrado en ICAEW · Número de empresa 08234567 · Registrado en Inglaterra y Gales"