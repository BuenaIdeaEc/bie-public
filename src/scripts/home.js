// Alto estable de pantalla. innerHeight cambia al subir en el teléfono, cuando el navegador muestra su barra.
let __lvh = 0, __lvhW = 0;
const LVH = () => { if (!__lvh || __lvhW !== innerWidth) { __lvhW = innerWidth; __lvh = document.getElementById('lvh').offsetHeight || innerHeight; } return __lvh; };
// RAF híbrido (fallback a setTimeout cuando el entorno congela requestAnimationFrame)
function RAF(cb){
  let called = false;
  const wrap = t => { if (called) return; called = true; cb(t); };
  requestAnimationFrame(wrap);
  setTimeout(() => wrap(performance.now()), 28);
}

// ═══ i18n ═══
let lang = 'es';
const WA_NUM = '593988253030';

const UI = Object.assign({}, window.__UI, {
  m_buy_wa:{es:n=>`Hola, quiero contratar "${n}" para mi empresa. ¿Cómo empezamos?`,en:n=>`Hi, I want to hire "${n}" for my company. How do we start?`},
  m_diag_wa:{es:n=>`Hola, quiero mi diagnóstico gratuito de 30 minutos. Me interesa "${n}".`,en:n=>`Hi, I want my free 30-minute diagnosis. I am interested in "${n}".`},
  m_wa:{es:n=>`Hola, vengo de la página web de BIE. Me interesa "${n}" y quiero saber más.`,
        en:n=>`Hi, I come from the BIE website. I'm interested in "${n}" and want to know more.`},
});

const HERO_KICKER = { es:'Ya es demasiado, lo sabemos.', en:'It is already too much, we know.' };

const NEED_OPTS = {
  es:['elegir qué necesito','entender mi mercado y competencia','construir mi marca e identidad','una página web o tienda en línea','automatizar la atención y las ventas','crecer con publicidad digital','ordenar lo legal y administrativo','ayuda para saber por dónde empezar'],
  en:['to pick what I need','to understand my market and competitors','to build my brand and identity','a website or online store','to automate service and sales','to grow with digital advertising','to get legal and admin in order','help to know where to start'],
};
const FORM_WA = {
  es:(n,c,ne,m)=>{let s=`Hola, vengo de la página web de BIE y quiero cotizar.\n\nNombre: ${n}`;if(c)s+=`\nEmpresa: ${c}`;if(ne)s+=`\nNecesito: ${ne}`;if(m)s+=`\n\nSobre mi empresa:\n${m}`;return s},
  en:(n,c,ne,m)=>{let s=`Hi, I come from the BIE website and I want a quote.\n\nName: ${n}`;if(c)s+=`\nCompany: ${c}`;if(ne)s+=`\nI need: ${ne}`;if(m)s+=`\n\nAbout my company:\n${m}`;return s},
};
const WAW_OPTS = [
  { t:{es:'Voy a abrir un negocio o empresa',en:'I am opening a business'},
    m:{es:'Hola, voy a abrir un negocio o empresa y quiero saber cómo empezar bien desde el inicio.',en:'Hi, I am opening a business and want to know how to start right from day one.'} },
  { t:{es:'Ya sé lo que necesito',en:'I know what I need'},
    m:{es:'Hola, ya sé lo que mi empresa necesita. Quiero hablar de un producto en específico.',en:'Hi, I already know what my company needs. I want to talk about a specific product.'} },
  { t:{es:'Me gustaría una asesoría',en:'I would like advisory'},
    m:{es:'Hola, me gustaría una asesoría para saber qué necesita mi empresa y por dónde empezar.',en:'Hi, I would like advisory to understand what my company needs and where to start.'} },
  { t:{es:'Hablar con un humano',en:'Talk to a human'},
    m:{es:'Hola, quiero hablar directamente con una persona del equipo de BIE.',en:'Hi, I want to talk directly with a person from the BIE team.'} },
];
const WA_GEN = { es:'Hola, quiero cotizar un producto de BIE. ¿Qué me recomiendan para mi negocio?', en:'Hi, I want a quote for a BIE product. What do you recommend for my business?' };
const WA_COMM = { es:'Hola, quiero unirme a la comunidad de BIE.', en:'Hi, I want to join the BIE community.' };

const TERM = {
  es:['agente atendiendo 3 conversaciones de WhatsApp...','cotización enviada — 00:42 a.m.','seguimiento programado para el lead de ayer','inventario sincronizado · 128 productos','reporte del día enviado al dueño','sistema operativo: todo en orden'],
  en:['agent handling 3 WhatsApp conversations...','quote sent — 00:42 a.m.','follow-up scheduled for yesterday\'s lead','inventory synced · 128 products','daily report sent to the owner','operating system: all clear'],
};

