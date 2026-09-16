-- Full seed for guided 7-day programs: Amor, Dinero, Salud

-- 4 meditations + 26 intermediate messages per day.



insert into public.collections (slug,title,description,collection_type,is_published,sort_order) values ('practica-7-dias-amor','Amor y relaciones','Programa guiado de 7 días con 4 meditaciones diarias y mensajes intermedios','taller',true,10) on conflict (slug) do update set title=excluded.title,description=excluded.description,collection_type=excluded.collection_type,is_published=excluded.is_published,sort_order=excluded.sort_order,updated_at=now();

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-amor-dia-1','guided_day','Día 1','# Día 1 - AMARTE A VOS MISMO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Antes de buscar amor afuera, empecemos por donde todo empieza de verdad: vos. Porque no podes recibir de afuera lo que no te das adentro. Si no te queres, ningun amor se queda; se escurre, no encuentra donde apoyarse.

Hoy quiero que te trates distinto. Que te hables como le hablarias a alguien que amas. Con paciencia, con ternura, sin ese latigo interno que tenes siempre listo.

Sentí ahora, por un momento, que sos suficiente. Asi como estas, sin cambiar nada, sin lograr nada mas. Suficiente. Digno de amor. Ya.

Abri los ojos. Hoy salis al dia queriendote un poco mas. Y eso cambia como te ve el mundo.

## Meditación del mediodía

Frena un minuto.

Fijate como te hablaste en lo que va del dia. ¿Con respeto o con dureza? ¿Te felicitaste por algo o solo te marcaste lo que hiciste mal?

La forma en que te hablas por dentro es la relacion mas importante de tu vida. Es el molde de todas las demas. Si adentro hay maltrato, afuera vas a atraer maltrato. Si adentro hay amor, afuera se abre el amor.

Cerra los ojos. Date una frase amable ahora. Una sola. "Estoy haciendo lo que puedo." "Merezco cosas buenas." "Estoy bien asi." Sentila, no la digas de memoria.

Abri los ojos. Te trataste con amor. Seguí asi el resto del dia.

## Meditación de la tarde

Para. Respira.

Hay una idea que capaz nunca escuchaste asi de clara: nadie puede amar a otro mas de lo que se ama a si mismo. El amor que le das al mundo es el sobrante del amor que te das a vos. Si el tanque esta vacio, no tenes de donde dar.

Por eso amarte no es egoismo. Es la condicion para amar bien. Es llenar el tanque para poder repartir.

Cerra los ojos. Imaginate como te veria alguien que te ama profundamente. No con tus ojos criticos: con los de ese amor. ¿Que veria? Algo valioso, algo unico, algo digno. Miralo vos tambien, aunque sea por un momento.

Abri los ojos. Te viste con amor. Ese es el molde de todo lo que viene.

## Meditación de la noche

Acostate. Afloja todo el cuerpo: pies, piernas, panza, hombros, mandibula, frente. Tres respiraciones lentas.

El momento de dormirte es el mas poderoso del dia. Lo que sentis justo antes de dormir se graba profundo y trabaja toda la noche.

Esta noche, dormite queriendote. Repasa el dia, y en vez de buscar lo que hiciste mal, encontrá una cosa que hiciste bien. Una sola. Y agradecetela.

Sentí que te abrazas a vos mismo. Que hacen las paces, vos y vos. Que despues de tanto exigirte, por fin te tratas con carino.

Dormite en ese abrazo. Manana te vas a despertar con mas amor para dar, porque anoche te lo diste a vos.

Que descanses queriendote.

---

1. Chequeo rápido: hoy el foco es tratarte con amor y respeto. No hace falta hacerlo perfecto. Volvé ahora a hablarte como a alguien que querés.

2. Fijate desde dónde estás pensando esto. Si caíste en dejar de exigirte, no te castigues. Elegí otra vez sentirte suficiente.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: el amor empieza en vos.

4. No busques una señal afuera en este momento. Primero ordená adentro: tratarte con amor y respeto. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentirte suficiente? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: hablarte como a alguien que querés.

7. No necesitás intensidad. Necesitás repetición. Volvé a tratarte con amor y respeto hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: el amor empieza en vos. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: hablarte como a alguien que querés.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentirte suficiente por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo tratarte con amor y respeto.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentirte suficiente. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar el amor empieza en vos.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: hablarte como a alguien que querés.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentirte suficiente ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con tratarte con amor y respeto, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: el amor empieza en vos.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para hablarte como a alguien que querés. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es tratarte con amor y respeto.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentirte suficiente.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a tratarte con amor y respeto.

23. El hábito viejo quiere que vuelvas automático a dejar de exigirte. Hoy interrumpilo con una decisión consciente: hablarte como a alguien que querés.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentirte suficiente.

25. Guardate esta idea para el resto del día: el amor empieza en vos. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a tratarte con amor y respeto.','internal://practica-7-dias-amor/dia-1','public',true,'{"dia":1,"programa":"amor","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,1 from public.collections c join public.content_items i on i.slug='practica-7-dias-amor-dia-1' where c.slug='practica-7-dias-amor' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-amor-dia-2','guided_day','Día 2','# Día 2 - SENTIR QUE YA SOS AMADO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Ayer trabajamos el amor por vos. Hoy damos un paso: sentir que ya sos amado. No desear serlo, no esperar serlo: sentir que ya lo sos.

Porque el sentimiento es la clave. Lo que sentis como real, se vuelve tu experiencia. Si sentis que sos amado, el mundo empieza a confirmarlo. Si sentis que estas solo, el mundo confirma eso.

Sentí ahora que sos amado. No pienses quien, ni como, ni cuando. Solo el sentimiento: la calidez de saber que alguien te elige, la tranquilidad de ser importante para alguien, la paz de no estar solo.

Abri los ojos. Hoy caminas sintiendote amado. El mundo va a responder a eso.

## Meditación del mediodía

Frena un minuto.

¿Notaste que cuando estas de buen animo la gente se acerca mas? ¿Y que cuando estas cerrado, todos parecen esquivarte? No es casualidad. Tu estado interior es un iman. Atrae lo que le hace juego.

Si caminas en el estado de "nadie me quiere", atraes distancia. Si caminas en el estado de "soy querido", atraes cercania.

Cerra los ojos. Ponete el estado de ser amado, como quien se pone un abrigo. Sentí como cambia tu postura, tu respiracion, tu cara. Desde ahi, sali al resto del dia.

Abri los ojos. Cambiaste el iman. Fijate a quien atraes ahora.

## Meditación de la tarde

Para. Respira.

Hay una diferencia enorme entre pensar en el amor y sentir el amor. Pensar en el amor es desearlo desde afuera, con la nariz pegada al vidrio, mirando lo que no tenes. Sentir el amor es vivirlo desde adentro, como si ya fuera tuyo.

Hoy, deja de pensar en el amor que te falta. Sentí el amor que ya podes generar adentro tuyo, ahora mismo, sin que nadie te lo de.

Cerra los ojos. Llena el pecho de amor. No dirigido a nadie: puro. Como una fuente que brota de adentro. Sentí que rebasa, que sobra, que se derrama. Ese amor no depende de nadie. Es tuyo, y ya lo tenes.

Abri los ojos. Generaste amor sin que nadie te lo diera. Ese es tu poder.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, dormite en el sentimiento de ser amado. No importa tu situacion real: en el borde del sueño, la situacion no manda. Manda lo que sentis.

Imagina que alguien que te ama esta cerca. Sentí su presencia, su calor, su carino. O si preferis, sentí el amor sin cara: puro, envolvente, tibio. Como una manta que te cubre.

Dejate dormir adentro de ese sentimiento. Tu ser profundo lo toma y trabaja sobre eso toda la noche. Y manana, algo se mueve en la direccion del amor.

Que descanses sintiendote amado.

---

1. Chequeo rápido: hoy el foco es habitar el estado de ser amado. No hace falta hacerlo perfecto. Volvé ahora a caminar como alguien querido.

2. Fijate desde dónde estás pensando esto. Si caíste en esperar pruebas de afuera, no te castigues. Elegí otra vez sentir cercanía y elección.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: lo de adentro cambia lo que recibís.

4. No busques una señal afuera en este momento. Primero ordená adentro: habitar el estado de ser amado. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir cercanía y elección? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: caminar como alguien querido.

7. No necesitás intensidad. Necesitás repetición. Volvé a habitar el estado de ser amado hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: lo de adentro cambia lo que recibís. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: caminar como alguien querido.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir cercanía y elección por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo habitar el estado de ser amado.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir cercanía y elección. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar lo de adentro cambia lo que recibís.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: caminar como alguien querido.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir cercanía y elección ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con habitar el estado de ser amado, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: lo de adentro cambia lo que recibís.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para caminar como alguien querido. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es habitar el estado de ser amado.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir cercanía y elección.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a habitar el estado de ser amado.

23. El hábito viejo quiere que vuelvas automático a esperar pruebas de afuera. Hoy interrumpilo con una decisión consciente: caminar como alguien querido.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir cercanía y elección.

25. Guardate esta idea para el resto del día: lo de adentro cambia lo que recibís. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a habitar el estado de ser amado.','internal://practica-7-dias-amor/dia-2','public',true,'{"dia":2,"programa":"amor","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,2 from public.collections c join public.content_items i on i.slug='practica-7-dias-amor-dia-2' where c.slug='practica-7-dias-amor' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-amor-dia-3','guided_day','Día 3','# Día 3 - LA ESCENA DEL AMOR

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Hoy aprendes la herramienta mas poderosa: la escena. En vez de desear amor en abstracto, vas a construir una escena corta, concreta, que solo podria existir si el amor ya estuviera en tu vida.

No la cosa: la escena que la da por hecha. Un abrazo. Una frase al oido. Una mano que busca la tuya. Un "te amo" que te dicen mirandote a los ojos.

Elegí una escena chiquita ahora. Diez segundos. Y metete adentro: sentí el tacto, escucha la voz, sentí la emocion. No la mires de afuera como una pelicula: vivila como protagonista.

Abri los ojos. Plantaste una escena de amor. Tu imaginacion la va a hacer crecer.

## Meditación del mediodía

Frena un minuto.

La escena que armaste a la mañana no es fantasia. Es una semilla. Y las semillas, si las sostenes, crecen. Lo que imaginas con sentimiento, se abre camino hacia tu realidad.

Cerra los ojos. Volve a esa escena de amor. La misma. No la cambies: repetila. Como quien riega la misma planta todos los dias. El abrazo, la voz, la emocion.

Cuanto mas la repetis, mas real se vuelve por dentro. Y lo que es real por dentro, tiende a volverse real por fuera.

Abri los ojos. Regaste la semilla. Va creciendo.

## Meditación de la tarde

Para. Respira.

Una escena bien hecha tiene un secreto: la naturalidad. No la fuerces, no la actues con esfuerzo. Vivila como algo obvio, como algo que ya es tuyo, como cuando recordas algo que paso de verdad.

Cerra los ojos. Volve a tu escena de amor, pero esta vez con calma, sin apuro, con la naturalidad de un recuerdo. Como si ya hubiera pasado y solo lo estuvieras recordando con una sonrisa.

Ese tono de "ya paso" es lo que la hace poderosa. No "ojala pase": "ya paso, que lindo fue".

Abri los ojos. Le diste a tu escena el tono de lo real. Sostenela.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche es la mas importante para tu escena. Antes de dormirte, entrá en ella una vez mas. La misma escena de amor, vivida con los sentidos, repetida despacio mientras el sueño te gana.

Que sea lo ultimo que pasa por tu mente antes de dormir. La escena del amor cumplido. El abrazo, la voz, la emocion.

No busques que aparezca manana. No la controles. Solo vivila y dejate dormir adentro de ella. Tu poder creador trabaja toda la noche sobre la ultima imagen del dia. Dale la del amor.

