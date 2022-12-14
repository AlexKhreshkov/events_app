import { RootState } from '.'

import { IUser, IUserPatch } from '../types/types'
import { BASE_URL, USERS_URL } from '../utils/constants'

import axios from 'axios'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
    },
)
export const updateUserInfoFormData = createAsyncThunk<string, { id: number, newInfo: FormData }, { rejectValue: string, state: RootState }>(
    'users/updateUserInfo',
    async function ({ id, newInfo }, { rejectWithValue, getState, dispatch }) {
        const authToken = getState().user.authToken
        const response = await axios.patch(
            `${BASE_URL}/users/update/${id}/`,
            newInfo,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            },
        )
        if (!response) {
            return rejectWithValue('Error while updating profile')
        }
        dispatch(updateUserState(response.data))
        return response.data
    },
)

export const updateUserInfo = createAsyncThunk<IUser, { id: number, newInfo: IUserPatch }, { rejectValue: string, state: RootState }>(
    'users/updateUserInfo',
    async function ({ id, newInfo }, { rejectWithValue, getState, dispatch }) {
        const authToken = getState().user.authToken
        const response = await axios.patch(
            `${BASE_URL}/users/update/${id}/`,
            newInfo,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            },
        )
        if (!response) {
            return rejectWithValue('Error while updating profile')
        }
        dispatch(updateUserState(response.data))
        return response.data
    },
)

export const updateUserInfoNoImg = createAsyncThunk<string, { id: number, newInfo: IUserPatch }, { rejectValue: string, state: RootState }>(
    'users/updateUserInfoNoImg',
    async function ({ id, newInfo }, { rejectWithValue, getState, dispatch }) {
        const authToken = getState().user.authToken
        const response = await axios.patch(
            `${BASE_URL}/users/update/${id}/`,
            newInfo,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            },
        )
        if (!response) {
            return rejectWithValue('Error')
        }
        dispatch(updateUserState(response.data))
        return response.data
    },
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserState(state, action: PayloadAction<IUser>) {
            const userIndex = state.users.findIndex((user) => user.id === action.payload.id)
            if (userIndex) {
                state.users[userIndex] = action.payload
            }
        },
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
            .addCase(updateUserInfoFormData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserInfoFormData.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateUserInfoFormData.rejected, (state, action) => {
                state.loading = false
            })
    },
})
export const { updateUserState } = usersSlice.actions
export default usersSlice.reducer     