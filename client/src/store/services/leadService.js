import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const leadService = createApi({
    reducerPath: "leads",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',

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
            getAllLeads: builder.query({
                query: () => {
                    return {
                        url: 'leads',
                        method: 'GET'
                    }
                }
            })
        }
    }
});

export const { useGetAllLeadsQuery } = leadService;
export default leadService;