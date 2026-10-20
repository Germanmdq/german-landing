# Aviso del sitio web de Yoga Studio
# websiteprompts.ai

Cree un sitio web de estudio de yoga tranquilo y sólido llamado "Solis Studio" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 38 25% 97%;        /* warm white #faf7f2 */
  --foreground: 25 20% 18%;        /* warm near-black */
  --primary: 145 22% 52%;          /* sage green #6b9e7a */
  --primary-foreground: 0 0% 100%;
  --surface: 38 20% 93%;           /* warm sand */
  --surface-raised: 38 18% 89%;
  --muted-foreground: 25 12% 52%;
  --border: 38 18% 84%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap`
- Titulares: DM Serif Display (cursiva para acentos)
- Cuerpo: DM Sans 300–500
- Etiquetas: DM Sans 500 mayúsculas 10px espaciado entre letras 0.12em

## Secciones

### 1. Navbar
- Bg blanco cálido pegajoso, `backdrop-filter: blur(10px)`
- Izquierda: DM Serif Mostrar marca denominativa "Solis Studio" con un pequeño ícono de hoja de salvia (lucide Leaf)
- Derecha: Clases · Acerca de · Precios · Contacto + botón verde salvia "Reservar una clase →"

### 2. Hero
- Vista completa, blanco cálido fondo
- Diseño dividido: contenido izquierdo, imagen cuadrada grande derecha (relación de aspecto 1/1, redondeado-2xl)
- Izquierda: DM Sans 500 etiqueta salvia de 10px en mayúsculas "— Yoga & Mindfulness Studio"
- DM Serif Display `clamp(48px, 7vw, 96px)` titular: "Buscar Tu\nQuietud"
- Palabra con acento en cursiva en verde salvia
- DM Sans 300 sub: "Clases de yoga en el estudio y en línea para todos los niveles, en el corazón de Bristol"
- Dos CTA: "Explore clases →" (lleno de salvia) + "Primera clase gratis" (fantasma sage)
- Debajo de CTA: 3 chips de confianza en una superficie cálida: "200+ miembros · Est. 2019 · 4.9★ en Google"

{/* Resumen de imagen: mujer en pose de yoga, estudio con luz natural, pisos de madera, plantas, tonos cálidos y pacíficos */}

### 3. Tipos de clases Strip
- Tira de superficie cálida de ancho completo
- 4 chips de tipo clase con íconos de lucidez: Hatha · Vinyasa Flow · Yin · Meditación
- Etiquetas DM Sans 500, ícono de salvia, cada chip separado por un borde delgado
- Deslizamiento desde la izquierda en desplazamiento, escalonado 0.08s

### 4. Programar Teaser
- "Clases de esta semana" en DM Serif Display con regla de subrayado sabio (escalaX 0→1)
- 5 filas de clases como elementos de lista horizontal con `border-bottom: 1px solid hsl(var(--border))`
- Cada fila: día + hora (DM Sans 500 izquierda) · nombre de la clase en DM Serif Display (centro) · instructor +lugares a la izquierda (DM Sans 300 a la derecha) · "Libro →" enlace sage
- "Ver horario completo →" botón sage descrito a continuación

### 5. Instructores
- "Conozca a los profesores" en DM Serif Display
- 3 tarjetas de instructor: imagen vertical (cuadrada, rounded-xl), nombre en DM Serif Display, especialidad de estilo en sage DM Sans 500 mayúsculas, breve biografía DM Sans 300
- Desplazamiento: brillo de sage `box-shadow: 0 0 24px hsl(145 22% 52% / 0.15)`

{/* Imagen breve: instructora de yoga femenina, expresión tranquila y segura, estudio con luz natural, plantas en el fondo */}
{/* Imagen breve: yoga masculino instructor, pose de meditación sentada, luz natural, tonos cálidos */}
{/* Imagen breve: instructora en pose de guerrera, estudio con pisos de madera, luz natural brillante */}

### 6. Studio Gallery
: franja de galería de ancho completo: 4 imágenes, igual altura 320 px, sin espacios, ligera escala hover
: desvanecimiento escalonado en el desplazamiento

{/* Resumen de imagen: interior luminoso del estudio de yoga, pisos de madera, ventanas grandes, plantas, luz de la mañana */}
{/* Resumen de imagen: clase de yoga grupal, instructor ajustando al estudiante, luz cálida, sensación de comunidad */}
{/* Resumen de imagen: detalle del vestuario del estudio, toallas calientes, velas, estética pacífica */}
{/* Resumen de imagen: clase de yoga al aire libre, luz de la mañana, entorno verde, grupo de estudiantes */}

### 7. Precio de membresía
- "Únete al estudio" en pantalla DM Serif con regla de salvia
- 3 tarjetas: sin cita previa (clase única £ 18) · Mensual (clases ilimitadas £89/mes) · Anual (ilimitado + talleres £799/año)
- Cada tarjeta: DM Serif Nombre para mostrar, características DM Sans 300 con lucide Check in sage, etiqueta de precio en DM Serif Display grande
- Tarjeta "mensual" intermedia: borde salvia + insignia "Más popular"
- Pase el cursor sobre: suave brillo salvia

### 8. Testimonios
- Sección de superficie cálida
- 3 tarjetas: DM Serif cita en cursiva, nombre de miembro + tipo de membresía en DM Sans 10px silenciado
- Fila de 5 estrellas en salvia

### 9. CTA Banner
- Fondo verde salvia de ancho completo `#6b9e7a`
- DM Serif Display cursiva blanca: "Su primera clase es gratis"
- DM Sans 300 sub blanco: "No se necesita experiencia— solo tráete"
- "Reclama tu clase gratuita →" botón de texto blanco bg oscuro
- "Sin compromiso · Cancelar en cualquier momento" en DM Sans 10px blanco 70% debajo

### 10. Pie de página
- Fondo cálido casi negro
- Izquierda: marca denominativa salvia + icono de hoja lucide
- Centro: enlaces de navegación DM Sans 300
- Derecha: Instagram · Iconos de Facebook
- "© 2026 Solis Studio · Bristol, Reino Unido · Clases en línea en todo el mundo"
- Borde superior fino salvia

## Animaciones
- Imagen de héroe: animación flotante suave `y: 0→-6→0`, bucle de 6s
- Filas de programación: desvanecimiento escalonado al desplazarse
- Reglas de Sage: escalaX 0→1, 0.5s
- Galería: desvanecimiento escalonado activado scroll
- All hover: 0.2s facilidad

## Responsive
- Móvil: héroe apilado (imagen sobre el contenido), programación de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "Solis Studio"
- Lema: "Yoga & Mindfulness · Bristol"
- Héroe: "Find Your Stillness" / "Clases de yoga en estudio y en línea para todos los niveles, en el corazón de Bristol"
- Horario: Lunes 07:00 Hatha — Sarah · Martes 18:30 Vinyasa Flow — James · Miércoles 12:00 Yin — Elena · Jueves 19:00 Meditación — Sarah · Sábado 09:00 Flujo de fin de semana — James
- Precio: Sin cita previa £18 · Mensual ilimitado £89/mes · Anual £799/año
- Testimonio: "Solis cambió completamente mi relación con mi cuerpo y mi mente. He estado viniendo durante dos años y todavía siento que es el mejor momento de mi semana". — Laura M., miembro desde 2024
- CTA: "Tu primera clase es gratis" / "No se necesita experiencia; solo tráelo tú mismo"
- Pie de página: "© 2026 Solis Studio · 12 Queen's Road, Bristol BS8 · Clases en línea disponibles en todo el mundo"