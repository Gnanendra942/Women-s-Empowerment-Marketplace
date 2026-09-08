const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB } = require('./db');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const analyticsRoutes = require('./routes/analytics');
const workshopRoutes = require('./routes/workshops');
const messageRoutes = require('./routes/messages');
const sellerRoutes = require('./routes/sellers');
const docsRoutes = require('./routes/docs');
const notificationRoutes = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 5001;

// Lightweight in-memory rate limiting for auth endpoints
const rateLimitMap = new Map();
const authRateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 mins
  const maxRequests = 50;

  const clientData = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + windowMs;
  } else {
    clientData.count++;
  }
  rateLimitMap.set(ip, clientData);

  if (clientData.count > maxRequests) {
    return res.status(429).json({ error: 'Too many authentication attempts. Please try again later.' });
  }
  next();
};

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static public assets (images, uploads)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API Routes
app.use('/api/auth', authRateLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/docs', docsRoutes);
app.use('/api/notifications', notificationRoutes);

app.use('/api/workshops', workshopRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: "Women's Empowerment Marketplace API",
    engine: 'Node.js Express + SQLite',
    security: 'JWT Encrypted Auth Guard',
    pipeline: 'Distributed Order Lifecycle Active',
    timestamp: new Date().toISOString()
  });
});

// Start server
async function start() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`🚀 Women's Empowerment Marketplace Server running at http://localhost:${PORT}`);
      console.log(`📦 Healthcheck endpoint: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('Fatal initialization error:', err);
    process.exit(1);
  }
}

start();
