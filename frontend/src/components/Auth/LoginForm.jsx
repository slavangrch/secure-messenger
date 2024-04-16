import { BsSlashSquare } from 'react-icons/bs';
import classes from './FormStyle.module.css';
import { Link, Form, useActionData } from 'react-router-dom';
export default function LoginForm() {
  const data = useActionData();
  return (
    <Form method="post" action="/auth/login" className={classes.form}>
      <h1>Login</h1>
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
      <button className={classes.btn}>Login</button>
      <div className={classes.lineContainer}>
        <div className={classes.line}></div>
        <p>or</p>
      </div>
      <p>
        Not registered yet? <Link to="/auth/signup">Create an account</Link>
      </p>
    </Form>
  );
}
