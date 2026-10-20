# Odd Jobs Co. - Aviso del sitio web de Handyman

## 1. Declaración de objetivos
Cree un sitio web de personal de mantenimiento amigable y que se pueda reservar de inmediato para **Odd Jobs Co.**, definido por papel cálido, una señal naranja segura y un sans práctico y redondeado, creado alrededor de un selector de trabajos con tarifas reales por hora y de precio fijo, porque toda la categoría pierde clientes para "contactarnos para un quote".

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(40, 30%, 97%);       /* #faf7f1 warm paper */
  --foreground: hsl(220, 22%, 17%);      /* #222834 */
  --primary: hsl(22, 90%, 52%);          /* #f56717 signal orange */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(220, 8%, 46%);
  --border: hsl(38, 16%, 88%);
  --card: hsl(40, 32%, 93%);
  --accent-blue: hsl(210, 62%, 42%);     /* trust marker */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Figtree 800, clamp(36px, 4.8vw, 64px), espacio entre letras -0.03em
- **H2:** Figtree 700, 30–42px
- **H3:** Figtree 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.74
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.18em, 11px, naranja
- **Precios y duraciones:** Figtree 800, tabular-nums

## 5. Efectos visuales

**Efecto 1: selector de trabajos con total acumulado.** Una cuadrícula de trabajos comunes como tarjetas alternables, cada una con un precio fijo y una duración típica. Al seleccionar varias compilaciones se obtiene un total acumulado y una duración estimada de la visita, de modo que un cliente pueda organizar una mañana de trabajo y ver el costo antes de contactar a alguien. 

```tsx
const jobs = [
  { id: 'tv',     label: 'Mount a TV',            price: 65,  mins: 60 },
  { id: 'shelf',  label: 'Put up shelves',        price: 45,  mins: 45 },
  { id: 'flat',   label: 'Flat-pack furniture',   price: 55,  mins: 60 },
  { id: 'tap',    label: 'Replace a tap',         price: 70,  mins: 60 },
  { id: 'door',   label: 'Ease a sticking door',  price: 40,  mins: 30 },
  { id: 'seal',   label: 'Reseal a bath',         price: 60,  mins: 60 },
];
const [picked, setPicked] = useState([]);
const total = picked.reduce((s, id) => s + jobs.find(j => j.id === id).price, 0);
const mins = picked.reduce((s, id) => s + jobs.find(j => j.id === id).mins, 0);

<motion.div layout className="sticky bottom-4 rounded-2xl bg-[var(--foreground)] px-6 py-4 text-white">
  <motion.span key={total} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
    {picked.length} jobs · about {Math.round(mins / 60 * 10) / 10} hours · <strong className="tabular-nums">£{total}</strong>
  </motion.span>
</motion.div>
```

**Efecto 2: icono emergente de la caja de herramientas.** Cada tarjeta de trabajo lleva un pequeño icono de línea que escala de 0,7 a 1 con un ligero resorte de sobrepaso cuando la tarjeta aparece a la vista, escalonada en la cuadrícula: suficiente personalidad sentirse humano sin volverse caricaturesco.

## 6. Desglose de componentes

1. **Barra de navegación**: 70 px, papel adhesivo y cálido, borde inferior de 1 px. Marca denominativa a la izquierda, centro de enlaces, teléfono y pastilla naranja "Reservar una ranura" a la derecha.
2. **Héroe**: dividido, texto a la izquierda, imagen a la derecha. Ceja, H1, sublínea, dos CTA, cuatro puntos de confianza. *Imagen: un operario con ropa de trabajo arreglando las bisagras de un armario en una cocina doméstica luminosa, con luz natural, sincero y competente.*
3. **Franja de disponibilidad**: los siguientes tres espacios disponibles con fechas y ventanas de medio día, lo que convierte mucho mejor que un formulario de contacto genérico.
4. **Selector de trabajos**: la interacción principal (Efecto 1) con un total acumulado fijo y "Reservar estos trabajos".CTA.
5. **Tarifas**: tarifas por hora, medio día y día completo indicadas claramente, además del mínimo de llamadas y lo que cuenta como materiales.
6. **Lo que hacemos y lo que no hacemos**: dos columnas honestas. La segunda columna, que enumera el gas, la electricidad notificable y los trabajos estructurales, genera más confianza que cualquier insignia.
7. **Cómo funciona la reserva**: cuatro pasos que incluyen la confirmación por mensaje de texto el día anterior y cómo se realiza el pago.
8. **Cobertura**: una lista de áreas con viajes incluidos y una nota sobre el pequeño cargo adicional.
9. **Materiales**: cómo se manejan los materiales: costo más nada, recibos proporcionados o suministre los suyos propios.
10. **Reseñas**: tres citas, cada una de las cuales menciona el trabajo real realizado.
11. **Formulario de reserva**: descripción del trabajo, medio día preferido, dirección y nota para cargar una foto.
12. **Pie de página** — pizarra oscura, tres columnas, cifra de responsabilidad pública, nota de DBS, contacto.

