import React, { useState, useEffect } from 'react';
import { MapPin, Star, Sparkles, Store, ShoppingBag, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import ProductCard from './ProductCard';

export default function SellerStorefronts({ onSelectProduct, onAddToCart }) {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sellers')
      .then(res => res.json())
      .then(data => {
        setSellers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching sellers:', err);
        setLoading(false);
      });
  }, []);

  const handleOpenStorefront = async (sellerId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sellers/${sellerId}`);
      const data = await res.json();
      setSellerDetails(data);
      setSelectedSeller(sellerId);
    } catch (err) {
      console.error('Failed to load seller storefront:', err);
    } finally {
      setLoading(false);
    }
  };

  // View: Single Dedicated Artisan Storefront Page
  if (selectedSeller && sellerDetails) {
    const { seller, products, stats } = sellerDetails;

    return (
      <div style={{ marginTop: '16px' }}>
        {/* Back Button */}
        <button
          onClick={() => { setSelectedSeller(null); setSellerDetails(null); }}
          className="btn btn-secondary"
          style={{ marginBottom: '20px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Artisan Guilds</span>
        </button>

        {/* Custom Dynamic Storefront Hero Banner */}
        <div style={{
          background: 'linear-gradient(145deg, #111a2e, #090d16)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderTop: '3px solid #f59e0b',
          borderRadius: '20px',
          padding: '36px',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            right: '-60px',
            top: '-60px',
            width: '240px',
            height: '240px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '28px', flexWrap: 'wrap' }}>
            {/* Artisan Avatar */}
            <img
              src={seller.avatar || '/images/ananya_artisan.jpg'}
              alt={seller.name}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #f59e0b',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)'
              }}
            />

            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span className="badge badge-amber">AUTHENTICATED SELLER STOREFRONT</span>
                <span className="badge badge-live">DIRECT COOPERATIVE</span>
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0' }}>
                {seller.name}'s Heritage Atelier
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#38bdf8', marginBottom: '14px' }}>
                <MapPin size={15} style={{ color: '#f59e0b' }} />
                <span>{seller.location}</span>
                <span style={{ color: '#64748b' }}>•</span>
                <span style={{ color: '#cbd5e1' }}>{seller.artisan_collective}</span>
              </div>

              <p style={{ fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '800px', marginBottom: '20px' }}>
                {seller.bio}
              </p>

              {/* Verified Badges Bar */}
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Available Creations</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{stats.total_products}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Patron Reviews</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>
                    ⭐ {stats.average_rating} ({stats.total_reviews})
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Fair-Trade Share</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>86% Direct</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Storefront Products Grid */}
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px' }}>
          Exclusive Creations by {seller.name} ({products.length})
        </h3>

        {products.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>This artisan is currently crafting new pieces in the workshop.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {products.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // View: Directory of All Artisan Sellers / Collectives
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{
        background: 'rgba(14, 20, 32, 0.65)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '28px',
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-tech">MULTI-VENDOR STOREFRONTS</span>
          <span className="badge badge-live">DECENTRALIZED ARTISAN NETWORK</span>
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0' }}>
          Explore Certified Women Artisan Collectives
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0, maxWidth: '750px' }}>
          Every seller on our platform is a verified female head of household or cottage guild leader.
          Explore individual brand storefronts to learn about their regional heritage and support their workshops directly.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
          <div className="pulse-dot" style={{ width: '12px', height: '12px', marginBottom: '12px' }}></div>
          <p>Loading multi-vendor artisan storefronts...</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {sellers.map((s) => (
            <div
              key={s.id}
              className="glass-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => handleOpenStorefront(s.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-card)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <img
                    src={s.avatar || '/images/ananya_artisan.jpg'}
                    alt={s.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #f59e0b'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: '0 0 4px 0' }}>
                      {s.name}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 600 }}>
                      {s.artisan_collective}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <MapPin size={12} />
                      <span>{s.location}</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '16px' }}>
                  {s.bio}
                </p>
              </div>

              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                  {s.product_count} Listed Handcrafts
                </span>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                >
                  <span>Visit Storefront →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
