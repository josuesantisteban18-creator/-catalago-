import { Product, AdCampaign, LeadContact, EmailSequence, SegmentationInfo } from '../types';

export const SEGMENTACION_OFICIAL: SegmentationInfo = {
  publico: 'jóvenes de la región Lambayeque',
  edad: '18 a 35 años',
  palabrasClave: ['ropa urbana', 'streetwear', 'hoodies', 'cortavientos', 'moda Chiclayo'],
  hashtags: ['#UrbanVibes', '#Streetwear', '#ModaUrbana', '#InviernoUrbano', '#Chiclayo'],
  sector: 'moda y retail (ropa urbana)',
  fuenteInei: 'INEI - Estimaciones y Proyecciones de Población: Región Lambayeque (Rango 18-35 años)'
};

export const BRAND_COLORS = [
  { name: 'Negro carbón', hex: '#111111' },
  { name: 'Gris asfalto', hex: '#3A3F47' },
  { name: 'Blanco hueso', hex: '#F5F5F0' },
  { name: 'Naranja eléctrico', hex: '#FF5A1F' },
  { name: 'Turquesa neón', hex: '#00C2B8' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'uv-w01',
    name: 'CyberPuffer Tech-Winter Jacket',
    subtitle: 'Chaqueta Impermeable Cortaviento con Forro Polar Térmico',
    category: 'chaquetas',
    price: 89.0,
    pricePen: 335.0,
    originalPrice: 119.0,
    originalPricePen: 449.0,
    badge: 'HOT DROP',
    isWaterproof: true,
    isThermal: true,
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Nuestra prenda insignia de la Colección Invierno 2024. Diseñada con tecnología de membrana tricapa hidrorepelente (10,000 mm), costuras termoselladas y relleno térmico ecológico que te protege del frío y viento húmedo en la costa norte sin perder el corte holgado streetwear.',
    features: [
      'Membrana exterior 100% impermeable y cortaviento',
      'Aislante térmico ultra liviano con forro polar interior',
      'Capucha desmontable con ajustadores metálicos cromados',
      'Bolsillos tácticos frontales con cierres herméticos YKK',
      'Detalles reflectivos 3M en pecho y mangas para visibilidad urbana nocturna'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro carbón', hex: '#111111' },
      { name: 'Gris asfalto', hex: '#3A3F47' },
      { name: 'Blanco hueso', hex: '#F5F5F0' },
      { name: 'Naranja eléctrico', hex: '#FF5A1F' },
      { name: 'Turquesa neón', hex: '#00C2B8' }
    ],
    rating: 4.9,
    reviewsCount: 128,
    stock: 24
  },
  {
    id: 'uv-w02',
    name: 'Oversized Acid-Wash Winter Hoodie',
    subtitle: 'Polerón Pesado 420 GSM Algodón Peinado con Interior Frisado',
    category: 'hoodies',
    price: 54.0,
    pricePen: 205.0,
    originalPrice: 68.0,
    originalPricePen: 259.0,
    badge: 'POPULAR',
    isThermal: true,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'El hoodie definitivo para el invierno urbano en Chiclayo y Lambayeque. Confeccionado en algodón pesado de 420 GSM con tratamiento acid-wash artesanal y bordado tipográfico UrbanVibes.',
    features: [
      'Tejido Heavyweight 420 GSM para máxima retención de calor',
      'Corte Drop-Shoulder extra relajado',
      'Bolsillo canguro reforzado con costura de seguridad',
      'Capucha doblemente forrada con caída estructurada'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Negro carbón', hex: '#111111' },
      { name: 'Gris asfalto', hex: '#3A3F47' },
      { name: 'Blanco hueso', hex: '#F5F5F0' },
      { name: 'Naranja eléctrico', hex: '#FF5A1F' },
      { name: 'Turquesa neón', hex: '#00C2B8' }
    ],
    rating: 4.8,
    reviewsCount: 94,
    stock: 45
  },
  {
    id: 'uv-w03',
    name: 'Tactical Winter Cargo Joggers',
    subtitle: 'Pantalón Cargo Impermeable con Múltiples Bolsillos Utilitarios',
    category: 'pantalones',
    price: 59.0,
    pricePen: 225.0,
    originalPrice: 75.0,
    originalPricePen: 285.0,
    badge: 'NUEVO',
    isWaterproof: true,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Pantalones cargo de inspiración técnica japonesa. Fabricados con nylon ripstop impermeable y refuerzos en rodillas. Ideales para el clima frío y ventoso de la ciudad.',
    features: [
      'Tejido Ripstop antidesgarro con acabado DWR repelente al agua',
      '6 bolsillos modulares con correas ajustables',
      'Tobillos elasticados ajustables con clips de liberación rápida',
      'Cintura elasticada con cordón técnico militar'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro carbón', hex: '#111111' },
      { name: 'Gris asfalto', hex: '#3A3F47' },
      { name: 'Blanco hueso', hex: '#F5F5F0' },
      { name: 'Naranja eléctrico', hex: '#FF5A1F' },
      { name: 'Turquesa neón', hex: '#00C2B8' }
    ],
    rating: 4.7,
    reviewsCount: 76,
    stock: 31
  },
  {
    id: 'uv-w04',
    name: 'Glacier Reflective Windbreaker',
    subtitle: 'Casaca Cortavientos Térmica Ultraliviana con Paneles 3M',
    category: 'chaquetas',
    price: 65.0,
    pricePen: 245.0,
    badge: 'EDICIÓN INVIERNO',
    isWaterproof: true,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Combina estilo estético cyberpunk con protección total contra el viento frío de la costa lambayecana. Paneles reflectivos de alto contraste para destacar en la noche.',
    features: [
      'Membrana corta viento de alta densidad',
      'Tratamiento hidrofóbico respirable',
      'Cierre central bidireccional impermeable',
      'Bolsillo interior para smartphone con pasacables'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro carbón', hex: '#111111' },
      { name: 'Gris asfalto', hex: '#3A3F47' },
      { name: 'Blanco hueso', hex: '#F5F5F0' },
      { name: 'Naranja eléctrico', hex: '#FF5A1F' },
      { name: 'Turquesa neón', hex: '#00C2B8' }
    ],
    rating: 4.9,
    reviewsCount: 52,
    stock: 19
  },
  {
    id: 'uv-w05',
    name: 'Polar Street Beanie & Balaclava Set',
    subtitle: 'Set Gorro Térmico de Punto Grueso con Parche Logo Metálico',
    category: 'accesorios',
    price: 22.0,
    pricePen: 85.0,
    badge: 'NUEVO',
    isThermal: true,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Accesorio imprescindible para bajas temperaturas y noches de invierno. Punto acrílico acanalado de alta densidad con aislamiento térmico y placa de acero inoxidable UrbanVibes.',
    features: [
      'Tejido suave sin picazón hipoalergénico',
      'Retención de calor corporal certificada',
      'Ajuste ergonómico elástico talla universal',
      'Placa metálica con acabado pavonado mate'
    ],
    sizes: ['M'],
    colors: [
      { name: 'Negro carbón', hex: '#111111' },
      { name: 'Gris asfalto', hex: '#3A3F47' },
      { name: 'Blanco hueso', hex: '#F5F5F0' },
      { name: 'Naranja eléctrico', hex: '#FF5A1F' },
      { name: 'Turquesa neón', hex: '#00C2B8' }
    ],
    rating: 4.8,
    reviewsCount: 110,
    stock: 80
  },
  {
    id: 'uv-w06',
    name: 'Vortex High-Top Street Boots',
    subtitle: 'Zapatillas Botín Urbano con Suela Chunky y Cuero Impermeabilizado',
    category: 'calzado',
    price: 98.0,
    pricePen: 370.0,
    originalPrice: 125.0,
    originalPricePen: 475.0,
    badge: 'HOT DROP',
    isWaterproof: true,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Diseñadas para el asfalto mojado y frío de la ciudad. Suela antideslizante con dibujo de alta tracción, plantilla de espuma viscoelástica y capellada reforzada.',
    features: [
      'Tratamiento de cuero sintético hidrófugo',
      'Suela de goma vulcanizada con agarre multiterreno',
      'Plantilla memory foam ortopédica para confort prolongado',
      'Ojales metálicos reforzados y cordones reflectivos'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro carbón', hex: '#111111' },
      { name: 'Gris asfalto', hex: '#3A3F47' },
      { name: 'Blanco hueso', hex: '#F5F5F0' },
      { name: 'Naranja eléctrico', hex: '#FF5A1F' },
      { name: 'Turquesa neón', hex: '#00C2B8' }
    ],
    rating: 4.9,
    reviewsCount: 88,
    stock: 18
  }
];

