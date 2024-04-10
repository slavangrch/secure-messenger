import { BsSlashSquare } from 'react-icons/bs';
import classes from './FormStyle.module.css';
export default function LoginForm() {
  return (
    <form className={classes.form}>
      <h1>Login</h1>
      <div className={classes.inputField}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" />
      </div>
      <button className={classes.btn}>Login</button>
      <div className={classes.lineContainer}>
        <div className={classes.line}></div>
        <p>or</p>
      </div>
      <p>
        Not registered yet? <a href="">Create an account</a>
      </p>
    </form>
  );
}
