import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ViewSurvey from "../../src/components/ViewSurvey";
import TypeOfQuestions from "../../src/components/TypeOfQuestions";
import DialogCreateQuestion from "../../src/components/DialogCreateQuestion";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import * as moment from "moment";
import { showAlert as showSweetAlert, showAlertConfirm } from "../../src/services/SweetAlert";
import AlertWithSnackbar from "../../src/components/Shared/AlertWithSnackbar";
import useAlert from "../../src/hooks/useAlert";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useLoader } from "../../src/store/useLoader";
import { SURVEY_SCHEMA } from "../../src/validators/survey";

export default function CreateSurvey() {
  const [openDialogCreateQuestion, setOpenDialogCreateQuestion] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState('');
  const { alert, showAlert, hideAlert } = useAlert();
  const setLoader = useLoader((state) => state.setLoader);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      nameSurvey: '',
      launchSurvey: '',
      daysOfPublication: '',
      releaseDate: null,
      publicationStartDate: null,
      publicationEndDate: null,
      publishSurveyTo: '',
      loadIdbase: '',
      sections: [{
        title: '',
        description: '',
        fields: []
      }]
    },
    validationSchema: SURVEY_SCHEMA,
    onSubmit: (values) => {
      showAlertConfirm({ title: "¿Está seguro?", text: "¿De guardar la encuesta?" }).then(isConfirm => {
        if (isConfirm.isConfirmed) {
          const setValuesForm = { ...values, id: uuidv4(), createAt: moment() };
          const surveys = JSON.parse(localStorage.getItem('surveys'));
          if (!surveys) {
            const createLocalSurveys = [];
            createLocalSurveys.push(setValuesForm);
            localStorage.setItem("surveys", JSON.stringify(createLocalSurveys));
          } else {
            surveys.push(setValuesForm)
            localStorage.setItem("surveys", JSON.stringify(surveys));
          }
          showSweetAlert({ text: "Encuesta creada con exito", showConfirmButton: true }).then(confirm => {
            if (confirm.isConfirmed) {
              router.push("/surveys");
            }
          });
        }
      });
    }
  });

  useEffect(() => {
    setLoader();
    setTimeout(() => setLoader(), 3000);
  }, []);
  /**
    * @author Fabian Duran
    * @description Permite mostrar la modal para agregar una pregunta.  
    * @param keyQuestion Tipo de pregunta seleccionada en la lista. 
  */
  const openDialogQuestion = (keyQuestion) => {
    if (formik.values.sections[0].title !== '' && formik.values.sections[0].description) {
      setTypeQuestion(keyQuestion);
      setOpenDialogCreateQuestion(true);
    } else showSweetAlert({ title: "Error", text: "Por favor registre por lo menos una sección", icon: "error" });
  };
  /**
    * @author Fabian Duran
    * @description Permite ocultar la modal para agregar una pregunta.  
  */
  const closeDialogQuestion = () => setOpenDialogCreateQuestion(false);
  /**
    * @author Fabian Duran
    * @description Permite agregar una pregunta a la encuesta y sección seleccionada. 
    * @param formValuesQuestion Información referente a la pregunta creada. 
  */
  const addQuestionToSurvey = (formValuesQuestion) => {
    showAlert({ message: "Se han guardado los cambios del campo con éxito." });
    const setFieldsBySection = formik.values.sections;
    setFieldsBySection[formValuesQuestion.indexSection].fields.push(formValuesQuestion);
    formik.setFieldValue("sections", setFieldsBySection);
    closeDialogQuestion();
  };

  return (
    <Grid container spacing={1}>
      <Grid item md={8}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ViewSurvey formik={formik} />
        </LocalizationProvider>
      </Grid>
      <Grid item md={4}>
        <TypeOfQuestions openDialogQuestion={openDialogQuestion} />
      </Grid>
      {
        openDialogCreateQuestion &&
        <DialogCreateQuestion
          openDialogCreateQuestion={openDialogCreateQuestion}
          closeDialogQuestion={closeDialogQuestion}
          typeQuestion={typeQuestion}
          listSections={formik.values.sections}
          addQuestionToSurvey={addQuestionToSurvey} />
      }
      <AlertWithSnackbar
        alert={alert}
        hideAlert={hideAlert} />
    </Grid>
  );
}
