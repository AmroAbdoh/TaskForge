import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";

const drawerWidth = 240;


function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Projects" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar