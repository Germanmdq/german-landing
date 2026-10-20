# Fundación Riverbend — Aviso del sitio web de una organización sin fines de lucro

## 1. Declaración de objetivos
Crear un sitio web sin fines de lucro cálido y basado en evidencia para **Fundación Riverbend**, una organización de aguas limpias y cuencas hidrográficas, definida por el tipo marfil suave, verde azulado intenso y humanista, con una sección de impacto basada en números reales y un flujo de donaciones que nunca pierde el lector.

---

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## 3. Sistema de diseño - Colores

```css
:root {
  --background: hsl(42, 40%, 97%);       /* #fbf8f2 warm ivory */
  --foreground: hsl(196, 32%, 15%);      /* #1a2f33 deep slate-teal */
  --primary: hsl(186, 58%, 26%);         /* #1c6a6f deep teal */
  --primary-foreground: hsl(42, 40%, 98%);
  --muted-foreground: hsl(196, 10%, 44%);
  --border: hsl(40, 20%, 87%);
  --card: hsl(42, 42%, 94%);
  --accent-warm: hsl(24, 82%, 56%);      /* donate / urgency accent */
  --accent-soft: hsl(186, 34%, 88%);     /* pale teal wash */
}
```

---

## 4. Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- **H1 / hero:** `'Source Serif 4', serif;` peso 600, clamp(38px, 5vw, 68px), altura de línea: 1.1
- **H2:** Source Serif 4 600, 32–44px
- **H3 / títulos de tarjetas:** Inter 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea: 1,78
- **Cejas:** Inter 600, mayúsculas, espacio entre letras: 0,16em, 11px, verde azulado
- **Números de impacto:** Source Serif 4 600, tabular, clamp(44px, 6vw, 84px)

---

## 5. Efectos visuales

### Efecto 1: Selector de cantidad de donación con traducción de impacto
```tsx
const tiers = [
  { amount: 25,  impact: 'provides a household water filter for one year' },
  { amount: 60,  impact: 'funds one week of river-quality monitoring' },
  { amount: 150, impact: 'trains a volunteer steward for a full season' },
  { amount: 400, impact: 'restores 100 feet of eroded streambank' },
];
const [selected, setSelected] = useState(60);
const [custom, setCustom] = useState('');

<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
  {tiers.map(t => (
    <button
      key={t.amount}
      onClick={() => { setSelected(t.amount); setCustom(''); }}
      className="rounded-lg border-2 py-4 font-serif text-2xl transition-all duration-200"
      style={{
        borderColor: selected === t.amount ? 'var(--primary)' : 'var(--border)',
        background: selected === t.amount ? 'var(--accent-soft)' : 'transparent',
      }}
    >
      ${t.amount}
    </button>
  ))}
</div>
<AnimatePresence mode="wait">
  <motion.p
    key={selected}
    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.28 }}
    className="mt-4 text-center text-[var(--muted-foreground)]"
  >
    Your ${selected} {tiers.find(t => t.amount === selected)?.impact}.
  </motion.p>
</AnimatePresence>
```

### Efecto 2: Contador de impacto Row
```
Numbers count up from 0 on useInView, 2000ms, ease-out
Each number sits above a thin teal rule that scales in from the left
```

### Efecto 3: Tarjeta de historia con imagen Duotono Wash
```jsx
<div className="group relative overflow-hidden rounded-xl">
  {/* Image: community volunteers planting native grasses along a riverbank, natural daylight, candid documentary photography, warm and hopeful mood */}
  <img src="" alt="Volunteers restoring a riverbank" className="w-full aspect-[4/3] object-cover object-center transition-transform duration-700 group-hover:scale-105" />
  <div className="absolute inset-0 mix-blend-multiply opacity-30 transition-opacity duration-500 group-hover:opacity-0" style={{ background: 'var(--primary)' }} />
  <div className="absolute inset-x-0 bottom-0 p-6" style={{ background: 'linear-gradient(to top, rgba(26,47,51,0.92), transparent)' }}>
    <span className="text-xs uppercase tracking-[0.16em] text-white/80">Field Story</span>
    <h3 className="mt-2 font-serif text-2xl text-white">Bringing the Muddy Fork back</h3>
  </div>
</div>
```

### Efecto 4: Suave Fade-Up
```
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
```

---

## 6. Desglose de componentes

