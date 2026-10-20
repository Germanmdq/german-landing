import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const data = JSON.parse(await fs.readFile(path.join(ROOT,'src','templates.json'),'utf8'));
const out = path.join(ROOT,'public','previews-es');
await fs.mkdir(out,{recursive:true});

const palettes = {
  'Viajes & Turismo':['#0b1320','#f3efe6','#4da3ff'],
  'Gastronomía':['#18120f','#f6efe6','#d45d3c'],
  'Salud & Bienestar':['#0f1c1a','#f3f6f2','#5bb8a8'],
  'Belleza & Moda':['#181315','#f7f0ec','#c4879a'],
  'Fitness & Deportes':['#0b0d0f','#f6f7f2','#b7ff4a'],
  'Tecnología & SaaS':['#0a0d16','#f3f5fb','#7b8cff'],
  'Inmuebles & Hogar':['#131310','#f4f0e8','#b89b6b'],
  'Creativos & Entretenimiento':['#090909','#f2eee8','#ff6958'],
  'Servicios & Negocios':['#101214','#f5f4ef','#ffb347']
};

function escapeHtml(s=''){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function sectorLines(item){
 const t=item.titulo.toLowerCase();
 if(/gimnasio|trainer|entrenador|crossfit|boxeo|running|tenis|surf|natación|deportivo/.test(t)) return ['Entrenamientos que se sienten distintos.','Clases, horarios y planes claros.','Reservá tu primera sesión'];
 if(/viaje|hotel|turismo|aeropuerto|vacacional|surf/.test(t)) return ['Tu próximo viaje empieza acá.','Experiencias, fechas y destinos en una sola vista.','Quiero viajar'];
 if(/restaurante|cafetería|panadería|pizzería|chef|catering|bar|cervecería|heladería/.test(t)) return ['Una experiencia que empieza antes de llegar.','Carta, reservas y propuesta de valor sin vueltas.','Reservar mesa'];
 if(/inmobili|arquitect|interior|construct|paisaj|propiedad/.test(t)) return ['Espacios que cuentan una historia.','Proyectos, servicios y consultas en una experiencia premium.','Ver proyectos'];
 if(/salud|clínica|odont|psico|terapia|fisi|nutri|spa|masaje|farmacia|acupunt|quiro/.test(t)) return ['Confianza desde el primer segundo.','Servicios, profesionales y reservas con claridad.','Pedir turno'];
 if(/peluquer|belleza|novias|skincare|joyer|perfume|ropa|estética|maquillaje|uñas/.test(t)) return ['Una marca que se ve tan bien como trabaja.','Servicios, agenda y portfolio con estética premium.','Reservar cita'];
 if(/saas|agencia|app|portfolio|desarrollador|diseñador|seo|it/.test(t)) return ['Convertí atención en acción.','Producto, prueba social y CTA con foco comercial.','Ver demo'];
 return ['Tu negocio merece verse mejor.','Una landing clara, moderna y lista para vender.','Quiero esta web'];
}
function tagsFor(item){return item.tags.slice(0,3).map(t=>`<span>${escapeHtml(t)}</span>`).join('')}
function templateHTML(item){
 const [bg,paper,accent]=palettes[item.categoria]||palettes['Servicios & Negocios'];
 const [headline,sub,cta]=sectorLines(item);
 const variant=item.id%4;
 const hero = variant===0
 ? `<section class="hero split"><div><div class="kicker">${escapeHtml(item.categoria)}</div><h1>${escapeHtml(headline)}</h1><p>${escapeHtml(sub)}</p><button>${escapeHtml(cta)}</button></div><div class="visual"><div class="orb"></div><div class="mini"><b>+32%</b><span>más consultas</span></div></div></section>`
 : variant===1
 ? `<section class="hero center"><div class="kicker">${escapeHtml(item.categoria)}</div><h1>${escapeHtml(headline)}</h1><p>${escapeHtml(sub)}</p><button>${escapeHtml(cta)}</button><div class="wideVisual"><div class="line"></div><div class="glass">${escapeHtml(item.titulo)}</div></div></section>`
 : variant===2
 ? `<section class="hero editorial"><div class="num">0${item.id%9+1}</div><div><div class="kicker">${escapeHtml(item.categoria)}</div><h1>${escapeHtml(headline)}</h1><p>${escapeHtml(sub)}</p></div><div class="portrait"><div class="shape"></div></div></section>`
 : `<section class="hero stacked"><div class="kicker">${escapeHtml(item.categoria)}</div><h1>${escapeHtml(headline)}</h1><div class="stackRow"><p>${escapeHtml(sub)}</p><button>${escapeHtml(cta)}</button></div><div class="tiles"><div></div><div></div><div></div></div></section>`;
 return `<!doctype html><html><head><meta charset="utf-8"><style>
 *{box-sizing:border-box}body{margin:0;background:${paper};font-family:Arial,Helvetica,sans-serif;color:${bg};width:1200px;min-height:1600px;overflow:hidden}.page{padding:32px 42px 60px}.nav{height:72px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${bg}22}.brand{font-weight:800;letter-spacing:-.04em;font-size:24px}.nav small{font-size:12px;letter-spacing:.08em;text-transform:uppercase}.nav .pill{background:${bg};color:${paper};padding:12px 18px;border-radius:999px}.hero{min-height:680px;padding:80px 0;position:relative}.kicker{font-size:14px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:28px}.hero h1{font-size:86px;line-height:.95;letter-spacing:-.06em;margin:0;max-width:920px}.hero p{font-size:22px;line-height:1.45;max-width:610px;color:${bg}aa}.hero button{border:0;background:${accent};color:${paper};font-weight:700;padding:18px 26px;border-radius:999px;font-size:17px}.split{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}.visual{height:500px;background:${bg};border-radius:30px;position:relative;overflow:hidden}.orb{position:absolute;width:330px;height:330px;border-radius:50%;background:radial-gradient(circle at 30% 30%,${accent},${paper}55 50%,transparent 70%);top:70px;left:85px}.mini{position:absolute;right:28px;bottom:28px;background:${paper};padding:22px 24px;border-radius:20px;display:flex;flex-direction:column}.mini b{font-size:36px}.center{text-align:center}.center h1,.center p{margin-left:auto;margin-right:auto}.wideVisual{margin-top:52px;height:350px;background:${bg};border-radius:28px;position:relative;overflow:hidden}.wideVisual .line{position:absolute;width:140%;height:2px;background:${accent};top:54%;left:-20%;transform:rotate(-8deg)}.glass{position:absolute;left:44px;bottom:36px;color:${paper};font-size:54px;font-weight:800;letter-spacing:-.05em}.editorial{display:grid;grid-template-columns:120px 1fr 360px;gap:28px;align-items:center}.num{font-size:88px;opacity:.18}.portrait{height:520px;background:${bg};border-radius:180px 180px 20px 20px;position:relative;overflow:hidden}.shape{position:absolute;inset:55px;background:${accent};border-radius:45% 55% 60% 40%}.stacked h1{max-width:1000px}.stackRow{display:flex;justify-content:space-between;align-items:end;gap:30px}.tiles{display:grid;grid-template-columns:1.3fr .9fr .8fr;gap:18px;margin-top:46px;height:320px}.tiles div{background:${bg};border-radius:24px}.tiles div:nth-child(2){background:${accent}}.tiles div:nth-child(3){background:${bg}22}.section{padding:70px 0;border-top:1px solid ${bg}22}.section h2{font-size:48px;letter-spacing:-.04em;margin:0 0 28px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{min-height:220px;border:1px solid ${bg}20;border-radius:22px;padding:26px;background:${paper}}.card b{display:block;font-size:26px;margin-bottom:18px}.card p{font-size:17px;line-height:1.5;color:${bg}aa}.tags{display:flex;gap:10px;flex-wrap:wrap}.tags span{font-size:12px;text-transform:uppercase;letter-spacing:.08em;border:1px solid ${bg}33;padding:8px 10px;border-radius:999px}.ctaBand{margin-top:70px;background:${bg};color:${paper};border-radius:28px;padding:44px;display:flex;justify-content:space-between;align-items:center}.ctaBand strong{font-size:40px;max-width:650px;line-height:1.05}.ctaBand span{background:${accent};padding:15px 20px;border-radius:999px;font-weight:700}
 </style></head><body><div class="page"><nav class="nav"><div class="brand">${escapeHtml(item.titulo)}</div><small>Inicio · Servicios · Casos · Contacto</small><div class="pill">Consultar</div></nav>${hero}<section class="section"><h2>Todo lo que tu cliente necesita ver</h2><div class="cards"><div class="card"><b>Propuesta clara</b><p>Explicamos qué hacés, para quién y por qué elegirte, sin llenar la página de ruido.</p></div><div class="card"><b>Diseño pensado para vender</b><p>Jerarquía visual, llamados a la acción y secciones que acompañan la decisión.</p></div><div class="card"><b>Adaptada a tu marca</b><p>Colores, fotografías, textos, servicios y tono completamente personalizados.</p></div></div><div class="tags">${tagsFor(item)}</div><div class="ctaBand"><strong>Una landing lista para presentar, publicar y empezar a vender.</strong><span>Quiero esta landing</span></div></section></div></body></html>`;
}

const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1200,height:1600},deviceScaleFactor:1});
for(let i=0;i<data.length;i++){
 const item=data[i];
 await page.setContent(templateHTML(item),{waitUntil:'load'});
 await page.screenshot({path:path.join(out,`${String(item.id).padStart(3,'0')}-${item.slug}.png`),fullPage:true});
 if((i+1)%20===0||i===data.length-1) console.log(`${i+1}/${data.length}`);
}
await browser.close();
console.log('DONE');
