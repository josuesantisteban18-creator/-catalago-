import React, { useState } from 'react';
import { 
  Palette, Type, Sparkles, Copy, Check, Download, Layers, 
  Lightbulb, Sliders, Shield, RefreshCw
} from 'lucide-react';

export const CreativeStudio: React.FC = () => {
  const [tone, setTone] = useState<'casual' | 'underground' | 'minimalist'>('casual');
  const [selectedFunnel, setSelectedFunnel] = useState<'TOFU' | 'MOFU' | 'BOFU'>('TOFU');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copiesByTone = {
    casual: {
      description: 'Casual, juvenil y relajado, acorde al estilo urbano latinoamericano.',
      tofu: [
        {
          hook: 'El frío ya llegó, pero tu estilo no se congela. 🔥',
          body: 'Conoce los nuevos drops de la Colección Invierno de UrbanVibes: hoodies oversize 420 GSM y chaquetas térmicas diseñadas para las calles de la ciudad.',
          cta: 'Descubre más'
        },
        {
          hook: '¿Por qué elegir entre abrigarte o verte bien? ❄️',
          body: 'Nuestra nueva línea invernal une membranas impermeables y corte holgado para que salgas a la calle sin preocuparte por la lluvia ni el viento.',
          cta: 'Ver Colección'
        }
      ],
      mofu: [
        {
          hook: 'Chaquetas impermeables tricapa listas para la llovizna urbana.',
          body: 'Desliza para conocer todos los detalles técnicos: cierres herméticos YKK, forro polar interior y detalles 3M reflectivos. Llévate 15% OFF con cupón URBAN15.',
          cta: 'Explora nuestra colección'
        },
        {
          hook: 'El hoodie más pesado y cómodo que vas a tener esta temporada.',
          body: 'Algodón peinado de 420 gramos con interior frisado térmico. Pruébalo con envío express a domicilio en 24 horas.',
          cta: 'Obtener 15% Descuento'
        }
      ],
      bofu: [
        {
          hook: 'Tus prendas favoritas te están esperando (+ ENVÍO GRATIS)',
          body: 'Dejaste prendas en tu bolsa. Aprovecha las últimas unidades en stock de la temporada con tu cupón URBAN15 y envío sin costo adicional.',
          cta: 'Finaliza tu compra'
        },
        {
          hook: '⚠️ Últimas 24 horas: El drop de invierno se está agotando.',
          body: 'No te quedes sin tu talla. Compra segura por Yape, Plin o Tarjeta y recíbelo en la puerta de tu casa.',
          cta: 'Comprar ahora'
        }
      ]
    },
    underground: {
      description: 'Callejero rudo, directo y de alta energía para la cultura skate y trap.',
      tofu: [
        {
          hook: 'La calle impone su ley. Domina la noche bajo cero.',
          body: 'Drops pesados para los que no se esconden del clima. Chaquetas térmicas CyberPuffer y cargo ripstop de tirada limitada.',
          cta: 'Entrar al Drop'
        }
      ],
      mofu: [
        {
          hook: 'Ropa técnica que aguanta el asfalto mojado. Sin filtros.',
          body: 'Fabricada con ripstop antidesgarro y 10,000 mm de columna de agua. Únete a la crew y asegura 15% OFF con URBAN15.',
          cta: 'Reclamar Código'
        }
      ],
      bofu: [
        {
          hook: 'Cero excusas. Tu talla se agota hoy mismo.',
          body: 'Termina tu orden antes de que la producción cierre para esta temporada. Envío gratis inmediato.',
          cta: 'Asegurar mi prenda'
        }
      ]
    },
    minimalist: {
      description: 'Limpio, estético y sobrio, enfocado en materiales premium y funcionalidad técnica.',
      tofu: [
        {
          hook: 'Funcionalidad técnica y diseño urbano contemporáneo.',
          body: 'UrbanVibes presenta su cápsula de invierno: siluetas depuradas con aislamiento térmico polar y telas hidrorrepelentes de máxima durabilidad.',
          cta: 'Conocer Cápsula'
        }
      ],
      mofu: [
        {
          hook: 'Ingeniería textil aplicada al vestuario citadino.',
          body: 'Compara nuestras capas térmicas y acabados termosellados. Accede a beneficios exclusivos de membresía.',
          cta: 'Ver Detalles Técnicos'
        }
      ],
      bofu: [
        {
          hook: 'Completa tu pedido con cortesía de entrega prioritaria.',
          body: 'Finaliza la adquisición de tus piezas seleccionadas con garantía de satisfacción y devolución sin costo.',
          cta: 'Confirmar Pedido'
        }
      ]
    }
  };

  const currentCopies = copiesByTone[tone][selectedFunnel.toLowerCase() as 'tofu' | 'mofu' | 'bofu'] || [];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Header */}
      <div className="bg-[#121420] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-1">
          <span>Taller Creativo • Canva & Dirección de Arte</span>
          <span className="text-white/20">|</span>
          <span className="bg-purple-950/70 border border-purple-800 text-purple-300 px-2 py-0.5 rounded">
            Guía de Marca UrbanVibes
          </span>
        </div>
        <h2 className="text-2xl font-black font-heading text-white">
          Copywriting & Dirección de Arte Digital
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Estructuración de mensajes según el tono de la marca (Casual y Juvenil) y definición del manual de elementos visuales para carruseles de Canva, Instagram Ads y Facebook Business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Copywriting Generator & Tone Selector */}
        <div className="lg:col-span-7 bg-[#121420] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Type className="w-5 h-5 text-orange-400" />
              <h3 className="font-heading font-black text-lg text-white">
                1. Generador de Copywriting Estratégico
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Paso 2.1 Copywriting</span>
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Seleccionar Tono de Comunicación:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'casual', label: 'Casual & Juvenil (Recomendado)', desc: 'Acorde al estilo urbano' },
                { id: 'underground', label: 'Underground Callejero', desc: 'Directo y rebelde' },
                { id: 'minimalist', label: 'Minimalista Técnico', desc: 'Limpio y premium' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    tone === t.id
                      ? 'border-orange-500 bg-orange-950/40 text-white font-bold shadow-lg shadow-orange-500/10'
                      : 'border-white/10 hover:border-white/20 text-slate-400'
                  }`}
                >
                  <span className="text-xs block font-bold text-white">{t.label}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{t.desc}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-orange-300/80 mt-2 font-mono bg-orange-950/30 p-2 rounded-lg border border-orange-800/30">
              💡 <strong>Tono Actual:</strong> {copiesByTone[tone].description}
            </p>
          </div>

          {/* Funnel Stage Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Etapa del Embudo de Conversión:
            </label>
            <div className="flex gap-2">
              {(['TOFU', 'MOFU', 'BOFU'] as const).map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedFunnel(stage)}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                    selectedFunnel === stage
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                      : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {stage} • {stage === 'TOFU' ? 'Conciencia' : stage === 'MOFU' ? 'Consideración' : 'Conversión'}
                </button>
              ))}
            </div>
          </div>

          {/* Generated Copies Bank */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
              Variaciones de Anuncio Listas para Pauta:
            </span>

            {currentCopies.map((item, idx) => {
              const fullCopy = `${item.hook}\n\n${item.body}\n\n👉 CTA: ${item.cta}`;
              const isCopied = copiedIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-heading text-orange-400">
                      Opción {idx + 1}: {item.hook}
                    </span>
                    <button
                      onClick={() => handleCopy(fullCopy, idx)}
                      className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-300 transition-colors"
                      title="Copiar texto para Meta Ads"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.body}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                    <span className="text-slate-400">
                      Llamado a la acción (CTA recomendado):
                    </span>
                    <span className="px-2.5 py-1 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 font-bold">
                      {item.cta}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Dirección de Arte & Canva Guidelines (Slide 20 & 21) */}
        <div className="lg:col-span-5 bg-[#121420] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <h3 className="font-heading font-black text-lg text-white">
                2. Dirección de Arte & Canva Guide
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Paso 2.2 Dirección de Arte</span>
          </div>

          {/* Color Scheme specification */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
              Paleta Cromática Oficial de Ropa UrbanVibes:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#111111] border border-white/10 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#111111] border border-white/20 shrink-0" />
                <div>
                  <span className="text-white font-bold block">Negro carbón</span>
                  <span className="text-[10px] text-slate-400">#111111 (Base & Chaquetas)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#3A3F47] border border-white/20 shrink-0" />
                <div>
                  <span className="text-white font-bold block">Gris asfalto</span>
                  <span className="text-[10px] text-slate-400">#3A3F47 (Hoodies & Joggers)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#F5F5F0] border border-white/20 shrink-0" />
                <div>
                  <span className="text-white font-bold block">Blanco hueso</span>
                  <span className="text-[10px] text-slate-400">#F5F5F0 (Contraste 3M)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#FF5A1F] shrink-0" />
                <div>
                  <span className="text-white font-bold block">Naranja eléctrico</span>
                  <span className="text-[10px] text-slate-400">#FF5A1F (Acento & CTA)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                <span className="w-7 h-7 rounded-lg bg-[#00C2B8] shrink-0" />
                <div>
                  <span className="text-white font-bold block">Turquesa neón</span>
                  <span className="text-[10px] text-slate-400">#00C2B8 (Línea Cyberpunk)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Canva Template Layout Checklist */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/10 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block">
              Estructura de Plantillas Canva (Paso a Paso):
            </span>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  <strong>Formato Canva:</strong> Seleccionar <em>Post de Instagram Cuadrado (1080x1080 px)</em> para Feed o <em>Historia / Reel (1080x1920 px)</em>.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  <strong>Fotografía de Producto:</strong> Cargar fotos en alta resolución en ángulos de perfil y frontal donde se aprecie la textura pesada y brillo reflectivo.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  <strong>Incrustar Copywriting & CTA:</strong> Agregar titular en tipografía display sans bold y botón rectangular con el texto de acción.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <p>
                  <strong>Exportación:</strong> Guardar el diseño en formato <strong>PNG o JPG de alta calidad</strong> listo para subir al Administrador de Anuncios.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Creative Brief Summary */}
          <div className="p-4 bg-blue-950/30 border border-blue-500/30 rounded-xl space-y-2 text-xs">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5 font-mono">
              <Sparkles className="w-4 h-4" /> Brief para el Equipo de Marketing
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              El objetivo de la campaña de invierno es posicionar a UrbanVibes como una marca de alta calidad técnica para combatir el frío sin perder la vibra streetwear. Todo el contenido debe respirar autenticidad, música urbana y vida en la ciudad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
