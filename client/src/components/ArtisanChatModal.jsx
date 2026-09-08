import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCheck, Sparkles, MapPin, User, ShieldCheck } from 'lucide-react';

export default function ArtisanChatModal({ artisan, product, onClose, user }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('Custom Craft Inquiry');
  const [senderName, setSenderName] = useState(user?.name || '');
  const [senderEmail, setSenderEmail] = useState(user?.email || '');
  const [sending, setSending] = useState(false);

  const artisanId = artisan?.id || product?.artisan_id || 1;
  const artisanName = artisan?.name || product?.artisan_name || 'Ananya Devi';
  const artisanVillage = artisan?.location || product?.artisan_village || 'Varanasi Weavers Cluster';

  useEffect(() => {
    fetchMessages();
  }, [artisanId]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages/${artisanId}`);
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.error('Error fetching messages:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artisan_id: artisanId,
          artisan_name: artisanName,
          sender_name: senderName || 'Artisan Patron',
          sender_email: senderEmail || 'patron@market.org',
          inquiry_type: inquiryType,
          message: newMessage
        })
      });

      if (res.ok) {
        const created = await res.json();
        setMessages((prev) => [created.data, ...prev]);
        setNewMessage('');
      }
    } catch (e) {
      console.error('Failed to post message:', e);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(2, 6, 17, 0.82)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#0d1320',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '640px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.2rem',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}>
              🌸
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                  {artisanName}
                </h3>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#34d399',
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  In Workshop
                </span>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={12} style={{ color: '#f59e0b' }} />
                {artisanVillage}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
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
        </div>

        {/* Message Thread List */}
        <div style={{
          flex: 1,
          padding: '20px 24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(30, 58, 138, 0.08) 0%, transparent 60%)'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <Sparkles size={24} style={{ animation: 'spin 2s linear infinite', color: '#38bdf8', marginBottom: '8px' }} />
              <div>Connecting with workshop...</div>
            </div>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: '#64748b' }}>
              <MessageSquare size={36} style={{ color: '#334155', margin: '0 auto 12px auto' }} />
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>Start a conversation with {artisanName}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                Ask about custom dimensions, wedding gift sets, or weave specifications.
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Patron Message */}
                <div style={{
                  alignSelf: 'flex-end',
                  maxWidth: '85%',
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  borderRadius: '16px 16px 4px 16px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#bfdbfe', background: 'rgba(255, 255, 255, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                      {m.inquiry_type}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#93c5fd' }}>{m.sender_name}</span>
                  </div>
                  <p style={{ fontSize: '0.86rem', lineHeight: 1.45 }}>{m.message}</p>
                </div>

                {/* Artisan Reply */}
                {m.reply && (
                  <div style={{
                    alignSelf: 'flex-start',
                    maxWidth: '85%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    borderRadius: '16px 16px 16px 4px',
                    padding: '12px 16px',
                    color: '#e2e8f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fbbf24' }}>
                        {m.artisan_name} (Artisan Guild)
                      </span>
                      <CheckCheck size={12} style={{ color: '#34d399' }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.45, color: '#cbd5e1' }}>
                      {m.reply}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#090d16',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Inquiry topic selectors */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['Custom Craft Inquiry', 'Bespoke Size / Palette', 'Gift Inscription', 'Artisan Appreciation'].map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => setInquiryType(tag)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: inquiryType === tag ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: inquiryType === tag ? '#60a5fa' : '#94a3b8',
                  border: inquiryType === tag ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder={`Write a message to ${artisanName}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                background: '#101624',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '0.86rem'
              }}
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              style={{
                background: !newMessage.trim() ? '#1e293b' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: '#ffffff',
                padding: '0 18px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: !newMessage.trim() ? 'not-allowed' : 'pointer',
                boxShadow: !newMessage.trim() ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.35)'
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
