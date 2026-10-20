import React,{useEffect,useMemo,useRef,useState} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowUpRight,X,MessageCircle,Layers3,Move3D,ChevronRight,SlidersHorizontal,ShoppingBag,CalendarDays,Database,PanelTop,WalletCards,Users,Search,Globe2,BarChart3,Check,Bot,Store,ReceiptText,Workflow,Boxes,Building2,Plug,Code2,ShieldCheck,FileText,BriefcaseBusiness,ChartNoAxesCombined,ArrowRight,Menu,ServerCog,Sparkles,Download,Wand2,BookOpen}from'lucide-react';
import'./styles.css';
import rawItems from'./catalog.json';
import ComputeLanding from './ComputeLanding.jsx';

const cleanTitle=t=>(t||'')
  .replace(/^\s*\[[^\]]+\]\s*/,'')
  .replace(/\s*\(por [^)]+\)\s*$/i,'')
  .replace(/\s+/g,' ')
  .trim();

const visibleItems=rawItems.filter(i=>!/(^|\s)404(\s|$)/i.test(`${i.titulo} ${i.slug} ${i.subcategoria}`));

const sourceLabel=i=>i.fuente==='Landings'?'Sitio completo':'Diseño con animación';

function commercialCategory(i){
  const s=`${i.titulo} ${i.slug} ${i.categoria} ${i.subcategoria}`.toLowerCase();
  if(/restaurant|pizzeria|wine|brew|bar|cocktail|cake|food|catering|market|helado|ice-cream|gastronom/.test(s)) return 'Gastronomía';
  if(/gym|yoga|pilates|fitness|trainer|sport|golf|surf|martial|box/.test(s)) return 'Deportes y fitness';
  if(/dent|clinic|therap|massage|psych|health|med-spa|care-home|acupuncture/.test(s)) return 'Salud y bienestar';
  if(/salon|beauty|esthetic|skincare|bridal|fashion|tailor|stylist|perfume/.test(s)) return 'Belleza y estética';
  if(/real-estate|property|home|roof|construction|plumb|electric|clean|gutter|tree|landscap|smart-home|glass/.test(s)) return 'Hogar, obras e inmuebles';
  if(/travel|airport|vacation|hotel|tour|trip|winery|bed-and-breakfast/.test(s)) return 'Viajes y turismo';
  if(/course|school|academy|language|music-school|newsletter|education/.test(s)) return 'Cursos y educación';
  if(/shop|store|product|ecommerce|commerce|boutique|pet-store|bike-shop|market/.test(s)) return 'Tiendas y ecommerce';
  if(/portfolio|artist|studio|video|photo|gallery|designer|creative|game/.test(s)) return 'Creativos y portfolio';
  if(/saas|software|tech|dashboard|app|ai |developer|digital/.test(s)) return 'Tecnología y productos';
  return 'Servicios y profesionales';
}

