# Meridian Law Group — Aviso del sitio web de bufetes de abogados/abogados

## 1. Declaración de objetivos
Crear un sitio web de bufete de abogados autorizado pero humano para **Meridian Law Group**, definido por un azul marino profundo, cálidos acentos dorados y una estética de textura de pergamino que comunica décadas de experiencia, atención personal e inquebrantable confiabilidad.

---

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño: Colores

```css
:root {
  --background: hsl(221, 47%, 11%);          /* #0d1628 deep navy */
  --foreground: hsl(36, 30%, 93%);           /* #f2ede4 parchment */
  --primary: hsl(41, 55%, 54%);              /* #c9a84c warm gold */
  --primary-foreground: hsl(221, 47%, 11%);  /* navy — text on gold */
  --muted-foreground: hsl(36, 15%, 65%);     /* muted parchment-grey */
  --border: hsl(41, 25%, 22%);               /* dark gold border */
  --card: hsl(221, 44%, 14%);                /* slightly lighter card */
  --card-dark: hsl(221, 50%, 9%);            /* darker card for contrast */
  --accent: hsl(41, 55%, 54%);               /* warm gold */
  --texture-overlay: rgba(18, 14, 8, 0.15);  /* paper texture tint */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- **H1 / hero display:** `font-family: 'Cormorant', serif;` peso 300–400, espacio entre letras: 0,02 em, variación en cursiva para énfasis
- **H2 / títulos de sección:** Cormorant 400, espacio entre letras: 0,01 em
- **H3 / subtítulos/títulos de tarjetas:** Cormorant cursiva 400, tamaño 20–26px
- **Cuerpo/párrafos:** `font-family: 'Inter', sans-serif;` peso 300–400, altura de línea: 1,8, espacio entre letras: 0,01em
- **Navegación/etiquetas de interfaz de usuario/cejas:** Inter 500, mayúsculas, espacio entre letras: 0,15em, tamaño: 11–12px
- **Texto con acento dorado/nombre de la empresa:** Cormorant 400, color dorado `--primary`
- **Número de teléfono/contacto:** Inter 600, pergamino o dorado

---

## 5. Visual Efectos

### Efecto 1: Superposición de textura de pergamino/lino (fijo)
```jsx
{/* Fixed paper/linen texture overlay — creates warmth and authority */}
<div
  className="fixed inset-0 z-50 pointer-events-none"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
    mixBlendMode: 'multiply',
    opacity: 0.7,
  }}
/>
```

### Efecto 2: Subrayado animado dorado en el encabezado de las áreas de práctica
```tsx
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

function GoldAnimatedHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className="inline-block">
      <h2 className="font-serif font-light text-4xl md:text-5xl tracking-wide text-[var(--foreground)]">
        {children}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{
          originX: 0,
          height: '1px',
          width: '100%',
          backgroundColor: 'var(--primary)',
          marginTop: '10px',
        }}
      />
    </div>
  );
}
```

### Efecto 3 — Tarjetas de área de práctica con borde izquierdo dorado + elevación flotante
```tsx
<div
  className="group relative p-6 md:p-8 cursor-pointer transition-all duration-300"
  style={{
    background: 'var(--card)',
    borderLeft: '3px solid var(--primary)',
    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
  }}
  onMouseEnter={e => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.2)';
  }}
  onMouseLeave={e => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
  }}
>
  {/* card content */}
</div>
```

### Efecto 4 — Entrada de tarjeta de perfil de abogado escalonada
```tsx
const attorneys = [...];

function AttorneyProfiles() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {attorneys.map((attorney, i) => (
        <motion.div
          key={attorney.name}
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* attorney card */}
        </motion.div>
      ))}
    </div>
  );
}
```

### Efecto 5 — Control deslizante de cotización con Avance automático
```tsx
const [activeIndex, setActiveIndex] = useState(0);
const quotes = [...];

useEffect(() => {
  const timer = setInterval(() => {
    setActiveIndex(prev => (prev + 1) % quotes.length);
  }, 6000);
  return () => clearInterval(timer);
}, []);

