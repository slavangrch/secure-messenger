import ProfileImage from '../../images/profile-image.png';
import { LuAsterisk } from 'react-icons/lu';
import classes from './EditUser.module.css';
import { useState, useEffect } from 'react';
export default function EditUser({ onClose }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip((prevTooltip) => !prevTooltip);
  };

  //   useEffect(() => {}, []);
  return (
    <div className={classes.editWrapper}>
      <h1>Edit profile</h1>
      <div className={classes.editPhotoWrapper}>
        <div>
          <h6>Profile photo</h6>
          <div className={classes.actionPicButtons}>
            <button>Change</button>
            <button>Delete</button>
          </div>
        </div>
        <img className={classes.profilePic} src={ProfileImage} alt="" />
      </div>
      <div className={classes.line}></div>
      <div className={classes.inputField}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" disabled />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="old-password">Old password</label>
        <input type="text" name="old-password" id="old-password" />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="new-password">New password</label>
        <input type="text" name="new-password" id="new-password" />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="fake-password">Fake password</label>
        <LuAsterisk
          className={classes.hint}
          onMouseEnter={toggleTooltip}
          onMouseLeave={toggleTooltip}
        />
        {showTooltip && (
          <div className={classes.tooltip}>
            Fake password is a special password that you can set for your
            account. Requiring a password adds an extra level of security,
            ensuring that only trusted individuals can access sensitive
            information. After entering the fake password during login, all
            secret chats will be deleted. Be careful during login!
          </div>
        )}
        <input type="text" name="fake-password" id="fake-password" />
      </div>
      <div className={classes.actionBtn}>
        <button onClick={onClose}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}
