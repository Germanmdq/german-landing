# Apex Motors — Aviso del sitio web del concesionario de automóviles

## 1. Declaración de objetivos
Crear un sitio web de concesionario de automóviles de alto brillo para **Apex Motors**, definido por superficies casi negras, detalles en azul eléctrico y fotografías cinematográficas de vehículos, con las dos cosas que los compradores realmente usan desde el principio: una cuadrícula de inventario filtrable y una calculadora de pagos mensuales que se actualiza a medida que drag.

---

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño — Colores

```css
:root {
  --background: hsl(220, 14%, 8%);        /* #12141a near-black */
  --foreground: hsl(210, 16%, 95%);       /* #eff1f4 */
  --primary: hsl(206, 100%, 52%);         /* #0a90ff electric blue */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(215, 10%, 58%);
  --border: hsl(220, 12%, 20%);
  --card: hsl(220, 13%, 12%);
  --card-elevated: hsl(220, 12%, 16%);
  --success: hsl(152, 62%, 44%);          /* availability badges */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- **H1 / hero:** `'Sora', sans-serif;` peso 800, clamp(40px, 5.6vw, 88px), espacio entre letras: -0,035em, alto de línea: 1,0
- **H2:** Sora 700, 32–48px, espacio entre letras: -0,025em
- **H3 / nombres de vehículos:** Sora 600, 18–22px
- **Cuerpo:** Inter 300–400, 16px, altura de línea: 1.7
- **Cejas / etiquetas:** Inter 600, mayúsculas, espacio entre letras: 0.18em, 11px, azul
- **Precios / pagos / especificaciones:** Sora 700, tabular-nums

---

## 5. Efectos visuales

### Efecto 1 - Cuadrícula de filtro de inventario
```tsx
const [filters, setFilters] = useState({ type: 'All', make: 'All', maxPrice: 90000 });
const filtered = useMemo(
  () => inventory.filter(v =>
    (filters.type === 'All' || v.type === filters.type) &&
    (filters.make === 'All' || v.make === filters.make) &&
    v.price <= filters.maxPrice
  ),
  [filters]
);

<div className="sticky top-[76px] z-30 border-y border-[var(--border)] bg-[var(--background)]/95 backdrop-blur py-4">
  <div className="flex flex-wrap items-center gap-3">
    {/* Select chips for type and make, plus a price range slider with a live label */}
    <span className="ml-auto text-sm text-[var(--muted-foreground)]">
      {filtered.length} vehicles
    </span>
  </div>
</div>

<motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <AnimatePresence mode="popLayout">
    {filtered.map(v => (
      <motion.article
        key={v.id}
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* vehicle card */}
      </motion.article>
    ))}
  </AnimatePresence>
</motion.div>
```

### Efecto 2 - Pago Calculadora
```tsx
const [price, setPrice] = useState(42000);
const [down, setDown] = useState(5000);
const [term, setTerm] = useState(60);
const apr = 0.069;
const principal = Math.max(price - down, 0);
const r = apr / 12;
const monthly = Math.round((principal * r) / (1 - Math.pow(1 + r, -term)));

<div className="rounded-2xl border border-[var(--border)] bg-[var(--card-elevated)] p-8">
  {/* Three sliders: vehicle price, down payment, term (36/48/60/72) */}
  <div className="mt-8 text-center">
    <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Estimated monthly</span>
    <motion.div key={monthly} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
      className="font-display text-6xl tabular-nums text-[var(--primary)]">
      ${monthly}
    </motion.div>
    <p className="mt-2 text-sm text-[var(--muted-foreground)]">
      {term} months at {(apr * 100).toFixed(1)}% APR · Estimate only, subject to credit approval
    </p>
  </div>
