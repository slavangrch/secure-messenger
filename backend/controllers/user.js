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
