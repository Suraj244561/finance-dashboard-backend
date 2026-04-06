const jwt = require('jsonwebtoken');

const signToken = (user) => jwt.sign(
  { id: user.id, role: user.role, email: user.email },
  process.env.JWT_SECRET || 'finance-secret-key-2026',
  { expiresIn: '24h' }
);

module.exports = { signToken };
