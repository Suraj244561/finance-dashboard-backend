const db = require('../models/db');

function summary(req, res, next) {
  db.get(
    `SELECT
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) AS totalIncome,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) AS totalExpense,
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) - COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) AS netBalance
     FROM records`,
    [],
    (err, totals) => {
      if (err) return next(err);
      db.all('SELECT category, SUM(amount) AS total FROM records GROUP BY category ORDER BY total DESC', [], (catErr, categoryTotals) => {
        if (catErr) return next(catErr);
        db.all('SELECT * FROM records ORDER BY date DESC, id DESC LIMIT 5', [], (recentErr, recentActivity) => {
          if (recentErr) return next(recentErr);
          res.json({ ...totals, categoryTotals, recentActivity });
        });
      });
    }
  );
}

function trends(req, res, next) {
  db.all(
    `SELECT substr(date, 1, 7) AS month,
            COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) AS income,
            COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) AS expense
     FROM records
     GROUP BY substr(date, 1, 7)
     ORDER BY month ASC`,
    [],
    (err, rows) => {
      if (err) return next(err);
      res.json(rows);
    }
  );
}

module.exports = { summary, trends };
