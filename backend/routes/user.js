const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { body } = require('express-validator/check');

router.get('/', userController.getSidebarChats);
router.get('/getPublicKey/:receiverId', userController.getReceiverPublicKey);
router.get('/getEditUser', userController.getEditUser);
router.post('/editUser', userController.editUser);
router.get('/getLoggedUser', userController.getUserInfo);

module.exports = router;
