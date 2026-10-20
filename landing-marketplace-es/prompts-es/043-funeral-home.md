# Alder & Gray — Aviso del sitio web de la funeraria

## 1. Declaración de objetivos
Crear un sitio web tranquilo y digno para **Alder & Gray Funeral Directors**, una funeraria independiente administrada por una familia: cálidos tonos de papel blanquecino, un suave acento salvia, una serifa grande y silenciosa y un ritmo lento y pausado que hace que un visitante afligido se sienta atendido en lugar de vendido. to.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```
Sin bibliotecas de componentes. Utilice únicamente elementos HTML nativos: los detalles de precios utilizan un elemento `<details>` nativo.

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(40, 30%, 97%);       /* warm paper */
  --foreground: hsl(150, 8%, 16%);       /* soft charcoal with green undertone */
  --primary: hsl(140, 14%, 42%);         /* muted sage */
  --primary-foreground: hsl(40, 30%, 97%);
  --muted-foreground: hsl(150, 5%, 45%);
  --border: hsl(40, 16%, 86%);
  --card: hsl(40, 28%, 93%);             /* slightly deeper paper for panels */
}
```
Sin negro, sin blanco puro, sin colores brillantes en ninguna parte. Todo está suavizado.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Cormorant Garamond 400, clamp(40px, 5.5vw, 76px), altura de línea 1.08, espacio entre letras -0.01em
- **H2:** Cormorant Garamond 400, clamp(32px, 3.5vw, 48px)
- **Énfasis en cursiva:** Cormorant Garamond en cursiva, usado para una o dos palabras por título
- **Cuerpo:** Inter 300, 17px, altura de línea 1.8
- **Etiquetas:** Inter 500, 11 px, mayúsculas, espacio entre letras 0,16 em, salvia

## 5. Efectos visuales

**Efecto 1: fundido cruzado de héroe lento.** El área de la imagen del héroe recorre tres fotografías de paisajes tranquilos, con un fundido cruzado cada 7 segundos durante 2,5 segundos con una escala muy ligera de 1,04 a 1. Sin flechas, sin puntos, sin controles. Debería parecer un cambio de luz, no una presentación de diapositivas.

```jsx
<AnimatePresence mode="sync">
  <motion.img
    key={index}
    src=""
    alt={slides[index].alt}
    initial={{ opacity: 0, scale: 1.04 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.5, ease: "easeInOut" }}
    className="absolute inset-0 h-full w-full object-cover object-center"
  />
</AnimatePresence>
```
Resúmenes de imágenes, en orden:
1. *Imagen: pradera inglesa brumosa al amanecer, luz suave y difusa, verdes apagados, muy tranquilo*
2. *Imagen: viejo roble en un tranquilo cementerio, cielo nublado, apacible y tranquilo*
3. *Imagen: luz solar a través de hojas de abedul, poca profundidad de campo, tonos suaves y cálidos*

**Efecto 2: Grano de papel.** Una superposición de ruido SVG fija, eventos de puntero y ninguno con una opacidad del 4 % con `modo de mezcla: multiplicar` en toda la página, para que el fondo se lea como papel en lugar de pantalla.

## 6. Componente Desglose

1. **Barra de navegación**: 84 píxeles, fondo de papel, borde inferior fino. Marca denominativa dejada en Cormorant. Centro de enlaces. Derecha: un enlace de texto sabio "Llámanos en cualquier momento - 01225 480 316" con un pequeñoicono de teléfono. Pegajoso, con un fondo sólido.
2. **Héroe**: diseño dividido. Queda 50%: etiqueta, H1, sublínea, dos acciones. Derecha 50%: las imágenes de fundido cruzado (Efecto 1) en un contenedor alto con un radio de 4px, altura 78vh.
3. **Si alguien acaba de morir**: un panel del color de una tarjeta, tres pasos numerados seguidos, cada uno con un gran número de Cormorán, un título y dos oraciones. Termina con el número de teléfono configurado en grande.
4. **Cómo podemos ayudar**: diseño de dos columnas: breve introducción a la izquierda, lista de cinco servicios a la derecha, cada uno separado por un borde delgado, nombre en Cormorant 26px y una línea debajo.
5. **Nuestros precios**: tres columnas simples, cada una de un tipo de funeral con un precio en cormorán, una oración corta y un elemento nativo `<details>` titulado "Qué está incluido" que revela una lista simple. Sin cartas, sin sombras.
6. **La familia**: una imagen de retrato ancha con un breve párrafo al lado sobre el negocio familiar. *Imagen: tres generaciones de una familia paradas afuera de un edificio de piedra, luz natural, cálida y sin pretensiones.*
7. **Avisos recientes**: cuatro avisos de funeral como una lista simple: nombre, fechas, fecha de servicio y lugar. Enlace `Ver todos los avisos`.
8. **Lo que dicen las familias**: un testimonio grande en cursiva Cormorant, centrado, con el nombre debajo. Sólo uno. Sin carrusel.
9. **Visita o llama** — dos columnas: dirección y horario de apertura restante; una frase tranquila y número de teléfono correcto.
10. **Pie de página** — fondo salvia con texto en color papel, tres columnas, letra pequeña sobre la afiliación a asociaciones profesionales.

## 7. Animaciones
Todo lento y suave. Nada rebota, nada se desliza desde un lado.
- Contenido de la sección: `opacity 0 → 1` y `y 16 → 0`, duración 1,1 s, facilidad de salida, se activa una vez cuando el 20 % está a la vista
- Escalonado entre elementos secundarios: 0,15 s
- Fundido cruzado de héroe como se describe en Efecto 1
- Subrayado del enlace: crece desde la izquierda más de 0,5 s al pasar el mouse
- Sin contadores, sin paralaje, sin marquesina

