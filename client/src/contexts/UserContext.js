import React, { createContext, useReducer } from 'react';
export const UserContext = createContext();
export const userReducer = (state, action) => {
  switch (action.auth) {
    case true:
      return { user: action.payload };
    case false:
      return { user: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
