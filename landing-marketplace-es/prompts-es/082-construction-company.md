# Halstead Construction — Aviso del sitio web del contratista general

## 1. Declaración de objetivos
Crear un sitio web pesado para contratistas generales para **Halstead Construction**, definido por grises de concreto en bruto, ámbar de seguridad y un grotesco industrial: un sitio que parece haber sido construido por personas que realmente vierten los cimientos, con una galería de proyectos y un cronograma de la fase de construcción que hace el Selling.

---

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño: Colores

```css
:root {
  --background: hsl(220, 8%, 12%);        /* #1c1e21 charcoal */
  --foreground: hsl(30, 6%, 93%);         /* #efedeb concrete white */
  --primary: hsl(38, 92%, 52%);           /* #f5a218 safety amber */
  --primary-foreground: hsl(220, 10%, 10%);
  --muted-foreground: hsl(220, 5%, 60%);
  --border: hsl(220, 7%, 24%);
  --card: hsl(220, 8%, 16%);
  --card-light: hsl(30, 6%, 95%);         /* light sections invert */
  --steel: hsl(210, 10%, 42%);
}
```

Secciones de luz (Proyectos, Procesos) invertidas: Fondo `--card-light` con texto `--background`.

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```

- **H1 / hero:** `'Archivo', sans-serif;` peso 800, mayúsculas, clamp(44px, 6.4vw, 104px), espacio entre letras: -0.03em, alto de línea: 0.94
- **H2:** Archivo 700, mayúsculas, 34–52px, espacio entre letras: -0.02em
- **H3 / títulos de tarjetas:** Archivo 600, 18–22px
- **Cuerpo:** Inter 300–400, 17px, altura de línea: 1.72
- **Cejas / etiquetas:** Archivo 600, mayúsculas, espacio entre letras: 0.2em, 11px, ámbar
- **Estadísticas / números de proyecto:** Archivo 800, números-tabulares

---

## 5. Efectos visuales

### Efecto 1 — Divisor de franja de peligro ámbar
```jsx
<div
  className="h-3 w-full"
  style={{
    backgroundImage: 'repeating-linear-gradient(45deg, var(--primary) 0 18px, transparent 18px 36px)',
  }}
/>
```

### Efecto 2 — Tarjeta de proyecto con panel de metadatos deslizante
```tsx
<div className="group relative overflow-hidden">
  {/* Image: completed commercial building exterior, dramatic low-angle architectural photography, strong directional daylight, clean lines */}
  <img src="" alt="Completed project" className="w-full aspect-[4/3] object-cover object-center transition-transform duration-700 group-hover:scale-105" />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,30,33,0.9) 0%, transparent 55%)' }} />
  <div className="absolute inset-x-0 bottom-0 translate-y-6 p-6 transition-transform duration-400 group-hover:translate-y-0">
    <span className="font-display text-[11px] uppercase tracking-[0.2em] text-[var(--primary)]">Commercial · 2025</span>
    <h3 className="mt-2 font-display text-2xl uppercase text-white">Ridgeline Logistics Center</h3>
    <div className="mt-3 flex gap-5 text-sm text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <span>142,000 sq ft</span><span>14 months</span><span>$38M</span>
    </div>
  </div>
</div>
```

### Efecto 3 — Línea de tiempo de la fase de construcción con desplazamiento Progreso
```tsx
// A vertical amber line whose height maps to scroll progress through the section
const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.65', 'end 0.4'] });
<motion.div
  className="absolute left-6 top-0 w-[3px] origin-top bg-[var(--primary)]"
  style={{ height: '100%', scaleY: scrollYProgress }}
