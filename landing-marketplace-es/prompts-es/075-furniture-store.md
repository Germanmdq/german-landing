# Oakline Furniture — Mensaje del sitio web de la tienda de muebles

## 1. Declaración de objetivos
Crear un sitio web editorial de venta de muebles con calidad de catálogo para **Oakline Furniture**, definido por espacios en blanco avena, marrón nogal y fotografías de productos de gran tamaño: un sitio de tienda que se lee como una revista de diseño sin dejar de realizar el trabajo minorista: busque por habitación, compare materiales y reserve una sala de exposición visita.

---

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño: Colores

```css
:root {
  --background: hsl(38, 28%, 95%);        /* #f5f1ea oat */
  --foreground: hsl(28, 18%, 16%);        /* #2f2822 walnut ink */
  --primary: hsl(26, 32%, 32%);           /* #6b4f38 walnut */
  --primary-foreground: hsl(38, 28%, 97%);
  --muted-foreground: hsl(28, 8%, 46%);
  --border: hsl(36, 16%, 86%);
  --card: hsl(38, 30%, 91%);
  --accent-sage: hsl(96, 12%, 52%);       /* muted sage for tags */
  --sale: hsl(8, 62%, 48%);               /* used sparingly */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- **H1 / hero:** `'Instrument Serif', serif;` peso 400, clamp(42px, 6vw, 86px), altura de línea: 1,02, espacio entre letras: -0,015em
- **H2:** Instrument Serif 400, 36–52px
- **H3 / nombres de productos:** Inter 500, 17–20px
- **Cuerpo:** Inter 300–400, 16px, altura de línea: 1.75
- **Cejas/etiquetas:** Inter 600, mayúsculas, espacio entre letras: 0.2em, 10px
- **Precios:** Inter 500, tabular-nums, 16px
- **Extraiga citas/notas de material:** Instrument Serif italic 400, 22–28px

---

## 5. Efectos visuales

### Efecto 1: desplazamiento por habitación Reveal
```tsx
const rooms = ['Living', 'Dining', 'Bedroom', 'Workspace'];
const [active, setActive] = useState(0);

<div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 items-center">
  <ul>
    {rooms.map((r, i) => (
      <li key={r} onMouseEnter={() => setActive(i)} className="border-b border-[var(--border)]">
        <button className="group flex w-full items-baseline justify-between py-6 text-left">
          <span
            className="font-serif text-4xl md:text-5xl transition-colors duration-300"
            style={{ color: active === i ? 'var(--foreground)' : 'var(--muted-foreground)' }}
          >
            {r}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Shop →
          </span>
        </button>
      </li>
    ))}
  </ul>
  <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
    <AnimatePresence mode="wait">
      <motion.img
        key={active}
        src=""
        alt={`${rooms[active]} room setting`}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </AnimatePresence>
  </div>
</div>
{/* Image (per room): styled interior room setting with furniture in warm natural daylight, editorial interiors photography, calm neutral palette, lived-in but uncluttered */}
```

### Efecto 2: Tarjeta de producto con conmutador de muestras
```tsx
<div className="group">
  <div className="relative aspect-square overflow-hidden bg-[var(--card)]">
    {/* Image: single furniture piece on a plain warm backdrop, soft directional daylight, gentle shadow, product photography */}
    <img src="" alt="Lounge chair in oak and boucle" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
    <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-label="Save">
      <Heart size={16} />
    </button>
  </div>
  <div className="mt-4 flex items-start justify-between gap-4">
    <div>
      <h3 className="font-medium">Alden Lounge Chair</h3>
      <p className="text-sm text-[var(--muted-foreground)]">White oak · Boucle</p>
    </div>
    <span className="tabular-nums">$1,290</span>
  </div>
  <div className="mt-3 flex gap-2">
    {['#c8b89a', '#6b4f38', '#3a3a38', '#8f9a86'].map(c => (
      <button key={c} className="h-4 w-4 rounded-full ring-1 ring-black/10 transition-transform hover:scale-125" style={{ background: c }} aria-label="Colour option" />
    ))}
  </div>