// AnimatePresence wraps the active quote
<AnimatePresence mode="wait">
  <motion.div
    key={activeIndex}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* quote content */}
  </motion.div>
</AnimatePresence>
```

---

## 6. Desglose de componentes

### Sección 1: barra de navegación
- **Altura:** Escritorio de 80 px / 64 px mobile
- **Posición:** `fixed top-0 left-0 right-0 z-40`
- **Fondo:** `rgba(13,22,40,0.97)` siempre (nunca completamente transparente: credibilidad del bufete de abogados)
- **Borde inferior:** 1px `--border` (tintado en dorado)
- **Izquierda:** "MERIDIAN" en Cormorant 400, espacio entre letras 0,2 em, dorado + "LAW GROUP" en Inter 500, 10px,mayúscula, pergamino/silenciado
- **Centro (escritorio):** Áreas de práctica · Nuestros abogados · Resultados de casos · Proceso · Contacto
- **Derecha (siempre visible):** `+1 512 555 0193` en Inter 600 gold + botón "Consulta gratuita" (con contorno dorado)
- **Móvil:** marca denominativa + ícono de teléfono (dorado) + ícono de hamburguesa

### Sección 2: Héroe (panel dividido)
- **Altura:** 100vh
- **Diseño:** 60% panel de texto izquierdo (azul marino) / 40% panel de imagen derecho
- **Izquierdo panel:**
 - Ceja (Inter, minúscula, mayúscula dorada): `AUSTIN, TEXAS · FUNDADA 1989 · AV PREEMINENT® CLASIFICADA`
 - H1: `Consejo con el que\npuedes contar` (Peso de cormorán 300, 72px–104px, pergamino)
 - Sublínea (Inter 300): `Décadas de experiencia en lesiones personales, derecho de familia y litigios comerciales. Atención personal del abogado, no del asistente legal.`
 - Fila de CTA: "Programar consulta gratuita" (relleno de oro) + "Ver áreas de práctica" (pergamino fantasma)
 - Franja de confianza debajo de los CTA: ícono de candado + "Confidencial · Sin obligación · Respuesta el mismo día"
- **Panel derecho (40 % escritorio, superposición de bg) móvil):**
 ```jsx
  {/* Image: classic courthouse exterior with dramatic columns, low angle shot looking up, golden hour warm light, slightly overcast sky adding gravitas, architectural photography, deep navy sky visible */}
  <img src="" alt="Federal courthouse exterior with columns at golden hour" className="w-full h-full object-cover object-center" />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,22,40,1) 0%, rgba(13,22,40,0.3) 40%, transparent 70%)' }} />
  ```

### Sección 3: Barra de confianza
- **Fondo:** `--card-dark`
- **Borde superior/inferior:** 1px `--border`
- **Diseño:** `flex flex-wrap justify-center items-center gap-8 md:gap-12 py-8 px-6`
- **Sellos/insignias con estilo de logotipo:** Insignias con estilo de solo texto en dorado:
 - AV Preeminent® 2024
 - Super Lawyers® 2019–2024
 - Colegio de Abogados del Estado de Texas
 - Best Law Firms® US News
 - Calificación AVVO 10.0
 - Más de 35 años de establecimiento

### Sección 4 — Áreas de práctica
- **Relleno:** `py-24 px-6 md:px-16`
- **Ceja + GoldAnimatedHeading:** "Áreas de práctica"
- **Cuadrícula:** Cuadrícula de 2x3 en escritorio (6 tarjetas), 1 columna en móvil
- **Cada tarjeta:** borde izquierdo dorado, fondo oscuro, icono (lucide-react), nombre del área (Cormorant cursiva), descripción de 1 oración (Inter 300)

### Sección 5 — Perfiles de abogados
- **Antecedentes:** `--background`
- **Ceja:** "NUESTROS ABOGADOS"
- **Título:** "La gente enTu rincón"
- **Cuadrícula de 3 columnas** en escritorio, 1 columna móvil
- **Cada tarjeta de perfil:**
 - Foto en la cabeza (marco circular, "redondeado completo", borde de anillo dorado)
 - Nombre (Cormorant, 22px)
 - Título/especialidad (Inter 400, dorado, pequeño)
 - biografía de 2 oraciones
 - "Ver perfil completo →" enlace dorado

### Sección 6 — Resultados del caso
- **Antecedentes:** `--card-dark`
- **Ceja:** "TRACK REGISTRO"
- **Encabezado:** `Resultados que hablan por sí mismos`
- **3 resultados resaltados** en formato de tarjeta grande
- **Cada caso:** gran monto de liquidación (Cormorant, 48px, oro), etiqueta de tipo de caso, breve descripción anónima
- **Descargo de responsabilidad:** pequeño Inter 300 texto silenciado: "Los resultados pasados no garantizan resultados futuros. Todos los montos son aproximados."

### Sección 7 — Testimonios
- **Antecedentes:** `--background`
- **Ceja:** "TESTIMONIOS DE CLIENTES"
- **Control deslizante de cotización** con avance automático (Efecto 5)
- **Texto de cita:** Cormorán cursiva, 26–32 px, pergamino
- **Atribución:** Inter 400, dorado, 12 px
- **Insignia de tipo de estuche:** pastilla debajo de la atribución
- **Dot nav:** 4 dorado dots

### Sección 8: Proceso
- **Antecedentes:** `--card`
- **Ceja:** "CÓMO FUNCIONA"
- **Encabezado:** "Desde la primera llamada hasta la resolución"
- **Cronología de 4 pasos** (escritorio horizontal, móvil vertical)
- **Cada paso:** número dorado (Cormorant 60px, contorno transparente), título, descripción
- **Línea de conexión:** línea horizontal dorada delgada (escritorio)

### Sección 9 — Contacto
- **Diseño:** 2 columnas, formulario izquierda/oficina información derecha
- **Col izquierda:**
 - Encabezado: "Programe su consulta gratuita"
 - Formulario: Nombre completo / Correo electrónico / Teléfono / Área de práctica (desplegable) / Breve descripción
 - CTA: "Enviar - Llamaremos dentro de 24 horas" (relleno de oro, ancho completo)
 - Nota de confianza: ícono de candado + "Su información es 100% confidencial".
- **Col derecha:**
 - Encabezado: "Póngase en contacto"
 - Teléfono (grande, dorado): +1 512 5550193
 - Correo electrónico: intake@meridianlaw.com
 - Dirección: 500 W 2nd Street, Suite 1900, Austin, TX 78701
 - Horario: lunes a viernes, de 8 a.m. a 6 p.m. · Línea de emergencia 24 horas al día, 7 días a la semana
 - Marcador de posición del mapa (cuadro gris con enlace "Ver en mapas")

### Sección 10 — Pie de página
- **Fondo:** `hsl(221, 52%, 7%)` (azul marino más oscuro)
- **Borde superior dorado 1px**
- **diseño de 4 columnas** (escritorio), apilados (móvil)
- Col 1: MERIDIAN LAW GROUP + lema + número de barra
- Col 2: Enlaces de áreas de práctica
- Col 3: Información de contacto
- Col 4: Social (LinkedIn, Facebook) + Logotipos del colegio de abogados
- Tira inferior: © + texto de descargo de responsabilidad (pequeño) + aviso de "Publicidad de abogados" 

---

## 7. Animaciones

### Comportamiento de desplazamiento de la barra de navegación
- `window.scrollY > 60` → agregar sombra de cuadro: `0 4px 30px rgba(0,0,0,0.5)`
- `transition: box-shadow 0.4s facilidad`

### Revelación del panel de héroe
```tsx
// Left panel: staggered content reveal
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