Que descanses en tu escena.

---

1. Chequeo rápido: hoy el foco es volver a una escena breve de amor cumplido. No hace falta hacerlo perfecto. Volvé ahora a repetir la misma escena.

2. Fijate desde dónde estás pensando esto. Si caíste en mirar el deseo desde afuera, no te castigues. Elegí otra vez sentir el abrazo o la voz como presente.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: una escena simple sostenida alcanza.

4. No busques una señal afuera en este momento. Primero ordená adentro: volver a una escena breve de amor cumplido. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir el abrazo o la voz como presente? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: repetir la misma escena.

7. No necesitás intensidad. Necesitás repetición. Volvé a volver a una escena breve de amor cumplido hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: una escena simple sostenida alcanza. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: repetir la misma escena.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir el abrazo o la voz como presente por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo volver a una escena breve de amor cumplido.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir el abrazo o la voz como presente. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar una escena simple sostenida alcanza.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: repetir la misma escena.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir el abrazo o la voz como presente ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con volver a una escena breve de amor cumplido, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: una escena simple sostenida alcanza.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para repetir la misma escena. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es volver a una escena breve de amor cumplido.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir el abrazo o la voz como presente.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a volver a una escena breve de amor cumplido.

23. El hábito viejo quiere que vuelvas automático a mirar el deseo desde afuera. Hoy interrumpilo con una decisión consciente: repetir la misma escena.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir el abrazo o la voz como presente.

25. Guardate esta idea para el resto del día: una escena simple sostenida alcanza. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a volver a una escena breve de amor cumplido.','internal://practica-7-dias-amor/dia-3','public',true,'{"dia":3,"programa":"amor","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,3 from public.collections c join public.content_items i on i.slug='practica-7-dias-amor-dia-3' where c.slug='practica-7-dias-amor' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-amor-dia-4','guided_day','Día 4','# Día 4 - LA CONVERSACION INTERNA

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Todo el dia estas teniendo conversaciones internas. Discutis con alguien, ensayas lo que vas a decir, repasas lo que te dijeron. Y casi nunca te das cuenta. Pero esas charlas invisibles estan creando tu mundo.

Si por dentro discutis con tu pareja, creas discusiones. Si por dentro alguien te rechaza, creas rechazo. Si por dentro alguien te dice cosas lindas, creas eso.

Hoy, vigila tus conversaciones internas. Y cuando te descubras en una que no te gusta, cambiala. Imagina en cambio una charla amorosa: alguien que te dice algo lindo, y vos respondes con alegria.

Abri los ojos. Hoy elegis tus conversaciones internas. Elegí las de amor.

## Meditación del mediodía

Frena un minuto.

¿Que conversacion tuviste en tu cabeza en lo que va del dia? Fijate. ¿Fue de queja, de reproche, de pelea? ¿O de gratitud, de carino, de alegria?

Cada conversacion interna es una semilla. Y crece. Si venis sembrando peleas imaginarias, no te extrañes de encontrar peleas reales.

Cerra los ojos. Armá ahora una conversacion interna hermosa. Imagina que alguien que te importa te dice exactamente lo que siempre quisiste escuchar. Escucha las palabras. Y respondé con el corazon.

Abri los ojos. Sembraste una conversacion de amor. Va a dar fruto.

## Meditación de la tarde

Para. Respira.

Neville decia que las conversaciones internas del hombre crean su mundo. No lo que decis en voz alta: lo que decis por dentro, todo el dia, sin parar.

Y aca esta el poder: podes elegirlas. No tenes que aguantar la radio de la queja. Podes cambiar de estacion cuando quieras.

Cerra los ojos. Imagina una conversacion con la persona que amas, o que vas a amar, donde todo esta bien. Se rien, se entienden, se eligen. Escucha esa charla como si estuviera pasando ahora.

Abri los ojos. Cambiaste de estacion. Ahora suena amor.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, antes de dormir, tene una ultima conversacion interna. La mas linda del dia.

Imagina que alguien que amas te habla al oido, en la oscuridad, antes de dormir. Te dice que te ama, que se alegra de tenerte, que no se imagina la vida sin vos. Escucha cada palabra. Sentí la emocion.

Y respondé, por dentro, con todo tu amor. Dejá que esa conversacion sea lo ultimo que suena en tu cabeza mientras te dormis.

Tu ser profundo va a tomar esa charla y va a trabajar para hacerla real.

Que descanses en esa conversacion.

---

1. Chequeo rápido: hoy el foco es cuidar tu conversación interna. No hace falta hacerlo perfecto. Volvé ahora a cambiar una frase interna.

2. Fijate desde dónde estás pensando esto. Si caíste en ensayar peleas o rechazo, no te castigues. Elegí otra vez escuchar palabras de amor y acuerdo.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: tu diálogo interno marca el tono.

4. No busques una señal afuera en este momento. Primero ordená adentro: cuidar tu conversación interna. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural escuchar palabras de amor y acuerdo? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: cambiar una frase interna.

7. No necesitás intensidad. Necesitás repetición. Volvé a cuidar tu conversación interna hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: tu diálogo interno marca el tono. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: cambiar una frase interna.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar escuchar palabras de amor y acuerdo por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo cuidar tu conversación interna.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí escuchar palabras de amor y acuerdo. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar tu diálogo interno marca el tono.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: cambiar una frase interna.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí escuchar palabras de amor y acuerdo ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con cuidar tu conversación interna, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: tu diálogo interno marca el tono.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para cambiar una frase interna. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es cuidar tu conversación interna.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez escuchar palabras de amor y acuerdo.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a cuidar tu conversación interna.

23. El hábito viejo quiere que vuelvas automático a ensayar peleas o rechazo. Hoy interrumpilo con una decisión consciente: cambiar una frase interna.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de escuchar palabras de amor y acuerdo.

25. Guardate esta idea para el resto del día: tu diálogo interno marca el tono. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a cuidar tu conversación interna.','internal://practica-7-dias-amor/dia-4','public',true,'{"dia":4,"programa":"amor","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,4 from public.collections c join public.content_items i on i.slug='practica-7-dias-amor-dia-4' where c.slug='practica-7-dias-amor' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-amor-dia-5','guided_day','Día 5','# Día 5 - REESCRIBIR EL PASADO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Casi todos cargamos heridas del amor. Un rechazo, una traicion, alguien que se fue, alguien que nos lastimo. Y esas heridas, si las seguis cargando, contaminan todo el amor nuevo que quiere entrar.

Hoy vamos a aprender a soltar el pasado. No olvidarlo: reescribirlo. Cambiar como lo sentis, para quitarle el poder que tiene sobre vos.

Pensá en una herida del amor. No la mas grave: elegí una que puedas mirar sin quebrarte. Y por hoy, solo reconocela. "Esto me paso. Me dolio. Y estoy listo para soltarlo."

Abri los ojos. Reconociste la herida. Hoy empezamos a soltarla.

## Meditación del mediodía

Frena un minuto.

Neville enseñaba una tecnica que llamaba la revision. Consiste en tomar un momento del pasado que te dolio y reimaginarlo como te hubiera gustado que fuera. No para mentirte: para liberarte.

Cerra los ojos. Volve a esa herida del amor que elegiste a la mañana. Y reescribila. Cambia las palabras del otro. Cambia el final. Imagina que en vez de lastimarte, esa persona te trato con amor, con respeto, con ternura.

Vivila asi, la version nueva, como si hubiera pasado de verdad. Sentí como se siente esa version.

Abri los ojos. Reescribiste la escena. Le sacaste el veneno.

## Meditación de la tarde

Para. Respira.

Perdonar no es decir "estuvo bien lo que me hicieron". Perdonar es dejar de cargar el peso. Es soltar, no por el otro, sino por vos. Porque mientras cargues rencor, no hay lugar para amor nuevo.

Cerra los ojos. Pensá en alguien que te lastimo en el amor. Y en vez de imaginarlo como el que te hizo daño, imaginalo en paz, siguiendo su camino, lejos de vos. Y vos, liviano, libre, sin ese peso.

No es facil. Pero cada vez que soltas un poco, se abre un poco mas de espacio para el amor que viene.

Abri los ojos. Soltaste un poco. Hay mas espacio ahora.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, dormite liviano. Imagina que juntas todas las heridas viejas del amor, todas las decepciones, todos los rencores, y los pones en una caja. Y cerras la caja. No la destruis: solo la cerras y la dejas atras.

Sentí el alivio de no cargar mas eso. La liviandad de un corazon que hizo las paces con su historia.

Y ahora, con el corazon vacio de lo viejo, hay lugar para lo nuevo. Dormite sabiendo que manana empezas mas liviano, con mas espacio para el amor.

Que descanses libre del pasado.

---

1. Chequeo rápido: hoy el foco es revisar una escena que todavía pesa. No hace falta hacerlo perfecto. Volvé ahora a cambiar la escena sin castigarte.

2. Fijate desde dónde estás pensando esto. Si caíste en revivir el mismo dolor, no te castigues. Elegí otra vez sentir alivio con un final distinto.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: revisar cambia desde dónde seguís viviendo.

4. No busques una señal afuera en este momento. Primero ordená adentro: revisar una escena que todavía pesa. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir alivio con un final distinto? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: cambiar la escena sin castigarte.

7. No necesitás intensidad. Necesitás repetición. Volvé a revisar una escena que todavía pesa hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: revisar cambia desde dónde seguís viviendo. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: cambiar la escena sin castigarte.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir alivio con un final distinto por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo revisar una escena que todavía pesa.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir alivio con un final distinto. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar revisar cambia desde dónde seguís viviendo.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: cambiar la escena sin castigarte.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir alivio con un final distinto ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con revisar una escena que todavía pesa, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: revisar cambia desde dónde seguís viviendo.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para cambiar la escena sin castigarte. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es revisar una escena que todavía pesa.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir alivio con un final distinto.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a revisar una escena que todavía pesa.

23. El hábito viejo quiere que vuelvas automático a revivir el mismo dolor. Hoy interrumpilo con una decisión consciente: cambiar la escena sin castigarte.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir alivio con un final distinto.

25. Guardate esta idea para el resto del día: revisar cambia desde dónde seguís viviendo. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a revisar una escena que todavía pesa.','internal://practica-7-dias-amor/dia-5','public',true,'{"dia":5,"programa":"amor","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,5 from public.collections c join public.content_items i on i.slug='practica-7-dias-amor-dia-5' where c.slug='practica-7-dias-amor' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-amor-dia-6','guided_day','Día 6','# Día 6 - PERSISTIR

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Ya sabes casi todo: amarte, sentir que sos amado, armar la escena, cuidar tus conversaciones internas, soltar el pasado. Hoy aprendes lo unico que hace que todo funcione: persistir.

Porque la mayoria imagina una vez, con fuerza, y despues se rinde. Planta la semilla y a los tres dias la arranca para ver si crecio. Y asi no crece nada.

Persistir es sostener el sentimiento de ser amado, dia tras dia, aunque todavia no lo veas afuera. Es no bajarte antes de tiempo.

Abri los ojos. Hoy no aprendes nada nuevo. Hoy simplemente decidis: sigo.

## Meditación del mediodía

Frena un minuto.

En estos dias tuviste momentos buenos y momentos de duda. Momentos donde sentiste el amor y momentos donde volviste a la soledad de siempre. Eso es normal. Persistir no es no caerse nunca: es volver a levantarse cada vez.

Cerra los ojos. Fijate: ¿en que estado estas ahora? Si te caiste al de siempre, no te castigues. Solo volve. Volve a sentir que sos amado. Sin drama. Sin culpa. Solo volve.

Abri los ojos. Te subiste de nuevo. Eso es persistir.

## Meditación de la tarde

Para. Respira.

