import Swal from "sweetalert2";

export const showAlert = (title = "Correcto", text = "Registro creado con exito", icon = "success", showConfirmButton = false) => {
  return Swal.fire({
    title,
    text,
    icon,
    showConfirmButton
  });
};