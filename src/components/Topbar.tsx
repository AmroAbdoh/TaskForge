import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useThemeStore from "../store/useThemeStore";
import ToggleTheme from "./ToggleTheme";



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

        <Stack direction="row" spacing={5}>
          <ToggleTheme onClick={toggleMode} mode={mode} />

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
