import { createApi } from '@reduxjs/toolkit/query/react'
import { CodeMapping, IncompleteCodeMappingStorage } from './Types'
import { backendBaseQueryFn } from 'data/store/config/BackendConfigs'

interface AllMappingResponse {
    ids: string[],
    mappings: CodeMapping[]
}

export const unknownMappingsApi = createApi({
    reducerPath: 'unknownMappingsApi',
    baseQuery: backendBaseQueryFn(),
    endpoints: (builder) => ({
        getCurrentUnknownMappings: builder.query<IncompleteCodeMappingStorage, void>({
            query: () => ({
                url: `/unknown_mappings`,
                method: 'GET',
            }),
            transformResponse(responseMappings: AllMappingResponse): IncompleteCodeMappingStorage {
                return {
                    mappings: responseMappings.mappings,
                    currentIds: responseMappings.ids,
                    recentKnownIds: responseMappings.ids
                }
            }
        }),
        getCurrentUnknownMappingIds: builder.query<string[], void>({
            query: () => ({
                url: `/unknown_mapping_ids`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetCurrentUnknownMappingsQuery,
    useLazyGetCurrentUnknownMappingsQuery,
    useGetCurrentUnknownMappingIdsQuery,
    useLazyGetCurrentUnknownMappingIdsQuery
} = unknownMappingsApi
