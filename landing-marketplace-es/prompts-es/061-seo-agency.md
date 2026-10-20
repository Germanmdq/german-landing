# Búsqueda compuesta: mensaje del sitio web de una agencia de SEO

## 1. Declaración de objetivos
Crear un sitio web de agencia de SEO con envío de datos para **Búsqueda compuesta**, definido por un acento casi negro, un marcado acento chartreuse y métricas monoespaciales: un sitio de agencia que lidera con un gráfico de tráfico real y resultados de clientes nombrados en lugar de una cuadrícula de servicios.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(228, 16%, 9%);        /* #14151c */
  --foreground: hsl(220, 14%, 95%);       /* #f0f1f4 */
  --primary: hsl(72, 88%, 58%);           /* #d4ee32 chartreuse */
  --primary-foreground: hsl(228, 18%, 8%);
  --muted-foreground: hsl(222, 8%, 56%);
  --border: hsl(228, 12%, 19%);
  --card: hsl(228, 14%, 12%);
  --card-elevated: hsl(228, 12%, 16%);
  --loss: hsl(4, 72%, 58%);               /* used for competitor decline */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=General+Sans:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```
Fallback si General Sans no está disponible: `Satoshi`, luego `Inter`.
- **H1:** General Sans 700, clamp(40px, 5.4vw, 78px), espacio entre letras -0.035em
- **H2:** General Sans 600, 32–46px
- **H3:** General Sans 600, 18–20px
- **Cuerpo:** General Sans 500, 16px, altura de línea 1,7
- **Cejas/etiquetas de datos:** JetBrains Mono 500, mayúsculas, espacio entre letras 0,14em, 11px, chartreuse
- **Métricas:** General Sans 700, tabular-nums

## 5. Efectos visuales

**Efecto 1: gráfico de crecimiento del tráfico animado.** Un gráfico de líneas SVG en línea dibujado con `pathLength` que muestra sesiones orgánicas durante dieciocho meses, con una línea chartreuse, un relleno degradado sutil debajo y etiquetas de mes en monoespacio. La línea se dibuja a lo largo de 1,8 segundos al desplazarse.

```tsx
<svg viewBox="0 0 600 220" className="w-full">
  <defs>
    <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
    </linearGradient>
  </defs>
  <motion.path d={areaPath} fill="url(#fill)"
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 1.2 }} />
  <motion.path d={linePath} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round"
    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
    transition={{ duration: 1.8, ease: 'easeInOut' }} />
