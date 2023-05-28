import { Snackbar, Alert, AlertTitle } from "@mui/material";

export default function AlertWithSnackbar({ alert = {}, hideAlert }) {
  return (
    <Snackbar
      open={alert.show}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={hideAlert}>
      <Alert severity={alert.type} onClose={hideAlert}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}