// Right panel: clipPath reveal
initial={{ clipPath: 'inset(0 100% 0 0)' }}
animate={{ clipPath: 'inset(0 0% 0 0)' }}
transition={{ duration: 1.4, ease: [0.77, 0, 0.18, 1], delay: 0.1 }}
```

### Subrayado dorado (áreas de práctica)
- `scaleX: 0 → 1`, `originX: 0`, duración: 0.9s, retraso: 0.3s

### Tarjetas de área de práctica
- Entrada escalonada: `i * 0.08` retraso, `opacidad: 0, y: 20 → 1, 0`, duración: 0.6s
- Desplazamiento: `translateY(-4px)` + sombra dorada, `0.3s cubic-bezier`

### Tarjetas de abogado
- Escalonado: `i * 0.15`, desenfoque+fundido, duración: 0.7s

### Números de resultados de casos
- Animación de cuenta atrás activada `useInView`, 1800ms

### Quote Slider
- `AnimatePresence mode="wait"`, `x: 20 → 0` in / `x: -20 → out`, duración: 0.45s

### Pasos del proceso
- Cada paso: `initial={{ opacity: 0, x: -20 }}` → animar en desplazamiento, `retraso: i * 0.15`

### Todos los encabezados de sección
- `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- Duración: 0.65s, facilidad: `[0.22, 1, 0.36, 1]`

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca denominativa (abreviada "MERIDIAN") + ícono de teléfono (dorado, llamadas directas) + hamburguesa
- Héroe: pantalla completa, texto sobre imagen atenuada del juzgado, todo el contenido centrado, CTA apiladas
- Barra de confianza: desplazamiento horizontal con desbordamiento-x, 2 o 3 visibles a la vez
- Áreas de práctica: 1 columna, 6 tarjetas apiladas
-Abogados: 1 columna, fotografías en la cabeza, rectángulo de ancho completo (no círculo) o círculo mantenido
- Resultados del caso: 1 columna apilada
- Testimonios: control deslizante mantenido
- Proceso: línea de tiempo vertical (no horizontal)
- Contacto: apilado (parte superior del formulario, información a continuación)