## 7. Animaciones
- Héroe: el texto se desvanece 0,6 s; la imagen sube y se desvanece, 0.8s
- Ranuras de disponibilidad: desvanecimiento escalonado 0.08s
- Tarjetas de trabajo: los íconos aparecen con un resorte de exceso escalonado 0.04s; la tarjeta seleccionada obtiene un borde naranja de 2px y se levanta 3px
- Total acumulado: se vuelve a montar y se desvanece con cada cambio, 0,22 s; la barra en sí usa animación de diseño a medida que crece
- Listas de cosas que hacer y no hacer: los íconos de marca y cruz aparecen escalonados 0.05s
- Todo es rápido y amigable: resortes en lugar de facilidades largas

## 8. Responsive
- **Móvil (<768px):** hamburguesa con una botón de tocar para llamar; la imagen cae debajo del texto; H1 se fija a 36px; selector de trabajos de 2 columnas con el total acumulado fijado como barra inferior; la tabla de tarifas se convierte en filas apiladas; Las columnas de hacer y no hacer se apilan con la lista de no hacer en segundo lugar.
- **Tableta:** selector de trabajos de 3 columnas, el héroe permanece dividido.
- **Escritorio:** selector de trabajos de 3 columnas en tarjetas más anchas, ancho máximo 1120px, `px-16`, `py-20`.

## 9. Completo Copia

**Marca:** ODD JOBS CO. · Servicios de mantenimiento · Bristol y Bath

**Navbar:** Empleos y precios · Tarifas · Qué hacemos · Cobertura · Reseñas · `0117 555 0157` · [Botón] Reservar un espacio

**Hero**
- Ceja:`BRISTOL & BATH · PRECIOS FIJOS · DBS COMPROBADO · £2M ASEGURADO`
- H1: `La lista en el refrigerador. Hecho el jueves.`
- Sublínea: `Una persona, una camioneta completa y precios fijos para los trabajos que todos posponen. Elige lo que necesitas, mira el total, reserva medio día. Sin cotizaciones, sin devoluciones de llamadas, sin esperar a alguien que no aparece.`
- CTA: `Seleccionar mis trabajos` · `Ver tarifas`
- Puntos de confianza: `Precios fijos` · `DBS verificado` · `Responsabilidad pública de £ 2 millones` · `Texto antes de la llegada`

**Banda de disponibilidad:** `Próximos espacios: jueves por la mañana · Jueves por la tarde · Lunes por la mañana`

**Selector de trabajos** — Ceja `ELIGE TUS TRABAJOS` — H2 `Precios fijos para los sospechosos habituales`
- **Montar un televisor** — £65 · aproximadamente 1 hora — Hasta 65 pulgadas en una pared sólida o con vigas, cables ordenados en canales.
- **Colocar estantes** — £45 · aproximadamente 45 minutos: por recorrido de hasta 2 metros, incluye encontrar los montantes correctamente. 
- **Muebles de paquete plano**: £55 · aproximadamente 1 hora: por artículo hasta un armario doble. Traiga las instrucciones, las ignoraré cortésmente.
- **Reemplazar un grifo** — £70 · aproximadamente 1 hora — Cocina o lavabo, intercambio similar, válvulas de aislamiento instaladas si faltan.
- **Aliviar una puerta atascada** — £40 · aproximadamente 30 minutos — Cepillado, vuelto a colgar o ajustar las bisagras, lo que realmente sea necesidades.
- **Volver a sellar una bañera o ducha** — £60 · aproximadamente 1 hora — La silicona vieja se despegó correctamente, por eso dura.
- **Cuelgue una puerta** — £95 · aproximadamente 2 horas — Incluyendo bisagras, manija y pestillo.
- **Coloque persianas o postes de cortinas** — £45 · aproximadamente 45 minutos — Por ventana.
- **Rellene y retoque yeso** — £50 · aproximadamente 1 hora — Pequeños agujeros y grietas, listos para pintar.
- **Coloque una alarma de humo** — £35 · aproximadamente 20 minutos — Tipo de batería, colocada correctamente en lugar de donde sea conveniente.
- **Limpiar un desagüe bloqueado** — £55 · aproximadamente 45 minutos — Fregadero, lavabo o baño. No desagüe afuera.
- **Montar una cama** — £65 · aproximadamente 1 hora — Incluyendo los listones que nadie puede enfrentar.

