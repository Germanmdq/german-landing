# Northfield Partners — Mensaje del sitio web de la empresa de consultoría de gestión

## 1. Declaración de objetivos
Crear un sitio web sobrio de consultoría de gestión de red suiza para **Northfield Partners**, definido por espacios en blanco puro, un único azul marino profundo y un estricto sistema tipográfico de 12 columnas: confianza expresada a través de precisión en lugar de decoración.

---

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño — Colores

```css
:root {
  --background: hsl(0, 0%, 100%);        /* pure white */
  --foreground: hsl(218, 30%, 12%);      /* #161d28 near-black navy */
  --primary: hsl(218, 62%, 26%);         /* #19396b deep navy */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(218, 8%, 46%);
  --border: hsl(218, 14%, 90%);
  --card: hsl(218, 22%, 97%);
  --accent-rule: hsl(218, 62%, 26%);     /* hairline rules */
  --highlight: hsl(28, 88%, 54%);        /* single warm accent, used sparingly */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

- **H1 / hero:** Inter 600, clamp(40px, 5.2vw, 76px), espaciado entre letras: -0.03em, altura de línea: 1.05
- **H2:** Inter 600, 34–46px, espaciado entre letras: -0.02em
- **H3 / títulos de tarjetas:** Inter 500, 19–22px
- **Cuerpo:** Inter 300–400, 17 píxeles, altura de línea: 1,72
- **Cejas/números de sección:** `'IBM Plex Mono', monospace;` 500, mayúsculas, espacio entre letras: 0,14 em, 11px
- **Datos/métricas:** Inter 700, números tabulares, clamp(40px, 5vw, 72px)

---

## 5. Efectos visuales

### Efecto 1: Sistema de cuadrícula fina (estructura visible)
```jsx
{/* Every major section is bounded by 1px hairlines; columns are divided by vertical rules on desktop */}
<section className="border-t border-[var(--border)]">
  <div className="mx-auto max-w-[1240px] grid grid-cols-1 md:grid-cols-12">
    <div className="md:col-span-4 md:border-r border-[var(--border)] px-6 md:px-10 py-16">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">01 / Capabilities</span>
    </div>
    <div className="md:col-span-8 px-6 md:px-10 py-16">{/* content */}</div>
  </div>
</section>
```

### Efecto 2: Métrico Count-Up
```tsx
import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

function Metric({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });
  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  useEffect(() => spring.on('change', v => {
    if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
  }), [spring, suffix]);
  return <span ref={ref} className="tabular-nums font-bold">0{suffix}</span>;
}
```

### Efecto 3: fila de estudio de caso con detalle de revelación al pasar el cursor
```tsx
<a className="group grid grid-cols-12 items-baseline gap-4 border-b border-[var(--border)] py-8 transition-colors hover:bg-[var(--card)]">
  <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">2025</span>
  <span className="col-span-6 text-xl font-medium">Post-merger operating model, industrial manufacturer</span>
  <span className="col-span-3 text-sm text-[var(--muted-foreground)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    18% SG&A reduction in 11 months
  </span>
  <span className="col-span-1 text-right transition-transform duration-300 group-hover:translate-x-1">→</span>
