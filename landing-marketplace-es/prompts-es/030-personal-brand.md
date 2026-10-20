# Nadia Okonjo — Aviso del sitio web de marca personal

## 1. Declaración de objetivos
Cree un sitio seguro de marca personal de una página para **Nadia Okonjo**, oradora, escritora y asesora: fondo casi negro, un acento coral eléctrico, un nombre enorme colocado de borde a borde y un retrato recortado que se superpone al tipo para que la persona y el nombre ocupen el mismo lugar. space.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin CMS, sin backend de formulario de contacto. El botón de contacto abre un enlace `mailto:`.

## 3. Sistema de diseño: Colores
```css
:root {
  --background: hsl(0, 0%, 6%);
  --foreground: hsl(30, 12%, 94%);
  --primary: hsl(8, 92%, 62%);           /* electric coral */
  --primary-foreground: hsl(0, 0%, 6%);
  --muted-foreground: hsl(30, 4%, 58%);
  --border: hsl(0, 0%, 16%);
  --card: hsl(0, 0%, 9%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **Nombre en héroe:** Syne 800, mayúsculas, `font-size: clamp(56px, 15vw, 260px)`, altura de línea 0,82, espacio entre letras -0,04em
- **H2:** Syne 600, clamp(30px, 4vw, 60px), espacio entre letras -0,02em
- **Cuerpo:** Inter 300, 18px, altura de línea 1.7
- **Etiquetas:** Inter 500, 11px, mayúsculas, espacio entre letras 0,24em, coral

## 5. Efectos visuales

**Efecto 1: superposición de nombre y retrato.** El nombre se establece en 15vw en todo el ancho. Un retrato recortado (fondo transparente, solo el sujeto) se ubica centrado y se superpone, de modo que la primera línea del nombre pasa detrás de los hombros y la segunda línea pasa por delante del pecho. Logrado con dos copias del nombre en posición absoluta, una en `z-0` y otra en `z-20` recortadas en su mitad inferior, con el retrato en `z-10`.

```jsx
<div className="relative">
  <h1 className="relative z-0 text-center leading-[0.82]">NADIA</h1>
  {/* Image: cut-out studio portrait of a confident woman in a dark blazer, arms folded, transparent background, high contrast lighting */}
  <img src="" alt="Nadia Okonjo" className="relative z-10 mx-auto -mt-[12vw] h-[58vh] object-contain" />
  <h1 className="relative z-20 -mt-[22vw] text-center leading-[0.82] mix-blend-normal">OKONJO</h1>
