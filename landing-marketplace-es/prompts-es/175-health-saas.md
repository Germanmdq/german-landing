# Sitio web Health SaaS: AI Prompt (MERIDIAN)

## Goal
Cree un sitio web de marketing SaaS completo para **Meridian**, una plataforma de inteligencia de salud preventiva impulsada por IA que conecta análisis de sangre, dispositivos portátiles y datos de estilo de vida en un solo panel. Modo claro, base blanca limpia y un único acento en rojo intenso. El diseño se siente clínicamente premium sin ser frío: piense que una marca de salud de alta gama se combina con la precisión moderna de SaaS. Piense en Function Health, Levels o la energía del sitio web de AG1, pero más nítidos y con más datos.

---

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react

---

## Sistema de diseño - Colores

```css
:root {
  --white:        #ffffff;
  --off-white:    #fafaf9;
  --surface:      #f4f4f2;
  --border:       #e8e6e1;
  --border-hi:    #d4d0c8;
  --ink:          #111110;
  --ink-2:        #1c1c1a;
  --soft:         #72716d;
  --softer:       #a8a5a0;
  --red:          #c8102e;    /* primary accent — deep medical red */
  --red-light:    #fdf2f4;    /* tinted bg for badges, pills */
  --red-mid:      #f5c5cc;    /* border tint */
  --red-dark:     #9e0d24;    /* hover state */
}
```

Antecedentes: `--white` / `--off-white` secciones alternas. Texto: `--ink`. Acento: `--red`: se utiliza en CTA principales, estados activos, aspectos destacados de gráficos, números de estadísticas, indicadores de desplazamiento y tarjetas de información de IA. Todas las fronteras: `--border`. Tarjetas: `--surface`. Cero sombras excepto una sutil `box-shadow: 0 1px 3px rgba(0,0,0,0.06)` en la maqueta del tablero. Radio del borde: 10–14 px en tarjetas, 6 px en botones/insignias, 100 px en pastillas.

---

## Tipografía

```
Google Fonts:
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap
```

- **Display/headings**: `Plus Jakarta Sans`, peso 800, espacio entre letras -0.04em
- **Subtítulos**: Plus Jakarta Sans 700, espacio entre letras -0.02em
- **Cuerpo**: Plus Jakarta Sans 400, altura de línea 1.7
- **Etiquetas/datos mono / precios / marcas de tiempo**: `JetBrains Mono`, 10–12 px, espacio entre letras 0,06 em, mayúsculas

```css
.mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--soft);
}
```

Título de héroe: `clamp(52px, 6.5vw, 88px)`.
Encabezados de sección: `clamp(36px, 4vw, 56px)`.

---

## Efectos visuales

### 1. Maqueta de tablero: pieza central del héroe
La imagen dominante del héroe es un tablero enmarcado en el navegador maqueta:

```jsx
<div className="relative rounded-xl border border-[--border] shadow-[0_8px_48px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
  {/* Browser chrome */}
  <div className="flex items-center gap-2 px-4 py-3 bg-[--surface] border-b border-[--border]">
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-[--border]" />
      <div className="w-3 h-3 rounded-full bg-[--border]" />
      <div className="w-3 h-3 rounded-full bg-[--border]" />
    </div>
    <div className="flex-1 mx-4 h-6 bg-[--border] rounded-md" />
  </div>
  {/* Dashboard content — see component breakdown */}
</div>
```

### 2. Entrada gradual escalonada
```js
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
```
Aplicado a bloques de texto de héroe, tarjetas de estadísticas, tarjetas de funciones en el desplazamiento.

### 3. Pulso de tarjeta métrica (AI insight)
La tarjeta de insight de IA tiene un borde izquierdo sutil que pulsa:
```css
@keyframes insight-pulse {
  0%, 100% { border-left-color: var(--red); }
  50%       { border-left-color: var(--red-mid); }
}
.insight-card {
  border-left: 3px solid var(--red);
  animation: insight-pulse 3s ease-in-out infinite;
}
```

### 4. Contador de estadísticasanimación
Los números cuentan desde 0 usando Framer Motion `useMotionValue` + `useSpring`:
```js
const spring = useSpring(0, { stiffness: 60, damping: 18 });
// On in-view: spring.set(targetValue)
// Display: Math.round(latest).toLocaleString()
```

