const bcrypt = require('bcryptjs');
const db = require('../models/db');
const { userSchema, userUpdateSchema } = require('../utils/validators');

function listUsers(req, res, next) {
  db.all('SELECT id, name, email, role, status, created_at FROM users ORDER BY id DESC', [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
}

async function createUser(req, res, next) {
  try {
    const payload = await userSchema.validateAsync(req.body);
    const hashed = bcrypt.hashSync(payload.password, 10);
    db.run(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [payload.name, payload.email, hashed, payload.role, payload.status],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE')) return next({ status: 409, message: 'Email already exists' });
          return next(err);
        }
        res.status(201).json({ id: this.lastID, message: 'User created successfully' });
      }
    );
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const payload = await userUpdateSchema.validateAsync(req.body);
    db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, user) => {
      if (err) return next(err);
      if (!user) return next({ status: 404, message: 'User not found' });

      db.run(
        'UPDATE users SET name = ?, role = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [payload.name ?? user.name, payload.role ?? user.role, payload.status ?? user.status, req.params.id],
        function (updateErr) {
          if (updateErr) return next(updateErr);
          res.json({ message: 'User updated successfully' });
        }
      );
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { listUsers, createUser, updateUser };
