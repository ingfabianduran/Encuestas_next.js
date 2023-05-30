import { Grid, TextField } from "@mui/material";

export default function ViewQuestions({ questions = [] }) {
  return (
    <Grid container sx={{ marginTop: 1, padding: 3, border: "1px dashed grey" }}
      rowSpacing={2}>
      {
        questions.map((question, index) => (
          <Grid key={index} item md={12}>
            {
              question.typeQuestion === "informativo" && (
                <TextField
                  fullWidth
                  label={question.questionText}
                  value={question.textInformation}
                  variant="filled"
                  disabled={true}
                  multiline />
              )
            }
          </Grid>
        ))
      }
    </Grid>
  )
}