Hay una frase que quiero que te lleves: la vision tiene su hora. Madura. Florece. Si tarda, esperá, porque es segura y no tarda.

Tu deseo de amor tiene un tiempo de gestacion. No sabes cuanto. Pero si persistis, llega. Siempre llega. El problema es que la mayoria se baja justo antes, en la ultima curva, cuando ya casi estaba.

Cerra los ojos. Sentí la calma del que espera sin ansiedad, porque sabe que lo suyo esta llegando. No busques señales. No preguntes cuando. Solo seguí sintiendote amado, y confiá.

Abri los ojos. Tu amor tiene su hora. No te bajes antes.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, hace lo mismo de siempre. Entrá a tu escena de amor. La misma. Vivila una vez mas, despacio, mientras te dormis.

¿Por que lo mismo? Porque eso es persistir. Noche tras noche, la misma siembra. No porque sea excitante cada vez: a veces va a ser mecanico, a veces tibio. Esta bien. Lo que cuenta es volver.

Sabe que cada noche que haces esto, la semilla del amor crece un poco mas. Y que un dia, a la hora señalada, florece.

Que descanses persistiendo.

---

1. Chequeo rápido: hoy el foco es volver al estado elegido. No hace falta hacerlo perfecto. Volvé ahora a regresar al amor.

2. Fijate desde dónde estás pensando esto. Si caíste en medir todo por lo que pasó hoy, no te castigues. Elegí otra vez sentir calma sin exigir resultados.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: persistir es volver.

4. No busques una señal afuera en este momento. Primero ordená adentro: volver al estado elegido. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir calma sin exigir resultados? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: regresar al amor.

7. No necesitás intensidad. Necesitás repetición. Volvé a volver al estado elegido hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: persistir es volver. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: regresar al amor.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir calma sin exigir resultados por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo volver al estado elegido.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir calma sin exigir resultados. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar persistir es volver.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: regresar al amor.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir calma sin exigir resultados ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con volver al estado elegido, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: persistir es volver.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para regresar al amor. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es volver al estado elegido.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir calma sin exigir resultados.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a volver al estado elegido.

23. El hábito viejo quiere que vuelvas automático a medir todo por lo que pasó hoy. Hoy interrumpilo con una decisión consciente: regresar al amor.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir calma sin exigir resultados.

25. Guardate esta idea para el resto del día: persistir es volver. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a volver al estado elegido.','internal://practica-7-dias-amor/dia-6','public',true,'{"dia":6,"programa":"amor","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,6 from public.collections c join public.content_items i on i.slug='practica-7-dias-amor-dia-6' where c.slug='practica-7-dias-amor' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-amor-dia-7','guided_day','Día 7','# Día 7 - YA SOS AMADO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Ultimo dia. Y hoy quiero decirte algo que cambia todo: ya esta. No estas tratando de ser amado. Ya lo sos.

Todo el trabajo de estos dias — amarte, sentir, imaginar, persistir — ya esta adentro tuyo. La persona amada que querias ser no esta alla lejos: sos vos, ahora, con los ojos cerrados y respirando.

Sentí ahora, no que vas a ser amado, sino que ya lo sos. Que el amor ya es parte de tu vida. Que no falta nada. Solo queda vivirlo.

Abri los ojos. Hoy no practicas. Hoy vivis como quien ya es amado.

## Meditación del mediodía

Frena un minuto.

Hay una tentacion peligrosa: seguir buscando. Seguir sintiendo que falta algo, que todavia no es suficiente, que "casi" pero no del todo. Hoy, deja de buscar.

El amor que necesitas ya lo tenes adentro. No te falta un curso mas, una tecnica mas, una persona mas para completarte. Ya estas completo. Y desde esa plenitud, el amor de afuera viene solo, no como parche, sino como celebracion.

Cerra los ojos. Sentí que no te falta nada. Que sos suficiente, entero, amado. Ahora. No cuando aparezca alguien: ahora.

Abri los ojos. Dejaste de buscar. Porque lo que buscabas, ya lo sos.

## Meditación de la tarde

Para. Respira.

Mirá tu dia como lo miraria alguien que ya tiene todo el amor que necesita. Con que calma. Con que liviandad. Sin desesperacion, sin mendigar carino, sin depender de que el otro te elija para sentirte valioso.

Esa persona ya es amada, y lo sabe. Y desde ese lugar, ama mejor, sin miedo, sin agarrarse.

Cerra los ojos. Sentí la diferencia entre "necesito que me amen" y "ya soy amado, y elijo compartir eso". La primera tiene urgencia. La segunda tiene paz. Hoy elegís la paz.

Abri los ojos. Salí a la tarde como quien ya es amado. Y amá desde ahi.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Ultima noche de este camino. Y no es un final: es un comienzo. Porque el amor no se termina cuando se termina el plan. Lo que aprendiste es tuyo para siempre.

Esta noche, dormite en la plenitud del amor. No como deseo, no como espera: como hecho. Ya sos amado. Ya amas. Ya el amor es parte tuya.

Sabe que todo lo que sembraste estos dias sigue creciendo. Que el amor que imaginaste esta en camino, tomando forma, buscando la manera de llegar a tu vida. Y vos, mientras tanto, descansas en la certeza de que ya sos amado.

Manana te despertas con esto adentro. Para siempre.

Que descanses en el amor.

---

1. Chequeo rápido: hoy el foco es vivir desde la certeza de que ya sos amado. No hace falta hacerlo perfecto. Volvé ahora a moverte sin mendigar amor.

2. Fijate desde dónde estás pensando esto. Si caíste en buscar completarte afuera, no te castigues. Elegí otra vez sentir plenitud y suficiencia.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: cuando dejás de perseguir amor empezás a compartirlo.

4. No busques una señal afuera en este momento. Primero ordená adentro: vivir desde la certeza de que ya sos amado. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir plenitud y suficiencia? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: moverte sin mendigar amor.

7. No necesitás intensidad. Necesitás repetición. Volvé a vivir desde la certeza de que ya sos amado hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: cuando dejás de perseguir amor empezás a compartirlo. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: moverte sin mendigar amor.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir plenitud y suficiencia por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo vivir desde la certeza de que ya sos amado.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir plenitud y suficiencia. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar cuando dejás de perseguir amor empezás a compartirlo.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: moverte sin mendigar amor.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir plenitud y suficiencia ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con vivir desde la certeza de que ya sos amado, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: cuando dejás de perseguir amor empezás a compartirlo.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para moverte sin mendigar amor. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es vivir desde la certeza de que ya sos amado.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir plenitud y suficiencia.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a vivir desde la certeza de que ya sos amado.

23. El hábito viejo quiere que vuelvas automático a buscar completarte afuera. Hoy interrumpilo con una decisión consciente: moverte sin mendigar amor.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir plenitud y suficiencia.

25. Guardate esta idea para el resto del día: cuando dejás de perseguir amor empezás a compartirlo. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a vivir desde la certeza de que ya sos amado.','internal://practica-7-dias-amor/dia-7','public',true,'{"dia":7,"programa":"amor","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,7 from public.collections c join public.content_items i on i.slug='practica-7-dias-amor-dia-7' where c.slug='practica-7-dias-amor' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;



insert into public.collections (slug,title,description,collection_type,is_published,sort_order) values ('practica-7-dias-dinero','Dinero y trabajo','Programa guiado de 7 días con 4 meditaciones diarias y mensajes intermedios','taller',true,11) on conflict (slug) do update set title=excluded.title,description=excluded.description,collection_type=excluded.collection_type,is_published=excluded.is_published,sort_order=excluded.sort_order,updated_at=now();

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-dinero-dia-1','guided_day','Día 1','# Día 1 - LA ABUNDANCIA EMPIEZA ADENTRO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

La mayoria busca la plata afuera: mas trabajo, mas horas, mas esfuerzo. Y esta bien trabajar. Pero hay algo que va antes, algo que casi nadie ve: la abundancia empieza adentro. En como te sentis con respecto al dinero.

Si por dentro vivis en la falta — contando lo que no te alcanza, con miedo, apretado — afuera creas mas falta. Si por dentro vivis en la abundancia — con calma, con confianza, sintiendo que estas cubierto — afuera se abre la abundancia.

Sentí ahora la tranquilidad de tener lo que necesitas y un poco mas. No pienses en numeros: sentí la calma del que no vive con el corazon en la boca por la plata.

Abri los ojos. Hoy caminas prospero desde adentro. Y lo de adentro se refleja afuera.

## Meditación del mediodía

Frena un minuto.

Fijate como pensaste en la plata en lo que va del dia. ¿Desde la falta o desde la abundancia? ¿Contando lo que te falta, o agradeciendo lo que tenes?

Porque tu imaginacion no para de crear, y crea con lo que le das. Si le das imagenes de "no llego", crea "no llego". Si le das imagenes de holgura, crea holgura.

Cerra los ojos. Cambia la imagen ahora. En vez de la cuenta apretada, imagina una cuenta con aire, con margen, con tranquilidad. Sentí el alivio de eso.

Abri los ojos. Cambiaste la imagen. Ahora la abundancia tiene por donde entrar.

## Meditación de la tarde

Para. Respira.

Hay una frase de Neville que cambia como entendes la plata: nunca atraes lo que queres, sino aquello de lo que sos consciente. Podes querer plata con toda el alma, pero si sos consciente de escasez, atraes escasez.

No se trata de querer mas fuerte. Se trata de ser consciente de abundancia. De vivir, por dentro, en el estado del que ya tiene.

Cerra los ojos. Volvete consciente de abundancia. No de lo que te falta: de lo que hay, de lo que viene, de lo que sos capaz de generar. Sentí esa conciencia llenarte.

Abri los ojos. Cambiaste de lo que sos consciente. Ahora atraes distinto.

## Meditación de la noche

Acostate. Afloja todo el cuerpo: pies, piernas, panza, hombros, mandibula, frente. Tres respiraciones lentas.

El momento de dormirte es el mas poderoso. Lo que sentis antes de dormir trabaja toda la noche.

Esta noche, no te duermas contando lo que debes o lo que te falta. Eso planta escasez. Dormite en la sensacion de estar cubierto, tranquilo, prospero.

Imagina que todo esta resuelto. Que las cuentas estan pagas, que hay margen, que no falta nada esencial. Sentí la paz de esa certeza.

Dejate dormir en esa abundancia. Manana te despertas con esa frecuencia, y desde ahi, las cosas se acomodan distinto.

Que descanses en la abundancia.

---

1. Chequeo rápido: hoy el foco es cambiar el tono interno con el que mirás el dinero. No hace falta hacerlo perfecto. Volvé ahora a elegir un estado más amplio.

2. Fijate desde dónde estás pensando esto. Si caíste en pensar todo desde la falta, no te castigues. Elegí otra vez sentir tranquilidad y margen.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: la abundancia empieza adentro.

4. No busques una señal afuera en este momento. Primero ordená adentro: cambiar el tono interno con el que mirás el dinero. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir tranquilidad y margen? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: elegir un estado más amplio.

7. No necesitás intensidad. Necesitás repetición. Volvé a cambiar el tono interno con el que mirás el dinero hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: la abundancia empieza adentro. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: elegir un estado más amplio.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir tranquilidad y margen por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo cambiar el tono interno con el que mirás el dinero.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir tranquilidad y margen. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar la abundancia empieza adentro.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: elegir un estado más amplio.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir tranquilidad y margen ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con cambiar el tono interno con el que mirás el dinero, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: la abundancia empieza adentro.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para elegir un estado más amplio. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es cambiar el tono interno con el que mirás el dinero.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir tranquilidad y margen.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a cambiar el tono interno con el que mirás el dinero.

23. El hábito viejo quiere que vuelvas automático a pensar todo desde la falta. Hoy interrumpilo con una decisión consciente: elegir un estado más amplio.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir tranquilidad y margen.

