# Ridgeway Tree Care - Aviso del sitio web de arbolistas y servicios de árboles

## 1. Declaración de objetivos
Crear un sitio web de arboricultura creíble y seguro para **Ridgeway Tree Care**, definido por un dosel verde profundo, corteza marrón y un humanista robusto sin un sitio de cirugía de árboles que lidera con calificaciones y conocimiento de TPO en lugar de una fotografía de un hombre en un cerezo. picker.

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(60, 20%, 96%);       /* #f7f7f1 pale bark */
  --foreground: hsl(140, 24%, 14%);      /* #1b2e21 canopy ink */
  --primary: hsl(140, 36%, 26%);         /* #2a5a3b canopy green */
  --primary-foreground: hsl(60, 20%, 97%);
  --muted-foreground: hsl(140, 6%, 44%);
  --border: hsl(56, 14%, 86%);
  --card: hsl(60, 22%, 92%);
  --accent-bark: hsl(26, 34%, 38%);      /* bark brown */
  --accent-hivis: hsl(72, 88%, 52%);     /* safety hi-vis */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Signika:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Signika 700, clamp(38px, 5vw, 68px), espacio entre letras -0.02em
- **H2:** Signika 600, 30–44px
- **H3:** Signika 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1,74
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0,18em, 11px, verde dosel
- **Precios/alturas/diámetros:** Signika 700, tabular-nums

## 5. Efectos visuales

**Efecto 1: selector de trabajo de árbol con un árbol SVG en crecimiento.** Cinco tipos de trabajo: reducción de copa, elevación de copa, adelgazamiento, desmoche, tala, donde al seleccionar uno se transforma un diagrama de árbol SVG simple para mostrar el resultado, junto con una descripción de cuándo es apropiado y el precio típico. banda. Le enseña al cliente el vocabulario que necesita para describir el trabajo.