// ═══ Phases (bilingüe, sin precios) ═══
const B = (es,en)=>({es,en});
const PHASES = [
  { num:'01', title:B('Inteligencia Estratégica','Strategic Intelligence'), tag:B('Conocer el terreno antes de construir','Know the terrain before building'),
    problem:B('Sin datos propios del mercado, tu estrategia es una hipótesis.','Without your own market data, your strategy is a hypothesis.'),
    process:[B('Reunión de arranque: entendemos tu negocio, tu historia y a dónde quieres llegar','Kickoff meeting: we understand your business, your story and where you want to go'),
             B('Investigación con datos reales de tu mercado, tu competencia y tu audiencia','Research with real data on your market, competitors and audience'),
             B('Análisis y hallazgos: qué funciona, qué falta y dónde está la oportunidad','Analysis and findings: what works, what is missing, where the opportunity is'),
             B('Entrega de informe accionable con los pasos recomendados, en una reunión contigo','Actionable report delivered with recommended steps, in a meeting with you')],
    products:[
      { name:B('Análisis de tu Marca','Brand Analysis'), what:B('Una radiografía completa de cómo el mercado percibe tu marca hoy: qué comunica, qué transmite y dónde pierde fuerza frente a tu competencia.','A complete x-ray of how the market perceives your brand today: what it communicates and where it loses ground to competitors.'), benefit:B('Ves exactamente qué funciona, qué sabotea tu posicionamiento y qué cambiar primero','You see exactly what works, what sabotages your positioning and what to change first') },
      { name:B('Análisis de Competencia','Competitor Analysis'), what:B('Estudio de tus competidores directos e indirectos: qué hacen, cómo venden, dónde son fuertes y dónde están dejando espacio libre.','A study of your direct and indirect competitors: what they do, how they sell, where they are strong and where they leave space open.'), benefit:B('Encuentras los huecos del mercado que tu competencia ni ha visto ni puede llenar','You find the market gaps your competitors have not seen and cannot fill') },
      { name:B('Análisis de Mercado','Market Analysis'), what:B('Dimensionamiento real de tu mercado: cuánta demanda existe, quién compra, cómo busca y por dónde conviene entrar.','Real sizing of your market: how much demand exists, who buys, how they search and the best way in.'), benefit:B('Conoces el tamaño real de tu oportunidad y la puerta de entrada más directa','You know the real size of your opportunity and the most direct way in') },
    ], next:B('Con el diagnóstico claro, el siguiente paso es ordenar la base de la que depende todo lo demás.','With a clear diagnosis, the next step is putting in order the base everything else depends on.') },
  { num:'02', title:B('Estructuración','Structuring'), tag:B('La base que soporta el crecimiento','The base that supports growth'),
    problem:B('Una empresa sin estructura no escala — solo crece el caos.','A company without structure does not scale — only the chaos grows.'),
    process:[B('Diagnóstico de tu situación actual: qué existe, qué falta y qué está en riesgo','Diagnosis of your current situation: what exists, what is missing, what is at risk'),
             B('Definición de la estructura correcta para tu caso, con opciones y criterio claro','Definition of the right structure for your case, with clear options and criteria'),
             B('Ejecución de los trámites y documentos con profesionales aliados','Execution of filings and documents with allied professionals'),
             B('Entrega organizada: tu empresa queda estructurada y tú sabes exactamente qué tienes','Organized delivery: your company is structured and you know exactly what you have')],
    products:[
      { name:B('Constitución de tu Empresa','Company Incorporation'), what:B('El proceso completo para que tu empresa exista legalmente: figura societaria, trámites y registro, guiado de principio a fin.','The full process for your company to legally exist: legal structure, filings and registration, guided end to end.'), benefit:B('Tu empresa existe legalmente, con la figura correcta para lo que quieres construir','Your company legally exists, with the right structure for what you want to build') },
      { name:B('Contabilidad Ordenada','Clean Accounting'), what:B('Montamos tu sistema contable desde cero: registro de ingresos y gastos, obligaciones al día y números que entiendes.','We set up your accounting from scratch: income and expense records, obligations up to date and numbers you understand.'), benefit:B('Las finanzas claras desde el primer día, sin sorpresas al cierre del año','Clear finances from day one, no surprises at year end') },
      { name:B('Protección Legal','Legal Protection'), what:B('Los contratos y acuerdos que tu operación necesita: clientes, proveedores y colaboradores, redactados para protegerte.','The contracts and agreements your operation needs: clients, suppliers and collaborators, written to protect you.'), benefit:B('Tus contratos y acuerdos te protegen en lugar de dejarte expuesto','Your contracts protect you instead of leaving you exposed') },
    ], next:B('Con la estructura en orden, es el momento de construir la identidad que te diferencia.','With the structure in order, it is time to build the identity that sets you apart.') },
  { num:'03', title:B('Identidad y Sonido','Identity & Sound'), tag:B('La marca que te precede en cada sala','The brand that precedes you in every room'),
    problem:B('Si no eres reconocible, eres intercambiable.','If you are not recognizable, you are interchangeable.'),
    process:[B('Sesión de descubrimiento: tu esencia, tu cliente y lo que quieres transmitir','Discovery session: your essence, your customer and what you want to convey'),
             B('Propuestas de dirección creativa para que elijas con opciones reales delante','Creative direction proposals so you choose with real options in front of you'),
             B('Construcción completa de la identidad elegida, aplicada a tus canales','Full build of the chosen identity, applied to your channels'),
             B('Entrega del manual y los archivos: tu marca lista para usarse en todas partes','Manual and files delivered: your brand ready to use everywhere')],
    products:[
      { name:B('Identidad de Marca','Brand Identity'), what:B('Tu marca completa: logotipo, colores, tipografías, tono de voz y manual de uso — un sistema visual coherente, no solo un logo.','Your complete brand: logo, colors, typography, tone of voice and usage manual — a coherent visual system, not just a logo.'), benefit:B('Una marca que comunica quién eres antes de que abras la boca','A brand that says who you are before you open your mouth') },
      { name:B('Estrategia de Contenidos','Content Strategy'), what:B('El plan de contenido de tu marca: qué publicar, dónde, con qué frecuencia y con qué objetivo comercial.','Your brand content plan: what to publish, where, how often and with what commercial goal.'), benefit:B('Un sistema que construye autoridad de forma constante, sin agotarte','A system that builds authority consistently, without burning you out') },
      { name:B('Gestión de Redes Sociales','Social Media Management'), what:B('Operamos tus redes por ti: publicaciones, diseño, calendario y comunidad, alineados a tu estrategia.','We run your social media for you: posts, design, calendar and community, aligned with your strategy.'), benefit:B('Tu comunidad crece de forma orgánica y con propósito comercial','Your community grows organically and with commercial purpose') },
      { name:B('Jingle de tu Empresa','Company Jingle'), what:B('Una pieza musical original y corta que identifica a tu marca — tu firma sonora para publicidad y contenido.','A short original musical piece that identifies your brand — your sound signature for ads and content.'), benefit:B('Una firma sonora que genera reconocimiento inmediato','A sound signature that creates instant recognition') },
      { name:B('Música para tu Espacio','Music for Your Space'), what:B('Selección y curaduría musical para tu local: el ambiente sonoro que refuerza la experiencia de tus clientes.','Music curation for your venue: the sound atmosphere that reinforces your customers\' experience.'), benefit:B('La experiencia en tu local refuerza lo que quieres que sientan','The in-store experience reinforces what you want people to feel') },
      { name:B('Soundtrack de Marca','Brand Soundtrack'), what:B('Música original para tus videos y contenido: piezas que le dan coherencia y nivel profesional a todo lo que publicas.','Original music for your videos and content: pieces that give coherence and a professional level to everything you publish.'), benefit:B('Tu contenido audiovisual con coherencia sonora profesional','Your audiovisual content with professional sound coherence') },
      { name:B('Identidad Sonora Completa','Full Sound Identity'), what:B('El sistema de sonido completo de tu marca: jingle, soundtrack y ambiente, unificados bajo una misma dirección.','Your brand\'s complete sound system: jingle, soundtrack and ambience, unified under one direction.'), benefit:B('Todos los puntos de contacto auditivos cuentan la misma historia','Every audio touchpoint tells the same story') },
    ], next:B('Con identidad definida, el paso natural es construir los espacios digitales donde esa identidad vive.','With identity defined, the natural step is building the digital spaces where it lives.') },
  { num:'04', title:B('Presencia Digital','Digital Presence'), tag:B('Ocupar el espacio antes de que otro lo haga','Take the space before someone else does'),
    problem:B('Si no te encuentran, no existes para el mercado que quieres conquistar.','If they cannot find you, you do not exist for the market you want to win.'),
    process:[B('Definimos qué canales necesita tu negocio y con qué prioridad','We define which channels your business needs and in what priority'),
             B('Diseño y construcción con tu identidad de marca aplicada','Design and build with your brand identity applied'),
             B('Configuración técnica completa: dominio, medición y optimización','Full technical setup: domain, analytics and optimization'),
             B('Lanzamiento y entrega con capacitación para que tengas el control','Launch and handover with training so you stay in control')],
    products:[
      { name:B('Tus Plataformas Digitales','Your Digital Platforms'), what:B('Creación y configuración profesional de tus perfiles en las plataformas donde está tu cliente, listos para vender.','Professional creation and setup of your profiles on the platforms where your customer is, ready to sell.'), benefit:B('Estás presente donde está tu cliente, configurado para convertir','You are present where your customer is, configured to convert') },
      { name:B('Dominio y Hosting Propios','Own Domain & Hosting'), what:B('Tu dirección web propia y el alojamiento de tu sitio, a tu nombre y bajo tu control — no del proveedor de turno.','Your own web address and site hosting, in your name and under your control — not a vendor\'s.'), benefit:B('Tu infraestructura digital es tuya, estable y bajo tu control','Your digital infrastructure is yours, stable and under your control') },
      { name:B('Sitio Web que Vende','Website That Sells'), what:B('Tu página web diseñada para convertir visitantes en clientes: rápida, clara y conectada a tu WhatsApp.','Your website designed to turn visitors into customers: fast, clear and connected to your WhatsApp.'), benefit:B('Tu web trabaja como vendedor 24/7, no como un folleto en línea','Your site works as a 24/7 salesperson, not an online brochure') },
      { name:B('Posicionamiento en Google','Google Rankings (SEO)'), what:B('Optimización de tu sitio para que aparezca cuando tu cliente busca lo que tú ofreces.','Optimization of your site so it shows up when your customer searches for what you offer.'), benefit:B('Te encuentran cuando buscan exactamente lo que tú haces','They find you when they search exactly what you do') },
      { name:B('Perfil de Google Maps','Google Maps Profile'), what:B('Tu ficha de Google Business optimizada: fotos, reseñas, horarios y posicionamiento local.','Your Google Business profile optimized: photos, reviews, hours and local ranking.'), benefit:B('Tu empresa aparece primero en el mercado local donde compites','Your company shows up first in your local market') },
      { name:B('Fotografía con IA','AI Photography'), what:B('Imágenes profesionales de tus productos y tu marca generadas con inteligencia artificial — sin sesión fotográfica.','Professional images of your products and brand generated with AI — no photo shoot needed.'), benefit:B('Material visual profesional sin costo de sesión fotográfica','Professional visual material without the cost of a photo shoot') },
    ], next:B('Con presencia establecida, el siguiente nivel es automatizar la operación interna.','With presence established, the next level is automating the internal operation.') },
  { num:'05', title:B('Automatización e IA','Automation & AI'), tag:B('Que el sistema trabaje cuando tú no puedes','Let the system work when you cannot'),
    problem:B('Sin automatización, crecer siempre requiere más horas y más caos.','Without automation, growth always demands more hours and more chaos.'),
    process:[B('Mapeamos tu operación: dónde se pierde tiempo, clientes y dinero','We map your operation: where time, customers and money are lost'),
             B('Diseñamos el sistema a tu medida — solo lo que tu negocio necesita','We design the system to fit you — only what your business needs'),
             B('Construcción e integración con tus canales actuales, sin frenar tu operación','Build and integration with your current channels, without stopping your operation'),
             B('Puesta en marcha, ajuste fino y capacitación de tu equipo','Go-live, fine tuning and training for your team')],
    products:[
      { name:B('Asistente Inteligente 24/7','24/7 AI Assistant'), what:B('Un asistente con inteligencia artificial que atiende tu WhatsApp y tu web: responde preguntas, cotiza y agenda por ti.','An AI assistant that runs your WhatsApp and website: answers questions, quotes and books for you.'), benefit:B('Responde leads y clientes a cualquier hora sin depender de tu equipo','Answers leads and customers at any hour without depending on your team') },
      { name:B('Gestión de Clientes','Customer Management (CRM)'), what:B('Un sistema donde cada cliente, conversación y venta queda registrado, con seguimientos automáticos que nadie olvida.','A system where every customer, conversation and sale is registered, with automatic follow-ups nobody forgets.'), benefit:B('Nunca más pierdes un cliente por falta de seguimiento — el sistema lo hace por ti','You never lose a customer to poor follow-up again — the system does it for you') },
      { name:B('Sistema Operativo de tu Empresa','Your Company Operating System'), what:B('La plataforma central que organiza tu operación: pedidos, inventario, tareas y procesos en un solo lugar.','The central platform that organizes your operation: orders, inventory, tasks and processes in one place.'), benefit:B('Procesos claros que no dependen de la memoria de nadie','Clear processes that do not depend on anyone\'s memory') },
      { name:B('Automatización de Tareas','Task Automation'), what:B('Conectamos tus herramientas para que lo repetitivo se haga solo: reportes, recordatorios, registros y más.','We connect your tools so the repetitive work does itself: reports, reminders, records and more.'), benefit:B('Lo repetitivo desaparece — tu equipo trabaja en lo que genera valor','Repetitive work disappears — your team works on what creates value') },
      { name:B('Ventas por WhatsApp','WhatsApp Commerce'), what:B('Tu canal de WhatsApp convertido en tienda: catálogo, pedidos, pagos y confirmaciones en el chat.','Your WhatsApp turned into a store: catalog, orders, payments and confirmations in the chat.'), benefit:B('Vendes, cobras y das soporte directamente desde WhatsApp, sin fricción','You sell, charge and support directly on WhatsApp, friction-free') },
      { name:B('Panel de Control en Vivo','Live Dashboard'), what:B('Un tablero donde ves tu negocio completo en tiempo real: ventas, pedidos y conversaciones, desde cualquier dispositivo.','A board where you see your whole business in real time: sales, orders and conversations, from any device.'), benefit:B('El estado real de tu negocio en un solo lugar, en tiempo real','The real state of your business in one place, in real time') },
    ], next:B('Con la operación automatizada, es momento de acelerar el crecimiento con inversión en publicidad.','With the operation automated, it is time to accelerate growth with advertising investment.') },
  { num:'06', title:B('Crecimiento','Growth'), tag:B('Crecer con intención, no con esperanza','Grow with intent, not with hope'),
    problem:B('Sin sistema de crecimiento, dependes del boca a boca y la suerte.','Without a growth system, you depend on word of mouth and luck.'),
    process:[B('Definimos objetivo, presupuesto y a quién le vamos a hablar','We define goal, budget and who we are going to talk to'),
             B('Creamos las campañas y las piezas con tu identidad de marca','We create the campaigns and assets with your brand identity'),
             B('Lanzamos, medimos y optimizamos cada semana con datos reales','We launch, measure and optimize every week with real data'),
             B('Reporte claro: qué entró, qué costó y qué sigue','Clear report: what came in, what it cost, what is next')],
    products:[
      { name:B('Publicidad en Google','Google Ads'), what:B('Campañas en el buscador para aparecer exactamente cuando alguien busca lo que vendes.','Search campaigns so you show up exactly when someone searches what you sell.'), benefit:B('Apareces ante quien ya está buscando lo que vendes, en el momento exacto','You appear in front of people already searching, at the exact moment') },
      { name:B('Publicidad en Facebook e Instagram','Facebook & Instagram Ads'), what:B('Campañas segmentadas en Meta para llegar a tu cliente ideal con el mensaje correcto.','Targeted Meta campaigns to reach your ideal customer with the right message.'), benefit:B('Llegas a tu cliente ideal antes de que busque a tu competencia','You reach your ideal customer before they look for your competitor') },
      { name:B('Email que Vende','Email That Sells'), what:B('Secuencias de correo automatizadas que convierten tu base de contactos en ventas recurrentes.','Automated email sequences that turn your contact base into recurring sales.'), benefit:B('Tu base de contactos se convierte en ingresos predecibles','Your contact base becomes predictable revenue') },
      { name:B('Venta en Marketplaces','Marketplace Sales'), what:B('Publicamos y optimizamos tus productos en las plataformas de venta donde ya hay demanda.','We publish and optimize your products on the sales platforms where demand already exists.'), benefit:B('Tus productos llegan a plataformas donde ya hay demanda activa','Your products reach platforms with active demand') },
      { name:B('Publicidad en TikTok','TikTok Ads'), what:B('Campañas en la plataforma de contenido corto más grande, con formatos que convierten.','Campaigns on the biggest short-form platform, with formats that convert.'), benefit:B('La audiencia más grande de contenido corto, con conversión directa','The largest short-form audience, with direct conversion') },
      { name:B('Video Marketing','Video Marketing'), what:B('Producción de video para tu marca: desde contenido para redes hasta piezas comerciales.','Video production for your brand: from social content to commercial pieces.'), benefit:B('Producción audiovisual que genera confianza y retención','Audiovisual production that builds trust and retention') },
      { name:B('Reputación Online','Online Reputation'), what:B('Gestión de tus reseñas y tu presencia pública para que tu historial digital venda por ti.','Management of your reviews and public presence so your digital track record sells for you.'), benefit:B('Tu historial digital trabaja a favor de la decisión de compra','Your digital history works in favor of the buying decision') },
    ], next:B('Con el crecimiento activo, el sistema necesita soporte administrativo para no colapsar ante la demanda.','With growth active, the system needs administrative support so demand does not collapse it.') },
  { num:'07', title:B('Administración','Administration'), tag:B('El motor invisible que sostiene todo','The invisible engine that holds everything'),
    problem:B('Sin back-office, el crecimiento genera problemas legales en lugar de riqueza.','Without a back office, growth creates legal problems instead of wealth.'),
    process:[B('Levantamos tu situación administrativa, tributaria y laboral actual','We assess your current administrative, tax and labor situation'),
             B('Ordenamos y regularizamos lo pendiente con profesionales aliados','We organize and regularize what is pending with allied professionals'),
             B('Montamos el sistema para que todo se mantenga al día solo','We set up the system so everything stays up to date on its own'),
             B('Acompañamiento continuo: tú decides, nosotros sostenemos el motor','Ongoing support: you decide, we keep the engine running')],
    products:[
      { name:B('Constitución de Sociedad','Company Formation'), what:B('Creación de tu SAS o la figura societaria que corresponda, con todo el proceso legal incluido.','Formation of your corporation or the right legal entity, with the full legal process included.'), benefit:B('La figura legal que maximiza tu protección y flexibilidad','The legal structure that maximizes your protection and flexibility') },
      { name:B('Contratos que Protegen','Contracts That Protect'), what:B('Redacción y revisión de los contratos de tu operación, hechos para protegerte a ti.','Drafting and review of your operation\'s contracts, made to protect you.'), benefit:B('Cada acuerdo respaldado por un documento a tu favor','Every agreement backed by a document in your favor') },
      { name:B('Registro de tu Marca','Trademark Registration'), what:B('Registro oficial de tu marca ante la autoridad de propiedad intelectual para que nadie más pueda usarla.','Official registration of your brand with the IP authority so nobody else can use it.'), benefit:B('Tu marca y propiedad intelectual protegidas legalmente','Your brand and IP legally protected') },
      { name:B('Impuestos al Día','Taxes Up To Date'), what:B('Gestión de tus obligaciones tributarias: declaraciones, anexos y calendario fiscal sin sustos.','Management of your tax obligations: filings, annexes and fiscal calendar without scares.'), benefit:B('Obligaciones tributarias sin sorpresas ni multas','Tax obligations with no surprises and no fines') },
      { name:B('Facturación Electrónica','Electronic Invoicing'), what:B('Implementación de tu sistema de facturación electrónica, integrado con tu operación.','Implementation of your e-invoicing system, integrated with your operation.'), benefit:B('Cobras de forma profesional, rápida y legal','You charge professionally, fast and legally') },
      { name:B('Reportes Financieros','Financial Reports'), what:B('Reportes periódicos claros de cómo está tu negocio: ingresos, gastos, márgenes y tendencia.','Clear periodic reports on your business: income, expenses, margins and trend.'), benefit:B('Visibilidad real para decidir con datos','Real visibility to decide with data') },
      { name:B('Nómina y Seguridad Social','Payroll & Social Security'), what:B('Gestión completa de tu equipo: contratos laborales, nómina, seguridad social y liquidaciones.','Full management of your team: labor contracts, payroll, social security and settlements.'), benefit:B('Tu equipo cubierto y tus obligaciones laborales al día','Your team covered and your labor obligations up to date') },
    ], next:B('Con la administración en orden, el último paso es multiplicar el capital humano de tu empresa.','With administration in order, the last step is multiplying your company\'s human capital.') },
  { num:'08', title:B('Educación','Education'), tag:B('El equipo que hace posible todo lo anterior','The team that makes all of it possible'),
    problem:B('Un sistema potente en manos de un equipo que no lo entiende no produce resultados.','A powerful system in the hands of a team that does not understand it produces nothing.'),
    process:[B('Evaluamos qué sabe tu equipo y qué necesita dominar','We assess what your team knows and what they need to master'),
             B('Diseñamos el programa a la medida de tus herramientas y procesos','We design the program around your tools and processes'),
             B('Capacitación práctica, con tus casos reales — no teoría genérica','Hands-on training with your real cases — not generic theory'),
             B('Material de consulta permanente para que el conocimiento se quede','Permanent reference material so the knowledge stays')],
    products:[
      { name:B('Capacitación Digital','Digital Training'), what:B('Programa de formación para tu equipo en las herramientas y sistemas que usa tu empresa.','Training program for your team on the tools and systems your company uses.'), benefit:B('Tu equipo opera las herramientas con autonomía y criterio','Your team operates the tools with autonomy and judgment') },
      { name:B('Tu Curso Online','Your Online Course'), what:B('Convertimos tu conocimiento en un curso digital vendible: estructura, grabación, plataforma y lanzamiento.','We turn your knowledge into a sellable digital course: structure, recording, platform and launch.'), benefit:B('Tu conocimiento se convierte en un producto escalable y nuevo canal de ingresos','Your knowledge becomes a scalable product and a new revenue channel') },
    ], next:B('Con el equipo entrenado, la cadena está completa. Tu empresa opera como un sistema, no como una persona.','With the team trained, the chain is complete. Your company runs as a system, not as one person.') },
];

