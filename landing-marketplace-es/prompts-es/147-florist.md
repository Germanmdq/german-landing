# Florist Website Prompt
# websiteprompts.ai

Cree un sitio web oscuro y editorial de floristería y estudio de flores de lujo llamado "Bloom Studio" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 145 12% 11%;          /* deep forest #1a2e1e */
  --foreground: 38 22% 93%;           /* warm ivory */
  --primary: 145 14% 30%;             /* muted forest */
  --primary-foreground: 38 22% 93%;
  --accent: 15 38% 62%;               /* dusty rose #c4917a */
  --surface: 145 10% 15%;
  --surface-raised: 145 8% 19%;
  --muted-foreground: 38 10% 60%;
  --border: 145 8% 22%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500&display=swap`
- Titulares: Cormorant Garamond 700 cursiva — monumental scale
- Cuerpo: DM Sans 300–400
- Etiquetas: DM Sans 500 mayúsculas 10px espaciado entre letras 0.14em

## Secciones

### 1. Navbar
- Sticky, `background: hsl(var(--background))`, `backdrop-filter: blur(12px)`
- Izquierda: marca denominativa Cormorant en cursiva "Bloom Studio" en rosa polvoriento
- Derecha: Arreglos · Bodas · Acerca de · Cuidado + botón "Pedir flores →" con contorno de rosa polvoriento

### 2. Hero
- Altura de la ventana gráfica completa, fondo de bosque profundo
- Diseño dividido: panel editorial izquierdo 45%, fotografía a sangre completa al 55% derecha (sin radio de borde, alineado con el borde derecho de la ventana gráfica)
- Fondo de bosque profundo del panel izquierdo, `padding: 0 4rem`:
 - DM Sans 500 Etiqueta de rosa en mayúsculas de 10 px: "London Florist · Arreglos personalizados"
 - Cormorant Garamond 700 cursiva `clamp(62px, 8vw, 115px)` marfil, altura de línea 0,92: "Flores\nEso dice\nTodo".
 - Acento de rosa polvoriento en "Todo".
 - DM Subtítulo silenciado de Sans 300: "Arreglos hechos a mano, flores de boda de temporada y entrega en Londres el mismo día, hechos a mano, nunca a partir de un catálogo"
 - CTA: "Buscar arreglos →" (relleno de rosas) + "Flores de boda" (fantasma)
 - Imagen de detalle flotante: `posición: absoluta`, recorte cuadrado de 180 px de un solo tallo, borde derecho del panel superpuesto al límite de la foto, `índice z: 10`, sin radio de borde, escala de Framer Motion desde 0,85 en la montura (retardo de 0,6 s) 
- Fotografía derecha: `object-fit: cover; object-position: center`, altura completa, sin superposición

{/* Resumen de imagen: primer plano de un ramo oscuro y exuberante: rosas color burdeos intenso, dalias negras, eucaliptos, temperamental iluminación oscura de estudio, editorial, estilo de fotografía floral de Vogue */}

: desvanecimiento escalonado del héroe en la montura: etiqueta (0 s), encabezado (0,15 s), sub (0,3 s), CTA (0,45 s) 

###3. Tipos de arreglos
- "Nuestro trabajo" — Cormorán 700 marfil cursiva con regla de subrayado de rosa (escalaX 0→1)
- 3 filas de ancho completo con elevación flotante:
 - Arreglos a medida (atados a mano, tallos de temporada, de £45)
 - Florales para eventos (eventos corporativos, cenas íntimas, instalaciones, desde £180)
 - Flores para bodas (estilismo completo desde la fiesta nupcial hasta la recepción, desde £800)
- Cada uno: Cormorant 600 cursiva nombre grande a la izquierda + DM Sans 300 descripción silenciada a la derecha + rosa "→" + precio alineado a la derecha
- `border-bottom: 1px solid hsl(var(--border))`
- Pase el cursor sobre: `background: hsl(var(--surface-raised))`, el nombre se vuelve rosa

### 4. Colección de firmas
- "Esta temporada" — Cormorant 700 italic ivory
- Cuadrícula editorial de 4 imágenes: 2 altas (proporción 3/4) + 2 anchas (proporción 4/3), sin radio de borde, espacio de 2 píxeles. hierba de la pampa, flores secas, tonos ámbar cálidos, fondo de estudio cambiante */}
{/* Resumen de imagen: arreglo de jarrón alto, hojas tropicales y anturios blancos, fotografía editorial oscura */}
{/* Resumen de imagen: arco nupcial de flores blancas y vegetación, lugar al aire libre bañado por el sol */}
{/* Resumen de imagen: primer plano de una sola flor, negro dalia, gotas de agua, editorial casi macro */}

### 5. Proceso
- "Cómo funciona" — Cormorant 700 cursiva
- 3 pasos horizontales: elija sus tallos → Lo construimos a mano → Entrega el mismo día
- Gran número de Cormorán de marfil descolorido (opacidad 0,05) detrás de cada paso
- DM Sans 300 descripción silenciada, desvanecimiento escalonado en el desplazamiento

### 6. Acerca de
- "The Studio" — Cormorant 700 cursiva
- Dividir: imagen derecha, izquierda text
- Cormorant 300 cita en cursiva: "Cada arreglo se hace el día que lo solicita. Sin almacén. Sin producción por lotes. Solo flores, cortadas frescas".
- DM Sans 300 silenciado bio de 2 párrafos
- Chips de rosas: "Londres · Est. 2018 · Sostenible Sourcing"

{/* Imagen breve: florista trabajando, manos arreglando tallos sobre una mesa de madera desgastada, luz cálida desde la ventana,fotografía editorial de estilo de vida */}

### 7. Bodas
- "Wedding Florals" — Cormorant 700 cursiva
- Sección de superficie oscura de ancho completo
- Cormorant 300 cursiva: "Desde ramos de flores hasta el estilo completo del lugar: trabajamos con usted desde la primera consulta hasta la última pétalo."
- 3 chips de imágenes flotantes seguidos (ceremonia / recepción / fiesta nupcial)
- "Inicie su consulta de boda →" botón rosa

### 8. Testimonios
- 3 tarjetas: cita de marfil en cursiva de cormorán, nombre del cliente + ocasión en DM Sans 10px silenciado, Fila de 5 estrellas en rosa
- Desvanecimiento escalonado en desplazamiento

### 9. Entrega CTA
- Fondo rosa polvoriento de ancho completo `#c4917a`
- Cormorant 700 cursiva bosque oscuro: "Londres el mismo día Entrega"
- DM Sans 300 dark: "Haga su pedido antes de las 11 a. m. para entrega el mismo día en el centro y el Gran Londres, o elija su fecha al finalizar la compra"
- "Haga su pedido ahora →" botón del bosque
- "Entrega gratuita a partir de £80 · Embalaje reciclable · Fuentes sostenibles" DM Sans 10px dark 70%

