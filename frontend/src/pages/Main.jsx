import classes from './Main.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import MainChat from '../components/MainChat/MainChat';
import { getToken } from '../utils/localStorageManipulation';
import { UsersContext } from '../store/users-context';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

export default function Main() {
  const sidebarUsers = useLoaderData();
  const [activeChat, setActiveChat] = useState({});
  function selectChatHandler(user) {
    setActiveChat(user);
  }
  const ctx = {
    sidebarUsers: sidebarUsers,
    activeUser: activeChat,
    selectChatHandler: selectChatHandler,
  };
  return (
    <UsersContext.Provider value={ctx}>
      <div className={classes.container}>
        <Sidebar></Sidebar>
        <MainChat></MainChat>
      </div>
    </UsersContext.Provider>
  );
}

export async function loader({ request }) {
  const token = getToken();
  const response = await fetch(`http://localhost:3000/users/`, {
    headers: {
      method: request.method,
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