### Sección 1: barra de navegación
- 76px, `sticky top-0 z-40`, marfil con `backdrop-blur` y borde inferior de 1px después del desplazamiento
- Izquierda: marca de curva del río verde azulado (curva SVG simple) + "RIVERBEND" (Fuente Serif 600) + "FOUNDATION" (Inter 600, 9px, espacio entre letras)
- Centro: Nuestro trabajo · Impacto · Involucrarse · Acerca de · Noticias
- Derecha: `Donate` — relleno de naranja cálido, `redondeado-lleno`, siempre visible
- Móvil: marca + pastilla `Donate` + hamburguesa

### Sección 2 — Héroe (dividido, imagen derecha)
- `min-h-[86vh]`, 12 columnas: columnas de texto 1–6, columnas de imagen 7–12 (borde derecho a sangrado completo)
- Ceja: `PROTEGIENDO LA CUENCA DE RIVERBEND DESDE 1997`
- H1: `El agua limpia no es\una causa. Es\ninfraestructura.`
- Sublínea: `Monitoreamos,restaurar y defender 340 millas de río en tres condados, con voluntarios, ciencia y un personal muy reducido.`
- Fila CTA: `Donar` (naranja) + `Ver nuestro impacto` (contorno verde azulado)
- Línea de confianza: `Charity Navigator 4-Star · 89 centavos de cada dólar se destinan a programas`
```jsx
{/* Image: wide river bend framed by green banks in soft morning light, mist on the water, calm and hopeful, natural landscape photography */}
<img src="" alt="River bend at sunrise" className="w-full h-full object-cover object-center" />
<div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(to top, rgba(251,248,242,0.96), rgba(251,248,242,0.5))' }} />
```

### Sección 3 — Contadores de impacto
- `--card` fondo, `py-20`, cuadrícula de 4 columnas dividida por líneas finas (Efecto 2)
- `340` Millas de río monitoreadas · `1,240` Voluntarios activos este año · `86` Proyectos de restauración completados · `12,400` Hogares con agua más limpia

### Sección 4 — Nuestro trabajo
- Marfil, ceja `QUÉ HACEMOS` + H2 `Cuatro programas, una cuenca`
- **cuadrícula 2x2** de tarjetas de programa: rounded-xl, fondo `--card`, ícono verde azulado en un círculo verde azulado pálido, título, descripción de 3 oraciones, `Más información →`

### Sección 5 — Bloque de donación
- Fondo verde azulado sin sangrado, texto marfil, `py-24`
- Centrado max-w-2xl: ceja `DAR`, H2 `Elija una cantidad. Vea lo que hace.`
- Selector de donación (Efecto 1) con entrada de cantidad personalizada
- Alternancia mensual/única sobre los niveles
- CTA: `Donar $60 mensual` (naranja, ancho completo, actualizaciones de etiquetas en vivo con la selección)
- Abajo: `Riverbend Foundation is a registered 501(c)(3). EIN 45-2810394. All gifts are tax-deductible.`

### Sección 6 — Historias de campo
- Marfil, ceja `DEL CAMPO` + H2 `Cómo se ve en el suelo`
- Cuadrícula de 3 columnas de tarjetas de historia (Efecto 3), la primera tarjeta ocupa 2 columnas en el escritorio
- Cada una: imagen con lavado de duotono levantado al pasar el mouse, categoría ceja, título serif, `Leer la historia →`

### Sección 7 — Involúcrate
- `--accent-soft` fondo verde azulado pálido, 3 columnas
- Tres rutas con íconos: **Voluntario** (limpieza y monitoreo mensuales), **Conviértete en mayordomo** (adopta un río segmento), **Donar mensualmente** (únete al actual)
- Cada uno: ícono, título, descripción de 2 oraciones, esquema CTA

### Sección 8 — Transparencia
- Marfil, división de 2 columnas
- Izquierda: H2 `Donde va el dinero` + barra horizontal apilada (89% Programas / 7% Recaudación de fondos / 4% Administración) con anchos animados + párrafo corto
- Derecha: enlaces a documentoslista con líneas finas: Informe anual 2025 · Formulario 990 · Finanzas auditadas · Lista de la junta directiva, cada uno con un ícono de descarga

### Sección 9: Socios
- `--card`, fila única de 6 insignias con el nombre de los socios (solo texto, silenciadas), centradas, ceja `CON SOPORTE FROM`

