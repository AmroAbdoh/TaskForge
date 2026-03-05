import AppRoutes from "./AppRoutes";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import useThemeStore from "./store/useThemeStore";

function App() {
  const { mode } = useThemeStore(); // get mode from Zustand

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "light" ? "#2563eb" : "#60a5fa" },
          secondary: { main: mode === "light" ? "#7c3aed" : "#c084fc" },
          background: {
            default: mode === "light" ? "#f4f6f8" : "#0f172a",
            paper: mode === "light" ? "#ffffff" : "#1e293b",
          },
        },
        shape: { borderRadius: 12 },
      }),
    [mode]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRoutes />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
