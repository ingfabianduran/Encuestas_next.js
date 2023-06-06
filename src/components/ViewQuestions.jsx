import { Fragment } from "react";
import { Grid, TextField, MenuItem, IconButton, InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DeleteIcon from "@mui/icons-material/Delete";
import { TimePicker } from "@mui/x-date-pickers";

export default function ViewQuestions({ questions = [], updateQuestion, deleteQuestion }) {
  const TYPES_QUESTIONS_BY_TEXT_FIELD = ["informativo", "simple", "larga", "numerico", "unica", "moneda"];

  const getTypeTextField = (typeQuestion) => {
    if (typeQuestion === "numerico") return "number";
    if (typeQuestion === "email") return "email";
    return "text";
  };

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
                TYPES_QUESTIONS_BY_TEXT_FIELD.includes(question.typeQuestion) && (
                  <TextField
                    select={question.typeQuestion === "unica" ? true : false}
                    fullWidth
                    type={getTypeTextField(question.typeQuestion)}
                    label={question.questionText}
                    value={question.typeQuestion === "informativo" ? question.textInformation : ""}
                    variant="filled"
                    disabled={question.typeQuestion === "informativo" ? true : false}
                    multiline={question.typeQuestion === "informativo" || question.typeQuestion === "larga" ? true : false}
                    InputProps={{
                      startAdornment: question.typeQuestion === "moneda" && <InputAdornment position="start">$</InputAdornment>
                    }}>
                    {
                      question.options.map((option, index) => (
                        <MenuItem key={index} value={option.text}>{option.text}</MenuItem>
                      ))
                    }
                  </TextField>
                )
              }
              {
                question.typeQuestion === "tiempo" && (
                  <TimePicker
                    label={question.questionText}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'filled'
                      }
                    }} />
                )
              }
              {
                question.typeQuestion === "radio" && (
                  <FormControl>
                    <FormLabel id="radio-button-question">{question.questionText}</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="radio-button-question">
                      {
                        question.options.map((option, index) => (
                          <FormControlLabel key={index} value={option.text} control={<Radio />} label={option.text} />
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                )
              }
            </Grid>
          </Fragment>
        ))
      }
    </Grid>
  )
}