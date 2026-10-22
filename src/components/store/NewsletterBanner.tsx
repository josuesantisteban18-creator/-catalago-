import React, { useState } from 'react';
import { X, Sparkles, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewsletterBannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (name: string, email: string, interest: string) => void;
}

export const NewsletterBanner: React.FC<NewsletterBannerProps> = ({
  isOpen,
  onClose,
  onSubscribe
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Colección Invierno 2024');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch {}

    onSubscribe(name || 'Miembro Urban', email, interest);
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#0e101a] border border-orange-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {subscribed ? (
          <div className="text-center py-6 space-y-3 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black font-heading text-white">
              ¡Bienvenido al Club UrbanVibes!
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Tu cupón de 15% OFF ha sido activado: <br />
              <strong className="text-orange-400 text-sm font-mono bg-white/5 px-2 py-1 rounded inline-block mt-2">URBAN15</strong>
            </p>
            <p className="text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 p-2 rounded-lg">
              ✓ Tu contacto ha sido sincronizado automáticamente en <strong>HubSpot CRM</strong> para recibir la secuencia de emails de bienvenida.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Incentivo MOFU • Tráfico a Lead</span>
            </div>

            <div>
              <h3 className="text-2xl font-black font-heading tracking-wide uppercase">
                Obtén <span className="text-orange-500">15% de Descuento</span> en tu Primer Pedido
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Suscríbete al boletín exclusivo de UrbanVibes y accede a lanzamientos secretos, drops limitados y beneficios de invierno antes que nadie.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tu Nombre</label>
                <input
                  type="text"
                  placeholder="Ej. Valeria Mendoza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  placeholder="tucorreo@dominio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Prenda que más te interesa:</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Chaquetas CyberPuffer Impermeables">Chaquetas CyberPuffer Impermeables</option>
                  <option value="Hoodies Acid-Wash 420 GSM">Hoodies Acid-Wash 420 GSM</option>
                  <option value="Pantalones Cargo Técnicos">Pantalones Cargo Técnicos</option>
                  <option value="Gorros y Accesorios Térmicos">Gorros y Accesorios Térmicos</option>
                  <option value="Botines Urbanos Vortex">Botines Urbanos Vortex</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-bold uppercase tracking-wider text-xs text-white shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Desbloquear Cupón 15% OFF</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-[10px] text-center text-slate-500">
              Cero spam. Solo drops exclusivos de streetwear y cupones de temporada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
