# Cornerstone Insurance — Aviso del sitio web de la agencia de seguros independiente

## 1. Declaración de objetivos
Cree un sitio web de corretaje de seguros independiente y confiable para **Cornerstone Insurance**, definido por avena tibia, azul marino profundo y una serifa de transición segura: un sitio que lidera con un verificador de brecha de cobertura en lugar de un formulario de cotización, porque la venta se da cuenta de lo que usted no está cubierto. for.

## 2. Pila técnica
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(38, 30%, 96%);       /* #f8f4ed oatmeal */
  --foreground: hsl(216, 40%, 15%);      /* #17223a deep navy */
  --primary: hsl(216, 58%, 30%);         /* #204079 navy */
  --primary-foreground: hsl(38, 30%, 97%);
  --muted-foreground: hsl(216, 8%, 46%);
  --border: hsl(36, 16%, 86%);
  --card: hsl(38, 32%, 92%);
  --accent-gap: hsl(28, 82%, 54%);       /* coverage gap warning */
  --accent-ok: hsl(158, 46%, 38%);       /* covered */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
- **H1:** Espectral 600, clamp(36px, 4.5vw, 62px), espacio entre letras -0.015em
- **H2:** Espectral 500, 30–42px
- **H3:** Inter 600, 18–20px
- **Cuerpo:** Inter 300–400, 17px, altura de línea 1,76
- **Cejas:** Inter 600, mayúsculas, espacio entre letras 0,18em, 11px, azul marino
- **Cobertura cifras:** Spectral 600, tabular-nums

## 5. Efectos visuales

**Efecto 1: verificador de brecha de cobertura.** Seis fichas de alternancia para lo que el visitante ya tiene. A medida que alternan, un panel adyacente enumera lo que aún está descubierto, cada espacio aparece con un punto ámbar y una consecuencia de una línea. Este es el motor de conversión de la página.

```tsx
const all = ['Home', 'Auto', 'Life', 'Umbrella', 'Disability', 'Flood'];
const consequence = {
  Umbrella: 'A judgment above your auto limit comes out of your savings.',
  Disability: 'A six-month injury means six months with no income.',
  Flood: 'Standard home policies exclude flood entirely. Not partially — entirely.',
  Life: 'Your mortgage does not stop when your income does.',
};
const [have, setHave] = useState(['Home', 'Auto']);
const gaps = all.filter(x => !have.includes(x) && consequence[x]);

<AnimatePresence>
  {gaps.map((g, i) => (
    <motion.li key={g} layout
      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.28, delay: i * 0.06 }}
      className="flex gap-3 border-b border-[var(--border)] py-4">
      <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: 'var(--accent-gap)' }} />
      <div><strong>{g}</strong><p className="text-sm text-[var(--muted-foreground)]">{consequence[g]}</p></div>
    </motion.li>
  ))}
</AnimatePresence>
```

**Efecto 2: marquesina con el logotipo del operador.** Una marquesina horizontal lenta e infinita de nombres de operadores establecidos como insignias de texto, que se detiene al pasar el mouse, lo que demuestra que un corredor independiente compra en el mercado en lugar de vender un solo producto.

## 6. Componente Desglose

1. **Barra de navegación**: 74 px, pegajoso, color avena, borde inferior de 1 px. Marca denominativa a la izquierda, centro de enlaces, teléfono y botón azul marino "Obtener una cotización" a la derecha.
2. **Héroe**: dividido, texto a la izquierda, imagen a la derecha. Ceja, serif H1, sublínea, dos CTA, cuatro puntos de confianza. *Imagen: el exterior de una casa familiar bajo la cálida luz del atardecer, en un vecindario establecido, tranquilizador y ordinario.*
3. **Marquesina del transportista**: la prueba de independencia (Efecto 2) directamente debajo del héroe.
4. **Comprobador de brechas de cobertura**: la interacción principal (Efecto 1) con una llamada a la acción "Hable con un agente sobre estas brechas" debajo de los resultados.
5. **Líneas personales** — Tarjetas 2x3: hogar, automóvil, paraguas, vida, inquilinos,inundación.
6. **Líneas comerciales** — Tarjetas 2x3: responsabilidad general, propiedad comercial, compensación laboral, automóviles comerciales, responsabilidad profesional, cibernética.
7. **Independiente versus cautivo**: una comparación de dos columnas que explica qué hace de manera diferente un corredor independiente, con una declaración clara sobre la comisión.
8. **Soporte de reclamos**: tres pasos que describen lo que hace la agencia cuando ocurre un reclamo, que es el momento en que realmente se prueba la relación.
9. **Conozca al equipo**: 3 tarjetas de agente con nombre, número de licencia, especialidad y una línea directa.
10. **Reseñas**: tres tarjetas de cotización, cada una de las cuales nombra la política específica involucrada.
11. **Formulario de cotización**: dividido: formulario a la izquierda, contacto directo a la derecha, con una nota honesta sobre cuánto tiempo lleva una cotización.
12. **Pie de página**: azul marino, cuatro columnas, números de licencia por estado, divulgaciones.