function profileFor(i){
  const s=`${i.titulo} ${i.slug} ${i.categoria} ${i.subcategoria} ${i.descripcion}`.toLowerCase();
  const cat=commercialCategory(i);
  let ideals=['negocios de servicios','profesionales independientes','marcas que quieren vender mejor online'];
  let features=['Formulario de contacto','WhatsApp directo','Panel de administración','Base de datos','SEO y analítica'];
  let objective='Presentar servicios, captar consultas y convertir visitas en clientes.';

  if(/shop|store|boutique|product|market|perfume|skincare|pet-store|bike-shop|ecommerce|commerce/.test(s)){
    ideals=['tiendas online','marcas de productos','emprendimientos con catálogo','negocios con stock'];
    features=['Catálogo de productos','Variantes y stock','Carrito de compras','Finalización de compra','Mercado Pago / Stripe / PayPal','Panel para cargar productos','Usuarios y pedidos','Base de datos'];
    objective='Vender productos online con catálogo, carrito, pagos y administración.';
  }else if(/restaurant|pizzeria|wine|brew|bar|cocktail|catering|cake|food/.test(s)){
    ideals=['restaurantes','cafeterías','bares','pastelerías','servicios de catering'];
    features=['Menú o carta digital','Reservas','Pedidos online','Pagos','WhatsApp','Ubicación y horarios','Base de clientes','Panel de administración'];
    objective='Mostrar la propuesta gastronómica y sumar reservas, pedidos y pagos.';
  }else if(/real-estate|property|inmuebl/.test(s)){
    ideals=['inmobiliarias','desarrolladoras','alquileres temporarios','agentes inmobiliarios'];
    features=['Listado de propiedades','Buscador y filtros','Fichas con galería','Mapa','Captura de consultas','Seguimiento de clientes','WhatsApp','Base de datos'];
    objective='Publicar propiedades y convertir consultas en oportunidades comerciales.';
  }else if(/gym|yoga|pilates|trainer|fitness|massage|therap|dent|clinic|med-spa|acupuncture/.test(s)){
    ideals=['gimnasios','estudios','consultorios','centros de bienestar','profesionales de la salud'];
    features=['Turnos y reservas','Calendario','Membresías','Pagos online','Usuarios','Recordatorios','WhatsApp','Base de datos'];
    objective='Gestionar turnos, reservas, membresías y pagos desde una misma web.';
  }else if(/course|school|academy|language|music-school|newsletter/.test(s)){
    ideals=['academias','profesores','cursos online','membresías educativas'];
    features=['Cursos y contenidos','Acceso de usuarios','Membresías','Pagos','Progreso del alumno','Boletín por correo','Panel de administración','Base de datos'];
    objective='Vender cursos, gestionar alumnos y entregar contenido privado.';
  }else if(/travel|airport|vacation|hotel|tour|trip|bed-and-breakfast/.test(s)){
    ideals=['agencias de viaje','alojamientos','experiencias turísticas','traslados'];
    features=['Reservas','Calendario de disponibilidad','Pagos','Formularios','WhatsApp','Galerías','Multiidioma','Base de datos'];
    objective='Recibir reservas y consultas con una experiencia visual premium.';
  }else if(/roof|construction|plumb|electric|clean|gutter|tree|landscap|glass|insurance|towing|transport|trucking/.test(s)){
    ideals=['electricistas','carpinteros','plomeros','constructoras','técnicos y servicios del hogar'];
    features=['Solicitud de presupuesto','Formulario inteligente','WhatsApp','Zonas de cobertura','Servicios','Seguimiento de consultas','Reseñas','Base de datos'];
    objective='Conseguir presupuestos y consultas de clientes de forma simple y profesional.';
  }else if(/portfolio|artist|studio|video|photo|gallery|designer|voice-over|creative/.test(s)){
    ideals=['estudios creativos','fotógrafos','diseñadores','artistas','productoras'];
    features=['Trabajos administrables','Galerías','Casos de estudio','Formulario de proyecto','WhatsApp','Boletín por correo','Posicionamiento en buscadores','Panel de contenidos'];
    objective='Mostrar trabajos, posicionar la marca y recibir consultas de nuevos proyectos.';
  }

  return {cat,ideals,features,objective};
}

const allItems=visibleItems.map(i=>({...i,tituloVisible:cleanTitle(i.titulo),...profileFor(i)}));
const commercialCats=['Todo',...Array.from(new Set(allItems.map(i=>i.cat))).sort()];
const groups=[['Todo','Todo'],['Sitios completos','Landings'],['Con animación','Motion Sites']];
const faqs=[
  ['¿Este diseño se puede adaptar a mi negocio?','Sí. Cambiamos identidad, colores, tipografías, contenido, secciones y funciones para que responda a tu marca.'],
  ['¿Puedo sumar pagos, turnos o usuarios?','Sí. El diseño es el punto de partida; podemos sumar tienda, reservas, pagos, acceso de clientes, paneles y automatizaciones.'],
  ['¿La página queda a mi nombre?','Sí. El proyecto se entrega para tu negocio y coordinamos dominio, publicación y accesos.'],
  ['¿Qué pasa después de publicarla?','Podemos seguir ocupándonos del mantenimiento, seguridad, mejoras y nuevas funciones.']
];

