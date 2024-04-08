const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/signup', authController.signup);
router.get('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
