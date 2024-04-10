import SearchPanel from './SearchPanel';
import classes from './Sidebar.module.css';
import UserChat from './UserChat';

export default function Sidebar() {
  return (
    <div className={classes.sidebarContainer}>
      <SearchPanel></SearchPanel>
      <div className={classes.chats}>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
        <UserChat></UserChat>
      </div>
    </div>
  );
}
