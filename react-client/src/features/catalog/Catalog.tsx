import { Grid, Typography, Box, Pagination } from "@mui/material";
import ProductList from "./ProductList";
import { useEffect } from "react";

import LoadingComponent from "../../app/views/LoadingComponent";
import {
  fetchProductFilterAsync,
  fetchProductsAsync,
  productsSelector,
  setProductParams,
} from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductSearch from "./ProductSearch";
import ProductSorting from "./ProductSorting";
import ProductCategory from "./ProductCategory";
import AppPagination from "./AppPagination";

const sortOptions = [
  { value: "name", name: "Alphabetial" },
  { value: "priceAsc", name: "Price - Low to High" },
  { value: "priceDesc", name: "Price - High to Low" },
];

//get products and method addProduct (Destructuring)
const Catalog = () => {
  const products = useAppSelector(productsSelector.selectAll);
  const {
    productsloaded,
    status,
    productsFilter,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();

  //được gọi khi component được mount (xuất hiện trên màn hình) chứ ko gọi khi bị re-render
  useEffect(() => {
    if (!productsloaded) dispatch(fetchProductsAsync());
  }, [productsloaded, dispatch]);

  useEffect(() => {
    if (!productsFilter) dispatch(fetchProductFilterAsync());
  }, [productsFilter, dispatch]);

  if (!productsFilter || !metaData) return <LoadingComponent />;

  function setPageNumber(arg0: { page: number }): any {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Typography variant="h1" mb={5}>
        Welcome to My Store page
      </Typography>

      {/* To pass products to child component */}
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <ProductSearch />
          <ProductSorting
            selectedValue={productParams.orderBy}
            sortOptions={sortOptions}
            onChange={(event: any) =>
              dispatch(setProductParams({ orderBy: event.target.value }))
            }
          />
          <ProductCategory
            items={types}
            checked={productParams.types}
            onChange={(checkedItems: string[]) =>
              dispatch(setProductParams({ types: checkedItems }))
            }
          />
        </Grid>
        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>
        <AppPagination
          metaData={metaData}
          onPageChange={(page: number) =>
            dispatch(setProductParams({ pageNumber: page }))
          }
        />
      </Grid>
    </>
  );
};

export default Catalog;
