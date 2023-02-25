import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `http://localhost:5000/client/home`;
const initialState = {
  property: [],
  // roomNumbers: [],
  // currenthotel: [],
};

export const getProperty = createAsyncThunk("getProperty", (_) => {
  return axios(url).catch((err) => console.log(err));
});

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: {
    [getProperty.pending]: (state) => {},
    [getProperty.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.property = action.payload.data;
    },
    [getProperty.rejected]: (state) => {},
  },
});

export const PropertyActions = propertySlice.actions;

export default propertySlice.reducer;
