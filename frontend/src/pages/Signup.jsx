import SignupForm from '../components/Auth/SignupForm';
import classes from './AuthPage.module.css';
export default function Signup() {
  return (
    <div className={classes.authPage}>
      <SignupForm></SignupForm>
    </div>
  );
}
