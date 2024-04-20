import { useContext, useState } from 'react';
import classes from '../MainChat/InputMessage.module.css';
import { BsSend } from 'react-icons/bs';
import { UsersContext } from '../../store/users-context';
import { getToken } from '../../utils/localStorageManipulation';
export default function InputMessage() {
  const ctx = useContext(UsersContext);
  const token = getToken();
  const [message, setMessage] = useState('');
  const buttonIsDisabled = !ctx.activeUser._id || message.trim().length === 0;
  async function sendMessageHandler() {
    const response = await fetch(
      `http://localhost:3000/message/send/${ctx.activeUser._id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      }
    );
    const answer = await response.json();
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
