import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthModalState, IUser } from '../types/types'


const initialState = {
    isSignIn: false,
    isSignUp: false
}

const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        changeSignInVisibility(state, action) {
            state.isSignIn = !state.isSignIn
        },
        changeSignOutVisibility(state, action) {
            state.isSignUp = !state.isSignUp
        },
    }
})

export const { changeSignInVisibility, changeSignOutVisibility } = authModalSlice.actions

export default authModalSlice.reducer     