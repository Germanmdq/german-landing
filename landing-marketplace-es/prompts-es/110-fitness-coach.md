# Forge — Mensaje del sitio web de entrenador personal/entrenador físico

## 1. Declaración de objetivos
Cree un sitio web de entrenador personal de alta energía y orientado a resultados para **Forge**, una marca de fitness definida por fondos casi negros, detalles en lima eléctrica y una tipografía audaz de Space Grotesk que proyecta responsabilidad, transformación y atletismo. intensidad.

---

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño - Colores

```css
:root {
  --background: hsl(0, 0%, 3%);             /* #080808 near-black */
  --foreground: hsl(0, 0%, 98%);            /* #fafafa white */
  --primary: hsl(77, 86%, 57%);             /* #b5f030 electric lime */
  --primary-foreground: hsl(0, 0%, 3%);     /* near-black — text on lime buttons */
  --muted-foreground: hsl(0, 0%, 55%);      /* medium grey */
  --border: hsl(0, 0%, 12%);               /* very dark grey border */
  --card: hsl(0, 0%, 6%);                   /* slightly lighter card bg */
  --glow: rgba(181, 240, 48, 0.35);         /* lime glow for box-shadow */
  --glow-strong: rgba(181, 240, 48, 0.6);   /* strong lime glow */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet" />
```

- **H1 / hero display:** `font-family: 'Space Grotesk', sans-serif;` peso 700, espaciado entre letras: -0.03em, mayúsculas
- **H2 / títulos de sección:** Espacio Grotesk 700, espaciado entre letras: -0.02em
- **H3 / títulos de tarjetas / etiquetas:** Espacio Grotesk 600, espaciado entre letras: 0.01em
- **Cuerpo / párrafos:** `font-family: 'Inter Tight', sans-serif;` peso 300–400, altura de línea: 1.7
- **Cejas/etiquetas/insignias de UI:** Space Grotesk 500, mayúsculas, espacio entre letras: 0,12 em, tamaño: 11–13px
- **Números de estadísticas:** Space Grotesk 700, espaciado entre letras: -0.04em, color lima eléctrico
- **Texto de aviso/ticker:** Espacio Grotesk 500, mayúsculas, espaciado entre letras: 0.08em

---

## 5. Efectos visuales

### Efecto 1 — Video Hero en bucle en pantalla completa
```jsx
<section className="relative h-screen w-full overflow-hidden">
  {/* Video: athletic male or female performing heavy barbell squat in dim gym, high contrast cinematic lighting, slow motion, chalk dust particles, intense focus expression, dark background */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover object-center z-0"
    style={{ filter: 'contrast(1.1) brightness(0.65)' }}
  />
  {/* Dark overlay with lime tint at bottom */}
  <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.1) 40%, rgba(8,8,8,0.85) 100%)' }} />
  {/* Content at z-20 */}
</section>
```

### Efecto 2: contadores de estadísticas animados
```tsx
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref} className="text-[var(--primary)]">{prefix}{count.toLocaleString()}{suffix}</span>;
}
```

### Efecto 3: antes/después de la transformación Control deslizante
```tsx
import { useState, useRef, useCallback } from 'react';

function BeforeAfterSlider({ beforeAlt, afterAlt }: { beforeAlt: string; afterAlt: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPosition(newPos);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] overflow-hidden select-none cursor-col-resize"
      onMouseMove={e => handleMove(e.clientX)}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
    >
      {/* BEFORE image */}
      {/* Image: overweight or untrained man/woman, before photo style, neutral grey background, slightly flat lighting, casual clothes */}
      <img src="" alt={beforeAlt} className="absolute inset-0 w-full h-full object-cover object-top" />
      {/* AFTER image clipped */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        {/* Image: same person transformed, athletic build, confident posture, gym environment, professional lighting, same neutral background, dramatic improvement visible */}
        <img src="" alt={afterAlt} className="absolute inset-0 w-full h-full object-cover object-top" style={{ width: `${10000 / position}%`, maxWidth: 'none' }} />
      </div>
      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)', width: '2px', background: 'var(--primary)' }}
      >
        <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 20px var(--glow-strong)' }}>
          <span className="text-black text-xs font-bold select-none">↔</span>
        </div>
      </div>
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-medium px-2 py-1 uppercase tracking-wider">Before</div>
      <div className="absolute top-4 right-4 bg-[var(--primary)] text-black text-xs font-bold px-2 py-1 uppercase tracking-wider">After</div>
    </div>
  );
}
```

