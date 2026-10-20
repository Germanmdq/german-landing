# Solicitud de sitio web de chef personal/catering
# websiteprompts.ai

Cree un sofisticado sitio web de chef personal y catering privado llamado "Chef Elise Laurent" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 38 30% 96%;         /* warm ivory #faf4e8 */
  --foreground: 340 15% 15%;        /* warm near-black */
  --primary: 340 58% 28%;           /* deep burgundy #6d1f35 */
  --primary-foreground: 38 30% 96%;
  --primary-light: 340 30% 92%;     /* blush tint for chips */
  --surface: 38 25% 91%;
  --muted-foreground: 340 8% 52%;
  --border: 38 18% 82%;
  --gold: 42 60% 52%;               /* warm gold #c9a030 — for prices/labels */
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500&display=swap`
- Titulares: Playfair Display 600–700: cursiva para realzar frases
- Cuerpo: Inter 300–500
- Precios/etiquetas: Inter 500, color dorado

## Secciones

### 1. Barra de navegación
- Fondo marfil pegajoso con desenfoque
- Izquierda: marca denominativa en cursiva Playfair "Chef Elise Laurent" en burdeos
- Derecha: Menús · Eventos · Acerca de · Contacto + botón burdeos "Consultar →"

### 2. Hero
- Pantalla completa, fondo marfil
- Dividido: contenido izquierdo, imagen principal alta derecha (relación de aspecto 3/4, redondeado-2xl)
- Izquierda:
 - Etiqueta silenciada de 10 píxeles en mayúsculas de Inter 500: "Private Chef & Catering · Londres"
 - Playfair Display 700 `clamp(48px, 7vw, 96px)`: "Extraordinario\ncena,\nen tu\nhogar"
 - Playfair con acento en cursiva color burdeos en "Extraordinario"
 - Inter 300 sub: "Menús personalizados elaborados para cenas íntimas, celebraciones y eventos corporativos"
 - Dos CTA: "Planifique su evento →" (lleno de color burdeos) + "Ver menús" (burdeos fantasma)
 - Abajo: 3 fichas de confianza: "Formación Michelin · 10+ años · 4,9★ en Tagvenue"

{/* Resumen de imagen: plato de alta cocina elegantemente plateado, superficie oscura y cambiante, luz cálida, fotografía artística de comida, adornado con microvegetales */}

### 3. Menú exclusivo Teaser
- "Menús exclusivos" en Playfair 700 con regla fina de color burdeos (escalaX 0→1)
- 3 tarjetas de menú seguidas, fondo de superficie marfil:
 - Degustación de temporada (7 platos, vinos combinados disponibles, desde £ 120 por persona)
 - Clásico británico (3 platos, estilo celebración dominical, desde £ 65 por persona) 
 - Mezze & Sharing (festín para compartir abundante, dietético flexible, desde £ 55 por persona) 
 - Cada tarjeta: nombre del menú de Playfair 600, descripción de Inter 300, 3 platos destacados con viñeta, doradoprecio/etiqueta pp
- Desplazamiento: borde izquierdo burdeos + elevación de marfil suave

### 4. Tipos de eventos
- "Yo cocino para" en Playfair 700
- 4 filas horizontales de ancho completo, `border-bottom: 1px solid hsl(var(--border))`
- Cada fila: tipo de evento en Playfair 600 grande a la izquierda + descripción de Inter 300 a la derecha + ícono de Lucide burdeos
- Tipos de eventos: Cenas íntimas · Celebraciones y cumpleaños · Almuerzos corporativos · Catering para bodas
- Colocar el mouse sobre: tinte de superficie marfil plantea

### 5. Acerca de / Chef
- División: texto a la izquierda, retrato a la derecha
- Insignia de chip de Borgoña: "Chef ejecutivo"
- Playfair 700: "La filosofía detrás de cada plato"
- Biografía de Inter 300: 2 párrafos — entrenado en Le Cordon Bleu Paris, que trabajó en las cocinas Michelin, ahora lleva la comida con calidad de restaurante a los hogares privados. Productos de temporada, necesidades dietéticas cubiertas con cuidado.
- Tres patatas fritas de color burdeos: "Le Cordon Bleu · Michelin-trained · Seasonal & Local"
- "Más información sobre Elise →" enlace burdeos

{/* Imagen breve: cocinera en una cocina elegante, chaqueta de chef blanca, preparando un plato, luz cálida, profesional pero personal */}

### 6. Cómo funciona
- "El proceso" en Playfair 700
- Fila horizontal de 4 pasos con un gran número de Playfair color burdeos descolorido (opacidad 0,08) detrás de cada paso:
 1. "Consulta inicial" — Cuéntame tu visión, invitado recuento y necesidades dietéticas
 2. "Diseño de menú a medida": elaboro un menú adaptado a su ocasión y preferencias
 3. "Abastecimiento y preparación": compro con proveedores locales de confianza y lo preparo el día anterior
 4. "La cena": cocino, sirvo y sirvo en su casa; usted simplemente disfruta
- Inter 300 descripciones, desvanecimiento escalonado en el desplazamiento

### 7. Testimonios
- Sección de superficie de marfil
- 3 tarjetas: cita en cursiva de Playfair, nombre del cliente + tipo de evento en Inter 10px silenciado
- Pequeña fila de 5 estrellas en oro encima de cada una quote
- Desvanecimiento escalonado en el desplazamiento

### 8. Gallery Strip
- 5 imágenes en una franja desplazable horizontal (overflow-x auto en el móvil, flex en el escritorio)
- Altura fija 300px, ancho mínimo de cada imagen 380px, cobertura de objeto, leveescala al pasar el mouse
- Sin radio de borde

{/* Resumen de imagen: entrada bellamente enchapada, cerámica elegante, fondo de pizarra oscura, luz cálida de estudio */}
{/* Resumen de imagen: mesa de cena, velas, flores, ambiente cálido e íntimo */}
{/* Resumen de imagen: manos del chef terminando un plato, detalle artístico del emplatado, primer plano */}
{/* Resumen de imagen: mesa de banquete compartida, abundancia de platos, luz cálida de velas, celebración */}
{/* Resumen de imagen: plato de postre, elegante estilo gastronómico, fondo oscuro, detalles dorados */}

### 9. CTA Banner
: color burdeos profundo de ancho completo Fondo `#6d1f35`
- Playfair 700 cursiva marfil: "Planifiquemos su velada perfecta"
- Inter 300 marfil sub: "Cada evento es personalizado; póngase en contacto para iniciar la conversación"
- "Enviar una consulta →" texto marfil bg burdeos botón
- Inter 10px ivory 60%: "Generalmente responde dentro de las 24 horas · Disponible en Londres y en los condados locales"

