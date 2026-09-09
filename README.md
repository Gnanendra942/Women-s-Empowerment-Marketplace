# 🌸 Women's Empowerment Marketplace

> **Full-Stack Flagship Digital Commerce & Artisan Empowerment Engine**  
> Empowering women master artisans and rural cottage entrepreneurs through decentralized provenance tracking, fair-trade transparency guarantees, interactive live masterclasses, direct artisan messaging, multi-currency checkout, and a distributed fulfillment pipeline.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Active%20Cloudflare%20Edge-10b981?style=for-the-badge&logo=cloudflare)](https://ctrl-hints-margin-direct.trycloudflare.com)
[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61dafb?logo=react)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Backend-Express.js-000000?logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%203-003B57?logo=sqlite)](https://www.sqlite.org/)
[![JWT Auth](https://img.shields.io/badge/Security-JWT%20%2B%20BCrypt-ff69b4)](https://jwt.io/)
[![Fair Trade](https://img.shields.io/badge/Fair--Trade-86%25%20Direct%20Disbursement-10b981)](#-fair-trade-transparency-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌐 Live Website & Demo Links

The platform is live and accessible over encrypted global HTTPS:

| Channel / Interface | Live URL | Description |
| :--- | :--- | :--- |
| 🛍️ **Interactive Full-Stack Web App** | [**https://ctrl-hints-margin-direct.trycloudflare.com**](https://ctrl-hints-margin-direct.trycloudflare.com) | React 19 Storefront + Express API + Image CDN |
| 🚀 **GitHub Pages Deployment** | [**https://gnanendra942.github.io/Women-s-Empowerment-Marketplace/**](https://gnanendra942.github.io/Women-s-Empowerment-Marketplace/) | Static cloud hosting on `gh-pages` branch |
| 📄 **Standalone Portable Marketplace** | [**https://ctrl-hints-margin-direct.trycloudflare.com/marketplace.html**](https://ctrl-hints-margin-direct.trycloudflare.com/marketplace.html) | Zero-dependency single-file HTML5 app |
| 🩺 **Backend Health API** | [**https://ctrl-hints-margin-direct.trycloudflare.com/api/health**](https://ctrl-hints-margin-direct.trycloudflare.com/api/health) | Live system health & engine status check |
| 📦 **Products REST API** | [**https://ctrl-hints-margin-direct.trycloudflare.com/api/products**](https://ctrl-hints-margin-direct.trycloudflare.com/api/products) | Handcrafted catalog data & artisan lineage |

> ⚡ **Launch / Regenerate Live Link**: Run `npm run tunnel` to establish a new encrypted, globally accessible Cloudflare Edge tunnel anytime.

---

## 🌟 Executive Summary

The **Women's Empowerment Marketplace** is an end-to-end commerce platform designed to remove exploitative intermediaries from traditional handicraft supply chains. By connecting rural women-led artisan guilds directly with global patrons, the platform guarantees that **86% of every purchase price is directly disbursed** to female heads of households.

The platform provides a consumer experience paired with enterprise seller tooling:
- **For Patrons**: Heritage storytelling, authentic provenance validation, virtual masterclasses, direct craft inquiries, multi-currency support, and live consignment tracking.
- **For Women Artisans**: Unified seller analytics suite, one-click catalog publishing, live pipeline state transitions, and fair-wage ledger transparency.

---

## 🏛️ System Architecture

```
                               ┌────────────────────────────────────────┐
                               │       Client Layer (React 19 + Vite)   │
                               │  - Luxury Obsidian & Neon Design System│
                               │  - Global Multi-Currency Context Engine│
                               │  - Heirlooms Wishlist & Provenance UI  │
                               └───────────────────┬────────────────────┘
                                                   │
                                                   │ HTTP / REST & Static Assets
                                                   │ (Reverse Proxy: /api, /images)
                                                   ▼
                               ┌────────────────────────────────────────┐
                               │       Server Layer (Node.js Express)   │
                               │  - JWT Bearer Authentication & Guards  │
                               │  - Distributed Consignment Lifecycle   │
                               │  - Direct Fair-Trade Calculator Engine │
                               └───────────────────┬────────────────────┘
                                                   │
                                                   │ SQL Queries & Connection Pool
                                                   ▼
                               ┌────────────────────────────────────────┐
                               │       Persistence Layer (SQLite)       │
                               │  - users & artisan profiles            │
                               │  - products, categories & craft types  │
                               │  - orders, order_items & pipeline logs │
                               │  - workshops & digital pass bookings   │
                               │  - patron inquiries & artisan messages │
                               │  - verified customer reviews           │
                               └────────────────────────────────────────┘
```

---

## ✨ Pro-Level Features & Enterprise Catalog

### 🛍️ 1. Expansive 1,120+ Product Catalog Across 8 Departments
- **Over 1,000 authentic handcrafted heirlooms** directly connected to female cottage entrepreneurs:
  1. **🥻 Handlooms & Sarees (250 items)**: Pure Mulberry Banarasi Brocade, Kanjeevaram Zari Silks, Chanderi Tissue Weaves, Wild Tussar Silks, Bandhani & Patola, Solar Desi Khadi, Kalamkari Vegetable Dyes, and Kashmiri Pashmina Shawls.
  2. **💎 Jewelry & Adornment (200 items)**: Cuttack Tarakasi 925 Sterling Silver Micro-Filigree, Temple Jewelry Chokers, Jaipur Kundan-Meenakari Enamels, Bastar Lost-Wax Dokra Brass, Fired Earthen Terracotta Beads, Lac Bangles, and Silver Payals.
  3. **🏺 Home & Living Decor (200 items)**: Bankura Alluvial River Silt Terracotta Urns, Jaipur Quartz Stone Blue Pottery, Khurja Mineral Glaze Stoneware Planters, Bidriware Silver Inlay Metalcraft, Kashmiri Root Walnut Wood Carvings, and Channapatna Lacquer Wooden Toys.
  4. **🌿 Ayurvedic & Forest Organics (150 items)**: Nilgiri Wild Cliff Multi-Floral Raw Honey, 7.8% High-Curcumin Lakadong Turmeric, Pure Kashmiri Mogra Saffron (Kesar), Charaka Kumkumadi Facial Serums, and Cold-Pressed Wood-Chekku Carrier Oils.
  5. **🎨 Traditional Fine Art (80 items)**: Madhubani Bamboo Nib & Natural Pigment Folk Canvases, Odisha Palm Leaf Pattachitra Scrolls, Warli Rice Paste Mud Murals, Gond Dotted Forest Canvases, and Nathdwara Pichwai 24K Gold Foil Temple Paintings.
  6. **🍲 Pottery & Kitchenware (100 items)**: Longpi Serpentine Stone Black Cookware, Unglazed Curd & Handi Pots, Natural Evaporative Clay Water Dispensers, Kansa 78:22 Bell-Metal Dinner Thalis, and Anti-Bacterial Carved Neem Woodware.
  7. **👜 Bags, Footwear & Accessories (80 items)**: Shantiniketan Embossed Vegetable Tanned Leather Totes, Lambada Nomadic Banjara Mirror Clutches, Golden Fiber Braided Jute Bags, and Zero-Chemical Handmade Mojaris & Kolhapuris.
  8. **🪔 Festive & Spiritual Crafts (60 items)**: Nachiyar Koil Sand-Casting Brass Akhand Diyas, Desi Cow Panchagavya Sambrani Cups, Aranmula Carved Teakwood Pooja Chowkis, and Charcoal-Free Temple Flower Agarbatti.

### 🧭 2. Interactive Pro Mega Menu & Department Navigation
- **All Departments Mega Menu Trigger (`[ ☰ All Departments (1,000+ Items) ▾ ]`)**: Full-width interactive dropdown organizing the 8 departments and 36 subcategories with live product counts and instant one-click catalog filters.
- **Direct Navigation Tabs**: High-contrast category links with dynamic counts (`All (1,120)`, `Handlooms (250)`, `Jewelry (200)`, `Home Decor (200)`, etc.).

### 🔍 3. Live Autocomplete Search & Pro Faceted Filters
- **Real-Time Autocomplete Search**: Debounced instant suggestions with 42x42px image thumbnails, titles, prices, and department badges.
- **Faceted Filter Sidebar**:
  - **Price Range Slider**: Smooth slider (₹99 to ₹6,999) + quick price brackets (`< ₹500`, `₹500–₹1,500`, `₹1,500–₹3,000`, `₹3,000+`).
  - **Artisan State Cluster**: Filter by 12 states (Uttar Pradesh, West Bengal, Odisha, Rajasthan, Tamil Nadu, Kashmir, Gujarat, etc.).
  - **Discount & Rating Filters**: Direct deals (50%+, 40%+, 30%+) and verified customer ratings (4.8★+, 4.6★+).
  - **Dispatch Speed**: Quick toggle for 24-hour fast shipping.
  - **Active Filter Chips**: Clickable tags with instant removal and a "Reset All" button.

### ⚡ 4. High-Performance Paginated Catalog & Quick View
- **60 FPS Paginated Grid**: Browse in slices of 24, 48, or 96 items per page with smooth auto-scroll to top.
- **Page Jump Controls**: Numbered pagination buttons, previous/next, and a jump-to-page input.
- **👁 Quick View Modal**: Interactive card overlay to inspect multi-angle photos, GI tags, living wage disbursements, and specs without leaving the catalog page.

### 🎟️ 5. Cart Drawer with Promo Coupon Engine & Simulated Checkout
- **Coupon Engine**:
  - `EMPOWER15`: 15% discount across the total cart.
  - `CRAFTLOVE`: Flat ₹200 off on orders above ₹500.
  - `FREESHIP`: 100% Free Express Delivery.
- **Fair-Wage Ledger Summary**: Real-time display showing 86% of the cart value disbursed directly to female heads of household.
- **Pro Checkout Modal**: Patron details, payment method selection (UPI Instant, Cards, NetBanking, COD), order summary, and instant Order Confirmation Receipt with reference ID and live tracking code.

### 📜 6. Digital Certificate of Authenticity & Provenance Verifier
- **Immutable Provenance Hash**: Every piece features a SHA-256 cryptographic provenance stamp validating origin cluster and master artisan identity.
- **86% Direct Fair-Wage Certified Seal**: Audited wage disbursement breakdown directly to artisan bank accounts.
- **Printable Certificate Card**: High-resolution, gold-accented certificate layout ready for framing or digital verification.

### 🎓 7. Virtual Artisan Masterclass Studio & Pipeline Tracking
- **Live Two-Way Studio**: Interactive masterclasses with materials kits delivered to patrons.
- **Direct Artisan Chat**: Real-time atelier inquiry simulator with cultural artisan greetings.
- **Consignment Lifecycle**: Real-time order tracking (`Pending` ➔ `Crafting` ➔ `Quality Check` ➔ `Dispatched` ➔ `Delivered`).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Vanilla CSS Design System (Dark Obsidian & Neon Accents), Lucide Icons |
| **State & Context** | React Context (`CurrencyContext`), LocalStorage State Sync |
| **Backend** | Node.js, Express.js RESTful API, CORS, Dotenv |
| **Database** | SQLite3 (`marketplace.db`), Automatic Schema Migration & Seeding |
| **Security** | JSON Web Tokens (JWT), BCrypt password hashing, Role-based Route Guards |
| **Typography** | Google Fonts (`Outfit`, `Plus Jakarta Sans`, `JetBrains Mono`) |

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### 1. Clone & Setup
```bash
git clone https://github.com/Gnanendra942/Women-s-Empowerment-Marketplace.git
cd Women-s-Empowerment-Marketplace
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### 3. Launch Application
Run both backend and frontend development servers concurrently:
```bash
npm run dev
```

The services will start at:
- **Frontend Storefront**: [http://localhost:5173](http://localhost:5173)
- **Backend REST API**: [http://localhost:5001](http://localhost:5001)
- **API Health Check**: [http://localhost:5001/api/health](http://localhost:5001/api/health)

### 4. Generate Live Public URL (Cloudflare Edge Tunnel)
To expose the website securely over public HTTPS to test on mobile devices or share with collaborators:
```bash
npm run tunnel
```
Or start the unified full-stack production server:
```bash
npm start
```

---

## 🔑 Demo Credentials & Roles

| Role | Demo Email | Password | Pre-configured Profile |
| :--- | :--- | :--- | :--- |
| **Artisan Seller** | `ananya@artisan.org` | `artisan123` | **Ananya Devi** (Dhaga Kala Collective, Varanasi) |
| **Patron / Buyer** | `buyer@market.org` | `buyer123` | **Priya Sharma** (Artisan Patron, Bengaluru) |

> 💡 *Quick Access: You can also use the **"⚡ Demo Artisan"** or **"⚡ Demo Buyer"** one-click buttons located in the navigation bar and authentication modal.*

---

## 📦 API Endpoints Reference

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create customer or artisan account
- `POST /api/auth/login` - Authenticate credentials and return JWT token
- `POST /api/auth/demo-login` - Instant role switcher (customer / artisan)
- `GET /api/auth/me` - Validate session token and return user profile

### Products (`/api/products`)
- `GET /api/products` - Filtered & sorted product catalog (`?category=...&sort=...&search=...`)
- `GET /api/products/:id` - Full product details, reviews, and artisan collective lineage
- `POST /api/products` - Publish new artisan craft (Protected: Artisan role)
- `POST /api/products/:id/reviews` - Submit verified patron appreciation review

### Masterclasses & Workshops (`/api/workshops`)
- `GET /api/workshops` - List upcoming live artisan virtual masterclasses
- `POST /api/workshops/:id/book` - Reserve workshop seat and issue digital access pass

### Direct Messaging (`/api/messages`)
- `GET /api/messages/:artisanId` - Fetch communication thread for an artisan
- `POST /api/messages` - Post custom craft inquiry with automated workshop acknowledgement

### Orders & Fulfillment Pipeline (`/api/orders`)
- `POST /api/orders` - Process checkout cart and enter order into pipeline
- `GET /api/orders/pipeline` - Full consignment pipeline for seller suite
- `GET /api/orders/track/:query` - Live tracking lookup by order # or tracking code
- `PATCH /api/orders/:id/status` - Advance order stage (Protected: Artisan role)

### Analytics (`/api/analytics`)
- `GET /api/analytics/overview` - Seller metrics, revenue breakdown, and fair-trade impact

---

## 🗄️ Database Schema

The SQLite database (`server/marketplace.db`) initializes automatically with pre-configured relational tables:

```sql
-- Core Users & Artisan Collectives
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'customer',
  location TEXT,
  bio TEXT,
  avatar TEXT,
  artisan_collective TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Handcrafted Catalog
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  story TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL,
  craft_type TEXT NOT NULL,
  artisan_id INTEGER,
  artisan_name TEXT NOT NULL,
  artisan_village TEXT NOT NULL,
  stock INTEGER DEFAULT 10,
  rating REAL DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 1,
  image_url TEXT NOT NULL,
  impact_tag TEXT NOT NULL,
  lead_time_days INTEGER DEFAULT 3,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (artisan_id) REFERENCES users(id)
);

-- Masterclasses & Virtual Studio
CREATE TABLE workshops (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  artisan_name TEXT NOT NULL,
  village TEXT NOT NULL,
  craft_type TEXT NOT NULL,
  duration TEXT NOT NULL,
  date_time TEXT NOT NULL,
  price REAL NOT NULL,
  seats_total INTEGER DEFAULT 25,
  seats_available INTEGER DEFAULT 25,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  kit_included TEXT NOT NULL,
  difficulty TEXT DEFAULT 'All Skill Levels',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Orders & Distributed Pipeline
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT UNIQUE NOT NULL,
  user_id INTEGER,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  total_amount REAL NOT NULL,
  status TEXT DEFAULT 'Pending',
  payment_method TEXT DEFAULT 'Card (Simulated)',
  tracking_code TEXT NOT NULL,
  artisan_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 📂 Project Structure

```
Women-s-Empowerment-Marketplace/
├── client/                      # React 19 Frontend Application
│   ├── public/                  # Public client assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ArtisanChatModal.jsx       # Direct craft inquiry & messaging modal
│   │   │   ├── AuthModal.jsx              # JWT login & registration modal
│   │   │   ├── CartDrawer.jsx             # Checkout slide-out drawer
│   │   │   ├── FairTradeCalculatorModal.jsx # 86% direct wage transparency engine
│   │   │   ├── FlagshipBanner.jsx         # Hero showcase banner
│   │   │   ├── Footer.jsx                 # Platform footer & impact stats
│   │   │   ├── MasterclassStudio.jsx      # Live virtual workshops studio
│   │   │   ├── Navbar.jsx                 # Navigation, currency & wishlist controls
│   │   │   ├── OrderTracker.jsx           # Consignment pipeline tracker
│   │   │   ├── ProductCard.jsx            # Craft card with provenance & wishlists
│   │   │   ├── ProductCatalog.jsx         # Catalog filtering & search grid
│   │   │   ├── ProductDetailModal.jsx     # Heritage story modal
│   │   │   ├── ProvenanceModal.jsx        # Digital Certificate of Authenticity
│   │   │   ├── SellerDashboard.jsx        # Seller KPI analytics suite & publisher
│   │   │   └── SellerStorefronts.jsx      # Guild cluster profiles
│   │   ├── context/
│   │   │   └── CurrencyContext.jsx        # Real-time multi-currency converter
│   │   ├── App.jsx                        # Root React component
│   │   ├── index.css                      # Vanilla CSS Luxury Obsidian Design System
│   │   └── main.jsx                       # Client entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Node.js Express REST API
│   ├── middleware/
│   │   └── auth.js                        # JWT verification & artisan role guards
│   ├── public/images/                     # Authentic craft studio photography
│   ├── routes/
│   │   ├── analytics.js                   # Seller suite metrics
│   │   ├── auth.js                        # Encrypted JWT auth & demo logins
│   │   ├── messages.js                    # Direct patron-to-artisan chat
│   │   ├── orders.js                      # Pipeline checkout & status tracker
│   │   ├── products.js                    # Handcrafted catalog CRUD & reviews
│   │   └── workshops.js                   # Masterclass catalog & pass booking
│   ├── db.js                              # SQLite schema initialization & seeding
│   ├── server.js                          # Express app entry point
│   └── package.json
│
├── .gitignore                   # Production git exclusion rules
├── package.json                 # Unified concurrency scripts
└── README.md                    # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! If you would like to help expand the digital capabilities for rural women artisans:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewArtisanFeature`)
3. Commit your changes (`git commit -m 'Add new artisan capability'`)
4. Push to the branch (`git push origin feature/NewArtisanFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
