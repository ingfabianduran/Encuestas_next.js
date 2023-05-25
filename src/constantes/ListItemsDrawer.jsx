import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from "@mui/icons-material/Article";

export const LIST_ITEMS_DRAWER = [
  {
    name: "Dashboard",
    url: "/",
    icon: <DashboardIcon />
  },
  {
    name: "Encuestas",
    url: "/surveys/CreateSurvey",
    icon: <ArticleIcon />
  }
];