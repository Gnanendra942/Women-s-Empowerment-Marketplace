const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'women_empowerment_marketplace_secret_jwt_key_2026';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired session token.' });
  }
}

function requireArtisan(req, res, next) {
  authenticateToken(req, res, () => {
    if (req.user && (req.user.role === 'artisan' || req.user.role === 'admin')) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden. Artisan or Seller permissions required.' });
    }
  });
}

module.exports = {
  JWT_SECRET,
  authenticateToken,
  requireArtisan
};
