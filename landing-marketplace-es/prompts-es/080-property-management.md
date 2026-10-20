# Keystone Property Group — Aviso del sitio web de administración de propiedades

## 1. Declaración de objetivos
Crear un sitio web de administración de propiedades de doble audiencia para **Keystone Property Group**, definido por espacios en blanco limpios, un bosque verde seguro y una clara división entre dos tipos de visitantes (propietarios que buscan un administrador e inquilinos que buscan un portal) resuelto en el héroe en lugar de enterrado en el nav.

---

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño: Colores

```css
:root {
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(158, 22%, 13%);      /* #1a2a25 deep green-black */
  --primary: hsl(158, 44%, 24%);         /* #23583f forest green */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(158, 6%, 45%);
  --border: hsl(150, 14%, 89%);
  --card: hsl(150, 26%, 97%);            /* faint green-tinted card */
  --accent-tenant: hsl(206, 62%, 42%);   /* blue for tenant-side actions */
  --accent-gold: hsl(38, 72%, 52%);      /* highlight for stats */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- **H1 / hero:** `'Fraunces', serif;` peso 600, `font-optical-sizing: auto`, clamp(38px, 4.8vw, 66px), altura de línea: 1.08
- **H2:** Fraunces 600, 32–44px
- **H3:** Inter 600, 18–21px
- **Cuerpo:** Inter 300–400, 17px, altura de línea: 1,75
- **Cejas:** Inter 600, mayúsculas, espacio entre letras: 0,16em, 11px
- **Números/tarifas/métricas:** Fraunces 600, tabular-nums

---

## 5. Efectos visuales

### Efecto 1: división de héroe de doble ruta
```tsx
// Two large hover-responsive panels; on mobile they stack as full-width cards
const paths = [
  { key: 'owner',  label: 'I own a property',  sub: 'Get a free rent analysis', color: 'var(--primary)' },
  { key: 'tenant', label: 'I rent a home',     sub: 'Pay rent or submit a request', color: 'var(--accent-tenant)' },
];

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {paths.map((p, i) => (
    <motion.a
      key={p.key}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
      className="group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: 'var(--border)' }}
    >
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100" style={{ background: p.color }} />
      <div className="font-serif text-2xl">{p.label}</div>
      <div className="mt-2 text-[var(--muted-foreground)]">{p.sub}</div>
      <div className="mt-6 inline-flex items-center gap-2 font-medium" style={{ color: p.color }}>
        Continue <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </motion.a>
  ))}
</div>
```

### Efecto 2: tarifa de gestión Calculadora
```tsx
const [rent, setRent] = useState(2200);
const [units, setUnits] = useState(1);
const rate = units >= 5 ? 0.07 : units >= 2 ? 0.075 : 0.08;
const monthlyFee = Math.round(rent * units * rate);

<input
  type="range" min={800} max={6000} step={50}
  value={rent} onChange={e => setRent(Number(e.target.value))}
  className="w-full accent-[var(--primary)]"
/>
<div className="mt-6 rounded-xl bg-[var(--card)] p-6 text-center">
  <div className="text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Estimated monthly fee</div>
  <div className="font-serif text-5xl tabular-nums text-[var(--primary)]">${monthlyFee}</div>
  <div className="mt-2 text-sm text-[var(--muted-foreground)]">{(rate * 100).toFixed(1)}% of collected rent · no leasing fee on renewals</div>
