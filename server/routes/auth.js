const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getQuery, runQuery } = require('../db');
const { JWT_SECRET, authenticateToken } = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'customer', location, bio, artisan_collective } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = await getQuery('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await runQuery(`
      INSERT INTO users (name, email, password_hash, role, location, bio, avatar, artisan_collective)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name.trim(),
      email.toLowerCase().trim(),
      password_hash,
      role,
      location || '',
      bio || '',
      role === 'artisan' ? '/images/ananya_artisan.jpg' : null,
      artisan_collective || (role === 'artisan' ? `${name}'s Artisan Guild` : null)
    ]);

    const user = {
      id: result.lastID,
      name,
      email: email.toLowerCase().trim(),
      role,
      location,
      bio,
      artisan_collective
    };

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully.',
      token,
      user
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Failed to create account.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const user = await getQuery('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password_hash, ...safeUser } = user;
    res.json({
      message: 'Login successful',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication failed.' });
  }
});

// Quick Demo Login (Customer or Artisan)
router.post('/demo-login', async (req, res) => {
  try {
    const { role = 'artisan' } = req.body;
    const targetEmail = role === 'artisan' ? 'ananya@artisan.org' : 'buyer@market.org';

    const user = await getQuery('SELECT * FROM users WHERE email = ?', [targetEmail]);
    if (!user) {
      return res.status(404).json({ error: 'Demo user not found.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password_hash, ...safeUser } = user;
    res.json({
      message: `Switched to Demo ${role === 'artisan' ? 'Artisan Seller' : 'Patron / Buyer'}`,
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Demo login error:', err);
    res.status(500).json({ error: 'Failed to authenticate demo user.' });
  }
});

// Current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await getQuery('SELECT id, name, email, role, location, bio, avatar, artisan_collective, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user profile.' });
  }
});

module.exports = router;
