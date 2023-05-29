import { Stack, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Divider, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormikProvider, FieldArray } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { MuiFileInput } from "mui-file-input";
import { WEEKDAYS, LAUNCH_OF_THE_SURVEY } from "../constantes/ValuesFormSurvey";
import ViewQuestions from "./ViewQuestions";

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
              {
                LAUNCH_OF_THE_SURVEY.map((item, index) => (
                  <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        {
          formik.values.launchSurvey === 1 || formik.values.launchSurvey === 3 ? (
            <Grid item md={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="daysOfPublication">Dias de publicación</InputLabel>
                <Select
                  id="daysOfPublication"
                  name="daysOfPublication"
                  value={formik.values.daysOfPublication}
                  onChange={formik.daysOfPublication}>
                  {
                    WEEKDAYS.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          ) : null
        }
        {
          formik.values.launchSurvey === 2 && (
            <>
              <Grid item md={4}>
                <DatePicker
                  label="Fecha inicio de la publicación"
                  value={formik.values.publicationStartDate}
                  onChange={(value) => formik.setFieldValue("publicationStartDate", value, true)}
                  slotProps={{
                    textField: {
                      variant: 'filled',
                      fullWidth: true
                    }
                  }} />
              </Grid>
              <Grid item md={4}>
                <DatePicker
                  label="Fecha fin de la publicación"
                  value={formik.values.publicationEndDate}
                  onChange={(value) => formik.setFieldValue("publicationEndDate", value, true)}
                  slotProps={{
                    textField: {
                      variant: 'filled',
                      fullWidth: true
                    }
                  }} />
              </Grid>
            </>
          )
        }
        {
          formik.values.launchSurvey === 3 && (
            <Grid item md={6}>
              <DatePicker
                label="Fecha de lanzamiento"
                value={formik.values.releaseDate}
                onChange={(value) => formik.setFieldValue("releaseDate", value, true)}
                slotProps={{
                  textField: {
                    variant: 'filled',
                    fullWidth: true
                  }
                }} />
            </Grid>
          )
        }
        <Grid item md={formik.values.launchSurvey === '' || formik.values.launchSurvey === 3 ? 12 : formik.values.launchSurvey === 2 ? 4 : 6}>
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
        {
          formik.values.publishSurveyTo === 2 && (
            <Grid item md={12}>
              <MuiFileInput
                fullWidth
                id="loadIdbase"
                name="loadIdbase"
                label="Cargar base de cédulas"
                value={formik.values.loadIdbase}
                onChange={formik.handleChange}
                variant="filled" />
            </Grid>
          )
        }
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
                      onClick={() => arrayHelpers.push({ title: '', description: '', fields: [] })}>
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