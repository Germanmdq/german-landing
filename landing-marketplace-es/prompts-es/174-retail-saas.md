# SaaS de administración de tiendas minoristas: solicitud del sitio web

---

Cree un sitio web de marketing SaaS completo para **Flore**, una plataforma de administración de tiendas minoristas para propietarios de tiendas físicas. Base de arena cálida, acento verde azulado profundo, accesible y profesional. El diseño debe parecer una herramienta creada por personas que entienden el comercio minorista, no un producto empresarial genérico. Think Notion conoce al mejor amigo del propietario de una panadería.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 36 25% 97%;        /* #faf8f5 warm off-white */
  --surface: 0 0% 100%;            /* #ffffff pure white */
  --surface-raised: 36 20% 95%;    /* #f2ede5 warm sand */
  --border: 36 18% 88%;            /* #e5dfd5 warm border */
  --border-soft: 36 15% 82%;       /* #d9d0c3 secondary border */
  --foreground: 36 12% 10%;        /* #1a1610 near-black warm */
  --muted-foreground: 36 8% 47%;   /* #7a7268 warm grey */
  --subtle: 36 10% 68%;            /* #b0a898 placeholder */
  --primary: 172 80% 26%;          /* #0d7a6e deep teal */
  --primary-foreground: 0 0% 100%;
  --primary-light: 172 45% 94%;    /* #e6f4f2 teal tint bg */
  --primary-muted: 172 38% 78%;    /* #b3deda teal border */
  --warning: 38 90% 52%;           /* #f59e0b amber */
  --danger: 0 72% 51%;             /* #dc2626 red */
  --success: 142 72% 29%;          /* #16a34a green */
}
```

---

## Tipografía

Importación: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap`

- **Pantalla / H1–H2**: Plus Jakarta Sans 800, seguimiento -0.04em, altura de línea 1.1
- **UI/Cuerpo**: Plus Jakarta Sans 400–600
- **Etiquetas de datos/insignias/elementos mono**: JetBrains Mono 400

---

## Visual Efectos

### 1. Animaciones de entrada escalonadas
Cada sección se desvanece en el desplazamiento con niños escalonados:
```
Each child: initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
Trigger: useInView with once: true, margin: '-80px'
```