### 5. Desplazamiento sobre la barra del gráfico (resaltado en rojo)
```css
.chart-bar {
  background: var(--border);
  transition: background 0.15s ease;
  border-radius: 3px 3px 0 0;
}
.chart-bar:hover,
.chart-bar.active { background: var(--red); }
```

### 6. Tarjeta de función flotante
```css
.feature-card {
  border: 1.5px solid var(--border);
  transition: border-color 0.2s, transform 0.2s;
}
.feature-card:hover {
  border-color: var(--red-mid);
  transform: translateY(-2px);
}
.feature-card:hover .feat-num { color: var(--red); }
```

### 7. Marco de logotipo horizontal
Desplazamiento continuo del socio de integración logotipos/nombres:
```css
@keyframes scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track { animation: scroll 28s linear infinite; }
```

---

## Desglose de componentes

### 1. Barra de navegación (fija, z-100)
Fondo blanco `--white`, `--border` abajo, `backdrop-filter: blur(12px)`.

Diseño: marca izquierda · centro de navegación · CTA derecha.
- Marca: `Meridian` en Plus Jakarta Sans 800, 18px, `--ink`. Pequeño punto rojo `·` después del nombre: `<span style="color: var(--red)">.</span>`
- Enlaces de navegación: Funciones · Integraciones · Precios · Ciencia · Blog — Plus Jakarta Sans 500, 14px, `--soft`, `--ink` al pasar el mouse
- Derecha: `Iniciar sesión` (botón fantasma) + `Comenzar gratis →` (botón de relleno rojo)
- Botones: relleno vertical de 8px, horizontal de 18px, radio de 6px

Fantasma: `border: 1.5px solid var(--border)`, texto `--soft`.
Primario: `background: var(--red)`, texto blanco, desplazamiento `--red-dark`.

Móvil: hamburguesa → superposición blanca en pantalla completa, enlaces apilados, grande.

### 2. Héroe (§ 01)
Fondo blanco. Diseño centrado, ancho máximo 1200 px.

**Insignia de confianza** (arriba, centrado):
```jsx
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[--border] bg-[--surface] text-xs font-mono text-[--soft]">
  <span className="w-1.5 h-1.5 rounded-full bg-[--red] animate-pulse" />
  Trusted by 40,000+ members · HIPAA Compliant · SOC 2 Type II
</div>
```

**Título** (centrado, ancho máximo 780px):
```
Your health data,
finally connected.
```
Plus Jakarta Sans 800, `clamp(52px, 6.5vw, 88px)`, `--ink`. Espacio entre letras -0,04 em. Altura de línea 1.05.
Segunda línea `"finalmente conectado".`: la palabra `conectado` tiene un color `--red`.

**Sublínea** (centrada, ancho máximo 520 px, `--soft`, 18 px):
 "Meridian combina tu sangre datos de trabajo, dispositivos portátiles y estilo de vida en un panel inteligente, y utiliza IA para sacar a la luz información antes de que se conviertan en síntomas". 

**Fila de CTA** (centrada, espacio de 12 px):
- `Comience gratis, no se necesita tarjeta`: relleno rojo, 52 px de alto, 24 px de relleno en h, radio de 8 px, además de Jakarta Sans 700 16px
- `Ver demostración de 2 minutos ▶` — fantasma, mismo tamaño

**Tira de confianza** (mono, centrada, `--softer`, espacio de 24 píxeles con separadores `·`):
`Cumple con HIPAA · SOC 2Tipo II · Más de 40 integraciones de laboratorio · Cancelar en cualquier momento`

**Maqueta de tablero** (ancho completo debajo del texto principal, ancho máximo 1000 px, centrado):

Navegador cromado (como arriba) que envuelve un diseño de tablero de dos paneles:

Panel izquierdo: barra lateral (200 px de ancho, `--surface` bg, `--border` borde derecho):
- Logotipo + fila de avatar de usuario en la parte superior
- Elementos de navegación: descripción general (activo, `--red-light` bg, texto `--red`) · Biomarcadores · Sueño · Actividad · Información sobre IA · Informes · Configuración
- Cada elemento: 10px 12px de relleno, radio de 6px, mono 11px

Panel derecho - panel principal:
- **Fila de encabezado**: "Descripción general de salud" Plus Jakarta Sans 700 16px + fecha en mono a la derecha + botón fantasma `Exportar PDF`

