const User = require('../models/user');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const Chat = require('../models/chat');
exports.getSidebarChats = async (req, res, next) => {
  try {
    const userId = req.userId;
    const users = await User.find({ _id: { $ne: userId } }).select(
      '-password -fakePassword'
    );
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
    const user = await User.findById(userId).select('-password -fakePassword');
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
    const userId = req.userId;
    const imageUrl = req.file?.path || '';
    const username = req.body.username;
    const oldPassword = req.body['old-password'];
    const newPassword = req.body['new-password'];
    const fakePassword = req.body['fake-password'] || '';

    const user = await User.findById(userId);
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
    if (fakePassword && fakePassword.trim().length < 8) {
      const error = new Error('You should set valid fake password!');
      error.statusCode = 401;
      throw error;
    } else if (fakePassword && fakePassword.trim().length >= 8) {
      const fakePasswordIsEqual = await bcrypt.compare(
        fakePassword,
        user.password
      );
      if (fakePasswordIsEqual) {
        const error = new Error('Fake password should be unique!');
        error.statusCode = 401;
        throw error;
      }
      const hashedFakePassword = await bcrypt.hash(fakePassword, 12);
      user.fakePassword = hashedFakePassword;
    }
    const result = await user.save();
    // console.log(result);
    res.status(200).json({ result });
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
    const user = await User.findById(userId).select('-password -fakePassword');
    res.status(200).json({ user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    next(error);
  }
};

exports.setChatIsSecret = async (req, res, next) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.receiverId;
    const isSecret = req.body.isSecret;
    const chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!chat) {
      const error = new Error('No chat found!');
      error.statusCode = 401;
      throw error;
    }
    chat.isSecret = isSecret;
    const result = await chat.save();
    // console.log(result);
    res.status(200).json({ isSecret: result.isSecret });
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
