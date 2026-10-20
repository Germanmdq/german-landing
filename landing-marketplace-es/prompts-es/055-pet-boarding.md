# Willow Kennels - Mensaje del sitio web de alojamiento para mascotas y perreras

## 1. Declaración de objetivos
Crear un sitio web cálido y que reduzca la ansiedad para **Willow Kennels**, definido por arena suave, un agradable color verde musgo y una tipografía redondeada, construido completamente en torno a lo único que los dueños realmente quieren, que es una prueba de que su perro está bien mientras ellos están. away.

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(40, 36%, 96%);       /* #f9f4ea sand */
  --foreground: hsl(120, 16%, 17%);      /* #263224 */
  --primary: hsl(120, 30%, 34%);         /* #3d703e moss green */
  --primary-foreground: hsl(40, 36%, 97%);
  --muted-foreground: hsl(120, 6%, 45%);
  --border: hsl(38, 18%, 87%);
  --card: hsl(40, 38%, 92%);
  --accent-paw: hsl(28, 76%, 58%);       /* warm amber */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Nunito 800, clamp(36px, 4.8vw, 66px), espacio entre letras -0.02em
- **H2:** Nunito 700, 30–42px
- **H3:** Nunito 700, 18–21px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1,76
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0,18em, 11px, moss
- **Precios/capacidades:** Nunito 800, tabular-nums

## 5. Efectos visuales

**Efecto 1: Línea de tiempo de rutina diaria.** Una línea de tiempo vertical de un día de embarque de 7 a. m. a 9 p. m., cada entrada con un pequeño ícono ámbar, una hora en números tabulares y una línea descripción. La línea de conexión se dibuja hacia abajo a medida que la sección se desplaza a la vista, usando `scaleY` vinculada para desplazarse en progreso.

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.5'] });

