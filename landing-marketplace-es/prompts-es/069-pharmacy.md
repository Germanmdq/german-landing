# Harborside Pharmacy — Aviso del sitio web de una farmacia independiente

## 1. Declaración de objetivos
Crear un sitio web de farmacia independiente, tranquilo y dirigido por servicios para **Harbourside Pharmacy**, definido por un color blanco limpio, menta suave y una clara división entre las tres cosas que la gente realmente busca: recetas, vacunas y hacerle una pregunta al farmacéutico sin reservar una cita. doctor.

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(190, 22%, 16%);     /* #1f3033 */
  --primary: hsl(168, 44%, 36%);        /* #34846f mint green */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(190, 8%, 46%);
  --border: hsl(180, 16%, 90%);
  --card: hsl(170, 34%, 96%);           /* pale mint wash */
  --accent-coral: hsl(8, 74%, 62%);     /* urgent / flu clinic */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Outfit 700, clamp(36px, 4.4vw, 60px), espacio entre letras -0.02em
- **H2:** Outfit 600, 30–42px
- **H3:** Outfit 500, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.75
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.16em, 11px, mint
- **Horario de apertura / teléfono:** Outfit 600, tabular-nums

## 5. Efectos visuales

**Efecto 1: píldora de estado abierto/cerrado en vivo.** Una píldora en la barra de navegación que calcula a partir de la hora actual y el objeto de horario de apertura, que muestra un punto verde y "Abierto hasta las 6:30 p.m." o un punto ámbar y "Cerrado: abre a las 9 a.m. mañana`.

```tsx
const now = new Date();
const today = hours[now.getDay()];
const open = today && now >= today.from && now < today.to;

<span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
      style={{ borderColor: 'var(--border)' }}>
  <span className="h-2 w-2 rounded-full animate-pulse"
        style={{ background: open ? 'var(--primary)' : 'var(--accent-coral)' }} />
  {open ? `Open until ${today.label}` : 'Closed — opens 9am tomorrow'}
</span>
```

**Efecto 2: selector de servicio de tres rutas.** Directamente debajo del héroe, tres tarjetas grandes: repetir receta, reservar una vacuna, preguntar a un farmacéutico, cada una con un ícono en un círculo de menta y una regla inferior que se amplía al pasar el mouse.

## 6. Componente Desglose

1. **Barra de navegación**: 74 px, adhesiva, blanca con borde inferior de 1 px. Marca izquierda más marca denominativa, enlaces centrales, píldora de estado en vivo y botón nuevo "Solicitar receta repetida" a la derecha.
2. **Héroe**: dividido, texto a la izquierda en las columnas 1 a 6, imagen a la derecha. Ceja, H1, sublínea, dos CTA, franja de confianza. *Imagen: interior luminoso y moderno del mostrador de la farmacia, estanterías limpias, luz natural suave, calma y orden.*
3. **Selector de tres rutas**: el bloque de conversión principal (Efecto 2).
4. **Cuadrícula de servicios** — Tarjetas 2x4: recetas del NHS, recetas privadas, vacunas, controles de presión arterial, revisiones de medicamentos, salud en viajes, dolencias menores, entrega.
5. **Clínicas de vacunación** — banda color menta pálida con una tabla declínicas, precio y quién es elegible de forma gratuita, además de una reserva CTA.
6. **Conozca a los farmacéuticos**: 3 tarjetas con retratos, nombre, número de registro y una especialidad de una frase. *Imagen: farmacéutico amigable con bata blanca detrás de un mostrador, expresión cálida y accesible, antecedentes clínicos.*
7. **Explicación repetida sobre recetas**: cuatro pasos numerados desde la solicitud hasta el cobro, con respuesta esperada.
8. **Entrega**: área de cobertura, umbral gratuito y horas límite.
9. **Consejos de salud**: tres tarjetas de artículos breves, cada una de las cuales responde a una pregunta común.
10. **Ubicación y horario**: tabla de la semana completa, notas de estacionamiento y accesibilidad, mapa.
11. **Pie de página**: pizarra profunda, cuatro columnas, registro GPhC, nombre del farmacéutico superintendente, enlace al procedimiento de quejas.

## 7. Animaciones
- Punto de píldora de estado: pulso suave de opacidad de 2 s
- Héroe: el texto se desvanece 0,7 s; la imagen se revela con un barrido `clipPath` desde la derecha, 1s
- Tarjetas de ruta: regla inferior `scaleX 0 → 1` al pasar el mouse, 0,35 s; la tarjeta se levanta `-4px`
- Tarjetas de servicio: escalonadas `i * 0.06`, `y: 20 → 0`
- Filas de la mesa clínica: se desvanecen escalonadas 0.04s
- Tarjetas de farmacéutico: escalonadas 0.1s
- Pasos: círculos numerados pop `scale 0.85 → 1` escalonado 0.12s
- Nada rebota: este es un sitio de atención médica

