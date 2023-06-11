import { Box } from "@mui/material";
import NavigationDrawer from "./NavigationDrawer";

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavigationDrawer />
      <Box component="main" sx={{ flexGrow: 1, padding: 5 }}>
        {children}
      </Box>
    </Box>
  )
}
