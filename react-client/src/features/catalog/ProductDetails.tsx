import {
  Typography,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Divider,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import LoadingComponent from "../../app/views/LoadingComponent";
import NotFound from "../../app/errors/NotFound";
import { LoadingButton } from "@mui/lab";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addItemIntoCartASync, removeItemInCartAsync } from "../cart/CartSlice";
import { fetchProductAsync, productsSelector } from "./catalogSlice";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const { productID } = useParams<{ productID: string }>();

  const product = useAppSelector((state) =>
    productsSelector.selectById(state, parseInt(productID!))
  );

  const { status } = useAppSelector((state) => state.catalog);

  const curItem = cart?.items.find((i) => i.productId.toString() == productID);

  const [quantity, setQuantity] = useState(1);

  const [loadingButtons, setLoadingButtons] = useState({
    updateButton: false,
    removeButton: false,
  });

  //được gọi khi component được mount (xuất hiện trên màn hình) chứ ko gọi khi bị re-render
  useEffect(() => {
    if (curItem) setQuantity(curItem.quantity);

    if (!product && productID) dispatch(fetchProductAsync(parseInt(productID)));
  }, [productID, curItem, dispatch, product]);

  const handleInputItem = (event: any) => {
    const quantity = event.target.value;
    if (quantity >= 1) setQuantity(parseInt(event.target.value));
  };

  //Thêm và cập nhật số lượng trong giỏ
  const updateItem = async (name: string) => {
    try {
      //Nếu updatedQuantity là số dương thì thêm, âm thì xóa
      const updatedQuantity = curItem ? quantity - curItem.quantity : quantity;
      setLoadingButtons((prev) => ({ ...prev, updateButton: true }));
      await dispatch(
        addItemIntoCartASync({
          productId: product?.productId!,
          quantity: updatedQuantity,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingButtons((prev) => ({ ...prev, updateButton: false }));
    }

    setQuantity(quantity);
  };

  const handleUpdateItem = () => {
    updateItem("upd");
  };

  //Xóa số lượng trong giỏ
  const deleteItem = async (
    productId: number,
    quantity: number = 1,
    name: string
  ) => {
    try {
      //Nếu updatedQuantity là số dương thì thêm, âm thì xóa
      setLoadingButtons((prev) => ({ ...prev, removeButton: true }));
      await dispatch(
        removeItemInCartAsync({
          productId: product?.productId!,
          quantity: quantity,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingButtons((prev) => ({ ...prev, removeButton: false }));
    }

    setQuantity(1);
  };

  //remove this item from cart
  const handleRemoveItem = () => {
    deleteItem(product?.productId!, curItem?.quantity, "rem");
  };

  if (status.includes("pending")) return <LoadingComponent />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.productName}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${product && product.price && (product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody sx={{ fontSize: "1.1em" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product?.productName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product?.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product?.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid sx={{ mt: 3 }} container spacing={2}>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in cart"
              fullWidth
              value={quantity}
              onChange={handleInputItem}
            />
          </Grid>
          <Grid item xs={4}>
            <LoadingButton
              disabled={curItem?.quantity === quantity}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleUpdateItem}
              loading={loadingButtons.updateButton}
            >
              {curItem ? "Update" : "Add to cart"}
            </LoadingButton>
          </Grid>
          {curItem && (
            <>
              <Grid item xs={4}>
                <LoadingButton
                  sx={{ height: "55px" }}
                  color="warning"
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={handleRemoveItem}
                  loading={loadingButtons.removeButton}
                >
                  Remove
                </LoadingButton>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
