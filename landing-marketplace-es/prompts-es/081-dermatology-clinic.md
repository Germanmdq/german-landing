# Clearview Dermatology — Aviso del sitio web de la clínica de dermatología

## 1. Declaración de objetivos
Crear un sitio web de dermatología tranquilo y clínicamente creíble para **Clearview Dermatology**, definido por un blanco clínico, un azul verdoso suave y una clara división estructural entre dermatología médica y tratamientos cosméticos, de modo que un paciente con un lunar sospechoso y un paciente con un relleno de reserva lleguen al lugar correcto dentro de uno. scroll.

---

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño: Colores

```css
:root {
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(200, 20%, 16%);       /* #212e33 */
  --primary: hsl(186, 44%, 34%);          /* #30797d blue-green */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(200, 8%, 47%);
  --border: hsl(195, 18%, 90%);
  --card: hsl(190, 34%, 97%);             /* faint clinical wash */
  --medical: hsl(200, 52%, 38%);          /* medical-side accent */
  --cosmetic: hsl(338, 34%, 56%);         /* cosmetic-side accent */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- **H1 / hero:** `'Newsreader', serif;` peso 400, clamp(36px, 4.6vw, 62px), altura de línea: 1.12
- **H2:** Lector de noticias 400, 30–42px
- **H3 / nombres de tratamiento:** Inter 600, 17–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea: 1.78
- **Cejas:** Inter 600, mayúsculas, espacio entre letras: 0.16em, 11px
- **Credenciales/letra pequeña:** Inter 400, 13px, silenciado

---

## 5. Efectos visuales

### Efecto 1: Alternancia de ruta médica/cosmética
```tsx
const [track, setTrack] = useState<'medical' | 'cosmetic'>('medical');

