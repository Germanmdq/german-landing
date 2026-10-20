# Práctica de campo: mensaje del sitio web de una clínica de médico de cabecera privada

## 1. Declaración de objetivos
Cree un sitio web de clínica de médico de cabecera privado, cálido y sin prisas para **Práctica de campo**, definido por hueso blando, un verde salvia apagado y una serifa humanista: un sitio médico que vende tiempo con un médico en lugar de una lista de afecciones.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(44, 26%, 96%);       /* #f8f5ee bone */
  --foreground: hsl(174, 18%, 16%);      /* #212f2d */
  --primary: hsl(158, 26%, 36%);         /* #43745f muted sage */
  --primary-foreground: hsl(44, 26%, 97%);
  --muted-foreground: hsl(174, 6%, 45%);
  --border: hsl(42, 16%, 87%);
  --card: hsl(44, 28%, 92%);
  --accent-urgent: hsl(18, 68%, 54%);    /* same-day slots */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Petrona:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
- **H1:** Petrona 500, clamp(36px, 4.4vw, 60px), altura de línea 1.14
- **H2:** Petrona 500, 30–42px
- **H3:** Inter 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.8
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.16em, 11px, sage
- **Duración/precios de las citas:** Petrona 600, tabular-nums

## 5. Visual Efectos

**Efecto 1: Comparación de la duración de la cita.** Una barra visual que compara una cita estándar del NHS con los tres tipos de citas de la clínica, dibujada como barras horizontales cuyos anchos se animan al desplazarse. La barra del NHS es deliberadamente corta, que es toda la propuesta.

```tsx
const slots = [
  { label: 'Typical NHS appointment', minutes: 10, muted: true },
  { label: 'Standard consultation',   minutes: 30 },
  { label: 'Extended consultation',   minutes: 45 },
  { label: 'Full health assessment',  minutes: 90 },
];
const max = 90;

{slots.map((s, i) => (
  <div key={s.label} className="mb-5">
    <div className="mb-1.5 flex justify-between text-sm">
      <span className={s.muted ? 'text-[var(--muted-foreground)]' : ''}>{s.label}</span>
      <span className="font-serif tabular-nums">{s.minutes} min</span>
    </div>
    <div className="h-2.5 rounded-full bg-[var(--card)]">
      <motion.div className="h-full rounded-full"
        style={{ background: s.muted ? 'var(--border)' : 'var(--primary)' }}
        initial={{ width: 0 }} whileInView={{ width: `${(s.minutes / max) * 100}%` }}
        viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  </div>
))}
```

**Efecto 2: franja de disponibilidad el mismo día.** Una banda delgada debajo del héroe muestra cuántas citas para el mismo día quedan hoy, con un pulso suave en el conteo y un punto naranja. Es el único elemento urgente en una página que de otro modo sería tranquila.

## 6. Desglose de componentes

1. **Barra de navegación**: 76 px, adhesivo, fondo óseo, borde inferior de 1 px. Marca denominativa a la izquierda, centro de enlaces, teléfono y botón sabio "Reservar una cita" a la derecha.
2. **Héroe**: dividido, texto a la izquierda, imagen a la derecha con un marco suave y redondeado. Ceja, serif H1, sublínea, dos CTA, cuatro puntos de confianza. *Imagen: interior cálido de una sala de consulta con escritorio, plantas y luz natural en las ventanas, tranquilo y doméstico más que clínico.*
3. **Tira del mismo día**: recuento de disponibilidad (Efecto 2).
4. **Duración de las citas**: la sección de propuesta (Efecto 1) con un breve párrafo sobre por qué el tiempo importa.
5. **Servicios** — Cuadrícula 2x4: consultas de médico de cabecera, evaluaciones de salud, análisis de sangre, vacunas, procedimientos menores, salud sexual, clínica de viajes, privadoreferencias.
6. **Nuestros médicos**: 3 tarjetas con retratos, nombre, número de GMC, especialidad y una biografía de dos frases. *Imagen: retrato de un médico a la luz suave del día, cálido y accesible, fondo neutro, sin bata blanca.*
7. **Precios**: una tabla sencilla de tipos de consultas, duración y tarifas, con una nota explícita de que no existe ningún requisito de membresía.
8. **Membresía**: dos planes anuales opcionales para familias e individuos, con lo que incluye cada uno.
9. **Qué esperar**: cuatro pasos desde la reserva hasta el seguimiento, incluido cómo se comunican los resultados.
10. **Pruebas y resultados**: tiempos de respuesta para análisis de sangre comunes, expresados ​​en días hábiles.
11. **Preguntas frecuentes**: acordeón, seis preguntas sobre referencias, seguros, recetas e interacción con el NHS.
12. **Visita**: dirección, horario, estacionamiento, acceso sin escalones y línea fuera de horario.
13. **Pie de página**: salvia profunda, cuatro columnas, registro CQC, números GMC, aviso de privacidad.

