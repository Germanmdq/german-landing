# Haul Co. — Aviso del sitio web de eliminación de basura

## 1. Declaración de objetivos
Cree un sitio web impactante y tranquilizador para **Haul Co.**, un equipo de eliminación de basura de dos personas: verde lima brillante sobre carbón intenso, tipo grotesco pesado y una tarjeta de antes y después dividida en diagonal que muestra un garaje desordenado que se convierte en un vacío. one.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin controles deslizantes de arrastre, sin calculadora de cotizaciones. Los precios están indicados y el llamado a la acción es un enlace `tel:`.

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(160, 12%, 11%);      /* charcoal with a green cast */
  --foreground: hsl(150, 12%, 95%);
  --primary: hsl(84, 82%, 56%);          /* lime */
  --primary-foreground: hsl(160, 20%, 10%);
  --muted-foreground: hsl(150, 6%, 62%);
  --border: hsl(160, 10%, 20%);
  --card: hsl(160, 12%, 15%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&display=swap" rel="stylesheet" />
```
- **H1:** Archivo 900, mayúsculas, clamp(52px, 8vw, 118px), altura de línea 0.92, espacio entre letras -0.03em
- **H2:** Archivo 900, mayúsculas, clamp(34px, 4.5vw, 64px)
- **Cuerpo:** Archivo 500, 17px, altura de línea 1.6
- **Etiquetas y precios:** Archivo 700, 13px, mayúsculas, espacio entre letras 0.1em

## 5. Efectos visuales

**Efecto 1: Diagonal antes y después.** Una tarjeta contiene dos fotografías divididas por una diagonal estricta usando una ruta de clip, con la etiqueta "ANTES" en la parte inferior izquierda y `DESPUÉS` arriba a la derecha en lima. Sin control deslizante, sin interacción: la división es la imagen.

```jsx
<div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
  {/* Image: cluttered garage full of old furniture and boxes, daylight, realistic */}
  <img src="" alt="Garage before clearance" className="absolute inset-0 h-full w-full object-cover object-center" />
  {/* Image: the same style of garage, completely empty and swept, daylight, realistic */}
  <img
    src="" alt="Garage after clearance"
    className="absolute inset-0 h-full w-full object-cover object-center"
    style={{ clipPath: "polygon(100% 0, 100% 100%, 22% 100%)" }}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
</div>
```

**Efecto 2: medidor de carga de camión.** La sección de precios muestra cuatro tamaños de carga como una fila de siluetas de camiones llenándose de cal desde abajo: un cuarto, la mitad, tres cuartos y lleno. Altura CSS pura, animada una vez cuando está a la vista.

**Efecto 3: barrido de subrayado de color lima.** Cada título de sección tiene una barra de color lima que se desplaza desde la izquierda debajo, `scaleX 0 → 1`, 0,6 s.

## 6. Desglose de componentes

1. **Barra superior**: texto de color lima y carbón de 40 px: `Recogida el mismo día · Envía una foto por mensaje de texto para obtener un precio en 10 minutos`.
2. **Barra de navegación**: 78 px, carbón, marca denominativa a la izquierda con un ícono de camión pequeño, enlaces en el centro, botón lima "Llamar al 0800 118 2244" a la derecha. Pegajoso.
3. **Héroe** — dividido. Izquierda: H1 en tres líneas, sublínea, dos botones y tres datos de confianza mono. Derecha: la tarjeta de antes y después (Efecto 1).
4. **Lo que tomamos**: una cuadrícula de 4 columnas de doce elementos cortos con pequeños íconos de Lucide: muebles, colchones, electrodomésticos, desechos de jardín, desorden en el garaje, oficina.limpiezas, cobertizos, jacuzzis, desechos de construcción, electricidad, alfombras, hogar en general.
5. **Lo que no aceptaremos**: tres líneas cortas en texto apagado bajo un borde delgado, honestas y breves.
6. **Precios**: el medidor de carga (Efecto 2) con cuatro precios debajo y una línea sobre lo que está incluido.
7. **Cómo funciona**: tres pasos con grandes números color lima.
8. **A dónde van las cosas**: una sección breve con una estadística enorme y dos oraciones sobre donación y reciclaje.
9. **Áreas**: una fila envuelta de pastillas de área.
10. **Reseñas**: tres reseñas sobre `--card` con cinco estrellas lima, cotización, nombre y tipo de trabajo.
11. **CTA final**: sección de lima, texto en carbón, H2 y el número de teléfono en grande.
12. **Pie de página**: carboncillo, tres columnas, número de licencia y línea de seguro.

## 7. Animaciones
- Hero H1: cada línea se desliza hacia arriba desde `y: 70` dentro de desbordamiento oculto, 0,8 s, escalonado 0,09 s
- Tarjeta de antes y después: `scale 0.96 → 1` y desvanecerse, 1s
- Títulos de sección: Efecto 3
- Medidores de camiones: llenar de 0 a su altura, 1s, escalonar 0.12s
- Elementos de cuadrícula: desvanecerse 16px, escalonar 0.04s
- Botones: la lima se ilumina y el botón se eleva 2px hover

## 8. Responsive
- **Móvil (<768px):** barra de llamada pegajosa de color lima fijada en la parte inferior de la pantalla; el héroe se apila primero con la carta de antes y después; H1 a 52 px; lo que tomamos se convierte en 2 columnas; los medidores de camiones se convierten en una cuadrícula de 2×2; la barra de navegación muestra una marca denominativa y un botón de teléfono en color lima.
- **Tableta:** qué-tomamos 3 columnas; el héroe permanece dividido.
- **Escritorio:** ancho máximo 1280px, `px-8`, espacio entre secciones `py-24`.

## 9. Copia completa

**Barra superior:** `Recogida el mismo día · Envía una foto por mensaje de texto por un precio en 10 minutos`

**Navbar:** Qué tomamos · Precios · Cómo funciona · Áreas — Llama al 0800 118 2244

**Hero**
- Etiqueta: `BASURA ELIMINACIÓN · NOTTINGHAM & DERBY`
- H1: `Tu apuntas. / Llevamos. / Ya no está.`
- Sublínea: `Dos personas, una furgoneta y nadie parado. Cargamos todo nosotros mismos, barremos después y te decimos el precio antes de empezar.`
- Botones:`Llame al 0800 118 2244` · `Envíe una foto por mensaje de texto para solicitar una cotización`
- Datos de confianza:` TRANSPORTISTA DE RESIDUOS CON LICENCIA` · `DISPONIBLE EL MISMO DÍA` ·` BARREMOS`

**Lo que tomamos** — H2 `Si puede señalarlo, podemos llevarlo.`
Muebles · Colchones · Refrigeradores y electrodomésticos · Desechos de jardín · Limpieza de garajes · Limpieza de oficinas · Cobertizos y terrazas · Bañeras de hidromasaje · Residuos de construcción · Televisores y aparatos eléctricos · Alfombras y pisos · Hogar en general

**Lo que no aceptaremos:** `Amianto, latas de pintura con pintura líquida aún dentro y neumáticos de automóvil. Sin embargo, te diremos quién puede hacerlo.`

**Precios** — H2 `El precio se basa en la cantidad de espacio que ocupa.`
- **Un cuarto de carga** — `£95` — `Algunas bolsas, un colchón, un par de sillas.`
- **Media carga** — `£165` — `Un dormitorio pequeño o un dormitorio despejado cobertizo.`
- **Carga de tres cuartos** — `£225` — `Un garaje o muebles para un apartamento de dos habitaciones.`
- **Carga completa** — `£290` — `Una limpieza de la casa o una oficina completa.`
Nota: `Cada precio incluye mano de obra, carga, gastos de eliminación e IVA. Sin recargo por escaleras.`

**Cómo funciona**
- **01 — Enviar una foto** — `Envía una imagen por mensaje de texto o WhatsApp. Obtienes un precio fijo, normalmente en diez minutos.`
- **02 — Llegamos** — `Ventana de dos horas y llamamos cuando partimos. El mismo día si nos pillas antes del mediodía.`
- **03 — Limpiamos y barremos** — `No levantas nada. Cepillamos el espacio antes de irnos.`

**Dónde van las cosas** — Estadística: `72%` — `de todo lo que recolectamos se dona o se recicla en lugar de depositarse en vertederos. Los muebles utilizables van a dos organizaciones benéficas de reutilización locales, los metales y los productos eléctricos van a un reciclador autorizado y guardamos las notas de transferencia para que las tenga si alguna vez las necesita.`

**Áreas:** Nottingham · West Bridgford · Beeston · Arnold · Long Eaton · Ilkeston · Derby · Ripley · Mansfield · Newark · Hucknall · Stapleford

**Reseñas**
- `"Cotizó £165 por una foto, cobró £165 y barrió el piso del garaje. Es la primera vez que esto sucede". *Owen, Beeston* —``REMODELACIÓN DE LA TINA CALIENTE`
- `"Limpié el departamento de mi madre la semana que lo necesitábamos y encontré una organización benéfica para el sofá."` — *Rachel, Derby* — `LIQUIDACIÓN DE LA CASA`

**CTA final** — `¿TIENES UNA PILA? ENVÍANOS UNA FOTO.` · `0800 118 2244` · `Texto, WhatsApp o llamada. Siete días a la semana, de 7 a.m. a 8 p.m.`

**Pie de página** — HAUL CO. · Qué aceptamos · Precios · Áreas · Reseñas · Contacto · `Transportador de residuos con licencia CBDU482119 · Totalmente asegurado · Registrado en Inglaterra 13998421` · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
