# Substrata — Mensaje del sitio web del club nocturno

## 1. Declaración de objetivos
Crear un sitio web de club nocturno con cultura de club para **Substrata**, definido por un negro verdadero, un verde ácido y un sans técnico estirado, construido alrededor de una lista de alineación y un flujo de reserva de mesa, con la política de puertas expresada honestamente en lugar de dejarla como una sorpresa. 1am.

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(0, 0%, 3%);          /* #080808 true black */
  --foreground: hsl(0, 0%, 96%);         /* #f5f5f5 */
  --primary: hsl(88, 96%, 56%);          /* #b6f81f acid green */
  --primary-foreground: hsl(0, 0%, 4%);
  --muted-foreground: hsl(0, 0%, 52%);
  --border: hsl(0, 0%, 14%);
  --card: hsl(0, 0%, 7%);
  --card-elevated: hsl(0, 0%, 11%);
  --sold-out: hsl(340, 88%, 58%);        /* magenta, sold out */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Anton 400, mayúsculas, clamp(48px, 8vw, 140px), espacio entre letras -0,02em, altura de línea 0,85
- **H2:** Anton 400, mayúsculas, 36–64px
- **H3 / nombres de artistas:** Anton 400, mayúscula, 20–26px
- **Cuerpo:** Inter 300–400, 16px, altura de línea 1.68
- **Fechas, horarios, precios de las entradas:** Space Mono 700, mayúscula, tabular-nums
- **Cejas:** Space Mono 400, mayúsculas, espacio entre letras 0.2em, 11px, verde ácido

## 5. Efectos visuales

**Efecto 1: lista de programación con ilustraciones flotantes.** Eventos como una lista de ancho completo de fechas monoespaciadas y nombres enormes de artistas de Anton. Al pasar el cursor sobre una fila, el arte del evento se desvanece como un panel de fondo fijo detrás de la lista con baja opacidad, por lo que la página cambia de humor a medida que el puntero se mueve hacia abajo en la alineación. 

```tsx
const [hovered, setHovered] = useState(null);

<div className="relative">
  <AnimatePresence>
    {hovered && (
      <motion.img
        key={hovered}
        src=""
        alt="Event artwork"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.22 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none fixed inset-0 h-full w-full object-cover object-center"
      />
    )}
  </AnimatePresence>

  {events.map(e => (
    <a
      key={e.id}
      onMouseEnter={() => setHovered(e.id)}
      onMouseLeave={() => setHovered(null)}
      className="group relative z-10 flex items-baseline gap-8 border-b border-[var(--border)] py-7"
    >
      <span className="w-28 font-mono text-sm text-[var(--primary)]">{e.date}</span>
      <span className="font-display text-4xl uppercase transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
        {e.artist}
      </span>
      <span className="ml-auto font-mono text-sm">{e.soldOut ? 'SOLD OUT' : e.price}</span>
    </a>
  ))}
</div>
```
Resumen para los medios por evento: fotografía abstracta del club con colores intensos, siluetas de multitudes y haces de luz, alto contraste y granulado. 

**Efecto 2: Verde ácido barrido de línea de exploración.** Una única línea horizontal delgada de color verde ácido que recorre al héroe una vez que está cargado durante 1,2 segundos y desaparece, haciendo referencia a un barrido láser sin convertirse en una luz estroboscópica. Desactivado completamente en movimiento reducido.

## 6. Desglose de componentes

1. **Barra de navegación**: 68 px, fijo, negro verdadero, verde ácido, borde inferior de 1 px después del desplazamiento. Marca denominativa a la izquierda, enlaces en el centro, botón cuadrado verde ácido "Entradas" a la derecha.
2. **Héroe** — 94vh, casi vacío. Enorme marca denominativa o título de Anton, una línea monoespaciada que nombra el próximo evento y dos CTA. Imágenes mínimas, tipografía máxima. Barrido de línea de exploración en carga.
3. **Barra de próximo evento**: una franja monoespaciada con el próximo evento, fecha, hora de puertas y restonivel de boleto.
4. **Alineación**: la sección principal (Efecto 1), doce eventos próximos.
5. **Las habitaciones** — tres habitaciones descritas con capacidad, marca del sistema de sonido y política musical. Los detalles específicos del sistema de sonido son muy importantes para este público.
6. **Mesas y reservas**: cuatro niveles de mesas con gasto mínimo, capacidad y lo que está incluido, más un formulario de reserva.
7. **Política de puertas**: la sección de honestidad: edad, identificación aceptada, vestimenta, política de teléfonos en la pista de baile y el comportamiento que hace que las personas sean expulsadas. Dicho claramente.
8. **Seguridad y bienestar**: equipo de bienestar, cubiertas para bebidas, medidas anti-picos y cómo encontrar un alguacil. La audiencia ahora espera esta sección y la mayoría de los sitios de clubes todavía la omiten.
9. **Residentes**: cuatro DJ residentes con una descripción de una línea y un enlace de mezcla.
10. **Alquiler de recinto** — Alquiler privado para lanzamientos y noches de etiquetas con aforo y contacto.
11. **Cómo llegar a casa**: rutas de autobuses nocturnos, ubicación de paradas de taxis y el último tren, que es la información práctica más utilizada en cualquier sitio de club.
12. **Pie de página**: regla superior negra, verde ácido, cuatro columnas, número de licencia, dirección, redes sociales.

## 7. Animaciones
- Hero: la línea de exploración se desplaza hacia abajo una vez durante 1,2 segundos con carga; las letras de los titulares se desvanecen escalonadas 0,03 s
- Filas de alineación: la obra de arte se desvanece a 0,22 de opacidad detrás de la lista al pasar el mouse, 0,4 s; el nombre del artista se traduce 8px a la derecha, 0.3s
- Filas agotadas: texto magenta, no se permite el desplazamiento del arte, cursor no permitido
- Niveles de mesa: el borde verde ácido se desvanece al pasar el mouse, no hay ascensor
- Tarjetas de habitación: la cifra de capacidad cuenta al ingresar
- Todo lo demás está deliberadamente quieto: el movimiento vive en el interacción de alineación

## 8. Responsive
- **Móvil (<768px):** hamburguesa con una superposición negra de pantalla completa; H1 se fija a 48 px; las filas de alineación apilan la fecha encima del nombre del artista con el precio debajo, y la obra de arte al pasar el mouse se reemplaza por una pequeña miniatura en línea, ya que el mouse no existe; tablas 1-col; La sección de llegar a casa está fijada en lo alto porque es lo que la gente abre a las 2 a. m. 
- **Tableta:** la alineación mantiene el diseño de una sola fila en 40 pxnombres; mesas 2x2.
- **Escritorio:** ancho máximo 1320px, `px-16`, `py-20`.

## 9. Copia completa

**Marca:** SUBSTRATA · Club nocturno · Rotterdam

**Navbar:** Programación · Habitaciones · Mesas · Política de puertas · Alquiler de espacios · [Botón] Entradas

**Hero**
- Ceja: `ROTTERDAM · TRES HABITACIONES · 23:00 – 06:00 · DESDE 2016`
- H1: `SUBSTRATA`
- Siguiente línea: `VIE 12 SEP — CÓDIGO DE RESPUESTA / HELENA VOSS / KIN — PUERTAS 23:00 — €18 TERCER LANZAMIENTO`
- CTAs: `Ver el cartel` · `Tickets`

**Barra de próximo evento:** `PRÓXIMO: VIERNES 12 SEP · CÓDIGO DE RESPUESTA · PUERTAS 23:00 · TERCER LANZAMIENTO €18 · 60 LEFT`

**Lineup** — Ceja `PRÓXIMO` — H2 `LINEUP`
- `FRI 12 SEP` — **CÓDIGO DE RESPUESTA** — €18
- `SAT 13 SEP` — **HELENA VOSS** — AGOTADO
- `VIE 19 SEP` — **KIN + RESIDENTES** — 14€
- `SÁB 20 SEP` — **NEROLI B2B TESSELLATE** — 20
- `VIE 26 SEP` — **SERIE SÓTANO 04** — 12
- `SÁB 27 SEP` — **MARCEL DETTMANN** — 26 €
- `VIE 03 OCT` — **COLECTIVO DE BAJA FRECUENCIA** — 14 €
- `SAT 04 OCT` — **ANASTASIA KOVA** — 22 €
- `VIE 10 OCT` — **RESIDENTES TODA LA NOCHE** — 10€
- `SAT 11 OCT` — **OCTO OCTA** — AGOTADO
- `FRI 17 OCT` — **SUBSTRATA X NACHTLAB** — 16€
- `SAT 18 OCT` — **CINCO ANIVERSARIO** — 30€

**Las habitaciones**
1. **Principal** — Capacidad 700 — Funktion-One Vero, cuatro puntos. Techno, hard groove y todo lo que trajo el cartel principal. No hay teléfonos en el suelo durante las presentaciones de titulares.
2. **Sótano** — Capacidad 240 — Void Incubus con un subconjunto personalizado. Dub, electro y esas cosas que vaciarían la sala principal. Donde los residentes realmente quieren jugar.
3. **El Anexo** — Capacidad 160 — Martin Audio, más cálido y silencioso. Casa, discoteca y pausas, y la única sala donde mantener una conversación.

**Mesas y reservas**
- **Stand, Anexo — Gasto mínimo 250€** — Hasta 6 · Dos botellas de licores con mezclador · Salto de cola · Mesa hasta las 04:00
- **Stand, Principal — Gasto mínimo 450€** — Hasta 8 · Tres botellas con batidoras · Salto de cola · Mesa toda la noche · Anfitrión
- **Balcón,Principal — Gasto mínimo de 700 €** — Hasta 12 · Cinco botellas con mezcladores · Entrada privada · Mesa toda la noche · Anfitrión
- **Esquina del sótano — Gasto mínimo de 350 €** — Hasta 8 · Tres botellas con mezcladores · El mejor sonido del edificio y la peor vista, que es el punto

**Política de puertas** — Ceja `PUERTA` — H2 `LEA ESTO ANTES DE USTED COME`
`18+, se requiere ID, sin excepciones ni argumentos. Aceptamos pasaporte, documento nacional de identidad y permiso de conducir de la UE. No aceptamos fotografías de documentos, identificación vencida o tu pareja dando fe de ti.`
`No hay código de vestimenta. Hay un código de comportamiento. Si eres agresivo, si tocas a personas que no lo han invitado o si pasas la noche filmando a extraños, serás expulsado y se te negará el reingreso. Esa es la política completa y no es negociable.`
`No hay teléfonos en la pista de baile durante las presentaciones principales en Main. Pegatinas sobre cámaras en la puerta. La gente odia esto durante unos diez minutos y luego nos agradece.`
`Última entrada 03:00. No se permite el reingreso después de las 02:00.`

**Seguridad y bienestar** — H2 `WELFARE`
`Dos personal de bienestar capacitado todas las noches, vestidos de rosa de alta visibilidad, en el corredor entre principal y el sótano. No son seguridad y no están ahí para causarle problemas. Agua gratis en todos los bares, siempre, sin colas.`
`Fundas para bebidas disponibles gratis en todos los bares y en el guardarropa. Si cree que su bebida ha sido manipulada, infórmeselo a cualquier miembro del personal y lo llevaremos a asistencia social, nos quedaremos con la bebida y llamaremos a alguien si así lo desea. Probamos e informamos.`
`Si se siente inseguro por algún motivo, pregunte a cualquier miembro del personal por Angela. Aquí no hay nadie que se llame Ángela. Nos dice que lo saquemos silenciosamente.`

**Residents**
1. **KIN** — Residente del sótano desde 2016. Electro, descansos y una política de solo registros que realmente no es una pose.
2. **Teselado** — Sala principal. Groove duro y set de cierre la mayoría de los sábados.
3. **Neroli** — Anexo. House y discoteca, y la única persona aquí que tocará algo con voz.
4. **Colectivo de baja frecuencia**: un equipo rotativo de tres personas que funciona el último viernes de cadames.

**Alquiler de recinto** — `Alquiler de recinto completo para noches de sellos, lanzamientos y presentaciones. Capacidad para 1.100 personas en tres salas, producción propia y un piloto técnico al que normalmente podemos reunirnos sin contratar nada. Noches entre semana desde 2.800 €. Contacto bookings@substrata.nl.`

**Llegar a casa** — H2 `A las 06:00`
`Autobús nocturno B4 desde Schiedamse Vest, cada treinta minutos hasta las 05:30 · Parada de taxis en Westblaak, a sesenta metros a la izquierda de la puerta, y es una parada adecuada más que un lugar donde a veces paran los coches · Primer metro desde Beurs en 05:54 · Si necesitas un taxi y no tienes dinero, pregunta en el guardarropa. Tenemos una cuenta y preferiríamos que llegaras a casa.`

**Pie de página** — SUBSTRATA · `Tres habitaciones. 23:00 – 06:00.` · `Schiedamse Vest 148, 3011 BG Rotterdam` · Licencia 2016-NL-4482 · `hello@substrata.nl` · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
