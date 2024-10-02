const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const Chat = require('../models/chat');
const SECRET_KEY = process.env.SECRET_KEY;

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
    const email = req.body.submitData.email;
    const password = req.body.submitData.password;
    const publicKey = req.body.publicKeyJwk;
    const user = await User.findOne({ email: email });
    let fakePasswordIsEqual = undefined;

    if (!user) {
      const error = new Error("User with this email doesn't exists.");
      error.statusCode = 404;
      throw error;
    }
    if (user.fakePassword) {
      fakePasswordIsEqual = await bcrypt.compare(password, user.fakePassword);
    }

    if (fakePasswordIsEqual) {
      const secretChats = await Chat.find({
        members: user._id,
        isSecret: true,
      });
      const deleteRes = await Promise.all(
        secretChats.map((chat) => chat.deleteOne())
      );
      const token = await handlePublicKeyAndToken(user, publicKey);

      res.status(200).json({ token: token, userId: user._id, isFake: true });
    }

    const passwordIsEqual = await bcrypt.compare(password, user.password);
    if (!passwordIsEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = await handlePublicKeyAndToken(user, publicKey);

    res.status(200).json({ token: token, userId: user._id, isFake: false });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const handlePublicKeyAndToken = async (user, publicKey) => {
  if (!publicKey) {
    const error = new Error('Public key is missing in the request!');
    error.statusCode = 400;
    throw error;
  }
  user.publicKey = publicKey;
  const updatedUser = await user.save();

  const token = jwt.sign(
    {
      email: updatedUser.email,
      userId: updatedUser._id.toString(),
    },
    SECRET_KEY,
    { expiresIn: '7d' }
  );

  return token;
};

exports.SECRET_KEY = SECRET_KEY;
