const express = require('express');
const router = express.Router();

const apiSpec = {
  openapi: '3.0.0',
  info: {
    title: "Women's Empowerment Marketplace API",
    version: '2.4.0',
    description: 'High-performance REST API supporting multi-vendor storefronts, distributed order lifecycle pipeline, seller analytics, and JWT authentication.'
  },
  servers: [{ url: 'http://localhost:5001', description: 'Local Development Server' }],
  paths: {
    '/api/health': {
      get: { summary: 'System Health Check', responses: { 200: { description: 'API operational status and telemetry' } } }
    },
    '/api/auth/login': {
      post: { summary: 'Authenticate user with email and password', requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } } } } } }
    },
    '/api/auth/demo-login': {
      post: { summary: '1-click demo login for Artisan or Buyer', requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { role: { type: 'string', enum: ['artisan', 'customer'] } } } } } } }
    },
    '/api/products': {
      get: { summary: 'List artisan craft catalog with category, search, and sort filters' },
      post: { summary: 'List new handcrafted item (requires artisan JWT)', security: [{ bearerAuth: [] }] }
    },
    '/api/products/{id}': {
      get: { summary: 'Retrieve product details, artisan story provenance, and patron reviews' }
    },
    '/api/sellers': {
      get: { summary: 'List all registered women artisan cooperatives and brand storefronts' }
    },
    '/api/sellers/{id}': {
      get: { summary: 'Retrieve dedicated multi-vendor artisan storefront profile and products' }
    },
    '/api/orders': {
      post: { summary: 'Checkout shopping bag, allocate tracking hash, and initiate order pipeline' }
    },
    '/api/orders/pipeline': {
      get: { summary: 'Retrieve full consignment pipeline for seller suite' }
    },
    '/api/orders/track/{query}': {
      get: { summary: 'Track consignment state by Order Number or Tracking Code' }
    },
    '/api/orders/{id}/status': {
      patch: { summary: 'Advance order lifecycle stage (Pending -> Crafting -> Quality -> Dispatched -> Delivered)' }
    },
    '/api/analytics/overview': {
      get: { summary: 'Retrieve GMV, direct artisan payouts, order trends, and impact metrics' }
    },
    '/api/analytics/export-csv': {
      get: { summary: 'Download full CSV report of sales, orders, and fair-trade disbursements' }
    }
  }
};

// Return OpenAPI JSON
router.get('/spec', (req, res) => {
  res.json(apiSpec);
});

// Interactive Swagger-style Documentation Viewer
router.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Women's Empowerment Marketplace - Interactive API Reference</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0d16; color: #f1f5f9; margin: 0; padding: 30px; }
    .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 30px; }
    h1 { color: #ffffff; font-size: 1.8rem; margin: 0 0 8px 0; }
    .badge { background: #2563eb; color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: 700; }
    .endpoint { background: #111726; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; margin-bottom: 14px; overflow: hidden; }
    .endpoint-header { display: flex; align-items: center; gap: 14px; padding: 14px 20px; background: rgba(255,255,255,0.02); }
    .method { font-weight: 800; font-size: 0.82rem; padding: 4px 10px; border-radius: 6px; }
    .get { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
    .post { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); }
    .patch { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
    .path { font-family: monospace; font-size: 0.95rem; font-weight: 600; color: #f8fafc; }
    .desc { color: #94a3b8; font-size: 0.85rem; margin-left: auto; }
  </style>
</head>
<body>
  <div class="header">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom: 10px;">
      <span style="font-size:1.8rem;">🌸</span>
      <h1>Women's Empowerment Marketplace API</h1>
      <span class="badge">v2.4 OpenAPI Spec</span>
    </div>
    <p style="color: #94a3b8; margin: 0;">Complete REST API specification for multi-vendor storefronts, distributed order pipelines, and seller analytics.</p>
  </div>

  <div>
    ${Object.entries(apiSpec.paths).map(([path, methods]) => {
      return Object.entries(methods).map(([m, def]) => `
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method ${m}">${m.toUpperCase()}</span>
            <span class="path">${path}</span>
            <span class="desc">${def.summary || ''}</span>
          </div>
        </div>
      `).join('');
    }).join('')}
  </div>
</body>
</html>
  `;
  res.send(html);
});

module.exports = router;
