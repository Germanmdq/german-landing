import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE = path.resolve('..','websiteprompts-report-2026-10-19');

const titleMap = {
  'Bridal Shop':'Boutique de Novias','Care Home':'Residencia para Mayores','Trucking Company':'Empresa de Transporte','Gutter Cleaning':'Limpieza de Canaletas','Wedding Cake':'Tortas de Casamiento','Voice Over':'Locución Profesional','Airport Transfer':'Traslados al Aeropuerto','Game Studio':'Estudio de Videojuegos','Real Estate Photography':'Fotografía Inmobiliaria','Art Studio':'Estudio de Arte','Life Insurance':'Seguros de Vida','Dog Walking':'Paseo de Perros','Virtual Assistant':'Asistente Virtual','Farmers Market':'Mercado de Productores','Smart Home':'Hogar Inteligente','Auto Glass':'Cristales para Autos','Video Production':'Productora Audiovisual','Newsletter Landing Page':'Newsletter','Photo Booth':'Cabina de Fotos','Esthetician':'Estética Profesional','Waitlist Landing Page':'Lista de Espera','Farm':'Granja','Recording Studio':'Estudio de Grabación','Junk Removal':'Retiro de Escombros','Travel Blog':'Blog de Viajes','Towing':'Auxilio Mecánico','Appliance Repair':'Reparación de Electrodomésticos','Painter':'Pintura Profesional','Ebook Landing Page':'Ebook','Personal Brand':'Marca Personal','Pool Service':'Servicio de Piscinas','App Landing Page':'Aplicación Móvil','SaaS Landing Page':'SaaS','Candle Shop':'Tienda de Velas','Theater':'Teatro','Pet Store':'Tienda de Mascotas','Notary':'Escribanía','Locksmith':'Cerrajería','Print Shop':'Imprenta','Perfume Brand':'Marca de Perfumes','Skincare Brand':'Skincare','Museum':'Museo','Funeral Home':'Casa Velatoria','Manufacturing':'Industria / Manufactura','Flooring':'Pisos y Revestimientos','Handyman':'Servicios para el Hogar','Paintball':'Paintball','Nightclub':'Discoteca','Car Rental':'Alquiler de Autos','Window Cleaning':'Limpieza de Vidrios','Music Store':'Tienda de Música','Tree Service':'Poda y Árboles','Bed and Breakfast':'Alojamiento Boutique','Tennis Club':'Club de Tenis','Pet Boarding':'Guardería de Mascotas','Tailor':'Sastrería','Laundromat':'Lavandería','Bike Shop':'Bicicletería','Medical Clinic':'Clínica Médica','Insurance Agency':'Agencia de Seguros','SEO Agency':'Agencia SEO','Campground':'Camping','Dry Cleaner':'Tintorería','Self Storage':'Guardamuebles','IT Support':'Soporte IT','Butcher Shop':'Carnicería','Art Gallery':'Galería de Arte','Bowling Alley':'Bowling','Pharmacy':'Farmacia','Pizzeria':'Pizzería','Security Company':'Empresa de Seguridad','Bookstore':'Librería','Golf Club':'Club de Golf','Church':'Iglesia','Furniture Store':'Mueblería','Car Dealership':'Concesionaria','Winery':'Bodega','Consulting Firm':'Consultora','Nonprofit Organization':'ONG','Property Management':'Administración de Propiedades','Dermatology Clinic':'Clínica Dermatológica','Construction Company':'Constructora','Martial Arts Academy':'Academia de Artes Marciales','Music Venue AI':'Sala de Conciertos','Psychologist AI':'Psicología','Home Inspector AI':'Inspección de Propiedades','Tutoring AI':'Clases Particulares','Social Media Agency AI':'Agencia de Redes Sociales','Clothing Boutique AI':'Boutique de Ropa','Wedding Planner AI':'Wedding Planner','Med Spa AI':'Med Spa','Solar Company AI':'Energía Solar','Orthodontist AI':'Ortodoncia','Ice Cream Shop AI':'Heladería','Acupuncture Clinic AI':'Acupuntura','Personal Stylist AI':'Asesoría de Imagen','Language School AI':'Instituto de Idiomas','Vacation Rental AI':'Alquiler Vacacional','Driving School AI':'Autoescuela','Craft Brewery AI':'Cervecería Artesanal','Dog Trainer AI':'Adiestramiento Canino','Boxing Gym AI':'Gimnasio de Boxeo','Massage Therapist AI':'Masajes','Tattoo Studio':'Estudio de Tatuajes','Florist':'Florería','Yoga Studio':'Estudio de Yoga','Hair Salon':'Peluquería','Photography Studio':'Estudio Fotográfico','Law Firm':'Estudio Jurídico','Personal Trainer':'Entrenador Personal','Interior Design':'Diseño de Interiores','Real Estate Agent':'Agente Inmobiliario','Restaurant':'Restaurante','Dog Groomer (Boutique) AI':'Peluquería Canina Boutique','Wedding Venue (Romantic) AI':'Salón para Bodas','Coffee Shop (Dark) AI':'Cafetería','Finance Advisor AI':'Asesor Financiero','Therapist AI':'Terapia','Mechanic AI':'Taller Mecánico','Car Wash AI':'Lavadero de Autos','Escape Room AI':'Escape Room','Ceramics Studio AI':'Estudio de Cerámica','Food Truck AI':'Food Truck','Podcast AI':'Podcast','Roofing Company AI':'Techos y Cubiertas','CrossFit Gym AI':'CrossFit','Optician AI':'Óptica','Music School AI':'Escuela de Música','Dance Studio AI':'Estudio de Danza','Surf School AI':'Escuela de Surf','Branding Agency AI':'Agencia de Branding','Chiropractor AI':'Quiropraxia','Wine Bar AI':'Wine Bar','Jeweler AI':'Joyería','Cocktail Bar AI':'Coctelería','Boutique Hotel AI':'Hotel Boutique','Online Course AI':'Curso Online','Childcare Nursery AI':'Jardín Maternal','Digital Agency AI':'Agencia Digital','Moving Company AI':'Mudanzas','Recruitment Agency AI':'Recruitment','Event Planner AI':'Organización de Eventos','Vet Clinic AI':'Veterinaria','Makeup Artist AI':'Maquillaje Profesional','Travel Agency AI':'Agencia de Viajes','Physiotherapist AI':'Fisioterapia','Florist AI':'Florería','Hair Salon AI':'Peluquería','Life Coach AI':'Life Coach','Mortgage Broker AI':'Créditos Hipotecarios','Dog Groomer AI':'Peluquería Canina','Gym AI':'Gimnasio','Pilates Studio AI':'Pilates','Wedding Venue AI':'Salón de Eventos','Coffee Shop AI':'Cafetería','Accountant':'Contador','Personal Chef':'Chef Personal','Architect':'Arquitectura','Sports Coach':'Coach Deportivo','Music Producer':'Productor Musical','Pest Control':'Control de Plagas','Developer Portfolio':'Portfolio de Desarrollador','Designer Portfolio':'Portfolio de Diseñador','Lawyer':'Abogado','Copywriter':'Copywriter','Nutritionist AI':'Nutrición','Artist Portfolio AI':'Portfolio de Artista','Interior Design AI':'Diseño de Interiores','Barber AI':'Barbería','Retail SaaS AI':'SaaS para Retail','Health SaaS AI':'SaaS de Salud','DJ AI':'DJ','Nail Salon AI':'Salón de Uñas','Run Club AI':'Running Club','Catering AI':'Catering','Electrician AI':'Electricista','Swim Coach AI':'Coach de Natación','Band AI':'Banda Musical','Dentist AI':'Odontología','Photographer AI':'Fotografía','HVAC AI':'Climatización','Bakery AI':'Panadería','Cleaning Service AI':'Servicio de Limpieza','Tattoo Studio AI':'Estudio de Tatuajes','Car Detailing AI':'Detailing Automotor','Spa & Wellness AI':'Spa & Bienestar','Plumber AI':'Plomería','Landscaping Business AI':'Paisajismo','Personal Trainer AI':'Entrenador Personal'
};

