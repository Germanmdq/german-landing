# Thornbury & Reed: Aviso del sitio web de seguros de vida

## 1. Objetivo
Cree un sitio web sobrio, similar a un documento, para **Thornbury & Reed**, un corredor de seguros de vida independiente establecido en 1998. Marfil fresco, tinta azul marino intenso, un acento dorado apagado, una pantalla Caslon.

**Este no tiene elementos dibujados ni animados. centro de mesa a propósito.** Es una página de tipografía simple, reglas y una tabla real. Un corredor vende confianza, y la confianza aquí parece un documento bien establecido, no un gráfico que se mueve. Si tiene la tentación de agregar una ilustración, no lo haga.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS
```
Framer Motion es opcional y debe usarse únicamente para un desvanecimiento en el título. Sin bibliotecas de componentes, sin motor de cotizaciones, sin formularios validados. Las acciones son un enlace telefónico y un enlace de correo electrónico.

## 3. Sistema de diseño
```css
:root {
  --paper: #F2F1ED;
  --ink: #16233B;
  --accent: #9A7B3F;
  --on-accent: #FFFFFF;
  --surface: #E6E5E0;
  --muted: #5C6579;
  --line: rgba(22,35,59,0.15);
  --radius: 4px;
  --panel-radius: 4px;
}
```
Tenga en cuenta el radio pequeño. Nada en esta página es una tarjeta redondeada. La estructura proviene de las líneas finas y del espacio entre bloques.

Ritmo de sección: luz en todas partes, con exactamente un bloque teñido en la superficie. No hay una sección oscura ni un panel de acento en ninguna parte de esta página. 

**El contraste es un requisito, no una preferencia.** Cada color de texto, incluido `--muted` y los subtítulos pequeños, debe alcanzar al menos 4,5 a 1 con respecto a la superficie sobre la que se asienta. No hay texto por debajo de 14 px.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Pantalla:** Libre Caslon Text 400, clamp(34px, 4.2vw, 58px), altura de línea 1,12, espacio entre letras -0,01em. Deliberadamente más pequeño que un sitio de marketing. Este es el encabezado de un documento, no una valla publicitaria.
- **Cuerpo:** Inter 300, 17 px, altura de línea 1,7, establecido en una medida de 62 caracteres. La medida importa más que cualquier otra cosa en esta página.
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas. Años, sumas, primas.

## 5. Secciones

Echo secciones. No más. Cada uno está separado por una línea fina y un espacio generoso, nada más.

1. **Barra de navegación**: 64 px, marfil, una línea de cabello debajo. Marca denominativa dejada en minúsculas. Cuatro enlaces de texto a 14 px. **No hay ningún botón en la barra de navegación.** En cambio, el número de teléfono se encuentra en el extremo derecho en monocromático, del mismo tamaño quelos enlaces, con una línea fina debajo solo al pasar el mouse.
2. **Héroe, un párrafo**: sin bloque de título ni fotografía. Una oración Caslon en tamaño de visualización, luego dos párrafos del cuerpo en la medida de 62 caracteres, luego el número de teléfono y una dirección de correo electrónico como enlaces simples subrayados. La altura mínima es la que necesite el contenido. No lo rellenes para llenar una pantalla.
3. **Qué organizamos**: cuatro tipos de portadas como lista de definiciones. Término a la izquierda en Caslon a 20px, dos líneas de explicación a la derecha en el cuerpo. Línea del cabello entre cada uno. Sin tarjetas, sin iconos, sin columnas de tres.
4. **Lo que cuesta**: la única tabla real en la página y la razón por la que la gente está aquí. Cuatro filas: edad y tabaquismo, cobertura, plazo y prima mensual típica. Figuras en mono, alineadas a la derecha, con una línea fina solo debajo de la fila del encabezado. Debajo, un breve párrafo sobre lo que mueve un precio.
5. **Cómo trabajamos**: cuatro párrafos numerados, claramente establecidos, que incluyen la incómoda verdad de que las respuestas honestas a las preguntas médicas son las que impiden que se rechace un reclamo.
6. **Por qué un corredor**: el bloque tintado de superficie única en la página. Dos columnas cortas: qué hacemos, y qué cobramos, que es nada. Establecido en el cuerpo del texto, no como una lista de funciones.
7. **La gente**: dos nombres, cada uno con años en el oficio y una frase. Retratos pequeños, cuadrados de 96 px, colocados en línea al comienzo de cada párrafo en lugar de en una cuadrícula.
8. **Pie de página**: silencio. Tres líneas cortas a 14px: dirección, línea FCA y tres enlaces. Sin marca denominativa gigante, sin bloque oscuro, sin banda decorativa. La página simplemente termina.

## 6. Movimiento
Un desvanecimiento en la oración del héroe, aumento de 16px, 0,5 segundos, una vez. Nada más se mueve a ninguna parte en esta página. No hay revelaciones activadas por desplazamiento, ni contadores, ni líneas dibujadas, ni elevaciones flotantes. Respete `prefers-reduced-motion` eliminando incluso eso.

## 7. Responsive
- **Móvil por debajo de 768px:** la medida se reduce pero se mantiene en unos cómodos 40 caracteres. La tabla de primas se convierte en filas apiladas con la prima en la misma línea que la edad. Los retratos permanecen en línea. El número de teléfono se mueve a la parte superior del héroe. Sin desplazamiento de página horizontal ni barra de llamada fija.
-**Escritorio:** contenido con ancho máximo de 760 px, no 1200 px. Este es un ancho de lectura, y la estrechez es el diseño.

## 8. Copia completa

**Marca denominativa:** THORNBURY & REED. Meta: `COREDOR DE SEGUROS DE VIDA INDEPENDIENTE. ESTABLECIDO 1998.`

**Nav:** Cobertura, Costos, Cómo trabajamos, Acerca de. Teléfono a la derecha: `01793 555 0142`

**Hero**
- Frase: `El seguro de vida es una promesa de que la hipoteca se paga cuando no puedes pagarla.`
- Párrafo uno: `Somos un corredor independiente. Analizamos todo el mercado, explicamos las dos o tres pólizas que realmente encajan y nos paga la aseguradora en lugar de usted.`
- Párrafo dos: `La mayoría de la gente necesita veinte minutos al teléfono y una conversación honesta. Si ya tienes cobertura a través del trabajo y te es suficiente, te lo diremos y no volverás a saber de nosotros.`
- Enlaces: `01793 555 0142` y `hello@thornburyreed.co.uk`

**Lo que contratamos**
- **Plazo nivelado.** `Una cantidad fija por un número fijo de años. Los más sencillos y normalmente los más baratos. Se adapta a familias con una hipoteca.`
- **Plazo decreciente.** `La cobertura se ajusta a una hipoteca de amortización, por lo que usted paga lo que debe en lugar de lo que pidió prestado.`
- **Beneficio de ingresos familiares.** `Paga un ingreso mensual a su familia en lugar de una suma global. Es más fácil vivir, más difícil de manejar mal.`
- **Enfermedad crítica.** `Paga cuando se diagnostica una condición enumerada. Cuesta más y la redacción importa más. Vale la pena si trabaja por cuenta propia y no recibe subsidio por enfermedad.`

**Lo que cuesta**
| Edad y estatus | Portada | Término | Prima típica |
|---|---|---|---|
| 30, no fumador | 250.000 libras esterlinas | 25 años | 9 GBP al mes |
| 35, no fumador | 300.000 libras esterlinas | 25 años | 14 GBP al mes |
| 40, no fumador | 300.000 libras esterlinas | 20 años | 21 GBP al mes |
| 45, fumador | 200.000 libras esterlinas | 15 años | 46 GBP al mes |
Abajo: `Estas son citas reales del mes pasado, no ilustraciones. Las primas varían con la edad, la salud, el tabaquismo, el peso y la ocupación. Una solicitud rechazada en otro lugar no significa que usted no esté asegurado, sino quegeneralmente significa que se preguntó a la aseguradora equivocada. `

**Cómo trabajamos**
- `01` `La llamada. Veinte minutos. Lo que debes, quién depende de ti y lo que ya tienes a través del trabajo.`
- `02` `La investigación. Revisamos todo el mercado y volvemos con dos o tres opciones, con los motivos, por escrito.`
- `03` `La solicitud. Lo completamos contigo. Responda las preguntas médicas con honestidad, incluidas las incómodas. Un reclamo rechazado generalmente comienza aquí.`
- `04` `La revisión. Cada dos años, o cada vez que cambie su hipoteca, trabajo o familia.`

**Por qué un corredor**
- Qué hacemos: `Lea el texto de la póliza en lugar del resumen. Pregunte a las aseguradoras sobre su condición específica antes de presentar la solicitud. Realizar el seguimiento médico. Ayuda a tu familia a reclamar, años después, cuando ya no nos queda ningún motivo comercial para preocuparnos.`
- Lo que cobramos: `Nada. La aseguradora nos paga una comisión y tú pagas la misma prima que pagarías si fuera directo. Si alguien le dice que un corredor cuesta más, le está vendiendo algo más.`

**The people**
- **Alan Thornbury.** `31 años en protección. Lo convencerá de que no tenga cobertura que no necesita, razón por la cual la mitad de nuestras consultas provienen de personas a las que anteriormente rechazó.`
- **Priya Reed.** `18 años, diez de ellos en suscripción, por lo que sabe lo que se rechaza antes de que se presente la solicitud.`

**Pie de página**
`14 Wood Street, Swindon SN1 4AN. 01793 555 0142.`
`Thornbury & Reed Ltd está autorizado y regulado por la Autoridad de Conducta Financiera, número 302118.`
Enlaces: `Costos`, `Quejas`, `Privacidad`

## 9. Nunca
Anada que se mueve excepto el héroe que se desvanece. Ilustraciones, diagramas dibujados, líneas de tiempo, íconos, insignias, tarjetas redondeadas, sombras, degradados, brillo, secciones oscuras, paneles decorativos, marcas denominativas gigantes, fotografías de archivo de familias en las playas, temporizadores de cuenta regresiva, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa mono, héroes `100vh`.

## 10. Dependencias
```json
{ "clsx": "^2.1.0" }
```
