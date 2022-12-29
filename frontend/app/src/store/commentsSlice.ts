import { IComment } from '../types/types'
import { COMMENTS_URL } from '../utils/constants'

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface UsersState {
    comments: IComment[],
    loading: boolean,
    error: string | null
}

const initialState: UsersState = {
    comments: [],
    loading: false,
    error: null,
}

export const fetchComments = createAsyncThunk<IComment[], void, { rejectValue: string }>(
    'comments/fetchComments',
    async function (_, { rejectWithValue }) {
        const response = await axios.get<IComment[]>(`${COMMENTS_URL}`)
        return response.data
    },
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
                state.comments = action.payload
                state.loading = false
            })
    },
})

export default commentsSlice.reducer     