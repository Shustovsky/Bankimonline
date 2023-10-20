import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditApi = createApi({
  reducerPath: "credit",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    addCredit: builder.mutation({
      query: (body) => ({
        url: "/cards",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddCreditMutation } = creditApi;
