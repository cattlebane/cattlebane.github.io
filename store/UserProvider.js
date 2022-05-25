import { useState } from "react";
import UserContext from "./user-context";

const UserProvider = (props) => {
  const [data, setData] = useState(null);

  const setNewData = (newData) => {
    setData(newData);
  };

  return (
    <UserContext.Provider
      value={{
        setData: setNewData,
        data: data,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
