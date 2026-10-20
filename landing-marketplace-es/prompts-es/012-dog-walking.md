# Long Lead: Aviso del sitio web para pasear perros

## 1. Objetivo
Cree un sitio web cálido y sencillo para **Long Lead**, un paseador de perros que lleva a grupos pequeños a dar paseos adecuados. Papel avena, tinta musgo oscura, un acento óxido, una serif amigable y una única línea dibujada que recorre la página y une las secciones.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin sistema de reserva. Los botones enlazan a un número de teléfono o correo electrónico. `lucide-react` solo para el glifo de flecha.

## 3. Sistema de diseño
```css
:root {
  --paper: #EFE9DC;
  --ink: #23301F;
  --accent: #A9512B;
  --on-accent: #EFE9DC;
  --surface: #E5DED0;
  --muted: #5F6A59;
  --line: rgba(35,48,31,0.15);
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro. Líneas finas y tintes en lugar de cuadros y sombras.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;1,400&family=Karla:wght@300;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Bitter 600, clamp(46px, 6.5vw, 96px), altura de línea 1,02, espacio entre letras -0.02em
- **Cuerpo:** Karla 300, 16px, altura de línea 1.6
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas, espacio entre letras 0.06em. Solo horarios, precios, tamaños de grupo y etiquetas de índice.
: como máximo una palabra en cursiva por título, en el color de acento.

## 5. Elemento de firma
**Un encabezado, dibujado a lo largo de la página.** Un único trazo SVG de color óxido, 2 px, que comienza en un clip en el héroe y serpentea hacia el tercio izquierdo de la página, pasando por cada sección y terminando en un bucle. en el pie de página. Se dibuja a sí mismo a medida que el visitante se desplaza, utilizando `pathLength` vinculado al progreso del desplazamiento, por lo que el cliente potencial se paga a medida que avanza. Nunca cruza texto y tiene un pequeño clip dibujado en la parte superior y un bucle en la parte inferior.

Por debajo de 1024px, el cable está completamente oculto. Es decoración con un trabajo, no un rompecabezas.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 72 px, papel, una línea fina debajo. Marca denominativa a la izquierda con un pequeño clip dibujado, tres enlaces a la derecha, pastilla oxidada con un círculo de flecha redondo.
2. **Héroe, retrato dividido**: título dejado sobre una línea fina, fotografía alta sangrando por el borde derecho, una oración y dos acciones debajo del título. Altura mínima `clamp(520px, 76vh, 780px)`. *Fotografía: tres perros de diferentes tamaños caminando juntos por un camino embarrado, bajo el sol invernal, las piernas del guía justo en el cuadro.*
3. **El paseo,filas numeradas**: claras. Cuatro filas en líneas finas con marcadores de tiempo mono: recogida, el paseo en sí, la limpieza, el mensaje a casa.
4. **Grupos, lista suiza**: superficie. Columna de etiqueta `001/ Grupos`, tres nombres de grupos apilados de un tercio, cada uno con un tamaño, una nota y un precio en mono.
5. **Pack de hoy, cuadrícula de fotos**: claro. Seis fotografías cuadradas de perros en diferentes desplazamientos verticales, cada una con un nombre y raza en monocromático debajo. *Fotografías: perros individuales mirando a cámara durante un paseo, luz natural, sin fondos de estudio.*
6. **Lo que obtienes después de cada caminata**: suelo de musgo oscuro, inserción de 16 px, `--panel-radius`. Tres líneas cortas en papel color: una fotografía, una nota sobre cómo quedaron y la distancia del recorrido.
7. **Seguros y llaves, índice**: ligero. Dos columnas regladas: qué se cubre y cómo se manejan las claves. Sencillo, objetivo, tranquilizador.
8. **Precios, hileras finas**: claro. Cuatro filas: paseo individual, bloque de diez, visita de cachorro, paseo solitario. Precios alineados a la derecha en mono.
9. **Una cita**: superficie. Una cita única centrada en Bitter a 30 px con una línea de firma en mono.
10. **Conozca primero el panel decorativo**: suelo oxidado, panel empotrado. Una línea, dos acciones y una nota mono sobre el encuentro y saludo gratuito.
11. **Pie de página**: musgo oscuro. Marca denominativa gigante recortada "LONG LEAD", área cubierta, teléfono, tres enlaces pequeños.

## 7. Movimiento
- El título se desvanece 18px una vez.
- Las fotografías se asientan desde `scale 1.03` en 1,1 s.
- El prospecto se dibuja con desplazamiento como descrito.
- Las fotografías de perros se elevan 4px al pasar el mouse.
- Facilita `cubic-bezier(.22,1,.36,1)`, respeta `prefers-reduced-motion` mostrando el cable completamente dibujado.

## 8. Responsive
- **Móvil de menos de 768px:** el cable está oculto. La fotografía principal se mueve sobre el título a 46 vh, el título a 46 px. La cuadrícula del paquete se convierte en dos columnas sin desplazamientos. Pila de columnas de índice. Nav conserva la marca denominativa y la pastilla. Sin desplazamiento de página horizontal.
- **Tableta:** paquete de cuadrícula de tres columnas, guía oculta.
- **Escritorio:** ancho máximo de contenido 1180 px, canales 40 px, relleno de sección 110 px.

## 9. Copia completa

**Marca denominativa:** LARGO PLOMO. Meta:`PASEO DE PERROS EN SHEFFIELD. GRUPOS DE CUATRO, NUNCA MÁS.`

**Nav:** El paseo, Grupos, Precios. Botón: `Reunirse primero`

**Héroe**
- Titular: `Una hora fuera, correctamente *cansado*, de nuevo en casa.`
- Frase: `Grupo pequeño camina por el borde del páramo y en el bosque, nunca más de cuatro perros, siempre la misma cara en la puerta.`
- Acciones: `Reunirse primero`, `Llame al 0114 555 0180`

**El paseo** (etiqueta `000/ La hora`)
- `08:40` **Recogida.** `Entro, saludo apropiadamente y reviso el agua y la puerta trasera antes de irnos.`
- `09:00` **El a pie.** `Sesenta minutos al borde del páramo, en el bosque o junto al río, dependiendo del tiempo y de quién esté en el grupo.`
- `10:05` **Toallas y patas.** `Todos se secan en la furgoneta. Los perros embarrados no regresan a los pasillos limpios.`
- `10:20` **Un mensaje.** `Una fotografía, una línea sobre cómo estaban y la distancia que recorrimos.`

**Grupos** (etiqueta `001/ Grupos`)
- **The Steady Four.** `Perros mayores y paseadores amables. Mucho olfateo, nada de carreras.` `MÁXIMO 4 PERROS. 60 MIN. 16 GBP`
- **Los largos.** `Perros jóvenes y en forma que necesitan distancia real. Borde de páramo, colinas, dos ríos.``MÁXIMO 4 PERROS. 90MIN. 22 GBP`
- **Solo.** `Perros que encuentran difíciles los grupos o que se están recuperando de algo.` `UN PERRO. 45 MIN. 24 GBP`

**Pack de hoy** (etiqueta `002/ The pack`)
Mabel, lurcher · Otto, cocker spaniel · Sid, staffie cross · Winnie, border terrier · Bruno, labrador · Peg, Whipet

**Después de cada paseo**: `Una fotografía del paseo.` · `Una línea sobre cómo estaban, sinceramente, incluido el día que rodaron en algo.` · `La ruta y la distancia, para que sepas lo que han tenido.`

**Seguro y llaves** (etiqueta `003/ Lo aburrido pero importante`)
- Cubiertos: `Responsabilidad civil total hasta 5 millones de GBP`, `Cobertura de cuidado, custodia y control`, `Canino con formación en primeros auxilios, certificado bajo petición`, `DBS comprobado, feliz de mostrarlo`
- Claves: `Guardadas en una caja cerrada, etiquetadas con un código y nunca con una dirección`, `Devueltas el día que usted las solicita`, `Nunca copiadas`, `Códigos de alarma almacenados por separado de las llaves`

**Precios** (etiqueta`004/ Precios`)
- `Paseo en grupo único` ... `16 GBP`
- `Bloque de diez paseos` ... `145 GBP`
- `Visita de cachorro, 30 minutos` ... `12 GBP`
- `Paseo en solitario` ... `24 GBP`
Mono: `Los precios incluyen la recogida y devolución en un radio de cuatro millas. No se cobran los días festivos que canceles.`

**Cita:** `Llega a casa embarrado, exhausto y un poco engreído. Exactamente lo que queríamos.`
Firma: `Rachel, Nether Edge`

**Conoce el primer panel**
- Línea: `Ven a caminar con nosotros antes de reservar algo.`
- Acciones: `Organizar una reunión`, `Llamar al 0114 555 0180`
- Mono: `EL PRIMER ENCUENTRO Y UN CORTO PASEO JUNTOS SON GRATIS.`

**Footer**
`LONG LEAD`, `Sheffield S7, S8, S11 and S17`, `hello@longlead.dog`, `0114 555 0180`, enlaces `The walk`, `Prices`, `Insurance`

## 10. Never
Glassmorfismo, gradientes, brillo, tarjetas con sombra, cuadrículas de íconos, emoji, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, `100vh` héroes, rayas idénticas.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