### Efecto 4: tira de teletipo con desplazamiento
```tsx
<div className="overflow-hidden whitespace-nowrap border-y border-[var(--border)] py-4 bg-[var(--card)]">
  <motion.div
    animate={{ x: ['0%', '-50%'] }}
    transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
    className="inline-flex"
  >
    {[...Array(2)].map((_, i) => (
      <span key={i} className="inline-flex items-center gap-8 mr-8 text-sm font-medium tracking-widest uppercase text-[var(--foreground)]">
        <span>127 CLIENTS TRANSFORMED</span>
        <span className="text-[var(--primary)]">·</span>
        <span>4.9★ AVERAGE RATING</span>
        <span className="text-[var(--primary)]">·</span>
        <span>8 YEARS IN THE GAME</span>
        <span className="text-[var(--primary)]">·</span>
        <span>NO SHORTCUTS. EVER.</span>
        <span className="text-[var(--primary)]">·</span>
        <span>FORGE YOUR BEST SELF</span>
        <span className="text-[var(--primary)]">·</span>
      </span>
    ))}
  </motion.div>
</div>
```

### Efecto 5: Resplandor verde lima al pasar el mouse Tarjetas
```tsx
// Applied to program cards and testimonial cards
<div
  className="border border-[var(--border)] rounded-none p-6 md:p-8 transition-all duration-300"
  style={{
    background: 'var(--card)',
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
  }}
  onMouseEnter={e => {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px var(--glow), 0 0 60px rgba(181,240,48,0.15)';
    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(181,240,48,0.5)';
    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
  }}
  onMouseLeave={e => {
    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
  }}
>
  {/* card content */}
</div>
```

---

## 6. Desglose de componentes

### Sección 1: barra de navegación
- **Altura:** 70px
- **Posición:** `fixed top-0 left-0 right-0 z-40`
- **Fondo:** transparente → `rgba(8,8,8,0.95) blur(12px)` en desplazamiento
- **Izquierda:** Marca denominativa "FORGE" — Space Grotesk 700, color lima eléctrico, espacio entre letras 0,1em
- **Centro (escritorio):** Acerca de · Programas · Resultados · Preguntas frecuentes: Inter Tight 400, 12px, mayúsculas, blanco/silenciado
- **Derecha:** "Empezar hoy": botón relleno de lima eléctrica, casi negrotexto, Space Grotesk 600, redondeado, ninguno, brillo flotante
- **Móvil:** marca denominativa + hamburguesa (3 líneas, lima), menú superpuesto en pantalla completa

### Sección 2: Héroe (vídeo en pantalla completa)
- **Altura:** 100vh
- **Fondo:** video de capacitación en bucle en pantalla completa (Efecto 1)
- **Diseño de contenido:** `absolute inset-0 z-20 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24`
- **Contenido:**
 - Insignia de cejas: `[ ONLINE & ENTRENAMIENTO EN PERSONA ]` — texto lima, pastilla con borde
 - H1: `FORJA\nTU\nMEJOR YO` — Space Grotesk 700, blanco, 80px–160px responsivo, altura de línea 0,9, espacio entre letras -0,04em
 - Sublínea: `Sin atajos. Sin excusas. Solo resultados.`
 - Fila CTA: "INICIAR TU PROGRAMA" (relleno de lima, grande) + "VER TRANSFORMACIONES" (borde blanco fantasma)
 - Indicador de desplazamiento inferior: `↓ Desplazamiento` en lima, rebote animado