// ═══ Companies (Villa Tres → Guayaquil; Tasting sin ubicación fija) ═══
const MOCK = {
  luwayOS: `<div class="browser"><div class="browser-bar"><span class="b-dot"></span><span class="b-dot"></span><span class="b-dot"></span><span class="b-url">luway-os.app</span></div>
    <div class="dash"><div class="dash-row">
      <div class="dash-kpi"><span class="dash-kpi-n">128</span><span class="dash-kpi-l">Items</span></div>
      <div class="dash-kpi"><span class="dash-kpi-n">36</span><span class="dash-kpi-l">Lives</span></div>
      <div class="dash-kpi"><span class="dash-kpi-n">92%</span><span class="dash-kpi-l">OK</span></div></div>
    <div class="dash-bars"><div class="dash-bar" style="height:40%"></div><div class="dash-bar" style="height:65%"></div><div class="dash-bar" style="height:50%"></div><div class="dash-bar" style="height:85%"></div><div class="dash-bar" style="height:70%"></div><div class="dash-bar" style="height:100%"></div></div></div></div>`,
  luwayHub: `<div class="phone"><div class="phone-screen linkhub"><div class="lh-avatar"></div><div class="lh-name">Luway</div>
    <div class="lh-btn">Catálogo semanal</div><div class="lh-btn">Próximo live TikTok</div><div class="lh-btn">Pedidos WhatsApp</div><div class="lh-btn">Cambios</div></div></div>`,
  luwayLive: `<div class="phone" style="position:relative"><div class="phone-screen" style="position:relative"><div class="live-ui">
    <div class="live-badge">LIVE</div><div class="live-msg">Ese vestido en talla M porfa</div><div class="live-msg">Precio del rojo?</div><div class="live-msg" style="background:rgba(229,57,53,.85)">Vendido a Maria G.</div></div></div></div>`,
  tastingIG: `<div class="browser" style="width:60%"><div class="browser-bar"><span class="b-dot"></span><span class="b-dot"></span><span class="b-dot"></span><span class="b-url">instagram.com</span></div>
    <div class="ig-grid"><div class="ig-cell"></div><div class="ig-cell"></div><div class="ig-cell"></div><div class="ig-cell"></div><div class="ig-cell"></div><div class="ig-cell"></div></div></div>`,
  tastingBrand: `<div class="brand-board"><div class="bb-logo">TASTING ECUADOR</div><div class="bb-swatch" style="background:#7a4a2a"></div><div class="bb-swatch" style="background:#4a6a3a"></div><div class="bb-type">Logo · Identidad · Papelería · Plantillas</div></div>`,
  tastingWeb: `<div class="browser" style="width:76%"><div class="browser-bar"><span class="b-dot"></span><span class="b-dot"></span><span class="b-dot"></span><span class="b-url">[WEB]</span></div>
    <div class="svc"><div class="svc-hero" style="background:#5a3a20">Experiencias gastronómicas<small>Reserva tu mesa</small></div>
    <div class="svc-cards"><div class="svc-card"><b>Cenas privadas</b>Chef en casa</div><div class="svc-card"><b>Eventos</b>Grupos y tours</div></div></div></div>`,
  villaBrand: `<div class="brand-board"><div class="bb-logo">VILLA TRES</div><div class="bb-swatch" style="background:#2d4a3e"></div><div class="bb-swatch" style="background:#c9a86a"></div><div class="bb-type">Identidad · Dirección de arte · Sistema visual</div></div>`,
  villaContent: `<div class="content-grid"><div class="cg-cell"></div><div class="cg-cell"></div><div class="cg-cell"></div><div class="cg-cell"></div><div class="cg-cell"></div><div class="cg-cell"></div><div class="cg-cell"></div><div class="cg-cell"></div><div class="cg-cell"></div></div>`,
  amilcarWeb: `<div class="browser" style="width:80%"><div class="browser-bar"><span class="b-dot"></span><span class="b-dot"></span><span class="b-dot"></span><span class="b-url">[WEB]</span></div>
    <div class="svc"><div class="svc-hero">Servicios profesionales<small>Agenda en línea</small></div>
    <div class="svc-cards"><div class="svc-card"><b>Consultoría</b>1:1</div><div class="svc-card"><b>Asesoría</b>Mensual</div></div></div></div>`,
  amilcarBooking: `<div class="phone"><div class="phone-screen conf"><div class="conf-head">Agendar</div>
    <div class="conf-row"><div class="conf-chip">Lun 10:00</div><div class="conf-chip">Lun 15:00</div></div>
    <div class="conf-row"><div class="conf-chip">Mar 09:00</div><div class="conf-chip" style="background:#E53935;color:#fff">Mar 11:00</div></div>
    <div class="conf-slide" style="height:36px">Confirmar</div></div></div>`,
  oscarApp: `<div class="phone"><div class="phone-screen conf"><div class="conf-head">Conferencias</div>
    <div class="conf-slide">Diapositiva en vivo</div>
    <div class="conf-row"><div class="conf-chip">Guion</div><div class="conf-chip">Tiempos</div></div>
    <div class="conf-row"><div class="conf-chip">Notas</div><div class="conf-chip">Q&amp;A</div></div></div></div>`,
  oscarFlow: `<div class="browser" style="width:78%"><div class="browser-bar"><span class="b-dot"></span><span class="b-dot"></span><span class="b-dot"></span><span class="b-url">app</span></div>
    <div class="dash"><div class="dash-row">
      <div class="dash-kpi"><span class="dash-kpi-n">12</span><span class="dash-kpi-l">Talks</span></div>
      <div class="dash-kpi"><span class="dash-kpi-n">48</span><span class="dash-kpi-l">Slides</span></div>
      <div class="dash-kpi"><span class="dash-kpi-n">3</span><span class="dash-kpi-l">Templates</span></div></div>
    <div class="conf-slide" style="height:44px">Panel</div></div></div>`,
};

const TPHOTO = n => `<img class="g-photo" src="/images/casos/tasting/${n}-800.webp" srcset="/images/casos/tasting/${n}-800.webp 800w, /images/casos/tasting/${n}.webp 1600w" sizes="(max-width:860px) 100vw, 50vw" alt="${(window.__TASTING_ALT && window.__TASTING_ALT[n]) || 'Tasting Ecuador'}" width="1600" height="1600" loading="lazy" decoding="async">`;
const PHOTO = (dir, n, alt) => `<img class="g-photo" src="/images/casos/${dir}/${n}-800.webp" srcset="/images/casos/${dir}/${n}-800.webp 800w, /images/casos/${dir}/${n}.webp 1600w" sizes="(max-width:860px) 100vw, 50vw" alt="${alt}" width="1600" height="1600" loading="lazy" decoding="async">`;
const TBG = 'radial-gradient(ellipse at 50% 40%,#fdecea,#f4f4f2 75%)';
const COMPANIES = [
  { size:'wc-big', name:'Tasting Ecuador',
    kind:B('Marca + Redes + Web + Sistema operativo','Brand + Social + Web + Operating system'),
    desc:B('Experiencias gastronómicas en Cuenca. BIE estructuró su crecimiento: identidad de marca, redes, página web con tienda y su sistema operativo propio.','Culinary experiences in Cuenca. BIE structured its growth: brand identity, social media, a website with online store and its own operating system.'),
    caseUrl:'/casos/tasting-ecuador/?src=home-work',
    socials:['instagram','web'],
    real:true,
    slides:[ [B('Página web','Website'), TPHOTO('web'), TBG],
             [B('Tasting OS','Tasting OS'), TPHOTO('os'), TBG],
             [B('Branding','Branding'), TPHOTO('branding'), TBG],
             [B('Instagram','Instagram'), TPHOTO('instagram'), TBG],
             [B('Diseños','Designs'), TPHOTO('disenos'), TBG] ] },
  { size:'wc-big', name:'Luway',
    kind:B('Sistema operativo + Link hub + Ventas en vivo','Operating system + Link hub + Live sales'),
    desc:B('Moda en vivo por TikTok. BIE construyó Luway OS — inventario, ventas y entregas — su hub de enlaces y el flujo de ventas por WhatsApp.','Live fashion on TikTok. BIE built Luway OS — inventory, sales and deliveries — its link hub and the WhatsApp sales flow.'),
    socials:['tiktok','instagram','web'],
    real:true,
    slides:[ [B('Luway OS','Luway OS'), PHOTO('luway','os','Luway OS: panel con métricas de ventas diarias y mensuales, inventario, pedidos y clientes'), TBG],
             [B('Link Hub','Link Hub'), PHOTO('luway','link-hub','Link hub de Luway: catálogo, horarios de TikTok, Instagram y guía de estilo en una sola página'), TBG] ] },
  { size:'wc-small', name:'Óscar Caicho',
    kind:B('Dirección de eventos + App + Marca','Event direction + App + Brand'),
    desc:B('Conferencista y organizador de la Escuela de Heridas Guayaquil. BIE dirigió el evento en marca y tecnología: identidad, página web, acreditaciones y material físico, y certificados automáticos por correo.','Speaker and organizer of Escuela de Heridas Guayaquil. BIE directed the event in brand and technology: identity, website, badges and printed material, and automatic certificates by email.'),
    caseUrl:'https://www.escueladeheridasguayaquil.com', ext:true,
    socials:['web'],
    real:true,
    slides:[ [B('Dirección de evento','Event direction'), PHOTO('escuela-heridas','direccion','Dirección de eventos en marca y tecnología: identidad de la Escuela de Heridas Guayaquil'), TBG],
             [B('Página web','Website'), PHOTO('escuela-heridas','web','Página web de la Escuela de Heridas Guayaquil con registro, programa y ponentes'), TBG],
             [B('Marca y material del evento','Event brand and material'), PHOTO('escuela-heridas','evento','Acreditación, bolso, roll-up y papelería de la Escuela de Heridas Guayaquil'), TBG],
             [B('Certificados automáticos','Automatic certificates'), PHOTO('escuela-heridas','email','Correo automático con certificado de asistencia de la Escuela de Heridas Guayaquil'), TBG] ] },
];

const SOC_ICONS = {
  instagram: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.4" fill="currentColor"/></svg>',
  tiktok: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M16.5 3.5c.5 2.6 2.2 4.3 4.8 4.6v3.2c-1.8 0-3.4-.6-4.8-1.6v6.8a6.4 6.4 0 1 1-6.4-6.4c.4 0 .8 0 1.2.1v3.4a3.1 3.1 0 1 0 2 2.9V3.5h3.2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  web: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5s1.3-6.2 3.8-8.5z" stroke="currentColor" stroke-width="1.6"/></svg>',
};

const t = o => typeof o === 'object' && o !== null && ('es' in o) ? o[lang] : o;
// Trazabilidad: toda conversación lleva su origen (página/sección/producto/idioma) en un formato fijo.
const origin = (where) => `\n\n— Origen: web/${where}/${lang}`;
const slugify = str => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const wa = msg => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;

// ═══ Render: statics ═══
function applyStatics(){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = UI[el.dataset.i18n];
    if (v && typeof v[lang] === 'string' && el.innerHTML !== v[lang]) el.innerHTML = v[lang];
  });
  document.querySelectorAll('[data-es]').forEach((el) => { if (el.textContent !== el.dataset[lang]) el.textContent = el.dataset[lang]; });
  if (window.__pxLang) window.__pxLang();
  document.getElementById('lang-toggle').textContent = lang === 'es' ? 'EN' : 'ES';
  document.getElementById('mm-lang').firstChild.textContent = lang === 'es' ? 'English' : 'Español';
  document.getElementById('in-name').placeholder = UI.ph_name[lang];
  document.getElementById('in-comp').placeholder = UI.ph_comp[lang];
  document.getElementById('in-msg').placeholder = UI.ph_msg[lang];
  const sel = document.getElementById('in-need');
  const prev = sel.selectedIndex;
  sel.innerHTML = NEED_OPTS[lang].map((o, i) => `<option value="${i === 0 ? '' : o}">${o}</option>`).join('');
  if (prev > 0) sel.selectedIndex = prev;
  document.getElementById('mm-wa').href = wa(WA_GEN[lang] + origin('home/menu'));
  if (window.__kinSplit) window.__kinSplit();
  if (window.__nichoLang) window.__nichoLang();
  document.querySelectorAll('[data-i18n-list]').forEach(el => { const l = UI[el.dataset.i18nList]; if (l && l[lang]) el.textContent = l[lang][+el.dataset.j]; });
  document.getElementById('waw-opts').innerHTML = WAW_OPTS.map(o =>
    `<a class="waw-opt" href="${wa(o.m[lang] + origin('home/cubo'))}" target="_blank"><span class="waw-opt-px"></span>${o.t[lang]}</a>`).join('');
}

// ═══ Render: hero h1 ═══
function renderH1(){
  const el = document.getElementById('hero-kicker');
  if (el) el.textContent = HERO_KICKER[lang];
}

