# Forno Rosso — Aviso del sitio web de pizzería

## 1. Declaración de objetivos
Crear un sitio web de pizzería de vecindario cálido y a leña para **Forno Rosso**, definido por crema carbonizada, rojo tomate y una cara de exhibición pesada y condensada: un sitio que huele a horno y hace que la gente reserve una mesa o ordene para recoger en dos taps.

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(38, 32%, 94%);      /* #f4efe6 charred cream */
  --foreground: hsl(20, 22%, 15%);      /* #2f251f */
  --primary: hsl(6, 68%, 46%);          /* #c53127 tomato red */
  --primary-foreground: hsl(38, 32%, 97%);
  --muted-foreground: hsl(20, 10%, 44%);
  --border: hsl(34, 18%, 84%);
  --card: hsl(38, 34%, 90%);
  --accent-basil: hsl(96, 26%, 36%);    /* basil green */
  --char: hsl(20, 14%, 12%);            /* dark bands */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
- **H1:** Anton 400, mayúsculas, clamp(48px, 7vw, 110px), espacio entre letras -0,01em, altura de línea 0.9
- **H2:** Anton 400, mayúsculas, 34–56px
- **H3 / nombres de pizza:** Inter 600, 18–21px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.7
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.2em, 11px, red
- **Precios:** Inter 500, tabular-nums

## 5. Efectos visuales

**Efecto 1: menú con chips de filtro dietético.** Chips para todos, vegetarianos, veganos y sin gluten filtran la lista del menú con una animación de diseño. Cada fila de pizza muestra el nombre, la lista de ingredientes en italiano, el precio y pequeñas insignias dietéticas.

```tsx
<motion.div layout className="divide-y divide-[var(--border)]">
  <AnimatePresence mode="popLayout">
    {filtered.map(p => (
      <motion.div key={p.slug} layout
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        className="flex items-baseline justify-between gap-6 py-5">
        <div>
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm text-[var(--muted-foreground)]">{p.ingredients}</p>
        </div>
        <span className="tabular-nums font-medium">£{p.price}</span>
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>
```

**Efecto 2: tela de héroe que brilla en el horno.** Un degradado radial de color naranja cálido con una opacidad del 22 % se encuentra sobre la parte inferior izquierda de la imagen principal, imitando el derrame de luz del horno, con el titular dentro it.

## 6. Desglose de componentes

1. **Barra de navegación**: 72 px, pegajoso, crema con desenfoque. Marca denominativa a la izquierda, centro de enlaces, botón rojo "Reservar una mesa" y un número de teléfono a la derecha.
2. **Héroe** — Fotografía de horno de 90 vh con sangrado completo, malla inferior y brillo de horno (Efecto 2). Ceja, Anton H1 enorme, sublínea, dos CTA. *Imagen: horno de leña para pizza con llamas visibles, interior oscuro, cálida luz naranja que se derrama sobre un mostrador de mármol, fotografía atmosférica de un restaurante.*
3. **Tira de hoy**: banda de caracteres oscuros con el horario de apertura de hoy, una línea "Recogida en 20 minutos" y un enlace telefónico.
4. **El menú**: la sección principal. Fichas de filtro más listas agrupadas: Rosse, Bianche, Sides, Dolci (Efecto 1).
5. **La masa**: imagen dividida y texto que explica el fermento de 48 horas y la harina.*Imagen: manos estirando masa de pizza sobre una superficie de mármol enharinada, primer plano, luz cálida de la cocina.*
6. **Tira de galería**: desplazamiento horizontal de cuatro imágenes de pizzas y tomas de habitaciones.
7. **Reserve una mesa** — 2 columnas: formulario a la izquierda (fecha, hora, tamaño del grupo, nombre, teléfono), notas prácticas a la derecha sobre visitas sin cita previa y grupos grandes.
8. **Recogida y entrega**: tres tarjetas: recogida, radio de entrega y las aplicaciones de terceros en las que se encuentran, con una nota honesta sobre cuál es la más barata.
9. **Reseñas**: tres tarjetas de cotizaciones con una comilla de apertura roja.
10. **Encuéntrenos**: dirección, horario, nota de estacionamiento, mapa.
11. **Pie de página**: fondo de caracteres, texto color crema, tres columnas y redes sociales.

## 7. Animaciones
- Héroe: las líneas H1 se revelan con `clipPath: inset(0 0 100% 0) → inset(0 0 0 0)`, 0,8 s, escalonamiento 0,1 s
- Brillo del horno: oscilación de opacidad sutil 0,18 ↔ 0,26 más de 5 s, respeta `prefers-reduced-motion`
- Filtro de menú: `diseño motion.div` con popLayout, 0,28 s por fila
- Sección de masa: diapositivas de imagen `x: -30 → 0` mientras el texto se desvanece
- Galería: horizontal `scroll-snap-type: x obligatorio`
- Tarjetas de revisión: escalonamiento 0.1s, `y: 24 → 0`
- Botón de libro: escala sutil 1.03 al pasar el mouse, 0.2s

