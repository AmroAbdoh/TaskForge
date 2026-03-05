import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useThemeStore from "../store/useThemeStore";



function Topbar() {
  
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  
  const { mode, toggleMode } = useThemeStore(); 

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          
        }}
      >
        <Typography variant="h6">TaskForge</Typography>

        <IconButton color="inherit" onClick={toggleMode}>
          
          <Switch  />

        </IconButton>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
