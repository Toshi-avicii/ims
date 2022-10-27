import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const leadService = createApi({
    reducerPath: "leads",
    tagTypes: 'leads',
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
            updateOneLead: builder.mutation({
                query: (leadData) => {
                    return {
                        url: `leads/${leadData.leadId}`,
                        method: 'PATCH',
                        body: leadData
                    }
                },
                invalidatesTags: ['leads']
            }),

            getAllLeads: builder.query({
                query: () => {
                    return {
                        url: 'leads',
                        method: 'GET'
                    }
                },
                providesTags: ['leads']
            }),
            getLeadsByPage: builder.query({
                query: (pageNo) => {
                    return {
                        url: `leads/pages/${pageNo}`,
                        method: 'GET'
                    }
                },
                providesTags: ['leads']
            }),

            deleteOneLead: builder.mutation({
                query: (leadId) => {
                    return {
                        url: `leads/${leadId}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ['leads']
            }),

            addLeads: builder.mutation({
                query: (leadData) => {
                    return {
                        url: "leads",
                        method: "POST",
                        body: leadData
                    }
                }
            })
        }
    }
});

export const { useGetAllLeadsQuery, useGetLeadsByPageQuery, useUpdateOneLeadMutation, useDeleteOneLeadMutation, useAddLeadsMutation } = leadService;
export default leadService;