# Sitio web de la clínica veterinaria Prompt
# websiteprompts.ai

Cree un sitio web cálido y moderno para una clínica veterinaria llamado "Petal & Paw Veterinary" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 40 20% 97%;           /* warm white #faf7f2 */
  --foreground: 195 22% 14%;          /* deep teal near-black */
  --primary: 185 42% 38%;             /* deep teal #2a6b73 */
  --primary-foreground: 0 0% 100%;
  --accent: 38 60% 56%;               /* warm amber #c9913a */
  --surface: 40 16% 92%;
  --muted-foreground: 195 10% 52%;
  --border: 40 14% 83%;
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
- Fondo blanco cálido y pegajoso, `backdrop-filter: blur(10px)`
- Izquierda: además de la marca denominativa Jakarta Sans 700 "Petal & Paw" + pequeño icono de corazón Lucide en verde azulado
- Derecha: Servicios · Nuestros veterinarios · Acerca de · Contacto + botón verde azulado "Reservar cita →"

### 2. Hero
- Altura de la ventana gráfica completa, fondo blanco cálido
- La fotografía del héroe con sangrado completo llena toda la ventana gráfica: `posición: inserción absoluta-0 w-h completa-objeto completo-cubierta centro-objeto`
- Superposición de respaldo de texto independiente de la composición (panel de la esquina inferior izquierda):
 `position: absolute; bottom: 0; left: 0; width: 48%; padding: 3rem 3.5rem 3.5rem;`
 `background: linear-gradient(to top right, rgba(250,247,242,0.98) 55%, transparent 100%);`
- Contenido dentro del panel posterior:
 - Plus Jakarta Sans 600 etiqueta verde azulado de 10 píxeles en mayúscula: "Veterinary Clinic · Richmond, Surrey"
 - Plus Jakarta Sans 800 `clamp(34px, 4.5vw, 62px)` en primer plano: "La salud de tu mascota\nEs nuestro todo".
 - Además, subtítulo silenciado de Jakarta Sans 300: "Cuidado compasivo y experto para perros, gatos y animales pequeños: desde chequeos de rutina hasta tratamiento especializado"
 - CTA: "Reserve una cita →" (verde azulado) + "Nuestros servicios" (fantasma verde azulado)
 - Chips de confianza: "RCVS Accredited · Línea de emergencia 24/7 · 5★ Google"

{/* Resumen de imagen: gran golden retriever feliz en una sala de consulta veterinaria cálida e iluminada por el sol, perro mirando a la cámara, ambiente de clínica veterinaria profesional, luz natural suave, cálida y acogedora */}

: desvanecimiento escalonado del héroe en la montura (solo contenido del panel, y: 25→0)

### 3. Servicios
- "Cómo ayudamos" - Plus Jakarta Sans 800
- Cuadrícula 3×2 de 6 servicios:
 - Salud yVacunas (revisiones anuales, refuerzos, certificados sanitarios)
 - Atención dental (revisiones dentales, limpiezas, extracciones)
 - Cirugía (procedimientos ortopédicos y tejidos blandos)
 - Diagnóstico (análisis de sangre internos, rayos X, ecografías)
 - Microchip (rápido, seguro, legalmente requerido)
 - Atención de emergencia (línea de emergencia las 24 horas, citas el mismo día)
- Cada tarjeta: icono de Lucide verde azulado, nombre del servicio Plus Jakarta Sans 700, descripción 300, enlace "Libro →" verde azulado
- Colocar el cursor sobre: borde verde azulado + brillo verde azulado suave

### 4. Nuestro enfoque
- Dividido: texto izquierdo, imagen derecha
- Plus Jakarta Sans 800: "Sabemos lo mucho que significan para usted"
- Plus Jakarta Sans 300: 2 párrafos: tratamos a cada mascota como si fuera nuestra. Sin citas apresuradas. Siempre explicamos lo que estamos haciendo y por qué.
- 4 puntos de control verde azulado: "Veterinarios acreditados por RCVS · Diagnóstico interno · Sin tarifas ocultas · Citas disponibles el mismo día"

