const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.post('/users', authMiddleware, userController.addUser);
router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/users/:password', authMiddleware, userController.getUserById);
router.put('/users/:password', authMiddleware, userController.updateUserById);
router.delete('/users/:password', authMiddleware, userController.deleteUserById);

module.exports = router;
