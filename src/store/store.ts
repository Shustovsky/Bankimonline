import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { creditApi } from "./credit.ts";
import {creditMiddleware} from "./middleware/credit.ts";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [creditApi.reducerPath]: creditApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creditApi.middleware, creditMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