- **Fila de KPI** (3 tarjetas, espacio de 12 px): 
 ```
  HRV Score        Sleep Score      Ferritin
  68 ms            82 / 100         34 ng/mL
  ↑ +4 pts         7h 14m avg       ↓ Trending low
  [green]          [ink]            [amber #f59e0b]
  ```
 Cada tarjeta de KPI: `--surface` bg, borde `--border`, radio de 10 px, relleno de 16 px. Valor 
: más Jakarta Sans 800 28 px. Delta: JetBrains Mono 10px.

- **Gráfico** (tarjeta de ancho completo debajo de los KPI, `--surface` bg):
 Título: "HRV — Tendencia de 90 días" mono 10px.
 Gráfico de barras: 14 barras, diferentes alturas, 4 barras resaltadas `--red` (días pico recientes), otros `--border`.
 Etiquetas del eje X: mono 9px, `--softer`.

- **Tarjeta AI Insight** (ancho completo, debajo del gráfico):
 `background: var(--red-light)`, `border: 1.5px solid var(--red-mid)`, `border-left: 3px solid var(--red)`, animación pulsante.
 ```
  ⚡ AI Insight — action recommended
  Your ferritin dropped 18% over 6 weeks. Combined with your declining
  sleep quality and increased fatigue markers, this suggests early iron
  depletion. Review dietary iron sources or consider retesting in 4 weeks.
  [View recommendation →]
  ```
 Fondo del icono: `--red-light`. Título: Plus Jakarta Sans 700 13px `--red`. Cuerpo: 13px `--soft`. Enlace: `--red`, subrayado al pasar el cursor.

### 3. Barra de estadísticas (§ separador)
`--off-white` fondo, `--border` arriba y abajo. Cuatro estadísticas seguidas, centradas.

```
40,000+          94%           840+          48h
Active members   Lab accuracy  Correlations  First insight
```

Numbers: Plus Jakarta Sans 800, 44px, `--ink`. Coma/símbolo rojo en el número resaltado.
Etiquetas: JetBrains Mono 10px, `--soft`.
Animación de conteo al desplazarse.

Divisores: 1px `--border` vertical entre cada estadística.

### 4. Marco de integraciones (§ separador)
`--white` fondo, `--border` arriba y abajo, 56px de alto.
Etiqueta Mono a la izquierda: `INTEGRA CON` JetBrains Mono 10px `--softer`.
Marco: `Apple Health ·WHOOP · Oura Ring · Garmin · LabCorp · Quest Diagnostics · 23andMe · Fitbit · Samsung Health · Withings · ·` — duplicado para un bucle continuo. Plus Jakarta Sans 600 14px `--border-hi` color, `--soft` al pasar el mouse.

### 5. Características (§ 02)
`--off-white` fondo.

Encabezado de sección (centrado):
- Rojo insignia de la píldora: `CÓMO FUNCIONA` en JetBrains Mono 10px, `--red`, `--red-light` bg, `--red-mid` border
- H2: `Tres pasos hacia la claridad de la salud.`
- Sub: "Sin informes confusos. Sin entrada manual de datos. Solo patrones que importan". `--soft`.

Tres cartas seguidas. Cada tarjeta: bg blanco, `--border` 1.5px, radio de 14px, relleno de 28px.
Al pasar el mouse: borde `--red-mid`, `translateY(-2px)`.

Tarjetas:
1. **Conecte sus laboratorios** — `01 /` mono red label
 Cargue archivos PDF de análisis de sangre o conéctese directamente con LabCorp, Quest y más de 40 laboratorios asociados. Analizamos y normalizamos cada biomarcador automáticamente, retrocediendo hasta su prueba más antigua.
 Icono: 40×40 `--red-light` bg, radio de 8px, icono de tubo de ensayo rojo (lucide `FlaskConical`)

2. **Sincroniza tus dispositivos portátiles** — `02 /` mono
 Integra Apple Health, Garmin, Whoop, Oura y Fitbit con un solo toque. Meridian superpone sus datos biométricos (VFC, etapas del sueño, actividad) directamente en la línea de tiempo de su laboratorio.
 Icono: Lucide `Watch`

3. **La IA lee la imagen completa** — `03 /` mono
 Nuestro modelo muestra correlaciones en todo su conjunto de datos de salud, detectando tendencias meses antes de que aparezcan en un informe de salud estándar o en un chequeo anual.
 Icono: lucide `BrainCircuit`

