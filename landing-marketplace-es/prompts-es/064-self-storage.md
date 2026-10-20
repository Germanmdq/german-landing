# Blocklane Storage: mensaje del sitio web de autoalmacenamiento

## 1. Declaración de objetivos
Crear un sitio web de autoalmacenamiento utilitario y centrado en la conversión para **Blocklane Storage**, definido por gris concreto, blanco acero y un solo naranja de alta visibilidad, donde existe toda la página para responder una pregunta: qué tamaño de unidad necesito y cuánto cuesta.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(210, 16%, 97%);      /* #f5f7f8 steel white */
  --foreground: hsl(214, 22%, 15%);      /* #1e262e */
  --primary: hsl(24, 94%, 52%);          /* #f9700f high-vis orange */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(214, 8%, 45%);
  --border: hsl(210, 14%, 87%);
  --card: hsl(210, 18%, 93%);
  --steel: hsl(214, 20%, 26%);           /* dark bands */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
- **H1:** Barlow Condensado 700, mayúsculas, clamp(42px, 6vw, 88px), espacio entre letras 0,01em
- **H2:** Barlow Condensado 600, mayúsculas, 32–50px
- **H3 / tamaños de unidad:** Barlow Condensado 600, 20–24px
- **Cuerpo:** Inter 300–400, 16px, altura de línea 1.7
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.18em, 11px, naranja
- **Precios/dimensiones:** Barlow Condensado 700, números tabulares

## 5. Efectos visuales

**Efecto 1: selector de tamaño de unidad con comparación visual.** Una fila de tarjetas de tamaño donde al seleccionar una se intercambia una ilustración y una comparación en inglés sencillo: un cobertizo de jardín, un garaje individual, una carga de camioneta de tránsito. Esta es la interacción principal de la página.

```tsx
const sizes = [
  { id: 25,  label: '25 sq ft', fits: 'A garden shed. Boxes, a bike, seasonal things.',       price: 22 },
  { id: 50,  label: '50 sq ft', fits: 'A single room of furniture, or a small flat move.',    price: 38 },
  { id: 100, label: '100 sq ft', fits: 'A one-bedroom flat, or a single garage worth.',       price: 62 },
  { id: 200, label: '200 sq ft', fits: 'A three-bedroom house, or a transit van and a half.', price: 108 },
];
const [sel, setSel] = useState(50);
const unit = sizes.find(s => s.id === sel)!;

<AnimatePresence mode="wait">
  <motion.div key={sel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
    <p className="text-lg">{unit.fits}</p>
    <p className="mt-3 font-display text-5xl tabular-nums">£{unit.price}<span className="text-base"> /week</span></p>
  </motion.div>
</AnimatePresence>
```

**Efecto 2: Esquina de peligro diagonal.** Cada tarjeta de precios lleva un pequeño triángulo rayado de color naranja y acero de 45 grados en su esquina superior derecha, dibujado con un degradado lineal repetido y recortado con `clip-path: polygon(100% 0, 0 0, 100% 100%)`.

## 6. Desglose de componentes

1. **Barra de navegación**: 72 px, adhesivo, blanco acero, borde inferior de 1 px. Marca denominativa en bloque a la izquierda, centro de enlaces, número de teléfono y botón cuadrado naranja "Reservar una unidad" a la derecha.
2. **Héroe** — 76vh, dividido. Texto a la izquierda, fotografía de la instalación a la derecha con un ligero matiz de color naranja. Ceja, H1 condensado, sublínea, dos CTA, cuatro puntos de confianza. *Imagen: pasillo limpio y moderno de una instalación de almacenamiento, puertas enrollables en fila, iluminación brillante y uniforme, gran angular.*
3. **Selector de tamaño**: la sección principal, inmediatamente debajo del héroe (Efecto 1). Tarjetas de cuatro tamaños, una línea de comparación, un precio semanal y un CTA.
4 "Reservar este tamaño". **Tabla de todos los tamaños**: cada tamaño de unidad condimensiones, precio semanal y mensual, distintivo de disponibilidad y enlace de reserva.
5. **Lo que obtienes** — Cuadrícula 2x3: acceso las 24 horas, los 7 días de la semana, alarmas individuales, CCTV, carga desde vehículos, carritos gratuitos, sin depósito.
6. **Cómo funciona**: cuatro pasos numerados desde la reserva en línea hasta la mudanza el mismo día.
7. **Almacenamiento empresarial**: banda dividida en `--steel`: desbordamiento de stock, archivo y almacenamiento de herramientas comerciales, con una nota sobre la aceptación de entrega.
8. **Suministros de embalaje**: una lista de precios compacta de cajas, cinta adhesiva, plástico de burbujas y cubiertas.
9. **Preguntas frecuentes** — acordeón, seis preguntas sobre plazos de preaviso, seguros, horarios de acceso y lo que no se puede almacenar.
10. **Encuéntrenos**: dirección, horario de acceso, horario de oficina, mapa e indicaciones para llegar desde la carretera de circunvalación.
11. **Pie de página**: acero oscuro, cuatro columnas, regla superior naranja, registro de empresa.

