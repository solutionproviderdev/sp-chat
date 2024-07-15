import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_SOCKET || 'http://192.168.68.108:3000' }),
  endpoints: (builder) => ({}),
});
