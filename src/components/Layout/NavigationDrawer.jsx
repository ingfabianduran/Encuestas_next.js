import { useState } from "react";
import { Drawer } from "../../constantes/TransitionsDrawer";
import { LIST_ITEMS_DRAWER } from "../../constantes/ListItemsDrawer";
import ListNavigationDrawer from "../Shared/ListNavigationDrawer";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function NavigationDrawer() {
  const [open, setOpen] = useState(false);
  const [itemsBottomMenu, setItemsBottonMenu] = useState([{
    name: "Expandir",
    url: "",
    icon: <KeyboardArrowRightIcon />,
    action: "expand",
  }]);
  const stylesBottomList = { position: "absolute", bottom: 0, width: "100%" };
  return (
    <Drawer variant="permanent" open={open}>
      <ListNavigationDrawer items={LIST_ITEMS_DRAWER} open={open} />
      <ListNavigationDrawer stylesList={stylesBottomList} items={itemsBottomMenu} open={open} />
    </Drawer>
  )
}