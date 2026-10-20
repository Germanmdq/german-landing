# Sitio web de fisioterapeuta Prompt
# websiteprompts.ai

Cree un sitio web limpio y moderno para una clínica de fisioterapia y rehabilitación deportiva llamado "Motion Clinic" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 0 0% 100%;
  --foreground: 215 28% 12%;          /* deep navy near-black */
  --primary: 215 60% 32%;             /* deep navy #1a2a4a */
  --primary-foreground: 0 0% 100%;
  --accent: 210 72% 50%;              /* electric blue #2a7dd4 */
  --surface: 215 14% 96%;
  --surface-raised: 215 12% 92%;
  --muted-foreground: 215 10% 52%;
  --border: 215 14% 88%;
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
- Blanco pegajoso, borde fino azul marino en el desplazamiento
- Izquierda: Plus Jakarta Sans 700 "Motion Clinic" + pequeño ícono de actividad lucide en azul eléctrico
- Derecha: Condiciones · Servicios · Nuestros médicos · Reservar + botón azul marino "Reservar cita →"

### 2. Hero
: altura de la ventana gráfica completa, fondo blanco
: diseño dividido: 55 % de contenido a la izquierda + tarjeta de interfaz de usuario flotante, 45 % de fotografía a la derecha. "Fisioterapia y rehabilitación deportiva · Shoreditch"
 - Plus Jakarta Sans 800 `clamp(38px, 5vw, 68px)` en primer plano: "Vuelve a\nlo que amas".
 - Plus Jakarta Sans 300 sub silenciado: "Fisioterapia experta para lesiones deportivas, dolor crónico y rehabilitación posquirúrgica: citas en la misma semana disponible"
 - CTA: "Evaluación de libros →" (azul marino) + "Ver nuestros servicios" (fantasma)
 - Chips de confianza: "HCPC registrado · Miembros CSP · Citas la misma semana"
 - Tarjeta de interfaz de usuario flotante debajo de CTA: `background: white; border: 0.5px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; max-width: 320px; margin-top: 2rem`
 - Plus Jakarta Sans 600 12px azul marino: "Evaluación corporal gratuita"
 - Plus Jakarta Sans 300 13px silenciado: "Reserve una evaluación de 20 minutos y descubra qué está causando su dolor"
 - Azul "Reserve gratis →" enlace
 - Framer Motion: escala desde 0,9, aparición gradual en 0,5 s delay
- Derecha: fotografía de una sesión de fisioterapia en primer plano, `object-fit: cover; object-position: center`, rounded-2xl

{/* Imagen breve: fisioterapeuta trabajando con un atleta en una mesa de tratamiento, entorno clínico profesional,técnica práctica enfocada, ambiente limpio y brillante */}

- El héroe se tambalea y se desvanece en la montura

### 3. Condiciones
- "Lo que tratamos" — Además de Jakarta Sans 800
- 6 chips de condición en cuadrícula de 3×2:
 - Espalda y cuello Dolor · Lesiones deportivas · Rehabilitación posquirúrgica · Hombro y rodilla · Lesiones al correr · Dolor postural
- Cada chip: icono de lucide azul marino, más condición Jakarta Sans 700, más descripción de una línea silenciada de Jakarta Sans 300, enlace azul "Más información →"
- Colocar el mouse sobre: borde azul marino + azul marino suave Glow

### 4. Servicios
- "Cómo ayudamos" — Además de Jakarta Sans 800
- 3 filas con elevación flotante: 
 - Fisioterapia 1 a 1 (evaluación y tratamiento de 60 minutos, desde £ 85) 
 - Deportes Masaje (tejidos profundos y recuperación deportiva: desde £60)
 - Evaluación biomecánica (análisis completo de la marcha y el movimiento: desde £120)
- Cada uno: Plus Jakarta Sans 700 servicio grande izquierda + 300 descripción derecha + azul "→" + precio
- `border-bottom: 1px solid hsl(var(--border))`
- Coloca el cursor sobre: fondo en relieve, el nombre del servicio se vuelve azul

