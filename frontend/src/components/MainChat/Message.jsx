import { useContext } from 'react';
import ProfileImage from '../../images/profile-image.png';
import classes from './Message.module.css';
import { UsersContext } from '../../store/users-context';
import { getToken, getUserId } from '../../utils/localStorageManipulation';
export default function Message({ message }) {
  const ctx = useContext(UsersContext);
  const receiver = ctx.activeUser;
  // console.log(message);
  const messageFromOwner = message.receiverId === receiver._id;

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
        <p className={classes.name}>
          {messageFromOwner ? 'You' : receiver.username}
        </p>
        <p className={classes.message}>{message.message}</p>
      </div>
    </div>
  );
}
