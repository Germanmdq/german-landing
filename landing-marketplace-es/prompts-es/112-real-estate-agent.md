# Harlow Properties — Mensaje del sitio web del agente de bienes raíces de lujo

## 1. Declaración de objetivos
Cree un sitio web discreto para agentes de bienes raíces de lujo para **Harlow Properties**, definido por una paleta azul marino medianoche y crema cálida que transmita confianza, discreción y experiencia premium en propiedad residencial.

---

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño: colores

```css
:root {
  --background: hsl(220, 43%, 9%);          /* #0b1222 midnight navy */
  --foreground: hsl(34, 33%, 92%);           /* #f4ede0 warm cream */
  --primary: hsl(38, 48%, 60%);              /* #c9a96e antique gold */
  --primary-foreground: hsl(220, 43%, 9%);   /* navy — text on gold buttons */
  --muted-foreground: hsl(34, 20%, 65%);     /* muted warm grey */
  --border: hsl(38, 30%, 22%);               /* dark gold border */
  --card: hsl(220, 40%, 12%);                /* slightly lighter card bg */
  --card-glass: rgba(244, 237, 224, 0.06);   /* glassmorphism card base */
  --accent: hsl(38, 48%, 60%);               /* antique gold accent */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- **Encabezados H1 / H2:** `font-family: 'Libre Baskerville', Georgia, serif;` peso 400 (normal), espacio entre letras: -0.01em
- **H3 / títulos de tarjetas:** `font-family: 'Libre Baskerville', serif;` cursiva, peso 400
- **Cuerpo/párrafos:** `font-family: 'Inter', sans-serif;` peso 300–400, altura de línea: 1,75, espacio entre letras: 0,01em
- **Navegación/etiquetas de interfaz de usuario/estadísticas:** `font-family: 'Inter', sans-serif;` peso 500–600, espaciado entre letras: 0.06em, tamaño: 12–13px
- **Precios / texto con acento dorado:** Inter 500, color: `--primary`
- **Sección cejas:** Inter 400, mayúsculas, espacio entre letras: 0.2em, tamaño: 11px, color: `--primary`

---

## 5. Efectos visuales

### Efecto 1: héroe de panel dividido con Parallax
```jsx
<section className="relative h-screen flex overflow-hidden">
  {/* Left panel: navy dark text area */}
  <div className="relative z-20 w-full md:w-[55%] flex items-center px-8 md:px-16 lg:px-24 bg-[--background]">
    {/* Text content */}
  </div>

  {/* Right panel: property photo with parallax */}
  <div className="hidden md:block absolute right-0 top-0 w-[50%] h-full overflow-hidden z-10">
    {/* Image: luxury residential exterior — modern white stone facade, large floor-to-ceiling windows, manicured garden, golden hour lighting, architectural photography, ultra-clean composition */}
    <img src="" alt="Luxury property exterior at golden hour" className="w-full h-full object-cover object-center scale-[1.15]" style={{ willChange: 'transform' }} />
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(11,18,34,1) 0%, rgba(11,18,34,0.2) 30%, transparent 60%)' }} />
  </div>
</section>
```

### Efecto 2: estadística animada Contadores
```tsx
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}
```

### Efecto 3: Tarjetas de listado de propiedades de morfismo de vidrio
```tsx
<div
  className="relative rounded-lg overflow-hidden group cursor-pointer"
  style={{
    background: 'rgba(244,237,224,0.06)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(201,169,110,0.18)',
    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
  }}
  onMouseEnter={e => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
    (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,169,110,0.3)';
  }}
  onMouseLeave={e => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
  }}
>
  {/* Card content */}
</div>
```

### Efecto 4: Tarjeta de testimonio escalonada Entrada
```tsx
const testimonials = [...];

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.author}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* testimonial card */}
        </motion.div>
      ))}
    </div>
  );
}
```

### Efecto 5: Cuadrícula de imagen de vecindario con superposición de nombre al pasar el mouse
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
  {neighborhoods.map(n => (
    <div key={n.name} className="relative overflow-hidden aspect-[4/3] group cursor-pointer">
      {/* Image per neighborhood — see copy section */}
      <img src="" alt={n.name} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-cream font-serif text-lg">{n.name}</p>
        <p className="text-gold text-xs uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{n.type}</p>
      </div>
    </div>
  ))}
</div>
```

---

## 6. Componente Desglose

