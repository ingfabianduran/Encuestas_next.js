import { useState } from "react";
import Grid from "@mui/material/Grid";
import ViewSurvey from "../../src/components/ViewSurvey";
import TypeOfQuestions from "../../src/components/TypeOfQuestions";
import DialogCreateQuestion from "../../src/components/DialogCreateQuestion";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import * as moment from "moment";
import { showAlert } from "../../src/services/SweetAlert";

export default function CreateSurvey() {
  const [openDialogCreateQuestion, setOpenDialogCreateQuestion] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState('');
  const formik = useFormik({
    initialValues: {
      nameSurvey: '',
      launchSurvey: '',
      daysOfPublication: '',
      releaseDate: moment(),
      publicationStartDate: moment(),
      publicationEndDate: moment(),
      publishSurveyTo: '',
      loadIdbase: '',
      sections: [{
        title: '',
        description: '',
        fields: []
      }]
    },
    onSubmit: (values) => {
      console.log('Submit create encuesta', values);
    }
  });

  const openDialogQuestion = (keyQuestion) => {
    if (formik.values.sections[0].title !== '' && formik.values.sections[0].description) {
      setTypeQuestion(keyQuestion);
      setOpenDialogCreateQuestion(true);
    } else showAlert("Error", "Por favor registre por lo menos una sección", "error");
  };

  const closeDialogQuestion = () => setOpenDialogCreateQuestion(false);

  const addQuestionToSurvey = (formValuesQuestion) => {
    console.log('Form values question', formValuesQuestion);
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
      <DialogCreateQuestion
        openDialogCreateQuestion={openDialogCreateQuestion}
        closeDialogQuestion={closeDialogQuestion}
        typeQuestion={typeQuestion}
        listSections={formik.values.sections}
        addQuestionToSurvey={addQuestionToSurvey} />
    </Grid>
  );
}