function category(title){
  const s=title.toLowerCase();
  if(/travel|hotel|vacation|airport|campground|bed and breakfast|surf|winery/.test(s)) return 'Viajes & Turismo';
  if(/restaurant|pizzeria|coffee|bakery|food|catering|brewery|butcher|ice cream|cocktail|wine bar|chef/.test(s)) return 'Gastronomía';
  if(/medical|clinic|dermat|psych|therap|physio|dent|ortho|acupuncture|chiropr|pharmacy|health|nutrition|spa|massage/.test(s)) return 'Salud & Bienestar';
  if(/salon|beauty|esthetic|skincare|makeup|nail|barber|stylist|bridal|wedding|jewel|perfume|clothing/.test(s)) return 'Belleza & Moda';
  if(/gym|fitness|trainer|coach|tennis|golf|boxing|crossfit|martial|run club|swim/.test(s)) return 'Fitness & Deportes';
  if(/saas|app landing|digital agency|seo|it support|developer|designer portfolio|newsletter|waitlist/.test(s)) return 'Tecnología & SaaS';
  if(/real estate|property|architect|interior design|construction|flooring|landscap|home inspector|solar/.test(s)) return 'Inmuebles & Hogar';
  if(/music|dj|band|podcast|recording|theater|museum|gallery|artist|photo|video|tattoo|ceramics|game studio/.test(s)) return 'Creativos & Entretenimiento';
  return 'Servicios & Negocios';
}