### Sección 1 — Barra de navegación
- **Altura:** 76px escritorio / 64px móvil
- **Posición:** `fijo arriba-0 izquierda-0 derecha-0 z-40`
- **Fondo:** transparente → `rgba(11,18,34,0.96) blur(16px)` activado scroll
- **Izquierda:** Monograma "H·P" en serif pequeña + "HARLOW PROPERTIES" en minúsculas, dorado
- **Centro (escritorio):** Propiedades / Acerca de / Vecindarios / Proceso / Contacto
- **Derecha:** Número de teléfono siempre visible: `+1 310 555 0147` en Inter 500 de oro, luego el botón delineado "Programar una llamada"
- **Móvil:** hamburguesa → superposición completa con teléfononúmero destacado en la parte inferior

### Sección 2: Héroe (panel dividido)
- **Panel izquierdo (55% escritorio, 100% móvil):** fondo azul marino
 - Ceja: `BEVERLY HILLS · BEL AIR · PACIFIC PALISADES`
 - H1: `Dónde Inicio\nBegins` (Libre Baskerville, 64px–96px, crema)
 - Sublínea: `Harlow Properties: representación boutique para compradores y vendedores que esperan más que una transacción.`
 - Fila CTA: "Ver listados actuales" (relleno de oro) + "Programar una consulta" (borde crema fantasma)
- **Derecha panel (50% de escritorio, móvil oculto):** foto de propiedad a sangrado completo con paralaje
- **Fondo móvil:** misma foto de propiedad con superposición oscura, contenido principal centrado

### Sección 3 — Barra de estadísticas
- **Fondo:** azul marino ligeramente más claro `--card`
- **Borde arriba/abajo:** 1px `--border`
- **Diseño:** fila flexible, 3 estadísticas centradas, `py-12 px-8`
- **Cada estadística:** Contador animado (número grande, dorado, Libre Baskerville 48px) + etiqueta debajo (crema entre versalitas pequeñas)
- **Divisores:** líneas verticales `--border` de 1 px entre estadísticas (móvil oculto)

### Sección 4 — Listados destacados
- **Relleno:** `py-24 px-6 md:px-16`
- **Encabezado:** "Propiedades destacadas" con ceja "ACTUALMENTE DISPONIBLE"
- **Cuadrícula:** 3 tarjetas de morfismo de vidrio, `grid grid-cols-1 md:grid-cols-3 gap-6`
- **Cada tarjeta:**
 - Arriba: foto de la propiedad (aspecto-[16/9])
 - Insignia de estado: "EN VENTA" o "RECIÉN LISTADO" (pequeño, dorado, superposición superior derecha)
 - Cuerpo: dirección (serif en negrita), vecindario (en minúsculas dorado), precio (Inter 600 gold grande), fila de dormitorio/baño/pies cuadrados (iconos + números)
 - Pie de página: enlace "Ver propiedad →" en dorado

### Sección 5 — Acerca de Agente
- **Diseño:** 2 columnas, imagen izquierda/texto derecha, `gap-16`
- **Imagen:**
 ```jsx
  {/* Image: professional female real estate agent, approachable smile, dark blazer, warm natural studio lighting, clean white/cream background, headshot/portrait style, trust-building photography */}
  <img src="" alt="Elena Harlow, founder of Harlow Properties" className="w-full h-full object-cover object-center" />
  ```
- **Lado del texto:** ceja "ACERCA DE ELENA HARLOW", H2 "15 años de\nMaking It Personal", párrafos biográficos, credenciales insignias (Miembro de NAR · CLHMS · Forbes 30u30)

### Sección 6 — Proceso
- **Diseño:** 4 pasos numerados en una línea de tiempo horizontal (escritorio),apilado (móvil)
- **Cada paso:** número grande (oro, Libre Baskerville, 80px, muy claro) detrás de la tarjeta, título del paso (negrita serif), breve descripción
- **Pasos:** 01 Consulta · 02 Estrategia · 03 Negociación · 04 Cierre
- **Línea de conexión:** oro fino línea horizontal entre los números de paso (solo escritorio)

### Sección 7 — Testimonios
- **Cuadrícula de 3 columnas** (escritorio), apilada (móvil)
- **Cada tarjeta:** tarjeta de morfismo de vidrio, calificación de estrellas (5 estrellas doradas, ícono de estrella de Lucide-React), texto de cita (serif cursiva), nombre del autor + tipo de caso abajo
- **Animación de entrada escalonada**

### Sección 8 — Vecindarios
- **Título:** "Barrios que conocemos" con ceja "EXPERIENCIA LOCAL"
- **cuadrícula de 6 imágenes** con superposición flotante (escritorio 2x3, móvil 2x3) apilados)

