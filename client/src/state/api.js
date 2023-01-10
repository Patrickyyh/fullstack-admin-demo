import {
    createApi ,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react"



export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products","Customers","Transactions"],
    endpoints: (build) => ({

        getUser: build.query({
            query: (id) =>`api/v1/general/user/${id}`,
            providesTags: ["User"]
        }),

        getProducts: build.query({
            query: () => "api/v1/client/products",
            providesTags: ["Products"]
        }),

        getCustomer: build.query({
            query: () => "api/v1/client/customers",
            providesTags: ["Customers"]
        }),

        getTransactions: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: "api/v1/client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"]
        })


    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomerQuery,
    useGetTransactionsQuery,
} = api;


