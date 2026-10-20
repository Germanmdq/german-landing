# Northlight: Sitio web de fotografía inmobiliaria Prompt

## 1. Objetivo
Cree un sitio web para **Northlight**, un fotógrafo que fotografía casas para agentes inmobiliarios en Sussex. Casi blanco, tinta de grafito, un acento azul pizarra, un grotesco ajustado.

**Este mantiene una única idea en movimiento y nada más.** Tres exposiciones entre corchetes se fusionan en el marco terminado, porque ese movimiento explica todo el oficio en un segundo y medio y guarda cuatro párrafos de texto. Todo a su alrededor es deliberadamente plano: ni panel oscuro, ni banda de cierre de color, ni contadores, ni segunda animación. Si una página tiene un truco, tiene que ganarse su lugar reemplazando palabras.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin sistema de reserva, sin caja de luz, sin filtro.

## 3. Diseño sistema
```css
:root {
  --paper: #FAFAF8;
  --ink: #1D1F22;
  --accent: #46617F;
  --on-accent: #FFFFFF;
  --surface: #EEEEEB;
  --muted: #666B72;
  --line: rgba(29,31,34,0.15);
  --radius: 2px;
  --panel-radius: 2px;
}
```
Ritmo de sección: luz, luz, superficie, luz, luz, superficie, luz. **No hay sección oscura ni panel de acento en esta página.** El azul pizarra aparece solo en la animación de combinación, en la línea de giro y en los enlaces de texto.

**El contraste es un requisito, no una preferencia.** Cada color de texto, incluido `--muted` y los subtítulos pequeños, debe alcanzar al menos 4,5 a 1 contra la superficie sobre la que se asienta. No hay texto por debajo de 14 px.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;600;700&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Schibsted Grotesk 700, clamp(38px, 4.8vw, 68px), altura de línea 1,02, espacio entre letras -0,03em. Sobrio, porque las fotografías son la parte ruidosa.
- **Cuerpo:** Inter 300, 16px, altura de línea 1.6
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas. Cambios, precios, recuento de habitaciones, ciudades.

## 5. Lo único en movimiento
**Tres exposiciones, fusionadas.** Tres pequeños marcos de la misma sala de estar se encuentran en fila: uno oscuro con la ventana correctamente expuesta, otro medio, uno brillante con la habitación correcta y la ventana abierta. Cuando la sección entra a la vista, se deslizan juntas y se funden en un único marco terminado más grande donde tanto la habitación como la vista a través de la ventana son correctas. 1,6 segundos, una vez.

Cuatro imágenes, opacidad y transformación. Sin control deslizante, sin desplazamiento, sin repetición, y nada más en esta página se anima más alláfotografías asentándose.

## 6. Secciones

Diez secciones. Tenga en cuenta que la página termina en una sección simple, no en una banda de llamada a la acción de color.

1. **Barra de navegación**: 64 px, papel, una línea debajo. Marca denominativa a la izquierda. Cuatro enlaces a la derecha. **La acción es un enlace de texto con un subrayado de 1 px**, que dice "Reservar una sesión", no un botón. Al lado, una línea mono que indica el cambio actual, que es lo más persuasivo de la página.
2. **Héroe, tres fotografías seguidas**: sin título sobre una imagen. En lugar de eso, un titular breve y grotesco en un espacio de papel normal, luego tres interiores uno al lado del otro debajo a la misma altura, subtitulados en monocromático con el recuento de ciudades y dormitorios. La altura mínima es la que necesite el contenido.
3. **Declaración**: un párrafo a 22 px comenzando en un tercio, aproximadamente el segundo que una fotografía tiene para detener un pulgar.
4. **Las tres exposiciones**: superficie teñida. Lo único en movimiento (sección 5) con un título mono.
5. **Paquetes**: tres paquetes como una lista simple, no tarjetas. Nombre, qué incluye, plazo de entrega y precio, cada uno en rayitas. El del medio no está resaltado y no hay nada etiquetado como más popular.
6. **Trabajo reciente**: una cuadrícula suelta de seis interiores en distintos tamaños con leyendas mono que muestran la ciudad, los dormitorios y el agente.
7. **Cómo se desarrolla una sesión fotográfica**: superficie teñida. Cuatro párrafos sencillos con marcadores de tiempo mono. Sin panel, sin inserción, sin fondo oscuro.
8. **Preparando la casa**: dos columnas regladas, lo que hace el vendedor y lo que mueve el fotógrafo. Esta es la página que los agentes reenvían a sus vendedores, por lo que está escrita para ser reenviada.
9. **Una línea sobre edición**: una sola oración, en tamaño grande, que indique claramente si se reemplazan los cielos. Nada más en la sección.
10. **Contacto**: liso. Número de teléfono y correo electrónico como enlaces grandes subrayados en papel, el área de cobertura en monocromático debajo y tres enlaces de pie de página pequeños en el mismo bloque. La página termina aquí sin banda de color.

## 7. Movimiento
- La fusión, una vez, como se describe.
- Las fotografías se asientan desde `scale 1.02` con un tambaleo de 0,06 s y se elevan 3px al pasar el mouse.
- Nada más. Sin contadores, nolíneas dibujadas, sin revelaciones en el texto.
- Facilite `cubic-bezier(.22,1,.36,1)`, respete `prefers-reduced-motion` mostrando el marco fusionado.

