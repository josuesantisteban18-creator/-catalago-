import React, { useState } from 'react';
import { 
  Users, Mail, Send, CheckCircle2, AlertCircle, Clock, 
  Sparkles, Filter, Plus, ArrowRight, Eye, Tag, Phone, Search
} from 'lucide-react';
import { LeadContact, EmailSequence } from '../../types';

interface HubSpotCrmProps {
  leads: LeadContact[];
  emailSequences: EmailSequence[];
  onAddLead: (lead: Omit<LeadContact, 'id' | 'createdDate' | 'lastActivity' | 'emailsSent' | 'emailsOpened' | 'hasPurchased' | 'totalSpent'>) => void;
  onSendTestEmail: (sequenceId: string, leadEmail: string) => void;
}

export const HubSpotCrm: React.FC<HubSpotCrmProps> = ({
  leads,
  emailSequences,
  onAddLead,
  onSendTestEmail
}) => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'sequences'>('contacts');
  const [selectedSequenceId, setSelectedSequenceId] = useState<string>(emailSequences[0]?.id || '');
  const [searchLead, setSearchLead] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('todos');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadSource, setNewLeadSource] = useState<LeadContact['source']>('Instagram Reel TOFU');
  const [newLeadInterest, setNewLeadInterest] = useState('CyberPuffer Tech-Winter Jacket');

  // Test send state
  const [testSentNotice, setTestSentNotice] = useState<string | null>(null);

  const selectedSequence = emailSequences.find((s) => s.id === selectedSequenceId) || emailSequences[0];

  const filteredLeads = leads.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(searchLead.toLowerCase()) ||
                        l.email.toLowerCase().includes(searchLead.toLowerCase()) ||
                        l.interest.toLowerCase().includes(searchLead.toLowerCase());
    const matchStage = stageFilter === 'todos' || l.stage === stageFilter;
    return matchSearch && matchStage;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadEmail) return;

    onAddLead({
      name: newLeadName,
      email: newLeadEmail,
      phone: newLeadPhone || '+51 900 000 000',
      source: newLeadSource,
      stage: 'Lead',
      interest: newLeadInterest
    });

    setNewLeadName('');
    setNewLeadEmail('');
    setNewLeadPhone('');
    setShowAddModal(false);
  };

  const handleTriggerTest = (seqId: string, targetEmail: string) => {
    onSendTestEmail(seqId, targetEmail);
    setTestSentNotice(`¡Correo enviado con éxito a ${targetEmail}!`);
    setTimeout(() => setTestSentNotice(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Header Bar */}
      <div className="bg-[#121420] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider mb-1">
              <span>HubSpot Marketing Hub • CRM Base de Datos</span>
              <span className="text-white/20">|</span>
              <span className="bg-orange-950/70 border border-orange-800 text-orange-300 px-2 py-0.5 rounded">
                Portal UrbanVibes
              </span>
            </div>
            <h2 className="text-2xl font-black font-heading text-white">
              Administración de Contactos & Secuencias de Email
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Captación de leads calificados mediante Social Ads y automatización de la secuencia de nutrición de 3 correos para la Colección de Invierno.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'contacts'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Base de Contactos ({leads.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('sequences')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'sequences'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Secuencia de 3 Emails</span>
            </button>
          </div>
        </div>

        {/* Global CRM summary numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 font-mono text-xs">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">Total Contactos</span>
            <span className="text-lg font-bold text-white">{leads.length} leads</span>
            <span className="text-[10px] text-emerald-400">100% Opt-in legal</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">Tasa Apertura Promedio</span>
            <span className="text-lg font-bold text-cyan-400">48.1%</span>
            <span className="text-[10px] text-slate-400">+18% benchmark industria</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">Tasa de Clics (CTR)</span>
            <span className="text-lg font-bold text-orange-400">19.4%</span>
            <span className="text-[10px] text-orange-300">Hacia la tienda e-com</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase block">Ventas Atribuidas Email</span>
            <span className="text-lg font-bold text-emerald-400">
              {leads.filter((l) => l.hasPurchased).length} clientes
            </span>
            <span className="text-[10px] text-emerald-300">
              S/ {leads.reduce((s, l) => s + l.totalSpent, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Tab 1: Contacts Database View */}
      {activeTab === 'contacts' && (
        <div className="bg-[#121420] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o correo..."
                  value={searchLead}
                  onChange={(e) => setSearchLead(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Stage Filter */}
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
              >
                <option value="todos">Todos los Estados (Lifecycle)</option>
                <option value="Lead">Lead Frío</option>
                <option value="MQL">MQL (Marketing Qualified)</option>
                <option value="SQL">SQL (Sales Qualified)</option>
                <option value="Cliente">Cliente Comprador</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl font-bold uppercase tracking-wider text-xs text-white shadow-md shadow-orange-500/20 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Contacto</span>
            </button>
          </div>

          {/* Contacts Table */}
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-[11px] font-mono uppercase text-slate-400 border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Contacto</th>
                  <th className="py-3 px-4">Origen / Campaña</th>
                  <th className="py-3 px-4">Ciclo de Vida</th>
                  <th className="py-3 px-4">Prenda de Interés</th>
                  <th className="py-3 px-4">Correos (Env/Abiertos)</th>
                  <th className="py-3 px-4">Estado de Compra</th>
                  <th className="py-3 px-4 text-right">Acción Rápida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredLeads.map((contact) => (
                  <tr key={contact.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{contact.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{contact.email}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{contact.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 text-slate-300">
                        {contact.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          contact.stage === 'Cliente'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : contact.stage === 'SQL'
                            ? 'bg-orange-950 text-orange-400 border border-orange-800'
                            : contact.stage === 'MQL'
                            ? 'bg-blue-950 text-blue-400 border border-blue-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {contact.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-300 max-w-[180px] truncate">
                      {contact.interest}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span className="text-cyan-300 font-bold">{contact.emailsSent}</span> env /{' '}
                      <span className="text-emerald-400 font-bold">{contact.emailsOpened}</span> abiertos
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {contact.hasPurchased ? (
                        <span className="text-emerald-400 font-bold">
                          ✓ Compró (S/ {contact.totalSpent.toFixed(2)})
                        </span>
                      ) : (
                        <span className="text-slate-500">Pendiente</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleTriggerTest(emailSequences[1].id, contact.email)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white text-slate-400 transition-colors"
                        title="Enviar correo de promoción con cupón URBAN15"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {testSentNotice && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{testSentNotice}</span>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: The 3 Email Marketing Sequences (Slide 30) */}
      {activeTab === 'sequences' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Sequence List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2">
              Flujo de Secuencia Automatizada (HubSpot Workflows)
            </div>

            {emailSequences.map((seq) => {
              const isSelected = seq.id === selectedSequenceId;
              return (
                <div
                  key={seq.id}
                  onClick={() => setSelectedSequenceId(seq.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#151829] border-blue-500 shadow-lg shadow-blue-500/10'
                      : 'bg-[#10121d] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800 font-bold">
                      Paso 0{seq.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {seq.delay}
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-sm text-white mb-1">
                    {seq.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mb-3">
                    Asunto: {seq.subject}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-white/5 text-slate-400">
                    <span>Apertura: <strong className="text-cyan-300">{seq.openRate}%</strong></span>
                    <span>Clics: <strong className="text-orange-400">{seq.clickRate}%</strong></span>
                    <span>Enviados: <strong className="text-white">{seq.sentCount}</strong></span>
                  </div>
                </div>
              );
            })}

            <div className="p-4 bg-slate-900/40 rounded-xl border border-white/10 text-xs text-slate-400 space-y-2">
              <span className="font-bold text-white flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Estrategia de Email Marketing:
              </span>
              <p className="text-[11px] leading-relaxed">
                Esta secuencia de 3 correos cubre los tres momentos clave del ciclo de compra: Presentación de producto (awareness), cupón de descuento de bienvenida (consideración) y recuperación por carrito abandonado (conversión final).
              </p>
            </div>
          </div>

          {/* Right: Email Template Desktop/Mobile Previewer */}
          <div className="lg:col-span-7 bg-[#121420] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  Vista Previa del Correo en Bandeja
                </span>
                <h3 className="text-base font-heading font-bold text-white">
                  {selectedSequence.title}
                </h3>
              </div>

              <button
                onClick={() => handleTriggerTest(selectedSequence.id, 'josuesantisteban18@gmail.com')}
                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>Simular Envío</span>
              </button>
            </div>

            {/* Email Header metadata box */}
            <div className="bg-black/40 rounded-xl p-3 border border-white/10 space-y-1.5 text-xs font-mono">
              <div className="flex gap-2">
                <span className="text-slate-500 w-16">De:</span>
                <span className="text-slate-300">UrbanVibes Official &lt;hola@urbanvibes.pe&gt;</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-500 w-16">Para:</span>
                <span className="text-slate-300">&lt;mateo.quispe@gmail.com&gt; (y 1,420 contactos)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-500 w-16">Asunto:</span>
                <span className="text-orange-300 font-bold">{selectedSequence.subject}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-500 w-16">Disparador:</span>
                <span className="text-cyan-300">{selectedSequence.triggerEvent}</span>
              </div>
            </div>

            {/* Email HTML Body Container */}
            <div className="bg-[#181a27] rounded-xl border border-white/10 p-6 text-slate-200 text-xs space-y-4 max-w-lg mx-auto shadow-inner">
              {/* Email Brand Bar */}
              <div className="flex items-center justify-center gap-2 pb-4 border-b border-white/10">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-black text-white text-[10px]">
                  UV
                </div>
                <span className="font-heading font-black text-white uppercase tracking-wider text-sm">
                  URBAN<span className="text-orange-500">VIBES</span>
                </span>
              </div>

              <div className="whitespace-pre-line leading-relaxed font-sans text-sm text-slate-200">
                {selectedSequence.content.replace('{{nombre}}', 'Mateo')}
              </div>

              {selectedSequence.discountCode && (
                <div className="p-3 bg-orange-950/60 border border-orange-500/40 rounded-xl text-center">
                  <span className="text-[10px] font-mono uppercase text-orange-300 block mb-1">
                    CÓDIGO DE DESCUENTO EXCLUSIVO
                  </span>
                  <span className="text-lg font-mono font-black text-white bg-black/60 px-4 py-1 rounded inline-block border border-orange-500/30 tracking-widest">
                    {selectedSequence.discountCode}
                  </span>
                </div>
              )}

              {/* Email CTA Button */}
              <div className="text-center pt-2">
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold uppercase tracking-wider text-white text-xs shadow-lg shadow-orange-500/30">
                  {selectedSequence.ctaText}
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 text-center text-[10px] text-slate-500">
                Has recibido este correo porque te suscribiste a la lista VIP de UrbanVibes Streetwear.
              </div>
            </div>

            {testSentNotice && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{testSentNotice}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for adding a new lead */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#11131e] border border-white/10 rounded-2xl p-6 text-white space-y-4">
            <h3 className="text-lg font-heading font-black">Registrar Nuevo Contacto</h3>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="Ej. Lucas Herrera"
                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  placeholder="lucas@gmail.com"
                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Teléfono / WhatsApp</label>
                <input
                  type="text"
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="+51 912 345 678"
                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Origen de la Campaña:</label>
                <select
                  value={newLeadSource}
                  onChange={(e) => setNewLeadSource(e.target.value as any)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  <option value="Instagram Reel TOFU">Instagram Reel TOFU</option>
                  <option value="Instagram Carrusel MOFU">Instagram Carrusel MOFU</option>
                  <option value="Pop-up Tienda (15% OFF)">Pop-up Tienda (15% OFF)</option>
                  <option value="Retargeting BOFU">Retargeting BOFU</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Interés Inicial:</label>
                <input
                  type="text"
                  value={newLeadInterest}
                  onChange={(e) => setNewLeadInterest(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg font-bold text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-bold text-white shadow-md shadow-orange-500/20"
                >
                  Guardar en HubSpot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
