# Sitio web de guardería/guardería Prompt
# websiteprompts.ai

Cree un sitio web cálido y premium de guardería y guardería llamado "Sunbeam Nursery" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 42 22% 97%;           /* warm white #faf8f2 */
  --foreground: 185 22% 14%;          /* deep teal near-black */
  --primary: 185 38% 35%;             /* deep teal #2a6b73 */
  --primary-foreground: 0 0% 100%;
  --accent: 48 72% 65%;               /* warm yellow #f0d060 */
  --accent-warm: 18 55% 65%;          /* warm coral #d4805a */
  --surface: 42 18% 92%;
  --muted-foreground: 185 10% 52%;
  --border: 42 14% 84%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap`
- Titulares: Nunito 700–800: redondeado, cálido, pero strong
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas, 10 píxeles, espacio entre letras 0,10 em

## Secciones

### 1. Navbar
- Blanco cálido pegajoso, `backdrop-filter: blur(10px)`
- Izquierda: Nunito 800 "Sunbeam" + ícono pequeño de Lucide Sun en amarillo cálido
- Derecha: Edades y etapas · Día en la vida · Nuestro equipo · Visita + botón verde azulado "Reservar una visita →"

### 2. Hero
- Vista completa altura, fondo blanco cálido
- La fotografía con sangrado completo ocupa el 58% derecho de la ventana gráfica: `position: absolute; right: 0; top: 0; width: 58%; height: 100%; object-fit: cover; object-position: center left`
- Panel de contenido izquierdo: `position: absolute; left: 0; top: 0; width: 50%; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0 5vw`
 `background: linear-gradient(to right, rgba(250,248,242,1) 0%, rgba(250,248,242,0.95) 80%, transparent 100%)`
- Panel interior de contenido:
 - Inter Etiqueta verde azulado de 500 mayúsculas y 10 píxeles: "Guardería y preescolar · Chiswick, Londres"
 - Nunito 800 `clamp(38px, 5vw, 65px)` en primer plano, altura de línea 1,05: "Donde cada\ndía se siente como\una aventura".
 - Acento en amarillo cálido: pequeño `3px sólido #f0d060` borde izquierdo en el título, `padding-left: 1rem`
 - Inter 300 silenciado sub: "Cuidado de niños a tiempo completo y parcial para niños de 6 semanas a 5 años - Ofsted Excelente, cálido y genuinamente divertido"
 - CTA: "Reserve una visita →" (verde azulado) + "Más información sobre nuestro enfoque" (fantasma)
 - Fichas de confianza: "Ofsted Sobresaliente · Edades de 6 semanas a 5 años · Se aceptan fondos para guardería"

{/* Resumen de la imagen: niño pequeño pintando en un aula luminosa de la guardería, luz natural cálida, ambiente colorido pero no abarrotado, feliz y centrado en el niño, fotografía editorial genuina no disponible */}

- Desvanecimiento escalonado en el soporte (panel) content)

### 3. Grupos de edad
- "Adaptado a cada etapa" — Nunito 800
- 3 tarjetas, horizontales: Bebés (6 semanas–18 meses) · Niños pequeños (18 meses–3 años) · Preescolar (3–5 años)
-Cada tarjeta: icono grande de grupo de edad verde azulado, nombre de Nunito 700, descripción de Inter 300, fondo de superficie cálida, enlace verde azulado "Ver plan de estudios →"
- Framer Motion desvanecimiento escalonado en el desplazamiento, escala 0,95→1

### 4. Un día en Sunbeam
- "Cómo es un día" — Nunito 800
- Línea de tiempo horizontal, 5 momentos clave:
 - 8:00 Bienvenida de la mañana (actividad de asentamiento, juego libre)
 - 9:30 Aprendizaje estructurado (fonética, aritmética, creatividad)
 - 11:30 Juego al aire libre (jardín, naturaleza, movimiento)
 - 12:30 Almuerzo (recién cocinado en el lugar, siempre se atienden los requisitos dietéticos)
 - 14:00 Descanso, historia y actividad de la tarde
- Cada uno: Nunito 700 time en verde azulado, Inter 300 silenciado descripción de la actividad

