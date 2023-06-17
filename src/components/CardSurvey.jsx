import { useState } from "react";
import { Card, CardContent, Stack, Typography, Box, Switch, IconButton, Menu, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LIST_MENU_CARD_SURVEY } from "../constantes/ListMenuCardSurvey";
import * as moment from "moment";
import { useRouter } from "next/router";

export default function CardSurvey({ survey }) {
  const [showMenu, setShowMenu] = useState(null);
  const openMenu = Boolean(showMenu);
  const router = useRouter();

  /**
    * @author Fabian Duran
    * @description Muestra el menu en la vista. 
  */
  const clickOpenMenu = (event) => setShowMenu(event.currentTarget);
  /**
    * @author Fabian Duran
    * @description Oculta el menu en la vista. 
  */
  const hideMenu = () => setShowMenu(null);
  /**
    * @author Fabian Duran
    * @description Metodo que ejecuta cierta accion dependiendo el menu seleccionado. 
  */
  const runMenuActions = () => {
    router.push({ pathname: "/surveys/create-survey", query: { id: survey.id } });
  };

  return (
    <Card elevation={5} sx={{ minHeight: "124px", display: "block", alignItems: "center", borderRadius: 2 }}>
      <Box display="flex" justifyContent="end" paddingTop={1}>
        <IconButton
          id="button-menu-options"
          aria-label="More options"
          aria-controls={openMenu ? 'menu-options' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={clickOpenMenu}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu-options"
          anchorEl={showMenu}
          open={openMenu}
          onClose={hideMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          MenuListProps={{ 'aria-labelledby': 'button-menu-options' }}>
          {
            LIST_MENU_CARD_SURVEY.map((menu, index) => (
              <ListItem key={index} dense disablePadding>
                <ListItemButton onClick={runMenuActions}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText>{menu.text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))
          }
        </Menu>
      </Box>
      <CardContent sx={{ width: "100%", padding: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" paddingX={4}>
          <Box display="block">
            <Typography variant="h4" sx={{ fontWeight: "700", fontSize: "24px" }}>{survey.nameSurvey}</Typography>
            <Typography sx={{ color: "#717171", fontSize: "16px" }}>
              <Box component="span" sx={{ fontWeight: "700" }}>Creada el </Box>
              {moment(survey.createAt).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Box>
            <Switch defaultChecked />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}