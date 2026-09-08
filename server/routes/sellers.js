const express = require('express');
const router = express.Router();
const { runQuery, allQuery, getQuery } = require('../db');
const { authenticateToken, requireArtisan } = require('../middleware/auth');

// Get all artisan sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await allQuery(`
      SELECT u.id, u.name, u.email, u.location, u.bio, u.avatar, u.artisan_collective,
             COUNT(p.id) as product_count,
             COALESCE(AVG(p.rating), 5.0) as average_rating
      FROM users u
      LEFT JOIN products p ON u.id = p.artisan_id
      WHERE u.role = 'artisan'
      GROUP BY u.id
      ORDER BY product_count DESC
    `);
    res.json(sellers);
  } catch (err) {
    console.error('Error fetching sellers:', err);
    res.status(500).json({ error: 'Failed to fetch artisan sellers.' });
  }
});

// Get single artisan seller profile + their storefront catalog
router.get('/:id', async (req, res) => {
  try {
    const seller = await getQuery(`
      SELECT id, name, email, location, bio, avatar, artisan_collective, created_at
      FROM users
      WHERE id = ? AND role = 'artisan'
    `, [req.params.id]);

    if (!seller) {
      return res.status(404).json({ error: 'Artisan storefront not found.' });
    }

    const products = await allQuery(`
      SELECT * FROM products WHERE artisan_id = ? ORDER BY id DESC
    `, [req.params.id]);

    const reviewStats = await getQuery(`
      SELECT COUNT(r.id) as total_reviews, COALESCE(AVG(r.rating), 5.0) as avg_rating
      FROM reviews r
      JOIN products p ON r.product_id = p.id
      WHERE p.artisan_id = ?
    `, [req.params.id]);

    res.json({
      seller,
      products,
      stats: {
        total_products: products.length,
        total_reviews: reviewStats?.total_reviews || 0,
        average_rating: parseFloat((reviewStats?.avg_rating || 5.0).toFixed(1))
      }
    });
  } catch (err) {
    console.error('Error fetching seller storefront:', err);
    res.status(500).json({ error: 'Failed to retrieve artisan storefront.' });
  }
});

// Update seller storefront profile
router.put('/profile', requireArtisan, async (req, res) => {
  try {
    const { name, bio, location, artisan_collective, avatar } = req.body;

    await runQuery(`
      UPDATE users
      SET name = COALESCE(?, name),
          bio = COALESCE(?, bio),
          location = COALESCE(?, location),
          artisan_collective = COALESCE(?, artisan_collective),
          avatar = COALESCE(?, avatar)
      WHERE id = ?
    `, [name, bio, location, artisan_collective, avatar, req.user.id]);

    const updated = await getQuery(`
      SELECT id, name, email, role, location, bio, avatar, artisan_collective
      FROM users WHERE id = ?
    `, [req.user.id]);

    res.json({ message: 'Artisan storefront updated successfully.', seller: updated });
  } catch (err) {
    console.error('Error updating seller profile:', err);
    res.status(500).json({ error: 'Failed to update artisan profile.' });
  }
});

module.exports = router;
