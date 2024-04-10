import ProfileImage from '../../images/profile-image.png';
import classes from './Message.module.css';
export default function Message() {
  return (
    <div className={`${classes.messageWrapper} `}>
      <img src={ProfileImage} alt="" />
      <div className={classes.messageInfo}>
        <p className={classes.name}>Ricky</p>
        <p className={classes.message}>Hello world</p>
      </div>
    </div>
  );
}