```tsx
const works = [
  { id: 'reduction', name: 'Crown reduction', path: TREE_REDUCED,  when: 'Tree is outgrowing its space but is healthy',      price: '£450–£900' },
  { id: 'lift',      name: 'Crown lift',      path: TREE_LIFTED,   when: 'Low branches blocking light, a path or a driveway', price: '£280–£550' },
  { id: 'thin',      name: 'Crown thinning',  path: TREE_THINNED,  when: 'Dense canopy casting heavy shade',                  price: '£380–£750' },
  { id: 'pollard',   name: 'Pollarding',      path: TREE_POLLARD,  when: 'Established pollard being maintained on cycle',     price: '£350–£700' },
  { id: 'fell',      name: 'Felling',         path: TREE_STUMP,    when: 'Dead, dangerous, or genuinely no alternative',      price: '£600–£1,800' },
];
const [sel, setSel] = useState('reduction');
const w = works.find(x => x.id === sel);

<motion.path
  d={w.path}
  fill="var(--primary)"
  animate={{ d: w.path }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

**Efecto 2: chips de credenciales de alta visibilidad.** Chips de calificación (unidades NPTC, Arb Association, seguros) dibujados como pequeñas píldoras con contornos de alta visibilidad que aparecen con un ligero resorte, el único color saturado en un entorno que de otro modo sería natural. paleta.

## 6. Desglose de componentes

1. **Barra de navegación**: 74 px, pegajosa, corteza pálida, borde inferior de 1 px. Marca denominativa de árbol a la izquierda, centro de enlaces, teléfono y botón verde "Cotización gratuita" a la derecha.
2. **Héroe**: fotografía de dosel con sangrado completo y 84 vh con un degradado inferior. Ceja, H1, sublínea, dos CTA, cuatro chips de credenciales. *Imagen: un roble maduro en un gran jardín fotografiado desde abajo a través del dosel, luz moteada y verdes intensos.*
3. **Franja de emergencia**: una banda delgada para daños por tormentas y árboles peligrosos, con un número de 24 horas, diseñada en color marrón corteza en lugar de rojo para que no parezca un susto.táctica.
4. **Selector de trabajo de árbol**: la pieza central educativa (Efecto 1).
5. **Todos los servicios** — Cuadrícula 2x4: trabajo de copas, tala y desmantelamiento, destoconado, corte de setos, tala de madera muerta, plantación, llamadas de emergencia y estudios de árboles.
6. **Cualificaciones y seguro**: la sección de fideicomiso: unidades de NPTC mantenidas, membresía de la Asociación Arb, figura de responsabilidad pública, responsabilidad del empleador y una nota de que los certificados se muestran a pedido.
7. **TPO y áreas de conservación**: la sección que demuestra experiencia: qué significa una Orden de preservación de árboles, el período de notificación de seis semanas y una declaración explícita de que la empresa maneja las solicitudes.
8. **Qué sucede en el día**: cinco puntos que cubren el acceso, la protección del césped, las horas de ruido y lo que sucede con los surgimiento.
9. **Madera y astillas**: venta de troncos curados y astillas de madera gratis para los jardineros, lo cual es a la vez una línea de ingresos y una razón para agradar a nivel local.
10. **Trabajo reciente**: tres trabajos con la especie, el trabajo realizado y cuánto tiempo llevó.
11. **Solicitud de cotización**: formulario con dirección, especie de árbol si se conoce y una nota para cargar una foto.
12. **Pie de página**: dosel verde, cuatro columnas, número de Asociación Arb, detalles del seguro, área de cobertura.

## 7. Animaciones
- Hero: la imagen escala de 1,05 a 1 en 13 segundos; H1 se desvanece 0,8 s; los chips de credenciales aparecen escalonados 0,08 s con un resorte 
- Diagrama de árbol: la ruta SVG se transforma en 0,6 s al seleccionarla; descripción y precio fade-swap 0.25s
- Tarjetas de servicio: fade-up escalonado 0.07s; al pasar el cursor, se levanta un borde verde de 1 px
- Sección TPO: la cifra del período de aviso cuenta desde cero
- Filas de trabajo recientes: se desvanecen escalonadas 0.08s
- El movimiento está restringido: esta es una operación crítica para la seguridad y no debe parecer juguetona

## 8. Responsive
- **Móvil (<768px):** hamburguesa con un botón de tocar para llamar; H1 se fija a 38 px; el selector de trabajo se convierte en una fila de chips desplazable horizontalmente con el diagrama y la descripción debajo; servicios 1-col; los chips de credenciales se envuelven en dos filas; `Cotización gratuita` fijada como una barra inferior adhesiva.
- **Tableta:** servicios de 2 columnas, selector de trabajomantiene el diagrama de lado a lado.
- **Escritorio:** ancho máximo 1160px, `px-16`, `py-22`.

## 9. Copia completa

**Marca:** RIDGEWAY TREE CARE · Arboricultura · Surrey y West Sussex

**Navbar:** Árbol de trabajo · Servicios · Cualificaciones · OPC · Trabajo reciente · `01483 555 0171` · [Botón] Cotización gratuita

**Hero**
- Ceja: `SURREY & WEST SUSSEX · NPTC CALIFICADO · ASOCIACIÓN ARB APROBADO · DESDE 2009`
- H1: `Preferimos podarlo que quitarlo.`
- Sublínea: `Arboristas calificados que cubren Surrey y West Sussex. Trabajo de copas, tala, trituración de tocones e inspecciones de árboles, y la documentación para las Órdenes de Preservación de Árboles la manejamos nosotros en lugar de dejarla con usted. `Responsabilidad del empleador de £10 millones`

**Franja de emergencia:** `¿Daños por tormenta o un árbol que le preocupa? Llamada las 24 horas al 01483 555 0171.`

**Selector de trabajo de árbol** — Ceja `EL TRABAJO` — H2 `Qué significan realmente los diferentes trabajos`
1. **Reducción de copa: £450 a £900**: reduce el tamaño total de la copa manteniendo la forma natural del árbol. Apropiado cuando un árbol sano está superando su espacio. Nunca más de un treinta por ciento de una sola vez.
2. **Elevación de corona: £280 a £550**: quitar las ramas más bajas para elevar el dosel. Para iluminar un jardín, espacio libre sobre un camino o un camino de entrada. Suele ser la forma más económica de solucionar un problema de sombreado.
3. **Adelgazamiento de la copa: £380 a £750**: eliminación selectiva de ramas dentro del dosel para dejar pasar la luz y el viento sin cambiar el contorno. Bueno para especies densas como sicómoro y tilo.
4. **Desmoche: £350 a £700**: Recorte a un punto de trasmopado anterior en un ciclo establecido. No empezaremos un nuevo trasmocho en un árbol maduro que nunca ha tenido uno, porque suele matarlo.
5. **Tala: entre £600 y £1800**: muerto, peligroso o realmente sin alternativa. Precios por tamaño, acceso y lo que tiene que pasar con la madera. Siempre la última opción y lo diremos si pensamos en reducción.haría.