### 5. Nuestro Enfoque
- "Aprender jugando" - Nunito 800
- Dividido: texto izquierdo, imagen derecha
- Inter 300 silenciado: 2 párrafos - Plan de estudios de EYFS impartido a través del aprendizaje basado en el juego. Pequeños grupos de trabajadores clave. Se realiza un seguimiento del desarrollo de cada niño y se comparte con los padres semanalmente.
- 4 puntos de control verde azulado: "Ofsted Sobresaliente · Personal calificado de EYFS · Sistema de trabajadores clave · Actualizaciones semanales para padres"

{/* Imagen breve: maestra de guardería leyendo a un grupo pequeño de niños pequeños, aula cálida, niños comprometidos, luz natural */}

### 6. Nuestro Team
- "Conozca a los trabajadores clave de su hijo" — Nunito 800
- 3 tarjetas de miembro del equipo: retrato (cuadrado, redondeado-2xl), nombre de Nunito 700, chip de calificación verde azulado (EYFS / Nivel 3 calificado / Primeros auxilios pediátricos), biografía corta Inter 300
- Desplazamiento: amarillo suave border

{/* Imagen breve: maestra de guardería con una cálida sonrisa, aula interior, entorno seguro para los niños, profesional y accesible */}
{/* Imagen breve: trabajador de guardería leyendo con un niño, cálido y afectuoso, luz natural */}
{/* Imagen breve: foto de cabeza de trabajador clave de guardería, cálido profesional, fondo del aula */}

### 7. Tarifas y financiación
- "Tarifas y financiación" — Nunito 800
- 3 filas limpias: día completo (de 8 a. m. a 6 p. m., desde £ 82 por día) · Medio día (de 8 a. m. a 1 p. m. o de 1 p. m. a 6 p. m., desde £ 46 por sesión) · Financiamiento de guardería (de 15 a 30 horas de financiación gubernamental) aceptado)
-Nombre del nivel Nunito 700 a la izquierda, descripción de Inter 300 a la derecha, precio verde azulado alineado a la derecha
- Separadores de borde inferior
- "Compruebe su elegibilidad de financiación →" enlace verde azulado

### 8. Testimonios
- Sección de superficie cálida
- 3 tarjetas: fila verde azulado de 5 estrellas, cita en cursiva Inter 300, nombre del padre + edad del niño en Inter 10px silenciado. fondo
- Nunito 800 blanco: "Ven y compruébalo tú mismo"
- Inter 300 blanco: "Ofrecemos exhibiciones informales todas las semanas: trae a tu pequeño, haz todas las preguntas y comprueba si Sunbeam se siente bien"
- "Reserva una visita →" botón de marfil
- "Ofsted Destacado · Lugares disponibles · Chiswick, Londres" Inter 10px marfil 70%

### 10. Pie de página
- Casi negro, Nunito 800 "Sunbeam" + Icono de sol en amarillo
- Facebook · Instagram · Google
- "© 2026 Sunbeam Guardería · 18 Devonshire Road, Chiswick, Londres W4 · Lunes a viernes de 8 a.m. a 6 p.m. · Ofsted Sobresaliente"

## Animaciones
- Héroe: desvanecimiento escalonado en la montura (contenido del panel)
- Tarjetas de grupos de edad: escala escalonada 0,95→1 + desvanecimiento en scroll
- Línea de tiempo: deslizamiento escalonado desde la izquierda
- Tarjetas de equipo: desvanecimiento escalonado

## Responsive
- Móvil: héroe apilado (foto superior, panel de texto abajo), grupos de edad de una sola columna, navegación de hamburguesa

## Completo Copy
- Marca denominativa: "Sunbeam"
- Héroe: "Donde cada día se siente como una aventura". / "Cuidado de niños a tiempo completo y parcial para niños de 6 semanas a 5 años - Ofsted Outstanding"
- Edades: Bebés de 6 semanas a 18 meses · Niños pequeños de 18 a 3 años · Preescolar de 3 a 5 años
- Tarifas: Día completo desde £82 · Medio día desde £46 · Financiamiento de 15 a 30 horas Aceptado
- Testimonio: "Sunbeam ha sido un segundo hogar para nuestro hijo desde que tenía 8 meses. El personal realmente lo conoce y lo ama; podemos verlo todos los días". — Sophie & Tom R., Chiswick
- CTA: "Ven y compruébalo tú mismo" / "Exhibiciones todas las semanas"