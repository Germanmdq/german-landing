const movements=[
 {icon:'🛒',name:'Jumbo',meta:'Supermercado · hoy',cat:'Comida',amount:'$84.320',src:'Ticket escaneado'},
 {icon:'⛽',name:'YPF',meta:'Nafta · ayer',cat:'Transporte',amount:'$46.800',src:'Visa'},
 {icon:'⚡',name:'EDEA',meta:'Luz · 24 sep',cat:'Servicios',amount:'$61.240',src:'Factura PDF'},
 {icon:'▶',name:'Netflix',meta:'Streaming · 23 sep',cat:'Suscripciones',amount:'$15.499',src:'Débito automático'},
 {icon:'📱',name:'Personal',meta:'Telefonía · 22 sep',cat:'Servicios',amount:'$32.850',src:'Email'},
 {icon:'🍝',name:'La Trattoria',meta:'Cena · 21 sep',cat:'Comida',amount:'$58.700',src:'Mastercard'},
 {icon:'🔥',name:'Camuzzi',meta:'Gas · 20 sep',cat:'Servicios',amount:'$28.930',src:'Factura PDF'},
 {icon:'🎬',name:'Cinemacenter',meta:'Cine · 19 sep',cat:'Comida',amount:'$27.500',src:'Visa'},
 {icon:'🏫',name:'Colegio San José',meta:'Cuota escolar · 15 sep',cat:'Educación',amount:'$185.000',src:'Transferencia'},
 {icon:'🛡',name:'Sancor Seguros',meta:'Seguro auto · 12 sep',cat:'Servicios',amount:'$92.400',src:'Débito automático'},
 {icon:'📺',name:'Flow',meta:'Cable & internet · 10 sep',cat:'Suscripciones',amount:'$44.120',src:'Email'},
 {icon:'💊',name:'Farmacity',meta:'Farmacia · 8 sep',cat:'Salud',amount:'$36.760',src:'Ticket QR'}
];
const render=(items,target)=>{document.getElementById(target).innerHTML=items.map(m=>`<div class="movement"><div class="mov-icon">${m.icon}</div><div class="grow"><b>${m.name}</b><small>${m.meta}</small></div><div class="amount"><b>${m.amount}</b><small>${m.src}</small></div></div>`).join('')};
render(movements.slice(0,4),'recentList');render(movements,'allMovements');
function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0)}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter==='Todos'?movements:movements.filter(m=>m.cat===b.dataset.filter),'allMovements')});
const result=document.getElementById('captureResult');
document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{
 const type=b.dataset.action;
 const copies={scan:['Escaneando comprobante…','Detecté un ticket de YPF por $46.800. Fecha: 25/09/2026. Categoría sugerida: Nafta.'],pdf:['Analizando PDF…','Resumen Visa leído: 74 consumos, 6 suscripciones, 12 cuotas y vencimiento 03/10 detectados.'],mail:['Conectando bandeja…','Encontré 9 facturas nuevas: luz, gas, telefonía, internet, seguro y colegio.'],manual:['Nuevo gasto manual','Importe · fecha · comercio · categoría · medio de pago · notas']};
 result.classList.remove('hidden');result.innerHTML=`<small>${copies[type][0]}</small><div class="scan-line"></div><b>${copies[type][1]}</b><p style="font-size:11px;opacity:.75">Todo queda editable antes de incorporarlo a tus estadísticas.</p>`;
});
const chat=document.getElementById('chat');
function answer(q){q=q.toLowerCase();if(q.includes('octubre')||q.includes('pagar'))return 'Para octubre ya tengo detectados $1.124.760 en compromisos. Los principales son Visa Santander ($684.320), colegio ($185.000), servicios estimados ($161.140) y suscripciones ($94.300).';if(q.includes('suscrip'))return 'Tenés 12 suscripciones activas por $94.300 mensuales. Streaming y cable representan $59.619. Flow y dos servicios digitales aumentaron este trimestre.';if(q.includes('año')||q.includes('más'))return 'En los últimos 12 meses gastaste $18.426.800. Hogar y servicios fue la categoría principal ($4,26 M), seguida por supermercado ($3,62 M) y comidas/salidas ($3,01 M).';return 'Septiembre lleva $1.842.350: 8,4% menos que agosto. Bajaron salidas y supermercado, pero servicios subieron 18% en los últimos tres meses.'}
function ask(q){if(!q)return;chat.innerHTML+=`<div class="bubble user">${q}</div>`;setTimeout(()=>{chat.innerHTML+=`<div class="bubble ai">${answer(q)}</div>`;chat.scrollTop=chat.scrollHeight},250)}
document.querySelectorAll('.prompt-chips button').forEach(b=>b.onclick=()=>ask(b.textContent));document.getElementById('chatForm').onsubmit=e=>{e.preventDefault();const i=document.getElementById('chatInput');ask(i.value);i.value=''};
