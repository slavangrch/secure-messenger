import classes from './FormStyle.module.css';
import { Link, Form, useActionData, useNavigation } from 'react-router-dom';
export default function LoginForm() {
  const data = useActionData();
  const navigation = useNavigation;
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Form method="post" action="/auth/login" className={classes.form}>
      <h1>Login</h1>
      <p className={classes.backendError}>
        {data && data.message ? data.message : null}
      </p>
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
          type="password"
          name="password"
          id="password"
          className={data && !data.passwordIsValid ? classes.invalid : ''}
        />
      </div>
      <button disabled={isSubmitting} className={classes.btn}>
        {isSubmitting ? 'Submitting...' : 'Login'}
      </button>
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
