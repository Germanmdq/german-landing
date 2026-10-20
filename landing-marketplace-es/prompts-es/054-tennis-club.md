# Ashgrove Tennis Club — Mensaje del sitio web del Tennis Club

## 1. Declaración de objetivos
Crear un brillante sitio web de tenis con vida de club para **Ashgrove Tennis Club**, definido por arcilla terracota, cancha blanca y un sans geométrico limpio, organizado en torno a la reserva de canchas, el entrenamiento y el lado social que realmente mantiene a los miembros renovando.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(36, 30%, 97%);       /* #fbf7f2 court white */
  --foreground: hsl(14, 24%, 17%);       /* #35241f */
  --primary: hsl(14, 58%, 48%);          /* #c1533a clay terracotta */
  --primary-foreground: hsl(36, 30%, 98%);
  --muted-foreground: hsl(14, 8%, 46%);
  --border: hsl(30, 16%, 88%);
  --card: hsl(34, 30%, 93%);
  --accent-court: hsl(150, 32%, 38%);    /* grass court green */
  --net: hsl(14, 20%, 24%);              /* dark bands */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Sora 700, clamp(38px, 5vw, 70px), espacio entre letras -0.03em
- **H2:** Sora 600, 30–44px
- **H3:** Sora 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.74
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.2em, 11px, terracota
- **Números de tribunal/horarios/honorarios:** Sora 700, números tabulares

## 5. Visual Efectos

**Efecto 1: Cuadrícula de reserva de cancha.** Una cuadrícula de tiempo por cancha para el día seleccionado: seis canchas de ancho, franjas horarias reducidas, cada celda es verde gratis, terracota para reservaciones y gris para iluminación únicamente. Al seleccionar una celda libre, se agrega al resumen de la reserva.

```tsx
const courts = ['1 Clay', '2 Clay', '3 Clay', '4 Hard', '5 Hard', '6 Indoor'];
const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];

<div className="grid gap-1" style={{ gridTemplateColumns: `72px repeat(${courts.length}, 1fr)` }}>
  <span />
  {courts.map(c => <span key={c} className="pb-2 text-center text-[11px] uppercase tracking-wider">{c}</span>)}
  {hours.map(h => (
    <Fragment key={h}>
      <span className="py-2 pr-2 text-right text-xs tabular-nums text-[var(--muted-foreground)]">{h}</span>
      {courts.map(c => {
        const state = getState(c, h);
        return (
          <motion.button key={c + h} whileTap={{ scale: 0.94 }}
            disabled={state !== 'free'}
            className="h-9 rounded-md transition-colors duration-150"
            style={{ background: state === 'free' ? 'var(--accent-court)' : state === 'booked' ? 'var(--primary)' : 'var(--border)', opacity: state === 'free' ? 0.85 : 0.55 }} />
        );
      })}
    </Fragment>
  ))}
</div>
```

**Efecto 2: marcador de sección de rebote de la pelota.** Un pequeño círculo de terracota al lado de cada H2 que se comprime verticalmente y rebota una vez cuando el rumbo aparece a la vista, un resorte de 0,6 s: un ligero guiño a una pelota que rebota, usado con moderación.

## 6. Desglose de componentes

