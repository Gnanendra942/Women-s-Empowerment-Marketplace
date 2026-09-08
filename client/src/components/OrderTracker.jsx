import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, Truck, ShieldCheck, Sparkles, Box, ArrowRight } from 'lucide-react';

export default function OrderTracker() {
  const [query, setQuery] = useState('ORD-88210');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/orders/track/${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order not located in pipeline.');
      setOrder(data);
    } catch (err) {
      setError(err.message);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial lookup
  React.useEffect(() => {
    handleTrack();
  }, []);

  const stages = [
    { title: 'Pending', label: 'Order Registered', desc: 'Signed on distributed ledger' },
    { title: 'Artisan Crafting', label: 'Loom & Clay Shaping', desc: 'Handcrafted in village workshop' },
    { title: 'Quality Check', label: 'Fair Trade Verification', desc: 'Ethical standard inspection' },
    { title: 'Dispatched', label: 'In Eco Transit', desc: 'Dispatched with regional courier' },
    { title: 'Delivered', label: 'Delivered to Patron', desc: 'Fair trade disbursement released' }
  ];

  const getStageIndex = (status) => {
    const idx = stages.findIndex(s => s.title.toLowerCase() === (status || '').toLowerCase());
    return idx === -1 ? 0 : idx;
  };

  const currentIdx = order ? getStageIndex(order.status) : 0;

  return (
    <div style={{ maxWidth: '900px', margin: '16px auto 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Search Header */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-tech">DISTRIBUTED PIPELINE EXPLORER</span>
          <span className="badge badge-live">ZERO-KNOWLEDGE AUTH</span>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
          Track Artisan Handcraft Lifecycle
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '20px' }}>
          Follow the journey of your craft from the woman artisan's loom to your doorstep.
        </p>

        <form onSubmit={handleTrack} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Enter Order # (e.g. ORD-88210) or Tracking Code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, padding: '12px 18px', fontSize: '0.92rem' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            <Search size={16} />
            <span>Locate</span>
          </button>
        </form>

        {/* Quick Sample Links */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px', fontSize: '0.78rem', color: '#64748b' }}>
          <span>Try quick demo codes:</span>
          {['ORD-88210', 'ORD-88211', 'ORD-88212', 'ORD-88213'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => { setQuery(code); }}
              style={{ color: '#60a5fa', textDecoration: 'underline', background: 'none' }}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          <div className="pulse-dot" style={{ width: '10px', height: '10px', marginBottom: '10px' }}></div>
          <p>Querying distributed order pipeline nodes...</p>
        </div>
      )}

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '16px 20px',
          color: '#fca5a5',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      {order && (
        <div className="glass-panel" style={{ padding: '32px' }}>
          {/* Order Meta Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '20px',
            marginBottom: '28px'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase' }}>Consignment Reference</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                {order.order_number}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase' }}>Tracking Hash</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                {order.tracking_code}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase' }}>Live State</div>
              <span className="badge badge-live" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                {order.status}
              </span>
            </div>
          </div>

          {/* Stepper Pipeline Visualization */}
          <div style={{ position: 'relative', margin: '20px 0 40px' }}>
            {/* Horizontal Line */}
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '5%',
              right: '5%',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.1)',
              zIndex: 1
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                width: `${(currentIdx / (stages.length - 1)) * 100}%`,
                transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>

            {/* Stages Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 2
            }}>
              {stages.map((stg, i) => {
                const isPassed = i <= currentIdx;
                const isCurrent = i === currentIdx;

                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '140px', textAlign: 'center' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: isCurrent ? '#2563eb' : isPassed ? '#10b981' : '#101625',
                      border: `2px solid ${isCurrent ? '#60a5fa' : isPassed ? '#34d399' : 'rgba(255, 255, 255, 0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      marginBottom: '10px',
                      boxShadow: isCurrent ? 'var(--glow-blue)' : isPassed ? 'var(--glow-emerald)' : 'none',
                      transition: 'all 0.3s ease'
                    }}>
                      {isPassed ? <CheckCircle2 size={20} /> : <Clock size={20} style={{ color: '#64748b' }} />}
                    </div>

                    <div style={{
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      color: isCurrent ? '#60a5fa' : isPassed ? '#f8fafc' : '#64748b',
                      lineHeight: 1.2,
                      marginBottom: '3px'
                    }}>
                      {stg.label}
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      {stg.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Artisan Notes / Dispatch Details */}
          {order.artisan_notes && (
            <div style={{
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                Artisan Dispatch Log
              </div>
              <div style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>
                "{order.artisan_notes}"
              </div>
            </div>
          )}

          {/* Item Breakdown */}
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
              Consigned Handcraft Items ({order.items?.length || 0})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {order.items?.map((it, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  padding: '12px 16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '1.2rem' }}>📦</div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                        {it.product_title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Quantity: {it.quantity}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
                    ${(it.quantity * it.unit_price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Destination Address:</span>
              <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.88rem' }}>
                {order.shipping_address}, {order.city}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
