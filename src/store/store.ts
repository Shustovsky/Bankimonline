import formReducer from "./reducers/formSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({ reducer: { form: formReducer } });

export type RootState = ReturnType<typeof store.getState>;
