import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const counselorService = createApi({
    reducerPath: "counselors",
    tagTypes: 'counselorData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',

        prepareHeaders: (headers, { getState }) => {
            const reducerState = getState();
            const token = reducerState?.authReducer?.adminToken;
            
            headers.set('authorization', token ? `Bearer: ${token}` : "");
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            getCounselors: builder.query({
                query: () => {
                    return {
                        url: 'counselors',
                        method: "GET"
                    }
                },
                providesTags: ['counselors']
            }),
            getCounselorsByPage: builder.query({
                query: (pageNo) => {
                    return {
                        url: `counselors/pages/${pageNo}`,
                        method: 'GET'
                    }
                },
<<<<<<< HEAD
                providesTags: ['counselorData']
=======
                providesTags: ['counselors']
>>>>>>> c81c6918d5f13ca8158482a9e218047d489a0915
            })
        }
    }
});

export const { useGetCounselorsQuery, useGetCounselorsByPageQuery } = counselorService;
export default counselorService;