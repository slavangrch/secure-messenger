const io = require('./socketHelper');
const onlineUserIds = {};
exports.getSocketId = (id) => {
  return onlineUserIds[id];
};

exports.socketManager = function () {
  io.getIo().on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    onlineUserIds[userId] = socket.id;
    io.getIo().emit('online-users', onlineUserIds);
    // console.log('socket connected', socket.id, userId);

    socket.on('disconnect', () => {
      //   console.log('socket disconnected');
      delete onlineUserIds[userId];
      io.getIo().emit('online-users', onlineUserIds);
    });
  });
};
