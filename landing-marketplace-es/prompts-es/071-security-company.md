# Vantage Security: mensaje del sitio web de la empresa de seguridad

## 1. Declaración de objetivos
Crear un sitio web de seguridad comercial sólido y con credibilidad para **Vantage Security**, definido por superficies casi negras, un color de señal cian frío y etiquetas de datos monoespaciales: un sitio que se lee como una sala de control en lugar de un folleto.

## 2. Tecnología Pila
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(220, 18%, 7%);       /* #0e1116 */
  --foreground: hsl(210, 16%, 94%);      /* #ecf0f3 */
  --primary: hsl(186, 92%, 46%);         /* #0ad4e0 signal cyan */
  --primary-foreground: hsl(220, 20%, 6%);
  --muted-foreground: hsl(215, 10%, 55%);
  --border: hsl(220, 14%, 18%);
  --card: hsl(220, 16%, 10%);
  --card-elevated: hsl(220, 15%, 14%);
  --alert: hsl(14, 88%, 56%);            /* incident red */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Espacio Grotesk 700, clamp(38px, 5vw, 74px), espacio entre letras -0.03em
- **H2:** Espacio Grotesk 600, 32–46px
- **H3:** Espacio Grotesk 500, 18–21px
- **Cuerpo:** Inter 300–400, 16 px, altura de línea 1.7
- **Etiquetas de datos/cejas:** IBM Plex Mono 500, mayúsculas, espacio entre letras 0,14 em, 11 px, cian
- **Métricas:** Espacio Grotesk 700, números tabulares

## 5. Efectos visuales

**Efecto 1: ticker de monitoreo en vivo.** Una franja monoespacial debajo del héroe que recorre líneas de estado anónimas en un intervalo de 3 segundos, imitando una transmisión de la sala de control.

```tsx
const lines = [
  'SITE 0412 · PERIMETER CLEAR · 03:42',
  'SITE 0117 · PATROL LOGGED · 03:44',
  'SITE 0288 · ALARM ACK 41s · 03:46',
  'SITE 0503 · KEYHOLDER NOTIFIED · 03:49',
];
const [i, setI] = useState(0);
useEffect(() => {
  const t = setInterval(() => setI(v => (v + 1) % lines.length), 3000);
  return () => clearInterval(t);
}, []);

<AnimatePresence mode="wait">
  <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}
    className="font-mono text-sm tracking-wider text-[var(--primary)]">
    {lines[i]}
  </motion.span>
</AnimatePresence>
```

**Efecto 2: superposición de cuadrícula de línea de exploración.** Un puntero fijo-eventos-ninguno superposición con líneas horizontales de 1 px a intervalos de 4 px con una opacidad del 3 %, lo que le da a cada sección una textura de monitor tenue.

## 6. Desglose de componentes

1. **Barra de navegación**: 74 px, fijo, `rgba(14,17,22,0.94)` con desenfoque, borde inferior cian de 1 px después del desplazamiento. Marca denominativa a la izquierda, centro de enlaces, número de la sala de control 24 horas al día, 7 días a la semana en mono y botón cian "Solicitar una encuesta del sitio" a la derecha.
2. **Hero**: imagen nocturna de 92 vh con sangrado completo y un fuerte degradado hacia la izquierda. Mono ceja, H1, sublínea, dos CTA, cuatro insignias de acreditación. *Imagen: centro de operaciones de seguridad de noche, pared de monitores brillando, cuarto oscuro, luz azul fría, cinematográfico.*
3. **Ticker de monitoreo** — la tira en vivo (Efecto 1) en una banda de tarjeta.
4. **Servicios** — Red 2x3: vigilancia tripulada, patrullas móviles, respuesta de alarmas, monitoreo de CCTV, control de acceso, seguridad de eventos. Borde izquierdo cian, código de servicio mono encima de cada título.
5. **Métricas de respuesta**: cuatro cifras de conteo en `--card`: respuesta de alarma promedio, sitios monitoreados, oficiales SIAlicencia, tiempo de actividad de la sala de control.
6. **Cómo se ejecuta una llamada**: cronograma horizontal de cinco pasos con marcas de tiempo monocromáticas, desde la activación de la alarma hasta el informe escrito del incidente.
7. **Sectores**: cuatro bloques: construcción, comercio minorista, logística, educación, cada uno con una descripción de dos oraciones y un riesgo específico que aborda.
8. **Acreditaciones** — fila de insignia de texto: Contratista aprobado por SIA, NSI Gold, ISO 9001, Contratista seguro, ACS Pacesetter.
9. **Instantánea del caso**: un incidente anónimo contado en cuatro tiempos cortos con marcas de tiempo mono.
10. **Solicite una encuesta** — dividido: formulario a la izquierda, bloque de contactos de la sala de control a la derecha.
11. **Pie de página**: pizarra más oscura, borde superior cian, cuatro columnas, número de licencia SIA, número repetido las 24 horas, los 7 días de la semana.

