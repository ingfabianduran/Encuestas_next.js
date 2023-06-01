import { Fragment } from "react";
import { Grid, TextField, IconButton } from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ViewQuestions({ questions = [], updateQuestion, deleteQuestion }) {
  return (
    <Grid container sx={{
      marginTop: 1,
      paddingX: 2,
      paddingBottom: 2,
      border: "1px dashed grey",
      borderRadius: 3
    }}
      rowSpacing={1}>
      {
        questions.map((question, index) => (
          <Fragment key={index}>
            <Grid
              item
              display="flex"
              justifyContent="end"
              md={12}>
              <IconButton
                aria-label="Update field"
                sx={{ color: "#BD77CE" }}
                onClick={() => updateQuestion(question.indexSection, index)}>
                <SettingsSuggestIcon />
              </IconButton>
              <IconButton
                aria-label="Delete field"
                sx={{ color: "#D14A4A" }}
                onClick={() => deleteQuestion(question.indexSection, index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item md={12}>
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
          </Fragment>
        ))
      }
    </Grid>
  )
}