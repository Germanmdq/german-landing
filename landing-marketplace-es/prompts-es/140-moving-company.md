# Mensaje del sitio web de la empresa de mudanzas
# websiteprompts.ai

Cree un sitio web de empresa de mudanzas y mudanzas audaz y seguro llamado "Shift Movers" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 0 0% 6%;              /* near-black #0f0f0f */
  --foreground: 0 0% 96%;             /* white */
  --primary: 0 0% 96%;
  --primary-foreground: 0 0% 6%;
  --accent: 48 92% 55%;               /* signal yellow #f0c52a */
  --surface: 0 0% 10%;
  --surface-raised: 0 0% 14%;
  --muted-foreground: 0 0% 52%;
  --border: 0 0% 18%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap`
- Titulares: Bebas Neue — condensado, negrita, sensato
- Cuerpo: Inter 300–500
- Etiquetas: Inter 600 mayúsculas 10px espacio entre letras 0.14em

## Secciones

### 1. Navbar
- Adhesivo casi negro, `backdrop-filter: blur(12px)`
- Izquierda: Bebas Neue "SHIFT" + Paquete LucideIcono de apertura en amarillo
- Derecha: Servicios · Cobertura · Acerca de · Cotización + botón amarillo "Obtener una cotización →" (texto oscuro)

### 2. Hero
- Altura de la ventana de visualización completa, casi negro fondo
- Fotografía con sangrado completo `posición: inserción absoluta-0 w-completo h-objeto completo-cubierta objeto-centro`
- Superposición independiente de la composición: `linear-gradient(to right, rgba(15,15,15,0.97) 0%, rgba(15,15,15,0.72) 50%, rgba(15,15,15,0.2) 100%)`
- Contenido `índice z: 10`, alineado a la izquierda `relleno-izquierda: 7vw`, centrado verticalmente:
 - Inter 600 etiqueta amarilla mayúscula de 10 píxeles: "Mudanzas y almacenamiento · Londres y todo el país"
 - Bebas Neue `clamp(72px, 11vw, 160px)` blanco, altura de línea 0,85: "TU MUDANZA.\nMANEJADO".
 - Acento amarillo en "HANDLED".
 - Inter 300 sub blanco silenciado: "Mudanzas de casa, reubicaciones de oficinas y almacenamiento seguro: totalmente asegurado, a tiempo, sin daños, sin excusas"
 - CTA: "Obtenga una cotización gratuita →" (texto oscuro, relleno en amarillo) + "Vea nuestros servicios" (blanco fantasma)
 - Chips de confianza flotantes: "Totalmente asegurado · Cotización el mismo día · Cobertura nacional"

{/* Resumen de imagen: equipo de mudanzas profesional cargando cajas, entrada a un edificio urbano moderno, uniforme de marca limpio, luz natural brillante, fotografía comercial segura */}

: desvanecimiento escalonado en el soporte: etiqueta (0), título (0,1), sub (0,26), CTA (0,4)

### 3. Servicios
- "What We Move" — Bebas Neue `clamp(52px, 7vw, 85px)` blanco
- 6 servicios rejilla 3×2, tarjetas superficie oscura:
 - Mudanzas de casa (local y larga distancia, servicio completo de embalaje)disponible)
 - Mudanzas de oficinas (mudanzas de negocios, equipos de TI, tiempo de inactividad mínimo)
 - Man & Van (mudanzas más pequeñas, mudanzas de estudiantes, artículos individuales)
 - Piano & Antiques (mudanzas especializadas para artículos de alto valor)
 - Servicio de embalaje (embalaje y desembalaje completo, materiales proporcionado)
 - Almacenamiento (almacenamiento seguro con clima controlado, a corto y largo plazo)
- Cada tarjeta: icono de Lucide amarillo, nombre del servicio Bebas Neue 22px, descripción silenciada de Inter 300
- Colocar el cursor sobre: borde amarillo + `box-shadow: 0 0 18px hsl(48 92% 55% / 0.12)`

### 4. Estadísticas Strip
- Amarillo de ancho completo `#f0c52a`, 80px de altura
- 4 estadísticas oscuras de Bebas Neue: "8000+ movimientos" · "100% asegurado" · "4.9★ Google" · "Cotización el mismo día"
- Divisores oscuros, cuenta atrás scroll

