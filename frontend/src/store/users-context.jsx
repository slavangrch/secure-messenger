import { createContext } from 'react';

export const UsersContext = createContext({
  sidebarUsers: [],
  activeUser: {},
  selectChatHandler: () => {},
});
