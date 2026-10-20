# Vessel Gallery — Mensaje del sitio web de la Galería de Arte Contemporáneo

## 1. Declaración de objetivos
Crear un sitio web de galería de arte contemporáneo minimalista e inflexible para **Vessel Gallery**, definido por texto blanco puro, casi negro y espacio negativo extremo, donde la interfaz desaparece por completo y la obra es lo único que tiene color en la página.

## 2. Tecnología Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + shadcn/ui + lucide-react
```

## 3. Sistema de diseño: colores
```css
:root {
  --background: hsl(0, 0%, 100%);        /* pure white cube */
  --foreground: hsl(0, 0%, 8%);          /* #141414 */
  --primary: hsl(0, 0%, 8%);             /* no accent colour by design */
  --primary-foreground: hsl(0, 0%, 100%);
  --muted-foreground: hsl(0, 0%, 48%);
  --border: hsl(0, 0%, 90%);
  --card: hsl(0, 0%, 98%);
}
```
Deliberadamente **no hay color de acento**. La única saturación de la página proviene de las obras de arte mismas.

## 4. Tipografía
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```
- **H1:** Inter 300, clamp(28px, 3vw, 46px), espaciado entre letras -0,02 em — deliberadamente pequeño para un hero
- **H2:** Inter 400, 22–30px
- **H3 / nombres de artistas:** Inter 500, 16–18px
- **Cuerpo:** Inter 300, 16px, altura de línea 1.8
- **Etiquetas / subtítulos:** Inter 400, 12 px, espacio entre letras 0,06 em, silenciado: configurado como etiquetas de pared
- **Fechas:** Inter 400, tabular-nums, 12px

Todo es pequeño. La restricción es el diseño.

## 5. Efectos visuales

**Efecto 1: Leyendas de etiquetas de pared.** Cada leyenda de imagen se establece exactamente como una etiqueta de pared de galería: nombre del artista, título en cursiva, año, medio, dimensiones, cada una en su propia línea a 12 px, alineada a la izquierda, con letras generosas. líder.

```jsx
<figure>
  {/* Image: contemporary abstract painting hanging on a white gallery wall, even diffuse lighting, plenty of surrounding white space */}
  <img src="" alt="Untitled work by represented artist" className="w-full object-cover object-center" />
  <figcaption className="mt-5 space-y-0.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
    <div className="text-[var(--foreground)]">Ines Okafor</div>
    <div><em>Slow Water (iv)</em>, 2025</div>
    <div>Oil and pigment on linen</div>
    <div>180 × 140 cm</div>
  </figcaption>
</figure>
```

**Efecto 2: estado de desplazamiento solo del cursor.** Las obras no tienen cromo de desplazamiento visible. En cambio, el cursor se convierte en un pequeño círculo que contiene la palabra "Ver", siguiendo al puntero con un resorte. En dispositivos táctiles, esto está deshabilitado y aparece un enlace de título simple.

## 6. Desglose de componentes

1. **Barra de navegación**: 88 píxeles, estática (no fija), blanca, sin borde. Pequeña marca denominativa a la izquierda, cinco enlaces a la derecha con un espacio entre letras de 12 píxeles. Nada más.
2. **Héroe**: sin imagen, sin pantalla completa. Solo la exposición actual configurada como un bloque de texto en el tercio superior: nombre del artista, título de la exposición en cursiva, fechas y una línea de texto curatorial. Enorme espacio en blanco debajo.
3. **Exposición actual**: una única imagen de instalación de ancho completo con una etiqueta de pared debajo. *Imagen: interior de la galería con grandes obras de arte.sobre paredes blancas, piso de concreto pulido, luz natural incluso difusa, sin gente.*
4. **Funciona**: una cuadrícula deliberadamente escasa: dos columnas en el escritorio con canales muy grandes, cada una funciona con una etiqueta de pared (Efecto 1). Sin caja de luz cromada.
5. **Artistas**: una lista simple de los artistas representados, el nombre y la descripción de la práctica en una línea, cada uno con un enlace a una página. Sin retratos, sin tarjetas.
6. **Archivo de la exposición**: tabla cronológica inversa: año, artista, título de la exposición, fechas. Nada más.
7. **Sala de visualización**: una breve sección que describe la sala de visualización privada en línea con un enlace de consulta, posicionada como un servicio para coleccionistas en lugar de una tienda.
8. **Ferias de arte**: tres próximas ferias con números de stand y fechas.
9. **Consultas**: un único bloque de texto con una dirección de correo electrónico, un número de teléfono y una nota sobre las listas de disponibilidad. Sin formulario.
10. **Visita**: dirección, horario, una línea sobre la entrada gratuita e información de acceso sin pasos.
11. **Pie de página**: blanco, un borde superior delgado, tres columnas cortas, enlace a la lista de correo en 12px.

## 7. Animaciones

El movimiento es mínimo por diseño. Un sitio de galería que se anima es un sitio de galería que parece una startup.

