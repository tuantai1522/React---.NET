import { useEffect, useState } from "react";
import { Product } from "../models/product";

import { Typography, AppBar, Toolbar, Switch } from "@mui/material";

interface Props {
  darkMode: boolean;
  changeTheme: () => void;
}
const Header = ({ darkMode, changeTheme }: Props) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Store</Typography>
          <Switch onChange={changeTheme} defaultChecked />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
