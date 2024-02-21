import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DataSet } from '../../types/Types'

export const coordinateApi = createApi({
    reducerPath: 'coordinateApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
    endpoints: (builder) => ({
        getRandomCoordinates: builder.query<DataSet, void>({
            query: () => ({
                url: `/random_data`,
                method: 'GET',
            })
        }),
    }),
})

export const {
    useGetRandomCoordinatesQuery,
    useLazyGetRandomCoordinatesQuery,
} = coordinateApi
