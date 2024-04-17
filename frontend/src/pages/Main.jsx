import classes from './Main.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import MainChat from '../components/MainChat/MainChat';
import { getToken } from '../utils/localStorageManipulation';

export default function Main() {
  return (
    <div className={classes.container}>
      <Sidebar></Sidebar>
      <MainChat></MainChat>
    </div>
  );
}

export async function loader({ request }) {
  const token = getToken();
  console.log(`Bearer ${token}`);
  const response = await fetch(`http://localhost:3000/users/`, {
    headers: {
      method: request.method,
      Authorization: `Bearer ${token}`,
    },
  });
  // const data = await response.json();
  console.log(response);
  // console.log(data);
  return response;
}
