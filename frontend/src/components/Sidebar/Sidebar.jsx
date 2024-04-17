import { useEffect } from 'react';
import SearchPanel from './SearchPanel';
import classes from './Sidebar.module.css';
import UserChat from './UserChat';
import { useState } from 'react';
import { getToken } from '../../utils/localStorageManipulation';
import { useLoaderData } from 'react-router-dom';

export default function Sidebar() {
  const sidebarUsers = useLoaderData('main');
  console.log(sidebarUsers);

  return (
    <div className={classes.sidebarContainer}>
      <SearchPanel></SearchPanel>
      <div className={classes.chats}>
        {sidebarUsers.users.map((user) => (
          <UserChat key={user._id} user={user}></UserChat>
        ))}
      </div>
    </div>
  );
}
