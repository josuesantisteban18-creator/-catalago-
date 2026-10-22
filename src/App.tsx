import React, { useState } from 'react';
import { 
  AppMode, SystemTab, Product, CartItem, AdCampaign, LeadContact, EmailSequence 
} from './types';
import { 
  INITIAL_PRODUCTS, INITIAL_CAMPAIGNS, INITIAL_LEADS, INITIAL_EMAIL_SEQUENCES 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Storefront } from './components/store/Storefront';
import { ProductModal } from './components/store/ProductModal';
import { CartDrawer } from './components/store/CartDrawer';
import { NewsletterBanner } from './components/store/NewsletterBanner';
import { AdminSystem } from './components/system/AdminSystem';

export default function App() {
  const [mode, setMode] = useState<AppMode>('store');
  const [systemTab, setSystemTab] = useState<SystemTab>('campaigns');
  const [currency, setCurrency] = useState<'PEN' | 'USD'>('PEN');

  // Products & Cart
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      selectedSize: 'L',
      selectedColor: 'Negro carbón'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  // Marketing & System State
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(INITIAL_CAMPAIGNS);
  const [leads, setLeads] = useState<LeadContact[]>(INITIAL_LEADS);
  const [emailSequences, setEmailSequences] = useState<EmailSequence[]>(INITIAL_EMAIL_SEQUENCES);
  const [referredFromAd, setReferredFromAd] = useState<{ stage: string; cta: string } | null>(null);

  // Navigation from ad button (Descubre más, Finaliza tu compra) to the UrbanVibes landing page
  const handleNavigateToLanding = (stage: string, cta: string) => {
    setReferredFromAd({ stage, cta });
    setMode('store');
  };

  // Lead registration via "Registrarse" form (Nombre, Apellidos, Correo, Teléfono)
  const handleRegisterLead = (newLeadData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    interest: string;
    source: LeadContact['source'];
  }) => {
    const newLead: LeadContact = {
      id: `ld-${Date.now()}`,
      name: `${newLeadData.firstName} ${newLeadData.lastName}`,
      firstName: newLeadData.firstName,
      lastName: newLeadData.lastName,
      email: newLeadData.email,
      phone: newLeadData.phone,
      source: newLeadData.source,
      stage: 'Lead',
      interest: newLeadData.interest,
      createdDate: new Date().toLocaleDateString('es-PE'),
      lastActivity: 'Registrado en formulario web',
      emailsSent: 1, // Email 1 de bienvenida enviado inmediatamente
      emailsOpened: 1,
      hasPurchased: false,
      totalSpent: 0
    };

    setLeads((prev) => [newLead, ...prev]);

    // Update campaign metrics
    setCampaigns((prev) =>
      prev.map((c) => {
        const isMatchedStage = newLeadData.source.includes(c.stage);
        if (isMatchedStage) {
          return {
            ...c,
            metrics: {
              ...c.metrics,
              clicks: c.metrics.clicks + 1,
              conversions: c.metrics.conversions + 1
            }
          };
        }
        return c;
      })
    );

    // Bump count for Sequence Email 1 (Bienvenida e introducción)
    setEmailSequences((prev) =>
      prev.map((s) => (s.id === 'seq-01' ? { ...s, sentCount: s.sentCount + 1 } : s))
    );
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Order completed in store: triggers sync with CRM and Campaign Metrics
  const handleOrderSuccess = (orderTotal: number, customerName: string, customerEmail: string) => {
    // 1. Add or update lead in HubSpot CRM
    const newCustomerLead: LeadContact = {
      id: `ld-${Date.now()}`,
      name: customerName,
      email: customerEmail,
      phone: '+51 987 654 321',
      source: 'Retargeting BOFU',
      stage: 'Cliente',
      interest: cartItems[0]?.product.name || 'Colección Invierno 2024',
      createdDate: new Date().toLocaleDateString('es-PE'),
      lastActivity: 'Realizó compra en tienda online',
      emailsSent: 1,
      emailsOpened: 1,
      hasPurchased: true,
      totalSpent: orderTotal
    };

    setLeads((prev) => [newCustomerLead, ...prev]);

    // 2. Increase BOFU and overall campaign conversions & revenue
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.stage === 'BOFU') {
          return {
            ...c,
            metrics: {
              ...c.metrics,
              conversions: c.metrics.conversions + 1,
              revenue: c.metrics.revenue + (currency === 'PEN' ? orderTotal / 3.75 : orderTotal)
            }
          };
        }
        return c;
      })
    );
  };

  // Lead Magnet subscription in store
  const handleSubscribeNewsletter = (name: string, email: string, interest: string) => {
    const newLead: LeadContact = {
      id: `ld-${Date.now()}`,
      name,
      email,
      phone: '+51 9' + Math.floor(10000000 + Math.random() * 90000000),
      source: 'Pop-up Tienda (15% OFF)',
      stage: 'MQL',
      interest,
      createdDate: new Date().toLocaleDateString('es-PE'),
      lastActivity: 'Suscripción al boletín (Cupón URBAN15)',
      emailsSent: 1,
      emailsOpened: 1,
      hasPurchased: false,
      totalSpent: 0
    };

    setLeads((prev) => [newLead, ...prev]);

    // Also bump MOFU impressions/clicks in campaign
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.stage === 'MOFU') {
          return {
            ...c,
            metrics: {
              ...c.metrics,
              clicks: c.metrics.clicks + 1,
              conversions: c.metrics.conversions + 1
            }
          };
        }
        return c;
      })
    );
  };

  // System campaigns updates
  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'Activo' ? 'Pausado' : 'Activo' } : c))
    );
  };

  const handleUpdateCampaign = (updated: AdCampaign) => {
    setCampaigns((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  // Manual Add Lead in HubSpot
  const handleAddManualLead = (leadData: Omit<LeadContact, 'id' | 'createdDate' | 'lastActivity' | 'emailsSent' | 'emailsOpened' | 'hasPurchased' | 'totalSpent'>) => {
    const newLead: LeadContact = {
      ...leadData,
      id: `ld-${Date.now()}`,
      createdDate: new Date().toLocaleDateString('es-PE'),
      lastActivity: 'Registrado manualmente en CRM',
      emailsSent: 0,
      emailsOpened: 0,
      hasPurchased: false,
      totalSpent: 0
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  // Test email simulation
  const handleSendTestEmail = (sequenceId: string, leadEmail: string) => {
    setEmailSequences((prev) =>
      prev.map((s) => (s.id === sequenceId ? { ...s, sentCount: s.sentCount + 1 } : s))
    );
    setLeads((prev) =>
      prev.map((l) => (l.email === leadEmail ? { ...l, emailsSent: l.emailsSent + 1 } : l))
    );
  };

  // Live simulation of sale in Analytics
  const handleSimulateSale = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const simulatedSpendUsd = randomProduct.price;

    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.stage === 'BOFU') {
          return {
            ...c,
            metrics: {
              ...c.metrics,
              conversions: c.metrics.conversions + 1,
              revenue: c.metrics.revenue + simulatedSpendUsd
            }
          };
        }
        return c;
      })
    );

    const randomName = ['Luciana García', 'Diego Morales', 'Franco Castillo', 'Andrea Vega'][
      Math.floor(Math.random() * 4)
    ];

    const newSimulatedLead: LeadContact = {
      id: `ld-${Date.now()}`,
      name: randomName,
      email: `${randomName.toLowerCase().replace(' ', '.')}@gmail.com`,
      phone: '+51 98' + Math.floor(1000000 + Math.random() * 9000000),
      source: 'Retargeting BOFU',
      stage: 'Cliente',
      interest: randomProduct.name,
      createdDate: new Date().toLocaleDateString('es-PE'),
      lastActivity: 'Compró vía anuncio de retargeting',
      emailsSent: 2,
      emailsOpened: 2,
      hasPurchased: true,
      totalSpent: randomProduct.pricePen
    };

    setLeads((prev) => [newSimulatedLead, ...prev]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#090a10] flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar
        mode={mode}
        setMode={setMode}
        systemTab={systemTab}
        setSystemTab={setSystemTab}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
        openNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Main View: Storefront vs System */}
      <main className="flex-1">
        {mode === 'store' ? (
          <Storefront
            products={products}
            leads={leads}
            onRegisterLead={handleRegisterLead}
            referredFromAd={referredFromAd}
            onClearReferredAd={() => setReferredFromAd(null)}
            onSendTestEmail={handleSendTestEmail}
            setMode={setMode}
            setSystemTab={setSystemTab}
            onOpenProduct={(p) => setSelectedProduct(p)}
            currency={currency}
          />
        ) : (
          <AdminSystem
            systemTab={systemTab}
            setSystemTab={setSystemTab}
            campaigns={campaigns}
            onToggleCampaignStatus={handleToggleCampaignStatus}
            onUpdateCampaign={handleUpdateCampaign}
            leads={leads}
            emailSequences={emailSequences}
            onAddLead={handleAddManualLead}
            onSendTestEmail={handleSendTestEmail}
            onSimulateSale={handleSimulateSale}
            setMode={setMode}
            onNavigateToLanding={handleNavigateToLanding}
          />
        )}
      </main>

      {/* Product Details Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Slide-out Cart Drawer & Checkout Simulator */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Newsletter 15% OFF Lead Magnet Popup */}
      <NewsletterBanner
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
        onSubscribe={handleSubscribeNewsletter}
      />
    </div>
  );
}
