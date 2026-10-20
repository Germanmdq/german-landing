# The Vault Escape Rooms: mensaje del sitio web de Escape Room

## Objetivo
Cree un sitio web de escape room oscuro y atmosférico con un componente de temporizador de cuenta regresiva en vivo, detalles en verde azulado y dorado envejecido, tipo de pantalla Bebas Neue y una cuadrícula de reserva de habitaciones con estados de disponibilidad codificados por colores.

## Tech Stack
React + Vite + TypeScript + Tailwind CSS + Framer Motion (movimiento/reacción) + shadcn/ui + lucide-react

## Sistema de diseño

### Colores
```css
:root {
  --background: 20 15% 7%;
  --foreground: 37 38% 88%;
  --primary: 170 68% 50%;
  --primary-foreground: 20 15% 7%;
  --accent: 40 48% 62%;
  --muted-foreground: 20 10% 58%;
  --border: 20 10% 20%;
  /* Raw hex reference */
  /* near-black: #100e0c */
  /* electric-teal: #2ad4b4 */
  /* aged-gold: #c9a55a */
  /* dark-charcoal: #1a1816 */
}
```

### Tipografía
Importación de fuentes de Google: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;1,400&family=Inter:wght@400&display=swap`
- Display / titulares: Bebas Neue 400
- Cuerpo atmosférico: Cormorant Garamond 300 italic
- Citas de extracción de atmósfera: Cormorant Garamond 400 italic
- Etiquetas UI / texto pequeño: Inter 400

## Efectos visuales

1. **Texto de fondo "VAULT"** — Bebas Neue en clamp(260px,38vw,560px), color: #2ad4b4 (verde azulado eléctrico), opacidad: 0,025, posición: absoluta, derecha: -3 %, abajo: 10 %, índice z: 0, eventos de puntero: ninguno, ubicado en la parte inferior derecha de hero
2. **Temporizador de cuenta regresiva en vivo**: useEffect + setInterval, cuenta regresiva hasta un tiempo codificado de 47 minutos y 23 segundos desde el montaje, Bebas Neue a 80 px en verde azulado eléctrico, se actualiza cada segundo, formateado [MM:SS], agrega urgencia a la ranura disponible
3. **Estados de color del calendario de reservas**: tres estados de celda: verde azulado = disponible, dorado = últimos 2 lugares, oscuro silenciado = completamente reservado; coloque el cursor sobre las celdas disponibles: verde azulado más oscuro con transición de superposición de texto "Libro →"
4. **Tarjeta de habitación con brillo verde azulado al pasar el mouse** — mientras pasa el mouse: escala 1.02, sombra de cuadro: 0 8px 40px rgba(42,212,180,0.22), salida fácil de 0.25s

## Desglose de componentes

### 1. Navbar
```tsx
// Sticky, bg: rgba(16,14,12,0.96), backdrop-filter: blur(12px), border-bottom: 1px solid rgba(42,212,180,0.12), height: 64px
// Left: "The Vault" — Bebas Neue, 20px, letter-spacing: 0.06em, color: #e8d4b0
// Thin teal dot: width 6px, height 6px, bg: #2ad4b4, border-radius 50%, margin-left 8px, display inline-block
// Center: Our Rooms / Book Now / Team Building / Gift Cards — Inter 400, 13px, color: #9a8a7a, letter-spacing 0.02em
// Right: "Book Now" — bg: #2ad4b4, color: #100e0c, Inter 400, 14px, font-weight 600, px-5 py-2.5, border-radius: 4px
// Hover: bg: #22b89e, 0.2s
// Framer Motion: y -64→0, opacity 0→1, 0.5s ease-out
```

### 2. Hero
```tsx
// Full-viewport, min-height: 100vh, position: relative, overflow: hidden, bg: #100e0c

