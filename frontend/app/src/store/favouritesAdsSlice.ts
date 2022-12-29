import { IAd } from '../types/types';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface favouritesAdsState {
    favouritesAds: IAd[],
    loading: boolean,
    error: string | null
}

const initialState: favouritesAdsState = {
    favouritesAds: [],
    loading: false,
    error: null,
}

const favouritesAdsSlice = createSlice({
    name: 'favouritesAds',
    initialState,
    reducers: {
        addFavouriteAd(state, action: PayloadAction<IAd>) {
            const newAd = action.payload
            const ads = state.favouritesAds
            if (!ads.find(ad => ad.id === newAd.id)) {
                ads.push(newAd)
            }
        },
        deleteFavouriteAd(state, action: PayloadAction<number>) {
            const newFavouritesAds = state.favouritesAds.filter(ad => ad.id !== action.payload)
            state.favouritesAds = newFavouritesAds
        },
    },
})
export const { addFavouriteAd, deleteFavouriteAd } = favouritesAdsSlice.actions

export default favouritesAdsSlice.reducer