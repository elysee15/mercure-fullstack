import React from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const userToken = window.localStorage.getItem("__TOKEN__");
  const userInfo = JSON.stringify(window.localStorage.getItem("__USER__"));

  const [currentUserState, setCurrentUserState] = React.useState({
    token: userToken,
    user: userInfo,
  });

  const isAuthenticated = () => {
    if (!currentUserState.token) {
      return false;
    }

    return true;
  };

  const value = { isAuthenticated, currentUserState, setCurrentUserState };
  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth should be used within a AuthProvider`);
  }
};

export default useAuth;
