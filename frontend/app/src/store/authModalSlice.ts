import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthModalState, IUser } from '../types/types'


const initialState = {
    isSignIn: false,
    isSignUp: false,
    isSuccesRegistration: false,
    isChangePassword: false,
    isLoaderFullSize: false,
}

const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        changeSignInVisibility(state, action: PayloadAction<boolean>) {
            state.isSignIn = action.payload
        },
        changeSignUpVisibility(state, action: PayloadAction<boolean>) {
            state.isSignUp = action.payload
        },
        changeResetPasswordVisibility(state, action: PayloadAction<boolean>) {
            state.isChangePassword = action.payload
        },
        changeSuccesRegistrationVisibility(state, action: PayloadAction<boolean>) {
            state.isSuccesRegistration = action.payload
        },
        changeLoaderFullSizeVisibility(state, action: PayloadAction<boolean>) {
            state.isLoaderFullSize = action.payload
        },
    }
})

export const { changeSignInVisibility, changeSignUpVisibility, changeResetPasswordVisibility, changeSuccesRegistrationVisibility, changeLoaderFullSizeVisibility } = authModalSlice.actions

export default authModalSlice.reducer     