### 6. División profunda de funciones (§ 03)
Blanco fondo. Filas alternas: imagen izquierda/contenido derecha, luego contenido izquierda/imagen derecha.

**Fila 1: seguimiento longitudinal:**
Izquierda: gráfico visual anotado (descrito como resumen de imagen)
Derecha: ceja `SEGUIMIENTO DE BIOMARCADORES` · H3: `Ver años de datos, no solo la instantánea de hoy.` · Cuerpo: "La mayoría de las aplicaciones de salud le muestra un número y un rango normal le muestra su número en cada prueba, para que pueda ver la variación a lo largo de meses, no solo un momento en el tiempo". · Lista de funciones: ` ✓ AutomáticoAnálisis de PDF` ` ✓ Normalización entre laboratorios` ` ✓ Línea de tendencia con anotaciones` ` ✓ Informes resumidos compartibles`
```
{/* Chart image: clean line graph showing a biomarker (ferritin) declining over 8 data points across 18 months, annotated with event markers, white background, red accent on trend line, clinical data visualization aesthetic */}
```

**Fila 2 — AI Insights:**
Izquierda: ceja `AI INTELIGENCIA` · H3: `Información que su médico no tiene tiempo de encontrar.` · Cuerpo: "La IA de Meridian compara más de 840 correlaciones de salud publicadas con su conjunto de datos personales. No le brinda consejos genéricos, le brinda su propia visión, basada en su patrón". · Tres ejemplos de píldoras de información que se muestran en línea: `↓ Ferritina × Patrón de fatiga` / ` ↑ VFC × Calidad del sueño` / `⚡ Cortisol × Horario de ejercicio`
Derecha: información visual de información
```
{/* Insight feed image: clean card-based UI showing 4 AI-generated health insights, white background, red accent indicators, each card shows a correlation finding with a confidence score and recommendation — clinical but approachable design */}
```

**Fila 3: superposición portátil:**
Izquierda: portátil gráfico superpuesto visual
Derecha: ceja `INTEGRACIÓN WEARABLE` · H3: `Los resultados de tu laboratorio, en el contexto de tu vida.` · Cuerpo: "El análisis de sangre es una instantánea. Tus wearables son una película. Meridian coloca los resultados de tu laboratorio directamente en tu VFC, sueño y cronograma de actividad, por lo que el contexto siempre es visible".
Tira de logotipos de integración: Apple Health · WHOOP · Oura · Garmin · Fitbit
```
{/* Wearable overlay image: dashboard showing a biomarker timeline overlaid with sleep quality bars and HRV line, red and grey color system, white background, precise data visualization with clear legend */}
```

### 7. Testimonios (§ 04)
`--off-white` antecedentes.

Encabezado de sección: H2 `Lo que dicen los miembros.` · sub `--soft`.

Tres tarjetas testimoniales seguidas. Cada uno: bg blanco, borde `--border`, radio de 14 px, relleno de 28 px.
- Estrellas: `★★★★★` en `--red`
- Cita: Plus Jakarta Sans 400 15px, altura de línea 1.7
- Autor: círculo de avatar (40px) + nombre Plus Jakarta Sans 600 14px + rol JetBrains Mono 10px `--soft`

Tres testimonios:
1. *"He tenido fatiga inexplicable durante dos años. Los médicos seguían diciendo que mis análisis de laboratorio eran 'normales'. Meridian me mostró una tendencia descendente lenta de ferritina en 4 pruebas que nadie había detectado. Seis meses después de tomar suplementos de hierro, me siento como una persona diferente".*
 — **Sophie M.** · Diseñadora de productos, Londres · miembro desde 2024

2. *"La función de correlación HRV + sueño por sí sola vale la pena suscribirse. Puedo ver exactamente en qué semanas mi recuperación estuvo interrumpida y rastrearlo hasta eventos de estrés específicos o carga de entrenamiento. Es como tener un científico deportivo para mitrabajo de escritorio."*
 — **Marcus T.** · Ingeniero de software, Berlín · miembro desde 2023

3. *"Trabajo en oncología y estoy obsesionado con la salud preventiva. Meridian es el único producto de consumo que he encontrado que realmente realiza correctamente el análisis longitudinal. El razonamiento de la IA es citado, cauteloso y genuinamente útil, no alarmista."*
 — **Dra. Priya K.** · Investigadora de Oncología, Boston · miembro desde 2024

