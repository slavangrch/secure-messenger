import classes from './Main.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import MainChat from '../components/MainChat/MainChat';
import {
  deleteDataFromStorage,
  getToken,
} from '../utils/localStorageManipulation';
import { UsersContext } from '../store/users-context';
import { redirect, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import SettingsBar from '../components/SettingsBar/SettingsBar';

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
        <SettingsBar></SettingsBar>
        <Sidebar></Sidebar>
        <MainChat></MainChat>
      </div>
    </UsersContext.Provider>
  );
}

export async function loader({ request }) {
  const token = getToken();
  if (token === 'Token is expired') {
    deleteDataFromStorage();

    return redirect('/auth/login');
  }
  if (!token) {
    return redirect('/auth/login');
  }
  const response = await fetch(`http://localhost:3000/users/`, {
    headers: {
      method: request.method,
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
