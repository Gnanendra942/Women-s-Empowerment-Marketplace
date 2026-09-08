import React, { useState } from 'react';
import { X, Star, MapPin, Sparkles, Heart, ShieldCheck, Clock, Send, User, Award, MessageSquare } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onAddReview,
  onOpenProvenance,
  onOpenChat
}) {
  const { formatPrice } = useCurrency();
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;
    setSubmittingReview(true);
    await onAddReview(product.id, {
      author: reviewAuthor,
      rating: reviewRating,
      comment: reviewComment
    });
    setReviewAuthor('');
    setReviewComment('');
    setSubmittingReview(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '850px',
          background: '#0a0e18',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '20px',
          overflow: 'hidden'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.6)',
            color: '#cbd5e1',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Body */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top Hero Layout: Image + Core Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            padding: '28px'
          }}>
            {/* Image */}
            <div style={{ borderRadius: '14px', overflow: 'hidden', height: '340px', background: '#05070c' }}>
              <img
                src={product.image_url}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-tech">{product.category}</span>
                <span className="badge badge-live">Fair Trade Certified</span>
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px', lineHeight: 1.3 }}>
                {product.title}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={16} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                  <span style={{ fontWeight: 700, color: '#f8fafc' }}>{product.rating}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>({product.reviews_count} reviews)</span>
                </div>
                <span style={{ color: '#64748b' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8', fontSize: '0.82rem' }}>
                  <Clock size={14} />
                  <span>Lead Time: ~{product.lead_time_days || 3} days</span>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '18px' }}>
                {product.description}
              </p>

              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase' }}>
                  Ethical & Social Impact
                </div>
                <div style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 500, marginTop: '2px' }}>
                  {product.impact_tag}
                </div>
              </div>

              {/* Price & Add to Cart Controls */}
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                background: '#111726',
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Direct Artisan Price</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                    {formatPrice(product.price)}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => onOpenProvenance && onOpenProvenance(product)}
                    style={{
                      background: 'rgba(245, 158, 11, 0.12)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      color: '#fbbf24',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer'
                    }}
                    title="Audit Digital Provenance"
                  >
                    <Award size={15} />
                    <span>Certificate</span>
                  </button>

                  <button
                    onClick={() => onOpenChat && onOpenChat(product)}
                    style={{
                      background: 'rgba(59, 130, 246, 0.12)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      color: '#60a5fa',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer'
                    }}
                    title="Message Artisan Collective"
                  >
                    <MessageSquare size={15} />
                    <span>Message</span>
                  </button>

                  {/* Quantity selector */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#090d16',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px'
                  }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ padding: '6px 10px', color: '#cbd5e1', fontSize: '0.9rem' }}
                    >-</button>
                    <span style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: 700 }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ padding: '6px 10px', color: '#cbd5e1', fontSize: '0.9rem' }}
                    >+</button>
                  </div>

                  <button
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) onAddToCart(product);
                      onClose();
                    }}
                    className="btn btn-primary"
                    style={{ padding: '10px 18px' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Artisan Story Spotlight Section */}
          <div style={{
            background: 'linear-gradient(180deg, #0e1422 0%, #090d16 100%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '24px 28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
              <img
                src={product.artisan?.avatar || '/images/ananya_artisan.jpg'}
                alt={product.artisan_name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #f59e0b',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)'
                }}
              />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    Meet the Artisan: {product.artisan_name}
                  </h4>
                  <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>Master Guild</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#38bdf8', marginBottom: '8px' }}>
                  <MapPin size={14} />
                  <span>{product.artisan_village}</span>
                  <span>•</span>
                  <span>{product.artisan?.artisan_collective || 'Rural Women Self-Help Cooperative'}</span>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{product.story}"
                </p>
              </div>
            </div>
          </div>

          {/* Verified Patron Reviews Section */}
          <div style={{ padding: '24px 28px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Patron Reviews & Community Feedback ({product.reviews?.length || 0})
            </h4>

            {/* Review List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', maxHeight: '200px', overflowY: 'auto' }}>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((r, i) => (
                  <div key={i} style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '12px 16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 600, color: '#f1f5f9' }}>
                        <User size={14} style={{ color: '#60a5fa' }} />
                        <span>{r.author}</span>
                        {r.verified_buyer && (
                          <span style={{ fontSize: '0.68rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                            Verified Patron
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        {[...Array(r.rating)].map((_, idx) => (
                          <Star key={idx} size={12} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: 0 }}>
                      "{r.comment}"
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>No reviews yet. Be the first patron to support this artisan!</p>
              )}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleSubmitReview} style={{
              background: '#0c121e',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc' }}>
                Leave a Verified Note for {product.artisan_name}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Your Name (e.g. Maya R.)"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  required
                  style={{ flex: '1 1 200px', fontSize: '0.84rem' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Rating:</span>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    style={{ fontSize: '0.84rem', padding: '8px 12px' }}
                  >
                    <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                    <option value={3}>3 Stars ⭐⭐⭐</option>
                  </select>
                </div>
              </div>

              <textarea
                placeholder="Share your appreciation of the craft and weave..."
                rows={2}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                required
                style={{ width: '100%', fontSize: '0.84rem' }}
              />

              <button
                type="submit"
                disabled={submittingReview}
                className="btn btn-secondary"
                style={{ alignSelf: 'flex-end', fontSize: '0.82rem', padding: '7px 16px' }}
              >
                <Send size={13} />
                <span>{submittingReview ? 'Submitting...' : 'Post Appreciation'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
