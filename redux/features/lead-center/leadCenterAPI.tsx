import { apiSlice } from "@redux/api/apiSlice";

const leadCenterAPI = apiSlice.injectEndpoints({
  endpoints: (builder: { query: (arg0: { query: (({ page }?: { page?: number; }) => string) | ((id: any) => string); }) => any; mutation: (arg0: { query: ({ id, message }: { id: any; message: any; }) => { url: string; method: string; body: { message: any; }; }; }) => any; }) => ({
    getAllLeadConversations: builder.query({
      query: ({ page = 1,limit }) => `/lead/conversation?page=${page}&limit=${limit}`,
    }),
    getLeadConversationDetails: builder.query({
      query: (id: any) => `/nativeLeads/${id}`,
    }),
    sendMessage: builder.mutation({
      query: ({ id, message }) => ({
        url: `/nativeLeads/${id}`,
        method: "POST",
        body: { message },  
      }),
    }),
  }),
  overrideExisting: true, // Allow overriding existing endpoints
});

export const {
  useGetAllLeadConversationsQuery,
  useGetLeadConversationDetailsQuery,
  useSendMessageMutation,
} = leadCenterAPI;
