import {
  Typography,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Divider,
} from "@mui/material";
import { Product } from "../../app/models/product";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { productID } = useParams<{ productID: string }>();

  const [loading, setLoading] = useState(true);

  //được gọi khi component được mount (xuất hiện trên màn hình) chứ ko gọi khi bị re-render
  useEffect(() => {
    axios
      .get(`http://localhost:5062/api/product/${productID}`)
      .then((response) => setProduct(response.data))
      .finally(() => setLoading(false));
  }, [productID]);

  if (loading)
    return (
      <Typography variant="h3" mb={5}>
        Loading.....
      </Typography>
    );
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
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
