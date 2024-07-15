import { userLoggedIn } from './authSlice';
import { apiSlice } from '@redux/api/apiSlice';

const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/people/login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // set tocken to localstorage
          localStorage.setItem('token', JSON.stringify(result.data.token));

          dispatch(userLoggedIn(result.data.user));
        } catch (error) {
          // Do nothing
        }
      },
    }),
  }),
});

export const {
  useLoginMutation
} = authAPI;
