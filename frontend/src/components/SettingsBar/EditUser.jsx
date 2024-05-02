import ProfileImage from '../../images/profile-image.png';
import { LuAsterisk } from 'react-icons/lu';
import classes from './EditUser.module.css';
import { useState } from 'react';
import { getFlag, getToken } from '../../utils/localStorageManipulation';
export default function EditUser({ onClose, userInfo, hideEditModal }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [image, setImage] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const token = getToken();
  const flag = getFlag();
  const toggleTooltip = () => {
    setShowTooltip((prevTooltip) => !prevTooltip);
  };

  const changeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const currentUserPic = userInfo.imageUrl
    ? `http://localhost:3000/${userInfo.imageUrl}`
    : ProfileImage;

  async function editUserHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch(`http://localhost:3000/users/editUser`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      setValidationError(error);
      return error;
    }

    const resData = await response.json();
    hideEditModal();
  }
  return (
    <div className={classes.editWrapper}>
      <h1>Edit profile</h1>
      <form onSubmit={editUserHandler}>
        <div className={classes.editPhotoWrapper}>
          <div>
            <h6>Profile photo</h6>
            <div className={classes.actionPicButtons}>
              <label htmlFor="file-upload" className={classes.customFileUpload}>
                Change
              </label>
              <input
                name="image"
                id="file-upload"
                type="file"
                accept="image/*"
                hidden
                onChange={changeImageHandler}
              />
              {/* <button onClick={deleteImageHandler}>Delete</button> */}
            </div>
          </div>
          <img
            className={classes.profilePic}
            src={image ? URL.createObjectURL(image) : currentUserPic}
            alt=""
          />
        </div>
        <div className={classes.line}></div>
        <div className={classes.errorMessage}>
          {validationError ? validationError.message : null}
        </div>
        <div className={classes.inputField}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder={userInfo.username}
          />
        </div>
        <div className={classes.inputField}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            disabled
            placeholder={userInfo.email}
          />
        </div>
        <div className={classes.inputField}>
          <label htmlFor="old-password">Old password</label>
          <input type="text" name="old-password" id="old-password" />
        </div>
        <div className={classes.inputField}>
          <label htmlFor="new-password">New password</label>
          <input type="text" name="new-password" id="new-password" />
        </div>
        {!flag && (
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
        )}
        <div className={classes.actionBtn}>
          <button onClick={onClose}>Cancel</button>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}