## 7. Animaciones
- Héroe: H1 se revela con un borrado de línea `clipPath`, 0,7 s; los puntos de confianza se tambalean 0.05s
- Tarjetas de tamaño: la tarjeta seleccionada obtiene un borde naranja de 3px y levanta `-3px`, 0.2s; el texto de comparación se intercambia con `AnimatePresence`, 0.25s
- Cifra de precio: se vuelve a montar con el cambio y se desvanece 0.25s
- Filas de la tabla: se desvanece escalonadamente 0.03s; la insignia de disponibilidad pulsa una vez al ingresar
- Pasos: línea de conexión naranja `scaleX 0 → 1`, 0.8s
- Todo es rápido y mecánico, sin pausas de más de 0.4s en ningún lugar de este sitio

## 8. Responsive
- **Móvil (<768px):** hamburguesa; H1 se fija a 42 px; el selector de tamaño se convierte en una fila de chips desplazable horizontalmente con la comparación y el precio debajo; la mesa de todos los tamaños se convierte en cartas apiladas; "Reservar una unidad" fijado como una barra inferior adhesiva; pasos verticales.
- **Tableta:** tarjetas de tamaño 2x2, características de 3 columnas, la tabla mantiene su forma completa.
- **Escritorio:** ancho máximo 1200px, `px-16`, `py-20`.

## 9. Copia completa

**Marca:** BLOCKLANE ALMACENAMIENTO · Leeds

**Navbar:** Tamaños y precios · Lo que obtienes · Negocios · Suministros · Encuéntranos · `0113 555 0155` · [Botón] Reserva una unidad

**Hero**
- Ceja: `LEEDS · ACCESO 24/7 · SIN DEPÓSITO · PRIMERA MITAD DEL MES PRECIO`
- H1: `ELIGE UNTAMAÑO. MÚDATE HOY.`
- Sublínea: `Unidades de almacenamiento limpias, alarmadas y accesibles en auto junto a la A61. Reserve en línea en dos minutos, sin depósito y cancele con una semana de anticipación.`
- CTA: `Ver tamaños y precios` · `Reservar una unidad`
- Puntos de confianza: `Sin depósito` · `Una semana de anticipación` · `Acceso a puerta 24 horas, 7 días a la semana` · `Carritos y estacionamiento gratis`

**Selector de tallas** — Ceja `ENCUENTRA TU TALLA` — H2 `¿CUÁNTO ESPACIO NECESITAS REALMENTE?`
- **25 pies cuadrados** — Un cobertizo de jardín. Cajas, una bicicleta, cosas de temporada. — £22/semana
- **50 pies cuadrados** — Una sola habitación con muebles o una mudanza de piso pequeño. — £38/semana
- **100 pies cuadrados** — Vale un apartamento de un dormitorio o un garaje individual. — £62/semana
- **200 pies cuadrados** — Una casa de tres habitaciones o una camioneta y media de tránsito. — £108/semana

Nota: `¿No estás seguro? Reserva una talla más. Moverse entre unidades es gratis y toma diez minutos.`

