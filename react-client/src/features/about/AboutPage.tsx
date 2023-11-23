import {
  Typography,
  Container,
  Button,
  ListItem,
  ListItemText,
  Alert,
  AlertTitle,
  List,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

const AboutPage = () => {
  const [validationErrors, setValidationErrors] = useState<String[]>([]);

  const getValidationErrors = () => {
    agent.TestErrors.getValidationError()
      .then()
      .catch((err) => {
        setValidationErrors(err);
      });
  };
  return (
    <>
      <Typography variant="h2">About Page</Typography>
      <Container>
        <Button
          onClick={() =>
            agent.TestErrors.get400Error().catch((err) => console.log(err))
          }
        >
          Test 400 error
        </Button>
        <Button
          onClick={() =>
            agent.TestErrors.get401Error().catch((err) => console.log(err))
          }
        >
          Test 401 error
        </Button>
        <Button
          onClick={() =>
            agent.TestErrors.get404Error().catch((err) => console.log(err))
          }
        >
          Test 404 error
        </Button>
        <Button
          onClick={() =>
            agent.TestErrors.get500Error().catch((err) => console.log(err))
          }
        >
          Test 500 error
        </Button>
        <Button onClick={getValidationErrors}>Test validation error</Button>
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validation errors</AlertTitle>
            <List>
              {validationErrors.map((err, index) => (
                <ListItem key={index}>
                  <ListItemText>{err}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
      </Container>
    </>
  );
};

export default AboutPage;
