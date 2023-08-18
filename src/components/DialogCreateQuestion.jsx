import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Button,
  IconButton
} from "@mui/material";
import { useFormik, FormikProvider, FieldArray } from "formik";
import { Fragment, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { v4 as uuidv4 } from "uuid";
import { QUESTION_SCHEMA } from "../validators/question";

export default function DialogCreateQuestion({ openDialogCreateQuestion, closeDialogQuestion, typeQuestion, listSections, addQuestionToSurvey, data = null }) {
  const formik = useFormik({
    initialValues: {
      type: typeQuestion,
      questionText: '',
      textInformation: '',
      isMandatory: 0,
      hasTooltip: 0,
      textTooltip: '',
      options: [{
        id: '',
        text: '',
      }],
      indexSection: '',
      key: ''
    },
    enableReinitialize: true,
    validationSchema: QUESTION_SCHEMA,
    onSubmit: (values, { resetForm }) => {
      if (data) {
        const setTypeQuestion = { ...values, typeQuestion };
        addQuestionToSurvey(setTypeQuestion, data);
      } else {
        const setTypeQuestion = { ...values, typeQuestion, key: uuidv4() };
        addQuestionToSurvey(setTypeQuestion, data);
      }
      resetForm();
    }
  });

  /**
    * @author Fabian Duran
    * @description Valida si la pregunta seleccionada de la encuesta va a ser editada con el fin de precargar los datos sobre el formulario. 
  */
  useEffect(() => {
    if (data !== null) formik.setValues(data);
  }, [data]);

  return (
    <Dialog
      open={openDialogCreateQuestion}
      onClose={closeDialogQuestion}
      maxWidth="sm"
      fullWidth>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <DialogTitle>Herramientas de edición</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <TextField
                fullWidth
                id="questionText"
                name="questionText"
                label="Pregunta"
                value={formik.values.questionText}
                onChange={formik.handleChange}
                variant="filled"
                error={Boolean(formik.errors.questionText) && formik.touched.questionText}
                helperText={formik.touched.questionText && formik.errors.questionText} />
            </Grid>
            {
              typeQuestion === "informativo" && (
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    id="textInformation"
                    name="textInformation"
                    label="Texto informativo"
                    value={formik.values.textInformation}
                    onChange={formik.handleChange}
                    variant="filled"
                    multiline
                    error={Boolean(formik.errors.textInformation) && formik.touched.textInformation}
                    helperText={formik.touched.textInformation && formik.errors.textInformation} />
                </Grid>
              )
            }
            {
              typeQuestion !== "informativo" && (
                <>
                  <Grid item md={12}>
                    <FormControl>
                      <FormLabel id="isMandatory">¿El campo es obligatorio?</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="isMandatory"
                        name="isMandatory"
                        value={formik.values.isMandatory}
                        onChange={formik.handleChange}>
                        <FormControlLabel value={0} control={<Radio />} label="Si" />
                        <FormControlLabel value={1} control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <FormControl>
                      <FormLabel id="hasTooltip">¿El campo tiene tooltip?</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="hasTooltip"
                        name="hasTooltip"
                        value={formik.values.hasTooltip}
                        onChange={formik.handleChange}>
                        <FormControlLabel value={1} control={<Radio />} label="Si" />
                        <FormControlLabel value={0} control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {
                    formik.values.hasTooltip === "1" && (
                      <Grid item md={12}>
                        <TextField
                          fullWidth
                          id="textTooltip"
                          name="textTooltip"
                          label="Texto del tooltip"
                          value={formik.values.textTooltip}
                          onChange={formik.handleChange}
                          variant="filled"
                          error={Boolean(formik.errors.textTooltip) && formik.touched.textTooltip}
                          helperText={formik.touched.textTooltip && formik.errors.textTooltip} />
                      </Grid>
                    )
                  }
                </>
              )
            }
            {
              typeQuestion === "unica" || typeQuestion === "radio" ? (
                <FormikProvider value={formik}>
                  <FieldArray
                    name="options"
                    render={(arrayHelpers) => (
                      <>
                        {formik.values.options.map((_, index) => (
                          <Fragment key={index}>
                            <Grid item md={11}>
                              <TextField
                                fullWidth
                                id={`options[${index}].text`}
                                name={`options[${index}].text`}
                                label={`Opción ${index + 1}`}
                                value={formik.values.options[index].text}
                                onChange={formik.handleChange}
                                variant="filled"
                                error={Boolean(formik.errors.options?.[index]?.text) && formik.touched.options?.[index]?.text}
                                helperText={formik.touched.options?.[index]?.text && formik.errors.options?.[index]?.text} />
                            </Grid>
                            <Grid item md={1}>
                              <IconButton onClick={() =>
                                index === 0 ?
                                  arrayHelpers.push({ id: index, text: '' })
                                  :
                                  arrayHelpers.remove(index)}>
                                {
                                  index === 0 ? (
                                    <AddCircleOutlineIcon sx={{ color: "#8192A2" }} />
                                  ) : (
                                    <DeleteOutlineIcon sx={{ color: "#E2001A" }} />
                                  )
                                }
                              </IconButton>
                            </Grid>
                          </Fragment>
                        ))}
                      </>
                    )}>
                  </FieldArray>
                </FormikProvider>
              ) : null
            }
            <Grid item md={12}>
              <TextField
                fullWidth
                label="Sección de la encuesta"
                id="indexSection"
                name="indexSection"
                variant="filled"
                select
                value={formik.values.indexSection}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.indexSection) && formik.touched.indexSection}
                helperText={formik.touched.indexSection && formik.errors.indexSection}>
                {
                  listSections.map((item, index) => (
                    <MenuItem key={index} value={index}>{item.title}</MenuItem>
                  ))
                }
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" variant="outlined" size="large" onClick={closeDialogQuestion}>Cancelar</Button>
          <Button type="submit" variant="contained" size="large">Guardar configuración del campo</Button>
        </DialogActions>
      </form>
    </Dialog >
  )
}