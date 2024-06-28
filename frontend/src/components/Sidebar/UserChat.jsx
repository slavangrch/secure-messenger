import { useContext } from 'react';
import ProfileImage from '../../images/profile-image.png';
import classes from './UserChat.module.css';
import { UsersContext } from '../../store/users-context';
import { SocketContext } from '../../store/socket-context';
export default function UserChat({ user }) {
  const { activeUser, selectChatHandler } = useContext(UsersContext);
  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.find((userId) => userId === user._id);
  return (
    <div
      className={`${classes.userChatContainer} 
      ${activeUser._id === user._id ? classes.selected : ''} 
        `}
      onClick={() => selectChatHandler(user)}
    >
      <div className={classes.imageContainer}>
        <img
          src={
            user.imagePath
              ? `http://localhost:3000/${user.imagePath}`
              : ProfileImage
          }
          alt=""
        />
        <div className={isOnline ? classes.online : null}></div>
      </div>
      <div className={classes.userInfo}>
        <p className={classes.name}>{user.username}</p>
        {/* <p className={classes.lastMessage}></p> */}
      </div>
    </div>
  );
}
