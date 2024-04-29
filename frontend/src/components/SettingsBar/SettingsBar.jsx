import classes from '../SettingsBar/SettingsBar.module.css';
import EditUser from './EditUser';
import Logout from './Logout';
import Modal from './Modal';
import Settings from './Settings';
import UserPic from './UserPic';
import { useState } from 'react';
export default function SettingsBar() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function hideEditModal() {
    setModalIsVisible(false);
  }
  function openEditModal() {
    setModalIsVisible(true);
  }
  return (
    <div className={classes.main}>
      <UserPic></UserPic>
      {modalIsVisible ? (
        <Modal onClose={hideEditModal}>
          <EditUser onClose={hideEditModal}></EditUser>
        </Modal>
      ) : null}
      <Settings onOpen={openEditModal}></Settings>
      <Logout></Logout>
    </div>
  );
}
