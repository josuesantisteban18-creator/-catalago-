import React, { useState } from 'react';
import { X, Star, Shield, Droplets, Flame, Check, Truck, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  currency: 'PEN' | 'USD';
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currency
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const price = currency === 'PEN' ? `S/ ${product.pricePen.toFixed(2)}` : `$ ${product.price.toFixed(2)}`;
  const originalPrice = product.originalPricePen && currency === 'PEN'
    ? `S/ ${product.originalPricePen.toFixed(2)}`
    : product.originalPrice
    ? `$ ${product.originalPrice.toFixed(2)}`
    : null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#10121d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery & Image */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-between bg-black/40 border-b md:border-b-0 md:border-r border-white/10">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-900 border border-white/5">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 text-xs font-black rounded-md tracking-wider bg-orange-600 text-white shadow-lg">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-3 left-3 flex gap-2">
              {product.isWaterproof && (
                <span className="flex items-center gap-1 text-[11px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded backdrop-blur-md">
                  <Droplets className="w-3 h-3 text-cyan-400" /> Impermeable
                </span>
              )}
              {product.isThermal && (
                <span className="flex items-center gap-1 text-[11px] font-semibold bg-orange-950/80 text-orange-300 border border-orange-500/40 px-2 py-0.5 rounded backdrop-blur-md">
                  <Flame className="w-3 h-3 text-orange-400" /> Térmico
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {product.gallery.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto w-full py-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? 'border-orange-500 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Vista" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase font-mono tracking-widest text-orange-400 font-bold">
                UrbanVibes Winter Drop
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl font-black font-heading text-white tracking-wide">
              {product.name}
            </h2>
            <p className="text-xs text-slate-400 mb-3">{product.subtitle}</p>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mb-4 p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-2xl font-black text-orange-400 font-heading">
                {price}
              </span>
              {originalPrice && (
                <span className="text-sm text-slate-500 line-through">
                  {originalPrice}
                </span>
              )}
              <span className="ml-auto text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                Stock: {product.stock} disponibles
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Technical Specs bullets */}
            <div className="mb-5 space-y-1.5 bg-slate-900/50 p-3 rounded-xl border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Especificaciones Técnicas:
              </span>
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Color Selector */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Color: <span className="text-orange-400 font-mono">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedColor === c.name
                        ? 'border-orange-500 bg-orange-500/10 text-white font-bold'
                        : 'border-white/10 hover:border-white/30 text-slate-300'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Talla Streetwear:
                </label>
                <span className="text-[11px] text-cyan-400 cursor-pointer hover:underline">
                  Guía de medidas
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-11 h-11 rounded-lg border font-mono font-bold text-sm transition-all ${
                      selectedSize === s
                        ? 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-400 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-mono font-bold"
              >
                -
              </button>
              <span className="px-3 py-2 text-sm font-mono font-bold text-white min-w-[32px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-mono font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={addedSuccess}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/30 active:scale-95'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>¡Añadido al Carrito!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Añadir a la Bolsa</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
