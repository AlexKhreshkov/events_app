import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//MODALS_STATE
const initialState = {
    //MODALS_WITH_USER_INPUT
    isSignInModal: false,
    isSignUpModal: false,
    isResetPasswordModal: false,
    isNewPasswordModal: false,

    //SUCCESS_MODALS
    isSignUpSuccessModal: false,
    isEmailConfirmed: false,
    isPasswordResetSuccessModal: false,
    isSuccessModal: false, 
    //
    isLoaderFullSize: false,
    
    //USER EMAIL FOR PASSWORD RESET
    passwordResetEmail: '', 
}

const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        changeSignInVisibilityModal(state, action: PayloadAction<boolean>) {
            state.isSignInModal = action.payload
        },
        changeSignUpVisibilityModal(state, action: PayloadAction<boolean>) {
            state.isSignUpModal = action.payload
        },
        changeResetPasswordVisibilityModal(state, action: PayloadAction<boolean>) {
            state.isResetPasswordModal = action.payload
        },
        changeNewPasswordVisibilityModal(state, action: PayloadAction<boolean>) {
            state.isNewPasswordModal = action.payload
        },


        changeSignUpSuccessModalVisibility(state, action: PayloadAction<boolean>) {
            state.isSignUpSuccessModal = action.payload
        },
        changeEmailConfirmedSuccessModalVisibility(state, action: PayloadAction<boolean>) {
            state.isEmailConfirmed = action.payload
        },
        changePasswordResetSuccsessModalVisibility(state, action: PayloadAction<boolean>) {
            state.isPasswordResetSuccessModal = action.payload
        },
        changeSuccsessModalVisibility(state, action: PayloadAction<boolean>) {
            state.isSuccessModal = action.payload
        },
        
        //LOADER
        changeLoaderFullSizeVisibility(state, action: PayloadAction<boolean>) {
            state.isLoaderFullSize = action.payload
        },
        //USER EMAIL FOR PASSWORD RESET
        changePasswordResetEmail(state, action: PayloadAction<string>) {
            state.passwordResetEmail = action.payload
        },
    }
})

export const {
    changeSignInVisibilityModal,
    changeSignUpVisibilityModal,
    changeResetPasswordVisibilityModal,
    changeNewPasswordVisibilityModal,
    //
    changeSignUpSuccessModalVisibility,
    changeEmailConfirmedSuccessModalVisibility,
    changePasswordResetSuccsessModalVisibility,
    changeSuccsessModalVisibility,
    //
    changeLoaderFullSizeVisibility,
    changePasswordResetEmail,

} = authModalSlice.actions

export default authModalSlice.reducer     