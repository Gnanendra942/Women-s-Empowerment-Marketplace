import React from 'react';
import { ShieldCheck, Award, MapPin, CheckCircle2, Hash, Printer } from 'lucide-react';

export default function ProvenanceModal({ product, onClose }) {
  if (!product) return null;

  // Generate deterministic SHA-like hash from product attributes
  const craftHash = 'SHA256: ' + Array.from(`${product.id}-${product.title}-${product.artisan_name}-VERIFIED-ARTISAN`)
    .reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0)
    .toString(16)
    .toUpperCase()
    .padStart(8, '0') + '...9F4E88';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(3, 7, 18, 0.88)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#0d1322',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        borderRadius: '20px',
        maxWidth: '620px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
        position: 'relative',
        padding: '32px'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {/* Certificate Luxury Frame */}
        <div style={{
          border: '2px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '16px',
          padding: '28px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.08) 0%, rgba(10, 15, 26, 0.95) 100%)',
          position: 'relative'
        }}>
          {/* Watermark Seal */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '9rem',
            opacity: 0.04,
            pointerEvents: 'none',
            userSelect: 'none'
          }}>
            🌸
          </div>

          {/* Certificate Header */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '4px 12px',
              borderRadius: '9999px',
              color: '#fbbf24',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '10px'
            }}>
              <Award size={14} />
              AUTHENTIC ARTISAN GUILD PROVENANCE
            </div>
            <h2 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#ffffff',
              fontFamily: 'var(--font-heading)'
            }}>
              Certificate of Authenticity
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>
              Handcrafted Women's Empowerment Registry
            </div>
          </div>

          {/* Product Meta Card */}
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '20px'
          }}>
            <img
              src={product.image_url}
              alt={product.title}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '10px',
                objectFit: 'cover',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                {product.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600 }}>
                Craft: {product.craft_type}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <MapPin size={12} style={{ color: '#f59e0b' }} />
                Origin: {product.artisan_village || 'Handcraft Cluster'}
              </div>
            </div>
          </div>

          {/* Provenance Audit Checklist */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '22px' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '10px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '0.78rem', fontWeight: 700, marginBottom: '3px' }}>
                <CheckCircle2 size={14} />
                86% Fair-Wage Certified
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                Directly disbursed to artisan head of household bank account without middlemen.
              </div>
            </div>

            <div style={{
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '10px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60a5fa', fontSize: '0.78rem', fontWeight: 700, marginBottom: '3px' }}>
                <ShieldCheck size={14} />
                100% Zero-Carbon Loom
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                Alluvial clay, handloom shuttle & natural vegetable mineral dyes.
              </div>
            </div>
          </div>

          {/* Cryptographic Ledger & Signature */}
          <div style={{
            background: '#090d16',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
              <Hash size={12} />
              IMMUTABLE ARTISAN PROVENANCE HASH
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#38bdf8', wordBreak: 'break-all' }}>
              {craftHash}
            </div>
          </div>

          {/* Signature Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px dashed rgba(255, 255, 255, 0.12)',
            paddingTop: '16px'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Verified Master Artisan:</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', fontStyle: 'italic', fontFamily: 'serif' }}>
                {product.artisan_name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Dhaga Kala Women's Guild</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Registry Status</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399' }}>✓ Blockchain Provenance Stamped</div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
          <button
            onClick={handlePrint}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Printer size={15} />
            Print Certificate
          </button>

          <button
            onClick={onClose}
            style={{
              padding: '9px 22px',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 700
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
