# Ember & Stone: mensaje del sitio web de un restaurante de alta cocina

## 1. Declaración de objetivos
Crear un sitio web oscuro y editorial de un restaurante de alta cocina para **Ember & Stone**, una marca de asadores premium definida por la calidez cinematográfica, la artesanía y una confianza segura y sencilla. estético.

---

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño - Colores

```css
:root {
  --background: hsl(24, 30%, 4%);         /* #0d0905 deep espresso */
  --foreground: hsl(40, 33%, 91%);        /* #f5f0e8 off-white */
  --primary: hsl(37, 55%, 51%);           /* #c9973e warm amber/gold */
  --primary-foreground: hsl(24, 30%, 4%); /* #0d0905 */
  --muted-foreground: hsl(40, 15%, 60%);  /* muted warm grey */
  --border: hsl(37, 40%, 25%);            /* dark amber border */
  --card: hsl(24, 28%, 7%);               /* slightly lighter card bg */
  --accent: hsl(37, 55%, 51%);            /* same as primary — gold */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet" />
```

- **Encabezados H1/H2:** `font-family: 'Cormorant Garamond', serif;` peso 300–600, espacio entre letras: 0,04em
- **H3 / subtítulos:** `font-family: 'Cormorant Garamond', serif;` cursiva, peso 400
- **Cuerpo/párrafos:** `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;` peso 300–400, espacio entre letras: 0,01em, altura de línea: 1.7
- **Etiquetas de navegación/UI:** `font-family: 'Helvetica Neue', sans-serif;` mayúsculas, espacio entre letras: 0,15 em, tamaño: 11–12 px, peso 400
- **Precios del menú/texto destacado:** Cormorant Garamond cursiva, color dorado (#c9973e)

---

## 5. Efectos visuales

### Efecto 1: Video Hero en bucle de pantalla completa
```jsx
<section className="relative h-screen w-full overflow-hidden">
  {/* Video: chef hands plating a steak dish in cinematic slow motion, warm amber kitchen lighting, bokeh background, dark steakhouse kitchen atmosphere */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-110"
  />
  {/* Top gradient fade */}
  <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(13,9,5,0.6) 0%, transparent 30%, transparent 60%, rgba(13,9,5,0.95) 100%)' }} />
  {/* Left-side text gradient */}
  <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, rgba(13,9,5,0.85) 0%, rgba(13,9,5,0.4) 50%, transparent 100%)' }} />
  {/* Hero content sits at z-20 */}
</section>
```

### Efecto 2: fino Superposición de textura de papel granulado
```jsx
{/* Fixed texture overlay — grain paper, mix-blend-mode overlay */}
<div
  className="fixed inset-0 z-50 pointer-events-none"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    opacity: 0.4,
    mixBlendMode: 'overlay',
  }}
/>
```

### Efecto 3: subrayado dorado animado en los encabezados de sección
```tsx
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

function GoldUnderlineHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="relative inline-block">
      <h2 className="text-4xl md:text-6xl font-light tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--foreground)' }}>
        {children}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ originX: 0, backgroundColor: 'var(--primary)', height: '1px', width: '100%', marginTop: '8px' }}
      />
    </div>
  );
}
```

### Efecto 4: Revelación escalonada de elementos de menú en Scroll
```tsx
const menuItems = [...]; // array of menu items

function MenuGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-px border border-[var(--border)]">
      {menuItems.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 border-b border-[var(--border)] hover:-translate-y-0.5 transition-transform duration-300 cursor-default"
        >
          {/* card content */}
        </motion.div>
      ))}
    </div>
  );
}
```

### Efecto 5 — Tarjeta de reserva de morfismo de vidrio
```tsx
<div
  className="relative rounded-sm overflow-hidden p-px"
  style={{
    background: 'linear-gradient(135deg, rgba(201,151,62,0.5), rgba(201,151,62,0.05) 50%, rgba(201,151,62,0.2))',
  }}
>
  <div
    className="rounded-sm p-8 md:p-12"
    style={{
      background: 'rgba(13,9,5,0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
    }}
  >
    {/* Reservation form content */}
  </div>
</div>
```

---

## 6. Componente Desglose

### Sección 1 — Barra de navegación
- **Altura:** 80px escritorio / 64px móvil
- **Posición:** `fijo arriba-0 izquierda-0 derecha-0 z-40`
- **Estado predeterminado:** completamente transparente, logotipo en blanco roto, enlaces de navegación en minúsculas doradas
- **Estado desplazado (>80px):** `background: rgba(13,9,5,0.95)`, `backdrop-filter: blur(12px)`, borde inferior dorado fino (1px)
- **Izquierda:** Marca denominativa "EMBER & STONE" en Cormorant Garamond, tamaño 18px, espacio entre letras 0.2em
- **Centro (escritorio):** Enlaces de navegación: "Menú" / "Filosofía" / "Cena privada" / "Reserva"
- **Derecha:** "Reservar una mesa": botón con contorno dorado, mayúsculas de 11 px, espacio entre letras 0.15em
- **Móvil:** icono de hamburguesa (3 líneas, dorado),menú superpuesto de pantalla completa con entrada de enlace escalonada

### Sección 2 — Hero
- **Altura:** 100vh
- **Fondo:** Vídeo en bucle en pantalla completa (ver Efecto 1) + superposición de textura
- **Diseño:** Contenido centrado en la parte inferior izquierda, `absoluto bottom-16 left-8 md:left-16 z-20`
- **Contenido:**
 - Etiqueta de cejas: "EST. 2019 — CHICAGO, IL" en minúsculas, dorado, espacio entre letras 0,3em
 - H1: "Donde el fuego\nse encuentra con la delicadeza" — Cormorant Garamond light, tamaño 72px–120px responsivo, blanquecino, cursiva en "Meets Finesse"
 - Sublínea: "Un asador construido sobre la artesanía, el fuego y la reverencia por el ingrediente". 
 - Fila de botones de CTA: Primario: "Reserve su mesa" (relleno de oro), Secundario: "Ver el menú" (borde fantasma) blanquecino)
