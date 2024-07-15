// import { userLoggedIn } from './authSlice';
// import { apiSlice } from '@redux/api/apiSlice';

// const authAPI = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: '/people/login',
//         method: 'POST',
//         body: data,
//         credentials: 'include',
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;

//           // set tocken to localstorage
//           localStorage.setItem('token', JSON.stringify(result.data.token));

//           dispatch(userLoggedIn(result.data.user));
//         } catch (error) {
//           // Do nothing
//         }
//       },
//     }),
//   }),
// });

// export const {
//   useLoginMutation
// } = authAPI;




import { userLoggedIn, userLoggedOut } from './authSlice';
import { apiSlice } from '@redux/api/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          await AsyncStorage.setItem('token', result.data.token);
          dispatch(userLoggedIn({
            user: result.data.user,
            token: result.data.token
          }));
        } catch (error) {
          // Handle error
        }
      },
    }),
    // logout: builder.mutation({
    //   query: () => ({
    //     url: '/people/logout',
    //     method: 'POST',
    //   }),
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //       await AsyncStorage.removeItem('token');
    //       dispatch(userLoggedOut());
    //     } catch (error) {
    //       // Handle error
    //       console.error('Logout failed:', error);
    //     }
    //   },
    // }),

    logout: builder.mutation({
      queryFn: () => ({ data: { success: true } }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          await AsyncStorage.removeItem('token');
          dispatch(userLoggedOut());
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation
} = authAPI;