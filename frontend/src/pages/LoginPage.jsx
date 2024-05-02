import LoginForm from '../components/Auth/LoginForm';
import classes from './AuthPage.module.css';
import { validateEmail, validatePassword } from '../utils/validateInput';
import {
  getPrivateKey,
  getPublicKey,
  storeData,
} from '../utils/localStorageManipulation';
import { redirect } from 'react-router-dom';
import { generateKeyPair } from '../security/keyPairGeneration';

// import * as openpgp from 'openpgp';
// import { generateKeyPair } from '../security/keyPairGeneration';

export default function LoginPage() {
  return (
    <div className={classes.authPage}>
      <LoginForm />
    </div>
  );
}

export async function action({ request }) {
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
  let privateKeyJwk;
  let publicKeyJwk;
  try {
    privateKeyJwk = getPrivateKey();
    publicKeyJwk = getPublicKey();
    if (!privateKeyJwk || !publicKeyJwk) {
      ({ publicKeyJwk, privateKeyJwk } = await generateKeyPair());
      console.log(publicKeyJwk, privateKeyJwk);
    }
  } catch (error) {
    console.log(error);
  }

  const response = await fetch('http://localhost:3000/auth/login', {
    method: request.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      submitData,
      publicKeyJwk: JSON.stringify(publicKeyJwk),
    }),
  });

  if (!response.ok) {
    return response;
  }

  const resultData = await response.json();
  const { userId, token, isFake } = resultData;

  storeData(userId, token);
  localStorage.setItem('privateKey', JSON.stringify(privateKeyJwk));
  localStorage.setItem('publicKey', JSON.stringify(publicKeyJwk));
  localStorage.setItem('flag', isFake);
  const expiration = new Date();
  expiration.setTime(expiration.getTime() + 7 * 24 * 60 * 60 * 1000);
  localStorage.setItem('tokenExpiration', expiration.toISOString());
  return redirect('/user');
}