- **Indicador de desplazamiento:** flecha hacia abajo animada en dorado en la parte inferior central

### Sección 3 — Filosofía
- **Diseño:** División de 2 columnas, `grid grid-cols-1 md:grid-cols-2 gap-0`
- **Col izquierda:** Fondo oscuro, relleno 80px 64px, contenido de texto
- **Columna derecha:** Imagen a sangrado completo, sin relleno
 ```jsx
  {/* Image: aged cast iron skillet with dry-aged ribeye steak searing, dramatic side lighting, smoke rising, dark moody kitchen background, food photography editorial style */}
  <img src="" alt="Dry-aged ribeye steak searing in cast iron, moody kitchen lighting" className="w-full h-full object-cover object-center" />
  ```
- **Contenido de texto:** GoldUnderlineEncabezado "Nuestra filosofía", copia del párrafo a continuación

### Sección 4 — Menú
- **Relleno:** `py-24 px-6 md:px-16`
- **Fondo:** `--background`
- **Estructura:** Navegación por pestañas (Entrantes / Platos principales / Postres / Bebidas) en minúsculas doradas, cuadrícula de contenido a continuación
- **Cuadrícula:** 2 columnas en escritorio, 1 columna en dispositivos móviles
- **Tarjetas:** sin bordes, cada elemento = `flex justify-between items-start py-5 border-b border-[var(--border)]`
- **Cada elemento de menú:** nombre (Cormorant, 20px) + descripción (Helvetica Neue 300, silenciada, 14px) izquierda, precio (Cormorant cursiva) gold, 18px) right
- **Hover:** elevación sutil `-translate-y-0.5`, 300 ms de facilidad

### Sección 5 — Función Chef
- **Diseño:** Imagen sin borde, `h-[70vh]` relativa, contenido superpuesto abajo-izquierda
- **Imagen:**
 ```jsx
  {/* Image: executive chef in pristine white coat, standing in professional kitchen, arms crossed, confident expression, warm amber overhead lighting, bokeh kitchen background, editorial portrait photography */}
  <img src="" alt="Executive chef portrait in professional kitchen" className="w-full h-full object-cover object-center" />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,9,5,0.92) 0%, rgba(13,9,5,0.75) 45%, transparent 100%)' }} />
  ```
- **Contenido:** posicionado `absoluto abajo-16 izquierda-8 md:izquierda-16 z-10`
 - Etiqueta: "CHEF EJECUTIVO"
 - Nombre: "Marcus DeLeon" (grande, Cormorán)
 - biografía de 2 frases