// ═══ Render: los más pedidos (los 8 del batch, cada uno con su página) ═══
const TOP = [
  { href:'/productos/asistente-inteligente-whatsapp/?src=home-mas-pedidos', n:B('Asistente Inteligente 24/7','24/7 AI Assistant'), hook:B('Responde, cotiza y agenda en WhatsApp las 24 horas.','Replies, quotes and books on WhatsApp 24/7.') },
  { href:'/productos/pagina-web/?src=home-mas-pedidos', video:true, n:B('Página Web','Website'), hook:B('Una web que convierte visitas en clientes, no un folleto.','A site that turns visits into customers, not a brochure.') },
  { href:'/productos/identidad-de-marca/?src=home-mas-pedidos', video:true, n:B('Identidad de Marca','Brand Identity'), hook:B('La marca que te hace reconocible y elegible.','The brand that makes you recognizable and choosable.') },
  { href:'/productos/crm-ia/?src=home-mas-pedidos', n:B('CRM con IA','AI-Powered CRM'), hook:B('Ningún cliente sin seguimiento, nunca más.','No customer left unfollowed, ever again.') },
  { href:'/productos/automatizaciones/?src=home-mas-pedidos', n:B('Automatizaciones','Automations'), hook:B('Lo que hoy haces a mano, mañana se hace solo.','What you do by hand today runs on its own tomorrow.') },
  { href:'/productos/whatsapp-business-commerce/?src=home-mas-pedidos', n:B('WhatsApp Business Commerce','WhatsApp Business Commerce'), hook:B('Tu WhatsApp convertido en tu mejor canal de ventas.','Your WhatsApp turned into your best sales channel.') },
  { href:'/productos/data-analytics/?src=home-mas-pedidos', video:true, n:B('Data Analytics & Dashboards','Data Analytics & Dashboards'), hook:B('Deja de adivinar: mira tu negocio en vivo.','Stop guessing: watch your business live.') },
  { href:'/productos/link-hub/?src=home-mas-pedidos', n:B('Link Hub de Marca','Brand Link Hub'), hook:B('Todos tus enlaces, una sola puerta de entrada.','All your links, one single front door.') },
];
function watchTileVideos(){
  const vids = document.querySelectorAll('.top-tile video.tt-img, .pack-media video, .sv-media video');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const load = (v) => { if (v.dataset.poster) { v.poster = v.dataset.poster; delete v.dataset.poster; } if (!still && v.dataset.src) { v.src = v.dataset.src; delete v.dataset.src; } };
  if (!('IntersectionObserver' in window)) { vids.forEach(load); return; }
  const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { load(e.target); near.unobserve(e.target); } }), { rootMargin: '700px 0px' });
  vids.forEach((v) => near.observe(v));
  if (still) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.intersectionRatio >= .35) { if (v.paused && (v.src || v.currentSrc)) v.play().catch(() => {}); }
    else if (!v.paused) v.pause();
  }), { threshold: [0, .35, .7] });
  vids.forEach((v) => io.observe(v));
}
// solo estos cuatro productos tienen video; el resto usa su foto
const TILE_VIDEOS = ['identidad-de-marca', 'asistente-inteligente-whatsapp', 'whatsapp-business-commerce'];
const TILE_MEDIA = (slug) => slug === 'pagina-web' ? '<img class="tt-img" src="/images/casos/escuela-heridas/web-800.webp" alt="" loading="lazy" decoding="async">' : TILE_VIDEOS.includes(slug)
  ? `<video class="tt-img" data-src="/videos/productos/${slug}.mp4" data-poster="/images/productos/${slug}.webp" muted loop playsinline preload="none" aria-hidden="true"></video>`
  : `<img class="tt-img" src="/images/productos/${slug}.webp" alt="" loading="lazy" decoding="async">`;
function renderTop(){
  (document.getElementById('top-grid') || {}).innerHTML = TOP.map((x, i) =>
    `<a class="top-tile has-img" href="${x.href}">${TILE_MEDIA(x.href.split('/')[2])}<span class="tt-px"></span><span class="tt-num">0${i + 1}</span><span class="tt-name">${t(x.n)}</span><span class="tt-hook">${t(x.hook)}</span><span class="tt-arrow">→</span></a>`).join('');
  watchTileVideos();
}

// ═══ Render: marquee (títulos de fase, display gigante) ═══
function renderMarquee(){
  const names = PHASES.map(p => t(p.title));
  const half = names.map(n => `<span class="mq-item">${n}<span class="mq-sep"></span></span>`).join('');
  document.getElementById('mq-track').innerHTML = half + half;
}

// ═══ El catálogo completo vive en /catalogo; aquí solo se localiza el CTA de diagnóstico ═══
let activePhase = null;
const QUIZ = [
  { k:'no-me-encuentran', q:{es:'No me encuentran en internet.',en:'People cannot find me online.'}, slug:'pagina-web',
    name:{es:'Página Web',en:'Website'},
    why:{es:'Una página profesional, con tu propio dominio, para que te encuentren en Google.',en:'A professional website, with your own domain, so people find you on Google.'} },
  { k:'no-alcanzo-responder', q:{es:'Me escriben y no alcanzo a responder.',en:'I get messages and cannot keep up.'}, slug:'asistente-inteligente-whatsapp',
    name:{es:'Un asistente para tu WhatsApp',en:'An assistant for your WhatsApp'},
    why:{es:'Responde a tus clientes al instante, a cualquier hora, con la información de tu negocio.',en:'It answers your customers instantly, at any hour, with your business information.'} },
  { k:'marca-improvisada', q:{es:'Mi marca se ve improvisada.',en:'My brand looks improvised.'}, slug:'identidad-de-marca',
    name:{es:'Identidad de Marca',en:'Brand Identity'},
    why:{es:'Logo, colores y letra definidos, para que tu negocio se vea profesional en todo lo que publicas.',en:'Logo, colors and type defined, so your business looks professional in everything you publish.'} },
  { k:'apagando-incendios', q:{es:'Hago todo a mano y no me alcanza el tiempo.',en:'I do everything by hand and run out of time.'}, slug:'sistema-operativo',
    name:{es:'Un sistema para tu negocio',en:'A system for your business'},
    why:{es:'Ventas, clientes, tareas y números en un solo lugar, desde tu celular.',en:'Sales, customers, tasks and numbers in one place, from your phone.'} },
];
let quizSel = null;
function quizAnswer(o){
  return `<span class="qz-rec">${lang === 'es' ? 'Esto lo resuelve' : 'This solves it'}</span>
  <div class="qz-name">${t(o.name)}</div>
  <p class="qz-why">${t(o.why)}</p>
  <div class="qz-ctas">
    <a class="qz-see" href="/productos/${o.slug}/?src=quiz-${o.k}">${lang === 'es' ? 'Ver cómo funciona' : 'See how it works'} →</a>
    <a class="qz-wa" href="${wa((lang === 'es' ? `Hola, me pasa esto: «${o.q.es}» Me interesa ${o.name.es}.` : `Hi, this is happening to me: "${o.q.en}" I am interested in ${o.name.en}.`) + origin('home/quiz/' + o.k))}" target="_blank" rel="noopener">${lang === 'es' ? 'Cotizar por WhatsApp' : 'Quote on WhatsApp'}</a>
  </div>`;
}
function renderQuiz(){
  const q = document.getElementById('quiz');
  if (!q) return;
  q.innerHTML = `<div class="qz-opts">${QUIZ.map((o, i) => `<button class="qz-opt${quizSel === i ? ' on' : ''}" data-i="${i}">${t(o.q)}<span class="qa">→</span></button>`).join('')}</div>
  <div class="qz-answer${quizSel !== null ? ' on' : ''}">${quizSel !== null ? quizAnswer(QUIZ[quizSel]) : ''}</div>`;
  q.querySelectorAll('.qz-opt').forEach(b => b.addEventListener('click', () => {
    quizSel = quizSel === +b.dataset.i ? null : +b.dataset.i;
    if (quizSel !== null && window.bieTrack) bieTrack('quiz_step', { meta: { pain: QUIZ[quizSel].k } });
    renderQuiz();
  }));
}
function renderRail(){
  const d = document.getElementById('cat-diag');
  if (d) d.href = wa((lang === 'es' ? 'Hola, quiero un diagnóstico gratuito para mi empresa.' : 'Hi, I would like a free diagnosis for my company.') + origin('home/catalogo'));
  const hw = document.getElementById('hero-wa');
  if (hw) hw.href = wa((lang === 'es' ? 'Hola, tengo un negocio. Vendo: ' : 'Hi, I run a business. I sell: ') + origin('home/hero'));
  const sw = document.getElementById('sim-wa');
  if (sw) sw.href = wa((lang === 'es' ? 'Hola, quiero cotizar. Les cuento mi negocio para saber qué necesito.' : 'Hi, I want a quote. Let me tell you about my business to know what I need.') + origin('home/asi-de-simple'));
  renderQuiz();
}
function togglePhase(){}
function renderPanel(){}

// ═══ Product modal ═══
function openModal(phaseIdx, prodIdx){
  const p = PHASES[phaseIdx];
  const pr = p.products[prodIdx];
  document.getElementById('modal-body').innerHTML = `
    <div class="m-phase">${UI.phase_w[lang]} ${p.num} — ${t(p.title)}</div>
    <div class="m-name">${t(pr.name)}</div>
    <p class="m-what">${t(pr.what)}</p>
    <div class="m-sec">${UI.m_how[lang]}</div>
    <div class="m-steps">
      ${p.process.map((s, i) => `<div class="m-step"><span class="m-step-n">0${i + 1}</span><span class="m-step-t">${t(s)}</span></div>`).join('')}
    </div>
    <div class="m-result">
      <div class="m-result-l">${UI.m_get[lang]}</div>
      <div class="m-result-t">${t(pr.benefit)}.</div>
    </div>
    <div class="m-actions">
      <a href="${wa(UI.m_buy_wa[lang](t(pr.name)) + origin('catalogo/' + slugify(pr.name.es)))}" target="_blank" class="m-cta"><span>${UI.m_cta[lang]}</span></a>
      <a href="${wa(UI.m_diag_wa[lang](t(pr.name)) + origin('catalogo/' + slugify(pr.name.es)))}" target="_blank" class="m-cta m-cta-ghost"><span>${UI.m_diag[lang]}</span></a>
    </div>
    <div class="m-soon">${UI.m_soon[lang]}</div>`;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target.id === 'modal-overlay') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ═══ Render: work grid + before/after ═══
let galleryState = COMPANIES.map(() => 0);
// ═══ Galería de clientes: la pieza del centro manda; se mueve con el dedo, el cursor, el trackpad o el teclado ═══
const GX_INFO = {
  'Tasting Ecuador': { res: 'res1', url: 'https://tasting-ecuador.com', link: 'tasting-ecuador.com' },
  'Luway': { res: 'res2' },
  'Óscar Caicho': { res: 'res3', url: 'https://www.escueladeheridasguayaquil.com', link: 'escueladeheridasguayaquil.com' },
};
const gx = { pos: 0, target: 0, tiles: [], slides: [], pauseUntil: 0 };
function renderWork(){
  const stage = document.getElementById('gx-stage'), names = document.getElementById('gx-names');
  if (!stage) return;
  gx.slides = COMPANIES.flatMap((c, ci) => c.slides.map((s) => ({ c, ci, s })));
  stage.innerHTML = gx.slides.map(({ c, s }, i) => `<div class="wt" data-i="${i}"><div class="g-slide real">${s[1]}</div><span class="wt-name">${t(s[0])}</span></div>`).join('');
  gx.tiles = Array.from(stage.children);
  names.innerHTML = COMPANIES.map((c, i) => `<button type="button" data-ci="${i}">${c.name}</button>`).join('');
  names.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
    const first = gx.slides.findIndex((x) => x.ci === +b.dataset.ci), N = gx.slides.length;
    let d = ((first - gx.target) % N + N) % N; if (d > N / 2) d -= N;
    gx.target += d; gx.pauseUntil = performance.now() + 4000;
  }));
  gx.last = -1;
  if (window.__gxMeasure) window.__gxMeasure();
}
(function(){
  const row = document.getElementById('gx'), sec = document.getElementById('work');
  if (!row) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const barEl = document.getElementById('gx-bar'), resEl = document.getElementById('gx-res'), linkEl = document.getElementById('gx-link'), namesEl = document.getElementById('gx-names');
  let tileW = 300, step = 300, drag = null, moved = false, inView = false, hover = false, lastT = performance.now(), wheelT = 0;
  function measure(){ const t = gx.tiles[0]; if (!t) return; tileW = t.offsetWidth; step = tileW * (innerWidth > 860 ? .9 : .96); }
  window.__gxMeasure = measure; addEventListener('resize', measure, { passive: true });
  new IntersectionObserver((es) => { inView = es[0].isIntersecting; }, { threshold: .05 }).observe(row);
  const touch = () => { gx.pauseUntil = performance.now() + 3000; };
  // bajar o subir la página también la mueve, aunque alguien la haya tocado antes
  let lastY = scrollY;
  addEventListener('scroll', () => { const dy = scrollY - lastY; lastY = scrollY; if (!reduce && inView && !drag) gx.target += dy / (innerHeight * 0.42); }, { passive: true });
  row.addEventListener('dragstart', (e) => e.preventDefault());
  row.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hover = true; });
  row.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') hover = false; });
  row.addEventListener('pointerdown', (e) => { if (e.button) return; drag = { sx: e.clientX, pos: gx.pos, id: e.pointerId, on: false, lx: e.clientX, lt: e.timeStamp, v: 0 }; moved = false; });
  addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.sx;
    if (!drag.on && Math.abs(dx) > 6) { drag.on = true; moved = true; touch(); try { row.setPointerCapture(e.pointerId); } catch (_) {} row.classList.add('dragging'); }
    if (!drag.on) return;
    gx.pos = drag.pos - dx / step; gx.target = gx.pos;
    drag.v = (e.clientX - drag.lx) / Math.max(1, e.timeStamp - drag.lt); drag.lx = e.clientX; drag.lt = e.timeStamp;
  }, { passive: true });
  const end = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const was = drag.on, v = drag.v; drag = null; row.classList.remove('dragging');
    if (was) { gx.target = Math.round(gx.pos - Math.max(-1, Math.min(1, v * 1.1))); touch(); }
  };
  addEventListener('pointerup', end, { passive: true }); addEventListener('pointercancel', end, { passive: true });
  // tocar una pieza de los lados la trae al centro
  row.addEventListener('click', (e) => {
    if (moved) { moved = false; return; }
    const t = e.target.closest('.wt'); if (!t) return;
    const N = gx.slides.length, cur = ((Math.round(gx.target) % N) + N) % N;
    let d = (+t.dataset.i - cur + N) % N; if (d > N / 2) d -= N;
    if (d) { gx.target = Math.round(gx.target) + d; touch(); }
  });
  row.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault(); touch(); gx.target += e.deltaX / step; clearTimeout(wheelT); wheelT = setTimeout(() => { gx.target = Math.round(gx.target); }, 140);
  }, { passive: false });
  row.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { gx.target = Math.round(gx.target) + 1; touch(); } else if (e.key === 'ArrowLeft') { gx.target = Math.round(gx.target) - 1; touch(); } });
  function info(i){
    const { c, ci } = gx.slides[i], d = GX_INFO[c.name] || {};
    barEl.style.width = ((i + 1) / gx.slides.length * 100) + '%';
    namesEl.querySelectorAll('button').forEach((b) => b.classList.toggle('on', +b.dataset.ci === ci));
    if (gx.lastC !== ci || gx.lastLang !== lang) {
      gx.lastC = ci; gx.lastLang = lang;
      resEl.textContent = d.res ? t(UI[d.res]) : '';
      linkEl.style.display = d.url ? '' : 'none';
      if (d.url) { linkEl.href = d.url; linkEl.textContent = d.link + ' ↗'; }
    }
  }
  function frame(now){
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    const N = gx.tiles.length; if (!N) return;
    if (!tileW || tileW === 300) measure();
    if (!reduce && inView && !hover && !drag && now > gx.pauseUntil) gx.target += 0.16 * dt;
    if (!drag) gx.pos += (gx.target - gx.pos) * (reduce ? 1 : 1 - Math.exp(-dt * 5.5));
    if (!inView && gx.last >= 0) return;
    for (let i = 0; i < N; i++) {
      let d = ((i - gx.pos) % N + N) % N; if (d > N / 2) d -= N;
      const a = Math.abs(d), el = gx.tiles[i];
      if (a > 3.2) { if (el.__vis !== false) { el.style.visibility = 'hidden'; el.__vis = false; } continue; }
      if (el.__vis !== true) { el.style.visibility = ''; el.__vis = true; }
      const k = Math.min(a, 1), sc = 1 - k * .14;
      el.style.transform = 'translate3d(' + (d * step - Math.sign(d) * k * tileW * .02).toFixed(1) + 'px,0,0) scale(' + sc.toFixed(3) + ')';
      el.style.opacity = (1 - Math.min(Math.max(a - 1, 0), 1) * .6 - k * .12).toFixed(3);
      el.style.zIndex = String(10 - Math.round(a));
      const img = el.querySelector('img'); if (img) img.style.transform = 'translate3d(' + (d * -5).toFixed(2) + '%,0,0) scale(1.1)';
      el.classList.toggle('center', a < .5);
    }
    const cur = ((Math.round(gx.pos) % N) + N) % N;
    if (cur !== gx.last || gx.lastLang !== lang) { gx.last = cur; info(cur); }
  }
  requestAnimationFrame(frame);
})();

