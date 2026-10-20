# Meridian Notary — Aviso del sitio web del notario

## 1. Declaración de objetivos
Cree un sitio web nítido y confiable para **Meridian Notary**, un notario público independiente: marfil limpio y azul marino intenso, un sello en relieve que gira lentamente como firma visual, encabezados serif precisos y un diseño que se siente como un documento oficial bien hecho: tranquilo, exacto y fácil de usar. on.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes ni sistema de reserva. Los botones de cita enlazan a un número de teléfono o correo electrónico.

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(42, 33%, 97%);       /* ivory document */
  --foreground: hsl(222, 44%, 14%);      /* deep navy ink */
  --primary: hsl(222, 52%, 24%);         /* navy */
  --primary-foreground: hsl(42, 33%, 97%);
  --seal: hsl(4, 58%, 42%);              /* sealing-wax red, used sparingly */
  --muted-foreground: hsl(222, 12%, 42%);
  --border: hsl(222, 20%, 84%);
  --card: hsl(42, 30%, 93%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **H1:** Libre Caslon Text 400, clamp(42px, 5.5vw, 80px), altura de línea 1.05, espacio entre letras -0.015em
- **H2:** Libre Caslon Text 400, clamp(30px, 3.5vw, 48px)
- **Cuerpo:** IBM Plex Sans 300, 17px, altura de línea 1.75
- **Números de referencia, tarifas, etiquetas:** IBM Plex Mono 400, 12–13px, mayúsculas, espacio entre letras 0.08em

## 5. Efectos visuales

**Efecto 1: sello giratorio.** Un gran sello circular dibujado en SVG en línea: dos círculos concéntricos, el texto `NOTARIO MERIDIAN · NOTARIO PÚBLICO · EST. 2009 ·` montado sobre una forma circular `<textPath>`, y una pequeña estrella en el centro. El anillo de texto gira muy lentamente (una vuelta cada 40 segundos, lineal, infinito). Trazo azul marino, 1,5 px, sin relleno. En el héroe, tiene 420 píxeles de ancho, superponiéndose parcialmente al borde derecho del bloque de texto. 

**Efecto 2: líneas del documento.** El fondo del héroe y la sección de tarifas tienen líneas horizontales tenues, como papel legal: `repeating-linear-gradient(to bottom, transparent 0 31px, hsla(222, 20%, 84%, 0.5) 31px 32px)`. Una única línea delgada de margen rojo corre verticalmente a 64 píxeles desde el borde izquierdo del escritorio. 

**Efecto 3: Sello.** Números de sección (`§ 01`, `§ 02`) Sello en: `scale 1.6 → 1`, `opacity 0 → 1`, `rotate -8 → -3deg`, resorte (rigidez 400, amortiguación 22), en lacre red.

## 6. Desglose de componentes

1. **Barra de navegación**: 80 píxeles, marfil, borde inferior. Marca denominativa dejada en Caslon con un pequeño icono de sello. Enlaces correctos. Botón azul marino "Reservar una cita".
2. **Héroe** — fondo de papel rayado (Efecto 2). 60% izquierdo: etiqueta mono, H1, sublínea, dos botones y una fila de tres pequeños datos de confianza en mono. Derecha 40%: la rotaciónsello (Efecto 1).
3. **Lo que certificamos ante notario** — Sello `§ 01`. Una cuadrícula de 3 columnas de seis tipos de documentos, cada uno en una celda de borde fino con un ícono de Lucide, un nombre y una línea de explicación. No hay efectos de desplazamiento más allá del oscurecimiento de un borde.
4. **Cómo funciona** — `§ 02`. Cuatro pasos numerados en una fila horizontal unidos por una fina línea de puntos.
5. **Tarifas** — `§ 03`. Fondo de papel gobernado. Una mesa limpia con tarifas mono a la derecha: servicio, qué está incluido, tarifa. Seis filas. Una nota a continuación sobre IVA y desembolsos.
6. **Notario móvil** — dividido: imagen a la izquierda, texto a la derecha. *Imagen: persona profesional firmando un documento en la mesa de la cocina de una casa, luz natural, calma y tranquilidad, poca profundidad de campo.*
7. **Acerca del notario**: retrato en un marco ovalado con un fino borde azul marino, párrafo biográfico y calificaciones en una lista monocromática. *Imagen: retrato de una amigable mujer profesional de unos cuarenta años con una chaqueta azul marino, una suave luz de oficina y accesible.*
8. **Preguntas**: cuatro preguntas que utilizan elementos nativos `<details>`, con un signo más que gira hasta formar una cruz.
9. **Contacto**: panel azul marino, texto en marfil: dirección, teléfono, correo electrónico, horario y una línea sobre citas para el mismo día.
10. **Pie de página**: marfil, borde fino, letra pequeña reglamentaria en monocromo, enlaces.

## 7. Animaciones
- Texto destacado: se desvanece 20 px, 0,8 s, se tambalea 0,1 s
- Sello: se acerca con la carga (`pathLength 0 → 1`, 1,6 s) y luego comienza girando
- Números de sección: Efecto 3 cuando está a la vista
- Celdas de tipo de documento: aparecen con un escalonamiento de 0,06 s
- Cómo funciona línea de puntos: `escalaX 0 → 1` desde la izquierda, 1,2 s, a medida que entra la sección 
- Filas de tarifas: aparecen con 0,05 s stagger
- Elementos de detalles: el icono más gira 45 grados en 0,2 s

## 8. Responsive
- **Móvil (<768px):** el sello se mueve por encima del H1 a 220px de ancho; línea de margen roja oculta; los tipos de documentos van a 1 columna; los escalones se apilan verticalmente con la línea de puntos vertical; la tabla de tarifas se apila en filas con la tarifa alineada a la derecha en la misma línea que el nombre del servicio; la barra de navegación muestra una marca denominativa y un botón "Llamar" más un ícono de menú.
- **Tableta:** tipo de documento 2 columnas;pasos 2×2.
- **Escritorio:** ancho máximo 1200px, `px-10`, espacio entre secciones `py-24`.

## 9. Copia completa

**Marca:** MERIDIAN NOTARY · Notario público · Londres

**Navbar:** Servicios · Tarifas · Notario móvil · Acerca de · Contacto — Reservar una cita

**Hero**
- Etiqueta: `NOTARIO PÚBLICO · CIUDAD DE LONDRES`
- H1: `Documentos firmados, sellados y *aceptados* en el extranjero.`
- Sublínea: `Servicios notariales independientes para particulares y empresas, incluidos apostillas y legalizaciones. La mayoría de las citas dentro de las 48 horas y las tarifas fijas se cotizan antes de comenzar.`
- Botones: `Reservar una cita` · `Ver nuestras tarifas`
- Datos de confianza: `EST. 2009` · `12,000+ DOCUMENTOS` · `DISPONIBLES EL MISMO DÍA`

**Lo que certificamos ante notario** — `§ 01` H2 `Lo que *firmamos ante notario*.`
- **Poderes** — `Para asuntos de propiedad, negocios o familia en el extranjero.`
- **Documentos de la empresa** — `Certificados de constitución, resoluciones de juntas directivas y verificación de firmas.`
- **Transacciones inmobiliarias** — `Documentos de compra y venta de propiedades en el extranjero.`
- **Documentos personales** — `Pasaportes, títulos y certificados de nacimiento certificados por autoridades extranjeras.`
- **Apostillas** — `Tramitamos apostillas en el Ministerio de Asuntos Exteriores para usted, incluidas servicio expreso.`
- **Legalización consular** — `Para países fuera del Convenio de La Haya, tramitado de extremo a extremo.`

**Cómo funciona** — `§ 02`
1. **Envíe el documento** — `Envíe una copia por correo electrónico y díganos para qué país es.`
2. **Obtenga una cotización fija** — `Respondemos dentro de dos horas hábiles con el costo total.`
3. **Inicie sesión en persona** — `En nuestra oficina, o en su casa o lugar de trabajo con nuestro servicio móvil.`
4. **Recíbalo** — `Recogido, publicado o enviado por mensajería, con una apostilla si es necesario.`

**Tarifas** — `§ 03` H2 `Tarifas fijas, *sin* sorpresas.`
| Servicio | Incluye | Tarifa |
|---|---|---|
| Firma única | Un documento, un firmante | 95€ |
| Cada signatario adicional | Mismo documento, misma cita | 40€ |
| Copia certificada | Pasaporte, título ocertificado | 75€ |
| Documento de empresa | Verificación de la autoridad firmante | 180€ |
| Apostilla (estándar) | Tasas y tramitación del Ministerio de Asuntos Exteriores | £85 |
| Cita móvil | Dentro de las zonas 1 a 3 | desde £60 |
Nota: `Las tarifas no incluyen IVA. Los honorarios del Ministerio de Asuntos Exteriores y de la embajada se repercuten al costo y se enumeran en su cotización.`

**Notario móvil** — H2 `Podemos acudir a *usted*.` `Para clientes en el hospital, bajo atención o que simplemente no pueden salir de una oficina ocupada, atendemos en persona en cualquier lugar del Gran Londres, incluidas las noches y los fines de semana.` Button `Programar una visita`

**Acerca del notario** — H2 `Eleanor Voss, *Notario público*.` `Eleanor se graduó como notario en 2009 después de una década como abogada comercial. Habla francés y alemán y trabaja regularmente con clientes que compran propiedades en Francia, España y Suiza.` Cualificaciones: `NOTARIO PÚBLICO, 2009` · `MIEMBRO DE LA SOCIEDAD DE NOTARIOS` · `REGULADO POR LA OFICINA DE LA FACULTAD` · `TOTALMENTE ASEGURADO`

**Preguntas**
- **¿Qué debo llevar?** — `Su documento original, sin firmar y un pasaporte válido o licencia de conducir con fotografía más un comprobante de domicilio reciente.`
- **¿Cuánto tiempo tarda una apostilla?** — `Las apostillas estándar tardan alrededor de cinco días hábiles. Nuestro servicio exprés puede devolver uno en uno o dos días.`
- **¿Pueden legalizar documentos en otros idiomas?** — `Sí, aunque es posible que necesitemos una traducción certificada según el idioma y el país de destino.`
- **¿Necesito una cita?** — `Sí. Las citas para el mismo día suelen estar disponibles si llama antes del mediodía.`

**Contacto** — H2 `Reserve una cita.` `Meridian Notary, 3rd Floor, 41 Cheapside, London EC2V 6AA` · `020 7946 0381` · `office@meridiannotary.co.uk` · `De lunes a viernes de 9 a. m. a 6 p. m. Citas nocturnas y de fin de semana previa cita.`

**Pie de página** — Servicios · Tarifas · Notario móvil · Acerca de · Privacidad · Quejas · `Eleanor Voss es una notaria pública regulada por la Oficina de la Facultad del Arzobispo de Canterbury.` · © 2026 Meridian Notary

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
