import { apiSlice } from "@redux/apiSlice";

const leadCenterAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query({
      query: ({ page } = { page: 1 }) => `/lead?page=${page}&limit=20`,
    }),
    getLeadDetails: builder.query({
      query: (id) => `/lead/${id}`,
    }),
    sendMessege: builder.mutation({
      query: ({ id, message }) => ({
        url: `/fbmessage/${id}`,
        method: "POST",
        body: { message },
      }),
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useGetLeadDetailsQuery,
  useSendMessegeMutation,
} = leadCenterAPI;
