import { apiSlice } from "@redux/api/apiSlice";

const leadCenterAPI = apiSlice.injectEndpoints({
  endpoints: (builder: { query: (arg0: { query: (({ page }?: { page?: number; }) => string) | ((id: any) => string); }) => any; mutation: (arg0: { query: ({ id, message }: { id: any; message: any; }) => { url: string; method: string; body: { message: any; }; }; }) => any; }) => ({
    getLeads: builder.query({
      query: ({ page = 1 }) => `/fbmessage/conversations?page=${page}&limit=20`,
    }),
    getLeadDetails: builder.query({
      query: (id: any) => `/lead/${id}`,
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