</div>
```

**Efecto 2: Punto de cursor de coral.** Un punto de coral de 10 px sigue al puntero con un resorte, y crece a 64 px con la palabra `Ver` cuando esté sobre una tarjeta de proyecto. Deshabilitado en dispositivos táctiles.

**Efecto 3: marco de logotipo.** Una sola fila de marcas denominativas de clientes y publicaciones que se desplazan lentamente de derecha a izquierda, 30 segundos, escala de grises con 55 % de opacidad, opacidad total al pasar el mouse.

## 6. Desglose de componentes

1. **Barra de navegación**: 72 píxeles, transparente, sin marca denominativa. Cuatro enlaces alineados a la derecha con un espacio entre letras de 11 px y una pastilla coral "Reservame".
2. **Héroe** — 100vh. Pequeña etiqueta en la parte superior, luego el nombre y el retrato se superponen (Efecto 1) y una línea de declaración de posicionamiento debajo.
3. **Marquesina del logotipo** — Efecto 3, con un borde fino arriba ya continuación.
4. **Qué hago**: tres columnas: hablar, asesorar y escribir. Cada uno con un índice de coral, encabezado, tres líneas y un pequeño enlace.
5. **Charlas**: cuatro títulos de charlas en filas grandes con una flecha de color coral, cada una con una descripción de una línea y un lugar. Al pasar el cursor se muestra una miniatura cerca del cursor.
6. **Trabajo seleccionado**: una cuadrícula de dos columnas de cuatro proyectos con imágenes, nombre del cliente y un resultado de una línea. *Resúmenes de imágenes: escenario de conferencia con un orador frente a una gran audiencia, un taller en una sala de juntas con notas adhesivas, la portada de un libro sobre un escritorio, una configuración de grabación de podcast.*
7. **Escritura**: una lista sencilla de seis ensayos y artículos con nombres y años de publicación, sin imágenes.
8. **Números**: cuatro grandes figuras de coral con etiquetas: charlas dadas, países, personas en la sala, libros vendidos.
9. **Cita**: un testimonio muy grande en Syne 600 a lo ancho, atribuido a un director de conferencia.
10. **Biografía**: dos columnas: un retrato en un marco suave a la izquierda, tres párrafos a la derecha, además de un enlace descargable de una línea "Kit de prensa".
11. **Reserva** — sección coral, texto negro: qué incluir en una consulta, rango de tarifa típico y un botón `mailto:`.
12. **Pie de página** — negro, una fila: nombre, correo electrónico, LinkedIn, Instagram, copyright.

## 7. Animaciones
- Nombre: ambas mitades se elevan desde `y: 120` dentro de desbordamiento oculto, 1s, facilidad `[0.22, 1, 0.36, 1]`, 0.12s apart
- Retrato: `scale 1.06 → 1` con desvanecimiento, 1,2 s, comenzando 0,3 s en 
- Filas de discusión: la flecha de coral se desliza 10 px hacia la derecha al pasar el mouse; el texto de la fila se desplaza 6 píxeles a la derecha
- Tarjetas de proyecto: imagen `scale 1 → 1.05` más de 0,9 s al pasar el mouse
- Números: desvanecimiento, animación sin contar
- Punto del cursor: Efecto 2

## 8. Responsive
- **Móvil (<768px):** el nombre se apila en dos líneas de 56px con el retrato debajo en lugar de superponerse; punto del cursor desactivado; las conversaciones pierden la miniatura flotante; los proyectos se convierten en una sola columna; la marquesina se acelera ligeramente; la barra de navegación se convierte en un botón coral "Reservarme" y un ícono de menú que abre una superposición negra de pantalla completa. 
- **Tableta:** efecto de superposición retenido a escala reducida; proyectos 2columns.
- **Escritorio:** héroe con sangrado completo, ancho máximo de contenido 1280px, `px-10`, espacio entre secciones `py-32`.

## 9. Copia completa

**Marca:** NADIA OKONJO · Oradora · Asesora · Escritor

**Navbar:** Charlas · Trabajo · Escritura · Acerca de — Reservarme

**Hero**
- Etiqueta: `PONENTE · ASESOR · ESCRITOR`
- Nombre: `NADIA / OKONJO`
- Declaración: `Ayudo a grandes organizaciones a tomar decisiones más rápido sin tomarlas peor.`

**Logo marquee:** Wired · Shopify · The Economist · Nordea · SXSW · Deutsche Bahn · Monzo · Web Summit · Financial Times · Slush

**Qué hago**
- **01 — Hablando** — `Notas magistrales y charlas finales sobre la toma de decisiones, la velocidad organizativa y el coste del consenso. Alrededor de veinte al año, la mitad de ellos en Europa.` — `Ver charlas`
- **02 — Asesoramiento** — `Talleres de dos días con equipos de liderazgo que están atrapados entre demasiados datos y muy poco valor. Seis compromisos al año, no más.` — `Cómo funciona`
- **03 — Escritura** — `Un libro, una carta quincenal a 24.000 personas y ensayos ocasionales para personas que pagan adecuadamente.` — `Leer la carta`

**Charlas** — H2 `De qué hablo.`
1. **El impuesto al consenso** — `Por qué un acuerdo cuesta más que un conflicto y cómo ponerle precio.` — *Web Summit, Lisboa*
2. **Decidir a velocidad** — `Un método práctico para tomar decisiones reversibles en menos de una hora.` — *SXSW, Austin*
3. **La reunión que debería haber sido tres** — `Sobre el tejido cicatricial organizacional y cómo cortarlo.` — *Slush, Helsinki*
4. **Nadie lee la estrategia** — `Lo que los líderes creen que comunicaron versus lo que lograron.` — *Nordea Leadership Summit, Estocolmo*

**Trabajo seleccionado** — H2 `Recientes *compromisos*.`
- **Deutsche Bahn** — `Recortar un ciclo de planificación de nueve semanas a once días en cuatro equipos.`
- **Monzo** — `Taller de decisión de dos días con el equipo de liderazgo antes de una reorganización de producto.`
- **The Economist** — `Discurso de clausura, Cumbre de Innovación 2026.`
- **Shopify** — `Contrato de asesoramiento sobre marcos de decisión internos, doce meses.`

**Escritura** — Etiqueta `SELECTEDWRITING`
- **The Consensus Tax** — Book, Penguin Business — `2025`
- **Su estrategia es un mecanismo de afrontamiento** — Financial Times — `2026`
- **La velocidad es un problema cultural, no de proceso** — Wired — `2026`
- **Lo que tengo equivocado sobre los equipos planos** — Ensayo personal — `2025`
- **El caso contra el ciclo trimestral** — The Economist — `2025`
- **Cómo estar en desacuerdo por escrito** — Ensayo personal — `2024`

**Números:** `180` charlas impartidas · `31` países · `140.000` personas en la sala · `62.000` libros vendidos

**Cita:** `"Cerró una conferencia de cuatro mil personas y la conversación en el pasillo posterior todavía giraba en torno a su charla dos días después."` — *Marta Lindqvist, directora de programa, Slush*

**Bio** — H2 `Acerca de Nadia.`
`Pasé once años dentro de grandes organizaciones viendo morir las buenas decisiones en los comités. En 2021 lo dejé para trabajar en el problema desde fuera y lo sigo haciendo desde entonces.`
`Mi trabajo se sitúa entre el diseño organizativo y la pura terquedad. No soy un orador motivacional. No hago charlas informales sobre resiliencia. Vengo con un método y espero que la habitación lo utilice.`
`Vivo en Lisboa, hablo inglés, portugués e igbo, y contesto mi propio correo electrónico.`
Enlace: `Descargar kit de prensa y fotos`

**Reserva** — H2 `Hablemos de la habitación.`
`Dime la fecha, el ciudad, el tamaño de la audiencia y en qué se equivocó el orador anterior. Esto último es realmente lo más útil que puede incluir. `
`Las tarifas suelen oscilar entre £ 8 000 y £ 18 000, según el viaje y el formato. Tarifas reducidas para educación y organizaciones sin fines de lucro, siempre.`
Botón: `hello@nadiaokonjo.com`

**Pie de página** — NADIA OKONJO · hello@nadiaokonjo.com · LinkedIn · Instagram · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
