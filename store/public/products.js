import { transformListResponse } from "@/utils/responseTransformer";
import { apiSlice } from "../apiSlice";

const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: '/products',
                method: 'GET',
                params
            }),
        }),
    }),
    overrideExisting: true
});

export const { useLazyGetProductsQuery, useGetProductsQuery } = productSlice