### 5. Por qué Motion
- "Por qué los pacientes nos eligen" - Plus Jakarta Sans 800
- Dividido: texto izquierdo, imagen derecha
- Plus Jakarta Sans 300 2 párrafos: sin espacios genéricos de 30 minutos. Cada cita es de 60 minutos con el mismo fisio. Explicamos cada diagnóstico y cada decisión.
- 4 puntos de control de la marina: "Sesiones de 60 minutos: siempre · HCPC registrado · Disponibilidad en la misma semana · Pista de rehabilitación deportiva especializada"

{/* Imagen breve: fisioterapeuta y paciente revisando la evaluación del movimiento, paciente con ropa deportiva, entorno clínico brillante */}

### 6. Nuestro Physios
- "Sus médicos" — Plus Jakarta Sans 800
- 3 tarjetas de fisio: retrato (cuadrado, redondeado-xl), nombre Plus Jakarta Sans 700, chip HCPC azul, bioespecialidad Plus Jakarta Sans 300
- Desplazamiento: azul suave Glow

{/* Imagen breve: fisioterapeuta masculino, foto de cabeza profesional, chaqueta clínica blanca, expresión accesible */}
{/* Imagen breve: fisioterapeuta femenina, entorno clínico, experiencia en rehabilitación deportiva, confianza */}
{/* Imagen breve: foto de cabeza de fisio profesional,estudio limpio, sonrisa cálida */}

### 7. Proceso
- "Su viaje de recuperación" - Plus Jakarta Sans 800
- 4 pasos: Evaluación del libro → Diagnóstico y plan → Tratamiento → Regreso al deporte
- Gran número azul marino descolorido (opacidad 0,07) detrás de cada uno paso
- Plus Jakarta Sans 300 descripción silenciada, desvanecimiento escalonado en el desplazamiento

### 8. Testimonios
- Sección de superficie
- 3 tarjetas: fila azul de 5 estrellas, Plus Jakarta Sans 300 cita en cursiva, nombre del cliente + condición en 10px silenciado
- Desvanecimiento escalonado en el desplazamiento

### 9. Reserva CTA
- Fondo azul marino de ancho completo `#1a2a4a`
- Plus Jakarta Sans 800 blanco: "Deje de controlar el dolor. Empiece a resolver It."
- Plus Jakarta Sans 300 blanco: "Citas para la misma semana disponibles: reserve en línea en menos de 60 segundos"
- "Reservar cita →" botón blanco
- "HCPC registrado · Miembros de CSP · Shoreditch, Londres" Plus Jakarta Sans 10px blanco 70%

### 10. Pie de página
- Casi negro, además de Jakarta Sans 700 "Motion Clinic" en azul eléctrico
- LinkedIn · Instagram · Google
- "© 2026 Motion Clinic · Fisioterapia y rehabilitación deportiva · 34 Curtain Road, Shoreditch EC2A · Lunes a sábado de 7 a. m. a 8 p. m. "

## Animaciones
- Héroe: desvanecimiento escalonado en la montura, escala de tarjeta UI flotante 0.9→1 a 0.5s
- Cuadrícula de condiciones: desvanecimiento escalonado en el desplazamiento
- Pasos del proceso: desvanecimiento escalonado en scroll
- Reglas de la Marina: escalaX 0→1, 0.5s

## Responsive
- Móvil: héroe apilado (foto superior, texto abajo), condiciones de una sola columna, navegación de hamburguesa

## Copia completa
- Marca denominativa: "Movimiento Clínica"
- Héroe: "Vuelve a lo que amas". / "Fisioterapia experta en lesiones deportivas, dolor crónico y rehabilitación postquirúrgica"
- Condiciones: Dolor de espalda · Lesiones deportivas · Postquirúrgico · Hombro y rodilla · Lesiones por correr · Postural
- Servicios: 1 a 1 desde £85 · Masaje deportivo desde £60 · Biomecánico desde £120
- Gratis Evaluación corporal: "Reserve una evaluación de 20 minutos: descubra qué está causando su dolor"
- Testimonio: "Tuve una lesión en la rodilla que otros tres fisioterapeutas no pudieron curar.Motion Clinic lo diagnosticó en la primera sesión y me hizo volver a correr en 6 semanas". — Tom R., corredor de maratón
- CTA: "Deje de controlar el dolor. Comience a resolverlo."