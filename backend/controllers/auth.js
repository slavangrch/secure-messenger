const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Wrong input!');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const confirmedPassword = req.body.confirmedPassword;
    const dafaultImageURL =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVi9cbmMkUabLiF_3kfI94qngwPIM4gnrztEUv6Hopw&s';

    if (password !== confirmedPassword) {
      const error = new Error('Passwords should match!');
      error.statusCode = 400;
      error.data = errors.array();
      throw error;
      // res.status(400).json({ error: 'Passwords should match!' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      imageURL: dafaultImageURL,
    });

    const result = await user.save();
    res.status(201).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.login = (req, res, next) => {
  console.log('login contr');
};
exports.logout = (req, res, next) => {
  console.log('logout contr');
};
