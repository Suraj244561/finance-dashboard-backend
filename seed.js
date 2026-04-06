const bcrypt = require('bcryptjs');
const db = require('./src/models/db');

const users = [
  ['Suraj Admin', 'admin@finance.com', bcrypt.hashSync('admin123', 10), 'admin', 'active'],
  ['Anita Analyst', 'analyst@finance.com', bcrypt.hashSync('analyst123', 10), 'analyst', 'active'],
  ['Vikas Viewer', 'viewer@finance.com', bcrypt.hashSync('viewer123', 10), 'viewer', 'active'],
  ['Inactive User', 'inactive@finance.com', bcrypt.hashSync('inactive123', 10), 'viewer', 'inactive']
];

const records = [
  [50000, 'income', 'Salary', '2026-01-05', 'January salary', 1],
  [12000, 'expense', 'Rent', '2026-01-06', 'Monthly rent', 1],
  [3500, 'expense', 'Food', '2026-01-10', 'Groceries', 1],
  [52000, 'income', 'Salary', '2026-02-05', 'February salary', 1],
  [6000, 'income', 'Freelance', '2026-02-12', 'Side project', 1],
  [15000, 'expense', 'Travel', '2026-02-20', 'Work trip', 1],
  [51000, 'income', 'Salary', '2026-03-05', 'March salary', 1],
  [5000, 'expense', 'Utilities', '2026-03-11', 'Electricity and internet', 1],
  [4200, 'expense', 'Food', '2026-03-15', 'Dining and groceries', 1],
  [54000, 'income', 'Salary', '2026-04-05', 'April salary', 1],
  [8000, 'income', 'Bonus', '2026-04-06', 'Performance bonus', 1],
  [7000, 'expense', 'Healthcare', '2026-04-06', 'Medical bills', 1]
];

db.serialize(() => {
  db.run('DELETE FROM users');
  db.run('DELETE FROM records');
  const userStmt = db.prepare('INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)');
  users.forEach((u) => userStmt.run(u));
  userStmt.finalize();
  const recordStmt = db.prepare('INSERT INTO records (amount, type, category, date, notes, created_by) VALUES (?, ?, ?, ?, ?, ?)');
  records.forEach((r) => recordStmt.run(r));
  recordStmt.finalize();
  db.close();
});
