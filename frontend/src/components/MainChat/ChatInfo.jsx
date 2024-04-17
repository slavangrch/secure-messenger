import { useContext } from 'react';
import ChatImage from '../../images/profile-image.png';
import classes from '../MainChat/ChatInfo.module.css';
import { UsersContext } from '../../store/users-context';
export default function ChatInfo() {
  const ctx = useContext(UsersContext);
  return (
    <div className={classes.chatInfoWrapper}>
      <img src={ChatImage} alt="" />
      <p className={classes.name}>{ctx.activeUser.username}</p>
    </div>
  );
}
