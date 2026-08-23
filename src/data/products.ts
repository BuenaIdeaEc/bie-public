// BIE-P06 — Fichas de producto para páginas individuales con SEO propio.
// Cada producto es bilingüe (es/en). Sin precios: los valores se conversan por WhatsApp.
// Regla: una página por producto, interconectadas por `related` y `next`.

export type Bi = { es: string; en: string };

export interface ProductPage {
  slug: string;                 // URL: /productos/<slug>/
  code: string;                 // código interno de catálogo (A-12). NUNCA se muestra al público.
  visual: 'chat' | 'web' | 'os' | 'brand' | 'ads' | 'cube';   // gráfico 3D del hero según el producto
  phase: { num: string; title: Bi; slug: string };
  name: Bi;                     // nombre comercial (sin código)
  heads?: {                     // titulares propios de secciones (si faltan, la plantilla usa los genéricos)
    pain?: Bi; what?: Bi; who?: Bi; band?: Bi;
  };
  seoTitle: Bi;                 // <title>
  seoDescription: Bi;           // meta description
  keywords: string[];           // referencia interna para SEO (no se imprime)
  hero: { h1: Bi; sub: Bi; trust: Bi };
  pains: { title: Bi; body: Bi }[];
  what: Bi;                     // qué es, en lenguaje del cliente
  deliverables: Bi[];           // lo que recibes
  steps: { title: Bi; body: Bi }[];
  demo?: { from: 'client' | 'bot'; text: Bi }[];  // conversación simulada (solo productos de chat)
  forWhom: Bi[];
  faq: { q: Bi; a: Bi }[];
  related: { slug: string; name: Bi; why: Bi }[];   // se potencia con
  next: { slug: string; name: Bi; why: Bi };        // siguiente paso en la cadena
  waMessage: Bi;                // mensaje pre-armado de WhatsApp
  chips?: Bi[];                 // notificaciones flotantes del visual (máx 3)
  usedBy?: { name: string; note: Bi }[];   // empresas que ya usan este producto (veracidad)
}

const B = (es: string, en: string): Bi => ({ es, en });

