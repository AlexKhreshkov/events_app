import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICurrentUser } from '../types/types'

interface UserState {
    currentUser: ICurrentUser,
}

const initialState: UserState = {
    currentUser: {
        id: -1,
        email: '',
        username: '',
    }
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addCurrentUser(state, action: PayloadAction<ICurrentUser>) {
            state.currentUser = {
                id: action.payload.id,
                email: action.payload.email,
                username: action.payload.username,
            }
        },
        logoutCurrentUser(state) {
            state.currentUser = {
                id: -1,
                email: '',
                username: '',
            }
        },
    }
})

export const { addCurrentUser, logoutCurrentUser } = authSlice.actions

export default authSlice.reducer     