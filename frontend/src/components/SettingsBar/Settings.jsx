import { IoMdSettings } from 'react-icons/io';
import classes from './SettingsBar.module.css';

export default function Settings({ onOpen }) {
  return <IoMdSettings className={classes.iconSettings} onClick={onOpen} />;
}
