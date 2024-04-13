const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const SECRET_KEY =
  '5227c42b3c78f653868cfd1b525b2a8d6f28e32bb8e1813c54ccc703b58bb9f3';

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
    // const dafaultImageURL =
    //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVi9cbmMkUabLiF_3kfI94qngwPIM4gnrztEUv6Hopw&s';

    if (password !== confirmedPassword) {
      const error = new Error('Passwords should match!');
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      // imageURL: dafaultImageURL,
    });

    const result = await user.save();
    res.status(201).json({ result });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("User with this email doesn't exists.");
      error.statusCode = 404;
      throw error;
    }

    const passwordIsEqual = await bcrypt.compare(password, user.password);
    if (!passwordIsEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token: token, userId: user._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.logout = (req, res, next) => {
  console.log('logout contr');
};

exports.SECRET_KEY = SECRET_KEY;
