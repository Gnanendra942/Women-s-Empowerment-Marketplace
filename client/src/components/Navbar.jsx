import React from 'react';
import { ShoppingBag, Sparkles, UserCheck, Shield, Search, Package, BarChart3, LogIn, LogOut, Video, Heart, Scale } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  user,
  onOpenAuth,
  onLogout,
  onDemoLogin,
  searchQuery,
  setSearchQuery,
  wishlistCount = 0,
  onOpenWishlist,
  onOpenFairTrade
}) {
  const { currentCurrency, setCurrentCurrency, availableCurrencies } = useCurrency();

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(8, 11, 17, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('store')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
            fontSize: '1.25rem'
          }}>
            🌸
          </div>
          <div>
            <div style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              WOMEN'S MARKETPLACE
              <span style={{
                fontSize: '0.65rem',
                padding: '2px 6px',
                borderRadius: '4px',
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#60a5fa',
                fontFamily: 'var(--font-mono)'
              }}>v2.4</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              Handmade Heritage · Fair Trade Commerce
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          flex: '1 1 280px',
          maxWidth: '380px'
        }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            placeholder="Search handcrafts, artisans, textiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 14px 9px 38px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: '#0e1420',
              color: '#f8fafc',
              fontSize: '0.86rem'
            }}
          />
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('store')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: activeTab === 'store' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'store' ? 'rgba(59, 130, 246, 0.18)' : 'transparent',
              border: activeTab === 'store' ? '1px solid rgba(59, 130, 246, 0.35)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShoppingBag size={15} />
            <span>Storefront</span>
          </button>

          <button
            onClick={() => setActiveTab('guilds')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: activeTab === 'guilds' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'guilds' ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
              border: activeTab === 'guilds' ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={15} style={{ color: '#fbbf24' }} />
            <span>Artisan Guilds</span>
          </button>

          <button
            onClick={() => setActiveTab('seller')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: activeTab === 'seller' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'seller' ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
              border: activeTab === 'seller' ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BarChart3 size={15} />
            <span>Seller Suite</span>
          </button>

          <button
            onClick={() => setActiveTab('workshops')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: activeTab === 'workshops' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'workshops' ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
              border: activeTab === 'workshops' ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Video size={15} style={{ color: activeTab === 'workshops' ? '#fbbf24' : '#f59e0b' }} />
            <span>Masterclasses</span>
          </button>


          <button
            onClick={() => setActiveTab('pipeline')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: activeTab === 'pipeline' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'pipeline' ? 'rgba(168, 85, 247, 0.18)' : 'transparent',
              border: activeTab === 'pipeline' ? '1px solid rgba(168, 85, 247, 0.35)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Package size={15} />
            <span>Order Pipeline</span>
          </button>
        </nav>

        {/* Right Tools: Currency, Wishlist, Fair Trade, Cart & Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Currency Dropdown Selector */}
          <select
            value={currentCurrency}
            onChange={(e) => setCurrentCurrency(e.target.value)}
            style={{
              background: '#0d1320',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '8px',
              padding: '7px 10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Switch Storefront Currency"
          >
            {availableCurrencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} ({c.symbol})
              </option>
            ))}
          </select>

          {/* Fair-Trade Transparency Button */}
          <button
            onClick={onOpenFairTrade}
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              padding: '7px 12px',
              color: '#34d399',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Interactive Fair-Trade Wage Breakdown"
          >
            <Scale size={14} />
            <span>86% Fair-Wage</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            style={{
              background: '#131b2c',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '8px',
              padding: '7px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: wishlistCount > 0 ? '#f43f5e' : '#94a3b8',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
            title="Saved Heirlooms"
          >
            <Heart size={15} fill={wishlistCount > 0 ? '#f43f5e' : 'none'} />
            {wishlistCount > 0 && <span>{wishlistCount}</span>}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            style={{
              position: 'relative',
              background: '#131b2c',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '10px',
              padding: '9px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.88rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)'}
          >
            <ShoppingBag size={17} style={{ color: '#60a5fa' }} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                background: '#ef4444',
                color: '#ffffff',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 7px',
                marginLeft: '4px'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* User Status / Quick Demo Switcher */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: user.role === 'artisan' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                border: `1px solid ${user.role === 'artisan' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`,
                padding: '6px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#2563eb',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {user.name.charAt(0)}
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
                    {user.name.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: user.role === 'artisan' ? '#34d399' : '#60a5fa', textTransform: 'uppercase' }}>
                    {user.role}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Sign out"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-card)',
                  color: '#94a3b8',
                  padding: '8px',
                  borderRadius: '8px'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => onDemoLogin('artisan')}
                className="btn"
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: '#34d399',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontSize: '0.78rem',
                  padding: '7px 12px'
                }}
                title="Quick switch to Artisan Seller mode"
              >
                ⚡ Demo Artisan
              </button>
              <button
                onClick={() => onDemoLogin('customer')}
                className="btn"
                style={{
                  background: 'rgba(59, 130, 246, 0.12)',
                  color: '#93c5fd',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  fontSize: '0.78rem',
                  padding: '7px 12px'
                }}
                title="Quick switch to Patron mode"
              >
                ⚡ Demo Buyer
              </button>
              <button
                onClick={onOpenAuth}
                className="btn btn-secondary"
                style={{ fontSize: '0.82rem', padding: '7px 12px' }}
              >
                <LogIn size={14} />
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
