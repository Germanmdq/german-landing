# Halloran Haulage: Aviso del sitio web de la empresa de camiones

## 1. Objetivo
Cree un sitio web sencillo y confiable para **Halloran Haulage**, una empresa de transporte familiar que opera dieciocho camiones desde Midlands. Papel gris cálido, tinta casi negra, un acento en naranja quemado, un grotesco ajustado y una firma: una ruta trazada a lo largo de la página mientras el kilometraje cuenta. Nada aquí debería parecer una startup. Debería sentirse como una empresa que ha movido paletas desde 1978.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin biblioteca de mapas, sin calculadora de cotizaciones, sin portal de seguimiento. La ruta es una ruta SVG. `lucide-react` solo para el glifo de flecha.

## 3. Sistema de diseño
```css
:root {
  --paper: #F2F1EE;
  --ink: #16181A;
  --accent: #C2410C;           /* burnt orange */
  --on-accent: #FFFFFF;
  --surface: #E4E3DE;
  --muted: #5E5F5C;
  --line: rgba(22,24,26,0.16);
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, superficie, claro, oscuro, claro, acento, pie de página oscuro. Las líneas finas y los tintes estructuran las tarjetas, nunca las sombras. 

**El contraste es un requisito, no una preferencia.** Cada color de texto, incluido el `--muted` y los subtítulos pequeños, debe alcanzar al menos 4,5 a 1 con respecto a la superficie sobre la que se asienta. No hay texto inferior a 14 px en ninguna parte de la página.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Archivo 700, clamp(42px, 5.6vw, 82px), altura de línea 1.0, espacio entre letras -0.035em
- **Cuerpo:** Inter 300, 16px, altura de línea 1.6
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas, espacio entre letras 0.06em. Kilometraje, tonelaje, números de licencia, etiquetas de índice.
- Sin cursiva. El énfasis es una línea completa en naranja tostado.

## 5. Elemento distintivo
**Una ruta, dibujada.** Un contorno simplificado de la red de carreteras principales se extiende a lo largo de la sección como una línea fina. Cuando aparece a la vista, una línea naranja quemada traza una ruta desde el depósito hasta una entrega, dibujando durante 1,8 segundos con `pathLength`. A lo largo de él aparecen en secuencia tres pequeños marcadores cuadrados: depósito, entrega al día siguiente y entrega. Debajo del dibujo, un contador monoespaciado va desde 0 hasta el kilometraje y se detiene.

Dibuja una vez. Sin bucles, sin íconos de vehículos deslizándose, sin mosaicos de mapas.

## 6. Secciones, cada una con un esqueleto diferente

1. **Barra de navegación**: 72 px, papel, una línea fina debajo. Marca denominativa a la izquierda, cuatro enlaces a la derecha, pastilla naranja con una flecha redondacírculo y una línea mono con el número de la oficina de tráfico.
2. **Héroe, retrato dividido**: un titular de Archivo de dos líneas a la izquierda, una fotografía alta de un tractor a la derecha, hechos mono debajo del titular y dos acciones. Altura mínima `clamp(540px, 76vh, 820px)`. *Fotografía: una unidad tractora limpia con cortina estacionada en un depósito a primera hora de la mañana, vista de tres cuartos, sin desenfoque de movimiento.*
3. **La ruta**: superficie. El elemento de firma (sección 5) con un título mono que nombra la ejecución.
4. **Lo que llevamos, lista suiza**: ligero. Etiqueta `001/ Trabajo`, cuatro nombres de servicios apilados de un tercio, cada uno con dos líneas y una nota mono sobre el tipo de remolque que necesita.
5. **La flota, mesa reglamentada**: ligera. Cinco filas: vehículo, carga útil, tipo de plataforma, número en servicio. Figuras en mono, alineadas a la derecha.
6. **Cómo se ejecuta un trabajo, filas numeradas**: fondo de tinta oscura, recuadro de 16 píxeles, `--panel-radius`. Cuatro filas en color papel con marcas de tiempo mono: la llamada, la carga, la ejecución, el trámite.
7. **Cumplimiento, índice**: ligero. Dos columnas rayadas de los aburridos hechos que ganan el contrato: licencia de operador, seguro, póliza de tacómetro, nivel FORS, lo que no llevaremos.
8. **El patio, rejilla suelta**: luz. Cuatro fotografías de diferentes tamaños con subtítulos mono. *Fotografías: un muelle de carga al amanecer, un conductor realizando un control ambulante, una carga de pallet apilada, la puerta del patio.*
9. **Una cita**: superficie. Una cita única centrada en Archivo a 28px con una línea de firma en mono.
10. **Reserve una carga, panel decorativo**: suelo naranja, panel empotrado. Una línea, el número de la oficina de tráfico en grande y una nota mono sobre fuera de horario.
11. **Pie de página**: tinta oscura. Marca denominativa gigante recortada "HALLORAN", dirección del depósito, línea de licencia de operador, tres enlaces pequeños.

## 7. Movimiento
: el título se desvanece 18 píxeles una vez, la fotografía se establece desde `scale 1.03`.
: la ruta se dibuja una vez, el contador avanza con él y se detiene.
- Tabla las filas se desvanecen con un escalonamiento de 0.04 s.
- Facilita `cubic-bezier(.22,1,.36,1)`, respeta `prefers-reduced-motion` mostrando la ruta ya dibujada y el kilometraje final.

## 8. Responsive
- **Móvil bajo 768px:** la fotografía del héroe se mueve sobre el título,título a 38px. La ruta mantiene todo su ancho pero se reduce a dos balizas. La tabla de flotas se convierte en filas apiladas. Cuadrícula de una columna. Una barra de llamada naranja se fija en la parte inferior de la pantalla, respetando el área segura insertada. Sin desplazamiento de página horizontal.
- **Tableta:** cuadrícula de dos columnas.
- **Escritorio:** ancho máximo de contenido 1220 px, canales 40 px, relleno de sección 110 px.

## 9. Copia completa

**Marca denominativa:** HALLORAN HAULAGE. Meta: `PALETS Y CARGAS COMPLETAS. LA REGIÓN CENTRAL DE INGLATERRA. DESDE 1978.`

**Nav:** Trabajo, Flota, Cumplimiento, Contacto. Botón: `Reservar una carga`. Mono: `OFICINA DE TRÁFICO 01827 555 0140`

**Hero**
- Titular: `Dieciocho camiones y un teléfono que contestan.`
- Hechos: `18 VEHÍCULOS` · `FORS SILVER` · `O LICENCIA OB1024518`
- Apartado: `Trabajos de cargas completas y pallets en toda la Midlands y hasta la costa sur. De gestión familiar, tercera generación y todavía el mismo número de oficina de tráfico.`
- Acciones: `Reservar una carga`, `Ver la flota`

** Leyenda de ruta:** `Tamworth a Exeter, noche en Bristol. 212 millas. Un recorrido que hacemos cuatro veces por semana.`

**Lo que llevamos** (etiqueta `001/ Trabajo`)
- **Cargas completas.** `Un cliente, un remolque, directo.` `CORTINA O CAJA`
- **Trabajo con paletas.** `De uno a doce paletas en un recorrido compartido, al día siguiente para la mayoría de los códigos postales.` `RED MIEMBRO`
- **Temperatura controlada.** `Enfriado de dos a ocho grados, registrado en todo el camino.` `CUATRO REMOLQUES FRIGORÍFICOS`
- **Anormal y pesado.** `Hasta 44 toneladas con notificación. Te diremos si necesita escolta.` `LOW LOADER, BAJO CONVENIO`

**La flota** (etiqueta `002/ Flota`)
| Vehículo | Carga útil | Cama | En servicio |
|---|---|---|---|
| Cabeza tractora, 44t | 26 toneladas | Lado de cortina | 11 |
| Cabeza tractora, 44t | 24 toneladas | Nevera | 4 |
| Rígido, 18t | 9 toneladas | Caja con trampilla elevadora | 2 |
| Cargador bajo | 32 toneladas | Marco de paso | 1 |
Nota: `Cada vehículo es Euro 6, rastreado e inspeccionado cada seis semanas, lo necesite o no.`

**Cómo se ejecuta un trabajo** (etiqueta `003/ Proceso`)
- `BY16:00` **La llamada.** `Código postal de recogida, código postal de entrega, qué es y qué pesa. Dos minutos.`
- `MISMO DÍA` **La carga.** `Confirmamos el vehículo y el conductor por nombre, con una ventana de recogida, no una mañana vaga.`
- `DURANTE LA NOCHE` **La carrera.** `Seguimiento de todo el camino. Si va a llegar tarde, primero se lo comunicaremos nosotros.`
- `DENTRO DE 24 HORAS` **La documentación.** `POD firmado, escaneado y enviado por correo electrónico. Sin persecución.`

**Cumplimiento** (etiqueta `004/ La parte aburrida`)
- Contamos con: `Licencia de operador OB1024518`, `Las mercancías en tránsito cubren hasta 250 000 GBP`, `Responsabilidad pública hasta 5 millones de GBP`, `FORS Silver, auditado anualmente`, `Seis inspecciones semanales por nuestra cuenta taller`
- No transportaremos: `Cualquier cosa peligrosa sin una nota de mercancías peligrosas firmada`, `Ganadería`, `Cargas que no podemos asegurar legalmente`, `Trabajo que necesita un conductor para romper sus horas`

**El patio** (etiqueta `005/ El patio`)
Página de carga, 05:40 · Control de recorrido antes de cada turno · A cubierta completa de 26 paletas · La puerta, Tamworth

**Cita:** `Me llamaron antes de que me diera cuenta del retraso. En catorce años de transportistas, esto ha sucedido dos veces, y en ambas ocasiones fue este lote.`
Firma: `Dan Whitlock, gerente de almacén, Exeter`

**Reserve un panel de carga**
- Línea: `Díganos los dos códigos postales y su peso. Te diremos si podemos hacerlo hoy.`
- Teléfono grande: `01827 555 0140`
- Mono: `OFICINA DE TRÁFICO 06:00 A 18:00. FUERA DE HORARIO VA AL TELÉFONO DE SERVICIO.`

**Footer**
`HALLORAN HAULAGE`, `Bitterscote Depot, Tamworth B78 3HL`, `traffic@halloranhaulage.co.uk`
Mono: `Licencia de operador OB1024518. Miembro de una red nacional de paletas.`
Enlaces: `Trabajo`, `Flota`, `Cumplimiento`

## 10. Never
Glassmorfismo, degradados, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, mosaicos de mapas, un ícono de camión deslizándose a lo largo de la ruta, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en el copiar, más de dos fuentes más la capa meta mono, héroes `100vh`, franjas idénticas.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
