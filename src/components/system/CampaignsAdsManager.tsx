import React, { useState } from 'react';
import { 
  Layers, DollarSign, Target, Smartphone, Share2, Play, Eye, 
  TrendingUp, CheckCircle, Plus, Sparkles, Filter, ExternalLink, RefreshCw
} from 'lucide-react';
import { AdCampaign, FunnelStage } from '../../types';

interface CampaignsAdsManagerProps {
  campaigns: AdCampaign[];
  onToggleStatus: (id: string) => void;
  onUpdateCampaign: (updated: AdCampaign) => void;
  onNavigateToLanding?: (stage: string, cta: string) => void;
}

export const CampaignsAdsManager: React.FC<CampaignsAdsManagerProps> = ({
  campaigns,
  onToggleStatus,
  onUpdateCampaign,
  onNavigateToLanding
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [previewPlatform, setPreviewPlatform] = useState<'instagram' | 'facebook'>('instagram');

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budgetTotal, 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + c.metrics.spend, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.metrics.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.metrics.clicks, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.metrics.conversions, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.metrics.revenue, 0);
  const avgRoas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : '0';

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Top Header & Strategy Summary */}
      <div className="bg-[#121420] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
              <span>Facebook Business Manager • Meta Ads Suite</span>
              <span className="text-white/20">|</span>
              <span className="bg-blue-950/70 border border-blue-800 text-blue-300 px-2 py-0.5 rounded">
                Cuenta: UrbanVibes Official
              </span>
            </div>
            <h2 className="text-2xl font-black font-heading text-white">
              Campaña: UrbanVibes - Ropa de Invierno 2024
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Estructura de embudo completo con técnicas de creatividad digital, segmentación de audiencias similares (Lookalike 2%) y retargeting dinámico para optimizar conversiones de venta online.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/5 border border-white/10 p-3 rounded-xl font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Presupuesto Asignado</span>
              <span className="text-lg font-black text-emerald-400">${totalBudget.toFixed(2)} USD</span>
              <span className="text-[10px] text-slate-400 block">30 días (~$16.6/día)</span>
            </div>
          </div>
        </div>

        {/* Global KPI bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 font-mono text-xs">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">Gasto Ejecutado</span>
            <span className="text-base font-bold text-white">${totalSpend.toFixed(2)}</span>
            <span className="text-[10px] text-emerald-400">100% dentro de meta</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">Impresiones</span>
            <span className="text-base font-bold text-cyan-400">{totalImpressions.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400">Alcance total</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">Clics en el Enlace</span>
            <span className="text-base font-bold text-white">{totalClicks.toLocaleString()}</span>
            <span className="text-[10px] text-cyan-300">CPC Promedio: $0.05</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">Compras / CVR</span>
            <span className="text-base font-bold text-emerald-400">{totalConversions} ventas</span>
            <span className="text-[10px] text-emerald-300">Tasa CVR: 2.05%</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">Ingresos Generados</span>
            <span className="text-base font-bold text-orange-400">${totalRevenue.toFixed(2)}</span>
            <span className="text-[10px] text-slate-400">E-Commerce Web</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">ROAS Global</span>
            <span className="text-base font-bold text-emerald-400">{avgRoas}x</span>
            <span className="text-[10px] text-emerald-400">Retorno publicitario</span>
          </div>
        </div>
      </div>

      {/* The 3 Funnel Stages Interactive Matrix (TOFU, MOFU, BOFU) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => {
          const isSelected = camp.id === selectedCampaignId;
          const stageBadgeColors = {
            TOFU: 'bg-blue-900/50 text-blue-300 border-blue-500/40',
            MOFU: 'bg-purple-900/50 text-purple-300 border-purple-500/40',
            BOFU: 'bg-orange-900/50 text-orange-300 border-orange-500/40'
          };

          return (
            <div
              key={camp.id}
              onClick={() => setSelectedCampaignId(camp.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#151829] border-blue-500 shadow-xl shadow-blue-500/10'
                  : 'bg-[#10121d] border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${stageBadgeColors[camp.stage]}`}>
                    {camp.stage} • {camp.stage === 'TOFU' ? 'Conciencia' : camp.stage === 'MOFU' ? 'Consideración' : 'Conversión'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus(camp.id);
                    }}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold transition-colors ${
                      camp.status === 'Activo'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    ● {camp.status}
                  </button>
                </div>

                <h3 className="font-heading font-black text-base text-white mb-1.5">
                  {camp.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {camp.primaryText}
                </p>

                {/* Technical Meta Ads Details */}
                <div className="space-y-2 text-xs font-mono bg-black/40 p-3 rounded-xl border border-white/5 mb-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Objetivo:</span>
                    <span className="text-white truncate max-w-[150px]">{camp.objective}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Formato:</span>
                    <span className="text-cyan-300 font-bold">{camp.format}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Presupuesto:</span>
                    <span className="text-emerald-400 font-bold">${camp.budgetDaily}/día (${camp.budgetTotal} total)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Audiencia:</span>
                    <span className="text-orange-300">{camp.targetAudience.type}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Pill */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">CTR: <strong className="text-cyan-300">{camp.metrics.ctr}%</strong></span>
                <span className="text-slate-400">Ventas: <strong className="text-emerald-400">{camp.metrics.conversions}</strong></span>
                <span className="text-slate-400">ROAS: <strong className="text-orange-400">{(camp.metrics.revenue / camp.metrics.spend).toFixed(1)}x</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Campaign Detail Inspector & Live Ad Mockup Previewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Detailed Configuration Editor */}
        <div className="lg:col-span-7 bg-[#121420] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                Editor de Parámetros de Campaña
              </span>
              <h3 className="text-xl font-heading font-black text-white">
                {selectedCampaign.name}
              </h3>
            </div>
            <span className="text-xs font-mono bg-blue-950 text-blue-300 border border-blue-700/50 px-2.5 py-1 rounded-md font-bold">
              {selectedCampaign.stage}
            </span>
          </div>

          {/* Form fields for real experimentation */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Texto Principal (Copywriting de la Campaña):
              </label>
              <textarea
                rows={3}
                value={selectedCampaign.primaryText}
                onChange={(e) =>
                  onUpdateCampaign({ ...selectedCampaign, primaryText: e.target.value })
                }
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Titular del Anuncio (Headline):
                </label>
                <input
                  type="text"
                  value={selectedCampaign.headline}
                  onChange={(e) =>
                    onUpdateCampaign({ ...selectedCampaign, headline: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Llamado a la Acción (CTA):
                </label>
                <select
                  value={selectedCampaign.callToAction}
                  onChange={(e) =>
                    onUpdateCampaign({ ...selectedCampaign, callToAction: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Descubre más">Descubre más (TOFU)</option>
                  <option value="Explora nuestra colección">Explora nuestra colección (MOFU)</option>
                  <option value="Finaliza tu compra">Finaliza tu compra (BOFU)</option>
                  <option value="Comprar ahora">Comprar ahora</option>
                  <option value="Obtener oferta">Obtener oferta</option>
                </select>
              </div>
            </div>

            {/* Audience Details Breakdown (Slide 28 / INEI Lambayeque) */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>Cuadro de Segmentación de Campaña (Validación INEI)</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  Región Lambayeque (18-35 años)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono pt-1">
                <div>
                  <span className="text-slate-400 block font-bold">Público:</span>
                  <span className="text-white font-bold">{selectedCampaign.targetAudience.publico || 'jóvenes de la región Lambayeque'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">Edad:</span>
                  <span className="text-cyan-300 font-bold">{selectedCampaign.targetAudience.ageRange}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">Palabras clave:</span>
                  <span className="text-amber-300">
                    {selectedCampaign.targetAudience.keywords?.join(', ') || 'ropa urbana, streetwear, hoodies, cortavientos, moda Chiclayo'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">#Hashtag:</span>
                  <span className="text-pink-300 font-bold">
                    {selectedCampaign.targetAudience.hashtags?.join(' ') || '#UrbanVibes #Streetwear #ModaUrbana #InviernoUrbano #Chiclayo'}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block font-bold">Sector:</span>
                  <span className="text-purple-300 font-bold">
                    {selectedCampaign.targetAudience.sector || 'moda y retail (ropa urbana)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Budget & Daily Pace Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Presupuesto Diario ($ USD):
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={selectedCampaign.budgetDaily}
                  onChange={(e) =>
                    onUpdateCampaign({
                      ...selectedCampaign,
                      budgetDaily: parseFloat(e.target.value) || 0,
                      budgetTotal: (parseFloat(e.target.value) || 0) * selectedCampaign.durationDays
                    })
                  }
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Duración Total:
                </label>
                <input
                  type="text"
                  disabled
                  value={`${selectedCampaign.durationDays} días ($${selectedCampaign.budgetTotal.toFixed(2)} USD)`}
                  className="w-full bg-slate-950 border border-white/5 rounded-xl p-2.5 text-slate-400 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Realistic Phone / Social Media Ad Mockup (Instagram / Facebook) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Platform switcher tabs */}
          <div className="flex items-center gap-2 mb-4 bg-slate-900/90 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setPreviewPlatform('instagram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                previewPlatform === 'instagram'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Instagram Feed & Stories
            </button>
            <button
              onClick={() => setPreviewPlatform('facebook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                previewPlatform === 'facebook'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Facebook Feed
            </button>
          </div>

          {/* Smartphone Frame */}
          <div className="w-[330px] rounded-[36px] bg-black p-3.5 border-4 border-slate-700 shadow-2xl relative">
            {/* Top speaker notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2" />

            {/* Phone Screen Container */}
            <div className="bg-[#121212] rounded-[24px] overflow-hidden border border-white/10 text-white text-xs">
              {/* Instagram / Facebook Post Header */}
              <div className="p-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-black text-white text-[10px]">
                    UV
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white text-xs">urbanvibes_oficial</span>
                      <span className="w-3 h-3 rounded-full bg-blue-500 text-white text-[8px] flex items-center justify-center font-bold">✓</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">Publicidad (Sponsored)</span>
                  </div>
                </div>
                <span className="text-slate-400 font-bold tracking-widest">•••</span>
              </div>

              {/* Ad Image / Video banner */}
              <div className="relative aspect-square bg-slate-900 overflow-hidden">
                <img
                  src={selectedCampaign.image}
                  alt="Anuncio de Campaña"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 font-bold border border-white/10">
                  {selectedCampaign.format}
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-orange-600 text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  WINTER DROP
                </div>
              </div>

              {/* CTA Action Banner */}
              <div className="bg-[#1e2337] px-3.5 py-2.5 flex items-center justify-between border-y border-white/10">
                <div className="truncate mr-2">
                  <span className="text-[11px] font-bold text-white block truncate">
                    {selectedCampaign.headline}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">urbanvibes.pe/invierno</span>
                </div>
                <button 
                  onClick={() => onNavigateToLanding?.(selectedCampaign.stage, selectedCampaign.callToAction)}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md cursor-pointer active:scale-95 transition-transform"
                  title="Hacer clic para ir al destino: Página UrbanVibes y Formulario Registrarse"
                >
                  {selectedCampaign.callToAction}
                </button>
              </div>

              {/* Engagement icons & Copy text */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="text-red-500 font-bold text-sm">❤️ 3,429</span>
                    <span className="text-slate-400 text-sm">💬 184</span>
                    <span className="text-slate-400 text-sm">↗️ 420</span>
                  </div>
                  <span className="text-slate-400 text-sm">🔖</span>
                </div>

                <div className="text-[11px] text-slate-200 line-clamp-3 leading-relaxed">
                  <strong className="text-white mr-1.5">urbanvibes_oficial</strong>
                  {selectedCampaign.primaryText}
                </div>

                <div className="text-[10px] text-slate-500 font-mono pt-1">
                  Ver los 184 comentarios • Hace 2 horas
                </div>
              </div>
            </div>

            {/* Bottom Home indicator */}
            <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-2.5" />
          </div>

          {/* Interactive button to test the destination flow */}
          <div className="mt-4 w-full max-w-[330px]">
            <button
              onClick={() => onNavigateToLanding?.(selectedCampaign.stage, selectedCampaign.callToAction)}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-600 hover:opacity-90 rounded-xl text-xs font-mono font-bold text-white shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Probar clic en "{selectedCampaign.callToAction}"</span>
            </button>
            <p className="text-[10px] text-slate-400 mt-1.5 text-center leading-tight">
              Lleva directamente a la <strong>Página de UrbanVibes</strong> para captar los datos en el formulario <em>"Registrarse"</em> y guardarlos en la <em>"Base de datos"</em>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