## 8. Responsive
- **Móvil (<768px):** el héroe se acumula con imágenes primero a 52vh, luego texto; los tres escalones se apilan verticalmente; pila de columnas de precios; la barra de navegación colapsaa una marca denominativa, un botón de icono de teléfono y un botón de texto "Menú" que abre una superposición de papel en pantalla completa con grandes enlaces de Cormorant.
- **Tableta:** el héroe permanece dividido en 55/45; los precios van a una lista de una sola columna.
- **Escritorio:** ancho máximo 1240px, `px-10`, espacio entre secciones `py-28`.

## 9. Copia completa

**Marca:** ALDER & GREY · Funeral Directors · Bath since 1962

**Navbar:** Organizar un funeral · Nuestros precios · Avisos · Sobre nosotros · Contacto

**Hero**
- Etiqueta: `DIRECTORES FUNERARIOS INDEPENDIENTES EN BATH`
- H1: `Cuando alguien muere, no deberías tener que *saber* qué hacer siguiente.`
- Sublínea: `Somos una funeraria familiar. Contestamos el teléfono nosotros mismos, de día o de noche, y le guiaremos en cada decisión al ritmo que más le convenga.`
- Acción principal: `Llame al 01225 480 316`
- Acción secundaria: `Ver nuestros precios`

**Si alguien acaba de morir** — Etiqueta `DÓNDE INICIAR`
1. **Llámanos, a cualquier hora.** `Alguien de nuestra familia atiende cada llamada. Acudiremos a usted, ya sea en su domicilio, en el hospital o en una residencia de ancianos.`
2. **Registrar la muerte.** `Esto debe suceder dentro de cinco días. Le explicaremos exactamente qué traer y dónde ir.`
3. **Tómate tu tiempo.** `No hay prisa por decidir nada más. Podemos reunirnos en nuestra casa, o en la suya, cuando esté listo.`
- Línea grande: `01225 480 316 — día o noche`

**Cómo podemos ayudar** — H2 `Cada funeral es *diferente*.` Introducción: `Algunas familias saben exactamente lo que quieren. A otros nunca se les ha hecho la pregunta. Cualquiera de los dos está bien.`
- **Entierro y cremación** — `Servicios tradicionales en iglesias, crematorios y cementerios en todo Somerset.`
- **Cremación directa** — `Una cremación simple sin servicio, con las cenizas devueltas a usted.`
- **Entierro en el bosque** — `Cementerios naturales dentro de veinte millas de Bath.`
- **Celebraciones de la vida** — `Servicios no religiosos en el lugar que más significaba para ellos.`
- **Planes funerarios prepagos** — `Decida sus deseos ahora, para que su familia no tenga que hacerlo más tarde.`

**Nuestros precios** — H2 `Precios claros, *escritosabajo*.` Introducción: `Publicamos nuestros precios para que nunca tengas que preguntar.`
- **Cremación directa** — `£1,650` — `Sin servicio, sin dolientes, las cenizas se devuelven a mano.` Incluye: recogida y cuidado · ataúd simple · tarifa del crematorio · devolución de cenizas
- **Cremación con servicio** — `£3,450` — `Un servicio en el crematorio o en un lugar de su elección.` Incluido: recogida y cuidado · capilla de descanso · coche fúnebre limusina · ataúd · tarifa del crematorio · organización del servicio
- **Entierro** — `desde £4,200` — `Un funeral y entierro tradicional, los honorarios del cementerio se cotizan por separado.` Incluido: recolección y cuidado · capilla de descanso · coche fúnebre y una limusina · ataúd · cuatro portadores · organización del servicio

Nota: `Los honorarios de los médicos, las flores y los avisos se muestran por separado y nunca se agregan sin preguntar.`

**La familia** — H2 `Tres generaciones, *una* puerta de entrada.` `Alder & Gray fue fundada por Thomas Alder en 1962, en el mismo edificio de piedra en Widcombe Hill donde trabajamos hoy. Su nieta Ruth ahora dirige el negocio con su marido Daniel. No somos parte de un grupo y nunca lo seremos.`

**Avisos recientes** — Etiqueta `AVISOS FUNERARIOS`
- **Margaret Ellen Hurst** — 1934 – 2026 — Servicio en la iglesia de San Marcos, Lyncombe, jueves 24 de septiembre, 11 a.m.
- **David John Pryce** — 1951 – 2026 — Crematorio de Haycombe, viernes 25 de septiembre, 2:00 p. m. 
- **Anne Lucas** — 1940 – 2026 — Servicio familiar privado
- **Robert Charles Fenwick** — 1948 – 2026 — Cementerio de Bath Abbey, lunes 28 de septiembre, 10:30 am

**Lo que dicen las familias** — `"Ruth se sentó con nosotros en la mesa de la cocina durante dos horas y ni una sola vez miró su reloj. Nunca olvidaremos esa amabilidad".` — *La familia Morgan, Combe Down*

**Visita o llama**
- Izquierda: `Alder & Grey, 14 Widcombe Hill, Bath BA2 6AA` · `Lunes a viernes de 9 a 17 h` · `Sábado con cita previa` · `Aparcamiento en la parte trasera`
- Derecha: `Puedes llamarnos en cualquier momento, incluidas noches, fines de semana y festivos. Siempre hablarás con uno de nosotros.` · `01225 480 316` · `care@alderandgrey.co.uk`

**Pie de página** — ALDER & GREY Funeral Directors · Organización de un funeral · Precios · Funeralplanos · Avisos · Contacto · `Miembros de la Asociación Nacional de Directores de Funerarias` · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
