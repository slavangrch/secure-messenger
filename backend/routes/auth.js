const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const { body } = require('express-validator/check');
const User = require('../models/user');

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email!')
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject('User with this email already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 8 }),
    body('username').trim().not().isEmpty(),
  ],
  authController.signup
);
router.post('/login', authController.login);

module.exports = router;
