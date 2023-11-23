import { Paper, Typography, Container } from "@mui/material";
import { useLocation } from "react-router-dom";

const ServerErrorPage = () => {
  const { state } = useLocation();

  return (
    <>
      <Container component={Paper}>
        {state?.error ? (
          <>
            <Typography variant="h3" color="secondary">
              {state.error.title}
            </Typography>
            <Typography variant="body1">{state.error.detail}</Typography>
          </>
        ) : (
          <>
            <Typography variant="h3">Server error</Typography>
          </>
        )}
      </Container>
    </>
  );
};

export default ServerErrorPage;
