# Kestrel Precision — Aviso del sitio web de fabricación

## 1. Declaración de objetivos
Crear un sitio web técnico de fabricación por contrato basado en especificaciones para **Kestrel Precision**, definido por datos de color gris acero mecanizado, cian frío y monoespacial: un sitio que vende tolerancias, certificaciones y plazos de entrega a ingenieros que nunca leerán un párrafo de un texto de marketing.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(215, 16%, 10%);      /* #15181d machined dark */
  --foreground: hsl(210, 14%, 93%);      /* #eaedf0 */
  --primary: hsl(190, 90%, 48%);         /* #0cbde8 cold cyan */
  --primary-foreground: hsl(215, 18%, 8%);
  --muted-foreground: hsl(212, 8%, 55%);
  --border: hsl(215, 12%, 20%);
  --card: hsl(215, 14%, 13%);
  --card-elevated: hsl(215, 12%, 17%);
  --spec: hsl(45, 92%, 58%);             /* tolerance highlight */
}
```

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
```
- **H1:** Barlow 700, clamp(38px, 5vw, 72px), espacio entre letras -0.025em
- **H2:** Barlow 600, 30–44px
- **H3:** Barlow 600, 18–20px
- **Cuerpo:** Barlow 500, 16 píxeles, altura de línea 1,68
- **Especificaciones/cejas/números de pieza:** IBM Plex Mono 500, mayúsculas, espacio entre letras 0,12 em, 11 píxeles, cian
- **Tolerancias y capacidades:** Barlow 700, tabular-nums

## 5. Efectos visuales

**Efecto 1: Matriz de capacidad.** Una tabla densa de procesos contra materiales, con celdas marcadas con un punto cian para capacidad estándar, un anillo hueco para disponible bajo pedido y vacío para no ofrecido. Las filas se animan con un escalonamiento y, al pasar el cursor sobre una celda, aparece la tolerancia alcanzable.

```tsx
const processes = ['CNC milling', 'CNC turning', 'Wire EDM', 'Surface grinding', 'Sheet fabrication'];
const materials = ['Aluminium', 'Stainless', 'Tool steel', 'Titanium', 'Brass', 'Engineering plastics'];

{processes.map((p, r) => (
  <motion.tr
    key={p}
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: r * 0.06 }}
  >
    <th className="py-3 pr-6 text-left font-mono text-[11px] uppercase tracking-wider">{p}</th>
    {materials.map(m => {
      const level = matrix[p][m];
      return (
        <td key={m} className="group relative py-3 text-center">
          <span
            className="inline-block h-3 w-3 rounded-full transition-transform group-hover:scale-125"
            style={{
              background: level === 2 ? 'var(--primary)' : 'transparent',
              border: level === 1 ? '1.5px solid var(--primary)' : 'none',
            }}
          />
        </td>
      );
    })}
  </motion.tr>
))}
```

**Efecto 2: llamada de tolerancia.** Una figura monoespacial cian que cuenta hacia atrás desde una tolerancia aproximada hasta la alcanzable en el desplazamiento y aterriza en el número de título para el que está diseñado todo el sitio. comunicar.

## 6. Desglose de componentes

1. **Barra de navegación**: 70 px, fijo, oscuro con desenfoque, borde inferior cian de 1 px después del desplazamiento. Marca denominativa a la izquierda, enlaces en el centro, botón cian "Solicitar una cotización" y un enlace de texto "Cargar dibujos" a la derecha.
2. **Héroe** — 84vh, dividido. Texto a la izquierda, fotografía de la máquina a la derecha. Mono ceja, H1, sublínea, dos CTA, cuatro chips de certificación. *Imagen: un centro de mecanizado CNC de cinco ejes de corte medio con spray refrigerante, corte cercano, iluminación industrial fría y detalles mecánicos nítidos.*
3. **Matriz de capacidades**: la sección en la que los ingenieros se desplazan hasta (Efecto 1).
4. **Tolerancias y capacidad**: cuatro cifras de conteo: tolerancia alcanzable, sobre más grande, número de husillos yPlazo de entrega típico.
5. **Procesos** — Tarjetas 2x3: fresado CNC, torneado CNC, electroerosión por hilo, rectificado de superficies, fabricación de láminas, ensamblaje, cada uno con recuento de ejes y tamaños de envolvente.
6. **Calidad y certificación**: ISO 9001 y AS9100 con fechas de auditoría, equipos de inspección CMM enumerados por marca y una declaración sobre los informes de inspección del primer artículo.
7. **Sectores**: cuatro bloques: aeroespacial, dispositivos médicos, deportes de motor y automatización industrial, cada uno de los cuales nombra la restricción específica que conlleva ese sector.
8. **Cómo obtener una cotización**: tres pasos con formatos de archivo aceptados y un plazo de entrega de veinticuatro horas para consultas estándar.
9. **Prototipo a producción**: una breve sección sobre tamaños de lotes desde uno hasta diez mil y cómo cambian los precios entre ellos.
10. **Lista de máquinas**: una tabla monoespaciada simple de cada máquina con marca, modelo, ejes y envolvente de trabajo. Nada vende más un taller mecánico que la lista de máquinas.
11. **Formulario de cotización**: nota de carga del archivo, cantidad, material, tolerancia y fecha requerida.
12. **Pie de página**: pizarra más oscura, regla superior cian, cuatro columnas, registro, números de certificado ISO, dirección.

