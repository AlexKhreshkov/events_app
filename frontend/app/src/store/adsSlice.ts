import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '.'
import { adInfoForm, IAd, IAdChange } from '../types/types'
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

export const fetchAds = createAsyncThunk<IAd[], void>(
    'ads/fetchAds',
    async function (_,) {
        const response = await axios.get<IAd[]>(`${ADS_URL}`)
        return response.data
    }
)
export const fetchAd = createAsyncThunk<IAd, { slug: string }>(
    'ads/fetchAd',
    async function (slug) {
        const response = await axios.get<IAd>(`${ADS_URL}${slug}`)
        return response.data
    }
)
export const changeAd = createAsyncThunk<IAd, { slug: string, newInfo: IAdChange }, { rejectWithValue: string, state: RootState }>(
    'users/updateUserInfo',
    async function ({ slug, newInfo }, { rejectWithValue, getState }) {
        const authToken = getState().user.authToken
        const response = await axios.patch<IAd>(
            `${ADS_URL}${slug}/d`,
            newInfo,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            }
        )
        return response.data
    }
)

export const createAd = createAsyncThunk<IAd, { newInfo: adInfoForm }, { rejectWithValue: string, state: RootState }>(
    'users/createAd',
    async (data, { rejectWithValue, getState }) => {
        const authToken = getState().user.authToken
        const currentUserId = getState().user.currentUser.id
        const newAd = { ...data.newInfo, user: currentUserId }
        try {
            const response = await axios.post<IAd>(
                `${ADS_URL}create/`,
                newAd,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                        'Authorization': `Token ${authToken}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue('Failed to create ad');
        }
    }
);



const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAds.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(fetchAds.fulfilled, (state, action: PayloadAction<IAd[]>) => {
                state.ads = action.payload
                state.loading = false
            })
            .addCase(createAd.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(createAd.fulfilled, (state, action: PayloadAction<IAd>) => {
                state.ads.push(action.payload)
                state.loading = false
            })
            .addCase(createAd.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export default adsSlice.reducer

// function isError(action: AnyAction) {
//     return action.type.endsWith('rejected')
// }