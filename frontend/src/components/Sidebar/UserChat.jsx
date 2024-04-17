import ProfileImage from '../../images/profile-image.png';
import classes from './UserChat.module.css';
export default function UserChat({ user }) {
  return (
    <div className={`${classes.userChatContainer} `}>
      <img src={ProfileImage} alt="" />
      <div className={classes.userInfo}>
        <p className={classes.name}>{user.username}</p>
        {/* <p className={classes.lastMessage}></p> */}
      </div>
    </div>
  );
}
