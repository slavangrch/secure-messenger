import { getToken } from '../../utils/localStorageManipulation';
import classes from '../SettingsBar/SettingsBar.module.css';
import EditUser from './EditUser';
import Logout from './Logout';
import Modal from './Modal';
import Settings from './Settings';
import UserPic from './UserPic';
import { useState, useEffect } from 'react';
export default function SettingsBar() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const token = getToken();

  function hideEditModal() {
    setModalIsVisible(false);
  }
  function openEditModal() {
    setModalIsVisible(true);
  }

  useEffect(() => {
    async function getUserInfo() {
      if (modalIsVisible) {
        const response = await fetch(
          `http://localhost:3000/users/getEditUser`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setUserInfo(data.user);
      }
    }
    getUserInfo();
  }, [token, modalIsVisible]);
  return (
    <div className={classes.main}>
      <UserPic></UserPic>
      {modalIsVisible ? (
        <Modal onClose={hideEditModal}>
          <EditUser
            hideEditModal={hideEditModal}
            userInfo={userInfo}
            onClose={hideEditModal}
          ></EditUser>
        </Modal>
      ) : null}
      <Settings onOpen={openEditModal}></Settings>
      <Logout></Logout>
    </div>
  );
}
