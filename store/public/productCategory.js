import { apiSlice } from "../apiSlice";

const productCategorySlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getCategoryList: builder.query({
            query: ()=>({
                url: '/categories',
                method: 'GET',
            })
        }),
    }),
    overrideExisting: true
});

export const {useGetCategoryListQuery} = productCategorySlice