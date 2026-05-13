import { apiSlice } from "../apiSlice";

export const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        changePassword: builder.mutation({
            query: (data)=>({
                url: '/change-password',
                method: 'PUT',
                body: data
            })
        })
    }),
    overrideExisting: true
});

export const {useChangePasswordMutation} = authSlice;