1. **Barra de navegación**: 74 px, adhesivo, blanco corte, borde inferior de 1 px. Marca denominativa a la izquierda, enlaces en el centro, botón de terracota "Reservar una cancha" y un enlace de texto "Inicio de sesión de miembro" a la derecha.
2. **Héroe**: dividido, texto a la izquierda, imagen a la derecha. Ceja, H1, sublínea, dos CTA, cuatro datos del club. *Imagen: canchas de tenis de tierra batida desde un ángulo elevado bajo la cálida luz de la tarde, red y líneas nítidas, algunos jugadores en la distancia.*
3. **Hoy franja**: canchas libres en este momento, clima actual y disponibilidad de reflectores.
4. **Reserva de cancha**: la interacción principal (Efecto 1) con un selector de día y un resumen de reserva.
5. **Membresía**: cuatro niveles: adulto completo, temporada baja, junior, familiar, con tarifa de inscripción, suscripción anual y lo que cada uno permite.
6.**Coaching** — Cuadrícula 2x3: grupo de adultos, individual de adultos, academia junior, mini tenis, cardio tenis, equipo de rendimiento, cada uno con día, horario y precio.
7. **Canchas e instalaciones**: una descripción sencilla de las seis canchas, superficies, focos y la casa club.
8. **Equipos y ligas**: equipos masculinos, femeninos y mixtos con divisiones y noches de partidos.
9. **Calendario social**: la sección que la mayoría de los sitios de clubes olvidan: noches de club, torneos americanos, la barbacoa de verano y el concurso de invierno.
10. **Juniors**: un bloque exclusivo que cubre el camino desde el mini tenis hasta el equipo, con grupos de edad y nota de protección.
11. **Visitantes**: tarifas de invitados, alquiler de canchas sin membresía y cómo reservar como no miembro.
12. **Pie de página**: color de red oscuro, cuatro columnas, afiliación a LTA, contacto del oficial de protección.

## 7. Animaciones
- Héroe: el texto se desvanece 0,7 s; la imagen se muestra con un barrido de clipPath desde la derecha, 1s
- Cuadrícula de reservas: las celdas se desvanecen con un escalonamiento de 0,008 s por fila; la celda seleccionada escala 0.94 al tocar y obtiene un contorno de 2px
- Marcadores de sección: resorte de rebote de pelota al ingresar el rumbo (Efecto 2)
- Tarjetas de membresía: levanta `-4px` con un borde de terracota de 1px al pasar el mouse
- Filas de entrenamiento: desvanecimiento escalonado 0.06s
- Calendario social: bloques de fechas pop `scale 0.9 → 1` escalonados 0.08s

## 8. Responsive
- **Móvil (<768px):** hamburguesa; pilas de imágenes encima del texto; H1 se fija a 38 px; la cuadrícula de reservas se convierte en una vista de una sola cancha con un selector de canchas arriba y los horarios enumerados verticalmente; membresía 1-col; entrenamiento 1-col; `Reservar una cancha` fijado como una barra inferior adhesiva. 
- **Tableta:** la cuadrícula de reserva mantiene las seis canchas en celdas más estrechas; membresía 2x2; coaching 2-col.
- **Escritorio:** ancho máximo 1180px, `px-16`, `py-22`.

## 9. Copia completa

**Marca:** ASHGROVE TENNIS CLUB · Est. 1934 · Harrogate

**Navbar:** Reservar una cancha · Membresía · Entrenamiento · Equipos · Juniors · Visitantes · `Inicio de sesión de miembro` · [Botón] Reservar una cancha

**Hero**
- Ceja: `HARROGATE · FUNDADA 1934 · SIX COURTS · LTA AFILIADO`
- H1: `Cuatro arcilla, dosduro, un martes por la noche muy competitivo.`
- Sublínea: `Un club amigable para miembros con seis canchas, iluminación hasta las diez y entrenamiento desde mini tenis hasta equipo del condado. Los visitantes son bienvenidos y no necesitas blancos.`
- CTA: `Reserve una cancha` · `Ver membresía`
- Datos: `6 canchas` · `Iluminadas hasta las 10 p.m.` · `420 miembros` · `Afiliado a LTA`

**Hoy tira:** `Tres canchas gratis esta tarde · Focos encendidos desde 4:00 p. m. · Canchas de arcilla abiertas, canchas duras secas`

**Reserva de canchas** — Eyebrow `BOOK` — H2 `Canchas del uno al seis`
`Los miembros reservan gratis hasta con siete días de anticipación. Los no socios podrán reservar con veinticuatro horas de antelación a tarifa de visitante. El pico es entre semana por las tardes después de las cinco y los fines de semana por la mañana.`