### 2. Entrada de la tarjeta del tablero
La tarjeta del tablero del héroe se anima desde abajo con un sutil flotante:
```
initial={{ opacity: 0, y: 40, scale: 0.98 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
```
Después de entrar, se balancea suavemente:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
animation: float 5s ease-in-out infinite;
```

### 3. Animación de estadísticas de conteo ascendente
Los contadores de barras de estadísticas se animan con el uso de Framer MotionSpring on desplazamiento:
```
useSpring({ from: 0, to: target, config: { duration: 1400 } })
Triggered by IntersectionObserver at 60% threshold
```

### 4. Elevación sutil del desplazamiento de la tarjeta
Tarjetas de características al pasar el mouse:
```css
transition: transform 0.18s ease, box-shadow 0.18s ease;
&:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(26,22,16,0.09);
}
```

---

## Sección Desglose

### Sección 1: barra de navegación (fija)

Parte superior fija, `background: hsl(var(--background) / 0.96)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid hsl(var(--border))`.

**Izquierda**: marca de marca (icono de cuadrícula 2×2 en verde azulado, 28×28px, radio de borde 7px) + marca denominativa "Flore" Plus Seguimiento de Jakarta Sans 800 -0.03em.

**Enlaces de navegación centrales**: Funciones · Integraciones · Precios · Clientes: tamaño de fuente 13px, peso 500, color de primer plano apagado. Al pasar el cursor: color de primer plano.

**Derecha**: botón de texto "Iniciar sesión" (silenciado) + botón verde azulado relleno "Comenzar gratis →", radio de borde 8 px, relleno 9 px 20 px, peso de fuente 700, tamaño de fuente 13 px.

Móvil: hamburguesa → superposición de pantalla completa con todos los elementos de navegación apilados, CTA verde azulado enbottom.

---

### Sección 2: Hero

Cuadrícula de dos columnas (`1fr 1fr`), espacio de 80 px, ancho máximo de 1200 px centrado. Relleno 128px arriba, 80px abajo. Fondo hsl(var(--background)).

**Columna izquierda:**

- Insignia de pastilla pequeña (flexible en línea, fondo verde azulado, borde verde azulado, radio de borde 100 px): punto verde + "Software de gestión minorista" — JetBrains Mono 10 px, peso 600, color primario, espacio entre letras 0,02 em. Margen inferior 28px.
- H1: "Su tienda, **finalmente** funcionando sola". — Plus Jakarta Sans 800, clamp(40px, 4.5vw, 58px), seguimiento -0,04 em, altura de línea 1,1. "finalmente" en `color: hsl(var(--primary))`.
- Sub: "Inventario, POS, personal y análisis de ventas, todo en un solo lugar. Creado para el propietario de la tienda que no tiene tiempo para administrar cinco aplicaciones diferentes". — 15 px, color de primer plano apagado, altura de línea 1,8, ancho máximo 440 px. Margen inferior 36px.
: dos botones de CTA uno al lado del otro, espacio de 10 px:
 - Principal: "Pruebe gratis durante 14 días": verde azulado relleno, relleno 13 px 26 px, radio de borde 9 px, tamaño de fuente 14 px, peso de fuente 700
 - Secundario: "Vea cómo funciona" — `background: hsl(var(--surface-raised))`, `border: 1px solid hsl(var(--border))`, color de primer plano, mismo relleno
- Fila de prueba social debajo de los botones (margen superior 36px), tres elementos de estadísticas uno al lado del otro, espacio de 28px:
 - "12k+" / "tiendas en todo el mundo"
 - "40+" / "países"
 - "4.9★" / "calificación promedio"
 - Cada uno: número en Plus Jakarta Sans 800 22px seguimiento -0.04em, etiqueta en 11px silenciado en primer plano

**Columna derecha - Tarjeta del tablero:**

Tarjeta blanca, `border: 1.5px solid hsl(var(--border))`, radio de borde 16px, `box-shadow: 0 20px 60px rgba(26,22,16,0.07), 0 4px 12px rgba(26,22,16,0.04)`. Animar con efecto flotante (ver Efectos visuales). 

Estructura de la tarjeta: 
```
[Card header] — background: hsl(var(--surface-raised)), padding 16px 20px, border-bottom
  Left: "📍 Main Street Store" — 12px weight 700
  Right: "TODAY, APR 26" — JetBrains Mono 10px color muted

