# Oda Skin — Aviso del sitio web de la marca de cuidado de la piel

## 1. Declaración de objetivos
Crear un sitio web suave y táctil para **Oda**, una marca independiente de cuidado de la piel que fabrica cinco productos a partir de arcilla, avena y aceites prensados en frío: una paleta cálida de arcilla y crema, fotografías de productos de gran tamaño, una imagen pegajosa del producto que permanece en su lugar mientras pasan los ingredientes y una confianza silenciosa que se vende. restricción.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes ni lógica de carrito. Los botones enlazan a páginas de productos; nada necesita estado más allá del menú móvil.

## 3. Sistema de diseño - Colores
```css
:root {
  --background: hsl(30, 33%, 95%);       /* cream */
  --foreground: hsl(20, 18%, 18%);       /* deep cocoa */
  --primary: hsl(16, 38%, 58%);          /* terracotta clay */
  --primary-foreground: hsl(30, 33%, 97%);
  --muted-foreground: hsl(20, 10%, 46%);
  --border: hsl(26, 20%, 85%);
  --card: hsl(24, 32%, 89%);             /* blush clay panel */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Instrument Serif 400, clamp(56px, 9vw, 140px), altura de línea 0,92, espacio entre letras -0,03em
- **H2:** Instrument Serif 400, clamp(40px, 5vw, 72px), altura de línea 1
- **Cursiva:** Instrument Serif cursiva para una palabra por título
- **Cuerpo:** DM Sans 300, 17px, altura de línea 1.7
- **Etiquetas y precios:** DM Sans 500, 12px, mayúsculas, espacio entre letras 0.12em

## 5. Efectos visuales

**Efecto 1: producto adhesivo, desplazamiento ingredientes.** En la sección de ingredientes, la imagen del producto se encuentra en una columna adhesiva izquierda (`position: sticky; top: 96px; height: calc(100vh - 128px)`), mientras que cuatro bloques de ingredientes se desplazan a la derecha. A medida que cada bloque llega al centro de la ventana gráfica, pasa del 30% al 100% de opacidad. Utilice ` whileInView` con `viewport={{ amount: 0.6 }}`: sin cálculos de desplazamiento. 

**Efecto 2: formas de masa de arcilla.** Detrás de la imagen principal del producto, una gran mancha orgánica suave en color `--card`, dibujada como una ruta SVG en línea con una transformación lenta de 12 segundos entre dos formas de ruta (anime el atributo `d` con Framer Motion, `repetir: Infinity, repetirTipo: "espejo"`). Una sola gota. Debería leerse como un guijarro, no como una lámpara de lava.

## 6. Desglose de componentes

1. **Barra de anuncio**: 36 píxeles, fondo de terracota, una línea centrada de texto pequeño en color crema.
2. **Barra de navegación**: 76 px, color crema, marca denominativa centrada en Instrument Serif 32 px, enlaces a la izquierda, enlaces de texto "Cuenta" y "Bolsa (0)" a la derecha. Pegajoso.
3. **Héroe**: dos columnas. Izquierda: etiqueta, H1 gigante distribuido en tres líneas, sublínea, botón. Derecha: elmancha (Efecto 2) con una imagen de una botella de producto alta centrada en la parte superior. *Imagen: frasco de vidrio ámbar para el cuidado de la piel con una etiqueta de crema, sobre una piedra cálida de color arcilla, luz suave de la ventana, estilo minimalista.*
4. **Marquesina**: una única marquesina horizontal lenta de valores separados por pequeños asteriscos, bucle de 40 segundos, pausas al pasar el mouse.
5. **Los cinco productos**: una fila horizontal de cinco mosaicos de productos altos (proporción de 4:5) en `--card`, cada uno con una imagen, nombre en Instrument Serif, descripción de una línea, tamaño y precio. Desplazamiento horizontal con snap en móvil.
6. **Ingredientes** — Efecto 1. Imagen adhesiva a la izquierda, cuatro bloques de ingredientes a la derecha, cada uno con el nombre del ingrediente en cursiva grande, de dónde viene y qué hace.
7. **Antes de comprar** — tres columnas cortas: "Cómo utilizar", "Tipos de piel", "Lo que omitimos".
8. **Imagen a sangre completa**: una fotografía de textura de 70 vh con una frase corta superpuesta en color crema sobre un degradado inferior. *Imagen: primer plano de arcilla rosa pálida mezclada con agua en un recipiente de cerámica, luz natural suave, textura táctil.*
9. **Reseñas**: tres reseñas en columnas simples: cinco estrellas pequeñas, cita, nombre y tipo de piel.
10. **Revista**: dos tarjetas editoriales con imagen, categoría y título.
11. **Boletín**: panel de terracota, H2 y una única entrada de correo electrónico con un botón de texto.
12. **Pie de página** — crema, cuatro columnas, marca denominativa `oda` gigante en todo el ancho en la parte inferior en Instrument Serif a 22vw, recortada ligeramente por la parte inferior de la ventana gráfica.

## 7. Animaciones
- Líneas Hero H1: cada línea se revela desde `y: 100%` dentro de un envoltorio `overflow-hidden`, 0.9s, facilidad `[0.22, 1, 0.36, 1]`, escalonamiento 0.12s
- Imagen principal: `opacity 0 → 1`, `scale 0.96 → 1`, 1.2s, retraso 0.3s
- Mosaicos de producto: desvanecimiento 24px, escalonamiento 0.08s
- Imagen del producto al pasar el mouse: escala 1.04 sobre 0.8s
- Marquesina: fotogramas clave CSS `translateX(0) → translateX(-50%)`, 40s lineal infinito
- Transformación de blob como en el efecto 2

## 8. Responsive
- **Móvil (<768px):** pilas de héroes, imagen y blob primero a 60vh; H1 a 56 px; los productos se convierten en una fila horizontal de desplazamiento rápido que muestra 1,3 mosaicos; sección de ingredientes cae elcomportamiento pegajoso y en su lugar muestra una imagen encima de cada bloque de ingredientes; la barra de navegación muestra el centro de la marca denominativa, el ícono de menú a la izquierda y el ícono de bolsa a la derecha.
- **Tableta:** los productos muestran 2,5 mosaicos en la fila de desplazamiento; quedan ingredientes pegajosos.
- **Escritorio:** ancho máximo 1360px, `px-8`, espacio entre secciones `py-32`.

## 9. Copia completa

**Barra de anuncios:** `Entrega gratuita a partir de £40 · Recargas ahora disponibles para cada product`

**Navbar:** Tienda · Ingredientes · Diario — ODA — Cuenta · Bolsa (0)

**Hero**
- Etiqueta: `ARCILLA · AVENA · ACEITES PRENSADOS EN FRÍO`
- H1: `Menos, / pero *mejor* / para skin.`
- Sublínea: `Cinco productos. Sin fragancias, sin rellenos, sin rutina de doce pasos. Fabricado en pequeños lotes en Peak District.`
- Botón: `Compra los cinco`

**Marquesina:** `Sin fragancia * Vidrio recargable * Vegano * Hecho en pequeños lotes * Nada que no puedas pronunciar *`

**Los cinco productos** — H2 `La gama *completa*.`
1. **Clay Cleanser** — `Un gel de arcilla rosa que levanta el día sin pelar.` — 150 ml — £22
2. **Tónico de leche de avena** — "Calma el enrojecimiento y prepara la piel en un solo paso". — 150 ml — £19
3. **Suero diario** — `Niacinamida y escualano, lo suficientemente ligeros para las mañanas.` — 30 ml — £34
4. **Crema de barrera** — `Un humectante rico y sin perfume para pieles secas y reactivas.` — 50 ml — £29
5. **Aceite de noche** — `Rosa mosqueta y camelia, prensados ​​en frío, usados ​​con moderación.` — 30 ml — £31

**Ingredientes** — H2 `Cuatro cosas *haciendo* el trabajo.`
- ***Caolín rosado*** — `De Bretaña.` `La arcilla más suave que existe. Absorbe el exceso de grasa sin extraer la humedad de la piel.`
- ***Avena coloidal*** — `De granjas escocesas.` `Alivia la picazón y el enrojecimiento, y forma una película protectora ligera que ayuda a la piel a retener el agua.`
- ***Escualano*** — `De aceitunas.` `Imita los aceites que la piel produce por sí misma, por lo que se absorbe sin residuo.`
- ***Aceite de rosa mosqueta*** — `De Chile, prensado en frío.` `Rico en vitamina A y ácidos grasos. Ilumina lentamente, de manera honesta.`

**Antes de comprar**
- **Cómo utilizar** — `Limpia y tonifica por la mañana y por la noche. Suero por la mañana, aceite pornoche, crema cuando la piel se sienta tirante.`
- **Tipos de piel** — `Formulado para pieles sensibles, secas y mixtas. Pruebe primero el parche si reacciona con facilidad.`
- **Lo que omitimos** — `Fragancias, aceites esenciales, alcohol, sulfatos, siliconas y parabenos.`

**Línea de imagen con sangrado completo:** `La piel no necesita más. Necesita *menos, mejores* cosas.`

**Reseñas** — Etiqueta `DE PERSONAS QUE LO USAN`
- `"El primer limpiador que no deja mi rosácea enojada. Me he terminado tres botellas."` — *Hannah, piel sensible*
- `"Reemplacé un estante de productos con cuatro de estos. Mi baño se ve mejor también."` — *Jamal, piel mixta*
- `"La crema protectora me ayudó a pasar un invierno en Yorkshire. Nada más lo hizo." — *Priya, piel seca*

**Journal**
- `ROUTINE` — *Por qué solo fabricamos cinco productos*
- `INGREDIENTES` — *Arcilla, explicada sin el. marketing*

**Newsletter** — H2 `Un correo electrónico por *mes*.` `Nuevos lotes, fechas de recarga y nada más.` Introduzca el marcador de posición `Su correo electrónico` · Botón `Suscribirse`

**Pie de página** — Tienda · Ingredientes · Recargas · Diario · Entrega · Devoluciones · Contacto · Instagram · `Oda Skin Ltd, Hathersage, Derbyshire` · © 2026 — gigante Marca denominativa `oda`

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