{/* Image: Dramatic atmospheric escape room photography — a heavy Victorian bank vault door shown ajar with a sliver of mysterious warm golden light spilling through the gap into a dark room, fog or smoke effect visible in the foreground, old brass hinges and locking mechanisms visible, dramatic chiaroscuro lighting with deep shadows, cinematic and suspenseful mood */}
<img src="" alt="Victorian vault door ajar with mysterious golden light in escape room" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />

// Gradient overlay — composition independent (top AND bottom, not left-right — content is centered at bottom):
// background: linear-gradient(to bottom, rgba(16,14,12,0.72) 0%, transparent 35%, transparent 60%, rgba(16,14,12,0.92) 100%)
// position: absolute; inset: 0; z-index: 1

// Background text "VAULT" — bottom right:
// Bebas Neue, clamp(260px,38vw,560px), color: #2ad4b4, opacity: 0.025
// position: absolute, right: -3%, bottom: 10%, z-index: 0, pointer-events: none

// Content block — position absolute, bottom 0, left 0, right 0, padding-bottom 8vh, z-index 10
// text-align: center, padding: 0 clamp(24px,6vw,96px)

// Kicker: Inter 400, 12px, letter-spacing 0.16em, uppercase, color: #2ad4b4, margin-bottom 16px
// "EDINBURGH OLD TOWN · RATED #1 ON TRIPADVISOR"

// Main headline: "CAN YOU ESCAPE?"
// Bebas Neue, clamp(72px,11vw,170px), line-height: 0.9, color: #e8d4b0, letter-spacing: 0.02em
// Framer Motion: opacity 0→1, y 40→0, 0.7s ease-out, delay: 0.1s

// Sub: Cormorant Garamond 300 italic, 19px, color: #9a8a7a, margin-top 16px, max-width 560px, margin-x auto, line-height 1.65
// "Four immersive escape rooms in Edinburgh's Old Town. 60-90 minutes. 2-6 players. Rated #1 escape room in Edinburgh on TripAdvisor."
// Framer Motion: opacity 0→1, y 20→0, 0.6s, delay 0.3s

// CTAs (flex row, gap 12px, justify-center, margin-top 28px):
// "Book Your Room" — bg: #2ad4b4, color: #100e0c, Inter 400, 15px, font-weight 600, px-8 py-4, border-radius: 4px
// "View Rooms" — bg: transparent, border: 1px solid rgba(201,165,90,0.5), color: #c9a55a, Inter 400, 15px, px-8 py-4, border-radius: 4px
// Framer Motion: opacity 0→1, y 20→0, 0.6s, delay 0.5s

// COUNTDOWN TIMER COMPONENT — margin-top 40px:
// Container: bg: rgba(26,24,22,0.8), border: 1px solid rgba(42,212,180,0.2), border-radius: 8px, padding: 20px 32px, display inline-flex flex-col align-center
// Countdown logic (TypeScript):
// interface TimeLeft { minutes: number; seconds: number; }
// const [timeLeft, setTimeLeft] = useState<TimeLeft>({ minutes: 47, seconds: 23 });
// useEffect(() => {
//   const timer = setInterval(() => {
//     setTimeLeft(prev => {
//       if (prev.seconds > 0) {
//         return { ...prev, seconds: prev.seconds - 1 };
//       } else if (prev.minutes > 0) {
//         return { minutes: prev.minutes - 1, seconds: 59 };
//       }
//       return prev;
//     });
//   }, 1000);
//   return () => clearInterval(timer);
// }, []);
// const formatted = `${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;

