let io;
module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: 'http://localhost:5173',
      },
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error('Socket not initialized!');
    }
    return io;
  },
};
