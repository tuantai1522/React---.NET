import { Paper, TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { productsSelector, setProductParams } from "./catalogSlice";
import { useState } from "react";

const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [keyWord, setKeyWord] = useState(productParams.keyWord);
  const dispatch = useAppDispatch();

  const delaySearch = debounce((event: any) => {
    dispatch(setProductParams({ keyWord: event.target.value }));
  }, 1000);

  return (
    <>
      <Paper sx={{ mb: 2 }}>
        <TextField
          label="Search products"
          variant="outlined"
          fullWidth
          value={keyWord || ""}
          onChange={(event: any) => {
            setKeyWord(event.target.value);
            delaySearch(event);
          }}
        />
      </Paper>
    </>
  );
};

export default ProductSearch;
