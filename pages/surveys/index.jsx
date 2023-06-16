import { useState, useEffect } from "react";
import { Grid, Typography, TextField, InputAdornment, Button, TablePagination, Paper } from "@mui/material";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardSurvey from "../../src/components/CardSurvey";
import { useLoader } from "../../src/store/useLoader";

export default function index() {
  const [paginator, setPaginator] = useState({ count: 100, page: 1, rowsPerPage: 10 });
  const router = useRouter();
  const setLoader = useLoader((state) => state.setLoader);

  useEffect(() => {
    setLoader();
    setTimeout(() => setLoader(), 3000);
  }, []);
  /**
    * @author Fabian Duran
    * @description Redirecciona a la vista de creacion de encuestas. 
  */
  const goToCreateSurvey = () => router.push('/surveys/create-survey');
  /**
    * @author Fabian Duran
    * @description Redirecciona a la vista de creacion de encuestas. 
    * @param $event Evento emitido por el paginador. 
    * @param page Nuevo numero de pagina generado por el paginador. 
  */
  const onChangePage = ($event, page) => {
    console.log("Event", $event, "Page", page);
  };

  return (
    <>
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
      <Grid container justifyContent="end" paddingTop={2}>
        <Grid item md={5}>
          <Paper
            elevation={5}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingY: 1
            }}>
            <TablePagination
              component="div"
              count={paginator.count}
              page={paginator.page}
              rowsPerPage={paginator.rowsPerPage}
              onPageChange={onChangePage} />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}