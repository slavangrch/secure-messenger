import { createContext } from 'react';

export const UsersContext = createContext({
  sidebarUsers: [],
  activeUseIid: '',
  selectChatHandler: () => {},
});