25. Guardate esta idea para el resto del día: la abundancia empieza adentro. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a cambiar el tono interno con el que mirás el dinero.','internal://practica-7-dias-dinero/dia-1','public',true,'{"dia":1,"programa":"dinero","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,1 from public.collections c join public.content_items i on i.slug='practica-7-dias-dinero-dia-1' where c.slug='practica-7-dias-dinero' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-dinero-dia-2','guided_day','Día 2','# Día 2 - SENTIR QUE YA TENES

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Ayer vimos que la abundancia empieza adentro. Hoy damos un paso: sentir que ya tenes. No desear tener, no esperar tener: sentir, ahora, que ya sos prospero.

Porque el sentimiento es la clave. Lo que sentis como real, se vuelve tu experiencia. Si sentis holgura, la vida te trae holgura. Si sentis carencia, te trae carencia.

Sentí ahora que tenes mas que suficiente. La comodidad de poder darte gustos, de no mirar el precio con angustia, de saber que estas bien. No como fantasia: como estado que elegís habitar.

Abri los ojos. Hoy caminas como alguien que ya tiene. El mundo responde a eso.

## Meditación del mediodía

Frena un minuto.

¿Notaste que la gente prospera se mueve distinto? Con calma, sin desesperacion, sin esa urgencia del que necesita. No es que tienen plata y por eso estan tranquilos: muchas veces es al reves, estan tranquilos y por eso les va bien.

El estado va antes que el resultado. La calma atrae, la desesperacion espanta.

Cerra los ojos. Ponete el estado de holgura, como quien se pone un traje. Sentí como cambia tu respiracion, tus hombros, tu manera de pensar en la plata. Desde ahi, seguí el dia.

Abri los ojos. Cambiaste el estado. La plata sigue al estado.

## Meditación de la tarde

Para. Respira.

Hay una diferencia entre pensar en la plata que queres y pensar desde la plata que ya tenes. Pensar en la plata es desearla desde afuera, desde la falta. Pensar desde la plata es vivir como el que ya la tiene.

Cerra los ojos. No pienses en el dinero que te falta. Pensá desde el dinero que ya tenes. ¿Como verias el mundo? ¿Que decisiones tomarias con calma? ¿Que dejarias de preocuparte? Vivilo ahora, desde ese lugar.

Abri los ojos. Pensaste desde la abundancia. Ese es el cambio que importa.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, dormite en el sentimiento de ya tener. No importa tu numero real hoy: en el borde del sueño, el numero no manda. Manda lo que sentis.

Imagina que miras tu situacion y sentis alivio, tranquilidad, satisfaccion. Que todo esta cubierto y hasta sobra. Sentí esa paz del que no tiene que preocuparse.

Dejate dormir adentro de esa sensacion. Tu poder creador la toma y trabaja sobre ella toda la noche. Y manana, algo se mueve en la direccion de la abundancia.

Que descanses sintiendo que ya tenes.

---

1. Chequeo rápido: hoy el foco es habitar la sensación de tener suficiente. No hace falta hacerlo perfecto. Volvé ahora a pensar desde el que ya está cubierto.

2. Fijate desde dónde estás pensando esto. Si caíste en esperar una cifra para sentir alivio, no te castigues. Elegí otra vez sentir holgura y seguridad.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: el estado va primero.

4. No busques una señal afuera en este momento. Primero ordená adentro: habitar la sensación de tener suficiente. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir holgura y seguridad? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: pensar desde el que ya está cubierto.

7. No necesitás intensidad. Necesitás repetición. Volvé a habitar la sensación de tener suficiente hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: el estado va primero. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: pensar desde el que ya está cubierto.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir holgura y seguridad por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo habitar la sensación de tener suficiente.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir holgura y seguridad. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar el estado va primero.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: pensar desde el que ya está cubierto.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir holgura y seguridad ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con habitar la sensación de tener suficiente, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: el estado va primero.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para pensar desde el que ya está cubierto. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es habitar la sensación de tener suficiente.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir holgura y seguridad.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a habitar la sensación de tener suficiente.

23. El hábito viejo quiere que vuelvas automático a esperar una cifra para sentir alivio. Hoy interrumpilo con una decisión consciente: pensar desde el que ya está cubierto.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir holgura y seguridad.

25. Guardate esta idea para el resto del día: el estado va primero. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a habitar la sensación de tener suficiente.','internal://practica-7-dias-dinero/dia-2','public',true,'{"dia":2,"programa":"dinero","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,2 from public.collections c join public.content_items i on i.slug='practica-7-dias-dinero-dia-2' where c.slug='practica-7-dias-dinero' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-dinero-dia-3','guided_day','Día 3','# Día 3 - LA ESCENA DE LA PROSPERIDAD

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Hoy la herramienta mas poderosa: la escena. En vez de desear plata en abstracto, vas a construir una escena corta, concreta, que solo podria existir si ya fueras prospero.

No la plata: la escena que la da por hecha. Mirar tu cuenta y sonreir. Pagar algo sin pensarlo. Alguien que te dice "que bien te va". Darte un gusto que hace tiempo no podias.

Elegí una escena chiquita ahora. Diez segundos. Y metete adentro: sentí la emocion, vé los detalles, escucha lo que se dice. Vivila como protagonista, no de afuera.

Abri los ojos. Plantaste una escena de prosperidad. Tu imaginacion la hace crecer.

## Meditación del mediodía

Frena un minuto.

La escena que armaste no es fantasia: es una semilla. Y las semillas, si las sostenes, crecen. Lo que imaginas con sentimiento se abre camino hacia tu realidad.

Cerra los ojos. Volve a esa escena de prosperidad. La misma. No la cambies: repetila. El momento de mirar la cuenta, o de darte el gusto, o de escuchar el elogio. Con los mismos detalles.

Cuanto mas la repetis, mas real se vuelve por dentro. Y lo que es real por dentro, tiende a serlo por fuera.

Abri los ojos. Regaste la semilla. Va creciendo.

## Meditación de la tarde

Para. Respira.

El secreto de una buena escena es la naturalidad. No la fuerces con esfuerzo. Vivila como algo obvio, como algo que ya es tuyo, con el tono de un recuerdo, no de un deseo.

Cerra los ojos. Volve a tu escena de prosperidad, pero con calma, con la naturalidad de recordar algo que ya paso. Como si ya fueras prospero y solo estuvieras recordando un momento lindo.

Ese tono de "ya es asi" es lo que la hace poderosa. No "ojala": "ya esta, que bueno".

Abri los ojos. Le diste el tono de lo real. Sostenela.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche es clave para tu escena. Antes de dormirte, entrá en ella una vez mas. La misma escena de prosperidad, vivida con los sentidos, repetida despacio mientras el sueño te gana.

Que sea lo ultimo que pasa por tu mente. La escena de la abundancia cumplida.

No busques que aparezca manana. No la controles. Solo vivila y dejate dormir adentro. Tu poder creador trabaja toda la noche sobre la ultima imagen del dia. Dale la de la prosperidad.

Que descanses en tu escena.

---

1. Chequeo rápido: hoy el foco es volver a una escena concreta de prosperidad. No hace falta hacerlo perfecto. Volvé ahora a repetir la misma escena.

2. Fijate desde dónde estás pensando esto. Si caíste en desear dinero en abstracto, no te castigues. Elegí otra vez sentir alivio de una situación resuelta.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: una imagen concreta da dirección.

4. No busques una señal afuera en este momento. Primero ordená adentro: volver a una escena concreta de prosperidad. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir alivio de una situación resuelta? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: repetir la misma escena.

7. No necesitás intensidad. Necesitás repetición. Volvé a volver a una escena concreta de prosperidad hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: una imagen concreta da dirección. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: repetir la misma escena.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir alivio de una situación resuelta por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo volver a una escena concreta de prosperidad.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir alivio de una situación resuelta. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar una imagen concreta da dirección.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: repetir la misma escena.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir alivio de una situación resuelta ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con volver a una escena concreta de prosperidad, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: una imagen concreta da dirección.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para repetir la misma escena. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es volver a una escena concreta de prosperidad.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir alivio de una situación resuelta.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a volver a una escena concreta de prosperidad.

23. El hábito viejo quiere que vuelvas automático a desear dinero en abstracto. Hoy interrumpilo con una decisión consciente: repetir la misma escena.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir alivio de una situación resuelta.

25. Guardate esta idea para el resto del día: una imagen concreta da dirección. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a volver a una escena concreta de prosperidad.','internal://practica-7-dias-dinero/dia-3','public',true,'{"dia":3,"programa":"dinero","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,3 from public.collections c join public.content_items i on i.slug='practica-7-dias-dinero-dia-3' where c.slug='practica-7-dias-dinero' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-dinero-dia-4','guided_day','Día 4','# Día 4 - NO TE PREOCUPES POR EL COMO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Hay una trampa que frena a casi todos: el como. Imaginas prosperidad, la sentis, y al segundo la mente salta: "sí, ¿pero de donde va a salir la plata?". Y ahi empieza la preocupacion, y la preocupacion mata la semilla.

Neville era terminante: no determines los medios. Tu trabajo es el fin — sentirte prospero. El como llega, por donde, cuando: eso no es tu trabajo. Hay caminos que tu mente no conoce.

Hoy, cada vez que aparezca el "¿pero como?", dejalo pasar. Volve al fin: ya sos prospero. Y confiá.

Abri los ojos. Te sacaste el como de encima. Es la carga mas pesada e inutil.

## Meditación del mediodía

Frena un minuto.

La preocupacion por la plata es, en el fondo, imaginar que no va a alcanzar. Es usar tu imaginacion en contra tuya, plantando justo lo que no queres.

Si te descubris preocupado, pará. Reconocelo: "estoy imaginando escasez". Y cambia la imagen.

Cerra los ojos. En vez de imaginar el problema de plata, imagina el problema ya resuelto. No como se resolvio: solo el alivio de que se resolvio. Sentí ese alivio ahora.

Abri los ojos. Dejaste de imaginar escasez. Ahora imaginas solucion.

## Meditación de la tarde

Para. Respira.

Neville decia que preocuparse por como se va a cumplir tu deseo es como agarrar la semilla y no dejarla caer a la tierra. Si la retenes en la mano, apretada por la ansiedad, no germina. Si la dejas caer y confias, crece sola.

Cerra los ojos. Deja caer la semilla de la prosperidad. Sentí el fin — ya sos prospero — y despues soltá el control. No la chequees cada cinco minutos. No la aprietes con ansiedad. Dejala en la tierra.

Abri los ojos. Soltaste la semilla. Ahora solo confia y dejala crecer.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, deja las preocupaciones de plata afuera de la cama. No son tuyas a esta hora. A esta hora solo sos vos, tu respiracion, y la certeza de que lo que sembraste esta creciendo.

Imagina que todo se resuelve por caminos que ni imaginabas. Que la plata llega de una forma que no esperabas. No pienses cual: solo sentí la sorpresa agradable de que llego.

Dejate dormir confiando. Tu poder creador encuentra los caminos mientras vos descansas.

Que descanses sin la carga del como.

---

1. Chequeo rápido: hoy el foco es soltar la obsesión por los medios. No hace falta hacerlo perfecto. Volvé ahora a volver al final.

2. Fijate desde dónde estás pensando esto. Si caíste en calcular todos los caminos, no te castigues. Elegí otra vez sentir alivio porque el resultado está resuelto.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: tu tarea es el estado final.

4. No busques una señal afuera en este momento. Primero ordená adentro: soltar la obsesión por los medios. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir alivio porque el resultado está resuelto? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: volver al final.

