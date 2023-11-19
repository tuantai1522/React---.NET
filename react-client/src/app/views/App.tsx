import { ThemeProvider } from "@emotion/react";

import { Outlet, Link } from "react-router-dom";

import Header from "./Header";

import { CssBaseline, Container } from "@mui/material";
import { createTheme } from "@mui/material";
import { useState } from "react";
import Footer from "./Footer";
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const palette = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: palette,
      background: {
        default: darkMode === false ? "#eaeaea" : "#121212",
      },
    },
  });

  //change to other color
  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header darkMode={darkMode} changeTheme={changeTheme} />
      <Container sx={{ mt: 5, mb: 5 }}>
        <Outlet />
      </Container>
      <Footer darkMode={darkMode} changeTheme={changeTheme} />
    </ThemeProvider>
  );
};

export default App;
