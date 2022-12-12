import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    isLoading: true
}

const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        changeLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    }
})

export const { changeLoadingStatus } = isLoadingSlice.actions

export default isLoadingSlice.reducer     