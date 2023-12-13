import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter({
  selectId: (product: Product) => product.productId,
});

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "product/fetchProductsAsync",
  async () => {
    try {
      return agent.Catalog.list();
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "product/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return agent.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ err: error.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",

  //must write initialState in this function
  initialState: productsAdapter.getInitialState({
    productsloaded: false,
    status: "fullfiled",
  }),
  reducers: {},
  extraReducers: (builder) => {
    //fetch all products
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });

    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "fulfilled";
      state.productsloaded = true;
    });

    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "fullfilled";
    });

    //fetch one product
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });

    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "fulfilled";
    });

    builder.addCase(fetchProductAsync.rejected, (state) => {
      state.status = "fullfilled";
    });
  },
});

export const productsSelector = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
