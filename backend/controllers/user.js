const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
exports.getSidebarChats = async (req, res, next) => {
  try {
    const userId = req.userId;
    const users = await User.find({ _id: { $ne: userId } }).select('-password');
    res.status(200).json({ users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getReceiverPublicKey = async (req, res, next) => {
  try {
    const receiverId = req.params.receiverId;
    const receiver = await User.findById(receiverId);
    res.status(200).json({ publicKey: receiver.publicKey });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getEditUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');
    res.status(200).json({ user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error('Wrong input!');
    //   error.statusCode = 422;
    //   error.data = errors.array();
    //   throw error;
    // }
    const userId = req.userId;
    const imageUrl = req.file?.path || '';
    const username = req.body.username;
    const oldPassword = req.body['old-password'];
    const newPassword = req.body['new-password'];
    const fakePassword = req.body['fake-password'] || '';

    const user = await User.findById(userId);
    // console.log(user);
    if (username && username.length <= 2) {
      const error = new Error('Username should be minimun 3 characters!');
      error.statusCode = 401;
      throw error;
    } else if (username && username.length >= 3) {
      user.username = username;
    }
    if (imageUrl) {
      if (user.imageUrl) {
        clearImage(user.imageUrl);
      }
      user.imageUrl = imageUrl;
    }
    if (oldPassword) {
      const passwordIsEqual = await bcrypt.compare(oldPassword, user.password);
      if (!passwordIsEqual) {
        const error = new Error('Wrong old password!');
        error.statusCode = 401;
        throw error;
      } else if (passwordIsEqual) {
        if (newPassword && newPassword.trim().length >= 8) {
          user.password = newPassword;
        } else {
          const error = new Error('You should set new valid password!');
          error.statusCode = 401;
          throw error;
        }
      }
    }
    if (fakePassword && fakePassword.trim().length >= 8) {
      user.fakePassword = fakePassword;
    }
    const result = await user.save();
    res.status(200).json({ result });
    // console.log(imageUrl, oldPassword, newPassword, fakePassword, username);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    next(error);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');
    res.status(200).json({ user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    next(error);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
