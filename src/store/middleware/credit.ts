import {CREDIT_LOCAL_STORAGE_KEY} from "../../constant.ts";
import {creditApi} from "../credit.ts";
import { createListenerMiddleware } from '@reduxjs/toolkit';

export const creditMiddleware = createListenerMiddleware();

creditMiddleware.startListening({
  matcher: creditApi.endpoints?.addCredit.matchPending,
  effect: async (action) => {
    localStorage.setItem(CREDIT_LOCAL_STORAGE_KEY, JSON.stringify(action.meta.arg.originalArgs));
  },
});