### 10. Pie de página
- Fondo de bosque profundo, marca denominativa Cormorant en cursiva en rosa
- Instagram · Pinterest · Google
- "© 2026 Bloom Studio · Diseño floral · Londres EC1 · Entrega el mismo día disponible"

## Animaciones
- Héroe: desvanecimiento escalonado en la montura, escala de imagen de detalle flotante 0.85→1 a 0.6s
- Filas de disposición: elevación del cursor + transición de rosa 0.2s
- Cuadrícula: desvanecimiento escalonado en el desplazamiento
- Reglas de rosa: escalaX 0→1, 0.5s

## Responsive
- Móvil: héroe apilado (foto superior, texto abajo), cuadrícula de una sola columna, navegación de hamburguesa

## Copia completa
- Marca denominativa: "Bloom Studio"
- Héroe: "Flores que lo dicen todo". / "Arreglos hechos a mano, flores de boda de temporada y entrega el mismo día en Londres"
- Tipos: A medida desde £45 · Evento desde £180 · Boda desde £800
- Proceso: Elegir → Construir a mano → Entrega el mismo día
- Testimonio: "Pedí un ramo a las 9 a. m. y llegó a las 2 p. m.. El arreglo no se parecía en nada a nada". encontrarías en un supermercado, realmente hermoso". — Alicia K.,Islington
- CTA: "Entrega el mismo día en Londres" / "Pedido antes de las 11 a. m."