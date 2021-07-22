import React from "react";
import { Toast } from "react-bootstrap";

const ToasterContext = React.createContext();

export const ToasterProvider = (props) => {
  const value = [];

  return <ToasterContext.Provider value={value} {...props} />;
};

export const useToaster = () => {
  const context = React.useContext(ToasterProvider);

  if (!context) {
    throw new Error(`useToaster should be used within a ToasterProvider`);
  }
  return context;
};

export default function Toaster(props) {
  return (
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
  );
}
