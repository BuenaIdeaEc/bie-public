// BIE-P06 — Fichas de producto para páginas individuales con SEO propio.
// Cada producto es bilingüe (es/en). Sin precios: los valores se conversan por WhatsApp.
// Regla: una página por producto, interconectadas por `related` y `next`.

export type Bi = { es: string; en: string };

export interface ProductPage {
  slug: string;                 // URL: /productos/<slug>/
  visual: 'chat' | 'web' | 'os' | 'brand' | 'ads' | 'cube';   // gráfico 3D del hero según el producto
  phase: { num: string; title: Bi; slug: string };
  name: Bi;                     // nombre comercial (sin código)
  seoTitle: Bi;                 // <title>
  seoDescription: Bi;           // meta description
  keywords: string[];           // referencia interna para SEO (no se imprime)
  hero: { h1: Bi; sub: Bi; trust: Bi };
  pains: { title: Bi; body: Bi }[];
  what: Bi;                     // qué es, en lenguaje del cliente
  deliverables: Bi[];           // lo que recibes
  steps: { title: Bi; body: Bi }[];
  demo: { from: 'client' | 'bot'; text: Bi }[];   // conversación simulada
  forWhom: Bi[];
  faq: { q: Bi; a: Bi }[];
  related: { slug: string; name: Bi; why: Bi }[];   // se potencia con
  next: { slug: string; name: Bi; why: Bi };        // siguiente paso en la cadena
  waMessage: Bi;                // mensaje pre-armado de WhatsApp
  chips?: Bi[];                 // notificaciones flotantes del visual (máx 3)
}

const B = (es: string, en: string): Bi => ({ es, en });

export const PRODUCTS: ProductPage[] = [
  {
    slug: 'asistente-inteligente-whatsapp',
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
    waMessage: B(
      'Hola, vengo de la página del Asistente Inteligente 24/7 de BIE. Quiero saber cómo funcionaría en mi empresa.',
      'Hi, I come from the BIE 24/7 AI Assistant page. I want to know how it would work in my company.'
    ),
  },
];
