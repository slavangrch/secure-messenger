import LoginForm from '../components/Auth/LoginForm';
import classes from './AuthPage.module.css';
export default function Login() {
  return (
    <div className={classes.authPage}>
      <LoginForm></LoginForm>
    </div>
  );
}
