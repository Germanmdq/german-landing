# Falls & Sons: Aviso del sitio web de limpieza de canaletas

## 1. Objetivo
Cree un sitio web sencillo y confiable para **Falls & Sons**, una empresa de limpieza de canaletas que trabaja desde un poste de aspiradora y una escalera. Papel pizarra, tinta oscura, un acento en azul agua de lluvia, un grotesco resistente y una firma: una sección de canal dibujada donde una sola línea de agua encuentra su camino hacia la bajante. Nada llamativo, porque el cliente sólo quiere que el agua deje de salir del borde.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin motor de reservas, sin calculadora de cotizaciones. Las acciones son un enlace telefónico y un enlace de correo electrónico.

## 3. Sistema de diseño
```css
:root {
  --paper: #EDEFF0;
  --ink: #1C2226;
  --accent: #2E6E8E;           /* rainwater blue */
  --on-accent: #FFFFFF;
  --surface: #E0E4E6;
  --muted: #5B666D;
  --line: rgba(28,34,38,0.15);
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Archivo 700, clamp(42px, 5.6vw, 86px), altura de línea 1.0, espacio entre letras -0.035em
- **Cuerpo:** Inter 300, 16px, altura de línea 1.6
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas, espacio entre letras 0,06em. Precios, recuento de plantas, horarios, etiquetas de índice.
- Sin cursiva. Énfasis por una línea completa en azul agua de lluvia.

## 5. Elemento característico
**Agua encontrando la bajante.** Una sección transversal de un canalón dibujado con líneas finas de tinta de 2px: la fascia, el tramo del canalón, un soporte y el tubo de bajada a la derecha. Una línea azul comienza en el extremo izquierdo, corre a lo largo del canalón, se detiene ante un grupo de hojas dibujadas, luego continúa y baja por la tubería. Extrae una vez durante 2 segundos con `pathLength`, y las hojas se desvanecen a medida que pasa.

Sin bucle, sin salpicaduras, sin gotas. Explica el servicio en un dibujo.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 72 px, papel pizarra, una línea fina debajo. Marca denominativa a la izquierda, cuatro enlaces a la derecha, pastilla azul con un círculo de flecha redonda y el número de teléfono en mono.
2. **Héroe, retrato dividido**: titular dejado sobre la línea del cabello, fotografía sangrando por el borde derecho, frase y dos acciones debajo. Altura mínima `clamp(500px, 74vh, 760px)`. *Fotografía: un técnico en un camino de entrada usando un poste de vacío de fibra de carbono hasta una canaleta de dos pisos, luz del día nublada, camioneta en elfondo.*
3. **Por qué es importante, declaración**: ligero. Un párrafo a 22 px de un tercio, etiquete "001/Por qué molestarse" en la columna de la izquierda. Paredes húmedas, fascias podridas, avispas.
4. **El canalón**: superficie. El dibujo de la firma (sección 5) con un título mono.
5. **Precios, tabla rayada**: claro. Cinco filas: tipo de propiedad, pisos, precio, tiempo en el sitio. Figuras en mono, alineadas a la derecha.
6. **Qué hacemos mientras estamos allí, índice**: luz. Dos columnas rayadas: incluidas y extra. Bajantes, cabezales de tolva, musgo, paño de fascia.
7. **Antes y después**: tinta oscura molida, recuadro 16px, `--panel-radius`. Dos fotografías una al lado de la otra con subtítulos monocromáticos, más una línea sobre la cámara en el poste. *Fotografías: un canalón lleno de musgo y limo, y el mismo canalón limpio, ambos tomados desde abajo.*
8. **Cómo funciona la visita, filas numeradas**: claro. Cuatro filas con marcadores mono: reserva, llegada, el trabajo, las fotografías.
9. **Una cita**: superficie. Una cita única centrada en Archivo 500 a 26px con una línea de firma en mono.
10. **Libro, panel decorativo**: fondo azul, panel insertado. Una línea, el número de teléfono en grande y una nota monocromática sobre con qué anticipación están reservando.
11. **Pie de página**: tinta oscura. Marca denominativa gigante recortada `FALLS & SONS`, cobertura, línea de seguro, tres enlaces pequeños.

## 7. Movimiento
- El título se desvanece 16px una vez.
- La línea de agua se dibuja una vez, como se describe.
- Las filas de la tabla se desvanecen con 0,04s stagger.
- Las fotografías se asientan desde `scale 1.02`.
- Facilita `cubic-bezier(.22,1,.36,1)`, respeta `prefers-reduced-motion` mostrando el agua que ya está en la bajante.

## 8. Responsive
- **Móvil debajo 768px:** una barra de llamada azul está fijada en la parte inferior con relleno `env(safe-area-inset-bottom)`. Fotografía heroica sobre el titular a 40vh. La tabla de precios se convierte en filas apiladas con el precio en la misma línea que el tipo de propiedad. Pila de antes y después. Sin desplazamiento de página horizontal.
- **Tableta:** el héroe permanece dividido, antes y después uno al lado del otro.
- **Escritorio:** ancho máximo de contenido 1180 px, canales 40 px, relleno de sección 110 px.

## 9. Copia completa

**Marca denominativa:** CAÍDAS E HIJOS. Meta:`LIMPIEZA DE CANALONES. NO HAY ESCALERAS EN EL TECHO. WORCESTERSHIRE.`

**Nav:** Precios, Qué hacemos, Zonas, Contacto. Botón: `Reservar un claro`. Mono: `01905 555 0164`

**Hero**
- Titular: `Canalones limpios, desde el suelo, en aproximadamente una hora.`
- Frase: `Un poste de vacío de fibra de carbono alcanza tres pisos sin que una escalera toque su techo, su invernadero o su parterre. Obtienes fotografías de cada recorrido antes de que nos vayamos.`
- Acciones: `Reservar un claro`, `Llame al 01905 555 0164`

**Por qué es importante** (etiqueta `001/Por qué molestarse`)
`Un canal bloqueado no se anuncia. Corre silenciosamente por la pared durante dos inviernos, el yeso del interior se enfría y se vuelve irregular, y la fascia detrás se ablanda. Cuando alguien se da cuenta, es un carpintero en lugar de una hora con la aspiradora. Límpielos una vez al año, dos veces si tiene una haya o un plátano cerca de la casa.`

**El título del canalón:** `Limo, musgo y una pelota de tenis. La pelota de tenis es más común de lo que piensas.`

**Precios** (etiqueta `002/ Precios`)
| Propiedad | Pisos | Precio | En el sitio |
|---|---|---|---|
| Terraza o piso | 2 | 60 libras esterlinas | 40 MIN |
| Pareado | 2 | 75 libras esterlinas | 50 MIN |
| Independiente | 2 | 95 libras esterlinas | 1 hora |
| Independiente, grande | 3 | 135 libras esterlinas | 1 H 30 |
| Bungalow | 1 | 55 libras esterlinas | 35 MIN |
Nota: `Los precios incluyen bajantes, cabezales de tolva y retiro de escombros. No hay cargo si no podemos llegar a un tramo y tenemos que abandonarlo.`

**Mientras estamos allí** (etiqueta `003/ Incluido`)
- Incluye: `Todos los tramos de canaletas aspirados`, `Bajantes revisados y limpiados`, `Cabezas de tolva vaciadas`, `Escombros embolsados y retirados`, `Fotografías de cada tramo`, `Una nota si detectamos una junta rota o un soporte suelto`
- Extra: `Lavado de salpicadero y plafón, desde 45 GBP`, `Limpieza del techo del invernadero, desde 40 GBP`, `Eliminación de musgo de un techo bajo, cotizado`, `Reemplazo de un soporte roto, 15 GBP más la pieza`

**Antes y después**: `Enlodado hasta el borde, lado norte.` · `El mismo recorrido, diez minutos más tarde.` · `La cámara se encuentra en el poste, por lo que las fotografías son delcanalón, no del suelo.`

**Cómo funciona la visita** (etiqueta `004/ La visita`)
- `AL RESERVAR` **Un precio fijo.** `Díganos el tipo de casa y el número de plantas. Eso es suficiente por un precio.`
- `EN EL DÍA` **Una ventana de dos horas.** `Enviamos mensajes de texto cuando partimos. No es necesario que estés dentro, siempre y cuando podamos llegar a los lados.`
- `LA OBRA` **Desde el suelo.** `Sin escaleras contra tus canalones, nada apoyado en el invernadero.`
- `ANTES DE IR` **Fotografías.** `Cada ejecución, enviada por mensaje de texto, junto con todo lo que valga la pena vigilar on.`

**Cita:** `Dos inviernos de humedad en el dormitorio de atrás. Era un lugar de alcantarilla lleno de musgo y me mostró su fotografía.`
Firma: `Ann P, Malvern`

**Panel del libro**
- Línea: `La mayoría de los trabajos se realizan en una semana.`
- Teléfono grande: `01905 555 0164`
- Mono: `RESERVANDO CON UNOS SEIS DÍAS DE ANTICIPACIÓN. EL OTOÑO ESTÁ MÁS ACTIVO, SUENA TEMPRANO.`

**Pie de página**
`FALLS & SONS`, `Worcester, Malvern, Droitwich, Pershore and Evesham`, `book@fallsandsons.co.uk`
Mono: `2 millones de libras esterlinas de seguro de responsabilidad civil. Trabajo en altura entrenado. Licencia de transportista de residuos CBDU221904.`
Enlaces: `Precios`, `Qué hacemos`, `Áreas`

## 10. Never
Glassmorfismo, degradados, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, controles deslizantes de antes y después, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, rayas idénticas.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
