import SignupForm from '../components/Auth/SignupForm';
import classes from './AuthPage.module.css';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/validateInput';
import { json, redirect } from 'react-router-dom';
export default function SignupPage() {
  return (
    <div className={classes.authPage}>
      <SignupForm />
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const submitData = {
    email: data.get('email'),
    username: data.get('username'),
    password: data.get('password'),
    confirmedPassword: data.get('confirmed-password'),
  };

  const emailIsValid = validateEmail(submitData.email);
  const usernameIsValid = validateUsername(submitData.username);
  const passwordIsValid = validatePassword(
    submitData.password,
    submitData.confirmedPassword
  );

  if (!emailIsValid || !passwordIsValid || !usernameIsValid) {
    return { emailIsValid, passwordIsValid, usernameIsValid };
  }

  const response = await fetch('http://localhost:3000/auth/signup', {
    method: request.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submitData),
  });

  if (!response.ok) {
    console.log(response);
    // throw json({ message: response.message }, { status: 500 });
    return response;
  }
  console.log(response);
  return redirect('/auth/login');
}
