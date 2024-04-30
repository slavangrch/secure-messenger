import { useContext } from 'react';
import ChatImage from '../../images/profile-image.png';
import classes from '../MainChat/ChatInfo.module.css';
import { UsersContext } from '../../store/users-context';
import ProfileImage from '../../images/profile-image.png';
export default function ChatInfo() {
  const ctx = useContext(UsersContext);
  return (
    <div className={classes.chatInfoWrapper}>
      <img
        src={
          ctx.activeUser.imageUrl
            ? `http://localhost:3000/${ctx.activeUser.imageUrl}`
            : ProfileImage
        }
        alt=""
      />
      <p className={classes.name}>{ctx.activeUser.username}</p>
    </div>
  );
}
