# Form Studio — Mensaje del sitio web de la agencia de marca

## Objetivo
Cree un sitio web de agencia de marca audaz y con tipografía dominante para "Form Studio": fondo blanquecino, estructura negra pura, acento rojo eléctrico usado con moderación, tipo de pantalla Space Grotesk 800 a gran escala, estética de cuadrícula modernista suiza, cero fotografías decorativas en el héroe.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

## Design System

### Colors
```css
:root {
  --background: 40 8% 96%;
  --foreground: 0 0% 4%;
  --primary: 4 76% 47%;
  --primary-foreground: 0 0% 98%;
  --muted-foreground: 0 0% 48%;
  --border: 0 0% 84%;
  --accent: 4 76% 47%;
}
```

Hex referencia:
- Fondo: #f5f4f2 (blanquecino, papel cálido)
- Primer plano: #0a0a0a (negro puro)
- Primario (rojo eléctrico): #d42a1a
- Gris apagado: #808080
- Borde: #d6d6d6

### Tipografía
Importación de fuentes de Google:
`https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300,700,800&family=Inter:wght@400&display=swap`

- Hero/Display: Space Grotesk 800
- Titulares de sección: Space Grotesk 700
- Cuerpo/descripciones: Space Grotesk 300
- Etiquetas/títulos de UI: Inter 400

## Efectos visuales

### Efecto 1: Fondo masivo Marca Texto
```css
.bg-brand-text {
  position: absolute;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 800;
  font-size: clamp(260px, 38vw, 560px);
  opacity: 0.04;
  color: hsl(var(--foreground));
  letter-spacing: -0.04em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
  overflow: visible;
}
```
Texto: "FORM" — se desborda intencionalmente hacia la izquierda y hacia la derecha más allá de la ventana gráfica.

### Efecto 2: Período de punto rojo
En el título principal "CONSTRUIMOS MARCAS QUE SIGNIFICAN ALGO". — el punto al final se reemplaza por un `<span>` con un punto rojo:
```css
.red-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #d42a1a;
  margin-left: 3px;
  vertical-align: middle;
  position: relative;
  top: -4px;
}
```
Este punto rojo es el ÚNICO elemento rojo en la sección de héroe.

