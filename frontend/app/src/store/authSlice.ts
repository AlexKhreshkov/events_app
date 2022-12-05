import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/types'

type UsersState = {
    list: IUser[]
}

const initialState: UsersState = {
    list: []
}

const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<IUser>) {
            state.list.push({
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email
            })
        },
    }
})

export const { addUser } = authSlice.actions

export default authSlice.reducer     