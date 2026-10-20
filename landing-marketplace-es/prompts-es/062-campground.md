# Hollow Pines — Aviso del sitio web de campamentos y glamping

## 1. Declaración de objetivos
Construir un campamento cálido y con aroma a humo de leña y un sitio web de glamping para **Hollow Pines**, definido por un verde bosque profundo, un naranja brasa y un exterior redondeado sin: un sitio construido alrededor de un selector de tipo de terreno e información honesta sobre cuál es realmente el terreno. like.

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(40, 34%, 95%);       /* #f7f2e7 canvas */
  --foreground: hsl(150, 26%, 13%);      /* #192a22 forest ink */
  --primary: hsl(150, 34%, 24%);         /* #28513f forest green */
  --primary-foreground: hsl(40, 34%, 97%);
  --muted-foreground: hsl(150, 8%, 44%);
  --border: hsl(38, 18%, 85%);
  --card: hsl(40, 36%, 91%);
  --accent-ember: hsl(20, 82%, 54%);     /* fire orange */
  --deep: hsl(150, 30%, 11%);            /* night sections */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Bricolage Grotesque 700, clamp(40px, 5.6vw, 82px), espacio entre letras -0.02em
- **H2:** Bricolage Grotesque 600, 32–48px
- **H3:** Bricolage Grotesque 600, 18–22px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.74
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.2em, 11px, ember
- **Precios / capacidades:** Bricolage Grotesque 700, tabular-nums

## 5. Efectos visuales

**Efecto 1: selector de tipo de parcela.** Cinco tarjetas de parcela: tienda de campaña, conexión eléctrica, autocaravana, tienda de campaña, cabina, donde al seleccionar una se intercambia una descripción. un recuento de noches, una lista de instalaciones y un precio por noche, y filtra el calendario de disponibilidad a continuación. 

```tsx
const pitches = [
  { id: 'tent',   name: 'Tent pitch',       sleeps: 6, price: 24, note: 'Grass, no hookup, fire pit allowed' },
  { id: 'hookup', name: 'Electric pitch',   sleeps: 6, price: 34, note: '16A hookup, hardstanding edge' },
  { id: 'van',    name: 'Campervan pitch',  sleeps: 4, price: 38, note: 'Hardstanding, hookup, grey waste point' },
  { id: 'bell',   name: 'Bell tent',        sleeps: 4, price: 95, note: 'Furnished, beds made, wood burner' },
  { id: 'cabin',  name: 'Cabin',            sleeps: 5, price: 140, note: 'Insulated, kitchenette, private shower' },
];
const [sel, setSel] = useState('tent');
const p = pitches.find(x => x.id === sel);

<AnimatePresence mode="wait">
  <motion.div key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.28 }}>
    <h3 className="font-display text-3xl">{p.name}</h3>
    <p className="mt-2 text-[var(--muted-foreground)]">Sleeps {p.sleeps} · {p.note}</p>
    <p className="mt-4 font-display text-4xl tabular-nums">£{p.price}<span className="text-base"> per night</span></p>
  </motion.div>
</AnimatePresence>
```

**Efecto 2: Brillo de brasas en la sección nocturna.** La sección de fogata y observación de estrellas se encuentra en `--deep` con un suave gradiente radial de brasas detrás del título, oscilando lentamente la opacidad entre 0,15 y 0,28 durante seis segundos, desactivado en movimiento reducido.

## 6. Desglose de componentes

