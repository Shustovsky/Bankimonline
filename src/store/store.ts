import { creditApi } from "./credit.ts";
import { creditMiddleware } from "./middleware/credit.ts";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [creditApi.reducerPath]: creditApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      creditApi.middleware,
      creditMiddleware.middleware,
    ),
});
