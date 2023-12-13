import { ShoppingCart } from "@mui/icons-material";
import {
  Typography,
  AppBar,
  Toolbar,
  Switch,
  Grid,
  IconButton,
  Badge,
  Link,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/configureStore";

interface Props {
  darkMode: boolean;
  changeTheme: () => void;
}

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const navStyle = {
  textTransform: "uppercase",
  color: "inherit",
  "&:hover": { color: "grey.500" },
  "&:actice": { color: "text.secondary" },
  typography: "h6",
  textDecoration: "none",
};

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const Header = ({ darkMode, changeTheme }: Props) => {
  const { cart } = useAppSelector((state) => state.cart);

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="row">
            <Grid alignItems="center" container direction="row" item xs={4}>
              <Link href="/" sx={navStyle}>
                <Typography sx={navStyle} variant="h6">
                  My Store
                </Typography>
              </Link>

              <Switch
                checked={darkMode}
                onChange={changeTheme}
                defaultChecked
              />
            </Grid>
            <Grid
              alignItems="center"
              container
              justifyContent="center"
              item
              gap={5}
              xs={4}
            >
              {midLinks.map((item) => (
                <Link href={item.path} sx={navStyle}>
                  <Typography variant="h6">{item.title}</Typography>
                </Link>
              ))}
            </Grid>
            <Grid
              justifyContent="flex-end"
              alignItems="center"
              container
              gap={3}
              item
              xs={4}
            >
              <IconButton
                href="/cart"
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              {rightLinks.map((item) => (
                <Link href={item.path} sx={navStyle}>
                  <Typography variant="h6">{item.title}</Typography>
                </Link>
              ))}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
