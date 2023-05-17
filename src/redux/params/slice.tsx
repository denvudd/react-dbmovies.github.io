import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  params: {},
  loading: true,
};

const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    setParams(state, action) {
      state.params = action.payload;
    },
  },
});

export const { setParams } = paramsSlice.actions;

export default paramsSlice;
