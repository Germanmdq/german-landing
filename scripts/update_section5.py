import os

# Read the current index.html
with open('/Users/germangonzalez/.gemini/antigravity/scratch/german-landing/index.html', 'r') as f:
    html = f.read()

# Replace the Section 06 / 05 Grid with the expanded, enriched list
old_section_start = '<!-- 06 LO QUE SOSTIENE -->'
if old_section_start not in html:
    old_section_start = '<!-- 05 LO QUE SOSTIENE -->'

# Define the updated Section 05/06 HTML block
new_lo_que_sostiene_block = '''<!-- 06 LO QUE SOSTIENE -->
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
        <p class="text-zinc-400 text-base sm:text-lg font-light">
          Herramientas y acompañamiento continuo para que tu transformación no se escape jamás.
        </p>
      </div>

      <!-- Extended Feature Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Feature 1 -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3 hover:border-[#E8401A]/40 transition-all">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">1</div>
          <h4 class="text-white font-bold text-base">Te acompaño todo el día</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">A la mañana, al mediodía, a la tarde y a la noche te pregunto cómo estás y te guío según cómo llegás.</p>
        </div>

        <!-- Feature 2 -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3 hover:border-[#E8401A]/40 transition-all">
          <div class="w-10 h-10 rounded-xl bg-[#E8401A]/10 text-[#E8401A] flex items-center justify-center font-bold">2</div>
          <h4 class="text-white font-bold text-base">Vos elegís la cadencia</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">Cada 15m, 30m, 1h, 2h o silencio cuando querés tranquilidad. El control es tuyo.</p>
        </div>

        <!-- Feature 3 -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3 hover:border-[#E8401A]/40 transition-all">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">3</div>
          <h4 class="text-white font-bold text-base">Respuestas al instante</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">Miles de situaciones resueltas, cada una con mi respuesta grabada en voz.</p>
        </div>

        <!-- Feature 4 (Updated) -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3 hover:border-[#E8401A]/40 transition-all">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">4</div>
          <h4 class="text-white font-bold text-base">Planes por tema</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">Para trabajar a fondo lo que te pesa, hasta transformarlo. Te acompaño día a día.</p>
        </div>

        <!-- Feature 5 (NUEVO: Registrá lo que querés lograr) -->
        <div class="p-6 rounded-3xl glass-card border border-[#E8401A]/30 space-y-3 hover:border-[#E8401A]/60 transition-all bg-gradient-to-b from-[#E8401A]/10 to-transparent">
          <div class="w-10 h-10 rounded-xl bg-[#E8401A]/20 text-[#E8401A] flex items-center justify-center font-bold">5</div>
          <span class="text-[10px] uppercase font-bold text-[#E8401A] tracking-wider block">¡NUEVO!</span>
          <h4 class="text-white font-bold text-base">Registrá lo que querés lograr y miralo cumplirse</h4>
          <p class="text-xs text-zinc-300 leading-relaxed">Nombrás tu deseo, anotás cada avance y cada señal de que se está armando, y ves tu racha crecer. Es tu vida cambiando, a la vista — la prueba de que está pasando, no una promesa.</p>
        </div>

        <!-- Feature 6 (NUEVO: Recorridos guiados por tema) -->
        <div class="p-6 rounded-3xl glass-card border border-[#E8401A]/30 space-y-3 hover:border-[#E8401A]/60 transition-all bg-gradient-to-b from-[#E8401A]/10 to-transparent">
          <div class="w-10 h-10 rounded-xl bg-[#E8401A]/20 text-[#E8401A] flex items-center justify-center font-bold">6</div>
          <span class="text-[10px] uppercase font-bold text-[#E8401A] tracking-wider block">¡NUEVO!</span>
          <h4 class="text-white font-bold text-base">Recorridos guiados por tema</h4>
          <p class="text-xs text-zinc-300 leading-relaxed">Si querés ir a fondo por tu cuenta, tenés caminos ordenados para recorrer a tu ritmo, cuando quieras.</p>
        </div>

        <!-- Feature 7 -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3 hover:border-[#E8401A]/40 transition-all">
          <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">7</div>
          <h4 class="text-white font-bold text-base">+500 Meditaciones</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">Biblioteca completa con mi voz, organizada por momento del día y situación.</p>
        </div>

        <!-- Feature 8 (Ampliación: Favoritos, notas y recorrido) -->
        <div class="p-6 rounded-3xl glass-card border border-zinc-800 space-y-3 hover:border-[#E8401A]/40 transition-all">
          <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">8</div>
          <h4 class="text-white font-bold text-base">Tus favoritos, tus notas y tu recorrido, guardados</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">Marcás los audios que más te llegan, dejás tus propias notas y marcás lo que ya escuchaste — y volvés a todo cuando quieras. Y queda registrado tu tema, lo que te sirve, lo que dejaste resuelto y lo que estás trabajando ahora.</p>
        </div>

      </div>

      <!-- Buscador de conceptos ampliado block -->
      <div class="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#E8401A]/20 text-[#E8401A] flex items-center justify-center">
            <i data-lucide="search" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="text-white font-bold text-lg">Buscador de conceptos</h4>
            <p class="text-xs text-brand-orange">Búsqueda directa + Selección desde lista organizada</p>
          </div>
        </div>
        <p class="text-sm text-zinc-300 font-light leading-relaxed">
          Buscás cualquier concepto —o lo elegís de la lista— y te lo explico claro, sin vueltas.
        </p>
      </div>

    </div>
  </section>'''

# Replace section in html
pattern = re.compile(r'<!-- (?:05|06) LO QUE SOSTIENE -->.*?</section>', re.DOTALL)
updated_html = pattern.sub(new_lo_que_sostiene_block, html)

with open('/Users/germangonzalez/.gemini/antigravity/scratch/german-landing/index.html', 'w') as f:
    f.write(updated_html)

print("Section 05/06 updated cleanly with all new and expanded points!")
