# Brushwork — Aviso del sitio web de la empresa de pintura

## 1. Declaración de objetivos
Cree un sitio web tranquilo y artesanal para **Brushwork**, una empresa de pintura y decoración residencial: blanquecino tiza, verde bosque profundo y tarjetas de muestras de pintura real como elemento visual organizador, para que toda la página parezca elegir un color en lugar de contratar un profesional.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes ni calculadora de cotizaciones. La fila de muestras cambia un color de acento en la página y nada más.

## 3. Sistema de diseño: Colores
```css
:root {
  --background: hsl(42, 22%, 95%);       /* chalk */
  --foreground: hsl(150, 14%, 14%);
  --primary: hsl(154, 30%, 26%);         /* forest green */
  --primary-foreground: hsl(42, 22%, 96%);
  --muted-foreground: hsl(150, 6%, 44%);
  --border: hsl(42, 14%, 86%);
  --card: hsl(42, 18%, 91%);
  --swatch: var(--primary);              /* changed by the swatch picker */
}
```
Paleta de muestras utilizada por el seleccionador: `hsl(154,30%,26%)` Helecho · `hsl(18,44%,52%)` Terracota · `hsl(210,34%,38%)` Azul pizarra · `hsl(38,48%,62%)` Ocre · `hsl(348,26%,40%)` Claret · `hsl(28,12%,32%)` Marrón Carbón

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;600&family=Karla:wght@300;400;600&display=swap" rel="stylesheet" />
```
- **H1:** Bitter 600, clamp(42px, 5.4vw, 80px), line-height 1.06, espaciado entre letras -0.02em
- **H2:** Bitter 600, clamp(28px, 3.4vw, 48px)
- **Cuerpo:** Karla 300, 17px, altura de línea 1.7
- **Etiquetas y nombres de colores:** Karla 600, 12px, mayúsculas, espacio entre letras 0,12em

## 5. Efectos visuales

**Efecto 1: Selector de muestras.** Una fila de seis tarjetas de muestras de pintura, cada una de las cuales es un rectángulo redondeado de color sólido con el nombre del color y un código de pintura debajo, inclinadas muy ligeramente en ángulos alternos entre -2 y 2 grados. Al hacer clic en uno, se establece `--swatch` en `:root`, por lo que el acento subrayado del héroe, los botones y las reglas de la sección cambian de color. Esa es toda la interacción.

```jsx
<button
  onClick={() => document.documentElement.style.setProperty("--swatch", c.hsl)}
  style={{ background: c.hsl, rotate: `${c.tilt}deg` }}
  className="h-28 w-24 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-2 hover:rotate-0"
  aria-label={`Preview ${c.name}`}
