import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Users, ShoppingCart, 
  ArrowUpRight, AlertTriangle, CheckCircle, RefreshCw, Zap, ArrowRight, ShieldCheck
} from 'lucide-react';
import { AdCampaign, LeadContact } from '../../types';

interface AnalyticsDashboardProps {
  campaigns: AdCampaign[];
  leads: LeadContact[];
  onSimulateSale: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  campaigns,
  leads,
  onSimulateSale
}) => {
  const [appliedOptimization, setAppliedOptimization] = useState<string | null>(null);

  const totalSpend = campaigns.reduce((s, c) => s + c.metrics.spend, 0);
  const totalRevenue = campaigns.reduce((s, c) => s + c.metrics.revenue, 0);
  const totalConversions = campaigns.reduce((s, c) => s + c.metrics.conversions, 0);
  const totalImpressions = campaigns.reduce((s, c) => s + c.metrics.impressions, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.metrics.clicks, 0);

  const globalCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0';
  const cpc = totalClicks > 0 ? (totalSpend / totalClicks).toFixed(2) : '0';
  const cpa = totalConversions > 0 ? (totalSpend / totalConversions).toFixed(2) : '0';
  const roas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : '0';

  const handleApplyAction = (actionName: string) => {
    setAppliedOptimization(actionName);
    setTimeout(() => setAppliedOptimization(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Top Banner */}
      <div className="bg-[#121420] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <span>Módulo 4: Monitoreo & Optimización</span>
              <span className="text-white/20">|</span>
              <span className="bg-emerald-950/70 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded">
                Facebook Business Manager & HubSpot
              </span>
            </div>
            <h2 className="text-2xl font-black font-heading text-white">
              Panel de Rendimiento Integral UrbanVibes
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Monitoreo en tiempo real de métricas de adquisición de tráfico (Meta Ads), conversiones de venta en tienda online y eficiencia de apertura de email marketing (HubSpot).
            </p>
          </div>

          <button
            onClick={onSimulateSale}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold font-mono text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-95 transition-all self-start md:self-auto"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Simular Conversión en Vivo</span>
          </button>
        </div>

        {/* Global Business KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 font-mono">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="uppercase">ROAS (Retorno Ads)</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{roas}x</div>
            <p className="text-[10px] text-slate-400">Por cada $1 gastado en Meta Ads se generan ${(parseFloat(roas) || 0).toFixed(2)} USD</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="uppercase">Ingresos Totales</span>
              <DollarSign className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-2xl font-black text-white">${totalRevenue.toFixed(2)}</div>
            <p className="text-[10px] text-orange-300">~S/ {(totalRevenue * 3.75).toFixed(2)} PEN</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="uppercase">Ventas Concretadas</span>
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-400">{totalConversions}</div>
            <p className="text-[10px] text-slate-400">Ticket promedio: ${(totalRevenue / Math.max(1, totalConversions)).toFixed(2)} USD</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="uppercase">Costo por Compra (CPA)</span>
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">${cpa}</div>
            <p className="text-[10px] text-emerald-400">Muy por debajo del límite de $8.00</p>
          </div>
        </div>
      </div>

      {/* Funnel Efficiency Breakdown (TOFU -> MOFU -> BOFU) */}
      <div className="bg-[#121420] border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-heading font-black text-white">
              Embudo de Conversión por Etapas (Meta Ads Manager)
            </h3>
            <p className="text-xs text-slate-400">
              Desglose de rendimiento comparativo entre Awareness, Consideración y Conversión.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-lg">
            Presupuesto Total: $500.00 USD
          </span>
        </div>

        <div className="space-y-4">
          {campaigns.map((camp) => {
            const campRoas = camp.metrics.spend > 0 ? (camp.metrics.revenue / camp.metrics.spend).toFixed(1) : '0';
            const colors = {
              TOFU: 'from-blue-600 to-indigo-600',
              MOFU: 'from-purple-600 to-pink-600',
              BOFU: 'from-orange-500 to-red-600'
            };

            return (
              <div key={camp.id} className="bg-slate-900/60 p-4 rounded-xl border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                      {camp.stage}
                    </span>
                    <span className="font-heading font-black text-sm text-white">{camp.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span>Gasto: <strong className="text-white">${camp.metrics.spend}</strong></span>
                    <span>Ingreso: <strong className="text-emerald-400">${camp.metrics.revenue}</strong></span>
                    <span>ROAS: <strong className="text-orange-400">{campRoas}x</strong></span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${colors[camp.stage]} transition-all duration-700`}
                    style={{
                      width: `${Math.min(100, (camp.metrics.revenue / (totalRevenue || 1)) * 100)}%`
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-400">
                  <div>Impresiones: <strong className="text-white">{camp.metrics.impressions.toLocaleString()}</strong></div>
                  <div>Clics: <strong className="text-cyan-300">{camp.metrics.clicks.toLocaleString()}</strong></div>
                  <div>CTR: <strong className="text-white">{camp.metrics.ctr}%</strong></div>
                  <div>Ventas directas: <strong className="text-emerald-400">{camp.metrics.conversions}</strong></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HubSpot Email Analytics & Strategic Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Email Performance (Slide 32, sección 4.2) */}
        <div className="lg:col-span-6 bg-[#121420] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-heading font-black text-base text-white">
              Monitoreo de Email Marketing en HubSpot
            </h3>
            <span className="text-xs font-mono text-cyan-400 font-bold">Paso 4.2</span>
          </div>

          <p className="text-xs text-slate-300">
            Métricas de engagement de la secuencia de 3 correos para los contactos que ingresaron vía pop-up o redes sociales:
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Email 1 (Bienvenida/Catálogo)</span>
                <span className="text-white font-bold">Tasa de Apertura: 58.4%</span>
              </div>
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Excelente
              </span>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Email 2 (Promoción URBAN15)</span>
                <span className="text-white font-bold">Tasa de Apertura: 46.8% | CTR: 18.5%</span>
              </div>
              <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                Alto Desempeño
              </span>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Email 3 (Carrito Abandonado)</span>
                <span className="text-white font-bold">Tasa de Conversión a Venta: 15.6%</span>
              </div>
              <span className="text-orange-400 font-bold bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800">
                Alta Rentabilidad
              </span>
            </div>
          </div>
        </div>

        {/* Right: Optimization Action Engine */}
        <div className="lg:col-span-6 bg-[#121420] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-heading font-black text-base text-white">
              Ajustes de Optimización Recomendados
            </h3>
            <span className="text-xs font-mono text-orange-400 font-bold">Algoritmo de Mejora</span>
          </div>

          <p className="text-xs text-slate-300">
            Acciones automáticas sugeridas según las directrices de la guía de aprendizaje para maximizar el presupuesto de $500 USD:
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5 flex items-center justify-between gap-3">
              <div className="text-xs">
                <span className="font-bold text-white block">Escalar Presupuesto a BOFU Retargeting</span>
                <span className="text-[11px] text-slate-400">El ROAS de BOFU es de 47.8x; reasignar $30 USD desde TOFU aumentará compras directas.</span>
              </div>
              <button
                onClick={() => handleApplyAction('Presupuesto reasignado a BOFU con éxito.')}
                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold whitespace-nowrap transition-colors"
              >
                Aplicar
              </button>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5 flex items-center justify-between gap-3">
              <div className="text-xs">
                <span className="font-bold text-white block">Prueba A/B en Asunto de Email 2</span>
                <span className="text-[11px] text-slate-400">Testear "Tu 15% OFF expira hoy" vs "Regalo exclusivo de invierno".</span>
              </div>
              <button
                onClick={() => handleApplyAction('Test A/B activado en HubSpot Workflows.')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold whitespace-nowrap transition-colors"
              >
                Activar Test
              </button>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5 flex items-center justify-between gap-3">
              <div className="text-xs">
                <span className="font-bold text-white block">Excluir Compradores de Anuncios TOFU</span>
                <span className="text-[11px] text-slate-400">Evita gastar presupuesto de reconocimiento en clientes que ya tienen la prenda.</span>
              </div>
              <button
                onClick={() => handleApplyAction('Audiencia de exclusión añadida a Meta Ads.')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold whitespace-nowrap transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>

          {appliedOptimization && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{appliedOptimization}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
