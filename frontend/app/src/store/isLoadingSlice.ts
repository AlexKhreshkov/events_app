import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useAppSelector } from '../hooks/useRedux'
import { useRequest } from '../hooks/useRequest'
import { IAuthToken, IUser } from '../types/types'

interface IisLoadingProps {
    isLoading: boolean
}

const initialState: IisLoadingProps = {
    isLoading: true
}

const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        changeLoadingStatus(state, action: PayloadAction<IisLoadingProps>){
            state.isLoading = action.payload.isLoading
        }
    }
})

export const { changeLoadingStatus } = isLoadingSlice.actions

export default isLoadingSlice.reducer     