/>
```

**Efecto 2: subrayado de pincelada.** La palabra de acento en H1 se ubica sobre un trazo pintado a mano dibujado como una ruta SVG en línea en `--swatch`, con un borde rugoso. Se dibuja de izquierda a derecha al cargar usando `pathLength`, durante 1,1 segundos. 

**Efecto 3: Textura de papel.** Una superposición de ruido SVG fija con una opacidad del 4% con "modo de mezcla: multiplicar", por lo que el fondo calcáreo se lee como una emulsión mate en lugar de un blanco plano.

## 6. Componente Desglose

1. **Barra de navegación**: 82 px, tiza, regla inferior delgada. Marca denominativa a la izquierda en Bitter, enlaces a la derecha, un botón delineado "Obtener una cotización" en `--swatch`.
2. **Héroe** — dividido 55/45. Izquierda: etiqueta,H1 con el subrayado de pincelada (Efecto 2), sublínea, dos botones y una pequeña línea de credenciales. Derecha: una fotografía alta de una habitación recién pintada. *Imagen: sala de estar iluminada por el sol con paredes pintadas de verde intenso, carpintería blanca, un sillón, sombras naturales, fotografía editorial de interiores.*
3. **Selector de muestras**: Efecto 1, seis muestras con una breve línea de texto que explica que se mezclan y combinan en el sitio.
4. **Servicios** — cuatro filas separadas por reglas: pintura interior, pintura exterior, empapelado, carpintería y restauración. Cada uno con un título, dos frases y una pequeña cifra de precio.
5. **Trabajo reciente**: una galería de tres columnas de seis habitaciones con un título con el nombre del color debajo de cada una, con el estilo de las etiquetas de las muestras. *Resúmenes de imágenes: interiores pintados: un pasillo de terracota, un comedor azul marino, una cocina blanca con gabinetes verdes, un dormitorio color burdeos, un estudio pálido, un exterior victoriano repintado.*
6. **Cómo se ejecuta un trabajo**: cinco pasos hacia abajo en una línea vertical con fechas como "Día 1", "Día 2", escritas para que la gente sepa exactamente qué sucede en su casa.
7. **Lo que cuesta**: tres trabajos típicos con precios reales y lo que está incluido.
8. **La promesa del orden**: un breve panel: sábanas para el polvo, orden al final del día, sin radio, sin fumar, sin zapatos.
9. **Reseñas**: tres citas seguidas con nombre, ciudad y trabajo.
10. **Áreas y contacto**: ciudades cubiertas, además de teléfono, correo electrónico y horario.
11. **Pie de página**: tiza, regla delgada, tres columnas, seguro y línea de registro.

## 7. Animaciones
- Texto de héroe: desvanecimiento 18px, escalonamiento 0.08s, 0.8s
- Trazo de pincel: Efecto 2 en la carga
- Muestras: colocar desde `y: -18` con un resorte pequeño, escalonado 0.06s; levante y enderece al pasar el mouse
- Imágenes de la galería: desvanecimiento y `scale 1.03 → 1`, escalonamiento 0.08s; subtítulo subrayado en `--swatch` al pasar el mouse
- Línea de tiempo: `scaleY 0 → 1`, 1.2s, cuando la sección ingresa a la vista
- Transiciones de color cuando se selecciona una muestra: 400 ms de facilidad en cada elemento que usa `--swatch`

## 8. Responsive
- **Móvil (<768px):** el héroe se acumula con la fotografía primero a 54vh; H1 a 42 px;las muestras se convierten en una fila de desplazamiento rápido horizontal; la galería se convierte en 2 columnas; la línea de tiempo permanece vertical con letras más pequeñas; la barra de navegación muestra una marca denominativa y un botón "Citar". 
- **Tableta:** galería 2 columnas; el héroe permanece dividido.
- **Escritorio:** ancho máximo 1240px, `px-10`, espacio entre secciones `py-28`.

## 9. Copia completa

**Marca:** PINCEL · Pintores y decoradores · Edimburgo

**Navbar:** Servicios · Nuestro trabajo · Precios · Áreas · Contacto — Obtenga una cotización

**Hero**
- Etiqueta: `PINTORES Y DECORADORES EN EDIMBURGO`
- H1: `Habitaciones que parecen *terminadas*, no solo pintadas.`
- Sublínea: `Dos decoradores, dieciocho años y un disgusto por los bordes mal cortados. Pintamos casas en Edimburgo y Lothians, y las dejamos más limpias de lo que las encontramos.`
- Botones: `Obtenga una cotización gratuita` · `Ver trabajo reciente`
- Credenciales: `Dulux Select Decorator · Totalmente asegurado · Comercio registrado SELECT`

**Selector de muestras** — H2 `Elija un color. Observe el cambio de página.`
`Mezclamos y combinamos cualquier marca (Farrow & Ball, Little Greene, Dulux Trade) y traemos macetas de muestra a la cotización para que pueda verlas en su propia pared, bajo su propia luz.`
- **Fern** — `Little Greene 295`
- **Terracotta** — `F&B 64`
- **Azul pizarra** — `F&B 30`
- **Ocre** — `Little Greene 74`
- **Claret** — `F&B 43`
- **Marrón carbón** — `Dulux Trade 22`

**Servicios** — H2 `Qué hacemos.`
- **Pintura de interiores** — `Paredes, techos, carpintería y puertas, con la preparación adecuada: relleno, lijado, calafateo y dos manos completas.` — `desde £280 por habitación`
- **Pintura de exteriores** — `Enlucido, mampostería, ventanas de guillotina y puertas de entrada, si el clima lo permite y andamios cuando sea necesario.` — `desde £1,400`
- **Empapelado** — `Colgar, forrar y combinar patrones, incluidos papeles pesados y delicados.` — `desde £180 por pared`
- **Carpintería y restauración** — `Reparación de ventanas de guillotina, decapado, anudado y repintado de carpintería de época.` — `cotizado por job`

**Trabajo reciente** — H2 `Recientemente *terminado*.`
Hpasillo en Terracota · Comedor en Azul Pizarra · Cocina enHelecho · Dormitorio en Claret · Estudio en tiza · Exterior victoriano en Charcoal Brown

**Cómo funciona un trabajo** — H2 `Qué sucede realmente en tu casa.`
- **Día 0 — La cotización** — `Visitamos, medimos, traemos vasijas de muestra y enviamos por correo electrónico un precio fijo en dos días.`
- **Día 1 — Proteger y preparar** — `Los muebles se movieron y cubrieron, los pisos se cubrieron con láminas y luego se rellenaron, lijaron y calafatearon. La mayor parte del trabajo está aquí.`
- **Día 2 — Primeras capas** — `Techos, luego paredes, luego carpintería, en ese orden, siempre.`
- **Día 3 — Segundas capas** — `Cortado a mano. No grabamos, porque una mano firme da una línea más nítida.`
- **Día 4 — Enganche y ordenado** — `Caminamos contigo, arreglamos cualquier cosa que veas y quitamos cada capa de polvo.`

**Lo que cuesta** — H2 `Precios reales de trabajos recientes.`
- **Un dormitorio, paredes y techo** — `£340` — `Dos capas, relleno menor, carpintería retocada. Un día y medio.`
- **Un pasillo, escaleras y rellano** — `£890` — `Preparación completa, dos capas por todas partes, barandilla y husillos a mano. Tres días.`
- **Un apartamento de tres habitaciones, todo** — `£2,650` — `Cada habitación, techos, carpintería y puertas, pintura incluida. Nueve días.`

**La promesa del orden** — H2 `Estamos en tu casa y lo sabemos.`
`Quita el polvo de todo, lo ordenas al final de cada día, te quitas los zapatos en el piso de arriba, no hay radio a menos que quieras una y no fumar en ningún lugar cerca del trabajo. Recibirás un mensaje de texto la noche anterior con nuestra hora de llegada.`

**Reseñas**
- `"Rellenaron y lijaron durante todo un día antes de que cayera una gota de pintura. Puedes ver la diferencia en la cornisa."` — *Katie, Marchmont*
- `"Cotizó £890, cobró £890, terminó un día antes y aspiró el escaleras."` — *Douglas, Corstorphine*
- `"Nuestras ventanas de guillotina estaban podridas en la parte inferior. Las repararon en lugar de reemplazarlas y nos salvaron miles."` — *Fiona, Leith*

**Áreas y contacto:** Edimburgo · Leith · Morningside · Corstorphine · Portobello · Musselburgh · Dalkeith · Livingston · Linlithgow · Sur. Queensferry
`0131 460 7712` · `hello@brushwork.scot` · `Lunes a Viernes 7:30am – 5pm, citas en elvelada por acuerdo`

**Pie de página** — BRUSHWORK · Servicios · Nuestro trabajo · Precios · Áreas · Contacto · `Brushwork Decorating Ltd, registrada en Escocia SC712804 · Seguro de responsabilidad civil de £ 5 millones` · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