###Sección 6: Cena privada
- **Fondo:** tarjeta oscura `--card`
- **Borde:** 1 px `--border` (oscuro teñido de dorado)
- **Diseño:** texto centrado, ancho máximo 700 px, con imagen de fondo a sangrado completo dimmed
 ```jsx
  {/* Image: private dining room with long dark wood table set for 10, white taper candles, crystal glassware, warm amber ceiling lighting, intimate upscale atmosphere */}
  <img src="" alt="Private dining room with candlelit long table" className="w-full h-full object-cover object-center" />
  ```
- **Superposición de degradado:** `background: linear-gradient(to right, rgba(13,9,5,0.92) 0%, rgba(13,9,5,0.75) 45%, transparent 100%);`
- **CTA:** botón dorado "Consultar sobre cenas privadas"

### Sección 7 — Testimonios
- **Diseño:** columna centrada única, ancho máximo 640 px, control deslizante de cotización de avance automático (intervalo de 5 s)
- **Estilo de cita:** Cormorant Garamond cursiva, 28 px, blanquecino
- **Atribución:** versales Helvetica Neue, dorado, 11 px
- **Navegación por puntos:** 3 pequeños puntos dorados debajo

### Sección 8 — Reservas
- **Fondo:** Fondo muy oscuro con textura de ruido sutil
- **Tarjeta:** morfismo de vidrio (ver Efecto 5), ancho máximo 600 px, centrado
- **Campos de formulario:** Selector de fecha, Hora (menú desplegable), Tamaño del grupo (menú desplegable), Nombre, Teléfono, Correo electrónico
- **Estilo de campo:** `background: rgba(255,255,255,0.04)`, borde inferior dorado de 1 px, etiqueta en minúsculas de 10 px dorado
- **Enviar:** Botón dorado de ancho completo "Confirmar reserva"
- **Botón de nota a continuación:** "Las reservas están confirmadas por teléfono, bienvenidos en el bar."

### Sección 9 — Pie de página
- **Fondo:** casi negro `hsl(24,32%,3%)`
- **Borde superior:** 1px dorado
- **Diseño:** Cuadrícula de 4 columnas (escritorio), apiladas. (móvil)
 - Col 1: Marca denominativa + eslogan
 - Col 2: Enlaces de navegación
 - Col 3: Horario (lunes a jueves de 5 p. m. a 10 p. m., viernes a sábado de 5 p. m. a 11 p. m., domingos de 5 p. m. a 9 p. m.)
 - Col 4: Dirección + íconos sociales (Instagram, Facebook)
- **Tira inferior:** copyright + "Elaborado con cuidado en Chicago"

---

## 7. Animaciones

### Transición de barra de navegación
- Oyente de desplazamiento `useEffect`: agregar clase `desplazado` a 80px
- Transición CSS: `transición: fondo 0.4s facilidad, cuadro-sombra 0.4s facilidad`

### Entrada de héroe (escalonada, en montaje)
```tsx
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};
```

### Pestaña Menú Switch
- `AnimatePresence` con `mode="wait"`, desvanecimiento + ligero desplazamiento Y (10px), duración 0.25s

### ChefSección Parallax
- `useScroll` + `useTransform` para cambiar la imagen `y` de 0 a -60px a medida que la sección se desplaza a través de la ventana gráfica

### Revelaciones activadas por desplazamiento (todas las secciones secundarias)
- `useInView({ once: true, margin: '-100px' })`
- `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}`
- duración: 0,7 s, facilidad: `[0,22, 1, 0,36, 1]`

### Control deslizante de cotización
- `setInterval` 5000ms avance automático
- `AnimatePresence mode="wait"`: desvanecimiento (opacidad 0, x -20) → aparición gradual (opacidad 1, x 0), duración 0.4s

### Estados de desplazamiento
- Tarjetas de menú: `transición: transformación 0.3s facilidad` → `transform: translateY(-2px)`
- Botones CTA: `transición: fondo 0,2 s facilidad, cuadro-sombra 0,2 s facilidad`; brillo dorado al pasar el mouse: `box-shadow: 0 0 24px rgba(201,151,62,0.3)`

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: icono de hamburguesa, menú superpuesto en pantalla completa, todos los enlaces centrados, tamaño de fuente 32px Cormorant
- Hero: tamaño de fuente H1 52px, contenido `abajo-12 izquierda-6`, botones CTA apilados verticalmente
- Filosofía: una sola columna, imagen en la parte superior (h-64), texto debajo
- Menú: 1 columna, la pestaña se desplaza horizontalmente con overflow-x
- Característica del chef: altura de imagen 50vh, contenido en la parte inferior
- Cena privada: texto superpuesto en la parte inferior
- Reservas: formulario de ancho completo, relleno 24px
- Pie de página: 1 columna apilada

