import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  search: {
    destination: "",
    date: {
      startDate: "",
      endDate: "",
    },
    options: {
      adult: 1,
      children: 0,
      room: 1,
    },
  },

  resultList: [],
};

const url = `http://localhost:5000/client/search`;

export const search = createAsyncThunk("search", (_, thunkAPI) => {
  // console.log(thunkAPI.getState());

  const searchData = thunkAPI.getState().search.search;

  // console.log(searchData);
  const fetch = axios.post(url, { searchData }).catch((err) => {
    alert(err.response.data);
  });
  //   console.log(fetch);
  return fetch;
});

const clientSearchSlice = createSlice({
  name: "searching",
  initialState,
  reducers: {
    change: (state, action) => {
      state.search.destination = action.payload.destination;
      state.search.date = action.payload.date;
      state.search.options = action.payload.options;
    },
  },
  extraReducers: {
    [search.fulfilled]: (state, action) => {
      state.resultList = action.payload.data;
    },
    [search.pending]: (state, action) => {
      state.resultList = [];
    },
  },
});

export const searchingActions = clientSearchSlice.actions;

export default clientSearchSlice.reducer;
