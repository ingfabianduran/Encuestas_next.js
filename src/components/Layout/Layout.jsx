import { Box, Backdrop, CircularProgress } from "@mui/material";
import NavigationDrawer from "./NavigationDrawer";
import { useLoader } from "../../store/useLoader";

export default function Layout({ children }) {
  const loader = useLoader((state) => state.show);

  return (
    <Box sx={{ display: "flex" }}>
      <NavigationDrawer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}>
        <CircularProgress color="inherit" size={55} />
      </Backdrop>
      <Box component="main" sx={{ flexGrow: 1, padding: 5 }}>
        {children}
      </Box>
    </Box>
  )
}