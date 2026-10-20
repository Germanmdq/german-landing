# Riverside Museum — Aviso del sitio web del museo

## 1. Declaración de objetivos
Crear un sitio web editorial audaz para **The Riverside Museum**, un museo de historia y diseño de la ciudad: grandes bloques de colores seguros en verde intenso y ocre cálido, una pantalla serif de gran tamaño, exposiciones numeradas configuradas como un programa impreso y la sensación de un cartel de museo bien diseñado en lugar de una web municipal. page.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin widget de calendario, sin lógica de reserva de boletos. Los botones de ticket son enlaces.

## 3. Sistema de diseño — Colores
```css
:root {
  --background: hsl(45, 29%, 95%);       /* off-white paper */
  --foreground: hsl(160, 30%, 12%);      /* near-black green */
  --primary: hsl(158, 45%, 22%);         /* deep museum green */
  --primary-foreground: hsl(45, 29%, 95%);
  --accent: hsl(38, 78%, 56%);           /* warm ochre */
  --accent-2: hsl(8, 62%, 58%);          /* coral, used once per page */
  --muted-foreground: hsl(160, 10%, 38%);
  --border: hsl(160, 30%, 12%);          /* borders are dark and 1.5px, like print rules */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
```
- **H1:** DM Serif Display 400, clamp(64px, 12vw, 200px), altura de línea 0.88, espacio entre letras -0.03em
- **Títulos de la exposición:** DM Serif Display 400, clamp(40px, 6vw, 96px), altura de línea 0.95
- **Números:** Espacio Grotesk 700, tabular figuras
- **Cuerpo:** Espacio Grotesk 400, 17px, altura de línea 1.6
- **Etiquetas:** Espacio Grotesk 500, 12px, mayúsculas, espacio entre letras 0.1em

## 5. Visual Efectos

**Efecto 1: Exposiciones de bloques de color.** Cada exposición actual es una banda de ancho completo con su propio color de fondo (verde, ocre, coral, en ese orden) y un número gigante "01", "02", "03" establecido en 18 vw en Space Grotesk 700 con un 12 % de opacidad detrás del título. Imagen en un lado, texto en el otro, lados alternos.

**Efecto 2: reglas de impresión.** Todos los divisores de sección y las filas de la tabla usan reglas sólidas de 1,5 px en `--border`, y cada sección comienza con una pequeña fila de encabezado: etiqueta a la izquierda, un número de página a la derecha (`P. 03`), con una regla debajo, como un programa de museo impreso.

**Efecto 3 — Revelado de imagen.** Las imágenes de la exposición se revelan con un barrido de ruta de clip de abajo hacia arriba: `clipPath: "inset(100% 0 0 0)" → "inset(0% 0 0 0)"`, 1.1s, facilidad `[0.65, 0, 0.35, 1]`, cuando el 30% está a la vista.

## 6. Desglose de componentes

1. **Barra de información** — 40 px, fondo verde, texto color crema: queda el horario de apertura de hoy, centro "Entrada gratuita", enlace "Entradas" a la derecha.
2. **Barra de navegación**: 80 px, fondo de papel, regla inferior. Marca denominativa dejada en la pantalla DM Serif. Enlaces correctos. No pegajoso.
3. **Héroe**: héroe tipográfico de ancho completo. GiganteH1 en dos líneas. Debajo, una imagen de 16:9 con un título en la esquina. *Imagen: gran sala del museo con un gran objeto histórico suspendido, luz natural a través de ventanas altas, visitantes pequeños en el marco, arquitectónico y aireado.*
4. **Hoy**: una fila de tres celdas delimitadas por reglas: "Abierto hoy", "Mostrando ahora", "Cómo llegar", cada una con una etiqueta y una línea en negrita.
5. **Exposiciones**: tres bandas de bloques de color (Efecto 1) con revelación de imagen de ruta de clip (Efecto 3). Cada banda: número, fechas, título, descripción de dos frases, enlace `Reservar entrada gratis` o `Comprar entradas`.
6. **Qué hay**: una tabla con el estilo de un listado impreso con reglas gruesas: fecha, hora, evento, tipo, precio. Cinco filas. Sin filtros.
7. **De la colección**: una cuadrícula de 4 columnas de objetos sobre fondo de papel, cada una con una imagen en un marco cuadrado, el nombre del objeto, la fecha y el número de acceso en letra pequeña.
8. **Visita** — dos columnas: tabla de horarios a la izquierda, dirección, acceso e información de la cafetería a la derecha.
9. **Membresía**: banda ocre con un H2, tres beneficios seguidos y un botón.
10. **Pie de página**: texto verde oscuro, color crema, una marca denominativa gigante `RIVERSIDE` a lo ancho, luego cuatro columnas de enlaces.

## 7. Animaciones
- Hero H1: cada palabra se desliza hacia arriba desde `y: 110%` dentro de desbordamiento oculto, 1s, facilidad `[0.22, 1, 0.36, 1]`, tambalearse 0.08s
- Imágenes de exposición: revelación de ruta de clip, Efecto 3
- Números grandes: `x: -40 → 0`, `opacity 0 → 1`, 1.2s, cuando la banda ingresa a la vista
- Qué hay en las filas: aparición gradual con 0.05s stagger
- Objetos de colección: la imagen escala 1 → 1,05 durante 0,6 s al pasar el cursor, el título subraya
- Sin carruseles, sin reproducción automática

