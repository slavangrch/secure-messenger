const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getSidebarChats);
router.get('/getPublicKey/:receiverId', userController.getReceiverPublicKey);
router.get('/getEditUser', userController.getEditUser);
router.post('/editUser', userController.editUser);
router.get('/getLoggedUser', userController.getUserInfo);
router.post('/setChatIsSecret/:receiverId', userController.setChatIsSecret);

module.exports = router;