### Sección 10 — Boletín + Final CTA
- Banda verde azulado: H2 `Dos correos electrónicos al mes. Ambos valen la pena abrir.` + entrada de correo electrónico en línea + botón `Suscribir`

### Sección 11 - Pie de página
- Fondo verde azulado intenso, texto marfil, 4 columnas
- Marca + línea de misión / Programas / Involucrarse / Contacto + dirección
- Franja inferior: EIN, línea ©, privacidad y un enlace `Reportar un incidente de contaminación` en naranja

---

## 7. Animaciones

- **Hero:** H1 se desvanece 0,8 s; la imagen se revela con `clipPath: inset(0 0 0 100%) → inset(0 0 0 0%)` durante 1,2 s
- **Contadores de impacto:** cuenta atrás 2000 ms en `useInView`; regla verde azulado debajo de cada escala desde la izquierda, 0,6 s, retardada 0,3 s
- **Tarjetas de programa:** escalonamiento `i * 0,08`, desvanecimiento 0,7 s; pasar el cursor levanta la tarjeta `-4px` y profundiza la sombra
- **Niveles de donación:** fundido cruzado de borde y fondo 0,2 s al seleccionar; intercambios de oraciones de impacto con `AnimatePresence`, 0,28 s
- **Tarjetas de historia:** opacidad de superposición de duotono 0,3 → 0 y escala de imagen 1 → 1,05 al pasar el cursor, 0,5–0,7 s
- **Barra de transparencia:** tres segmentos animan el ancho desde 0 secuencialmente, 0,9 s en total, escalonado 0.15s
- **Todos los encabezados:** desvanecimiento 0.7s, facilidad `[0.22, 1, 0.36, 1]`

---

## 8. Responsive

### Móvil (< 768px)
- Barra de navegación: marca + pastilla `Donar` + hamburguesa; menú superpuesto en pantalla completa ivory
- Hero: la imagen se convierte en una capa de fondo detrás del texto con una tela degradada en color marfil; H1 se fija a 38 px; CTA apiladas en ancho completo
- Contadores de impacto: cuadrícula de 2x2
- Programas: 1 columna
- Selector de donaciones: cuadrícula de niveles de 2x2, CTA de ancho completo y pegajoso hasta la parte inferior en esta sección
- Historias de campo: 1 columna, todas las tarjetas iguales size
- Transparencia: pilas de barras encima de la lista de documentos
- Pie de página: grupos estilo acordeón de 1 columna

### Tableta (768–1024px)
- Hero permanece dividido en 50/50 · Programas 2x2 ·Historias de 2 columnas con la tarjeta de funciones de ancho completo en la parte superior

### Escritorio (> 1024px)
- Ancho máximo 1200px, `px-16`, relleno de sección `py-24`

---

## 9. Completo Copia

### Marca
**RIVERBEND FOUNDATION** — Protección de cuencas hidrográficas en tres condados

### Navbar
Nuestro trabajo · Impacto · Involucrarse · Acerca de · Noticias · [Botón] Donar

### Hero
- Ceja: `PROTEGIENDO LA CUENCA DE RIVERBEND DESDE 1997`
- H1: `El agua limpia no es una causa. Es infraestructura.`
- Sublínea: `Monitoreamos, restauramos y defendemos 340 millas de río en tres condados, con voluntarios, ciencia y un personal muy pequeño.`
- CTA 1: `Donar` · CTA 2: `Ver nuestro impacto`
- Línea de confianza: `Charity Navigator 4-Star · 89 centavos de cada dólar se destina a programas`

### Impact Counters
- `340` — Millas de río monitoreadas
- `1,240` — Voluntarios activos este año
- `86` — Proyectos de restauración completados
- `12,400` — Hogares con agua más limpia

### Nuestro Trabajo
Eceja: `QUÉ HACEMOS` — H2: `Cuatro Programas, Una Cuenca`

