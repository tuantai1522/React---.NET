import { Button, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

//get products and method addProduct (Destructuring)
const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  //được gọi khi component được mount (xuất hiện trên màn hình) chứ ko gọi khi bị re-render
  useEffect(() => {
    fetch(`http://localhost:5062/api/product`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <Typography variant="h1">Welcome to My Store page</Typography>

      {/* To pass products to child component */}
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
