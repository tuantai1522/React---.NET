import { ThemeProvider } from "@emotion/react";

import { Outlet } from "react-router-dom";

import Header from "./Header";

import { CssBaseline, Container } from "@mui/material";
import { createTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Footer from "./Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useStoreContext } from "../context/StoreContext";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/views/LoadingComponent";
import { getCookie } from "../util/util";

const App = () => {
  const { setCart } = useStoreContext(); // use local variables
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const palette = darkMode ? "dark" : "light";

  // được gọi khi component được mount (xuất hiện trên màn hình) chứ ko gọi khi bị re-render
  useEffect(() => {
    const customerId = getCookie("customerId");

    if (customerId) {
      agent.Cart.get()
        .then((cart) => setCart(cart))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setCart]);

  if (loading) return <LoadingComponent />;

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
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
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