### Tableta (768px–1024px)
- Héroe: división mantenida en 60/40
- Áreas de práctica: Cuadrícula de 2x3 mantenida (tarjetas más pequeñas)
- Abogados: 3 columnas con espaciado más ajustado
- Proceso: horizontal mantenido

### Escritorio (> 1024px)
- Especificaciones completas según lo diseñado

---

## 9. Copia completa

### Marca
**MERIDIAN LAW GROUP**

### Taglines
- "Consejo con el que puedes contar"
- "Luchamos por lo que más importa."
- "Décadas de experiencia. Atención personalizada en cada paso del camino".

### Navbar
- Áreas de Práctica
- Nuestros Abogados
- Resultados de Casos
- Proceso
- Contacto
- `+1 512 555 0193`
- [Botón] Gratis Consulta

### Hero
- Ceja: `AUSTIN, TEXAS · FUNDADA 1989 · CLASIFICACIÓN AV PREEMINENT®`
- H1: `Abogado con el que\npuede contar`
- Sublínea: `Décadas de experiencia en lesiones personales, derecho de familia y negocios litigio. Atención personal del abogado, no del asistente legal.`
- CTA Primaria: `Programar consulta gratuita`
- CTA Secundaria: `Ver áreas de práctica`
- Tira de confianza: `🔒 Confidencial · Sin obligación · Respuesta el mismo día`

### Confianza Bar
- AV Preeminent® Martindale-Hubbell 2024
- Super Lawyers® 2019–2024
- Colegio de Abogados del Estado de Texas
- Best Law Firms® — U.S. News 2024
- Clasificación AVVO: 10.0 Excelente
- 35 años en la práctica

### Sección de áreas de práctica
- Ceja: `LO QUE MANEJAMOS`
- H2: `Áreas de práctica`

**Área 1 — Personal Lesiones**
- Icono: `Shield` (lucide-react)
- Descripción: Casos de accidentes, muerte por negligencia y lesiones catastróficas. Luchamos agresivamente por la máxima compensación.

**Área 2 — Derecho de Familia**
- Icono: `Corazón`(lucide-react)
- Descripción: Divorcio, custodia de los hijos, adopción y órdenes de protección manejadas con habilidad legal y sensibilidad humana.

**Área 3 — Litigios comerciales**
- Icono: `Maletín` (lucide-react)
- Descripción: Disputas contractuales, desacuerdos de asociación y reclamos comerciales resuelto con una estrategia decisiva.

