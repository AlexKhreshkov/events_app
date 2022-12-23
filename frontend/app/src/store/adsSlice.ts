import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '.'
import { IAd, IAdChange } from '../types/types'
import { ADS_URL } from '../utils/constants'

interface adsState {
    ads: IAd[],
    loading: boolean,
    error: string | null
}

const initialState: adsState = {
    ads: [],
    loading: false,
    error: null,
}

export const fetchAds = createAsyncThunk<IAd[], void, { rejectValue: string }>(
    'ads/fetchAds',
    async function (_, { rejectWithValue }) {
        const response = await axios.get<IAd[]>(`${ADS_URL}`)
        if (!response) {
            return rejectWithValue('Error')
        }
        return response.data
    }
)
export const changeAd = createAsyncThunk<string, { slug: string, newInfo: IAdChange }, { rejectValue: string, state: RootState }>(
    'users/updateUserInfo',
    async function ({ slug, newInfo }, { rejectWithValue, getState, dispatch }) {
        const authToken = getState().user.authToken
        const response = await axios.patch(
            `${ADS_URL}${slug}/`,
            newInfo,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            }
        )
        if (!response) {
            return rejectWithValue('Error while updating profile')
        }
        // dispatch(updateUserState(response.data))
        return response.data
    }
)

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAds.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAds.fulfilled, (state, action: PayloadAction<IAd[]>) => {
                state.ads = action.payload
                state.loading = false
            })
    }
})

export default adsSlice.reducer     