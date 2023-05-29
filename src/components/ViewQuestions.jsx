import { Grid, TextField } from "@mui/material";

export default function ViewQuestions({ questions = [] }) {
  return (
    <form autoComplete="off">
      <Grid container>
        {
          questions.map((question, index) => (
            <Grid item md={12}>
              <TextField
                fullWidth
                label="Nombre del label"
                variant="filled" />
            </Grid>
          ))
        }
      </Grid>
    </form>
  )
}