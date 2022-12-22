import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '.'
import { IUser } from '../types/types'
import { BASE_URL, USERS_URL } from '../utils/constants'

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
export const updateUserInfo = createAsyncThunk<string, { id: number, newInfo: IUser }, { rejectValue: string, state: RootState }>(
    'users/updateUserInfo',
    async function ({ id, newInfo }, { rejectWithValue, getState }) {
        const authToken = getState().user.authToken
        const response = await axios.patch(
            `${BASE_URL}/users/update/${id}/`,
            newInfo,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            }
        )
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
            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserInfo.fulfilled, (state) => {
                state.loading = false
            })
    }
})

export default usersSlice.reducer     