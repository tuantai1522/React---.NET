import {
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
  Card,
  CardHeader,
  Avatar,
  Link,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { Product } from "../../app/models/product";

import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addItemIntoCartASync } from "../cart/CartSlice";

// to define all properties or methods passed from father's component
interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {product.productName.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.productName}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "secondary.main" },
          }}
        />

        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
            bgcolor: "primary.light",
          }}
          image={product.pictureUrl}
          title={product.productName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" color="secondary">
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={status.includes("pendingAddItem" + product.productId)}
            onClick={() =>
              dispatch(addItemIntoCartASync({ productId: product.productId }))
            }
            size="small"
          >
            Add to cart
          </LoadingButton>
          <Button size="small">
            <Link href={`/catalog/${product.productId}`} underline="none">
              View
            </Link>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