// Label above: Cormorant Garamond 300 italic, 15px, #9a8a7a, letter-spacing 0.04em: "NEXT SLOT IN"
// Timer display: Bebas Neue, 80px, color: #2ad4b4, line-height 1: {formatted}
// Framer Motion: each digit change triggers a subtle scale pulse: scale 1.08→1, 0.1s — ONLY on the digit that changed
// Context below: Inter 400, 13px, #6a5a4a: "Tuesday at 7:30pm · 2 spots remaining"
// Teal dot pulsing: width 8px height 8px bg #2ad4b4, border-radius 50%, Framer Motion animate scale [1, 1.5, 1], duration 1.5s repeat Infinity, ease "easeInOut" — next to the context text
```

### 3. Tarjetas de habitación: 2 × 2 Grid
```tsx
// Section bg: #100e0c, padding: 80px clamp(24px,6vw,96px)
// Headline: Bebas Neue, clamp(36px,5.5vw,84px), #e8d4b0, letter-spacing 0.02em, margin-bottom 8px: "CHOOSE YOUR ROOM"
// Sub: Cormorant Garamond 300 italic, 17px, #9a8a7a, margin-bottom 48px: "Four rooms. Four stories. One way out."

// 2×2 grid, gap 24px

// Each card: position relative, overflow hidden, border-radius: 8px, cursor pointer
// Hover: Framer Motion scale 1.02, box-shadow: 0 8px 40px rgba(42,212,180,0.22), 0.25s ease-out

// Photo (aspect 4:3 cover):
// Bottom gradient overlay: linear-gradient(to top, rgba(16,14,12,0.94) 0%, rgba(16,14,12,0.4) 50%, transparent 100%)

// Card content (absolute bottom 0, padding 24px, z-index 10):
// Difficulty badge: bg rgba(42,212,180,0.15), border 1px solid rgba(42,212,180,0.4), Inter 400, 11px, #2ad4b4, px-2 py-1, border-radius 3px
// Stars: "★★★★" or "★★★★★" — teal for filled, #3a3030 for empty
// Bebas Neue, 28px, #e8d4b0, letter-spacing 0.04em, margin-top 8px: room name
// Cormorant Garamond 300 italic, 14px, #9a8a7a, margin-top 4px: tagline
// Inter 400, 12px, #6a5a4a, margin-top 8px: "90min · 2-6 players · 23% escape rate" (varies per room)
// Gold "Book This Room →" link: Cormorant Garamond 400 italic, 14px, #c9a55a, margin-top 12px

// Room 1 — The Vault:
{/* Image: Dark atmospheric photography inside a 1920s bank vault recreation — combination lock dials, safety deposit boxes lining the walls, dramatic single overhead light, dust particles visible in the light beam, mystery and tension, cinematic art direction */}
<img src="" alt="The Vault escape room interior with bank vault atmosphere" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />
// Difficulty: "★★★★ HARD" / "THE VAULT" / "1921. Crack the vault before the alarm trips."
// "90min · 2-6 players · 23% escape rate"

// Room 2 — The Study:
{/* Image: Victorian detective's study recreation — bookshelves floor to ceiling with leather-bound volumes, antique writing desk with scattered papers and a magnifying glass, oil lamp light, heavy velvet curtains, theatrical period atmosphere */}
<img src="" alt="The Study Victorian detective escape room interior" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />
// "★★★ MEDIUM" / "THE STUDY" / "Victorian detective's study. Find the killer first."
// "75min · 2-6 players · 51% escape rate"

// Room 3 — Isolation:
{/* Image: Space station isolation chamber escape room — white and brushed metal interior, control panels with warning lights, emergency oxygen indicator displays, cold clinical lighting, future-retro aesthetic */}
<img src="" alt="Isolation space station escape room interior" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />
// "★★ EASY" / "ISOLATION" / "Space station. Oxygen running out. Work fast."
// "60min · 2-4 players · 67% escape rate"

// Room 4 — The Heist:
{/* Image: Art gallery heist gone wrong — paintings partially removed from walls, security lasers (teal lines) visible in dust, alarm panel with red warning light, sophisticated gallery setting turned crime scene */}
<img src="" alt="The Heist art gallery escape room with security lasers" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />
// "★★★★★ EXPERT" / "THE HEIST" / "Art gallery heist. Gone very wrong."
// "90min · 2-6 players · 38% escape rate"

