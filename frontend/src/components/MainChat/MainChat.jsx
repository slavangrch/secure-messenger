import ChatInfo from './ChatInfo';
import classes from '../MainChat/MainChat.module.css';
import Message from './Message';
import InputMessage from './InputMessage';
import { useContext, useEffect, useState, useRef } from 'react';
import { UsersContext } from '../../store/users-context';
import { getPrivateKey, getToken } from '../../utils/localStorageManipulation';
import { SocketContext } from '../../store/socket-context';
import { generateSharedKey } from '../../security/sharedKey';
import { decryptMessage } from '../../security/decryptMessage';

export default function MainChat() {
  const ctx = useContext(UsersContext);
  const { socket } = useContext(SocketContext);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [receiverPublicKey, setReceiverPublicKey] = useState('');
  const [sharedKey, setSharedKey] = useState();
  const token = getToken();
  const [privateKey, setPrivateKey] = useState(getPrivateKey());

  // const decryptedMessagee = await decryptMessage(message, sharedKey );
  // async function decryptSingle(message) {
  //   con
  // }
  useEffect(() => {
    async function getMessages() {
      if (ctx.activeUser._id) {
        const response = await fetch(
          `http://localhost:3000/message/${ctx.activeUser._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const messages = await response.json();
        console.log(messages.chat);
        // const decryptedMessages = await decryptedMessages()
        setMessages(messages.chat);
      }
    }
    getMessages();
  }, [ctx.activeUser, token]);

  useEffect(() => {
    async function getReceiverPublicKey() {
      const response = await fetch(
        `http://localhost:3000/users/getPublicKey/${ctx.activeUser._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const receiverPublicKey = await response.json();
      if (receiverPublicKey.publicKey) {
        setReceiverPublicKey(JSON.parse(receiverPublicKey.publicKey));
      }
    }
    getReceiverPublicKey();
  }, [ctx.activeUser]);

  useEffect(() => {
    async function getSharedKey() {
      try {
        if (receiverPublicKey && privateKey) {
          console.log(receiverPublicKey);
          console.log(privateKey);
          const sharedKey = await generateSharedKey(
            receiverPublicKey,
            privateKey
          );
          console.log(sharedKey);
          setSharedKey(sharedKey);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSharedKey();
  }, [receiverPublicKey, privateKey]);

  useEffect(() => {
    if (socket) {
      socket.on('new-message', (message) => {
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
  function addMessage(message) {
    setMessages((prevMessagges) => {
      return [...prevMessagges, message];
    });
  }

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
              {messages.map((message) => {
                return (
                  <Message
                    sharedKey={sharedKey}
                    key={message._id}
                    message={message}
                  ></Message>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <p className={`${classes.messages} ${classes.fallbackText}`}>
              Send message to start chatting
            </p>
          )}

          <InputMessage
            sharedKey={sharedKey}
            onSend={addMessage}
          ></InputMessage>
        </>
      )}
    </div>
  );
}