**Área 4 — Defensa criminal**
- Icono: `Scale` (lucide-react)
- Descripción: Defensa por DWI, delitos graves y delitos menores. Protegemos sus derechos desde el momento del arresto hasta el veredicto.

**Área 5 — Planificación patrimonial**
- Icono: `FileText` (lucide-react)
- Descripción: Testamentos, fideicomisos, poderes y sucesiones. Asegure su legado y proteja a las personas que ama.

**Área 6: Ley laboral**
- Icono: `Usuarios` (lucide-react)
- Descripción: despido injustificado, discriminación y robo de salarios. Cuando su empleador viola sus derechos, lo hacemos responsable.

### Sección de perfiles de abogados
- Ceja: `NUESTROS ABOGADOS`
- H2: `La gente de su esquina`

**Abogado 1 — Robert Meridian**
```jsx
{/* Image: distinguished male attorney in his 60s, dark suit, silver hair, warm and authoritative expression, professional headshot, plain dark background, confident bearing */}
<img src="" alt="Robert Meridian, founding partner" className="w-full h-full object-cover object-center" />
```
- Título: Socio fundador · Lesiones personales y litigios comerciales
- Biografía: Robert fundó Meridian Law Group en 1989 después de desempeñarse como fiscal federal. En 35 años de práctica, ha juzgado más de 200 casos y ha obtenido más de $180 millones en recuperaciones de clientes. 
- Enlace: Ver perfil completo →

**Abogada 2 — Diana Vasquez**
```jsx
{/* Image: professional female attorney in her 40s, dark blazer, warm confident smile, professional headshot, neutral background, approachable yet authoritative demeanor */}
<img src="" alt="Diana Vasquez, Partner at Meridian Law Group" className="w-full h-full object-cover object-center" />
```
- Título: Socio · Derecho de familia y patrimonio Planificación
- Bio: Diana es una especialista certificada en derecho de familia con 18 años de experiencia. Es conocida por resolver disputas complejas de custodia con claridad y compasión, y por ganar cuando más importa. 
- Enlace: Ver perfil completo →

**Abogado 3 — James Okafor**
```jsx
{/* Image: professional Black male attorney in his 30s, sharp dark suit, confident posture, professional headshot, office bookshelf background slightly blurred, serious but approachable expression */}
<img src="" alt="James Okafor, Associate Attorney" className="w-full h-full object-cover object-center" />
```
- Título: Asociado · Defensa penal y derecho laboral
- Bio: James se unió a Meridian después de trabajar como secretario del Tribunal de Apelaciones del Quinto Circuito. Su precisión analítica y su confianza en los tribunales le han valido una reputación comouno de los abogados litigantes jóvenes más eficaces de Austin.
- Enlace: Ver perfil completo →

### Sección de resultados del caso
- Ceja: `REGISTRO DE SEGUIMIENTO`
- H2: `Resultados que hablan por sí mismos`
- Descargo de responsabilidad: `Los resultados pasados no garantizar resultados futuros. Todos los montos del acuerdo y del veredicto son aproximados y pueden variar según las circunstancias.`

**Resultado 1:**
- Monto: $4.2M
- Tipo: Lesiones personales - Accidente de camión
- Descripción: Acuerdo asegurado para una familia cuyo vehículo fue atropellado por un conductor de camión comercial que había estado en la carretera durante 22 horas consecutivas. La empresa negoció directamente con la aseguradora de la aseguradora durante 9 meses.

**Resultado 2:**
- Monto: $1.8M
- Tipo: Despido injustificado - Discriminación laboral
- Descripción: Veredicto del jurado para un empleado senior despedido después de informar violaciones de seguridad a OSHA. El caso se tomó como contingencia después de que otras dos firmas se negaron.

**Resultado 3:**
- Monto: $3.5M
- Tipo: Negligencia médica
- Descripción: Acuerdo para un paciente que sufrió una lesión permanente durante un procedimiento de rutina debido a la negligencia del equipo quirúrgico. Negociado en 14 meses sin juicio.

### Sección Testimonios
- Ceja: `TESTIMONIOS DE CLIENTES`
- H2: `Lo que dicen nuestros clientes`

