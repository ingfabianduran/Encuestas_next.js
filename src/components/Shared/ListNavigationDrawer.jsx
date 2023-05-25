import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function ListNavigationDrawer({ stylesList = null, items, open, actionButtonList }) {
  return (
    <List style={stylesList}>
      {items.map((item, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5
            }}
            onClick={() => actionButtonList(item.url, item.action)}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center"
              }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}