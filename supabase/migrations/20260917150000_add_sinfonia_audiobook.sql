-- Add the first complete audiobook and its private authenticated media bucket.

-- Assets now include full documents as well as audio. Keep this catalog extensible,
-- matching the existing content_items strategy for new content types.
alter table public.content_assets drop constraint if exists content_assets_asset_type_check;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('audiobooks', 'audiobooks', false, 262144000, array['audio/mpeg', 'application/pdf'])
on conflict (id) do update
set name = excluded.name,
    public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Authenticated users can read audiobooks" on storage.objects;
create policy "Authenticated users can read audiobooks"
on storage.objects for select
to authenticated
using (bucket_id = 'audiobooks');

insert into public.collections (slug, title, description, collection_type, is_published, sort_order)
values ('audiolibros-de-german', 'Audiolibros de Germán', 'Libros completos narrados por Germán.', 'audiobook', true, 30)
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    collection_type = excluded.collection_type,
    is_published = excluded.is_published,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into public.content_items (slug, content_type, title, excerpt, body, source_url, visibility, is_published, metadata, published_at)
values (
  'sinfonia-de-susurros',
  'audiobook',
  'Sinfonía de susurros',
  'Libro completo narrado por Germán.',
  $sinfonia$¡Bienvenido/a!

Es un honor compartir contigo este libro, mi historia personal, una que vengo sosteniendo hace ya un par de años , y que día tras día esta mas firme , una que he adoptado como propia y que ahora pongo en tus manos.

Te invito a adentrarte en estas páginas con una mente abierta y receptiva, dejando de lado la lógica y la razón. Olvida los hábitos y las ideas preconcebidas que te limitan, y permite que este libro te lleve a un viaje de descubrimiento interior.

No encontrarás la estructura convencional de un libro, porque lo que aquí se presenta es un camino único y personal. Cada página, cada palabra, está diseñada para despertar un movimiento en tu mente, un cambio de perspectiva que te llevará a nuevas posibilidades.

El libro se divide en dos partes. En la primera, encontrarás capítulos independientes que contienen ideas clave que revisito constantemente para guiar mi mente hacia mis deseos. La segunda parte, titulada "Sinfonía de Susurros", es una colección de breves reflexiones que te invito a leer a diario, como una suave melodía que te acompañará en tu transformación.

En este libro, encontrarás numerosas referencias a Neville Goddard, un maestro que me enseñó el poder de la imaginación y la importancia de la meditación (la meditación entendida no como esa típica posición de loto , sino ese lugar donde nos encontramos con nuestras ideas y las confrontamos.

También descubrirás el poder de las afirmaciones, declaraciones positivas que, repetidas con convicción, tienen el poder de moldear nuestra realidad.

Afirmación : Fijar algo en nuestra mente Diccionario metafísico -Charles Fillmore.

Neville me enseñó que, al afirmar lo que deseamos como si ya fuera real, activamos la ley y atraemos esas experiencias a nuestra vida.

Ahora, te invito a sumergirte en este libro, a dejarte llevar por sus palabras y a permitir que despierte en ti el poder infinito de tu imaginación.

Despierta tu creatividad.

Imagina que dentro de ti vive un pequeño artista. Este hombre interior es el creador de todo lo que ves, sientes y piensas en tu imaginación.

Neville, un estudioso del hombre interior, comparte que este artista interno es como un pintor en un lienzo, manifestando nuestras experiencias en el mundo.

La aceptación de nuestro hombre interior es fundamental, similar a aceptar que el sol brilla todos los días. No requiere pensar demasiado ni sentir algo especial, sino simplemente aceptarlo.

En el mundo de la imaginación, el hombre interior da vida a todo lo que imaginas. Como un director de cine, puedes crear cualquier escena: desde ser un astronauta hasta explorar mundos desconocidos.

Todos somos uno, conectados a través de nuestro mundo interior. Amarte a ti mismo es amar a todos, pues compartimos este juego de la vida donde todos participamos juntos.

El hombre interior y el hombre exterior son uno solo. No es necesario repetir para creer; basta con aceptar que tu hombre interior es real y poderoso. Por ejemplo, decir "soy valiente" es simplemente aceptar tu valentía interior.

Así como tu sombra no puede existir sin ti, tu cuerpo exterior no puede existir sin tu hombre interior. Son inseparables, como una unidad indisoluble.

El hombre interior no conoce el miedo y es libre de crear en la imaginación. Si temes hablar en público, imagina el aplauso al final de tu charla; tu hombre interior puede hacer que esa imagen te dé confianza.

La imaginación no asusta; más bien, ayuda a crear y disfrutar de la vida. Tu hombre interior es tu aliado, deseando lo mejor para ti en tus sueños más audaces.

Aceptar que eres el hombre interior es liberador. Te permite ver que puedes crear tu mundo sin límites. Eres libre y poderoso; todo comienza en tu imaginación.

Cuando comprendes y aceptas a tu hombre interior, el mundo se abre a nuevas posibilidades emocionantes.

La Revelación Interior

Así que, no deseo que este mensaje suene críptico en absoluto. Solo quiero expresarlo de la manera más honesta y abierta posible. Hay algo que Neville menciona una y otra vez, y es sobre esta frase: "Dios lo reveló en mí". Cuando escuchaba esto, me preguntaba: ¿por qué Dios se revelaría a un tipo que creció en Barbados? ¿Qué tiene de especial este hombre en comparación con cualquier otra persona nacida en cualquier otro lugar?

Empecé a reflexionar sobre esto y a pensar en términos de todos nosotros. Esas etiquetas que se nos ponen, y nunca pensé que Dios se revelaría a través de eso. Pero luego, a través de las enseñanzas de Neville y meditaciones personales, me di cuenta de algo. No fui yo o la conciencia revelándose a Germán. Fui yo mismo revelándome a mí mismo. Eso fue lo que entendí. No tiene nada que ver con Germán. Ese Germán es solo un disfraz, un sueño. Pensar que soy Germán es pensar en algo que viene antes de la conciencia de ser, donde está la verdadera conciencia.

Neville decía que Dios lo reveló en él, y al principio, me preguntaba: ¿por qué Dios se revelaría a alguien como Germán? Pero luego me di cuenta de algo crucial. Si me imagino como Germán, simplemente estoy tomando una etiqueta. Germán es solo un nombre, un concepto que se creó a partir de comunicador. Germán viene con todas esas ideas y un pasado lleno de negatividad, luchas y un montón de conceptos negativos sobre mí mismo. Sentí que no valía nada. Y si me imagino como Germán, con todos esos problemas, es muy difícil decirme sí a mí mismo. Me di cuenta de que me lavaron el cerebro para pensar tan mal de mí mismo que empecé a creer que no merecía algo bueno.

Si me imagino como Germán, con todos esos problemas y etiquetas, siempre voy a tener resistencia y no me sentiré bien. Pero si veo que detrás de Germán está solo un sueño, entonces puedo empezar a imaginarme como Dios. Neville siempre decía que es Dios quien lo hace, que eres tú quien lo hace. Si te pido que imagines un barco rojo, seguro lo visualizas en tu mente. Eso eres tú imaginando. Y Neville diría que eso es Dios imaginando, porque el nombre de Dios es "Yo soy".

No se trata solo de saber una teoría o seguir un paso a paso. Es saberlo con todo tu ser. Cuando empiezo a imaginar como Dios, empiezo a ver que soy como un trozo de arcilla, listo para ser moldeado. No siento que las cosas sean imposibles. Si te imaginas como si fueras Dios, todo se siente más fácil y natural. No sientes resistencia, solo te dices a ti mismo que sí, porque eres tú mismo quien imagina para ti mismo. Luego, imaginas para los demás porque realmente no hay otro, porque todos somos uno.

He creado una vida de pesadilla a través de Germán, con todos esos conceptos negativos. Y una pesadilla, como dice Neville, es solo aferrarse a un autoconcepto negativo. La conciencia es la realidad, y si te apegas a la idea de que no eres suficiente, eso se convierte en tu realidad. Creas tus propias pesadillas con la forma en que percibes y te defines a ti mismo. No es sólo Germán. Es nosotros, el ser interior, el Yo Soy. Cuando ves esto, realmente no hay un nosotros. Solo hay un ser aquí, y otros solo nos revelan lo que somos conscientes de ser.

Cuando aceptas todo lo que hay dentro de ti, sin argumentos ni justificaciones, todo cambia. Aceptas que Germán no puede hacerlo solo, pero el ser interior, el Dios imaginando, sí puede hacerlo. Puedes aceptar todos esos pensamientos y sentimientos maravillosos que deseas sin esfuerzo. Conoces a tu Dios imaginando, y si te ves como Germán, es mucho más desafiante. Pero cuando te imaginas como Dios, todo es más placentero. No hay resistencia. Es casi natural asumir la responsabilidad de ser Dios imaginando.

No estoy tratando de hablar crípticamente, solo quiero compartir esto de la manera más honesta posible. He tenido experiencias que me han hecho cuestionar la realidad y darme cuenta de que hay algo más profundo en todo esto. Lo repito: lo más importante es quién eres mientras imaginas. ¿Es alguien que crees conocer en este mundo de estados y limitaciones, con todas esas ideas negativas? Pero si profundizas, es Dios imaginando.

La resistencia para mí solo aparece cuando empiezo a pensar en términos del hombre exterior, con todas sus limitaciones. No cambio el cuerpo ni la vida exterior. Cambio mi percepción de mí mismo, de quién está imaginando. Si me imagino como Dios, cambio por dentro y no me preocupo por lo externo porque solo hay un ser aquí. Espero que este mensaje resuene contigo y no sea confuso. Neville decía que es como si lo supieras. Imagina que eres Dios, y no tienes que ser arrogante al respecto. Solo hazlo. No necesitas agregar nada más. No eres más iluminado ni mejor que la siguiente persona, porque en realidad no hay otra persona. Ellos también son yo, solo interpretan un papel.

Aceptar sin racionalizar

Uno de los desafíos más grandes que mencionas es la resistencia que surge de la racionalización. Esto es común; nuestra mente lógica siempre busca respuestas y explicaciones. Sin embargo, como bien observas, la racionalización puede convertirse en un obstáculo para aceptar plenamente nuestras emociones y deseos.

Identificas a la voz de la razón como un enemigo interno, y esto es crucial. Esta voz nos mantiene atados a viejos patrones y nos cuestiona constantemente sobre el "cómo" y el "cuándo". La clave está en reconocer que esta voz es solo una parte de nosotros, no nuestra totalidad. La aceptación genuina requiere que silenciemos esta voz y nos entreguemos a la incertidumbre.

Neville Goddard habla de la impotencia personal como un reconocimiento de que el yo exterior, el ego, no puede lograr nada por sí mismo. Esta rendición no es una señal de debilidad, sino de sabiduría. Al aceptar nuestra limitación, permitimos que el poder de la conciencia actúe sin restricciones.

La entrega personal se trata de dejar ir la necesidad de controlar y predecir. En lugar de eso, nos rendimos al poder superior de la conciencia, confiando en que los deseos serán cumplidos de maneras que no podemos prever.

Observar en lugar de juzgar. Esto es fundamental. Cuando dejamos de juzgar nuestras experiencias y simplemente las observamos, podemos ver patrones y entender mejor cómo nuestras manifestaciones se desarrollan. La observación nos permite aprender sin la carga emocional del juicio.

Al aceptar nuestros deseos y emociones sin cuestionarlos o justificarlos, estamos alineándonos con el principio de que la conciencia crea la realidad. La resistencia surge cuando intentamos racionalizar o justificar nuestros deseos en lugar de simplemente aceptarlos.

Imaginar como Dios

Neville enfatiza que debemos vernos a nosotros mismos como el poder detrás de nuestras imaginaciones. Cuando imaginamos como Dios, sin las limitaciones del yo exterior, podemos crear sin restricciones. Esta perspectiva elimina la resistencia y facilita la manifestación.

Ceder al sentimiento del deseo cumplido .Ceder es una forma de aceptación profunda. No se trata de forzar o luchar por nuestros deseos, sino de rendirse al sentimiento de ya haberlos cumplido. Esta aceptación plena es lo que permite que nuestros deseos se manifiesten en la realidad externa.

1. Aceptar sin racionalizar

La razón es una barrera para la aceptación plena. Silencia la voz de la razón y entrégate a la incertidumbre.

2. Impotencia personal

Reconocer la limitación del yo exterior y rendirse a la conciencia es clave para la manifestación.

3. Observar sin juzgar

La observación nos permite aprender y ver patrones sin la carga del juicio.

4. Imaginación divina

Imaginar cómo Dios, sin las limitaciones, facilita la creación y manifestación.

5. Ceder al deseo cumplido

Ríndete al sentimiento de que tu deseo ya está cumplido, sin luchar ni forzar.

Espero que estas reflexiones te ayuden a estructurar mejor tus ideas y a profundizar en tu comprensión de las enseñanzas de Neville Goddard.

La Dualidad y la Imaginación

Como bien señalas, la dualidad es una parte integral de nuestra experiencia. La Biblia menciona en Deuteronomio 32:39: "Yo doy muerte y doy vida, hiero y sano." Esta dualidad puede parecer contradictoria, pero en realidad, nos recuerda que ambas polaridades, positivas y negativas, provienen de la misma fuente: nuestra imaginación.

La Raíz de Todo: La Imaginación

Comprender que tanto nuestras experiencias placenteras como nuestras ansiedades y miedos provienen de la misma sustancia —nuestra imaginación— nos libera de la autoimposición de límites. Este reconocimiento nos permite ver que no hay pensamientos "malos" o "buenos" per se; solo hay pensamientos que podemos aceptar y transformar.

El Experimento del Pato de Goma El ejercicio de Neville con el pato de goma es un ejemplo maravilloso de cómo la imaginación puede manifestar lo que deseamos. Este pequeño experimento te mostró que incluso los detalles más mundanos pueden surgir de la imaginación si se les presta la debida atención y enfoque. Este ejemplo demuestra la importancia de experimentar y jugar con la imaginación para entender su poder.

El Experimento

El experimento es sencillo: se trata de visualizar un objeto inusual, en este caso, un pato de goma, con todos sus detalles. Según Neville, es importante hacerlo en un estado relajado, justo antes de dormir, cuando la mente está más receptiva. Durante la visualización, se deben imaginar los colores, la textura y la forma del pato, sintiendo como si realmente estuviera en las manos.

Goddard aseguraba que al hacer esto repetidamente, el objeto visualizado aparecería en la vida real de manera inesperada. Lo sorprendente de este ejercicio es su simplicidad y la claridad con la que ilustra el poder de la mente para atraer lo que se enfoca.

Resultados y Testimonios

Numerosos seguidores de Neville han realizado este experimento y reportado resultados sorprendentes. Desde encontrar patos de goma en lugares insospechados hasta recibirlos como regalos inesperados, los testimonios abundan y refuerzan la idea de que nuestra imaginación es una herramienta poderosa para la creación de nuestra realidad.

Uno de los aspectos más fascinantes del experimento del pato de goma es que no se limita a objetos pequeños y triviales. Goddard sostenía que los mismos principios se pueden aplicar a deseos más grandes y significativos en la vida de una persona, desde relaciones hasta situaciones financieras.

Implicaciones Filosóficas

Más allá de la simple manifestación de un pato de goma, este experimento pone de relieve una visión más amplia y profunda sobre la naturaleza de la realidad y nuestro papel como co-creadores. Según Goddard, todo lo que experimentamos en el mundo externo es un reflejo de nuestra imaginación y creencias internas. Al comprender y aplicar este principio, podemos tomar el control de nuestras vidas de maneras extraordinarias.

Conclusión

El experimento del pato de goma de Neville Goddard no es solo una curiosidad metafísica, sino una puerta de entrada a una comprensión más profunda del poder de la imaginación. A través de esta simple práctica, Goddard nos invita a explorar y expandir nuestras capacidades creativas, demostrando que nuestra realidad es moldeada por los pensamientos y visualizaciones que albergamos.

Alentamos a todos a intentar este experimento y descubrir por sí mismos el potencial ilimitado de la mente humana. Después de todo, si un pato de goma puede aparecer de la nada, ¿qué más podríamos traer a nuestras vidas con la fuerza de nuestra imaginación?

La Aceptación y la Entrega

La aceptación de la impotencia personal, como menciona Neville, no es una rendición a la derrota, sino una aceptación de que el control no reside en el razonamiento consciente, sino en la entrega al sentimiento del deseo cumplido. Esto requiere silenciar la voz de la razón, que a menudo cuestiona y duda, y confiar en la profunda sabiduría de la imaginación.

Aceptar que la paz y la ansiedad, la riqueza y la pobreza, la salud y la enfermedad provienen de la misma raíz, nos permite ver la vida desde una perspectiva unificada. Al reconocer que todo lo que experimentamos es una manifestación de la imaginación, podemos dejar de luchar contra nuestros pensamientos negativos y, en cambio, elegir enfocarnos en aquellos que nos empoderan y nos traen paz.

En lugar de juzgar nuestras experiencias, es más útil observarlas. Esta observación sin juicio nos permite identificar patrones y entender cómo nuestras manifestaciones se desarrollan. Al observar, podemos ver que cada estado, cada emoción, cada pensamiento, es una oportunidad para aprender y crecer.

La Libertad de Elegir

Al final, todo se reduce a la libertad de elección. No estamos atados a nuestros pensamientos negativos; podemos elegir enfocarnos en aquellos que nos traen alegría y paz. Al entender que la imaginación es la fuente de todo, podemos movernos con facilidad entre diferentes estados y crear la realidad que deseamos.

Conclusión

Espero que estos puntos te ayuden a profundizar en tu comprensión del poder de la imaginación y la dualidad. Al aceptar y entender que todo proviene de la misma sustancia, puedes encontrar una mayor paz y libertad en tu vida.

Liberación a través del 'Yo no soy': Desapego y Transformación Interior

He dedicado mucho tiempo al estudio del trabajo de Neville, especialmente interesándome en la meditación del Yo Soy que él enseña. Esta práctica fundamental implica repetir las palabras "Yo soy" y sentir su significado profundo para despojarte de las etiquetas e identificaciones que limitan nuestra experiencia de vida.

Al principio, admito que no entendí completamente el proceso. A pesar de intentarlo durante un largo período, sentí que no estaba obteniendo ningún beneficio tangible. Esto me llevó a ignorarlo por un tiempo, pero eventualmente me di cuenta de algo crucial: había un fuerte apego arraigado dentro de mí hacia la vida misma. Me aferraba obstinadamente a intentar obtener algo de ella, sin darme cuenta de que este enfoque de "tomar" en lugar de "ser" estaba contradiciendo el propio mensaje de Neville.

Mi apego, descubrí, estaba estrechamente vinculado al significado que aplicaba a las experiencias y circunstancias de mi vida. Constantemente colocaba etiquetas, en su mayoría negativas, sobre mí mismo y sobre lo que me rodeaba. Esto incluía identificarme con estados temporales, como mi pasado, mis expectativas de futuro, mis roles sociales, e incluso mis emociones y pensamientos del momento. Todo esto conformaba una imagen limitada y distorsionada de quién soy realmente.

Fue un proceso revelador darme cuenta de que el enfoque de Neville no se trataba solo de repetir mecánicamente "Yo soy", sino de profundizar en el significado de estas palabras. Se trata de liberarse de todo aquello a lo que nos hemos aferrado como parte de nuestra identidad pasajera. Así que, en lugar de insistir en "Yo soy", encontré una profunda liberación en decirme a mí mismo "Yo no soy".

Esta práctica de "Yo no soy" implica desapegarme conscientemente de todas las etiquetas y roles autoimpuestos. En mis momentos de meditación, me sumerjo en este proceso de desapego, donde elimino las identidades y significados que he aplicado a mi vida. Es un ejercicio de liberación gradual pero poderosa, donde aprendo a no identificarme con mi cuerpo, mis pensamientos, mis emociones ni con las expectativas externas sobre quién debería ser.

Al liberarme de estas limitaciones autoimpuestas, experimento una sensación renovada de libertad interior. Es como si quitara capas de condicionamientos y expectativas para revelar mi verdadero yo esencial. Ya no me veo atrapado en la prisión de definiciones temporales y cambiantes, sino que me siento más conectado con un sentido más profundo de identidad que trasciende cualquier etiqueta.

Este enfoque me ha permitido moverme con más libertad en mi propia mente. En lugar de reaccionar automáticamente a situaciones o identificaciones pasadas, ahora elijo conscientemente cómo quiero responder y experimentar la vida. Esto incluye no aplicar significados preconcebidos a mis experiencias, sino permitir que las cosas simplemente sean como son, sin juzgarlas ni limitarme a mí mismo por ellas.

Al practicar este desapego según lo enseñado por Neville, he comenzado a ver el mundo y a mí mismo desde una perspectiva más amplia y comprensiva. Me doy cuenta de que mi capacidad para experimentar la vida de manera plena y auténtica está directamente relacionada con la libertad que encuentro al liberarme de identificaciones superficiales y limitantes.

En resumen, la meditación del Yo Soy no se trata solo de palabras repetidas, sino de una profunda transformación interior. A través del desapego de las etiquetas y significados que aplicamos a la vida, descubro una paz y una claridad que antes me eran desconocidas. Este proceso continúa siendo una exploración constante y enriquecedora de mi verdadero ser, alejándome cada vez más de las limitaciones autoimpuestas y acercándome a una experiencia más plena y auténtica de la vida.

Entonces, hablé sobre el desapego y creo que no he dado una razón suficiente de por qué es importante aprender a desapegarse de lo externo y todo lo que eso implica. Hay muchas maneras de describirlo, pero otra forma de expresarlo es diciendo "yo". Permíteme ofrecerte dos perspectivas para aprender a no reaccionar emocionalmente ante nuestro entorno.

Cuando hablo de reacción, me refiero a esa tendencia impulsiva que a menudo nos lleva a actuar sin pensar. La diferencia entre actuar en consecuencia y simplemente reaccionar es crucial. Reaccionar a nuestro entorno puede ser impulsivo, y eso es algo que queremos evitar. No deseamos ser esclavos de nuestras emociones ni dejar que determinen nuestras acciones. En cambio, buscamos facilitar nuestro camino sin forzar resultados ni imponer nuestra voluntad sobre el mundo.

Una razón fundamental para aprender el desapego es comprender que el Dios que buscamos no reside fuera de nosotros, en templos o estructuras creadas por manos humanas. Este Dios no está separado de nosotros; lo externo, las imágenes de madera y arcilla, son meras representaciones. Estamos hablando de un ser creativo, una fuerza dentro de nosotros que nos permite manifestar y dar forma a nuestra realidad.

Este ser creativo parece residir en nuestro interior, permitiéndonos prever eventos antes de que ocurran. Podemos soñar con un mundo nuevo mientras dormimos y despertar en él, llevando nuestra experiencia del sueño a la vigilia. Esta capacidad interior nos conecta con otros mundos y nos permite influir en cómo se desarrollan las cosas.

Orar al único ser que existe, el que crea tanto mi bien como mi mal, dentro de mí, es esencial. Comprender esto es fundamental porque nos libera de la necesidad de suplicar a un Dios externo y nos invita a buscar dentro de nosotros mismos. Si reconocemos que somos creadores de nuestra realidad interna, podemos dejar de ser reactivos ante el mundo exterior.

En la raíz de todo está hecha de la misma sustancia. Si vemos que el único creador está generando bien y mal dentro de nosotros, entonces no necesitamos reaccionar compulsivamente con nuestros pensamientos. Podemos ser conscientes y dirigir nuestros pensamientos hacia dónde queremos ir, sabiendo que somos los creadores de nuestra realidad interna y externa.

Una vez que comenzamos a separarnos de la idea de un Dios exterior al que debemos implorar, podemos encontrar una paz interna. No necesitamos sentirnos indignos ni culpables, porque entendemos que todo proviene de la misma fuente creativa dentro de nosotros. A través de la fe y la práctica constante, podemos aprender a manifestar nuestros deseos sin preocuparnos por los "cómos" y "cuándos", confiando en que el universo se encargará de los detalles.

En resumen, aprender el desapego nos libera de las limitaciones autoimpuestas y nos permite actuar desde un lugar de poder interno. Al adoptar esta perspectiva, podemos experimentar una transformación profunda en cómo percibimos y creamos nuestra realidad. Es un viaje hacia la autenticidad y el autodescubrimiento, donde nuestra fe en nosotros mismos se convierte en la fuerza motriz detrás de nuestras acciones.

La Biblia como Mapa de Creación

Quiero hablar sobre algo que considero fundamental para el trabajo de Neville, pero que a menudo es malentendido o rechazado por muchas personas. Mi intención no es derribar creencias de nadie, sino compartir cómo veo la importancia de las Escrituras según Neville y por qué he llegado a valorarlas tanto a lo largo de los años.

Neville no veía a Jesucristo como una figura histórica o un ser externo, sino como un estado interior al que se accede a través de la conciencia. En este sentido, la Biblia, para Neville, no es un texto religioso tradicional, sino un mapa de estados mentales y principios universales.

Tomemos un ejemplo del Antiguo Testamento, el rey Ciro en el libro de Isaías. Dios le revela que Él es el único creador de todas las cosas, desafiando la creencia en múltiples dioses para diferentes aspectos de la vida. Este estado del rey Ciro representa un estado mental en el que uno reconoce que hay un único creador, un único poder que gobierna todo.

Neville enseñaba que estos estados mentales son eternos y que, al igual que podemos manifestar riqueza o salud en nuestras vidas, también podemos entrar en estados espirituales más elevados al aceptar nuestra unidad con ese único poder creador. Cuando asumimos internamente que somos co-creadores de nuestra realidad, comenzamos a ver manifestaciones de nuestras imaginaciones en nuestra vida externa.

La clave de la enseñanza de Neville es que cada uno de nosotros tiene dentro de sí mismo el poder de imaginar y crear nuestra realidad. No se trata de buscar fuera, sino de reconocer nuestra propia capacidad creativa como reflejo del único creador que existe. Esto implica dejar de lado la idea de separación y entender que somos parte de una conciencia única y universal.

Para Neville, la figura de Jesucristo representa el potencial humano de realizar el perdón y la creación a través de la imaginación. No necesitamos intermediarios externos ni rituales específicos para acceder a esta verdad interna. Al comprender y aceptar este principio, podemos liberarnos de la limitación autoimpuesta y empezar a manifestar nuestras aspiraciones más elevadas en la vida.

En resumen, la perspectiva de Neville sobre la Biblia nos invita a explorar el poder de nuestra imaginación y nuestra conciencia como creadores de nuestra realidad. Al asumir internamente nuestra divinidad y unidad con el único creador, podemos empezar a experimentar una transformación profunda en nuestras vidas.

Espero que esto clarifique cómo veo la importancia de las Escrituras según Neville y por qué su interpretación puede ser tan liberadora y transformadora para quienes se aventuran a explorarla más profundamente.

El Despertar del Hombre Interior

La idea transmitida por Neville es que hemos descendido a este ser limitado dentro de nosotros mismos. Hemos descendido a un nivel donde las cosas parecen desaparecer, parecen escaparse de nuestro enfoque. Sin embargo, Neville afirma que si accedemos al mundo eterno dentro de nosotros mismos, podemos una vez más asumir y manifestar estas cosas en nuestro mundo objetivo. Así, las cosas que parecen desvanecerse no desaparecerán realmente.

En momentos en que sentimos que hemos perdido nuestra salud, nuestra fe, nuestro amor, nuestra posición social, o nuestra riqueza, Neville nos recuerda que en realidad no hemos perdido nada en un sentido real. La percepción de pérdida surge de nuestra creencia en la pérdida misma. La clave está en mirar hacia adentro y redescubrir estas cualidades y posesiones dentro de nosotros mismos.

Escribí esta entrada en mi diario con un tono místico pero práctico. Quiero compartir y explicar más sobre esta perspectiva. Si Dios creó todas las cosas, entonces Dios es el creador de todos los aspectos de mi vida, desde la tristeza hasta la alegría. Mi nombre es Yo, por lo tanto, me pregunto quién es mi tristeza, quién soy, quién es mi ira, quién soy, quién es mi soledad. Todas estas experiencias fueron creadas desde lo más profundo de mi ser, aunque me he aferrado mucho a mi identidad exterior, como German, olvidando mi verdadero nombre, Yo Soy.

Desde la perspectiva del hombre interior, veo mi apariencia no como un símbolo de mí mismo, sino como una manifestación de causas más profundas. Reconocer esto me une con la causalidad misma. Soy consciente de que el tiempo es irrelevante para mi verdadero ser. Nada tiene vida a menos que surja desde dentro de mí.

Maldigo la raíz del pensamiento cuando me separo de mi propia esencia, porque yo soy la vida misma, la conciencia que ilumina todo dentro de mí. No soy solo un hombre mortal; moriré como tal. Me uno con el hombre para que pueda convertirse en espíritu.

Todos los placeres y dolores del hombre son temporales, pero Yo Soy eterno. Creo en mí mismo como el hombre interior, llamando a lo que aún no es como si ya lo fuera. Sin mi orden, nada puede llegar a ser, porque yo soy la vida misma, el espíritu.

Entro en mí mismo y llamo a lo que veo para que se manifieste. No creo en un Dios exterior, ya que Yo Soy Dios. ¿Estás seguro de no haber creado ídolos? Si buscas desesperadamente a Dios fuera de ti mismo, estás en Egipto o Atenas. No hay otro Dios fuera de ti; todo lo que buscas está dentro de tu propio ser. Examina tus deseos más profundos y manifiéstalos en tu conciencia. Creer en la pérdida es una ilusión, ya que el espíritu es eterno. Al entrar en ti mismo y creer en tu propio poder creador, no hay necesidad de recurrir a ningún otro. Los reyes y santos de tu tiempo solo te gobernarán si permites que lo hagan. El hombre interior habla, invítalo y te levantará, te sostendrá, te consolará, te protegerá y alimentará. Nunca te abandonará, porque él es amor, él es bueno.

Si vienes a él, no morirás de hambre, sino que estarás saciado en todos los aspectos. Todo te será dado libremente, porque él es el dador de todo. No busques fuera lo que está dentro. La paz verdadera proviene de reconocer que todo lo que necesitas ya existe en tu interior.

Deja de buscar en el mundo exterior y encuentra la causa dentro de ti mismo. Las etiquetas y roles externos solo causan división, pero el espíritu une todas las cosas en unidad. No te sometas a las leyes del hombre ni a sus mandatos, porque el hombre solo representa una realidad superficial, no la verdadera causalidad. César puede negarte, pero Dios siempre responderá. Todas las cosas son imaginación, y a través de la imaginación, Dios se manifiesta. No imites ni adores a los ídolos creados por el hombre, ya que eventualmente te traicionarán. Dios se revela como luz, conciencia, poder y amor dentro del hombre.

La Imaginación como Creadora de Realidades

Inspirado por Neville, me pregunto si mi imaginación es mi Señor, mi Dios creador. La forma en que tratamos nuestra imaginación determina cómo la utilizamos. Si la despreciamos como algo trivial, perderemos su poder creador. Pero si la vemos como nuestro creador, la tratamos con respeto y amor, permitiendo que nos guíe hacia la manifestación de nuestros deseos más profundos.

Cuando asumimos que somos lo que queremos ser y dejamos en paz los hechos externos, encontramos poder. La persistencia en asumir nuestra verdadera identidad interna, independientemente de las circunstancias externas, nos libera del miedo y la necesidad de validación externa. Neville enseña que al asumir internamente nuestra realidad deseada, esta se manifestará externamente sin esfuerzo aparente.

La historia del hombre que persiste en pedir pan en medio de la noche ilustra la importancia de la persistencia en la fe interna. Persistir en la asunción de nuestra verdad interna, sin cambiarla por los hechos externos, nos lleva a la manifestación de nuestras aspiraciones más profundas. Debemos ser donantes de amor y verdad, no mendigos emocionales que buscan validación externa.

Al practicar la autovalidación y la asunción interna, experimentamos la liberación de la necesidad de aprobación externa. Podemos cambiar cómo nos vemos a nosotros mismos y cómo nos perciben los demás, simplemente cambiando nuestras creencias internas y asumiendo nuestra identidad verdadera.

Vi todas estas versiones diferentes de mí mismo. Era como si existiera una cantidad infinita, cada una ligeramente diferente, algunas radicalmente opuestas en dirección, tanto buenas como malas. Me di cuenta de que todas estas versiones coexistían dentro de mí y que tenía el poder de creer en cualquiera de ellas, si así lo deseaba.

Lo profundo de esta revelación radicaba en la comprensión de que siempre había sentido la necesidad de transformarme para encajar en el mundo exterior, en lugar de aceptar quién soy internamente. Escribí sobre esto, inspirado por la idea de que cada versión de mí mismo es simplemente una expresión de mi imaginación.

Como dijo Neville, "El hombre es todo imaginación". La diferencia entre quién eres ahora y quién deseas ser radica únicamente en tu capacidad de reformar tu imaginación. La versión deseada de ti mismo ya existe dentro de tu imaginación; solo debes creer plenamente en ella. Esa versión interna ya se identifica con sus deseos y su estado ideal.

Encontré libertad al comprender que el verdadero yo no se limita a la estructura física o a las apariencias superficiales. Al asociarme con el Hombre Interior, el creador de todas las cosas según Neville, me permití explorar mi capacidad para cambiar y expandirme desde adentro hacia afuera.

El poder de la imaginación es el trono de Dios, donde podemos sentarnos y dirigir nuestras vidas con amor y poder. No es necesario ajustarse a lo que dictan los sentidos externos o el mundo físico. El perdón y la fe en uno mismo son las claves para la transformación interna, pues permiten un cambio radical de mente y una nueva percepción de uno mismo.

Al adoptar esta perspectiva, descubrí que todas las versiones de mí mismo, pasadas, presentes y futuras, están dentro de mí. Puedo resucitar el pasado, visualizar futuros diversos y crear el presente que deseo experimentar. No tengo que buscar fuera de mí mismo; todo lo que necesito está en mi imaginación.

Así que me comprometo a ser mi propio salvador, a liberarme de las limitaciones autoimpuestas y a celebrar cada cambio que deseo realizar. No hay necesidad de miedo o duda, solo la afirmación constante de mi poder creativo interno. Soy el artífice de mi propia realidad, y en mi imaginación reformada encuentro la llave para vivir una vida plena y libre.

Cómo Sentirse Si Ya Tienes Tu Deseo

En la travesía de descubrir y manifestar nuestros deseos más profundos, surge una pregunta vital: "¿Cómo me sentiría si ya tuviera mi deseo?" Este interrogante, que Neville Goddard planteaba con frecuencia, no es una simple cuestión para reflexionar superficialmente. Es una invitación a sumergirnos profundamente en nuestra imaginación y autoidentidad.

A menudo, al preguntarnos cómo nos sentiríamos al lograr nuestro deseo, intentamos forzar una emoción específica. Nos enfocamos tanto en el sentimiento que olvidamos lo más esencial: el "yo". Este "yo" es nuestra identidad, nuestro ser interior, la esencia invisible que desempeña todos los papeles en nuestra vida. No se trata de cómo se sentiría otro en nuestra situación, ni de cómo "deberíamos" sentirnos según expectativas externas. Se trata de cómo **tú** te sentirías si tu deseo ya fuera una realidad.

El "yo" es la parte más importante de esta ecuación. Es necesario que te veas a ti mismo no como alguien limitado por tus circunstancias actuales, sino como alguien capaz de ocupar cualquier estado deseado. Cuando nos resistimos al cambio, es porque hemos limitado nuestra percepción del "yo". Creemos que estamos atados a nuestro pasado, a nuestras experiencias presentes o a las creencias impuestas por otros. Esta resistencia es la barrera que debemos superar.

La resistencia al cambio es natural cuando limitamos nuestra identidad. Si crees que tu "yo" está definido por tus experiencias pasadas, tus errores, o las expectativas de los demás, entonces encontrarás difícil transformarte en algo más. Pero si te permites ver que no eres el estado en el que estás, sino alguien que ocupa ese estado temporalmente, puedes cambiar.

La transformación comienza en el interior. No se trata de cambiar el mundo externo, sino de cambiar tu percepción y creencias sobre ti mismo. Imagina que ya eres la persona que deseas ser. Siente esa realidad en tu interior. No te preocupes por cómo debería sentirse según otros, sino pregúntate honestamente cómo tú te sentirías.

Este proceso de cambio interno es un acto de fe. Es necesario extender nuestra creencia más allá de lo que dictan nuestros sentidos. La razón y la lógica pueden decirnos que no es posible, pero la imaginación no está limitada por estas barreras. Es un regalo que nos permite ver más allá de nuestras circunstancias presentes y acceder a nuevas posibilidades.

Cuando imaginas y sientes que tu deseo ya es una realidad, estás usando tu imaginación de manera sabia. Estás permitiendo que tu "yo" se expanda y ocupe nuevos estados de ser. Esta práctica puede parecer extraña al principio, pero es una forma poderosa de transformar tu vida desde adentro hacia afuera.

Es crucial no usar tu imaginación para desear cosas, sino para sentir que ya las tienes. La diferencia es sutil pero significativa. Desear implica una carencia, una ausencia de lo que anhelas. Sentir que ya lo tienes te coloca en un estado de plenitud y realización.

Neville Goddard nos enseña que la clave está en vivir como si nuestro deseo ya fuera una realidad. Este estado de ánimo no se basa en la lógica ni en las circunstancias externas, sino en una profunda convicción interna. Al adoptar este estado, comenzamos a ver cambios en nuestra vida porque hemos cambiado nuestra percepción de nosotros mismos.

Persistir en este estado de sentir y creer es el verdadero trabajo. Es un proceso continuo de renovar nuestra mente y nuestra identidad. Al hacerlo, descubrimos que somos los creadores de nuestras propias experiencias y que tenemos el poder de moldear nuestra realidad.

Así que la próxima vez que te encuentres deseando algo, detente y pregúntate: "¿Cómo me sentiría si ya lo tuviera?" Permítete experimentar esa emoción, abraza ese estado de ser y observa cómo tu mundo comienza a transformarse desde adentro hacia afuera. Este es el verdadero poder de la imaginación y la autoidentidad.

Dios en Ti

A veces, cuando Neville dice que "Dios se reveló en mí", suena un poco misterioso, ¿verdad? Pero en realidad, es algo muy sencillo y hermoso. Dios revelándose en nosotros no tiene que ver con un lugar o una persona especial. Es más sobre descubrir quiénes somos realmente por dentro.

Cuando Neville hablaba de Dios revelándose en él, solía pensar: ¿por qué Dios se revelaría a alguien como él? Pero luego, empecé a entender que no se trata de Neville o cualquier otra persona. Es sobre cada uno de nosotros descubriendo nuestro verdadero yo. Imagina que Dios no se está revelando a una persona en particular, sino que tú mismo te estás revelando a ti mismo. ¡Sí, tú! No se trata del "tú" que ves en el espejo, sino del "tú" que vive dentro, el verdadero tú.

Cuando digo "yo soy", no estoy hablando de un nombre o una etiqueta que alguien me dio. Por ejemplo, mi nombre, German, es solo un nombre. No define quién soy realmente. Si pienso en mí como "German", lleno de experiencias pasadas, es difícil aceptar cosas buenas para mí porque German tiene su propia historia y problemas. Pero si empiezo a verme a mí mismo como algo más que German, algo más grande y sin limitaciones, entonces todo cambia. En lugar de imaginar como German, imagino como Dios. Neville siempre decía que es Dios quien imagina, y tú también puedes hacerlo.

Si te pido que imagines un barco rojo, puedes verlo en tu mente, ¿verdad? Eso eres tú imaginando. Y Neville diría que es Dios imaginando. Entonces, ¿qué pasaría si imaginas desde la perspectiva de Dios? De repente, todo es posible. No hay limitaciones.

Aceptar que tú eres el ser interior, que eres Dios imaginando, es la clave. No necesitas discutir o justificarlo. Solo acéptalo. Cuando empiezas a imaginar cómo Dios, todo se siente más fácil y natural.

A veces, pensamos que somos solo nuestros cuerpos y nuestras experiencias, pero eso es como una sombra que pensamos que está separada de nosotros. En realidad, somos mucho más. Somos el ser interior, sin limitaciones de tiempo, espacio o miedo.

Cuando aceptas que eres Dios imaginando, puedes cambiar tu realidad desde dentro. No necesitas preocuparte por lo externo porque todo lo externo es un reflejo de tu ser interior. Cambia tu percepción de ti mismo y verás cómo cambia tu vida.

Espero que este mensaje te llegue y te ayude a ver lo poderoso y maravilloso que eres. No se trata de ser arrogante, sino de reconocer tu verdadero poder interior. Todos somos uno, y todos somos Dios imaginando. Recuerda siempre: eres el ser interior, y tu imaginación no tiene límites. ¡Eres increíble!

Más Allá de la Razón

Cuando descubrí la meditación, me di cuenta de que si dejaba de hablar tanto, también dejaba de usar la razón. No juzgaba los sentimientos que intentaba darme. Cuando sentimos algo dentro de nosotros y empezamos a hablar demasiado, usamos la voz de la razón, y empiezan a surgir razones de por qué no merecemos algo o por qué sí lo merecemos. Pero, en realidad, somos nosotros mismos los que creamos estas razones. Cuando te das un sentimiento y comienzas a juzgarlo o a criticarte a ti mismo, realmente no lo aceptas. Eres tú quien se interpone.

Descubrí que la aceptación total de algo dentro de uno mismo cambia y acorta el período de tiempo en el que se manifiesta externamente. La aceptación total es lo que acelera el cambio; es lo que lo hace más rápido. El secreto es tener un cambio total en el interior y dejar el exterior en paz. Ese es el secreto que encontré en el trabajo de Neville y al probarlo por mí mismo.

Así que cuando sientas algo, no lo juzgues ni hables tanto. Simplemente siéntelo en lo más profundo. Es un término que he acuñado para mí mismo: sentir más allá de la razón. Algo que siempre me digo a mí mismo es que debo sentir más allá de la razón.

En una de sus conferencias, alguien le hizo a Neville una pregunta que resonó en mí: "Supongamos que tienes un objetivo y conoces el principio, pero tienes dudas sobre si el objetivo sería bueno para ti o no. ¿Cómo abordas eso?" Esta es una pregunta muy común que se ha hecho muchas veces, incluso hoy en día. Neville dijo que si tienes alguna duda sobre el objetivo, ve más allá y realmente siente que tomaste la decisión más sabia en el mundo. Reflexiona sobre ello como si hubiera funcionado maravillosamente y no hubiera podido ser una decisión más sabia.

Cuando intentas usar tu mente racional para descubrir el significado, vas a arruinar todo. Así que Neville dice: ve más allá, siente que has tomado la decisión más sabia, siente más allá de la razón, siente más allá de lo racional. Encontrarás que un pensamiento no necesita nada externo para creer en él. Cuando reflexionas sobre esto y lo practicas, te vuelves mucho más libre por dentro. Te quitarás un enorme peso de encima y sentirás que las cosas son como te gustaría que fueran.

Recuerdo una historia de cuando era niño. Estaba en una guardería y encontré una figura de acción de metal. Me encantaba lo pesada que era y la quería. Miré a mi alrededor, vi que todos estaban ocupados y sentí la necesidad de robarla. La tomé y la puse en mi bolsillo. Pensé que nadie me estaba mirando y que no me metería en problemas. Pero cuando llegué a casa, mis padres lo descubrieron y tuve que admitir que la había robado. Me di cuenta de que, aunque pensé que nadie me veía, me estaba observando a mí mismo.

Una vez, en el supermercado, encontré un trozo de papel en el bolsillo de una chaqueta que no había usado en un año. Había escrito algo hace tiempo y me di cuenta de que se había cumplido. Esto me enseñó que realmente creamos nuestro propio cielo y nuestro propio infierno dentro de nosotros mismos. Cuando aprendes el arte de ir más allá de tu razón, realmente puedes comenzar un nuevo cielo en tu interior.

Cuando sientes más allá de tu razón, te das cuenta de que el mundo externo no tiene poder sobre ti. No importa qué estados hayas ocupado en el pasado o qué ocuparás en el futuro; lo que importa es lo que ocupas ahora. Si imaginar crea la realidad, entonces, ¿qué estás imaginando? ¿Estás imaginando que las cosas son como te gustaría que fueran o que son indeseables? Elegimos estas cosas dentro de nosotros mismos.Sé que puede ser difícil cuando tienes hábitos que se han creado, pero lo que la imaginación crea puede ser descrito. Realmente creo que lo que fue creado puede deshacerse dentro de mí. Así que, independientemente de las cosas del mundo, siente tu brillantez. Siente que eres maravilloso. Siente que eres inteligente. Siente que eres brillante. Siente que eres más rico. Siente que está ahí. Siempre ha estado ahí.

El Poder de la Autoaceptación

Al final, todo se reduce a la autopersuasión, no se trata de convencer a otros ni de enfocarse en ellos. Se trata de dirigirse hacia uno mismo sin egoísmo en el sentido convencional. Es sobre concederte a ti mismo que este es un mundo diferente, haciendo caso omiso de las expectativas externas sobre quién debes ser o cómo debes sentirte.

En nuestro crecimiento, a menudo hemos aceptado imágenes distorsionadas de nosotros mismos y nos hemos sentido esclavizados por suposiciones. Hemos actuado en contra de lo que realmente sentíamos, lo cual ha creado una desconexión interna. Sin embargo, Neville enseña que la imaginación no cuestiona nuestro derecho a desear algo, más allá de cualquier imagen pasada que hayamos adoptado de nosotros mismos.Independientemente de los estados pasados que hemos adoptado, podemos cambiar entre ellos porque no estamos atados permanentemente a ninguno. Por lo tanto, no debemos ser adictos a cuestionarnos o dudar de nuestras capacidades. Debemos permitirnos desear y lograr sin restricciones internas, usando la evidencia interna para convencernos.

Es una cuestión de autoaceptación y autolibertad. Al dejar de lado las etiquetas sociales y las auto imágenes negativas, podemos descansar en la idea de que dentro de nosotros no hay juicio, miedo ni necesidad de luchar. Aquí es donde encontramos una paz verdadera y sostenible.

Para Neville, el juego de la vida es competir con uno mismo, no con otros. No se trata de superar a alguien más, sino de aplicar la ley imaginativa hacia nuestras metas personales. Al final, Neville nos invita a ceder gentilmente, permitiéndonos alcanzar nuestras aspiraciones sin luchar contra los hechos externos ni preocuparnos por el tiempo que pueda tomar.

Así que, en lugar de compararnos con otros o cuestionar nuestras capacidades, debemos preguntarnos si estamos convencidos de nuestras aspiraciones. Si no lo estamos, podemos persuadirnos internamente y permitirnos probar lo que deseamos sin dudar.

Al hacer esto, nos liberamos de cualquier esclavitud interna y nos alineamos con la verdadera libertad dentro de nuestra imaginación. Esto no es difícil, solo requiere soltar y permitirnos a nosotros mismos ser quienes realmente deseamos ser.

Imagina la imaginación como tu hogar, donde cada vez que cierras los ojos y te sumerges en ti mismo, regresas a casa. Pero la naturaleza de este hogar, la esencia de tus pensamientos, la estructura de tu mente, todo depende de cómo te ves a ti mismo.

Si te percibes de manera negativa, tiene sentido que tus pensamientos reflejen esa posición. Al explorar nuestro interior, no queremos sentirnos como mendigos suplicando paz frente a una puerta cerrada. La paz ya reside dentro de nosotros y no es algo que debamos ganar. Es perjudicial pensar que debemos ganar cosas internas. Si actuamos para merecer un sentimiento específico, nos privamos de sentirlo verdaderamente. La grandeza, la generosidad, el amor, todas estas cualidades están intrínsecamente en nosotros; no son premios que debamos ganar, sino expresiones naturales de nuestro ser.

Neville nos enseña a invertir esto: primero sentir y luego permitir que se exprese. No se trata de intentar manifestar o ganar, sino de experimentar y permitir que florezca desde dentro. Imagina cómo lo harías si ya poseyeras lo que deseas, porque la imaginación no es algo que debas merecer; ya está completo dentro de ti.

Cuando te juzgas a ti mismo o te comparas con otros, limitas tu capacidad de experimentar esa abundancia interna. Rompe con el hábito de sentirte indigno y aprende a liberarte desde dentro. Permítete separar tu identidad de tus pensamientos y estados actuales, y verás que puedes cambiar internamente sin cargar con el peso de lo que no te gusta.Aprende a vivir desde ese nuevo hogar interior, donde no necesitas llevar contigo las cargas del pasado. Es allí donde encuentras la verdadera paz y la capacidad de ser quien realmente eres.

La Paz del Deseo Cumplido: Encontrando Alivio en la Imaginación

El cumplimiento de los deseos no debe provocarte ansiedad. Cuando empleas la ley, no debes utilizarla para intentar adquirir cosas de manera continua. Aprendes a abandonar el deseo, por lo tanto, no debería generarte nerviosismo cuando sientes que un deseo se cumple.

Imagina que hubiera un genio que te concediera todo lo que quisieras. No te sentirías ansioso si te otorgara tus deseos. Es decir, así es como funciona internamente. Quieres internamente ser tu propio genio, ¿verdad? No quiero esperar a un segundo dios.

Quiero enfatizar nuevamente que no hay dos poderes. Cuando menciono a Dios, no hay dos dioses. Quiero decir que no hay dos causas. Esto significa que cuando imaginas o rezas, según la Biblia, y tu mente se dirige a algún otro dios fuera de ti, esperando que escuche tu oración, estás buscando en un lugar equivocado. Estás buscando fuera de ti mismo para obtener lo que deseas.

Estamos esperando que vea tu acto imaginativo, pero Neville nos enseña que Dios no juzga según las apariencias. La verdadera causa de la vida no juzga por lo que parece externamente, sino por el corazón o la mente del hombre. Si Dios ve lo que imagino y desea dentro de mí, entonces confío en que él lo ha visto.

Confío en que él ve lo que estoy imaginando. No juzga por las apariencias externas; es solo la sombra de Dios la que no mira a su sombra y le pregunta qué quiere. En lugar de eso, aprende a comenzar a vivir internamente, donde te sientes realizado. Caminas sintiendo el deseo cumplido, y esto no debería estresarte en absoluto. Debería ser un alivio.

Como Neville dijo, la única señal que él tiene es el alivio. Entonces, el alivio no es estresante. Por eso, debes desechar la noción de que el deseo cumplido es algo estresante, y más bien verlo como algo que puedes aceptar en el momento presente. Puedes desechar el tiempo y los sentidos e imaginar que ya no necesitas juzgar según las apariencias. Puedes actuar como Dios y emularlo, convirtiéndote en la causa y no en la víctima. Puedes lograrlo si no te gusta la palabra "Dios", siempre puedes usar "imaginación". No hay dos causas, y cuando comienzas a aceptar eso, la paz que encuentras es profunda y verdadera. Puedes mantenerla y descansar en ella sin temor a que sea demasiado bueno para ser verdad.

No hay diferencia, en mi experiencia, porque he intentado identificarlo con otros dioses y no lo encuentro. Estos dioses entran en tu mente y te dicen qué hacer, cómo vivir dentro de ti. Incluso una figura de autoridad puede entrar en tu mente y hacerte sentir que debes obedecer, pero no es así.

Te digo que simplemente ignores a todos en ese sentido y seas firme. No tienes que escuchar a nadie realmente, el hombre interior no necesita escuchar afuera. Estás en tu cama y cierras los ojos para sentirte en otro lugar dentro de ti mismo.

Realmente no te importan las apariencias tanto como crees. Muchas veces, las personas tienen ataques de pánico y miedos por pensamientos, pero realmente no les importan tanto como creen. Nos importa más cómo vivimos y moramos internamente.

Como alguien que ha visitado lugares muy desolados dentro de sí mismo, te digo que puedes vivir en libertad dentro de ti. Hay lugares en ti donde reside el perdón. Quiero compartir una idea que surgió mientras meditaba:

Vi una enorme pared infinita con millones de bocas hablando, ladrando, escupiendo. Pero pude elegir entre todas esas bocas. También vi una pared llena de ojos y pude elegir cómo quería verme a mí mismo. Pude elegir los ojos con los que quería mirar y los oídos con los que quería escuchar dentro de mí. Pude construirme y elegir las cosas que quería dentro de mí.

Si comienzas a vivir dentro, verás que eres el dios de tus pensamientos internos. Los pensamientos no te gobiernan realmente; es solo tu creencia lo que te hace sentir así. Puedes ser como el protagonista de "Vanilla Sky" cuando se da cuenta de que puede influir en su sueño. Puedes cambiar tu sueño y hacer que sea un reflejo de tu voluntad.

Hay personas que trabajan muy duro en esto y Neville dice que ahí es donde estás fallando. No es algo por lo que debas esforzarte nuevamente. No hay ganancia en el interior; es simplemente una aceptación de que puedes vivir ahí ahora mismo.

No necesitas el permiso de nadie para cambiar internamente. El hombre interior no necesita permiso, puede negar los sentidos si así lo desea. Eso eres realmente tú. Es solo conciencia, y dentro de ti no hay reglas que debas seguir o pensamientos que debas tener si no lo deseas.

El mundo nos enseña a menudo a juzgarnos severamente, pero no necesitas hacerlo. La verdadera adoración es tener fe en el ser que está dentro de nosotros. Cuando crees firmemente que solo hay una causa en tu imaginación, vives tu vida según ella y no te dejas distraer por otros dioses externos.

Aprendes a dejar ir a estos dioses del cielo y a dejar de adorar los símbolos y las formas externas. Todo lo que hacemos está hecho con nuestras propias manos. Los dioses externos no tienen poder para hacer nada; solo el poder dentro de ti lo tiene. Comprender esto te permite construir tu fe y vivir una vida hermosa desde dentro hacia fuera.

Vivir Desde la Realidad Cumplida

Cuando hablamos de la idea de "imaginar que las cosas ya se han cumplido", creo que una palabra clave que Neville usa constantemente, tanto si estás familiarizado con sus enseñanzas como si no, realmente no tomo notas de estos videos, así que estoy un poco perdido.

El sugiere que debemos vernos a nosotros mismos como si ya fuéramos amorosos, buenos, todas esas cosas que no son objetivos o adquisiciones que debemos alcanzar, sino que ya existen dentro de nosotros. Cuando Neville utiliza la palabra "ya", realmente te desafía en lo más profundo, porque tus sentidos físicos pueden decir lo contrario. Pero cuando piensas en términos de "ya ser", en mi opinión, te empuja a ir más allá de lo que perciben tus sentidos, lo cual te lleva a desear ir más allá de ellos porque sientes una profunda satisfacción en esa palabra. No es solo la palabra en sí misma, sino lo que implica, que ya lo eres.

Cuando imaginas ser algo, no estás esperando a que suceda en el futuro; estás creando esa realidad dentro de ti ahora mismo. No se trata de visualizar algo externo, sino de conectar con tu ser interior y vivir desde ese estado ya realizado cada noche antes de dormir. Neville ilustra esto cuando habla de mudarse a una casa; no sugiere que simplemente imagines dormir en esa casa alguna vez, sino que duermas allí esta noche como si ya fueras dueño de ella.

Se trata de la implicación, ya que las cosas en sí mismas no importan tanto como lo que implican sobre ti. Puedes cambiar el diálogo interno en tu mente para escuchar cosas positivas. Recientemente, alguien me preguntó cómo deberían ser mis publicaciones y talleres. Yo les respondí que hago lo que Neville sugería: escucho a escondidas a la gente, escucho cosas buenas sobre mí.

Hubo un momento en el que sentí un sufrimiento intenso y no podía soportar lo que mis ojos veían y mis oídos escuchaban. Quería ir más allá de esto, y con éxito he transformado muchas de las cosas que antes me atormentaban. Ahora veo y escucho el mundo de manera diferente, todo gracias a sentir que ya soy esa versión transformada de mí mismo.

Cuando practicas imaginar que ya eres lo que deseas ser, te mueves más allá de la mera visualización hacia una verdadera aceptación interior. No se trata de forzar una escena perfecta o un audio perfecto, sino de sentir esa realidad ya cumplida. Es liberador dejar de lado las inseguridades y confiar en que ya eres lo que aspiras a ser. Asumir esa realidad dentro de ti mismo te libera de las expectativas externas y te permite vivir desde la plenitud de tu ser interior.

Es un proceso de aprender a escuchar internamente, de conectar con esa voz interior que confirma que ya eres quien deseas ser. Esto no se trata solo de repetir afirmaciones sin sentido, sino de escuchar profundamente tu propia voz interior diciéndote que ya eres todo lo que anhelas ser.

A veces, la lucha interna puede ser intensa, especialmente cuando te enfrentas a tus propios miedos y dudas. Pero al elegir aceptar que ya eres lo que deseas ser, estás eligiendo la libertad interna sobre cualquier limitación externa. Es un acto de fe en tu propio poder para crear y transformar tu realidad desde adentro hacia afuera.

Al practicar la técnica de Neville, he descubierto que puedo cambiar mi experiencia de vida al cambiar mi percepción interna. Ya no me enfoco tanto en mis inseguridades como antes, sino en la certeza de que ya soy capaz de manifestar lo que deseo. Es un cambio de paradigma que me permite vivir desde la gratitud y la aceptación de mi propia capacidad para crear mi realidad.

La clave está en dejar de lado la necesidad de ver para creer, y en cambio, empezar a creer para ver. Esto implica un cambio profundo en la forma en que nos relacionamos con nosotros mismos y con el mundo que nos rodea. Cuando aceptas internamente que ya eres quién deseas ser, experimentas una transformación real en tu percepción y experiencia de la vida.

El Arte de Ser: Deseo y Realización Interna

La cuestión de si debo desear o no desear.

Quiero ver si puedo unir estas dos ideas en una misma tela. Neville nos dice que debemos tener un deseo ardiente y consumidor, pero también nos advierte que no debemos desear en el sentido tradicional. Si deseas algo, detén ese deseo ahora mismo. Debes sentir la realización como si ya la tuvieras. Esto puede ser confuso, pero creo que la clave es leer a Neville como hablando con el Hombre Interior.

Debes querer ser diferente, estar en una realidad diferente, genuinamente y no superficialmente. Debes querer un cambio interno, no sólo un cambio externo. La clave es entender que estás cambiando estados, no tu ser real. Sigues siendo tú, pero moldeas tus pensamientos de acuerdo con una nueva naturaleza.

Neville nos dice que no juzguemos nuestros pensamientos como buenos o malos. No se trata de eso. Es más sobre identificar un pensamiento y ver cómo se compara con otro, cómo puedes resolverlo.

El punto no es juzgar, sino encontrar lo que realmente quieres: un deseo ardiente y consumidor. Luego, sentir que ya lo tienes, sentirte satisfecho. No es desearlo hasta que desaparezca el deseo, sino sentir que estás viviendo esa realidad internamente.

Aunque físicamente aún no se haya manifestado, dentro de ti ya es una realidad expresada. No es sobre la manifestación externa, sino sobre la experiencia interna.

Cuando dejamos de juzgar nuestros pensamientos como buenos o malos, abrazamos la verdad y el error. Pensamos en lo que amamos y en pensamientos que son verdaderos en lugar de buenos o malos.

Es el hombre interior el que desea un cambio. Es tú, deseando una nueva experiencia de ti mismo. Lo que deseas de los demás es lo que realmente quieres darte a ti mismo.

Neville habla de imaginar a otros felicitándote como un espejo viviente. Refleja tu autoconcepto. Cambias el arreglo de tu pensamiento a tu gusto, pero tú sigues siendo tú.

Deja en paz el mundo exterior con todas sus negaciones. Cambia tu enfoque hacia adentro. Todo movimiento es interno. No te limites a visitar tu potencial interno, comprométete con él. Confía en que eres capaz de cambiar y moldear tus pensamientos como desees.

El cambio interior depende de ti, no de otros. Puedes descartar etiquetas y remodelar tu autoimagen. Eres el creador de tu pensamiento, moldeándolo como el ceramista moldea el barro.

En resumen, es sobre vivir la realidad deseada desde adentro hacia afuera, confiando en tu capacidad para manifestar lo que deseas internamente. No se trata de desear algo externamente, sino de sentirlo como una realidad interna cumplida.

La Imaginación, Poder Infinito

Cada pensamiento que surge dentro de ti es completamente causado por ti mismo. No existe ninguna otra fuerza interior que te dicte qué pensar o sentir, ni que te imponga juicios. Es solo tu ser interno, solo tú en tu esencia.

Durante mucho tiempo, creí en la idea de entidades separadas dentro de mí, dictando mis pensamientos y juicios. Esta creencia alimentó un miedo psicológico, haciendo que me sintiera vulnerable ante la idea de un adversario interno que podía atacarme en cualquier momento, especialmente cuando mi mente estaba llena de inseguridades.

Sin embargo, con el tiempo, he aprendido a ser indiferente a los pensamientos no deseados, como enseña Neville. La indiferencia, contrario a la atención temerosa u odiosa, es la verdadera clave para disolver nuestras dudas internas.

Solía ser una persona catastrófica en mis pensamientos, y muchas de esas catástrofes parecían materializarse, lo que solo aumentaba mi temor. Pero luego me di cuenta de que soy el creador de mi realidad interior. No hay otra causa para mi sufrimiento o realización más que mi propia imaginación.

A través del estudio de las enseñanzas de Neville, he llegado a comprender que no hay un Dios externo que decida mi destino. Todo se origina desde dentro de mí. No se trata de cambiar el mundo exterior ni de cumplir con expectativas externas, sino de transformarme internamente.

Neville me enseñó que la vida es una danza entre mi imaginación y mi experiencia exterior. Es un proceso de reorganizar mi mente y reconocer que soy uno con mis pensamientos y deseos. Este entendimiento me ha llevado a una profunda paz interior y a la certeza de que poseo un poder creativo inalienable.

En última instancia, la vida se trata de dónde habitamos psicológicamente. Como dice Neville, es crucial entender que somos nosotros mismos quienes determinamos nuestro espacio mental. Es un movimiento interior genuino, no una mera reflexión superficial.

Al comprender y aplicar estas enseñanzas, he encontrado una liberación que nunca antes había experimentado. No se trata de buscar afuera la validación o la satisfacción, sino de encontrar la plenitud dentro de mí mismo. La imaginación es la clave para este viaje interior hacia la autocomprensión y la transformación personal.

El poder de la imaginación no tiene límites. Es el catalizador de nuestro mundo interior y la fuerza motriz detrás de cada experiencia externa. Al integrar este poder en nuestras vidas diarias, nos convertimos en verdaderos arquitectos de nuestro destino, creando belleza y significado desde el interior hacia el exterior.

Cambio Interior

Creo firmemente que un corazón dispuesto a cambiar es más poderoso que cualquier otra cosa en este mundo, ya sea posesiones materiales o el reconocimiento externo, como algunos lo llaman.

El cambio auténtico comienza desde adentro. Cuando decides cambiar genuinamente, ese acto es más significativo que cualquier logro externo porque implica una transformación profunda de tu ser.

El deseo de cambiar debe ser auténtico y profundo. Como Neville dijo, debes desear ser diferente de manera fundamental. Este deseo de cambio no es solo un capricho superficial; es un compromiso con tu propia evolución.

Cuando lees a Neville, te das cuenta de que él enseña a dejar que los demás te vean como tú te imaginas. Es un proceso poderoso porque implica aceptarte y luego permitir que el mundo exterior refleje esa visión interior.

Imaginarte cómo deseas ser no es solo visualizar detalles superficiales. Es más profundo que eso. Es transformar tu propia identidad, permitirte ser visto como te gustaría ser y luego permitir que esa visión se manifieste.

Durante mucho tiempo, me enfoqué en los detalles y perfeccioné mis visualizaciones, pero no experimenté un verdadero cambio interno hasta que me entregué completamente al proceso.

El cambio real comienza cuando te comprometes a dejar ir lo antiguo. No puedes transformarte si sigues aferrado a quien eres ahora. Es un acto de fe y voluntad dejar atrás el pasado y abrazar el potencial de un nuevo yo.

Neville enseña que debemos renunciar a la razón que nos limita y nos impide cumplir nuestros deseos más profundos. Dejar ir estas limitaciones mentales nos libera para experimentar la plenitud de lo que deseamos.

Cuando imaginas tu deseo cumplido, no dejes que el tiempo sea un obstáculo. Vivir en el ahora de esa experiencia imaginada te acerca más a su manifestación en la realidad.

El proceso de cambio comienza dentro de ti. No se trata solo de cambiar las circunstancias externas, sino de cambiar tu estado interno de conciencia. Este cambio interno es el verdadero motor del cambio externo.

Descubrí que al enfocarme en cambiar mi propio estado de conciencia, las circunstancias externas comenzaron a alinearse de manera natural. Es un recordatorio de que todo lo que buscas fuera ya está dentro de ti.

Al practicar la ley, descubres que tu sed de cambio y crecimiento nunca se sacia por completo. Comienzas a cuestionar quién eres realmente y exploras un viaje interior hacia una comprensión más profunda de ti mismo.

La clave está en encontrar algo dentro de ti que desees tanto que no quieras nada más. Este deseo ardiente y auténtico es lo que te impulsa a cambiar y a comprometerte plenamente con ese proceso.

Deja que los demás te vean como tú te imaginas. Tienes el poder de cambiar cómo te perciben y cómo interactúan contigo. Eres dueño de cada pensamiento y estado interno; tú eres el creador de tu propia realidad.

Al final, el cambio real proviene de estar dispuesto a abandonar lo que ya no te sirve y abrazar lo que realmente deseas ser. Este es el camino hacia la verdadera libertad y realización personal.

La Imaginación y la Fe

Encontré una cita que sentí necesitaba ser ampliada. Neville Goddard dijo que si uno pudiera elevarse a creer en la realidad de lo invisible, el acto imaginal está hecho. Sin embargo, la persona promedio podría pensar: "Soy pequeño, no puedo ser tan poderoso. No tengo el trasfondo intelectual, social o financiero". Neville nos enseña que no necesitamos ningún tipo de antecedente para imaginar o usar nuestra imaginación como causa de lo que sea que estemos luchando.

Esto se asemeja a Isaías 55, donde invita a todos los sedientos a las aguas y a los que no tienen dinero a comprar y comer sin costo. Estos dos conceptos se complementan: no se requiere ningún trasfondo para imaginar y utilizar nuestra imaginación.

El mundo exterior puede exigir un currículum o ciertas cualificaciones, pero la imaginación no pide eso. Neville nos pide fe total en nuestra capacidad imaginativa, entregarnos completamente a la idea de ser o tener lo que deseamos. Para aquel que cree, sucede.

En sus enseñanzas, Neville habla de dos personajes: Esaú y Jacob. Esaú representa la mentalidad del hombre exterior, centrado en necesidades materiales y externas. Jacob, en cambio, representa al ser interior, capaz de conquistar miedos y realizar deseos a través de la imaginación. Cuando imaginamos, dejamos de lado preocupaciones sobre nuestro origen social, conexiones o recursos. No necesitamos más que lo que somos ahora. Todo lo que se requiere es fe en nuestra imaginación, nuestro verdadero salvador. Es un proceso de autoabandono de estados limitantes y ocupación de nuevos estados. No se trata de cómo o cuándo sucederá en el mundo exterior, sino de confiar plenamente en nuestro poder interior. La fe es nuestra herramienta interna para manifestar nuestros deseos.

Este enfoque no se basa en argumentos filosóficos, sino en la experiencia personal y la prueba constante. Invito a todos a probarlo por sí mismos, a confiar en su propia fe interna y a abandonar estados limitantes para abrazar aquellos que desean ocupar.

Practicando la Ocupación Mental

Practicar este tipo de trabajo y conocerlo son dos cosas diferentes. Leer a Neville Goddard no equivale a practicarlo. Eso es simplemente adquirir conocimiento. Practicarlo es algo muy distinto. Así que no pienses que leer esto va a cambiar algo. No hay nada que cambiar excepto el yo, y el yo no es externo, está dentro.

Por eso no utilizo cosas externas para cambiarme; no están fuera de mí. La forma en que lo hago, y como me lo explico a mí mismo, es que debes ocupar el espacio mental donde ya está hecho, donde ya eres, donde ya está. No hay nada más que necesites hacer para conseguirlo, ocupas el espacio donde ya está, ya es como quieres que sea.

Esa es la diferencia entre el éxito y el fracaso, porque el éxito y el fracaso están dentro de nosotros. Si no ocupas ese espacio, estás difiriendo la ocupación, que es la raíz del fracaso. La razón de esto es que si no lo encarnas, entonces no lo eres. Debes realmente encarnar lo que quieres ser. Si la imaginación crea la realidad, como dice Neville, entonces debo imaginarme a mí mismo de la manera que quiero ser, ya siendo eso que quiero ser.

No me siento asustado ni indigno de hacerlo. La única manera de lograrlo es imaginar que ya soy eso. No se trata de intentar arreglarme, sino de cambiarme. Persistir en el espacio mental donde ya soy eso es la clave para la práctica de este principio. Esa es la diferencia entre ansiedad y paz: enfocarse en el cambio de que ya es de esa manera.

Lo he repetido antes, pero debe repetirse hasta que haga clic y entiendas exactamente lo que estoy diciendo. Si no lo encarnas, no lo eres, pero puedes encarnarlo. Hay un espacio mental en ti donde ya es de esa manera, pero no estás ocupando ese espacio. Estás ocupando un espacio donde ya es de esa manera, donde ya eres eso que deseas.

Persistir en eso es la práctica real. No es solo escuchar videos o leer, aunque no creo que eso esté mal. Lo que es crucial es ir hacia adentro de uno mismo en lugar de escuchar externamente a otras personas. Es bueno adquirir conocimiento, pero obtendrás más conocimiento si vas dentro de ti mismo y cambias. Verás los matices en el cambio cuando experimentes esa paz o libertad.

No se trata de intentar trabajar para alcanzar ese estado, sino de ocupar el espacio donde ya es así. Persistir en eso es mucho más fácil, pacífico y liberador que intentar asegurarse de que tus pensamientos sean buenos o que todo esté bien. Cuando Neville estaba en el ejército, ocupaba el espacio dentro de sí mismo donde ya estaba en Nueva York. No se imaginaba saliendo del ejército, se imaginaba ya estando en Nueva York. Esa es la diferencia; el enfoque está completamente en lo interno.

Cuando practiques esto, experimentarás que te sientes maravilloso, aunque no se trata de sentirse increíble, eso sucederá. Es ocupar esa posición donde ya es así. Lo que tiende a suceder es que las personas visitan estos lugares dentro de sí mismos, pero no se quedan allí. Visitan ese estado mental por un tiempo y luego regresan a su estado anterior. Cambiar de estado es simple, pero requiere persistencia.

La persistencia no es tratar de convertirse en eso, sino ya siendo eso. Esa es la clave para cambiarlo. La diferencia entre el éxito y el fracaso es una falta de encarnación del yo interior. Puedo cambiarme a mí mismo ahora mismo, pero eso no significa que persistiré en mi cambio. Puedo volver a mi estado anterior, pero no quiero regresar si ya soy eso que deseo.

No entro en un nuevo espacio tratando de llegar a ese espacio. Entro donde ya es el caso. Esa es la diferencia; eso es el éxito. Persistes en eso y no permites que las etiquetas o circunstancias externas te definan. El hombre define al hombre. Comienzas hacia adentro y ves la confirmación que sale.

Lo que estamos probando es nuestra capacidad para exteriorizar. Queremos exteriorizar que las cosas ya están así. No digas que faltan cuatro meses para la cosecha; ya está madura. Esto debe repetirse hasta que penetre en la mente y sature la mente con comprensión.

Hasta entonces, es probable que experimentes ansiedad porque sentirás que estás tratando de alcanzar algo. Sabes que lo has encarnado cuando ocupas el espacio donde ya estás, en lugar de intentar conseguirlo. Esa es la diferencia; una es completamente sin esfuerzo. Al principio se siente raro, pero si persistes, notarás cambios en ti mismo porque estás cambiándote a ti mismo.

Una vez escribí una publicación que decía: "Cuanto menos miras, más ves." Si te concentras en el intercambio interno y persistes en tu interior, te encontrarás con tus manifestaciones más rápidamente. Cuanto menos mires a tu exterior, más verás lo que realmente estás haciendo dentro de ti. Encontrarás tus manifestaciones más rápido si te enfocas en lo que ya sucedió dentro de ti.

El éxito y el fracaso están dentro de nosotros. Lo que tiende a suceder es que alguien tendrá un deseo y se encontrará manifestando cosas en otras áreas, pero no en la que más desea. Esto sucede porque el individuo cree en dos dioses: uno para un deseo y otro para otro deseo. No hay dos dioses. Una vez que ves que hay un solo Dios para todos tus deseos, comenzarás a liberarte más y más.

Persistirás en eso y no te detendrás después de una cosa. Ocupa otro deseo, siente que ya eres esa otra cosa y ya lo tienes dentro de ti. Practicarlo y saberlo son dos cosas diferentes. Practicarlo es encontrar un nuevo hogar mental, una nueva posición mental donde ya es así. Esa es la prueba para ti mismo: ¿Puedo realmente creer que ya es así? Si puedo, entonces debo encarnarlo.

De esclavo a creador

Hasta ahora, en mi experiencia de vida, he descubierto que el mundo puede querer empujarte en ciertas direcciones para que pienses cosas sobre ti mismo en las que personalmente quizás no creas. Puede tratar de persuadirte y convencerte para que dudes de ti mismo y te haga cuestionarte.

Lo que descubrí es que cosas como sentirse impotente y ser un esclavo del mundo provienen de nuestro interior. Ver el mundo a través de los ojos del "hombre interior", como lo ha descrito Neville, es algo que siento que no puedo hacer. He despertado y no veo la realidad de la misma manera. No me veo solo como un ser físico, sino mental. Veo que hago muchas cosas dentro de mí. Veo que actúo de ciertas maneras dentro de mí, dentro de mi propia imaginación.

Una de las formas en que he interactuado dentro de mí ha sido sintiéndome impotente, como un esclavo dentro de mi propia mente. Esto ha sido algo con lo que he luchado durante mucho tiempo y no sabía cómo liberarme. No entendía lo que significaba liberarme porque pensaba que yo solo era la forma física. No tenía un mapa dentro de mí, no sabía hacia dónde iba.

Aquí es donde juega el deseo un papel tan clave, como encontrar un propósito o un deseo en la vida y cumplirlo. Porque si no tienes uno, es mejor saber adónde vas que tratar de adivinarlo y simplemente subirte a cualquier autobús. Probablemente deberías conocer el autobús en el que vas a continuar. Sepa qué estado deseas en lugar de pasar tanto tiempo preguntándote. Entiendo que hay momentos para aprender sobre ti mismo y comprender qué es lo que quieres, pero es imperativo que lo encuentres porque tienes la capacidad de cumplirlo. Esto lo sabes a través del trabajo de Neville.

Interactuar dentro de mí como esclavo no ha sido beneficioso para mí. Encontré ciertos pensamientos en mí que fueron realmente maravillosos y hermosos, pero nunca me sentí digno de crearlos. Nunca me sentí digno de tenerlos. No me parecía necesariamente malo pensar en algo maravilloso sobre mí, pero había un nivel de sentimiento de que no podía simplemente tener eso. Era demasiado bueno para ser verdad acerca de mí, pero tenía un alcance tan limitado sobre lo que era yo.

Pensé que mi yo estaba reducido a comportamientos. Eso es lo que me enseñaron: cualesquiera que fueran mis comportamientos, soy yo; mis sentimientos, soy yo mismo; mis pensamientos, soy yo mismo. Pero Neville me ayudó a quitar las capas y vi que soy el creador de mis propios pensamientos y estoy creando como un esclavo. Estoy creando como alguien impotente. Dentro de mí mismo, estoy imaginando cosas como si estuvieran hechas para alguien más y no para mí. Lo bueno es para alguien mejor que yo.

Me empujaron hacia un límite en el que deseaba ser siempre alguien más. Podría decir que otras personas eran más libres. Me pondría celoso al mirar a los pájaros. Solo deseaba ser un pájaro. Sentí envidia de ellos, pero tenía una perspectiva tan limitada de lo que era. Me sentí atrapado dentro de mí. Sentí que fuera lo que fuera, quería que lo sintieran tan fuera de mi alcance, y cuando se acercó a mí, sentí que no podía soportarlo. Sentí que tenía que permanecer pequeño por dentro, como dice la Biblia: "Éramos a nuestra propia vista como saltamontes y así éramos a la vista de ellos".

Esa es la relación entre el mundo interior del hombre y su mundo exterior: realmente son uno, pero uno tiene la capacidad interior de cambiar. Aprendes a empezar a liberar ese hombre interior que se siente esclavo. Empiezas dentro de tu propia imaginación. Ahí es donde estás.

El punto de partida que me dio Neville fue muy importante para mí, me permitió tener un punto de partida. Luego, a partir de ahí, noté patrones dentro de mí, tal como noté patrones en el mundo, noté estos patrones en mí. Hay un patrón en el que cuando temía un pensamiento, era esta incapacidad de decirle "no". No tenía esta palabra dentro de mí. Me sentía como un esclavo de cada pensamiento. Mi relación con el pensamiento era una que me recordaba lo impotente que me sentía, así que repetí ese patrón una y otra vez.

Aprender sobre Neville fue muy difícil porque él me proporcionó mucho poder al principio, pero no tenía control sobre ello. Sabía que estaba creando estos pensamientos y sin embargo no podía dejar de hacerlo. No veía la relación entre cómo me siento y los pensamientos que estoy creando. No fue hasta que comencé a sentirme más poderoso que mis pensamientos se volvieron más tranquilos. Se volvió más fácil imaginarme a mí mismo dentro del cumplimiento de mi deseo. No sentí que era un robo para mí tomarlo dentro de mí mismo. Al principio lo sentí, pero luego comencé a darme cuenta de que no importa lo que piense, es mi propio pensamiento el que se me permite tener.

La razón, que en realidad es lo que la sociedad me ha enseñado a creer, me dirá que lo rechace y ese soy yo rechazándome a mí mismo. Si me imagino siendo algo y me convierto en eso, entonces yo mismo está dentro de mí. Por eso no necesito buscar más para cambiarme, no tengo que esperar a nadie. Esta es la buena noticia que Neville intenta ofrecer.

La capacidad de dejar ir la impotencia que sentí, de la que me sentí obligado a cargar, ha sido muy difícil, pero también muy simple. Eso es lo que encontré en este tipo de trabajo: es muy fácil de entender una vez que lo entiendes, pero por alguna razón puede ser necesario muchas repeticiones para entenderlo. La idea de que dentro de mí mismo era un esclavo y cambié la forma en que pensaba de mí mismo y me imaginaba es muy simple, simplemente requiere algo de práctica. Créanme, entiendo la práctica porque he hecho esto durante mucho tiempo. Comencé desde una posición muy, muy baja. Eso es lo que estoy tratando de decir: comencé desde una posición baja con una imaginación que no se sentía digna de nada bueno en ella y me di cuenta de cuán mentira era.

Realmente creí en una mentira y viví de esa mentira. Así que no dejes que la razón sea tu dios, no dejes que el mundo te dicte, no dejes que las apariencias dicten qué es lo que eres o qué es lo que puedes aceptar en tu interior. Porque si haces eso, no podrás ver más allá de tu propia apariencia, de tus propios ojos, tus propias pestañas.

¿Cómo puedes cambiar si dependes de las apariencias? ¿Cómo puedes cambiar si dependes de los sentidos? Cuando te liberas de la razón y de los sentidos, te embarcas en el verdadero viaje de la vida, y es el viaje de uno mismo. Comenzarás a crear naturalmente cosas nuevas para ti de las que no te sentirás indigno, así como un artista firma su pintura. Verás tu firma adjunta al pensamiento, verás a su creador y serás tú mismo.

La mentira es creer que eres impotente. El poder está adherido a ti, es un atributo; no puedes tener poder sin ti, el poder no existe. Así que comienza a ir hacia adentro y encuéntrate allí, y mira dónde te has colocado. Como dijo Abdullah en la novela, nunca te avergüences, sino cámbiate. Encuéntrate a ti mismo, pero nunca te avergüences, solo cambia

Liberarse de los Juicios y Abrazar la Imaginación

En mi camino hacia el autodescubrimiento, aprendí que liberarse de cualquier juicio que nos hayamos impuesto es esencial. Los juicios no tienen lugar real en la imaginación. Cuando decides imaginarte a ti mismo de manera diferente, cambias tu mentalidad y dejas de preocuparte por los sentidos, el color de tu piel, o cualquier juicio basado en tu pasado. Nada de eso realmente importa. El cambio verdadero ocurre cuando dejamos de juzgar a los demás y, sobre todo, a nosotros mismos.

Neville tenía una historia sobre una mujer que ganó la lotería. En lugar de celebrar, muchos comenzaron a juzgarla basándose en su religión, su apariencia, o su pasado. Neville nos enseñó que en vez de juzgar, debemos imaginar sin restricciones, sin permitir que los juicios distorsionen nuestra visión.

La imaginación no se basa en lo que creemos que es justo. No juzga por la sombra del pasado ni por los sentidos. Al imaginar nuevas versiones de nosotros mismos, nos liberamos de las limitaciones autoimpuestas. Creamos miedos y juicios dentro de nosotros, y estos se manifiestan en nuestra realidad. Cambiar nuestro interior, pensar en términos de amor en lugar de miedo, nos transforma de manera profunda.

Neville decía que cuando imaginamos, no debemos preocuparnos por el tiempo o las apariencias. Debemos estar curiosos por nuevas versiones de nosotros mismos, haciéndonos preguntas que nos guíen hacia una mejor comprensión de quienes queremos ser. Este ejercicio de curiosidad y autoexploración nos lleva a un estado mental donde el cambio se siente natural y liberador.

Al vivir en el amor, creamos una vida más plena y nos liberamos del ciclo de miedo y juicio. Vivir desde el interior, imaginando una realidad más amable y amorosa, nos permite ver más allá de las apariencias y juicios superficiales.

Finalmente, Neville nos recuerda que nuestra imaginación es infinita y generosa. No se agota ni se basa en apariencias externas. Al creer en el poder ilimitado de nuestra mente, podemos cambiar radicalmente nuestra realidad, comenzando desde adentro. Este cambio interno es la clave para vivir una vida plena y libre de juicios, donde abrazamos nuestra imaginación y nos convertimos en lo que amamos.

Cristo

La imaginación es como el Cristo. Es algo de lo que Neville habló en casi todas las conferencias y no creo que puedas divorciarte de eso. Entiendo que la ley es muy importante para las personas y quieren aprender cómo empezar a ser cosas, y eso es realmente lo que es la ley: aprender a empezar a ser lo que de otro modo quieres ser. Así que te vas, te vas queriendo y comienzas a serlo o tenerlo. Es una práctica en tiempo presente, una aceptación de que lo tienes. Como han dicho, cuando se trata de deseos, algunas personas dirán que los restrinjas, otras personas te dirán que te entregues a ellos. Pero Cristo dice que creas que lo tienes.

El objetivo de la enseñanza mística de Neville es mostrarte que Cristo es la imaginación, y que esta imaginación está aquí para salvarte del pecado y de la muerte, que es realmente el enemigo de todos tus seres queridos. El enemigo no es la nación al otro lado del océano, ese no es tu enemigo. Tu verdadero enemigo en la humanidad es el pecado y la muerte, y de eso es de lo que Cristo viene a salvarte.

Lo que he aprendido del trabajo místico de Neville es que este es un proceso en desarrollo. Es a través de revelaciones que se está revelando la imaginación que está alojada en nosotros, que somos nosotros. Es la esencia de nosotros, se revelará a ustedes ya sea en etapas o parece revelarse en ese caso donde tuve el sueño donde lo vi como luz. Neville me hizo leer las Escrituras tantas veces donde dice 'Yo soy la luz del mundo'. Entonces lo vi como luz y encontré la luz del mundo, no estaba fuera de mí. No es el sol en el cielo. Esta no es una luz que desaparece, no es un fuego que se apaga. Esta es la luz del mundo, es eterna. Y no la encontré fuera de mí, sino la imaginación en mí que está en ti se reveló, se revela a través de estos estados o estas etapas. Parece que lo hará si necesitas algo, por ejemplo, recuerdo que necesitaba, quería mucho perdón. Lo sentí en mi justo en mi corazón, quería, y luego tuve un sueño en el que perdoné a todos en el sueño, como si todos en mi vida fueran perdonados. Repetí las palabras 'la gente no sabe lo que están haciendo' y perdoné a todos. Luego me desperté de eso y sentí que mi imaginación no era como un sueño normal. Esto era muy, era tan real como esto, y sentí en ese momento que la imaginación se reveló a mí como la creadora de mi perdón, que estaba tratando de encontrar el perdón a través de cosas y madera, como cruces de madera. Siempre estaba tratando de encontrarlas y no podía encontrarlas. Fui a todos los dioses falsos y traté de aprender, pero me di cuenta de que la madera está destinada a ser utilizada y no se le debe rezar.

Una vez que comencé a cancelar cada dios falso y cada -ismo, fue bastante el conflicto y la guerra dentro de mí. Pasaron años una vez que comencé a leer el trabajo de Neville en un nivel más espiritual, estas cosas comenzaron a desarrollarse en mí. Es algo en lo que yo creía. Simplemente le creía, o al menos pensaba en lo que él diría. No lo dejaría simplemente después de que él hablara y simplemente me iría, como si supieras que yo solo voy a escuchar la parte de la ley e ignorar todo lo demás, lo cual hice a veces. Pero supongo que me aburrí de buscarlo en cada conferencia. ¿Cuándo va a hablar sobre la ley? Simplemente fue un poco repetitivo. Pero las historias de Cristo eran entretenidas para mí y siempre me imaginaba a un hombre de hace 2000 años y nunca podía entender lo que Neville decía. No entendía cómo la imaginación era Cristo. No lo vi así.

Pero lo que he notado es que la imaginación se revelará al hombre en el hombre y se revelará en secciones, casi como partes de sí misma. Te mostrará que es el verdadero poder de la vida, la verdadera causa. Me mostró que es la verdadera luz del mundo, que es el creador de mi perdón. Una vez tuve un sueño en el que en mi vida nunca sentí que fuera reconocido por cualquier cosa buena. Sentí que nunca recibí elogios por nada. Realmente los quería, y tuve un sueño en el que estaba en un auditorio y había mucha gente allí, personas que conocía, y estaban simplemente vitoreando y aplaudiendo. Recuerdo que me asusté mucho y me sentí asustado, y salí corriendo del auditorio, como si no me gustara la forma en que me sentía. Luego tuve esta voz que era mi propia voz, pero era una voz que sentía fuera de mí en el sueño, y decía 'soy el creador de... o decía 'el soñador es el creador de la alabanza'. Fue entonces cuando desperté en ese momento y me di cuenta de que pensé que había otro creador para mi alabanza, y cuando vi que no había nada más que el soñador o el creyente, el que cree, este que puede creer y alabar, es el creador de ello, no es algo fuera de mí.

Por eso te comparto lo que la imaginación me reveló dentro de mí, porque creo que somos uno. Por eso siento que te comparto que eres el creador de tu propia alabanza, que eres el soñador, que tú también eres el que cree. Así que Neville hizo, Neville compartió las revelaciones que recibió de la imaginación, que le mostraron que es el Cristo, que es el salvador, que es la verdad, el salvador del mundo. Todos están buscando un salvador, así que tratan de mirar a un hombre en el poder y piensan que el hombre en el poder los va a salvar, o piensan que algún -ismo los va a salvar, o piensan que algo los va a salvar, pero no se dan cuenta de qué están tratando de ser salvos, que es el pecado y la muerte, ese es el enemigo. Ese es realmente el enemigo, si quieres de la humanidad.

No es un -ismo, por eso esta imaginación se está revelando a nosotros en nosotros, y solo se me han revelado algunas cosas. Creo en las otras cosas, pero solo se me han revelado algunas cosas en mí. Es el creador de la alabanza. Es lo que para mí representaba la interacción humana, es el creador de mi interacción humana, y fue el creador de mi perdón, que pensé que estaba en el Dios católico tradicional y descubrí que era un dios falso. Realmente es el trabajo de Neville lo que hace. Es una espada para todas las cosas en las que crees que están fuera de ti. Por eso su verdadero mensaje, esta verdad es como una espada, va en contra de todo lo que creías, ya sea un -ismo, un hombre fuera de ti para salvarte, estas cosas en las que crees que son tu Dios y empiezas a tener sentido, las cosas empiezan a sentirse mucho más naturales como deberían.

Así que espero que empieces a tener estas cosas desarrollándose en ti y empieces a ver lo que Neville estaba diciendo. Personalmente, me siento como un testigo del trabajo de Neville. No siento que haya inventado su trabajo. Creo que su trabajo es brillante y me siento como un simple testigo del desarrollo de las cosas de las que habló. No creo que haya tenido todas las experiencias que él ha tenido. Sé que no, pero ya he tenido suficiente como para que haya un patrón que parece desarrollarse. No documenté mis fechas ni nada por el estilo. Solo estoy hablando desde mi memoria. Quiero decir, estas imágenes que tengo en mi memoria son más fuertes que algunas de las cosas que quiero decir. Son más vívidas que lo que pasó hoy en mi vida. Estas visiones solo sucedieron después de estudiar a Neville. No tuve esto con ningún otro maestro, por lo que personalmente me siento como un testigo de las cosas de las que está hablando. Me encanta hablar de esto y continuaré sobre su trabajo porque creo que puede abrirte los ojos a un tipo diferente de paz. Creo que la ley puede hacerte sentir poderoso, pero también puede darte un poco de miedo tener poder. Creo que su trabajo místico lo equilibra y te hace sentir un poco más relajado.

Dieta

Comienzo reconociendo mi respeto por la idea de la dieta mental de Neville Goddard. Aunque encuentro su enfoque valioso, quiero compartir lo que ha funcionado mejor para mí personalmente.

Cuando practiqué la dieta mental, no experimenté el impacto profundo que esperaba. Cambiar mis pensamientos fue relativamente sencillo; comprendí la importancia de dirigir mis pensamientos hacia lo que deseaba. Neville enseñaba que imaginar odio y miedo crea un mundo basado en esas emociones, pero cambiar mis pensamientos no supuso una gran lucha para mí.

Sin embargo, cambiar mis sentimientos fue un desafío completamente distinto. Pasar de sentirme en paz a sentir miedo en cuestión de segundos fue desconcertante. Sentirme poderoso en un momento y luego culpable al siguiente por experimentar ese poder, eso era complicado. Neville, con el tiempo, destacó: "Un cambio en el sentimiento es un cambio en el destino", y su libro "El sentimiento es el secreto" subraya esta idea.

Para mí, descubrir que los sentimientos eran cruciales fue revelador. Mi experiencia me mostró que sentir como si mi deseo ya hubiera sido cumplido tuvo un impacto mucho mayor que simplemente cambiar mis pensamientos. Cuando comencé a sentir mis imágenes mentales como reales y verdaderas para mí, empezaron a manifestarse en mi vida de maneras sorprendentes. Esto no significa que visualizar el final no sea poderoso; simplemente descubrí que sentirlo como una realidad presente lo potenciaba enormemente.

Imaginemos que has logrado vender algo importante para ti. ¿Cómo te sentirías entonces? Ese sentimiento de logro y satisfacción, ¿no sería real para ti? Neville lo captó bien al decir que el final es nuestro comienzo. Es comenzar desde el final deseado y permitir que esa realidad se cristalice en nuestro mundo, a pesar de lo que nuestros sentidos puedan percibir en el momento.

Es natural que aquellos que nos conocen desde hace tiempo tengan una imagen preconcebida de nosotros. Están cómodos con lo que creen saber de nosotros, pero ¿qué pasa cuando deseamos cambiar? Aquí es donde surge una guerra imaginal interna. Nos enfrentamos a la imagen que otros tienen de nosotros y a la que deseamos convertirnos. Es un conflicto interno entre seguir siendo percibidos como otros nos ven o descender al estado que deseamos realmente.

A menudo, este proceso de cambio implica enfrentar críticas y resistencia. Algunos nos recordarán cómo éramos antes, lo que dijimos o hicimos. Sin embargo, para avanzar, debemos estar dispuestos a desprendernos de esas expectativas externas y abrazar la versión de nosotros mismos que deseamos ser. Este cambio puede resultar costoso emocionalmente, pero quienes realmente nos aprecian y celebran nuestro crecimiento estarán ahí para apoyarnos. Por eso, cuando hablo de una "dieta de sentimientos", me refiero a aprender a sentirnos de manera diferente, incluso cuando nuestro entorno inmediato no lo apoya. Es sobre permitirnos sentir brillantes incluso en medio de la oscuridad emocional. A veces, sostener un nuevo sentimiento puede ser como atrapar un pez con las manos desnudas: difícil pero posible. Requiere persistencia y confianza en que ese sentimiento deseado eventualmente se arraigará y se convertirá en una realidad interna y externa.

Entonces, lo que hago es sencillo pero poderoso: me siento y permito que la paz o la sensación de que mi deseo se ha cumplido permanezca conmigo. Si surgen pensamientos o distracciones, los dejo pasar y me centro en cultivar y sostener ese sentimiento. A veces, esta paz puede desvanecerse y regresar, pero aprendo a no sentirme abandonado por ella. En lugar de eso, continúo nutriendo ese sentimiento liberador hasta que se vuelva natural y arraigado en mí.

Así que invito a todos a explorar nuevas formas de sentirse acerca de sí mismos, a dejar que esos sentimientos nuevos y poderosos se vuelvan reales en su interior. Es un proceso de autodescubrimiento y transformación que nos lleva más allá de lo que somos actualmente para manifestar nuestro potencial más elevado en el mundo.

¡Mi templo está sucio! Dejo entrar ídolos, “ismos”, tiempo, razón y demonios. Ceno con dudas y duermo con miedo. La razón no cesa de hablar, y el “ismo” siempre intenta controlar la conversación. La duda me sigue sin respetar mi espacio. Los demonios conspiran para destruir mi templo, y los ídolos quieren que me arrodille ante ellos. El tiempo, borracho, pone nerviosos a todos. ¡Tengo que sacar la escoba y limpiarlo! Necesito separarme de esta multitud no invitada. ¡Qué lío se ha hecho! ¡Qué falta de respeto hacia mí y mi casa! Se derrama el vino, se rompen las copas. Sin respeto por mi templo ni por mí mismo. Intenté ser amable al dejarlos entrar, pero ellos hicieron un desastre y no se ofrecieron a ayudar a limpiar. ¿Quién puede ser tan irrespetuoso? ¡Es tiempo de despedirlos! Los ídolos se han ido. No pertenecen a mi casa. No volveré a cometer este error. Invitaré a la duda y abriré la puerta a la razón. Nadie entrará sin ser invitado. Mi puerta estará cerrada (Juan 10:9), mi corazón estará cerrado a la adulteración. No escucharé más a la razón. No doblaré la rodilla ante otro ídolo. No acariciaré más el rostro del miedo. En mi casa, elijo servir al Señor (YO SOY) (Josué 24:15).

Al llegar a este conocimiento y comprensión de la Ley, puede surgir un miedo particular. Saber que podemos cambiarnos a nosotros mismos y que nuestros mundos cambiarán puede provocar miedo al cambio. Después de ser de cierta manera durante tanto tiempo, se convierte en parte de nuestra identidad. Ya no lo vemos como un estado temporal, sino como algo con lo que nos identificamos completamente. Cambiar este estado puede parecer imposible. Sin embargo, como sabemos que solo debemos cambiarnos a nosotros mismos, el cambio puede ser agotador. Tememos cómo sucederán las cosas o si nos equivocaremos. Tememos cuánto tiempo tomará y si llegará tarde. Esperamos que suceda ahora, pero no es así. Entonces esperamos que llegue y no llegue tarde. Si seguimos temiendo, esperamos que llegue tarde, y si tememos aún más, comenzamos a actuar impulsivamente.

Cuando tememos que un resultado no vaya a nuestro favor, en realidad tememos la declaración que hará sobre nosotros mismos. No tememos al rechazo en sí, sino lo que implica para nuestra identidad. "No soy deseado", eso es lo que tememos. Entonces, ¿qué es YO SOY? Es lo que deseamos y tememos. Pero tenemos la capacidad de darle forma como queramos. No es necesario que esto ocurra en una profunda meditación en la oscuridad. Puede suceder mientras estamos en el centro comercial comprando, comiendo con un amigo o tomando una cerveza. El entorno no importa. Así que en este momento, mientras lees esto, puedes hacer una declaración sobre ti mismo y si la aceptas, tu YO crecerá en tu mundo. Así que siempre estoy experimentando el YO. Por lo tanto, no hay “ismo” que mantenga al YO SOY en la pobreza. No hay tiempo, duda o razón humana que pueda detener verdaderamente al YO SOY, a menos que lo permitamos. Entonces, salgo del YO SOY. YO SOY significa ser en el presente. Si YO SOY el YO SOY, entonces no puedo morir. YO SOY no puede morir porque siempre es. Por lo tanto, YO SOY es el Dios de los vivos, no de los muertos (Marcos 12:27). Esta vida no es tu comienzo ni tu fin.

Independientemente de donde estemos, no estamos llamados a temer, sino a creer que ya lo tenemos. Entonces, no conviertas a la gente en chivos expiatorios porque no es necesario. La gente no es lo que te impide asumir un estado. Nada puede detener al hombre interior. Ninguna mazmorra, ningún “ismo” o sentido puede controlar verdaderamente al hombre interior. Así que no pensar en las personas es lo que me impide creer que soy perdonado, amado, respetado, confiable y brillante. ¿Es el hombre algo más que un ser físico? ¡Pruébalo! Cree que eres o tienes lo que quieres. No hagas nada más. No tengas miedo, simplemente cree que lo tienes ahora. No aprietes el estómago ni aprietes las manos imaginarias. Cuando las palmas de tus manos mentales sudan, es porque estás sirviendo a un dios falso. En lugar de servir al Señor (YO SOY), temes al tiempo, a la duda y a los dioses falsos. ¡En lugar de eso, échalos fuera! Imagina y acepta sin restricciones. No tengas miedo.

Cuando voy a una cena, no voy allí y hago que todos se sientan incómodos. No me impongo. Juego un papel en la cena. ¡Entonces, dejemos que el Hombre Interior haga su parte! ¡Déjalo SER y experimentar ese SER desde que pueda! ¡Entonces, el hombre exterior desempeñará su papel! Es el Hombre Interior quien tiene la capacidad de cambiar y estar en un estado, así que déjalo. Permítete realmente estar en ese estado porque él tiene la capacidad de hacerlo. ¿Por qué no ejercitarlo? Si puede, déjalo. Si alguien es bueno tocando el piano, ¿no deberíamos dejarlo tocar? Bueno, el Hombre Interior es excelente para moverse y estar en nuevos estados. Entonces, déjalo hacerlo.119 Así que no tengas miedo. Si temes tu deseo, es posible que realmente tengas miedo de cambiar. También puedes tener miedo de darte a ti mismo lo que deseas. Cuando estés en esta posición contigo mismo y sepas que lo que quieres es bueno porque lo querrías para otra persona, entonces dátelo a ti mismo. Dejarás de temerlo. Si temes el cambio, debes saber que en realidad no temes el cambio porque lo desees. Quieres un cambio en ti mismo, pero temes el resultado. En cambio, sepa que el resultado (expresión) siempre estará alineado con su naturaleza (YO SOY). Entonces, cuando empieces a sentirte exitoso esta noche, el éxito comenzará a crecer en tu mundo porque está creciendo en ti. No temas cómo llegará el éxito ni cuándo. Todo lo que importa es el YO SOY de ello. Porque YO SOY es nuestro principio y nuestro fin. Así que me siento exitoso después de SER exitoso, sin temor a su resultado. A partir de ahí, comienzo a cambiarme, aplico presión a la arcilla y la moldeo.

Entonces, si imagino el YO SOY seguro, pongo mi confianza en mi YO SOY. No pongo mi seguridad en nada fuera de mí. No creo que el Dios del cielo me proteja. No creo que la seguridad provenga solo del dinero o de una casa. No espero que alguien o algún dios falso actúe. Si este Dios hace un camino en el desierto (Isaías 43:19), ¿qué Dios es este? YO SOY, ese es su nombre. Entonces, cuando oro, oro en el YO SOY del estado. Me siento seguro después de SER seguro. Este es el único Dios que actúa y crea caminos para esa expresión. Pero no le quito los ojos de encima. No me siento seguro después de ESTAR y la esperanza de que llegue mañana de alguna forma específica. No. Continúo en el SER de seguridad. Donde camino, estoy seguro en cierto sentido. Es lo que Neville describió como un perfume que se rocía. Si desaparece, rocíalo nuevamente. Pero lo dejo persistir y quedarse.

Entonces, esta noche y las próximas noches, continúa en el SER del estado para que ya no lo anheles. Deja los titulares y los rumores en paz. Todo aquí está tratando de dar forma a tu YO SOY. Pero no cedas, mantén la seguridad de lo que deseas. Entonces, si quieres ser afortunado, amado, inteligente, etc., entonces SÉ eso. No le pongas la condición de “sentido” al YO SOY

Nadie a quien cambiar

El mensaje de Neville Goddard nos desafía a mirar hacia dentro para encontrar el poder de cambiar nuestras vidas. Nos dice que el único cambio significativo que podemos controlar es el cambio en nosotros mismos. En lugar de intentar cambiar a otros o esperar que las circunstancias externas nos cambien, Neville nos anima a transformar nuestra propia percepción y actitud.

El proceso de cambio comienza con un deseo profundo y una creencia firme en nuestra capacidad de lograr ese cambio. No se trata solo de desear pasivamente, sino de imaginar y sentir como si el cambio ya hubiera sucedido. Esto implica un compromiso activo con nuestra propia evolución mental y emocional.

Intentar cambiar a los demás o esperar que el mundo exterior nos cambie es a menudo una fuente de frustración. Neville sugiere que en lugar de enfocarnos en cambiar a otros, debemos concentrarnos en cambiarnos a nosotros mismos desde adentro hacia afuera. Este enfoque no solo nos permite crecer personalmente, sino que también puede influir positivamente en nuestro entorno a medida que reflejamos cambios positivos en nuestras vidas.

El mensaje final es claro: el verdadero poder para transformar nuestra realidad reside en nuestra capacidad de cambiar nuestras propias percepciones y estados mentales. Es un llamado a la autoresponsabilidad y a la creación consciente de nuestras vidas basada en el deseo, la visualización y la acción personal.

Sinfonia de susurros

¡Hay una causa! ¡Hay una razón! ¡Hay un poder mayor que tú, del que eres parte, del cual puedes usar para hacer tu vida buena y grande y vigorosa y llena de abundancia!

Si puedes creer; Al que cree todo le es posible.

Cualquiera que diga que las palabras no tienen poder no tiene cabida en mi vida en cuanto a la metafísica. Puede que tengan mucha otra buena información. y estoy dispuesto a escuchar... pero se perdió la marca en lo que crea nuestra realidad. O simplemente no saben, no entienden o creyeron una mentira.

Este es el conocimiento que me permitió transformar mi vida.

Todos los autores que estudio conocen el poder de las palabras. Fue a través de sus enseñanzas que pude aprender los principios que podía aplicar en mi vida... y mejorar cada área inmensamente.

La humanidad es espíritu.

Se nos hace como creemos (habla).

Ese es el secreto.

Asume el espíritu, el sentimiento del deseo cumplido, y habrás abierto las ventanas para recibir la bendición. Asumir un estado es entrar en el espíritu de él.

Tus triunfos serán una sorpresa sólo para aquellos que no conocían tu pasaje oculto desde el estado de anhelo hasta la asunción del deseo cumplido. - Neville Goddard

Ya no quieres, deseo de mucho tiempo tu deseo...

Simplemente crees que ya lo tienes.

Ese es el pasadizo oculto.

Solo es misterioso para aquellos que no saben esto, o no lo entienden, o no lo creen. Para esas personas, seguiría siendo un misterio... y probablemente darían alguna otra razón, alguna otra causa... y descartar la verdadera causa.

Ignora el estado presente y asume el deseo cumplido. - Neville Goddard

Me duele la espalda, perdí mi trabajo, no estoy con quien amo.... ¿Qué hago?

Eso es hacer exactamente lo contrario de lo que dijo Neville.

Nuestra conciencia incondicionada siempre está condicionada (condiciones, experiencias y eventos en nuestra vida) por lo que pensamos, sentimos y creemos. Saber esto es poseer la verdad que te libera. Ciertamente bautiza o limpia la mente de creencias en poderes y causas externos. Nuestra sensación de salud produce salud; nuestra sensación de riqueza produce riqueza. - Joseph Murphy

"Nuestra conciencia incondicionada siempre está condicionada (condiciones, experiencias y eventos en nuestra vida) por lo que PENSAMOS, SENTIMOS Y CREEMOS. "

Sientes lo que piensas y crees.

El control de tus pensamientos es cómo controlas tus estados de ánimo.

Las palabras son libres para pensar y hablar.

Pero pueden costarnos si no los usamos correctamente.

Es algo muy bueno para tener en cuenta.

Repetir afirmaciones es una de las mejores maneras de programarnos para la vida que deseamos.

Es también una de las mejores maneras que otros usan para hacer que la gente les crea. seguir repitiendo mentiras hasta que se conviertan en la verdad que quieren que creas.

El conocimiento de este método es algo muy bueno de conocer

Hazlo simple - corto y dulce -- ¡Me siento bien! Haz que sea una ' frase captura' -- porque eso es lo que es - atrapa el estado de ánimo -- llena tus 'redes' -- 'Dale a un hombre un pez, que le alimenta durante un día -- enseñarle cómo pescar (echa tu red al lado derecho) y bueno -- ya sabes lo que pasa El hombre que a voluntad puede asumir cualquier estado que quiera ha encontrado las llaves del Reino de los Cielos. - Neville Goddard

¿Has encontrado las llaves del cielo?

La tienes si sabes que son las palabras que crees y han estado creando tu realidad.

Si nunca has sabido conscientemente que tus palabras eran creativas, cuando descubres esto, solo tiene sentido escrutar todo lo que crees de ahora en adelante.

Probablemente te vas a dar cuenta de que ALGUNAS de tus creencias, al menos, te han estado limitando.

Ahí es cuando aplicas una de tus herramientas metafísicas.

Revisión.

La vida es buena.. y siempre funciona para mí de maneras mágicas.

No te sirve de nada ser consciente de una verdad si no crees que sea la verdad.

Uno de los requisitos para beneficiarse de una verdad es que primero debes creerla.

Imagina que te digan las palabras que crees que son creativas, y rechazarlas.

Puede que seas consciente de ello... porque fuiste informado de ello, pero no te sirve de nada saberlo.

Soy un creyente...

Pensando desde el deseo cumplido.

Pero el deseo debe ser impresionado en el subconsciente antes de que pueda lograrse. Simplemente el deseo consciente rara vez te da algo. Es como los sueños que pasan por tu mente. Tu deseo debe ser visualizado, debe ser persistido, debe concentrarse, debe estar impresionado en tu subconsciente. No te preocupes por los medios para cumplir tu deseo, puedes dejarlo con seguridad a tu mente subconsciente. Sabe cómo hacer muchas cosas además de construir y reparar tu cuerpo. Si puedes visualizar lo que quieres, si puedes impresionar a tu subconsciente la creencia de que lo tienes, puedes dejarle con seguridad el hallazgo de los medios para conseguirlo. Confía en la mente universal para mostrar el camino. La mente que proporcionó todo en tal profusión debe alegría al vernos aprovecharse de esa profusión. - Robert Collier

"Si puedes impresionar a tu mente subconsciente la creencia de que lo tienes, puedes dejar con seguridad a él el hallazgo de los medios para conseguirlo. "

A menudo me pregunto si la gente realmente entiende lo que lee cuando se trata de libros metafísicos.

Esto dice CLARAMENTE si puedes impresionar la CREENCIA DE QUE LA TIENES.

Eso son palabras. Eso es lo que estás creyendo.

Creo que algunas personas ya tienen creencias contradictorias que no les permiten ver lo que está justo delante de ellos... incluso después de que sea señalado.

Lee libros metafísicos con una MENTE ABIERTA... o puede que no veas lo que se te presenta.

Somos Creadores.

Somos Seres Que Creamos Lo Que Creemos.

Son nuestras palabras.

Si supieras lo que revelan tus órganos de sentido, nunca percibirías nada más allá de ellos. Sería horrible seguir siendo un órgano sensato y nunca trascenderlo. Pero Dios trajo la creación con él cuando se convirtió en humanidad, ¡y tú estás aquí para despertar a ese hecho! Si Dios no se convirtiera en ti, serías un cuerpo animado, limitado a todo lo que tus órganos sentidos revelarían. Pero habiendo convertido en ti, Dios está despertando y te concederá deseos y sus cumplimientos, mucho más allá de los sueños más salvajes de aquellos que todavía están limitados a los órganos del sentido. - Neville Goddard

Vivir (aplicando) estas enseñanzas es las cosas más grandes que vas a hacer en tu vida.

Sentir es el secreto.

En otras palabras...

Créelo, recíbelo.

Cualquiera que sea la mente del hombre puede concebir y sentir como verdadera, elel subconsciente puede y debe ser objeto. Tus sentimientos crean el patrón desde el cual está formado tu mundo, y un cambio de sentimiento es un cambio de patrón. - Neville Goddard

Es fácil tener la sensación. Simplemente CREES que es verdad. De ahí es de donde tienes la sensación... tus creencias.

Eso significa que creo en las palabras que dicen que es verdad.

Si quiero cambiar mis sentimientos sobre algo, cambio mi creencia sobre ese algo.

Simple y fácil.

Sin trucos de salón.

Simplemente cree.

¿Qué pasa si "pan" significa, o podría significar, dependiendo del contexto, "creencia"?

Danos hoy nuestras creencias diarias.

Recuerda, el poder creativo no funcionará solo. Saber qué hacer no es suficiente. Tú, el poder operante de la imaginación, debes estar dispuesto a asumir que las cosas son como quieres que sean, antes de que puedan suceder. Neville

Saber no es suficiente.

Debes estar dispuesto a CREER que las cosas son como quieres que sean, antes de que puedan suceder.

enemos miles de millones de pensamientos pasando por nuestras mentes... Nunca estés de acuerdo con los que no te hacen sentir bien... Son solo pensamientos... no hay verdad en ellos para ti, hasta que estés de acuerdo con ellos... solo estoy de acuerdo con los pensamientos que te hacen sentir bien... y mira cómo tu vida se transforma...

Piensa en pensamientos negativos como si fuera un virus a una computadora... Estar de acuerdo con un pensamiento negativo es como aceptar permitir que un virus entre en tu vida...

Solo porque pensemos pensamientos negativos no significa que tengamos que estar de acuerdo con ellos...

Esto es muy poderoso cuando lo entiendes y lo aplicas.

Pensar es gratis, soñar es libre, creer es libre...... eres el único que puede limitarte con tus propios pensamientos..... si alguien dice que no puedes hacer algo, no le creas, te está contando su historia, no la tuya.

Piensa en grande, sueña en grande, creyendo que TODO es posible... y mantén esos pensamientos, vete a ti mismo en tu propia mente (imaginación) haciendo lo que todos los demás dicen que no puedes... y espera que los milagros sucedan en tu vida... y luego recordar lo que les causó... tu imaginación.

Nos limitamos con creencias y percepciones que aceptamos como verdades absolutas, cuando en realidad son construcciones mentales que podemos cambiar. La libertad comienza desde dentro: debemos percibirnos como libres y capaces antes de que podamos manifestar esa libertad en nuestras vidas externas. Es un recordatorio poderoso de que nuestra realidad externa es un reflejo de nuestra realidad interna.

No tenemos dos mentes, pero sí tenemos una conciencia objetiva y subjetiva. La subjetiva sólo sabe obedecer. Sin embargo, lo subjetivo es creativo. En silencio recibe la impresión de nuestro pensamiento y actúa como si fuera verdad. Puesto que es sólo deductivo, es decir, al no poder discutir, negar o rechazar, debe aceptar, por su propia naturaleza, todas nuestras creencias. Aparentemente tiene la facultad de aceptar las creencias de otras personas también. - Ernest Holmes

"En silencio recibe la impresión de nuestro pensamiento y actúa como si fuera verdad. "

"debe, por su propia naturaleza, aceptar todas nuestras creencias. "

"Al parecer tiene la facultad de aceptar las creencias de otras personas también. "

Pero tienes que creerles primero…

Lo que experimentas en la imaginación es un verdadero acto creativo. - Neville Goddard

Si deseas sentirte bien todo el tiempo... Nunca puedes cuestionarte ni una sola vez si es posible o no.

Yo digo que... porque.. Alguien preguntaría una vez... ¿Es posible sentirse bien todo el tiempo?

SÍ....

La respuesta es SÍ.

Nunca cuestiones eso.

Aplica el principio que hace que suceda.

Me siento bien.

Y lo digo a menudo.

Por eso me siento bien todo el tiempo.

Creo que programar la mente subconsciente es tan simple como elegir qué pensamientos estoy de acuerdo, qué pensamientos creo. Vive conscientemente eligiendo solo los mejores pensamientos para creer y antes de que te des cuenta tu vida será de armonía.

Encontré una buena manera de usar mis palabras.

Me siento bien.

¿Qué tan increíble es eso?

Pero, puedo decirte: si usas tu poder creativo al imaginar que un deseo ya se ha cumplido, cuando lo consigas, las circunstancias te parecerán tan naturales que será fácil negar que tu imaginación tuvo algo que ver con él, y usted podría creer fácilmente que Habría pasado de todos modos. Pero si lo haces, habrás vuelto a dormir una vez más. - Neville Goddard

Interpretación...

Pero te puedo decir: si usas tus palabras para creer que tu deseo ya se ha cumplido, cuando lo consigas, las circunstancias te parecerán tan naturales que será fácil negar LAS PALABRAS QUE CREES que tuvieron algo que ver con ello, y usted podría creer fácilmente que habría sucedido de todos modos. Pero si lo haces, habrás vuelto a dormir una vez más.

Simple.. y fácil.

No solo cuestiono lo que otros dicen que creen...

Cuestiono lo que creo.

Cuando sabes lo que significa creer cosas, es una muy buena idea cuestionar todas nuestras creencias.

Niegate a aceptar como inevitable cualquier circunstancia que uno no desee. - Napoleón Hill

Este es un principio que aplico el 100 % del tiempo.

Principios... el secreto para descubrir secretos de la vida.

Y todavía se reduce a las palabras que creemos.

Las circunstancias ya no rigen mis pensamientos.

Le entregué el poder a mis palabras...

Fue una elección que tomé.

La metafísica no me enseñó cómo "tratar" condiciones no deseadas.

Me mostró cómo no crearlos... y crear algo mejor.

Trabajo con causas... no efectos.

Alguien dice... eso me hace feliz.. eso me pone triste... eso me hace enojar.. eso me trae alegría... eso me deprime...

¿POR QUÉ????

Porque no saben que sus palabras les hacen sentir así.

Ellos piensan que ESO es... sea lo que sea ESO.

Eso es una mentira.

Deja de decir COSAS que te hacen sentir NADA.

Las cosas no pueden hacerte sentir nada... a menos que agregues palabras a esas cosas.

Esto no es una teoría para mí. Superé el "mundo"... Y ahora mis palabras elegidas gobiernan mi vida.

Requirió comprensión y práctica.

Me liberé de las condiciones que rigen mis pensamientos, sentimientos y mente.

Una cosa, entre muchos, que he aprendido a lo largo de los años, es que no todo el mundo está listo para escuchar esto.

Las condiciones siguen siendo el factor gobernante y gobernante en sus vidas.

No cambié las cosas que suceden en mi vida cambiando las cosas que pasan en mi vida.

Cambié las palabras que creo... y eso cambió la forma en que pensaba... la forma en que me siento... y las cosas que pasan en mi vida.

Fui muy persistente. Fui muy consistente.

Cualquiera puede hacerlo... si lo quieren lo suficiente.

Todo lo que se necesitó fue comprensión y aplicación

Si un evento, condición, situación o algo que alguien dice te hace sentir algo que no deseas sentir, es porque, antes de ese evento, condición, situacion o algo que alguien diga, afirmaste que te haría sentir de esa manera.

Eso podría haber sucedido, o puede que lo hayas dicho hace 20 años, sin idea de lo que estabas de acuerdo.

He visto gente decir que cuando termine la temporada de fútbol, estarán deprimidos toda la temporada baja. Entonces eso es lo que pasa... y probablemente no tienen idea de que crearon esa emoción.

Solo porque tengamos un pensamiento como ese... no significa que tengamos que expresarlo... o de acuerdo con ello. Solo dite a ti mismo que ES una mentira.

Son tus PALABRAS

Si no dices que sientes algo, no lo sentirás.

¿Eso parece obvio?

Debería ser.. pero no es tan obvio para todos.

Tus emociones son creadas por lo que crees.

Si creas emociones no deseadas, esas emociones serán muy reales para ti.

Así que... si no deseas esas emociones... No los crees.

Antes de mi descubrimiento de la metafísica tuve algunas lecciones muy duras con esto. sin saber cuál fue la lección durante muchos años.

Después de unos años de estudio, todo tenía sentido.

Fueron MIS PALABRAS No estoy condicionado por las condiciones. Estoy condicionado por mis propias palabras. Eso me mantiene en control de mis sentimientos el 100 % del tiempo.

Tengo que compartir la gran noticia...

Todo siempre está funcionando para mí de maneras mágicas.

¡Es impresionante!

Nuestro pensamiento es creativo... primero de nuestros estados de ánimo y sentimientos... luego de las cosas que suceden en nuestras vidas.

Palabras.

El procesador de un ordenador se conoce como el cerebro de la computadora. Puede hacer cosas increíbles.

Pero sin todas las otras partes no puede hacer nada.

Nuestras palabras son creativas. Pero sin todos los otros factores que están involucrados no podrían crear. Las palabras en sí mismas no van a crear nada. Es como nos hacen sentir. Así es como se convierten en subconscientes. Viajan por vibración según las frecuencias.

Esto es MUY útil saber estas cosas.

Cuando la gente dice que no siente lo que dice... como si lo esperaran... No están entendiendo todo el proceso. Tú lo dices PRIMERO... cuando lo CREES... lo que significa que lo aceptas como cierto... y esto se convierte en tu pensamiento dominante... es entonces cuando se convierte en subconsciente... DESPUÉS de que se convierta en subconsciente... es entonces cuando empiezas a sentirlo... entonces el sentimiento debería ser automático... incluso sin decir las palabras... esto significa que el subconsciente se ha hecho cargo... no tienes que pensar conscientemente en ello todo el tiempo... esto es lo que yo llamo programación...

ESTOY PROGRAMADO para sentirme bien... ¿Por qué? Porque lo digo y lo he dicho tan a menudo que NATURALMENTE me voy a sentir así... pero solo para estar en el lado seguro.. Seguiré diciéndolo por el resto de mi vida.

Mi subconsciente es como el disco duro de una computadora donde todos mis programas están almacenados y pueden ser sacados a voluntad... ya sea conscientemente o en reacción a los acontecimientos que suceden en mi vida...

Si pasa algo en mi vida que hace que los demás se sientan menos que bien... mi programa entra en acción y me hace sentir bien. porque ESO es para lo que me programa.

Mi memoria es como la memoria de una computadora. es el almacenamiento temporal de lo que deseo programarme para... y SIEMPRE puedo cambiar esto... y SIEMPRE estoy buscando hacer un mejor uso de mi memoria...

Comprender cómo funcionan las computadoras nos ayuda a entender mejor cómo trabajamos. hay muchas similitudes.

No tengo que sentir algo cuando lo digo... SI lo digo para programarme, lo que tengo que hacer es SEGUIR diciéndolo... para que YO SÍ me programa... Entonces lo sentiré.

No hago estas cosas solo para conseguir algo... y luego volver a mi vieja forma de pensar... Los digo para que me convierta en ellos... al decirles YO SOY ELLOS.. YO ESTOY SIENDO ELLOS...

Un proceso para toda la vida.....

Y no permito que ningún virus se apodere de mi subconsciente... No hablo nada que ya no deseo ser parte de mi vida.

¿Qué pasa si lo hago? REESCRIBO el programa... ese es mi trabajo.. para ser el programador de mi vida...

¿Las cosas te hacen sentir lo que sientes?

¿Las condiciones o situaciones te hacen sentir lo que sientes?

No... No lo hacen.

Cualquiera que te diga que sí, no lo ha pensado mucho.

Hay MUCHAS cosas en la vida que no nos dan sentimientos.

Veamos un ejemplo...

Papel.

El papel te hace sentir enojado, triste o feliz... ¿O alegre?

Lo dudo.

Tendrías que asociarte... designar.. tus sentimientos elegidos para empapelar para que el papel te dé sentimientos.

Mira las cosas que te han hecho feliz en la vida... o cualquier emoción.

Designaste ciertos sentimientos a esas "cosas" en algún momento de tu vida... Ahora esas "cosas" te hacen sentir lo que sientes.

Puedes hacer que CUALQUIER COSA en este mundo te haga sentir bien. Siempre y cuando le asignes buenos sentimientos a esas cosas.

¿Las cosas te hacen feliz, triste o enojado?

Elige este día lo que te haga sentir lo que sientes.

Entonces es sólo cuestión de programarte a ti mismo.

Las afirmaciones no son una mentira.

Si crees que son mentira, porque dices que no lo sientes, no entiendes porque las dices.

Si no entiendes por qué las dices, deberías dejar de decirlas y estudiar los libros que te dicen por qué las decimos.

No puedes buscar resultados y vivir con la sensación de ya tener al mismo tiempo.

Estás haciendo una u otra.

¿A quién servirás?

Mi sensación es que puedo hacer cualquier cosa.

La razón por la que siento esto, es porque digo que puedo hacer cualquier cosa. y me creo a mí mismo.

¿Por qué iba a pensar menos, sabiendo cómo funcionan nuestras mentes?

El conocimiento de cómo funciona la mente es algo muy bueno para estar en posesión.

¡Quiero que vayas por todo! No poner límite al poder creativo de Dios. Imaginar lo inimaginable y caminar sobre el agua, a través de la fe.

El agua simboliza tu aceptación de la vida como psicológica, y su drama como teniendo lugar en la imaginación. Cuando dejas de excusarte a ti mismo o a nadie por las experiencias de la vida, y comienzas a reorganizar la estructura de tu mente para sentir que tu deseo se cumple, estás caminando sobre el agua.

La Escritura habla de la piedra, el agua y el viento.

Acepta los hechos de la vida y vas a renunciar a la piedra.

Cambia los hechos en tu imaginación, y los has convertido en verdad psicológica, que luego se convierte en una experiencia espiritual. Cuando vives según este principio, estás caminando sobre el agua, hacia tu nacimiento desde el más allá. - Neville Goddard

Camino sobre el agua...

Yo no paso por la piedra.

Todo el día, todos los días, sentimos cosas que ni siquiera dijimos que sentimos... en ese momento... Acabamos de sentirlos... por condiciones, situaciones o eventos...

Dijimos que nos sentiríamos así... en algún momento del pasado.

Entonces algún evento, condición o situación desencadena ese sentimiento.

Ese sentimiento no salió de la nada. Pusimos esa creencia en nuestra mente subconsciente por lo que creíamos. lo que acordamos, lo que aceptamos.

Si alguna vez siento algo que no deseo sentir... No le diré a nadie que lo siento. Estoy cambiando mis creencias.

Entonces... Puede que le diga a alguien que tiene el deseo de aprender esto lo que SENTÍ. y lo que HICE para cambiarlo.

Pero mientras lo estoy pasando, ese sentimiento es mío para lidiar con... para trabajar.. y no es algo que voy a seguir diciendo a los demás lo que deseo cambiar.

Solo lo cambiaré.

Me siento bien.

La vida es increíble...

Siempre pasan cosas increíbles en mi vida.

Puedes hacer de estas tus palabras.

Es una elección.

Todo lo que tienes que HACER.. es SIMPLEMENTE creerles

Nuestras palabras rigen nuestras vidas.

Nuestras palabras son palabras que creemos.

Tenemos una elección de qué palabras creer.

Si no te gusta la forma en que te sientes, cambia las palabras en las que crees.

Si has creído algo la mayor parte de tu vida no esperes cambiar tus sentimientos sobre nada después de una o dos afirmaciones.

Te estás reprogramando. No es muy probable que, después de enterarse de esto, cambie sus sentimientos sobre cualquier cosa en un día o dos. Si se puede, genial. Pero cambiar una creencia, convertirla en subconsciente, después de haberla tenido durante 20 o 30 años, lleva un poco de tiempo.

Persistir.

Como todo, se vuelve más fácil con la práctica.

Si yo creo lo que alguien más dice, son entonces mis Palabras... y luego gobiernan mi vida.

Sabiendo esto, soy muy selectivo en lo que acepto (creo) como verdad.Todo el mundo no sabe que puede crear sentimientos. La mayoría de la gente siente cosas durante toda su vida en respuesta a un estímulo exterior, totalmente ignorantes de que tienen el poder de sentir usando nada más que palabras.

No tienen idea de cómo usar su imaginación... o cuál es el propósito de hacerlo.

Imaginación.. la capacidad de usar tus palabras para sentir lo que quieres sentir... crea una realidad de tu elección.

Existe una libertad que viene de saber usar tu imaginación que debe experimentarse para poder sentirla.... solo saber que esto no es suficiente... hay que aplicarla.

Uso las palabras "Me siento bien" como un COMANDO para mí mismo. no como una expresión de los sentimientos actuales.

Nadie puede aplicar los principios que la metafísica enseña para ti, solo pueden darte los principios, depende de ti aplicarlos.

No me digas lo que ES... si no es tu deseo.

Decirme qué es, si no es tu deseo, NO es metafísica.

El punto de la metafísica es aprender los principios. La metafísica no dice... Dime todo lo que deseas cambiar... entonces puedo decirte cómo hacerlo.

No, no.

Eso es exactamente lo que no puedes hacer.

Entiendes el principio... y aplicarlo.

Si le estás diciendo a otros lo que estás insatisfecho con tu vida, te has estado diciendo a ti mismo cosas que la causaron.

Así que, en lugar de contarles a los demás con lo que estás insatisfecho, empieza a contarte mejores historias. Deja de decirte cosas que causaron lo que no te gusta.

Esa es la solución.

Ahí es donde todo empieza.

No te preocupes por los próximos pasos. Esos serán diseñados para ti cuando tus palabras sean correctas.

Si sientes alguna emoción negativa, es porque te has dicho a ti mismo que eso es lo que sientes. lo que te dijiste a ti mismo que sentir.

No importa si es por alguna situación que sea muy real para ti o no.

Te estás diciendo a ti mismo... o te has dicho a ti mismo QUE SENTIR ESO... POR alguna condición o situación.

Reprogramate.

Hasta que realmente hagas esto, esto son solo palabras para ti. Hay que aplicarlo para obtener resultados.

Y cuando lo hagas, te sorprenderás... Porque has encontrado el secreto de por qué sientes lo que sientes.

Y descubrir tal secreto es como encontrar oro.

Siento lo que digo que siento.

No importa si lo digo porque estoy usando mi imaginación o estoy usando alguna condición, situación, vídeo, algo que alguien diga o algún evento.

Siempre se reduce a lo que DIGO que siento.

No tengo que decir NADA me hace infeliz, triste, enojado o cualquier emoción negativa. No importa es la muerte, el amor, cualquier tipo de pérdida...

No me tienen que gustar esas cosas... pero no tengo que decir que me hacen sentir alguna emoción negativa.

Imagina que algo suceda y decirte a ti mismo que te pone triste, enojado o infeliz.

Ahora estás lidiando con esos sentimientos.

Lidia con esos sentimientos el tiempo suficiente y sentirás los efectos de esos sentimientos. y en algún momento ya no querrás sentirlos... tal vez busques ayuda de otros.

Aquí está tu ayuda.

No DIGAS que sientes algo negativo. Porque si lo haces, lo sentirás.

No importa cuál sea la situación... Me siento bien

Si estás insatisfecho con tu expresión presente en la vida la única manera de cambiarla, es alejar tu atención de aquello que te parece tan real y elevar en conciencia a lo que deseas ser. No puedes servir a dos maestros, por lo tanto tomar tu atención de un estado de conciencia y colocarla sobre otro es morir a uno y vivir al otro. - Neville Goddard Escucha a la gente que te DICE cuál es su expresión presente en la vida, con la que están insatisfechos.

Ellos no saben esto.

¿Por qué no saben esto? ¿Aún no lo han descubierto? ¿Han leído los libros, como los que Neville escribió, que les dicen qué hacer? ¿Los han leído, pero no los han entendido? ¿Se aplican, lo que DICEN SABER? Realmente no tienen ningún interés en la metafísica... ¿Y solo buscan desahogarse? Buscan simpatía o empatía?

Esto es un secreto.

Se trata de las PALABRAS QUE CREES.

"por lo tanto, tomar tu atención de un estado de conciencia y colocarla sobre otro es morir a uno y vivir al otro. "

Por lo tanto... dejar de reclamar lo que es verdad (palabras que crees), si estás insatisfecho con ellas, y reclamar algo mejor (creer mejores palabras), es morir por lo que no estás satisfecho con, y crear lo que haces desear.

¿Qué crees que significa sentir es el secreto?

Lo que sientes que es verdad es lo que crees que es verdad.

Mira las palabras que crees. Eso es lo que estás atrayendo.

Todos consideramos los sentimientos demasiado como efectos, y no lo suficientemente como causas de los acontecimientos del día. Sentir no es solo el resultado de nuestras condiciones de vida, también es el creador de esas condiciones.

Decimos que estamos felices porque estamos bien, sin darnos cuenta de que el proceso funcionará igual de bien en la dirección inversa. Estamos bien porque somos felices. - Neville Goddard Lo que Neville dice sobre que los sentimientos son el creador de condiciones es cierto.

También sé que los sentimientos son un efecto... y el efecto de las palabras que creemos.

También estoy seguro de que Neville habría estado de acuerdo con eso. Los sentimientos no se crean solos. Los creamos por las palabras que creemos.

Así que ambos son una causa y un efecto.

Creamos el sentimiento deseado y ese sentimiento es el creador de nuestras condiciones.

Benditos sean aquellos que encuentran información sobre cómo funcionan nuestras mentes para que puedan mejorar sus vidas con más conciencia de lo que sus palabras están haciendo en su vida y luego hablando sólo aquellas cosas que desean ser parte de su vida.

Al principio esto puede no parecer estar funcionando de la forma en que crees que debería funcionar... La razón de esto es simple. Has estado pensando MUCHAS cosas a lo largo de los años y estás de acuerdo con MUCHAS cosas a través de los años que se han vuelto subconscientes y ya ni siquiera tienes que pensar en ellas conscientemente... Sin embargo, todavía están afectando tu vida.

El proceso de reprogramación lleva un poco más de tiempo que decir unas pocas afirmaciones. Sin embargo, cuando SABES que esto es lo que se necesita para seguir mejorando tu vida, simplemente seguirás haciéndolo. y una a una todas esas creencias no deseadas que solías pensar antes de ser consciente se caerán por el camino... y el "nuevo hombre" se hará cargo...

Entonces un día miras hacia atrás en los últimos años y serás como WOW... mi vida realmente ha cambiado para mejor.

Sigue hablando hacia arriba... eso es lo que hacemos... Sigue hablando hacia arriba... solo lo que deseas.. y hablarlo en tiempo presente.

Entonces deja que la magia suceda.

Me siento bien.

Puedes decir esas palabras como expresión o decirlas porque estás aplicando un principio.

Prefiero decirlas como principio.

¿Por qué hacer esta distinción?

Si me siento bien y te digo que me siento bien... y es por algo que paso en mi vida, que hace eso por ti o por mi?

Si me siento bien y te digo que me siento bien y que te digo es porque estoy aplicando el principio... de afirmar que me siento bien... Te he dado algo de valor. Ahora sabes el secreto de sentirte bien, y puedes aplicarlo.

Aquí de nuevo... este es un ejemplo del poder de las palabras... un ejemplo de aplicación de un principio creativo.

Puede aplicarse a los sentimientos y puede aplicarse a las cosas.

Es pensar DESDE el deseo cumplido.

Es un gran día.

La vida es buena.

Todo siempre está funcionando para mí de maneras mágicas.

No los estoy diciendo como una expresión... aunque pudiera. Eso no hace nada por ti o por mí.

Los digo como un principio creativo. Eso me ayuda a mí y a cualquiera que entienda por qué decimos estas cosas. Por qué decimos afirmaciones.

Las imágenes en mi mente, que son creadas con mis palabras y mantenidas en su lugar por mis creencias, que es como elijo conscientemente lo que siento que es verdad, se proyectan en la pantalla del espacio, también conocida como mi realidad.$sinfonia$,
  'internal://audiobooks/sinfonia-de-susurros',
  'public',
  true,
  $metadata${"author":"Germán González","chapters":[{"title":"¡Bienvenido/a!","anchor":"bienvenido-a","order":1,"page":2},{"title":"Despierta tu creatividad.","anchor":"despierta-tu-creatividad","order":2,"page":4},{"title":"La Revelación Interior","anchor":"la-revelacion-interior","order":3,"page":7},{"title":"Aceptar sin racionalizar","anchor":"aceptar-sin-racionalizar","order":4,"page":13},{"title":"Imaginar como Dios","anchor":"imaginar-como-dios","order":5,"page":15},{"title":"La Dualidad y la Imaginación","anchor":"la-dualidad-y-la-imaginacion","order":6,"page":17},{"title":"La Aceptación y la Entrega","anchor":"la-aceptacion-y-la-entrega","order":7,"page":21},{"title":"Liberación a través del 'Yo no soy': Desapego y Transformación Interior","anchor":"liberacion-a-traves-del-yo-no-soy-desapego-y-transformacion-interior","order":8,"page":23},{"title":"La Biblia como Mapa de Creación","anchor":"la-biblia-como-mapa-de-creacion","order":9,"page":31},{"title":"El Despertar del Hombre Interior","anchor":"el-despertar-del-hombre-interior","order":10,"page":34},{"title":"La Imaginación como Creadora de Realidades","anchor":"la-imaginacion-como-creadora-de-realidades","order":11,"page":39},{"title":"Cómo Sentirse Si Ya Tienes Tu Deseo","anchor":"como-sentirse-si-ya-tienes-tu-deseo","order":12,"page":44},{"title":"Dios en Ti","anchor":"dios-en-ti","order":13,"page":49},{"title":"Más Allá de la Razón","anchor":"mas-alla-de-la-razon","order":14,"page":53},{"title":"El Poder de la Autoaceptación","anchor":"el-poder-de-la-autoaceptacion","order":15,"page":57},{"title":"La Paz del Deseo Cumplido: Encontrando Alivio en la Imaginación","anchor":"la-paz-del-deseo-cumplido-encontrando-alivio-en-la-imaginacion","order":16,"page":62},{"title":"Vivir Desde la Realidad Cumplida","anchor":"vivir-desde-la-realidad-cumplida","order":17,"page":68},{"title":"El Arte de Ser: Deseo y Realización Interna","anchor":"el-arte-de-ser-deseo-y-realizacion-interna","order":18,"page":73},{"title":"La Imaginación, Poder Infinito","anchor":"la-imaginacion-poder-infinito","order":19,"page":76},{"title":"Cambio Interior","anchor":"cambio-interior","order":20,"page":79},{"title":"La Imaginación y la Fe","anchor":"la-imaginacion-y-la-fe","order":21,"page":83},{"title":"Practicando la Ocupación Mental","anchor":"practicando-la-ocupacion-mental","order":22,"page":86},{"title":"De esclavo a creador","anchor":"de-esclavo-a-creador","order":23,"page":92},{"title":"Liberarse de los Juicios y Abrazar la Imaginación","anchor":"liberarse-de-los-juicios-y-abrazar-la-imaginacion","order":24,"page":100},{"title":"Cristo","anchor":"cristo","order":25,"page":103},{"title":"Dieta","anchor":"dieta","order":26,"page":111},{"title":"Nadie a quien cambiar","anchor":"nadie-a-quien-cambiar","order":27,"page":123},{"title":"Sinfonia de susurros","anchor":"sinfonia-de-susurros","order":28,"page":125}],"storage_bucket":"audiobooks","audio_has_chapter_timestamps":false,"audio_duration_seconds_exact":6552.6144}$metadata$::jsonb,
  now()
)
on conflict (slug) do update
set content_type = excluded.content_type,
    title = excluded.title,
    excerpt = excluded.excerpt,
    body = excluded.body,
    source_url = excluded.source_url,
    visibility = excluded.visibility,
    is_published = excluded.is_published,
    metadata = excluded.metadata,
    published_at = coalesce(public.content_items.published_at, excluded.published_at),
    updated_at = now();

insert into public.collection_items (collection_id, content_id, sort_order)
select collection.id, item.id, 1
from public.collections collection
join public.content_items item on item.slug = 'sinfonia-de-susurros'
where collection.slug = 'audiolibros-de-german'
on conflict (collection_id, content_id) do update set sort_order = excluded.sort_order;

update public.content_assets asset
set source_url = 'storage://audiobooks/sinfonia-de-susurros/Sinfonia-de-Susurros_audio.mp3',
    storage_path = 'sinfonia-de-susurros/Sinfonia-de-Susurros_audio.mp3',
    mime_type = 'audio/mpeg',
    duration_seconds = 6553,
    file_size_bytes = 131052288,
    sort_order = 0
from public.content_items item
where item.slug = 'sinfonia-de-susurros'
  and asset.content_id = item.id
  and asset.asset_type = 'audio';

insert into public.content_assets (content_id, asset_type, source_url, storage_path, mime_type, duration_seconds, file_size_bytes, sort_order)
select item.id, 'audio', 'storage://audiobooks/sinfonia-de-susurros/Sinfonia-de-Susurros_audio.mp3', 'sinfonia-de-susurros/Sinfonia-de-Susurros_audio.mp3', 'audio/mpeg', 6553, 131052288, 0
from public.content_items item
where item.slug = 'sinfonia-de-susurros'
  and not exists (
    select 1 from public.content_assets asset where asset.content_id = item.id and asset.asset_type = 'audio'
  );

update public.content_assets asset
set source_url = 'storage://audiobooks/sinfonia-de-susurros/Sinfonia de susurros (final).pdf',
    storage_path = 'sinfonia-de-susurros/Sinfonia de susurros (final).pdf',
    mime_type = 'application/pdf',
    duration_seconds = null,
    file_size_bytes = 739211,
    sort_order = 1
from public.content_items item
where item.slug = 'sinfonia-de-susurros'
  and asset.content_id = item.id
  and asset.asset_type = 'document/pdf';

insert into public.content_assets (content_id, asset_type, source_url, storage_path, mime_type, duration_seconds, file_size_bytes, sort_order)
select item.id, 'document/pdf', 'storage://audiobooks/sinfonia-de-susurros/Sinfonia de susurros (final).pdf', 'sinfonia-de-susurros/Sinfonia de susurros (final).pdf', 'application/pdf', null, 739211, 1
from public.content_items item
where item.slug = 'sinfonia-de-susurros'
  and not exists (
    select 1 from public.content_assets asset where asset.content_id = item.id and asset.asset_type = 'document/pdf'
  );
