const io = require('./socketHelper');
const onlineUserIds = {};

module.exports = function socketManager() {
  const onlineUserIds = {};

  io.getIo().on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    onlineUserIds[userId] = socket.id;
    io.getIo().emit('online-users', onlineUserIds);
    console.log('socket connected', socket.id, userId);

    socket.on('disconnect', () => {
      console.log('socket disconnected');
      delete onlineUserIds[userId];
      io.getIo().emit('online-users', onlineUserIds);
    });
  });
};
