import { useState } from "react";
import { Stack, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Divider, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormikProvider, FieldArray } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { MuiFileInput } from "mui-file-input";
import { WEEKDAYS, LAUNCH_OF_THE_SURVEY } from "../constantes/ValuesFormSurvey";
import ViewQuestions from "./ViewQuestions";
import AlertWithSnackbar from "./Shared/AlertWithSnackbar";
import DialogCreateQuestion from "./DialogCreateQuestion";
import { showAlertConfirm } from "../services/SweetAlert";
import useAlert from "../hooks/useAlert";
import { useRouter } from "next/router";

export default function FormCreateSurvey({ formik }) {
  const { alert, showAlert, hideAlert } = useAlert();
  const [openDialogUpdateQuestion, setOpenDialogUpdateQuestion] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState('');
  const [questionData, setQuestionData] = useState(null);
  const [indexQuestionSelect, setIndexQuestionSelect] = useState(null);
  const router = useRouter();

  /**
    * @author Fabian Duran
    * @description Permite vizualizar la informacion de una pregunta de la encuesta. 
    * @param indexSection Indice de la seccion donde esta ubicada la pregunta. 
    * @param indexQuestion Indice en el cual se ubica la pregunta dentro de la seccion. 
  */
  const showQuestion = (indexSection, indexQuestion) => {
    const question = formik.values.sections[indexSection].fields[indexQuestion];
    if (question) {
      setTypeQuestion(question.typeQuestion);
      setOpenDialogUpdateQuestion(true);
      setQuestionData(question);
      setIndexQuestionSelect(indexQuestion);
    }
  };
  /**
    * @author Fabian Duran
    * @description Permite actualizar la informacion de una pregunta de la encuesta. 
    * @param question Informacion de la pregunta actualizada en la modal. 
    * @param oldQuestion Informacion de la pregunta actualizada en la modal. 
  */
  const updateQuestion = (question, oldQuestion) => {
    if (question.indexSection !== oldQuestion.indexSection) {
      filterByDeleteQuestion(oldQuestion.indexSection, indexQuestionSelect);
      const setSections = [...formik.values.sections];
      setSections[question.indexSection].fields.push(question);
      formik.setFieldValue("sections", setSections);
    } else {
      const setSections = [...formik.values.sections];
      setSections.forEach((section, index) => {
        if (index === question.indexSection) {
          const indexQuestion = section.fields.findIndex(field => field.key === question.key);
          section.fields[indexQuestion] = question;
        }
      });
      formik.setFieldValue("sections", setSections);
    }
    closeDialoQuestion();
    showAlert({ message: "El campo se ha actualizado correctamente" });
  };
  /**
    * @author Fabian Duran
    * @description Permite eliminar una pregunta de la encuesta.  
    * @param indexSection Indice de la seccion donde esta ubicada la pregunta. 
    * @param indexQuestion Indice en el cual se ubica la pregunta dentro de la seccion. 
  */
  const deleteQuestion = (indexSection, indexQuestion) => {
    showAlertConfirm({ text: "¿Está seguro de eliminar la pregunta?" }).then(confirm => {
      if (confirm.isConfirmed) {
        filterByDeleteQuestion(indexSection, indexQuestion);
        showAlert({ message: "Se ha eliminado el campo con exito" });
      }
    });
  };
  /**
    * @author Fabian Duran
    * @description Permite filtrar y eliminar una pregunta dentro de una sección.
    * @param indexSection Indice de la seccion donde esta ubicada la pregunta. 
    * @param indexQuestion Indice en el cual se ubica la pregunta dentro de la seccion. 
  */
  const filterByDeleteQuestion = (indexSection, indexQuestion) => {
    const setQuestionsBySection = [...formik.values.sections];
    setQuestionsBySection.forEach((section, index) => {
      if (index === indexSection) {
        const filterQuestions = section.fields.filter((_, index) => {
          return index !== indexQuestion;
        });
        section.fields = filterQuestions;
      }
    });
    formik.setFieldValue("sections", setQuestionsBySection);
  };
  /**
    * @author Fabian Duran
    * @description Permite ocultar la modal de la vista. 
  */
  const closeDialoQuestion = () => setOpenDialogUpdateQuestion(false);
  /**
    * @author Fabian Duran
    * @description Ejecuta la alerta de confirmación si desea cancelar el proceso de creacion de una encuesta. 
  */
  const cancelButtonForm = () => {
    showAlertConfirm({ text: "¿Esta seguro de cancelar la creación de la encuesta?" }).then(confirm => {
      if (confirm.isConfirmed) {
        router.push("/surveys");
      }
    })
  };
  /**
    * @author Fabian Duran
    * @description Ejecuta el drag and drop entre las preguntas de las encuestas en cada seccion.
    * @param resDragAndDrop Respuesta emitida por el drag and drop.  
  */
  const updatePositionQuestion = (resDragAndDrop) => {
    const { source, destination } = resDragAndDrop;
    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;
    const setSections = [...formik.values.sections];
    let searchQuestion = null;
    setSections.every(section => {
      searchQuestion = section.fields.find(field => field.key === resDragAndDrop.draggableId);
      if (searchQuestion) return false;
      return true;
    });
    const fieldsBySection = [...setSections[searchQuestion.indexSection].fields];
    const aux = fieldsBySection[source.index];
    fieldsBySection[source.index] = fieldsBySection[destination.index];
    fieldsBySection[destination.index] = aux;
    setSections[searchQuestion.indexSection].fields = fieldsBySection;
    formik.setFieldValue("sections", setSections);
  };

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} mt={4}>
        <AlertWithSnackbar alert={alert} hideAlert={hideAlert} />
        <DialogCreateQuestion
          openDialogCreateQuestion={openDialogUpdateQuestion}
          closeDialogQuestion={closeDialoQuestion}
          typeQuestion={typeQuestion}
          listSections={formik.values.sections}
          data={questionData}
          addQuestionToSurvey={updateQuestion} />
        <Grid item md={6}>
          <TextField
            fullWidth
            id="nameSurvey"
            name="nameSurvey"
            label="Nombre de la encuesta"
            value={formik.values.nameSurvey}
            onChange={formik.handleChange}
            variant="filled"
            error={Boolean(formik.errors.nameSurvey) && formik.touched.nameSurvey}
            helperText={formik.touched.nameSurvey && formik.errors.nameSurvey} />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="Lanzamiento de la encuesta"
            id="launchSurvey"
            name="launchSurvey"
            variant="filled"
            select
            value={formik.values.launchSurvey}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.launchSurvey) && formik.touched.launchSurvey}
            helperText={formik.touched.launchSurvey && formik.errors.launchSurvey}>
            {
              LAUNCH_OF_THE_SURVEY.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
              ))
            }
          </TextField>
        </Grid>
        {
          formik.values.launchSurvey === 1 || formik.values.launchSurvey === 3 ? (
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Dias de publicación"
                id="daysOfPublication"
                name="daysOfPublication"
                variant="filled"
                select
                value={formik.values.daysOfPublication}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.daysOfPublication) && formik.touched.daysOfPublication}
                helperText={formik.touched.daysOfPublication && formik.errors.daysOfPublication}>
                {
                  WEEKDAYS.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))
                }
              </TextField>
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
                  ren
                  slotProps={{
                    textField: {
                      variant: 'filled',
                      fullWidth: true,
                      error: Boolean(formik.errors.publicationStartDate) && formik.touched.publicationStartDate,
                      helperText: formik.touched.publicationStartDate && formik.errors.publicationStartDate
                    }
                  }}
                  error={Boolean(formik.errors.publicationStartDate) && formik.touched.publicationStartDate}
                  helperText={formik.touched.publicationStartDate && formik.errors.publicationStartDate} />
              </Grid>
              <Grid item md={4}>
                <DatePicker
                  label="Fecha fin de la publicación"
                  value={formik.values.publicationEndDate}
                  onChange={(value) => formik.setFieldValue("publicationEndDate", value, true)}
                  slotProps={{
                    textField: {
                      variant: 'filled',
                      fullWidth: true,
                      error: Boolean(formik.errors.publicationEndDate) && formik.touched.publicationEndDate,
                      helperText: formik.touched.publicationEndDate && formik.errors.publicationEndDate
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
                    fullWidth: true,
                    error: Boolean(formik.errors.releaseDate) && formik.touched.releaseDate,
                    helperText: formik.touched.releaseDate && formik.errors.releaseDate
                  }
                }} />
            </Grid>
          )
        }
        <Grid item md={formik.values.launchSurvey === '' || formik.values.launchSurvey === 3 ? 12 : formik.values.launchSurvey === 2 ? 4 : 6}>
          <TextField
            fullWidth
            label="Publicar encuesta a"
            id="publishSurveyTo"
            name="publishSurveyTo"
            variant="filled"
            select
            value={formik.values.publishSurveyTo}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.publishSurveyTo) && formik.touched.publishSurveyTo}
            helperText={formik.touched.publishSurveyTo && formik.errors.publishSurveyTo}>
            <MenuItem value={1}>Todos los usuarios internos</MenuItem>
            <MenuItem value={2}>A cédulas en específico</MenuItem>
          </TextField>
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
                onChange={(event) => { formik.setFieldValue("loadIdbase", event); }}
                variant="filled"
                error={Boolean(formik.errors.loadIdbase) && formik.touched.loadIdbase}
                helperText={formik.touched.loadIdbase && formik.errors.loadIdbase} />
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
                      margin="normal"
                      error={Boolean(formik.errors.sections?.[index]?.title) && formik.touched.sections?.[index]?.title}
                      helperText={formik.touched.sections?.[index]?.title && formik.errors.sections?.[index]?.title} />
                    <TextField
                      fullWidth
                      id={`sections[${index}].description`}
                      name={`sections[${index}].description`}
                      label="Descripción de la sección (Opcional)"
                      value={formik.values.sections[index].description}
                      onChange={formik.handleChange}
                      variant="filled"
                      margin="normal"
                      multiline
                      error={Boolean(formik.errors.sections?.[index]?.description) && formik.touched.sections?.[index]?.description}
                      helperText={formik.touched.sections?.[index]?.description && formik.errors.sections?.[index]?.description} />
                    {
                      formik.values.sections[index].fields.length > 0 && (
                        <ViewQuestions
                          questions={formik.values.sections[index].fields}
                          updateQuestion={showQuestion}
                          deleteQuestion={deleteQuestion}
                          updatePositionQuestion={updatePositionQuestion} />
                      )
                    }
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
            <Button type="button" variant="outlined" size="large" onClick={cancelButtonForm}>Cancelar</Button>
            <Button type="submit" variant="contained" size="large">Crear encuesta</Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  )
}