# Fixwell — Aviso del sitio web de reparación de electrodomésticos

## 1. Declaración de objetivos
Crear un sitio web limpio y confiable para **Fixwell**, un servicio local de reparación de electrodomésticos: blanco brillante con un fuerte azul cobalto, tarjetas suaves y redondeadas, una fotografía amigable de un ingeniero y un selector de electrodomésticos que hace evidente en dos segundos que están reparando lo que acaba de romperse.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes ni sistema de reserva. El selector de electrodomésticos es de presentación: al seleccionar uno, se resalta la tarjeta y se desplaza hasta la fila de precios coincidentes.

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(218, 28%, 14%);
  --primary: hsl(222, 84%, 50%);         /* cobalt */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(218, 10%, 46%);
  --border: hsl(218, 18%, 90%);
  --card: hsl(216, 38%, 97%);            /* pale blue panel */
  --success: hsl(152, 58%, 40%);         /* used only for the availability dot */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;800&display=swap" rel="stylesheet" />
```
- **H1:** Figtree 800, clamp(40px, 5.2vw, 76px), altura de línea 1.05, espacio entre letras -0.03em
- **H2:** Figtree 800, clamp(28px, 3.4vw, 46px)
- **Cuerpo:** Figtree 400, 17px, altura de línea 1.65
- **Etiquetas y precios:** Figtree 600, 13px, mayúsculas, espacio entre letras 0.08em

## 5. Efectos visuales

**Efecto 1: selector de electrodomésticos.** Una fila de ocho tarjetas redondeadas, cada una con un gran icono de Lucide y un nombre. La carta seleccionada tiene un borde cobalto, un relleno azul pálido y una sombra ligeramente elevada; los demás se atenúan hasta un 55% de opacidad. Al seleccionar, la página se desplaza hasta la fila correspondiente en la tabla de precios y la resalta brevemente.

```jsx
<button
  onClick={() => setSelected(item.id)}
  className={clsx(
    "rounded-2xl border p-6 text-left transition-all duration-200",
    selected === item.id
      ? "border-[var(--primary)] bg-[var(--card)] shadow-lg -translate-y-1"
      : "border-[var(--border)] bg-white opacity-55 hover:opacity-100"
  )}