## 8. Responsive
- **Móvil (<768px):** hamburguesa; la píldora de estado se mueve debajo de la marca denominativa; la imagen principal se acumula encima del texto; el selector de ruta se convierte en tres tarjetas de ancho completo; servicios 1-col; la mesa de la clínica se convierte en cartas apiladas; `Solicitar receta repetida` fijado como una barra inferior adhesiva.
- **Tableta:** servicios 2 columnas, farmacéuticos 2 columnas, héroe permanece dividido.
- **Escritorio:** ancho máximo 1160 px, `px-16`, `py-24`.

## 9. Completo Copia

**Marca:** HARBORSIDE PHARMACY · Whitstable, Kent

**Navbar:** Servicios · Vacunas · Recetas · Nuestro equipo · Encuéntrenos · [Botón] Solicitar Repetir receta

**Hero**
- Ceja: `WHITSTABLE · INDEPENDIENTE DESDE 1974 · NHS & PRIVATE`
- H1: `Su farmacéutico tiene tiempo para responder eso.`
- Sublínea:`Farmacia comunitaria independiente en Harbor Street. Recetas repetidas listas en 48 horas, vacunas sin cita previa y asesoramiento gratuito de alguien que no está mirando un reloj de diez minutos.`
- CTA: `Solicitar receta médica repetida` · `Reservar una vacuna`
- Tira de confianza: `GPhC registrado #1029844` · `Contratado por NHS` · `Entrega local gratuita` · `Abierto Sábados`

**Tres rutas**
1. **Repetición de prescripción** — Ordene en línea, nosotros nos encargamos de la cirugía. Listo en 48 horas.
2. **Reserve una vacuna**: gripe, viajes, culebrilla y actualización infantil. Se admiten visitas sin cita previa.
3. **Pregunte a un farmacéutico** — Gratis, confidencial, sin cita previa. La mayoría de los días no esperará.

**Servicios** — `Recetas del NHS` · `Recetas privadas` · `Vacunas` · `Controles de presión arterial` · `Revisiones de uso de medicamentos` · `Clínica de salud para viajes` · `Servicio para dolencias menores` · `Entrega local gratuita`

**Clínicas de vacunación**
- `Gripe` — £18, gratis si es elegible en el NHS — Sin cita previa, de octubre a enero
- `Covid booster` — Gratis si es elegible — Con cita previa, estacional
- `Hingles` — £220 para el curso de dos dosis — Con cita previa
- `Paquete de viaje` — Desde £45 dependiendo del destino — Cita, espere seis semanas antes travel
- `Ponerse al día con la infancia` — Gratis — Con cita previa

**Farmacéuticos**
1. **Nadia Rahman, MPharm** — Superintendente farmacéutica · GPhC 2078441 — Prescriptor independiente con especial interés en el cuidado respiratorio y la técnica de inhalación.
2. **Tom Osei, MPharm** — Farmacéutico · GPhC 2103562 — Dirige la clínica de salud para viajes y el servicio de revisión de medicamentos.
3. **Grace Fenton, MPharm** — Farmacéutica · GPhC 2145209 — Se centra en el cuidado de personas mayores, blísteres y coordinación con residencias de ancianos locales.

**Recetas repetidas**
1. **Solicitud**: haga su pedido en línea, por teléfono o envíe el comprobante. Tarda aproximadamente un minuto.
2. **Nos ponemos en contacto con la cirugía** — No es necesario. Este es el paso que a la mayoría de la gente le resulta molesto, así que lo hacemos.
3. **Dispensamos**: generalmente dentro de las 48 horas. Le enviaremos un mensaje de texto cuando esté listo.
4. **Recoger o tenerloentregado**: entrega gratuita dentro de las tres millas, el mismo día si se realiza el pedido antes de las 11 a. m. 

**Entrega**: `Gratis dentro de las tres millas de Harbor Street. El mismo día si se realiza el pedido antes de las 11 a. m., al día siguiente. Realizamos entregas en CT5 y partes de CT2.`

**Consejos de salud** — `¿Realmente necesito antibióticos para esto?` · `Cómo usar un inhalador correctamente, en noventa segundos` · `Qué llevar en un botiquín de primeros auxilios de viaje`

**Horario** — Lunes a viernes de 9:00 a 18:30 · Sábados de 9:00 a 13:00 · Dom cerrado · Cerrado para el almuerzo 13:00–13:30

**Pie de página** — HARBORSIDE PHARMACY · `42 Harbor Street, Whitstable, Kent CT5 1AQ` · `01227 555 0118` · Superintendente farmacéutica: Nadia Rahman, GPhC 2078441 · Registro de locales 1029844 · Quejas procedimiento · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
