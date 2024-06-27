import { configureStore } from '@reduxjs/toolkit'
import converterSlice from '../features/converter/converterSlice'


export const store = configureStore({
    reducer: {
        converter: converterSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch