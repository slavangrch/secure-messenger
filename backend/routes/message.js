const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message');

router.post('/send/:id', messageController.sendMessage);
router.get('/:id', messageController.getMessages);

module.exports = router;
