# Grace Commons — Aviso del sitio web de la iglesia

## 1. Declaración de objetivos
Crear un sitio web de la iglesia cálido y genuinamente acogedor para **Grace Commons**, definido por piedra suave, oro apagado y una serifa humanista abierta, diseñado en torno a las dos preguntas que realmente tiene un visitante por primera vez (cuándo se reunirán y cómo será) en lugar de alrededor del ministerio interno. estructura.

---

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño - Colores

```css
:root {
  --background: hsl(36, 30%, 96%);       /* #f8f4ee warm stone */
  --foreground: hsl(24, 16%, 17%);       /* #2e2823 warm near-black */
  --primary: hsl(28, 34%, 38%);          /* #7d5c40 clay brown */
  --primary-foreground: hsl(36, 30%, 97%);
  --muted-foreground: hsl(24, 8%, 45%);
  --border: hsl(34, 18%, 86%);
  --card: hsl(36, 32%, 92%);
  --accent-gold: hsl(40, 52%, 56%);      /* muted gold */
  --deep: hsl(24, 22%, 20%);             /* dark band sections */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Karla:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- **H1 / hero:** `'Lora', serif;` peso 500, clamp(36px, 4.8vw, 64px), altura de línea: 1.14
- **H2:** Lora 500, 30–42px
- **H3:** Karla 600, 18–21px
- **Cuerpo:** `'Karla', sans-serif;` peso 300–400, 17 px, altura de línea: 1,8
- **Cejas:** Karla 600, mayúsculas, espacio entre letras: 0,18 em, 11 px, arcilla
- **Tiempos de servicio (grande):** Lora 600, números tabulares, 40–56px
- **Citas de las Escrituras:** Lora cursiva 400, 22–26px

---

## 5. Efectos visuales

### Efecto 1: Tarjeta de tiempos de servicio (el más importante elemento)
```jsx
<div className="rounded-2xl border-2 p-8 text-center" style={{ borderColor: 'var(--accent-gold)', background: 'var(--card)' }}>
  <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--primary)]">This Sunday</span>
  <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
    {['9:00 AM', '11:00 AM'].map(t => (
      <div key={t}>
        <div className="font-serif text-5xl tabular-nums">{t}</div>
        <div className="mt-1 text-sm text-[var(--muted-foreground)]">Identical services</div>
      </div>
    ))}
  </div>
  <p className="mt-6 text-[var(--muted-foreground)]">
    1420 Ashland Avenue · Kids programming at both services · Coffee from 8:30
  </p>
</div>
```

### Efecto 2: Tarjeta de sermón con reproductor de audio en línea
```tsx
<div className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-white/60 p-5">
  <button
    onClick={togglePlay}
    className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-transform duration-200 hover:scale-105"
    style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
    aria-label={playing ? 'Pause sermon' : 'Play sermon'}
  >
    {playing ? <Pause size={18} /> : <Play size={18} />}
  </button>
  <div className="min-w-0">
    <div className="font-semibold truncate">When Waiting Is the Work</div>
    <div className="text-sm text-[var(--muted-foreground)]">Pastor Dana Whitfield · Feb 2 · 34 min</div>
    {/* Thin gold progress bar animates width with audio currentTime */}
    <div className="mt-2 h-[3px] w-full rounded-full bg-[var(--border)]">
      <div className="h-full rounded-full transition-[width] duration-200" style={{ width: `${pct}%`, background: 'var(--accent-gold)' }} />
    </div>
  </div>