7. No necesitás intensidad. Necesitás repetición. Volvé a soltar la obsesión por los medios hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: tu tarea es el estado final. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: volver al final.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir alivio porque el resultado está resuelto por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo soltar la obsesión por los medios.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir alivio porque el resultado está resuelto. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar tu tarea es el estado final.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: volver al final.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir alivio porque el resultado está resuelto ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con soltar la obsesión por los medios, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: tu tarea es el estado final.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para volver al final. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es soltar la obsesión por los medios.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir alivio porque el resultado está resuelto.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a soltar la obsesión por los medios.

23. El hábito viejo quiere que vuelvas automático a calcular todos los caminos. Hoy interrumpilo con una decisión consciente: volver al final.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir alivio porque el resultado está resuelto.

25. Guardate esta idea para el resto del día: tu tarea es el estado final. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a soltar la obsesión por los medios.','internal://practica-7-dias-dinero/dia-4','public',true,'{"dia":4,"programa":"dinero","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,4 from public.collections c join public.content_items i on i.slug='practica-7-dias-dinero-dia-4' where c.slug='practica-7-dias-dinero' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-dinero-dia-5','guided_day','Día 5','# Día 5 - CAMBIAR EL ESTADO DE ESCASEZ

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Neville enseñaba algo que libera: la pobreza y la riqueza son estados. No son quien sos: son trajes que llevas puestos. El estado pobre y el estado rico existen los dos, siempre. Y vos elegis cual habitar.

El problema es cuando te confundis con el traje. Cuando decis "yo soy pobre" en vez de "estoy en un estado de escasez". Porque si sos el traje, no te lo podes sacar. Pero si sos el que lo usa, te lo cambias cuando quieras.

Hoy, mirate: ¿que traje llevas puesto con respecto a la plata? Y si no te gusta, empeza a sacartelo.

Abri los ojos. No sos pobre. Estas en un estado. Y los estados se cambian.

## Meditación del mediodía

Frena un minuto.

Cada vez que decis "no me alcanza", "siempre es poco", "no puedo pagarlo", estas confirmando el estado de escasez. Le estas poniendo el traje mas ajustado. Y el mundo te da la razon.

Cerra los ojos. Cambia las frases. En vez de "no puedo pagarlo", "elijo no gastarlo ahora". En vez de "no me alcanza", "estoy administrando bien lo que tengo". Suena distinto, ¿no? Porque es otro estado.

Sentí el cambio: de la impotencia de la escasez a la eleccion de la abundancia.

Abri los ojos. Cambiaste las frases. Cambiaste el estado.

## Meditación de la tarde

Para. Respira.

Neville decia que el estado pobre no desaparece porque vos lo abandonaste: sigue ahi, esperando al proximo que caiga. Pero vos ya no estas adentro. Te mudaste.

Cerra los ojos. Salí del estado de escasez, a proposito. No lo pelees, no discutas con el: solo mudáte. Entra al estado de abundancia. Sentí como se siente habitarlo: los hombros sueltos, la respiracion tranquila, la confianza de que la plata fluye. Quedate ahi hasta que se sienta un poco natural.

Abri los ojos. Te mudaste de estado. El mundo refleja el nuevo.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, dormite en el estado nuevo. No en el de "no llego", que ya conoces demasiado. En el de "tengo de sobra".

Imagina que sos alguien prospero, que siempre lo fue, para quien la abundancia es natural. Sentí como piensa esa persona, como respira, como duerme tranquila sabiendo que esta cubierta.

Ponete ese traje y dormite adentro de el. Cuanto mas dormis en ese estado, mas natural se vuelve. Y lo que se vuelve natural adentro, se exterioriza afuera.

Que descanses en el estado de abundancia.

---

1. Chequeo rápido: hoy el foco es reconocer que la escasez es un estado. No hace falta hacerlo perfecto. Volvé ahora a cambiar el lenguaje interno.

2. Fijate desde dónde estás pensando esto. Si caíste en decirte que nunca alcanza, no te castigues. Elegí otra vez sentir elección y espacio.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: un estado se abandona ocupando otro.

4. No busques una señal afuera en este momento. Primero ordená adentro: reconocer que la escasez es un estado. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir elección y espacio? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: cambiar el lenguaje interno.

7. No necesitás intensidad. Necesitás repetición. Volvé a reconocer que la escasez es un estado hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: un estado se abandona ocupando otro. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: cambiar el lenguaje interno.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir elección y espacio por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo reconocer que la escasez es un estado.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir elección y espacio. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar un estado se abandona ocupando otro.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: cambiar el lenguaje interno.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir elección y espacio ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con reconocer que la escasez es un estado, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: un estado se abandona ocupando otro.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para cambiar el lenguaje interno. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es reconocer que la escasez es un estado.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir elección y espacio.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a reconocer que la escasez es un estado.

23. El hábito viejo quiere que vuelvas automático a decirte que nunca alcanza. Hoy interrumpilo con una decisión consciente: cambiar el lenguaje interno.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir elección y espacio.

25. Guardate esta idea para el resto del día: un estado se abandona ocupando otro. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a reconocer que la escasez es un estado.','internal://practica-7-dias-dinero/dia-5','public',true,'{"dia":5,"programa":"dinero","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,5 from public.collections c join public.content_items i on i.slug='practica-7-dias-dinero-dia-5' where c.slug='practica-7-dias-dinero' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-dinero-dia-6','guided_day','Día 6','# Día 6 - PERSISTIR EN LA ABUNDANCIA

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Ya sabes casi todo: la abundancia empieza adentro, sentir que ya tenes, la escena, soltar el como, cambiar de estado. Hoy lo unico que hace que todo funcione: persistir.

Porque la mayoria imagina prosperidad una vez, con ganas, y a los tres dias se rinde porque "no pasa nada". Planta la semilla y la arranca antes de que germine. Y asi no crece nada.

Persistir es sostener el estado de abundancia dia tras dia, aunque la cuenta todavia no lo muestre. Es no bajarte antes de tiempo.

Abri los ojos. Hoy no aprendes nada nuevo. Hoy decidis: sigo.

## Meditación del mediodía

Frena un minuto.

En estos dias tuviste momentos de confianza y momentos de duda. Momentos donde sentiste la abundancia y momentos donde volviste al miedo de siempre. Es normal. Persistir no es no dudar nunca: es volver cada vez que dudas.

Cerra los ojos. ¿En que estado estas ahora? Si te caiste al de la escasez, no te castigues. Solo volve. Volve a sentir la abundancia. Sin drama. Solo volve.

Abri los ojos. Te subiste de nuevo. Eso es persistir.

## Meditación de la tarde

Para. Respira.

Neville decia: la vision tiene su hora señalada. Aunque tarde, esperala, porque llegará. Tu prosperidad tiene un tiempo de gestacion. No sabes cuanto. Pero si persistis, llega.

El problema es que la mayoria se baja justo antes, cuando ya casi estaba, porque no aguanto el intervalo entre la siembra y la cosecha.

Cerra los ojos. Sentí la calma del que espera sin ansiedad, porque sabe que lo suyo esta en camino. No cuentes los dias. No exijas resultados. Solo seguí sintiendote prospero, y confiá.

Abri los ojos. Tu abundancia tiene su hora. No te bajes antes.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, hace lo mismo de siempre. Entrá a tu escena de prosperidad. La misma. Vivila una vez mas, despacio, mientras te dormis.

¿Por que lo mismo? Porque eso es persistir. Noche tras noche, la misma siembra. A veces va a ser mecanico, a veces tibio. Esta bien. Lo que cuenta es volver.

Sabe que cada noche que haces esto, la semilla de la abundancia crece un poco mas. Y que un dia, a la hora señalada, florece.

Que descanses persistiendo.

---

1. Chequeo rápido: hoy el foco es sostener abundancia aunque el afuera tarde. No hace falta hacerlo perfecto. Volvé ahora a volver a tu escena.

2. Fijate desde dónde estás pensando esto. Si caíste en abandonar por impaciencia, no te castigues. Elegí otra vez sentir confianza sin urgencia.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: persistir es no arrancar la semilla.

4. No busques una señal afuera en este momento. Primero ordená adentro: sostener abundancia aunque el afuera tarde. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir confianza sin urgencia? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: volver a tu escena.

7. No necesitás intensidad. Necesitás repetición. Volvé a sostener abundancia aunque el afuera tarde hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: persistir es no arrancar la semilla. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: volver a tu escena.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir confianza sin urgencia por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo sostener abundancia aunque el afuera tarde.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir confianza sin urgencia. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar persistir es no arrancar la semilla.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: volver a tu escena.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir confianza sin urgencia ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con sostener abundancia aunque el afuera tarde, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: persistir es no arrancar la semilla.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para volver a tu escena. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es sostener abundancia aunque el afuera tarde.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir confianza sin urgencia.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a sostener abundancia aunque el afuera tarde.

23. El hábito viejo quiere que vuelvas automático a abandonar por impaciencia. Hoy interrumpilo con una decisión consciente: volver a tu escena.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir confianza sin urgencia.

25. Guardate esta idea para el resto del día: persistir es no arrancar la semilla. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a sostener abundancia aunque el afuera tarde.','internal://practica-7-dias-dinero/dia-6','public',true,'{"dia":6,"programa":"dinero","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,6 from public.collections c join public.content_items i on i.slug='practica-7-dias-dinero-dia-6' where c.slug='practica-7-dias-dinero' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-dinero-dia-7','guided_day','Día 7','# Día 7 - YA SOS PROSPERO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Ultimo dia. Y hoy quiero decirte algo que cambia todo: ya esta. No estas tratando de ser prospero. Ya lo sos.

Todo el trabajo de estos dias — sentir, imaginar, cambiar de estado, persistir — ya esta adentro tuyo. La prosperidad no esta alla lejos esperandote: empieza en el estado que ya sabes habitar.

Sentí ahora, no que vas a ser prospero, sino que ya lo sos. Que la abundancia ya es parte de tu forma de estar en el mundo. Que no falta nada. Solo queda que el afuera se ponga al dia.

Abri los ojos. Hoy no practicas. Hoy vivis como quien ya es prospero.

## Meditación del mediodía

Frena un minuto.

Hay una tentacion: seguir sintiendo que falta, que todavia no es suficiente, que "cuando tenga tanto, ahi si". Pero esa es la trampa de la escasez disfrazada. Siempre va a faltar si vivis desde la falta.

Hoy, sentí que ya tenes suficiente. No porque no quieras mas: porque la abundancia es un estado, no una cifra. Y desde la abundancia se genera mas abundancia. Desde la falta, solo mas falta.

Cerra los ojos. Sentí que estas bien. Que tenes. Que sos prospero, ahora, con lo que hay. Desde ahi, lo que venga es crecimiento, no rescate.

Abri los ojos. Dejaste de vivir desde la falta. Ese es el cambio mas grande.

## Meditación de la tarde

Para. Respira.

Mirá tu dia como lo miraria alguien prospero de verdad. Con que calma. Con que confianza. Sin la desesperacion del que necesita, sin el miedo del que teme perder.

Esa persona toma mejores decisiones, porque no decide desde el panico. Ve oportunidades, porque no esta cegada por la urgencia. Y atrae, porque la calma atrae.

Cerra los ojos. Sentí la diferencia entre "necesito plata ya" y "soy prospero y las cosas fluyen". La primera aprieta. La segunda abre. Hoy elegís abrir.

Abri los ojos. Salí a la tarde como quien ya es prospero. Y decidí desde ahi.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Ultima noche de este camino. Y no es un final: es un comienzo. Porque la prosperidad no se termina cuando se termina el plan. Lo que aprendiste es tuyo para siempre.

Esta noche, dormite en la plenitud de la abundancia. No como deseo, no como espera: como hecho. Ya sos prospero. Ya la abundancia es parte de vos.

Sabe que todo lo que sembraste sigue creciendo. Que la prosperidad esta en camino, tomando forma, buscando la manera de manifestarse en tu vida. Y vos descansas en la certeza de que ya sos prospero por dentro, que es donde todo empieza.