### Sección 9 — Contacto
- **Diseño de 2 columnas:** formulario a la izquierda, información de contacto a la derecha
- **Formulario:** Nombre, correo electrónico, teléfono, mensaje, "Estoy buscando:" (Comprar/Vender/Ambos: botones de opción con estilo de píldoras de alternancia)
- **Col derecha:** "Vamos conectar", teléfono, correo electrónico, dirección de la oficina, marcador de posición para insertar en un mapa pequeño
- **Botón Enviar:** "Enviar mensaje" dorado de ancho completo

### Sección 10 — Pie de página
- **Diseño de 4 columnas** (escritorio), apilado (móvil)
- **Borde superior dorado 1px**
- Marca denominativa / Enlaces de navegación / Información de oficina / Social (Instagram, LinkedIn, Facebook)
- Abajo: © + Número de licencia DRE + logotipo de igualdad de vivienda

---

## 7. Animaciones

### Héroe Parallax
```tsx
const { scrollY } = useScroll();
const rightPanelY = useTransform(scrollY, [0, 600], [0, -80]);
// Apply to right panel via motion.div style={{ y: rightPanelY }}
```

### Navbar Transition
- `window.scrollY > 60` activa la clase, `transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1)`

### Counter Animation
- Activado por `useInView`, 2000 ms de duración, pasos cada 16 ms (60 fps) 

### Card Hover
- `transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease`
- Elevación: `translateY(-6px)`, sombra con brillo dorado

