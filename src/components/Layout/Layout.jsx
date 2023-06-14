import { Box, Backdrop, CircularProgress } from "@mui/material";
import NavigationDrawer from "./NavigationDrawer";

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <NavigationDrawer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box component="main" sx={{ flexGrow: 1, padding: 5 }}>
        {children}
      </Box>
    </Box>
  )
}