// Framer Motion: cards whileInView opacity 0→1, y 24→0, stagger 0.12s on scroll
```

### 4. Calendario de reservas
```tsx
// Section bg: #1a1816 (dark charcoal), padding: 80px clamp(24px,6vw,96px)
// Headline: Bebas Neue, clamp(32px,4.5vw,72px), #e8d4b0: "BOOK YOUR SLOT"
// Sub: Cormorant Garamond 300 italic, 16px, #9a8a7a, margin-bottom 48px: "Select a room and time — instant confirmation by email."

// Colour legend (flex row, gap 24px, margin-bottom 24px):
// Teal square + Inter 400 13px #e8d4b0 "Available"
// Gold square + "Last 2 spots"
// Dark muted square + "Fully Booked"

// Calendar: 5 rows (times) × 4 columns (rooms), plus header row
// Header: Inter 400, 13px, #9a8a7a, letter-spacing 0.06em, uppercase
// Time / The Vault / The Study / Isolation / The Heist

// Time slots × room availability:
// 2:00pm: Vault=Available / Study=Available / Isolation=Last2 / Heist=Available
// 4:00pm: Vault=Booked / Study=Available / Isolation=Available / Heist=Last2
// 6:00pm: Vault=Available / Study=Last2 / Isolation=Available / Heist=Available
// 8:00pm: Vault=Available / Study=Available / Isolation=Booked / Heist=Available

// Available cell: bg #1e2e2c, border 1px solid rgba(42,212,180,0.3), border-radius 4px, Inter 400 13px #2ad4b4, text "Available", padding 12px, cursor pointer
// Hover: bg #2ad4b4, color #100e0c, Inter 600 → text changes to "Book →", transition 0.15s

// Last 2 cell: bg rgba(201,165,90,0.1), border 1px solid rgba(201,165,90,0.4), Inter 400 13px #c9a55a, text "Last 2 spots"
// Hover: bg #c9a55a, color #100e0c → "Book →", transition 0.15s

// Booked cell: bg #1a1816, border 1px solid #2a2420, Inter 400 13px #4a3a2a, text "Fully Booked", cursor not-allowed

// Below grid: Inter 400, 13px, #6a5a4a: "All bookings receive immediate email confirmation. Need a specific date? Call us."
// Teal link: "+44 (0)131 000 0000"
```

### 5. Precios
```tsx
// Section bg: #100e0c, padding: 64px clamp(24px,6vw,96px)
// Headline: Bebas Neue, clamp(28px,4vw,60px), #e8d4b0: "PRICING"

// 4 pricing rows, each: flex justify-between, border-bottom 1px solid #2a2420, padding 16px 0
// Cormorant Garamond 300 italic, 17px, #e8d4b0 — tier name
// Inter 400, 14px, #9a8a7a — small note
// Bebas Neue, 28px, #2ad4b4 — price

// Weekday: "Weekday (Mon–Thu)" / "Best value slots" / "£18pp"
// Weekend: "Weekend (Fri–Sun)" / "Peak times" / "£22pp"
// Group: "Group of 6" / "Full room" / "£16pp"
// Gift: "Gift Cards" / "Any amount, any room" / "from £18"

// Note: Cormorant Garamond 300 italic, 14px, #6a5a4a: "Minimum 2 players. Private hire available for groups of 6. Instant digital gift cards."
```

### 6. Perfecto For
```tsx
// Section bg: #1a1816, padding: 64px clamp(24px,6vw,96px)
// Headline: Bebas Neue, clamp(28px,4vw,56px), #e8d4b0: "PERFECT FOR"

// 4 cards, 2×2 grid, gap 16px

// Each card: bg #221e1c, border 1px solid #2a2420, border-radius 6px, padding 24px
// Hover: border-color #c9a55a, 0.2s

// Gold Lucide icon (Heart / Users / Baby / Briefcase), 22px, margin-bottom 12px
// Bebas Neue, 20px, #e8d4b0: card title
// Cormorant Garamond 300 italic, 14px, #9a8a7a, margin-top 8px, line-height 1.6: description

