import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataValue: null,
  error: null,

  loading: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    dataFetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    dataFetchSuccess: (state, action) => {
      state.loading = false;
      state.dataValue = action.payload;
      state.error = null;
    },
    dataFetchFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { dataFetchStart, dataFetchSuccess, dataFetchFailed } =
  dataSlice.actions;
export default dataSlice.reducer;
