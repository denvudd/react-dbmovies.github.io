import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ParamsState } from "./types";

const initialState: ParamsState = {
  params: {
    sortData: {
      sortBy: ''
    },
    additionalSortData: {
      additionalSortBy: '',
    }
  },
};

const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<ParamsState["params"]>) {
      state.params = action.payload;
    },
  },
});

export const { setParams } = paramsSlice.actions;

export default paramsSlice;
