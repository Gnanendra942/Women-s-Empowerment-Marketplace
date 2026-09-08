const express = require('express');
const router = express.Router();
const { allQuery, getQuery } = require('../db');

// Get Seller Analytics Overview
router.get('/overview', async (req, res) => {
  try {
    const revenueRow = await getQuery('SELECT COALESCE(SUM(total_amount), 0) as total_revenue, COUNT(*) as total_orders FROM orders');
    const productsCount = await getQuery('SELECT COUNT(*) as count FROM products');
    const artisansCount = await getQuery('SELECT COUNT(*) as count FROM users WHERE role = "artisan"');

    // Pipeline breakdown by status
    const statusBreakdown = await allQuery(`
      SELECT status, COUNT(*) as count 
      FROM orders 
      GROUP BY status
    `);

    // Top selling products by order count
    const topProducts = await allQuery(`
      SELECT p.id, p.title, p.category, p.price, p.image_url, p.artisan_name,
             COALESCE(SUM(oi.quantity), 0) as units_sold,
             COALESCE(SUM(oi.quantity * oi.unit_price), 0) as total_generated
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      GROUP BY p.id
      ORDER BY units_sold DESC
      LIMIT 5
    `);

    // Category distribution
    const categoryDistribution = await allQuery(`
      SELECT category, COUNT(*) as product_count, AVG(price) as avg_price
      FROM products
      GROUP BY category
    `);

    // Impact Calculations
    const totalRev = revenueRow.total_revenue || 0;
    const estimatedArtisanHours = Math.round((revenueRow.total_orders || 1) * 38.5);
    const fairTradeDirectPayoutPercent = 86; // 86% of gross goes directly to women cooperatives

    res.json({
      metrics: {
        total_revenue: totalRev,
        total_orders: revenueRow.total_orders,
        active_products: productsCount.count,
        active_artisans: artisansCount.count,
        artisan_labor_hours: estimatedArtisanHours,
        fair_trade_direct_payout_pct: fairTradeDirectPayoutPercent,
        average_order_value: revenueRow.total_orders > 0 ? (totalRev / revenueRow.total_orders).toFixed(2) : 0
      },
      status_breakdown: statusBreakdown,
      top_products: topProducts,
      category_distribution: categoryDistribution
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to generate seller analytics.' });
  }
});

// Export CSV Report
router.get('/export-csv', async (req, res) => {
  try {
    const orders = await allQuery(`
      SELECT o.order_number, o.customer_name, o.customer_email, o.total_amount,
             o.status, o.tracking_code, o.created_at,
             (o.total_amount * 0.86) as artisan_share
      FROM orders o
      ORDER BY o.id DESC
    `);

    // Build CSV content
    const headers = ['Order Number', 'Customer Name', 'Customer Email', 'Gross Total ($)', 'Artisan Share 86% ($)', 'Pipeline Status', 'Tracking Hash', 'Created Date'];
    const rows = orders.map(o => [
      `"${o.order_number}"`,
      `"${o.customer_name}"`,
      `"${o.customer_email}"`,
      Number(o.total_amount).toFixed(2),
      Number(o.artisan_share).toFixed(2),
      `"${o.status}"`,
      `"${o.tracking_code}"`,
      `"${o.created_at}"`
    ]);

    const csvData = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="women_marketplace_sales_report.csv"');
    res.send(csvData);
  } catch (err) {
    console.error('CSV Export error:', err);
    res.status(500).json({ error: 'Failed to generate CSV export.' });
  }
});

module.exports = router;

