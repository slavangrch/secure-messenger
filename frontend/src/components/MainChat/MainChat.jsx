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
  const [userInfo, setUserInfo] = useState();
  const [isSecret, setIsSecret] = useState(null);

  useEffect(() => {
    async function getReceiverPublicKey() {
      if (ctx.activeUser._id) {
        const response = await fetch(
          `http://localhost:3000/users/getPublicKey/${ctx.activeUser._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const receiverPublicKey = await response.json();
        if (receiverPublicKey.publicKey) {
          setReceiverPublicKey(JSON.parse(receiverPublicKey.publicKey));
        }
      }
    }
    getReceiverPublicKey();
  }, [ctx.activeUser]);

  useEffect(() => {
    async function getSharedKey() {
      try {
        if (receiverPublicKey && privateKey) {
          const sharedKey = await generateSharedKey(
            receiverPublicKey,
            privateKey
          );
          setSharedKey(sharedKey);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSharedKey();
  }, [receiverPublicKey, privateKey]);

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch(
        `http://localhost:3000/users/getLoggedUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUserInfo(data.user);
    }
    getUserInfo();
  }, [token]);

  useEffect(() => {
    async function getMessages() {
      if (ctx.activeUser._id) {
        const response = await fetch(
          `http://localhost:3000/message/${ctx.activeUser._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // if (!response.ok) {
        //   console.log('no messages found');
        // }
        const messages = await response.json();
        const isSecret = messages.isSecret;
        setIsSecret(isSecret);

        if (sharedKey) {
          if (messages.chat && messages.chat.length > 0) {
            const decryptedMessages = await Promise.all(
              messages.chat.map(async (message) => {
                let copiedMessage = { ...message };
                copiedMessage.message = await decryptMessage(
                  message.message,
                  sharedKey
                );
                return copiedMessage;
              })
            );
            setMessages(decryptedMessages);
          } else {
            setMessages(messages.chat);
          }
        }
      }
    }
    getMessages();
  }, [ctx.activeUser, token, sharedKey]);

  useEffect(() => {
    if (socket) {
      socket.on('new-message', async (message) => {
        if (ctx.activeUser._id === message.senderId) {
          const decryptedMessage = await decryptMessage(
            message.message,
            sharedKey
          );
          setMessages((prevMessages) => {
            const newMessages = [
              ...(prevMessages || []),
              { ...message, message: decryptedMessage },
            ];
            return newMessages;
          });
        }
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
    setMessages((prevMessages) => {
      if (Array.isArray(prevMessages)) {
        return [...prevMessages, message];
      } else {
        return [message];
      }
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
          <ChatInfo isSecretChat={isSecret}></ChatInfo>
          {messages && messages.length > 0 ? (
            <div className={classes.messages}>
              {messages.map((message) => {
                return (
                  <Message
                    userInfo={userInfo}
                    sharedKey={sharedKey}
                    key={message._id}
                    message={message}
                  ></Message>
                );
              })}
              <div id="messages-end" ref={messagesEndRef} />
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
