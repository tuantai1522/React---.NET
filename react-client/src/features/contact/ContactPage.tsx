import { ButtonGroup, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

const ContactPage = () => {
  const dispatch = useAppDispatch();

  //use state counter
  const { data, title } = useAppSelector((state) => state.counter);
  return (
    <>
      <Typography variant="h2">Contact page</Typography>
      <Typography variant="h2">Title: {title}</Typography>
      <Typography variant="h2">The data is {data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => dispatch(decrement(1))}
          variant="contained"
          color="error"
        >
          Decrement
        </Button>

        <Button
          onClick={() => dispatch(increment(1))}
          variant="contained"
          color="secondary"
        >
          Increment
        </Button>

        <Button
          onClick={() => dispatch(increment(5))}
          variant="contained"
          color="primary"
        >
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ContactPage;
