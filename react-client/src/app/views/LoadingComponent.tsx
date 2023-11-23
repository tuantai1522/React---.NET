import { Container, CircularProgress, Typography, Box } from "@mui/material";

const LoadingComponent = () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={100} />
        </Box>
        <Box
          sx={{
            height: "100vh",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Loading...
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default LoadingComponent;
