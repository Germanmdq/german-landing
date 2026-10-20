Cree una página de inicio de una sola página, oscura y lujosa, para un servicio premium de detalles de automóviles llamado **"LuxureDetails"** usando React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react. La estética es monocromática editorial: fondos negros puros, tipografía blanca, fotografía cinematográfica de automóviles, cero distracciones de color. 

**Tech Stack:** React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + lucide-react

---

## Design System — Colores

```css
:root {
  --background: 0 0% 0%;
  --background-soft: 0 0% 5%;
  --foreground: 0 0% 100%;
  --foreground-muted: 0 0% 60%;
  --foreground-faint: 0 0% 35%;
  --border: 0 0% 15%;
  --card: 0 0% 7%;
}
```

Sin color de acento. Monocromo puro en todas partes. La única variedad visual proviene de la fotografía del automóvil.

---

## Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

- Títulos de visualización (H1, H2): Instrumento Serif, regular, seguimiento grande — sensación editorial
- Cuerpo/UI: Inter, pesos 300–500
- Enlaces de navegación: Inter 500, 13px, mayúsculas, espacio entre letras 0,08em
- Etiquetas/títulos: Inter 400, 11px, mayúsculas, espacio entre letras 0,12em, `--foreground-faint`

---

## Superposición de texturas

```css
.grain {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  background-image: url('/texture.png');
  background-size: 200px 200px;
  mix-blend-mode: overlay;
  opacity: 0.35;
}
```

---

## Regla de diseño global

Cada sección el contenido interno debe estar empaquetado en `max-w-[1120px] mx-auto w-full px-6` (o `px-8` en el escritorio). Aplique esto de manera consistente a la barra de navegación, el contenido principal, todas las secciones del cuerpo y el pie de página.

---

## Sección 1: barra de navegación

Diseño: `fijo arriba-0 izquierda-0 derecha-0 z-40`, ancho completo, `py-5`. Contenedor interno: `max-w-[1120px] mx-auto w-full px-6 flex items-center justify-between`.

Fondo: `bg-black/80 contexto-blur-sm`

Izquierda: `"LuxureDetails"` — Inter 500, 14px, white.
Center (escritorio): enlaces de navegación — `"Servicios" · "Precios" · "Acerca de" · "Contacto"` — Inter 500, 13px, mayúsculas, espacio entre letras 0,08 em, texto blanco/70 hover:text-white colores de transición.
Right: `"Obtener una cotización"` — botón con contorno blanco, `borde border-white/30 rounded-sm px-5 py-2 text-sm hover:bg-white hover:text-black transición-toda duración-300`.

Móvil: Hamburguesa → superposición negra en pantalla completa con enlaces apilados.

---

## Sección 2 — Hero

Contenedor: `min-h-pantallarelativo desbordamiento oculto flex flex-col bg-black`

Contenedor de contenido interno: `max-w-[1120px] mx-auto w-full px-6`

Hero contenedor de contenido class:

```jsx



```

Inside:

**H1:** `"Detalles de autos de lujo"` — Instrumento Serif, `text-5xl md:text-7xl lg:text-8xl`, blanco, `leading-[0.95] seguimiento-[-2px]`, ancho máximo 700px, centrado.

**Subtexto:** `"Experimente el prestigio de un automóvil con detalles profesionales, que irradia elegancia y refinamiento en todo momento."` — Inter 300, `text-base md:text-lg text-white/60`, ancho máximo 440px, centrado, relajado.

**CTA:** `"Vamos a conectarnos ↗"` — Inter 500, 14px, blanco, en línea con el ícono `ArrowUpRight` de lucide-react, `hover:opacity-70 Transition-opacity`.

**Imagen principal: ancho completo, centrado, debajo texto:**

```jsx



```

Desvanecimiento inferior de la imagen: `absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10`

**Animaciones (Framer Motion):**

- H1: `initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}`
- Subtexto: igual, `retraso: 0.2`
- CTA: igual, `retraso: 0.4`
- Imagen principal: `initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}`

---

## Sección 3 — Servicios

Antecedentes: `bg-black pt-32 pb-24`. Interior: `max-w-[1120px] mx-auto w-full px-6`.

Etiqueta superior: `"Detalles de automóviles de lujo"` — Inter 400, 11px, mayúsculas, espacio entre letras 0,12 em, texto-blanco/40, `borde-t borde-blanco/10 pt-6 mb-8`.

Encabezado de sección (escritorio de 2 columnas, `grid grid-cols-1 md:grid-cols-2 gap-8`):
- Izquierda: H2 `"Amor en cada detalle"` — Instrumento Serif, `text-4xl md:text-5xl`, blanco.
- Derecha: `"Sumérgete en lujo con nuestros paquetes de detalles personalizados adaptados a las necesidades únicas de su automóvil."` — Inter 300, texto blanco/60, base de texto, líder relajado, ancho máximo 340 px.

 Cuadrícula de tarjetas de servicio de 3 columnas (`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16`). Cada tarjeta: `bg-[var(--card)] rounded-sm overflow-hidden group cursor-pointer`.

Imagen de la tarjeta: `aspecto-[3/2] desbordamiento oculto`. Imagen: `w-full h-full object-cover objeto-centro transición-transformación duración-500 grupo-hover:escala-[1.02]`.

**Tarjeta 1 — Detalle de nivel de entrada**

```jsx

```

Título: `"Detalle de nivel de entrada"` —Inter 600, 14px, blanco.
Cuerpo: `"Dele a su automóvil de lujo un lavado minucioso a mano y una aplicación de cera."` — Inter 300, 12px, text-white/50.
Enlace: `"Más información →"` — Inter 500, 12px, blanco, group-hover:underline.

