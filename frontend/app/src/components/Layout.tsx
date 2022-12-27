import { Footer } from './Footer'
import { Loader } from './Loader'
import { Navigation } from './Navigation'

import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { fetchAds } from '../store/adsSlice'
import { changeLoaderFullSizeVisibility } from '../store/authModalSlice'
import { addToken, defineCurrentUser } from '../store/authSlice'
import { fetchCategories } from '../store/categoriesSlice'
import { fetchUsers } from '../store/usersSlice'
import { getTokenFromLocalStorage } from '../utils/utils'

import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

export const Layout = () => {

    const isLoading = useAppSelector(state => state.authModal.isLoaderFullSize)
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function prepeareData() {
            const authToken = getTokenFromLocalStorage()
            dispatch(addToken(authToken))
            dispatch(changeLoaderFullSizeVisibility(true))
            await dispatch(fetchCategories())
            await dispatch(fetchAds())
            await dispatch(fetchUsers())
            if (authToken) {
                await dispatch(defineCurrentUser())
                dispatch(changeLoaderFullSizeVisibility(false))
            }
            else {
                dispatch(changeLoaderFullSizeVisibility(false))
            }
        }
        prepeareData()
    }, [])

    return (
        <>
            {isLoading
                ?
                <Loader />
                :
                <div className='container'>
                    <Navigation />
                    <Outlet />
                    <Footer />
                </div>
            }
        </>
    )
}
