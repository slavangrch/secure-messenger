import LoginForm from '../components/Auth/LoginForm';
import classes from './AuthPage.module.css';
import { validateEmail, validatePassword } from '../utils/validateInput';
import { storeData } from '../utils/localStorageManipulation';
import { redirect, useNavigate } from 'react-router-dom';
export default function LoginPage() {
  return (
    <div className={classes.authPage}>
      <LoginForm />
    </div>
  );
}

export async function action({ request }) {
  // const navigate = useNavigate();
  const data = await request.formData();
  const submitData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const emailIsValid = validateEmail(submitData.email);
  const passwordIsValid = validatePassword(submitData.password, null);

  if (!emailIsValid || !passwordIsValid) {
    return { emailIsValid, passwordIsValid };
  }
  const response = await fetch('http://localhost:3000/auth/login', {
    method: request.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submitData),
  });

  if (!response.ok) {
    console.log(response);
    // throw json({ message: response.message }, { status: 500 });
    return response;
  }

  const resultData = await response.json();
  const { userId, token } = resultData;
  console.log(userId, token);
  storeData(userId, token);
  localStorage.setItem('tokenExpiration', 7 * 24 * 60 * 60 * 1000);
  return redirect('/user');
}
