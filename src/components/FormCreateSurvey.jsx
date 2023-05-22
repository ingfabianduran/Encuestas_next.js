import { Stack, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Divider, Button, InputAdornment, } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { FormikProvider, FieldArray } from "formik";
import { DatePicker } from "@mui/x-date-pickers";

export default function FormCreateSurvey({ formik }) {
  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} mt={4}>
        <Grid item md={6}>
          <TextField
            fullWidth
            id="nameSurvey"
            name="nameSurvey"
            label="Nombre de la encuesta"
            value={formik.values.nameSurvey}
            onChange={formik.handleChange}
            variant="filled" />
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="launchSurvey">Lanzamiento de la encuesta</InputLabel>
            <Select
              id="launchSurvey"
              name="launchSurvey"
              value={formik.values.launchSurvey}
              onChange={formik.handleChange}>
              <MenuItem value={1}>Día especifico</MenuItem>
              <MenuItem value={2}>Rango de fechas</MenuItem>
              <MenuItem value={3}>Semanalmente</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <DatePicker
            label="Fecha de publicación"
            value={formik.values.publicationDate}
            onChange={(value) => formik.setFieldValue("publicationDate", value, true)}
            slotProps={{
              textField: {
                variant: 'filled',
                fullWidth: true
              }
            }} />
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="publishSurveyTo">Publicar encuesta a</InputLabel>
            <Select
              id="publishSurveyTo"
              name="publishSurveyTo"
              value={formik.values.publishSurveyTo}
              onChange={formik.handleChange}>
              <MenuItem value={1}>Todos los usuarios internos</MenuItem>
              <MenuItem value={2}>A cédulas en específico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <TextField
            fullWidth
            id="loadIdbase"
            name="loadIdbase"
            label="Cargar base de cédulas"
            value={formik.values.loadIdbase}
            onChange={formik.handleChange}
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <UploadIcon />
                </InputAdornment>
              ),
            }} />
        </Grid>
        <FormikProvider value={formik}>
          <FieldArray
            name="sections"
            render={(arrayHelpers) => (
              <>
                {formik.values.sections.map((_, index) => (
                  <Grid key={index} item md={12}>
                    {
                      index > 0 && (
                        <Stack direction="row" spacing={2} justifyContent="end">
                          <Button
                            type="button"
                            variant="outlined"
                            size="large"
                            color="error"
                            onClick={() => arrayHelpers.remove(index)}
                            endIcon={<DeleteIcon />}>
                            Eliminar sección
                          </Button>
                        </Stack>
                      )
                    }
                    <TextField
                      fullWidth
                      id={`sections[${index}].title`}
                      name={`sections[${index}].title`}
                      label="Título de la sección"
                      value={formik.values.sections[index].title}
                      onChange={formik.handleChange}
                      variant="filled"
                      margin="normal" />
                    <TextField
                      fullWidth
                      id={`sections[${index}].description`}
                      name={`sections[${index}].description`}
                      label="Descripción de la sección (Opcional)"
                      value={formik.values.sections[index].description}
                      onChange={formik.handleChange}
                      variant="filled"
                      margin="normal"
                      multiline />
                  </Grid>
                ))}
                <Grid item md={12}>
                  <Divider>
                    <Button
                      type="button"
                      variant="outlined"
                      size="large"
                      endIcon={<AddCircleOutlineIcon />}
                      onClick={() => arrayHelpers.push({ title: '', description: '' })}>
                      Nueva sección
                    </Button>
                  </Divider>
                </Grid>
              </>
            )}>
          </FieldArray>
        </FormikProvider>
        <Grid item md={12}>
          <Stack direction="row" spacing={2} justifyContent="end">
            <Button type="button" variant="outlined" size="large">Cancelar</Button>
            <Button type="submit" variant="contained" size="large">Crear encuesta</Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  )
}
