import classes from '../SettingsBar/SettingsBar.module.css';
import Logout from './Logout';
export default function SettingsBar() {
  return (
    <div className={classes.main}>
      <Logout></Logout>
    </div>
  );
}
