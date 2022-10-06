import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authService = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/' // api base route
    }),
    endpoints: (builder) => {
        return {
            // this is the function which will run when the login form is submitted
            authLogin: builder.mutation({
                query: (loginData) => {
                    return {
                        url: 'login',
                        method: 'POST',
                        body: loginData
                    }
                }
            })
        }
    }
});

// exporting authLogin function from the endpoints object
export const { useAuthLoginMutation } = authService;
export default authService;