### Sección 3: Ticker de resultados
- Ticker de desplazamiento de ancho completo (Efecto 4)
- Colocado directamente debajo del héroe sin espacio

### Sección 4 — Acerca de
- **Diseño:** 2 columnas, 45 % de imagen/55 % de texto en el escritorio; imagen superior en el móvil
- **Imagen:**
 ```jsx
  {/* Image: athletic male personal trainer, direct confident eye contact, gym environment, dark background, wearing Forge-branded dark t-shirt, arms crossed showing muscle, professional fitness photography, high contrast dramatic lighting */}
  <img src="" alt="Forge trainer Marcus Webb in his training facility" className="w-full h-full object-cover object-center" />
  ```
- **Lado del texto:**
 - Ceja: `EL ENTRENADOR`
 - H2: `MARCUS WEBB`
 - Subtítulo: `8 años. 127 Clientes. Cero atajos.`
 - Párrafos biográficos (3)
 - Insignias de credenciales: `NASM-CPT · Nutrición de precisión L2 · NSCA-CSCS · Levantamiento de pesas de EE. UU.`

### Sección 5 — Programas
- **Relleno:** `py-24 px-6 md:px-16`
- **Ceja:** `LO QUE OFREZCO`
- **Encabezado:** `ELIGE TU RUTA`
- **Cuadrícula:** 3 tarjetas (ver Efecto 5)
- **Cada tarjeta:** borde superior lima (2px), nombre del programa (Espacio Grotesk 700 blanco), precio/mes, lista de viñetas de inclusiones, "Comenzar →" enlace lima

### Sección 6 — Transformaciones
- **Ceja:** `RESULTADOS REALES`
- **Título:** `LA PRUEBA ESTÁ EN CURSO`
- **3 controles deslizantes antes/después** en una fila (escritorio), apilados (móvil)
- **Debajo de cada control deslizante:** nombre del cliente + estadísticas (peso perdido/tiempo con Forge)

###Sección 7 — Testimonios
- **Fondo:** `--card`
- **4 tarjetas** en cuadrícula de 2x2 (escritorio), 1 columna (móvil)
- **Cada tarjeta:** fondo oscuro, brillo lima al pasar el mouse (Efecto 5), calificación de estrellas (5 estrellas lima), texto de cita (Inter Tight), nombre + tipo de programa insignia
- **Animación de entrada escalonada**

### Sección 8 — Preguntas frecuentes
- **Fondo:** `--background`
- **Elementos de acordeón:** shadcn Acordeón, sin bordes, cada Q en Space Grotesk 500 blanco, A en Inter Tight 300 silenciado
- **Chevron abierto:** color lima
- **Divisores:** 1px `--border`

### Sección 9 — Banner CTA
- **Ancho completo:** fondo lima eléctrico `--primary`
- **Todo el texto casi en negro:** `--primary-foreground`
- **Encabezado:** `¿LISTO PARA COMENZAR?`
- **Sublínea:** `Su primera sesión es una conversación. Sin presión, sin compromiso.`
- **Botón:** relleno casi negro, texto blanco, desplazamiento: gris oscuro bg

### Sección 10 — Pie de página
- **Fondo:** `#040404` (más oscuro que bg)
- **Borde superior lima 2px**
- **Diseño de 3 columnas (escritorio), apilado (móvil)**
- Col 1: marca denominativa FORGE (lima) + eslogan
- Col 2: enlaces rápidos
- Col 3: Redes sociales + identificador de Instagram
- Abajo: © + "Creado para las personas que aparecen".

---

## 7. Animaciones