## 8. Responsive
- **Móvil bajo 768px:** las tres fotografías de héroe se vuelven una con las otras dos debajo. Las exposiciones se acumulan verticalmente y la fusión se convierte en un simple fundido cruzado en el fotograma final. Los paquetes se convierten en filas apiladas. Cuadrícula de una columna. Sin desplazamiento de página horizontal ni barra adhesiva.
- **Tableta:** cuadrícula de dos columnas, las exposiciones permanecen en una fila.
- **Escritorio:** contenido de ancho máximo 1240 px, medianiles 40 px, relleno de sección 100 px.

## 9. Completo copy

**Marca denominativa:** NORTHLIGHT. Meta: `FOTOGRAFÍA DE PROPIEDAD. SUSSEX Y SURREY.`

**Nav:** Paquetes, Trabajo, Preparación, Contacto. Acción subrayada: `Reservar un rodaje`. Mono: `CURRENT ACTUAL: LA PRÓXIMA MAÑANA`

**Hero**
- Titular: `Fotografías que sobreviven siendo vistas en un teléfono, en una lista de cuarenta casas.`
- Tres subtítulos: `LEWES, 4 BED` · `HOVE, 2 BED FLAT` · `DITCHLING, 5 BED`
- *Fotografías: un salón luminoso con el jardín visible a través de las puertas, una pequeña cocina plana que aún parece espaciosa, un pasillo con la puerta de entrada abierta.*

**Declaración**
`Un fotógrafo de agencia inmobiliaria tiene una función, que es detener un pulgar. Tiene alrededor de un segundo para hacerlo, por teléfono, en una lista de otras cuarenta casas. Es por eso que fotografío temprano, por qué pongo entre paréntesis cada fotograma y por qué paso diez minutos moviendo un contenedor y un automóvil antes de desempacar cualquier cosa. La ventana mantiene su vista y la habitación mantiene su luz.`

**Paquetes**
- **Estándar.** `Hasta 15 imágenes, una hora en sitio, enderezadas y corregidas de color.` `A LA MAÑANA SIGUIENTE. 145 GBP`
- **Completo.** `Hasta 30 imágenes, plano de planta y un exterior crepuscular si el clima lo permite.` `A LA MAÑANA SIGUIENTE. 245 GBP`
- **Premium.** `Todo al completo, además de exteriores de drones y un recorrido en vídeo de un minuto.` `48 HORAS. 395 GBP`

**Trabajo reciente**
Lewes, 4 habitaciones, para Aldridge & Co · Brighton, apartamento de 2 habitaciones, para Harding · Ditchling, 5 habitaciones, para Aldridge & Co · Hove, 3cama, para Seaward · Uckfield, cabaña, para Mayhew · Steyning, conversión de granero, para Harding

**Cómo se desarrolla un rodaje**
- `THE DAY BEFORE` `Un breve resumen. Dirección, acceso, qué habitaciones importan y si estará el vendedor.`
- `EN EL SITIO, UNA HORA` `Habitación por habitación. Trípode, soportes, luces encendidas, persianas subidas. Muevo cosas pequeñas y las vuelvo a colocar.`
- `ESA TARDE` `La edición. Fusionado, enderezado, color corregido.`
- `BY 09:00` `Un enlace de descarga con versiones en tamaño completo y en tamaño web, listo para los portales.`

**Preparando la casa**
- Vendedor: `Coches fuera del camino`, `Contenedores fuera de la vista`, `Camas hechas, cojines enderezados`, `Encimeras despejado excepto una cosa bonita`, `Asientos de baño abajo, toallas a juego`, `Luces encendidas en todas las habitaciones, incluso durante el día`
- Voy a: `Quitar el pequeño desorden y colocarlo de nuevo`, `Abrir persianas y cortinas`, `Cerrar el portátil y esconder los cables`, `Apagar el televisor`, `Ordenar los zapatos junto a la puerta`, `No digas nada sobre tus gustos en art`

**Una línea sobre edición**
`No hay reemplazos de cielo a menos que los solicites, y si lo solicitas, lo diré en los nombres de los archivos.`

**Contacto**
`01273 555 0166` · `book@northlight.photo`
Mono: `CUBRE SUSSEX, SURREY Y EL SUR DE LONDRES. LUGARES PARA EL DÍA SIGUIENTE LA MAYORÍA DE LAS SEMANAS. EDICIONES EL MISMO DÍA POR 40 GBP ADICIONALES.`
Mono, más pequeño: `Totalmente asegurado. Licencia CAA para trabajos con drones, ID de operador a pedido.`
Enlaces: `Paquetes`, `Trabajo`, `Preparando la casa`

## 10. Nunca
A segunda animación de ningún tipo, controles deslizantes antes y después, secciones oscuras, paneles decorativos, marcas denominativas recortadas gigantes, barras de llamadas adhesivas, un paquete central resaltado, insignias más populares, tarjetas redondeadas, sombras, degradados, brillo, cuadrículas de íconos, emoji, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa mono, héroes `100vh`.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "clsx": "^2.1.0" }
```
