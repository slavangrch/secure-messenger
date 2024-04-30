import { useEffect, useState } from 'react';
import ProfileImage from '../../images/profile-image.png';
import classes from './SettingsBar.module.css';
import { getToken } from '../../utils/localStorageManipulation';

export default function UserPic() {
  const [userInfo, setUserInfo] = useState();
  const token = getToken();
  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch(
        `http://localhost:3000/users/getLoggedUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUserInfo(data.user);
    }
    getUserInfo();
  }, [token]);
  return (
    <img
      src={
        userInfo && userInfo.imageUrl
          ? `http://localhost:3000/${userInfo.imageUrl}`
          : ProfileImage
      }
      className={classes.userPic}
      alt=""
    />
  );
}
