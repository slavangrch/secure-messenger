import ChatInfo from './ChatInfo';
import classes from '../MainChat/MainChat.module.css';
import Message from './Message';
import InputMessage from './InputMessage';
import { useContext, useEffect, useState, useRef } from 'react';
import { UsersContext } from '../../store/users-context';
import { getToken } from '../../utils/localStorageManipulation';
import { SocketContext } from '../../store/socket-context';

export default function MainChat() {
  const ctx = useContext(UsersContext);
  const { socket } = useContext(SocketContext);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const token = getToken();
  useEffect(() => {
    async function getMessages() {
      if (ctx.activeUser._id) {
        const response = await fetch(
          `http://localhost:3000/message/${ctx.activeUser._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const messages = await response.json();
        setMessages(messages.chat);
      }
    }
    getMessages();
  }, [ctx.activeUser, token]);

  useEffect(() => {
    if (socket) {
      socket.on('new-message', (message) => {
        console.log('listener');
        setMessages((prevMessagges) => {
          return [...prevMessagges, message];
        });
      });
    }
    return () => socket?.off('new-message');
  }, [socket, messages, setMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages, ctx.activeUser]);

  return (
    <div className={classes.mainPage}>
      {!ctx.activeUser._id ? (
        <p className={`${classes.messages} ${classes.fallbackText}`}>
          Select chat to start chatting
        </p>
      ) : (
        <>
          <ChatInfo></ChatInfo>
          {messages && messages.length > 0 ? (
            <div className={classes.messages}>
              {messages.map((message) => (
                <Message key={message._id} message={message}></Message>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <p className={`${classes.messages} ${classes.fallbackText}`}>
              Send message to start chatting
            </p>
          )}

          <InputMessage></InputMessage>
        </>
      )}
    </div>
  );
}
