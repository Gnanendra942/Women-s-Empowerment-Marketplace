import React from 'react';
import { ShoppingBag, ShieldCheck, Layers, ArrowRight, Activity } from 'lucide-react';

export default function FlagshipBanner({ activeTab, setActiveTab }) {
  return (
    <div style={{ margin: '24px 0 32px' }}>
      {/* Outer Super-heading */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        fontSize: '1.25rem', 
        fontWeight: 700, 
        color: '#f8fafc',
        marginBottom: '12px'
      }}>
        <span>⭐</span>
        <span>Flagship Commerce Platform</span>
      </div>

      {/* Flagship Banner Card */}
      <div style={{
        background: '#090d16',
        borderRadius: '16px',
        border: '1px solid #1c2638',
        borderTop: '3px solid #3b82f6',
        padding: '24px 30px',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Background Glow */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Left Content Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flex: '1 1 550px' }}>
          {/* Marketplace Icon Box */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '14px',
            background: 'linear-gradient(145deg, #131b2c, #0c121e)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            flexShrink: 0
          }}>
            🛍️
          </div>

          {/* Details */}
          <div>
            {/* Live Status Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '9999px',
                padding: '2px 10px',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#34d399',
                letterSpacing: '0.04em'
              }}>
                <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                <span>FLAGSHIP ARCHITECTURE</span>
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#60a5fa',
                letterSpacing: '0.06em'
              }}>
                LIVE
              </div>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 6px 0',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              Women's Empowerment Marketplace
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#60a5fa',
              margin: '0 0 6px 0',
              lineHeight: 1.4
            }}>
              Full-stack digital commerce engine empowering women artisans & local cottage entrepreneurs.
            </p>

            {/* Pipeline features */}
            <p style={{
              fontSize: '0.84rem',
              color: '#94a3b8',
              margin: 0,
              fontFamily: 'var(--font-mono)'
            }}>
              Dynamic storefronts · Seller analytics suite · Encrypted JWT Auth · Distributed Order Pipeline
            </p>
          </div>
        </div>

        {/* Right Action Column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'stretch',
          minWidth: '180px',
          flexShrink: 0
        }}>
          {/* Badge 1 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '7px 14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            letterSpacing: '0.04em'
          }}>
            <span style={{ color: '#3b82f6' }}>+</span> FULL-STACK REACT
          </div>

          {/* Badge 2 */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '8px',
            padding: '7px 14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            letterSpacing: '0.04em'
          }}>
            <span style={{ color: '#10b981' }}>+</span> SECURE COMMERCE
          </div>

          {/* Action Button */}
          <button
            onClick={() => setActiveTab(activeTab === 'store' ? 'seller' : 'store')}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: 'none',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.2s ease',
              letterSpacing: '0.04em'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#1d4ed8';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>{activeTab === 'store' ? 'EXPLORE SELLER SUITE' : 'VIEW PATRON STORE'}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
