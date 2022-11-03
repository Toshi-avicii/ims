import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const trashCounselorService = createApi({
    reducerPath: "trashedCounselorS",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        prepareHeaders: function(headers, { getState }) {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;

            headers.set('authorization', token ? `Bearer: ${token}` : "");
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            getTrashedCounselors: builder.query({
                query: (page) => {
                    return {
                        url: `counselors/trash/pages/${page}`,
                        method: "GET"
                    }
                },
                providesTags: ['trash'],
            })
        }
    }
});

export const { useGetTrashedCounselorsQuery } = trashCounselorService;
export default trashCounselorService;