1. **Barra de navegación**: 74 px, adhesivo, lienzo con desenfoque, borde inferior de 1 px al desplazarse. Marca denominativa de pino a la izquierda, enlaces en el centro, botón de brasa "Verificar disponibilidad" a la derecha.
2. **Héroe**: fotografía de bosque de 90 vh, sin bordes, con un lienzo degradado en la parte inferior. Ceja, H1, sublínea, dos CTA, cuatro puntos prácticos. *Imagen: tiendas de campaña levantadas entre altos pinos en la hora dorada, humo de leña en el aire, luz cálida y tenue, fotografía relajada al aire libre.*
3. **Franja de temporada**: banda delgada que muestra la temporada abierta, la nota meteorológica actual y una línea "Reserve directamente y ahorre la tarifa de reserva".
4. **Selector de tono**: la interacción principal (efecto 1) con una reservaCTA.
5. **El sitio**: un mapa del sitio dibujado a mano con zonas numeradas y una breve descripción de cada una: pradera, bosque, campo de furgonetas, glamping row y el bloque de instalaciones.
6. **Instalaciones** — Cuadrícula de íconos de 2x4: duchas con agua caliente, platos, lavandería, agua potable, puntos de desechos, alquiler de fogones, leña y leña, campo para perros.
7. **Información honesta**: la sección que distingue a este sitio: cómo es el suelo cuando llueve, qué distancia hay que recorrer hasta las duchas, si funciona la señal del teléfono y a qué hora se hace el silencio.
8. **Fogata y observación de estrellas**: sección nocturna (Efecto 2) con reglas de fuego, precio de la madera y una nota sobre la designación de cielo oscuro.
9. **Qué hay cerca**: cuatro paseos y tres pubs con distancias y tiempos difíciles para caminar.
10. **Reglas**: una lista sencilla que cubre horarios de llegada, ruido, perros, grupos de un solo sexo y cancelaciones.
11. **Disponibilidad y reservas**: calendario filtrado por tipo de parcela con nota de estancia mínima.
12. **Pie de página**: bosque profundo, cuatro columnas, dirección, ubicación de what3words, horario de contacto estacional.

## 7. Animaciones
- Hero: la imagen escala `1,05 → 1` en 12 segundos; H1 se desvanece 0.8s
- Tarjetas de presentación: la tarjeta seleccionada obtiene un borde de brasa de 2px y levanta `-4px`; intercambios de panel de detalles con AnimatePresence, 0,28 s
- Zonas del mapa del sitio: los pines numerados aparecen `scale 0 → 1` con un escalonamiento de 0,1 s cuando el mapa entra en la vista
- Iconos de instalaciones: desvanecimiento escalonado 0,05 s
- Resplandor de ascuas: oscilación de opacidad 0,15 ↔ 0,28 durante 6 s, movimiento reducido seguro
- Lista cercana: las filas se desvanecen escalonadas 0,06 s

## 8. Responsive
- **Móvil (<768px):** hamburguesa; H1 se fija a 40 px; el selector de tono se convierte en una fila de tarjetas desplazable horizontalmente con el panel de detalles debajo; el mapa del sitio se convierte en una lista de zonas verticales con la imagen del mapa de arriba; instalaciones 2-col; `Verificar disponibilidad` fijado como una barra inferior adhesiva.
- **Tableta:** tarjetas de presentación 3+2, instalaciones de 4 columnas, cerca de 2 columnas.
- **Escritorio:** ancho máximo 1180 px, `px-16`, `py-22`.

## 9. Completo Copy

**Marca:** HOLLOW PINES · Camping y glamping · Snowdonia edge, NorteGales

**Navbar:** Parcelas · El sitio · Instalaciones · Cerca · Reglas · [Botón] Comprobar disponibilidad

**Hero**
- Ceja: `GALES DEL NORTE · 42 PARCELAS · ABIERTO DE MARZO A OCTUBRE · SITIO DARK SKY`
- H1: `Humo de leña, ríos fríos y sin wifi en el campo.`
- Sublínea: `Un camping de cuarenta y dos parcelas en las afueras de Snowdonia, con parcelas de césped, de superficie dura para furgonetas, cuatro tiendas de campaña y dos cabañas. Fuegos permitidos, perros bienvenidos, duchas calientes.`
- CTAs: `Consultar disponibilidad` · `Ver las parcelas`
- Puntos: `Fuegos permitidos` · `Perros bienvenidos` · `Duchas calientes` · `Sitio con cielo oscuro`

**Franja de temporada:** `Abierto del 14 de marzo al 26 de octubre · Reserva directa y salta la reserva tarifa`

**Parcelas**
- **Parcela para tienda: 24 £ por noche** - Capacidad para 6 personas · Césped, sin conexión, se permite fogata · Coche al lado de la tienda en la mayoría de las parcelas
- **Parcela eléctrica: 34 £ por noche** - Capacidad para 6 personas · Conexión 16A, borde rígido, hoguera permitido
- **Parcela para autocaravana — £38 por noche** — Capacidad para 4 · Piso, conexión de 16 A, punto de desagüe gris en el campo
- **Tienda tipo campana — £95 por noche** — Capacidad para 4 · Amueblado, camas hechas, estufa de leña, alfombras y linternas · Mínimo dos noches
- **Cabina — £140 por noche** — Capacidad para 5 personas · Aislamiento, cocina pequeña, ducha y retrete privados, terraza · Mínimo de dos noches