## 8. Responsive
- **Móvil (<768px):** hamburguesa; H1 se fija a 48 px; hoy la tira se convierte en dos líneas apiladas; chips de filtro desplazables horizontalmente; las filas del menú mantienen el nombre y el precio en una línea con los ingredientes debajo; formulario de reserva en ancho completo; una barra inferior adhesiva con `Reservar` y `Llamar`.
- **Tableta:** menú de 2 columnas agrupadas, galería 3 visible.
- **Escritorio:** ancho máximo 1140px, `px-16`, `py-20`.

## 9. Completo Copia

**Marca:** FORNO ROSSO · Bristol

**Navbar:** Menú · La Masa · Libro · Colección · Encuéntranos · `0117 555 0164` · [Botón] Reserva una Mesa

**Hero**
- Ceja: `BRISTOL · LEÑA · MASA DE 48 HORAS`
- H1: `SESENTA SEGUNDOS EN UN HORNO A 450 GRADOS.`
- Sublínea: `Una pequeña pizzería napolitana en Gloucester Road. Doce pizzas, cuatro vinos y nada de pasta, porque preferimos hacer una cosa bien.`
- CTA: `Reservar una mesa` · `Ver elMenú`

**Tira de hoy:** `Abierto hoy 17:00 – 22:30 · Colección lista en unos 20 minutos · Llama al 0117 555 0164`

**Menú**
Eceja `EL MENÚ` — H2 `DOCE PIZZAS. ESA ES LA LISTA COMPLETA.`

*Rosse*
- **Marinara** — pomodoro San Marzano, aglio, origano, olio EVO — £9 *(vegano)*
- **Margherita** — pomodoro, fiordilatte, basilico — £11 *(vegetariano)*
- **Diavola** — pomodoro, fiordilatte, salame piccante, miele — £14
- **Napoli** — pomodoro, fiordilatte, acciughe, capperi, oliva — £14
- **Capricciosa** — pomodoro, fiordilatte, prosciutto cotto, funghi, carciofi — £15
- **Bufala e Datterini** — datterini gialli, mozzarella di bufala, basilico — £15 *(vegetariano)*

*Bianche*
- **Quattro Formaggi** — fiordilatte, gorgonzola, pecorino, parmigiano — £15 *(vegetariano)*
- **Patate e Rosmarino** — patate, rosmarino, fiordilatte, pepe nero — £13 *(vegetariano)*
- **Salsiccia e Friarielli** — salsiccia, friarielli, fiordilatte — £16
- **Zucca e Nocciole** — zucca arrostita, nocciole, ricotta — £14 *(vegetariano)*
- **Tartufo** — funghi, crema di tartufo, fiordilatte — £17 *(vegetariano)*
- **Ortolana** — verdure grigliate, pomodoro, senza formaggio — £13 *(vegano)*

*Acompañamientos* — Olive ascolane £6 · Burrata e pomodorini £9 · Insalata tricolore £7 · Focaccia all'aglio £5
*Dolci* — Tiramisù £7 · Affogato £6 · Cannolo siciliano £5

Nota: `Bases sin gluten disponibles en cualquier pizza por £2. Los preparamos en la misma cocina, por lo que no podemos prometer cero contaminación cruzada.`

**La masa** — Ceja `LA MASA` — H2 `CUARENTA Y OCHO HORAS ANTES DE PEDIRLA`
`Mezclamos con Caputo 00, sal marina, agua y una pequeña cantidad de levadura, luego lo dejamos reposar durante dos días a temperatura controlada. La fermentación prolongada es la razón por la que la corteza es liviana, se ampolla y no se asienta en el estómago como un ladrillo. También significa que a veces se nos acaba el sábado y preferimos hacerlo antes que apresurarnos.`

**Booking** — `Se pueden reservar mesas para hasta seis personas en línea. Grupos de siete o más,por favor llame. Mantenemos un tercio del espacio para visitas sin cita previa cada noche, así que si no has reservado, ven temprano y prueba suerte en el mostrador.`

**Recogida y entrega**
- **Recogida**: pedido por teléfono, listo en unos veinte minutos. Diez por ciento de descuento en cada pedido de recolección.
- **Entrega** — Realizamos entregas nosotros mismos en un radio de dos millas, de martes a domingo, hasta las 21:45. £3 fijos.
- **Aplicaciones**: utilizamos las aplicaciones habituales, pero nos cobran alrededor del treinta por ciento. Hacer un pedido directo es más barato para usted y considerablemente mejor para nosotros. 

**Reseñas**
1. `La Diavola con miel es una combinación realmente estúpida que funciona perfectamente y pienso en ello a horas intempestivas.` — **Ben H.**
2. `Llegamos un viernes a las seis sin reserva y conseguimos los dos últimos asientos en el mostrador. Me senté junto al horno y observé cómo entraba cada pizza. Los mejores asientos del lugar.` — **Priya S.**
3. `Doce pizzas en el menú y ninguna pasta. Puedes saborear la confianza.` — **Marek L.**

**Encuéntranos** — `184 Gloucester Road, Bristol BS7 8NT` · Martes–jueves 17:00–22:00 · Viernes–sábados 12:00–23:00 · Dom 12:00–21:00 · Lun cerrado · `Aparcamiento en la calle después de las 18:00, y el 75 paradas afuera.`

**Pie de página** — FORNO ROSSO · `Sesenta segundos en un horno a 450 grados.` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
