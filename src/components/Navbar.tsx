import React from 'react';
import { ShoppingBag, ShieldCheck, Flame, Layers, Users, BarChart3, Palette, BookOpen } from 'lucide-react';
import { AppMode, SystemTab } from '../types';

interface NavbarProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  systemTab: SystemTab;
  setSystemTab: (tab: SystemTab) => void;
  cartCount: number;
  openCart: () => void;
  currency: 'PEN' | 'USD';
  setCurrency: (c: 'PEN' | 'USD') => void;
  openNewsletter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  systemTab,
  setSystemTab,
  cartCount,
  openCart,
  currency,
  setCurrency,
  openNewsletter
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0c0d14]/95 backdrop-blur-md border-b border-white/10 text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-orange-300 animate-pulse" />
          <strong>UrbanVibes 2024:</strong> Lanzamiento Colección de Ropa de Invierno
        </span>
        <span className="hidden md:inline text-white/70">|</span>
        <span className="hidden md:inline bg-black/30 px-2 py-0.5 rounded text-[11px] font-mono">
          Embudo Meta Ads (TOFU/MOFU/BOFU) & Secuencias de Email en HubSpot
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMode('store')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 via-red-500 to-indigo-600 flex items-center justify-center font-black tracking-tighter text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              UV
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider font-heading uppercase text-white">
                  URBAN<span className="text-orange-500">VIBES</span>
                </span>
                <span className="text-[10px] bg-white/10 text-cyan-300 px-1.5 py-0.2 rounded font-mono border border-cyan-400/20">
                  WINTER 24
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Streetwear & Technical Apparel</p>
            </div>
          </button>
        </div>

        {/* Global Mode Switcher */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={() => setMode('store')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'store'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Página UrbanVibes (Formulario & BD)</span>
          </button>
            <button
              onClick={() => setMode('system')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'system'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sistema Ads & HubSpot</span>
              <span className="text-[9px] bg-white/20 px-1 rounded uppercase font-mono hidden sm:inline">PRO</span>
            </button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Toggle */}
            <button
              onClick={() => setCurrency(currency === 'PEN' ? 'USD' : 'PEN')}
              className="text-xs font-mono font-bold bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-lg text-slate-300 transition-colors"
              title="Cambiar moneda"
            >
              {currency === 'PEN' ? '🇵🇪 S/ PEN' : '🇺🇸 $ USD'}
            </button>

            {/* Discount Coupon Magnet Button */}
            <button
              onClick={openNewsletter}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>15% OFF (URBAN15)</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors group"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-5 h-5 text-slate-200 group-hover:text-white group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sub-navigation bar when in System mode */}
        {mode === 'system' && (
          <div className="bg-[#121420] border-t border-white/10 px-4 sm:px-6 lg:px-8 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-2 no-scrollbar">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold px-2 py-0.5 bg-cyan-950/50 rounded border border-cyan-800/40 hidden md:inline">
                  PANEL DE CONTROL:
                </span>

                <button
                  onClick={() => setSystemTab('campaigns')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    systemTab === 'campaigns'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Meta Ads (TOFU/MOFU/BOFU)</span>
                </button>

                <button
                  onClick={() => setSystemTab('crm')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    systemTab === 'crm'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>HubSpot CRM & Emails</span>
                </button>

                <button
                  onClick={() => setSystemTab('creative')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    systemTab === 'creative'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Dirección de Arte & Copy</span>
                </button>

                <button
                  onClick={() => setSystemTab('analytics')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    systemTab === 'analytics'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Métricas & ROAS</span>
                </button>
              </div>
            </div>
          </div>
        )}
    </header>
  );
};
