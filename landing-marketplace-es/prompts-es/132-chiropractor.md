# Align Clinic — Aviso del sitio web de quiropráctico

## Goal
Cree un sitio web de clínica quiropráctica limpio y profesional para "Align Clinic": fondo blanco puro, estructura azul marino intenso, llamadas a la acción en azul eléctrico, titulares editoriales DM Serif Display, sensación clínica pero cálida, conversión optimizada para reservas de citas.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

## Design System

### Colors
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 42% 18%;
  --primary: 208 76% 47%;
  --primary-foreground: 0 0% 100%;
  --muted-foreground: 220 10% 55%;
  --border: 220 15% 88%;
  --accent: 208 76% 47%;
}
```

Hex referencia:
- Fondo: #ffffff
- Primer plano (azul marino): #1a2440
- Primario (azul eléctrico): #1a8cd4
- Fondo gris claro secciones: #f5f5f7
- Texto silenciado: #8a8fa8
- Borde: #dde1ea

### Tipografía
Importación de fuentes de Google:
`https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@300,400,600&display=swap`

- Visualización/Títulos: DM Serif Display 400
- Subtítulos/Botones: Plus Jakarta Sans 600
- Cuerpo: Plus Jakarta Sans 400
- Subtítulos/Etiquetas: Plus Jakarta Sans 300

## Efectos visuales

### Efecto 1: Tarjeta de disponibilidad flotante
Tarjeta de fondo blanco, parte inferior izquierda del panel de héroe. Sombra: 0 8px 32px rgba(26,36,64,0.12). Radio del borde: 12px. Borde: 0,5 px sólido hsl (var (--border)). Relleno: 16px 20px.
Contenido: blue chip "EVALUACIÓN POSTURAL GRATUITA" + Plus Jakarta 600 "Disponible esta semana; quedan 5 plazas" + Plus Jakarta 300 pequeño "Sin compromiso · 30 minutos · Clínica o vídeo"
Framer Motion: inicial={{ escala: 0,9, opacidad: 0 }}, animate={{ escala: 1, opacidad: 1 }}, transición={{ retraso: 0.5, duración: 0.55, facilidad: [0.16,1,0.3,1] }}

### Efecto 2: Números de pasos descoloridos
Detrás de cada paso del proceso: Plus Jakarta Sans 600, 72px, azul marino (#1a2440) con 5% de opacidad, posición: absoluta, arriba: 0, izquierda: 0, selección de usuario: ninguna, eventos de puntero: ninguno.

### Efecto 3: Desplazamiento de la cuadrícula del chip de condición
Eda chip de condición: borde: 1px sólido hsl(var(--border)), fondo: blanco, color: azul marino, radio del borde: 8px, relleno: 20px 16px, transición: 0,2 s de facilidad.
Hover: fondo: hsl(var(--primary))(#1a8cd4), color: blanco, color de borde: transparente, sombra de cuadro: 0 4px 16px rgba(26,140,212,0.25).

### Efecto 4: Trust Strip Scroll
Hira de desplazamiento horizontal a un ritmo moderado: 30 s lineal infinito. Íconos azul marino, texto azul marino, divisores de color gris claro.

## Desglose de componentes

### 1. Barra de navegación
: parte superior fija, fondo: rgba(255,255,255,0.96), filtro de fondo: desenfoque (12px), borde inferior: 1px sólido hsl(var(--border))
- Alto: 68px
- Izquierda: "Alinear" en DM Serif Display, 20px, azul marino + "Clínica" en Plus Jakarta 300, 20px, azul marino (un poco más claro), juntos leyendo "Align Clinic"
- Centro: Plus Jakarta 400, 14px, enlaces azul marino — Condiciones / Nuestro equipo / Precios / Libro
- Derecha: "Evaluación gratuita del libro" — fondo azul marino (#1a2440), texto blanco, Plus Jakarta 600, 13px, radio de borde: 6px, relleno: 10px 22px
- Pase el cursor sobre los enlaces de navegación: eléctrico azul, transición 0.2s

### 2. Hero
Diseño dividido, altura mínima: 100vh.

**Panel izquierdo: 48 % de ancho:**
Fondo: blanco. Relleno: 0 6% 0 8%. Pantalla: flex, flex-direction: columna, justify-content: center. Ancho máximo: 560 px.

Degradado en el borde derecho (desvanecimiento de blanco a transparente):
```css
background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.97) 75%, transparent 100%);
```
Esto desvanece el panel izquierdo en la fotografía.

- Pequeño chip de etiqueta sobre el título: fondo: rgba(26,140,212,0.1), color: #1a8cd4, Plus Jakarta 600, 11px, espacio entre letras: 0,12 em, radio del borde: 100px, relleno: 5px 14px, visualización: bloque en línea, margen inferior: 20px. Texto: "Atención quiropráctica · Clapham & Chelsea"

- Titular: "Muévete sin dolor". — DM Serif Display, clamp(42px,6vw,108px), azul marino (#1a2440), altura de línea: 1.0, margen inferior: 20px
- Movimiento del marco: inicial={{ opacidad: 0, y: 30 }}, animate={{ opacidad: 1, y: 0 }}, transición={{ duración: 0.85, facilidad: [0.16,1,0.3,1] }}

- Sub: "Atención quiropráctica basada en evidencia para el dolor de espalda, dolor de cuello, ciática y lesiones deportivas. Clínicas en Clapham y Chelsea". — Plus Jakarta 400, 16 px, silenciado (#8a8fa8), altura de línea: 1,6, margen inferior: 36 px

- CTA (flexible, espacio: 12 px):
 - "Evaluación sin libros" — azul marino bg(#1a2440), texto blanco, Plus Jakarta 600, 14 px, radio del borde: 8 px, relleno: 14 px 28 px
 - "Más información" — fondo transparente, borde: 1,5 px azul marino sólido, texto azul marino, misma fuente, mismo relleno
 - Framer Motion: retraso: 0,15 s

: tarjeta de disponibilidad flotante (ubicada debajo de las llamadas a la acción, margen superior: 32 píxeles): 
 Fondo: blanco. Radio del borde: 12px. Borde: 0,5 px sólido hsl (var (--border)). Sombra de cuadro: 0 8px 32px rgba (26,36,64,0.10). Relleno: 16px 20px. Ancho máximo: 320px.
 - Chip azul: fondo: rgba(26,140,212,0.1), color: #1a8cd4, Plus Jakarta 600, 10px, espacio entre letras: 0.12em, radio de borde: 100px, relleno: 4px 12px: "GRATIS EVALUACIÓN POSTURAL"
 - Plus Jakarta 600, 14px, azul marino, margen superior: 10px: "Disponible esta semana; quedan 5 plazas"
 - Plus Jakarta 300, 12px, silenciado, margen superior: 4px: "Sin compromiso · 30 minutos · Clínica o vídeo"
 - Movimiento del encuadre: escala 0,9→1, opacidad 0→1, retraso: 0,5s

**Panel derecho: 52 % de ancho:**
Fotografía clínica con sangrado completo, sin radio de borde.

{/* Imagen: Fotografía clínica profesional de un quiropráctico realizando un ajuste de columna en una Paciente acostado boca abajo sobre una mesa de tratamiento. Las manos del quiropráctico se colocan en la zona lumbar del paciente, aplicando una presión precisa. Cálida iluminación clínica desde arriba. La sala de tratamiento es limpia y moderna con paredes blancas. Tanto el quiropráctico como el paciente parecen tranquilos y profesionales. Disparo lateral a media altura. Estado de ánimo: experiencia clínica, confianza, cuidado, alivio. */}
<img src="" alt="Quiropráctico realizando ajuste de columna en paciente" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />

### 3. Cuadrícula de condiciones
Fondo: #f5f5f7. Relleno: 100px 6%.

**Encabezado:**
- Plus Jakarta Sans 600, 11px, azul eléctrico (#1a8cd4), espacio entre letras: 0,15 em, mayúsculas, margen inferior: 12px: "CONDICIONES NOSOTROS TREAT"
- Pantalla DM Serif, clamp(30px,4vw,52px), azul marino: "Cuidado experto para las condiciones que lo frenan".
- Margen inferior: 56px

**6 chips — Cuadrícula de 3×2, espacio: 16px:**
Ecada tarjeta con chip: blancabg, borde: 1px sólido hsl(var(--border)), radio del borde: 8px, relleno: 24px 20px, cursor: puntero.
Hover: bg: #1a8cd4, color: blanco, color del borde: transparente, sombra del cuadro: 0 4px 16px rgba(26.140.212,0,25). Transición: 0,2 s de facilidad.

Estructura del chip:
- Icono de Lucide, 22 px, azul eléctrico (se vuelve blanco al pasar el mouse): arriba
- Plus Jakarta 600, 15 px, azul marino (se vuelve blanco al pasar el mouse): nombre de condición
- Plus Jakarta 300, 13px, silenciado (se vuelve blanco/80% al pasar el mouse): breve descripción

**Las 6 condiciones:**
1. Dolor de Espalda (icono: Actividad) / "Espalda baja, espalda alta y dolor crónico"
2. Dolor de cuello (icono: Zap) / "Tensión, rigidez y dolor de cuello relacionado con los nervios"
3. Dolores de cabeza y migrañas (icono: Cerebro) / "Cefalea cervicogénica y tensional"
4. Ciática (icono: Zap) / "Dolor punzante en las piernas por compresión nerviosa"
5. Lesiones deportivas (icono: Medalla) / "Lesiones musculares, articulares y por impacto"
6. Corrección de postura (icono: AlignCenter) / "Postura del escritorio, hipercifosis y cabeza hacia adelante"

Framer Motion: chips whileInView, escalonado 0,07 s entre chips, inicial={{ opacidad: 0, y: 16 }}, animate={{ opacidad: 1, y: 0 }}, transición: facilidad de 0,45 s, ventana gráfica={{ una vez: true }}

### 4. Proceso de 3 pasos
Fondo: blanco. Relleno: 100px 6%.

**Encabezado:**
- Plus Jakarta 600, 11px, azul, espacio entre letras: 0,15em: "CÓMO FUNCIONA"
- DM Serif Display, 48px, azul marino: "Su ruta hacia la recuperación en tres pasos."
- Margen inferior: 64px

**3 pasos: cuadrícula de 3 columnas en el escritorio:**
Cada paso: posición: relativa, relleno superior: 8px.

Número de paso detrás (absoluto, superior: -8px, izquierda: 0): más Yakarta 600, 72 px, azul marino (#1a2440) con 5 % de opacidad, selección del usuario: ninguna, altura de línea: 1.

Estructura de pasos: 
- Línea horizontal azul, 40 px de ancho, 2 px de alto, margen inferior: 20 px
- Plus Jakarta 600, 18px, azul marino: nombre del paso
- Plus Jakarta 400, 15px, silenciado, altura de línea: 1,6: descripción del paso
- Plus Jakarta 300, 12px, azul, margen superior: 12px: duración/nota

**Pasos:**
1. "Evaluación" (01) — "Comenzamos con unaConsulta exhaustiva y evaluación biomecánica. Escuchamos su historial, evaluamos sus movimientos e identificamos la causa raíz, no solo el síntoma". | 30–45 minutos
2. "Plan de tratamiento" (02) — "Usted recibe un plan de atención personalizado. Explicamos exactamente qué estamos tratando, cuántas sesiones recomendamos y qué esperar. Sin sorpresas." | Acordado juntos
3. "Recover & Move" (03) — "Comienza el tratamiento. La mayoría de los pacientes sienten una mejora significativa en 3 a 5 sesiones. También le brindamos estiramientos y ejercicios para respaldar su progreso entre visitas". | Soporte continuo

Framer Motion: whileInView stagger 0.15s, opacidad 0→1, y 20→0, viewport={{ once: true }}

### 5. Sección del equipo
Antecedentes: #f5f5f7- Plus Jakarta 600, 11px, azul, espacio entre letras: 0,15 em: "NUESTRO EQUIPO"
- DM Serif Display, 48px, azul marino: "Tres médicos experimentados. Un objetivo compartido."
- Margen inferior: 56px

**3 tarjetas de equipo: cuadrícula de 3 columnas, espacio: 24px:**
Ecada tarjeta: fondo blanco, radio del borde: 12px, desbordamiento: oculto, borde: 1px sólido hsl(var(--border)).

Estructura de la tarjeta:
- Parte superior: fotografía de rostro 1:1, sin radio de borde (hereda de la tarjeta)
- Relleno: 24px
- Plus Jakarta 600, 18px, azul marino: nombre
- Chip azul: fondo: rgba(26,140,212,0.1), texto azul, Plus Jakarta 600, 11 px, espacio entre letras: 0,1 em, radio del borde: 100 px, relleno: 3 px 10 px, margen superior: 6 px: especialidad
- Plus Jakarta 400, 14 px, silenciado, altura de línea: 1,6, margen superior: 12 px: bio
- Plus Jakarta 400, 14 px, azul, margen superior: 16 px, subrayado al pasar el cursor: "Reservar con [nombre] →"

**Los 3 médicos:**
1. Sarah Chen DC" — chip: "Sports & Rehabilitation"
{/* Imagen: Foto profesional de una quiropráctica de unos 30 años, apariencia del este de Asia, vestida con un uniforme clínico blanco limpio. Iluminación cálida del estudio desde la parte delantera izquierda, fondo gris claro neutro. Sonrisa cálida y segura. Recorte cuadrado, 1:1. Estado de ánimo: profesional, accesible, experto. */}
<img src="" alt="Dr. Sarah Chen, Quiropráctica especializada en lesiones deportivas"style={{ objectFit: 'cover', objectPosition: 'center', width: '100%',spectRatio: '1/1' }} />
Bio: "La Dra. Chen se especializa en rehabilitación de lesiones deportivas y ha tratado a atletas de élite. Completó su doctorado en quiropráctica en la AECC y tiene 9 años de experiencia clínica".

2. "Dr. Marcus Webb DC" — chip: "Chronic Pain & Posture"
{/* Imagen: Foto profesional de la cabeza de un quiropráctico de unos 40 años, piel clara y uniforme clínico azul marino oscuro. Iluminación cálida de estudio, fondo neutro. Expresión tranquila y segura. Recorte cuadrado, 1:1. Estado de ánimo: experimentado, digno de confianza, considerado. */}
<img src="" alt="Dr. Marcus Webb, quiropráctico especializado en dolor crónico" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%',spectRatio: '1/1' }} />
Bio: "El Dr. Webb se centra en el manejo del dolor crónico y la corrección postural. Se capacitó en el Colegio Anglo-Europeo de Quiropráctica y tiene 14 años de experiencia ayudando tanto a trabajadores de escritorio como a trabajadores manuales."

3. "Dr. Priya Patel DC" — chip: "Women's Health & Paediatrics"
{/* Imagen: Foto profesional de la cabeza de una quiropráctica de unos 30 años, con apariencia del sur de Asia, vestida con un uniforme clínico verde azulado. Iluminación de estudio cálida y luminosa, fondo neutro. Sonrisa cálida y acogedora. Recorte cuadrado, 1:1. Estado de ánimo: amable, experto, seguro. */}
<img src="" alt="Dra. Priya Patel, quiropráctica especializada en embarazo y atención pediátrica" style={{ objectFit: 'cover', objectPosition: 'center', width: '100%',spectRatio: '1/1' }} />
Bio: "El Dr. Patel se especializa en dolor de espalda relacionado con el embarazo y atención quiropráctica pediátrica. Está certificada en Webster Technique y ha trabajado con cientos de mujeres embarazadas en Clapham y Chelsea."

Framer Motion: escalonar 0,12 s entre tarjetas, opacidad 0→1, y 24→0, viewport={{ once: true }}

### 6. Insurance & Trust Strip
Antecedentes: #1a2440 (azul marino). Relleno: 32px 6%. Desbordamiento: oculto.

Hmarquesina de desplazamiento horizontal: 30 s lineal infinito:
"Reconocido por BUPA · AXA PPP · Cigna · Vitality Health · 5★ Reseñas de Google · Est. 2009 · Registrado en GCC · Más de 2400Pacientes tratados ·"
Plus Jakarta 400, 13px, blanco 80% de opacidad. Separador "·" en azul eléctrico (#1a8cd4).

### 7. Precio
Fondo: blanco. Relleno: 100px 6%. Ancho máximo: 760px, margen: auto.

**Encabezado:**
- Plus Jakarta 600, 11px, azul, espacio entre letras: 0,15em: "PRECIO"
- DM Serif Display, 48px, azul marino: "Tarifas transparentes. Sin costos ocultos."
- Margen inferior: 48px

**Filas de precios: 3 filas:**
Each: flex, justify-content: space-between, align-items: center. Relleno: 24px 0. Borde superior: 1px sólido hsl(var(--border)).

Izquierda: Plus Jakarta 600, 17px, azul marino: nombre del servicio Abajo: Plus Jakarta 400, 14px, silenciado: descripción.
Derecha: Plus Jakarta 600, 20px, azul marino: precio.

1. "Evaluación inicial" / "Primera cita de 90 minutos que incluye evaluación completa y primer tratamiento." / £75
2. "Tratamiento de seguimiento" / "Sesión de tratamiento de 45 minutos". / £55
3 "Paquete de 6 sesiones" / "Incluye una evaluación inicial y cinco tratamientos de seguimiento. Ahorre £50. — contáctanos para confirmar la cobertura antes de reservar."

### 8. Testimonios
Fondo: #f5f5f7. Relleno: 80px 6%. Ancho máximo: 720px, margen: auto.

**2 testimonios:**
Eada: blanco bg, radio del borde: 12 px, relleno: 28 px 32 px, borde: 1 px sólido hsl(var(--border)).

- Plus Jakarta 400, 16 px, azul marino, altura de línea: 1,65, cursiva: cita
- Plus Jakarta 600, 13px, azul, margen superior: 16px: nombre y ubicación
- Clasificación de estrellas: 5 íconos de estrellas lucide, relleno: #1a8cd4, tamaño: 14px, margen inferior: 12px

Cita 1: "La primera vez en tres años me desperté sin dolor de espalda. El Dr. Webb encontró la causa en la primera sesión; nadie más lo había hecho. — Mark S., Clapham" ★★★★★
Cita 2: "Llegué por ciática y apenas podía sentarme. Después de cuatro sesiones corrí 5 km el domingo pasado. La diferencia es notable. - Lisa M., Chelsea"★★★★★

Movimiento del marco: escalonamiento 0,15 s, opacidad 0→1, y 16→0, ventana gráfica={{ once: true }}

### 9. Sección CTA de la Marina
Fondo: #1a2440. Relleno: 120px 6%. Alineación de texto: center.

- DM Serif Display, clamp(30px,4.5vw,68px), blanco: "¿Listo para moverse sin dolor?"
- Plus Jakarta 400, 18px, blanco 70%, margen superior: 16px, margen inferior: 40px: "Evaluación gratuita de 30 minutos disponible esta semana. Clínicas en Clapham y Chelsea."
- Botón "Reserve su evaluación gratuita": azul eléctrico bg (#1a8cd4), texto blanco, Plus Jakarta 600, 15px, radio de borde: 8px, relleno: 16px 40px
- Botón inferior: Plus Jakarta 300, 13px, blanco 50%, margen superior: 16px: "Reserva en línea · Confirmación instantánea · No se requiere depósito"

Framer Motion: escala 0,96→1, opacidad 0→1, ventana gráfica={{ once: true }}, duración: 0,65s

### 10. Pie de página
Fondo: blanco. Borde superior: 1px sólido hsl(var(--border)). Relleno: 56px 6%.
Cuadrícula de 4 columnas:

Columna 1: "Align Clinic" DM Serif, 18px, azul marino. Plus Jakarta 300, 13 px, silenciado: "Atención quiropráctica basada en evidencia. Clapham & Chelsea". 

Columna 2: "Condiciones" - Plus Jakarta 600, 11 px, azul, encabezado con espacio entre letras. Enlaces: Plus Jakarta 400, 13px, silenciado: Dolor de espalda / Dolor de cuello / Ciática / Lesiones deportivas / Postura

Columna 3: "Visítenos" - Mismo encabezado. Además de Yakarta 400, 13 px, silenciado: "Clapham Clinic: 12 Clapham High Street, London SW4 7UT" / "Chelsea Clinic: 8 King's Road, London SW3 4ND" / "Lunes a viernes: 8 a. m. a 7 p. m. / Sábados: 9 a. m. a 3 p. m."

Columna 4: "Libro" - Mismo encabezado. Plus Jakarta 400, 13px: "hello@alignclinic.co.uk" / "+44 (0)20 7890 1234" / "Reserva en línea disponible las 24 horas, los 7 días de la semana"

Abajo: Plus Jakarta 300, 11px, silenciado 50%: "© 2025 Align Clinic Ltd. Registrado en GCC. Todos los derechos reservado."

## Animaciones

| Elemento | Animación | Duración | Retraso | Flexibilización |
|---|---|---|---|---|
| Titular de héroe | opacidad 0→1, y 30→0 | 0,85s | 0s | [0.16,1,0.3,1] |
| Sub héroe + CTA | opacidad 0→1, y 24→0 | 0,85s | 0,15s | [0.16,1,0.3,1] |
| Tarjeta flotante | escala 0,9→1, opacidad 0→1 | 0,55s | 0,5 s | [0.16,1,0.3,1]|
| Fichas de condición | opacidad 0→1, y 16→0 | 0,45s | i×0,07s | facilidad |
| Pasos del proceso | opacidad 0→1, y 20→0 | 0,6 s | i×0,15s | facilidad |
| Tarjetas de equipo | opacidad 0→1, y 24→0 | 0,6 s | i×0,12s | facilidad |
| Testimonios | opacidad 0→1, y 16→0 | 0,5 s | i×0,15s | facilidad |
| Bloque de CTA | escala 0,96→1, opacidad 0→1 | 0,65s | 0s | facilidad |
| Desplazamiento del chip | bg, color, sombra | 0,2 s | — | facilidad |
| Carpa de confianza | bucle traducirX | 30 años | — | lineal, infinito |

All whileInView: viewport={{ once: true }}

## Responsive

**Escritorio (≥1024px):**
- Hero: 48% panel izquierdo / 52% imagen derecha lado a lado
- Condiciones: cuadrícula de 3×2
- Proceso: horizontal de 3 columnas
- Equipo: cuadrícula de 3 columnas
- Pie de página: cuadrícula de 4 columnas

**Tableta (768–1023px):**
- Héroe: pilas — imagen en la parte superior (40vh), contenido a continuación
- Condiciones: cuadrícula 2×3
- Proceso: 3 columnas (más angosto)
- Equipo: pila vertical 1×3
- Pie de página: Cuadrícula 2×2

**Móvil (<768px):**
- Barra de navegación: hamburguesa, menú superpuesto oscuro
- Héroe: tarjeta apilada y flotante debajo de CTA en línea
- Condiciones: cuadrícula de 2 × 3 (relleno más pequeño)
- Proceso: lista vertical numerada
- Equipo: único columna
- Pie de página: columna única

## Copia completa

**Navegación:** Align Clinic · Condiciones · Nuestro equipo · Precios · Libro

**Héroe:**
- Etiqueta del chip: "Cuidado quiropráctico · Clapham & Chelsea"
- Titular: "Muévete sin dolor".
- Sub: "Atención quiropráctica basada en evidencia para clínicas de dolor de espalda, dolor de cuello, ciática y lesiones deportivas en Clapham y Chelsea".
- CTA 1: "Libro de evaluación gratuita"
- CTA 2: "Aprenda. Más"
- Chip de tarjeta flotante: "EVALUACIÓN POSTURAL GRATIS"
- Tarjeta flotante: "Disponible esta semana — Quedan 5 plazas"
- Sub tarjeta flotante: "Sin compromiso · 30 minutos · Clínica o vídeo"

**Etiqueta de condiciones:** "CONDICIONES NOSOTROS TRATAR"
**Lema de condiciones:** "Cuidado experto para las condiciones que lo frenan."
- Dolor de espalda / "Espalda baja, espalda superior,y dolor crónico"
- Dolor de cuello / "Tensión, rigidez y dolor de cuello relacionado con los nervios"
- Dolores de cabeza y migrañas / "Dolor de cabeza cervicogénico y tensional"
- Ciática / "Dolor punzante en las piernas por compresión nerviosa"
- Lesiones deportivas / "Músculos, articulaciones e impacto lesiones"
- Corrección de postura / "Postura en el escritorio, hipercifosis y cabeza hacia adelante"

**Etiqueta del proceso:** "CÓMO FUNCIONA"
**Lema del proceso:** "Su ruta hacia la recuperación en tres pasos".
- Evaluación: "Comenzamos con una consulta exhaustiva y una evaluación biomecánica. Escuchamos su historial, evaluamos sus movimientos e identificamos la causa raíz, no solo el síntoma". | 30–45 minutos
- Plan de tratamiento: "Usted recibe un plan de atención personalizado. Explicamos exactamente qué estamos tratando, cuántas sesiones recomendamos y qué esperar. Sin sorpresas." | Acordado juntos
- Recover & Move: "Empieza el tratamiento. La mayoría de los pacientes sienten una mejora significativa en 3 a 5 sesiones. También le brindamos estiramientos y ejercicios para respaldar su progreso entre visitas". | Soporte continuo

**Etiqueta del equipo:** "NUESTRO EQUIPO"
**Lema del equipo:** "Tres médicos experimentados. Un objetivo compartido."
- Dr. Sarah Chen DC / "Deportes y Rehabilitación" / "Dr. Chen se especializa en rehabilitación de lesiones deportivas y ha tratado a atletas de élite. Completó su Doctorado en Quiropráctica en la AECC y tiene 9 años de experiencia clínica." / "Libro con Sarah →"
- Dr. Marcus Webb DC / "Dolor crónico y postura" / "Dr. Webb se centra en el tratamiento del dolor crónico y la corrección postural. Se formó en el Colegio Anglo-Europeo de Quiropráctica y tiene 14 años de experiencia ayudando tanto a trabajadores de escritorio como a trabajadores manuales." / "Libro con Marcus →"
- Dr. Priya Patel DC / "Salud y pediatría de la mujer" / "Dr. Patel se especializa en dolor de espalda relacionado con el embarazo y atención quiropráctica pediátrica. Tiene la certificación Webster Technique y ha trabajado con cientos de mujeres embarazadas en Clapham y Chelsea." / "Reserve con Priya →"

**Trust strip:** "Reconocido por BUPA · AXA PPP · Cigna · Vitality Health · 5★ Reseñas de Google · Est. 2009 · CCGRegistrado · Más de 2,400 pacientes tratados ·"

**Etiqueta de precio:** "PRECIO"
**Lema de precio:** "Tarifas transparentes. Sin costos ocultos."
- Evaluación inicial / "Primera cita de 90 minutos que incluye evaluación completa y primer tratamiento." / £75
- Tratamiento de seguimiento / "Sesión de tratamiento de 45 minutos." / £55
- Paquete de 6 sesiones / "Incluye una evaluación inicial y cinco tratamientos de seguimiento. Ahorre £50. El Dr. Webb encontró la causa en la primera sesión; nadie más lo había hecho. — Mark S., Clapham" ★★★★★
- "Llegué por ciática y apenas podía sentarme. Después de cuatro sesiones corrí 5 km el domingo pasado. La diferencia es notable. — Lisa M., Chelsea" ★★★★★

**Sección CTA:**
- Titular: "¿Listo para moverse sin dolor?"
- Sub: "Evaluación gratuita de 30 minutos disponible esta semana. Clínicas en Clapham y Chelsea."
- Botón: "Reserve su evaluación gratuita"
- Letra pequeña: "Reserva en línea · Confirmación instantánea · No se requiere depósito"

**Pie de página:**
- Lema: "Atención quiropráctica basada en evidencia. Clapham & Chelsea."
- Clapham: "12 Clapham High Street, Londres SW4 7UT"
- Chelsea: "8 King's Road, Londres SW3 4ND"
- Horario: "Lunes a viernes: 8 a.m. a 7 p.m. / Sábados: 9 a.m. a 3 p.m."
- Correo electrónico: "hello@alignclinic.co.uk"
- Teléfono: "+44 (0)20 7890 1234"
- Nota: "Reserva en línea disponible las 24 horas, los 7 días de la semana"
- Legal: "© 2025 Align Clinic Ltd. Registrado en GCC. Todos los derechos reservados."

## Dependencias clave
```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx",
  "tailwindcss": "^3.x"
}
```