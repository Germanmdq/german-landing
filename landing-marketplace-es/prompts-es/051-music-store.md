# Wolfram Guitars — Aviso del sitio web de la tienda de música

## 1. Declaración de objetivos
Crear un sitio web de tienda de instrumentos musicales oscuro y obsesivo con los equipos para **Wolfram Guitars**, definido por un ámbar cálido casi negro y un grotesco pesado: un sitio de tienda construido alrededor de una pared de equipo usado filtrable y un taller de reparación, porque ahí es donde realmente se encuentra una tienda de instrumentos independiente. compite.

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(24, 10%, 9%);        /* #191614 near-black warm */
  --foreground: hsl(36, 20%, 92%);       /* #eee8e0 */
  --primary: hsl(34, 88%, 56%);          /* #f0951f amber */
  --primary-foreground: hsl(24, 12%, 8%);
  --muted-foreground: hsl(30, 6%, 56%);
  --border: hsl(24, 8%, 20%);
  --card: hsl(24, 9%, 13%);
  --card-elevated: hsl(24, 8%, 17%);
  --sold: hsl(4, 60%, 52%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Chakra Petch 700, mayúsculas, clamp(40px, 5.6vw, 84px), espaciado entre letras -0.01em
- **H2:** Chakra Petch 600, mayúsculas, 30–48px
- **H3 / nombres de modelos:** Chakra Petch 600, 18–21px
- **Cuerpo:** Inter 300–400, 16px, altura de línea 1.7
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.2em, 11px, ámbar
- **Precios/años/números de serie:** Chakra Petch 700, tabular-nums

## 5. Efectos visuales

**Efecto 1: pared de engranajes usados con multifiltro.** Una cuadrícula filtrable de instrumentos usados y antiguos con chips por tipo, década, rango de precios y condición. Cada tarjeta muestra el año, el modelo, el grado de condición, el precio y una insignia de venta cuando sea relevante, y refluye con una animación de diseño. 

```tsx
const [filters, setFilters] = useState({ type: 'All', decade: 'All', max: 4000 });
const shown = useMemo(
  () => stock.filter(g =>
    (filters.type === 'All' || g.type === filters.type) &&
    (filters.decade === 'All' || g.decade === filters.decade) &&
    g.price <= filters.max
  ),
  [filters]
);

<motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
  <AnimatePresence mode="popLayout">
    {shown.map(g => (
      <motion.article
        key={g.id}
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* gear card */}
      </motion.article>
    ))}
  </AnimatePresence>
</motion.div>
```

**Efecto 2: Divisor de punteo de cuerda ámbar.** Una delgada línea ámbar horizontal entre secciones que, al ingresar al desplazamiento, oscila una vez con una onda sinusoidal amortiguada usando una ruta SVG animada antes de estabilizarse. Respeta el movimiento reducido simplemente fundiéndose.

## 6. Desglose de componentes

1. **Barra de navegación**: 72 px, fijo, casi negro con desenfoque, borde inferior ámbar de 1 px después del desplazamiento. Marca denominativa a la izquierda, centro de enlaces, botón ámbar "Reservar una configuración" a la derecha.
2. **Héroe**: fotografía de 88 vh, sin bordes, de la pared de una tienda y con un degradado hacia la izquierda. Ceja, H1 mayúscula, sublínea, dos CTA, cuatro datos de la tienda. *Imagen: una pared de guitarras eléctricas colgadas en una tienda con poca luz, focos cálidos, madera rica y cromo, fotografía de venta minorista atmosférica.*
3. **Solo en tira**: una fila de desplazamiento horizontal de los cuatro recién llegados con precio y año.
4. **Pared de engranajes usados** — la sección principal(Efecto 1) con chips de filtro y doce instrumentos.
5. **El taller**: montajes, repuestos, electrónica y restauración, cada uno con un precio y un plazo de entrega. Esta es la sección que separa una tienda de un sitio web.
6. **Explicación de configuración**: qué implica realmente una configuración y por qué una configuración de £55 hace más diferencia que una actualización de £500.
7. **Intercambio de piezas**: cómo valora la tienda los intercambios, qué acepta y qué no acepta, y un formulario de valoración.
8. **Nuevas marcas en existencia**: una fila de insignias de texto de las marcas que se venden, con una nota honesta sobre lo que la tienda deliberadamente no tiene en existencia.
9. **Pruébelo antes de comprar**: la propuesta en la tienda: salas ampliadas, sin límite de tiempo y sin esperas.
10. **Lecciones** — tres tutores con instrumento, nivel y tarifa por hora.
11. **Visita**: dirección, horario, estacionamiento y una línea sobre el perro de la tienda.
12. **Pie de página**: marrón más oscuro, regla superior de color ámbar, cuatro columnas, proveedor de finanzas, contacto.

## 7. Animaciones
- Hero: la imagen se escala de 1,04 a 1 en 12 segundos; H1 se revela con un borrado de la línea clipPath, 0,8 s
- Justo en la tira: ajuste de desplazamiento horizontal, las tarjetas escalan 1,02 cuando están centradas
- Cambios de filtro: diseño refluido con popLayout, 0,3 s por tarjeta
- Tarjetas de engranaje: la imagen escala 1,04 al pasar el cursor sobre 0,6 s; La insignia vendida permanece estática
- Divisores de punteo de cuerdas: una oscilación amortiguada en la entrada, 0,9 s, movimiento reducido seguro
- Filas de taller: desvanecimiento escalonado 0,06 s
- Insignias de marca: desvanecimiento escalonado 0,04 s

## 8. Responsive
- **Móvil (<768px):** hamburguesa con una superposición oscura en pantalla completa; H1 se fija a 40 px; chips de filtro desplazables horizontalmente con una hoja de "Filtros" para conocer el precio y la década; pared de engranajes 1-col; las filas del taller mantienen el trabajo y el precio en una sola línea; `Reservar una configuración` fijado como una barra inferior adhesiva.
- **Tableta:** pared de engranajes de 3 columnas, taller de 2 columnas, tira de entrada 3 visible.
- **Escritorio:** pared de engranajes de 4 columnas, ancho máximo 1280px, `px-16`, `py-20`.

## 9. Completo Copia

**Marca:** WOLFRAM GUITARS · Instrumentos, amplificadores y reparaciones · Glasgow

**Navbar:** Equipo usado · Taller · Intercambio de piezas · Lecciones · Visita ·[Botón] Reservar una configuración

**Hero**
- Ceja: `GLASGOW · DESDE 1998 · USADO, VINTAGE Y NUEVO · TALLER DE REPARACIÓN COMPLETO`
- H1: `CADA GUITARRA EN ESTA PARED HA SIDO MONTADA A MANO.`
- Sublínea: `Una tienda de instrumentos independiente en Finnieston. Alrededor de doscientas guitarras usadas y antiguas, un banco de reparación completo y personal que lo convencerá de no comprar una más cara si la más barata es la adecuada.`
- CTA: `Ver la pared usada` · `Reserve una instalación`
- Datos: `~200 usadas en stock` · `Taller de reparación completo` · `Bienvenido intercambio de piezas` · `Pruebe cualquier cosa, no presión`

**Recién llegado** — `1978 Fender Stratocaster, £2,850` · `2019 Gibson Les Paul Standard, £1,690` · `1965 Vox AC30 Top Boost, £2,200` · `2021 Martin D-28, £1,950`

**Pared de engranaje usada** — Ceja `USADO y VINTAGE` — H2 `LO QUE HAY EN LA PARED HOY`
Filtros: `Todos` · `Eléctrico` · `Acústico` · `Bajo` · `Amplificadores` · `Efectos` — Década: `Todos` · `Década de 1960` · `Década de 1970` · `Década de 1980` · `Década de 1990` · `2000+`

1. **Fender Stratocaster 1978** — Eléctrica · Excelente · £2,850 — Pastillas originales, reacabadas en la década de 1990, suenan maravillosamente. Refin es la razón por la que no cuesta £ 4,500.
2. **Vox AC30 Top Boost de 1965** — Amplificador · Muy bueno · £2200 — Revisión el mes pasado, parlantes originales, una válvula reemplazada. Parece que debería.
3. **Gibson Les Paul Standard 2019** — Eléctrica · Perfecta · £1,690 — Dos años, apenas reproducida, estuche y documentación originales.
4. **Martin D-28 2021** — Acústico · Excelente · £1,950 — Algunas marcas de cinturón en la parte posterior; por lo demás, como nuevo. Suena mejor que en 2021.
5. **1972 Fender Precision Bass** — Bajo · Bueno · £1,780 — Tocado intensamente, afinadores reemplazados, el mástil está recto y el tono es exactamente el que desea.
6. **1990 Marshall JCM800 2203** — Amplificador · Muy bueno · £1,150 — JCM800 posterior, con todos los servicios, sin modificaciones.
7. **Fender Telecaster American Pro 2016** — Eléctrica · Excelente · £890 — Caballo de batalla honesto. Pequeño golpe en la parte inferior, con el precio correspondiente.
8. **1968 Framus Texan** — Acústico · Bueno · £640 — Extraño, con carácter y más barato de lo que merece porque nadie conoce la marca.
9. **2020Rickenbacker 4003** — Bajo · Excelente · £1,590 — Fireglo, estuche original, un propietario.
10. **1980 Roland Jazz Chorus JC-120** — Amplificador · Bueno · £780 — Ruidoso, limpio, pesado. Trae a un amigo para que lo lleve.
11. **2018 PRS SE Custom 24** — Eléctrica · Muy buena · £480 — La guitarra con la mejor relación calidad-precio en la tienda con diferencia.
12. **1976 Yamaha FG-180** — Acústica · Buena · £390 — *Vendido*

**El taller** — Ceja `THE WORKSHOP` — H2 `TRES BANCOS, DOS LUTHIERS`
`Configuración estándar £55 · 3–4 días` · `Configuración con cuerdas nuevas £68 · 3–4 días` · `Reparación y pulido de trastes £145 · 1 semana` · `Refret completo £340 · 2–3 semanas` · `Reemplazo de tuerca, hueso £75 · 1 semana` · `Recableado de componentes electrónicos £95 · 1 semana` · `Accesorios de pastilla £45 por pastilla · 3 días` · `Repegamento de puente acústico £160 · 2 semanas` · `Servicio de amplificador y retubo £120 más válvulas · 1–2 semanas` · `Reparación de grietas estructurales desde £180 · cotizado después de la inspección`

**Explicación de configuración** — H2 `UNA CONFIGURACIÓN DE £55 SUPERA A UNA ACTUALIZACIÓN DE £500`
`La mayoría de las guitarras que se sienten mal no están mal hechas, están mal ajustadas. Una configuración significa alma, acción, entonación, ranuras para tuercas y altura de la pastilla, todo hecho correctamente para las cuerdas que realmente usas y la forma en que realmente tocas. Es la mayor mejora disponible para casi todos los instrumentos del país, y la gente pasa años comprando pedales.`
`Trae la guitarra y cuéntanos qué te molesta de ella. Si una configuración no soluciona el problema, lo diremos en lugar de aceptar su dinero.`

**Intercambio de piezas** — `Tomamos guitarras, bajos, amplificadores y efectos interesantes. No aceptamos amplificadores de modelado digital, paquetes económicos para principiantes ni nada con el cuello roto que no podamos certificar. Pagamos aproximadamente el sesenta por ciento del precio de venta al por menor, le informamos la cifra de venta al por menor en su cara y siempre puede tomar efectivo en lugar de crédito a una tasa más baja. `Universal Audio`
Nota: `Deliberadamente no disponemos de paquetes para principiantes. Hay tiendas que lo hacen mejor y más barato, y preferimos enviarte allí que vendertealgo en lo que no creemos.`

**Pruebe antes de comprar** — `Dos salas de amplificadores, ambas debidamente aisladas, ambas con un amplificador decente y una silla. Quita cualquier cosa de la pared, conéctala y juega todo el tiempo que quieras. Nadie estará detrás de ti. Si quieres que te dejen en paz por completo, dínoslo y realmente te dejaremos en paz.`

**Lecciones**
1. **Callum Reid**: guitarra eléctrica, todos los niveles: £32 la hora, martes y jueves
2. **Ana Ferreira**: acústica y estilo con los dedos, de principiante a intermedio: £30 la hora, lunes y miércoles
3. **Josh Mbeki** — Bajo, todos los niveles, incluido el teórico — £30 por hora, viernes y sábados

**Visita** — `184 Argyle Street, Finnieston, Glasgow G3 8TE` · Lun–sáb 10:00–18:00 · Dom 12:00–16:00
`Estacionamiento en Minerva Street después de las 6pm y todo el domingo. El perro de la tienda se llama Bear, tiene catorce años y no se moverá por ti.`

**Pie de página** — WOLFRAM GUITARS · `Cada guitarra en esta pared ha sido montada a mano.` · `0141 555 0166` · Financiamiento disponible a través de Novuna · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-slider": "^1.2.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