## 7. Animaciones
- Hero: el texto se desvanece 0,7 s; la imagen se revela con un aumento y un desvanecimiento, 0,9 s
- Marco de soporte: bucle de traducción X continuo, 28 s lineal, pausas al pasar el mouse, respeta el movimiento reducido
- Comprobador de espacios: los chips se alternan con una transición de fondo de 0,2 s; las filas de espacio ingresan con animación de diseño y un escalonamiento de 0,06 s
- Tarjetas de cobertura: escalonamiento gradual de 0,07 s; al pasar el cursor, se levanta un borde azul marino de 1 px
- Filas de comparación: los íconos de verificación y guión aparecen emergentes `scale 0.7 → 1`, escalonado
- Pasos de reclamos: la línea de conexión azul marino escala desde la izquierda, 0.8s

## 8. Responsive
- **Móvil (<768px):** hamburguesa; pilas de imágenes encima del texto; H1 se fija a 36px; los chips de verificación de espacios se envuelven en dos filas y el panel de resultados se ubica debajo en lugar de al lado; tarjetas de cobertura 1-col; la comparación se convierte en tarjetas apiladas y etiquetadas; `Obtener una cotización` fijado como una barra inferior adhesiva.
- **Tableta:** división de héroe retenida, cobertura de 2 columnas, equipo de 2 columnas.
- **Escritorio:** ancho máximo 1160 px, `px-16`, `py-22`.

## 9. Completo Copia

**Marca:** CORNERSTONE INSURANCE · Agencia independiente · Raleigh, Carolina del Norte

**Navbar:** Personal · Negocios · Reclamaciones · Acerca de · Contacto · `(919) 555-0146` · [Botón] Obtener una cotización

**Hero**
- Ceja: `RALEIGH, Carolina del Norte ·AGENCIA INDEPENDIENTE · 22 TRANSPORTADORES · DESDE 2003`
- H1: `Trabajamos para usted, no para un solo transportista.`
- Sublínea: `Una agencia de seguros independiente que cubre Carolina del Norte. Cotizamos a veintidós proveedores, explicamos lo que realmente está excluido y contestamos el teléfono cuando tiene un reclamo.`
- CTA: `Verifique mis brechas de cobertura` · `Obtenga una cotización`
- Puntos de confianza: `22 proveedores cotizados` · `Con licencia en NC, SC y VA` · `Abogacía de reclamos incluida` · `4.9 de 480+ reseñas`

**Marquesina para transportistas** — `Travelers` · `Nationwide` · `Safeco` · `Progressive` · `Chubb` · `Hanover` · `Cincinnati` · `Auto-Owners` · `Erie` · `Selective` · `Hartford` · `Kemper`

**Comprobador de brecha de cobertura** — Ceja `COMIENCE AQUÍ` — H2 `¿Para qué no está cubierto?`
`Marque lo que ya tiene. Le mostraremos las brechas que le cuestan más a las personas y lo que realmente significa cada una cuando algo sale mal.`

Deficiencias y consecuencias:
- **Paraguas** — Una sentencia por encima del límite de responsabilidad de su automóvil surge de sus ahorros y salarios futuros.
- **Discapacidad** — Una lesión de seis meses significa seis meses sin ingresos. Es la póliza que más comúnmente se omite y la que más se necesita. 
- **Inundación**: las pólizas de vivienda estándar excluyen por completo las inundaciones. No parcialmente, sino enteramente. El veinte por ciento de los reclamos por inundaciones provienen de zonas fuera de las zonas de inundación mapeadas.
- **Vida**: su hipoteca no se detiene cuando lo hacen sus ingresos.
CTA: `Hable con un agente sobre estas brechas`

