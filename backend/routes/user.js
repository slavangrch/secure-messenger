const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getSidebarChats);

module.exports = router;
