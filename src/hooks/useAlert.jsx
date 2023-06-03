import { useState } from 'react';

/**
  * @author Fabian Duran
  * @description Hook que permite gestionar los snackbar. 
*/
export default function useAlert() {
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    title: "",
    message: ""
  });

  const showAlert = ({ type = "success", title = "¡Excelente!", message }) => {
    const setShowAlert = { ...alert, show: true, type, title, message };
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