const agencyServices=[
  {icon:Layers3,title:'Páginas comerciales',text:'Campañas, lanzamientos y páginas de alta conversión con formularios, WhatsApp, analítica y posicionamiento en buscadores.'},
  {icon:Globe2,title:'Sitios web completos',text:'Webs corporativas, profesionales y de marca con contenido administrable, blog, portfolio y contacto.'},
  {icon:ShoppingBag,title:'Tiendas online',text:'Catálogo, stock, variantes, carrito, finalización de compra, cupones, pedidos y medios de pago.'},
  {icon:PanelTop,title:'Sistemas a medida',text:'Paneles administrativos, gestión interna, usuarios, permisos, procesos y tableros de control.'},
  {icon:Bot,title:'Agentes de IA',text:'Asistentes para ventas, soporte, operaciones, clasificación, contenido y tareas repetitivas.'},
  {icon:Store,title:'Sistemas para comercios',text:'Productos, caja, stock, clientes, pedidos, sucursales, turnos, logística y reportes.'},
  {icon:ReceiptText,title:'Facturación',text:'Comprobantes, estados de pago, reportes, conciliaciones e integración con sistemas contables.'},
  {icon:Building2,title:'Gestión e integraciones',text:'Conexión con inventario, compras, ventas, clientes, operaciones y sistemas empresariales.'},
  {icon:Workflow,title:'Automatizaciones',text:'Flujos de trabajo, correos, altas de clientes, seguimiento comercial, reportes y derivación de tareas.'},
  {icon:BarChart3,title:'Clientes y tableros',text:'Embudo comercial, oportunidades, actividad, métricas, indicadores y paneles de gestión.'},
  {icon:Database,title:'Bases de datos',text:'Arquitectura de datos, usuarios, historiales, permisos, archivos y procesos seguros.'},
  {icon:Plug,title:'Integraciones',text:'WhatsApp, correo, pagos, analítica, plataformas de venta, logística y herramientas externas.'}
];

const agencyFaqs=[
  ['¿Hacen solo páginas web?','No. Desarrollamos páginas comerciales, tiendas online, sistemas internos, automatizaciones, paneles, bases de datos e inteligencia artificial.'],
  ['¿Pueden empezar por una página comercial y crecer después?','Sí. Podemos lanzar una primera versión y luego sumar tienda online, usuarios, pagos, paneles y automatizaciones.'],
  ['¿Integran pagos y facturación?','Sí. Podemos integrar Mercado Pago, Stripe, PayPal y procesos de facturación según el sistema y el país.'],
  ['¿Trabajan con sistemas existentes?','Sí. Podemos conectar sistemas de clientes, gestión, bases de datos, proveedores de pago y herramientas que la empresa ya utiliza.'],
  ['¿Qué pasa después de publicar?','Seguimos cuidando tu sitio. Podemos ocuparnos de mantenimiento, mejoras, seguridad, contenido y nuevas funciones a medida que tu negocio crece.']
];

const transformationSteps=[
  ['01','DESCUBRIR','Hacemos que la primera impresión explique rápido qué ofrecés, por qué importa y cuál es el próximo paso.','Una experiencia que convierte atención en interés.'],
  ['02','INTERESARSE','Ordenamos productos, servicios y contenido alrededor de lo que la persona realmente necesita encontrar.','Menos fricción. Más intención.'],
  ['03','CONSULTAR','Conectamos formularios, WhatsApp, reservas y consultas para que una oportunidad no termine perdida en distintos lugares.','Cada consulta entra al mismo sistema.'],
  ['04','SEGUIR','La conversación no termina cuando alguien cierra la pestaña. Organizamos datos, seguimiento y automatizaciones.','Sabés quién preguntó, qué le interesó y qué hacer después.'],
  ['05','COMPRAR','Diseñamos el recorrido hasta la acción: reservar, contratar, comprar o pagar sin saltos innecesarios.','El camino a la venta se vuelve más corto.'],
  ['06','VOLVER','Postventa, recordatorios, nuevas oportunidades y datos para que una venta pueda convertirse en una relación.','El sistema sigue trabajando después de cobrar.']
];

const featuredDesigns=[1575,1004,1580,1008,1007,171]
  .map(id=>allItems.find(i=>i.id===id)).filter(Boolean);

