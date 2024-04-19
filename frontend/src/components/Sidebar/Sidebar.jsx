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
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(ctx.sidebarUsers.users);

  function findChats() {
    if (!search) {
      setUsers(ctx.sidebarUsers.users);
      return;
    }
    const filteredUsers = users.filter((user) =>
      user.username.startsWith(search)
    );
    setUsers(filteredUsers);
  }
  return (
    <div className={classes.sidebarContainer}>
      <SearchPanel
        search={search}
        setSearch={setSearch}
        findChats={findChats}
      ></SearchPanel>
      <div className={classes.chats}>
        {users &&
          users.map((user) => <UserChat key={user._id} user={user}></UserChat>)}
      </div>
    </div>
  );
}
