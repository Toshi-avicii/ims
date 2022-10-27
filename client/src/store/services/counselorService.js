import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const counselorService = createApi({
    reducerPath: "counselors",
    tagTypes: 'counselorData',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
        prepareHeaders: function(headers, { getState }) {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            // authorization bearer token
            headers.set('authorization', token ? `Bearer: ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            getCounselors: builder.query({
                query: () => {
                    return {
                        url: 'counselors',
                        method: 'GET'
                    }
                },
                providesTags: ['counselorData']
            })
        }
    }

});

export const { useGetCounselorsQuery } = counselorService;
export default counselorService;