</div>
```

### Efecto 3: Filas divididas editoriales (alternando)
```
Full-bleed image on one side, text block on the other, alternating direction each row.
Image reveals with clipPath wipe from its outer edge; text fades up with 0.15s delay.
```

### Efecto 4: desvanecimiento
```
initial={{ opacity: 0, y: 26 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
```

---

## 6. Componente Desglose

### Sección 1: barra de navegación
- 80px, `sticky top-0 z-40`, fondo avena, borde inferior de 1px en el desplazamiento
- Izquierda: "OAKLINE" (Instrument Serif 400, seguimiento 0.08em)
- Centro: Sala · Comedor · Dormitorio · Espacio de trabajo · Iluminación · Oferta
- Derecha: icono de búsqueda · icono guardado (corazón) · icono de carrito con distintivo de recuento · `Visita la sala de exposición` (contorno de nogal, oculto debajo de `lg`)
- Barra de anuncios encima de la barra de navegación: `Entrega gratuita en pedidos superiores a $999 · Las piezas hechas a pedido se envían en 6 a 8 semanas`
- Móvil: hamburguesa + marca denominativa + carrito

### Sección 2 — Héroe (Editorial a sangre completa)
- `h-[88vh]`, imagen a sangre completa, bloque de textoabajo a la izquierda en un panel de avena semiopaco
```jsx
{/* Image: warm minimal living room with a linen sofa and oak coffee table, late afternoon light across the floor, editorial interiors photography, calm neutral palette */}
<img src="" alt="Living room in afternoon light" className="absolute inset-0 h-full w-full object-cover object-center" />
<div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(47,40,34,0.5) 0%, transparent 50%)' }} />
```
- Panel de texto (`bg-[var(--background)]/92 backdrop-blur-sm p-10 max-w-xl rounded-sm`):
 - Ceja: `LA COLECCIÓN DE PRIMAVERA`
 - H1: `Muebles construidos\npara sobrevivir\nel tendencia.`
 - Sublínea: `Madera maciza, fibras naturales y carpintería que se puede ver. Diseñado en Brooklyn, fabricado en Carolina del Norte.`
 - Fila de CTA: `Compre la colección` (relleno de nuez) + `Reserve una visita a la sala de exposición` (enlace de texto con flecha)

### Sección 3: Compre por habitación
- `--background`, `py-24`
- Ceja `COMPRAR POR HABITACIÓN` + lista de habitaciones para revelar al pasar el cursor (Efecto 1)

### Sección 4: Recién llegados
- `--background`, ceja `NUEVO ESTA TEMPORADA` + H2 `Recién llegado`
- **cuadrícula de productos de 4 columnas** (Efecto 2), 8 productos
- Desplazamiento horizontal en el móvil con `snap-x`
- `Ver todos los recién llegados →`

### Sección 5 — Historia de materiales (división editorial)
- Filas alternas (efecto 3), fondo `--card`
- Tres filas: **La Madera** · **La Tela** · **La Carpintería**
- Cada una: imagen a sangre completa en un lado, ceja + H2 + 2 párrafos + una pequeña lista de especificaciones en el otro
```jsx
{/* Image: close-up of white oak grain with a hand plane resting on it, warm workshop light, tactile and detailed */}
{/* Image: stacked folded upholstery fabrics in neutral tones, natural daylight, textile detail */}
{/* Image: exposed mortise and tenon joint on a table leg, macro detail, warm workshop lighting */}
```

### Sección 6 — Más vendidos
- `--background`, ceja `MOST LOVED` + H2 `Best Sellers`
- Cuadrícula de productos de 4 columnas, 4 productos, cada uno con una pequeña etiqueta de salvia `Best seller`

### Sección 7 — Galería de inspiración de habitaciones
- Mampostería de 3 columnas sin sangrado de tomas de habitaciones con estilo con `Comprar esta habitación →` superposición al pasar el mouse
- Ceja `INSPIRACIÓN` + H2 `Habitaciones en las que viviríamos`

### Sección 8 — Sala de exposición
- `--card`, división de 2 columnas
- Izquierda: ceja `VISÍTENOS`, H2 `Siéntese primero`, párrafo, dirección, horario, botón `Reservar una consulta de diseño`
- Derecha: imagen interior de la sala de exposición
```jsx
{/* Image: bright furniture showroom interior with styled vignettes, large windows, warm wood floors, uncrowded and calm */}
```

### Sección 9: Entrega y cuidado
- `--background`, tarjetas de información de 3 columnas con íconos delineados
- Entrega excepcional · Plazo de entrega de fabricación a medida de 6 a 8 semanas · Garantía estructural de 10 años
- A continuación: `Lea nuestra guía de cuidados →`

### Sección 10: Reseñas
- `--card`, 3 tarjetas de revisión: fila de 5 estrellas, cotización, nombre y una pequeñaLínea `Comprador verificado · Alden Sofa`

### Sección 11 — Boletín informativo
- Banda de nogal con sangrado completo, texto en avena, centrado
- H2 `Piezas nuevas, primer vistazo.` + entrada de correo electrónico en línea + botón `Registrarse` + `Un correo electrónico al mes. Cancelar suscripción cuando quieras.`

### Sección 12 — Pie de página
- `--background` con borde superior de 1 px, 5 columnas: marca + dirección / Tienda / Acerca de / Soporte / Resumen del boletín
- Franja inferior: línea ©, insignias de texto de método de pago, privacidad, accesibilidad

---

## 7. Animaciones

- **Hero:** la imagen escala `1,06 → 1` en 10 s lineal (deriva muy lenta); el panel de texto se desvanece 0,85 s a 0,2 s 
- **Lista de habitaciones:** transiciones de color del nombre de la habitación activa 0,3 s; fundidos cruzados de imagen con `AnimatePresence`, `scale 1.04 → 1`, 0.55s
- **Tarjetas de producto:** escalonado `i * 0.07`; la imagen escala 1 → 1,03 en 0,7 s al pasar el mouse; el corazón salvado se desvanece en 0,3 segundos; las muestras escalan 1,25 al pasar el mouse
- **Filas editoriales:** imagen `clipPath: inset(0 0 0 100%) → inset(0 0 0 0)` (dirección alterna por fila), 1,05s; el texto se desvanece 0,15 s después
- **Galería de mampostería:** `Compre esta habitación →` la superposición se desvanece con una tela oscura, 0,35 s
- **Banda del boletín:** el color de fondo se desvanece a medida que la sección entra a la vista, 0,7 s
- **Todos los encabezados:** se desvanece 0.7s, facilidad `[0.22, 1, 0.36, 1]`

---

## 8. Responsive

### Móvil (< 768px)
- Barra de anuncios: el texto se acorta a `Entrega gratuita $999`
- Barra de navegación: hamburguesa + marca denominativa + carrito; menú superpuesto de pantalla completa con enlaces de categorías serif
- Hero: `h-[70vh]`, el panel de texto se vuelve de ancho completo en la parte inferior sin desenfoque, H1 se fija a 42px
- Comprar por habitación: la lista se convierte en mosaicos de imágenes de 2x2 con el nombre de la habitación superpuesto (la revelación al pasar el cursor no funciona al tacto)
- Producto cuadrículas: desplazamiento horizontal con `snap-x`, tarjetas en 72vw
- Filas editoriales: imagen siempre encima del texto, sin alternancia
- Galería: mampostería de 2 columnas
- Sala de exposición: imagen sobre el texto
- Pie de página: columna plegable estilo acordeón grupos

### Tableta (768–1024px)
- Cuadrículas de productos de 3 columnas · las filas editoriales siguen alternándose · galería de 2 columnas · lista de salasretiene la revelación al pasar el cursor

### Escritorio (> 1024px)
- Ancho máximo 1360px (ancho, tipo catálogo), `px-16`, `py-24`

---

## 9. Completo Copia

### Marca
**OAKLINE FURNITURE** — Brooklyn, Nueva York

### Barra de anuncios
`Entrega gratuita en pedidos superiores a $999 · Las piezas hechas a pedido se envían en 6 a 8 semanas`

### Navbar
Living · Comedor · Dormitorio · Espacio de trabajo · Iluminación · Venta · [Botón] Visitar Showroom

### Hero
- Ceja: `LA COLECCIÓN DE PRIMAVERA`
- H1: `Muebles construidos para sobrevivir a la tendencia.`
- Sublínea: `Madera maciza, fibras naturales y carpintería que se puede ver. Diseñado en Brooklyn, fabricado en Carolina del Norte.`
- CTA 1: `Compre la colección` · CTA 2: `Reserve una visita a la sala de exposición →`

### Compre por habitación
Eceja: `COMPRAR POR HABITACIÓN`
`Living` · `Comedor` · `Dormitorio` · `Workspace`

### Novedades
Eceja: `NUEVO ESTA TEMPORADA` — H2: `Recién llegado`
1. **Sillón Alden** — Roble blanco · Boucle — `$1,290`
2. **Sofá Marlow de 3 plazas** — Base de nogal · Lino belga — `$3,450`
3. **Mesa de comedor Fennimore** — Roble blanco macizo · Asientos 8 — `$2,780`
4. **Aparador Ridge** — Nogal · Tiradores de latón — `$2,190`
5. **Estructura de cama Copse, Queen** — Fresno · Cabecera de mimbre — `$1,940`
6. **Escritorio Halden** — Roble blanco · Acero ennegrecido — `$1,480`
7. **Sillón Yarrow** — Fresno · Franela de lana — `$980`
8. **Librería Bramble** — Roble macizo · Estantería ajustable — `$1,620`

### Historia de los materiales
1. **La madera** — Ceja `MATERIALES` — `Utilizamos madera maciza, no chapa sobre aglomerado. Nuestro roble y nogal provienen de bosques con certificación FSC en los Apalaches, fresados ​​a menos de 200 millas de nuestro taller.` / `La madera maciza cambia con las estaciones. Un pequeño espacio en una mesa en febrero que se cierra en julio no es un defecto; es la razón por la que la pieza seguirá en pie dentro de cincuenta años.` — Especificaciones: `Madera dura con certificación FSC` · `Secada en horno hasta un 7% de humedad` · `Acabado a base de agua con bajo contenido de COV`
2. **La tela** — `Lino belga, franela de lana y boucle tejidos en fábricas que tenemosvisitado. Sin revestimientos de alto rendimiento, sin mezclas que eliminan microplásticos y sin telas que no usaríamos en nuestros propios hogares.` / `Cada pieza tapizada viene con fundas removibles, y las fundas de repuesto están disponibles durante diez años después de la compra, porque los sofás generalmente duran más que su tela.` — Especificaciones: `Lino y lana belgas` · `Fundas removibles` · `Más de 100,000 frotamientos dobles`
3. **La carpintería** — `Mortaja y espiga, colas de milano y clavijas. Sin cerraduras de leva, sin soportes de plástico y sin pegamento que mantenga unida una estructura por sí sola.` / `Puedes ver la carpintería en cada pieza que hacemos, porque creemos que la forma en que se construye algo debe ser visible en lugar de estar oculta debajo de una tapa laminada.` — Especificaciones: `Marcos de mortaja y espiga` · `Cajones con cola de milano` · `Garantía estructural de 10 años`

### Mejor Vendedores
Eceja: `MÁS AMADO` - H2: `Más vendidos`
1. **Sofá Marlow de 3 plazas** — `$3,450` · *El más vendido*
2. **Mesa de comedor Fennimore** — `$2,780` · *Mejor vendido*
3. **Sillón Alden** — `$1,290` · *Mejor vendido*
4. **Aparador Ridge** — `$2,190` · *Mejor vendido*

### Inspiración
Eceja: `INSPIRACIÓN` — H2: `Habitaciones en las que viviríamos`
Subtítulos: `Una pequeña sala de estar que no se siente pequeña` · `Comedor para ocho personas en 140 pies cuadrados` · `El rincón del espacio de trabajo` · `Un dormitorio sin nada extra` · `Plan abierto, definido por muebles` · `Entrada, bien hecha`

### Showroom
Eceja: `VISÍTANOS` — H2: `Siéntate primero`
Párrafo: `Las fotografías son útiles para la forma y terribles para la comodidad. Nuestra sala de exposición de Brooklyn tiene todas las piezas actuales en el piso y nadie lo seguirá. Traiga su plano de planta y un café; las consultas de diseño son gratuitas y duran aproximadamente una hora.`
- Dirección: `184 Wythe Avenue, Brooklyn, NY 11249`
- Horario: `Lunes a sábado de 10 a. m. a 7 p. m. · Dom de 11 a. m. a 5 p. m.`
- CTA: `Reserve un diseño Consulta`

### Entrega y atención
1. **Entrega con guante blanco** (icono: `Camión`): lo traemos, lo ensamblamos, lo colocamos donde usted lo desee y nos llevamos el embalaje. Gratis en pedidos superiores a $999.
2. **Hecho por encargo** (icono: `Martillo`): la mayoría de las piezas sonSe construyen después de realizar el pedido, lo que lleva de seis a ocho semanas. Los artículos en stock se envían en una semana.
3. **Garantía estructural de 10 años** (icono: `ShieldCheck`): marcos, carpintería y herrajes durante diez años. El desgaste de la tela y los acabados están cubiertos para tres.
Enlace: `Lea nuestra guía de cuidados →`

### Reseñas
1. "Llegó el Marlow y mi compañero se sentó en él y no dijo nada durante aproximadamente un minuto, lo que para él es una gran ovación". — **Devon L.** · Comprador verificado · Marlow Sofa
2. `Pedí la mesa del comedor pensando que algo a ese precio me decepcionaría. Tres años y dos mudanzas después, no hay ni un solo bamboleo.` — **Priya M.** · Comprador verificado · Mesa de comedor Fennimore
3. `El equipo de entrega se llevó el sofá viejo, montó el nuevo y aspiró la habitación. No les pedí que hicieran la última parte.` — **Tomás R.** · Comprador verificado · Alden Lounge Chair

### Newsletter
H2: `Piezas nuevas, primer vistazo.`
Sublínea: `Un correo electrónico al mes. Cancelar suscripción cuando quieras.`
CTA: `Registrarse`

### Pie de página
- MUEBLES OAKLINE · `Diseñado en Brooklyn. Hecho en Carolina del Norte.`
- Dirección: `184 Wythe Avenue, Brooklyn, NY 11249` · `(718) 555-0172`
- Tienda: Sala · Comedor · Dormitorio · Espacio de trabajo · Iluminación · Oferta
- Acerca de: Nuestra historia · Materiales · Sostenibilidad · Sala de exposición · Empleo
- Soporte: Entrega · Devoluciones · Guía de cuidado · Garantía · Programa comercial · Contacto
- © 2026 Oakline Furniture. Reservados todos los derechos. · Privacidad · Accesibilidad

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "embla-carousel-react": "^8.3.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

**Adiciones de configuración de Tailwind:**
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'ok-oat': '#f5f1ea',
        'ok-walnut': '#6b4f38',
        'ok-sage': '#818f79',
      },
      borderRadius: { DEFAULT: '2px' },
    },
  },
};
```
