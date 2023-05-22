import AbcIcon from "@mui/icons-material/Abc";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PercentIcon from "@mui/icons-material/Percent";
import EmailIcon from "@mui/icons-material/Email";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const TYPE_OF_QUESTIONS = [
  {
    name: "Informativo",
    description: "Campo de texto informativo",
    icon: <AbcIcon />,
  },
  {
    name: "Respuesta simple",
    description: "Campo de texto de una linea",
    icon: <AbcIcon />,
  },
  {
    name: "Respuesta larga",
    description: "Campo de texto multilinea",
    icon: <ChatIcon />,
  },
  {
    name: "Respuesta unica",
    description: "Lista de opciones múltiples",
    icon: <ArrowDropDownIcon />,
  },
  {
    name: "Numérico",
    description: "Solo acepta numero",
    icon: <PercentIcon />,
  },
  {
    name: "Email",
    description: "Solo acepta correos",
    icon: <EmailIcon />,
  },
  {
    name: "Radiobutton",
    description: "Permite una única opción",
    icon: <RadioButtonUncheckedIcon />,
  },
  {
    name: "Moneda",
    description: "Solo acepta moneda",
    icon: <AttachMoneyIcon />,
  },
  {
    name: "Tiempo",
    description: "Campo tipo tiempo",
    icon: <AccessTimeIcon />,
  },
];
