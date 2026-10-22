import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck, CheckCircle2, QrCode, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  currency: 'PEN' | 'USD';
  onOrderSuccess: (orderTotal: number, customerName: string, customerEmail: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Checkout form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'tarjeta' | 'contraentrega'>('yape');

  const subtotalPen = items.reduce((sum, item) => sum + item.product.pricePen * item.quantity, 0);
  const subtotalUsd = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discountPercent = couponApplied ? 0.15 : 0;
  const discountPen = subtotalPen * discountPercent;
  const discountUsd = subtotalUsd * discountPercent;

  // Free shipping over 199 PEN or 50 USD
  const freeShippingThresholdPen = 199;
  const freeShippingThresholdUsd = 50;

  const isFreeShipping = currency === 'PEN'
    ? (subtotalPen - discountPen) >= freeShippingThresholdPen
    : (subtotalUsd - discountUsd) >= freeShippingThresholdUsd;

  const shippingCostPen = isFreeShipping ? 0 : 15;
  const shippingCostUsd = isFreeShipping ? 0 : 4;

  const totalPen = Math.max(0, subtotalPen - discountPen + shippingCostPen);
  const totalUsd = Math.max(0, subtotalUsd - discountUsd + shippingCostUsd);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'URBAN15') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupón inválido. Usa URBAN15 para obtener 15% OFF.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !shippingAddress) return;

    // Trigger confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    setOrderComplete(true);
    const finalAmount = currency === 'PEN' ? totalPen : totalUsd;
    onOrderSuccess(finalAmount, customerName, customerEmail);
  };

  const handleFinishAndReset = () => {
    onClearCart();
    setOrderComplete(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end">
      <div 
        className="w-full max-w-lg bg-[#0f111a] border-l border-white/10 text-white flex flex-col h-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h3 className="font-heading font-black text-lg uppercase tracking-wider text-white">
              Bolsa de Compras ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {orderComplete ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black font-heading text-white">
                ¡Pedido Confirmado con Éxito!
              </h4>
              <p className="text-sm text-slate-300 max-w-xs mx-auto">
                Gracias, <strong className="text-white">{customerName}</strong>. Enviamos los detalles de tu orden y el número de tracking a <strong className="text-orange-400">{customerEmail}</strong>.
              </p>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>ID de Orden:</span>
                  <span className="text-white font-bold">#UV-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Destino de Envío:</span>
                  <span className="text-white truncate max-w-[200px]">{shippingAddress}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Pagado:</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {currency === 'PEN' ? `S/ ${totalPen.toFixed(2)}` : `$ ${totalUsd.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Método:</span>
                  <span className="text-white capitalize">{paymentMethod}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-left text-xs text-blue-200">
                <p className="font-bold flex items-center gap-1.5 mb-1 text-cyan-300">
                  <Sparkles className="w-4 h-4" /> Integración con Sistema & CRM:
                </p>
                <p className="text-[11px] text-slate-300">
                  Este pedido se ha registrado inmediatamente en la <strong>Base de Datos HubSpot</strong> de UrbanVibes y suma al <strong>ROAS del panel publicitario</strong>.
                </p>
              </div>

              <button
                onClick={handleFinishAndReset}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-orange-600 hover:to-red-700 transition-all shadow-lg shadow-orange-500/20"
              >
                Seguir Explorando Tienda
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handleCompleteOrder} className="space-y-4 animate-fade-in text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="font-heading font-black text-sm uppercase text-white">
                  Datos de Envío & Pago
                </h4>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-orange-400 hover:underline font-semibold"
                >
                  Volver al carrito
                </button>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Mateo Quispe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="tucorreo@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">WhatsApp / Teléfono *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+51 987 654 321"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Dirección de Entrega *</label>
                <input
                  type="text"
                  required
                  placeholder="Av. Larco 743, Dpto 402 - Miraflores, Lima"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-2">Método de Pago Preferido</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('yape')}
                    className={`p-2.5 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'yape'
                        ? 'border-purple-500 bg-purple-950/40 text-purple-300 font-bold'
                        : 'border-white/10 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-purple-400" />
                    <span>Yape / Plin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tarjeta')}
                    className={`p-2.5 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'tarjeta'
                        ? 'border-blue-500 bg-blue-950/40 text-blue-300 font-bold'
                        : 'border-white/10 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span>Tarjeta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('contraentrega')}
                    className={`p-2.5 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'contraentrega'
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                        : 'border-white/10 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>Contraentrega</span>
                  </button>
                </div>
              </div>

              {/* Order mini summary */}
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/10 space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Total a Pagar:</span>
                  <span className="text-orange-400 font-bold text-sm">
                    {currency === 'PEN' ? `S/ ${totalPen.toFixed(2)}` : `$ ${totalUsd.toFixed(2)}`}
                  </span>
                </div>
                {couponApplied && (
                  <p className="text-[10px] text-emerald-400">✓ Cupón URBAN15 (15% OFF) aplicado</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                <span>Finalizar Compra Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : items.length === 0 ? (
            /* Empty state */
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-heading font-black text-lg text-slate-300">
                Tu bolsa está vacía
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explora las novedades de invierno: chaquetas térmicas impermeables y hoodies exclusivos.
              </p>
              <button
                onClick={onClose}
                className="inline-block mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Ver Colección
              </button>
            </div>
          ) : (
            /* Item List */
            <>
              {/* Free shipping banner */}
              <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-1">
                  <Truck className="w-4 h-4" />
                  {isFreeShipping ? (
                    <span>¡Tienes ENVÍO GRATIS asegurado! 🎉</span>
                  ) : (
                    <span>
                      Agrega{' '}
                      <strong className="text-white">
                        {currency === 'PEN'
                          ? `S/ ${(freeShippingThresholdPen - (subtotalPen - discountPen)).toFixed(2)}`
                          : `$ ${(freeShippingThresholdUsd - (subtotalUsd - discountUsd)).toFixed(2)}`}
                      </strong>{' '}
                      más para Envío Gratis
                    </span>
                  )}
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        currency === 'PEN'
                          ? ((subtotalPen - discountPen) / freeShippingThresholdPen) * 100
                          : ((subtotalUsd - discountUsd) / freeShippingThresholdUsd) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-white/10">
                {items.map((item, idx) => (
                  <div key={idx} className="py-3 flex gap-3 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-900 border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-heading font-bold text-xs text-white truncate">
                        {item.product.name}
                      </h5>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                          Talla: {item.selectedSize}
                        </span>
                        <span>{item.selectedColor}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-orange-400 font-mono">
                          {currency === 'PEN'
                            ? `S/ ${(item.product.pricePen * item.quantity).toFixed(2)}`
                            : `$ ${(item.product.price * item.quantity).toFixed(2)}`}
                        </span>

                        {/* Qty Controls */}
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-md">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      title="Eliminar prenda"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <div className="pt-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Código de descuento (ej. URBAN15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white uppercase placeholder-slate-500 font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cupón URBAN15 aplicado (-15%)
                  </p>
                )}
                {couponError && (
                  <p className="text-xs text-red-400 mt-1">{couponError}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer calculation & checkout trigger */}
        {!orderComplete && items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal:</span>
                <span>
                  {currency === 'PEN' ? `S/ ${subtotalPen.toFixed(2)}` : `$ ${subtotalUsd.toFixed(2)}`}
                </span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Descuento (15% OFF):</span>
                  <span>
                    -{currency === 'PEN' ? `S/ ${discountPen.toFixed(2)}` : `$ ${discountUsd.toFixed(2)}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Costo de Envío:</span>
                <span>
                  {isFreeShipping ? (
                    <strong className="text-emerald-400">¡GRATIS!</strong>
                  ) : (
                    currency === 'PEN' ? `S/ ${shippingCostPen.toFixed(2)}` : `$ ${shippingCostUsd.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span className="font-heading uppercase tracking-wider">Total:</span>
                <span className="text-orange-400 font-heading">
                  {currency === 'PEN' ? `S/ ${totalPen.toFixed(2)}` : `$ ${totalUsd.toFixed(2)}`}
                </span>
              </div>
            </div>

            {!isCheckingOut && (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-bold uppercase tracking-wider text-xs text-white shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Proceder al Pago Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Transacciones encriptadas con garantía de satisfacción UrbanVibes</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