## 8. Responsive
- **Móvil (<768px):** H1 a 64px; las bandas de exhibición apilan la imagen sobre el texto, el número grande se mueve hacia arriba a la derecha a 30vw; lo que hay sobre la mesa se convierte en tarjetas apiladas separadas por reglas, cada una de las cuales muestra la fecha y la hora en una línea y el título debajo; la cuadrícula de colección se convierte en 2 columnas; la barra de navegación se colapsa en una marca denominativa y un botón "Menú" que abre una superposición verde de pantalla completa.
- **Tableta:** cuadrícula de colección de 3 columnas; las bandas permanecen una al lado de la otra en 50/50.
- **Escritorio:** bandas sin borde, contenidomax-width 1400px, `px-10`.

## 9. Copia completa

**Barra de información:** `Abierto hoy de 10:00 a 17:00` · `Entrada gratuita` · `Entradas →`

**Navbar:** Exposiciones · Novedades · Colección · Visitar · Membresía

**Hero**
- H1: `Historias que el / *río* guardó.`
- Pie de imagen: `El Gran Salón, con el barco de vapor Ellen May de 1911`

**Hoy**
- `ABIERTO HOY` — **10:00 – 17:00, última entrada 16:15**
- `AHORA MOSTRANDO` — **Tres exposiciones, una gratis**
- `LLEGAR AQUÍ` — **A cinco minutos de la estación Riverside**

**Exposiciones** — etiqueta de encabezado `EXHIBICIONES` · `P. 02`
1. **01 · Verde** — `Hasta el 4 de enero de 2027` — **Made on the River** — `Doscientos años de construcción naval, fabricación de cuerdas y elaboración de cerveza a lo largo de una sola milla de agua. Más de trescientos objetos, la mayoría nunca antes mostrados.` — `Reserve entrada gratuita`
 *Imagen: taller industrial antiguo junto al río con cuerdas y cascos de barcos de madera, cálidos tonos fotográficos de archivo.*
2. **02 · Ocre** — `2 de octubre de 2026 – 14 de marzo de 2027` — **Chairs: A Century of Sitting Down** — `Ochenta sillas, desde un banco victoriano hasta un taburete impreso en 3D, y lo que cada una dice sobre cómo vivía la gente.` — `Compre entradas — £12`
 *Imagen: fila de sillas de diseño icónico sobre pedestales en una galería luminosa, paredes blancas y limpias, museo iluminación.*
3. **03 · Coral** — `Abre el 20 de noviembre de 2026` — **Night Shift** — `Fotografías de la ciudad entre la medianoche y las seis, tomadas por las personas que trabajan esas horas.` — `Comprar boletos — £9`
 *Imagen: fotografía nocturna atmosférica de una calle de la ciudad con un autobús solitario y cálidas farolas, color cinematográfico.*

**Qué hay** — etiqueta de encabezado `QUÉ HAY EN` · `P. 03`
| Fecha | Hora | Evento | Tipo | Precio |
|---|---|---|---|---|
| Sábado 19 de septiembre | 11:00 | Sendero familiar: Encuentra el mascarón de proa | Familias | Gratis |
| Miércoles 23 de septiembre | 18:30 | Tarde: Sillas después del anochecer | Tarde | 15€ |
| Sábado 26 de septiembre | 14:00 | Recorrido del curador por Made on the River | Visita | Gratis |
| Jueves 1 de octubre | 19:00 | Charla: Los cerveceros de Quay Street | Charla | 8€ |
| domingo 4 de octubre| 10:30 | Apertura relajada para las necesidades sensoriales | Acceso | Gratis |

**De la colección** — etiqueta de encabezado `LA COLECCIÓN` · `P. 04`
- **Mascarón de proa de barco, roble pintado** — c.1860 — RM.1972.14
- **Letrero esmaltado de cervecería** — 1928 — RM.1988.203
- **Gancho giratorio de cordelero** — c.1890 — RM.1965.41
- **Silla de café Bentwood** — 1904 — RM.2019.7
*Resúmenes de imágenes: cada objeto fotografiado sobre un fondo neutro liso, incluso iluminación de museo, estilo catálogo.*

**Visita** — etiqueta de encabezado `VISIT` · `P. 05`
- Horario: `Martes – Domingo 10:00–17:00` · `Jueves tarde hasta las 21:00` · `Cerrado los lunes excepto festivos`
- `The Riverside Museum, Quay Street, RS1 4BN`
- Acceso: `Sin escalones en todo el lugar. Sillas de ruedas y protectores auditivos disponibles en la recepción.`
- Café: `The Boathouse Café, planta baja, abierto durante el horario del museo.`

**Membresía** — H2 `Vuelve *tan a menudo* como quieras.` Beneficios: `Entrada gratuita a todas las exposiciones pagas` · `Vistas previas de los miembros antes de cada inauguración` · `10 % de descuento en la tienda y la cafetería` — Botón `Conviértete en miembro — £45 al año`

**Pie de página** — RIVERSIDE · Exposiciones · Novedades · Colección · Aprendizaje · Visita · Membresía · Apóyanos · Prensa · `El Riverside Museum es una organización benéfica registrada, no. 1098765` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
