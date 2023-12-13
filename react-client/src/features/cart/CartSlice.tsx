import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Cart } from "../../app/models/cart";
import agent from "../../app/api/agent";

//1 slice là 1 state riêng biệt
export interface CartState {
  cart: Cart | null;
  status: string;
}

const initialState: CartState = {
  cart: null,
  status: "fullfiled",
};

export const addItemIntoCartASync = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number }
>("cart/addItemIntoCartASync", async ({ productId, quantity = 1 }) => {
  try {
    return agent.Cart.addItem(productId, quantity);
  } catch (e) {
    console.log(e);
  }
});

export const removeItemInCartAsync = createAsyncThunk<
  Cart,
  { productId: number; quantity: number; name?: string }
>("cart/removeItemInCartAsync", async ({ productId, quantity }) => {
  try {
    return agent.Cart.removeItem(productId, quantity);
  } catch (e) {
    console.log(e);
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  //actions
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },

  extraReducers: (builder) => {
    //ADD ITEM

    //is fetching
    builder.addCase(addItemIntoCartASync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    //after fetching successfully
    builder.addCase(addItemIntoCartASync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "fullfilled";
    });

    //after fetching failed
    builder.addCase(addItemIntoCartASync.rejected, (state) => {
      state.status = "fullfilled";
    });

    //REMOVE ITEM
    //is fetching
    builder.addCase(removeItemInCartAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });

    //after fetching successfully
    builder.addCase(removeItemInCartAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;

      //working with current cart
      if (!state.cart) return;

      const itemIndex = state.cart.items.findIndex(
        (i) => i.productId === productId
      );

      if (itemIndex >= 0) {
        state.cart.items[itemIndex].quantity -= quantity;
        if (state.cart.items[itemIndex].quantity === 0)
          state.cart.items.splice(itemIndex, 1);
      }
      state.status = "fullfilled";
    });

    //after fetching failed
    builder.addCase(removeItemInCartAsync.rejected, (state) => {
      state.status = "fullfilled";
    });
  },
});

export const { setCart } = cartSlice.actions;
