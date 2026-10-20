# Longitude — Mensaje del sitio web del blog de viajes

## 1. Declaración de objetivos
Cree un blog de viajes cálido y editorial para **Longitude**, escrito por una persona que viaja lentamente: fotografía en tono cinematográfico, una serifa grande y elegante, espacios en blanco generosos y coordenadas impresas debajo de cada fotografía como un cuaderno de campo.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin CMS, sin biblioteca de mapas, sin búsqueda. Las publicaciones son una matriz en el código.

## 3. Sistema de diseño - Colores
```css
:root {
  --background: hsl(38, 26%, 95%);       /* warm paper */
  --foreground: hsl(24, 16%, 15%);
  --primary: hsl(14, 54%, 46%);          /* terracotta */
  --primary-foreground: hsl(38, 26%, 97%);
  --muted-foreground: hsl(24, 8%, 46%);
  --border: hsl(30, 14%, 86%);
  --card: hsl(36, 24%, 91%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **H1:** Lector de noticias 300, clamp(44px, 6vw, 96px), altura de línea 1,04, espacio entre letras -0,02em
- **H2:** Lector de noticias 400, clamp(28px, 3.2vw, 44px)
- **Cursiva:** Lector de noticias 300 cursiva para una o dos palabras por título
- **Cuerpo:** Lector de noticias 300, 19px, altura de línea 1.75
- **Coordenadas, fechas, etiquetas:** IBM Plex Mono 400, 11px, mayúsculas, espacio entre letras 0.1em

## 5. Efectos visuales

**Efecto 1: Coordenadas debajo de cada foto.** El título de cada imagen se establece como una nota de campo: nombre del lugar, luego latitud y longitud en monoespacio, luego el mes. Alineado a la izquierda, pequeño, silenciado.

```jsx
<figure>
  {/* Image: misty mountain road at sunrise, film photography look, muted greens and warm haze */}
  <img src="" alt="Road above Lake Bohinj at sunrise" className="w-full object-cover object-center" />
  <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
    Lake Bohinj, Slovenia · 46.2806&deg; N, 13.8797&deg; E · June
  </figcaption>
