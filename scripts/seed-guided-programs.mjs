import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const content = JSON.parse(fs.readFileSync(path.join(root, 'app/content.generated.json'), 'utf8'));
const envText = fs.readFileSync(path.join(root, '.env.export40'), 'utf8');
for (const line of envText.split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['\"]|['\"]$/g, '');
}
const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!base || !key) throw new Error('Faltan variables de Supabase');

const cfg = {
  amor: [
    ['tratarte con amor y respeto','dejar de exigirte','sentirte suficiente','hablarte como a alguien que querés','el amor empieza en vos'],
    ['habitar el estado de ser amado','esperar pruebas de afuera','sentir cercanía y elección','caminar como alguien querido','lo de adentro cambia lo que recibís'],
    ['volver a una escena breve de amor cumplido','mirar el deseo desde afuera','sentir el abrazo o la voz como presente','repetir la misma escena','una escena simple sostenida alcanza'],
    ['cuidar tu conversación interna','ensayar peleas o rechazo','escuchar palabras de amor y acuerdo','cambiar una frase interna','tu diálogo interno marca el tono'],
    ['revisar una escena que todavía pesa','revivir el mismo dolor','sentir alivio con un final distinto','cambiar la escena sin castigarte','revisar cambia desde dónde seguís viviendo'],
    ['volver al estado elegido','medir todo por lo que pasó hoy','sentir calma sin exigir resultados','regresar al amor','persistir es volver'],
    ['vivir desde la certeza de que ya sos amado','buscar completarte afuera','sentir plenitud y suficiencia','moverte sin mendigar amor','cuando dejás de perseguir amor empezás a compartirlo'],
  ],
  dinero: [
    ['cambiar el tono interno con el que mirás el dinero','pensar todo desde la falta','sentir tranquilidad y margen','elegir un estado más amplio','la abundancia empieza adentro'],
    ['habitar la sensación de tener suficiente','esperar una cifra para sentir alivio','sentir holgura y seguridad','pensar desde el que ya está cubierto','el estado va primero'],
    ['volver a una escena concreta de prosperidad','desear dinero en abstracto','sentir alivio de una situación resuelta','repetir la misma escena','una imagen concreta da dirección'],
    ['soltar la obsesión por los medios','calcular todos los caminos','sentir alivio porque el resultado está resuelto','volver al final','tu tarea es el estado final'],
    ['reconocer que la escasez es un estado','decirte que nunca alcanza','sentir elección y espacio','cambiar el lenguaje interno','un estado se abandona ocupando otro'],
    ['sostener abundancia aunque el afuera tarde','abandonar por impaciencia','sentir confianza sin urgencia','volver a tu escena','persistir es no arrancar la semilla'],
    ['vivir desde una identidad próspera','postergar la abundancia para después','sentir que ya hay suficiente','decidir desde calma','prosperidad también es cómo decidís'],
  ],
  salud: [
    ['tratar al cuerpo con calma y respeto','hablarte desde el miedo','sentir el cuerpo más acompañado','darle una imagen de bienestar','tu relación con el cuerpo también se entrena'],
    ['conectar con sensaciones de bienestar posibles ahora','revisar cada sensación con ansiedad','sentir respiración y calma','volver al cuerpo presente','bienestar también es bajar la lucha'],
    ['volver a una escena breve de bienestar','imaginar solo lo que temés','sentir libertad y tranquilidad','repetir una imagen simple','la escena orienta tu atención'],
    ['pasar de la pelea al acompañamiento','tratar al cuerpo como enemigo','sentir gratitud y confianza','aflojar tensión','acompañarte mejor cambia el momento'],
    ['no reducir tu identidad a un malestar','definirte solo por lo que te pasa','sentir que sos más que un síntoma','elegir palabras que no te encierren','podés atravesar algo sin ser eso'],
    ['sostener calma y bienestar','medir cada minuto buscando cambios','sentir paciencia y continuidad','volver a la calma','persistir también es cuidarte sin obsesionarte'],
    ['vivir el día con más confianza en tu cuerpo','vigilarte con miedo','sentir gratitud por lo que tu cuerpo hace hoy','moverte desde cuidado','el objetivo es una relación más tranquila con tu cuerpo'],
  ],
};

const templates = [
  'Chequeo rápido: hoy el foco es {f}. No hace falta hacerlo perfecto. Volvé ahora a {a}.',
  'Fijate desde dónde estás pensando esto. Si caíste en {v}, no te castigues. Elegí otra vez {s}.',
  'Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: {r}.',
  'No busques una señal afuera en este momento. Primero ordená adentro: {f}. Después seguí con tu día.',
  'Una pregunta para ahora: ¿cómo actuarías si ya fuera natural {s}? Hacé una cosa pequeña desde ese lugar.',
  'Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: {a}.',
  'No necesitás intensidad. Necesitás repetición. Volvé a {f} hasta que empiece a sentirse conocido.',
  'Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.',
  'Recordatorio: {r}. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.',
  'Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: {a}.',
  'Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar {s} por una escena momentánea.',
  'No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo {f}.',
  'Probá esto: durante un minuto no resuelvas nada. Solamente sentí {s}. Después retomá lo que estabas haciendo.',
  'Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar {r}.',
  'El estado cambia con pequeñas elecciones repetidas. Esta es una: {a}.',
  'No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí {s} ahora.',
  'Tu imaginación no necesita una película enorme. Una imagen breve, coherente con {f}, alcanza para reorientarte.',
  'Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: {r}.',
  'Antes del próximo mensaje o tarea, regalate veinte segundos para {a}. Ese regreso también cuenta.',
  'Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es {f}.',
  'Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez {s}.',
  'Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a {f}.',
  'El hábito viejo quiere que vuelvas automático a {v}. Hoy interrumpilo con una decisión consciente: {a}.',
  'No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de {s}.',
  'Guardate esta idea para el resto del día: {r}. Volvé a ella cada vez que te disperses.',
  'Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a {f}.',
];