export const INITIAL_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'camp-tofu-01',
    name: 'TOFU 01: Conciencia de Marca - Nueva Colección Invierno',
    stage: 'TOFU',
    objective: 'Reconocimiento y Alcance de Marca (Awareness)',
    platform: 'Instagram',
    format: 'Video/Reel',
    budgetDaily: 6.0,
    budgetTotal: 180.0,
    durationDays: 30,
    targetAudience: {
      publico: 'jóvenes de la región Lambayeque',
      ageRange: '18 a 35 años (Segmentación INEI Lambayeque)',
      locations: ['Región Lambayeque', 'Chiclayo', 'Lambayeque', 'Ferreñafe', 'Pimentel', 'La Victoria', 'J.L. Ortiz'],
      interests: ['Ropa urbana', 'Streetwear', 'Hoodies', 'Cortavientos', 'Moda Chiclayo'],
      keywords: ['ropa urbana', 'streetwear', 'hoodies', 'cortavientos', 'moda Chiclayo'],
      hashtags: ['#UrbanVibes', '#Streetwear', '#ModaUrbana', '#InviernoUrbano', '#Chiclayo'],
      sector: 'moda y retail (ropa urbana)',
      type: 'Intereses'
    },
    headline: 'Este invierno, viste tu esencia. Descubre la nueva colección URBANVIBES.',
    primaryText: 'El frío ya llegó, pero tu estilo no se congela. 🔥 Descubre la nueva colección de invierno de UrbanVibes en Chiclayo y la región Lambayeque: hoodies oversize, chaquetas impermeables y cortes exclusivos que dominan la ciudad.',
    callToAction: 'Descubre más',
    targetUrl: '/tienda#invierno',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop',
    metrics: {
      impressions: 124800,
      clicks: 3980,
      ctr: 3.19,
      conversions: 28,
      spend: 180.0,
      revenue: 1680.0
    },
    status: 'Activo'
  },
  {
    id: 'camp-mofu-02',
    name: 'MOFU 02: Consideración - Carrusel Beneficios & 15% OFF',
    stage: 'MOFU',
    objective: 'Tráfico Web y Generación de Leads Calificados',
    platform: 'Ambas',
    format: 'Carrusel',
    budgetDaily: 6.5,
    budgetTotal: 195.0,
    durationDays: 30,
    targetAudience: {
      publico: 'jóvenes de la región Lambayeque',
      ageRange: '18 a 35 años (Segmentación INEI Lambayeque)',
      locations: ['Región Lambayeque', 'Chiclayo', 'Lambayeque', 'Ferreñafe'],
      interests: ['Lookalike de compradores 2%', 'Visitantes web Lambayeque últimos 60 días'],
      keywords: ['ropa urbana', 'streetwear', 'hoodies', 'cortavientos', 'moda Chiclayo'],
      hashtags: ['#UrbanVibes', '#Streetwear', '#ModaUrbana', '#InviernoUrbano', '#Chiclayo'],
      sector: 'moda y retail (ropa urbana)',
      type: 'Lookalike (2%)'
    },
    headline: 'Chaquetas impermeables y Hoodies 420 GSM para el frío real',
    primaryText: '¿Viento y frío en Chiclayo y la costa norte? Mantente cálido sin sacrificar tu estética urbana. Desliza para ver nuestros drops térmicos impermeables. Regístrate y recibe 15% OFF de bienvenida en tu primer pedido con código URBAN15.',
    callToAction: 'Explora nuestra colección',
    targetUrl: '/tienda#coleccion',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=900&auto=format&fit=crop',
    metrics: {
      impressions: 78500,
      clicks: 3140,
      ctr: 4.0,
      conversions: 62,
      spend: 195.0,
      revenue: 4150.0
    },
    status: 'Activo'
  },
  {
    id: 'camp-bofu-03',
    name: 'BOFU 03: Conversión - Retargeting Dinámico Carritos Abandonados',
    stage: 'BOFU',
    objective: 'Conversiones de Compra y Recuperación de Carritos',
    platform: 'Ambas',
    format: 'Anuncio Dinámico',
    budgetDaily: 4.16,
    budgetTotal: 125.0,
    durationDays: 30,
    targetAudience: {
      publico: 'jóvenes de la región Lambayeque',
      ageRange: '18 a 35 años (Segmentación INEI Lambayeque)',
      locations: ['Región Lambayeque (Chiclayo, Lambayeque, Ferreñafe)'],
      interests: ['Usuarios de Lambayeque que agregaron al carrito en los últimos 7 días'],
      keywords: ['ropa urbana', 'streetwear', 'hoodies', 'cortavientos', 'moda Chiclayo'],
      hashtags: ['#UrbanVibes', '#Streetwear', '#ModaUrbana', '#InviernoUrbano', '#Chiclayo'],
      sector: 'moda y retail (ropa urbana)',
      type: 'Retargeting (Pixel Carrito)'
    },
    headline: 'Tus prendas favoritas te están esperando (+ Envío Gratis en Chiclayo)',
    primaryText: '¿Te quedaste a un paso del drop? Completa tu registro hoy y llévate ENVÍO GRATIS a Chiclayo y Lambayeque usando el cupón URBAN15. El stock para la temporada de invierno es limitado y se está agotando.',
    callToAction: 'Finaliza tu compra',
    targetUrl: '/tienda#carrito',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop',
    metrics: {
      impressions: 29400,
      clicks: 1620,
      ctr: 5.51,
      conversions: 84,
      spend: 125.0,
      revenue: 5980.0
    },
    status: 'Activo'
  }
];