</div>
```

### Efecto 3: Tabla de comparación de servicios (nosotros frente a autogestión)
```
Two-column comparison with check and dash icons; our column has a green tint background
and a 2px green top border. Rows animate in with a 60ms stagger.
```

### Efecto 4: Fade-Up
```
initial={{ opacity: 0, y: 22 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.62, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
```

---

## 6. Desglose de componentes

### Sección 1: barra de navegación
- 74px, `sticky top-0 z-40`, blanco, Borde inferior de 1 px siempre
- Izquierda: marca SVG con forma trapezoidal en verde + "KEYSTONE" (Fraunces 600) + "GRUPO DE PROPIEDAD" (Inter 600, 9px)
- Centro: Servicios · Precios · Áreas donde servimos · Propietarios · Inquilinos
- Derecha: `Inicio de sesión de inquilino` (texto azul enlace) + `Análisis de alquiler gratuito` (botón verde)
- Móvil: marca + hamburguesa; menú superpuesto con las dos rutas fijadas en la parte superior

### Sección 2 — Héroe (Ruta dual)
- `min-h-[80vh]`, contenido centrado, max-w-4xl, fondo blanco con un lavado radial verde tenue arriba a la derecha
- Ceja: `AUSTIN & CENTRAL TEXAS · MANAGING 1,100+ PUERTAS`
- H1: `Sea dueño de la propiedad.\nSáltese las 11 p.m.\nplomeríallamadas.`
- Sublínea: `Administración de propiedades residenciales de servicio completo para viviendas unifamiliares, dúplex y pequeñas multifamiliares en todo el área metropolitana de Austin.`
- **Paneles de ruta dual** (Efecto 1) directamente debajo de la sublínea
- Franja de confianza a continuación: `TREC Licensed #9008412` · `Miembro de NARPM` · `Promedio de 19 días para arrendar` · `98.2% de cobro de alquiler`

### Sección 3 — Propuestas de valor para el propietario
- `--card` fondo, ceja `PARA PROPIETARIOS` + H2 `Lo que dejas de hacer`
- **cuadrícula de 3 columnas**, cada tarjeta: icono verde en un círculo pálido, título, Descripción de 2 oraciones
- Evaluación de inquilinos · Cobro y contabilidad del alquiler · Coordinación de mantenimiento

### Sección 4: Lista completa de servicios
- Blanco, división de 2 columnas: bloque de encabezado adhesivo a la izquierda, a la derecha una lista de 10 servicios separados por líneas finas
- Cada fila: nombre del servicio (Inter 600), una línea descripción y una pequeña insignia "Incluido" en verde

### Sección 5 — Precios + Calculadora
- `--card`, ceja "PRECIO" + H2 "Porcentaje simple". Sin sorpresas.`
- Columna izquierda: calculadora de tarifas (Efecto 2) con control deslizante de alquiler y controlador paso a paso de unidades
- Columna derecha: tres tarjetas de estructura de tarifas: vivienda unifamiliar 8% · 2–4 unidades 7,5% · 5+ unidades 7%: cada una enumera lo que está incluido y lo que cuesta adicional
- Abajo: nota honesta sobre la única vez tarifa de arrendamiento

### Sección 6 - Comparación
- Blanco, ceja `THE MATH` + H2 `Administrado vs Autogestionado`
- Tabla de comparación (Efecto 3): 10 filas en Keystone / Autoadministración
- A continuación, tabla: breve párrafo sobre el costo de vacantes como real gastos

### Sección 7 — Sección de inquilinos
- Banda teñida de azul (`--accent-tenant` con 6 % de opacidad), ceja `PARA INQUILINOS` + H2 `Alquilar con Keystone`
- 3 columnas: **Pagar el alquiler en línea** · **Enviar una solicitud de mantenimiento** · **Emergencia las 24 horas, los 7 días de la semana Línea**
: cada uno con un ícono azul y un contorno azul CTA
: a continuación: `Alquileres disponibles →` enlace a listados

### Sección 8: áreas en las que servimos
- Blanco, 2 columnas: dejó una lista simple de 12 vecindarios/suburbios en dos columnas con viñetas verdes; a la derecha una imagen de mapa silenciada
```jsx
{/* Image: stylised minimal map of a metro area with neighbourhood boundaries, muted green and grey palette, clean cartographic style */}
```

###Sección 9: Testimonios de propietarios
- `--card`, 3 tarjetas de cotización con comillas verdes, nombre y una línea pequeña como `Propietario desde 2019 · 3 puertas`

### Sección 10: Preguntas frecuentes
- Acordeón blanco, centrado max-w-3xl, 6 preguntas

### Sección 11 — Final CTA
- Texto verde y blanco con sangrado completo: H2 `Descubra el precio de alquiler de su propiedad.` + línea corta + CTA relleno en blanco `Obtenga un análisis de alquiler gratuito` + teléfono

### Sección 12 — Pie de página
- Verde oscuro-negro, 4 columnas: marca + licencia / Propietarios / Inquilinos / Contacto
- Franja inferior: texto del logotipo de Igualdad de oportunidades de vivienda, enlace de información TREC, línea ©

---

## 7. Animaciones

- **Héroe:** H1 se desvanece 0,7 s; sublínea 0,5 s a +0,2 s; los paneles de ruta dual se tambalean a 0,5 s y 0,62 s 
- **Paneles de ruta:** la barra de acento inferior de 1 px escala de 0 → 1 (originX a la izquierda) sobre 0,4 s al pasar el mouse; levanta tarjetas `-4px`
- **Calculadora:** transiciones de números de tarifa con resorte al cambiar, 0,35 s; la pista del control deslizante se llena de verde
- **Filas de comparación:** escalonado `i * 0.06`, desvanecimiento; Los íconos de verificación aparecen con `scale 0.7 → 1`, 0.3s
- **Filas de la lista de servicios:** los divisores finos escalan desde la izquierda, 0.5s, escalonado
- **Testimonios:** desvanecimiento 0.62s escalonado 0.1s
- **CTA final:** el fondo verde se desvanece `--card` a verde cuando la sección ingresa a la vista, 0.8s

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca + hamburguesa; `Inicio de sesión de inquilino` fijado dentro del menú superpuesto top
- Hero: H1 se fija a 38px; los paneles de doble ruta se apilan en todo el ancho, el panel del propietario primero
- Tira de confianza: cuadrícula 2x2
- Accesorios de valor del propietario: 1-col
- Lista de servicios: los encabezados se apilan arriba de la lista, las filas de la lista se convierten en 2 líneas
- Precios: calculadora primero, tarjetas de tarifas debajo 1-col
- Tabla de comparación: se convierte en tarjetas apiladas, una por fila, con ambas columnas mostradas como líneas etiquetadas
- Áreas: columna de lista única, mapa a continuación
- Preguntas frecuentes: ancho completo

### Tableta (768–1024px)
- Paneles de ruta dual permanezca en 2 columnas · accesorios de valor 3 columnas con un acolchado más ajustado · la tabla de comparación conserva 2columnas

### Escritorio (> 1024px)
- Ancho máximo 1200px, `px-16`, generoso `py-24`

---

## 9. Copia completa

### Marca
**KEYSTONE PROPERTY GROUP** — Austin, Texas

### Navbar
Servicios · Precios · Áreas donde servimos · Propietarios · Inquilinos · `Inicio de sesión de inquilino` · [Botón] Análisis de alquiler gratuito

### Hero
- Ceja: `AUSTIN Y CENTRAL DE TEXAS · GESTIONANDO MÁS DE 1100 PUERTAS`
- H1: `Es propietario de la propiedad. Evite las llamadas de plomería a las 11 p.m.`
- Sublínea: `Administración de propiedades residenciales de servicio completo para viviendas unifamiliares, dúplex y pequeñas viviendas multifamiliares en todo el área metropolitana de Austin.`
- Ruta 1: `Soy dueño de una propiedad` — *Obtenga un análisis de alquiler gratuito*
- Ruta 2: `Alquilo una casa` — *Pague el alquiler o envíe un request*
- Tira de confianza: `TREC con licencia #9008412` · `Miembro de NARPM` · `Promedio de 19 días para arrendar` · `98.2% de cobro de alquiler`

### Propietarios de valor Props
Eyebrow: `PARA PROPIETARIOS` — H2: `Lo que detienes Haciendo`
1. **Evaluación de inquilinos** (icono: `UserCheck`): crédito, antecedentes penales, historial de desalojo, verificación de ingresos y referencias de propietarios de cada solicitante. Rechazamos a más personas de las que aprobamos, y ese es el punto.
2. **Persiguiendo el alquiler** (icono: `Wallet`): cobro automatizado, política clara de retrasos y cumplimiento que no requiere que usted tenga una conversación incómoda. Los sorteos del propietario llegarán a su cuenta antes del día 10.
3. **Coordinación de mantenimiento** (icono: "Llave inglesa"): proveedores con licencia, sin margen de beneficio en las facturas y con un límite de gasto que usted establece. Apruebas todo lo que esté por encima de él; debajo, simplemente lo manejamos.

### Lista completa de servicios
Eceja: `INCLUIDO` — H2: `Todo lo que está en la tarifa de administración`
1. **Marketing y distribución de listados**: fotografías profesionales y distribución a más de 40 sitios de alquiler dentro de las 48 horas posteriores al lanzamiento.
2. **Evaluación de inquilinos**: verificación completa de antecedentes, crédito, ingresos e historial de alquiler de cada solicitante adulto.
3. **Preparación y ejecución del arrendamiento**: arrendamiento que cumple con las normas de Texas, firma digital y toda la información requerida.
4. **Cobro de alquiler**: pagos en línea, cargos por pagos atrasados ​​automáticos y liquidaciónescalada si se omite el alquiler.
5. **Contabilidad y estados de cuenta del propietario**: estados de cuenta mensuales, formulario 1099 de fin de año y libros de contabilidad descargables en cualquier momento.
6. **Coordinación de mantenimiento**: proveedores autorizados examinados, sin marcas en las facturas y documentación fotográfica en cada trabajo.
7. **Respuesta de emergencia las 24 horas, los 7 días de la semana**: una persona real responde a la línea de emergencia, de día o de noche.
8. **Inspecciones de propiedad**: mudanzas, mudanzas e inspecciones anuales a mitad del arrendamiento con informes fotográficos.
9. **Renovaciones de arrendamiento**: análisis de tarifas de mercado y negociación de renovación. Sin cargo cuando un inquilino renueva.
10. **Gestión de desalojos**: presentación, coordinación con el abogado y asistencia al tribunal si es necesario.

### Precios
Eceja: `PRECIO` — H2: `Porcentaje simple. Sin sorpresas.`
- **Casa individual: 8 % del alquiler cobrado** — Todos los servicios incluidos · Tarifa de arrendamiento única del 50 % del primer mes · Sin tarifa de renovación · Sin margen de beneficio en mantenimiento
- **2–4 unidades: 7.5 % del alquiler cobrado** — Todo lo anterior · Declaraciones consolidadas entre unidades · Programación de proveedores prioritarios
- **5+ unidades: 7% del alquiler cobrado**: todo lo anterior · Administrador de cartera dedicado · Revisión de desempeño trimestral
Nota: `El único costo adicional es la tarifa única de arrendamiento cuando colocamos un nuevo inquilino. No cobramos tarifas de instalación, tarifas de tecnología, tarifas de inspección ni recargos en la factura de ningún proveedor. Si una tarifa no está en esta página, no existe.`

### Comparación
Eceja: `THE MATH` — H2: `Administrado vs Autogestionado`
| | Piedra angular | Autogestionable |
| Listado en más de 40 sitios | Incluido | Publicas individualmente |
| Evaluación completa de candidatos | Incluido | Generalmente solo crédito |
| Línea de emergencia 24 horas al día, 7 días a la semana | Incluido | Tu teléfono |
| Proveedores autorizados examinados | Incluido | Quien responda |
| Marcado de factura de proveedor | Ninguno | N/A |
| Arrendamiento que cumple con Texas | Incluido | Plantilla que encontró en línea |
| Cumplimiento del alquiler tardío | Automatizado | Un texto incómodo |
| Inspecciones anuales | Incluido | Rara vez sucede |
| Manejo de desalojos | Gestionado | Usted en el tribunal |
|Días promedio de alquiler | 19 | 34 (promedio del mercado) |

Párrafo: `Un mes de desocupación en una casa de $2,200 cuesta más que tres meses de administración. La mayoría de los propietarios que calculan los números no comparan nuestra tarifa con cero: la comparan con la desocupación, el volumen de negocios y el fin de semana que perdieron debido a un calentador de agua. **Pague el alquiler en línea** (icono: `Tarjeta de crédito`): tarjeta, transferencia bancaria o pago automático a través del portal para inquilinos. Los recibos son instantáneos.
2. **Envíe una solicitud de mantenimiento** (icono: `Llave inglesa`): cargue fotos, realice un seguimiento del estado y programe una cita con el proveedor sin necesidad de llamar por teléfono.
3. **Línea de emergencia las 24 horas, los 7 días de la semana** (ícono: `Teléfono`): tubería rota, sin calefacción, sin electricidad o bloqueo; llame al `(512) 555-0188` en cualquier hora.
Enlace: `Alquileres disponibles →`

### Áreas que atendemos
Eceja: `COBERTURA` — H2: `Dónde administramos`
`Central Austin` · `South Congress` · `East Austin` · `Mueller` · `Cedar Park` · `Round Rock` · `Pflugerville` · `Georgetown` · `Leander` · `Kyle` · `Buda` · `Dripping Springs`

### Testimonios
1. `Vivo en California y soy dueño de tres casas en Austin. No he pensado en ninguno de ellos en cuatro años. Esa es la reseña completa.` — **Priya N.**, propietaria desde 2019 · 3 puertas
2. "Me disuadieron de un inquilino que quería aprobar. Ese inquilino fue desalojado de otra propiedad nueve meses después. Después de eso, dejé de cuestionarlos". — **Marcus H.**, propietario desde 2021 · 1 puerta
3. `El extracto mensual es realmente legible, lo que suena como un listón bajo hasta que haya utilizado una empresa donde no lo es.` — **Ellen R.**, propietaria desde 2017 · 6 puertas

### FAQ
1. **¿Qué tan rápido puedo arrendar mi propiedad?**: nuestro promedio actual es de 19 días desde la publicación hasta la firma del contrato de arrendamiento, en comparación con un promedio del mercado de 34. Las casas con precios superiores al análisis del mercado toman más tiempo y le diremos honestamente cuando ese sea el caso.
2. **¿Anota facturas de mantenimiento?** — No. Usted paga exactamente lo que cobra el proveedor y cada factura se adjunta a su estado de cuenta mensual.
3. **Qué¿Qué sucede si un inquilino deja de pagar?** — Los avisos tardíos se envían automáticamente el cuarto día. Si la situación se intensifica, presentamos la demanda, coordinamos con un abogado y asistimos al tribunal en su nombre. Se le mantiene informado pero no es necesario que comparezca.
4. **¿Puedo utilizar mi propio contratista?** — Sí. Danos la autoridad de contacto y gasto y programaremos a través de ellos.
5. **¿Estoy atado a un contrato?** — El acuerdo es anual con una cláusula de rescisión de 30 días y sin penalización por rescisión después de los primeros 90 días.
6. **¿Administran alquileres a corto plazo?** — No. Solo administramos arrendamientos residenciales a largo plazo de doce meses o más.

### Final CTA
H2: `Descubra el precio de alquiler de su propiedad.`
Sublínea: `Un análisis de alquiler gratuito tarda unos diez minutos e incluye listados comparables, una tarifa sugerida y una estimación honesta de los días en mercado.`
CTA: `Obtenga un análisis de alquiler gratuito` · Teléfono: `(512) 555-0188`

### Footer
- KEYSTONE PROPERTY GROUP · `Administración de propiedades residenciales de servicio completo, área metropolitana de Austin.`
- Dirección: `2601 South Lamar Boulevard, Suite 210, Austin, TX 78704`
- Agente con licencia TREC #9008412 · Oportunidad de vivienda equitativa
- © 2026 Keystone Property Group. Reservados todos los derechos. · Privacidad · Aviso de protección al consumidor de TREC

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-slider": "^1.2.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

**Configuración de Tailwind adiciones:**
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'ks-green': '#23583f',
        'ks-blue': '#2a72b8',
        'ks-ink': '#1a2a25',
      },
    },
  },
};
```
