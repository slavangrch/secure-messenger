import ChatInfo from './ChatInfo';
import classes from '../MainChat/MainChat.module.css';
import Message from './Message';
import InputMessage from './InputMessage';
import { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../../store/users-context';
import { getToken } from '../../utils/localStorageManipulation';

export default function MainChat() {
  const ctx = useContext(UsersContext);
  const [messages, setMessages] = useState([]);
  const token = getToken();
  useEffect(() => {
    async function getMessages() {
      const response = await fetch(
        `http://localhost:3000/message/${ctx.activeUser._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const messages = await response.json();
      setMessages(messages.chat);
      console.log(messages.chat);
    }
    getMessages();
  }, [ctx, token]);
  return (
    <div className={classes.mainPage}>
      <ChatInfo></ChatInfo>

      {messages && messages.length > 0 ? (
        <div className={classes.messages}>
          {messages.map((message) => (
            <Message key={message._id} message={message}></Message>
          ))}
        </div>
      ) : (
        <p className={`${classes.messages} ${classes.fallbackText}`}>
          Send message to start chatting.
        </p>
      )}
    </div>
  );
}
