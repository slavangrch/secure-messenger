import { useContext, useEffect, useState } from 'react';
import classes from '../MainChat/ChatInfo.module.css';
import { UsersContext } from '../../store/users-context';
import ProfileImage from '../../images/profile-image.png';
import { CiUnlock } from 'react-icons/ci';
import { CiLock } from 'react-icons/ci';
import Modal from '../SettingsBar/Modal';
import { getFlag, getToken } from '../../utils/localStorageManipulation';
export default function ChatInfo({ isSecretChat }) {
  const ctx = useContext(UsersContext);
  const [isSecret, setIsSecret] = useState(isSecretChat);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const lock = isSecret ? <CiLock /> : <CiUnlock />;
  const token = getToken();
  const flag = getFlag();

  useEffect(() => {
    setIsSecret(isSecretChat);
  }, [isSecretChat]);

  async function postIsSecret(isSecretBoolean) {
    const response = await fetch(
      `http://localhost:3000/users/setChatIsSecret/${ctx.activeUser._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isSecret: isSecretBoolean }),
      }
    );
    const data = await response.json();
    setIsSecret(data.isSecret);
  }

  function setIsSecretHandler() {
    if (!isSecret) {
      setModalIsVisible(true);
    }
    if (isSecret) {
      postIsSecret(false);
    }
  }

  function onClose() {
    setModalIsVisible(false);
  }

  function confirmIsSecret() {
    postIsSecret(true);
    onClose();
  }

  return (
    <div className={classes.flexWrapper}>
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
      <div className={classes.iconLock} onClick={setIsSecretHandler}>
        {!flag && lock}
      </div>
      {modalIsVisible ? (
        <Modal>
          <div className={classes.confirmModal}>
            <h4>Make Chat Secret</h4>
            <p>Are you sure you want to make this chat secret?</p>
            <p>
              By making this chat secret, it will not be accessible with a fake
              password. If you enter the fake password during login, this chat
              will be deleted.
            </p>
            <div className={classes.actionButtons}>
              <button onClick={onClose}>Cancel</button>
              <button onClick={confirmIsSecret}>Confirm</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