</figure>
```

**Efecto 2: Grano de película y lavado cálido.** Una superposición de ruido fija con un 5 % de opacidad en toda la página, y cada fotografía lleva un filtro cálido sutil: `filter: sepia(0.12) saturate(0.92) contrast(1.04)`.

**Efecto 3: Revelado lento.** Las fotografías se revelan con un barrido de ruta de clip desde la parte inferior y una escala muy leve de 1,03 a 1, durante 1,1 segundos.

## 6. Desglose de componentes

1. **Barra de navegación**: 80 píxeles, papel, sin borde. Marca denominativa centrada en Newsreader, enlaces divididos hacia la izquierda y hacia la derecha, todo en 12px mono. No pegajoso.
2. **Héroe**: una fotografía de ancho completo a 76vh con el título de coordenadas debajo, luego el H1 y un párrafo de introducción en una columna estrecha y centrada.
3. **Último envío**: una publicación destacada: imagen grande a la izquierda, texto a la derecha con fecha monocromática, título, extracto de tres líneas y un enlace "Leer".
4. **Publicaciones recientes**: una cuadrícula de tres columnas de seis publicaciones, cada una con una imagen en formato 4:5, etiqueta monopaís, título y tiempo de lectura.
5. **Dónde he estado** -una lista simple de dos columnas de países con el año al lado de cada uno, sin mapa.
6. **La nota sobre viajes lentos**: un breve manifiesto en una columna estrecha con una cita en cursiva, en tamaño más grande.
7. **Tira fotográfica**: cinco imágenes seguidas con distintos anchos, de borde a borde, cada una con su título de coordenadas.
8. **Equipo que realmente llevo**: una lista simple de ocho artículos con un motivo de una línea para cada uno.
9. **Boletín**: tarjeta impresa en `--card` con una línea corta y una única entrada de correo electrónico.
10. **Acerca de**: un pequeño retrato, tres frases y enlaces a Instagram y correo electrónico.
11. **Pie de página**: borde superior delgado, tres columnas, enlaces mono.

## 7. Animaciones
- Todas las imágenes: Efecto 3
- Bloques de texto: desvanecimiento 14px, 0,8s, escalonamiento 0,08s
- Postales: la imagen se escala a 1,04 0,9 s al pasar el cursor, el título subrayado se desplaza hacia adentro 
- Tira de fotos: las imágenes se revelan de izquierda a derecha con un escalonamiento de 0,12 s
- Sin paralaje, sin carruseles, sin contadores

## 8. Responsive
- **Móvil (<768px):** la imagen principal cae a 56vh; H1 a 44 px; las publicaciones recientes se convierten en una sola columna; la tira de fotos se convierte en una fila horizontal de desplazamiento rápido; la lista de países se convierte en una columna; la barra de navegación se colapsa en una marca de palabras centrada con un interruptor mono `Menú`.
- **Tableta:** publica 2 columnas.
- **Escritorio:** ancho máximo 1200 px para texto, tira de fotos con sangrado completo, `px-8`, espaciado de sección `py-28`.

## 9. Completo Copia

**Marca:** LONGITUDE · Un diario de viaje lento de Ines Marchetti

**Navbar:** Despachos · Lugares · Equipo · Acerca de — Suscríbete

**Hero**
- Pie de foto: `Lago Bohinj, Eslovenia · 46.2806° N, 13.8797° E · Junio`
- H1: `Menos lugares, estancias *más largas*.`
- Introducción: `Paso un mes en cada lugar, aprendo dónde está bueno el pan y lo anoto. Sin itinerarios, sin listas de los diez primeros y nada patrocinado. Lo que realmente es estar en algún lugar por un tiempo.`

**Último envío** — Etiqueta `ÚLTIMO ENVÍO`
- Fecha: `12 DE SEPTIEMBRE DE 2026`
- Título: `Cuatro semanas en los *Alpes Julianos*`
- Extracto: `Fui al lago y se quedó por elvalle detrás de él. Esto es lo que cuesta un mes en Bohinj, qué autobuses circulan realmente en temporada media y por qué volvería en octubre en lugar de julio.`
- Enlace: `Leer el despacho`

**Publicaciones recientes** — H2 `Recientes *despachos*.`
1. `PORTUGAL` — **El Alentejo no tiene multitudes ni sombra** — 9 min
2. `JAPÓN` — **Un mes de trenes en Tohoku, fuera de la línea turística** — 12 min
3. `MARRUECOS` — **Honestamente, vivo en Taghazout durante el invierno** — 8 min
4. `SCOTLAND` — **Caminando por el sendero costero de Fife con mal tiempo** — 7 min
5. `ITALIA` — **Puglia en noviembre, cuando todavía está todo abierto** — 10 min
6. `GEORGIA` — **Tbilisi por veinte euros al día** — 11 min
*Resúmenes de imágenes: fotografías de viajes en tono cinematográfico: una llanura portuguesa blanqueada por el sol, un andén de tren rural japonés, un pueblo de surf marroquí, una costa escocesa gris, una plaza italiana vacía, un balcón de Tbilisi.*

**Dónde he estado** — Etiqueta `PLACES`
Eslovenia `2026` · Portugal `2026` · Japón `2025` · Marruecos `2025` · Escocia `2025` · Italia `2024` · Georgia `2024` · Albania `2024` · México `2023` · Noruega `2023`

**The slow travel note** — H2 `Un mes es el viaje útil *más corto*.`
`Una semana te dice cómo es un lugar. Un mes te dice lo que es vivir mal allí, lo cual es más interesante. Averiguas qué tienda está abierta los domingos, cómo se comportan realmente los autobuses y de qué se queja todo el mundo.`
Pull quote: `*Lo bueno siempre es la segunda semana, cuando dejas de fotografiar todo.*`

**Tira fotográfica** — captions:
- `Taghazout, Marruecos · 30.5450° N, 9.7100° W · Febrero`
- `Aomori, Japón · 40.8244° N, 140.7400° E · Abril`
- `Monsaraz, Portugal · 38.4436° N, 7.3797° W · Mayo`
- `Elie, Escocia · 56.1880° N, 2.8170° W · Agosto`
- `Tbilisi, Georgia · 41.7151° N, 44.8271° E · Octubre`

**Equipo que realmente llevo** — H2 `Ocho cosas, *nada más*.`
- **A Mochila de 38 litros** — `Si no cabe, no viene. Sólo equipaje de mano, siempre.`
- **Una cámara de película** — `Treinta y seis fotogramas porLa semana te hace pensar antes de presionarlo.`
- **Merino todo** — `Tres camisas, usadas en rotación, lavadas en fregaderos.`
- **Un cuaderno de papel** — `Los teléfonos mueren y las aplicaciones de notas son para listas, no oraciones.`
- **Un lector electrónico** — `Lo cargo antes de irme, porque el wifi rural es un rumor.`
- **Un adaptador de enchufe con dos puertos USB-C** — `El objeto más útil que tengo.`
- **Corredores de senderos** — `Se encargan de una montaña y una cena. Las botas tienen capacidad para uno.`
- **Un impermeable plegable** — `Comprado en Escocia, por razones obvias.`

**Newsletter** — H2 `Una letra por *mes*.` `Dónde estoy, cuánto cuesta y una fotografía. Nunca hay enlaces de afiliados.` Ingrese `Su correo electrónico` · Botón `Suscribirse`

**Acerca de** — `Soy Inés. Dejé un trabajo de diseño en Milán en 2023 y desde entonces me he mudado cada uno o dos meses. Pago mis propios viajes. Si algo estuvo mal lo diré.` Enlaces: `Instagram` · `ines@longitude.blog`

**Pie de página** — LONGITUD · Despachos · Lugares · Equipo · Acerca de · Newsletter · Instagram · `Escrito y fotografiado por Ines Marchetti` · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