### Hero Video Entry
- Letras H1: `initial={{ opacity: 0, y: 60 }}` → `animate={{ opacity: 1, y: 0 }}`
- Stagger: 0,05 s por carácter usando el enfoque de texto dividido, retraso: 0,5 s
- Duración: 0,7 s, facilidad: `[0,22, 1, 0,36, 1]`

### Botones Hero CTA
- `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- Retraso: 1,0 s (después del título), duración: 0,5 s

### Ticker
- Desplazamiento infinito lineal, `duración: 20, facilidad: 'lineal', repetición: Infinity`
- Se detiene al pasar el mouse: ` whileHover` se anima a `x: valor actual`

### Contadores de estadísticas (Acerca de)
- Cuenta atrás en inView, 2200 ms, 60 fps

### Tarjeta de programa flotante (Efecto 5)
- `box-shadow, border-color, transform` — all `transition: 0.3s facilidad`
- Resplandor: `0 0 30px rgba(181,240,48,0.35), 0 0 60px rgba(181,240,48,0.15)`

### Testimonial Stagger
-`initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}` → animar en inView
- retraso: `i * 0.1`, duración: 0.6s

### Preguntas frecuentes Accordion
- shadcn Acordeón con `AnimatePresence`, `altura: 0 → auto`, duración: 0.3s facilidad

### CTA Banner
- En inView: encabezado `initial={{ opacity: 0, scale: 0.95 }}` → `animate={{ opacity: 1, scale: 1 }}`
- Duración: 0,6 s, facilidad: `[0,22, 1, 0,36, 1]`

### Antes/Después Control deslizante
- La posición inicial se anima de 75 → 50 en el montaje: `useEffect` con interpolación suave

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca denominativa "FORGE" + hamburguesa (lima)
- Hero: tamaño de fuente H1 64px, contenido alineado a la izquierda, botones CTA apilados
- Ticker: igual (funciona en dispositivos móviles)
- Acerca de: foto superior de ancho completo (h-[60vw]), texto a continuación
- Programas: tarjetas apiladas de 1 columna
- Transformaciones: 1 columna apiladas, cada control deslizante de ancho completo
- Testimonios: 1 columna
- Preguntas frecuentes: igual (el acordeón se adapta naturalmente)
- CTA: texto centrado, fuente ligeramente más pequeña

### Tableta (768px–1024px)
- Hero: H1 100px
- Programas: diseño 2+1 o 3 columnas más ajustadas
- Transformaciones: 2 columnas (2 controles deslizantes uno al lado del otro, 1 a continuación)
- Testimonios: 2-col

### Escritorio (> 1024px)
- 2 columnas completas sobre
- Programas de 3 columnas
- Transformaciones de 3 columnas
- 2x2 testimonios

---

## 9. Copia completa

### Marca
**FORJA**

### Lemas
- "FORJA LO MEJOR SELF"
- "Sin atajos. No hay excusas. Solo resultados". 
- "Programas de entrenamiento creados para ti, no para el gimnasio". 

### Navbar
- Acerca de
- Programas
- Resultados
- Preguntas frecuentes
- [Botón] Comenzar hoy

### Hero
- Insignia: `[ COACHING EN LÍNEA Y EN PERSONA ]`
- H1: `FORJA\nTU\nMEJOR YO`
- Sublínea: `Sin atajos. Sin excusas. Solo resultados.`
- CTA Primario: `INICIA TU PROGRAMA`
- CTA Secundario: `VER TRANSFORMACIONES`
- Pista de desplazamiento: `↓ Desplazamiento`

### Ticker
`127 CLIENTES TRANSFORMADOS · 4.9★ CALIFICACIÓN PROMEDIO · 8AÑOS EN EL JUEGO · SIN ATAJOS. ALGUNA VEZ. · FORJA TU MEJOR YO · RESULTADOS O TE DEVOLVEMOS TU DINERO ·`

### Acerca de la Sección
- Ceja: `THE TRAINER`
- H2: `MARCUS WEBB`
- Subtítulo: `8 Años. 127 Clientes. Cero atajos.`
- Para 1: `No me convertí en entrenador para contar repeticiones. Me convertí en uno porque pasé años siendo la persona que necesitaba que alguien creyera en ella antes de que ella creyera en sí misma. Ese es el trabajo.`
- Párrafo 2: `Tengo certificaciones de NASM, Precision Nutrition y NSCA. Más importante aún, he estado en las trincheras con clientes en todos los niveles de condición física, desde principiantes hasta atletas competitivos, y he construido un historial que habla por sí solo.`
- Párrafo 3: `Mis programas no son iguales para todos. Se basan en su cuerpo, su horario, sus objetivos y su techo, que es más alto de lo que cree.`
- Insignias de credenciales: `NASM-CPT · Nutrición de precisión L2 · NSCA-CSCS · Levantamiento de pesas de EE. UU. L1`
- Estadísticas a continuación: 127 clientes · Calificación promedio de 4,9★ · 8 años experiencia

### Sección de Programas
- Ceja: `LO QUE OFREZCO`
- H2: `ELIGE TU CAMINO`

**Programa 1 — Capacitación 1 a 1**
- Insignia: `MÁS PERSONAL`
- Precio: Desde $350 / mes
- Incluye:
 - 3 sesiones presenciales de 60 minutos/semana
 - Programa de entrenamiento totalmente personalizado
 - Orientación nutricional semanal
 - Registro diario a través de la aplicación
 - Progreso mensual evaluación
 - Revisiones de formularios en video entre sesiones
- CTA: `Solicite 1 a 1 →`

**Programa 2 — Entrenamiento en línea**
- Insignia: `MÁS POPULAR`
- Precio: Desde $150 / mes
- Incluye:
 - Programa de entrenamiento personalizado (actualizado mensualmente)
 - Plano de macro y nutrición
 - Videollamada de control semanal
 - Soporte de mensajes ilimitado
 - Rastreador de programación basado en aplicaciones
 - Acceso a la comunidad privada de Forge
- CTA: `Comenzar en línea →`

**Programa 3 — Capacitación en grupo**
- Insignia: `MEJOR VALOR`
- Precio: Desde $80 / mes
-Incluye:
 - 4 x sesiones grupales/semana (máximo 8 personas)
 - Programación compartida, atención individual
 - Taller mensual de nutrición grupal
 - Acceso y seguimiento de aplicaciones
 - Responsabilidad comunitaria
- CTA: `Unirse a un grupo →`

### Sección Transformaciones
- Ceja: `RESULTADOS REALES`
- H2: `LA PRUEBA ESTÁ EN PROGRESO`

**Cliente 1:**
- Nombre: James T.
- Estadísticas: Perdió 42 libras · 6 meses con Forge
- Antes de alt: `Antes: James, sin entrenamiento, peso extra, ropa casual, fondo neutro`
- Después de alt: `Después: James, constitución atlética, postura segura, tono muscular visible, mismo fondo neutro`

**Cliente 2:**
- Nombre: Priya M.
- Estadísticas: Perdió 28 libras + desarrolló 12 libras de músculo · 9 meses con Forge
- Antes de alt: `Antes: Priya, antes de la transformación, gimnasio informal, iluminación plana`
- Después de alt: `Después: Priya, físico atlético delgado, ambiente de gimnasio, dramático mejora`

**Cliente 3:**
- Nombre: Ryan K.
- Estadísticas: Pasó de 165 lbs a 195 lbs (músculo) · 12 meses con Forge
- Antes de alt: `Antes: Ryan, complexión delgada, simple camiseta`
- Después de alt: `Después: Ryan, complexión atlética y musculosa, mismo fondo liso`

### Sección de testimonios
- Ceja: `EL CLIENTE GANA`
- H2: `NO CONFÍE EN MI PALABRA`

**Testimonio 1:**
> "Marcus no solo entrena tu cuerpo, también entrena tu mentalidad. Seis meses después, bajé 42 libras y realmente disfruto del entrenamiento por primera vez en mi vida".
> — *James T., cliente 1 a 1* ★★★★★

**Testimonio 2:**
> "El programa en línea es tan efectivo como el entrenamiento en persona. Los controles semanales me hacen responsable y la programación es brillante. He logrado relaciones públicas que pensé que faltaban años". 
> — *Priya M., cliente de entrenamiento en línea* ★★★★★

**Testimonio 3:**
> "Probé con otros tres entrenadores antes de Forge. Ninguno de ellos realmente me escuchó. Marcus creó un programa que se adapta a mi vida, no al revés".
> — *Sarah W., cliente 1 a 1*★★★★★

**Testimonio 4:**
> "Las sesiones grupales tienen la energía de una clase con la programación de un entrenador personal. La mejor inversión en fitness que he hecho jamás."
> — *David L., cliente de entrenamiento grupal* ★★★★★

### Sección de preguntas frecuentes
- H2: `PREGUNTAS RESPONDIDAS`

**P1: ¿Dónde resides y entrenas de forma remota?**
A: Mi gimnasio físico está en Austin, Texas. Todas las sesiones presenciales se realizan allí. El coaching en línea es totalmente independiente de la ubicación: tengo clientes en EE. UU., Reino Unido, Canadá y Australia. Todo se ejecuta a través de mi aplicación de entrenamiento.

**P2: ¿Qué tan rápido veré resultados?**
A: La mayoría de los clientes notan cambios en la energía y el rendimiento dentro de 2 a 3 semanas. Los cambios físicos visibles generalmente se vuelven evidentes entre las semanas 6 y 8, según la consistencia, el punto de partida y los objetivos. Seré honesto con usted acerca de los plazos desde el primer día. 

**P3: ¿Necesito tener experiencia para trabajar con usted?**
A: Por supuesto que no. He entrenado a principiantes, clientes que regresan después de años y atletas competitivos. El programa se adapta a ti, no al revés. Si estás nervioso, es normal. Simplemente preséntate.

**P4: ¿Qué incluye la guía nutricional?**
A: Todos los programas incluyen objetivos macro y principios de nutrición que dan prioridad a los alimentos. Los planes premium incluyen un plan de comidas detallado, ajustes semanales y revisión del registro de alimentos. No creo en dietas insostenibles: te enseñaré a comer de una manera que puedas mantener de por vida.

**P5: ¿Cuál es tu política de cancelación?**
A: Contratos mensuales en todos los programas. Cancela en cualquier momento con 14 días de antelación. Sin cargos ocultos, sin penalizaciones. Prefiero que te quedes porque está funcionando, no porque estés encerrado.

### Sección CTA
- H2: `¿LISTO PARA COMENZAR?`
- Sublínea: `Tu primera sesión es una conversación. Sin presión, sin compromiso.`
- Subsublínea: `Reserve una llamada de consulta gratuita de 20 minutos y averigüemos si encajamos.`
- CTA: `RESERVE SU LLAMADA GRATUITA`
- Nota de confianza: `Sin tarjeta de crédito. Sin compromiso. Solo una conversación.`

### Pie de página
- FORGE (marca denominativa lima)
- Lema:`Creado para personas que se presentan.`
- Enlaces: Acerca de · Programas · Resultados · Preguntas frecuentes · Contacto · Política de privacidad
- Instagram: @forgebymarcos
- Correo electrónico: marcus@forgetraining.co
- © 2024 Forge. Reservados todos los derechos. Austin, Texas.

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

**Adiciones de configuración de Tailwind:**
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      },
      colors: {
        'forge-black': '#080808',
        'forge-lime': '#b5f030',
        'forge-white': '#fafafa',
      },
    },
  },
};
```
