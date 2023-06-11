import { Container, Grid, Typography, TextField, InputAdornment, Button } from "@mui/material";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardSurvey from "../../src/components/CardSurvey";

export default function index() {
  const router = useRouter();

  /**
    * @author Fabian Duran
    * @description Redirecciona a la vista de creacion de encuestas. 
  */
  const goToCreateSurvey = () => router.push('/surveys/create-survey');

  return (
    <Container maxWidth="false" sx={{ padding: 4 }}>
      <Grid container>
        <Grid item md={12}>
          <Typography variant="h4" sx={{ fontWeight: "700", marginBottom: "10px" }}>Encuestas internas</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "400", fontSize: "16px" }}>
            En este espacio podrás ver o configurar todas las <br /> encuestas que tienes creados.
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 8 }} justifyContent="space-between">
        <Grid item md={3}>
          <TextField
            fullWidth
            label="Buscar encuesta"
            variant="filled"
            InputProps={{
              endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>
            }} />
        </Grid>
        <Grid item md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={goToCreateSurvey}
            sx={{ height: "100%" }}
            endIcon={<AddCircleOutlineIcon />}>
            Crear encuesta
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 5 }}>
        <Grid item md={4}>
          <CardSurvey />
        </Grid>
      </Grid>
    </Container>
  )
}