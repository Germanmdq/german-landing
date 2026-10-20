# Pressed & Co. — Aviso del sitio web de tintorería

## 1. Declaración de objetivos
Crear un sitio web de limpieza en seco nítido y orientado al servicio para **Pressed & Co.**, definido por papel blanco, tinta azul profunda y espacios en blanco generosos: un sitio de cuidado de prendas que lidera con tiempos de entrega y programación de recolección en lugar de una lista de precios de nadie. lee.

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(210, 20%, 99%);      /* #fbfcfd paper white */
  --foreground: hsl(218, 34%, 16%);      /* #1b2536 ink */
  --primary: hsl(218, 62%, 34%);         /* #21508c deep blue */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(218, 10%, 48%);
  --border: hsl(212, 18%, 90%);
  --card: hsl(212, 26%, 96%);
  --accent-fresh: hsl(162, 52%, 44%);    /* fresh green, used for ready status */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Sora 700, clamp(36px, 4.6vw, 64px), espacio entre letras -0.03em
- **H2:** Sora 600, 30–42px
- **H3:** Sora 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.75
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.18em, 11px, azul
- **Precios / respuesta:** Sora 700, tabular-nums

## 5. Efectos visuales

**Efecto 1: selector de respuesta.** Tres tarjetas de velocidad de servicio (estándar, exprés, el mismo día), donde al seleccionar una se actualiza una línea del día de entrega en vivo calculada a partir de la fecha actual y se aplica un multiplicador de precio en toda la tabla de precios. abajo.

```tsx
const speeds = [
  { id: 'standard', label: 'Standard', days: 3, mult: 1,    note: 'In by 9am, back in three days' },
  { id: 'express',  label: 'Express',  days: 1, mult: 1.4,  note: 'In by 9am, back tomorrow' },
  { id: 'sameday',  label: 'Same day', days: 0, mult: 1.9,  note: 'In by 9am, back by 6pm' },
];
const [sel, setSel] = useState('standard');
const s = speeds.find(x => x.id === sel);

<p className="mt-4 text-lg">
  Drop off today, ready <span className="font-semibold text-[var(--primary)]">
    {s.days === 0 ? 'this evening' : s.days === 1 ? 'tomorrow' : `in ${s.days} days`}
  </span>. {s.note}.
</p>
{/* Every price in the table below multiplies by s.mult and re-renders */}
```

**Efecto 2: fila de iconos de prendas con dibujo de trazo.** Seis contornos de prendas SVG (camisa, traje, vestido, abrigo, cortina, edredón) cuyos trazos se dibujan de izquierda a derecha usando `pathLength` en la entrada de desplazamiento, a 0,9 s con 0,08 s stagger.

## 6. Desglose de componentes

1. **Barra de navegación**: 72 px, adhesivo, papel blanco, borde inferior de 1 px. Marca denominativa a la izquierda, centro de enlaces, teléfono y botón azul "Reservar una recogida" a la derecha.
2. **Héroe**: dividido, texto a la izquierda, imagen a la derecha con esquinas redondeadas. Ceja, H1, sublínea, dos CTA, cuatro puntos de confianza. *Imagen: camisas cuidadosamente planchadas colgadas en fila sobre un riel, interior limpio y luminoso, luz natural suave, ordenado y tranquilo.*
3. **Selector de respuesta**: la interacción principal (Efecto 1), directamente debajo del hero.
4. **Lista de precios**: una tabla limpia de dos columnas de tipos de prendas y precios que se recalcula con la velocidad seleccionada. Agrupados en cotidiano, formal, exterior y hogar.
5. **Recogida y entrega gratuitas**: banda dividida en `--card`: códigos postales de cobertura,pedido mínimo, ventanas de recolección y programación CTA.
6. **Qué hacemos**: fila de íconos de prendas (Efecto 2) con seis servicios: limpieza en seco, camisas lavadas, arreglos, cuero y gamuza, limpieza de vestidos de novia, artículos para el hogar.
7. **Cómo funciona**: cuatro pasos desde la reserva hasta la entrega, con los tiempos previstos.
8. **Cuidados y garantías** — tres tarjetas: prensado acabado a mano, ecosolvente y garantía de relimpieza indicada claramente.
9. **Cuentas comerciales** — hoteles, restaurantes y oficinas, con nota de facturación mensual.
10. **Preguntas frecuentes**: acordeón, seis preguntas sobre manchas, tiempo, política de daños y qué no se puede limpiar.
11. **Encuéntrenos**: dos direcciones de tiendas, horarios de apertura y el mapa de cobertura de recogida.
12. **Pie de página**: tinta azul, cuatro columnas, registro de empresa, acreditación medioambiental.