### 5. Cómo funciona
- "El proceso de cambio" — Bebas Neue grande blanco
- 4 pasos: Obtenga una cotización → Reserve su fecha → Empacamos y cargamos → Entregado a tiempo
- Gran número amarillo descolorido (opacidad 0,07) detrás de cada uno paso
- Descripción silenciada de Inter 300, desvanecimiento escalonado en el desplazamiento

### 6. Por qué Shift
- Dividir: texto a la izquierda, imagen a la derecha
- Bebas Neue grande blanco: "SIN DAÑO.\nSIN DRAMA.\nSIN DEMORAS".
- Inter 300 silenciado: 2 párrafos: cada movimiento es realizado por personal capacitado, no por mano de obra ocasional. Todos los vehículos con seguimiento GPS. Seguro de contenido completo en cada trabajo.
- 4 puntos de control amarillos: "Equipo totalmente asegurado · Flota con seguimiento por GPS · Tasa de reclamo por daños del 0 % · Sin cargos ocultos"

{/* Resumen de imagen: furgoneta de mudanzas cargándose, equipo profesional en acción, furgoneta limpia, entorno urbano durante el día */}

### 7. Cobertura
- "Cubrimos todo el Reino Unido" - Bebas Neue grande
- Sección centrada, Inter 300 silenciado "Londres, Manchester, Birmingham, Leeds, Edimburgo, y todos los puntos intermedios"
- 2 CTA: "Obtenga una cotización para su área →" amarillo + "Habla con el equipo" fantasma

### 8. Testimonios
- Sección en relieve
- 3 tarjetas: fila amarilla de 5 estrellas, cita blanca en cursiva Inter 300, nombre + tipo de movimiento Inter 10px silenciado
- Desvanecimiento escalonado en el desplazamiento

### 9. Cita CTA
- Amarillo de ancho completoFondo `#f0c52a`
- Bebas Neue `clamp(52px, 7vw, 90px)` dark: "OBTENGA SU COTIZACIÓN GRATUITA EN 60 SEGUNDOS"
- Inter 300 dark: "Díganos la fecha de su mudanza, las ubicaciones y el tamaño; le regresaremos con un precio fijo, sin sorpresas"
- "Obtener un presupuesto gratuito →" botón oscuro casi negro
- "Sin compromiso · Precio fijo · Disponible 7 días" Inter 10px dark 70%

### 10. Footer
- Casi negro, Bebas Neue "SHIFT" en amarillo + paquete lucideOpen
- Google · Facebook · TrustPilot link
- "© 2026 Shift Movers · Mudanzas y almacenamiento · Londres y todo el país · Totalmente asegurado · 0800 123 4567"

## Animaciones
- Héroe: desvanecimiento escalonado en la montaña
- Tira de estadísticas: cuenta atrás en scroll
- Cuadrícula de servicios: desvanecimiento escalonado
- Desplazamiento total: 0,15 s de facilidad

## Responsive
- Móvil: héroe apilado, servicios de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "SHIFT"
- Héroe: "TU MOVIMIENTO. MANEJADO". / "Mudanzas de casa, mudanzas de oficinas y almacenamiento seguro: totalmente asegurado, a tiempo"
- Servicios: Mudanzas de casa · Mudanzas de oficinas · Man & Van · Piano y antigüedades · Embalaje · Almacenamiento
- Estadísticas: Más de 8000 mudanzas · 100% asegurado · 4,9★ Google · El mismo día Cotización
- Proceso: Cotización → Reservar → Empacar y cargar → Entregado a tiempo
- Testimonio: "Shift mudó nuestra casa de 4 dormitorios en un día. Ni un solo rasguño en nada. El equipo fue profesional y rápido; la volvería a usar sin lugar a dudas". — Mark H., Londres
- CTA: "OBTENGA SU COTIZACIÓN GRATUITA EN 60 SEGUNDOS" / "Precio fijo, sin sorpresas"