{/* Resumen de imagen: veterinario examinando suavemente a un gatito pequeño, ambiente clínico cálido, cuidado y atención genuinos, luz natural */}

### 5. Nuestro Vets
- "Conoce a tus veterinarios" — Plus Jakarta Sans 800
- 3 tarjetas de veterinario: retrato (cuadrado, redondeado-xl), nombre Plus Jakarta Sans 700, chip RCVS verde azulado, además de bio
 de especialidad corta Jakarta Sans 300- Desplazamiento: verde azulado suave Glow

{/* Imagen breve: veterinaria con bata blanca, cálido retrato profesional, antecedentes de la clínica, segura y accesible */}
{/* Imagen breve: veterinario con un perro pequeño en la mesa de examen, luz natural, ambiente profesional */}
{/* Imagen breve: veterinaria profesional, sonrisa cálida, uniforme clínico */}

### 6. Qué esperar
- "Su primera visita" - Plus Jakarta Sans 800
- Proceso de 4 pasos: Reserva en línea → Llegue 5 minutos antes → Consulta completa → Plan de tratamiento
- Gran número verde azulado descolorido (opacidad 0,08) detrás de cada paso
- Plus Yakarta Sans 300 silenciado descripción por paso

### 7. Testimonios
- Sección de superficie cálida
- 3 tarjetas: fila de 5 estrellas en verde azulado, además de cita en cursiva de Jakarta Sans 300, nombre del propietario+ nombre de mascota/raza en Plus Jakarta Sans 10px silenciado
- Desvanecimiento escalonado en el desplazamiento

### 8. Emergencia y reserva CTA
- Fondo verde azulado profundo de ancho completo `#2a6b73`
- Plus Jakarta Sans 800 blanco: "¿Preocupado por su mascota? Estamos aquí". 
- Plus Jakarta Sans 300 blanco: "Reserve una cita en línea para el mismo día o llame a nuestra línea de emergencia en cualquier momento, las 24 horas del día, los 7 días de la semana"
- "Reservar cita →" botón de marfil + "Emergencia: 020 8123 4567" contorno de marfil botón
- "RCVS acreditado · Sin tarifas ocultas · Richmond, Surrey" Plus Jakarta Sans 10px marfil 70%

### 9. Pie de página
- Fondo casi negro, además de la marca denominativa Jakarta Sans 700 "Petal & Paw" en verde azulado
- Facebook · Instagram · Google Maps
- "© 2026 Petal & Paw Veterinary · 22 George Street, Richmond, Surrey TW9 · Lunes a sábado de 8:30 a. m. a 6:30 p. m. · Emergencia: 020 8123 4567"

## Animaciones
- Héroe: desvanecimiento en el monte (solo contenido del panel)
- Cuadrícula de servicio: desvanecimiento escalonado en el desplazamiento
- Tarjetas veterinarias: desvanecimiento escalonado en el desplazamiento
- Brillo verde azulado al pasar el mouse: 0.2s de facilidad

## Responsive
- Móvil: héroe apilado (foto de ancho completo, panel de texto debajo), servicios de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "Petal & Paw"
- Héroe: "La salud de tu mascota es nuestro todo". / "Atención experta y compasiva para perros, gatos y animales pequeños"
- Servicios: Vacunas · Atención Dental · Cirugía · Diagnóstico · Microchip · Emergencia
- Proceso: Reservar → Llegada → Consulta → Plan de Tratamiento
- Emergencia: 020 8123 4567 (24/7)
- Testimonio: "Nuestro perro Archie fue operado de emergencia el año pasado. La atención fue extraordinaria: todo el equipo nos mantuvo informados en todo momento. No iríamos a ningún otro lugar". — Emma R., Richmond
- CTA: "¿Preocupado por su mascota? Estamos aquí". / "Línea de emergencia 24 horas al día, 7 días a la semana"