## 7. Animaciones
- Hero: el texto se desvanece 0,75 s; la imagen se revela con una opacidad suave y un aumento de 8 píxeles, 0,9 s
- Recuento de disponibilidad: pulso suave de 2,4 s solo en el punto naranja
- Barras de citas: el ancho anima 0,9 s con un escalonamiento de 0,12 s; la barra NHS se anima primero para que el contraste aterrice
- Tarjetas de servicio: escalonamiento gradual 0.07s
- Tarjetas de médico: tambaleo 0.1s, sin transformación de desplazamiento más allá de un subrayado sabio de 1px
- El movimiento es lento y tranquilo en todo momento; el sitio vende tranquilidad y debería sentirlo

## 8. Responsive
- **Móvil (<768px):** hamburguesa; pilas de imágenes encima del texto; H1 se fija a 36px; las barras de citas mantienen todo el ancho con las etiquetas arriba; servicios 1-col; la tabla de precios se convierte en filas apiladas; `Reservar una cita` fijado como una barra inferior adhesiva.
- **Tableta:** héroe dividido retenido, servicios 2 columnas, médicos 2 columnas con el tercero centrado.
- **Escritorio:** ancho máximo 1140px, `px-16`, `py-24`.

## 9. Completo Copia

**Marca:** PRÁCTICA DE CAMPO · Médico de cabecera privado · Baño

**Navbar:** Citas · Servicios · Nuestros Doctores · Precios · Membresía · Visita · `01225 555 0177` · [Botón]Reserve una cita

**Hero**
- Ceja: `BAÑO · GP PRIVADO · CQC REGISTRADO · NO SE REQUIERE MEMBRESÍA`
- H1: `Treinta minutos con un médico que ha leído sus notas.`
- Sublínea: `Una pequeña consulta de médico de cabecera privada en Great Pulteney Calle. Citas el mismo día, treinta minutos como estándar y el mismo médico cada vez si lo desea.`
- CTA: `Reservar una cita` · `Ver precios`
- Puntos de confianza: `CQC registrado` · `Cosas para el mismo día diariamente` · `No se necesita membresía` · `Resultados dentro de las 48 horas`

**El mismo día strip:** `Hoy quedan cuatro citas para el mismo día · Llame al 01225 555 0177 o reserve en línea`

**Duración de las citas** — Ceja `POR QUÉ SOMOS DIFERENTES` — H2 `Diez minutos no es suficiente y todo el mundo lo sabe`
`La cita promedio con el médico de cabecera del NHS es de diez minutos, lo que apenas es suficiente para describir un problema, y mucho menos examinarlo y discutir qué hacer. Nuestra consulta estándar es de treinta. Es la única razón por la que la mayoría de nuestros pacientes vinieron y la razón por la que la mayoría de ellos se quedan.`

**Servicios**
1. **Consultas con el médico de cabecera**: treinta minutos como estándar, en persona o por video. Citas para el mismo día abiertas todos los días de la semana.
2. **Evaluaciones de salud**: evaluación completa de noventa minutos con análisis de sangre, ECG, espirometría y un informe escrito que usted conserva.
3. **Análisis de sangre**: se tomaron más de doscientos paneles en el sitio, la mayoría de los resultados se obtuvieron en cuarenta y ocho horas.
4. **Vacunas**: viajes, gripe, culebrilla, VPH y puesta al día infantil, administradas el mismo día cuando las existencias lo permitan.
5. **Procedimientos menores**: extirpación de lunares y quistes, inyecciones en articulaciones, irrigación de oídos y cuidado de heridas con anestesia local.
6. **Salud sexual**: detección y tratamiento confidenciales, resultados de varias pruebas el mismo día, no se necesita derivación.
7. **Clínica de viajes** — Evaluación de riesgos en el destino, vacunas y antimaláricos. Reserve seis semanas antes de viajar, siempre que sea posible.
8. **Referencias privadas**: referencia directa a consultores e imágenes, generalmente dentro de una semana, con sus notas enviadas con anticipación.

