import classes from './Main.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import MainChat from '../components/MainChat/MainChat';

export default function Main() {
  return (
    <div className={classes.container}>
      <Sidebar></Sidebar>
      <MainChat></MainChat>
    </div>
  );
}
