const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate, authorize } = require('../middleware/auth');
router.get('/summary', authenticate, authorize('viewer', 'analyst', 'admin'), dashboardController.summary);
router.get('/trends', authenticate, authorize('analyst', 'admin'), dashboardController.trends);
module.exports = router;
