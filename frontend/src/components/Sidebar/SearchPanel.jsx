import classes from './SearchPanel.module.css';
import { BiSearch } from 'react-icons/bi';

export default function SearchPanel() {
  return (
    <>
      <div className={classes.search}>
        <input type="text" placeholder="Search" />
        <BiSearch className={classes.icon} />
      </div>
    </>
  );
}