[Card body] — padding 20px
  [2×2 KPI grid, gap 10px]
    KPI 1: "Revenue" / "$3,842" / "+18% badge in teal"
    KPI 2: "Transactions" / "148" / "+12 badge in teal"
    KPI 3: "Avg ticket" / "$25.96" / no badge
    KPI 4: "Low stock" / "7" in amber (#f59e0b) / no badge
    Each KPI: surface bg, border, border-radius 10px, padding 14px

  [Bottom row: 3fr 2fr grid, gap 10px]
    Left — Hourly chart card:
      Title: "Hourly sales" — JetBrains Mono 9px uppercase muted
      Bar chart: 8 bars, height: 28% 42% 75% 100% 65% 58% 82% 50%
      Bars default: hsl(var(--primary-light))
      Highlight bars (index 2,3,6): hsl(var(--primary))
      Height 60px total, bars flex align-items flex-end, gap 3px, border-radius 2px 2px 0 0

    Right — To-do card:
      Title: "To do" — JetBrains Mono 9px uppercase muted
      3 task rows, each with colored dot + label:
        ● amber dot · "Reorder almond croissants"
        ● teal dot · "Staff rota published"
        ○ grey dot · "End-of-day report"
      Dot: 6×6px circle, margin-top 4px
      Text: 10px, color foreground, line-height 1.4
```

---

### Sección 3: Prueba social/barra de logotipo

Tira de ancho completo, `padding: 28px 60px`, `border-top: 1px solid hsl(var(--border))`, `border-bottom: 1px solid hsl(var(--border))`. Fondo: superficie elevada.

Izquierda: "Se integra con": JetBrains Mono 9px en mayúsculas silenciadas, sin ajuste.

Derecha: flexión horizontal, espacio de 40px, desbordamiento oculto:
```
Shopify · Square · Stripe · Xero · Lightspeed · QuickBooks · WooCommerce · Clover
```
Ecada en Plus Jakarta Sans 700 14px, borde de color suave (dessaturado), espacio entre letras -0.01em.

---

### Sección 4 — Estadísticasbar

Centrado, ancho máximo 1000 px, relleno 80 px 60 px. Cuatro columnas de estadísticas en un `grid-template-columns: repeat(4,1fr)`, divisores entre.

Estadísticas (cuenta ascendente en el desplazamiento):
- **12,000+** — Propietarios de tiendas en todo el mundo
- **40** — Países activos
- **99,9%** — Tiempo de actividad garantizado
- **4.9 / 5** — Calificación promedio del cliente

Cada estadística: número en Plus Jakarta Sans 800 clamp(36px,4vw,52px), seguimiento -0.05em, color primario. Etiqueta a continuación en primer plano silenciado de 13 píxeles. Divisores: `border-right: 1px solid hsl(var(--border))` en todos menos el último.

---

### Sección 5: descripción general de funciones (3 columnas)

Ancho máximo 1200 px, relleno 96 px 60 px. `border-top: 1px solid hsl(var(--border))`.

**Encabezado**: Cuadrícula de dos columnas, espacio de 64 px, margen inferior de 56 px.
- Izquierda: H2 "Todo lo que el dueño de una tienda necesita, nada que el dueño de una tienda no necesite". — Plus Jakarta Sans 800, clamp(36px, 4vw, 48px), seguimiento -0.04em.
- Derecha: "Flore fue creado por personas que han trabajado en el comercio minorista. Solo incluye características que realmente importan cuando estás ocupado con los clientes". — 14px silenciado, altura de línea 1.8.

**Cuadrícula de tarjetas**: `grid-template-columns: repeat(3,1fr)`, espacio de 20px. Cada tarjeta:
- Superficie blanca, `border: 1.5px solid hsl(var(--border))`, radio de borde 14px, relleno 28px
- Contenedor de iconos: 44×44px, `background: hsl(var(--primary-light))`, radio de borde 10px, emoji centrado, tamaño de fuente 20px, margen inferior 20px
- H3: 15px peso 700 seguimiento -0.02em, margen inferior 8px
- p: 13px altura de línea silenciada 1.75
- Desplazamiento: levantar animación (ver Efectos visuales)

Card Contenido: 
1. 📦 **Inventario en vivo**: "Niveles de existencias en tiempo real en cada SKU. Alertas automatizadas de existencias bajas. Reordenamiento con un solo toque conectado directamente a sus proveedores".
2. 💳 **Punto de venta**: "POS rápido y sin conexión con pagos con tarjeta y en efectivo. Funciona sin Internet: sincroniza todo automáticamente cuando vuelves a estar en línea".
3. 📊 **Análisis de ventas**: "Gráficos horarios, clasificaciones de los más vendidos y datos de rendimiento del personal. Sepa qué funciona antes de tener que buscarlo".
4. 👥 **Perfiles de clientes**: "El historial de compras, la frecuencia de visitas y los gastos de cada cliente en un solo lugar. Cree programas de fidelización que realmente se utilicen".
5. 👤 **Programación del personal** — "Visual semanalrotaciones con intercambios de turnos, seguimiento de horas y previsión de costos laborales por día. Deja de programar en WhatsApp". 
6. 🔗 **Integraciones** — "Conéctate con Shopify, Square, Xero, QuickBooks y más de 30 herramientas más que ya estás usando. No se requiere desarrollador."

---

### Sección 6: fila de funciones profundas: Inventario

Diseño de dos columnas, `columnas de plantilla de cuadrícula: 1fr 1fr`, espacio de 80 px, centro de alineación de elementos. Ancho máximo 1200 px, relleno 96px 60px Fondo: hsl(var(--surface-raised)).

**Izquierda: lado del contenido:**
- Etiqueta verde azulada pequeña: "INVENTARIO" — JetBrains Mono 10px mayúscula, fondo verde azulado claro, borde verde azulado, radio de borde 4px, relleno 3px. 8px
- H2: "Nunca más te quedes sin nada." — 800, clamp(32px, 3.5vw, 44px), seguimiento -0.04em, margen 14px 0
- p: "Flore rastrea cada producto en tiempo real, en todas las ubicaciones. Establezca niveles mínimos de existencias y le avisará automáticamente; luego sugerirá una lista de reordenes con cantidades basadas en su velocidad de ventas."
 - Lista de funciones (4 elementos), cada una: icono de marca de verificación verde azulado + texto en 13 píxeles:
 - Existencias en tiempo real en todos los SKU
 - Alertas automáticas de existencias bajas con umbrales personalizados
 - Un clic reordenar con comparación de precios de proveedores
 - Escaneo de código de barras + importación masiva desde CSV
- Enlace CTA: "Ver inventario en acción →" — verde azulado, peso de fuente 600, subrayado de decoración de texto desplazado 3px

**Derecha: lado visual:**

{/* Imagen: estante de almacén minorista organizado, cajas de inventario cuidadosamente etiquetadas, iluminación cálida, entorno profesional limpio, fondo ligeramente borroso */}
```
<img src="" alt="Organized retail stockroom with labeled inventory" className="w-full h-full object-cover object-center rounded-2xl" />
```
Superposición de tarjeta blanca en la parte inferior izquierda de la imagen:
- Encabezado: "Alerta de reordenamiento" en 12 píxeles de peso 700
- Cuerpo: "Croissants de almendras: quedan 3 unidades (mín.: 24). Toque para reordenar desde Sunrise Bakery."
- Botón verde azulado "Reordenar ahora", pequeño, radio de borde 6px
- Tarjeta: fondo blanco, borde de 1px, radio de borde 12px, relleno de 14px, sombra de cuadro 0 8px 24px rgba(26,22,16,0.1)

---

### Sección 7: Fila de características profundas: POS

Mismo diseño de dos columnas, invertido (visual izquierda, contenido derecho 96px 60px).white.

**Izquierda: lado visual:**

{/* Imagen: mostrador de cafetería con configuración de POS de tableta moderna, barista procesando un pago, luz natural cálida procedente de ventanas, configuración mínima y limpia del mostrador */}
```
<img src="" alt="Modern tablet POS at cafe counter" className="w-full h-full object-cover object-center rounded-2xl" />
```
Tarjeta superpuesta: "Modo sin conexión activo: 12 transacciones en cola. Se sincronizará cuando La conexión se restablece." con ícono de wifi desactivado.

**Derecha — lado del contenido:**
- Etiqueta: "PUNTO DE VENTA"
- H2: "Recepta pagos en cualquier lugar. Incluso sin conexión". 
- p: "El POS de Flore funciona en cualquier tableta o iPad. Acepte tarjetas y efectivo, maneje pagos divididos y reembolsos, e imprima recibos. Si tiene acceso a Internet se cae, sigue funcionando y se sincroniza cuando regresas."
 - Lista de funciones:
 - Funciona sin conexión: se sincroniza automáticamente al volver a conectar
 - Soporte para tarjeta, efectivo y pagos divididos
 - Reembolsos integrados e informes al final del día
 - Compatible con recibo estándar impresoras
- Enlace CTA: "Explore el POS →"

---

### Sección 8: Fila de funciones profundas: Análisis

Diseño de dos columnas, contenido a la izquierda, visual a la derecha. Fondo: elevado en superficie. Relleno 96px 60px.

**Izquierda — lado del contenido:**
- Etiqueta: "ANÁLISIS"
- H2: "Los datos de su tienda finalmente tienen sentido". 
- p: "Flore convierte los datos de ventas sin procesar en información clara y procesable. Vea sus horas de mayor actividad, los productos más vendidos, y qué miembros del personal generan la mayor cantidad de ingresos, sin necesidad de exportar nada a Excel". 
 - Lista de características: 
 - Gráficos de ventas por hora y por día 
 - Clasificaciones de los más vendidos y de los de lento movimiento
 - Rendimiento del personal y tasas de conversión
 - Correo electrónico de resumen semanal enviado todos los lunes mañana
- Enlace CTA: "Ver demostración de análisis →"

**Derecha: lado visual:**

{/* Imagen: persona revisando el panel de análisis en una computadora portátil, oficina en casa moderna o cafetería, ambiente relajado pero profesional, luz ambiental cálida */}
```
<img src="" alt="Store owner reviewing analytics on laptop" className="w-full h-full object-cover object-center rounded-2xl" />
```

---

### Sección 9 — Testimonios

Encabezado centrado + cuadrícula de tarjetas de 3 columnas. Ancho máximo 1200 px, relleno 96 px 60 px. `border-top: 1px solid hsl(var(--border))`.

Encabezado:
- H2: "12.000 tiendaslos propietarios confían en Flore." — 800, clamp(34px, 3.5vw, 46px), seguimiento -0.04em, centro
- p: "Desde boutiques de una sola ubicación hasta cadenas de múltiples sitios." — 14px silenciado, centro

Tres tarjetas de testimonio, cada una: superficie blanca, borde de 1,5px, radio de borde de 14px, relleno de 28px. Escalonado animación de entrada.

1. **Sarah Mitchell, propietaria de The Bloom Room (Florals, Austin TX)**
 > "Solía pasar los domingos por la noche actualizando hojas de cálculo. Ahora Flore lo hace todo automáticamente. Realmente no sé cómo manejé la tienda sin él". 
 — 5 estrellas verde azulado

2. **James Okonkwo, propietario — Okonkwo & Sons Deli (Londres)**
 > "Las alertas de inventario por sí solas nos salvaron de tres desabastecimientos en el primer mes. Nuestro desperdicio se ha reducido un 22 % desde que cambiamos de nuestro antiguo sistema". 
 — 5 estrellas verde azulado

3. **Priya Sharma, cofundadora — Spice Route Grocery (3 ubicaciones, Melbourne)**
 > "Tenemos tres tiendas y Flore hace que parezca una sola. El panel de múltiples ubicaciones es lo mejor que hemos agregado a nuestra operación en años."
 - 5 estrellas verde azulado

Cada tarjeta:
- Estrellas: 5 íconos de estrellas verde azulado en la parte superior, tamaño de fuente 14px, espacio de 2px, margen inferior 16px
- Cita: altura de línea de 14px 1,75 color de primer plano, margen inferior 20px
- Autor: marcador de posición de avatar (40×40px círculo cálido) + nombre (13px peso 700) + rol/ubicación (12px silenciado)

---

### Sección 10 — Precios

Ancho máximo 1100 px, centrado, relleno 96 px 60 px `border-top: 1px solid hsl(var(--border))`.

Header:
- H2: "Precios simples. Sin sorpresas." — 800 center
- p: "Un precio por ubicación de tienda. Cancelar en cualquier momento." — Centro silenciado de 14px
- Alternar: "Mensual / Anual (ahorre 20%)" — alternancia de píldora, mensual predeterminado, al hacer clic en anual se ajustan los precios

Tres niveles de precios en `grid-template-columns: 1fr 1.1fr 1fr`, la tarjeta del medio un poco más grande y elevado.

**Inicio: $0/mes**
- "Para las tiendas que comienzan"
- Características: 1 ubicación · Hasta 500 productos · POS básico · Informes de ventas (7 días) · Soporte por correo electrónico
- CTA: "Comenzar gratis" — botón fantasma

**Pro — $49/mes** (DESTACADO —`border: 2px solid hsl(var(--primary))`, insignia "Más popular", bg blanco, cuadro con sombra elevada)
- "Para propietarios de tiendas establecidas"
- Características: 1 ubicación · Productos ilimitados · POS completo con modo fuera de línea · Análisis de 90 días · Programación de personal · Perfiles de clientes · Integraciones (Shopify, Xero, Stripe) · Soporte prioritario
- CTA: "Iniciar prueba gratuita de 14 días" — botón verde azulado lleno, ancho completo

**Escala: $119/mes**
- "Para minoristas con múltiples ubicaciones"
- Características: Hasta 5 ubicaciones · Todo en Pro · Panel de control para múltiples ubicaciones · P&L por ubicación · Acceso API · Incorporación dedicada · SLA support
- CTA: "Contactar con ventas" - botón fantasma

Bajo la cuadrícula de precios: "Todos los planes incluyen migración de datos gratuita y una garantía de devolución de dinero de 30 días". — 12px silenciado centrado, margen superior 24px.

---

### Sección 11 — Preguntas frecuentes

Ancho máximo 760px, centrado, relleno 80px 60px. `border-top: 1px solid hsl(var(--border))`.

Header: "Preguntas frecuentes" — 800 32px centrado, margen inferior 40px.

Aestilo acordeón (shadcn/ui Accordion), 6 preguntas. Cada uno: disparador de ancho completo con icono "+" / "-" alineado a la derecha, relleno 18px 0, borde inferior 1px. Las diapositivas de respuesta se abren con la animación de altura de Framer Motion.

1. **¿Flore funciona sin conexión?** — Sí. El TPV de Flore sigue funcionando sin internet. Las transacciones se almacenan localmente y se sincronizan automáticamente cuando se restablece la conexión. No se pierden datos.

2. **¿Cuánto tiempo lleva la configuración?** — La mayoría de las tiendas están activas en un día. Brindamos un servicio de migración gratuito: nuestro equipo importa su catálogo de productos existente, datos de clientes e historial de ventas para que no comience desde cero.

3. **¿Puedo conectar Flore a Shopify o a mis herramientas existentes?** — Sí. Flore se integra con Shopify, Square, Stripe, Xero, QuickBooks, WooCommerce, Lightspeed y más de 30 herramientas más. Las conexiones tardan menos de 5 minutos.

4. **¿Qué hardware necesito?** — Flore se ejecuta en cualquier iPad o tableta Android para POS y en cualquier navegador moderno para el panel de administración. Funciona con impresoras de recibos y lectores de códigos de barras Bluetooth estándar.

5. **¿Existe un contrato?** — No. Todos los planes son de mes a mes. puedes cancelardesde la configuración de su cuenta en cualquier momento. La facturación anual está disponible con un 20% de descuento.

6. **¿Qué sucede cuando finaliza mi prueba gratuita?** — Se te pedirá que elijas un plan. Si no lo hace, su cuenta pasa al nivel inicial gratuito: nunca perderá sus datos.

---

### Sección 12 — Banner CTA

Ancho completo, `background: hsl(var(--primary))`, relleno 80px 60px. Sin límite de ancho máximo.

Contenido centrado:
- H2: "Su tienda merece un mejor software". — Además de Jakarta Sans 800, clamp(36px, 4vw, 52px), seguimiento -0,04 em, color blanco
- p: "Únase a más de 12 000 propietarios de tiendas que dejaron de unir cosas y comenzaron a administrar sus tiendas". — 15px, `color: rgba(255,255,255,0.75)`, ancho máximo 480px, margen 0 automático 36px
- Dos botones uno al lado del otro, centrado, espacio de 12px:
 - "Empezar gratis — 14 días" — fondo blanco, texto verde azulado, peso 700, relleno 14px 28px, radio de borde 9px
 - "Hablar con ventas" — `border: 1.5px solid rgba(255,255,255,0.35)`, texto blanco, fondo transparente, mismo relleno

---

### Sección 13 — Pie de página

Fondo: primer plano (`#1a1610`). Relleno 64px 60px 40px.

**Fila superior**: cuadrícula de 4 columnas, espacio de 48px.

Columna 1 (Marca):
- Marca + "Flore" en blanco
- "El sistema operativo para venta minorista física". — 13px `rgba(255,255,255,0.55)`, altura de línea 1.7, ancho máximo 200px
- Fila de íconos sociales: X · LinkedIn · Instagram — cada 20px, `rgba(255,255,255,0.4)`

Columna 2 (Producto):
- Encabezado: "Producto" — 11px en mayúsculas JetBrains Mono `rgba(255,255,255,0.35)`
- Enlaces (12px `rgba(255,255,255,0.6)`): Características · Integraciones · Precios · Registro de cambios · Estado

Columna 3 (Empresa):
- Encabezado: "Empresa"
- Enlaces: Acerca de · Clientes · Blog · Carreras · Press

Columna 4 (Recursos):
- Encabezado: "Recursos"
- Enlaces: Documentos · API · Guía de migración · Soporte · Reserve una demostración

**Fila inferior** (margen superior 48px, relleno superior 24px, `border-top: 1px solid rgba(255,255,255,0.1)`):
- Izquierda: "© 2026 Flore Technologies Ltd. Todos los derechos reservados".
- Derecha: "Política de privacidad · Términos · Cookies" — 11px `rgba(255,255,255,0.4)`
Ambos en 11px `rgba(255,255,255,0.4)`.

---

## Animaciones (resumen)

|Elemento | Animación | Gatillo |
|---|---|---|
| Líneas de texto de héroe | desvanecimiento tambaleante y:24 | en soporte |
| Tarjeta de tablero de héroe | y:40 escala:0,98 → flotación inactiva | en montaje, retraso de 0,3 s |
| Contadores de estadísticas | uso de conteoPrimavera | IntersecciónObservador |
| Tarjetas de características | desvanecimiento tambaleante y:16 | desplazarse enVer |
| Filas de características profundas | deslizable desde el lateral y:24 | desplazarse enVer |
| Tarjetas de testimonios | desvanecimiento tambaleante | desplazarse enVer |
| Tarjetas de precios | desvanecimiento tambaleante | desplazarse enVer |
| Preguntas frecuentes sobre acordeón | altura 0 → automático | haga clic en |
| Titular del banner de CTA | desvanecimiento | desplazarse enVer |

---

## Responsive

**Móvil (< 768px):**
- Navegación: hamburguesa → superposición deslizable hacia abajo en pantalla completa, CTA verde azulado de ancho completo en la parte inferior
- Héroe: columna única, tarjeta del tablero debajo del texto, tarjeta en ancho completo
- Barra de estadísticas: cuadrícula 2×2
- Tarjetas de características: columna única
- Filas de características profundas: columna única, imagen sobre el contenido, relación de aspecto 4/3
- Testimonios: ajuste de desplazamiento horizontal, una tarjeta visible a la vez time
- Precio: pila vertical, tarjeta Pro primero
- Pie de página: columna única, cuadrícula de enlaces de 2 columnas

**Tableta (768px–1024px):**
- Hero: 1fr 1fr pero con un relleno más ajustado
- Tarjetas de características: Cuadrícula de 2 columnas
- Filas de características profundas: mantenga 2 columnas, reduzca el espacio a 40px

---

## Key Dependencias

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.400.x",
  "@radix-ui/react-accordion": "^1.2.x",
  "@radix-ui/react-toggle": "^1.1.x"
}
```

---

## Notas rápidas

- El nombre de la marca es **Flore**: la identidad visual utiliza un icono de cuadrícula cuadrada de 2 × 2 como marca del logotipo (4 cuadrados pequeños en una cuadrícula, relleno de color verde azulado, 28 px contenedor).
: las cifras de precios son sugerencias: actualice para que coincidan con cualquier producto real. El interruptor de descuento anual está cableado para mostrar "mensual × 0,8" redondeado.
: las tres imágenes de filas profundas se describen como resúmenes fotográficos: cualquier fotografía de venta minorista, café o comestibles que se ajuste al estado de ánimo funcionará, no se requiere un cultivo específico.