const slugs = { amor: 'practica-7-dias-amor', dinero: 'practica-7-dias-dinero', salud: 'practica-7-dias-salud' };
const replaceTokens = (t,[f,v,s,a,r]) => t.replaceAll('{f}',f).replaceAll('{v}',v).replaceAll('{s}',s).replaceAll('{a}',a).replaceAll('{r}',r);


function sqlLit(value) {
  if (value == null) return 'null';
  return `'${String(value).replaceAll("'", "''")}'`;
}

if (process.argv.includes('--sql')) {
  const chunks = [
    '-- Full seed for guided 7-day programs: Amor, Dinero, Salud',
    '-- 4 meditations + 26 intermediate messages per day.',
    ''
  ];
  for (let pi=0; pi<content.plans.length; pi++) {
    const plan = content.plans[pi];
    const slug = slugs[plan.id];
    chunks.push(`insert into public.collections (slug,title,description,collection_type,is_published,sort_order) values (${sqlLit(slug)},${sqlLit(plan.title)},${sqlLit('Programa guiado de 7 días con 4 meditaciones diarias y mensajes intermedios')},'taller',true,${10+pi}) on conflict (slug) do update set title=excluded.title,description=excluded.description,collection_type=excluded.collection_type,is_published=excluded.is_published,sort_order=excluded.sort_order,updated_at=now();`);
    for (const day of plan.days) {
      const [f,v,s,a,r] = cfg[plan.id][day.day-1];
      const messages = templates.map((t) => replaceTokens(t,[f,v,s,a,r]));
      const m = day.meditations;
      const body = [
        `# Día ${day.day} - ${day.title}`,
        `## Meditación de la mañana\n\n${m.manana}`,
        `## Meditación del mediodía\n\n${m.mediodia}`,
        `## Meditación de la tarde\n\n${m.tarde}`,
        `## Meditación de la noche\n\n${m.noche}`,
        '---',
        messages.map((msg,i)=>`${i+1}. ${msg}`).join('\n\n'),
      ].join('\n\n');
      const itemSlug = `${slug}-dia-${day.day}`;
      const metadata = JSON.stringify({dia:day.day,programa:plan.id,tipo:'normal'});
      chunks.push(`insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values (${sqlLit(itemSlug)},'guided_day',${sqlLit(`Día ${day.day}`)},${sqlLit(body)},${sqlLit(`internal://${slug}/dia-${day.day}`)},'public',true,${sqlLit(metadata)}::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();`);
      chunks.push(`insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,${day.day} from public.collections c join public.content_items i on i.slug=${sqlLit(itemSlug)} where c.slug=${sqlLit(slug)} on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;`);
    }
    chunks.push('');
  }
  const out = path.join(root, 'supabase/migrations/20260916103000_seed_guided_7_day_content.sql');
  fs.writeFileSync(out, chunks.join('\n\n'));
  console.log(out);
  process.exit(0);
}

async function api(method, endpoint, body) {
  const res = await fetch(`${base}/${endpoint}`, {
    method,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type':'application/json', Prefer:'resolution=merge-duplicates,return=representation' },
    body: body == null ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${endpoint}: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}

for (let pi=0; pi<content.plans.length; pi++) {
  const plan = content.plans[pi];
  const slug = slugs[plan.id];
  const [collection] = await api('POST', `collections?on_conflict=slug`, {
    slug, title: plan.title,
    description: 'Programa guiado de 7 días con 4 meditaciones diarias y mensajes intermedios',
    collection_type: 'taller', is_published: true, sort_order: 10 + pi,
  });
  for (const day of plan.days) {
    const [f,v,s,a,r] = cfg[plan.id][day.day-1];
    const messages = templates.map((t) => replaceTokens(t,[f,v,s,a,r]));
    const m = day.meditations;
    const body = [
      `# Día ${day.day} - ${day.title}`,
      `## Meditación de la mañana\n\n${m.manana}`,
      `## Meditación del mediodía\n\n${m.mediodia}`,
      `## Meditación de la tarde\n\n${m.tarde}`,
      `## Meditación de la noche\n\n${m.noche}`,
      '---',
      messages.map((msg,i)=>`${i+1}. ${msg}`).join('\n\n'),
    ].join('\n\n');
    const itemSlug = `${slug}-dia-${day.day}`;
    const [item] = await api('POST', `content_items?on_conflict=slug`, {
      slug: itemSlug, content_type: 'guided_day', title: `Día ${day.day}`, body,
      source_url: `internal://${slug}/dia-${day.day}`, visibility:'public', is_published:true,
      metadata: { dia: day.day, programa: plan.id, tipo:'normal' },
    });
    await api('POST', `collection_items?on_conflict=collection_id,content_id`, {
      collection_id: collection.id, content_id: item.id, sort_order: day.day,
    });
  }
  console.log(`OK ${slug}`);
}
