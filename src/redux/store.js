import { configureStore } from "@reduxjs/toolkit";

import PropertyReducer from "./property.js";

import ClientSearchReducer from "./clientsearch";

import TransactionReducer from "./transaction";

export const store = configureStore({
  reducer: {
    property: PropertyReducer,
    search: ClientSearchReducer,
    transaction: TransactionReducer,
  },
});
