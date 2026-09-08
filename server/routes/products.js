const express = require('express');
const router = express.Router();
const { runQuery, allQuery, getQuery } = require('../db');
const { requireArtisan, authenticateToken } = require('../middleware/auth');

// Get all products with filters & search
router.get('/', async (req, res) => {
  try {
    const { category, craft, search, sort, artisan_id } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (craft) {
      sql += ' AND craft_type = ?';
      params.push(craft);
    }

    if (artisan_id) {
      sql += ' AND artisan_id = ?';
      params.push(artisan_id);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ? OR artisan_name LIKE ? OR artisan_village LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (sort === 'price_asc') {
      sql += ' ORDER BY price ASC';
    } else if (sort === 'price_desc') {
      sql += ' ORDER BY price DESC';
    } else if (sort === 'rating') {
      sql += ' ORDER BY rating DESC';
    } else {
      sql += ' ORDER BY id DESC';
    }

    const products = await allQuery(sql, params);
    res.json(products);
  } catch (err) {
    console.error('Fetch products error:', err);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// Get Categories with product counts
router.get('/meta/categories', async (req, res) => {
  try {
    const rows = await allQuery(`
      SELECT category, COUNT(*) as count 
      FROM products 
      GROUP BY category 
      ORDER BY count DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
});

// Get single product by ID with reviews and artisan details
router.get('/:id', async (req, res) => {
  try {
    const product = await getQuery('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const reviews = await allQuery('SELECT * FROM reviews WHERE product_id = ? ORDER BY id DESC', [req.params.id]);
    const artisan = await getQuery('SELECT id, name, location, bio, avatar, artisan_collective FROM users WHERE id = ?', [product.artisan_id]);

    res.json({
      ...product,
      reviews,
      artisan
    });
  } catch (err) {
    console.error('Product detail error:', err);
    res.status(500).json({ error: 'Failed to fetch product details.' });
  }
});

// Add new product (Artisan protected)
router.post('/', requireArtisan, async (req, res) => {
  try {
    const {
      title,
      description,
      story,
      price,
      category,
      craft_type,
      stock = 10,
      image_url,
      impact_tag,
      lead_time_days = 3
    } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ error: 'Title, price, and category are required fields.' });
    }

    const artisan = await getQuery('SELECT name, location, artisan_collective FROM users WHERE id = ?', [req.user.id]);
    const artisanName = artisan?.name || req.user.name;
    const artisanVillage = artisan?.location || 'Rural Craft Cluster';

    const result = await runQuery(`
      INSERT INTO products (
        title, description, story, price, category, craft_type,
        artisan_id, artisan_name, artisan_village, stock,
        rating, reviews_count, image_url, impact_tag, lead_time_days
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 5.0, 0, ?, ?, ?)
    `, [
      title,
      description || 'Finely handcrafted by women artisans.',
      story || 'Empowering village households through traditional artistry and fair commerce.',
      parseFloat(price),
      category,
      craft_type || 'Traditional Handcraft',
      req.user.id,
      artisanName,
      artisanVillage,
      parseInt(stock, 10),
      image_url || '/images/pashmina.jpg',
      impact_tag || '100% Ethical & Fair Trade Verified',
      parseInt(lead_time_days, 10) || 3
    ]);

    const newProduct = await getQuery('SELECT * FROM products WHERE id = ?', [result.lastID]);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Failed to create artisan craft listing.' });
  }
});

// Update product (Artisan protected)
router.put('/:id', requireArtisan, async (req, res) => {
  try {
    const { title, description, story, price, stock, impact_tag, category } = req.body;
    const product = await getQuery('SELECT * FROM products WHERE id = ?', [req.params.id]);

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Ensure the artisan owns this product or is admin
    if (product.artisan_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to edit this product.' });
    }

    await runQuery(`
      UPDATE products 
      SET title = COALESCE(?, title),
          description = COALESCE(?, description),
          story = COALESCE(?, story),
          price = COALESCE(?, price),
          stock = COALESCE(?, stock),
          impact_tag = COALESCE(?, impact_tag),
          category = COALESCE(?, category)
      WHERE id = ?
    `, [
      title,
      description,
      story,
      price ? parseFloat(price) : null,
      stock !== undefined ? parseInt(stock, 10) : null,
      impact_tag,
      category,
      req.params.id
    ]);

    const updated = await getQuery('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(updated);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Failed to update product.' });
  }
});

// Delete product
router.delete('/:id', requireArtisan, async (req, res) => {
  try {
    const product = await getQuery('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    if (product.artisan_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied.' });
    }

    await runQuery('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Artisan product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

// Add Review
router.post('/:id/reviews', async (req, res) => {
  try {
    const { author, rating, comment } = req.body;
    if (!author || !rating || !comment) {
      return res.status(400).json({ error: 'Author, rating, and comment are required.' });
    }

    await runQuery(`
      INSERT INTO reviews (product_id, author, rating, comment, verified_buyer)
      VALUES (?, ?, ?, ?, 1)
    `, [req.params.id, author, parseInt(rating, 10), comment]);

    // Recalculate average rating
    const stats = await getQuery(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as count 
      FROM reviews 
      WHERE product_id = ?
    `, [req.params.id]);

    await runQuery(`
      UPDATE products 
      SET rating = ?, reviews_count = ? 
      WHERE id = ?
    `, [
      parseFloat(stats.avg_rating.toFixed(1)),
      stats.count,
      req.params.id
    ]);

    const updatedReviews = await allQuery('SELECT * FROM reviews WHERE product_id = ? ORDER BY id DESC', [req.params.id]);
    res.status(201).json(updatedReviews);
  } catch (err) {
    console.error('Add review error:', err);
    res.status(500).json({ error: 'Failed to post review.' });
  }
});

module.exports = router;
