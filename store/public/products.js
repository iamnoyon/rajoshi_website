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
        getProductById: builder.query({
            query: ({id}) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
        }),
        getProductsByCategory: builder.query({
            query: (params) => ({
                url: '/products/category',
                method: 'GET',
                params
            })
        }),
        getProductsByMultipleIds: builder.query({
            query: (ids) => ({
                url: '/products/batch',
                method: 'POST',
                body: { ids }
            }),
        }),
    }),
    overrideExisting: true
});

export const { useLazyGetProductsQuery, useGetProductsQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery, useGetProductsByMultipleIdsQuery } = productSlice