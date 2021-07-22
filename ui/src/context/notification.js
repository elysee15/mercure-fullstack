import React from "react";

const NotificationContext = React.createContext();

const NotificationProvider = (props) => {
  const counter = React.useState(0);

  return <NotificationContext.Provider value={counter} {...props} />;
};

const useNotificationCounter = () => {
  const context = React.useContext(NotificationContext);

  if (!context) {
    throw new ErrorEvent(
      `useNotificationCounter should be used within a NotificationProvider`
    );
  }
  return context;
};

export { useNotificationCounter, NotificationProvider };