**Cita 1:**
> "Robert atendió mi llamada un domingo La noche después de mi accidente, el lunes por la mañana ya había enviado una carta de preservación a la compañía de camiones. Eso le dice todo sobre cómo opera esta empresa."
> — *Michael T., Cliente de lesiones personales* · Liquidación de $1.2 millones ★★★★★

**Cita 2:**
> "Diana navegó por mi. divorcio con habilidad legal y empatía genuina. Los intereses de mis hijos fueron protegidos en cada paso. No sé qué habría hecho sin ella."
> - *Sarah W., cliente de derecho familiar* ★★★★★

**Cita 3:**
> "James consiguió que desestimaran mi DWI por motivos procesales. otro abogado me dijo que no existía. Agradezco haber obtenido una segunda opinión. Mi historial está limpio."
> — *Anónimo, Cliente de Defensa Penal*.★★★★★

**Cita 4:**
> "Era escéptico de que un bufete de abogados me tratara como a una persona y no como un número de caso. Meridian demostró que estaba equivocado desde la primera reunión".
> — *Donna R., cliente de planificación patrimonial* ★★★★★

### Sección de Proceso
- Ceja: `CÓMO FUNCIONA`
- H2: `De la Primera Llamada a la Resolución`

Pasos:
1. **01 — Consulta gratuita** — Llámanos o envía un formulario. Hablaremos con usted dentro de las 24 horas, a menudo el mismo día. Hablará con un abogado desde el principio, no con una recepcionista. Sin compromiso. Sin cargo.
2. **02 — Evaluación de caso** — Revisamos los hechos, investigamos la ley y le brindamos una evaluación honesta. Si creemos que podemos ayudarle, y sólo entonces, le diremos cómo.
3. **03 — Estrategia y acción** — Desarrollamos su estrategia legal y comenzamos a trabajar de inmediato: reuniendo pruebas, involucrando a expertos, presentando declaraciones en su nombre y comunicándonos con el abogado contrario.
4. **04 — Resolución** — Ya sea a través de negociación, mediación o juicio, buscamos el resultado que usted se merece. Sabrá lo que sucede en cada paso, porque creemos que es su derecho.

### Sección de contacto
- Ceja: `REACH OUT`
- H2: `Programe su consulta gratuita`
- Sublínea: `Respondemos dentro de las 24 horas. Asuntos de emergencia: llame directamente.`
- Etiquetas de formulario: Nombre completo/Dirección de correo electrónico/Número de teléfono/Área de práctica/¿Cómo podemos ayudarlo?
- Opciones de área de práctica: Lesiones personales · Derecho de familia · Litigios comerciales · Defensa penal · Planificación patrimonial · Derecho laboral · Otro
- CTA: `Enviar — Llamaremos dentro de las 24 horas Horario`
- Nota de confianza: `🔒 Su información es completamente confidencial y está protegida por el privilegio abogado-cliente.`
- Col derecha:
 - Encabezado: `Póngase en contacto`
 - Teléfono: `+1 512 555 0193`
 - Correo electrónico: `intake@meridianlaw.com`
 - Dirección: `500 W 2nd Street, Suite 1900\nAustin, TX 78701`
 - Horario: `Lunes – viernes: 8 a.m. – 6 p.m.\nLínea de emergencia las 24 horas, los 7 días de la semana: +1 512 555 0199`

### Footer
- MERIDIAN LAW GROUP
- Lema: "Décadas de experiencia. Atención personalizadacada paso del camino."
- Enlaces: Áreas de práctica · Nuestros abogados · Resultados de casos · Proceso · Contacto · Política de privacidad
- Dirección: 500 W 2nd Street, Suite 1900, Austin, TX 78701
- © 2024 Meridian Law Group. Todos los derechos reservado.
- "Publicidad de abogados. Los resultados anteriores no garantizan un resultado similar."
- Licencia del Colegio de Abogados del Estado de Texas #TX-1989-0042

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-select": "^2.1.0",
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
        serif: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'meridian-navy': '#0d1628',
        'meridian-parchment': '#f2ede4',
        'meridian-gold': '#c9a84c',
      },
    },
  },
};
```
