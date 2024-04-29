import ProfileImage from '../../images/profile-image.png';
import classes from './SettingsBar.module.css';
export default function UserPic() {
  return <img src={ProfileImage} className={classes.userPic} alt="" />;
}