### Efecto 3: Nombre del cliente Marquee
Debajo de CTA: marco continuo de 8 clientes nombres de marcadores de posición en Space Grotesk 300 monocromo (negro 40% de opacidad) separados por pequeños puntos rojos (●, 8px, #d42a1a). Desplazamiento hacia la izquierda a 40 segundos lineal infinito.
"APEX ● MERIDIAN ● VANTAGE ● STRATUM ● ORION ● VOLTA ● HELIX ● NOVA"
Duplicado para bucle sin interrupciones. Los puntos de separación rojos son los únicos otros elementos rojos en todo el sitio junto con el CTA principal.

### Efecto 4: Borde izquierdo rojo de la fila de servicio
Al pasar el cursor sobre cada fila de servicio: aparece un borde izquierdo #d42a1a sólido de 3 píxeles (inicialmente invisible/transparente). Transición: 0,15s de facilidad.Simultáneamente: y: -2px, box-shadow: 0 2px 12px rgba(0,0,0,0.08).

### Efecto 5: División al pasar el cursor sobre el estudio de caso
 Cada tarjeta de estudio de caso al pasar el mouse revela una división izquierda/derecha. La mitad izquierda muestra un estado "Antes" desaturado de color gris apagado. La mitad derecha muestra el texto negro en negrita "Después" del estado. Una línea roja vertical de 2 píxeles se desliza desde el centro hacia afuera al pasar el mouse usando la transición de ruta de clip. Transición: 0,3 s de facilidad.

## Desglose de componentes

### 1. Barra de navegación
- Posición: parte superior fija, fondo: rgba(245,244,242,0.95), filtro de fondo: desenfoque(12px)
- Altura: 60px
- Borde inferior: 1px sólido hsl(var(--border))
- Izquierda: "Formulario" en Space Grotesk 800, 16px, negro + "Estudio" en Space Grotesk 300, 16px, gris (60%) — en una línea, espacio: 6px
- Centro: Inter 400, 12px, espacio entre letras: 0,12em, mayúsculas, negro — Trabajo / Servicios / Proceso / Precios / Contacto
- Derecha: "Iniciar un proyecto" — fondo negro, texto blanco, Espacio Grotesk 700, 12px, espacio entre letras: 0,08em, radio del borde: 0, relleno: 10px 22px
- Pase el cursor sobre los enlaces de navegación: rojo eléctrico (#d42a1a). Transición: 0,15 s.

### 2. Hero
Vista completa. Antecedentes: #f5f4f2. Posición: relativa, desbordamiento: oculto.

**Sin fotografía, puramente tipográfica.**

**Texto de fondo (índice z: 0):**
"FORM" — Espacio Grotesk 800, clamp(260px,38vw,560px), opacidad: 0,04, negro, espacio entre letras: -0,04em, centrado (izquierda: 50%, arriba: 50%, traducir -50% -50%), selección de usuario: ninguno, eventos de puntero: ninguno, espacio en blanco: nowrap, desbordamiento: visible.

**Contenido (índice z: 10):**
Posición: relativa, ancho máximo: 1200px, margen: automático, relleno: 0 6%, display: flex, flex-direction: column, justify-content: center, min-height: 100vh.

- Etiqueta de ceja (Inter 400, 11px, gris #808080, espaciado entre letras: 0,16em, mayúsculas, margen inferior: 24px): "IDENTIDAD DE MARCA · ESTRATEGIA · MOVIMIENTO · WEB"

- Título: "CONSTRUIMOS MARCAS QUE SIGNIFICAN ALGO" seguido inmediatamente (sin espacios) por el punto rojo `<span class="red-dot"></span>` — Space Grotesk 800, clamp(40px,5.5vw,100px), altura de línea: 0,95, negro, espacio entre letras: -0,02 em, margen inferior: 28px.
- Movimiento del marco: inicial={{ opacidad: 0, y:40 }}, animate={{ opacidad: 1, y: 0 }}, transición={{ duración: 0.8, facilidad: [0.16,1,0.3,1] }}

- Sub (Inter 400, 16px, gris #808080, altura de línea: 1.6, ancho máximo: 520px, margin-bottom: 36px): "Estrategia. Identidad. Movimiento. Web. Todo lo que su marca necesita para competir, nada que no necesite". 
- Framer Motion: retraso: 0,15 s

- CTA (flex, espacio: 14 px, margen inferior: 48 px): 
 - "Iniciar un proyecto" — fondo negro, blanco texto, Space Grotesk 700, 13px, espacio entre letras: 0,08 em, relleno: 14px 32px, radio del borde: 0 (nítido)
 - "Ver nuestro trabajo" — transparente, borde: 1,5px negro sólido, texto negro, misma fuente, mismo relleno
 - Framer Motion: retraso: 0.25s

- Línea divisoria negra delgada de 1px (ancho completo): margen inferior: 32px

- Tira de marquesina con el nombre del cliente:
 Desbordamiento: oculto. Fuente: Space Grotesk 300, 13 px, espacio entre letras: 0,12 em, mayúsculas, negro 40 % de opacidad.
 Separador: "●" color: #d42a1a, tamaño de fuente: 8 px, relleno: 0 20 px.
 Contenido (×2 para bucle): "APEX ● MERIDIAN ● VANTAGE ● STRATUM ● ORION ● VOLTA ● HELIX ● NOVA"
 Animación: traducirX(0%) → traducirX(-50%), duración: 40 s, lineal, infinito.
 Movimiento del encuadrador: retraso: aparición gradual de 0,4 s en la carga inicial.

### 3. Servicios Sección
Fondo: blanco (#ffffff). Relleno: 120px 6%.

**Encabezado:**
- Inter 400, 11px, gris, espacio entre letras: 0,16em, mayúsculas, margen inferior: 12px: "QUÉ HACEMOS"
- Espacio Grotesk 800, clamp(32px,4.5vw,72px), negro, altura de línea: 1,0, margen inferior: 72 px: "Cuatro disciplinas. Un estudio". 

**4 filas de servicio:**
Each: posición: relativa, relleno: 36 px 0. Borde superior: 0,5 px sólido hsl(var(--border)). Pantalla: flex, justificar contenido: espacio entre, alinear elementos: inicio flexible. Cursor: puntero.

Izquierda: indicador visual del borde izquierdo (posición: absoluta, izquierda: 0, arriba: 0, abajo: 0, ancho: 3px, fondo: #d42a1a, opacidad: 0, transición: opacidad 0.15s de facilidad).
Al pasar el mouse: opacidad del borde izquierdo → 1. Fila: traducirY (-2px), sombra de cuadro: 0 2px 12px rgba (0,0,0,0.08). Transición: 0,2 s de facilidad.

Columna izquierda:
- Space Grotesk 700, clamp(22px,3vw,40px),negro: nombre del servicio
- Space Grotesk 300, 15px, gris #808080, ancho máximo: 440px, altura de línea: 1,65: descripción

Columna derecha (flex-shrink: 0, margen izquierdo: 32px):
- Inter 400, 20px, negro, espacio entre letras: -0.02em: "→"

**Los 4 servicios:**
1. "Estrategia de marca" / "Posicionamiento, mensajes y la claridad que hace que todo lo demás sea posible. Definimos quién eres, para quién eres y por qué es importante". / →
2. "Identidad visual" / "Logotipos, color, tipografía y sistemas de marca que escalan en cada punto de contacto. Trabajo que perdura, no tendencias que caducan". / →
3. "Movimiento y contenido" / "Dar vida a la marca a través de video, redes sociales y digital. Pautas de movimiento, recursos de campaña y contenido que funcione". / →
4. "Web & Digital" / "Sitios web y experiencias digitales construidas íntegramente sobre la identidad. Rápidos, accesibles y diseñados para convertir". / →

Última fila: borde inferior: 0.5px sólido hsl(var(--border)).

Framer Motion: cada fila whileInView, escalonamiento 0.1s, opacidad 0→1, x -16→0, ventana gráfica={{ once: true }}

### 4. Cuadrícula de estudios de casos
Antecedentes: #f5f4f2. Relleno: 120px 6%.

**Encabezado:**
- Inter 400, 11px, gris, espacio entre letras: 0,16em: "OBRA SELECCIONADA"
- Space Grotesk 800, clamp(32px,4.5vw,72px), negro: "Obra que hizo un diferencia."
- Margen inferior: 56px

**6 tarjetas de estudio de caso: cuadrícula de 2 × 3 (2 columnas, 3 filas), espacio: 2px:**
Ecada tarjeta: relación de aspecto: 4/3, posición: relativa, desbordamiento: oculto, fondo: hsl(var(--border)) (gris neutro). Sin radio de borde.

Contenido de la tarjeta (estado normal):
- Fondo gris (#d6d6d6/claro)
- Space Grotesk 700, 22px, negro: marca
- Inter 400, 12px, gris: industria label
- Inter 400, 11px, gris, espacio entre letras: 0,12em: "VER CASO DE ESTUDIO →"

Al pasar el mouse — Revelado dividido:
- Mitad izquierda: posición: absoluta, izquierda: 0, arriba: 0, ancho: 50%, alto: 100%, fondo: #d6d6d6, contiene etiqueta "Antes" en Space Grotesk 300, 11px, gris: "ANTES"
- Mitad derecha: posición: absoluta, derecha: 0, arriba: 0, ancho: 50%, alto: 100%,fondo: #0a0a0a, contiene el nombre de la marca en Space Grotesk 800, 20px, blanco
- Línea divisoria roja: posición: absoluta, izquierda: 50%, arriba: 0, abajo: 0, ancho: 2px, fondo: #d42a1a, origen de transformación: centro. Al pasar el mouse: escalaY 0→1, transición: 0,3 s de facilidad.
: la revelación dividida utiliza un enfoque de superposición de ruta de clip o índice z.

**Las 6 marcas:**
1. "Apex" / "Materiales sustentables" / Fila 1 Col 1
2. "Meridian" / "Arquitectura y propiedad" / Fila 1 Col 2
3. "Vantage" / "Servicios financieros" / Fila 2 Col 1
4. "Estrato" / "Moda y confección" / Fila 2 Col 2
5. "Orion" / "Tecnología" / Fila 3 Col 1
6. "Volta" / "Vehículos eléctricos" / Fila 3 Col 2

Framer Motion: las tarjetas aparecen gradualmente en el desplazamiento, se tambalean 0,08 s, viewport={{ once: true }}

### 5. Sección de proceso
Fondo: blanco. Relleno: 120px 6%.

**Encabezado:**
- Inter 400, 11px, gris, espacio entre letras: 0,16em: "NUESTRO PROCESO"
- Space Grotesk 800, clamp(28px,4vw,62px), negro, margen inferior: 80px: "Cómo construimos marcas que perduran". 

**4 pasos: horizontal en escritorio, vertical en dispositivos móviles:**
Diseño: fila flexible, espacio: 0, cada paso: flexible: 1.

Entre pasos: un conector de punto rojo (●, #d42a1a, 10 px, centrado verticalmente entre el número de paso y el siguiente paso).

Ecada paso: posición: relativa.
- Marcador de paso de punto rojo: ancho: 12px, alto: 12px, radio del borde: 50%, fondo: #d42a1a, margen inferior: 20px
- Space Grotesk 700, 18px, negro: número de paso + nombre (por ejemplo, "01 Discovery")
- Space Grotesk 300, 14px, gris, altura de línea: 1,65, ancho máximo: 220px: descripción
- Inter 400, 12px, gris, margen superior: 12px: timeframe

Hconexión horizontal entre pasos: a La línea gris de 1 px conecta los puntos rojos en la parte superior de todos los pasos.

**Los 4 pasos:**
1. "01 Discovery" / "Dos semanas entendiendo su mercado, sus competidores y lo que realmente está construyendo. Entrevistas con las partes interesadas, auditoría de marca, análisis competitivo". / "Aprox. 2 semanas"
2. "02 Estrategia" / "Un resumen de marca completo: posición, personalidad, voz, audiencia y la idea únicaeso te hace diferente." / "Aprox. 1 semana"
3. "03 Diseño" / "Identidad diseñada en todos los puntos de contacto. Sistema de logotipo, color, tipografía, dirección de arte de la fotografía y el lenguaje visual completo." / "Aprox. 3–4 semanas"
4. "04 Lanzamiento" / "Transferencia completa: archivos editables, documento de pautas de marca, ejemplos de uso y retención de soporte continuo opcional." / "1 semana + en curso"

Framer Motion: los pasos se animan de izquierda a derecha, escalonamiento 0,15 s, opacidad 0→1, y 20→0.

### 6. Sección de precios
Fondo: #0a0a0a (negro puro: 100px 6%.

**Encabezado:**
- Inter 400, 11px, blanco 50%, espaciado entre letras: 0,16em: "INVERSIÓN"
- Space Grotesk 800, clamp(30px,4vw,64px), blanco, margen inferior: 64px: "Precios sencillos".

**3 niveles de precios: cuadrícula de 3 columnas, espacio: 1px (líneas de cuadrícula como espacios):**
Each: fondo: #141414, relleno: 48px 36px Sin radio de borde.

Estructura de niveles:
- Space Grotesk 300, 12px, gris, espacio entre letras: 0,16 em, mayúsculas: nivel. nombre
- Space Grotesk 800, clamp(28px,3.5vw,56px), blanco, altura de línea: 1.0: precio
- Divisor: 1px sólido #333, margen: 24px 0
- Space Grotesk 300, 14px, gris, altura de línea: 1.65: lo que se incluye (como párrafo, no como lista de viñetas) 
- CTA: Space Grotesk 700, 13 px, espacio entre letras: 0,1 em, margen superior: 32 px

Nivel recomendado: borde: 1 px sólido #d42a1a (borde rojo Insignia: "MOST"). POPULAR" en Inter 400, 10px, rojo, espacio entre letras: 0,15em, posición: absoluta, arriba: -12px, izquierda: 50%, traducirX(-50%), fondo: #0a0a0a, relleno: 0 8px.

**Los 3 niveles:**
1. "Brand Starter" / "£4,800" / "Logotipo y marca denominativa, paleta de colores de la marca, selección de tipografía y un PDF de pautas de marca de 12 páginas. Ideal para nuevos negocios que se lanzan limpiamente." / "Comience aquí →" (Inter 400, 13px, gris)
2. "Paquete Studio" / "£9,600" / "Todo en Starter, además de pautas de diseño en movimiento, un diseño de sitio web de 5 páginas, plantillas para redes sociales y un resumen de dirección de arte fotográfico. Nuestro compromiso más popular." / Insignia "Más popular" + borde rojo / "Comenzar la conversación →" (EspacioGrotesk 700, blanco)
3. "Asociación completa" / "A medida" / "Estrategia de marca completa, identidad, movimiento, creación web, creación continua de activos y un anticipo mensual dedicado. Creado para empresas en puntos de inflexión". / "Hablemos →" (Inter 400, 13px, gris)

Framer Motion: las tarjetas escalan 0,96→1 en whileInView, escalonan 0,12s, ventana gráfica={{ once: true }}.

### 7. Sección de CTA roja
Ancho completo. Fondo: #d42a1a (rojo eléctrico). Relleno: 120px 6%. Alineación de texto: centro.

- Space Grotesk 800, clamp(40px,6vw,108px), blanco, altura de línea: 0,95, espacio entre letras: -0,02em: "VAMOS A CONSTRUIR ALGO"
- Margen inferior: 44px
- "Iniciar un proyecto →" — fondo blanco, texto negro, Space Grotesk 700, 15 px, espacio entre letras: 0,08 em, relleno: 18 px 48 px, radio del borde: 0
- Abajo: Inter 400, 13 px, blanco 70 %, margen superior: 20 px: "Tiempo de respuesta promedio: 4 horas"

Movimiento del marco: y 24→0, opacidad 0→1 en whileInView.

### 8. Pie de página
Fondo: #0a0a0a. Relleno: 64px 6%.
Cuadrícula de 4 columnas:

Columna 1: "Form Studio" Espacio Grotesk 800, 16px, blanco. Space Grotesk 300, 13px, gris: "Brand Identity Studio · Londres". Pequeño punto rojo en línea después de "Studio". Íconos sociales (lucide: Instagram, Twitter) en gris, desplazamiento: blanco.

Columna 2: "Trabajo" — Inter 400, 11px, gris, encabezado con espacio entre letras. Enlaces: Space Grotesk 300, 13px, gris 70%: Estrategia de marca / Identidad visual / Movimiento y contenido / Web y digital

Columna 3: "Estudio" - mismo encabezado. Space Grotesk 300, 13px, gris 70%: "hello@formstudio.co" / "+44 (0)20 7000 0001" / "4 Shoreditch High Street, Londres E1 6PQ"

Columna 4: "Trabaja con nosotros" — lo mismo. Space Grotesk 300, 13px: "Reservando actualmente: Q3 2025" / "studio@formstudio.co"

Abajo: Inter 400, 11px, gris 40%: "© 2025 Form Studio Ltd. Todos los derechos reservados". + pequeño punto rojo.

## Animaciones

| Elemento | Animación | Duración | Retraso | Flexibilización |
|---|---|---|---|---|
| Titular de héroe | opacidad 0→1, y 40→0 | 0,8 s | 0s | [0.16,1,0.3,1] |
| Sub héroe | opacidad 0→1, y 30→0 | 0,8 s | 0,15s | [0.16,1,0.3,1] |
| CTA de héroe | opacidad0→1, y 24→0 | 0,8 s | 0,25 s | [0.16,1,0.3,1] |
| Fundido de marquesina | opacidad 0→1 | 0,6 s | 0,4 s | facilidad |
| Filas de servicio | opacidad 0→1, x -16→0 | 0,5 s | i×0,1s | facilidad |
| Tarjetas de estudio de caso | opacidad 0→1, escala 0,97→1 | 0,5 s | i×0,08s | facilidad |
| Pasos del proceso | opacidad 0→1, y 20→0 | 0,6 s | i×0,15s | facilidad |
| Niveles de precios | escala 0,96→1, opacidad 0→1 | 0,6 s | i×0,12s | facilidad |
| Sección CTA | opacidad 0→1, y 24→0 | 0,7s | 0s | facilidad |
| Colocar el cursor sobre la fila de servicios | y 0→-2 + borde rojo | 0,2 s | — | facilidad |
| Desplazamiento de marquesina | bucle traducirX | 40 años | — | lineal, infinito |
| Revelación de división de casos | clip-path / línea roja | 0,3 s | — | facilidad |

## Responsive

**Escritorio (≥1024px):**
- Hero: ventana gráfica completa, texto centrado, desbordamientos de "FORMULARIO"
- Servicios: filas de ancho completo
- Estudios de casos: 2 columnas grid
- Proceso: 4 columnas horizontales con línea de conexión
- Precio: 3 columnas grid
- Pie de página: 4 columnas grid

**Tableta (768–1023px):**
- Estudios de casos: 2 columnas (3 filas iguales)
- Proceso: cuadrícula 2×2 (pasos 1-2 / 3-4)
- Precio: pila vertical 1×3
- Pie de página: cuadrícula 2×2

**Móvil (<768px):**
- Barra de navegación: hamburguesa, superposición negra en pantalla completa con enlaces blancos de Space Grotesk 800
- Fondo Hero "FORM": abrazadera a 120px como máximo, opacidad reducida a 0.025
- Estudios de caso: pila de 1 columna
- Proceso: lista vertical numerada, puntos rojos como columna izquierda marcadores
- Precio: pila de 1 columna
- Marquesina: igual (funciona en todos los tamaños)
- Pie de página: una sola columna

## Copia completa

**Navegación:** Formulario · Trabajo · Servicios · Proceso · Precios · Contacto · Iniciar un Proyecto

**Héroe:**
- Ceja: "IDENTIDAD DE MARCA · ESTRATEGIA · MOVIMIENTO · WEB"
- Titular: "Construimos marcas que significan algo" [+ punto rojo]
- Sub: "Estrategia. Identidad. Movimiento. Web. Todo lo que su marca necesita para competir, nada. no."
- CTA 1: "Iniciar un proyecto"
- CTA 2: "Ver nuestro trabajo"
- Marquesina: "APEX ● MERIDIAN ● VANTAGE ● STRATUM ●ORION ● VOLTA ● HELIX ● NOVA"

**Servicios:** "QUÉ HACEMOS" / "Cuatro disciplinas. Un estudio."
- Estrategia de marca: "Posicionamiento, mensajería y la claridad que hace que todo lo demás sea posible. Definimos quién eres, para quién eres y por qué es importante". 
- Identidad visual: "Logotipos, colores, tipos y sistemas de marca que escalan en cada punto de contacto. Trabajo que perdura, no tendencias que caducan." 
- Motion & Content: "Dar vida a la marca a través de video, redes sociales y digital. Pautas de movimiento, recursos de campaña y contenido que funciona."
- Web & Digital: "Sitios web y experiencias digitales construidas enteramente sobre la identidad. Rápido, accesible y diseñado para convertir. indumentaria
- Orion / Tecnología
- Volta / Vehículos eléctricos

**Proceso:** "NUESTRO PROCESO" / "Cómo construimos marcas que perduran".
- 01 Descubrimiento: "Dos semanas entendiendo su mercado, sus competidores y lo que realmente está construyendo. Entrevistas a partes interesadas, auditoría de marca, análisis competitivo." / Aprox. 2 semanas
- 02 Estrategia: "Un resumen de marca completo: posición, personalidad, voz, audiencia y la idea única que te hace diferente." / Aprox. 1 semana
- 03 Diseño: "Identidad diseñada en todos los puntos de contacto. Sistema de logotipo, color, tipografía, dirección de arte fotográfico y lenguaje visual completo". / Aproximadamente 3 a 4 semanas
- 04 Lanzamiento: "Transferencia completa: archivos editables, documento de pautas de marca, ejemplos de uso y contrato de soporte continuo opcional". / 1 semana + en curso

**Precios:** "INVERSIÓN" / "Sencillo precios."
- Brand Starter: £4,800 / "Logotipo y marca denominativa, paleta de colores de la marca, selección de tipografía y un PDF de pautas de marca de 12 páginas. Ideal para nuevos negocios que se lanzan limpiamente." / "Comience aquí →"
- Paquete Studio: £9,600 / "Todo en Starter, además de pautas de diseño en movimiento, un diseño de sitio web de 5 páginas, plantillas para redes sociales yResumen de dirección de arte de fotografía. Nuestro compromiso más popular." / "Comience la conversación →"
- Asociación completa: a medida / "Estrategia de marca completa, identidad, movimiento, construcción web, creación continua de activos y un anticipo mensual dedicado. Creado para empresas en puntos de inflexión." / "Hablemos →"

**Sección CTA:** "CONSTRUYAMOS ALGO" / "Iniciar un proyecto →" / "Tiempo de respuesta promedio: 4 horas"

**Pie de página:**
- Lema: "Brand Identity Studio · Londres"
- Dirección: "4 Shoreditch High Street, Londres E1 6PQ"
- Correo electrónico: "hello@formstudio.co"
- Teléfono: "+44 (0)20 7000 0001"
- Reserva: "Actualmente reservando: Q3 2025"
- Correo electrónico de contacto: "studio@formstudio.co"
- Legal: "© 2025 Form Studio Ltd. Todos los derechos reservados."

## Dependencias clave
```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx",
  "tailwindcss": "^3.x"
}
```