# Wrenbury House: Solicitud del sitio web de residencias de ancianos

## 1. Objetivo
Cree un sitio web tranquilo y honesto para **Wrenbury House**, una residencia de ancianos de 32 camas en Shropshire. Papel color crema cálido, tinta negra suave, un acento en dorado oliva, una serifa silenciosa y una firma: una ventana donde la luz pasa de la mañana a la noche a medida que avanzas. La visitante suele ser una hija adulta a las once de la noche, preocupada y cansada. Todo lo que hay en la página debería hacer que el siguiente paso sea más pequeño.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin sistema de reserva, sin integración de visitas virtuales. Las acciones son un enlace telefónico y un enlace de correo electrónico. `lucide-react` solo para el glifo de flecha.

## 3. Sistema de diseño
```css
:root {
  --paper: #F6F2EA;
  --ink: #23201B;
  --accent: #7A6A3E;           /* olive gold */
  --on-accent: #FFFFFF;
  --surface: #EAE4D7;
  --muted: #5F5A4E;
  --line: rgba(35,32,27,0.16);
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro. Estructura a partir de líneas finas, nunca de tarjetas sombreadas. 

**El contraste es un requisito, no una preferencia.** Cada color de texto, incluido `--muted` y los subtítulos pequeños, debe alcanzar al menos 4,5 a 1 con respecto a la superficie sobre la que se asienta. No hay texto de menos de 14 px en ninguna parte de la página. Esta audiencia es mayor y lee en un teléfono con prisa.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,600&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Fuente Serif 4 300, clamp(40px, 5.2vw, 76px), altura de línea 1,06, espacio entre letras -0.015em
- **Cuerpo:** Inter 300, 17px, altura de línea 1,7. Ligeramente más grande de lo habitual, a propósito.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Conteo de habitaciones, tarifas, calificaciones de inspección, etiquetas de índice.
- Como máximo una palabra en cursiva por título, en color dorado oliva.

## 5. Elemento de firma
**Una ventana, hasta un día.** Un marco de ventana dibujado simple, cuatro paneles, en un trazo de tinta de 1,5 px. Detrás de él, un suave lavado de color cambia a medida que avanza la sección: azul frío en la parte superior de la sección, crema cálida en el medio, ámbar tenue en la parte inferior. Una pequeña etiqueta monoespaciada cambia con ella: `07:00`, `13:00`, `19:00`.

Es una transición de color ligada al progreso del desplazamiento, nada más. Sin sprites solares, sin nubes, sin bucle de animación.

## 6. Secciones, cada una con un esqueleto diferente

1. **Barra de navegación**: 74 px, crema, una línea de cabello debajo. Marca denominativaizquierda, cuatro enlaces a la derecha, pastilla verde oliva con un círculo de flecha redonda y una línea mono con el número de teléfono.
2. **Héroe, declaración**: una frase serif larga que comienza en un tercio, etiqueta mono "000/Wrenbury House" en la columna de la izquierda, un párrafo corto, dos acciones y tres hechos mono. Ninguna fotografía. Altura mínima `clamp(500px, 72vh, 740px)`.
3. **Un día aquí**: superficie. La ventana (sección 5) con tres líneas cortas de texto al lado que describen la mañana, la tarde y la noche.
4. **Lo que ofrecemos, lista suiza**: ligero. Etiqueta `001/ Care`, cuatro tipos de atención apilados de un tercio, cada uno con dos líneas y una nota mono sobre a quién le conviene.
5. **Las habitaciones, mesa rayada**: luz. Cuatro filas: tipo de habitación, tamaño, contenido, tarifa semanal. Figuras en mono, alineadas a la derecha.
6. **La gente**: fondo de tinta oscura, recuadro de 16 píxeles, `--panel-radius`. Tres retratos en papel color con nombres, años en Wrenbury y una línea cada uno. *Fotografías: una gerente de unos cincuenta años, un cuidador senior, una cocinera, todo en un interior sencillo y cálido, luz natural, sin uniformes diseñados para la cámara.*
7. **Visitas y preguntas, índice**: ligero. Dos columnas regladas. Izquierda: cómo son realmente las visitas, no se necesita cita previa ni horarios establecidos. Derecha: las cuatro preguntas que hacen las familias primero, respondidas en una línea cada una.
8. **La casa, rejilla suelta**: luz. Cinco fotografías de distintos tamaños con subtítulos monocromáticos. *Fotografías: un dormitorio con muebles propios de un residente, el salón del jardín, el comedor preparado para el almuerzo, el jardín, el frente de una casa victoriana de ladrillo rojo.*
9. **Una cita**: superficie. Una cita única centrada en Source Serif a 30 px con una línea de firma en mono.
10. **Ven a verlo, panel decorativo**: suelo de olivo, panel empotrado. Una línea, el número de teléfono en grande, una nota mono que puede aparecer sin avisar.
11. **Pie de página**: tinta oscura. Marca denominativa gigante recortada `WRENBURY HOUSE`, dirección, línea de clasificación CQC, tres enlaces pequeños.

## 7. Movimiento
- La frase del héroe se desvanece 16px una vez.
- La luz de la ventana cambia con el progreso del desplazamiento, como se describe.
- Los retratos se asientan desde `scale 1.02` con Escalonamiento de 0,08 s.
- Las imágenes de cuadrícula se asientan desde`scale 1.03`, levante 4px al pasar el mouse.
- Facilite `cubic-bezier(.22,1,.36,1)`, respete `prefers-reduced-motion` manteniendo la ventana en su estado de mediodía.

## 8. Responsive
- **Móvil bajo 768px:** héroe a 36px desde el margen izquierdo. La ventana se escala a 260 px y mantiene sus tres etiquetas. La tabla de tarifas se apila en filas con la tarifa en la misma línea que el tipo de habitación. Pila de retratos. Una barra de llamada verde oliva se fija en la parte inferior de la pantalla, respetando el área segura insertada. Sin desplazamiento de página horizontal.
- **Tableta:** cuadrícula de dos columnas.
- **Escritorio:** ancho máximo de contenido 1160 px, canales 40 px, relleno de sección 110 px.

## 9. Copia completa

**Marca denominativa:** WRENBURY HOUSE. Meta: `CUIDADO RESIDENCIAL Y DEMENCIA. 32 HABITACIONES. SHROPSHIRE.`

**Nav:** Cuidado, Habitaciones, Visitas, Acerca de. Botón: `Concertar visita`. Mono: `01743 555 0119`

**Hero** (etiqueta `000/ Wrenbury House`)
- Frase: `Una pequeña casa donde el personal ha estado aquí más tiempo que *la mayoría* de los residentes.`
- Párrafo: `Treinta y dos habitaciones en una casa victoriana en las afueras de Shrewsbury. Residencia y atención a personas con demencias, regentada por la misma familia desde 2004. Le invitamos a acercarse y echar un vistazo sin llamar primero.`
- Acciones: `Concertar una visita`, `Ver las habitaciones`
- Hechos: `32 HABITACIONES` · `CQC BUENA, MARZO 2026` · `ROTACIÓN DE PERSONAL 9 %`

**Un día aquí** (etiqueta `001/ Un día`)
- `07:00` **Mañana.** `Desayuna al despertar, no cuando llega el tranvía. Algunas personas se levantan a las seis, otras a las diez.`
- `13:00` **Tarde.** `Almuerzo en el comedor o en tu propia habitación. El jardín está abierto y la puerta no está cerrada.`
- `19:00` **Tarde.** `Cena, luego lo que quieras. La televisión del salón se apaga a las nueve a menos que alguien esté mirándola.`

**Lo que proporcionamos** (etiqueta `002/ Care`)
- **Atención residencial.** `Ayuda para lavarse, vestirse y medicación, en tu propia habitación con tus propias cosas.` `Trajes: YA NO SEGURO SOLO EN CASA`
- **Cuidados de demencia.** `A ala separada de diez habitaciones, con personal día y noche, dispuestas para que nadie se pierda.` `Trajes: deambulación, desorientación`
- **Respiro.** `De una a cuatro semanas, lo mismohabitación y los mismos cuidados, para que un cuidador en casa pueda tener un descanso.` `SUITS: UN CUIDADOR FAMILIAR QUE ESTÁ AGOTADO`
- **Cuidados al final de la vida.** `Trabajamos con las enfermeras del distrito para que nadie tenga que moverse al final.` `SUITS: QUEDARSE PUESTO`

**Las habitaciones** (label `003/ Habitaciones`)
| Habitación | Tamaño | Incluye | De |
|---|---|---|---|
| Estándar individual | 14 metros cuadrados | Cama, armario, lavabo, pulsador | 1.150 GBP a la semana |
| Individual grande | 18 metros cuadrados | Como arriba con un sillón y vistas al jardín | 1.290 GBP a la semana |
| Habitación individual con baño | 18 metros cuadrados | Como arriba con un cuarto húmedo | 1.380 GBP a la semana |
| Sala de jardín | 22 metros cuadrados | Planta baja, puertas dobles al césped | 1.450 GBP por semana |
Nota: `Las tarifas incluyen todo excepto peluquería y podología. Traiga sus propios muebles si lo desea, la mayoría de la gente lo hace.`

**The people** (label `004/ Staff`)
- **Alison Wren.** `Gerente, 21 años. Su madre residía aquí antes de que ella lo dirigiera.`
- **Marta Kowalczyk.** `Cuidadora principal, 12 años. Dirige el ala de demencia y el traspaso que la mantiene estable.`
- **Ray Collins.** `Cook, 9 años. Sabe quién odia el pescado y quién quiere dos postres.`

**Visitas y preguntas** (etiqueta `005/ Visitando`)
- Visita: `No es necesaria cita previa`, `No hay horarios establecidos, incluidas las tardes`, `Niños y perros son bienvenidos`, `Puedes comer con tu familiar, avisar a la cocina esa mañana`
- Preguntado primero: `Puedo traer mi propia cama? Sí.` · `¿Vendrá el mismo cuidador todos los días? Principalmente, nos alineamos para eso.` · `¿Qué pasa si se acaba el dinero? Hablamos con usted con el ayuntamiento y no se le pide a nadie que se vaya.` · `¿Puedo ver el informe de inspección? Está vinculado en el pie de página.`

**La casa** (etiqueta `006/ La casa`)
A habitación con sus propios muebles · La sala del jardín · Almuerzo, preparado a las doce y media · El jardín en mayo · El frente de la casa

**Cita:** `Llamé a cuatro casas esa semana. Este fue el único que dijo ven hoy a verlo en lugar de reservarme para un recorrido.`
Firma: `Helen, hija de un residente`

**Ven a verlopanel**
- Línea: `Ven sin llamar primero. Si no estamos listos para usted, eso también le dice algo.`
- Teléfono grande: `01743 555 0119`
- Mono: `ALGUIEN RESPONDE ESTE NÚMERO LAS 24 HORAS DEL DÍA.`

**Pie de página**
`WRENBURY HOUSE`, `Wrenbury Lane, Bicton, Shrewsbury SY3 8EN`, `hello@wrenburyhouse.co.uk`
Mono: `Registrado ante la Care Quality Commission, proveedor 1-2049183. Calificación buena, marzo de 2026.`
Enlaces: `Cuidado`, `Habitaciones`, `Informe de inspección`

## 10. Never
Morfismo de vidrio, degradados, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, fotografías de archivo de manos tomadas, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, franjas idénticas.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