## 7. Animaciones
- Hero: el texto se desvanece 0,7 s; la imagen se revela con un barrido de clipPath desde la derecha, 1s
- Tarjetas de velocidad: la tarjeta seleccionada obtiene un borde azul de 2px y se levanta `-3px`, 0,2s; la línea de entrega se intercambia con AnimatePresence, 0.25s
- Cifras de precios: cada celda se desvanece y se vuelve a montar en el cambio del multiplicador, 0.2s, escalonado 0.01s
- Íconos de prendas: trazo `pathLength 0 → 1`, 0.9s, escalonado 0.08s
- Números de paso: pop `scale 0.85 → 1` escalonado 0.12s
- Todo es rápido y preciso: el lenguaje visual es presionado, no suave

## 8. Responsive
- **Móvil (<768px):** hamburguesa; pilas de imágenes encima del texto; H1 se fija a 36px; las tarjetas rápidas se convierten en una fila de fichas desplazable horizontalmente; la tabla de precios se convierte en filas apiladas de dos columnas; `Reservar una recogida` fijado como una barra inferior adhesiva.
- **Tableta:** el héroe permanece dividido, precios en 2 columnas, servicios en 3 columnas.
- **Escritorio:** ancho máximo 1140 px, `px-16`, `py-20`.

## 9. Completo Copia

**Marca:** PRESSED & CO. · Est. 1996 · Reading

**Navbar:** Precios · Recogida · Servicios · Cómo funciona · Negocios · Encuéntrenos · `0118 555 0140` · [Botón] Reservar una recogida

**Hero**
- Eyebrow: `READING & WOKINGHAM · RECOGIDA Y ENTREGA GRATIS · DESDE 1996`
- H1: `Devuelto el lunes. Regreso el jueves.Prensado correctamente.`
- Sublínea: `Lavado en seco independiente con recogida gratuita en Reading. Prensado acabado a mano, solvente GreenEarth y garantía de relimpieza si algo sale mal.`
- CTAs: `Reserve una recogida gratis` · `Ver precios`
- Puntos de confianza: `Recogida y entrega gratis` · `Prensado terminado a mano` · `Eco solvente` · `Relimpieza garantía`

**Turnaround**
- **Estándar** — 3 días · Entrada antes de las 9 a.m., regreso en tres días
- **Rápido** — Al día siguiente · Entrada antes de las 9 a.m., regreso mañana · +40%
- **Mismo día** — Hoy · Entrada a las 9 a.m., regreso a las 6 p.m. · +90%

**Precios** — Ceja `PRECIO` — H2 `Todo, claramente listado`

*Todos los días* — Camisa, lavada y planchada £3,20 · Pantalón £7,50 · Falda £7,00 · Jersey £8,00 · Blusa £7,50 · Corbata £4,00
*Ropa formal* — Traje de dos piezas £16,00 · Traje de tres piezas £21,00 · Esmoquin £11,00 · Vestido de noche £18,00 · Chaleco £6,50
*Abrigo* — Abrigo £14,00 · Abrigo de lana £17,00 · Chaqueta acolchada £16,00 · Cazadora de cuero £45,00 · Abrigo de ante £58.00
*Hogar* — Edredón individual £18.00 · Edredón doble £22.00 · Cortinas, caída por metro £9.00 · Mantel £12.00 · Funda de cojín £5.50

**Recogida y entrega** — H2 `Vamos a ti, gratis`
`Recogida y entrega gratuita en pedidos superiores £20 en RG1, RG2, RG4, RG6, RG30 y RG41. Elija un período de dos horas, deje su bolso con un vecino o en un lugar seguro y le enviaremos un mensaje de texto cuando esté de regreso.`
Windows: `lunes a viernes de 8 a 10 a. m. · 12 a 2 p. m. · 5 a 7 p. m.` · `sábados de 9 a 11 a. m. · 2 a 4 p. m.`

