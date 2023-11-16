import { ThemeProvider } from "@emotion/react";
import Catalog from "../../features/catalog/Catalog";
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
      <Container>
        <Catalog />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
