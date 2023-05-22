import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ViewSurvey from "../components/ViewSurvey";
import TypeOfQuestions from "../components/TypeOfQuestions";

export default function CreateSurvey() {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item md={8}>
          <ViewSurvey />
        </Grid>
        <Grid item md={4}>
          <TypeOfQuestions />
        </Grid>
      </Grid>
    </Box>
  );
}
