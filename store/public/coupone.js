import { transformListResponse } from "@/utils/responseTransformer";
import { apiSlice } from "../apiSlice";

const couponeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        validateCoupone: builder.mutation({
            query: (data) => ({
                url: '/coupons/preview',
                method: 'POST',
                body: data
            }),
        }),
        availableCoupone: builder.query({
            query: () => ({
                url: '/coupons/available',
                method: 'GET',
            }),
        }),

    }),
    overrideExisting: true
});

export const { useValidateCouponeMutation, useAvailableCouponeQuery } = couponeSlice