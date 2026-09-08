const express = require('express');
const router = express.Router();
const { runQuery, allQuery, getQuery } = require('../db');
const { authenticateToken, requireArtisan } = require('../middleware/auth');

// Create Order (Checkout)
router.post('/', async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      shipping_address,
      city,
      postal_code,
      items,
      total_amount,
      payment_method = 'Card (Simulated)'
    } = req.body;

    if (!customer_name || !customer_email || !shipping_address || !items || !items.length) {
      return res.status(400).json({ error: 'Missing required order fields or empty cart.' });
    }

    const orderNumber = 'WEM-' + Math.floor(100000 + Math.random() * 900000);
    const trackingCode = 'TRK-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    // Check if user is logged in (optional token)
    let userId = null;
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1];
        const jwt = require('jsonwebtoken');
        const { JWT_SECRET } = require('../middleware/auth');
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (e) {
        // Guest checkout fallback
      }
    }

    const orderRes = await runQuery(`
      INSERT INTO orders (
        order_number, user_id, customer_name, customer_email,
        shipping_address, city, postal_code, total_amount,
        status, payment_method, tracking_code, artisan_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?, ?, ?)
    `, [
      orderNumber,
      userId,
      customer_name,
      customer_email,
      shipping_address,
      city || '',
      postal_code || '',
      parseFloat(total_amount),
      payment_method,
      trackingCode,
      'Order queued for artisan workshop allocation.'
    ]);

    const orderId = orderRes.lastID;

    // Insert order items and adjust stock
    for (const it of items) {
      await runQuery(`
        INSERT INTO order_items (order_id, product_id, product_title, quantity, unit_price, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        orderId,
        it.id || it.product_id,
        it.title || it.product_title,
        it.quantity,
        it.price || it.unit_price,
        it.image_url
      ]);

      // Decrement stock
      await runQuery(`
        UPDATE products 
        SET stock = MAX(0, stock - ?) 
        WHERE id = ?
      `, [it.quantity, it.id || it.product_id]);
    }

    const createdOrder = await getQuery('SELECT * FROM orders WHERE id = ?', [orderId]);
    const orderItems = await allQuery('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

    res.status(201).json({
      message: 'Order successfully placed!',
      order: createdOrder,
      items: orderItems
    });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: 'Failed to process checkout order.' });
  }
});

// Get Distributed Order Pipeline (All orders for seller suite)
router.get('/pipeline', async (req, res) => {
  try {
    const orders = await allQuery('SELECT * FROM orders ORDER BY id DESC');
    for (let o of orders) {
      o.items = await allQuery('SELECT * FROM order_items WHERE order_id = ?', [o.id]);
    }
    res.json(orders);
  } catch (err) {
    console.error('Pipeline fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch order pipeline.' });
  }
});

// Get My Orders (Logged in user)
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const orders = await allQuery(`
      SELECT * FROM orders 
      WHERE user_id = ? OR customer_email = ? 
      ORDER BY id DESC
    `, [req.user.id, req.user.email]);

    for (let o of orders) {
      o.items = await allQuery('SELECT * FROM order_items WHERE order_id = ?', [o.id]);
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch personal orders.' });
  }
});

// Track Order by Code or Number
router.get('/track/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const order = await getQuery(`
      SELECT * FROM orders 
      WHERE order_number = ? OR tracking_code = ?
    `, [query, query]);

    if (!order) {
      return res.status(404).json({ error: 'Order not found with that order number or tracking code.' });
    }

    order.items = await allQuery('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Tracking query failed.' });
  }
});

// Update Order Pipeline Status (Artisan / Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, artisan_notes } = req.body;
    const validStatuses = ['Pending', 'Artisan Crafting', 'Quality Check', 'Dispatched', 'Delivered'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    await runQuery(`
      UPDATE orders 
      SET status = ?, 
          artisan_notes = COALESCE(?, artisan_notes)
      WHERE id = ?
    `, [status, artisan_notes, req.params.id]);

    const updated = await getQuery('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    updated.items = await allQuery('SELECT * FROM order_items WHERE order_id = ?', [updated.id]);

    res.json({
      message: `Order status advanced to ${status}`,
      order: updated
    });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ error: 'Failed to advance order status.' });
  }
});

module.exports = router;
