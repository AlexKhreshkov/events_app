import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IComment } from '../types/types'
import { ADD_COMMENT_URL, COMMENTS_URL } from '../utils/constants'

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
        if (!response) {
            return rejectWithValue('Error')
        }
        return response.data
    }
)

// export const addComment = createAsyncThunk<IComment, void, { rejectValue: string }>(
//     'comments/addComment',
//     async function ({comment, authToken}, { rejectWithValue }) {
//         const response = await axios.post<IComment>(`${ADD_COMMENT_URL}`,
//             comment,
//             {
//                 headers: {
//                     Authorization: `Token ${comment.authToken}`,
//                 },
//             }
//         )
//         if (!response) {
//             return rejectWithValue('Error')
//         }
//         return response.data
//     }
// )
// export function createComment(comment: ICreateComment) {
//     return axios.post<IComment>(`${ADD_COMMENT_URL}`,
//         comment,
//         {
//             headers: {
//                 Authorization: `Token ${comment.authToken}`,
//             },
//         }
//     )
// }

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
    }
})

export default commentsSlice.reducer     