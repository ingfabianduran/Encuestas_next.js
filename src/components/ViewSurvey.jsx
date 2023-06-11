import { Paper, Box, Stack, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FormCreateSurvey from "./FormCreateSurvey";
import { useRouter } from "next/router";

export default function ViewSurvey({ formik }) {
  const router = useRouter();

  /**
    * @author Fabian Duran
    * @description Redirige a la vista anterior visitada. 
  */
  const goToBack = () => router.back();

  return (
    <Paper elevation={5} sx={{
      padding: "50px"
    }}>
      <Box sx={{
        width: "100%",
        bgcolor: "white",
      }}>
        <Stack direction="row" alignItems="center" mb={4}>
          <IconButton
            size="small"
            disableRipple
            onClick={goToBack}
            sx={{
              backgroundColor: "#353535",
              color: "#FBFBFB",
              marginRight: "10px"
            }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", fontSize: "16px" }}>Regresar</Typography>
        </Stack>
        <Typography variant="h4" sx={{ fontWeight: "700" }}>Creación de encuesta</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "400", fontSize: "16px" }}>
          En este espacio podrás agregar los campos y preguntas que desees para tu encuesta.
        </Typography>
        <FormCreateSurvey formik={formik} />
      </Box>
    </Paper>
  )
}
