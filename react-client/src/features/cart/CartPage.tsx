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
} from "@mui/material";

import { Remove, Add, Delete } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";

import { useState, useEffect } from "react";

import agent from "../../app/api/agent";
import LoadingComponent from "../../app/views/LoadingComponent";

import { getCookie } from "../../app/util/util";
import { useStoreContext } from "../../app/context/StoreContext";

const CartPage = () => {
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  const { cart, setCart, removeItem } = useStoreContext();

  const handleRemoveItem = (
    productId: number,
    quantity: number = 1,
    name: string
  ) => {
    setStatus({ loading: true, name });

    agent.Cart.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ loading: true, name: "" }));
  };

  const handleAddItem = (productId: number, name: string) => {
    setStatus({ loading: true, name });

    agent.Cart.addItem(productId)
      .then((cart) => setCart(cart))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ loading: true, name: "" }));
  };

  if (!cart)
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
                    ${(item.price / 100).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={
                        status.loading && status.name === "rem" + item.productId
                      }
                      onClick={() => {
                        handleRemoveItem(
                          item.productId,
                          1,
                          "rem" + item.productId
                        );
                      }}
                      color="error"
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      loading={
                        status.loading && status.name === "add" + item.productId
                      }
                      onClick={() => {
                        handleAddItem(item.productId, "add" + item.productId);
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
                      loading={
                        status.loading && status.name === "del" + item.productId
                      }
                      onClick={() => {
                        handleRemoveItem(
                          item.productId,
                          item.quantity,
                          "del" + item.productId
                        );
                      }}
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
      </>
    </>
  );
};

export default CartPage;
