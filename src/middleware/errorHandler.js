function errorHandler(err, req, res, next) {
  if (err && err.isJoi) {
    return res.status(400).json({ message: 'Validation error', details: err.details.map(d => d.message) });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
}

module.exports = errorHandler;
