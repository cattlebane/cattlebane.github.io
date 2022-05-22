import { createContext } from "react";

const UserContext = createContext({
  setData: () => {},
  data: {},
});

export default UserContext;
