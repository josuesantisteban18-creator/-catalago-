import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, Droplets, Shield, ArrowRight, Star, ShoppingBag, Eye, 
  Sparkles, CheckCircle2, Search, Filter, Compass, Instagram, Layers,
  Database, UserCheck, Mail, Phone, User, Send, Download, ExternalLink,
  Tag, Clock, ArrowDown, ChevronRight, Target, MapPin, Hash, Building2, Calendar, Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, AppMode, SystemTab, LeadContact } from '../../types';
import { SEGMENTACION_OFICIAL, BRAND_COLORS } from '../../data/mockData';

interface StorefrontProps {
  products: Product[];
  leads: LeadContact[];
  onRegisterLead: (lead: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    interest: string;
    source: LeadContact['source'];
  }) => void;
  referredFromAd: { stage: string; cta: string } | null;
  onClearReferredAd: () => void;
  onSendTestEmail: (sequenceId: string, email: string) => void;
  setMode: (mode: AppMode) => void;
  setSystemTab: (tab: SystemTab) => void;
  onOpenProduct: (product: Product) => void;
  currency: 'PEN' | 'USD';
}

export const Storefront: React.FC<StorefrontProps> = ({
  products,
  leads,
  onRegisterLead,
  referredFromAd,
  onClearReferredAd,
  onSendTestEmail,
  setMode,
  setSystemTab,
  onOpenProduct,
  currency
}) => {
  // Form state for "Registrarse" (Nombre, Apellidos, Correo, Teléfono)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedInterest, setSelectedInterest] = useState(products[0]?.name || 'CyberPuffer Tech-Winter Jacket');
  const [justRegistered, setJustRegistered] = useState(false);
  const [registeredData, setRegisteredData] = useState<{ name: string; email: string } | null>(null);

  // Search & filter for products
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Refs for smooth scrolling
  const registerFormRef = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const segmentationRef = useRef<HTMLDivElement>(null);

  // Auto-scroll if redirected from Ad CTA ("Descubre más", "Finaliza tu compra")
  useEffect(() => {
    if (referredFromAd) {
      if (referredFromAd.stage === 'BOFU') {
        registerFormRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        productsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [referredFromAd]);

  const handleScrollToRegister = (productName?: string) => {
    if (productName) {
      setSelectedInterest(productName);
    }
    registerFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToDatabase = () => {
    databaseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToSegmentation = () => {
    segmentationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) return;

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    const source: LeadContact['source'] = referredFromAd
      ? referredFromAd.stage === 'TOFU'
        ? 'Anuncio TOFU: Descubre más'
        : referredFromAd.stage === 'BOFU'
        ? 'Anuncio BOFU: Finaliza tu compra'
        : 'Anuncio MOFU: Explora colección'
      : 'Página Web UrbanVibes';

    onRegisterLead({
      firstName,
      lastName,
      email,
      phone,
      interest: selectedInterest,
      source
    });

    setRegisteredData({
      name: `${firstName} ${lastName}`,
      email
    });
    setJustRegistered(true);

    // Reset fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');

    // Smooth scroll to database section to see record inserted
    setTimeout(() => {
      databaseRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Nombre,Apellidos,Correo,Telefono,Origen,Interes,Fecha\n';
    const rows = leads.map(l => `"${l.id}","${l.firstName || l.name.split(' ')[0]}","${l.lastName || l.name.split(' ').slice(1).join(' ')}","${l.email}","${l.phone}","${l.source}","${l.interest}","${l.createdDate}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'UrbanVibes_HubSpot_Contactos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#090a10] text-slate-100">
      {/* Dynamic Ad Source Notice Banner */}
      {referredFromAd && (
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white py-2 px-4 text-xs font-mono font-bold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
              Destino de Anuncio {referredFromAd.stage}
            </span>
            <span>
              🎯 Has llegado a través del botón <strong>"{referredFromAd.cta}"</strong> de la campaña en Instagram/Facebook.
            </span>
          </div>
          <button
            onClick={onClearReferredAd}
            className="text-white/80 hover:text-white text-xs underline"
          >
            Cerrar aviso
          </button>
        </div>
      )}

      {/* Internal Navigation Sub-bar */}
      <div className="bg-[#10121d] border-b border-white/10 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between overflow-x-auto gap-4 no-scrollbar">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-orange-400 font-bold uppercase hidden sm:inline">Página UrbanVibes:</span>
            
            <button
              onClick={handleScrollToProducts}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
              <span>1. Colección Invierno</span>
            </button>

            <button
              onClick={() => handleScrollToRegister()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/40 hover:bg-orange-500/30 font-bold transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>2. Formulario "Registrarse"</span>
            </button>

            <button
              onClick={handleScrollToSegmentation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 font-bold transition-colors"
            >
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cuadro de Segmentación (INEI)</span>
            </button>

            <button
              onClick={handleScrollToDatabase}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 hover:bg-blue-500/30 font-bold transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>3. Base de Datos ({leads.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMode('system');
                setSystemTab('crm');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:bg-purple-600/50 text-xs font-mono font-bold transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Ver Secuencia 3 Emails (HubSpot)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 border-b border-white/10 bg-gradient-to-b from-[#131627] via-[#0d0e17] to-[#090a10]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Página Oficial • UrbanVibes Streetwear 2024</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-[1.15] text-white">
                ESTE INVIERNO, VISTE TU ESENCIA. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-300">
                  DESCUBRE LA NUEVA COLECCIÓN URBANVIBES.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                Página de aterrizaje de la <strong>Colección de Ropa de Invierno de UrbanVibes</strong>. Destino de los anuncios de Meta Ads (<em>"Descubre más"</em> y <em>"Finaliza tu compra"</em>) para captar datos de clientes y alimentar la secuencia de 3 emails de HubSpot.
              </p>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => handleScrollToRegister()}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/30 flex items-center gap-2 transition-all active:scale-95"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Ir al Formulario "Registrarse"</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleScrollToDatabase}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                >
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Ver "Base de Datos" ({leads.length})</span>
                </button>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-md mx-auto lg:mx-0 font-mono text-xs">
                <div>
                  <span className="text-orange-400 font-bold block">1. Anuncios Meta</span>
                  <span className="text-[11px] text-slate-400">Generan tráfico web</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block">2. Formulario</span>
                  <span className="text-[11px] text-slate-400">Capta leads reales</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold block">3. HubSpot</span>
                  <span className="text-[11px] text-slate-400">Nutre con 3 emails</span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#121422] border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Destino Oficial del Embudo
                  </span>
                  <span className="text-orange-400">UrbanVibes Ads</span>
                </div>

                <div className="mt-3 relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-900 border border-white/5">
                  <img
                    src="https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop"
                    alt="Colección Invierno UrbanVibes"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-xs flex justify-between items-center">
                    <div>
                      <span className="text-orange-400 font-bold block">CyberPuffer Tech-Winter</span>
                      <span className="text-[11px] text-slate-300">Membrana 10K Impermeable</span>
                    </div>
                    <button
                      onClick={() => handleScrollToRegister('CyberPuffer Tech-Winter Jacket')}
                      className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold text-xs"
                    >
                      Registrarme
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-900/60 rounded-xl border border-white/5 text-xs text-slate-300 space-y-1">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Cumplimiento de la consigna:
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Página sencilla que recibe el clic de <em>"Descubre más"</em> o <em>"Finaliza tu compra"</em>, solicita datos de registro e importa los leads a la Base de Datos para el email marketing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Cuadro de Segmentación de Mercado (INEI Lambayeque) */}
      <section ref={segmentationRef} id="segmentacion" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
        <div className="bg-[#121422] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Estudio de Mercado • Segmentación Oficial</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Cuadro de Segmentación
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Parámetros estratégicos definidos para la campaña de <strong>UrbanVibes</strong>. Los campos de edad y zona geográfica coinciden estrictamente con la <strong>segmentación del INEI (Lambayeque, 18 a 35 años)</strong> para su evaluación y verificación académica.
              </p>
            </div>

            <div className="self-start sm:self-auto flex items-center gap-2">
              <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Validado con INEI Lambayeque</span>
              </span>
            </div>
          </div>

          {/* Official 5 Fields Requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 relative z-10">
            {/* Campo 1: Público */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-orange-400" />
                  <span>Público:</span>
                </span>
                <p className="text-sm font-black text-white mt-2 leading-snug">
                  {SEGMENTACION_OFICIAL.publico}
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block pt-2 border-t border-white/5">
                Chiclayo, Lambayeque y Ferreñafe
              </span>
            </div>

            {/* Campo 2: Edad */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/40 space-y-2 flex flex-col justify-between shadow-lg shadow-emerald-950/20">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edad:</span>
                </span>
                <p className="text-lg font-black text-cyan-400 font-mono mt-2">
                  {SEGMENTACION_OFICIAL.edad}
                </p>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono block pt-2 border-t border-white/5 font-semibold">
                ✓ Padrón Poblacional INEI
              </span>
            </div>

            {/* Campo 3: Palabras clave */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 space-y-2 lg:col-span-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Palabras clave:</span>
                </span>
                <div className="flex flex-wrap gap-1 mt-2">
                  {SEGMENTACION_OFICIAL.palabrasClave.map((kw, i) => (
                    <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-amber-200">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block pt-2 border-t border-white/5">
                SEO & Términos de búsqueda
              </span>
            </div>

            {/* Campo 4: #Hashtag */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 space-y-2 lg:col-span-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-pink-400" />
                  <span>#Hashtag:</span>
                </span>
                <div className="flex flex-wrap gap-1 mt-2">
                  {SEGMENTACION_OFICIAL.hashtags.map((ht, i) => (
                    <span key={i} className="text-[10px] font-mono bg-pink-950/50 border border-pink-500/30 px-2 py-0.5 rounded text-pink-300 font-bold">
                      {ht}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block pt-2 border-t border-white/5">
                Instagram & TikTok Ads
              </span>
            </div>

            {/* Campo 5: Sector */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Sector:</span>
                </span>
                <p className="text-sm font-bold text-purple-300 mt-2 leading-snug">
                  {SEGMENTACION_OFICIAL.sector}
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block pt-2 border-t border-white/5">
                Streetwear & Moda Joven
              </span>
            </div>
          </div>

          {/* Validation note banner */}
          <div className="mt-5 p-3.5 bg-black/60 border border-emerald-500/20 rounded-2xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Coincidencia INEI:</strong> Zona = Región Lambayeque (Chiclayo y distritos) | Edad = 18 a 35 años.
              </span>
            </div>
            <button
              onClick={() => handleScrollToRegister()}
              className="text-orange-400 hover:text-orange-300 font-bold underline whitespace-nowrap text-xs flex items-center gap-1"
            >
              <span>Ir al Formulario Registrarse</span>
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 1: Colección de Productos de Invierno */}
      <section ref={productsRef} id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
              <span>Sección 01</span>
              <span>•</span>
              <span>Prendas de la Colección de Invierno</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Catálogo de Ropa Streetwear de Temporada
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Los anuncios TOFU/MOFU dirigen a los usuarios a esta vitrina de productos antes del registro.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScrollToRegister()}
              className="px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 rounded-xl text-xs font-bold font-mono transition-colors"
            >
              ✍️ Registrarse para recibir catálogo completo
            </button>
          </div>
        </div>

        {/* Banner de Paleta de Colores Oficial de la Ropa */}
        <div className="bg-[#10121d] border border-white/10 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-bold font-heading text-white uppercase tracking-wider">
                Colores Oficiales de la Colección de Invierno URBANVIBES
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-300">
              5 colores clave: Negro carbón, Gris asfalto, Blanco hueso, Naranja eléctrico, Turquesa neón
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3">
            {BRAND_COLORS.map((color) => (
              <div
                key={color.name}
                className="bg-slate-900/90 border border-white/10 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 hover:border-white/30 transition-colors shadow-sm"
              >
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 border-white/20 shadow-inner shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-white block truncate">
                    {color.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {color.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const formattedPrice = currency === 'PEN'
              ? `S/ ${product.pricePen.toFixed(2)}`
              : `$ ${product.price.toFixed(2)}`;

            return (
              <div
                key={product.id}
                className="bg-[#11131e] rounded-2xl border border-white/10 overflow-hidden hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-orange-400 border border-white/10">
                    {product.badge || 'INVIERNO'}
                  </div>
                  {product.isWaterproof && (
                    <div className="absolute bottom-2.5 left-2.5 bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-cyan-400" /> Impermeable
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-heading font-black text-white text-base">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {product.subtitle}
                    </p>

                    {/* Color swatches */}
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <span className="text-[10px] text-slate-400 font-mono">Colores:</span>
                      <div className="flex items-center gap-1">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            title={`${c.name} (${c.hex})`}
                            className="w-3 h-3 rounded-full border border-white/20 transition-transform hover:scale-125"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold font-mono text-orange-400">
                        {formattedPrice}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-mono">
                        Stock: {product.stock} unids
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onOpenProduct(product)}
                        className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-mono transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleScrollToRegister(product.name)}
                        className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg text-xs font-bold font-mono shadow-md transition-all flex items-center gap-1"
                      >
                        <span>Registrarme</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: FORMULARIO "REGISTRARSE" (Nombre, Apellidos, Correo, Teléfono) */}
      <section
        ref={registerFormRef}
        id="registrarse"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24"
      >
        <div className="bg-[#121422] border-2 border-orange-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Form Header */}
          <div className="border-b border-white/10 pb-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Formulario Principal de Captación
              </span>
              <span className="text-xs font-mono text-cyan-400">
                Paso Clave • HubSpot & Embudo TOFU/MOFU/BOFU
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-heading text-white">
              Formulario: <span className="text-orange-500">Registrarse</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Registra tus datos para recibir el acceso preferencial a la <strong>Colección de Invierno de UrbanVibes</strong>, cupón de bienvenida de <strong>15% OFF (URBAN15)</strong> y envío gratis. Al enviar, los datos se guardan inmediatamente en la <strong>Base de Datos</strong> y activan la secuencia de 3 emails.
            </p>
          </div>

          {justRegistered && registeredData && (
            <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-300 space-y-2 animate-fade-in font-mono text-xs">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>¡Registro Completado con Éxito!</span>
              </div>
              <p className="text-slate-200">
                Gracias, <strong className="text-white">{registeredData.name}</strong>. Tus datos han sido guardados en la <strong>Base de Datos (Contactos &gt; Crear lista)</strong> y se ha iniciado el <strong>Email 1 (Presentación de producto)</strong> a <strong className="text-orange-400">{registeredData.email}</strong>.
              </p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Campo 1: Nombre */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-400" />
                  <span>Nombre *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Mateo"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-sans"
                />
              </div>

              {/* Campo 2: Apellidos */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-400" />
                  <span>Apellidos *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Quispe Ramos"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Campo 3: Correo */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Correo Electrónico *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="mateo.quispe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                />
              </div>

              {/* Campo 4: Teléfono */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Teléfono (WhatsApp) *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+51 987 654 321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                />
              </div>
            </div>

            {/* Prenda de interés y origen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
                  <span>Prenda de Interés Principal:</span>
                </label>
                <select
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({currency === 'PEN' ? `S/ ${p.pricePen}` : `$ ${p.price}`})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Origen de Atribución:</span>
                </label>
                <div className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-orange-400 font-mono">
                  {referredFromAd
                    ? `Anuncio ${referredFromAd.stage} ("${referredFromAd.cta}")`
                    : 'Página Web UrbanVibes (Tráfico Directo)'}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2.5 transition-all active:scale-[0.99]"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Registrarse (Guardar en Base de Datos & Iniciar Emails)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-white/5">
              <span>🔒 Privacidad protegida: Datos sincronizados de inmediato.</span>
              <button
                type="button"
                onClick={handleScrollToDatabase}
                className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Ver tabla de contactos abajo</span>
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* SECTION 3: "BASE DE DATOS" (Contactos importados a HubSpot) */}
      <section
        ref={databaseRef}
        id="basededatos"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24"
      >
        <div className="bg-[#121422] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Sección 03 • HubSpot Contactos &gt; Crear Lista</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Base de Datos de Contactos Captados
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Aquí se almacenan los contactos que han interactuado con la campaña y completaron el formulario "Registrarse" (Nombre, Apellidos, Correo, Teléfono) para disparar la secuencia de 3 emails.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                title="Descargar lista en formato CSV"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Exportar CSV</span>
              </button>

              <button
                onClick={() => {
                  setMode('system');
                  setSystemTab('crm');
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-500/20"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Administrar en HubSpot CRM</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] uppercase block">Total Registros en BD</span>
              <span className="text-lg font-bold text-white">{leads.length} contactos</span>
              <span className="text-[10px] text-emerald-400">100% verificados</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] uppercase block">Email 1 (Bienvenida)</span>
              <span className="text-lg font-bold text-cyan-400">100% Enviados</span>
              <span className="text-[10px] text-slate-400">Inmediato al registrarse</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] uppercase block">Email 2 (15% OFF)</span>
              <span className="text-lg font-bold text-orange-400">Cupón URBAN15</span>
              <span className="text-[10px] text-slate-400">En 24 horas</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] uppercase block">Email 3 (Recordatorio)</span>
              <span className="text-lg font-bold text-emerald-400">Envío Gratis</span>
              <span className="text-[10px] text-slate-400">En 72 horas</span>
            </div>
          </div>

          {/* Database Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-[11px] font-mono uppercase text-slate-400 border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4"># ID</th>
                  <th className="py-3.5 px-4">Nombre y Apellidos</th>
                  <th className="py-3.5 px-4">Correo Electrónico</th>
                  <th className="py-3.5 px-4">Teléfono</th>
                  <th className="py-3.5 px-4">Origen (Anuncio/Campaña)</th>
                  <th className="py-3.5 px-4">Prenda de Interés</th>
                  <th className="py-3.5 px-4">Secuencia de 3 Emails</th>
                  <th className="py-3.5 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {leads.map((contact, index) => {
                  const displayFirst = contact.firstName || contact.name.split(' ')[0] || contact.name;
                  const displayLast = contact.lastName || contact.name.split(' ').slice(1).join(' ') || '-';

                  return (
                    <tr key={contact.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        #{index + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-xs">
                          {displayFirst} {displayLast}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {contact.createdDate}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-cyan-300 text-[11px]">
                        {contact.email}
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-400 text-[11px]">
                        {contact.phone}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-orange-300">
                          {contact.source}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[11px] text-slate-300 max-w-[160px] truncate">
                        {contact.interest}
                      </td>
                      <td className="py-3 px-4 font-mono text-[10px]">
                        <div className="space-y-0.5">
                          <span className="inline-block text-emerald-400 font-bold mr-1">✓ E1: Enviado</span>
                          <span className="inline-block text-cyan-300 mr-1">• E2: 24h</span>
                          <span className="inline-block text-slate-400">• E3: 72h</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onSendTestEmail('seq-02', contact.email)}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500 hover:text-white text-orange-400 transition-colors text-[11px] font-mono font-bold"
                          title="Enviar Email 2 (Descuento URBAN15) a este contacto"
                        >
                          Enviar E2
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-mono">
            <span>Sincronizado con HubSpot API v3 (List ID: #UV-WINTER-LEADS)</span>
            <button
              onClick={() => handleScrollToRegister()}
              className="text-orange-400 hover:underline flex items-center gap-1 font-bold"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Registrar otro contacto</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#07080d] py-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-black text-white text-xs">
              UV
            </div>
            <span className="font-heading font-black text-white text-sm uppercase tracking-wider">
              UrbanVibes • Colección Invierno 2024
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <button onClick={handleScrollToProducts} className="hover:text-white transition-colors">
              Prendas de Invierno
            </button>
            <button onClick={() => handleScrollToRegister()} className="hover:text-orange-400 transition-colors font-bold">
              Formulario Registrarse
            </button>
            <button onClick={handleScrollToDatabase} className="hover:text-cyan-400 transition-colors font-bold">
              Base de Datos
            </button>
            <button
              onClick={() => {
                setMode('system');
                setSystemTab('campaigns');
              }}
              className="hover:text-white transition-colors text-blue-400"
            >
              Simulador Ads (Meta)
            </button>
          </div>

          <span className="text-[11px] text-slate-500">
            UrbanVibes Streetwear • Sistema de Captación & Ads
          </span>
        </div>
      </footer>
    </div>
  );
};