**El sitio** — H2 `Cinco campos y un arroyo`
1. **The Meadow**: césped abierto, ideal para grupos y familias, el más cercano al área de juegos y el campo más ruidoso a cierta distancia.
2. **The Woodland** — Doce parcelas entre pinos. Sombreado, protegido, más silencioso y un poco más difícil de colocar clavijas.
3. **The Van Field**: catorce canchas sólidas con conexiones, niveladas y una separación de cinco metros entre camionetas.
4. **Glamping Row**: cuatro tiendas de campaña y dos cabañas en el borde superior con la mejor vista del valle.
5. **Bloque de instalaciones**: central para todo. Nada en el sitio está a más de ciento cuarenta metros de una ducha caliente.

**Instalaciones** — `Duchas calientes, 20p durante 6 minutos` · `Lavabos cubiertos` · `Lavandería, £4 por carga` · `Agua potablepuntos en cada campo` · `Eliminación de residuos químicos y grises` · `Alquiler de fogatas, £8` · `Leños £6, leña £3` · `Campo para perros cercado`

**Información honesta** — H2 `Cosas que nos gustaría saber antes de reservar`
1. **El suelo después de una fuerte lluvia** — La pradera drena bien. El bosque se vuelve suave después de dos días de lluvia y lo trasladaremos en lugar de dejar que se quede atrapado.
2. **¿A qué distancia están las duchas?** — La caminata más larga hasta el lugar es de unos ciento cuarenta metros, desde la esquina más alejada del campo de furgonetas.
3. **¿Hay señal de teléfono?** — Parcial. EE funciona en la mayor parte del sitio, en la mayoría de los demás no. Hay wifi gratuito en recepción y deliberadamente en ningún otro lugar.
4. **¿Cuándo se hace el silencio?** — La música se apaga a las diez, el silencio a las once, y lo hacemos cumplir. Si desea un sitio para fiestas, sinceramente, no lo somos.
5. **¿Podemos traer al perro?** — Sí, dos por parcela, 4 £ cada uno por estancia. Hay un campo cercado para correr sin correa y los perros deben estar atados en todos los demás lugares.

**Fogata y observación de estrellas** — H2 `Se permiten fogatas. Correctamente.`
`Cada campo de césped puede tener un fogón en un fogón elevado, que alquilamos por ocho libras por estancia. Los troncos pesan seis libras el neto y la leña tres, ambos provenientes de una plantación a nueve millas de distancia. Se apaga a medianoche y nunca directamente sobre el césped.`
`Estamos sentados dentro de una reserva Dark Sky. En una noche clara y sin luna se puede ver la Vía Láctea a simple vista desde lo alto del campo de furgonetas, y la iluminación del sitio es deliberadamente baja y orientada hacia abajo para mantenerla así. la puerta, a pie, 40 minutos` · `Cumbre Moel Wnion, desde la puerta, 3 horas`
Pubs: `The Bull, 1,4 millas, comida hasta las 9` · `Ty Gwyn, 2,8 millas, admite perros` · `The Slaters Arms, 4 millas, la mejor pinta local`

**Reglas**
`Llegada de 13:00 a 20:00 horas · Salida antes de las 11:00 horas · Música apagada a las 22:00 horas, silencio a partir de las 23:00 horas · Dos perros por parcela, con correa, excepto en el campo para perros · Fuegos solo en fosos alquilados, apagado a medianoche · No se permiten grupos de más de cuatro personas de un solo sexo, lo siento, esto lo aprendimos elmanera difícil · Cancelación gratuita hasta 14 días antes, 50% hasta 7 días, no reembolsable después de eso`

**Pie de página** — HOLLOW PINES · `Humo de leña, ríos fríos y sin wifi en el campo.` · `Hollow Pines, Bethesda, Gwynedd LL57 3LX` · what3words: `pines.hollow.stream` · `01248 555 0161` · Recepción de 9 a 20 horas en temporada · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "react-day-picker": "^9.0.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
