import classes from '../MainChat/InputMessage.module.css';
import { BsSend } from 'react-icons/bs';
export default function InputMessage() {
  return (
    <>
      <div className={classes.wrapper}>
        <input type="text" placeholder="Message" />
        <div className={classes.sendBtn}>
          <BsSend className={classes.send} />
        </div>
      </div>
    </>
  );
}