</svg>
```

**Efecto 2: escalera de posición de palabras clave.** Una lista vertical donde cada fila muestra una palabra clave, una posición anterior y una posición posterior, con una barra chartreuse cuya longitud se corresponde con la mejora. Las filas se animan desde la izquierda con un escalonamiento.

## 6. Desglose de componentes

1. **Barra de navegación**: 72 px, fijo, casi negro con desenfoque, borde inferior chartreuse de 1 px después del desplazamiento. Marca denominativa a la izquierda, centro de enlaces, botón chartreuse "Obtener una auditoría gratuita" a la derecha.
2. **Hero** — 88vh, tipo LED con una cuadrícula de puntos tenues. Mono ceja, H1, sublínea, dos CTA, cuatro etiquetas tipo cliente. No hay imágenes de archivo.
3. **Gráfico de crecimiento**: la sección de prueba (Efecto 1) con un título que indica el tipo de cliente y el período.
4. **Resultados**: cuatro métricas de recuento: aumento promedio del tráfico, promedio de meses hasta el resultado, clientes retenidos, palabras clave entre las tres principales.
5. **Servicios** — 2x3grid: SEO técnico, estrategia de contenidos, relaciones públicas y enlaces digitales, SEO local, SEO de comercio electrónico, visibilidad de búsqueda mediante IA.
6. **Escalera de palabras clave**: mejoras de posición para ocho palabras clave de apariencia real (Efecto 2), agrupadas por cliente.
7. **Estudios de casos**: tres tarjetas con la industria, la posición inicial, lo que se hizo y el resultado en un solo número.
8. **Cómo trabajamos**: cuatro fases a lo largo de noventa días con etiquetas de semana monoespaciada.
9. **Precios**: tres anticipos con lo que se incluye y una declaración explícita sobre la duración y la salida del contrato.
10. **Lo que no hacemos**: una breve sección obstinada que enumera cuatro tácticas que la agencia rechaza, con sus razones.
11. **Auditoría gratuita**: división: desde la izquierda, lo que obtienes correctamente, con el plazo de entrega indicado.
12. **Pie de página**: pizarra más oscura, regla superior chartreuse, cuatro columnas, registro de empresa.

## 7. Animaciones
- Héroe: la cuadrícula de puntos se desvanece en 1,2 segundos; H1 se desvanece 0,7 s; las etiquetas se escalonan 0,06 s
- Gráfico de tráfico: las líneas se dibujan en 1,8 s, el relleno del área se desvanece con un retraso de 1,2 s, las etiquetas de los ejes se desvanecen al final
- Métricas: recuento ascendente 1700 ms en `useInView`
- Filas de escalera de palabras clave: `x: -20 → 0` con 0,07 s tambalear; la barra de mejora escala desde la izquierda en 0,6 s
- Tarjetas de servicio: el borde chartreuse de 1 px se desvanece al pasar el mouse, 0,2 s, sin transformación
- Línea de tiempo de fase: la línea chartreuse escala desde la izquierda, 0,9 s; las etiquetas de la semana se escriben a 40 ms por carácter

## 8. Responsive
- **Móvil (<768px):** hamburguesa; H1 se fija a 40 px; el gráfico mantiene el ancho completo a una altura más corta del viewBox con la etiqueta de cada dos meses oculta; métricas 2x2; servicios 1-col; las filas de escalera de palabras clave apilan la palabra clave encima del par antes y después; precios 1-col.
- **Tableta:** servicios 2-col, métricas 4-col en tipo más pequeño, estudios de casos 3-col.
- **Escritorio:** ancho máximo 1200px, `px-16`, `py-24`.

## 9. Completo Copia

**Marca:** BÚSQUEDA COMPUESTA · Agencia SEO · Lisboa y remoto

**Navbar:** Resultados · Servicios · Estudios de casos · Precios · Acerca de · [Botón] Obtenga una auditoría gratuita

**Hero**
- Ceja: `AGENCIA SEO · LISBOA Y REMOTO · B2B Y ECOMMERCE ·DESDE 2018`
- H1:`Compuestos SEO. La mayoría de las agencias facturan antes que ellos.`
- Subline: `Aceptamos ocho clientes a la vez y trabajamos en las dos o tres cosas que realmente mueven un sitio. Si no podemos ver un camino hacia un resultado en noventa días, lo informaremos antes de firmar.`
- CTA: `Obtenga una auditoría gratuita` · `Ver casos de estudio`
- Etiquetas: `B2B SAAS` · `ECOMMERCE` · `MERCADOS` · `SERVICIOS PROFESIONALES`

**Gráfico de crecimiento** — Leyenda: `Sesiones orgánicas, cliente B2B SaaS, 18 meses desde el inicio del compromiso. 4,100 a 61,400 sesiones mensuales.`

**Resultados** — `+412%` Tráfico orgánico promedio a los 12 meses · `4.5` Promedio de meses para resultados medibles · `91%` Retención de clientes después del primer año · `1,840` Palabras clave de clientes en la parte superior tres

**Servicios**
1. **SEO técnico**: presupuesto de rastreo, indexación, renderizado, Core Web Vitals y arquitectura del sitio. Poco glamoroso y, por lo general, de donde proviene el primer treinta por ciento.
2. **Estrategia de contenido**: grupos de temas creados en torno a una cobertura ampliada en lugar de una palabra clave por página, con resúmenes que sus escritores realmente pueden usar.
3. **Relaciones públicas y enlaces digitales**: enlaces obtenidos a partir de historias basadas en datos y comentarios de expertos. No hay redes de publicaciones de invitados, ni ubicaciones pagas, ni redes de blogs privados.
4. **SEO local**: administración de perfiles de múltiples ubicaciones, velocidad de revisión y páginas de ubicación que no son la misma página con el nombre de una ciudad intercambiada.
5. **SEO de comercio electrónico**: arquitectura de categorías, control de navegación por facetas y esquema de producto. La mayoría de los sitios de comercio electrónico pierden más por el exceso de indexación que por la competencia.
6. **Visibilidad de búsqueda de IA**: ser citado en AI Overviews, ChatGPT y Perplexity. Se basa en SEO clásico más menciones fuera del sitio, y explicaremos honestamente por qué la mayoría de los paquetes GEO son teatro. 

**Escalera de palabras clave** - Ceja `MOVIMIENTO DE POSICIÓN` - H2 `Doce meses de movimiento`
- `software de adquisiciones` - 34 → 3
- `plataforma de gestión de proveedores` — 61 → 7
- `herramienta de análisis de gastos` — 88 → 4
- `software de incorporación de proveedores` — 27 → 2
- `gestión del ciclo de vida del contrato` — 45 → 9
- `orden de comprasoftware` — 19 → 1
- `comparación de plataformas de abastecimiento` — 72 → 6
- `automatización de adquisiciones` — 51 → 5

**Estudios de casos**
1. **B2B SaaS, adquisiciones**: comenzó con 4100 sesiones mensuales con un 90 % de marca. Reconstruyó la arquitectura del sitio, eliminó 340 páginas delgadas y creó ocho grupos de temas. **61.400 sesiones a los 18 meses, 71% sin marca.**
2. **Comercio electrónico, equipos para actividades al aire libre**: la navegación por facetas generaba 1,2 millones de URL indexables. Lo controlé, categorías consolidadas, esquema de producto fijo. **Los ingresos orgánicos aumentaron 2,8 veces en 11 meses.**
3. **Servicios profesionales, 14 ubicaciones**: las páginas de ubicación estaban duplicadas con una ciudad intercambiada. Reescribí cada uno de ellos en torno a contenido genuinamente local y reconstruí el perfil. **La visibilidad del paquete local aumentó un 340 % y las consultas aumentaron un 190 %.**

**Cómo trabajamos**
- `SEMANA 1–2` **Auditoría y priorización**: auditoría técnica y de contenido completa. Obtendrá una lista clasificada de lo que importa, con una nota honesta sobre lo que no. 
- `SEMANA 3–6` **Fundamentos**: arquitectura y arreglos técnicos. Nada más funciona correctamente hasta que esto funcione.
- `SEMANA 7–12` **Contenido y enlaces**: se enviaron grupos y se obtuvieron los primeros enlaces obtenidos. Aquí es donde la curva comienza a doblarse.
- `MES 4+` **Composición**: envío mensual, informes mensuales, reinicio de estrategia trimestral. Los resultados se aceleran porque la base ya está establecida.

**Precios**
- **Fundación: 3200 € al mes** — SEO técnico y arquitectura · Informes mensuales · Dos llamadas de estrategia al mes · Ideal para sitios de menos de 500 páginas
- **Crecimiento: 5800 € al mes** *(más elegidos)* — Todo en Foundation · Estrategia de contenido y resúmenes · Cuatro enlaces ganados al mes · Informes semanales · Estratega dedicado
- **Compuesto: 9500 € al mes** — Todo en crecimiento · Campañas de relaciones públicas digitales · Comercio electrónico o alcance en múltiples ubicaciones · Equipo designado de tres · Trimestral en el sitio

Nota: `Mínimo de tres meses, luego mensual. Sin bloqueo de doce meses, porque una agencia que lo necesita te está diciendo algo.`

**Lo que no hacemos** — H2 `Cuatro cosas que no te venderemos`
1.`Redes de publicaciones de invitados y enlaces pagos. Funcionan hasta una actualización, luego no lo hacen y no se pueden deshacer rápidamente.
2. `Volumen de publicación.` La correlación entre el recuento de páginas y la visibilidad de la IA es de 0,19. Cuarenta artículos al mes es una estrategia de facturación, no de SEO.
3. `llms.txt y esquema vendidos como optimización de IA.` Un estudio de 137.000 dominios encontró que el 97% de los archivos llms.txt nunca fueron recuperados. El esquema es para resultados enriquecidos, no para citas de IA.
4. `Clasificar los informes como entregables.` Registramos el valor del tráfico, el porcentaje de voz y las conversiones. Los puestos en una era de descripciones generales de IA significan considerablemente menos de lo que solían ser.

**Auditoría gratuita** - Formulario: Nombre / Empresa / Sitio web / Sesiones orgánicas mensuales / ¿Cuál es el objetivo? → [Botón] `Obtenga una auditoría gratuita`
Lo que obtiene: `Una auditoría de doce páginas en cinco días hábiles, una lista clasificada de correcciones y una llamada de treinta minutos. Sin compromiso, y te avisaremos si no nos necesitas.`

**Pie de página** — BÚSQUEDA COMPUESTO · `SEO que compuestos. Lisboa y remoto.` · `hello@compoundsearch.com` · Registro de empresa PT 514882019 · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
