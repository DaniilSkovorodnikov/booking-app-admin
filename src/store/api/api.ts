import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    prepareHeaders: (headers) => {
        const token =  localStorage.getItem('token');
        if(token){
            headers.set('Authorization', `Bearer ${token}`)
        }
    },
})


const baseQueryWithReauth : BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401){
        console.log('access token died')
    }
    return result
}

export const api = createApi({
    endpoints: () => ({}),
    tagTypes: [],
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth
})