### Pasos del proceso Entrada
```tsx
// Each step reveals in sequence
initial={{ opacity: 0, x: -20 }}
animate={inView ? { opacity: 1, x: 0 } : {}}
transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

### La sección revela
- `initial={{ opacity: 0, y: 40 }}` → `animate={{ opacity: 1, y: 0 }}`
- activó `useInView` una vez, duración 0.7s

---

## 8. Responsive

### Móvil (< 768px)
- Hero: pantalla completa confoto de propiedad bg, superposición oscura, todo el texto centrado
- Barra de estadísticas: 3 estadísticas apiladas verticalmente (o 2+1 en dispositivos móviles más anchos)
- Listados: tarjetas de una sola columna
- Sección de agente: foto de ancho completo en la parte superior, texto debajo
- Proceso: 4 pasos apilados verticalmente
- Cuadrícula de vecindarios: 2x3 mantenida en un tamaño más pequeño
- Contacto: apilado (formulario superior, información a continuación)
- Barra de navegación: ícono de hamburguesa

### Escritorio (> 1024px)
- Héroe: dividido 55/50 panel
- Todas las cuadrículas en ancho completo
- Línea de tiempo del proceso horizontal

---

## 9. Copia completa

### Marca
**HARLOW PROPIEDADES**

### Lema
"Donde comienza el hogar"

### Navbar
- Propiedades
- Acerca de
- Vecindarios
- Proceso
- Contacto
- `+1 310 555 0147`
- [Botón] Programar una llamada

### Hero
- Ceja: `BEVERLY HILLS · BEL AIR · PACIFIC PALISADES`
- H1: `Donde comienza\nla casa`
- Sublínea: `Harlow Properties: representación boutique para compradores y vendedores que esperan más que una transacción.`
- CTA principal: `Ver listados actuales`
- CTA secundaria: `Programar una Consulta`

### Barra de estadísticas
- **247** — Casas vendidas
- **$4.2M** — Precio de venta promedio
- **18 días** — Tiempo promedio en el mercado

### Destacado Listados
**Listado 1:**
- Dirección: 2847 Mulholland Drive
- Barrio: Bel Air
- Precio: $6,850,000
- Habitaciones: 5 · Baños: 6 · Pies cuadrados: 6,200
- Estado: EN VENTAE

**Listado 2:**
- Dirección: 412 N Roxbury Drive
- Barrio: Beverly Hills
- Precio: $4,250,000
- Dormitorios: 4 · Baños: 4,5 · Pies cuadrados: 4,100
- Estado: RECIÉN LISTADO

**Listado 3:**
- Dirección: 1705 Amalfi Drive
- Barrio: Pacific Palisades
- Precio: $8,100,000
- Habitaciones: 6 · Baños: 7 · Pies cuadrados: 7,800
- Estado: EN VENTAE

Tarjeta CTA: `Ver propiedad →`

### Acerca de la sección
- Ceja: `ACERCA DE ELENAHARLOW`
- H2: `15 años haciéndolo personal`
- Para 1: `El sector inmobiliario se trata, en esencia, de las personas: las transiciones que están atravesando, las vidas que están construyendo. Elena Harlow fundó Harlow Properties con una premisa simple: cada cliente merece un asesor, no solo un agente.`
- Párrafo 2: `Con más de $1.2 mil millones en ventas profesionales en Bel Air, Beverly Hills y Palisades, Elena aporta un profundo conocimiento del mercado que solo proviene de años de estar genuinamente presente en cada acuerdo.`
- Para 3: `Su enfoque es mesurado, transparente y profundamente personal. Ella devuelve cada llamada. Ella conoce cada barrio cuadra por cuadra. Y ella permanece contigo mucho después de que las llaves cambian de manos.`
- Credenciales: Miembro de NAR · Certificado CLHMS · Forbes 30 menores de 30 · Agente principal de LA Business Journal

### Sección de proceso
- Ceja: `CÓMO TRABAJAMOS`
- Encabezado: `Desde la primera llamada hasta el cierre Día`

Pasos:
1. **01 — Consulta** — Empezamos escuchando. Una conversación sin presiones para comprender sus objetivos, su cronograma y lo que realmente significa su hogar para usted.
2. **02 — Estrategia** — Cada propiedad es única. Desarrollamos un plan personalizado (precios, posicionamiento y marketing) diseñado específicamente para su situación.
3. **03 — Negociación** — Cuando llegan las ofertas, usted quiere un defensor, no un facilitador. Elena ha negociado cientos de acuerdos de alto riesgo. Ella protege tus intereses.
4. **04 — Cierre** — Gestionamos cada detalle a través del depósito en garantía para que la línea de meta sea fluida, segura y exactamente lo que usted esperaba.

### Testimonios
**Cita 1:**
> "Elena nos encontró la casa de nuestros sueños en Bel Air en tres semanas. Lo que más nos impresionó no fue la velocidad, sino lo bien que escuchó lo que realmente "
> — *David y Sarah M., Compradores, Bel Air* ★★★★★

**Cita 2:**
> "Inscribimos a Elena después de una experiencia decepcionante con otro agente. Ella reposicionó nuestra propiedad, la organizó maravillosamente y nos consiguió $400 mil por pedir en 12. días."
> — *James K., vendedor, Pacific Palisades* ★★★★★

**Cita 3:**
>"Trabajar con Harlow Properties no se parece en nada a lo que esperaba de una transacción de bienes raíces. Personal, profesional e increíblemente efectivo".
> — *Tanya R., Compradora, Beverly Hills* ★★★★★

### Sección de Vecindarios
- Ceja: `LOCAL EXPERIENCIA`
- Título: `Barrios que conocemos`

Elementos de la cuadrícula:
1. **Bel Air** — *Fincas residenciales*
 ```jsx
   {/* Image: sweeping aerial view of Bel Air residential hillside, lush canyon greenery, large luxury homes visible through tree canopy, golden afternoon light, Los Angeles in background */}
   <img src="" alt="Bel Air luxury residential hillside" className="w-full h-full object-cover object-center" />
   ```
2. **Beverly Hills** — *Prestigio de la ciudad*
 ```jsx
   {/* Image: Rodeo Drive streetscape from above, palm tree-lined boulevard, architectural luxury homes in background, bright California sunshine, clean affluent atmosphere */}
   <img src="" alt="Beverly Hills palm-lined boulevard" className="w-full h-full object-cover object-center" />
   ```
3. **Pacific Palisades** — *Vida costera*
 ```jsx
   {/* Image: Pacific Palisades coastal bluff home overlooking Pacific Ocean, infinity pool, warm California sunset, modern architecture with ocean panorama */}
   <img src="" alt="Pacific Palisades coastal bluff home" className="w-full h-full object-cover object-center" />
   ```
4. **Holmby Hills** — *Fincas privadas*
5. **Malibu** — *Playa y Cañón*
6. **Hancock Park** — *Elegancia histórica*

### Sección de contacto
- Ceja: `PONTE EN CONTACTO`
- H2: `Encontremos lo que has estado buscando`
- Etiquetas de formulario: Nombre completo / Dirección de correo electrónico / Número de teléfono / Mensaje
- Opciones de alternancia: Estoy buscando: Comprar · Vender · Ambos · Invertir
- CTA: `Enviar mensaje`
- Col derecha: "O comuníquese con nosotros directamente" / +1 310 555 0147 / elena@harlowproperties.com / 9465 Wilshire Blvd, Suite 300, Beverly Hills CA 90212

### Footer
- Lema: "Tu próximo capítulo comienza aquí".
- Nav: Propiedades · Acerca de · Proceso · Vecindarios · Contacto · Política de privacidad
- DRE #01234567 · Oportunidad de vivienda igualitaria
- © 2024 Propiedades Harlow. Todos los derechos reservados.

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-radio-group": "^1.2.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

**Adiciones de configuración de Tailwind:**
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'harlow-navy': '#0b1222',
        'harlow-cream': '#f4ede0',
        'harlow-gold': '#c9a96e',
      },
    },
  },
};
```
