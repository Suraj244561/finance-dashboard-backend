const db = require('../models/db');
const { recordSchema } = require('../utils/validators');

function listRecords(req, res, next) {
  const filters = [];
  const values = [];
  if (req.query.type) { filters.push('type = ?'); values.push(req.query.type); }
  if (req.query.category) { filters.push('category = ?'); values.push(req.query.category); }
  if (req.query.startDate) { filters.push('date >= ?'); values.push(req.query.startDate); }
  if (req.query.endDate) { filters.push('date <= ?'); values.push(req.query.endDate); }
  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  db.all(`SELECT * FROM records ${where} ORDER BY date DESC, id DESC`, values, (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
}

async function createRecord(req, res, next) {
  try {
    const payload = await recordSchema.validateAsync(req.body);
    db.run(
      'INSERT INTO records (amount, type, category, date, notes, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [payload.amount, payload.type, payload.category, payload.date, payload.notes || '', req.user.id],
      function (err) {
        if (err) return next(err);
        res.status(201).json({ id: this.lastID, message: 'Record created successfully' });
      }
    );
  } catch (error) {
    next(error);
  }
}

async function updateRecord(req, res, next) {
  try {
    const payload = await recordSchema.validateAsync(req.body);
    db.get('SELECT * FROM records WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return next(err);
      if (!row) return next({ status: 404, message: 'Record not found' });
      db.run(
        'UPDATE records SET amount = ?, type = ?, category = ?, date = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [payload.amount, payload.type, payload.category, payload.date, payload.notes || '', req.params.id],
        function (updateErr) {
          if (updateErr) return next(updateErr);
          res.json({ message: 'Record updated successfully' });
        }
      );
    });
  } catch (error) {
    next(error);
  }
}

function deleteRecord(req, res, next) {
  db.get('SELECT * FROM records WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return next(err);
    if (!row) return next({ status: 404, message: 'Record not found' });
    db.run('DELETE FROM records WHERE id = ?', [req.params.id], function (deleteErr) {
      if (deleteErr) return next(deleteErr);
      res.json({ message: 'Record deleted successfully' });
    });
  });
}

module.exports = { listRecords, createRecord, updateRecord, deleteRecord };
