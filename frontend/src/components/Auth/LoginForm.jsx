import { BsSlashSquare } from 'react-icons/bs';
import classes from './FormStyle.module.css';
import { validateEmail, validatePassword } from '../../utils/validateInput';
import { useState } from 'react';
export default function LoginForm() {
  const [inputIsInvalid, setInputIsInvalid] = useState({
    email: false,
    password: false,
  });
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const emailIsValid = validateEmail(data.email);
    const passwordIsValid = validatePassword(data.password, null);

    if (!emailIsValid || !passwordIsValid) {
      setInputIsInvalid((prevState) => ({
        email: !emailIsValid,
        password: !passwordIsValid,
      }));
      return;
    }

    // Post data
    console.log(data);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className={classes.inputField}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          className={inputIsInvalid.email ? classes.invalid : ''}
        />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          className={inputIsInvalid.password ? classes.invalid : ''}
        />
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
