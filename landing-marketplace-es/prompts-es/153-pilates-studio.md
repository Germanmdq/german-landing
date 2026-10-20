# Sitio web de Pilates Studio Prompt
# websiteprompts.ai

Cree un sitio web tranquilo y centrado en el cuerpo de un estudio de pilates y reformer llamado "Forma Studio" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 40 18% 97%;         /* warm white #faf9f5 */
  --foreground: 150 12% 14%;        /* deep warm near-black */
  --primary: 155 20% 42%;           /* sage green #528a6e */
  --primary-foreground: 0 0% 100%;
  --accent: 15 35% 72%;             /* warm clay #c9927a */
  --surface: 40 14% 91%;            /* warm linen */
  --muted-foreground: 150 8% 52%;
  --border: 40 12% 82%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap`
- Titulares: DM Serif Display — acentos salvia cursiva
- Cuerpo: DM Sans 300–400
- Etiquetas: DM Sans 500 mayúsculas 10px espaciado entre letras 0,12em

## Secciones

### 1. Navbar
- Fondo blanco cálido y pegajoso, `backdrop-filter: blur(10px)`
- Izquierda: DM Serif Mostrar marca denominativa en cursiva "Forma" en verde salvia
- Derecha: Clases · Horario · Precios · Acerca de + botón salvia "Reservar una clase →"

### 2. Hero
- Vista completa, blanco cálido fondo
- Diseño dividido: contenido izquierdo (50%), imagen vertical derecha alta (relación de aspecto 2/3, sin radio de borde)
- Izquierda:
 - DM Sans 500 mayúscula 10px etiqueta salvia: "Reformer & Mat Pilates · Notting Hill"
 - Pantalla DM Serif `clamp(46px, 6vw, 90px)`: "Más fuerte.\nMás largo.\nMás tranquilo."
 - DM Serif con acento de arcilla en cursiva en "Calmer".
 - DM Sans 300 sub: "Reformador de grupos pequeños y pilates en esterilla para todos los cuerpos, desde principiantes hasta practicantes avanzados"
 - CTA: "Reserve su introducción →" (lleno de salvia) + "Ver horario" (fantasma)
 - Fichas de confianza: "Certificado APPI · Máximo 6 por clase · Oferta de introducción de £30"
- Imagen principal: Framer Motion float `y: 0→-6→0`, bucle de 8 s

{/* Imagen breve: mujer en posición reformadora de pilates, expresión concentrada, estudio blanco limpio, natural atmósfera luminosa y serena */}

### 3. Tipos de clases
- "Lo que ofrecemos" — Pantalla DM Serif con regla de subrayado salvia (escalaX 0→1)
- Cuadrícula de 4 tarjetas 2×2, fondo de superficie cálida:
 - Reformer Pilates (basado en equipos, resistencia a resortes, cuerpo completo) — desde £22)
 - Mat Pilates (método clásico, centrado en el core, todos los niveles — desde £16)
 - Reformer & Barre (fusión cardio-escultura, reformer + trabajo con barra — desde £24)
 - 1-2-1 Privado (completamentepersonalizado, tu ritmo, tus objetivos, desde £75)
- Cada tarjeta: nombre DM Serif, descripción DM Sans 300, etiqueta de precio de salvia, icono de arcilla lucide
- Desplazamiento: borde salvia + brillo suave de salvia

### 4. Por qué Forma
- Dividir: texto a la izquierda, a la derecha image
- DM Serif Display: "Clases pequeñas. Grandes resultados".
- DM Sans 300: 2 párrafos: máximo 6 personas por clase significa atención genuina, corrección genuina, progreso genuino. Instructores certificados APPI. Cada reformador se configura individualmente antes de llegar.
- 4 puntos de control con Lucide Check in sage:
 - "Máximo 6 por clase, siempre"
 - "Instructores certificados por APPI"
 - "Reformadores preestablecidos antes de llegar"
 - "Principiantes bienvenidos — no se necesita experiencia"

{/* Imagen breve: pequeña clase de reformador de pilates, dos estudiantes con un instructor, estudio minimalista y luminoso, entrenamiento atento, luz natural */}

### 5. Horario
- "Clases de esta semana" — DM Serif Display
- Calendario de desplazamiento horizontal de 7 días (días como pestañas, clases enumerados por día)
- Cada clase: DM Serif Nombre para mostrar, DM Sans 300 instructor + hora, indicador de "espacios restantes" de Sage, enlace "Libro →"
- Pestañas: lunes / martes / miércoles / jueves / viernes / sábado / domingo (componente de pestañas shadcn/ui)

### 6. Conozca el Instructores
- "Tus instructores" — DM Serif Display
- 3 tarjetas: retrato cuadrado (redondeado-xl), nombre DM Serif, chips especiales de salvia, breve biografía de DM Sans 300
- Desplazamiento: suave brillo de salvia

{/* Imagen breve: instructora de pilates, estudio blanco, profesional tranquila expresión, luz natural, entorno mínimo */}
{/* Imagen breve: foto de la cabeza de una instructora, fondo del estudio de pilates, sonrisa cálida, tonos salvia */}
{/* Imagen breve: instructor de pilates, entorno de estudio limpio, atlético y accesible */}

### 7. Precios
- "Elija su plan" — DM Serif Display
 - Tarjetas de 3 niveles: 
 - Drop In (cualquier clase, en cualquier momento, £ 22 – £ 24) 
 - Studio Pass (8 clases/mes, desde £ 149/mes, ahorra un 15%) 
 - Ilimitado (clases ilimitadas + 1 privado/mes, desde £ 199/mes - destacadomedio)
- Tarjeta "ilimitada" del medio: borde salvia + insignia "Más popular"
- Lista de funciones de DM Sans 300, lucide Check in sage, desplazamiento: suave brillo salvia

### 8. Testimonios
- Superficie cálida sección
- 3 tarjetas: fila de 5 estrellas en salvia, cita DM Serif en cursiva, nombre de cliente + tipo de clase en DM Sans 10px silenciado
- Desvanecimiento escalonado en el desplazamiento

### 9. Oferta de introducción CTA
- Verde salvia de ancho completo `#528a6e` fondo
- DM Serif Display cursiva blanca: "Prueba tu primera clase por £30"
- DM Sans 300 blanco: "Sin compromiso, solo preséntate, respira y muévete"
- "Reserva tu introducción →" botón de marfil
- "Nuevos clientes solo · Todos los niveles son bienvenidos · Cancelar en cualquier momento" DM Sans 10px ivory 70%

