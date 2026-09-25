-- Nombres visibles de "Meditaciones para ahora".
-- El PDF de producción trae 14 situaciones x 5 meditaciones (70 nombres).
-- La situación 15 ya existía en producción; se completa con 5 nombres nuevos
-- coherentes con su contenido actual. No se toca el cuerpo de ninguna meditación.

with moment_names(sort_order, title, meditation_titles) as (
  values
    (1, 'Antes de una reunión, entrevista o examen', array[
      'Ocupá el final antes de entrar',
      'Sentí la felicitación',
      'Firmá el resultado',
      'Asumí el estado de quien ya lo logró',
      'Actuá desde el final, no hacia él'
    ]::text[]),
    (2, 'Cuando te agarra la ansiedad', array[
      'Dejá de imaginar lo que temés',
      'Volvé a "Yo Soy"',
      'Rompé el diálogo interno',
      'Sentí la paz de después',
      'Revalorizáte'
    ]::text[]),
    (3, 'Cuando no podés parar la cabeza para dormir', array[
      'Tu última impresión antes de dormir',
      'La nube que asciende',
      'Revisá el día en vez de revivirlo',
      'El anillo imaginario',
      'Dormite en el estado, no en el problema'
    ]::text[]),
    (4, 'Cuando te peleaste con alguien', array[
      'Revisá la pelea esta noche',
      'Perdoná con imaginación, no con voluntad',
      'Cambiá tu diálogo interno sobre esa persona',
      'Vé a la persona como querés que sea',
      'No lleves la pelea a la cama'
    ]::text[]),
    (5, 'Cuando te llegó una mala noticia', array[
      'Reescribí la carta',
      'No le des estatus de verdad final',
      'Usá la noticia como combustible para la revisión',
      'No repitas la mala noticia',
      'Plantá una impresión nueva esta noche'
    ]::text[]),
    (6, 'Antes de tomar una decisión difícil', array[
      'Decidí qué querés antes de decidir cómo',
      'Imaginá que ya decidiste y salió bien',
      'Soltá el control del cómo',
      'Consultá tu estado, no tu razón',
      'La decisión es un acto de asunción'
    ]::text[]),
    (7, 'Cuando te sentís solo', array[
      'Tu concepto de vos determina tu compañía',
      'Imaginá por los demás',
      'Cambiá la historia que te contás',
      'La soledad como estado, no como circunstancia',
      'Sentí que ya sos parte de algo'
    ]::text[]),
    (8, 'Cuando estás bajoneado sin saber por qué', array[
      'Observá tu diálogo sin juzgarlo',
      'Volvé al Yo Soy',
      'Revisá algo de ayer',
      'Asumí que el bajón ya pasó',
      'Ocupá otro estado deliberadamente'
    ]::text[]),
    (9, 'Antes de hablar en público', array[
      'Ya hablaste y salió bien',
      'Revalorizáte antes de subir',
      'Sentí los aplausos',
      'Tu diálogo interno antes de hablar',
      'La voz del que ya habló mil veces'
    ]::text[]),
    (10, 'Cuando te ataca la culpa', array[
      'La revisión es el antídoto de la culpa',
      'No te condenes',
      'La culpa no repara nada',
      'Soltá el error y cambiá el estado',
      'Perdonáte como perdonarías a otro'
    ]::text[]),
    (11, 'Para arrancar el día con fuerza', array[
      'Definí tu estado antes de abrir los ojos',
      'Diálogo interno matutino',
      'Sentí la naturalidad del bien',
      'Ocupá el estado del que ya lo logró',
      '"Yo Soy" como arranque'
    ]::text[]),
    (12, 'Para cerrar el día en paz', array[
      'Revisá el día completo',
      'Elegí tu última impresión',
      'Agradecé lo que hoy salió bien',
      'Soltá el día como una nube',
      'Dormite siendo quien elegiste ser'
    ]::text[]),
    (13, 'Cuando tenés miedo de algo', array[
      'El miedo es imaginación al revés',
      'Los gigantes son saltamontes',
      'No temas, el coraje es necesario',
      'Asumí la seguridad',
      'Imaginá que lo que temés ya pasó y estás bien'
    ]::text[]),
    (14, 'Cuando querés sentirte mejor rápido', array[
      '¿No es maravilloso?',
      'Tres respiraciones con intención',
      'Cambiá de estado en un segundo',
      'Revisá lo último que te bajó',
      'Ocupá tu mejor estado por un minuto'
    ]::text[]),
    (15, 'Cuando necesitás un envión de seguridad', array[
      'Volvé al momento en que pudiste',
      'Recordá la versión de vos que la rompe',
      'Ponete el traje de la seguridad',
      'El coraje va antes que la evidencia',
      'Actuá desde el que sabe que puede'
    ]::text[])
)
update public.content_items c
set
  title = n.title,
  metadata = coalesce(c.metadata, '{}'::jsonb) || jsonb_build_object('meditation_titles', to_jsonb(n.meditation_titles)),
  updated_at = now()
from moment_names n
where c.content_type = 'moment'
  and (c.metadata->>'sort_order')::int = n.sort_order;

do $$
declare
  moment_count integer;
  named_count integer;
begin
  select count(*) into moment_count
  from public.content_items
  where content_type = 'moment' and is_published = true;

  select count(*) into named_count
  from public.content_items
  where content_type = 'moment'
    and is_published = true
    and jsonb_typeof(metadata->'meditation_titles') = 'array'
    and jsonb_array_length(metadata->'meditation_titles') = 5;

  if moment_count <> 15 or named_count <> 15 then
    raise exception 'Meditation title validation failed: moments %, named %', moment_count, named_count;
  end if;
end $$;
