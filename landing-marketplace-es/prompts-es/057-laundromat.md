# Spin City — Aviso del sitio web de lavandería

## 1. Declaración de objetivos
Crear un sitio web de lavandería brillante y alegremente utilitario para **Spin City**, definido por azulejos blancos suaves, azul eléctrico y un sans geométrico audaz, construido alrededor de un tablero de disponibilidad de máquinas en vivo y precios que cualquiera puede leer desde su teléfono en la entrada.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(200, 24%, 97%);      /* #f4f8fa tile white */
  --foreground: hsl(216, 30%, 16%);      /* #1c2434 */
  --primary: hsl(212, 92%, 50%);         /* #0a84f5 electric blue */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(216, 8%, 46%);
  --border: hsl(206, 20%, 88%);
  --card: hsl(202, 30%, 93%);
  --accent-warm: hsl(38, 94%, 56%);      /* dryer amber */
  --free: hsl(150, 58%, 42%);            /* machine free */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Expanded:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
Reserva si Archivo está expandido no está disponible: `Archivo` con `font-stretch: expandido`.
- **H1:** Archivo Expanded 800, mayúsculas, clamp(38px, 5.4vw, 76px), espacio entre letras -0.02em
- **H2:** Archivo Expanded 700, mayúsculas, 30–46px
- **H3:** Archivo Expandido 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1.72
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0.2em, 11px, blue
- **Precios/números de máquina/temporizadores:** Archivo Expandido 800, tabular-nums

## 5. Efectos visuales

**Efecto 1: tablero de máquina en vivo.** Una cuadrícula de mosaicos de lavadora y secadora que muestra el estado: verde gratis, ámbar con una cuenta regresiva para uso, gris para fuera de servicio. Los temporizadores de cuenta regresiva marcan cada segundo y una línea de resumen arriba indica cuántos de cada uno están libres en este momento. 

```tsx
const [now, setNow] = useState(Date.now());
useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);

const remaining = m => Math.max(0, Math.ceil((m.finishesAt - now) / 60000));

<div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
  {machines.map(m => {
    const mins = remaining(m);
    const free = m.status === 'free' || mins === 0;
    return (
      <div key={m.id}
        className="aspect-square rounded-xl p-2 text-center transition-colors duration-300"
        style={{ background: m.status === 'broken' ? 'var(--border)' : free ? 'var(--free)' : 'var(--accent-warm)' }}>
        <div className="font-display text-xs text-white/80">{m.type === 'washer' ? 'W' : 'D'}{m.id}</div>
        <div className="font-display text-lg tabular-nums text-white">
          {m.status === 'broken' ? '—' : free ? 'FREE' : `${mins}m`}
        </div>
      </div>
    );
  })}
</div>
```

**Efecto 2: cargador giratorio del tambor.** El marcador de sección al lado de cada H2 es un pequeño círculo con tres puntos que gira 360 grados una vez cuando el rumbo entra a la vista, una entrada y salida fácil de 0,8 s: un tambor de lavado sutil. referencia.

## 6. Desglose de componentes

1. **Barra de navegación**: 70 px, adhesivo, mosaico blanco, borde inferior de 1 px. Marca denominativa en negrita a la izquierda, enlaces en el centro, pastilla azul "Machines Free Now" que muestra un conteo en vivo a la derecha.
2. **Héroe**: dividido, texto a la izquierda, imagen a la derecha. Ceja, H1 mayúscula, sublínea, dos CTA, cuatro puntos prácticos. *Imagen: interior luminoso y limpio de una lavandería con una hilera de máquinas de carga frontal, grandes ventanales, colorido y ordenado.*
3. **Tablero en vivo**: la característica principal (Efecto 1) con una línea de resumen y una marca de tiempo actualizada por última vez.
4. **Precios**: una lista de precios grande y en negrita para tamaños de lavado, secadociclos y jabón, legibles con el brazo extendido.
5. **Servicio de lavado**: entrega de ropa por peso con entrega y corte el mismo día.
6. **Cómo funciona**: cuatro pasos para principiantes, incluido cómo funciona la aplicación de pago y qué hacer si una máquina se come su dinero.
7. **Máquinas** — qué hay disponibles: lavadoras pequeñas, medianas y grandes, capacidad en kilos y que aceptan edredones.
8. **Horarios de apertura y dotación de personal**: los horarios atendidos y desatendidos se indican claramente, además de la hora del último lavado.
9. **Cuentas comerciales**: anfitriones, salones y restaurantes de Airbnb, con opciones de cobro.
10. **Reglas de la casa**: una lista breve y sencilla sobre carritos, temporizadores y no dejar la ropa desatendida durante dos horas.
11. **Encuéntrenos**: dirección, estacionamiento, rutas de autobús y acceso sin escalones.
12. **Pie de página**: azul marino profundo, tres columnas, contacto, política de reembolso por fallas de la máquina.

## 7. Animaciones
- Hero: el texto se desvanece 0,6 s; la imagen sube y se desvanece, 0,8 s
- Mosaicos de máquina: aparece con un escalonamiento de 0,02 s; transiciones de color de estado en 0,3 s; los temporizadores se actualizan cada segundo sin volver a animarse
- Marcadores de tambor: rotación de 360 grados una vez al ingresar el rumbo, 0.8s
- Filas de precios: desvanecimiento escalonado 0.05s
- Números de paso: pop `scale 0.85 → 1` escalonado 0.1s
- Píldora de conteo en vivo en la barra de navegación: el número se intercambia con un deslizamiento vertical de 0,2 s cuando cambia

