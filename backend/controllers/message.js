const Chat = require('../models/chat');
const Message = require('../models/message');

exports.sendMessage = async (req, res, next) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.userId;
    const message = req.body.message;

    let chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await new Chat({
        members: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await new Message({
      senderId,
      receiverId,
      message,
    });

    const result = await newMessage.save();
    chat.messages.push(result._id);
    await chat.save();

    res.status(200).json({ receiverId, message });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
