import authModalReduser from './authModalSlice'
import authReduser from './authSlice'
import categoriesReducer from './categoriesSlice'
import adsReducer from './adsSlice'
import usersReducer from './usersSlice'
import commentsReducer from './commentsSlice'
import favouritesAdsReducer from './favouritesAdsSlice'

import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {
        user: authReduser,
        users: usersReducer,
        categories: categoriesReducer,
        comments: commentsReducer,
        ads: adsReducer,
        authModal: authModalReduser,
        favouritesAds: favouritesAdsReducer,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch