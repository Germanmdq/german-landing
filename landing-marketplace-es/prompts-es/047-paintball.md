# Blackthorn Paintball — Aviso del sitio web de paintball

## 1. Declaración de objetivos
Cree un sitio web de paintball al aire libre lleno de adrenalina para **Blackthorn**, definido por el color negro del bosque, un naranja de seguridad intenso y una pantalla con inflexión militar estarcida, creado alrededor de una calculadora de reservas de grupos y un mapa de zonas de juego, porque cada consulta comienza con "cuánto por doce de us".

## 2. Pila tecnológica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(100, 10%, 9%);       /* #161a14 woodland black */
  --foreground: hsl(60, 12%, 92%);       /* #ecece6 */
  --primary: hsl(20, 96%, 54%);          /* #fb5b13 safety orange */
  --primary-foreground: hsl(100, 12%, 8%);
  --muted-foreground: hsl(90, 6%, 56%);
  --border: hsl(100, 8%, 19%);
  --card: hsl(100, 9%, 13%);
  --card-elevated: hsl(100, 8%, 17%);
  --accent-olive: hsl(80, 24%, 38%);     /* olive drab */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Oswald 700, mayúsculas, clamp(42px, 6.2vw, 92px), espacio entre letras 0,005em, altura de línea 0,95
- **H2:** Oswald 600, mayúsculas, 32–50px
- **H3:** Oswald 600, 19–22px
- **Cuerpo:** Inter 300–400, 16px, altura de línea 1.7
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.22em, 11px, orange
- **Precios/recuentos de jugadores/recuentos de paintball:** Oswald 700, tabular-nums

## 5. Efectos visuales

**Efecto 1: Calculadora de reservas de grupo.** El recuento de jugadores, el nivel del paquete y las bolas de pintura adicionales producen un precio total y por persona en vivo, con el descuento de grupo. aplicándose automáticamente a diez y veinte jugadores. Responde a la única pregunta que contiene el correo electrónico de consulta.

```tsx
const packages = [
  { id: 'rookie',  name: 'Rookie',  base: 25, balls: 100 },
  { id: 'regular', name: 'Regular', base: 35, balls: 300 },
  { id: 'assault', name: 'Assault', base: 45, balls: 600 },
];
const [players, setPlayers] = useState(12);
const [pkg, setPkg] = useState('regular');
const [extra, setExtra] = useState(0);

const p = packages.find(x => x.id === pkg);
const discount = players >= 20 ? 0.85 : players >= 10 ? 0.9 : 1;
const perPerson = Math.round((p.base + extra * 0.04) * discount);

<motion.div key={perPerson * players} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
  <p className="font-display text-6xl tabular-nums text-[var(--primary)]">£{perPerson * players}</p>
  <p className="mt-1 text-[var(--muted-foreground)]">
    £{perPerson} per player · {players} players · {p.balls + extra} paintballs each
  </p>
</motion.div>
```

**Efecto 2: revelación de símbolos de pintura.** Los encabezados de las secciones están precedidos por un pequeño símbolo SVG naranja cuya escala se anima de 0 a 1 con un resorte de sobreimpulso duro y una ligera rotación aleatoria por instancia, lo que le da a cada sección un símbolo diferente sin necesidad de múltiples activos.

## 6. Desglose de componentes

1. **Barra de navegación**: 72 píxeles, fijo, negro bosque con desenfoque, borde inferior naranja de 2 píxeles después del desplazamiento. Marca denominativa estampada a la izquierda, enlaces en el centro, botón cuadrado naranja "Reserve su grupo" a la derecha.
2. **Hero**: fotografía de acción de 92 vh con sangrado completo y un degradado inferior intenso. Ceja, H1 mayúscula enorme, sublínea, dos CTA, cuatro hechos. *Imagen: jugadores de paintball avanzando por el bosque con humo de pintura, retroiluminación espectacular, movimiento y arena, fotografía de deportes de acción.*
3. **Calculadora de reservas**: el elemento de conversión principal (Efecto 1), directamente debajo de hero.
4.**Paquetes**: tres niveles con lo que se incluye, recuento de paintball y a quién le conviene cada uno.
5. **Zonas de juego**: seis zonas numeradas en un mapa estilizado, cada una con un nombre, una descripción del terreno y el tipo de juego que le conviene.
6. **Un día típico**: una línea de tiempo de ocho pasos desde la sesión informativa de llegada hasta el último partido, con tiempos.
7. **Seguridad y equipo**: la sección que leen los padres: protección completa de la cabeza, prueba de velocidad del marcador, proporciones de comisarios y edad mínima.
8. **Fiestas y empresas**: dos bloques que cubren cumpleaños y días de equipo, con opciones de catering y precios de alquiler privado.
9. **Qué ponerse y traer**: una lista práctica que reduce las llamadas telefónicas.
10. **Reseñas**: tres citas con tipo y tamaño de grupo.
11. **Reserva**: selector de fecha, tamaño del grupo, paquete y nota de depósito.
12. **Pie de página**: bosque más oscuro, regla superior naranja, cuatro columnas, seguro, afiliación a UKPSF, dirección.

## 7. Animaciones
- Héroe: las líneas H1 se revelan con un barrido de clipPath escalonado 0,09 s; los hechos se desvanecen a 0,6 s
- Marcadores Splat: escala de 0 a 1 con un resorte duro, rotación aleatoria por instancia
- Calculadora: total de remontajes y desvanecimientos en cualquier cambio, 0,22 s; la insignia de descuento aparece cuando se cruza el umbral
- Tarjetas de paquete: nivel medio en escala 1,03 en reposo; todos se elevan 5 píxeles al pasar el mouse con un borde naranja
- Mapa de zona: los pines numerados aparecen escalonados 0,1 s; al pasar sobre un alfiler se resalta su fila en la lista
- Línea de tiempo: línea naranja que conecta escalas desde la izquierda, 0.9s
- El movimiento es contundente: resortes y duraciones cortas en todo

## 8. Responsive
- **Móvil (<768px):** hamburguesa con una superposición oscura de pantalla completa; H1 se fija a 42 px; las entradas de la calculadora se apilan en todo su ancho con el total fijado como una barra inferior adhesiva; paquetes de 1 columna con el nivel popular primero; el mapa de zonas se convierte en una lista vertical con la imagen del mapa de arriba; línea de tiempo vertical.
- **Tableta:** paquetes de 3 columnas, zonas de 2 columnas, calculadora al lado del total.
- **Escritorio:** ancho máximo 1200px, `px-16`, `py-20`.

## 9. Completo Copia

**Marca:** BLACKTHORN PAINTBALL · 40acres de bosque · Kent

**Barra de navegación:** Reservar · Paquetes · Zonas de juego · Seguridad · Fiestas · Encuéntranos · [Botón] Reserva tu grupo

**Hero**
- Ceja: `KENT · 40 ACRES · SEIS ZONAS DE JUEGO · EDADES 12+ · ABIERTO TODO EL AÑO`
- H1: `CUARENTA ACRES. SEIS ZONAS. UNA DUCHA MUY LARGA DESPUÉS.`
- Sublínea: `Paintball en el bosque al aire libre en Kent, a cuarenta minutos de Londres. Terreno real en lugar de una arena inflable, protección facial completa y comisarios que realmente ordenan.`
- CTA: `Reserve su grupo` · `Ver las zonas`
- Datos: `40 acres` · `6 zonas de juego` · `Edades de 12+` · `1 comisario por cada 8 jugadores`

**Calculadora de reservas** — Ceja `CALCULE EL COSTO` — H2 `CUÁNTO POR SU GRUPO`
Entradas: contador de jugadores paso a paso, nivel de paquete, control deslizante de bolas de pintura adicionales
Descuentos: `10+ jugadores, 10% de descuento · 20+ jugadores, 15% de descuento`
Nota: `El tamaño mínimo del grupo es seis. A continuación, únete a un día de puertas abiertas los sábados y te incluiremos en un equipo.`

**Paquetes**
- **Novato — £25 por jugador** — 100 bolas de pintura · Kit completo y mono · Medio día, cuatro juegos · Lo mejor para principiantes, grupos de menores de 16 años y cualquiera que no esté seguro de que disfrutará que le disparen.
- **Regular: £35 por jugador** *(más reservado)*: 300 bolas de pintura · Kit completo, mono y guantes · Día completo, ocho juegos en las seis zonas · La elección correcta para casi todos los grupos.
- **Asalto: £45 por jugador** — 600 bolas de pintura · Kit completo, mono, guantes y una mejora de barril · Día completo, ocho juegos, más selección de zona prioritaria · Para grupos que lo han hecho antes y se les acabó de pintura antes del almuerzo.
Extras: `Bolas de pintura adicionales £4 por 100 · Granada de humo £8 · Granada de pintura £6 · Mejora del cañón £5 · Mejora del mono a camuflaje £4`

**Zonas de juego**
1. **The Village**: Doce edificios de madera, carriles estrechos y sin largas líneas de visión. Espacios reducidos, reapariciones rápidas y la zona más ruidosa del lugar.
2. **Línea de trinchera**: doscientos metros de zanjas excavadas y posiciones de sacos de arena. Lento, táctico y la zona que decide la mayoría de los torneos.
3. **La Capilla** — Una ruina de dos pisos con un campanario. Atacar y defender, yquien tiene la torre normalmente gana hasta que no la tiene.
4. **Madera profunda** — Bosque natural sin cobertura construida. Puro movimiento y comunicación. Ningún lugar donde esconderse y ningún mapa que memorizar.
5. **The Yard**: envío de contenedores, paletas y restos de vehículos. Cobertura en todas partes, líneas de visión en ninguna parte, caos en todas partes.
6. **El Puente** — Un único cruce sobre el lecho de un arroyo seco con orillas empinadas. Objetivo simple, ejecución brutal, siempre el último juego del día.

**Un día típico**
- `09:30` **Llegada y registro**: inicio de sesión, exenciones y un café mientras clasificamos los tamaños de los kits.
- `09:50` **Información de seguridad**: Quince minutos, obligatorio y genuinamente importante. Nadie entra a una zona sin él.
- `10:10` **Edición del kit y crono** — Mono, máscara, marcadora y tolva. La velocidad de cada marcador se probó a 280 pies por segundo.
- `10:30` **Juegos uno y dos**: comenzando en The Village para que todos se muevan y disparen.
- `12:30` **Almuerzo**: una hora. Traiga el suyo o agregue catering.
- `13:30` **Juegos tres a seis** — Rotando por las zonas restantes.
- `15:45` **The Bridge** — Siempre el último, siempre todos, siempre el de quien la gente habla en el auto.
- `16:15` **Devolución del kit y fotos** — Devolver el kit, recoger objetos de valor, mirar el estado de ustedes mismos.

**Seguridad y kit** — H2 `LA SECCIÓN ABURRIDA QUE IMPORTA`
`Máscaras integrales con lentes térmicas, probadas según EN166. Cada marcador cronógrafo a 280 pies por segundo antes de cada sesión y verificado entre juegos. Un mariscal por cada ocho jugadores, todos capacitados en primeros auxilios, todos con autoridad para detener un juego y usarlo.`
`Edad mínima de doce años, con un marcador de menor velocidad y un programa juvenil separado de doce a quince años. Los menores de 18 años necesitan la firma de un padre o tutor en la exención de responsabilidad, y no aceptaremos una fotografía de uno.`
`En cada paquete se incluyen monos, guantes, protector de cuello y chaleco antibalas. Los moretones son normales. Las lesiones no lo son, y en once años hemos tenido cuatro que requirieron más que un yeso.`

**Fiestas y corporativos**
- **Cumpleaños** — Mínimoocho jugadores. Salón de fiesta privado durante dos horas, opción de comida caliente a £9 por persona y la persona que cumple años recibe cincuenta bolas de pintura gratis y un sombrero que odiará. 
- **Días corporativos y de equipo**: alquiler de sitio privado desde £1400 para hasta cuarenta jugadores, uso exclusivo de las seis zonas, catering y un formato de puntuación que deliberadamente no solo gana la persona más en forma.

**Qué ponerse y traer** — `Zapatillas viejas o botas de montaña con sujeción en los tobillos · Calcetines largos · Sudadera con capucha o jersey debajo del mono, incluso en verano · Una muda de ropa y una bolsa de basura para los embarrados · Almuerzo, a menos que hayas añadido catering · Efectivo o tarjeta para pintura extra, que comprarás`
`No traigas: ropa blanca, lo que quieras, ni lentes de contacto si puedes ayudar it.`

**Reseñas**
1. Solteros, dieciséis de nosotros, la mayoría con resaca. Los mariscales fueron divertidos, firmes y no dejaron que las cosas se volvieran estúpidas. El mejor día del fin de semana por una milla.` — **Danny F.**, grupo de solteros de 16
2. ``El cumpleaños de mi hijo de doce años y estaba nervioso por eso. La configuración junior es realmente diferente, no es simplemente lo mismo con una advertencia. Ha pedido volver dos veces.` — **Suzanne A.**, fiesta de cumpleaños de 10
3. `Día de ausencia de la empresa. El formato de puntuación significó que ganó el equipo de nuestra persona menos deportiva, lo que valió cada centavo del alquiler del sitio.` — **Rob K.**, grupo corporativo de 34

**Reserva** — Fecha/Número de jugadores/Paquete/Datos de contacto → [Botón] `Verificar disponibilidad`
Nota: `Depósito de £10 por jugador para confirmar, saldo en el día. Gratis para mover tu fecha hasta siete días antes. Corremos en cualquier clima, excepto en los rayos, y los bosques bajo la lluvia son realmente mejores.`

**Pie de página** — BLACKTHORN PAINTBALL · `Cuarenta acres. Seis zonas.` · `Blackthorn Woods, Bethersden Road, Ashford, Kent TN26 3DY` · `01233 555 0182` · Afiliado a UKPSF · Responsabilidad pública de £ 5 millones · Abierto sábados y domingos durante todo el año, entre semana para reservas privadas · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-slider": "^1.2.0",
  "react-day-picker": "^9.0.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
