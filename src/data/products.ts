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
];
