import { useContext, useEffect, useState } from 'react';
import ProfileImage from '../../images/profile-image.png';
import classes from './Message.module.css';
import { UsersContext } from '../../store/users-context';
import { getToken, getUserId } from '../../utils/localStorageManipulation';
import formatTime from '../../utils/timeFormatter';
import { decryptMessage } from '../../security/decryptMessage';
export default function Message({ message, sharedKey }) {
  const ctx = useContext(UsersContext);
  const receiver = ctx.activeUser;
  const time = formatTime(message.createdAt);
  const messageFromOwner = message.receiverId === receiver._id;
  // const [decMes, setDecMes] = useState('');
  // useEffect(() => {
  //   async function getDectypted() {
  //     const decryptedMessage = await decryptMessage(message.message, sharedKey);
  //     setDecMes(decryptedMessage);
  //   }
  //   getDectypted();
  // }, [message, sharedKey]);

  return (
    <div
      className={
        messageFromOwner
          ? `${classes.messageWrapper} ${classes.sender}`
          : `${classes.messageWrapper}`
      }
    >
      <img src={ProfileImage} alt="" />
      <div className={classes.messageInfo}>
        <div className={classes.wrapperNameDate}>
          <p className={classes.name}>
            {messageFromOwner ? 'You' : receiver.username}
          </p>
          <p className={classes.time}>{time}</p>
        </div>
        <p className={classes.message}>{message.message}</p>
      </div>
    </div>
  );
}