// ═══ Qué hacemos: cada panel entra sobre el anterior, que se aleja un poco ═══
(function(){
  const panels = Array.from(document.querySelectorAll('.sv-p'));
  if (!panels.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = (v) => Math.min(1, Math.max(0, v));
  let queued = false;
  function paint(){
    queued = false;
    const vh = LVH();
    const tops = panels.map((p) => p.getBoundingClientRect().top);
    if (tops[0] > vh * 1.2 || panels[panels.length - 1].getBoundingClientRect().bottom < -vh) return;
    panels.forEach((p, i) => {
      p.style.setProperty('--in', c(1 - tops[i] / vh).toFixed(3));
      p.classList.toggle('entering', tops[i] > 1 && tops[i] < vh - 2);
      p.style.setProperty('--out', (i < panels.length - 1 ? c(1 - tops[i + 1] / vh) : 0).toFixed(3));
    });
  }
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(paint); } };
  addEventListener('scroll', ask, { passive: true }); addEventListener('resize', ask, { passive: true }); ask();
})();

// ═══ Fondo vivo: las piezas blancas del cubo siguen flotando detrás de la página y responden al scroll ═══
(function(){
  const cv = document.getElementById('campo'), ctx = cv && cv.getContext('2d');
  if (!ctx) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, small = innerWidth < 768;
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const pieces = Array.from({ length: small ? 11 : 20 }, () => ({
    x: rnd(), y: rnd(), z: .35 + rnd() * .65, s: (small ? 40 : 60) + rnd() * (small ? 70 : 120),
    rx: rnd() * 6, ry: rnd() * 6, vx: (.03 + rnd() * .06) * (rnd() > .5 ? 1 : -1), vy: (.03 + rnd() * .06) * (rnd() > .5 ? 1 : -1), ph: rnd() * 6,
  })).sort((a, b) => a.z - b.z);
  const V = [[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]];
  const FACES = [[[4,5,6,7],[0,0,1]],[[1,0,3,2],[0,0,-1]],[[5,1,2,6],[1,0,0]],[[0,4,7,3],[-1,0,0]],[[3,7,6,2],[0,1,0]],[[0,1,5,4],[0,-1,0]]];
  const hero = document.getElementById('hero'), sv = document.getElementById('hacemos');
  let W = 0, H = 0, dpr = 1, last = 0, sy = scrollY;
  // el lienzo mide lo mismo con o sin la barra del navegador: cambiarlo lo borraría y movería todas las piezas
  function size(){
    const w = cv.clientWidth, h = cv.clientHeight; if (w === W && h === H) return;
    dpr = Math.min(devicePixelRatio || 1, small ? 1.5 : 1.75); W = w; H = h; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  addEventListener('resize', size, { passive: true }); size();
  const rot = (v, a, b) => { const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b); const y = v[1] * ca - v[2] * sa, z = v[1] * sa + v[2] * ca; return [v[0] * cb + z * sb, y, -v[0] * sb + z * cb]; };
  function draw(now){
    const t = now * .001, m = 200;
    ctx.clearRect(0, 0, W, H);
    for (const p of pieces) {
      const span = H + m * 2, a = p.rx + t * p.vx * .35 + sy * .0016, b = p.ry + t * p.vy * .35 + sy * .0012;
      const py = (((p.y * span - sy * p.z * .95 + Math.sin(t * .2 + p.ph) * 10) % span) + span) % span - m;
      const px = p.x * W + Math.cos(t * .15 + p.ph) * 12, size = p.s * p.z;
      const pts = V.map((v) => { const r = rot(v, a, b); return [px + r[0] * size, py + r[1] * size]; });
      ctx.globalAlpha = .34 + p.z * .3;
      for (const [idx, n] of FACES) {
        const nr = rot(n, a, b); if (nr[2] <= 0) continue;
        const light = Math.max(0, nr[0] * -.35 + nr[1] * -.55 + nr[2] * .76), g = Math.round(236 + light * 19);
        ctx.fillStyle = 'rgb(' + g + ',' + g + ',' + g + ')';
        ctx.strokeStyle = 'rgba(8,8,8,.03)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pts[idx[0]][0], pts[idx[0]][1]);
        for (let i = 1; i < 4; i++) ctx.lineTo(pts[idx[i]][0], pts[idx[i]][1]);
        ctx.closePath(); ctx.fill(); ctx.stroke();
      }
    }
  }
  if (reduce) { draw(0); addEventListener('scroll', () => { sy = scrollY; draw(0); }, { passive: true }); return; }
  function frame(now){
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const hb = hero.getBoundingClientRect(), sb = sv.getBoundingClientRect();
    // detrás del cubo y de los paneles no se ve: no se dibuja
    if (hb.bottom >= innerHeight || (sb.top <= 0 && sb.bottom >= innerHeight)) { sy = scrollY; return; }
    const diff = scrollY - sy, moving = Math.abs(diff) > .4;
    sy += diff * .13;
    if (!moving && now - last < 33) return;
    last = now; draw(now);
  }
  requestAnimationFrame(frame);
})();