**Todos los servicios**
1. **Trabajo de corona**: reducción, elevación, adelgazamiento y remodelación según el estándar BS3998.
2. **Tala y desmontaje** — Desmontaje seccional donde no existe zona de descenso segura, con aparejo y descenso.
3. **Remolcado de tocones**: rectificado de 200 a 300 mm por debajo del nivel del suelo, rellenado con material triturado o retirado por £60.
4. **Corte de setos** — Recorte, remodelación y reducción, con control de la temporada de anidación entre marzo y agosto.
5. **Deadwooding** — Eliminación de ramas muertas, moribundas y cruzadas. A menudo, el único trabajo que necesita un árbol maduro.
6. **Plantación de árboles**: selección de especies para el sitio real, suministro, plantación y tres años de poda formativa.
7. **Llamada de emergencia**: Daños por tormentas y árboles peligrosos, veinticuatro horas, con puesta a salvo primero y limpieza después.
8. **Estudios de árboles**: estudios BS5837 para aplicaciones de planificación e informes de hipotecas o seguros sobre reclamaciones por hundimientos.

**Cualificaciones y seguros**: H2 `Las partes sobre las que la gente debería preguntar y normalmente no preguntan`
`Todo escalador tiene NPTC CS30, CS31, CS38 y CS39 como mínimo. Dos miembros del equipo tienen el Diploma de Nivel 4 en Arboricultura. Somos contratistas aprobados por la Asociación Arb, lo que requiere una auditoría completa cada tres años que cubra la calidad del trabajo, los sistemas de seguridad y las prácticas comerciales. `
`Responsabilidad pública £10 millones, responsabilidad del empleador £10 millones. Le enviaremos ambos certificados por correo electrónico con su cotización sin que se lo soliciten, y si alguna empresa de árboles duda cuando solicita el suyo, eso le indicará lo que necesita saber.`

**TPO y áreas de conservación** — H2 `Si el árbol está protegido, lo manejamos`
`Una orden de preservación de árboles significa que necesita el consentimiento por escrito del consejo antes de cualquier trabajo, y hacerlo de todos modos conlleva una multa ilimitada. Las áreas de conservación son diferentes: no se necesita consentimiento, pero sí una notificación por escrito al consejo con seis semanas de antelación, durante las cuales pueden presentar una TPO.`
`Verificamos la designación antes de cotizar, preparamos y presentamos la solicitud o notificación, y tratamos directamente con el oficial de árboles. Agrega de seis a ocho semanas al cronograma y nadaa tu factura.`

**Qué sucede en el día**
1. **Acceso** — Necesitamos una ruta para las trituradoras y un lugar para estacionar el camión. Si el acceso es limitado lo habremos visto en la cotización y le hemos puesto precio.
2. **Protección del jardín**: las tablas de protección del suelo en el césped y cualquier elemento frágil se movieron antes de comenzar en lugar de solucionarlo.
3. **Ruido**: motosierras y astilladoras entre las 8 a. m. y las 5 p. m. de lunes a viernes, y los sábados de 8 a. m. a 1 p. m. Primero llamamos a las puertas de los vecinos.
4. **Los surgimiento**: desconchados y retirados como estándar. Dinos la palabra y te dejamos la astilla para tus camas, o cortamos la madera en rollos para tu almacén de troncos.
5. **Ordenar** — Soplado y rastrillado antes de irnos. No debería poder saber dónde estaba la trituradora.

**Madera y astillas** — `Troncos de madera dura curada, £95 el metro cúbico entregados en un radio de diez millas, prueba de humedad inferior al veinte por ciento. Astillas de madera gratis para cualquiera que las desee: traiga un remolque o entregaremos una carga localmente por el costo del recorrido.`

**Trabajo reciente**
1. **Haya madura, reducción de copa** — Godalming — Reducción del 25 % en dos días, consentimiento de TPO obtenido en cinco semanas.
2. **Dos Leylandii, tala y molienda de tocones** — Horsham — Desmantelamiento seccional sobre un invernadero, un día, tocones molidos esa misma tarde.
3. **Roble veterano, tala de madera muerta y estudio** — Cranleigh — Estudio BS5837 para una solicitud de planificación más madera muerta, medio día.

**Solicitud de cotización** — Formulario: Nombre / Dirección o código postal / Teléfono / ¿Qué es el árbol y cuál es la preocupación? / Subir fotos → [Botón] `Solicita una cotización gratuita`
Nota: `Las fotografías ayudan enormemente. Incluye uno de lejos mostrando todo el árbol y otro de la base. La mayoría de las cotizaciones llegan dentro de dos días hábiles, y visitamos antes de cotizar algo superior a £500.`

**Pie de página** — RIDGEWAY TREE CARE · `Preferimos podarlo que desmontarlo.` · `01483 555 0171` · Contratista aprobado por la Asociación Arb 4210 · £10 millones de responsabilidad pública y del empleador · Cubre Surrey y West Sussex · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
