# Prompt del sitio web de Life Coach
# websiteprompts.ai

Cree un sitio web cálido y aspiracional de coaching de vida y negocios llamado "Clarity Coaching" utilizando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 38 20% 97%;         /* warm off-white #faf8f4 */
  --foreground: 270 18% 14%;        /* deep warm near-black */
  --primary: 265 45% 42%;           /* deep plum #5a3480 */
  --primary-foreground: 0 0% 100%;
  --accent: 38 65% 60%;             /* warm gold #c9913a */
  --surface: 38 15% 91%;            /* warm linen */
  --muted-foreground: 270 8% 52%;
  --border: 38 12% 82%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500&display=swap`
- Titulares: Playfair Display 600–700 — cursiva dorada acentos
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas 10px espaciado entre letras 0.12em

## Secciones

### 1. Navbar
- Fondo blanquecino cálido y pegajoso, `backdrop-filter: blur(10px)`
- Izquierda: marca denominativa Playfair en cursiva "Claridad" en color ciruela intenso
- Derecha: Entrenamiento · Resultados · Acerca de · Podcast + botón ciruela "Reservar una llamada →"

### 2. Hero
- Vista completa, blanquecino cálido fondo
- Diseño dividido: contenido izquierdo (52%), imagen vertical grande derecha (relación de aspecto 3/4, sin radio de borde)
- Izquierda:
 - Etiqueta ciruela de 10px en mayúsculas de Inter 500: "Entrenador de vida y negocios · Certificado ICF"
 - Playfair Display 700 `clamp(44px, 6vw, 88px)`: "La vida que\nquieres está a una\ndecisión".
 - Acento en cursiva dorada en "Una decisión"
 - Inter 300 sub: "Coaching 1 a 1 para profesionales ambiciosos que ya no se conforman con la carrera, el equilibrio y la vida que realmente desean"
 - CTA: "Libro una llamada de descubrimiento →" (relleno de ciruela) + "Ver los resultados" (ciruela fantasma)
 - Fichas de confianza: "Certificado ICF · Más de 200 clientes asesorados · Destacados en Forbes"
- Retrato de héroe: sin animación, presencia estática

{/* Imagen breve: coach de vida femenina en una oficina en casa luminosa y aireada, tonos cálidos, expresión segura pero accesible, luz natural, aspiracional pero real */}

### 3. Transformation Strip
- Tira de superficie cálida de ancho completo con borde superior dorado
- 4 chips de transformación con estadística dorada en cursiva Playfair + descripción silenciada de Inter 300:
 - "Más de 200 clientes" (de 22 países, en 6 industrias)
 - "87% informa cambios importantes en la vida" (dentro de los 90 días posteriores al entrenamiento)
 - "Colaborador de Forbes" (escribiendo enmentalidad y liderazgo)
 - "Certificado ICF" (Federación Internacional de Coaching, nivel PCC)
- Deslizamiento desde la izquierda en el desplazamiento, escalonado 0.1s

### 4. Programas de entrenamiento
- "Cómo trabajamos juntos" — Playfair 700 con regla de subrayado ciruela (escalaX 0→1)
- 3 filas de ancho completo:
 - Clarity Intensive (programa 1 a 1 de 90 días, sesiones semanales, soporte ilimitado de notas de voz)
 - Career Pivot Coaching (programa enfocado de 6 semanas para la transición profesional)
 - Programa Business Founder (para emprendedores) — estrategia, mentalidad, responsabilidad)
- Cada uno: Playfair 600 nombre grande a la izquierda + Inter 300 descripción silenciada a la derecha + oro "→"
- `border-bottom: 1px solid hsl(var(--border))`
- Pasar el cursor: el fondo se eleva a la superficie en color elevado, texto dorado

### 5. Cliente Resultados
- "Lo que dicen los clientes cambió" — Playfair 700
- 3 tarjetas de resultados, fondo de superficie cálida
- Cada una: Playfair Display título de resultado de 700 excelentes (p. ej., "Dejé una carrera de 15 años. Cero arrepentimientos"), historia de cliente silenciada de 2 oraciones de Inter 300, chip de programa en excelente calidad, nombre del cliente + industria
- Número Playfair de color ciruela descolorido grande (opacidad 0,06) detrás de cada tarjeta
- Desvanecimiento escalonado en el desplazamiento

### 6. Acerca de
- División: retrato a la derecha, texto a la izquierda
- Inter 500 mayúscula 10px ciruela: "Tu Entrenador"
- Playfair 700: "Me alejé de un trabajo de seis cifras. Lo mejor que he hecho". 
- Biografía de Inter 300: 2 párrafos: Sarah Brennan, ex banquera de inversiones convertida en entrenadora certificada por la ICF. Trabajó con clientes desde ejecutivos del FTSE 100 hasta fundadores primerizos. Colaborador de Forbes. Con sede en Londres, asesorando a nivel mundial.
- Chips de ciruela: "Certificado por ICF · Colaborador de Forbes · Ex-Finanzas"
- "Descarga mi guía gratuita →" enlace de ciruela

{/* Resumen de imagen: mujer profesional segura de sí misma en un hogar moderno y luminoso, estilo cálido, estantería visible, aspiracional y real, luz de ventana natural */}

### 7. Podcast / Contenido
- "The Clarity Sessions Podcast" - Playfair 700
- Sección de superficie cálida, dividida: texto a la izquierda, arte del podcast a la derecha
- Inter 300 silenciado: "Más de 200 episodios entransiciones profesionales, mentalidad, crecimiento empresarial y vivir con intención, disponibles dondequiera que escuches"
- 3 chips de episodios horizontales (títulos de episodios recientes en Playfair en cursiva)
- Botón "Escuchar en Spotify →" + enlace de Apple Podcasts

### 8. Testimonios
- 3 tarjetas: Playfair cita en cursiva, nombre del cliente + fondo en Inter 10px silenciado, fila de 5 estrellas en dorado
- Desvanecimiento escalonado en el desplazamiento

### 9. Discovery Call CTA
- Fondo ciruela profundo de ancho completo `#5a3480`
- Playfair 700 cursiva marfil: "Encontremos tu claridad"
- Inter 300 marfil: "Una llamada de descubrimiento gratuita de 30 minutos, sin argumentos de venta, solo una conversación genuina sobre dónde estás y dónde quieres estar"
- "Reserva tu llamada gratuita →" botón de marfil
- "Sin compromiso · 100% confidencial · Disponible internacionalmente" Inter 10px marfil 70%

