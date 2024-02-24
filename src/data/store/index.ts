import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { useDispatch } from "react-redux"

import { coordinateApi } from "./features/coordinates/CoordinateClient"
import CoordinateSlice from "./features/coordinates/CoordinateSlice"
import ClusterSlice from "./features/coordinates/ClusterSlice"
import UnknownCodeMappingsSlice from "./features/codemappings/UnknownCodeMappingsSlice"
import MappingToEditSlice from "./features/codemappings/MappingEditSlice"
import { unknownMappingsApi } from "./features/codemappings/UnknownCodeMappingsClient"

export const store = configureStore({
  reducer: {
    coordinates: CoordinateSlice,
    unknownCodeMappings: UnknownCodeMappingsSlice,
    mappingToEdit: MappingToEditSlice,
    selectedCluster: ClusterSlice,
    [coordinateApi.reducerPath]: coordinateApi.reducer,
    [unknownMappingsApi.reducerPath]: unknownMappingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      coordinateApi.middleware,
      unknownMappingsApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

setupListeners(store.dispatch)
