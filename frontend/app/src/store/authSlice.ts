import { useAppSelector, useAppDispatch } from './../hooks/useRedux';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ICurrentUser, ISignUpResponse } from '../types/types'
import { BASE_URL, DELETE_TOKEN_URL } from '../utils/constants'
import { getTokenFromLocalStorage } from '../utils/utils'

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
    authToken: ''
}

export const defineCurrentUser = createAsyncThunk<ICurrentUser, void, { rejectValue: ICurrentUser }>(
    'auth/defineCurrentUser',
    async function (_, { rejectWithValue }) {
        const authToken = getTokenFromLocalStorage()
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
        return response.data as ICurrentUser
    }
)

export const addCurrentUser = createAsyncThunk<ICurrentUser, void, { rejectValue: string }>(
    'auth/addCurrentUser',
    async function (_, { rejectWithValue }) {
        const authToken = useAppSelector(state => state.user.authToken)
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
            return rejectWithValue('Error')
        }
        return response.data as ICurrentUser
    }
)

export const logoutCurrentUser = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logoutCurrentUser',
    async function (_, { rejectWithValue }) {
        const authToken = useAppSelector(state => state.user.authToken)
        const response = await axios.post(`${DELETE_TOKEN_URL}`,
            {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            }
        )
        if (!response) {
            return rejectWithValue('Error')
        }
    }
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(defineCurrentUser.fulfilled, (state, action) => {
                state.currentUser = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(addCurrentUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addCurrentUser.fulfilled, (state, action) => {
                state.currentUser = action.payload
                state.loading = false
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

    }
})

export const { addToken } = authSlice.actions;


export default authSlice.reducer     