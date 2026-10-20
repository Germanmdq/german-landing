# Clearwater — Aviso del sitio web de servicio de piscinas

## 1. Declaración de objetivos
Crear un sitio web brillante y refrescante para **Clearwater**, una empresa de limpieza y mantenimiento de piscinas residenciales: cielo pálido y aguamarina profunda, un patrón de luz lento y cáustico que ondula a través del héroe como la luz del sol en el suelo de una piscina, bordes redondeados de secciones de olas y fotografías que hacen que el agua parezca fría y limpia.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes, sin sistema de reserva, sin calculadora química. Los planos se vinculan a un número de teléfono y correo electrónico.

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(196, 60%, 97%);      /* pale sky */
  --foreground: hsl(206, 44%, 16%);      /* deep water navy */
  --primary: hsl(191, 84%, 40%);         /* aqua */
  --primary-foreground: hsl(0, 0%, 100%);
  --deep: hsl(204, 62%, 24%);            /* deep end, used for dark bands */
  --muted-foreground: hsl(206, 12%, 44%);
  --border: hsl(196, 34%, 88%);
  --card: hsl(0, 0%, 100%);
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
```
- **H1:** Outfit 800, clamp(44px, 6vw, 88px), altura de línea 1.02, espacio entre letras -0.035em
- **H2:** Conjunto 800, clamp(30px, 3.6vw, 52px)
- **Cuerpo:** Conjunto 400, 17px, altura de línea 1.65
- **Etiquetas y precios:** Atuendo 600, 12px, mayúsculas, espacio entre letras 0.12em

## 5. Efectos visuales

**Efecto 1: Luz cáustica.** Sobre la imagen del héroe, una capa de formas blancas borrosas superpuestas en "modo de mezcla: luz suave" que se desplazan y escalan lentamente en un bucle de 18 segundos, para que el héroe se vea así. se ilumina a través del agua en movimiento. Solo tres formas, construidas a partir de degradados radiales.

```jsx
<motion.div
  aria-hidden
  className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-70"
  style={{
    backgroundImage:
      "radial-gradient(38% 26% at 30% 40%, #fff 0%, transparent 60%), radial-gradient(28% 22% at 70% 55%, #fff 0%, transparent 60%), radial-gradient(22% 30% at 52% 22%, #fff 0%, transparent 60%)",
    filter: "blur(18px)",
  }}
  animate={{ backgroundPosition: ["0% 0%", "6% 10%", "0% 0%"], scale: [1, 1.06, 1] }}
  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
