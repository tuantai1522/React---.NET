import { createSlice } from "@reduxjs/toolkit";

//1 slice là 1 state riêng biệt
export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 69,
  title: "This is my store page with redux toolkit",
};

export const counterSlice = createSlice({
  //In this function, I have 2 actions
  // counter/increment
  // counter/decrement
  name: "counter",
  initialState,

  //actions
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
