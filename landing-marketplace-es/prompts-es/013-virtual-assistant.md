# Margen: Aviso del sitio web del asistente virtual

## 1. Objetivo
Cree un sitio web tranquilo y preciso para **Margin**, un asistente virtual que trabaja con fundadores de pequeñas empresas. Papel cálido, tinta negra, un acento en azul tinta, una serifa tranquila y una cuadrícula semanal que se completa para mostrar cuántas horas regresa un cliente. Debería parecer un cuaderno bien cuidado, no un discurso de agencia.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react)
```
Sin bibliotecas de componentes, sin sistema de reservas, sin calculadora. `lucide-react` solo para el glifo de flecha en los botones.

## 3. Sistema de diseño
```css
:root {
  --paper: #F3F1EC;
  --ink: #1A1A18;
  --accent: #2F4B7C;          /* ink blue, the only accent */
  --on-accent: #F3F1EC;
  --surface: #E9E6DF;
  --muted: #6E6B64;
  --line: rgba(26,26,24,0.15);
  --radius: 8px;
  --panel-radius: 24px;
}
```
Ritmo de sección: claro, claro, superficie, oscuro, claro, acento, pie de página oscuro. Líneas finas y tintes en lugar de cuadros y sombras.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```
- **Display:** Fraunces 300, opsz 144, clamp(44px, 6vw, 92px), altura de línea 1.0, espacio entre letras -0.02em
- **Cuerpo:** Inter 300, 16px, altura de línea 1.6
- **Metacapa:** IBM Plex Mono 400, 11px, mayúsculas, espacio entre letras 0.06em. Sólo horas, precios, días y etiquetas de índice.
- Como máximo una palabra en cursiva por título, en el color de acento.

## 5. Elemento de firma
**Una semana que completa.** Una cuadrícula de cinco columnas (de lunes a viernes) y diez filas (una por hora laboral), dibujada únicamente con líneas finas. Cuando la sección entra a la vista, las celdas que ocupa Margen se llenan con el color de acento con una opacidad del 18 por ciento, una por una, con 60 ms de diferencia, desde el lunes por la mañana en adelante. Un título mono los cuenta a medida que se llenan y determina el total.

Tono plano, sin brillo, sin íconos en las celdas. Muestra la oferta sin un solo adjetivo.

## 6. Secciones, cada una un esqueleto diferente

1. **Barra de navegación**: 72 px, papel, una línea fina debajo. Marca denominativa a la izquierda, tres enlaces a la derecha, una pastilla decorativa con un círculo de flecha redondo.
2. **Héroe, declaración**: sin fotografía. Una oración serif larga que comienza en un tercio del ancho, etiqueta mono "000/ Margen" en la columna de la izquierda, luego un párrafo corto y dos acciones. Altura mínima `clamp(480px, 70vh, 700px)`.
3. **La semana**: superficie. La cuadrícula de firma (sección 5) con un título mono.
4. **Lo que asumo, lista suiza**: ligero. Etiquetacolumna `001/ La obra`, cuatro nombres apilados de un tercio, cada uno con una descripción de una línea y una nota mono sobre cómo se entrega.
5. **Cómo funciona, filas numeradas**: claro. Cuatro filas en líneas finas con marcadores mono: primera semana, cada mañana, cada viernes, cada trimestre.
6. **A quién le conviene, índice**: superficie. Dos columnas regladas: conviene y no conviene. Honesto y breve.
7. **Retrato y letra**: fondo de tinta oscura, recuadro de 16 píxeles, `--panel-radius`. Un retrato cuadrado a la izquierda, tres breves párrafos a la derecha en papel color, firmado en cursiva. *Fotografía: una persona en un escritorio ordenado junto a una ventana con un cuaderno abierto, luz del día, calma.*
8. **Tasas, filas finas**: claro. Tres filas: horas al mes, qué cubre, precio. Precios alineados a la derecha en mono.
9. **Una cita**: luz. Una cita única centrada en Fraunces a 32 px con una línea de firma en mono.
10. **Inicio, panel decorativo**: fondo azul tinta, panel insertado. Una línea, dos acciones y una nota mono sobre la quincena de prueba.
11. **Pie de página**: tinta oscura. Marca denominativa gigante recortada `MARGIN`, correo electrónico, horario laboral, tres enlaces pequeños.

## 7. Motion
: la oración principal se desvanece 16 px una vez, 0,9 s.
: la cuadrícula semanal se completa como se describe, una vez.
: las filas se desvanecen con 0,05 s stagger.
- Colocar el cursor: los círculos de flecha se deslizan 4px, los enlaces se subrayan desde la izquierda.
- Facilita `cubic-bezier(.22,1,.36,1)`, respeta `prefers-reduced-motion`.

## 8. Responsive
- **Móvil de menos de 768px:** frase de héroe en 40px, alineado al margen izquierdo. La cuadrícula de la semana se convierte en cinco filas y diez columnas con el título debajo. Pila de columnas de índice. El retrato se encuentra encima de la letra. Sin desplazamiento de página horizontal.
- **Tableta:** cuadrícula sin cambios, índice de dos columnas.
- **Escritorio:** ancho máximo de contenido 1200 px, canales 40 px, relleno de sección 110 px.

## 9. Copia completa

