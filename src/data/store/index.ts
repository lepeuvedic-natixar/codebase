import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { coordinateApi } from './features/coordinates/CoordinateClient';
import CoordinateSlice from './features/coordinates/CoordinateSlice';

export const store = configureStore({
    reducer: {
        coordinates: CoordinateSlice,
        [coordinateApi.reducerPath]: coordinateApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coordinateApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
