import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IUser } from '../types/types'
import { USERS_URL } from '../utils/constants'

interface UsersState {
    users: IUser[],
    loading: boolean,
    error: string | null,
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
}

export const fetchUsers = createAsyncThunk<IUser[], void, { rejectValue: string }>(
    'users/fetchUsers',
    async function (_, { rejectWithValue }) {
        const response = await axios.get<IUser[]>(`${USERS_URL}`)
        if (!response) {
            return rejectWithValue('Error')
        }
        return response.data
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.users = action.payload
                state.loading = false
            })
    }
})

export default usersSlice.reducer     