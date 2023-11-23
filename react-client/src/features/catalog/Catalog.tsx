import { Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

import agent from "../../app/api/agent";
import LoadingComponent from "../../app/views/LoadingComponent";

//get products and method addProduct (Destructuring)
const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  //được gọi khi component được mount (xuất hiện trên màn hình) chứ ko gọi khi bị re-render
  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent />;

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
