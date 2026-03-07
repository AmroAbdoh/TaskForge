import { Box , useTheme } from "@mui/material";
import Topbar from "./Topbar";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: theme.palette.background.default }}>      

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />

        
        <Box sx={{ p: 3, bgcolor: "inherit", flexGrow: 1  , minHeight: 0, }}>
            {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
