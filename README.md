# ⭐ Women's Empowerment Marketplace
> **Flagship Architecture · Full-Stack Digital Commerce Engine**  
> Empowering women artisans & local cottage entrepreneurs through dynamic storefronts, seller analytics suite, encrypted JWT auth, and a distributed order fulfillment pipeline.

---

## 🌟 Key Features

- **Dynamic Storefront**: Authentic handcrafted goods catalog with category filtering (`Textiles & Apparel`, `Home & Decor`, `Jewelry & Adornment`, `Organic Wellness`), price sorting, live keyword search, and artisan provenance badges.
- **Artisan Storytelling & Heritage Modal**: Interactive modal showcasing each woman artisan's biography, craft lineage, village cluster, lead time, and verified patron appreciation reviews.
- **Fair-Trade Transparency Engine**: Real-time calculation guaranteeing **86% direct fair-wage disbursement** to woman-led rural artisan clusters.
- **Interactive Bag & Checkout Drawer**: Slide-out drawer with quantity controls, voucher code validation (e.g. `ARTISAN10`, `EMPOWER`), and simulated checkout with instant order generation.
- **Seller Analytics Suite**:
  - Live KPIs: Gross Merchandise Value (GMV), Direct Artisan Payouts, Pipeline Order Volume, Rural Weaving Labor Hours.
  - Interactive Handcraft Publisher: List new artisan crafts with image preview, story provenance, and impact badges.
  - Distributed Order Pipeline Status Controller: Transition orders through stages (`Pending` ➔ `Artisan Crafting` ➔ `Quality Check` ➔ `Dispatched` ➔ `Delivered`).
- **Distributed Order Pipeline Tracker**: Track consignment lifecycles with SHA-256 hashes, status stage bars, and artisan workshop dispatch logs.
- **Encrypted JWT Authentication**: Secure customer and artisan roles with 1-click instant demo access.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Custom Vanilla CSS Design System (Dark Obsidian & Neon Accents, Glassmorphism, Micro-animations), Lucide Icons.
- **Backend**: Node.js, Express REST API, SQLite (`better-sqlite3` / `sqlite3`), BCrypt password hashing, JSON Web Tokens (JWT).
- **Assets**: High-resolution studio photography generated specifically for each artisan craft craft discipline.

---

## ⚡ Quick Start

### 1. Launch the Application
Run both backend and frontend concurrently:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5001](http://localhost:5001)
- **Health Check**: [http://localhost:5001/api/health](http://localhost:5001/api/health)

---

## 🔑 Demo Access & Roles

| Role | Demo Email | Password | Pre-configured Profile |
| :--- | :--- | :--- | :--- |
| **Artisan Seller** | `ananya@artisan.org` | `artisan123` | Ananya Devi (Dhaga Kala Collective, Varanasi) |
| **Patron / Buyer** | `buyer@market.org` | `buyer123` | Priya Sharma (Artisan Patron, Bengaluru) |

*You can also click the **"⚡ Demo Artisan"** or **"⚡ Demo Buyer"** buttons in the navigation bar or authentication modal for instant 1-click login.*

---

## 📦 API Endpoints

- `GET /api/health` - API server health status
- `GET /api/products` - Filtered & sorted artisan product catalog
- `GET /api/products/:id` - Full product details with artisan biography and reviews
- `POST /api/products` - List new artisan craft (Artisan role protected)
- `POST /api/orders` - Checkout cart and enter order into pipeline
- `GET /api/orders/pipeline` - Full consignment pipeline for seller suite
- `GET /api/orders/track/:query` - Live tracking lookup by order # or tracking hash
- `PATCH /api/orders/:id/status` - Advance pipeline stage
- `GET /api/analytics/overview` - Seller revenue and fair-trade impact metrics
- `POST /api/auth/login` - Authenticate user & return JWT token
- `POST /api/auth/demo-login` - 1-click role switcher