**Marca denominativa:** MARGEN. Meta: `UN ASISTENTE. SEIS CLIENTES. NO AGENCIA.`

**Nav:** El trabajo, Tarifas, Acerca de. Botón: `Reservar una llamada`

**Hero** (etiqueta `000/ Margen`)
- Frase: `Le devuelvo a los fundadores las *once* horas a la semana que dedican a cosas para las que nadie los contrató.`
-Párrafo: `Soy Ilona. Trabajo con seis empresas a la vez, en su mayoría fundadores de cinco a veinte personas, y hago las tareas administrativas que les comen tranquilamente la semana. Bandeja de entrada, agenda, facturas, viajes, proveedores.`
- Acciones: `Reservar una llamada`, `Ver lo que asumo`

**La semana**: caption: `Una semana típica de un cliente. Las celdas llenas son mías. Once horas, cada semana, a partir del segundo lunes.`

**Lo que asumo** (etiqueta `001/ El trabajo`)
- **Bandeja de entrada y diario.** `Leo todo, respondo lo que puedo y te dejo una lista de seis cosas que realmente te necesitan.` `ENTREGA: INBOX Y CALENDARIO COMPARTIDO`
- **Facturas y persecuciones.** `Recaudadas a tiempo, perseguidas cortésmente, conciliadas antes de que tu contador te lo pida.` `ENTREGA: CONTABILIDAD INICIAR SESIÓN, LEER Y ESCRIBIR`
- **Viajes y logística.** `Vuelos, hoteles, visas, el taxi que realmente aparece. Itinerario en su calendario la noche anterior.` `ENTREGA: TARJETA EN ARCHIVO`
- **Proveedores y renovaciones.** `Contratos, cotizaciones, las suscripciones de software a las que nadie recuerda haberse registrado.` `ENTREGA: UNA CARPETA COMPARTIDA`

**Cómo se ejecuta** (etiqueta `002/ Ritmo`)
- `SEMANA UNO` **Lo mapeamos.** `Dos llamadas y un documento compartido. Escribo cómo te gusta que se hagan las cosas, para que solo lo digas una vez.`
- `TODAS LAS MAÑANAS` **Un mensaje.** `Lo que manejé, lo que te necesita, lo que viene. Antes de las nueve.`
- `CADA VIERNES` **Una breve nota.** `Lo que tomó más tiempo y una sugerencia para eliminarlo permanentemente.`
- `CADA TRIMESTRE` **Cortamos algo.** `Encontramos una tarea recurrente y la eliminamos en lugar de hacerlo más rápido.`

**A quién le conviene** (etiqueta `003/ Honesto`)
- Adecuado: `Fundadores de cinco a veinte personas`, `Cualquiera que conteste un correo electrónico a las once de la noche`, `Empresas con una sola persona haciendo tres trabajos`, `Personas que pueden entregar una contraseña sin pestañear`
- No conviene: `Equipos que necesitan a alguien en la oficina`, `Trabajo que necesita un teléfono contestado en vivo todo el día`, `Cualquiera que quiera un contable, Trabajo con el tuyo`, `Proyectos sin toma de decisiones`

**Retrato y carta**
`Estuve nueve años como asistente ejecutiva en dos despachos de abogados y uno muyagencia caótica. El caos me enseñó más.`
`Trabajo con seis clientes porque ese es el número donde todavía sé lo que está pasando en cada uno de ellos. Cuando alguien se va, tomo uno más. No tengo un equipo y no estoy formando uno.`
`Todo lo que hago está escrito en su propio documento compartido, por lo que si estoy enfermo o de vacaciones, otra persona podría recogerlo y usted apenas se dará cuenta.`
Firma: *Ilona Reyes*

**Tarifas** (etiqueta `004/ Tarifas`)
- `20 horas al mes` ... `Bandeja de entrada, agenda y facturas` ... `640 GBP`
- `40 horas al mes` ... `Lo anterior más viajes, proveedores y renovaciones` ... `1.180 GBP`
- `Proyecto, puntual` ... `Una mudanza, un lanzamiento, una ronda de financiación` ... `42 GBP por hora`
Mono: `Sin tarifa de instalación. Aviso de un mes, en ambos sentidos.`

**Cita:** `Dejé de abrir mi computadora portátil después de cenar. Esa es la reseña completa.`
Firma: `Marek D, fundador de un estudio de once personas`

**Panel de inicio**
- Línea: `La primera quincena es gratuita, en ambos sentidos.`
- Acciones: `Reservar una llamada`, `Envíeme un correo electrónico primero`
- Mono: `SI NO FUNCIONA DESPUÉS DE DOS SEMANAS, NOS DAMOS LA MANO Y PARAMOS.`

**Pie de página**
`MARGIN`, `ilona@margin.work`, `De lunes a viernes, de 8:00 a 16:00 hora del Reino Unido`, enlaces `El trabajo`, `Tarifas`, `Privacidad`

## 10. Nunca
Glassmorfismo, degradados, brillo, tarjetas sombreadas, cuadrículas de íconos, emoji, sopa de estadísticas, lorem ipsum, guiones de cualquier tipo en la copia, más de dos fuentes más la capa meta mono, héroes `100vh`, rayas idénticas.

## 11. Dependencias
```json
{ "motion": "^12.0.0", "lucide-react": "^0.460.0", "clsx": "^2.1.0" }
```
