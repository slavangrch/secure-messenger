import ChatImage from '../../images/profile-image.png';
import classes from '../MainChat/ChatInfo.module.css';
export default function ChatInfo() {
  return (
    <div className={classes.chatInfoWrapper}>
      <img src={ChatImage} alt="" />
      <p className={classes.name}>Ricky</p>
    </div>
  );
}
