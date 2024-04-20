import { useState, createContext, useEffect } from 'react';
import { getToken, getUserId } from '../utils/localStorageManipulation';
import openSocket from 'socket.io-client';

export const SocketContext = createContext({
  onlineUsers: [],
  socket: null,
});

export default function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const token = getToken();
  const userId = getUserId();

  useEffect(() => {
    if (token) {
      const socket = openSocket('http://localhost:3000', {
        query: {
          userId,
        },
      });

      setSocket(socket);

      socket.on('online-users', (onlineIds) => {
        setOnlineUsers(Object.keys(onlineIds));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [token]);

  const ctx = {
    onlineUsers: onlineUsers,
    socket: socket,
  };
  return (
    <SocketContext.Provider value={ctx}>{children}</SocketContext.Provider>
  );
}