Manana te despertas con esto adentro. Para siempre.

Que descanses en la abundancia.

---

1. Chequeo rápido: hoy el foco es vivir desde una identidad próspera. No hace falta hacerlo perfecto. Volvé ahora a decidir desde calma.

2. Fijate desde dónde estás pensando esto. Si caíste en postergar la abundancia para después, no te castigues. Elegí otra vez sentir que ya hay suficiente.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: prosperidad también es cómo decidís.

4. No busques una señal afuera en este momento. Primero ordená adentro: vivir desde una identidad próspera. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir que ya hay suficiente? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: decidir desde calma.

7. No necesitás intensidad. Necesitás repetición. Volvé a vivir desde una identidad próspera hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: prosperidad también es cómo decidís. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: decidir desde calma.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir que ya hay suficiente por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo vivir desde una identidad próspera.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir que ya hay suficiente. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar prosperidad también es cómo decidís.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: decidir desde calma.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir que ya hay suficiente ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con vivir desde una identidad próspera, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: prosperidad también es cómo decidís.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para decidir desde calma. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es vivir desde una identidad próspera.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir que ya hay suficiente.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a vivir desde una identidad próspera.

23. El hábito viejo quiere que vuelvas automático a postergar la abundancia para después. Hoy interrumpilo con una decisión consciente: decidir desde calma.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir que ya hay suficiente.

25. Guardate esta idea para el resto del día: prosperidad también es cómo decidís. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a vivir desde una identidad próspera.','internal://practica-7-dias-dinero/dia-7','public',true,'{"dia":7,"programa":"dinero","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,7 from public.collections c join public.content_items i on i.slug='practica-7-dias-dinero-dia-7' where c.slug='practica-7-dias-dinero' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;



insert into public.collections (slug,title,description,collection_type,is_published,sort_order) values ('practica-7-dias-salud','Salud y bienestar','Programa guiado de 7 días con 4 meditaciones diarias y mensajes intermedios','taller',true,12) on conflict (slug) do update set title=excluded.title,description=excluded.description,collection_type=excluded.collection_type,is_published=excluded.is_published,sort_order=excluded.sort_order,updated_at=now();

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-salud-dia-1','guided_day','Día 1','# Día 1 - EL CUERPO ESCUCHA LO QUE IMAGINAS

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Tu cuerpo escucha todo lo que le decis. Cada pensamiento, cada emocion, cada imagen que te haces de vos mismo, el cuerpo lo recibe y responde. Si te imaginas debil, el cuerpo se debilita. Si te imaginas fuerte, el cuerpo se fortalece.

La mayoria le habla mal al cuerpo todo el dia: "estoy viejo", "no doy mas", "siempre me agarra algo". Y el cuerpo obedece, porque no distingue entre lo que temes y lo que queres: solo cumple la imagen.

Hoy, hablale bien. Sentí que tu cuerpo esta sano, fuerte, vital. No pienses en lo que duele: sentí la energia de un cuerpo que funciona.

Abri los ojos. Hoy tu cuerpo te escucha. Hablale de salud.

## Meditación del mediodía

Frena un minuto.

Fijate como pensaste en tu cuerpo en lo que va del dia. ¿Con miedo, con queja, con critica? ¿O con confianza, con gratitud, con amor?

Cada imagen que te haces del cuerpo es una instruccion. Si le das imagenes de enfermedad, va para ahi. Si le das imagenes de salud, va para ahi.

Cerra los ojos. Imagina tu cuerpo funcionando perfecto: el corazon latiendo parejo, la sangre fluyendo, cada organo en su lugar, todo en orden. Sentí la tranquilidad de un cuerpo que anda bien.

Abri los ojos. Le diste al cuerpo la imagen correcta. El sigue la imagen.

## Meditación de la tarde

Para. Respira.

Hay una idea de Neville que aplica perfecto al cuerpo: imaginar crea la realidad. Tu cuerpo no es una excepcion. Responde a lo que imaginas de el, igual que todo lo demas en tu vida.

Por eso el miedo enferma y la calma sana. No es metafora: cuando te asustas, el cuerpo se tensa y se inflama. Cuando te calmas, el cuerpo se afloja y se repara.

Cerra los ojos. Dale a tu cuerpo unos segundos de calma profunda. Aflojá la mandibula, los hombros, la panza. Respira lento. Eso, por si solo, ya es medicina.

Abri los ojos. Le diste calma al cuerpo. Eso sana.

## Meditación de la noche

Acostate. Afloja todo el cuerpo: pies, piernas, panza, hombros, mandibula, frente. Tres respiraciones lentas.

El cuerpo se repara de noche. Mientras dormis, limpia, restaura, construye. Cada noche es una sesion completa de mantenimiento. Y lo que sentis al dormirte guia ese trabajo.

Si te dormis preocupado por tu salud, el cuerpo trabaja sobre esa imagen. Si te dormis en la imagen de salud, trabaja sobre eso.

Esta noche, dormite sano. Imagina que manana te despertas sintiendote increible: liviano, fuerte, descansado. Sostene esa imagen mientras el sueño te gana.

Que descanses sanando.

---

1. Chequeo rápido: hoy el foco es tratar al cuerpo con calma y respeto. No hace falta hacerlo perfecto. Volvé ahora a darle una imagen de bienestar.

2. Fijate desde dónde estás pensando esto. Si caíste en hablarte desde el miedo, no te castigues. Elegí otra vez sentir el cuerpo más acompañado.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: tu relación con el cuerpo también se entrena.

4. No busques una señal afuera en este momento. Primero ordená adentro: tratar al cuerpo con calma y respeto. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir el cuerpo más acompañado? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: darle una imagen de bienestar.

7. No necesitás intensidad. Necesitás repetición. Volvé a tratar al cuerpo con calma y respeto hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: tu relación con el cuerpo también se entrena. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: darle una imagen de bienestar.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir el cuerpo más acompañado por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo tratar al cuerpo con calma y respeto.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir el cuerpo más acompañado. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar tu relación con el cuerpo también se entrena.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: darle una imagen de bienestar.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir el cuerpo más acompañado ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con tratar al cuerpo con calma y respeto, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: tu relación con el cuerpo también se entrena.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para darle una imagen de bienestar. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es tratar al cuerpo con calma y respeto.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir el cuerpo más acompañado.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a tratar al cuerpo con calma y respeto.

23. El hábito viejo quiere que vuelvas automático a hablarte desde el miedo. Hoy interrumpilo con una decisión consciente: darle una imagen de bienestar.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir el cuerpo más acompañado.

25. Guardate esta idea para el resto del día: tu relación con el cuerpo también se entrena. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a tratar al cuerpo con calma y respeto.','internal://practica-7-dias-salud/dia-1','public',true,'{"dia":1,"programa":"salud","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,1 from public.collections c join public.content_items i on i.slug='practica-7-dias-salud-dia-1' where c.slug='practica-7-dias-salud' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-salud-dia-2','guided_day','Día 2','# Día 2 - SENTIR LA SALUD

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Ayer vimos que el cuerpo escucha lo que imaginas. Hoy damos un paso: sentir la salud. No desearla, no esperarla: sentirla, ahora, como si ya fuera plena.

El sentimiento es la clave. Lo que sentis como real, se vuelve tu experiencia. Si sentis salud, tu cuerpo se mueve hacia la salud. Si sentis debilidad, se mueve hacia ahi.

Sentí ahora un cuerpo sano. La liviandad, la energia, la libertad de moverte sin dolor. No importa como amaneciste: asumí el sentimiento de salud plena. El cuerpo lo toma como instruccion.

Abri los ojos. Sentiste salud. Tu cuerpo trabaja sobre esa imagen.

## Meditación del mediodía

Frena un minuto.

¿Notaste que cuando estas de buen animo hasta el cuerpo se siente mejor? ¿Y que cuando te bajoneas, aparecen dolores, cansancio, malestar? No es casualidad. Tu estado de animo cambia la quimica de tu cuerpo.

El animo va antes que el sintoma. Un animo de confianza sana; un animo de miedo enferma.

Cerra los ojos. Elegí un animo de confianza en tu cuerpo. Sentí que tu cuerpo esta bien, que sabe lo que hace, que se cura solo. Ese animo, sostenido, es medicina.

Abri los ojos. Elegiste el animo correcto. El cuerpo responde.

## Meditación de la tarde

Para. Respira.

Hay una diferencia entre pensar en la salud que queres y pensar desde la salud que ya tenes. Pensar en la salud es desearla desde la enfermedad. Pensar desde la salud es vivir, moverte, respirar como alguien sano.

Cerra los ojos. No pienses en el malestar que queres que se vaya. Pensá desde un cuerpo sano. ¿Como te moverias? ¿Como respirarias? ¿Que harias? Vivilo ahora, desde ese cuerpo pleno.

Abri los ojos. Pensaste desde la salud. Ese es el cambio que importa.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, dormite en el sentimiento de salud. No importa como te sentiste hoy: en el borde del sueño, los sintomas no mandan. Manda lo que sentis.

Imagina tu cuerpo entero funcionando en armonia. Cada sistema en orden, cada celula sana, todo en equilibrio. Sentí la paz de un cuerpo que anda bien.

Dejate dormir adentro de esa sensacion. Tu cuerpo la toma y trabaja sobre ella toda la noche. Y manana, algo se mueve en la direccion de la salud.

Que descanses sintiendo la salud.

---

1. Chequeo rápido: hoy el foco es conectar con sensaciones de bienestar posibles ahora. No hace falta hacerlo perfecto. Volvé ahora a volver al cuerpo presente.

2. Fijate desde dónde estás pensando esto. Si caíste en revisar cada sensación con ansiedad, no te castigues. Elegí otra vez sentir respiración y calma.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: bienestar también es bajar la lucha.

4. No busques una señal afuera en este momento. Primero ordená adentro: conectar con sensaciones de bienestar posibles ahora. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir respiración y calma? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: volver al cuerpo presente.

7. No necesitás intensidad. Necesitás repetición. Volvé a conectar con sensaciones de bienestar posibles ahora hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: bienestar también es bajar la lucha. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: volver al cuerpo presente.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir respiración y calma por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo conectar con sensaciones de bienestar posibles ahora.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir respiración y calma. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar bienestar también es bajar la lucha.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: volver al cuerpo presente.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir respiración y calma ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con conectar con sensaciones de bienestar posibles ahora, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: bienestar también es bajar la lucha.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para volver al cuerpo presente. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es conectar con sensaciones de bienestar posibles ahora.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir respiración y calma.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a conectar con sensaciones de bienestar posibles ahora.

23. El hábito viejo quiere que vuelvas automático a revisar cada sensación con ansiedad. Hoy interrumpilo con una decisión consciente: volver al cuerpo presente.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir respiración y calma.

25. Guardate esta idea para el resto del día: bienestar también es bajar la lucha. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a conectar con sensaciones de bienestar posibles ahora.','internal://practica-7-dias-salud/dia-2','public',true,'{"dia":2,"programa":"salud","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,2 from public.collections c join public.content_items i on i.slug='practica-7-dias-salud-dia-2' where c.slug='practica-7-dias-salud' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-salud-dia-3','guided_day','Día 3','# Día 3 - LA ESCENA DE ESTAR SANO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Hoy la herramienta mas poderosa: la escena. En vez de desear salud en abstracto, vas a construir una escena corta, concreta, que solo podria existir si ya estuvieras sano.

No la salud: la escena que la da por hecha. Alguien que te dice "que bien te veo". Vos haciendo algo que hace tiempo no podias. El medico diciendote "esta todo perfecto". Moverte libre, sin dolor.