**Nuestros médicos**
1. **Dr. Helen Fielding, MBBS MRCGP** — GMC 4128866— Fundó la práctica en 2014 después de quince años en la práctica general del NHS. Especial interés en la salud de la mujer y la menopausia.
2. **Dr. Samuel Adeyemi, MBBS MRCGP** - GMC 6203411 - Doce años como médico de cabecera asociado y ex registrador de medicina de emergencia. Maneja la mayor parte de la lista de cirugía menor.
3. **Dr. Priya Nair, MBBS MRCGP DRCOG** - GMC 7188034 - Especial interés en pediatría y medicina de viajes. Atiende a niños desde el nacimiento en adelante.

**Precio** — Ceja `PRECIO` — H2 `No se requiere membresía`
| Cita | Duración | Tarifa |
|---|---|---|
| Consulta estándar | 30 minutos | 110€ |
| Consulta ampliada | 45 minutos | 150€ |
| Vídeo consulta | 20 minutos | 75€ |
| Evaluación de salud completa | 90 minutos | 395€ |
| Procedimiento menor | 30–45 minutos | Desde £250 |
| Análisis de sangre, básico | — | Desde £ 85 |
| Consulta de viaje | 30 minutos | £95 más vacunas |

Nota: `No es necesario ser miembro para reservar. La membresía existe porque algunas familias prefieren un costo anual fijo, no porque bloqueemos las citas detrás de ella.`

**Membresía**
- **Individual — £480 al año** — Cuatro consultas estándar incluidas · Videoconsultas ilimitadas · Reserva prioritaria el mismo día · Diez por ciento de descuento en pruebas y procedimientos
- **Familia — £1,150 al año** — Dos adultos y hasta tres niños · Ocho consultas estándar incluidas · Videoconsultas ilimitadas · Reserva prioritaria para todos los miembros · Quince por ciento de descuento en pruebas y procedimientos

**Qué esperar**
1. **Reservar** — En línea o por teléfono. Los espacios para el mismo día se mantienen abiertos hasta las 2:00 p. m. todos los días de la semana.
2. **Antes de venir**: traiga una lista de medicamentos y los resultados de pruebas recientes. Diez minutos de preparación ahorran la mitad de la cita.
3. **Tu cita** — Treinta minutos, sin prisas, con exploración si es necesario. No se apresurará a sacar una conclusión.
4. **Después**: un resumen escrito en su portal para pacientes el mismo día, los resultados dentro de las cuarenta y ocho horas y una llamada de su médico.way.

**Pruebas y resultados** — `Conteo sanguíneo completo, 24 horas` · `Función hepática y renal, 24 horas` · `Panel de tiroides, 48 horas` · `HbA1c y lípidos, 48 horas` · `Vitamina D y B12, 3 días hábiles` · `Paneles hormonales, 3–5 días hábiles días`

**Preguntas frecuentes**
1. **¿Necesito estar registrado con un médico de cabecera del NHS?** — No, pero recomendamos permanecer registrado. Trabajamos junto con la atención del NHS en lugar de reemplazarla, y le escribimos a su médico de cabecera del NHS con su consentimiento.
2. **¿Tiene seguro?** — Muchos pacientes reclaman consultas posteriores a través de su póliza. Proporcionamos recibos detallados con códigos, pero le facturamos directamente a usted y no a la aseguradora.
3. **¿Puedes recetar?** — Sí. Las recetas privadas se emiten en la cita y se pueden dispensar en cualquier farmacia.
4. **¿Puedo consultar al mismo médico cada vez?** — Sí, y la mayoría de los pacientes lo hacen. Elija su médico al realizar la reserva y mantendremos continuidad siempre que la agenda lo permita.
5. **¿Ves niños?** — Sí, desde que nacen. El Dr. Nair tiene un interés especial en pediatría y las citas para niños duran los mismos treinta minutos.
6. **¿Qué pasa fuera de horario?** — Los miembros tienen una línea fuera de horario. Para cualquier cosa urgente fuera de nuestro horario, llame al 111 y para una emergencia llame al 999.

**Visita** — `18 Great Pulteney Street, Bath BA2 4BT` · Lunes a viernes de 8:00 a 19:00 · Sábados de 9:00 a 13:00 · Dom cerrado
`Pague y exhiba en Great Pulteney Street y entrada sin escalones en el lado derecho del edificio.`

**Pie de página** — PRÁCTICA DE CAMPO · `Atención médica privada en Bath desde 2014` · `01225 555 0177` · Proveedor registrado en CQC 1-8842019 · Aviso de privacidad · © 2026
Descargo de responsabilidad: `Este sitio web proporciona información general y no constituye consejo médico. En caso de emergencia llame al 999.`

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
