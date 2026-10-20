# Sitio web de control de plagas Prompt
# websiteprompts.ai

Cree un sitio web de servicios de control de plagas profesional para **ShieldPest**, una empresa local de control de plagas que ofrece tratamientos residenciales y comerciales. Base casi negra, tipografía blanca limpia, acento verde lima intenso. Profesional y confiable pero moderno y audaz, no el cliché amarillo polvoriento del control de plagas. Piense en una marca de servicio premium.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

## Design System
```css
:root {
  --background: 0 0% 6%;            /* #0f0f0f near-black */
  --surface: 0 0% 9%;               /* #171717 surface */
  --surface-raised: 0 0% 12%;       /* #1f1f1f raised */
  --border: 0 0% 16%;               /* #292929 border */
  --foreground: 0 0% 96%;           /* #f5f5f5 white */
  --muted: 0 0% 48%;                /* #7a7a7a muted */
  --primary: 88 72% 44%;            /* #5db81e lime green */
  --primary-dark: 88 76% 34%;       /* #468f16 hover */
  --primary-light: 88 60% 94%;      /* #f0fae6 green tint */
  --primary-glow: 88 72% 44% / 0.12;
  --mono: 'JetBrains Mono', monospace;
}
```

## Tipografía
Importación: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap`
- Pantalla / H1–H2: Plus Jakarta Sans 700–800, espacio entre letras -0,03em
- Cuerpo/UI/Nav: Plus Jakarta Sans 400–600
- Etiquetas/etiquetas/números: JetBrains Mono 400

## Efectos visuales

**Píldora de insignia verde** — etiquetas de servicio y garantía:
```css
.badge { background: hsl(var(--primary-light)); color: hsl(var(--primary-dark));
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em;
  padding: 4px 10px; border-radius: 100px; text-transform: uppercase; }
