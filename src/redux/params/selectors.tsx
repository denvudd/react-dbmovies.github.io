import { RootState } from "../store";

export const selectParams = (state: RootState) => state.paramsSlice.params;