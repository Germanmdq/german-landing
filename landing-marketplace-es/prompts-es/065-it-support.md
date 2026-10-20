# Northgate IT: mensaje del sitio web de soporte de TI administrado

## 1. Declaración de objetivos
Crear un sitio web de soporte de TI administrado, tranquilo y basado en pruebas para **Northgate IT**, definido por una pizarra profunda, un único acento de lima eléctrica y métricas monoespaciales: un sitio B2B que vende tiempos de respuesta y honestidad sobre lo que se rompe, no fotografías de archivo de personas señalando monitors.

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(222, 24%, 10%);      /* #131722 deep slate */
  --foreground: hsl(210, 18%, 94%);      /* #eceff3 */
  --primary: hsl(84, 78%, 56%);          /* #b3e93a electric lime */
  --primary-foreground: hsl(222, 26%, 8%);
  --muted-foreground: hsl(215, 10%, 56%);
  --border: hsl(222, 18%, 20%);
  --card: hsl(222, 22%, 13%);
  --card-elevated: hsl(222, 20%, 17%);
  --warn: hsl(38, 92%, 58%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```
- **H1:** Manrope 800, clamp(38px, 5vw, 72px), espacio entre letras -0.035em
- **H2:** Manrope 600, 30–44px
- **H3:** Manrope 600, 18–20px
- **Cuerpo:** Manrope 400, 16px, altura de línea 1,72
- **Cejas/etiquetas:** JetBrains Mono 500, mayúsculas, espacio entre letras 0,12em, 11px, lime
- **Métricas/cifras de SLA:** Manrope 800, tabular-nums

## 5. Efectos visuales

**Efecto 1: tabla de respuesta de SLA con estado de apariencia en vivo.** Filas de prioridad de ticket con una pastilla de lima que muestra la respuesta garantizada y una pequeña barra animada que muestra el promedio real frente al objetivo. Las barras reales son más cortas que el objetivo, que es todo el argumento de venta.

```tsx
{tiers.map((t, i) => (
  <div key={t.level} className="grid grid-cols-12 items-center gap-4 border-b border-[var(--border)] py-5">
    <span className="col-span-2 font-mono text-xs uppercase tracking-wider text-[var(--primary)]">{t.level}</span>
    <span className="col-span-4 text-sm">{t.example}</span>
    <div className="col-span-4 h-2 rounded-full bg-[var(--card-elevated)]">
      <motion.div className="h-full rounded-full bg-[var(--primary)]"
        initial={{ width: 0 }} whileInView={{ width: `${(t.actual / t.target) * 100}%` }}
        viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} />
    </div>
    <span className="col-span-2 text-right font-bold tabular-nums">{t.actual}m<span className="text-[var(--muted-foreground)]"> / {t.target}m</span></span>
  </div>
))}
```

**Efecto 2: brillo de color lima al seguir el cursor en las tarjetas.** Un brillo radial de color lima con una opacidad del 8 % sigue el puntero dentro de las tarjetas de servicio mediante una propiedad personalizada de CSS actualizada en `mousemove`, lo que le da a la cuadrícula oscura una interacción sutil. sheen.

## 6. Desglose de componentes

1. **Barra de navegación**: 72 píxeles, fijo, `rgba(19,23,34,0.94)` con desenfoque. Marca denominativa a la izquierda, centro de enlaces, botón lima "Reservar una llamada de descubrimiento" a la derecha.
2. **Hero** — 86vh, tipo LED con un patrón de cuadrícula color lima tenue detrás. Mono ceja, H1, sublínea, dos CTA, cuatro etiquetas tipo cliente. No hay fotografía de stock.
3. **Banda de métricas**: cuatro cifras de conteo: primera respuesta promedio, primer contacto con tickets resueltos, retención de clientes, años de funcionamiento.
4. **Servicios**: cuadrícula de 2x3 con brillo del cursor (Efecto 2): servicio de asistencia técnica, infraestructura, Microsoft 365, elementos esenciales cibernéticos, copia de seguridad y recuperación, adquisiciones.
5. **Tabla SLA**: la pieza central de credibilidad (Efecto 1), cuatro niveles de prioridad con objetivoversus real.
6. **Cómo funciona la incorporación**: cinco pasos durante los primeros treinta días, cada uno con una etiqueta de día único.
7. **Precios**: mensual por usuario, tres niveles, con una declaración explícita de lo que no está incluido.
8. **Sectores**: tres bloques: servicios profesionales, fabricación y atención sanitaria, cada uno de los cuales nombra una restricción de cumplimiento específica.
9. **Lo que le diremos honestamente**: una breve sección obstinada que enumera tres cosas que la mayoría de los MSP no dirían en voz alta.
10. **Contacto**: dividido: formulario a la izquierda, correo electrónico directo, teléfono y enlace al portal de soporte a la derecha.
11. **Pie de página**: pizarra más oscura, regla superior de lima, cuatro columnas, registro de la empresa y número de ICO.

## 7. Animaciones
- Hero: el patrón de cuadrícula se desvanece en 1,2 segundos; H1 se desvanece 0,7 s; las etiquetas se escalonan 0.06s
- Métricas: cuenta atrás 1700ms en `useInView`
- Tarjetas de servicio: el brillo radial color lima sigue al cursor, 0 retraso, opacidad 0 → 0.08 en enter
- Barras SLA: el ancho se anima en el desplazamiento, 1s, escalonado 0.1s
- Pasos de incorporación: línea de conexión de cal `scaleX 0 → 1`, 0.9s; las etiquetas del día se escriben con una revelación de 40 ms por carácter
- Tarjetas de precios: el nivel medio se encuentra en `scale 1.03` en reposo, todos levantan `-4px` al pasar el mouse

## 8. Responsive
- **Móvil (<768px):** hamburguesa; H1 se fija a 38 px; métricas 2x2; servicios 1-col con el brillo del cursor desactivado; La tabla SLA se convierte en filas apiladas con la barra en todo su ancho debajo de la etiqueta; fijar el precio de 1 columna con el nivel popular primero; incorporación vertical.
- **Tableta:** servicios de 2 columnas, métricas de 4 columnas en tipo más pequeño, la tabla SLA mantiene la forma de cuadrícula.
- **Escritorio:** ancho máximo 1200px, `px-16`, `py-24`.

## 9. Completo Copia

**Marca:** NORTHGATE IT · Birmingham

**Barra de navegación:** Servicios · SLA · Precios · Incorporación · Sectores · [Botón] Reservar una llamada de descubrimiento

**Hero**
- Ceja: `SOPORTE DE TI GESTIONADO · BIRMINGHAM & WEST MIDLANDS · DESDE 2012`
- H1: `Respondemos en cuatro minutos. Pregunte al último lote.`
- Sublínea: `TI totalmente gestionada para empresas de entre quince y doscientos empleados. Precio fijo por usuario, un ingeniero designado que sabesu configuración y un SLA que publicamos en lugar de ocultarlo en un apéndice.`
- CTA: `Reserve una llamada de descubrimiento` · `Ver nuestro SLA`
- Etiquetas: `15–200 PERSONAL` · `MULTI-SITIO` · `HÍBRIDO` · `REGULADO`

**Métricas** — `4m 12s` Promedio de primera respuesta · `71%` Resuelto en el primer contacto · `96%` Retención de clientes · `14` Años operativos

**Servicios**
1. **Servicio de asistencia**: soporte ilimitado por teléfono, correo electrónico y portal, con personal de 07:30 a 18:30 con cobertura fuera de horario para la prioridad uno. Cada ticket llega primero a un ser humano, no a un formulario.
2. **Infraestructura**: servidores, redes, firewalls y Wi-Fi, ya sea local, en Azure o la extraña combinación que la mayoría de las empresas utilizan.
3. **Microsoft 365**: migración, protección de inquilinos, administración de dispositivos Intune, SharePoint que las personas pueden navegar y revisiones de licencias que generalmente ahorran dinero.
4. **Cyber ​​Essentials**: soporte de certificación y trabajo de remediación para aprobarlo, en lugar de una lista de verificación que usted completa con optimismo.
5. **Copia de seguridad y recuperación**: copias de seguridad inmutables, pruebas de restauración trimestrales y un plan de recuperación documentado. Probamos las restauraciones porque las copias de seguridad que nunca se han restaurado son un rumor.
6. **Adquisiciones**: especificación de hardware, compra, creación de imágenes y etiquetado de activos, entregados configurados en el escritorio.

**SLA**
| Prioridad | Ejemplo | Real / Objetivo |
|---|---|---|
| `P1` | Todo el sitio caído, nadie puede trabajar | 4m / 15m |
| `P2` | Departamento bloqueado, un sistema caído | 11m/30m |
| `P3` | Individuo bloqueado, existe una solución alternativa | 26m / 120m |
| `P4` | Solicitud, cambio o pregunta | 1h 14m / 8h |

Nota: `Estos son nuestros promedios móviles reales de doce meses, no nuestros objetivos. Publicamos ambos porque publicar solo el objetivo es la forma en que la industria obtuvo su reputación.`

**Incorporación**
- `DÍA 1` **Descubrimiento**: recorremos el sitio, hacemos un inventario de todo y entrevistamos a tres personas que lo usan a diario. La lista de lo que nadie documentó es siempre la parte interesante.
- `DÍA 3` **Informe de riesgo** — Obtienes unEvaluación escrita sobre lo que es urgente, lo que es costoso y lo que dejaríamos de lado por ahora. 
- `DÍA 7` **Herramientas implementadas**: agentes de monitoreo, parches y respaldo implementados. Desde aquí podemos ver los problemas antes de que los informe.
- `DÍA 14` **Transferencia del titular**: gestionamos la conversación con su proveedor saliente, incluidas las partes incómodas.
- `DÍA 30` **Revisión**: primer mes de datos del ticket, cumplimiento de parches y una prioridad revisada list.

**Precios**
- **Esencial: £42 por usuario/mes** — Servicio de asistencia técnica de 07:30 a 18:30 · Parches y monitoreo · Administración de Microsoft 365 · Copia de seguridad con prueba de restauración mensual
- **Completo: £64 por usuario/mes** *(el más elegido)* — Todo en Essential · Prioridad fuera de horario una portada · Ingeniero designado · Revisión trimestral de tecnología · Mantenimiento de Cyber Essentials
- **Completo + Infraestructura: £89 por usuario/mes** — Todo completo · Administración de servidor y red incluida · Firewall y Wi-Fi bajo contrato · Día en el sitio todos los meses

No incluido: `El hardware, las licencias y el trabajo del proyecto se cotizan por separado. Preferiríamos mostrarlos como líneas de pedido que ocultarlos en una cifra por usuario.`

**Sectores**
- **Servicios profesionales**: firmas legales y contables donde la retención de documentos y la confidencialidad del cliente son contractuales, no aspiracionales.
- **Fabricación**: sistemas de taller que son anteriores a todos en el edificio, además de la red de oficinas con la que tiene que hablar ellos.
- **Atención médica**: consultorios y clínicas privadas bajo DSPT, donde el manejo de datos de pacientes tiene que sobrevivir a una auditoría.

**Lo que le diremos honestamente** — H2 `Tres cosas que la mayoría de los proveedores no dirán`
1. `Probablemente necesites menos licencias de las que pagas. Auditamos esto en el primer mes y generalmente paga una parte de nuestros honorarios. `
2. `Parte de su hardware está bien. El estándar de la industria es un ciclo de actualización de tres años porque se adapta al margen del revendedor, no porque las máquinas dejen de funcionar.`
3. `Si tu proveedor actual responde y te agrada, quédate. Preferimos perder un lanzamiento que tomaren un cliente que no necesitaba mudarse.`

**Contacto** — Formulario: Empresa / Nombre / Correo electrónico / Teléfono / Número de personal / ¿Qué no funciona? → [Botón] `Reservar una llamada de descubrimiento`
Direct: `hello@northgateit.co.uk` · `0121 555 0133` · Clientes existentes: portal de soporte

**Pie de página** — NORTHGATE IT · `Soporte de TI administrado, Birmingham y West Midlands` · `Unit 12, Fazeley Studios, Birmingham B5 5SE` · Registro de empresa 08123774 · Registro ICO ZA204118 · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