### 8. Precios (§ 05)
Fondo blanco.

Encabezado de sección: H2 `Precios simples y honestos.` · sub: "Sin ventas adicionales. Sin venta de datos. Sin anuncios."

Tres tarjetas seguidas. Tarjeta del medio destacada: fondo `--ink`, texto blanco, acento rojo.

**Inicio** (Gratis):
- $0/mes
- Hasta 3 cargas de análisis de sangre por año · Sincronización con Apple Health · Seguimiento de tendencias básico · 5 insights de IA por mes · Exportación de PDF
- CTA: `Comience gratis` (esquema)

**Core** (más popular) - tarjeta destacada:
- $19 / mes · facturado anualmente ($228/año)
- Cargas ilimitadas de análisis de sangre · Todas las integraciones portátiles · Motor completo de información de IA · Correlaciones ilimitadas · PDF compartido por médicos · Soporte prioritario
- CTA: `Iniciar prueba de 14 días` (relleno rojo → en tarjeta oscura: relleno blanco con texto en tinta)
- Insignia: `MÁS POPULAR` JetBrains Mono 10px rojo encima de la tarjeta

**Pro** (Para profesionales de la salud):
- $49 / mes · facturado anualmente
- Todo en Core · Acceso API · Perfil múltiple (familia) · Exportación de datos sin procesar (CSV/JSON) · Analista de datos de salud dedicado (1× llamada mensual)
- CTA: `Iniciar prueba de 14 días` (esquema)

A continuación se muestran los precios: `Todos los planes incluyen una prueba gratuita de 14 días · No se requiere tarjeta de crédito · Cancelar en cualquier momento` — JetBrains Mono 11px `--soft`, centrado.

### 9. Preguntas frecuentes (§ 06)
`--off-white` fondo.

Dos columnas: H2 izquierda (`Antes de preguntar.`) + acordeón derecha (6 elementos).

Acordión: borde inferior `--border` entre elementos. `+` → `×` alternar en `--red` Las diapositivas del panel se abren con animación de altura máxima.

Preguntas y respuestas:
1 **¿Están seguros mis datos de salud?** - Sí. y SOC 2 Tipo IIcertificado. Sus datos están cifrados en reposo (AES-256) y en tránsito (TLS 1.3). Nunca vendemos ni compartimos sus datos. Nunca entrenamos modelos con sus datos personales de salud sin su consentimiento explícito.
2. **¿Qué formatos de laboratorio admite?**: Aceptamos cargas de PDF de los principales laboratorios de EE. UU., incluidos LabCorp, Quest, BioReference y Sonora Quest. También admitimos conexiones API directas con LabCorp y Quest para la sincronización automática de resultados.
3. **¿Qué dispositivos portátiles son compatibles?**: Apple Health, Garmin Connect, WHOOP, Oura Ring, Fitbit, Samsung Health y Withings. Agregaremos Polar y Amazfit en el tercer trimestre de 2026.
4. **¿Qué tan preciso es el análisis de IA?** — Los modelos de correlación de Meridian logran una precisión del 94 % en comparación con los estándares de referencia clínicos en nuestro estudio de validación (n=2400, publicado en 2025). Todos los conocimientos de IA incluyen puntuaciones de confianza y citas de fuentes. Señalamos cuando los datos son insuficientes para sacar una conclusión.
5. **¿Puedo compartir mis resultados con mi médico?** — Sí. Cada informe se puede exportar como un PDF limpio de una página formateado para su revisión clínica. Los suscriptores Core y Pro también pueden compartir un enlace en vivo de solo lectura directamente con su proveedor.
6. **¿Cuál es su política de retención de datos?** — Sus datos se conservan mientras su cuenta esté activa. Si cancelas, tienes 90 días para exportar todo. Después de eso, todos los datos personales se eliminan permanentemente. Nunca tomamos datos como rehenes.

### 10. Banner CTA (§ 07)
`--red` sección de fondo. Centered.

H2: `Empiece a comprender su salud hoy mismo.` — Plus Jakarta Sans 800, `clamp(40px, 5vw, 64px)`, white.
Sub: "Únase a más de 40 000 miembros que obtienen información mensual a partir de sus propios datos". — opacidad blanca 0.8.

Dos botones:
- `Comenzar gratis — no se necesita tarjeta` — fondo blanco, texto `--red`, Plus Jakarta Sans 700
- `Ver una demostración →` — borde de contorno blanco, texto blanco

