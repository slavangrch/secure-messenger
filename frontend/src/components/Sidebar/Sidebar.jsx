import { useEffect } from 'react';
import SearchPanel from './SearchPanel';
import classes from './Sidebar.module.css';
import UserChat from './UserChat';
import { useState } from 'react';
import { getToken } from '../../utils/localStorageManipulation';
import { useLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { UsersContext } from '../../store/users-context';

export default function Sidebar() {
  const ctx = useContext(UsersContext);
  return (
    <div className={classes.sidebarContainer}>
      <SearchPanel></SearchPanel>
      <div className={classes.chats}>
        {ctx.sidebarUsers.users.map((user) => (
          <UserChat key={user._id} user={user}></UserChat>
        ))}
      </div>
    </div>
  );
}