**Tarjeta 2 — Detalle de mantenimiento**

```jsx

```

Título: `"Detalle de mantenimiento"`.
Cuerpo: `"Asegura la longevidad de tu coche con una protección exterior periódica tratamiento."`.
Enlace: `"Más información →"`.

**Tarjeta 3 — Detalle completo**

```jsx

```

Título: `"Detalle completo"`.
Cuerpo: `"Mima tu vehículo con un tratamiento completo, sin dejar detalle pasado por alto."`.
Enlace: `"Más información →"`.

Animaciones: Las tarjetas se tambalean al desplazarse — `initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15, duration: 0.7 }} viewport={{ once: true }}`.

---

## Sección 4 — Showreel

La sección completa es un enlace a Youtube. Sin elemento de vídeo: utiliza una imagen de póster con un botón de reproducción superpuesto:

```jsx

  {/* Poster image */}
  
  {/* Dark overlay */}
  


  {/* Top/bottom fades */}
  


  {/* Play button */}
  


    


      
    


    
      Play showreel
    


```

---

## Sección 5: Por qué nosotros/Características

Diseño: `grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-32`. Interior: `max-w-[1120px] mx-auto w-full px-6`.

**Columna izquierda:**

H2: `"Cuidaremos bien de su automóvil"` — Instrument Serif, `text-4xl md:text-5xl`, blanco, ancho máximo 420px.

```jsx

```

**Columna derecha: 3 elementos característicos** (`flex flex-col gap-10`):

Círculo de iconos: `w-10 h-10 redondeado-borde completo borde-blanco/20 elementos flexibles-centro justificar-centro`.

- Ícono `Crosshair` — **"Trabajo preciso"** — `"Mantenemos los más altos estándares de profesionalismo al dar servicio a sus vehículos."`
- Ícono `Star` — **"Productos y servicios Premium"** — `"Asegure la longevidad de su automóvil con un tratamiento de protección exterior periódico."`
- Ícono `ShieldCheck` — **"Seguridad y privacidad de alto nivel"** — `"Entendemos la importancia de la privacidad y la seguridad para nuestros clientes."`

CTA: `"Obtenga una cotización ahora ↗"` — `ArrowUpRight` de lucide-react, Inter 500, 14px, blanco, `hover:opacity-60 Transition-opacity`, debajo de las características.

Los elementos de características se tambalean al desplazarse: `delay: index * 0.2`.

---

## Sección 6 — CTA /Booking

Container: `desbordamiento relativo-oculto min-h-[500px] elementos flexibles-fin pb-20`. Contenido interno: `max-w-[1120px] mx-auto w-full px-6 relativo z-20`.

```jsx



```

Contenido (ancho máximo 520px):

- H2: `"Reserve hoy mismo los detalles de su automóvil de lujo"` — Instrument Serif, `text-4xl md:text-5xl`, white.
- Cuerpo: `"Haga clic en el enlace a continuación. Complete los detalles y nos comunicaremos con usted en menos de 24 horas."` — Inter 300, text-white/60, mt-4.
- CTA: `"Obtenga una cotización ahora ↗"` — botón con contorno blanco, el mismo estilo que la barra de navegación CTA, mt-8.

---

## Sección 7 - Pie de página

Diseño: `bg-borde negro-t borde-blanco/10 py-16`. Interior: `max-w-[1120px] mx-auto w-full px-6`.

Fila superior: `grid grid-cols-1 md:grid-cols-4 gap-10`.

**Columna 1 — Marca:**
`"LuxureDetails"` — Inter 500, 14px, white.
`"Experimente el prestigio de un automóvil con detalles profesionales, que irradia elegancia y refinamiento en todo momento."` — Inter 300, 12px, text-white/40, max-width 220px, mt-3.

**Columna 2 — Sitio web:** Etiqueta: `"Sitio web"`. Enlaces: Servicios · Precios · Acerca de.

**Columna 3 — Contacto:** Etiqueta: `"Contacto"`. Enlaces: Obtenga una cotización · Formulario de contacto · Envíenos un correo electrónico.

**Columna 4 — Redes sociales:** Etiqueta: `"Redes sociales"`. Enlaces: Facebook · Instagram · Twitter · Youtube.

Barra inferior (`border-t border-white/10 mt-12 pt-6 flex justify-between`):
- Izquierda: `"LuxureDetails © 2024"` — text-white/30 text-xs.
- Derecha: `"Política de cookies · Términos de servicio · Política de privacidad"` — text-white/30 text-xs.

---

## Resumen de animaciones

| Elemento | Animación | Gatillo |
|---|---|---|
| Héroe H1 | Fundido hacia arriba + opacidad, 0,9 s | En el soporte |
| Imagen de héroe | Desvanecimiento y: 30 → 0, 1,1 s, retraso 0,5 s | En el soporte |
| Tarjetas de servicio | Desvanecimiento escalonado, retraso de 0,15 s cada uno | En desplazamiento |
| Lista de características | Desvanecimiento escalonado, retraso de 0,2 s cada uno | En desplazamiento |
| Encabezados de sección | Desvanecimiento, 0,7 s | Al desplazarse (una vez) |

---

## Responsive

- Móvil (<768px): una sola columna en todas partes,`px-6`, hero H1 `text-5xl`, nav → hamburguesa superpuesta en pantalla completa.
- Escritorio (≥1024px): características de 2 columnas, tarjetas de 3 columnas, hero H1 `text-8xl`.

---

## Key Dependencias

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.462.0"
}
```

Iconos utilizados: `ArrowUpRight`, `Play`, `Crosshair`, `Star`, `ShieldCheck`