import { configureStore } from '@reduxjs/toolkit'
import authReduser from './authSlice'
import authModalReduser from './authModalSlice'
import dataReducer from './dataSlice'


const store = configureStore({
    reducer: {
        user: authReduser,
        data: dataReducer,
        authModal: authModalReduser,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch