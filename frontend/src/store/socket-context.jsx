import { useState, createContext, useEffect } from 'react';
import { getToken } from '../utils/localStorageManipulation';
import openSocket from 'socket.io-client';

export const SocketContext = createContext({
  onlineUsers: [],
  socket: null,
});

export default function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const token = getToken();

  useEffect(() => {
    if (token) {
      const socket = openSocket('http://localhost:3000');
      setSocket(socket);
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [token]);
  return (
    <SocketContext.Provider value={(socket, onlineUsers)}>
      {children}
    </SocketContext.Provider>
  );
}
