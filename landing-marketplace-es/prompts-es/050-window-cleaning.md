# Limpieza de ventanas Clearview: mensaje del sitio web de limpieza de ventanas

## 1. Declaración de objetivos
Cree un sitio web de limpieza de ventanas brillante y que se pueda reservar al instante para **Clearview**, definido por el blanco cielo, un azul cristal limpio y un sans geométrico amigable, creado en torno a una calculadora de cotizaciones instantánea que brinda un precio real de las habitaciones y el tipo de propiedad en lugar de un formulario de devolución de llamada.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(200, 40%, 98%);      /* #f7fbfd sky white */
  --foreground: hsl(210, 28%, 17%);      /* #1f2b37 */
  --primary: hsl(202, 88%, 44%);         /* #0d8ed3 glass blue */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(210, 8%, 47%);
  --border: hsl(202, 22%, 88%);
  --card: hsl(200, 44%, 94%);
  --accent-sun: hsl(46, 96%, 56%);       /* sunlight yellow */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Outfit 800, clamp(36px, 4.8vw, 66px), espacio entre letras -0.03em
- **H2:** Conjunto 700, 30–44px
- **H3:** Conjunto 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.72
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.18em, 11px, azul
- **Precios:** Outfit 800, números tabulares

## 5. Visual Efectos

**Efecto 1: Calculadora de cotización instantánea.** El tipo de propiedad, la cantidad de habitaciones y la opción de invernadero generan un precio real para una limpieza única y para el plan de cuatro semanas, que se actualiza en vivo. Reemplaza el formulario de devolución de llamada que pierde la mayoría de los clientes potenciales de esta categoría.

```tsx
const base = { terraced: 12, semi: 15, detached: 20, bungalow: 14, flat: 10 };
const [type, setType] = useState('semi');
const [beds, setBeds] = useState(3);
const [conservatory, setConservatory] = useState(false);

const oneOff = base[type] + Math.max(0, beds - 2) * 3 + (conservatory ? 6 : 0);
const plan = Math.round(oneOff * 0.85);

<motion.div key={oneOff} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
  <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Your price</p>
  <p className="font-display text-6xl tabular-nums text-[var(--primary)]">£{plan}</p>
  <p className="mt-2 text-[var(--muted-foreground)]">every four weeks · £{oneOff} as a one-off</p>
</motion.div>
```

**Efecto 2: Revelación de barrido con escobilla de goma.** Las imágenes de sección se revelan con un barrido de trayectoria de clip diagonal que se desplaza de abajo a la izquierda hacia arriba a la derecha durante 0,9 segundos, imitando un trazo de escobilla de goma sobre el vidrio. Se usa solo en la imagen principal y en el bloque de antes y después, por lo que sigue siendo una firma en lugar de un tic.

## 6. Desglose de componentes

1. **Barra de navegación**: 70 px, fijo, blanco cielo, borde inferior de 1 px. Marca denominativa a la izquierda, centro de enlaces, teléfono y pastilla azul "Obtener mi precio" a la derecha.
2. **Héroe**: calculadora de división, texto y cotizaciones a la izquierda, imagen a la derecha con un paño revelador con escobilla de goma. Ceja, H1, sublínea, cuatro puntos de confianza. *Imagen: un limpiador usando un poste alimentado por agua en el exterior de una casa de dos pisos, día claro y brillante, cielo azul, profesional y ordenado.*
3. **Calculadora de cotizaciones**: el elemento de conversión principal (Efecto 1), ubicado dentro del héroe en lugar de debajo de la página.
4. **Qué se incluye** — Cuadrícula de iconos de 2x3: marcos y alféizares, parte delantera y trasera, opción de techo acristalado,limpieza de canalones, fascias y plafones, paneles solares.
5. **Cómo funciona el poste alimentado por agua**: una breve explicación sobre el agua purificada y por qué las ventanas se secan sin rayas, que es la objeción que plantean todos los clientes.
6. **Antes y después**: una comparación del control deslizante con la escobilla de goma en la primera revelación.
7. **Planes y precios**: tres columnas: cuatro semanas, ocho semanas y una sola vez, con la estructura de descuento y la declaración sin contrato.
8. **Área de cobertura**: una lista de doce códigos postales con una nota en qué días se limpia cada uno.
9. **Qué sucede ese día**: cinco puntos breves que incluyen si necesita estar en casa y cómo se manejan las puertas y los perros.
10. **Pago**: GoCardless, tarjeta o transferencia bancaria, con una línea explícita sin necesidad de efectivo y opción de enviar mensajes de texto antes de la llegada.
11. **Reseñas**: tres cotizaciones con el tipo de propiedad y cuánto tiempo han sido clientes.
12. **Pie de página**: pizarra profunda, tres columnas, monto de cobertura de responsabilidad pública, códigos postales de cobertura, contacto.

