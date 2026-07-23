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

    }),
    overrideExisting: true
});

export const { useValidateCouponeMutation } = couponeSlice