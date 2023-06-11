import { Grid, Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Index() {
  return (
    <Grid container alignItems="center">
      <Grid item md={5}>
        <Typography variant="overline" sx={{ fontSize: "20px" }}>Gestión de encuestas</Typography>
        <Typography variant="h1" sx={{ fontWeight: "700", paddingTop: 3 }}>¡Bienvenid@ <br /> Fabian Duran!</Typography>
        <Typography variant="subtitle1" sx={{ paddingTop: 3 }}>
          Este es el módulo de <Box component="span" sx={{ fontWeight: "700" }}>ENCUESTAS</Box>, donde podrás <br /> crear y administrar las encuestas internas <br /> de la empresa.
        </Typography>
      </Grid>
      <Grid item md={7} display="flex" justifyContent="end">
        <Image
          src="/landing.svg"
          height={600}
          width={800} />
      </Grid>
    </Grid>
  );
}
