# Pace — Mensaje del sitio web de la página de destino de SaaS

## 1. Declaración de objetivos
Cree una página de inicio de SaaS precisa y con cuadrícula suiza para **Pace**, una herramienta de análisis para empresas de suscripción: papel blanquecino, tinta negra, un acento índigo, etiquetas monoespaciadas, líneas de cuadrícula visibles y una captura de pantalla del producto inclinada en un espacio 3D para que la interfaz en sí sea la protagonista. image.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin biblioteca de gráficos, sin autenticación, sin calculadora de precios. La captura de pantalla del producto es una imagen, no un panel en vivo.

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(40, 14%, 96%);       /* warm paper */
  --foreground: hsl(220, 20%, 10%);      /* ink */
  --primary: hsl(245, 72%, 56%);         /* indigo */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(220, 8%, 44%);
  --border: hsl(220, 12%, 88%);
  --card: hsl(0, 0%, 100%);
  --grid: hsl(220, 12%, 90%);            /* visible layout grid */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```
- **H1:** Inter Tight 600, clamp(44px, 5.5vw, 82px), altura de línea 1.02, espacio entre letras -0.035em
- **H2:** Inter Tight 600, clamp(30px, 3.4vw, 46px), espacio entre letras -0.02em
- **Cuerpo:** Inter Tight 400, 17px, altura de línea 1.65
- **Etiquetas, métricas, navegación:** JetBrains Mono 500, 12px, mayúsculas, espacio entre letras 0.08em

## 5. Efectos visuales

**Efecto 1: toma de producto inclinada.** La captura de pantalla principal se encuentra en un marco delgado del navegador y se gira hacia adentro. 3D para que se lea como un objeto en lugar de una imagen plana. A medida que el usuario se desplaza por los primeros 400 píxeles, se endereza hasta quedar plano.

```jsx
<div style={{ perspective: "1800px" }}>
  <motion.div
    initial={{ rotateX: 22, rotateY: -12, scale: 0.94 }}
    whileInView={{ rotateX: 6, rotateY: -3, scale: 1 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    className="rounded-xl border border-[var(--border)] bg-white shadow-[0_40px_80px_-20px_rgba(20,25,45,0.25)]"
  >
    {/* Image: clean SaaS analytics dashboard UI, light theme, revenue chart and metric cards, indigo accents, crisp screenshot */}
    <img src="" alt="Pace revenue dashboard" className="w-full rounded-b-xl object-cover" />
  </motion.div>
</div>
```

**Efecto 2: Cuadrícula visible.** Un fondo fijo de líneas verticales en las posiciones de 12 columnas, `--grid` con 60% de opacidad, detrás de todo el contenido. Los límites de la sección son reglas `--border` de 1 px que se extienden de borde a borde. La página debería verse como un archivo de diseño.

**Efecto 3: ticks monométricos.** Las métricas se animan alternando dígitos durante 0,6 segundos antes de establecerse, utilizando figuras tabulares monoespaciadas para que nada cambie el ancho.

## 6. Desglose de componentes

1. **Tira de anuncio**: 36 píxeles, fondo en tinta, texto en papel, una línea sobre la última versión, mono.
2. **Barra de navegación**: 72 píxeles, papel, regla inferior, adhesiva. Marca denominativa a la izquierda, cuatro enlaces mono en el centro, enlace de texto "Iniciar sesión" y botón índigo "Iniciar gratis" a la derecha.
3. **Héroe**: bloque de texto de dos tercios de ancho: ceja mono, H1, sublínea, dos botones y una línea mono de datos de confianza. Debajo, la captura de pantalla inclinada (Efecto 1), superpuesta a la siguientesección por 80px.
4. **Fila del logotipo**: una franja con borde de regla de seis marcas denominativas de clientes en gris apagado, un título monocromático a la izquierda que dice "CONFIANZA EN".
5. **Métricas**: cuatro celdas divididas por reglas verticales: número grande en Inter Tight 600, etiqueta mono debajo (Efecto 3).
6. **Características**: tres filas, lados de la imagen alternados, cada uno con un índice mono (`01`), un encabezado, dos oraciones y una imagen detallada de la interfaz de usuario en un marco delgado.
7. **Cómo funciona**: tres pasos numerados seguidos con conectores finos.
8. **Cotización**: una cotización de cliente grande, con nombre, función y empresa, sin carrusel de avatar.
9. **Precios**: tres columnas simples divididas por reglas, la del medio delineada en índigo con una etiqueta mono "MÁS POPULAR". Precio en Inter Tight 600, lista de características en el cuerpo del texto.
10. **Preguntas frecuentes**: seis preguntas como elementos nativos `<details>` en dos columnas.
11. **CTA final**: fondo en tinta, texto en papel, H2 y un botón índigo.
12. **Pie de página**: papel, cuatro columnas de enlaces monocromáticos, marca denominativa y lectura de puntos de estado "Todos los sistemas operativos".

## 7. Animaciones
- Texto destacado: se desvanece 20 px, se tambalea 0,08 s, 0,7 s
- Imagen del producto: Efecto 1
- Fila del logotipo: se desvanece como un grupo, sin marquesina
- Métricas: Efecto 3, activado una vez en la vista
- Filas de características: la imagen se desvanece y escala 0.97 → 1 en 0.9s, el texto se desvanece 16px
- Botones: el índigo se oscurece un 6% al pasar el mouse, sin elevación
- Nada rebota. El movimiento es silencioso y mecánico.

## 8. Responsive
- **Móvil (<768px):** H1 a 44px; la fotografía del producto pierde por completo la inclinación 3D y queda plana con márgenes laterales de 16 píxeles; las métricas se convierten en una cuadrícula de 2×2; las filas de características apilan la imagen sobre el texto; los precios se acumulan primero con el plan popular; líneas de cuadrícula ocultas; la barra de navegación se convierte en una marca denominativa más el botón "Iniciar gratis" y un ícono de menú. 
- **Tableta:** las funciones permanecen una al lado de la otra en 50/50; precio de 3 columnas con un relleno más ajustado.
- **Escritorio:** ancho máximo 1240px, `px-8`, espaciado de sección `py-28`.

## 9. Copia completa

**Anuncio:** `Pace 2.4: la retención de cohortes ahora está en todos los planes →`

**Barra de navegación:** Producto ·Precios · Documentos · Registro de cambios — Iniciar sesión · Iniciar gratis

**Hero**
- Ceja: `ANÁLISIS DE INGRESOS PARA EMPRESAS DE SUSCRIPCIÓN`
- H1: `Sepa qué clientes están a punto de irse, un mes antes de que lo hagan.`
- Sublínea: `Pace se conecta a Stripe en uno haga clic y convierta sus datos de facturación en métricas de retención, cohorte y expansión que todo su equipo pueda leer.`
- Botones: `Comience gratis, sin tarjeta` · `Reserve una demostración de 15 minutos`
- Datos confiables: `SOC 2 TYPE II` · `CONFIGURACIÓN EN 4 MINUTOS` · `SIN INGENIERÍA NECESARIO`

**Fila del logotipo:** `CONFIABLE POR`: ruta lineal · Cadencia · Sala de correo · Hervidor · Sede de fundición · Hacia el norte

**Métricas**
- `2,400+` equipos conectados
- `$1.8B` en seguimiento ingresos
- Tiempo medio de configuración de `4 min`
- `98%` de los usuarios lo conservan después del primer mes

**Características**
1. **01: Retención que se actualiza sola.** `Las tablas de cohortes se reconstruyen cada noche a partir de sus datos de facturación. Sin hojas de cálculo, sin exportaciones, sin analistas esperando una solicitud.`
2. **02: riesgo de abandono, calificado diariamente.** `Pace califica cada cuenta según el uso, el historial de pagos y el volumen de soporte, luego le indica a cuáles veinte llamar esta semana.`
3. **03 — Informes que su CEO realmente abrirá.** `Un correo electrónico de lunes con los cinco números que se movieron, escritos en oraciones en lugar de gráficos.`
*Resúmenes de imágenes: detalles claros de la interfaz SaaS con tema ligero: una tabla de retención de cohortes, una lista de cuentas con puntuaciones de riesgo, un diseño de resumen de correo electrónico.*

**Cómo funciona**
1. **Connect Stripe** — `Acceso de solo lectura con un clic. No se devuelve nada a su facturación.`
2. **Pace rellena tu historial**: `Generalmente cuatro minutos para tres años de datos.`
3. **Compartir con el equipo** — `Asientos ilimitados en cada plan, porque las métricas que nadie ve no tienen valor.`

**Cita:** `"Cancelamos otras dos herramientas la semana que configuramos Pace. Responde a la pregunta que realmente hace nuestra junta directiva: dónde se fue el dinero y por qué".` — **Dana Whitfield**, directora de crecimiento, Cadence

**Precios** — H2 `Precio en Se rastrean los ingresos, no los asientos.`
- **Starter** — `$0` — `Se rastrea hasta $10,000 MRR · núcleométricas de retención · asientos ilimitados`
- **Crecimiento** — `$89/mes` — `MÁS POPULAR` — `Hasta $250 mil MRR rastreado · puntuación de abandono · Informe del lunes · Alertas de Slack · asientos ilimitados`
- **Escala** — `$249/mes` — `MRR ilimitado · cohortes personalizadas · Acceso API · SSO · prioridad support`

**Preguntas frecuentes**
- **¿Pace escribe algo en Stripe?** `No. El acceso es de solo lectura y puedes revocarlo desde tu panel de Stripe en cualquier momento.`
- **¿Cuánto tiempo lleva la configuración?** `Cuatro minutos es la media, incluido el reabastecimiento histórico.`
- **¿Cobras por asiento?** `Nunca. El precio se basa únicamente en los ingresos registrados.`
- **¿Qué sucede si superamos nuestro nivel?** `Le enviamos un correo electrónico. Nada se rompe y nada se carga automáticamente.`
- **¿Puedo exportar los datos?** `Sí, cada tabla se exporta a CSV y el plan Scale incluye una API REST.`
- **¿Admite Paddle o Chargebee?** `Paddle está activo. Chargebee está en versión beta: envíenos un correo electrónico y lo activaremos.`

**CTA final** — H2 `Vea su primera tabla de cohortes en cuatro minutos.` Botón `Comenzar gratis, sin tarjeta`

**Pie de página** — PACE · Producto · Precios · Documentos · Registro de cambios · Seguridad · Carreras · Privacidad · Términos · `Todos los sistemas operativos` · © 2026 Pace Analytics Inc.

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
