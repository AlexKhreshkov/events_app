import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory, IAd } from '../types/types'

interface DataState {
    data: {
        categories: ICategory[],
        ads: IAd[],
    },
}

const initialState: DataState = {
    data: {
        categories: [],
        ads: []
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
    }
})

export const { addCategories, addAds } = dataSlice.actions

export default dataSlice.reducer     