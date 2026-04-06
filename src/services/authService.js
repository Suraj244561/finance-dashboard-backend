const bcrypt = require('bcryptjs');
const db = require('../models/db');
const { signToken } = require('../utils/jwt');

function login(email, password) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) return reject(err);
      if (!user) return reject({ status: 401, message: 'Invalid credentials' });
      if (user.status !== 'active') return reject({ status: 403, message: 'User is inactive' });

      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) return reject({ status: 401, message: 'Invalid credentials' });

      resolve({
        token: signToken(user),
        user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status }
      });
    });
  });
}

module.exports = { login };
