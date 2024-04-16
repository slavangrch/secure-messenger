import LoginForm from '../components/Auth/LoginForm';
import classes from './AuthPage.module.css';
import { validateEmail, validatePassword } from '../utils/validateInput';
export default function LoginPage() {
  return (
    <div className={classes.authPage}>
      <LoginForm />
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const emailIsValid = validateEmail(authData.email);
  const passwordIsValid = validatePassword(authData.password, null);
  console.log(authData);

  if (!emailIsValid || !passwordIsValid) {
    return { emailIsValid, passwordIsValid };
  }
}