>
```

**Efecto 2: disponibilidad de hoy.** Una pequeña pastilla en la barra de navegación y un héroe con un punto verde parpadeante que dice "Quedan 3 espacios para hoy". El anillo alrededor del punto escala 1 → 2,2 y se desvanece cada 2 segundos. 

**Efecto 3: Profundidad suave.** Todas las tarjetas utilizan radios grandes (16–24 px) y sombras en capas suaves en lugar de bordes solos, por lo que la página se siente más amigable que técnica.

## 6. Desglose de componentes

1. **Barra de navegación**: 80 píxeles, blanco, sombra inferior sutil al desplazarse. Marca denominativa a la izquierda, centro de enlaces, píldora de disponibilidad y botón de cobalto "Reservar una reparación" a la derecha. Pegajoso.
2. **Héroe** — dividido. Izquierda: H1, sublínea, dos botones, cuatro viñetas de confianza cortas con íconos de verificación. Derecha: una fotografía redondeada de un ingeniero frente a un electrodoméstico de cocina, con una pequeña tarjeta flotante superpuesta que muestra una calificación de cinco estrellas. *Imagen: reparación amigableIngeniero con uniforme limpio trabajando en una lavadora abierta en una cocina luminosa y con luz natural.*
3. **Selector de electrodomésticos**: efecto 1, ocho tarjetas en dos filas.
4. **Precios** — una mesa limpia: electrodoméstico, fallas comunes, tarifa de diagnóstico y rango de reparación típico. Ocho filas que coinciden con el selector.
5. **Cómo funciona**: cuatro pasos seguidos con números de cobalto en círculos pálidos.
6. **Garantía**: un panel azul pálido con un encabezado grande, una declaración de garantía de doce meses y tres líneas de respaldo.
7. **Marcas a las que brindamos servicios**: una fila envuelta de forma simple de marcas denominativas en gris apagado.
8. **¿Por qué no reemplazarlo?**: una breve sección de dos columnas con una estadística y un párrafo sobre reparación versus reemplazo.
9. **Reseñas** — tres tarjetas con cinco estrellas de cobalto, cotización, nombre, localidad y electrodoméstico reparado.
10. **Área de servicio**: una lista de ciudades como pastillas blandas y horarios de apertura.
11. **Preguntas frecuentes**: seis elementos nativos `<details>` en una columna.
12. **CTA final**: sección de cobalto, texto blanco, H2, número de teléfono y botón.
13. **Pie de página**: blanco, cuatro columnas, línea de registro de la empresa.

## 7. Animaciones
- Contenido de héroe: desvanecimiento 20px, escalonamiento 0.08s
- Imagen de héroe: `scale 0.97 → 1` con desvanecimiento, 0.9s
- Tarjetas de selección: desvanecimiento 16 px, escalonamiento 0,05 s; transiciones de selección en 200 ms
- Resaltado de la fila de precios: el fondo parpadea en azul pálido durante 1,2 segundos y luego se desvanece
- Punto de disponibilidad: Efecto 2, siempre en funcionamiento
- Números de paso: inserte con un pequeño resorte, escalone 0,1s

## 8. Responsive
- **Móvil (<768px):** barra de llamada adhesiva de cobalto en la parte inferior; el héroe se apila primero con la fotografía; H1 a 40 px; el selector se convierte en una cuadrícula de 2×4 con íconos más pequeños; la tabla de precios se convierte en tarjetas apiladas que muestran el aparato, la tarifa y la gama; la barra de navegación mantiene solo la marca denominativa, el punto de disponibilidad y un ícono de teléfono.
- **Tableta:** selector 4 en ancho; hero permanece dividido 50/50.
- **Escritorio:** ancho máximo 1200px, `px-8`, espacio entre secciones `py-24`.

## 9. Copia completa

**Marca:** FIXWELL · Reparación de electrodomésticos en Leeds yHarrogate

**Navbar:** Electrodomésticos · Precios · Garantía · Áreas — `● Quedan 3 espacios hoy` — Reserve una reparación

**Hero**
- H1: `Su lavadora se puede reparar. Normalmente hoy.`
- Sublínea: `Ingenieros de electrodomésticos independientes que cubren Leeds y Harrogate. Llevamos las piezas comunes de la furgoneta, por lo que la mayoría de las reparaciones se realizan en la primera visita.`
- Botones: `Reservar una reparación` · `Llame al 0113 460 2288`
- Viñetas: `Diagnóstico fijo de £ 49, reembolsado si reparamos` · `Garantía de 12 meses en cada reparación` · `La mayoría de las piezas se transportan en la furgoneta` · `Tarde y sábado ranuras`
- Tarjeta flotante: `4,9 de 5 · 480 reseñas`

**Selector de electrodomésticos** — H2 `¿Qué está roto?`
Lavadora · Secadora · Lavavajillas · Frigorífico-congelador · Horno · Placa · Microondas · Lavadora secadora

**Precios** — H2 `A fijo llamada y luego un precio antes de comenzar.`
| Aparato | Fallos comunes | Diagnóstico | Reparación típica |
|---|---|---|---|
| Lavadora | No gira, tiene fugas, cojinetes del tambor | £ 49 | £95 – £210 |
| Secadora | Sin calefacción, termostato, cinturón | £ 49 | £85 – £165 |
| Lavavajillas | No drena, no calienta, gotea | £ 49 | £90 – £180 |
| Frigorífico-congelador | No enfría, se congela, ventilador ruidoso | £ 49 | £110 – £240 |
| Horno | Sin calor, ventilador, junta de puerta, elemento | £ 49 | £85 – £190 |
| Encimera | Encendido, zona muerta única, controles | £ 49 | £80 – £175 |
| Microondas | Sin calefacción, plato giratorio, interruptor de puerta | £ 49 | £70 – £140 |
| Lavadora secadora | No seca, fallas de centrifugado, bomba | £ 49 | £105 – £230 |
Nota: `El diagnóstico de £49 cubre la visita y el diagnóstico, y se descuenta de la factura si continúa con la reparación. Nunca ajustamos una pieza sin informarte primero el total.`

**Cómo funciona**
1. **Reserve un espacio** — `En línea o por teléfono. Mañana, tarde o noche, y enviamos mensajes de texto cuando estemos a veinte minutos.`
2. **Lo diagnosticamos**: `Por lo general, en media hora y el fallo se explica en inglés sencillo.`
3. **Obtienes un precio** — `El costo total, piezas incluidas, antes de cualquier cosa esinstalado.`
4. **Lo arreglamos** — `Ocho reparaciones de cada diez se realizan en la primera visita, desde el stock de la furgoneta.`

**Garantía** — H2 `Doce meses en piezas y mano de obra.` `Si el mismo fallo vuelve a aparecer dentro de un año, regresamos y lo reparamos gratis. Sin prorrateo, sin letra pequeña, sin discusión sobre si se trata de la misma falla.`
- `Todos los ingenieros están registrados en Gas Safe y Parte P cuando sea necesario`
- `Estamos asegurados por £5 millones y verificados por DBS`
- `Si no podemos arreglarlo, el diagnóstico es todo lo que usted paga`

**Marcas que servicio:** Bosch · Miele · Samsung · LG · Beko · Hotpoint · AEG · Siemens · Zanussi · Indesit · Whirlpool · Candy

**Por qué no reemplazarlo** — Estadística: `£240` — `es la reparación promedio de un electrodoméstico cuyo reemplazo cuesta £620. Una lavadora Miele de diez años con rodamientos nuevos suele durar más que una nueva y económica. Le diremos honestamente cuando una reparación no vale la pena, porque preferimos que nos llame la próxima vez.`

**Reseñas**
- `"Diagnóstico de los rodamientos en diez minutos, tenía la pieza en la camioneta, terminada en una hora y media."` — *Helen, Chapel Allerton* — `LAVADORA`
- `"Me dijo que no valía la pena arreglar mi horno y solo me cobró la llamada. Ser honesto es raro."` — *Raj, Harrogate* — `OVEN`
- `"Reservado a las 8 am, arreglado a la hora del almuerzo y se llevó la parte vieja."` — *Gemma, Horsforth* — `DISHWASHER`

**Área de servicio:** Leeds · Harrogate · Horsforth · Wetherby · Otley · Guiseley · Pudsey · Garforth · Morley · Knaresborough · Ilkley · Yeadon
Horario: `De lunes a viernes de 8 a. m. a 8 p. m. · Sábado de 8 a. m. a 4 p. m. · Domingos cerrado`

**FAQ**
- **Cobra si no puede arreglarlo ¿Es?** `Sólo el diagnóstico de £49. Nada más.`
- **¿Qué tan rápido puedes venir?** `La mayoría de las reservas son el mismo día o el día siguiente. Mantenemos tres espacios libres cada mañana para emergencias.`
- **¿Se colocan piezas que he comprado yo mismo?** `Sí, aunque la garantía de doce meses cubre solo nuestra mano de obra.`
- **¿El electrodoméstico está cubierto por su propia garantía?** `Si tiene menos de dos años, consulte primero con el fabricante; le informaremos si creemos que es cubierto.`
- **¿Tiene usted¿Trabajar en electrodomésticos integrados?** `Sí, incluido el desmontaje y montaje de unidades en cocinas equipadas.`
- **¿Puedo pagar con tarjeta?** `Tarjeta, efectivo o transferencia bancaria, una vez realizada la reparación.`

**CTA final** — H2 `Reservar una reparación para hoy.` `0113 460 2288` · Botón `Reservar una reparación`

**Pie de página** — FIXWELL · Electrodomésticos · Precios · Garantía · Áreas · Reseñas · Contacto · `Fixwell Repairs Ltd, registrada en Inglaterra 11208743 · Gas Safe 662214 · Totalmente asegurado` · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