<div className="inline-flex rounded-full border border-[var(--border)] p-1 bg-white">
  {(['medical','cosmetic'] as const).map(t => (
    <button
      key={t}
      onClick={() => setTrack(t)}
      className="relative rounded-full px-6 py-2.5 text-sm font-medium capitalize transition-colors duration-200"
      style={{ color: track === t ? '#fff' : 'var(--muted-foreground)' }}
    >
      {track === t && (
        <motion.span
          layoutId="track-pill"
          className="absolute inset-0 rounded-full"
          style={{ background: t === 'medical' ? 'var(--medical)' : 'var(--cosmetic)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10">{t} dermatology</span>
    </button>
  ))}
</div>
{/* Treatment grid below swaps with AnimatePresence keyed on `track` */}
```

### Efecto 2: Tarjeta de tratamiento con ampliable Detalle
```tsx
<div className="rounded-xl border border-[var(--border)] p-6 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(33,46,51,0.07)]">
  <div className="flex items-start justify-between gap-4">
    <h3 className="font-semibold text-lg">Skin Cancer Screening</h3>
    <span className="shrink-0 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider" style={{ background: 'var(--card)', color: 'var(--medical)' }}>
      Covered by insurance
    </span>
  </div>
  <p className="mt-3 text-[var(--muted-foreground)]">Full-body examination with dermoscopy…</p>
  <button className="mt-4 text-sm font-medium" style={{ color: 'var(--primary)' }}>
    What to expect ↓
  </button>
  {/* Expanded panel: height auto, 0.35s, lists duration, prep, downtime */}
</div>
```

### Efecto 3: desvanecimiento clínico suave (sin desenfoque; los sitios clínicos deben sentirse estables)
```
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
```

---

## 6. Componente Desglose

### Sección 1 — Navbar
- 76px, `sticky top-0 z-40`, blanco, borde inferior de 1px, sombra sutil después de `scrollY > 40`
- Izquierda: marca circular azul-verde simple + "CLEARVIEW" (Newsreader 500) + "DERMATOLOGÍA" (Inter 600, 9px)
- Centro: Médico · Cosmético · Nuestros proveedores · Información del paciente · Ubicaciones
- Derecha: número de teléfono (Inter 600, azul-verde) + `Reservar cita` (azul-verde, redondeado-completo)
- Móvil: marca + ícono de teléfono + hamburguesa

### Sección 2: Héroe (dividido, texto a la izquierda)
- `min-h-[78vh]`, 12 columnas: columnas de texto 1–6, columnas de imagen 7–12
- Ceja: `SEATTLE, WA · DERMATOLOGÍA CERTIFICADA POR LA JUNTA · ACEPTANDO NUEVA PATIENTS`
- H1: `Cuidado de la piel experto,\nsin el\nseis mesesespera.`
- Sublínea: `Dermatología médica y estética para adultos y niños. La mayoría de los pacientes nuevos son atendidos dentro de dos semanas y las revisiones de lesiones urgentes dentro de cinco días.`
- Fila CTA: `Reservar cita` (completada) + `Llame al (206) 555-0143` (esquema)
- Tira de confianza: `Certificado por la junta` · `Se aceptan la mayoría de los seguros` · `Ranuras urgentes para la misma semana` · `4.9 ★ de más de 800 reseñas`
```jsx
{/* Image: bright modern dermatology clinic interior, clean white and pale wood surfaces, soft natural window light, calm and uncluttered medical environment */}
<img src="" alt="Dermatology clinic interior" className="w-full h-full object-cover object-center rounded-l-3xl" />
```

### Sección 3: barra de aviso urgente
- `--card` fondo, delgado, centrado: icono + `¿Le preocupa un lunar o una mancha cambiante? Llámanos: tenemos espacios para controles de lesiones urgentes en la misma semana.` + enlace telefónico en línea

### Sección 4: dos pistas
- Ceja blanca, centrada `LO QUE TRATAMOS` + H2 `Dos tipos de visitas`
- **Alternancia de ruta** (Efecto 1) centrado debajo del encabezado
- Alternar a continuación: cuadrícula de 3 columnas de tarjetas de tratamiento (Efecto 2) que intercambia contenido entre médico y cosmético
- Las tarjetas médicas llevan una insignia de "Seguro"; las tarjetas cosméticas llevan una insignia de "pago por cuenta propia" con un precio inicial

### Sección 5: Condiciones que tratamos
- `--card`, `CONDICIONES` de cejas + H2 `Razones comunes por las que acuden los pacientes`
- Cuadrícula de chips de 4 columnas de 20 condiciones como enlaces de píldoras (acné, eccema, psoriasis, rosácea, melanoma...)
- Cada pastilla: fondo blanco, borde de 1 px, relleno azul verdoso

### Sección 6 — Proveedores
- Blanco, ceja `SU EQUIPO DE ATENCIÓN` + H2 `Proveedores certificados`
- 3-col grid
```jsx
{/* Image: physician portrait in white coat, warm approachable expression, soft neutral clinical background, professional medical photography */}
<img src="" alt="Board-certified dermatologist portrait" className="w-full aspect-[4/5] object-cover object-center rounded-2xl" />
```
- Cada uno: nombre + credenciales (MD, FAAD), línea de especialidad en azul-verde, biografía de 2 oraciones, `Perfil completo →`

### Sección 7: Qué esperar
- `--card`, línea de tiempo horizontal de 4 pasos con conexión hairline
- Pasos: Reservar · Antes de su visita · Durante el examen · Después
- Cada uno: círculo numerado, título, descripción de 2 oraciones

### Sección 8 — Seguros y facturación
- Blanco, 2 columnas: H2 izquierdo `Seguros y costos` + párrafo honesto + lista de planes aceptados en dos columnas; a la derecha una tarjeta con bordes con notas de precios de pago por cuenta propia y un botón "Solicitar una estimación de costos"

### Sección 9: Reseñas de pacientes
- `--card`, 3tarjetas de revisión con fila de 5 estrellas, cita, nombre + inicial del apellido y una pequeña línea de "Paciente verificado"

### Sección 10: Ubicaciones
- Blanco, 2 columnas: dejó dos tarjetas de ubicación (dirección, horario, nota de estacionamiento, teléfono, "Direcciones →`); imagen del mapa derecho
```jsx
{/* Image: clean minimal city map view with two marked locations, muted palette, cartographic style */}
```

### Sección 11 — Preguntas frecuentes
- Acordeón centrado, max-w-3xl, 6 preguntas

### Sección 12 — Final CTA
- Banda azul-verde con sangrado completo: H2 `Obtén tu piel mirada.` + línea corta + CTA blanca + teléfono

### Sección 13 — Pie de página
- Pizarra profunda, texto blanco, 4 columnas: marca + eslogan / Médico / Cosmético / Contacto + ubicaciones
- Franja inferior: línea ©, Política de privacidad, Aviso de prácticas de privacidad (HIPAA), Declaración de accesibilidad
- Descargo de responsabilidad médica: `Este sitio web es sólo para información general y no constituye consejo médico. Si tiene una emergencia médica, llame al 911.`

---

## 7. Animaciones

- **Héroe:** H1 se desvanece 0,7 s; la imagen se revela con un barrido `clipPath` de 1.1 s desde la derecha; la tira de confianza se tambalea 0.06s
- **Alternancia de pista:** la pastilla `layoutId` se desliza entre las opciones con un resorte (rigidez 380, amortiguación 32) y cambia de color
- **Rejilla de tratamiento:** `AnimatePresence mode="wait"` en cambio de pista, `opacity 0→1, y 12→0`, 0.32s
- **Tarjetas de tratamiento:** el desplazamiento levanta una sombra suave durante 0.3s; el panel expandible anima la altura automáticamente en 0,35 s
- **Píldoras de condición:** escalonado `i * 0,02`; pasar el cursor rellena el fondo e invierte el texto, 0,2 s
- **Tarjetas de proveedor:** desvanecimiento escalonado 0,1 s
- **Línea de tiempo:** conexión de escalas finas desde la izquierda 0,8 s, círculos de paso pop `scale 0.8 → 1` escalonado 0,12 s
- Todo el movimiento es deliberadamente tranquilo, no paralaje, sin rebote, nada que parezca divertido en un sitio médico

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca + icono de teléfono de toque para llamar + hamburguesa; `Reservar cita` fijado como una barra adhesiva de ancho completo en la parte inferior de la ventana gráfica
- Hero: la imagen se mueve sobre el texto, `redondeado-3xl`, `aspecto-[4/3]`; H1 se fija a 36px; CTA apilados
- Tira de confianza: cuadrícula 2x2
-Alternancia de seguimiento: ancho completo, dos mitades iguales
- Tarjetas de tratamiento: 1 columna
- Píldoras de condición: envoltura de 2 columnas
- Proveedores: 1 columna
- Línea de tiempo: vertical con regla de conexión del lado izquierdo
- Seguro: la lista de planes se convierte en una sola columna
- Ubicaciones: pila de tarjetas sobre el mapa

### Tableta (768–1024px)
- El héroe permanece dividido · tratamientos 2-col · proveedores 2-col con tercer centrado · condiciones 3-col

### Escritorio (> 1024px)
- Ancho máximo 1200px, secciones `px-16`, `py-24`

---

## 9. Copia completa

### Marca
**CLEARVIEW DERMATOLOGY** — Seattle, Washington

### Navbar
Medical · Cosmético · Nuestros proveedores · Información del paciente · Ubicaciones · `(206) 555-0143` · [Botón] Reservar cita

### Hero
- Ceja: `SEATTLE, WA · BOARD-CERTIFIED DERMATOLOGÍA · ACEPCIÓN DE NUEVOS PACIENTES`
- H1: `Cuidado experto de la piel, sin esperas de seis meses.`
- Sublínea: `Dermatología médica y cosmética para adultos y niños. La mayoría de los pacientes nuevos son atendidos dentro de dos semanas, y los controles de lesiones urgentes dentro de cinco días.`
- CTA 1: `Reservar cita` · CTA 2: `Llame al (206) 555-0143`
- Tira de confianza: `Certificado por la junta` · `Se aceptan la mayoría de los seguros` · `Ranuras urgentes para la misma semana` · `4.9 ★ de más de 800 reseñas`

### Barra urgente
`¿Le preocupa un lunar o una mancha cambiante? Llámenos: tenemos espacios para controles de lesiones urgentes en la misma semana.`

### Medical Track
1. **Examen de cáncer de piel** · *Cubierto por el seguro*: examen de cuerpo completo con dermatoscopia, realizado por un dermatólogo certificado. Cualquier cosa sospechosa se fotografía, se mide y se le realiza una biopsia ese día o se programa un seguimiento minucioso.
2. **Eliminación de lunares y lesiones** · *Cubierto por el seguro*: afeitado, punzonado o extirpación por escisión con anestesia local, generalmente en una sola visita. El tejido va a un laboratorio de dermatopatología y los resultados llegan en cinco a siete días.
3. **Tratamiento del acné** · *Cubierto por el seguro* — Terapia tópica y oral, manejo hormonal e isotretinoína para casos severos, con el seguimiento que requiera. Tratamos las cicatricescomo una conversación separada una vez controlado el acné.
4. **Eccema y psoriasis** · *Cubierto por el seguro*: regímenes tópicos, fototerapia y terapia biológica para enfermedades de moderadas a graves. Los trámites de autorización previa los gestionamos internamente.
5. **Manejo de la rosácea** · *Cubierto por el seguro*: identificación de desencadenantes, terapia tópica y oral, y láser vascular para el enrojecimiento persistente.
6. **Dermatología pediátrica** · *Cubierto por el seguro*: marcas de nacimiento, verrugas, moluscos, dermatitis atópica y cualquier cosa sobre la que un padre preocupado quiera una segunda opinión. Las citas duran más por diseño.

### Cosmetic Track
1. **Toxina Botulínica** · *Desde $12 por unidad* — Frente, glabela y patas de gallo, inyectadas por un médico en lugar de por delegación. Los resultados aparecen en tres a siete días y duran de tres a cuatro meses.
2. **Relleno dérmico** · *Desde $700 por jeringa*: zona media del rostro, nasolabiales, labios y mandíbula con rellenos de ácido hialurónico. Somos conservadores por defecto y preferimos hacer una segunda sesión que sobrellenar.
3. **Resurfacing con láser** · *Desde $900 por sesión*: Láser fraccionado para textura, daño solar y cicatrices de acné. Espere de tres a siete días de curación visible.
4. **Exfoliaciones químicas** · *Desde $250*: exfoliaciones superficiales a de profundidad media para pigmentación, falta de brillo y congestión. Mínimo tiempo de inactividad en profundidades superficiales.
5. **Microagujas con PRP** · *Desde $650*: inducción de colágeno para cicatrices y textura, con plasma rico en plaquetas extraído el día.
6. **Láser vascular y pigmentario** · *Desde $400 por sesión* — Capilares rotos, manchas solares y enrojecimiento facial persistente.

### Condiciones
Ecejas: `CONDICIONES` — H2: `Razones comunes por las que acuden los pacientes`
`Acné` · `Eczema` · `Psoriasis` · `Rosácea` · `Melanoma` · `Carcinoma basocelular` · `Lunares` · `Verrugas` · `Pérdida de cabello` · `Hiperhidrosis` · `Vitíligo` · `Culebrillas` · `Quistes` · `Queratosis` · `Trastornos de las uñas` · `Erupciones cutáneas` · `Urticaria` · `Daño solar` · `Cicatrices` · `Melasma`

### Proveedores
Eceja: `SU EQUIPO DE ATENCIÓN` — H2: `Proveedores certificados`
1. **Dr. Naomi Hsu, MD, FAAD** —Dermatología médica y cáncer de piel: la Dra. Hsu completó su residencia en la Universidad de Washington y ha realizado más de 4000 exámenes de detección de cáncer de piel. Trata enfermedades inflamatorias complejas de la piel y dirige el programa de productos biológicos de la clínica.
2. **Dr. Adrian Bell, MD, FAAD** — Dermatología cosmética y láser — Adrian se capacitó en cirugía de Mohs antes de centrarse en el trabajo estético y con láser. Su enfoque es deliberadamente conservador: los pacientes normalmente se van con un plan más pequeño que el que tenían cuando llegaron.
3. **Dr. Priya Raman, MD, FAAD** — Dermatología pediátrica — Priya tiene doble certificación en pediatría y dermatología. Sus citas duran más de lo habitual porque cree que los padres preocupados merecen respuestas sin prisas.

### Qué esperar
Eceja: `SU VISITA` — H2: `Qué esperar`
1. **Reservar** — Solicite en línea o llame. Las visitas de pacientes nuevos son de 30 minutos; Cada semana se realizan controles de lesiones urgentes.
2. **Antes de su visita**: venga sin maquillaje si el problema es facial y quítese el esmalte de uñas si tiene problemas en las uñas. Traiga una lista de medicamentos actuales.
3. **Durante el examen**: para una revisión de cuerpo completo, se pondrá una bata y habrá un acompañante disponible a pedido. No se biopsia nada sin explicar primero el motivo.
4. **Después**: los resultados de patología llegan entre cinco y siete días y lo llamamos de cualquier manera, incluso cuando se trata de buenas noticias.

### Seguro
H2: `Seguro y costos`
Párrafo: `La dermatología médica se factura al seguro. Los tratamientos cosméticos se pagan por cuenta propia y se cotizan antes de reservar nada; nunca le sorprenderá una factura. Si un tratamiento se encuentra en un área gris, se lo informamos antes de realizarlo, no después.`
Aceptado: `Aetna` · `Blue Cross Blue Shield` · `Cigna` · `First Choice Health` · `Kaiser PPO` · `Medicare` · `Premera` · `Regence` · `UnitedHealthcare` · `Molina`

### Reseñas
1. `Durante dos años tuve una mancha en la espalda que otros dos médicos descartaron. El Dr. Hsu le hizo una biopsia en la misma visita. Fue un melanoma temprano. Se lo debo.` — **James P.** · Paciente verificado
2. `Pedí relleno en tres áreas y el Dr.Bell me convenció para que aceptara uno. Seis meses después, sigo pensando que fue la decisión correcta.` — **Anika S.** · Paciente verificado
3. `Mi hijo de cuatro años tiene miedo de los médicos. El Dr. Raman pasó diez minutos dejándolo mirar su equipo antes de que ella lo tocara.` — **Carla T.** · Paciente verificado

### Ubicaciones
1. **Centro de Seattle** — `1420 Fifth Avenue, Suite 800, Seattle, WA 98101` · De lunes a viernes de 8 a. m. a 5 p. m. · Estacionamiento en garaje validado
2. **Bellevue** — `310 108th Avenue NE, Suite 210, Bellevue, WA 98004` · Lunes a jueves de 8 a.m. a 6 p.m., viernes de 8 a.m. a 3 p.m. · Lote de superficie libre

### FAQ
1. **¿Qué tan pronto puedo recibir atención?** — Los nuevos pacientes médicos generalmente se programan dentro de dos semanas. Los controles de lesiones urgentes suelen realizarse en un plazo de cinco días; llame en lugar de reservar en línea para ellos.
2. **¿Aceptas mi seguro?** — Aceptamos la mayoría de los planes principales. Las visitas médicas se facturan al seguro; Los tratamientos cosméticos son de pago propio y siempre se cotizan por adelantado.
3. **¿Necesito una remisión?**: la mayoría de los planes no la requieren, pero algunos planes HMO sí. Consulta con tu aseguradora, o llámanos y te ayudaremos a averiguarlo.
4. **¿Qué sucede si encuentra algo preocupante?**: Le hacemos una biopsia, le explicamos exactamente lo que estamos buscando y lo llamamos para informarle los resultados dentro de una semana, ya sea que la noticia sea buena o mala.
5. **¿Puedo combinar una visita médica y cosmética?** — Sí, y es común. La parte médica se factura al seguro y la parte cosmética se factura por separado a la tarifa cotizada.
6. **¿Ves niños?** — Sí. El Dr. Raman tiene doble certificación en pediatría y dermatología, y las citas pediátricas se programan con tiempo adicional.

### Final CTA
H2: `Haga que le revisen la piel.`
Sublínea: `Dos semanas para una visita de rutina. Cinco días si algo está cambiando. Ambos son mejores que esperar y preguntarse.`
CTA: `Book Appointment` · Teléfono: `(206) 555-0143`

### Footer
- CLEARVIEW DERMATOLOGY · `Dermatología médica y cosmética en Seattle y Bellevue.`
- © 2026 Clearview Dermatología PLLC. Todos los derechos reservados.
- Política de Privacidad · Aviso de PrivacidadPrácticas · Declaración de accesibilidad
- Descargo de responsabilidad: `Este sitio web es solo para información general y no constituye asesoramiento médico. Si tiene una emergencia médica, llame al 911.`

---

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

**Tailwind config adiciones:**
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'cv-teal': '#30797d',
        'cv-medical': '#2e6f94',
        'cv-cosmetic': '#b96f8d',
      },
    },
  },
};
```
