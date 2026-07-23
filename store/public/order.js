import { transformListResponse } from "@/utils/responseTransformer";
import { apiSlice } from "../apiSlice";

const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: '/orders',
                method: 'POST',
                body: data
            }),
        }),
        makePayment: builder.mutation({
            query: ({id, data})=>({
                url: `/payments/${id}`,
                method: 'POST',
                body: data
            })
        })
    }),
    overrideExisting: true
});

export const { useCreateOrderMutation, useMakePaymentMutation } = orderSlice