// Card 1: Heart icon / "DATE NIGHT" / "2 players. Low pressure. High stakes. We recommend The Study for first-timers."
// Card 2: Users icon / "FRIENDS GROUP" / "3-5 players. The Vault and The Heist are built for argument and glory in equal measure."
// Card 3: Baby icon / "FAMILY" / "4-6 players. Isolation is our most accessible room. Ages 10+ recommended."
// Card 4: Briefcase icon / "TEAM BUILDING" / "6+ players. Private hire with a dedicated Games Master and optional bar package."
```

### 7. Team Building
```tsx
// Section bg: #100e0c, padding: 80px clamp(24px,6vw,96px)
// 2-column layout (50/50 on desktop)

// Left: content
// Small label: Inter 400, 11px, letter-spacing 0.14em, uppercase, color: #c9a55a, margin-bottom 16px: "CORPORATE & TEAM EVENTS"
// Headline: Bebas Neue, clamp(28px,4.5vw,68px), #e8d4b0: "BOOK THE WHOLE ROOM."
// Body: Cormorant Garamond 300 italic, 17px, #9a8a7a, margin-top 16px, line-height 1.75
// "Private hire available for corporate teams, team days, and company events. Dedicated Games Master, full debrief session, and post-game drinks package available at the Royal Mile bar."
// Second para: "From £14pp (minimum 6 players). Typically 2–3 hours total."
// Gold link: Cormorant Garamond 400 italic, 15px, #c9a55a, margin-top 24px: "Enquire About Team Booking →"

// Right: full-bleed team activity photography
{/* Image: Office team celebrating together in an escape room setting — diverse group of 6 people in a mix of professional and casual clothing, arms around each other, big smiles, post-escape celebration energy, warm dramatic lighting of the escape room visible behind them */}
<img src="" alt="Corporate team celebrating after escape room team building session" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
```

### 8. Reseñas
```tsx
// Section bg: #1a1816, padding: 64px clamp(24px,6vw,96px)
// Headline: Bebas Neue, clamp(26px,3.5vw,56px), #e8d4b0, margin-bottom 48px: "WHAT ADVENTURERS SAY"

// 3 review cards, flex row, gap 24px

// Each card: bg: #221e1c, border 1px solid #2a2420, border-radius 6px, padding 28px
// Stars: "★★★★★" gold (#c9a55a), Inter 400, 16px, margin-bottom 16px
// Quote: Cormorant Garamond 400 italic, 17px, #e8d4b0, line-height 1.65
// Attribution: Inter 400, 13px, #6a5a4a, margin-top 16px

// Review 1: "The Vault genuinely got my heart racing. The 23% escape rate is very real. We didn't make it — but we'll be back." — Tom & Sarah
// Review 2: "Took our whole team for a work day. Best team building we've ever done. The debrief is surprisingly insightful." — Charlotte P., Marketing Director
// Review 3: "Second time doing The Study and still didn't escape. Third time next month." — @edinburghescapes

// Framer Motion: cards whileInView opacity 0→1, y 20→0, stagger 0.15s
```

### 9. Estadísticas Tira
```tsx
// Full-width, bg: #1a1816, border-top 1px solid rgba(42,212,180,0.12), border-bottom 1px solid rgba(42,212,180,0.12)
// padding: 40px clamp(24px,6vw,96px)
// flex flex-wrap justify-around gap-x-16 gap-y-8

// 4 stats, each: flex-col align-center text-align center
// Value: Bebas Neue, 60px, #2ad4b4, line-height 1
// Label: Cormorant Garamond 300 italic, 14px, #9a8a7a, margin-top 4px

