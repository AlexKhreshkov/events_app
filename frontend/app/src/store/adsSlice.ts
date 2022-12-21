import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IAd } from '../types/types'
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