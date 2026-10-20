# The Quiet Portfolio: mensaje del sitio web de la página de inicio del libro electrónico

## 1. Declaración de objetivos
Cree una página de inicio centrada en los libros para **The Quiet Portfolio**, un libro electrónico autoeditado para diseñadores independientes: papel crema, tinta negra, un acento sangre, una sola columna estrecha y una portada de libro en 3D creada en CSS que gira ligeramente a medida que la página loads.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin pago, sin backend de captura de correo electrónico. El botón de compra es un enlace.

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(42, 36%, 94%);       /* cream paper */
  --foreground: hsl(30, 12%, 13%);       /* ink */
  --primary: hsl(356, 48%, 36%);         /* oxblood */
  --primary-foreground: hsl(42, 36%, 96%);
  --muted-foreground: hsl(30, 6%, 42%);
  --border: hsl(38, 16%, 84%);
  --card: hsl(40, 30%, 90%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,500;1,300&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
```
- **H1:** Spectral 500, clamp(40px, 5vw, 72px), altura de línea 1.1, espacio entre letras -0.02em
- **H2:** Spectral 500, clamp(26px, 3vw, 40px)
- **Cuerpo:** Spectral 300, 19px, altura de línea 1.8: esta es una página sobre un libro, por lo que el texto del cuerpo es el diseño
- **Etiquetas, precio, interfaz de usuario:** Inter 500, 12px, mayúsculas, espacio entre letras 0,12em

## 5. Efectos visuales

**Efecto 1: libro CSS 3D.** La portada está construida a partir de tres divs en una perspectiva de 1200px: la cara frontal, un Lomo de 26 píxeles girado en el eje Y y una sombra suave debajo. Comienza girado a 28 grados y se estabiliza en 14 con carga. Al pasar el vuelo, vuelve a girar a 24 grados. No hay imagen de una maqueta: el libro es geometría real.

```jsx
<motion.div
  style={{ transformStyle: "preserve-3d", perspective: 1200 }}
  initial={{ rotateY: 28, y: 20, opacity: 0 }}
  animate={{ rotateY: 14, y: 0, opacity: 1 }}
  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
  className="relative h-[420px] w-[300px]"
>
  <div className="absolute inset-0 rounded-r-md bg-[var(--foreground)] p-8 text-[var(--background)] shadow-2xl">
    {/* cover title set in Spectral, author name at the bottom */}
  </div>
  <div
    className="absolute left-0 top-0 h-full w-[26px] origin-left bg-[hsl(30,12%,8%)]"
    style={{ transform: "rotateY(-90deg) translateZ(0)" }}
  />
</motion.div>
```

**Efecto 2: regla de progreso de lectura.** Una barra de color sangre de 2px fijada en la parte superior de la ventana gráfica que se llena a medida que el visitante se desplaza. Es la única pieza cromada en la página.

**Efecto 3: Marginalia.** Notas breves en el margen izquierdo junto a ciertos párrafos en el escritorio, en mayúsculas Inter 12px y silenciadas, como notas a lápiz en un libro. Se desvanecen cuando su párrafo está a la vista. Oculto debajo de 1024px.

## 6. Desglose de componentes

1. **Regla de progreso** — Efecto 2.
2. **Barra de navegación**: 64 píxeles, transparente, sin enlaces. Solo el título del libro pequeño a la izquierda y el precio con un enlace de texto "Comprar" a la derecha.
3. **Héroe**: dos columnas. Izquierda: etiqueta, H1, sublínea, línea de precio, botón de compra y una línea de tranquilidad. Derecha: el libro 3D (Efecto 1).
4. **El problema**: una única columna estrecha de tres párrafos cortos, conmarginalia (Efecto 3).
5. **Qué hay dentro**: una tabla de contenido: siete capítulos en filas numeradas con un título y una línea cada una, separados por reglas delgadas.
6. **Páginas de muestra**: dos páginas extendidas que se muestran como tarjetas color crema con texto real y una pequeña etiqueta "MUESTRA", ligeramente girada.
7. **Para quién es**: tres columnas cortas con un ícono de verificación cada una.
8. **Acerca del autor**: un pequeño retrato redondo, tres frases y una línea de credencial. *Imagen: retrato amigable de un diseñador de unos cuarenta años en un escritorio, luz suave del día, colores apagados.*
9. **Alabanza**: tres comillas con nombre y función, en cursiva Spectral.
10. **Precios**: una sola tarjeta centrada: precio, lo que obtienes, lista de formatos y el botón de compra. Una sola opción, deliberadamente.
11. **Garantía**: una frase en un panel con borde sobre reembolsos.
12. **Preguntas frecuentes**: cinco elementos nativos `<details>`.
13. **Pulsación final**: un H2 centrado, el libro se volvió más pequeño y un botón de última compra.
14. **Pie de página** — una línea: nombre del autor, correo electrónico y copyright.

## 7. Animaciones
- Libro: Efecto 1 al cargar, active el desplazamiento
- Texto: se desvanece 14px con un escalonamiento de 0,08 s, solo una vez
- Marginalia: se desvanece desde `x: -8`, 0.5s
- Filas de capítulos: aparece gradualmente con un escalonamiento de 0.04s; el número de fila se vuelve sangre de buey al pasar el mouse
- Tarjetas de muestra: levante 4px y enderece al pasar el mouse
- Regla de progreso: Efecto 2

## 8. Responsive
- **Móvil (<768px):** el héroe se acumula con el libro primero a 300px de alto; H1 a 40 px; marginales ocultos; los pliegos de muestra se convierten en una fila horizontal de desplazamiento rápido; el botón de compra se vuelve fijo en la parte inferior de la pantalla después de que el héroe se desplaza.
- **Tableta:** el héroe permanece dividido 55/45; marginalia oculta.
- **Escritorio:** columna de contenido con ancho máximo de 720 px, marginalia en un margen izquierdo de 200 px, espacio entre secciones `py-24`.

## 9. Copia completa

**Libro:** THE QUIET PORTFOLIO · por Marek Halloran

**Hero**
- Etiqueta: `UN LIBRO CORTO PARA DISEÑADORES FREELANCE`
- H1: `Su cartera es ruidosa y no funciona.`
- Sublínea: `Noventa y cuatro páginassobre por qué las carteras más atractivas pierden a los mejores clientes y cómo reconstruir la suya en torno a los tres proyectos que realmente venden su trabajo.`
- Línea de precio: `£19 · PDF y EPUB · Léalo en una tarde`
- Botón: `Comprar el libro — £19`
- Tranquilidad: `Descarga instantánea · Leer cualquier cosa · Reembolso dentro 30 días, sin preguntas`

**El problema** — H2 `Nadie lee un portafolio. Lo escanean.`
- `La mayoría de los diseñadores crean un portafolio para otros diseñadores. Treinta proyectos, transiciones animadas, un estudio de caso para un logo que tomó un día. Parece logrado y convierte terriblemente.`
- `La persona que lo contrata no es un diseñador. Tienen once pestañas abiertas, seis minutos y una pregunta: ¿esta persona ha resuelto mi problema antes?`
- `Este libro trata de responder esa pregunta en doce segundos, que es aproximadamente el tiempo que realmente tardas.`
Marginalia: `La visita promedio al portafolio dura 47 segundos.` · `Tres proyectos ganan a treinta. Siempre.` · `Escribe para el cliente, no para el compañero.`

**Qué hay dentro** — H2 `Siete capítulos, noventa y cuatro páginas.`
1. **Por qué treinta proyectos es peor que tres** — `Las matemáticas de la atención y cómo se ve realmente el escaneo.`
2. **Elegir los tres** — `Una prueba sencilla para saber qué trabajo mostrar y cuál eliminar.`
3. **Redacción del estudio de caso** — `Una estructura de seis partes que puedes completar para cualquier proyecto en cuarenta minutos.`
4. **La primera pantalla**: `Qué poner en la mitad superior de la página para que los clientes equivocados se vayan inmediatamente.`
5. **Precios en la página** — `Cuándo mostrar números y qué sucede cuando lo haces.`
6. **La página acerca de que nadie escribe** — `Por qué esta es la segunda página más visitada y normalmente la peor.`
7. **Enviarlo** — `Divulgación en frío que hace referencia al trabajo en lugar de describirlo.`

**Páginas de muestra** — Etiqueta `SAMPLE`
- `"Elimine todos los proyectos para los que no le gustaría que lo contrataran nuevamente. Está anunciando más del mismo trabajo, así que anuncie el trabajo que desea."`
- `"Un estudio de caso no es una historia sobre usted. Es evidencia, dispuesta en el orden que una persona escéptica la necesita:problema, restricción, decisión, resultado." `

**Para quién es**
- **Trabajadores independientes que están ocupados pero mal pagados** — `Consigues trabajo, pero simplemente no es el trabajo que deseas.`
- **Diseñadores que abandonan una agencia** — `Tienes grandes proyectos que no puedes mostrar y necesitas arreglarlos rápido.`
- **Cualquiera que reconstruya un sitio este mes** — `Lea esto antes de abrir Figma, no después.`

**Acerca del autor** — H2 `Escrito por alguien que se equivocó durante años.`
`Marek Halloran ha sido diseñador independiente durante catorce años, primero en Dublín y ahora en Berlín. Reconstruyó su propio portafolio cuatro veces. antes de comprender por qué la tercera versión, la más fea, generó tres veces más trabajo.`
Credencial: `Los clientes han incluido Monzo, Patagonia y dos empresas que ya no existen.`

**Elogios**
- `"Corté veintidós proyectos y dupliqué mi tarifa en el mismo mes. El libro es básicamente una hoja de permiso."` — **Anya Ruiz**, diseñadora de marca
- `"La estructura del estudio de caso por sí sola vale el precio. Ahora lo uso como plantilla."` — **Tom Greening**, diseñador de producto
- `"Breve, contundente y no te hace perder la noche."` — **Sofia Lind**, ilustradora

**Precios** — H2 `Un precio. Un libro.`
- `£19`
- `PDF de 94 páginas, formateado para leer en una computadora portátil`
- `EPUB para lectores electrónicos`
- `La plantilla de estudio de caso como un archivo separado`
- `Actualizaciones gratuitas para siempre — versión 2.1, septiembre de 2026`
- Botón: `Comprar el libro — £19`

**Garantía:** `Si no cambia tu forma de pensar sobre tu portafolio, envíame un correo electrónico dentro de los treinta días y te lo reembolsaré. Conservas los archivos.`

**Preguntas frecuentes**
- **¿Es un libro impreso?** `No, solo PDF y EPUB, por eso cuesta £19 y no. £39.`
- **¿Cuánto tiempo lleva leerlo?** `Unos noventa minutos. Es deliberadamente corto.`
- **¿Es esto solo para diseñadores?** `En su mayoría, los fotógrafos y redactores publicitarios me han dicho que los capítulos dos a cuatro se aplican directamente.`
- **¿Recibo actualizaciones?** `Sí, gratis, para siempre. sale una nueva versión.`
- **¿Puedo gastarlo?** `Hayuna factura adecuada con sus datos en la página de descarga.`

**Empuje final** — H2 `Léelo esta noche. Reconstrúyalo este fin de semana.` Botón `Compre el libro — £19`

**Pie de página** — The Quiet Portfolio · marek@quietportfolio.com · © 2026 Marek Halloran

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
