import { Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useEffect } from "react";

import LoadingComponent from "../../app/views/LoadingComponent";
import { fetchProductsAsync, productsSelector } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

//get products and method addProduct (Destructuring)
const Catalog = () => {
  const products = useAppSelector(productsSelector.selectAll);
  const { productsloaded, status } = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();

  //được gọi khi component được mount (xuất hiện trên màn hình) chứ ko gọi khi bị re-render
  useEffect(() => {
    if (!productsloaded) dispatch(fetchProductsAsync());
  }, [productsloaded, dispatch]);

  if (status.includes("pending")) return <LoadingComponent />;

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