1. **Monitoreo de la calidad del agua** (icono: `FlaskConical`): los voluntarios recolectan muestras en 62 sitios fijos cada mes, durante todo el año. Los datos van a una base de datos pública y a presentaciones regulatorias. Cuando un número se mueve en dirección equivocada, lo sabemos en cuestión de semanas y no de años.
2. **Restauración de riberas** (icono: `Sprout`): estabilizamos las riberas erosionadas con plantaciones nativas y estructuras de troncos diseñadas. Los segmentos restaurados retienen sedimentos, enfrían el agua y traen de vuelta los insectos que se alimentan de todo lo demás. Ochenta y seis proyectos completados desde 2004.
3. **Abogacía y permisos** (icono: `Scale`) — Leemos cada solicitud de permiso de descarga en la cuenca y comentamos las que son importantes. Es un trabajo poco glamoroso que ha evitado más contaminación que cualquier limpieza que hayamos realizado.
4. **Educación sobre cuencas hidrográficas** (icono: `GraduationCap`): programas de campo para 4.000 estudiantes al año, además de talleres para propietarios de tierras sobre zonas de amortiguamiento ribereñas y mantenimiento de sistemas sépticos. La próxima generación de azafatas es actualmenteen sexto grado.

### Donar bloque
Eceja: `DAR` — H2: `Elija una cantidad. Vea lo que hace.`
- `$25` — proporciona un filtro de agua doméstico durante un año
- `$60` — financia una semana de monitoreo de la calidad del río
- `$150` — capacita a un mayordomo voluntario durante una temporada completa
- `$400` — restaura 100 pies de agua erosionada streambank
Toggle: `Una vez` / `Mensual`
Legal: `Riverbend Foundation is a registered 501(c)(3). EIN 45-2810394. All gifts are tax-deductible to the extent allowed by law.`

### Historias de campo
Eceja: `DEL CAMPO` — H2: `Cómo se ve en el terreno`
1. **Recuperando Muddy Fork**: cuatro años, 1.800 plantas nativas y un terrateniente muy paciente. La trucha regresó en el tercer año.
2. **El permiso que nadie más leyó**: cómo una solicitud de alta que parecía rutinaria se convirtió en una lucha de dieciocho meses y por qué la ganamos.
3. **Sesenta y dos voluntarios, un sábado**: nuestra limpieza más grande sacó 3,4 toneladas de un tramo de dos millas. Esto es lo que encontramos.

### Involúcrese
Eyebrow: `ÚNASE A NOSOTROS` - H2: `Tres formas de ayudar`
1. **Voluntario** (icono: `Usuarios`): limpiezas mensuales, ejecuciones de monitoreo y días de siembra. No se necesita experiencia y siempre te damos de comer.
2. **Conviértase en administrador** (icono: `MapPin`): adopte un segmento de media milla y camínelo cuatro veces al año. Las azafatas son nuestro sistema de alerta temprana.
3. **Dar mensualmente** (icono: `Corazón`): Únase a The Current, nuestro círculo de donaciones mensuales. Una financiación predecible es lo que nos permite comprometernos con una restauración de varios años.

### Transparencia
H2: `Adónde va el dinero`
Párrafo: `Publicamos nuestras finanzas en su totalidad porque les pedimos que nos confíen dinero. Ochenta y nueve centavos de cada dólar se destinan directamente a programas: monitoreo, restauración, promoción y educación. El resto mantiene las luces encendidas y las subvenciones llegando.`
Bar: `Programas 89%` · `Recaudación de fondos 7%` · `Administración 4%`
Documentos: `Informe anual 2025` · `Formulario 990 del IRS` · `Finanzas auditadas 2025` · `Junta de Directores`

### Socios
Eyebrow: `CON APOYO DE`
`State Water Trust` · `Fairhaven Community Fund` · `Northern Counties Coalition` · `RidgelineOutdoor Co.` · `University Watershed Lab` · `Anonymous Family Foundation`

### Newsletter
H2: `Dos correos electrónicos al mes. Vale la pena abrir ambos.`
Subline: `Actualizaciones de campo, resultados de calidad del agua y alguna llamada ocasional para presentarse en algún lugar.`
CTA: `Suscribirse`

### Pie de página
- FUNDACIÓN RIVERBEND · `Monitor. Restaurar. Defend.`
- Dirección: `118 Mill Race Road, Fairhaven, VT 05743`
- Teléfono: `(802) 555-0119` · Correo electrónico: `hello@riverbendfoundation.org`
- EIN 45-2810394 · © 2026 Fundación Riverbend. Reservados todos los derechos. · Política de privacidad
- Enlace naranja: `Reportar un incidente de contaminación →`

---

## 10. Dependencias clave

```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-toggle-group": "^1.1.0",
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
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'rb-ivory': '#fbf8f2',
        'rb-teal': '#1c6a6f',
        'rb-orange': '#ef7c2b',
      },
    },
  },
};
```
