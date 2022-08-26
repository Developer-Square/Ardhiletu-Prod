import { createContext } from "react";

export const LoggedInUserContext = createContext({
  loggedInUser: '',
  changeUser: (user) => {},
});
