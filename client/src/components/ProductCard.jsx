import React from 'react';
import { Star, Sparkles, Heart, ShoppingBag, Eye, MapPin, Award, MessageSquare } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
  onOpenProvenance,
  onOpenChat
}) {
  const { formatPrice } = useCurrency();

  return (
    <div style={{
      background: 'rgba(15, 22, 36, 0.75)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
      e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 25px rgba(59, 130, 246, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
    }}
    >
      {/* Product Image Box */}
      <div 
        style={{
          position: 'relative',
          height: '240px',
          width: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
          background: '#090d15'
        }}
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image_url}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />

        {/* Category Chip */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(9, 13, 22, 0.82)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '9999px',
          padding: '4px 10px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#e2e8f0',
          letterSpacing: '0.04em'
        }}>
          {product.category}
        </div>

        {/* Top Right: Wishlist & Handmade Badge */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist && onToggleWishlist(product);
            }}
            style={{
              background: 'rgba(9, 13, 22, 0.82)',
              backdropFilter: 'blur(8px)',
              border: isWishlisted ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isWishlisted ? '#f43f5e' : '#cbd5e1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            title={isWishlisted ? 'Remove from Saved Heirlooms' : 'Save to Heirlooms'}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
          >
            <Heart size={15} fill={isWishlisted ? '#f43f5e' : 'none'} />
          </button>

          <div style={{
            background: 'rgba(16, 185, 129, 0.85)',
            borderRadius: '6px',
            padding: '3px 8px',
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}>
            HANDMADE
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Artisan Attribution */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.78rem',
          color: '#38bdf8',
          marginBottom: '6px',
          fontWeight: 600
        }}>
          <MapPin size={13} style={{ color: '#f59e0b' }} />
          <span>By {product.artisan_name}</span>
          <span style={{ color: '#64748b' }}>•</span>
          <span style={{ color: '#94a3b8' }}>{product.artisan_village}</span>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onSelectProduct(product)}
          style={{
            fontSize: '1.08rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 8px 0',
            lineHeight: 1.35,
            cursor: 'pointer'
          }}
        >
          {product.title}
        </h3>

        {/* Impact Highlight Tag */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.22)',
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#fbbf24',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <Sparkles size={12} />
          <span>{product.impact_tag}</span>
        </div>

        {/* Rating and Stock */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          fontSize: '0.8rem',
          color: '#94a3b8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={14} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
            <span style={{ fontWeight: 700, color: '#f8fafc' }}>{product.rating}</span>
            <span>({product.reviews_count} reviews)</span>
          </div>

          <div style={{
            fontSize: '0.74rem',
            color: product.stock <= 5 ? '#f43f5e' : '#10b981',
            fontWeight: 600
          }}>
            {product.stock <= 5 ? `Only ${product.stock} left` : `${product.stock} in workshop`}
          </div>
        </div>

        {/* Bottom Bar: Price & Actions */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Fair Price</div>
            <div style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: '#ffffff'
            }}>
              {formatPrice(product.price)}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => onOpenProvenance && onOpenProvenance(product)}
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: '#fbbf24',
                padding: '9px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="View Digital Certificate of Authenticity"
            >
              <Award size={15} />
            </button>

            <button
              onClick={() => onOpenChat && onOpenChat(product)}
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                color: '#60a5fa',
                padding: '9px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Message Artisan Collective"
            >
              <MessageSquare size={15} />
            </button>

            <button
              onClick={() => onSelectProduct(product)}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
              title="View Artisan Story & Full Details"
            >
              <Eye size={14} />
              <span>Story</span>
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className="btn btn-primary"
              style={{ padding: '9px 14px', fontSize: '0.82rem' }}
            >
              <ShoppingBag size={14} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
