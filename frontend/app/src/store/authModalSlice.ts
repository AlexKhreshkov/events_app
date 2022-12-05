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
        changeSignUpVisibility(state, action) {
            state.isSignUp = !state.isSignUp
        },
    }
})

export const { changeSignInVisibility, changeSignUpVisibility } = authModalSlice.actions

export default authModalSlice.reducer     