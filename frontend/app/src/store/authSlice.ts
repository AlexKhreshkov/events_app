import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/types'

interface UserState {
    user: IUser,
}

const initialState: UserState = {
    user: {
        id: -1,
        email: '',
        username: '',
        password: '',
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
                password: action.payload.password,
                authToken: action.payload.authToken
            }
        },
        deleteTokenFromUser(state) {
            state.user = {
                ...state.user,
                authToken: '',
            }
        },
        changeUserPassword(state, action: PayloadAction<string>) {
            state.user.password = action.payload
        }
    }
})

export const { addUser, deleteTokenFromUser, changeUserPassword } = authSlice.actions

export default authSlice.reducer     