### 10. Pie de página
- Fondo casi negro, marca denominativa Playfair en cursiva "Clarity" en ciruela
- Instagram · LinkedIn · Iconos de Spotify
- "© 2026 Clarity Coaching · Sarah Brennan · Londres, Reino Unido · Global Online Entrenamiento"

## Animaciones
- Héroe: desvanecimiento escalonado en la montura (y: 30→0, 0.7s)
- Tira de transformación: deslizarse desde la izquierda, tambalearse al desplazarse
- Filas del programa: elevar el cursor
- Reglas de ciruela: escalaX 0→1, 0.5s
- Todo el desplazamiento: 0.2s facilidad

## Responsive
- Móvil: héroe apilado, tarjetas de una sola columna, navegación de hamburguesas

## Copia completa
- Marca denominativa: "Clarity"
- Héroe: "La vida que deseas está a una decisión de distancia". / "Coaching 1 a 1 para profesionales ambiciosos que ya no se conforman"
- Programas: Clarity Intensive · Career Pivot · Business Founder
- Estadísticas: Más de 200 clientes · 87% reportan cambios importantes en su vida · Certificado ICF · Forbes Colaborador
- Resultados: "Dejó una carrera de 15 años. Cero arrepentimientos." · "Dupliqué mis ingresos en 8 meses". · "Finalmente comencé el negocio que había estado posponiendo durante 6 años". 
- Testimonio: "Sarah me ayudó a ver que no estaba estancado, solo estaba asustado. 90 días después entregué mi despido y comencé mi negocio. Nunca miré atrás." -Claire M., ex directora de recursos humanos
- CTA: "Encontremos su claridad" / "Una llamada de descubrimiento gratuita de 30 minutos, sin argumentos de venta"