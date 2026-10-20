# Ledger: Página de inicio de lista de espera Aviso del sitio web

## 1. Objetivo
Cree una página de lista de espera nítida y segura para **Ledger**, una aplicación de gastos inédita para estudios pequeños. Fondo blanco, texto casi negro, un acento en azul eléctrico, una cuadrícula suiza que puedes ver y un único campo de correo electrónico que importa más que cualquier otra cosa en la página. Todo lo demás existe para que valga la pena completar ese campo.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin backend, sin análisis. El formulario contiene una parte del estado y muestra un estado confirmado después del envío.

## 3. Sistema de diseño
```css
:root {
  --paper: #FFFFFF;              /* light ground */
  --ink: #111111;                /* text and dark ground */
  --accent: #2743CF;             /* electric blue */
  --on-accent: #FFFFFF;
  --surface: #F4F4F5;            /* tinted ground */
  --muted: #6B6B70;              /* secondary text */
  --line: rgba(17,17,17,0.15);   /* hairlines */
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página claro. La estructura proviene de líneas finas y una cuadrícula de columnas visible, nunca de cuadros o sombras.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600;700&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Instrumento Sans 600, espacio entre letras -0,04 em, altura de línea 0,98. Hero de 80 a 132 px, títulos de sección de 40 a 64 px.
- **Cuerpo:** Inter 300, 16 px, altura de línea 1,55.
- **Metacapa:** IBM Plex Mono 400, 11 px, mayúsculas, espacio entre letras 0,06 em. Solo para fechas, recuentos y etiquetas de índice como `001/Why`.
: no hay cursiva en este. El énfasis proviene de una línea completa establecida en el color de acento.

## 5. Elemento distintivo
**Un boleto de cola.** Un boleto estilo guardarropa dibujado en SVG: un rectángulo con un borde perforado en un lado representado como una línea discontinua, una etiqueta mono que dice "LEDGER EARLY ACCESS" y un gran número en Instrument Sans. Antes de enviar, el número aparece como cuatro guiones grises. Después del envío, cada dígito se coloca en su lugar desde abajo, uno tras otro, con una separación de 60 ms, y una delgada línea azul se dibuja a lo largo de la perforación.

El número es el lugar del visitante en la cola, que se lleva a cabo en el estado local. Es el único momento de deleite en la página y ocurre una vez.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 68px, transparente, sin enlaces. Marca denominativa a la izquierda, una línea mono a la derecha que lee la ventana de inicio.
2. **Héroe, hoja suiza**: líneas de cuadrícula verticales tenues visibles que recorren toda la altura de la sección. Índice mono `000/ Ledger` en elcolumna izquierda, luego un título de tres líneas que comienza en un tercio del ancho. Debajo hay una frase y el campo de correo electrónico con un botón cuadrado sólido. Altura mínima `clamp(520px, 76vh, 780px)`.
3. **El billete**: ligero, centrado. El elemento de firma (sección 5) con un título mono debajo.
4. **El problema, afirmación**: luz. Un párrafo largo de 28 píxeles en la pantalla, comenzando en un tercio, con "001/Why" en la columna de la izquierda. Sin imagen.
5. **Tres cosas, filas regladas**: superficie. Tres filas numeradas en líneas finas: número en mono, título en la pantalla a 32 px, una oración. Sin iconos, sin tarjetas.
6. **Míralo, foto led**: suelo oscuro. Una captura de pantalla ancha del producto insertada de 16 píxeles con `--panel-radius`, un título mono en la parte superior izquierda del panel. *Captura de pantalla: una interfaz de gastos clara y clara, una lista de transacciones con categorías y un total, detalles en azul, sin gráfico.*
7. **Para quién es, intercambio de índice**: ligero. Cuatro tipos de equipos aparecen grandes a la izquierda. Al pasar el cursor sobre una línea, se intercambia una pequeña fotografía a la derecha. *Fotografías: un estudio de diseño de dos personas, una pequeña oficina de arquitectura, un escritorio de producción cinematográfica, una oficina de estudio de grabación.*
8. **Cronología honesta, filas finas**: claro. Cuatro filas: qué se construye, qué sigue, qué no viene, cuándo. Fechas mono alineadas a la derecha.
9. **De la construcción, cotización**: superficie. Una cita del fundador, centrada, a 34 px, firmada en mono.
10. **Segunda consulta, panel decorativo**: suelo decorativo, panel empotrado. Una línea, el campo de correo electrónico nuevamente y una línea mono sobre con qué frecuencia tendrá noticias suyas.
11. **Pie de página**: claro. Marca denominativa, una línea sobre quién lo está construyendo, tres enlaces pequeños y la ventana de inicio mono nuevamente.

## 7. Movimiento
: las líneas de los titulares aumentan 24 píxeles con un escalonamiento de 0,08 s, una vez.
- Las líneas de cuadrícula se desvanecen de 0 a 0,8 s en carga y luego permanecen quietas.
- Los dígitos del ticket se desplazan como se describe, solo después del envío.
: las fotografías de intercambio de índice se funden en 0,2 s.
- Botones: rellena los barridos de izquierda a derecha al pasar el cursor sobre 0,2 s.
- Facilidad `cubic-bezier(.22,1,.36,1)`. Respete `prefers-reduced-motion`.

## 8. Responsive
- **Móvil de menos de 768px:**líneas de cuadrícula ocultas. Titular a 44 px comenzando en el margen izquierdo. Campo de correo electrónico de ancho completo con el botón apilado debajo. El ticket se escala a 260 px de ancho. El intercambio de índice pierde la fotografía flotante y muestra una pequeña miniatura dentro de cada fila. Sin desplazamiento de página horizontal.
- **Tableta:** título a 72 px, líneas de cuadrícula visibles, el intercambio de índice mantiene la fotografía.
- **Escritorio:** ancho de contenido de 1200 px, márgenes de 40 px, relleno de sección de 110 px.

## 9. Completo copy

**Marca denominativa:** LEDGER. Mono, arriba a la derecha: `BETA PRIVADA. PRIMERAS INVITACIONES EN NOVIEMBRE.`

**Héroe** (index `000/ Ledger`)
- Titular: `Gastos, finalmente dimensionados para un estudio de cuatro.`
- Frase: `Ledger lee los datos del banco, los clasifica como lo haría un contable y produce el informe que su contable realmente solicita for.`
- Marcador de posición de campo: `you@studio.com` Botón: `Unirse a la lista de espera`
- Mono debajo: `NO SPAM. UN CORREO ELECTRÓNICO AL MES COMO MÁXIMO.`

**Ticket caption:** `Tu lugar en la cola. Las invitaciones se envían en el orden en que fueron recibidas.`

**El problema** (etiqueta `001/ Por qué`)
`Cada herramienta de gastos está diseñada para un profesional independiente o para una empresa con un departamento de finanzas. En medio se encuentra un estudio con cuatro personas, una de las cuales hace los libros los domingos, y ninguna de las herramientas cabe. El libro mayor es para ese domingo.`

**Tres cosas**
- `01` **Lee el feed, no los recibos.** `Conecte una cuenta comercial y las transacciones llegan ya ordenadas. Los recibos son para aquellos que necesitan pruebas.`
- `02` **Sabe lo que compra un estudio.** `Software, contratistas, viajes, hardware y las once formas en que un café se convierte en un gasto del cliente.`
- `03` **Un informe, el correcto.** `Una exportación trimestral que su contable abre sin enviarle un correo electrónico question.`

**Título de captura de pantalla:** `Septiembre, ordenado. Catorce segundos de trabajo.`

**Para quién es**
- `Estudios de diseño de dos a ocho`
- `Prácticas de arquitectura`
- `Productoras`
- `Cualquiera cuyo contable suspiros`

**Cronología honesta** (etiqueta `002/ Dónde está`)
- `Alimentación y clasificación del banco`... `Construido y en forma diariause` ... `AHORA`
- `Exportación trimestral` ... `Construido, en prueba con cuatro contables` ... `OCTUBRE`
- `Captura de recibos` ... `A continuación, una vez que la exportación esté estable` ... `DICIEMBRE`
- `Nómina` ... `No viene. Utilice algo creado para ello.` ... `NUNCA`

**Cita:** `Construí esto porque gasté novecientas libras en herramientas que eran demasiado pequeñas o demasiado grandes, y luego lo hice en una hoja de cálculo de todos modos.`
Firma: `Mara Teller, construyendo Ledger`

**Segunda pregunta**
- Línea: ``Tienes delante cuatrocientos once estudios. Se mueve rápidamente.`
- Marcador de posición de campo: `you@studio.com` Botón: `Unirse a la lista de espera`
- Mono: `LE ENVIAREMOS UN CORREO ELECTRÓNICO CUANDO ES SU TURNO, Y NO ANTES.`

**Pie de página**
`LEDGER`, `Construido en Bristol por dos personas.`, enlaces `Privacidad`, `Qué almacenamos`, `mara@ledger.app`, mono `BETA PRIVADA. PRIMERAS INVITACIONES EN NOVIEMBRE.`

## 10. Nunca
Glassmorfismo, degradados, brillo, tarjetas con sombra, cuadrículas de íconos, emoji, contadores falsos que marcan, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, un precio tabla para un producto que aún no existe.

## 11. Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
