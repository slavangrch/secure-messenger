const User = require('../models/user');
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
