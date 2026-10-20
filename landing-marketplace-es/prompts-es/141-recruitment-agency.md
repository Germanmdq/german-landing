# Sitio web de agencia de reclutamiento Prompt
# websiteprompts.ai

Cree un sitio web de agencia de talentos y reclutamiento oscuro y audaz llamado "Apex Talent" usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react.

## Diseño Sistema

### Colores
```css
:root {
  --background: 0 0% 7%;              /* near-black #111111 */
  --foreground: 0 0% 95%;             /* white */
  --primary: 0 0% 95%;
  --primary-foreground: 0 0% 7%;
  --accent: 20 82% 50%;               /* electric orange #e85c1a */
  --surface: 0 0% 10%;
  --surface-raised: 0 0% 14%;
  --muted-foreground: 0 0% 55%;
  --border: 0 0% 18%;
}
```

### Tipografía
- Importación: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@300;400;500&display=swap`
- Titulares: Space Grotesk 700 — nítido, seguro
- Cuerpo: Inter 300–400
- Etiquetas: Inter 500 mayúsculas 10px espaciado entre letras 0,14em

## Secciones

### 1. Navbar
- Adhesivo casi negro, `backdrop-filter: blur(12px)`
- Izquierda: Space Grotesk 700 "APEX" mayúscula en naranja
- Derecha: Para empresas · Para candidatos · Sectores · Acerca de + botón naranja "Contratar talento →"

### 2. Hero
- Altura de la ventana de visualización completa, casi en negro fondo
- Fotografía con sangrado completo `posición: inserción absoluta-0 w-completo h-objeto completo-cubierta objeto-centro`
- Superposición independiente de la composición: `linear-gradient(to right, rgba(17,17,17,0.97) 0%, rgba(17,17,17,0.78) 52%, rgba(17,17,17,0.30) 100%)`
- Texto de fondo grande: "TALENTO" en Space Grotesk 700 `font-size: clamp(200px, 28vw, 420px)` en `opacidad: 0.04`, `position: absolute; left: -1%; top: 50%; transform: translateY(-50%); z-index: 1`
- Contenido `z-index: 10`, alineado a la izquierda `padding-left: 7vw`, centrado verticalmente:
 - Inter 500 mayúscula, etiqueta naranja de 10px: "Reclutamiento ejecutivo · Londres y remoto"
 - Space Grotesk 700 `clamp(48px, 7vw, 105px)` blanco, altura de línea 0,88: "ENCONTRAMOS A LAS\nPERSONAS QUE\nCAMBIAN DE EMPRESAS".
 - Acento naranja en "CAMBIAR EMPRESAS".
 - Inter 300 sub silenciado: "Búsqueda de ejecutivos y reclutamiento de nivel medio en tecnología, finanzas e industrias creativas: contratados en 21 días o trabajamos gratis"
 - CTA: "Contratar talento →" (relleno de naranja, texto oscuro) + "Encontrar un puesto" (blanco fantasma)
 - Chips de estadísticas flotantes: "Garantía de contratación de 21 días · Más de 400 ubicaciones · Tasa de retención del 94 %"

{/* Imagen breve: entorno de oficina profesional, ejecutivo confiado en un moderno edificio de cristal, espectacular iluminación cenital, fotografía comercial, estilo corporativo editorial */}

- Desvanecimiento escalonado en el soporte: etiqueta (0s), titular (0,1s), sub (0,25s), CTA (0,4s), chips (0,55s)

### 3. Qué hacemos
- "QuiénWe Place" — Space Grotesk 700 white
- 3 filas elevadas:
 - Tecnología y producto (ingenieros, gerentes de producto, CTO: desde startups hasta empresas)
 - Finanzas y operaciones (CFO, FD, analistas - Serie A según FTSE 100)
 - Creativo & Marketing (CMO, directores creativos, equipos de marca)
- Cada uno: Space Grotesk 700 sector grande izquierdo + Inter 300 descripción silenciada derecha + naranja "→"
- `border-bottom: 1px solid hsl(var(--border))`
- Desplazamiento: superficie elevada, el nombre se vuelve naranja

### 4. Estadísticas Strip
- Naranja de ancho completo `#e85c1a`, 80px
- 4 estadísticas oscuras de Space Grotesk 700: "Más de 400 ubicaciones" · "Garantía de 21 días" · "94% de retención" · "12 años"
- Conteo de movimiento del framer en desplazamiento, oscuro dividers

