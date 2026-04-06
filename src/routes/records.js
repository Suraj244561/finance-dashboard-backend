const router = require('express').Router();
const recordController = require('../controllers/recordController');
const { authenticate, authorize } = require('../middleware/auth');
router.get('/', authenticate, authorize('viewer', 'analyst', 'admin'), recordController.listRecords);
router.post('/', authenticate, authorize('admin'), recordController.createRecord);
router.put('/:id', authenticate, authorize('admin'), recordController.updateRecord);
router.delete('/:id', authenticate, authorize('admin'), recordController.deleteRecord);
module.exports = router;