**Líneas personales**
1. **Propietarios**: Vivienda, contenido, responsabilidad y pérdida de uso, con costo de reposición en lugar del valor real en efectivo de cualquier cosa que importe.
2. **Auto**: Responsabilidad civil, colisión, cobertura integral y conductor sin seguro. Le avisaremos cuando el mínimo estatal esté peligrosamente bajo, lo cual suele ser el caso.
3. **Paraguas**: De uno a cinco millones en responsabilidad por encima de sus pólizas de vivienda y automóvil, por aproximadamente el precio de una factura telefónica.
4. **Vida** — Plazo y toda la vida. Somos directos sobre cuál necesita realmente y, por lo general, es term.
5. **Inquilinos** — Contenido y responsabilidad desde unos quince dólares al mes. ElLa póliza más infracomprada que existe.
6. **Inundaciones**: pólizas NFIP y privadas contra inundaciones separadas, con un período de espera de treinta días que debe conocer antes de la temporada de huracanes.

**Líneas comerciales**
1. **Responsabilidad general**: lesiones corporales a terceros y daños a la propiedad, además de productos y operaciones completadas.
2. **Propiedad comercial**: construcción, contenido, equipo e interrupción del negocio, que es la cobertura que la mayoría de los propietarios olvidan.
3. **Compensación laboral**: requerida en Carolina del Norte para tres o más empleados. Manejamos los códigos de clasificación correctamente, lo que afecta su prima más que cualquier otra cosa.
4. **Automóvil comercial**: vehículos propios, alquilados y no propios, incluidos los empleados que conducen sus propios automóviles en negocios de la empresa.
5. **Responsabilidad profesional**: errores y omisiones para consultores, agencias, contratistas y profesionales autorizados.
6. **Cibernético**: respuesta a infracciones, costos de notificación, ransomware e interrupción del negocio. Ya no es opcional para cualquiera que tenga datos de clientes.

**Independiente frente a cautivo** — H2 `Por qué importa la independencia`
`Un agente cautivo vende las pólizas de una empresa. Citamos veintidós, lo que significa que cuando su proveedor aumenta su prima en un veinte por ciento en el momento de la renovación, lo trasladamos en lugar de explicarle por qué debería aceptarlo. Cualquier operador que elija nos paga una comisión, y no varía lo suficiente como para influir en lo que recomendamos. Le informaremos cuando lo haga.`

**Soporte de reclamaciones**
1. **Llámenos primero, no al transportista**: tomamos los detalles, le decimos qué documentar y lo archivamos con usted en lugar de hacerlo por usted.
2. **Abogamos durante todo el proceso**: si un ajustador subestima algo, lo rechazamos con el lenguaje de la política. Para eso está la relación.
3. **Lo seguimos para cerrar** — Recibirás una actualización semanal hasta que se resuelva, haya o no novedades.

**Equipo**
1. **Ray Whitfield** — Agente principal · Licencia NC 8842019 — Veintidós años en líneas personales. Directo: (919) 555-0147.
2. **Dana Kessler** — Agente de líneas comerciales · Licencia NC 9120884— Contratistas, restaurantes y servicios profesionales. Directo: (919) 555-0148.
3. **Marcus Obi** — Agente de líneas personales · Licencia NC 9450112 — Auto, hogar y paraguas, y la persona que lee cada aviso de renovación.

**Reseñas**
1. "Descubrieron una diferencia de doscientos mil dólares entre la responsabilidad civil de mi automóvil y mi patrimonio neto real. Nunca había pensado en ello ni una sola vez en veinte años conduciendo.` — **Sandra P.**, póliza Umbrella
2. "Daños por huracán, el ajustador volvió a bajar, Ray habló por teléfono con la póliza frente a él y subió once mil dólares". — **Tom R.**, afirmación de propietarios
3. `Mi anterior agente me renovaba todos los años sin decir palabra. Cornerstone lo compró y me ahorró cuatrocientos dólares en una cobertura idéntica.` — **Elena V.**, Auto y hogar

**Formulario de cotización** — Nombre/correo electrónico/teléfono/¿Qué necesita que esté cubierto? / Operador actual, si lo hay → [Botón] `Obtener una cotización`
Nota: `Las cotizaciones personales generalmente regresan el mismo día. El comercial requiere de dos a tres, porque realmente lo compramos.`

**Pie de página** — CORNERSTONE INSURANCE · `Agencia independiente, Raleigh NC` · `4210 Six Forks Road, Suite 200, Raleigh, NC 27609` · `(919) 555-0146` · Con licencia en NC, SC y VA · Licencia de agencia NC 8842019 · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-toggle-group": "^1.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