export const PRODUCTS: ProductPage[] = [
  {
    slug: 'pagina-web',
    code: 'A-12',
    visual: 'web',
    phase: { num: '04', title: B('Presencia Digital', 'Digital Presence'), slug: 'presencia-digital' },
    name: B('Página Web', 'Website'),
    heads: {
      pain: B('Si no te encuentran,<br><span class="serif">no existes para tu mercado.</span>', 'If they cannot find you,<br><span class="serif">you do not exist for your market.</span>'),
      what: B('Una web que trabaja como vendedor,<br><span class="serif">no como folleto.</span>', 'A site that works as a salesperson,<br><span class="serif">not a brochure.</span>'),
      who: B('Para empresas que quieren<br><span class="serif">ser encontradas y elegidas.</span>', 'For companies that want<br><span class="serif">to be found and chosen.</span>'),
      band: B('¿La quieres para tu empresa? <span class="serif">Empezamos por WhatsApp.</span>', 'Want it for your company? <span class="serif">We start on WhatsApp.</span>'),
    },
    seoTitle: B(
      'Diseño de Páginas Web Profesionales en Ecuador — Sitios que Venden | BIE',
      'Professional Website Design in Ecuador — Sites That Sell | BIE'
    ),
    seoDescription: B(
      'Diseño de páginas web profesionales en Ecuador: landing, corporativa, portafolio o tienda básica. Responsive, SEO on-page, Google Analytics y formulario conectado a WhatsApp. Publicada y con panel para que la administres.',
      'Professional website design in Ecuador: landing, corporate, portfolio or basic store. Responsive, on-page SEO, Google Analytics and a WhatsApp-connected form. Published, with an admin panel you control.'
    ),
    keywords: ['diseño de páginas web ecuador', 'crear página web profesional', 'sitio web para empresas', 'página web quito guayaquil cuenca', 'diseño web responsive', 'landing page ecuador'],
    hero: {
      h1: B(
        'Una página web que te encuentra clientes, <span class="serif">no solo visitas.</span>',
        'A website that finds you customers, <span class="serif">not just visits.</span>'
      ),
      sub: B(
        'Landing, sitio corporativo, portafolio o tienda básica — diseñada para que te encuentren en Google y para convertir cada visita en una conversación de WhatsApp. Publicada, medible y tuya.',
        'Landing, corporate site, portfolio or basic store — designed so Google finds you and every visit turns into a WhatsApp conversation. Published, measurable and yours.'
      ),
      trust: B('Sitios en producción para empresas reales de Ecuador · Sin compromiso', 'Sites in production for real companies in Ecuador · No commitment'),
    },
    pains: [
      { title: B('Tu cliente te busca en Google y no apareces', 'Your customer googles you and you are not there'), body: B('Aparece tu competencia. La decisión de compra empieza en una búsqueda, y hoy esa búsqueda no te incluye.', 'Your competitor shows up instead. Buying decisions start with a search, and today that search does not include you.') },
      { title: B('Solo existes en redes que no controlas', 'You only exist on networks you do not control'), body: B('Un cambio de algoritmo o un bloqueo y tu negocio desaparece. La web es el único terreno digital que es tuyo.', 'One algorithm change or a ban and your business disappears. Your website is the only digital ground you own.') },
      { title: B('Tienes web, pero no hace nada', 'You have a site, but it does nothing'), body: B('Un folleto en línea sin botón claro, sin medición y sin camino al WhatsApp no vende: solo existe.', 'An online brochure with no clear button, no measurement and no path to WhatsApp does not sell: it just exists.') },
    ],
    what: B(
      'Es tu sitio web profesional, construido según lo que tu empresa necesita: una landing enfocada en una sola acción, un sitio corporativo completo, un portafolio o una tienda básica. Diseño responsive que se ve bien en cualquier teléfono, textos y estructura pensados para vender, SEO on-page para que Google te entienda, y cada botón conectado a tu WhatsApp. Se entrega publicada, con métricas configuradas y un panel con guía para que la administres sin depender de nadie.',
      'It is your professional website, built around what your company needs: a landing focused on one action, a full corporate site, a portfolio or a basic store. Responsive design that looks right on any phone, copy and structure built to sell, on-page SEO so Google understands you, and every button connected to your WhatsApp. Delivered published, with analytics configured and an admin panel with a guide so you run it without depending on anyone.'
    ),
    deliverables: [
      B('Sitio web publicado en tu dominio', 'Website published on your domain'),
      B('Diseño responsive (teléfono, tablet y computadora)', 'Responsive design (phone, tablet and desktop)'),
      B('SEO on-page: meta tags, sitemap y datos estructurados (schema)', 'On-page SEO: meta tags, sitemap and structured data (schema)'),
      B('Google Analytics y Search Console configurados', 'Google Analytics and Search Console configured'),
      B('Formulario y botones conectados a tu WhatsApp', 'Form and buttons connected to your WhatsApp'),
      B('Panel de administración con guía de uso', 'Admin panel with a usage guide'),
      B('Respaldo automático del sitio', 'Automatic site backup'),
    ],
    steps: [
      { title: B('Definimos qué debe lograr', 'We define what it must achieve'), body: B('Qué vendes, a quién, y cuál es la acción que queremos que haga cada visitante. De ahí sale la estructura.', 'What you sell, to whom, and the one action we want every visitor to take. The structure comes from that.') },
      { title: B('Diseñamos con tu marca', 'We design with your brand'), body: B('Tu identidad aplicada a una estructura que vende. Ves la propuesta y ajustamos contigo antes de construir.', 'Your identity applied to a structure that sells. You see the proposal and we adjust together before building.') },
      { title: B('Construimos y conectamos', 'We build and connect'), body: B('Desarrollo responsive, SEO on-page, métricas y todos los caminos hacia tu WhatsApp.', 'Responsive build, on-page SEO, analytics and every path leading to your WhatsApp.') },
      { title: B('Publicamos y te entregamos el control', 'We publish and hand you the keys'), body: B('Sitio en vivo en tu dominio, con panel, guía y respaldo. Es tuyo, no rehén de un proveedor.', 'Site live on your domain, with panel, guide and backup. It is yours, not hostage to a vendor.') },
    ],
    forWhom: [
      B('Empresas que aún no tienen sitio web propio', 'Companies that still have no website of their own'),
      B('Negocios cuya web actual no genera consultas', 'Businesses whose current site brings no inquiries'),
      B('Marcas que venden por redes y necesitan su terreno propio', 'Brands selling on social media that need ground they own'),
      B('Profesionales y servicios que viven de su credibilidad', 'Professionals and services that live on credibility'),
    ],
    faq: [
      { q: B('¿No puedo hacerla yo mismo con inteligencia artificial?', 'Can I not build it myself with AI?'), a: B('Puedes empezar, y para un experimento está bien. El problema aparece después: dominio, hosting, SEO, medición, seguridad, respaldo y una estructura que convierta — ahí es donde un sitio hecho a medias se vuelve más caro que uno bien hecho. Nosotros usamos IA en el proceso, pero con criterio comercial y responsabilidad sobre el resultado: tú recibes un sitio publicado, medible y mantenible, no un borrador que administrar.', 'You can start, and for an experiment that is fine. The problem shows up later: domain, hosting, SEO, analytics, security, backups and a structure that converts — that is where a half-built site becomes more expensive than a well-built one. We use AI in the process too, but with commercial judgment and responsibility for the result: you get a published, measurable, maintainable site, not a draft to babysit.') },
      { q: B('¿El dominio y el hosting son míos?', 'Do I own the domain and hosting?'), a: B('Sí. Todo se registra a nombre de tu empresa y te entregamos los accesos. Si un día no trabajas con nosotros, el sitio sigue siendo tuyo.', 'Yes. Everything is registered under your company and we hand you the credentials. If one day you stop working with us, the site is still yours.') },
      { q: B('¿Landing, sitio completo o tienda: cuál necesito?', 'Landing, full site or store: which one do I need?'), a: B('Depende de tu objetivo: una landing concentra todo en una sola acción; un corporativo construye credibilidad; una tienda básica muestra catálogo y recibe pedidos. Lo definimos juntos en la primera conversación, sin costo.', 'It depends on your goal: a landing focuses everything on one action; a corporate site builds credibility; a basic store shows a catalog and takes orders. We define it together in the first conversation, at no cost.') },
      { q: B('¿Podré actualizarla yo mismo?', 'Will I be able to update it myself?'), a: B('Sí. Se entrega con un panel de administración y una guía. Cambiar textos, fotos o productos no requiere programar.', 'Yes. It ships with an admin panel and a guide. Changing copy, photos or products requires no code.') },
      { q: B('¿Y si después quiero vender en línea o automatizar?', 'What if later I want to sell online or automate?'), a: B('La web se construye como base de la cadena: sobre ella se conectan el asistente inteligente, las ventas por WhatsApp y la publicidad. Nada se bota ni se rehace.', 'The site is built as the base of the chain: the AI assistant, WhatsApp sales and advertising plug into it. Nothing gets thrown away or rebuilt.') },
    ],
    related: [
      { slug: 'identidad-de-marca', name: B('Identidad de Marca', 'Brand Identity'), why: B('La web comunica mejor cuando la marca está definida antes.', 'The site communicates better when the brand is defined first.') },
      { slug: 'posicionamiento-seo', name: B('Posicionamiento SEO', 'SEO Positioning'), why: B('Publicar es el inicio; posicionar es lo que trae tráfico cada mes.', 'Publishing is the start; ranking is what brings traffic every month.') },
      { slug: 'automatizaciones', name: B('Automatizaciones', 'Automations'), why: B('Cada formulario puede disparar seguimientos sin trabajo manual.', 'Every form can trigger follow-ups with no manual work.') },
    ],
    next: { slug: 'asistente-inteligente-whatsapp', name: B('Asistente Inteligente 24/7', '24/7 AI Assistant'), why: B('Con la web publicada, el siguiente paso es que alguien atienda cada visita — a cualquier hora.', 'With the site live, the next step is having someone answer every visit — at any hour.') },
    waMessage: B(
      'Hola, vengo de la página de Página Web de BIE. Quiero una web para mi empresa.',
      'Hi, I come from the BIE Website page. I want a website for my company.'
    ),
    chips: [B('Visita desde Google', 'Visit from Google'), B('Formulario recibido', 'Form received'), B('Chat de WhatsApp iniciado', 'WhatsApp chat started')],
    usedBy: [
      { name: 'Amílcar', note: B('Servicios profesionales · Web con agenda en línea', 'Professional services · Site with online booking') },
    ],
  },
  {
    slug: 'asistente-inteligente-whatsapp',
    code: 'A-14',
    visual: 'chat',
    phase: { num: '05', title: B('Automatización e IA', 'Automation & AI'), slug: 'automatizacion' },
    name: B('Asistente Inteligente 24/7', '24/7 AI Assistant'),
    seoTitle: B(
      'Chatbot para WhatsApp con IA en Ecuador — Asistente Inteligente 24/7 | BIE',
      'AI WhatsApp Chatbot in Ecuador — 24/7 AI Assistant | BIE'
    ),
    seoDescription: B(
      'Asistente con inteligencia artificial para WhatsApp y tu sitio web: responde, cotiza y agenda citas las 24 horas. Implementado por BIE para empresas en Ecuador. Diagnóstico gratuito.',
      'AI-powered assistant for WhatsApp and your website: replies, quotes and books appointments 24/7. Built by BIE for companies in Ecuador. Free diagnosis.'
    ),
    keywords: ['chatbot whatsapp ecuador', 'chatbot con inteligencia artificial', 'asistente virtual whatsapp', 'automatizar whatsapp negocio', 'bot para whatsapp business', 'chatbot para empresas quito guayaquil cuenca'],
    hero: {
      h1: B(
        'Tu negocio responde, cotiza y agenda <span class="serif">mientras duermes.</span>',
        'Your business replies, quotes and books <span class="serif">while you sleep.</span>'
      ),
      sub: B(
        'Un asistente con inteligencia artificial que atiende tu WhatsApp y tu sitio web las 24 horas. Entrenado con la información de tu empresa, habla como tu mejor vendedor y nunca deja un mensaje sin contestar.',
        'An AI assistant that runs your WhatsApp and website 24 hours a day. Trained on your company information, it talks like your best salesperson and never leaves a message unanswered.'
      ),
      trust: B('Implementado en empresas reales de Ecuador · Sin compromiso · Respuesta en menos de 24 horas', 'Running in real companies in Ecuador · No commitment · Reply within 24 hours'),
    },
    pains: [
      { title: B('El cliente escribe a las 11 de la noche', 'The customer writes at 11 pm'), body: B('Y a las 8 de la mañana ya le compró a otro que sí contestó. Cada hora sin respuesta es una venta que se va.', 'And by 8 am they already bought from someone who replied. Every unanswered hour is a sale walking away.') },
      { title: B('Tu equipo repite lo mismo 40 veces al día', 'Your team repeats the same thing 40 times a day'), body: B('Precios, horarios, ubicación, "¿tienen en talla M?". Tiempo humano quemado en preguntas que una máquina responde mejor.', 'Prices, hours, location, "do you have it in medium?". Human time burned on questions a machine answers better.') },
      { title: B('Los mensajes se pierden en el teléfono de alguien', 'Messages get lost on someone\'s phone'), body: B('Sin registro, sin seguimiento, sin saber cuántos escribieron y cuántos compraron. Decides a ciegas.', 'No record, no follow-up, no idea how many wrote and how many bought. You decide blind.') },
    ],
    what: B(
      'Es un asistente que vive dentro de tu WhatsApp Business y de tu sitio web. Cuando alguien escribe, el asistente entiende lo que necesita, responde con la información real de tu empresa, envía cotizaciones, agenda citas o toma pedidos — y cuando la conversación necesita una persona, te la pasa a ti con todo el contexto. No es un menú de opciones: es una conversación natural.',
      'It is an assistant that lives inside your WhatsApp Business and your website. When someone writes, it understands what they need, replies with your company\'s real information, sends quotes, books appointments or takes orders — and when the conversation needs a human, it hands it to you with full context. It is not a menu of options: it is a natural conversation.'
    ),
    deliverables: [
      B('Asistente conectado a tu WhatsApp Business y a tu sitio web', 'Assistant connected to your WhatsApp Business and your website'),
      B('Entrenamiento con la información real de tu empresa: productos, precios, políticas, tono', 'Training on your company\'s real information: products, prices, policies, tone'),
      B('Flujos de cotización, agenda de citas y toma de pedidos', 'Quoting, appointment booking and order-taking flows'),
      B('Transferencia a un humano con resumen de la conversación', 'Hand-off to a human with a conversation summary'),
      B('Panel con todas las conversaciones, leads y métricas', 'Dashboard with every conversation, lead and metric'),
      B('Ajustes durante el primer mes según lo que pregunten tus clientes reales', 'Adjustments during the first month based on what your real customers ask'),
    ],
    steps: [
      { title: B('Mapeamos tu conversación', 'We map your conversation'), body: B('Revisamos qué te preguntan hoy, qué vendes y cómo cierras. De ahí sale el guion del asistente.', 'We review what people ask you today, what you sell and how you close. That becomes the assistant\'s script.') },
      { title: B('Lo entrenamos con tu empresa', 'We train it on your company'), body: B('Cargamos tu catálogo, políticas y tono. El asistente responde como tú, no como una máquina.', 'We load your catalog, policies and tone. The assistant answers like you, not like a machine.') },
      { title: B('Lo conectamos sin frenar tu operación', 'We connect it without stopping your operation'), body: B('WhatsApp Business, tu web y tu agenda. Tu número sigue siendo tu número.', 'WhatsApp Business, your site and your calendar. Your number stays your number.') },
      { title: B('Ajustamos con clientes reales', 'We fine-tune with real customers'), body: B('El primer mes observamos cada conversación y afinamos lo que haga falta. Tú ves todo en el panel.', 'During the first month we watch every conversation and refine what is needed. You see everything in the dashboard.') },
    ],
    demo: [
      { from: 'client', text: B('Hola, tienen el vestido rojo en talla M?', 'Hi, do you have the red dress in medium?') },
      { from: 'bot', text: B('Hola, sí. Nos quedan 3 en talla M. Te lo puedo reservar y enviar hoy mismo en Guayaquil. ¿Te paso las fotos?', 'Hi, yes. We have 3 left in medium. I can reserve it and ship today within Guayaquil. Want me to send photos?') },
      { from: 'client', text: B('Sí porfa, y cuánto sale con envío?', 'Yes please, and how much with shipping?') },
      { from: 'bot', text: B('Aquí va la cotización con envío incluido. Si confirmas ahora te lo separo a tu nombre. ¿A qué nombre lo reservo?', 'Here is the quote with shipping included. If you confirm now I will hold it in your name. Whose name should I use?') },
      { from: 'client', text: B('María González', 'María González') },
      { from: 'bot', text: B('Listo, María. Reservado y registrado. El equipo te confirma la entrega en un momento.', 'Done, María. Reserved and registered. The team will confirm delivery shortly.') },
    ],
    forWhom: [
      B('Tiendas y marcas que venden por WhatsApp', 'Stores and brands selling on WhatsApp'),
      B('Clínicas, consultorios y servicios con citas', 'Clinics, practices and appointment-based services'),
      B('Restaurantes, hoteles y experiencias', 'Restaurants, hotels and experiences'),
      B('Cualquier empresa que recibe más mensajes de los que puede contestar', 'Any company getting more messages than it can answer'),
    ],
    faq: [
      { q: B('¿Funciona con mi número actual de WhatsApp?', 'Does it work with my current WhatsApp number?'), a: B('Sí. Se conecta a tu WhatsApp Business; tu número y tu historial siguen siendo tuyos.', 'Yes. It connects to your WhatsApp Business; your number and history remain yours.') },
      { q: B('¿Suena como un robot?', 'Does it sound like a robot?'), a: B('No. Se entrena con tu tono y tu información real. Responde en lenguaje natural y sabe cuándo pasar la conversación a una persona.', 'No. It is trained on your tone and your real information. It replies in natural language and knows when to hand over to a person.') },
      { q: B('¿Qué pasa si el cliente pregunta algo que no sabe?', 'What if the customer asks something it does not know?'), a: B('Lo reconoce, responde con honestidad y te avisa de inmediato con el contexto completo para que tú continúes.', 'It recognizes it, answers honestly and alerts you immediately with full context so you can continue.') },
      { q: B('¿Cuánto tarda en estar funcionando?', 'How long until it is running?'), a: B('Depende de cuánta información tenga tu empresa lista. Lo habitual es tenerlo atendiendo en pocas semanas, con ajustes durante el primer mes.', 'It depends on how much information your company has ready. Typically it is live within a few weeks, with adjustments during the first month.') },
      { q: B('¿Necesito tener sitio web?', 'Do I need a website?'), a: B('No. Puede vivir solo en WhatsApp. Si tienes o quieres web, se conecta también ahí.', 'No. It can live on WhatsApp alone. If you have or want a website, it connects there too.') },
    ],
    related: [
      { slug: 'ventas-por-whatsapp', name: B('Ventas por WhatsApp', 'WhatsApp Commerce'), why: B('Para que el asistente no solo responda: que cobre.', 'So the assistant does not just reply: it gets paid.') },
      { slug: 'gestion-de-clientes', name: B('Gestión de Clientes', 'Customer Management (CRM)'), why: B('Cada conversación queda registrada y con seguimiento automático.', 'Every conversation gets registered with automatic follow-up.') },
      { slug: 'sitio-web-que-vende', name: B('Sitio Web que Vende', 'Website That Sells'), why: B('El mismo asistente atendiendo a quien llega desde Google.', 'The same assistant serving whoever arrives from Google.') },
    ],
    next: { slug: 'publicidad-facebook-instagram', name: B('Publicidad en Facebook e Instagram', 'Facebook & Instagram Ads'), why: B('Con el asistente atendiendo, cada dólar de publicidad ya no se pierde por falta de respuesta.', 'With the assistant answering, no ad dollar is lost to a missed reply.') },
    chips: [B('Nuevo lead · 02:14 a.m.','New lead · 02:14 a.m.'), B('Cotización enviada','Quote sent'), B('Cita agendada','Appointment booked')],
    usedBy: [
      { name: 'Tasting Ecuador', note: B('Experiencias gastronómicas · Cuenca', 'Culinary experiences · Cuenca') },
    ],
    waMessage: B(
      'Hola, vengo de la página del Asistente Inteligente 24/7 de BIE. Quiero saber cómo funcionaría en mi empresa.',
      'Hi, I come from the BIE 24/7 AI Assistant page. I want to know how it would work in my company.'
    ),
  },
  {
    slug: 'link-hub',
    code: 'A-47',
    visual: 'web',
    phase: { num: '04', title: B('Presencia Digital', 'Digital Presence'), slug: 'presencia-digital' },
    name: B('Link Hub de Marca', 'Brand Link Hub'),
    heads: {
      pain: B('Un solo enlace en tu bio,<br><span class="serif">y mil oportunidades perdidas.</span>', 'One link in your bio,<br><span class="serif">a thousand lost opportunities.</span>'),
      what: B('Tu punto único de entrada,<br><span class="serif">con tu marca, no la de otros.</span>', 'Your single point of entry,<br><span class="serif">with your brand, not someone else\'s.</span>'),
      who: B('Para quien vende<br><span class="serif">desde sus redes sociales.</span>', 'For those who sell<br><span class="serif">from their social media.</span>'),
    },
    seoTitle: B('Link Hub de Marca — Página de Enlaces Profesional para tu Bio | BIE Ecuador', 'Brand Link Hub — Professional Link-in-Bio Page | BIE Ecuador'),
    seoDescription: B('Página de enlaces profesional con tu marca: catálogo, canales de venta, comunidad, descargables, FAQ y analítica de clics en una sola página optimizada para móvil. La alternativa con marca propia al linktree genérico.', 'Professional link-in-bio page with your brand: catalog, sales channels, community, downloads, FAQ and click analytics on one mobile-first page. The branded alternative to a generic linktree.'),
    keywords: ['link en bio profesional', 'alternativa a linktree con marca propia', 'pagina de enlaces para instagram', 'link hub para negocios ecuador', 'linktree personalizado empresa'],
    hero: {
      h1: B('Todos tus enlaces, <span class="serif">una sola puerta de entrada.</span>', 'All your links, <span class="serif">one single front door.</span>'),
      sub: B('Catálogo, canales de venta, comunidad, horarios, descargables y contacto — en una página con tu marca, optimizada para el teléfono, con analítica de clics para saber qué funciona.', 'Catalog, sales channels, community, schedules, downloads and contact — on one branded, mobile-first page with click analytics so you know what works.'),
      trust: B('El Luway Hub opera en producción · El producto de entrada más rápido de BIE', 'The Luway Hub runs in production · BIE\'s fastest entry product'),
    },
    pains: [
      { title: B('Tu bio lleva a una página que no es tuya', 'Your bio links to a page that is not yours'), body: B('Un linktree genérico con la marca de otro. La primera impresión digital de tu negocio no debería ser una plantilla gratuita.', 'A generic linktree with someone else\'s brand. Your business\'s first digital impression should not be a free template.') },
      { title: B('El cliente llega y no sabe a dónde ir', 'The customer arrives and does not know where to go'), body: B('Catálogo por un lado, WhatsApp por otro, el live en otra red. Cada paso extra es gente que se pierde en el camino.', 'Catalog in one place, WhatsApp in another, the live stream somewhere else. Every extra step is people lost along the way.') },
      { title: B('No sabes qué enlace funciona', 'You do not know which link works'), body: B('Sin medición de clics decides a ciegas qué promocionar y dónde poner el esfuerzo.', 'Without click data you decide blind about what to promote and where to put your effort.') },
    ],
    what: B(
      'Es una página única, con tu identidad de marca, que concentra todo lo que tu cliente puede necesitar al salir de tus redes: el catálogo o la tienda, los canales de venta y contacto, la comunidad, horarios de transmisión, materiales descargables, preguntas frecuentes y testimonios. Optimizada para el teléfono — que es donde te encuentran — y con analítica de clics para saber exactamente qué toca la gente. Es también la puerta de entrada más rápida a trabajar con BIE.',
      'It is a single page, with your brand identity, that concentrates everything your customer may need when leaving your social profiles: catalog or store, sales and contact channels, community, streaming schedules, downloadables, FAQ and testimonials. Mobile-first — because that is where people find you — with click analytics so you know exactly what gets tapped. It is also the fastest door into working with BIE.'
    ),
    deliverables: [
      B('Hub publicado y responsive con tu marca', 'Hub published, responsive, with your brand'),
      B('Enlace a tu catálogo o tienda', 'Link to your catalog or store'),
      B('Accesos directos a tus canales de venta y contacto', 'Direct access to your sales and contact channels'),
      B('Sección de comunidad y testimonios', 'Community section and testimonials'),
      B('Descargables configurables y preguntas frecuentes', 'Configurable downloads and FAQ'),
      B('Analítica de clics', 'Click analytics'),
      B('Guía de actualización para tu equipo', 'Update guide for your team'),
    ],
    steps: [
      { title: B('Reunimos tus destinos', 'We gather your destinations'), body: B('Catálogo, canales, comunidad, materiales: definimos qué debe estar y en qué orden según tu prioridad comercial.', 'Catalog, channels, community, materials: we define what belongs and in what order by commercial priority.') },
      { title: B('Lo diseñamos con tu marca', 'We design it with your brand'), body: B('Colores, tipografía y tono tuyos. Si aún no tienes identidad definida, te lo decimos con honestidad.', 'Your colors, typography and tone. If you do not have a defined identity yet, we tell you honestly.') },
      { title: B('Publicamos y medimos', 'We publish and measure'), body: B('Hub en vivo, optimizado para móvil, con analítica de clics activa desde el primer día.', 'Hub live, mobile-optimized, with click analytics on from day one.') },
      { title: B('Te entregamos el control', 'We hand you the control'), body: B('Guía de actualización incluida: cambiar un enlace o un horario no depende de nadie más.', 'Update guide included: changing a link or a schedule depends on no one else.') },
    ],
    forWhom: [
      B('Marcas que venden por Instagram o TikTok', 'Brands selling on Instagram or TikTok'),
      B('Negocios con lives y horarios de transmisión', 'Businesses with lives and streaming schedules'),
      B('Creadores y profesionales con varios canales', 'Creators and professionals with several channels'),
      B('Quien quiere empezar con BIE con la menor fricción', 'Anyone wanting the lowest-friction start with BIE'),
    ],
    faq: [
      { q: B('¿No me sirve un linktree gratuito?', 'Is a free linktree not enough?'), a: B('Para empezar, sí. La diferencia está en la marca, la conversión y los datos: un hub propio se ve como tu empresa, ordena los destinos según tu prioridad comercial y te dice qué tocan tus visitantes. Un enlace genérico es de la plataforma; un hub con dominio propio es un activo tuyo.', 'To get started, yes. The difference is brand, conversion and data: your own hub looks like your company, orders destinations by commercial priority and tells you what visitors tap. A generic link belongs to the platform; a hub on your own domain is your asset.') },
      { q: B('¿Puedo tenerlo en mi propio dominio?', 'Can it live on my own domain?'), a: B('Sí, y es lo que recomendamos: da credibilidad, se indexa en Google y convierte un enlace desechable en un activo de marca. Lo definimos en la primera conversación.', 'Yes, and it is what we recommend: it adds credibility, gets indexed by Google and turns a disposable link into a brand asset. We define it in the first conversation.') },
      { q: B('¿Qué mide la analítica?', 'What does the analytics measure?'), a: B('Los clics de cada enlace del hub: sabes qué destino funciona y cuál no, para decidir qué promocionar.', 'Clicks on every hub link: you know which destination works and which does not, to decide what to promote.') },
      { q: B('¿Lo puedo actualizar yo?', 'Can I update it myself?'), a: B('Sí. Se entrega con una guía de actualización; cambiar enlaces, horarios o materiales no requiere programar.', 'Yes. It ships with an update guide; changing links, schedules or materials requires no code.') },
      { q: B('¿Y cuando necesite algo más grande?', 'And when I need something bigger?'), a: B('El hub es la puerta: cuando tu operación pida más, el paso natural es la página web completa — y el hub sigue funcionando como tu enlace de bio.', 'The hub is the door: when your operation asks for more, the natural step is the full website — and the hub keeps working as your bio link.') },
    ],
    related: [
      { slug: 'pagina-web', name: B('Página Web', 'Website'), why: B('Cuando el hub se queda corto, la web completa es el siguiente terreno.', 'When the hub falls short, the full site is the next ground.') },
      { slug: 'perfil-google-maps', name: B('Perfil de Google Maps', 'Google Maps Profile'), why: B('Que también te encuentren cuando buscan cerca de ti.', 'So they also find you when searching nearby.') },
      { slug: 'whatsapp-business-commerce', name: B('WhatsApp Business Commerce', 'WhatsApp Business Commerce'), why: B('Del clic en el hub directo al pedido por WhatsApp.', 'From the hub tap straight to a WhatsApp order.') },
    ],
    next: { slug: 'pagina-web', name: B('Página Web', 'Website'), why: B('El hub abre la puerta; la web construye la casa.', 'The hub opens the door; the website builds the house.') },
    waMessage: B('Hola, vengo de la página del Link Hub de Marca de BIE. Quiero uno para mi negocio.', 'Hi, I come from the BIE Brand Link Hub page. I want one for my business.'),
    chips: [B('Clic en catálogo', 'Catalog tap'), B('Clic en WhatsApp', 'WhatsApp tap'), B('Descargable entregado', 'Download delivered')],
    usedBy: [
      { name: 'Luway', note: B('Moda en vivo · Luway Hub en producción', 'Live fashion · Luway Hub in production') },
    ],
  },
  {
    slug: 'crm-ia',
    code: 'A-15',
    visual: 'os',
    phase: { num: '05', title: B('Automatización e IA', 'Automation & AI'), slug: 'automatizacion' },
    name: B('CRM con IA', 'AI-Powered CRM'),
    heads: {
      pain: B('Los clientes no se pierden por mal producto:<br><span class="serif">se pierden por falta de seguimiento.</span>', 'Customers are not lost to a bad product:<br><span class="serif">they are lost to poor follow-up.</span>'),
      what: B('Cada cliente registrado,<br><span class="serif">cada seguimiento hecho.</span>', 'Every customer registered,<br><span class="serif">every follow-up done.</span>'),
      who: B('Para equipos que venden<br><span class="serif">más de lo que pueden recordar.</span>', 'For teams selling<br><span class="serif">more than they can remember.</span>'),
    },
    seoTitle: B('CRM con Inteligencia Artificial para Empresas en Ecuador | BIE', 'AI-Powered CRM for Companies in Ecuador | BIE'),
    seoDescription: B('CRM inteligente configurado para tu empresa: pipeline de ventas, lead scoring, secuencias de seguimiento automatizadas, dashboards de conversión e integración con tu chatbot. Implementado y con tu equipo capacitado.', 'Smart CRM configured for your company: sales pipeline, lead scoring, automated follow-up sequences, conversion dashboards and chatbot integration. Implemented, with your team trained.'),
    keywords: ['crm para empresas ecuador', 'crm con inteligencia artificial', 'seguimiento de clientes automatizado', 'pipeline de ventas', 'crm whatsapp'],
    hero: {
      h1: B('Ningún cliente sin seguimiento, <span class="serif">nunca más.</span>', 'No customer left unfollowed, <span class="serif">ever again.</span>'),
      sub: B('Un CRM configurado para tu forma de vender: cada lead entra al pipeline, recibe su seguimiento automático y tú ves en un tablero quién está por comprar, quién se enfría y por qué.', 'A CRM configured for how you sell: every lead enters the pipeline, gets automatic follow-up, and a dashboard shows you who is about to buy, who is cooling off, and why.'),
      trust: B('Configuración + capacitación de tu equipo incluidas · Sin compromiso', 'Setup + team training included · No commitment'),
    },
    pains: [
      { title: B('Los leads viven en el teléfono de alguien', 'Leads live on someone\'s phone'), body: B('Si esa persona se enferma, renuncia o simplemente olvida, la venta muere con ella. La memoria no es un sistema.', 'If that person gets sick, quits or simply forgets, the sale dies with them. Memory is not a system.') },
      { title: B('El seguimiento depende de la buena voluntad', 'Follow-up depends on goodwill'), body: B('"Luego le escribo" es donde mueren la mayoría de las ventas. Los que compran son los que recibieron el mensaje correcto a tiempo.', '"I will write later" is where most sales die. Buyers are the ones who got the right message on time.') },
      { title: B('No sabes en qué punto está cada venta', 'You do not know where each sale stands'), body: B('¿Cuántas propuestas abiertas hay? ¿Cuánto vale el pipeline? Sin tablero, la respuesta es una intuición.', 'How many open proposals are there? What is the pipeline worth? Without a board, the answer is a hunch.') },
    ],
    what: B(
      'Es tu sistema de gestión comercial configurado sobre una plataforma probada y adaptado a tu proceso real de venta: pipelines por etapa, calificación automática de leads para saber a quién atender primero, secuencias de seguimiento que salen solas, y dashboards de ventas y conversión. Se integra con tu asistente inteligente para que cada conversación de WhatsApp quede registrada. Incluye la capacitación de tu equipo y la documentación del proceso.',
      'It is your commercial management system configured on a proven platform and adapted to your real sales process: stage pipelines, automatic lead scoring so you know who to serve first, follow-up sequences that go out on their own, and sales and conversion dashboards. It integrates with your AI assistant so every WhatsApp conversation is registered. Team training and process documentation included.'
    ),
    deliverables: [
      B('CRM configurado sobre plataforma probada', 'CRM configured on a proven platform'),
      B('Pipelines de venta adaptados a tu proceso', 'Sales pipelines adapted to your process'),
      B('Calificación automática de leads (lead scoring)', 'Automatic lead scoring'),
      B('Secuencias de seguimiento automatizadas', 'Automated follow-up sequences'),
      B('Dashboards de ventas y conversión', 'Sales and conversion dashboards'),
      B('Integración con tu chatbot / asistente', 'Integration with your chatbot / assistant'),
      B('Capacitación del equipo y documentación', 'Team training and documentation'),
    ],
    steps: [
      { title: B('Mapeamos tu proceso de venta', 'We map your sales process'), body: B('Cómo llega un lead, qué pasos sigue y dónde se pierde hoy. El CRM se configura sobre tu realidad, no sobre una plantilla.', 'How a lead arrives, what steps follow and where it gets lost today. The CRM is configured on your reality, not a template.') },
      { title: B('Configuramos pipeline y scoring', 'We configure pipeline and scoring'), body: B('Etapas, campos, reglas de calificación y responsables. Todo lo que hoy vive en cabezas pasa al sistema.', 'Stages, fields, scoring rules and owners. Everything living in heads moves into the system.') },
      { title: B('Activamos los seguimientos', 'We activate follow-ups'), body: B('Secuencias por etapa que salen solas y se detienen cuando el cliente responde. Nadie queda sin contestar.', 'Stage-based sequences that go out on their own and stop when the customer replies. No one goes unanswered.') },
      { title: B('Capacitamos a tu equipo', 'We train your team'), body: B('Tu gente sabe usarlo y tú lees el tablero. El sistema queda documentado y funcionando.', 'Your people know how to use it and you can read the board. The system is documented and running.') },
    ],
    forWhom: [
      B('Equipos comerciales de 2 a 20 personas', 'Sales teams of 2 to 20 people'),
      B('Negocios que venden por WhatsApp y redes', 'Businesses selling via WhatsApp and social'),
      B('Empresas con ciclos de venta de días o semanas', 'Companies with day- or week-long sales cycles'),
      B('Dueños que quieren ver el pipeline sin preguntar', 'Owners who want pipeline visibility without asking'),
    ],
    faq: [
      { q: B('¿No puedo llevar mis clientes en una hoja de cálculo o con IA?', 'Can I not track customers in a spreadsheet or with AI?'), a: B('Hasta cierto volumen, sí. El problema es lo que la hoja no hace: recordar seguimientos, calificar leads, disparar mensajes y mostrarte el pipeline en vivo. Nosotros también usamos IA — dentro de un sistema con responsables, etapas y medición. Recibes un proceso comercial operando, no otra herramienta a medio configurar.', 'Up to a certain volume, yes. The problem is what the sheet does not do: remember follow-ups, score leads, trigger messages and show a live pipeline. We use AI too — inside a system with owners, stages and measurement. You get a running commercial process, not another half-configured tool.') },
      { q: B('¿Sobre qué plataforma se monta?', 'What platform does it run on?'), a: B('Sobre plataformas probadas de CRM que se eligen según tu caso y presupuesto. El criterio de configuración es tuyo: tu proceso, tus etapas, tu lenguaje.', 'On proven CRM platforms chosen for your case and budget. The configuration criterion is yours: your process, your stages, your language.') },
      { q: B('¿Se conecta con WhatsApp?', 'Does it connect to WhatsApp?'), a: B('Sí: integrado con el asistente inteligente, cada conversación queda registrada en el cliente correcto con su etapa y su historial.', 'Yes: integrated with the AI assistant, every conversation is registered under the right customer with stage and history.') },
      { q: B('¿Mi equipo lo va a usar de verdad?', 'Will my team actually use it?'), a: B('Ese es el riesgo real de todo CRM, y por eso la capacitación y la documentación están incluidas. Lo configuramos con el lenguaje de tu equipo para que registrar sea más fácil que no hacerlo.', 'That is the real risk of any CRM, which is why training and documentation are included. We configure it in your team\'s language so registering is easier than not doing it.') },
      { q: B('¿Qué reportes voy a ver?', 'What reports will I see?'), a: B('Dashboards de ventas y conversión: pipeline por etapa, leads nuevos, tasa de cierre y seguimientos pendientes. Lo que necesitas para decidir, sin pedir informes.', 'Sales and conversion dashboards: pipeline by stage, new leads, close rate and pending follow-ups. What you need to decide, without asking for reports.') },
    ],
    related: [
      { slug: 'automatizaciones', name: B('Automatizaciones', 'Automations'), why: B('Los procesos alrededor del CRM también pueden andar solos.', 'The processes around the CRM can also run on their own.') },
      { slug: 'data-analytics', name: B('Data Analytics & Dashboards', 'Data Analytics & Dashboards'), why: B('Del pipeline a la foto completa del negocio.', 'From pipeline to the full business picture.') },
      { slug: 'whatsapp-business-commerce', name: B('WhatsApp Business Commerce', 'WhatsApp Business Commerce'), why: B('El canal donde tus clientes ya conversan, ordenado y medible.', 'The channel where your customers already talk, organized and measurable.') },
    ],
    next: { slug: 'asistente-inteligente-whatsapp', name: B('Asistente Inteligente 24/7', '24/7 AI Assistant'), why: B('El CRM registra; el asistente atiende. Juntos, ningún lead espera ni se pierde.', 'The CRM registers; the assistant answers. Together, no lead waits or gets lost.') },
    waMessage: B('Hola, vengo de la página del CRM con IA de BIE. Quiero ordenar mi proceso comercial.', 'Hi, I come from the BIE AI CRM page. I want to organize my sales process.'),
    chips: [B('Lead calificado: alto interés', 'Lead scored: high interest'), B('Seguimiento enviado', 'Follow-up sent'), B('Propuesta en etapa final', 'Proposal at final stage')],
  },
  {
    slug: 'automatizaciones',
    code: 'A-17',
    visual: 'os',
    phase: { num: '05', title: B('Automatización e IA', 'Automation & AI'), slug: 'automatizacion' },
    name: B('Automatizaciones de Procesos', 'Process Automations'),
    heads: {
      pain: B('Tu equipo más caro<br><span class="serif">haciendo el trabajo más repetitivo.</span>', 'Your most expensive team<br><span class="serif">doing the most repetitive work.</span>'),
      what: B('Un flujo a la vez,<br><span class="serif">lo repetitivo desaparece.</span>', 'One flow at a time,<br><span class="serif">the repetitive work disappears.</span>'),
      who: B('Para operaciones donde todo<br><span class="serif">pasa por las manos de alguien.</span>', 'For operations where everything<br><span class="serif">passes through someone\'s hands.</span>'),
    },
    seoTitle: B('Automatización de Procesos para Empresas en Ecuador — Make y Zapier | BIE', 'Business Process Automation in Ecuador — Make and Zapier | BIE'),
    seoDescription: B('Automatizamos procesos específicos de tu empresa: facturación, reportes, onboarding de clientes, correos, sincronización de datos y alertas. Cada flujo se entrega probado con datos reales, documentado y con monitoreo de errores.', 'We automate specific processes in your company: invoicing, reports, client onboarding, emails, data sync and alerts. Each flow ships tested with real data, documented and with error monitoring.'),
    keywords: ['automatizacion de procesos empresa', 'make zapier ecuador', 'automatizar facturacion reportes', 'automatizaciones para negocios', 'conectar aplicaciones automatizar'],
    hero: {
      h1: B('Lo que hoy haces a mano, <span class="serif">mañana se hace solo.</span>', 'What you do by hand today <span class="serif">runs on its own tomorrow.</span>'),
      sub: B('Elegimos un proceso repetitivo — facturación, reportes, onboarding, correos, sincronización de datos, alertas — y lo convertimos en un flujo que corre solo, probado con tus datos reales y monitoreado por si algo falla.', 'We pick one repetitive process — invoicing, reports, onboarding, emails, data sync, alerts — and turn it into a flow that runs by itself, tested with your real data and monitored in case something fails.'),
      trust: B('Por flujo: empiezas por el proceso que más te duele · Sin compromiso', 'Per flow: start with the process that hurts most · No commitment'),
    },
    pains: [
      { title: B('Horas quemadas en copiar y pegar', 'Hours burned copying and pasting'), body: B('Pasar datos de un lado a otro, armar el mismo reporte, enviar el mismo correo. Trabajo que no piensa, hecho por gente que sí.', 'Moving data around, building the same report, sending the same email. Work that does not think, done by people who do.') },
      { title: B('Los errores llegan con el cansancio', 'Errors arrive with fatigue'), body: B('El dato mal copiado, la factura que no salió, el cliente sin su correo de bienvenida. Lo manual falla justo cuando más importa.', 'The miscopied number, the invoice that never went out, the client without their welcome email. Manual work fails exactly when it matters.') },
      { title: B('Tus herramientas no se hablan', 'Your tools do not talk to each other'), body: B('El formulario no alimenta la hoja, la venta no dispara la factura, el sistema no avisa cuando algo pasa. Tú eres el conector.', 'The form does not feed the sheet, the sale does not trigger the invoice, the system does not alert you. You are the connector.') },
    ],
    what: B(
      'Es la automatización de un proceso concreto de tu operación, construida sobre plataformas probadas de integración: un disparador (llega un pedido, se llena un formulario, se cumple una fecha) ejecuta las acciones que hoy haces a mano. Cada flujo se entrega probado con tus datos reales, documentado, con monitoreo y alertas de error, y con una guía para resolver problemas. Se contrata por flujo: empiezas por el que más tiempo te roba y sigues según resultados.',
      'It is the automation of one concrete process in your operation, built on proven integration platforms: a trigger (an order arrives, a form is filled, a date is reached) runs the actions you do by hand today. Each flow ships tested with your real data, documented, with error monitoring and alerts, plus a troubleshooting guide. You hire it per flow: start with the one stealing most of your time and continue based on results.'
    ),
    deliverables: [
      B('Flujo automatizado sobre plataforma probada de integración', 'Automated flow on a proven integration platform'),
      B('Pruebas con tus datos reales antes de activar', 'Testing with your real data before going live'),
      B('Monitoreo y alertas ante errores', 'Monitoring and error alerts'),
      B('Documentación del flujo', 'Flow documentation'),
      B('Guía de resolución de problemas', 'Troubleshooting guide'),
    ],
    steps: [
      { title: B('Elegimos el proceso correcto', 'We pick the right process'), body: B('El que más tiempo roba o más errores genera. Uno claro y medible, no diez a medias.', 'The one stealing most time or causing most errors. One clear, measurable flow — not ten half-done.') },
      { title: B('Diseñamos el flujo', 'We design the flow'), body: B('Disparador, pasos, herramientas que conecta y qué pasa cuando algo sale mal. Tú lo apruebas antes de construir.', 'Trigger, steps, tools it connects, and what happens when something goes wrong. You approve before we build.') },
      { title: B('Construimos y probamos con datos reales', 'We build and test with real data'), body: B('Nada se activa sin haber corrido con casos reales de tu operación.', 'Nothing goes live without running on real cases from your operation.') },
      { title: B('Activamos con monitoreo', 'We go live with monitoring'), body: B('El flujo corre solo y avisa si falla. Recibes la documentación y la guía de problemas.', 'The flow runs on its own and alerts on failure. You get the documentation and the troubleshooting guide.') },
    ],
    forWhom: [
      B('Operaciones con tareas diarias repetitivas', 'Operations with repetitive daily tasks'),
      B('Negocios donde los datos se copian entre sistemas', 'Businesses copying data between systems'),
      B('Equipos pequeños que no dan abasto', 'Small teams stretched thin'),
      B('Empresas que ya usan CRM, tienda o facturación digital', 'Companies already using CRM, store or digital invoicing'),
    ],
    faq: [
      { q: B('¿No puedo armar esto yo mismo con IA o tutoriales?', 'Can I not build this myself with AI or tutorials?'), a: B('Un flujo simple, probablemente sí. El costo escondido está en lo demás: probar con datos reales, manejar los errores, monitorear cuando falla a las 3 a.m. y documentarlo para que no dependa de quien lo armó. Nosotros también usamos IA para construir más rápido — la diferencia es que te entregamos un flujo confiable y mantenible, con alguien que responde si se rompe.', 'A simple flow, probably yes. The hidden cost is everything else: testing with real data, handling errors, monitoring 3 a.m. failures and documenting it so it does not depend on whoever built it. We use AI to build faster too — the difference is you get a reliable, maintainable flow, with someone who answers if it breaks.') },
      { q: B('¿Qué procesos se pueden automatizar?', 'What processes can be automated?'), a: B('Los típicos: facturación, reportes periódicos, onboarding de clientes, correos de seguimiento, sincronización entre sistemas y alertas. Si tiene pasos definidos y se repite, es candidato.', 'The usual ones: invoicing, recurring reports, client onboarding, follow-up emails, data sync between systems and alerts. If it has defined steps and repeats, it is a candidate.') },
      { q: B('¿Cuánto voy a ahorrar?', 'How much will I save?'), a: B('Depende del proceso y de tu volumen, y no vamos a inventarte un porcentaje. Lo que sí hacemos: medir cuánto tiempo toma hoy el proceso antes de automatizarlo, para que el ahorro se vea con tus números, no con promesas.', 'It depends on the process and your volume, and we will not invent a percentage. What we do: measure how long the process takes today before automating, so savings show in your numbers, not in promises.') },
      { q: B('¿Qué pasa si el flujo falla?', 'What if the flow fails?'), a: B('Cada flujo se entrega con monitoreo y alertas: si algo falla, se sabe de inmediato, y la guía de problemas indica qué revisar. No es un robot abandonado.', 'Every flow ships with monitoring and alerts: failures are known immediately, and the troubleshooting guide says what to check. It is not an abandoned robot.') },
      { q: B('¿Empiezo con uno o con varios?', 'Do I start with one or several?'), a: B('Con uno: el que más duele. Un flujo funcionando bien vale más que cinco a medias, y te da el criterio para decidir el siguiente.', 'With one: the most painful. One flow running well beats five half-done, and gives you the judgment to pick the next.') },
    ],
    related: [
      { slug: 'asistente-inteligente-whatsapp', name: B('Asistente Inteligente 24/7', '24/7 AI Assistant'), why: B('La conversación también puede disparar flujos: pedido, registro, alerta.', 'Conversations can trigger flows too: order, registration, alert.') },
      { slug: 'crm-ia', name: B('CRM con IA', 'AI-Powered CRM'), why: B('El CRM es el mejor origen y destino de tus automatizaciones.', 'The CRM is the best source and destination for your automations.') },
      { slug: 'whatsapp-business-commerce', name: B('WhatsApp Business Commerce', 'WhatsApp Business Commerce'), why: B('Pedidos por WhatsApp que se registran y facturan solos.', 'WhatsApp orders that register and invoice themselves.') },
    ],
    next: { slug: 'data-analytics', name: B('Data Analytics & Dashboards', 'Data Analytics & Dashboards'), why: B('Con los procesos corriendo solos, el siguiente paso es ver todos sus datos en un tablero.', 'With processes running on their own, the next step is seeing all their data on one board.') },
    waMessage: B('Hola, vengo de la página de Automatizaciones de BIE. Tengo un proceso repetitivo que quiero automatizar.', 'Hi, I come from the BIE Automations page. I have a repetitive process I want to automate.'),
    chips: [B('Factura generada', 'Invoice generated'), B('Reporte enviado 07:00', 'Report sent 07:00'), B('Datos sincronizados', 'Data synced')],
  },
  {
    slug: 'whatsapp-business-commerce',
    code: 'A-28',
    visual: 'chat',
    phase: { num: '05', title: B('Automatización e IA', 'Automation & AI'), slug: 'automatizacion' },
    name: B('WhatsApp Business Commerce', 'WhatsApp Business Commerce'),
    heads: {
      pain: B('Tus clientes ya están en WhatsApp.<br><span class="serif">Tu negocio, a medias.</span>', 'Your customers are already on WhatsApp.<br><span class="serif">Your business, halfway there.</span>'),
      what: B('WhatsApp ordenado<br><span class="serif">como canal de ventas.</span>', 'WhatsApp organized<br><span class="serif">as a sales channel.</span>'),
      who: B('Para negocios que ya venden<br><span class="serif">conversando.</span>', 'For businesses that already sell<br><span class="serif">by chatting.</span>'),
    },
    seoTitle: B('WhatsApp Business para Ventas en Ecuador — Catálogo y Automatización | BIE', 'WhatsApp Business for Sales in Ecuador — Catalog and Automation | BIE'),
    seoDescription: B('Convertimos tu WhatsApp Business en un canal de ventas ordenado: catálogo con fotos y precios, mensajes automáticos, etiquetas, listas de difusión, plantillas por etapa de venta y protocolo de atención. Con reporte mensual.', 'We turn your WhatsApp Business into an organized sales channel: catalog with photos and prices, automatic messages, labels, broadcast lists, stage-based templates and a service protocol. Monthly report included.'),
    keywords: ['whatsapp business para ventas', 'catalogo whatsapp business', 'vender por whatsapp ecuador', 'mensajes automaticos whatsapp negocio', 'listas de difusion whatsapp'],
    hero: {
      h1: B('Convierte tu WhatsApp en <span class="serif">tu mejor canal de ventas.</span>', 'Turn your WhatsApp into <span class="serif">your best sales channel.</span>'),
      sub: B('Catálogo con fotos y precios dentro del chat, mensajes automáticos de bienvenida y ausencia, conversaciones etiquetadas por etapa, listas de difusión y un protocolo claro de atención. Orden donde hoy hay caos.', 'A catalog with photos and prices inside the chat, automatic welcome and away messages, conversations labeled by stage, broadcast lists and a clear service protocol. Order where today there is chaos.'),
      trust: B('Operando en negocios reales de Ecuador · Sin compromiso', 'Running in real businesses in Ecuador · No commitment'),
    },
    pains: [
      { title: B('Cada venta exige reenviar las mismas fotos', 'Every sale means resending the same photos'), body: B('El catálogo vive en tu galería y en tu memoria. Cada "¿qué tienes?" cuesta minutos que se multiplican por cada cliente.', 'The catalog lives in your gallery and your memory. Every "what do you have?" costs minutes multiplied by every customer.') },
      { title: B('Las conversaciones se entierran', 'Conversations get buried'), body: B('El que dijo "lo pienso" hace tres días quedó veinte chats abajo. Sin etiquetas ni etapas, el seguimiento es arqueología.', 'The one who said "let me think" three days ago is twenty chats down. Without labels or stages, follow-up is archaeology.') },
      { title: B('Fuera de horario, el negocio no existe', 'After hours, the business does not exist'), body: B('Quien escribe a las 10 de la noche no recibe ni un "te contestamos mañana". Silencio donde debía haber una primera respuesta.', 'Whoever writes at 10 pm does not even get a "we reply tomorrow". Silence where a first answer should be.') },
    ],
    what: B(
      'Es tu WhatsApp Business montado en serio como canal comercial: el perfil del negocio completo, el catálogo con fotos y precios navegable dentro del chat, mensajes automáticos de bienvenida, ausencia y preguntas frecuentes, etiquetas para saber en qué etapa está cada conversación, listas de difusión para anunciar sin hacer spam, plantillas de mensajes por etapa de venta y un protocolo de atención para que cualquiera de tu equipo atienda con el mismo estándar. Incluye un reporte mensual del canal.',
      'It is your WhatsApp Business properly set up as a commercial channel: complete business profile, a catalog with photos and prices browsable inside the chat, automatic welcome, away and FAQ messages, labels to know the stage of every conversation, broadcast lists to announce without spamming, stage-based message templates and a service protocol so anyone on your team serves with the same standard. Includes a monthly channel report.'
    ),
    deliverables: [
      B('WhatsApp Business configurado y verificado', 'WhatsApp Business configured and verified'),
      B('Catálogo con fotos y precios dentro del chat', 'Catalog with photos and prices inside the chat'),
      B('Mensajes automáticos: bienvenida, ausencia y preguntas frecuentes', 'Automatic messages: welcome, away and FAQ'),
      B('Etiquetas de conversación por etapa de venta', 'Conversation labels by sales stage'),
      B('Listas de difusión configuradas (hasta 5)', 'Broadcast lists configured (up to 5)'),
      B('Plantillas de mensaje por etapa de venta', 'Message templates per sales stage'),
      B('Protocolo de atención para tu equipo', 'Service protocol for your team'),
      B('Reporte mensual del canal', 'Monthly channel report'),
    ],
    steps: [
      { title: B('Auditamos tu WhatsApp actual', 'We audit your current WhatsApp'), body: B('Qué preguntan, qué compran, dónde se pierden las ventas hoy. De ahí sale la configuración.', 'What people ask, what they buy, where sales get lost today. The setup comes from that.') },
      { title: B('Montamos catálogo y automáticos', 'We set up catalog and auto-messages'), body: B('Productos con fotos y precios, bienvenida, ausencia y respuestas frecuentes con tu tono.', 'Products with photos and prices; welcome, away and FAQ replies in your tone.') },
      { title: B('Ordenamos la operación', 'We organize the operation'), body: B('Etiquetas por etapa, listas de difusión y plantillas: cada conversación tiene lugar y siguiente paso.', 'Stage labels, broadcast lists and templates: every conversation has a place and a next step.') },
      { title: B('Entregamos protocolo y medimos', 'We deliver the protocol and measure'), body: B('Tu equipo atiende con un estándar y cada mes ves el reporte del canal.', 'Your team serves to a standard and every month you see the channel report.') },
    ],
    forWhom: [
      B('Tiendas y marcas que cierran ventas por chat', 'Stores and brands closing sales by chat'),
      B('Negocios con catálogo de productos o servicios', 'Businesses with a product or service catalog'),
      B('Equipos donde varias personas atienden el mismo número', 'Teams where several people handle one number'),
      B('Quien anuncia promociones a su base de clientes', 'Anyone announcing promotions to their customer base'),
    ],
    faq: [
      { q: B('¿No puedo configurar WhatsApp Business yo mismo?', 'Can I not set up WhatsApp Business myself?'), a: B('La aplicación es gratuita y puedes empezar solo. El valor no está en instalarla: está en el criterio comercial — qué automatizar, cómo etiquetar, qué decir en cada etapa y cómo anunciar sin quemar tu base. Te entregamos el canal ordenado, con protocolo y medición, en vez de un experimento a medias.', 'The app is free and you can start alone. The value is not installing it: it is the commercial judgment — what to automate, how to label, what to say at each stage and how to announce without burning your base. You get an organized channel with protocol and measurement, instead of a half-finished experiment.') },
      { q: B('¿Esto es lo mismo que el Asistente Inteligente?', 'Is this the same as the AI Assistant?'), a: B('No. Este producto ordena WhatsApp Business con sus herramientas nativas: catálogo, automáticos, etiquetas. El Asistente añade inteligencia artificial que conversa, cotiza y agenda. Se complementan: muchos clientes empiezan aquí y suben al asistente.', 'No. This product organizes WhatsApp Business with its native tools: catalog, auto-messages, labels. The Assistant adds AI that converses, quotes and books. They complement each other: many clients start here and upgrade to the assistant.') },
      { q: B('¿Las listas de difusión no son spam?', 'Are broadcast lists not spam?'), a: B('Mal usadas, sí. Por eso se configuran con segmentación y frecuencia definidas en el protocolo: anuncios que tu cliente quiere recibir, no ruido que lo hace bloquearte.', 'Misused, yes. That is why they are configured with segmentation and frequency defined in the protocol: announcements your customer wants, not noise that gets you blocked.') },
      { q: B('¿Sigo usando mi número de siempre?', 'Do I keep my usual number?'), a: B('Sí. Se trabaja sobre tu WhatsApp Business y tu número actual; tu historial no se pierde.', 'Yes. We work on your WhatsApp Business and your current number; your history is not lost.') },
      { q: B('¿Qué trae el reporte mensual?', 'What is in the monthly report?'), a: B('El estado del canal: conversaciones nuevas, etapas, respuesta de las difusiones y recomendaciones para el mes siguiente.', 'The channel status: new conversations, stages, broadcast response and recommendations for the next month.') },
    ],
    demo: [
      { from: 'client', text: B('Hola! Vi el anuncio, ¿tienen catálogo?', 'Hi! I saw the ad — do you have a catalog?') },
      { from: 'bot', text: B('¡Bienvenida! Sí — aquí puedes verlo con fotos y precios, sin salir del chat. ¿Buscas algo en especial?', 'Welcome! Yes — you can browse it here with photos and prices, without leaving the chat. Looking for anything special?') },
      { from: 'client', text: B('Me interesa el combo 2. ¿Hacen envíos a Samborondón?', 'I like combo 2. Do you deliver to Samborondón?') },
      { from: 'bot', text: B('Sí, llegamos hoy mismo. Te dejo el pedido listo: Combo 2 + envío. ¿Confirmas para etiquetarlo como pedido en curso?', 'Yes, delivery today. Your order is ready: Combo 2 + shipping. Confirm so I label it as an active order?') },
      { from: 'client', text: B('Confirmado ✅', 'Confirmed ✅') },
      { from: 'bot', text: B('¡Listo! Pedido registrado y etiquetado. Te avisamos cuando salga el repartidor.', 'Done! Order registered and labeled. We will message you when the courier leaves.') },
    ],
    related: [
      { slug: 'asistente-inteligente-whatsapp', name: B('Asistente Inteligente 24/7', '24/7 AI Assistant'), why: B('El siguiente nivel: IA que conversa, cotiza y agenda por ti.', 'The next level: AI that converses, quotes and books for you.') },
      { slug: 'crm-ia', name: B('CRM con IA', 'AI-Powered CRM'), why: B('Cada conversación registrada en su cliente, con etapa e historial.', 'Every conversation registered under its customer, with stage and history.') },
      { slug: 'automatizaciones', name: B('Automatizaciones', 'Automations'), why: B('Del pedido confirmado a la factura y el registro, sin manos.', 'From confirmed order to invoice and record, hands-free.') },
    ],
    next: { slug: 'asistente-inteligente-whatsapp', name: B('Asistente Inteligente 24/7', '24/7 AI Assistant'), why: B('Con el canal ordenado, el paso natural es que la IA lo atienda a cualquier hora.', 'With the channel organized, the natural step is AI serving it at any hour.') },
    waMessage: B('Hola, vengo de la página de WhatsApp Business Commerce de BIE. Quiero ordenar mi WhatsApp como canal de ventas.', 'Hi, I come from the BIE WhatsApp Business Commerce page. I want my WhatsApp organized as a sales channel.'),
    chips: [B('Pedido etiquetado', 'Order labeled'), B('Difusión enviada a 180', 'Broadcast sent to 180'), B('Catálogo compartido', 'Catalog shared')],
    usedBy: [
      { name: 'Luway', note: B('Moda en vivo · Pedidos por WhatsApp', 'Live fashion · WhatsApp orders') },
    ],
  },
  {
    slug: 'data-analytics',
    code: 'A-29',
    visual: 'os',
    phase: { num: '05', title: B('Automatización e IA', 'Automation & AI'), slug: 'automatizacion' },
    name: B('Data Analytics & Dashboards', 'Data Analytics & Dashboards'),
    heads: {
      pain: B('Diriges tu empresa<br><span class="serif">con el retrovisor.</span>', 'You steer your company<br><span class="serif">looking in the mirror.</span>'),
      what: B('Tus números, en vivo,<br><span class="serif">en un solo tablero.</span>', 'Your numbers, live,<br><span class="serif">on one board.</span>'),
      who: B('Para dueños que deciden<br><span class="serif">y no quieren adivinar.</span>', 'For owners who decide<br><span class="serif">and refuse to guess.</span>'),
    },
    seoTitle: B('Dashboards y Análisis de Datos para Empresas en Ecuador | BIE', 'Business Dashboards and Data Analytics in Ecuador | BIE'),
    seoDescription: B('Dashboard ejecutivo con tus KPIs en tiempo real: ventas, marketing, operaciones y finanzas conectados en un solo tablero, con alertas automáticas, capacitación de tu equipo y reporte mensual con hallazgos.', 'Executive dashboard with your KPIs in real time: sales, marketing, operations and finance connected on one board, with automatic alerts, team training and a monthly insights report.'),
    keywords: ['dashboard empresarial ecuador', 'kpis en tiempo real', 'business intelligence pymes', 'tablero de control ventas', 'analisis de datos empresa'],
    hero: {
      h1: B('Deja de adivinar: <span class="serif">mira tu negocio en vivo.</span>', 'Stop guessing: <span class="serif">watch your business live.</span>'),
      sub: B('Un dashboard ejecutivo que conecta tus fuentes de datos — ventas, marketing, operaciones, finanzas — y te muestra los indicadores que importan, con alertas cuando algo se sale de rango.', 'An executive dashboard that connects your data sources — sales, marketing, operations, finance — and shows the indicators that matter, with alerts when something drifts out of range.'),
      trust: B('Producto clave de la visión Data Intelligence de BIE · Sin compromiso', 'A key product of BIE\'s Data Intelligence vision · No commitment'),
    },
    pains: [
      { title: B('Los números llegan tarde', 'The numbers arrive late'), body: B('Te enteras de que el mes fue malo cuando ya terminó. Con datos en vivo habrías corregido a tiempo.', 'You learn the month went badly once it is over. With live data you would have corrected in time.') },
      { title: B('Cada dato vive en un sistema distinto', 'Every metric lives in a different system'), body: B('Ventas en un lado, pauta en otro, gastos en la hoja del contador. Armar la foto completa toma días — y ya salió vieja.', 'Sales here, ads there, expenses in the accountant\'s sheet. Building the full picture takes days — and it is already stale.') },
      { title: B('Los reportes dependen de que alguien los arme', 'Reports depend on someone building them'), body: B('Si esa persona no está, no hay reporte. Y cada versión sale distinta según quién la hizo.', 'If that person is away, there is no report. And every version differs by author.') },
    ],
    what: B(
      'Es tu tablero de mando: conectamos tus fuentes de datos reales — sistema de ventas, publicidad, operaciones, finanzas — a un dashboard ejecutivo que se actualiza solo. Definimos contigo los indicadores que de verdad mueven tu negocio, configuramos alertas automáticas para los que no pueden esperar al lunes, capacitamos a tu equipo para leerlo y usarlo, y cada mes recibes un reporte con los hallazgos y qué hacer con ellos.',
      'It is your command board: we connect your real data sources — sales system, advertising, operations, finance — to an executive dashboard that updates itself. Together we define the indicators that truly move your business, set automatic alerts for the ones that cannot wait until Monday, train your team to read and use it, and every month you get a report with findings and what to do about them.'
    ),
    deliverables: [
      B('Dashboard ejecutivo configurado', 'Executive dashboard configured'),
      B('Integración de tus fuentes de datos', 'Integration of your data sources'),
      B('Métricas de ventas, marketing y operación definidas contigo', 'Sales, marketing and operations metrics defined with you'),
      B('Alertas automáticas por umbral', 'Automatic threshold alerts'),
      B('Capacitación de tu equipo', 'Team training'),
      B('Reporte mensual con hallazgos', 'Monthly insights report'),
    ],
    steps: [
      { title: B('Definimos qué importa medir', 'We define what matters'), body: B('Pocos indicadores que muevan decisiones, no cincuenta gráficos de adorno.', 'A few indicators that drive decisions, not fifty decorative charts.') },
      { title: B('Conectamos tus fuentes', 'We connect your sources'), body: B('Ventas, pauta, operación, finanzas: cada dato entra solo, sin que nadie lo copie.', 'Sales, ads, operations, finance: every metric flows in on its own, with nobody copying it.') },
      { title: B('Construimos el tablero y las alertas', 'We build the board and the alerts'), body: B('El dashboard ejecutivo y los avisos automáticos cuando algo se sale de rango.', 'The executive dashboard plus automatic alerts when something drifts out of range.') },
      { title: B('Capacitamos y acompañamos', 'We train and accompany'), body: B('Tu equipo lo lee y lo usa; cada mes, reporte con hallazgos y recomendaciones.', 'Your team reads it and uses it; every month, a report with findings and recommendations.') },
    ],
    forWhom: [
      B('Dueños que deciden con datos, no con sensaciones', 'Owners deciding on data, not gut feel'),
      B('Empresas con ventas en varios canales', 'Companies selling across several channels'),
      B('Negocios que invierten en publicidad y quieren ver el retorno', 'Businesses buying ads and wanting to see the return'),
      B('Equipos cansados de armar reportes a mano', 'Teams tired of hand-built reports'),
    ],
    faq: [
      { q: B('¿No puedo pedirle esto a una IA o hacerlo en una hoja de cálculo?', 'Can I not ask an AI or do this in a spreadsheet?'), a: B('Puedes armar gráficos, sí. Lo difícil es lo invisible: conectar las fuentes para que el dato entre solo todos los días, mantener la conexión cuando algo cambia, y elegir los indicadores correctos para tu modelo de negocio. Nosotros también usamos IA en el análisis — sobre datos que fluyen solos y con criterio de negocio. Recibes un tablero vivo, no otra tarea manual.', 'You can build charts, yes. The hard part is invisible: connecting sources so data flows in daily on its own, maintaining connections when things change, and choosing the right indicators for your business model. We use AI in the analysis too — on self-flowing data, with business judgment. You get a living board, not another manual chore.') },
      { q: B('¿Qué fuentes de datos se pueden conectar?', 'What data sources can be connected?'), a: B('Las que tu operación ya usa: sistema de ventas o facturación, publicidad, hojas de cálculo, CRM, tienda. En la primera conversación revisamos tu caso concreto.', 'The ones your operation already uses: sales or invoicing system, ads, spreadsheets, CRM, store. We review your specific case in the first conversation.') },
      { q: B('¿Esto incluye predicciones con IA?', 'Does this include AI predictions?'), a: B('El producto base es visibilidad real: KPIs en vivo, alertas y hallazgos mensuales. Si tu caso amerita análisis más avanzado, se conversa como paso siguiente — no te vendemos "IA predictiva" como adorno.', 'The base product is real visibility: live KPIs, alerts and monthly findings. If your case warrants more advanced analysis, that is a next-step conversation — we do not sell "predictive AI" as decoration.') },
      { q: B('¿Quién mantiene el tablero?', 'Who maintains the board?'), a: B('Nosotros, dentro del servicio mensual: conexiones funcionando, alertas afinadas y el reporte con hallazgos cada mes.', 'We do, within the monthly service: connections running, alerts tuned and the monthly insights report.') },
      { q: B('¿Mis datos están seguros?', 'Is my data safe?'), a: B('Se conectan con accesos de solo lectura siempre que la fuente lo permite, y los accesos son tuyos: si dejamos de trabajar juntos, los revocas y listo.', 'Sources are connected read-only whenever possible, and the credentials are yours: if we stop working together, you revoke them and that is it.') },
    ],
    related: [
      { slug: 'crm-ia', name: B('CRM con IA', 'AI-Powered CRM'), why: B('El pipeline comercial es la primera fuente que vale la pena mirar en vivo.', 'The sales pipeline is the first source worth watching live.') },
      { slug: 'automatizaciones', name: B('Automatizaciones', 'Automations'), why: B('Los datos fluyen solos cuando los procesos corren solos.', 'Data flows on its own when processes run on their own.') },
      { slug: 'whatsapp-business-commerce', name: B('WhatsApp Business Commerce', 'WhatsApp Business Commerce'), why: B('Tu canal de ventas por chat también merece estar en el tablero.', 'Your chat sales channel deserves a place on the board too.') },
    ],
    next: { slug: 'sistema-operativo', name: B('Sistema Operativo de tu Empresa', 'Your Company Operating System'), why: B('Cuando ves todo, el siguiente paso es operar todo desde un solo lugar.', 'Once you can see everything, the next step is running everything from one place.') },
    waMessage: B('Hola, vengo de la página de Data Analytics de BIE. Quiero ver los números de mi empresa en un tablero.', 'Hi, I come from the BIE Data Analytics page. I want my company numbers on one board.'),
    chips: [B('Ventas del día: al minuto', 'Today\'s sales: to the minute'), B('Alerta: inventario bajo', 'Alert: low stock'), B('Reporte mensual listo', 'Monthly report ready')],
  },
  {
    slug: 'identidad-de-marca',
    code: 'A-07',
    visual: 'brand',
    phase: { num: '03', title: B('Identidad y Sonido', 'Identity & Sound'), slug: 'identidad' },
    name: B('Identidad de Marca', 'Brand Identity'),
    heads: {
      pain: B('Si tu marca no dice nada,<br><span class="serif">tu precio lo dice todo.</span>', 'If your brand says nothing,<br><span class="serif">your price says everything.</span>'),
      what: B('Un sistema de marca completo,<br><span class="serif">no solo un logo.</span>', 'A complete brand system,<br><span class="serif">not just a logo.</span>'),
      who: B('Para empresas que compiten<br><span class="serif">por valor, no por precio.</span>', 'For companies competing<br><span class="serif">on value, not price.</span>'),
    },
    seoTitle: B('Diseño de Identidad de Marca y Logotipos en Ecuador — Manual de Marca | BIE', 'Brand Identity and Logo Design in Ecuador — Brand Manual | BIE'),
    seoDescription: B('Identidad visual y verbal completa para tu empresa: logotipo profesional con variantes, paleta de colores, sistema tipográfico, aplicaciones, manual de marca de 20-30 páginas, guía de voz y tono, y archivos fuente. Diseñada en Ecuador.', 'Complete visual and verbal identity for your company: professional logo with variants, color palette, typography system, applications, a 20-30 page brand manual, voice and tone guide, and source files. Designed in Ecuador.'),
    keywords: ['diseño de logotipo profesional ecuador', 'identidad de marca empresa', 'manual de marca', 'branding para pymes', 'crear marca para negocio'],
    hero: {
      h1: B('La marca que te hace <span class="serif">reconocible y elegible.</span>', 'The brand that makes you <span class="serif">recognizable and choosable.</span>'),
      sub: B('Identidad visual y verbal completa: logotipo con variantes, colores, tipografías, elementos gráficos, aplicaciones listas para usar y un manual que garantiza que tu marca se vea igual de bien en todas partes — la base sobre la que se construye todo lo demás.', 'Complete visual and verbal identity: logo with variants, colors, typography, graphic elements, ready-to-use applications and a manual that keeps your brand looking right everywhere — the base everything else is built on.'),
      trust: B('Marcas creadas para empresas reales de Ecuador · Sin compromiso', 'Brands created for real companies in Ecuador · No commitment'),
    },
    pains: [
      { title: B('Antes de leerte, ya te juzgaron', 'They judged you before reading you'), body: B('La decisión empieza en cómo te ves. Un logo improvisado comunica un negocio improvisado, aunque tu trabajo sea excelente.', 'The decision starts with how you look. An improvised logo signals an improvised business, even if your work is excellent.') },
      { title: B('Cada pieza tuya parece de una empresa distinta', 'Every piece looks like a different company'), body: B('Un color hoy, otra letra mañana. Sin sistema, cada publicación erosiona el reconocimiento en lugar de construirlo.', 'One color today, another font tomorrow. Without a system, every post erodes recognition instead of building it.') },
      { title: B('Compites por precio porque no hay más argumento', 'You compete on price because there is no other argument'), body: B('Una marca coherente sostiene un precio superior sin explicaciones. Sin ella, el descuento es tu única herramienta.', 'A coherent brand supports a higher price with no explanations. Without it, the discount is your only tool.') },
    ],
    what: B(
      'Es la identidad completa de tu empresa, construida en serio: exploramos tres conceptos de logotipo y desarrollamos el elegido con todas sus variantes; definimos la paleta de colores con sus códigos para pantalla e imprenta, el sistema tipográfico y los elementos gráficos que hacen tuyas todas las piezas. Lo aplicamos a lo inmediato — tarjeta, membrete, firma de correo, avatares — y lo documentamos en un manual de marca con guía de voz y tono. Te llevas también los archivos fuente: la marca es tuya, completa.',
      'It is your company\'s complete identity, built properly: we explore three logo concepts and develop the chosen one with all its variants; we define the color palette with screen and print codes, the typography system and the graphic elements that make every piece unmistakably yours. We apply it to the immediate needs — business card, letterhead, email signature, avatars — and document it in a brand manual with a voice and tone guide. You also get the source files: the brand is fully yours.'
    ),
    deliverables: [
      B('Logotipo profesional: 3 conceptos y desarrollo con variantes', 'Professional logo: 3 concepts and development with variants'),
      B('Paleta de colores con códigos HEX, RGB y CMYK', 'Color palette with HEX, RGB and CMYK codes'),
      B('Sistema tipográfico (2 familias)', 'Typography system (2 families)'),
      B('Elementos gráficos y patrones propios', 'Own graphic elements and patterns'),
      B('Aplicaciones: tarjeta, membrete, firma de correo, avatar', 'Applications: card, letterhead, email signature, avatar'),
      B('Manual de marca (PDF de 20-30 páginas)', 'Brand manual (20-30 page PDF)'),
      B('Guía de voz y tono', 'Voice and tone guide'),
      B('Archivos fuente (AI, SVG, PNG)', 'Source files (AI, SVG, PNG)'),
    ],
    steps: [
      { title: B('Descubrimos tu esencia', 'We discover your essence'), body: B('Qué haces, para quién y qué debe sentir quien te encuentra. La marca sale de tu negocio, no de una tendencia.', 'What you do, for whom, and what people should feel when they find you. The brand comes from your business, not a trend.') },
      { title: B('Exploramos tres caminos', 'We explore three directions'), body: B('Tres conceptos de logotipo distintos, con argumento. Eliges con opciones reales delante, no a ciegas.', 'Three distinct logo concepts, each argued. You choose with real options in front of you, not blind.') },
      { title: B('Construimos el sistema completo', 'We build the full system'), body: B('El concepto elegido se convierte en sistema: variantes, colores, tipografías, elementos y aplicaciones.', 'The chosen concept becomes a system: variants, colors, typography, elements and applications.') },
      { title: B('Documentamos y entregamos todo', 'We document and hand over everything'), body: B('Manual, guía de voz y archivos fuente. Cualquier diseñador o imprenta puede usar tu marca bien desde el día uno.', 'Manual, voice guide and source files. Any designer or printer can use your brand correctly from day one.') },
    ],
    forWhom: [
      B('Empresas nuevas que quieren nacer bien', 'New companies that want to be born right'),
      B('Negocios en marcha con marca improvisada', 'Running businesses with an improvised brand'),
      B('Marcas que van a invertir en web y publicidad', 'Brands about to invest in web and advertising'),
      B('Emprendimientos que quieren dejar de verse pequeños', 'Ventures that want to stop looking small'),
    ],
    faq: [
      { q: B('¿No puedo generar mi logo con inteligencia artificial?', 'Can I not generate my logo with AI?'), a: B('Puedes generar imágenes de logo, sí. Pero una marca no es una imagen: es un sistema — variantes que funcionan en grande y en pequeño, colores reproducibles en imprenta, tipografías con licencia, aplicaciones y un manual que mantiene todo coherente. Nosotros usamos IA en la exploración, con dirección de diseño y criterio comercial. Te llevas una marca registrable, aplicable y tuya — con archivos fuente, no un PNG suelto.', 'You can generate logo images, yes. But a brand is not an image: it is a system — variants that work large and small, print-reproducible colors, licensed typography, applications and a manual keeping it all coherent. We use AI in exploration, with design direction and commercial judgment. You get a registrable, usable brand that is yours — with source files, not a loose PNG.') },
      { q: B('¿Cuántas propuestas de logo veo?', 'How many logo proposals do I see?'), a: B('Tres conceptos distintos, cada uno con su argumento. El elegido se desarrolla completo con todas sus variantes.', 'Three distinct concepts, each with its rationale. The chosen one is fully developed with all its variants.') },
      { q: B('¿Qué pasa si ya tengo logo y solo quiero ordenarlo?', 'What if I already have a logo and just want order?'), a: B('Se evalúa en la primera conversación: a veces el logo se conserva y se construye el sistema alrededor; a veces conviene evolucionarlo. Te lo diremos con honestidad.', 'We assess it in the first conversation: sometimes the logo stays and the system is built around it; sometimes it should evolve. We will tell you honestly.') },
      { q: B('¿La marca queda registrada legalmente?', 'Does the brand get legally registered?'), a: B('El diseño queda listo para registro. El trámite ante la autoridad de propiedad intelectual es un producto aparte de nuestra fase de Administración, y te acompañamos en él.', 'The design is left registration-ready. The filing with the IP authority is a separate product in our Administration phase, and we walk you through it.') },
      { q: B('¿Y después de la marca, qué sigue?', 'After the brand, what comes next?'), a: B('La marca es la base de la cadena: sobre ella se construyen la página web, el contenido y la publicidad. Todo lo que hagas después se ve mejor y rinde más porque hay sistema.', 'The brand is the base of the chain: the website, content and advertising are built on it. Everything you do afterwards looks better and performs better because there is a system.') },
    ],
    related: [
      { slug: 'pagina-web', name: B('Página Web', 'Website'), why: B('El primer lugar donde tu nueva identidad trabaja a diario.', 'The first place your new identity works daily.') },
      { slug: 'estrategia-de-contenidos', name: B('Estrategia de Contenidos', 'Content Strategy'), why: B('Una marca coherente necesita un plan de qué decir y dónde.', 'A coherent brand needs a plan for what to say and where.') },
      { slug: 'gestion-redes-sociales', name: B('Gestión de Redes Sociales', 'Social Media Management'), why: B('Tu identidad aplicada cada semana, sin diluirse.', 'Your identity applied every week, without diluting.') },
    ],
    next: { slug: 'pagina-web', name: B('Página Web', 'Website'), why: B('Con la identidad definida, el paso natural es el terreno digital donde vive: tu web.', 'With the identity defined, the natural step is the digital ground where it lives: your website.') },
    waMessage: B('Hola, vengo de la página de Identidad de Marca de BIE. Quiero construir la marca de mi empresa.', 'Hi, I come from the BIE Brand Identity page. I want to build my company\'s brand.'),
    chips: [B('3 conceptos listos', '3 concepts ready'), B('Manual de marca entregado', 'Brand manual delivered'), B('Aplicaciones aprobadas', 'Applications approved')],
    usedBy: [
      { name: 'Tasting Ecuador', note: B('Marca creada desde cero · Cuenca', 'Brand built from scratch · Cuenca') },
      { name: 'Villa Tres', note: B('Marca y contenido · Guayaquil', 'Brand and content · Guayaquil') },
    ],
  },
];