Elegí una escena chiquita ahora. Diez segundos. Y metete adentro: sentí el cuerpo, escucha las palabras, sentí la alegria. Vivila como protagonista.

Abri los ojos. Plantaste una escena de salud. Tu cuerpo la va a hacer crecer.

## Meditación del mediodía

Frena un minuto.

La escena que armaste no es fantasia: es una semilla. Y las semillas, si las sostenes, crecen. Lo que imaginas con sentimiento, tu cuerpo lo toma como direccion.

Cerra los ojos. Volve a esa escena de salud. La misma. No la cambies: repetila. Con los mismos detalles, la misma emocion.

Cuanto mas la repetis, mas se graba. Y lo que se graba en la imaginacion, el cuerpo tiende a cumplirlo.

Abri los ojos. Regaste la semilla. Va creciendo.

## Meditación de la tarde

Para. Respira.

Una escena poderosa tiene el tono de lo real, no de lo deseado. No "ojala este sano": "estoy sano, que alivio". Como si ya hubiera pasado y solo lo estuvieras recordando.

Cerra los ojos. Volve a tu escena de salud, pero con la naturalidad de un recuerdo. Como si ya te hubieras recuperado y estuvieras recordando lo bien que te sentis ahora.

Ese tono de "ya esta" es lo que la hace funcionar.

Abri los ojos. Le diste el tono de lo real. Sostenela.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche es clave para tu escena. Antes de dormirte, entrá en ella una vez mas. La escena de estar sano, vivida con los sentidos, repetida despacio mientras el sueño te gana.

Que sea lo ultimo que pasa por tu mente. La salud cumplida.

No busques que aparezca manana. No la controles. Solo vivila y dejate dormir adentro. Tu cuerpo trabaja toda la noche sobre la ultima imagen del dia. Dale la de la salud.

Que descanses en tu escena.

---

1. Chequeo rápido: hoy el foco es volver a una escena breve de bienestar. No hace falta hacerlo perfecto. Volvé ahora a repetir una imagen simple.

2. Fijate desde dónde estás pensando esto. Si caíste en imaginar solo lo que temés, no te castigues. Elegí otra vez sentir libertad y tranquilidad.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: la escena orienta tu atención.

4. No busques una señal afuera en este momento. Primero ordená adentro: volver a una escena breve de bienestar. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir libertad y tranquilidad? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: repetir una imagen simple.

7. No necesitás intensidad. Necesitás repetición. Volvé a volver a una escena breve de bienestar hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: la escena orienta tu atención. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: repetir una imagen simple.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir libertad y tranquilidad por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo volver a una escena breve de bienestar.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir libertad y tranquilidad. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar la escena orienta tu atención.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: repetir una imagen simple.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir libertad y tranquilidad ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con volver a una escena breve de bienestar, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: la escena orienta tu atención.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para repetir una imagen simple. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es volver a una escena breve de bienestar.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir libertad y tranquilidad.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a volver a una escena breve de bienestar.

23. El hábito viejo quiere que vuelvas automático a imaginar solo lo que temés. Hoy interrumpilo con una decisión consciente: repetir una imagen simple.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir libertad y tranquilidad.

25. Guardate esta idea para el resto del día: la escena orienta tu atención. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a volver a una escena breve de bienestar.','internal://practica-7-dias-salud/dia-3','public',true,'{"dia":3,"programa":"salud","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,3 from public.collections c join public.content_items i on i.slug='practica-7-dias-salud-dia-3' where c.slug='practica-7-dias-salud' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-salud-dia-4','guided_day','Día 4','# Día 4 - NO PELEAR CON EL CUERPO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Casi todos pelean contra su cuerpo. Se enojan con el cuando algo no anda, lo tratan como enemigo, lo maltratan con la mente. Pero tu cuerpo no es tu enemigo: es tu aliado mas fiel, el que te lleva todos los dias sin quejarse.

Neville decia que el mundo entero es tu imaginacion empujada hacia afuera. Tu cuerpo tambien. No es algo separado de vos: es tu creacion mas intima.

Hoy, deja de pelear. En vez de enojarte con lo que no anda, hablale con calma, con amor. Como le hablarias a alguien que amas y esta cansado.

Abri los ojos. Hoy no peleas con tu cuerpo. Lo tratas como aliado.

## Meditación del mediodía

Frena un minuto.

La preocupacion por la salud es, en el fondo, imaginar enfermedad. Y lo que imaginas, tu cuerpo lo recibe como instruccion. Preocuparte por enfermarte le enseña al cuerpo a enfermarse.

Si te descubris preocupado por tu salud, pará. Reconocelo: "estoy imaginando lo que no quiero". Y cambia la imagen.

Cerra los ojos. En vez de imaginar el problema, imagina el cuerpo restaurado, en su estado natural de salud. Sentí el alivio de eso.

Abri los ojos. Dejaste de imaginar enfermedad. El cuerpo respira aliviado.

## Meditación de la tarde

Para. Respira.

Neville decia: no determines los medios. Tu trabajo es sentir el fin — estoy sano. El como se cura tu cuerpo, por que camino, con que ayuda: eso no es tu trabajo. El cuerpo sabe sanar; solo necesita que no lo sabotees con miedo.

Cerra los ojos. Deja de diseñar la cura. Deja de vigilar cada sintoma con lupa. Sentí el resultado — salud plena — y confiá en que tu cuerpo y tu poder creador encuentran el camino.

Abri los ojos. Te sacaste de encima el como. Confiaste. El cuerpo sabe.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, deja las preocupaciones de salud afuera de la cama. No son tuyas a esta hora. A esta hora solo sos vos, tu respiracion, y un cuerpo que se esta reparando mientras descansas.

Ponete una mano en el pecho. Sentí el latido. Y decile a tu cuerpo: confio en vos. Gracias por llevarme. Ese acto de amor es mas sanador que cualquier queja.

Dejate dormir en esa confianza. El cuerpo hace su trabajo mejor cuando no lo peleas.

Que descanses en paz con tu cuerpo.

---

1. Chequeo rápido: hoy el foco es pasar de la pelea al acompañamiento. No hace falta hacerlo perfecto. Volvé ahora a aflojar tensión.

2. Fijate desde dónde estás pensando esto. Si caíste en tratar al cuerpo como enemigo, no te castigues. Elegí otra vez sentir gratitud y confianza.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: acompañarte mejor cambia el momento.

4. No busques una señal afuera en este momento. Primero ordená adentro: pasar de la pelea al acompañamiento. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir gratitud y confianza? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: aflojar tensión.

7. No necesitás intensidad. Necesitás repetición. Volvé a pasar de la pelea al acompañamiento hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: acompañarte mejor cambia el momento. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: aflojar tensión.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir gratitud y confianza por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo pasar de la pelea al acompañamiento.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir gratitud y confianza. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar acompañarte mejor cambia el momento.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: aflojar tensión.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir gratitud y confianza ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con pasar de la pelea al acompañamiento, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: acompañarte mejor cambia el momento.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para aflojar tensión. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es pasar de la pelea al acompañamiento.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir gratitud y confianza.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a pasar de la pelea al acompañamiento.

23. El hábito viejo quiere que vuelvas automático a tratar al cuerpo como enemigo. Hoy interrumpilo con una decisión consciente: aflojar tensión.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir gratitud y confianza.

25. Guardate esta idea para el resto del día: acompañarte mejor cambia el momento. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a pasar de la pelea al acompañamiento.','internal://practica-7-dias-salud/dia-4','public',true,'{"dia":4,"programa":"salud","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,4 from public.collections c join public.content_items i on i.slug='practica-7-dias-salud-dia-4' where c.slug='practica-7-dias-salud' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-salud-dia-5','guided_day','Día 5','# Día 5 - SALIR DEL ESTADO DE ENFERMEDAD

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Neville enseñaba algo que libera: la enfermedad y la salud son estados. No son quien sos: son trajes. El estado de enfermedad y el estado de salud existen los dos. Vos elegis cual habitar.

El problema es cuando te confundis con el traje. Cuando decis "yo soy enfermo" en vez de "estoy en un estado de malestar". Porque si sos el traje, no te lo podes sacar. Pero si sos el que lo usa, te lo cambias.

Hoy, no te identifiques con el malestar. Deci: "estoy transitando esto, pero no soy esto". Y empeza a mirar hacia el estado de salud.

Abri los ojos. No sos tu enfermedad. Estas en un estado. Y los estados se cambian.

## Meditación del mediodía

Frena un minuto.

Cada vez que decis "yo soy asmatico", "yo soy diabetico", "yo soy enfermizo", estas poniendote el traje mas ajustado. Estas fijando el estado con el "yo soy" mas poderoso.

No niego lo que te pasa. Pero cambia la frase. En vez de "yo soy enfermo", "estoy atravesando esto y me dirijo a la salud". Suena distinto porque es otro estado.

Cerra los ojos. Sacate el "yo soy enfermo". Ponete el "yo soy alguien que se dirige a la salud". Sentí la diferencia.

Abri los ojos. Cambiaste el "yo soy". Cambiaste la direccion.

## Meditación de la tarde

Para. Respira.

Neville decia que el estado que abandonas no desaparece: sigue ahi, esperando al proximo que caiga. Pero vos ya no estas adentro. Te mudaste.

Cerra los ojos. Salí del estado de enfermedad, a proposito. No lo pelees, no discutas con los sintomas: solo mudáte. Entra al estado de salud. Sentí como se siente habitarlo: el cuerpo liviano, la energia alta, la respiracion libre. Quedate ahi hasta que se sienta un poco natural.

Abri los ojos. Te mudaste de estado. El cuerpo sigue al estado nuevo.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, dormite en el estado de salud. No en el del malestar, que ya conoces. En el del cuerpo sano, fuerte, vital.

Imagina que sos alguien de salud de hierro, que siempre lo fue, para quien estar bien es lo natural. Sentí como piensa esa persona, como se mueve, como duerme tranquila en su cuerpo sano.

Ponete ese traje y dormite adentro de el. Cuanto mas dormis en ese estado, mas natural se vuelve. Y lo que se vuelve natural adentro, se exterioriza afuera.

Que descanses en el estado de salud.

---

1. Chequeo rápido: hoy el foco es no reducir tu identidad a un malestar. No hace falta hacerlo perfecto. Volvé ahora a elegir palabras que no te encierren.

2. Fijate desde dónde estás pensando esto. Si caíste en definirte solo por lo que te pasa, no te castigues. Elegí otra vez sentir que sos más que un síntoma.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: podés atravesar algo sin ser eso.

4. No busques una señal afuera en este momento. Primero ordená adentro: no reducir tu identidad a un malestar. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir que sos más que un síntoma? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: elegir palabras que no te encierren.

7. No necesitás intensidad. Necesitás repetición. Volvé a no reducir tu identidad a un malestar hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: podés atravesar algo sin ser eso. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: elegir palabras que no te encierren.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir que sos más que un síntoma por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo no reducir tu identidad a un malestar.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir que sos más que un síntoma. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar podés atravesar algo sin ser eso.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: elegir palabras que no te encierren.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir que sos más que un síntoma ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con no reducir tu identidad a un malestar, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: podés atravesar algo sin ser eso.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para elegir palabras que no te encierren. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es no reducir tu identidad a un malestar.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir que sos más que un síntoma.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a no reducir tu identidad a un malestar.

23. El hábito viejo quiere que vuelvas automático a definirte solo por lo que te pasa. Hoy interrumpilo con una decisión consciente: elegir palabras que no te encierren.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir que sos más que un síntoma.