**Todos los tamaños**
| Tamaño | Dimensiones | Semanal | Mensual | Disponibilidad |
|---|---|---|---|---|
| 10 pies cuadrados | 5' × 2' × 8' | £12 | £ 48 | Disponible |
| 25 pies cuadrados | 5' × 5' × 8' | £ 22 | £ 88 | Disponible |
| 35 pies cuadrados | 5' × 7' × 8' | £ 29 | £ 116 | Quedan 2 |
| 50 pies cuadrados | 10' × 5' × 8' | £38 | £ 152 | Disponible |
| 75 pies cuadrados | 10' × 7,5' × 8' | £ 49 | £ 196 | Disponible |
| 100 pies cuadrados | 10' × 10' × 8' | £62 | £ 248 | Queda 1 |
| 150 pies cuadrados | 15' × 10' × 8' | £ 85 | £ 340 | Disponible |
| 200 pies cuadrados | 20' × 10' × 8' | £ 108 | £ 432 | Disponible |

**Lo que obtienes**
1. **Acceso a puerta las 24 horas, los 7 días de la semana** (icono: `KeyRound`): su propio PIN, a cualquier hora, todos los días del año, incluida Navidad.
2. **Unidades con alarma individual** (icono: `BellRing`): cada unidad tiene su propia alarma vinculada al sistema del sitio, no solo una cerca perimetral.
3. **CCTV en todas partes** (icono: `Cctv`): grabado y conservado durante treinta días, cubriendo todos los corredores y ambas puertas.
4. **Carga desde el vehículo** (icono: `Camión`): estacione a unos pocos metros de la mayoría de las unidades de la planta baja. Sin pasillos largos con armario.
5. **Carros y transpaletas gratis** (icono:`ShoppingCart`) — Disponible en ambas entradas, sin reserva, sin cargo.
6. **Sin depósito** (icono: `Monedero`): pague el primer período y múdese. Salga con un aviso de una semana y le reembolsaremos el resto.

**Cómo funciona**
1. **Elija un tamaño**: utilice la comparación anterior o llame y describa lo que está almacenando.
2. **Reserve en línea**: dos minutos, no se requieren datos de tarjeta para reservar una unidad durante 48 horas.
3. **Firme y pague a su llegada** — Traiga una identificación con fotografía y un comprobante de domicilio. Tarda unos diez minutos.
4. **Múdate el mismo día**: obtén tu PIN, obtén tu clave y comienza a descargar.

**Almacenamiento empresarial**: `Desbordamiento de existencias, archivo de documentos y almacenamiento de herramientas comerciales desde 25 pies cuadrados en adelante. Aceptamos y firmamos entregas en horario de oficina sin coste adicional, y puedes acceder a tu unidad antes de que abra la oficina.`

**Suministros** — Caja pequeña £1,60 · Caja grande £2,40 · Caja armario £6,50 · Cinta de embalaje £2,20 · Plástico de burbujas 10m £6 · Funda de colchón £4,50 · Funda de sofá £6

**Preguntas frecuentes**
1. **¿Cuál es la estancia mínima?** — Una semana. Después de eso puedes salir en cualquier momento con siete días de antelación.
2. **¿Necesito un seguro?** — Sí, y puedes usar tu propia póliza de contenidos o contratar la nuestra desde £3,50 a la semana.
3. **¿Cuáles son los horarios de acceso?** — El acceso a la puerta es 24 horas al día, 7 días a la semana con su PIN. La oficina cuenta con personal de lunes a viernes, de 8:30 a 17:30 y sábados de 9:00 a 16:00.
4. **¿Qué no se puede almacenar?** — Cualquier cosa viva, perecedera, inflamable, explosiva o ilegal. Sin combustible, bombonas de gas ni pintura. Si no está seguro, llame y pregunte.
5. **¿Puedo cambiar el tamaño de la unidad más tarde?** — Sí, gratis y generalmente el mismo día si tenemos el tamaño disponible.
6. **¿Hay estacionamiento?** — Gratis, y puede estacionar directamente afuera de la mayoría de las unidades de la planta baja.

**Encuéntrenos** — `Blocklane Storage, Kirkstall Road, Leeds LS4 2AX` · Puerta 24 horas al día, 7 días a la semana · Oficina de lunes a viernes de 8:30 a 17:30, sábados de 9:00 a 16:00 · `A dos minutos de la carretera de circunvalación A61, siga las indicaciones hacia Kirkstall Retail Park.`

**Pie de página** — ALMACENAMIENTO BLOCKLANE · `Elija un tamaño. Múdate hoy.` · `0113 555 0155` · Registro de empresa 08842019 · © 2026

## 10. ClaveDependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
