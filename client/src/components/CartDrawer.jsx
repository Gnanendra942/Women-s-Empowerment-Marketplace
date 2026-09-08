import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, CheckCircle, PackageCheck, Sparkles } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess
}) {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);
  const artisanPayout = (total * 0.86).toFixed(2);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ARTISAN10') {
      const disc = subtotal * 0.1;
      setDiscount(disc);
      setPromoMessage('✨ 10% Patron Community discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'EMPOWER') {
      const disc = 15;
      setDiscount(disc);
      setPromoMessage('✨ $15 Women In Craft empowerment grant applied!');
    } else {
      setPromoMessage('❌ Invalid voucher code. Try "ARTISAN10"');
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !address) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          customer_email: customerEmail,
          shipping_address: address,
          city,
          postal_code: postalCode,
          items: cartItems,
          total_amount: total,
          payment_method: 'Card (Simulated)'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      setConfirmedOrder(data.order);
      setStep('success');
      onClearCart();
      if (onOrderSuccess) onOrderSuccess(data.order);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100vh',
          background: '#090d16',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🛍️</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              {step === 'cart' && `Your Bag (${cartItems.length})`}
              {step === 'checkout' && 'Patron Checkout'}
              {step === 'success' && 'Order Placed!'}
            </h3>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body based on Step */}
        {step === 'cart' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
            {cartItems.length === 0 ? (
              <div style={{ margin: 'auto', textAlign: 'center', padding: '40px 24px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧺</div>
                <h4 style={{ color: '#ffffff', marginBottom: '6px' }}>Your artisan bag is empty</h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px' }}>
                  Explore handcrafted items made with love by women entrepreneurs.
                </p>
                <button onClick={onClose} className="btn btn-primary">
                  Browse Catalog
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '12px'
                      }}
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.3 }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#38bdf8' }}>
                            By {item.artisan_name}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                            {formatPrice(item.price * item.quantity)}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: '#090d16',
                              borderRadius: '6px',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                style={{ padding: '3px 8px', color: '#94a3b8' }}
                              >-</button>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0 6px' }}>{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                style={{ padding: '3px 8px', color: '#94a3b8' }}
                              >+</button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              style={{ color: '#ef4444', padding: '4px' }}
                              title="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div style={{ padding: '0 24px 16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Voucher code (use ARTISAN10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{ flex: 1, fontSize: '0.82rem', padding: '8px 12px' }}
                    />
                    <button onClick={applyPromo} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 12px' }}>
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <div style={{ fontSize: '0.74rem', marginTop: '6px', color: discount > 0 ? '#34d399' : '#f87171' }}>
                      {promoMessage}
                    </div>
                  )}
                </div>

                {/* Summary & Footer */}
                <div style={{
                  padding: '20px 24px',
                  background: '#0c121e',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  {/* Fair trade payout transparency */}
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: '#34d399'
                  }}>
                    <ShieldCheck size={16} />
                    <span><strong>{formatPrice(total * 0.86)}</strong> will directly disburse to women artisan bank accounts.</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#34d399', marginBottom: '6px' }}>
                      <span>Voucher Discount:</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                    <span>Total Due:</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <button
                    onClick={() => setStep('checkout')}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px' }}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step: Checkout Form */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckout} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                Delivery Destination & Patron Info
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. priya@market.org"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. 42 Lotus Boulevard, Apt 5B"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>City</label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Postal Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 560001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{
                background: '#111726',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginTop: '10px'
              }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Payment Method</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc', fontSize: '0.88rem', fontWeight: 600 }}>
                  <span>💳 Encrypted Test Gateway (Live Simulated Auth)</span>
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px 24px',
              background: '#0c121e',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              gap: '12px'
            }}>
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                {submitting ? 'Authenticating...' : `Authorize ${formatPrice(total)}`}
              </button>
            </div>
          </form>
        )}

        {/* Step: Order Placed Success */}
        {step === 'success' && confirmedOrder && (
          <div style={{ margin: 'auto', textAlign: 'center', padding: '30px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399',
              marginBottom: '16px'
            }}>
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Order Confirmed!
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '16px', lineHeight: 1.5 }}>
              Thank you, <strong>{confirmedOrder.customer_name}</strong>. Your fair-trade purchase has been entered into the Distributed Order Pipeline.
            </p>

            <div style={{
              background: '#101625',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '16px',
              width: '100%',
              textAlign: 'left',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.84rem' }}>
                <span style={{ color: '#94a3b8' }}>Order Number:</span>
                <span style={{ color: '#f8fafc', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{confirmedOrder.order_number}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.84rem' }}>
                <span style={{ color: '#94a3b8' }}>Tracking Identifier:</span>
                <span style={{ color: '#38bdf8', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{confirmedOrder.tracking_code}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span style={{ color: '#94a3b8' }}>Pipeline Status:</span>
                <span className="badge badge-live" style={{ fontSize: '0.7rem' }}>{confirmedOrder.status}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('cart');
                onClose();
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