/* Dark mode version for dark bg sections: */
.badge-dark { background: hsl(88 72% 44% / 0.12); color: hsl(var(--primary)); border: 1px solid hsl(88 72% 44% / 0.25); }
```

**Glow card hover** — tarjetas de servicio: `border-color: hsl(var(--primary))`, `box-shadow: 0 0 32px hsl(88 72% 44% / 0.15)`. Transición 0.18s.

**Estadísticas de conteo** — los números de estadísticas se animan desde 0 usando Framer Motion `useSpring`, activado por IntersectionObserver.

**Desvanecimiento escalonado** — `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}`, 0.5s, por sección.

## Secciones

**1. Barra de navegación**: fija, `background: hsl(var(--background) / 0.94)`, desenfoque de 12 píxeles, borde inferior. Izquierda: "ShieldPest" Plus Jakarta 800 18px blanco con un pequeño ícono de escudo verde (lucide `Shield`). Centro: Servicios · Cómo Funciona · Cobertura · Contacto. Derecha: "Obtenga una cotización gratuita": relleno de color verde, radio de borde de 6 píxeles, más Jakarta 600 de 13 píxeles. Microbarra superior encima del navegador: "Llamada de emergencia las 24 horas, los 7 días de la semana · +44 800 123 4567" — JetBrains Mono 10px silenciado en un bg.

**2 ligeramente más oscuro. Hero**: ventana gráfica completa, dos columnas, alineación de elementos en el centro, relleno 100 px 64 px. Izquierda: Insignia verde JetBrains Mono de 10 píxeles "LICENCIADO · ASEGURADO · GARANTIZADO". H1 Plus Jakarta 800, clamp(52px, 6vw, 80px), altura de línea 0,96, blanco:
```
Your home.
Pest-free.
Guaranteed.
```
 "Garantizado". en verde. Sub: Plus Jakarta 400 15px silenciado, ancho máximo 400px: "Control de plagas rápido, discreto y totalmente garantizado para hogares y empresas en toda la región. Citas disponibles para el mismo día".
CTAs: "Obtenga una cotización gratuita" (relleno en verde)+ "Llamar ahora" (borde blanco fantasma, icono de "Teléfono" lucide). Abajo: 3 chips de confianza: "Servicio el mismo día" · "Garantía de 12 meses" · "Técnicos certificados": fondo blanco, borde, texto oscuro, JetBrains Mono 10px.
Derecha: foto principal con desbordamiento XL redondeado oculto:
```
{/* Image: pest control technician in professional uniform and protective gear inspecting a home exterior, confident professional expression, natural daylight, clean modern residential setting */}
```
Resplandor verde debajo de la imagen: `box-shadow: 0 24px 60px hsl(88 72% 44% / 0.2)`.

**3. Tira de prueba**: superficie de ancho completo, borde superior + inferior, relleno 20 px 64 px. Fila flexible con 4 elementos de estadísticas separados por divisores. Números de recuento: más de 5000 hogares tratados · 15 años de experiencia · Calificación de 4,9★ · 98% de éxito en la primera visita. Cada uno: JetBrains Mono valor verde de 11 px + etiqueta silenciada Plus Jakarta de 12 px.

**4. Servicios**: relleno 96px 64px. H2 Plus Jakarta 800: "Lo que tratamos". Cuadrícula de tarjetas de 3 columnas (2 filas = 6 servicios). Cada tarjeta `background: hsl(var(--surface))`, borde, radio de borde de 10 px, relleno de 28 px, desplazamiento luminoso. Estructura de la tarjeta: icono de Lucide (verde, 24 px) + nombre del servicio Plus Jakarta 700 18 px + descripción de 2 líneas + placa oscura (por ejemplo, "Residencial" o "Comercial") + enlace de texto verde "Más información →". Servicios: Ratas y ratones · Chinches · Cucarachas · Avispas y avispones · Hormigas · Polillas y escarabajos.

**5. Cómo funciona**: superficie bg, relleno 96 px 64 px. H2 "Simple. Rápido. Garantizado." Fila horizontal de 4 pasos: 01 Reserva online en 2 min → 02 Visitas al técnico en 24h → 03 Tratamiento aplicado de forma segura → 04 Resultados garantizados. Cada paso: número grande de JetBrains Mono en verde descolorido (opacidad 0,12) + nombre del paso Plus Jakarta 700 + descripción de 1 línea.

**6. Cobertura y garantía**: dos columnas, relleno 96 px 64 px. Izquierda: H2 "Cubrimos tu área". Div de marcador de posición del mapa (superficie oscura, borde, aspecto 4/3, entrada de búsqueda "Compruebe su código postal" centrada con el botón verde). Derecha: Tarjeta de garantía: superficie bg, borde izquierdo 3px verde, relleno 32px. Contenido: grande ✓ ícono verde + H3 "Garantía de 12 meses" + 3 viñetas (nuevo tratamiento si es necesario · sin cargo adicional · sin preguntas) + enlace "Ver términos de garantía →".

**7. Testimonios**: relleno 96px 64px. H2 "Con la confianza de miles de personas". Cuadrícula de 3 columnas. Cada tarjeta: superficie bg, borde, radio de borde 10 px, relleno 28 px. Estrellas ★★★★★ verde + cita Plus Jakarta 300 cursiva 14px + nombre del cliente Plus Jakarta 600 + etiqueta de tipo de plagaJetBrains Mono 10px silenciado. Entrada escalonada.

**8. Banner de CTA**: fondo verde `hsl(var(--primary))`, relleno 72 px 64 px, centrado. Superposición de textura diagonal sutil (degradado lineal repetido blanco con 4 % de opacidad). H2 Plus Jakarta 800 blanco: "¿Listo para recuperar tu casa?" Subblanco 70%. Dos CTA: "Obtenga una cotización gratuita" (bg negro, texto blanco) + "Llámenos ahora" (borde blanco fantasma). Abajo: "Sin cargo por llamada · Respuesta dentro de 2 horas" JetBrains Mono 11px blanco 50%.

**9. Pie de página**: `hsl(0 0% 4%)`, relleno 48px 64px 28px. 3 columnas: Marca (logotipo + dirección + teléfono + correo electrónico) / Enlaces de servicios / Enlaces de empresa (Acerca de · Cobertura · Blog · Contacto). Abajo: copyright + "Con licencia de BPCA · Totalmente asegurado" JetBrains Mono 10px silenciado.

## Responsive
Móvil: microbarra superior oculta · superposición de hamburguesa de navegación · héroe de una sola columna, foto a continuación · servicios de 2 columnas · cómo funciona 2×2 · instantánea de desplazamiento de testimonios · cobertura única column.

## Resumen de animaciones
| Elemento | Animación | Gatillo |
|---|---|---|
| Contenido de héroe | Desvanecimiento escalonado | En el soporte |
| Estadísticas de prueba | Uso de conteo Primavera | Desplazamiento |
| Tarjetas de servicio | Desvanecimiento escalonado + desplazamiento luminoso | Desplazamiento |
| Pasos del proceso | Desvanecimiento escalonado | Desplazamiento |
| Testimonios | Desvanecimiento escalonado | Desplazamiento |
| Sección CTA | Desvanecimiento | Desplazarse |

## Dependencias clave
```json
{ "motion": "^12.x", "lucide-react": "^0.400.x" }
```

> **Notas rápidas:** El nombre, el número de teléfono y el área de cobertura de "ShieldPest" son marcadores de posición. El verificador de código postal es una interfaz de usuario estática: conéctese a la base de datos de cobertura real después de la generación. La mención de BPCA en el pie de página debe reflejar una certificación real. Intercambios de acento verde a través de `--primary`.