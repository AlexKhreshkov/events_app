import { RootState } from '.'

import { IAd, IAdChange, adInfoForm, IChangeAdResponseError } from '../types/types'
import { ADS_URL } from '../utils/constants'

import axios, { AxiosError } from 'axios'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'


interface adsState {
    ads: IAd[],
    loading: boolean,
    error: string | null
    adFieldError: IChangeAdResponseError | null
}

const initialState: adsState = {
    ads: [],
    loading: false,
    error: null,
    adFieldError: null,
}

export const fetchAds = createAsyncThunk<IAd[], void>(
    'ads/fetchAds',
    async function (_) {
        const response = await axios.get<IAd[]>(`${ADS_URL}`)
        return response.data
    },
)
export const fetchAd = createAsyncThunk<IAd, { slug: string }>(
    'ads/fetchAd',
    async function (slug) {
        const response = await axios.get<IAd>(`${ADS_URL}${slug}`)
        return response.data
    },
)
export const changeAd = createAsyncThunk<IAd, { slug: string, newInfo: IAdChange }, { rejectWithValue: string | IChangeAdResponseError, state: RootState }>(
    'ads/changeAd',
    async function ({ slug, newInfo }, { rejectWithValue, getState }) {
        const authToken = getState().user.authToken
        try {
            const response = await axios.patch<IAd>(
                `${ADS_URL}${slug}/`,
                newInfo,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                        'Authorization': `Token ${authToken}`,
                    },
                },
            )
            return response.data
        } catch (error) {
            const err = error as AxiosError
            if (err.response?.data) {
                return rejectWithValue(err.response.data)
            }
            return rejectWithValue('Failed to change ad')
        }
    },
)

export const createAd = createAsyncThunk<IAd, { newInfo: adInfoForm }, { rejectWithValue: string | IChangeAdResponseError, state: RootState }>(
    'ads/createAd',
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
                },
            )
            return response.data
        } catch (error) {
            return rejectWithValue('Failed to create ad')
        }
    },
)

export const deleteAd = createAsyncThunk<string, string, { rejectValue: string, state: RootState }>(
    'ads/deleteAd',
    async function (adSlug, { rejectWithValue, getState }) {
        const authToken = getState().user.authToken
        try {
            await axios.delete(`${ADS_URL}${adSlug}/`,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                        'Authorization': `Token ${authToken}`,
                    },
                },
            )
            return adSlug
        } catch (error) {
            return rejectWithValue('Failed to delete ad')
        }
    },
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
            .addCase(changeAd.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(changeAd.rejected, (state, action: PayloadAction<any>) => {
                state.adFieldError = action.payload
                state.loading = false
            })
            .addCase(deleteAd.fulfilled, (state, action: PayloadAction<any>) => {
                state.ads = state.ads.filter(ad => ad.slug !== action.payload)
                state.loading = false
            })
            .addCase(deleteAd.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default adsSlice.reducer

// function isError(action: AnyAction) {
//     return action.type.endsWith('rejected')
// }