</a>
```

### Efecto 4: desvanecimiento preciso (sin desenfoque, sin rebote)
```
initial={{ opacity: 0, y: 18 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
```

---

## 6. Desglose de componentes

### Sección 1: barra de navegación
- 72px, `fixed top-0 z-40`, blanco con 1px línea inferior en todo momento
- Izquierda: "NORTHFIELD" (Inter 600, seguimiento -0.01em) + superíndice mono "SOCIO"
- Enlaces de centro derecha: Capacidades · Industrias · Nuestro trabajo · Perspectivas · Acerca de
- Extremo derecho: `Iniciar una conversación` — azul marino, radio de 2px only
- Móvil: marca denominativa + hamburguesa; el menú se desliza hacia abajo como un panel blanco con filas separadas por líneas finas

### Sección 2 — Héroe (tipo dominante, sin imagen)
- `min-h-[88vh]`, cuadrícula de 12 columnas, contenido en las columnas 1 a 9, alineado superiormente con `pt-40`
- Ceja mono: `MANAGEMENT CONSULTORÍA · CHICAGO · DESDE 2004`
- H1: `Ayudamos a los operadores\nhacer ladecisión\nhan estado dando vueltas durante meses.`
- Sublínea en la columna 1–6: `Northfield Partners trabaja con empresas medianas de servicios industriales, de salud y financieros en los problemas que no encajan perfectamente en un organigrama funcional.`
- Fila CTA: `Iniciar una conversación` (azul marino) + `Ver nuestro trabajo` (enlace de texto con flecha)
- Parte inferior del héroe: regla de línea fina + 4 etiquetas de tipo cliente en mono

### Sección 3 — Banda de métricas
- Fondo `--card`, cuadrícula de 4 columnas dividida por líneas verticales
- Cada uno: número de conteo grande + etiqueta mono debajo
- `210+` Compromisos entregados · `$4.1B` Ingresos del cliente influenciados · `11` Promedio de meses para un impacto medible · `84%` Tasa de repetición de clientes

### Sección 4: Capacidades
- Diseño de cuadrícula fina (Efecto 1): etiqueta mono columna izquierda `01 / Capacidades`, columna derecha content
- H2: `En qué somos realmente buenos`
- **Lista de 2 columnas** de 6 capacidades, cada una con un número, título y descripción de 2 oraciones, separadas por líneas
- Sin íconos, solo números y tipo

### Sección 5 — Industrias
- Parte superior blanca, fina; left mono `02 / Industries`
- 4 bloques industriales seguidos en el escritorio, cada uno con un párrafo corto y un enlace mono `→ Ver trabajo`
- Manufactura industrial · Servicios de atención médica · Servicios financieros · Operaciones de cartera de capital privado

### Sección 6: Nuestro trabajo
- `--card` antecedentes; left mono `03 / Trabajo seleccionado`
- H2: `Compromisos seleccionados`
- **Filas de estudio de caso** (Efecto 3), 6 filas, cada una: año, título del compromiso, resultado al pasar el mouse, flecha
- Abajo: `Estudios de caso completos disponibles bajo NDA a pedido.`

### Sección 7 — Approach
: blanco, 12 columnas; left mono `04 / Approach`
- H2: `Four Weeks to a Point of View`
- Proceso horizontal de 4 pasos con conectores finos, cada paso numerado en mono, título en Inter 500, descripción de 2 oraciones
- Cita extraíble alineada a la derecha en Inter 300 cursiva, 24 px, que abarca cols 8–12

### Sección 8: Personas
- `--card`; mono izquierdo `05 / People`
- cuadrícula de 4 columnas desocios
```jsx
{/* Image: corporate portrait, business attire, neutral seamless background, even soft lighting, composed and direct expression, editorial business photography */}
<img src="" alt="Partner portrait" className="w-full aspect-[4/5] object-cover object-center grayscale" />
```
- Cada uno: nombre (Inter 500), línea de rol mono, enfoque de 1 oración, enlace mono `LinkedIn ↗`

### Sección 9 — Insights
- Blanco; left mono `06 / Insights`
- 3 filas de artículos con líneas finas: mono fecha + categoría, título Inter 500, extracto de 1 línea, flecha

### Sección 10 — Contacto
- Sección azul marino con sangrado completo, texto blanco, 12 columnas
- Cols izquierdas 1–6: H2 `Díganos qué no funciona.` + párrafo breve + correo electrónico directo y teléfono
- Columnas derechas 7–12: formulario compacto: nombre/empresa/correo electrónico/¿en qué está trabajando? (área de texto) / botón `Enviar` en `--highlight` naranja (el único acento cálido en el sitio)

### Sección 11 — Pie de página
- Blanco con la parte superior fina, 4 columnas de enlaces mono + dirección
- Franja inferior: línea ©, `Chicago · Nueva York · Toronto`, privacidad link

---

## 7. Animaciones

- Deliberadamente restringido: este diseño indica seriedad, por lo que no hay desenfoque, rebote ni paralaje
- **Héroe:** Las líneas H1 se desvanecen individualmente, 0,6 s, se tambalean 0,08 s; la sublínea y las CTA siguen en 0,35 s
- **Reglas finas:** `scaleX 0 → 1`, originX 0, 0,7 s en la entrada de desplazamiento
- **Métricas:** cuenta atrás 1800 ms con resorte `bounce: 0` (Efecto 2)
- **Capacidad filas:** desvanecimiento escalonado `i * 0.06` (Efecto 4)
- **Filas de estudio de caso:** pasar el cursor revela el texto del resultado (opacidad 0 → 1, 0.3s) y empuja la flecha `translateX(4px)`
- **Retratos de socios:** permanecen en escala de grises; solo un borde inferior azul marino de 1 px se anima al pasar el mouse
- **Barra de navegación:** sin transformación al desplazarse: estático y estable por diseño

---

## 8. Responsive

### Móvil (< 768px)
- Todo Las cuadrículas de 12 columnas colapsan en una sola columna; líneas verticales eliminadas, líneas horizontales retenidas
- Hero H1 se fija a 40 px, sublínea de ancho completo, CTA apiladas
- Métricas: cuadrícula de 2x2 con línea fina cruzada
- Capacidades: 1 columna, números en línea antes de los títulos
- Filas de estudio de caso: año y título en la fila uno, el resultado siempre es visible (sin control flotante) en la fila dos
- Personas: cuadrícula de 2 columnas
- Contacto: pilas de formularios a continuaciónbloque de encabezado

### Tableta (768–1024px)
- La cuadrícula de 12 columnas se convierte en 8 columnas; Industrias 2x2; Personas 2 columnas; las filas de casos mantienen el comportamiento de desplazamiento

### Escritorio (> 1024px)
- Cuadrícula completa de 12 columnas, ancho máximo 1240px, líneas finas en todos los medianiles de las columnas

---

## 9. Completo Copia

### Marca
**NORTHFIELD PARTNERS** — Chicago, Illinois

### Navbar
Capacidad · Industrias · Nuestro trabajo · Perspectivas · Acerca de · [Botón] Iniciar una conversación

### Hero
- Ceja: `CONSULTORÍA DE GESTIÓN · CHICAGO · DESDE 2004`
- H1: `Ayudamos a los operadores a tomar la decisión que han estado dando vueltas durante meses.`
- Sublínea: `Northfield Partners trabaja con empresas de servicios industriales, de atención médica y financieras del mercado medio en los problemas que no encajan perfectamente en una organización funcional chart.`
- CTA 1: `Iniciar una conversación` · CTA 2: `Ver nuestro trabajo →`
- Etiquetas de tipo de cliente: `MERCADO MEDIO` · `PE-BACKED` · `FAMILIAR` · `POST-FUSIÓN`

### Métricas
- `210+` — Compromisos entregados
- `$4.1B` — Influencia de los ingresos del cliente
- `11` — Meses promedio hasta impacto medible
- `84%` — Tasa de repetición de clientes

### Capacidades
Etiqueta mono: `01 / CAPACIDADES` - H2: `En qué somos realmente buenos`

1. **Diseño del modelo operativo**: rediseñamos cómo las decisiones, los presupuestos y la responsabilidad se mueven realmente en una empresa. Normalmente esto significa menos comités y propietarios más claros.
2. **Integración posterior a la fusión**: los primeros 180 días deciden si un acuerdo crea valor o lo destruye silenciosamente. Dirigimos la oficina de integración y forzamos las llamadas de secuenciación estricta con anticipación.
3. **Transformación de costos**: no es una congelación de contrataciones ni una política de viajes. Encontramos el costo estructural en adquisiciones, huella y alcance de control, luego mantenemos la línea en el momento de la entrega.
4. **Estrategia comercial**: arquitectura de precios, priorización de segmentos y modelos de cobertura de ventas para empresas cuyo crecimiento se ha estancado sin una causa obvia.
5. **Resiliencia de la cadena de suministro** — Diseño de red, concentración de proveedores y política de inventario —modelado en función de las interrupciones que son realmente probables, no todas las teóricas.
6. **Mejora del rendimiento**: para empresas con un problema de convenio y una pista corta. Primero estabilizamos el efectivo y luego arreglamos lo que lo causó.

### Industries
Etiqueta mono: `02 / INDUSTRIES`

- **Manufactura industrial**: huella de la planta, rendimiento y disciplina operativa requerida cuando los supuestos de volumen dejan de mantenerse.
- **Servicios de atención médica**: navegación por grupos de proveedores en múltiples sitios presión de los pagadores, economía de personal y consolidación.
- **Servicios financieros**: bancos regionales, aseguradoras y administradores de activos bajo tensión regulatoria y de costos.
- **Operaciones de cartera de capital privado**: apoyo de diligencia, planes de creación de valor y ejecución práctica durante el período de espera.

### Seleccionado Work
Etiqueta mono: `03 / TRABAJO SELECCIONADO` — H2: `Compromisos seleccionados`

- `2025` — Modelo operativo posterior a la fusión, fabricante industrial — *Reducción de gastos de venta, generales y administrativos del 18 % en 11 meses*
- `2025` — Reconstrucción de la arquitectura de precios, distribuidor especializado — *Margen bruto de 420 pb recuperación*
- `2024` — Modelo de dotación de personal en múltiples sitios, sistema de salud regional — *$31 millones de ahorro laboral anualizado*
- `2024` — Consolidación de la base de suministro, proveedor automotriz — *Recuento de nivel 1 reducido de 340 a 96*
- `2023` — Estabilización y recuperación de efectivo, fabricante familiar — *Se restableció el cumplimiento del convenio en dos trimestres*
- `2023` — Plan de creación de valor, plataforma de servicios respaldada por PE — *EBITDA ajustado aumentó 2,4 veces el nivel mantenido*

Nota: `Estudios de casos completos disponibles bajo NDA previa solicitud.`

### Enfoque
Etiqueta mono: `04 / ENFOQUE` — H2: `Cuatro semanas hasta un punto de vista`

1. **Semana 1 — Encuadre** — Acordamos qué pregunta estamos respondiendo y qué evidencia nos haría cambiar de opinión. La mayoría de los compromisos salen mal aquí, no más tarde.
2. **Semana 2: Evidencia**: Entrevistas, extracción de datos y visitas al sitio. Preferimos la planta a la sala de datos, y vamos a ambos.
3. **Semana 3 — Síntesis** — Formamos una posición y la probamos con las personas que tendrán que vivir con ella.El desacuerdo en esta etapa es barato; el desacuerdo en el sexto mes no lo es.
4. **Semana 4: Decisión**: recibe una recomendación, el razonamiento detrás de ella y una evaluación honesta de lo que podría salir mal. Luego le ayudamos a ejecutarlo o se lo entregamos limpiamente.

Cita extraída: `La mayor parte de nuestro trabajo no consiste en descubrir algo que nadie sabía. Está haciendo imposible seguir evitando algo que todo el mundo sospechaba.`

### People
Etiqueta mono: `05 / PEOPLE`

1. **Margaret Ellison** — Socia directora — Modelo operativo y trabajo de recuperación para empresas industriales y familiares.
2. **David Osei** — Socio — Integración posterior a la fusión y operaciones de cartera de PE en plataformas de servicios.
3. **Hana Petrova** — Socia — Estrategia comercial y precios para distribución y fabricación especializada.
4. **Ryan Callahan** — Socio — Diseño de red de cadena de suministro y transformación de adquisiciones.

### Insights
Etiqueta mono: `06 / INSIGHTS`
- `Feb 2026 · Modelo operativo` — **El alcance del control es un síntoma, no una causa** — Por qué aplanar el organigrama rara vez sobrevive al contacto con el presupuesto ciclo.
- `Dic 2025 · Integración` — **Los primeros noventa días de una integración se tratan principalmente de secuenciación** — Y casi nadie secuencia de manera suficientemente agresiva.
- `Oct 2025 · Precios` — **Su política de descuento es su verdadera estrategia de precios** — Lo que dice el precio de lista versus lo que realmente aprueba la mesa de operaciones.

### Contacto
H2: `Díganos qué es lo que no funciona.`
Sublínea: `Una primera conversación dura treinta minutos, no cuesta nada y normalmente termina con una pregunta más clara que la que entró.`
Email: `hello@northfieldpartners.com` · Teléfono: `+1 312 555 0177`
Form: Nombre / Empresa / Email / ¿En qué estás trabajando? / [Botón] `Enviar`

### Pie de página
- NORTHFIELD PARTNERS · `Chicago · Nueva York · Toronto`
- Dirección: `225 North Wacker Drive, Suite 2100, Chicago, IL 60606`
- © 2026 Northfield Socios LLC. Reservados todos los derechos. · Privacidad · Términos

---

## 10. ClaveDependencias

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        'nf-navy': '#19396b',
        'nf-ink': '#161d28',
        'nf-accent': '#f28c2b',
      },
      borderRadius: { DEFAULT: '2px' },
    },
  },
};
```