**Tarifas** — Ceja `TARIFAS` — H2 `Si tu trabajo no está en la lista`
`Por hora £42, mínimo una hora · Medio día, cuatro horas £145 · Completodía, ocho horas £ 270 · La llamada se incluye dentro del área de cobertura, no se agrega en la parte superior.`
`Si demora menos tiempo del cotizado, paga menos. Esto es inusual en este oficio y es deliberado.`

**Lo que hacemos y lo que no hacemos**
Hacer: `Reparaciones de carpintería y ebanistería` · `Montaje de muebles` · `Estanterías, montaje y suspensión` · `Plomería básica: grifos, sifones, sellos, válvulas de aislamiento` · `Electricidad básica: enchufes, interruptores y luces similares accesorios` · `Relleno, lijado y pequeñas reparaciones de yeso` · `Instalación de cerraduras, manijas y bisagras` · `Paquetes planos, persianas, postes y rieles` · `Pequeñas renovación de azulejos y lechada` · `Reparaciones de paneles de cercas y portones`
 No: `Trabajos con gas de ningún tipo; necesita un ingeniero de Gas Safe y yo no lo soy` · `Trabajos eléctricos notificables: circuitos nuevos, unidades de consumo, cualquier cosa en un zona de baño` · `Trabajos estructurales: eliminación de paredes, dinteles, cualquier elemento que soporte carga` · `Trabajos en techos por encima de la altura de un solo piso` · `Amianto, en cualquier forma, siempre`
Nota: `La segunda lista es más larga de lo que la mayoría de los operarios admiten. Hacer un trabajo para el que no estás calificado es la forma en que las personas se lastiman y las reclamaciones de seguros se rechazan.`

**Cómo funciona la reserva**
1. **Elija sus trabajos**: utilice la lista anterior o descríbala en el formulario si es inusual.
2. **Elija medio día**: la mañana es de 8 a. m. a 12:30 p. m. y la tarde, de 1 p. m. a 5:30 p. m. Obtiene una ventana de medio día, no de nueve horas.
3. **Envié un mensaje de texto el día anterior**: confirmo el horario y aproximadamente la hora dentro del mismo, para que no tengas que esperar desde las ocho.
4. **Pago después** — Tarjeta, transferencia bancaria o efectivo, el mismo día, una vez hayas visto la obra. Sin depósito para trabajos domésticos.

**Cobertura** — `Bristol BS1 a BS16, Bath BA1 y BA2, Keynsham, Portishead, Nailsea y Thornbury. Los viajes están incluidos en ellos. Más allá de ellos, £ 0,45 por milla desde BS5, y le diré la cifra antes de reservar en lugar de agregarla a la factura. `

**Materiales** — `Llevo los consumibles habituales (tornillos, fijaciones, silicona, relleno, tacos) y están incluidos. Cualquier cosa más grande, la compro al precio de coste y te entrego el recibo sin recargos, o la compras tú mismo y yo la instalo. Ambosestán bien y ninguno te cuesta más.`

**Reseñas**
1. `Cuatro cosas en la lista que estaban allí desde marzo. Todo hecho en una mañana y se llevó el embalaje.` — **Rachel M.**, Bristol BS6: soporte para TV, dos estantes, una puerta adhesiva y un sello para baño
2. `Me dijo directamente que el enchufe que quería mover era un trabajo de declaración obligatoria y me dio el número de Sparky. Luego hice las otras cinco cosas.` — **Ade O.**, Bath BA2 — Varios
3. `Cotizado media jornada, terminada en tres horas, me cobraron tres horas. Ni siquiera pregunté.` — **Kirsty L.**, Keynsham — Paquete plano y persianas

**Formulario de reserva** — Nombre / Dirección o código postal / Teléfono / Qué trabajos, o describirlo / Medio día preferido / Carga de fotos → [Botón] `Reservar este espacio`
Nota: `Las fotos realmente ayudan, especialmente para cualquier tema relacionado con plomería o puertas. Significa que llego con la pieza correcta en lugar de hacer un segundo viaje.`

**Pie de página** — ODD JOBS CO. · `La lista en el refrigerador. Hecho el jueves.` · `0117 555 0157` · Responsabilidad pública de £ 2 millones · DBS mejorado verificado · Cubre Bristol, Bath y sus alrededores · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
