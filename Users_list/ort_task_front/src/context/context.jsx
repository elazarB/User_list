import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
const [refresh, setRefresh] = useState(false)
const [IPAddress, setIPAddress] = useState('')

  return (
    <StateContext.Provider
      value={{
        refresh, setRefresh,
        IPAddress, setIPAddress,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
