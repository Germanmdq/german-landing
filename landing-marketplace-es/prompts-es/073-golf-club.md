# Wexford Links — Aviso del sitio web del club de golf

## 1. Declaración de objetivos
Crear un sitio web privado tradicional para un club de golf para **Wexford Links**, definido por un verde profundo de calle, color crema cálido y una estética sobria de escudo grabado que indica un club fundado en 1926 en lugar de un campo de prácticas.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(42, 34%, 95%);      /* #f7f2e8 cream */
  --foreground: hsl(150, 26%, 14%);     /* #1a2e24 fairway ink */
  --primary: hsl(150, 38%, 22%);        /* #23503c deep green */
  --primary-foreground: hsl(42, 34%, 96%);
  --muted-foreground: hsl(150, 8%, 44%);
  --border: hsl(40, 18%, 85%);
  --card: hsl(42, 36%, 91%);
  --accent-brass: hsl(38, 46%, 52%);    /* engraved brass */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
- **H1:** Cormorant Garamond 300, clamp(40px, 5vw, 72px), espacio entre letras 0,01em
- **H2:** Cormorant Garamond 400, 32–46px
- **H3 / títulos de tarjetas:** Inter 600, 17–20px
- **Cuerpo:** Inter 300, 17 px, altura de línea 1,78
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0,2 em, 11 px, latón
- **Números de agujeros/yardas:** Cormorant Garamond 600, tabular-nums

## 5. Efectos visuales

**Efecto 1: cuadro de mandos interactivo del campo.** Una tabla de 18 filas donde, al pasar el cursor sobre una fila, se expande una breve descripción del hoyo y se resalta la fila en verde pálido. Los nueve primeros y los nueve últimos están divididos por una regla de latón con totales acumulados.

```tsx
<tr
  onMouseEnter={() => setActive(h.number)}
  className="border-b border-[var(--border)] transition-colors duration-200"
  style={{ background: active === h.number ? 'var(--card)' : 'transparent' }}
>
  <td className="py-4 font-serif text-2xl tabular-nums">{h.number}</td>
  <td className="py-4 tabular-nums">{h.yards}</td>
  <td className="py-4 tabular-nums">{h.par}</td>
  <td className="py-4 text-sm text-[var(--muted-foreground)]">{h.handicap}</td>
</tr>
```

**Efecto 2: revelación de regla de latón.** Cada título de sección va seguido de una línea de latón de 1 px que escala desde la izquierda (`scaleX 0 → 1`, originX 0, 0.8s) en la entrada de desplazamiento.

## 6. Desglose de componentes

1. **Barra de navegación**: 80 px, adhesivo, color crema con borde inferior de 1 px. Logotipo de escudo de estilo grabado centrado, enlaces divididos a izquierda y derecha, botón de contorno de latón "Preguntar sobre membresía" a la derecha.
2. **Hero**: fotografía de 92 vh con sangrado completo y un degradado color crema ponderado en la parte inferior. Ceja, serif H1, sublínea, dos CTA. *Imagen: amplia calle del campo de golf temprano en la mañana, niebla baja sobre césped bien cuidado, árboles maduros enmarcando la toma, luz suave y cálida, fotografía de paisaje.*
3. **Banda de estadísticas del club**: cuatro cifras en `--card`: fundado, hoyos, par, calificación del campo.
4. **El curso** — 2 columnas: encabezado fijo y descripción a la izquierda, cuadro de mando de 18 filas a la derecha (Efecto 1).
5. **Hoyos característicos**: 3 tarjetas con imágenes, número de hoyo en serif grande, yardas, par y una descripción de dos oraciones.
6.**Membresía**: tres niveles (Full, Weekday, Junior) en tarjetas color crema con borde, con tarifa de inscripción, cuotas anuales y cuatro líneas de beneficios cada una.
7. **Práctica y entrenamiento** — 3 columnas: campo de prácticas, área de juego corto, lecciones de la PGA, cada una con horarios y precios.
8. **Casa club y comedor**: imagen dividida y texto con horario de apertura y nota sobre el código de vestimenta.
9. **Eventos y sociedades**: días corporativos y paquetes de sociedad con una consulta CTA.
10. **Información para visitantes**: horarios verdes, tarifas para huéspedes, requisitos para discapacitados, direcciones.
11. **Pie de página**: verde intenso, cuatro columnas, escudo, dirección, afiliaciones.