function AIHeroCanvas(){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext('2d');
    let raf=0,w=0,h=0,dpr=Math.min(window.devicePixelRatio||1,2);
    let mouse={x:-9999,y:-9999};
    const dots=[];
    const resize=()=>{
      const r=canvas.getBoundingClientRect();w=r.width;h=r.height;
      canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
      dots.length=0;
      const count=Math.max(42,Math.min(90,Math.round((w*h)/14500)));
      for(let i=0;i<count;i++)dots.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.8+.8,p:Math.random()*Math.PI*2});
    };
    const move=e=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top};
    const leave=()=>{mouse.x=-9999;mouse.y=-9999};
    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      const t=performance.now()*.001;
      for(const d of dots){
        const dx=mouse.x-d.x,dy=mouse.y-d.y,dist=Math.hypot(dx,dy);
        if(dist<180){const f=(180-dist)/180;d.vx-=dx/(dist||1)*f*.004;d.vy-=dy/(dist||1)*f*.004}
        d.vx*=.995;d.vy*=.995;d.x+=d.vx;d.y+=d.vy;
        if(d.x<-20)d.x=w+20;if(d.x>w+20)d.x=-20;if(d.y<-20)d.y=h+20;if(d.y>h+20)d.y=-20;
      }
      for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){
        const a=dots[i],b=dots[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
        if(dist<125){ctx.strokeStyle=`rgba(255,255,255,${(1-dist/125)*.18})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
      }
      for(const d of dots){
        const pulse=(Math.sin(t*1.6+d.p)+1)/2;
        ctx.fillStyle=`rgba(255,255,255,${.52+pulse*.36})`;ctx.beginPath();ctx.arc(d.x,d.y,d.r+pulse*.55,0,Math.PI*2);ctx.fill();
      }
      const g=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,220);g.addColorStop(0,'rgba(255,255,255,.09)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      raf=requestAnimationFrame(draw);
    };
    resize();draw();window.addEventListener('resize',resize);canvas.addEventListener('mousemove',move);canvas.addEventListener('mouseleave',leave);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);canvas.removeEventListener('mousemove',move);canvas.removeEventListener('mouseleave',leave)};
  },[]);
  return <canvas ref={ref} className="aiHeroCanvas" aria-hidden="true"/>;
}

function App(){
  const[catalogMode,setCatalogMode]=useState(()=>window.location.hash==='#modelos');
  const[source,setSource]=useState('Todo');
  const[cat,setCat]=useState('Todo');
  const[filtersOpen,setFiltersOpen]=useState(false);
  const[sel,setSel]=useState(null);
  const[faqOpen,setFaqOpen]=useState(0);
  const[agencyFaqOpen,setAgencyFaqOpen]=useState(0);
  const[cosmicEnded,setCosmicEnded]=useState(false);
  const[cosmicCircles,setCosmicCircles]=useState(false);

  useEffect(()=>{
    const syncCatalog=()=>setCatalogMode(window.location.hash==='#modelos');
    window.addEventListener('hashchange',syncCatalog);
    return()=>window.removeEventListener('hashchange',syncCatalog);
  },[]);

  useEffect(()=>{
    const cosmicTimer=setTimeout(()=>setCosmicCircles(true),800);
    const revealTargets=[...document.querySelectorAll('.agencyStatement,.agencyServices,.businessStack,.aiSection,.enterpriseSection,.technologyStrip,.catalogIntro,.agencyFaqSection,.agencyFinalCta,.agencyFooter')];
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}
    }),{threshold:.14,rootMargin:'0px 0px -8% 0px'});
    revealTargets.forEach(el=>io.observe(el));

    const tiltTargets=[...document.querySelectorAll('.agencyService,.enterpriseGrid article,.stackCards article,.card')];
    const onMove=e=>{
      const el=e.currentTarget,r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty('--rx',`${(-y*5).toFixed(2)}deg`);
      el.style.setProperty('--ry',`${(x*7).toFixed(2)}deg`);
      el.style.setProperty('--mx',`${((x+.5)*100).toFixed(1)}%`);
      el.style.setProperty('--my',`${((y+.5)*100).toFixed(1)}%`);
    };
    const onLeave=e=>{e.currentTarget.style.setProperty('--rx','0deg');e.currentTarget.style.setProperty('--ry','0deg')};
    tiltTargets.forEach(el=>{el.addEventListener('mousemove',onMove);el.addEventListener('mouseleave',onLeave)});
    const hero=document.querySelector('.socaHeroStage');
    const onHeroMove=e=>{
      if(!hero)return;
      const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      hero.style.setProperty('--hx',`${(x*18).toFixed(2)}px`);
      hero.style.setProperty('--hy',`${(y*14).toFixed(2)}px`);
      hero.style.setProperty('--cx',`${((x+.5)*100).toFixed(1)}%`);
      hero.style.setProperty('--cy',`${((y+.5)*100).toFixed(1)}%`);
    };
    const onHeroLeave=()=>{if(hero){hero.style.setProperty('--hx','0px');hero.style.setProperty('--hy','0px')}};
    hero?.addEventListener('mousemove',onHeroMove);hero?.addEventListener('mouseleave',onHeroLeave);

    const scramble=document.querySelector('[data-scramble]');
    let scrambleTimer;
    if(scramble){
      const final=scramble.textContent,chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/.';
      let frame=0;
      scrambleTimer=setInterval(()=>{
        scramble.textContent=final.split('').map((c,i)=>c===' '?' ':i<frame/2?final[i]:chars[Math.floor(Math.random()*chars.length)]).join('');
        frame++;
        if(frame>final.length*2+8){scramble.textContent=final;clearInterval(scrambleTimer)}
      },34);
    }
    return()=>{clearTimeout(cosmicTimer);io.disconnect();tiltTargets.forEach(el=>{el.removeEventListener('mousemove',onMove);el.removeEventListener('mouseleave',onLeave)});hero?.removeEventListener('mousemove',onHeroMove);hero?.removeEventListener('mouseleave',onHeroLeave);if(scrambleTimer)clearInterval(scrambleTimer)};
  },[]);

  const filtered=useMemo(()=>{
    const priority=[1575,1013,1580,1008,1007,171,136,17,142,90,153,49];
    const rank=new Map(priority.map((id,n)=>[id,n]));
    return allItems.filter(i=>(source==='Todo'||i.fuente===source)&&(cat==='Todo'||i.cat===cat)).sort((a,b)=>(rank.get(a.id)??9999)-(rank.get(b.id)??9999));
  },[source,cat]);

  if(catalogMode) return <main className="catalogPage">
    <header className="catalogPageNav"><a href="#inicio" onClick={()=>setCatalogMode(false)}>SOCA</a><button onClick={()=>{window.location.hash='';setCatalogMode(false)}}>Volver a SOCA</button></header>
    <section className="catalogPageHero">
      <div className="sectionTag">Modelos de diseño</div>
      <h1>Encontrá una dirección visual para tu negocio.</h1>
      <p>Este es el catálogo completo. Elegí una estética que te represente y nosotros la convertimos en una experiencia adaptada a tu marca, tu oferta y el sistema que necesites.</p>
    </section>
    <section id="catalogo" className="catalogHead">
      <div className="segment">{groups.map(([label,value])=><button key={value} className={source===value?'active':''} onClick={()=>setSource(value)}>{label}</button>)}</div>
      <button className={filtersOpen?'filterToggle active':'filterToggle'} onClick={()=>setFiltersOpen(v=>!v)}><SlidersHorizontal size={16}/> Rubros</button>
    </section>
    {filtersOpen&&<section className="filterPanel"><div className="filterGroup"><span>Rubro</span><div className="chips">{commercialCats.map(x=><button key={x} className={cat===x?'active':''} onClick={()=>setCat(x)}>{x}</button>)}</div></div><p className="filterHint">Todos los diseños se pueden adaptar a otro rubro. Este filtro solo te ayuda a encontrar referencias más rápido.</p></section>}
    <div className="result"><span><b>{filtered.length}</b> opciones</span><span>Elegí una estética. Después la adaptamos a tu negocio.</span></div>
    <section className="grid">{filtered.map(i=><button className="card" key={i.id} onClick={()=>setSel(i)}><div className="media">{i.imagen?<img src={i.imagen} loading="lazy" alt=""/>:<div className="fallback"><Layers3 size={42}/><span>Vista previa en preparación</span></div>}<div className="badge">{sourceLabel(i)}</div></div><div className="body"><div className="meta">{i.cat}</div><h2>{i.tituloVisible}</h2><p>{i.objective}</p><div className="adaptLine"><b>Se puede adaptar para:</b> {i.ideals.slice(0,3).join(', ')}.</div><div className="open">Ver posibilidades</div></div></button>)}</section>
    <footer className="agencyFooter"><b>SOCA</b><span>Diseño al servicio de un sistema que vende.</span><small>© 2026 SOCA</small></footer>
    {sel&&<div className="back pageBack" onMouseDown={()=>setSel(null)}><article className="modal modalPage" onMouseDown={e=>e.stopPropagation()}><header className="modalTopbar"><div><b>SOCA</b><span>{sel.cat}</span></div><button className="close" onClick={()=>setSel(null)}><X/></button></header><div className="modalHero"><div className="modalHeroCopy"><div className="modalKicker">Diseño adaptable a tu negocio</div><h2>{sel.tituloVisible}</h2><p className="lead">Usamos esta estética como punto de partida y construimos alrededor el recorrido, las funciones y las conexiones que necesite tu negocio.</p><a className="cta heroCta" target="_blank" rel="noreferrer" href={`https://wa.me/542236151152?text=${encodeURIComponent(`Hola SOCA, quiero adaptar el diseño ${sel.tituloVisible} a mi negocio`)}`}>Quiero este diseño</a></div><div className="modalPreviewFrame">{sel.imagen?<img src={sel.imagen} draggable="false" onContextMenu={e=>e.preventDefault()}/>:null}</div></div></article></div>}
  </main>;

  return <main>
    <header className="top">
      <a className="logo socaLogo" href="#inicio">SOCA</a>
      <nav className="agencyNav"><a href="#servicios">Cómo funciona</a><a href="#sistemas">Transformación</a><a href="#modelos" onClick={()=>setCatalogMode(true)}>Modelos</a><a href="#contacto">Contacto</a></nav>
      <div className="topRight"><a className="topCta" href="https://wa.me/542236151152?text=Hola%20SOCA,%20quiero%20consultar%20por%20un%20proyecto" target="_blank" rel="noreferrer">Hablemos <ArrowUpRight size={15}/></a></div>
    </header>

    <section className="bloomAgencyHero" id="inicio">
      <div className="bloomHeroLayout">
        <section className="bloomLeft liquidGlassStrong">
          <nav className="bloomNav">
            <a className="bloomWordmark" href="#inicio"><span className="bloomMark">S</span><b>SOCA</b></a>
            <a className="bloomIconButton liquidGlass bloomInteract" href="#servicios" aria-label="Ver servicios"><Menu size={18}/></a>
          </nav>

          <div className="bloomHeroCopy">
            <span className="appleHeroKicker">SOCA</span>
            <h1>Transformamos negocios en <em>sistemas digitales que venden.</em></h1>
            <p>Conectamos cada punto entre una persona que descubre tu negocio y una persona que compra.</p>
            <a className="bloomMainCta liquidGlassStrong bloomInteract" href="https://wa.me/542236151152?text=Hola%20SOCA,%20quiero%20una%20propuesta" target="_blank" rel="noreferrer">
              <span>Quiero transformar mi negocio</span><i><ArrowUpRight size={16}/></i>
            </a>
            <div className="bloomPills">
              <span className="liquidGlass">Captación</span>
              <span className="liquidGlass">Venta</span>
              <span className="liquidGlass">Seguimiento</span>
            </div>
          </div>

          <div className="appleHeroVisual">
            <div className="appleBrowser">
              <div className="appleBrowserBar"><span/><span/><span/><b>soca / experiencia digital</b></div>
              <img src={featuredDesigns.find(i=>i.fuente==='Landings')?.imagen||featuredDesigns[0]?.imagen} alt="Ejemplo de experiencia digital SOCA"/>
            </div>
            <div className="appleFloatingCallout"><div><b>Diseño + sistema</b><span>Una experiencia pensada para convertir.</span></div><a href="#contacto">Hablemos</a></div>
          </div>

          <div className="bloomQuote">
            <span>DISEÑO + NEGOCIO + SISTEMAS</span>
            <p>No te preguntamos cuántas páginas necesitás. <em>Te preguntamos qué tiene que lograr tu negocio.</em></p>
            <b>SOCA</b>
          </div>
        </section>

      </div>
    </section>

    <section className="socaManifesto">
      <div className="sectionTag">El problema no es tener o no tener una web</div>
      <h2>Rediseñamos el camino <em>hasta la venta.</em></h2>
      <p>La experiencia, la captación, el seguimiento, la venta, la automatización y la postventa dejan de ser piezas separadas. Las diseñamos como una sola experiencia.</p>
    </section>

    <section className="journeySection" id="servicios">
      <div className="journeyIntro"><div className="sectionTag">Un solo sistema</div><h2>De descubrirte a volver a comprarte.</h2><p>Cada etapa resuelve una pérdida concreta. No sumamos tecnología porque sí: conectamos lo necesario para que el negocio funcione mejor.</p></div>
      <div className="journeySteps">{transformationSteps.map(([n,title,text,result])=><article key={n}><span>{n}</span><div><b>{title}</b><p>{text}</p><strong>{result}</strong></div></article>)}</div>
    </section>

    <section className="scenarioSection" id="sistemas">
      <div className="sectionTag">Imaginá esto</div>
      <div className="scenarioGrid"><div><span>HOY</span><h2>Una persona llega. Mira. Pregunta. Se va.</h2><p>WhatsApp por un lado. Formularios por otro. Pagos, clientes y datos separados. Muchas oportunidades terminan sin seguimiento.</p></div><div className="scenarioAfter"><span>DESPUÉS</span><h2>La visita deja de ser anónima.</h2><p>Entiende qué ofrecés, encuentra lo indicado, consulta, entra al sistema, puede reservar o pagar y la conversación puede continuar.</p></div></div>
      <div className="journeyLine"><span>DESCUBRIR</span><i>→</i><span>INTERESARSE</span><i>→</i><span>CONSULTAR</span><i>→</i><span>SEGUIR</span><i>→</i><span>COMPRAR</span><i>→</i><span>VOLVER</span></div>
    </section>

    <section className="resultSection">
      <div><div className="sectionTag">La tecnología no es lo importante</div><h2>Tu cliente no compra tecnología. <em>Vos tampoco deberías hacerlo.</em></h2></div>
      <div className="resultWords"><span>Menos oportunidades perdidas.</span><span>Más conversaciones.</span><span>Más clientes.</span><span>Más ventas.</span></div>
    </section>

    <section className="valueSection"><p>¿Cuánto vale una web?</p><h2>La pregunta interesante es: <em>¿cuánto vale convertir mejor?</em></h2><p>No calculamos un proyecto por cantidad de páginas. Lo pensamos por el problema que tiene que resolver y por lo que el sistema tiene que lograr.</p></section>

    <section className="methodSection"><div className="methodIntro"><div className="sectionTag">Cómo trabajamos</div><h2>Primero entendemos. Después diseñamos. Recién entonces construimos.</h2></div><div className="methodSteps"><article><span>01</span><b>OBSERVAMOS</b><p>Cómo llegan las personas y dónde se corta hoy el recorrido.</p></article><article><span>02</span><b>ENCONTRAMOS</b><p>Las oportunidades que la estructura actual está dejando pasar.</p></article><article><span>03</span><b>DISEÑAMOS</b><p>Una experiencia alrededor de cómo realmente decide y compra una persona.</p></article><article><span>04</span><b>CONECTAMOS</b><p>Web, consultas, datos, seguimiento, ventas y automatizaciones.</p></article><article><span>05</span><b>MEDIMOS</b><p>Qué cambió y dónde podemos seguir mejorando.</p></article></div></section>

    <section className="designEvidence">
      <div className="designEvidenceHead"><div><div className="sectionTag">El diseño también importa</div><h2>Tu próxima web no debería ser solamente más linda. <em>Debería hacer más.</em></h2></div><p>Estas son apenas algunas direcciones visuales. El catálogo completo vive aparte; acá mostramos diseño como evidencia, no como producto.</p></div>
      <div className="featuredDesignGrid">{featuredDesigns.map(i=><a href="#modelos" key={i.id} onClick={()=>setCatalogMode(true)}><img src={i.imagen} alt={i.tituloVisible}/><span>{i.tituloVisible}</span></a>)}</div>
      <a className="modelsCta" href="#modelos" onClick={()=>setCatalogMode(true)}>Explorar todos los modelos <span>→</span></a>
    </section>

    <section className="agencyFaqSection">
      <div className="agencyFaqIntro"><div className="sectionTag">Preguntas frecuentes</div><h2>Antes de empezar.</h2><p>Lo importante, explicado sin vueltas.</p></div>
      <div className="agencyFaqList">{agencyFaqs.map(([q,a],idx)=><div className={agencyFaqOpen===idx?'agencyFaqItem open':'agencyFaqItem'} key={q}><button onClick={()=>setAgencyFaqOpen(agencyFaqOpen===idx?-1:idx)}><span>{String(idx+1).padStart(2,'0')}</span><b>{q}</b><i/></button><div><p>{a}</p></div></div>)}</div>
    </section>

    <section className="agencyFinalCta" id="contacto">
      <div><span>SOCA / HABLEMOS</span><h2>No te preguntamos cuántas páginas necesitás. Te preguntamos qué tiene que lograr tu negocio.</h2></div>
      <a href="https://wa.me/542236151152?text=Hola%20SOCA,%20quiero%20transformar%20mi%20negocio" target="_blank" rel="noreferrer">Hablemos de tu negocio <ArrowUpRight size={20}/></a>
    </section>

    <footer className="agencyFooter"><b>SOCA</b><span>Diseñamos sistemas digitales para negocios que quieren crecer.</span><small>© 2026 SOCA</small></footer>

    {sel&&<div className="back pageBack" onMouseDown={()=>setSel(null)}><article className="modal modalPage" onMouseDown={e=>e.stopPropagation()}>
      <header className="modalTopbar">
        <div><b>SOCA</b><span>{sel.cat}</span></div>
        <button className="close" onClick={()=>setSel(null)}><X/></button>
      </header>

      <div className="modalHero">
        <div className="modalHeroCopy">
          <div className="modalKicker">Diseño adaptable a tu negocio</div>
          <h2>{sel.tituloVisible}</h2>
          <p className="lead">Usamos esta estética como punto de partida y construimos una web completa alrededor de tu negocio. No es una plantilla cerrada.</p>
          <div className="idealChips">{sel.ideals.map(x=><span key={x}>{x}</span>)}</div>
          <a className="cta heroCta" target="_blank" rel="noreferrer" href={`https://wa.me/542236151152?text=${encodeURIComponent(`Hola SOCA, quiero adaptar el diseño ${sel.tituloVisible} a mi negocio`)}`}><MessageCircle size={18}/> Quiero adaptar este diseño</a>
        </div>
        <div className="modalPreviewFrame">{sel.imagen?<img src={sel.imagen} draggable="false" onContextMenu={e=>e.preventDefault()} />:<div className="fallback"><Move3D size={58}/></div>}<div className="previewShield"/></div>
      </div>

      <section className="modalSection introSection">
        <div className="sectionEyebrow">Posibilidades</div>
        <h3>Este diseño puede convertirse en una web completa.</h3>
        <p>{sel.objective} Y además podemos sumar funciones comerciales, automatizaciones e integraciones según lo que necesite tu negocio.</p>
      </section>

      <section className="modalSection">
        <div className="sectionHead"><div><div className="sectionEyebrow">Qué podemos construir</div><h3>Funciones reales, no solo diseño.</h3></div><p>Elegís el estilo visual y nosotros armamos la parte funcional.</p></div>
        <div className="featureGrid featureGridPage">{sel.features.map((f,idx)=><div className="featureItem featureItemPage" key={f}>{[
          <ShoppingBag size={20}/>,<CalendarDays size={20}/>,<WalletCards size={20}/>,<Database size={20}/>,<PanelTop size={20}/>,<Users size={20}/>,<Search size={20}/>,<BarChart3 size={20}/>
        ][idx%8]}<span>{f}</span></div>)}</div>
      </section>

      <section className="modalSection technologySection">
        <div className="sectionHead"><div><div className="sectionEyebrow">Cómo la construimos</div><h3>Preparada para crecer.</h3></div><p>La dejamos lista para sumar productos, pagos, usuarios, datos y nuevas funciones sin tener que empezar de cero.</p></div>
        <div className="techCards">
          <div><b>Rápida y estable</b><span>Una base moderna pensada para cargar bien y crecer.</span></div>
          <div><b>Datos y usuarios</b><span>Clientes, pedidos, turnos, contenido y accesos.</span></div>
          <div><b>Pagos</b><span>Cobros online conectados al flujo de tu negocio.</span></div>
          <div><b>Conexiones</b><span>WhatsApp, correo, sistemas de gestión, analítica y más.</span></div>
        </div>
      </section>

      <section className="modalSection customizationSection">
        <div><div className="sectionEyebrow">100% adaptable</div><h3>Tu marca, no una plantilla.</h3></div>
        <p>Cambiamos textos, colores, fotos, tipografía, logo, secciones y funcionalidades. El diseño es solo el punto de partida.</p>
      </section>

      <section className="modalSection faqSection">
        <div className="faqIntro"><div className="sectionEyebrow">Preguntas frecuentes</div><h3>Antes de empezar.</h3><p>Todo lo importante, explicado simple.</p></div>
        <div className="faqList">{faqs.map(([q,a],idx)=><div className={faqOpen===idx?'faqItem open':'faqItem'} key={q}>
          <button className="faqQuestion" type="button" aria-expanded={faqOpen===idx} onClick={()=>setFaqOpen(faqOpen===idx?-1:idx)}>
            <span className="faqNumber">{String(idx+1).padStart(2,'0')}</span><span className="faqTitle">{q}</span><span className="faqPlus" aria-hidden="true"/>
          </button>
          <div className="faqBody"><div><p>{a}</p></div></div>
        </div>)}</div>
      </section>

      <footer className="modalFooter">
        <div><span>¿Te gusta este estilo?</span><h3>Lo llevamos a tu negocio.</h3></div>
        <a className="cta footerCta" target="_blank" rel="noreferrer" href={`https://wa.me/542236151152?text=${encodeURIComponent(`Hola SOCA, quiero adaptar el diseño ${sel.tituloVisible} a mi negocio`)}`}><MessageCircle size={18}/> Quiero este diseño</a>
      </footer>
    </article></div>}
  </main>
}

const computeMode=!window.location.hash.startsWith('#modelos');
createRoot(document.getElementById('root')).render(computeMode?<ComputeLanding/>:<App/>);
