import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = `http://localhost:5000/client/trans/:id`;
const initialState = {
  user: null,

  transactions: [],
  totalbill: 0,
};

export const getTrans = createAsyncThunk("getTrans", async (id) => {
  const request = await axios(`http://localhost:5000/client/trans/${id}`);
  console.log(request);
  return request;
});

const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const userData = JSON.parse(localStorage.getItem("user"));
      state.user = userData;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [getTrans.pending]: (state) => {
      state.transactions = [];
    },
    [getTrans.fulfilled]: (state, action) => {
      state.transactions = action.payload.data;
    },
    [getTrans.rejected]: (state) => {
      state.transactions = [];
    },
  },
});

export default TransactionSlice.reducer;

export const TransactionActions = TransactionSlice.actions;
