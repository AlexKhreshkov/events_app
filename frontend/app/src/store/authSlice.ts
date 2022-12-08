import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/types'

interface UserState {
    user: IUser,
}

const initialState: UserState = {
    user: {
        username: '',
        authToken: ''
    },
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<IUser>) {
            state.user = {
                username: action.payload.username,
                authToken: action.payload.authToken
            }
        },
    }
})

export const { addUser } = authSlice.actions

export default authSlice.reducer     