function tags(desc=''){
  const s=desc.toLowerCase(), out=[];
  if(/near-black|pure black|dark|charcoal|midnight|navy/.test(s)) out.push('Oscura'); else out.push('Clara');
  if(/editorial|serif|masonry|cinematic/.test(s)) out.push('Editorial');
  if(/minimal|white cube|clean white|ultra minimal/.test(s)) out.push('Minimalista');
  if(/animat|scroll|parallax|ticker|waveform|counter|crossfade|reveal|morph|draw/.test(s)) out.push('Animada');
  if(/3d|floating|tilted|depth|parallax/.test(s)) out.push('3D / Profundidad');
  return [...new Set(out)];
}

function salesDescription(titulo, desc){
  const tg=tags(desc);
  const style=tg.includes('Oscura')?'oscura y de alto impacto':tg.includes('Editorial')?'editorial y premium':'moderna y profesional';
  return `Landing ${style} para ${titulo.toLowerCase()}. Se adapta a tu marca, tus textos, tus imágenes y tu propuesta comercial.`;
}

function parseCSVLine(line){
  const out=[]; let cur='', q=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"') { if(q && line[i+1]==='"'){cur+='"';i++;} else q=!q; }
    else if(c===',' && !q){out.push(cur);cur='';} else cur+=c;
  }
  out.push(cur); return out;
}

const csv = await fs.readFile(path.join(SOURCE,'INDICE.csv'),'utf8');
const lines=csv.trim().split(/\r?\n/).slice(1);
const rows=lines.map(parseCSVLine);
const publicDir=path.join(ROOT,'public','previews');
await fs.mkdir(publicDir,{recursive:true});

const data=[];
for(const r of rows){
  const [n,tipo,,slug,url,descripcion,captura]=r;
  const titulo=titleMap[tipo] || tipo.replace(/ AI$/,'');
  const src=path.join(SOURCE,'capturas',captura);
  const dst=path.join(publicDir,captura);
  await fs.copyFile(src,dst);
  data.push({
    id:Number(n), titulo, slug, categoria:category(tipo),
    descripcion:salesDescription(titulo,descripcion),
    tags:tags(descripcion), ideal:titulo,
    imagen:`/previews/${captura}`,
    referencia:url
  });
}
await fs.writeFile(path.join(ROOT,'src','templates.json'),JSON.stringify(data,null,2));
console.log(`Generadas ${data.length} plantillas`);
