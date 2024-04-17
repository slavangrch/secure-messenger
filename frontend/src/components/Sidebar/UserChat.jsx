import { useState } from 'react';
import ProfileImage from '../../images/profile-image.png';
import classes from './UserChat.module.css';
import { useContext } from 'react';
import { UsersContext } from '../../store/users-context';
export default function UserChat({ user }) {
  const { activeUserId, selectChatHandler } = useContext(UsersContext);
  return (
    <div
      className={`${classes.userChatContainer} 
      ${activeUserId === user._id ? classes.selected : ''} 
        `}
      onClick={() => selectChatHandler(user._id)}
    >
      <img src={ProfileImage} alt="" />
      <div className={classes.userInfo}>
        <p className={classes.name}>{user.username}</p>
        {/* <p className={classes.lastMessage}></p> */}
      </div>
    </div>
  );
}