## 8. Responsive
- **Móvil (<768px):** hamburguesa; La píldora Live Count permanece visible en la barra de navegación porque es la razón por la que la gente abre el sitio; pilas de imágenes encima del texto; H1 se fija a 38 px; el tablero de la máquina se convierte en 4 columnas; la lista de precios sigue siendo amplia y audaz; `Machines Free Now` se desplaza al tablero.
- **Tableta:** tablero de máquina de 6 columnas, precios de 2 columnas.
- **Escritorio:** tablero de máquina de 8 columnas, ancho máximo 1120px, `px-16`, `py-20`.

## 9. Completo Copia

**Marca:** SPIN CITY · Lavandería · Bristol

**Navbar:** Máquinas · Precios · Servicio Lavado · Cómo funciona · Encuéntranos · [Botón] Máquinas Gratis Ahora

**Hero**
- Ceja: `BRISTOL · ABIERTO DE 6AM A 11PM · TARJETA Y APLICACIÓN · GRATISWIFI`
- H1: `COMPRUEBE ANTES DE LLEVARLO POR LA COLINA.`
- Sublínea: `Una lavandería limpia y luminosa en Gloucester Road con veinticuatro lavadoras y dieciocho secadoras. Vea lo que es gratis antes de salir de casa.`
- CTA: `Ver Live Machines` · `Precios`
- Puntos: `Abierto de 6 a. m. a 11 p. m.` · `Tarjeta, aplicación y moneda` · `Wifi gratis` · `Asistió de 8 a. m. a 6 p. m.`

**Live board** — Ceja `AHORA MISMO` — H2 `QUÉ ES GRATIS ESTE SEGUNDO`
Línea de resumen: `9 lavadoras y 6 secadoras gratis · Actualizado hace 12 segundos`
Nota: `Los temporizadores muestran los minutos restantes. Si una máquina dice GRATIS y la ropa de alguien todavía está dentro, dale cinco minutos antes de moverla; esa es la regla no escrita y preferiríamos que la mantuvieras. £6,00 · Grande, 18 kg — £8,50 · Extra grande, 25 kg — £11,00
*Secadoras* — £1,00 por 10 minutos · £4,50 por una hora completa · La mayoría de las cargas necesitan de 40 a 50 minutos
*Extras* — Jabón £1,20 · Suavizante £1,00 · Color catcher £0,80 · Bolsa de lavandería £3,50

**Servicio de lavado** — H2 `DÉJALO, NOSOTROS LO HACEMOS`
`£2,40 por kilo, mínimo seis kilos. Lavado, secado y doblado. Entrega antes de las 10 a. m. y estará listo el mismo día a las 5 p. m. Después de las 10 a.m. estará listo a la mañana siguiente. No planchamos y te diremos qué prendas no meteríamos en la secadora.`

**Cómo funciona**
1. **Consulta el tablero**: mira lo que hay gratis desde tu teléfono o la pantalla junto a la puerta.
2. **Cargar y pagar**: tarjeta, sin contacto o la aplicación Spin City. Las monedas todavía funcionan en las máquinas 1 a 8.
3. **Establezca un temporizador**: la aplicación le envía un mensaje de texto cinco minutos antes de que finalice su ciclo, para que no pierda su máquina.
4. **Si algo sale mal**: presiona el botón de ayuda junto a la máquina de cambio o llama al número que aparece en la pared. Las averías se reembolsan el mismo día, sin formulario.

**Máquinas** — `Veinticuatro lavadoras: ocho pequeñas de 8kg, diez medianas de 12kg, cuatro grandes de 18kg y dos extragrandes de 25kg. En las extra grandes cabe cómodamente un edredón tamaño king y en las grandes uno doble. Dieciocho secadoras, todas ventiladas,todo con un entorno delicado que la gente olvida que existe.`

**Horario de apertura** — `Abierto de 6:00 a 23:00, los siete días · Atiende de 8:00 a 18:00 entre semana, de 9:00 a 17:00 los fines de semana · Último lavado 22:00, último secado 22:30`

**Cuentas comerciales** — `Anfitriones de Airbnb, salones, restaurantes y pequeños hoteles. Recogida y entrega semanal en un radio de tres millas, facturación mensual y tarifa fija por kilo. Alrededor de cuarenta negocios locales nos utilizan, principalmente para ropa de cama y toallas.`

**Reglas de la casa** — `Los carros permanecen en la tienda · Configure un cronómetro, su máquina puede moverse después de quince minutos · Nada grasoso o cubierto de pintura, daña los tambores para todos · Menores de 16 años con un adulto, por favor · Llévese sus botellas de jabón a casa`

**Encuéntrenos** — `288 Gloucester Road, Bristol BS7 8PD` · `Dos horas de estacionamiento gratuito en Egerton Road, y las carreteras 75 y 76 paran afuera` · `Entrada sin escalones, y la puerta ancha es la de la izquierda`

**Pie de página** — SPIN CITY · `Comprueba antes de llevarlo cuesta abajo.` · `0117 555 0182` · Fallas reembolsadas el mismo día · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