### Tableta (768px–1024px)
- Barra de navegación: navegación completa visible, relleno más pequeño
- Héroe: H1 72px
- Filosofía: 2 columnas mantenidas
- Menú: 2 columnas mantenidas

### Escritorio (> 1024px)
- Hero: H1 96px–120px
- Todas las cuadrículas en ancho completo
- Pie de página 4-col

---

## 9. Completo Copia

### Nombre de marca
**EMBER & STONE**

### Lema
"Donde el fuego se encuentra con la delicadeza"

### Navbar
- Menú
- Filosofía
- Cena privada
- Reserva
- [Botón] Reservar una mesa

### Sección héroe
- Ceja: `EST. 2019 — CHICAGO, IL`
- H1: `Donde el fuego\nse encuentra con la delicadeza`
- Sublínea: `Un asador construido sobre la base de la artesanía, el fuego y la reverencia por el ingrediente.`
- CTA Primaria: `Reserve suTabla`
- CTA Secundaria: `Ver el Menú`
- Etiqueta de desplazamiento: `Desplazarse para explorar`

### Sección Filosofía
- Título: `Nuestra Filosofía`
- Cuerpo párrafo 1: `Cada plato que sale de nuestra cocina comienza con una sola pregunta: ¿esto ¿Hacer justicia a lo que la tierra proporcionaba? Nos abastecemos exclusivamente de ranchos, granjas y pesquerías de propiedad familiar: socios que visitamos, no proveedores a los que enviamos correos electrónicos.`
- Párrafo 2 del cuerpo: `Nuestro hogar de leña quema roble blanco y cerezo, elegidos por el perfil de humo que prestan a cada corte. Cada plato es una conversación entre calor, tiempo y moderación.`
- Párrafo 3 del cuerpo: `No adornamos demasiado. No explicamos demasiado. Confiamos en el ingrediente y confiamos en usted.`

### Sección de menú
- Encabezado de sección: `El menú`
- Pestaña 1: `Entrantes`
- Pestaña 2: `Principales`
- Pestaña 3: `Postres`
- Pestaña 4: `Bebidas`

**Entrantes:**
1. Ostras en media concha: *Seis ostras del Pacífico, mignonette de champán y rábano picante*: $22
2. Natillas de médula ósea: *Médula asada, soldados de brioche, microhierbas, flor de sal*: $18
3. Tartar de ternera Wagyu: *wagyu A5 cortado a mano, yema de huevo curada, trufa negra, grissini*: $28
4. Foie gras braseado – *Brioche, guinda, nuez confitada, balsámico añejo* – $32
5. Bisque de langosta: *langosta de Maine, crema de brandy, aceite de estragón, picatostes de masa madre*: $24
6. Tabla de embutidos de brasas: *Carnes curadas en casa, quesos añejos, encurtidos, panal, pan asado*: $38

**Platos principales:**
1. Ribeye añejado en seco de 40 días (16 oz) — *Roble blanco a la parrilla, mantequilla de médula ósea, jugo de ajo asado* — $78
2. Prime New York Strip (14 oz) – *Mantequilla compuesta de trufa, chalotes crujientes, aceite de hierbas* – $68
3. Tomahawk para dos (32 oz) — *Madurado en seco durante 30 días, tallado en la mesa, tres salsas* — $155
4. Pato entero asado – *Cherry gastrique, alevines de grasa de pato, escarola estofada* – $62
5. Fletán braseado – *Champagne beurre blanc, aceite de azafrán, puerro carbonizado, alcaparras* – $54
6. Filet Mignon (8oz) — *bearnesa, puré de pomme, judías verdes* —$74

