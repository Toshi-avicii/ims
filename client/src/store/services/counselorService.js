import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const counselorService = createApi({
  reducerPath: "counselors",
  tagTypes: "counselors",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const reducerState = getState();
      const token = reducerState?.authReducer?.adminToken;

      headers.set("authorization", token ? `Bearer: ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getCounselors: builder.query({
        query: () => {
          return {
            url: "counselors",
            method: "GET",
          };
        },
        providesTags: ["counselors"],
      }),

      getCounselorsByPage: builder.query({
        query: (pageNo) => {
          return {
            url: `counselors/pages/${pageNo}`,
            method: "GET",
          };
        },
        providesTags: ["counselors"],
      }),

      addCounselor: builder.mutation({
        query: (counselorData) => {
          return {
            url: "counselors",
            method: "POST",
            body: counselorData,
          };
        },
        invalidatesTags: ["counselors"],
      }),

      sendToTrash: builder.mutation({
        query: (counselorId) => {
          return {
            url: `counselors/trash/${counselorId}`,
            method: "POST",
          };
        },
        invalidatesTags: ["Counselors"]
      }),

      updateCounselor: builder.mutation({
        query: (counselorData) => {
          return {
            url: `counselors/${counselorData.id}`,
            method: "PATCH",
            body: counselorData
          }
        },
        invalidatesTags: ['counselors']
      })
    };
  },
});

export const {
  useGetCounselorsQuery,
  useGetCounselorsByPageQuery,
  useAddCounselorMutation,
  useSendToTrashMutation,
  useUpdateCounselorMutation
} = counselorService;
export default counselorService;
