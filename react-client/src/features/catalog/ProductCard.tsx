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

import { Product } from "../../app/models/product";

// to define all properties or methods passed from father's component
interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
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
            {(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
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