## 7. Animaciones
- Hero: el texto se desvanece 0,6 s; la imagen se revela con un barrido de clipPath desde la derecha, 0,9 s; los chips de certificación se escalonan 0,06 s
- Matriz de capacidad: las filas se deslizan desde la izquierda, escalonadas 0,06 s; los puntos de la celda escalan 1.25 al pasar el mouse
- Llamada de tolerancia: cuenta desde 0.1 hasta 0.005 en 1.6s
- Cifras de capacidad: cuenta atrás 1600 ms en usoInView
- Tarjetas de proceso: el borde cian de 1px se desvanece al pasar el mouse, no transform
- Filas de la mesa de la máquina: desvanecimiento escalonado 0.03s
- El movimiento es preciso y mínimo: el sitio de un taller de maquinaria debe parecer diseñado, no diseñado

## 8. Responsive
- **Móvil (<768px):** hamburguesa; H1 se fija a 38 px; la matriz de capacidades se convierte en un listado de materiales en acordeón por proceso, ya que una matriz de seis columnas no puede funcionar a 375 px; cifras de capacidad 2x2; la mesa de la máquina se convierte en cartas apiladas; `Solicitar una cotización` fijado como una barra inferior adhesiva.
- **Tableta:** la matriz mantiene la forma de la tabla con encabezados de materialesgirado; procesos 2-col.
- **Escritorio:** ancho máximo 1240px, `px-16`, `py-22`.

## 9. Copia completa

**Marca:** KESTREL PRECISION · Fabricación por contrato · Coventry

**Navbar:** Capacidades · Calidad · Sectores · Máquinas · Cotización · [Botón] Solicitar cotización

**Hero**
- Ceja: `MANUFACTURA POR CONTRATO · COVENTRY · ISO 9001 & AS9100 · DESDE 1994`
- H1: `Cinco micrones, repetiblemente, a volumen.`
- Sublínea: `Mecanizado y fabricación CNC de precisión para el sector aeroespacial, médico y de deportes de motor. Catorce máquinas, inspección interna de CMM y una cotización dentro de las veinticuatro horas para consultas estándar.`
- CTA: `Solicitar una cotización` · `Ver capacidades`
- Chips: `ISO 9001:2015` · `AS9100 Rev D` · `ITAR REGISTERED` · `UKAS CALIBRADO`

**Matriz de capacidades** — Ceja `CAPACIDAD` — H2 `Lo que cortamos y en qué lo cortamos`
Procesos: Fresado CNC · Torneado CNC · Electroerosión por hilo · Rectificado de superficies · Fabricación de láminas
Materiales: Aluminio · Inoxidable · Acero para herramientas · Titanio · Latón · Plásticos de ingeniería
Leyenda: `Filled dot = standard capability` · `Ring = available on request` · `Empty = not offered`

**Cifras de capacidad** — `±0.005mm` Tolerancia alcanzable · `1200 × 600 × 500mm` Sobre más grande · `14` máquinas CNC · `9 días` Plazo típico tiempo

**Procesos**
1. **Fresado CNC** — 3, 4 y 5 ejes. Sobre más grande 1200 × 600 × 500 mm. 5 ejes simultáneos en dos máquinas para geometría compleja en una sola configuración.
2. **Torneado CNC**: hasta 350 mm de diámetro, 900 mm entre centros, con herramientas motorizadas y subhusillo para piezas hechas en una sola.
3. **EDM por hilo**: 400 × 300 × 250 mm, ±0,003 mm posicional, para acero para herramientas endurecido y perfiles que el fresado no puede alcanzar.
4. **Rectificado de superficies**: mesa de 600 × 300 mm, alcanzable Ra 0,2, para requisitos de planitud y acabado más allá del mecanizado.
5. **Fabricación de láminas**: corte por láser de acero dulce de 12 mm, prensa plegadora de 3 m, soldadura TIG y MIG con soldadores codificados.
6. **Ensamblaje y subensamblaje**: kit, ensamblaje mecánico, inserción de helicoidal y empaquetadura según las especificaciones del cliente.

