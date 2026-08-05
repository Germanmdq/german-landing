import base64
import subprocess
import time

# 1. Read original photo
photo_path = '/Users/germangonzalez/.gemini/antigravity/brain/be64703e-dfe0-4456-86ca-6369fa1fd4fe/.user_uploaded/media__1785931562346.jpg'
with open(photo_path, 'rb') as f:
    b64_bytes = base64.b64encode(f.read()).decode('utf-8')
data_uri = f'data:image/jpeg;base64,{b64_bytes}'

# Write local copies
with open('/Users/germangonzalez/.gemini/antigravity/scratch/german-landing/german_portrait.jpg', 'wb') as f:
    with open(photo_path, 'rb') as orig:
        f.write(orig.read())

with open('/Users/germangonzalez/.gemini/antigravity/scratch/german-landing/public/german_portrait.jpg', 'wb') as f:
    with open(photo_path, 'rb') as orig:
        f.write(orig.read())

print("Photo loaded successfully. Length:", len(data_uri))

# HTML output
html_code = f'''<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>German — Controlá tu imaginación. Cambiá tu vida.</title>
  <meta name="description" content="Soy yo, en tu Telegram, todos los días. Te respondo lo que te pasa —con mi voz— y te acompaño hasta que lo resuelvas. Preventa exclusiva USD 30 / $30.000 ARS.">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          colors: {{
            brand: {{
              orange: '#E8401A',
              'orange-glow': '#FF5733',
              dark: '#09090B',
              surface: '#121216',
              border: '#27272A',
              gold: '#F59E0B'
            }}
          }},
          fontFamily: {{
            serif: ['"Instrument Serif"', 'Georgia', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
          }}
        }}
      }}
    }}
  </script>

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    body {{
      background-color: #09090B;
      color: #F4F4F5;
    }}
    .glass-card {{
      background: rgba(18, 18, 22, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }}
    .orange-gradient-text {{
      background: linear-gradient(135deg, #FF6B4A 0%, #E8401A 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}
    @keyframes wave {{
      0% {{ height: 20%; }}
      100% {{ height: 100%; }}
    }}
    .animate-sound-wave {{
      animation: wave 0.8s ease-in-out infinite alternate;
    }}
  </style>
</head>
<body class="bg-[#09090B] text-zinc-100 antialiased selection:bg-[#E8401A] selection:text-white font-sans overflow-x-hidden">

  <!-- NAVBAR -->
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-[#09090B]/85 border-b border-zinc-800/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#" class="flex items-center gap-3">
        <span class="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">German</span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Telegram En Vivo
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="#el-problema" class="hover:text-white transition-colors">01. El Problema</a>
        <a href="#soy-yo" class="hover:text-white transition-colors">02. Soy Yo</a>
        <a href="#como-respondo" class="hover:text-white transition-colors">03. Mi Voz</a>
        <a href="#buscadores" class="hover:text-white transition-colors text-amber-400 font-semibold">04. Buscador Semántico</a>
        <a href="#neville" class="hover:text-white transition-colors">05. Biblioteca Neville</a>
        <a href="#lo-que-sostiene" class="hover:text-white transition-colors">06. Herramientas</a>
        <a href="#faq" class="hover:text-white transition-colors">FAQ</a>
      </nav>

      <a href="#precio" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E8401A] hover:bg-[#FF5733] text-white font-medium text-sm transition-all shadow-lg shadow-brand-orange/20">
        <i data-lucide="message-circle" class="w-4 h-4"></i>
        <span>Preventa USD 30 / $30.000 ARS</span>
      </a>
    </div>
  </header>

  <!-- HERO SECTION WITH AMBIENT AUDIO WAVES -->
  <section class="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden bg-[#09090B]">
    
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none -z-10 flex items-center justify-center">
      <div class="absolute w-[300px] h-[300px] rounded-full border border-[#E8401A]/20 animate-ping opacity-30" style="animation-duration: 4s;"></div>
      <div class="absolute w-[500px] h-[500px] rounded-full border border-[#E8401A]/15 animate-ping opacity-20" style="animation-duration: 6s;"></div>
      <div class="absolute w-[700px] h-[700px] rounded-full border border-[#E8401A]/10 animate-ping opacity-10" style="animation-duration: 8s;"></div>
      <div class="w-[600px] h-[600px] bg-[#E8401A]/15 rounded-full blur-[140px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Hero Text -->
        <div class="lg:col-span-7 space-y-8 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-[#E8401A]/40 text-xs sm:text-sm text-zinc-300">
            <span class="flex h-2 w-2 rounded-full bg-[#E8401A] animate-ping"></span>
            <span class="font-semibold text-[#E8401A]">Preventa Exclusiva</span>
            <span class="text-zinc-500">•</span>
            <span class="text-white font-bold">USD 30 / $30.000 ARS (Pago Único)</span>
          </div>

          <h1 class="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.08]">
            Controlá tu imaginación.<br>
            <span class="orange-gradient-text italic font-serif mt-1 inline-block">Cambiá tu vida.</span>
          </h1>

          <p class="text-lg sm:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
            <strong class="font-semibold text-white">Soy yo, en tu Telegram, todos los días.</strong> Te respondo lo que te pasa —con mi voz— y te acompaño hasta que lo resuelvas.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a href="#precio" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#E8401A] hover:bg-[#FF5733] text-white font-semibold text-lg transition-all shadow-xl shadow-brand-orange/25">
              <span>Reservá tu lugar en la preventa</span>
              <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </a>

            <div class="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
              <i data-lucide="shield-check" class="w-5 h-5 text-emerald-400"></i>
              <span>USD 30 / $30.000 ARS • Acceso de por vida</span>
            </div>
          </div>

          <div class="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
            <div>
              <div class="text-2xl sm:text-3xl font-bold text-white font-serif">+500</div>
              <div class="text-xs sm:text-sm text-zinc-400">Meditaciones guiadas</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl font-bold text-white font-serif">100%</div>
              <div class="text-xs sm:text-sm text-zinc-400">Mi voz directa</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl font-bold text-white font-serif">24/7</div>
              <div class="text-xs sm:text-sm text-zinc-400">En tu Telegram</div>
            </div>
          </div>
        </div>

        <!-- AUTHENTIC TELEGRAM MOCKUP INTERFACE WITH GERMAN'S EMBEDDED REAL PHOTO -->
        <div class="lg:col-span-5 relative">
          <div class="relative mx-auto max-w-[360px] sm:max-w-[390px] shadow-2xl">
            <div class="absolute -inset-4 bg-gradient-to-r from-[#E8401A]/30 via-amber-500/20 to-[#E8401A]/30 rounded-[50px] blur-2xl opacity-70 animate-pulse pointer-events-none"></div>

            <div class="relative rounded-[44px] p-3.5 bg-zinc-950 border-2 border-zinc-800 shadow-2xl overflow-hidden backdrop-blur-2xl">
              
              <div class="w-28 h-4 bg-zinc-900 rounded-full mx-auto mb-2 flex items-center justify-center gap-2">
                <div class="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div class="w-10 h-1.5 rounded-full bg-zinc-800"></div>
              </div>

              <!-- Telegram App Window -->
              <div class="rounded-[30px] overflow-hidden bg-[#0e1621] border border-zinc-800/80 font-sans">
                
                <!-- Telegram Top Bar -->
                <div class="bg-[#17212b] px-3 py-2.5 flex items-center justify-between border-b border-zinc-800/60 text-white">
                  <div class="flex items-center gap-2.5">
                    <i data-lucide="arrow-left" class="w-4 h-4 text-zinc-400"></i>
                    <div class="relative">
                      <img src="{data_uri}" alt="Germán" class="w-9 h-9 rounded-full object-cover border border-[#E8401A]">
                      <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#17212b] rounded-full"></span>
                    </div>
                    <div class="leading-none">
                      <h4 class="text-sm font-semibold text-white">Germán</h4>
                      <span class="text-[11px] text-[#40a7e3] font-medium">en línea</span>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 text-zinc-300">
                    <i data-lucide="phone" class="w-4 h-4"></i>
                    <i data-lucide="search" class="w-4 h-4"></i>
                    <i data-lucide="more-vertical" class="w-4 h-4"></i>
                  </div>
                </div>

                <!-- Chat Body -->
                <div class="p-3 space-y-3 bg-[#0e1621] min-h-[360px] flex flex-col justify-end text-xs">
                  
                  <div class="self-center bg-[#17212b] text-zinc-400 text-[10px] px-3 py-1 rounded-full font-medium">
                    HOY
                  </div>

                  <!-- Outgoing User Bubble (#2b5278) -->
                  <div class="self-end max-w-[85%] bg-[#2b5278] text-white rounded-2xl rounded-tr-xs p-3 shadow-md">
                    <p class="text-zinc-100 leading-snug">"Germán, me desperté con miedo por la entrevista de trabajo de hoy..."</p>
                    <div class="flex items-center justify-end gap-1 mt-1 text-[10px] text-zinc-300 font-mono">
                      <span>08:14</span>
                      <span class="text-[#40a7e3]">✓✓</span>
                    </div>
                  </div>

                  <!-- Incoming German Voice Note (#182533) -->
                  <div class="self-start max-w-[92%] bg-[#182533] text-white rounded-2xl rounded-tl-xs p-3 shadow-md border border-[#E8401A]/30 space-y-2">
                    <div class="flex items-center justify-between text-[11px] text-[#40a7e3] font-semibold">
                      <span class="flex items-center gap-1"><i data-lucide="mic" class="w-3.5 h-3.5 text-[#E8401A]"></i> Mensaje de voz</span>
                      <span class="text-[10px] text-zinc-400 font-mono">02:45</span>
                    </div>

                    <div class="flex items-center gap-3 bg-[#0e1621]/60 p-2.5 rounded-xl border border-zinc-800">
                      <button onclick="toggleAudio()" class="w-10 h-10 rounded-full bg-[#E8401A] text-white flex items-center justify-center shrink-0">
                        <i data-lucide="play" class="w-5 h-5 ml-0.5 fill-white"></i>
                      </button>
                      <div class="flex-1 space-y-1">
                        <div class="flex items-center gap-0.5 h-6" id="audio-wave">
                          <div class="flex-1 rounded-full bg-[#E8401A] h-[35%]"></div>
                          <div class="flex-1 rounded-full bg-[#E8401A] h-[65%]"></div>
                          <div class="flex-1 rounded-full bg-[#E8401A] h-[40%]"></div>
                          <div class="flex-1 rounded-full bg-[#E8401A] h-[95%]"></div>
                          <div class="flex-1 rounded-full bg-[#E8401A] h-[75%]"></div>
                          <div class="flex-1 rounded-full bg-[#E8401A] h-[100%]"></div>
                          <div class="flex-1 rounded-full bg-zinc-600 h-[50%]"></div>
                          <div class="flex-1 rounded-full bg-zinc-600 h-[85%]"></div>
                          <div class="flex-1 rounded-full bg-zinc-600 h-[40%]"></div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center justify-between text-[10px] text-zinc-400 pt-0.5">
                      <span class="text-amber-400 font-medium">✨ Práctica de hoy (4 min)</span>
                      <span>08:15</span>
                    </div>
                  </div>

                </div>

                <!-- Telegram Input Bar -->
                <div class="bg-[#17212b] px-3 py-2 flex items-center gap-2 border-t border-zinc-800/80">
                  <i data-lucide="smile" class="w-5 h-5 text-zinc-400"></i>
                  <input type="text" readonly placeholder="Escribe un mensaje..." class="w-full bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none">
                  <i data-lucide="paperclip" class="w-5 h-5 text-zinc-400"></i>
                  <div class="w-8 h-8 rounded-full bg-[#E8401A] flex items-center justify-center">
                    <i data-lucide="mic" class="w-4 h-4 text-white"></i>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- 01 EL PROBLEMA -->
  <section id="el-problema" class="py-24 bg-[#0D0D11] border-y border-zinc-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl space-y-4">
        <div class="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#E8401A] uppercase">
          <span>01</span><span>/</span><span>El Problema</span>
        </div>
        <h2 class="font-serif text-4xl sm:text-5xl font-normal text-white">
          No es que tengas un mal día. <span class="italic text-zinc-400">Es que vivís reaccionando al afuera.</span>
        </h2>
      </div>

      <div class="mt-8 p-8 rounded-3xl glass-card border border-zinc-800 space-y-6">
        <p class="text-xl sm:text-2xl text-zinc-200 font-light leading-relaxed">
          "No es que tengas un mal día. Es que vivís reaccionando a lo que pasa afuera: algo sale mal y te caés, llega una noticia y te desarmás, dudás y ya está. Y aunque a veces logres estar mejor, <strong class="text-white font-semibold">no lo podés sostener</strong> — al toque la vida te vuelve a sacar de eje. El problema no es un momento: es una forma de vivir. Y para cambiarla no alcanza con leer teoría. Necesitás a alguien que te acompañe cuando de verdad lo necesitás."
        </p>
      </div>
    </div>
  </section>

  <!-- 02 SOY YO (GERMAN'S REAL PHOTO EMBEDDED) -->
  <section id="soy-yo" class="py-24 bg-[#09090B]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div class="lg:col-span-5">
          <div class="rounded-3xl bg-zinc-900 border-2 border-[#E8401A]/50 p-3 overflow-hidden shadow-2xl">
            <img src="{data_uri}" alt="Germán" class="w-full h-[450px] object-cover rounded-2xl">
          </div>
        </div>

        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#E8401A] uppercase">
            <span>02</span><span>/</span><span>Soy Yo</span>
          </div>
          <h2 class="font-serif text-4xl sm:text-5xl font-normal text-white">
            Estoy en tu Telegram, todo el día.<br>
            <span class="orange-gradient-text italic font-serif">No es un curso. Soy yo, con mi voz.</span>
          </h2>

          <p class="text-lg text-zinc-300 font-light leading-relaxed">
            Estoy en tu Telegram, todo el día. No es un curso grabado ni un programa que contesta cualquier cosa: soy yo, con mi voz, acompañándote a cambiar tu forma de vivir y a sostenerla. Sé qué estás trabajando, sé tu horario, y me acuerdo de tu recorrido. Estoy para que practiques — no para que estudies.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- 03 CÓMO TE RESPONDO -->
  <section id="como-respondo" class="py-24 bg-[#0D0D11] border-b border-zinc-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <div class="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#E8401A] uppercase">
          <span>03</span><span>/</span><span>Cómo te respondo</span>
        </div>
        <h2 class="font-serif text-4xl sm:text-5xl font-normal text-white">
          Reconozco tu situación exacta.<br>
          <span class="orange-gradient-text italic font-serif">Respuestas pensadas para vos con mi voz.</span>
        </h2>
        <p class="text-zinc-400 text-base sm:text-lg font-light">
          Me contás lo que estás viviendo, con tus palabras. No importa cómo lo digas: reconozco tu situación puntual, no una parecida, y te respondo con algo pensado para eso. Si lo tuyo es con tu pareja, te hablo de tu pareja. Si es con tu familia, te hablo de tu familia. Nunca una respuesta genérica. Y todo con mi voz. Vos decidís si querés escuchar en audio o leer en texto.
        </p>
      </div>

      <!-- Telegram Window Container -->
      <div class="mt-12 max-w-3xl mx-auto rounded-[28px] overflow-hidden bg-[#0e1621] border border-zinc-800 shadow-2xl font-sans">
        
        <!-- Header -->
        <div class="bg-[#17212b] px-4 py-3 flex items-center justify-between border-b border-zinc-800/80 text-white">
          <div class="flex items-center gap-3">
            <i data-lucide="arrow-left" class="w-4 h-4 text-zinc-400"></i>
            <img src="{data_uri}" alt="Germán" class="w-10 h-10 rounded-full object-cover border border-[#E8401A]">
            <div>
              <h4 class="text-sm font-semibold text-white">Germán</h4>
              <p class="text-xs text-[#40a7e3] font-medium">en línea en Telegram</p>
            </div>
          </div>
          <div class="flex items-center gap-3 text-zinc-400">
            <i data-lucide="phone" class="w-4 h-4"></i>
            <i data-lucide="search" class="w-4 h-4"></i>
            <i data-lucide="more-vertical" class="w-4 h-4"></i>
          </div>
        </div>

        <!-- Body -->
        <div class="p-4 sm:p-6 space-y-4 bg-[#0e1621] text-xs">
          <div class="self-center bg-[#17212b] text-zinc-400 text-[10px] px-3 py-1 rounded-full font-medium mx-auto text-center w-fit">
            TELEGRAM CHAT REAL
          </div>

          <!-- User -->
          <div class="ml-auto max-w-[80%] bg-[#2b5278] text-white rounded-2xl rounded-tr-xs p-3.5 shadow-md">
            <p class="text-zinc-100 text-sm font-light">"Germán, me siento distanciado de mi pareja y me agarró el miedo..."</p>
            <div class="text-right text-[10px] text-zinc-300 font-mono mt-1">10:23 AM <span class="text-[#40a7e3]">✓✓</span></div>
          </div>

          <!-- German Voice Note -->
          <div class="mr-auto max-w-[85%] bg-[#182533] text-white rounded-2xl rounded-tl-xs p-4 shadow-md border border-[#E8401A]/30 space-y-3">
            <div class="flex items-center justify-between text-xs text-[#40a7e3] font-semibold">
              <span class="flex items-center gap-1.5"><i data-lucide="mic" class="w-4 h-4 text-[#E8401A]"></i> Mensaje de voz de Germán</span>
              <span class="text-zinc-400 font-mono text-xs">03:12</span>
            </div>

            <div class="flex items-center gap-3 bg-[#0e1621] p-3 rounded-xl border border-zinc-800">
              <div class="w-10 h-10 rounded-full bg-[#E8401A] text-white flex items-center justify-center shrink-0">
                <i data-lucide="play" class="w-5 h-5 ml-0.5 fill-white"></i>
              </div>
              <div class="flex-1 space-y-1">
                <div class="flex items-center gap-1 h-6">
                  <div class="flex-1 rounded-full bg-[#E8401A] h-[40%]"></div>
                  <div class="flex-1 rounded-full bg-[#E8401A] h-[80%]"></div>
                  <div class="flex-1 rounded-full bg-[#E8401A] h-[60%]"></div>
                  <div class="flex-1 rounded-full bg-[#E8401A] h-[100%]"></div>
                  <div class="flex-1 rounded-full bg-[#E8401A] h-[50%]"></div>
                  <div class="flex-1 rounded-full bg-zinc-600 h-[70%]"></div>
                  <div class="flex-1 rounded-full bg-zinc-600 h-[40%]"></div>
                </div>
              </div>
            </div>

            <div class="text-[10px] text-zinc-400 text-right font-mono">10:24 AM</div>
          </div>
        </div>

        <!-- Input Bar -->
        <div class="bg-[#17212b] px-4 py-3 flex items-center gap-3 border-t border-zinc-800/80">
          <i data-lucide="smile" class="w-5 h-5 text-zinc-400"></i>
          <input type="text" readonly placeholder="Escribe un mensaje a Germán..." class="w-full bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none">
          <i data-lucide="paperclip" class="w-5 h-5 text-zinc-400"></i>
          <div class="w-8 h-8 rounded-full bg-[#E8401A] flex items-center justify-center">
            <i data-lucide="mic" class="w-4 h-4 text-white"></i>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- 04 MEGA FEATURE SHOWCASE: BUSCADOR SEMÁNTICO & LOS 3 BUSCADORES INTELIGENTES -->
  <section id="buscadores" class="py-24 bg-[#09090B] border-b border-zinc-800/80 relative overflow-hidden">
    
    <!-- Background Glow -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8401A]/10 rounded-full blur-[160px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Section Tag & Title -->
      <div class="max-w-3xl space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8401A]/20 text-[#E8401A] text-xs font-bold uppercase tracking-wider border border-[#E8401A]/40">
          <i data-lucide="sparkles" class="w-4 h-4"></i>
          El Plus Exclusivo Destacado
        </div>
        <h2 class="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Buscador Semántico & Inteligencia en la Biblioteca.<br>
          <span class="orange-gradient-text italic font-serif">Encontrá exactamente lo que tu alma busca.</span>
        </h2>
      </div>

      <!-- Feature Card 1: BUSCADOR SEMÁNTICO (HERO CARD) -->
      <div class="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-2 border-[#E8401A]/60 shadow-2xl space-y-8 relative overflow-hidden">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div class="space-y-4 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#E8401A]/20 text-[#E8401A] text-xs font-mono font-bold">
              <i data-lucide="cpu" class="w-4 h-4"></i>
              BÚSQUEDA SEMÁNTICA POR SENTIDO
            </div>
            <h3 class="font-serif text-3xl sm:text-5xl text-white">Búsqueda Semántica en toda la biblioteca</h3>
            <p class="text-zinc-300 text-base sm:text-xl font-light leading-relaxed">
              No necesitás recordar la palabra exacta. Escribís cualquier situación, duda o sentimiento con tus palabras (ej: <em class="text-amber-300">"¿Qué hago si me da miedo perder a alguien?"</em>) y la tecnología semántica encuentra exactamente dónde está tratado ese tema en los libros, las conferencias y los textos de la conciencia.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-4 shrink-0 lg:w-96 shadow-xl">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#E8401A]/20 text-[#E8401A] flex items-center justify-center">
                <i data-lucide="search" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-white font-bold text-sm">Demo de Búsqueda Semántica</h5>
                <span class="text-[10px] text-zinc-400 font-mono">Búsqueda en 100% de los libros y charlas</span>
              </div>
            </div>
            
            <div class="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono italic">
              "Buscando por sentido: Apego y Miedo a la Pérdida..."
            </div>
            
            <div class="p-3 rounded-xl bg-[#E8401A]/10 border border-[#E8401A]/30 text-xs text-brand-orange space-y-1">
              <span class="font-bold block">✓ Resultado encontrado:</span>
              <span class="text-zinc-200 block italic text-[11px]">«Capítulo sobre el Desapego: Cómo retornar al sentir de completitud propia.» (Vol. 4)</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Feature Card 2 & 3: BUSCADOR DE CONCEPTOS DETALLADOS & FRASES EXACTAS -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Buscador de Conceptos Explicados Detalladamente -->
        <div class="p-8 sm:p-10 rounded-3xl glass-card border border-zinc-800 space-y-6 hover:border-[#E8401A]/50 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <i data-lucide="list-checks" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="text-xs font-mono text-amber-400 font-bold uppercase">Búsqueda Directa + Selección por Lista</span>
            <h3 class="font-serif text-3xl text-white mt-1">Buscador de Conceptos Explicados Detalladamente</h3>
          </div>
          <p class="text-zinc-300 text-base font-light leading-relaxed">
            Buscás cualquier concepto —<strong class="text-white">o lo elegís directamente de la lista organizada</strong>— y te lo explico claro, sin vueltas ni tecnicismos confusos. Entendés qué significa "El Espejo", "La Asunción", "El Estado", y cómo aplicarlo en tu vida hoy.
          </p>
          <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-medium">
            ✔ Lista de conceptos ordenada + Búsqueda instantánea con explicaciones al grano.
          </div>
        </div>

        <!-- Buscador de Frases Exactas -->
        <div class="p-8 sm:p-10 rounded-3xl glass-card border border-zinc-800 space-y-6 hover:border-[#E8401A]/50 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <i data-lucide="quote" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="text-xs font-mono text-indigo-400 font-bold uppercase">Ubicación Exacta de Citas</span>
            <h3 class="font-serif text-3xl text-white mt-1">Buscador de Frases Exactas</h3>
          </div>
          <p class="text-zinc-300 text-base font-light leading-relaxed">
            ¿Escuchaste una frase y no sabés de dónde es? Escribís las palabras que te acordás y la herramienta te dice exactamente en qué conferencia, libro o texto específico fue dicha.
          </p>
          <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium">
            ✔ Localizá cualquier cita de memoria en segundos con su referencia original.
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- 05 LAS ENSEÑANZAS DE NEVILLE GODDARD (ACCESO COMPLETO PREMIUM) -->
  <section id="neville" class="py-24 bg-[#0D0D11] border-b border-zinc-800/80 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Section Header -->
      <div class="max-w-4xl space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8401A]/20 text-[#E8401A] text-xs font-bold uppercase tracking-wider border border-[#E8401A]/40">
          Acceso Completo · Premium
        </div>
        <h2 class="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Las enseñanzas de Neville Goddard:<br>
          <span class="orange-gradient-text italic font-serif">puestas en práctica, no solo leídas.</span>
        </h2>
      </div>

      <!-- Neville Goddard Pillars Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Pillar 1: Pregúntale a toda la biblioteca -->
        <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-5 hover:border-[#E8401A]/50 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-[#E8401A]/20 text-[#E8401A] flex items-center justify-center">
            <i data-lucide="book-open" class="w-6 h-6"></i>
          </div>
          <h3 class="font-serif text-2xl text-white">Pregúntale a toda la biblioteca</h3>
          <p class="text-sm text-zinc-300 font-light leading-relaxed">
            Formula tu pregunta a todas las conferencias y libros a la vez, y la IA realizará referencias cruzadas en todo el archivo de Neville, revelando conexiones que nunca encontrarías leyendo una fuente a la vez.
          </p>
          
          <ul class="space-y-2.5 text-xs text-zinc-300 pt-3 border-t border-zinc-800/80">
            <li class="flex items-center gap-2">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
              <span>Referencia cruzada de toda la biblioteca</span>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
              <span>Conexiones ocultas reveladas</span>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
              <span>Todos los libros + todas las conferencias</span>
            </li>
          </ul>
        </div>

        <!-- Pillar 2: Respuestas, luego acción -->
        <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-5 hover:border-[#E8401A]/50 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <i data-lucide="zap" class="w-6 h-6"></i>
          </div>
          <h3 class="font-serif text-2xl text-white">Respuestas, luego acción</h3>
          <p class="text-sm text-zinc-300 font-light leading-relaxed">
            Haz cualquier pregunta y obtén una respuesta basada en fuentes fiables; luego, el asesor te ofrecerá un siguiente paso útil: guarda un deseo, empieza una práctica, configura un recordatorio, abre una clase.
          </p>
          <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-medium mt-4">
            ✔ Pasos prácticos sugeridos en cada respuesta.
          </div>
        </div>

        <!-- Pillar 3: Recuerda y se registra -->
        <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-5 hover:border-[#E8401A]/50 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <i data-lucide="clock" class="w-6 h-6"></i>
          </div>
          <h3 class="font-serif text-2xl text-white">Recuerda y se registra</h3>
          <p class="text-sm text-zinc-300 font-light leading-relaxed">
            Recuerda tus preferencias y, si lo deseas, se conecta diariamente a la hora que hayas elegido —teniendo en cuenta las horas de silencio— para que sigas viviendo en el estado en que tu deseo se ha cumplido.
          </p>
          <div class="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium mt-4">
            ✔ Acompañamiento diario a tu hora con horas de silencio.
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- 06 LO QUE SOSTIENE EL CAMBIO & TODAS LAS HERRAMIENTAS -->
  <section id="lo-que-sostiene" class="py-24 bg-[#09090B] border-b border-zinc-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <div class="max-w-3xl space-y-4">
        <div class="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#E8401A] uppercase">
          <span>06</span><span>/</span><span>Lo que sostiene el cambio</span>
        </div>
        <h2 class="font-serif text-4xl sm:text-5xl font-normal text-white">
          Sostener el estado es todo.<br>
          <span class="orange-gradient-text italic font-serif">Lo que te acompaña cada día.</span>
        </h2>
      </div>

      <!-- Feature Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- Tool 1: Te acompaño todo el día -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">1</div>
          <h4 class="text-white font-bold text-base">Te acompaño todo el día</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">A la mañana, al mediodía, a la tarde y a la noche te pregunto cómo estás y te guío según cómo llegás.</p>
        </div>

        <!-- Tool 2: Vos elegís la cadencia -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-[#E8401A]/10 text-[#E8401A] flex items-center justify-center font-bold">2</div>
          <h4 class="text-white font-bold text-base">Vos elegís la cadencia</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">Cada 15m, 30m, 1h, 2h o silencio cuando querés tranquilidad. El control es tuyo.</p>
        </div>

        <!-- Tool 3: Respuestas al instante -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">3</div>
          <h4 class="text-white font-bold text-base">Respuestas al instante</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">Miles de situaciones resueltas, cada una con mi respuesta grabada en voz.</p>
        </div>

        <!-- Tool 4: Planes por tema (AMPLIADO) -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">4</div>
          <h4 class="text-white font-bold text-base">Planes por tema</h4>
          <p class="text-xs text-zinc-300 leading-relaxed font-light">Para trabajar a fondo lo que te pesa, hasta transformarlo. <strong class="text-white">Te acompaño día a día.</strong></p>
        </div>

        <!-- Tool 5: Registrá lo que querés lograr (NUEVO DESTACADO) -->
        <div class="p-6 rounded-3xl bg-gradient-to-b from-[#E8401A]/20 to-zinc-950 border-2 border-[#E8401A]/50 space-y-3 shadow-xl">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-xl bg-[#E8401A] text-white flex items-center justify-center font-bold">5</div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8401A] text-white">¡NUEVO!</span>
          </div>
          <h4 class="text-white font-bold text-base">Registrá lo que querés lograr y miralo cumplirse</h4>
          <p class="text-xs text-zinc-200 leading-relaxed">Nombrás tu deseo, anotás cada avance y cada señal de que se está armando, y ves tu racha crecer. Es tu vida cambiando, a la vista — la prueba de que está pasando, no una promesa.</p>
        </div>

        <!-- Tool 6: Recorridos guiados por tema (NUEVO DESTACADO) -->
        <div class="p-6 rounded-3xl bg-gradient-to-b from-[#E8401A]/20 to-zinc-950 border-2 border-[#E8401A]/50 space-y-3 shadow-xl">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-xl bg-[#E8401A] text-white flex items-center justify-center font-bold">6</div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8401A] text-white">¡NUEVO!</span>
          </div>
          <h4 class="text-white font-bold text-base">Recorridos guiados por tema</h4>
          <p class="text-xs text-zinc-200 leading-relaxed">Si querés ir a fondo por tu cuenta, tenés caminos ordenados para recorrer a tu ritmo, cuando quieras.</p>
        </div>

        <!-- Tool 7: +500 Meditaciones -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">7</div>
          <h4 class="text-white font-bold text-base">+500 Meditaciones</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">Biblioteca completa con mi voz, organizada por momento del día y situación.</p>
        </div>

        <!-- Tool 8: Tus favoritos, tus notas y tu recorrido (AMPLIADO) -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">8</div>
          <h4 class="text-white font-bold text-base">Tus favoritos, tus notas y tu recorrido, guardados</h4>
          <p class="text-xs text-zinc-300 leading-relaxed font-light">Marcás los audios que más te llegan, dejás tus propias notas y marcás lo que ya escuchaste — y volvés a todo cuando quieras. Y queda registrado tu tema, lo que te sirve, lo que dejaste resuelto y lo que estás trabajando ahora.</p>
        </div>

        <!-- Tool 9: Buscador de conceptos (AMPLIADO) -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">9</div>
          <h4 class="text-white font-bold text-base">Buscador de conceptos</h4>
          <p class="text-xs text-zinc-300 leading-relaxed font-light">Buscás cualquier concepto —o lo elegís de la lista— y te lo explico claro, sin vueltas.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- PRECIO (PREVENTA EXCLUSIVA: USD 30 / $30.000 ARS) -->
  <section id="precio" class="py-24 bg-[#09090B] relative overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
      
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8401A]/20 text-[#E8401A] text-xs font-bold uppercase tracking-wider border border-[#E8401A]/40">
        Preventa Exclusiva
      </div>

      <h2 class="font-serif text-5xl sm:text-7xl font-normal text-white">
        Un solo pago. <span class="orange-gradient-text italic font-serif">USD 30 / $30.000 ARS</span>
      </h2>
      
      <p class="text-xl sm:text-2xl text-zinc-200 font-light max-w-2xl mx-auto">
        Acceso de por vida. Sin suscripción, sin renovaciones, sin letra chica. Lo comprás una vez y es tuyo para siempre.
      </p>

      <div class="pt-4">
        <a href="#precio" onclick="alert('¡Preventa activada por USD 30 / $30.000 ARS! Redirigiendo a pasarela de pago...')" class="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#E8401A] hover:bg-[#FF5733] text-white font-bold text-xl shadow-2xl shadow-brand-orange/30 hover:scale-105 transition-all">
          <span>Reservar en preventa por USD 30 / $30.000 ARS</span>
          <i data-lucide="arrow-right" class="w-6 h-6"></i>
        </a>
      </div>

      <div class="flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono">
        <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
        <span>Pago 100% Seguro • MercadoPago / Tarjetas • Acceso Inmediato</span>
      </div>

    </div>
  </section>

  <!-- FOOTER -->
  <footer class="py-12 bg-[#060608] border-t border-zinc-800 text-center text-xs text-zinc-500">
    <p>German © 2026. Controlá tu imaginación. Cambiá tu vida.</p>
  </footer>

  <script>
    lucide.createIcons();
    function toggleAudio() {{
      const container = document.getElementById('audio-wave');
      container.classList.toggle('animate-pulse');
    }}
  </script>
</body>
</html>
'''

with open('/Users/germangonzalez/.gemini/antigravity/scratch/german-landing/index.html', 'w') as f:
    f.write(html_code)

print("Landing page successfully updated with high importance showcases, USD 30 / $30.000 ARS prices, and embedded photo Base64!")
