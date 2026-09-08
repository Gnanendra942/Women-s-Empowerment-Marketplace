import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, onDemoLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('artisan');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const body = isRegister 
      ? { name, email, password, role, location }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed.');

      localStorage.setItem('wem_token', data.token);
      onAuthSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          padding: '28px',
          background: '#0a0e18',
          border: '1px solid rgba(255, 255, 255, 0.14)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            color: '#94a3b8'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            color: '#ffffff'
          }}>
            <Lock size={22} />
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
            {isRegister ? 'Join the Artisan Network' : 'Patron & Artisan Gateway'}
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
            Encrypted JWT Authentication · Decentralized Ledger Ready
          </p>
        </div>

        {/* 1-Click Instant Demo Credentials */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.74rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
            Instant Demo Logins (No password needed)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                onDemoLogin('artisan');
                onClose();
              }}
              className="btn"
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontSize: '0.78rem',
                padding: '8px'
              }}
            >
              👩‍🎨 Artisan Seller
            </button>
            <button
              type="button"
              onClick={() => {
                onDemoLogin('customer');
                onClose();
              }}
              className="btn"
              style={{
                background: 'rgba(59, 130, 246, 0.15)',
                color: '#93c5fd',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                fontSize: '0.78rem',
                padding: '8px'
              }}
            >
              🛍️ Patron Buyer
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#fca5a5',
              fontSize: '0.82rem'
            }}>
              {error}
            </div>
          )}

          {isRegister && (
            <div>
              <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Account Purpose</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setRole('artisan')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: role === 'artisan' ? '#2563eb' : '#111726',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  Artisan Seller
                </button>
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: role === 'customer' ? '#2563eb' : '#111726',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  Patron Buyer
                </button>
              </div>
            </div>
          )}

          {isRegister && (
            <div>
              <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Radhika Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Email Address</label>
            <input
              type="email"
              placeholder="e.g. yourname@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          {isRegister && (
            <div>
              <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Location / Village Region</label>
              <input
                type="text"
                placeholder="e.g. Jaipur, Rajasthan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '6px' }}
          >
            {loading ? 'Validating credentials...' : isRegister ? 'Create Account' : 'Sign In Securely'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              style={{ fontSize: '0.82rem', color: '#60a5fa', background: 'none' }}
            >
              {isRegister ? 'Already registered? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