/>
```

**Efecto 2: bordes de onda.** Las secciones en aguamarina o azul marino profundo comienzan y terminan con una trayectoria de onda SVG de ancho completo de 70 píxeles de alto, ligeramente desplazada entre la parte superior e inferior para que nunca parezca simétrica.

**Efecto 3: Ondulación del agua en tarjetas.** Las tarjetas de planos tienen un brillo radial aguamarina muy sutil que crece desde el borde inferior al pasar el mouse, 400 ms, como la luz que emerge a través del agua.

## 6. Desglose de componentes

1. **Barra superior**: 38 píxeles, azul marino intenso, texto blanco: una línea sobre el calendario de apertura de la temporada.
2. **Barra de navegación**: 80 píxeles, blanca con una sombra suave al desplazarse. Marca denominativa a la izquierda con un pequeño icono de gota, centro de enlaces, pastilla color aguamarina "Obtener una cotización" a la derecha. Pegajoso.
3. **Héroe**: fotografía de ancho completo a 80vh con la capa cáustica (Efecto 1) y un suave degradado azul marino en la parte inferior. El texto se encuentra en la parte inferior izquierda de un bloque blanco con sus propias esquinas redondeadas: etiqueta, H1, sublínea, dos botones. *Imagen:Piscina residencial limpia y reluciente bajo la luz del sol, agua azul con patrones de luz visibles, marco de piedra ordenado, sin gente.*
4. **Planes**: tres tarjetas con bordes ondulados sobre la sección (Efecto 2): Semanal, Quincenal y Abrir y cerrar. Cada uno con precio por visita, lo que se incluye como cinco líneas marcadas y un botón. Tarjeta intermedia en aguamarina con texto blanco.
5. **Lo que incluye cada visita**: una fila de 4 columnas de ocho elementos cortos con íconos en forma de gotas: desnatado y red, cepillo para paredes y escalones, piso de aspiración, cestas vacías, filtro de retrolavado, prueba y equilibrio de productos químicos, verificación de bomba y calentador, reportaje fotográfico por texto.
6. **Banda de química**: sección azul marino profunda con bordes ondulados: tres cifras grandes para los rangos objetivo de cloro, pH y alcalinidad, con una línea cada una que explica lo que sucede cuando se desplazan.
7. **Servicios adicionales**: una lista simple de seis con precios: recuperación ecológica de piscinas, limpieza profunda de filtros, servicio de calentador, detección de fugas, reemplazo de cubiertas, preparación para el invierno.
8. **Rescate en piscina verde**: dos imágenes de antes y después con un párrafo breve y un tiempo de respuesta típico. *Resúmenes de imágenes: una piscina abandonada llena de algas verdes y el mismo estilo de piscina restaurada con agua azul clara.*
9. **Temporadas**: cuatro columnas breves, una por temporada, que explican qué hacen y cuándo.
10. **Reseñas**: tres tarjetas con cinco estrellas acuáticas, cotización, nombre, ciudad y el plan en el que se encuentran.
11. **Áreas y horas**: ciudades como pastillas blandas, horas menos.
12. **CTA final**: banda aguamarina con bordes ondulados, texto blanco, H2, número de teléfono y botón.
13. **Pie de página**: blanco, cuatro columnas, línea de seguro y certificación.

## 7. Animaciones
- Bloque de texto héroe: desvanecimiento 24px, 0,9s; las cáusticas corren desde el principio
- Tarjetas de plan: se desvanecen 20 px, se tambalean 0,1 s; Efecto 3 al pasar el mouse
- Elementos incluidos: aparición gradual con escalonamiento de 0,04 s
- Figuras químicas: desvanecimiento, sin animación de contador
- Imágenes de antes y después: la imagen posterior se desvanece en 0,5 s después de la imagen anterior
- Bordes de onda: estáticos, no motion

## 8. Responsive
- **Móvil (<768px):** el héroe baja a 62vhcon el bloque de texto a todo lo ancho debajo de la imagen en lugar de superponerse; H1 a 44 px; los planos se apilan primero con el del medio; los elementos incluidos se convierten en 2 columnas; la banda de química se apila en 3 filas; botón de llamada adhesivo color agua en la parte inferior de la pantalla; la barra de navegación muestra una marca denominativa y un ícono de teléfono.
- **Tableta:** los planes permanecen en 3 anchos con un relleno más ajustado; elementos incluidos 4 columnas.
- **Escritorio:** ancho máximo 1240px, `px-8`, espacio entre secciones `py-24`.

## 9. Copia completa

**Barra superior:** `Ahora reservando aperturas de primavera: la primera semana de abril es casi full`

**Navbar:** Planes · Qué incluye · Extras · Áreas — Obtenga una cotización

**Hero**
- Etiqueta: `LIMPIEZA Y MANTENIMIENTO DE PISCINAS · SCOTTSDALE, AZ`
- H1: `Una piscina en la que nadas, no una piscina que miras después.`
- Sublínea: `Servicio semanal de un equipo que le envía una foto después de cada visita, equilibra la química adecuadamente y le informa sobre una bomba defectuosa antes de que falle.`
- Botones: `Obtenga una cotización` · `Llame al (480) 555-0142`

**Planes** — H2 `Tres formas de nunca vuelvas a pensar en ello.`
- **Quincenal** — `$36 por visita` — `Desnatar, cepillar y aspirar` · `Química probada y equilibrada` · `Canastas vaciadas` · `Reportaje fotográfico después de cada visita` · `Sin contrato, cancelar en cualquier momento`
- **Semanal** — `$29 por visita` — `MÁS POPULAR` — `Todo en quincenal` · `Retrolavado de filtro según sea necesario` · `Revisión de equipo en cada visita` · `Reserva prioritaria para reparaciones` · `Productos químicos incluidos`
- **Abrir y cerrar** — `$240 por temporada` — `Apertura de primavera y cierre de invierno` · `Cubierta y apagado` · `Reinicio completo de química` · `Inspección de equipo` · `Ideal para temporada hogares`

**Lo que incluye cada visita** — H2 `Ocho cosas, cada vez.`
Desnatar y red · Cepillar paredes y escalones · Aspirar el piso · Vaciar el skimmer y las cestas de la bomba · Lavar a contracorriente el filtro · Probar y equilibrar la química · Revisar la bomba, el calentador y el temporizador · Enviarle un mensaje de texto con un reportaje fotográfico

**Banda de química** — H2 `Los tres números que importa.`
- `1–3 ppm` **Cloro libre** — `Por debajo de uno y las algas comienzan dentro de dos días cálidos. Más de cinco y pica en los ojos.`
- `7.4–7.6` **pH** —`La deriva es alta y el cloro deja de funcionar, por mucho que agregues.`
- `80–120 ppm` **Alcalinidad total** — `Esto es lo que evita que el pH rebote después de cada tormenta.`

**Servicios adicionales** — H2 `Cuando algo necesita más que una limpieza.`
- Recuperación de piscina verde — `de $280`
- Limpieza profunda y desmontaje del filtro — `$145`
- Servicio de calentador — `$165`
- Detección de fugas — `$220`
- Reemplazo de cubierta — `quoted`
- Preparación para el invierno — `$180`

**Rescate de piscina verde** — H2 `Verde el viernes, azul el martes.` `Una piscina descuidada generalmente requiere tres visitas: un tratamiento de choque y una tira de filtro el primer día, una aspiradora intensa el tercer día y luego un balance final. Cotizamos un precio fijo después de ver una foto, y no cobramos nuevamente si demora más de lo que pensábamos.`

**Temporadas** — H2 `Qué hacemos y cuándo.`
- **Primavera** — `Abrir la piscina, quitar y limpiar la cubierta, restablecer la química y reiniciar el equipo.`
- **Verano** — `Semanal visitas, mayor demanda de cloro y revisión de filtro cada mes.`
- **Otoño** — `Época de hojas. Las cestas se llenan rápido, por lo que las visitas son semanales incluso cuando hace frío.`
- **Invierno** — `Horario reducido o preparación completa para el invierno, dependiendo de si nadas todo el año.`

**Reseñas**
- `"Detectaron un sello de bomba defectuoso antes de que inundara la plataforma del equipo. Me ahorré unos cuantos miles de dólares".` — *Denise, North Scottsdale* — `WEEKLY PLAN`
- `"La foto después de cada visita es algo tan pequeño y es la razón por la que confío en ellos."` — *Aaron, Paradise Valley* — `WEEKLY PLAN`
- `"Heredamos un pantano verde cuando compramos la casa. Azul en cinco días."` — *The Mercers, Tempe* — `GREEN POOL RECUPERACIÓN`

**Áreas y horarios:** Scottsdale · Paradise Valley · Tempe · Mesa · Chandler · Gilbert · Fountain Hills · Cave Creek · Ahwatukee · Phoenix
`Lunes a viernes 7 am – 5 pm · Sábado 8 am – 1 pm · Llamadas de emergencia por acuerdo`

**CTA final** — H2 `Obtenga una cotización en alrededor de un minuto.` `Envíe una foto de su piscina y le enviaremos un precio semanal fijo.` `(480) 555-0142` · Botón `Obtener una cotización`

**Pie de página** —SERVICIO CLEARWATER POOL · Planes · Qué incluye · Extras · Áreas · Reseñas · Contacto · `Licencia ROC 341882 · Afianzado y asegurado · Técnicos certificados CPO` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