**Postres:**
1. Fondant de chocolate Valrhona – *Caramelo salado, helado de vainilla* – $16
2. Crème Brûlée — *Vainilla clásica de Madagascar, azúcar caramelizada, bayas de temporada* — $14
3. Selección de quesos — *Tres quesos añejos, panal, pasta de membrillo, pan de nueces* — $22
4. Tarte Tatin de manzana a las brasas: *caramelo de Calvados, crema fresca, almendras tostadas*: $15

**Bebidas:**
1. Old Fashioned — *Maker's Mark 46, angostura, piel de naranja, cereza Luxardo* — $18
2. Ember Negroni – *Mancino Secco, Campari, ginebra Sipsmith, amargo de nuez negra* – $19
3. The Vine Sauvignon Blanc – *Marlborough, Nueva Zelanda, fresco, cítrico* – $16/vaso
4. Château Pichon Baron 2016 — *Pauillac, Burdeos — estructura clásica y con mucho cuerpo* — $28/copa

### Sección de características del chef
- Etiqueta: `CHEF EJECUTIVO`
- Nombre: `Marcus DeLeon`
- Biografía: `El chef Marcus ha pasado dos décadas en cocinas con estrellas Michelin en París, Copenhague y Nueva York antes de llevar su filosofía vanguardista a Chicago. En Ember & Stone, dirige una cocina que cree que cocinar es un acto de devoción, no de decoración.`
- Cita: `"Cocino como quiero comer, honestamente, sin disculpas."`

### Sección de comedor privado
- Título: `Una velada totalmente propia`
- Subtítulo: `Cena privada en Ember & Stone`
- Cuerpo: `Nuestro comedor privado tiene capacidad para 22 invitados, con un sommelier dedicado, desarrollo de menú personalizado y un equipo comprometido a hacer que su evento sea inolvidable. Disponible para cenas corporativas, celebraciones y reuniones íntimas.`
- CTA: `Consulta sobre cenas privadas`
- Detalle: `Capacidad: 8–22 invitados · AV completo disponible · Menús personalizados desde $95 por persona`

### Sección de testimonios
- Encabezado: `Lo que nuestros invitados Say`

**Cita 1:**
> "El chuletón añejado en seco fue el mejor trozo de carne que he comido en esta ciudad, punto. El servicio estuvo a la altura en cada paso del camino".
> — *James R., columna gastronómica del Chicago Tribune*

**Cita 2:**
> "Ember & Stone sigue la líneaperfectamente entre reverencia y accesibilidad. Ni precioso, ni casual, exactamente perfecto."
> — *Mariana V., Reseñas de Google, 5★*

**Cita 3:**
> "Organizamos aquí toda nuestra cena de junta. El propio Marcus vino a la mesa, explicó el menú e hizo que nuestros invitados se sintieran como las únicas personas en la sala."
> — *Alicia W., invitada a una cena privada*

### Sección de Reservas
- Encabezado: `Reserve su mesa`
- Sublínea: `Esperamos darle la bienvenida you.`
- Etiquetas de formulario: Fecha / Hora / Tamaño del grupo / Nombre completo / Número de teléfono / Dirección de correo electrónico
- Opciones de horario: 5:00 p.m. / 5:30 p.m. / 6:00 p.m. / 6:30 p.m. / 7:00 p.m. / 7:30 p.m. / 8:00 p.m. / 8:30 p.m. / 9:00 PM
- CTA: `Confirmar reserva`
- Nota: `Las reservas confirmadas por correo electrónico y teléfono siempre son bienvenidas en el bar.`

### Footer
- Col 1: EMBER & STONE / "Craft. Fuego. Finesse." / Chicago, IL
- Col 2: Menú · Filosofía · Cena privada · Tarjetas de regalo · Carreras
- Col 3: Horario: lunes a jueves de 5 p. m. a 10 p. m. / viernes a sábado de 5 p. m. a 11 p. m. / domingo de 5 p. m. a 9 p. m. / El bar abre a las 4:30 p. m. todos los días
- Col 4: 742 W Randolph Street, Chicago, IL 60661 / +1 312 555 0182 / info@emberandstone.com
- Abajo: © 2024 Ember & Stone Todos los derechos reservados.

---

## 10. Clave. Dependencias

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-select": "^2.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

**Adiciones a la configuración de Tailwind:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'ember-gold': '#c9973e',
        'ember-dark': '#0d0905',
        'ember-cream': '#f5f0e8',
      },
    },
  },
};
```