25. Guardate esta idea para el resto del día: podés atravesar algo sin ser eso. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a no reducir tu identidad a un malestar.','internal://practica-7-dias-salud/dia-5','public',true,'{"dia":5,"programa":"salud","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,5 from public.collections c join public.content_items i on i.slug='practica-7-dias-salud-dia-5' where c.slug='practica-7-dias-salud' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-salud-dia-6','guided_day','Día 6','# Día 6 - PERSISTIR EN LA SALUD

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Ya sabes casi todo: el cuerpo escucha, sentir la salud, la escena, no pelear, cambiar de estado. Hoy lo unico que hace que todo funcione: persistir.

Porque la mayoria imagina salud un dia, y al siguiente, ante el primer dolor, se rinde y vuelve al miedo. Planta la semilla y la arranca. Y asi no crece nada.

Persistir es sostener la imagen de salud dia tras dia, aunque el cuerpo todavia no lo muestre del todo. Es no bajarte ante cada sintoma.

Abri los ojos. Hoy no aprendes nada nuevo. Hoy decidis: sigo imaginando salud.

## Meditación del mediodía

Frena un minuto.

En estos dias tuviste momentos de confianza en tu cuerpo y momentos de miedo. Es normal. Persistir no es no asustarse nunca: es volver a la salud cada vez que el miedo gana.

Cerra los ojos. ¿En que estado estas ahora? Si te caiste al del miedo, no te castigues. Solo volve. Volve a sentir salud, a imaginar el cuerpo sano. Sin drama. Solo volve.

Abri los ojos. Te subiste de nuevo. Eso es persistir.

## Meditación de la tarde

Para. Respira.

Neville decia: la vision tiene su hora señalada; aunque tarde, esperala, porque llegará. La salud tiene su tiempo de gestacion. El cuerpo se repara a su ritmo. Tu trabajo es no bajarte antes.

El problema es que la mayoria se rinde en el intervalo, cuando todavia no ve mejoria, y ahi abandona justo antes de que el cuerpo termine su trabajo.

Cerra los ojos. Sentí la calma del que confia en el proceso de su cuerpo. No exijas resultados hoy. No midas cada sintoma. Solo seguí sosteniendo la imagen de salud, y confiá.

Abri los ojos. Tu salud tiene su hora. No te bajes antes.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Esta noche, hace lo mismo de siempre. Entrá a tu escena de salud. La misma. Vivila una vez mas, despacio, mientras te dormis.

¿Por que lo mismo? Porque eso es persistir. Noche tras noche, la misma siembra. A veces mecanico, a veces tibio. Esta bien. Lo que cuenta es volver.

Sabe que cada noche que haces esto, tu cuerpo recibe la misma instruccion de salud. Y que un dia, a la hora señalada, el cuerpo la cumple.

Que descanses persistiendo.

---

1. Chequeo rápido: hoy el foco es sostener calma y bienestar. No hace falta hacerlo perfecto. Volvé ahora a volver a la calma.

2. Fijate desde dónde estás pensando esto. Si caíste en medir cada minuto buscando cambios, no te castigues. Elegí otra vez sentir paciencia y continuidad.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: persistir también es cuidarte sin obsesionarte.

4. No busques una señal afuera en este momento. Primero ordená adentro: sostener calma y bienestar. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir paciencia y continuidad? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: volver a la calma.

7. No necesitás intensidad. Necesitás repetición. Volvé a sostener calma y bienestar hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: persistir también es cuidarte sin obsesionarte. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: volver a la calma.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir paciencia y continuidad por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo sostener calma y bienestar.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir paciencia y continuidad. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar persistir también es cuidarte sin obsesionarte.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: volver a la calma.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir paciencia y continuidad ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con sostener calma y bienestar, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: persistir también es cuidarte sin obsesionarte.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para volver a la calma. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es sostener calma y bienestar.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir paciencia y continuidad.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a sostener calma y bienestar.

23. El hábito viejo quiere que vuelvas automático a medir cada minuto buscando cambios. Hoy interrumpilo con una decisión consciente: volver a la calma.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir paciencia y continuidad.

25. Guardate esta idea para el resto del día: persistir también es cuidarte sin obsesionarte. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a sostener calma y bienestar.','internal://practica-7-dias-salud/dia-6','public',true,'{"dia":6,"programa":"salud","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,6 from public.collections c join public.content_items i on i.slug='practica-7-dias-salud-dia-6' where c.slug='practica-7-dias-salud' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

insert into public.content_items (slug,content_type,title,body,source_url,visibility,is_published,metadata) values ('practica-7-dias-salud-dia-7','guided_day','Día 7','# Día 7 - YA SOS SANO

## Meditación de la mañana

Cerra los ojos. Respira hondo. Afloja.

Ultimo dia. Y hoy quiero decirte algo que cambia todo: ya esta. No estas tratando de estar sano. En el estado que aprendiste a habitar, ya lo estas.

Todo el trabajo de estos dias — sentir, imaginar, cambiar de estado, persistir — ya esta adentro tuyo. La salud no esta alla lejos: empieza en la imagen que le das a tu cuerpo, y esa imagen ya la sabes dar.

Sentí ahora, no que vas a estar sano, sino que ya lo estas, en lo que de vos depende: tu imaginacion, tu estado, tu confianza. El cuerpo sigue esa direccion.

Abri los ojos. Hoy no practicas. Hoy vivis como quien ya es sano.

## Meditación del mediodía

Frena un minuto.

Hay una tentacion: seguir vigilando cada sensacion, cada dolor, cada señal, con miedo. Pero esa vigilancia ansiosa es imaginar enfermedad todo el dia. Y eso planta lo que no queres.

Hoy, deja de vigilarte con miedo. Sentí que tu cuerpo esta bien, que sabe cuidarse, que trabaja a tu favor. Desde esa confianza, el cuerpo se relaja y sana mejor.

Cerra los ojos. Sentí la tranquilidad de confiar en tu cuerpo. Como quien confia en un amigo capaz. Soltá la vigilancia. Descansá en la confianza.

Abri los ojos. Dejaste de vigilarte con miedo. El cuerpo agradece la calma.

## Meditación de la tarde

Para. Respira.

Mirá tu dia como lo miraria alguien de salud plena. Con que liviandad se mueve. Con que confianza usa su cuerpo. Sin miedo a cada sensacion, sin dramatizar cada molestia.

Esa persona vive en su cuerpo con naturalidad, sin guerra, sin sospecha. Y desde esa paz, el cuerpo funciona mejor.

Cerra los ojos. Sentí la diferencia entre "tengo miedo de enfermarme" y "confio en mi cuerpo sano". La primera tensa. La segunda afloja. Hoy elegís aflojar.

Abri los ojos. Salí a la tarde como quien confia en su cuerpo. Y vivi desde ahi.

## Meditación de la noche

Acostate. Afloja todo el cuerpo. Tres respiraciones lentas.

Ultima noche de este camino. Y no es un final: es un comienzo. Porque la salud no se termina cuando se termina el plan. Lo que aprendiste — hablarle bien al cuerpo, imaginar salud, confiar — es tuyo para siempre.

Esta noche, dormite en la plenitud de la salud. No como deseo, no como espera: como estado. Ya le das a tu cuerpo la mejor imagen. Ya confias. Ya no peleas.

Ponete la mano en el pecho una vez mas. Sentí el latido. Gracias, cuerpo. Confio en vos. Y dejate dormir en esa gratitud y esa confianza.

Manana te despertas con esto adentro. Para siempre.

Que descanses en la salud.

---

1. Chequeo rápido: hoy el foco es vivir el día con más confianza en tu cuerpo. No hace falta hacerlo perfecto. Volvé ahora a moverte desde cuidado.

2. Fijate desde dónde estás pensando esto. Si caíste en vigilarte con miedo, no te castigues. Elegí otra vez sentir gratitud por lo que tu cuerpo hace hoy.

3. Treinta segundos alcanzan para volver. Cerrá los ojos, respirás una vez y recordá: el objetivo es una relación más tranquila con tu cuerpo.

4. No busques una señal afuera en este momento. Primero ordená adentro: vivir el día con más confianza en tu cuerpo. Después seguí con tu día.

5. Una pregunta para ahora: ¿cómo actuarías si ya fuera natural sentir gratitud por lo que tu cuerpo hace hoy? Hacé una cosa pequeña desde ese lugar.

6. Si la cabeza se fue al estado viejo, volvé sin pelea. Tu práctica de hoy es simple: moverte desde cuidado.

7. No necesitás intensidad. Necesitás repetición. Volvé a vivir el día con más confianza en tu cuerpo hasta que empiece a sentirse conocido.

8. Observá tu conversación interna de los últimos minutos. Si contradice el día de hoy, cambiá una sola frase y seguí.

9. Recordatorio: el objetivo es una relación más tranquila con tu cuerpo. No hace falta demostrarlo ahora; alcanza con volver a elegir ese estado.

10. Hacé una pausa antes de reaccionar. Respiración lenta, hombros sueltos y otra vez: moverte desde cuidado.

11. Lo de afuera puede tardar en acomodarse. Tu trabajo ahora es no abandonar sentir gratitud por lo que tu cuerpo hace hoy por una escena momentánea.

12. No conviertas un pensamiento viejo en una conclusión. Es solo un pensamiento. Elegí de nuevo vivir el día con más confianza en tu cuerpo.

13. Probá esto: durante un minuto no resuelvas nada. Solamente sentí sentir gratitud por lo que tu cuerpo hace hoy. Después retomá lo que estabas haciendo.

14. Si apareció duda, usala como alarma para volver. Duda no significa fracaso; significa que toca recordar el objetivo es una relación más tranquila con tu cuerpo.

15. El estado cambia con pequeñas elecciones repetidas. Esta es una: moverte desde cuidado.

16. No mires cuánto falta. Mirá desde dónde estás viviendo este minuto. Elegí sentir gratitud por lo que tu cuerpo hace hoy ahora.

17. Tu imaginación no necesita una película enorme. Una imagen breve, coherente con vivir el día con más confianza en tu cuerpo, alcanza para reorientarte.

18. Volvé al cuerpo. Aflojá mandíbula y hombros. Desde esa calma, recordá: el objetivo es una relación más tranquila con tu cuerpo.

19. Antes del próximo mensaje o tarea, regalate veinte segundos para moverte desde cuidado. Ese regreso también cuenta.

20. Hoy no estamos buscando perfección. Estamos entrenando dirección. Y la dirección es vivir el día con más confianza en tu cuerpo.

21. Si algo de afuera te movió, no hace falta negarlo. Sentilo, aflojá y después elegí otra vez sentir gratitud por lo que tu cuerpo hace hoy.

22. Hacé el cambio más chico posible: una frase, una imagen o una respiración que te acerque a vivir el día con más confianza en tu cuerpo.

23. El hábito viejo quiere que vuelvas automático a vigilarte con miedo. Hoy interrumpilo con una decisión consciente: moverte desde cuidado.

24. No esperes estar de humor. Podés elegir el estado aun sin ganas. Empezá por sentir apenas un poco de sentir gratitud por lo que tu cuerpo hace hoy.

25. Guardate esta idea para el resto del día: el objetivo es una relación más tranquila con tu cuerpo. Volvé a ella cada vez que te disperses.

26. Cierre de este tramo: no importa cuántas veces te saliste. Importa cuántas veces volviste. Y ahora volvés a vivir el día con más confianza en tu cuerpo.','internal://practica-7-dias-salud/dia-7','public',true,'{"dia":7,"programa":"salud","tipo":"normal"}'::jsonb) on conflict (slug) do update set content_type=excluded.content_type,title=excluded.title,body=excluded.body,source_url=excluded.source_url,visibility=excluded.visibility,is_published=excluded.is_published,metadata=excluded.metadata,updated_at=now();

insert into public.collection_items (collection_id,content_id,sort_order) select c.id,i.id,7 from public.collections c join public.content_items i on i.slug='practica-7-dias-salud-dia-7' where c.slug='practica-7-dias-salud' on conflict (collection_id,content_id) do update set sort_order=excluded.sort_order;

