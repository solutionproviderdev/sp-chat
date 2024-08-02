import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl:'https://crm.solutionprovider.com.bd/api/' }),
  endpoints: (builder) => ({}),
});

// baseQuery: fetchBaseQuery({ baseUrl:'https://crm.solutionprovider.com.bd/api/' }),
// baseQuery: fetchBaseQuery({ baseUrl:'http://192.168.68.108:3000' }),
// baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_SOCKET || 'http://192.168.68.108:3000' }),  