// ═══ Catálogo: al bajar, los 47 productos pasan uno por uno; el del centro manda ═══
(function(){
  const sec = document.getElementById('px'), wheel = document.getElementById('px-wheel');
  if (!sec || !wheel) return;
  const items = Array.from(wheel.children), N = items.length;
  const mapEl = document.getElementById('px-map'), nEl = document.getElementById('px-n'), catEl = document.getElementById('px-cat'), descEl = document.getElementById('px-desc'), waEl = document.getElementById('px-wa'), seeEl = document.getElementById('px-see');
  const chips = Array.from(document.querySelectorAll('#px-chips button')), chipsWrap = document.getElementById('px-chips');
  const firstOf = {}; items.forEach((li, i) => { if (firstOf[li.dataset.cat] === undefined) firstOf[li.dataset.cat] = i; });
  const label = (num) => { const c = chips.find((b) => b.dataset.cat === num); return c ? c.textContent : ''; };
  const cells = items.map((li, i) => { const b = document.createElement('button'); b.type = 'button'; b.tabIndex = -1; b.addEventListener('click', () => goTo(i)); mapEl.appendChild(b); return b; });
  let pos = 0, target = 0, cur = -1, offs = [], visible = false;
  function span(){ return sec.offsetHeight - LVH(); }
  function goTo(i){ const top = sec.getBoundingClientRect().top + scrollY; scrollTo({ top: top + span() * (i / (N - 1)) + 1, behavior: 'smooth' }); }
  function layout(){
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    sec.style.height = Math.round(LVH() * (1 + (N - 1) * 0.15)) + 'px';
    measure();
  }
  function measure(){ let y = 0; offs = items.map((li) => { const h = li.offsetHeight, o = y + h / 2; y += h; return o; }); }
  function info(i){
    const li = items[i], slug = li.dataset.slug, lang2 = lang === 'en' ? 'En' : 'Es', name = li.firstElementChild.textContent;
    nEl.textContent = i + 1;
    catEl.textContent = label(li.dataset.cat);
    descEl.textContent = li.dataset['d' + lang2];
    waEl.href = wa((lang === 'es' ? 'Hola, me interesa solo este producto: "' + name + '". ¿Cómo empezamos?' : 'Hi, I am only interested in this product: "' + name + '". How do we start?') + origin('home/catalogo/' + slug));
    seeEl.href = '/productos/' + slug + '/?src=home-catalogo';
    cells.forEach((c, j) => c.className = j === i ? 'on' : j < i ? 'past' : '');
    chips.forEach((b) => {
      const on = b.dataset.cat === li.dataset.cat;
      if (on && !b.classList.contains('on')) chipsWrap.scrollTo({ left: b.offsetLeft - 16, behavior: 'smooth' });
      b.classList.toggle('on', on);
    });
    items.forEach((x, j) => x.classList.toggle('on', j === i));
  }
  window.__pxLang = () => { measure(); cur = -1; };
  chips.forEach((b) => b.addEventListener('click', () => goTo(firstOf[b.dataset.cat])));
  // tocar un nombre que no está al centro lo trae al centro; el del centro abre su ficha
  wheel.addEventListener('click', (e) => {
    const a = e.target.closest('a'); if (!a) return;
    const i = items.indexOf(a.parentElement);
    if (i !== Math.round(pos)) { e.preventDefault(); goTo(i); }
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { sec.classList.add('still'); info(0); return; }
  function read(){
    const r = sec.getBoundingClientRect(), sp = span();
    visible = r.bottom > -40 && r.top < innerHeight + 40;
    if (sp > 0) target = Math.min(1, Math.max(0, -r.top / sp)) * (N - 1);
    document.body.classList.toggle('in-px', r.top < 40 && r.bottom > LVH() * .6);
  }
  let lastW = innerWidth;
  addEventListener('resize', () => { if (innerWidth !== lastW) { lastW = innerWidth; layout(); } }, { passive: true });
  addEventListener('scroll', read, { passive: true });
  layout(); read();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  function frame(){
    requestAnimationFrame(frame);
    if (!visible && cur >= 0) return;
    pos += (target - pos) * 0.17;
    const f = Math.min(N - 1, Math.max(0, pos)), a = Math.floor(f), t = f - a, center = offs[a] + ((offs[Math.min(N - 1, a + 1)] || offs[a]) - offs[a]) * t;
    for (let i = 0; i < N; i++) {
      const d = Math.abs(i - f), li = items[i];
      if (d > 6) { if (li.__on !== false) { li.style.visibility = 'hidden'; li.__on = false; } continue; }
      if (li.__on !== true) { li.style.visibility = ''; li.__on = true; }
      const k = Math.min(d, 1);
      li.style.transform = 'translate3d(0,' + (offs[i] - li.offsetHeight / 2 - center).toFixed(1) + 'px,0) scale(' + (1 - k * 0.3).toFixed(3) + ')';
      li.style.opacity = Math.max(0, 1 - k * 0.72 - Math.max(d - 1, 0) * 0.09).toFixed(3);
    }
    const r = Math.round(f); if (r !== cur) { cur = r; info(r); }
  }
  requestAnimationFrame(frame);
})();

// ═══ Comentarios: uno a la vez; cada tramo de scroll trae el siguiente ═══
(function(){
  const sec = document.getElementById('voces'), items = Array.from(document.querySelectorAll('#voces .voz')), bar = document.getElementById('voces-bar'), head = document.getElementById('voces-head');
  if (!sec || !items.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { items.forEach((v) => v.classList.add('on')); return; }
  let cur = -1;
  function read(){
    const r = sec.getBoundingClientRect(), span = sec.offsetHeight - LVH();
    const p = span > 0 ? Math.min(.9999, Math.max(0, -r.top / span)) : 0, i = Math.floor(p * items.length);
    if (i !== cur) { cur = i; items.forEach((v, j) => v.classList.toggle('on', j === i)); head.classList.toggle('out', i > 0); if (bar) bar.style.width = ((i + 1) / items.length * 100) + '%'; }
  }
  addEventListener('scroll', read, { passive: true }); addEventListener('resize', read, { passive: true }); read();
})();

// ═══ "Así de simple": tipografía en movimiento dirigida por el scroll ═══
(function(){
  const sec = document.getElementById('simple'), h2 = document.getElementById('kin-h2');
  const steps = Array.from(document.querySelectorAll('.kin-step')), cta = document.getElementById('kin-cta');
  if (!sec || !h2) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let words = [];
  function split(){
    // envuelve cada palabra en un span, conservando <br> y los spans de estilo
    const walk = node => {
      Array.from(node.childNodes).forEach(n => {
        if (n.nodeType === 3){
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(pt => {
            if (!pt) return;
            if (/^\s+$/.test(pt)) frag.appendChild(document.createTextNode(pt));
            else { const w = document.createElement('span'); w.className = 'kin-w'; w.textContent = pt; frag.appendChild(w); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR' && !n.classList.contains('kin-w')) walk(n);
      });
    };
    if (!h2.querySelector('.kin-w')) walk(h2);
    words = Array.from(h2.querySelectorAll('.kin-w'));
  }
  window.__kinSplit = split; split();
  if (reduce) { words.forEach(w => w.classList.add('on')); steps.forEach(st => st.classList.add('on')); cta.classList.add('on'); return; }
  let last = -1;
  function frame(){
    requestAnimationFrame(frame);
    const r = sec.getBoundingClientRect(), span = sec.offsetHeight - LVH();
    if (r.bottom < 0 || r.top > innerHeight || span <= 0) return;
    const p = Math.min(1, Math.max(0, -r.top / span));
    const key = Math.round(p * 400);
    if (key === last) return; last = key;
    // 0-0.28 titular palabra a palabra · 0.3-0.84 los pasos · 0.86+ botón
    words.forEach((w, i) => w.classList.toggle('on', p > 0.03 + (i / Math.max(1, words.length)) * 0.25));
    const sp = (p - 0.30) / 0.54, n = steps.length;
    steps.forEach((st, i) => {
      const a = i / n, b = (i + 1) / n;
      st.classList.toggle('on', sp >= a && sp < b);
      st.classList.toggle('seen', sp >= b);
    });
    cta.classList.toggle('on', p > 0.86);
  }
  requestAnimationFrame(frame);
})();

// ═══ Mientras lo piensas: el rojo entra con el scroll, el contador sube y cada frase es un producto ═══
(function(){
  const sec = document.getElementById('nicho'), st = sec && sec.querySelector('.nicho-sticky');
  if (!sec || !st) return;
  const numEl = document.getElementById('nicho-num'), lineEl = document.getElementById('nicho-line'), linkEl = document.getElementById('nicho-link'), prodEl = document.getElementById('nicho-prod'), endEl = document.getElementById('nicho-end'), barEl = document.getElementById('nicho-bar'), srcEl = document.getElementById('nicho-fuente'), ctaEl = document.getElementById('nicho-cta');
  // Cifras REFERENCIALES para la vista previa. Antes de producción: fuente y año.
  // Cifras con fuente pública (año indicado). Si una fuente cambia, se cambia aquí y en General Brain/03-LINEA-A/FUENTES_cifras_home.md
  const ITEMS = [
    { slug: 'marketplace-y-ecommerce', n: 5500, es: ['millones de dólares se vendieron en línea en Ecuador en 2024.', 'Marketplace y e-commerce', 'CECE · UEES, estudio 2024'], en: ['million dollars were sold online in Ecuador in 2024.', 'Marketplace & e-commerce', 'CECE · UEES, 2024 study'] },
    { slug: 'whatsapp-business-commerce', n: 74, es: ['de cada 100 compradores en línea ya compran por WhatsApp.', 'WhatsApp Business Commerce', 'CECE · UEES, 2025'], en: ['out of 100 online shoppers already buy through WhatsApp.', 'WhatsApp Business Commerce', 'CECE · UEES, 2025'] },
    { slug: 'asistente-inteligente-whatsapp', n: 32, es: ['de cada 100 ecuatorianos ya usaron IA, como chatbots, para comprar en línea.', 'Asistente Inteligente 24/7', 'CECE · UEES, 2025'], en: ['out of 100 Ecuadorians already used AI, like chatbots, to shop online.', '24/7 AI Assistant', 'CECE · UEES, 2025'] },
    { slug: 'pagina-web', n: 28, es: ['de cada 100 mipymes tienen página web propia. El resto, todavía no.', 'Página Web', 'Pyme Digital · BID · ESPOL'], en: ['out of 100 small businesses have their own website. The rest, not yet.', 'Website', 'Pyme Digital · IDB · ESPOL'] },
    { slug: 'sistema-operativo', n: 68, es: ['de cada 100 empresas siguen en el nivel más bajo de madurez digital.', 'Sistema operativo de tu empresa', 'Pyme Digital · BID · ESPOL'], en: ['out of 100 companies remain at the lowest level of digital maturity.', 'Your company operating system', 'Pyme Digital · IDB · ESPOL'] },
    { slug: 'analisis-de-competencia', n: 1073524, es: ['empresas registradas en Ecuador. ¿Sabes cuáles compiten contigo?', 'Análisis de competencia', 'INEC · REEM 2024'], en: ['registered companies in Ecuador. Do you know which ones compete with you?', 'Competitor analysis', 'INEC · REEM 2024'] },
    { slug: 'registro-de-marca', n: 179775, es: ['marcas registradas y vigentes en Ecuador. ¿La tuya está?', 'Registro de marca', 'OMPI, 2024'], en: ['trademarks registered and in force in Ecuador. Is yours?', 'Trademark registration', 'WIPO, 2024'] },
    { slug: 'meta-ads', n: 6450000, es: ['personas usan Instagram en Ecuador.', 'Meta Ads', 'Meta · DataReportal, 2025'], en: ['people use Instagram in Ecuador.', 'Meta Ads', 'Meta · DataReportal, 2025'] },
    { slug: 'perfil-google-maps', n: 15200000, es: ['personas usan internet en Ecuador. Cuando buscan cerca, el mapa decide.', 'Perfil de Google Maps', 'DataReportal, 2025'], en: ['people use the internet in Ecuador. When they search nearby, the map decides.', 'Google Maps Profile', 'DataReportal, 2025'] },
    { slug: 'facturacion-electronica', n: 94, es: ['de cada 100 transacciones ya llegan al SRI en tiempo real.', 'Facturación electrónica', 'SRI · El Universo, 2026'], en: ['out of 100 transactions already reach the tax authority in real time.', 'Electronic invoicing', 'SRI · El Universo, 2026'] },
  ].filter((it) => ['whatsapp-business-commerce', 'pagina-web', 'meta-ads', 'marketplace-y-ecommerce'].includes(it.slug));
  const N = ITEMS.length;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v) => Math.min(1, Math.max(0, v)), sm = (u) => u * u * (3 - 2 * u), lp = (a, b, t) => a + (b - a) * t;
  const L = () => (document.documentElement.lang || 'es').startsWith('en') ? 'en' : 'es';
  const fmt = (n) => Math.round(n).toLocaleString(L() === 'en' ? 'en-US' : 'es-EC');
  let cur = -1, prog = 0, target = 0, swapT = 0;
  function show(i){
    const it = ITEMS[i], lang = L();
    lineEl.textContent = it[lang][0]; prodEl.textContent = it[lang][1]; linkEl.href = '/productos/' + it.slug + '/?src=home-nicho';
    srcEl.textContent = (lang === 'en' ? 'Source: ' : 'Fuente: ') + it[lang][2];
  }
  function layout(){ sec.style.height = reduce ? '' : Math.round(LVH() * (1 + N * 0.42 + 0.75)) + 'px'; }
  addEventListener('resize', layout, { passive: true }); layout();
  if (reduce) { show(N - 1); numEl.textContent = fmt(ITEMS[N - 1].n); endEl.classList.add('on'); ctaEl.classList.add('on'); return; }
  const redEl = document.getElementById('nx-red'), tunnel = document.getElementById('nx-tunnel'), inner = sec.querySelector('.nicho-inner'), numWrap = numEl.parentElement, barWrap = sec.querySelector('.nicho-bar');
  const squares = Array.from({ length: innerWidth < 768 ? 6 : 9 }, () => tunnel.appendChild(document.createElement('i')));
  let ent = 0, entT = 0, visible = false, wasVisible = false, kick = 0, hit = -1, lastClip = '';
  function read(){
    const r = sec.getBoundingClientRect(), vh = LVH(), span = sec.offsetHeight - vh;
    if (span > 0) target = clamp(-r.top / span);
    // el cuadro rojo nace antes de fijarse la sección y crece hasta llenar la pantalla
    entT = clamp((vh - r.top) / (vh * 1.2));
    visible = r.bottom > 0 && r.top < innerHeight;
    if (visible !== wasVisible) { wasVisible = visible; st.classList.toggle('nx-on', visible); }
    document.body.classList.toggle('in-nicho', r.top < vh * .1 && r.bottom > vh * .35);
  }
  addEventListener('scroll', read, { passive: true }); read();
  window.__nichoLang = () => { if (cur >= 0) show(cur); };
  function clipRed(p){
    const w = st.clientWidth, h = st.clientHeight, big = Math.max(w, h) * 0.52;
    const o = sm(ent) * big, a = sm(clamp((p - 0.93) / 0.07)) * big;
    const ox0 = Math.max(0, w / 2 - o), ox1 = Math.min(w, w / 2 + o), oy0 = Math.max(0, h / 2 - o), oy1 = Math.min(h, h / 2 + o);
    let v;
    if (o >= big * 0.999 && a <= 0.5) v = 'none';
    else if (a > 0.5) { // al final se abre un cuadro en el centro y se sale al otro lado
      const ix0 = Math.max(0, w / 2 - a), ix1 = Math.min(w, w / 2 + a), iy0 = Math.max(0, h / 2 - a), iy1 = Math.min(h, h / 2 + a);
      v = 'polygon(evenodd,' + [[ox0,oy0],[ox1,oy0],[ox1,oy1],[ox0,oy1],[ox0,oy0],[ix0,iy0],[ix1,iy0],[ix1,iy1],[ix0,iy1],[ix0,iy0]].map((q) => q[0].toFixed(1) + 'px ' + q[1].toFixed(1) + 'px').join(',') + ')';
    } else v = 'inset(' + oy0.toFixed(1) + 'px ' + (w - ox1).toFixed(1) + 'px ' + (h - oy1).toFixed(1) + 'px ' + ox0.toFixed(1) + 'px)';
    if (v !== lastClip) { redEl.style.clipPath = v; lastClip = v; }
  }
  function paint(now){
    const p = prog, time = now * 0.001;
    clipRed(p);
    const show_ = clamp((ent - 0.82) / 0.14) * (1 - clamp((p - 0.9) / 0.03));
    const q = clamp(p / 0.72), pos = q * N, i = Math.min(N - 1, Math.floor(pos)), t = pos - i;
    if (i !== cur) { cur = i; lineEl.classList.add('swap'); linkEl.classList.add('swap'); clearTimeout(swapT); swapT = setTimeout(() => { show(i); lineEl.classList.remove('swap'); linkEl.classList.remove('swap'); }, 160); }
    // cada cifra viene desde el fondo contando, golpea al llegar y sigue de largo hacia la cámara
    const to = ITEMS[i].n, u = 1 - Math.pow(1 - clamp(0.14 + t / 0.4), 3);
    numEl.textContent = fmt(to * u);
    if (u >= 0.999 && hit !== i) { hit = i; kick = 1; }
    if (u < 0.999 && hit === i) hit = -1;
    const come = 1 - Math.pow(1 - clamp(t / 0.3), 3), go = i < N - 1 ? clamp((t - 0.88) / 0.12) : 0;
    numWrap.style.transform = 'scale(' + ((0.5 + come * 0.5) * (1 + go * go * 1.1) * (1 + kick * 0.07)).toFixed(3) + ')';
    numWrap.style.opacity = (clamp(t / 0.1) * (1 - go)).toFixed(3);
    barEl.style.width = (q * 100).toFixed(2) + '%';
    endEl.classList.toggle('on', p > 0.75); ctaEl.classList.toggle('on', p > 0.79);
    // la pantalla vibra: poco mientras cuenta o se baja, un golpe seco cuando la cifra aterriza
    const speed = Math.min(1, Math.abs(target - prog) * 90), amp = (kick * 7 + speed * 2.4 + (u < 0.999 ? 0.7 : 0)) * show_;
    const sx = (Math.random() - 0.5) * amp, sy = (Math.random() - 0.5) * amp;
    inner.style.opacity = show_.toFixed(3);
    inner.style.transform = 'translate3d(' + sx.toFixed(2) + 'px,' + sy.toFixed(2) + 'px,0)';
    barWrap.style.opacity = show_.toFixed(3);
    // túnel de cuadros: bajar empuja hacia adentro
    const phase = time * 0.035 + p * 4.6;
    tunnel.style.transform = 'translate3d(' + (-sx * 1.6).toFixed(2) + 'px,' + (-sy * 1.6).toFixed(2) + 'px,0) scale(' + (1 + kick * 0.03).toFixed(3) + ')';
    squares.forEach((el, k) => {
      const d = ((k / squares.length + phase) % 1 + 1) % 1, sc = 0.03 + Math.pow(d, 2.5) * 2.3;
      el.style.transform = 'scale(' + sc.toFixed(4) + ')';
      el.style.opacity = (Math.min(1, d * 4) * (1 - Math.pow(d, 5))).toFixed(3);
    });
    kick *= 0.87; if (kick < 0.01) kick = 0;
  }
  function frame(now){
    requestAnimationFrame(frame);
    prog += (target - prog) * 0.14; ent += (entT - ent) * 0.2;
    if (visible) paint(now);
    else if (cur < 0) { cur = 0; show(0); numEl.textContent = fmt(ITEMS[0].n * .14); }
  }
  requestAnimationFrame(frame);
})();

// ═══ Cadena "Empresas": avanza sola en bucle; el scroll la empuja; se frena al tocar o pasar el cursor ═══
(function(){
  const sec = document.getElementById('work'), grid = document.getElementById('work-grid');
  if (!sec || !grid) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  let half = 0, x = 0, speed = 0, baseSpeed = 38, lastY = scrollY, lastT = performance.now(), hover = false, visible = true, pinTravel = 0, pinX = 0;
  function setup(){
    // duplica la cadena una sola vez para que el bucle no tenga costura
    if (!grid.dataset.looped){
      const items = Array.from(grid.children);
      items.forEach(el => { const c = el.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.classList.add('dup'); grid.appendChild(c); });
      grid.dataset.looped = '1';
    }
    const items = Array.from(grid.children);
    const n = items.length / 2;
    half = items.slice(0, n).reduce((w, el) => w + el.getBoundingClientRect().width, 0) + 22 * n;
    // tramo fijo: unas tres tarjetas de recorrido obligado
    const cardW = items[0] ? items[0].getBoundingClientRect().width + 22 : 600;
    pinTravel = Math.round(cardW * 3);
    sec.style.height = (LVH() + pinTravel) + 'px';
  }
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(sec);
  grid.addEventListener('pointerenter', () => { hover = true; });
  grid.addEventListener('pointerleave', () => { hover = false; });
  // arrastre con mouse o dedo: la cadena sigue la mano y conserva el impulso al soltar
  let drag = false, dragX = 0, dragVel = 0, dragT = 0, moved = 0, fling = 0;
  grid.style.touchAction = 'pan-y';
  grid.addEventListener('pointerdown', e => { drag = true; moved = 0; dragX = e.clientX; dragT = performance.now(); dragVel = 0; fling = 0; try { grid.setPointerCapture(e.pointerId); } catch(_){} });
  grid.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - dragX, now = performance.now();
    x += dx; moved += Math.abs(dx);
    dragVel = dx / Math.max(1, now - dragT) * 1000; dragX = e.clientX; dragT = now;
    if (x <= -half) x += half; if (x > 0) x -= half;
    grid.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
  });
  const endDrag = e => { if (!drag) return; drag = false; fling = -dragVel; try { grid.releasePointerCapture(e.pointerId); } catch(_){} };
  grid.addEventListener('pointerup', endDrag); grid.addEventListener('pointercancel', endDrag);
  grid.addEventListener('click', e => { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, true);
  // tocar una tarjeta muestra u oculta su texto (en escritorio basta con detener el cursor encima)
  grid.addEventListener('click', e => {
    if (e.target.closest('a, button')) return;
    const card = e.target.closest('.work-card'); if (!card) return;
    const open = card.classList.contains('open');
    grid.querySelectorAll('.work-card.open').forEach(c => c.classList.remove('open'));
    if (!open) card.classList.add('open');
  });
  window.addEventListener('resize', setup, { passive: true });
  window.__railMeasure = setup;
  function loop(now){
    requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    if (!half || !visible) return;
    // el scroll empuja la cadena en el sentido del desplazamiento
    const dy = scrollY - lastY; lastY = scrollY;
    // mientras la sección está fija, el scroll vertical es el que recorre la cadena
    const r = sec.getBoundingClientRect(), span = sec.offsetHeight - LVH();
    const pinP = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    const wantPin = -pinP * pinTravel;
    const pinDelta = wantPin - pinX; pinX = wantPin;
    x += pinDelta;
    if (drag) return;
    // el scroll empuja fuerte; al soltar un arrastre, la cadena conserva el impulso y se frena sola
    fling *= 0.94;
    const pinned = pinP > 0 && pinP < 1;
    const target = (hover || pinned ? 4 : baseSpeed) + (pinned ? 0 : Math.max(-1400, Math.min(1400, dy * 48))) + fling;
    speed += (target - speed) * 0.12;
    x -= speed * dt;
    if (x <= -half) x += half;
    if (x > 0) x -= half;
    grid.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
  }
  setTimeout(setup, 80);
  requestAnimationFrame(loop);
})();

// Drag-to-scroll + progreso de la galería horizontal
function bindHScroll(){
  const sc = document.getElementById('hscroll');
  const fill = document.getElementById('hscroll-fill');
  const count = document.getElementById('hscroll-count');
  let down = false, startX = 0, startLeft = 0, moved = false;
  sc.addEventListener('pointerdown', e => {
    down = true; moved = false; startX = e.clientX; startLeft = sc.scrollLeft;
    sc.style.scrollSnapType = 'none';
    sc.setPointerCapture(e.pointerId);
  });
  sc.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 6) moved = true;
    sc.scrollLeft = startLeft - dx;
  });
  const up = e => {
    if (!down) return;
    down = false;
    try { sc.releasePointerCapture(e.pointerId); } catch(_){}
    // reactivar snap suavemente hacia la tarjeta más cercana
    const card = sc.querySelector('.h-card');
    if (card){
      const w = card.offsetWidth + 22;
      const target = Math.round(sc.scrollLeft / w) * w;
      const t0 = performance.now(), from = sc.scrollLeft;
      (function settle(tm){
        const p = Math.min((tm - t0) / 320, 1);
        sc.scrollLeft = from + (target - from) * (1 - Math.pow(1 - p, 3));
        if (p < 1) RAF(settle);
        else sc.style.scrollSnapType = '';
      })(t0);
    } else sc.style.scrollSnapType = '';
  };
  sc.addEventListener('pointerup', up);
  sc.addEventListener('pointercancel', up);
  sc.addEventListener('click', e => { if (moved){ e.preventDefault(); e.stopPropagation(); } }, true);
  sc.addEventListener('scroll', () => {
    const max = sc.scrollWidth - sc.clientWidth;
    if (max <= 0) return;
    const p = sc.scrollLeft / max;
    fill.style.width = (p * 100) + '%';
    const idx = Math.min(COMPANIES.length, Math.max(1, Math.round(p * (COMPANIES.length - 1)) + 1));
    count.textContent = `0${idx} / 0${COMPANIES.length}`;
  }, { passive: true });
  sc.dispatchEvent(new Event('scroll'));
}

// ═══ Reel (showreel tipo stories) ═══
let reelIdx = 0, reelTimer = null;
function renderReel(){
  document.getElementById('reel-progress').innerHTML = COMPANIES.map((_, i) =>
    `<div class="reel-seg" data-r="${i}"><div class="reel-seg-fill"></div></div>`).join('');
  document.getElementById('reel-slides').innerHTML = COMPANIES.map((c, i) => `
    <div class="reel-slide" data-rs="${i}" style="background:radial-gradient(90% 90% at 50% 30%, #ffffff 0%, #f1f1ef 70%)">
      <div class="reel-visual">${c.slides[0][1]}</div>
      <div>
        <div class="reel-name">${i === COMPANIES.length - 1 ? c.name : c.name}<span class="serif">.</span></div>
      </div>
      <div class="reel-kind">${t(c.kind)}</div>
    </div>`).join('');
  document.getElementById('reel-hint').textContent = UI.reel_hint[lang];
}
function reelShow(i){
  reelIdx = i;
  document.querySelectorAll('.reel-slide').forEach(s => s.classList.toggle('on', +s.dataset.rs === i));
  document.querySelectorAll('.reel-seg').forEach((s, si) => {
    s.classList.toggle('done', si < i);
    const f = s.querySelector('.reel-seg-fill');
    f.style.transition = 'none';
    f.style.width = si < i ? '100%' : '0';
    if (si === i){
      void f.offsetWidth;
      f.style.transition = 'width 3s linear';
      f.style.width = '100%';
    }
  });
  clearTimeout(reelTimer);
  reelTimer = setTimeout(() => {
    if (reelIdx < COMPANIES.length - 1) reelShow(reelIdx + 1);
    else closeReel();
  }, 3000);
}
function openReel(){
  renderReel();
  document.getElementById('reel').classList.add('open');
  document.body.style.overflow = 'hidden';
  reelShow(0);
}
function closeReel(){
  clearTimeout(reelTimer);
  document.getElementById('reel').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('reel-close').addEventListener('click', closeReel);
document.getElementById('reel').addEventListener('click', e => {
  if (e.target.id === 'reel-close') return;
  if (reelIdx < COMPANIES.length - 1) reelShow(reelIdx + 1); else closeReel();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeReel(); });

// ═══ Custom cursor ═══
(function(){
  if (matchMedia('(pointer:coarse)').matches) return;
  const cur = document.getElementById('cursor');
  const txt = document.getElementById('cursor-text');
  let tx = -100, ty = -100, x = -100, y = -100;
  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    const overDrag = e.target.closest('.hscroll');
    const overPlay = e.target.closest('#video-wrap');
    const overDark = e.target.closest('#hero, #blackbox, #reel, .waw-head');
    const overLink = e.target.closest('a, button, select, .chip, .phase-btn, .g-dot, .ba-stage');
    cur.classList.toggle('label', !!(overDrag || overPlay));
    txt.textContent = overPlay ? UI.cur_play[lang] : overDrag ? UI.cur_drag[lang] : '';
    cur.classList.toggle('hov', !!overLink && !overDrag && !overPlay);
    cur.classList.toggle('dark', !!overDark);
  });
  (function loop(){
    x += (tx - x) * .2; y += (ty - y) * .2;
    cur.style.transform = `translate(${x}px,${y}px)`;
    RAF(loop);
  })();
})();

// ═══ Black box FAB: partículas absorbidas por el cubo ═══
(function(){
  const cv = document.getElementById('fab-px');
  const ctx = cv.getContext('2d');
  const fab = document.getElementById('wa-fab');
  const DPR = Math.min(devicePixelRatio, 2);
  cv.width = 190 * DPR; cv.height = 190 * DPR;
  let px = [];
  function spawn(){
    const a = Math.random() * Math.PI * 2;
    const r = 78 + Math.random() * 16;
    return { a, r, spd: .55 + Math.random() * .75, red: Math.random() < .3, s: (2 + Math.random() * 2.4) * DPR };
  }
  for (let i = 0; i < 22; i++){ const p = spawn(); p.r = 20 + Math.random() * 74; px.push(p); }
  function center(){
    const fr = fab.getBoundingClientRect();
    const cr = cv.getBoundingClientRect();
    return { x: (fr.left + fr.width / 2 - cr.left) * DPR, y: (fr.top + fr.height / 2 - 6 - cr.top) * DPR };
  }
  function tick(){
    ctx.clearRect(0, 0, cv.width, cv.height);
    const c = center();
    if (!document.body.contains(fab)) return;
    const open = fab.classList.contains('open');
    for (const p of px){
      p.r -= p.spd;
      p.a += .012;
      if (p.r < 9){ Object.assign(p, spawn()); }
      const x = c.x + Math.cos(p.a) * p.r * DPR;
      const y = c.y + Math.sin(p.a) * p.r * DPR * .9;
      const near = 1 - Math.min(p.r / 90, 1);
      const alpha = open ? 0 : (.15 + near * .7);
      ctx.fillStyle = p.red ? `rgba(229,57,53,${alpha})` : `rgba(10,10,12,${alpha * .8})`;
      const s = p.s * (.5 + near * .8);
      ctx.fillRect(Math.round(x / s) * s, Math.round(y / s) * s, s, s);
    }
    RAF(tick);
  }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) tick();
})();

// ═══ Burbujas periódicas del cubo ═══
(function(){
  const b = document.getElementById('wa-bubble');
  const txt = document.getElementById('wa-bubble-text');
  let i = 0;
  function show(){
    if (waWidget.classList.contains('open') || !document.body.classList.contains('past-hero')) return;
    txt.textContent = UI.bubbles[lang][i % UI.bubbles[lang].length];
    i++;
    b.classList.add('on');
    setTimeout(() => b.classList.remove('on'), 4200);
  }
  // Una sola vez y solo si la persona se detuvo: repetirla cada 14 s interrumpía la lectura.
  let quieto = 0;
  const espera = () => {
    clearTimeout(quieto);
    quieto = setTimeout(() => {
      const foco = document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
      if (foco || !document.body.classList.contains('past-hero')) return espera();
      removeEventListener('scroll', espera);
      show();
    }, 25000);
  };
  addEventListener('scroll', espera, { passive: true });
  espera();
  b.addEventListener('click', () => { b.classList.remove('on'); waFab.click(); });
})();

// ═══ Botones magnéticos ═══
(function(){
  if (matchMedia('(pointer:coarse)').matches) return;
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.btn-primary, .nav-cta, #wa-fab').forEach(b => {
      const r = b.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d < 110){
        const pull = (110 - d) / 110 * 7;
        b.style.translate = `${dx / d * pull}px ${dy / d * pull}px`;
      } else b.style.translate = '';
    });
  });
})();
function bindBA(){
  const stage = document.getElementById('ba-stage');
  const after = document.getElementById('ba-after');
  const divider = document.getElementById('ba-divider');
  const handle = document.getElementById('ba-handle');
  function setPos(pct){
    pct = Math.max(2, Math.min(98, pct));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    divider.style.left = pct + '%';
    handle.style.left = pct + '%';
  }
  function fromEvent(e){
    const r = stage.getBoundingClientRect();
    setPos((e.clientX - r.left) / r.width * 100);
  }
  let dragging = false;
  stage.addEventListener('pointerdown', e => { dragging = true; fromEvent(e); stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', e => { if (dragging) fromEvent(e); });
  stage.addEventListener('pointerup', () => dragging = false);
  stage.addEventListener('pointercancel', () => dragging = false);
}

// ═══ Galleries ═══
function setSlide(gi, si){
  galleryState[gi] = si;
  document.querySelectorAll(`.gallery[data-g="${gi}"]`).forEach(gal => {
    gal.querySelectorAll('.g-slide').forEach(sl => {
      const idx = +sl.dataset.s;
      sl.classList.toggle('on', idx === si);
      sl.classList.toggle('off', idx < si || (si === 0 && idx === COMPANIES[gi].slides.length - 1));
    });
    gal.querySelectorAll('.g-dot').forEach(d => d.classList.toggle('on', +d.dataset.s === si));
    const tag = gal.querySelector('.g-tag'); if (tag) tag.textContent = t(COMPANIES[gi].slides[si][0]);
  });
}
document.addEventListener('click', e => {
  const dot = e.target.closest('.g-dot');
  if (dot){ setSlide(+dot.dataset.g, +dot.dataset.s); resetGalleryTimer(); }
});
let galleryTimer;
function resetGalleryTimer(){
  clearInterval(galleryTimer);
  galleryTimer = setInterval(() => {
    COMPANIES.forEach((c, gi) => {
      const gal = document.querySelector(`.gallery[data-g="${gi}"]`);
      if (gal && gal.matches(':hover')) return;
      setSlide(gi, (galleryState[gi] + 1) % c.slides.length);
    });
  }, 3600);
}
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) resetGalleryTimer();

// (el swipe interno de cada galería se eliminó: chocaba con el drag del carrusel;
//  los slides se cambian con los puntos o rotan solos)

// ═══ Terminal typing ═══
let termLi = 0, termCi = 0, termDel = false, termTimer = null;
function termStep(){
  const lines = TERM[lang];
  const el = document.getElementById('bb-type');
  if (!el) return;
  const line = lines[termLi % lines.length];
  if (!termDel){
    termCi++;
    el.textContent = line.slice(0, termCi);
    if (termCi >= line.length){ termDel = true; termTimer = setTimeout(termStep, 2100); return; }
    termTimer = setTimeout(termStep, 34 + Math.random() * 40);
  } else {
    termCi -= 3;
    if (termCi <= 0){ termCi = 0; termDel = false; termLi = (termLi + 1) % lines.length; }
    el.textContent = line.slice(0, Math.max(0, termCi));
    termTimer = setTimeout(termStep, 14);
  }
}
termStep();

// ═══ Lang toggle ═══
function applyLang(){
  applyStatics();
  renderH1();
  renderMarquee();
  renderRail();
  renderWork();
  renderTop();
  watchTop();
  if (activePhase !== null) renderPanel(activePhase);
  clearTimeout(termTimer); termCi = 0; termDel = false; termStep();
  if (window.__tyApply) window.__tyApply();
}
document.getElementById('mm-lang').addEventListener('click', () => document.getElementById('lang-toggle').click());
document.getElementById('lang-toggle').addEventListener('click', () => {
  lang = lang === 'es' ? 'en' : 'es';
  applyLang();
});

// ═══ Mobile menu ═══
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
function toggleMenu(force){
  const open = force !== undefined ? force : !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => toggleMenu());
mobileMenu.addEventListener('click', e => { if (e.target.closest('a')) toggleMenu(false); });

// ═══ WA FAB ═══
const waFab = document.getElementById('wa-fab');
const waWidget = document.getElementById('wa-widget');
waFab.addEventListener('click', () => {
  const open = !waWidget.classList.contains('open');
  waWidget.classList.toggle('open', open);
  waFab.classList.toggle('open', open);
});
document.addEventListener('click', e => {
  if (!waWidget.classList.contains('open')) return;
  if (e.target.closest('#wa-widget') || e.target.closest('#wa-fab')) return;
  waWidget.classList.remove('open');
  waFab.classList.remove('open');
});

// ═══ Video → abre el reel de proyectos ═══
const vwEl = document.getElementById('video-wrap'); if (vwEl) vwEl.addEventListener('click', openReel);

// ═══ Smooth internal navigation ═══
function smoothTo(sel){
  const el = document.querySelector(sel);
  if (!el) return;
  const scroller = document.scrollingElement || document.documentElement;
  const start = scroller.scrollTop;
  const end = el.getBoundingClientRect().top + start - 70;
  const dur = 750, t0 = performance.now();
  (function step(tm){
    const p = Math.min((tm - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    scroller.scrollTop = start + (end - start) * e;
    if (p < 1) RAF(step);
  })(t0);
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = a.getAttribute('href');
  if (target.length > 1 && document.querySelector(target)){
    e.preventDefault();
    smoothTo(target);
  }
});

// ═══ 3D tilt ═══
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.tilt');
    document.querySelectorAll('.tilt').forEach(c => { if (c !== card) c.style.transform = ''; });
    if (!card) return;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - .5) * -6;
    const ry = ((e.clientX - r.left) / r.width - .5) * 6;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
})();

// ═══ Contact form → WhatsApp ═══
document.getElementById('contact-form').addEventListener('focusin', () => { if (window.bieTrack) bieTrack('form_start'); }, { once: true });
// los campos de la frase crecen con lo que escribes
(function(){
  const fit = (el) => { const n = Math.max((el.value || el.placeholder || '').length, 4); el.style.width = (n * 0.7 + 1.6).toFixed(2) + 'ch'; };
  document.querySelectorAll('.ml-field input').forEach((el) => { fit(el); el.addEventListener('input', () => fit(el)); });
  const ta = document.getElementById('in-msg');
  const grow = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
  ta.addEventListener('input', grow); grow();
})();
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const name = (d.get('name') || '').toString().trim();
  const phone = (d.get('phone') || '').toString().trim();
  const company = (d.get('company') || '').toString().trim();
  const need = (d.get('need') || '').toString();
  const message = (d.get('message') || '').toString().trim();
  const msg = FORM_WA[lang](name, company, need, message);
  if (window.bieTrack) bieTrack('form_submit', { meta: { lead: { name, phone, company, service_interest: need, message } } });
  window.open(wa(msg + origin('home/formulario')), '_blank');
});

// ═══ Hero entrance + counters ═══
setTimeout(() => {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const t0 = performance.now();
    (function step(tm){
      const p = Math.min((tm - t0) / 1300, 1);
      el.textContent = (el.dataset.plus ? '+' : '') + Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) RAF(step);
    })(t0);
  });
}, 120);

// ═══ Smart scroll ═══
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');

const SECTIONS = ['work','productos','top'].map(id => document.getElementById(id));
window.addEventListener('scroll', () => {
  const scroller = document.scrollingElement || document.documentElement;
  const sc = scroller.scrollTop;
  nav.classList.toggle('scrolled', sc > 40);
  const navDy = sc - (window.__navY || 0);
  if (Math.abs(navDy) > 6) { document.body.classList.toggle('nav-up', navDy < 0); window.__navY = sc; }
  progress.style.width = (sc / (scroller.scrollHeight - innerHeight) * 100) + '%';
  nav.classList.add('dark-zone');
  const hr = document.getElementById('hero').getBoundingClientRect();
  document.body.classList.toggle('past-hero', hr.bottom < innerHeight * .35);
  let current = null;
  for (const s of SECTIONS){
    const sr = s.getBoundingClientRect();
    if (sr.top < innerHeight * .45 && sr.bottom > innerHeight * .3) current = s.id;
  }
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.sec === current));
}, { passive: true });

// ═══ Los más pedidos: encendido rojo al cruzar el centro ═══
const litObs = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('lit', e.isIntersecting)),
  { rootMargin: '-38% 0px -38% 0px', threshold: 0 });
function watchTop(){ document.querySelectorAll('.top-tile').forEach(el => litObs.observe(el)); }
watchTop();

// ═══ Scroll reveal ═══
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ═══ Init ═══
document.getElementById('nav').classList.add('dark-zone');
let __ready = false;
const __start = () => { if (__ready) return; __ready = true; applyStatics(); renderH1(); renderMarquee(); renderRail(); renderWork(); renderTop(); };
requestAnimationFrame(() => setTimeout(__start, 0));
setTimeout(__start, 800);

// ═══ Tu negocio: el nombre que escribe el visitante aparece en los cuatro productos ═══
// Nada de esto sale del navegador: el nombre solo viaja si la persona abre WhatsApp o envía el formulario.
(function(){
  const input = document.getElementById('ty-in'), sec = document.getElementById('tuyo');
  if (!input || !sec) return;
  const row = document.getElementById('ty-row'), btn = document.getElementById('ty-wa'), btnN = document.getElementById('ty-wa-n');
  const titulo = document.querySelector('#contact .section-h2'), empresa = document.getElementById('in-comp');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const KEY = 'bie_tuyo', DEMO = ['Panadería Rosita', 'Consultorio Sonríe', 'Ferretería El Clavo', 'Moda Amaru'];
  let nombre = '';
  try { nombre = (sessionStorage.getItem(KEY) || '').slice(0, 40); } catch (e) {}
  if (nombre) input.value = nombre;
  const limpio = () => nombre.replace(/\s+/g, ' ').trim();
  const esc = (x) => x.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const dominio = (x) => x.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '').slice(0, 24);

  function pinta(x){
    const v = x || (lang === 'es' ? 'Tu negocio' : 'Your business');
    sec.querySelectorAll('[data-ty]').forEach((el) => { el.textContent = v; });
    sec.querySelector('[data-ty-dom]').textContent = (dominio(x) || (lang === 'es' ? 'tunegocio' : 'yourbusiness')) + '.ec';
    const f = v.length <= 13 ? 30 : v.length <= 20 ? 24 : v.length <= 30 ? 19 : 16;
    sec.querySelector('.ty-marca').style.setProperty('--ty-f', f + 'px');
  }
  function aplica(){
    const n = limpio();
    if (!demoOn) pinta(n);
    btnN.textContent = n || (lang === 'es' ? 'mi negocio' : 'my business');
    btn.href = wa((lang === 'es'
      ? 'Hola, tengo ' + (n || 'un negocio') + '. Vi en su página cómo se vería y quiero saber más. Vendo: '
      : 'Hi, I run ' + (n || 'a business') + '. I saw on your site how it would look and want to know more. I sell: ') + origin('home/tuyo'));
    const hero = document.getElementById('hero-wa');
    if (hero) hero.href = wa((lang === 'es'
      ? 'Hola, tengo ' + (n || 'un negocio') + '. Vendo: '
      : 'Hi, I run ' + (n || 'a business') + '. I sell: ') + origin('home/hero'));
    if (titulo) {
      const base = UI.ct_h2[lang], html = n
        ? base.replace('Cuéntanos qué vendes.', 'Cuéntanos qué vende ' + esc(n) + '.').replace('Tell us what you sell.', 'Tell us what ' + esc(n) + ' sells.')
        : base;
      if (titulo.innerHTML !== html) titulo.innerHTML = html;
    }
    if (empresa && n && (!empresa.value || empresa.dataset.ty === '1')) { empresa.value = n; empresa.dataset.ty = '1'; }
    if (!input.value) input.placeholder = UI.ty_ph[lang];
  }

  // Mientras nadie escribe, la sección se escribe sola para que se entienda la idea.
  let demoOn = false, demoT = 0, di = 0, ci = 0, borra = false;
  function paso(){
    if (!demoOn) return;
    const w = DEMO[di % DEMO.length];
    ci += borra ? -1 : 1;
    const parte = w.slice(0, ci);
    input.placeholder = parte || ' ';
    pinta(parte);
    let t = borra ? 26 : 72;
    if (!borra && ci >= w.length) { borra = true; t = 2800; }
    else if (borra && ci <= 0) { borra = false; di++; t = 320; }
    demoT = setTimeout(paso, t);
  }
  function demo(on){
    if (on === demoOn) return;
    demoOn = on;
    clearTimeout(demoT);
    if (on) { ci = 0; borra = false; paso(); }
    else aplica();
  }

  // En teléfono las tarjetas pasan solas hasta que la persona las toca.
  const cards = Array.from(row.children);
  let auto = !reduce, ai = 0, autoT = 0;
  const avanza = () => {
    if (!auto || row.scrollWidth <= row.clientWidth + 4) return;
    ai = (ai + 1) % cards.length;
    row.scrollTo({ left: cards[ai].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
  };
  ['touchstart', 'pointerdown', 'wheel'].forEach((e) => row.addEventListener(e, () => { auto = false; }, { passive: true, once: true }));

  let visible = false;
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    clearInterval(autoT);
    if (visible) autoT = setInterval(avanza, 3800);
    demo(visible && !reduce && !limpio() && document.activeElement !== input);
  }, { threshold: 0.2 }).observe(sec);

  let contado = false;
  input.addEventListener('focus', () => { demo(false); input.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' }); });
  input.addEventListener('blur', () => demo(visible && !reduce && !limpio()));
  input.addEventListener('input', () => {
    nombre = input.value.slice(0, 40);
    try { sessionStorage.setItem(KEY, nombre); } catch (e) {}
    // Solo se cuenta que alguien escribió; el nombre nunca se envía.
    if (!contado && limpio()) { contado = true; if (window.bieTrack) window.bieTrack('quiz_step', { meta: { step: 'tuyo', host: location.hostname } }); }
    aplica();
  });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); } });

  window.__tyApply = aplica;
  aplica();
})();

// El formulario ya es el contacto: el cubo flotante no debe pisar su botón.
(function(){
  const form = document.getElementById('contact');
  if (form) new IntersectionObserver(([e]) => document.body.classList.toggle('in-contact', e.isIntersecting), { threshold: 0.15 }).observe(form);
})();

// ═══ Hasta dónde llega cada visita ═══
// Un solo evento al salir de la página: una llamada por sección gastaría funciones de Netlify sin necesidad.
(function(){
  const ORDEN = ['hero', 'hacemos', 'tuyo', 'productos', 'work', 'voces', 'top', 'catalog', 'simple', 'estrella', 'nicho', 'contact'];
  const vistas = new Set(['hero']);
  let enviadas = 0;
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) vistas.add(e.target.id); }), { rootMargin: '-50% 0px -50% 0px' });
  ORDEN.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  const envia = () => {
    if (vistas.size <= enviadas || !window.bieTrack) return;
    enviadas = vistas.size;
    window.bieTrack('section_reach', { meta: { secciones: ORDEN.filter((id) => vistas.has(id)), host: location.hostname } });
  };
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') envia(); });
  addEventListener('pagehide', envia);
})();
