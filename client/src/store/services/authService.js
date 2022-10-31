import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => {
    return {
      authLogin: builder.mutation({
        query: (loginData) => {
          return {
            url: "login",
            method: "POST",
            body: loginData,
          };
        },
      }),
      getUserProfile: builder.query({
        query: (userId) => {
          return {
            url: `profile/${userId}`,
            method: "GET",
          };
        },
        providesTags: ['userData']
      }),
    };
  },
});

export const { useAuthLoginMutation, useGetUserProfileQuery } = authService;
export default authService;
