import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export default function ProductCatalog({
  products,
  loading,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  onSelectProduct,
  onAddToCart,
  searchQuery,
  wishlist = [],
  onToggleWishlist,
  onOpenProvenance,
  onOpenChat,
  onOpenFairTrade
}) {
  const categories = [
    'All Crafts',
    'Saved Heirlooms',
    'Textiles & Apparel',
    'Home & Decor',
    'Jewelry & Adornment',
    'Organic Wellness'
  ];

  const displayedProducts = selectedCategory === 'Saved Heirlooms'
    ? products.filter((p) => wishlist.includes(p.id))
    : products;


  return (
    <section style={{ marginTop: '16px' }}>
      {/* Category Tabs & Controls Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
        padding: '16px 20px',
        background: 'rgba(14, 20, 32, 0.65)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        backdropFilter: 'blur(12px)'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isSelected = (selectedCategory === 'All' && cat === 'All Crafts') || selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All Crafts' ? 'All' : cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  background: isSelected ? '#2563eb' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  border: isSelected ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <SlidersHorizontal size={14} />
            Sort:
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: '6px 12px',
              fontSize: '0.82rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: '#0c121e',
              color: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            <option value="featured">Featured Artisans</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Fair Trade Assurance Banner */}
      <div 
        onClick={onOpenFairTrade}
        style={{
          background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '12px',
          padding: '14px 20px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, border-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.35)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} style={{ color: '#34d399' }} />
          <span style={{ fontSize: '0.86rem', color: '#e2e8f0', fontWeight: 500 }}>
            Every purchase guarantees <strong style={{ color: '#34d399' }}>86% direct fair-wage disbursement</strong> to woman-led rural artisan clusters.
          </span>
        </div>
        <span style={{
          fontSize: '0.74rem',
          fontWeight: 700,
          color: '#60a5fa',
          fontFamily: 'var(--font-mono)',
          background: 'rgba(59, 130, 246, 0.15)',
          padding: '4px 10px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          ✨ CLICK TO AUDIT DIRECT FAIR WAGE DISBURSEMENT
        </span>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <div className="pulse-dot" style={{ width: '12px', height: '12px', marginBottom: '12px' }}></div>
          <p>Connecting to decentralized artisan nodes...</p>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'rgba(15, 22, 36, 0.4)',
          borderRadius: '16px',
          border: '1px dashed rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '8px' }}>
            No artisanal crafts found matching "{searchQuery || selectedCategory}"
          </p>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Try resetting your filters or exploring our other heritage categories.
          </p>
          <button
            onClick={() => { setSelectedCategory('All Crafts'); }}
            className="btn btn-secondary"
            style={{ marginTop: '16px' }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {displayedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={onToggleWishlist}
              onOpenProvenance={onOpenProvenance}
              onOpenChat={onOpenChat}
            />
          ))}
        </div>
      )}
    </section>
  );
}
