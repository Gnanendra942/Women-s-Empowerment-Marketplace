import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FlagshipBanner from './components/FlagshipBanner';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import SellerDashboard from './components/SellerDashboard';
import OrderTracker from './components/OrderTracker';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import MasterclassStudio from './components/MasterclassStudio';
import ArtisanChatModal from './components/ArtisanChatModal';
import ProvenanceModal from './components/ProvenanceModal';
import FairTradeCalculatorModal from './components/FairTradeCalculatorModal';
import SellerStorefronts from './components/SellerStorefronts';
import { CurrencyProvider } from './context/CurrencyContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('store'); // 'store' | 'workshops' | 'seller' | 'pipeline'

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Wishlist / Saved Heirlooms
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wem_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('wem_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals & Active Selections
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProvenanceProduct, setSelectedProvenanceProduct] = useState(null);
  const [selectedChatArtisan, setSelectedChatArtisan] = useState(null);
  const [isFairTradeOpen, setIsFairTradeOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toast, setToast] = useState('');

  // User Auth State
  const [user, setUser] = useState(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('wem_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem('wem_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Show Toast
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // Check Current Session Token
  useEffect(() => {
    const token = localStorage.getItem('wem_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.user) setUser(data.user);
          else localStorage.removeItem('wem_token');
        })
        .catch(() => localStorage.removeItem('wem_token'));
    }
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/api/products?sort=${sortOption}`;
      if (selectedCategory && selectedCategory !== 'All' && selectedCategory !== 'All Crafts' && selectedCategory !== 'Saved Heirlooms') {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortOption, searchQuery]);

  // Wishlist Handler
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.title}" from Saved Heirlooms.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`💖 Added "${product.title}" to Saved Heirlooms!`);
        return [...prev, product.id];
      }
    });
  };

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`✨ Added "${product.title}" to bag!`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Product Selection & Details
  const handleSelectProduct = async (product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`);
      const data = await res.json();
      setSelectedProduct(data);
    } catch (e) {
      setSelectedProduct(product);
    }
  };

  // Review Submission
  const handleAddReview = async (productId, reviewData) => {
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      if (res.ok) {
        const updatedReviews = await res.json();
        setSelectedProduct((prev) => ({
          ...prev,
          reviews: updatedReviews,
          reviews_count: (prev.reviews_count || 0) + 1
        }));
        showToast('🌟 Thank you! Your appreciation was posted.');
        fetchProducts();
      }
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  // Auth Handlers
  const handleDemoLogin = async (role) => {
    try {
      const res = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('wem_token', data.token);
        setUser(data.user);
        showToast(`⚡ Switched to Demo ${role === 'artisan' ? 'Artisan Seller' : 'Patron'}!`);
        if (role === 'artisan') setActiveTab('seller');
      }
    } catch (err) {
      console.error('Demo switch error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('wem_token');
    setUser(null);
    showToast('Signed out of session.');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CurrencyProvider>
      <div className="app-container">
        {/* Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          onDemoLogin={handleDemoLogin}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          wishlistCount={wishlist.length}
          onOpenWishlist={() => {
            setSelectedCategory('Saved Heirlooms');
            setActiveTab('store');
          }}
          onOpenFairTrade={() => setIsFairTradeOpen(true)}
        />

        <main className="main-content">
          {/* Flagship Banner Hero */}
          <FlagshipBanner activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab 1: Storefront */}
          {activeTab === 'store' && (
            <ProductCatalog
              products={products}
              loading={loading}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortOption={sortOption}
              setSortOption={setSortOption}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              searchQuery={searchQuery}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onOpenProvenance={(p) => setSelectedProvenanceProduct(p)}
              onOpenChat={(p) => setSelectedChatArtisan(p)}
              onOpenFairTrade={() => setIsFairTradeOpen(true)}
            />
          )}

          {/* Tab: Multi-Vendor Artisan Storefronts */}
          {activeTab === 'guilds' && (
            <SellerStorefronts
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
            />
          )}

          {/* Tab 2: Masterclasses & Virtual Studio */}
          {activeTab === 'workshops' && (
            <MasterclassStudio />
          )}


          {/* Tab 3: Seller Analytics Suite */}
          {activeTab === 'seller' && (
            <SellerDashboard
              user={user}
              onAddProduct={fetchProducts}
            />
          )}

          {/* Tab 4: Distributed Order Pipeline */}
          {activeTab === 'pipeline' && (
            <OrderTracker />
          )}
        </main>

        {/* Footer */}
        <Footer onDemoLogin={handleDemoLogin} />

        {/* Product Detail & Story Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onAddReview={handleAddReview}
            onOpenProvenance={(p) => setSelectedProvenanceProduct(p)}
            onOpenChat={(p) => setSelectedChatArtisan(p)}
          />
        )}

        {/* Digital Certificate of Authenticity Modal */}
        {selectedProvenanceProduct && (
          <ProvenanceModal
            product={selectedProvenanceProduct}
            onClose={() => setSelectedProvenanceProduct(null)}
          />
        )}

        {/* Artisan Direct Message Drawer */}
        {selectedChatArtisan && (
          <ArtisanChatModal
            artisan={selectedChatArtisan}
            product={selectedChatArtisan}
            user={user}
            onClose={() => setSelectedChatArtisan(null)}
          />
        )}

        {/* Fair-Trade Transparency Engine Modal */}
        {isFairTradeOpen && (
          <FairTradeCalculatorModal
            onClose={() => setIsFairTradeOpen(false)}
          />
        )}

        {/* Cart & Checkout Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          onOrderSuccess={(order) => {
            showToast(`🎉 Order ${order.order_number} confirmed!`);
          }}
        />

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={(u) => {
            setUser(u);
            showToast(`Welcome back, ${u.name}!`);
          }}
          onDemoLogin={handleDemoLogin}
        />

        {/* Toast Notification */}
        {toast && (
          <div className="toast">
            <span>{toast}</span>
          </div>
        )}
      </div>
    </CurrencyProvider>
  );
}
