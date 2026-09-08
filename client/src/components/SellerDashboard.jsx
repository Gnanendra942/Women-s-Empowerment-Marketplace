import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Truck, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function SellerDashboard({ user, onAddProduct, onDeleteProduct, onUpdateStock }) {
  const [analytics, setAnalytics] = useState(null);
  const [pipelineOrders, setPipelineOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Textiles & Apparel');
  const [newCraftType, setNewCraftType] = useState('Handloom');
  const [newStock, setNewStock] = useState('10');
  const [newImpactTag, setNewImpactTag] = useState('Direct Women Cooperative Support');
  const [newImage, setNewImage] = useState('/images/pashmina.jpg');
  const [submittingProduct, setSubmittingProduct] = useState(false);

  const fetchSellerData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, ordersRes] = await Promise.all([
        fetch('/api/analytics/overview'),
        fetch('/api/orders/pipeline')
      ]);
      const analyticsData = await analyticsRes.json();
      const ordersData = await ordersRes.json();
      setAnalytics(analyticsData);
      setPipelineOrders(ordersData);
    } catch (err) {
      console.error('Error loading seller suite:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchSellerData();
      }
    } catch (err) {
      console.error('Status advance error:', err);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setSubmittingProduct(true);
    try {
      const token = localStorage.getItem('wem_token');
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          story: newStory,
          price: parseFloat(newPrice),
          category: newCategory,
          craft_type: newCraftType,
          stock: parseInt(newStock, 10),
          impact_tag: newImpactTag,
          image_url: newImage
        })
      });

      if (res.ok) {
        setShowAddModal(false);
        setNewTitle('');
        setNewDescription('');
        setNewStory('');
        setNewPrice('');
        fetchSellerData();
        if (onAddProduct) onAddProduct();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to list artisan craft.');
      }
    } catch (err) {
      alert('Network error adding craft.');
    } finally {
      setSubmittingProduct(false);
    }
  };

  if (loading && !analytics) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
        <div className="pulse-dot" style={{ width: '12px', height: '12px', marginBottom: '12px' }}></div>
        <p>Loading Artisan Collective Analytics Engine...</p>
      </div>
    );
  }

  const m = analytics?.metrics || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '12px' }}>
      {/* Top Banner with Action */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(14, 20, 32, 0.9) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-live">SELLER ANALYTICS ENGINE</span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Real-Time Node Telemetry</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Artisan Empowerment Control Center
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', margin: '6px 0 0 0' }}>
            Logged in as <strong>{user?.name || 'Ananya Devi'}</strong> ({user?.artisan_collective || 'Dhaga Kala Women Collective'})
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={fetchSellerData}
            className="btn btn-secondary"
            title="Refresh Metrics"
            style={{ padding: '10px' }}
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-accent"
            style={{ padding: '10px 18px' }}
          >
            <Plus size={17} />
            <span>List New Handcraft</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px'
      }}>
        {/* Metric 1 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>GROSS MERCHANDISE VALUE</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
            ${parseFloat(m.total_revenue || 0).toFixed(2)}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#34d399', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} />
            <span>+18.4% month-over-month</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>DIRECT ARTISAN PAYOUT</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-heading)' }}>
            ${(parseFloat(m.total_revenue || 0) * 0.86).toFixed(2)}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '6px' }}>
            86% verified direct cooperative share
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>PIPELINE ORDERS</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
              <Package size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
            {m.total_orders || 0}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '6px' }}>
            Avg Order: ${m.average_order_value || '0.00'}
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>RURAL WEAVING HOURS</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-heading)' }}>
            {m.artisan_labor_hours || 192} hrs
          </div>
          <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '6px' }}>
            Empowering 24 village households
          </div>
        </div>
      </div>

      {/* Distributed Order Pipeline Management Table */}
      <div className="glass-panel" style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Distributed Order Fulfillment Pipeline
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: '4px 0 0 0' }}>
              Transition orders through live cryptographic stages from loom crafting to customer doorstep.
            </p>
          </div>
          <span className="badge badge-tech">AUTOMATED TELEMETRY</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>Order Identifier</th>
                <th style={{ padding: '12px 14px' }}>Patron / Address</th>
                <th style={{ padding: '12px 14px' }}>Items</th>
                <th style={{ padding: '12px 14px' }}>Amount</th>
                <th style={{ padding: '12px 14px' }}>Current Stage</th>
                <th style={{ padding: '12px 14px' }}>Pipeline Action</th>
              </tr>
            </thead>
            <tbody>
              {pipelineOrders.map((ord) => {
                const statuses = ['Pending', 'Artisan Crafting', 'Quality Check', 'Dispatched', 'Delivered'];
                const nextStatusIndex = statuses.indexOf(ord.status) + 1;
                const nextStatus = nextStatusIndex < statuses.length ? statuses[nextStatusIndex] : null;

                return (
                  <tr key={ord.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '14px', fontFamily: 'var(--font-mono)' }}>
                      <div style={{ color: '#ffffff', fontWeight: 700 }}>{ord.order_number}</div>
                      <div style={{ color: '#38bdf8', fontSize: '0.75rem' }}>{ord.tracking_code}</div>
                    </td>

                    <td style={{ padding: '14px' }}>
                      <div style={{ color: '#f8fafc', fontWeight: 600 }}>{ord.customer_name}</div>
                      <div style={{ color: '#64748b', fontSize: '0.76rem' }}>{ord.city}</div>
                    </td>

                    <td style={{ padding: '14px' }}>
                      {ord.items?.map((it, idx) => (
                        <div key={idx} style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                          {it.quantity}x {it.product_title}
                        </div>
                      ))}
                    </td>

                    <td style={{ padding: '14px', fontWeight: 700, color: '#ffffff' }}>
                      ${ord.total_amount.toFixed(2)}
                    </td>

                    <td style={{ padding: '14px' }}>
                      <span className={
                        ord.status === 'Delivered' ? 'badge badge-live' :
                        ord.status === 'Dispatched' ? 'badge badge-tech' :
                        'badge badge-amber'
                      } style={{ fontSize: '0.72rem' }}>
                        {ord.status}
                      </span>
                    </td>

                    <td style={{ padding: '14px' }}>
                      {nextStatus ? (
                        <button
                          onClick={() => handleStatusChange(ord.id, nextStatus)}
                          className="btn btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                        >
                          <span>Advance to: {nextStatus}</span>
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} /> Completed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Handcrafted Item Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Publish Artisan Craft to Global Marketplace
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px' }}>
              Empowering village cottage industries with direct-to-consumer digital commerce.
            </p>

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Hand-Dyed Indigo Silk Stole"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="85.00"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Available Stock</label>
                  <input
                    type="number"
                    placeholder="12"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="Textiles & Apparel">Textiles & Apparel</option>
                    <option value="Home & Decor">Home & Decor</option>
                    <option value="Jewelry & Adornment">Jewelry & Adornment</option>
                    <option value="Organic Wellness">Organic Wellness</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Product Image</label>
                  <select
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="/images/pashmina.jpg">Pashmina & Handloom Weave</option>
                    <option value="/images/pottery.jpg">Terracotta Clay Ceramic</option>
                    <option value="/images/jewelry.jpg">Silver Filigree Gemstone</option>
                    <option value="/images/wellness.jpg">Ayurvedic Herbal Elixir</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Ethical Impact Badge</label>
                <input
                  type="text"
                  placeholder="e.g. 100% Eco-Friendly Vegetable Dyes · Supports 6 Weavers"
                  value={newImpactTag}
                  onChange={(e) => setNewImpactTag(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe material, handcrafting process, and dimensions..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Artisan Provenance & Heritage Story</label>
                <textarea
                  rows={2}
                  placeholder="Tell patrons about the woman artisan, her lineage, and community impact..."
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingProduct}
                  className="btn btn-primary"
                >
                  {submittingProduct ? 'Publishing...' : 'Publish Craft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
