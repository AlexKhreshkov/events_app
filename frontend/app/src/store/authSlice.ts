import { RootState } from '.';


import { ICurrentUser, ISignUpResponse } from '../types/types'
import { BASE_URL, DELETE_TOKEN_URL } from '../utils/constants'
import { deleteTokenFromLocalStorage } from '../utils/utils'

import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface UserState {
    currentUser: ICurrentUser,
    loading: boolean,
    error: string | null,
    authToken: string
}

const initialState: UserState = {
    currentUser: {
        id: -1,
        email: '',
        username: '',
    },
    loading: false,
    error: null,
    authToken: '',
}

export const defineCurrentUser = createAsyncThunk<ICurrentUser, void, { rejectValue: string, state: RootState }>(
    'auth/defineCurrentUser',
    async function (_, { rejectWithValue, getState }) {
        const authToken: string = getState().user.authToken
        const response = await axios.get<ISignUpResponse>(
            `${BASE_URL}/auth/users/me/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            },
        )
        if (!response) {
            return rejectWithValue('User with this token dosent found')
        }
        return response.data as ICurrentUser
    },
)


export const logoutCurrentUser = createAsyncThunk<void, void, { rejectValue: string, state: RootState }>(
    'auth/logoutCurrentUser',
    async function (_, { rejectWithValue, getState }) {
        const authToken = getState().user.authToken
        const response = await axios.post(
            `${DELETE_TOKEN_URL}`,
            '',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            },
        )
        if (!response) {
            return rejectWithValue('Error')
        }
        deleteTokenFromLocalStorage()
    },
)

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken(state, action) {
            state.authToken = action.payload
        },
        deleteToken(state) {
            state.authToken = ''
        },
        addCurrentUser(state, action) {
            state.currentUser = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(defineCurrentUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(defineCurrentUser.fulfilled, (state, action) => {
                state.currentUser = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(logoutCurrentUser.fulfilled, (state) => {
                state.currentUser = {
                    id: -1,
                    email: '',
                    username: '',
                }
                state.authToken = ''
                state.loading = false
            })

    },
})

export const { addToken } = authSlice.actions;


export default authSlice.reducer     