const router = require('express').Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
router.use(authenticate, authorize('admin'));
router.get('/', userController.listUsers);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
module.exports = router;
