import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useAppSelector } from '../hooks/useRedux'
import { useRequest } from '../hooks/useRequest'
import { IAuthToken, IUser } from '../types/types'

interface UserState {
    user: IUser,
}

const initialState: UserState = {
    user: {
        username: '',
        authToken: '',
    }
}


const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<IUser>) {
            state.user = {
                id: action.payload.id,
                email: action.payload.email,
                username: action.payload.username,
                authToken: action.payload.authToken
            }
        },
        deleteTokenFromUser(state) {
            state.user = {
                ...state.user,
                authToken: '',
            }
        },
    }
})

export const { addUser, deleteTokenFromUser } = authSlice.actions

export default authSlice.reducer     