## 7. Animaciones
- Hero: el texto se desvanece 0,6 s; imagen revelada con el paño diagonal de la escobilla de goma, 0,9 s
- Precio de cotización: se vuelve a montar y se desvanece con cada cambio de entrada, 0,25 s
- Paso a paso y alternancia de dormitorio: transiciones de fondo de 0,15 s, ágil
- Iconos incluidos: escala pop de 0,8 a 1 escalonada 0.05s
- Antes y después: manija de arrastre con resorte, más el paño en la primera entrada
- Tarjetas de plano: el plano medio se ubica en escala 1.03 en reposo; todos levantan 4px al pasar el mouse
- Códigos postales de cobertura: desvanecimiento escalonado 0.03s

## 8. Responsive
- **Móvil (<768px):** hamburguesa con un botón de tocar para llamar; la imagen cae debajo de la calculadora, ya que la calculadora es la razón por la que la gente está aquí; H1 se fija a 36px; rejilla incluida de 2 columnas; planes de 1 columna con una primera publicación de cuatro semanas; `Obtener mi precio` se desplaza hasta la calculadora en lugar de abrir un formulario.
- **Tableta:** el héroe permanece dividido, incluye 3 columnas, planes 3-col.
- **Escritorio:** ancho máximo 1140 px, `px-16`, `py-20`.

## 9. Completo Copia

**Marca:** LIMPIEZA DE VENTANAS CLEARVIEW · Norwich y Norfolk

**Barra de navegación:**Obtenga un precio · Qué incluye · Planes · Cobertura · Reseñas · `01603 555 0148` · [Botón] Obtenga mi precio

**Hero**
- Ceja: `NORWICH & NORFOLK · POLO ALIMENTADO POR AGUA · TOTALMENTE ASEGURADO · DESDE 2014`
- H1: `Obtenga un precio real en diez segundos. Sin devolución de llamada.`
- Sublínea: `Limpieza de ventanas exteriores en Norwich y los pueblos circundantes. Agua purificada, marcos y alféizares incluidos, y un precio en la pantalla en lugar de un formulario que promete que alguien estará en contacto.`
- Puntos de confianza: `£5 millones de responsabilidad pública` · `Sin contrato` · `Envía mensajes de texto antes de la llegada` · `Paga después, no antes`

**Calculadora de cotizaciones**
Tipos de propiedad: `Piso` · `Adosado` · `Semiadoso` · `Separado` · `Bungalow`
Entradas: dormitorio paso a paso, alternador de invernadero
Salida: `£X cada cuatro semanas · £Y por única vez`

**Qué está incluido** — Ceja `INCLUIDO` — H2 `Marcos y alféizares, cada hora`
1. **Marcos, umbrales y puertas**: se limpian en cada visita, no como extra. Una ventana con el marco sucio no es una ventana limpia.
2. **Frente, parte trasera y laterales**: todos los vidrios accesibles en la propiedad, incluidos los que no se pueden ver desde la carretera.
3. **Techo de invernadero**: añádelo a cualquier plan por £6 por limpieza. Paneles, barras y remates.
4. **Limpieza de canalones**: limpieza con aspiradora desde el suelo con confirmación de la cámara, entre £45 y £75 según el tamaño de la propiedad.
5. **Fascias y plafones**: limpios en lugar de simplemente enjuagados, entre £40 y £70.
6. **Paneles solares** — Solo agua purificada, sin detergente, £3 por panel con un mínimo de £30.

**Cómo funciona** — H2 `Por qué usamos agua purificada y no líquido de limpieza`
`Filtramos el agua hasta casi cero sólidos disueltos, lo que significa que cuando se seca no queda nada que deje una marca. Sin detergente, sin marcas de escobilla de goma en las esquinas y sin escaleras contra los canalones. También significa que las ventanas permanecen limpias por mucho más tiempo, porque no hay residuos de jabón a los que se pueda adherir el polvo.`
`Se ven ligeramente mojadas cuando nos vamos. Eso es normal y correcto, y se secan en una hora.`

**Planes y precios** — Ceja `PLANS` — H2 `Sin contrato,cancelar por mensaje de texto`
- **Cuatro semanas: 15 % de descuento**: nuestro más popular. El mismo limpiador, la misma semana cada mes, envíe un mensaje de texto la noche anterior.
- **Ocho veces por semana: 8 % de descuento**: para propiedades protegidas o cualquiera a quien no le importe que se ensucien un poco.
- **Único: precio completo**: mudanza, mudanza o antes de un evento. No hay obligación de continuar.
Nota: `No hay contrato, ni tarifa de inscripción ni cargo de cancelación. Envíanos un mensaje de texto y se detendrá. Preferimos mantenerte porque las ventanas están limpias que porque salir es molesto.`

**Cobertura** — `NR1` · `NR2` · `NR3` · `NR4` · `NR5` · `NR6` · `NR7` · `NR8` · `NR9` · `NR13` · `NR14` · `NR18`
Nota: `Trabajamos con los códigos postales de la ciudad los lunes a miércoles y pueblos jueves y viernes. Si se encuentra justo afuera de estos, llámenos; a veces tenemos un espacio vacío.`

**Qué sucede en el día**
1. **No es necesario que estés en casa**: solo trabajamos afuera. Si podemos llegar a la puerta, podremos hacer el trabajo.
2. **Enviamos mensajes de texto la noche anterior**: para que puedas desbloquear la puerta lateral o sacar el auto del camino.
3. **Puertas y perros** — Cuéntanoslo una vez y lo recordaremos. Si la puerta está cerrada con llave, hacemos el frente y solo cobramos por el frente.
4. **Trabajamos en silencio**: sin radios, sin gritos y el poste es más silencioso que una escalera.
5. **Si nos perdemos algo** — Díganoslo dentro de las cuarenta y ocho horas y regresaremos. Ocurre de vez en cuando y no discutimos al respecto.

**Pago** — `Débito directo GoCardless realizado al día siguiente de la limpieza, o tarjeta, o transferencia bancaria. No se necesita dinero en efectivo y nadie llama a tu puerta para pedirlo. Pagas después del trabajo, nunca antes.`

**Reseñas**
1. "Cuatro años, el mismo limpiador, nunca tuve que perseguirlo. Me envía un mensaje de texto la noche anterior y las ventanas están terminadas cuando llego a casa.` — **Helen R.**, Casa adosada, cliente desde 2022
2. "Estaba escéptico sobre el tema de no usar detergente hasta que vi cómo se secaban. Realmente no tienen marcas y permanecen limpios aproximadamente el doble de tiempo que el último lote.` — **Tomasz W.**, independiente, cliente desde 2024
3. "Les pedí que hicieran el techo del invernadero como una sola vez y me dijeron honestamenteno era necesario hacerlo todavía. Los reservé permanentemente después de eso.` — **Sandra P.**, Bungalow, cliente desde 2023

**Pie de página** — CLEARVIEW WINDOW CLEANING · `Obtenga un precio real en diez segundos.` · `01603 555 0148` · £5 millones de seguro de responsabilidad civil · Cubre NR1–NR9, NR13, NR14, NR18 · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-slider": "^1.2.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
