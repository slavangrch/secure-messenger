import SignupForm from '../components/Auth/SignupForm';
import classes from './AuthPage.module.css';
import { validateEmail, validatePassword } from '../utils/validateInput';
export default function SigninPage() {
  return (
    <div className={classes.authPage}>
      <SignupForm />
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    confirmedPassword: data.get('confirmed-password'),
  };

  const emailIsValid = validateEmail(authData.email);
  const passwordIsValid = validatePassword(
    authData.password,
    authData.confirmedPassword
  );
  console.log(authData);

  if (!emailIsValid || !passwordIsValid) {
    return { emailIsValid, passwordIsValid };
  }
}