### 10. Pie de página
- Fondo cálido casi negro, marca denominativa Playfair en cursiva en dorado
- Enlaces de navegación · Instagram · Correo electrónico
- "© 2026 Chef Elise Laurent · Chef privado · London & Home Counties"

## Animaciones
- Imagen principal: flotador suave `y: 0→-6→0`, bucle de 7 s
- Tarjetas de menú: desvanecimiento escalonado al desplazarse (y: 20→0)
- Reglas de Borgoña: escalaX 0→1, 0.5s
- Galería: desvanecimiento escalonado en el desplazamiento

## Responsive
- Móvil: héroe apilado, menús de una sola columna, tira de galería desplazable

## Completo Copia
- Marca denominativa: "Chef Elise Laurent"
- Lema: "Chef privado y catering · Londres"
- Héroe: "Cenas extraordinarias, en su hogar" / "Menús personalizados elaborados para cenas íntimas, celebraciones y eventos corporativos"
- Menús: Degustación de temporada de £120 por persona · Británico clásico desde £65 por persona · Mezze & Sharing desde £55 por persona
- Eventos: Cenas íntimas · Celebraciones y cumpleaños · Almuerzos corporativos · Catering para bodas
- Proceso: Consulta inicial → Diseño de menú personalizado → Abastecimiento y preparación → La cena
- Testimonio: "Elise convirtió nuestra cena de aniversario en algohablaremos durante años. Siete cursos de pura magia". — Claire y David H., marzo de 2026
- CTA: "Planifiquemos su velada perfecta" / "Cada evento es personalizado; póngase en contacto".