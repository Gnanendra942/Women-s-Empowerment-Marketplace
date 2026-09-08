import React, { useState } from 'react';
import { DollarSign, CheckCircle, Heart, Users, Sun, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function FairTradeCalculatorModal({ onClose }) {
  const [purchaseAmount, setPurchaseAmount] = useState(100);
  const [selectedCluster, setSelectedCluster] = useState('Varanasi');
  const { formatPrice } = useCurrency();

  const artisanWage = (purchaseAmount * 0.86);
  const materialsCost = (purchaseAmount * 0.08);
  const logisticsCost = (purchaseAmount * 0.06);

  const clusters = [
    {
      id: 'Varanasi',
      name: 'Dhaga Kala Weavers Guild',
      region: 'Varanasi, Uttar Pradesh',
      womenCount: 420,
      craft: 'Zari Brocade Handloom Silk & Cashmere',
      leadArtisan: 'Ananya Devi',
      solarEnergy: '100% Daylight Loom Sheds'
    },
    {
      id: 'Bankura',
      name: 'Mitti Roots Terracotta Guild',
      region: 'Bankura, West Bengal',
      womenCount: 290,
      craft: 'Alluvial Riverbed Sculpting & Pottery',
      leadArtisan: 'Meera Sen',
      solarEnergy: 'Bio-Wood Kilns & Solar Water Purifiers'
    },
    {
      id: 'Cuttack',
      name: 'Chandi Karigar Fellowship',
      region: 'Cuttack, Odisha',
      womenCount: 180,
      craft: 'Tarakasi Silver Wire Filigree Adornment',
      leadArtisan: 'Fatima Begum',
      solarEnergy: 'Precision Hand-Drawn Wire Work'
    },
    {
      id: 'Kutch',
      name: 'Kala Rakshak Needlecraft Guild',
      region: 'Bhuj, Gujarat',
      womenCount: 530,
      craft: 'Mirrorwork Embroidery & Bandhani Silk',
      leadArtisan: 'Shanta Ben',
      solarEnergy: 'Natural Indigo & Madder Vat Dyes'
    }
  ];

  const currentClusterData = clusters.find((c) => c.id === selectedCluster) || clusters[0];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(2, 6, 17, 0.88)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#0d1322',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        borderRadius: '20px',
        maxWidth: '720px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
        position: 'relative',
        padding: '32px'
      }}>
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

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#34d399',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: 800
          }}>
            100% TRANSPARENCY AUDIT
          </span>
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
          Fair-Trade Transparency & Direct Wage Engine
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '24px', lineHeight: 1.5 }}>
          Traditional middlemen often take up to 80% of artisan revenues. In our model, every transaction directly funds rural women heads of household with verified fair-wage direct deposits.
        </p>

        {/* Interactive Slider */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: 600 }}>
              Simulate Cart or Craft Value:
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
              {formatPrice(purchaseAmount)}
            </span>
          </div>

          <input
            type="range"
            min="20"
            max="500"
            step="5"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#10b981',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          />

          {/* Breakdown Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {/* 86% Direct Artisan */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '14px'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: '4px' }}>
                86% Direct Artisan Wage
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                {formatPrice(artisanWage)}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Instant direct deposit to woman artisan lead account.
              </div>
            </div>

            {/* 8% Raw Materials */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '14px'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '4px' }}>
                8% Natural Eco Materials
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                {formatPrice(materialsCost)}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Organic Mulberry silk, river clay, natural herbal dyes.
              </div>
            </div>

            {/* 6% Eco Logistics */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '12px',
              padding: '14px'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: '4px' }}>
                6% Solar Packaging
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                {formatPrice(logisticsCost)}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                100% biodegradable banana fiber packaging & couriers.
              </div>
            </div>
          </div>
        </div>

        {/* Cluster Explorer Section */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} style={{ color: '#10b981' }} />
            Explore Woman-Led Artisan Guild Clusters
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '14px', paddingBottom: '4px' }}>
            {clusters.map((cl) => (
              <button
                key={cl.id}
                onClick={() => setSelectedCluster(cl.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: selectedCluster === cl.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCluster === cl.id ? '#34d399' : '#94a3b8',
                  border: selectedCluster === cl.id ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {cl.name.split(' ')[0]} Cluster ({cl.region.split(',')[0]})
              </button>
            ))}
          </div>

          {/* Active Cluster Details */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(14, 20, 32, 0.8) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Guild Cluster Name</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{currentClusterData.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#34d399' }}>{currentClusterData.region}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Women Artisans Supported</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>{currentClusterData.womenCount}+ Weavers & Potters</div>
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Lead Master: {currentClusterData.leadArtisan}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Specialty Craft & Energy</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>{currentClusterData.craft}</div>
              <div style={{ fontSize: '0.74rem', color: '#60a5fa' }}>{currentClusterData.solarEnergy}</div>
            </div>
          </div>
        </div>

        {/* Global Collective Impact Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '20px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
              $148,500+
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Direct Fair-Wages Paid</div>
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>
              1,420+
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Women Heads of Household</div>
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>
              3,840 hrs
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Solar-Powered Craft Work</div>
          </div>
        </div>
      </div>
    </div>
  );
}