**Calidad y certificación** — H2`La inspección no es una ocurrencia tardía aquí`
`ISO 9001:2015 desde 2003, AS9100 Rev D desde 2011, ambos auditados por última vez en marzo de 2026 sin incumplimientos importantes. Registrado en ITAR. Todos los equipos de medición UKAS calibrados en un ciclo de doce meses con certificados disponibles por trabajo.`
`Equipo de inspección: Zeiss Contura G2 CMM con sobre de 700 × 1000 × 600 · Mitutoyo Crysta-Apex S574 · Comparador óptico Keyence IM-8000 · Acabado superficial completo y pruebas de dureza internas.`
`First Los informes de inspección de artículos según AS9102 se suministran como estándar en todos los números de piezas nuevos, sin costo adicional. No cobramos por demostrar que lo hicimos bien.`

**Sectores**
- **Aeroespacial**: flujo de AS9100, trazabilidad completa del material hasta el certificado de fábrica y la carga de la documentación se maneja adecuadamente y no a regañadientes.
- **Dispositivos médicos**: embalaje compatible con sala limpia, procesos validados y control de cambios que sobrevivirá a una auditoría.
- **Motorsport**: el plazo de entrega se mide en días en lugar de semanas, porque una pieza necesaria para la práctica del viernes se necesita para la práctica del viernes.
- **Automatización industrial**: trabajo repetido por lotes con programación de llamadas y tenencia de stock consignado.

**Cómo obtener una cotización**
1. **Envíe dibujos**: archivos STEP, IGES, DXF, PDF o archivos nativos de SolidWorks y Fusion. Si todo lo que tiene es un boceto y una muestra, envíelo.
2. **Díganos la cantidad y el material**: el precio por pieza cambia considerablemente entre uno y cien, y le mostraremos los puntos de ruptura en lugar de citar un número.
3. **Regresamos dentro de las 24 horas** — En consultas estándar. Los conjuntos complejos de varias piezas tardan de dos a tres días y le diremos cuál es el suyo.

**Prototipo a producción** — `Prototipos únicos hasta lotes de diez mil. Por debajo de unas veinte piezas, usted paga principalmente por la configuración, razón por la cual el precio de división por cantidad es tan importante en el extremo inferior. Siempre te mostraremos cuánto cuesta el próximo descanso, porque pedir cuarenta cuando pides veinticinco a veces sale más barato en términos absolutos.`

**Máquinalist**
```
MILL   Hermle C42U          5-axis    800 × 800 × 550
MILL   Hermle C32U          5-axis    650 × 600 × 500
MILL   DMG Mori DMU 50      5-axis    500 × 450 × 400
MILL   Haas VF-4SS          3-axis   1270 × 508 × 635
MILL   Haas VF-3            3-axis   1016 × 508 × 635
MILL   Haas VF-2            3-axis    762 × 406 × 508
MILL   Matsuura MX-520      5-axis    520 × 460 × 400
TURN   DMG Mori NLX 2500    Live tooling, sub-spindle, Ø366 × 705
TURN   Doosan Puma 2600SY   Y-axis, sub-spindle, Ø350 × 900
TURN   Haas ST-20           Ø356 × 559
EDM    Sodick AQ400LS       Wire, 400 × 300 × 250
GRIND  Jones & Shipman 1400 Surface, 600 × 300
LASER  Trumpf TruLaser 3030 12mm mild steel
BRAKE  Amada HFE 1303       3m, 130 tonne
```

**Formulario de cotización** — Empresa / Contacto / Correo electrónico / Nombre o número de pieza / Cantidad / Material / Tolerancia crítica / Fecha requerida / Carga de dibujo → [Botón] `Solicitar una cotización`
Nota: `Los dibujos se tratan como confidenciales y están cubiertos por nuestro acuerdo de confidencialidad estándar desde el momento en que llegan. Un acuerdo de confidencialidad mutuo firmado está disponible previa solicitud antes de enviar cualquier cosa.`

**Pie de página** — KESTREL PRECISION · `Cinco micrones, repetiblemente, en volumen.` · `Unidad 7, Bayton Road Industrial Estate, Coventry CV7 9EJ` · `024 7655 0140` · Certificado ISO 9001:2015 4482019 · Certificado AS9100 Rev D 4482020 · Registro de empresa 02918844 · © 2026

## 10. Dependencias clave
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
