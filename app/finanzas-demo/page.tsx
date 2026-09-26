'use client';

import { useMemo, useState } from 'react';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Stack } from '@astryxdesign/core/Stack';
import { TextInput } from '@astryxdesign/core/TextInput';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import {
  ArrowLeft, ArrowUpRight, Bell, Camera, ChevronRight, CircleDollarSign,
  FileText, Fuel, Home, Mail, MessageCircle, PieChart, Plus, ReceiptText,
  School, Search, ShoppingCart, Smartphone, Sparkles, Utensils, WalletCards,
  Zap,
} from 'lucide-react';

type View = 'landing' | 'login' | 'home' | 'gastos' | 'analisis' | 'cargar' | 'chat';

const movements = [
  { name: 'Jumbo', meta: 'Supermercado · Hoy', amount: '$ 84.320', icon: ShoppingCart, tone: 'sand' },
  { name: 'YPF', meta: 'Nafta · Ayer', amount: '$ 46.800', icon: Fuel, tone: 'blue' },
  { name: 'EDEA', meta: 'Luz · 24 sep', amount: '$ 61.240', icon: Zap, tone: 'yellow' },
  { name: 'Netflix', meta: 'Streaming · 23 sep', amount: '$ 15.499', icon: Smartphone, tone: 'red' },
  { name: 'Colegio', meta: 'Educación · 15 sep', amount: '$ 185.000', icon: School, tone: 'green' },
  { name: 'Cena', meta: 'Salidas · 12 sep', amount: '$ 58.700', icon: Utensils, tone: 'pink' },
];

