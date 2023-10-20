import {configureStore} from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
