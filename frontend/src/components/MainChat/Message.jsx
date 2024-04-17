import ProfileImage from '../../images/profile-image.png';
import classes from './Message.module.css';
export default function Message({ message }) {
  return (
    <div className={`${classes.messageWrapper} `}>
      <img src={ProfileImage} alt="" />
      <div className={classes.messageInfo}>
        <p className={classes.name}>Slava</p>
        <p className={classes.message}>{message.message}</p>
      </div>
    </div>
  );
}