### 5. Proceso — Para empresas
- "Cómo contratamos para usted" — Space Grotesk 700 white
- 4 pasos: Resumen y búsqueda → Lista preseleccionada → Entrevistas → Oferta e incorporación
- Gran número naranja descolorido (opacidad 0,06) detrás de cada uno paso
- Descripción silenciada de Inter 300, desvanecimiento escalonado en el desplazamiento

### 6. Por qué Apex
- Dividir: texto izquierdo, imagen derecha
- Space Grotesk 700 blanco: "No somos un servicio de reenvío de CV"
- Inter 300 silenciado: 2 párrafos: un consultor senior habla con cada candidato, no un investigador junior. Presentamos 4 candidatos, no 40. Calidad, no volumen.
- 4 puntos de control naranja: "Garantía de contratación de 21 días · Solo consultores senior · 4 candidatos, no 40 · Controles posteriores a la colocación"

{/* Imagen breve: consultor de reclutamiento y cliente en reunión, conferencia profesional. sala, colaborativo, vista de la ciudad */}

### 7. Para candidatos
- "¿Busca su próximo rol?" — Space Grotesk 700
- Sección elevada de superficie centrada
- Inter 300 silenciado: "Regístrese en Apex y obtenga acceso a roles exclusivos; muchos nunca se anunciaron públicamente"
- "Registrarse como candidato →" botón naranja + fantasma "Buscar roles abiertos"

### 8. Testimonios
- Sección en relieve
- 3 tarjetas: fila naranja de 5 estrellas, cita blanca en cursiva Inter 300, nombre de la empresa + rol colocado en Inter 10px silenciado

### 9.CTA
- Borde superior naranja, casi negro, de ancho completo 3px
- Space Grotesk 700 blanco `clamp(42px, 5vw, 72px)`: "SU PRÓXIMO CONTRATACIÓN COMIENZA HOY"
- Inter 300 silenciado: "Garantía de alquiler de 21 días, o trabajaremos gratis en la próxima búsqueda: sin riesgo, sin obligación"
- "Iniciar una búsqueda →" botón naranja
- "Búsqueda ejecutiva · Tecnología · Finanzas · Creativo · Londres y remoto" Inter 10px silenciado

### 10. Pie de página
- Casi negro, Space Grotesk 700 "APEX" en naranja
- LinkedIn · Twitter/X · Correo electrónico
- "© 2026 Apex Talent · Executive Recruitment · Londres · EST. 2012"

## Animaciones
- Héroe: desvanecimiento escalonado, el texto de fondo "TALENTO" se desvanece en 1 segundo delay
- Tira de estadísticas: cuenta atrás en el desplazamiento
- Pasos del proceso: desvanecimiento escalonado
- Desplazamiento total: 0,15 s de facilidad

## Responsive
- Móvil: héroe apilado, sectores de una sola columna, hamburguesa nav

## Copia completa
- Marca denominativa: "APEX"
- Héroe: "ENCONTRAMOS A LAS PERSONAS QUE CAMBIAN DE COMPAÑÍA". / "Búsqueda de ejecutivos y reclutamiento de nivel medio: contratado en 21 días o trabajamos gratis"
- Sectores: Tecnología y Producto · Finanzas y Operaciones · Creativo y Marketing
- Estadísticas: Más de 400 ubicaciones · Garantía de 21 días · 94% de retención · 12 años
- Garantía: Garantía de contratación de 21 días o trabajamos gratis en la siguiente búsqueda
- Testimonio: "Apex nombró a nuestro Jefe de Producto en 14 días. Todos los candidatos que presentaron eran realmente contratables, lo que nunca ha sucedido con ninguna otra agencia". — Sarah T., CTO, Londres
- CTA: "SU PRÓXIMA CONTRATACIÓN COMIENZA HOY"