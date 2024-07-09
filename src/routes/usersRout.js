const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.addUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:password', userController.getUserById);
router.put('/users/:password', userController.updateUserById);
router.delete('/users/:password', userController.deleteUserById);

module.exports = router;