**Servicios**
1. **Limpieza en seco**: trajes, vestidos, abrigos y prendas delicadas con el solvente de silicona GreenEarth, que es más suave con las telas que el perc tradicional y no deja olor.
2. **Camisas lavadas**: lavadas, almidonadas según tus preferencias y terminadas a mano en una plancha para camisas. Plegado o colgado, tu eliges, sin coste extra.
3. **Alteraciones** — Costurera interna. Dobladillos, cierres, cremalleras y cambio de tamaño completo. La mayoría de las modificaciones se realizan en cuatro días.
4. **Cuero y ante**: limpieza y cambio de color especializados, enviados a un socio exclusivo. Espere dos semanas yespere primero una evaluación honesta.
5. **Limpieza de vestidos de novia**: embalaje limpio, acabado a mano y sin ácido para almacenamiento. Doce días laborables y fotografiamos el vestido antes y después.
6. **Artículos para el hogar** — Edredones, cortinas, manteles y fundas. Bajamos las cortinas y las volvemos a colgar por una tarifa si no puede hacerlo.

**Cómo funciona**
1. **Reserve**: en línea en un minuto o llame. Elija un período de recolección de dos horas.
2. **Recopilamos**: el conductor envía mensajes de texto con quince minutos de anticipación. Deja la bolsa afuera si no estás dentro.
3. **Limpiamos**: cada artículo se inspecciona y se trata antes de que se acerque a una máquina.
4. **Hacemos entregas** — En perchas, cubierto, en el horario que elijas. Pago contra entrega o a cuenta.

**Cuidados y garantías**
1. **Prensado terminado a mano**: cada prenda es terminada por una persona en una prensa, no arrastrada a través de un túnel. Es más lento y es por eso que el collar se asienta correctamente.
2. **Disolvente GreenEarth**: a base de silicona, no tóxico y biodegradable. Mejor para el tejido, considerablemente mejor para las personas que trabajan aquí.
3. **Garantía de relimpieza**: si algo vuelve a aparecer y no está satisfecho, tráigalo dentro de los siete días y lo limpiaremos nuevamente de forma gratuita. Sin forma, sin argumentos.

**Cuentas comerciales** — `Hoteles, restaurantes y oficinas en Reading. Cobros programados, facturación mensual detallada y un contacto designado. Ropa de cama, uniformes, delantales y manteles a precio de cuenta.`

**FAQ**
1. **¿Puedes quitar esta mancha?** — Por lo general, y te diremos honestamente cuando no podamos. Díganos qué lo causó y hace cuánto tiempo; eso cambia el tratamiento más que nada.
2. **¿Qué pasa si pierdo mi plazo de entrega?** — Se lo dejamos a un vecino o en su lugar seguro si ha configurado uno, o volvemos a reservar sin cargo.
3. **¿Limpias vestidos de novia?** — Sí, incluida la caja para guardarlos. Espere doce días hábiles y tráigalo lo antes posible después del día.
4. **¿Qué no se puede limpiar?**: cualquier cosa que tenga una etiqueta que indique que no se puede limpiar, algunas piezas con muchas cuentas y la mayoría de cuero falso. Lo comprobaremos antes detómalo.
5. **¿Qué sucede si dañas algo?** — Estamos asegurados y liquidamos de manera justa la antigüedad y el valor del artículo. Es raro y no discutimos sobre ello cuando sucede.
6. **¿Tengo que estar presente para la recogida?** — No. Deje la bolsa en un lugar seguro y díganos dónde cuando reserve.

**Encuéntrenos** — `Tienda 1: 44 Kings Road, Reading RG1 3BJ` · `Tienda 2: 12 Peach Street, Wokingham RG40 1XJ`
De lunes a viernes de 7:30 a 18:30 · Sábado 8:30–16:00 · Dom cerrado

**Pie de página** — PRESSED & CO. · `Devuelto el lunes. Regreso el jueves.` · `0118 555 0140` · Limpiador acreditado por GreenEarth · Registro de empresa 03219884 · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