## 7. Animaciones
- Hero: H1 se desvanece 0,7 s; las insignias se tambalean 0.06s
- Ticker: `AnimatePresence` intercambia cada 3s, transición de 0.3s
- Líneas de escaneo: estáticas, sin animación (el movimiento aquí sería nauseabundo)
- Tarjetas de servicio: el borde izquierdo cian crece 3px → 6px al pasar el mouse, 0,25 s
- Métricas: cuenta atrás 1600 ms en `useInView`
- Línea de tiempo: línea de conexión cian `scaleX 0 → 1`, 0,9 s; los nodos aparecen escalonados 0.1s
- Latidos de instantáneas del caso: se desvanecen a medida que el lector se desplaza, `x: -16 → 0`

## 8. Responsive
- **Móvil (<768px):** hamburguesa con un botón de sala de control de tocar para llamar fijado en la superposición; H1 se fija a 38 px; el texto del teletipo se acorta al código y estado del sitio; servicios 1-col; métricas 2x2; línea de tiempo vertical con una regla cian izquierda; formulario de encuesta de ancho completo.
- **Tableta:** servicios 2 columnas, sectores 2x2, línea de tiempo permanece horizontal.
- **Escritorio:** ancho máximo 1240px, `px-16`, `py-24`.

## 9. Completo Copia

**Marca:** VANTAGE SECURITY · Manchester

**Navbar:** Servicios · Sectores · Respuesta · Acreditaciones · Contacto · `0161 555 0100` · [Botón] Solicitar una encuesta del sitio

**Hero**
- Ceja: `MANCHESTER · SIA APPROVED CONTRATISTA · SALA DE CONTROL CON PERSONAL 24/7/365`
- H1: `Alguien está mirando. Realmente observando.`
- Sublínea: `Guardia tripulada, patrullas móviles y respuesta de alarma en todo el NorteOeste, huye de nuestra propia sala de control. Sin centro de llamadas, sin servicio de contestador automático, sin espera de cuarenta minutos para hablar con un humano a las 3 a.m.`
- CTA: `Solicitar una encuesta del sitio` · `Llame a la sala de control`
- Insignias: `SIA APPROVED` · `NSI GOLD` · `ISO 9001` · `ACS PACESETTER`

**Líneas de teletipo:** `SITIO 0412 · PERÍMETRO LIMPIO · 03:42` · `SITIO 0117 · PATRULLA REGISTRADA · 03:44` · `SITIO 0288 · ALARMA ACK 41s · 03:46` · `SITIO 0503 · LLAVERO NOTIFICADO · 03:49`

