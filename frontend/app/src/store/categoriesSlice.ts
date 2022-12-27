import { ICategory } from '../types/types'
import { CATEGORIES_URL } from '../utils/constants'

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface DataState {
    categories: ICategory[],
    loading: boolean,
    error: string | null
}

const initialState: DataState = {
    categories: [],
    loading: false,
    error: null,
}

export const fetchCategories = createAsyncThunk<ICategory[], void, { rejectValue: string }>(
    'categories/fetchCategories',
    async function (_, { rejectWithValue }) {
        const response = await axios.get(`${CATEGORIES_URL}`)
        if (!response) {
            return rejectWithValue('Error')
        }
        return response.data
    },
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
                state.categories = action.payload
                state.loading = false
            })
    },
})

export default categoriesSlice.reducer     