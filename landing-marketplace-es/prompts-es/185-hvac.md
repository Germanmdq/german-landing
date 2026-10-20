Cree un sitio web completo de una sola página para la empresa de HVAC llamado **KLYMA**: limpio, moderno y premium. Fondo blanco puro, además de Jakarta Sans en todas partes, botones en forma de píldora, una foto de héroe en forma de estadio con tarjetas de estadísticas flotantes y generosos espacios en blanco en cada sección. Se trata de una empresa de servicios local que parece más pulida que cualquier competidor: confiable sin ser corporativa, moderna sin ser fría.

---

## Regla de diseño global: centrado

Eda sección debe estar centrada horizontalmente. Ningún bloque debe estar alineado a la izquierda con respecto al borde de la ventana gráfica. 

```jsx



    {/* content */}
  


```

El contenido más estrecho (preguntas frecuentes, bloques de texto) utiliza `max-w-3xl mx-auto`. Siempre empareje `max-w-*` con `mx-auto`.

---

## Tech Stack

```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react
```

---

## Diseño Sistema

```css
:root {
  --background: 0 0% 100%;           /* pure white */
  --foreground: 220 40% 7%;          /* near-black #0D1117 */
  --primary: 224 76% 48%;            /* vivid blue #1D4ED8 */
  --primary-light: 214 100% 97%;     /* pale blue #EFF6FF */
  --primary-foreground: 0 0% 100%;
  --accent: 24 95% 48%;              /* orange #EA580C — emergency strip only */
  --muted: 220 14% 97%;              /* off-white #F9FAFB */
  --muted-foreground: 220 9% 46%;    /* grey #6B7280 */
  --border: 220 13% 91%;             /* light border #E5E7EB */
  --success: 142 71% 38%;            /* green checkmarks */
}
```

Cada sección se alterna: blanco → `--muted` → blanco. No hay secciones oscuras excepto el pie de página.

---

## Tipografía

```html
@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

| Rol | Fuente | Estilo |
|------|------|-------|
| H1 | Plus Yakarta Sans | 800, espacio entre letras -0,04 em, interlineado ajustado |
| H2 | Plus Yakarta Sans | 800, espacio entre letras -0,025em |
| H3 / títulos de tarjetas | Plus Yakarta Sans | 700 |
| Subetiquetas | Plus Yakarta Sans | 600, 0,68rem, seguimiento-[0,2em] mayúsculas |
| Cuerpo | Plus Yakarta Sans | 300–400, líder relajado |
| Botones | Plus Yakarta Sans | 600, 0,875rem |
| Estadísticas | Plus Yakarta Sans | 800, espacio entre letras -0.03em |

---

## Sistema de botones

Todos los botones: `inline-flex items-center justify-center gap-2 encogimiento-0 espacios en blanco-nowrap` con `border-radius: 100px` (forma de pastilla) en todas partes):

```jsx
// Primary — blue pill

  Get a Free Quote


// Secondary — outline pill

  View Services


// Ghost — for use inside colored CTA sections

  Get a Free Quote


// Small chip — non-interactive label style



  FROM $89



```

---

## Efectos visuales

**Foto en forma de pastilla/estadio:**
```css
/* Hero image container — rounded top, straight bottom */
border-radius: 200px 200px 160px 160px;
overflow: hidden;
```

**Tarjetas de estadísticas flotantes en foto:**
```css
.stat-card {
  position: absolute;
  background: white;
  border-radius: 14px;
  padding: 14px 20px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.10);
}
.stat-card-blue {
  background: hsl(var(--primary));
  border-radius: 14px;
  padding: 14px 20px;
}
```

**Herramienta de tarjeta de servicio:**
```
translateY(-4px) + box-shadow 0 16px 48px rgba(0,0,0,0.08)
transition: all 200ms ease-out
```

**Fila de chip de confianza:**
```jsx


NATE Certified