</div>
```

### Efecto 3: desplazamiento sobre la tarjeta del vehículo con revelación de especificaciones
```jsx
<div className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
  <div className="relative aspect-[16/10] overflow-hidden">
    {/* Image: modern car three-quarter front view on a clean dark studio floor, dramatic rim lighting, glossy reflective paint, high contrast automotive photography */}
    <img src="" alt="Vehicle exterior" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
    <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: 'var(--success)', color: '#04180f' }}>
      In stock
    </span>
  </div>
  <div className="p-5">
    <h3 className="font-display text-xl">2024 Aurora GT Line</h3>
    <div className="mt-1 text-sm text-[var(--muted-foreground)]">12,400 mi · AWD · Certified Pre-Owned</div>
    <div className="mt-4 flex items-end justify-between">
      <span className="font-display text-2xl tabular-nums">$42,900</span>
      <span className="text-sm text-[var(--primary)]">or $612/mo</span>
    </div>
  </div>
</div>
```

### Efecto 4: Resplandor azul Fade-Up
```
initial={{ opacity: 0, y: 28 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
```

---

## 6. Desglose de componentes

### Sección 1: barra de navegación
- 76px, `fixed top-0 z-40`, `rgba(18,20,26,0.92)` con desenfoque, borde inferior de 1px
- Izquierda: "APEX" (Sora 800) + marca de chevron azul + "MOTORES" (Inter 600, 9px, espacio entre letras)
- Centro: Inventario · Financiamiento · Intercambio · Servicio · Acerca de
- Derecha: teléfono (Inter 600) + `Examinar inventario` (relleno en azul, redondeado-completo)
- Móvil: marca denominativa + hamburguesa; menú superpuesto oscuro en pantalla completa

### Sección 2: Héroe (cinemático, sin sangre)
- `h-screen`, contenido centrado en la izquierda, `pl-6 md:pl-16`
```jsx
{/* Image: sleek modern car on a wet city street at night, neon and streetlight reflections on the paint, cinematic automotive photography, deep blacks and electric blue highlights */}
<img src="" alt="Vehicle on a wet city street at night" className="absolute inset-0 h-full w-full object-cover object-center" />
<div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(18,20,26,0.95) 0%, rgba(18,20,26,0.6) 45%, rgba(18,20,26,0.25) 100%)' }} />
```
- Ceja: `MIAMI, FL · 340 VEHÍCULOS EN STOCK · ABIERTO 7 DÍAS`
- H1: `Encuéntralo. Fináncielo.\nLlévelo a casa\nhoy.`
- Sublínea: `Nuevo y certificadousados en doce marcas, con precios transparentes y sin maratones de cuatro horas en la oficina de finanzas.`
- Fila CTA: `Examinar inventario` (relleno azul) + `Valorar mi operación` (fantasma blanco)
- Barra de búsqueda rápida (tarjeta transparente): Marca · Modelo · Pago máximo · Botón `Buscar`

### Sección 3 — Confianza Strip
- `--card`, delgado, 4 artículos con íconos azules: `Precios sin regateo` · `Política de devolución de 7 días` · `Inspección de 172 puntos` · `4.8★ de más de 2100 reseñas`

### Sección 4 — Inventario
- `--background`, ceja `EN STOCK AHORA` + H2 `Buscar inventario`
- **Barra de filtro adhesivo** (Efecto 1) debajo del encabezado de sección
- **Cuadrícula de vehículos de 3 columnas** (Efecto 3), se muestran 9 vehículos
- Botón `Cargar más` + `Ver todos los 340 vehículos →`

### Sección 5 — Calculadora de pagos
- Fondo `--card`, división de 2 columnas
- Izquierda: ceja `FINANCIAMIENTO`, H2 `Conozca el pago antes de ingresar`, párrafo corto, 3 viñetas de puntos de confianza
- Derecha: tarjeta de calculadora (Efecto 2)
- Abajo: botón `Obtener precalificación` + `Solo verificación de crédito suave: no afecta su puntaje.`

### Sección 6 — Intercambio
- `--background`, 2-col
- Izquierda: sangrado completo image
```jsx
{/* Image: car keys being handed across a counter, shallow depth of field, warm interior dealership lighting, candid moment */}
```
- Derecha: ceja `TRADE-IN`, H2 `Su automóvil vale más de lo que cree`, proceso de 3 pasos y un formato compacto: año/marca/modelo/kilometraje/condición → `Obtenga mi oferta`
- Nota: `Las ofertas son válidas por 7 días y 500 millas, independientemente de si compre con nosotros.`

### Sección 7: Cómo funciona la compra
- `--card`, línea de tiempo horizontal de 4 pasos con línea de conexión azul
- Explorar · Precalificar · Prueba de manejo · Firmar y listo
- Cada uno: círculo numerado azul, título, descripción de 2 oraciones, típico duración

### Sección 8 — Departamento de servicio
- `--background`, tarjetas de 3 columnas: Mantenimiento programado · Reparaciones y diagnósticos · Piezas y accesorios
- Cada uno: ícono, título, descripción, `Programar servicio →`
- A continuación: horas de servicio block

### Sección 9: Reseñas
- `--card`, 3 tarjetas de revisión con fila de estrellas, cotización, nombre y un "Aurora GT 2024 comprado"line

### Sección 10 — Final CTA
- Banda de gradiente azul con sangrado completo (`linear-gradient(120deg, #0a90ff, #0b5ed7)`), texto blanco
- Vehículos H2 `340. Una tarde.` + línea corta + CTA rellena en blanco `Examinar inventario` + número de teléfono grande

### Sección 11 — Pie de página
- `hsl(220, 16%, 5%)`, 4 columnas: marca + dirección / Inventario / Financiamiento + Intercambio / Servicio + Contacto
- Bloque de horas, redes sociales iconos
- Franja inferior: línea ©, `Licencia de distribuidor n.º DL-0448210`, descargo de responsabilidad de privacidad y financiación: `Los pagos anunciados son estimaciones y excluyen impuestos, títulos y tarifas de distribuidor. Sujeto a aprobación de crédito.`

---

## 7. Animaciones

- **Héroe:** Las líneas H1 se desvanecen escalonadas 0,1 s, 0,75 s cada una; la tarjeta de búsqueda rápida escala `0,97 → 1` con un brillo azul suave, 0,6 s con un retraso de 0,5 s 
- **Barra de navegación:** la opacidad del fondo aumenta de 0,7 a 0,92 después de `scrollY > 50`, 0,3 s
- **Cambios de filtro:** `diseño de motion.div` con `AnimatePresence mode="popLayout"` redistribuye la cuadrícula, 0,32 s por tarjeta
- **Tarjetas de vehículos:** la imagen escala 1 → 1,05 en 0,7 s al pasar el mouse; el borde de la tarjeta pasa a azul con 30 % de opacidad, 0,25 s
- **Calculadora:** la cifra mensual se vuelve a montar con `key={monthly}` y se desvanece 0,25 s con cada cambio; las pistas del control deslizante se llenan de azul
- **Línea de tiempo:** la línea de conexión azul escala desde la izquierda, 0,9 s; círculos de paso pop `scale 0.8 → 1` escalonados 0.12s
- **Iconos de tira de confianza:** pulso de brillo azul sutil en la entrada, una vez, 0.6s
- **CTA final:** el gradiente cambia la "posición de fondo" lentamente, 8s de entrada y salida infinita alternativo

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca denominativa + hamburguesa; botón de tocar para llamar fijado en el menú superpuesto
- Hero: `h-[85vh]`, H1 se fija a 40px, la búsqueda rápida se contrae en un único botón `Buscar inventario` que abre una hoja
- Tira de confianza: cuadrícula de 2x2
- Barra de filtro: chips desplazables horizontalmente, el botón `Filtros` abre una hoja inferior con todas las opciones
- Inventario: tarjetas de 1 columna
- Calculadora: controles deslizantes de ancho completo, cifra mensual pegajosa en la parte inferior de la sección mientras se arrastra
- Intercambio: imagen arriba del formulario
-Línea de tiempo: vertical con línea azul del lado izquierdo
- Servicio: 1-col

### Tableta (768–1024px)
- Inventario 2 columnas · la calculadora permanece en 2 columnas con un relleno más ajustado · servicio 3-col

### Escritorio (> 1024px)
- Ancho máximo 1320px, `px-16`, `py-24`

---

## 9. Copia completa

### Marca
**APEX MOTORS** — Miami, Florida

### Navbar
Inventario · Financiamiento · Intercambio · Servicio · Acerca de · `(305) 555-0190` · [Botón] Explorar inventario

### Hero
- Eyebrow: `MIAMI, FL · 340 VEHÍCULOS EN STOCK · ABIERTO 7 DÍAS`
- H1: `Encuéntralo. Financiarlo. Llévelo a casa hoy.`
- Sublínea: `Nuevo y usado certificado en doce marcas, con precios transparentes y sin maratones de oficina financiera de cuatro horas.`
- CTA 1: `Examinar inventario` · CTA 2: `Valorar mi operación`
- Búsqueda rápida: `Marca` · `Modelo` · `Pago mensual máximo` · [Botón] `Buscar`

### Trust Strip
`Precios sin regateo` · `Política de devolución de 7 días` · `Inspección de 172 puntos` · `4,8★ de más de 2100 reseñas`

### Inventario
Eceja: `EN STOCK AHORA` — H2: `Buscar inventario`
Filtros: `Tipo` (Todos · SUV · Sedán · Camioneta · EV · Coupé) · `Marca` (Todos · 12 marcas) · Control deslizante `Precio máximo`

1. **2024 Aurora GT Line** — 12,400 millas · AWD · Usado certificado — `$42,900` · *o $612/mes*
2. **SUV Vantage EX 2023** — 21,800 millas · AWD · Usado certificado — `$36,500` · *o $521/mes*
3. **Nimbus EV 2025 de largo alcance** — 1,200 millas · RWD · Nuevo — `$51,200` · *o $731/mes*
4. **2022 Ridgeback 4x4 Crew** — 38,600 millas · 4WD · Usado certificado — `$39,750` · *o $567/mes*
5. **Corsa Sport Coupe 2024** — 8,900 millas · RWD · Usado certificado — `$47,300` · *o $675/mes*
6. **2023 Meridian Touring** — 26,100 millas · FWD · Usado certificado — `$28,400` · *o $405/mes*
7. **Vantage Hybrid 2025** — 400 millas · AWD · Nuevo — `$44,900` · *o $641/mes*
8. **Aurora Base 2021** — 52,300 millas · FWD · Usado — `$21,900` · *o $313/mes*
9. **2024 Ridgeback Trail Edition** — 14,700 millas · 4WD · Usado certificado — `$48,600` · *o$694/mes*

### Financiamiento
Eceja: `FINANCIACIÓN` — H2: `Conozca el pago antes de entrar`
Párrafo: `A nadie le gusta descubrir su pago real después de tres horas en una oficina sin ventanas. Ejecute los números aquí, obtenga una precalificación con una verificación de crédito suave y llegue sabiendo exactamente lo que está firmando.`
- `Verificación de crédito suave para la precalificación, sin impacto en su puntaje`
- `Trabajamos con 22 prestamistas, incluidas cooperativas de crédito`
- `Tasas desde 4.9% APR para calificados compradores`
CTA: `Obtenga la precalificación` · Nota: `Solo verificación de crédito suave: no afecta su puntaje.`

### Intercambio
Eceja: `TRADE-IN` — H2: `Su automóvil vale más de lo que cree`
1. **Cuéntanoslo**: año, marca, modelo, kilometraje y buen estado. Dos minutos.
2. **Obtenga un número real**: no es un rango. Una oferta real, respaldada por nuestros datos actuales de subasta y venta minorista.
3. **Tráelo**: verificamos la condición y, si coincide, la oferta se mantiene. Aplíquelo a una compra o acepte un cheque.
Formulario: `Año` / `Marca` / `Modelo` / `Millas` / `Condición` → [Botón] `Obtener mi oferta`
Nota: `Las ofertas son válidas por 7 días y 500 millas, ya sea que nos compre o no.`

### Cómo comprar Works
Eceja: `EL PROCESO` — H2: `Cómo funciona la compra aquí`
1. **Explore** *(todo el tiempo que desee)*: filtre por pago en lugar de por precio de etiqueta si así es como realmente tiene su presupuesto. Cada listado muestra ambos.
2. **Precalificación** *(2 minutos)*: la verificación de crédito suave le brinda una tasa real y un presupuesto real antes de que alguien le dé la mano.
3. **Prueba de manejo** *(30 a 45 minutos)*: tómalo por la autopista, no alrededor de la cuadra. Traiga su silla de auto y verifique que encaje.
4. **Firme y listo** *(aproximadamente una hora)*: la documentación se prepara antes de que usted llegue. No hay complementos sorpresa en la oficina de finanzas, porque no los vendemos allí.

### Servicio
Eyebrow: `DEPARTAMENTO DE SERVICIO` — H2: `We Keep It Running`
1. **Mantenimiento programado** (icono: "Llave inglesa"): servicio de intervalo de fábrica realizado por técnicos certificados, con un automóvil prestado para cualquier trabajo de más de treshoras.
2. **Reparaciones y diagnóstico** (icono: `Medidor`): compartimento de diagnóstico completo, piezas OEM y un presupuesto escrito antes de comenzar cualquier trabajo.
3. **Repuestos y accesorios** (icono: `Paquete`): repuestos, portaequipajes de techo, paquetes de remolque y juegos de invierno originales, instalados mientras espera.
Horario: `Servicio: lunes a viernes de 7 a. m. a 6 p. m. · sábados de 8 a. m. a 4 p. m. · domingo cerrado`

### Reseñas
1. `Lo filtré por pago mensual en lugar de por precio, que es lo que realmente pienso sobre un automóvil. Me tomó veinte minutos encontrar tres opciones en mi gama.` — **Andre W.** · Compré Aurora GT
2 2024. `La oferta de intercambio que me dieron online era el mismo número que me dieron en persona. Había presupuestado una tarde entera para ese argumento.` — **Sofia D.** · Compré Vantage EX
3 2023. `La oficina de finanzas tardó cincuenta minutos y nadie intentó venderme protección de pintura. No sabía que eso era posible.` — **Kevin O.** · Compré Nimbus 2025 EV

### CTA
H2 final: `340 vehículos. Una tarde.`
Subline: `Abierto los siete días. Precalifique en línea, pruebe el manejo hoy y conduzca a casa en la misma visita si los números funcionan.`
CTA: `Browse Inventory` · Teléfono: `(305) 555-0190`

### Footer
- APEX MOTORS · `Nuevos y usados certificados · Miami, Florida`
- Dirección: `8800 Biscayne Boulevard, Miami, FL 33138`
- Horario de ventas: `Lunes a sábado de 9 a. m. a 8 p. m. · Domingos de 11 a. m. a 6 p. m.`
- Licencia de distribuidor n.° DL-0448210
- © 2026 Apex Motores LLC. Reservados todos los derechos. · Política de privacidad · Accesibilidad
- Descargo de responsabilidad: `Los pagos anunciados son estimaciones y excluyen impuestos, títulos y tarifas del distribuidor. Sujeto a aprobación de crédito. La disponibilidad del vehículo cambia diariamente.`

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-slider": "^1.2.0",
  "@radix-ui/react-select": "^2.1.0",
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
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'apex-black': '#12141a',
        'apex-blue': '#0a90ff',
        'apex-green': '#2bb673',
      },
    },
  },
};
```
