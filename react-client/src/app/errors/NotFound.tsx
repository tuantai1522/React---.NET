import {
  Paper,
  Typography,
  Container,
  Divider,
  Button,
  Link,
} from "@mui/material";

const NotFound = () => {
  return (
    <>
      <Container component={Paper} sx={{ height: 400 }}>
        <Typography variant="h3">
          Oops - we cound not find what you are looking for
        </Typography>
        <Divider />
        <Button fullWidth component={Link} href="/catalog">
          Go back to shop
        </Button>
      </Container>
    </>
  );
};

export default NotFound;