export const INITIAL_LEADS: LeadContact[] = [
  {
    id: 'ld-101',
    name: 'Mateo Quispe Ramos',
    firstName: 'Mateo',
    lastName: 'Quispe Ramos',
    email: 'mateo.quispe.street@gmail.com',
    phone: '+51 987 654 321',
    source: 'Anuncio TOFU: Descubre más',
    stage: 'Cliente',
    interest: 'CyberPuffer Tech-Winter Jacket',
    createdDate: '12/10/2024',
    lastActivity: 'Compró hace 2 horas',
    emailsSent: 3,
    emailsOpened: 3,
    hasPurchased: true,
    totalSpent: 335.0
  },
  {
    id: 'ld-102',
    name: 'Valeria Mendoza Cruz',
    firstName: 'Valeria',
    lastName: 'Mendoza Cruz',
    email: 'valeria.mendoza.art@outlook.com',
    phone: '+51 976 112 334',
    source: 'Anuncio MOFU: Explora colección',
    stage: 'SQL',
    interest: 'Acid-Wash Winter Hoodie',
    createdDate: '14/10/2024',
    lastActivity: 'Agregó al carrito hoy',
    emailsSent: 2,
    emailsOpened: 2,
    hasPurchased: false,
    totalSpent: 0
  },
  {
    id: 'ld-103',
    name: 'Rodrigo Alarcón Solís',
    firstName: 'Rodrigo',
    lastName: 'Alarcón Solís',
    email: 'rodrigo.alarcon.skate@gmail.com',
    phone: '+51 954 887 231',
    source: 'Instagram Carrusel MOFU',
    stage: 'Cliente',
    interest: 'Vortex Street Boots & Cargo Joggers',
    createdDate: '09/10/2024',
    lastActivity: 'Compró hace 1 día',
    emailsSent: 3,
    emailsOpened: 2,
    hasPurchased: true,
    totalSpent: 595.0
  },
  {
    id: 'ld-104',
    name: 'Camila Farfán Wong',
    firstName: 'Camila',
    lastName: 'Farfán Wong',
    email: 'camila.farfan.design@hotmail.com',
    phone: '+51 922 433 119',
    source: 'Anuncio BOFU: Finaliza tu compra',
    stage: 'MQL',
    interest: 'Glacier Reflective Windbreaker',
    createdDate: '15/10/2024',
    lastActivity: 'Abrió Email 2 (Descuento)',
    emailsSent: 2,
    emailsOpened: 1,
    hasPurchased: false,
    totalSpent: 0
  },
  {
    id: 'ld-105',
    name: 'Sebastián Morales Paz',
    firstName: 'Sebastián',
    lastName: 'Morales Paz',
    email: 'sebas.morales.vibes@gmail.com',
    phone: '+51 931 556 788',
    source: 'Página Web UrbanVibes',
    stage: 'Lead',
    interest: 'Polar Street Beanie Set',
    createdDate: '16/10/2024',
    lastActivity: 'Se suscribió al boletín hace 15 min',
    emailsSent: 1,
    emailsOpened: 1,
    hasPurchased: false,
    totalSpent: 0
  }
];

export const INITIAL_EMAIL_SEQUENCES: EmailSequence[] = [
  {
    id: 'seq-01',
    title: 'Email 1: Presentación de la Colección de Invierno',
    step: 1,
    triggerEvent: 'Inscripción inmediata (Lead ingresa vía anuncio o tienda)',
    delay: 'Inmediato (0 minutos)',
    subject: '❄️ Bienvenido a UrbanVibes: Este invierno, viste tu esencia. Descubre la nueva colección URBANVIBES.',
    previewText: 'Conoce los nuevos drops resistentes al frío y al agua para esta temporada.',
    content: `Hola {{nombre}},

Bienvenido a la comunidad de UrbanVibes. Sabemos que tu estilo no se detiene cuando baja la temperatura.

Nuestra nueva **Colección de Invierno 2024** fue pensada para quienes viven la calle:
• **Chaquetas CyberPuffer**: Membrana impermeable 10K y relleno polar.
• **Hoodies Acid-Wash 420 GSM**: Confección pesada y corte drop-shoulder.
• **Cargo Pants Técnicos**: Tejido ripstop hidrófugo con bolsillos modulares.

Explora el catálogo antes de que se agoten las tallas limitadas de este drop.`,
    ctaText: 'Ver Colección de Invierno',
    openRate: 58.4,
    clickRate: 24.1,
    sentCount: 1420
  },
  {
    id: 'seq-02',
    title: 'Email 2: Promoción Exclusiva y Descuento',
    step: 2,
    triggerEvent: 'Sin compra tras 24 horas del Email 1',
    delay: '1 día después',
    subject: '🎁 15% OFF Exclusivo para tu primer pedido invernal | Cupón: URBAN15',
    previewText: 'Usa tu cupón exclusivo y renueva tu guardarropa urbano con envío express.',
    content: `Hola de nuevo {{nombre}},

Queremos que pruebes la calidad de las telas UrbanVibes en carne propia. Por eso te activamos un descuento especial:

🎟️ **CUPÓN:** \`URBAN15\`  
🔥 **BENEFICIO:** 15% OFF en toda la Colección de Invierno + Calzado.

Válido únicamente para las primeras 50 compras de esta semana. Aplícalo al finalizar tu pedido en la tienda.`,
    ctaText: 'Reclamar mi 15% de Descuento',
    discountCode: 'URBAN15',
    openRate: 46.8,
    clickRate: 18.5,
    sentCount: 1180
  },
  {
    id: 'seq-03',
    title: 'Email 3: Recordatorio de Compra & Carrito Abandonado',
    step: 3,
    triggerEvent: 'Carrito abandonado o 72 horas sin interacción',
    delay: '3 días después',
    subject: '⚠️ No dejes escapar tu drop invernal (+ ENVÍO GRATIS por 24h)',
    previewText: 'Las prendas de tu carrito están reservadas por tiempo limitado.',
    content: `Hola {{nombre}},

Notamos que estuviste mirando prendas de la colección de invierno y dejaste productos seleccionados en tu carrito.

Los drops de UrbanVibes son de tirada limitada y las tallas más pedidas (M y L) se agotan rápido. Si completas tu orden dentro de las próximas 24 horas, no solo mantendrás tu 15% OFF con **URBAN15**, sino que te regalamos el **ENVÍO GRATIS a domicilio**.`,
    ctaText: 'Finalizar mi compra ahora',
    discountCode: 'URBAN15',
    openRate: 39.2,
    clickRate: 15.6,
    sentCount: 840
  }
];
