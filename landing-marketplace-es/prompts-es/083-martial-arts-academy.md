# Ironwood Martial Arts — Aviso del sitio web de la Academia de Artes Marciales

## 1. Declaración de objetivos
Crear un sitio web de academia de artes marciales disciplinado y de alta intensidad para **Ironwood Martial Arts**, definido por carbón casi negro, acentos carmesí y una tipografía condensada pesada que comunique rigor, linaje y un piso de entrenamiento donde los principiantes están genuinamente bienvenido.

---

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño: Colores

```css
:root {
  --background: hsl(0, 0%, 7%);            /* #121212 near-black */
  --foreground: hsl(30, 12%, 94%);         /* #f2efec warm off-white */
  --primary: hsl(354, 70%, 45%);           /* #c4232f crimson */
  --primary-foreground: hsl(30, 12%, 96%);
  --muted-foreground: hsl(30, 6%, 58%);    /* muted warm grey */
  --border: hsl(0, 0%, 18%);
  --card: hsl(0, 0%, 11%);
  --card-elevated: hsl(0, 0%, 14%);
  --accent-chalk: hsl(38, 30%, 82%);       /* chalk/tatami tone */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- **H1 / hero display:** `font-family: 'Oswald', sans-serif;` peso 700, mayúsculas, espaciado entre letras: -0,01em, alto de línea: 0,92
- **H2 / títulos de sección:** Oswald 600, mayúsculas, espaciado entre letras: 0,02em
- **H3 / títulos de tarjetas:** Oswald 500, mayúsculas, 18–22px
- **Cuerpo:** `font-family: 'Inter', sans-serif;` peso 300–400, altura de línea: 1,75
- **Cejas/etiquetas de interfaz de usuario:** Inter 600, mayúsculas, espaciado entre letras: 0,18em, 11px
- **Números (rango de cinturón, tiempos de clase, estadísticas):** Oswald 700, tabular

---

## 5. Efectos visuales

### Efecto 1: Corte diagonal carmesí Divider
```jsx
{/* Sits between hero and the section below — a hard diagonal cut */}
<div
  className="relative h-16 md:h-24 w-full overflow-hidden"
  style={{
    background: 'var(--primary)',
    clipPath: 'polygon(0 0, 100% 45%, 100% 100%, 0 55%)',
  }}
/>
```

### Efecto 2: barra de progresión de rango de cinturón (relleno animado en el desplazamiento)
```tsx
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const belts = [
  { name: 'White',  color: '#f2efec', months: 0 },
  { name: 'Blue',   color: '#2f5fa8', months: 12 },
  { name: 'Purple', color: '#6b3fa0', months: 30 },
  { name: 'Brown',  color: '#6b4423', months: 54 },
  { name: 'Black',  color: '#121212', months: 84 },
];

