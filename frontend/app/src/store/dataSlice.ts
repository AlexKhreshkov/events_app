import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory, IAd, IUser, IComment } from '../types/types'

interface DataState {
    data: {
        categories: ICategory[],
        ads: IAd[],
        users: IUser[],
        comments: IComment[],
    },
}

const initialState: DataState = {
    data: {
        categories: [],
        ads: [],
        users: [],
        comments: [],
    }
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addCategories(state, action: PayloadAction<ICategory[]>) {
            state.data.categories = action.payload
        },
        addAds(state, action: PayloadAction<IAd[]>) {
            state.data.ads = action.payload
        },
        addUsers(state, action: PayloadAction<IUser[]>) {
            state.data.users = action.payload
        },
    }
})

export const { addCategories, addAds, addUsers  } = dataSlice.actions

export default dataSlice.reducer     