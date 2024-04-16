// import { BsSlashSquare } from 'react-icons/bs';
import classes from '../Auth/FormStyle.module.css';
import { Link, Form, useActionData } from 'react-router-dom';

export default function SignupForm() {
  const data = useActionData();
  return (
    <Form method="post" action="/auth/signup" className={classes.form}>
      <h1>Sign up</h1>
      <div className={classes.inputField}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          className={data && !data.emailIsValid ? classes.invalid : ''}
        />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          className={data && !data.passwordIsValid ? classes.invalid : ''}
        />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="confirmed-password">Confirm password</label>
        <input
          type="text"
          name="confirmed-password"
          id="password"
          className={data && !data.passwordIsValid ? classes.invalid : ''}
        />
      </div>
      <button className={classes.btn}>Sign up</button>
      <div className={classes.lineContainer}>
        <div className={classes.line}></div>
        <p>or</p>
      </div>
      <p>
        Already have an account? <Link to="/auth?mode=login">Login</Link>
      </p>
    </Form>
  );
}