```

**Contador de estadísticas animación:**
```
requestAnimationFrame 0 → target, 1600ms ease-out cubic
IntersectionObserver — fires once on first entry
```

**Entrada escalonada (FramerMovimiento):**
```
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
IntersectionObserver trigger
```

---

## Desglose de componentes

### 1. Tira de emergencia
```
Thin strip — NOT a big bar. Minimal and informational.
bg-[#FFF7ED] border-b border-[#FED7AA] py-2.5 px-[72px]

Content: max-w-[1200px] mx-auto flex justify-center items-center gap-2

Orange dot: w-2 h-2 bg-[hsl(var(--accent))] rounded-full
Text: "⚡ 24/7 Emergency HVAC — No extra charge for nights or weekends · (800) 559-2648"
  Plus Jakarta Sans 500 text-xs text-[#C2410C]
```

### 2. Barra de navegación
```
Position: sticky top-0 z-40 bg-white border-b border-[hsl(var(--border))]
Content: max-w-[1200px] mx-auto px-[72px] py-6 flex justify-between items-center

Left: "KLYMA" — Plus Jakarta Sans 800 text-lg letter-spacing-[-0.02em] text-[hsl(var(--foreground))]

Center (desktop): Services · About · Reviews · FAQ
  Plus Jakarta Sans 400 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors gap-10

Right: flex items-center gap-4
  Thin divider: w-px h-5 bg-[hsl(var(--border))]
  Phone link: Plus Jakarta Sans 500 text-sm text-[hsl(var(--foreground))] inline-flex items-center gap-1.5
    Phone icon w-3.5 h-3.5 + "(800) 559-2648"
  "Free Quote →" primary button h-10 px-6 text-sm

Mobile: hamburger (3 lines, Menu icon) → slide-down or overlay menu
```

### 3. Hero
```
Section: px-[72px] py-20 min-h-[88vh] flex items-center
Content: max-w-[1200px] mx-auto grid grid-cols-2 gap-16 items-center

LEFT COLUMN:

  Social proof row (mb-9):
    Avatar stack: flex items-center
      3 overlapping circles w-8 h-8 rounded-full border-2 border-white, -ml-2 first:ml-0
      [Media brief: image | friendly homeowner portrait, casual, smiling, warm light — x3 different people]
    "★ 4.9" Plus Jakarta Sans 600 text-sm ml-3
    "from 1,800+ Google reviews" Plus Jakarta Sans 300 text-sm text-[hsl(var(--muted-foreground))]

  H1: Plus Jakarta Sans 800, font-size clamp(3.2rem,5.5vw,5.8rem)
    letter-spacing -0.04em, line-height 0.95, color hsl(var(--foreground))
    "Heating &"
    "Cooling"
    "Done Right." — last line in text-[hsl(var(--primary))]

  Subline: Plus Jakarta Sans 300 text-base text-[hsl(var(--muted-foreground))] leading-[1.75] mt-7 max-w-[400px]
    "Licensed HVAC contractors for homes and businesses. Flat-rate pricing, same-day service, 10-year warranty on all installations."

  Trust chips row: flex flex-wrap gap-2 mt-8
    3 chips (NATE Certified · EPA 608 Licensed · BBB A+ Rated)
    Each: inline-flex items-center gap-1.5 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-full px-3 py-1.5
    CheckCircle w-3.5 h-3.5 text-[hsl(var(--success))] + Plus Jakarta Sans 500 text-[0.72rem] text-[hsl(var(--foreground))]

  CTA row: flex gap-3 items-center mt-10
    "Get a Free Quote" primary pill button h-12 px-9
    "View Services" secondary pill button h-12 px-8

RIGHT COLUMN (position: relative):

  Stadium photo container:
    border-radius: 200px 200px 160px 160px
    overflow: hidden
    height: 560px

    Background image:
    [Media brief: image | HVAC technician in branded uniform confidently working on a rooftop AC unit, clear blue sky, bright daylight, professional posture, modern residential neighborhood visible | any composition — stadium container frames the image]
    object-cover object-center w-full h-full

  Floating card — bottom-left, stat-card:
    position: absolute bottom-9 left-[-32px]
    "10-YEAR WARRANTY" — Plus Jakarta Sans 600 text-[0.6rem] tracking-[0.18em] uppercase text-[hsl(var(--muted-foreground))]
    "All installations" — Plus Jakarta Sans 700 text-base text-[hsl(var(--foreground))] mt-1
    "Parts & labor included" — Plus Jakarta Sans 300 text-xs text-[hsl(var(--muted-foreground))] mt-0.5

  Floating card — top-right, stat-card-blue:
    position: absolute top-8 right-[-24px]
    "90min" — Plus Jakarta Sans 800 text-2xl text-white letter-spacing-[-0.03em]
      with "avg" in text-sm font-300 text-white/60 inline
    "Response time" — Plus Jakarta Sans 300 text-xs text-white/65 mt-1
```

### 4. Barra de confianza
```
Section: bg-white border-y border-[hsl(var(--border))] py-7 px-[72px]
Content: max-w-[1200px] mx-auto flex justify-between items-center gap-8 flex-wrap

Left label: Plus Jakarta Sans 500 text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] shrink-0
  "RATED & REVIEWED ON"

Right badges: flex gap-0 items-center divide-x divide-[hsl(var(--border))]
  Each: px-10 first:pl-0 flex items-center gap-2.5

  Google: colored G mark (SVG inline) + "Google Reviews" Plus Jakarta Sans 500 text-sm + "★★★★★" text-[#F59E0B] text-xs + "4.9 / 5" Plus Jakarta Sans 600 text-sm
  Yelp: red Yelp R mark + "Yelp" + stars + "4.8 / 5"
  Trustpilot: green Trustpilot star + "Trustpilot" + stars + "4.9 / 5"
```

### 5. Servicios
```
Section: bg-[hsl(var(--muted))] py-24 px-[72px]
Content: max-w-[1200px] mx-auto

Header row: flex justify-between items-end mb-14
  Left:
    Label: "OUR SERVICES" blue uppercase 0.68rem tracking-[0.2em] font-600 mb-3
    H2: Plus Jakarta Sans 800 text-[clamp(2rem,3vw,2.8rem)] letter-spacing-[-0.025em] line-height-[1.15]
      "Heating, cooling, and"
      "everything in between."
  Right: "All services →" secondary pill button h-11 mt-2

Grid: grid grid-cols-3 gap-5

6 service cards — bg-white rounded-2xl overflow-hidden border border-[hsl(var(--border))] cursor-pointer
  Hover: translateY(-4px) + shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-200

  Image area: h-[150px] relative overflow-hidden
    Gradient color bg + inner image:
    img: w-full h-full object-cover object-center

  Content: p-6
    Price chip: inline-flex bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-[0.68rem] font-semibold tracking-[0.08em] px-3 py-1 rounded-full mb-3
    Title: Plus Jakarta Sans 700 text-base text-[hsl(var(--foreground))] mb-2
    Body: Plus Jakarta Sans 300 text-sm text-[hsl(var(--muted-foreground))] leading-[1.65]
    Link: "Learn more →" Plus Jakarta Sans 600 text-sm text-[hsl(var(--primary))] mt-4 inline-flex items-center gap-1

  Card 1 — light blue gradient bg:
    [Media brief: image | outdoor AC condenser unit close-up, technician's hands inspecting, bright daylight, residential backyard]
    "FROM $2,400" / "AC Installation & Replacement"
    "Central air, ductless mini-splits, whole-home systems — properly sized for your space."

  Card 2 — warm amber gradient bg:
    [Media brief: image | gas furnace in basement, clean and maintained, utility room, close detail of components]
    "FROM $1,800" / "Heating Installation"
    "Furnaces, heat pumps, and boilers for all home sizes and fuel types."

  Card 3 — light green gradient bg:
    [Media brief: image | HVAC technician kneeling beside outdoor unit with diagnostic tablet, professional uniform, residential setting]
    "FROM $89" / "AC & Heating Repair"
    "Same-day, flat-rate pricing — most repairs completed on the first visit."

  Card 4 — lavender gradient bg:
    [Media brief: image | technician replacing home air filter, bright clean living room, hands holding fresh white filter]
    "FROM $89" / "Tune-Up & Maintenance"
    "Seasonal inspections, coil cleaning, and efficiency checks to extend system life."

  Card 5 — soft teal gradient bg:
    [Media brief: image | whole-home air purifier mounted on ductwork, clean utility room, modern HVAC equipment]
    "FROM $350" / "Air Quality Solutions"
    "Purifiers, UV light systems, humidifiers, and advanced filtration for healthier air."

  Card 6 — dark midnight gradient bg:
    [Media brief: image | HVAC van at night with headlights on, technician walking to front door with tool bag, urgent atmosphere]
    "FROM $149" / "24/7 Emergency Service"
    "Nights, weekends, holidays — no extra charge. Metro coverage within 90 minutes."
```

### 6. Estadísticas
```
Section: bg-[hsl(var(--primary))] py-16 px-[72px]
Content: max-w-[1200px] mx-auto grid grid-cols-4 gap-8 text-center text-white divide-x divide-white/20

4 stats — counter animation on scroll:
  Each: px-8 first:pl-0 last:pr-0

  Number: Plus Jakarta Sans 800 text-5xl md:text-6xl letter-spacing-[-0.03em]
  Label: Plus Jakarta Sans 300 text-xs tracking-[0.12em] uppercase text-white/60 mt-2

  "15,000+" — "Systems Serviced"
  "22 Years" — "In Business"
  "98%" — "Client Satisfaction"
  "90 Min" — "Avg Response Time"
```

### 7. Acerca de — Dividir con pila de fotos
```
Section: bg-white py-24 px-[72px]
Content: max-w-[1200px] mx-auto grid grid-cols-2 gap-20 items-center

LEFT — photo:
  Relative container (overflow: visible so badges show)

  Main image: rounded-2xl overflow-hidden aspect-[4/3]
    [Media brief: image | two HVAC technicians in matching branded uniforms standing in front of a company van, smiling and confident, suburban street, sunny daylight]

  Floating badge — absolute -bottom-5 -right-6:
    stat-card — white card shadow
    "10-Year Workmanship Warranty" Plus Jakarta Sans 700 text-sm text-[hsl(var(--foreground))]
    "On all installations — parts & labor" Plus Jakarta Sans 300 text-xs text-[hsl(var(--muted-foreground))] mt-1

  Small inset photo — absolute -top-5 -left-6 hidden lg:block:
    w-28 h-28 rounded-xl overflow-hidden shadow-lg border-4 border-white
    [Media brief: image | NATE certification badge or technician ID card close-up, professional detail]

RIGHT — text:
  Label: "ABOUT KLYMA" primary blue uppercase tracking-[0.2em] text-xs font-600 mb-4
  H2: Plus Jakarta Sans 800 text-[clamp(2rem,3vw,2.8rem)] letter-spacing-[-0.025em] line-height-[1.15]
    "A family business."
    "Not a call center."
  Body: Plus Jakarta Sans 300 text-base text-[hsl(var(--muted-foreground))] mt-5 leading-[1.8]
    "KLYMA has been serving the metro area since 2002. We started as a two-person operation and grew to a 50-technician team — but we've never lost the mindset of a family business. Every tech is in-house, background-checked, and trained by us. We don't outsource, we don't cut corners, and we stand behind every job."

  Feature list (mt-9 flex flex-col gap-4):
    Each: flex items-start gap-3
    CheckCircle w-5 h-5 text-[hsl(var(--success))] shrink-0 mt-0.5
    Plus Jakarta Sans 500 text-sm text-[hsl(var(--foreground))] + Plus Jakarta Sans 300 text-sm text-[hsl(var(--muted-foreground))]

    "Flat-Rate Pricing — You see the price before we start. It never changes."
    "NATE-Certified Technicians — The gold standard in HVAC credentials."
    "All Major Brands — Carrier, Trane, Lennox, Goodman, Rheem, Mitsubishi & more."
    "10-Year Workmanship Warranty — Parts and labor, every installation."
    "0% Financing Available — On qualifying new system installations."

  "Meet Our Team" secondary pill button h-11 mt-10
```

### 8. Proceso: tarjetas de 4 pasos con fotos
```
Section: bg-[hsl(var(--muted))] py-24 px-[72px]
Content: max-w-[1200px] mx-auto

Label + H2 (text-center mb-16):
  "HOW IT WORKS" / "From first call to finished job."

Grid: grid grid-cols-4 gap-5

4 step cards — bg-white rounded-2xl overflow-hidden border border-[hsl(var(--border))]:

  Photo: h-36 w-full object-cover object-center overflow-hidden
  Content: p-5
    Step badge + title row: flex items-center gap-3
      Number pill: w-8 h-8 rounded-full bg-[hsl(var(--primary))] text-white Plus Jakarta Sans 700 text-xs flex items-center justify-center shrink-0
      Title: Plus Jakarta Sans 700 text-sm text-[hsl(var(--foreground))]
    Body: Plus Jakarta Sans 300 text-sm text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed

  Step 1 "01":
    [Media brief: image | person filling out a service request on a smartphone, home interior, bright natural light]
    "Request a Quote"
    "Fill out our form or call us — we respond within the hour and schedule around you."

  Step 2 "02":
    [Media brief: image | HVAC technician arriving at front door, tool bag in hand, branded uniform, homeowner welcoming them]
    "Tech Arrives On Time"
    "Your certified tech arrives in a stocked van, ready to handle most jobs on the first visit."

  Step 3 "03":
    [Media brief: image | technician showing a tablet to a homeowner, explaining a diagnosis, both indoors, professional and friendly]
    "Flat-Rate Price"
    "We diagnose the issue, explain your options, and quote a firm price before starting."

  Step 4 "04":
    [Media brief: image | homeowner and HVAC technician shaking hands at doorstep, both smiling, sunny day, satisfied]
    "Done & Guaranteed"
    "Work completed, system tested, walk-through done. 10-year warranty on all installations."
```

### 9. Banner CTA con foto de ancho completo
```
Section: relative h-[320px] overflow-hidden flex items-center

Background — absolute inset-0:
  [Media brief: image | HVAC crew of four technicians in branded uniforms standing in front of a fleet of company vans, confident and professional, outdoor daylight]
  object-cover object-center w-full h-full

Gradient overlay: absolute inset-0
  linear-gradient(to right, rgba(13,17,23,0.78) 0%, rgba(13,17,23,0.5) 55%, rgba(13,17,23,0.1) 100%)

Content: relative z-10 max-w-[1200px] mx-auto px-[72px] w-full
  flex justify-between items-center flex-wrap gap-8

  Left:
    H2: Plus Jakarta Sans 800 text-3xl md:text-4xl letter-spacing-[-0.025em] text-white
      "Ready to get it fixed?"
    Body: Plus Jakarta Sans 300 text-base text-white/70 mt-2
      "Same-day service. Flat-rate pricing. 100% satisfaction guaranteed."

  Right: flex gap-4 flex-wrap
    "Get a Free Quote" — bg-white text-[hsl(var(--primary))] pill button h-12 px-9 font-semibold
    "(800) 559-2648" — bg-transparent border border-white/50 text-white pill button h-12 px-8
      with Phone icon w-4 h-4
```

### 10. Testimonios
```
Section: bg-white py-24 px-[72px]
Content: max-w-[1200px] mx-auto

Label + H2 (text-center mb-14):
  "CUSTOMER REVIEWS" / "Don't take our word for it."
  "★★★★★  4.9 from 1,800+ verified reviews" — Plus Jakarta Sans 600 text-base text-[hsl(var(--primary))] mt-2

Grid: grid grid-cols-3 gap-6

3 testimonial cards — bg-[hsl(var(--muted))] rounded-2xl p-7 border border-[hsl(var(--border))]:
  Stars: "★★★★★" text-[#F59E0B] text-sm mb-4
  Quote: Plus Jakarta Sans 400 text-base text-[hsl(var(--foreground))] leading-[1.7]
  Attribution: flex items-center gap-3 mt-6
    Avatar: w-11 h-11 rounded-full object-cover
      [Media brief: image | friendly homeowner portrait, casual, smiling, warm natural light]
    Name: Plus Jakarta Sans 600 text-sm text-[hsl(var(--foreground))]
    Source: Plus Jakarta Sans 300 text-xs text-[hsl(var(--muted-foreground))] — "Verified Google Review"

  Review 1: "AC broke on a Thursday night in August. Called KLYMA at 10pm, tech was at my house by 8am Friday. Fixed in 90 minutes. Price was exactly what they said on the phone." — Marcus T. · Homeowner

  Review 2: "We manage a portfolio of commercial properties and KLYMA handles all of them. Three years in, zero emergency surprises we weren't warned about in advance." — Dana W. · Facilities Director

  Review 3: "Got four quotes for a new heat pump. KLYMA was the only one who explained the sizing rationale and didn't try to upsell me. Installed clean, on time, exactly what I paid." — James R. · Homeowner
```

### 11. Áreas de servicio
```
Section: bg-[hsl(var(--muted))] py-20 px-[72px]
Content: max-w-[1200px] mx-auto grid grid-cols-2 gap-16 items-center

LEFT:
  Label: "SERVICE AREAS" blue uppercase font-600 text-xs tracking-[0.2em] mb-3
  H2: Plus Jakarta Sans 800 text-2xl letter-spacing-[-0.02em]
    "We cover the metro and surrounding suburbs."
  Body: Plus Jakarta Sans 300 text-base text-[hsl(var(--muted-foreground))] mt-3 leading-relaxed
    "Don't see your area? Call us — our radius is larger than this list."

  Tag cloud: mt-6 flex flex-wrap gap-2
    Each: bg-white border border-[hsl(var(--border))] rounded-full px-4 py-1.5
    Plus Jakarta Sans 400 text-sm text-[hsl(var(--muted-foreground))]
    hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors
    Downtown · Midtown · Westside · North Shore · Oak Park · Riverside · Elmwood · Brookfield · La Grange · Berwyn · Cicero · Norridge · Niles · Skokie · Evanston · Lincolnwood

RIGHT:
  Rounded-2xl overflow-hidden aspect-[4/3]
  [Media brief: image | aerial view of a well-kept suburban neighborhood, tree-lined streets, well-maintained homes, sunny day]
```

### 12. Preguntas frecuentes
```
Section: bg-white py-24 px-[72px]
Content: max-w-3xl mx-auto

Label + H2 (text-center mb-12):
  "FAQ" / "Straight answers."

6 accordion items — AnimatePresence height animation:
  border-b border-[hsl(var(--border))] py-5
  Question row: flex justify-between items-center cursor-pointer gap-4
    Question: Plus Jakarta Sans 600 text-base text-[hsl(var(--foreground))]
    ChevronDown: w-5 h-5 text-[hsl(var(--primary))] transition-transform — rotate-180 when open
  Answer: Plus Jakarta Sans 300 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mt-3

  Q1: "How quickly can you get to me?"
  A1: "For standard service calls, we're usually there within 24 hours. For emergencies, we dispatch immediately — most metro areas within 90 minutes, 24/7 including nights, weekends, and holidays."

  Q2: "Do you give a price before starting?"
  A2: "Always. After diagnosing the issue, we give you a flat-rate price before touching anything. No hourly billing. No surprise charges. The number you approve is the number you pay."

  Q3: "What brands do you work on?"
  A3: "All of them — Carrier, Trane, Lennox, Rheem, Goodman, York, Bryant, American Standard, Daikin, Mitsubishi, and more. For new installations we'll recommend the best brand for your home and budget."

  Q4: "Is your work guaranteed?"
  A4: "Yes. All installations carry a 10-year workmanship warranty covering parts and labor. Repairs carry a 1-year warranty. If something isn't right after we leave, we come back at no charge."

  Q5: "Do you offer financing?"
  A5: "Yes — 0% interest financing plans are available on qualifying new system installations. Ask your technician or mention it when you request your quote."

  Q6: "Do I need to be home during the service?"
  A6: "For a first visit, yes — so we can explain the diagnosis and answer your questions. Repeat clients on scheduled maintenance can arrange key access in advance. Call us to discuss."
```

### 13. Final CTA
```
Section: bg-[hsl(var(--primary))] py-24 px-[72px]
Content: max-w-3xl mx-auto text-center

H2: Plus Jakarta Sans 800 text-[clamp(2.2rem,4vw,4rem)] letter-spacing-[-0.03em] text-white leading-tight
  "Get your home"
  "comfortable again."
Body: Plus Jakarta Sans 300 text-base text-white/70 mt-5 max-w-lg mx-auto leading-relaxed
  "Request a free quote in under 2 minutes. Same-day appointments available. No commitment required."

CTA row: flex flex-col sm:flex-row gap-4 justify-center mt-12
  "Get a Free Quote" — ghost pill button h-12 px-10 (white bg, blue text)
  "(800) 559-2648" — border border-white/40 text-white pill button h-12 px-9 with Phone icon

Trust line: flex justify-center gap-8 flex-wrap mt-8
  Plus Jakarta Sans 300 text-sm text-white/55
  "✓ Flat-rate pricing" · "✓ Same-day availability" · "✓ 10-year warranty"
```

### 14. Pie de página
```
Section: bg-[hsl(var(--foreground))] py-16 px-[72px]
Content: max-w-[1200px] mx-auto

Grid: grid grid-cols-4 gap-12

Col 1 — Brand:
  "KLYMA" Plus Jakarta Sans 800 text-xl text-white letter-spacing-[-0.02em]
  "Climate Control Specialists" Plus Jakarta Sans 300 text-xs text-white/40 tracking-[0.12em] mt-1
  "License #HVAC-2031-IL" same style mt-1
  Phone: Plus Jakarta Sans 600 text-sm text-white mt-5 — "(800) 559-2648"
  "hello@klymaclimate.com" Plus Jakarta Sans 400 text-sm text-white/50

Col 2 — "Services":
  Label: Plus Jakarta Sans 600 text-[0.62rem] tracking-[0.2em] uppercase text-white/30 mb-5
  Links: AC Installation · Heating Installation · Repair & Tune-Up · Air Quality · Emergency Service
  Plus Jakarta Sans 400 text-sm text-white/55 hover:text-white block mb-3

Col 3 — "Company":
  About Us · Our Technicians · Service Areas · Reviews · Careers · Blog

Col 4 — "Hours":
  Label: "HOURS"
  Mon–Fri: 7am – 8pm
  Saturday: 8am – 6pm
  Sunday: Emergency only
  "24/7 Emergency: (800) 559-2648" — text-white/80 mt-2

  Social row: flex gap-5 mt-6
    Facebook · Instagram · Nextdoor — text-white/30 hover:text-white text-sm

Bottom bar: mt-14 pt-6 border-t border-white/10 flex justify-between items-center flex-wrap gap-4
  "© 2026 Klyma Climate Control. All rights reserved." Plus Jakarta Sans 300 text-xs text-white/30
  "Privacy Policy · Terms of Service" — same style hover:text-white/60
```

---

## Resumen de animaciones

| Elemento | Animación | Gatillo |
|---------|-----------|---------|
| Héroe H1 | desvanecimiento, palabras escalonadas 0.08s | en carga |
| Chips de confianza de héroe + CTA | desvanecimiento, retraso 0,5 s | en carga |
| Foto del estadio + tarjetas | desvanecimiento + escala 0,97→1, retardo 0,3s | en carga |
| Contadores de estadísticas | cuenta 0 → objetivo, 1600 ms | IntersecciónObservador |
| Tarjetas de servicio | desvanecimiento escalonado 0.1s | IntersecciónObservador |
| Tarjeta de servicio flotante | traducirY(-4px) + sombra | flotar |
| Acerca de foto + texto | desvanecimiento, escalonado | IntersecciónObservador |
| Tarjetas de paso | desvanecimiento escalonado | IntersecciónObservador |
| Testimonios | desvanecimiento escalonado | IntersecciónObservador |
| Etiquetas de área | cambio de borde/color | flotar |
| Preguntas frecuentes sobre acordeón | altura + opacidad ampliar | haga clic |

---

## Responsive

**Móvil (< 768px):**
- Tira de emergencia: texto centrado, más corto
- Barra de navegación: marca izquierda, hamburguesa derecha → completa superposición
- Héroe: columna única, foto del estadio encima del texto O debajo
- Tarjetas de estadísticas flotantes: ocultas en el móvil
- Fichas de confianza: envolver naturalmente
- Estadísticas: cuadrícula 2×2
- Servicios: columna única
- Acerca de: imagen primero,insignias flotantes ocultas, texto debajo
- Pasos del proceso: una sola columna
- Banner de CTA: diseño apilado
- Testimonios: una sola columna
- Áreas de servicio: envoltura de etiquetas, foto a continuación
- Pie de página: apilado 2×2 y luego single

**Escritorio (≥ 768px):** todo según lo especificado

---

## Todo Copia

**Marca:** KLYMA — Especialistas en control climático · Licencia n.° HVAC-2031-IL
**Banda de emergencia:** "⚡ HVAC de emergencia las 24 horas, los 7 días de la semana: sin cargo adicional por noches o fines de semana · (800) 559-2648"
**Teléfono:** (800) 559-2648 · **Correo electrónico:** hello@klymaclimate.com

**Hero H1:** "Calefacción y refrigeración listas Correcto."
**Sublínea:** "Contratistas de HVAC con licencia para hogares y empresas. Tarifa fija, servicio el mismo día, garantía de 10 años en todas las instalaciones."
**Chips de confianza:** Certificado NATE · Licencia EPA 608 · Clasificación BBB A+

**Estadísticas:** Más de 15 000 sistemas reparados. · 22 años en el negocio · 98% de satisfacción del cliente · Tiempo de respuesta promedio de 90 minutos

**Servicios:** Instalación de aire acondicionado ($2,400+) · Instalación de calefacción ($1,800+) · Reparación de aire acondicionado y calefacción ($89+) · Puesta a punto ($89+) · Calidad del aire ($350+) · Servicio de emergencia ($149+)

**Acerca de:** "Una empresa familiar. No un call center." — Est. 2002, 50 técnicos, solo interno

**Pasos:** Solicite una cotización · La tecnología llega a tiempo · Precio fijo · Listo y garantizado

**CTA final:** "Haga que su hogar vuelva a estar cómodo".

**Horario:** Lunes a viernes de 7 a.m. a 8 p.m. · Sábados de 8 a.m. a 6 p.m. Emergencia: 24/7

---

## Dependencias clave

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.4xx"
}
```

---

*Notas rápidas:*
- *Forma de estadio en foto principal: `border-radius: 200px 200px 160px 160px`: las esquinas superiores son más redondeadas que las inferiores, creando el efecto de pastilla*
- *Las tarjetas de estadísticas flotantes usan `overflow: visible` en la columna principal: asegúrese de que la columna principal tenga suficiente relleno para no recortarlas*
- *La franja de emergencia es intencionalmente delgada y teñido de naranja, no una barra audaz. Debería parecer una notificación, no una alerta*
- *Los chips Trust usan CheckCircle de lucide-react en w-3.5 h-3.5; mantenlos pequeños, no son decorativos.funcional*
- *El banner CTA de foto (sección 9) no tiene un ancho máximo en la imagen en sí; solo el contenido del texto en el interior tiene un ancho máximo restringido*