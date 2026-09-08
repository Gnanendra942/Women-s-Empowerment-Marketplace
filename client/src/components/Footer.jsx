import React from 'react';
import { Heart, ShieldCheck, Globe, Sparkles } from 'lucide-react';

export default function Footer({ onDemoLogin }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: '#06080d',
      padding: '48px 24px 32px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '36px',
        marginBottom: '40px'
      }}>
        {/* Col 1 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '1.4rem' }}>🌸</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>WOMEN'S MARKETPLACE</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
            Bridging rural women master artisans and conscious global patrons through direct, transparent digital commerce.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#10b981' }}>
            <ShieldCheck size={16} />
            <span>86% Direct Fair-Trade Disbursement Guaranteed</span>
          </div>
        </div>

        {/* Col 2: Artisan Heritage */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.05em' }}>
            Artisanal Guilds
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>
            <li>Varanasi Handloom Weavers Collective</li>
            <li>Bankura Terracotta Sculptors Hamlet</li>
            <li>Cuttack Tarakasi Silver Filigree Guild</li>
            <li>Pahalgam Himalayan Foraged Botanicals</li>
            <li>Jaipur Natural Indigo Dye Guild</li>
          </ul>
        </div>

        {/* Col 3: Architecture & Security */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.05em' }}>
            Flagship Architecture
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>
            <li>⚡ Full-Stack React 18 & Vite SPA</li>
            <li>🔒 Encrypted JWT Authentication</li>
            <li>📦 Distributed Order Lifecycle Pipeline</li>
            <li>📊 Real-time Seller Analytics Suite</li>
            <li>💾 Zero-Latency SQLite Storage</li>
          </ul>
        </div>

        {/* Col 4: Quick Test Switcher */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.05em' }}>
            Role Testing Console
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '12px' }}>
            Instantly switch between buyer and artisan perspectives:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => onDemoLogin('artisan')}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', justifyContent: 'flex-start', padding: '8px 12px' }}
            >
              👩‍🎨 Switch to Demo Artisan Seller
            </button>
            <button
              onClick={() => onDemoLogin('customer')}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', justifyContent: 'flex-start', padding: '8px 12px' }}
            >
              🛍️ Switch to Demo Patron Buyer
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        paddingTop: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.78rem',
        color: '#64748b'
      }}>
        <div>
          © 2026 Women's Empowerment Marketplace. All rights reserved. Handcrafted with pride.
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Terms of Ethical Commerce</span>
          <span>Privacy & Cryptography</span>
          <span>Artisan Charter</span>
        </div>
      </div>
    </footer>
  );
}
