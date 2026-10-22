import React from 'react';
import { 
  Layers, Users, Palette, BarChart3, ShoppingBag, 
  Sparkles, ExternalLink, ArrowRight 
} from 'lucide-react';
import { SystemTab, AdCampaign, LeadContact, EmailSequence, AppMode } from '../../types';
import { CampaignsAdsManager } from './CampaignsAdsManager';
import { HubSpotCrm } from './HubSpotCrm';
import { CreativeStudio } from './CreativeStudio';
import { AnalyticsDashboard } from './AnalyticsDashboard';

interface AdminSystemProps {
  systemTab: SystemTab;
  setSystemTab: (tab: SystemTab) => void;
  campaigns: AdCampaign[];
  onToggleCampaignStatus: (id: string) => void;
  onUpdateCampaign: (campaign: AdCampaign) => void;
  leads: LeadContact[];
  emailSequences: EmailSequence[];
  onAddLead: (lead: Omit<LeadContact, 'id' | 'createdDate' | 'lastActivity' | 'emailsSent' | 'emailsOpened' | 'hasPurchased' | 'totalSpent'>) => void;
  onSendTestEmail: (sequenceId: string, leadEmail: string) => void;
  onSimulateSale: () => void;
  setMode: (mode: AppMode) => void;
  onNavigateToLanding: (stage: string, cta: string) => void;
}

export const AdminSystem: React.FC<AdminSystemProps> = ({
  systemTab,
  setSystemTab,
  campaigns,
  onToggleCampaignStatus,
  onUpdateCampaign,
  leads,
  emailSequences,
  onAddLead,
  onSendTestEmail,
  onSimulateSale,
  setMode,
  onNavigateToLanding
}) => {
  return (
    <div className="min-h-screen bg-[#090a10] text-slate-100 pb-20">
      {/* Top Banner Contextual Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-slate-900/50 p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-black text-white text-lg tracking-wide uppercase">
                Sistema de Gestión & Marketing • UrbanVibes
              </h1>
              <p className="text-xs text-slate-400">
                Plataforma integral de Control de Campañas Social Media, CRM HubSpot y Embudo TOFU/MOFU/BOFU.
              </p>
            </div>
          </div>

          <button
            onClick={() => setMode('store')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl text-xs font-bold font-mono text-white shadow-md shadow-orange-500/20 transition-all self-start sm:self-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ver Tienda en Vivo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-[#11131e] p-1.5 rounded-2xl border border-white/10 shadow-lg">
          <button
            onClick={() => setSystemTab('campaigns')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              systemTab === 'campaigns'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Campañas Meta Ads</span>
          </button>

          <button
            onClick={() => setSystemTab('crm')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              systemTab === 'crm'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2. HubSpot CRM & Secuencias</span>
          </button>

          <button
            onClick={() => setSystemTab('creative')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              systemTab === 'creative'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>3. Copywriting & Dirección de Arte</span>
          </button>

          <button
            onClick={() => setSystemTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              systemTab === 'analytics'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>4. Monitoreo & ROAS</span>
          </button>
        </div>

        {/* Tab Content Display */}
        {systemTab === 'campaigns' && (
          <CampaignsAdsManager
            campaigns={campaigns}
            onToggleStatus={onToggleCampaignStatus}
            onUpdateCampaign={onUpdateCampaign}
            onNavigateToLanding={onNavigateToLanding}
          />
        )}

        {systemTab === 'crm' && (
          <HubSpotCrm
            leads={leads}
            emailSequences={emailSequences}
            onAddLead={onAddLead}
            onSendTestEmail={onSendTestEmail}
          />
        )}

        {systemTab === 'creative' && <CreativeStudio />}

        {systemTab === 'analytics' && (
          <AnalyticsDashboard
            campaigns={campaigns}
            leads={leads}
            onSimulateSale={onSimulateSale}
          />
        )}
      </div>
    </div>
  );
};
