# Curso en línea/Sitio web de aprendizaje electrónico Prompt
# websiteprompts.ai

Cree un curso en línea limpio y moderno y un sitio web de plataforma de aprendizaje electrónico llamado "Craft Academy" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 42 10% 98%;           /* warm white #fafaf7 */
  --foreground: 215 28% 12%;          /* deep navy */
  --primary: 215 48% 22%;             /* deep navy #1a2440 */
  --primary-foreground: 0 0% 100%;
  --accent: 38 62% 52%;               /* amber #d4903a */
  --surface: 42 10% 94%;
  --surface-raised: 42 8% 98%;
  --muted-foreground: 215 10% 50%;
  --border: 42 12% 86%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap`
- Todo el texto: Plus Jakarta Sans
- Titulares: Plus Jakarta Sans 700–800
- Cuerpo: Plus Jakarta Sans 300–400
- Etiquetas: Plus Jakarta Sans 600 mayúsculas, 10 px, espacio entre letras 0,10 em

## Secciones

### 1. Navbar
- Blanco cálido y pegajoso, borde delgado en el desplazamiento
- Izquierda: Plus Jakarta Sans 700 "Craft Academy" + pequeño ícono de Graduación Lucide en ámbar
- Derecha: Cursos · Instructores · Comunidad · Precios + botón azul marino "Empezar gratis →"

### 2. Hero
- Altura de la ventana gráfica completa, fondo blanco cálido
- Dividido: izquierda 55% contenido editorial + tarjeta de curso flotante, derecha 45% fotografía (redondeado-2xl)
- Panel izquierdo `padding: 0 4vw 0 7vw`:
 - Plus Jakarta Sans 600 mayúsculas Etiqueta ámbar de 10 píxeles: "Cursos en línea · Aprenda a su propio ritmo"
 - Además de Jakarta Sans 800 `clamp(38px, 5vw, 68px)` en primer plano, altura de línea 1,05: "Aprenda de\nexpertos.\nNo de algoritmos".
 - Además de Jakarta Sans 300 sub silenciado: "Habilidades reales de profesionales reales — diseño, desarrollo, marketing y negocios cursos cortos con acceso de por vida."
 - CTA: "Buscar cursos →" (relleno azul marino) + "Vea cómo funciona" (fantasma)
 - Fichas de confianza: "Más de 4200 estudiantes · Calificación 4.9★ · Acceso de por vida"
 - Tarjeta de vista previa del curso flotante a continuación. CTA:
 `background: white; border: 0.5px solid var(--color-border); border-radius: 12px; padding: 16px 18px; max-width: 300px; margin-top: 2rem; box-shadow: 0 2px 12px rgba(0,0,0,0.06)`
 - Chip de categoría ámbar: "MÁS POPULAR"
 - Plus Jakarta Sans 700 14px azul marino: "Fundamentos de diseño de interfaz de usuario"
 - Plus Jakarta Sans 300 12px silenciado: "6 módulos · 4,2 horas · Acceso de por vida"
 - Fila ámbar de 5 estrellas + "4,9 (312 reseñas)"
 - Ámbar "Inscríbete ahora →" enlace
 - Framer Motion: escala desde 0,9, aparición gradual en 0,5 s

{/* Imagen breve: persona aprendiendo en el escritoriocon computadora portátil, computadora portátil abierta, atmósfera cálida y enfocada, espacio de trabajo hogareño moderno, luz natural: concentración genuina, no escenificada */}

- El héroe se tambalea y se desvanece en el monte

### 3. Cursos destacados
- "Nuestros cursos" - Además de Jakarta Sans 800
- 6 cursos 3×2 grid:
 - Fundamentos de diseño de interfaz de usuario (6 módulos, 4,2 horas, desde £ 49) 
 - Framer for Designers (8 módulos, 5,5 horas, desde £ 59) 
 - Estrategia de marca (5 módulos, 3 horas, desde £ 49) 
 - Redacción publicitaria que convierte (4 módulos, 2,5 horas, desde £ 39) 
 - Desarrollo web sin código (10 módulos, 8 horas, desde £ 79) 
 - Gestión de productos 101 (7 módulos, 6 horas, desde £ 59) 
 - Cada tarjeta: chip de categoría ámbar, más nombre del curso Jakarta Sans 700, Plus Jakarta Sans Módulo 300 + duración, calificación de 5 estrellas, etiqueta de precio ámbar
- Desplazamiento: borde azul marino + brillo azul marino suave

### 4. Cómo funciona
- "Aprenda diferente" - Además Jakarta Sans 800
- 4 pasos: Explorar e inscribirse → Ver a su ritmo → Practicar Proyectos → Obtenga la certificación
- Gran número azul marino descolorido (opacidad 0,07) detrás de cada paso
- Plus Jakarta Sans 300 descripción silenciada, desvanecimiento escalonado en el desplazamiento

### 5. Instructores
- "Taught by Practitioners" — Plus Jakarta Sans 800
- 3 tarjetas de instructor: vertical (cuadrada, redondeada-xl), nombre Plus Jakarta Sans 700, chip especial de color ámbar, biografía Plus Jakarta Sans 300 (2 líneas: trabajando en el campo, no solo enseñando)
- Desplazamiento: suave brillo ámbar

{/* Imagen breve: diseñador trabajando en un estudio profesional, relajado y experto, entorno limpio y moderno */}
{/* Resumen de imagen: desarrollador con múltiples monitores, configuración de estudio casero profesional y enfocado */}
{/* Resumen de imagen: foto de rostro profesional de marketing, confianza y accesibilidad, luz cálida */}

### 6. Stats Strip
: azul marino de ancho completo `#1a2440`, 72px
- 4 ámbar Plus Jakarta Sans 700 estadísticas: "4,200+ estudiantes" · "24 cursos" · "4.9★ Calificación promedio" · "Acceso de por vida"
- Conteo de movimiento del framer en desplazamiento, divisores ámbar

