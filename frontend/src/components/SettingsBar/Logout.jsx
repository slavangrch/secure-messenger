import { FiLogOut } from 'react-icons/fi';
import classes from '../SettingsBar/SettingsBar.module.css';
import { deleteDataFromStorage } from '../../utils/localStorageManipulation';

import { useNavigate } from 'react-router-dom';
export default function Logout() {
  const navigate = useNavigate();
  function logout() {
    deleteDataFromStorage();
    navigate('/auth/login');
  }
  return (
    <>
      <FiLogOut className={classes.iconLogout} onClick={logout} />
    </>
  );
}
