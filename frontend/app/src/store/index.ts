import { configureStore } from '@reduxjs/toolkit'
import authReduser from './authSlice'
import authModalReduser from './authModalSlice'
import isLoadingReduser from './isLoadingSlice'

const store = configureStore({
    reducer: {
        user: authReduser,
        authModal: authModalReduser,
        isLoading: isLoadingReduser,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch