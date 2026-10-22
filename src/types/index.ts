export type AppMode = 'store' | 'system';

export type SystemTab = 'campaigns' | 'crm' | 'creative' | 'analytics';

export type FunnelStage = 'TOFU' | 'MOFU' | 'BOFU';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'chaquetas' | 'hoodies' | 'pantalones' | 'accesorios' | 'calzado';
  price: number; // in USD
  pricePen: number; // in PEN (S/)
  originalPrice?: number;
  originalPricePen?: number;
  badge?: 'NUEVO' | 'POPULAR' | 'HOT DROP' | 'EDICIÓN INVIERNO';
  isWaterproof?: boolean;
  isThermal?: boolean;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviewsCount: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface SegmentationInfo {
  publico: string;
  edad: string;
  palabrasClave: string[];
  hashtags: string[];
  sector: string;
  fuenteInei: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  stage: FunnelStage;
  objective: string;
  platform: 'Instagram' | 'Facebook' | 'Ambas';
  format: 'Carrusel' | 'Video/Reel' | 'Imagen Única' | 'Anuncio Dinámico';
  budgetDaily: number;
  budgetTotal: number;
  durationDays: number;
  targetAudience: {
    ageRange: string;
    locations: string[];
    interests: string[];
    type: 'Intereses' | 'Lookalike (2%)' | 'Retargeting (Pixel Carrito)';
    publico?: string;
    keywords?: string[];
    hashtags?: string[];
    sector?: string;
  };
  headline: string;
  primaryText: string;
  callToAction: string;
  targetUrl: string;
  image: string;
  metrics: {
    impressions: number;
    clicks: number;
    ctr: number;
    conversions: number;
    spend: number;
    revenue: number;
  };
  status: 'Activo' | 'Pausado' | 'Borrador';
}

export interface LeadContact {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  source: 'Instagram Reel TOFU' | 'Instagram Carrusel MOFU' | 'Pop-up Tienda (15% OFF)' | 'Retargeting BOFU' | 'Anuncio TOFU: Descubre más' | 'Anuncio MOFU: Explora colección' | 'Anuncio BOFU: Finaliza tu compra' | 'Página Web UrbanVibes';
  stage: 'Lead' | 'MQL' | 'SQL' | 'Cliente';
  interest: string;
  createdDate: string;
  lastActivity: string;
  emailsSent: number;
  emailsOpened: number;
  hasPurchased: boolean;
  totalSpent: number;
}

export interface EmailSequence {
  id: string;
  title: string;
  step: number;
  triggerEvent: string;
  delay: string;
  subject: string;
  previewText: string;
  content: string;
  ctaText: string;
  discountCode?: string;
  openRate: number;
  clickRate: number;
  sentCount: number;
}