- Las imágenes se desvanecen solo: `opacity 0 → 1`, 0,9 s, sin movimiento, sin escala
- Las etiquetas de las paredes se desvanecen 0,2 s después de su imagen
- El cursor personalizado sigue con un resorte (rigidez 220, amortiguación 26)
- Transiciones de sección: ninguna. Las secciones simplemente existen.
- Sin paralaje, sin contadores, sin controles deslizantes, sin desplazamiento de desplazamiento en ninguna parte

## 8. Responsive
- **Móvil (<768px):** la navegación se contrae a un botón de `Menú` de texto plano que revela una lista apilada, sin animación superpuesta; las obras van a 1 columna con el mismo generoso espacio vertical; cursor personalizado desactivado y los subtítulos se pueden tocar; la tabla de archivo se convierte en filas apiladas.
- **Tableta:** funciona en 2 columnas con márgenes reducidos.
- **Escritorio:** ancho máximo 1280 px pero el contenido se limita deliberadamente a aproximadamente el 60 % del mismo, `px-16`, espacio entre secciones `py-32`: el doble de lo que usa un sitio normal.

## 9. Completo Copia

**Marca:** GALERÍA DE BUQUES ·Copenhague

**Navbar:** Actual · Obras · Artistas · Archivo · Visita

**Hero**
- Etiqueta: `CURRENT EXHIBITION`
- H1: `Ines Okafor — *Slow Water*`
- Fechas: `6 de septiembre – 18 de octubre 2026`
- Línea curatorial: `Nueve pinturas nuevas realizadas durante dos inviernos en Jutlandia, en las que el horizonte nunca está exactamente donde lo esperas.`

**Exposición actual** — `Okafor trabaja con finas capas de óleo y pigmentos en bruto, construyendo superficies que se leen como el clima antes de que se lean como un paisaje. Slow Water es su tercera exposición en la galería y la primera que incluye trabajos sobre lino sin estirar.`

**Obras**
1. **Ines Okafor** — *Agua Lenta (iv)*, 2025 — Óleo y pigmento sobre lino — 180 × 140 cm
2. **Ines Okafor** — *Agua Lenta (vii)*, 2026 — Óleo y pigmento sobre lino — 210 × 165 cm
3. **Ines Okafor** — *Holdfast*, 2025 — Óleo sobre lienzo — 90 × 90 cm
4. **Ines Okafor** — *Sin título (Jutlandia)*, 2026 — Pigmento y cera sobre lino sin estirar — 240 × 190 cm
5. **Ines Okafor** — *Agua Lenta (i)*, 2024 — Óleo sobre lienzo — 120 × 100 cm
6. **Ines Okafor** — *Marea baja, repetida*, 2026 — Óleo y pigmento sobre lino — 165 × 165 cm

Nota: `Lista de disponibilidad bajo petición.`

**Artistas** — Ceja `REPRESENTADA`
- **Ines Okafor** — Pintura. Clima, agua y el fracaso de los horizontes.
- **Tobias Lind** — Escultura en aluminio fundido y madera recuperada.
- **Mariam Haddad** — Fotografía e impresión de archivo, trabajando con documento familiar.
- **Petra Solberg** — Instalación y sonido, a menudo adaptables al sitio.
- **Kenji Aoyama** — Investigación sobre cerámica y esmaltes, exhibida anualmente.
- **Rune Dahl** — Dibujo a muy gran escala, grafito y yeso.

**Archivo** — Ceja `EXPOSICIONES ANTERIORES`
- `2026` Tobias Lind — *Ballast* — 12 de junio – 26 Julio
- `2026` Group — *Four Rooms* — 8 de marzo – 19 de abril
- `2025` Mariam Haddad — *The Second Archive* — 14 de noviembre – 21 de diciembre
- `2025` Kenji Aoyama — *Ash Glaze* — 5 de septiembre – 25 Octubre
- `2025` Petra Solberg — *Baja frecuencia* —30 de mayo – 12 de julio
- `2025` Rune Dahl — *Two Meters of Graphite* — 21 de febrero – 5 de abril

**Sala de visualización** — `Hay una sala de visualización privada en línea disponible para coleccionistas e instituciones, con documentación completa, informes de estado y vistas de instalación a escala. El acceso se organiza de forma individual y no mediante contraseña.`

**Ferias de arte**
- `Enter Art Fair, Copenhague` — Stand B14 — 27-30 de agosto de 2026
- `Paris Internationale` — Stand 22 — 15-19 de octubre de 2026
- `Art Basel Miami Beach` — Nova, stand N08 — 4–7 de diciembre de 2026

**Consultas** — `Para informes de disponibilidad, precios y estado: enquiries@vesselgallery.dk · +45 33 55 0142. Respondemos a todo, generalmente dentro de un día hábil.`

**Visita** — `Vesterbrogade 74, 1620 Copenhague V` · Martes a viernes 12:00–18:00 · Sábados 11:00–16:00 · Entrada gratuita · `Entrada sin escalones desde el patio.`

**Pie de página** — VESSEL GALLERY · Copenhague · Lista de correo · Instagram · © 2026

## 10. Clave Dependencias
```json
{
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```