**Servicios**
1. `SVC-01` **Guardia tripulada**: oficiales con licencia de SIA en el sitio, examinados según BS 7858. Puestos estáticos, control de entrada y seguridad de recepción con entregas documentadas en cada turno.
2. `SVC-02` **Patrullas móviles**: horarios de patrullaje aleatorios con puntos de control registrados por GPS. Cada mañana recibe un informe con marca de tiempo que muestra exactamente dónde estábamos y cuándo.
3. `SVC-03` **Respuesta de alarma**: retención de claves y respuesta, reconocimiento promedio en cuarenta y un segundos. Atendemos, evaluamos, aseguramos y presentamos un informe escrito del incidente antes de partir.
4. `SVC-04` **Monitoreo CCTV**: monitoreo remoto en vivo desde nuestra sala de control con desafío de audio. Se habla con los intrusos en el lugar, lo que resuelve la mayoría de los incidentes antes de que alguien tenga que asistir.
5. `SVC-05` **Control de acceso**: diseño, instalación y gestión de sistemas de tarjetas, llaveros y biométricos, incluida la gestión de visitantes y registros de auditoría.
6. `SVC-06` **Seguridad de eventos**: gestión de multitudes, equipos de búsqueda y administración para eventos de doscientos a doce mil, con un plan de seguridad documentado.

**Métricas** — `41s` Promedio de reconocimiento de alarmas · `340` Sitios monitoreados · `100%` Oficiales con licencia SIA · `99.98%` Sala de control uptime

**Cronología de llamadas**
1. `T+0s` **Disparadores de alarma**: la señal llega a la sala de control directamente, no a través de un tercero.
2. `T+41s` **El operador reconoce**: un operador designado lo recoge y extrae la señal de la cámara para la zona.
3. `T+2m` **Desafío o envío de audio**: la mayoría de los incidentes terminan aquí. Si no, se envía la patrulla más cercana.
4. `T+18m` **Oficial en el sitio** — Asistencia promedio en todo el noroestecobertura. El sitio está revisado, asegurado y fotografiado.
5. `T+90m` **Informe escrito**: un informe de incidente con marca de tiempo e imágenes llega a su bandeja de entrada antes de la mañana.

**Sectores**
- **Construcción**: Robo de plantas, robo de combustible y metal. Protegemos los complejos durante el período de mayor riesgo, que casi siempre es entre la 1 a. m. y las 4 a. m. de los domingos. 
- **Retail**: prevención de pérdidas, cobertura de apertura y cierre, y una presencia visible durante el horario comercial que reduce los incidentes sin incomodar a los clientes.
- **Logística**: control de entrada, controles de vehículos y verificación de carga, con pistas de auditoría que se mantienen cuando un cliente disputa un delivery.
- **Educación** — Patrullas en el campus fuera de horario y cobertura de trabajadores solitarios, realizadas por oficiales que han sido mejorados con DBS verificado como estándar.

**Instantánea del caso** — H2 `UNA NOCHE DE NOVIEMBRE`
`02:14` Haz perimetral activado en un complejo de construcción en Salford. `02:15` El operador sacó el alimento e identificó a tres individuos cerca de un almacén de plantas. `02:16` Desafío de audio emitido por los parlantes del sitio. Dos se marcharon inmediatamente. `02:31` Oficial de patrulla en el lugar, el tercer individuo se fue, no se llevaron ninguna planta, un candado dañado. Informe escrito con imágenes fijas emitidas a las 03:40.

**Formulario de encuesta** — Empresa / Nombre de contacto / Correo electrónico / Teléfono / Tipo de sitio / ¿Qué está tratando de proteger? → [Botón] `Solicitar una encuesta del sitio`
Nota: `Las encuestas son gratuitas, duran aproximadamente una hora y le informaremos si necesita menos de lo que cree.`

**Pie de página** — VANTAGE SECURITY · `Sala de control con personal las 24 horas, los 7 días de la semana, los 365 días del año` · `Unidad 4, Trafford Point, Manchester M17 1AB` · `0161 555 0100` · Contratista aprobado por SIA #ACS-0084412 · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
