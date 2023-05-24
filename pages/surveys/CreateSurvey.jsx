import Grid from "@mui/material/Grid";
import ViewSurvey from "../../src/components/ViewSurvey";
import TypeOfQuestions from "../../src/components/TypeOfQuestions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function CreateSurvey() {
  return (
    <Grid container spacing={1}>
      <Grid item md={8}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ViewSurvey />
        </LocalizationProvider>
      </Grid>
      <Grid item md={4}>
        <TypeOfQuestions />
      </Grid>
    </Grid>
  );
}