/>
// Each phase node fades and slides in as the line passes it
```

### Efecto 4: recuento de estadísticas en banda de concreto
```
Numbers count from 0 over 1800ms on useInView, ease-out, tabular-nums
```

---

## 6. Componente Breakdown

### Sección 1 — Navbar
- 78px, `top-0 fijo z-40`, `rgba(28,30,33,0.95)` con desenfoque; Borde inferior ámbar de 3px después de `scrollY > 60`
- Izquierda: negrita "HALSTEAD" (Archivo 800, seguimiento -0.02em) + punto cuadrado ámbar + "CONSTRUCCIÓN" (Inter 500, 9px, espacio entre letras)
- Centro: Proyectos · Servicios · Procesos · Acerca de · Seguridad
- Derecha: teléfono (Archivo 600, ámbar) + `Solicitar una oferta` (relleno en ámbar, esquinas cuadradas)
- Móvil: marca denominativa + hamburguesa; superposición de carbón en pantalla completa, Archivo 34px enlaces en mayúsculas

### Sección 2 — Héroe(Sangrado completo, ponderado en la parte inferior)
- `h-screen`, contenido anclado en la parte inferior izquierda, `pb-20 px-6 md:px-16`
```jsx
{/* Image: active construction site at dusk, steel frame silhouette against a deep blue sky, tower crane, work lights glowing amber, industrial and cinematic */}
<img src="" alt="Construction site at dusk" className="absolute inset-0 w-full h-full object-cover object-center" />
<div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,30,33,0.95) 0%, rgba(28,30,33,0.45) 50%, rgba(28,30,33,0.75) 100%)' }} />
```
- Ceja: `DENVER, CO · CONTRATISTA GENERAL · LICENCIADO Y VINCULADO DESDE 1988`
- H1: `LO CONSTRUIMOS\nBIEN LA PRIMERA VEZ.`
- Subline (max-w-xl): `Construcción comercial, industrial y multifamiliar en Front Range. Hormigón y acero realizados por nosotros mismos, gestión de proyectos interna y un cronograma que realmente cumplimos.`
- Fila de CTA: `Solicitar una oferta` (ámbar) + `Ver nuestro trabajo` (fantasma, borde blanco de concreto)
- Fila de credenciales inferior: `EMR 0.68` · `Acreditación LEED` · `Capacidad de vinculación de $120 millones` · `38 Años`

### Sección 3 — Divisor de franjas de peligro (Efecto 1)

### Sección 4 — Banda de estadísticas
- Fondo `--card`, 4 columnas divididas por bordes verticales
- `$1.4B` Construido hasta la fecha · `310` Proyectos entregados · `0.68` Clasificación de seguridad EMR · `92%` Clientes recurrentes

### Sección 5 — Servicios
- `--background`, ceja `QUÉ CONSTRUIMOS` + H2 `SERVICES`
- **cuadrícula 2x3** de tarjetas de servicio: Fondo `--card`, ámbar borde izquierdo 4px, icono de Lucide, título, descripción de 2 oraciones
- Preconstrucción · Contratación general · Diseño-construcción · Gestión de la construcción · Concreto autoejecutado · Mejoras para inquilinos

### Sección 6 — Proyectos (Sección clara)
- `--card-light` fondo, oscuro text
- Ceja `TRABAJO SELECCIONADO` + H2 `PROYECTOS`
- Fila de filtro: Todo · Comercial · Industrial · Multifamiliar · Institucional (estado activo ámbar, botones cuadrados)
- **Cuadrícula tipo mampostería de 3 columnas** de tarjetas de proyecto (Efecto 2), la primera tarjeta abarca 2 columnas
- Abajo: `Ver los 310 proyectos →`

### Sección 7 — Proceso (Sección ligera)
- `--card-light`, ceja `CÓMO FUNCIONA UN TRABAJO` + H2 `DE LA OFERTA A LAS TECLAS`
- Línea de tiempo vertical con línea ámbar enlazada con desplazamiento (Efecto 3), 6 fases
- Cada fase: insignia de número ámbar, título (Archivo 700 en mayúsculas), descripción de 2 oraciones, duración típica en minúsculas monocromáticas

### Sección 8 — Seguridad
- `--background`, división de 2 columnas
- Izquierda: ceja `SEGURIDAD`, H2 `UN EMRDE 0,68 NO ES UN ACCIDENTE`, párrafo, luego 4 líneas de estadísticas con reglas de color ámbar
- Derecha: imagen con sangrado completo
```jsx
{/* Image: construction workers in full PPE reviewing plans on site, hard hats and high-vis vests, natural daylight, documentary style, competent and focused */}
```

### Sección 9 — Equipo/Liderazgo
- `--card`, cuadrícula de 4 columnas, retratos en escala de grises con borde inferior ámbar al pasar el mouse
- Cada uno: nombre (Archivo 600 en mayúsculas), rol, años con línea de empresa

### Sección 10 — Clientes y certificaciones
- `--background`, dos filas de insignias de solo texto: repita los nombres de los clientes, luego las certificaciones (AGC, ABC, OSHA 30, LEED AP, MBE)

### Sección 11 — Oferta CTA
- Fondo ámbar con sangrado completo, texto en carbón
- H2 `¿TIENES PLANES? ENVÍALOS.`
- Línea corta + 2 CTA: `Solicitar una oferta` (lleno de carbón) + número de teléfono (grande, carbón)

### Sección 12 - Pie de página
- `hsl(220, 10%, 8%)`, borde superior ámbar 3px, 4 columnas
- Marca + números de licencia / Servicios / Proyectos / Contacto + dirección de la oficina
- Franja inferior: línea ©, `Equal Opportunity Employer`, `Careers →` en ámbar

---

## 7. Animaciones

- **Héroe:** Las líneas H1 se revelan con `clipPath: inset(0 0 100% 0) → inset(0 0 0 0)`, 0,85 s cada una, escalonamiento 0,1 s; la sublínea y las CTA se desvanecen en 0,55 s
- **Barra de navegación:** el borde inferior ámbar se escala desde la izquierda, 0,4 s, en `scrollY > 60`
- **Barra de peligro:** la posición del fondo cambia 36 px en bucle, 3 s infinito lineal (movimiento sutil, respetos) `prefers-reduced-motion`)
- **Estadísticas:** cuenta atrás 1800 ms en `useInView`
- **Tarjetas de servicio:** escalonado `i * 0,08`, `y: 28 → 0`; al pasar el cursor se amplía el borde izquierdo ámbar 4 px → 8 px, 0,25 s
- **Tarjetas de proyecto:** la imagen escala 1 → 1,05 en 0,7 s; el panel de metadatos se desliza `translateY(24px) → 0` durante 0,4 segundos; la fila de pies cuadrados/duración/valor se desvanece en 0,3 s
- **Cambio de filtro:** reflujo de cuadrícula `AnimatePresence`, `opacity 0→1, scale 0.98→1`, 0,35 s
- **Línea de tiempo del proceso:** línea ámbar `scaleY` vinculada a `scrollYProgress`; los nodos se desvanecen + deslizan `x: -20 → 0` según se alcanza
- **Retratos de equipo:** el borde inferior ámbar de 3 píxeles se escala desde la izquierda al pasar el mouse, 0.3s

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca denominativa + hamburguesa; menú superpuesto en pantalla completa con subrayados ámbar
- Hero: H1se fija a 44 px, la fila de credenciales se convierte en una cuadrícula de 2x2, las CTA se apilan en ancho completo
- Banda de estadísticas: cuadrícula de 2x2 con bordes en todos los lados
- Servicios: 1-col
- Proyectos: 1-col, tarjeta de funciones del mismo tamaño que las demás; fila de filtro desplazable horizontalmente
- Proceso: la línea de tiempo permanece vertical, la línea ámbar se mueve a `izquierda-4`, sangrías de texto
- Seguridad: las imágenes se acumulan debajo del texto
- Equipo: 2-col
- Oferta de CTA: el número de teléfono se convierte en un toque para llamar botón

### Tableta (768–1024px)
- Servicios 2-col · Proyectos 2-col con tarjeta de funciones de ancho completo · Equipo 2-col · Estadísticas 4-col retenidas en tipo más pequeño

### Escritorio (> 1024px)
- Ancho máximo 1320px (más ancho de lo típico: este es un diseño pesado y seguro), `px-16`

---

## 9. Copia completa

### Marca
**HALSTEAD CONSTRUCTION** — Denver, Colorado

### Navbar
Proyectos · Servicios · Proceso · Acerca de · Seguridad · `(303) 555-0126` · [Botón] Solicitar una oferta

### Hero
- Ceja: `DENVER, CO · CONTRATISTA GENERAL · LICENCIADO Y VINCULADO DESDE 1988`
- H1: `LO CONSTRUIMOS BIEN LA PRIMERA VEZ.`
- Sublínea: `Construcción comercial, industrial y multifamiliar en todo Front Range. Hormigón y acero realizados por nosotros mismos, gestión de proyectos interna y un cronograma que realmente cumplimos.`
- CTA 1: `Solicitar una oferta` · CTA 2: `Ver nuestro trabajo`
- Credenciales: `EMR 0,68` · `Acreditación LEED` · `Capacidad de vinculación de $120 millones` · `38 Años`

### Estadísticas
- `$1.4B` — Construido hasta la fecha
- `310` — Proyectos entregados
- `0.68` — Clasificación de seguridad EMR
- `92%` — Repetir clientes

### Servicios
Eceja: `LO QUE CONSTRUIMOS` — H2: `SERVICIOS`

1. **Preconstrucción** (icono: `ClipboardList`): elaboración de presupuestos, revisión de constructibilidad e ingeniería de valor antes de mover una pala. La mayor parte del dinero de un trabajo se decide aquí, no en el campo.
2. **Contratación general** (icono: `HardHat`): trabajo negociado y con ofertas estrictas con nuestros propios superintendentes en cada sitio. No subcontratamos supervisión.
3. **Diseño-Construcción** (icono: `PenTool`) —Entrega de contrato único con nuestros socios de arquitectura e ingeniería. Un equipo, un cronograma, un punto de responsabilidad.
4. **Gestión de la construcción** (icono: `Red`): CM en riesgo y CM de agencia para propietarios que desean transparencia en cada compra y orden de cambio.
5. **Concreto y acero autoejecutados** (icono: `Capas`): cimientos, losas, estructuras inclinadas y acero estructural construidos por nuestro propio equipo. Así es como mantenemos el cronograma cuando las operaciones son ajustadas.
6. **Mejora para inquilinos** (icono: `Building2`): construcciones de espacio ocupado durante las noches y los fines de semana, en fases para que sus inquilinos sigan operando.

### Proyectos
Eceja: `TRABAJO SELECCIONADO` — H2: `PROYECTOS`
Filtros: `Todos` · `Comercial` · `Industrial` · `Multifamiliar` · `Institucional`

1. **Ridgeline Logistics Center** · Industrial · 2025 · 142,000 pies cuadrados · 14 meses · $38M
2. **Cherry Creek Medical Pavilion** · Comercial · 2025 · 88,000 pies cuadrados · 19 meses · $54M
3. **The Foundry Lofts** · Multifamiliar · 2024 · 214 unidades · 22 meses · $61M
4. **Front Range Technical College — Edificio de Oficios** · Institucional · 2024 · 64,000 pies cuadrados · 16 meses · $29M
5. **Expansión de almacenamiento en frío de Baxter** · Industrial · 2023 · 96,000 pies cuadrados · 11 meses · $31M
6. **Renovación de oficinas de Union Station** · Comercial · 2023 · 120,000 pies cuadrados · 15 meses · $42M

### Proceso
Eceja: `CÓMO FUNCIONA UN TRABAJO` — H2: `DE LA OFERTA A LAS LLAVES`

1. **01: Oferta y adjudicación** *(2 a 6 semanas)*: Revisamos los documentos, recorremos el sitio y le asignamos un precio honesto. Si el presupuesto y los planos no coinciden, se lo comunicaremos antes de la adjudicación, no durante.
2. **02 — Preconstrucción** *(4–10 semanas)* — Revisión de constructibilidad, adquisición a largo plazo, estrategia de permisos y cronograma elaborado hacia atrás desde la fecha de ocupación.
3. **03 — Movilización** *(1–2 semanas)* — Logística del sitio, plan de seguridad, servicios públicos temporales y un superintendente en el sitio desde el primer día que permanece hasta el cierre.
4. **04 — Construcción** *(varía)* — Reuniones semanales entre propietarios, arquitectos y contratistas, un cronograma en vivo que puede ver y pedidos de cambio con precios dentro de cinco días hábiles.días. No hay sorpresas en el noveno mes.
5. **05 — Liquidación** *(3 a 5 semanas)* — Lista de tareas pendientes, puesta en marcha, obra conforme a obra, manuales de operación y mantenimiento y capacitación para su equipo de instalaciones antes de entregar las llaves.
6. **06 — Garantía** *(12 meses mínimo)* — Paseo de garantía de un año en el mes once y un número de teléfono que todavía funciona en el mes trece.

### Seguridad
Eceja: `SEGURIDAD` — H2: `UN EMR DE 0,68 NO ES UN ACCIDENTE`
Párrafo: `Cada superintendente tiene OSHA 30. Cada equipo comienza el día con un análisis de peligros específico de la tarea documentado. Dejamos de trabajar por condiciones que otros contratistas impondrían y hemos perdido ofertas por eso. Ese es un intercambio que seguiremos haciendo.`
- `0.68` — Tasa de modificación de experiencia
- `0` — Incidentes con tiempo perdido en 2025
- `100%` — Supervisores con certificación OSHA 30
- `Diario` — Seguridad documentada previa a la tarea planificación

### Liderazgo
Eceja: `QUIÉN DIRIGIE EL TRABAJO` — H2: `LIDERAZGO`
1. **RAY HALSTEAD** — Fundador y director ejecutivo — 38 años
2. **DENISE OKONKWO** — Presidenta — 21 años
3. **MARTY VELASQUEZ** — Vicepresidente de operaciones de campo — 26 años
4. **SAM KLEIN** — VP, Preconstrucción — 14 años

### Clientes y certificaciones
Eyebrow: `REPIETIR CLIENTES`
`Baxter Cold Chain` · `Front Range Technical College` · `Cherry Creek Health` · `Anders Development` · `Union Station Partners` · `Meridian Industrial REIT`

Eyebrow: `CERTIFICACIONES`
`Miembro AGC` · `Miembro ABC` · `OSHA 30 — Todos los supervisores` · `LEED AP en el personal` · `Licencia GC de Colorado #GC-1988-0442`

### Oferta CTA
H2: `¿TIENES PLANES? ENVÍALOS.`
Sublínea: `Envía dibujos, una narrativa del alcance o un boceto en servilleta. Le informaremos dentro de una semana si somos el contratista adecuado para ello, incluso cuando la respuesta sea no. Colorado`
- Dirección: `4400 Brighton Boulevard, Denver, CO 80216`
- Licencia GC de Colorado #GC-1988-0442 · En condiciones de servidumbre yAsegurado
- © 2026 Halstead Construction Inc. Todos los derechos reservados. · Empleador que ofrece igualdad de oportunidades · `Carreras →`

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

**Configuración de viento de cola adiciones:**
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Archivo', 'Helvetica Neue', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'hal-charcoal': '#1c1e21',
        'hal-amber': '#f5a218',
        'hal-concrete': '#efedeb',
      },
      borderRadius: { none: '0px', DEFAULT: '0px' },
    },
  },
};
```
