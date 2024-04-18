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

    res.status(201).json({ newMessage });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  const senderId = req.userId;
  const receiverId = req.params.id;
  try {
    const chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate('messages');
    // if (!chat) {
    //   const error = new Error('No messages found!');
    //   error.statusCode = 404;
    //   throw error;
    // }
    const messages = chat.messages;

    res.status(200).json({ chat: messages });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