// Stat 1: "12,000+" / "Adventurers"
// Stat 2: "4 Rooms" / "Each unique"
// Stat 3: "1" / "Games Master"
// Stat 4: "TripAdvisor #1" / "Edinburgh Escape Rooms"
```

### 10. Verde azulado CTA
```tsx
// Section bg: #2ad4b4, padding: 80px clamp(24px,6vw,96px), text-align center
// Bebas Neue, clamp(40px,6vw,100px), #100e0c, letter-spacing 0.02em: "THINK YOU CAN ESCAPE?"
// Cormorant Garamond 300 italic, 18px, rgba(16,14,12,0.72), margin-top 16px, max-width 540px, margin-x auto
// "Over 12,000 adventurers have tried. Fewer than half have escaped."
// Button: bg #100e0c, color #e8d4b0, Inter 400, 15px, font-weight 600, px-10 py-5, border-radius 4px, margin-top 36px
// "Book Your Room"
// Hover: bg #c9a55a, color #100e0c, 0.2s
// Small Inter 400, 13px, rgba(16,14,12,0.6), margin-top 12px: "3 slots available today · Instant booking confirmation"
```

### 11.Pie de página
```tsx
// bg: #100e0c, border-top: 1px solid #1e1c1a, padding: 48px clamp(24px,6vw,96px) 32px
// 4 columns: Brand / Rooms / Plan Your Visit / Contact
// "THE VAULT" Bebas Neue 18px #e8d4b0 + teal dot + Cormorant 300 italic 13px #6a5a4a "Edinburgh Old Town"
// Rooms: Cormorant 300 italic, 14px, #7a6a5a — The Vault / The Study / Isolation / The Heist
// Plan: Inter 400, 14px, #7a6a5a — Book Now / Gift Cards / Team Building / FAQs
// Contact: Inter 400, 14px, #7a6a5a — address / phone / email / TripAdvisor link
// Copyright: "© 2025 The Vault Escape Rooms. Edinburgh." Cormorant 300 italic, 12px, #4a3a2a
```

## Animaciones

| Elemento | Animación | Duración | Retraso | Flexibilización |
|---|---|---|---|---|
| Barra de navegación | y: -64→0, opacidad 0→1 | 0,5 s | 0s | salida fácil |
| Titular de héroe | opacidad 0→1, y 40→0 | 0,7s | 0,1 s | salida fácil |
| Sub héroe | opacidad 0→1, y 20→0 | 0,6 s | 0,3 s | salida fácil |
| CTA de héroe | opacidad 0→1, y 20→0 | 0,6 s | 0,5 s | salida fácil |
| Temporizador de cuenta regresiva | setInterval 1000 ms, escala de pulso de dígitos 1,08 → 1 a 0,1 s | continuo | en el monte | liberación por dígito |
| Pulso de punto verde azulado | escala [1, 1.5, 1], 1.5s, Infinito, facilidadInOut | 1,5 s | 0s | facilidadInOut |
| Tarjetas de habitación | whileInView opacidad 0→1, y 24→0, escalonamiento 0,12s | 0,6 s | desplazarse | salida fácil |
| Tarjeta de habitación flotante | escala 1.02, sombra brillante verde azulado | 0,25 s | 0s | salida fácil |
| Desplazamiento de la celda del calendario | bg relleno verde azulado/oro, cambio de texto "Libro →" | 0,15s | 0s | salida fácil |
| Tarjetas de revisión | whileInView opacidad 0→1, y 20→0, escalonamiento 0.15s | 0,6 s | desplazarse | salida fácil |
| Sección CTA | whileInView opacidad 0→1 | 0,6 s | desplazarse | facilidad de salida |

## Responsive

- **Móvil (<768px)**: contenido principal apilado en el centro, cuenta regresiva más pequeña (Bebas 56px), cuadrícula de habitaciones de 1 columna, calendario de reservas que se desplaza horizontalmente o muestra 2 habitaciones a la vez, perfecto para cuadrícula de 1 columna, reseñas de 1 columna
- **Tableta (768–1024px)**: Cuadrícula de habitación 2×2, el calendario puede desplazarse, reseñas 2+1
- **Escritorio**: Diseño completo como se describe

## Copia completa

**Marca**: The Vault Escape Rooms

**Navbar**: The Vault / Nuestras habitaciones / Reservar ahora / Team Building / Regalo Tarjetas

**Héroe**:
- Kicker: "EL CASCO ANTIGUO DE EDIMBURGO · CLASIFICADO #1 EN TRIPADVISOR"
- Titular: "¿PUEDES ESCAPAR?" 
- Sub: "Cuatro salas de escape inmersivas en el casco antiguo de Edimburgo. 60-90 minutos. 2-6 Jugadores clasificados como sala de escape número 1 en Edimburgo en TripAdvisor."
- CTA 1: "Reserve su habitación"
- CTA 2: "Ver habitaciones"
- Etiqueta de cuenta regresiva: "PRÓXIMO ESPACIO EN"
- Contexto de cuenta regresiva: "Martes a las 7:30 p. m. · 2 lugares. restantes"

**Habitaciones**:
- The Vault:★★★★ DIFÍCIL / 90 min / 2-6 jugadores / 23 % de tasa de escape / "1921. Rompe la bóveda antes de que suene la alarma". 
- El estudio: ★★★ MEDIANO / 75 min / 2-6 jugadores / 51 % de tasa de escape / "Estudio del detective victoriano. Encuentra al asesino primero."
- Aislamiento: ★★ FÁCIL / 60 min / 2-4 jugadores / 67 % de tasa de escape / "La estación espacial se está acabando. Trabaja rápido". 
- El atraco: ★★★★★ EXPERTO / 90 min / 2-6 jugadores / 38 % de tasa de escape / "Atraco a una galería de arte. Salió muy mal. £18

**Perfecto para**:
- Cita nocturna: "2 jugadores. Baja presión. Mucho en juego. Recomendamos The Study para principiantes". 
- Grupo de amigos: "3-5 jugadores. The Vault y The Heist están diseñados para la discusión y la gloria en igual medida".
- Familia: "4-6 jugadores. El aislamiento es nuestro Se recomienda la habitación más accesible para mayores de 10 años."
- Team Building: "Alquiler privado para más de 6 jugadores con un Games Master dedicado y paquete de bar opcional". 

**Team Building**: "Alquiler privado disponible para equipos corporativos, días de equipo y eventos de empresa, sesión informativa completa y paquete de bebidas después del juego disponible en el bar Royal Mile". / "Desde £14 por persona (mínimo 6 jugadores). Normalmente, entre 2 y 3 horas en total." / "Pregunte sobre la reserva del equipo →"

**Reseñas**:
- "La Bóveda realmente hizo que mi corazón se acelerara. La tasa de escape del 23 % es muy real. No lo logramos, pero volveremos". — Tom y Sarah
- "Llevamos a todo nuestro equipo a pasar un día de trabajo. La mejor formación de equipos que hemos hecho jamás. El informe es sorprendentemente revelador". — Charlotte P., directora de marketing
- "Segunda vez que hago The Study y todavía no escapé. La tercera vez el mes que viene". — @edinburghescapes

**Estadísticas**: más de 12 000 aventureros / 4 habitaciones / 1 maestro de juegos / TripAdvisor #1 Edinburgh Escape Rooms

**CTA**: "¿CRÉS QUE PUEDES ESCAPAR?" / "Más de 12.000 aventureros lo han intentado. Menos de la mitad han escapado." / "Reserve su habitación" / "3 espacios disponibles hoy · Confirmación de reserva instantánea"

**Contacto**: Casco antiguo de Edimburgo / +44 (0)131 000 0000 /hello@thevaultescape.co.uk

## Dependencias clave
```json
{
  "dependencies": {
    "react": "^18",
    "framer-motion": "^11",
    "lucide-react": "latest",
    "@shadcn/ui": "latest",
    "tailwindcss": "^3"
  }
}
```