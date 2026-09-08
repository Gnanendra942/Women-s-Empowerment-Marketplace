import React, { useState, useEffect } from 'react';
import { Video, Calendar, Clock, Sparkles, Users, Award, Package, Check, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function MasterclassStudio({ onSelectWorkshop }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', address: '' });
  const [confirmedPass, setConfirmedPass] = useState(null);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/workshops');
      const data = await res.json();
      setWorkshops(data);
    } catch (err) {
      console.error('Failed to load workshops:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenBooking = (ws) => {
    setSelectedWorkshop(ws);
    setConfirmedPass(null);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email) return;

    setBookingSubmitting(true);
    try {
      const res = await fetch(`/api/workshops/${selectedWorkshop.id}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patron_name: bookingForm.name,
          patron_email: bookingForm.email,
          kit_address: bookingForm.address
        })
      });
      const data = await res.json();
      if (res.ok) {
        setConfirmedPass(data.booking);
        // update local list seats
        setWorkshops((prev) =>
          prev.map((w) => (w.id === selectedWorkshop.id ? data.workshop : w))
        );
      } else {
        alert(data.error || 'Booking error.');
      }
    } catch (err) {
      console.error('Error submitting booking:', err);
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 0 60px 0' }}>
      {/* Studio Header Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at 20% 0%, rgba(245, 158, 11, 0.15) 0%, rgba(8, 11, 17, 0.95) 70%), linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        borderRadius: '20px',
        padding: '36px 32px',
        marginBottom: '36px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{
            background: 'rgba(245, 158, 11, 0.2)',
            color: '#fbbf24',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
            LIVE ARTISAN VIRTUAL STUDIO
          </span>
          <span style={{
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#34d399',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            100% Kit Materials Shipped Globally
          </span>
        </div>

        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '10px',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.02em'
        }}>
          Artisan Heritage Masterclasses
        </h1>
        <p style={{
          color: '#cbd5e1',
          maxWidth: '780px',
          fontSize: '1rem',
          lineHeight: 1.6
        }}>
          Learn directly from India’s revered women craft masters in live, interactive virtual studio sessions. Every ticket includes a curated authentic materials kit prepared by rural artisan collectives and dispatched to your door.
        </p>

        {/* Quick Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
              <Video size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>HD Two-Way Studio</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Real-time guidance & critiques</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
              <Package size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Artisan Kit Included</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Pure silk, clay & silver tools</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f472b6' }}>
              <Award size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Direct Artisan Honorarium</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>86% pays women instructors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
          <Sparkles size={32} style={{ animation: 'spin 2s linear infinite', color: '#f59e0b', marginBottom: '12px' }} />
          <div>Curating Masterclass Sheds...</div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {workshops.map((ws) => (
            <div
              key={ws.id}
              style={{
                background: 'rgba(14, 20, 32, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(245, 158, 11, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.35)';
              }}
            >
              {/* Media Preview Box */}
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={ws.image_url}
                  alt={ws.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(14, 20, 32, 0.95) 0%, rgba(14, 20, 32, 0.2) 60%, transparent 100%)'
                }} />

                {/* Craft Type Badge */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(8, 11, 17, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fbbf24',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backdropFilter: 'blur(8px)'
                }}>
                  {ws.craft_type}
                </span>

                {/* Difficulty */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(16, 185, 129, 0.85)',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  {ws.difficulty}
                </span>

                {/* Seats indicator */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  color: ws.seats_available <= 5 ? '#f87171' : '#34d399',
                  fontWeight: 700,
                  background: 'rgba(10, 15, 26, 0.85)',
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  <Users size={13} />
                  <span>{ws.seats_available} of {ws.seats_total} seats left</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontSize: '1.12rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '8px',
                  lineHeight: 1.4
                }}>
                  {ws.title}
                </h3>

                <div style={{
                  fontSize: '0.8rem',
                  color: '#94a3b8',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ color: '#fbbf24', fontWeight: 600 }}>Master: {ws.artisan_name}</span>
                  <span>•</span>
                  <span>{ws.village}</span>
                </div>

                <p style={{
                  fontSize: '0.84rem',
                  color: '#cbd5e1',
                  lineHeight: 1.5,
                  marginBottom: '16px',
                  flex: 1
                }}>
                  {ws.description}
                </p>

                {/* Kit Box Callout */}
                <div style={{
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Package size={12} />
                    Artisan Materials Kit Included
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                    {ws.kit_included}
                  </div>
                </div>

                {/* Time & Duration */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: '16px',
                  fontSize: '0.78rem',
                  color: '#94a3b8'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={13} style={{ color: '#f59e0b' }} />
                    <span>{ws.date_time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={13} style={{ color: '#38bdf8' }} />
                    <span>{ws.duration}</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Tuition & Materials</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                      {formatPrice(ws.price)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(ws)}
                    disabled={ws.seats_available <= 0}
                    style={{
                      background: ws.seats_available <= 0 ? '#334155' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: ws.seats_available <= 0 ? 'none' : '0 4px 14px rgba(245, 158, 11, 0.35)',
                      cursor: ws.seats_available <= 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <Ticket size={16} />
                    {ws.seats_available <= 0 ? 'Sold Out' : 'Reserve Pass'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedWorkshop && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3, 7, 18, 0.85)',
          backdropFilter: 'blur(16px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#0e1422',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '20px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedWorkshop(null)}
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

            {confirmedPass ? (
              /* Success Pass Ticket View */
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10b981',
                  color: '#34d399',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <ShieldCheck size={36} />
                </div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                  Masterclass Seat Confirmed!
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '24px' }}>
                  Your digital studio pass and workshop link have been issued.
                </p>

                {/* Digital Ticket Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #162032 0%, #0d1424 100%)',
                  border: '2px dashed rgba(245, 158, 11, 0.4)',
                  borderRadius: '14px',
                  padding: '20px',
                  textAlign: 'left',
                  marginBottom: '24px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 800, letterSpacing: '0.05em' }}>
                      DIGITAL STUDIO ACCESS PASS
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700 }}>
                      {confirmedPass.booking_code}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '8px' }}>
                    {confirmedPass.workshop_title}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '12px' }}>
                    Instructor: <strong style={{ color: '#fbbf24' }}>{confirmedPass.artisan_name}</strong>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>Patron:</span>
                      <span style={{ color: '#f8fafc', fontWeight: 600 }}>{confirmedPass.patron_name}</span>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>Schedule:</span>
                      <span style={{ color: '#f8fafc', fontWeight: 600 }}>{confirmedPass.date_time}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedWorkshop(null)}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#ffffff',
                    fontWeight: 700,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    width: '100%',
                    fontSize: '0.9rem'
                  }}
                >
                  Close & View Schedule
                </button>
              </div>
            ) : (
              /* Booking Form */
              <div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#fbbf24',
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '10px'
                }}>
                  RESERVE YOUR PASS
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                  {selectedWorkshop.title}
                </h2>
                <div style={{ fontSize: '0.84rem', color: '#94a3b8', marginBottom: '20px' }}>
                  Guided by <strong style={{ color: '#f8fafc' }}>{selectedWorkshop.artisan_name}</strong> · {selectedWorkshop.duration}
                </div>

                <form onSubmit={handleSubmitBooking} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      Email Address (For Zoom/Studio Link)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="patron@domain.org"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      Shipping Address (For Artisan Materials Kit)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Street, City, Postal Code, Country"
                      value={bookingForm.address}
                      onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                      style={{ width: '100%', resize: 'none' }}
                    />
                  </div>

                  {/* Summary & Price */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '4px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total Amount:</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                        {formatPrice(selectedWorkshop.price)}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#60a5fa', textAlign: 'right' }}>
                      ✓ 86% Direct Artisan Remuneration<br />
                      ✓ Free Express Kit Courier
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingSubmitting}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: '#ffffff',
                      fontWeight: 700,
                      padding: '13px',
                      borderRadius: '8px',
                      fontSize: '0.92rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginTop: '6px',
                      boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)'
                    }}
                  >
                    {bookingSubmitting ? 'Confirming Reservation...' : 'Complete Reservation & Issue Pass'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