export default function FinanzasDemoPage() {
  const [view, setView] = useState<View>('landing');
  const [period, setPeriod] = useState('mes');
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const [scanState, setScanState] = useState<string | null>(null);

  const title = useMemo(() => ({
    home: 'Inicio', gastos: 'Gastos', analisis: 'Análisis', cargar: 'Agregar', chat: 'Asistente',
  } as Record<string, string>)[view], [view]);

  const ask = () => {
    const q = query.trim();
    if (!q) return;
    setChat(prev => [...prev, q, 'En octubre tenés $ 1.124.760 comprometidos. Visa Santander representa $ 684.320 y vence el 3 de octubre. También detecté colegio, servicios y 12 suscripciones activas.']);
    setQuery('');
  };

  return (
    <Theme theme={neutralTheme} mode="light">
      <main className="fin-shell">
        {view === 'landing' && (
          <section className="fin-landing">
            <header className="fin-topbar"><div className="fin-brand">clara<span>.</span></div><Button label="Entrar" variant="ghost" size="sm" onClick={() => setView('login')} /></header>
            <div className="fin-hero-copy">
              <span className="fin-kicker">Finanzas personales, sin esfuerzo</span>
              <h1>Todo lo que gastás.<br/><span>Perfectamente claro.</span></h1>
              <p>Subí resúmenes, conectá tu mail, escaneá tickets o cargá un gasto manual. Clara ordena todo y te muestra qué pasa con tu dinero.</p>
              <Stack direction="vertical" gap={2}>
                <Button label="Explorar demo" variant="primary" size="lg" width="100%" onClick={() => setView('login')} />
                <Button label="Ver qué puede analizar" variant="secondary" size="lg" width="100%" onClick={() => setView('home')} />
              </Stack>
            </div>
            <div className="fin-preview-card">
              <div className="preview-head"><span>Septiembre</span><span className="good">↓ 8,4%</span></div>
              <strong>$ 1.842.350</strong>
              <div className="sparkline"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
              <div className="preview-foot"><span>Pagado<br/><b>$1,12 M</b></span><span>Por pagar<br/><b>$714 mil</b></span></div>
            </div>
            <div className="fin-source-strip"><span>PDF</span><span>MAIL</span><span>TICKETS</span><span>QR</span><span>MANUAL</span></div>
          </section>
        )}

        {view === 'login' && (
          <section className="fin-auth">
            <button className="icon-link" onClick={() => setView('landing')}><ArrowLeft size={20}/></button>
            <div className="fin-brand">clara<span>.</span></div>
            <div className="auth-copy"><span className="fin-kicker">Tu espacio financiero</span><h2>Entrá y mirá todo<br/>con claridad.</h2><p>Una sola vista para tus gastos, pagos y vencimientos.</p></div>
            <Stack direction="vertical" gap={3} width="100%">
              <TextInput label="Email" value="german@demo.com" width="100%" />
              <TextInput label="Contraseña" type="password" value="12345678" width="100%" />
              <Button label="Ingresar" variant="primary" size="lg" width="100%" onClick={() => setView('home')} />
              <Button label="Continuar con Google" variant="secondary" size="lg" width="100%" onClick={() => setView('home')} />
            </Stack>
          </section>
        )}

        {!['landing','login'].includes(view) && (
          <section className="fin-app">
            <header className="app-top">
              <div><span className="fin-kicker">Sábado, 26 de septiembre</span><h2>{view === 'home' ? 'Buen día, Germán.' : title}</h2></div>
              <button className="avatar-mini">G</button>
            </header>

            {view === 'home' && <>
              <Card padding={4} elevation="low"><div className="balance-box"><div><span>Gasto este mes</span><strong>$ 1.842.350</strong><small>↓ 8,4% vs. agosto</small></div><button><ArrowUpRight size={18}/></button></div><div className="balance-split"><span>Pagado<b>$ 1.128.200</b></span><span>Por pagar<b>$ 714.150</b></span></div></Card>
              <div className="section-head"><h3>Lo próximo</h3><button onClick={() => setView('gastos')}>Ver todo</button></div>
              <div className="due-card"><div className="date-badge"><b>03</b><small>OCT</small></div><div><b>Visa Santander</b><small>vence en 7 días</small></div><strong>$684.320</strong></div>
              <div className="due-card"><div className="date-badge"><b>05</b><small>OCT</small></div><div><b>Colegio</b><small>cuota mensual</small></div><strong>$185.000</strong></div>
              <div className="section-head"><h3>¿Dónde se fue?</h3><button onClick={() => setView('analisis')}>Analizar</button></div>
              <Card padding={4}><div className="category-list"><Metric label="Supermercado" amount="$386.200" width="82%"/><Metric label="Salidas & comidas" amount="$294.800" width="63%"/><Metric label="Servicios" amount="$203.450" width="48%"/><Metric label="Transporte & nafta" amount="$168.900" width="38%"/></div></Card>
              <div className="section-head"><h3>Movimientos</h3><button onClick={() => setView('gastos')}>Todos</button></div>
              <MovementList items={movements.slice(0,4)} />
            </>}

            {view === 'gastos' && <>
              <SegmentedControl value={period} onChange={setPeriod} label="Período" layout="fill" size="sm"><SegmentedControlItem value="mes" label="Mes"/><SegmentedControlItem value="3m" label="3 meses"/><SegmentedControlItem value="año" label="Año"/></SegmentedControl>
              <div className="big-total"><span>Septiembre</span><strong>$ 1.842.350</strong><small>42 movimientos detectados</small></div>
              <div className="search-fake"><Search size={17}/><span>Buscar comercio, categoría o importe</span></div>
              <MovementList items={movements} />
            </>}

            {view === 'analisis' && <>
              <div className="big-total"><span>Últimos 12 meses</span><strong>$ 18.426.800</strong><small>Promedio mensual $1.535.567</small></div>
              <div className="stat-grid"><Stat label="Mes más alto" value="Marzo" note="$2,31 M"/><Stat label="Suscripciones" value="12 activas" note="$94.300 / mes"/><Stat label="Cuotas futuras" value="$1,84 M" note="próx. 6 meses"/><Stat label="Servicios" value="+18%" note="últimos 3 meses"/></div>
              <div className="section-head"><h3>Distribución anual</h3></div>
              <Card padding={4}><div className="category-list"><Metric label="Hogar & servicios" amount="$4,26 M" width="88%"/><Metric label="Supermercado" amount="$3,62 M" width="74%"/><Metric label="Comidas & salidas" amount="$3,01 M" width="62%"/><Metric label="Educación" amount="$2,31 M" width="46%"/><Metric label="Transporte" amount="$2,03 M" width="39%"/></div></Card>
              <div className="ai-insight"><Sparkles size={18}/><div><b>Clara encontró algo</b><p>Luz y telefonía explican casi todo el aumento de servicios de los últimos tres meses.</p></div></div>
            </>}

            {view === 'cargar' && <>
              <div className="capture-intro"><h3>Sumá cualquier gasto.</h3><p>Digital o en papel. Clara lo interpreta y lo incorpora automáticamente.</p></div>
              <div className="capture-grid">
                <Capture icon={Camera} title="Escanear ticket" copy="Cámara, texto o QR fiscal" onClick={() => setScanState('Ticket de YPF detectado · $46.800 · Nafta · 25/09/2026')} />
                <Capture icon={FileText} title="Subir PDF" copy="Tarjeta, banco o factura" onClick={() => setScanState('Resumen Visa leído · 74 consumos · 12 cuotas · vence 03/10')} />
                <Capture icon={Mail} title="Conectar mail" copy="Facturas y resúmenes" onClick={() => setScanState('9 facturas nuevas encontradas en tu correo')} />
                <Capture icon={Plus} title="Carga manual" copy="Importe, fecha y categoría" onClick={() => setScanState('Nuevo gasto manual listo para completar')} />
              </div>
              {scanState && <Card padding={4} elevation="low"><div className="scan-result"><span><Sparkles size={16}/> Detectado automáticamente</span><b>{scanState}</b><small>Podés editarlo antes de guardarlo.</small><Button label="Incorporar gasto" variant="primary" width="100%" onClick={() => setView('gastos')} /></div></Card>}
            </>}

            {view === 'chat' && <>
              <div className="assistant-hero"><div className="assistant-orb"><Sparkles size={23}/></div><h3>Preguntale a tus finanzas.</h3><p>Entiendo tus movimientos, pagos, cuotas, suscripciones y hábitos.</p></div>
              <div className="quick-prompts"><button onClick={() => {setQuery('¿Cuánto tengo que pagar en octubre?')}}>¿Cuánto tengo que pagar en octubre?</button><button onClick={() => {setQuery('¿En qué gasté más este año?')}}>¿En qué gasté más este año?</button></div>
              <div className="chat-thread">{chat.map((m,i)=><div key={i} className={i%2===0?'bubble me':'bubble clara'}>{m}</div>)}</div>
              <div className="chat-compose"><TextInput label="Pregunta" isLabelHidden value={query} onChange={setQuery} placeholder="Preguntá sobre tus gastos…" width="100%" onEnter={ask}/><Button label="Enviar" isIconOnly icon={<ArrowUpRight size={18}/>} variant="primary" onClick={ask}/></div>
            </>}

            <nav className="fin-bottom-nav">
              <Nav icon={Home} label="Inicio" active={view==='home'} onClick={() => setView('home')}/>
              <Nav icon={ReceiptText} label="Gastos" active={view==='gastos'} onClick={() => setView('gastos')}/>
              <button className="scan-fab" onClick={() => setView('cargar')}><Plus size={24}/></button>
              <Nav icon={PieChart} label="Análisis" active={view==='analisis'} onClick={() => setView('analisis')}/>
              <Nav icon={MessageCircle} label="Clara" active={view==='chat'} onClick={() => setView('chat')}/>
            </nav>
          </section>
        )}
      </main>
    </Theme>
  );
}

function Metric({label,amount,width}:{label:string;amount:string;width:string}) { return <div className="metric"><div><span>{label}</span><b>{amount}</b></div><i><em style={{width}}/></i></div> }
function MovementList({items}:{items:typeof movements}) { return <div className="movement-list">{items.map(({name,meta,amount,icon:Icon,tone})=><div className="movement" key={name}><span className={`movement-icon ${tone}`}><Icon size={18}/></span><div><b>{name}</b><small>{meta}</small></div><strong>{amount}</strong><ChevronRight size={15}/></div>)}</div> }
function Stat({label,value,note}:{label:string;value:string;note:string}) { return <Card padding={3}><div className="stat"><span>{label}</span><b>{value}</b><small>{note}</small></div></Card> }
function Capture({icon:Icon,title,copy,onClick}:{icon:any;title:string;copy:string;onClick:()=>void}) { return <button className="capture-card" onClick={onClick}><span><Icon size={20}/></span><b>{title}</b><small>{copy}</small></button> }
function Nav({icon:Icon,label,active,onClick}:{icon:any;label:string;active:boolean;onClick:()=>void}) { return <button className={active?'active':''} onClick={onClick}><Icon size={20}/><span>{label}</span></button> }
