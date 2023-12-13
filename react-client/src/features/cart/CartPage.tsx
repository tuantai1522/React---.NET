import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Grid,
  Button,
} from "@mui/material";

import { Remove, Add, Delete } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";

import { currencyFormat } from "../../app/util/util";

import { CartSummary } from "./CartSummary";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItemInCartAsync, addItemIntoCartASync } from "./CartSlice";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cart, status } = useAppSelector((state) => state.cart);

  if (!cart || cart.items.length == 0)
    return (
      <>
        <Typography variant="h2">Your cart is empty</Typography>
      </>
    );

  return (
    <>
      <Typography variant="h2">Cart Page</Typography>
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <img
                        style={{ height: 50, marginRight: 20 }}
                        src={item.pictureUrl}
                        alt={item.productName}
                      />
                      <span>{item.productName}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(item.price)}
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={status.includes(
                        "pendingRemoveItem" + item.productId + "minus"
                      )}
                      onClick={() => {
                        dispatch(
                          removeItemInCartAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "minus",
                          })
                        );
                      }}
                      color="error"
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      loading={status.includes(
                        "pendingAddItem" + item.productId
                      )}
                      onClick={() => {
                        dispatch(
                          addItemIntoCartASync({
                            productId: item.productId,
                            quantity: 1,
                          })
                        );
                      }}
                      color="secondary"
                    >
                      <Add />
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="right">
                    ${((item.price / 100) * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <LoadingButton
                      loading={status.includes(
                        "pendingRemoveItem" + item.productId + "buttonRemove"
                      )}
                      onClick={() =>
                        dispatch(
                          removeItemInCartAsync({
                            productId: item.productId,
                            quantity: item.quantity,
                            name: "buttonRemove",
                          })
                        )
                      }
                      color="error"
                    >
                      <Delete />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <CartSummary />
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              size="large"
              fullWidth
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default CartPage;
