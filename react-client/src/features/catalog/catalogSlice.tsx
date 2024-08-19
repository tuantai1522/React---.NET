import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import agent from "../../app/api/agent";
import { Product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

interface CatalogState {
  productsloaded: boolean;
  status: string;

  //productsFilter
  productsFilter: boolean;
  types: [];

  productParams: ProductParams;

  metaData: MetaData | null;
}
const productsAdapter = createEntityAdapter({
  selectId: (product: Product) => product.productId,
});

const getAxiosParams = (productParams: ProductParams) => {
  const params = new URLSearchParams();

  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy.toString());
  if (productParams.keyWord) params.append("keyWord", productParams.keyWord);
  if (productParams.types)
    params.append("types", productParams.types.toString());

  return params;
};
export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("product/fetchProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
  try {
    const response = await agent.Catalog.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

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

export const fetchProductFilterAsync = createAsyncThunk(
  "product/fetchProductFilterAsync",
  async (productId, thunkAPI) => {
    try {
      return agent.Catalog.filters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ err: error.data });
    }
  }
);

const initParams = (): ProductParams => {
  return {
    orderBy: "name",
    pageNumber: 1,
    pageSize: 6,
    types: [],
  };
};
export const catalogSlice = createSlice({
  name: "catalog",

  //must write initialState in this function
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsloaded: false,
    status: "fullfiled",

    //productsFilter
    productsFilter: false,
    types: [], // lọc ra các loại sản phẩm

    //Pagination
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsloaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsloaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },

    resetProductParams: (state, action) => {
      state.productParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
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

    //fetch products with filter
    builder.addCase(fetchProductFilterAsync.pending, (state) => {
      state.status = "pendingFetchProductsFilter";
    });

    builder.addCase(fetchProductFilterAsync.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.types = action.payload.types;
      state.productsFilter = true;
    });

    builder.addCase(fetchProductFilterAsync.rejected, (state) => {
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

export const {
  setProductParams,
  resetProductParams,
  setPageNumber,
  setMetaData,
} = catalogSlice.actions;