</div>
```

### Efecto 3: Suave Fade-Up
```
initial={{ opacity: 0, y: 22 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.72, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
```

---

## 6. Desglose de componentes

### Sección 1: barra de navegación
- 76px, `sticky top-0 z-40`, fondo de piedra con desenfoque, borde inferior de 1 px después del desplazamiento
- Izquierda: arco dorado simple/marca SVG de entrada + "GRACE COMMONS" (Lora 500, seguimiento 0.04em)
- Centro: Soy nuevo · Domingos · Sermones · Ministerios · Eventos · Give
- Derecha: `Planifique su visita` (relleno de arcilla, redondeado-completo)
- Móvil: marca + hamburguesa; menú superpuesto, enlaces de Lora de 28 px, `Planifique su visita` fijado en la parte inferior

### Sección 2: Héroe (imagen con Warm Scrim)
- `min-h-[78vh]`, contenido centrado, max-w-3xl
```jsx
{/* Image: congregation gathered in a bright welcoming church space, warm natural light through tall windows, diverse group of people, candid and unposed, hopeful atmosphere */}
<img src="" alt="Sunday gathering at Grace Commons" className="absolute inset-0 w-full h-full object-cover object-center" />
<div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(46,40,35,0.55) 0%, rgba(46,40,35,0.3) 45%, rgba(46,40,35,0.7) 100%)' }} />
```
- Ceja: `NASHVILLE, TENNESSEE`
- H1: `Ven como eres.\nDe verdad.`
- Sublínea: `Una iglesia para personas que tienen preguntas, dudas y una situación complicada.historia con religión, así como para las personas que no lo hacen.`
- Fila CTA: `Planifique su visita` (relleno de oro) + `Mire un sermón` (fantasma blanco)

### Sección 3 — Horarios de servicio
- Se superpone al héroe en `-64px` en el escritorio (`relative -mt-16 z-20`), centrado max-w-2xl
- Tarjeta de tiempos de servicio (Efecto 1)

### Sección 4: Soy nuevo
- `--background`, ceja `¿PRIMERA VEZ?` + H2 `Qué esperar`
- **cuadrícula de 4 columnas** de tarjetas de seguridad cortas, cada una con un icono con un contorno dorado
- Qué me pongo · Cuánto dura · ¿Qué pasa con mis hijos · ¿Me destacarán?

### Sección 5 — Últimos sermones
- `--card` fondo, ceja `ENSEÑANZA` + H2 `Sermones recientes`
- Banner de la serie actual en arriba: título de la serie, descripción de 1 línea, `4 de 6 partes`
- Lista de 5 tarjetas de sermones con audio en línea (Efecto 2)
- `Examinar el archivo completo →` enlace

### Sección 6 — Ministerios
- `--background`, ceja `GET CONECTADO` + H2 `Encuentra a tu gente`
- **cuadrícula de 3 columnas**, cada una con una imagen, título, descripción de 2 oraciones, línea de cadencia de reunión y `Más información →`
- Niños · Estudiantes · Grupos pequeños · Adultos jóvenes · Mujeres · Hombres (6 tarjetas, 3x2)
```jsx
{/* Image: small group of adults talking around a living room, warm lamp light, relaxed and genuine conversation, documentary style */}
```

### Sección 7 — Valores / Lo que creemos
- `--deep` banda oscura, texto piedra, centrado max-w-3xl
- Ceja `LO QUE CREEMOS` + H2 in Lora
- 4 declaraciones breves de creencias separadas por finas reglas de oro: lenguaje sencillo, sin jerga
- A continuación: `Lea nuestra declaración de fe completa →` en oro

### Sección 8 — Eventos
- `--background`, ceja `QUÉ VIENE` + H2 `Eventos`
- Fila de desplazamiento horizontal de 5 tarjetas de eventos en el escritorio; cada uno: bloque de fecha (oro), título, hora + ubicación, `Detalles →`

### Sección 9 — Servir y dar
- División de 2 columnas en `--card`
- Izquierda: **Servir** — 3 oportunidades breves con íconos + `Ver todos los roles de servicio →`
- Derecha: **Donar**: párrafo breve y honesto sobre adónde va el dinero, un pequeño desglose de 3 líneas y un botón "Dar en línea" + número de texto para donar

### Sección 10: Visita/Ubicación
-`--background`, 2 columnas: tarjeta de dirección izquierda con notas de estacionamiento, información de accesibilidad y qué puerta ingresar; imagen del mapa derecho
```jsx
{/* Image: simple neighbourhood map with a single marked location, muted warm palette, clean cartographic style */}
```

### Sección 11 — Final CTA
- Banda dorada, texto profundo: H2 `Nos encantaría conocerte este domingo.` + horarios de servicio repetidos + `Planifique su visita` CTA

### Sección 12 — Pie de página
- `--deep`, texto en piedra, 4 columnas: marca + dirección / Domingos / Conectar / Contacto
- Newsletter: `Correo electrónico semanal, enviado los jueves.`
- Franja inferior: línea ©, privacidad y un discreto `Inicio de sesión de personal` link

---

## 7. Animaciones

- **Hero:** H1 se desvanece 0,8 s; sublínea a +0,18s; CTA a +0.34s
- **Tarjeta de tiempos de servicio:** aumenta `y: 28 → 0` con una sombra suave que aparece, 0.8s, en carga
- **Encabezados de sección:** desvanecimiento 0.72s, suaviza `[0.22, 1, 0.36, 1]`
- **Tarjetas de tranquilidad:** escalonadas `i * 0.08`
- **Tarjetas de sermón:** escalonadas 0.06s; el botón de reproducción escala 1,05 al pasar el mouse; actualizaciones del ancho de la barra de progreso dorada desde el audio `currentTime`
- **Tarjetas de ministerio:** la imagen escala 1 → 1,04 al pasar el cursor por encima de 0,6 s; la tarjeta se levanta `-4px`
- **Declaraciones de creencias:** las reglas de oro escalan desde la izquierda, 0,6 s, escalonadas 0,12 s
- **Fila de eventos:** en el escritorio, las tarjetas se trasladan ligeramente en el desplazamiento horizontal (`scroll-snap-type: x obligatorio`)
- El movimiento es intencionalmente suave en todo momento: nada se rompe ni rebotes

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca + hamburguesa; superposición con `Planifique su visita` fijada en la parte inferior
- Hero: H1 se fija a 36px, CTA apiladas en ancho completo
- Tarjeta de tiempos de servicio: sin superposición negativa, tiempos apilados verticalmente, ancho completo con `mx-4`
- Tarjetas de tranquilidad: cuadrícula 2x2
- Sermones: tarjetas de ancho completo, metadatos ajustados a dos líneas
- Ministerios: 1-col
- Eventos: desplazamiento horizontal retenido con `snap-center`
- Servir y dar: apilados, Dar primero
- Ubicación: tarjeta de dirección arriba map

### Tableta (768–1024px)
- Tranquilidad 2x2 · Ministerios 2-col · Eventos 3 visibles con desplazamiento · Servir y Dar se queda 2-col

###Escritorio (> 1024px)
- Ancho máximo 1180px, `px-16`, `py-24`

---

## 9. Copia completa

### Marca
**GRACE COMMONS** — Nashville, Tennessee

### Navbar
Soy nuevo · Domingos · Sermones · Ministerios · Eventos · Donar · [Botón] Planifica tu visita

### Hero
- Ceja: `NASHVILLE, TENNESSEE`
- H1: `Ven como eres. De verdad.`
- Sublínea: `Una iglesia para personas que tienen preguntas, dudas y una historia complicada con la religión, así como para personas que no las tienen.`
- CTA 1: `Planifique su visita` · CTA 2: `Mire un sermón`

### Horarios de servicio
Eceja: `ESTO DOMINGO`
`9:00 AM` y `11:00 AM` — servicios idénticos
`1420 Ashland Avenue · Programación para niños en ambos servicios · Café a partir de las 8:30`

### Soy nuevo
Eceja: `¿PRIMERA VEZ?` — H2: `¿Qué hacer? Espere `
1. **¿Qué me pongo?** (ícono: `Camisa`): lo que sea que tengas. Verás trajes y pantalones cortos, y nadie lleva la cuenta.
2. **¿Cuánto dura?** (icono: `Reloj`): unos setenta minutos. Música para unos veinte, un mensaje para unos treinta y tiempo a cada lado para hablar con la gente.
3. **¿Qué pasa con mis hijos?** (ícono: `Bebé`): los niños desde las seis semanas hasta el quinto grado tienen su propio espacio en ambos servicios, con voluntarios con antecedentes verificados y un registro seguro. O llévalos contigo: a nadie le importa el ruido.
4. **¿Me señalarán?** (ícono: `EyeOff`) — No. No pedimos a los visitantes que se pongan de pie, levanten la mano ni se pongan nada. Si desea permanecer en el anonimato durante seis meses, está completamente bien.

### Sermones
Eceja: `TEACHING` — H2: `Recent Sermons`
Serie actual: **Slow Faith** — *Seis semanas en los Salmos, sobre lo que sucede cuando Dios tarda más de lo esperado.* — `4 de 6 piezas`

1. **Cuando esperar es el trabajo** — Pastora Dana Whitfield · 2 de febrero · 34 min
2. **La queja honesta** — Pastor Dana Whitfield · 26 de enero · 31 min
3. **Nadie ora en línea recta** — Marcus Ibe · 19 de enero · 28 min
4. **Qué hacen los Salmos con la ira** — Pastora Dana Whitfield · 12 de enero · 36min
5. **Comenzando en el medio** — Pastor Dana Whitfield · 5 de enero · 33 min

### Ministries
Eceja: `CONÉCTATE` — H2: `Encuentra a tu gente`
1. **Niños**: desde seis semanas hasta quinto grado, en ambos servicios. Voluntarios con verificación de antecedentes, registro seguro y un plan de estudios que no menosprecia a los niños. *Domingos, 9 y 11 a.m.*
2. **Estudiantes** — Del sexto al duodécimo grado. Los miércoles por la noche son ruidosos, los domingos por la mañana son más tranquilos y ambos son lugares seguros para hacer preguntas incómodas. *Miércoles, 18:30*
3. **Grupos pequeños**: de doce a quince personas reunidas en hogares de toda la ciudad. Aquí es donde realmente ocurre la iglesia para la mayoría de nosotros. *Semanal, varias noches*
4. **Adultos jóvenes**: entre veinte y treinta años, casados ​​y solteros, juntos. Cena, discusión y sin presión para resolver tu vida. *2do y 4to jueves*
5. **Mujeres**: estudios, tutorías y una reunión mensual que es a partes iguales escritura y honestidad. *Martes, 9:30 a.m. y 7 p.m.*
6. **Hombres**: Temprano en la mañana, conversación real y una invitación permanente para traer a alguien que nunca vendría en domingo. *Sábados, 7 AM*

### Lo que creemos
Eceja: `LO QUE CREEMOS`
1. **Jesús es el centro.** — Ni nuestra política, ni nuestro edificio, ni nuestras preferencias. Todo lo demás es negociable.
2. **La duda no es lo opuesto a la fe.** — Algunas de las personas más fieles aquí son las que tienen más preguntas. Tráelos.
3. **Todos son bienvenidos, exactamente como son.** — No es necesario que te limpies primero. Nunca ha sido así como funciona esto.
4. **La gracia no es una recompensa.** — No se gana, no se puede perder y no es un premio para las personas que se portan bien.
Enlace: `Lea nuestra declaración de fe completa →`

### Eventos
Eceja: `LO QUE VIENE` — H2: `Eventos`
1. `14 DE FEBRERO` — **Noche de bodas** — 6:30 p.m. · Salón principal · Cena incluida, cuidado de niños disponible
2. `22 DE FEBRERO` — **Día de servicio al vecindario** — 9:00 a. m. · Reúnase en el estacionamiento
3. `MAR 1` — **Almuerzo para recién llegados** — 12:30 p. m. · Sala 120 · Nocompromiso, solo almuerzo
4. `MAR 8` — **Domingo de Bautismo** — Ambos servicios · Habla con cualquier miembro del personal
5. `MAR 21` — **Retiro de primavera para jóvenes** — Salida a las 4:00 p. m. · La inscripción cierra el 7 de marzo

### Serve & Give
**Serve** — `Equipos dominicales` (bienvenida, café, niños, tecnología) · `Asociaciones vecinales` (despensa de alimentos, tutoría, reasentamiento de refugiados) · `Detrás de escena` (configuración, administración, comidas para familias en crisis) — `Ver todas las funciones de servicio →`

**Dar** — `Tratamos de ser directos con el dinero. Aproximadamente dos tercios de lo que ingresa se destina al ministerio y al personal, una quinta parte se destina a socios locales y globales y el resto mantiene el edificio en funcionamiento. Nuestro informe anual se publica cada mes de febrero y lo decimos en serio cuando decimos que debe leerlo.`
- `64%` Ministerio y personal
- `21%` Socios locales y globales
- `15%` Instalaciones y operaciones
CTA: `Give Online` · `O envíe un mensaje de texto con la palabra DÉ al (615) 555-0134`

### Visit
Eyebrow: `ENCONTRARNOS` — H2: `Visitándonos`
- Dirección: `1420 Ashland Avenue, Nashville, TN 37212`
- `Estacionamiento gratuito en el oeste mucho. Ingrese por las puertas de vidrio debajo del toldo; habrá alguien allí para indicarle el camino correcto.`
- `El edificio es totalmente accesible y tenemos una sala tranquila con transmisión en vivo para cualquiera que necesite un descanso del ruido.`

### Final CTA
H2: `Nos encantaría conocerlo este domingo.`
Sublínea: `9:00 y 11:00 a.m. Café a partir de las 8:30. Sin presión, sin registro, sin condiciones.`
CTA: `Planifique su visita`

### Footer
- GRACE COMMONS · `Ven como eres. De verdad.`
- Dirección: `1420 Ashland Avenue, Nashville, TN 37212` · `(615) 555-0134`
- Etiqueta del boletín: `Correo electrónico semanal, enviado los jueves.`
- © 2026 Grace Commons Church. Reservados todos los derechos. · Política de privacidad · Inicio de sesión del personal

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

**Configuración de Tailwind adiciones:**
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Karla', 'system-ui', 'sans-serif'],
      },
      colors: {
        'gc-stone': '#f8f4ee',
        'gc-clay': '#7d5c40',
        'gc-gold': '#c69a4f',
      },
    },
  },
};
```
