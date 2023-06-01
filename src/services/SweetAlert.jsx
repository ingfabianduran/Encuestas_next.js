import Swal from "sweetalert2";

/**
  * @author Fabian Duran
  * @description Retorna una instancia de Swal para ser llamada sobre la vista. 
  * @param title Titulo de la alerta.
  * @param text Texto o mensaje de la alerta.
  * @param icon Imagen principal.
  * @param showConfirmButton Muestra u oculta el boton de OK. 
*/
export const showAlert = ({ title = "Correcto", text = "Registro creado con exito", icon = "success", showConfirmButton = false }) => {
  return Swal.fire({
    title,
    text,
    icon,
    showConfirmButton
  });
};

export const showAlertConfirm = ({ title = "¿Esta seguro?", text = "¿De continuar con la gestión?", icon = "warning", confirmButtonText = "Si", cancelButtonText = "No" }) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText
  });
};