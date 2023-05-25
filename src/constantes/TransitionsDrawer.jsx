import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

const WIDTH = 240;

const OPENED_MIXIN = (theme) => ({
  width: WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const CLOSED_MIXIN = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: WIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...OPENED_MIXIN(theme),
      "& .MuiDrawer-paper": OPENED_MIXIN(theme),
    }),
    ...(!open && {
      ...CLOSED_MIXIN(theme),
      "& .MuiDrawer-paper": CLOSED_MIXIN(theme),
    }),
  }),
);