import { Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import axios from "axios";

//get products and method addProduct (Destructuring)
const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  //được gọi khi component được mount (xuất hiện trên màn hình) chứ ko gọi khi bị re-render
  useEffect(() => {
    axios
      .get(`http://localhost:5062/api/product`)
      .then((response) => setProducts(response.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Typography variant="h3" mb={5}>
        Loading.....
      </Typography>
    );

  return (
    <>
      <Typography variant="h1" mb={5}>
        Welcome to My Store page
      </Typography>

      {/* To pass products to child component */}
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
