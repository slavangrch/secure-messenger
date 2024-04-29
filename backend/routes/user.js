const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getSidebarChats);
router.get('/getPublicKey/:receiverId', userController.getReceiverPublicKey);
router.get('/getEditUser', userController.getEditUser);

module.exports = router;
