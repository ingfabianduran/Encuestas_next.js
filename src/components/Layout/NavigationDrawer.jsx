import { useState } from "react";
import { Drawer } from "../../constantes/TransitionsDrawer";
import { LIST_ITEMS_DRAWER } from "../../constantes/ListItemsDrawer";
import ListNavigationDrawer from "../Shared/ListNavigationDrawer";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRouter } from "next/router";

export default function NavigationDrawer() {
  const [open, setOpen] = useState(false);
  const [itemsBottomMenu, setItemsBottonMenu] = useState([{
    name: "Expandir",
    url: "",
    icon: <KeyboardArrowRightIcon />,
    action: "expand",
  }]);

  const router = useRouter();

  const stylesBottomList = { position: "absolute", bottom: 0, width: "100%" };

  /**
    * @author Fabian Duran
    * @description Permite gestionar los eventos de los botones sobre el navigation drawer. 
    * @param url Url que contiene el menu. 
    * @param action Si no es de tipo url si no de tipo click. 
  */
  const actionButtonList = (url, action = null) => {
    if (!action) router.push(url);
    else {
      const newStateOpen = !open;
      const newItemsBottonMenu = [{ ...itemsBottomMenu[0], name: "Contraer", icon: open ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon /> }];
      setOpen(newStateOpen);
      setItemsBottonMenu(newItemsBottonMenu);
    }
  }

  return (
    <Drawer variant="permanent" open={open}>
      <ListNavigationDrawer items={LIST_ITEMS_DRAWER} open={open} actionButtonList={actionButtonList} />
      <ListNavigationDrawer stylesList={stylesBottomList} items={itemsBottomMenu} open={open} actionButtonList={actionButtonList} />
    </Drawer>
  )
}