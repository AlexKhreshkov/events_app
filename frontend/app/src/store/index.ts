import { configureStore } from '@reduxjs/toolkit'
import authReduser from './authSlice'
import authModalReduser from './authModalSlice'


const store = configureStore({
    reducer: {
        user: authReduser,
        authModal: authModalReduser
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch