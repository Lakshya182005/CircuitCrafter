const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key_change_me');
    req.user = decoded;
    // Compatibility with Clerk's req.auth if needed elsewhere, though we should refactor
    req.auth = { userId: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { requireAuth };
