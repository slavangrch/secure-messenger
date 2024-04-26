import { useContext, useState } from 'react';
import classes from '../MainChat/InputMessage.module.css';
import { BsSend } from 'react-icons/bs';
import { UsersContext } from '../../store/users-context';
import { getToken } from '../../utils/localStorageManipulation';
import { encryptMessage } from '../../security/encryptMessage';
export default function InputMessage({ onSend, sharedKey }) {
  const ctx = useContext(UsersContext);
  const token = getToken();
  const [message, setMessage] = useState('');
  const buttonIsDisabled = !ctx.activeUser._id || message.trim().length === 0;
  async function sendMessageHandler() {
    const encryptedMessage = await encryptMessage(message, sharedKey);
    console.log(encryptMessage);
    const response = await fetch(
      `http://localhost:3000/message/send/${ctx.activeUser._id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: encryptedMessage }),
      }
    );
    const answer = await response.json();
    console.log(answer);
    console.log(message);
    onSend({ ...answer.newMessage, message: message }); //, message: message
    setMessage('');
  }
  return (
    <>
      <div className={classes.wrapper}>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div
          className={classes.sendBtn}
          onClick={buttonIsDisabled ? null : sendMessageHandler}
        >
          <BsSend className={classes.send} />
        </div>
      </div>
    </>
  );
}
