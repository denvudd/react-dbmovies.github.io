import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ParamsState, SortValue } from "./types/types";

const initialState: ParamsState = {
  params: {
    sortData: {
      sortBy: SortValue.None,
    },
    additionalSortData: {
      releaseDates: {
        date_gte: null,
        date_lte: null,
      },
      genres: null,
      language: null,
      voteAverage: {
        voteAverage_gte: null,
        voteAverage_lte: null,
      },
      voteCount: {
        voteCount_gte: null,
        voteCount_lte: null,
      },
      runtime: {
        runtime_gte: null,
        runtime_lte: null,
      },
      keywords: null,
    },
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