### 10. Pie de página
- Fondo cálido casi negro, marca denominativa DM Serif cursiva en salvia
- Instagram · YouTube · Google Maps
- "© 2026 Forma Studio · 12 Westbourne Park Road, Notting Hill, Londres W2"

## Animaciones
- Imagen de héroe: flotador suave y: 0→-6→0, bucle de 8s
- Tarjetas de clase: desvanecimiento escalonado en el desplazamiento
- Reglas de Sage: escalaX 0→1, 0.5s
- Transiciones de pestañas de horario: 0.2s facilidad

## Responsive
- Móvil: héroe apilado, clases de una sola columna, horario desplazable, navegación de hamburguesas

## Copia completa
- Marca denominativa: "Forma Estudio"
- Héroe: "Más fuerte y más tranquilo". / "Reformer para grupos pequeños y pilates en mat para todos los cuerpos"
- Clases: Reformer desde £22 · Mat desde £16 · Reformer & Barre desde £24 · 1-2-1 desde £75
- Precio: Sin cita previa £22-24 · Studio Pass desde £149/mes · Ilimitado desde £199/mes
- Testimonio: "He probado todos los estudios de pilates en Londres. Forma es el único donde realmente he visto mi cuerpo cambiar en 8 semanas". — Emma K., miembro desde 2024
- CTA: "Prueba tu primera clase por £30" / "Sin compromiso: solo preséntate, respira y muévete"