### 7. Precios
- "Precios simples" - Plus Jakarta Sans 800
- 3niveles:
 - Curso único (cómprelo una vez, consérvelo para siempre, desde £39)
 - Acceso total mensual (cada curso + nuevos lanzamientos, £19/mes)
 - Acceso total anual (cada curso + comunidad + llamadas de coaching, £149/año - destacado, borde ámbar + "Mejor valor" insignia)
- Nombre del nivel Plus Jakarta Sans 700, lista de funciones Plus Jakarta Sans 300, lucide Check in amber
- Desplazamiento: brillo ámbar suave

### 8. Testimonios
- Sección de superficie cálida
- 3 tarjetas: Fila ámbar de 5 estrellas, cita en cursiva Plus Jakarta Sans 300, nombre del estudiante + curso en Plus Jakarta Sans 10px silenciado
- Desvanecimiento escalonado en el desplazamiento

### 9. Inscribirse CTA
- Azul marino de ancho completo `#1a2440`
- Plus Jakarta Sans 800 blanco: "Empiece a aprender hoy: primera lección gratis"
- Plus Jakarta Sans 300 blanco: "No se requiere tarjeta de crédito: explore todos los cursos, mire la primera lección y pague solo si le encanta"
- "Comience gratis →" botón ámbar (texto oscuro)
- "Sin compromiso · Acceso de por vida al comprar · Cancelar mensualmente en cualquier momento" Plus Jakarta Sans 10px blanco 70%

### 10. Pie de página
- Casi negro, Plus Jakarta Sans 700 "Craft Academy" en ámbar
- Twitter/X · LinkedIn · YouTube
- "© 2026 Craft Academy · Cursos en línea · Aprende en cualquier lugar · Acceso de por vida"

## Animaciones
- Héroe: desvanecimiento escalonado en la montura, escala de tarjeta de curso flotante 0.9→1 a 0.5s
- Cuadrícula del curso: desvanecimiento escalonado en scroll
- Tira de estadísticas: cuenta atrás en scroll
- Tarjetas de precios: desvanecimiento escalonado

## Responsive
- Móvil: héroe apilado, cursos de una sola columna, navegación de hamburguesa

## Completo Copia
- Marca denominativa: "Craft Academy"
- Héroe: "Aprenda de expertos. No de algoritmos". / "Habilidades reales de profesionales reales: diseño, desarrollo, marketing y negocios"
- Cursos: Diseño de interfaz de usuario £49 · Framer £59 · Estrategia de marca £49 · Redacción £39 · Desarrollo sin código £79 · Gestión de productos £59
- Estadísticas: 4200+ estudiantes · 24 cursos · Calificación 4.9★ · De por vida Access
- Precio: Individual desde £39 · Acceso completo £19/mes · Anual £149/año
- Testimonio: "ITerminé el curso de Framer un sábado y tuve mi primer cliente independiente el jueves siguiente. La calidad es de nivel genuinamente profesional". — James T., diseñador independiente
- CTA: "Empiece a aprender hoy: primera lección gratuita"