## 7. Animaciones
- Hero: la imagen escala `1,06 → 1` en 12 segundos lineales; H1 se desvanece 0,85 s
- Reglas de latón bajo los títulos: `escalaX 0 → 1`, 0,8 s, origenX izquierda
- Filas del cuadro de mando: se desvanece en forma escalonada `i * 0,03`; fila de tintes flotantes 0.2s
- Cartas ocultas distintivas: `y: 30 → 0`, escalonamiento 0.12s; la imagen escala 1.04 al pasar el mouse sobre 0.6s
- Estadísticas: cuenta atrás 1600 ms en `useInView`
- Tarjetas de membresía: levante `-4px` con un borde de latón de 1px que aparece al pasar el mouse

## 8. Responsive
- **Móvil (<768px):** menú de hamburguesas; H1 se fija a 40 px; las estadísticas se vuelven 2x2; el cuadro de mando se convierte en tarjetas apiladas que muestran el hoyo, el par, las yardas en una línea y la descripción a continuación; pila de niveles de membresía; agujeros de firma 1-col.
- **Tableta:** el cuadro de mando mantiene la forma de la tabla con la columna de hándicap oculta; agujeros de firma 2-col.
- **Escritorio:** ancho máximo 1180px, `px-16`, secciones `py-24`.

## 9. Copia completa

**Marca:** WEXFORD LINKS · Est. 1926 · Condado de Wexford

**Navbar:** El campo · Membresía · Coaching · Casa club · Eventos · Visitantes · [Botón] Consultar sobre la membresía

**Hero**
- Ceja: `FOUNDED 1926 · PARKLAND · 18 HOLES · PAR 72`
- H1: `Un campo que nunca ha necesitado destacar.`
- Sublínea: `Noventa y nueve años de golf en zonas verdes en la misma extensión de terreno, con una lista de espera de miembros sobre la que somos honestos y una casa club que todavía sirve un almuerzo adecuado.`
- CTA: `Pregunte sobre la membresía` · `Ver el Curso`

**Estadísticas:** `1926`Fundado · `18` Hoyos · `72` Par · `71.4` Clasificación del campo

**El campo** — Ceja `EL CURSO` — H2 `Dieciocho hoyos, cuatro de ellos memorables y uno del que te quejarás.`
Descripción: `Zois verdes sobre un terreno suavemente ondulado, con calles arboladas, pequeños greens rápidos y un tramo desde el undécimo hasta el decimocuarto que decide la mayoría de competiciones de clubes. El campo tiene 6,412 yardas desde los blancos y es considerablemente más largo hacia el oeste.`

**Hoyos exclusivos**
1. **El séptimo: 168 yardas, par 3**: cuesta abajo a través del agua hasta un green que se aleja de usted. La selección del club es una suposición y todo el mundo afirma lo contrario.
2. **El 12: 441 yardas, par 4**: el hoyo más difícil de la carta. Un drive a ciegas sobre la cresta, luego un largo approach hacia un green custodiado por bunkers cortados en 1931.
3. **El día 18: 512 yardas, par 5**: alcanzable en dos con viento de cola, que es aproximadamente un día de cada nueve. Las ventanas de la casa club observan cada acercamiento.

**Membresía**
- **Membresía completa** — Cuota de inscripción £1200 · Cuota anual £1850 — Juego sin restricciones los siete días · Elegibilidad total para competir · Tarifa de invitado de £30 · Acceso recíproco a once clubes asociados
- **Membresía de día laborable** — Cuota de inscripción £600 · Cuota anual £1,050 — Juega de lunes a viernes · Competiciones entre semana · Tarifa de invitado de £35 · Derechos completos de la casa club
- **Membresía junior** — Sin cuota de inscripción · Cuota anual £180 — Menores de 18 · Entrenamiento grupal gratuito · Juego de fin de semana supervisado · Progresión a membresía completa con entrada reducida

Nota: `La membresía completa actualmente tiene una lista de espera de aproximadamente catorce meses. Le diremos honestamente dónde se sienta.`

**Coaching** — `Driving Range` 24 bahías cubiertas, £6 por 60 bolas · `Short Game Area` gratis para los miembros, dos greens de práctica y tres bunkers · `Lecciones PGA` £45 por media hora con el profesional principal Alan Reid, análisis de video incluido

**Clubhouse** — `El comedor sirve el almuerzo desde mediodía a las tres y cena de jueves a domingo. No se requieren chaquetas, pero la mezclilla y las zapatillas deportivas no son bienvenidas después de las seis.`

**Eventos** — `Días corporativos desde £68 porcabeza que incluye café, dieciocho hoyos y una comida de dos platos. Paquetes sociales disponibles de lunes a jueves.`

**Visitantes** — `Green fee £75 entre semana, £95 los fines de semana. Se requiere certificado de discapacidad. Horarios de salida para visitantes a partir de las 10:30 a.m. Reserve por teléfono al 053 555 0142.`

**Pie de página** — WEXFORD LINKS · `Ballymore Road, County Wexford` · Afiliado a Golf Ireland · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