Abajo: `HIPAA Cumple · SOC 2 Tipo II · Más de 40 integraciones` — JetBrains Mono 10px opacidad blanca 0.5.

### 11. Pie de página
`--off-white` fondo, `--border` arriba.

Logo + una línea a la izquierda: `Meridian·` + "Inteligencia sanitaria preventiva basada en IA".

Cuatro columnasnav:
- **Producto**: Funciones / Integraciones / Precios / Seguridad / Registro de cambios
- **Ciencia**: Cómo funciona / Investigación / Precisión / Validación clínica
- **Empresa**: Acerca de / Blog / Carreras / Prensa
- **Legal**: Política de privacidad / Términos / Aviso de HIPAA / Datos Export

Barra inferior: `© 2026 Meridian Health Inc.` izquierda · `HIPAA · SOC 2 · Construido con cuidado en San Francisco` derecha. JetBrains Mono 10px `--softer`.

---

## Resumen de animaciones

| Elemento | Animación | Sincronización |
|---|---|---|
| Bloques de texto de héroe | `opacity 0→1, y 24→0` tambalear | 0,5s, 0,07s por bloque |
| Maqueta de tablero | `opacity 0→1, y 40→0` | 0,7 s retraso 0,3 s |
| Estadísticas | cuenta atrás en desplazamiento | Rigidez `useSpring` 60 |
| Carpa de integración | `translateX(-50%)` infinito | 28v lineal |
| Tarjetas de características | desvanecimiento tambalear | 0,5 s, 0,1 s por tarjeta |
| Colocar el cursor sobre la fila de funciones | `translateY(-2px)` + borde | 0,2 s de facilidad |
| Pulso de conocimiento de la IA | color del borde izquierdo | 3s fácil entrada y salida infinita |
| Las barras del gráfico flotan | fondo `--red` | 0,15 s de facilidad |
| Tarjetas de testimonios | desvanecimiento tambalear | 0,5 s, 0,1 s por tarjeta |
| Panel de acordeón | diapositiva `max-height` | 0,3 s de facilidad |
| Sección CTA | desvanecimiento | 0.6s |

Todo activado por desplazamiento: `IntersectionObserver`, umbral 0.1, rootMargin `0px 0px -60px 0px`.

---

## Responsive

- **Escritorio (≥1280px)**: Hero centrado con panel debajo, funciones de 3 columnas, precios de 3 columnas, testimonios de 3 columnas.
- **Tableta (768–1279px)**: Hero de una sola columna apilada (texto → panel), funciones 2+1, desplazamiento horizontal de precios con complemento, testimonios 2+1.
- **Móvil (<768px)**: Todo en una sola columna. Botones Hero CTA de ancho completo. Maqueta del panel simplificada: muestra solo tarjetas de KPI, sin barra lateral. Estadísticas de cuadrícula 2×2. Las tarjetas de precios se desplazan horizontalmente con un clic. Imágenes destacadas ocultas en dispositivos móviles, solo contenido.

---

## Referencia de copia completa

**Marca**: Meridian
**Lema**: Tus datos de salud, finalmente conectados.
**Categoría**: Salud preventivainteligencia / Salud SaaS
**Usuario objetivo**: adultos preocupados por su salud que se hacen análisis de sangre con regularidad, usan dispositivos portátiles y desean comprender sus datos longitudinalmente
**Diferenciador clave**: análisis longitudinal de IA: detecta tendencias a lo largo de meses de datos, no solo un resultado
**Cumplimiento**: HIPAA, tipo SOC 2 II
**Ubicación**: San Francisco, CA

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx",
  "@radix-ui/react-accordion": "^1.x",
  "@radix-ui/react-tabs": "^1.x"
}
```

---

## Rápido Notas
: el nombre de la marca `Meridian` cambia a cualquier nombre de SaaS de salud: actualice el héroe H1 y copie todo en consecuencia. 
- El rojo `#c8102e` es el color de acento único; funciona para la salud porque se lee como clínico y autorizado en lugar de alarmante. Cambie a `#0ea5e9` (azul cielo) o `#16a34a` (verde saludable) si lo prefiere. 
: la maqueta del tablero en el héroe es un componente de interfaz de usuario codificado, no una captura de pantalla. Esto significa que el creador de IA realmente lo renderizará, haciéndolo preciso e interactivo desde el primer día.