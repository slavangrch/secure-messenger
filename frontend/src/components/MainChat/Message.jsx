import { useContext } from 'react';
import ProfileImage from '../../images/profile-image.png';
import classes from './Message.module.css';
import { UsersContext } from '../../store/users-context';
import formatTime from '../../utils/timeFormatter';

export default function Message({ message, userInfo }) {
  const ctx = useContext(UsersContext);
  const receiver = ctx.activeUser;
  const time = formatTime(message.createdAt);
  const messageFromOwner = message.receiverId === receiver._id;
  const receiverPic = receiver.imagePath
    ? `http://localhost:3000/${receiver.imagePath}`
    : ProfileImage;
  const senderPic = userInfo?.imagePath
    ? `http://localhost:3000/${userInfo.imagePath}`
    : ProfileImage;

  return (
    <div
      className={
        messageFromOwner
          ? `${classes.messageWrapper} ${classes.sender}`
          : `${classes.messageWrapper}`
      }
    >
      <img src={messageFromOwner ? senderPic : receiverPic} alt="" />
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
