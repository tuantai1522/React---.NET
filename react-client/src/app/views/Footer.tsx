import { Typography } from "@mui/material";

interface Props {
  darkMode: boolean;
  changeTheme: () => void;
}

const Footer = ({ darkMode, changeTheme }: Props) => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          backgroundColor: darkMode === false ? "#1976d2" : "#282424",
        }}
      >
        Bằng Tuấn Tài {darkMode}
      </Typography>
    </>
  );
};

export default Footer;
