import { BsSlashSquare } from 'react-icons/bs';
import classes from '../Auth/FormStyle.module.css';
export default function SignupForm() {
  return (
    <form className={classes.form}>
      <h1>Sign up</h1>
      <div className={classes.inputField}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="confirm-password">Confirm password</label>
        <input type="text" name="confirm-password" id="password" />
      </div>
      <button className={classes.btn}>Sign up</button>
      <div className={classes.lineContainer}>
        <div className={classes.line}></div>
        <p>or</p>
      </div>
      <p>
        Already have an account? <a href="">Login</a>
      </p>
    </form>
  );
}