function BeltProgression() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className="w-full">
      <div className="relative h-3 w-full rounded-full bg-[var(--card-elevated)] overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0, height: '100%', background: 'linear-gradient(to right, #f2efec, #2f5fa8, #6b3fa0, #6b4423, #121212)' }}
        />
      </div>
      <div className="mt-4 flex justify-between">
        {belts.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
            className="text-center"
          >
            <div className="h-4 w-4 rounded-sm mx-auto border border-[var(--border)]" style={{ background: b.color }} />
            <div className="mt-2 font-display text-xs uppercase tracking-wider">{b.name}</div>
            <div className="text-[10px] text-[var(--muted-foreground)]">{b.months === 0 ? 'Day one' : `~${b.months} mo`}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

### Efecto 3: tabla de horarios de clases con día Filtro
```tsx
const [day, setDay] = useState('Mon');
const days = ['Mon','Tue','Wed','Thu','Fri','Sat'];

<div className="flex gap-2 overflow-x-auto pb-2">
  {days.map(d => (
    <button
      key={d}
      onClick={() => setDay(d)}
      className="px-5 py-2 font-display uppercase text-sm tracking-wider transition-colors duration-200"
      style={{
        background: day === d ? 'var(--primary)' : 'transparent',
        color: day === d ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
        border: `1px solid ${day === d ? 'var(--primary)' : 'var(--border)'}`,
      }}
    >
      {d}
    </button>
  ))}
</div>
{/* Rows animate with AnimatePresence keyed on `day` */}
```

### Efecto 4: Entrada de tarjeta de disciplina escalonada
```
initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
```

---

## 6. Componente Desglose

### Sección 1: barra de navegación
- **Altura:** 76px de escritorio/60px móvil, `fijo top-0 z-40`
- **Fondo:** `rgba(18,18,18,0.94)` con `backdrop-filter: blur(10px)`; El borde inferior carmesí de 2px aparece después de `scrollY > 60`
- **Izquierda:** "IRONWOOD" (Oswald 700, seguimiento 0,12em) + regla carmesí fina + "ARTES MARCIALES" (Inter 600, 9px)
- **Centro:** Disciplinas · Horario · Instructores · Precios · Contacto
- **Derecha:** "Clase de prueba gratuita": botón relleno carmesí, esquinas afiladas (sin radio)
- **Móvil:** marca denominativa + hamburguesa; menú superpuesto de pantalla completa, enlaces carmesí, Oswald 32px

### Sección 2 — Héroe (sin sangre,Tipo-Dominante)
- **Altura:** 100vh, contenido en la parte inferior izquierda alineado con `pb-24 pl-6 md:pl-16`
```jsx
{/* Image: martial arts training hall interior, worn tatami mats, dramatic side light through high windows, dust in the air, dark moody atmosphere, high contrast, desaturated with warm highlights */}
<img src="" alt="Martial arts training hall in dramatic side light" className="absolute inset-0 w-full h-full object-cover object-center" />
<div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,18,18,0.96) 0%, rgba(18,18,18,0.55) 45%, rgba(18,18,18,0.7) 100%)' }} />
```
- Ceja: `PORTLAND, OR · ESTABLECIDO 2009 · TODOS LOS NIVELES BIENVENIDO`
- H1: `LA DISCIPLINA\nSE CONSTRUYE,\nNO NACE.` (Oswald 700, clamp(56px, 9vw, 128px), mayúscula)
- Subline (Inter 300, max-w-xl): `Jiu-jitsu brasileño, Muay Thai y boxeo en el sureste de Portland. Sin contratos, sin egos en el tapete, solo entrenamiento estructurado que te encuentra donde estés.`
- Fila CTA: `Reserve una clase de prueba gratuita` (relleno carmesí) + `Ver el cronograma` (fantasma, borde de tiza)
- Tira de estadísticas: `600+ estudiantes activos` · `14 Black Belts producidos` · `Clase para principiantes cada Día`

### Sección 3 — Divisor carmesí diagonal (Efecto 1)

### Sección 4 — Disciplinas
- Relleno `py-24 px-6 md:px-16`, fondo `--background`
- Ceja `LO QUE ENTRENAMOS` + H2 `Cuatro Disciplinas. One Standard.`
- **cuadrícula de 4 columnas** escritorio/tableta de 2 columnas/móvil de 1 columna
- Cada tarjeta: fondo `--card`, borde de 1 px, borde superior carmesí de 3 px al pasar el mouse, ícono de Lucide, título, descripción de 2 oraciones, línea "Mejor para:" en carmesí

### Sección 5 — Progresión del cinturón (Efecto 2)
- Fondo `--card`, `py-20`
- Ceja `THE PATH` + H2 `Cómo se ve realmente el progreso`
- Párrafo de introducción que establece expectativas honestas sobre el tiempo de clasificación
- Barra de progresión del cinturón con 5 hitos
- Nota a continuación: `Los cronogramas son típicos, no prometidos. La consistencia vence al talento: lo hemos visto durante quince años.`

### Sección 6 — Horario de clases (Efecto 3)
- Antecedentes `--background`
- Ceja `HORARIO SEMANAL` + H2 `Encuentra tu hora de tapete`
- Fila de filtro de día, luego tabla: Tiempo · Clase · Instructor · Insignia de nivel
- Insignias de nivel: `Todos los niveles` (tiza), `Fundamentos` (carmesí), `Avanzado` (contorno oscuro)
- Móvil: la mesa se convierte en tarjetas apiladas

### Sección 7 — Instructores
- Antecedentes `--card`
- Ceja `DE QUIÉN APRENDES` + H2 `Los Entrenadores`
- Cuadrícula de 3 columnas, entrada escalonada
```jsx
{/* Image: martial arts instructor portrait, athletic build, gi or rash guard, serious focused expression, dark studio background, dramatic single-source lighting, editorial sports portrait */}
<img src="" alt="Head instructor portrait" className="w-full aspect-[4/5] object-cover object-center grayscale hover:grayscale-0 transition-all duration-500" />
```
- Cada uno: nombre(Oswald 600), línea de rango (carmesí, Inter 600 mayúsculas 11px), biografía de 2 oraciones, lista de credenciales con pequeños íconos de verificación

### Sección 8: Tranquilidad para principiantes
- Antecedentes `--background`, división de 2 columnas
- Izquierda: H2 `Nunca entrenado ¿Antes? Comience aquí.` + 4 bloques breves de tranquilidad con íconos (Qué usar · Qué sucede en la clase uno · ¿Necesito estar en forma · Me lastimaré)
- Derecha: imagen con sangrado completo
```jsx
{/* Image: beginner adult student learning a basic technique with a patient coach, warm gym lighting, encouraging atmosphere, candid documentary style */}
```

### Sección 9 — Precios
- Antecedentes `--card`, 3 niveles, nivel medio elevado con borde carmesí y cinta "MÁS POPULAR"
- Niveles: Disciplina única · Ilimitado · Familia
- Cada uno: precio (Oswald 700, 56px), nota de facturación, 5 líneas destacadas, botón CTA
- Cuadrícula inferior: `Sin contratos. Cancele en cualquier momento con 30 días de antelación. La primera clase siempre es gratuita.`

### Sección 10 — Testimonios
- Fondo `--background`, tarjetas con citas de 3 columnas con comillas de apertura carmesí (Oswald 72px, opacidad 0.25)
- Cada uno: cita, nombre, disciplina + tiempo formación

### Sección 11 — Final CTA
- Imagen oscura sin sangrado con un gran degradado superior/inferior
- H2 `Su primera clase es gratuita. El resto depende de usted.`
- CTA carmesí grande + número de teléfono

### Sección 12 — Pie de página
- Fondo `hsl(0, 0%, 4%)`, borde superior carmesí 2px
- 4 columnas: marca + eslogan / Disciplinas / Programación + Precios / Contacto + socials
- Tira inferior: dirección, línea ©

---

## 7. Animaciones

- **Barra de navegación:** el borde carmesí se desvanece en `scrollY > 60`, `transición: 0.35s facilidad`
- **Héroe:** Las líneas H1 se revelan individualmente con `clipPath: inset(0 0 100% 0) → inset(0 0 0% 0)`, 0,9 s, escalonamiento 0,12 s; la sublínea y las CTA se desvanecen 0,6 segundos con un retraso de 0,5 segundos 
- **Tarjetas de disciplina:** tambalear `i * 0,1`, desvanecimiento borroso (Efecto 4); pasar el cursor eleva el borde superior carmesí desde 0 → 3px de altura
- **Barra de cinturón:** `scaleX 0 → 1` durante 1,6 s, los marcadores de cinturón se desvanecen escalonados 0,12 s después
- **Filas de programación:** `AnimatePresence mode="wait"` en el cambio de día, `opacity 0→1, y 8→0`, 0,3 s
- **Tarjetas de instructor:** escala de grises → color al pasar el mouse, 0,5 s; escalonamiento de entrada 0.15s
- **Tarjetas de precios:**la tarjeta del medio escala "1,04" en reposo en el escritorio; todos levantan `-6px` al pasar el mouse
- **Números de estadísticas:** cuenta atrás en `useInView`, 1600 ms, salida fácil
- **Todos los encabezados de sección:** `opacity 0, y 24 → 1, 0`, 0.6s, facilidad `[0.22, 1, 0.36, 1]`

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca denominativa + hamburguesa, menú superpuesto de pantalla completa
- Hero: H1 se sujeta a 56 px, la tira de estadísticas se convierte en una lista apilada de 1 columna, CTA apiladas de ancho completo
- Disciplinas: 1-col
- Progresión del cinturón: la barra permanece horizontal, las etiquetas se reducen a 9 px, la línea de meses se oculta debajo de 380 px
- Horario: filtro de día desplazable horizontalmente, las filas se convierten en tarjetas apiladas (hora + clase en la fila uno, instructor + nivel en la fila dos)
- Instructores: 1 columna, aspecto de imagen `3/4`
- Precio: 1 columna, nivel popular primero
- Testimonios: 1-col

### Tableta (768–1024px)
- Disciplinas 2 columnas, Instructores 2 columnas (tercero centrado), Precios 3 columnas con relleno más ajustado

### Escritorio (> 1024px)
- Especificaciones completas, ancho máximo de contenido 1200px, generoso `px-16`

---

## 9. Copia completa

### Marca
**IRONWOOD MARTIAL ARTS** — Portland, Oregón

### Navbar
Disciplinas · Agenda · Instructores · Precios · Contacto · [Botón] Clase de prueba gratuita

### Hero
- Ceja: `PORTLAND, O · ESTABLECIDA 2009 · TODOS LOS NIVELES BIENVENIDOS`
- H1: `LA DISCIPLINA SE CONSTRUYE, NO NACE.`
- Sublínea: `Jiu-jitsu brasileño, muay thai y boxeo en el sureste de Portland. Sin contratos, sin egos en el tapete, solo entrenamiento estructurado que te encuentra donde estés.`
- CTA 1: `Reserve una clase de prueba gratuita` · CTA 2: `Ver el cronograma`
- Estadísticas: `600+ estudiantes activos` · `14 Black Belts producidos` · `Clase para principiantes todos los días`

### Disciplinas
Eceja: `LO QUE ENTRENAMOS` — H2: `Cuatro Disciplinas. Un estándar.`

1. **Jiu-Jitsu brasileño** (icono: `Capas`): agarre, control posicional y sumisiones enseñados desde cero. Nuestra pista de fundamentos asume que nunca has tocado un tapete. *Ideal para: solucionadores de problemas que desean una vidahabilidad.*
2. **Muay Thai** (icono: `Zap`): el arte de ocho extremidades: puñetazos, codos, rodillas y patadas, con trabajo de clinch en cada sesión. El acondicionamiento está integrado en la clase, no es un complemento. *Mejor para: cualquiera que quiera ponerse en forma y aprender a golpear.*
3. **Boxeo** (icono: `Target`): trabajo de pies, movimiento de cabeza y combinaciones practicadas hasta que se conviertan en reflejos. El combate es opcional y siempre supervisado. *Ideal para: formación técnica precisa con la barrera de entrada más baja.*
4. **Programa para niños** (icono: `Usuarios`): de 5 a 14 años, divididos en dos grupos de edad. Concéntrese en la disciplina, las habilidades anti-bullying y la confianza, no en la competencia. *Mejor para: padres que quieren estructura sin presión.*

### Progresión del cinturón
Eceja: `EL CAMINO` — H2: `Cómo se ve realmente el progreso`
Introducción: `Nadie gana un cinturón negro en dos años, y cualquier gimnasio que te diga lo contrario está vendiendo algo. Este es el cronograma honesto que siguen nuestros estudiantes: aproximadamente siete años de capacitación constante, con hitos reales a lo largo del camino.`
Nota: `Los cronogramas son típicos, no prometidos. La consistencia vence al talento: lo hemos visto durante quince años.`

### Horario
Eyebrow: `WEEKLY HORARIO` — H2: `Encuentra tu hora de tapete`
Filas de muestra del lunes:
- `6:00 AM · Fundamentos de BJJ · Entrenador Reyes · Fundamentos`
- `12:00 PM · Técnica de Boxeo · Entrenador Duval · Todos los niveles`
- `5:00 PM · Kids BJJ (5–9) · Entrenador Marsh · Todos los niveles`
- `6:15 PM · Muay Thai · Entrenador Suwan · Todos los niveles`
- `7:30 PM · BJJ Avanzado + Open Mat · Entrenador Reyes · Avanzado`

### Instructores
Eceja: `DE QUIÉN APRENDES` — H2: `Los Entrenadores`

1. **Marco Reyes** — Entrenador en jefe · Cinturón negro de BJJ, tercer grado — Marco ha entrenado durante veintidós años y ha entrenado en Ironwood desde su apertura. Es conocido por dividir posiciones complejas en pasos que un estudiante de primera semana puede seguir. Credenciales: Certificado IBJJF · Instructor de ciclo maestro · Más de 200 curvas de competencia.
2. **Suwan Prasert** — Entrenador de Muay Thai — Suwan luchó profesionalmente en Bangkok durante nueve años antes de mudarse aPortland. Sus clases son exigentes, precisas y sorprendentemente acogedoras para los principiantes. Credenciales: 47 combates profesionales · Entrenador certificado WMC · Linaje nivel Kru.
3. **Alicia Duval** — Entrenadora de boxeo — Alicia, ex medallista amateur nacional, entrena el juego de pies y la defensa antes que nada. Su clase de fundamentos se llena todas las semanas por una razón. Credenciales: Certificado de Boxeo de EE. UU. · 3x Campeón Regional · Entrenador Juvenil del Año 2022.

### Sección Principiante
H2: `¿Nunca entrenó antes? Empieza aquí.`
- **¿Qué me pongo?** Pantalones cortos y una camiseta para tu primera clase. No necesitas gi ni guantes: te prestamos todo lo que necesitas hasta que decidas quedarte. 
- **¿Qué sucede en la primera clase?** Un entrenador te recibe diez minutos antes, te guía por la sala y te empareja con un estudiante experimentado. Harás ejercicios, no entrenamiento.
- **¿Necesito estar en forma primero?** No. Esta es la razón más común por la que las personas retrasan el inicio, y es al revés. Te pones en forma entrenando, no antes.
- **¿Me lastimaré?** Cada clase es supervisada, el sparring es opcional y el tapping temprano se enseña desde el primer día como una habilidad, no como una debilidad.

### Precios
Eyebrow: `MEMBERSHIP` — H2: `Simple Pricing, No Contratos`

- **Disciplina única: $129/mes** — Clases ilimitadas en una disciplina · Acceso a tapete abierto · Equipo de préstamo gratuito · Dos pases de invitado por año · Cancelar en cualquier momento
- **Ilimitado: $169/mes** *(MÁS POPULAR)* — Cada clase, cada disciplina · Tapete abierto y noches de sparring · Gi gratis en tu tercer mes · Cuatro pases de invitado por año · Seminario descuentos
- **Familia — $249/mes** — Dos adultos más todos los niños menores de 15 años · Ilimitado en todos los programas · Préstamo de equipo gratuito para todos · Inscripción prioritaria al campamento para niños · Cancelar en cualquier momento

Nota: `Sin contratos. Cancele en cualquier momento con 30 días de antelación. La primera clase es siempre gratuita.`

### Testimonios
1. `Entré con 41 años, con sobrepeso y completamente intimidado. Dieciocho meses después ya tengo el cinturón azul y no he faltado ni una semana. Nadie aquí me hizo sentir nunca como si no perteneciera." — **Daniel K.**, BJJ · 18meses
2. "A mi hijo lo maltrataban en la escuela. Ya no habla de eso, no porque se defienda, sino porque dejó de tener miedo. Eso es lo que hizo este lugar.` — **Rebecca M.**, Programa para padres · niños
3. `Vengo de un gimnasio donde entrenar el primer día era normal. Ironwood pasó seis semanas enseñándome a defenderme antes de que alguien me lanzara un puñetazo. Noche y día.` — **Tomas V.**, Muay Thai · 2 años

### Final CTA
H2: `Tu primera clase es gratis. El resto depende de usted.`
Sublínea: `Visítenos cualquier día de la semana. Traiga pantalones cortos y una camiseta, nosotros nos encargamos del resto.`
CTA: `Reserve su prueba gratuita` · Teléfono: `(503) 555-0164`

### Footer
- IRONWOOD MARTIAL ARTS · `La disciplina se construye, no nace.`
- Dirección: `2140 SE Belmont Street, Portland, OR 97214`
- Horario: `Lunes a viernes de 6 a. m. a 9 p. m. · Sábados de 8 a. m. a 2 p. m. · Dom cerrado`
- © 2026 Ironwood Martial Arts. Todos los derechos reservados.

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

**Adiciones de configuración de Tailwind:**
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'iron-black': '#121212',
        'iron-crimson': '#c4232f',
        'iron-chalk': '#f2efec',
      },
      borderRadius: { none: '0px' },
    },
  },
};
```