**Membresía**
- **Adulto completo: £315 al año** — Tarifa de inscripción £50 · Reserva de cancha ilimitada · Elegibilidad para el equipo · Noches de club incluidas · Tarifa de invitado £8
- **Adulto fuera de horas pico: £185 al año** — Tarifa de inscripción £50 · Días laborables antes 5:00 p.m. y domingo todo el día · Noches de club incluidas · Tarifa para huéspedes £10
- **Junior — £95 al año** — Sin tarifa de inscripción · Menores de 18 · Reservas ilimitadas antes de las 6:00 p.m. · Acceso gratuito a las noches del club junior
- **Familia — £560 al año** — Tarifa de inscripción £50 · Dos adultos y todos los niños menores de 18 años · Acceso completo para todos · Dos pases de invitado gratuitos mes

**Coaching**
1. **Grupo de adultos**: martes y jueves, de 7 a 8 p. m. · £ 11 por sesión, o £ 90 por un bloque de diez · Todos los estándares, divididos en tres grupos durante la noche.
2. **Adulto individual** — Previo acuerdo · £42 por hora con el entrenador en jefe, £34 con los entrenadores asistentes.
3. **Junior Academy**: sábados de 9 a 11 a. m. · £ 14 por sesión · Edades de 8 a 14 años, agrupadas por estándar en lugar de por edad.
4. **Mini tenis**: sábados de 11 a. m. a 12 p. m. · £ 8 por sesión · Edades de 4 a 8 años, pelota roja y naranja, canchas blandas.
5. **Cardio Tennis**: lunes y miércoles, de 6 a 7 p. m. · £ 9 por sesión · Sin instrucción técnica, solo una hora de movimiento y golpe.
6. **Equipo de rendimiento**: lunes y jueves, de 5 a 7 p. m. · Por invitación · Juniors de nivel del condado, tres entrenadores en la cancha.

**Canchas e instalaciones** — `Las canchas 1 a 4 son de arcilla artificial, repavimentadas en 2024 y jugables encasi todo el clima. Las canchas 5 y 6 son canchas duras acrílicas. La cancha 6 está debajo del airhall de noviembre a marzo. Los seis están iluminados hasta las 10 p.m. y las luces funcionan con un sistema de tarjeta de miembro en lugar de un medidor simbólico.`
`La casa club tiene vestuarios, duchas, un bar abierto de jueves a domingo y un balcón mirador sobre las canchas uno y dos.`

**Equipos y ligas** — `Equipos masculinos en las Divisiones 2, 4 y 6 de Yorkshire · Equipos femeninos en las Divisiones 1, 3 y 5 · Equipo mixto en División 2 · Las noches de partidos son los martes y jueves, los partidos en casa a partir de las 6:30 p. m. y siempre hay té después porque esa es la regla.`

**Calendario social**
- `Club Night` — Todos los miércoles a las 6:30 p. m. · Preséntate, no necesitas pareja, te emparejamos.
- `Torneo americano` — Primer domingo del mes, 10 a.m. · £4 incluido el almuerzo.
- `Summer Barbecue`: segundo sábado de julio · Gratis para miembros, £10 invitados.
- `Finals Day`: primer domingo de septiembre · Campeonatos de clubes, Pimm's, leve controversia.
- `Winter Quiz`: tercer viernes de enero · £5 por cabeza, equipos de seis, ferozmente contested.

**Juniors** — H2 `De la pelota roja al equipo del condado`
`Mini tenis rojo para niños de cuatro a ocho años, naranja y verde hasta nueve y diez, luego pelota completa en la academia juvenil. Los jugadores que quieran más pasan al equipo de alto rendimiento por invitación. Cada entrenador está verificado por DBS y acreditado por LTA, y el contacto de nuestro oficial de protección está en el pie de página en lugar de estar escondido en una página de políticas. `

**Visitantes** — `No es necesario ser miembro para jugar. Las canchas cuestan £ 14 la hora en horas valle y £ 20 en horas pico, y se pueden reservar con veinticuatro horas de anticipación. El alquiler de raquetas cuesta £3 y siempre hay pelotas detrás de la barra. Si juegas tres veces, unirte te sale más barato, y lo diremos.`

**Pie de página** — ASHGROVE TENNIS CLUB · `Fundado en 1934` · `Ashgrove Lane, Harrogate HG2 8QR` · `01423 555 0120` · Club afiliado a LTA 2140884 · Oficial de protección: Kate Lindsay, safeguarding@ashgrovetennis.co.uk · © 2026

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
