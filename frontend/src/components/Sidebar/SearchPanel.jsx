import { useContext, useState } from 'react';
import classes from './SearchPanel.module.css';
import { BiSearch } from 'react-icons/bi';
import { UsersContext } from '../../store/users-context';

export default function SearchPanel({ search, setSearch, findChats }) {
  return (
    <>
      <div className={classes.search}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <BiSearch className={classes.icon} onClick={findChats} />
      </div>
    </>
  );
}
