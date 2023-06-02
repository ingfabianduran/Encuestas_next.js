import { useState } from 'react';

export default function useAlert() {
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    title: "",
    message: ""
  });

  const showAlert = ({ type = "success", title = "¡Excelente!", message }) => {
    const setShowAlert = { ...alert, type, title, message };
    setAlert(setShowAlert);
  };

  const hideAlert = () => {
    const setHideAlert = { ...alert, show: false };
    setAlert(setHideAlert);
  };

  return {
    alert,
    showAlert,
    hideAlert,
  };
}