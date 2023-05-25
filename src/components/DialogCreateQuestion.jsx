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
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import { useFormik } from "formik";

export default function DialogCreateQuestion({ openDialogCreateQuestion, closeDialogQuestion, typeQuestion, listSections, addQuestionToSurvey }) {
  const formik = useFormik({
    initialValues: {
      questionText: '',
      isMandatory: 0,
      hasTooltip: 0,
      options: [{
        id: '',
        text: '',
      }],
      indexSection: ''
    },
    onSubmit: (values) => {
      console.log('Submit create question', values);
      addQuestionToSurvey(values);
    }
  });

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
                variant="filled" />
            </Grid>
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
                  <FormControlLabel value={0} control={<Radio />} label="Si" />
                  <FormControlLabel value={1} control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="indexSection">Sección de la encuesta</InputLabel>
                <Select
                  id="indexSection"
                  name="indexSection"
                  value={formik.values.indexSection}
                  onChange={formik.handleChange}>
                  {
                    listSections.map((item, index) => (
                      <MenuItem key={index} value={index}>{item.title}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" variant="outlined" size="large" onClick={closeDialogQuestion}>Cancelar</Button>
          <Button type="submit" variant="contained" size="large">Guardar configuración del campo</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}