<motion.div className="absolute left-5 top-0 w-[3px] origin-top rounded-full bg-[var(--primary)]"
  style={{ height: '100%', scaleY: scrollYProgress } } />
{day.map((step, i) => (
  <motion.div key={step.time}
    initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
    transition={{ duration: 0.5, delay: i * 0.06 }}
    className="relative mb-8 pl-14">
    <span className="absolute left-0 grid h-10 w-10 place-items-center rounded-full"
      style={{ background: 'var(--accent-paw)' }}>{step.icon}</span>
    <span className="font-display tabular-nums">{step.time}</span>
    <p className="text-[var(--muted-foreground)]">{step.text}</p>
  </motion.div>
))}
```

**Efecto 2: Maqueta de actualización de fotos.** Un marco con forma de teléfono que muestra un mensaje simulado de actualización de fotos diaria, inclinado 3 grados, con las burbujas de mensajes animándose una tras otra. Vende la característica más tranquilizadora sin necesidad de un párrafo.

## 6. Desglose de componentes

1. **Barra de navegación**: 74 px, adhesivo, arena, borde inferior de 1 px. Marca denominativa con marca de pata a la izquierda, centro de enlaces, teléfono y botón musgo "Reservar una estancia" a la derecha.
2. **Héroe**: dividido, texto a la izquierda, imagen a la derecha con esquinas redondeadas. Ceja, H1, sublínea, dos CTA, cuatro puntos de confianza. *Imagen: un perro feliz en un gran parque de césped con un cuidador agachado cerca, luz cálida y natural, relajado y sin escena.*
3. **Tira de tranquilidad**: número de licencia, seguro, veterinario de guardia y proporción de personal por perro.
4. **Un día en Willow**: la línea de tiempo de la rutina (Efecto 1), el núcleo emocional de la página.
5. **Actualizaciones de fotos**: sección dividida con la maqueta del teléfono (Efecto 2)y una breve explicación de la actualización diaria.
6. **Alojamiento**: tres opciones: perrera estándar, suite de lujo y cabina para gatos, cada una con tamaño, ropa de cama, calefacción y precio.
7. **Precios**: una tabla sencilla de tarifas por noche por tamaño de perro, además de descuentos para varios perros y recargo por temporada alta indicados abiertamente.
8. **Qué llevar**: una lista de verificación práctica que reduce las llamadas telefónicas que de otro modo recibiría el personal.
9. **Requisitos**: vacunas, tratamiento contra pulgas y gusanos, política de castración para estadías prolongadas y requisito del día de prueba para principiantes.
10. **Conozca al equipo**: tres tarjetas del personal con nombre, años en la perrera y qué perro prefieren en secreto.
11. **Reseñas**: tres citas, cada una de las cuales nombra al perro y la duración de la estadía.
12. **Reserva**: formulario con fechas, detalles del perro y una nota de disponibilidad para vacaciones escolares.
13. **Pie de página**: musgo profundo, cuatro columnas, número de licencia, horarios de apertura para entrega y recolección.

## 7. Animaciones
- Hero: el texto se desvanece 0,7 s; la imagen sube y se desvanece, 0.9s
- Línea de tiempo: línea de conexión `scaleY` vinculada al progreso del desplazamiento; diapositiva de entradas `x: -14 → 0` escalonada 0.06s
- Maqueta de teléfono: las burbujas de mensajes se animan secuencialmente, con una separación de 0.4s, con una escala pequeña-in
- Tarjetas de alojamiento: levante `-4px` al pasar el mouse con un borde ámbar de 1px
- Elementos de la lista de verificación: iconos de verificación emergentes `scale 0.7 → 1` escalonado 0.05s
- Todo es suave y redondeado: relajación primaveral en lugar de un bézier cúbico agudo

## 8. Responsive
- **Móvil (<768px):** hamburguesa; pilas de imágenes encima del texto; H1 se fija a 36px; la línea de tiempo mantiene la forma vertical con la línea en "izquierda-3"; los centros de maquetas de teléfonos encima de su texto; alojamiento 1-col; la tabla de precios se convierte en filas apiladas; `Reserve una estadía` fijado como una barra inferior adhesiva.
- **Tableta:** división de héroe retenida, alojamiento de 3 columnas con un relleno más ajustado, equipo 3-col.
- **Escritorio:** ancho máximo 1140px, `px-16`, `py-22`.

## 9. Completo Copy

**Marca:** WILLOW KENNELS · Pensiones y criadero · Cheshire

**Navbar:** Un día aquí · Alojamiento · Precios ·Requisitos · Acerca de · `01565 555 0134` · [Botón] Reservar una estadía

**Hero**
- Ceja: `CHESHIRE · PERRITAS CON LICENCIA · CLASIFICACIÓN DE CINCO ESTRELLAS · DESDE 1998`
- H1: `Fotos todos los días, para que realmente disfrutes vacaciones.`
- Sublínea: `Perreras y criaderos con licencia en once acres cerca de Knutsford. Grandes carreras de césped, dos largas caminatas al día y una actualización de fotos en su bandeja de entrada todas las noches.`
- CTA: `Reserve una estadía` · `Ver un día aquí`
- Puntos de confianza: `Licencia CWC/2019/0842` · `Veterinario de guardia 24 horas al día, 7 días a la semana` · `1 guía por cada 8 perros` · `Completo asegurado`

**Tira de tranquilidad:** `Cheshire West con licencia, calificación de cinco estrellas · Asegurado con seguro para empresas de mascotas · Veterinario de guardia las 24 horas · Un guía por cada ocho perros, siempre`

**Un día en Willow** — Ceja `LA RUTINA` — H2 `Qué sucede realmente entre dejar y recoger`
- `07:00` **Revisión de la mañana**: cada perro es atendido individualmente, se revisa la ropa de cama, se administran los medicamentos y se cambia el agua.
- `07:30` **Primera carrera**: veinte minutos en un prado de césped, en pequeños grupos compatibles o solo si su perro lo prefiere.
- `08:30` **Desayuno**: su propia comida, sus propias porciones, su propio horario. No damos comida a los perros.
- `10:00` **Larga caminata** — Cuarenta y cinco minutos por los senderos de la finca. Todo perro sale, haga el tiempo que haga.
- `12:30` **Descanso** — Periodo de tranquilidad en las perreras. Los perros duermen más de lo que sus dueños esperan y lo necesitan.
- `14:30` **Segunda carrera y juego** — Otra sesión de paddock, además de tiempo individual y juguetes de enriquecimiento.
- `16:30` **Segunda caminata** — Cuarenta y cinco minutos, ruta diferente, para que siga siendo interesante.
- `18:00` **Cena** — Tu comida nuevamente, luego un período de calma.
- `19:30` **Actualización de fotos** — Te enviamos una foto y una línea sobre su día. Todos los días, sin que usted lo pregunte.
- `21:00` **Último control y luces apagadas** — Última pausa para ir al baño, ropa de cama ordenada y un recorrido por parte del cuidador.

**Actualizaciones de fotos** — H2 `Recibirá noticias nuestras todas las noches`
`Cada perro recibe una foto y un mensaje corto cada noche: qué hicieron, con quién jugaron y cómocuánto comieron. Es la razón más común por la que la gente vuelve a reservar con nosotros y no le cuesta nada.`
Mensajes de muestra: `Bramble tuvo un día brillante` · `Dos largas caminatas y media hora persiguiendo una pelota de fútbol con un spaniel llamado Ted` · `Comí todo, dormí como un tronco a las siete`

**Alojamiento**
- **Estándar Perrera: desde £ 26 por noche**: 2 x 3 m en el interior con una cama con calefacción, además de un parque exterior cubierto adjunto de 2 x 4 m al que el perro puede acceder durante todo el día. 
- **Suite Deluxe: desde £ 38 por noche**: interior de 3 x 4 m, calefacción por suelo radiante, cama elevada y un sofá, además de un parque privado de césped de 5 m. Lo mejor para perros mayores y principiantes nerviosos.
- **Cabaña para gatos: desde £16 por noche**: 1,5 m por 2 m con un estante con calefacción, una ventana con vista al jardín y un edificio tranquilo e independiente lejos de los perros.

**Precio**
| | 1 noche | 7 noches | 14 noches |
|---|---|---|---|
| Perro pequeño, menos de 10 kg | £ 26 | £ 168 | 322€ |
| Perro mediano, 10-25 kg | £30 | £ 196 | 378€ |
| Perro grande, más de 25 kg | £34 | £ 224 | 434€ |
| Suite de lujo, de cualquier tamaño | £38 | £ 252 | 490€ |
| Gato | £ 16 | £98 | £182 |

Notas: `El segundo perro que comparte una perrera cuesta la mitad de precio. La temporada alta (vacaciones escolares, Navidad y Semana Santa) conlleva un recargo de £ 4 por noche, y siempre se lo informaremos antes de reservar y no al momento de pagar. `

**Qué traer** — `Su propia comida, medida en bolsas diarias · Cualquier medicamento en su empaque original con instrucciones escritas · Una cama o manta que huela a casa · Su collar con una etiqueta de identificación · Un juguete favorito, aunque es posible que no regrese de una sola pieza · Vacunación tarjeta`

**Requisitos**
1. **Vacunas**: DHP y leptospirosis actualizadas, además de tos de las perreras al menos dos semanas antes de la llegada. Verificamos la tarjeta al dejarla, cada vez, sin excepciones.
2. **Tratamiento contra pulgas y gusanos** — En el último mes. Podemos tratarlo a su llegada por £12 si lo ha olvidado.
3. **Día de prueba para principiantes**: cada perro nuevo disfruta de medio día gratis antes de pasar la primera noche. Nos dice cómo se las arreglan yle dice si se siente cómodo.
4. **Castración**: obligatoria para estancias de más de catorce noches y para cualquier perro de más de ocho meses que comparta un grupo de paddock.

**Equipo**
1. **Sue Willoughby** — Propietaria · 28 años — Comenzó la perrera en 1998 y todavía hace el control a las 7 a. m. la mayoría de las mañanas. Favorece en secreto a los galgos.
2. **Dan Reilly** — Jefe de manejo · 9 años — Dirige los grupos de paddock y sabe qué perros se llevarán bien antes de encontrarse. Prefiere cualquier cosa desaliñada.
3. **Marta Kovac** — Handler · 4 años — Enfermera veterinaria cualificada, se ocupa de todos los medicamentos y de los nerviosos principiantes. Favorece a los que se esconden detrás.

**Reseñas**
1. `Dos semanas en Portugal y todas las noches recibía una foto de Bramble. Mi marido empezó a esperar más de ellos que de la playa.` — **Rachel D.**, Bramble, 14 noches
2. `Nuestro rescate está aterrorizado por todo. El día de prueba gratuita fue el motivo por el que reservamos, y al tercer día ya estaba en un grupo de paddock con dos labradores.` — **Ian M.**, Otto, 8 noches
3. “Nos llamaron a España porque se había quedado sin comida. Resultó que no fue nada, pero el hecho de que llamaron en lugar de esperar es la razón por la que regresamos.` — **Priya K.**, Chester, 10 noches

**Reserva** — Formulario: Fecha de llegada / Fecha de salida / Nombre del perro / Raza y peso / Algún medicamento / ¿Primera estadía con nosotros? → [Botón] `Consultar disponibilidad`
Nota: `Las vacaciones escolares y Navidad reservan con tres o cuatro meses de antelación. Todo lo demás suele tener espacio en quince días.`

**Pie de página** — WILLOW KENNELS · `Fotos todos los días, para que realmente disfrutes de las vacaciones.` · `Willow Farm, Chelford Road, Knutsford, Cheshire WA16 8QT` · `01565 555 0134` · Licencia de Cheshire West CWC/2019/0842, calificación de cinco estrellas · Entrega de 8 a 11 a. m. y de 3 a 5 p. m., recogida de 9 a 11 a. m. y de 3 a 5 p. m. · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "react-day-picker": "^9.0.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
